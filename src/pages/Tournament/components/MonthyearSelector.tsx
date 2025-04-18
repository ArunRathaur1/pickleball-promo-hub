import React from "react";

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
    <div className="w-full p-5  bg-white">
      {/* Filter status and reset button in header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-700">
          📅 Filter by Month & Year
        </h3>
        {activeFilters && (
          <div className="flex items-center">
            <button
              onClick={resetFilters}
              className="ml-4 text-sm text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2.5 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
              style={{ fontSize: "20px" }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Flex Row for Year and Month */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Year Dropdown (20%) */}
        <div className="sm:w-1/5 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Year:
          </label>
          <select
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

        {/* Month Scroll (80%) */}
        <div className="sm:w-4/5 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
          <div className="flex gap-2 min-w-max">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleSelectMonth(month)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 font-medium flex-shrink-0 shadow-sm ${
                  selectedMonth === String(index + 1)
                    ? "bg-green-600 text-white"
                    : "bg-green-50 hover:bg-green-100 text-gray-800"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Info */}
      {(selectedMonth || selectedYear) && (
        <div className="mt-3 text-sm text-gray-700 flex flex-wrap items-center justify-between gap-2">
          <span>
            Showing tournaments in{" "}
            <span className="font-semibold text-green-700">
              {selectedMonth
                ? months[parseInt(selectedMonth) - 1]
                : "any month"}{" "}
              {selectedYear || "any year"}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default MonthYearSelector;
