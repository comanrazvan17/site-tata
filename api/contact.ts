import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = (req.body || {}) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Completează numele, emailul și mesajul.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email invalid.' });
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || 'Formular <no-reply@atelier-mobila.ro>';

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'Lipsește RESEND_API_KEY în variabilele de mediu.' });
    }
    if (!to) {
      return res.status(500).json({ error: 'Lipsește CONTACT_TO în variabilele de mediu.' });
    }

    const subject = `Mesaj nou de pe site – ${name}`;
    const text = [
      `Nume: ${name}`,
      `Email: ${email}`,
      phone ? `Telefon: ${phone}` : '',
      '',
      'Mesaj:',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.55">
        <h2 style="margin:0 0 12px 0">Mesaj nou de pe site</h2>
        <p style="margin:0 0 8px 0"><strong>Nume:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px 0"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p style="margin:0 0 8px 0"><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
        <div style="margin-top:16px;padding:12px 14px;border:1px solid #eee;border-radius:10px">
          <div style="font-weight:600;margin-bottom:8px">Mesaj</div>
          <div style="white-space:pre-wrap">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      return res.status(500).json({ error: error.message || 'Eroare la trimiterea emailului.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
