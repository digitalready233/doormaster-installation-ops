# DoorMaster Installation Ops - Backend API

Standalone Node.js + Express + Prisma ORM + MySQL 8.0 backend service for the DoorMaster Precision Installation & Operations Management platform.

## Features
- **Prisma ORM**: Type-safe schema management and migrations (`prisma/schema.prisma`).
- **MySQL 8.0 Database**: Persistent storage for doors, categories, users, installation jobs, and SMS logs.
- **Web Scraper**: Scrapes 28 pages from `https://doormaster.online/shop/` and saves directly into MySQL.
- **Role-Based Authentication**: scrypt password hashing (legacy PBKDF2 hashes upgrade automatically on sign-in), signed JWT sessions with issuer/audience validation, login rate limiting, and account-status enforcement.
- **CORS & Dev Proxy Ready**: Listens on port 3001 with CORS enabled.

## Environment Variables (`.env`)
```env
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=doormaster_ops
DATABASE_URL="mysql://root@127.0.0.1:3306/doormaster_ops"

# Generate with: openssl rand -hex 48
JWT_SECRET=replace-with-a-long-random-secret
JWT_ISSUER=doormaster-ops
JWT_AUDIENCE=doormaster-ops-web
JWT_TTL_SECONDS=604800
```

## Available Scripts
- `npm start`: Start the backend server (`tsx src/server.ts`)
- `npm run dev`: Start backend in watch mode (`tsx watch src/server.ts`)
- `npm run prisma:generate`: Generate Prisma Client
- `npm run prisma:migrate`: Apply and run Prisma migrations
- `npm run prisma:status`: Check migration status
- `npm run prisma:studio`: Open interactive Prisma Studio web UI
- `npm run scrape:all`: Scrape all 28 catalog pages from DoorMaster into MySQL

## API Endpoints
- `GET /health`: Service health and database connection summary
- `GET /api/db/status`: Live MySQL table statistics and door/category counts
- `POST /api/auth/signin`: Authenticate user against MySQL `users` table (rate limited; requires email **and** password)
- `POST /api/auth/register`: Create a new user in MySQL (rate limited; self-registration starts as `pending`)
- `GET /api/auth/me`: Validate a bearer token and return the active user (used to restore sessions)
- `GET /api/auth/users`: List users (requires a valid bearer token)
- `POST /api/auth/users`, `PATCH /api/auth/users/:id/status`, `DELETE /api/auth/users/:id`: User administration (manager role required)

### Authentication
- Sign-in requires both `email` and `password`; failed attempts return a generic `Invalid email or password.`
- Passwords use per-user salted **scrypt** hashes. Legacy PBKDF2 hashes are upgraded automatically on the next successful sign-in.
- Sessions are signed JWTs (`HS256`) with `iss`, `aud`, `iat`, `exp` and `jti` claims. Send them as `Authorization: Bearer <token>`.
- Sign-in is rate limited per IP + email (10 per 15 min) and per IP (50 per 15 min). Registration is limited to 5 attempts per hour per IP.
- `GET` catalog/dashboard data stays public; operational writes and user administration require an active session. Deactivating an account invalidates its existing tokens immediately.
- `GET /api/doors`: Fetch all doors from MySQL database
- `GET /api/doors/categories`: Fetch all categorized doors from MySQL
- `POST /api/doors/scrape-all`: Trigger live multi-page scraping into MySQL
- `GET /api/jobs`: List installation jobs from MySQL
- `POST /api/jobs`: Create or update an installation job in MySQL
- `GET /api/sms/logs`: Fetch dispatch SMS audit logs
- `POST /api/sms/log`: Record an SMS dispatch event
