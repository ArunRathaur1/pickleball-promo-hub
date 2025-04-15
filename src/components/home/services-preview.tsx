import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    title: "Athlete Empowerment",
    description:
      "We help athletes build their brand and connect with fans through personalized websites and content creation.",
    icon: Rocket,
    href: "/athlete-services",
  },
  {
    title: "Tournament Promotion",
    description:
      "We provide tournaments with the tools they need to attract sponsors and engage with players.",
    icon: Rocket,
    href: "/tournament-services",
  },
  {
    title: "Company Partnerships",
    description:
      "We connect companies with the pickleball community through targeted marketing campaigns and sponsorship opportunities.",
    icon: Rocket,
    href: "/company-services",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <service.icon className="mr-2 h-5 w-5 text-green-500" />
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Link to={service.href}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-300">
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
