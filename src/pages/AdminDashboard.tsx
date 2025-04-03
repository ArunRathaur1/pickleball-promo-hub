import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoggedNavbar } from "@/components/layout/loggednavbar";
import { Footer } from "@/components/layout/footer";
import TournamentRequestsPage from "../components/admin/Tournament";
import AnalyticsPage from "../components/admin/Analytics";
import UsersPage from "../components/admin/userpage";
import AddAthlete from "../components/athletes/AddAthlete"
import BlogList from "@/components/blogs/BlogList";
import InstagramNavbar from "@/components/admin/instagram";

import AdminClub from "@/components/admin/admin-club";
const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LoggedNavbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage tournaments and website content
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className="bg-pickle text-white">Admin Access</Badge>
            </div>
          </div>

          <Tabs defaultValue="tournaments">
            <TabsList className="mb-8">
              <TabsTrigger value="tournaments">Tournament Requests</TabsTrigger>
              <TabsTrigger value="athlete">Add Athlete</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value='instagram'>Instagram</TabsTrigger>
            </TabsList> 

            <TabsContent value="tournaments">
              <TournamentRequestsPage />
            </TabsContent>

            <TabsContent value="athlete">
              <AddAthlete />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogList />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsPage />
            </TabsContent>

            <TabsContent value="users">
              <UsersPage />
            </TabsContent>
            <TabsContent value="clubs">
              <AdminClub />
            </TabsContent>
            <TabsContent value='instagram'>
              <InstagramNavbar></InstagramNavbar>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
