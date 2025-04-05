
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceCalculator } from "@/components/services/service-calculator";
import { Image, Video, Users, BarChart, Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  const services = [
    {
      title: "Social Media Marketing",
      description: "Grow your pickleball presence across all major platforms",
      icon: <Instagram className="h-6 w-6" />,
      features: [
        "Strategic content calendar creation",
        "Daily posting and engagement",
        "Analytics and performance tracking",
        "Community management",
        "Hashtag and keyword optimization"
      ],
      popular: true,
      link: "/contact?service=social",
      id: "social"
    },
    {
      title: "Tournament Promotion",
      description: "Maximize attendance and engagement for your events",
      icon: <Users className="h-6 w-6" />,
      features: [
        "Pre-event marketing campaign",
        "On-site coverage and content creation",
        "Live updates and stories",
        "Post-event highlights and recaps",
        "Sponsor integration and promotion"
      ],
      popular: false,
      link: "/contact?service=tournament",
      id: "tournament"
    },
    {
      title: "Content Creation",
      description: "Professional photo and video content for pickleball",
      icon: <Video className="h-6 w-6" />,
      features: [
        "Professional photography",
        "Cinematic videography",
        "Highlight reels and montages",
        "Athlete profile videos",
        "Product showcases and reviews"
      ],
      popular: false,
      link: "/contact?service=content",
      id: "content"
    },
    {
      title: "Analytics & Reporting",
      description: "Data-driven insights to optimize your strategy",
      icon: <BarChart className="h-6 w-6" />,
      features: [
        "Comprehensive performance metrics",
        "Competitor analysis",
        "Audience insights and demographics",
        "Monthly progress reports",
        "Strategy optimization recommendations"
      ],
      popular: false,
      link: "/contact?service=analytics",
      id: "analytics"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Our Services</h1>
            <p className="text-muted-foreground">
              We offer comprehensive digital marketing solutions tailored exclusively for 
              the pickleball community. From social media management to tournament promotion, 
              we've got you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} id={service.id}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  popular={service.popular}
                  link={service.link}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-20 mb-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Service Cost Estimator</h2>
              <p className="text-muted-foreground">
                Use our calculator below to get an estimate for your pickleball marketing needs. 
                This will help you budget for your next tournament or event.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ServiceCalculator />
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your pickleball marketing needs. 
              We'll create a custom package tailored to your specific goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button size="lg" className="bg-pickle hover:bg-pickle-dark">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </Button> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
