# Webcentral production configuration

These credential-free files match the live application's hosting setup. Upload them to the private hosting home, outside `public_html`, beside `rely-source.tar.gz` and the private `.env` file. Configure Node.js 22 with working directory `.`, startup command `bash rely-start-v4.sh`, and the root HTTP proxy on port 3000.

`rely-start-v4.sh` sets newsletter notifications to `info@relyadvisory.com.au`, then invokes `rely-start-v3.sh`. The latter installs the shared-host configuration, prepares the private environment, builds an unbuilt application with limited workers, and starts Next.js. Existing completed builds are reused.

Create a fresh private application directory for code releases. Do not overwrite a running `.next` build. Keep SMTP credentials and rollback environment backups out of the public document root and Git.

See [the deployment report](../../DEPLOYMENT-WEBCENTRAL.md) for recipients, verification, and rollback details.
