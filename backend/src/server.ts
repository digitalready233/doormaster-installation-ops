import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });
if (typeof import.meta !== 'undefined' && (import.meta as any).dirname) {
  dotenv.config({ path: path.resolve((import.meta as any).dirname, '../.env') });
}

import {
  initDatabase,
  getDbStatus,
  dbConfig
} from './db';
import prisma from './prisma';

import {
  getDoorsCatalog,
  getDoorCategories,
  addDoorEntry,
  updateDoorEntry,
  updateDoorStock,
  deleteDoor
} from './doors-service';

import {
  getUserThreadsAndMessages,
  getConversationMessages,
  createChatMessage,
  editChatMessage,
  deleteChatMessage,
  toggleMessageReaction,
  markConversationRead,
  setTypingStatus
} from './messages-service';

import {
  authenticateUser,
  registerUser,
  getAllUsers,
  createUserByManager,
  updateUserStatus,
  updateUserProfile,
  deleteUser,
  verifyToken,
  getUserById
} from './auth-service';

import type { AuthTokenPayload, UserRecord } from './auth-service';
import { createRateLimiter, loginRateLimitKey } from './rate-limit';

import {
  getJobsFromDb,
  saveJobToDb,
  seedJobsIfEmpty,
  seedAllBranches,
  backfillJobShopReferences,
  getSmsLogsFromDb,
  logSmsToDb,
  saveInstallerTrackSession,
  getInstallerTrackSessions,
  saveDispatchTracking,
  getDispatchTracking,
  saveInquiry,
  getInquiries,
  saveCustomerSignoff,
  getNotificationsFromDb,
  saveNotificationToDb,
  markNotificationReadInDb,
  markAllNotificationsReadInDb,
  getShopLocationsFromDb,
  getPrimaryShopLocationFromDb,
  saveShopLocationToDb,
  upsertLiveLocation,
  getAllLiveLocations,
  getLiveLocationByUserId,
  setLiveLocationOffline,
  getClientsFromDb,
  getClientByIdFromDb,
  getJobByIdWithRelations,
  deleteJobFromDb
} from './jobs-service';

import {
  getTeamsWithMembers,
  createTeamInDb,
  updateTeamInDb,
  deleteTeamInDb,
  upsertTeamMemberInDb,
  removeTeamMemberFromDb,
  getRolesFromDb,
  upsertRoleInDb,
  deleteCustomRoleInDb
} from './teams-service';

const app = express();
const port = process.env['PORT'] || 3001;

const allowedOrigins = (process.env['CORS_ORIGINS'] || process.env['APP_URL'] || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const isDevLocalOrigin = (origin: string): boolean =>
  process.env['NODE_ENV'] !== 'production' &&
  /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/i.test(origin);

// Enable Cross-Origin Resource Sharing for separated frontend
app.use(cors({
  origin: allowedOrigins.length > 0
    ? (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || isDevLocalOrigin(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    : (process.env['NODE_ENV'] === 'production' ? false : true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-actor-user-id']
}));

app.use(express.json());

/**
 * ============================================================================
 * AUTH MIDDLEWARE & RATE LIMITING
 * ============================================================================
 */

const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many sign-in attempts. Please wait before trying again.',
});

// Coarser per-IP cap so rotating email addresses cannot bypass the limiter.
const loginIpRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many sign-in attempts from this address.',
});

const registerRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many registration attempts from this address.',
});

function bearerToken(req: express.Request): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== 'string') return null;
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim();
}

/**
 * Verifies the JWT on the request and attaches the payload to `req.auth`.
 * Responds 401 when the token is missing, malformed, expired or forged.
 */
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const token = bearerToken(req);
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    res.status(401).json({ success: false, message: 'Authentication required or session expired.' });
    return;
  }

  (req as any).auth = payload;
  next();
}

/**
 * Requires a valid token plus an active database user (any role).
 * Revokes access immediately when an account is deactivated.
 */
