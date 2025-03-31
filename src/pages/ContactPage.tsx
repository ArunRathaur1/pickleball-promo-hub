import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to PickelBall! Our platform connects users with experts across various domains. If you have any questions, feel free to reach out to us.
      </p>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
        <p>Email: picklebalofficial@gmail.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: NIT Raipur, Chhattisgarh, India</p>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-3xl">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-3xl">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-3xl">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactPage;
