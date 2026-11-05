import { PrismaClient } from '@prisma/client';

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
