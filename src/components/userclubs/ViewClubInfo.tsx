
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Users, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

export default function ViewClubInfo({ club, onClose }) {
  return (
    <div className="text-foreground">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gradient">{club.name}</h2>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-pickle mr-2" />
          <p className="text-foreground">
            {club.location}, {club.country}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <Users className="h-4 w-4 text-pickle mr-2" />
          <p className="text-foreground font-medium">
            {club.followers} Followers
          </p>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex items-start mb-2">
            <Info className="h-4 w-4 text-pickle mr-2 mt-1" />
            <h3 className="text-lg font-medium">About</h3>
          </div>
          <p className="text-muted-foreground ml-6">
            {club.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Map View */}
      <div className="mt-4 w-full h-64 rounded-lg overflow-hidden border border-border">
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
            icon={L.icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>{club.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <Button
        className="mt-6 w-full bg-pickle hover:bg-pickle-dark text-white"
        onClick={onClose}
      >
        <X className="mr-2 h-4 w-4" />
        Close
      </Button>
    </div>
  );
}
