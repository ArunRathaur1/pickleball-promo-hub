import React from "react";
import { Link } from "react-router-dom";
interface TournamentFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  countryFilter: string;
  setCountryFilter: (value: string) => void;
  continentFilter: string;
  setContinentFilter: (value: string) => void;
  tierFilter: string;
  setTierFilter: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  hasActiveFilters: () => boolean;
  resetFilters: () => void;
  countries: string[];
  continents: string[];
  tiers: number[];
}

const TournamentFilters: React.FC<TournamentFiltersProps> = ({
  search,
  setSearch,
  countryFilter,
  setCountryFilter,
  tierFilter,
  setTierFilter,
  showFilters,
  resetFilters,
  countries,
  tiers,
}) => {
  return (
    <div className="px-5">
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            style={{ height: "50px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-md outline-none"
            placeholder="Tournament name..."
          />
        </div>

        {/* Country */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Country
          </label>
          <select
            style={{ height: "50px" }}
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

        {/* Tier */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Tier
          </label>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            style={{ height: "50px" }}
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

        {/* Reset Button */}
        <div className="flex-1 min-w-[200px] flex items-end">
          <button
            style={{ height: "50px" }}
            onClick={resetFilters}
            className="w-full px-4 py-2 text-sm font-semibold text-white rounded-md bg-gradient-to-r bg-green-500 hover:from-blue-600 hover:to-blue-600 transition"
          >
            Reset Filters
          </button>
        </div>
          <div className="flex-1 min-w-[300px] flex items-end">
            <Link to="/addtournament">
            <button
              style={{ height: "50px",width:"300px" }}
              
              className="w-full px-4 py-2 text-sm font-semibold text-white rounded-md bg-gradient-to-r bg-green-500 hover:from-blue-600 hover:to-blue-600 transition"
            >
              Add Tournament
            </button>
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default TournamentFilters;
