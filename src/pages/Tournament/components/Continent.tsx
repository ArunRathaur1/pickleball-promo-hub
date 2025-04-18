import React from "react";

interface ContinentSelectorProps {
  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;
}

const continents = [
  {
    name: "Asia",
    image: "https://source.unsplash.com/1600x900/?asia",
  },
  {
    name: "Europe",
    image: "https://source.unsplash.com/1600x900/?europe",
  },
  {
    name: "Africa",
    image: "https://source.unsplash.com/1600x900/?africa",
  },
  {
    name: "North America",
    image: "https://source.unsplash.com/1600x900/?north-america",
  },
  {
    name: "South America",
    image: "https://source.unsplash.com/1600x900/?south-america",
  },
  {
    name: "Australia",
    image: "https://source.unsplash.com/1600x900/?australia",
  },
  {
    name: "Antarctica",
    image: "https://source.unsplash.com/1600x900/?antarctica",
  },
];

const ContinentSelector: React.FC<ContinentSelectorProps> = ({
  selectedContinent,
  setSelectedContinent,
}) => {
  const handleSelect = (name: string) => {
    setSelectedContinent(selectedContinent === name ? null : name);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 mb-4">
      <div className="flex w-max gap-3 items-center">
        {continents.map(({ name, image }) => (
          <button
            key={name}
            onClick={() => handleSelect(name)}
            className={`flex flex-col items-center p-2 rounded-md border transition-all min-w-[80px] ${
              selectedContinent === name
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <img
              src={image}
              alt={name}
              className="w-12 h-12 object-contain mb-1"
            />
            <span className="text-xs font-medium text-center">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContinentSelector;
