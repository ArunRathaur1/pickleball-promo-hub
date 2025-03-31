import React from "react";

export default function Listview({ clubs }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
          <p className="text-gray-600">
            📍 {club.location}, {club.country}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {club.description || "No description available."}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-700 font-medium">
              👥 {club.followers} Followers
            </span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
              View Club
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
