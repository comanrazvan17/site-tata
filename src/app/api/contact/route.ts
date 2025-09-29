export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// validare simplă
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const html = `
      <h2>Nou mesaj din formular</h2>
      <p><b>Nume:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Telefon:</b> ${phone || '-'}</p>
      <p><b>Mesaj:</b><br/>${(message || '').replace(/\n/g, '<br/>')}</p>
    `;

    // payload de bază
    const payload: any = {
      from: process.env.CONTACT_FROM!,  // ex: "Formular <no-reply@atelier-mobila.ro>"
      to: process.env.CONTACT_TO!,      // unde primești tu mesajele
      subject: `Formular site - ${name}`,
      html,
    };

    // adaugă reply_to doar dacă e adresă validă
    if (isEmail(email)) {
      payload.reply_to = email;         // v6: reply_to (nu replyTo)
    }

    await resend.emails.send(payload);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Email error:', e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
