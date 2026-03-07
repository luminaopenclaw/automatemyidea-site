# AutomateMyIdea.ai – Chatbot Setup Guide (Working Version)

This is the clean, working path we used to get the website chatbot live with real AI responses.

## Stack
- Frontend: Next.js website (`src/components/ChatWidget.tsx`)
- API bridge: `src/app/api/chat/route.ts`
- AI webhook handler: `src/app/api/webhook/nova/route.ts`
- Hosting: Vercel
- AI provider: OpenRouter

## 1) Core architecture
1. Visitor sends a message in website chat widget.
2. Widget posts to `/api/chat`.
3. `/api/chat` forwards to `/api/webhook/nova` (internal fallback-safe path).
4. `/api/webhook/nova` calls OpenRouter chat completions API.
5. AI response returns to widget.

## 2) Required Vercel environment variables
Set these in **Project → Settings → Environment Variables**:

- `OPENROUTER_API_KEY` = your OpenRouter key
- `OPENROUTER_MODEL` = `openrouter/auto` (or explicit model if you prefer)
- `SITE_URL` = your production URL (e.g. `https://automatemyidea-site.vercel.app`)

Optional:
- `OPENCLAW_WEBHOOK_URL`
- `OPENCLAW_API_KEY`

## 3) Deploy flow
After changing env vars:
1. Save env vars.
2. Redeploy the latest deployment in Vercel.
3. Hard refresh browser (`Cmd+Shift+R`).

## 4) Files you should know
- Chat UI: `src/components/ChatWidget.tsx`
- Chat API bridge: `src/app/api/chat/route.ts`
- AI logic + prompt behavior: `src/app/api/webhook/nova/route.ts`
- Editable website copy/videos: `src/content/siteContent.ts`

## 5) Quick validation tests
Use live website chat and test:
- “I run a hair salon, what should I automate first?”
- “I use Fresha and get no-shows, what do you recommend?”

Expected: specific business-aware suggestions, not generic fallback text.

## 6) Notes for safe operation
- Rotate API keys if they were ever shown in screenshots or chat.
- Keep model usage monitored in OpenRouter billing dashboard.
- Keep responses concise and conversion-oriented (ask one clarifying question + CTA).

## 7) Current status baseline
- Website: live on Vercel
- Chat widget: live
- OpenRouter integration: active
- Fallback path: still present for resilience

---
If chat quality drops, first check:
1) env vars
2) deployment version
3) OpenRouter model selection
4) API key validity/balance
