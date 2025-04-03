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
  Users,
  ArrowLeft,
  Clock,
  Info,
  DollarSign,
} from "lucide-react";

// Fix for default marker icons in Leaflet
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
  location: string;
  country: string;
  locationCoordinates: number[];
  description: string;
  createdAt: string;
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

  // Extract key information from the description
  const extractSchedule = (description: string) => {
    const scheduleMatch = description.match(/open(?:ed)? from ([^\.]+)/i);
    return scheduleMatch ? scheduleMatch[1].trim() : "Contact for schedule";
  };

  const extractPrice = (description: string) => {
    const priceMatch = description.match(
      /(?:charges|fees|price) are ([^\.]+)/i
    );
    return priceMatch ? priceMatch[1].trim() : "Contact for pricing";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        <span className="text-lg font-semibold mt-4 text-green-600">
          Loading academy details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Error Loading Academy
        </h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <Link
          to="/clubs"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Academies
        </Link>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-yellow-500 text-5xl mb-4">🔎</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Academy Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The academy you're looking for might have been removed or doesn't
          exist.
        </p>
        <Link
          to="/clubs"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Academies
        </Link>
      </div>
    );
  }

  const schedule = extractSchedule(club.description);
  const price = extractPrice(club.description);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto p-4 md:p-6 max-w-4xl">
          {/* Academy Header */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="bg-green-600 text-white p-6">
              <h1 className="text-3xl font-bold mb-2 text-center">
                {club.name}
              </h1>
              <div className="flex items-center justify-center text-green-100">
                <MapPin size={16} className="mr-2" />
                <span>
                  {club.location}, {club.country}
                </span>
              </div>
            </div>

            {/* Map Section */}
            <div className="h-64 md:h-80 w-full">
              {club.locationCoordinates &&
              club.locationCoordinates.length === 2 ? (
                <MapContainer
                  center={[
                    club.locationCoordinates[0],
                    club.locationCoordinates[1],
                  ]}
                  zoom={14}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={(map) => {
                    mapRef.current = map;
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      club.locationCoordinates[0],
                      club.locationCoordinates[1],
                    ]}
                  >
                    <Popup>
                      <div>
                        <strong>{club.name}</strong>
                        <br />
                        {club.location}, {club.country}
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

            {/* Academy Info */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  About the Academy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {club.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Clock size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Schedule
                    </h3>
                    <p className="text-gray-700">{schedule}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <DollarSign size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Membership Fee
                    </h3>
                    <p className="text-gray-700">{price}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Established
                  </h3>
                  <p className="text-gray-700">{formatDate(club.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Join Our Academy
            </h2>
            <p className="text-gray-700 mb-4">
              Ready to improve your pickleball skills? Join our academy today
              and learn from experienced coaches in a welcoming environment.
            </p>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
              Inquire About Membership
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              to="/clubs"
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg transition-all flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Academies
            </Link>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition-all flex items-center">
              <Users size={16} className="mr-2" /> Contact Academy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
