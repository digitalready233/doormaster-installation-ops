import dotenv from 'dotenv';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

// Load .env before instantiating PrismaClient (ESM imports are hoisted above server.ts top-level code)
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });
if (typeof import.meta !== 'undefined' && (import.meta as any).dirname) {
  dotenv.config({ path: path.resolve((import.meta as any).dirname, '../.env') });
}

if (!process.env['DATABASE_URL'] && process.env['DB_USER'] && process.env['DB_NAME']) {
  const host = process.env['DB_HOST'] || '127.0.0.1';
  const port = process.env['DB_PORT'] || '3306';
  const user = encodeURIComponent(process.env['DB_USER']);
  const pass = encodeURIComponent(process.env['DB_PASSWORD'] || '');
  const db = encodeURIComponent(process.env['DB_NAME']);
  process.env['DATABASE_URL'] = `mysql://${user}:${pass}@${host}:${port}/${db}`;
}

declare global {
  // eslint-disable-next-line no-var
  var __prismaClientInstance: PrismaClient | undefined;
}

// Reuse PrismaClient instance in development to prevent exhausting MySQL connections
export const prisma = globalThis.__prismaClientInstance || new PrismaClient({
  log: ['warn', 'error'],
});

if (process.env['NODE_ENV'] !== 'production') {
  globalThis.__prismaClientInstance = prisma;
}

export default prisma;
