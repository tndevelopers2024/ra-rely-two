import type { Metadata } from 'next';
import { ReadinessServicePage } from '@/components/solutions/ReadinessServicePage';

const title = 'Audit-Ready Finance Support | Rely Advisory';
const description = 'Build organised records, stronger controls and clearer supporting documentation to reduce year-end and audit preparation pressure.';
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: '/solutions/audit-ready-finance' },
  openGraph: { title, description, url: '/solutions/audit-ready-finance' },
  twitter: { title, description },
};

export default function AuditReadyFinancePage() {
  return <ReadinessServicePage
    service="audit-ready-finance"
    name="Audit-Ready Finance"
    title="Audit-Ready Finance"
    subtitle="Better records. Stronger controls. Less year-end disruption."
    introduction="Rely Advisory helps businesses keep financial records organised, reconciled and supported throughout the year, rather than scrambling when an audit, review or year-end process arises. We improve documentation, reconciliation processes, controls and reporting so financial information is easier to retrieve, review and explain."
    scope="The service is designed to support audit and year-end readiness. Rely Advisory does not perform an independent audit or provide an audit opinion."
    points={[
      'Reconciliation schedules and supporting documentation',
      'Clear document storage and retrieval processes',
      'Review of recurring finance-process gaps',
      'Month-end and year-end close checklists',
      'Evidence trails for key transactions and balances',
      'Coordination of requested information for accountants or external auditors',
    ]}
    cta="Get your finance function audit-ready"
  />;
}
