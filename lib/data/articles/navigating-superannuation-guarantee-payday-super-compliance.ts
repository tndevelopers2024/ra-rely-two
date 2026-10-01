import { Article } from './types';

export const article: Article = {
  slug: 'navigating-superannuation-guarantee-payday-super-compliance',
  title: "Payday Super and STP: Practical checks for Australian employers",
  summary: "Understand the Payday Super rules from 1 July 2026 and the payroll, cash-flow and reconciliation checks Australian employers need.",
  category: 'Compliance & Payroll',
  readTime: "3 min read",
  date: '18 September 2026',
  author: {
    name: 'Rely Advisory Group',
    role: 'Principal Consultant',
    organisation: 'Rely Advisory Group',
  },
  tags: ['Payday Super', 'STP Phase 2', 'ATO Compliance', 'Superannuation Guarantee', 'Payroll Operations'],
  takeaways: [
    "From 1 July 2026, super guarantee is tied to payday rather than the previous quarterly payment cycle.",
    "Contributions generally need to reach the employee’s fund within seven business days of payday; specific exceptions can apply.",
    "Check qualifying earnings, payroll reporting and rejected contributions with your payroll provider and registered adviser."
],
  content: `
<h2>What changed from 1 July 2026?</h2>
<p>Payday Super changes how Australian employers calculate and pay super guarantee. Contributions are payable with salary and wages and generally must reach the employee’s super fund within seven business days of payday. The receipt deadline matters: submitting a payment file does not show that a fund has received it.</p>
<p>The ATO describes the calculation as 12% of qualifying earnings, subject to the applicable rules. Qualifying earnings is a new concept, so employers should check pay-item treatment with their payroll provider rather than simply reusing every previous setting.</p>
<h2>Check the payroll and payment workflow</h2>
<ul>
<li><strong>Payroll settings:</strong> Confirm that the software supports current qualifying-earnings reporting and contribution calculations.</li>
<li><strong>Employee details:</strong> Check fund and member details, including changes caused by fund mergers.</li>
<li><strong>Payment processing:</strong> Establish the provider’s processing times and allow for business days and public holidays.</li>
<li><strong>Rejected contributions:</strong> Assign someone to monitor returns, correct errors and confirm receipt.</li>
</ul>
<p>The ATO Small Business Superannuation Clearing House closed from 1 July 2026. Businesses that previously used it need a supported payment arrangement.</p>
<h2>Keep STP reporting and payment checks separate</h2>
<p>Single Touch Payroll reporting and super contribution payments are related processes, but lodging an STP report does not pay the contribution. Reconcile payroll liabilities, payment records and fund or provider confirmations for each pay cycle.</p>
<p>Retain a clear record of who reviewed the calculation, authorised the payment and followed up exceptions. Arrange backup coverage for absences.</p>
<h2>Plan the cash flow around each pay run</h2>
<p>Include super in the cash forecast alongside wages and other payroll costs. A business previously reserving cash for quarterly payments needs a different funding rhythm, especially where customer receipts are irregular.</p>
<p>Review upcoming payroll commitments before approving discretionary spending or supplier batches. Keep transition-period liabilities separate from current pay-cycle amounts.</p>
<h2>If a contribution is late</h2>
<p>Act promptly: confirm what went wrong, correct the payment and ask your registered tax adviser about the relevant super guarantee charge and reporting requirements. The rules changed with Payday Super, so older summaries of quarterly penalties or tax deductibility should not be applied automatically.</p>
<p>Some situations have extended timeframes. Check the current guidance before treating the general seven-business-day rule as universal.</p>
<h2>Official guidance</h2>
<ul>
<li><a href="https://softwaredevelopers.ato.gov.au/PaydaySuper">ATO: Payday Super system and reporting changes</a></li>
<li><a href="https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026">Fair Work Ombudsman: Payday Super rules</a></li>
</ul>
  `,
};
