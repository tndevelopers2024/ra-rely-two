import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot check
    // If the hidden 'website' field is filled, silently return success 200
    if (body.website) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    }

    // Basic payload validation
    if (!body.email) {
      return NextResponse.json({ success: false, error: 'Email field is required.' }, { status: 400 });
    }

    // Basic sanitization
    const sanitizedEmail = String(body.email).trim().toLowerCase();
    
    // In a real app, you would send this to a service (e.g. Resend, SendGrid) or save it to a database
    console.log('Received contact submission:', { ...body, email: sanitizedEmail });

    // Simulate delay and return success
    await new Promise(resolve => setTimeout(resolve, 1000));
    return NextResponse.json({ success: true, message: 'Your message has been received.' });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ success: false, error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
