import { useEffect, useState } from "react";

interface Court {
  _id: string;
  name: string;
  location: [number, number]; // Latitude & Longitude
  contact: string;
}

const CourtList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
  const [search, setSearch] = useState("");

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
      courts.filter((court) =>
        court.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, courts]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg"
      />

      {/* Court Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left text-purple-600">Court Name</th>
              <th className="border p-2 text-left text-purple-600">Location (Lat, Lng)</th>
              <th className="border p-2 text-left text-purple-600">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourts.map((court) => (
              <tr key={court._id} className="hover:bg-gray-50">
                <td className="border p-2">{court.name}</td>
                <td className="border p-2">
                  {court.location[0]}, {court.location[1]}
                </td>
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
