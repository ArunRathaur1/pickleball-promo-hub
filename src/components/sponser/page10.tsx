import React from "react";

const CampaignForm: React.FC = () => {
  return (
    <div
      id="container02"
      className="w-full bg-gray-100 py-12 flex justify-center"
    >
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-700">
            Let's hit your campaign goals
          </p>
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
          <p className="text-gray-600 mt-2">
            Product Launches, Brand Awareness, Events, Livestreams, Giveaways,
            Travel & Getaways, PR & Announcements, B2B Lead Generation, Custom
            Paddles
          </p>
        </div>

        {/* Form */}
        <form
          id="form01"
          method="post"
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Field */}
            <input
              type="text"
              name="name"
              id="form01-name"
              placeholder="Name"
              maxLength={128}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Company Name */}
            <input
              type="text"
              name="company"
              id="form01-company"
              placeholder="Company Name"
              maxLength={128}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              id="form01-email"
              placeholder="Email"
              maxLength={128}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <textarea
            name="message"
            id="form01-message"
            placeholder="Message"
            maxLength={16384}
            required
            className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
            >
              <span>Send Request</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          <input type="hidden" name="id" value="form01" />
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
