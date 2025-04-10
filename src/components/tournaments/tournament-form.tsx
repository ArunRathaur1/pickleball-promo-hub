import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloudinaryImageUploader from "../admin-club/imageupload";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

// Initialize Leaflet default icon
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Map click handler component
function MapClickHandler({ setMarkerPosition, setFieldValue }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      setFieldValue("locationCoords", [lat, lng]);
    },
  });
  return null;
}

const TournamentForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialLocation, setInitialLocation] = useState([37.7749, -122.4194]); // Default: San Francisco
  const [markerPosition, setMarkerPosition] = useState(initialLocation);
  const mapRef = useRef(null);

  // List of continents for the dropdown
  const continents = [
    "Africa",
    "Antarctica",
    "Asia",
    "Australia",
    "Europe",
    "North America",
    "South America",
  ];

  // List of tournament tiers
  const tiers = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialLocation([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setMessage("Error getting location. Default location set.");
        }
      );
    } else {
      setMessage("Geolocation is not supported. Default location set.");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tournament name is required"),
    Organizer: Yup.string().required("Organizer is required"),
    location: Yup.string().required("Location is required"),
    country: Yup.string().required("Country is required"),
    Continent: Yup.string().required("Continent is required"),
    Tier: Yup.number()
      .integer("Tier must be an integer")
      .required("Tier is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .test(
        "is-greater-than-start",
        "End date must be later than start date",
        function (value) {
          return value >= this.parent.startDate;
        }
      ),
      imageUrl: Yup.string().required("Image/logo is required"),

    description: Yup.string().required("Description is required"),
    locationCoords: Yup.array()
      .of(Yup.number())
      .length(2, "Location coordinates must have exactly 2 values")
      .required("Location coordinates are required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Make sure locationCoords is an array of numbers
      const formattedValues = {
        ...values,
        Tier: Number(values.Tier), // Ensure Tier is a number
        locationCoords: values.locationCoords.map((coord) => Number(coord)),
      };

      const response = await axios.post(
        "http://localhost:5000/tournaments/add",
        formattedValues
      );

      setMessage(response.data.message || "Tournament created successfully!");
      setSuccess(true);

      // Reset form on success
      resetForm();

      // Navigate to dashboard after short delay
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while creating the tournament"
      );
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Create Tournament</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded ${
            success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <Formik
        initialValues={{
          name: "",
          Organizer: "",
          location: "",
          country: "",
          Continent: "",
          Tier: "",
          startDate: "",
          endDate: "",
          imageUrl: "",

          description: "",
          locationCoords: initialLocation,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tournament Name */}
              <div>
                <Label htmlFor="name" className="block mb-2">
                  Tournament Name
                </Label>
                <Field as={Input} type="text" id="name" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Organizer */}
              <div>
                <Label htmlFor="Organizer" className="block mb-2">
                  Organizer
                </Label>
                <Field as={Input} type="text" id="Organizer" name="Organizer" />
                <ErrorMessage
                  name="Organizer"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="block mb-2">
                  Venue/Location
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g., Madison Square Garden"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Country */}
              <div>
                <Label htmlFor="country" className="block mb-2">
                  Country
                </Label>
                <Field as={Input} type="text" id="country" name="country" />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Continent */}
              <div>
                <Label htmlFor="Continent" className="block mb-2">
                  Continent
                </Label>
                <Field
                  as="select"
                  id="Continent"
                  name="Continent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a continent</option>
                  {continents.map((continent) => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="Continent"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Tier */}
              <div>
                <Label htmlFor="Tier" className="block mb-2">
                  Tournament Tier
                </Label>
                <Field
                  as="select"
                  id="Tier"
                  name="Tier"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a tier</option>
                  {tiers.map((tier) => (
                    <option key={tier} value={tier}>
                      Tier {tier}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="Tier"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Start Date */}
              <div>
                <Label htmlFor="startDate" className="block mb-2">
                  Start Date
                </Label>
                <Field as={Input} type="date" id="startDate" name="startDate" />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* End Date */}
              <div>
                <Label htmlFor="endDate" className="block mb-2">
                  End Date
                </Label>
                <Field as={Input} type="date" id="endDate" name="endDate" />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div>
  <Label className="block mb-2">Upload Tournament Logo</Label>
  <CloudinaryImageUploader
    onUploadSuccess={(url) => setFieldValue("imageUrl", url)}
  />
  <ErrorMessage
    name="imageUrl"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>


            {/* Description */}
            <div>
              <Label htmlFor="description" className="block mb-2">
                Description
              </Label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                rows="4"
                placeholder="Provide details about the tournament..."
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Map Location */}
            <div>
              <Label className="block mb-2">
                Set Location on Map (Click to place marker)
              </Label>
              <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-300">
                <MapContainer
                  center={initialLocation}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <MapClickHandler
                    setMarkerPosition={setMarkerPosition}
                    setFieldValue={setFieldValue}
                  />
                  <Marker position={markerPosition}>
                    <Popup>
                      Selected Location: {markerPosition[0].toFixed(4)},{" "}
                      {markerPosition[1].toFixed(4)}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Location Coordinates (hidden or read-only) */}
              <div className="mt-2">
                <Label htmlFor="locationCoords" className="block mb-2">
                  Location Coordinates
                </Label>
                <Input
                  type="text"
                  id="locationCoords"
                  value={`[${markerPosition[0].toFixed(
                    4
                  )}, ${markerPosition[1].toFixed(4)}]`}
                  readOnly
                  className="bg-gray-50"
                />
                <ErrorMessage
                  name="locationCoords"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
              >
                {isSubmitting ? "Creating..." : "Create Tournament"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TournamentForm;
