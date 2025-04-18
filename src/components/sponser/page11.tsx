import React from "react";

const ThankYouSection: React.FC = () => {
  return (
    <section
      id="done-section"
      className="w-full py-16 bg-gray-100 flex justify-center"
    >
      <div className="max-w-2xl w-full px-6 text-center">
        <h2 id="text11" className="text-3xl font-bold text-gray-900">
          Thank You
        </h2>
        <p id="text12" className="text-lg text-gray-600 mt-2">
          We'll be in touch with you soon!
        </p>

        <ul id="buttons02" className="mt-6 flex justify-center">
          <li>
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
              role="button"
            >
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
              <span>Back to home page</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ThankYouSection;
