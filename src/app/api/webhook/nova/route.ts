import { NextResponse } from "next/server";

type Payload = {
  message?: string;
  event?: string;
  lead?: { name?: string; email?: string };
};

function buildReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("price") || text.includes("cost") || text.includes("budget")) {
    return "Great question. Most SMBs start with a focused automation sprint, then scale monthly once ROI is proven. If you share your team size + biggest bottleneck, I can suggest the best-fit option.";
  }

  if (text.includes("lead") || text.includes("sales") || text.includes("inquiry")) {
    return "Top 3 automations for lead handling: 1) instant inquiry triage + routing, 2) auto follow-up sequences, 3) call-booking qualification flow. Want me to map these to your current process?";
  }

  if (text.includes("support") || text.includes("customer")) {
    return "For support teams, highest ROI usually comes from: ticket categorization, draft responses for repetitive issues, and automated escalation rules. I can outline a 14-day rollout plan if you share your current volume.";
  }

  if (text.includes("admin") || text.includes("ops") || text.includes("operations")) {
    return "Strong ops automations to start with: intake-to-task automation, document/data syncing, and status update workflows. These typically save 20-40 hours/week for small teams.";
  }

  return "Based on what you shared, your best first step is an Automation Opportunity Map: we identify your top 3 fastest-win automations and expected ROI window. Tell me your biggest weekly bottleneck and I’ll suggest the first workflow to automate.";
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Payload;

    if (payload.event === "lead_capture") {
      const leadName = payload.lead?.name?.trim();
      const leadEmail = payload.lead?.email?.trim();

      return NextResponse.json({
        reply: leadEmail
          ? `Perfect${leadName ? `, ${leadName}` : ""} — got your details. Next, tell me your #1 bottleneck and I’ll map your first automation.`
          : "Thanks — share your email and I’ll send your top 3 automation opportunities.",
      });
    }

    const message = payload.message?.trim() || "";
    if (!message) {
      return NextResponse.json({
        reply: "Tell me your biggest bottleneck (leads, ops, support, or admin) and I’ll suggest your top 3 automation opportunities.",
      });
    }

    return NextResponse.json({ reply: buildReply(message) });
  } catch {
    return NextResponse.json({ reply: "Temporary issue. Please try again." }, { status: 500 });
  }
}
