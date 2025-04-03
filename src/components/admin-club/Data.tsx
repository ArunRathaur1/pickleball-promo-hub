import React, { useEffect, useState } from "react";

export default function ClubData() {
  const [clubs, setClubs] = useState([]);
  const [editingClub, setEditingClub] = useState(null);
  const [updatedClub, setUpdatedClub] = useState({
    name: "",
    location: "",
    country: "",
    locationCoordinates: "",
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/clublist/all")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error("Error fetching club data:", error));
  }, []);

  // 🗑️ Delete Club Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;

    try {
      const response = await fetch(`http://localhost:5000/clublist/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClubs(clubs.filter((club) => club._id !== id));
        alert("Club deleted successfully.");
      } else {
        alert("Failed to delete the club.");
      }
    } catch (error) {
      console.error("Error deleting club:", error);
      alert("Server error. Try again.");
    }
  };

  // ✏️ Open Update Form with Pre-filled Data
  const handleEdit = (club) => {
    setEditingClub(club._id);
    setUpdatedClub({
      name: club.name,
      location: club.location,
      country: club.country,
      locationCoordinates: club.locationCoordinates.join(", "),
      description: club.description,
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setUpdatedClub({ ...updatedClub, [e.target.name]: e.target.value });
  };

  // Submit Updated Club Data
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/clublist/update/${editingClub}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedClub,
          locationCoordinates: updatedClub.locationCoordinates.split(",").map(Number),
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setClubs(clubs.map((club) => (club._id === editingClub ? updatedData.club : club)));
        setEditingClub(null); // Close modal
        alert("Club updated successfully.");
      } else {
        alert("Failed to update the club.");
      }
    } catch (error) {
      console.error("Error updating club:", error);
      alert("Server error. Try again.");
    }
  };

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
              <p>
                📌 Coordinates:{" "}
                {club.locationCoordinates
                  ? `[${club.locationCoordinates.join(", ")}]`
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                🕒 Created at:{" "}
                {club.createdAt
                  ? new Date(club.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              {/* 🛠️ Delete & Update Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(club._id)}
                >
                  🗑️ Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleEdit(club)}
                >
                  ✏️ Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Update Form (Modal) */}
      {editingClub && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Club</h2>

            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={updatedClub.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Location</label>
            <input
              type="text"
              name="location"
              value={updatedClub.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Country</label>
            <input
              type="text"
              name="country"
              value={updatedClub.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Coordinates (lat, lon)</label>
            <input
              type="text"
              name="locationCoordinates"
              value={updatedClub.locationCoordinates}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Description</label>
            <textarea
              name="description"
              value={updatedClub.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>

            {/* 🛠️ Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => setEditingClub(null)}
              >
                ❌ Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={handleUpdate}
              >
                ✅ Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
