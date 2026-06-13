import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBarComponent from "./components/NavBar";
import FooterComponent from "./components/FooterComponent";
import AboutUs from "./components/AboutUsComponent";
import WorkExperience from "./components/ExperienceComponent";
import ProjectsComponent from "./components/ProjectsComponent";
import SkillsComponent from "./components/SkillsComponent";
import MediumNotionComponent from "./components/MediumNotionComponent";
import ChatButton from "./components/ChatComponent";
import AgentConsole from "./components/AgentConsole";
import DriverStandings from "./components/DriverStandings";
import ThreeDCanvas from "./components/ThreeDCanvas";
import ThreeDWorkspace from "./components/ThreeDWorkspace";

export default function App() {
  const profilePicUrl = "/027A1497.jpeg";
  const [theme, setTheme] = useState("dark");
  const [f1Complete, setF1Complete] = useState(false);
  const [activeTab, setActiveTab] = useState("Digital Twin");
  const [viewMode, setViewMode] = useState("2d"); // "2d" or "3d"
  const [focusSection, setFocusSection] = useState(null);

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      if (theme === "light") {
        const img = new Image();
        img.src = "/BIcon.png";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          
          try {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
              // Invert red, green, blue channels, keep alpha channel
              data[i] = 255 - data[i];
              data[i + 1] = 255 - data[i + 1];
              data[i + 2] = 255 - data[i + 2];
            }
            ctx.putImageData(imgData, 0, 0);
            favicon.setAttribute("href", canvas.toDataURL());
          } catch (e) {
            console.error("Failed to invert favicon: ", e);
          }
        };
      } else {
        favicon.setAttribute("href", "/BIcon.png");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  };

  const typingHomeRef = useRef(null);
  const aboutUsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const mediumNotionRef = useRef(null);

  const scrollToSection = (element) => {
    if (!element) return;
    const navbarHeight = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      <NavBarComponent
        scrollToSection={scrollToSection}
        refs={{
          typingHomeRef,
          aboutUsRef,
          experienceRef,
          projectsRef,
          skillsRef,
          mediumNotionRef,
        }}
        theme={theme}
        toggleTheme={toggleTheme}
        viewMode={viewMode}
        setViewMode={setViewMode}
        focusSection={focusSection}
        setFocusSection={setFocusSection}
      />

      {/* Main Content Dashboard */}
      {viewMode === "2d" ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Two-Column Split Console Grid Layout */}
          <div ref={typingHomeRef} className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left Column: CV Track */}
            <div className="lg:col-span-7 flex flex-col space-y-12">
              <div ref={aboutUsRef}>
                <AboutUs profilePicUrl={profilePicUrl} theme={theme} />
              </div>
              <div ref={experienceRef}>
                <WorkExperience theme={theme} />
              </div>
              <div ref={projectsRef}>
                <ProjectsComponent theme={theme} />
              </div>
              <div ref={skillsRef}>
                <SkillsComponent theme={theme} />
              </div>
            </div>

            {/* Right Column: AI Console Simulator */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 mt-12 lg:mt-0">
              <div className="hidden lg:block mb-6">
                <ThreeDCanvas activeTab={activeTab} theme={theme} />
              </div>
              <AgentConsole theme={theme} onF1Complete={setF1Complete} onTabChange={setActiveTab} />
              <AnimatePresence>
                {f1Complete && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <DriverStandings />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Publications / Blog Section */}
          <div ref={mediumNotionRef} className="mt-20">
            <MediumNotionComponent theme={theme} />
          </div>
        </div>
      ) : (
        <ThreeDWorkspace
          theme={theme}
          focusSection={focusSection}
          setFocusSection={setFocusSection}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {viewMode === "2d" && <FooterComponent theme={theme} />}
      {viewMode === "2d" && <ChatButton />}
    </div>
  );
}
