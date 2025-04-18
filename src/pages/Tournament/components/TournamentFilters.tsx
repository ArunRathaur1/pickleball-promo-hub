import React from "react";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";

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
  locationFilter,
  setLocationFilter,
  countryFilter,
  setCountryFilter,
  continentFilter,
  setContinentFilter,
  tierFilter,
  setTierFilter,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  resetFilters,
  countries,
  continents,
  tiers,
}) => {
  return (
    <div >
      {showFilters && (
        <div className="p-6  bg-white shadow-md shadow-green-100">
          <div style={{display:"flex",justifyContent:'space-between'}}>
            {/* Search by name */}
            <div>
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

            {/* Country filter */}
            <div>
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

            {/* Tier filter */}
            <div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentFilters;
