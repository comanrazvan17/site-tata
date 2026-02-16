import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Completează numele, emailul și mesajul." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email invalid." });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Lipsește RESEND_API_KEY");
      return res.status(500).json({ error: "Server email not configured." });
    }

    if (!process.env.CONTACT_TO) {
      console.error("Lipsește CONTACT_TO");
      return res.status(500).json({ error: "Destinația email nu este setată." });
    }

    const to = process.env.CONTACT_TO;
    const from =
      process.env.CONTACT_FROM ||
      "Atelier Mobilă <contact@send.mobila-pe-comanda.ro>";

    const subject = `Mesaj nou de pe site – ${name}`;

    const text = `
Nume: ${name}
Email: ${email}
Telefon: ${phone || "-"}
Mesaj:
${message}
`;

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6">
  <h2>Mesaj nou de pe site</h2>
  <p><b>Nume:</b> ${escapeHtml(name)}</p>
  <p><b>Email:</b> ${escapeHtml(email)}</p>
  <p><b>Telefon:</b> ${escapeHtml(phone || "-")}</p>
  <hr/>
  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
</div>
`;

    const response = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (response.error) {
      console.error("RESEND ERROR:", response.error);
      return res.status(500).json({ error: "Trimiterea emailului a eșuat." });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
