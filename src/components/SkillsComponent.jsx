import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FiCode, 
  FiTool, 
  FiLayers, 
  FiCloud, 
  FiDatabase, 
  FiCheckCircle, 
  FiCpu, 
  FiUsers 
} from "react-icons/fi";

const skillsData = {
  Languages: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "C#"],
  "Frontend Development": [
    "React.js","React-Native","Next.js","AngularJS","jQuery","HTML5","CSS3",
    "TailwindCSS","EmotionCSS","SCSS","Bootstrap","Material UI","Chakra UI","Figma","Zeplin"
  ],
  "Backend Development": ["Node.js","Express.js","REST APIs","Supabase","Firebase"],
  "Cloud & DevOps": [
    "AWS (EC2, Lambda, S3)","GCP (BigQuery, Firestore, Cloud Functions)","Docker",
    "GitLab","GitHub Actions","CodeCommit","Vercel","Netlify","Cloudflare","CI/CD"
  ],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Firestore"],
  "Testing & QA": ["Jest","TestCafe","Regression Testing","SEO Verification","A/B Testing (Optimizely)"],
  "AI / ML / Data": ["Scikit-learn","Matplotlib","Pandas","Hugging Face","OpenAI","ClaudeAI","Cursor","Grok","Windsurf","GitHub Copilot","Dialog Flow CX"],
  "Collaboration & Practices": ["Jira","Confluence","Agile/Scrum","Code Review & Mentorship","System Design & Architecture","Cross-functional Collaboration"],
};

const SkillsComponent = ({ theme = "light" }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  const getIcon = (category) => {
    switch (category) {
      case "Languages": return <FiCode className="text-3xl text-blue-500" />;
      case "Frontend Development": return <FiTool className="text-3xl text-green-500" />;
      case "Backend Development": return <FiLayers className="text-3xl text-indigo-500" />;
      case "Cloud & DevOps": return <FiCloud className="text-3xl text-orange-500" />;
      case "Databases": return <FiDatabase className="text-3xl text-red-500" />;
      case "Testing & QA": return <FiCheckCircle className="text-3xl text-teal-500" />;
      case "AI / ML / Data": return <FiCpu className="text-3xl text-pink-500" />;
      case "Collaboration & Practices": return <FiUsers className="text-3xl text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full flex flex-col items-start"
    >
      <h3 className="uppercase tracking-[8px] text-sm text-gray-400 font-bold mb-8">
        Skills
      </h3>

      {loading ? (
        <p className="text-gray-500 font-mono">
          Loading skills...
        </p>
      ) : (
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {Object.keys(skillsData).map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-5 flex flex-col items-start rounded-xl glass-panel shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-2 mb-3">
                {getIcon(category)}
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">{category}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData[category].map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-900/60 text-emerald-400 border border-emerald-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillsComponent;
