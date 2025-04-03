import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Instagram, Award,  ChevronLeft } from "lucide-react";
import { FaYoutube } from "react-icons/fa";  // ✅ Correct import
import { Button } from "@/components/ui/button";

interface Athlete {
  _id: string;
  name: string;
  age: number;
  gender: string;
  country: string;
  height: number;
  points: number;
  DUPRID: string;
  sponsors: { name: string; imageUrl: string }[];
  instagramPage?: string;
  titlesWon: { title: string; year: number }[];
  relatedContent: { imageUrl: string; title: string; youtubeLink: string }[];
  imageUrl: string;
  createdAt: string;
}

const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/athletes/${id}`)
      .then((res) => {
        setAthlete(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Athlete not found");
        setLoading(false);
      });
  }, [id]);

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <h3 className="font-bold">Error</h3>
            <p>{error || 'No athlete data available'}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/athletes')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Athletes
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/athletes')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Athletes
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
                <img src={athlete.imageUrl} alt={athlete.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h1 className="text-3xl font-bold">{athlete.name}</h1>
                  <span className="bg-blue-800 px-3 py-1 rounded text-sm mt-2 md:mt-0">
                    DUPRID: {athlete.DUPRID}
                  </span>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="bg-blue-700">{athlete.gender}</Badge>
                  <Badge className="bg-blue-700">{athlete.country}</Badge>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm opacity-75">Age</p>
                    <p className="font-semibold">{athlete.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Height</p>
                    <p className="font-semibold">{athlete.height} cm</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Points</p>
                    <p className="font-semibold">{athlete.points.toLocaleString()}</p>
                  </div>
                </div>

                {athlete.instagramPage && (
                  <a 
                    href={athlete.instagramPage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-sm"
                  >
                    <Instagram size={16} />
                    Instagram Profile
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="about" className="p-4">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="titles">Titles</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              <TabsTrigger value="content">Related Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="p-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Bio</h2>
                  <p className="text-gray-700">
                    {athlete.name} is a {athlete.age}-year-old {athlete.gender.toLowerCase()} athlete from {athlete.country}. 
                    Standing at {athlete.height} cm tall, they have accumulated {athlete.points} points in their career so far.
                  </p>
                  <p className="mt-4 text-gray-700">
                    They have won {athlete.titlesWon.length} major titles and are sponsored by {athlete.sponsors.length} major brands.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Details</h2>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Athlete ID:</span>
                      <span className="font-medium">{athlete.DUPRID}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Country:</span>
                      <span className="font-medium">{athlete.country}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Gender:</span>
                      <span className="font-medium">{athlete.gender}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="titles" className="p-4">
              <h2 className="text-xl font-semibold mb-6">Titles Won</h2>
              {athlete.titlesWon.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {athlete.titlesWon.map((title, index) => (
                    <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 flex items-center gap-4">
                          <Award size={24} className="text-white" />
                          <div>
                            <h3 className="font-bold text-white">{title.title}</h3>
                            <p className="text-white text-sm">{title.year}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No titles won yet.</p>
              )}
            </TabsContent>
            
            <TabsContent value="sponsors" className="p-4">
              <h2 className="text-xl font-semibold mb-6">Sponsors</h2>
              {athlete.sponsors.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {athlete.sponsors.map((sponsor, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                      <img 
                        src={sponsor.imageUrl} 
                        alt={sponsor.name} 
                        className="h-20 mx-auto object-contain mb-4" 
                      />
                      <p className="font-medium">{sponsor.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No sponsors yet.</p>
              )}
            </TabsContent>
            
            <TabsContent value="content" className="p-4">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FaYoutube size={24} color="red" />

                Related Content
              </h2>
              {athlete.relatedContent.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {athlete.relatedContent.map((content, index) => (
                    <a 
                      key={index}
                      href={content.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img 
                              src={content.imageUrl} 
                              alt={content.title}
                              className="w-full aspect-video object-cover" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-red-600 rounded-full p-3">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                              {content.title}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No related content available.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PlayerProfile;