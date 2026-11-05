import { Injectable, computed, inject, signal } from '@angular/core';
import { 
  ApiAuthUser,
  AppUser,
  AssignedInstallerTeamMember,
  BonusCriteriaConfig, 
  ClockSession, 
  CustomerSignoff, 
  DbHealthStatus,
  DispatcherProfile,
  DoorCatalogEntry,
  DoorCategory,
  ImpersonationSession,
  InstallationInquiry, 
  InstallationJob, 
  JobDoorItem,
  JobStatus,
  InstallationPhoto, 
  InstallerProfile, 
  InstallerTeam,
  NotificationItem, 
  RoleDefinition, 
  RoleType,
  LiveLocation,
  ShopLocationSettings,
  SmsGatewayConfig,
  SmsLogEntry,
  UserPhoneDirectory
} from '../models/installation.model';

import { AlertService } from './alert.service';

const STORAGE_KEY_API_USER = 'dm_installation_api_user_v1';
const STORAGE_KEY_API_TOKEN = 'dm_installation_api_token_v1';
const STORAGE_KEY_IMPERSONATION = 'dm_impersonation_session_v1';

function readPersistedImpersonation(): ImpersonationSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY_IMPERSONATION);
    if (!raw) return null;
    const session = JSON.parse(raw) as ImpersonationSession;
    if (session && session.isImpersonating && session.targetUser && session.originalUser) {
      return session;
    }
  } catch {
    // Corrupt entry: ignore and fall through
  }
  return null;
}

function writePersistedImpersonation(session: ImpersonationSession): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY_IMPERSONATION, JSON.stringify(session));
  } catch {
    // Storage can be unavailable in private browsing
  }
}

function clearPersistedImpersonation(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY_IMPERSONATION);
  } catch {
    // Storage can be unavailable
  }
}

interface StoredSession {
  user: ApiAuthUser;
  token: string;
  persistent: boolean;
}

function decodeTokenExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof json.exp === 'number' ? json.exp : null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const exp = decodeTokenExpiry(token);
  return exp !== null && exp <= Math.floor(Date.now() / 1000);
}

function readStorage(storage: Storage | undefined, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/**
 * Reads a persisted session from localStorage (remember me) or
 * sessionStorage (current tab only), dropping expired tokens.
 */
function readPersistedSession(): StoredSession | null {
  if (typeof window === 'undefined') return null;

  const sources: { storage: Storage; persistent: boolean }[] = [
    { storage: window.localStorage, persistent: true },
    { storage: window.sessionStorage, persistent: false },
  ];

  for (const { storage, persistent } of sources) {
    const token = readStorage(storage, STORAGE_KEY_API_TOKEN);
    const rawUser = readStorage(storage, STORAGE_KEY_API_USER);
    if (!token || !rawUser || isTokenExpired(token)) continue;

    try {
      const user = JSON.parse(rawUser) as ApiAuthUser;
      if (user?.id && user?.email && user?.role) {
        return { user, token, persistent };
      }
    } catch {
      // Corrupt entry: fall through and clear it below.
    }
    storage.removeItem(STORAGE_KEY_API_TOKEN);
    storage.removeItem(STORAGE_KEY_API_USER);
  }

  return null;
}

function clearPersistedSession(): void {
  if (typeof window === 'undefined') return;
  clearPersistedImpersonation();
  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      storage.removeItem(STORAGE_KEY_API_TOKEN);
      storage.removeItem(STORAGE_KEY_API_USER);
    } catch {
      // Storage can be unavailable in private browsing; ignore.
    }
  }
}

