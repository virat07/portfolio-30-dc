import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCompass } from "react-icons/fi";

const projectsData = [
  {
    title: "F1 2026 Predictions Dashboard",
    date: "Apr 2026 - Present",
    description: "Full-stack forecasting dashboard with React 18, Framer Motion, and Supabase real-time channels. Powered by an automated ML pipeline (Scikit-Learn, NLTK VADER sentiment analysis) utilizing the FastF1 telemetry API.",
    tech: ["React 18", "Supabase", "Scikit-Learn", "FastF1 API", "Python"],
    github: "https://github.com/virat07/f1-2026-predictions",
    live: "https://f1-2026-predictions.vercel.app/",
  },
  {
    title: "Signalist — Market Insights",
    date: "Dec 2025 - Jan 2026",
    description: "Real-time stock market insights platform built with React and interactive TradingView charts. Features an event-driven AI news summarizer pipeline (OpenAI API) that sends formatted market digests to subscribers.",
    tech: ["React.js", "OpenAI API", "TradingView", "Tailwind", "Node.js"],
    github: "https://github.com/virat07/signalist_stock_market",
    live: "https://your-daily-stock-market-newsletter.vercel.app/",
  },
  {
    title: "Stock-bot Screener",
    date: "May 2026",
    description: "Automated Python stock screener scoring S&P 500 & Nasdaq 100 tickers across 4 signal modules—technical (RSI, MACD), fundamental (P/E), momentum, and sentiment. Deployed via GitHub Actions with Discord notifications.",
    tech: ["Python", "NLTK VADER", "GitHub Actions", "Discord Webhooks"],
    github: "https://github.com/virat07/stock-bot",
  }
];

const ProjectsComponent = ({ theme = "dark" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full flex flex-col items-start"
    >
      <h3 className={`uppercase tracking-[8px] text-sm font-bold mb-8 transition-colors duration-300 ${
        theme === "dark" ? "text-gray-400" : "text-slate-500"
      }`}>
        Featured Projects
      </h3>

      <div className="w-full space-y-6">
        {projectsData.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-6 rounded-2xl glass-panel glow-border-emerald flex flex-col space-y-4 hover:scale-[1.01] transition-transform duration-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <h4 className={`text-base sm:text-lg font-bold tracking-wide transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                {project.title}
              </h4>
              <span className="text-xs font-mono text-emerald-500 font-semibold">{project.date}</span>
            </div>

            {/* Description */}
            <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
              theme === "dark" ? "text-gray-400" : "text-slate-600"
            }`}>
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-slate-900/60 text-emerald-400 border-emerald-500/20"
                      : "bg-slate-100 text-emerald-700 border-emerald-500/30"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions Links */}
            <div className={`flex space-x-4 pt-2 text-xs border-t transition-colors duration-300 ${
              theme === "dark" ? "border-slate-900/40" : "border-slate-200"
            }`}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-1.5 transition duration-200 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <FiGithub />
                <span>Source Code</span>
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-1.5 transition duration-200 font-semibold ${
                    theme === "dark" ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
                  }`}
                >
                  <FiExternalLink />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsComponent;
