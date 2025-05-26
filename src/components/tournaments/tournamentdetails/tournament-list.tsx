import React from "react";
import { Link } from "react-router-dom";

interface Tournament {
  _id: string;
  name: string;
  location: string;
  country: string;
  Continent: string;
  Tier: number;
  startDate: string;
  imageUrl?: string;
}

interface TournamentListProps {
  tournaments: Tournament[];
}

const TournamentList = ({ tournaments }: TournamentListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Adjusted grid structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div
              key={tournament._id}
              className="flex flex-col border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              {/* Image Banner */}
              {tournament.imageUrl ? (
                <img
                  src={tournament.imageUrl}
                  alt={tournament.name}
                  className="h-40 w-full object-cover" // Reduced height
                />
              ) : (
                <div className="bg-green-700 h-40 flex items-center justify-center p-4">
                  {" "}
                  {/* Reduced height */}
                  <h3 className="text-2xl font-bold text-white text-center break-words">
                    {tournament.name}
                  </h3>
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-semibold text-green-700 mb-3 line-clamp-2">
                  {tournament.name}
                </h3>

                <div className="text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">📍</span>
                  <span>
                    {tournament.location}, {tournament.country}
                  </span>
                </div>

                <div className="text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🌍</span>
                  <span>{tournament.Continent}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <span className="mr-1">🎖</span>
                    <span>Tier {tournament.Tier}</span>
                  </span>
                </div>

                <div className="text-gray-700 mb-4 flex items-center">
                  <span className="mr-2">📅</span>
                  <span>{formatDate(tournament.startDate)}</span>
                </div>
              </div>

              {/* Button at bottom */}
              <div className="px-5 pb-5 mt-auto">
                <Link to={`/tournament/${tournament._id}`} className="block">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <div className="text-5xl mb-4">🏆</div>
            <p className="text-xl">No tournaments available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { TournamentList };
