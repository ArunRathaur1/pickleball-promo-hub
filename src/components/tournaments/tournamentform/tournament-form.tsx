import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloudinaryImageUploader from "../../admin-club/imageupload";
import L from "leaflet";
import MapLocationSection from "./MapLocationSection";
import TournamentFormFields from "./TournamentFormFields";
import FormActions from "./FormActions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/navbar";

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
    <>
      <div style={{zIndex:"1000"}}>
        <Navbar></Navbar>
      </div>
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto p-6 max-w-4xl">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-700">
              Create Tournament
            </h1>
            <p className="text-gray-600 mt-2">
              Fill out the details below to set up your new tournament
            </p>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`mb-8 p-4 rounded-lg shadow-sm border ${
                success
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`mr-2 text-xl ${
                    success ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {success ? "✓" : "✗"}
                </span>
                {message}
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500" />
            <div className="p-6">
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
                  <Form className="space-y-8">
                    {/* Form Sections with Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Basic Information */}
                      <div className="space-y-6 md:col-span-2">
                        <TournamentFormFields
                          continents={continents}
                          tiers={tiers}
                        />
                      </div>

                      {/* Tournament Logo */}
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <span className="bg-green-100 p-1 rounded-full text-green-600 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          Tournament Logo
                        </h2>
                        <Label className="block mb-2">
                          Upload your tournament's official logo
                        </Label>
                        <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300">
                          <CloudinaryImageUploader
                            onUploadSuccess={(url) =>
                              setFieldValue("imageUrl", url)
                            }
                          />
                          {values.imageUrl && (
                            <div className="mt-4 flex justify-center">
                              <img
                                src={values.imageUrl}
                                alt="Preview"
                                className="h-40 object-contain rounded"
                              />
                            </div>
                          )}
                        </div>
                        <ErrorMessage
                          name="imageUrl"
                          component="div"
                          className="text-red-500 text-sm mt-2"
                        />
                      </div>

                      {/* Description */}
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <span className="bg-green-100 p-1 rounded-full text-green-600 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          Description
                        </h2>
                        <Label htmlFor="description" className="block mb-2">
                          Tournament details and information
                        </Label>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          rows="6"
                          placeholder="Provide details about the tournament, rules, prizes, eligibility criteria..."
                          className="w-full resize-none focus:ring-green-500 focus:border-green-500"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500 text-sm mt-2"
                        />
                      </div>
                    </div>

                    {/* Map Section */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 md:col-span-2">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="bg-green-100 p-1.5 rounded-full text-green-600 mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        Tournament Location
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Set the exact location of your tournament by searching
                        or clicking on the map
                      </p>

                      <MapLocationSection
                        initialLocation={initialLocation}
                        markerPosition={markerPosition}
                        setMarkerPosition={setMarkerPosition}
                        setFieldValue={setFieldValue}
                      />

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label
                            htmlFor="locationCoords"
                            className="block mb-2 font-medium"
                          >
                            Location Coordinates
                          </Label>
                          <Input
                            type="text"
                            id="locationCoords"
                            value={`[${markerPosition[0].toFixed(
                              4
                            )}, ${markerPosition[1].toFixed(4)}]`}
                            readOnly
                            className="bg-gray-50 border-gray-300 text-gray-500"
                          />
                          <ErrorMessage
                            name="locationCoords"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => {
                              // Get user's current location
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const { latitude, longitude } =
                                      position.coords;
                                    setMarkerPosition([latitude, longitude]);
                                    setFieldValue("locationCoords", [
                                      latitude,
                                      longitude,
                                    ]);
                                  }
                                );
                              }
                            }}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-gray-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Use My Location
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={() => {
                            // Reset or go back logic
                            if (
                              window.confirm(
                                "Are you sure you want to cancel? All entered data will be lost."
                              )
                            ) {
                              window.history.back();
                            }
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                          {isSubmitting ? (
                            <>
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
                              Creating...
                            </>
                          ) : (
                            "Create Tournament"
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Need help? Check out our{" "}
            <a href="#" className="text-green-600 hover:underline">
              tournament creation guidelines
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentForm;
