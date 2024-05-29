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

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <NavBarComponent
        scrollToSection={scrollToSection}
        refs={{
          typingHomeRef,
          aboutUsRef,
          experienceRef,
          skillsRef,
          mediumNotionRef,
        }}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={typingHomeRef}>
          <TypingHomeComponent
            profilePicUrl={profilePicUrl}
            scrollToSection={scrollToSection}
            refs={{ aboutUsRef, experienceRef, skillsRef, mediumNotionRef }}
          />
        </div>
        <div ref={aboutUsRef}>
          <AboutUs profilePicUrl={profilePicUrl} />
        </div>
        <div ref={experienceRef}>
          <WorkExperience />
        </div>
        <div ref={skillsRef}>
          <SkillsComponent />
        </div>
        <div ref={mediumNotionRef}>
          <MediumNotionComponent />
        </div>
      </div>
      <FooterComponent />
      {/* Chat Button positioned in the bottom right */}
      <ChatButton />
    </div>
  );
}
