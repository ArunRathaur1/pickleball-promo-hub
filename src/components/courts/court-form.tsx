import { useState } from "react";

const CourtForm = () => {
  const [courtData, setCourtData] = useState({
    name: "",
    location: "",
    country: "",
    locationCoordinates: "",
    numberOfCourts: "",
    contact: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourtData({ ...courtData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const coordinates = courtData.locationCoordinates
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
      alert("Please enter valid latitude and longitude (e.g., 37.7749, -122.4194)");
      return;
    }

    const newCourt = { ...courtData, locationCoordinates: coordinates };

    try {
      const res = await fetch("http://localhost:5000/court/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourt),
      });

      if (res.ok) {
        alert("Court added successfully!");
        setCourtData({
          name: "",
          location: "",
          country: "",
          locationCoordinates: "",
          numberOfCourts: "",
          contact: "",
          description: "",
        });
      } else {
        alert("Failed to add court");
      }
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
        <label className="block text-sm font-medium">Location Coordinates (Latitude, Longitude)</label>
        <input type="text" name="locationCoordinates" value={courtData.locationCoordinates} onChange={handleChange} required placeholder="e.g., 37.7749, -122.4194" className="w-full p-2 border rounded" />
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
