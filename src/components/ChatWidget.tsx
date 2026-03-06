"use client";

import { FormEvent, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hey — I’m NOVA. Tell me your business bottleneck and I’ll suggest an automation." },
  ]);

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
        body: JSON.stringify({ message: next[next.length - 1].text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply || "I hit a temporary issue. Try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[340px] rounded-2xl border border-cyan-200/30 bg-[#050c18] p-3 shadow-2xl">
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
