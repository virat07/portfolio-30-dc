import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlinePreview, MdOutlineFileDownload } from "react-icons/md";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const DownloadResumeComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-white font-semibold"
        >
          Resume
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
            className="ml-2"
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </motion.button>
        <motion.ul
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
        >
          <motion.li
            variants={itemVariants}
            className="py-2 px-4 hover:bg-gray-100 flex items-center space-x-2"
          >
            <MdOutlinePreview />
            <a
              href="/GuptaBharat,24.pdf"
              target="_blank"
              className="text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              View Resume
            </a>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="py-2 px-4 hover:bg-gray-100 flex items-center space-x-2"
          >
            <MdOutlineFileDownload />
            <a
              href="/GuptaBharat,24.pdf"
              download="Bharat Gupta Resume"
              target="_blank"
              className="text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              Download Bharat's Resume
            </a>
          </motion.li>
        </motion.ul>
      </motion.nav>
    </div>
  );
};

export default DownloadResumeComponent;
