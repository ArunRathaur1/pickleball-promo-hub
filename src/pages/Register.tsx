
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-md">
          <AuthForm type="register" userType="user" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
