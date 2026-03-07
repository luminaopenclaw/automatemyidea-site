import Image from "next/image";
import HeroSequence from "@/components/HeroSequence";

const integrations = ["WhatsApp", "Gmail", "Website Forms", "Calendars", "CRM", "Spreadsheets"];

const outcomes = [
  {
    title: "Respond Faster",
    text: "Automatically respond to inbound customer messages across WhatsApp, email, and website forms.",
  },
  {
    title: "Remove Repetitive Work",
    text: "Turn manual repeat tasks into reliable workflows that run in the background every day.",
  },
  {
    title: "Standardise Operations",
    text: "Build onboarding and SOP-driven processes so work gets done the same way every time.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f9fc] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-[#dde7f4] bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold text-[#0A4E8A]">
            <Image src="/ami-logo.svg" alt="AutoMyIdea logo" width={26} height={26} className="h-6 w-6" />
            <span>AutoMyIdea.ai</span>
          </a>
          <a href="#ai-map" className="rounded-full bg-[#0A84FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0977e3]">
            Receive Free AI Map
          </a>
        </nav>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-8 md:gap-20 md:px-8 md:py-12">
        <HeroSequence />

        <section className="rounded-2xl border border-[#dce7f5] bg-white p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[#0A84FF]">No Integration Limits*</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Connect automation into daily operations instantly.</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {integrations.map((item) => (
              <span key={item} className="rounded-full border border-[#d8e5f6] bg-[#f8fbff] px-3 py-1.5 text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">*Subject to platform/API availability and plan limits.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {outcomes.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#dde7f4] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section id="ai-map" className="rounded-[2rem] border border-[#cfe3ff] bg-[linear-gradient(145deg,#fafdff,#eef6ff)] p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-4xl">Receive your free AI Automation Map</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Tell us your business type and pressure points. We’ll map the fastest-win automation opportunities for your operations.</p>

          <form className="mt-6 grid gap-3 md:max-w-2xl md:grid-cols-3">
            <input placeholder="Name" className="rounded-xl border border-[#d7e6fa] bg-white px-4 py-3 text-sm outline-none focus:border-[#0A84FF]" />
            <input type="email" placeholder="Email" className="rounded-xl border border-[#d7e6fa] bg-white px-4 py-3 text-sm outline-none focus:border-[#0A84FF]" />
            <input placeholder="Business type" className="rounded-xl border border-[#d7e6fa] bg-white px-4 py-3 text-sm outline-none focus:border-[#0A84FF]" />
            <button type="button" className="md:col-span-3 rounded-xl bg-[#0A84FF] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(10,132,255,0.28)] hover:bg-[#0977e3]">
              Receive Free AI Map
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
