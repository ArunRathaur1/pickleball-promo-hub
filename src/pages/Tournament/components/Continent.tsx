import React from "react";
import asia from "../../../images/asia.jpg";
import europe from "../../../images/europe1.jpg";
import aus from "../../../images/aus.jpg";
import africa from "../../../images/europe.png";
import norame from "../../../images/northamerica.avif";
import souame from "../../../images/southamerica.jpg";

interface ContinentSelectorProps {
  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;
}

const continents = [
  {
    name: "Asia",
    image: asia,
  },
  {
    name: "Europe",
    image: europe,
  },
  {
    name: "Africa",
    image: africa,
  },
  {
    name: "North America",
    image: norame,
  },
  {
    name: "South America",
    image:souame,
  },
  {
    name: "Australia",
    image: aus,
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
