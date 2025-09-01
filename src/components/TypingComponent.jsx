import React from "react";
import { motion } from "framer-motion";
import BackgroundCircles from "./BackgroundCircle";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const TypingHomeComponent = ({ profilePicUrl, scrollToSection, refs }) => {
  const [text] = useTypewriter({
    words: [
      "Hi, I'm Bharat Gupta",
      "Software Developer",
      "<Frontend_developer.js />",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const buttons = [
    { label: "About", ref: refs.aboutUsRef },
    { label: "Experience", ref: refs.experienceRef },
    { label: "Skills", ref: refs.skillsRef },
    { label: "Blog", ref: refs.mediumNotionRef },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-0">
      <BackgroundCircles />

      {/* Profile Image */}
      <motion.img
        src={profilePicUrl}
        alt="Bharat Gupta"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 120 }}
        className="relative rounded-full h-36 w-36 md:h-48 md:w-48 mx-auto object-cover shadow-xl"
      />

      {/* Text */}
      <div className="z-20 mt-6">
        <h2 className="text-sm md:text-base uppercase text-gray-500 tracking-[10px] mb-2">
          Software Engineer
        </h2>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold px-2 md:px-10">
          <span>{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 flex flex-wrap justify-center gap-4 md:gap-6">
        {buttons.map((btn, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(btn.ref)}
            className="bg-teal-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TypingHomeComponent;
