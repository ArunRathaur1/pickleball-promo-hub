
import React from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Globe, Award, RotateCcw, Plus, LayoutGrid, Map } from "lucide-react";

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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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
    <div className="py-6">
      {/* Main Filter Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-end">
          
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-green-600" />
              Search Tournaments
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter tournament name..."
              />
              <Search className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Year Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              Year
            </label>
            <select
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(e.target.value || null)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-all duration-200"
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Month
            </label>
            <select
              value={selectedMonth || ""}
              onChange={(e) => setSelectedMonth(e.target.value || null)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-all duration-200"
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-600" />
              Country
            </label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-all duration-200"
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-green-600" />
              Tier
            </label>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-all duration-200"
            >
              <option value="">All Tiers</option>
              {tiers.map((tier) => (
                <option key={tier} value={tier}>
                  Tier {tier}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div>
            <button
              onClick={resetFilters}
              className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
        {/* Add Tournament Button */}
        <Link to="/addtournament">
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Plus className="w-4 h-4" />
            Add Tournament
          </button>
        </Link>

        {/* Toggle View Button */}
        <button
          onClick={toggleView}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {view === "list" ? <Map className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          {view === "list" ? "Map View" : "List View"}
        </button>
      </div>
    </div>
  );
};

export default TournamentFiltersCombined;