async function requireActiveUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const token = bearerToken(req);
  const payload: AuthTokenPayload | null = token ? verifyToken(token) : null;

  if (!payload) {
    res.status(401).json({ success: false, message: 'Authentication required or session expired.' });
    return;
  }

  try {
    const user = await getUserById(payload.sub);
    if (!user || user.status !== 'active') {
      res.status(401).json({ success: false, message: 'This account is no longer active.' });
      return;
    }

    (req as any).auth = payload;
    (req as any).user = user;
    next();
  } catch (err) {
    console.error('[Server] Error verifying active user:', err);
    res.status(500).json({ success: false, message: 'Authentication service unavailable.' });
  }
}

/**
 * Requires a valid token plus an active database user with one of the given roles.
 */
function requireRole(roles: string[]) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await requireActiveUser(req, res, async () => {
      const user = (req as any).user as UserRecord | undefined;
      if (!user) {
        res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
        return;
      }
      if (roles.includes(user.role)) {
        next();
        return;
      }
      // Also honor custom RBAC roles that have been granted governance permissions
      if (roles.includes('admin')) {
        try {
          const allRoles = await getRolesFromDb();
          const matchedRole = allRoles.find(r => r.id === user.role);
          if (matchedRole?.permissions?.canManageRoles) {
            next();
            return;
          }
        } catch {
          // ignore lookup failure
        }
      }
      res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
    });
  };
}

// Initialize MySQL database on startup asynchronously via Prisma
(async () => {
  try {
    await seedAllBranches();
    const initRes = await initDatabase();
    console.log('[Backend Server Startup]', initRes.message);
    await seedJobsIfEmpty();
    await backfillJobShopReferences();
  } catch (err) {
    console.warn('[Backend Server Startup] DB notice:', (err as Error).message);
  }
})();

/**
 * Health Check & Service Info
 */
app.get(['/health', '/api/health'], async (_req, res) => {
  try {
    const status = await getDbStatus();
    res.json({
      status: 'online',
      service: 'DoorMaster Operations Backend API',
      database: status.database,
      connected: status.connected,
      doorCount: status.doorCount,
      categoryCount: status.categoryCount,
      userCount: status.userCount,
      engine: 'Prisma ORM + MySQL 8.0'
    });
  } catch (error) {
    res.status(500).json({ status: 'degraded', error: (error as Error).message });
  }
});

/**
 * ============================================================================
 * DATABASE HEALTH & DIAGNOSTICS ENDPOINTS
 * ============================================================================
 */

app.get('/api/db/status', async (_req, res) => {
  try {
    const status = await getDbStatus();
    res.json({
      success: true,
      status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve database status',
      error: (error as Error).message
    });
  }
});

app.post('/api/db/init', requireRole(['admin']), async (_req, res) => {
  try {
    await seedAllBranches();
    const result = await initDatabase();
    await seedJobsIfEmpty();
    await backfillJobShopReferences();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database init failed',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * AUTHENTICATION ENDPOINTS (MySQL Users via Prisma)
 * ============================================================================
 */

app.post('/api/auth/signin', loginIpRateLimiter, loginRateLimiter, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const authRes = await authenticateUser(email, password);
    if (!authRes.success) {
      res.status(401).json(authRes);
      return;
    }

    loginRateLimiter.reset(loginRateLimitKey(req));
    res.json(authRes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: (error as Error).message
    });
  }
});

/**
 * Returns the active user for a valid bearer token.
 * The SPA calls this to restore or reject a persisted session on load.
 */
app.get('/api/auth/me', requireAuth, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const payload = (req as any).auth as AuthTokenPayload;
    const user = await getUserById(payload.sub);

    if (!user || user.status !== 'active') {
      res.status(401).json({ success: false, message: 'This account is no longer active.' });
      return;
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to restore session',
      error: (error as Error).message
    });
  }
});

app.post('/api/auth/register', registerRateLimiter, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { name, email, password, role, phone, avatarUrl, shopId } = req.body;
    if (!name || !email || !role || !password) {
      res.status(400).json({ success: false, message: 'Name, email, password, and role are required' });
      return;
    }

    const regRes = await registerUser({ name, email, password, role, phone, avatarUrl, shopId });
    if (!regRes.success) {
      res.status(400).json(regRes);
      return;
    }

    res.status(201).json(regRes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: (error as Error).message
    });
  }
});

app.get(['/api/auth/users', '/api/users'], requireActiveUser, async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: (error as Error).message
    });
  }
});

