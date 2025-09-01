import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FiBriefcase } from "react-icons/fi";

function WorkExperience({ theme }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const expRef = collection(db, "experience");
        const snapshot = await getDocs(expRef);

        if (snapshot.empty) {
          console.log("No documents found in 'experience' collection.");
          setLoading(false);
          return;
        }

        const experienceList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedExperiences = experienceList[0].experience.sort((a, b) => {
          const getYear = (dateStr) => {
            if (dateStr.includes("Present")) return 9999;
            const parts = dateStr.split(" - ");
            return parseInt(parts[1]?.split(" ").pop());
          };
          return getYear(b.dates) - getYear(a.dates);
        });

        setExperiences(sortedExperiences);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`flex flex-col items-center px-4 sm:px-6 md:px-12 py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Title */}
      <h3
        className={`uppercase tracking-[12px] text-2xl sm:text-3xl text-center mb-16 transition-colors duration-300 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Work Experience
      </h3>

      {loading ? (
        <p
          className={`mt-10 text-center transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Loading...
        </p>
      ) : (
        <div className="w-full max-w-5xl flex flex-col space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className={`p-6 sm:p-8 rounded-2xl shadow-lg transition-transform duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-700"
              }`}
            >
              <div className="flex items-center mb-3">
                <FiBriefcase
                  className={`text-2xl mr-3 transition-colors duration-300 ${
                    theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                  }`}
                />
                <h4 className="text-lg sm:text-xl font-semibold">
                  {exp.position}
                </h4>
              </div>
              <p className="text-sm sm:text-base mb-1">{exp.company}</p>
              <span className="text-xs sm:text-sm italic text-gray-400 mb-3">
                {exp.dates}
              </span>
              {exp.responsibilities && (
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                  {exp.responsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default WorkExperience;
