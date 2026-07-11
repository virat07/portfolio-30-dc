import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, MeshDistortMaterial, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

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

// Procedural Dotted Globe representing Earth with continental outlines (using 3D noise)
function DottedGlobe({ theme }) {
  const globeRef = useRef();
  const oceanRef = useRef();

  const { landPositions, waterPositions } = useMemo(() => {
    const count = 2200;
    const land = [];
    const water = [];
    const radius = 1.95;

    // Simple 3D noise approximation to simulate landmasses
    const getNoise = (x, y, z) => {
      const nx = x * 1.5;
      const ny = y * 1.5;
      const nz = z * 1.5;
      return Math.sin(nx) * Math.cos(ny) + 
             Math.sin(ny) * Math.cos(nz) + 
             Math.sin(nz) * Math.cos(nx) +
             0.5 * Math.sin(nx * 3.0) * Math.cos(ny * 3.0) +
             0.25 * Math.sin(nx * 6.0) * Math.cos(ny * 6.0);
    };

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rAtY = Math.sqrt(1 - y * y);
      const theta = 1.618033988749 * 2 * Math.PI * i; // golden angle
      const px = Math.cos(theta) * rAtY * radius;
      const py = y * radius;
      const pz = Math.sin(theta) * rAtY * radius;

      const nVal = getNoise(px, py, pz);
      if (nVal > -0.1) {
        land.push(px, py, pz);
      } else {
        water.push(px, py, pz);
      }
    }

    return {
      landPositions: new Float32Array(land),
      waterPositions: new Float32Array(water)
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.03;
    }
    if (oceanRef.current) {
      oceanRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group>
      {/* Landmass Points (Dense, Bright) */}
      <points ref={globeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[landPositions, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={theme === "dark" ? "#10b981" : "#3b82f6"}
          size={0.07}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </points>

      {/* Ocean Points (Sparse, Dim) */}
      <points ref={oceanRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[waterPositions, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={theme === "dark" ? "#047857" : "#93c5fd"}
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.22}
        />
      </points>

      {/* Holographic Wireframe Earth Shell to overlay points */}
      <mesh>
        <sphereGeometry args={[1.96, 20, 20]} />
        <meshBasicMaterial
          color={theme === "dark" ? "#10b981" : "#3b82f6"}
          wireframe
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Morphing Liquid Core representing global energy */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color={theme === "dark" ? "#06b6d4" : "#6366f1"}
          distort={0.25}
          speed={1.2}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.12}
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
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
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
            opacity={0.35}
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

// Laser line connecting satellite to center of Earth
function TelemetryLaser({ start = [0, 0, 0], end, theme, active }) {
  const positions = useMemo(() => {
    return new Float32Array([...start, ...end]);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={active 
          ? (theme === "dark" ? "#10b981" : "#3b82f6") 
          : (theme === "dark" ? "#064e3b" : "#bfdbfe")
        }
        transparent
        opacity={active ? 0.7 : 0.12}
        linewidth={active ? 2 : 1}
      />
    </line>
  );
}

// Traveling data packets along the laser lines
function DataPulse({ start = [0, 0, 0], end, theme, active }) {
  const pulseRef = useRef();

  useFrame((state) => {
    const speed = active ? 0.8 : 0.4;
    const t = (state.clock.getElapsedTime() * speed) % 1.0;
    if (pulseRef.current) {
      pulseRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
    }
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial
        color={active 
          ? (theme === "dark" ? "#34d399" : "#3b82f6") 
          : (theme === "dark" ? "#10b981" : "#60a5fa")
        }
        transparent
        opacity={active ? 0.9 : 0.22}
      />
    </mesh>
  );
}

// Upgraded 3D Satellite Node (represents portfolio sections orbiting Earth)
function SatelliteNode({ id, title, active, onClick, position, theme }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const coreRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pointerDownPos = useRef({ x: 0, y: 0 });

  // Face outwards from center globe
  useEffect(() => {
    if (groupRef.current) {
      const [x, y, z] = position;
      groupRef.current.lookAt(x * 2, y * 2, z * 2);
    }
  }, [position]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.5;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 3.5) * 0.08 + (hovered || active ? 0.18 : 0);
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    const moveX = Math.abs(e.clientX - pointerDownPos.current.x);
    const moveY = Math.abs(e.clientY - pointerDownPos.current.y);
    // Only click if it wasn't a drag operation
    if (moveX < 5 && moveY < 5) {
      onClick();
    }
  };

  return (
    <group position={position} ref={groupRef}>
      {/* Visual meshes - no pointer events to prevent conflicts */}
      {/* Pulsing Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial 
          color={active 
            ? (theme === "dark" ? "#34d399" : "#2563eb") 
            : hovered 
              ? (theme === "dark" ? "#10b981" : "#3b82f6") 
              : (theme === "dark" ? "#065f46" : "#93c5fd")
          } 
        />
      </mesh>

      {/* Diagonal Rotating Panel Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <ringGeometry args={[0.24, 0.28, 32]} />
        <meshBasicMaterial 
          color={theme === "dark" ? "#10b981" : "#3b82f6"} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.65} 
        />
      </mesh>

      {/* Outer Bounding Wireframe Cube */}
      <mesh>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshBasicMaterial 
          color={theme === "dark" ? "#10b981" : "#3b82f6"} 
          wireframe 
          transparent 
          opacity={active || hovered ? 0.35 : 0.12} 
        />
      </mesh>

      {/* Invisible Interactive Hitbox (Radius 0.75 for easy hover & click detection) */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
      >
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Floating HTML Text Label */}
      <Html distanceFactor={6.5} center pointerEvents="none">
        <div className="flex flex-col items-center justify-center text-center select-none pt-1">
          <div className={`px-2.5 py-0.5 rounded-lg border text-[9px] font-black uppercase tracking-wider transition-all duration-300 shadow-md font-mono ${
            active 
              ? theme === "dark"
                ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "bg-blue-500/20 border-blue-500 text-blue-700 shadow-[0_0_8px_rgba(59,130,246,0.2)]"
              : hovered
                ? theme === "dark"
                  ? "bg-slate-900/90 border-emerald-500/50 text-emerald-400"
                  : "bg-white/95 border-blue-400 text-blue-600"
                : theme === "dark"
                  ? "bg-slate-950/75 border-slate-800/60 text-slate-400"
                  : "bg-white/75 border-slate-200 text-slate-500"
          }`}>
            {title}
          </div>
          <div className={`text-[7px] mt-0.5 font-bold uppercase tracking-widest transition-opacity duration-300 ${
            hovered || active ? "opacity-100" : "opacity-0"
          } ${theme === "dark" ? "text-emerald-400" : "text-blue-500"}`}>
            {active ? "LINK ACTIVE" : "CONNECT NODE"}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Camera flight rigging component
function CameraRig({ focusSection, controlsRef, isMobile }) {
  const prevSection = useRef(focusSection);
  const isTransitioningRef = useRef(true);

  if (prevSection.current !== focusSection) {
    prevSection.current = focusSection;
    isTransitioningRef.current = true;
  }

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
        targetPos = [x + d * Math.cos(sec.angle), y, z + d * Math.sin(sec.angle)];
        targetLook = [x, y, z];
      }
    } else {
      targetPos = isMobile ? [0, 2.5, 11.5] : [0, 1.8, 9.5];
      targetLook = [0, 0.5, 0];
    }

    if (isTransitioningRef.current) {
      // Lerp camera position
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetPos[0], 0.08);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetPos[1], 0.08);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetPos[2], 0.08);

      // Lerp OrbitControls target
      if (controlsRef.current) {
        controlsRef.current.target.x = THREE.MathUtils.lerp(controlsRef.current.target.x, targetLook[0], 0.08);
        controlsRef.current.target.y = THREE.MathUtils.lerp(controlsRef.current.target.y, targetLook[1], 0.08);
        controlsRef.current.target.z = THREE.MathUtils.lerp(controlsRef.current.target.z, targetLook[2], 0.08);
        controlsRef.current.update();
      }

      // Check distance to stop transition and hand over controls
      const dist = Math.sqrt(
        Math.pow(state.camera.position.x - targetPos[0], 2) +
        Math.pow(state.camera.position.y - targetPos[1], 2) +
        Math.pow(state.camera.position.z - targetPos[2], 2)
      );
      if (dist < 0.04) {
        isTransitioningRef.current = false;
      }
    } else {
      // If focused on a card, hold camera in place so user is aligned orthogonally
      if (focusSection && focusSection !== "home") {
        state.camera.position.x = targetPos[0];
        state.camera.position.y = targetPos[1];
        state.camera.position.z = targetPos[2];
        if (controlsRef.current) {
          controlsRef.current.target.x = targetLook[0];
          controlsRef.current.target.y = targetLook[1];
          controlsRef.current.target.z = targetLook[2];
          controlsRef.current.update();
        }
      }
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissTour, setDismissTour] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("dismissSpaceTour") === "true";
    }
    return false;
  });

  const handleDismissTour = () => {
    setDismissTour(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("dismissSpaceTour", "true");
    }
  };

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

  // Dismiss onboarding tour automatically when user selects a node
  useEffect(() => {
    if (focusSection && focusSection !== "home") {
      handleDismissTour();
    }
  }, [focusSection]);

  // Sync isExpanded drawer state with focusSection changes
  useEffect(() => {
    if (focusSection === "home" || !focusSection) {
      setIsExpanded(false);
    }
  }, [focusSection]);

  const r = 5.2;

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
  const nodes = [
    { id: "about", title: "About Me", angle: 0, height: 0.6 },
    { id: "experience", title: "Work Experience", angle: Math.PI / 3, height: -0.8 },
    { id: "console", title: "Agent Console", angle: (2 * Math.PI) / 3, height: 0.0 },
    { id: "projects", title: "Featured Projects", angle: Math.PI, height: 0.8 },
    { id: "skills", title: "Skills Constellation", angle: (4 * Math.PI) / 3, height: 1.2 },
    { id: "blog", title: "Publications Blog", angle: (5 * Math.PI) / 3, height: -1.2 }
  ];

  // Quick Prev / Next handlers
  const handlePrevNode = () => {
    const currentIndex = nodes.findIndex((n) => n.id === focusSection);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + nodes.length) % nodes.length;
      setFocusSection(nodes[prevIndex].id);
    }
  };

  const handleNextNode = () => {
    const currentIndex = nodes.findIndex((n) => n.id === focusSection);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % nodes.length;
      setFocusSection(nodes[nextIndex].id);
    }
  };

  // Mobile Carousel cards mapping
  const carouselCards = useMemo(() => [
    {
      id: "home",
      title: "Space Control Console",
      tag: "OVERVIEW MODE",
      summary: "Bharat's global infrastructure scanner. Cycle nodes to scan details."
    },
    {
      id: "about",
      title: "About Me",
      tag: "SATELLITE NODE-01",
      summary: "Master's in CS, 6+ years building high-impact React systems and agentic workflows."
    },
    {
      id: "experience",
      title: "Work Experience",
      tag: "SATELLITE NODE-02",
      summary: "Engineering highlights: leading frontend teams, optimizing Core Web Vitals, and Figma MCPs."
    },
    {
      id: "console",
      title: "Agent Console",
      tag: "SATELLITE NODE-03",
      summary: "Simulate live stock alerts, telemetry log scrapers, and F1 Predictor point scoring."
    },
    {
      id: "projects",
      title: "Featured Projects",
      tag: "SATELLITE NODE-04",
      summary: "Interactive portfolio of Web3 exchanges, React Dashboards, and UI libraries."
    },
    {
      id: "skills",
      title: "Skills Constellation",
      tag: "SATELLITE NODE-05",
      summary: "Expertise in React, Three.js, Tailwind, Node, Python, and system architecture."
    },
    {
      id: "blog",
      title: "Publications Blog",
      tag: "SATELLITE NODE-06",
      summary: "Technical articles on Medium and Notion outlining developer insights."
    }
  ], []);

  const nodeIds = useMemo(() => ["home", "about", "experience", "console", "projects", "skills", "blog"], []);
  const activeIndex = useMemo(() => {
    const idx = nodeIds.indexOf(focusSection);
    return idx !== -1 ? idx : 0;
  }, [focusSection, nodeIds]);

  const handleNextMobile = () => {
    const nextIdx = (activeIndex + 1) % nodeIds.length;
    setFocusSection(nodeIds[nextIdx]);
  };

  const handlePrevMobile = () => {
    const prevIdx = (activeIndex - 1 + nodeIds.length) % nodeIds.length;
    setFocusSection(nodeIds[prevIdx]);
  };

  return (
    <div className={`fixed inset-0 z-40 flex flex-col transition-colors duration-300 pt-16 ${
      theme === "dark" ? "bg-gray-950 text-white" : "bg-slate-50 text-slate-800"
    }`}>
      {/* 3D WebGL Canvas Viewport - Absolute full-screen background on mobile & desktop */}
      <div className="absolute inset-0 pt-16 z-0">
        <Canvas camera={{ position: [0, 2, 11], fov: 55 }}>
          {/* Lights */}
          <ambientLight intensity={theme === "dark" ? 0.75 : 0.95} />
          <pointLight position={[10, 10, 10]} intensity={1.3} />
          <directionalLight position={[-5, 5, 5]} intensity={0.9} />

          {/* Orbit Controls (Disabled on mobile to let bottom card control camera cleanly) */}
          <OrbitControls
            ref={controlsRef}
            enabled={!isMobile}
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
          <Starfield count={isMobile ? 250 : 400} color={theme === "dark" ? "#10B981" : "#3b82f6"} />

          {/* Perspective Ground Grid Helper */}
          <gridHelper 
            args={[26, 26, theme === "dark" ? "#10b981" : "#3b82f6", theme === "dark" ? "#1e293b" : "#e2e8f0"]} 
            position={[0, -2.8, 0]} 
          />

          {/* Concentric orbital rings surrounding Earth */}
          <OrbitRing radius={4.2} theme={theme} />
          <OrbitRing radius={5.2} theme={theme} />
          <OrbitRing radius={6.2} theme={theme} />

          {/* Central Dotted Hologram Globe & Connection Arcs */}
          <DottedGlobe theme={theme} />
          <ConnectionArcs theme={theme} />

          {/* Orbiting Satellite Data Nodes + Laser links + Telemetry pulses */}
          {nodes.map((node) => {
            const x = r * Math.cos(node.angle);
            const z = r * Math.sin(node.angle);
            const pos = [x, node.height, z];
            const isActive = focusSection === node.id;
            return (
              <group key={node.id}>
                {/* Telemetry Laser Beam to Earth Surface */}
                <TelemetryLaser 
                  start={[0, 0, 0]} 
                  end={pos} 
                  theme={theme} 
                  active={isActive} 
                />
                
                {/* Telemetry Data Pulses */}
                <DataPulse 
                  start={[0, 0, 0]} 
                  end={pos} 
                  theme={theme} 
                  active={isActive} 
                />

                {/* Upgraded 3D Satellite Model */}
                <SatelliteNode
                  id={node.id}
                  title={node.title}
                  active={isActive}
                  onClick={() => setFocusSection(node.id)}
                  position={pos}
                  theme={theme}
                />
              </group>
            );
          })}
        </Canvas>
      </div>

      {/* 2D HUD content - Carousel for mobile, absolute drawer/overlays for desktop */}
      {isMobile ? (
        <>
          {/* Mobile HUD Carousel Card (Floating at the bottom, full screen Canvas background behind) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-[400px] z-30 flex flex-col gap-2.5">
            <div className={`p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
              theme === "dark"
                ? "border-emerald-500/25 bg-slate-950/85 text-white shadow-[0_10px_35px_rgba(16,185,129,0.15)]"
                : "border-slate-200 bg-white/95 text-slate-800 shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            }`}>
              {/* Telemetry Indicator */}
              <div className={`flex items-center justify-between w-full text-[8px] font-mono tracking-widest select-none pb-1.5 border-b border-gray-800/40 ${
                theme === "dark" ? "text-emerald-500/70" : "text-blue-500/70"
              }`}>
                <span>{carouselCards[activeIndex].tag}</span>
                <span>[{activeIndex + 1} / 7]</span>
              </div>

              {/* Carousel Content Control Panel */}
              <div className="flex items-center justify-between py-3 gap-2">
                <button
                  onClick={handlePrevMobile}
                  className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                    theme === "dark"
                      ? "border-slate-800 bg-slate-900 text-gray-400 hover:text-emerald-400"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600"
                  }`}
                >
                  ◀
                </button>

                <div className="flex-1 text-center px-1">
                  <h3 className="text-xs font-black uppercase tracking-wider font-mono">
                    {carouselCards[activeIndex].title}
                  </h3>
                  <p className={`text-[10px] leading-relaxed mt-1 line-clamp-2 ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}>
                    {carouselCards[activeIndex].summary}
                  </p>
                </div>

                <button
                  onClick={handleNextMobile}
                  className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                    theme === "dark"
                      ? "border-slate-800 bg-slate-900 text-gray-400 hover:text-emerald-400"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600"
                  }`}
                >
                  ▶
                </button>
              </div>

              {/* Action Button */}
              {carouselCards[activeIndex].id !== "home" ? (
                <button
                  onClick={() => setIsExpanded(true)}
                  className={`w-full py-2 rounded-xl text-center text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md ${
                    theme === "dark"
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                >
                  [ TAP TO EXPAND NODE DETAILS ]
                </button>
              ) : (
                <button
                  onClick={() => setFocusSection("about")}
                  className={`w-full py-2 rounded-xl text-center text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                    theme === "dark"
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "border-blue-500/30 text-blue-600 bg-blue-500/5 hover:bg-blue-500/10"
                  }`}
                >
                  [ INITIATE SPACE SCAN ]
                </button>
              )}
            </div>

            {/* Quick shortcuts dot indicators */}
            <div className="flex justify-center gap-1.5 pb-1">
              {nodeIds.map((id, idx) => (
                <button
                  key={id}
                  onClick={() => setFocusSection(id)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? theme === "dark" ? "bg-emerald-400 w-3" : "bg-blue-600 w-3"
                      : theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Full Screen Scrollable Details Drawer (Toggled by tap) */}
          <AnimatePresence>
            {isExpanded && focusSection && focusSection !== "home" && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 140 }}
                className={`fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl border-t transition-all duration-300 rounded-t-3xl ${
                  theme === "dark"
                    ? "border-emerald-500/20 bg-slate-950/95 text-white"
                    : "border-slate-200 bg-white/98 text-slate-800"
                }`}
              >
                {/* Header */}
                <div className={`px-5 py-4 flex items-center justify-between border-b ${
                  theme === "dark" ? "border-slate-900 bg-slate-950/40" : "border-slate-100 bg-slate-50/50"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-emerald-400 animate-pulse" : "bg-blue-600 animate-pulse"
                    }`} />
                    <div className="flex flex-col">
                      <span className={`text-[8px] font-mono tracking-widest ${
                        theme === "dark" ? "text-emerald-400/80" : "text-blue-600/80"
                      }`}>
                        SEC SCAN ACTIVE // COORD: {nodes.find((n) => n.id === focusSection)?.angle.toFixed(2)}
                      </span>
                      <h2 className="text-sm font-black uppercase tracking-wider font-mono">
                        {nodes.find((n) => n.id === focusSection)?.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                      theme === "dark"
                        ? "border-slate-800 bg-slate-900 text-emerald-400"
                        : "border-slate-200 bg-slate-100 text-blue-600"
                    }`}
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar select-text">
                  {focusSection === "about" && <AboutUs profilePicUrl="/027A1497.jpeg" theme={theme} />}
                  {focusSection === "experience" && <WorkExperience theme={theme} />}
                  {focusSection === "console" && (
                    <div className="space-y-4">
                      <AgentConsole theme={theme} onF1Complete={() => {}} onTabChange={setActiveTab} />
                      {activeTab === "F1 Predictor" && (
                        <div className={`mt-4 border-t border-dashed pt-4 ${
                          theme === "dark" ? "border-slate-800" : "border-slate-200"
                        }`}>
                          <DriverStandings />
                        </div>
                      )}
                    </div>
                  )}
                  {focusSection === "projects" && <ProjectsComponent theme={theme} />}
                  {focusSection === "skills" && <SkillsComponent theme={theme} />}
                  {focusSection === "blog" && <MediumNotionComponent theme={theme} isDrawer={true} />}
                </div>

                {/* Footer Controls inside Drawer */}
                <div className={`px-5 py-3.5 flex items-center justify-between border-t ${
                  theme === "dark" ? "border-slate-900 bg-slate-950/40" : "border-slate-100 bg-slate-50/50"
                }`}>
                  <button
                    onClick={handlePrevNode}
                    className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider transition-colors ${
                      theme === "dark"
                        ? "border-slate-800 bg-slate-900 text-gray-400 hover:text-emerald-400"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600"
                    }`}
                  >
                    &larr; Prev Node
                  </button>
                  
                  <span className="text-[8px] font-mono text-gray-500 select-none">
                    SEC: {nodes.findIndex((n) => n.id === focusSection) + 1} / {nodes.length}
                  </span>

                  <button
                    onClick={handleNextNode}
                    className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider transition-colors ${
                      theme === "dark"
                        ? "border-slate-800 bg-slate-900 text-gray-400 hover:text-emerald-400"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600"
                    }`}
                  >
                    Next Node &rarr;
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Desktop layouts (drawer overlays) */
        <>
          <AnimatePresence>
            {focusSection && focusSection !== "home" && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 26, stiffness: 130 }}
                className={`absolute z-50 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl border transition-all duration-300 right-6 top-20 bottom-24 w-[550px] rounded-2xl ${
                  theme === "dark"
                    ? "border-emerald-500/25 bg-slate-950/90 text-white shadow-[0_15px_40px_rgba(16,185,129,0.15)]"
                    : "border-slate-200 bg-white/95 text-slate-800 shadow-[0_15px_30px_rgba(15,23,42,0.08)]"
                }`}
              >
                {/* Telemetry Panel Header */}
                <div className={`px-6 py-4 flex items-center justify-between border-b ${
                  theme === "dark" ? "border-slate-900 bg-slate-950/40" : "border-slate-100 bg-slate-50/50"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      theme === "dark" ? "bg-emerald-400 animate-pulse" : "bg-blue-600 animate-pulse"
                    }`} />
                    <div className="flex flex-col">
                      <span className={`text-[8px] font-mono tracking-widest ${
                        theme === "dark" ? "text-emerald-400/80" : "text-blue-600/80"
                      }`}>
                        DATA SCAN ACTIVE // SEC: {focusSection.toUpperCase()}_NODE
                      </span>
                      <h2 className="text-sm font-black uppercase tracking-wider font-mono">
                        {nodes.find((n) => n.id === focusSection)?.title || "Node Details"}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setFocusSection("home")}
                    className={`p-2 rounded-lg transition-colors text-xs font-bold ${
                      theme === "dark" 
                        ? "hover:bg-slate-900 text-gray-400 hover:text-white" 
                        : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar select-text">
                  {focusSection === "about" && <AboutUs profilePicUrl="/027A1497.jpeg" theme={theme} />}
                  {focusSection === "experience" && <WorkExperience theme={theme} />}
                  {focusSection === "console" && (
                    <div className="pt-2 space-y-4">
                      <AgentConsole theme={theme} onF1Complete={() => {}} onTabChange={setActiveTab} />
                      {activeTab === "F1 Predictor" && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-4 border-t border-dashed pt-4 ${
                            theme === "dark" ? "border-slate-800" : "border-slate-200"
                          }`}
                        >
                          <DriverStandings />
                        </motion.div>
                      )}
                    </div>
                  )}
                  {focusSection === "projects" && <ProjectsComponent theme={theme} />}
                  {focusSection === "skills" && <SkillsComponent theme={theme} />}
                  {focusSection === "blog" && <MediumNotionComponent theme={theme} isDrawer={true} />}
                </div>

                {/* Diagnostics & Navigation Panel Footer */}
                <div className={`px-6 py-3.5 flex items-center justify-between border-t ${
                  theme === "dark" ? "border-slate-900 bg-slate-950/40" : "border-slate-100 bg-slate-50/50"
                }`}>
                  <div className="flex flex-col text-[8px] font-mono text-gray-500 select-none">
                    <span>COORD: ALT: {nodes.find((n) => n.id === focusSection)?.height.toFixed(2)} &bull; ANG: {nodes.find((n) => n.id === focusSection)?.angle.toFixed(2)}</span>
                    <span>STATUS: TELEMETRY_STREAM_OK // 60 FPS</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      onClick={handlePrevNode}
                      className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${
                        theme === "dark"
                          ? "border-slate-800 bg-slate-900 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600 hover:border-blue-500/30"
                      }`}
                    >
                      &larr; Prev Node
                    </button>
                    <button
                      onClick={handleNextNode}
                      className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${
                        theme === "dark"
                          ? "border-slate-800 bg-slate-900 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:text-blue-600 hover:border-blue-500/30"
                      }`}
                    >
                      Next Node &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RETURN TO OR VIEW HUD LINK (Desktop only) */}
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

          {/* SPACE HUD COMMAND CONSOLE OVERLAY (Desktop only) */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 px-6 py-3 rounded-2xl border shadow-2xl max-w-[90vw] transition-all duration-300 ${
            theme === "dark"
              ? "border-emerald-500/30 bg-slate-950/90 text-white shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
              : "border-slate-200 bg-white/95 text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
          }`}>
            <div className={`flex items-center justify-between w-full text-[8px] font-mono tracking-widest select-none pb-1 border-b border-gray-800/40 ${
              theme === "dark" ? "text-emerald-500/70" : "text-blue-500/70"
            }`}>
              <span>DATA LINK: SECURE</span>
              <span className="animate-pulse">ORBITAL SCAN RUNNING</span>
              <span>LAT: 34.11 &bull; LNG: -117.30</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
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
              <div className="h-4 w-px bg-gray-800/40 hidden sm:block"></div>
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
                  {sec.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
