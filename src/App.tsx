import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Tournaments from "./pages/Tournaments";
import TournamentSubmit from "./pages/TournamentSubmit";
import Services from "./pages/Services";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard.jsx";
import NotFound from "./pages/NotFound";
import Athletes from "./pages/Athletes";
import CourtPage from "./pages/CourtPage";
import PlayerProfile from "./pages/Playerprofile.js";
import { useState } from "react";

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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/submit" element={<TournamentSubmit />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/athletes"
              element={<Athletes setplayerData={setPlayerData} />}
            />
            <Route path="/courts" element={<CourtPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route
              path="/playerprofile"
              element={<PlayerProfile playerData={playerData} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
