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
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const TournamentForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialLocation, setInitialLocation] = useState<[number, number]>([
    37.7749, -122.4194,
  ]); // Default to San Francisco
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(
    initialLocation
  );
  const mapRef = useRef<any>(null);

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
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .test(
        "is-greater-than-start",
        "End date must be later than start date",
        function (value) {
          const { startDate } = this.parent;
          return value >= startDate;
        }
      ),
    location: Yup.string().required("Location is required"),
    country: Yup.string().required("Country is required"),
    locationCoordinates: Yup.array()
      .of(Yup.number())
      .length(2)
      .required("Location coordinates are required"),
    contact: Yup.string().required("Contact information is required"),
    time: Yup.string().required("Time is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tournaments/create",
        {
          ...values,
          locationCoordinates: values.locationCoordinates.length === 2
            ? [values.locationCoordinates[0], values.locationCoordinates[1]] as [number, number]
            : [0, 0] as [number, number],
        }
      );

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

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    // Update Formik values directly using mapRef
    mapRef.current.props.formik.setFieldValue("locationCoordinates", [lat, lng]);
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
          description: "",
          startDate: "",
          endDate: "",
          location: "",
          country: "",
          locationCoordinates: initialLocation,
          contact: "",
          time: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <Label htmlFor="name" className="block text-sm font-medium">
                Tournament Name
              </Label>
              <Field
                as={Input}
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description" className="block text-sm font-medium">
                Description
              </Label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="startDate" className="block text-sm font-medium">
                  Start Date
                </Label>
                <Field
                  as={Input}
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="block text-sm font-medium">
                  End Date
                </Label>
                <Field
                  as={Input}
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="location" className="block text-sm font-medium">
                  Location
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="country" className="block text-sm font-medium">
                  Country
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="country"
                  name="country"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="contact" className="block text-sm font-medium">
                  Contact Information
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="contact"
                  name="contact"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="time" className="block text-sm font-medium">
                  Time
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="time"
                  name="time"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label className="block text-sm font-medium">
                Set Location on Map
              </Label>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={initialLocation}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  ref={(map) => {
                    if (!map) return;
                    mapRef.current = map;
                    mapRef.current.props.formik = { setFieldValue };
                  }}
                  onClick={handleMapClick}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={markerPosition}>
                    <Popup>
                      Tournament location:{" "}
                      {values.locationCoordinates
                        ? `[${values.locationCoordinates[0].toFixed(
                            4
                          )}, ${values.locationCoordinates[1].toFixed(4)}]`
                        : "Click to set"}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="mb-4">
              <Label
                htmlFor="locationCoordinates"
                className="block text-sm font-medium"
              >
                Location Coordinates
              </Label>
              <Field
                as={Input}
                type="text"
                id="locationCoordinates"
                name="locationCoordinates"
                value={
                  values.locationCoordinates
                    ? `[${values.locationCoordinates[0].toFixed(
                        4
                      )}, ${values.locationCoordinates[1].toFixed(4)}]`
                    : ""
                }
                readOnly
                className="mt-1 p-2 w-full border rounded-md bg-gray-100 cursor-not-allowed"
              />
              <ErrorMessage
                name="locationCoordinates"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
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
