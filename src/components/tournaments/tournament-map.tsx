import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";

interface Tournament {
  _id: string;
  name: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  organizerContact: string;
  locationCoords: [number, number]; // [latitude, longitude]
}

const TournamentMap = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tournaments/all")
      .then((res) => res.json())
      .then((data) => setTournaments(data))
      .catch((err) => console.error("Error fetching tournaments:", err));
  }, []);

  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Default center: San Francisco
      zoom={4}
      className="h-96 w-full rounded-lg border"
    >
      {/* Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Tournament Markers */}
      {tournaments.map((tournament) => (
        <Marker
          key={tournament._id}
          position={tournament.locationCoords}
          icon={L.icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          {/* Tournament Details in Popup */}
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold text-lg">{tournament.name}</h3>
              <p>
                📍 <strong>Location:</strong> {tournament.location}, {tournament.country}
              </p>
              <p>
                📅 <strong>Dates:</strong>{" "}
                {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                {new Date(tournament.endDate).toLocaleDateString()}
              </p>
              <p>
                📜 <strong>Description:</strong> {tournament.description}
              </p>
              <p>
                📞 <strong>Organizer:</strong> {tournament.organizerContact}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export { TournamentMap };
