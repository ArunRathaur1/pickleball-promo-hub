import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import Listview from "@/components/userclubs/listview";
import Mapview from "@/components/userclubs/Mapview";
import { useNavigate } from "react-router-dom";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Fetch data from the API
    fetch("http://localhost:5000/clublist/all")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
        setFilteredClubs(data);

        // Extract unique countries for the filter dropdown
        const uniqueCountries = [...new Set(data.map((club) => club.country))];
        setCountries(uniqueCountries);
      })
      .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  useEffect(() => {
    // Apply filters whenever search inputs change
    filterClubs();
  }, [searchTerm, countryFilter, clubs]);

  const filterClubs = () => {
    let results = [...clubs];

    // Filter by name search
    if (searchTerm) {
      results = results.filter((club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by country
    if (countryFilter) {
      results = results.filter((club) => club.country === countryFilter);
    }

    setFilteredClubs(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountryFilter(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCountryFilter("");
    setFilteredClubs(clubs);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-foreground">
      {/* Main Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters - Fixed at the top */}
        <div className="sticky top-0 z-10 p-4 bg-card border border-border rounded-lg shadow-md mt-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Name Search */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Search by Club Name
              </label>
              <input
                type="text"
                id="search"
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Country Filter */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Filter by Country
              </label>
              <select
                id="country"
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                value={countryFilter}
                onChange={handleCountryChange}
              >
                <option value="">All Countries</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end gap-2 col-span-1 md:col-span-1">
              <button
                className="w-1/2 p-2 bg-muted hover:bg-muted/80 text-foreground rounded-md transition duration-200 ease-in-out"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
              <button
                className="w-1/2 p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 ease-in-out"
                onClick={() => navigate("/addclubs")}
              >
                + Add Club
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredClubs.length} of {clubs.length} clubs
        </div>

        {/* Main Content with Two Columns Layout for Desktop */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Map Section - Fixed position on desktop */}
          <div className="md:w-1/2 md:sticky md:top-32 md:self-start md:h-screen md:max-h-[calc(100vh-180px)] overflow-hidden rounded-lg shadow-md border border-border bg-card">
            <Mapview clubs={filteredClubs} />
          </div>

          {/* Listview - Scrollable */}
          <div className="md:w-1/2 p-6 bg-card border border-border rounded-lg shadow-md">
            <Listview clubs={filteredClubs} />
          </div>
        </div>

        {/* Mobile View: Responsive handling */}
        <div className="md:hidden mt-6 p-6 bg-card border border-border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Club List</h2>
          <Listview clubs={filteredClubs} />
        </div>
      </div>
    </div>
  );
}
