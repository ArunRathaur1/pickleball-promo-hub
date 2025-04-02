
import { useEffect, useState } from "react";

interface Court {
  _id: string;
  name: string;
  location: string; // City name
  country: string;
  locationCoordinates: [number, number]; // Latitude & Longitude
  contact: string;
}

const CourtList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/court/all")
      .then((res) => res.json())
      .then((data) => {
        setCourts(data);
        setFilteredCourts(data);
      })
      .catch((err) => console.error("Error fetching courts:", err));
  }, []);

  // Apply filters when search input changes
  useEffect(() => {
    setFilteredCourts(
      courts.filter(
        (court) =>
          court.name.toLowerCase().includes(searchName.toLowerCase()) &&
          court.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
          court.country.toLowerCase().includes(searchCountry.toLowerCase())
      )
    );
  }, [searchName, searchLocation, searchCountry, courts]);

  return (
    <div className="container mx-auto p-4">
      {/* Search Section with Elevated Design */}
      <div className="bg-card border border-border rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-card-foreground mb-4">Find Courts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10 p-3 w-full bg-muted rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-background transition-all duration-200 text-foreground"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10 p-3 w-full bg-muted rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-background transition-all duration-200 text-foreground"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by country..."
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="pl-10 p-3 w-full bg-muted rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-background transition-all duration-200 text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Court Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court) => (
          <div
            key={court._id}
            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500"
          >
            <div className="relative h-32 bg-muted rounded-lg overflow-hidden mt-3">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Images Coming Soon
                </span>
              </div>
            </div>
            <div className="bg-green-500/10 dark:bg-green-900/20 p-4">
              <h3 className="text-lg font-bold text-foreground">
                {court.name}
              </h3>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500/10 dark:bg-green-900/20 p-2 rounded-full mr-3">
                    <svg
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      Location
                    </div>
                    <div className="text-foreground">
                      {court.location}, {court.country}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-500/10 dark:bg-green-900/20 p-2 rounded-full mr-3">
                    <svg
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      Contact
                    </div>
                    <div className="text-foreground">
                      {court.contact || "No contact information"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button className="bg-background text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400 px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200 text-sm font-medium">
                  View Details
                </button>
                <button className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 text-sm font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourts.length === 0 && (
        <div className="bg-card rounded-lg shadow-md p-8 text-center border border-border">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No courts found
          </h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export { CourtList };
