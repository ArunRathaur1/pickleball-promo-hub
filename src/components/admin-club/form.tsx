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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add New Club</h2>

      {/* Response notification */}
      {showResponse && formResponse && (
        <div
          className={`p-4 mb-6 rounded-md ${
            formResponse.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex justify-between">
            <p className="font-medium">{formResponse.message}</p>
            <button onClick={() => setShowResponse(false)} className="text-sm">
              ×
            </button>
          </div>
          {formResponse.type === "success" && formResponse.data && (
            <pre className="mt-2 text-xs overflow-auto max-h-40">
              {JSON.stringify(formResponse.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, status, values }) => (
          <Form className="space-y-4">
            {[
              "name",
              "email",
              "contact",
              "location",
              "country",
              "description",
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">
                  {field}
                </label>
                <Field
                  type="text"
                  name={field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">
                Pick Location on Map
              </label>
              <MapContainer
                center={[20, 78]}
                zoom={4}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                />
                <LocationPicker setFieldValue={setFieldValue} />
                <MapController setFieldValue={setFieldValue} />
              </MapContainer>
              <div className="text-sm mt-2 text-gray-600">
                {values.locationCoordinates[0] && values.locationCoordinates[1]
                  ? `Lat: ${values.locationCoordinates[0].toFixed(
                      6
                    )}, Lng: ${values.locationCoordinates[1].toFixed(6)}`
                  : "Click on map to select coordinates or use the search bar"}
              </div>
              <ErrorMessage
                name="locationCoordinates"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Club Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Club Image
              </label>
              <CloudinaryImageUploader onUploadSuccess={setClubImageUrl} />
              {clubImageUrl && (
                <p className="text-green-600 text-sm mt-1">
                  Club image uploaded successfully!
                </p>
              )}
            </div>

            {/* Logo Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Logo Image
              </label>
              <CloudinaryImageUploader onUploadSuccess={setLogoImageUrl} />
              {logoImageUrl && (
                <p className="text-green-600 text-sm mt-1">
                  Logo image uploaded successfully!
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium capitalize">
                Booking Link
              </label>
              <Field
                type="text"
                name="bookinglink"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="https://yourbookinglink.com"
              />
              <ErrorMessage
                name="bookinglink"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Error/Success Message */}
            {status?.error && (
              <div className="text-red-600 font-medium">{status.error}</div>
            )}
            {status?.success && (
              <div className="text-green-600 font-medium">{status.success}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Club"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClubForm;
