import { useState, useEffect } from "react";
import { CalendarIcon, MapPin, Clock, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map click events
function LocationMarker({ position, setPosition, setLocationName }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);

      // Reverse geocode to get address from coordinates
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          const locationName =
            data.display_name ||
            `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`;
          setLocationName(locationName);
        })
        .catch((error) => {
          console.error("Error during reverse geocoding:", error);
          setLocationName(
            `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`
          );
        });
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>Tournament Location</Popup>
    </Marker>
  ) : null;
}

export function TournamentForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  // Set default location to San Diego (a popular pickleball location)
  const defaultPosition = [32.7157, -117.1611]; // San Diego, CA coordinates
  const [position, setPosition] = useState(defaultPosition);

  const [formData, setFormData] = useState({
    name: "",
    location: "San Diego, California, USA",
    country: "USA",
    time: "",
    description: "",
    organizerContact: "",
    latitude: defaultPosition[0],
    longitude: defaultPosition[1],
  });

  // Set default map center to the default position
  const defaultZoom = 10;

  useEffect(() => {
    // Update lat/long in form data when position changes
    if (position) {
      setFormData((prev) => ({
        ...prev,
        latitude: position[0],
        longitude: position[1],
        locationCoords: position, // Add this field to match the API format
      }));
    }
  }, [position]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setLocationName = (locationName) => {
    setFormData((prev) => ({ ...prev, location: locationName }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      toast({
        variant: "destructive",
        title: "Date is required",
        description: "Please select a start date for the tournament.",
      });
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      toast({
        variant: "destructive",
        title: "Location coordinates required",
        description:
          "Please provide the tournament location coordinates by clicking on the map.",
      });
      return;
    }

    setLoading(true);

    // Create the tournament data to send to the server
    const tournamentData = {
      name: formData.name,
      location: formData.location,
      country: formData.country || "USA", // Default to USA if not provided
      startDate: format(date, "yyyy-MM-dd"),
      endDate: endDate
        ? format(endDate, "yyyy-MM-dd")
        : format(date, "yyyy-MM-dd"), // Use startDate as endDate if not specified
      time: formData.time,
      description: formData.description,
      organizerContact: formData.organizerContact,
      locationCoords: [formData.latitude, formData.longitude], // Using the format shown in the sample data
      status: "pending",
    };

    console.log("Submitting tournament data:", tournamentData);

    try {
      // Make the actual API POST request to the endpoint
      const response = await fetch("http://localhost:5000/tournaments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tournamentData),
      });

      if (!response.ok) {
        // If the server response was not ok, throw an error
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Server responded with status: ${response.status}`
        );
      }

      // Success response
      const data = await response.json().catch(() => ({}));

      toast({
        title: "Tournament submitted",
        description: "Your tournament request has been sent for approval.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Tournament</CardTitle>
        <CardDescription>
          Fill in the details below to submit your tournament for approval.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tournament Name</Label>
            <div className="relative">
              <Info className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Chess Championship 2025"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left ${
                      !endDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="time"
                name="time"
                placeholder="10:00 AM - 5:00 PM"
                className="pl-10"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="USA"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizerContact">Organizer Contact</Label>
              <Input
                id="organizerContact"
                name="organizerContact"
                placeholder="+1 123-456-7890"
                value={formData.organizerContact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="space-y-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  placeholder="Click on the map to select a location"
                  className="pl-10"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="border rounded-md" style={{ height: "300px" }}>
                <MapContainer
                  center={position}
                  zoom={defaultZoom}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    setLocationName={setLocationName}
                  />
                </MapContainer>
                <div className="text-xs text-muted-foreground mt-1 text-center">
                  Click on the map to select the tournament location
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter tournament details, rules, prizes, etc."
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-pickle hover:bg-pickle-dark"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Tournament"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
