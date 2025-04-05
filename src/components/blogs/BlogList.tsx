import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import axios from "axios";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";

interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
  createdAt: string;
  imageUrl:string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrUpdate = async (blog: { name: string; heading: string; description: string }) => {
    try {
      if (editData) {
        await axios.put(`http://localhost:5000/blogs/update/${editData._id}`, blog);
      } else {
        await axios.post("http://localhost:5000/blogs/add", blog);
      }
      fetchBlogs();
      setShowForm(false);
      setEditData(null);
    } catch (error) {
      console.error("Error saving blog", error);
      alert("Failed to save blog. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/blogs/delete/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  const openEditForm = (blog: Blog) => {
    setEditData(blog);
    setShowForm(true);
  };

  const openCreateForm = () => {
    setEditData(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <PlusCircle size={20} />
          <span>Create New Blog</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <BlogForm
              onClose={() => setShowForm(false)}
              onSubmit={handleAddOrUpdate}
              initialData={editData}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
          <button onClick={fetchBlogs} className="ml-4 underline">
            Retry
          </button>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No blogs found</p>
          <button
            onClick={openCreateForm}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.heading}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {blog.heading}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <p>By: {blog.name}</p>
                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2">
                <button
                  onClick={() => openEditForm(blog)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;