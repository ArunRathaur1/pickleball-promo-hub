
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";

interface AuthFormProps {
  type: "login" | "register";
  userType: "user" | "admin";
}

export function AuthForm({ type, userType }: AuthFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would be replaced with actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: type === "login" ? "Logged in successfully" : "Account created successfully",
        description: "Welcome to Pickleball Official!",
      });
      
      // Redirect based on user type
      if (userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleAuth = async () => {
    setLoading(true);
    
    try {
      // This would be replaced with actual Google auth logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Google authentication successful",
        description: "Welcome to Pickleball Official!",
      });
      
      // Redirect based on user type
      if (userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google authentication failed",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <CardTitle className="text-2xl">
          {type === "login" 
            ? `${userType === "admin" ? "Admin" : ""} Sign In` 
            : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Fill in the details below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "login" && (
                <a 
                  href="#" 
                  className="text-xs text-pickle hover:text-pickle-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Password reset",
                      description: "Check your email for password reset instructions",
                    });
                  }}
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-pickle hover:bg-pickle-dark"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              type === "login" ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          type="button" 
          className="w-full" 
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
          </svg>
          Sign {type === "login" ? "in" : "up"} with Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center p-6">
        <p className="text-sm text-muted-foreground text-center">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <a
            href={type === "login" ? "/register" : "/login"}
            className="ml-1 text-pickle hover:text-pickle-dark hover:underline"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </a>
        </p>
        {userType === "user" && type === "login" && (
          <a
            href="/admin/login"
            className="mt-2 text-xs text-muted-foreground hover:text-pickle hover:underline"
          >
            Admin Login
          </a>
        )}
        {userType === "admin" && type === "login" && (
          <a
            href="/login"
            className="mt-2 text-xs text-muted-foreground hover:text-pickle hover:underline"
          >
            User Login
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
