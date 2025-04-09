import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CloudinaryImageUploader from "./imageupload";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ setFieldValue }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setFieldValue("locationCoordinates", [lat, lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const ClubForm = () => {
  const [clubImageUrl, setClubImageUrl] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState("");

  const initialValues = {
    name: "",
    email: "",
    contact: "",
    location: "",
    country: "",
    description: "",
    locationCoordinates: ["", ""],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    contact: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    locationCoordinates: Yup.array()
      .of(Yup.number().required("Required"))
      .length(2, "Select a location on the map"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
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

      const response = await axios.post("http://localhost:5000/clublist/add", payload);
      setStatus({ success: "Club submitted successfully!" });
      resetForm();
      setClubImageUrl("");
      setLogoImageUrl("");
    } catch (error) {
      setStatus({ error: "Submission failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add New Club</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, status, values }) => (
          <Form className="space-y-4">
            {["name", "email", "contact", "location", "country", "description"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">{field}</label>
                <Field
                  type="text"
                  name={field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
                <ErrorMessage name={field} component="div" className="text-red-500 text-sm" />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Pick Location on Map</label>
              <MapContainer center={[20, 78]} zoom={4} style={{ height: "300px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                />
                <LocationPicker setFieldValue={setFieldValue} />
              </MapContainer>
              <div className="text-sm mt-2 text-gray-600">
                {values.locationCoordinates[0] && values.locationCoordinates[1]
                  ? `Lat: ${values.locationCoordinates[0]}, Lng: ${values.locationCoordinates[1]}`
                  : "Click on map to select coordinates"}
              </div>
              <ErrorMessage
                name="locationCoordinates"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Club Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Club Image</label>
              <CloudinaryImageUploader onUploadSuccess={setClubImageUrl} />
              {clubImageUrl && (
                <img src={clubImageUrl} alt="Club" className="mt-2 w-48 rounded-md" />
              )}
            </div>

            {/* Logo Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Logo Image</label>
              <CloudinaryImageUploader onUploadSuccess={setLogoImageUrl} />
              {logoImageUrl && (
                <img src={logoImageUrl} alt="Logo" className="mt-2 w-32 rounded-md" />
              )}
            </div>

            {/* Error/Success Message */}
            {status?.error && <div className="text-red-600 font-medium">{status.error}</div>}
            {status?.success && <div className="text-green-600 font-medium">{status.success}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
