import HeroScene from "@/components/HeroScene";

const pillars = [
  {
    title: "Find Repetitive Work",
    text: "We audit admin, sales follow-up, and customer workflows to identify high-ROI automation opportunities.",
  },
  {
    title: "Build Fast",
    text: "Deploy practical AI systems in days, not months, with clear owner handoff and SOPs.",
  },
  {
    title: "Prove ROI",
    text: "Track time saved, response speed, and lead conversion so every automation has business impact.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07070b] text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 md:px-8 md:py-14">
        <header className="flex items-center justify-between">
          <p className="text-sm tracking-[0.24em] text-violet-300">AUTOMATEMYIDEA.AI</p>
          <a
            href="#book"
            className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold hover:bg-violet-400"
          >
            Book Strategy Call
          </a>
        </header>

        <section className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-violet-300">AI Automation for SMBs</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Turn business chaos into scalable systems.
            </h1>
            <p className="mt-5 max-w-xl text-base text-zinc-300 md:text-lg">
              Dora-style visual storytelling, backed by real automation outcomes.
              We design and ship practical AI workflows that reduce busywork and create measurable ROI.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
                Get a 14-Day Automation Plan
              </a>
              <a href="#services" className="rounded-full border border-white/30 px-5 py-3 text-sm">
                Explore Services
              </a>
            </div>
          </div>
          <HeroScene />
        </section>

        <section id="services" className="grid gap-4 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
            </article>
          ))}
        </section>

        <section id="book" className="rounded-2xl border border-violet-300/30 bg-violet-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">Ready to automate your operations?</h2>
          <p className="mt-2 text-zinc-200">Book a strategy call and we’ll map your highest-impact automations.</p>
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold hover:bg-violet-400"
          >
            Book Now
          </a>
        </section>
      </main>
    </div>
  );
}
