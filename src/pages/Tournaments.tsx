import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournament-map";
import { Button } from "@/components/ui/button";

const Tournaments = () => {
  const [activeTab, setActiveTab] = useState("list"); // Default to 'list'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <h1 className="text-3xl font-bold mb-4">Pickleball Tournaments</h1>
            <p className="text-muted-foreground">
              Discover upcoming pickleball tournaments and events across the country.
              Submit your own tournament for promotion and gain exposure in the pickleball community.
            </p>
          </div>

          {/* Tabs for switching views */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              className={`px-6 py-2 rounded-lg ${activeTab === "list" ? "bg-pickle text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("list")}
            >
              Listings
            </Button>
            <Button
              className={`px-6 py-2 rounded-lg ${activeTab === "map" ? "bg-pickle text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("map")}
            >
              Map View
            </Button>
          </div>

          {/* Content based on selected tab */}
          <div className="border p-4 rounded-lg shadow">
            {activeTab === "list" ? <TournamentList /> : <TournamentMap />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;