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
            I’m Bharat Gupta, a frontend-focused software engineer with 8 years
            of experience building impactful products for startups, mid-scale
            companies, and enterprise teams. My expertise spans modern
            technologies such as React.js, Next.js, Tailwind, and Python, backed
            by a strong foundation in computer science from my Master’s at
            California State University, San Bernardino.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Throughout my career, I’ve led high-impact projects—from improving
            user engagement by 30% through innovative UI features to enhancing
            forecasting accuracy with predictive analytics models. I thrive in
            collaborative, fast-paced environments, working closely with
            designers, product managers, and engineers to deliver seamless,
            scalable, and secure solutions.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Passionate about continuous learning, I actively explore emerging
            tools and technologies, from AI-powered development assistants to
            cloud computing solutions. Whether it’s crafting intuitive user
            experiences, optimizing performance, or mentoring teams, I bring a
            problem-solving mindset and a drive for innovation to every project
            I take on.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutCard;
