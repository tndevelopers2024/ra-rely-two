'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setIsSubmitting(true);
    setStatus('idle');
    setError('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), website: data.get('website'), consent: true }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setStatus('error');
        setError(result.error || 'We could not send your signup request. Please try again.');
      } else {
        setStatus('success');
        form.reset();
      }
    } catch {
      setStatus('error');
      setError('A network error occurred. Please try again.');
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <label htmlFor="footer-newsletter" className="block font-heading text-[11px] uppercase tracking-widest font-semibold text-advisory-gold mb-2.5">Finance Operations Notes</label>
      <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-advisory-gold/60 transition-colors">
        <input id="footer-newsletter" name="email" type="email" required maxLength={254} autoComplete="email" aria-describedby="newsletter-consent" placeholder="you@company.com.au" className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/35 outline-none" />
        <div hidden aria-hidden="true"><label htmlFor="newsletter-website">Website</label><input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" disabled={isSubmitting} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-advisory-gold px-4 py-2 font-heading text-xs font-semibold text-rely-navy transition-colors hover:bg-advisory-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"><Send className="h-3.5 w-3.5" aria-hidden="true" />{isSubmitting ? 'Sending...' : 'Join'}</button>
      </form>
      <p id="newsletter-consent" className="mt-2 text-[11px] leading-relaxed text-white/60">By selecting Join, you agree to receive occasional practical notes on AP, receivables and reporting. You can unsubscribe by replying to any newsletter.{' '}<Link href="/privacy" className="underline hover:text-white">Privacy policy</Link>.</p>
      {status === 'success' && <p role="status" className="mt-2 text-sm text-green-200">Your signup request has been sent. Rely will add you to Finance Operations Notes.</p>}
      {status === 'error' && <p role="alert" className="mt-2 text-sm text-red-200">{error}</p>}
    </div>
  );
}
