import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, AlertCircle, X } from "lucide-react";

interface Club {
  _id: string;
  name: string;
  email: string;
  contact: string;
  status?: "pending" | "approved" | "rejected";
  location: string;
  country: string;
  clubimageUrl?: string;
  logoimageUrl?: string;
  bookinglink?: string;
  [key: string]: any;
}

interface ListviewProps {
  clubs: Club[];
}

export default function Listview({ clubs }: ListviewProps) {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; clubName: string } | null>(null);

  const handleViewDetails = (clubId: string) => {
    navigate(`/clubdetails/${clubId}`);
  };

  const handleBookingClick = (club: Club) => {
    if (club.bookinglink) {
      window.open(club.bookinglink, "_blank", "noopener,noreferrer");
    } else {
      // Show alert with club name
      setAlertInfo({ show: true, clubName: club.name });
      
      // Auto-hide the alert after 3 seconds
      setTimeout(() => {
        setAlertInfo(null);
      }, 3000);
    }
  };

  // Filter approved clubs only
  const approvedClubs = clubs.filter((club) => club.status === "approved");

  return (
    <>
      {/* Top Alert */}
      {alertInfo && alertInfo.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>No booking link available for {alertInfo.clubName}</span>
            </div>
            <button 
              onClick={() => setAlertInfo(null)} 
              className="focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Club Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {approvedClubs.map((club) => (
          <Card
            key={club._id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200"
          >
            {/* Club Image */}
            <div className="relative h-48 overflow-hidden">
              {club.logoimageUrl ? (
                <img
                  src={club.logoimageUrl}
                  alt={`${club.name}`}
                  className="w-full h-full object-cover"
                />
              ) : club.clubimageUrl ? (
                <img
                  src={club.clubimageUrl}
                  alt={`${club.name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Club Info */}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-3 truncate">{club.name}</h3>

              <div className="flex items-center mb-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">
                  {club.location}, {club.country}
                </span>
              </div>

              <div className="flex items-center mb-4 text-gray-600">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{club.contact}</span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="default"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                  onClick={() => handleViewDetails(club._id)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => handleBookingClick(club)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}