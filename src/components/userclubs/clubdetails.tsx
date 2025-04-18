import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../layout/navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapPin,
  Calendar,
  ArrowLeft,
  Clock,
  DollarSign,
  Phone,
  Mail,
} from "lucide-react";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Club {
  _id: string;
  name: string;
  email: string;
  contact: string;
  status: string;
  location: string;
  country: string;
  locationCoordinates: number[];
  description: string;
  createdAt: string;
  clubimageUrl?: string;
  logoimageUrl?: string;
}

export default function ClubDetails() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/clublist/${id}`
        );
        setClub(response.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
        setError("Failed to load club details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchClubDetails();
  }, [id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        <span className="text-lg font-semibold mt-4 text-green-600">
          Loading club details...
        </span>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Error Loading Club
        </h2>
        <p className="text-gray-700 mb-4">{error || "No club found."}</p>
        <Link
          to="/clubs"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Clubs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Full screen hero image */}
      <div className="relative">
        {club.clubimageUrl ? (
          <img
            src={club.clubimageUrl}
            alt={club.name}
            className="w-full object-cover"
            style={{ height: "50vh" }} // 50% of the viewport height
          />
        ) : (
          <div className="w-full h-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-xl">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-5xl font-bold mb-4">{club.name}</h1>
            <div className="flex justify-center items-center text-xl">
              <MapPin size={20} className="mr-2" />
              <span>
                {club.location}, {club.country}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content section with details on left and map on right */}
      <div className="container mx-auto p-6 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Club details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-6">
              {club.logoimageUrl && (
                <img
                  src={club.logoimageUrl}
                  alt={`${club.name} logo`}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
              )}
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {club.name}
                </h2>
                <p className="text-gray-600">
                  {club.status === "pending" ? "Pending Approval" : "Approved"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Location
                  </h3>
                  <p className="text-gray-700">
                    {club.location}, {club.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Contact Number
                  </h3>
                  <p className="text-gray-700">{club.contact}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Mail size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-700">{club.email}</p>
                </div>
              </div>

              

              {club.description && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {club.description}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <Link
                to="/clubs"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition-all flex items-center w-max"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Clubs
              </Link>
            </div>
          </div>

          {/* Right column - Map */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-full min-h-96">
              {club.locationCoordinates?.length === 2 ? (
                <MapContainer
                  center={[
                    club.locationCoordinates[0],
                    club.locationCoordinates[1],
                  ]}
                  zoom={13}
                  style={{ height: "100%", width: "100%", minHeight: "500px" }}
                  whenCreated={(map) => (mapRef.current = map)}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      club.locationCoordinates[0],
                      club.locationCoordinates[1],
                    ]}
                  >
                    <Popup>
                      <strong>{club.name}</strong>
                      <br />
                      {club.location}, {club.country}
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 min-h-96">
                  Location not available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
