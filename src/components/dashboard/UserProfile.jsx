
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

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
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
                    <p className="font-medium">{userData.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pickle" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-pickle" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email Address
                    </p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-pickle" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Created
                    </p>
                    <p className="font-medium">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account ID section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">
                  Account Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account ID
                    </p>
                    <p className="font-mono text-sm">
                      {userData._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Status
                    </p>
                    <Badge className="bg-pickle mt-1">Active</Badge>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </div>
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

export default UserProfile;
