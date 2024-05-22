import React, { useState } from "react";

const AccordionItem = ({ title, children, isOpen, toggleAccordion }) => {
  return (
    <div className="border-b">
      <button
        className="w-full text-left px-4 py-2 focus:outline-none focus:bg-gray-200 flex justify-between items-center"
        onClick={toggleAccordion}
        style={{ width: "100%", textAlign: "left" }}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-lg">{isOpen ? "-" : "+"}</span>
      </button>
      <div className={`px-4 py-2 bg-gray-50 ${isOpen ? "block" : "hidden"}`}>
        <p className="text-gray-700">{children}</p>
      </div>
    </div>
  );
};

const AccordionComponent = ({ experiences }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full">
        {experiences &&
          experiences.map((exp, index) => (
            <AccordionItem
              key={index}
              title={exp.company}
              isOpen={openIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
            >
              <p>
                <strong>Position:</strong> {exp.position}
              </p>
              <p>
                <strong>Dates:</strong> {exp.dates}
              </p>
              <p>
                <strong>Location:</strong> {exp.location}
              </p>
              <ul className="list-disc pl-6">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </AccordionItem>
          ))}
      </div>
    </div>
  );
};

export default AccordionComponent;
