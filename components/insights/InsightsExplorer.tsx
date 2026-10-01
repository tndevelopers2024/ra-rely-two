'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/data/articles/types';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface InsightsExplorerProps {
  articles: Article[];
}

export const InsightsExplorer: React.FC<InsightsExplorerProps> = ({ articles }) => {
  return (
    <div>
      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cloud-grey/50 rounded-2xl border border-dashed border-cloud-grey-border">
          <BookOpen className="w-10 h-10 text-advisory-gold mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-rely-navy mb-1">No articles found</h3>
          <p className="text-sm text-gray-600 mb-4">
            There are currently no articles available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((art, idx) => (
            <Reveal
              key={art.slug}
              delay={(idx % 3) * 0.08}
              distance={24}
              scale
              start="top 92%"
              className="h-full"
            >
              <Link
                href={`/insights/${art.slug}`}
                aria-labelledby={`insight-title-${art.slug}`}
                className="h-full cursor-pointer active:bg-warm-ivory/40 bg-white border border-cloud-grey-border p-6 rounded-2xl hover:border-advisory-gold hover:shadow-card focus-visible:border-advisory-gold transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Header Meta: Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-advisory-gold/10 text-rely-navy border border-advisory-gold/30">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                      <Clock className="w-3 h-3 text-advisory-gold" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 id={`insight-title-${art.slug}`} className="font-heading font-bold text-lg text-rely-navy group-hover:text-advisory-gold transition-colors mb-3 leading-snug">
                    {art.title}
                  </h3>

                  {/* Summary Excerpt */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {art.summary}
                  </p>

                  {/* Tags */}
                  {art.tags && art.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {art.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-[10px] text-gray-600 bg-cloud-grey px-2 py-0.5 rounded font-mono"
                        >
                          #{tag.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Author & Link */}
                <div className="pt-4 border-t border-cloud-grey flex items-center justify-between">
                  <div className="text-[11px] text-gray-500">
                    <span>{art.date}</span>
                  </div>
                  <span
                    className="text-xs font-semibold text-rely-navy inline-flex items-center gap-1 group-hover:text-advisory-gold transition-colors"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5 text-advisory-gold group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};
