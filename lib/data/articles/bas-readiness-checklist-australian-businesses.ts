import { Article } from './types';

export const article: Article = {
  slug: 'bas-readiness-checklist-australian-businesses',
  title: 'BAS readiness: A practical checklist before each reporting period',
  summary: 'The reconciliations, GST coding checks and supporting records that make each BAS period faster and more controlled for Australian businesses and their registered agent.',
  category: 'Compliance & Payroll',
  readTime: '3 min read',
  date: '06 November 2026',
  author: {
    name: 'Rely Advisory Group',
    role: 'Principal Consultant',
    organisation: 'Rely Advisory Group',
  },
  tags: ['BAS', 'GST', 'ATO Compliance', 'Reconciliations', 'Month-End Close'],
  takeaways: [
    'A smooth BAS starts weeks earlier, with reconciled bank accounts and clean GST coding, not on lodgement day.',
    'Most recurring BAS adjustments trace back to a few causes: missing tax invoices, incorrect GST codes, and payroll figures that do not match STP.',
    'Your registered BAS or tax agent prepares and lodges the BAS; the business is responsible for complete, accurate and well-supported records.',
  ],
  content: `
<h2>Why BAS periods feel rushed</h2>
<p>For many businesses, the Business Activity Statement is the moment the books are finally checked. Bank feeds have built up, receipts are missing and the GST codes on a quarter of transactions have never been reviewed. The result is a compressed few days of questions between the business and its accountant, and a higher chance of adjustments in the next period.</p>
<p>BAS readiness means treating the statement as the output of a routine process rather than a quarterly project. When the underlying records are reconciled and supported, preparing and reviewing the BAS becomes a much shorter conversation.</p>

<h2>Know your reporting rhythm</h2>
<p>Businesses registered for GST report monthly, quarterly or, in some cases, annually. Quarterly BAS is generally due on the 28th of the month after the quarter ends, with the October–December quarter due on 28 February. Monthly BAS is generally due on the 21st of the following month. Businesses lodging through a registered agent may have different due dates under the agent's lodgement program, so confirm your actual dates with your agent.</p>
<p>Put the dates in a shared calendar and work backwards: set an internal cut-off for reconciliations and missing documents at least a week before your agent needs the information.</p>

<h2>Reconcile before you report</h2>
<ul>
<li><strong>Bank and credit card accounts:</strong> Reconcile every account to its statement as at period end, including accounts that are rarely used.</li>
<li><strong>Clearing and suspense accounts:</strong> Investigate and clear balances that should be nil, such as payment gateway clearing or uncategorised transactions.</li>
<li><strong>Receivables and payables:</strong> Check that aged reports agree to the balance sheet and that duplicate or stale items are resolved.</li>
<li><strong>Loans and hire purchase:</strong> Agree balances to lender statements and split repayments correctly between principal and interest.</li>
</ul>
<p>An unreconciled account does not just affect the balance sheet. Missing or duplicated transactions flow straight into GST and income figures.</p>

<h2>Review GST coding, not just totals</h2>
<p>Run a transaction-level GST report for the period and scan for patterns rather than reading every line. Common issues include:</p>
<ul>
<li>GST claimed on bank fees, government charges, wages or other items that do not include GST.</li>
<li>Overseas software subscriptions coded inconsistently from month to month.</li>
<li>Capital purchases coded as everyday expenses, or the reverse.</li>
<li>Private or mixed-use expenses recorded without a business-use adjustment.</li>
<li>Sales coded as GST-free or input-taxed without a clear reason.</li>
</ul>
<p>Fix the supplier or account default where the error started so it does not repeat next period.</p>

<h2>Check that supporting records exist</h2>
<p>To claim a GST credit, a business generally needs a valid tax invoice for purchases over $82.50 including GST. Attach invoices and receipts to transactions in the accounting system rather than holding them in email inboxes. The ATO generally expects business records to be kept for five years.</p>
<p>Keep a short list of any transactions still awaiting documentation, and share it with your agent rather than leaving them for them to discover.</p>

<h2>Align payroll figures with STP</h2>
<p>Where the BAS includes PAYG withholding, the wages and withholding figures should agree with payroll reports and Single Touch Payroll data for the same period. Differences often come from pay runs processed across period ends, manual journals or payments made outside the payroll system. Reconcile these each period rather than at year end.</p>

<h2>Prepare a clean handover for your agent</h2>
<p>A short, consistent pack makes the review faster: reconciled bank statements, the GST transaction report, aged receivables and payables, the payroll summary, and a list of unusual items or questions. Your registered BAS or tax agent remains responsible for preparing and lodging the statement, but the quality of what they receive largely determines how quickly and confidently they can do it.</p>
<p>If BAS periods are consistently stressful, our <a href="/solutions/bas-readiness">BAS Readiness support</a> works alongside your registered agent to improve reconciliations, records and the processes behind them.</p>

<h2>Official guidance</h2>
<ul>
<li><a href="https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/business-activity-statements-bas">ATO: Business activity statements (BAS)</a></li>
<li><a href="https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices">ATO: Tax invoices</a></li>
<li><a href="https://www.tpb.gov.au/find-registered-tax-or-bas-agent">Tax Practitioners Board: Find a registered tax or BAS agent</a></li>
</ul>
  `,
};
