"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";

const problemCards = [
  "Slow customer replies",
  "Repetitive admin",
  "Messy onboarding",
  "No clear SOPs",
  "Disconnected tools",
];

const resultCards = [
  "Instant replies sent",
  "Tasks automated",
  "Onboarding flow live",
  "SOPs generated",
  "Ops synced daily",
];

function AiNode() {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshStandardMaterial color="#4FA8FF" metalness={0.3} roughness={0.2} emissive="#6BE1FF" emissiveIntensity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.06, 16, 140]} />
        <meshStandardMaterial color="#0A84FF" emissive="#6BE1FF" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroSequence() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(q(".problem-card"), { y: -24, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55 })
      .to(q(".phase-problem"), { opacity: 1, duration: 0.4 }, 0.15)
      .fromTo(q(".ai-node-wrap"), { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 0.65 }, 0.8)
      .to(q(".problem-card"), { x: 0, y: 0, duration: 0.55, stagger: 0.06 }, 1.35)
      .to(q(".problem-card"), { opacity: 0.12, scale: 0.92, duration: 0.4, stagger: 0.05 }, 1.65)
      .fromTo(q(".result-card"), { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.5 }, 2.3)
      .to(q(".phase-result"), { opacity: 1, duration: 0.45 }, 2.45)
      .fromTo(q(".hero-copy"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 3.1)
      .fromTo(q(".hero-cta"), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 3.25)
      .fromTo(q(".hero-stats"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 3.35);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden rounded-[2rem] border border-[#dbe7f5] bg-white p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(79,168,255,0.18),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(107,225,255,0.2),transparent_42%)]" />

      <div className="relative z-10 grid gap-7 md:grid-cols-2">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-[#d8e5f6] bg-white/80 px-3 py-1 text-xs font-semibold text-[#0A84FF]">Simple Automation for Everyday Business Tasks</p>

          <div className="phase-problem opacity-0 text-sm font-medium text-slate-500">Small businesses are drowning in repetitive work.</div>
          <div className="phase-result opacity-0 text-sm font-medium text-slate-700">Turn manual pressure points into structured daily operations.</div>

          <h1 className="hero-copy opacity-0 text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">AutoMyIdea.ai</h1>
          <p className="text-base text-slate-600 md:text-lg">No limit to integrations across WhatsApp, Gmail, website forms, and your day-to-day tools.</p>

          <div className="hero-cta opacity-0 pt-2">
            <a href="#ai-map" className="inline-flex rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(10,132,255,0.25)] transition hover:bg-[#0977e3]">Receive Free AI Map</a>
          </div>

          <div className="hero-stats opacity-0 grid grid-cols-3 gap-2 pt-2 text-xs text-slate-600 md:text-sm">
            <div className="rounded-xl border border-[#e5edf8] bg-white/70 p-2"><strong className="block text-slate-900">12hrs</strong> saved/wk</div>
            <div className="rounded-xl border border-[#e5edf8] bg-white/70 p-2"><strong className="block text-slate-900">3x</strong> faster replies</div>
            <div className="rounded-xl border border-[#e5edf8] bg-white/70 p-2"><strong className="block text-slate-900">1 setup</strong> daily ops</div>
          </div>
        </div>

        <div>
          <div className="relative hidden min-h-[460px] rounded-2xl border border-[#e3ebf7] bg-[#f8fbff] md:block">
            <div className="ai-node-wrap absolute inset-0 opacity-0">
              <Canvas camera={{ position: [0, 0, 4], fov: 42 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 2, 3]} intensity={1.1} />
                <AiNode />
              </Canvas>
            </div>

            {problemCards.map((card, i) => (
              <div
                key={card}
                className="problem-card absolute rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-[0_8px_25px_rgba(15,23,42,0.08)] backdrop-blur"
                style={{
                  top: `${10 + i * 14}%`,
                  left: i % 2 ? "12%" : "56%",
                  transform: `translate(${i % 2 ? -18 : 18}px, ${i * 2}px)`,
                }}
              >
                {card}
              </div>
            ))}

            {resultCards.map((card, i) => (
              <div
                key={card}
                className="result-card absolute rounded-2xl border border-[#d7e8ff] bg-white/90 px-3 py-2 text-xs font-semibold text-[#0A4E8A] shadow-[0_10px_25px_rgba(10,132,255,0.14)]"
                style={{ top: `${16 + i * 13}%`, left: i % 2 ? "52%" : "10%" }}
              >
                {card}
              </div>
            ))}
          </div>

          <div className="relative min-h-[280px] rounded-2xl border border-[#e3ebf7] bg-[#f8fbff] p-4 md:hidden">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A84FF]">Automation Flow</div>
            <div className="grid gap-2">
              {problemCards.slice(0, 3).map((card) => (
                <div key={card} className="problem-card rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-xs text-slate-700">{card}</div>
              ))}
              <div className="ai-node-wrap rounded-xl border border-[#cce2ff] bg-[#e9f3ff] px-3 py-2 text-center text-xs font-semibold text-[#0A4E8A] opacity-0">AI SYSTEM ACTIVE</div>
              {resultCards.slice(0, 3).map((card) => (
                <div key={card} className="result-card rounded-xl border border-[#d7e8ff] bg-white px-3 py-2 text-xs font-semibold text-[#0A4E8A]">{card}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
