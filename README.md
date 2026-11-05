# DoorMaster Precision Installation & Operations Management

Fullstack platform split into two independent apps:

```
doormaster-installation-ops/
├── backend/                # Node.js + Express + Prisma + MySQL API (port 3001)
│   ├── prisma/             # schema.prisma + migrations
│   ├── src/                # server.ts, services, Prisma client
│   ├── data/               # doors-catalog.json backup (329 doors)
│   ├── scripts/            # scrape-all.mjs (doormaster.online pages 1–28)
│   ├── .env                # MySQL / JWT config
│   └── package.json
│
├── frontend/               # Angular 21 SPA (port 4200)
│   ├── src/                # app, index.html, main.ts, styles.css
│   ├── public/             # PWA icons, manifest, sw.js, local icon fonts
│   ├── scripts/            # create-png-icons.mjs (PWA icon generator)
│   ├── angular.json, tsconfig*.json, eslint.config.js, .postcssrc.json
│   ├── proxy.conf.json     # /api -> http://127.0.0.1:3001
│   └── package.json
│
└── package.json            # Orchestration scripts only (no dependencies)
```

## Quick Start

```bash
npm run install:all      # installs backend + frontend dependencies
npm run prisma:generate  # generate Prisma client
npm run prisma:migrate   # apply migrations to MySQL (doormaster_ops)
npm run dev              # backend (3001) + frontend (4200) together
```

Open http://localhost:4200 — API calls are proxied to the backend.

## Root Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Run backend and frontend together |
| `npm run start:backend` / `dev:backend` | Backend API only |
| `npm run start:frontend` / `dev:frontend` | Angular dev server only |
| `npm run build` | Build backend then frontend |
| `npm run lint` / `npm test` | Frontend lint / tests |
| `npm run prisma:migrate` / `prisma:status` / `prisma:studio` | Prisma tooling |
| `npm run scrape:all` | Scrape all 28 shop pages into MySQL |
| `npm run icons:generate` | Regenerate PWA PNG icons |
