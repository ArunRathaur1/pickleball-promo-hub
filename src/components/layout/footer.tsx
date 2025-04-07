
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              The premier digital marketing agency exclusively for pickleball athletes, tournaments, and brands.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground/70 hover:text-pickle transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-pickle transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-pickle transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-pickle transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-pickle">Home</Link></li>
              <li><Link to="/sponsor" className="text-sm text-muted-foreground hover:text-pickle">Our Sponsers</Link></li>
              <li><Link to="/services" className="text-sm text-muted-foreground hover:text-pickle">Services</Link></li>
              <li><Link to="/tournaments" className="text-sm text-muted-foreground hover:text-pickle">Tournaments</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-pickle">Contact</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-sm text-muted-foreground hover:text-pickle">Social Media Marketing</Link></li>
              <li><Link to="/tournaments" className="text-sm text-muted-foreground hover:text-pickle">Tournament Promotion</Link></li>
              <li><Link to="/athletes" className="text-sm text-muted-foreground hover:text-pickle">Athlete Branding</Link></li>
              <li><Link to="/clubs" className="text-sm text-muted-foreground hover:text-pickle">Club Promotion</Link></li>
              <li><Link to="/sponsor" className="text-sm text-muted-foreground hover:text-pickle">Brand Collaborations</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-pickle" />
                <a href="mailto:info@pickleofficial.com" className="hover:text-pickle">info@pickleofficial.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-pickle" />
                <a href="tel:+123456789" className="hover:text-pickle">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Pickleball Official. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-pickle">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-pickle">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
