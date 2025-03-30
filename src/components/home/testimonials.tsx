
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    content: "Pickleball Official completely transformed my social media presence. Their team understands the unique aspects of pickleball marketing and delivered amazing results.",
    author: "Aditya Ruhela",
    position: "Professional Pickleball Player",
    avatar: "/images/avatar1.jpg",
  },
  {
    content: "Working with Pickleball Official for our tournament promotion was the best decision we made. They increased our registrations by 40% through their strategic marketing approach.",
    author: "Sarah Johnson",
    position: "Tournament Director, National Pickleball Open",
    avatar: "/images/avatar2.jpg",
  },
  {
    content: "Their content creation team captured the essence of our brand perfectly. The videos and photos they produced have become the cornerstone of our pickleball equipment marketing.",
    author: "Michael Chen",
    position: "Marketing Director, PickleGear Pro",
    avatar: "/images/avatar3.jpg", 
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the athletes, tournaments, and brands we've helped succeed.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full p-2 rounded-full bg-background border border-border shadow-sm text-foreground hover:text-pickle z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border border-border bg-background/50">
                    <CardContent className="pt-8 pb-6">
                      <Quote className="h-10 w-10 text-pickle-light opacity-30 mb-4" />
                      <p className="text-lg text-foreground italic mb-6">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                          <AvatarFallback className="bg-pickle-light text-white">
                            {testimonial.author.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full p-2 rounded-full bg-background border border-border shadow-sm text-foreground hover:text-pickle z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-pickle" : "bg-border"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
