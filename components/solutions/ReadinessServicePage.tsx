import Link from 'next/link';
import { CheckCircle2, ClipboardList, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { FinanceJourney } from './FinanceJourney';
import { ServiceContactCTA } from './ServiceContactCTA';

interface ReadinessServiceProps {
  service: 'bas-readiness' | 'audit-ready-finance';
  name: string;
  title: string;
  subtitle: string;
  introduction: string;
  scope: string;
  points: string[];
  cta: string;
}

export function ReadinessServicePage(props: ReadinessServiceProps) {
  const Icon = props.service === 'bas-readiness' ? ClipboardList : ShieldCheck;
  return (
    <>
      <PageHero motif={props.service === 'bas-readiness' ? 'payable' : 'process'} eyebrow="ORGANISED RECORDS. PRACTICAL SUPPORT." title={props.title} description={props.subtitle} breadcrumbs={[{ name: 'Solutions', href: '/solutions' }, { name: props.name }]} />
      <section className="py-10 sm:py-14 lg:py-16 bg-white" aria-labelledby="readiness-support-heading">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-rely-navy text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div>
            <h2 id="readiness-support-heading" className="text-2xl sm:text-3xl font-heading font-bold text-rely-navy mb-5">{props.service === 'bas-readiness' ? 'Ready for each reporting period' : 'Readiness throughout the year'}</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">{props.introduction}</p>
            <div className="rounded-2xl border border-advisory-gold/35 bg-warm-ivory/60 p-6">
              <h3 className="font-heading font-semibold text-rely-navy mb-3">Where Rely fits</h3>
              <p className="text-sm text-charcoal leading-relaxed">{props.scope}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cloud-grey-border bg-cloud-grey/40 p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-rely-navy mb-6">Typical support includes</h2>
            <ul className="space-y-5">
              {props.points.map(point => <li key={point} className="flex gap-3 text-sm sm:text-base leading-relaxed text-charcoal"><CheckCircle2 className="h-5 w-5 text-advisory-gold-dark shrink-0 mt-0.5" aria-hidden="true" /><span>{point}</span></li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="pb-12 sm:pb-16" aria-labelledby="readiness-next-step">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-cloud-grey-border bg-cloud-grey/40 p-6 sm:p-8">
            <h2 id="readiness-next-step" className="font-heading text-2xl font-bold text-rely-navy mb-3">Build a stronger finance function</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">Talk to Rely about your records, processes and the support your business needs.</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <ServiceContactCTA service={props.service}>{props.cta}</ServiceContactCTA>
              <Link href="/book-a-review" className="inline-flex min-h-11 items-center justify-center sm:justify-start font-heading text-sm font-semibold text-rely-navy underline underline-offset-4 hover:text-advisory-gold-dark">Book a Review</Link>
            </div>
          </div>
        </div>
      </section>
      <FinanceJourney />
    </>
  );
}
