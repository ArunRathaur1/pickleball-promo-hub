
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/hooks/use-toast";
import { AuthFormHeader } from "./auth-form-header";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { GoogleAuthButton } from "./google-auth-button";
import { AuthFormFooter } from "./auth-form-footer";

export function AuthForm({ type, userType }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (formData) => {
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
   // Open Google OAuth in a new tab
   window.open(`http://localhost:5000/auth/google`, "_self");
 };

  return (
    <Card className="w-full max-w-md mx-auto">
      <AuthFormHeader type={type} userType={userType} />
      <CardContent>
        {type === "login" ? (
          <LoginForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <RegisterForm onSubmit={handleSubmit} loading={loading} />
        )}
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <GoogleAuthButton onClick={handleGoogleAuth} loading={loading} authType={type} />
      </CardContent>
      <AuthFormFooter type={type} userType={userType} />
    </Card>
  );
}
