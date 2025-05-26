
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
  { name: "Asia", image: asia },
  { name: "Europe", image: europe },
  { name: "Africa", image: africa },
  { name: "North America", image: norame },
  { name: "South America", image: souame },
  { name: "Australia", image: aus },
];

const ContinentSelector: React.FC<ContinentSelectorProps> = ({
  selectedContinent,
  setSelectedContinent,
}) => {
  const handleSelect = (name: string) => {
    setSelectedContinent(selectedContinent === name ? null : name);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Filter by Continent
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {continents.map(({ name, image }) => (
            <div
              key={name}
              onClick={() => handleSelect(name)}
              className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedContinent === name
                  ? "border-green-500 shadow-lg ring-2 ring-green-200"
                  : "border-gray-200 hover:border-green-300 hover:shadow-md"
              }`}
            >
              <div className="relative">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-24 md:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                  selectedContinent === name ? "opacity-30" : "opacity-0 group-hover:opacity-30"
                }`} />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className={`text-white font-semibold text-sm text-center transition-all duration-300 ${
                    selectedContinent === name ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}>
                    {name}
                  </p>
                </div>
              </div>
              <div className="p-2 bg-white">
                <p className={`text-center text-sm font-medium transition-colors duration-300 ${
                  selectedContinent === name 
                    ? "text-green-700" 
                    : "text-gray-700 group-hover:text-green-600"
                }`}>
                  {name}
                </p>
              </div>
            </div>
          ))}
        </div>
        {selectedContinent && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Filtering by: {selectedContinent}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContinentSelector;
