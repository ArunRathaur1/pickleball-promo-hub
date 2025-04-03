import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Club Name is required"),
  location: Yup.string().required("Location is required"),
  country: Yup.string().required("Country is required"),
  locationCoordinates: Yup.array()
    .of(Yup.number())
    .min(2, "Both latitude and longitude are required")
    .max(2, "Only latitude and longitude are required")
    .required("Location Coordinates are required"),
  description: Yup.string().required("Description is required"),
});

const initialValues = {
  name: "",
  location: "",
  country: "",
  locationCoordinates: [0, 0], // Default to [0, 0]
  description: "",
};

// MapMarker Component
function MapMarker({ setFieldValue }) {
  const [position, setPosition] = useState([0, 0]);

  const map = useMapEvents({
    click: (e) => {
      const newCoords = [e.latlng.lat, e.latlng.lng];
      setPosition(newCoords);
      setFieldValue("locationCoordinates", newCoords); // Update Formik field
      map.flyTo(newCoords, map.getZoom());
    },
  });

  useEffect(() => {
    if (map && position[0] !== 0 && position[1] !== 0) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position[0] === 0 && position[1] === 0 ? null : (
    <Marker position={position} />
  );
}

export default function ClubForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:5000/clublist/add", values);
      setSuccessMessage("Club added successfully!");
      setErrorMessage("");
      resetForm();
    } catch (error) {
      setErrorMessage("Failed to add club. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Form Section */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add New Club</h2>
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Club Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  id="description"
                  name="description"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Location Coordinates (Hidden) */}
              <Field type="hidden" name="locationCoordinates" />

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Map Section */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Set Location on Map</h2>
        <p className="text-sm text-gray-500 mb-4">
          Click on the map to set the club's location.
        </p>
        <div className="h-96 w-full">
          <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Formik>
              {({ setFieldValue }) => <MapMarker setFieldValue={setFieldValue} />}
            </Formik>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
