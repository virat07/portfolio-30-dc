import React from "react";
import Blogo from "../assets/BIcon.png";
import DownloadResumeComponent from "./DownloadResume";

const NavBarComponent = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={Blogo} alt="logo" className="h-10" />
      </div>
      <ul className="flex space-x-4">
        <li className="px-4">
          <a href="/" className="text-white hover:text-gray-400">
            Home
          </a>
        </li>
        <li className="px-4">
          <a href="/about" className="text-white hover:text-gray-400">
            About
          </a>
        </li>
        <li className="px-4">
          <a href="/experience" className="text-white hover:text-gray-400">
            Experience
          </a>
        </li>
        <li className="px-4">
          <a href="/skills" className="text-white hover:text-gray-400">
            Skills
          </a>
        </li>
      </ul>
      <DownloadResumeComponent />
    </nav>
  );
};

export default NavBarComponent;
