import React from "react";
import { motion } from "framer-motion";
import BackgroundCircles from "./BackgroundCircle";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const TypingHomeComponent = ({ profilePicUrl, scrollToSection, refs }) => {
  const [text] = useTypewriter({
    words: [
      "Hi, My name is Bharat Gupta",
      "Software Developer",
      "<Frontend_developer.js/>",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <img
        src={profilePicUrl}
        alt="dev"
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-600 tracking-[15px]">
          {/* {pageInfo?.role} */}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span>{text}</span>
          <Cursor cursorColor="#229977" />
        </h1>
        <div className="pt-5 flex justify-center space-x-4">
          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none active:scale-95"
            onClick={() => scrollToSection(refs.aboutUsRef)}
          >
            About
          </button>
          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none active:scale-95"
            onClick={() => scrollToSection(refs.experienceRef)}
          >
            Experience
          </button>
          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none active:scale-95"
            onClick={() => scrollToSection(refs.skillsRef)}
          >
            Skills
          </button>
          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none active:scale-95"
            onClick={() => scrollToSection(refs.mediumNotionRef)}
          >
            Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingHomeComponent;
