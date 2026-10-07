#!/usr/bin/env bash
set -eu
umask 077
export NEXT_TELEMETRY_DISABLED=1
export RAYON_NUM_THREADS=1
export UV_THREADPOOL_SIZE=1
# Run from the hosting home directory, outside public_html.
echo 'Starting private Rely application setup.'
test -f rely-source.tar.gz
if [ ! -f rely-app/package.json ]; then
  tar -xzf rely-source.tar.gz
fi
if [ -f rely-next-config.js ]; then
  if [ ! -f rely-app/next.config.before-shared.js ]; then
    cp rely-app/next.config.js rely-app/next.config.before-shared.js
  fi
  cp rely-next-config.js rely-app/next.config.js
fi
if [ -f .env.local ]; then
  private_env=.env.local
else
  private_env=.env
fi
test -f "$private_env"
chmod 600 "$private_env"
if [ ! -f rely-app/.env.local ]; then
  cp "$private_env" rely-app/.env.local
fi
cd rely-app
if [ ! -d node_modules/next ]; then
  npm ci --include=dev --no-audit --no-fund
fi
node scripts/prepare-hosting-env.cjs
if [ ! -f .next/BUILD_ID ]; then
  npm run build -- --webpack
fi
export NODE_ENV=production
exec npm run start -- --hostname 0.0.0.0 --port 3000
