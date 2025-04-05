import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

interface Blog {
  _id: string;
  name: string;       // Author's name from schema
  heading: string;
  description: string;
  createdAt: string;  // Timestamp from schema
}

export function Testimonials() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 4 && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setStartIndex((prev) => (prev + 1) % blogs.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [blogs, isPaused]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const visibleBlogs = blogs.length > 4 
    ? [...blogs, ...blogs].slice(startIndex, startIndex + 4) 
    : blogs;

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Generate a random pastel color for blog cards
  const getRandomPastelColor = () => {
    const colors = [
      'bg-blue-50 border-blue-200 hover:bg-blue-100',
      'bg-purple-50 border-purple-200 hover:bg-purple-100',
      'bg-pink-50 border-pink-200 hover:bg-pink-100',
      'bg-green-50 border-green-200 hover:bg-green-100',
      'bg-amber-50 border-amber-200 hover:bg-amber-100',
      'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Pause auto-rotation when hovering over cards
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Latest Blogs</h2>
          <div className="mt-2 h-1 w-24 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Explore our collection of thought-provoking articles, insightful tutorials, and industry updates.</p>
        </div>
        
        <div className="relative max-w-5xl mx-auto overflow-hidden px-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={startIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {visibleBlogs.map((blog, index) => {
                const colorClass = getRandomPastelColor();
                return (
                  <motion.div
                    key={`${blog._id}-${index}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="h-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Use Link instead of just a Card */}
                    <Link to={`/blog/${blog._id}`} className="block h-full no-underline">
                      <Card 
                        className={`overflow-hidden transition-all duration-300 ${colorClass} shadow-sm hover:shadow-xl transform hover:-translate-y-1 cursor-pointer border-2 h-full flex flex-col`}
                      >
                        <div className="h-3 bg-primary w-full"></div>
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary bg-opacity-10">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-center mb-2 line-clamp-2 h-14 flex items-center justify-center">{blog.heading}</h3>
                          <div className="mt-auto pt-4 flex items-center justify-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span className="truncate max-w-16">{blog.name}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={() => setStartIndex((prev) => (prev - 1 + blogs.length) % blogs.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 border border-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Previous blog"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setStartIndex((prev) => (prev + 1) % blogs.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 border border-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Next blog"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {Array(Math.min(blogs.length, 5)).fill(0).map((_, idx) => (
            <button
              key={idx}
              className={`mx-1 h-2 w-2 rounded-full transition-all ${
                idx === startIndex % 5 ? "bg-primary w-4" : "bg-gray-300"
              }`}
              onClick={() => setStartIndex(idx)}
              aria-label={`Go to blog set ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}