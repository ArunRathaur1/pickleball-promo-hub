
import React from "react";
import { X } from "lucide-react";

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
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return months[parseInt(monthNum) - 1];
  };

  const activeFilters = [];

  if (search) activeFilters.push({ type: "Name", value: search });
  if (locationFilter) activeFilters.push({ type: "Location", value: locationFilter });
  if (countryFilter) activeFilters.push({ type: "Country", value: countryFilter });
  if (continentFilter) activeFilters.push({ type: "Continent", value: continentFilter });
  if (selectedContinent) activeFilters.push({ type: "Continent", value: selectedContinent });
  if (tierFilter) activeFilters.push({ type: "Tier", value: `Tier ${tierFilter}` });
  if (selectedMonth && selectedYear) {
    activeFilters.push({ type: "Period", value: `${getMonthName(selectedMonth)} ${selectedYear}` });
  } else if (selectedMonth) {
    activeFilters.push({ type: "Month", value: getMonthName(selectedMonth) });
  } else if (selectedYear) {
    activeFilters.push({ type: "Year", value: selectedYear });
  }
  if (selectedDate) {
    activeFilters.push({ type: "Date", value: displayDate(selectedDate) });
  }

  return (
    <div className="w-full py-4">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-700 mr-2">
            Active Filters:
          </span>
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white text-green-800 text-xs font-medium rounded-full border border-green-200 shadow-sm"
            >
              <span className="font-semibold">{filter.type}:</span>
              <span>{filter.value}</span>
            </span>
          ))}
          <div className="text-xs text-gray-500 ml-2">
            {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} applied
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSummary;
