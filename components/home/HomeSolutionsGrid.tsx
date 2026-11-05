'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { staggerContainer } from '@/lib/animations';
import { solutions } from '@/lib/data/solutions';
import { LUCIDE } from '@/components/ui/lucideRegistry';

export const HomeSolutionsGrid: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {solutions.map((item, index) => (
        <ServiceCard
          key={item.title}
          icon={LUCIDE[item.icon]}
          title={item.title}
          description={item.description}
          href={item.href}
          highlights={item.points}
          number={String(index + 1).padStart(2, '0')}
          cta={item.cta}
        />
      ))}
    </motion.div>
  );
};
