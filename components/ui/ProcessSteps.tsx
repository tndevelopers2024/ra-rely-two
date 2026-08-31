'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export interface ProcessStep {
  title: string;
  description: string;
  /** Optional short list of concrete activities under the step. */
  points?: string[];
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

/**
 * A vertical, numbered sequence with a gold spine that draws in on scroll.
 * Each step fades up in turn. Reads as "here is the path, step by step".
 */
export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps, className }) => {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className={cn('relative', className)}
    >
      {/* spine */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[27px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-advisory-gold via-advisory-gold/40 to-transparent sm:left-[31px]"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          variants={fadeInUp}
          className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6"
        >
          <div className="relative z-10 shrink-0">
            <motion.span
              className="flex h-14 w-14 items-center justify-center rounded-full border border-advisory-gold/40 bg-white font-heading text-lg font-bold text-rely-navy shadow-subtle sm:h-16 sm:w-16"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
          </div>

          <div className="pt-1.5 sm:pt-2.5">
            <h3 className="font-heading text-lg font-bold text-rely-navy sm:text-xl">
              {step.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-muted sm:text-base">
              {step.description}
            </p>
            {step.points && step.points.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {step.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-charcoal sm:text-sm"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-advisory-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default ProcessSteps;
