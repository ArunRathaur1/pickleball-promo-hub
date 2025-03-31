import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import Listview from "@/components/userclubs/listview";
import Mapview from "@/components/userclubs/Mapview";

export default function Clubs() {
  const [activeTab, setActiveTab] = useState("map"); // Default to Map View
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/clublist/all")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Main Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 p-6 bg-white border rounded-lg shadow-md mt-4">
        {/* Desktop and Laptop View: Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            {/* Render Mapview */}
            <Mapview clubs={clubs} />
          </div>
          <div className="w-full">
            {/* Render Listview */}
            <Listview clubs={clubs} />
          </div>
        </div>

        {/* Mobile View: Only Listview */}
        <div className="md:hidden">
          <Listview clubs={clubs} />
        </div>
      </div>
    </div>
  );
}
