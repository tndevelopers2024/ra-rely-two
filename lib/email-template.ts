interface EmailDetail {
  label: string;
  value?: string;
}

interface NotificationEmail {
  category: string;
  title: string;
  introduction: string;
  sections: { title: string; details: EmailDetail[] }[];
  message?: { title: string; value: string };
  replyTo: string;
  actionLabel?: string;
  receivedAt: Date;
  footer: string;
}

export function escapeEmailHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

// Email-safe tables and inline styles keep notifications readable without remote images or fonts.
export function renderNotificationEmail(email: NotificationEmail): string {
  const escape = escapeEmailHtml;
  const received = email.receivedAt.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const sections = email.sections.map(section => {
    const details = section.details.filter(detail => detail.value?.trim());
    if (!details.length) return '';
    return `<tr><td class="content" style="padding:24px 32px 0;">
      <h2 style="margin:0 0 12px;font-size:12px;line-height:18px;letter-spacing:1.3px;text-transform:uppercase;color:#596273;">${escape(section.title)}</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border:1px solid #e4e7ec;border-radius:12px;table-layout:fixed;">
        ${details.map((detail, index) => `<tr><td style="padding:13px 18px;${index ? 'border-top:1px solid #e4e7ec;' : ''}background-color:${index % 2 ? '#ffffff' : '#f7f8fa'};">
          <div style="font-size:11px;line-height:17px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:#687283;">${escape(detail.label)}</div>
          <div style="padding-top:3px;font-size:15px;line-height:23px;color:#182747;overflow-wrap:anywhere;word-break:break-word;">${escape(detail.value!)}</div>
        </td></tr>`).join('')}
      </table>
    </td></tr>`;
  }).join('');
  const message = email.message?.value.trim() ? `<tr><td class="content" style="padding:24px 32px 0;">
    <h2 style="margin:0 0 12px;font-size:12px;line-height:18px;letter-spacing:1.3px;text-transform:uppercase;color:#596273;">${escape(email.message.title)}</h2>
    <div style="padding:20px;border-left:3px solid #c4a35a;background-color:#f5f2ea;border-radius:0 10px 10px 0;font-size:15px;line-height:25px;color:#263247;overflow-wrap:anywhere;word-break:break-word;">${escape(email.message.value).replace(/\r?\n/g, '<br>')}</div>
  </td></tr>` : '';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${escape(email.title)}</title>
<style>@media only screen and (max-width:480px){.outer{padding:16px 8px!important}.content{padding-left:20px!important;padding-right:20px!important}.email-title{font-size:26px!important;line-height:33px!important}.reply-button{display:block!important;text-align:center!important}}a{color:#0b1b4d}</style></head>
<body style="margin:0;padding:0;background-color:#f0f2f6;font-family:Arial,Helvetica,sans-serif;color:#263247;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escape(email.introduction)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f0f2f6;"><tr><td class="outer" align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e1e5ec;border-radius:16px;overflow:hidden;table-layout:fixed;">
<tr><td class="content" style="padding:26px 32px;background-color:#0b1b4d;border-bottom:4px solid #c4a35a;">
  <div style="font-size:27px;line-height:30px;font-weight:700;letter-spacing:4px;color:#ffffff;">RELY</div>
  <div style="padding-top:6px;font-size:10px;line-height:16px;font-weight:700;letter-spacing:2.8px;color:#d3bb81;">ADVISORY GROUP</div>
</td></tr>
<tr><td class="content" style="padding:30px 32px 0;">
  <div style="font-size:10px;line-height:16px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#8b6c32;">${escape(email.category)}</div>
  <h1 class="email-title" style="margin:10px 0 12px;font-size:30px;line-height:38px;font-weight:700;color:#0b1b4d;">${escape(email.title)}</h1>
  <p style="margin:0;font-size:14px;line-height:23px;color:#667085;">${escape(email.introduction)}</p>
  <p style="margin:14px 0 0;font-size:11px;line-height:18px;color:#7a8493;">Received ${escape(received)}</p>
</td></tr>
${sections}${message}
<tr><td class="content" style="padding:28px 32px 30px;">
  <a class="reply-button" href="${escape('mailto:' + encodeURIComponent(email.replyTo))}" style="display:inline-block;padding:14px 24px;border-radius:8px;background-color:#0b1b4d;border:1px solid #0b1b4d;font-size:14px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;">${escape(email.actionLabel || 'Reply to sender')}</a>
  <p style="margin:12px 0 0;font-size:11px;line-height:18px;color:#7a8493;">You can also reply directly to this email.</p>
</td></tr>
<tr><td class="content" style="padding:20px 32px;background-color:#f7f8fa;border-top:1px solid #e4e7ec;">
  <p style="margin:0;font-size:11px;line-height:19px;color:#7a8493;">${escape(email.footer)}</p>
  <p style="margin:8px 0 0;font-size:10px;line-height:17px;color:#929bab;">Rely Advisory Group · Website notification</p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

const interestLabels: Record<string, string> = {
  ap: 'Accounts Payable Support',
  ar: 'Accounts Receivable & Cash Flow',
  process: 'Finance Process Improvement',
  reporting: 'Management Reporting & Dashboards',
  accountant: 'Accountant Practice Partnership',
  integrated: 'Full Finance Operations Partner',
};

export function formatEmailInterest(value?: string): string | undefined {
  return value ? interestLabels[value] || value : undefined;
}
