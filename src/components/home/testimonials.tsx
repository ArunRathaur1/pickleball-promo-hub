import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";

interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
  createdAt: string;
}

export function Testimonials() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  useEffect(() => {
    // Auto-rotate blogs every 5 seconds if not paused
    if (blogs.length > 1 && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % blogs.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [blogs, isPaused]);
  
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
  
  const nextBlog = () => {
    if (blogs.length > 0) {
      setActiveIndex((prev) => (prev + 1) % blogs.length);
      resetInterval();
    }
  };
  
  const prevBlog = () => {
    if (blogs.length > 0) {
      setActiveIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
      resetInterval();
    }
  };
  
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % blogs.length);
      }, 5000);
    }
  };
  
  const openBlogDetails = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsPaused(true);
  };
  
  const closeBlogDetails = () => {
    setSelectedBlog(null);
    setIsPaused(false);
  };
  
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pickle"></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchBlogs}
              className="mt-4 px-4 py-2 bg-pickle text-white rounded-lg hover:bg-pickle-dark transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  if (blogs.length === 0) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Blog Posts</h2>
            <p className="text-muted-foreground mt-4">No blog posts found.</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Blog Posts</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Stay updated with our latest news, tips, and insights
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <button 
            onClick={prevBlog}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full p-2 rounded-full bg-background border border-border shadow-sm text-foreground hover:text-pickle z-10"
            aria-label="Previous blog"
            disabled={blogs.length <= 1}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {blogs.map((blog, index) => (
                <div key={blog._id} className="w-full flex-shrink-0 px-4">
                  <Card 
                    className="border border-border bg-background/50 cursor-pointer transform transition-transform hover:scale-102 hover:shadow-lg"
                    onClick={() => openBlogDetails(blog)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <CardContent className="pt-8 pb-6">
                      <BookOpen className="h-10 w-10 text-pickle-light opacity-30 mb-4" />
                      <h3 className="text-xl font-bold mb-6">{blog.heading}</h3>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarFallback className="bg-pickle-light text-white">
                            {blog.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{blog.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(blog.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextBlog}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full p-2 rounded-full bg-background border border-border shadow-sm text-foreground hover:text-pickle z-10"
            aria-label="Next blog"
            disabled={blogs.length <= 1}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  resetInterval();
                }}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-pickle" : "bg-border"
                }`}
                aria-label={`Go to blog ${index + 1}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Blog Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedBlog.heading}</h2>
                <button
                  onClick={closeBlogDetails}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="prose max-w-none mb-6">
                {selectedBlog.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="flex items-center border-t pt-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-pickle-light text-white">
                    {selectedBlog.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedBlog.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedBlog.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar for current slide */}
      <div className="max-w-4xl mx-auto mt-2">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-1 bg-pickle transition-all duration-100 ease-linear"
            style={{ 
              width: `${(activeIndex + 1) / blogs.length * 100}%`,
              animationName: isPaused ? 'none' : 'progress',
              animationDuration: '5s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}