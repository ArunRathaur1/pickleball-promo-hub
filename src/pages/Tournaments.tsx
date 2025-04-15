import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TournamentList } from "@/components/tournaments/tournamentdetails/tournament-list";
import { TournamentMap } from "@/components/tournaments/tournamentdetails/tournament-map";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface Tournament {
  _id: string;
  name: string;
  Organizer: string;
  location: string;
  country: string;
  Continent: string;
  Tier: number;
  startDate: string;
  endDate: string;
  description: string;
  locationCoords: [number, number];
  status: string;
  imageUrl: string;
}

// Function to format date properly
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [continentFilter, setContinentFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [view, setView] = useState("list");
  const [dateRange, setDateRange] = useState({
    min: null,
    max: null,
    current: { start: null, end: null },
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // List of unique continents, countries, and tiers for dropdown filters
  const [continents, setContinents] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [tiers, setTiers] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tournaments/approved")
      .then((res) => res.json())
      .then((data: Tournament[]) => {
        setTournaments(data);
        setFilteredTournaments(data);

        // Extract unique values for filter dropdowns
        setContinents([...new Set(data.map((t) => t.Continent))]);
        setCountries([...new Set(data.map((t) => t.country))]);
        setTiers([...new Set(data.map((t) => t.Tier))].sort((a, b) => a - b));

        // Find min and max dates for the date slider
        if (data.length > 0) {
          const sortedByStartDate = [...data].sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          );
          const sortedByEndDate = [...data].sort(
            (a, b) => new Date(a.endDate) - new Date(b.endDate)
          );

          const minDate = new Date(sortedByStartDate[0].startDate);
          const maxDate = new Date(
            sortedByEndDate[sortedByEndDate.length - 1].endDate
          );

          setDateRange({
            min: minDate,
            max: maxDate,
            current: { start: minDate, end: maxDate },
          });

          // Initialize the date filter
          setDateFilter({
            startDate: formatDate(minDate),
            endDate: formatDate(maxDate),
          });
        }
      })
      .catch((err) => console.error("Error fetching tournaments:", err));
  }, []);

  useEffect(() => {
    const filtered = tournaments.filter((tournament) => {
      // Name search filter
      const nameMatch = tournament.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Location filter
      const locationMatch = tournament.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

      // Country filter
      const countryMatch =
        !countryFilter || tournament.country === countryFilter;

      // Continent filter
      const continentMatch =
        !continentFilter || tournament.Continent === continentFilter;

      // Tier filter
      const tierMatch = !tierFilter || tournament.Tier === Number(tierFilter);

      // Date filter
      let dateMatch = true;
      if (dateFilter.startDate && dateFilter.endDate) {
        const tournamentStart = new Date(tournament.startDate);
        const tournamentEnd = new Date(tournament.endDate);
        const filterStart = new Date(dateFilter.startDate);
        const filterEnd = new Date(dateFilter.endDate);

        // Check if tournament dates overlap with filter dates
        dateMatch = !(
          tournamentEnd < filterStart || tournamentStart > filterEnd
        );
      }

      return (
        nameMatch &&
        locationMatch &&
        countryMatch &&
        continentMatch &&
        tierMatch &&
        dateMatch
      );
    });

    setFilteredTournaments(filtered);
  }, [
    search,
    locationFilter,
    countryFilter,
    continentFilter,
    tierFilter,
    dateFilter,
    tournaments,
  ]);

  // Helper function to format dates to YYYY-MM-DD
  const displayDate = (dateString: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper to display dates in a more user-friendly format
  const calculateDaysRemaining = (startDate: string) => {
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    const diffTime = start - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Generate months between two dates for the slider
  const getMonthsBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];

    start.setDate(1);

    while (start <= end) {
      months.push(new Date(start));
      start.setMonth(start.getMonth() + 1);
    }

    return months;
  };

  // Calculate the position for the date slider thumbs
  const calculateThumbPosition = (date) => {
    if (!dateRange.min || !dateRange.max || !date) return 0;

    const totalDays = (dateRange.max - dateRange.min) / (1000 * 60 * 60 * 24);
    const daysDiff = (new Date(date) - dateRange.min) / (1000 * 60 * 60 * 24);

    return (daysDiff / totalDays) * 100;
  };

  // Handle slider thumb movement
  const handleThumbMove = (isStart, position) => {
    if (!dateRange.min || !dateRange.max) return;

    const totalDays = (dateRange.max - dateRange.min) / (1000 * 60 * 60 * 24);
    const dayOffset = Math.round((position / 100) * totalDays);

    const newDate = new Date(dateRange.min);
    newDate.setDate(newDate.getDate() + dayOffset);

    if (isStart) {
      // Ensure start date doesn't go past end date
      if (newDate > new Date(dateFilter.endDate)) return;

      setDateFilter({
        ...dateFilter,
        startDate: formatDate(newDate),
      });
      setDateRange({
        ...dateRange,
        current: {
          ...dateRange.current,
          start: newDate,
        },
      });
    } else {
      // Ensure end date doesn't go before start date
      if (newDate < new Date(dateFilter.startDate)) return;

      setDateFilter({
        ...dateFilter,
        endDate: formatDate(newDate),
      });
      setDateRange({
        ...dateRange,
        current: {
          ...dateRange.current,
          end: newDate,
        },
      });
    }
  };

  // Move date range by a specific time period
  const moveDateRange = (direction, unit) => {
    const startDate = new Date(dateFilter.startDate);
    const endDate = new Date(dateFilter.endDate);

    let modifier = direction === "forward" ? 1 : -1;

    if (unit === "month") {
      startDate.setMonth(startDate.getMonth() + modifier);
      endDate.setMonth(endDate.getMonth() + modifier);
    } else if (unit === "week") {
      startDate.setDate(startDate.getDate() + 7 * modifier);
      endDate.setDate(endDate.getDate() + 7 * modifier);
    }

    // Check if new dates are within overall range
    if (startDate < dateRange.min) {
      startDate.setTime(dateRange.min.getTime());
    }

    if (endDate > dateRange.max) {
      endDate.setTime(dateRange.max.getTime());
    }

    setDateFilter({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
    setDateRange({
      ...dateRange,
      current: {
        start: startDate,
        end: endDate,
      },
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setLocationFilter("");
    setCountryFilter("");
    setContinentFilter("");
    setTierFilter("");

    // Reset dates to full range
    if (dateRange.min && dateRange.max) {
      setDateFilter({
        startDate: formatDate(dateRange.min),
        endDate: formatDate(dateRange.max),
      });
      setDateRange({
        ...dateRange,
        current: {
          start: dateRange.min,
          end: dateRange.max,
        },
      });
    } else {
      setDateFilter({ startDate: "", endDate: "" });
    }
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      search ||
      locationFilter ||
      countryFilter ||
      continentFilter ||
      tierFilter ||
      (dateFilter.startDate &&
        dateFilter.endDate &&
        (dateFilter.startDate !== formatDate(dateRange.min) ||
          dateFilter.endDate !== formatDate(dateRange.max)))
    );
  };

  const months = getMonthsBetween(dateRange.min, dateRange.max);
  const startThumbPosition = calculateThumbPosition(dateFilter.startDate);
  const endThumbPosition = calculateThumbPosition(dateFilter.endDate);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-6">
        <div className="w-full bg-white py-4 border-b flex justify-center gap-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all ${
              view === "list" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all ${
              view === "map" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("map")}
          >
            Map View
          </button>
        </div>

        {/* Filter section */}
        <div className="w-full flex justify-center mt-6">
          <div className="w-11/12 lg:w-3/4 border border-gray-300 rounded-lg bg-white mb-6 overflow-hidden">
            {/* Filter header with toggle button */}
            <div 
              className="p-4 flex justify-between items-center cursor-pointer border-b border-gray-200 hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasActiveFilters() && (
                  <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                )}
              </div>
              <div className="flex items-center">
                {hasActiveFilters() && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetFilters();
                    }}
                    className="mr-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>
                )}
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {/* Collapsible filter content */}
            {showFilters && (
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Search by name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search by Name
                    </label>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Tournament name..."
                    />
                  </div>

                  {/* Location filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="City/Venue..."
                    />
                  </div>

                  {/* Country filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={countryFilter}
                      onChange={(e) => setCountryFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">All Countries</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Continent filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Continent
                    </label>
                    <select
                      value={continentFilter}
                      onChange={(e) => setContinentFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">All Continents</option>
                      {continents.map((continent) => (
                        <option key={continent} value={continent}>
                          {continent}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tier filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tier
                    </label>
                    <select
                      value={tierFilter}
                      onChange={(e) => setTierFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">All Tiers</option>
                      {tiers.map((tier) => (
                        <option key={tier} value={tier}>
                          Tier {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date filter with calendar icon */}
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Tournament Date Range
                      </label>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveDateRange("backward", "week")}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveDateRange("forward", "week")}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Date display */}
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span>{displayDate(dateFilter.startDate)}</span>
                      <span>{displayDate(dateFilter.endDate)}</span>
                    </div>

                    {/* Date slider */}
                    <div className="relative h-12 mb-4">
                      {/* Rail */}
                      <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded">
                        {/* Selected range */}
                        <div
                          className="absolute h-1 bg-green-500 rounded"
                          style={{
                            left: `${startThumbPosition}%`,
                            width: `${endThumbPosition - startThumbPosition}%`,
                          }}
                        ></div>
                      </div>

                      {/* Month markers */}
                      <div className="absolute top-8 left-0 right-0 flex justify-between">
                        {months.map((month, index) => (
                          <div
                            key={index}
                            className="relative"
                            style={{
                              left: `${calculateThumbPosition(month)}%`,
                              transform: "translateX(-50%)",
                            }}
                          >
                            <div className="h-2 w-1 bg-gray-300"></div>
                            {index % 2 === 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                {month.toLocaleDateString(undefined, {
                                  month: "short",
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Start thumb */}
                      <div
                        className="absolute top-4 w-4 h-4 bg-white border-2 border-green-500 rounded-full cursor-pointer transform -translate-x-1/2"
                        style={{ left: `${startThumbPosition}%` }}
                        draggable
                        onDrag={(e) => {
                          if (e.clientX === 0) return; // Ignore end of drag
                          const slider = (e.target as HTMLElement).parentElement;
                          const rect = slider.getBoundingClientRect();
                          const position =
                            ((e.clientX - rect.left) / rect.width) * 100;
                          if (position >= 0 && position <= endThumbPosition) {
                            handleThumbMove(true, position);
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      ></div>

                      {/* End thumb */}
                      <div
                        className="absolute top-4 w-4 h-4 bg-white border-2 border-green-500 rounded-full cursor-pointer transform -translate-x-1/2"
                        style={{ left: `${endThumbPosition}%` }}
                        draggable
                        onDrag={(e) => {
                          if (e.clientX === 0) return; // Ignore end of drag
                          const slider = (e.target as HTMLElement).parentElement;
                          const rect = slider.getBoundingClientRect();
                          const position =
                            ((e.clientX - rect.left) / rect.width) * 100;
                          if (position <= 100 && position >= startThumbPosition) {
                            handleThumbMove(false, position);
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      ></div>
                    </div>

                    {/* Calendar date picker (conditionally shown) */}
                    {showDatePicker && (
                      <div className="bg-white border border-gray-200 rounded-md shadow-lg p-2 mt-1">
                        <div className="flex gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={dateFilter.startDate}
                              min={dateRange.min ? formatDate(dateRange.min) : ""}
                              max={dateFilter.endDate}
                              onChange={(e) => {
                                const newDate = e.target.value;
                                setDateFilter({
                                  ...dateFilter,
                                  startDate: newDate,
                                });
                                setDateRange({
                                  ...dateRange,
                                  current: {
                                    ...dateRange.current,
                                    start: new Date(newDate),
                                  },
                                });
                              }}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={dateFilter.endDate}
                              min={dateFilter.startDate}
                              max={dateRange.max ? formatDate(dateRange.max) : ""}
                              onChange={(e) => {
                                const newDate = e.target.value;
                                setDateFilter({
                                  ...dateFilter,
                                  endDate: newDate,
                                });
                                setDateRange({
                                  ...dateRange,
                                  current: {
                                    ...dateRange.current,
                                    end: new Date(newDate),
                                  },
                                });
                              }}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Quick select buttons */}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              // Set to next 30 days
                              const today = new Date();
                              const thirtyDaysLater = new Date();
                              thirtyDaysLater.setDate(today.getDate() + 30);

                              setDateFilter({
                                startDate: formatDate(today),
                                endDate: formatDate(thirtyDaysLater),
                              });
                              setDateRange({
                                ...dateRange,
                                current: {
                                  start: today,
                                  end: thirtyDaysLater,
                                },
                              });
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            Next 30 Days
                          </button>
                          <button
                            onClick={() => {
                              // Set to next 3 months
                              const today = new Date();
                              const threeMonthsLater = new Date();
                              threeMonthsLater.setMonth(today.getMonth() + 3);

                              setDateFilter({
                                startDate: formatDate(today),
                                endDate: formatDate(threeMonthsLater),
                              });
                              setDateRange({
                                ...dateRange,
                                current: {
                                  start: today,
                                  end: threeMonthsLater,
                                },
                              });
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            Next 3 Months
                          </button>
                          <button
                            onClick={() => {
                              // Set to all dates
                              setDateFilter({
                                startDate: formatDate(dateRange.min),
                                endDate: formatDate(dateRange.max),
                              });
                              setDateRange({
                                ...dateRange,
                                current: {
                                  start: dateRange.min,
                                  end: dateRange.max,
                                },
                              });
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            All Dates
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Display summary of active filters when collapsed */}
        {!showFilters && hasActiveFilters() && (
          <div className="w-full flex justify-center -mt-4 mb-4">
            <div className="w-11/12 lg:w-3/4 flex flex-wrap gap-2">
              {search && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                  Name: {search}
                </span>
              )}
              {locationFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                  Location: {locationFilter}
                </span>
              )}
              {countryFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                  Country: {countryFilter}
                </span>
              )}
              {continentFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                  Continent: {continentFilter}
                </span>
              )}
              {tierFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                  Tier: {tierFilter}
                </span>
              )}
              {dateFilter.startDate && dateFilter.endDate && 
                (dateFilter.startDate !== formatDate(dateRange.min) || 
                dateFilter.endDate !== formatDate(dateRange.max)) && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                  Dates: {displayDate(dateFilter.startDate)} - {displayDate(dateFilter.endDate)}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="w-full flex justify-center">
          <div className="w-11/12 lg:w-3/4 border border-gray-300 rounded-lg p-4">
            {view === "list" && (
              <TournamentList tournaments={filteredTournaments} />
            )}
            {view === "map" && (
              <TournamentMap tournaments={filteredTournaments} />
            )}
          </div>
        </div>

        {filteredTournaments.length === 0 && (
          <div className="w-full flex justify-center mt-6">
            <div className="w-11/12 lg:w-3/4 text-center py-6 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">
                No tournaments found matching your search criteria.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
