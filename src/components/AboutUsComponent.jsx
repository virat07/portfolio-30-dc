import React from "react";
import { motion } from "framer-motion";

const AboutCard = ({ profilePicUrl, theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`px-6 sm:px-12 py-12 max-w-7xl mx-auto transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Section Heading */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl uppercase tracking-[10px] text-center mb-12 transition-colors duration-300 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        About
      </h2>

      {/* Card */}
      <motion.div
        className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Image */}
        <motion.img
          src={profilePicUrl}
          alt="Bharat Gupta"
          className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover flex-shrink-0"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Text */}
        <div className={`flex-1 space-y-4 transition-colors duration-300 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
          <h3 className={`${isDark ? "text-gray-100" : "text-gray-800"} text-2xl sm:text-3xl`}>
            Here is a{" "}
            <span className="underline decoration-[#F7AB0A]/50">little</span>{" "}
            background
          </h3>
          <p className="text-base sm:text-lg leading-relaxed">
            I’m Bharat Gupta, a frontend-focused software engineer with 6+ years
            of experience crafting high-performance React applications and full-stack
            systems. My expertise spans modern technologies such as React.js, Next.js,
            Tailwind, and Python, backed by a strong foundation in computer science from
            my Master’s at California State University, San Bernardino.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Throughout my career, I’ve led high-impact projects—from building agentic
            development workflows using Figma MCP and Claude that slash component build times,
            to scaling marketplace platforms and optimizing Core Web Vitals to achieve
            dramatic performance gains. I thrive in collaborative, fast-paced environments,
            bridging design and engineering to deliver seamless, scalable, and secure solutions.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Passionate about systems thinking and modern AI tooling (such as Cursor, Claude,
            and Kiro), I build fast and smart without cutting corners. Whether it’s crafting
            reusable component libraries, automating CI/CD pipelines with review agents, or
            optimizing full-stack performance, I bring a problem-solving mindset and a drive
            for innovation.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl glass-panel glow-border-emerald flex flex-col items-center justify-center text-center"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">6+</span>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-mono mt-1 uppercase">Yrs Exp</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl glass-panel glow-border-emerald flex flex-col items-center justify-center text-center"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">25+</span>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-mono mt-1 uppercase">Projects</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl glass-panel glow-border-emerald flex flex-col items-center justify-center text-center"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">1,500+</span>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-mono mt-1 uppercase">Commits</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutCard;
