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

interface TournamentMapProps {
  tournaments: Tournament[];
}

const TournamentMap = ({ tournaments }: TournamentMapProps) => {
  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Default center: San Francisco
      zoom={4}
      className="h-full w-full" // Set height to 100% to fill container
      style={{ height: "100%", minHeight: "500px" }} // Ensure minimum height and fill parent
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
                📍 <strong>Location:</strong> {tournament.location},{" "}
                {tournament.country}
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
