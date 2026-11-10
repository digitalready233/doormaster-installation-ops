import prisma from './prisma';
import { hashPassword, needsPasswordRehash, verifyPassword } from './db';
import { syncUserTeamAssignment } from './teams-service';
import * as crypto from 'node:crypto';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: 'active' | 'pending' | 'rejected' | 'deactivated' | string;
  shopId?: string | null;
  teamId?: string | null;
  teamRole?: string | null;
  teamPosition?: string | null;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokenPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  shopId?: string | null;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
}

const JWT_SECRET = process.env['JWT_SECRET'] || 'doormaster_enterprise_precision_ops_jwt_key_2026';
const JWT_ISSUER = process.env['JWT_ISSUER'] || 'doormaster-ops';
const JWT_AUDIENCE = process.env['JWT_AUDIENCE'] || 'doormaster-ops-web';
const JWT_TTL_SECONDS = Number(process.env['JWT_TTL_SECONDS']) || 7 * 24 * 60 * 60; // 7 days
const DEFAULT_JWT_SECRET = 'doormaster_enterprise_precision_ops_jwt_key_2026';

if (JWT_SECRET === DEFAULT_JWT_SECRET) {
  console.warn(
    '[AuthService] WARNING: using the built-in default JWT_SECRET. Set JWT_SECRET in backend/.env before deploying to production.'
  );
}

function sign(data: string): string {
  return crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function generateToken(user: UserRecord): string {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      shopId: user.shopId ?? null,
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      iat: now,
      exp: now + JWT_TTL_SECONDS,
      jti: crypto.randomUUID(),
    } satisfies AuthTokenPayload)
  ).toString('base64url');

  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    if (!header || !payload || !signature) return null;

    const expectedSig = sign(`${header}.${payload}`);
    if (!safeCompare(expectedSig, signature)) return null;

    const decodedHeader = JSON.parse(Buffer.from(header, 'base64url').toString('utf-8'));
    if (decodedHeader?.alg !== 'HS256' || decodedHeader?.typ !== 'JWT') return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as AuthTokenPayload;
    const now = Math.floor(Date.now() / 1000);

    if (!decoded?.sub || typeof decoded.sub !== 'string') return null;
    if (typeof decoded.exp !== 'number' || decoded.exp <= now) return null; // Expired
    if (typeof decoded.iat !== 'number' || decoded.iat > now + 60) return null; // Issued in the future
    if (decoded.iss !== JWT_ISSUER || decoded.aud !== JWT_AUDIENCE) return null;

    return decoded;
  } catch {
    return null;
  }
}

// Used to keep the "unknown email" path roughly as expensive as a real
// password check, so response timing does not reveal whether an account exists.
const DUMMY_PASSWORD_HASH = hashPassword(crypto.randomBytes(16).toString('hex'));
const INVALID_CREDENTIALS = 'Invalid email or password.';
const MIN_PASSWORD_LENGTH = 8;

function passwordPolicyError(password?: string): string | null {
  if (!password) return null;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
  }
  if (password.length > 128) {
    return 'Password must be 128 characters or fewer.';
  }
  return null;
}

function toUserRecord(row: {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  status?: string | null;
  shopId?: string | null;
  teamId?: string | null;
  teamRole?: string | null;
  teamPosition?: string | null;
  avatarUrl: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): UserRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    phone: row.phone || '+233 24 555 0100',
    status: row.status || 'active',
    shopId: row.shopId || null,
    teamId: row.teamId || null,
    teamRole: row.teamRole || null,
    teamPosition: row.teamPosition || null,
    avatarUrl: row.avatarUrl || undefined,
    createdAt: row.createdAt ? row.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: row.updatedAt ? row.updatedAt.toISOString() : undefined,
  };
}

/**
 * Authenticates user credentials using Prisma `user` model.
 * A password is always required; account status is only revealed after the
 * password has been verified, so account state cannot be enumerated.
 */
