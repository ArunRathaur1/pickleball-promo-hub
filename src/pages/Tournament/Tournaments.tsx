
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournamentdetails/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournamentdetails/tournament-map";
import FilterManager from "./components/FilterManager";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Tournament Directory
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Discover and participate in pickleball tournaments worldwide
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="sticky top-0 z-40 bg-white shadow-lg border-b">
          <div className="container mx-auto px-4">
            <FilterManager
              tournaments={tournaments}
              setFilteredTournaments={setFilteredTournaments}
              view={view}
              setView={setView}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {view === "list" && (
              <TournamentList tournaments={filteredTournaments} />
            )}
            {view === "map" && (
              <TournamentMap tournaments={filteredTournaments} />
            )}
          </div>

          {filteredTournaments.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No tournaments found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria to find more tournaments.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
