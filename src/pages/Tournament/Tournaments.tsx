import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournamentdetails/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournamentdetails/tournament-map";
import ViewToggle from "./components/ViewToggle";
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main>
        <div >
          <FilterManager
            tournaments={tournaments}
            setFilteredTournaments={setFilteredTournaments}
          />
        </div>

        <ViewToggle view={view} setView={setView} />

        <div className="w-full flex justify-center">
          <div className="w-full lg:w-full border border-gray-300 rounded-lg p-4">
            {view === "list" && (
              <TournamentList tournaments={filteredTournaments} />
            )}
            {view === "map" && (
              <TournamentMap tournaments={filteredTournaments} />
            )}
          </div>
        </div>

        {filteredTournaments.length === 0 && (
          <div className="w-full flex justify-center mt-6">
            <div className="w-full lg:w-full text-center py-6 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">
                No tournaments found matching your search criteria.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
