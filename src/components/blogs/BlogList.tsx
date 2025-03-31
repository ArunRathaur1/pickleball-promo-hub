import { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./BlogForm";

// Define the Blog type
interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch Blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<Blog[]>("/api/blogs/");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Delete Blog
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/delete/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  // Create Blog
  const handleCreate = async (formData: { name: string; heading: string; description: string }) => {
    try {
      await axios.post("/api/blogs/create", formData);
      fetchBlogs();
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Update Blog
  const handleUpdate = async (formData: { name: string; heading: string; description: string }) => {
    if (!editBlog) return;
    try {
      await axios.put(`/api/blogs/update/${editBlog._id}`, formData);
      fetchBlogs();
      setEditBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Blog List</h1>

      {/* Create Blog Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Create Blog
        </button>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Author</th>
              <th className="border p-2">Heading</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="text-center border-t">
                <td className="border p-2">{blog.name}</td>
                <td className="border p-2">{blog.heading}</td>
                <td className="border p-2">{blog.description.substring(0, 50)}...</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditBlog(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Blog Modal */}
      {isCreating && <BlogForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />}

      {/* Edit Blog Modal */}
      {editBlog && (
        <BlogForm
          initialData={editBlog}
          onSubmit={handleUpdate}
          onCancel={() => setEditBlog(null)}
        />
      )}
    </div>
  );
};

export default BlogList;
