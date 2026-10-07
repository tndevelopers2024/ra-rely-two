'use client';

import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export default function BookReviewPage() {
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
        eyebrow="FREE 30-MINUTE REVIEW"
        title="Identify the next practical improvement in your finance operation"
        description="This focused conversation helps clarify the current pressure points, the business impact and whether Rely is the right fit to assist." align="center"
      />

      <section className="pt-8 pb-16 sm:pt-10 sm:pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Sensitive data warning per content doc */}
        <div className="mb-8 p-4 bg-warm-ivory border-l-4 border-advisory-gold rounded-2xl flex items-start gap-3 text-xs text-charcoal">
          <AlertTriangle className="w-5 h-5 text-advisory-gold-dark shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-rely-navy block mb-0.5">Protect sensitive information:</strong>
            Do not submit bank details, tax file numbers, payroll files, passwords or confidential financial records through this form. Secure information-sharing arrangements will be established if an engagement proceeds.
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="bg-white border border-cloud-grey-border rounded-2xl p-8 shadow-card">
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
              Your booking request has been received. We will be in touch soon to schedule the review.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="form" value="review" />
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Jane Smith"
                  className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="business"
                  required
                  placeholder="e.g. Acme Services Pty Ltd"
                  className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@company.com.au"
                  className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                  Telephone <span className="text-xs text-charcoal-muted font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0400 000 000"
                  className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                  Number of Employees
                </label>
                <select name="employees" className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none bg-white">
                  <option value="">Select range...</option>
                  <option value="1-10">1 – 10 employees</option>
                  <option value="11-50">11 – 50 employees</option>
                  <option value="51-200">51 – 200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                  Primary Accounting System
                </label>
                <select name="accounting_system" className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none bg-white">
                  <option value="">Select system...</option>
                  <option value="Xero">Xero</option>
                  <option value="MYOB">MYOB</option>
                  <option value="QuickBooks">QuickBooks Online</option>
                  <option value="Other">Other / Spreadsheets</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                Primary Area of Interest
              </label>
              <select name="interest" className="w-full px-5 py-2.5 text-sm rounded-full border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none bg-white">
                <option value="ap">Accounts Payable Support</option>
                <option value="ar">Accounts Receivable & Cash Flow</option>
                <option value="process">Finance Process Improvement</option>
                <option value="reporting">Management Reporting & Dashboards</option>
                <option value="accountant">Accountant Practice Partnership</option>
                <option value="integrated">Full Finance Operations Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-rely-navy mb-2">
                Primary Challenge or Objective
              </label>
              <textarea
                name="challenge"
                rows={3}
                placeholder="Briefly describe what you are looking to streamline or improve..."
                className="w-full px-5 py-3.5 text-sm rounded-2xl border border-cloud-grey-border focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold outline-none resize-y"
              />
            </div>

            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                className="mt-1 rounded-xs text-rely-navy focus:ring-advisory-gold"
              />
              <label htmlFor="consent" className="text-xs text-charcoal-muted leading-relaxed">
                I understand that submitting this enquiry does not create a client relationship and confirm no confidential bank passwords, TFNs, or sensitive financial documents are attached.
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting} variant="primary" size="lg" className="w-full justify-center">
              {isSubmitting ? 'Submitting...' : 'Book My Free Review'}
            </Button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}
