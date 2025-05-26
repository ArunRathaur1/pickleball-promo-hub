import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "react-router-dom";
import Athlete_Background from "./spline/Athlete";

interface Athlete {
  _id: string;
  name: string;
  playerid:string
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/athletes")
      .then((res) => {
        setAthletes(res.data);
        setFilteredAthletes(res.data);
      })
      .catch((err) => console.error(err));
      console.log(athletes)
  }, []);

  useEffect(() => {
    let filtered = athletes;
    
    // Filter by search term (athlete name)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((athlete) => 
        athlete.name.toLowerCase().includes(term)
      );
    }
    
    // Filter by gender
    if (genderFilter) {
      filtered = filtered.filter((athlete) => athlete.gender === genderFilter);
    }
    
    // Filter by country
    if (countryFilter) {
      filtered = filtered.filter(
        (athlete) => athlete.country === countryFilter
      );
    }
    
    // Sort by points (highest first)
    filtered = filtered.sort((a, b) => b.points - a.points);
    setFilteredAthletes(filtered);
  }, [genderFilter, countryFilter, searchTerm, athletes]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <div >
        <Athlete_Background></Athlete_Background>
      </div>
      <div
        className="container mx-auto px-4 py-12"
        style={{ marginTop: "-1000px" }}
      >
        <div className="">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-10 border border-white border-opacity-40">
            {/* Search bar */}
            <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
              Athlete Rankings
            </h1>
            <div className="mb-6" style={{display:'flex',justifyContent:'s'}}>
              <div className="relative" style={{width:"50%"}}>
                <input
                  type="text"
                  placeholder="Search athletes by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-emerald-200 p-3 pl-10 rounded-full bg-white bg-opacity-70 backdrop-blur text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-emerald-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <select
                  className="border border-emerald-200 p-2.5 pl-4 pr-10 rounded-full bg-white bg-opacity-70 backdrop-blur text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  className="border border-emerald-200 p-2.5 pl-4 pr-10 rounded-full bg-white bg-opacity-70 backdrop-blur text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {[...new Set(athletes.map((a) => a.country))].map(
                    (country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {filteredAthletes.length === 0 ? (
              <div className="text-center py-10 text-emerald-600">
                <svg
                  className="mx-auto h-12 w-12 text-emerald-400 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg font-medium">
                  No athletes found matching your filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setGenderFilter("");
                    setCountryFilter("");
                  }}
                  className="mt-4 text-emerald-500 hover:text-emerald-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-emerald-600 text-white">
                      <th className="p-4 text-left font-medium">Rank</th>
                      <th className="p-4 text-left font-medium">Player</th>
                      <th className="p-4 text-left font-medium">Country</th>
                      <th className="p-4 text-left font-medium">Age</th>
                      <th className="p-4 text-left font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white bg-opacity-60 backdrop-blur-sm text-black">
                    {filteredAthletes.map((athlete, index) => (
                      <tr
                        key={athlete._id}
                        className="hover:bg-emerald-50 hover:bg-opacity-90 transition-colors duration-150"
                      >
                        <td className="p-4 border-b border-emerald-100">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                            {index + 1}
                          </span>
                        </td>
                        <td className="p-4 border-b border-emerald-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                              <img
                                src={athlete.imageUrl}
                                alt={athlete.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link
                              to={`/${athlete.playerid}`}
                              className="text-emerald-700 hover:text-emerald-500 font-medium hover:underline transition-colors"
                            >
                              {athlete.name}
                            </Link>
                          </div>
                        </td>
                        <td className="p-4 border-b border-emerald-100">
                          {athlete.country}
                        </td>
                        <td className="p-4 border-b border-emerald-100">
                          {athlete.age}
                        </td>
                        <td className="p-4 border-b border-emerald-100">
                          <span className="font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                            {athlete.points}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Athletes;