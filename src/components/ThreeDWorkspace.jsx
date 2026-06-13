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

// Cosmic Starfield particles for background
function Starfield({ count = 450, color = "#10B981" }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 10 + Math.random() * 12; // radius between 10 and 22

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.008;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.002;
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
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </points>
  );
}

// Procedural Dotted Globe representing Earth (Holographic Global)
function DottedGlobe({ theme }) {
  const globeRef = useRef();

  const positions = useMemo(() => {
    const count = 850;
    const arr = new Float32Array(count * 3);
    const radius = 1.95;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rAtY = Math.sqrt(1 - y * y);
      const theta = 1.618033988749 * 2 * Math.PI * i; // golden angle
      arr[i * 3] = Math.cos(theta) * rAtY * radius;
      arr[i * 3 + 1] = y * radius;
      arr[i * 3 + 2] = Math.sin(theta) * rAtY * radius;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group>
      <points ref={globeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={theme === "dark" ? "#10b981" : "#3b82f6"}
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
        />
      </points>
      {/* Subtle morphing liquid core representing Earth's magma/core energy */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color={theme === "dark" ? "#06b6d4" : "#6366f1"}
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

// Glowing global connection telemetry lines wrapping the globe
function ConnectionArcs({ theme }) {
  const groupRef = useRef();

  const arcs = useMemo(() => {
    const list = [];
    const radius = 1.95;
    for (let j = 0; j < 8; j++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos((Math.random() * 2) - 1);
      const p1 = new THREE.Vector3(
        radius * Math.sin(phi1) * Math.cos(theta1),
        radius * Math.sin(phi1) * Math.sin(theta1),
        radius * Math.cos(phi1)
      );

      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.acos((Math.random() * 2) - 1);
      const p2 = new THREE.Vector3(
        radius * Math.sin(phi2) * Math.cos(theta2),
        radius * Math.sin(phi2) * Math.sin(theta2),
        radius * Math.cos(phi2)
      );

      // Make it rise above sphere
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(radius * (1.12 + Math.random() * 0.22));

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(25);
      const positions = new Float32Array(points.length * 3);
      for (let i = 0; i < points.length; i++) {
        positions[i * 3] = points[i].x;
        positions[i * 3 + 1] = points[i].y;
        positions[i * 3 + 2] = points[i].z;
      }
      list.push(positions);
    }
    return list;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((pos, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pos, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={theme === "dark" 
              ? idx % 2 === 0 ? "#10b981" : "#06b6d4"
              : idx % 2 === 0 ? "#3b82f6" : "#4f46e5"
            }
            linewidth={1.5}
            transparent
            opacity={0.4}
          />
        </line>
      ))}
    </group>
  );
}

// Thin glowing orbital ring lines
function OrbitRing({ radius, theme }) {
  const points = useMemo(() => {
    const list = [];
    const count = 72;
    for (let i = 0; i <= count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    }
    return new Float32Array(list);
  }, [radius]);

  return (
    <line rotation={[0.08, 0, 0.04]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={theme === "dark" ? "#10b981" : "#3b82f6"}
        transparent
        opacity={0.12}
        linewidth={1}
      />
    </line>
  );
}

// Orbital Glass Card Node (represents portfolio sections orbiting Earth)
function GlassCardNode({ id, title, active, onClick, position, theme }) {
  const meshRef = useRef();

  // Face outwards from center globe
  useEffect(() => {
    if (meshRef.current) {
      const [x, y, z] = position;
      meshRef.current.lookAt(x * 2, y, z * 2);
    }
  }, [position]);

  return (
    <group position={position} ref={meshRef}>
      {active ? (
        <group>
          {/* Solid opaque backdrop backing panel to block background stars/grid */}
          <mesh>
            <planeGeometry args={[6.15, 5.15]} />
            <meshBasicMaterial 
              color={theme === "dark" ? "#060913" : "#ffffff"} 
              opacity={0.99} 
              transparent 
            />
          </mesh>
          <Html transform distanceFactor={5.5} pointerEvents="auto" center>
            <div className="w-[90vw] md:w-[600px] max-h-[70vh] md:max-h-[550px] overflow-y-auto select-none no-scrollbar glass-panel-3d p-1.5 transition-all duration-300">
              {id === "about" && <AboutUs profilePicUrl="/027A1497.jpeg" theme={theme} />}
              {id === "experience" && <WorkExperience theme={theme} />}
              {id === "console" && <AgentConsole theme={theme} onF1Complete={() => {}} onTabChange={() => {}} />}
              {id === "projects" && <ProjectsComponent theme={theme} />}
              {id === "skills" && <SkillsComponent theme={theme} />}
              {id === "blog" && <MediumNotionComponent theme={theme} />}
            </div>
          </Html>
        </group>
      ) : (
        /* Inactive orbital satellite card mesh */
        <mesh onClick={onClick} className="cursor-pointer">
          <planeGeometry args={[4.4, 3.0]} />
          <meshPhysicalMaterial
            roughness={0.1}
            metalness={0.15}
            transparent
            opacity={0.65}
            color={theme === "dark" ? "#090c18" : "#f1f5f9"}
            transmission={0.8}
            thickness={0.6}
          />
          {/* Wire outline glow */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(4.4, 3.0)]} />
            <lineBasicMaterial 
              color={theme === "dark" ? "#10b981" : "#3b82f6"} 
              linewidth={2} 
              transparent 
              opacity={0.8} 
            />
          </lineSegments>
          {/* Floating UI text */}
          <Html distanceFactor={8} center pointerEvents="none">
            <div className="flex flex-col items-center justify-center text-center p-4 whitespace-nowrap">
              <div className={`text-[10px] font-black uppercase tracking-widest ${
                theme === "dark" ? "text-emerald-400 text-shadow-emerald" : "text-blue-600"
              }`}>
                {title}
              </div>
              <div className="text-[8px] text-gray-500 mt-1 uppercase tracking-wider">Expand Node</div>
            </div>
          </Html>
        </mesh>
      )}
    </group>
  );
}

// Camera flight rigging component
function CameraRig({ focusSection, controlsRef, isMobile }) {
  useFrame((state) => {
    let targetPos = isMobile ? [0, 2.5, 12.0] : [0, 1.8, 10.0];
    let targetLook = [0, 0.5, 0];

    const d = isMobile ? 4.8 : 3.5;
    const r = 5.2;

    if (focusSection && focusSection !== "home") {
      const sections = [
        { id: "about", angle: 0, height: 0.6 },
        { id: "experience", angle: Math.PI / 3, height: -0.8 },
        { id: "console", angle: (2 * Math.PI) / 3, height: 0.0 },
        { id: "projects", angle: Math.PI, height: 0.8 },
        { id: "skills", angle: (4 * Math.PI) / 3, height: 1.2 },
        { id: "blog", angle: (5 * Math.PI) / 3, height: -1.2 }
      ];
      const sec = sections.find((s) => s.id === focusSection);
      if (sec) {
        const x = r * Math.cos(sec.angle);
        const z = r * Math.sin(sec.angle);
        const y = sec.height;
        // Glide camera directly parallel to the card face (orthogonal)
        targetPos = [x + d * Math.cos(sec.angle), y, z + d * Math.sin(sec.angle)];
        targetLook = [x, y, z];
      }
    } else {
      // Wide overview camera angle
      targetPos = isMobile ? [0, 2.5, 11.5] : [0, 1.8, 9.5];
      targetLook = [0, 0.5, 0];
    }

    // Camera positioning lerp
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetPos[0], 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetPos[1], 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetPos[2], 0.08);

    // OrbitControls center focus target lerp
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

  // SSR-safe check for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set default view to overview on mount
  useEffect(() => {
    if (setFocusSection) setFocusSection("home");
  }, [setFocusSection]);

  // Calculate dynamic wiggling rotation locks based on focused section
  const getLimits = () => {
    if (!focusSection || focusSection === "home") {
      return {
        minAzimuth: -Infinity,
        maxAzimuth: Infinity,
        minPolar: 0.1,
        maxPolar: Math.PI / 2 - 0.05
      };
    }

    const sections = [
      { id: "about", angle: 0 },
      { id: "experience", angle: Math.PI / 3 },
      { id: "console", angle: (2 * Math.PI) / 3 },
      { id: "projects", angle: Math.PI },
      { id: "skills", angle: (4 * Math.PI) / 3 },
      { id: "blog", angle: (5 * Math.PI) / 3 }
    ];

    const sec = sections.find((s) => s.id === focusSection);
    if (sec) {
      return {
        minAzimuth: sec.angle - 0.18,
        maxAzimuth: sec.angle + 0.18,
        minPolar: Math.PI / 2 - 0.12,
        maxPolar: Math.PI / 2 + 0.12
      };
    }

    return {
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
      minPolar: 0.1,
      maxPolar: Math.PI / 2 - 0.05
    };
  };

  const limits = getLimits();

  // Nodes configuration
  const r = 5.2;
  const nodes = [
    { id: "about", title: "About Me", angle: 0, height: 0.6 },
    { id: "experience", title: "Work Experience", angle: Math.PI / 3, height: -0.8 },
    { id: "console", title: "Agent Console", angle: (2 * Math.PI) / 3, height: 0.0 },
    { id: "projects", title: "Featured Projects", angle: Math.PI, height: 0.8 },
    { id: "skills", title: "Skills Constellation", angle: (4 * Math.PI) / 3, height: 1.2 },
    { id: "blog", title: "Publications Blog", angle: (5 * Math.PI) / 3, height: -1.2 }
  ];

  return (
    <div className={`fixed inset-0 z-40 transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-950" : "bg-slate-50"
    }`}>
      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 2, 11], fov: 55 }}>
        {/* Lights */}
        <ambientLight intensity={theme === "dark" ? 0.75 : 0.95} />
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <directionalLight position={[-5, 5, 5]} intensity={0.9} />

        {/* Orbit Controls with dynamic wiggling constraints */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          maxDistance={18}
          minDistance={2.5}
          enablePan={false}
          minAzimuthAngle={limits.minAzimuth}
          maxAzimuthAngle={limits.maxAzimuth}
          minPolarAngle={limits.minPolar}
          maxPolarAngle={limits.maxPolar}
        />

        {/* Space Flight camera rigging */}
        <CameraRig focusSection={focusSection} controlsRef={controlsRef} isMobile={isMobile} />

        {/* Cosmic starfield particles */}
        <Starfield count={400} color={theme === "dark" ? "#10B981" : "#3b82f6"} />

        {/* Concentric orbital rings surrounding Earth */}
        <OrbitRing radius={4.2} theme={theme} />
        <OrbitRing radius={5.2} theme={theme} />
        <OrbitRing radius={6.2} theme={theme} />

        {/* Central Dotted Hologram Globe & Connection Arcs */}
        <DottedGlobe theme={theme} />
        <ConnectionArcs theme={theme} />

        {/* Orbiting Satellite Data Nodes */}
        {nodes.map((node) => {
          const x = r * Math.cos(node.angle);
          const z = r * Math.sin(node.angle);
          return (
            <GlassCardNode
              key={node.id}
              id={node.id}
              title={node.title}
              active={focusSection === node.id}
              onClick={() => setFocusSection(node.id)}
              position={[x, node.height, z]}
              theme={theme}
            />
          );
        })}

        {/* Conditional Driver Standings (Floats next to console panel in space) */}
        {activeTab === "F1 Predictor" && focusSection === "console" && (
          <mesh position={[r * Math.cos((2 * Math.PI) / 3) + 2.0, -1.8, r * Math.sin((2 * Math.PI) / 3) - 2.5]}>
            <planeGeometry args={[4.5, 3.5]} />
            <meshBasicMaterial color={theme === "dark" ? "#060913" : "#ffffff"} opacity={0.98} transparent />
            <Html transform distanceFactor={5.5} pointerEvents="auto" center>
              <div className="w-[90vw] md:w-[480px] shadow-2xl transition-all duration-300">
                <DriverStandings />
              </div>
            </Html>
          </mesh>
        )}
      </Canvas>

      {/* RETURN TO ORBIT VIEW HUD LINK */}
      {focusSection && focusSection !== "home" && (
        <button
          onClick={() => setFocusSection("home")}
          className={`absolute top-20 left-6 z-50 px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
            theme === "dark"
              ? "border-emerald-500/40 bg-slate-950/90 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
              : "border-slate-200 bg-white/95 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          ← Return to Orbit
        </button>
      )}

      {/* SPACE HUD COMMAND CONSOLE OVERLAY */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border shadow-2xl max-w-[90vw] transition-all duration-300 ${
        theme === "dark"
          ? "border-gray-800 bg-slate-950/85 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "border-slate-200 bg-white/95 text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
      }`}>
        <button
          onClick={() => setFocusSection("home")}
          className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 border ${
            (!focusSection || focusSection === "home") 
              ? theme === "dark"
                ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/40" 
                : "text-blue-600 bg-blue-500/10 border-blue-500/30"
              : "text-gray-400 border-transparent hover:text-current"
          }`}
        >
          Overview Space
        </button>
        <div className="h-4 w-px bg-gray-800 hidden sm:block"></div>
        {nodes.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setFocusSection(sec.id)}
            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 border ${
              focusSection === sec.id 
                ? theme === "dark"
                  ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/40" 
                  : "text-blue-600 bg-blue-500/10 border-blue-500/30"
                : "text-gray-400 border-transparent hover:text-current"
            }`}
          >
            {sec.title.split(" ")[0]} {/* Show first word for space constraints */}
          </button>
        ))}
      </div>

      {/* SPACE TOUR GUIDE ONBOARDING OVERLAY */}
      {!dismissTour && (
        <div className={`absolute top-20 right-6 z-50 w-[300px] max-w-[calc(100vw-3rem)] rounded-2xl border p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md text-white transition-all duration-500 ${
          theme === "dark" 
            ? "border-emerald-500/30 bg-slate-950/92" 
            : "border-slate-200 bg-white/95 text-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-emerald-400 animate-pulse" : "bg-blue-500 animate-pulse"}`}></span>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>Orbital Telemetry Scan</h3>
            </div>
            <button 
              onClick={() => setDismissTour(true)}
              className="text-gray-400 hover:text-gray-200 text-xs transition-colors"
            >
              ✕
            </button>
          </div>
          <p className={`text-[11px] leading-relaxed mb-4 ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
            Inspect Bharat's tech deployments connected globally around this 3D sphere:
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2 text-[10px] leading-normal">
              <span className={`font-bold ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>1. Orbiting Satellites:</span>
              <span className={theme === "dark" ? "text-gray-400" : "text-slate-500"}>Click any orbiting satellite panel or text tag to zoom into that workspace module.</span>
            </div>
            <div className="flex items-start gap-2 text-[10px] leading-normal">
              <span className={`font-bold ${theme === "dark" ? "text-emerald-400" : "text-blue-600"}`}>2. Crisp Display:</span>
              <span className={theme === "dark" ? "text-gray-400" : "text-slate-500"}>Focused panels align perfectly flat and lock rotation, ensuring crisp text readability.</span>
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
              Initiate Space Scan
            </button>
            <button
              onClick={() => setDismissTour(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 border ${
                theme === "dark"
                  ? "border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900"
                  : "border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              Skip Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
