import { useState } from "react";
import { FaLinkedin, FaEnvelope, FaTwitter, FaGithub } from "react-icons/fa";
const TeamMemberCard = ({ member, isFounder }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-64 h-80 perspective-1000 transition-transform duration-500 ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-all duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Card */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden ${
            isFounder ? "bg-green-50" : "bg-blue-50"
          } rounded-xl shadow-lg flex flex-col items-center p-6`}
        >
          <div className="relative mb-4 overflow-hidden rounded-full w-36 h-36 ring-4 ring-opacity-50 group-hover:ring-opacity-100 transition-all duration-300 ease-in-out">
            <img
              src={member.image || "/api/placeholder/300/300"}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            />
          </div>
          <h3
            className={`text-xl font-bold ${
              isFounder ? "text-green-700" : "text-blue-700"
            } mb-1`}
          >
            {member.name}
          </h3>
          <p
            className={`text-sm font-medium ${
              isFounder ? "text-green-600" : "text-blue-600"
            } mb-3`}
          >
            {member.role}
          </p>
          <p className="text-gray-600 text-sm italic mb-4">Click to flip</p>
          <div className="flex space-x-3 mt-auto">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-125"
              >
                <FaLinkedin className="text-blue-600 text-xl" />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-125"
              >
                <FaTwitter className="text-blue-400 text-xl" />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-125"
              >
                <FaGithub className="text-gray-800 text-xl" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="transition-transform hover:scale-125"
              >
                <FaEnvelope className="text-red-500 text-xl" />
              </a>
            )}
          </div>
        </div>

        {/* Back Card */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden ${
            isFounder ? "bg-green-100" : "bg-blue-100"
          } rounded-xl shadow-lg p-6 flex flex-col justify-between rotate-y-180`}
        >
          <div>
            <h3
              className={`text-xl font-bold ${
                isFounder ? "text-green-700" : "text-blue-700"
              } mb-3`}
            >
              {member.name}
            </h3>
            <p className="text-gray-700 mb-4">{member.bio}</p>
          </div>
          <div className="mt-auto">
            <p className="text-gray-600 text-sm italic mb-4">
              Click to flip back
            </p>
            <div className="flex space-x-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-125"
                >
                  <FaLinkedin className="text-blue-600 text-xl" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="transition-transform hover:scale-125"
                >
                  <FaEnvelope className="text-red-500 text-xl" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeamMemberCard;