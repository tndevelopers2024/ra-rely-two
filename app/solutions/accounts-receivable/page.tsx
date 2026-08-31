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
import { DynIcon } from '@/components/ui/DynIcon';

export const metadata: Metadata = {
  title: 'Accounts receivable and collections support | Rely',
  description:
    'Consistent billing, disciplined debtor follow-up, accurate receipt allocation and clear collection reporting so completed work turns into banked cash sooner.',
};

const covers = [
  {
    icon: 'FileText',
    title: 'Billing accuracy',
    description:
      'Invoices raised from your agreed rates, contracts and job data — correct amounts, correct GST, correct references — so they are not disputed on a technicality.',
  },
  {
    icon: 'Send',
    title: 'Prompt issue & delivery',
    description:
      'Invoices issued on a set cycle and delivered to the right contact, with confirmation of receipt so the clock actually starts.',
  },
  {
    icon: 'BellRing',
    title: 'Structured follow-up',
    description:
      'A defined reminder cadence — before due, at due, and past due — delivered courteously and consistently, with a record of every contact.',
  },
  {
    icon: 'Banknote',
    title: 'Receipt allocation',
    description:
      'Payments matched to invoices daily, part-payments and remittances handled correctly, and the debtors ledger kept clean.',
  },
  {
    icon: 'MessageSquareText',
    title: 'Dispute & short-payment tracking',
    description:
      'Queries and deductions logged, routed to the right person in your team and tracked to resolution rather than left to age.',
  },
  {
    icon: 'Gauge',
    title: 'Debtor reporting & DSO',
    description:
      'Aged receivables, days sales outstanding and collection-risk reporting each month, with the movements explained.',
  },
  {
    icon: 'Scale',
    title: 'Credit control support',
    description:
      'Support applying your credit terms and limits — new-account checks, terms on file, stop-supply flags — with decisions staying with you.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Month-end & EOFY',
    description:
      'Reconciled debtors ledger, provision for doubtful debts schedule and clean cut-off, ready for your accountant.',
  },
];

const steps = [
  {
    title: 'Bill accurately',
    description:
      'Invoices are prepared from your rate cards, contracts and job or timesheet data, checked for amount, tax treatment and purchase-order references before they go out.',
    points: ['Rates & contract data', 'GST and reference checks', 'Purchase-order matching', 'Approval where required'],
  },
  {
    title: 'Issue promptly',
    description:
      'Invoices are issued on a fixed cycle — not whenever someone gets to it — and delivered to the correct billing contact with delivery confirmed.',
    points: ['Set billing calendar', 'Correct recipient on file', 'Delivery confirmation', 'Portal submission where needed'],
  },
  {
    title: 'Follow up on cadence',
    description:
      'A consistent sequence of reminders runs from before the due date through to overdue, in your business’s voice, with every call and email logged against the account.',
    points: ['Pre-due courtesy reminder', 'At-due and overdue steps', 'Statements and call notes', 'Promise-to-pay tracking'],
  },
  {
    title: 'Allocate & reconcile',
    description:
      'Receipts are matched to invoices daily, unapplied cash is cleared quickly and the debtors ledger is reconciled to the bank so the ageing is always accurate.',
    points: ['Daily cash matching', 'Unapplied-cash clearance', 'Bank reconciliation', 'Credit note management'],
  },
  {
    title: 'Report & escalate',
    description:
      'Each month you get aged receivables, DSO and a watchlist of at-risk accounts, with anything that needs a commercial decision escalated to you against an agreed path.',
    points: ['Aged debtor pack', 'DSO trend & commentary', 'At-risk account watchlist', 'Escalation for decisions'],
  },
];

const stats = [
  { value: 14, suffix: ' days', label: 'Typical reduction in average collection time within two quarters' },
  { value: 1, suffix: '-day', label: 'Invoices issued within one business day of being ready to bill' },
  { value: 100, suffix: '%', label: 'Overdue accounts on a defined, logged follow-up cycle' },
  { value: 5, suffix: 'th day', label: 'Aged receivables and DSO reporting delivered each month' },
];

