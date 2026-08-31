import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionTransition } from '@/components/ui/Reveal';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { ProcessSteps } from '@/components/ui/ProcessSteps';
import { StatRow } from '@/components/ui/StatRow';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CalloutBanner } from '@/components/ui/CalloutBanner';
import { CTASection } from '@/components/ui/CTASection';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Management reporting and Power BI dashboards | Rely',
  description:
    'Monthly management packs, KPI dashboards, rolling cash flow forecasts and decision-focused commentary that explain what changed, why it matters and what to do next.',
};

const build = [
  {
    icon: 'FileBarChart',
    title: 'Monthly management pack',
    description:
      'A consistent pack delivered by the fifth business day: profit and loss against budget, balance sheet, cash, KPIs and a written commentary.',
  },
  {
    icon: 'LayoutDashboard',
    title: 'KPI dashboards',
    description:
      'Interactive Power BI dashboards that let leaders explore the numbers themselves — by division, product, customer or job — without waiting for a report.',
  },
  {
    icon: 'Waves',
    title: 'Rolling cash flow forecast',
    description:
      'A 13-week cash forecast, refreshed on a set cadence, showing the likely position and the levers that change it.',
  },
  {
    icon: 'Presentation',
    title: 'Board & investor packs',
    description:
      'A cleaner, higher-level pack for board or investor meetings, drawn from the same validated numbers as the management pack.',
  },
  {
    icon: 'Building2',
    title: 'Department reporting',
    description:
      'Focused one-page reports for department or project leads, showing only the measures they control.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Commentary & actions',
    description:
      'Every pack includes plain-language commentary: what moved, why, what it means, and the recommended action — not just the figures.',
  },
];

const packContents = [
  'Profit and loss versus budget and prior period, with variance commentary',
  'Balance sheet with working-capital movement explained',
  'Cash position and 13-week cash flow forecast',
  'Debtor and creditor ageing with days outstanding',
  'Gross margin analysis by division, product or job',
  'KPI scorecard against targets, with trend',
  'Revenue and pipeline view where data is available',
  'One-page executive summary and recommended actions',
];

const steps = [
  {
    title: 'Define the questions',
    description:
      'We start from the decisions you actually make — pricing, hiring, capex, capacity — and work back to the small number of measures that inform them.',
    points: ['Decision-first workshop', 'KPI definitions agreed', 'Targets and thresholds set', 'Report audience mapped'],
  },
  {
    title: 'Connect the data',
    description:
      'We connect the ledger and the operational systems that hold the rest of the story, and establish a repeatable way to pull clean data each period.',
    points: ['Ledger and system connections', 'Data validation rules', 'Mapping and calculation logic', 'Refresh schedule'],
  },
  {
    title: 'Build & validate',
    description:
      'The pack and dashboards are built, then checked back to source. Numbers are reconciled and definitions locked so the same measure means the same thing every month.',
    points: ['Pack and dashboard build', 'Reconciliation to source', 'Definition sign-off', 'Prior-period restatement check'],
  },
  {
    title: 'Deliver with commentary',
    description:
      'Each period the pack lands on schedule with written commentary — the story behind the movement and the recommended action, ready for your leadership meeting.',
    points: ['Fifth-business-day delivery', 'Written variance commentary', 'Recommended actions', 'Meeting-ready format'],
  },
  {
    title: 'Review & refine',
    description:
      'We review what got used and what did not, retire measures that never drove a decision, and add the ones the business now needs as it changes.',
    points: ['Quarterly report review', 'Retire unused measures', 'Add emerging KPIs', 'Layout and cadence tuning'],
  },
];

const stats = [
  { value: 5, suffix: 'th day', label: 'Management pack delivered by the fifth business day, every month' },
  { value: 13, suffix: '-week', label: 'Rolling cash flow forecast horizon, refreshed on cadence' },
  { value: 100, suffix: '%', label: 'Reported figures reconciled to source before delivery' },
  { value: 2, prefix: '~', suffix: ' days', label: 'Internal time saved each month once reporting is handed over' },
];

