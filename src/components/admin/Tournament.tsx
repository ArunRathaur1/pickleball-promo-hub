import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TournamentRequestsPage = () => {
  const { toast } = useToast();
  const [tournaments, setTournaments] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/tournaments/all")
      .then((response) => response.json())
      .then((data) => setTournaments(data))
      .catch((error) => console.error("Error fetching tournaments:", error));
  }, []);

  const updateTournamentStatus = (id, status) => {
    fetch(`http://localhost:5000/tournaments/update-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then(() => {
        setTournaments((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status } : t))
        );
        toast({
          title: `Tournament ${
            status.charAt(0).toUpperCase() + status.slice(1)
          }`,
          description: `The tournament has been ${status}.`,
        });
      })
      .catch((error) =>
        console.error("Error updating tournament status:", error)
      );
  };

  const filteredTournaments =
    filter === "all"
      ? tournaments
      : tournaments.filter((tournament) => tournament.status === filter);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Tournament Requests</h2>

      <div className="mb-4 flex gap-2">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {filteredTournaments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No tournaments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTournaments.map((tournament) => (
            <Card key={tournament._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      className={`mb-2 ${
                        tournament.status === "pending"
                          ? "bg-yellow-500"
                          : tournament.status === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {tournament.status.charAt(0).toUpperCase() +
                        tournament.status.slice(1)}
                    </Badge>
                    <CardTitle>{tournament.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CalendarIcon className="h-4 w-4 text-pickle mt-1" />
                    <div>
                      <p className="text-sm">
                        {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{tournament.time || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-pickle mt-1" />
                    <p className="text-sm">
                      {tournament.location}, {tournament.country}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {tournament.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                {tournament.status !== "rejected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() =>
                      updateTournamentStatus(tournament._id, "rejected")
                    }
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                )}
                {tournament.status !== "approved" && (
                  <Button
                    size="sm"
                    className="bg-pickle hover:bg-pickle-dark"
                    onClick={() =>
                      updateTournamentStatus(tournament._id, "approved")
                    }
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentRequestsPage;
