import { Metadata } from 'next';
import { articles, getArticleBySlug, getRelatedArticles } from '@/lib/data/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CTASection } from '@/components/ui/CTASection';
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle2, Tag, BookOpen, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Rely Advisory Group',
    };
  }

  return {
    title: `${article.title} | Rely Advisory Group`,
    description: article.summary || article.title,
    openGraph: {
      title: `${article.title} | Rely Advisory Group`,
      description: article.summary,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  return (
    <>
      <article className="pt-32 pb-16 sm:pt-40 sm:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb & Category */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-rely-navy hover:text-advisory-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-advisory-gold/15 text-rely-navy border border-advisory-gold/30">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-cloud-grey-border">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-rely-navy mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
              {article.summary}
            </p>

            {/* Author & Publication Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cloud-grey">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rely-navy text-advisory-gold font-bold flex items-center justify-center text-sm shadow-sm">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-rely-navy">{article.author.name}</div>
                  <div className="text-xs text-gray-500">
                    {article.author.role} • {article.author.organisation || 'Rely Advisory Group'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-advisory-gold" />
                  <span>{article.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-advisory-gold" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Executive Key Takeaways Callout Box */}
          {article.takeaways && article.takeaways.length > 0 && (
            <div className="mb-12 bg-warm-ivory/60 border-l-4 border-advisory-gold p-6 sm:p-7 rounded-r-2xl shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-advisory-gold" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-rely-navy m-0">
                  Executive Takeaways for Australian Leadership
                </h2>
              </div>
              <ul className="space-y-2.5 my-0 pl-0 list-none">
                {article.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-800 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-advisory-gold shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Body */}
          <div
            className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:text-rely-navy prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:text-rely-navy prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-rely-navy prose-a:text-advisory-gold hover:prose-a:text-rely-navy max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-cloud-grey-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5 text-advisory-gold" /> Topics:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-cloud-grey text-gray-700 px-2.5 py-1 rounded-md"
                >
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          )}

          {/* Regulatory Disclaimer */}
          <div className="mt-10 p-5 bg-cloud-grey/60 rounded-xl text-xs text-gray-600 leading-relaxed border border-cloud-grey-border">
            <strong>Australian General Advice Disclaimer:</strong> The information provided in this publication is for general operational guidance and educational purposes only. It does not constitute formal taxation, legal, or licensed financial product advice. Australian businesses should consult their registered Tax Agent, legal counsel, or Rely Advisory Group specialist to evaluate their specific circumstances.
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-cloud-grey-border">
            <div className="mb-8">
              <span className="text-xs font-mono font-bold text-advisory-gold uppercase tracking-wider block mb-1">
                Continue Reading
              </span>
              <h2 className="text-2xl font-heading font-bold text-rely-navy">
                Related Articles & Insights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  delay={idx * 0.1}
                  distance={20}
                  className="bg-white border border-cloud-grey-border p-6 rounded-2xl hover:border-advisory-gold hover:shadow-card transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-advisory-gold/10 text-rely-navy border border-advisory-gold/30 mb-3 inline-block">
                      {rel.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-rely-navy group-hover:text-advisory-gold transition-colors mb-2 line-clamp-2">
                      <Link href={`/insights/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                      {rel.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-cloud-grey flex items-center justify-between text-xs">
                    <span className="text-gray-500">{rel.readTime}</span>
                    <Link
                      href={`/insights/${rel.slug}`}
                      className="font-semibold text-rely-navy inline-flex items-center gap-1 group-hover:text-advisory-gold transition-colors"
                    >
                      Read <ArrowRight className="w-3.5 h-3.5 text-advisory-gold group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </article>

      <CTASection
        title="Check your finance operations resilience"
        description="Book a focused 30-minute review to identify your key operational pressure points and the most practical next step."
        buttonText="Book a Finance Operations Review"
        buttonHref="/book-a-review"
      />
    </>
  );
}
