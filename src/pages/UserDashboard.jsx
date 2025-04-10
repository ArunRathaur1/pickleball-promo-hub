import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/layout/footer";
import UserTournaments from "@/components/dashboard/UserTournaments";
import UserServices from "@/components/dashboard/UserServices";
import UserProfile from "@/components/dashboard/UserProfile";
import {Navbar} from  '../components/layout/navbar';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                {userData
                  ? `Welcome, ${userData.name}!`
                  : "My Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                Manage your tournaments and services
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/addclubs">
                <Button className="bg-pickle hover:bg-pickle-dark">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Clubs
                </Button>
              </Link>
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

          <Tabs defaultValue="profile">
            <TabsList className="mb-8">
              {/* <TabsTrigger value="tournaments">My Tournaments</TabsTrigger> */}
              {/* <TabsTrigger value="services">My Services</TabsTrigger> */}
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* <TabsContent value="tournaments">
              <UserTournaments />
            </TabsContent>

            <TabsContent value="services">
              <UserServices />
            </TabsContent> */}

            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
