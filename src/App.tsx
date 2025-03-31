import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournaments from "./pages/Tournaments";
import TournamentSubmit from "./pages/TournamentSubmit";
import Services from "./pages/Services";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard.jsx";
import NotFound from "./pages/NotFound";
import Athletes from "./pages/Athletes";
import CourtPage from "./pages/CourtPage";
import PlayerProfile from "./pages/Playerprofile.js";
import AdminLogin from "./components/admin/admin-login.js";
import AdminSingup from './components/admin/admin-signup.js';
import { useState } from "react";
import CourtSubmit from "./pages/CourtSubmit.js";
import ContactPage from "./pages/ContactPage.js";
import Blogpage from "./pages/Blogpage.js";
import Clubs from "./pages/Clubs.js";

const queryClient = new QueryClient();

const App = () => {
  const [playerData, setPlayerData] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/submit" element={<TournamentSubmit />} />
            <Route path="/courts/submit" element={<CourtSubmit />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/adminblog" element={<Blogpage />} />
            <Route path='/clubs' element={<Clubs></Clubs>}></Route>
            <Route
              path="/athletes"
              element={<Athletes/>}
            />
            <Route path="/courts" element={<CourtPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route
              path="/playerprofile"
              element={<PlayerProfile />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path='adminlogin12345'element={<AdminLogin></AdminLogin>}></Route>
            <Route path="adminsignup12345"element={<AdminSingup></AdminSingup>}></Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
