import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import Listview from "@/components/userclubs/listview";
import Mapview from "@/components/userclubs/Mapview";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);

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
        {/* Search and Filters */}
        <div className="p-4 bg-card border border-border rounded-lg shadow-md mt-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-end">
              <button
                className="w-full p-2 bg-muted hover:bg-muted/80 text-foreground rounded-md transition duration-200 ease-in-out"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredClubs.length} of {clubs.length} clubs
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-card border border-border rounded-lg shadow-md">
          {/* Desktop and Laptop View: Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full" style={{ zIndex: "1" }}>
              {/* Render Mapview with filtered clubs */}
              <Mapview clubs={filteredClubs} />
            </div>
            <div className="w-full" style={{ zIndex: "100" }}>
              {/* Render Listview with filtered clubs */}
              <Listview clubs={filteredClubs} />
            </div>
          </div>

          {/* Mobile View: Only Listview */}
          <div className="md:hidden">
            <Listview clubs={filteredClubs} />
          </div>
        </div>
      </div>
    </div>
  );
}