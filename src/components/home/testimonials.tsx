import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, X, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
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

  const openBlogDetails = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsPaused(true);
  };

  const closeBlogDetails = () => {
    setSelectedBlog(null);
    setIsPaused(false);
  };

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
                  >
                    <Card 
                      className={`overflow-hidden transition-all duration-300 ${colorClass} shadow-sm hover:shadow-xl transform hover:-translate-y-1 cursor-pointer border-2 h-full flex flex-col`}
                      onClick={() => openBlogDetails(blog)}
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

      {/* Blog Details Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="h-2 bg-primary w-full"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{selectedBlog.heading}</h2>
                  <button
                    onClick={closeBlogDetails}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex items-center mb-6 text-gray-500 text-sm">
                  <div className="flex items-center mr-4">
                    <User className="h-4 w-4 mr-1" />
                    <span>Author: {selectedBlog.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Published: {formatDate(selectedBlog.createdAt)}</span>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[50vh] pr-2">
                  <div className="prose prose-lg max-w-none">
                    {selectedBlog.description.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-gray-700">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={closeBlogDetails}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}