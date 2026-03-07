# AutomateMyIdea.ai Website

Premium 3D marketing site built with Next.js.

## Quick docs
- Chatbot setup runbook: `docs/CHATBOT_SETUP_GUIDE.md`

## Edit Website Content Fast

Update all key content in one file:

- `src/content/siteContent.ts`

You can edit:
- headlines
- CTA copy
- offers/pricing
- metrics
- proof video URLs

## Logo Pack

Available logo variants in `/public`:
- `ami-logo.svg` (current default in header)
- `ami-logo-orbit.svg`
- `ami-logo-shield.svg`
- `ami-logo-minimal.svg`

Swap header logo in `src/app/page.tsx` by changing the `Image src`.

## Chatbot (OpenClaw Bridge)

Chat widget: `src/components/ChatWidget.tsx`  
API bridge: `src/app/api/chat/route.ts`

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set:

- `OPENCLAW_WEBHOOK_URL` (optional; if empty chat uses internal `/api/webhook/nova`)
- `OPENCLAW_API_KEY` (optional)
- `OPENROUTER_API_KEY` (recommended for real AI responses)
- `OPENROUTER_MODEL` (default `openrouter/auto`)
- `SITE_URL` (your live domain)

### Chat Flow

1. Visitor sends message in widget
2. Site posts to `/api/chat`
3. `/api/chat` forwards payload to your OpenClaw webhook
4. Webhook responds with JSON
5. Response is shown in the chat UI

### Expected Webhook Response

```json
{
  "reply": "Your best first automation is...",
  "actions": []
}
```

### Payload Sent to OpenClaw

```json
{
  "sessionId": "ami_xxx",
  "source": "website-widget",
  "event": "message",
  "systemPrompt": "...",
  "message": "user message",
  "messages": [{ "role": "user", "text": "..." }],
  "lead": { "name": "", "email": "" },
  "timestamp": "2026-..."
}
```

The widget now also supports lightweight lead capture (name/email) mid-conversation.

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build -- --webpack
```
