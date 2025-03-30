import { CourtList } from "@/components/courts/court-list";
import { CourtMap } from "@/components/courts/court-map";

const CourtPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Courts</h2>

      {/* Court List (Table) */}
      <div className="mb-8">
        <CourtList />
      </div>

      {/* Court Map (Interactive View) */}
      <div>
        <h3 className="text-xl font-bold mb-2">Court Locations</h3>
        <CourtMap />
      </div>
    </div>
  );
};

export default CourtPage;
