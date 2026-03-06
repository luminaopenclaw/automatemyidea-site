import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const webhook = process.env.OPENCLAW_WEBHOOK_URL;
    const apiKey = process.env.OPENCLAW_API_KEY;

    if (!webhook) {
      return NextResponse.json({
        reply:
          "Chat backend not connected yet. Set OPENCLAW_WEBHOOK_URL (and optional OPENCLAW_API_KEY) in env.",
      });
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ reply: `Upstream error: ${txt.slice(0, 180)}` });
    }

    const data = await res.json();
    return NextResponse.json({
      reply: data.reply || data.message || "Thanks — message received.",
    });
  } catch {
    return NextResponse.json({ reply: "Server error. Please try again." }, { status: 500 });
  }
}
