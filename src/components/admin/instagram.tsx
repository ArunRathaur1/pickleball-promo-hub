import React, { useState } from "react";
import InstagramView from "../adminInstagram/view";
import InstagramAdd from "../adminInstagram/add";

export default function InstagramNavbar() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="w-full p-4">
      {/* Navbar */}
      <nav className="flex gap-4 bg-white text-gray-900 p-2 rounded-lg shadow-md border border-gray-300">
        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "view"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 border-gray-300"
          }`}
          onClick={() => setActiveTab("view")}
        >
          View
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "add"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 border-gray-300"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add
        </button>
      </nav>

      {/* Content Section */}
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        {activeTab === "view" ? <InstagramView /> : <InstagramAdd />}
      </div>
    </div>
  );
}
