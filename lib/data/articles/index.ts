export * from './types';
import { Article } from './types';
import { article as outsourceAccountsPayable } from './outsource-accounts-payable';
import { article as sevenSignsReceivables } from './seven-signs-receivables-weakening-cash-flow';
import { article as bookkeeperAccountant } from './bookkeeper-accountant-finance-operations-partner';
import { article as reduceSpreadsheet } from './reduce-spreadsheet-dependence-finance-operations';
import { article as monthlyManagement } from './monthly-management-report-inclusions';
import { article as accountingFirms } from './accounting-firms-extend-operational-support';
import { article as practicalFramework } from './practical-framework-documenting-finance-processes';
import { article as fivePowerBi } from './five-power-bi-dashboards-sme-financial-visibility';
import { article as navigatingSuper } from './navigating-superannuation-guarantee-payday-super-compliance';
import { article as privacyAct } from './privacy-act-reforms-australian-sme-finance-data-security';
import { article as fairWork } from './fair-work-compliance-payroll-risk-audit-guide';
import { article as workingCapital } from './working-capital-management-high-interest-rate-australia';

export const articles: Article[] = [
  fivePowerBi,
  navigatingSuper,
  fairWork,
  practicalFramework,
  workingCapital,
  privacyAct,
  outsourceAccountsPayable,
  sevenSignsReceivables,
  bookkeeperAccountant,
  reduceSpreadsheet,
  monthlyManagement,
  accountingFirms,
];

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
