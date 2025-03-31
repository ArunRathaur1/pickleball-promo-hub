import { useEffect, useState } from "react";

interface Tournament {
  id: string;
  name: string;
  location: string;
  country: string;
  startDate: string;
}

const TournamentList = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tournaments/approved")
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data);
        setFilteredTournaments(data);
      })
      .catch((err) => console.error("Error fetching tournaments:", err));
  }, []);

  // Apply filters when search or location input changes
  useEffect(() => {
    setFilteredTournaments(
      tournaments.filter(
        (tournament) =>
          tournament.name.toLowerCase().includes(search.toLowerCase()) &&
          tournament.location
            .toLowerCase()
            .includes(locationFilter.toLowerCase())
      )
    );
  }, [search, locationFilter, tournaments]);

  // Format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Name Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {/* Location Filter Input */}
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tournament) => (
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

              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700">
                  {formatDate(tournament.startDate)}
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">
                  {tournament.location}, {tournament.country}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg w-full transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tournaments found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export { TournamentList };
