import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, User, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
  createdAt: string;
  imageUrl: string;
}

export function Testimonials() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
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
      console.log(response.data);
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

  // Pause auto-rotation when hovering over cards
  const handleMouseEnter = (blogId: string) => {
    setIsPaused(true);
    setHoveredCardId(blogId);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setHoveredCardId(null);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[95%] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Blogs</h2>
          <p className="mt-2 text-lg text-gray-700 max-w-3xl mx-auto">Explore our collection of thought-provoking articles, insightful tutorials, and industry updates.</p>
        </div>
        
        <div className="relative w-full max-w-screen-2xl mx-auto overflow-visible px-4">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5" />
          <AnimatePresence mode="wait">
            <motion.div 
              key={startIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {visibleBlogs.map((blog, index) => (
                <motion.div
                  key={`${blog._id}-${index}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="h-full"
                  onMouseEnter={() => handleMouseEnter(blog._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/blog/${blog._id}`}
                    className="block h-full no-underline"
                  >
                    <Card
                      className="overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer border border-gray-200 h-full flex flex-col rounded-xl relative"
                    >
                      {/* Image Container with Overlay on Hover */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <motion.img
                          src={blog.imageUrl}
                          alt={blog.heading}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          animate={{ 
                            scale: hoveredCardId === blog._id ? 1.05 : 1 
                          }}
                          transition={{ duration: 0.3 }}
                          onError={(e) => {
                            e.currentTarget.src = '/default-blog-image.jpg';
                          }}
                          loading="lazy"
                        />
                        
                        {/* Overlay on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: hoveredCardId === blog._id ? 1 : 0,
                            backgroundColor: hoveredCardId === blog._id ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-center bg-white p-3 rounded-full">
                            <Eye className="h-6 w-6 text-primary" />
                          </div>
                        </motion.div>
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-grow">
                        {/* Heading */}
                        <h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-2">
                          {blog.heading}
                        </h3>
                        
                        {/* Short description preview */}
                        <motion.p 
                          className="text-gray-600 line-clamp-2 mb-4 text-sm"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: hoveredCardId === blog._id ? 1 : 0,
                            height: hoveredCardId === blog._id ? 'auto' : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {blog.description.substring(0, 100)}
                          {blog.description.length > 100 && '...'}
                        </motion.p>
                        
                        {/* Author and Date */}
                        <div className="mt-auto pt-2 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span className="truncate max-w-24">{blog.name}</span>
                          </div>
                        </div>
                        
                        {/* Read More Button */}
                        <motion.div
                          className="w-full mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: hoveredCardId === blog._id ? 1 : 0,
                            y: hoveredCardId === blog._id ? 0 : 20
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="text-primary font-medium text-center py-2 rounded-md border border-primary bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                            Read More
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={() => setStartIndex((prev) => (prev - 1 + blogs.length) % blogs.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/90 border border-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Previous blog"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setStartIndex((prev) => (prev + 1) % blogs.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/90 border border-gray-200 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Next blog"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {Array(Math.min(blogs.length, 5)).fill(0).map((_, idx) => (
            <button
              key={idx}
              className={`mx-1 h-2 rounded-full transition-all ${
                idx === startIndex % 5 ? "bg-primary w-6" : "bg-gray-300 w-2"
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