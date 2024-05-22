import React from "react";
import { motion } from "framer-motion";

const CardComponent = ({ experience }) => {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden h-fullscreen md:h-50 md:overflow-y-scroll  md:scrollbar-track-gray-400/20 md:scrollbar-thumb-[#F7AB0A]/80 md:scrollbar-thin">
      <motion.img
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full md:rounded-full xl:w-[200px] xl:h-[200px] object-fit object-center"
        // src={urlFor(experience?.companyImage).url()}
      />
      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">{experience?.jobTitle}</h4>

        <p className="font-bold text-2xl mt-1">{experience.company}</p>
        <div className="flex space-x-2 my-2">
          {experience.technologies.map((technology) => {
            return (
              <img
                // src={urlFor(technology.image).url()}
                className="h-10 w-10 rounded-full"
                key={technology._id}
              />
            );
          })}
        </div>
        <p className="uppercase py-5 text-gray-300"></p>
        <ul className=" list-disc space-y-4 ml-5 text-lg h-96 pr-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#F7AB0A]/80">
          {experience.points.map((point, index) => {
            return <li key={index}>{point}</li>;
          })}
        </ul>
      </div>
    </article>
  );
};

export default CardComponent;
