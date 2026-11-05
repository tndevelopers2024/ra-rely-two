import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { financeJourney } from '@/lib/data/solutions';

export function FinanceJourney() {
  return (
    <section className="border-y border-cloud-grey-border bg-warm-ivory/50 py-10 sm:py-12" aria-labelledby="finance-journey-heading">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="finance-journey-heading" className="font-heading text-xl sm:text-2xl font-bold text-rely-navy mb-3">A connected finance function</h2>
        <p className="text-sm text-charcoal-muted mb-6">Connect everyday operations with readiness, insight and stronger business processes.</p>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {financeJourney.map((step, index) => (
            <li key={step.name}>
              <Link href={step.href} className="group flex h-full min-h-14 items-center gap-3 rounded-xl border border-cloud-grey-border bg-white p-4 text-sm font-semibold text-rely-navy hover:border-advisory-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-advisory-gold">
                <span className="text-advisory-gold-dark text-xs" aria-hidden="true">0{index + 1}</span>
                <span className="flex-1">{step.name}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-advisory-gold-dark" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
