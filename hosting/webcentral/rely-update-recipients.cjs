const fs = require('node:fs');
const path = require('node:path');
const recipient = 'info@relyadvisory.com.au';
const files = ['.env', '.env.local', 'rely-app/.env.local'];
const backupDir = '.private-backups/recipient-change';
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  if (!/^MAIL_RECIPIENTS=/m.test(before)) throw new Error('Missing newsletter recipient setting.');
  const after = before.replace(/^MAIL_RECIPIENTS=.*$/m, `MAIL_RECIPIENTS="${recipient}"`);
  if (before !== after) {
    fs.mkdirSync(backupDir, { recursive: true, mode: 0o700 });
    const backup = path.join(backupDir, file.replaceAll('/', '_'));
    if (!fs.existsSync(backup)) fs.writeFileSync(backup, before, { mode: 0o600 });
    fs.writeFileSync(file, after, { mode: 0o600 });
  }
  fs.chmodSync(file, 0o600);
  if (!fs.readFileSync(file, 'utf8').includes(`MAIL_RECIPIENTS="${recipient}"`)) throw new Error('Recipient update failed.');
}
console.log(`Newsletter recipient verified: ${recipient}. Contact/review and SMTP settings preserved.`);
