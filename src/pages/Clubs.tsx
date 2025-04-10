
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import Listview from "@/components/userclubs/listview";
import Mapview from "@/components/userclubs/Mapview";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Search, MapPin, List, X, Plus } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [activeTab, setActiveTab] = useState("map");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Fetch data from the API
    setIsLoading(true);
    fetch("http://localhost:5000/clublist/all")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
        setFilteredClubs(data);

        // Extract unique countries for the filter dropdown
        const uniqueCountries = [...new Set(data.map((club) => club.country))];
        setCountries(uniqueCountries);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clubs:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Apply filters whenever search inputs change
    filterClubs();
  }, [searchTerm, countryFilter, clubs]);

  const filterClubs = () => {
    let results = [...clubs];

    // Filter by name search
    if (searchTerm) {
      results = results.filter((club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by country
    if (countryFilter) {
      results = results.filter((club) => club.country === countryFilter);
    }

    setFilteredClubs(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (value) => {
    setCountryFilter(value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCountryFilter("");
    setFilteredClubs(clubs);
  };

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

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-foreground">
      {/* Main Navbar */}
      <Navbar />

      <motion.div 
        className="container mx-auto px-4 py-8 flex-grow"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div 
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-pickle to-pickle-dark mb-8"
          variants={childVariants}
        >
          <div className="absolute inset-0 bg-pickle-dark opacity-10 pattern-dots"></div>
          <div className="relative z-10 px-6 py-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Pickleball Clubs</h1>
            <p className="text-xl max-w-2xl opacity-90">
              Find the perfect club to play, train, and connect with the pickleball community
            </p>
          </div>
          <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 w-64 h-64 bg-pickle-accent rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/4 w-48 h-48 bg-white rounded-full opacity-10 blur-xl"></div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={childVariants}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center border border-gray-100 dark:border-gray-700">
            <p className="text-2xl md:text-3xl font-bold text-pickle">{clubs.length}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Clubs</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center border border-gray-100 dark:border-gray-700">
            <p className="text-2xl md:text-3xl font-bold text-pickle">{countries.length}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Countries</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center border border-gray-100 dark:border-gray-700">
            <p className="text-2xl md:text-3xl font-bold text-pickle">24/7</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Support</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center border border-gray-100 dark:border-gray-700">
            <p className="text-2xl md:text-3xl font-bold text-pickle">4.8/5</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Rating</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-card border border-border rounded-lg shadow-md mb-6 overflow-hidden"
          variants={childVariants}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Find Your Club</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                <span>{isFiltersOpen ? "Hide Filters" : "Show Filters"}</span>
              </Button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 items-end ${isFiltersOpen ? "opacity-100 max-h-[500px]" : "max-h-[50px] md:max-h-[60px] overflow-hidden"} transition-all duration-300`}>
              {/* Name Search */}
              <div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Search by name</span>
                </div>
                <Input
                  type="text"
                  placeholder="Enter club name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mt-2"
                />
              </div>

              {/* Country Filter */}
              <div className={isFiltersOpen ? "block" : "hidden md:block"}>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Filter by country</span>
                </div>
                <Select value={countryFilter} onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Countries</SelectItem>
                    {countries.map((country, index) => (
                      <SelectItem key={index} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex items-end gap-2">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1"
                  disabled={!searchTerm && !countryFilter}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                <Button
                  className="flex-1 bg-pickle hover:bg-pickle-dark"
                  onClick={() => navigate("/addclubs")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Club
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-4 text-sm text-muted-foreground flex items-center justify-between"
          variants={childVariants}
        >
          <span>Showing {filteredClubs.length} of {clubs.length} clubs</span>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Map</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-1">
                <List className="w-4 h-4" />
                <span>List</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="p-6 bg-card border border-border rounded-lg shadow-md"
          variants={childVariants}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-pickle border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-foreground">Loading clubs...</p>
            </div>
          ) : (
            <TabsContent value="map" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sticky Mapview on the left */}
                <div
                  className="w-full"
                  style={{
                    position: "sticky",
                    top: "1rem",
                    height: "fit-content",
                    zIndex: 1,
                  }}
                >
                  <Mapview clubs={filteredClubs} />
                </div>

                {/* Scrollable Listview */}
                <div className="w-full" style={{ zIndex: 100 }}>
                  <Listview clubs={filteredClubs} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <Listview clubs={filteredClubs} />
            </TabsContent>
          )}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}
