# Placeholders Log — Rely Advisory Group Website

This file catalogs every placeholder currently in the codebase that must be verified or replaced with real client details prior to public production launch.

---

## 1. Contact Details & Business Registration
- [x] **Email Address:** Only `info@relyadvisory.com.au` appears publicly and links to the enquiry form. Form recipients are Info and `rogerm@relyadvisory.com.au`, configured only in the server route. Monica is not a recipient.
- [x] **Telephone Number:** Updated to `+61 433 250 700` with `tel:+61433250700` links.
- [x] **Physical Address / Office:** Updated to `6 Welford Circuit, North Kellyville NSW 2155` (`Footer.tsx`, `app/contact/page.tsx`, `app/page.tsx` schema).
- [x] **ABN:** Client-supplied `16701065367` added to footer, terms and homepage schema.
- [ ] **Legal Entity Name:** Confirm the registered legal entity name.
- [ ] **Form Email Delivery:** SMTP delivery is implemented for contact and review requests. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` and `SMTP_FROM`, then verify delivery to both recipients before launch.
- [x] **WhatsApp Business Number:** Set to `61433250700` (`components/ui/WhatsAppButton.tsx`, matching official phone `0433 250 700`).

---

## 2. Founder Profile (`/about`)
- [ ] **Founder Biography:** Professional summary covering background in customer insights, data analysis, executive reporting, finance operations improvement, and reporting tools.
- [ ] **Verified Qualifications & Memberships:** Add formal credentials only after verification.
- [ ] **Founder Headshot:** Replace placeholder avatar with a high-resolution, professional portrait.

---

## 3. Legal & Regulatory Documents
- [ ] **Privacy Policy (`/privacy`):**
  - Replace `[insert date]` with actual policy publication/revision date.
  - [x] Privacy contact shows only `info@relyadvisory.com.au`, linked to the enquiry form.
  - Confirm any offshore data hosting or overseas delivery arrangements.
- [ ] **Terms & Service Disclaimer (`/terms`):**
  - [x] Replaced `[insert Australian jurisdiction]` with `NSW`.
  - Verify registered tax/BAS practitioner disclaimers.

---

## 4. Footer — Social & Newsletter
- [ ] **LinkedIn Company URL:** Add official company LinkedIn URL when approved. (Removed unverified placeholder link from `Footer.tsx`).
- [ ] **Newsletter Delivery Endpoint:** The "Finance Operations Notes" signup form in `Footer.tsx` currently prevents submit and stores nothing. Connect it to the approved email platform (or remove the form) before launch, and confirm the consent wording meets the Spam Act 2003 requirements.

---

## 5. Systems & Software Badges
- [ ] Verify software partnerships/badges before display (Xero Partner, MYOB Certified, QuickBooks Online ProAdvisor, reporting tools).
