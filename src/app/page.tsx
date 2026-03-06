"use client";

import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import ChatWidget from "@/components/ChatWidget";
import { siteContent } from "@/content/siteContent";
import { fadeIn, fadeUp, slideIn, staggerContainer, viewportOnce } from "@/lib/motion";

export default function Home() {
  return (
    <div className="relative min-h-screen text-zinc-100">
      <div className="site-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="ambient-glow ambient-glow-cyan pointer-events-none absolute -left-28 top-8 -z-10" />
      <div className="ambient-glow ambient-glow-blue pointer-events-none absolute right-0 top-[32rem] -z-10" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060b16]/75 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" className="text-xs font-semibold tracking-[0.22em] text-cyan-200">
            {siteContent.brand}
          </a>
          <ul className="hidden items-center gap-6 md:flex">
            {siteContent.navLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-zinc-300 transition hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteContent.topCta.href}
            className="rounded-full border border-cyan-200/60 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200"
          >
            {siteContent.topCta.label}
          </a>
        </nav>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-5 pb-20 pt-10 md:gap-24 md:px-8 md:pt-14">
        <section className="hero-surface relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 md:px-10 md:py-12">
          <div className="hero-radial absolute inset-0" />
          <motion.div
            className="relative z-10 grid items-center gap-10 md:grid-cols-2"
            variants={staggerContainer(0.08, 0.14)}
            initial="hidden"
            animate="show"
          >
            <div>
              <motion.p
                variants={fadeUp(16, 0.45)}
                className="inline-flex rounded-full border border-cyan-200/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100"
              >
                {siteContent.hero.eyebrow}
              </motion.p>
              <motion.h1 variants={fadeUp(22, 0.58)} className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
                {siteContent.hero.title}
              </motion.h1>
              <motion.p variants={fadeUp(20, 0.56)} className="mt-5 max-w-xl text-base text-zinc-300 md:text-lg">
                {siteContent.hero.subtitle}
              </motion.p>
              <motion.div variants={fadeUp(18, 0.52)} className="mt-7 flex flex-wrap gap-3">
                <a
                  href={siteContent.hero.primaryCta.href}
                  className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  {siteContent.hero.primaryCta.label}
                </a>
                <a
                  href={siteContent.hero.secondaryCta.href}
                  className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/60"
                >
                  {siteContent.hero.secondaryCta.label}
                </a>
              </motion.div>
            </div>
            <motion.div variants={slideIn(24, 0.62)}>
              <HeroScene />
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="process"
          variants={staggerContainer(0, 0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-7"
        >
          <motion.div variants={fadeIn()}>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">How It Works</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">A 3-step implementation loop built for speed.</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {siteContent.processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                variants={fadeUp(22, 0.52)}
                className="group rounded-2xl border border-white/12 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-200/40"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-200">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="proof"
          variants={staggerContainer(0, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-7"
        >
          <motion.div variants={fadeIn()}>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Proof in Motion</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Show clients exactly what automation looks like.</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2">
            {siteContent.proofVideos.map((video) => (
              <motion.article key={video.url} variants={fadeUp(20, 0.5)} className="rounded-2xl border border-white/15 bg-white/[0.03] p-3">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="mt-3 text-sm text-zinc-200">{video.title}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="results"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="rounded-2xl border border-cyan-200/20 bg-cyan-400/10 px-5 py-6 backdrop-blur-sm md:px-7"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.metrics.map((metric) => (
              <motion.article key={metric.label} variants={fadeUp(16, 0.46)}>
                <p className="text-2xl font-semibold text-cyan-100">{metric.value}</p>
                <p className="mt-1 text-sm text-zinc-200">{metric.label}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="offers"
          variants={staggerContainer(0, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-7"
        >
          <motion.div variants={fadeIn()}>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Offers</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Pick the engagement model that matches your growth stage.</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {siteContent.offers.map((offer) => (
              <motion.article
                key={offer.name}
                variants={fadeUp(24, 0.52)}
                className={`rounded-2xl border p-6 ${
                  offer.featured
                    ? "border-cyan-200/60 bg-cyan-300/10 shadow-[0_0_60px_rgba(78,212,255,0.14)]"
                    : "border-white/15 bg-white/[0.03]"
                }`}
              >
                <p className="text-sm font-medium text-cyan-100">{offer.name}</p>
                <p className="mt-2 text-3xl font-semibold">{offer.price}</p>
                <p className="mt-1 text-sm text-zinc-300">{offer.cadence}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-200">
                  {offer.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#final-cta"
                  className="mt-6 inline-block rounded-full border border-white/30 px-4 py-2 text-sm font-medium transition hover:border-cyan-200/70"
                >
                  Start Here
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="final-cta"
          variants={fadeUp(20, 0.56)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="rounded-[2rem] border border-cyan-200/30 bg-[linear-gradient(130deg,rgba(34,211,238,0.18),rgba(37,99,235,0.2))] px-6 py-10 md:px-10"
        >
          <h2 className="text-3xl font-semibold md:text-4xl">{siteContent.finalCta.title}</h2>
          <p className="mt-3 max-w-2xl text-zinc-100">{siteContent.finalCta.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteContent.finalCta.primary.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-black"
            >
              {siteContent.finalCta.primary.label}
            </a>
            <a
              href={siteContent.finalCta.secondary.href}
              className="rounded-full border border-white/40 px-5 py-3 text-sm font-medium text-white transition hover:border-white/80"
            >
              {siteContent.finalCta.secondary.label}
            </a>
          </div>
        </motion.section>
      </main>
      <ChatWidget />
    </div>
  );
}
