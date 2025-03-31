import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import Listview from "@/components/userclubs/listview";
import Mapview from "@/components/userclubs/Mapview";
export default function Clubs() {
  const [activeTab, setActiveTab] = useState("map"); // Default to Map View

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Main Navbar */}
      <Navbar />

      {/* Smaller Navbar for View Selection */}
      <nav className="flex justify-center gap-4 bg-gray-800 text-white p-2 rounded-lg mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "map" ? "bg-gray-600" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("map")}
        >
          Map View
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "list" ? "bg-gray-600" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("list")}
        >
          List View
        </button>
      </nav>

      {/* Render Content Based on Selected Tab */}
      <div className="flex-1 mt-4 p-4 bg-white border rounded-lg shadow-md">
        {activeTab === "map" ? <Mapview/> : <Listview />}
      </div>
    </div>
  );
}
