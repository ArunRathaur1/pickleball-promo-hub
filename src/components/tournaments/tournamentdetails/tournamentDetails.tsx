import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "../../layout/navbar";
import TournamentDetailsInfo from "./TournamentDetailsInfo";
import { TournamentMap } from "./TournamentMap";
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
  imageUrl: string; // ← Add this line
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

  // Default map center (fallback if coordinates aren't available)
  const defaultCenter: [number, number] = [0, 0];
  const mapCenter = tournament.locationCoords || defaultCenter;

  return (
    <>
      <Navbar />

      {/* Hero Section with Image */}
      <div
        className="relative w-full h-[50vh] bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${tournament.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <h1 className="relative text-4xl md:text-5xl text-white font-bold text-center z-10">
          {tournament.name}
        </h1>
      </div>

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto p-4 md:p-6 max-w-6xl">
          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Tournament Info */}
            <div>
              <TournamentDetailsInfo
                tournament={tournament}
                formatDate={formatDate}
                getDuration={getDuration}
                getStatusBadgeStyle={getStatusBadgeStyle}
              />
            </div>

            {/* Right: Map */}
            <div className="h-full">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 h-full">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Tournament Location
                  </h2>
                  <div className="h-80 w-full rounded-lg overflow-hidden">
                    <TournamentMap
                      locationCoords={tournament.locationCoords}
                      tournament={{
                        name: tournament.name,
                        location: tournament.location,
                        country: tournament.country,
                      }}
                    />
                  </div>
                </div>
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
          </div>

          {/* Back Button */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/tournaments"
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg transition-all flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Tournaments
            </Link>
          </div>
        </div>
      </div>
    </>
  );

}
