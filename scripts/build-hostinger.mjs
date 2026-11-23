import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BACKEND_DIR = path.join(ROOT_DIR, 'backend');
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');
const OUT_DIR = path.join(ROOT_DIR, 'deploy-hostinger');
const FRONTEND_STAGE = path.join(OUT_DIR, 'frontend-public_html');
const BACKEND_STAGE = path.join(OUT_DIR, 'backend-nodejs');

function run(cmd, cwd = ROOT_DIR) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Node.js ESM ("type": "module") requires explicit .js extensions on relative imports.
 * TypeScript with moduleResolution: "bundler" emits extensionless relative imports (e.g. './db').
 * Rewrite relative './...' and '../...' imports in compiled dist JS files to include '.js'.
 */
function fixEsmRelativeImports(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixEsmRelativeImports(fullPath);
    } else if (entry.name.endsWith('.js')) {
      let code = fs.readFileSync(fullPath, 'utf-8');
      // Rewrite static imports/exports: from './foo' or from '../foo'
      code = code.replace(
        /(from\s+['"])(\.\.?\/[^'"]+?)(['"])/g,
        (match, pre, spec, post) => {
          if (spec.endsWith('.js') || spec.endsWith('.json') || spec.endsWith('.mjs')) {
            return match;
          }
          return `${pre}${spec}.js${post}`;
        }
      );
      // Rewrite dynamic imports: import('./foo')
      code = code.replace(
        /(import\(\s*['"])(\.\.?\/[^'"]+?)(['"]\s*\))/g,
        (match, pre, spec, post) => {
          if (spec.endsWith('.js') || spec.endsWith('.json') || spec.endsWith('.mjs')) {
            return match;
          }
          return `${pre}${spec}.js${post}`;
        }
      );
      fs.writeFileSync(fullPath, code, 'utf-8');
    }
  }
}

function zipDirectory(sourceDir, zipFilePath) {
  if (fs.existsSync(zipFilePath)) {
    fs.unlinkSync(zipFilePath);
  }
  if (process.platform === 'win32') {
    run(
      `powershell -NoProfile -Command "Compress-Archive -Path '${sourceDir}\\*' -DestinationPath '${zipFilePath}' -Force"`
    );
  } else {
    run(`zip -r -q "${zipFilePath}" .`, sourceDir);
  }
}

console.log('==============================================================');
console.log(' DoorMaster Installation Ops - Hostinger hPanel Production Build');
console.log('==============================================================');

