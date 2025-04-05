import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "../layout/navbar";
import {
  MapPin,
  Calendar,
  Award,
  Globe,
  User,
  ArrowLeft,
  Clock,
} from "lucide-react";

// Import Leaflet components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
// This is necessary because Leaflet's default icons have relative paths that don't work in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Tournament {
  _id: string;
  name: string;
  Organizer: string;
  location: string;
  country: string;
  Continent: string;
  Tier: number;
  startDate: string;
  endDate: string;
  description: string;
  locationCoords: [number, number];
  status: string;
}

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTournament = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tournaments/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch tournament (${response.status})`);
        }

        const data = await response.json();
        setTournament(data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  // When tournament data loads, fit map to marker if coordinates exist
  useEffect(() => {
    if (tournament?.locationCoords && mapRef.current) {
      const map = mapRef.current;
      map.setView(tournament.locationCoords, 12);
    }
  }, [tournament]);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate tournament duration in days
  const getDuration = () => {
    if (!tournament) return null;
    const start = new Date(tournament.startDate);
    const end = new Date(tournament.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + (diffDays === 1 ? " day" : " days");
  };

  // Status badge style based on tournament status
  const getStatusBadgeStyle = () => {
    if (!tournament) return "";

    switch (tournament.status.toLowerCase()) {
      case "approved":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      case "completed":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        <span className="text-lg font-semibold mt-4 text-green-700">
          Loading tournament details...
        </span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Error Loading Tournament
        </h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <Link
          to="/tournaments"
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Tournaments
        </Link>
      </div>
    );
  }

  // Not found state
  if (!tournament) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-yellow-500 text-5xl mb-4">🔎</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tournament Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The tournament you're looking for might have been removed or doesn't
          exist.
        </p>
        <Link
          to="/tournaments"
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Tournaments
        </Link>
      </div>
    );
  }

  // Default map center (fallback if coordinates aren't available)
  const defaultCenter: [number, number] = [0, 0];
  const mapCenter = tournament.locationCoords || defaultCenter;

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto p-4 md:p-6 max-w-4xl">
          {/* Tournament Header */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="bg-green-700 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
                  <div className="flex items-center text-green-100 mb-1">
                    <Globe size={16} className="mr-2" />
                    <span>{tournament.Continent}</span>
                  </div>
                  {/* <div className="flex items-center text-green-100">
                    <User size={16} className="mr-2" />
                    <span>{tournament.Organizer}</span>
                  </div> */}
                </div>
                <div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-white text-sm font-bold ${getStatusBadgeStyle()}`}
                  >
                    {tournament.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {tournament.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <MapPin size={24} className="text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Location
                    </h2>
                    <p className="text-gray-700">
                      {tournament.location}, {tournament.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Award size={24} className="text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Tier
                    </h2>
                    <p className="text-gray-700">
                      Tier {tournament.Tier} Tournament
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Calendar size={24} className="text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Tournament Dates
                    </h2>
                    <p className="text-gray-700">
                      From {formatDate(tournament.startDate)}
                    </p>
                    <p className="text-gray-700">
                      To {formatDate(tournament.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Clock size={24} className="text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Duration
                    </h2>
                    <p className="text-gray-700">{getDuration()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Location Map */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tournament Location
              </h2>
              <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200">
                {tournament.locationCoords ? (
                  <MapContainer
                    center={mapCenter}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                    whenCreated={(map) => {
                      mapRef.current = map;
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={tournament.locationCoords}>
                      <Popup>
                        <div>
                          <strong>{tournament.name}</strong>
                          <br />
                          {tournament.location}, {tournament.country}
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">
                      Location coordinates not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registration Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tournament Registration
            </h2>
            <p className="text-gray-700 mb-4">
              Registration is currently{" "}
              {tournament.status === "approved" ? "open" : "not available"} for
              this tournament.
              {tournament.status === "approved" &&
                " Please contact the organizer for more information about how to register."}
            </p>

            {/* {tournament.status === "approved" && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
                Contact Organizer
              </button>
            )} */}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/tournaments"
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg transition-all flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Tournaments
            </Link>

            {/* {tournament.status === "approved" && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition-all ml-auto">
                Share Tournament
              </button>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
