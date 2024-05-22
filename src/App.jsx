import React, { useState, useEffect } from "react";
import LoaderFramer from "./components/LoaderFramer";
import NavBarComponent from "./components/NavBar";
import FooterComponent from "./components/FooterComponent";
import TypingHomeComponent from "./components/TypingComponent";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUsComponent";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import WorkExperience from "./components/ExperienceComponent";
import SkillsComponent from "./components/SkillsComponent";

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
      <TypingHomeComponent profilePicUrl={profilePicUrl} />
      <AboutUs profilePicUrl={profilePicUrl} />
      <WorkExperience />
      <SkillsComponent />
      <FooterComponent />
    </Router>
  );
}
