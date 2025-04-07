import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp, MessageSquare } from "lucide-react";
import axios from "axios";

interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
  createdAt: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        const blogData = response.data;
    
        // Estimate read time
        const wordCount = blogData.description ? blogData.description.split(/\s+/).length : 0;
        const estimatedTime = Math.ceil(wordCount / 200); // 200 words per minute
    
        setBlog({
          ...blogData,
          readTime: `${estimatedTime || 1} min read`,
          category: blogData.category || "Sports",
          tags: blogData.tags || ["Pickleball", "Stay Updated", "Enjoy"],
          imageUrl: blogData.imageUrl || "https://placehold.co/800x400"
        });
    
        setError(null);
    
        // Fetch and set real related posts
        const allBlogsResponse = await axios.get('http://localhost:5000/blogs');
        const filteredBlogs = allBlogsResponse.data.filter((b: Blog) => b._id !== blogData._id);
        const shuffled = filteredBlogs.sort(() => Math.random() - 0.5);
        setRelatedPosts(shuffled.slice(0, 3));
        
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || "Blog post not found"}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  // Generate lorem ipsum paragraphs for placeholder content
  const loremParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus."
  ];

  // Use blog description if available, otherwise use lorem ipsum
  const contentParagraphs = blog.description ? 
    blog.description.split('\n') : 
    loremParagraphs;

  return (
    <div >
      <div >
        <div className="h-2 bg-green-500 w-full"></div>
        
        {/* Navigation */}
        <div className="p-4 border-b">
          <Link
            to="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to blogs
          </Link>
        </div>
        
        {/* Hero section */}
        <div className="mb-8 h-96 overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.heading}
            className="w-full h-full rounded-lg shadow-lg object-cover object-center"
          />
        </div>

        {/* Blog content */}
        <div className="p-6 md:p-10">
          {/* Category badge */}
          <div className="mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {blog.category || "Technology"}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            {blog.heading || "How to Build Modern React Applications"}
          </h1>
          
          {/* Meta info */}
          <div className="flex flex-wrap items-center mb-8 text-gray-500 text-sm border-b pb-6">
            <div className="flex items-center mr-6 mb-2">
              <User className="h-4 w-4 mr-1" />
              <span>Author: {blog.name || "Jane Doe"}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Published: {formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {contentParagraphs.map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-gray-700 leading-relaxed">{paragraph}</p>
            ))}
            
            {/* Example blockquote */}
            <blockquote className="border-l-4 border-green-500 pl-4 my-8 italic text-gray-600">
              "Pickleball isn’t just a game anymore — it’s a movement. As courts multiply and players of all ages join in, the sport is fast becoming a lifestyle, a community, and one of the most exciting growth markets in recreational sports"
            </blockquote>
            
            {/* More paragraphs */}
            {/* <p className="mb-6 text-gray-700 leading-relaxed">
              Nulla facilisi. Mauris efficitur metus sit amet massa pretium maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean et felis erat. Nunc sit amet arcu a quam vehicula rutrum.
            </p> */}
            
            {/* Tags */}
            <div className="mt-10 mb-6">
              <div className="flex flex-wrap gap-2">
                {(blog.tags || ["Pickelball","Updates"]).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Engagement actions */}
          
        </div>
        
        {/* Related posts */}
        <div className="bg-gray-50 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <Link to={`/blog/${post._id}`} key={post._id}>
              <div key={post._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-green-700 mb-2 line-clamp-2">
                    {post.heading}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-green-800 text-white p-4 text-center text-sm">
          © 2025 Blog Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
}