const faqs = [
  {
    q: 'Is Rely a debt collection agency?',
    a: 'No. Rely runs disciplined, courteous receivables administration and early-stage follow-up that protects your customer relationships. Formal debt recovery, legal action and mercantile agents remain the domain of appropriately licensed providers, engaged by you when a matter escalates.',
  },
  {
    q: 'Who decides credit limits and whether to stop supply?',
    a: 'You do. Rely maintains the terms, limits and account status you set, applies them consistently and flags accounts that breach them. Commercial decisions — extending credit, pausing supply, writing off — stay with your business.',
  },
  {
    q: 'Will customers know they are dealing with an outsourced team?',
    a: 'Communication goes out in your business’s name, from your domain, in a tone agreed with you. To your customers it is simply a well-run accounts team.',
  },
  {
    q: 'We invoice from job management software, not the ledger. Is that a problem?',
    a: 'No. We work from the system where your billing data lives — job management, practice management, or the ledger — and reconcile across to the accounting system.',
  },
];

export default function AccountsReceivablePage() {
  return (
    <>
      <PageHero
        motif="receivable"
        eyebrow="ACCOUNTS RECEIVABLE"
        title="Turn completed work into collected cash sooner"
        description="Rely brings consistency to the parts of receivables that usually slip — accurate billing, prompt issue, disciplined follow-up and fast allocation — so more revenue moves from the ledger into the bank."
        breadcrumbs={[{ name: 'Solutions', href: '/solutions' }, { name: 'Accounts Receivable' }]}
        highlights={['Courteous, consistent follow-up', 'Daily cash allocation', 'DSO you can act on']}
      />

      {/* ---- Why it matters ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="WHY RECEIVABLES SLIP"
                title="The revenue is earned. The cash is stuck."
                className="mb-0"
              />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-charcoal-muted sm:text-base lg:col-span-7">
              <p>
                Receivables rarely fail dramatically. They erode. An invoice goes out a few days
                late. A reminder is skipped because someone was busy. A part-payment sits unallocated
                so the ageing looks wrong. A dispute is noted but not chased.
              </p>
              <p>
                Each gap is small. Together they add weeks to your collection time, tie up working
                capital and make cash flow harder to forecast than it should be.
              </p>
              <p>
                The fix is not pressure — it is consistency. A billing calendar that is always kept,
                a follow-up sequence that always runs, and cash that is always allocated on the day
                it lands.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ---- What the service covers ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT THE SERVICE COVERS"
            title="The receivables cycle, kept to a rhythm"
            description="From raising an accurate invoice to explaining the DSO movement — the whole cycle, or the parts you need."
          />
          <FeatureGrid features={covers} columns={4} />
        </div>
      </SectionTransition>

      {/* ---- Professional approach callout ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalloutBanner
            title="A professional approach to collection"
            quote="Every contact with your customers is courteous, consistent and made in your business’s name. The goal is to be the accounts team your customers respect — firm on process, easy to deal with — not a pressure tactic that costs you the relationship."
            authorOrNote="Formal debt recovery and legal escalation stay with appropriately licensed providers, engaged by you."
            variant="ivory"
          />
        </div>
      </SectionTransition>

      {/* ---- How it runs ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HOW IT RUNS"
            title="From billable work to banked cash"
            description="A five-stage cycle that runs to your calendar, every period."
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

      {/* ---- What stays with you ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="WHERE THE LINE SITS" title="What stays with your business" align="center" />
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              { icon: 'Percent', title: 'Credit decisions', text: 'Setting terms, limits and whether to extend credit.' },
              { icon: 'Landmark', title: 'Legal recovery', text: 'Engaging recovery agents or lawyers when a matter escalates.' },
              { icon: 'Handshake', title: 'Customer relationships', text: 'Commercial conversations and negotiated settlements.' },
            ].map(({ icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-cloud-grey-border bg-cloud-grey/40 p-6 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rely-navy text-advisory-gold">
                  <DynIcon name={icon} className="h-5 w-5" />
                </div>
                <div className="font-heading text-sm font-bold text-rely-navy">{title}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-charcoal-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* ---- FAQ ---- */}
      <SectionTransition className="border-t border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="GOOD TO KNOW" title="Accounts receivable questions" align="center" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </SectionTransition>

      <CTASection
        title="Shorten the gap between invoice and payment"
        description="A short review of your billing and collections process will show where cash is getting stuck and what a first engagement would target."
        buttonText="Book an Accounts Receivable Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
