import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { getMailRecipients } from '@/lib/mail-recipients';
import { renderNotificationEmail } from '@/lib/email-template';

export const runtime = 'nodejs';

const signupSchema = z.object({
  email: z.string().trim().email().max(254),
  consent: z.literal(true),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Please enter a valid email address and agree to receive Finance Operations Notes.' }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ success: true });
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  const port = Number(process.env.SMTP_PORT || '587');
  const recipients = getMailRecipients();
  if (!recipients || !SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !Number.isInteger(port) || port < 1 || port > 65535) {
    return NextResponse.json({ success: false, error: 'We could not send your signup request. Please try again later.' }, { status: 503 });
  }
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
      disableFileAccess: true, disableUrlAccess: true,
    });
    const receivedAt = new Date();
    const result = await transporter.sendMail({
      from: SMTP_FROM,
      to: recipients,
      replyTo: parsed.data.email,
      subject: 'Finance Operations Notes signup request — Rely website',
      text: [
        'Please add this subscriber to Finance Operations Notes.',
        `Email: ${parsed.data.email}`,
        'Consent: The subscriber agreed to receive occasional Finance Operations Notes by selecting Join.',
        `Requested at: ${receivedAt.toISOString()}`,
        'Source: Website footer newsletter form',
      ].join('\n\n'),
      html: renderNotificationEmail({
        category: 'Finance Operations Notes',
        title: 'A new newsletter signup',
        introduction: 'Someone would like to receive practical notes from Rely. Add the address below to your mailing list.',
        sections: [{ title: 'Subscriber details', details: [
          { label: 'Email', value: parsed.data.email },
          { label: 'Consent', value: 'Agreed to receive occasional Finance Operations Notes by selecting Join.' },
          { label: 'Source', value: 'Website footer newsletter form' },
        ] }],
        replyTo: parsed.data.email,
        actionLabel: 'Contact this subscriber',
        receivedAt,
        footer: 'This is a signup request for your team to process. The subscriber can unsubscribe by replying to a newsletter.',
      }),
    });
    if (!recipients.every(recipient => result.accepted.some(address => String(address).toLowerCase() === recipient))) {
      throw new Error('SMTP did not accept all newsletter request recipients.');
    }
    return NextResponse.json({ success: true });
  } catch {
    console.error('Newsletter signup SMTP delivery failed.');
    return NextResponse.json({ success: false, error: 'We could not send your signup request. Please try again.' }, { status: 502 });
  }
}
