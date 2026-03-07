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
    "If you want, I can map a simple setup for Fresha/Phorest/Booksy/Timely depending on what you use.",
  ].join("\n");
}

function restaurantReply() {
  return [
    "For restaurants/cafes, top automations are:",
    "1) Reservation confirmations + reminder SMS",
    "2) Review request automation 2 hours after visit",
    "3) Repeat-customer winback campaigns after 30 days inactive",
    "",
    "Quickest ROI is reminder + winback because it lifts repeat bookings fast.",
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

function buildReply(payload: Payload) {
  const message = (payload.message || "").toLowerCase();

  if (hasAny(message, ["hair", "hairdresser", "salon", "barber", "stylist"])) {
    return hairdresserReply();
  }

  if (hasAny(message, ["restaurant", "cafe", "food", "takeaway", "hospitality"])) {
    return restaurantReply();
  }

  if (hasAny(message, ["price", "cost", "budget"])) {
    return "Most SMBs start with a focused sprint, then scale monthly after ROI is proven. If you share your industry + team size, I’ll recommend the most cost-effective first automation.";
  }

  if (hasAny(message, ["lead", "sales", "inquiry"])) {
    return "Top 3 lead automations: instant inquiry triage + routing, auto follow-up sequences, and call-booking qualification. Want me to tailor this to your actual channel mix (web, IG, WhatsApp, phone)?";
  }

  if (hasAny(message, ["support", "customer"])) {
    return "For support teams: ticket categorization, draft replies for repetitive issues, and escalation rules. This usually reduces response time 30-50%.";
  }

  if (hasAny(message, ["admin", "ops", "operations"])) {
    return "Best ops automations: intake-to-task workflow, document/data syncing, and status update automation. These typically save 10-20 hours/week in small teams.";
  }

  // If user asks follow-up and we already gave a generic answer, avoid repeating same text.
  if (hasAny(message, ["anything else", "what else", "more", "another"])) {
    return "Yes — next layer is retention automation: reactivation campaigns, review requests, and VIP reminders. If you share your business type, I’ll give you a concrete 14-day rollout.";
  }

  return genericTop3();
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Payload;

    if (payload.event === "lead_capture") {
      const leadName = payload.lead?.name?.trim();
      const leadEmail = payload.lead?.email?.trim();

      return NextResponse.json({
        reply: leadEmail
          ? `Perfect${leadName ? `, ${leadName}` : ""} — got your details. Tell me your business type and I’ll send your top 3 automation opportunities.`
          : "Thanks — share your email and I’ll send your top 3 automation opportunities.",
      });
    }

    const message = payload.message?.trim() || "";
    if (!message) {
      return NextResponse.json({
        reply: "Tell me your business type (e.g., salon, clinic, agency, trades) and I’ll recommend your top 3 automations.",
      });
    }

    return NextResponse.json({ reply: buildReply(payload) });
  } catch {
    return NextResponse.json({ reply: "Temporary issue. Please try again." }, { status: 500 });
  }
}
