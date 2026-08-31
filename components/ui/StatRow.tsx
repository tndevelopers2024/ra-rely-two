'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { StatCounter } from '@/components/ui/StatCounter';

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

interface StatRowProps {
  stats: Stat[];
  /** 'light' on pale backgrounds, 'dark' on navy. */
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * A flat rule of animated proof points. Each figure counts up when it scrolls
 * into view. Deliberately un-boxed so it reads as a ledger line, not cards.
 */
export const StatRow: React.FC<StatRowProps> = ({
  stats,
  theme = 'light',
  className,
}) => {
  const isDark = theme === 'dark';
  return (
    <motion.dl
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className={cn(
        'grid grid-cols-2 gap-y-8 lg:grid-cols-4',
        className
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={fadeInUp}
          className={cn(
            'px-1 sm:px-6',
            i > 0 && 'lg:border-l',
            i % 2 === 1 && 'border-l pl-5 sm:pl-6 lg:pl-6',
            isDark ? 'border-white/15' : 'border-cloud-grey-border'
          )}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd
            className={cn(
              'font-heading text-2xl font-bold tabular-nums sm:text-3xl lg:text-4xl',
              isDark ? 'text-white' : 'text-rely-navy'
            )}
          >
            <StatCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          </dd>
          <span
            className={cn(
              'mt-1.5 block text-xs leading-snug sm:text-[13px]',
              isDark ? 'text-white/60' : 'text-charcoal-muted'
            )}
          >
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.dl>
  );
};

export default StatRow;
