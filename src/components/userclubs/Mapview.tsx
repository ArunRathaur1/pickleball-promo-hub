
import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Component to add search control to the map and autofill it
const SearchControl = ({ userAddress }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: "Enter address...",
    });

    map.addControl(searchControl);

    // Autofill search bar after control loads
    if (userAddress) {
      setTimeout(() => {
        const input = document.querySelector(
          ".leaflet-control-geosearch input"
        );
        if (input) {
          input.value = userAddress;
        }
      }, 1000);
    }

    return () => map.removeControl(searchControl);
  }, [map, userAddress]);

  return null;
};

// Component to programmatically zoom to user's location
const SetViewToUserLocation = ({ userCoordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (userCoordinates) {
      map.setView(userCoordinates, 12); // Zoom to user location
    }
  }, [userCoordinates, map]);

  return null;
};

export default function MapView({ clubs }) {
  const defaultCenter = [20.5937, 78.9629]; // Center of India
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUserLocation = useCallback(async () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const coords = [lat, lon];
        setUserCoordinates(coords);

        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query: `${lat},${lon}` });
        if (results[0]?.label) {
          setUserAddress(results[0].label);
        }
        setIsLoading(false);
      }, 
      // Error callback
      (error) => {
        console.error("Error getting location:", error);
        setIsLoading(false);
      });
    } else {
      console.warn("Geolocation not supported by this browser");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Filter approved clubs only
  const approvedClubs = clubs?.filter((club) => club.status === "approved") || [];

  return (
    <div className="relative w-full h-[500px] border border-border rounded-lg shadow-md overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-background p-4 rounded-lg shadow-lg flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-pickle" />
            <span>Loading map...</span>
          </div>
        </div>
      )}
      
      <MapContainer
        center={userCoordinates || defaultCenter}
        zoom={5}
        className="h-full w-full"
        whenReady={(mapInstance) => {
          setIsLoading(false);
          return mapInstance;
        }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchControl userAddress={userAddress} />
        <SetViewToUserLocation userCoordinates={userCoordinates} />

        {approvedClubs.map((club) => (
          <Marker
            key={club._id}
            position={club.locationCoordinates}
            icon={L.icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup className="custom-popup">
              <div className="text-sm space-y-2 min-w-[200px]">
                <h3 className="font-bold text-base border-b pb-1 mb-2 text-pickle">{club.name}</h3>
                <p className="flex items-start">
                  <span className="mr-1">📍</span>
                  <span>{club.location}, {club.country}</span>
                </p>
                {club.followers !== undefined && (
                  <p className="flex items-center">
                    <span className="mr-1">👥</span>
                    <span>{club.followers} Followers</span>
                  </p>
                )}
                <Button
                  className="mt-2 w-full text-xs bg-pickle hover:bg-pickle-dark text-white transition-all"
                  onClick={() => navigate(`/clubdetails/${club._id}`)}
                >
                  View Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom controls */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <button 
          onClick={getUserLocation} 
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          title="Find my location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pickle">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <line x1="12" y1="2" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="22"></line>
            <line x1="2" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="22" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
