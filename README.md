# Rely Advisory Group — Website

A production-grade, conversion-focused website for **Rely Advisory Group**, an Australian boutique finance-operations firm.

---

## Brand & Design System
- **Colors:**
  - `rely-navy`: `#0B1B4D`
  - `advisory-gold`: `#C4A35A`
  - `warm-ivory`: `#F5F2EA`
  - `cloud-grey`: `#F4F6F9`
  - `charcoal`: `#263247`
- **Typography:**
  - Headings: `Montserrat` (600/700)
  - Body: `Inter` (400/500)
- **Aesthetic:** Restrained, architectural, private-bank/boutique advisory.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS with custom brand design tokens
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Enquiry email delivery
Copy the SMTP section in `.env.example` into `.env.local`, and set the mailbox provider's host, port, username, password (or app password), and authorised sender. Port 587 uses required STARTTLS; port 465 uses TLS from connection start. Add the same variables to the hosting environment.

Contact and review requests use the server-only `FORM_MAIL_RECIPIENTS` setting; newsletter requests use `MAIL_RECIPIENTS` (comma-separated addresses). Only `info@relyadvisory.com.au` is displayed publicly, linked to `/contact#enquiry-form`. Additional form recipients are configured privately in `.env.local` and the hosting environment. Website visitors cannot override these destinations. Replies go to the visitor's email. The forms report a failure if SMTP or recipients are unconfigured, or the server does not accept all recipients. Verify real inbox delivery after configuring the mailbox.

### Health check and newsletter
The health check provides an instant indicative score, the approved result bands, and up to three recommendations. Answers stay in the browser. Scoring is Always 4, Usually 3, Sometimes 2, Rarely 1 and Not sure 0; bands start at 80 and 50 percent.

Newsletter signups send the subscriber's address, consent and signup time to `MAIL_RECIPIENTS` for the team to add to Finance Operations Notes. This is a mailbox workflow; campaign scheduling and mailing-list management remain with the team.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## Pre-Publication Launch Checklist
Refer to `PLACEHOLDERS.md` and the master content document for items requiring approval before launch:
- [ ] Confirm legal entity name, ABN, and contact details
- [ ] Legal review of `/privacy` and `/terms`
- [ ] Confirm approved founder biography for `/about`
- [ ] Configure SMTP for `/api/contact` (used by contact and review forms) and verify inbox delivery
- [x] Complete health-check scoring and SMTP newsletter signup requests

### Static export
Run `npm run export:static` to generate `out/` without changing the development server configuration. The build uses an isolated temporary copy and omits the Next.js POST API routes. The export includes all public pages, article pages, assets, and the browser-only health check.

For Webcentral cPanel hosting, upload the contents of `out/` into `public_html` (or the domain's document root). Contact, review and newsletter email forms require compatible server-side handlers for `/api/contact` and `/api/newsletter`; uploading only the static export will not enable email delivery. See `out/DEPLOYMENT.txt`. Never upload `.env.local` to a public folder.
