import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";

/**
 * Discovery-session capture endpoint (arch §2, §13).
 * Validates with the shared Zod schema, then forwards to CONTACT_WEBHOOK_URL if configured
 * (e.g. a scheduler/CRM/Slack webhook). Without the env var it accepts and logs the lead so
 * the form is fully functional in development.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, source: "novacrystara.ai", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      // No endpoint configured yet — log so nothing is lost during development.
      console.info("[contact] discovery-session lead received:", lead);
    }
  } catch (err) {
    console.error("[contact] failed to forward lead:", err);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
