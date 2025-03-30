import { useEffect, useState } from "react";

interface Tournament {
  _id: string;
  name: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  organizerContact: string;
}

const TournamentList = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tournaments/all")
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

      {/* Tournament List */}
      <ul>
        {filteredTournaments.map((tournament) => (
          <li key={tournament._id} className="border-b py-3">
            <h3 className="font-bold">{tournament.name}</h3>
            <p>{tournament.location}, {tournament.country}</p>
            <p>
              📅 {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">{tournament.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TournamentList };