export async function authenticateUser(
  email: string,
  password?: string
): Promise<{ success: boolean; user?: UserRecord; token?: string; message: string }> {
  try {
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return { success: false, message: INVALID_CREDENTIALS };
    }

    const cleanEmail = email.trim().toLowerCase();
    const row = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!row) {
      // Burn comparable CPU time on the unknown-account path.
      verifyPassword(password, DUMMY_PASSWORD_HASH);
      return { success: false, message: INVALID_CREDENTIALS };
    }

    const valid = verifyPassword(password, row.passwordHash);
    if (!valid) {
      return { success: false, message: INVALID_CREDENTIALS };
    }

    // Account status is checked only after credentials are proven.
    const userStatus = row.status || 'active';
    if (userStatus === 'pending') {
      return {
        success: false,
        message: 'Your registration is pending approval by an Operations Manager. You will be notified once approved.',
      };
    }
    if (userStatus === 'deactivated') {
      return {
        success: false,
        message: 'This account has been deactivated. Please contact an Operations Manager.',
      };
    }
    if (userStatus === 'rejected') {
      return {
        success: false,
        message: 'Your registration request was rejected by an Operations Manager.',
      };
    }
    if (userStatus !== 'active') {
      return { success: false, message: 'This account is not active. Please contact an Operations Manager.' };
    }

    // Transparently upgrade legacy PBKDF2 hashes to scrypt after a valid login.
    if (needsPasswordRehash(row.passwordHash)) {
      try {
        await prisma.user.update({
          where: { id: row.id },
          data: { passwordHash: hashPassword(password) },
        });
      } catch (rehashErr) {
        console.warn('[AuthService] Could not upgrade password hash:', (rehashErr as Error).message);
      }
    }

    const user = toUserRecord(row);
    const token = generateToken(user);

    return {
      success: true,
      user,
      token,
      message: `Successfully authenticated as ${user.name} (${user.role}).`,
    };
  } catch (err) {
    console.error('[AuthService] Authentication error:', err);
    return {
      success: false,
      message: 'Authentication service is temporarily unavailable. Please try again.',
    };
  }
}

/**
 * Returns the current user for a verified token subject.
 * Used by the session-restore (`/api/auth/me`) endpoint.
 */
export async function getUserById(userId: string): Promise<UserRecord | null> {
  try {
    if (!userId) return null;
    const row = await prisma.user.findUnique({ where: { id: userId } });
    return row ? toUserRecord(row) : null;
  } catch (err) {
    console.error('[AuthService] Failed loading user by id:', err);
    return null;
  }
}

/**
 * Register new user into MySQL using Prisma (self-registration defaults to 'pending' for manager approval)
 */
export async function registerUser(data: {
  name: string;
  email: string;
  password?: string;
  role: string;
  phone?: string;
  avatarUrl?: string;
  status?: string;
  shopId?: string | null;
}): Promise<{ success: boolean; user?: UserRecord; token?: string; message: string }> {
  try {
    const cleanEmail = data.email.trim().toLowerCase();

    const policyError = passwordPolicyError(data.password);
    if (policyError) {
      return { success: false, message: policyError };
    }

    // Check existing
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (existing) {
      return { success: false, message: `Account with email "${cleanEmail}" already exists.` };
    }

    const id = `USR-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const pass = data.password || 'DoorMaster2026!*';
    const passwordHash = hashPassword(pass);
    const phone = data.phone || '+233 24 555 0199';
    const avatar = data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    const status = data.status || 'pending';
    const cleanShopId = data.shopId && data.shopId.trim() ? data.shopId.trim() : null;

    const created = await prisma.user.create({
      data: {
        id,
        name: data.name,
        email: cleanEmail,
        passwordHash,
        role: data.role,
        phone,
        status,
        shopId: cleanShopId,
        avatarUrl: avatar,
      },
    });

    const user: UserRecord = {
      id: created.id,
      name: created.name,
      email: created.email,
      role: created.role,
      phone: created.phone || phone,
      status: (created as any).status || status,
      shopId: created.shopId || null,
      avatarUrl: created.avatarUrl || avatar,
      createdAt: created.createdAt.toISOString(),
    };

    const token = generateToken(user);

    const message = status === 'pending'
      ? `Registration submitted successfully for ${data.name}. Your account is pending Operations Manager approval.`
      : `User ${data.name} created successfully with role ${data.role}.`;

    return {
      success: true,
      user,
      token,
      message,
    };
  } catch (err) {
    console.error('[AuthService] Registration error:', err);
    return {
      success: false,
      message: `Failed to create user in database: ${(err as Error).message}`,
    };
  }
}

/**
 * Operations Manager adds a new user directly (created as 'active' by default)
 */
export async function createUserByManager(data: {
  name: string;
  email: string;
  password?: string;
  role: string;
  phone?: string;
  avatarUrl?: string;
  status?: string;
  shopId?: string | null;
  teamId?: string | null;
  teamRole?: string | null;
  teamPosition?: string | null;
}): Promise<{ success: boolean; user?: UserRecord; message: string }> {
  try {
    const cleanEmail = data.email.trim().toLowerCase();

    const policyError = passwordPolicyError(data.password);
    if (policyError) {
      return { success: false, message: policyError };
    }

    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (existing) {
      return { success: false, message: `An account with email "${cleanEmail}" already exists.` };
    }

    const id = `USR-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const pass = data.password || 'DoorMaster2026!*';
    const passwordHash = hashPassword(pass);
    const phone = data.phone || '+233 24 555 0100';
    const avatar = data.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
    const status = data.status || 'active';
    const cleanShopId = data.shopId && data.shopId.trim() ? data.shopId.trim() : null;
    const cleanTeamId = data.teamId && data.teamId.trim() ? data.teamId.trim() : null;

    const created = await prisma.user.create({
      data: {
        id,
        name: data.name,
        email: cleanEmail,
        passwordHash,
        role: data.role,
        phone,
        status,
        shopId: cleanShopId,
        avatarUrl: avatar,
      },
    });

    if (cleanTeamId) {
      await syncUserTeamAssignment(created.id, {
        teamId: cleanTeamId,
        teamRole: data.teamRole || 'assistant',
        teamPosition: data.teamPosition || undefined,
      });
    }

    const refreshed = await prisma.user.findUnique({ where: { id: created.id } });
    const user = toUserRecord(refreshed || created);

    return {
      success: true,
      user,
      message: `User ${data.name} successfully created as ${status.toUpperCase()} with role ${data.role}.`,
    };
  } catch (err) {
    console.error('[AuthService] Create user by manager error:', err);
    return {
      success: false,
      message: `Failed creating user: ${(err as Error).message}`,
    };
  }
}

