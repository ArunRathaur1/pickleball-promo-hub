import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ clubs }) {
  return (
    <div className="w-full h-[500px] border rounded-lg shadow-md">
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
        {/* OpenStreetMap Tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Plot Club Locations */}
        {clubs.map((club) => (
          <Marker
            key={club._id}
            position={club.locationCoordinates} // Using lat, lng from API
          >
            <Popup>
              <div>
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
