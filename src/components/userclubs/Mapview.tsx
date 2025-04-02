
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icon to fix missing icon issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";

export default function MapView({ clubs }) {
  // Set default center to India (20.5937, 78.9629) with zoom level 5
  const indiaCenter: [number, number] = [20.5937, 78.9629];
  const defaultZoom = 5;

  return (
    <div className="w-full h-[500px] border border-border rounded-lg shadow-md overflow-hidden">
      <MapContainer center={indiaCenter} zoom={defaultZoom} className="h-full w-full">
        {/* OpenStreetMap Tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Plot Club Locations */}
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
                <p>👥 {club.followers} Followers</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
