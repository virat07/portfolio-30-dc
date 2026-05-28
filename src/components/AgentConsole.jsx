import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiCpu, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

const AgentConsole = ({ theme = "light" }) => {
  const [activeTab, setActiveTab] = useState("Digital Twin");
  
  // F1 Simulator States
  const [f1Simulating, setF1Simulating] = useState(false);
  const [f1Logs, setF1Logs] = useState([]);
  const [showF1Results, setShowF1Results] = useState(false);
  const logTerminalRef = useRef(null);

  // Digital Twin States
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Bharat's Digital Twin Agent. Ask me anything about his projects, skills, or professional experience, or select one of the quick commands below.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // F1 Logs Simulation
  const simulatedLogs = [
    { text: "[F1-Agent] Initializing FastF1 telemetry client...", delay: 600 },
    { text: "[F1-Agent] Fetching historical Monaco GP race datasets...", delay: 1200 },
    { text: "[F1-Agent] Scraping live news feeds and tweets for sentiment metrics...", delay: 1800 },
    { text: "[F1-Agent] Applying NLTK VADER sentiment classifier (Score: +0.68)...", delay: 2400 },
    { text: "[F1-Agent] Computing lap times & tire degradation models...", delay: 3000 },
    { text: "[F1-Agent] Training Gradient Boosting model on telemetry...", delay: 3600 },
    { text: "[F1-Agent] Prediction complete! Model accuracy score: 91.4%.", delay: 4200 },
  ];

  const runF1Simulation = () => {
    if (f1Simulating) return;
    setF1Simulating(true);
    setF1Logs([]);
    setShowF1Results(false);

    simulatedLogs.forEach((log) => {
      setTimeout(() => {
        setF1Logs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    setTimeout(() => {
      setF1Simulating(false);
      setShowF1Results(true);
    }, 4800);
  };

  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [f1Logs]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Digital Twin Responses
  const predefinedAnswers = {
    hire: "Bharat stands out because of his rare combination of 6+ years of full-stack expertise (React, Node, Python) and cutting-edge work in AI. He has engineered agentic workflows that slash component build times from days to minutes, and scaled platforms to $500K/mo in revenue.",
    rocket: "At Rocket Companies, Bharat leads engineering initiatives building developer agents (Figma MCP + Claude), MR code review automations, and CI/CD pipelines. He also scaled their non-mortgage marketplace platforms and improved performance scores by 300%.",
    projects: "His main projects are: 1) F1 Predictions: An ML dashboard using Gradient Boosting & sentiment analysis. 2) Signalist: A stock market dashboard with TradingView graphs. 3) Stock-bot: A Python stock screener screening tickers across 4 signal modules.",
    skills: "His core stack covers Languages (JavaScript, TypeScript, Python, SQL, C++), Frontend (React.js, React Native, Next.js, Tailwind, Chakra), Backend (Node.js, Express, REST APIs, Firebase), and AI Tools (Cursor, Claude, Kiro, Lovable).",
  };

  const handleSendMessage = (textKey) => {
    let question = "";
    let answer = "";

    if (textKey === "hire") {
      question = "Why should I hire Bharat?";
      answer = predefinedAnswers.hire;
    } else if (textKey === "rocket") {
      question = "Tell me about his Rocket Companies experience.";
      answer = predefinedAnswers.rocket;
    } else if (textKey === "projects") {
      question = "What are his featured projects?";
      answer = predefinedAnswers.projects;
    } else if (textKey === "skills") {
      question = "What is his core technology stack?";
      answer = predefinedAnswers.skills;
    } else {
      if (!inputText.trim()) return;
      question = inputText;
      setInputText("");
      // General NLP matcher
      const qLower = question.toLowerCase();
      if (qLower.includes("hire") || qLower.includes("why")) answer = predefinedAnswers.hire;
      else if (qLower.includes("rocket") || qLower.includes("experience") || qLower.includes("work")) answer = predefinedAnswers.rocket;
      else if (qLower.includes("project") || qLower.includes("portfolio")) answer = predefinedAnswers.projects;
      else if (qLower.includes("skill") || qLower.includes("language") || qLower.includes("tech") || qLower.includes("stack")) answer = predefinedAnswers.skills;
      else answer = "I'm trained on Bharat's resume details. Ask me about his projects (F1 Predictor, Signalist), skills (React, Node, Python), or work experience (Rocket Companies, Great Software Laboratory)!";
    }

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    }, 800);
  };

  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden glass-panel border border-gray-800 transition-colors duration-300 ${
      theme === "dark" ? "text-gray-200" : "text-gray-700 bg-slate-900/90"
    }`}>
      {/* Console Header */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs font-mono text-gray-400 pl-2">Bharat-AI-Console</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-400">Agent Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 flex border-b border-gray-800">
        {[
          { id: "Digital Twin", icon: <FiMessageSquare /> },
          { id: "F1 Predictor", icon: <FiPlay /> },
          { id: "Stock-bot", icon: <FiTrendingUp /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 font-mono text-sm border-r border-gray-800 transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-slate-950 text-emerald-400 border-t-2 border-t-emerald-500"
                : "text-gray-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {tab.icon}
            <span>{tab.id}</span>
          </button>
        ))}
      </div>

      {/* Console Body */}
      <div className="p-5 bg-slate-950 h-[380px] flex flex-col font-mono">
        <AnimatePresence mode="wait">
          {activeTab === "Digital Twin" && (
            <motion.div
              key="twin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-800 text-gray-200 border border-slate-700/50"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-gray-400 rounded-xl px-3 py-2 text-sm border border-slate-700/50 flex space-x-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="py-3 flex flex-wrap gap-2 border-t border-gray-800 mt-2">
                <button
                  onClick={() => handleSendMessage("hire")}
                  className="bg-slate-900 hover:bg-slate-800 text-xs text-emerald-400 border border-gray-800 px-2 py-1.5 rounded-md transition duration-200"
                >
                  &gt; Why hire Bharat?
                </button>
                <button
                  onClick={() => handleSendMessage("rocket")}
                  className="bg-slate-900 hover:bg-slate-800 text-xs text-emerald-400 border border-gray-800 px-2 py-1.5 rounded-md transition duration-200"
                >
                  &gt; Rocket experience?
                </button>
                <button
                  onClick={() => handleSendMessage("projects")}
                  className="bg-slate-900 hover:bg-slate-800 text-xs text-emerald-400 border border-gray-800 px-2 py-1.5 rounded-md transition duration-200"
                >
                  &gt; Project details?
                </button>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2 border-t border-gray-800 pt-2"
              >
                <span className="text-emerald-500 font-bold">&gt;</span>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder-gray-600"
                />
              </form>
            </motion.div>
          )}

          {activeTab === "F1 Predictor" && (
            <motion.div
              key="f1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              {/* Simulator Run Button */}
              {!f1Simulating && !showF1Results && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <FiCpu className="text-4xl text-emerald-400 animate-pulse" />
                  <p className="text-sm text-gray-400 text-center px-6">
                    Run the Gradient Boosting Prediction pipeline to analyze driver telemetry.
                  </p>
                  <button
                    onClick={runF1Simulation}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md shadow-lg flex items-center space-x-2 transition duration-200"
                  >
                    <FiPlay />
                    <span>RUN_PREDICTOR_AGENT</span>
                  </button>
                </div>
              )}

              {/* Simulation Logging logs */}
              {(f1Simulating || showF1Results) && (
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div
                    ref={logTerminalRef}
                    className="flex-1 bg-slate-950 border border-gray-800 rounded-lg p-3 text-xs overflow-y-auto space-y-1.5 custom-scrollbar text-emerald-400/90"
                  >
                    {f1Logs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                    {f1Simulating && (
                      <div className="animate-pulse text-emerald-500">
                        [F1-Agent] Computing predictions...
                      </div>
                    )}
                  </div>

                  {showF1Results && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 bg-slate-900 border border-gray-800 rounded-lg p-3 text-xs"
                    >
                      <h4 className="text-white font-bold mb-2">Simulated Race Forecast (Next Race)</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>1. M. Verstappen (RBR)</span>
                            <span className="font-bold text-emerald-400">72% probability</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "72%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>2. L. Norris (McLaren)</span>
                            <span className="font-bold text-teal-400">68% probability</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-teal-500 h-full rounded-full" style={{ width: "68%" }}></div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowF1Results(false);
                          setF1Logs([]);
                        }}
                        className="mt-3 text-xs text-gray-500 hover:text-white underline"
                      >
                        Reset Simulator
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "Stock-bot" && (
            <motion.div
              key="stock"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-white text-xs font-bold">STOCK-BOT MOVEMENT MONITOR</span>
                <span className="text-[10px] text-gray-500">Live Scraped CSV Logs</span>
              </div>
              <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs text-gray-400">
                  <thead className="bg-slate-900 text-white uppercase text-[10px] border-b border-gray-800">
                    <tr>
                      <th className="py-2 px-3">Ticker</th>
                      <th className="py-2 px-3">RSI Indicator</th>
                      <th className="py-2 px-3">Sentiment</th>
                      <th className="py-2 px-3">Score</th>
                      <th className="py-2 px-3">Signal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900">
                    {[
                      { ticker: "AAPL", rsi: "48 (Oversold)", sentiment: "0.85 (Bullish)", score: "88/100", signal: "STRONG BUY", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
                      { ticker: "NVDA", rsi: "62 (Neutral)", sentiment: "0.78 (Bullish)", score: "84/100", signal: "BUY", color: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
                      { ticker: "TSLA", rsi: "71 (Overbought)", sentiment: "0.52 (Neutral)", score: "62/100", signal: "HOLD", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" },
                      { ticker: "MSFT", rsi: "55 (Neutral)", sentiment: "0.81 (Bullish)", score: "85/100", signal: "BUY", color: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-900/50">
                        <td className="py-2.5 px-3 font-bold text-white">{row.ticker}</td>
                        <td className="py-2.5 px-3">{row.rsi}</td>
                        <td className="py-2.5 px-3">{row.sentiment}</td>
                        <td className="py-2.5 px-3 font-mono text-emerald-400">{row.score}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${row.color}`}>
                            {row.signal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgentConsole;