app.post(['/api/auth/users', '/api/users'], requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { name, email, password, role, phone, avatarUrl, status, shopId, teamId, teamRole, teamPosition } = req.body;
    if (!name || !email || !role) {
      res.status(400).json({ success: false, message: 'Name, email, and role are required' });
      return;
    }

    const result = await createUserByManager({
      name,
      email,
      password,
      role,
      phone,
      avatarUrl,
      status: status || 'active',
      shopId,
      teamId,
      teamRole,
      teamPosition,
    });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed creating user',
      error: (error as Error).message
    });
  }
});

app.patch(['/api/auth/users/:id', '/api/users/:id'], requireActiveUser, async (req, res) => {
  try {
    const id = String(req.params.id);
    const caller = (req as any).user as UserRecord;
    const isPrivileged = caller.role === 'admin' || caller.role === 'manager';

    if (!isPrivileged && caller.id !== id) {
      res.status(403).json({ success: false, message: 'You do not have permission to update another user.' });
      return;
    }

    const { name, email, phone, avatarUrl, role, status, shopId, teamId, teamRole, teamPosition } = req.body;
    if (!isPrivileged && (role !== undefined || status !== undefined || shopId !== undefined || teamId !== undefined || teamRole !== undefined || teamPosition !== undefined)) {
      res.status(403).json({ success: false, message: 'Only administrators or managers can change roles, status, or branch/team assignments.' });
      return;
    }

    const result = await updateUserProfile(id, {
      name,
      email,
      phone,
      avatarUrl,
      ...(isPrivileged ? { role, status, shopId, teamId, teamRole, teamPosition } : {}),
    });
    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed updating user profile',
      error: (error as Error).message
    });
  }
});

app.patch(['/api/auth/users/:id/status', '/api/users/:id/status'], requireRole(['admin']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ success: false, message: 'Status is required (active, pending, rejected, deactivated)' });
      return;
    }

    const result = await updateUserStatus(id, status);
    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed updating user status',
      error: (error as Error).message
    });
  }
});

app.delete(['/api/auth/users/:id', '/api/users/:id'], requireRole(['admin']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const result = await deleteUser(id);
    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed deleting user',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * INSTALLATION TEAMS, MEMBERS & POSITIONS + ROLE DEFINITIONS SYNC ENDPOINTS
 * ============================================================================
 */

app.get('/api/teams', requireActiveUser, async (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const teams = await getTeamsWithMembers();
    res.json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve installation teams',
      error: (error as Error).message,
    });
  }
});

app.post('/api/teams', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { name, code, description, specialties, positions, color, status, members } = req.body;
    const result = await createTeamInDb({
      name,
      code,
      description,
      specialties,
      positions,
      color,
      status,
      members,
    });
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed creating team',
      error: (error as Error).message,
    });
  }
});

app.patch('/api/teams/:id', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const { name, code, description, specialties, positions, color, status, leadId } = req.body;
    const result = await updateTeamInDb(id, {
      name,
      code,
      description,
      specialties,
      positions,
      color,
      status,
      leadId,
    });
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed updating team',
      error: (error as Error).message,
    });
  }
});

app.delete('/api/teams/:id', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const result = await deleteTeamInDb(id);
    if (!result.success) {
      res.status(404).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed deleting team',
      error: (error as Error).message,
    });
  }
});

app.post('/api/teams/:id/members', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const teamId = String(req.params.id);
    const { userId, position, teamRole } = req.body;
    if (!userId) {
      res.status(400).json({ success: false, message: 'userId is required to add a team member.' });
      return;
    }
    const result = await upsertTeamMemberInDb(teamId, {
      userId,
      position,
      teamRole,
    });
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed adding member to team',
      error: (error as Error).message,
    });
  }
});

app.patch('/api/teams/:id/members/:userId', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const teamId = String(req.params.id);
    const userId = String(req.params.userId);
    const { position, teamRole } = req.body;
    const result = await upsertTeamMemberInDb(teamId, {
      userId,
      position,
      teamRole,
    });
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed updating team member position',
      error: (error as Error).message,
    });
  }
});

app.delete('/api/teams/:id/members/:userId', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const teamId = String(req.params.id);
    const userId = String(req.params.userId);
    const result = await removeTeamMemberFromDb(teamId, userId);
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed removing member from team',
      error: (error as Error).message,
    });
  }
});

