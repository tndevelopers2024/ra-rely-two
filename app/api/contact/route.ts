import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

// Recipients stay on the server and cannot be overridden by submissions.
const recipients = ['info@relyadvisory.com.au', 'rogerm@relyadvisory.com.au'];
const submissionSchema = z.object({
  form: z.enum(['contact', 'review']).default('contact'),
  name: z.string().trim().min(1).max(200),
  business: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(100).optional(),
  type: z.string().trim().max(200).optional(),
  message: z.string().trim().max(5000).optional(),
  employees: z.string().trim().max(100).optional(),
  accounting_system: z.string().trim().max(200).optional(),
  interest: z.string().trim().max(200).optional(),
  challenge: z.string().trim().max(5000).optional(),
  consent: z.literal('on').optional(),
}).superRefine((data, ctx) => {
  if (data.form === 'contact' && !data.message) {
    ctx.addIssue({ code: 'custom', path: ['message'], message: 'Message is required.' });
  }
  if (data.form === 'review' && !data.consent) {
    ctx.addIssue({ code: 'custom', path: ['consent'], message: 'Consent is required.' });
  }
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }
  if (body && typeof body === 'object' && 'website' in body && body.website) {
    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  }
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Please complete the required fields with a valid email address.' }, { status: 400 });
  }
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  const port = Number(process.env.SMTP_PORT || '587');
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !Number.isInteger(port) || port < 1 || port > 65535) {
    return NextResponse.json({ success: false, error: 'We could not send your enquiry. Please call +61 433 250 700.' }, { status: 503 });
  }
  const data = parsed.data;
  const fields: [string, string | undefined][] = [
    ['Name', data.name], ['Business', data.business], ['Email', data.email],
    ['Phone', data.phone], ['Enquiry type', data.type], ['Message', data.message],
    ['Employees', data.employees], ['Accounting system', data.accounting_system],
    ['Area of interest', data.interest], ['Current challenge', data.challenge],
    ['Consent to contact', data.consent ? 'Yes' : undefined],
  ];
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const result = await transporter.sendMail({
      from: SMTP_FROM,
      to: recipients,
      replyTo: data.email,
      subject: data.form === 'review' ? 'New operations review request — Rely website' : 'New enquiry — Rely website',
      text: fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join('\n\n'),
    });
    if (!recipients.every(recipient => result.accepted.some(address => String(address).toLowerCase() === recipient))) {
      throw new Error('SMTP did not accept all enquiry recipients.');
    }
    return NextResponse.json({ success: true, message: 'Your enquiry has been sent.' });
  } catch {
    console.error('Contact form SMTP delivery failed.');
    return NextResponse.json({ success: false, error: 'We could not send your enquiry. Please try again or call +61 433 250 700.' }, { status: 502 });
  }
}
