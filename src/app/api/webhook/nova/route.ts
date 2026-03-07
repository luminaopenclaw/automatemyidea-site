import { NextResponse } from "next/server";

type Payload = {
  message?: string;
  event?: string;
  lead?: { name?: string; email?: string };
  messages?: Array<{ role: "user" | "assistant"; text: string }>;
};

function hasAny(text: string, terms: string[]) {
  return terms.some((t) => text.includes(t));
}

function hairdresserReply() {
  return [
    "For a hairdresser, I’d start with these 3 automations:",
    "1) No-show prevention: auto SMS reminders at 48h + 24h + 2h before appointments.",
    "2) Rebooking flow: automatic message 4-6 weeks after a visit with one-click rebook link.",
    "3) Lead-to-booking assistant: instantly reply to Instagram/WhatsApp/Facebook inquiries with available slots.",
    "",
    "Fastest win is usually #1 (no-show prevention) because it improves chair utilisation immediately.",
  ].join("\n");
}

function restaurantReply() {
  return [
    "For restaurants/cafes, top automations are:",
    "1) Reservation confirmations + reminder SMS",
    "2) Review request automation 2 hours after visit",
    "3) Repeat-customer winback campaigns after 30 days inactive",
  ].join("\n");
}

function genericTop3() {
  return [
    "Here are 3 automations most SMBs start with:",
    "1) Lead response automation (reply in under 60 seconds)",
    "2) Follow-up automation (quote/chase/reminders)",
    "3) Admin automation (forms → tasks → CRM updates)",
    "",
    "Tell me your sector and booking/sales process, and I’ll tailor this properly.",
  ].join("\n");
}

function fallbackReply(payload: Payload) {
  const message = (payload.message || "").toLowerCase();

  if (hasAny(message, ["hair", "hairdresser", "salon", "barber", "stylist"])) return hairdresserReply();
  if (hasAny(message, ["restaurant", "cafe", "food", "takeaway", "hospitality"])) return restaurantReply();

  if (hasAny(message, ["anything else", "what else", "more", "another"])) {
    return "Yes — next layer is retention automation: reactivation campaigns, review requests, and VIP reminders. Share your business type and booking tool and I’ll map a 14-day rollout.";
  }

  return genericTop3();
}

async function openRouterReply(payload: Payload): Promise<{ reply: string | null; error?: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return { reply: null, error: "missing_openrouter_api_key" };

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const siteUrl = process.env.SITE_URL || "https://automatemyidea-site.vercel.app";

  const history = (payload.messages || [])
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.text }))
    .filter((m) => m.content?.trim());

  const currentMessage = payload.message?.trim();

  const leadContext = payload.lead?.email
    ? `Lead captured: ${payload.lead.name || "unknown name"}, ${payload.lead.email}.`
    : "Lead not captured yet.";

  const systemPrompt = `You are NOVA, an AI automation consultant for SMBs.
Goal: give practical, specific, concise recommendations that help the visitor identify first automations and book a strategy call.
Rules:
- Never be generic if the business type is known.
- Give top 3 automations in bullets where relevant.
- Ask ONE clarifying question at the end.
- Keep under 140 words unless user asks for detail.
- Tone: commercial, practical, direct.
- ${leadContext}`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    ...(currentMessage ? [{ role: "user", content: currentMessage }] : []),
  ];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "AutomateMyIdea Chat",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 260,
    }),
  });

  if (!res.ok) {
    const errText = (await res.text()).slice(0, 180);
    return { reply: null, error: `openrouter_http_${res.status}:${errText}` };
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  const text =
    typeof content === "string"
      ? content.trim()
      : Array.isArray(content)
        ? content
            .map((c: { type?: string; text?: string }) => (c?.type === "text" ? c.text || "" : ""))
            .join("\n")
            .trim()
        : "";

  if (!text) {
    const reason = data?.choices?.[0]?.finish_reason || "unknown";
    return { reply: null, error: `openrouter_empty_response:${reason}` };
  }

  return { reply: text };
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Payload;

    if (payload.event === "lead_capture") {
      const leadName = payload.lead?.name?.trim();
      const leadEmail = payload.lead?.email?.trim();

      return NextResponse.json({
        reply: leadEmail
          ? `Perfect${leadName ? `, ${leadName}` : ""} — got your details. Tell me your business type and your biggest weekly bottleneck, and I’ll map your top 3 automations.`
          : "Thanks — share your email and I’ll send your top 3 automation opportunities.",
      });
    }

    const message = payload.message?.trim() || "";
    if (!message) {
      return NextResponse.json({
        reply: "Tell me your business type (e.g., salon, clinic, agency, trades) and I’ll recommend your top 3 automations.",
      });
    }

    const ai = await openRouterReply(payload);
    if (ai.reply) return NextResponse.json({ reply: ai.reply });

    if (ai.error) {
      return NextResponse.json({
        reply: `AI provider not active yet (${ai.error}). Check OPENROUTER_API_KEY/OPENROUTER_MODEL in Vercel and redeploy.`,
      });
    }

    return NextResponse.json({ reply: fallbackReply(payload) });
  } catch {
    return NextResponse.json({ reply: "Temporary issue. Please try again." }, { status: 500 });
  }
}
