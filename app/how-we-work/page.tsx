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

export const metadata: Metadata = {
  title: 'How Rely delivers finance operations support | Rely',
  description:
    'A staged approach to outsourced finance operations: structured discovery, a designed service, a controlled transition and disciplined ongoing delivery with clear governance and security.',
};

const stages = [
  {
    title: 'Discover',
    description:
      'We build a clear picture of the current state — the systems, the volumes, the people, the pain points and, importantly, where responsibility currently sits and where the boundaries with your accountant fall.',
    points: [
      'Systems and access review',
      'Transaction volumes and seasonality',
      'Stakeholder and responsibility mapping',
      'Current pain points and risks',
    ],
  },
  {
    title: 'Design',
    description:
      'We define the service in writing: exactly what Rely will do, to what timetable, with which controls and approval thresholds, and how success will be measured. Nothing is left implied.',
    points: [
      'Scope and responsibility matrix',
      'Service calendar and cut-offs',
      'Approval thresholds and controls',
      'KPIs and reporting cadence',
    ],
  },
  {
    title: 'Transition',
    description:
      'A controlled handover. We document the target process, run knowledge-transfer sessions, set up access and tooling, and run a pilot or parallel period so gaps are found and closed before go-live.',
    points: [
      'Procedure documentation',
      'Knowledge-transfer sessions',
      'Access provisioning and testing',
      'Pilot or parallel run and sign-off',
    ],
  },
  {
    title: 'Deliver & improve',
    description:
      'The service runs to the calendar. Work is completed, checked and reconciled with a clear audit trail; performance is reported against the KPIs; and a continuous-improvement backlog keeps the service getting better.',
    points: [
      'Processing to the service calendar',
      'Reconciliations and exception reporting',
      'Monthly service review',
      'Continuous-improvement backlog',
    ],
  },
];

const governance = [
  {
    icon: 'UserCheck',
    title: 'A named engagement lead',
    description: 'One accountable person who knows your business, owns the relationship and chairs the service reviews.',
  },
  {
    icon: 'CalendarRange',
    title: 'Scheduled service reviews',
    description: 'A standing monthly review of performance against the KPIs, open items, upcoming changes and priorities.',
  },
  {
    icon: 'GaugeCircle',
    title: 'KPI reporting',
    description: 'Turnaround times, accuracy, reconciliation status and reporting timeliness, tracked and shared each period.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Defined escalation path',
    description: 'Agreed routes and response times for exceptions, anomalies and anything approaching a deadline.',
  },
  {
    icon: 'GitBranch',
    title: 'Change control',
    description: 'Scope changes are quoted, documented and agreed before they take effect — no silent scope creep.',
  },
  {
    icon: 'FileSignature',
    title: 'A signed-off runbook',
    description: 'The definitive record of how the service runs, updated as processes change and always current.',
  },
];

const security = [
  {
    icon: 'KeyRound',
    title: 'Least-privilege access',
    description: 'Access scoped to exactly what the role requires, reviewed regularly and removed the day it is no longer needed.',
  },
  {
    icon: 'Users2',
    title: 'Segregation of duties',
    description: 'Preparation and authorisation never sit with the same person. Payment release always stays with your team.',
  },
  {
    icon: 'Fingerprint',
    title: 'Multi-factor authentication',
    description: 'MFA enforced on every system that supports it, for every Rely user, without exception.',
  },
  {
    icon: 'Laptop',
    title: 'Managed device standards',
    description: 'Work performed on managed devices with disk encryption, screen locks and current security updates.',
  },
  {
    icon: 'Lock',
    title: 'Confidential handling',
    description: 'Client data is used only for the engagement, shared only through approved channels and never held longer than needed.',
  },
  {
    icon: 'UserMinus',
    title: 'Controlled offboarding',
    description: 'When a person rolls off your engagement, their access is revoked and confirmed the same day.',
  },
];

const onboarding = [
  {
    title: 'Weeks 1–2 · Set up',
    description:
      'Engagement letter signed, engagement lead assigned, access requested and provisioned, and the discovery review completed.',
  },
  {
    title: 'Weeks 2–4 · Document & agree',
    description:
      'Target processes documented, the service calendar and controls agreed, and the runbook drafted for your review.',
  },
  {
    title: 'Weeks 4–6 · Pilot',
    description:
      'A pilot or parallel run on real transactions, daily check-ins, and a punch-list of gaps worked to closure.',
  },
  {
    title: 'Week 6 onward · Steady state',
    description:
      'Runbook signed off, the service runs to the calendar, and the first monthly service review is scheduled.',
  },
];

