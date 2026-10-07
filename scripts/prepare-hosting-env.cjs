// Keep the mailbox password private and preserve recipient settings.
const fs = require('node:fs');
const file = '.env.local';
let contents = fs.readFileSync(file, 'utf8');
contents = contents.replace(/^(SMTP_PASSWORD=)([^\r\n]*)/m, (line, prefix, value) => {
  if (value.startsWith('"') || value.startsWith("'")) return line;
  return prefix + JSON.stringify(value);
});
fs.writeFileSync(file, contents, { mode: 0o600 });
fs.chmodSync(file, 0o600);
require('@next/env').loadEnvConfig(process.cwd());
for (const key of ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM', 'FORM_MAIL_RECIPIENTS', 'MAIL_RECIPIENTS']) {
  if (!process.env[key]) throw new Error('Missing private configuration: ' + key);
}
if (process.env.SMTP_PORT !== '587') throw new Error('Expected SMTP STARTTLS port 587.');
console.log('Private mail configuration present; values withheld.');
