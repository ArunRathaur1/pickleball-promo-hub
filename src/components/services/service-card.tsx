
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  link: string;
}

export function ServiceCard({ title, description, icon, features, popular, link }: ServiceCardProps) {
  return (
    <Card className={`transition-all duration-300 ${popular ? "border-pickle scale-105 shadow-lg" : "hover:border-border/60 hover:shadow"}`}>
      {popular && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2">
          <Badge className="bg-pickle-accent text-white">Popular</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-pickle">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-pickle flex-shrink-0">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      
    </Card>
  );
}
