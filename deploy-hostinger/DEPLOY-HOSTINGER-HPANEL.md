# DoorMaster Installation Ops - Hostinger hPanel Deployment Guide

## Package Contents
- `frontend-public_html.zip` — Angular production build + `.htaccess` for `public_html/`
- `backend-nodejs.zip` — Compiled Node.js + Prisma backend (`dist/server.js`) for Hostinger Node.js App
- `doormaster-hostinger-hpanel.zip` — Combined archive containing both folders & this guide

---

## Step 1: Create MySQL Database in hPanel
1. Go to **hPanel → Databases → Management**.
2. Create a new MySQL database and user, and note down `DB_NAME`, `DB_USER`, and `DB_PASSWORD`.

## Step 2: Deploy Backend (hPanel → Websites → Node.js / Cloud Hosting)
1. Upload `backend-nodejs.zip` to your Node.js app root directory and extract it.
2. Set **Application Startup File** to `dist/server.js`.
3. Add Environment Variables (or create `.env` from `.env.example`):
   - `NODE_ENV=production`
   - `PORT=3001` (or the port assigned by hPanel)
   - `DATABASE_URL="mysql://DB_USER:DB_PASSWORD@127.0.0.1:3306/DB_NAME"`
   - `DB_HOST=127.0.0.1`, `DB_PORT=3306`, `DB_USER=...`, `DB_PASSWORD=...`, `DB_NAME=...`
   - `JWT_SECRET=...`
4. Run **NPM Install** in hPanel (automatically runs `prisma generate`).
5. Run `npx prisma db push` via SSH / hPanel Terminal to sync your MySQL tables.
6. Start / Restart the Node.js application.

## Step 3: Deploy Frontend (hPanel → File Manager → public_html)
1. Upload `frontend-public_html.zip` into `public_html/` and extract it (ensure `.htaccess` and `index.html` are directly inside `public_html/`).
2. Ensure `/api/*` requests on your domain reverse-proxy to your Node.js backend port (e.g. via hPanel Reverse Proxy / LiteSpeed context or subdomain).
