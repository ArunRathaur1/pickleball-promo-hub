import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Club {
  _id: string;
  name: string;
  location: string;
  country: string;
  status?: "pending" | "approved" | "rejected";
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
          className="overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-emerald-900/20 hover:-translate-y-1 group bg-card border-border"
        >
          {/* Logo Image */}
          {club.logoimageUrl && (
            <img
              src={club.logoimageUrl}
              alt={`${club.name} logo`}
              className="w-full h-40 object-cover"
            />
          )}

          {/* Club Info */}
          <div className="p-5">
            {/* Name */}
            <h3 className="text-lg font-semibold mb-2 text-center">{club.name}</h3>

            {/* Location */}
            <div className="flex items-center justify-center mb-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-pickle mr-1" />
              {club.location}, {club.country}
            </div>

            {/* Status */}
            <div className="flex justify-center mb-4">
              <Badge className="bg-pickle hover:bg-pickle-dark text-white">
                {club.status === "approved" ? "Active Club" : club.status || "Unknown Status"}
              </Badge>
            </div>

            {/* View Button */}
            <Button
              variant="default"
              className="w-full bg-pickle hover:bg-pickle-dark text-white group-hover:shadow-md transition-all"
              onClick={() => handleViewDetails(club._id)}
            >
              <Info className="mr-2 h-4 w-4" />
              View Club Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
