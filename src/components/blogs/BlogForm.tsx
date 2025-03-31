import { useState } from "react";

interface BlogFormProps {
  onSubmit: (formData: { name: string; heading: string; description: string }) => void;
  initialData?: { name: string; heading: string; description: string };
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialData || { name: "", heading: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Blog" : "Create Blog"}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Author Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            required
          />
          <label className="block mb-2">Heading:</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            required
          />
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            rows={4}
            required
          ></textarea>
          <div className="flex justify-end">
            <button type="button" onClick={onCancel} className="bg-gray-400 px-4 py-2 mr-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
