import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";

// Email is sent from a Node runtime (nodemailer isn't Edge-compatible).
export const runtime = "nodejs";

/**
 * Discovery-session capture endpoint (arch §2, §13).
 *
 * 1. Validates with the shared Zod schema.
 * 2. Emails the lead via SMTP (nodemailer) when SMTP_USER + SMTP_PASS are set —
 *    delivered to CONTACT_TO (defaults to the current test inbox).
 * 3. Optionally forwards to CONTACT_WEBHOOK_URL (CRM / Slack / scheduler).
 * 4. Always logs the lead so nothing is lost when nothing is configured yet.
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
  const submittedAt = new Date().toISOString();

  try {
    let delivered = false;

    // ── 1. Email delivery via SMTP ──────────────────────────────────────────
    const { SMTP_USER, SMTP_PASS } = process.env;
    if (SMTP_USER && SMTP_PASS) {
      const port = Number(process.env.SMTP_PORT ?? 465);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.gmail.com",
        port,
        secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const to = process.env.CONTACT_TO ?? "yachamaneniramcharan49@gmail.com";
      await transporter.sendMail({
        from: `"NovaCrystara Website" <${SMTP_USER}>`,
        to,
        replyTo: `"${lead.name}" <${lead.email}>`,
        subject: `New discovery-session request — ${lead.name}`,
        text: toText(lead, submittedAt),
        html: toHtml(lead, submittedAt),
      });
      delivered = true;
    }

    // ── 2. Optional webhook forward (CRM / Slack / scheduler) ────────────────
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, source: "novacrystara.com", submittedAt }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      delivered = true;
    }

    // ── 3. Nothing configured — log so the lead is never lost ────────────────
    if (!delivered) {
      console.warn(
        "[contact] No SMTP_USER/SMTP_PASS (or CONTACT_WEBHOOK_URL) set — email NOT sent. Lead:",
        { ...lead, submittedAt },
      );
    }
  } catch (err) {
    console.error("[contact] failed to deliver lead:", err);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

// ── Email body builders ────────────────────────────────────────────────────
function toText(lead: ContactInput, submittedAt: string): string {
  return [
    "New discovery-session request",
    "──────────────────────────────",
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Phone:   ${lead.phone}`,
    `Company: ${lead.company || "—"}`,
    "",
    "Goal / message:",
    lead.message,
    "",
    `Submitted: ${submittedAt}`,
    "Source: novacrystara.com",
  ].join("\n");
}

function toHtml(lead: ContactInput, submittedAt: string): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 16px;color:#6b7280;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 16px;color:#111827;font:400 15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;">${escapeHtml(value)}</td>
    </tr>`;

  return `
  <div style="background:#f4f7f4;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3eae3;">
      <div style="background:#000000;padding:22px 24px;">
        <p style="margin:0;color:#7ed98d;font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.2em;">Discovery session</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font:700 20px/1.3 -apple-system,Segoe UI,Roboto,sans-serif;">New discovery-session request</h1>
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Name", lead.name)}
        ${row("Email", lead.email)}
        ${row("Phone", lead.phone)}
        ${row("Company", lead.company || "—")}
      </table>
      <div style="padding:8px 16px 20px;">
        <p style="margin:0 0 6px;color:#6b7280;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;text-transform:uppercase;letter-spacing:.08em;">Goal / message</p>
        <p style="margin:0;color:#111827;font:400 15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
      </div>
      <div style="border-top:1px solid #e3eae3;padding:14px 16px;color:#9ca3af;font:400 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;">
        Submitted ${escapeHtml(submittedAt)} · novacrystara.com
      </div>
    </div>
  </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
