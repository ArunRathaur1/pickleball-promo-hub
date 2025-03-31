import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import image from './pickelballlogo.png';
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  // { label: "Dashboard", href: "/dashboard" },
  { label: "Services", href: "/services" },
  { label: "Athletes", href: "/athletes" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Courts", href: "/courts" },
  { label: "Contact", href: "/contact" },
];

export  function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in by looking for userData or googleData in localStorage
    const checkLoginStatus = () => {
      const googleData = localStorage.getItem("googleData");
      const userData = localStorage.getItem("userData");

      if (googleData || userData) {
        setIsLoggedIn(true);

        // Get user name for display
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
    // Add event listener to detect localStorage changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    console.log("deleted the user data");
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

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" style={{display:'flex',justifyContent:'center'}}>
              <img src={image} alt="User Profile" style={{background:'black' ,height:'50px'}}/>
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-600 hover:text-pickle px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-pickle"
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
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-600 hover:text-pickle"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-600 hover:text-pickle block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-600 hover:text-pickle block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button
                    className="flex items-center text-gray-600 hover:text-pickle w-full text-left px-3 py-2 rounded-md text-base font-medium"
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
                    className="text-gray-600 hover:text-pickle block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-pickle hover:bg-pickle hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
