import React, { useEffect, useState } from "react";
import {
  Trophy,
  Activity,
  MapPin,
  Calendar,
  User,
  Ruler,
  Medal,
  Clock,
} from "lucide-react";

const PlayerProfile = () => {
  const [playerData, setPlayerData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("playerProfileData");
    if (storedData) {
      setPlayerData(JSON.parse(storedData));
      setTimeout(() => setLoaded(true), 500); // Smooth transition effect
    }
  }, []);

  if (!playerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-green-600">
        <div className="text-center p-8 rounded-lg bg-black bg-opacity-20 backdrop-blur-md text-white">
          <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading Player Profile...</p>
        </div>
      </div>
    );
  }

  // Calculate years playing based on the player's age (just for demonstration)
  const yearsPlaying = Math.max(1, Math.floor((playerData.age - 15) / 2));

  // Create skill level visualization
  const skills = [
    { name: "Forehand", level: Math.floor(Math.random() * 30) + 70 },
    { name: "Backhand", level: Math.floor(Math.random() * 30) + 70 },
    { name: "Dinking", level: Math.floor(Math.random() * 30) + 70 },
    { name: "Serving", level: Math.floor(Math.random() * 30) + 70 },
    { name: "Speed", level: Math.floor(Math.random() * 30) + 70 },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-900 to-green-700 p-6 text-white relative transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-green-300 bg-opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-green-400 bg-opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-white bg-opacity-20 animate-ping"></div>
      </div>

      {/* Pickleball Court Lines (Stylized) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-4/5 h-3/5 border-4 border-white rounded-lg"></div>
        <div className="absolute w-1/2 h-4/5 border-4 border-white"></div>
        <div className="absolute w-4/5 h-0 border-t-4 border-white"></div>
      </div>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
      >
        <source
          src="https://www.videvo.net/videvo_files/converted/2014_07/preview/Pickleball.mp4"
          type="video/mp4"
        />
      </video>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full z-10 relative text-gray-800 grid md:grid-cols-5 transition-all duration-500 hover:shadow-green-400">
        {/* Left Side: Player Image & Basic Info */}
        <div className="md:col-span-2 bg-gradient-to-br from-black to-green-800 p-6 flex flex-col items-center justify-center text-white">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500 bg-opacity-30 blur-md transform scale-110"></div>
            <img
              src={playerData.imageUrl || "/api/placeholder/150/150"}
              alt={playerData.name}
              className="w-40 h-40 rounded-full mx-auto shadow-lg border-4 border-white object-cover relative z-10"
            />
          </div>

          <h1 className="text-3xl font-bold mt-6 text-center">
            {playerData.name}
          </h1>
          <div className="flex items-center mt-2 mb-4">
            <Trophy size={18} className="mr-2 text-green-400" />
            <p className="text-lg font-semibold">
              Professional Pickleball Player
            </p>
          </div>

          <div className="mt-4 w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-green-400" />
                <span>{playerData.country}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-green-400" />
                <span>{playerData.age} years</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User size={16} className="mr-2 text-green-400" />
                <span>{playerData.gender}</span>
              </div>
              <div className="flex items-center">
                <Ruler size={16} className="mr-2 text-green-400" />
                <span>{playerData.height} cm</span>
              </div>
            </div>

            <div className="mt-6 text-center bg-green-700 bg-opacity-60 rounded-lg p-3 border border-green-500">
              <div className="flex items-center justify-center">
                <Medal size={20} className="mr-2 text-green-300" />
                <span className="text-xl font-bold">
                  {playerData.points} Points
                </span>
              </div>
              <div className="text-sm mt-1 opacity-90">
                World Ranking: #{Math.floor(Math.random() * 100) + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stats & Details */}
        <div className="md:col-span-3 p-6 bg-gray-50">
          {/* Player Stats */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-green-200 pb-2 mb-4 flex items-center">
              <Activity size={20} className="mr-2 text-green-600" />
              Player Statistics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm text-green-700 font-medium">Win Rate</p>
                <p className="text-2xl font-bold">
                  {Math.floor(Math.random() * 30) + 70}%
                </p>
              </div>

              <div className="bg-black bg-opacity-5 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-medium">Tournaments</p>
                <p className="text-2xl font-bold">
                  {Math.floor(Math.random() * 50) + 20}
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm text-green-700 font-medium">Experience</p>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-green-600" />
                  <p className="text-2xl font-bold">{yearsPlaying} years</p>
                </div>
              </div>

              <div className="bg-black bg-opacity-5 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-medium">
                  Singles Rank
                </p>
                <p className="text-2xl font-bold">
                  #{Math.floor(Math.random() * 50) + 10}
                </p>
              </div>
            </div>
          </div>

          {/* Skill Levels */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-green-200 pb-2 mb-4">
              Skill Breakdown
            </h3>

            {skills.map((skill) => (
              <div key={skill.name} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-green-700">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-700 to-green-500 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Titles */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-green-200 pb-2 mb-4 flex items-center">
              <Trophy size={20} className="mr-2 text-green-600" />
              Titles Won
            </h3>

            <div className="flex flex-wrap">
              {playerData.titlesWon && playerData.titlesWon.length > 0 ? (
                playerData.titlesWon.map((title, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gradient-to-r from-green-700 to-green-600 text-white rounded-full px-4 py-1 m-1 shadow-sm"
                  >
                    {title}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No titles won yet. This player is working hard toward their
                  first championship!
                </p>
              )}
            </div>
          </div>

          {/* Upcoming Tournaments */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-green-200 pb-2 mb-4">
              Upcoming Tournaments
            </h3>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                <span className="font-medium">
                  US Open Pickleball Championships
                </span>
                <span className="text-sm text-green-700">
                  April 15-22, 2025
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Grand Slam Pickleball</span>
                <span className="text-sm text-green-700">May 10-13, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-white text-sm opacity-80 z-10">
        <p>© 2025 Professional Pickleball Association</p>
      </div>
    </div>
  );
};

export default PlayerProfile;
