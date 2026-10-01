# Rely Advisory Group site audit

Audited 1 October 2026 against the local working tree. Page content changes are restricted to the nine blogs; changes to shared components fix rendering, layout and keyboard behaviour without rewriting other page copy.

## Results

- 26 routes tested at 1440, 768, 390 and 320 pixels: 104 route/viewport checks passed.
- 137 Playwright tests passed across two runs (127 route/blog/form checks and 10 shared-control/normal-motion checks).
- TypeScript checking and the production build passed.
- Every discovered internal link destination returned HTTP 200; the old dashboard blog URL returned the intended 308 redirect; an unknown blog returned 404.
- No remaining horizontal overflow, broken loaded images, missing fragment targets or unexpected JavaScript/hydration errors in the final checks.
- Two console HTTP 500 messages in the audit data are deliberate intercepted form failures, not real server failures.
- Chromium desktop and mobile viewport/touch emulation were used. Safari, Firefox and physical devices were not tested.

## Working and unfinished features

| Feature | Result | Evidence / limitation |
| --- | --- | --- |
| Main navigation, Solutions dropdown, footer links and primary CTAs | Working | Internal destinations load; menu interactions tested. |
| Mobile menu | Working | Opens, navigates to About and a solution, and closes on navigation. |
| All nine blog cards | Working | Clicking empty card space opens the matching article on desktop and mobile. |
| Blog contents, related articles and Back to Insights | Working | Heading destinations, related navigation and return link tested. |
| Solutions-page FAQs | Working | Every accordion expands and collapses. `/faq` is static text and has no accordion control. |
| Floating and footer Back to top | Working | Both return the page to the top. |
| Keyboard Skip to main content | Working | Hidden Top button no longer interrupts the initial tab order. |
| Contact and booking forms: browser validation and success/error UI | Working in UI tests | Requests intercepted; empty forms blocked, valid forms submitted, fields reset on success and errors shown. |
| Contact and booking: real enquiry delivery | **Dummy / unfinished** | `app/api/contact/route.ts` logs the payload, delays and returns success; it does not send email or save enquiries. A booking request is not an actual calendar booking. |
| Newsletter Join | **Dummy / unfinished** | Footer form only prevents submission; no subscription request or feedback. Copy explicitly says endpoint connection is pending. |
| Finance health-check result button | **Dummy / unfinished** | Selecting all ten answers and clicking the result button produces no result. No handler or scoring logic exists. No incoming link to this page was found in the current rendered pages. |
| Email, telephone and WhatsApp links | Destinations checked | Mail addresses, Australian phone link and WhatsApp number are present. No messages/calls sent, and inbox delivery or account ownership is not verified. |
| Home dashboard metrics / Sample | Illustrative, not live data | Values are hard-coded. The Sample link opens Reporting & Insights rather than a live dashboard. Copy preserved. |
| About credentials/biography | Placeholder remains | The page says verified qualifications and a personal statement will appear before launch. Copy preserved. |

## Fixes made

1. Removed reduced-motion hydration mismatches by using the existing effect-based preference hook in the shared animated components.
2. Allowed long statistic text to wrap, fixing mobile overflow on Process Improvement at 390 and 320 pixels.
3. Removed the hidden floating Top button from keyboard focus order until it is visible.
4. Replaced permissive/skipping tests with explicit assertions and added coverage of all routes, all blogs, controls, normal/reduced motion and mocked form outcomes.

The three unfinished features above were identified and documented, not connected to an invented email provider or subscription service. Other page copy and forms were preserved.

## Blog content cleanup

Reviewed and edited all nine current blogs. Removed repeated sales endings, unsupported savings and guaranteed outcomes, arbitrary turnover thresholds, unrelated legal detail and over-specific examples presented as facts. Retained practical Australian finance operations guidance and updated read times.

- Payday Super: corrected the article to the rules applying from 1 July 2026 and the general seven-business-day receipt timeframe, with exceptions noted; removed old blanket statements about non-deductible SGC, immediate matching alerts and the closed clearing house. Sources: [ATO](https://softwaredevelopers.ato.gov.au/PaydaySuper), [Fair Work Ombudsman](https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026).
- Privacy: removed the claim that the small-business exemption has already been abolished, speculative rights and blanket breach-notification requirements. Sources: [OAIC small-business guidance](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business), [OAIC NDB scheme](https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme).
- Payroll: distinguished intentional underpayment from mistakes, retained practical award/pay checks and removed unrelated Respect@Work and compulsory biometric-system claims. Sources: [Fair Work record-keeping](https://www.fairwork.gov.au/pay-and-wages/paying-wages/record-keeping), [criminal offence and small-business code](https://www.fairwork.gov.au/newsroom/media-releases/2025-media-releases/january-2025/20250103-voluntary-small-business-wage-compliance-code-media-release).
- Other blogs: removed a fictitious $30,000 AP saving, generic PPSR deadlines, guarantees that outsourcing ensures tax/payroll compliance and stale interest-rate assertions. Any retained numerical cash-release example is explicitly illustrative.

## Reproduce

```sh
npx playwright test --workers=2
npx tsc --noEmit
npm run build
```

Raw audit: [site-audit.json](./site-audit.json). Screenshots are retained locally under `/private/tmp/rely-site-audit/screenshots/` and were visually reviewed for the blog hero/body, mobile menu and repaired mobile layout. Form success/error tests use intercepted requests; they must not be interpreted as proof of email delivery.
