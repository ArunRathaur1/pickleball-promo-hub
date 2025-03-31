import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CourtForm = () => {
  const [courtData, setCourtData] = useState({
    name: "",
    location: "",
    country: "",
    locationCoordinates: null, // Initially null
    numberOfCourts: "",
    contact: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourtData({ ...courtData, [e.target.name]: e.target.value });
  };

  // Custom Leaflet component to handle map clicks
  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCourtData((prev) => ({ ...prev, locationCoordinates: [lat, lng] }));
      },
    });
    return courtData.locationCoordinates ? (
      <Marker position={courtData.locationCoordinates} />
    ) : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courtData.locationCoordinates) {
      alert("Please select a valid location on the map.");
      return;
    }

    const newCourt = {
      ...courtData,
      locationCoordinates: courtData.locationCoordinates, // Ensure correct format
      numberOfCourts: Number(courtData.numberOfCourts), // Convert to number
    };

    try {
      const res = await fetch("http://localhost:5000/court/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourt),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error("Error Response:", result);
        alert(result.message || "Failed to add court.");
        return;
      }

      alert("Court added successfully!");
      setCourtData({
        name: "",
        location: "",
        country: "",
        locationCoordinates: null, // Reset
        numberOfCourts: "",
        contact: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding court:", err);
      alert("Error submitting court details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium">Court Name</label>
        <input type="text" name="name" value={courtData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Location (City)</label>
        <input type="text" name="location" value={courtData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Country</label>
        <input type="text" name="country" value={courtData.country} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Select Location on Map</label>
        <MapContainer center={[20, 78]} zoom={4} style={{ height: "300px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker />
        </MapContainer>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Number of Courts</label>
        <input type="number" name="numberOfCourts" value={courtData.numberOfCourts} onChange={handleChange} required min="1" className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Contact</label>
        <input type="text" name="contact" value={courtData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea name="description" value={courtData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Submit Court</button>
    </form>
  );
};

export { CourtForm };
