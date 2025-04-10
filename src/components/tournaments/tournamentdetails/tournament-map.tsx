import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

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

// Search bar component
const SearchControl = ({ userAddress }: { userAddress: string }) => {
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
      searchLabel: "Enter location...",
    });

    map.addControl(searchControl);

    // Autofill search bar
    if (userAddress) {
      setTimeout(() => {
        const input = document.querySelector(
          ".leaflet-control-geosearch input"
        ) as HTMLInputElement | null;
        if (input) input.value = userAddress;
      }, 1000);
    }

    return () => map.removeControl(searchControl);
  }, [map, userAddress]);

  return null;
};

// Component to zoom to user's location
const SetViewToUserLocation = ({
  userCoordinates,
}: {
  userCoordinates: [number, number] | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (userCoordinates) {
      map.setView(userCoordinates, 12);
    }
  }, [userCoordinates, map]);

  return null;
};

export  function TournamentMap({ tournaments }: TournamentMapProps) {
  const defaultCenter: [number, number] = [20.5937, 78.9629]; // Center of India
  const [userCoordinates, setUserCoordinates] = useState<
    [number, number] | null
  >(null);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const coords: [number, number] = [lat, lon];
        setUserCoordinates(coords);

        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query: `${lat},${lon}` });
        if (results[0]?.label) setUserAddress(results[0].label);
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        <SearchControl userAddress={userAddress} />
        <SetViewToUserLocation userCoordinates={userCoordinates} />

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
    </div>
  );
}
