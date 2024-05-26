import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import NavBarComponent from "./components/NavBar";
import FooterComponent from "./components/FooterComponent";
import TypingHomeComponent from "./components/TypingComponent";
import AboutUs from "./components/AboutUsComponent";
import WorkExperience from "./components/ExperienceComponent";
import SkillsComponent from "./components/SkillsComponent";
import MediumNotionComponent from "./components/MediumNotionComponent";
import ChatButton from "./components/ChatComponent"; // Import the ChatButton component

export default function App() {
  const [profilePicUrl, setProfilePicUrl] = useState("");

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

  return (
    <Router>
      <NavBarComponent />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TypingHomeComponent profilePicUrl={profilePicUrl} />
        <AboutUs profilePicUrl={profilePicUrl} />
        <WorkExperience />
        <SkillsComponent />
        <MediumNotionComponent />
      </div>

      <FooterComponent />

      {/* Chat Button positioned in the bottom right */}
      <ChatButton />
    </Router>
  );
}
