export * from './types';
import { Article } from './types';
import { article as outsourceAccountsPayable } from './outsource-accounts-payable';
import { article as sevenSignsReceivables } from './seven-signs-receivables-weakening-cash-flow';
import { article as bookkeeperAccountant } from './bookkeeper-accountant-finance-operations-partner';
import { article as practicalFramework } from './practical-framework-documenting-finance-processes';
import { article as fiveFinancialDashboards } from './five-financial-dashboards-sme-financial-visibility';
import { article as navigatingSuper } from './navigating-superannuation-guarantee-payday-super-compliance';
import { article as privacyAct } from './privacy-act-reforms-australian-sme-finance-data-security';
import { article as fairWork } from './fair-work-compliance-payroll-risk-audit-guide';
import { article as workingCapital } from './working-capital-management-high-interest-rate-australia';
import { article as basReadiness } from './bas-readiness-checklist-australian-businesses';
import { article as auditReady } from './audit-ready-finance-year-end-preparation';

const allArticles: Article[] = [
  basReadiness,
  auditReady,
  fiveFinancialDashboards,
  navigatingSuper,
  fairWork,
  practicalFramework,
  workingCapital,
  privacyAct,
  outsourceAccountsPayable,
  sevenSignsReceivables,
  bookkeeperAccountant,
];

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// Article dates are stored as "DD Month YYYY" (e.g. "05 November 2026").
function articleTime(date: string): number {
  const [day, month, year] = date.trim().split(/\s+/);
  const monthIndex = MONTHS.indexOf(month?.toLowerCase());
  if (monthIndex === -1) throw new Error(`Invalid article date: "${date}"`);
  return Date.UTC(Number(year), monthIndex, Number(day));
}

// Newest first.
export const articles: Article[] = [...allArticles].sort((a, b) => articleTime(b.date) - articleTime(a.date));

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((a) => a.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
