import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { CTASection } from '@/components/ui/CTASection';

export const metadata: Metadata = {
  title: 'About Rely Advisory Group',
  description:
    'Learn how Rely combines reliable finance operations, process improvement and decision-focused reporting for businesses across Australia.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        motif="about"
        eyebrow="DEPENDABLE DELIVERY. PRACTICAL ADVICE."
        title="Finance support businesses can rely on"
        description="Rely Advisory Group was created to help growing businesses bring greater structure, visibility and commercial value to their day-to-day finance operations."
      />

      <section className="pt-8 pb-16 sm:pt-10 sm:pb-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Values Grid */}
          <div className="mb-16">
            <h2 className="text-xl font-heading font-bold text-rely-navy mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Reliability',
                  desc: 'Do what has been agreed, communicate early and maintain consistent standards.',
                },
                {
                  name: 'Clarity',
                  desc: 'Simplify complex information and make responsibilities visible.',
                },
                {
                  name: 'Integrity',
                  desc: 'Protect client information, maintain scope boundaries and escalate concerns.',
                },
                {
                  name: 'Practicality',
                  desc: 'Recommend changes that fit the business, not theory alone.',
                },
                {
                  name: 'Improvement',
                  desc: 'Look for sustainable ways to reduce effort, risk and uncertainty.',
                },
              ].map((value) => (
                <div
                  key={value.name}
                  className="p-6 bg-white border border-cloud-grey-border rounded-xl hover:shadow-card hover:border-advisory-gold/30 transition-all duration-300"
                >
                  <h3 className="font-heading font-bold text-base text-rely-navy mb-2">
                    {value.name}
                  </h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-2 border-dashed border-advisory-gold bg-warm-ivory p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:gap-10 md:items-start">
              <div>
                <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-advisory-gold-dark">Experience behind Rely</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-rely-navy">Practical experience.<br />Better business insight.</h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-charcoal md:border-l md:border-advisory-gold/40 md:pl-8">
                <p>Built on years of experience across finance, forecasting, business operations, process improvement and performance reporting, Rely Advisory brings together practical commercial experience, industry benchmarking and modern reporting and analytical tools to help businesses gain greater visibility, identify opportunities and make better-informed decisions.</p>
                <p>The focus is not simply on producing numbers or reports, but on turning information into meaningful insights and practical actions that can improve the way a business operates and performs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Meet with Rely"
        description="Let's discuss how structured finance operations can support your growth."
        buttonText="Book a Discovery Conversation"
        buttonHref="/book-a-review"
      />
    </>
  );
}
