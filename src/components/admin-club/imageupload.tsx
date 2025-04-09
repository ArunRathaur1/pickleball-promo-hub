import React, { useState } from "react";
import axios from "axios";

const CloudinaryImageUploader = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Cloudinary credentials
  const cloudName = "dxgfavkqn";
  const uploadPreset = "PickleBall";

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states
    setIsUploading(true);
    setError("");
    setImageUrl("");

    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      // Get the secure URL of the uploaded image
      setImageUrl(response.data.secure_url);

      // Log URL to console as requested
      console.log("Uploaded image URL:", response.data.secure_url);
    } catch (err) {
      setError(
        "Failed to upload image: " +
          (err.response?.data?.error?.message || err.message)
      );
      console.error("Upload error details:", err.response?.data || err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Image Uploader</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose an image to upload
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {isUploading && (
        <div className="mb-4 text-blue-600">
          Uploading image, please wait...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md break-all">
            <p className="text-sm font-medium text-gray-700 mb-1">Image URL:</p>
            <p className="text-sm text-gray-600">{imageUrl}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="max-w-full h-auto max-h-64 rounded-md shadow-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageUploader;
