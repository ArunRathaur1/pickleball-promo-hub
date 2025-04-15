
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TournamentMapProps {
  locationCoords: [number, number] | null;
  tournament: {
    name: string;
    location: string;
    country: string;
  };
}

// Component to handle map view updates
const MapController = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (coords) {
      map.setView(coords, 12);
    }
  }, [coords, map]);
  
  return null;
};

export const TournamentMap: React.FC<TournamentMapProps> = ({ locationCoords, tournament }) => {
  if (!locationCoords) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Location coordinates not available</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={locationCoords}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController coords={locationCoords} />
      <Marker position={locationCoords}>
        <Popup>
          <div>
            <strong>{tournament.name}</strong>
            <br />
            {tournament.location}, {tournament.country}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