app.get('/api/roles', requireActiveUser, async (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const roles = await getRolesFromDb();
    res.json({
      success: true,
      count: roles.length,
      roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed retrieving role definitions',
      error: (error as Error).message,
    });
  }
});

app.post('/api/roles', requireRole(['admin']), async (req, res) => {
  try {
    const roleDef = req.body;
    if (!roleDef || !roleDef.id || !roleDef.name) {
      res.status(400).json({ success: false, message: 'Role id and name are required.' });
      return;
    }
    const result = await upsertRoleInDb(roleDef);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed creating custom role',
      error: (error as Error).message,
    });
  }
});

app.patch('/api/roles/:id', requireRole(['admin']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const result = await upsertRoleInDb({ ...req.body, id });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed updating role definition',
      error: (error as Error).message,
    });
  }
});

app.delete('/api/roles/:id', requireRole(['admin']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const result = await deleteCustomRoleInDb(id);
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed deleting custom role',
      error: (error as Error).message,
    });
  }
});

/**
 * ============================================================================
 * DOORS & CATEGORIES ENDPOINTS (Prisma ORM + MySQL)
 * ============================================================================
 */

app.get('/api/doors', async (req, res) => {
  try {
    const result = await getDoorsCatalog();
    let doors = result.doors;

    const category = req.query['category'] as string;
    if (category && category !== 'all') {
      doors = doors.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }

    const search = req.query['search'] as string;
    if (search) {
      const q = search.toLowerCase();
      doors = doors.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.modelCode.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      totalCount: result.doors.length,
      filteredCount: doors.length,
      source: result.source,
      lastSync: result.lastSync,
      doors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve door catalog',
      error: (error as Error).message
    });
  }
});

