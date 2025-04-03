import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const SocialSection = () => {
  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-16 px-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div
          id="img05"
          className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
        >
          <img
            src="/"
            alt="Pickleball Social Media"
            width={400}
            height={300}
            className="rounded-md shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left max-w-2xl">
          <p className="text-gray-600 text-lg">
            Oh, and by the way, we're{" "}
            <span className="font-semibold">@pickleball</span> on Twitter/X.
            Join the conversation!
          </p>
          <p className="text-2xl font-semibold mt-4 text-gray-800">
            Tens of millions of monthly impressions
          </p>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">
            Expanding Our Social Footprint
          </h2>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            We thrive in the digital pickleball community, delivering the latest
            updates, highlights, and trending discussions. Our followers are
            passionate, engaged, and always hungry for more.
          </p>

          {/* Social Media Links */}
          <ul className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a
                target="_blank"
                  href={link.href}
                  className="flex items-center gap-3 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                  {<link.icon className="w-5 h-5" />}
                  <span className="font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const socialLinks = [
  {
    href: "https://www.instagram.com/pickleballofficial/",
    label: "215k+ Followers",
    icon: Instagram,
  },
  {
    href: "https://www.twitter.com/pickleball",
    label: "20k+ Followers",
    icon: Twitter,
  },
  {
    href: "https://www.youtube.com/thedinkpickleball",
    label: "74k+ Subscribers",
    icon: Youtube,
  },
  {
    href: "https://www.facebook.com/people/The-Dink-Pickleball/100063733291493/",
    label: "70k+ Followers",
    icon: Facebook,
  },
  {
    href: "https://www.linkedin.com/company/69753167",
    label: "8.2k+ Professionals",
    icon: Linkedin,
  },
  {
    href: "https://www.threads.net/@thedinkpickleball",
    label: "36k+ Followers",
    icon: MessageCircle,
  },
];

export default SocialSection;
