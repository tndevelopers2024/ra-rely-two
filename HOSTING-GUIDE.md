# Hosting Rely Advisory on Webcentral

The live website already runs on Webcentral using Node.js. Use this guide to recreate the setup or publish a future release. Pushing to GitHub saves the code; it does **not** automatically deploy it to Webcentral.

## 1. Use the full Next.js application

Contact, review booking, and newsletter forms need the Next.js server. Uploading only `out/`, `index.html`, and `_next/` cannot run the email handlers.

The verified production settings are:

| Setting | Value |
| --- | --- |
| Domain | `relyadvisory.com.au` |
| Public document root | `public_html` |
| Private application folder | `rely-app`, outside `public_html` |
| Node.js version | `22.23.3` |
| Start mode | `Automatic` |
| Working directory | `.` relative to the hosting home |
| Startup command | `bash rely-start-v4.sh` |
| HTTP proxy path | Empty: proxy the domain root |
| HTTP proxy port | `3000` |
| WebSocket proxy | Disabled in the verified setup |

The existing account supports this setup. The deployment required no additional hosting purchase. Any future plan upgrades are separate from this guide.

## 2. Prepare a source upload locally

Open PowerShell in the project folder. For an existing checkout, commit or safely save your work before pulling updates:

```powershell
git pull --ff-only origin main
npm ci
npx tsc --noEmit
npx playwright test e2e/form-completion.spec.ts --config=audit-playwright.config.ts --workers=1
node audit/email-template-check.cjs
```

The browser tests mock newsletter API responses. The email preview checks mock SMTP and send no real emails. Do not run `audit/live-mail-check.cjs` against production recipient settings; it requires an explicitly isolated test destination.

Create a new source archive with the required `rely-app/` top-level folder. This copies only the listed application files, not credentials, dependencies, or build output:

```powershell
$releaseLabel = Get-Date -Format 'yyyyMMdd-HHmmss'
$releaseStage = Join-Path $PWD ".deployment/package-$releaseLabel"
$releaseApp = Join-Path $releaseStage 'rely-app'
New-Item -ItemType Directory -Force -Path $releaseApp | Out-Null

foreach ($folder in @('app', 'components', 'lib', 'public', 'scripts')) {
    Copy-Item -LiteralPath $folder -Destination $releaseApp -Recurse
}
foreach ($file in @('package.json', 'package-lock.json', 'next.config.js', 'postcss.config.js', 'tailwind.config.ts', 'tsconfig.json')) {
    Copy-Item -LiteralPath $file -Destination $releaseApp
}

$releaseArchive = Join-Path $releaseStage 'rely-source.tar.gz'
tar -czf $releaseArchive -C $releaseStage rely-app
tar -tzf $releaseArchive
Write-Output $releaseArchive
```

The archive listing must have paths beginning with `rely-app/` and no `.env`, `.env.local`, `.git`, `node_modules`, or `.next`. Upload the newly generated archive, not an older backup, when deploying changed code.

## 3. Upload outside the public document root

In the Webcentral website control panel, open **Files**. For an initial setup, upload these files into the hosting home, beside `public_html`, not inside it:

- The generated `rely-source.tar.gz`.
- `hosting/webcentral/rely-next-config.js`.
- `hosting/webcentral/rely-start-v3.sh`.
- `hosting/webcentral/rely-start-v4.sh`.
- `hosting/webcentral/rely-update-recipients.cjs`.

Keep shell scripts in LF format. Git's `.gitattributes` preserves this for `*.sh`.

The layout after the application starts is:

```text
hosting home/
  .env                         private SMTP settings
  rely-source.tar.gz
  rely-next-config.js
  rely-start-v3.sh
  rely-start-v4.sh
  rely-update-recipients.cjs
  rely-app/
    .env.local                 private application settings
    app/
    components/
    lib/
    public/
    scripts/
    node_modules/              installed on the Linux host
    .next/                     built on the Linux host
  public_html/                 static fallback only
```

Do not upload Windows `node_modules` or `.next` output. The host installs and builds its own Linux files.

## 4. Configure private SMTP settings

Create the private `.env` in the hosting home. Enter the actual mailbox password yourself. The following is a template, not a working credential file:

```dotenv
SMTP_HOST="mail.relyadvisory.com.au"
SMTP_PORT="587"
SMTP_USER="website@relyadvisory.com.au"
SMTP_PASSWORD="REPLACE_WITH_REAL_MAILBOX_PASSWORD"
SMTP_FROM="Rely Advisory Group <website@relyadvisory.com.au>"
MAIL_RECIPIENTS="info@relyadvisory.com.au"
FORM_MAIL_RECIPIENTS="info@relyadvisory.com.au,rogerm@relyadvisory.com.au"
```

Quote the password so a `#` remains part of the value. Use file permissions `600`. Never place environment files in `public_html`, commit them, or use `NEXT_PUBLIC_` for credentials. Keep SMTP TLS certificate verification enabled; port 587 uses STARTTLS.

Newsletter notifications go to `info@relyadvisory.com.au`. Contact and review requests go to both configured business inboxes. Only the general info address is displayed on the website and links to the contact form. Newsletter requests notify the team; they do not automatically create a mailing-list campaign.

