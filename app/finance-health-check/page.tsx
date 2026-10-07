import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { HealthCheckForm } from '@/components/forms/HealthCheckForm';

export const metadata: Metadata = {
  title: 'Free finance operations health check | Rely',
  description: 'Assess the strength of your accounts payable, receivables, finance processes and management reporting in a few minutes.',
};

export default function HealthCheckPage() {
  return (
    <>
      <PageHero eyebrow="THREE-MINUTE ASSESSMENT" title="How ready is your finance operation to support growth?" description="Answer ten practical questions and receive an indicative view of process resilience, control and management visibility." align="center" />
      <section className="pt-8 pb-16 sm:pt-10 sm:pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><HealthCheckForm /></div>
      </section>
    </>
  );
}
