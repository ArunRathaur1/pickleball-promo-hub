import React from "react";
import { styleText } from "util";

interface DateSelectorProps {
  tournaments: any[];
  selectedMonth: string | null;
  selectedYear: string | null;
  setSelectedMonth: (month: string | null) => void;
  setSelectedYear: (year: string | null) => void;
  activeFilters: boolean;
  resetFilters: () => void;
}

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

const MonthYearSelector: React.FC<DateSelectorProps> = ({
  tournaments,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  activeFilters,
  resetFilters,
}) => {
  const getUniqueYears = () => {
    const years = new Set<string>();
    tournaments.forEach((t) => {
      const startYear = new Date(t.startDate).getFullYear();
      const endYear = new Date(t.endDate).getFullYear();
      for (let year = startYear - 5; year <= endYear + 5; year++) {
        years.add(year.toString());
      }
    });
    return Array.from(years).sort();
  };

  const years = getUniqueYears();

  const handleSelectMonth = (monthName: string) => {
    const monthIndex = months.indexOf(monthName) + 1;
    const monthNumber = monthIndex.toString();
    setSelectedMonth(selectedMonth === monthNumber ? null : monthNumber);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-5 "style={{background:"lightgray",marginBottom:'10px'}}>
      {/* Header */}

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Year Selector */}
        <div className="sm:w-1/5 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Year:
          </label>
          <select
            style={{ height: "50px" }}
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(e.target.value || null)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Selector */}
        <div className="sm:w-4/5 w-full overflow-x-auto pt-6">
          <div
            className="flex min-w-full border-b border-gray-300 bg-gray-100 rounded-md py-2 px-4"
            style={{ gap: "24px" }}
          >
            {months.map((month, index) => (
              <div
                key={month}
                onClick={() => handleSelectMonth(month)}
                className={`text-center cursor-pointer transition-all duration-200 font-semibold text-base px-2 py-1 ${
                  selectedMonth === String(index + 1)
                    ? "border-b-4 border-green-600 text-green-700"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthYearSelector;
