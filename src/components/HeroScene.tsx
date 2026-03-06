"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";
import { AdditiveBlending } from "three";

function CoreOrb() {
  const ref = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x += delta * 0.12;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#66f3e3" metalness={0.5} roughness={0.25} emissive="#0f3a44" />
      </mesh>
    </Float>
  );
}

function AccentRing() {
  const ref = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.z -= delta * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={ref} position={[0, -0.1, 0]}>
        <torusGeometry args={[1.95, 0.08, 24, 160]} />
        <meshStandardMaterial color="#7ba9ff" metalness={0.7} roughness={0.15} emissive="#1b2752" />
      </mesh>
    </Float>
  );
}

function StarField() {
  const points = useMemo(() => {
    const count = 180;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 3.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.cos(phi);
      data[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return data;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#d7f6ff"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-3xl border border-white/15 bg-black/35 shadow-[0_0_80px_rgba(60,144,255,0.2)] md:h-[480px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_18%,rgba(116,222,255,0.16),transparent_38%),radial-gradient(circle_at_28%_82%,rgba(76,123,255,0.14),transparent_40%)]" />
      <Canvas camera={{ position: [0, 0, 4.6], fov: 48 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#04070f"]} />
        <fog attach="fog" args={["#04070f", 4.8, 9]} />
        <ambientLight intensity={0.35} color="#bbd8ff" />
        <pointLight intensity={2.2} color="#74deff" position={[2.2, 1.8, 2.4]} />
        <pointLight intensity={1.2} color="#4c7bff" position={[-2, -1.4, 2.2]} />
        <StarField />
        <CoreOrb />
        <AccentRing />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.55}
          enableDamping
          dampingFactor={0.07}
          rotateSpeed={0.32}
          enableRotate={!isMobile}
        />
      </Canvas>
    </div>
  );
}
