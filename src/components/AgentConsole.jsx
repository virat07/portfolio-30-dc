import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiCpu, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

const AgentConsole = ({ theme = "light", onF1Complete }) => {
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
  const chatContainerRef = useRef(null);

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
    if (onF1Complete) onF1Complete(false);

    simulatedLogs.forEach((log) => {
      setTimeout(() => {
        setF1Logs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    setTimeout(() => {
      setF1Simulating(false);
      setShowF1Results(true);
      if (onF1Complete) onF1Complete(true);
    }, 4800);
  };

  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [f1Logs]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Digital Twin Responses Knowledge Base
  const kbase = {
    summary: {
      keywords: ["summary", "about", "who is", "who are", "background", "bio", "profile", "overview", "describe"],
      response: "Bharat Gupta is a California-based Software Engineer with 6+ years of experience building high-performance React applications and full-stack systems. He specializes in React, Node, Python, and cloud services (AWS/GCP), and focuses on accelerating development using advanced agentic AI workflows."
    },
    experience_rocket: {
      keywords: ["rocket", "current job", "present", "now", "gitlab", "figma", "mcp", "kiro", "claude", "mortgage", "marketplace", "vitals", "lcp", "cls", "security"],
      response: "At Rocket Companies (Jan 2025 – Present) as a Software Engineer, Bharat:\n" +
                "• Built agentic development workflows using Figma MCP, Kiro, and Claude to auto-generate React components & tests — slashing component build times from ~1 day to minutes.\n" +
                "• Engineered GitLab MR review agents and CI/CD pipeline automation generators.\n" +
                "• Scaled marketplace platforms to ~$500K/mo in revenue through SEO and conversion optimizations.\n" +
                "• Improved Core Web Vitals (LCP, CLS), raising performance scores by 300%.\n" +
                "• Cut frontend security vulnerabilities by 30% via automated scanning pipelines."
    },
    experience_gsl: {
      keywords: ["great software", "gsl", "gslab", "india", "pune", "prior", "previous", "before", "2018", "2022", "gs lab"],
      response: "At Great Software Laboratory (GS Lab) in Pune, India (Aug 2018 – Jul 2022) as a Software Engineer, Bharat:\n" +
                "• Led enterprise frontend development in React, establishing reusable component libraries that raised engagement by 25%.\n" +
                "• Developed responsive, ad-integrated web platforms driving a 50% increase in CTR.\n" +
                "• Optimized data pipelines to reduce application response times by 30%."
    },
    education_csusb: {
      keywords: ["csusb", "san bernardino", "masters", "master", "m.s.", "ms", "california state", "chatbot evaluation", "thesis"],
      response: "Bharat completed his M.S. in Computer Science at California State University, San Bernardino (Aug 2022 – May 2024) with a GPA of 3.72/4.0. For his project, he built a Firebase + React chatbot evaluation panel that reduced assessment times by 30%."
    },
    education_chitkara: {
      keywords: ["chitkara", "bachelor", "degree", "b.e.", "be", "university", "college", "india", "himachal"],
      response: "Bharat holds a B.E. in Computer Science from Chitkara University in Himachal Pradesh, India (Aug 2015 – Jul 2019) with a GPA of 3.50/4.0."
    },
    project_f1: {
      keywords: ["f1", "predictions", "formula", "telemetry", "fastf1", "predictions", "leaderboard", "supabase", "scikit", "gradient boosting"],
      response: "His F1 2026 Predictions Dashboard is a full-stack platform built with React 18, Framer Motion, and Supabase real-time channels. It features an automated ML pipeline using Scikit-Learn Gradient Boosting and NLTK VADER sentiment analysis, fetching telemetry data via the FastF1 API, and auto-deploying via GitHub Actions."
    },
    project_signalist: {
      keywords: ["signalist", "market digest", "newsletter", "openai", "tradingview", "charts", "email"],
      response: "Signalist is an automated stock market insights platform built with React and TradingView charts. It utilizes an OpenAI API pipeline to generate daily AI market summaries and automatically delivers them to subscribers via styled HTML newsletters."
    },
    project_stockbot: {
      keywords: ["stock-bot", "stockbot", "screener", "discord", "webhook", "nasdaq", "s&p"],
      response: "Stock-bot is a Python stock screening and alerts engine. It evaluates S&P 500 and Nasdaq 100 tickers across 4 signal modules—technical (RSI, MACD), fundamental, momentum, and sentiment (NLTK VADER). It runs daily via GitHub Actions and sends alerts to Discord."
    },
    skills_languages: {
      keywords: ["languages", "programming language", "python", "javascript", "typescript", "c++", "sql", "code in"],
      response: "Bharat is proficient in JavaScript, TypeScript, Python, SQL, C, and C++."
    },
    skills_frontend: {
      keywords: ["frontend", "frameworks", "react", "next", "react native", "css", "tailwind", "shadcn", "material ui", "chakra"],
      response: "His frontend skills include: React.js, React Native, Next.js, HTML5, CSS3, ES6+, Redux, ShadCN, Chakra UI, Material UI, TailwindCSS, SCSS, Emotion, and design tools like Figma and Zeplin."
    },
    skills_backend: {
      keywords: ["backend", "database", "databases", "cloud", "aws", "gcp", "node", "express", "firebase", "supabase", "mongodb", "mysql", "dynamodb", "ci/cd", "gitlab"],
      response: "His backend, cloud, and database skills cover: Node.js, Express.js, REST APIs, Supabase, Firebase, AWS (EC2, Lambda, S3), GCP (BigQuery, Firestore, Cloud Functions), MongoDB, DynamoDB, MySQL, Snowflake, and CI/CD pipelines."
    },
    skills_ai: {
      keywords: ["ai tools", "ai stack", "copilot", "cursor", "claude", "kiro", "lovable", "windsurf", "hugging face"],
      response: "Bharat leverages cutting-edge AI tools to boost developer velocity, including: Cursor, Claude, Kiro, Lovable, Windsurf, GitHub Copilot, Codex, and Hugging Face."
    },
    contact: {
      keywords: ["contact", "email", "phone", "call", "mail", "hire", "address", "location", "connect", "reach", "resume", "github", "linkedin"],
      response: "You can reach Bharat Gupta via:\n" +
                "• Email: Bharatguptawork07@gmail.com\n" +
                "• Phone: +1 (840) 699-7874\n" +
                "• Location: California, USA\n" +
                "• GitHub: github.com/virat07\n" +
                "• LinkedIn: linkedin.com/in/bharat-gupta-07/"
    }
  };

  const handleSendMessage = (textKey) => {
    let question = "";
    let answer = "";

    if (textKey) {
      if (textKey === "hire") {
        question = "Why should I hire Bharat?";
        answer = "Bharat stands out because of his rare combination of 6+ years of full-stack expertise (React, Node, Python) and cutting-edge work in AI. He has engineered agentic workflows that slash component build times from days to minutes, and scaled platforms to $500K/mo in revenue.";
      } else if (textKey === "rocket") {
        question = "Tell me about his Rocket Companies experience.";
        answer = kbase.experience_rocket.response;
      } else if (textKey === "projects") {
        question = "What are his featured projects?";
        answer = "His main projects are:\n1) F1 Predictions: An ML dashboard using Gradient Boosting & sentiment analysis.\n2) Signalist: A stock market platform with TradingView graphs and OpenAI AI digests.\n3) Stock-bot: A Python stock screener with Discord notifications.";
      } else if (textKey === "skills") {
        question = "What is his core technology stack?";
        answer = "His core stack covers:\n• Languages: JavaScript, TypeScript, Python, SQL, C++\n• Frontend: React, Next.js, Tailwind, React Native\n• Backend & Database: Node.js, AWS, GCP, Supabase, Firebase, MongoDB, MySQL\n• AI Tools: Cursor, Claude, Lovable, Windsurf";
      }
    } else {
      if (!inputText.trim()) return;
      question = inputText;
      setInputText("");

      const qLower = question.toLowerCase();
      let bestCategory = null;
      let maxMatches = 0;

      Object.keys(kbase).forEach((cat) => {
        let matches = 0;
        kbase[cat].keywords.forEach((keyword) => {
          if (qLower.includes(keyword)) {
            matches += keyword.length; 
          }
        });

        if (matches > maxMatches) {
          maxMatches = matches;
          bestCategory = cat;
        }
      });

      if (bestCategory && maxMatches > 2) {
        answer = kbase[bestCategory].response;
      } else {
        // Fallback checks
        if (qLower.includes("hello") || qLower.includes("hi ") || qLower.includes("hey")) {
          answer = "Hello! I am Bharat's Digital Twin Agent. Ask me anything about his work experience (Rocket Companies, GS Lab), education (CSUSB), projects (F1 Dashboard, Signalist), skills, or contact info!";
        } else if (qLower.includes("gpa") || qLower.includes("grades")) {
          answer = "Bharat maintained stellar grades: 3.72/4.0 GPA for his Master's in Computer Science at CSUSB, and 3.50/4.0 GPA for his Bachelor's at Chitkara University.";
        } else if (qLower.includes("location") || qLower.includes("live") || qLower.includes("where")) {
          answer = "Bharat is currently based in California, USA.";
        } else {
          answer = "I'm trained on Bharat's resume details. Ask me about his projects (F1 Predictor, Signalist, Stock-bot), skills (React, Node, Python, AWS), education (CSUSB Master's), or work experience (Rocket Companies, GS Lab)!";
        }
      }
    }

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    }, 800);
  };

  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden glass-panel border transition-all duration-300 ${
      theme === "dark" ? "border-gray-800 text-gray-200" : "border-slate-200 text-slate-850"
    }`}>
      {/* Console Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950 border-gray-800" : "bg-slate-100 border-slate-200"
      }`}>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className={`text-xs font-mono pl-2 transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-slate-500"
          }`}>Bharat-AI-Console</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              theme === "dark" ? "bg-emerald-400" : "bg-emerald-500"
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              theme === "dark" ? "bg-emerald-500" : "bg-emerald-600"
            }`}></span>
          </span>
          <span className={`text-xs font-mono transition-colors duration-300 ${
            theme === "dark" ? "text-emerald-400" : "text-emerald-600"
          }`}>Agent Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900 border-gray-800" : "bg-slate-50 border-slate-200"
      }`}>
        {[
          { id: "Digital Twin", icon: <FiMessageSquare /> },
          { id: "F1 Predictor", icon: <FiPlay /> },
          { id: "Stock-bot", icon: <FiTrendingUp /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 font-mono text-sm border-r transition-colors duration-200 ${
              theme === "dark" ? "border-gray-800" : "border-slate-200"
            } ${
              activeTab === tab.id
                ? theme === "dark"
                  ? "bg-slate-950 text-emerald-400 border-t-2 border-t-emerald-500"
                  : "bg-[#fdfbf7] text-emerald-600 border-t-2 border-t-emerald-500 font-semibold"
                : theme === "dark"
                  ? "text-gray-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-855"
            }`}
          >
            {tab.icon}
            <span>{tab.id}</span>
          </button>
        ))}
      </div>

      {/* Console Body */}
      <div className={`p-5 h-[380px] flex flex-col font-mono transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-950" : "bg-[#fdfbf7]"
      }`}>
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
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed border transition-colors duration-300 ${
                      msg.sender === "user"
                        ? theme === "dark"
                          ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/30"
                          : "bg-emerald-50/70 text-emerald-800 border-emerald-500/30"
                        : theme === "dark"
                          ? "bg-slate-800 text-gray-200 border-slate-700/50"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`rounded-xl px-3 py-2 text-sm flex space-x-1 items-center border transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-slate-800 text-gray-400 border-slate-700/50"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className={`py-3 flex flex-wrap gap-2 border-t mt-2 transition-colors duration-300 ${
                theme === "dark" ? "border-gray-800" : "border-slate-200"
              }`}>
                <button
                  onClick={() => handleSendMessage("hire")}
                  className={`text-xs border px-2 py-1.5 rounded-md transition duration-200 ${
                    theme === "dark"
                      ? "bg-slate-900 hover:bg-slate-800 text-emerald-400 border-gray-800"
                      : "bg-white hover:bg-slate-50 text-emerald-600 border-slate-200"
                  }`}
                >
                  &gt; Why hire Bharat?
                </button>
                <button
                  onClick={() => handleSendMessage("rocket")}
                  className={`text-xs border px-2 py-1.5 rounded-md transition duration-200 ${
                    theme === "dark"
                      ? "bg-slate-900 hover:bg-slate-800 text-emerald-400 border-gray-800"
                      : "bg-white hover:bg-slate-50 text-emerald-600 border-slate-200"
                  }`}
                >
                  &gt; Rocket experience?
                </button>
                <button
                  onClick={() => handleSendMessage("projects")}
                  className={`text-xs border px-2 py-1.5 rounded-md transition duration-200 ${
                    theme === "dark"
                      ? "bg-slate-900 hover:bg-slate-800 text-emerald-400 border-gray-800"
                      : "bg-white hover:bg-slate-50 text-emerald-600 border-slate-200"
                  }`}
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
                className={`flex items-center space-x-2 border-t pt-2 transition-colors duration-300 ${
                  theme === "dark" ? "border-gray-800" : "border-slate-200"
                }`}
              >
                <span className="text-emerald-500 font-bold">&gt;</span>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                  className={`flex-1 bg-transparent border-none text-sm focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    theme === "dark" ? "text-white placeholder-gray-600" : "text-slate-800 placeholder-slate-400"
                  }`}
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
                  <FiCpu className="text-4xl text-emerald-500 animate-pulse" />
                  <p className={`text-sm text-center px-6 transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-slate-650"
                  }`}>
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
                    className={`flex-1 border rounded-lg p-3 text-xs overflow-y-auto space-y-1.5 custom-scrollbar transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-slate-950 border-gray-800 text-emerald-450/90"
                        : "bg-slate-100 border-slate-200 text-emerald-800/90"
                    }`}
                  >
                    {f1Logs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                    {f1Simulating && (
                      <div className="animate-pulse text-emerald-600 font-bold">
                        [F1-Agent] Computing predictions...
                      </div>
                    )}
                  </div>

                  {showF1Results && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-3 border rounded-lg p-3 text-xs transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-900 border-gray-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <h4 className={`font-bold mb-2 transition-colors duration-300 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}>Simulated Race Forecast (Next Race)</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className={theme === "dark" ? "text-gray-250" : "text-slate-700"}>1. M. Verstappen (RBR)</span>
                            <span className="font-bold text-emerald-500">72% probability</span>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                            theme === "dark" ? "bg-slate-800" : "bg-slate-200"
                          }`}>
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "72%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className={theme === "dark" ? "text-gray-255" : "text-slate-700"}>2. L. Norris (McLaren)</span>
                            <span className="font-bold text-teal-600">68% probability</span>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                            theme === "dark" ? "bg-slate-800" : "bg-slate-200"
                          }`}>
                            <div className="bg-teal-500 h-full rounded-full" style={{ width: "68%" }}></div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowF1Results(false);
                          setF1Logs([]);
                          if (onF1Complete) onF1Complete(false);
                        }}
                        className={`mt-3 text-xs underline transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-500 hover:text-white" : "text-slate-400 hover:text-slate-800"
                        }`}
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
                <span className={`text-xs font-bold transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>STOCK-BOT MOVEMENT MONITOR</span>
                <span className={`text-[10px] transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-500" : "text-slate-400"
                }`}>Live Scraped CSV Logs</span>
              </div>
              <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className={`w-full text-left text-xs transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400" : "text-slate-650"
                }`}>
                  <thead className={`uppercase text-[10px] border-b transition-colors duration-300 ${
                    theme === "dark" ? "bg-slate-900 text-white border-gray-800" : "bg-slate-100 text-slate-950 border-slate-200"
                  }`}>
                    <tr>
                      <th className="py-2 px-3">Ticker</th>
                      <th className="py-2 px-3">RSI Indicator</th>
                      <th className="py-2 px-3">Sentiment</th>
                      <th className="py-2 px-3">Score</th>
                      <th className="py-2 px-3">Signal</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y transition-colors duration-300 ${
                    theme === "dark" ? "divide-gray-900" : "divide-slate-200"
                  }`}>
                    {[
                      { ticker: "AAPL", rsi: "48 (Oversold)", sentiment: "0.85 (Bullish)", score: "88/100", signal: "STRONG BUY", type: "strong-buy" },
                      { ticker: "NVDA", rsi: "62 (Neutral)", sentiment: "0.78 (Bullish)", score: "84/100", signal: "BUY", type: "buy" },
                      { ticker: "TSLA", rsi: "71 (Overbought)", sentiment: "0.52 (Neutral)", score: "62/100", signal: "HOLD", type: "hold" },
                      { ticker: "MSFT", rsi: "55 (Neutral)", sentiment: "0.81 (Bullish)", score: "85/100", signal: "BUY", type: "buy" },
                    ].map((row, i) => {
                      let colorClass = "";
                      if (row.type === "strong-buy") {
                        colorClass = theme === "dark" 
                          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" 
                          : "text-emerald-700 bg-emerald-50 border-emerald-500/20";
                      } else if (row.type === "buy") {
                        colorClass = theme === "dark"
                          ? "text-teal-400 bg-teal-500/10 border-teal-500/30"
                          : "text-teal-750 bg-teal-50 border-teal-500/20";
                      } else {
                        colorClass = theme === "dark"
                          ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
                          : "text-amber-700 bg-amber-50 border-amber-500/20";
                      }
                      return (
                        <tr key={i} className={`transition-colors duration-150 ${
                          theme === "dark" ? "hover:bg-slate-900/50" : "hover:bg-slate-100/50"
                        }`}>
                          <td className={`py-2.5 px-3 font-bold transition-colors duration-300 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}>{row.ticker}</td>
                          <td className="py-2.5 px-3">{row.rsi}</td>
                          <td className="py-2.5 px-3">{row.sentiment}</td>
                          <td className="py-2.5 px-3 font-mono text-emerald-500 font-semibold">{row.score}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass}`}>
                              {row.signal}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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