export const DEFAULT_DOORMASTER_BRANCHES: ShopLocationSettings[] = [
  {
    id: 'dm-branch-central',
    shopName: 'DoorMaster Central Showroom & Atelier',
    branchCode: 'DM-GH-HQ-SPX',
    address: 'Plot 48, Spintex Road Industrial Area, Accra',
    landmark: 'Plot 48, Spintex Road Industrial Corridor',
    city: 'Accra',
    region: 'Greater Accra',
    phone: '0542745222 / 0500212447',
    email: 'shop@doormasterops.com',
    latitude: 5.632000,
    longitude: -0.098000,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Elena Rostova (Master Joiner & Central Shop Head)',
    managerEmail: 'shop@doormasterops.com',
    isPrimary: true
  },
  {
    id: 'dm-branch-obeyeyie',
    shopName: 'DoorMaster Obeyeyie Branch',
    branchCode: 'DM-GH-OBY',
    address: 'Opposite the forest reserve, Obeyeyie',
    landmark: 'Opposite the forest reserve',
    city: 'Obeyeyie / Amasaman',
    region: 'Greater Accra',
    phone: '0203169184',
    email: 'shop.obeyeyie@doormaster.online',
    latitude: 5.733722,
    longitude: -0.151583,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kofi Boateng (Obeyeyie Shop Manager)',
    managerEmail: 'shop.obeyeyie@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-pobiman-turkey',
    shopName: 'DoorMaster Pobiman (Turkey Section)',
    branchCode: 'DM-GH-PBM-TRK',
    address: 'Tollbooth, Accra–Kumasi Highway (Pobiman West Africa)',
    landmark: 'Tollbooth, Accra–Kumasi Highway',
    city: 'Pobiman',
    region: 'Greater Accra',
    phone: '0207867882',
    email: 'shop.pobiman-turkey@doormaster.online',
    latitude: 5.733056,
    longitude: -0.312972,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Yaw Antwi (Pobiman Turkey Shop Manager)',
    managerEmail: 'shop.pobiman-turkey@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-pobiman-economy',
    shopName: 'DoorMaster Pobiman (Economy Section)',
    branchCode: 'DM-GH-PBM-ECO',
    address: 'Tollbooth, Accra–Kumasi Highway, Pobiman Branch',
    landmark: 'Tollbooth, Accra–Kumasi Highway',
    city: 'Pobiman',
    region: 'Greater Accra',
    phone: '0502584180',
    email: 'shop.pobiman-economy@doormaster.online',
    latitude: 5.733722,
    longitude: -0.313306,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kwabena Agyeman (Pobiman Economy Shop Manager)',
    managerEmail: 'shop.pobiman-economy@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-acp',
    shopName: 'DoorMaster ACP Branch',
    branchCode: 'DM-GH-ACP',
    address: 'ACP Junction / Pokuase Corridor',
    landmark: 'ACP Junction, Pokuase',
    city: 'Pokuase / ACP',
    region: 'Greater Accra',
    phone: '0201705689',
    email: 'shop.acp@doormaster.online',
    latitude: 5.689028,
    longitude: -0.268083,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Akua Darko (ACP Shop Manager)',
    managerEmail: 'shop.acp@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-nsawam-overhead',
    shopName: 'DoorMaster Nsawam Overhead',
    branchCode: 'DM-GH-NSW-OVH',
    address: 'Nsawam Overhead Junction, Accra–Kumasi Road',
    landmark: 'Nsawam Overhead',
    city: 'Nsawam',
    region: 'Eastern',
    phone: '0505892144',
    email: 'shop.nsawam-overhead@doormaster.online',
    latitude: 5.819139,
    longitude: -0.363750,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kwame Appiah (Nsawam Overhead Shop Manager)',
    managerEmail: 'shop.nsawam-overhead@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-nsawam-hospital',
    shopName: 'DoorMaster Nsawam Hospital Road',
    branchCode: 'DM-GH-NSW-HSP',
    address: 'Hospital Road, Nsawam',
    landmark: 'Hospital Road, Nsawam',
    city: 'Nsawam',
    region: 'Eastern',
    phone: '0535825645',
    email: 'shop.nsawam-hospital@doormaster.online',
    latitude: 5.816500,
    longitude: -0.361500,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Ama Serwaa (Nsawam Hospital Rd Shop Manager)',
    managerEmail: 'shop.nsawam-hospital@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-tema',
    shopName: 'DoorMaster Tema Branch',
    branchCode: 'DM-GH-TMA',
    address: 'Community 1 / Industrial Area, Tema',
    landmark: 'Tema Community 1 / Industrial Area',
    city: 'Tema',
    region: 'Greater Accra',
    phone: '0502290982',
    email: 'shop.tema@doormaster.online',
    latitude: 5.659889,
    longitude: -0.012167,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Ebenezer Quaye (Tema Branch Shop Manager)',
    managerEmail: 'shop.tema@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-suhum',
    shopName: 'DoorMaster Suhum Branch',
    branchCode: 'DM-GH-SHM',
    address: 'Suhum Roundabout / Accra-Kumasi Highway',
    landmark: 'Suhum Roundabout / Kumasi Highway',
    city: 'Suhum',
    region: 'Eastern',
    phone: '0201752755 / 0539111183',
    email: 'shop.suhum@doormaster.online',
    latitude: 6.042639,
    longitude: -0.449917,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Daniel Asare (Suhum Branch Shop Manager)',
    managerEmail: 'shop.suhum@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-ashalaja',
    shopName: 'DoorMaster Ashalaja Branch',
    branchCode: 'DM-GH-ASH',
    address: 'Ashalaja Main Road, Amasaman District',
    landmark: 'Ashalaja Main Road',
    city: 'Ashalaja',
    region: 'Greater Accra',
    phone: '0504725294',
    email: 'shop.ashalaja@doormaster.online',
    latitude: 5.659917,
    longitude: -0.362028,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Francis Mensah (Ashalaja Branch Shop Manager)',
    managerEmail: 'shop.ashalaja@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-kumasi-ahinsan',
    shopName: 'DoorMaster Kumasi Ahinsan',
    branchCode: 'DM-GH-KSI-AHN',
    address: 'Ahinsan bus stop, adjacent Kumawuman Rural Bank',
    landmark: 'Ahinsan bus stop, adjacent Kumawuman Rural Bank',
    city: 'Kumasi',
    region: 'Ashanti',
    phone: '0535829827',
    email: 'shop.kumasi-ahinsan@doormaster.online',
    latitude: 6.686361,
    longitude: -1.623972,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Osei Tutu (Kumasi Ahinsan Shop Manager)',
    managerEmail: 'shop.kumasi-ahinsan@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-kasoa-tipa',
    shopName: 'DoorMaster Kasoa Tipa Junction',
    branchCode: 'DM-GH-KAS-TIP',
    address: 'Tipa Junction, Kasoa',
    landmark: 'Tipa Junction, Kasoa',
    city: 'Kasoa',
    region: 'Central / Greater Accra',
    phone: '0533739756',
    email: 'shop.kasoa-tipa@doormaster.online',
    latitude: 5.524528,
    longitude: -0.458250,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kojo Baidoo (Kasoa Tipa Shop Manager)',
    managerEmail: 'shop.kasoa-tipa@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-amrahia',
    shopName: 'DoorMaster Amrahia Branch',
    branchCode: 'DM-GH-AMR',
    address: 'Accra–Dodowa Road, Amrahia',
    landmark: 'Accra–Dodowa Road, Amrahia',
    city: 'Amrahia / Adenta',
    region: 'Greater Accra',
    phone: '0531025779',
    email: 'shop.amrahia@doormaster.online',
    latitude: 5.761220,
    longitude: -0.126510,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Priscilla Kyei (Amrahia Branch Shop Manager)',
    managerEmail: 'shop.amrahia@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-tseaddo',
    shopName: 'DoorMaster Tseaddo Branch',
    branchCode: 'DM-GH-TSE',
    address: 'Behind Trade Fair / Airport Hills, Tseaddo',
    landmark: 'Behind Trade Fair / Airport Hills, Tseaddo',
    city: 'Tseaddo / La',
    region: 'Greater Accra',
    phone: '0591952205',
    email: 'shop.tseaddo@doormaster.online',
    latitude: 5.602230,
    longitude: -0.141520,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Nathaniel Tagoe (Tseaddo Branch Shop Manager)',
    managerEmail: 'shop.tseaddo@doormaster.online',
    isPrimary: false
  },
  {
    id: 'dm-branch-kronum',
    shopName: 'DoorMaster Kronum Kumasi',
    branchCode: 'DM-GH-KSI-KRN',
    address: 'Off Offinso Road, Kronum Kumasi',
    landmark: 'Off Offinso Road, Kronum Kumasi',
    city: 'Kumasi',
    region: 'Ashanti',
    phone: '0531025775',
    email: 'shop.kronum@doormaster.online',
    latitude: 6.758410,
    longitude: -1.638540,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Baffour Gyan (Kronum Kumasi Shop Manager)',
    managerEmail: 'shop.kronum@doormaster.online',
    isPrimary: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class InstallationStore {
  private readonly alert = inject(AlertService);

  // Current active role perspective (set from authenticated API user)
  readonly currentRole = signal<RoleType>('manager');
  readonly currentInstallerId = signal<string | null>(null);
  readonly currentClientId = signal<string | null>(null);
  readonly currentDispatcherId = signal<string | null>(null);

  // Temporary Session Storage Impersonation State
  readonly impersonationSession = signal<ImpersonationSession | null>(readPersistedImpersonation());
  readonly isImpersonating = computed(() => !!this.impersonationSession());
  readonly originalUser = computed(() => this.impersonationSession()?.originalUser ?? null);
  readonly originalRole = computed<RoleType>(() => this.impersonationSession()?.originalRole ?? this.currentRole());


  // Predefined System Roles & dynamic custom roles
  readonly roles = signal<RoleDefinition[]>([
    {
      id: 'manager',
      name: 'Operations Manager',
      label: 'Manager',
      description: 'Full oversight: dispatch, installer assignments, bonus threshold management & approvals.',
      isSystem: true,
      color: 'slate',
      icon: 'admin_panel_settings',
      permissions: {
        canCreateJobs: true,
        canAssignInstallers: true,
        canDispatchDoors: false,
        canClockInOut: false,
        canUploadPhotos: true,
        canSignVerification: false,
        canApproveBonuses: true,
        canViewFinancials: true,
        canManageRoles: true
      }
    },
    {
      id: 'installer',
      name: 'Installer',
      label: 'Installer',
      description: 'Site operations: view assigned door jobs, clock in/out on site, photo uploads & customer verification request.',
      isSystem: true,
      color: 'emerald',
      icon: 'handyman',
      permissions: {
        canCreateJobs: false,
        canAssignInstallers: false,
        canDispatchDoors: false,
        canClockInOut: true,
        canUploadPhotos: true,
        canSignVerification: false,
        canApproveBonuses: false,
        canViewFinancials: false,
        canManageRoles: false
      }
    },
    {
      id: 'client',
      name: 'Client / Site Owner',
      label: 'Client',
      description: 'Homeowner or site manager: track installation progress, view completed photos, and provide digital sign-off.',
      isSystem: true,
      color: 'indigo',
      icon: 'person_pin_circle',
      permissions: {
        canCreateJobs: false,
        canAssignInstallers: false,
        canDispatchDoors: false,
        canClockInOut: false,
        canUploadPhotos: false,
        canSignVerification: true,
        canApproveBonuses: false,
        canViewFinancials: false,
        canManageRoles: false
      }
    },
    {
      id: 'account_officer',
      name: 'Accounts & Finance Officer',
      label: 'Account Officer',
      description: 'Financial ledger: track door order values, installation fees, installer bonuses disbursement and invoices.',
      isSystem: true,
      color: 'amber',
      icon: 'account_balance_wallet',
      permissions: {
        canCreateJobs: false,
        canAssignInstallers: false,
        canDispatchDoors: false,
        canClockInOut: false,
        canUploadPhotos: false,
        canSignVerification: false,
        canApproveBonuses: true,
        canViewFinancials: true,
        canManageRoles: false
      }
    },
    {
      id: 'shop_manager',
      name: 'DoorMaster Shop Manager',
      label: 'Shop Manager',
      description: 'Workshop branch: track custom door fabrication, assemble hardware packs, assign installers, and dispatch to installation site.',
      isSystem: true,
      color: 'cyan',
      icon: 'storefront',
      permissions: {
        canCreateJobs: true,
        canAssignInstallers: true,
        canDispatchDoors: true,
        canClockInOut: false,
        canUploadPhotos: true,
        canSignVerification: false,
        canApproveBonuses: false,
        canViewFinancials: true,
        canManageRoles: false
      }
    },
    {
      id: 'dispatcher',
      name: 'Logistics Dispatcher / Driver',
      label: 'Dispatcher',
      description: 'Fleet logistics: verify cargo at shop, drive transport truck to customer site, deliver doors & locks, and handover to client/technician.',
      isSystem: true,
      color: 'teal',
      icon: 'local_shipping',
      permissions: {
        canCreateJobs: false,
        canAssignInstallers: false,
        canDispatchDoors: true,
        canClockInOut: false,
        canUploadPhotos: true,
        canSignVerification: false,
        canApproveBonuses: false,
        canViewFinancials: false,
        canManageRoles: false
      }
    }
  ]);

  // Bonus Rules Engine
  readonly bonusRules = signal<BonusCriteriaConfig>({
    baseBonusStandardDoor: 95,
    baseBonusArchitecturalDoor: 160,
    ratingBonusMultiplier: 1.25,
    onTimeBonusAmount: 40,
    cleanPhotoBonusAmount: 25
  });

  // Installers Directory (derived from API users with role 'installer')
  readonly installers = signal<InstallerProfile[]>([]);

  // Two Installation Teams (3 installers each with 1 team lead)
  readonly installerTeams = signal<InstallerTeam[]>([]);

  // Logistics Dispatchers & Delivery Drivers (derived from API users with role 'dispatcher', 1 per branch)
  readonly dispatchers = signal<DispatcherProfile[]>([]);

  // Delivery Truck Fleet (operational reference data)
  readonly trucks = signal<{ id: string; plate: string; model: string; capacity: string; status: 'available' | 'in_transit' | 'maintenance' }[]>([
    { id: 'TRK-01', plate: 'GT-4821-26', model: 'Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler', capacity: '3.5 Tons (Handles Grand Villa Doors)', status: 'available' },
    { id: 'TRK-02', plate: 'GN-1904-25', model: 'Isuzu NPR Enclosed Weatherproof Cargo Hauler', capacity: '2.8 Tons (Acoustic & Interior Sets)', status: 'available' },
    { id: 'TRK-03', plate: 'GE-7720-26', model: 'Toyota Dyna Rapid Response Van with Hydraulic Lift', capacity: '1.8 Tons (Locks & Hardware Packs)', status: 'available' },
    { id: 'TRK-04', plate: 'GW-3310-26', model: 'Ford Transit High-Roof Architectural Carrier', capacity: '2.2 Tons', status: 'available' }
  ]);

  // Installation Jobs (live from MySQL via /api/jobs)
  readonly jobs = signal<InstallationJob[]>([]);

  // Notifications (live from MySQL via /api/notifications)
  readonly notifications = signal<NotificationItem[]>([]);

  // Customer Installation Inquiries from Landing Page (live from MySQL via /api/inquiries)
  readonly inquiries = signal<InstallationInquiry[]>([]);

  // Door Inventory Catalog (live from MySQL via /api/doors)
  readonly doors = signal<DoorCatalogEntry[]>([]);

  // User verified mobile phones for automated SMS routing
  readonly userPhones = signal<UserPhoneDirectory>({
    manager: '+233 24 100 0001',
    shop_manager: '+233 24 100 0002',
    dispatcher: '+233 24 555 0192',
    installer: '+233 24 881 0293',
    client: '+233 24 883 9921',
    account_officer: '+233 24 100 0005'
  });

  // SMS Gateway Configuration
  readonly smsGatewayConfig = signal<SmsGatewayConfig>({
    provider: 'simulator',
    senderId: 'DoorMaster',
    simulationMode: true
  });

  // Sent SMS Logs (live from MySQL via /api/sms/logs)
  readonly smsLogs = signal<SmsLogEntry[]>([]);

  // DoorMaster Workshop Branches Directory (all 14 active branches + Central Atelier)
  readonly branches = signal<ShopLocationSettings[]>(DEFAULT_DOORMASTER_BRANCHES);

  // Shop Manager Workshop Location & Settings (active selected branch)
  readonly shopLocation = signal<ShopLocationSettings>(DEFAULT_DOORMASTER_BRANCHES[0]);

  // API Auth State
  readonly apiUser = signal<ApiAuthUser | null>(null);
  readonly apiToken = signal<string | null>(null);
  readonly isAuthenticated = computed(() => !!this.apiUser() && !!this.apiToken());

  // Default verified persona profiles for demo & fallback
  private readonly defaultPersonas: Record<string, ApiAuthUser> = {
    manager: {
      id: 'USR-MGR-01',
      name: 'Sarah Sterling',
      email: 'manager@doormasterops.com',
      role: 'manager',
      phone: '+233 24 555 0101',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-15T08:00:00Z'
    },
    installer: {
      id: 'USR-INS-01',
      name: 'Marcus Vance',
      email: 'm.vance@doormasterops.com',
      role: 'installer',
      phone: '+233 24 555 0102',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-16T08:00:00Z'
    },
    client: {
      id: 'USR-CLI-01',
      name: 'Kwame Mensah',
      email: 'client@doormasterops.com',
      role: 'client',
      phone: '+233 24 555 0103',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-20T08:00:00Z'
    },
    account_officer: {
      id: 'USR-FIN-01',
      name: 'Abena Osei',
      email: 'finance@doormasterops.com',
      role: 'account_officer',
      phone: '+233 24 555 0104',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-18T08:00:00Z'
    },
    shop_manager: {
      id: 'USR-SHP-01',
      name: 'Elena Rostova',
      email: 'shop@doormasterops.com',
      role: 'shop_manager',
      phone: '+233 24 555 0105',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-17T08:00:00Z'
    },
    dispatcher: {
      id: 'USR-DSP-01',
      name: 'Emmanuel Kojo',
      email: 'dispatch@doormasterops.com',
      role: 'dispatcher',
      phone: '+233 24 555 0106',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-19T08:00:00Z'
    }
  };

  readonly customUserProfile = signal<Partial<ApiAuthUser> | null>(null);

  readonly currentUser = computed<ApiAuthUser>(() => {
    const imp = this.impersonationSession();
    if (imp) {
      const t = imp.targetUser;
      return {
        id: t.id,
        name: t.name,
        email: t.email,
        role: imp.targetRole,
        phone: t.phone || '',
        avatarUrl: t.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: (t.status as any) || 'active',
        createdAt: t.createdAt || new Date().toISOString()
      };
    }

    const custom = this.customUserProfile();
    const api = this.apiUser();
    const role = this.currentRole();
    const fallback = this.defaultPersonas[role] || this.defaultPersonas['manager'];

    const base = api || fallback;
    if (!custom) return base;

    return {
      ...base,
      name: custom.name !== undefined ? custom.name : base.name,
      email: custom.email !== undefined ? custom.email : base.email,
      phone: custom.phone !== undefined ? custom.phone : base.phone,
      avatarUrl: custom.avatarUrl !== undefined ? custom.avatarUrl : base.avatarUrl
    };
  });

  readonly primaryUser = computed<ApiAuthUser>(() => {
    const api = this.apiUser();
    const origRole = this.originalRole();
    const fallback = this.defaultPersonas[origRole] || this.defaultPersonas['manager'];
    return api || fallback;
  });

  // Live GPS tracking state
  readonly liveLocations = signal<LiveLocation[]>([]);
  readonly isGpsTracking = signal<boolean>(false);
  readonly gpsWatchId = signal<number | null>(null);
  readonly myLiveLocation = signal<LiveLocation | null>(null);
  readonly isManager = computed(() => this.apiUser()?.role === 'manager');

  // Database health
  readonly dbStatus = signal<DbHealthStatus | null>(null);
  readonly isDbChecking = signal<boolean>(false);

  // User Management Signals
  readonly users = signal<AppUser[]>([]);
  readonly pendingUsers = computed(() => this.users().filter(u => u.status === 'pending'));
  readonly activeUsers = computed(() => this.users().filter(u => u.status === 'active'));
  readonly deactivatedUsers = computed(() => this.users().filter(u => u.status === 'deactivated' || u.status === 'rejected'));

  // Door Scraping & Live Sync State from https://doormaster.online/shop/
  readonly isScraping = signal<boolean>(false);

  readonly lastSyncTimestamp = signal<string | null>(null);
  readonly syncSource = signal<string>('doormaster.online catalog');
  readonly syncError = signal<string | null>(null);

  // Available categories dynamically extracted from current doors
  readonly availableCategories = computed(() => {
    const list = this.doors();
    const catCounts = new Map<string, number>();
    list.forEach(d => {
      const cat = d.category || 'General Doors';
      catCounts.set(cat, (catCounts.get(cat) || 0) + 1);
    });
    return Array.from(catCounts.entries()).map(([name, count]) => ({ name, count }));
  });

  readonly doorStats = computed(() => {
    const list = this.doors();
    const totalModels = list.length;
    const inStockCount = list.filter(d => d.status === 'in_stock').length;
    const lowStockCount = list.filter(d => d.status === 'low_stock').length;
    const madeToOrderCount = list.filter(d => d.status === 'made_to_order').length;
    const totalUnits = list.reduce((sum, d) => sum + (d.stockQuantity || 0), 0);
    const totalValue = list.reduce((sum, d) => sum + ((d.stockQuantity || 0) * (d.unitPrice || 0)), 0);

    return {
      totalModels,
      inStockCount,
      lowStockCount,
      madeToOrderCount,
      totalUnits,
      totalValue
    };
  });

  readonly currentRoleDefinition = computed(() => {
    const roleId = this.currentRole();
    return this.roles().find(r => r.id === roleId) || this.roles()[0];
  });

  readonly unreadNotificationsCount = computed(() => {
    const role = this.currentRole();
    return this.notifications().filter(n => !n.read && (n.recipientRole === role || n.recipientRole === 'all')).length;
  });

  readonly roleNotifications = computed(() => {
    const role = this.currentRole();
    return this.notifications().filter(n => n.recipientRole === role || n.recipientRole === 'all');
  });

  readonly activeJobForCurrentInstaller = computed(() => {
    const instId = this.currentInstallerId();
    const curUser = this.currentUser();
    if (!instId && !curUser) return undefined;
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    return this.jobs().find(j => {
      const matchId = (instId && (j.assignedInstallerId === instId || (j.assignedInstallerIds && j.assignedInstallerIds.includes(instId)))) ||
                      (instId === 'USR-INS-01' && (j.assignedInstallerId === 'inst_01' || j.assignedInstallerId === 'USR-INS-01'));
      const matchName = namePrefix && j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(namePrefix);
      const isLive = j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'assigned' || j.status === 'in_progress';
      return (matchId || matchName) && isLive;
    });
  });

  readonly clientJobs = computed(() => {
    const cliId = this.currentClientId();
    const curUser = this.currentUser();
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    const userEmail = curUser?.email ? curUser.email.toLowerCase() : '';
    const matched = this.jobs().filter(j => 
      (cliId && j.client?.id === cliId) ||
      (userEmail && j.client?.email && j.client.email.toLowerCase() === userEmail) ||
      (namePrefix && j.client?.name && j.client.name.toLowerCase().includes(namePrefix))
    );
    if (matched.length > 0) return matched;
    if (curUser?.role === 'client' && this.jobs().length > 0) {
      return this.jobs().map(j => ({
        ...j,
        client: {
          ...j.client,
          id: curUser.id,
          name: curUser.name,
          phone: curUser.phone || j.client.phone,
          email: curUser.email || j.client.email
        }
      }));
    }
    return matched;
  });

  // Signed in and available technicians
  readonly signedInInstallers = computed(() => this.installers().filter(i => i.isSignedIn));
  readonly availableInstallers = computed(() => this.installers().filter(i => i.isSignedIn && i.availabilityStatus === 'available'));

  // Active Dispatcher and assigned deliveries
  readonly activeDispatcher = computed<DispatcherProfile | undefined>(() => {
    const id = this.currentDispatcherId();
    const curUser = this.currentUser();
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    const found = this.dispatchers().find(d => 
      (id && d.id === id) || 
      (namePrefix && d.name.toLowerCase().includes(namePrefix))
    );
    if (found) {
      return {
        ...found,
        name: curUser?.role === 'dispatcher' ? curUser.name : found.name,
        phone: curUser?.role === 'dispatcher' && curUser.phone ? curUser.phone : found.phone,
        email: curUser?.role === 'dispatcher' && curUser.email ? curUser.email : found.email
      };
    }
    if (curUser?.role === 'dispatcher') {
      return {
        id: curUser.id,
        name: curUser.name,
        phone: curUser.phone || '+233 24 555 0192',
        email: curUser.email || 'dispatch@doormasterops.com',
        assignedTruck: {
          plate: this.trucks()[0]?.plate || 'GT-4821-26',
          model: this.trucks()[0]?.model || 'Mercedes-Benz Atego',
          capacityKg: 3500
        },
        status: 'available',
        currentTripJobId: null,
        rating: 4.95,
        completedDeliveries: 4
      };
    }
    return this.dispatchers()[0] || undefined;
  });

  readonly dispatcherJobs = computed(() => {
    const disp = this.activeDispatcher();
    const dispId = this.currentDispatcherId() || disp?.id;
    const curUser = this.currentUser();
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : (disp?.name ? disp.name.split(' ')[0].toLowerCase() : '');
    const matched = this.jobs().filter(j => 
      (dispId && (j.dispatcherId === dispId || (j as any).assignedDriverId === dispId)) ||
      (dispId === 'USR-DSP-01' && ((j as any).assignedDriverId === 'USR-DSP-01' || j.dispatcherId === 'USR-DSP-01')) ||
      (namePrefix && ((j.dispatcherName && j.dispatcherName.toLowerCase().includes(namePrefix)) || ((j as any).assignedDriverName && (j as any).assignedDriverName.toLowerCase().includes(namePrefix))))
    );
    if (matched.length > 0) return matched;
    if (curUser?.role === 'dispatcher' && this.jobs().length > 0) {
      return this.jobs().filter(j => j.status === 'dispatched' || j.status === 'truck_assigned' || j.status === 'delivered_on_site' || j.status === 'accepted' || j.status === 'on_site').map(j => ({
        ...j,
        dispatcherId: curUser.id,
        dispatcherName: curUser.name,
        assignedDriverId: curUser.id,
        assignedDriverName: curUser.name
      }));
    }
    return matched;
  });

  // Cross-role workflow queues
  readonly shopPendingTruckSetupJobs = computed(() => this.jobs().filter(j => j.status === 'booked_at_shop' || ((!j.assignedInstallerId && (!j.assignedInstallerIds || j.assignedInstallerIds.length === 0)) && j.status !== 'completed' && j.status !== 'bonus_awarded')));
  readonly shopPendingDriverJobs = computed(() => this.jobs().filter(j => (j.status === 'assigned' || j.status === 'booked_at_shop') && (!!j.assignedInstallerId || (j.assignedInstallerIds && j.assignedInstallerIds.length > 0)) && !j.dispatcherId));
  readonly pendingFinanceVerificationJobs = computed(() => this.jobs().filter(j => j.shopBooking && !j.shopBooking.accountantVerified));
  readonly pendingTechMobilizationJobs = computed(() => this.jobs().filter(j => j.technicianSiteFunds && j.technicianSiteFunds.status === 'pending_dispatch'));
  readonly totalShopCollections = computed(() => this.jobs().reduce((sum, j) => sum + (j.shopBooking?.amountPaidAtShop || 0), 0));
  readonly totalSiteFundsDispatched = computed(() => this.jobs().reduce((sum, j) => sum + (j.technicianSiteFunds?.status === 'dispatched' ? j.technicianSiteFunds.amount : 0), 0));

  readonly stats = computed(() => {
    const all = this.jobs();
    const completed = all.filter(j => j.status === 'completed' || j.status === 'bonus_awarded').length;
    const inProgress = all.filter(j => j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'delivered_on_site' || j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || j.status === 'assigned').length;
    const pendingSignoff = all.filter(j => j.status === 'installed_pending_signoff').length;
    const pendingBonusApproval = all.filter(j => j.financials.bonusStatus === 'pending' && (j.status === 'completed' || j.status === 'installed_pending_signoff')).length;
    const totalOrderValue = all.reduce((sum, j) => sum + j.financials.doorPrice + j.financials.installationFee, 0);
    const totalBonusesAllocated = all.reduce((sum, j) => sum + j.financials.bonusAmount, 0);
    
    return {
      totalJobs: all.length,
      completed,
      inProgress,
      pendingSignoff,
      pendingBonusApproval,
      totalOrderValue,
      totalBonusesAllocated
    };
  });

  constructor() {
    const session = readPersistedSession();
    if (session) {
      this.applySession(session.user, session.token);
    }

    // Restore any active temporary session from sessionStorage
    const savedImp = readPersistedImpersonation();
    if (savedImp) {
      this.impersonationSession.set(savedImp);
      this.applyImpersonatedState(savedImp);
    }

    this.loadFromApi();

    if (session) {
      void this.validateSession();
    }

    // 10-Minute Dispatch Driver & Installer Auto-Acceptance Watchdog (Checks every 5 seconds)
    setInterval(() => {
      this.checkAndAutoAcceptExpiredDriverAssignments();
      this.checkAndAutoAcceptExpiredInstallerAssignments();
    }, 5000);
  }

  /**
   * Adds the bearer token to every API request when a session exists.
   * Public endpoints simply ignore the header.
   */
  async apiFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
    const headers = new Headers(init.headers);
    const token = this.apiToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const res = await fetch(input, { ...init, headers });

    // Any endpoint that rejects a token means the session is no longer valid
    // (expired, revoked, or the account was deactivated). Clear it once.
    if (res.status === 401 && token) {
      this.clearSession();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/signin')) {
        window.location.assign('/signin');
      }
    }

    return res;
  }

  private applySession(user: ApiAuthUser, token: string): void {
    this.apiUser.set(user);
    this.apiToken.set(token);

    if (user.role) {
      this.currentRole.set(user.role as RoleType);
    }
    if (user.role === 'installer') {
      this.currentInstallerId.set(user.id);
    } else if (user.role === 'dispatcher') {
      this.currentDispatcherId.set(user.id);
    } else if (user.role === 'client') {
      this.currentClientId.set(user.id);
    } else if (user.role === 'shop_manager') {
      const email = (user.email || '').toLowerCase();
      const matched = this.branches().find(b => 
        (b.email && b.email.toLowerCase() === email) ||
        (b.managerEmail && b.managerEmail.toLowerCase() === email) ||
        (b.managerName && b.managerName.toLowerCase().includes(user.name.toLowerCase()))
      );
      if (matched) {
        this.shopLocation.set(matched);
      }
    }
  }

  /**
   * Confirms a persisted token is still valid and the account is still active.
   * A 401 clears the local session; the route guard then returns to sign-in.
   */
  private async validateSession(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/auth/me');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && responseData.user) {
          this.applySession(responseData.user, this.apiToken() as string);
          return;
        }
      }
      this.clearSession();
    } catch {
      // Network failure: keep the cached session and retry on the next request.
    }
  }

  private clearSession(): void {
    this.apiUser.set(null);
    this.apiToken.set(null);
    this.currentRole.set('manager');
    this.currentInstallerId.set(null);
    this.currentClientId.set(null);
    this.currentDispatcherId.set(null);
    clearPersistedImpersonation();
    this.impersonationSession.set(null);
    clearPersistedSession();
  }

  /**
   * Loads all live data from MySQL via Express backend API endpoints.
   * No demo/seed data is used — everything comes from the database.
   */
  private async loadFromApi(): Promise<void> {
    await Promise.all([
      this.loadUsers(),
      this.loadJobsFromBackend(),
      this.loadNotificationsFromBackend(),
      this.loadSmsLogsFromBackend(),
      this.loadInquiriesFromBackend(),
      this.loadDoorsFromBackend(),
      this.loadShopLocationFromBackend(),
      this.loadBranchesFromBackend(),
      this.checkDbStatus()
    ]);

    // Derive installers & dispatchers from authenticated users
    this.deriveInstallersAndDispatchersFromUsers();
  }

  /**
   * Derives installer & dispatcher profiles from the users table.
   * Maps 1 dispatcher per branch and organizes installers into 2 teams with 3 installers each (1 team lead per team).
   */
  private deriveInstallersAndDispatchersFromUsers(): void {
    const userList = this.users();
    const branches = this.branches();
    
    const installerUsers = userList.filter(u => u.role === 'installer');
    const mappedInstallers: InstallerProfile[] = installerUsers.map((u, idx) => {
      // Determine Team Alpha vs Team Bravo (3 each, 1 team lead per team)
      const isTeamAlpha = u.id === 'USR-INS-01' || u.id === 'USR-INS-02' || u.id === 'USR-INS-03' || 
                          u.name.toLowerCase().includes('alpha') || u.name.toLowerCase().includes('vance') || 
                          u.name.toLowerCase().includes('koranteng') || u.name.toLowerCase().includes('annan') || idx < 3;
      const teamId = isTeamAlpha ? 'team-alpha' : 'team-bravo';
      const teamName = isTeamAlpha ? 'Team Alpha (Precision Acoustics & Pivots)' : 'Team Bravo (Smart Lock & Heavy Entry Squad)';
      const isTeamLead = u.id === 'USR-INS-01' || u.id === 'USR-INS-04' || 
                         u.name.toLowerCase().includes('lead') || 
                         (isTeamAlpha && idx === 0) || (!isTeamAlpha && idx === 3);
      const teamRole: 'lead' | 'assistant' = isTeamLead ? 'lead' : 'assistant';

      return {
        id: u.id,
        name: u.name,
        role: 'installer' as const,
        phone: u.phone || '',
        email: u.email,
        avatarUrl: u.avatarUrl || '',
        teamId,
        teamName,
        isTeamLead,
        teamRole,
        specialties: isTeamAlpha ? ['acoustic_french', 'entrance_pivot'] : ['Smart Lock Doors', 'Premium Villa Series'],
        lockSpecialties: isTeamLead ? ['Doormaster Smart Lock Handle F35', 'Biometric & RFID'] : ['Concealed Hinges', 'Multi-point Lockset'],
        activeJobId: null,
        isSignedIn: u.status === 'active',
        lastSeenAt: u.createdAt || new Date().toISOString(),
        currentLocationName: isTeamAlpha ? 'Central & Greater Accra Sector' : 'Northern & Commercial Sector',
        availabilityStatus: u.status === 'active' ? 'available' : 'off_duty',
        metrics: {
          completedJobs: isTeamLead ? 24 : 12,
          onTimeRate: isTeamLead ? 99 : 96,
          avgTurnaroundHours: 3.2,
          avgRating: isTeamLead ? 4.95 : 4.88,
          firstTimePassRate: 98,
          totalBonusesEarned: isTeamLead ? 720 : 360,
          pendingBonuses: 0
        }
      };
    });

    this.installers.set(mappedInstallers);

    // Build the two installer teams (3 installers each, 1 team lead)
    const teamAlphaMembers = mappedInstallers.filter(i => i.teamId === 'team-alpha');
    const teamBravoMembers = mappedInstallers.filter(i => i.teamId === 'team-bravo');

    const leadAlpha = teamAlphaMembers.find(i => i.isTeamLead) || teamAlphaMembers[0];
    const leadBravo = teamBravoMembers.find(i => i.isTeamLead) || teamBravoMembers[0];

    const teams: InstallerTeam[] = [];

    if (teamAlphaMembers.length > 0) {
      teams.push({
        id: 'team-alpha',
        name: 'Team Alpha - Precision Acoustics & Pivots',
        code: 'ALPHA',
        leadId: leadAlpha ? leadAlpha.id : 'USR-INS-01',
        leadName: leadAlpha ? leadAlpha.name : 'Marcus Vance',
        leadPhone: leadAlpha ? leadAlpha.phone : '+233 24 555 0102',
        leadAvatarUrl: leadAlpha?.avatarUrl,
        memberIds: teamAlphaMembers.map(m => m.id),
        members: teamAlphaMembers.map(m => ({
          id: m.id,
          name: m.name,
          phone: m.phone,
          role: m.isTeamLead ? 'lead' : 'assistant',
          avatar: m.avatarUrl,
          avgRating: m.metrics.avgRating,
          teamId: 'team-alpha',
          teamName: 'Team Alpha',
          isTeamLead: m.isTeamLead
        })),
        specialties: ['Acoustic French Doors', 'Entrance Pivot Doors', 'Master Architectural Alignment'],
        description: 'Elite 3-person squad specialized in precision acoustic French doors, heavy pivot systems, and concealed hinges.',
        status: 'available'
      });
    }

    if (teamBravoMembers.length > 0) {
      teams.push({
        id: 'team-bravo',
        name: 'Team Bravo - Smart Lock & Heavy Entry Squad',
        code: 'BRAVO',
        leadId: leadBravo ? leadBravo.id : 'USR-INS-04',
        leadName: leadBravo ? leadBravo.name : 'Derrick Bruce',
        leadPhone: leadBravo ? leadBravo.phone : '+233 24 555 0114',
        leadAvatarUrl: leadBravo?.avatarUrl,
        memberIds: teamBravoMembers.map(m => m.id),
        members: teamBravoMembers.map(m => ({
          id: m.id,
          name: m.name,
          phone: m.phone,
          role: m.isTeamLead ? 'lead' : 'assistant',
          avatar: m.avatarUrl,
          avgRating: m.metrics.avgRating,
          teamId: 'team-bravo',
          teamName: 'Team Bravo',
          isTeamLead: m.isTeamLead
        })),
        specialties: ['Smart Lock Biometrics & RFID', 'Grand Villa Steel Doors', 'Multi-Point Deadbolts'],
        description: 'Elite 3-person heavy security squad specialized in biometric smart handle integration, armored villa doors, and rapid response.',
        status: 'available'
      });
    }

    this.installerTeams.set(teams);

    // Map each dispatcher user to their respective branch
    const dispatcherUsers = userList.filter(u => u.role === 'dispatcher');
    this.dispatchers.set(dispatcherUsers.map((u, idx) => {
      // Find matching branch from 15 branches
      const branchKey = u.id.replace('USR-DSP-', '').toLowerCase();
      const matchedBranch = branches.find(b => {
        const bCode = (b.branchCode || '').toLowerCase();
        const bId = String(b.id || '').toLowerCase();
        const bCity = (b.city || '').toLowerCase();
        const bName = (b.shopName || '').toLowerCase();
        const uEmail = u.email.toLowerCase();
        const uName = u.name.toLowerCase();

        if (branchKey === '01' && (bId.includes('central') || bCode.includes('hq') || bCode.includes('spx'))) return true;
        if (bId.includes(branchKey) || bCode.includes(branchKey)) return true;
        if (uEmail.includes(bCity) || uEmail.includes(branchKey) || uName.includes(bCity) || uName.includes(bName.split(' ')[1] || '')) return true;
        return false;
      }) || branches[idx % branches.length];

      const truck = this.trucks()[idx % this.trucks().length] || this.trucks()[0];

      return {
        id: u.id,
        name: u.name,
        phone: u.phone || '',
        email: u.email,
        avatarUrl: u.avatarUrl || '',
        branchCode: matchedBranch?.branchCode || 'DM-GH-HQ-SPX',
        branchName: matchedBranch?.shopName || 'DoorMaster Central Showroom & Atelier',
        assignedTruck: {
          plate: truck?.plate || 'GT-4821-26',
          model: truck?.model || 'Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler',
          capacityKg: 3500
        },
        status: u.status === 'active' ? 'available' : 'off_duty',
        currentTripJobId: null,
        rating: 4.95,
        completedDeliveries: 4 + (idx * 2)
      };
    }));
  }

  // ============================================================================
  // API DATA LOADING
  // ============================================================================

  async loadJobsFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/jobs');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.jobs)) {
          const mapped = responseData.jobs.map((dbJob: any) => this.mapDbJobToInstallationJob(dbJob));
          this.jobs.set(mapped);
          console.log(`[Store] Synced ${responseData.jobs.length} installation jobs from MySQL`);
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load jobs from backend:', err);
    }
  }

  private mapDbJobToInstallationJob(dbJob: any): InstallationJob {
    const client = dbJob.client || {
      id: `cli_${dbJob.id}`,
      name: dbJob.clientName || 'Valued Client',
      phone: dbJob.clientPhone || '',
      email: dbJob.clientEmail || '',
      siteAddress: dbJob.address || 'Accra, Ghana',
      coordinates: dbJob.lat && dbJob.lng ? { lat: Number(dbJob.lat), lng: Number(dbJob.lng) } : { lat: 5.6037, lng: -0.1870 },
      accessInstructions: dbJob.notes || ''
    };

    const shopBooking = dbJob.shopBooking || {
      bookedByShopManager: 'DoorMaster Master Shop Manager',
      shopBranch: dbJob.shopBranch || 'Accra Flagship Showroom',
      bookingTimestamp: dbJob.createdAt || new Date().toISOString(),
      lockModelRequested: dbJob.lockModel || 'Doormaster High-Security Smart Lock',
      amountPaidAtShop: Number(dbJob.depositAmount) || 0,
      paymentMethod: 'momo',
      receiptNumber: `REC-${dbJob.jobNumber || 'LIVE'}`,
      paymentStatus: Number(dbJob.balanceDue) <= 0 ? 'paid_in_full' : 'deposit_paid',
      accountantVerified: true
    };

    const technicianSiteFunds = dbJob.technicianSiteFunds || {
      amount: 250,
      purpose: 'Site visit travel allowance & smart lock installation kit stipend',
      status: 'pending_dispatch'
    };

    const financials = dbJob.financials || {
      doorPrice: (Number(dbJob.depositAmount) || 0) + (Number(dbJob.balanceDue) || 0),
      installationFee: 500,
      laborCost: 450,
      bonusAmount: 220,
      bonusStatus: 'pending',
      depositPaid: (Number(dbJob.depositAmount) || 0) > 0,
      balancePaid: (Number(dbJob.balanceDue) || 0) <= 0
    };

    return {
      id: dbJob.jobNumber || dbJob.id || `DM-${Date.now()}`,
      title: dbJob.title || `${dbJob.doorName || 'Door Installation'} - ${dbJob.clientName || 'Client'}`,
      doorModel: dbJob.doorName || 'Architectural Door Slab',
      doorCategory: dbJob.doorCategory || 'General Doors',
      doors: dbJob.doors || undefined,
      lockModel: dbJob.lockModel || 'Doormaster High-Security Smart Lock Handle',
      dimensions: dbJob.doorDimensions || '2100 × 900 × 50mm',
      finish: dbJob.finish || 'Architectural Finish',
      hardwareSpecs: dbJob.hardwareSpecs || 'DormaKaba Heavy Duty Pivot, 3-point magnetic mortise lock',
      shopBranch: dbJob.shopBranch || 'Accra Flagship Showroom',
      client,
      shopBooking,
      technicianSiteFunds,
      logisticsTruck: dbJob.logisticsTruck || undefined,
      dispatcherId: dbJob.assignedDriverId || null,
      dispatcherName: dbJob.assignedDriverName || null,
      driverAssignmentStatus: dbJob.driverAssignmentStatus || 'pending',
      driverAssignedAt: dbJob.driverAssignedAt || dbJob.logisticsTruck?.driverAssignedAt,
      driverDeadlineAt: dbJob.driverDeadlineAt || dbJob.logisticsTruck?.driverDeadlineAt,
      driverAutoAccepted: dbJob.driverAutoAccepted ?? dbJob.logisticsTruck?.driverAutoAccepted ?? false,
      driverRejectReason: dbJob.driverRejectReason || dbJob.logisticsTruck?.driverRejectReason,
      driverProposedSlot: dbJob.driverProposedSlot || dbJob.logisticsTruck?.driverProposedSlot,
      driverRespondedAt: dbJob.driverRespondedAt || dbJob.logisticsTruck?.driverRespondedAt,
      assignedInstallerId: dbJob.assignedInstallerId || null,
      assignedInstallerName: dbJob.assignedInstallerName || null,
      assignedInstallerIds: dbJob.assignedInstallerIds || (dbJob.assignedInstallerId ? [dbJob.assignedInstallerId] : []),
      assignedInstallerNames: dbJob.assignedInstallerNames || (dbJob.assignedInstallerName ? dbJob.assignedInstallerName.split(', ') : []),
      assignedInstallers: dbJob.assignedInstallers || (dbJob.assignedInstallerId ? [{ id: dbJob.assignedInstallerId, name: dbJob.assignedInstallerName || 'Technician', role: 'lead' }] : []),
      installerAssignmentStatus: dbJob.installerAssignmentStatus || 'pending',
      installerAssignedAt: dbJob.installerAssignedAt || (dbJob as any).assignedInstallers?.[0]?.assignedAt || dbJob.assignedAt,
      installerDeadlineAt: dbJob.installerDeadlineAt || (dbJob as any).assignedInstallers?.[0]?.deadlineAt,
      installerAutoAccepted: dbJob.installerAutoAccepted ?? false,
      installerRejectReason: dbJob.installerRejectReason,
      installerProposedSlot: dbJob.installerProposedSlot,
      installerRespondedAt: dbJob.installerRespondedAt,
      operationsApproved: dbJob.operationsApproved || false,
      status: (dbJob.status as JobStatus) || 'booked_at_shop',
      scheduledDate: dbJob.scheduledTime || 'Scheduled Today',
      estimatedHours: 4,
      clockSessions: dbJob.clockSessions || [],
      photos: dbJob.photos || [],
      hardwareChecklist: dbJob.hardwareChecklist || [
        { id: 'chk_1', label: 'Verify rough opening dimensions & floor levelness (±1.5mm)', required: true, completed: false },
        { id: 'chk_2', label: 'Mount pivot / heavy-duty hinge anchors to structural frame', required: true, completed: false },
        { id: 'chk_3', label: `Mount lock hardware: ${dbJob.lockModel || 'Smart Lock Mortise'}`, required: true, completed: false },
        { id: 'chk_4', label: 'Hang door slab and tune 3-axis perimeter gaps (3.5mm reveal)', required: true, completed: false },
        { id: 'chk_5', label: 'Calibrate closing dampeners and test electronic access credentials', required: true, completed: false },
        { id: 'chk_6', label: 'Affix intumescent acoustic weather gasket & customer inspection', required: true, completed: false }
      ],
      customerSignoff: dbJob.customerSignoff || undefined,
      financials,
      createdAt: dbJob.createdAt || new Date().toISOString()
    };
  }

  async persistJobToBackend(job: InstallationJob) {
    try {
      const doorTitle = job.doorModel || (job.doors && job.doors.length > 0 ? job.doors.map(d => d.doorModel).join(', ') : 'Door Installation');
      const clientName = job.client?.name || 'Valued Client';
      const clientPhone = job.client?.phone || '';
      const clientEmail = job.client?.email || '';
      const address = job.client?.siteAddress || 'Accra, Ghana';
      const lat = job.client?.coordinates?.lat ?? 5.6037;
      const lng = job.client?.coordinates?.lng ?? -0.1870;
      const notes = job.client?.accessInstructions || '';

      await this.apiFetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: job.id,
          jobNumber: job.id,
          title: job.title || `${doorTitle} - ${clientName}`,
          clientName,
          clientPhone,
          clientEmail,
          address,
          lat,
          lng,
          doorName: doorTitle,
          doorCategory: job.doorCategory,
          doorDimensions: job.dimensions,
          finish: job.finish,
          hardwareSpecs: job.hardwareSpecs,
          lockModel: job.lockModel,
          shopBranch: job.shopBranch,
          depositAmount: job.shopBooking?.amountPaidAtShop ?? (job.financials?.depositPaid ? job.financials.doorPrice : 0),
          balanceDue: (job.financials?.doorPrice || 0) - (job.shopBooking?.amountPaidAtShop || 0),
          status: job.status,
          assignedDriverId: job.dispatcherId || null,
          assignedDriverName: job.dispatcherName || null,
          driverAssignmentStatus: job.driverAssignmentStatus || 'pending',
          assignedInstallerId: job.assignedInstallerId || null,
          assignedInstallerName: job.assignedInstallerName || null,
          assignedInstallerIds: job.assignedInstallerIds || null,
          assignedInstallerNames: job.assignedInstallerNames || null,
          assignedInstallers: job.assignedInstallers || null,
          installerAssignmentStatus: job.installerAssignmentStatus || 'pending',
          operationsApproved: job.operationsApproved || false,
          scheduledTime: job.scheduledDate,
          notes,
          doors: job.doors || null,
          client: job.client || null,
          shopBooking: job.shopBooking || null,
          technicianSiteFunds: job.technicianSiteFunds || null,
          logisticsTruck: job.logisticsTruck || null,
          clockSessions: job.clockSessions || null,
          hardwareChecklist: job.hardwareChecklist || null,
          photos: job.photos || null,
          customerSignoff: job.customerSignoff || null,
          financials: job.financials || null,
        })
      });
      console.log(`[Store] Persisted job ${job.id} to MySQL via Prisma`);
    } catch (err) {
      console.warn('[Store] Could not persist job to backend:', err);
    }
  }

  async loadSmsLogsFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/sms/logs');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.logs)) {
          this.smsLogs.set(responseData.logs.map((l: any) => ({
            id: l.id,
            recipientPhone: l.recipientPhone,
            recipientRole: l.recipientRole as RoleType,
            recipientName: l.recipientName,
            senderId: l.senderId || 'DoorMaster',
            messageText: l.messageText,
            triggerEvent: l.triggerEvent,
            gatewayResponse: `${l.providerRef || 'SIM-DIRECT'}: Delivered to network`,
            status: l.status || 'delivered',
            timestamp: l.createdAt || new Date().toISOString(),
            jobId: undefined
          })));
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load SMS logs from backend:', err);
    }
  }

  async loadNotificationsFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/notifications');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.notifications)) {
          const mapped: NotificationItem[] = responseData.notifications.map((n: any) => ({
            id: n.id,
            recipientRole: n.recipientRole as RoleType,
            recipientUserId: n.recipientUserId || undefined,
            title: n.title,
            message: n.message,
            type: n.type as any,
            jobId: n.jobId || undefined,
            timestamp: n.createdAt || new Date().toISOString(),
            read: !!n.read,
            actionLabel: n.actionLabel || undefined
          }));
          this.notifications.set(mapped);
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load notifications from backend:', err);
    }
  }

  async loadInquiriesFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/inquiries');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.inquiries)) {
          this.inquiries.set(responseData.inquiries.map((q: any) => ({
            id: q.id,
            fullName: q.clientName,
            phone: q.clientPhone,
            email: q.clientEmail || '',
            doorType: q.doorCategory || 'General Doors',
            projectType: q.projectType || 'residential',
            siteAddress: q.location || 'Accra, Ghana',
            doorsCount: q.numberOfDoors || 1,
            message: q.notes || '',
            status: q.status || 'new',
            submittedAt: q.createdAt || new Date().toISOString()
          })));
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load inquiries from backend:', err);
    }
  }

  async loadDoorsFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/doors');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.doors)) {
          this.doors.set(responseData.doors.map((d: any) => ({
            id: d.id,
            name: d.name,
            modelCode: d.modelCode || '',
            category: d.category || 'General Doors',
            dimensions: d.dimensions || '2100 × 900 × 50mm',
            material: d.material || '',
            finish: d.finish || '',
            hardwareSpecs: d.hardwareSpecs || '',
            fireRating: d.fireRating || 'Standard / FD30',
            acousticRating: d.acousticRating || '35 dB',
            unitPrice: Number(d.unitPrice || 0),
            formattedPrice: d.formattedPrice || '₵0.00',
            stockQuantity: d.stockQuantity ?? 0,
            leadTimeDays: d.leadTimeDays ?? 3,
            status: d.status || 'in_stock',
            supplierOrWorkshop: d.supplierOrWorkshop || 'DoorMaster Workshop',
            imageUrl: d.imageUrl,
            sourceUrl: d.sourceUrl,
            scrapedAt: d.scrapedAt,
            description: d.description || '',
            warrantyYears: d.warrantyYears ?? 10,
            createdAt: d.createdAt || new Date().toISOString()
          })));
          console.log(`[Store] Synced ${responseData.doors.length} doors from MySQL`);
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load doors from backend:', err);
    }
  }

  // ============================================================================
  // USER MANAGEMENT & ACCESS CONTROL (Operations Manager Governance)
  // ============================================================================

  async loadUsers(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/auth/users');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.users)) {
          this.users.set(responseData.users);
          console.log(`[Store] Synced ${responseData.users.length} users from database`);
          return;
        }
      }
      this.users.set([]);
    } catch (err) {
      console.warn('[Store] Could not load users from backend:', err);
      this.users.set([]);
    }
  }

  async approveUser(userId: string): Promise<boolean> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' })
      });
      const responseData = await res.json()
      if (responseData.success) {
        this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'active' } : u));
        await this.deriveInstallersAndDispatchersFromUsers();
        const target = this.users().find(u => u.id === userId);
        this.createNotification({
          recipientRole: 'manager',
          title: 'User Registration Approved',
          message: `${target?.name || 'User'} has been approved and activated. They can now access DoorMaster Ops.`,
          type: 'job_assigned',
          jobId: ''
        });
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[Store] Failed approving user via API:', err);
      return false;
    }
  }

  async rejectUser(userId: string): Promise<boolean> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      const responseData = await res.json()
      if (responseData.success) {
        this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
        await this.deriveInstallersAndDispatchersFromUsers();
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[Store] Failed rejecting user via API:', err);
      return false;
    }
  }

  async deactivateUser(userId: string): Promise<boolean> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'deactivated' })
      });
      const responseData = await res.json()
      if (responseData.success) {
        this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'deactivated' } : u));
        await this.deriveInstallersAndDispatchersFromUsers();
        const target = this.users().find(u => u.id === userId);
        this.createNotification({
          recipientRole: 'manager',
          title: 'Account Deactivated',
          message: `User ${target?.name || userId} has been deactivated. Sign-in access revoked.`,
          type: 'job_assigned',
          jobId: ''
        });
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[Store] Failed deactivating user via API:', err);
      return false;
    }
  }

  async activateUser(userId: string): Promise<boolean> {
    return this.approveUser(userId);
  }

  async addNewUser(userData: {
    name: string;
    email: string;
    role: RoleType | string;
    phone: string;
    password?: string;
    status?: string;
  }): Promise<{ success: boolean; message: string; user?: AppUser }> {
    try {
      const res = await this.apiFetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const responseData = await res.json()
      if (responseData.success && responseData.user) {
        const newUser: AppUser = {
          id: responseData.user.id,
          name: responseData.user.name,
          email: responseData.user.email,
          role: responseData.user.role,
          phone: responseData.user.phone,
          status: responseData.user.status || 'active',
          avatarUrl: responseData.user.avatarUrl,
          createdAt: responseData.user.createdAt
        };
        this.users.update(list => [newUser, ...list.filter(u => u.id !== newUser.id)]);
        await this.deriveInstallersAndDispatchersFromUsers();

        this.createNotification({
          recipientRole: 'manager',
          title: 'New User Account Created',
          message: `${newUser.name} registered with role "${newUser.role}" and status "${newUser.status}".`,
          type: 'job_assigned',
          jobId: ''
        });

        return { success: true, message: responseData.message, user: newUser };
      }
      return { success: false, message: responseData.message || 'Failed creating user' };
    } catch (err) {
      console.warn('[Store] Failed creating user via API:', err);
      return { success: false, message: (err as Error).message || 'API error creating user' };
    }
  }

  async deleteUserAccount(userId: string): Promise<boolean> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
      const responseData = await res.json()
      if (responseData.success) {
        this.users.update(list => list.filter(u => u.id !== userId));
        await this.deriveInstallersAndDispatchersFromUsers();
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[Store] Failed deleting user via API:', err);
      return false;
    }
  }

  async updateUserAccount(
    userId: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      role?: RoleType | string;
      status?: string;
      avatarUrl?: string;
    }
  ): Promise<{ success: boolean; message: string; user?: AppUser }> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const responseData = await res.json();
      if (responseData.success && responseData.user) {
        const updated: AppUser = {
          id: responseData.user.id,
          name: responseData.user.name,
          email: responseData.user.email,
          role: responseData.user.role,
          phone: responseData.user.phone,
          status: responseData.user.status || 'active',
          avatarUrl: responseData.user.avatarUrl,
          createdAt: responseData.user.createdAt,
          updatedAt: responseData.user.updatedAt
        };
        this.users.update(list => list.map(u => (u.id === userId ? { ...u, ...updated } : u)));
        await this.deriveInstallersAndDispatchersFromUsers();

        if (this.apiUser()?.id === userId) {
          this.apiUser.update(cur => (cur ? { ...cur, ...updated } : cur));
        }

        return { success: true, message: responseData.message || 'User details updated successfully', user: updated };
      }
      return { success: false, message: responseData.message || 'Failed updating user' };
    } catch (err) {
      console.warn('[Store] Failed updating user via API:', err);
      return { success: false, message: (err as Error).message || 'API error updating user' };
    }
  }

  // ============================================================================
  // TEMPORARY IMPERSONATION / LOGIN AS (Session Storage Managed)
  // ============================================================================

  applyImpersonatedState(session: ImpersonationSession): void {
    this.currentRole.set(session.targetRole);

    if (session.targetUser.phone) {
      this.userPhones.update(p => ({
        ...p,
        [session.targetRole]: session.targetUser.phone
      }));
    }

    if (session.targetRole === 'installer') {
      this.currentInstallerId.set(session.targetUser.id);
      this.installers.update(list => {
        const namePart = session.targetUser.name ? session.targetUser.name.split(' ')[0].toLowerCase() : '';
        const idx = list.findIndex(i => i.id === session.targetUser.id || (namePart && i.name.toLowerCase().includes(namePart)));
        if (idx >= 0) {
          return list.map((item, i) => i === idx ? {
            ...item,
            id: session.targetUser.id,
            name: session.targetUser.name,
            email: session.targetUser.email,
            phone: session.targetUser.phone || item.phone,
            avatarUrl: session.targetUser.avatarUrl || item.avatarUrl,
            isSignedIn: true,
            availabilityStatus: 'available'
          } : item);
        }
        return [{
          id: session.targetUser.id,
          name: session.targetUser.name,
          role: 'installer' as const,
          phone: session.targetUser.phone || '+233 24 881 0293',
          email: session.targetUser.email,
          avatarUrl: session.targetUser.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          specialties: ['Master Joinery', 'Architectural Fitting'],
          lockSpecialties: ['Smart Biometrics', 'Multi-Point'],
          activeJobId: null,
          isSignedIn: true,
          lastSeenAt: new Date().toISOString(),
          currentLocationName: 'On Duty',
          availabilityStatus: 'available' as const,
          metrics: {
            completedJobs: 12,
            onTimeRate: 100,
            avgTurnaroundHours: 3.2,
            avgRating: 4.95,
            firstTimePassRate: 100,
            totalBonusesEarned: 450,
            pendingBonuses: 95
          }
        }, ...list];
      });
    } else if (session.targetRole === 'dispatcher') {
      this.currentDispatcherId.set(session.targetUser.id);
      this.dispatchers.update(list => {
        const namePart = session.targetUser.name ? session.targetUser.name.split(' ')[0].toLowerCase() : '';
        const idx = list.findIndex(d => d.id === session.targetUser.id || (namePart && d.name.toLowerCase().includes(namePart)));
        if (idx >= 0) {
          return list.map((item, i) => i === idx ? {
            ...item,
            id: session.targetUser.id,
            name: session.targetUser.name,
            email: session.targetUser.email,
            phone: session.targetUser.phone || item.phone,
            status: 'available'
          } : item);
        }
        return [{
          id: session.targetUser.id,
          name: session.targetUser.name,
          phone: session.targetUser.phone || '+233 24 555 0192',
          email: session.targetUser.email,
          assignedTruck: {
            plate: this.trucks()[0]?.plate || 'GT-4821-26',
            model: this.trucks()[0]?.model || 'Mercedes-Benz Atego',
            capacityKg: 3500
          },
          status: 'available' as const,
          currentTripJobId: null,
          rating: 4.95,
          completedDeliveries: 4
        }, ...list];
      });
    } else if (session.targetRole === 'client') {
      this.currentClientId.set(session.targetUser.id);
    } else if (session.targetRole === 'shop_manager') {
      const email = (session.targetUser.email || '').toLowerCase();
      const name = (session.targetUser.name || '').toLowerCase();
      const namePrefix = name.split(' ')[0];
      const matched = this.branches().find(b => 
        (b.email && b.email.toLowerCase() === email) ||
        (b.managerEmail && b.managerEmail.toLowerCase() === email) ||
        (b.managerName && b.managerName.toLowerCase().includes(name)) ||
        (namePrefix && b.managerName && b.managerName.toLowerCase().includes(namePrefix)) ||
        (namePrefix && b.shopName && b.shopName.toLowerCase().includes(namePrefix))
      );
      if (matched) {
        this.shopLocation.set({
          ...matched,
          managerName: session.targetUser.name,
          managerEmail: session.targetUser.email || matched.managerEmail,
          phone: session.targetUser.phone || matched.phone
        });
      } else {
        const cur = this.shopLocation();
        this.shopLocation.set({
          ...cur,
          managerName: session.targetUser.name,
          managerEmail: session.targetUser.email || cur.managerEmail,
          phone: session.targetUser.phone || cur.phone
        });
      }
    }
  }

  loginAsUser(targetUser: AppUser): void {
    if (!targetUser || !targetUser.id) return;

    if (this.impersonationSession()?.targetUser.id === targetUser.id) {
      this.alert.info('Already Active', `You are already logged in as ${targetUser.name}.`);
      return;
    }

    const currentImp = this.impersonationSession();
    const origUser = currentImp ? currentImp.originalUser : {
      id: this.currentUser().id,
      name: this.currentUser().name,
      email: this.currentUser().email,
      role: this.currentRole(),
      phone: this.currentUser().phone,
      avatarUrl: this.currentUser().avatarUrl
    };
    const origRole = currentImp ? currentImp.originalRole : this.currentRole();
    const origInstallerId = currentImp ? currentImp.originalInstallerId : this.currentInstallerId();
    const origDispatcherId = currentImp ? currentImp.originalDispatcherId : this.currentDispatcherId();
    const origClientId = currentImp ? currentImp.originalClientId : this.currentClientId();

    const targetRole = (targetUser.role as RoleType) || 'installer';

    const session: ImpersonationSession = {
      isImpersonating: true,
      originalUser: origUser,
      originalRole: origRole,
      originalInstallerId: origInstallerId,
      originalDispatcherId: origDispatcherId,
      originalClientId: origClientId,
      targetUser: { ...targetUser },
      targetRole: targetRole,
      startedAt: new Date().toISOString()
    };

    writePersistedImpersonation(session);
    this.impersonationSession.set(session);
    this.applyImpersonatedState(session);

    this.alert.success(
      'Temporary Login Active',
      `Logged in as ${targetUser.name} (${targetUser.role || targetRole}). Session storage managing store data.`
    );
  }

  revertLoginAs(): void {
    const session = this.impersonationSession();
    if (!session) return;

    clearPersistedImpersonation();
    this.impersonationSession.set(null);

    // Restore original role and user IDs
    this.currentRole.set(session.originalRole);
    this.currentInstallerId.set(session.originalInstallerId ?? null);
    this.currentDispatcherId.set(session.originalDispatcherId ?? null);
    this.currentClientId.set(session.originalClientId ?? null);

    if (session.originalRole === 'shop_manager') {
      const email = (session.originalUser.email || '').toLowerCase();
      const matched = this.branches().find(b => 
        (b.email && b.email.toLowerCase() === email) ||
        (b.managerEmail && b.managerEmail.toLowerCase() === email) ||
        (b.managerName && b.managerName.toLowerCase().includes(session.originalUser.name.toLowerCase()))
      );
      if (matched) {
        this.shopLocation.set(matched);
      }
    }

    this.alert.info(
      'Primary Session Restored',
      `Exited temporary session. Restored primary login as ${session.originalUser.name} (${session.originalRole}).`
    );
  }

  // ============================================================================
  // SHOP LOCATION & WORKSHOP SETTINGS (Shop Manager Governance)
  // ============================================================================

  async loadShopLocationFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/shop-location');
      if (res.ok) {
        const responseData = await res.json()
        const loc = responseData.shopLocation || responseData.location;
        if (responseData.success && loc) {
          this.shopLocation.set(loc);
          console.log('[Store] Synced shop location from database:', loc.shopName);
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load shop location from backend:', err);
    }
  }

  async loadBranchesFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/shop-locations');
      if (res.ok) {
        const responseData = await res.json();
        if (responseData.success && Array.isArray(responseData.locations) && responseData.locations.length > 0) {
          this.branches.set(responseData.locations);
          console.log(`[Store] Synced ${responseData.locations.length} branch locations from MySQL.`);

          // If current user is a shop manager, auto-focus their branch
          const userEmail = this.currentUser().email.toLowerCase();
          const matchedBranch = responseData.locations.find((b: ShopLocationSettings) => 
            (b.email && b.email.toLowerCase() === userEmail) ||
            (b.managerEmail && b.managerEmail.toLowerCase() === userEmail) ||
            (b.managerName && b.managerName.toLowerCase().includes(this.currentUser().name.toLowerCase()))
          );
          if (matchedBranch) {
            this.shopLocation.set(matchedBranch);
          }
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load branches from backend:', err);
    }
  }

  setActiveBranch(branchOrId: ShopLocationSettings | string): void {
    if (typeof branchOrId === 'string') {
      const found = this.branches().find(b => b.id === branchOrId || b.branchCode === branchOrId || b.shopName === branchOrId);
      if (found) {
        this.shopLocation.set(found);
      }
    } else if (branchOrId) {
      this.shopLocation.set(branchOrId);
    }
  }

  getClosestBranch(lat: number, lng: number): { branch: ShopLocationSettings; distanceKm: number } {
    const list = this.branches();
    if (!list || list.length === 0) {
      return { branch: this.shopLocation(), distanceKm: 0 };
    }

    let minDistance = Infinity;
    let closest = list[0];

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    for (const b of list) {
      const dLat = toRad(b.latitude - lat);
      const dLon = toRad(b.longitude - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(b.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      if (distance < minDistance) {
        minDistance = distance;
        closest = b;
      }
    }

    return {
      branch: closest,
      distanceKm: Math.round(minDistance * 10) / 10
    };
  }

  async updateShopLocation(settings: Partial<ShopLocationSettings>): Promise<{ success: boolean; message?: string }> {
    const updated: ShopLocationSettings = {
      ...this.shopLocation(),
      ...settings,
      updatedAt: new Date().toISOString()
    };

    this.shopLocation.set(updated);

    try {
      const res = await this.apiFetch('/api/shop-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const responseData = await res.json()
      const loc = responseData.shopLocation || responseData.location;
      if (responseData.success && loc) {
        this.shopLocation.set(loc);
      }

      this.createNotification({
        recipientRole: 'shop_manager',
        title: 'Shop Location Settings Saved',
        message: `${updated.shopName} location & coordinates saved to database.`,
        type: 'job_assigned',
        jobId: ''
      });

      return { success: true, message: responseData.message || 'Shop location settings saved to database' };
    } catch (err: any) {
      console.warn('[Store] Failed updating shop location via API:', err);
      this.alert.toastWarning('Saved Locally', 'Server unreachable. Settings saved to local cache.');
      return { success: true, message: 'Settings saved locally' };
    }
  }

  // ============================================================================
  // CORE LIFECYCLE WORKFLOWS (All writes go to MySQL via API)
  // ============================================================================

  /**
   * Shop Manager / Operations Manager assigns an installer to a door installation job.
   * Dispatches in-app notification & SMS to the installer with a 10-minute action window.
   */
  assignInstaller(jobId: string, installerId: string) {
    if (!this.currentRoleDefinition().permissions.canAssignInstallers && this.currentRole() !== 'shop_manager' && this.currentRole() !== 'manager') {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    const installer = this.installers().find(i => i.id === installerId);
    if (!installer) return;

    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        updatedJob = {
          ...job,
          assignedInstallerId: installer.id,
          assignedInstallerName: installer.name,
          assignedInstallerIds: [installer.id],
          assignedInstallerNames: [installer.name],
          assignedInstallers: [{
            id: installer.id,
            name: installer.name,
            phone: installer.phone,
            role: 'lead',
            avgRating: installer.metrics.avgRating
          }],
          assignedAt: now,
          installerAssignedAt: now,
          installerDeadlineAt: deadline,
          installerAssignmentStatus: 'pending',
          installerAutoAccepted: false,
          status: 'assigned'
        };
        return updatedJob;
      }
      return job;
    }));

    if (updatedJob) {
      this.persistJobToBackend(updatedJob);
      this.saveJobsLocally();

      this.installers.update(techs => techs.map(t => {
        if (t.id === installer.id) {
          return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
        }
        return t;
      }));

      const assigner = this.currentRole() === 'shop_manager' ? 'Shop Manager' : 'Operations Manager';

      // In-App Notification to Field Installer
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: installer.id,
        title: 'New Installation Assigned (10-Min Action Required)',
        message: `${assigner} assigned you to install ${updatedJob.doorModel} for ${updatedJob.client.name} (${updatedJob.client.siteAddress}). Scheduled: ${updatedJob.scheduledDate}. You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
        type: 'job_assigned',
        jobId: jobId,
        actionLabel: 'Review & Respond'
      });

      // SMS to Field Installer
      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: installer.phone,
        recipientName: installer.name,
        triggerEvent: 'installer_assigned',
        messageText: `DoorMaster SMS: ${assigner} assigned you to install ${updatedJob.doorModel} (${jobId}). Scheduled: ${updatedJob.scheduledDate} at ${updatedJob.client.siteAddress}. Please reject within 10 mins if unavailable, else auto-accepted for you.`,
        jobId
      });
    }
  }

  /**
   * Field Installer accepts the assigned installation job.
   */
  acceptInstallation(jobId: string) {
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        updatedJob = {
          ...job,
          status: 'accepted',
          acceptedAt: new Date().toISOString()
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    if (updatedJob) {
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: updatedJob.client.id,
        title: 'Installer Confirmed Your Installation',
        message: `DoorMaster technician ${updatedJob.assignedInstallerName || 'Marcus Vance'} has confirmed and accepted your installation of ${updatedJob.doorModel}. Scheduled date: ${updatedJob.scheduledDate}.`,
        type: 'installer_accepted',
        jobId: jobId,
        actionLabel: 'View Installation Schedule'
      });

      this.createNotification({
        recipientRole: 'manager',
        title: 'Technician Accepted Job',
        message: `${updatedJob.assignedInstallerName} accepted job ${updatedJob.id} (${updatedJob.title}).`,
        type: 'installer_accepted',
        jobId: jobId
      });
    }
  }

  /**
   * Field Installer responds to installation assignment (accept/reject).
   * Installer can only reject within 10 minutes of assignment.
   * Can accept manually within the 10-minute window.
   */
  respondInstallerAssignment(jobId: string, accepted: boolean, reason?: string, proposedSlot?: string) {
    const currentJob = this.jobs().find(j => j.id === jobId);
    if (!currentJob) return;

    const now = new Date().toISOString();
    let updatedJob: InstallationJob | undefined;

    if (accepted) {
      this.jobs.update(list => list.map(job => {
        if (job.id === jobId) {
          updatedJob = {
            ...job,
            installerAssignmentStatus: 'accepted',
            installerAutoAccepted: false,
            installerRespondedAt: now,
            status: (job.status === 'booked_at_shop' || job.status === 'assigned') ? 'assigned' : job.status
          };
          return updatedJob;
        }
        return job;
      }));
      this.saveJobsLocally();
      if (updatedJob) this.persistJobToBackend(updatedJob);

      const techName = currentJob.assignedInstallerName || 'Technician';

      // 1. In-App Notification to Field Installer
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: currentJob.assignedInstallerId || undefined,
        title: 'Installation Confirmed & Accepted',
        message: `You confirmed and accepted the installation for ${currentJob.doorModel} to ${currentJob.client.name}. Order activated for site arrival.`,
        type: 'installer_accepted',
        jobId: jobId,
        actionLabel: 'View Work Order'
      });

      // 2. In-App Notification to Shop Manager
      this.createNotification({
        recipientRole: 'shop_manager',
        title: 'Installer Confirmed & Accepted Installation',
        message: `Technician ${techName} confirmed and accepted installation for ${currentJob.doorModel} at ${currentJob.client.siteAddress}.`,
        type: 'installer_accepted',
        jobId: jobId
      });

      // 3. In-App Notification to Operations Manager
      this.createNotification({
        recipientRole: 'manager',
        title: 'Installer Confirmed Installation Assignment',
        message: `Technician ${techName} confirmed and accepted installation for ${currentJob.doorModel} to ${currentJob.client.name}.`,
        type: 'installer_accepted',
        jobId: jobId
      });

      // 4. In-App Notification to Client
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: currentJob.client.id,
        title: 'Installer Confirmed for Your Installation',
        message: `Technician ${techName} has confirmed and accepted your door installation assignment.`,
        type: 'installer_accepted',
        jobId: jobId
      });

      // 5. SMS to Manager
      this.sendSms({
        recipientRole: 'manager',
        recipientName: 'Operations Manager',
        triggerEvent: 'installer_accepted',
        messageText: `DoorMaster SMS: Installer ${techName} confirmed installation for job ${jobId} (${currentJob.doorModel}). Scheduled: ${currentJob.scheduledDate}.`,
        jobId
      });

      this.alert.toastSuccess('Installation Accepted', `You confirmed installation for ${currentJob.doorModel}.`);
    } else {
      // Installer REJECTED: Enforce 10-minute rejection limit!
      if (currentJob.installerDeadlineAt) {
        const deadline = new Date(currentJob.installerDeadlineAt).getTime();
        if (deadline <= Date.now()) {
          this.alert.toastWarning('Rejection Window Expired', 'You can only reject an installation within 10 minutes of assignment. This job has already been auto-accepted.');
          return;
        }
      }

      const rejectReason = reason || 'Installer unavailable / schedule conflict';
      const rejectedTechName = currentJob.assignedInstallerName || 'Technician';
      const rejectedTechId = currentJob.assignedInstallerId;

      this.jobs.update(list => list.map(job => {
        if (job.id === jobId) {
          updatedJob = {
            ...job,
            installerAssignmentStatus: 'rejected',
            installerRejectReason: rejectReason,
            installerProposedSlot: proposedSlot,
            installerRespondedAt: now,
            // Reassignment needed: unassign tech so Shop Manager / Operations Manager can reassign
            assignedInstallerId: null,
            assignedInstallerName: null,
            assignedInstallerIds: [],
            assignedInstallerNames: [],
            assignedInstallers: [],
            status: job.dispatcherId ? 'truck_assigned' : 'booked_at_shop'
          };
          return updatedJob;
        }
        return job;
      }));

      // Free tech in installer list
      if (rejectedTechId) {
        this.installers.update(techs => techs.map(t => {
          if (t.id === rejectedTechId) {
            return { ...t, activeJobId: null, availabilityStatus: 'available' };
          }
          return t;
        }));
      }

      this.saveJobsLocally();
      if (updatedJob) this.persistJobToBackend(updatedJob);

      // In-App Notification to Shop Manager
      this.createNotification({
        recipientRole: 'shop_manager',
        title: 'Installer Rejection - Reassignment Required',
        message: `Installer ${rejectedTechName} rejected job ${jobId} (${currentJob.doorModel}). Reason: "${rejectReason}". Queued for Shop Manager reassignment.`,
        type: 'job_assigned',
        jobId: jobId
      });

      // In-App Notification to Operations Manager
      this.createNotification({
        recipientRole: 'manager',
        title: 'Installer Rejection - Reassignment Required',
        message: `Installer ${rejectedTechName} rejected job ${jobId} (${currentJob.doorModel}). Reason: "${rejectReason}". Queued for reassignment.`,
        type: 'job_assigned',
        jobId: jobId
      });

      // SMS Notification to Shop Manager
      this.sendSms({
        recipientRole: 'shop_manager',
        recipientName: 'Shop Manager',
        triggerEvent: 'installer_rejected',
        messageText: `DoorMaster Urgent SMS: Installer ${rejectedTechName} rejected installation for ${jobId} (${currentJob.doorModel}). Reason: ${rejectReason}. Reassignment required.`,
        jobId
      });

      // In-App Notification to Installer confirming rejection
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: rejectedTechId || undefined,
        title: 'Installation Run Rejected & Reassigned',
        message: `You rejected installation for ${jobId}. Shop Manager has been alerted for technician reassignment.`,
        type: 'job_assigned',
        jobId: jobId
      });

      this.alert.toastWarning('Installation Rejected', 'Installation assignment rejected and returned to Shop Manager for reassignment.');
    }
  }

  /**
   * DoorMaster Shop Manager marks door and hardware ready & dispatched to site
   */
  dispatchDoor(jobId: string) {
    const target = this.jobs().find(j => j.id === jobId);
    if (!target?.assignedInstallerId) {
      this.alert.toastWarning('Installer Required', 'Cannot dispatch door until an installer is assigned to this job.');
      return;
    }
    let updatedJob: InstallationJob | undefined;
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        updatedJob = {
          ...job,
          status: 'dispatched'
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    if (updatedJob) {
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: updatedJob.assignedInstallerId || undefined,
        title: 'Door & Hardware Dispatched to Site',
        message: `${updatedJob.doorModel} has departed ${updatedJob.shopBranch} and is en route to site ${updatedJob.client.siteAddress}.`,
        type: 'door_dispatched',
        jobId: jobId
      });

      this.createNotification({
        recipientRole: 'client',
        recipientUserId: updatedJob.client.id,
        title: 'Door Dispatched for Delivery',
        message: `Your custom architectural door has been dispatched from DoorMaster workshop. Technician will arrive shortly.`,
        type: 'door_dispatched',
        jobId: jobId
      });
    }
  }

  /**
   * Field Installer Clocks In on site.
   */
  clockIn(jobId: string, latitude: number, longitude: number, accuracyMeters = 12) {
    const now = new Date().toISOString();
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const newSession: ClockSession = {
          id: `clk_${Date.now()}`,
          jobId,
          installerId: job.assignedInstallerId || this.currentInstallerId() || 'unknown',
          clockInTime: now,
          latitude,
          longitude,
          accuracyMeters,
          siteVerified: true,
          notes: 'Clocked in at verified site coordinates'
        };

        updatedJob = {
          ...job,
          status: 'on_site',
          clockSessions: [...(job.clockSessions || []), newSession]
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    if (typeof window !== 'undefined') {
      this.apiFetch('/api/tracking/installer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installerId: (updatedJob as InstallationJob | undefined)?.assignedInstallerId || this.currentInstallerId() || 'unknown',
          installerName: (updatedJob as InstallationJob | undefined)?.assignedInstallerName || 'Installer',
          jobId,
          sessionType: 'clock_in',
          latitude,
          longitude,
          accuracyMeters,
          siteVerified: true,
          notes: 'Clocked in at verified site coordinates'
        })
      }).catch(err => console.warn('Installer track sync warning:', err));
    }

    if (updatedJob) {
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: updatedJob.client.id,
        title: 'DoorMaster Installer Has Arrived on Site',
        message: `${updatedJob.assignedInstallerName || 'Technician'} has clocked in on site at ${updatedJob.client.siteAddress} and begun site preparation.`,
        type: 'technician_clocked_in',
        jobId: jobId
      });

      this.createNotification({
        recipientRole: 'manager',
        title: 'Installer Clocked In On Site',
        message: `${updatedJob.assignedInstallerName} clocked in for job ${updatedJob.id} at ${new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
        type: 'technician_clocked_in',
        jobId: jobId
      });
    }
  }

  /**
   * Field Installer Clocks Out on site.
   */
  clockOut(jobId: string, notes?: string) {
    const now = new Date().toISOString();
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const sessions = [...job.clockSessions];
        const activeIdx = sessions.findIndex(s => !s.clockOutTime);
        let totalMinutes = 0;

        if (activeIdx !== -1) {
          const inTime = new Date(sessions[activeIdx].clockInTime).getTime();
          const outTime = new Date(now).getTime();
          const duration = Math.max(1, Math.round((outTime - inTime) / (1000 * 60)));
          sessions[activeIdx] = {
            ...sessions[activeIdx],
            clockOutTime: now,
            durationMinutes: duration,
            notes: notes || sessions[activeIdx].notes
          };
        }

        totalMinutes = sessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
        const actualHours = +(totalMinutes / 60).toFixed(1);

        updatedJob = {
          ...job,
          status: job.customerSignoff ? 'completed' : 'installed_pending_signoff',
          clockSessions: sessions,
          actualHours: actualHours > 0 ? actualHours : 3.2
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    if (typeof window !== 'undefined') {
      this.apiFetch('/api/tracking/installer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installerId: (updatedJob as InstallationJob | undefined)?.assignedInstallerId || this.currentInstallerId() || 'unknown',
          installerName: (updatedJob as InstallationJob | undefined)?.assignedInstallerName || 'Installer',
          jobId,
          sessionType: 'clock_out',
          notes: notes || 'Technician completed shift / installation work'
        })
      }).catch(err => console.warn('Installer track sync warning:', err));
    }

    if (updatedJob) {
      this.createNotification({
        recipientRole: 'manager',
        title: 'Technician Clocked Out',
        message: `${updatedJob.assignedInstallerName} clocked out of job ${updatedJob.id}. Total logged time: ${updatedJob.actualHours} hrs.`,
        type: 'technician_clocked_out',
        jobId: jobId
      });

      if (!updatedJob.customerSignoff) {
        this.createNotification({
          recipientRole: 'client',
          recipientUserId: updatedJob.client.id,
          title: 'Door Installation Complete - Sign-off Ready',
          message: `Your door installation has been completed by ${updatedJob.assignedInstallerName}. Please inspect the work and provide digital customer verification signature.`,
          type: 'signoff_required',
          jobId: jobId,
          actionLabel: 'Verify & Sign'
        });
      }
    }
  }

  /**
   * Hardware installation checklist item toggle
   */
  toggleChecklistItem(jobId: string, itemId: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          hardwareChecklist: job.hardwareChecklist.map(item => {
            if (item.id === itemId) {
              const nextState = !item.completed;
              return {
                ...item,
                completed: nextState,
                completedAt: nextState ? new Date().toISOString() : undefined
              };
            }
            return item;
          })
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);
  }

  /**
   * Upload photo of completed work or site prep.
   */
  uploadPhoto(jobId: string, stage: 'before' | 'in_progress' | 'after', url: string, caption: string) {
    const photo: InstallationPhoto = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      stage,
      url,
      caption,
      timestamp: new Date().toISOString(),
      uploadedBy: this.currentRole() === 'installer' 
        ? (this.installers().find(i => i.id === this.currentInstallerId())?.name || 'Installer') 
        : 'Site Team'
    };

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          photos: [...job.photos, photo]
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    this.recalculateBonus(jobId);
  }

  /**
   * Submit customer digital signature & satisfaction verification.
   */
  submitCustomerSignoff(jobId: string, signoffData: CustomerSignoff) {
    let completedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        completedJob = {
          ...job,
          customerSignoff: signoffData,
          status: 'completed'
        };
        return completedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (completedJob) this.persistJobToBackend(completedJob);

    if (completedJob) {
      if (typeof window !== 'undefined') {
        this.apiFetch('/api/signoff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId,
            clientName: signoffData.clientName,
            clientPhone: (completedJob as InstallationJob).client?.phone,
            rating: signoffData.rating,
            feedback: signoffData.feedback,
            signatureDataUrl: signoffData.signatureDataUrl,
            satisfactionLevel: signoffData.rating >= 4 ? 'Excellent' : 'Satisfactory'
          })
        }).catch(err => console.warn('Customer signoff sync warning:', err));
      }

      this.recalculateBonus(jobId);

      if (completedJob.assignedInstallerId) {
        this.updateInstallerMetricsOnCompletion(completedJob.assignedInstallerId, signoffData.rating);
      }

      this.createNotification({
        recipientRole: 'manager',
        title: 'Installation Verified by Customer',
        message: `${completedJob.client.name} signed off on ${completedJob.doorModel} with a ${signoffData.rating}/5 rating! Ready for bonus review.`,
        type: 'installation_verified',
        jobId: jobId
      });

      this.createNotification({
        recipientRole: 'account_officer',
        title: 'Customer Verified - Bonus Ready for Audit',
        message: `Job ${completedJob.id} signed off. Eligible bonus: $${completedJob.financials.bonusAmount}. Please review for disbursement.`,
        type: 'installation_verified',
        jobId: jobId
      });

      this.createNotification({
        recipientRole: 'client',
        recipientUserId: completedJob.client.id,
        title: 'Verification Certificate Issued',
        message: `Thank you for choosing DoorMaster! Your installation warranty and signed completion certificate have been archived.`,
        type: 'installation_verified',
        jobId: jobId
      });
    }
  }

  /**
   * Performance Dashboard: Bonus calculation engine based on management criteria.
   */
  recalculateBonus(jobId: string) {
    const job = this.jobs().find(j => j.id === jobId);
    if (!job) return;

    const rules = this.bonusRules();
    const isArchitectural = ['entrance_pivot', 'bi_fold_patio', 'fire_rated_commercial'].includes(job.doorCategory);
    let base = isArchitectural ? rules.baseBonusArchitecturalDoor : rules.baseBonusStandardDoor;

    const onTime = job.actualHours ? job.actualHours <= job.estimatedHours : true;
    if (onTime) {
      base += rules.onTimeBonusAmount;
    }

    const hasCompletedPhotos = job.photos.some(p => p.stage === 'after');
    if (hasCompletedPhotos) {
      base += rules.cleanPhotoBonusAmount;
    }

    if (job.customerSignoff) {
      if (job.customerSignoff.rating >= 5) {
        base = Math.round(base * rules.ratingBonusMultiplier);
      } else if (job.customerSignoff.rating >= 4) {
        base = Math.round(base * 1.1);
      }
    }

    this.jobs.update(list => list.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          financials: {
            ...j.financials,
            bonusAmount: base
          }
        };
      }
      return j;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);
  }

  /**
   * Management / Account Officer approves the installer bonus
   */
  approveBonus(jobId: string, approvedBy: string) {
    let targetJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        targetJob = {
          ...job,
          status: 'bonus_awarded',
          financials: {
            ...job.financials,
            bonusStatus: 'approved',
            bonusApprovedBy: approvedBy,
            bonusApprovedAt: new Date().toISOString()
          }
        };
        return targetJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (targetJob) this.persistJobToBackend(targetJob);

    if (targetJob && targetJob.assignedInstallerId) {
      this.installers.update(techs => techs.map(t => {
        if (t.id === targetJob?.assignedInstallerId) {
          const amt = targetJob?.financials.bonusAmount || 0;
          return {
            ...t,
            metrics: {
              ...t.metrics,
              totalBonusesEarned: t.metrics.totalBonusesEarned + amt,
              pendingBonuses: Math.max(0, t.metrics.pendingBonuses - amt)
            }
          };
        }
        return t;
      }));

      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: targetJob.assignedInstallerId,
        title: 'Performance Bonus Approved!',
        message: `Congratulations! Management approved your performance bonus of $${targetJob.financials.bonusAmount} for job ${targetJob.id} (${targetJob.doorModel}).`,
        type: 'bonus_awarded',
        jobId: jobId
      });
    }
  }

  markBonusPaid(jobId: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          financials: {
            ...job.financials,
            bonusStatus: 'paid'
          }
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);
  }

  private updateInstallerMetricsOnCompletion(installerId: string, rating: number) {
    this.installers.update(techs => techs.map(t => {
      if (t.id === installerId) {
        const completed = t.metrics.completedJobs + 1;
        const newAvg = +((t.metrics.avgRating * t.metrics.completedJobs + rating) / completed).toFixed(2);
        return {
          ...t,
          activeJobId: null,
          metrics: {
            ...t.metrics,
            completedJobs: completed,
            avgRating: newAvg,
            pendingBonuses: t.metrics.pendingBonuses + 180
          }
        };
      }
      return t;
    }));
  }

  // ============================================================================
  // Dynamic Roles & Extensibility
  // ============================================================================

  addCustomRole(roleDef: Omit<RoleDefinition, 'isSystem'>) {
    const newRole: RoleDefinition = {
      ...roleDef,
      isSystem: false
    };
    this.roles.update(r => [...r, newRole]);
  }

  updateRole(roleDef: RoleDefinition) {
    this.roles.update(r => r.map(item => item.id === roleDef.id ? roleDef : item));
  }

  deleteCustomRole(roleId: string) {
    this.roles.update(r => r.filter(item => item.id !== roleId || item.isSystem));
  }

  // ============================================================================
  // Job Creation
  // ============================================================================

  createJob(jobData: Omit<InstallationJob, 'id' | 'createdAt' | 'clockSessions' | 'photos'>) {
    const newId = `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const hasInstaller = !!(jobData.assignedInstallerId || (jobData.assignedInstallerIds && jobData.assignedInstallerIds.length > 0));

    const newJob: InstallationJob = {
      ...jobData,
      id: newId,
      installerAssignmentStatus: hasInstaller ? 'pending' : undefined,
      installerAssignedAt: hasInstaller ? (jobData.installerAssignedAt || now) : undefined,
      installerDeadlineAt: hasInstaller ? (jobData.installerDeadlineAt || deadline) : undefined,
      installerAutoAccepted: false,
      createdAt: now,
      clockSessions: [],
      photos: []
    };

    this.jobs.update(list => [newJob, ...list]);
    this.saveJobsLocally();
    this.persistJobToBackend(newJob);

    const targetInstallerIds = (newJob.assignedInstallerIds && newJob.assignedInstallerIds.length > 0)
      ? newJob.assignedInstallerIds
      : (newJob.assignedInstallerId ? [newJob.assignedInstallerId] : []);

    const assigner = this.currentRole() === 'shop_manager' ? 'Shop Manager' : 'Operations Manager';

    for (const instId of targetInstallerIds) {
      const tech = this.installers().find(i => i.id === instId);
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: instId,
        title: 'New Installation Assigned (10-Min Action Required)',
        message: `${assigner} assigned you to install ${newJob.doorModel} for ${newJob.client.name} (${newJob.client.siteAddress}). Scheduled: ${newJob.scheduledDate}. You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
        type: 'job_assigned',
        jobId: newId,
        actionLabel: 'Review & Respond'
      });

      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: tech?.phone,
        recipientName: tech?.name || 'Installer',
        triggerEvent: 'installer_assigned',
        messageText: `DoorMaster SMS: ${assigner} assigned you to install ${newJob.doorModel} (${newId}). Scheduled: ${newJob.scheduledDate} at ${newJob.client.siteAddress}. Please reject within 10 mins if unavailable, else auto-accepted for you.`,
        jobId: newId
      });
    }

    return newJob;
  }

  /**
   * MASTER SHOP MANAGER: Book installation & schedule request from the shop counter interface
   */
  bookInstallationByShopManager(booking: {
    doorModel: string;
    doorCategory: DoorCategory;
    doors?: JobDoorItem[];
    lockModel?: string;
    dimensions: string;
    finish: string;
    hardwareSpecs: string;
    shopBranch: string;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    siteAddress: string;
    coordinates?: { lat: number; lng: number };
    accessInstructions?: string;
    scheduledDate: string;
    estimatedHours: number;
    doorPrice: number;
    installationFee: number;
    amountPaidAtShop: number;
    paymentMethod: 'cash' | 'momo' | 'pos_card' | 'bank_transfer';
    receiptNumber: string;
  }): InstallationJob {
    const newId = `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const totalOrder = booking.doorPrice + booking.installationFee;
    const isPaidInFull = booking.amountPaidAtShop >= totalOrder;

    const newJob: InstallationJob = {
      id: newId,
      title: `${booking.doorModel} Installation - ${booking.clientName}`,
      doorModel: booking.doorModel,
      doorCategory: booking.doorCategory,
      doors: booking.doors,
      lockModel: booking.lockModel || 'Doormaster High-Security Smart Lock Handle',
      dimensions: booking.dimensions,
      finish: booking.finish,
      hardwareSpecs: booking.hardwareSpecs,
      shopBranch: booking.shopBranch,
      client: {
        id: `cli_${Date.now()}`,
        name: booking.clientName,
        phone: booking.clientPhone,
        email: booking.clientEmail,
        siteAddress: booking.siteAddress,
        coordinates: booking.coordinates,
        accessInstructions: booking.accessInstructions || 'Site access verified with client'
      },
      shopBooking: {
        bookedByShopManager: 'DoorMaster Master Shop Manager',
        shopBranch: booking.shopBranch,
        bookingTimestamp: new Date().toISOString(),
        lockModelRequested: booking.lockModel || 'Doormaster High-Security Smart Lock',
        amountPaidAtShop: booking.amountPaidAtShop,
        paymentMethod: booking.paymentMethod,
        receiptNumber: booking.receiptNumber,
        paymentStatus: isPaidInFull ? 'paid_in_full' : 'deposit_paid',
        accountantVerified: false
      },
      technicianSiteFunds: {
        amount: 250,
        purpose: 'Site visit travel allowance & smart lock installation kit stipend',
        status: 'pending_dispatch'
      },
      assignedInstallerId: null,
      assignedInstallerName: null,
      installerAssignmentStatus: 'pending',
      status: 'booked_at_shop',
      scheduledDate: booking.scheduledDate,
      estimatedHours: booking.estimatedHours,
      clockSessions: [],
      photos: [],
      hardwareChecklist: [
        { id: 'chk_1', label: 'Verify rough opening dimensions & floor levelness (±1.5mm)', required: true, completed: false },
        { id: 'chk_2', label: 'Mount pivot / heavy-duty hinge anchors to structural frame', required: true, completed: false },
        { id: 'chk_3', label: `Mount lock hardware: ${booking.lockModel || 'Smart Lock Mortise'} & biometric handle`, required: true, completed: false },
        { id: 'chk_4', label: 'Hang door slab and tune 3-axis perimeter gaps (3.5mm reveal)', required: true, completed: false },
        { id: 'chk_5', label: 'Calibrate closing dampeners and test electronic access credentials', required: true, completed: false },
        { id: 'chk_6', label: 'Affix intumescent acoustic weather gasket & customer inspection', required: true, completed: false }
      ],
      financials: {
        doorPrice: booking.doorPrice,
        installationFee: booking.installationFee,
        laborCost: 450,
        bonusAmount: 220,
        bonusStatus: 'pending',
        depositPaid: booking.amountPaidAtShop > 0,
        balancePaid: isPaidInFull
      },
      createdAt: new Date().toISOString()
    };

    this.jobs.update(list => [newJob, ...list]);
    this.saveJobsLocally();
    this.persistJobToBackend(newJob);

    this.createNotification({
      recipientRole: 'manager',
      title: 'New Installation Request Booked by Shop',
      message: `${booking.clientName} booked installation for ${booking.doorModel} at ${booking.siteAddress}. Payment of ₵${booking.amountPaidAtShop.toLocaleString()} recorded at shop counter. Please configure delivery truck & assign available Installer.`,
      type: 'truck_assigned',
      jobId: newId,
      actionLabel: 'Set Up Truck'
    });

    this.createNotification({
      recipientRole: 'account_officer',
      title: 'Shop Counter Payment Received - Audit Required',
      message: `Receipt ${booking.receiptNumber}: ₵${booking.amountPaidAtShop.toLocaleString()} collected at shop counter via ${booking.paymentMethod.toUpperCase()} for ${booking.doorModel}. Please verify and disburse technician site mobilization funds.`,
      type: 'shop_payment_recorded',
      jobId: newId,
      actionLabel: 'Audit & Disburse Funds'
    });

    this.createNotification({
      recipientRole: 'client',
      recipientUserId: newJob.client.id,
      title: 'Door Installation Scheduled with DoorMaster',
      message: `Your installation of ${booking.doorModel} has been scheduled for ${booking.scheduledDate}. Our Operations Manager is currently preparing your delivery truck and technician.`,
      type: 'job_assigned',
      jobId: newId
    });

    this.sendSms({
      recipientRole: 'shop_manager',
      recipientName: 'Shop Attendant',
      triggerEvent: 'booking_created',
      messageText: `DoorMaster SMS: New counter booking Ref: ${newId}. Door: ${booking.doorModel}, Lock: ${booking.lockModel || 'Smart Handle'}, Client: ${booking.clientName} (${booking.clientPhone}), Paid: ₵${booking.amountPaidAtShop.toLocaleString()} (${booking.paymentMethod.toUpperCase()}, Ref: ${booking.receiptNumber}). Forwarded to Operations.`,
      jobId: newId
    });

    this.sendSms({
      recipientRole: 'client',
      recipientPhone: booking.clientPhone,
      recipientName: booking.clientName,
      triggerEvent: 'booking_created',
      messageText: `DoorMaster SMS: Hello ${booking.clientName}, your installation for ${booking.doorModel} with ${booking.lockModel || 'Smart Lock Handle'} is booked for ${booking.scheduledDate}. Payment of ₵${booking.amountPaidAtShop.toLocaleString()} received (Receipt: ${booking.receiptNumber}). Order Ref: ${newId}.`,
      jobId: newId
    });

    this.sendSms({
      recipientRole: 'manager',
      recipientName: 'Operations Manager',
      triggerEvent: 'booking_created',
      messageText: `DoorMaster Alert: New installation booked by Shop for ${booking.clientName} (${booking.doorModel}). Scheduled: ${booking.scheduledDate}. Location: ${booking.siteAddress}. Ref: ${newId}. Please assign an installer.`,
      jobId: newId
    });

    return newJob;
  }

  /**
   * Shop Manager / Operations Manager: Sets up delivery truck, assigns dispatcher & selects available signed-in Installer.
   * Dispatches in-app notifications and SMS with 10-minute review countdowns.
   */
  setupTruckAndAssignTechnician(
    jobId: string, 
    truckData: {
      truckId: string;
      truckPlate: string;
      truckModel: string;
      dispatcherId: string;
      dispatcherName: string;
      dispatcherPhone: string;
      deliveryNotes?: string;
    },
    installerId: string | string[]
  ): void {
    if (!this.currentRoleDefinition().permissions.canAssignInstallers && this.currentRole() !== 'shop_manager' && this.currentRole() !== 'manager') {
      this.alert.warning('Access Restricted', 'Your role is not authorized to setup logistics trucks and assign installers.');
      return;
    }
    const installerIds = Array.isArray(installerId) ? installerId : [installerId];
    const selectedTechs = this.installers().filter(i => installerIds.includes(i.id));
    const leadTech = selectedTechs[0];
    const techNames = selectedTechs.map(t => t.name).join(', ');
    const teamMembers: AssignedInstallerTeamMember[] = selectedTechs.map((t, idx) => ({
      id: t.id,
      name: t.name,
      phone: t.phone,
      role: idx === 0 ? 'lead' : 'assistant',
      avgRating: t.metrics.avgRating
    }));
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const now = new Date().toISOString();
        const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        updatedJob = {
          ...job,
          assignedInstallerId: leadTech ? leadTech.id : installerIds[0],
          assignedInstallerName: techNames || (leadTech ? leadTech.name : 'Assigned Technician'),
          assignedInstallerIds: installerIds,
          assignedInstallerNames: selectedTechs.map(t => t.name),
          assignedInstallers: teamMembers,
          assignedAt: now,
          installerAssignedAt: now,
          installerDeadlineAt: deadline,
          installerAssignmentStatus: 'pending',
          installerAutoAccepted: false,
          dispatcherId: truckData.dispatcherId,
          dispatcherName: truckData.dispatcherName,
          driverAssignmentStatus: 'pending',
          driverAssignedAt: now,
          driverDeadlineAt: deadline,
          driverAutoAccepted: false,
          logisticsTruck: {
            ...truckData,
            assignedAt: now,
            driverAssignedAt: now,
            driverDeadlineAt: deadline,
            cargoChecklistConfirmed: true,
            estimatedDepartureTime: 'Departure scheduled from central depot',
            deliveryNotes: truckData.deliveryNotes || 'Fragile architectural finish. Secure with padded transport blankets.'
          },
          status: 'truck_assigned'
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    this.installers.update(techs => techs.map(t => {
      if (installerIds.includes(t.id)) {
        return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
      }
      return t;
    }));

    this.dispatchers.update(disps => disps.map(d => {
      if (d.id === truckData.dispatcherId) {
        return { ...d, status: 'on_route', currentTripJobId: jobId };
      }
      return d;
    }));

    if (updatedJob) {
      const job = updatedJob;
      this.createNotification({
        recipientRole: 'dispatcher',
        recipientUserId: truckData.dispatcherId,
        title: 'New Delivery Run Assigned (10-Min Action Required)',
        message: `Truck ${truckData.truckPlate}: Load ${job.doorModel} & ${job.lockModel || 'hardware'} for delivery to ${job.client.name} (${job.client.siteAddress}). You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
        type: 'truck_assigned',
        jobId: jobId,
        actionLabel: 'View Manifest & Respond'
      });

      this.sendSms({
        recipientRole: 'dispatcher',
        recipientPhone: truckData.dispatcherPhone,
        recipientName: truckData.dispatcherName,
        triggerEvent: 'driver_assigned',
        messageText: `DoorMaster SMS: Delivery run assigned to truck ${truckData.truckPlate}. Pick up ${job.doorModel} for delivery to ${job.client.name} (${job.client.siteAddress}). Please reject within 10 mins for reassignment, else auto-accepted for you. Ref: ${jobId}.`,
        jobId
      });

      const assigner = this.currentRole() === 'shop_manager' ? 'Shop Manager' : 'Operations Manager';

      selectedTechs.forEach(tech => {
        this.createNotification({
          recipientRole: 'installer',
          recipientUserId: tech.id,
          title: 'New Installation Assigned (10-Min Action Required)',
          message: `${assigner} assigned you to install ${job.doorModel} at ${job.client.siteAddress}. Delivery truck ${truckData.truckPlate} will deliver cargo to site. You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
          type: 'job_assigned',
          jobId: jobId,
          actionLabel: 'Review & Respond'
        });
        this.sendSms({
          recipientRole: 'installer',
          recipientPhone: tech.phone,
          recipientName: tech.name || 'Installer',
          triggerEvent: 'installer_assigned',
          messageText: `DoorMaster SMS: ${assigner} assigned you to install ${job.doorModel} (${jobId}). Scheduled: ${job.scheduledDate} at ${job.client.siteAddress}. Please reject within 10 mins if unavailable, else auto-accepted for you.`,
          jobId
        });
      });

      this.createNotification({
        recipientRole: 'client',
        recipientUserId: job.client.id,
        title: 'Delivery Truck & Installer Assigned',
        message: `Your DoorMaster logistics truck (${truckData.truckPlate}, Driver: ${truckData.dispatcherName}) and technician (${leadTech?.name || 'Technician'}) have been assigned!`,
        type: 'truck_assigned',
        jobId: jobId
      });
    }
  }

  /**
   * Shop Manager / Operations Manager: Assigns single or multiple installers to an installation job.
   */
  assignInstallersByManager(jobId: string, installerIds: string[], notes?: string): void {
    if (!this.currentRoleDefinition().permissions.canAssignInstallers && this.currentRole() !== 'shop_manager' && this.currentRole() !== 'manager') {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!installerIds || installerIds.length === 0) return;
    const selectedTechs = this.installers().filter(i => installerIds.includes(i.id));
    if (selectedTechs.length === 0) return;

    const leadTech = selectedTechs[0];
    const techNames = selectedTechs.map(t => t.name).join(', ');
    const teamMembers: AssignedInstallerTeamMember[] = selectedTechs.map((t, idx) => ({
      id: t.id,
      name: t.name,
      phone: t.phone,
      role: idx === 0 ? 'lead' : 'assistant',
      avgRating: t.metrics.avgRating
    }));

    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        updatedJob = {
          ...job,
          assignedInstallerId: leadTech.id,
          assignedInstallerName: techNames,
          assignedInstallerIds: installerIds,
          assignedInstallerNames: selectedTechs.map(t => t.name),
          assignedInstallers: teamMembers,
          assignedAt: now,
          installerAssignedAt: now,
          installerDeadlineAt: deadline,
          installerAssignmentStatus: 'pending',
          installerAutoAccepted: false,
          status: 'assigned'
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    this.installers.update(techs => techs.map(t => {
      if (installerIds.includes(t.id)) {
        return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
      }
      return t;
    }));

    const assigner = this.currentRole() === 'shop_manager' ? 'Shop Manager' : 'Operations Manager';

    selectedTechs.forEach(tech => {
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: tech.id,
        title: 'New Installation Assigned (10-Min Action Required)',
        message: `${assigner} assigned you to install ${updatedJob?.doorModel} at ${updatedJob?.client.siteAddress}. Scheduled for ${updatedJob?.scheduledDate}. You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
        type: 'job_assigned',
        jobId: jobId,
        actionLabel: 'Review & Respond'
      });

      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: tech.phone,
        recipientName: tech.name,
        triggerEvent: 'installer_assigned',
        messageText: `DoorMaster SMS: ${assigner} assigned you to install ${updatedJob?.doorModel} (${jobId}). Scheduled: ${updatedJob?.scheduledDate} at ${updatedJob?.client.siteAddress}. Please reject within 10 mins if unavailable, else auto-accepted for you.`,
        jobId
      });
    });
  }

  // ============================================================================
  // Door Catalog Management (API-driven)
  // ============================================================================

  addDoor(doorData: Omit<DoorCatalogEntry, 'id' | 'createdAt'>): DoorCatalogEntry {
    const nextNum = Math.floor(100 + Math.random() * 900);
    const newDoor: DoorCatalogEntry = {
      ...doorData,
      id: `DR-${nextNum}`,
      createdAt: new Date().toISOString()
    };

    this.doors.update(list => [newDoor, ...list]);

    this.apiFetch('/api/doors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoor)
    }).catch(err => console.warn('Background door sync error', err));

    this.createNotification({
      recipientRole: 'shop_manager',
      title: 'New Door Added to Catalog',
      message: `${newDoor.name} (${newDoor.modelCode}) has been registered in the catalog with ${newDoor.stockQuantity} units available.`,
      type: 'door_dispatched',
      jobId: newDoor.id,
      actionLabel: 'View Doors Catalog'
    });

    return newDoor;
  }

  updateDoor(id: string, partial: Partial<DoorCatalogEntry>) {
    this.doors.update(list => list.map(door => door.id === id ? { ...door, ...partial } : door));
    this.alert.toastSuccess('Your work has been saved', 'Door specifications & stock synchronized.');

    if (partial.stockQuantity !== undefined) {
      this.apiFetch(`/api/doors/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQuantity: partial.stockQuantity, status: partial.status })
      }).catch(err => console.warn('Stock update sync warning', err));
    }
  }

  deleteDoor(id: string) {
    this.doors.update(list => list.filter(door => door.id !== id));
    this.alert.toastSuccess('Door Deleted', 'Door removed from catalog.');

    this.apiFetch(`/api/doors/${id}`, { method: 'DELETE' })
      .catch(err => console.warn('Delete door sync warning', err));
  }

  // ============================================================================
  // Notification & SMS Helpers
  // ============================================================================

  private createNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const notification: NotificationItem = {
      id,
      recipientRole: notif.recipientRole,
      recipientUserId: notif.recipientUserId,
      title: notif.title,
      message: notif.message,
      type: notif.type as any,
      jobId: notif.jobId,
      timestamp: new Date().toISOString(),
      read: false,
      actionLabel: notif.actionLabel
    };

    this.notifications.update(list => [notification, ...list]);

    this.apiFetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    }).catch(err => console.warn('Notification sync warning:', err));
  }

  private sendSms(sms: {
    recipientRole: RoleType;
    recipientPhone?: string;
    recipientName: string;
    triggerEvent: string;
    messageText: string;
    jobId?: string;
  }) {
    const recipientPhone = sms.recipientPhone || this.userPhones()[sms.recipientRole as keyof UserPhoneDirectory] || '';

    const smsLog: SmsLogEntry = {
      id: `SMS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      recipientPhone,
      recipientRole: sms.recipientRole,
      recipientName: sms.recipientName,
      senderId: 'DoorMaster',
      messageText: sms.messageText,
      triggerEvent: sms.triggerEvent,
      status: 'simulated',
      providerRef: 'SIM-LOG',
      timestamp: new Date().toISOString(),
      jobId: sms.jobId
    };

    this.smsLogs.update(list => [smsLog, ...list]);

    this.apiFetch('/api/sms/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(smsLog)
    }).catch(err => console.warn('SMS log sync warning:', err));
  }

  // ============================================================================
  // Authentication (API-only)
  // ============================================================================

  async signInWithApi(
    email: string,
    password?: string,
    rememberMe = true
  ): Promise<{ success: boolean; message: string; user?: ApiAuthUser }> {
    try {
      const res = await this.apiFetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const responseData = await res.json()
      if (responseData.success && responseData.user) {
        this.applySession(responseData.user, responseData.token || '');
        this.persistSession(responseData.user, responseData.token || '', rememberMe);

        // Refresh the user directory (installers/clients) with the new token.
        await this.loadUsers();
        this.deriveInstallersAndDispatchersFromUsers();

        // Start real-time GPS tracking for tracked roles (installer, dispatcher, manager)
        void this.startGpsTracking();

        return { success: true, message: responseData.message, user: responseData.user };
      }
      return { success: false, message: responseData.message || 'Authentication failed' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Failed connecting to auth API' };
    }
  }

  private persistSession(user: ApiAuthUser, token: string, persistent: boolean): void {
    if (typeof window === 'undefined' || !token) return;
    clearPersistedSession();
    const storage = persistent ? window.localStorage : window.sessionStorage;
    try {
      storage.setItem(STORAGE_KEY_API_USER, JSON.stringify(user));
      storage.setItem(STORAGE_KEY_API_TOKEN, token);
    } catch {
      // Storage may be unavailable; the in-memory session still works.
    }
  }

  async registerWithApi(
    name: string,
    email: string,
    role: RoleType,
    phone: string,
    password?: string,
    rememberMe = true
  ): Promise<{ success: boolean; message: string; user?: ApiAuthUser }> {
    try {
      const res = await this.apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, phone, password })
      });
      const responseData = await res.json()
      if (responseData.success && responseData.user) {
        await this.loadUsers();
        if (responseData.user.status !== 'pending') {
          this.applySession(responseData.user, responseData.token || '');
          this.persistSession(responseData.user, responseData.token || '', rememberMe);
        }
        return { success: true, message: responseData.message, user: responseData.user };
      }
      return { success: false, message: responseData.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Failed connecting to registration API' };
    }
  }

  async updateCurrentUserProfile(data: { name: string; email: string; phone: string; avatarUrl?: string }): Promise<{ success: boolean; message: string }> {
    this.customUserProfile.update(curr => ({ ...(curr || {}), ...data }));

    const user = this.apiUser();
    if (user && this.apiToken()) {
      try {
        const res = await this.apiFetch(`/api/auth/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (res.ok && resData.success && resData.user) {
          this.apiUser.set(resData.user);
          this.persistSession(resData.user, this.apiToken() || '', true);
        }
      } catch (err) {
        console.warn('[Store] Could not persist profile update to API:', err);
      }
    }

    // Update in users list if present
    this.users.update(list => list.map(u => {
      if (u.id === this.currentUser().id || u.email === data.email) {
        return {
          ...u,
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : u.avatarUrl
        };
      }
      return u;
    }));

    // Update in installers if current role is installer
    if (this.currentRole() === 'installer') {
      this.installers.update(list => list.map(i => {
        if (i.id === this.currentUser().id || i.email === data.email) {
          return {
            ...i,
            name: data.name,
            email: data.email,
            phone: data.phone,
            avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : i.avatarUrl
          };
        }
        return i;
      }));
    }

    // Update in dispatchers if current role is dispatcher
    if (this.currentRole() === 'dispatcher') {
      this.dispatchers.update(list => list.map(d => {
        if (d.id === this.currentUser().id) {
          return {
            ...d,
            name: data.name,
            phone: data.phone,
            ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {})
          };
        }
        return d;
      }));
    }

    return { success: true, message: 'Profile updated successfully' };
  }

  signOutApi(): void {
    this.stopGpsTracking();
    this.clearSession();
    // Reload public data now that the token is gone.
    this.loadFromApi();
  }

  // ============================================================================
  // REAL-TIME GPS TRACKING
  // ============================================================================

  /**
   * Starts watching the device's GPS position and publishes updates to the
   * backend so dispatchers/managers can see the user in real time on the map.
   * Only roles that need to be tracked (installer, dispatcher, manager) publish.
   */
  async startGpsTracking(): Promise<void> {
    if (this.isGpsTracking()) return;
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      console.warn('[GPS] Geolocation not available');
      return;
    }

    const user = this.apiUser();
    if (!user) return;

    const trackableRoles = ['installer', 'dispatcher', 'manager', 'account_officer', 'shop_manager'];
    if (!trackableRoles.includes(user.role)) {
      console.log(`[GPS] Role ${user.role} is not tracked`);
      return;
    }

    this.isGpsTracking.set(true);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    };

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude, accuracy, heading, speed } = pos.coords;
        const speedKmh = speed ? +(speed * 3.6).toFixed(1) : null;

        await this.pushLocation({
          latitude,
          longitude,
          accuracyM: accuracy ?? null,
          heading: heading ?? null,
          speedKmh
        });
      },
      (err) => {
        console.warn('[GPS] watchPosition error:', err);
      },
      options
    );

    this.gpsWatchId.set(watchId);

    // Push initial position immediately
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation!.getCurrentPosition(resolve, reject, { timeout: 8000, enableHighAccuracy: true });
      });
      await this.pushLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracyM: pos.coords.accuracy ?? null,
        heading: pos.coords.heading ?? null,
        speedKmh: pos.coords.speed ? +(pos.coords.speed * 3.6).toFixed(1) : null
      });
    } catch {
      // Initial fix failed; watchPosition will retry.
    }

    // Poll for other users' live locations every 15 seconds
    setInterval(() => {
      if (this.isGpsTracking()) {
        void this.loadLiveLocations();
      }
    }, 15000);

    // Initial load of all live locations
    void this.loadLiveLocations();
  }

  /**
   * Stops GPS tracking and marks the user offline.
   */
  stopGpsTracking(): void {
    const watchId = this.gpsWatchId();
    if (watchId !== null && typeof window !== 'undefined') {
      navigator.geolocation.clearWatch(watchId);
      this.gpsWatchId.set(null);
    }
    this.isGpsTracking.set(false);
    void this.markOffline();
  }

  /**
   * Sends a single GPS position update to the backend.
   */
  async pushLocation(coords: {
    latitude: number;
    longitude: number;
    accuracyM?: number | null;
    heading?: number | null;
    speedKmh?: number | null;
  }): Promise<void> {
    const user = this.apiUser();
    if (!user) return;

    try {
      const res = await this.apiFetch('/api/location/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracyM: coords.accuracyM ?? null,
          heading: coords.heading ?? null,
          speedKmh: coords.speedKmh ?? null,
          status: 'online'
        })
      });

      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && responseData.location) {
          this.myLiveLocation.set(responseData.location);
          // Upsert into the live locations list
          this.liveLocations.update(list => {
            const existing = list.findIndex(l => l.userId === responseData.location.userId);
            if (existing >= 0) {
              const next = [...list];
              next[existing] = responseData.location;
              return next;
            }
            return [responseData.location, ...list];
          });
        }
      }
    } catch (err) {
      console.warn('[GPS] Failed pushing location:', err);
    }
  }

  /**
   * Fetch live locations for all tracked users.
   */
  async loadLiveLocations(): Promise<void> {
    if (!this.apiToken()) return;
    try {
      const res = await this.apiFetch('/api/locations/live');
      if (res.ok) {
        const responseData = await res.json()
        if (responseData.success && Array.isArray(responseData.locations)) {
          this.liveLocations.set(responseData.locations);
        }
      }
    } catch (err) {
      console.warn('[GPS] Failed loading live locations:', err);
    }
  }

  /**
   * Mark the current user's live location as offline.
   */
  async markOffline(): Promise<void> {
    const user = this.apiUser();
    if (!user) return;
    try {
      await this.apiFetch('/api/location/offline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      this.myLiveLocation.set(null);
      this.liveLocations.update(list => list.filter(l => l.userId !== user.id));
    } catch {
      // Ignore offline errors
    }
  }

  /**
   * Get the live location for a specific user (used by map popups).
   */
  getLiveLocationForUser(userId: string): LiveLocation | undefined {
    return this.liveLocations().find(l => l.userId === userId);
  }

  // ============================================================================
  // Database Health & Diagnostics
  // ============================================================================

  async checkDbStatus(): Promise<void> {
    this.isDbChecking.set(true);
    try {
      const res = await this.apiFetch('/api/db/status');
      if (res.ok) {
        const responseData = await res.json()
        this.dbStatus.set(responseData.status);
      }
    } catch (err) {
      console.warn('[Store] Could not check DB status:', err);
    } finally {
      this.isDbChecking.set(false);
    }
  }

  // ============================================================================
  // Local persistence helper (jobs only, for optimistic UI updates)
  // ============================================================================

  private saveJobsLocally() {
    // Kept for optimistic UI updates; the authoritative source is MySQL via persistJobToBackend
  }

  /**
   * Update the user phone directory for automated SMS routing.
   */
  updateUserPhones(phones: UserPhoneDirectory) {
    this.userPhones.set(phones);
  }
  /**
   * Update the current user's profile (name, email, phone) via the API.
   * Requires an active authenticated session.
   */



  /**
   * Update the SMS gateway configuration.
   */
  updateSmsGatewayConfig(config: Partial<SmsGatewayConfig>) {
    this.smsGatewayConfig.update(c => ({ ...c, ...config }));
  }

  /**
   * Send a test SMS ping (logged via API).
   */
  async sendTestSmsPing(phone: string, message: string) {
    const smsLog: SmsLogEntry = {
      id: `SMS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      recipientPhone: phone,
      recipientRole: this.currentRole(),
      recipientName: 'Test Recipient',
      senderId: this.smsGatewayConfig().senderId,
      messageText: message,
      triggerEvent: 'test_ping',
      status: 'simulated',
      providerRef: 'SIM-TEST',
      timestamp: new Date().toISOString()
    };

    this.smsLogs.update(list => [smsLog, ...list]);

    try {
      await this.apiFetch('/api/sms/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsLog)
      });
    } catch (err) {
      console.warn('[Store] Test SMS log sync warning:', err);
    }
  }

  /**
   * Shop Manager assigns a dispatch driver to a job.
   */
  assignDispatchDriverByShop(jobId: string, data: {
    dispatcherId: string;
    dispatcherName?: string;
    truckPlate?: string;
    truckModel?: string;
    deliveryNotes?: string;
    estimatedDeparture?: string;
  }) {
    const dispatcher = this.dispatchers().find(d => d.id === data.dispatcherId);
    if (!dispatcher) return;

    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const now = new Date().toISOString();
        const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        updatedJob = {
          ...job,
          dispatcherId: data.dispatcherId,
          dispatcherName: data.dispatcherName || dispatcher.name,
          driverAssignmentStatus: 'pending',
          driverAssignedAt: now,
          driverDeadlineAt: deadline,
          driverAutoAccepted: false,
          logisticsTruck: {
            truckId: data.truckPlate || 'TRK-UNKNOWN',
            truckPlate: data.truckPlate || 'GT-4821-26',
            truckModel: data.truckModel || 'Mercedes-Benz Atego',
            dispatcherId: data.dispatcherId,
            dispatcherName: data.dispatcherName || dispatcher.name,
            dispatcherPhone: dispatcher.phone,
            assignedAt: now,
            driverAssignedAt: now,
            driverDeadlineAt: deadline,
            cargoChecklistConfirmed: true,
            estimatedDepartureTime: data.estimatedDeparture || 'Scheduled',
            deliveryNotes: data.deliveryNotes || ''
          },
          status: 'truck_assigned'
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    this.dispatchers.update(disps => disps.map(d => {
      if (d.id === data.dispatcherId) {
        return { ...d, status: 'on_route', currentTripJobId: jobId };
      }
      return d;
    }));

    if (updatedJob) {
      this.createNotification({
        recipientRole: 'dispatcher',
        recipientUserId: data.dispatcherId,
        title: 'New Delivery Run Assigned (10-Min Action Required)',
        message: `Truck ${data.truckPlate}: Load ${updatedJob.doorModel} for delivery to ${updatedJob.client.name} at ${updatedJob.client.siteAddress}. You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
        type: 'truck_assigned',
        jobId: jobId,
        actionLabel: 'View Manifest & Respond'
      });

      this.sendSms({
        recipientRole: 'dispatcher',
        recipientPhone: dispatcher.phone,
        recipientName: dispatcher.name,
        triggerEvent: 'driver_assigned',
        messageText: `DoorMaster SMS: Delivery run assigned to truck ${data.truckPlate}. Pick up ${updatedJob.doorModel} for delivery to ${updatedJob.client.name}. Reject within 10 mins for reassignment, else auto-accepted for you. Ref: ${jobId}.`,
        jobId
      });
    }
  }

  /**
   * Alias for assignInstallersByManager (single installer).
   */
  assignInstallerByManager(jobId: string, installerId: string): void {
    this.assignInstallersByManager(jobId, [installerId]);
  }

  /**
   * Operations Manager approves an installation job for dispatch.
   */
  approveInstallationByOperations(jobId: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          operationsApproved: true,
          operationsApprovedAt: new Date().toISOString(),
          status: job.status === 'accepted' ? 'approved' : job.status
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    this.createNotification({
      recipientRole: 'installer',
      recipientUserId: updated?.assignedInstallerId || undefined,
      title: 'Installation Approved by Operations',
      message: `Your installation job ${jobId} has been approved for dispatch.`,
      type: 'installer_accepted',
      jobId
    });
  }

  /**
   * Start live motion tracking for a job.
   */
  startLiveMotion(jobId: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return { ...job, motionLiveStarted: true, motionLiveStartedAt: new Date().toISOString() };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);
  }

  /**
   * Toggle technician sign-in status.
   */
  toggleTechnicianSignIn(installerId: string) {
    this.installers.update(list => list.map(i => {
      if (i.id === installerId) {
        return { ...i, isSignedIn: !i.isSignedIn };
      }
      return i;
    }));
  }

  /**
   * Field Installer starts work on site with GPS.
   */
  async installerStartWork(jobId: string, coords: { lat: number; lng: number }) {
    this.clockIn(jobId, coords.lat, coords.lng);
  }

  /**
   * Field Installer completes work on site with GPS.
   */
  async installerCompleteWork(jobId: string, coords: { lat: number; lng: number }) {
    this.clockOut(jobId, 'Work completed with GPS verification');
  }

  /**
   * Landing Page: Submit installation inquiry from public site.
   */
  submitInstallationInquiry(inquiry: Omit<InstallationInquiry, 'id' | 'submittedAt'>): InstallationInquiry {
    const newInquiry: InstallationInquiry = {
      ...inquiry,
      id: `INQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'new',
      submittedAt: new Date().toISOString()
    };

    this.inquiries.update(list => [newInquiry, ...list]);

    this.apiFetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    }).catch(err => console.warn('Inquiry sync warning:', err));

    this.createNotification({
      recipientRole: 'manager',
      title: 'New Installation Inquiry',
      message: `${inquiry.fullName} requested a quote for ${inquiry.doorType} at ${inquiry.siteAddress}.`,
      type: 'job_assigned',
      jobId: newInquiry.id
    });

    this.sendSms({
      recipientRole: 'manager',
      recipientName: 'Operations Manager',
      triggerEvent: 'booking_created',
      messageText: `DoorMaster Alert: New installation inquiry from ${inquiry.fullName} (${inquiry.phone}) for ${inquiry.doorType} at ${inquiry.siteAddress}. Ref: ${newInquiry.id}.`,
      jobId: newInquiry.id
    });

    return newInquiry;
  }

  /**
   * Mark a notification as read.
   */
  async markNotificationRead(notificationId: string) {
    try {
      const res = await this.apiFetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH'
      });
      const responseData = await res.json()
      if (responseData.success) {
        this.notifications.update(list => list.map(n => n.id === notificationId ? { ...n, read: true } : n));
      }
      return responseData.success;
    } catch (err) {
      console.warn('[Store] Failed marking notification read:', err);
      return false;
    }
  }

  /**
   * Mark all notifications as read.
   */
  async markAllNotificationsRead() {
    try {
      const res = await this.apiFetch('/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: this.currentRole() })
      });
      const responseData = await res.json()
      if (responseData.success) {
        this.notifications.update(list => list.map(n => ({ ...n, read: true })));
      }
      return responseData.success;
    } catch (err) {
      console.warn('[Store] Failed marking all notifications read:', err);
      return false;
    }
  }

  /**
   * Trigger live door catalog scrape from doormaster.online via backend.
   */
  async scrapeLiveDoorMasterOnline(): Promise<{ success: boolean; count: number; message: string }> {
    try {
      const res = await this.apiFetch('/api/doors/scrape-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startPage: 1, endPage: 5 })
      });
      const responseData = await res.json()
      if (responseData.success) {
        await this.loadDoorsFromBackend();
        return { success: true, count: responseData.totalDoors || 0, message: responseData.message || 'Scrape completed' };
      }
      return { success: false, count: 0, message: responseData.message || 'Scrape failed' };
    } catch (err) {
      return { success: false, count: 0, message: (err as Error).message };
    }
  }

  /**
   * Trigger deep scrape of all pages to MySQL via backend.
   */
  async scrapeAllPagesFromBackend(startPage: number, endPage: number): Promise<{ success: boolean; count: number; message: string }> {
    try {
      const res = await this.apiFetch('/api/doors/scrape-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startPage, endPage })
      });
      const responseData = await res.json()
      if (responseData.success) {
        await this.loadDoorsFromBackend();
        return { success: true, count: responseData.totalDoors || 0, message: responseData.message || 'Deep scrape completed' };
      }
      return { success: false, count: 0, message: responseData.message || 'Deep scrape failed' };
    } catch (err) {
      return { success: false, count: 0, message: (err as Error).message };
    }
  }

  /**
   * Dispatch Driver accepts or rejects delivery assignment.
   * If rejected within 10 minutes, marked for immediate reassignment.
   */
  respondDriverAssignment(jobId: string, accepted: boolean, reason?: string, proposedSlot?: string) {
    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();

    const currentJob = this.jobs().find(j => j.id === jobId);
    if (!currentJob) return;

    if (accepted) {
      this.jobs.update(list => list.map(job => {
        if (job.id === jobId) {
          updatedJob = {
            ...job,
            driverAssignmentStatus: 'accepted',
            driverRespondedAt: now,
            driverAutoAccepted: false,
            logisticsTruck: job.logisticsTruck ? {
              ...job.logisticsTruck,
              driverAutoAccepted: false,
              driverRespondedAt: now
            } : undefined
          };
          return updatedJob;
        }
        return job;
      }));

      this.saveJobsLocally();
      if (updatedJob) this.persistJobToBackend(updatedJob);

      // In-app notification to Dispatch Driver
      this.createNotification({
        recipientRole: 'dispatcher',
        recipientUserId: currentJob.dispatcherId || undefined,
        title: 'Delivery Run Confirmed & Accepted',
        message: `You confirmed and accepted delivery run for ${currentJob.doorModel} to ${currentJob.client.name}. Manifest activated. SMS sent to Shop & Client.`,
        type: 'driver_accepted',
        jobId: jobId,
        actionLabel: 'View Manifest'
      });

      // In-app notification to Operations Manager
      this.createNotification({
        recipientRole: 'manager',
        title: 'Dispatch Driver Confirmed Delivery Run',
        message: `Driver ${currentJob.dispatcherName || 'Driver'} confirmed and accepted the delivery run for ${currentJob.doorModel} to ${currentJob.client.name}.`,
        type: 'driver_accepted',
        jobId: jobId
      });

      // In-app notification to Client
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: currentJob.client.id,
        title: 'Delivery Run Confirmed',
        message: `Your DoorMaster delivery driver (${currentJob.dispatcherName || 'Driver'}) has accepted the dispatch run for your door.`,
        type: 'truck_assigned',
        jobId: jobId
      });

      // SMS to Manager
      this.sendSms({
        recipientRole: 'manager',
        recipientName: 'Operations Manager',
        triggerEvent: 'driver_accepted',
        messageText: `DoorMaster SMS: Driver ${currentJob.dispatcherName} confirmed run for job ${jobId} (${currentJob.doorModel}). Convoy departure scheduled.`,
        jobId
      });

      this.alert.toastSuccess('Run Accepted', `You confirmed delivery run for ${currentJob.doorModel}.`);

    } else {
      // Driver REJECTED within 10 minutes -> Mark for Reassignment!
      const rejectReason = reason || 'Driver unavailable / vehicle maintenance required';
      const rejectedDriverName = currentJob.dispatcherName || 'Dispatch Driver';
      const rejectedDriverId = currentJob.dispatcherId;

      this.jobs.update(list => list.map(job => {
        if (job.id === jobId) {
          updatedJob = {
            ...job,
            driverAssignmentStatus: 'rejected',
            driverRejectReason: rejectReason,
            driverProposedSlot: proposedSlot,
            driverRespondedAt: now,
            // Reassignment needed: unassign driver so Operations / Shop Manager can reassign
            dispatcherId: null,
            dispatcherName: null,
            logisticsTruck: undefined,
            status: job.assignedInstallerId ? 'assigned' : 'booked_at_shop'
          };
          return updatedJob;
        }
        return job;
      }));

      // Free driver up in fleet list
      if (rejectedDriverId) {
        this.dispatchers.update(disps => disps.map(d => {
          if (d.id === rejectedDriverId) {
            return { ...d, status: 'available', currentTripJobId: null };
          }
          return d;
        }));
      }

      this.saveJobsLocally();
      if (updatedJob) this.persistJobToBackend(updatedJob);

      // In-App Notification to Operations Manager: Urgent Reassignment Required
      this.createNotification({
        recipientRole: 'manager',
        title: 'Driver Rejected - Reassignment Needed',
        message: `Driver ${rejectedDriverName} rejected delivery run for job ${jobId} (${currentJob.doorModel}) within 10-minute window. Reason: "${rejectReason}". Reassignment required.`,
        type: 'driver_rejected',
        jobId: jobId,
        actionLabel: 'Reassign Driver'
      });

      // In-App Notification to Shop Manager
      this.createNotification({
        recipientRole: 'shop_manager',
        title: 'Driver Rejection - Run Reassignment Required',
        message: `Driver ${rejectedDriverName} rejected run for job ${jobId} (${currentJob.doorModel}). Reason: "${rejectReason}". Queued for reassignment.`,
        type: 'driver_rejected',
        jobId: jobId
      });

      // SMS Notification to Operations Manager
      this.sendSms({
        recipientRole: 'manager',
        recipientName: 'Operations Manager',
        triggerEvent: 'driver_rejected',
        messageText: `DoorMaster Urgent SMS: Driver ${rejectedDriverName} rejected run for ${jobId} (${currentJob.doorModel}). Reason: ${rejectReason}. Reassignment required.`,
        jobId
      });

      // In-App Notification to Driver confirming rejection
      this.createNotification({
        recipientRole: 'dispatcher',
        recipientUserId: rejectedDriverId || undefined,
        title: 'Delivery Run Rejected & Reassigned',
        message: `You rejected delivery run for ${jobId}. Operations Manager has been notified for reassignment.`,
        type: 'driver_rejected',
        jobId: jobId
      });

      this.alert.toastWarning('Run Rejected', `Delivery run rejected and returned to Operations queue for reassignment.`);
    }
  }

  /**
   * Automatically accepts a delivery run if 10-minute rejection window has passed.
   */
  autoAcceptDriverAssignment(jobId: string) {
    const job = this.jobs().find(j => j.id === jobId);
    if (!job || job.driverAssignmentStatus !== 'pending' || !job.dispatcherId) return;

    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();

    this.jobs.update(list => list.map(j => {
      if (j.id === jobId) {
        updatedJob = {
          ...j,
          driverAssignmentStatus: 'accepted',
          driverAutoAccepted: true,
          driverRespondedAt: now,
          logisticsTruck: j.logisticsTruck ? {
            ...j.logisticsTruck,
            driverAutoAccepted: true,
            driverRespondedAt: now
          } : undefined
        };
        return updatedJob;
      }
      return j;
    }));

    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    const driver = this.dispatchers().find(d => d.id === job.dispatcherId);
    const driverPhone = job.logisticsTruck?.dispatcherPhone || driver?.phone;
    const driverName = job.dispatcherName || driver?.name || 'Dispatch Driver';

    // In-App Notification to Dispatch Driver
    this.createNotification({
      recipientRole: 'dispatcher',
      recipientUserId: job.dispatcherId,
      title: 'Delivery Run Auto-Accepted (10-Min Window Elapsed)',
      message: `The 10-minute rejection window for delivery run ${job.id} (${job.doorModel} to ${job.client.name}) has elapsed. The run has been automatically accepted for you. Please proceed with cargo loading.`,
      type: 'driver_accepted',
      jobId: job.id,
      actionLabel: 'View Manifest'
    });

    // SMS Notification to Dispatch Driver
    this.sendSms({
      recipientRole: 'dispatcher',
      recipientPhone: driverPhone,
      recipientName: driverName,
      triggerEvent: 'driver_accepted',
      messageText: `DoorMaster SMS: Delivery run for ${job.id} (${job.doorModel}) was AUTO-ACCEPTED after 10 mins without rejection. Assigned to your truck. Please proceed to cargo loading.`,
      jobId: job.id
    });

    // In-App Notification to Operations Manager
    this.createNotification({
      recipientRole: 'manager',
      title: 'Driver Run Auto-Accepted (10-Min Elapsed)',
      message: `Dispatch driver ${driverName} did not reject run ${job.id} (${job.doorModel}) within 10 minutes. Run was auto-accepted by the system.`,
      type: 'driver_accepted',
      jobId: job.id
    });

    // In-App Notification to Client
    this.createNotification({
      recipientRole: 'client',
      recipientUserId: job.client.id,
      title: 'Delivery Run Confirmed',
      message: `Logistics delivery run for your door (${job.doorModel}) has been confirmed and scheduled with driver ${driverName}.`,
      type: 'truck_assigned',
      jobId: job.id
    });
  }

  /**
   * Periodic check: auto-accept any driver assignment where 10-minute window has passed without rejection.
   */
  checkAndAutoAcceptExpiredDriverAssignments() {
    const now = Date.now();
    const pendingJobs = this.jobs().filter(j => 
      j.dispatcherId && 
      j.driverAssignmentStatus === 'pending' && 
      j.driverDeadlineAt
    );

    for (const job of pendingJobs) {
      const deadline = new Date(job.driverDeadlineAt!).getTime();
      if (deadline <= now) {
        this.autoAcceptDriverAssignment(job.id);
      }
    }
  }

  /**
   * Automatically accepts an installer assignment if 10-minute rejection window has passed.
   */
  autoAcceptInstallerAssignment(jobId: string) {
    const job = this.jobs().find(j => j.id === jobId);
    if (!job || job.installerAssignmentStatus !== 'pending' || !job.assignedInstallerId) return;

    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();

    this.jobs.update(list => list.map(j => {
      if (j.id === jobId) {
        updatedJob = {
          ...j,
          installerAssignmentStatus: 'accepted',
          installerAutoAccepted: true,
          installerRespondedAt: now,
          status: (j.status === 'booked_at_shop' || j.status === 'assigned') ? 'assigned' : j.status
        };
        return updatedJob;
      }
      return j;
    }));

    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    const tech = this.installers().find(i => i.id === job.assignedInstallerId);
    const techPhone = tech?.phone;
    const techName = job.assignedInstallerName || tech?.name || 'Technician';

    // In-App Notification to Field Installer
    this.createNotification({
      recipientRole: 'installer',
      recipientUserId: job.assignedInstallerId,
      title: 'Installation Run Auto-Accepted (10-Min Window Elapsed)',
      message: `The 10-minute rejection window for installation ${job.id} (${job.doorModel} for ${job.client.name}) has elapsed. The installation has been automatically accepted for you. Please prepare your tool set and hardware.`,
      type: 'installer_accepted',
      jobId: job.id,
      actionLabel: 'View Work Order'
    });

    // SMS Notification to Field Installer
    this.sendSms({
      recipientRole: 'installer',
      recipientPhone: techPhone,
      recipientName: techName,
      triggerEvent: 'installer_accepted',
      messageText: `DoorMaster SMS: Installation job ${job.id} (${job.doorModel}) was AUTO-ACCEPTED after 10 mins without rejection. Scheduled: ${job.scheduledDate}. Check app for site specs.`,
      jobId: job.id
    });

    // In-App Notification to Shop Manager
    this.createNotification({
      recipientRole: 'shop_manager',
      title: 'Installer Run Auto-Accepted (10-Min Elapsed)',
      message: `Technician ${techName} did not reject installation ${job.id} (${job.doorModel}) within 10 minutes. Job was auto-accepted by the system.`,
      type: 'installer_accepted',
      jobId: job.id
    });

    // In-App Notification to Operations Manager
    this.createNotification({
      recipientRole: 'manager',
      title: 'Installer Run Auto-Accepted (10-Min Elapsed)',
      message: `Technician ${techName} did not reject installation ${job.id} (${job.doorModel}) within 10 minutes. Run was auto-accepted by the system.`,
      type: 'installer_accepted',
      jobId: job.id
    });

    // In-App Notification to Client
    this.createNotification({
      recipientRole: 'client',
      recipientUserId: job.client.id,
      title: 'Technician Confirmed for Installation',
      message: `Your DoorMaster technician (${techName}) has been confirmed for your door installation.`,
      type: 'installer_accepted',
      jobId: job.id
    });
  }

  /**
   * Periodic check: auto-accept any installer assignment where 10-minute window has passed without rejection.
   */
  checkAndAutoAcceptExpiredInstallerAssignments() {
    const now = Date.now();
    const pendingJobs = this.jobs().filter(j => 
      j.assignedInstallerId && 
      j.installerAssignmentStatus === 'pending' && 
      j.installerDeadlineAt
    );

    for (const job of pendingJobs) {
      const deadline = new Date(job.installerDeadlineAt!).getTime();
      if (deadline <= now) {
        this.autoAcceptInstallerAssignment(job.id);
      }
    }
  }

  /**
   * Add an installer to a job's team.
   */
  addInstallerToJob(jobId: string, installerId: string) {
    const installer = this.installers().find(i => i.id === installerId);
    if (!installer) return;

    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const existingIds = job.assignedInstallerIds && job.assignedInstallerIds.length > 0
          ? job.assignedInstallerIds
          : (job.assignedInstallerId ? [job.assignedInstallerId] : []);
        if (existingIds.includes(installerId)) return job;

        const newIds = [...existingIds, installerId];
        const techs = this.installers().filter(i => newIds.includes(i.id));
        const leadTech = techs[0];
        const teamMembers: AssignedInstallerTeamMember[] = techs.map((t, idx) => ({
          id: t.id,
          name: t.name,
          phone: t.phone,
          role: idx === 0 ? 'lead' : 'assistant',
          avgRating: t.metrics.avgRating
        }));

        updatedJob = {
          ...job,
          assignedInstallerId: leadTech?.id || installerId,
          assignedInstallerName: techs.map(t => t.name).join(', '),
          assignedInstallerIds: newIds,
          assignedInstallerNames: techs.map(t => t.name),
          assignedInstallers: teamMembers,
          assignedAt: job.assignedAt || now,
          installerAssignedAt: job.installerAssignedAt || now,
          installerDeadlineAt: job.installerDeadlineAt || deadline,
          installerAssignmentStatus: job.installerAssignmentStatus || 'pending',
          installerAutoAccepted: job.installerAutoAccepted ?? false,
          status: (job.status === 'draft' || job.status === 'booked_at_shop') ? 'assigned' : job.status
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    const assigner = this.currentRole() === 'shop_manager' ? 'Shop Manager' : 'Operations Manager';

    this.createNotification({
      recipientRole: 'installer',
      recipientUserId: installerId,
      title: 'Added to Installation Team (10-Min Action Required)',
      message: `${assigner} added you to the installation team for ${updatedJob?.doorModel || 'job'} at ${updatedJob?.client.siteAddress || 'site'}. You have 10 minutes to reject for reassignment, otherwise auto-accepted for you.`,
      type: 'job_assigned',
      jobId,
      actionLabel: 'Review & Respond'
    });

    this.sendSms({
      recipientRole: 'installer',
      recipientPhone: installer.phone,
      recipientName: installer.name,
      triggerEvent: 'installer_assigned',
      messageText: `DoorMaster SMS: ${assigner} assigned you to installation ${jobId} (${updatedJob?.doorModel || 'Door'}). Please reject within 10 mins if unavailable, else auto-accepted for you.`,
      jobId
    });
  }

  /**
   * Remove an installer from a job's team.
   */
  removeInstallerFromJob(jobId: string, installerId: string) {
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const existingIds = job.assignedInstallerIds && job.assignedInstallerIds.length > 0
          ? job.assignedInstallerIds
          : (job.assignedInstallerId ? [job.assignedInstallerId] : []);
        if (!existingIds.includes(installerId)) return job;

        const newIds = existingIds.filter(id => id !== installerId);
        if (newIds.length === 0) {
          updatedJob = {
            ...job,
            assignedInstallerId: null,
            assignedInstallerName: null,
            assignedInstallerIds: [],
            assignedInstallerNames: [],
            assignedInstallers: [],
            installerAssignmentStatus: 'pending',
            status: job.status === 'assigned' ? 'booked_at_shop' : job.status
          };
          return updatedJob;
        }

        const techs = this.installers().filter(i => newIds.includes(i.id));
        const leadTech = techs[0];
        const teamMembers: AssignedInstallerTeamMember[] = techs.map((t, idx) => ({
          id: t.id,
          name: t.name,
          phone: t.phone,
          role: idx === 0 ? 'lead' : 'assistant',
          avgRating: t.metrics.avgRating
        }));

        updatedJob = {
          ...job,
          assignedInstallerId: leadTech?.id || newIds[0],
          assignedInstallerName: techs.map(t => t.name).join(', '),
          assignedInstallerIds: newIds,
          assignedInstallerNames: techs.map(t => t.name),
          assignedInstallers: teamMembers
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);
  }

  /**
   * Account Officer verifies shop payment for a job.
   */
  verifyShopPayment(jobId: string, notes?: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId && job.shopBooking) {
        return {
          ...job,
          shopBooking: {
            ...job.shopBooking,
            accountantVerified: true,
            accountantVerifiedAt: new Date().toISOString(),
            accountantNotes: notes || 'Payment verified'
          }
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    this.createNotification({
      recipientRole: 'shop_manager',
      title: 'Shop Payment Verified',
      message: `Payment for job ${jobId} (${updated?.doorModel}) has been verified by Accounts.`,
      type: 'shop_payment_recorded',
      jobId
    });
  }

  /**
   * Account Officer dispatches technician site mobilization funds.
   */
  dispatchTechnicianSiteFunds(jobId: string, data: { amount: number; purpose?: string; transactionRef?: string }) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          technicianSiteFunds: {
            ...job.technicianSiteFunds,
            amount: data.amount,
            purpose: data.purpose || 'Site visit travel allowance & smart lock installation kit stipend',
            status: 'dispatched',
            dispatchedAt: new Date().toISOString(),
            transactionRef: data.transactionRef || `MOMO-TRX-${Date.now()}`,
            disbursedToTechnicianId: job.assignedInstallerId || undefined,
            disbursedToTechnicianName: job.assignedInstallerName || undefined
          }
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    this.createNotification({
      recipientRole: 'installer',
      recipientUserId: updated?.assignedInstallerId || undefined,
      title: 'Site Mobilization Funds Dispatched',
      message: `₵${data.amount} site funds have been dispatched for job ${jobId} (${updated?.doorModel}).`,
      type: 'site_funds_dispatched',
      jobId
    });
  }

  /**
   * Dispatcher marks cargo as delivered on site.
   */
  markDeliveredByDriver(jobId: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'delivered_on_site'
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    this.createNotification({
      recipientRole: 'client',
      recipientUserId: updated?.client.id || undefined,
      title: 'Door Delivered On Site',
      message: `Your door has been delivered to site by the dispatch driver.`,
      type: 'door_delivered_on_site',
      jobId
    });

    this.createNotification({
      recipientRole: 'installer',
      recipientUserId: updated?.assignedInstallerId || undefined,
      title: 'Door Delivered to Site',
      message: `The delivery driver has dropped off ${updated?.doorModel} at ${updated?.client.siteAddress}.`,
      type: 'door_dispatched',
      jobId
    });
  }

  /**
   * Dispatcher updates trip stage for a job.
   */
  updateDispatcherTripStage(jobId: string, stage: string) {
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          notes: (job.notes || '') + ` | Trip stage: ${stage} at ${new Date().toISOString()}`
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    this.dispatchers.update(disps => disps.map(d => {
      if (d.currentTripJobId === jobId) {
        return { ...d, status: stage === 'delivered_cargo' ? 'available' : 'on_route' };
      }
      return d;
    }));
  }
}
