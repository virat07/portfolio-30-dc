import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AccordionComponent from "./AccordionComponent";

function WorkExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const expRef = collection(db, "experience");
        const snapshot = await getDocs(expRef);

        const experienceList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Assuming your Firestore structure has an "experience" field in each document
        setExperiences(experienceList[0]["experience"]);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false); // Ensure loading is set to false on error as well
      }
    };
    fetchExperiences();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1.5,
      }}
      className=" flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto"
    >
      <div className=" flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto">
        <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
          Experience
        </h3>
        <div className="max-w-full mt-40 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin">
          {loading ? (
            <p>Loading...</p> // Display a loading indicator while fetching data
          ) : (
            experiences && <AccordionComponent experiences={experiences} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default WorkExperience;