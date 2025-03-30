
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournament-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          
          <Tabs defaultValue="list">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list">
              <TournamentList />
            </TabsContent>
            
            <TabsContent value="map">
              <TournamentMap />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