const stats = [
  { value: 4, suffix: ' stages', label: 'From first conversation to steady-state delivery' },
  { value: 6, suffix: ' weeks', label: 'Typical time to a signed-off runbook and steady state' },
  { value: 5, suffix: 'th day', label: 'Management reporting delivered each month' },
  { value: 100, suffix: '%', label: 'Processes documented before they go live' },
];

const faqs = [
  {
    q: 'How much of our time does onboarding take?',
    a: 'The heaviest involvement is in the first two to three weeks — the discovery review and knowledge transfer — typically a few hours a week from the people who currently run the processes. It tapers quickly once the pilot begins.',
  },
  {
    q: 'What happens if the service is not working?',
    a: 'The monthly service review exists to catch that early. Scope, cadence and approach can be adjusted, and because engagements run on a rolling 30-day notice there is no long lock-in. On exit, you keep every procedure, template and working paper.',
  },
  {
    q: 'Can you work within our security and IT policies?',
    a: 'Yes. We align to your access model, device requirements and data-handling rules, and we can complete a vendor security questionnaire as part of onboarding.',
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes. A mutual confidentiality agreement is standard and is put in place before any client data is shared.',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        motif="work"
        eyebrow="STRUCTURED FROM THE START"
        title="A clear, controlled way to improve finance operations"
        description="Rely uses a staged approach so responsibilities, controls, communication and expected outcomes are all agreed in writing before ongoing delivery begins — and stay visible while it runs."
        breadcrumbs={[{ name: 'How We Work' }]}
        highlights={['Nothing goes live undocumented', 'Named lead, monthly reviews', 'Rolling 30-day notice']}
      />

      {/* ---- Why staged ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="WHY A STAGED APPROACH"
                title="Handing over finance work is a control event"
                className="mb-0"
              />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-charcoal-muted sm:text-base lg:col-span-7">
              <p>
                Moving a finance process to an external team is not just an operational change — it
                changes who can see what, who can do what, and where the audit trail lives. Done
                casually, it introduces exactly the risks a business is usually trying to reduce.
              </p>
              <p>
                So we treat it as a controlled transition. Every process is documented before it
                moves. Access is scoped and tested. A pilot proves the process works before it is
                relied on. And the whole service is written into a runbook that you sign off.
              </p>
              <p>
                The result is an outsourced function that is more controlled and better documented
                than the informal in-house version it replaced.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ---- The four stages ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="THE FOUR STAGES"
            title="Discover, design, transition, deliver"
            description="Each stage has a defined output and a checkpoint. We do not move to the next until the current one is signed off."
          />
          <div className="mx-auto max-w-3xl">
            <ProcessSteps steps={stages} />
          </div>
        </div>
      </SectionTransition>

      {/* ---- Governance ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="GOVERNANCE & SERVICE MANAGEMENT"
            title="How the relationship is run once it is live"
            description="Structure does not stop at go-live. These are the mechanisms that keep the service accountable and visible month to month."
          />
          <FeatureGrid features={governance} columns={3} />
        </div>
      </SectionTransition>

      {/* ---- Security ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="SECURITY & DATA HANDLING"
            title="Controls that apply to every engagement"
            description="Practical, verifiable safeguards — not a policy document nobody reads."
          />
          <FeatureGrid features={security} columns={3} />
        </div>
      </SectionTransition>

      {/* ---- Onboarding timeline ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT ONBOARDING LOOKS LIKE"
            title="A typical first six weeks"
            description="Timings flex with scope and complexity, but the shape is consistent."
          />
          <div className="mx-auto max-w-3xl">
            <ProcessSteps steps={onboarding} />
          </div>
        </div>
      </SectionTransition>

      {/* ---- Working with your accountant ---- */}
      <SectionTransition className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalloutBanner
            title="Your accountant stays in the picture"
            quote="Rely runs the operational work and the management reporting. Your registered tax and BAS agent keeps responsibility for lodgements and regulated advice. We work to their requirements, share our working papers and make period-end handovers clean."
            variant="navy"
          />
        </div>
      </SectionTransition>

      {/* ---- Stats ---- */}
      <section className="border-y border-advisory-gold/25 bg-warm-ivory py-12 sm:py-14">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <StatRow stats={stats} />
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="GOOD TO KNOW" title="How we work — questions" align="center" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </SectionTransition>

      <CTASection
        title="Start with a structured review"
        description="A focused conversation about your systems, transaction volumes and immediate priorities, and how a staged engagement would work for your business."
        buttonText="Start with a Finance Operations Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
