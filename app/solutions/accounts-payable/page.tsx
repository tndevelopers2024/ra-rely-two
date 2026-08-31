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
  title: 'Outsourced accounts payable support | Rely',
  description:
    'A controlled, visible supplier invoice and payment process: capture and coding, PO matching, approval routing, payment run preparation and supplier statement reconciliation.',
};

const covers = [
  {
    icon: 'Inbox',
    title: 'Invoice capture',
    description:
      'A single inbox for supplier invoices, captured into the ledger with the correct supplier, dates and reference, and chased when documents are missing.',
  },
  {
    icon: 'ScanLine',
    title: 'Coding & GST treatment',
    description:
      'Consistent account coding, tax codes and tracking categories applied to your chart of accounts, so the ledger and BAS working papers stay clean.',
  },
  {
    icon: 'SplitSquareHorizontal',
    title: 'Matching & validation',
    description:
      'Invoices checked against purchase orders and delivery records where they exist, with price, quantity and duplicate checks before anything moves forward.',
  },
  {
    icon: 'GitPullRequestArrow',
    title: 'Approval routing',
    description:
      'Invoices routed to the right approver against your delegation of authority, with reminders on ageing items and a full record of who approved what.',
  },
  {
    icon: 'Wallet',
    title: 'Payment run preparation',
    description:
      'Scheduled payment runs prepared for your review — batch file, remittances and a summary — ready for an authorised person to release.',
  },
  {
    icon: 'BookCheck',
    title: 'Supplier statement reconciliation',
    description:
      'Monthly reconciliation of key supplier statements to the ledger, so missed credits, misapplied payments and unbilled amounts are found early.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Supplier query handling',
    description:
      'A consistent point of contact for supplier payment queries, freeing your team from chasing remittances and answering "has this been paid".',
  },
  {
    icon: 'FileClock',
    title: 'Month-end & EOFY support',
    description:
      'Accruals lists, cut-off checks and a tidy payables ledger at period end, with supporting schedules your accountant can rely on.',
  },
];

const controls = [
  {
    icon: 'ShieldCheck',
    title: 'Preparation separated from authorisation',
    description:
      'Rely prepares; your authorised people approve and release payment. The two never sit with the same person.',
  },
  {
    icon: 'Copy',
    title: 'Duplicate & anomaly checks',
    description:
      'Every invoice is screened for duplicates, round-sum amounts, bank detail changes and unusual patterns before payment.',
  },
  {
    icon: 'GitPullRequestArrow',
    title: 'Delegation of authority enforced',
    description:
      'Approval thresholds follow your policy. Items above a limit route to the right level automatically, with an audit trail.',
  },
  {
    icon: 'Landmark',
    title: 'Bank detail change protocol',
    description:
      'Any change to a supplier’s bank details triggers an independent verification step before a payment is prepared.',
  },
];

const steps = [
  {
    title: 'Receive & capture',
    description:
      'Supplier invoices arrive in one monitored inbox. Each is captured into the ledger with correct coding and tax treatment, and missing documentation is requested from the supplier.',
    points: ['Central invoice inbox', 'Ledger entry & coding', 'Missing-document chasing', 'Supplier master data upkeep'],
  },
  {
    title: 'Validate & match',
    description:
      'Invoices are checked against purchase orders and delivery records where available, and screened for duplicates, price and quantity variances and supplier bank-detail changes.',
    points: ['PO & receipt matching', 'Price / quantity variance checks', 'Duplicate screening', 'Bank-detail verification'],
  },
  {
    title: 'Route for approval',
    description:
      'Each invoice is routed to the correct approver under your delegation of authority. Ageing or blocked items are followed up so nothing stalls unseen.',
    points: ['Rules-based routing', 'Escalation on ageing items', 'Full approval history', 'Hold & dispute tracking'],
  },
  {
    title: 'Prepare the payment run',
    description:
      'On the agreed schedule, Rely prepares the payment batch, remittance advices and a run summary for your review. An authorised person makes the final release.',
    points: ['Scheduled run preparation', 'Batch file & remittances', 'Run summary for sign-off', 'Release stays with your team'],
  },
  {
    title: 'Reconcile & report',
    description:
      'Payments are reconciled to the bank and ledger, key supplier statements are reconciled monthly, and a payables report shows what is owed and what is coming due.',
    points: ['Bank & ledger reconciliation', 'Supplier statement reconciliation', 'Aged payables reporting', 'Cash commitment view'],
  },
];

