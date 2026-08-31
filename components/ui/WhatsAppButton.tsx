'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Floating "chat on WhatsApp" action, pinned bottom-right on every page.
 *
 * PLACEHOLDER: replace WHATSAPP_NUMBER with the approved WhatsApp Business
 * number in full international format, digits only (e.g. 61XXXXXXXXX for AU).
 */
const WHATSAPP_NUMBER = '61400000000';
const PREFILLED_MESSAGE =
  'Hi Rely Advisory Group, I would like to talk about finance operations support.';

const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  PREFILLED_MESSAGE,
)}`;

export const WhatsAppButton: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rely on WhatsApp"
      data-cursor-text="CHAT"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float-lg ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-glow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-advisory-gold focus-visible:ring-offset-2"
    >
      {/* Idle pulse ring */}
      {!shouldReduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      <svg
        viewBox="0 0 24 24"
        className="relative h-7 w-7 fill-current"
        aria-hidden="true"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.24.68-1.41 1.3-1.95 1.34-.5.05-.99.23-3.4-.71-2.86-1.13-4.68-4.06-4.82-4.25-.14-.19-1.15-1.53-1.15-2.92s.73-2.07.99-2.35c.26-.28.57-.35.76-.35l.54.01c.17.01.41-.07.64.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.38-.42.51-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.42.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.23.64-.14.26.09 1.66.78 1.94.93.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
      </svg>

      {/* Hover label */}
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-rely-navy px-3 py-1.5 text-xs font-heading font-semibold text-white opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
