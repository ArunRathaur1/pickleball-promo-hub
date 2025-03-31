import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ViewClubInfo({ club, onClose }) {
  return (
    <div className="p-4 text-black">
      <h2 className="text-xl font-bold mb-2">{club.name}</h2>
      <p className="text-gray-700">
        📍 {club.location}, {club.country}
      </p>
      <p className="text-gray-600 mt-2">
        {club.description || "No description available."}
      </p>
      <p className="text-gray-800 font-medium mt-2">
        👥 {club.followers} Followers
      </p>

      {/* Map View */}
      <div className="mt-4 w-full h-64 rounded-lg overflow-hidden">
        <MapContainer
          center={[club.locationCoordinates[0], club.locationCoordinates[1]]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[
              club.locationCoordinates[0],
              club.locationCoordinates[1],
            ]}
          >
            <Popup>{club.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
