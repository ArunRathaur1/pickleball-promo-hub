
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
      // Remove any existing script to avoid duplication
      const existingScript = document.getElementById("instagram-embed-script");
      if (existingScript) {
        existingScript.remove();
      }
      
      // Add the script with an ID for better management
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.id = "instagram-embed-script";
      script.async = true;
      document.body.appendChild(script);
      
      // Process embeds when the script loads
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          
          // After processing, apply our custom style to hide profile buttons
          setTimeout(() => {
            hideProfileButtons();
          }, 1000);
        }
      };
      
      // Retry processing after a delay to ensure embeds are fully loaded
      const timer = setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          hideProfileButtons();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [posts]);
  
  // Function to hide ONLY profile buttons at the top, keep View more buttons
  const hideProfileButtons = () => {
    // Wait for the Instagram embeds to fully load
    setTimeout(() => {
      // Find all Instagram embeds
      const embeds = document.querySelectorAll('.instagram-media');
      
      embeds.forEach(embed => {
        // Target specifically the header section that contains profile info
        const headers = embed.querySelectorAll('header');
        headers.forEach(header => {
          // Find profile links in the header
          const profileLinks = header.querySelectorAll('a[href*="instagram.com"]');
          profileLinks.forEach(link => {
            if (link instanceof HTMLElement && 
                link.textContent && 
                link.textContent.includes('View') && 
                link.textContent.includes('profile')) {
              link.style.display = 'none';
            }
          });
        });
        
        // Alternative approach for different embed structures
        const viewProfileLinks = embed.querySelectorAll('a[href*="instagram.com"]');
        viewProfileLinks.forEach(link => {
          if (link instanceof HTMLElement) {
            const text = link.textContent ? link.textContent.toLowerCase() : '';
            // Only hide if it's specifically a "view profile" link
            // but NOT a "view more" link
            if (text.includes('view') && text.includes('profile') && !text.includes('more')) {
              link.style.display = 'none';
            }
          }
        });
      });
    }, 2500);
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    centerPadding: "10px",
  };

  return (
    <div className="container mx-auto py-8">
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
          <div className="mb-12">
            <div className="instagram-slider-container">
              <Slider {...settings} className="instagram-slider">
                {posts.map((post) => (
                  <div key={post._id} className="px-2">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      <div className="instagram-embed-container" style={{ position: "relative", paddingBottom: "30px" }}>
                        <blockquote
                          className="instagram-media w-full"
                          data-instgrm-permalink={post.url}
                          data-instgrm-version="14"
                          style={{
                            margin: 0,
                            width: "100%",
                            height: "500px", // Increased height to ensure view more shows
                            border: "none",
                            overflow: "visible",
                          }}
                        ></blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            
            {/* Custom CSS for improved spacing and to hide ONLY View Profile buttons */}
            <style>
              {`
              /* Custom styles for the slider */
              .instagram-slider .slick-track {
                display: flex;
                gap: 12px;
              }
              
              .instagram-slider .slick-slide {
                height: auto;
                margin: 0 8px;
              }
              
              .instagram-slider .slick-list {
                margin: 0 -8px;
                padding: 10px 0;
                overflow: visible;
              }
              
              .slick-dots {
                bottom: -30px;
              }
              
              /* Fix for Instagram embeds */
              .instagram-embed-container {
                min-height: 500px;
              }
              
              .instagram-embed-container iframe {
                min-height: 500px !important;
              }
              
              /* Hide ONLY profile links in header */
              .instagram-media header a[href*="instagram.com"][role="link"] {
                display: none !important;
              }
              
              /* More specific targeting for the View Profile button */
              .instagram-media header a[href*="instagram.com"]:not([aria-label*="Like"]):not([aria-label*="Comment"]) {
                display: none !important;
              }
              
              /* Target specifically view profile text links but NOT view more */
              .instagram-media a[href*="instagram.com"]:not([href*="p%2F"]):not([href*="reel%2F"]) {
                display: none !important;
              }
              
              /* Ensure the "View more" button remains visible */
              .instagram-media a[href*="p%2F"], 
              .instagram-media a[href*="reel%2F"] {
                display: inline-block !important;
              }
              `}
            </style>
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
