import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import Listview from "@/components/userclubs/listview";
import Mapview from "@/components/userclubs/Mapview";

export default function Clubs() {
  const [activeTab, setActiveTab] = useState("map"); // Default to Map View
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [followerFilter, setFollowerFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
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
  }, [searchTerm, countryFilter, followerFilter, clubs]);

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

    // Filter by followers
    if (followerFilter) {
      const minFollowers = parseInt(followerFilter);
      if (!isNaN(minFollowers)) {
        results = results.filter((club) => club.followers >= minFollowers);
      }
    }

    setFilteredClubs(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountryFilter(e.target.value);
  };

  const handleFollowerChange = (e) => {
    setFollowerFilter(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCountryFilter("");
    setFollowerFilter("");
    setFilteredClubs(clubs);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Main Navbar */}
      <Navbar />

      {/* Search and Filters */}
      <div className="p-4 bg-white border rounded-lg shadow-md mt-4 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Name Search */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search by Club Name
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Country Filter */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Country
            </label>
            <select
              id="country"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Followers Filter */}
          <div>
            <label
              htmlFor="followers"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Followers
            </label>
            <input
              type="number"
              id="followers"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min followers..."
              value={followerFilter}
              onChange={handleFollowerChange}
            />
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              className="w-full p-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200 ease-in-out"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white border rounded-lg shadow-md">
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredClubs.length} of {clubs.length} clubs
        </div>

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
  );
}
