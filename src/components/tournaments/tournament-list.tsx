import React from "react";

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
  // Format Date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        Tournament List
      </h2>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">
                  Tournament Image Coming Soon
                </span>
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

                <div className="text-gray-700 mb-4">
                  📅 {formatDate(tournament.startDate)}
                </div>

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
