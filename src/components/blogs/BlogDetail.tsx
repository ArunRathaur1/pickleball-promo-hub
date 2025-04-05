import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, User } from "lucide-react";
import axios from "axios";

interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
  createdAt: string;
}

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlog(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || "Blog post not found"}</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:underline mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to all blogs
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-2 bg-primary w-full"></div>
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{blog.heading}</h1>
            
            <div className="flex flex-wrap items-center mb-8 text-gray-500 text-sm">
              <div className="flex items-center mr-6 mb-2">
                <User className="h-4 w-4 mr-1" />
                <span>Author: {blog.name}</span>
              </div>
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Published: {formatDate(blog.createdAt)}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {blog.description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}