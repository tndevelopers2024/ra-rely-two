const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'rely-static-export-'));
console.log('Building static pages in an isolated temporary directory.');
for (const name of ['app', 'components', 'lib', 'public']) {
  const source = path.join(root, name);
  const api = path.join(root, 'app', 'api');
  fs.cpSync(source, path.join(stage, name), { recursive: true, filter: entry => entry !== api && !entry.startsWith(api + path.sep) });
}
for (const name of ['package.json', 'package-lock.json', 'tsconfig.json', 'next-env.d.ts', 'tailwind.config.ts', 'postcss.config.js']) {
  if (fs.existsSync(path.join(root, name))) fs.copyFileSync(path.join(root, name), path.join(stage, name));
}
fs.symlinkSync(path.join(root, 'node_modules'), path.join(stage, 'node_modules'), 'junction');
fs.writeFileSync(path.join(stage, 'next.config.js'), `const { redirects, headers, ...base } = require(${JSON.stringify(path.join(root, 'next.config.js'))});\nmodule.exports = { ...base, output: 'export', trailingSlash: true, images: { ...base.images, unoptimized: true } };\n`);
for (const file of ['app/robots.ts', 'app/sitemap.ts']) {
  fs.appendFileSync(path.join(stage, file), "\nexport const dynamic = 'force-static';\n");
}
const article = path.join(stage, 'app/insights/[slug]/page.tsx');
if (!fs.readFileSync(article, 'utf8').includes('export const dynamicParams')) fs.appendFileSync(article, '\nexport const dynamicParams = false;\n');
const buildEnv = { ...process.env };
for (const key of Object.keys(buildEnv)) if (key.startsWith('SMTP_') || ['MAIL_RECIPIENTS', 'FORM_MAIL_RECIPIENTS'].includes(key)) delete buildEnv[key];
const result = spawnSync(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], { cwd: stage, env: buildEnv, stdio: 'inherit' });
if (result.error || result.status !== 0) {
  console.error('Static export failed. Build files are available at:', stage);
  if (result.error) console.error(result.error.message);
  process.exit(result.status || 1);
}
const stageOutput = path.join(stage, 'out');
if (!fs.existsSync(path.join(stageOutput, 'index.html'))) throw new Error('Export did not produce index.html.');
// Verify the exact workspace output path before replacing generated files.
if (path.resolve(output) !== path.join(root, 'out') || path.dirname(output) !== root) throw new Error('Unexpected export destination.');
if (fs.existsSync(output)) fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(stageOutput, output, { recursive: true });
fs.writeFileSync(path.join(output, 'DEPLOYMENT.txt'), `Rely Advisory Group static website\n\nUpload the contents of this folder to the website document root.\nEach page uses a directory/index.html layout.\n\nIMPORTANT: Email forms require a backend.\nThis export does not contain the Next.js POST endpoints /api/contact and /api/newsletter.\nThe static form UI still posts to these paths. Configure your host to route those paths\nto the working Next.js backend, or install compatible server-side form handlers.\nDo not upload .env.local or mailbox credentials to a public directory.\n\nThe finance health check runs entirely in the browser and works without a backend.\n\nOriginal article redirect and HTTP security headers must be configured on your host.\nThe included .htaccess handles these on compatible Apache hosting.\n`);
fs.writeFileSync(path.join(output, '.htaccess'), `DirectoryIndex index.html\nErrorDocument 404 /404.html\nRedirect 301 /insights/five-power-bi-dashboards-sme-financial-visibility /insights/five-financial-dashboards-sme-financial-visibility/\n<IfModule mod_headers.c>\n  Header always set X-Frame-Options "SAMEORIGIN"\n  Header always set X-Content-Type-Options "nosniff"\n  Header always set Referrer-Policy "strict-origin-when-cross-origin"\n  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"\n</IfModule>\n`);
console.log('Static website generated at:', output);
console.log('Email forms require the backend described in out/DEPLOYMENT.txt.');
// Only remove the exact temporary directory created for this invocation.
if (path.dirname(stage) !== os.tmpdir() || !path.basename(stage).startsWith('rely-static-export-')) throw new Error('Unexpected temporary build path.');
fs.rmSync(stage, { recursive: true, force: true });
