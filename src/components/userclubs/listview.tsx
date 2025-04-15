
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, AlertCircle, X, Users, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Club {
  _id: string;
  name: string;
  email: string;
  contact: string;
  status?: "pending" | "approved" | "rejected";
  location: string;
  country: string;
  clubimageUrl?: string;
  logoimageUrl?: string;
  bookinglink?: string;
  followers?: number;
  [key: string]: any;
}

interface ListviewProps {
  clubs: Club[];
}

export default function Listview({ clubs }: ListviewProps) {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; clubName: string } | null>(null);

  const handleViewDetails = (clubId: string) => {
    navigate(`/clubdetails/${clubId}`);
  };

  const handleBookingClick = (club: Club) => {
    if (club.bookinglink) {
      window.open(club.bookinglink, "_blank", "noopener,noreferrer");
    } else {
      // Show alert with club name
      setAlertInfo({ show: true, clubName: club.name });
      
      // Auto-hide the alert after 3 seconds
      setTimeout(() => {
        setAlertInfo(null);
      }, 3000);
    }
  };

  // Filter approved clubs only
  const approvedClubs = clubs.filter((club) => club.status === "approved");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Top Alert */}
      <AnimatePresence>
        {alertInfo && alertInfo.show && (
          <motion.div 
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>No booking link available for {alertInfo.clubName}</span>
              </div>
              <button 
                onClick={() => setAlertInfo(null)} 
                className="focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Club Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {approvedClubs.map((club) => (
          <motion.div 
            key={club._id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
              {/* Club Image with Gradient Overlay */}
              <div className="relative h-48 overflow-hidden">
                {club.logoimageUrl || club.clubimageUrl ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123c2f]/80 to-transparent z-10"></div>
                    <img
                      src={club.logoimageUrl || club.clubimageUrl}
                      alt={`${club.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </>
                ) : (
                  <div className="w-full h-full bg-[#123c2f]/20 flex items-center justify-center">
                    <span className="text-gray-600">No image available</span>
                  </div>
                )}
                
                {/* Club Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white truncate">{club.name}</h3>
                </div>
              </div>

              {/* Club Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-[#123c2f]" />
                  <span className="truncate">
                    {club.location}, {club.country}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-[#123c2f]" />
                  <span>{club.contact}</span>
                </div>
                
                {club.followers !== undefined && (
                  <div className="flex items-center text-gray-700">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0 text-[#123c2f]" />
                    <span>{club.followers} Followers</span>
                  </div>
                )}

                <div className="pt-3 flex flex-col gap-2">
                  <Button
                    variant="default"
                    className="w-full bg-[#123c2f] hover:bg-[#0b2820] text-white font-medium transition-all duration-300"
                    onClick={() => handleViewDetails(club._id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#123c2f] text-[#123c2f] hover:bg-[#123c2f]/10 transition-all duration-300"
                    onClick={() => handleBookingClick(club)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