/**
 * Operations Manager updates user status (approve, reject, deactivate, activate)
 */
export async function updateUserStatus(
  userId: string,
  status: 'active' | 'pending' | 'rejected' | 'deactivated' | string
): Promise<{ success: boolean; user?: UserRecord; message: string }> {
  try {
    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existing) {
      return { success: false, message: `User with ID "${userId}" not found.` };
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    const user = toUserRecord(updated);

    const actionText = status === 'active' 
      ? 'approved & activated' 
      : status === 'rejected' 
        ? 'rejected' 
        : status === 'deactivated' 
          ? 'deactivated' 
          : status;

    return {
      success: true,
      user,
      message: `User ${updated.name} successfully ${actionText}.`,
    };
  } catch (err) {
    console.error('[AuthService] Update status error:', err);
    return {
      success: false,
      message: `Failed to update user status: ${(err as Error).message}`,
    };
  }
}

/**
 * Update user profile details (name, email, phone, avatarUrl, team assignment)
 */
export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
    role?: string;
    status?: string;
    shopId?: string | null;
    teamId?: string | null;
    teamRole?: string | null;
    teamPosition?: string | null;
  }
): Promise<{ success: boolean; user?: UserRecord; message: string }> {
  try {
    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existing) {
      return { success: false, message: `User with ID "${userId}" not found.` };
    }

    if (data.email && data.email.trim().toLowerCase() !== existing.email.toLowerCase()) {
      const emailConflict = await prisma.user.findUnique({
        where: { email: data.email.trim().toLowerCase() },
      });
      if (emailConflict && emailConflict.id !== userId) {
        return { success: false, message: `Email "${data.email}" is already in use by another account.` };
      }
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name ? { name: data.name.trim() } : {}),
        ...(data.email ? { email: data.email.trim().toLowerCase() } : {}),
        ...(data.phone ? { phone: data.phone.trim() } : {}),
        ...(data.role ? { role: data.role.trim() } : {}),
        ...(data.status ? { status: data.status.trim() } : {}),
        ...(data.shopId !== undefined ? { shopId: data.shopId && data.shopId.trim() ? data.shopId.trim() : null } : {}),
        ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
      },
    });

    if (data.teamId !== undefined) {
      const cleanTeamId = data.teamId && data.teamId.trim() ? data.teamId.trim() : null;
      await syncUserTeamAssignment(userId, {
        teamId: cleanTeamId,
        teamRole: data.teamRole ?? existing.teamRole ?? 'assistant',
        teamPosition: data.teamPosition ?? existing.teamPosition ?? undefined,
      });
    } else if (data.teamPosition !== undefined || data.teamRole !== undefined) {
      if (existing.teamId) {
        await syncUserTeamAssignment(userId, {
          teamId: existing.teamId,
          teamRole: data.teamRole ?? existing.teamRole ?? 'assistant',
          teamPosition: data.teamPosition ?? existing.teamPosition ?? undefined,
        });
      }
    }

    const refreshed = await prisma.user.findUnique({ where: { id: userId } });
    const user = toUserRecord(refreshed || updated);

    return {
      success: true,
      user,
      message: `Profile updated successfully.`,
    };
  } catch (err) {
    console.error('[AuthService] Update profile error:', err);
    return {
      success: false,
      message: `Failed to update profile: ${(err as Error).message}`,
    };
  }
}

/**
 * Operations Manager permanently deletes a user
 */
export async function deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existing) {
      return { success: false, message: `User "${userId}" not found.` };
    }

    if (existing.teamId) {
      await syncUserTeamAssignment(userId, { teamId: null });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      message: `User ${existing.name} (${existing.email}) removed from system.`,
    };
  } catch (err) {
    console.error('[AuthService] Delete user error:', err);
    return {
      success: false,
      message: `Failed deleting user: ${(err as Error).message}`,
    };
  }
}

/**
 * Get all registered users using Prisma
 */
export async function getAllUsers(): Promise<UserRecord[]> {
  try {
    const rows = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => toUserRecord(r));
  } catch (err) {
    console.error('[AuthService] Failed fetching users:', err);
    return [];
  }
}
