import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User, Moon, Sun } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import image from './pickelballlogo.png';

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Athletes", href: "/athletes" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Clubs", href: "/clubs" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const checkLoginStatus = () => {
      const googleData = localStorage.getItem("googleData");
      const userData = localStorage.getItem("userData");

      if (googleData || userData) {
        setIsLoggedIn(true);
        try {
          if (googleData) {
            const parsedData = JSON.parse(googleData);
            setUserName(parsedData.name || "User");
          } else if (userData) {
            const parsedData = JSON.parse(userData);
            setUserName(parsedData.name || "User");
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserName("User");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  async function handleLogout() {
    // Remove all authentication data
    localStorage.removeItem("userData");
    localStorage.removeItem("googleData");
    localStorage.removeItem("adminData");
    
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
  
      // Regardless of response, redirect to home
      window.location.href = "http://localhost:8080";
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect to home on error
      window.location.href = "http://localhost:8080";
    }
  }
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="border-b bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img src={image} alt="Pickleball Logo" className="h-10 w-auto dark:bg-white bg-black rounded-full p-1" />
              <span className="text-foreground font-semibold text-lg hidden sm:block">PickleballHub</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground/80 hover:text-pickle transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full relative overflow-hidden transition-all duration-300 transform hover:scale-105"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-400 absolute inset-0 m-auto transition-all duration-500 rotate-0 opacity-100" />
                  <Moon className="h-5 w-5 text-slate-700 absolute inset-0 m-auto transition-all duration-500 rotate-90 opacity-0" />
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5 text-yellow-400 absolute inset-0 m-auto transition-all duration-500 rotate-90 opacity-0" />
                  <Moon className="h-5 w-5 text-slate-700 absolute inset-0 m-auto transition-all duration-500 rotate-0 opacity-100" />
                </>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center text-sm font-medium text-foreground/80 hover:text-pickle"
                >
                  <User className="h-4 w-4 mr-1" />
                  {userName}
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="relative h-5 w-5">
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </div>
            </Button>
            <button
              className="text-foreground/80 hover:text-pickle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground/80 hover:text-pickle block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-foreground/80 hover:text-pickle block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button
                    className="flex items-center text-foreground/80 hover:text-pickle w-full text-left px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-foreground/80 hover:text-pickle block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-pickle hover:bg-pickle/10 hover:text-pickle-dark block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
