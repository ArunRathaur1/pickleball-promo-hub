
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Award, Globe } from "lucide-react";

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
    <div className="p-6">
      {tournaments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament._id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {tournament.imageUrl ? (
                  <img
                    src={tournament.imageUrl}
                    alt={tournament.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-green-600 to-blue-600 h-full flex items-center justify-center p-4">
                    <h3 className="text-white font-bold text-center text-lg leading-tight">
                      {tournament.name}
                    </h3>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-green-700 backdrop-blur-sm">
                    <Award className="w-3 h-3 mr-1" />
                    Tier {tournament.Tier}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
                  {tournament.name}
                </h3>

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    <span className="truncate">
                      {tournament.location}, {tournament.country}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{tournament.Continent}</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="truncate">{formatDate(tournament.startDate)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <Link to={`/tournament/${tournament._id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tournaments available
          </h3>
          <p className="text-gray-600">
            Check back later for upcoming tournaments.
          </p>
        </div>
      )}
    </div>
  );
};

export { TournamentList };
