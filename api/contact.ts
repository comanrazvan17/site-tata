import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET -> nu mai crapă, răspunde corect
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawBody = req.body;
    const body = typeof rawBody === "string" ? JSON.parse(rawBody) : (rawBody || {});
    const { name, email, phone, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Completează numele, emailul și mesajul." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email invalid." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from =
      process.env.CONTACT_FROM ||
      "Atelier Mobilă <contact@send.mobila-pe-comanda.ro>";

    if (!apiKey) {
      return res.status(500).json({ error: "Lipsește RESEND_API_KEY în Vercel." });
    }
    if (!to) {
      return res.status(500).json({ error: "Lipsește CONTACT_TO în Vercel." });
    }

    const resend = new Resend(apiKey);

    const subject = `Mesaj nou de pe site – ${name}`;
    const text = [
      `Nume: ${name}`,
      `Email: ${email}`,
      `Telefon: ${phone || "-"}`,
      "",
      "Mesaj:",
      message,
    ].join("\n");

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6">
  <h2>Mesaj nou de pe site</h2>
  <p><b>Nume:</b> ${escapeHtml(name)}</p>
  <p><b>Email:</b> ${escapeHtml(email)}</p>
  <p><b>Telefon:</b> ${escapeHtml(phone || "-")}</p>
  <hr/>
  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`;

    const resp = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (resp.error) {
      return res.status(500).json({ error: resp.error.message || "Eroare Resend." });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}
