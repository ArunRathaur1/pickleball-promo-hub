
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Athlete Rankings</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6 justify-center">
          <select
            className="border border-border bg-background text-foreground p-2 rounded"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="border border-border bg-background text-foreground p-2 rounded"
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
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 border-b border-border text-foreground">Rank</th>
                <th className="p-3 border-b border-border text-foreground">Player</th>
                <th className="p-3 border-b border-border text-foreground">Country</th>
                <th className="p-3 border-b border-border text-foreground">Age</th>
                <th className="p-3 border-b border-border text-foreground">Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredAthletes.map((athlete, index) => (
                <tr key={athlete._id} className="text-center hover:bg-muted/50">
                  <td className="p-3 border-b border-border">{index + 1}</td>
                  <td className="p-3 border-b border-border flex items-center gap-3 justify-center">
                    <img
                      src={athlete.imageUrl}
                      alt={athlete.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <Link
                      to="/playerprofile"
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={() => handlePlayerClick(athlete)}
                    >
                      {athlete.name}
                    </Link>
                  </td>
                  <td className="p-3 border-b border-border">{athlete.country}</td>
                  <td className="p-3 border-b border-border">{athlete.age}</td>
                  <td className="p-3 border-b border-border font-bold text-purple-600 dark:text-purple-400">
                    {athlete.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Athletes;
