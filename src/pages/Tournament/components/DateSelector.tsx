import React from "react";

interface DateSelectorProps {
  tournaments: any[];
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  tournaments,
  selectedDate,
  setSelectedDate,
}) => {
  const getUniqueDates = () => {
    const dates = new Set<string>();
    tournaments.forEach((tournament) => {
      const start = new Date(tournament.startDate);
      const end = new Date(tournament.endDate);
      const current = new Date(start);
      while (current <= end) {
        dates.add(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });
    return Array.from(dates).sort();
  };

  const uniqueDates = getUniqueDates();

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-medium mb-3">Filter by Specific Date</h3>

      {/* Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        {uniqueDates.map((date) => (
          <button
            key={date}
            onClick={() => handleSelectDate(date)}
            className={`px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
              selectedDate === date
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {formatDisplayDate(date)}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-2 text-sm text-gray-600">
          Showing tournaments active on {formatDisplayDate(selectedDate)}
          <button
            onClick={() => setSelectedDate(null)}
            className="ml-2 text-blue-500 hover:underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
