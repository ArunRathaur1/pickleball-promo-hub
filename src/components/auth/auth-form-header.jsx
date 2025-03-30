
import { CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";

export function AuthFormHeader({ type, userType }) {
  return (
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
  );
}
