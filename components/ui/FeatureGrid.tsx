'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { LUCIDE } from '@/components/ui/lucideRegistry';

export interface Feature {
  /** Name of a lucide icon registered in lucideRegistry. */
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClass: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * A data-driven grid of icon + title + copy cards with a shared hover lift
 * and a staggered scroll-in. Used across the solutions and how-we-work pages
 * so every "what's included" block moves the same way.
 */
export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  className,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className={cn('grid grid-cols-1 gap-5 sm:gap-6', colClass[columns], className)}
    >
      {features.map((feature) => {
        const Icon = LUCIDE[feature.icon] ?? BadgeCheck;
        return (
          <motion.div
            key={feature.title}
            variants={fadeInUp}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="group relative overflow-hidden rounded-2xl border border-cloud-grey-border bg-white p-6 shadow-subtle transition-all duration-300 hover:border-advisory-gold/55 hover:shadow-card-hover sm:p-7"
          >
            {/* gold wash on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-advisory-gold/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* top accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-advisory-gold via-advisory-gold-light to-transparent transition-transform duration-500 group-hover:scale-x-100" />

            <div className="relative">
              <motion.div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-advisory-gold/25 bg-warm-ivory text-advisory-gold-dark transition-colors duration-300 group-hover:bg-rely-navy group-hover:text-advisory-gold"
                whileHover={{ rotate: -4, scale: 1.06 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <h3 className="mb-2 font-heading text-base font-bold text-rely-navy sm:text-lg">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal-muted">
                {feature.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FeatureGrid;
