
import React, { useState } from "react";
import ViewClubInfo from "./ViewClubInfo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Listview({ clubs }) {
  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {clubs.map((club) => (
          <Card
            key={club._id}
            className="bg-card transition-all hover:shadow-lg hover:-translate-y-1 p-4 border border-border flex flex-col items-center"
          >
            {/* Placeholder for Image */}
            <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Club Image</span>
            </div>
            <div className="mb-4">
              <span className="text-foreground font-medium">{club.name}</span>
            </div>
            <Button
              variant="default"
              className="bg-pickle hover:bg-pickle-dark text-white"
              onClick={() => setSelectedClub(club)}
            >
              View Club
            </Button>
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
