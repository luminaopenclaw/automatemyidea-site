"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

function getSessionId() {
  if (typeof window === "undefined") return "";
  const key = "ami_chat_session_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const created = `ami_${crypto.randomUUID()}`;
  localStorage.setItem(key, created);
  return created;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactSaved, setContactSaved] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hey — I’m NOVA. Tell me your biggest business bottleneck and I’ll suggest your top 3 automation wins.",
    },
  ]);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const shouldAskContact = useMemo(() => messages.filter((m) => m.role === "user").length >= 2 && !contactSaved, [messages, contactSaved]);

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() || loading) return;

    const next = [...messages, { role: "user" as const, text: text.trim() }];
    setMessages(next);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: next[next.length - 1].text,
          messages: next,
          lead: contactSaved ? { name, email } : undefined,
          source: "website-widget",
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply || "I hit a temporary issue. Try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  async function saveContact() {
    if (!email.trim() || !sessionId) return;
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          event: "lead_capture",
          lead: { name, email },
          source: "website-widget",
        }),
      });
      setContactSaved(true);
      setMessages((prev) => [...prev, { role: "assistant", text: "Perfect — got it. I’ll tailor recommendations to your business context." }]);
    } catch {
      // silent fallback
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[360px] rounded-2xl border border-cyan-200/30 bg-[#050c18] p-3 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-cyan-100">NOVA Assistant</p>
            <button onClick={() => setOpen(false)} className="text-xs text-zinc-300">Close</button>
          </div>
          <div className="mb-2 h-72 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "ml-auto bg-cyan-300 text-slate-900" : "bg-white/10 text-zinc-100"}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {shouldAskContact && (
            <div className="mb-2 space-y-2 rounded-xl border border-cyan-200/20 bg-cyan-300/5 p-2">
              <p className="text-xs text-cyan-100">Want a tailored automation plan? Drop your details:</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full rounded-md border border-white/20 bg-transparent px-2 py-1.5 text-xs"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-md border border-white/20 bg-transparent px-2 py-1.5 text-xs"
              />
              <button
                onClick={saveContact}
                disabled={!email.trim()}
                className="w-full rounded-md bg-cyan-300 px-2 py-1.5 text-xs font-semibold text-slate-900 disabled:opacity-50"
              >
                Save details
              </button>
            </div>
          )}

          <form onSubmit={send} className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask about automations..."
              className="flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button disabled={loading} className="rounded-lg bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60">
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-cyan-200/40 bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-900 shadow-xl"
        >
          Chat with NOVA
        </button>
      )}
    </div>
  );
}
