import { useEffect, useState } from "react";

interface Tournament {
  _id: string;
  name: string;
  location: string;
  country: string;
  startDate: string;
}

const TournamentList = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
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
      tournaments.filter((tournament) =>
        tournament.name.toLowerCase().includes(search.toLowerCase()) &&
        tournament.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    );
  }, [search, locationFilter, tournaments]);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {/* Name Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 border rounded-lg"
        />

        {/* Location Filter Input */}
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-1/2 p-2 border rounded-lg"
        />
      </div>

      {/* Tournament Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left text-purple-600">Tournament Name</th>
              <th className="border p-2 text-left text-purple-600">Start Date</th>
              <th className="border p-2 text-left text-purple-600">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredTournaments.map((tournament) => (
              <tr key={tournament._id} className="hover:bg-gray-50">
                <td className="border p-2">{tournament.name}</td>
                <td className="border p-2">{new Date(tournament.startDate).toLocaleDateString()}</td>
                <td className="border p-2">{tournament.location}, {tournament.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TournamentList };
