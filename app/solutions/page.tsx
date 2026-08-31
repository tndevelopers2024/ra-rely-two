import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionTransition } from '@/components/ui/Reveal';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { ProcessSteps } from '@/components/ui/ProcessSteps';
import { StatRow } from '@/components/ui/StatRow';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CalloutBanner } from '@/components/ui/CalloutBanner';
import { CTASection } from '@/components/ui/CTASection';
import { ArrowRight } from 'lucide-react';
import { DynIcon } from '@/components/ui/DynIcon';

export const metadata: Metadata = {
  title: 'Outsourced finance solutions for growing businesses | Rely',
  description:
    'Flexible accounts payable, receivables, finance process improvement and management reporting support. Start with one process or build an integrated finance operations service.',
};

const solutions = [
  {
    title: 'Accounts Payable Support',
    description:
      'A controlled, visible supplier invoice and payment process, from receipt and coding through approval, payment preparation and reconciliation.',
    href: '/solutions/accounts-payable',
    icon: 'CreditCard',
    points: ['Invoice capture & GST coding', 'Approval workflow routing', 'Payment run preparation', 'Statement reconciliation'],
  },
  {
    title: 'Accounts Receivable Support',
    description:
      'Consistent billing, disciplined debtor follow-up and clear collection reporting so completed work turns into banked cash sooner.',
    href: '/solutions/accounts-receivable',
    icon: 'Receipt',
    points: ['Billing schedule administration', 'Structured follow-up cycles', 'Receipt allocation', 'Debtor ageing & DSO reporting'],
  },
  {
    title: 'Finance Process Improvement',
    description:
      'A review of how work actually moves through your finance function, then a redesign that is simpler, better controlled and ready to scale.',
    href: '/solutions/process-improvement',
    icon: 'GitMerge',
    points: ['Current-state process mapping', 'Control gap assessment', 'Documented SOPs', 'System & automation tuning'],
  },
  {
    title: 'Reporting & Business Insights',
    description:
      'Management packs, KPI dashboards and short-term cash flow visibility that explain what changed, why it matters and what to do next.',
    href: '/solutions/reporting-insights',
    icon: 'BarChart3',
    points: ['Monthly management packs', 'Rolling cash flow forecast', 'Interactive Power BI dashboards', 'Commentary & actions'],
  },
];

const included = [
  {
    icon: 'UserCheck',
    title: 'A named engagement lead',
    description:
      'One accountable point of contact who knows your business, chairs the service reviews and owns the relationship end to end.',
  },
  {
    icon: 'FileText',
    title: 'Documented procedures',
    description:
      'Every task we run is written down as a standard operating procedure, version-controlled and yours to keep.',
  },
  {
    icon: 'Lock',
    title: 'Least-privilege access',
    description:
      'Scoped system access with clear segregation of duties. Payment authorisation always stays with your team.',
  },
  {
    icon: 'CalendarClock',
    title: 'A published service calendar',
    description:
      'Cut-offs, payment runs, reconciliations and reporting dates are agreed up front and visible to everyone.',
  },
  {
    icon: 'BarChart3',
    title: 'Reporting on a schedule',
    description:
      'Management reporting delivered by the fifth business day, with the same structure every period.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Defined escalation',
    description:
      'Exceptions, anomalies and approaching deadlines are escalated against an agreed path, not left to chance.',
  },
];

const shaping = [
  {
    title: 'Scope the work',
    description:
      'We map the processes in question, the systems involved, the transaction volumes and the internal capacity, then agree exactly where Rely starts and stops.',
    points: ['Systems & data review', 'Volume & complexity sizing', 'Responsibility matrix', 'Security requirements'],
  },
  {
    title: 'Run a controlled pilot',
    description:
      'We document the target process, transfer knowledge and run a short pilot so any gaps are found and closed before steady-state delivery begins.',
    points: ['Procedure drafting', 'Knowledge transfer sessions', 'Parallel or phased cut-over', 'Sign-off on the runbook'],
  },
  {
    title: 'Deliver to the calendar',
    description:
      'The service runs to the agreed timetable. Work is completed, checked and reconciled, with a clear audit trail and no surprises at period end.',
    points: ['Daily & weekly processing', 'Reconciliations to the ledger', 'Exception reporting', 'Month-end support'],
  },
  {
    title: 'Review and improve',
    description:
      'Regular service reviews track performance against what was agreed, surface improvement opportunities and adjust scope as the business changes.',
    points: ['Service review meetings', 'KPI reporting', 'Continuous improvement backlog', 'Scope adjustments'],
  },
];

