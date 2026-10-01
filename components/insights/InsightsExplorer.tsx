'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/data/articles/types';
import { ArrowRight, Clock, Calendar, Search, Tag, BookOpen, Filter } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface InsightsExplorerProps {
  articles: Article[];
}

export const InsightsExplorer: React.FC<InsightsExplorerProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = ['All'];
    articles.forEach((art) => {
      if (art.category && !cats.includes(art.category)) {
        cats.push(art.category);
      }
    });
    return cats;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'All' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.tags?.some((t) => t.toLowerCase().includes(q)) ||
        art.category?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search and Category Filter Controls */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-advisory-gold uppercase bg-advisory-gold/10 px-3 py-1 rounded-full border border-advisory-gold/30">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Available
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, regulations, Power BI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-cloud-grey-border rounded-xl text-rely-navy placeholder-gray-400 focus:outline-none focus:border-advisory-gold focus:ring-1 focus:ring-advisory-gold transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-rely-navy"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === 'All'
                ? articles.length
                : articles.filter((a) => a.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-rely-navy text-white shadow-sm'
                    : 'bg-cloud-grey text-gray-700 hover:bg-cloud-grey-border hover:text-rely-navy'
                }`}
              >
                {cat} <span className={`text-[10px] ml-1 ${isActive ? 'text-advisory-gold font-bold' : 'text-gray-400'}`}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cloud-grey/50 rounded-2xl border border-dashed border-cloud-grey-border">
          <BookOpen className="w-10 h-10 text-advisory-gold mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-rely-navy mb-1">No articles found</h3>
          <p className="text-sm text-gray-600 mb-4">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-advisory-gold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art, idx) => (
            <Reveal
              key={art.slug}
              delay={(idx % 3) * 0.08}
              distance={24}
              scale
              start="top 92%"
              className="bg-white border border-cloud-grey-border p-6 rounded-2xl hover:border-advisory-gold hover:shadow-card transition-all flex flex-col justify-between group"
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
                <h3 className="font-heading font-bold text-lg text-rely-navy group-hover:text-advisory-gold transition-colors mb-3 leading-snug">
                  <Link href={`/insights/${art.slug}`}>{art.title}</Link>
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
                  <span className="font-semibold text-rely-navy">{art.author.name}</span>
                  <span className="mx-1">•</span>
                  <span>{art.date}</span>
                </div>
                <Link
                  href={`/insights/${art.slug}`}
                  className="text-xs font-semibold text-rely-navy inline-flex items-center gap-1 group-hover:text-advisory-gold transition-colors"
                >
                  Read <ArrowRight className="w-3.5 h-3.5 text-advisory-gold group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};
