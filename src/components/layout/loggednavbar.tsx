
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Athletes", href: "/athletes" },
  { label: "Tournaments", href: "/tournaments" },
  // { label: "Courts", href: "/courts" },
  { label: "Clubs", href: "/clubs" },
  { label: "Contact", href: "/contact" },
];
  const handleLogout = async () => {
    console.log('deleted the user data');
    localStorage.removeItem("userData");
    localStorage.removeItem("googleData");
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", // ✅ Allow sending cookies
      });

      if (response.ok) {
        window.location.href = "http://localhost:8080"; // Redirect after logout
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

export function LoggedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          <nav className="hidden md:flex gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </div>

          <button
            className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
