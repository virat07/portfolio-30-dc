import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const FooterComponent = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <footer
      className={`py-12 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Contact & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Contact Info */}
          <div className="flex-1 text-center md:text-left">
            <h2
              className={`text-xl mb-4 ${
                isDark ? "text-teal-400" : "text-teal-600"
              }`}
            >
              Contact
            </h2>
            <p>
              Email:{" "}
              <a
                href="mailto:Bharat.gupta1407@gmail.com"
                className={`hover:${isDark ? "text-teal-300" : "text-teal-500"}`}
              >
                Bharat.gupta1407@gmail.com
              </a>
            </p>
            <p className="mt-2">
              Phone:{" "}
              <a
                href="tel:+18406997874"
                className={`hover:${isDark ? "text-teal-300" : "text-teal-500"}`}
              >
                +1 (840) 699-7874
              </a>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex-1 text-center">
            <h2
              className={`text-xl mb-4 ${
                isDark ? "text-teal-400" : "text-teal-600"
              }`}
            >
              Follow Me
            </h2>
            <div className="flex justify-center md:justify-center space-x-6">
              {[{
                icon: <FaLinkedin size={28} />,
                href: "https://www.linkedin.com/in/bharat-gupta-07/",
                label: "LinkedIn",
              },{
                icon: <FaGithub size={28} />,
                href: "https://github.com/virat07",
                label: "GitHub",
              },{
                icon: <FaTwitter size={28} />,
                href: "https://twitter.com/bharatgupta07",
                label: "Twitter",
              },{
                icon: <FaEnvelope size={28} />,
                href: "mailto:Bharat.guptawork07@gmail.com",
                label: "Email",
              }].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 hover:${
                    isDark ? "text-teal-300" : "text-teal-500"
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 text-center md:text-right">
            <h2
              className={`text-xl mb-4 ${
                isDark ? "text-teal-400" : "text-teal-600"
              }`}
            >
              Quick Links
            </h2>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Skills", href: "#skills" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`transition-colors duration-300 hover:${
                      isDark ? "text-teal-300" : "text-teal-500"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`text-center mt-12 border-t transition-colors duration-300 pt-6 text-sm ${
            isDark ? "border-gray-700 text-gray-400" : "border-gray-300 text-gray-600"
          }`}
        >
          &copy; {new Date().getFullYear()} Bharat Gupta. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
