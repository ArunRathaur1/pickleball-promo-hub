
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

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
          
          // Style the search input
          const searchBar = document.querySelector('.leaflet-control-geosearch');
          if (searchBar) {
            searchBar.classList.add('shadow-lg', 'rounded-lg');
          }
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

// Custom marker component with animation
const AnimatedMarker = ({ position, club }) => {
  const navigate = useNavigate();
  const [bounce, setBounce] = useState(false);
  
  const icon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: bounce ? "marker-bounce" : "",
  });
  
  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        mouseover: () => setBounce(true),
        mouseout: () => setBounce(false),
      }}
    >
      <Popup className="custom-popup">
        <div className="text-sm space-y-2 p-1">
          <h3 className="font-bold text-pickle text-base">{club.name}</h3>
          <p className="flex items-center text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-1 text-pickle-light" />
            {club.location}, {club.country}
          </p>
          {club.followers !== undefined && (
            <p className="text-gray-600">👥 {club.followers} Followers</p>
          )}
          <Button
            className="mt-2 w-full text-xs bg-pickle hover:bg-pickle-dark text-white flex items-center justify-center gap-1"
            onClick={() => navigate(`/clubdetails/${club._id}`)}
          >
            <Navigation className="h-3 w-3" />
            View Details
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};

export default function MapView({ clubs }) {
  const defaultCenter = [20.5937, 78.9629]; // Center of India
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add custom CSS for marker bounce animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marker-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .marker-bounce {
        animation: marker-bounce 0.5s ease infinite;
      }
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .custom-popup .leaflet-popup-tip {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .leaflet-control-geosearch {
        transition: all 0.3s ease;
      }
      .leaflet-control-geosearch:focus-within {
        transform: scale(1.02);
      }
      .leaflet-control-geosearch input {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 8px !important;
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => setIsLoaded(true), 500);

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
      });
    }
  }, []);

  // ✅ Filter approved clubs only
  const approvedClubs = clubs?.filter((club) => club.status === "approved") || [];

  return (
    <div className={`w-full h-[calc(100vh-220px)] border border-border rounded-xl shadow-lg overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <MapContainer
        center={userCoordinates || defaultCenter}
        zoom={5}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SearchControl userAddress={userAddress} />
        <SetViewToUserLocation userCoordinates={userCoordinates} />

        {approvedClubs.map((club) => (
          <AnimatedMarker
            key={club._id}
            position={club.locationCoordinates}
            club={club}
          />
        ))}
      </MapContainer>
    </div>
  );
}
