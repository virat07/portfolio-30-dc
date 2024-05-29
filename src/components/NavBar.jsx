import React from "react";
import Blogo from "../assets/BIcon.png";
import DownloadResumeComponent from "./DownloadResume";

const NavBarComponent = ({ scrollToSection, refs }) => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={Blogo} alt="logo" className="h-10" />
      </div>
      <ul className="flex space-x-4">
        <li className="px-4">
          <button
            onClick={() => scrollToSection(refs.typingHomeRef)}
            className="text-white hover:text-gray-400"
          >
            Home
          </button>
        </li>
        <li className="px-4">
          <button
            onClick={() => scrollToSection(refs.aboutUsRef)}
            className="text-white hover:text-gray-400"
          >
            About
          </button>
        </li>
        <li className="px-4">
          <button
            onClick={() => scrollToSection(refs.experienceRef)}
            className="text-white hover:text-gray-400"
          >
            Experience
          </button>
        </li>
        <li className="px-4">
          <button
            onClick={() => scrollToSection(refs.skillsRef)}
            className="text-white hover:text-gray-400"
          >
            Skills
          </button>
        </li>
      </ul>
      <DownloadResumeComponent />
    </nav>
  );
};

export default NavBarComponent;
