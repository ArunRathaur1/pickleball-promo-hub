import React, { useState } from "react";

interface Tournament {
  id: string;
  name: string;
  location: string;
  country: string;
  continent: string;
  tier: number;
  startDate: string;
}

interface TournamentListProps {
  tournaments: Tournament[];
}

const TournamentList = ({ tournaments }: TournamentListProps) => {
  const [selectedTier, setSelectedTier] = useState<number | "all">("all");
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  // Format Date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filtered tournaments based on selection
  const filteredTournaments = tournaments.filter((tournament) => {
    return (
      (selectedTier === "all" || tournament.tier === selectedTier) &&
      (selectedContinent === "all" || tournament.continent === selectedContinent)
    );
  });

  // Get unique values for filters
  const uniqueTiers = Array.from(new Set(tournaments.map((t) => t.tier))).sort(
    (a, b) => a - b
  );
  const uniqueContinents = Array.from(
    new Set(tournaments.map((t) => t.continent))
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        Tournament List
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Tier Filter */}
        <select
          className="border p-2 rounded-md"
          value={selectedTier}
          onChange={(e) =>
            setSelectedTier(e.target.value === "all" ? "all" : Number(e.target.value))
          }
        >
          <option value="all">All Tiers</option>
          {uniqueTiers.map((tier) => (
            <option key={tier} value={tier}>
              Tier {tier}
            </option>
          ))}
        </select>

        {/* Continent Filter */}
        <select
          className="border p-2 rounded-md"
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value)}
        >
          <option value="all">All Continents</option>
          {uniqueContinents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Tournament Image Coming Soon</span>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {tournament.name}
                </h3>

                <div className="text-gray-700 mb-2">
                  📍 {tournament.location}, {tournament.country}
                </div>

                <div className="text-gray-700 mb-2">
                  🌍 {tournament.continent} | 🎖 Tier {tournament.tier}
                </div>

                <div className="text-gray-700 mb-4">📅 {formatDate(tournament.startDate)}</div>

                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg w-full transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No tournaments available.
          </div>
        )}
      </div>
    </div>
  );
};

export { TournamentList };
