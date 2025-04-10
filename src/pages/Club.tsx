import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, List, Filter } from "lucide-react";
import MapView from "../userclub/MapView";
import ClubList from "../userclub/ClubList";

const Club = () => {
  const [activeTab, setActiveTab] = useState<string>("map");

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Find Your Perfect Club
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Discover top pickleball clubs near you. Browse our extensive network
          of clubs, view their facilities, and find your next favorite place to
          play.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger
            value="map"
            className={`flex items-center gap-1 ${
              activeTab === "map" ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setActiveTab("map")}
          >
            <MapPin className="w-4 h-4" />
            <span>Map</span>
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className={`flex items-center gap-1 ${
              activeTab === "list" ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </TabsTrigger>
        </TabsList>

        <button className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Split view layout */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)]">
        {/* Fixed Map Side */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-8 lg:h-[calc(100vh-220px)]" style={{border:"solid",borderColor:'red',}}>
          <div className="h-full bg-background rounded-lg border border-border overflow-hidden shadow-sm">
            <MapView />
          </div>
        </div>

        {/* Scrollable List Side */}
        <div className="w-full lg:w-1/2 overflow-y-auto">
          <div className="pr-0 lg:pr-2">
            <ClubList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
