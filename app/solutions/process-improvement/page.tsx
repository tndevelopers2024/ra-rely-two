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
  title: 'Finance process improvement and controls | Rely',
  description:
    'Map how work really moves through your finance function, remove duplicated effort, close control gaps and document repeatable procedures that scale.',
};

const looksAt = [
  {
    icon: 'Workflow',
    title: 'How work actually flows',
    description:
      'We follow real transactions end to end — not the org chart — to see where work waits, doubles back or depends on one person’s inbox.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Control gaps',
    description:
      'Where approvals are missing, duties are not separated, or reconciliations are informal — the gaps that only surface when something goes wrong.',
  },
  {
    icon: 'FileSpreadsheet',
    title: 'Spreadsheet dependence',
    description:
      'The offline workbooks holding critical logic. We identify which can move into the system, which need proper controls, and which should simply go.',
  },
  {
    icon: 'SlidersHorizontal',
    title: 'System utilisation',
    description:
      'Whether you are using what you already pay for — bank feeds, rules, approvals, recurring transactions — before adding anything new.',
  },
  {
    icon: 'Users',
    title: 'Roles & handoffs',
    description:
      'Who does what, where responsibility passes between people or teams, and where a handoff has no owner and quietly stalls.',
  },
  {
    icon: 'BookMarked',
    title: 'Documentation',
    description:
      'What is written down versus what lives in someone’s head — the practical measure of how exposed the business is to staff turnover.',
  },
];

const deliverables = [
  {
    icon: 'Map',
    title: 'Current-state process map',
    description: 'A clear picture of each process as it runs today, with timings, systems and decision points.',
  },
  {
    icon: 'ClipboardList',
    title: 'Gap & risk register',
    description: 'Every control gap, bottleneck and key-person dependency, rated and prioritised.',
  },
  {
    icon: 'Target',
    title: 'Target-state design',
    description: 'A redesigned process that is simpler, better controlled and able to absorb higher volumes.',
  },
  {
    icon: 'ListChecks',
    title: 'Controls matrix',
    description: 'The control at each step, who owns it, how often it runs and how it is evidenced.',
  },
  {
    icon: 'BookMarked',
    title: 'SOP library',
    description: 'Step-by-step standard operating procedures for every task, written to be followed by someone new.',
  },
  {
    icon: 'Wrench',
    title: 'Implementation plan',
    description: 'A sequenced plan of changes — quick wins first — with owners, effort and dependencies.',
  },
];

const steps = [
  {
    title: 'Observe',
    description:
      'We sit with the people doing the work and watch real transactions move through the process, capturing what actually happens rather than what the manual says should.',
    points: ['Walkthroughs with the team', 'Transaction sampling', 'System configuration review', 'Time and volume capture'],
  },
  {
    title: 'Map',
    description:
      'Each process is drawn out step by step — inputs, systems, decisions, handoffs and outputs — so everyone can see the full picture on one page.',
    points: ['End-to-end process maps', 'Handoff and ownership view', 'Data and document flow', 'Cycle-time analysis'],
  },
  {
    title: 'Assess',
    description:
      'We test the process against a control checklist and against your volume trajectory, producing a rated register of gaps, risks and improvement opportunities.',
    points: ['Segregation-of-duties check', 'Approval and reconciliation gaps', 'Key-person dependencies', 'Rework and duplication'],
  },
  {
    title: 'Redesign',
    description:
      'We design the target-state process — fewer steps, the right controls, more of the work inside the system — and agree it with the people who will run it.',
    points: ['Simplified step sequence', 'Controls placed by design', 'Automation and rules', 'Role and RACI clarity'],
  },
  {
    title: 'Document',
    description:
      'The new process is written up as standard operating procedures and a controls matrix, clear enough for a new starter to pick up without a handover.',
    points: ['Task-level SOPs', 'Controls matrix', 'Templates and checklists', 'Quick-reference guides'],
  },
  {
    title: 'Embed',
    description:
      'We support the rollout — training, a settling-in period and a check-back — so the improvement sticks rather than drifting back to the old way.',
    points: ['Team training', 'Supported go-live', 'Post-implementation review', 'Handover or ongoing support'],
  },
];

