import { useState, useEffect } from "react";
import { User, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
  const fetchUserData = async () => {
    // Check URL parameters for a "refresh" flag to prevent infinite refresh loops
    const urlParams = new URLSearchParams(window.location.search);
    const hasRefreshed = urlParams.get('refreshed');
    
    // Priority 1: Try to fetch from Google API
    try {
      const response = await fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          const name = data.user.displayName;
          const email = data.user._json.email;
          const photo = data.user.photos[0].value;
          
          console.log("Google data:", name, email, photo);
          
          // Save to localStorage and set state
          const googleUserData = { name, email, picture: photo };
          localStorage.setItem("googleData", JSON.stringify(googleUserData));
          setUserData(googleUserData);
          setIsGoogleUser(true);
          
          // Refresh the page once after storing the data to localStorage
          if (!hasRefreshed) {
            console.log("Data found from API, refreshing page for navbar update...");
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('refreshed', 'true');
            window.location.href = newUrl.toString();
          }
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching Google user data:", error);
    }
    
    // Priority 2: Check for googleData in localStorage
    try {
      const googleData = localStorage.getItem("googleData");
      if (googleData) {
        const parsedData = JSON.parse(googleData);
        console.log("Found Google data in localStorage:", parsedData);
        setUserData(parsedData);
        setIsGoogleUser(true);
        return;
      }
    } catch (error) {
      console.error("Error parsing Google data from localStorage:", error);
    }
    
    // Priority 3: Fall back to userData in localStorage
    try {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Found user data in localStorage:", parsedUser);
        setUserData(parsedUser);
        setIsGoogleUser(false);
        return;
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
    
    // If we reach here, no data was found in any source
    // Only refresh if we haven't already refreshed to prevent infinite loops
    if (!hasRefreshed) {
      console.log("No user data found in any source, refreshing page...");
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('refreshed', 'true');
      window.location.href = newUrl.toString();
    }
  };
  
  fetchUserData();
}, []);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Get initials safely
  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '?';
    
    // Safely split the name and get initials
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Safe string display
  const safeString = (value) => {
    if (value === null || value === undefined) return 'Not available';
    return String(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Your account details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userData ? (
          isGoogleUser ? (
            // Google User View - Only show name, email, and photo
            <div className="flex flex-col items-center gap-4">
              {userData.picture ? (
                <img
                  src={userData.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold">{getInitials(userData.name)}</span>
                </div>
              )}
              <div className="space-y-4 text-center">
                <div className="flex items-center gap-3 justify-center">
                  <User className="h-5 w-5 text-pickle" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Name
                    </p>
                    <p className="font-medium">{safeString(userData.name)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 justify-center">
                  <Mail className="h-5 w-5 text-pickle" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>
                    <p className="font-medium">{safeString(userData.email)}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          ) : (
            // Regular User View - Show full profile information
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User profile info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-pickle" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Full Name
                      </p>
                      <p className="font-medium">{safeString(userData.name)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-pickle" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phone Number
                      </p>
                      <p className="font-medium">{safeString(userData.phone)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-pickle" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-medium">{safeString(userData.email)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-pickle" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Account Created
                      </p>
                      <p className="font-medium">
                        {userData.createdAt ? formatDate(userData.createdAt) : 'Not available'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account ID section */}
                
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">
                  Account Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">
                    Notification Preferences
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">
              Loading user information...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDashboard;