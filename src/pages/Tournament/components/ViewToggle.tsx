import React from 'react';

interface ViewToggleProps {
  view: string;
  setView: (value: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
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
  );
};

export default ViewToggle;