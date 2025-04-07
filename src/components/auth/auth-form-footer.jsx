
import { CardFooter } from "@/components/ui/card";

export function AuthFormFooter({ type, userType }) {
  return (
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
      {/* {userType === "user" && type === "login" && (
        <a
          href="/admin/login"
          className="mt-2 text-xs text-muted-foreground hover:text-pickle hover:underline"
        >
          Admin Login
        </a>
      )} */}
      {/* {userType === "admin" && type === "login" && (
        <a
          href="/login"
          className="mt-2 text-xs text-muted-foreground hover:text-pickle hover:underline"
        >
          User Login
        </a>
      )} */}
    </CardFooter>
  );
}