const stats = [
  { value: 1, suffix: ' process', label: 'Enough to start — expand when the value is clear' },
  { value: 5, suffix: 'th day', label: 'Management pack delivered by the fifth business day' },
  { value: 100, suffix: '%', label: 'Procedures documented and handed over' },
  { value: 30, suffix: '-day', label: 'Rolling notice — no long lock-in contract' },
];

const faqs = [
  {
    q: 'Do we have to outsource the whole finance function?',
    a: 'No. Most engagements begin with a single process — usually accounts receivable or management reporting — where the pressure is greatest. Scope expands only when you have seen the value first-hand.',
  },
  {
    q: 'Will Rely replace our bookkeeper or accountant?',
    a: 'No. Rely runs finance operations and reporting. Your registered tax and BAS agent keeps responsibility for lodgements and regulated advice, and we work to their requirements.',
  },
  {
    q: 'Which systems do you work in?',
    a: 'Xero, MYOB and QuickBooks Online for the ledger, Microsoft 365 and Excel for working papers, and Power BI for dashboards. We work in your systems rather than moving you onto ours.',
  },
  {
    q: 'How is pricing set?',
    a: 'A fixed monthly fee based on transaction volumes, number of entities, process complexity, service frequency and reporting scope. It is agreed before the pilot and reviewed as volumes change.',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        motif="solutions"
        eyebrow="FLEXIBLE SCOPE. PRACTICAL OUTCOMES."
        title="Finance operations support that grows with your business"
        description="Take support for one process, or build an integrated finance operations service. Every engagement is designed around your systems, your transaction volumes, your internal capability and your priorities."
        breadcrumbs={[{ name: 'Solutions' }]}
        highlights={['Start with one process', 'Documented and handed over', 'Month-to-month once live']}
      />

      {/* ---- The four services ---- */}
      <SectionTransition className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="services-heading">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT WE RUN"
            title="Four services, one operating standard"
            description="Each can be taken on its own or combined. Whatever the scope, the controls, documentation and reporting discipline are the same."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solutions.map((item) => {
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-cloud-grey-border bg-white p-7 shadow-subtle transition-all duration-300 hover:-translate-y-1.5 hover:border-advisory-gold/55 hover:shadow-card-hover sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-advisory-gold via-advisory-gold-light to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-rely-navy text-white transition-colors duration-300 group-hover:bg-advisory-gold group-hover:text-rely-navy">
                    <DynIcon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-rely-navy">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-charcoal-muted sm:text-base">
                    {item.description}
                  </p>
                  <ul className="mb-7 grid grid-cols-1 gap-2 border-t border-cloud-grey-border/70 pt-5 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-charcoal sm:text-[13px]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-advisory-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-2 font-heading text-sm font-semibold text-rely-navy transition-colors group-hover:text-advisory-gold-dark"
                  >
                    View service details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </SectionTransition>

      {/* ---- What every engagement includes ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
        aria-labelledby="included-heading"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="THE OPERATING STANDARD"
            title="What every engagement includes"
            description="Regardless of which services you take, this is the baseline. It is what keeps an outsourced process as controlled as an in-house one."
          />
          <FeatureGrid features={included} columns={3} />
        </div>
      </SectionTransition>

      {/* ---- How an engagement is shaped ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="shaping-heading">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FROM ENQUIRY TO STEADY STATE"
            title="How an engagement is shaped"
            description="A deliberate path from first conversation to a service that runs to a calendar. Nothing goes live until the runbook is signed off."
          />
          <div className="mx-auto max-w-3xl">
            <ProcessSteps steps={shaping} />
          </div>
        </div>
      </SectionTransition>

      {/* ---- Proof row ---- */}
      <section className="border-y border-advisory-gold/25 bg-warm-ivory py-12 sm:py-14">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <StatRow stats={stats} />
        </div>
      </section>

      {/* ---- Where Rely fits ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalloutBanner
            title="Rely sits between your team and your accountant"
            quote="We take the repeatable operational load — processing, follow-up, reconciliation and reporting — so your internal people focus on the business and your accountant focuses on tax, compliance and advice."
            authorOrNote="Collaborative by design. We are briefed by your accountant and work to their standards."
            variant="ivory"
          />
        </div>
      </SectionTransition>

      {/* ---- FAQ ---- */}
      <SectionTransition className="border-t border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="BEFORE YOU ENQUIRE"
            title="Common questions"
            align="center"
          />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </SectionTransition>

      <CTASection
        title="Start with one process. Expand when the value is clear."
        description="A free finance operations review identifies where the pressure is, what a first engagement would cover and the level of support that fits."
        buttonText="Book a Finance Operations Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
