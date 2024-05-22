import React from "react";
import { motion } from "framer-motion";

const HomeComponent = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg p-8 shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Welcome to My Website
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore and discover what I have to offer.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomeComponent;
