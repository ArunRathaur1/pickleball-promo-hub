import React, { useEffect, useState } from "react";

export default function ClubData() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/clublist/all")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error("Error fetching club data:", error));
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Club List</h2>

      {clubs.length === 0 ? (
        <p className="text-gray-500">No clubs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
              <p className="text-gray-600">{club.description}</p>
              <p className="mt-2">
                📍 <strong>{club.location}</strong>, {club.country}
              </p>
              <p>📌 Coordinates: [{club.locationCoordinates.join(", ")}]</p>
              <p>👥 Followers: {club.followers}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created at: {new Date(club.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
