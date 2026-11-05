import type { Metadata } from 'next';
import { ReadinessServicePage } from '@/components/solutions/ReadinessServicePage';

const title = 'BAS Readiness & Finance Support | Rely Advisory';
const description = 'Improve reconciliations, records and supporting finance information so BAS reporting periods are easier to manage with your registered agent.';
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: '/solutions/bas-readiness' },
  openGraph: { title, description, url: '/solutions/bas-readiness' },
  twitter: { title, description },
};

export default function BASReadinessPage() {
  return <ReadinessServicePage
    service="bas-readiness"
    name="BAS Readiness"
    title="BAS Readiness & Finance Support"
    subtitle="Keeping your financial records organised and ready for each reporting period."
    introduction="Rely Advisory helps businesses maintain accurate, well-organised financial records to support BAS preparation and ongoing compliance. We assist with transaction reviews, reconciliations, GST coding checks and supporting documentation so each reporting period is simpler, more controlled and easier to manage."
    scope="Our role is to improve the quality, completeness and accessibility of the underlying finance information. Where BAS preparation or lodgement is required, Rely Advisory can work alongside the client’s registered BAS or tax agent."
    points={[
      'Bank and balance-sheet reconciliations',
      'Transaction and GST coding reviews',
      'Review of missing or incomplete supporting records',
      'Preparation of organised finance information for the client’s accountant or registered agent',
      'Process improvements to reduce recurring errors and reporting delays',
    ]}
    cta="Improve your BAS readiness"
  />;
}
