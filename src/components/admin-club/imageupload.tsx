import React, { useState } from "react";
import axios from "axios";

const CloudinaryImageUploader = ({ onUploadSuccess }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = "dxgfavkqn";
  const uploadPreset = "PickleBall";

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    setImageUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const secureUrl = response.data.secure_url;
      setImageUrl(secureUrl);
      onUploadSuccess(secureUrl); // <-- ✅ Send image URL to parent
    } catch (err) {
      setError(
        "Failed to upload image: " +
          (err.response?.data?.error?.message || err.message)
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {isUploading && <p className="text-blue-600 mt-2">Uploading image...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default CloudinaryImageUploader;
