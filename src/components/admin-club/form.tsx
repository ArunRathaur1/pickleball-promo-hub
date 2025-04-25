import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CloudinaryImageUploader from "./imageupload";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import { Navbar } from "../layout/navbar";

// Default marker icon fix for Leaflet
const defaultIcon = icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to get current location and set up search
const MapController = ({ setFieldValue }) => {
  const map = useMap();

  useEffect(() => {
    // Only import and use these when component mounts
    import("leaflet-geosearch").then(
      ({ GeoSearchControl, OpenStreetMapProvider }) => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
          provider,
          style: "bar",
          showMarker: false, // We'll handle markers ourselves
          showPopup: false,
          autoClose: true,
          retainZoomLevel: false,
          animateZoom: true,
          keepResult: true,
          searchLabel: "Search for location",
        });

        map.addControl(searchControl);

        // Handle search results
        map.on("geosearch/showlocation", (e) => {
          const { lat, lng } = e.location;
          setFieldValue("locationCoordinates", [lat, lng]);
        });

        return () => {
          map.removeControl(searchControl);
        };
      }
    );

    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);
      },
      (error) => {
        console.error("Error getting location: ", error);
        // Fallback to default view if geolocation fails
      }
    );
  }, [map, setFieldValue]);

  return null;
};

const LocationPicker = ({ setFieldValue }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setFieldValue("locationCoordinates", [lat, lng]);
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
};

const ClubForm = () => {
  const [clubImageUrl, setClubImageUrl] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const [formResponse, setFormResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    contact: "",
    location: "",
    country: "",
    description: "",
    locationCoordinates: ["", ""],
    bookinglink: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    contact: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    bookinglink: Yup.string().url("Invalid URL format").nullable(),
    locationCoordinates: Yup.array()
      .of(Yup.number().required("Required"))
      .length(2, "Select a location on the map"),
  });

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus }
  ) => {
    if (!clubImageUrl || !logoImageUrl) {
      setStatus({ error: "Please upload both club and logo images." });
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...values,
        clubimageUrl: clubImageUrl,
        logoimageUrl: logoImageUrl,
      };

      const response = await axios.post(
        "http://localhost:5000/clublist/add",
        payload
      );

      // Set response data to show to user
      setFormResponse({
        type: "success",
        message: "Club submitted successfully!",
        data: response.data,
      });

      setStatus({ success: "Club submitted successfully!" });
      resetForm();
      setClubImageUrl("");
      setLogoImageUrl("");
    } catch (error) {
      setFormResponse({
        type: "error",
        message: "Submission failed. Please try again.",
        error: error.response?.data || error.message,
      });

      setStatus({ error: "Submission failed. Try again." });
    } finally {
      setSubmitting(false);
      setShowResponse(true);

      // Auto-hide response after 5 seconds
      setTimeout(() => {
        setShowResponse(false);
      }, 5000);
    }
  };

  useEffect(() => {
    // Add background gradient to the body
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-white-50",
      "to-white-100",
      "min-h-screen"
    );

    return () => {
      // Clean up when component unmounts
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-white-50",
        "to-white-100",
        "min-h-screen"
      );
    };
  }, []);

  return (
    <>
      <div >
        <Navbar />
      </div>

      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8  " >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white-800 tracking-tight">
              Club Registration
            </h1>
            <p className="mt-3 text-xl text-gray-600">
              Join our exclusive network of premier clubs
            </p>
          </div>

          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-white-600 to-white-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Submit Club Details
              </h2>
            </div>

            {/* Response notification */}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, status, values }) => (
                <Form className="p-6 space-y-8">
                  {/* Basic Info Section */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white-100 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-white-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">
                        Basic Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Club Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                          placeholder="Enter club name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                          placeholder="club@example.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number
                        </label>
                        <Field
                          type="text"
                          name="contact"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                          placeholder="+1 (555) 123-4567"
                        />
                        <ErrorMessage
                          name="contact"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Booking Link{" "}
                          <span className="text-gray-500 text-xs">
                            (Optional)
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="bookinglink"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                          placeholder="https://yourbookinglink.com"
                        />
                        <ErrorMessage
                          name="bookinglink"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Club Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={4}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                        placeholder="Provide a detailed description of your club..."
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white-100 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-white-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">
                        Location Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Club Address
                        </label>
                        <Field
                          type="text"
                          name="location"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                          placeholder="123 Main Street, Suite 100"
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <Field
                          type="text"
                          name="country"
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-white-500 focus:border-white-500"
                          placeholder="United States"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Location on Map
                      </label>
                      <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
                        <MapContainer
                          center={[20, 78]}
                          zoom={4}
                          style={{ height: "400px", width: "100%" }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                          />
                          <LocationPicker setFieldValue={setFieldValue} />
                          <MapController setFieldValue={setFieldValue} />
                        </MapContainer>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <svg
                          className="h-5 w-5 text-white-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {values.locationCoordinates[0] &&
                        values.locationCoordinates[1]
                          ? `Selected coordinates: Lat: ${values.locationCoordinates[0].toFixed(
                              6
                            )}, Lng: ${values.locationCoordinates[1].toFixed(
                              6
                            )}`
                          : "Click on the map to select coordinates or use the search bar"}
                      </div>
                      <ErrorMessage
                        name="locationCoordinates"
                        component="div"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                  </div>

                  {/* Media Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white-100 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-white-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">
                        Media Files
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Club Image Upload */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Club Image
                        </label>
                        <div className="relative">
                          <CloudinaryImageUploader
                            onUploadSuccess={setClubImageUrl}
                          />
                          {clubImageUrl && (
                            <div className="mt-3">
                              <div className="flex items-center text-white-600 mb-2">
                                <svg
                                  className="h-5 w-5 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span className="font-medium">
                                  Successfully uploaded!
                                </span>
                              </div>
                              <div className="bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                  src={clubImageUrl}
                                  alt="Club preview"
                                  className="w-full h-40 object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Upload a high-quality image of your club venue (JPG,
                          PNG format)
                        </p>
                      </div>

                      {/* Logo Image Upload */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Club Logo
                        </label>
                        <div className="relative">
                          <CloudinaryImageUploader
                            onUploadSuccess={setLogoImageUrl}
                          />
                          {logoImageUrl && (
                            <div className="mt-3">
                              <div className="flex items-center text-white-600 mb-2">
                                <svg
                                  className="h-5 w-5 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span className="font-medium">
                                  Successfully uploaded!
                                </span>
                              </div>
                              <div className="bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                  src={logoImageUrl}
                                  alt="Logo preview"
                                  className="w-full h-40 object-contain p-2"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Upload your club logo or brand icon (transparent PNG
                          recommended)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error/Success Message */}
                  {status?.error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{status.error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {status?.success && (
                    <div className="bg-white-50 border-l-4 border-white-400 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-white-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-white-700">
                            {status.success}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-green-600 hover:from-white-700 hover:to-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 font-medium text-lg transition duration-150 ease-in-out disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Submitting Club Information...
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mr-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Submit Club Registration
                        </>
                      )}
                    </button>
                  </div>
                  {showResponse && formResponse && (
                    <div className="flex justify-center mt-6">
                      <div className="bg-white-100 border border-white-400 text-white-700 px-6 py-4 rounded-lg shadow-md text-center font-medium">
                        ✅ Details Submitted for Verification
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>

          {/* <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Club Directory Network. All
              rights reserved.
            </p>
            <p className="mt-1">
              Need help? Contact{" "}
              <a
                href="mailto:support@example.com"
                className="text-white-600 hover:text-white-800"
              >
                support@example.com
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ClubForm;
