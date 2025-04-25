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
    <div className="w-full mb-4">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap", // ✅ wrap images to next row if needed
          gap: "20px", // space between items
        }}
      >
        {continents.map(({ name, image }) => (
          <div
            key={name}
            onClick={() => handleSelect(name)}
            className={`${
              selectedContinent === name
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-100 hover:bg-gray-200"
            } p-2 rounded-md`}
          >
            <img
              src={image}
              alt={name}
              style={{
                width: "200px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinentSelector;
