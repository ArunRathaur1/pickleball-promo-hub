import React from "react";

interface FilterSummaryProps {
  search: string;
  locationFilter: string;
  countryFilter: string;
  continentFilter: string;
  tierFilter: string;
  dateFilter: {
    startDate: string;
    endDate: string;
  };
  dateRange: {
    min: Date | null;
    max: Date | null;
  };
  selectedDate?: string | null;
  selectedMonth?: string | null;
  selectedYear?: string | null;
  selectedContinent?: string | null;
  formatDate: (date: Date | null) => string;
  displayDate: (dateString: string) => string;
  hasActiveFilters: () => boolean;
  showFilters: boolean;
}

const FilterSummary: React.FC<FilterSummaryProps> = ({
  search,
  locationFilter,
  countryFilter,
  continentFilter,
  tierFilter,
  dateFilter,
  dateRange,
  selectedDate,
  selectedMonth,
  selectedYear,
  selectedContinent,
  formatDate,
  displayDate,
  hasActiveFilters,
  showFilters,
}) => {
  if (showFilters || !hasActiveFilters()) return null;

  // Format month name
  const getMonthName = (monthNum: string) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[parseInt(monthNum) - 1];
  };

  return (
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
        {selectedContinent && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            Continent: {selectedContinent}
          </span>
        )}
        {tierFilter && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            Tier: {tierFilter}
          </span>
        )}
        {dateFilter.startDate &&
          dateFilter.endDate &&
          (dateFilter.startDate !== formatDate(dateRange.min) ||
            dateFilter.endDate !== formatDate(dateRange.max)) && (
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
              Dates: {displayDate(dateFilter.startDate)} -{" "}
              {displayDate(dateFilter.endDate)}
            </span>
          )}
        {selectedDate && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            Specific date: {displayDate(selectedDate)}
          </span>
        )}
        {selectedMonth && selectedYear && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            Period: {getMonthName(selectedMonth)} {selectedYear}
          </span>
        )}
        {selectedMonth && !selectedYear && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            Month: {getMonthName(selectedMonth)}
          </span>
        )}
        {!selectedMonth && selectedYear && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            Year: {selectedYear}
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterSummary;
