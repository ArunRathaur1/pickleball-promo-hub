import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournament-map";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [view, setView] = useState("list");

  useEffect(() => {
    fetch("http://localhost:5000/tournaments/approved")
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data);
        setFilteredTournaments(data);
      })
      .catch((err) => console.error("Error fetching tournaments:", err));
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="w-full bg-white py-4 border-b flex justify-center gap-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all ${
              view === "list" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all ${
              view === "map" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("map")}
          >
            Map View
          </button>
        </div>

        <div className="w-full flex justify-center mt-6">
          <div className="w-11/12 lg:w-3/4 border border-gray-300 rounded-lg p-4">
            {view === "list" && (
              <TournamentList tournaments={filteredTournaments} />
            )}
            {view === "map" && (
              <TournamentMap tournaments={filteredTournaments} />
            )}
          </div>
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-6 mt-4 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">
              No tournaments found matching your search criteria.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
