import { useEffect, useState } from "react";

interface Court {
  _id: string;
  name: string;
  location: string; // City name
  country: string;
  locationCoordinates: [number, number]; // Latitude & Longitude
  contact: string;
}

const CourtList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/court/all")
      .then((res) => res.json())
      .then((data) => {
        setCourts(data);
        setFilteredCourts(data);
      })
      .catch((err) => console.error("Error fetching courts:", err));
  }, []);

  // Apply filters when search input changes
  useEffect(() => {
    setFilteredCourts(
      courts.filter(
        (court) =>
          court.name.toLowerCase().includes(searchName.toLowerCase()) &&
          court.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
          court.country.toLowerCase().includes(searchCountry.toLowerCase())
      )
    );
  }, [searchName, searchLocation, searchCountry, courts]);

  return (
    <div>
      {/* Search Inputs */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Search by country..."
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      {/* Court Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left text-purple-600">Court Name</th>
              <th className="border p-2 text-left text-purple-600">Location</th>
              <th className="border p-2 text-left text-purple-600">Country</th>
              <th className="border p-2 text-left text-purple-600">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourts.map((court) => (
              <tr key={court._id} className="hover:bg-gray-50">
                <td className="border p-2">{court.name}</td>
                <td className="border p-2">{court.location}</td>
                <td className="border p-2">{court.country}</td>
                <td className="border p-2">{court.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { CourtList };
