import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:Bharatguptawork07@gmail.com"
                className="hover:text-gray-400"
              >
                Bharatguptawork07@gmail.com
              </a>
            </p>
            <p className="mt-2">
              Phone:{" "}
              <a href="tel:+18406997874" className="hover:text-gray-400">
                +1 (840) 699-7874
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <h2 className="text-xl font-semibold">Follow Me</h2>
            <div className="flex justify-center mt-4 space-x-6">
              <a
                href="https://www.linkedin.com/in/bharat-gupta-07/"
                className="hover:text-gray-400"
                aria-label="LinkedIn"
                target="_blank"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/virat07"
                className="hover:text-gray-400"
                aria-label="GitHub"
                target="_blank"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com/bharatgupta07"
                className="hover:text-gray-400"
                aria-label="Twitter"
                target="_blank"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="mailto:Bharatguptawork07@gmail.com"
                className="hover:text-gray-400"
                aria-label="Email"
                target="_blank"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-right">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="/experience" className="hover:text-gray-400">
                  Experience
                </a>
              </li>
              <li>
                <a href="/skills" className="hover:text-gray-400">
                  Skills
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Bharat Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
