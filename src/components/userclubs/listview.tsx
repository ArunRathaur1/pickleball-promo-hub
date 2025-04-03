
import React, { useState } from "react";
import ViewClubInfo from "./ViewClubInfo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, MapPin, Users, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function Listview({ clubs }) {
  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {clubs.map((club) => (
          <Card
            key={club._id}
            className="overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-emerald-900/20 hover:-translate-y-1 group bg-card border-border"
          >
            {/* Card Header with Gradient Background */}
            <div className="h-24 bg-gradient-to-r from-pickle/80 to-pickle-dark/80 p-4 flex items-center justify-center">
              <h3 className="text-xl font-bold text-white text-center">
                {club.name}
              </h3>
            </div>

            <div className="p-5">
              {/* Location Badge */}
              <div className="flex items-center mb-3 text-foreground">
                <MapPin className="h-4 w-4 text-pickle mr-2" />
                <span className="text-sm">
                  {club.location}, {club.country}
                </span>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <Badge className="bg-pickle hover:bg-pickle-dark text-white">
                  Active Club
                </Badge>
              </div>
              <Link to={`/clubdetails/${club._id}`}>
                <Button
                  variant="default"
                  className="w-full mt-2 bg-pickle hover:bg-pickle-dark text-white group-hover:shadow-md transition-all"
                >
                  <Info className="mr-2 h-4 w-4" />
                  View Club Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for Viewing Club Info */}
      {selectedClub && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-lg relative border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedClub(null)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <ViewClubInfo
              club={selectedClub}
              onClose={() => setSelectedClub(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
