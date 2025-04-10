import React from 'react';
import { MapPin, Calendar, Award, Globe, Clock } from 'lucide-react';

interface TournamentDetailsInfoProps {
  tournament: {
    name: string;
    location: string;
    country: string;
    Continent: string;
    Tier: number;
    startDate: string;
    endDate: string;
    description: string;
    status: string;
  };
  formatDate: (dateString: string) => string;
  getDuration: () => string | null;
  getStatusBadgeStyle: () => string;
}

const TournamentDetailsInfo: React.FC<TournamentDetailsInfoProps> = ({
  tournament,
  formatDate,
  getDuration,
  getStatusBadgeStyle,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="bg-green-700 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
            <div className="flex items-center text-green-100 mb-1">
              <Globe size={16} className="mr-2" />
              <span>{tournament.Continent}</span>
            </div>
          </div>
          <div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-white text-sm font-bold ${getStatusBadgeStyle()}`}
            >
              {tournament.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          {tournament.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <MapPin size={24} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Location
              </h2>
              <p className="text-gray-700">
                {tournament.location}, {tournament.country}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <Award size={24} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Tier</h2>
              <p className="text-gray-700">
                Tier {tournament.Tier} Tournament
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <Calendar size={24} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Tournament Dates
              </h2>
              <p className="text-gray-700">
                From {formatDate(tournament.startDate)}
              </p>
              <p className="text-gray-700">
                To {formatDate(tournament.endDate)}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <Clock size={24} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Duration</h2>
              <p className="text-gray-700">{getDuration()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailsInfo;