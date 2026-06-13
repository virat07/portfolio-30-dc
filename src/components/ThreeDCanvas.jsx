import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Shared particle emitter
function Particles({ count = 150, color = "#10B981" }) {
  const pointsRef = useRef();
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
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
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </points>
  );
}

// Scene 1: Floating AI Particle Orb (Digital Twin tab)
function AIOrb() {
  const orbRef = useRef();

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      orbRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#10B981"
          attach="material"
          distort={0.4}
          speed={2.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <Particles count={200} color="#06b6d4" />
    </group>
  );
}

// Scene 2: 3D Grid & Telemetry Waveforms (F1 Predictor tab)
function F1Telemetry() {
  const groupRef = useRef();
  const lineRef1 = useRef();
  const lineRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15;
    }

    if (lineRef1.current) {
      const positions = lineRef1.current.geometry.attributes.position.array;
      for (let i = 0; i < 60; i++) {
        const x = (i - 30) * 0.12;
        positions[i * 3 + 1] = Math.sin(x * 1.5 + t * 3.5) * 0.45 * Math.cos(x * 0.4);
        positions[i * 3 + 2] = Math.cos(x * 1.2 + t * 2) * 0.2;
      }
      lineRef1.current.geometry.attributes.position.needsUpdate = true;
    }

    if (lineRef2.current) {
      const positions = lineRef2.current.geometry.attributes.position.array;
      for (let i = 0; i < 60; i++) {
        const x = (i - 30) * 0.12;
        positions[i * 3 + 1] = Math.cos(x * 2.0 - t * 2.8) * 0.3 * Math.sin(x * 0.5);
        positions[i * 3 + 2] = Math.sin(x * 0.7 + t * 1.8) * 0.25;
      }
      lineRef2.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <line ref={lineRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(60 * 3), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#10B981" linewidth={2} />
      </line>

      <line ref={lineRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(60 * 3), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#06b6d4" linewidth={1.5} />
      </line>

      <gridHelper args={[10, 15, "#10b981", "#1e293b"]} position={[0, -0.8, 0]} />
      <Particles count={120} color="#10b981" />
    </group>
  );
}

// Scene 3: Interactive 3D Chart Data (Stock-bot tab)
function StockBars() {
  const groupRef = useRef();
  const barRef1 = useRef();
  const barRef2 = useRef();
  const barRef3 = useRef();
  const barRef4 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }

    if (barRef1.current) {
      const scaleY = 1.1 + Math.sin(t * 2.4) * 0.35;
      barRef1.current.scale.y = scaleY;
      barRef1.current.position.y = -0.8 + scaleY / 2;
    }
    if (barRef2.current) {
      const scaleY = 1.5 + Math.cos(t * 1.7) * 0.25;
      barRef2.current.scale.y = scaleY;
      barRef2.current.position.y = -0.8 + scaleY / 2;
    }
    if (barRef3.current) {
      const scaleY = 0.7 + Math.sin(t * 3.0) * 0.2;
      barRef3.current.scale.y = scaleY;
      barRef3.current.position.y = -0.8 + scaleY / 2;
    }
    if (barRef4.current) {
      const scaleY = 1.3 + Math.cos(t * 2.0) * 0.3;
      barRef4.current.scale.y = scaleY;
      barRef4.current.position.y = -0.8 + scaleY / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <gridHelper args={[8, 8, "#10b981", "#334155"]} position={[0, -0.8, 0]} />

      {/* AAPL */}
      <mesh ref={barRef1} position={[-1.2, 0, 0]}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#10B981" roughness={0.1} metalness={0.6} emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>
      
      {/* NVDA */}
      <mesh ref={barRef2} position={[-0.4, 0, 0]}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.1} metalness={0.6} emissive="#06b6d4" emissiveIntensity={0.1} />
      </mesh>
      
      {/* TSLA */}
      <mesh ref={barRef3} position={[0.4, 0, 0]}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#eab308" roughness={0.1} metalness={0.6} emissive="#eab308" emissiveIntensity={0.1} />
      </mesh>
      
      {/* MSFT */}
      <mesh ref={barRef4} position={[1.2, 0, 0]}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.6} emissive="#3b82f6" emissiveIntensity={0.1} />
      </mesh>

      <Particles count={80} color="#06b6d4" />
    </group>
  );
}

export default function ThreeDCanvas({ activeTab, theme = "dark" }) {
  return (
    <div className={`w-full h-[250px] rounded-2xl border overflow-hidden shadow-inner transition-all duration-300 ${
      theme === "dark" 
        ? "bg-slate-950/40 border-gray-800" 
        : "bg-slate-50/40 border-slate-200"
    }`}>
      <Canvas camera={{ position: [0, 0.8, 3.8], fov: 55 }}>
        <ambientLight intensity={theme === "dark" ? 0.6 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />

        {activeTab === "Digital Twin" && <AIOrb />}
        {activeTab === "F1 Predictor" && <F1Telemetry />}
        {activeTab === "Stock-bot" && <StockBars />}

        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
