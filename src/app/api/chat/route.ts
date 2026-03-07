import { NextResponse } from "next/server";

type ChatPayload = {
  sessionId?: string;
  message?: string;
  messages?: Array<{ role: "user" | "assistant"; text: string }>;
  lead?: { name?: string; email?: string };
  source?: string;
  event?: string;
};

const SYSTEM_PROMPT = `You are NOVA, an AI automation consultant for SMBs.
Goals:
- Identify bottlenecks quickly
- Suggest practical first automations
- Move users toward booking a strategy call
Tone:
- Practical, concise, ROI-focused`;

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ChatPayload;

    const fallbackWebhook = new URL("/api/webhook/nova", req.url).toString();
    const webhook = process.env.OPENCLAW_WEBHOOK_URL || fallbackWebhook;
    const apiKey = process.env.OPENCLAW_API_KEY;

    const upstreamPayload = {
      sessionId: payload.sessionId,
      source: payload.source || "website-widget",
      event: payload.event || "message",
      systemPrompt: SYSTEM_PROMPT,
      message: payload.message,
      messages: payload.messages || [],
      lead: payload.lead,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(upstreamPayload),
    });

    if (!res.ok) {
      const txt = await res.text();
      const reason = txt?.trim() ? txt.slice(0, 180) : `HTTP ${res.status}`;
      return NextResponse.json({ reply: `Upstream error: ${reason}` });
    }

    const data = await res.json();
    return NextResponse.json({
      reply: data.reply || data.message || "Thanks — message received.",
      actions: data.actions || [],
    });
  } catch {
    return NextResponse.json({ reply: "Server error. Please try again." }, { status: 500 });
  }
}
