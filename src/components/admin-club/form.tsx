import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ClubForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    country: "",
    locationCoordinates: [40.416775, -3.70379], // Default: Madrid
    followers: 0,
    description: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle map click to get coordinates
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setFormData((prev) => ({
          ...prev,
          locationCoordinates: [e.latlng.lat, e.latlng.lng],
        }));
      },
    });
    return <Marker position={formData.locationCoordinates} />;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/clublist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Club added successfully!");
        setFormData({
          name: "",
          location: "",
          country: "",
          locationCoordinates: [40.416775, -3.70379], // Reset to default Madrid
          followers: 0,
          description: "",
        });
      } else {
        setMessage("Failed to add club. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Club</h2>

      {message && <p className="mb-2 text-center text-gray-700">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 shadow-md rounded-lg border border-gray-300"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Club Name"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="followers"
          value={formData.followers}
          onChange={handleChange}
          placeholder="Followers"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Club Description"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <p className="text-gray-600">Click on the map to set coordinates:</p>
        <MapContainer
          center={formData.locationCoordinates}
          zoom={5}
          className="h-60 w-full border border-gray-300 rounded"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>

        <p className="text-sm text-gray-600">
          Selected Coordinates: [{formData.locationCoordinates.join(", ")}]
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
