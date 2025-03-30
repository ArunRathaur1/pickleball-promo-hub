import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourtList } from "@/components/courts/court-list";
import { CourtMap } from "@/components/courts/court-map";

const CourtPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Pickleball Courts</h1>
            <p className="text-muted-foreground">
              Find the best pickleball courts near you. Explore locations, contact details, 
              and availability to enjoy your next game.
            </p>
          </div>

          {/* Display both List and Map side by side */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">List View</h2>
              <CourtList />
            </div>
            <div className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Map View</h2>
              <CourtMap />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourtPage;
