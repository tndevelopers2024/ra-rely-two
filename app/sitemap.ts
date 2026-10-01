import { MetadataRoute } from 'next';
import { articles } from '@/lib/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://relyadvisory.com.au';
  const routes = [
    '',
    '/solutions',
    '/solutions/accounts-payable',
    '/solutions/accounts-receivable',
    '/solutions/process-improvement',
    '/solutions/reporting-insights',
    '/how-we-work',
    '/for-accountants',
    '/industries',
    '/insights',
    '/finance-health-check',
    '/about',
    '/faq',
    '/contact',
    '/book-a-review',
    '/privacy',
    '/terms',
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/solutions') ? 0.8 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
