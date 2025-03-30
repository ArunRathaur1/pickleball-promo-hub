
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock pending tournament data
const PENDING_TOURNAMENTS = [
  {
    id: "p1",
    name: "West Coast Pickleball Championship",
    date: "November 15-18, 2023",
    time: "9:00 AM - 7:00 PM",
    location: "San Diego Tennis Center, California",
    description: "A premier pickleball event featuring top players from the west coast region.",
    status: "pending",
  },
  {
    id: "p2",
    name: "Midwest Pickleball Showdown",
    date: "December 3-5, 2023",
    time: "10:00 AM - 6:00 PM",
    location: "Chicago Indoor Sports, Illinois",
    description: "Indoor tournament with singles and doubles divisions across all skill levels.",
    status: "pending",
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [pendingTournaments, setPendingTournaments] = useState(PENDING_TOURNAMENTS);
  
  const handleApprove = (id: string) => {
    setPendingTournaments(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Tournament Approved",
      description: "The tournament has been approved and is now visible to users.",
    });
  };
  
  const handleReject = (id: string) => {
    setPendingTournaments(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Tournament Rejected",
      description: "The tournament has been rejected and will not be published.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage tournaments and website content</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className="bg-pickle text-white">Admin Access</Badge>
            </div>
          </div>
          
          <Tabs defaultValue="tournaments">
            <TabsList className="mb-8">
              <TabsTrigger value="tournaments">Tournament Requests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tournaments">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Pending Tournament Requests</h2>
                
                {pendingTournaments.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground">No pending tournament requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {pendingTournaments.map((tournament) => (
                      <Card key={tournament.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge className="mb-2 bg-yellow-500">Pending Review</Badge>
                              <CardTitle>{tournament.name}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          </div>
                          
                          <p className="text-sm text-muted-foreground">{tournament.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleReject(tournament.id)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-pickle hover:bg-pickle-dark"
                            onClick={() => handleApprove(tournament.id)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Website Analytics</CardTitle>
                  <CardDescription>Overview of website traffic and user engagement</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage website users and permissions</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">User management dashboard coming soon</p>
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

export default AdminDashboard;
