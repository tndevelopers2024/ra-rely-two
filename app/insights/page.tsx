import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { CTASection } from '@/components/ui/CTASection';
import { articles } from '@/lib/data/articles';
import { InsightsExplorer } from '@/components/insights/InsightsExplorer';

export const metadata: Metadata = {
  title: 'Finance operations insights for Australian SMEs | Rely Advisory Group',
  description:
    'Practical articles, frameworks and tools for Australian businesses covering cash flow, dashboard reporting, Fair Work compliance, Payday Super, and accounts operations.',
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="PRACTICAL KNOWLEDGE FOR GROWING BUSINESSES"
        motif="insights"
        title="Finance operations made clearer"
        description="Plain-English guidance for Australian business owners, finance teams and accounting partners who want stronger processes, clearer reporting and better commercial decisions."
      />

      <section className="pt-10 pb-16 sm:pt-14 sm:pb-24 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Articles & Guides Section with Explorer */}
          <div>
            <div className="mb-10 sm:mb-14 lg:mb-16">
              <span className="text-xs font-mono font-bold text-advisory-gold tracking-wider uppercase block mb-2">
                Knowledge Base & Thought Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-rely-navy">
                Articles & Operational Guides for Australian Businesses
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
                In-depth articles covering cash flow management, financial analytics, Australian regulatory updates (ATO, Fair Work, Privacy Act), and scalable finance operations.
              </p>
            </div>

            <InsightsExplorer articles={articles} />
          </div>
        </div>
      </section>

      <CTASection
        title="Check your finance operations resilience"
        description="Book a focused 30-minute review to identify your key operational pressure points and the most practical next step."
        buttonText="Book a Finance Operations Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}