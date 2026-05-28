import React, { useState } from "react";
import Blogo from "../assets/BIcon.png";
import DownloadResumeComponent from "./DownloadResume";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBarComponent = ({ scrollToSection, refs, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", ref: refs.typingHomeRef },
    { label: "About", ref: refs.aboutUsRef },
    { label: "Experience", ref: refs.experienceRef },
    { label: "Projects", ref: refs.projectsRef },
    { label: "Skills", ref: refs.skillsRef },
    { label: "Blog", ref: refs.mediumNotionRef },
  ];

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      const navbarHeight = 64; // adjust if navbar height changes
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full shadow-lg z-50 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={Blogo} alt="logo" className="h-10 w-10" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleScroll(item.ref)}
                className={`transition-colors duration-300 font-medium ${
                  theme === "dark"
                    ? "hover:text-emerald-400 text-gray-300"
                    : "hover:text-emerald-600 text-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <DownloadResumeComponent />
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === "dark"
                  ? "text-yellow-400 hover:bg-gray-800"
                  : "text-amber-600 hover:bg-slate-100"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === "dark"
                  ? "text-yellow-400 hover:bg-gray-800"
                  : "text-amber-600 hover:bg-slate-100"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-current"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden px-4 pt-2 pb-4 space-y-2 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(item.ref)}
              className={`block w-full text-left px-2 py-2 rounded-md transition duration-200 ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div
            className={`block w-full text-left px-2 py-2 rounded-md transition duration-200 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <DownloadResumeComponent />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBarComponent;
