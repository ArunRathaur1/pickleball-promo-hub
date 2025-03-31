import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface AthleteFormData {
  name: string;
  age: string;
  gender: string;
  country: string;
  height: string;
  points: string;
  titlesWon: string;
  imageUrl: string;
}

export default function AddAthlete() {
  const [formData, setFormData] = useState<AthleteFormData>({
    name: "",
    age: "",
    gender: "",
    country: "",
    height: "",
    points: "0",
    titlesWon: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/athletes", {
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        points: Number(formData.points),
        titlesWon: formData.titlesWon.split(",").map((title) => title.trim()),
      });

      setSuccess("Athlete added successfully!");
      setFormData({
        name: "",
        age: "",
        gender: "",
        country: "",
        height: "",
        points: "0",
        titlesWon: "",
        imageUrl: "",
      });
    } catch (error) {
      setError("Failed to add athlete. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Athlete</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="points" placeholder="Points" value={formData.points} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="titlesWon" placeholder="Titles Won (comma separated)" value={formData.titlesWon} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Adding..." : "Add Athlete"}
        </button>
      </form>
    </div>
  );
}
