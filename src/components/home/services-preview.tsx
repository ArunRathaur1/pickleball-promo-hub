
import { ArrowRight, Video, Image, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    description: "Trace down the nearby Pickleball Courts to enjoy and enhance your pickleball skills .",
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
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive digital marketing solutions tailored exclusively for the pickleball community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={service.link} className="text-pickle hover:text-pickle-dark text-sm font-medium inline-flex items-center">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button size="lg" className="bg-pickle hover:bg-pickle-dark">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
