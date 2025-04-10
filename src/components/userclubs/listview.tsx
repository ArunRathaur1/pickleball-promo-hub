
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, AlertCircle, X, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
  [key: string]: any;
}

interface ListviewProps {
  clubs: Club[];
}

export default function Listview({ clubs }: ListviewProps) {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState<{ show: boolean; clubName: string } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.5,
        ease: "easeInOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Top Alert */}
      {alertInfo && alertInfo.show && (
        <motion.div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>No booking link available for {alertInfo.clubName}</span>
            </div>
            <button 
              onClick={() => setAlertInfo(null)} 
              className="focus:outline-none hover:bg-amber-100 p-1 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Club Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {approvedClubs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No clubs available</h3>
            <p className="text-gray-500 max-w-sm">
              There are currently no approved clubs to display. Please check back later.
            </p>
          </div>
        ) : (
          approvedClubs.map((club, index) => (
            <motion.div
              key={club._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
              onMouseEnter={() => setHoveredCard(club._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="overflow-hidden h-full flex flex-col border border-gray-200 bg-card transition-all duration-300">
                {/* Club Image with Gradient Overlay */}
                <div className="relative h-48 overflow-hidden">
                  {club.logoimageUrl ? (
                    <img
                      src={club.logoimageUrl}
                      alt={`${club.name}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform: hoveredCard === club._id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  ) : club.clubimageUrl ? (
                    <img
                      src={club.clubimageUrl}
                      alt={`${club.name} logo`}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform: hoveredCard === club._id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">No image available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>

                {/* Club Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 truncate text-foreground">{club.name}</h3>

                  <div className="flex items-center mb-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-pickle" />
                    <span className="truncate">
                      {club.location}, {club.country}
                    </span>
                  </div>

                  <div className="flex items-center mb-4 text-gray-600">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-pickle" />
                    <span>{club.contact}</span>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <Button
                      variant="default"
                      className="w-full bg-pickle hover:bg-pickle-dark text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => handleViewDetails(club._id)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-pickle text-pickle hover:bg-pickle-light/20 transition-all duration-300"
                      onClick={() => handleBookingClick(club)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
}
