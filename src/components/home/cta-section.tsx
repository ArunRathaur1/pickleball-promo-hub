
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-16 hero-gradient">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white py-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Pickleball Presence?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an athlete looking to build your brand, a tournament
            seeking promotion, or a company wanting to connect with the
            pickleball community, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sponsor" target="_blank">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-pickle hover:bg-white/90 group"
              >
                Our Sponsors
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
