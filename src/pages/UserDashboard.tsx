
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPin, Clock, PlusCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Mock user's tournament data
const USER_TOURNAMENTS = [
  {
    id: "u1",
    name: "Summer Pickleball Classic",
    date: "July 10-12, 2023",
    time: "8:00 AM - 6:00 PM",
    location: "River Park Courts, Miami",
    status: "approved",
  },
  {
    id: "u2",
    name: "Winter Indoor Championships",
    date: "January 15-16, 2024",
    time: "9:00 AM - 8:00 PM",
    location: "Sports Center, Denver",
    status: "pending",
  },
];

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">Manage your tournaments and services</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/tournaments/submit">
                <Button className="bg-pickle hover:bg-pickle-dark">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Submit Tournament
                </Button>
              </Link>
            </div>
          </div>
          
          <Tabs defaultValue="tournaments">
            <TabsList className="mb-8">
              <TabsTrigger value="tournaments">My Tournaments</TabsTrigger>
              <TabsTrigger value="services">My Services</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tournaments">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Your Tournaments</h2>
                
                {USER_TOURNAMENTS.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground">You haven't submitted any tournaments yet</p>
                      <Link to="/tournaments/submit" className="mt-4 inline-block">
                        <Button size="sm">Submit Your First Tournament</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {USER_TOURNAMENTS.map((tournament) => (
                      <Card key={tournament.id} className="card-hover">
                        <CardHeader className="pb-2">
                          <Badge className={`w-fit mb-2 ${
                            tournament.status === "approved" 
                              ? "bg-pickle" 
                              : "bg-yellow-500"
                          }`}>
                            {tournament.status === "approved" ? "Approved" : "Pending"}
                          </Badge>
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4 space-y-4">
                          <div className="flex items-start gap-2">
                            <CalendarIcon className="h-4 w-4 text-pickle mt-1" />
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
                        </CardContent>
                        <CardFooter>
                          {tournament.status === "approved" ? (
                            <Link to={`/tournaments/${tournament.id}`} className="w-full">
                              <Button variant="outline" className="w-full flex justify-center gap-2">
                                View Public Page
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="outline" className="w-full" disabled>
                              Awaiting Approval
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>My Services</CardTitle>
                  <CardDescription>Manage your pickleball marketing services</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">You haven't booked any services yet</p>
                  <Link to="/services">
                    <Button className="bg-pickle hover:bg-pickle-dark">Explore Services</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account and preferences</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Profile settings coming soon</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