// 1. Clean output folder
if (fs.existsSync(OUT_DIR)) {
  console.log('\n🧹 Cleaning previous deploy-hostinger/ directory...');
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(FRONTEND_STAGE, { recursive: true });
fs.mkdirSync(BACKEND_STAGE, { recursive: true });

// 2. Build Backend (Prisma Generate + TypeScript)
console.log('\n🔧 Building Backend (Prisma + TypeScript)...');
run('npm --prefix backend run prisma:generate');
run('npm --prefix backend run build');

// 3. Build Frontend (Angular Production Build)
console.log('\n🎨 Building Frontend (Angular Production)...');
run('npm --prefix frontend run build');

// 4. Package Frontend for Hostinger hPanel (public_html)
const angularBrowserDist = path.join(FRONTEND_DIR, 'dist', 'app', 'browser');
if (!fs.existsSync(angularBrowserDist)) {
  throw new Error(`Angular build output not found at ${angularBrowserDist}`);
}
console.log('\n📦 Staging Frontend static files -> deploy-hostinger/frontend-public_html/');
copyDir(angularBrowserDist, FRONTEND_STAGE);

const htaccessContent = `# DoorMaster Installation Ops - Hostinger hPanel Apache/LiteSpeed SPA Config
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Do not rewrite API requests (if proxied or routed to Node.js backend)
  RewriteRule ^api(/.*)?$ - [L]

  # Serve existing files and directories directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Fallback all other routes to Angular index.html
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_headers.c>
  # Prevent caching of index.html, service worker, and manifest
  <FilesMatch "^(index\\.html|sw\\.js|manifest\\.json)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>

  # Cache hashed JS/CSS/media assets for 1 year
  <FilesMatch "\\.(js|css|png|jpg|jpeg|svg|ico|woff2?)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`;
fs.writeFileSync(path.join(FRONTEND_STAGE, '.htaccess'), htaccessContent, 'utf-8');

// 5. Package Backend for Hostinger hPanel (Node.js Web App)
console.log('\n📦 Staging Backend Node.js files -> deploy-hostinger/backend-nodejs/');
const backendDist = path.join(BACKEND_DIR, 'dist');
if (!fs.existsSync(backendDist)) {
  throw new Error(`Backend build output not found at ${backendDist}`);
}
copyDir(backendDist, path.join(BACKEND_STAGE, 'dist'));
fixEsmRelativeImports(path.join(BACKEND_STAGE, 'dist'));

// Copy Prisma schema & Data files
copyDir(path.join(BACKEND_DIR, 'prisma'), path.join(BACKEND_STAGE, 'prisma'));
copyDir(path.join(BACKEND_DIR, 'data'), path.join(BACKEND_STAGE, 'data'));

// Create production package.json for Hostinger Node.js app
const rawPkg = JSON.parse(fs.readFileSync(path.join(BACKEND_DIR, 'package.json'), 'utf-8'));
const prodPkg = {
  name: rawPkg.name || 'doormaster-backend',
  version: rawPkg.version || '1.0.0',
  description: rawPkg.description,
  type: 'module',
  main: 'dist/server.js',
  scripts: {
    start: 'node dist/server.js',
    postinstall: 'prisma generate',
    'prisma:push': 'prisma db push'
  },
  dependencies: {
    ...rawPkg.dependencies,
    // Keep prisma CLI in dependencies so Hostinger `npm install --omit=dev` can run `prisma generate`
    prisma: rawPkg.devDependencies?.prisma || '^6.19.3'
  }
};
fs.writeFileSync(
  path.join(BACKEND_STAGE, 'package.json'),
  JSON.stringify(prodPkg, null, 2) + '\n',
  'utf-8'
);

if (fs.existsSync(path.join(BACKEND_DIR, 'package-lock.json'))) {
  fs.copyFileSync(
    path.join(BACKEND_DIR, 'package-lock.json'),
    path.join(BACKEND_STAGE, 'package-lock.json')
  );
}

const envExample = `# Hostinger hPanel Production Environment Variables
# Set these in hPanel -> Node.js -> Environment Variables (or save as .env)
NODE_ENV=production
PORT=3001

# MySQL Database (Create in hPanel -> Databases -> MySQL Databases)
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@127.0.0.1:3306/DB_NAME"
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
DB_NAME=DB_NAME

# Authentication Secret (Use a strong random string in production)
JWT_SECRET=change-this-to-a-strong-random-secret
`;
fs.writeFileSync(path.join(BACKEND_STAGE, '.env.example'), envExample, 'utf-8');

// 6. Write Hostinger hPanel Deployment Guide
const deployGuide = `# DoorMaster Installation Ops - Hostinger hPanel Deployment Guide

## Package Contents
- \`frontend-public_html.zip\` — Angular production build + \`.htaccess\` for \`public_html/\`
- \`backend-nodejs.zip\` — Compiled Node.js + Prisma backend (\`dist/server.js\`) for Hostinger Node.js App
- \`doormaster-hostinger-hpanel.zip\` — Combined archive containing both folders & this guide

---

## Step 1: Create MySQL Database in hPanel
1. Go to **hPanel → Databases → Management**.
2. Create a new MySQL database and user, and note down \`DB_NAME\`, \`DB_USER\`, and \`DB_PASSWORD\`.

## Step 2: Deploy Backend (hPanel → Websites → Node.js / Cloud Hosting)
1. Upload \`backend-nodejs.zip\` to your Node.js app root directory and extract it.
2. Set **Application Startup File** to \`dist/server.js\`.
3. Add Environment Variables (or create \`.env\` from \`.env.example\`):
   - \`NODE_ENV=production\`
   - \`PORT=3001\` (or the port assigned by hPanel)
   - \`DATABASE_URL="mysql://DB_USER:DB_PASSWORD@127.0.0.1:3306/DB_NAME"\`
   - \`DB_HOST=127.0.0.1\`, \`DB_PORT=3306\`, \`DB_USER=...\`, \`DB_PASSWORD=...\`, \`DB_NAME=...\`
   - \`JWT_SECRET=...\`
4. Run **NPM Install** in hPanel (automatically runs \`prisma generate\`).
5. Run \`npx prisma db push\` via SSH / hPanel Terminal to sync your MySQL tables.
6. Start / Restart the Node.js application.

## Step 3: Deploy Frontend (hPanel → File Manager → public_html)
1. Upload \`frontend-public_html.zip\` into \`public_html/\` and extract it (ensure \`.htaccess\` and \`index.html\` are directly inside \`public_html/\`).
2. Ensure \`/api/*\` requests on your domain reverse-proxy to your Node.js backend port (e.g. via hPanel Reverse Proxy / LiteSpeed context or subdomain).
`;
fs.writeFileSync(path.join(OUT_DIR, 'DEPLOY-HOSTINGER-HPANEL.md'), deployGuide, 'utf-8');

// 7. Create ZIP Archives
console.log('\n🗜️  Creating ZIP archives...');
const frontendZip = path.join(OUT_DIR, 'frontend-public_html.zip');
const backendZip = path.join(OUT_DIR, 'backend-nodejs.zip');
const combinedZip = path.join(OUT_DIR, 'doormaster-hostinger-hpanel.zip');

zipDirectory(FRONTEND_STAGE, frontendZip);
zipDirectory(BACKEND_STAGE, backendZip);

// Create combined zip containing both folders and the guide (excluding nested zips)
if (process.platform === 'win32') {
  run(
    `powershell -NoProfile -Command "Compress-Archive -Path '${FRONTEND_STAGE}','${BACKEND_STAGE}','${path.join(OUT_DIR, 'DEPLOY-HOSTINGER-HPANEL.md')}' -DestinationPath '${combinedZip}' -Force"`
  );
} else {
  run(
    `zip -r -q "${combinedZip}" frontend-public_html backend-nodejs DEPLOY-HOSTINGER-HPANEL.md`,
    OUT_DIR
  );
}

const formatSize = (file) => `${(fs.statSync(file).size / (1024 * 1024)).toFixed(2)} MB`;

console.log('\n==============================================================');
console.log(' ✅ Hostinger hPanel Production Build & Zips Complete!');
console.log('==============================================================');
console.log(` 📁 Output Folder : deploy-hostinger/`);
console.log(` 🗜️  Frontend Zip  : deploy-hostinger/frontend-public_html.zip (${formatSize(frontendZip)})`);
console.log(` 🗜️  Backend Zip   : deploy-hostinger/backend-nodejs.zip (${formatSize(backendZip)})`);
console.log(` 🗜️  Combined Zip  : deploy-hostinger/doormaster-hostinger-hpanel.zip (${formatSize(combinedZip)})`);
console.log(` 📄 Deploy Guide  : deploy-hostinger/DEPLOY-HOSTINGER-HPANEL.md`);
console.log('==============================================================\n');

