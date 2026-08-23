import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const AboutCard = ({ profilePicUrl, theme = "light" }) => {
  const [text] = useTypewriter({
    words: [
      "Software Engineer",
      "AI Workflow Engineer",
      "Full-Stack Developer",
      "<Frontend_developer.js />",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="w-full flex flex-col items-start pt-4">
      {/* Mockup Header: BHARAT GUPTA - SOFTWARE ENGINEER */}
      <div className="w-full flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-wide uppercase transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            Bharat Gupta
          </h1>
          <h2 className="text-xs sm:text-sm font-bold tracking-[6px] text-emerald-400 uppercase mt-2 h-5 flex items-center">
            <span>{text}</span>
            <Cursor cursorColor="#10B981" />
          </h2>
        </div>
        
        {/* Social Icons */}
        <div className={`flex space-x-3 text-xl pt-2 transition-colors duration-300 ${
          theme === "dark" ? "text-gray-400" : "text-slate-500"
        }`}>
          <a
            href="https://github.com/virat07"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition duration-200 ${
              theme === "dark" ? "hover:text-white" : "hover:text-slate-900"
            }`}
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/bharat-gupta-07"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition duration-200 ${
              theme === "dark" ? "hover:text-white" : "hover:text-slate-900"
            }`}
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Recruiter CV Track Content Wrapper Card */}
      <motion.div
        className="w-full p-6 sm:p-8 rounded-2xl glass-panel glow-border-emerald flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        {/* Profile Pic */}
        <motion.img
          src={profilePicUrl}
          alt="Bharat Gupta"
          className={`w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover flex-shrink-0 transition-colors duration-300 border ${
            theme === "dark" ? "border-slate-700/50" : "border-slate-200"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Text Details & Stats */}
        <div className={`flex-1 space-y-4 text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
          theme === "dark" ? "text-gray-300" : "text-slate-600"
        }`}>
          <p>
            I’m Bharat Gupta — I don’t just write code, I make engineering teams faster.
            Over 6+ years I’ve built high-performance React applications and full-stack
            systems, sharpened by a Master’s in Computer Science from California State
            University, San Bernardino.
          </p>
          <p>
            I design AI-powered workflows that turn a day of component-building into
            minutes, and I’ve scaled marketplace platforms into serious revenue drivers
            through SEO, A/B testing, and conversion strategy that consistently moves the
            needle. When a workflow is slow or a platform isn’t converting, I find the fix.
          </p>

          {/* Stats Grid */}
          <div className={`grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t transition-colors duration-300 ${
            theme === "dark" ? "border-slate-800" : "border-slate-200"
          }`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center text-center transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-slate-950/50 border border-slate-800/80"
                  : "bg-slate-50 border border-slate-200/80"
              }`}
            >
              <span className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-950"
              }`}>6+</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono mt-0.5 uppercase tracking-wider">Yrs Exp</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center text-center transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-slate-950/50 border border-slate-800/80"
                  : "bg-slate-50 border border-slate-200/80"
              }`}
            >
              <span className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-950"
              }`}>25+</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono mt-0.5 uppercase tracking-wider">Projects</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center text-center transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-slate-950/50 border border-slate-800/80"
                  : "bg-slate-50 border border-slate-200/80"
              }`}
            >
              <span className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-950"
              }`}>1,500+</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono mt-0.5 uppercase tracking-wider">Commits</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutCard;
