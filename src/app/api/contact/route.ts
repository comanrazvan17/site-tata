export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      to: process.env.CONTACT_TO!,           // unde primești tu mesajele
      from: process.env.CONTACT_FROM!,       // ex: "Formular <no-reply@atelier-mobila.ro>"
      reply_to: email,                       // ca să poți da Reply direct clientului
      subject: `Formular site - ${name}`,
      html
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
