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

import {
  getDoorsCatalog,
  getDoorCategories,
  addDoorEntry,
  updateDoorStock,
  deleteDoor
} from './doors-service';

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
  setLiveLocationOffline
} from './jobs-service';

const app = express();
const port = process.env['PORT'] || 3001;

// Enable Cross-Origin Resource Sharing for separated frontend
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

  const user = await getUserById(payload.sub);
  if (!user || user.status !== 'active') {
    res.status(401).json({ success: false, message: 'This account is no longer active.' });
    return;
  }

  (req as any).auth = payload;
  (req as any).user = user;
  next();
}

/**
 * Requires a valid token plus an active database user with one of the given roles.
 */
function requireRole(roles: string[]) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await requireActiveUser(req, res, () => {
      const user = (req as any).user as UserRecord | undefined;
      if (!user || !roles.includes(user.role)) {
        res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
        return;
      }
      next();
    });
  };
}

// Initialize MySQL database on startup asynchronously via Prisma
(async () => {
  try {
    const initRes = await initDatabase();
    console.log('[Backend Server Startup]', initRes.message);
    await seedJobsIfEmpty();
  } catch (err) {
    console.warn('[Backend Server Startup] DB notice:', (err as Error).message);
  }
})();

/**
 * Health Check & Service Info
 */
app.get('/health', async (_req, res) => {
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

app.post('/api/db/init', requireRole(['manager']), async (_req, res) => {
  try {
    const result = await initDatabase();
    await seedJobsIfEmpty();
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
    const { name, email, password, role, phone, avatarUrl } = req.body;
    if (!name || !email || !role) {
      res.status(400).json({ success: false, message: 'Name, email, and role are required' });
      return;
    }

    const regRes = await registerUser({ name, email, password, role, phone, avatarUrl });
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

app.post(['/api/auth/users', '/api/users'], requireRole(['manager']), async (req, res) => {
  try {
    const { name, email, password, role, phone, avatarUrl, status } = req.body;
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

app.patch(['/api/auth/users/:id', '/api/users/:id'], async (req, res) => {
  try {
    const id = String(req.params.id);
    const { name, email, phone, avatarUrl, role, status } = req.body;
    const result = await updateUserProfile(id, { name, email, phone, avatarUrl, role, status });
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

app.patch(['/api/auth/users/:id/status', '/api/users/:id/status'], requireRole(['manager']), async (req, res) => {
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

app.delete(['/api/auth/users/:id', '/api/users/:id'], requireRole(['manager']), async (req, res) => {
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

app.post('/api/doors/scrape-all', requireActiveUser, async (req, res) => {
  try {
    const startPage = Number(req.body?.startPage) || 1;
    const endPage = Number(req.body?.endPage) || 28;

    const { scrapeAllPages } = await import('./scraper-service');
    const result = await scrapeAllPages(startPage, endPage);

    res.json({
      success: true,
      totalDoors: result.totalDoors,
      totalCategories: result.totalCategories,
      message: `Successfully scraped ${result.totalDoors} doors across ${result.totalCategories} categories from pages ${startPage} to ${endPage} and saved to MySQL via Prisma.`
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

app.post('/api/doors', requireActiveUser, async (req, res) => {
  try {
    const newDoor = await addDoorEntry(req.body);
    res.status(201).json({
      success: true,
      door: newDoor,
      message: 'Door added to catalog and MySQL database successfully via Prisma'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add door',
      error: (error as Error).message
    });
  }
});

app.patch('/api/doors/:id/stock', requireActiveUser, async (req, res) => {
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
      message: `Stock updated for door ${id} in MySQL database`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update door stock',
      error: (error as Error).message
    });
  }
});

app.delete('/api/doors/:id', requireActiveUser, async (req, res) => {
  try {
    const id = String(req.params['id']);
    const deleted = await deleteDoor(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: `Door ${id} not found` });
      return;
    }
    res.json({
      success: true,
      message: `Door ${id} removed from MySQL catalog`
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

app.get('/api/jobs', async (_req, res) => {
  try {
    const jobs = await getJobsFromDb();
    res.json({
      success: true,
      count: jobs.length,
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
    const job = await saveJobToDb(req.body);
    if (!job) {
      res.status(400).json({ success: false, message: 'Failed to save job' });
      return;
    }
    res.status(201).json({
      success: true,
      job,
      message: 'Installation job persisted to MySQL via Prisma'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save job to database',
      error: (error as Error).message
    });
  }
});

app.get('/api/sms/logs', async (_req, res) => {
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
app.get('/api/notifications', async (req, res) => {
  try {
    const role = req.query['role'] as string | undefined;
    const notifications = await getNotificationsFromDb(role);
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

app.post('/api/shop-location', requireActiveUser, async (req, res) => {
  try {
    const location = await saveShopLocationToDb(req.body);
    if (!location) {
      return res.status(400).json({ success: false, message: 'Could not save shop location' });
    }
    res.status(200).json({
      success: true,
      location,
      shopLocation: location,
      message: 'Shop location settings saved to MySQL database via Prisma'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save shop location settings',
      error: (error as Error).message
    });
  }
});

app.put('/api/shop-location', requireActiveUser, async (req, res) => {
  try {
    const location = await saveShopLocationToDb(req.body);
    if (!location) {
      return res.status(400).json({ success: false, message: 'Could not update shop location' });
    }
    res.status(200).json({
      success: true,
      location,
      shopLocation: location,
      message: 'Shop location settings updated in MySQL database via Prisma'
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
app.get('/api/tracking/installer', async (req, res) => {
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
app.get('/api/tracking/dispatch', async (req, res) => {
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
      message: 'Dispatch rider tracking updated in MySQL via Prisma'
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
app.get('/api/inquiries', async (_req, res) => {
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
      message: 'Inquiry saved to MySQL database via Prisma'
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
      message: 'Customer signoff and signature saved to MySQL via Prisma'
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

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      res.status(400).json({ success: false, message: 'latitude and longitude are required' });
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

app.listen(port, () => {
  console.log(`DoorMaster Backend API server listening on http://localhost:${port}`);
  console.log(`Database connected via Prisma ORM: ${dbConfig.database} @ ${dbConfig.host}:${dbConfig.port}`);
});

export default app;
