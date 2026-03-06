"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function CoreOrb() {
  const ref = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.15;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.2} roughness={0.25} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[340px] w-full rounded-2xl border border-white/10 bg-black/30 md:h-[460px]">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 4]} intensity={1.3} />
        <CoreOrb />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
