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
import { MapPin, CheckCircle, XCircle, Globe, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ClubType = {
  _id: string;
  name: string;
  email: string;
  contact: string;
  location: string;
  country: string;
  locationCoordinates: [number, number];
  clubimageUrl: string;
  logoimageUrl: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const ClubRequestsPage = () => {
  const { toast } = useToast();
  const [clubs, setClubs] = useState<ClubType[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    fetchClubsByStatus(filter);
  }, [filter]);
  
  const fetchClubsByStatus = (status: string) => {
    const url =
      status === "all"
        ? "http://localhost:5000/clublist/all"
        : `http://localhost:5000/clublist/status/${status}`;
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((err) => console.error("Error fetching clubs:", err));
  };
  

  const updateClubStatus = (id: string, status: "approved" | "rejected") => {
    fetch(`http://localhost:5000/clublist/status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => {
        setClubs((prev) =>
          prev.map((club) => (club._id === id ? { ...club, status } : club))
        );
        toast({
          title: `Club ${status === "approved" ? "Approved" : "Rejected"}`,
          description: `The club has been ${status}.`,
        });
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  const filteredClubs =
    filter === "all" ? clubs : clubs.filter((club) => club.status === filter);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Club Requests</h2>

      <div className="mb-4 flex gap-2">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status as typeof filter)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {filteredClubs.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No clubs found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredClubs.map((club) => (
            <Card key={club._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      className={`mb-2 ${
                        club.status === "pending"
                          ? "bg-yellow-500"
                          : club.status === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                    </Badge>
                    <CardTitle>{club.name}</CardTitle>
                  </div>
                  <img
                    src={club.logoimageUrl}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-pickle mt-1" />
                    <p className="text-sm">
                      {club.location}, {club.country}
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-pickle mt-1" />
                    <p className="text-sm">{club.email}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {club.description}
                </p>

                <img
                  src={club.clubimageUrl}
                  alt="Club"
                  className="w-full h-48 object-cover rounded-md border"
                />
              </CardContent>

              <CardFooter className="flex justify-end gap-3">
                {club.status !== "rejected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => updateClubStatus(club._id, "rejected")}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                )}
                {club.status !== "approved" && (
                  <Button
                    size="sm"
                    className="bg-pickle hover:bg-pickle-dark"
                    onClick={() => updateClubStatus(club._id, "approved")}
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

export default ClubRequestsPage;
