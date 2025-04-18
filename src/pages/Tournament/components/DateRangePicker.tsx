import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  dateFilter: {
    startDate: string;
    endDate: string;
  };
  setDateFilter: (value: { startDate: string; endDate: string }) => void;
  dateRange: {
    min: Date | null;
    max: Date | null;
    current: { start: Date | null; end: Date | null };
  };
  setDateRange: (value: any) => void;
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  formatDate: (date: Date | string) => string;
  displayDate: (dateString: string) => string;
  calculateThumbPosition: (date: string) => number;
  handleThumbMove: (isStart: boolean, position: number) => void;
  moveDateRange: (direction: string, unit: string) => void;
  getMonthsBetween: (startDate: Date | null, endDate: Date | null) => Date[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateFilter,
  setDateFilter,
  dateRange,
  setDateRange,
  showDatePicker,
  setShowDatePicker,
  formatDate,
  displayDate,
  calculateThumbPosition,
  handleThumbMove,
  moveDateRange,
  getMonthsBetween,
}) => {
  const months = getMonthsBetween(dateRange.min, dateRange.max);
  const startThumbPosition = calculateThumbPosition(dateFilter.startDate);
  const endThumbPosition = calculateThumbPosition(dateFilter.endDate);

  return (
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
                left: `${calculateThumbPosition(formatDate(month))}%`,
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
            const slider = e.target.parentElement;
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
            const slider = e.target.parentElement;
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
  );
};

export default DateRangePicker;