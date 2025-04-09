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
  location: string;
  country: string;
  locationCoordinates: number[];
  description: string;
  createdAt: string;
  clubimageUrl?: string; // Add this to your backend response
}

export default function clubdetails() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchclubdetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/clublist/${id}`);
        setClub(response.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
        setError("Failed to load club details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchclubdetails();
  }, [id]);

  const extractSchedule = (description: string) => {
    const match = description.match(/open(?:ed)? from ([^\.]+)/i);
    return match ? match[1].trim() : "Contact for schedule";
  };

  const extractPrice = (description: string) => {
    const match = description.match(/(?:charges|fees|price) are ([^\.]+)/i);
    return match ? match[1].trim() : "Contact for pricing";
  };

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
          Loading academy details...
        </span>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Error Loading Academy
        </h2>
        <p className="text-gray-700 mb-4">{error || "No club found."}</p>
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto p-4 md:p-6 max-w-4xl">
          {/* Club Image */}
          {club.clubimageUrl && (
            <div className="mb-6">
              <img
                src={club.clubimageUrl}
                alt={club.name}
                className="w-full h-72 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Club Name & Location */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="bg-green-600 text-white p-6 text-center">
              <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
              <div className="flex justify-center items-center text-green-100">
                <MapPin size={16} className="mr-2" />
                <span>
                  {club.location}, {club.country}
                </span>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 w-full">
              {club.locationCoordinates?.length === 2 ? (
                <MapContainer
                  center={[
                    club.locationCoordinates[0],
                    club.locationCoordinates[1],
                  ]}
                  zoom={14}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={(map) => (mapRef.current = map)}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
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
                <div className="h-full flex items-center justify-center text-gray-500">
                  Location not available
                </div>
              )}
            </div>

            {/* Club Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                About the Academy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {club.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="flex items-start mt-6">
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

          {/* CTA Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Join Our Academy
            </h2>
            <p className="text-gray-700 mb-4">
              Ready to improve your pickleball skills? Join our academy today
              and learn from experienced coaches in a welcoming environment.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              to="/clubs"
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg transition-all flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Academies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
