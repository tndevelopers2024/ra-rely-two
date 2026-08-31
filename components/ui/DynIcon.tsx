'use client';

import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { LUCIDE } from '@/components/ui/lucideRegistry';

interface DynIconProps {
  /** Name of a lucide icon registered in lucideRegistry. */
  name: string;
  className?: string;
}

/**
 * Renders a lucide icon by name so server components can reference icons
 * in data without passing the component across the client boundary.
 */
export const DynIcon: React.FC<DynIconProps> = ({ name, className }) => {
  const Icon = LUCIDE[name] ?? BadgeCheck;
  return <Icon className={className} aria-hidden="true" />;
};

export default DynIcon;
