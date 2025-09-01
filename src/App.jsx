import React, { useState, useEffect, useRef } from "react";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import NavBarComponent from "./components/NavBar";
import FooterComponent from "./components/FooterComponent";
import TypingHomeComponent from "./components/TypingComponent";
import AboutUs from "./components/AboutUsComponent";
import WorkExperience from "./components/ExperienceComponent";
import SkillsComponent from "./components/SkillsComponent";
import MediumNotionComponent from "./components/MediumNotionComponent";
import ChatButton from "./components/ChatComponent";

export default function App() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [theme, setTheme] = useState("light"); // "light" or "dark"

  const typingHomeRef = useRef(null);
  const aboutUsRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const mediumNotionRef = useRef(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const forestRef = ref(storage, "027A1497.JPEG");
        const url = await getDownloadURL(forestRef);
        setProfilePicUrl(url);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic();
  }, []);

  const scrollToSection = (element) => {
    if (!element) return;
    const navbarHeight = 64;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }
    >
      {/* Pass theme and toggleTheme to NavBar for a toggle button */}
      <NavBarComponent
        scrollToSection={scrollToSection}
        refs={{
          typingHomeRef,
          aboutUsRef,
          experienceRef,
          skillsRef,
          mediumNotionRef,
        }}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={typingHomeRef}>
          <TypingHomeComponent
            profilePicUrl={profilePicUrl}
            scrollToSection={scrollToSection}
            refs={{
              about: aboutUsRef,
              experience: experienceRef,
              skills: skillsRef,
              blog: mediumNotionRef,
            }}
          />
        </div>
        <div ref={aboutUsRef}>
          <AboutUs profilePicUrl={profilePicUrl} theme={theme} />
        </div>
        <div ref={experienceRef}>
          <WorkExperience theme={theme} />
        </div>
        <div ref={skillsRef}>
          <SkillsComponent theme={theme} />
        </div>
        <div ref={mediumNotionRef}>
          <MediumNotionComponent theme={theme} />
        </div>
      </div>

      <FooterComponent theme={theme} />
      <ChatButton />
    </div>
  );
}