app.post('/api/doors/scrape-all', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const rawStart = Number(req.body?.startPage);
    const rawEnd = Number(req.body?.endPage);
    const startPage = Number.isFinite(rawStart) ? Math.max(1, Math.min(50, Math.floor(rawStart))) : 1;
    const endPage = Number.isFinite(rawEnd) ? Math.max(startPage, Math.min(50, Math.floor(rawEnd))) : Math.max(startPage, 28);

    const { scrapeAllPages } = await import('./scraper-service');
    const result = await scrapeAllPages(startPage, endPage);

    res.json({
      success: true,
      totalDoors: result.totalDoors,
      totalCategories: result.totalCategories,
      message: `Successfully scraped ${result.totalDoors} doors across ${result.totalCategories} categories from pages ${startPage} to ${endPage}.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Multi-page scraping failed',
      error: (error as Error).message
    });
  }
});

app.get('/api/doors/categories', async (_req, res) => {
  try {
    const categories = await getDoorCategories();
    res.json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
      error: (error as Error).message
    });
  }
});

app.post('/api/doors', requireRole(['admin', 'manager', 'shop_manager']), async (req, res) => {
  try {
    const newDoor = await addDoorEntry(req.body);
    res.status(201).json({
      success: true,
      door: newDoor,
      message: `Door "${newDoor.name}" (${newDoor.modelCode}) added to catalog successfully.`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add door',
      error: (error as Error).message
    });
  }
});

app.patch('/api/doors/:id', requireRole(['admin', 'manager', 'shop_manager']), async (req, res) => {
  try {
    const id = String(req.params['id']);
    const updated = await updateDoorEntry(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: `Door ${id} not found` });
      return;
    }
    res.json({
      success: true,
      door: updated,
      message: `Door "${updated.name}" updated successfully.`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update door',
      error: (error as Error).message
    });
  }
});

app.put('/api/doors/:id', requireRole(['admin', 'manager', 'shop_manager']), async (req, res) => {
  try {
    const id = String(req.params['id']);
    const updated = await updateDoorEntry(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: `Door ${id} not found` });
      return;
    }
    res.json({
      success: true,
      door: updated,
      message: `Door "${updated.name}" updated successfully.`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update door',
      error: (error as Error).message
    });
  }
});

app.patch('/api/doors/:id/stock', requireRole(['admin', 'manager', 'shop_manager']), async (req, res) => {
  try {
    const id = String(req.params['id']);
    const { stockQuantity, status } = req.body;
    const updated = await updateDoorStock(id, Number(stockQuantity), status);
    if (!updated) {
      res.status(404).json({ success: false, message: `Door ${id} not found` });
      return;
    }
    res.json({
      success: true,
      door: updated,
      message: `Door specifications and stock updated successfully.`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update door stock',
      error: (error as Error).message
    });
  }
});

app.delete('/api/doors/:id', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const id = String(req.params['id']);
    const deleted = await deleteDoor(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: `Door ${id} not found` });
      return;
    }
    res.json({
      success: true,
      message: `Door ${id} removed from catalog successfully.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete door',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * INSTALLATION JOBS & SMS DISPATCH ENDPOINTS (Prisma ORM)
 * ============================================================================
 */

app.get('/api/jobs', requireActiveUser, async (req, res) => {
  try {
    const queryShopId = typeof req.query['shopId'] === 'string' ? req.query['shopId'].trim() : '';
    const filterShopId: string | undefined = queryShopId && queryShopId !== 'all' ? queryShopId : undefined;

    const jobs = await getJobsFromDb(filterShopId);
    res.json({
      success: true,
      count: jobs.length,
      shopId: filterShopId || null,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve jobs',
      error: (error as Error).message
    });
  }
});

app.post('/api/jobs', requireActiveUser, async (req, res) => {
  try {
    const user = (req as any).user as UserRecord;

    const payload = {
      ...req.body,
      shopId: req.body?.shopId || user?.shopId || undefined,
      createdByUserId: user?.id,
    };

    const job = await saveJobToDb(payload);
    if (!job) {
      res.status(400).json({ success: false, message: 'Failed to save job' });
      return;
    }
    res.status(201).json({
      success: true,
      job,
      message: `Installation job ${job.id} saved successfully.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save job to database',
      error: (error as Error).message
    });
  }
});

app.delete('/api/jobs/:id', requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const id = String(req.params.id);
    const deleted = await deleteJobFromDb(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: `Job ${id} not found or could not be deleted.` });
      return;
    }
    res.json({
      success: true,
      message: `Installation job ${id} deleted successfully.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * RELATIONAL CLIENTS & JOB ENDPOINTS (Normalized Architecture & Zero Redundancy)
 * ============================================================================
 */

app.get('/api/clients', requireActiveUser, async (_req, res) => {
  try {
    const clients = await getClientsFromDb();
    res.json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve normalized clients',
      error: (error as Error).message
    });
  }
});

app.get('/api/clients/:id', requireActiveUser, async (req, res) => {
  try {
    const client = await getClientByIdFromDb(String(req.params.id));
    if (!client) {
      res.status(404).json({ success: false, message: 'Client not found' });
      return;
    }
    res.json({ success: true, client });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve client',
      error: (error as Error).message
    });
  }
});

app.get('/api/jobs/:id/relational', requireActiveUser, async (req, res) => {
  try {
    const job = await getJobByIdWithRelations(String(req.params.id));
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve relational job details',
      error: (error as Error).message
    });
  }
});

app.get('/api/sms/logs', requireActiveUser, async (_req, res) => {
  try {
    const logs = await getSmsLogsFromDb();
    res.json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve SMS logs',
      error: (error as Error).message
    });
  }
});

