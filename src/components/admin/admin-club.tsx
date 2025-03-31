import React, { useState } from "react";
import ClubData from "../admin-club/Data";
import ClubForm from "../admin-club/form";

export default function AdminClub() {
  const [activeTab, setActiveTab] = useState("data");

  return (
    <div className="w-full p-4">
      {/* Navbar */}
      <nav className="flex gap-4 bg-white text-gray-900 p-2 rounded-lg shadow-md border border-gray-300">
        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "data"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 border-gray-300"
          }`}
          onClick={() => setActiveTab("data")}
        >
          View Data
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "form"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 border-gray-300"
          }`}
          onClick={() => setActiveTab("form")}
        >
          Add Data
        </button>
      </nav>

      {/* Content */}
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        {activeTab === "data" ? <ClubData /> : <ClubForm />}
      </div>
    </div>
  );
}
