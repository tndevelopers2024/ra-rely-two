import { z } from 'zod';

// Destinations are configured on the server, never supplied by a website visitor.
export function getMailRecipients(setting: 'MAIL_RECIPIENTS' | 'FORM_MAIL_RECIPIENTS' = 'MAIL_RECIPIENTS'): string[] | null {
  const parsed = z.array(z.string().trim().email()).min(1).safeParse(
    (process.env[setting] || '').split(',').map(address => address.trim()).filter(Boolean),
  );
  return parsed.success ? Array.from(new Set(parsed.data.map(address => address.toLowerCase()))) : null;
}
