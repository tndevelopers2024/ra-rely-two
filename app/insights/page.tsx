import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { CTASection } from '@/components/ui/CTASection';
import { articles } from '@/lib/data/articles';
import { InsightsExplorer } from '@/components/insights/InsightsExplorer';
import { Reveal } from '@/components/ui/Reveal';
import { FileCheck2, ClipboardList, BookOpen, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Finance operations insights for Australian SMEs | Rely Advisory Group',
  description:
    'Practical articles, frameworks and tools for Australian businesses covering cash flow, Power BI reporting, Fair Work compliance, Payday Super, and accounts operations.',
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
          {/* Featured Resources Section from Rely Blueprint */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cloud-grey-border">
              <div>
                <span className="text-xs font-mono font-bold text-advisory-gold tracking-wider uppercase block mb-1">
                  Practical Toolkits & Frameworks
                </span>
                <h2 className="text-2xl font-heading font-bold text-rely-navy">
                  Featured Operational Resources
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-2 sm:mt-0 max-w-md">
                Field-tested tools and diagnostic frameworks designed for Australian SMEs and accounting partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Resource 1: Health Check */}
              <Reveal
                delay={0.05}
                distance={20}
                className="bg-cloud-grey/40 border border-cloud-grey-border p-5 rounded-2xl flex flex-col justify-between hover:border-advisory-gold transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-advisory-gold/15 text-rely-navy flex items-center justify-center mb-4">
                    <FileCheck2 className="w-5 h-5 text-advisory-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-rely-navy mb-2">
                    Finance Operations Health Check
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    A 3-minute diagnostic assessment that pinpoints internal process risks, capacity bottlenecks, and reporting vulnerabilities.
                  </p>
                </div>
                <Link
                  href="/finance-health-check"
                  className="text-xs font-bold text-rely-navy inline-flex items-center gap-1.5 hover:text-advisory-gold transition-colors pt-3 border-t border-cloud-grey-border"
                >
                  Start Assessment <ArrowRight className="w-3.5 h-3.5 text-advisory-gold" />
                </Link>
              </Reveal>

              {/* Resource 2: Month-End Checklist */}
              <Reveal
                delay={0.1}
                distance={20}
                className="bg-cloud-grey/40 border border-cloud-grey-border p-5 rounded-2xl flex flex-col justify-between hover:border-advisory-gold transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-advisory-gold/15 text-rely-navy flex items-center justify-center mb-4">
                    <ClipboardList className="w-5 h-5 text-advisory-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-rely-navy mb-2">
                    Month-End Readiness Checklist
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    A structured 20-point checklist ensuring all reconciliations, suspense accounts, and ATO accruals are verified before board reporting.
                  </p>
                </div>
                <Link
                  href="/book-a-review"
                  className="text-xs font-bold text-rely-navy inline-flex items-center gap-1.5 hover:text-advisory-gold transition-colors pt-3 border-t border-cloud-grey-border"
                >
                  Request Checklist <ArrowRight className="w-3.5 h-3.5 text-advisory-gold" />
                </Link>
              </Reveal>

              {/* Resource 3: Debtor Management Playbook */}
              <Reveal
                delay={0.15}
                distance={20}
                className="bg-cloud-grey/40 border border-cloud-grey-border p-5 rounded-2xl flex flex-col justify-between hover:border-advisory-gold transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-advisory-gold/15 text-rely-navy flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-advisory-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-rely-navy mb-2">
                    Debtor Management Playbook
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    A relationship-sensitive framework for structured invoicing cadences, dispute resolution, and PPSR asset protection under Australian law.
                  </p>
                </div>
                <Link
                  href="/solutions/accounts-receivable"
                  className="text-xs font-bold text-rely-navy inline-flex items-center gap-1.5 hover:text-advisory-gold transition-colors pt-3 border-t border-cloud-grey-border"
                >
                  Explore Playbook <ArrowRight className="w-3.5 h-3.5 text-advisory-gold" />
                </Link>
              </Reveal>

              {/* Resource 4: Management Reporting Guide */}
              <Reveal
                delay={0.2}
                distance={20}
                className="bg-cloud-grey/40 border border-cloud-grey-border p-5 rounded-2xl flex flex-col justify-between hover:border-advisory-gold transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-advisory-gold/15 text-rely-navy flex items-center justify-center mb-4">
                    <BarChart3 className="w-5 h-5 text-advisory-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-rely-navy mb-2">
                    Management Reporting Guide
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    What Australian business owners and directors should demand from a commercial management pack, including 13-week cash forecasting.
                  </p>
                </div>
                <Link
                  href="/solutions/reporting-insights"
                  className="text-xs font-bold text-rely-navy inline-flex items-center gap-1.5 hover:text-advisory-gold transition-colors pt-3 border-t border-cloud-grey-border"
                >
                  View Guide <ArrowRight className="w-3.5 h-3.5 text-advisory-gold" />
                </Link>
              </Reveal>
            </div>
          </div>

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
                In-depth articles covering cash flow management, Power BI analytics, Australian regulatory updates (ATO, Fair Work, Privacy Act), and scalable finance operations.
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