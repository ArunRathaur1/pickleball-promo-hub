import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Increased to show more slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
      <div className="container mx-auto ">
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              📸 Instagram Collection
            </h2>
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-center my-8">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 my-4 rounded">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Instagram Posts Carousel */}
          {!loading && posts.length > 0 && (
            <div className="mb-6">
              <Slider {...settings}>
                {posts.map((post) => (
                  <div key={post._id} className="px-2">
                    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                      <blockquote
                        className="instagram-media w-full"
                        data-instgrm-permalink={post.url}
                        data-instgrm-version="14"
                        style={{
                          minWidth: "100%",
                          height: "350px", // Smaller height
                          border: "none",
                          overflow: "hidden",
                          margin: 0,
                        }}
                      ></blockquote>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {/* No Posts Message */}
          {!loading && posts.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded p-8 my-6 border border-gray-200">
              <svg
                className="w-10 h-10 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-gray-600">
                No posts found. Add some to your collection!
              </p>
            </div>
          )}
        </div>
      </div>
  );
}