const stats = [
  { value: 100, suffix: '%', label: 'Invoices matched, coded and screened before approval' },
  { value: 0, suffix: ' duplicates', label: 'Duplicate and double payments designed out of the process' },
  { value: 2, suffix: '-day', label: 'Typical turnaround from approved invoice to payment-run ready' },
  { value: 5, suffix: 'th day', label: 'Aged payables report delivered each month' },
];

const faqs = [
  {
    q: 'Will Rely make payments from our bank account?',
    a: 'No. Rely prepares the payment run — the batch file, remittances and a summary — but the final review and release always sit with an authorised person in your business. We never hold payment authority.',
  },
  {
    q: 'We do not raise purchase orders. Does this still work?',
    a: 'Yes. Where there are no purchase orders we validate against quotes, contracts, prior invoices and approver confirmation. If introducing light-touch purchase controls would help, we will recommend it as part of the engagement.',
  },
  {
    q: 'How do you handle supplier bank-detail changes?',
    a: 'Any change to stored bank details is treated as high risk. It triggers an independent verification step — a call-back to a known contact — and is documented before any payment is prepared against the new details.',
  },
  {
    q: 'Can you work to our existing approval policy?',
    a: 'Yes. We configure routing and thresholds to your current delegation of authority. If you do not have one written down, we will help you document it before go-live.',
  },
];

export default function AccountsPayablePage() {
  return (
    <>
      <PageHero
        motif="payable"
        eyebrow="ACCOUNTS PAYABLE"
        title="A controlled, visible way to manage supplier payments"
        description="Rely takes the operational load of accounts payable — capture, coding, matching, approval routing, payment preparation and reconciliation — while payment authority stays firmly with your team."
        breadcrumbs={[{ name: 'Solutions', href: '/solutions' }, { name: 'Accounts Payable' }]}
        highlights={['Preparation, not authorisation', 'Duplicate-proof process', 'Aged payables you can trust']}
      />

      {/* ---- Why it matters ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="THE PROBLEM WITH INFORMAL AP"
                title="Payables quietly absorb time and create risk"
                className="mb-0"
              />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-charcoal-muted sm:text-base lg:col-span-7">
              <p>
                When invoices live in personal inboxes and approvals happen by forwarded email, the
                cost is rarely obvious. It shows up as late-payment fees, missed early-payment
                discounts, strained supplier relationships and a finance team that spends its week
                answering &ldquo;has this been paid?&rdquo;.
              </p>
              <p>
                The bigger exposure is control. Without matching, duplicate screening and a clear
                separation between who prepares a payment and who releases it, errors and fraud are
                hard to catch and harder to prove you would have caught.
              </p>
              <p>
                A structured accounts payable process removes the busywork and closes those gaps —
                without adding headcount and without handing anyone outside your business the ability
                to move money.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ---- What the service covers ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
        aria-labelledby="covers-heading"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT THE SERVICE COVERS"
            title="The full payables cycle, run to a standard"
            description="Take the whole cycle or the parts where you need capacity. Either way, the same controls and documentation apply."
          />
          <FeatureGrid features={covers} columns={4} />
        </div>
      </SectionTransition>

      {/* ---- Controls ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CONTROLS BUILT INTO DELIVERY"
            title="The safeguards are part of the process, not an add-on"
            description="These four controls operate on every invoice, every run, every period. They are what keep an outsourced payables function as tight as an in-house one."
          />
          <FeatureGrid features={controls} columns={2} />
        </div>
      </SectionTransition>

      {/* ---- How it runs ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
        aria-labelledby="steps-heading"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HOW IT RUNS"
            title="From invoice received to payment reconciled"
            description="A repeatable cycle that runs to your service calendar."
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
          <SectionHeading
            eyebrow="WHERE THE LINE SITS"
            title="What stays with your business"
            align="center"
          />
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              { icon: 'Wallet', title: 'Payment authorisation', text: 'Reviewing and releasing every payment run.' },
              { icon: 'Landmark', title: 'Banking access', text: 'Your bank portal and payment credentials stay yours.' },
              { icon: 'Handshake', title: 'Supplier relationships', text: 'Commercial terms and negotiations remain your call.' },
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
          <SectionHeading eyebrow="GOOD TO KNOW" title="Accounts payable questions" align="center" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </SectionTransition>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalloutBanner
            quote="A disciplined payables process means the business always knows what it owes, what is coming due and that every payment was checked before it left."
            variant="navy"
          />
        </div>
      </section>

      <CTASection
        title="Bring order to accounts payable"
        description="A short review of your current payables process will show where the time goes, where the control gaps are and what a first engagement would cover."
        buttonText="Book an Accounts Payable Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
