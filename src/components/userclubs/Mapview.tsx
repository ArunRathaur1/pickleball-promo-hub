import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

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

  useEffect(() => {
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

  return (
    <div className="w-full h-[500px] border border-border rounded-lg shadow-md overflow-hidden">
      <MapContainer
        center={userCoordinates || defaultCenter}
        zoom={5}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SearchControl userAddress={userAddress} />
        <SetViewToUserLocation userCoordinates={userCoordinates} />

        {/* User marker has been removed as requested */}

        {clubs.map((club) => (
          <Marker
            key={club._id}
            position={club.locationCoordinates}
            icon={L.icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold">{club.name}</h3>
                <p>
                  {club.location}, {club.country}
                </p>
                {club.followers !== undefined && (
                  <p>👥 {club.followers} Followers</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
