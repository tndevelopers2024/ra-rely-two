'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export interface QA {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: QA[];
  /** Index open on first render, or null for all-closed. */
  defaultOpen?: number | null;
  className?: string;
}

/**
 * Accessible single-open accordion with a smooth height/opacity reveal.
 */
export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  defaultOpen = null,
  className,
}) => {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className={cn('divide-y divide-cloud-grey-border rounded-2xl border border-cloud-grey-border bg-white', className)}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={item.q} variants={fadeInUp}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cloud-grey/40 sm:px-6 sm:py-5"
              >
                <span className="font-heading text-sm font-semibold text-rely-navy sm:text-base">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-advisory-gold/40 text-advisory-gold-dark"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal-muted sm:px-6 sm:pb-6 sm:text-[15px]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FaqAccordion;
