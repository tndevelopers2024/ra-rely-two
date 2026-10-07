# Webcentral production deployment

## Outcome

https://relyadvisory.com.au now runs the full Next.js application on the existing Webcentral account. Contact, review and newsletter handlers are active. No additional hosting service was purchased.

## Hosting configuration

- Hosting home: /var/www/2114747b-bda4-49ee-98e9-67f0639d962c
- Public document root: public_html
- Private application directory: rely-app (outside public_html)
- Runtime: Node.js 22.23.3, Automatic mode with process monitoring
- Working directory in the control panel: . (relative to the hosting home)
- Startup command: bash rely-start-v4.sh
- Root HTTP proxy: enabled on the primary domain, blank path, port 3000
- Next.js listens on 0.0.0.0:3000

The original 404 came from uploading static files to the hosting home while the domain pointed to a missing public_html directory. The domain resolves to the correct server, 198.38.93.43. Restored the export into public_html after verifying a downloaded backup. Its valid .htaccess did not need changes. Those static files remain available for rollback.

The production build initially exceeded the shared host's process limit. The private hosting configuration uses experimental.cpus=1, webpackBuildWorker=false, RAYON_NUM_THREADS=1 and UV_THREADPOOL_SIZE=1. The Linux production build then passed compilation, TypeScript, prerendering and tracing, and the server reached Ready. The normal local development configuration is unchanged.

## Mail and private configuration

The existing host configuration was renamed to .env by the user. The startup script accepts .env or .env.local, copies it to the private application's .env.local, and restricts it to permissions 600. It does not log credentials. The password is quoted to preserve its # character. SMTP uses STARTTLS on port 587 and default certificate verification remains enabled.

Contact and review recipients remain the two intended business inboxes. Newsletter notifications go to info@relyadvisory.com.au. Only the general info email is displayed publicly and links to the contact form; the additional form recipient is not displayed on the website.

The source archive excludes environment files, dependencies and Git data. Generated deployment artifacts and .env.local are Git-ignored. No credentials were committed. Private environment URLs return 403 with no credential assignments in the response; private source/startup URLs return 404. Credential exposure was not confirmed. Rotate the mailbox password if evidence from earlier uploads, logs or downloadable backups confirms the contents were publicly served.

## Verification

- Browser: homepage, 13 main/internal pages and all nine published articles render successfully. Their images loaded without broken assets.
- All 11 script assets referenced by the contact response returned HTTP 200 with JavaScript content types.
- Contact: TEST ONLY submission with all fields completed showed success. The handler requires SMTP acceptance for every configured recipient.
- Review: TEST ONLY submission with all fields and consent showed success. No appointment was booked automatically.
- Business inbox delivery: the user confirmed that both business inboxes received the contact/review test messages.
- Newsletter: TEST-ONLY address submission showed success; the received message was independently verified in the previous test inbox before the personal recipient was removed. This is a signup notification for the team to process, not an automatic mailing-list campaign service.
- Contact required fields and invalid newsletter email are blocked by browser validation. Both API routes reject empty invalid JSON with HTTP 400.
- Finance health check: unanswered submission is blocked; ten Always answers produce 100/100 and Strong foundation; Start Again clears all answers and the result. Responses are not sent or stored.
- Homepage and form success evidence are saved in audit/deployment.

## Maintenance and rollback

The credential-free production configuration and startup scripts are versioned in `hosting/webcentral`. A production source archive downloaded from Webcentral, extracted source with the live Next.js configuration, and startup scripts are saved locally in `.production-backups/2026-10-07`. This directory is Git-ignored. It excludes private environment files, installed dependencies, build output, and mailboxes.

Backup: C:/Users/mohan/Downloads/relyadvisory.com.au-website-data.tar.gz. This archive contains private configuration; keep it private. The original Next.js configuration is also saved privately as rely-app/next.config.before-shared.js.

For future releases, use a fresh private release directory, keep credentials outside public_html, install Linux dependencies and build with the same resource limits. Verify readiness before changing the proxy. The startup script reuses a completed build instead of rebuilding on normal restarts. Do not overwrite a running build in place.

To roll back, disable only the new Node application's proxy. The static fallback remains in public_html, but its email forms cannot send without a backend. Do not restart the whole hosting container or alter unrelated email services.

The Webcentral preview alias remains a static preview; the production Node proxy applies to the primary domain. No migration, extra account access or payment is currently needed. Sustained-load capacity has not been benchmarked.

Personal email cleanup: local recipient configuration, QA fixtures, and email previews use business or anonymous test addresses. Live startup runs rely-update-recipients.cjs before rely-start-v3.sh to set newsletter notifications to info@relyadvisory.com.au. Private pre-change configuration backups are stored outside the application and public document root in .private-backups/recipient-change.
