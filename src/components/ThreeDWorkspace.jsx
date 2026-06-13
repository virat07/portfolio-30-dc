import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, MeshDistortMaterial, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Import existing portfolio sections
import AboutUs from "./AboutUsComponent";
import WorkExperience from "./ExperienceComponent";
import ProjectsComponent from "./ProjectsComponent";
import SkillsComponent from "./SkillsComponent";
import AgentConsole from "./AgentConsole";
import DriverStandings from "./DriverStandings";
import MediumNotionComponent from "./MediumNotionComponent";

// Starfield particles for 3D atmosphere
function Starfield({ count = 400, color = "#10B981" }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 9 + Math.random() * 9; // radius between 9 and 18

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color={color}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.35}
      />
    </points>
  );
}

// 3D Core - AI Orb (renders morphing liquid sphere & local particles)
function AICore() {
  const orbRef = useRef();

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      orbRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <MeshDistortMaterial
          color="#10B981"
          attach="material"
          distort={0.4}
          speed={2.2}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
      <Starfield count={100} color="#06b6d4" />
    </group>
  );
}

// 3D Core - F1 Telemetry wave
function F1Core() {
  const lineRef1 = useRef();
  const lineRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lineRef1.current) {
      const positions = lineRef1.current.geometry.attributes.position.array;
      for (let i = 0; i < 40; i++) {
        const x = (i - 20) * 0.12;
        positions[i * 3 + 1] = Math.sin(x * 1.5 + t * 4) * 0.35 * Math.cos(x * 0.4);
        positions[i * 3 + 2] = Math.cos(x * 1.2 + t * 2) * 0.15;
      }
      lineRef1.current.geometry.attributes.position.needsUpdate = true;
    }
    if (lineRef2.current) {
      const positions = lineRef2.current.geometry.attributes.position.array;
      for (let i = 0; i < 40; i++) {
        const x = (i - 20) * 0.12;
        positions[i * 3 + 1] = Math.cos(x * 2.0 - t * 3) * 0.25 * Math.sin(x * 0.5);
        positions[i * 3 + 2] = Math.sin(x * 0.7 + t * 1.8) * 0.2;
      }
      lineRef2.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      <line ref={lineRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(40 * 3), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#10B981" linewidth={2.5} />
      </line>
      <line ref={lineRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(40 * 3), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#06b6d4" linewidth={1.5} />
      </line>
    </group>
  );
}

// 3D Core - Stock Bars
function StockCore() {
  const groupRef = useRef();
  const barRef1 = useRef();
  const barRef2 = useRef();
  const barRef3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
    }
    if (barRef1.current) barRef1.current.scale.y = 1.0 + Math.sin(t * 2.5) * 0.4;
    if (barRef2.current) barRef2.current.scale.y = 1.3 + Math.cos(t * 1.8) * 0.3;
    if (barRef3.current) barRef3.current.scale.y = 0.8 + Math.sin(t * 3.2) * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <mesh ref={barRef1} position={[-0.6, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={barRef2} position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={barRef3} position={[0.6, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

// Interactive floating 3D panel label
function PanelLabel({ title, onClick, active, position = [0, 2.7, 0] }) {
  return (
    <group position={position}>
      <Html distanceFactor={8} center pointerEvents="auto">
        <button
          onClick={onClick}
          className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all duration-300 shadow-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            active
              ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110"
              : "bg-slate-900/90 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500 hover:text-emerald-300 hover:border-emerald-400 hover:scale-105"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-slate-950 animate-pulse" : "bg-emerald-400"}`}></span>
          {title}
        </button>
      </Html>
    </group>
  );
}

// Rig to smoothly animate the camera position and OrbitControls target
function CameraRig({ focusSection, controlsRef, isMobile }) {
  useFrame((state) => {
    let targetPos = isMobile ? [0, 2.5, 11.5] : [0, 1.8, 9.5];
    let targetLook = [0, 0.5, 0];

    // Close-up focus distance to ensure high text readability without blur
    const d = isMobile ? 4.6 : 3.4;

    switch (focusSection) {
      case "home":
        targetPos = isMobile ? [0, 2.0, 11.0] : [0, 1.2, 9.0];
        targetLook = [0, 0.5, 0];
        break;
      case "about": {
        // Orthogonal angle ry = Math.PI / 4.5
        const ry = Math.PI / 4.5;
        targetPos = [-5 + d * Math.sin(ry), 0.5, 2 + d * Math.cos(ry)];
        targetLook = [-5, 0.5, 2];
        break;
      }
      case "experience": {
        // Orthogonal angle ry = Math.PI / 12
        const ry = Math.PI / 12;
        targetPos = [-2.5 + d * Math.sin(ry), -0.5, -3 + d * Math.cos(ry)];
        targetLook = [-2.5, -0.5, -3];
        break;
      }
      case "console": {
        // Orthogonal angle ry = -Math.PI / 12
        const ry = -Math.PI / 12;
        targetPos = [2.5 + d * Math.sin(ry), -0.5, -3 + d * Math.cos(ry)];
        targetLook = [2.5, -0.5, -3];
        break;
      }
      case "projects": {
        // Orthogonal angle ry = -Math.PI / 4.5
        const ry = -Math.PI / 4.5;
        targetPos = [5 + d * Math.sin(ry), 0.5, 2 + d * Math.cos(ry)];
        targetLook = [5, 0.5, 2];
        break;
      }
      case "skills": {
        // Orthogonal angle rx = Math.PI / 8
        const rx = Math.PI / 8;
        targetPos = [0, 4.5 + d * Math.sin(rx), -2 + d * Math.cos(rx)];
        targetLook = [0, 4.5, -2];
        break;
      }
      case "blog": {
        // Orthogonal angle rx = -Math.PI / 8
        const rx = -Math.PI / 8;
        targetPos = [0, -4.5 + d * Math.sin(rx), -1 + d * Math.cos(rx)];
        targetLook = [0, -4.5, -1];
        break;
      }
      default:
        targetPos = isMobile ? [0, 2.5, 11.5] : [0, 1.8, 9.5];
        targetLook = [0, 0.5, 0];
        break;
    }

    // Smooth camera interpolation
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetPos[0], 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetPos[1], 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetPos[2], 0.08);

    // Smooth OrbitControls target interpolation
    if (controlsRef.current) {
      controlsRef.current.target.x = THREE.MathUtils.lerp(controlsRef.current.target.x, targetLook[0], 0.08);
      controlsRef.current.target.y = THREE.MathUtils.lerp(controlsRef.current.target.y, targetLook[1], 0.08);
      controlsRef.current.target.z = THREE.MathUtils.lerp(controlsRef.current.target.z, targetLook[2], 0.08);
      controlsRef.current.update();
    }
  });
  return null;
}

export default function ThreeDWorkspace({
  theme = "dark",
  focusSection,
  setFocusSection,
  activeTab,
  setActiveTab
}) {
  const controlsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [dismissTour, setDismissTour] = useState(false);

  // SSR-safe check for window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset focusSection on initial load to "home" overview
  useEffect(() => {
    if (setFocusSection) setFocusSection("home");
  }, [setFocusSection]);

  // Restricting camera angles dynamically on zoom to prevent getting lost
  const getLimits = () => {
    if (!focusSection || focusSection === "home") {
      return {
        minAzimuth: -Infinity,
        maxAzimuth: Infinity,
        minPolar: 0.1,
        maxPolar: Math.PI / 2 - 0.05 // stay above grid floor
      };
    }

    let targetRy = 0;
    let targetRx = 0;

    switch (focusSection) {
      case "about":
        targetRy = Math.PI / 4.5;
        break;
      case "experience":
        targetRy = Math.PI / 12;
        break;
      case "console":
        targetRy = -Math.PI / 12;
        break;
      case "projects":
        targetRy = -Math.PI / 4.5;
        break;
      case "skills":
        targetRx = Math.PI / 8;
        break;
      case "blog":
        targetRx = -Math.PI / 8;
        break;
      default:
        break;
    }

    // Allow a +/- 11 degrees azimuth and polar wiggle for responsive parallax feel
    return {
      minAzimuth: targetRy - 0.2,
      maxAzimuth: targetRy + 0.2,
      minPolar: Math.PI / 2 - targetRx - 0.15,
      maxPolar: Math.PI / 2 - targetRx + 0.15
    };
  };

  const limits = getLimits();
  const distanceFactor = isMobile ? 3.8 : 5.5;

  return (
    <div className={`fixed inset-0 z-40 transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-950" : "bg-slate-50"
    }`}>
      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 2, 11], fov: 55 }}>
        {/* Lights */}
        <ambientLight intensity={theme === "dark" ? 0.7 : 0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />

        {/* Orbit Controls with Dynamic Limits */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          maxDistance={18}
          minDistance={2.5}
          enablePan={false} // Disable panning to keep panels centered
          minAzimuthAngle={limits.minAzimuth}
          maxAzimuthAngle={limits.maxAzimuth}
          minPolarAngle={limits.minPolar}
          maxPolarAngle={limits.maxPolar}
        />

        {/* Camera Lerp Controller */}
        <CameraRig focusSection={focusSection} controlsRef={controlsRef} isMobile={isMobile} />

        {/* Ambient Atmosphere */}
        <Starfield count={300} color={theme === "dark" ? "#10B981" : "#3b82f6"} />
        <gridHelper 
          args={[22, 22, theme === "dark" ? "#10b981" : "#3b82f6", theme === "dark" ? "#1e293b" : "#e2e8f0"]} 
          position={[0, -2.5, 0]} 
        />

        {/* Central Dynamic Holographic Core */}
        {activeTab === "Digital Twin" && <AICore />}
        {activeTab === "F1 Predictor" && <F1Core />}
        {activeTab === "Stock-bot" && <StockCore />}

        {/* 3D PANELS MOUNTED AS FLOATING HTML GLASS PANELS */}

        {/* Panel 1: About Me (Left) */}
        <mesh position={[-5, 0.5, 2]} rotation={[0, Math.PI / 4.5, 0]}>
          <planeGeometry args={[6.0, 5.0]} />
          <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
          
          <PanelLabel 
            title="About Me" 
            active={focusSection === "about"} 
            onClick={() => setFocusSection("about")} 
            position={[0, 2.7, 0]} 
          />

          <Html transform distanceFactor={distanceFactor} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[600px] max-h-[70vh] md:max-h-[550px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300 transform hover:scale-[1.01]">
              <AboutUs profilePicUrl="/027A1497.jpeg" theme={theme} />
            </div>
          </Html>
        </mesh>

        {/* Panel 2: Work Experience (Center-Left) */}
        <mesh position={[-2.5, -0.5, -3]} rotation={[0, Math.PI / 12, 0]}>
          <planeGeometry args={[6.0, 5.0]} />
          <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
          
          <PanelLabel 
            title="Experience" 
            active={focusSection === "experience"} 
            onClick={() => setFocusSection("experience")} 
            position={[0, 2.7, 0]} 
          />

          <Html transform distanceFactor={distanceFactor} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[600px] max-h-[65vh] md:max-h-[500px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300 transform hover:scale-[1.01]">
              <WorkExperience theme={theme} />
            </div>
          </Html>
        </mesh>

        {/* Panel 3: Developer Console Terminal (Center-Right) */}
        <mesh position={[2.5, -0.5, -3]} rotation={[0, -Math.PI / 12, 0]}>
          <planeGeometry args={[6.0, 5.0]} />
          <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
          
          <PanelLabel 
            title="Agent Console" 
            active={focusSection === "console"} 
            onClick={() => setFocusSection("console")} 
            position={[0, 2.7, 0]} 
          />

          <Html transform distanceFactor={distanceFactor} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[600px] max-h-[65vh] md:max-h-[500px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300 transform hover:scale-[1.01]">
              <AgentConsole theme={theme} onF1Complete={() => {}} onTabChange={setActiveTab} />
            </div>
          </Html>
        </mesh>

        {/* Panel 4: Featured Projects (Right) */}
        <mesh position={[5, 0.5, 2]} rotation={[0, -Math.PI / 4.5, 0]}>
          <planeGeometry args={[6.0, 5.0]} />
          <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
          
          <PanelLabel 
            title="Featured Projects" 
            active={focusSection === "projects"} 
            onClick={() => setFocusSection("projects")} 
            position={[0, 2.7, 0]} 
          />

          <Html transform distanceFactor={distanceFactor} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[600px] max-h-[70vh] md:max-h-[550px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300 transform hover:scale-[1.01]">
              <ProjectsComponent theme={theme} />
            </div>
          </Html>
        </mesh>

        {/* Panel 5: Skills Constellation (Top Center) */}
        <mesh position={[0, 4.5, -2]} rotation={[Math.PI / 8, 0, 0]}>
          <planeGeometry args={[6.0, 4.5]} />
          <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
          
          <PanelLabel 
            title="Skills Constellation" 
            active={focusSection === "skills"} 
            onClick={() => setFocusSection("skills")} 
            position={[0, 2.4, 0]} 
          />

          <Html transform distanceFactor={distanceFactor} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[600px] max-h-[60vh] md:max-h-[450px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300 transform hover:scale-[1.01]">
              <SkillsComponent theme={theme} />
            </div>
          </Html>
        </mesh>

        {/* Panel 6: Publications Blog (Bottom Center) */}
        <mesh position={[0, -4.5, -1]} rotation={[-Math.PI / 8, 0, 0]}>
          <planeGeometry args={[8.0, 4.5]} />
          <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
          
          <PanelLabel 
            title="Publications Blog" 
            active={focusSection === "blog"} 
            onClick={() => setFocusSection("blog")} 
            position={[0, 2.4, 0]} 
          />

          <Html transform distanceFactor={isMobile ? 4.5 : 6.2} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[750px] max-h-[60vh] md:max-h-[400px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300 transform hover:scale-[1.01]">
              <MediumNotionComponent theme={theme} />
            </div>
          </Html>
        </mesh>

        {/* Optional Panel 7: Driver Standings (Floats in when F1 predictor runs) */}
        {activeTab === "F1 Predictor" && (
          <mesh position={[5, -2.5, -3.5]} rotation={[-Math.PI / 12, -Math.PI / 6, 0]}>
            <planeGeometry args={[5.0, 4.0]} />
            <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
            <Html transform distanceFactor={distanceFactor} pointerEvents="auto" center>
              <div className="w-[90vw] md:w-[500px] shadow-2xl transition-all duration-300">
                <DriverStandings />
              </div>
            </Html>
          </mesh>
        )}
      </Canvas>

      {/* RECRUITER SPACE TOUR GUIDE ONBOARDING CARD */}
      {!dismissTour && (
        <div className={`absolute top-20 right-6 z-50 w-[310px] max-w-[calc(100vw-3rem)] rounded-2xl border p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md text-white transition-all duration-500 ${
          theme === "dark" 
            ? "border-emerald-500/30 bg-slate-950/92" 
            : "border-slate-200 bg-white/95 text-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-emerald-400 animate-pulse" : "bg-blue-500 animate-pulse"}`}></span>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>Recruiter Tour Guide</h3>
            </div>
            <button 
              onClick={() => setDismissTour(true)}
              className="text-gray-400 hover:text-gray-200 text-xs transition-colors"
            >
              ✕
            </button>
          </div>
          <p className={`text-xs leading-relaxed mb-4 ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
            Welcome to Bharat's interactive 3D control room! Here is how to browse his credentials efficiently:
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2 text-[10px] leading-normal">
              <span className={`font-bold ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>1. Click Tags:</span>
              <span className={theme === "dark" ? "text-gray-400" : "text-slate-500"}>Select any floating label above to automatically align and zoom onto that screen.</span>
            </div>
            <div className="flex items-start gap-2 text-[10px] leading-normal">
              <span className={`font-bold ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>2. 3D Parallax:</span>
              <span className={theme === "dark" ? "text-gray-400" : "text-slate-500"}>Drag the screen when zoomed in to tilt the panel for a satisfying 3D depth effect.</span>
            </div>
            <div className="flex items-start gap-2 text-[10px] leading-normal">
              <span className={`font-bold ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>3. Interactive:</span>
              <span className={theme === "dark" ? "text-gray-400" : "text-slate-500"}>All screens are live. Scroll CV sections or chat with the agent directly in 3D.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFocusSection("about")}
              className={`flex-1 py-1.5 rounded-lg text-center text-xs font-semibold transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.4)]" 
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              Start Tour
            </button>
            <button
              onClick={() => setDismissTour(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 border ${
                theme === "dark"
                  ? "border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900"
                  : "border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              Explore
            </button>
          </div>
        </div>
      )}

      {/* FLOATING 3D HUD CONTROLLER OVERLAY */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border shadow-2xl max-w-[90vw] transition-all duration-300 ${
        theme === "dark"
          ? "border-gray-800 bg-slate-950/85 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "border-slate-200 bg-white/95 text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
      }`}>
        <button
          onClick={() => setFocusSection("home")}
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
            (!focusSection || focusSection === "home") 
              ? theme === "dark"
                ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/40" 
                : "text-blue-600 bg-blue-500/10 border-blue-500/30"
              : "text-gray-400 border-transparent hover:text-current"
          }`}
        >
          Reset Space
        </button>
        <div className="h-4 w-px bg-gray-800 hidden sm:block"></div>
        {[
          { label: "About", id: "about" },
          { label: "Experience", id: "experience" },
          { label: "Console", id: "console" },
          { label: "Projects", id: "projects" },
          { label: "Skills", id: "skills" },
          { label: "Blog", id: "blog" }
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setFocusSection(sec.id)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
              focusSection === sec.id 
                ? theme === "dark"
                  ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/40" 
                  : "text-blue-600 bg-blue-500/10 border-blue-500/30"
                : "text-gray-400 border-transparent hover:text-current"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>
    </div>
  );
}
