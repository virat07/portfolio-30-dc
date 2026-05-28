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
        <div className="w-full max-w-4xl relative border-l-2 border-slate-800 ml-4 pl-6 md:pl-8 space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline Indicator Node */}
              <span className="absolute -left-[35px] md:-left-[43px] top-1.5 flex h-4.5 w-4.5 rounded-full border-4 border-slate-950 bg-emerald-500 ring-4 ring-emerald-500/20"></span>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    {exp.position}
                  </h4>
                  <span className="text-xs sm:text-sm font-mono text-emerald-400 sm:text-right">
                    {exp.dates}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm font-semibold text-gray-300">
                  {exp.company} &bull; <span className="text-xs text-gray-500 italic">{exp.location || "United States"}</span>
                </p>

                {exp.responsibilities && (
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-400">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i} className="leading-relaxed">
                        {res}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default WorkExperience;
