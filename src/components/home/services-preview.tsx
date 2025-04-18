
import { ArrowRight, Video, Image, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

const SERVICES = [
  {
    title: "Social Media Marketing",
    description: "Strategic content creation for Instagram, TikTok, YouTube and more to grow your pickleball presence.",
    icon: <Image className="h-10 w-10 text-pickle" />,
    link: "/services#social",
  },
  {
    title: "Athlete Performance Overview",
    description: "Track detailed performance of Your Favorite Athelete.",
    icon: <Users className="h-10 w-10 text-pickle" />,
    link: "/athletes",
  },
  {
    title: "Discover Nearby Courts",
    description: "Trace down the nearby Pickleball Courts to enjoy and enhance your pickleball skills.",
    icon: <Video className="h-10 w-10 text-pickle" />,
    link: "/courts",
  },
  {
    title: "Join Club",
    description: "Join The Pickleball clubs and become elite member of the pickleball community and enjoy the facilities",
    icon: <BarChart className="h-10 w-10 text-pickle" />,
    link: "/clubs",
  },
];

export function ServicesPreview() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          const newVisibleItems = [];
          for (let i = 0; i < SERVICES.length; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, i * 200);
          }
          // Remove scroll listener after animation
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check visibility on initial load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            Our Services
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-pickle rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            We offer comprehensive digital marketing solutions tailored exclusively for the pickleball community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Card 
              key={index} 
              className={`transition-all duration-700 transform ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              } hover:shadow-lg hover:shadow-pickle/10 hover:-translate-y-2 border-t-4 border-t-transparent hover:border-t-pickle`}
            >
              <CardHeader className="pb-2">
                <div className="mb-4 p-4 bg-pickle/10 rounded-full inline-block">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={service.link} className="text-pickle hover:text-pickle-dark text-sm font-medium inline-flex items-center group transition-all">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/services">
            <Button size="lg" className="bg-pickle hover:bg-pickle-dark btn-animated">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
