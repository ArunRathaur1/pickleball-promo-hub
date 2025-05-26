import React from "react";
import { Link } from "react-router-dom";

interface TournamentFiltersCombinedProps {
  tournaments: any[];
  search: string;
  setSearch: (value: string) => void;
  selectedMonth: string | null;
  setSelectedMonth: (month: string | null) => void;
  selectedYear: string | null;
  setSelectedYear: (year: string | null) => void;
  countryFilter: string;
  setCountryFilter: (value: string) => void;
  tierFilter: string;
  setTierFilter: (value: string) => void;
  resetFilters: () => void;
  countries: string[];
  tiers: number[];
  view: string;
  setView: (view: string) => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TournamentFiltersCombined: React.FC<TournamentFiltersCombinedProps> = ({
  tournaments,
  search,
  setSearch,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  countryFilter,
  setCountryFilter,
  tierFilter,
  setTierFilter,
  resetFilters,
  countries,
  tiers,
  view,
  setView,
}) => {
  const getUniqueYears = () => {
    const years = new Set<string>();
    tournaments.forEach((t) => {
      const startYear = new Date(t.startDate).getFullYear();
      const endYear = new Date(t.endDate).getFullYear();
      for (let year = startYear - 5; year <= endYear + 5; year++) {
        years.add(year.toString());
      }
    });
    return Array.from(years).sort();
  };

  const years = getUniqueYears();

  const toggleView = () => {
    setView(view === "list" ? "map" : "list");
  };

  return (
    <div className="px-5 py-4 bg-gray-50 rounded-md w-full">
      {/* Filters Container - Responsive Layout */}
      <div className="flex flex-wrap lg:flex-nowrap items-end justify-center gap-3 lg:gap-4">
        {/* Search by Name */}
        <div className="w-full sm:w-48 lg:w-48">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-md outline-none"
            placeholder="Tournament name..."
          />
        </div>

        {/* Year Selector */}
        <div className="w-full sm:w-36 lg:w-36">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Select Year
          </label>
          <select
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(e.target.value || null)}
            className="w-full px-3 py-2 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-md outline-none bg-white"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Selector */}
        <div className="w-full sm:w-40 lg:w-40">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Select Month
          </label>
          <select
            value={selectedMonth || ""}
            onChange={(e) => setSelectedMonth(e.target.value || null)}
            className="w-full px-3 py-2 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-md outline-none bg-white"
          >
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={month} value={String(index + 1)}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Country Selector */}
        <div className="w-full sm:w-48 lg:w-48">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Country
          </label>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-md outline-none bg-white"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Tier Selector */}
        <div className="w-full sm:w-36 lg:w-36">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Tier
          </label>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-md outline-none bg-white"
          >
            <option value="">All Tiers</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                Tier {tier}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="w-full sm:w-36 lg:w-36">
          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 h-10 text-sm font-semibold text-white rounded-md bg-gradient-to-r from-green-500 to-green-600 hover:from-blue-600 hover:to-blue-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Add Tournament Button */}
        <div className="w-full sm:w-36 lg:w-36">
          <Link to="/addtournament">
            <button className="w-full px-4 py-2 h-10 text-sm font-semibold text-white rounded-md bg-gradient-to-r from-green-500 to-green-600 hover:from-blue-600 hover:to-blue-600 transition">
              Add Tournament
            </button>
          </Link>
        </div>

        {/* Toggle View Button */}
        <div className="w-full sm:w-auto lg:w-auto">
          <button
            onClick={toggleView}
            className="w-full px-4 py-2 h-10 text-sm font-semibold text-white bg-green-600 hover:bg-blue-600 rounded-md transition"
          >
            Switch to {view === "list" ? "Map" : "List"} View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentFiltersCombined;
