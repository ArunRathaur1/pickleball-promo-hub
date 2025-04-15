import { useState, useEffect } from "react";

export default function View() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/instagram/");
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    }
  }, [posts]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/instagram/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto px-2">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl p-6 w-full">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-indigo-500 p-1 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold text-white px-6 py-2">
                📸 My Instagram Collection
              </h2>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center my-12">
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-8 border-purple-300 border-t-pink-500 rounded-full animate-spin"></div>
                <div className="absolute top-4 left-4 w-16 h-16 border-8 border-pink-300 border-b-purple-500 rounded-full animate-spin animate-pulse"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded shadow-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && posts.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-12 my-8 border-2 border-dashed border-gray-300">
              <p className="text-xl text-gray-600 font-medium">
                No posts found. Add some posts to your collection!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-3">
                  <blockquote
                    className="instagram-media w-full"
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                    style={{
                      minWidth: "100%",
                      minHeight: "450px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  ></blockquote>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-white mt-6 opacity-80">
          <p>
            © {new Date().getFullYear()} Instagram Collection | All rights
            reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
