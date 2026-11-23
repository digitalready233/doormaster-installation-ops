import prisma from './prisma';
import * as crypto from 'node:crypto';
import dotenv from 'dotenv';
import path from 'node:path';
import { seedTeamsAndRolesIfNeeded } from './teams-service';

// Load environment variables. The second call supports starting the server
// from the repository root instead of the backend directory.
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
}

export const dbConfig: DbConfig = {
  host: process.env['DB_HOST'] || '127.0.0.1',
  port: Number(process.env['DB_PORT']) || 3306,
  user: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_NAME'] || 'doormaster_ops',
};

// Hash format: scrypt$<salt hex>$<derived key hex>
// Legacy hashes (pre-2026 upgrade) are bare 64-byte PBKDF2-SHA512 hex strings.
const SCRYPT_KEY_LENGTH = 64;
const LEGACY_PBKDF2_SALT = 'doormaster_precision_salt_2026';
const LEGACY_PBKDF2_ITERATIONS = 1000;

function timingSafeEqualHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Hashes a password with a per-user random salt using scrypt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

/**
 * Verifies both current scrypt hashes and legacy PBKDF2 hashes.
 */
export function verifyPassword(password: string, hash: string): boolean {
  if (!password || !hash) return false;

  try {
    if (hash.startsWith('scrypt$')) {
      const [, salt, expected] = hash.split('$');
      if (!salt || !expected) return false;
      const derived = crypto.scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('hex');
      return timingSafeEqualHex(derived, expected);
    }

    // Legacy PBKDF2-SHA512 hash
    if (/^[a-f0-9]{128}$/i.test(hash)) {
      const derived = crypto
        .pbkdf2Sync(password, LEGACY_PBKDF2_SALT, LEGACY_PBKDF2_ITERATIONS, SCRYPT_KEY_LENGTH, 'sha512')
        .toString('hex');
      return timingSafeEqualHex(derived, hash);
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Returns true when a stored hash uses the deprecated legacy format and
 * should be transparently upgraded on the next successful sign-in.
 */
export function needsPasswordRehash(hash: string): boolean {
  return !hash.startsWith('scrypt$');
}

export async function initDatabase(): Promise<{ success: boolean; message: string; tables: string[] }> {
  try {
    // 1. Verify Prisma connection
    await prisma.$connect();

    // 2. Seed/verify default verified users for all roles & branch managers
    const userCount = await prisma.user.count();
    const defaultPasswordHash = hashPassword('DoorMaster2026!*');
    const seedUsers = [
        {
          id: 'USR-ADM-01',
          name: 'Alexander Cross',
          email: 'admin@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'admin',
          phone: '+233 24 555 0100',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-MGR-01',
          name: 'Sarah Sterling',
          email: 'manager@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'manager',
          phone: '+233 24 555 0101',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        },
        // Team Alpha (3 Installers - Lead: Marcus Vance)
        {
          id: 'USR-INS-01',
          name: 'Marcus Vance',
          email: 'm.vance@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'installer',
          phone: '+233 24 555 0102',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-INS-02',
          name: 'Benjamin Koranteng',
          email: 'b.koranteng@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'installer',
          phone: '+233 24 555 0112',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-INS-03',
          name: 'Joseph Annan',
          email: 'j.annan@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'installer',
          phone: '+233 24 555 0113',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        },

        // Team Bravo (3 Installers - Lead: Derrick Bruce)
        {
          id: 'USR-INS-04',
          name: 'Derrick Bruce',
          email: 'd.bruce@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'installer',
          phone: '+233 24 555 0114',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-INS-05',
          name: 'Emmanuel Ofori',
          email: 'e.ofori@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'installer',
          phone: '+233 24 555 0115',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-INS-06',
          name: 'Patrick Gyasi',
          email: 'p.gyasi@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'installer',
          phone: '+233 24 555 0116',
          avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-CLI-01',
          name: 'Kwame Mensah',
          email: 'client@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'client',
          phone: '+233 24 555 0103',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-FIN-01',
          name: 'Abena Osei',
          email: 'finance@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'account_officer',
          phone: '+233 24 555 0104',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-01',
          name: 'Elena Rostova',
          email: 'shop@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-obeyeyie',
          phone: '+233 24 555 0105',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-OBY',
          name: 'Kofi Boateng',
          email: 'shop.obeyeyie@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-obeyeyie',
          phone: '0203169184',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-PBM-TRK',
          name: 'Yaw Antwi',
          email: 'shop.pobiman-turkey@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-pobiman-turkey',
          phone: '0207867882',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-PBM-ECO',
          name: 'Kwabena Agyeman',
          email: 'shop.pobiman-economy@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-pobiman-economy',
          phone: '0502584180',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-ACP',
          name: 'Akua Darko',
          email: 'shop.acp@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-acp',
          phone: '0201705689',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-NSW-OVH',
          name: 'Kwame Appiah',
          email: 'shop.nsawam-overhead@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-nsawam-overhead',
          phone: '0505892144',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-NSW-HSP',
          name: 'Ama Serwaa',
          email: 'shop.nsawam-hospital@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-nsawam-hospital',
          phone: '0535825645',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-TMA',
          name: 'Ebenezer Quaye',
          email: 'shop.tema@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-tema',
          phone: '0502290982',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-SHM',
          name: 'Daniel Asare',
          email: 'shop.suhum@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-suhum',
          phone: '0201752755',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-ASH',
          name: 'Francis Mensah',
          email: 'shop.ashalaja@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-ashalaja',
          phone: '0504725294',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-KSI-AHN',
          name: 'Osei Tutu',
          email: 'shop.kumasi-ahinsan@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-kumasi-ahinsan',
          phone: '0535829827',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-KAS-TIP',
          name: 'Kojo Baidoo',
          email: 'shop.kasoa-tipa@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-kasoa-tipa',
          phone: '0533739756',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-AMR',
          name: 'Priscilla Kyei',
          email: 'shop.amrahia@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-amrahia',
          phone: '0531025779',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-TSE',
          name: 'Nathaniel Tagoe',
          email: 'shop.tseaddo@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-tseaddo',
          phone: '0591952205',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-SHP-KSI-KRN',
          name: 'Baffour Gyan',
          email: 'shop.kronum@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'shop_manager',
          shopId: 'dm-branch-kronum',
          phone: '0531025775',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        // Branch Dispatchers (1 Dispatcher for each of the 15 DoorMaster Branches)
        {
          id: 'USR-DSP-01',
          name: 'Emmanuel Kojo',
          email: 'dispatch@doormasterops.com',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-obeyeyie',
          phone: '+233 24 555 0106',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-OBY',
          name: 'Kwesi Mensah',
          email: 'dispatch.obeyeyie@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-obeyeyie',
          phone: '0203169185',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-PBM-TRK',
          name: 'Isaac Owusu',
          email: 'dispatch.pobiman-turkey@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-pobiman-turkey',
          phone: '0207867883',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-PBM-ECO',
          name: 'David Osei',
          email: 'dispatch.pobiman-economy@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-pobiman-economy',
          phone: '0502584181',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-ACP',
          name: 'Bright Annan',
          email: 'dispatch.acp@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-acp',
          phone: '0201705690',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-NSW-OVH',
          name: 'Samuel Boakye',
          email: 'dispatch.nsawam-overhead@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-nsawam-overhead',
          phone: '0505892145',
          avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-NSW-HSP',
          name: 'Peter Tetteh',
          email: 'dispatch.nsawam-hospital@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-nsawam-hospital',
          phone: '0535825646',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-TMA',
          name: 'Joseph Adjei',
          email: 'dispatch.tema@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-tema',
          phone: '0502290983',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-SHM',
          name: 'Richmond Darko',
          email: 'dispatch.suhum@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-suhum',
          phone: '0201752756',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-ASH',
          name: 'Collins Frimpong',
          email: 'dispatch.ashalaja@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-ashalaja',
          phone: '0504725295',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-KSI-AHN',
          name: 'Evans Opoku',
          email: 'dispatch.kumasi-ahinsan@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-kumasi-ahinsan',
          phone: '0535829828',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-KAS-TIP',
          name: 'George Arthur',
          email: 'dispatch.kasoa-tipa@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-kasoa-tipa',
          phone: '0533739757',
          avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-AMR',
          name: 'Felix Quaye',
          email: 'dispatch.amrahia@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-amrahia',
          phone: '0531025780',
          avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-TSE',
          name: 'Michael Lamptey',
          email: 'dispatch.tseaddo@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-tseaddo',
          phone: '0591952206',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'USR-DSP-KSI-KRN',
          name: 'Charles Boadu',
          email: 'dispatch.kronum@doormaster.online',
          passwordHash: defaultPasswordHash,
          role: 'dispatcher',
          shopId: 'dm-branch-kronum',
          phone: '0531025776',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
      ];

    for (const u of seedUsers) {
      const existing = await prisma.user.findUnique({ where: { email: u.email } });
      await prisma.user.upsert({
        where: { email: u.email },
        update: {
          name: u.name,
          phone: u.phone,
          avatarUrl: u.avatarUrl,
          role: u.role,
          ...(!existing?.shopId && (u as any).shopId ? { shopId: (u as any).shopId } : {}),
        },
        create: u,
      });
    }
    console.log(`[Prisma] Seeded/verified ${seedUsers.length} persona accounts.`);

    await seedTeamsAndRolesIfNeeded();

    const tables = ['doors', 'categories', 'users', 'installation_teams', 'role_definitions', 'installation_jobs', 'sms_logs'];

    return {
      success: true,
      message: `Database ${dbConfig.database} connected via Prisma ORM with ${tables.length} managed models.`,
      tables,
    };
  } catch (err) {
    const errorMsg = (err as Error).message;
    console.error('[Prisma] Database initialization notice:', errorMsg);
    return {
      success: false,
      message: `Prisma initialization notice: ${errorMsg}`,
      tables: [],
    };
  }
}

export async function getDbStatus(): Promise<{
  connected: boolean;
  database: string;
  host: string;
  port: number;
  tables: string[];
  doorCount: number;
  categoryCount: number;
  userCount: number;
  jobCount: number;
  smsCount: number;
  error?: string | null;
}> {
  try {
    const [doorCount, categoryCount, userCount, jobCount, smsCount] = await Promise.all([
      prisma.door.count().catch(() => 0),
      prisma.category.count().catch(() => 0),
      prisma.user.count().catch(() => 0),
      prisma.installationJob.count().catch(() => 0),
      prisma.smsLog.count().catch(() => 0),
    ]);

    return {
      connected: true,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      tables: ['doors', 'categories', 'users', 'installation_jobs', 'sms_logs'],
      doorCount,
      categoryCount,
      userCount,
      jobCount,
      smsCount,
      error: null,
    };
  } catch (err) {
    return {
      connected: false,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      tables: [],
      doorCount: 0,
      categoryCount: 0,
      userCount: 0,
      jobCount: 0,
      smsCount: 0,
      error: (err as Error).message,
    };
  }
}
