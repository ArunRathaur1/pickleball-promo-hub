import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import PlayerProfile from "./pages/Playerprofile.tsx";
import AdminLogin from "./components/admin/admin-login.js";
import AdminSingup from "./components/admin/admin-signup.js";
import CourtSubmit from "./pages/CourtSubmit.js";
import ContactPage from "./pages/ContactPage.js";
import Blogpage from "./pages/Blogpage.js";
import Clubs from "./pages/Clubs.js";
import Chatbot from "./components/Chatbot";
import Sponser from './components/sponser/Sponser.js'
import InstagramNavbar from "./components/admin/instagram.js";

const queryClient = new QueryClient();

// Create a ChatbotWrapper to manage global chatbot state
const ChatbotWrapper = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{ position: "relative", zIndex: 10000 }}>
      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          fontSize: "24px",
          zIndex: 10000,
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        💬
      </button>

      {/* Chatbot Component */}
      {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ChatbotWrapper comes before the BrowserRouter to ensure it's on top layer */}
        <ChatbotWrapper />

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
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/courts" element={<CourtPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/playerprofile/:id" element={<PlayerProfile />} />
            <Route path ='/signup' element={<Register></Register>}></Route>
            <Route path="*" element={<NotFound />} />
            <Route path="adminlogin12345" element={<AdminLogin />} />
            <Route path="adminsignup12345" element={<AdminSingup />} />
            <Route path='/sponsor' element={<Sponser></Sponser>}></Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
