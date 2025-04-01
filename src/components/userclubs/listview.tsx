import React, { useState } from "react";
import ViewClubInfo from "./ViewClubInfo";

export default function Listview({ clubs }) {
  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center"
          >
            {/* Placeholder for Image */}
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Club Image</span>
            </div>
            <div >
              <span className="text-gray-500">{club.name}</span>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              onClick={() => setSelectedClub(club)}
            >
              View Club
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Club Info */}
      {selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedClub(null)}
            >
              ✖
            </button>
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
