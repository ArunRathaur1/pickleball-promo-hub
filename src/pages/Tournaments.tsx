import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournament-map";

const Tournaments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Pickleball Tournaments</h1>
            <p className="text-muted-foreground">
              Discover upcoming pickleball tournaments and events across the country.
              Submit your own tournament for promotion and gain exposure in the pickleball community.
            </p>
          </div>

          {/* Display both List and Map side by side */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">List View</h2>
              <TournamentList />
            </div>
            <div className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Map View</h2>
              <TournamentMap />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
