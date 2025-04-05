import React, { useState, useEffect } from "react";

interface BlogFormProps {
  onClose: () => void;
  onSubmit: (blog: {
    name: string;
    heading: string;
    description: string;
    imageUrl: string;
  }) => void;
  initialData?: {
    _id?: string;
    name: string;
    heading: string;
    description: string;
    imageUrl: string;
  } | null;
}

const BlogForm: React.FC<BlogFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    heading: initialData?.heading || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    heading: "",
    description: "",
    imageUrl: "",
  });

  const [charCount, setCharCount] = useState(formData.description.length);
  const MAX_CHARS = 500;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        heading: initialData.heading || "",
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
      });
      setCharCount(initialData.description?.length || 0);
    }
  }, [initialData]);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === "description" && value.length > MAX_CHARS) {
      return `Description cannot exceed ${MAX_CHARS} characters`;
    }
    if (
      name === "imageUrl" &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/.test(value)
    ) {
      return "Enter a valid image URL ending in jpg, png, etc.";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "description") {
      setCharCount(value.length);
    }

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: validateField("name", formData.name),
      heading: validateField("heading", formData.heading),
      description: validateField("description", formData.description),
      imageUrl: validateField("imageUrl", formData.imageUrl),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    onSubmit(formData);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? "Edit Blog" : "Create New Blog"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Author */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Author
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Heading */}
        <div className="mb-4">
          <label
            htmlFor="heading"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="heading"
            id="heading"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.heading
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Enter blog title"
            value={formData.heading}
            onChange={handleChange}
          />
          {errors.heading && (
            <p className="text-red-500 text-xs mt-1">{errors.heading}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.imageUrl
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Enter image URL (e.g., https://...)"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            name="description"
            id="description"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 h-48 resize-none ${
              errors.description
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Write your blog content here..."
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex justify-between items-center mt-1">
            <p
              className={`text-sm ${
                charCount > MAX_CHARS ? "text-red-500" : "text-gray-500"
              }`}
            >
              Character Count: {charCount}/{MAX_CHARS}
            </p>
            <div className="h-1 bg-gray-200 rounded-full w-32">
              <div
                className={`h-1 rounded-full ${
                  charCount > MAX_CHARS
                    ? "bg-red-500"
                    : charCount > MAX_CHARS * 0.8
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min((charCount / MAX_CHARS) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg text-white transition-colors ${
              Object.values(errors).some((error) => error) ||
              charCount > MAX_CHARS
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={
              Object.values(errors).some((error) => error) ||
              charCount > MAX_CHARS
            }
          >
            {initialData ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