For initial installation, the startup script copies the private root configuration into `rely-app/.env.local`. On later restarts it preserves the existing application environment. If SMTP or contact/review recipients change later, update both private files and restart only this Node application. `rely-update-recipients.cjs` keeps the newsletter destination set to the info inbox and creates private rollback copies outside the public folder.

## 5. Configure and start Node.js

In the website control panel, open **Advanced → Node.js** and configure the values from section 1. For a fresh installation, keep the HTTP proxy disabled until the application is ready, then enable the root proxy on port 3000.

The scripts extract the source if the application is missing, install dependencies with `npm ci`, apply the shared-host configuration, validate private settings without printing their values, and build with `next build --webpack`. They use limited workers because the original build exceeded this shared host's process limits:

```text
experimental.cpus = 1
experimental.webpackBuildWorker = false
RAYON_NUM_THREADS = 1
UV_THREADPOOL_SIZE = 1
```

Wait for the application log to show `Ready`. It should also show `Newsletter recipient verified: info@relyadvisory.com.au` and `Private mail configuration present; values withheld.` If installation or building fails, read the error before enabling the proxy. Do not restart the entire hosting container or unrelated mail services.

The verified proxy serves the primary domain. The Webcentral preview alias can still display the static fallback.

## 6. Publish a future code update safely

Uploading a new archive over the old one and restarting is insufficient: the startup script reuses an existing `rely-app` and completed build.

1. Back up the active release and private settings locally. Keep any backup containing credentials private and outside Git.
2. Create a fresh private release directory, such as `releases/20261007-153000`, outside `public_html`.
3. Upload the new archive, all four hosting scripts/configuration files, and private `.env` into that directory. Do not overwrite the running `rely-app/.next`.
4. If an authenticated hosting terminal with the same Node version is available, extract and build the new release there before switching. Apply `rely-next-config.js`, copy the private environment into the new `rely-app/.env.local`, restrict it to `600`, install dependencies, run `scripts/prepare-hosting-env.cjs`, and build using the resource limits above. Do not run a second server on the existing port 3000.
5. Change only this Node application's working directory to the new release path, keeping `bash rely-start-v4.sh` and port 3000. Expect a brief application restart. Without a hosting terminal, schedule a maintenance window because the first startup must also install and build the release.
6. Wait for `Ready`, test the domain, and retain the previous release for rollback. If the new release fails, restore the previous working directory and startup command.

Changing the working directory is a deployment action; a GitHub push alone does not perform it. Do not switch the production proxy to an unready application.

For step 4, these Bash commands run inside the **new private release directory**, using Node.js 22.23.3. They build the release without starting another server:

```bash
set -eu
umask 077
export NEXT_TELEMETRY_DISABLED=1
export RAYON_NUM_THREADS=1
export UV_THREADPOOL_SIZE=1
tar -xzf rely-source.tar.gz
cp rely-next-config.js rely-app/next.config.js
cp .env rely-app/.env.local
chmod 600 .env rely-app/.env.local
cd rely-app
npm ci --include=dev --no-audit --no-fund
node scripts/prepare-hosting-env.cjs
npm run build -- --webpack
```

## 7. Verify after deployment

Through the browser, check:

- Homepage, navigation, internal pages, articles, images, and JavaScript assets.
- Contact and review validation, including required fields and consent.
- One contact and one review submission labelled **TEST ONLY — Deployment QA**. Ask the inbox owners to confirm receipt in both business inboxes.
- Newsletter invalid-email validation and one test signup using a clearly marked address that you control. Confirm the notification arrives in the info inbox.
- Health check: unanswered submission is blocked; ten **Always** answers produce **100 / 100** and **Strong foundation**; **Start Again** clears the answers and result.
- Private paths such as `/.env`, `/.env.local`, and `/rely-app/.env.local` do not expose file contents. A 403 or 404 is acceptable. Do not print or share secrets while checking.

A form success message means the server accepted the request and the mail server accepted the configured recipients. It is not proof of inbox delivery; confirm inbox receipt separately. Test submissions do not create real appointments.

## 8. Troubleshooting and rollback

| Symptom | Check |
| --- | --- |
| LiteSpeed homepage 404 | Domain mapping and document root. Static files belong in `public_html`; the live Node app needs its root proxy enabled. Back up `.htaccess` before changing it. |
| Form network error or API 404 | The domain may be serving the static export instead of the Node app. Check proxy settings and application readiness. |
| SMTP authentication error | Private host, username, quoted password, and port. Do not disable TLS verification. |
| Build process error such as EAGAIN | Use the committed shared-host configuration and worker limits. |
| Restart shows old code | Existing build was reused. Deploy to a fresh private release directory. |
| Mail accepted but missing from inbox | Check spam/quarantine and confirm with the mailbox owner. |

For a failed release, restore the previous application working directory and startup command. Disabling the Node proxy falls back to the static files in `public_html`, but those files cannot send form emails. If private configuration was publicly readable, remove the exposure and rotate the mailbox password through the mailbox provider.

See [the deployment report](DEPLOYMENT-WEBCENTRAL.md) for the original diagnosis and completed production checks. The local source snapshot is in the Git-ignored `.production-backups` directory; it excludes credentials, mailboxes, dependencies, and build output.