app.post('/api/sms/log', requireActiveUser, async (req, res) => {
  try {
    const log = await logSmsToDb(req.body);
    res.status(201).json({
      success: true,
      log,
      message: 'SMS message logged to MySQL via Prisma'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to log SMS to database',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * NOTIFICATIONS API
 * ============================================================================
 */
app.get('/api/notifications', requireActiveUser, async (req, res) => {
  try {
    const role = req.query['role'] as string | undefined;
    const userId = req.query['userId'] as string | undefined;
    const notifications = await getNotificationsFromDb(role, userId);
    res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve notifications',
      error: (error as Error).message
    });
  }
});

app.post('/api/notifications', requireActiveUser, async (req, res) => {
  try {
    const notif = await saveNotificationToDb(req.body);
    if (!notif) {
      res.status(400).json({ success: false, message: 'Failed to save notification' });
      return;
    }
    res.status(201).json({
      success: true,
      notification: notif,
      message: 'Notification persisted to MySQL'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: (error as Error).message
    });
  }
});

app.patch('/api/notifications/:id/read', requireActiveUser, async (req, res) => {
  try {
    const id = String(req.params.id);
    const success = await markNotificationReadInDb(id);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

app.patch('/api/notifications/mark-all-read', requireActiveUser, async (req, res) => {
  try {
    const role = (req.body && req.body.role) || (req.query['role'] as string) || 'all';
    const success = await markAllNotificationsReadInDb(role);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

/**
 * ============================================================================
 * SHOP LOCATION & WORKSHOP SETTINGS (Shop Manager Governance)
 * ============================================================================
 */
app.get('/api/shop-location', async (_req, res) => {
  try {
    const location = await getPrimaryShopLocationFromDb();
    res.json({
      success: true,
      location,
      shopLocation: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shop location settings',
      error: (error as Error).message
    });
  }
});

app.get('/api/shop-locations', async (_req, res) => {
  try {
    const locations = await getShopLocationsFromDb();
    res.json({
      success: true,
      count: locations.length,
      locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shop locations',
      error: (error as Error).message
    });
  }
});

app.post('/api/shop-location', requireRole(['admin', 'manager', 'shop_manager']), async (req, res) => {
  try {
    const location = await saveShopLocationToDb(req.body);
    if (!location) {
      return res.status(400).json({ success: false, message: 'Could not save shop location' });
    }
    res.status(200).json({
      success: true,
      location,
      shopLocation: location,
      message: `Shop location settings for ${location.shopName} saved successfully.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save shop location settings',
      error: (error as Error).message
    });
  }
});

app.put('/api/shop-location', requireRole(['admin', 'manager', 'shop_manager']), async (req, res) => {
  try {
    const location = await saveShopLocationToDb(req.body);
    if (!location) {
      return res.status(400).json({ success: false, message: 'Could not update shop location' });
    }
    res.status(200).json({
      success: true,
      location,
      shopLocation: location,
      message: `Shop location settings for ${location.shopName} updated successfully.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update shop location settings',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * INSTALLER TRACKING (CLOCK-IN / TRACK-IN SESSIONS)
 * ============================================================================
 */
app.get('/api/tracking/installer', requireActiveUser, async (req, res) => {
  try {
    const installerId = req.query['installerId'] as string;
    const jobId = req.query['jobId'] as string;
    const sessions = await getInstallerTrackSessions(installerId, jobId);
    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve installer track sessions',
      error: (error as Error).message
    });
  }
});

app.post('/api/tracking/installer', requireActiveUser, async (req, res) => {
  try {
    const session = await saveInstallerTrackSession(req.body);
    res.status(201).json({
      success: true,
      session,
      message: 'Installer track-in recorded to MySQL via Prisma'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record installer track session',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * DISPATCH RIDER / VEHICLE TRACKING
 * ============================================================================
 */
app.get('/api/tracking/dispatch', requireActiveUser, async (req, res) => {
  try {
    const jobId = req.query['jobId'] as string;
    const records = await getDispatchTracking(jobId);
    res.json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dispatch tracking',
      error: (error as Error).message
    });
  }
});

app.post('/api/tracking/dispatch', requireActiveUser, async (req, res) => {
  try {
    const track = await saveDispatchTracking(req.body);
    res.status(201).json({
      success: true,
      track,
      message: 'Dispatch tracking updated successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update dispatch tracking',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * INQUIRIES & QUOTE REQUESTS (Landing Page Form)
 * ============================================================================
 */
app.get('/api/inquiries', requireActiveUser, async (_req, res) => {
  try {
    const inquiries = await getInquiries();
    res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiries',
      error: (error as Error).message
    });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await saveInquiry(req.body);
    res.status(201).json({
      success: true,
      inquiry,
      message: 'Project inquiry submitted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save inquiry',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * CUSTOMER SIGNOFF & DIGITAL SIGNATURE
 * ============================================================================
 */
app.post('/api/signoff', requireActiveUser, async (req, res) => {
  try {
    const signoff = await saveCustomerSignoff(req.body);
    res.status(201).json({
      success: true,
      signoff,
      message: 'Customer sign-off and digital signature submitted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save customer signoff',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * LIVE GPS LOCATION TRACKING (Real-time positions of signed-in users)
 * ============================================================================
 */

/**
 * Publish/update the current user's live GPS position.
 * Called continuously from the frontend via navigator.geolocation.watchPosition.
 */
app.post('/api/location/update', requireActiveUser, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const payload = (req as any).user as { id: string; name: string; role: string };
    const { latitude, longitude, accuracyM, heading, speedKmh, jobId, status } = req.body;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      res.status(400).json({ success: false, message: 'Valid latitude [-90, 90] and longitude [-180, 180] are required' });
      return;
    }

    const saved = await upsertLiveLocation({
      userId: payload.id,
      userName: payload.name,
      role: payload.role,
      jobId: jobId || null,
      latitude,
      longitude,
      accuracyM: accuracyM ?? null,
      heading: heading ?? null,
      speedKmh: speedKmh ?? null,
      status: status || 'online'
    });

    if (!saved) {
      res.status(500).json({ success: false, message: 'Failed to update location' });
      return;
    }

    res.json({ success: true, location: saved });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update live location',
      error: (error as Error).message
    });
  }
});

/**
 * Get all live locations (dispatcher/manager fleet map view).
 */
app.get('/api/locations/live', requireActiveUser, async (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const locations = await getAllLiveLocations();
    res.json({ success: true, count: locations.length, locations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve live locations',
      error: (error as Error).message
    });
  }
});

/**
 * Get a single user's live location.
 */
app.get('/api/locations/live/:userId', requireActiveUser, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const location = await getLiveLocationByUserId(String(req.params.userId));
    if (!location) {
      res.status(404).json({ success: false, message: 'Live location not found' });
      return;
    }
    res.json({ success: true, location });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve live location',
      error: (error as Error).message
    });
  }
});

/**
 * Mark the current user's live location as offline (called on sign-out).
 */
app.post('/api/location/offline', requireActiveUser, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const payload = (req as any).user as { id: string };
    await setLiveLocationOffline(payload.id);
    res.json({ success: true, message: 'Location marked offline' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark location offline',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * GHANA POST GPS DIGITAL ADDRESS GEOCODING (AsaaseGPS / Ghana Post Resolution)
 * Resolves codes like "GD-018-5574" or "GA-183-9340" to { lat, lng, area, district, street }.
 * ============================================================================
 */
interface GhanaPostCacheEntry {
  code: string;
  lat: number;
  lng: number;
  district: string;
  region: string;
  street: string;
  area: string;
  timestamp: number;
}

const ghanaPostCache = new Map<string, GhanaPostCacheEntry>();

app.get('/api/geocoding/ghanapost/:code', async (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const rawCode = String(req.params.code || '').trim().toUpperCase();
  const normalized = rawCode.replace(/\s+/g, '');

  if (!/^[A-Z]{2}-?\d{3,4}-?\d{4}$/.test(normalized)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Ghana Post GPS format. Examples: GD-018-5574, GA-183-9340'
    });
  }

  // Format to standard hyphenated form XX-XXX-XXXX
  let queryCode = normalized;
  if (!queryCode.includes('-')) {
    queryCode = `${queryCode.slice(0, 2)}-${queryCode.slice(2, 5)}-${queryCode.slice(5)}`;
  }

  const cached = ghanaPostCache.get(queryCode);
  if (cached && Date.now() - cached.timestamp < 14 * 24 * 60 * 60 * 1000) {
    return res.json({
      success: true,
      cached: true,
      data: cached
    });
  }

  try {
    const fetchRes = await fetch('https://ghanapostgps.sperixlabs.org/get-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'DoorMaster-Ops/1.0'
      },
      body: new URLSearchParams({ address: queryCode }),
      signal: AbortSignal.timeout(6000)
    });

    if (!fetchRes.ok) {
      throw new Error(`Ghana Post GPS resolver returned HTTP ${fetchRes.status}`);
    }

    const json = (await fetchRes.json()) as any;
    if (json.found && json.data?.Table && Array.isArray(json.data.Table) && json.data.Table.length > 0) {
      const row = json.data.Table[0];
      const entry: GhanaPostCacheEntry = {
        code: queryCode,
        lat: parseFloat(row.CenterLatitude),
        lng: parseFloat(row.CenterLongitude),
        district: row.District || '',
        region: row.Region || '',
        street: row.Street || '',
        area: row.Area || '',
        timestamp: Date.now()
      };

      if (ghanaPostCache.size >= 2000) {
        const oldestKey = ghanaPostCache.keys().next().value;
        if (oldestKey) ghanaPostCache.delete(oldestKey);
      }
      ghanaPostCache.set(queryCode, entry);

      return res.json({
        success: true,
        cached: false,
        data: entry
      });
    }

    return res.status(404).json({
      success: false,
      message: `No digital location found for ${queryCode}. Please verify the code.`
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: 'Ghana Post GPS resolver service temporarily unreachable.',
      error: (error as Error).message
    });
  }
});

/**
 * ============================================================================
 * WHATSAPP-STYLE PORTAL MESSAGING API
 * ============================================================================
 */
app.get('/api/messages/threads', requireActiveUser, async (req, res) => {
  try {
    const actorId = String((req as any).user?.id || '');
    const data = await getUserThreadsAndMessages(actorId);
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.get('/api/messages/thread/:peerId', requireActiveUser, async (req, res) => {
  try {
    const actorId = String((req as any).user?.id || '');
    const peerId = String(req.params.peerId);
    const messages = await getConversationMessages(actorId, peerId);
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.post('/api/messages', requireActiveUser, async (req, res) => {
  try {
    const authUser = (req as any).user;
    const body = req.body || {};
    const senderId = String(authUser?.id || '');
    const senderName = String(authUser?.name || 'User');
    const senderRole = String(authUser?.role || 'staff');
    const recipientId = String(body.recipientId || '');
    if (!senderId || !recipientId) {
      res.status(400).json({ success: false, message: 'senderId and recipientId are required' });
      return;
    }
    const msg = await createChatMessage({
      senderId,
      senderName,
      senderRole,
      recipientId,
      recipientName: String(body.recipientName || 'Recipient'),
      recipientRole: String(body.recipientRole || 'staff'),
      text: String(body.text || ''),
      replyToId: body.replyToId || null,
      jobId: body.jobId || null,
      attachments: Array.isArray(body.attachments) ? body.attachments : [],
      location: body.location || null
    });
    res.status(201).json({ success: true, message: msg });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.patch('/api/messages/:id', requireActiveUser, async (req, res) => {
  try {
    const actorId = String((req as any).user?.id || '');
    const updated = await editChatMessage(String(req.params.id), actorId, String(req.body?.text || ''));
    if (!updated) {
      res.status(404).json({ success: false, message: 'Message not found or unauthorized' });
      return;
    }
    res.json({ success: true, message: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.delete('/api/messages/:id', requireActiveUser, async (req, res) => {
  try {
    const actorId = String((req as any).user?.id || '');
    const updated = await deleteChatMessage(String(req.params.id), actorId);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Message not found or unauthorized' });
      return;
    }
    res.json({ success: true, message: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.post('/api/messages/:id/react', requireActiveUser, async (req, res) => {
  try {
    const authUser = (req as any).user;
    const actorId = String(authUser?.id || '');
    const actorName = String(authUser?.name || 'User');
    const emoji = String(req.body?.emoji || '👍');
    const updated = await toggleMessageReaction(String(req.params.id), actorId, actorName, emoji);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }
    res.json({ success: true, message: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.post('/api/messages/read', requireActiveUser, async (req, res) => {
  try {
    const actorId = String((req as any).user?.id || '');
    const peerId = String(req.body?.peerId || '');
    const count = await markConversationRead(actorId, peerId);
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.post('/api/messages/typing', requireActiveUser, async (req, res) => {
  try {
    const actorId = String((req as any).user?.id || '');
    const peerId = String(req.body?.peerId || '');
    const isTyping = !!req.body?.isTyping;
    if (actorId && peerId) {
      setTypingStatus(actorId, peerId, isTyping);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`DoorMaster Backend API server listening on http://localhost:${port}`);
  console.log(`Database connected via Prisma ORM: ${dbConfig.database} @ ${dbConfig.host}:${dbConfig.port}`);
});

export default app;
