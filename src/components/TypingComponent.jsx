import React from "react";
import { motion } from "framer-motion";

import BackgroundCircles from "./BackgroundCircle";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
// import Image from "next/image";

const TypingHomeComponent = ({ profilePicUrl }) => {
  const [text, count] = useTypewriter({
    words: [
      `Hi, My name is Bharat Gupta`,
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
        className="relative rounded-full h-32 w-32 mx-auto object-cover "
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-600 tracking-[15px]">
          {/* {pageInfo?.role} */}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span>{text}</span>
          <Cursor cursorColor="#229977" />
        </h1>
        <div className="pt-5">
          <Link href="#about">
            <button className="heroCustomClass"> About </button>
          </Link>
          <Link href="#experience">
            <button className="heroCustomClass"> Experience </button>
          </Link>
          <Link href="#skills">
            <button className="heroCustomClass">Skills</button>
          </Link>
          <Link href="#contact">
            <button className="heroCustomClass">Contact</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TypingHomeComponent;
