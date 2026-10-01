import { Metadata } from 'next';
import { articles, getArticleBySlug, getRelatedArticles } from '@/lib/data/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CTASection } from '@/components/ui/CTASection';
import { ArrowLeft, ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import styles from './article.module.css';

type Props = {
  params: Promise<{ slug: string }>;
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

  const sections: { id: string; title: string }[] = [];
  const content = article.content.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_, attributes: string, title: string) => {
    const id = `section-${sections.length + 1}`;
    sections.push({ id, title: title.replace(/<[^>]+>/g, '') });
    return `<h2${attributes} id="${id}">${title}</h2>`;
  });

  return (
    <>
      <article className={styles.article}>
        <header className={styles.hero}>
          <div className={styles.heroPattern} aria-hidden="true" />
          <div className={styles.container}>
            <Link href="/insights" className={styles.back}><ArrowLeft size={16} /> Back to Insights</Link>
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.eyebrow}><span /> {article.category} <span className={styles.eyebrowDivider}>/</span> Rely Insights</div>
                <h1>{article.title}</h1>
                <p className={styles.summary}>{article.summary}</p>
                <div className={styles.metadata}>
                  <span><Calendar size={15} /> {article.date}</span>
                  <span><Clock size={15} /> {article.readTime}</span>
                </div>
              </div>
              <div className={styles.heroAside}>
                <BookOpen size={30} strokeWidth={1.2} />
                <p>Perspective.<br />Clarity.<br /><em>Better decisions.</em></p>
                <span>Practical guidance for<br />Australian businesses</span>
              </div>
            </div>
            <div className={styles.authorStrip}>
              <div className={styles.avatar}>{article.author.name.split(' ').map(name => name.charAt(0)).join('')}</div>
              <div><strong>{article.author.name}</strong><span>{article.author.role} · {article.author.organisation || 'Rely Advisory Group'}</span></div>
              <span className={styles.authorLabel}>THE ADVISORY PERSPECTIVE</span>
            </div>
          </div>
        </header>

        <div className={`${styles.container} ${styles.readingLayout}`}>
          <aside className={styles.sidebar}>
            <nav aria-label="Article contents" className={styles.contents}>
              <span className={styles.label}>IN THIS ARTICLE</span>
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>
              ))}
            </nav>
            <div className={styles.sidebarCta}>
              <span className={styles.label}>FROM INSIGHT TO ACTION</span>
              <h3>Make your next move a confident one.</h3>
              <p>Talk through your finance operations with our team.</p>
              <Link href="/book-a-review">Book a review <ArrowRight size={16} /></Link>
            </div>
          </aside>

          <div className={styles.readingColumn}>
            {!!article.takeaways?.length && (
              <section className={styles.takeaways} aria-labelledby="takeaways-heading">
                <div className={styles.takeawayHeader}><span className={styles.label}>THE ESSENTIALS</span><span>{article.takeaways.length} key insights</span></div>
                <h2 id="takeaways-heading">At a glance</h2>
                <ol>{article.takeaways.map((takeaway, index) => <li key={takeaway}><span>{String(index + 1).padStart(2, '0')}</span><p>{takeaway}</p></li>)}</ol>
              </section>
            )}
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: content }} />
            {!!article.tags?.length && <div className={styles.tags}><span className={styles.label}>EXPLORE THE TOPICS</span><div>{article.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>}
            <div className={styles.authorCard}>
              <div className={styles.avatar}>{article.author.name.split(' ').map(name => name.charAt(0)).join('')}</div>
              <div><span className={styles.label}>WRITTEN BY</span><h3>{article.author.name}</h3><p>{article.author.role} · {article.author.organisation || 'Rely Advisory Group'}</p></div>
              <Link href="/contact" aria-label={`Contact ${article.author.name}`}><ArrowRight size={20} /></Link>
            </div>
            <p className={styles.disclaimer}><strong>Australian General Advice Disclaimer:</strong> The information provided in this publication is for general operational guidance and educational purposes only. It does not constitute formal taxation, legal, or licensed financial product advice. Australian businesses should consult their registered Tax Agent, legal counsel, or Rely Advisory Group specialist to evaluate their specific circumstances.</p>
          </div>
        </div>

        {!!relatedArticles.length && <section className={styles.related}>
          <div className={styles.container}>
            <div className={styles.relatedHeader}><div><span className={styles.label}>KEEP EXPLORING</span><h2>A fresh perspective for your next step.</h2></div><Link href="/insights">All insights <ArrowRight size={16} /></Link></div>
            <div className={styles.relatedGrid}>{relatedArticles.map((rel, index) => (
              <Link href={`/insights/${rel.slug}`} key={rel.slug} className={styles.relatedCard}>
                <div className={styles.cardTop}><span>{rel.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{rel.title}</h3><p>{rel.summary}</p>
                <div className={styles.cardFooter}><span>{rel.readTime}</span><span>Read insight <ArrowRight size={17} /></span></div>
              </Link>
            ))}</div>
          </div>
        </section>}
      </article>
      <CTASection title="Check your finance operations resilience" description="Book a focused 30-minute review to identify your key operational pressure points and the most practical next step." buttonText="Book a Finance Operations Review" buttonHref="/book-a-review" />
    </>
  );
}