const faqs = [
  {
    q: 'We already get reports from our accountant. How is this different?',
    a: 'Compliance reporting confirms what happened for tax and statutory purposes, usually well after the period. Management reporting is faster, forward-looking and built around your decisions — margin by job, cash in 13 weeks, KPIs against target — with commentary that says what to do.',
  },
  {
    q: 'Do we need Power BI licences?',
    a: 'For interactive dashboards, yes — typically Power BI Pro per viewer, or a capacity licence. We will size this with you. The monthly pack itself is delivered as a document and needs no additional licensing.',
  },
  {
    q: 'Our data is messy. Can you still build useful reporting?',
    a: 'Yes, and the build usually improves the data along the way. Where a number cannot yet be produced reliably, we say so rather than presenting something we do not trust, and we set out what it would take to get there.',
  },
  {
    q: 'Can you present the pack at our leadership meeting?',
    a: 'Yes. Rely can walk the leadership team through the pack each month, focusing the discussion on the two or three things that matter and the decisions in front of you.',
  },
];

export default function ReportingInsightsPage() {
  return (
    <>
      <PageHero
        motif="reporting"
        eyebrow="REPORTING & BUSINESS INSIGHTS"
        title="Move from financial information to business action"
        description="Rely turns ledger and operational data into management reporting that explains what changed, why it matters and what should happen next — delivered on a schedule you can plan around."
        breadcrumbs={[{ name: 'Solutions', href: '/solutions' }, { name: 'Reporting & Insights' }]}
        highlights={['Fifth-business-day pack', 'Interactive Power BI', 'Commentary, not just numbers']}
      />

      {/* ---- Why it matters ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="WHY REPORTING FALLS SHORT"
                title="Late numbers, and no clear 'so what'"
                className="mb-0"
              />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-charcoal-muted sm:text-base lg:col-span-7">
              <p>
                In many growing businesses the monthly numbers arrive three weeks after the period
                closes, in a format that has drifted over time, with no commentary. By the time they
                land, the decisions they should have informed are already made.
              </p>
              <p>
                Even when the pack is on time, it often stops at the figures. Revenue is down four
                per cent — but why, in which part of the business, and what should the leadership
                team do about it this week?
              </p>
              <p>
                Good reporting is fast, consistent and opinionated. It closes quickly, looks the
                same every month, and tells you what the numbers mean.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ---- The principle ---- */}
      <SectionTransition className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalloutBanner
            title="The Rely reporting principle"
            quote="Data becomes insight becomes recommendation. A useful report does not simply show what happened — it helps leaders decide what to do next."
            variant="ivory"
          />
        </div>
      </SectionTransition>

      {/* ---- What we build ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT WE BUILD"
            title="Reporting for every audience, from one set of numbers"
            description="The board pack, the leadership pack and the department one-pagers all trace back to the same validated figures."
          />
          <FeatureGrid features={build} columns={3} />
        </div>
      </SectionTransition>

      {/* ---- Management pack contents ---- */}
      <SectionTransition className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="INSIDE THE MONTHLY PACK"
                title="What lands on the fifth business day"
                description="A consistent structure so the leadership team always knows where to look."
                className="mb-0"
              />
            </div>
            <ul className="grid gap-3 lg:col-span-7 sm:grid-cols-2">
              {packContents.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-cloud-grey-border bg-white p-4 text-sm text-charcoal shadow-subtle"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-advisory-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionTransition>

      {/* ---- How it runs ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HOW IT RUNS"
            title="From the decisions back to the data"
            description="We design reporting from the decisions it needs to support — never by starting with whatever the system happens to export."
          />
          <div className="mx-auto max-w-3xl">
            <ProcessSteps steps={steps} />
          </div>
        </div>
      </SectionTransition>

      {/* ---- Outcomes ---- */}
      <section className="border-y border-advisory-gold/25 bg-warm-ivory py-12 sm:py-14">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <StatRow stats={stats} />
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <SectionTransition className="border-t border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="GOOD TO KNOW" title="Reporting questions" align="center" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </SectionTransition>

      <CTASection
        title="Get numbers you can act on"
        description="Book a review and we will look at your current reporting, the decisions it needs to support and what a first pack would contain."
        buttonText="Request a Reporting Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
