
import { useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

// Mock data for approved tournaments
const TOURNAMENTS: Tournament[] = [
  {
    id: "t1",
    name: "National Pickleball Championship",
    date: "August 15-20, 2023",
    time: "9:00 AM - A6:00 PM",
    location: "Indian Wells Tennis Garden, California",
    description: "The largest pickleball tournament in the country with participants from all over the world. $50,000 prize pool.",
  },
  {
    id: "t2",
    name: "City Pickleball Open",
    date: "September 5-7, 2023",
    time: "8:00 AM - 5:00 PM",
    location: "Central Park Courts, New York",
    description: "A competitive tournament open to all skill levels with categories for beginners to advanced players.",
  },
  {
    id: "t3",
    name: "Southern Regional Pickleball Classic",
    date: "October 12-15, 2023",
    time: "10:00 AM - 7:00 PM",
    location: "Atlanta Sports Complex, Georgia",
    description: "Regional tournament featuring singles, doubles, and mixed doubles competitions across all age divisions.",
  },
];

export function TournamentList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTournaments = TOURNAMENTS.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tournaments by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {filteredTournaments.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No tournaments found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or check back later for new tournaments.
          </p>
          <Link to="/tournaments/submit">
            <Button>Submit Your Tournament</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <Card key={tournament.id} className="card-hover">
              <CardHeader className="pb-2">
                <Badge className="w-fit mb-2 bg-pickle hover:bg-pickle-dark">Upcoming</Badge>
                <CardTitle className="text-xl">{tournament.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4 space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-pickle mt-1" />
                  <div>
                    <p className="text-sm">{tournament.date}</p>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{tournament.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-pickle mt-1" />
                  <p className="text-sm">{tournament.location}</p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {tournament.description.length > 100
                    ? `${tournament.description.substring(0, 100)}...`
                    : tournament.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/tournaments/${tournament.id}`} className="w-full">
                  <Button variant="outline" className="w-full flex justify-center gap-2">
                    View Details
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link to="/tournaments/submit">
          <Button size="lg" className="bg-pickle hover:bg-pickle-dark">
            Submit Your Tournament
          </Button>
        </Link>
      </div>
    </div>
  );
}
