import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Initialize Leaflet default icon
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const TournamentForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialLocation, setInitialLocation] = useState([37.7749, -122.4194]); // Default: San Francisco
  const [markerPosition, setMarkerPosition] = useState(initialLocation);
  const mapRef = useRef(null);

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
    description: Yup.string().required("Description is required"),
    locationCoords: Yup.array()
      .of(Yup.number())
      .length(2, "Location coordinates must have exactly 2 values")
      .required("Location coordinates are required"),
    status: Yup.string()
      .oneOf(["pending", "approved", "rejected"], "Invalid status")
      .default("pending"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5000/tournaments/create", values);

      setMessage(response.data.message);
      setSuccess(true);
      navigate("/admin/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMapClick = (e, setFieldValue) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    setFieldValue("locationCoords", [lat, lng]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Tournament</h1>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
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
          description: "",
          locationCoords: initialLocation,
          status: "pending",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <Label htmlFor="name">Tournament Name</Label>
              <Field as={Input} type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Label htmlFor="Organizer">Organizer</Label>
              <Field as={Input} type="text" id="Organizer" name="Organizer" />
              <ErrorMessage name="Organizer" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Field as={Textarea} id="description" name="description" rows="3" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <Label>Set Location on Map</Label>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={initialLocation}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef}
                  onClick={(e) => handleMapClick(e, setFieldValue)}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={markerPosition}>
                    <Popup>Selected Location: {markerPosition.join(", ")}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="locationCoords">Location Coordinates</Label>
              <Field as={Input} type="text" id="locationCoords" name="locationCoords" readOnly />
              <ErrorMessage name="locationCoords" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-4 rounded">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TournamentForm;