const stats = [
  { value: 30, suffix: '%+', label: 'Typical reduction in manual effort across a reviewed process' },
  { value: 0, suffix: ' undocumented', label: 'Critical tasks left without a written procedure' },
  { value: 1, suffix: ' page', label: 'Every process mapped clearly onto a single view' },
  { value: 100, suffix: '%', label: 'Control gaps logged, rated and given an owner' },
];

const faqs = [
  {
    q: 'Is this a one-off project or ongoing?',
    a: 'It can be either. Many clients start with a fixed-scope review of one or two processes, receive the maps, SOPs and improvement plan, and implement it themselves. Others ask Rely to implement the changes and then run the improved process.',
  },
  {
    q: 'How long does a review take?',
    a: 'A focused review of a single process — accounts payable, for example — is usually two to three weeks from kick-off to findings. A full finance-function review is scoped after an initial conversation.',
  },
  {
    q: 'Will you recommend new software?',
    a: 'Only where the current tools genuinely cannot do the job. The first step is always to use what you already have properly. If new tooling is warranted, we set out the case, the options and the effort rather than pushing a product.',
  },
  {
    q: 'What do you need from us to start?',
    a: 'Access to the relevant systems in a read-only capacity, time with the people who run the processes, and a sample of recent transactions and any existing documentation.',
  },
];

export default function ProcessImprovementPage() {
  return (
    <>
      <PageHero
        motif="process"
        eyebrow="FINANCE PROCESS IMPROVEMENT"
        title="Remove bottlenecks before they become business risks"
        description="Rely reviews how work really moves through your finance function, then redesigns it to be clearer, better controlled and easier to scale — and writes it all down so it survives a change of staff."
        breadcrumbs={[{ name: 'Solutions', href: '/solutions' }, { name: 'Process Improvement' }]}
        highlights={['Mapped end to end', 'Controls by design', 'Documented to survive turnover']}
      />

      {/* ---- Why it matters ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="HOW PROCESSES DRIFT"
                title="Nobody designed it this way. It just grew."
                className="mb-0"
              />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-charcoal-muted sm:text-base lg:col-span-7">
              <p>
                Most finance processes in a growing business were never designed. They accreted —
                a workaround here, a spreadsheet there, a step added after something went wrong and
                never removed. Each addition made sense at the time.
              </p>
              <p>
                The result is a process that works, mostly, as long as the same people are there to
                run it. It is slow at month-end, hard to hand over, and difficult to trust when
                volumes jump or someone leaves.
              </p>
              <p>
                Process improvement is not about imposing theory. It is about seeing the real
                workflow clearly, taking out the steps that no longer earn their place, and putting
                the controls and documentation where they belong.
              </p>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* ---- What we look at ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT WE LOOK AT"
            title="Six lenses on the finance function"
            description="A review covers all six. Each one tends to surface something the team already suspected but had never had time to prove."
          />
          <FeatureGrid features={looksAt} columns={3} />
        </div>
      </SectionTransition>

      {/* ---- Deliverables ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT YOU RECEIVE"
            title="Tangible outputs, not a slide deck"
            description="Every engagement leaves you with documents you can use and act on, whether or not Rely does the implementation."
          />
          <FeatureGrid features={deliverables} columns={3} />
        </div>
      </SectionTransition>

      {/* ---- How it runs ---- */}
      <SectionTransition
        className="border-y border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HOW IT RUNS"
            title="Observe, map, assess, redesign, document, embed"
            description="A disciplined sequence — the redesign only starts once we genuinely understand the current state."
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

      {/* ---- What good looks like ---- */}
      <SectionTransition className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CalloutBanner
            title="What a well-run finance process looks like"
            quote="Anyone competent can pick it up from the documentation. The controls are built into the steps, not bolted on. It runs to a calendar, absorbs a volume spike without heroics, and produces a clean audit trail as a by-product of doing the work."
            variant="navy"
          />
        </div>
      </SectionTransition>

      {/* ---- FAQ ---- */}
      <SectionTransition className="border-t border-cloud-grey-border bg-cloud-grey/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="GOOD TO KNOW" title="Process improvement questions" align="center" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </SectionTransition>

      <CTASection
        title="See your finance function clearly"
        description="Book a review and we will map one process end to end, show you where the effort and risk sit, and set out the practical improvements."
        buttonText="Book a Finance Process Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
