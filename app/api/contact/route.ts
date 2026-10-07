import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { getMailRecipients } from '@/lib/mail-recipients';
import { formatEmailInterest, renderNotificationEmail } from '@/lib/email-template';

export const runtime = 'nodejs';

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
  const recipients = getMailRecipients('FORM_MAIL_RECIPIENTS');
  if (!recipients || !SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !Number.isInteger(port) || port < 1 || port > 65535) {
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
      html: renderNotificationEmail({
        category: data.form === 'review' ? 'Free 30-minute review' : 'Website enquiry',
        title: data.form === 'review' ? 'A new review request' : 'A new conversation',
        introduction: data.form === 'review' ? 'A visitor would like to discuss their finance operations. Their details and priorities are below.' : 'Someone has reached out through the Rely website. Here is everything you need to follow up.',
        sections: [
          { title: 'Contact details', details: [
            { label: 'Name', value: data.name }, { label: 'Business', value: data.business },
            { label: 'Email', value: data.email }, { label: 'Phone', value: data.phone },
          ] },
          { title: data.form === 'review' ? 'Review priorities' : 'Enquiry details', details: [
            { label: 'Enquiry type', value: data.type },
            { label: 'Employees', value: data.employees ? data.employees + ' employees' : undefined },
            { label: 'Accounting system', value: data.accounting_system === 'QuickBooks' ? 'QuickBooks Online' : data.accounting_system },
            { label: 'Area of interest', value: formatEmailInterest(data.interest) },
            { label: 'Consent to contact', value: data.consent ? 'Confirmed' : undefined },
          ] },
        ],
        message: data.form === 'review'
          ? { title: 'Current challenge or objective', value: data.challenge || '' }
          : { title: 'Their message', value: data.message || '' },
        replyTo: data.email,
        actionLabel: data.form === 'review' ? 'Reply about the review' : 'Reply to this enquiry',
        receivedAt: new Date(),
        footer: data.form === 'review' ? 'Submitted through Book a Review. This is a request to arrange a conversation; no appointment has been confirmed.' : 'Submitted through the Contact form on the Rely Advisory Group website.',
      }),
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
