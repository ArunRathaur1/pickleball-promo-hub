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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-12">
        {/* Header Section - Full Width with Container for Content */}
        <div className="w-full bg-white py-8 border-b">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <h1 className="text-3xl font-bold mb-4">
                Pickleball Tournaments
              </h1>
              <p className="text-muted-foreground">
                Discover upcoming pickleball tournaments and events across the
                country. Submit your own tournament for promotion and gain
                exposure in the pickleball community.
              </p>
            </div>

            {/* Filter Controls */}
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
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="w-full ">
          {/* Responsive Layout Container */}
          <div className="w-full mx-auto">
            {/* Full-width grid that conditionally shows map on larger screens */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                className="grid grid-cols-1 lg:grid-cols-2"
                style={{
                  width: "95%",
                  border: "solid",
                  borderWidth: "1px",
                  borderColor: "#D3D3D3",
                  borderRadius:'10px'
                }}
              >
                {/* Tournament List - Always Visible */}
                <div className="bg-white h-[600px] overflow-auto">
                  <TournamentList tournaments={filteredTournaments} />
                </div>

                {/* Map - Only Visible on lg (laptop) screens and up */}
                <div className="hidden lg:block h-[600px]">
                  <TournamentMap tournaments={filteredTournaments} />
                </div>
              </div>
            </div>
            {/* No results message */}
            {filteredTournaments.length === 0 && (
              <div className="container mx-auto">
                <div className="text-center py-6 mt-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500">
                    No tournaments found matching your search criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
