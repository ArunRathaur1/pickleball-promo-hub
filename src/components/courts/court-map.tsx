import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";

interface Court {
  _id: string;
  name: string;
  location: [number, number];
  numberOfCourts: number;
  contact: string;
}

const CourtMap = () => {
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/court/all")
      .then((res) => res.json())
      .then((data) => setCourts(data))
      .catch((err) => console.error("Error fetching courts:", err));
  }, []);

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={4} className="h-80 w-full rounded-lg border">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {courts.map((court) => (
        <Marker
          key={court._id}
          position={court.location}
          icon={L.icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            <strong>{court.name}</strong>
            <br />
            🏆 Courts: {court.numberOfCourts}
            <br />
            📞 Contact: {court.contact}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export { CourtMap };
