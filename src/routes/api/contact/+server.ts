import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const TO_EMAIL = 'wilmer.lapuz@gmail.com';
const FROM_EMAIL = 'onboarding@wilmerlapuz.com';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!resend) {
      console.warn('Resend API key is missing. Skipping email notification.');
      return json({ message: 'Submission received, but email notification is disabled.' }, { status: 207 });
    }

    const { error: emailError } = await resend.emails.send({
      from: `Wilmer Lapuz <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New Portfolio Contact: ${subject}`,
      text: `New contact form submission.
---
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Subject: ${subject}
---
Message:
${message}
      `
    });

    if (emailError) {
      console.error('Resend API Error:', emailError);
      return json({ message: 'Submission received, but email notification failed.' }, { status: 207 });
    }

    return json({ message: 'Submission successful!' });
  } catch (err) {
    console.error('API Route Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return json({ error: errorMessage }, { status: 500 });
  }
};
