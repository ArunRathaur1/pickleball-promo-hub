import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink } from "lucide-react";

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
  [key: string]: any;
}

interface ListviewProps {
  clubs: Club[];
}

export default function Listview({ clubs }: ListviewProps) {
  const navigate = useNavigate();

  const handleViewDetails = (clubId: string) => {
    navigate(`/clubdetails/${clubId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {clubs.map((club) => (
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

            {/* Status badge */}
            {/* {club.status && (
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    club.status === "approved"
                      ? "bg-green-500 text-white"
                      : club.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                </span>
              </div>
            )} */}
          </div>

          {/* Club Info */}
          <div className="p-4">
            {/* Name */}
            <h3 className="text-xl font-bold mb-3 truncate">{club.name}</h3>

            {/* Location */}
            <div className="flex items-center mb-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">
                {club.location}, {club.country}
              </span>
            </div>

            {/* Contact */}
            <div className="flex items-center mb-4 text-gray-600">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{club.contact}</span>
            </div>

            {/* Buttons */}
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
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
