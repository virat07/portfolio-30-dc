import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCode, FiTool, FiLayers } from "react-icons/fi";
const skillsData = {
  Languages: ["JavaScript", "Python", "C", "C++", "SQL", "TypeScript", "C#"],
  Tools: [
    "React.js",
    "React-Native",
    "Next.js",
    "Node.js",
    "REST APIs",
    "jQuery",
    "HTML5",
    "CSS3",
    "Express.js",
  ],
  Technologies: [
    "Git",
    "Github",
    "Redux",
    "Scikit-learn",
    "Matplotlib",
    "MongoDB",
    "Firebase",
    "AWS",
    "Bootstrap",
    "Chakra UI",
    "Material UI",
    "Dialog Flow CX",
    "ES6+",
    "CodeCommit",
    "SEO",
    "BigQuery",
    "GCP",
    "CI/CD",
    "Cloud Computing",
    "Kafka",
    "DynamoDB",
    "MySQL",
    "JSON Token",
    "JWT",
  ],
};

const SkillsComponent = () => {
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    setLoading(false); // Simulating loading completion after component mounts
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto"
    >
      <div className="flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto">
        <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
          Skills
        </h3>
        <div className="max-w-full mt-8 md:mt-40 flex flex-wrap gap-8 p-10">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.keys(skillsData).map((category, index) => (
                <motion.div
                  key={index}
                  className="border p-4 rounded-lg bg-gray-100 flex flex-col items-center text-center"
                  variants={itemVariants}
                >
                  {category === "Languages" && (
                    <FiCode className="text-4xl mb-2" />
                  )}
                  {category === "Tools" && <FiTool className="text-4xl mb-2" />}
                  {category === "Technologies" && (
                    <FiLayers className="text-4xl mb-2" />
                  )}
                  <h3 className="flex items-center justify-center text-lg font-medium mb-2">
                    {category}
                  </h3>
                  <ul className="list-disc list-inside text-left">
                    {skillsData[category].map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsComponent;
