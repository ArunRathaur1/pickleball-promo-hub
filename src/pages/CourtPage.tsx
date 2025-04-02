
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourtList } from "@/components/courts/court-list";
import { CourtMap } from "@/components/courts/court-map";
import { Button } from "@/components/ui/button";

const CourtPage = () => {
  const [activeTab, setActiveTab] = useState("list"); // Default to List View

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Pickleball Courts</h1>
            <p className="text-muted-foreground">
              Find the best pickleball courts near you. Explore locations, contact details, 
              and availability to enjoy your next game.
            </p>
          </div>

          {/* Tabs for switching between List and Map View */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button 
              variant={activeTab === "list" ? "default" : "outline"} 
              onClick={() => setActiveTab("list")}
            >
              List View
            </Button>
            <Button 
              variant={activeTab === "map" ? "default" : "outline"} 
              onClick={() => setActiveTab("map")}
            >
              Map View
            </Button>
          </div>

          {/* Conditional Rendering Based on Active Tab */}
          <div className="border border-border bg-card text-card-foreground p-4 rounded-lg shadow">
            {activeTab === "list" ? <CourtList /> : <CourtMap />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourtPage;
