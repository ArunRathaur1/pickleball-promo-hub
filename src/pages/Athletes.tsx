import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "react-router-dom";

interface Athlete {
  _id: string;
  name: string;
  age: number;
  gender: string;
  country: string;
  height: number;
  points: number;
  titlesWon: string[];
  imageUrl: string;
}

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/athletes")
      .then((res) => {
        console.log(res.data);
        setAthletes(res.data);
        setFilteredAthletes(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter function
  useEffect(() => {
    let filtered = athletes;

    if (genderFilter) {
      filtered = filtered.filter((athlete) => athlete.gender === genderFilter);
    }
    if (countryFilter) {
      filtered = filtered.filter(
        (athlete) => athlete.country === countryFilter
      );
    }

    // Sort by points in descending order
    filtered = filtered.sort((a, b) => b.points - a.points);

    setFilteredAthletes(filtered);
  }, [genderFilter, countryFilter, athletes]);

  // Store athlete data in localStorage
  const handlePlayerClick = (athlete: Athlete) => {
    localStorage.setItem("playerProfileData", JSON.stringify(athlete));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-6">Athlete Rankings</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 justify-center">
        <select
          className="border p-2 rounded"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="border p-2 rounded"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All Countries</option>
          {[...new Set(athletes.map((a) => a.country))].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Rank</th>
              <th className="p-3 border">Player</th>
              <th className="p-3 border">Country</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredAthletes.map((athlete, index) => (
              <tr key={athlete._id} className="text-center border">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border flex items-center gap-3">
                  <img
                    src={athlete.imageUrl}
                    alt={athlete.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <Link
                    to="/playerprofile"
                    target="_blank" // Open in a new tab
                    className="text-blue-600"
                    onClick={() => handlePlayerClick(athlete)}
                  >
                    {athlete.name}
                  </Link>
                </td>
                <td className="p-3 border">{athlete.country}</td>
                <td className="p-3 border">{athlete.age}</td>
                <td className="p-3 border font-bold text-purple-600">
                  {athlete.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Athletes;
