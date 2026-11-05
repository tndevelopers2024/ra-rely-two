'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ContactEvent = {
  event: 'contact_cta_click';
  service: string;
  cta_location: 'service_page';
  destination: '/contact#enquiry-form';
};

export function ServiceContactCTA({ service, children }: { service: string; children: React.ReactNode }) {
  const href = '/contact#enquiry-form';
  function trackContact() {
    const event: ContactEvent = { event: 'contact_cta_click', service, cta_location: 'service_page', destination: href };
    // Queue only service context, never visitor details. A tag manager can consume this event.
    const analyticsWindow = window as Window & { dataLayer?: ContactEvent[] };
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.dataLayer.push(event);
    window.dispatchEvent(new CustomEvent('rely:contact-cta', { detail: event }));
  }
  return (
    <Link href={href} onClick={trackContact} data-service-cta={service} className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-rely-navy bg-rely-navy px-6 py-3 text-center font-heading text-sm font-semibold text-white shadow-subtle transition-colors hover:bg-advisory-gold hover:text-rely-navy hover:border-advisory-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-advisory-gold">
      <span>{children}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </Link>
  );
}
