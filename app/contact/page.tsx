'use client';

import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Clock, ShieldCheck, Phone } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="CONTACT RELY"
        title="Let's discuss what is slowing your finance operation down"
        description="Tell us briefly what you are trying to improve. We will respond with the most appropriate next step."
        className="pb-8 sm:pb-10 lg:pb-12"
      />

      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-warm-ivory p-6 rounded-2xl border border-advisory-gold/40 space-y-4">
              <h3 className="font-heading font-bold text-lg text-rely-navy">Direct Contact</h3>
              
              <div className="space-y-3 text-sm text-charcoal">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-advisory-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-rely-navy">Email</div>
                    <div className="space-y-1 mt-1">
                      <div>
                        <span className="text-xs text-charcoal">General Enquiries: </span>
                        <a href="mailto:contact@relyadvisory.com.au" className="font-mono text-xs hover:text-advisory-gold transition-colors">contact@relyadvisory.com.au</a>
                      </div>
                      <div>
                        <span className="text-xs text-charcoal">Direct / Roger M: </span>
                        <a href="mailto:rogerm@relyadvisory.com.au" className="font-mono text-xs hover:text-advisory-gold transition-colors">rogerm@relyadvisory.com.au</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-advisory-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-rely-navy">Location</div>
                    <span className="text-sm">6 Welford Circuit, North Kellyville NSW 2155</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-advisory-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-rely-navy">Phone</div>
                    <a href="tel:0433250700" className="text-sm hover:text-advisory-gold transition-colors">0433 250 700</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-advisory-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-rely-navy">Business Hours</div>
                    <span>Monday to Friday, 9:00 AM – 5:00 PM AEST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cloud-grey rounded-2xl border border-cloud-grey-border text-xs text-charcoal-muted">
              <ShieldCheck className="w-4 h-4 text-rely-navy mb-1" />
              <strong>Confidentiality Notice:</strong> General enquiries do not require financial statements. We establish secure sharing links for active engagements.
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-cloud-grey-border shadow-subtle">
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                Your message has been received. We will get back to you shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field - invisible to users */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase text-rely-navy mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase text-rely-navy mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="business"
                    required
                    className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase text-rely-navy mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase text-rely-navy mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase text-rely-navy mb-1">
                  Enquiry Type
                </label>
                <select name="type" className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold outline-none bg-white">
                  <option>General enquiry</option>
                  <option>Accounts Payable enquiry</option>
                  <option>Accounts Receivable enquiry</option>
                  <option>Process Improvement review</option>
                  <option>Reporting & Dashboards</option>
                  <option>Accountant partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase text-rely-navy mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  className="w-full px-5 py-3.5 text-sm rounded-2xl border border-cloud-grey-border focus:border-advisory-gold outline-none resize-y"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} variant="primary" size="md" className="w-full justify-center">
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

