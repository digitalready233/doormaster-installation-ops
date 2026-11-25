import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { 
  ApiAuthUser,
  AppUser,
  AssignedInstallerTeamMember,
  BonusCriteriaConfig,
  ClientRecord, 
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
  GhanaPostLocation,
  ShopBookingDetails,
  ShopLocationSettings,
  SmsGatewayConfig,
  SmsLogEntry,
  UserPhoneDirectory
} from '../models/installation.model';

import { AlertService } from './alert.service';

const STORAGE_KEY_API_USER = 'dm_installation_api_user_v1';
const STORAGE_KEY_API_TOKEN = 'dm_installation_api_token_v1';
const STORAGE_KEY_IMPERSONATION = 'dm_impersonation_session_v1';
export const STORAGE_KEY_CROSS_PORTAL_SYNC = 'doormaster_cross_portal_sync';

export type SyncEntity = 'jobs' | 'users' | 'doors' | 'roles' | 'teams' | 'clients' | 'branches' | 'notifications' | 'all';

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
    managerName: 'Kofi Boateng',
    managerEmail: 'shop.obeyeyie@doormaster.online',
    isPrimary: true
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
    managerName: 'Yaw Antwi',
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
    managerName: 'Kwabena Agyeman',
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
    managerName: 'Akua Darko',
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
    managerName: 'Kwame Appiah',
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
    managerName: 'Ama Serwaa',
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
    managerName: 'Ebenezer Quaye',
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
    managerName: 'Daniel Asare',
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
    managerName: 'Francis Mensah',
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
    managerName: 'Osei Tutu',
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
    managerName: 'Kojo Baidoo',
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
    managerName: 'Priscilla Kyei',
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
    managerName: 'Nathaniel Tagoe',
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
    managerName: 'Baffour Gyan',
    managerEmail: 'shop.kronum@doormaster.online',
    isPrimary: false
  }
];

export const DOORMASTER_WAREHOUSES: ShopLocationSettings[] = [
  {
    id: 'dm-warehouse-sapeiman',
    shopName: 'Sapeiman Warehouse',
    branchCode: 'DM-WH-SAP',
    address: 'Accra–Nsawam Highway, Sapeiman, Amasaman',
    landmark: 'Sapeiman Main Logistics Hub',
    city: 'Sapeiman',
    region: 'Greater Accra',
    phone: '0542745222',
    email: 'warehouse.sapeiman@doormaster.online',
    latitude: 5.756500,
    longitude: -0.322800,
    dispatchRadiusKm: 60.0,
    operatingHours: 'Mon - Sat: 07:00 - 19:00',
    managerName: 'Sapeiman Warehouse Control',
    isPrimary: false
  },
  {
    id: 'dm-warehouse-ahinsan',
    shopName: 'Ahinsan Warehouse',
    branchCode: 'DM-WH-AHN',
    address: 'Ahinsan Industrial Hub, Kumasi',
    landmark: 'Ahinsan Logistics Depot',
    city: 'Kumasi',
    region: 'Ashanti',
    phone: '0535829827',
    email: 'warehouse.ahinsan@doormaster.online',
    latitude: 6.686361,
    longitude: -1.623972,
    dispatchRadiusKm: 75.0,
    operatingHours: 'Mon - Sat: 07:30 - 18:00',
    managerName: 'Ahinsan Warehouse Control',
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
  readonly canViewDoorPrices = computed<boolean>(() => {
    const role = this.currentRole();
    return role === 'admin' || role === 'account_officer';
  });

  formatDoorColumnLabel(job: InstallationJob): string {
    const doors = job.doors;
    if (doors && doors.length > 0) {
      const totalCount = doors.reduce((sum, d) => sum + (d.quantity || 1), 0);
      if (doors.length > 1 || totalCount > 1) {
        return 'Multiple Doors';
      }
      return doors[0].doorModel || job.doorModel;
    }
    if (/^\d+\s+doors?\b/i.test((job.doorModel || '').trim())) {
      return 'Multiple Doors';
    }
    return job.doorModel;
  }
  readonly currentInstallerId = signal<string | null>(null);
  readonly currentClientId = signal<string | null>(null);
  readonly currentDispatcherId = signal<string | null>(null);

  // Temporary Session Storage Impersonation State
  readonly impersonationSession = signal<ImpersonationSession | null>(readPersistedImpersonation());
  readonly isImpersonating = computed(() => !!this.impersonationSession());
  readonly originalUser = computed(() => this.impersonationSession()?.originalUser ?? null);
  readonly originalRole = computed<RoleType>(() => this.impersonationSession()?.originalRole ?? this.currentRole());


  // Predefined System Roles & dynamic custom roles with fixed base permissions & configurable extra features
  readonly roles = signal<RoleDefinition[]>(this.initializeRoles());

  private initializeRoles(): RoleDefinition[] {
    const defaultRoles: RoleDefinition[] = [
      {
        id: 'admin',
        name: 'System Administrator',
        label: 'Admin',
        description: 'Super-user control: all resources, user authorization, role governance, system settings, and full operational capabilities.',
        isSystem: true,
        color: 'purple',
        icon: 'admin_panel_settings',
        permissions: {
          canCreateJobs: true,
          canAssignInstallers: true,
          canDispatchDoors: true,
          canClockInOut: true,
          canUploadPhotos: true,
          canSignVerification: true,
          canApproveBonuses: true,
          canViewFinancials: true,
          canManageRoles: true
        },
        extraFeatures: ['export_reports', 'audit_logs', 'sms_gateway', 'branch_registry', 'catalog_scraper', 'fleet_broadcast', 'quality_override', 'multi_branch']
      },
      {
        id: 'manager',
        name: 'Manager',
        label: 'Manager',
        description: 'Operations oversight: job dispatch, installer assignments, bonus threshold management & approvals.',
        isSystem: true,
        color: 'slate',
        icon: 'shield_person',
        permissions: {
          canCreateJobs: true,
          canAssignInstallers: true,
          canDispatchDoors: true,
          canClockInOut: false,
          canUploadPhotos: true,
          canSignVerification: false,
          canApproveBonuses: true,
          canViewFinancials: true,
          canManageRoles: false
        },
        extraFeatures: ['export_reports', 'branch_registry', 'catalog_scraper', 'fleet_broadcast', 'quality_override', 'multi_branch']
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
        },
        extraFeatures: []
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
        },
        extraFeatures: []
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
        },
        extraFeatures: ['export_reports', 'multi_branch']
      },
      {
        id: 'shop_manager',
        name: 'Shop Attendant',
        label: 'Shop Attendant',
        description: 'Workshop branch: book counter door installations, record customer payments, select store dispatchers, and dispatch doors to installation site.',
        isSystem: true,
        color: 'cyan',
        icon: 'storefront',
        permissions: {
          canCreateJobs: true,
          canAssignInstallers: false,
          canDispatchDoors: true,
          canClockInOut: false,
          canUploadPhotos: true,
          canSignVerification: false,
          canApproveBonuses: false,
          canViewFinancials: true,
          canManageRoles: false
        },
        extraFeatures: ['branch_registry', 'catalog_scraper']
      },
      {
        id: 'dispatcher',
        name: 'Driver',
        label: 'Driver',
        description: 'Fleet logistics: verify cargo at shop, drive transport truck to customer site, deliver doors & locks, and handover to client/installer.',
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
        },
        extraFeatures: ['fleet_broadcast', 'branch_registry']
      }
    ];

    if (typeof window === 'undefined') return defaultRoles;
    try {
      const stored = window.localStorage.getItem('doormaster_roles');
      if (!stored) return defaultRoles;
      const parsed = JSON.parse(stored) as RoleDefinition[];
      if (!Array.isArray(parsed) || parsed.length === 0) return defaultRoles;
      
      const roleMap = new Map<string, RoleDefinition>();
      defaultRoles.forEach(d => roleMap.set(d.id, { ...d }));
      parsed.forEach(p => {
        if (roleMap.has(p.id)) {
          const sys = roleMap.get(p.id)!;
          roleMap.set(p.id, {
            ...sys,
            // Core permissions are ALWAYS fixed from default system definition; only extraFeatures and display can be updated
            extraFeatures: Array.isArray(p.extraFeatures) ? p.extraFeatures : sys.extraFeatures
          });
        } else {
          // Custom user-defined role
          roleMap.set(p.id, p);
        }
      });
      return Array.from(roleMap.values());
    } catch {
      return defaultRoles;
    }
  }

  // Bonus Rules Engine
  readonly bonusRules = signal<BonusCriteriaConfig>({
    baseBonusStandardDoor: 95,
    baseBonusArchitecturalDoor: 160,
    ratingBonusMultiplier: 1.25,
    onTimeBonusAmount: 40,
    cleanPhotoBonusAmount: 25
  });

  // Installers Directory (derived from API users with role 'installer' + synced teams)
  readonly installers = signal<InstallerProfile[]>([]);

  // Authoritative Installation Teams synced from MySQL via /api/teams
  readonly installerTeams = signal<InstallerTeam[]>([]);
  private readonly dbTeams = signal<InstallerTeam[]>([]);
  readonly hasSyncedTeamsFromApi = signal<boolean>(false);

  // Logistics Dispatchers & Delivery Drivers (derived from API users with role 'dispatcher', 1 per branch)
  readonly dispatchers = signal<DispatcherProfile[]>([]);

  // Delivery Truck Fleet (operational reference data)
  readonly trucks = signal<{ id: string; plate: string; model: string; capacity: string; status: 'available' | 'in_transit' | 'maintenance' }[]>([
    { id: 'TRK-01', plate: 'GT-4821-26', model: 'Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler', capacity: '3.5 Tons (Handles Grand Villa Doors)', status: 'available' },
    { id: 'TRK-02', plate: 'GN-1904-25', model: 'Isuzu NPR Enclosed Weatherproof Cargo Hauler', capacity: '2.8 Tons (Acoustic & Interior Sets)', status: 'available' },
    { id: 'TRK-03', plate: 'GE-7720-26', model: 'Toyota Dyna Rapid Response Van with Hydraulic Lift', capacity: '1.8 Tons (Locks & Hardware Packs)', status: 'available' },
    { id: 'TRK-04', plate: 'GW-3310-26', model: 'Ford Transit High-Roof Architectural Carrier', capacity: '2.2 Tons', status: 'available' }
  ]);

  // Live real-time 1-second synchronization tick for 10-minute countdowns across all portals
  readonly nowTick = signal<number>(Date.now());

  // Installation Jobs (live from MySQL via /api/jobs)
  readonly jobs = signal<InstallationJob[]>([]);

  // Normalized Clients Directory (live from MySQL via /api/clients)
  readonly clients = signal<ClientRecord[]>([]);

  // Notifications (live from MySQL via /api/notifications)
  readonly notifications = signal<NotificationItem[]>([]);

  // Customer Installation Inquiries from Landing Page (live from MySQL via /api/inquiries)
  readonly inquiries = signal<InstallationInquiry[]>([]);

  // Door Inventory Catalog (live from MySQL via /api/doors)
  readonly doors = signal<DoorCatalogEntry[]>([]);

  // User verified mobile phones for automated SMS routing
  readonly userPhones = signal<UserPhoneDirectory>({
    admin: '+233 24 100 0000',
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

  // Persisted SMS opt-out (unchecked) user IDs — all users are selected (enabled) by default
  readonly smsMutedUserIds = signal<Set<string>>(this.readMutedSmsUserIds());

  private readMutedSmsUserIds(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = window.localStorage.getItem('dm_sms_muted_user_ids_v1');
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? new Set(parsed.map(String)) : new Set();
    } catch {
      return new Set();
    }
  }

  private persistMutedSmsUserIds(ids: Set<string>) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('dm_sms_muted_user_ids_v1', JSON.stringify(Array.from(ids)));
    } catch {
      // Ignore storage write error
    }
  }

  isUserSmsEnabled(userId: string): boolean {
    return !this.smsMutedUserIds().has(userId);
  }

  setUserSmsEnabled(userId: string, enabled: boolean) {
    this.smsMutedUserIds.update(prev => {
      const next = new Set(prev);
      if (enabled) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      this.persistMutedSmsUserIds(next);
      return next;
    });
  }

  setRoleSmsEnabled(roleId: string, enabled: boolean) {
    const roleUsers = this.users().filter(u => u.role === roleId);
    this.smsMutedUserIds.update(prev => {
      const next = new Set(prev);
      for (const u of roleUsers) {
        if (enabled) {
          next.delete(u.id);
        } else {
          next.add(u.id);
        }
      }
      this.persistMutedSmsUserIds(next);
      return next;
    });
  }

  isRoleAllSmsEnabled(roleId: string): boolean {
    const roleUsers = this.users().filter(u => u.role === roleId);
    return roleUsers.length > 0 && roleUsers.every(u => this.isUserSmsEnabled(u.id));
  }

  isRoleSomeSmsEnabled(roleId: string): boolean {
    const roleUsers = this.users().filter(u => u.role === roleId);
    return roleUsers.some(u => this.isUserSmsEnabled(u.id)) && !this.isRoleAllSmsEnabled(roleId);
  }

  // DoorMaster Workshop Branches Directory (all 11 active branches)
  readonly branches = signal<ShopLocationSettings[]>(DEFAULT_DOORMASTER_BRANCHES);
  readonly warehouses = signal<ShopLocationSettings[]>(DOORMASTER_WAREHOUSES);

  readonly allWarehouses = computed<ShopLocationSettings[]>(() => {
    const base = [...this.warehouses()];
    const existingNames = new Set(base.map(w => w.shopName.toLowerCase()));
    for (const door of this.doors()) {
      const sup = (door.supplierOrWorkshop || '').trim();
      if (sup && sup.toLowerCase().includes('warehouse') && !existingNames.has(sup.toLowerCase())) {
        existingNames.add(sup.toLowerCase());
        base.push({
          id: `dm-wh-${sup.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          shopName: sup,
          branchCode: 'DM-WH-EXT',
          address: sup,
          city: 'Accra',
          region: 'Greater Accra',
          phone: '0542745222',
          email: 'warehouse@doormasterops.com',
          latitude: 5.632,
          longitude: -0.098,
          dispatchRadiusKm: 50,
          operatingHours: 'Mon - Sat: 08:00 - 18:00',
          managerName: 'Warehouse Dispatch'
        });
      }
    }
    return base;
  });

  // Shop Manager Workshop Location & Settings (active selected branch)
  readonly shopLocation = signal<ShopLocationSettings>(DEFAULT_DOORMASTER_BRANCHES[0]);

  // API Auth State
  readonly apiUser = signal<ApiAuthUser | null>(null);
  readonly apiToken = signal<string | null>(null);
  readonly isAuthenticated = computed(() => !!this.apiUser() && !!this.apiToken());

  // Default verified persona profiles for demo & fallback
  private readonly defaultPersonas: Record<string, ApiAuthUser> = {
    admin: {
      id: 'USR-ADM-01',
      name: 'Alexander Cross',
      email: 'admin@doormasterops.com',
      role: 'admin',
      phone: '+233 24 555 0100',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: '2026-01-10T08:00:00Z'
    },
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
      shopId: 'dm-branch-obeyeyie',
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
      shopId: 'dm-branch-obeyeyie',
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
        shopId: t.shopId ?? null,
        avatarUrl: t.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: (t.status as any) || 'active',
        createdAt: t.createdAt || new Date().toISOString()
      };
    }

    const custom = this.customUserProfile();
    const api = this.apiUser();
    const role = this.currentRole();
    const fallback = this.defaultPersonas[role] || this.defaultPersonas['manager'];

    let base: ApiAuthUser = (api && api.role === role) ? api : fallback;

    if (!api || api.role !== role) {
      if (role === 'installer' && this.currentInstallerId()) {
        const instId = this.currentInstallerId();
        const dirUser = this.users().find(u => u.id === instId && u.role === 'installer');
        const instProf = this.installers().find(i => i.id === instId);
        if (dirUser) {
          base = {
            id: dirUser.id,
            name: dirUser.name,
            email: dirUser.email,
            role: 'installer',
            phone: dirUser.phone || fallback.phone,
            shopId: dirUser.shopId ?? null,
            avatarUrl: dirUser.avatarUrl || fallback.avatarUrl,
            status: (dirUser.status as any) || 'active',
            createdAt: dirUser.createdAt || fallback.createdAt
          };
        } else if (instProf) {
          base = {
            id: instProf.id,
            name: instProf.name,
            email: instProf.email || fallback.email,
            role: 'installer',
            phone: instProf.phone || fallback.phone,
            shopId: null,
            avatarUrl: instProf.avatarUrl || fallback.avatarUrl,
            status: 'active',
            createdAt: fallback.createdAt
          };
        }
      } else if (role === 'dispatcher' && this.currentDispatcherId()) {
        const dispId = this.currentDispatcherId();
        const dirUser = this.users().find(u => u.id === dispId && u.role === 'dispatcher');
        const dispProf = this.dispatchers().find(d => d.id === dispId);
        if (dirUser) {
          base = {
            id: dirUser.id,
            name: dirUser.name,
            email: dirUser.email,
            role: 'dispatcher',
            phone: dirUser.phone || fallback.phone,
            shopId: dirUser.shopId ?? null,
            avatarUrl: dirUser.avatarUrl || fallback.avatarUrl,
            status: (dirUser.status as any) || 'active',
            createdAt: dirUser.createdAt || fallback.createdAt
          };
        } else if (dispProf) {
          base = {
            id: dispProf.id,
            name: dispProf.name,
            email: dispProf.email || fallback.email,
            role: 'dispatcher',
            phone: dispProf.phone || fallback.phone,
            shopId: dispProf.shopId ?? null,
            avatarUrl: dispProf.avatarUrl || fallback.avatarUrl,
            status: 'active',
            createdAt: fallback.createdAt
          };
        }
      }
    }

    if (!custom) return base;

    return {
      ...base,
      name: custom.name !== undefined ? custom.name : base.name,
      email: custom.email !== undefined ? custom.email : base.email,
      phone: custom.phone !== undefined ? custom.phone : base.phone,
      shopId: custom.shopId !== undefined ? custom.shopId : base.shopId,
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
  readonly isNetworkOnline = signal<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  readonly gpsAccuracyM = signal<number | null>(null);
  readonly gpsError = signal<string | null>(null);
  readonly gpsPermissionState = signal<'prompt' | 'granted' | 'denied' | 'unsupported' | 'unknown'>('unknown');
  readonly gpsCheckSettled = signal<boolean>(false);
  readonly needsLocationPrompt = computed<boolean>(() => {
    const role = this.currentRole();
    if (role !== 'installer' && role !== 'dispatcher') return false;
    const perm = this.gpsPermissionState();
    if (perm === 'denied' || perm === 'unsupported') return true;
    if (this.myLiveLocation()) return false;
    if (perm === 'prompt') return true;
    return this.gpsCheckSettled() && (!!this.gpsError() || !this.isGpsTracking());
  });
  readonly myOnlineStatus = computed<'online' | 'offline'>(() => {
    if (!this.isNetworkOnline()) return 'offline';
    const role = this.currentRole();
    if (role !== 'installer' && role !== 'dispatcher') {
      return 'online';
    }
    const live = this.myLiveLocation();
    if (live?.status === 'offline') return 'offline';
    return this.isGpsTracking() || !!live ? 'online' : 'offline';
  });
  private gpsPollTimer: ReturnType<typeof setInterval> | null = null;
  readonly isAdmin = computed(() => this.currentRole() === 'admin' || this.apiUser()?.role === 'admin');
  readonly isManager = computed(() => this.currentRole() === 'manager' || this.apiUser()?.role === 'manager' || this.isAdmin());

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

  /** Shop Managers never have access to select or assign installers. */
  canCurrentRoleAssignInstallers(): boolean {
    const role = this.currentRole();
    if (role === 'shop_manager') return false;
    return role === 'admin' || role === 'manager' || !!this.currentRoleDefinition()?.permissions.canAssignInstallers;
  }

  /** Dispatch driver selection belongs strictly to the Shop Manager portal (hidden from Operations Manager). */
  canCurrentRoleSelectDispatcher(): boolean {
    return this.currentRole() === 'shop_manager';
  }

  /** Checks if at least one installer assigned to the job has accepted or auto-accepted their assignment. */
  hasJobAcceptedInstallers(job: InstallationJob): boolean {
    if (job.installerAssignmentStatus === 'accepted' || job.installerAutoAccepted) {
      return true;
    }
    if (job.assignedInstallers && job.assignedInstallers.length > 0) {
      return job.assignedInstallers.some(m => m.status === 'accepted' || m.autoAccepted);
    }
    return false;
  }

  /** Checks if the current shop manager created the job or is responsible for its shop branch. */
  canShopManagerAssignDriver(job: InstallationJob): boolean {
    if (!this.canCurrentRoleSelectDispatcher()) return false;
    const curUser = this.currentUser();
    const branch = this.managerBranch();
    const branchId = branch ? String(branch.id ?? '') : '';
    const resolvedShop = this.getJobBranch(job);
    const resolvedId = resolvedShop ? String(resolvedShop.id ?? '') : '';

    if (job.createdByUserId && curUser.id && job.createdByUserId === curUser.id) return true;
    if (branchId && resolvedId && branchId === resolvedId) return true;
    if (branch?.branchCode && resolvedShop?.branchCode && branch.branchCode === resolvedShop.branchCode) return true;
    if (!branchId && !job.createdByUserId) return true;
    return false;
  }

  private normalizeNotificationForManager(n: NotificationItem): NotificationItem {
    if (n.recipientRole !== 'manager') return n;

    let title = n.title || '';
    let message = n.message || '';
    let actionLabel = n.actionLabel;

    if (actionLabel && /assign\s+team|set\s*up\s*truck|select\s+installer/i.test(actionLabel)) {
      actionLabel = 'Select Team';
    } else if (actionLabel && /reassign\s+driver|select\s+dispatcher/i.test(actionLabel)) {
      actionLabel = undefined;
    }

    title = title
      .replace(/Assign\s+Installation\s+Team\s*&\s*Truck/gi, 'Select Installation Team')
      .replace(/Driver\s+Rejected\s*-\s*Reassignment\s+Needed/gi, 'Dispatch Driver Rejected Delivery Run');

    message = message
      .replace(/Please\s+configure\s+delivery\s+truck\s*&\s*assign\s+available\s+Installer\.?/gi, 'Please select an Installation Team (Lead + Assistants).')
      .replace(/Please\s+assign\s+Installation\s+Team\s*\(Lead\s*\+\s*Assistants\)\s*and\s+delivery\s+truck\.?/gi, 'Please select an Installation Team (Lead + Assistants).')
      .replace(/Reassignment\s+required\.$/i, 'Shop Manager has been notified to select another dispatcher.');

    return {
      ...n,
      title,
      message,
      actionLabel
    };
  }

  private normalizeNotificationForShopManager(n: NotificationItem): NotificationItem {
    if (n.recipientRole !== 'shop_manager') return n;

    let title = n.title || '';
    let message = n.message || '';
    let actionLabel = n.actionLabel;

    if (actionLabel && /installer|team|driver/i.test(actionLabel)) {
      actionLabel = 'Select Dispatcher';
    }

    if (/installer\s+rejection/i.test(title) || /queued\s+for\s+shop\s+manager\s+reassignment/i.test(message)) {
      title = 'Select Dispatcher for Installation Order';
      message = message
        .replace(/Queued for Shop Manager reassignment\.?/gi, 'Please select a store dispatcher for delivery.')
        .replace(/installer\s+reassignment/gi, 'dispatcher selection');
      actionLabel = 'Select Dispatcher';
    }

    if (/(select|assign)\s+(an?\s+)?installer/i.test(title)) {
      title = title.replace(/(select|assign)\s+(an?\s+)?installer/gi, 'Select Dispatcher');
      actionLabel = actionLabel || 'Select Dispatcher';
    }

    if (/(select|assign)\s+(an?\s+)?installer/i.test(message)) {
      message = message.replace(/(select|assign)\s+(an?\s+)?installer/gi, 'select a dispatcher');
      actionLabel = actionLabel || 'Select Dispatcher';
    }

    return {
      ...n,
      title,
      message,
      actionLabel
    };
  }

  readonly unreadNotificationsCount = computed(() => {
    return this.roleNotifications().filter(n => !n.read).length;
  });

  readonly roleNotifications = computed(() => {
    const seen = new Set<string>();
    const result: NotificationItem[] = [];

    for (const raw of this.notifications()) {
      if (!this.isNotificationVisibleToCurrentRole(raw)) continue;

      let n = raw;
      if (this.currentRole() === 'shop_manager') {
        n = this.normalizeNotificationForShopManager(raw);
      } else if (this.currentRole() === 'manager') {
        n = this.normalizeNotificationForManager(raw);
      }

      // Guarantee each installer / user receives at most 1 notification per job + event type + title
      const dedupKey = `${n.recipientRole}|${n.recipientUserId || ''}|${n.jobId || ''}|${n.type}|${n.title}`;
      if (seen.has(dedupKey)) continue;
      seen.add(dedupKey);
      result.push(n);
    }

    return result;
  });

  readonly dismissedReassignmentJobIds = signal<string[]>([]);
  readonly activeReassignmentPopupJobId = signal<string | null>(null);

  /**
   * Automatically surfaces a job that was declined by an installer so the Operations Manager
   * receives an immediate popup to re-assign another installer/team.
   */
  readonly pendingManagerReassignmentJob = computed<InstallationJob | null>(() => {
    if (!this.canCurrentRoleAssignInstallers()) return null;
    const explicitId = this.activeReassignmentPopupJobId();
    if (explicitId) {
      const explicitJob = this.jobs().find(j => j.id === explicitId);
      if (explicitJob) return explicitJob;
    }
    const dismissed = this.dismissedReassignmentJobIds();
    return (
      this.jobs().find(
        j =>
          (j.installerAssignmentStatus === 'rejected' ||
            (j.assignedInstallers && j.assignedInstallers.length > 0 && j.assignedInstallers.some(m => m.status === 'rejected'))) &&
          !dismissed.includes(j.id)
      ) || null
    );
  });

  openReassignmentPopup(jobId: string): void {
    this.dismissedReassignmentJobIds.update(ids => ids.filter(id => id !== jobId));
    this.activeReassignmentPopupJobId.set(jobId);
  }

  dismissReassignmentPopup(jobId?: string): void {
    const targetId = jobId || this.pendingManagerReassignmentJob()?.id;
    this.activeReassignmentPopupJobId.set(null);
    if (targetId) {
      this.dismissedReassignmentJobIds.update(ids => (ids.includes(targetId) ? ids : [...ids, targetId]));
    }
  }

  readonly activeJobForCurrentInstaller = computed(() => {
    const instId = this.currentInstallerId();
    const curUser = this.currentUser();
    if (!instId && !curUser) return undefined;
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    return this.jobs().find(j => {
      const matchId = (instId && (j.assignedInstallerId === instId || (j.assignedInstallerIds && j.assignedInstallerIds.includes(instId)) || (j.assignedInstallers && j.assignedInstallers.some(m => m.id === instId)))) ||
                      (instId === 'USR-INS-01' && (j.assignedInstallerId === 'inst_01' || j.assignedInstallerId === 'USR-INS-01'));
      const matchName = namePrefix && ((j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(namePrefix)) || (j.assignedInstallerNames && j.assignedInstallerNames.some(n => n.toLowerCase().includes(namePrefix))));
      const isLive = j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'assigned' || j.status === 'truck_assigned' || j.status === 'in_progress';
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
  readonly shopPendingDriverJobs = computed(() => this.jobs().filter(j => !j.dispatcherId && !['dispatched', 'delivered_on_site', 'on_site', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status)));
  readonly driverPendingAcceptanceJobs = computed(() => {
    return this.dispatcherJobs().filter(j => 
      this.isDriverPendingAcceptance(j) &&
      j.status !== 'completed' &&
      j.status !== 'delivered_on_site'
    );
  });
  readonly installerPendingAcceptanceJobs = computed(() => {
    return this.jobs().filter(j => 
      this.isJobAssignedToCurrentInstaller(j) && 
      this.isInstallerPendingAcceptance(j) &&
      j.status !== 'completed' &&
      j.status !== 'bonus_awarded'
    );
  });
  readonly pendingFinanceVerificationJobs = computed(() => this.jobs().filter(j => j.shopBooking && !j.shopBooking.accountantVerified));
  readonly pendingTechMobilizationJobs = computed(() => this.jobs().filter(j => j.technicianSiteFunds && j.technicianSiteFunds.status === 'pending_dispatch'));

  /**
   * Returns true when a booked installation requires manual Account Officer
   * verification before Operations Manager / Shop Manager / Installer / Driver
   * notifications and task progression can proceed.
   */
  isAwaitingAccountVerification(job: InstallationJob | undefined | null): boolean {
    return !!(job?.shopBooking && !job.shopBooking.accountantVerified);
  }

  /**
   * Hard gate blocking any task progression until an Account Officer manually
   * approves the booking payment.
   */
  private ensureAccountVerified(jobId: string, actionLabel = 'proceed with this task'): boolean {
    const job = this.jobs().find(j => j.id === jobId);
    if (this.isAwaitingAccountVerification(job)) {
      this.alert.toastWarning(
        'Account Verification Required',
        `Job ${jobId} must be manually verified by an Account Officer before you can ${actionLabel}.`
      );
      return false;
    }
    return true;
  }
  readonly totalShopCollections = computed(() => this.jobs().reduce((sum, j) => sum + (j.shopBooking?.amountPaidAtShop || 0), 0));
  readonly totalSiteFundsDispatched = computed(() => this.jobs().reduce((sum, j) => sum + (j.technicianSiteFunds?.status === 'dispatched' ? j.technicianSiteFunds.amount : 0), 0));

  readonly stats = computed(() => this.computeJobStats(this.jobs()));

  // ============================================================================
  // SHOP ASSIGNMENT & BRANCH SCOPING
  // Every user assigned to a shop (via `shopId` reference to `shop_locations.id`,
  // or via their shop_manager/dispatcher branch assignment) sees ONLY data
  // belonging to their assigned shop on `/shop` and branch-scoped views.
  // ============================================================================

  /** Resolves the shop assigned to the currently active user (null for global unassigned roles like Admin/HQ Manager). */
  readonly userAssignedShop = computed<ShopLocationSettings | null>(() => {
    const curUser = this.currentUser();
    const role = this.currentRole();
    if (curUser.shopId) {
      return this.getUserAssignedBranch(curUser);
    }
    if (role === 'shop_manager' || role === 'dispatcher') {
      return this.getUserAssignedBranch(curUser);
    }
    return null;
  });

  /** The branch owned by the signed-in shop manager or shop-assigned operational user. */
  readonly managerBranch = computed<ShopLocationSettings | null>(() => {
    const role = this.currentRole();
    const curUser = this.currentUser();
    if (role === 'shop_manager') {
      return this.getUserAssignedBranch(curUser);
    }
    const crossBranchFieldRoles = ['admin', 'installer', 'dispatcher', 'client', 'account_officer'];
    if (curUser.shopId && !crossBranchFieldRoles.includes(role)) {
      return this.getUserAssignedBranch(curUser);
    }
    return null;
  });

  /** True when the current session must only see its own branch's data across general portal views. */
  readonly isBranchScoped = computed(() => this.currentRole() === 'shop_manager' || !!this.managerBranch());

  /** Jobs scoped to the current user's assigned shop on `/shop` (or all jobs for unassigned global users). */
  readonly shopPortalJobs = computed<InstallationJob[]>(() => {
    const all = this.jobs();
    const assigned = this.userAssignedShop();
    if (!assigned) return all;
    const targetShopId = String(assigned.id ?? assigned.branchCode);
    const index = this.buildBranchIndex();
    return all.filter(j => this.resolveJobBranchId(j, index) === targetShopId);
  });

  /** Jobs visible to the current session: own-branch jobs for shop-scoped users, everything for global roles. */
  readonly branchJobs = computed<InstallationJob[]>(() => {
    const all = this.jobs();
    if (!this.isBranchScoped()) return all;
    const branch = this.managerBranch();
    const branchId = branch ? String(branch.id ?? branch.branchCode) : null;
    const curUser = this.currentUser();
    const userEmail = (curUser.email || '').toLowerCase();
    const userId = (curUser.id || '').toLowerCase();
    const managerName = (curUser.name || '').toLowerCase();
    const index = this.buildBranchIndex();

    return all.filter(j => {
      const resolvedId = this.resolveJobBranchId(j, index);
      if (branchId && resolvedId === branchId) return true;
      if (resolvedId && branchId && resolvedId !== branchId) return false;
      if (j.createdByUserId && curUser.id && j.createdByUserId === curUser.id) return true;
      const bookedBy = (j.shopBooking?.bookedByShopManager || '').toLowerCase();
      if (!bookedBy || bookedBy === 'doormaster master shop manager') return false;
      return (!!userEmail && bookedBy.includes(userEmail)) ||
             (!!userId && bookedBy.includes(userId)) ||
             (!!managerName && bookedBy.includes(managerName));
    });
  });

  readonly branchJobIds = computed(() => new Set(this.branchJobs().map(j => j.id)));
  readonly branchStats = computed(() => this.computeJobStats(this.branchJobs()));
  readonly branchShopCollections = computed(() => this.branchJobs().reduce((sum, j) => sum + (j.shopBooking?.amountPaidAtShop || 0), 0));
  readonly branchPendingTruckSetupJobs = computed(() => this.branchJobs().filter(j => j.status === 'booked_at_shop' || ((!j.assignedInstallerId && (!j.assignedInstallerIds || j.assignedInstallerIds.length === 0)) && j.status !== 'completed' && j.status !== 'bonus_awarded')));
  readonly branchPendingDriverJobs = computed(() =>
    this.branchJobs().filter(
      j =>
        !j.dispatcherId &&
        this.hasJobAcceptedInstallers(j) &&
        !['dispatched', 'delivered_on_site', 'on_site', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status)
    )
  );

  /** Orders created at this shop where technicians have been assigned but not yet confirmed/accepted. */
  readonly branchAwaitingInstallerAcceptanceJobs = computed(() =>
    this.branchJobs().filter(
      j =>
        !j.dispatcherId &&
        !this.hasJobAcceptedInstallers(j) &&
        !['dispatched', 'delivered_on_site', 'on_site', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status)
    )
  );

  /** Dispatchers scoped to the shop manager's own branch (or all dispatchers for other roles). */
  readonly branchDispatchers = computed<DispatcherProfile[]>(() => {
    const all = this.dispatchers();
    if (!this.isBranchScoped()) return all;
    const branch = this.managerBranch();
    const branchId = branch ? String(branch.id ?? '') : '';
    const jobIds = this.branchJobIds();
    const assignedDispatcherIds = new Set(this.branchJobs().map(j => j.dispatcherId).filter(Boolean));
    return all.filter(d =>
      (branchId && d.shopId === branchId) ||
      (branch?.branchCode && d.branchCode === branch.branchCode) ||
      (branch?.shopName && d.branchName === branch.shopName) ||
      (d.currentTripJobId && jobIds.has(d.currentTripJobId)) ||
      assignedDispatcherIds.has(d.id)
    );
  });

  /** SMS logs scoped to the shop manager's own branch/jobs/phone (or all logs for other roles). */
  readonly roleSmsLogs = computed<SmsLogEntry[]>(() => {
    const all = this.smsLogs();
    if (!this.isBranchScoped()) return all;
    const jobIds = this.branchJobIds();
    const branch = this.managerBranch();
    const curUser = this.currentUser();
    const normalizeDigits = (p?: string | null) => (p || '').replace(/\D/g, '').slice(-9);
    const knownPhones = new Set<string>(
      [curUser.phone, ...(branch?.phone ? branch.phone.split('/') : [])]
        .map(p => normalizeDigits(p))
        .filter(d => d.length >= 7)
    );

    return all.filter(log => {
      if (log.jobId) {
        return jobIds.has(log.jobId);
      }
      if (log.recipientRole !== 'shop_manager') return false;
      const logDigits = normalizeDigits(log.recipientPhone);
      if (logDigits && knownPhones.has(logDigits)) return true;
      if (branch && log.messageText.toLowerCase().includes(branch.shopName.toLowerCase())) return true;
      return false;
    });
  });

  /** Public helper to resolve the shop/branch assigned to any user record (checks `shopId` reference first). */
  getUserAssignedBranch(
    user: { id?: string; name?: string; email?: string; role?: string; shopId?: string | null } | null | undefined
  ): ShopLocationSettings | null {
    if (!user) return null;
    const branches = this.branches();

    const email = (user.email || '').toLowerCase().trim();
    const name = (user.name || '').toLowerCase().trim();
    const id = (user.id || '').toUpperCase().trim();

    let resolvedShopId = (user.shopId || '').toString().trim().toLowerCase();
    if (!resolvedShopId) {
      const directoryUser = this.users().find(
        u =>
          (user.id && String(u.id) === String(user.id)) ||
          (email && (u.email || '').toLowerCase().trim() === email)
      );
      if (directoryUser?.shopId) {
        resolvedShopId = String(directoryUser.shopId).trim().toLowerCase();
      }
    }

    if (resolvedShopId) {
      const byShopId = branches.find(
        b =>
          String(b.id || '').toLowerCase() === resolvedShopId ||
          (b.branchCode || '').toLowerCase() === resolvedShopId ||
          (b.shopName || '').toLowerCase() === resolvedShopId
      );
      if (byShopId) return byShopId;
    }

    const role = (user.role || '').toLowerCase();
    if (role && role !== 'shop_manager' && role !== 'dispatcher') {
      return null;
    }

    if (email) {
      const byEmail = branches.find(b =>
        (b.managerEmail || '').toLowerCase().trim() === email ||
        (b.email || '').toLowerCase().trim() === email
      );
      if (byEmail) return byEmail;
    }

    if (id.startsWith('USR-SHP-') || id.startsWith('USR-DSP-')) {
      const suffix = id.replace('USR-SHP-', '').replace('USR-DSP-', '');
      if (suffix === '01') {
        const primary = branches.find(b => b.isPrimary || b.branchCode === 'DM-GH-OBY');
        if (primary) return primary;
      } else {
        const byCode = branches.find(b => (b.branchCode || '').toUpperCase().endsWith(suffix));
        if (byCode) return byCode;
      }
    }

    if (name && role === 'shop_manager') {
      const byFullName =
        branches.find(b => (b.managerName || '').toLowerCase().trim() === name) ||
        branches.find(b => (b.managerName || '').toLowerCase().includes(name));
      if (byFullName) return byFullName;
    }

    return null;
  }

  /** Matches a user account to its dedicated shop branch without falling back to the /shop counter switcher. */
  private findBranchForUser(
    user: { id?: string; name?: string; email?: string; role?: string; shopId?: string | null } | null | undefined
  ): ShopLocationSettings | null {
    return this.getUserAssignedBranch(user);
  }

  private findBranchByNameOrCode(branchName?: string | null, branchCode?: string | null): ShopLocationSettings | null {
    const branches = this.branches();
    if (branchCode) {
      const codeLower = branchCode.toLowerCase().trim();
      const byCode = branches.find(b => (b.branchCode || '').toLowerCase().trim() === codeLower);
      if (byCode) return byCode;
    }
    if (branchName) {
      const index = this.buildBranchIndex();
      const norm = this.normalizeBranchLabel(branchName);
      if (norm) {
        const exact = index.find(b => b.label === norm);
        if (exact) return branches.find(b => String(b.id ?? b.branchCode) === exact.id) || null;
        const partial = index.filter(b => b.label && (norm.includes(b.label) || b.label.includes(norm)));
        if (partial.length === 1) {
          return branches.find(b => String(b.id ?? b.branchCode) === partial[0].id) || null;
        }
      }
      const rawLower = branchName.toLowerCase();
      if (
        rawLower.includes('flagship') ||
        rawLower.includes('spintex') ||
        rawLower.includes('atelier main') ||
        rawLower.includes('central showroom') ||
        rawLower.includes('central atelier') ||
        rawLower.includes('downtown atelier') ||
        rawLower.includes('accra central')
      ) {
        return branches.find(b => b.isPrimary) || null;
      }
    }
    return null;
  }

  private resolveShopManagerForBranch(branch: ShopLocationSettings | null | undefined): { id: string; name: string; phone: string; email: string } | null {
    if (!branch) return null;
    const targetId = String(branch.id || '').toLowerCase();
    const branchEmail = (branch.managerEmail || branch.email || '').toLowerCase().trim();
    const matchedUser = this.users().find(u =>
      u.role === 'shop_manager' && (
        (!!targetId && (u.shopId || '').toLowerCase() === targetId) ||
        (!!branchEmail && (u.email || '').toLowerCase().trim() === branchEmail) ||
        (!!branch.managerName && (branch.managerName.toLowerCase().includes((u.name || '').toLowerCase())))
      )
    );
    if (matchedUser) {
      return {
        id: matchedUser.id,
        name: matchedUser.name,
        phone: matchedUser.phone || branch.phone,
        email: matchedUser.email
      };
    }
    const code = (branch.branchCode || '').toUpperCase();
    const fallbackId = (branch.isPrimary || code === 'DM-GH-HQ-SPX')
      ? 'USR-SHP-01'
      : code.startsWith('DM-GH-')
        ? `USR-SHP-${code.replace('DM-GH-', '')}`
        : undefined;
    if (!fallbackId) return null;
    return {
      id: fallbackId,
      name: branch.managerName || `${branch.shopName} Manager`,
      phone: branch.phone.split('/')[0].trim(),
      email: branch.managerEmail || branch.email
    };
  }

  private resolveShopManagerForJob(job: InstallationJob | null | undefined) {
    if (!job) return null;
    return this.resolveShopManagerForBranch(this.getJobBranch(job));
  }

  /**
   * Resolves the canonical ID(s) of the currently active installer so notifications
   * and task assignments are strictly isolated per individual installer.
   */
  resolveActiveInstallerIds(): Set<string> {
    const ids = new Set<string>();
    const curUser = this.currentUser();
    const explicitInstId = this.currentInstallerId();

    const primaryId = (curUser.role === 'installer' && curUser.id)
      ? curUser.id
      : (explicitInstId || 'USR-INS-01');

    ids.add(primaryId);

    const matchedTech = this.installers().find(i =>
      i.id === primaryId ||
      (curUser.role === 'installer' && curUser.email && i.email.toLowerCase() === curUser.email.toLowerCase())
    );
    if (matchedTech) {
      ids.add(matchedTech.id);
    }

    // Map legacy 'inst_01' <-> 'USR-INS-01' only for the corresponding installer
    if (ids.has('USR-INS-01') || ids.has('inst_01')) {
      ids.add('USR-INS-01');
      ids.add('inst_01');
    }
    if (ids.has('USR-INS-02') || ids.has('inst_02')) {
      ids.add('USR-INS-02');
      ids.add('inst_02');
    }
    if (ids.has('USR-INS-03') || ids.has('inst_03')) {
      ids.add('USR-INS-03');
      ids.add('inst_03');
    }

    return ids;
  }

  isJobAssignedToCurrentInstaller(job: InstallationJob | undefined | null): boolean {
    if (!job) return false;
    const myIds = this.resolveActiveInstallerIds();
    const assignedIds = new Set<string>();
    if (Array.isArray(job.assignedInstallerIds) && job.assignedInstallerIds.length > 0) {
      job.assignedInstallerIds.forEach(id => { if (id) assignedIds.add(id); });
    } else if (job.assignedInstallerId) {
      assignedIds.add(job.assignedInstallerId);
    }
    if (assignedIds.size === 0) return false;
    for (const id of myIds) {
      if (assignedIds.has(id)) return true;
    }
    return false;
  }

  getInstallerMemberForJob(job: InstallationJob | undefined | null, targetInstallerId?: string): AssignedInstallerTeamMember | undefined {
    if (!job) return undefined;
    const myIds = targetInstallerId ? new Set([targetInstallerId]) : this.resolveActiveInstallerIds();
    const assignedIds = new Set<string>();
    if (Array.isArray(job.assignedInstallerIds) && job.assignedInstallerIds.length > 0) {
      job.assignedInstallerIds.forEach(id => { if (id) assignedIds.add(id); });
    } else if (job.assignedInstallerId) {
      assignedIds.add(job.assignedInstallerId);
    }
    if (assignedIds.size > 0) {
      const isMyIdAssigned = Array.from(myIds).some(id => assignedIds.has(id));
      if (!isMyIdAssigned) return undefined;
    }
    if (job.assignedInstallers && job.assignedInstallers.length > 0) {
      return job.assignedInstallers.find(m => myIds.has(m.id) && (assignedIds.size === 0 || assignedIds.has(m.id)));
    }
    if (job.assignedInstallerId && myIds.has(job.assignedInstallerId)) {
      return {
        id: job.assignedInstallerId,
        name: job.assignedInstallerName || 'Installer',
        role: 'lead',
        status: job.installerAssignmentStatus || 'pending',
        autoAccepted: job.installerAutoAccepted,
        deadlineAt: job.installerDeadlineAt,
        assignedAt: job.installerAssignedAt,
        respondedAt: job.installerRespondedAt,
        rejectReason: job.installerRejectReason
      };
    }
    return undefined;
  }

  isInstallerPendingAcceptance(job: InstallationJob | undefined | null, targetInstallerId?: string): boolean {
    if (!job) return false;
    const member = this.getInstallerMemberForJob(job, targetInstallerId);
    if (!member) return false;
    
    const memberStatus = member.status || 'pending';
    if (memberStatus !== 'pending') return false;

    // Check 10-minute deadline reactively with synchronized tick
    const deadlineStr = member.deadlineAt || job.installerDeadlineAt;
    if (deadlineStr && new Date(deadlineStr).getTime() <= this.nowTick()) {
      return false; // Expired (auto-accepted)
    }

    return true;
  }

  getInstallerRemainingSeconds(job: InstallationJob | undefined | null, member?: AssignedInstallerTeamMember): number {
    if (!job) return 0;
    const now = this.nowTick();
    const assignedMember = member || (job.assignedInstallers && job.assignedInstallers.length > 0
      ? this.getInstallerMemberForJob(job) || job.assignedInstallers[0]
      : undefined);
    const deadlineStr = assignedMember?.deadlineAt || job.installerDeadlineAt;
    if (!deadlineStr) {
      const assignedMs = (assignedMember?.assignedAt || job.installerAssignedAt)
        ? new Date(assignedMember?.assignedAt || job.installerAssignedAt!).getTime()
        : now;
      return Math.max(0, Math.floor((assignedMs + 10 * 60 * 1000 - now) / 1000));
    }
    const deadlineMs = new Date(deadlineStr).getTime();
    return Math.max(0, Math.floor((deadlineMs - now) / 1000));
  }

  formatInstallerRemaining(job: InstallationJob | undefined | null, member?: AssignedInstallerTeamMember): string {
    const totalSec = this.getInstallerRemainingSeconds(job, member);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  isJobAssignedToCurrentDriver(job: InstallationJob | undefined | null): boolean {
    if (!job) return false;
    const curUser = this.currentUser();
    const disp = this.activeDispatcher();
    const dispId = (curUser.role === 'dispatcher' && curUser.id) ? curUser.id : (this.currentDispatcherId() || disp?.id);
    if (!dispId) return false;
    if (job.dispatcherId === dispId || (job as any).assignedDriverId === dispId) return true;
    if (job.logisticsTruck?.dispatcherId === dispId) return true;
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : (disp?.name ? disp.name.split(' ')[0].toLowerCase() : '');
    if (namePrefix && ((job.dispatcherName && job.dispatcherName.toLowerCase().includes(namePrefix)) || ((job as any).assignedDriverName && (job as any).assignedDriverName.toLowerCase().includes(namePrefix)))) {
      return true;
    }
    return false;
  }

  isDriverPendingAcceptance(job: InstallationJob | undefined | null): boolean {
    if (!job) return false;
    if (!job.dispatcherId && !(job as any).assignedDriverId && !job.logisticsTruck?.dispatcherId) return false;
    const status = job.driverAssignmentStatus || 'pending';
    if (status !== 'pending') return false;

    // Check 10-minute deadline reactively with synchronized tick
    const deadlineStr = job.driverDeadlineAt || job.logisticsTruck?.driverDeadlineAt;
    if (deadlineStr && new Date(deadlineStr).getTime() <= this.nowTick()) {
      return false; // Expired (auto-accepted)
    }

    return true;
  }

  getDriverRemainingSeconds(job: InstallationJob | undefined | null): number {
    if (!job) return 0;
    const now = this.nowTick();
    const deadlineStr = job.driverDeadlineAt || job.logisticsTruck?.driverDeadlineAt;
    if (!deadlineStr) {
      const assignedMs = (job.driverAssignedAt || job.logisticsTruck?.driverAssignedAt)
        ? new Date(job.driverAssignedAt || job.logisticsTruck?.driverAssignedAt!).getTime()
        : now;
      return Math.max(0, Math.floor((assignedMs + 10 * 60 * 1000 - now) / 1000));
    }
    const deadlineMs = new Date(deadlineStr).getTime();
    return Math.max(0, Math.floor((deadlineMs - now) / 1000));
  }

  formatDriverRemaining(job: InstallationJob | undefined | null): string {
    const totalSec = this.getDriverRemainingSeconds(job);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  private isNotificationVisibleToCurrentRole(n: NotificationItem): boolean {
    const role = this.currentRole();
    const isRestrictedRole = ['client', 'installer', 'shop_manager'].includes(role);
    if (isRestrictedRole && n.type === 'bonus_awarded') return false;

    if (role === 'installer') {
      if (n.recipientRole !== 'installer') return false;
      const myIds = this.resolveActiveInstallerIds();
      if (n.recipientUserId) {
        return myIds.has(n.recipientUserId);
      }
      if (n.jobId && n.jobId !== 'GENERAL') {
        const job = this.jobs().find(j => j.id === n.jobId);
        return this.isJobAssignedToCurrentInstaller(job);
      }
      return false;
    }

    if (role === 'dispatcher') {
      if (n.recipientRole !== 'dispatcher') return false;
      const curUser = this.currentUser();
      const dispId = (curUser.role === 'dispatcher' && curUser.id) ? curUser.id : this.currentDispatcherId();
      if (n.recipientUserId && dispId) {
        return n.recipientUserId === dispId;
      }
      return true;
    }

    if (role === 'client') {
      if (n.recipientRole !== 'client') return false;
      const cliId = this.currentClientId();
      if (n.recipientUserId && cliId) {
        return n.recipientUserId === cliId;
      }
      return true;
    }

    if (role === 'shop_manager') {
      if (n.recipientRole !== 'shop_manager') return false;
      const curUser = this.currentUser();
      if (n.recipientUserId) {
        return n.recipientUserId === curUser.id;
      }
      if (n.jobId && n.jobId !== 'GENERAL') {
        return this.branchJobIds().has(n.jobId);
      }
      const branch = this.managerBranch();
      if (!branch) return false;
      const msgBranch = this.findBranchByNameOrCode(n.message, null);
      if (msgBranch) {
        return String(msgBranch.id ?? msgBranch.branchCode) === String(branch.id ?? branch.branchCode);
      }
      return false;
    }

    return n.recipientRole === role || n.recipientRole === 'all';
  }

  private normalizeBranchLabel(value: string | undefined | null): string {
    return (value || '')
      .toLowerCase()
      .replace(/doormaster|branch|section|showroom|&|\(|\)|,|\./g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private buildBranchIndex(): { id: string; code: string; label: string; isPrimary: boolean }[] {
    return this.branches().map(b => ({
      id: String(b.id ?? b.branchCode),
      code: (b.branchCode || '').toLowerCase(),
      label: this.normalizeBranchLabel(b.shopName),
      isPrimary: !!b.isPrimary
    }));
  }

  /**
   * Resolves which branch a job belongs to. Matches on canonical `shopId` reference first,
   * then branch code, then normalized branch name, and maps Central Showroom aliases to primary.
   */
  private resolveJobBranchId(job: InstallationJob, index = this.buildBranchIndex()): string | null {
    const explicitId = (job.shopId || job.shopBooking?.shopId || '').toString().trim().toLowerCase();
    if (explicitId) {
      const byId = index.find(b => b.id.toLowerCase() === explicitId || b.code === explicitId);
      if (byId) return byId.id;
    }

    const code = (job.shopBranchCode || job.shopBooking?.branchCode || '').toLowerCase().trim();
    if (code) {
      const byCode = index.find(b => b.code === code);
      if (byCode) return byCode.id;
    }

    const rawLabels = [job.shopBooking?.shopBranch, job.shopBranch].filter((l): l is string => !!l && !!l.trim());
    const labels = rawLabels.map(l => this.normalizeBranchLabel(l)).filter(l => !!l);

    for (const label of labels) {
      const exact = index.find(b => b.label === label);
      if (exact) return exact.id;
    }

    for (const label of labels) {
      const partial = index.filter(b => b.label && (label.includes(b.label) || b.label.includes(label)));
      if (partial.length === 1) return partial[0].id;
      if (partial.length > 1) return null; // ambiguous (e.g. "Kumasi"), don't leak to any branch
    }

    for (const raw of rawLabels) {
      const lower = raw.toLowerCase();
      if (
        lower.includes('flagship') ||
        lower.includes('spintex') ||
        lower.includes('atelier main') ||
        lower.includes('central showroom') ||
        lower.includes('central atelier') ||
        lower.includes('downtown atelier') ||
        lower.includes('accra central')
      ) {
        return index.find(b => b.isPrimary)?.id ?? null;
      }
    }

    return null;
  }

  /** Canonical shop reference ID (`shop_locations.id`) that a job belongs to. */
  getJobShopId(job: InstallationJob): string | null {
    return this.resolveJobBranchId(job);
  }

  /** Branch that a job belongs to (null when it cannot be determined). */
  getJobBranch(job: InstallationJob): ShopLocationSettings | null {
    const id = this.resolveJobBranchId(job);
    return this.branches().find(b => String(b.id ?? b.branchCode) === id) || null;
  }

  private computeJobStats(all: InstallationJob[]) {
    const completed = all.filter(j => j.status === 'completed' || j.status === 'bonus_awarded').length;
    const inProgress = all.filter(j => j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'delivered_on_site' || j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || j.status === 'assigned').length;
    const pendingSignoff = all.filter(j => j.status === 'installed_pending_signoff').length;
    const pendingBonusApproval = all.filter(j => j.financials.bonusStatus === 'pending' && (j.status === 'completed' || j.status === 'installed_pending_signoff')).length;
    const totalOrderValue = all.reduce((sum, j) => sum + (j.financials.installationFee || 0) + (j.financials.laborCost || 0), 0);
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
  }

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

    // Seed default installer teams immediately, then sync live data from API
    this.deriveInstallersAndDispatchersFromUsers();
    this.loadFromApi();

    if (session) {
      void this.validateSession();
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isNetworkOnline.set(true);
        const last = this.myLiveLocation();
        if (last) {
          this.myLiveLocation.set({ ...last, status: 'online' });
          void this.pushLocation({
            latitude: last.latitude,
            longitude: last.longitude,
            accuracyM: last.accuracyM ?? null,
            heading: last.heading ?? null,
            speedKmh: last.speedKmh ?? null
          });
        }
        void this.loadLiveLocations();
      });
      window.addEventListener('offline', () => {
        this.isNetworkOnline.set(false);
        const last = this.myLiveLocation();
        if (last) {
          const offlineLoc: LiveLocation = { ...last, status: 'offline' };
          this.myLiveLocation.set(offlineLoc);
          this.liveLocations.update(list =>
            list.map(l => l.userId === offlineLoc.userId ? offlineLoc : l)
          );
        }
      });
    }

    effect(() => {
      const role = this.currentRole();
      if (role === 'installer' || role === 'dispatcher') {
        void this.initGpsPermissionWatcher();
      }
    });

    // Synchronized 1-second real-time tick for all 10m countdowns across portals
    setInterval(() => {
      this.nowTick.set(Date.now());
    }, 1000);

    // 10-Minute Dispatch Driver & Installer Auto-Acceptance Watchdog (Checks every 2 seconds)
    setInterval(() => {
      this.checkAndAutoAcceptExpiredDriverAssignments();
      this.checkAndAutoAcceptExpiredInstallerAssignments();
    }, 2000);

    // Instant cross-portal synchronization bus & active heartbeat
    if (typeof window !== 'undefined') {
      this.setupCrossPortalSync();

      setInterval(() => {
        if (typeof document === 'undefined' || document.visibilityState === 'visible') {
          void this.syncLiveCrossUserState();
        }
      }, 3500);

      window.addEventListener('focus', () => {
        void this.syncLiveCrossUserState();
      });
    }
  }

  private syncChannel: BroadcastChannel | null = null;

  /**
   * Initializes the browser BroadcastChannel bus and localStorage event fallbacks
   * for zero-latency cross-portal / cross-tab reactive data synchronization.
   */
  private setupCrossPortalSync(): void {
    if (typeof window === 'undefined') return;

    try {
      if ('BroadcastChannel' in window) {
        this.syncChannel = new BroadcastChannel('doormaster_cross_portal_sync_bus');
        this.syncChannel.onmessage = (event: MessageEvent) => {
          if (event.data && event.data.entity) {
            void this.handleIncomingDataSync(event.data.entity as SyncEntity);
          }
        };
      }
    } catch (err) {
      console.warn('[CrossPortalSync] BroadcastChannel unavailable, using storage event fallback:', err);
    }

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === STORAGE_KEY_CROSS_PORTAL_SYNC && event.newValue) {
        try {
          const payload = JSON.parse(event.newValue);
          if (payload?.entity) {
            void this.handleIncomingDataSync(payload.entity as SyncEntity);
          }
        } catch {
          // ignore parsing error
        }
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        void this.syncLiveCrossUserState();
      }
    });
  }

  /**
   * Broadcasts data changes across all browser tabs and portal views instantly.
   */
  broadcastDataChanged(entity: SyncEntity): void {
    if (typeof window === 'undefined') return;
    const now = Date.now();

    try {
      this.syncChannel?.postMessage({ entity, timestamp: now });
    } catch {
      // ignore
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY_CROSS_PORTAL_SYNC,
        JSON.stringify({ entity, timestamp: now })
      );
    } catch {
      // ignore
    }
  }

  /**
   * Handles incoming cross-portal synchronization events, refreshing authoritative tables.
   */
  async handleIncomingDataSync(entity: SyncEntity): Promise<void> {
    try {
      switch (entity) {
        case 'jobs':
          await Promise.all([this.loadJobsFromBackend(), this.loadClientsFromBackend()]);
          break;
        case 'users':
          await Promise.all([this.loadUsers(), this.loadTeamsFromBackend()]);
          this.deriveInstallersAndDispatchersFromUsers();
          break;
        case 'teams':
          await Promise.all([this.loadTeamsFromBackend(), this.loadUsers()]);
          this.deriveInstallersAndDispatchersFromUsers();
          break;
        case 'roles':
          await this.loadRolesFromBackend();
          break;
        case 'doors':
          await this.loadDoorsFromBackend();
          break;
        case 'branches':
          await Promise.all([this.loadBranchesFromBackend(), this.loadShopLocationFromBackend()]);
          break;
        case 'clients':
          await this.loadClientsFromBackend();
          break;
        case 'notifications':
          await this.loadNotificationsFromBackend();
          break;
        case 'all':
        default:
          await this.refreshAllData('Incoming Broadcast');
          break;
      }
    } catch (err) {
      console.warn(`[CrossPortalSync] Error processing incoming sync for ${entity}:`, err);
    }
  }

  /**
   * Global refresh method to reload every table and relational view immediately.
   */
  async refreshAllData(reason?: string): Promise<void> {
    await Promise.all([
      this.loadTeamsFromBackend(),
      this.loadRolesFromBackend(),
      this.loadJobsFromBackend(),
      this.loadClientsFromBackend(),
      this.loadDoorsFromBackend(),
      this.loadBranchesFromBackend(),
      this.loadShopLocationFromBackend(),
      this.loadNotificationsFromBackend(),
      this.loadUsers()
    ]);
    this.deriveInstallersAndDispatchersFromUsers();
  }

  /**
   * Keeps every signed-in user's store signals (teams, members, positions, roles, users, jobs, notifications, doors, branches)
   * in sync with MySQL across browsers and sessions.
   */
  async syncLiveCrossUserState(): Promise<void> {
    await Promise.all([
      this.loadTeamsFromBackend(),
      this.loadRolesFromBackend(),
      this.loadJobsFromBackend(),
      this.loadClientsFromBackend(),
      this.loadNotificationsFromBackend(),
      this.loadDoorsFromBackend(),
      this.loadBranchesFromBackend(),
      this.loadShopLocationFromBackend(),
      this.loadUsers()
    ]);
    this.deriveInstallersAndDispatchersFromUsers();
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
    }

    if (user.shopId || user.role === 'shop_manager' || user.role === 'dispatcher') {
      const matched = this.getUserAssignedBranch(user);
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
      this.loadTeamsFromBackend(),
      this.loadRolesFromBackend(),
      this.loadJobsFromBackend(),
      this.loadClientsFromBackend(),
      this.loadNotificationsFromBackend(),
      this.loadSmsLogsFromBackend(),
      this.loadInquiriesFromBackend(),
      this.loadDoorsFromBackend(),
      this.loadShopLocationFromBackend(),
      this.loadBranchesFromBackend(),
      this.checkDbStatus()
    ]);

    // Derive installers & dispatchers from authenticated users & DB teams
    this.deriveInstallersAndDispatchersFromUsers();

    // Ensure assigned shop always takes precedence over primary shop default
    const assignedBranch = this.userAssignedShop();
    if (assignedBranch) {
      this.shopLocation.set(assignedBranch);
    }
  }

  /**
   * Derives installer & dispatcher profiles from the users table and authoritative DB teams.
   * Maps 1 dispatcher per branch and organizes installers into all available teams (Team Alpha, Team Bravo, and any custom teams).
   */
  private deriveInstallersAndDispatchersFromUsers(): void {
    const userList = this.users();
    const branches = this.branches();

    const activeInstallerUsers = userList.filter(
      u => u.role === 'installer' && u.status !== 'rejected' && u.status !== 'deactivated'
    );

    const fallbackInstallerUsers: AppUser[] = [
      {
        id: 'USR-INS-01',
        name: 'Marcus Vance',
        email: 'm.vance@doormasterops.com',
        role: 'installer',
        phone: '+233 24 555 0102',
        status: 'active',
        teamId: 'team-alpha',
        teamRole: 'lead',
        teamPosition: 'Lead Master Tech',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-16T08:00:00Z'
      },
      {
        id: 'USR-INS-02',
        name: 'Benjamin Koranteng',
        email: 'b.koranteng@doormasterops.com',
        role: 'installer',
        phone: '+233 24 555 0112',
        status: 'active',
        teamId: 'team-alpha',
        teamRole: 'assistant',
        teamPosition: 'Senior Acoustic Tech',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-16T08:05:00Z'
      },
      {
        id: 'USR-INS-03',
        name: 'Joseph Annan',
        email: 'j.annan@doormasterops.com',
        role: 'installer',
        phone: '+233 24 555 0113',
        status: 'active',
        teamId: 'team-alpha',
        teamRole: 'assistant',
        teamPosition: 'Pivot & Frameless Glass Tech',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-16T08:10:00Z'
      },
      {
        id: 'USR-INS-04',
        name: 'Derrick Bruce',
        email: 'd.bruce@doormasterops.com',
        role: 'installer',
        phone: '+233 24 555 0114',
        status: 'active',
        teamId: 'team-bravo',
        teamRole: 'lead',
        teamPosition: 'Smart Lock Specialist',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-16T08:15:00Z'
      },
      {
        id: 'USR-INS-05',
        name: 'Emmanuel Ofori',
        email: 'e.ofori@doormasterops.com',
        role: 'installer',
        phone: '+233 24 555 0115',
        status: 'active',
        teamId: 'team-bravo',
        teamRole: 'assistant',
        teamPosition: 'Grand Villa Steel Tech',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-16T08:20:00Z'
      },
      {
        id: 'USR-INS-06',
        name: 'Patrick Gyasi',
        email: 'p.gyasi@doormasterops.com',
        role: 'installer',
        phone: '+233 24 555 0116',
        status: 'active',
        teamId: 'team-bravo',
        teamRole: 'assistant',
        teamPosition: 'Precision Joiner Tech',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-16T08:25:00Z'
      }
    ];

    if (this.hasSyncedTeamsFromApi()) {
      const apiTeams = this.dbTeams();
      const userById = new Map<string, AppUser>(userList.map(u => [u.id, u]));

      // Synchronize each DB team's member list with the latest user records
      const syncedTeams: InstallerTeam[] = apiTeams.map(rawTeam => {
        const syncedMembers: AssignedInstallerTeamMember[] = (rawTeam.members || []).map((m, idx) => {
          const liveUser = userById.get(m.id);
          const isLead = m.role === 'lead' || m.isTeamLead || (rawTeam.leadId ? rawTeam.leadId === m.id : idx === 0);
          return {
            ...m,
            name: liveUser?.name || m.name,
            phone: liveUser?.phone || m.phone || '+233 24 555 0102',
            email: liveUser?.email || m.email,
            avatar: liveUser?.avatarUrl || m.avatar,
            role: isLead ? 'lead' : 'assistant',
            position: liveUser?.teamPosition || m.position || (isLead ? 'Team Lead' : 'Installation Installer'),
            teamId: rawTeam.id,
            teamName: rawTeam.name,
            isTeamLead: isLead,
            status: liveUser?.status || m.status || 'active',
            avgRating: m.avgRating || (isLead ? 4.95 : 4.88)
          };
        });

        const explicitLead = syncedMembers.find(m => m.isTeamLead) || syncedMembers[0];
        const orderedMembers = explicitLead
          ? [explicitLead, ...syncedMembers.filter(m => m.id !== explicitLead.id)]
          : syncedMembers;

        return {
          ...rawTeam,
          leadId: explicitLead ? explicitLead.id : (rawTeam.leadId || ''),
          leadName: explicitLead ? explicitLead.name : (rawTeam.leadName || 'Unassigned Lead'),
          leadPhone: explicitLead?.phone || rawTeam.leadPhone || '+233 24 555 0102',
          leadAvatarUrl: explicitLead?.avatar || rawTeam.leadAvatarUrl,
          memberIds: orderedMembers.map(m => m.id),
          members: orderedMembers,
          positions: Array.isArray(rawTeam.positions) && rawTeam.positions.length > 0
            ? rawTeam.positions
            : ['Team Lead', 'Lead Master Installer', 'Senior Acoustic Installer', 'Smart Lock Specialist', 'Precision Joiner Installer', 'Installation Installer']
        };
      });

      this.installerTeams.set(syncedTeams);

      // Build map of userId -> team membership from syncedTeams
      const memberTeamLookup = new Map<string, { team: InstallerTeam; member: AssignedInstallerTeamMember }>();
      for (const team of syncedTeams) {
        for (const member of team.members) {
          memberTeamLookup.set(member.id, { team, member });
        }
      }

      // Collect all installer users (plus any team members whose user list wasn't loaded or has another role)
      const installerUserMap = new Map<string, AppUser>();
      for (const u of activeInstallerUsers) {
        installerUserMap.set(u.id, u);
      }
      for (const team of syncedTeams) {
        for (const m of team.members) {
          if (!installerUserMap.has(m.id)) {
            const matchedUser = userById.get(m.id);
            installerUserMap.set(m.id, matchedUser || {
              id: m.id,
              name: m.name,
              email: m.email || `${m.id.toLowerCase()}@doormasterops.com`,
              role: 'installer',
              phone: m.phone || '+233 24 555 0102',
              status: m.status || 'active',
              teamId: team.id,
              teamRole: m.role,
              teamPosition: m.position,
              avatarUrl: m.avatar,
              createdAt: new Date().toISOString()
            });
          }
        }
      }

      const sortedUsers = Array.from(installerUserMap.values()).sort((a, b) => a.id.localeCompare(b.id));
      const mappedInstallers: InstallerProfile[] = sortedUsers.map(u => {
        const lookup = memberTeamLookup.get(u.id);
        const matchedTeam = lookup?.team || (u.teamId ? syncedTeams.find(t => t.id === u.teamId) : undefined);
        const matchedMember = lookup?.member;

        const teamId = matchedTeam?.id || undefined;
        const teamName = matchedTeam?.name || undefined;
        const isTeamLead = matchedMember
          ? matchedMember.role === 'lead' || !!matchedMember.isTeamLead
          : u.teamRole === 'lead';
        const teamRole: 'lead' | 'assistant' = isTeamLead ? 'lead' : 'assistant';
        const teamPosition = matchedMember?.position || u.teamPosition || (teamId ? (isTeamLead ? 'Team Lead' : 'Installation Installer') : undefined);
        const isAlphaSide = teamId === 'team-alpha';

        return {
          id: u.id,
          name: u.name,
          role: 'installer' as const,
          phone: u.phone || '+233 24 555 0102',
          email: u.email,
          avatarUrl: u.avatarUrl || '',
          teamId,
          teamName,
          isTeamLead,
          teamRole,
          teamPosition,
          specialties: matchedTeam?.specialties?.length
            ? matchedTeam.specialties
            : (isAlphaSide ? ['acoustic_french', 'entrance_pivot'] : ['Smart Lock Doors', 'Premium Villa Series']),
          lockSpecialties: isTeamLead ? ['Doormaster Smart Lock Handle F35', 'Biometric & RFID'] : ['Concealed Hinges', 'Multi-point Lockset'],
          activeJobId: null,
          isSignedIn: u.status === 'active',
          lastSeenAt: u.createdAt || new Date().toISOString(),
          currentLocationName: isAlphaSide ? 'Central & Greater Accra Sector' : 'Northern & Commercial Sector',
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
    } else {
      const sourceInstallerUsers = activeInstallerUsers.length > 0 ? activeInstallerUsers : fallbackInstallerUsers;

      // Sort deterministically so leads and seed IDs keep canonical order regardless of DB query ordering
      const sortedInstallerUsers = [...sourceInstallerUsers].sort((a, b) => a.id.localeCompare(b.id));

      let alphaCount = 0;
      let bravoCount = 0;
      const customTeamMeta = new Map<string, { id: string; code: string; name: string; description: string; specialties: string[] }>();

      // First pass: count explicit Alpha and Bravo members
      for (const u of sortedInstallerUsers) {
        const lower = (u.name || '').toLowerCase();
        const lowerEmail = (u.email || '').toLowerCase();
        const isBravo =
          u.teamId === 'team-bravo' ||
          u.id === 'USR-INS-04' || u.id === 'USR-INS-05' || u.id === 'USR-INS-06' ||
          lower.includes('bravo') || lowerEmail.includes('bravo') ||
          lower.includes('bruce') || lower.includes('ofori') || lower.includes('gyasi');
        const isAlpha =
          !isBravo && (
            u.teamId === 'team-alpha' ||
            u.id === 'USR-INS-01' || u.id === 'USR-INS-02' || u.id === 'USR-INS-03' ||
            lower.includes('alpha') || lowerEmail.includes('alpha') ||
            lower.includes('vance') || lower.includes('koranteng') || lower.includes('annan')
          );
        if (isAlpha) alphaCount++;
        if (isBravo) bravoCount++;
      }

      const mappedInstallers: InstallerProfile[] = sortedInstallerUsers.map(u => {
        const lower = (u.name || '').toLowerCase();
        const lowerEmail = (u.email || '').toLowerCase();

        const isExplicitBravo =
          u.teamId === 'team-bravo' ||
          u.id === 'USR-INS-04' || u.id === 'USR-INS-05' || u.id === 'USR-INS-06' ||
          lower.includes('bravo') || lowerEmail.includes('bravo') ||
          lower.includes('bruce') || lower.includes('ofori') || lower.includes('gyasi');

        const isExplicitAlpha =
          !isExplicitBravo && (
            u.teamId === 'team-alpha' ||
            u.id === 'USR-INS-01' || u.id === 'USR-INS-02' || u.id === 'USR-INS-03' ||
            lower.includes('alpha') || lowerEmail.includes('alpha') ||
            lower.includes('vance') || lower.includes('koranteng') || lower.includes('annan')
          );

        let teamId: string;
        let teamName: string;

        if (isExplicitAlpha) {
          teamId = 'team-alpha';
          teamName = 'Team Alpha (Precision Acoustics & Pivots)';
        } else if (isExplicitBravo) {
          teamId = 'team-bravo';
          teamName = 'Team Bravo (Smart Lock & Heavy Entry Squad)';
        } else {
          const customMatch = (u.name || '').match(/team\s+([a-z0-9_-]+)/i);
          if (customMatch && customMatch[1]) {
            const rawLabel = customMatch[1];
            const normalizedSlug = rawLabel.toLowerCase();
            const titleLabel = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1);
            teamId = `team-${normalizedSlug}`;
            teamName = `Team ${titleLabel} (Field Installation Squad)`;
            if (!customTeamMeta.has(teamId)) {
              customTeamMeta.set(teamId, {
                id: teamId,
                code: rawLabel.toUpperCase(),
                name: `Team ${titleLabel} - Field Installation Squad`,
                description: `Dedicated DoorMaster field installation squad (Team ${titleLabel}).`,
                specialties: ['Architectural Door Fitting', 'Smart Lock Calibration', 'Multi-Point Hardware']
              });
            }
          } else if (alphaCount < 3) {
            alphaCount++;
            teamId = 'team-alpha';
            teamName = 'Team Alpha (Precision Acoustics & Pivots)';
          } else if (bravoCount < 3) {
            bravoCount++;
            teamId = 'team-bravo';
            teamName = 'Team Bravo (Smart Lock & Heavy Entry Squad)';
          } else {
            teamId = 'team-charlie';
            teamName = 'Team Charlie (Rapid Response & Custom Fit)';
            if (!customTeamMeta.has(teamId)) {
              customTeamMeta.set(teamId, {
                id: teamId,
                code: 'CHARLIE',
                name: 'Team Charlie - Rapid Response & Custom Fit',
                description: 'Specialized field squad for rapid turnaround installations, commercial fire doors, and custom hardware.',
                specialties: ['Commercial Fire Doors', 'Rapid Site Turnaround', 'Custom Mortise Hardware']
              });
            }
          }
        }

        const isTeamLead =
          u.teamRole === 'lead' ||
          u.id === 'USR-INS-01' ||
          u.id === 'USR-INS-04' ||
          lower.includes('lead');
        const teamRole: 'lead' | 'assistant' = isTeamLead ? 'lead' : 'assistant';
        const isAlphaSide = teamId === 'team-alpha';

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
          teamPosition: u.teamPosition || (isTeamLead ? 'Team Lead' : 'Installation Installer'),
          specialties: isAlphaSide ? ['acoustic_french', 'entrance_pivot'] : ['Smart Lock Doors', 'Premium Villa Series'],
          lockSpecialties: isTeamLead ? ['Doormaster Smart Lock Handle F35', 'Biometric & RFID'] : ['Concealed Hinges', 'Multi-point Lockset'],
          activeJobId: null,
          isSignedIn: u.status === 'active',
          lastSeenAt: u.createdAt || new Date().toISOString(),
          currentLocationName: isAlphaSide ? 'Central & Greater Accra Sector' : 'Northern & Commercial Sector',
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

      const buildTeamRecord = (
        id: string,
        code: string,
        name: string,
        shortName: string,
        specialties: string[],
        description: string,
        membersList: InstallerProfile[],
        fallbackLeadName: string,
        fallbackLeadId: string
      ): InstallerTeam => {
        const explicitLead = membersList.find(m => m.isTeamLead) || membersList[0];
        if (explicitLead && !explicitLead.isTeamLead) {
          explicitLead.isTeamLead = true;
          explicitLead.teamRole = 'lead';
        }
        const orderedMembers = explicitLead
          ? [explicitLead, ...membersList.filter(m => m.id !== explicitLead.id)]
          : membersList;

        return {
          id,
          name,
          code,
          leadId: explicitLead ? explicitLead.id : fallbackLeadId,
          leadName: explicitLead ? explicitLead.name : fallbackLeadName,
          leadPhone: explicitLead ? explicitLead.phone : '+233 24 555 0102',
          leadAvatarUrl: explicitLead?.avatarUrl,
          memberIds: orderedMembers.map(m => m.id),
          members: orderedMembers.map((m, idx) => ({
            id: m.id,
            name: m.name,
            phone: m.phone,
            role: idx === 0 ? 'lead' : 'assistant',
            position: m.teamPosition || (idx === 0 ? 'Team Lead' : 'Installation Installer'),
            avatar: m.avatarUrl,
            avgRating: m.metrics.avgRating,
            teamId: id,
            teamName: shortName,
            isTeamLead: idx === 0
          })),
          positions: ['Team Lead', 'Lead Master Installer', 'Senior Acoustic Installer', 'Smart Lock Specialist', 'Precision Joiner Installer', 'Installation Installer'],
          specialties,
          description,
          status: 'available'
        };
      };

      const teamAlphaMembers = mappedInstallers.filter(i => i.teamId === 'team-alpha');
      const teamBravoMembers = mappedInstallers.filter(i => i.teamId === 'team-bravo');

      const teams: InstallerTeam[] = [];

      if (teamAlphaMembers.length > 0) {
        teams.push(
          buildTeamRecord(
            'team-alpha',
            'ALPHA',
            'Team Alpha - Precision Acoustics & Pivots',
            'Team Alpha',
            ['Acoustic French Doors', 'Entrance Pivot Doors', 'Master Architectural Alignment'],
            'Elite 3-person squad specialized in precision acoustic French doors, heavy pivot systems, and concealed hinges.',
            teamAlphaMembers,
            'Marcus Vance',
            'USR-INS-01'
          )
        );
      }

      if (teamBravoMembers.length > 0) {
        teams.push(
          buildTeamRecord(
            'team-bravo',
            'BRAVO',
            'Team Bravo - Smart Lock & Heavy Entry Squad',
            'Team Bravo',
            ['Smart Lock Biometrics & RFID', 'Grand Villa Steel Doors', 'Multi-Point Deadbolts'],
            'Elite 3-person heavy security squad specialized in biometric smart handle integration, armored villa doors, and rapid response.',
            teamBravoMembers,
            'Derrick Bruce',
            'USR-INS-04'
          )
        );
      }

      for (const [customId, meta] of customTeamMeta.entries()) {
        const customMembers = mappedInstallers.filter(i => i.teamId === customId);
        if (customMembers.length > 0) {
          teams.push(
            buildTeamRecord(
              meta.id,
              meta.code,
              meta.name,
              `Team ${meta.code}`,
              meta.specialties,
              meta.description,
              customMembers,
              customMembers[0].name,
              customMembers[0].id
            )
          );
        }
      }

      this.installerTeams.set(teams);
    }

    // Map each dispatcher user to their respective branch (checking explicit shopId reference first)
    const dispatcherUsers = userList.filter(u => u.role === 'dispatcher');
    this.dispatchers.set(dispatcherUsers.map((u, idx) => {
      const assignedByRef = this.getUserAssignedBranch(u);
      const branchKey = u.id.replace('USR-DSP-', '').toLowerCase();
      const matchedBranch = assignedByRef || branches.find(b => {
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
        shopId: matchedBranch?.id ? String(matchedBranch.id) : undefined,
        branchCode: matchedBranch?.branchCode || 'DM-GH-OBY',
        branchName: matchedBranch?.shopName || 'DoorMaster Obeyeyie Branch',
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
  // TEAMS, SQUAD POSITIONS & ROLES SYNC (MySQL Persisted)
  // ============================================================================

  async loadTeamsFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/teams');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.teams)) {
          this.dbTeams.set(data.teams);
          this.hasSyncedTeamsFromApi.set(true);
          this.deriveInstallersAndDispatchersFromUsers();
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load teams from backend:', err);
    }
  }

  async loadRolesFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/roles');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.roles) && data.roles.length > 0) {
          this.roles.set(data.roles);
          if (typeof window !== 'undefined') {
            try {
              window.localStorage.setItem('doormaster_roles', JSON.stringify(data.roles));
            } catch {
              // ignore storage write failure
            }
          }
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load roles from backend:', err);
    }
  }

  /**
   * Returns live synced team & position info for any user record.
   */
  getUserTeamInfo(user?: {
    id: string;
    teamId?: string | null;
    teamRole?: string | null;
    teamPosition?: string | null;
  } | null): {
    team: InstallerTeam | null;
    teamId: string | null;
    teamName: string | null;
    teamCode: string | null;
    position: string | null;
    isLead: boolean;
    color: string;
  } {
    if (!user) {
      return { team: null, teamId: null, teamName: null, teamCode: null, position: null, isLead: false, color: 'indigo' };
    }
    const teams = this.installerTeams();
    for (const t of teams) {
      const member = t.members.find(m => m.id === user.id);
      if (member) {
        const isLead = member.role === 'lead' || !!member.isTeamLead || t.leadId === user.id;
        return {
          team: t,
          teamId: t.id,
          teamName: t.name,
          teamCode: t.code,
          position: member.position || user.teamPosition || (isLead ? 'Team Lead' : 'Installation Installer'),
          isLead,
          color: t.color || (t.id === 'team-bravo' ? 'amber' : 'indigo')
        };
      }
    }
    if (user.teamId) {
      const matched = teams.find(t => t.id === user.teamId);
      if (matched) {
        const isLead = user.teamRole === 'lead' || matched.leadId === user.id;
        return {
          team: matched,
          teamId: matched.id,
          teamName: matched.name,
          teamCode: matched.code,
          position: user.teamPosition || (isLead ? 'Team Lead' : 'Installation Installer'),
          isLead,
          color: matched.color || (matched.id === 'team-bravo' ? 'amber' : 'indigo')
        };
      }
    }
    return {
      team: null,
      teamId: null,
      teamName: null,
      teamCode: null,
      position: user.teamPosition || null,
      isLead: user.teamRole === 'lead',
      color: 'slate'
    };
  }

  async createInstallerTeam(input: {
    name: string;
    code?: string;
    description?: string;
    specialties?: string[];
    positions?: string[];
    color?: string;
    leadId?: string;
    members?: { userId: string; position?: string; teamRole?: 'lead' | 'assistant' }[];
  }): Promise<{ success: boolean; message: string; team?: InstallerTeam }> {
    try {
      const res = await this.apiFetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.teams)) {
          this.dbTeams.set(data.teams);
          this.hasSyncedTeamsFromApi.set(true);
        }
        await this.loadUsers();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('teams');
        return {
          success: true,
          message: data.message || `Team "${input.name}" created and synced.`,
          team: data.team
        };
      }
      return { success: false, message: data.message || 'Could not create team.' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Network error creating team.' };
    }
  }

  async updateInstallerTeam(
    teamId: string,
    input: {
      name?: string;
      code?: string;
      description?: string;
      specialties?: string[];
      positions?: string[];
      color?: string;
      status?: string;
      leadId?: string | null;
    }
  ): Promise<{ success: boolean; message: string; team?: InstallerTeam }> {
    try {
      const res = await this.apiFetch(`/api/teams/${teamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.teams)) {
          this.dbTeams.set(data.teams);
          this.hasSyncedTeamsFromApi.set(true);
        }
        await this.loadUsers();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('teams');
        return {
          success: true,
          message: data.message || 'Team settings updated and synced.',
          team: data.team
        };
      }
      return { success: false, message: data.message || 'Could not update team.' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Network error updating team.' };
    }
  }

  async deleteInstallerTeam(teamId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await this.apiFetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.teams)) {
          this.dbTeams.set(data.teams);
          this.hasSyncedTeamsFromApi.set(true);
        }
        await this.loadUsers();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('teams');
        return {
          success: true,
          message: data.message || 'Team deleted and members unassigned.'
        };
      }
      return { success: false, message: data.message || 'Could not delete team.' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Network error deleting team.' };
    }
  }

  async upsertTeamMember(
    teamId: string,
    payload: {
      userId: string;
      position?: string;
      teamRole?: 'lead' | 'assistant';
    }
  ): Promise<{ success: boolean; message: string; team?: InstallerTeam }> {
    try {
      const res = await this.apiFetch(`/api/teams/${teamId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.teams)) {
          this.dbTeams.set(data.teams);
          this.hasSyncedTeamsFromApi.set(true);
        }
        await this.loadUsers();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('teams');
        return {
          success: true,
          message: data.message || 'Team member & position synced.',
          team: data.team
        };
      }
      return { success: false, message: data.message || 'Could not update team member.' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Network error updating team member.' };
    }
  }

  async removeTeamMember(
    teamId: string,
    userId: string
  ): Promise<{ success: boolean; message: string; team?: InstallerTeam }> {
    try {
      const res = await this.apiFetch(`/api/teams/${teamId}/members/${userId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.teams)) {
          this.dbTeams.set(data.teams);
          this.hasSyncedTeamsFromApi.set(true);
        }
        await this.loadUsers();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('teams');
        return {
          success: true,
          message: data.message || 'Member removed from team.',
          team: data.team
        };
      }
      return { success: false, message: data.message || 'Could not remove member from team.' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Network error removing member from team.' };
    }
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

  async loadClientsFromBackend(): Promise<void> {
    try {
      const res = await this.apiFetch('/api/clients');
      if (res.ok) {
        const responseData = await res.json();
        if (responseData.success && Array.isArray(responseData.clients)) {
          this.clients.set(responseData.clients);
          console.log(`[Store] Synced ${responseData.clients.length} normalized clients from MySQL`);
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load clients from backend:', err);
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

    const rawBooking = dbJob.shopBooking || {
      bookedByShopManager: 'DoorMaster Master Shop Manager',
      shopId: dbJob.shopId || undefined,
      shopBranch: dbJob.shopBranch || 'Accra Flagship Showroom',
      branchCode: dbJob.shopBranchCode || undefined,
      bookingTimestamp: dbJob.createdAt || new Date().toISOString(),
      lockModelRequested: dbJob.lockModel || 'Doormaster High-Security Smart Lock',
      amountPaidAtShop: Number(dbJob.depositAmount) || 0,
      paymentMethod: 'momo',
      receiptNumber: `REC-${dbJob.jobNumber || 'LIVE'}`,
      paymentStatus: Number(dbJob.balanceDue) <= 0 ? 'paid_in_full' : 'deposit_paid',
      accountantVerified: true
    };
    const shopBooking: ShopBookingDetails = {
      ...rawBooking,
      shopId: rawBooking.shopId || dbJob.shopId || undefined,
      branchCode: rawBooking.branchCode || dbJob.shopBranchCode || undefined,
      shopBranch: rawBooking.shopBranch || dbJob.shopBranch || 'Accra Flagship Showroom'
    };

    const technicianSiteFunds = dbJob.technicianSiteFunds || {
      amount: 250,
      purpose: 'Site visit travel allowance & smart lock installation kit stipend',
      status: 'pending_dispatch'
    };

    const financials = dbJob.financials || {
      doorPrice: 0,
      installationFee: Number(dbJob.depositAmount) || 500,
      laborCost: 450,
      bonusAmount: 220,
      bonusStatus: 'pending',
      depositPaid: (Number(dbJob.depositAmount) || 0) > 0,
      balancePaid: (Number(dbJob.balanceDue) || 0) <= 0
    };

    const mappedAssignedIds = new Set<string>();
    if (Array.isArray(dbJob.assignedInstallerIds) && dbJob.assignedInstallerIds.length > 0) {
      dbJob.assignedInstallerIds.forEach((id: any) => { if (id) mappedAssignedIds.add(String(id)); });
    } else if (dbJob.assignedInstallerId) {
      mappedAssignedIds.add(String(dbJob.assignedInstallerId));
    }

    const rawDbInstallers = (dbJob.assignedInstallers || (dbJob.assignedInstallerId ? [{ id: dbJob.assignedInstallerId, name: dbJob.assignedInstallerName || 'Installer', role: 'lead' }] : []));
    const filteredDbInstallers = mappedAssignedIds.size > 0
      ? rawDbInstallers.filter((m: any) => mappedAssignedIds.has(String(m.id)))
      : rawDbInstallers;

    return {
      id: dbJob.jobNumber || dbJob.id || `DM-${Date.now()}`,
      title: dbJob.title || `${dbJob.doorName || 'Door Installation'} - ${dbJob.clientName || 'Client'}`,
      clientId: dbJob.clientId || client.id,
      doorId: dbJob.doorId || undefined,
      doorModel: dbJob.doorName || 'Architectural Door Slab',
      doorCategory: dbJob.doorCategory || 'General Doors',
      doors: dbJob.doors || undefined,
      lockModel: dbJob.lockModel || 'Doormaster High-Security Smart Lock Handle',
      dimensions: dbJob.doorDimensions || '2100 × 900 × 50mm',
      finish: dbJob.finish || 'Architectural Finish',
      hardwareSpecs: dbJob.hardwareSpecs || 'DormaKaba Heavy Duty Pivot, 3-point magnetic mortise lock',
      shopId: dbJob.shopId || shopBooking.shopId || undefined,
      shopBranchCode: dbJob.shopBranchCode || shopBooking.branchCode || undefined,
      shopBranch: dbJob.shopBranch || 'Accra Flagship Showroom',
      createdByUserId: dbJob.createdByUserId || undefined,
      client,
      shopBooking,
      technicianSiteFunds,
      logisticsTruck: dbJob.logisticsTruck || undefined,
      dispatcherId: dbJob.assignedDriverId || null,
      dispatcherName: dbJob.assignedDriverName || null,
      driverAssignmentStatus: dbJob.driverAssignmentStatus || 'pending',
      driverAssignedAt: dbJob.driverAssignedAt || dbJob.logisticsTruck?.driverAssignedAt,
      driverDeadlineAt: dbJob.driverDeadlineAt || dbJob.logisticsTruck?.driverDeadlineAt || ((dbJob.driverAssignmentStatus === 'pending' || !dbJob.driverAssignmentStatus) && (dbJob.assignedDriverId || dbJob.dispatcherId || dbJob.logisticsTruck?.dispatcherId)
        ? new Date((dbJob.driverAssignedAt ? new Date(dbJob.driverAssignedAt).getTime() : Date.now()) + 10 * 60 * 1000).toISOString()
        : undefined),
      driverAutoAccepted: dbJob.driverAutoAccepted ?? dbJob.logisticsTruck?.driverAutoAccepted ?? false,
      driverRejectReason: dbJob.driverRejectReason || dbJob.logisticsTruck?.driverRejectReason,
      driverProposedSlot: dbJob.driverProposedSlot || dbJob.logisticsTruck?.driverProposedSlot,
      driverRespondedAt: dbJob.driverRespondedAt || dbJob.logisticsTruck?.driverRespondedAt,
      assignedInstallerId: dbJob.assignedInstallerId || null,
      assignedInstallerName: dbJob.assignedInstallerName || null,
      assignedInstallerIds: dbJob.assignedInstallerIds || (dbJob.assignedInstallerId ? [dbJob.assignedInstallerId] : []),
      assignedInstallerNames: dbJob.assignedInstallerNames || (dbJob.assignedInstallerName ? dbJob.assignedInstallerName.split(', ') : []),
      assignedInstallers: filteredDbInstallers.map((m: any) => ({
        ...m,
        deadlineAt: m.deadlineAt || dbJob.installerDeadlineAt || (dbJob.shopBooking as any)?.installerMeta?.installerDeadlineAt || ((dbJob.installerAssignmentStatus === 'pending' || !dbJob.installerAssignmentStatus)
          ? new Date((dbJob.installerAssignedAt ? new Date(dbJob.installerAssignedAt).getTime() : Date.now()) + 10 * 60 * 1000).toISOString()
          : undefined)
      })),
      installerAssignmentStatus: dbJob.installerAssignmentStatus || 'pending',
      installerAssignedAt: dbJob.installerAssignedAt || (dbJob.shopBooking as any)?.installerMeta?.installerAssignedAt || (dbJob as any).assignedInstallers?.[0]?.assignedAt || dbJob.assignedAt,
      installerDeadlineAt: dbJob.installerDeadlineAt || (dbJob.shopBooking as any)?.installerMeta?.installerDeadlineAt || (dbJob as any).assignedInstallers?.[0]?.deadlineAt || ((dbJob.installerAssignmentStatus === 'pending' || !dbJob.installerAssignmentStatus) && (dbJob.assignedInstallerId || (dbJob.assignedInstallers && dbJob.assignedInstallers.length > 0))
        ? new Date((dbJob.installerAssignedAt ? new Date(dbJob.installerAssignedAt).getTime() : Date.now()) + 10 * 60 * 1000).toISOString()
        : undefined),
      installerAutoAccepted: dbJob.installerAutoAccepted ?? (dbJob.shopBooking as any)?.installerMeta?.installerAutoAccepted ?? (dbJob as any).assignedInstallers?.[0]?.autoAccepted ?? false,
      installerRejectReason: dbJob.installerRejectReason || (dbJob.shopBooking as any)?.installerMeta?.installerRejectReason,
      installerProposedSlot: dbJob.installerProposedSlot || (dbJob.shopBooking as any)?.installerMeta?.installerProposedSlot,
      installerRespondedAt: dbJob.installerRespondedAt || (dbJob.shopBooking as any)?.installerMeta?.installerRespondedAt || (dbJob as any).assignedInstallers?.[0]?.respondedAt,
      rejectedByInstallerName: dbJob.rejectedByInstallerName || (dbJob.shopBooking as any)?.installerMeta?.rejectedByInstallerName,
      acceptedAt: dbJob.acceptedAt || (dbJob.shopBooking as any)?.installerMeta?.acceptedAt,
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

      const resolvedShopId = job.shopId || job.shopBooking?.shopId || this.resolveJobBranchId(job) || null;
      const resolvedBranchObj = resolvedShopId
        ? this.branches().find(b => String(b.id ?? b.branchCode) === resolvedShopId)
        : null;
      const resolvedBranchCode = job.shopBranchCode || job.shopBooking?.branchCode || resolvedBranchObj?.branchCode || null;

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
          shopId: resolvedShopId,
          shopBranchCode: resolvedBranchCode,
          shopBranch: job.shopBranch,
          createdByUserId: job.createdByUserId || null,
          depositAmount: job.shopBooking?.amountPaidAtShop ?? (job.financials?.depositPaid ? ((job.financials?.installationFee || 0) + (job.financials?.laborCost || 0)) : 0),
          balanceDue: Math.max(0, ((job.financials?.installationFee || 0) + (job.financials?.laborCost || 0)) - (job.shopBooking?.amountPaidAtShop || 0)),
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
          installerAssignedAt: job.installerAssignedAt || job.assignedAt || undefined,
          installerDeadlineAt: job.installerDeadlineAt || undefined,
          installerAutoAccepted: job.installerAutoAccepted ?? false,
          installerRejectReason: job.installerRejectReason || undefined,
          installerProposedSlot: job.installerProposedSlot || undefined,
          installerRespondedAt: job.installerRespondedAt || undefined,
          rejectedByInstallerName: job.rejectedByInstallerName || undefined,
          acceptedAt: job.acceptedAt || undefined,
          operationsApproved: job.operationsApproved || false,
          scheduledTime: job.scheduledDate,
          notes,
          doors: job.doors || null,
          client: job.client || null,
          shopBooking: job.shopBooking
            ? {
                ...job.shopBooking,
                installerMeta: {
                  ...((job.shopBooking as any).installerMeta || {}),
                  installerAssignedAt: job.installerAssignedAt || job.assignedAt,
                  installerDeadlineAt: job.installerDeadlineAt,
                  installerAutoAccepted: job.installerAutoAccepted ?? false,
                  installerRejectReason: job.installerRejectReason,
                  installerProposedSlot: job.installerProposedSlot,
                  installerRespondedAt: job.installerRespondedAt,
                  rejectedByInstallerName: job.rejectedByInstallerName,
                  acceptedAt: job.acceptedAt
                }
              }
            : null,
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
      await Promise.all([
        this.loadJobsFromBackend(),
        this.loadClientsFromBackend()
      ]);
      this.broadcastDataChanged('jobs');
    } catch (err) {
      console.warn('[Store] Could not persist job to backend:', err);
    }
  }

  async deleteJob(jobId: string): Promise<boolean> {
    try {
      const res = await this.apiFetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
        method: 'DELETE'
      });
      const data = await res.json().catch(() => null);
      this.jobs.update(list => list.filter(j => j.id !== jobId));
      this.saveJobsLocally();
      await Promise.all([
        this.loadJobsFromBackend(),
        this.loadClientsFromBackend()
      ]);
      this.broadcastDataChanged('jobs');
      return data?.success ?? true;
    } catch (err) {
      console.warn('[Store] Failed deleting job from backend:', err);
      return false;
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
          const mapped: NotificationItem[] = responseData.notifications.map((n: any) =>
            this.normalizeNotificationForShopManager({
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
            })
          );
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
        const responseData = await res.json();
        if (responseData.success && Array.isArray(responseData.users)) {
          this.users.set(responseData.users);
          this.deriveInstallersAndDispatchersFromUsers();
          console.log(`[Store] Synced ${responseData.users.length} users from database`);
          return;
        }
      }
    } catch (err) {
      console.warn('[Store] Could not load users from backend:', err);
    }
  }

  async approveUser(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' })
      });
      const responseData = await res.json();
      if (responseData.success) {
        this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'active' } : u));
        await this.loadUsers();
        await this.loadTeamsFromBackend();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('users');
        const target = this.users().find(u => u.id === userId);
        this.createNotification({
          recipientRole: 'manager',
          title: 'User Registration Approved',
          message: `${target?.name || 'User'} has been approved and activated. They can now access DoorMaster Ops.`,
          type: 'job_assigned',
          jobId: ''
        });
        return { success: true, message: responseData.message || `Account for ${target?.name || 'user'} activated.` };
      }
      return { success: false, message: responseData.message || 'Could not activate user account.' };
    } catch (err) {
      console.warn('[Store] Failed approving user via API:', err);
      return { success: false, message: (err as Error).message || 'Failed approving user.' };
    }
  }

  async rejectUser(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      const responseData = await res.json();
      if (responseData.success) {
        this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
        await this.loadUsers();
        await this.loadTeamsFromBackend();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('users');
        return { success: true, message: responseData.message || 'Registration request rejected.' };
      }
      return { success: false, message: responseData.message || 'Could not reject user request.' };
    } catch (err) {
      console.warn('[Store] Failed rejecting user via API:', err);
      return { success: false, message: (err as Error).message || 'Failed rejecting user.' };
    }
  }

  async deactivateUser(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'deactivated' })
      });
      const responseData = await res.json();
      if (responseData.success) {
        this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'deactivated' } : u));
        await this.loadUsers();
        await this.loadTeamsFromBackend();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('users');
        const target = this.users().find(u => u.id === userId);
        this.createNotification({
          recipientRole: 'manager',
          title: 'Account Deactivated',
          message: `User ${target?.name || userId} has been deactivated. Sign-in access revoked.`,
          type: 'job_assigned',
          jobId: ''
        });
        return { success: true, message: responseData.message || `Account for ${target?.name || 'user'} deactivated.` };
      }
      return { success: false, message: responseData.message || 'Could not deactivate user account.' };
    } catch (err) {
      console.warn('[Store] Failed deactivating user via API:', err);
      return { success: false, message: (err as Error).message || 'Failed deactivating user.' };
    }
  }

  async activateUser(userId: string): Promise<{ success: boolean; message: string }> {
    return this.approveUser(userId);
  }

  async addNewUser(userData: {
    name: string;
    email: string;
    role: RoleType | string;
    phone: string;
    shopId?: string | null;
    teamId?: string | null;
    teamRole?: string | null;
    teamPosition?: string | null;
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
          shopId: responseData.user.shopId ?? userData.shopId ?? null,
          teamId: responseData.user.teamId ?? userData.teamId ?? null,
          teamRole: responseData.user.teamRole ?? userData.teamRole ?? null,
          teamPosition: responseData.user.teamPosition ?? userData.teamPosition ?? null,
          status: responseData.user.status || 'active',
          avatarUrl: responseData.user.avatarUrl,
          createdAt: responseData.user.createdAt
        };
        this.users.update(list => [newUser, ...list.filter(u => u.id !== newUser.id)]);
        await this.loadUsers();
        await this.loadTeamsFromBackend();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('users');

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

  async deleteUserAccount(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await this.apiFetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
      const responseData = await res.json();
      if (responseData.success) {
        this.users.update(list => list.filter(u => u.id !== userId));
        await this.loadUsers();
        await this.loadTeamsFromBackend();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('users');
        return { success: true, message: responseData.message || 'User account deleted successfully.' };
      }
      return { success: false, message: responseData.message || 'Could not delete user account.' };
    } catch (err) {
      console.warn('[Store] Failed deleting user via API:', err);
      return { success: false, message: (err as Error).message || 'Failed deleting user.' };
    }
  }

  async updateUserAccount(
    userId: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      role?: RoleType | string;
      shopId?: string | null;
      teamId?: string | null;
      teamRole?: string | null;
      teamPosition?: string | null;
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
          shopId: responseData.user.shopId ?? null,
          teamId: responseData.user.teamId ?? null,
          teamRole: responseData.user.teamRole ?? null,
          teamPosition: responseData.user.teamPosition ?? null,
          status: responseData.user.status || 'active',
          avatarUrl: responseData.user.avatarUrl,
          createdAt: responseData.user.createdAt,
          updatedAt: responseData.user.updatedAt
        };
        this.users.update(list => list.map(u => (u.id === userId ? { ...u, ...updated } : u)));
        await this.loadUsers();
        await this.loadTeamsFromBackend();
        this.deriveInstallersAndDispatchersFromUsers();
        this.broadcastDataChanged('users');

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
    }

    if (session.targetUser.shopId || session.targetRole === 'shop_manager' || session.targetRole === 'dispatcher') {
      const matched = this.getUserAssignedBranch(session.targetUser);
      if (matched) {
        this.shopLocation.set({
          ...matched,
          managerName: session.targetRole === 'shop_manager' ? (session.targetUser.name || matched.managerName) : matched.managerName,
          managerEmail: session.targetRole === 'shop_manager' ? (session.targetUser.email || matched.managerEmail) : matched.managerEmail,
          phone: session.targetRole === 'shop_manager' ? (session.targetUser.phone || matched.phone) : matched.phone
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
      shopId: this.currentUser().shopId ?? null,
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

    if (session.originalUser.shopId || session.originalRole === 'shop_manager' || session.originalRole === 'dispatcher') {
      const matched = this.getUserAssignedBranch(session.originalUser);
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
          const assigned = this.userAssignedShop();
          if (!assigned) {
            this.shopLocation.set(loc);
          }
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
          const matchedBranch = this.findBranchForUser(this.currentUser());
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
    const baseBranch = (this.currentRole() === 'shop_manager' && this.managerBranch())
      ? this.managerBranch()!
      : this.shopLocation();
    const updated: ShopLocationSettings = {
      ...baseBranch,
      ...settings,
      updatedAt: new Date().toISOString()
    };

    this.shopLocation.set(updated);
    this.branches.update(list =>
      list.map(b =>
        (updated.id && b.id === updated.id) || (updated.branchCode && b.branchCode === updated.branchCode)
          ? { ...b, ...updated }
          : b
      )
    );

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

      const targetShopMgr = this.currentRole() === 'shop_manager'
        ? this.currentUser()
        : this.resolveShopManagerForBranch(updated);

      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: targetShopMgr?.id,
        title: 'Shop Location Settings Saved',
        message: `${updated.shopName} location & coordinates saved to database.`,
        type: 'job_assigned',
        jobId: ''
      });

      await Promise.all([
        this.loadBranchesFromBackend(),
        this.loadShopLocationFromBackend()
      ]);
      this.broadcastDataChanged('branches');

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
   * Operations Manager assigns an installer to a door installation job.
   * Dispatches in-app notification & SMS to the installer with a 10-minute action window.
   */
  assignInstaller(jobId: string, installerId: string) {
    if (!this.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!this.ensureAccountVerified(jobId, 'assign installers')) return;
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
            position: installer.teamPosition || 'Team Lead',
            avatar: installer.avatarUrl,
            teamId: installer.teamId,
            teamName: installer.teamName,
            isTeamLead: installer.isTeamLead,
            avgRating: installer.metrics.avgRating,
            status: 'pending',
            assignedAt: now,
            deadlineAt: deadline
          }],
          assignedAt: now,
          installerAssignedAt: now,
          installerDeadlineAt: deadline,
          installerAssignmentStatus: 'pending',
          installerAutoAccepted: false,
          installerRejectReason: undefined,
          installerProposedSlot: undefined,
          installerRespondedAt: undefined,
          rejectedByInstallerName: undefined,
          status: job.dispatcherId ? 'truck_assigned' : 'assigned'
        };
        return updatedJob;
      }
      return job;
    }));

    this.dismissReassignmentPopup(jobId);
    this.currentInstallerId.set(installer.id);

    if (updatedJob) {
      this.persistJobToBackend(updatedJob);
      this.saveJobsLocally();

      this.installers.update(techs => techs.map(t => {
        if (t.id === installer.id) {
          return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
        }
        return t;
      }));

      const assigner = 'Operations Manager';

      // In-App Notification to Field Installer
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: installer.id,
        title: 'New Installation Assigned (10-Min Action Required)',
        message: `${assigner} assigned you to install ${updatedJob.doorModel} for ${updatedJob.client.name} (${updatedJob.client.siteAddress}). Scheduled: ${updatedJob.scheduledDate}. Please Accept or Decline within 10 minutes, otherwise auto-accepted for you.`,
        type: 'job_assigned',
        jobId: jobId,
        actionLabel: 'Accept or Decline'
      });

      // Notify Shop Manager (scoped to job's branch)
      const branchShopMgr = this.resolveShopManagerForJob(updatedJob);
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: branchShopMgr?.id,
        title: updatedJob.dispatcherId ? 'Installer Assigned by Operations' : 'Installer Assigned — Select Dispatcher',
        message: updatedJob.dispatcherId
          ? `Operations Manager assigned ${installer.name} to job ${jobId} (${updatedJob.doorModel}) for ${updatedJob.client.name}. 10-minute installer acceptance countdown active.`
          : `Operations Manager assigned ${installer.name} to job ${jobId} (${updatedJob.doorModel}). Please select a dispatcher to deliver the door and hardware to site.`,
        type: 'truck_assigned',
        jobId: jobId,
        actionLabel: updatedJob.dispatcherId ? 'View Order' : 'Select Dispatcher'
      });

      // Notify Client
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: updatedJob.client.id,
        title: 'Installer Assigned',
        message: `Installer ${installer.name} has been assigned to your installation of ${updatedJob.doorModel}. Scheduled: ${updatedJob.scheduledDate}.`,
        type: 'job_assigned',
        jobId: jobId
      });

      // SMS to Field Installer
      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: installer.phone,
        recipientName: installer.name,
        triggerEvent: 'installer_assigned',
        messageText: `DoorMaster SMS: ${assigner} assigned you to install ${updatedJob.doorModel} (${jobId}). Scheduled: ${updatedJob.scheduledDate} at ${updatedJob.client.siteAddress}. Please accept or reject within 10 mins if unavailable, else auto-accepted for you.`,
        jobId
      });
    }
  }

  /**
   * Field Installer accepts the assigned installation job.
   */
  acceptInstallation(jobId: string) {
    if (!this.ensureAccountVerified(jobId, 'accept this installation')) return;
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
        message: `DoorMaster installer ${updatedJob.assignedInstallerName || 'Marcus Vance'} has confirmed and accepted your installation of ${updatedJob.doorModel}. Scheduled date: ${updatedJob.scheduledDate}.`,
        type: 'installer_accepted',
        jobId: jobId,
        actionLabel: 'View Installation Schedule'
      });

      this.createNotification({
        recipientRole: 'manager',
        title: 'Installer Accepted Job',
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
   * Each installer in a team uniquely accepts or rejects the task separately.
   */
  respondInstallerAssignment(
    jobId: string, 
    accepted: boolean, 
    reason?: string, 
    proposedSlot?: string,
    targetInstallerId?: string
  ) {
    if (!this.ensureAccountVerified(jobId, 'respond to this assignment')) return;
    const currentJob = this.jobs().find(j => j.id === jobId);
    if (!currentJob) return;

    const now = new Date().toISOString();
    let updatedJob: InstallationJob | undefined;

    // Resolve the responding installer uniquely
    const myIds = this.resolveActiveInstallerIds();
    const currentTeam: AssignedInstallerTeamMember[] = (currentJob.assignedInstallers && currentJob.assignedInstallers.length > 0)
      ? [...currentJob.assignedInstallers]
      : (currentJob.assignedInstallerId ? [{
          id: currentJob.assignedInstallerId,
          name: currentJob.assignedInstallerName || 'Installer',
          role: 'lead' as const,
          status: currentJob.installerAssignmentStatus || 'pending',
          assignedAt: currentJob.installerAssignedAt,
          deadlineAt: currentJob.installerDeadlineAt
        }] : []);

    const assignedIds = new Set<string>();
    if (Array.isArray(currentJob.assignedInstallerIds) && currentJob.assignedInstallerIds.length > 0) {
      currentJob.assignedInstallerIds.forEach(id => { if (id) assignedIds.add(id); });
    } else if (currentJob.assignedInstallerId) {
      assignedIds.add(currentJob.assignedInstallerId);
    }

    const respondingMember = currentTeam.find(m =>
      ((targetInstallerId && m.id === targetInstallerId) || myIds.has(m.id)) &&
      (assignedIds.size === 0 || assignedIds.has(m.id))
    );

    if (!respondingMember) return;
    const responderId = respondingMember.id;
    const responderName = respondingMember.name || 'Installer';

    if (accepted) {
      this.jobs.update(list => list.map(job => {
        if (job.id === jobId) {
          const team = (job.assignedInstallers && job.assignedInstallers.length > 0)
            ? job.assignedInstallers
            : currentTeam;

          const updatedTeam = team.map(member => {
            if (member.id === responderId) {
              return {
                ...member,
                status: 'accepted',
                respondedAt: now,
                autoAccepted: false
              };
            }
            return member;
          });

          const anyPending = updatedTeam.some(m => !m.status || m.status === 'pending');

          updatedJob = {
            ...job,
            assignedInstallers: updatedTeam,
            installerAssignmentStatus: anyPending ? 'pending' : 'accepted',
            installerAutoAccepted: false,
            installerRespondedAt: now,
            acceptedAt: now,
            status: (job.status === 'booked_at_shop' || job.status === 'assigned') ? 'accepted' : job.status
          };
          return updatedJob;
        }
        return job;
      }));

      // Update technician availability
      this.installers.update(techs => techs.map(t => {
        if (t.id === responderId) {
          return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
        }
        return t;
      }));

      this.saveJobsLocally();
      if (updatedJob) this.persistJobToBackend(updatedJob);

      // 1. In-App Notification to the responding Field Installer ONLY
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: responderId,
        title: 'Installation Confirmed & Accepted',
        message: `You confirmed and accepted installation for ${currentJob.doorModel} (${currentJob.client.name} at ${currentJob.client.siteAddress}). Order activated for site arrival.`,
        type: 'installer_accepted',
        jobId: jobId,
        actionLabel: 'View Work Order'
      });

      // 2. In-App Notification to Shop Manager (scoped to the job's branch)
      const branchShopMgr = this.resolveShopManagerForJob(currentJob);
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: branchShopMgr?.id,
        title: currentJob.dispatcherId ? 'Installer Confirmed Installation' : 'Installer Confirmed — Select Dispatcher',
        message: currentJob.dispatcherId
          ? `Installer ${responderName} confirmed and accepted installation for ${currentJob.doorModel} at ${currentJob.client.siteAddress}.`
          : `Installer ${responderName} confirmed installation for ${currentJob.doorModel} at ${currentJob.client.siteAddress}. Please select a dispatcher for delivery.`,
        type: 'installer_accepted',
        jobId: jobId,
        actionLabel: currentJob.dispatcherId ? 'View Order' : 'Select Dispatcher'
      });

      // 3. In-App Notification to Operations Manager
      this.createNotification({
        recipientRole: 'manager',
        title: 'Installer Confirmed Installation Assignment',
        message: `Installer ${responderName} confirmed and accepted installation for ${currentJob.doorModel} to ${currentJob.client.name}.`,
        type: 'installer_accepted',
        jobId: jobId
      });

      // 4. In-App Notification to Client (first confirmed installer)
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: currentJob.client.id,
        title: 'Installer Confirmed for Your Installation',
        message: `Installer ${responderName} has confirmed and accepted your door installation assignment.`,
        type: 'installer_accepted',
        jobId: jobId
      });

      // 5. SMS to Manager
      this.sendSms({
        recipientRole: 'manager',
        recipientName: 'Operations Manager',
        triggerEvent: 'installer_accepted',
        messageText: `DoorMaster SMS: Installer ${responderName} confirmed installation for job ${jobId} (${currentJob.doorModel}). Scheduled: ${currentJob.scheduledDate}.`,
        jobId
      });

      this.alert.toastSuccess('Installation Accepted', `You confirmed installation for ${currentJob.doorModel}.`);
    } else {
      // Installer REJECTED: Enforce 10-minute rejection limit for this installer!
      const deadlineStr = respondingMember.deadlineAt || currentJob.installerDeadlineAt;
      if (deadlineStr) {
        const deadline = new Date(deadlineStr).getTime();
        if (deadline <= Date.now()) {
          this.alert.toastWarning('Rejection Window Expired', 'You can only reject an installation within 10 minutes of assignment. This task has already been auto-accepted for you.');
          return;
        }
      }

      const rejectReason = reason || 'Installer unavailable / schedule conflict';

      this.jobs.update(list => list.map(job => {
        if (job.id === jobId) {
          const team = (job.assignedInstallers && job.assignedInstallers.length > 0)
            ? job.assignedInstallers
            : currentTeam;

          const updatedTeam = team.map(member => {
            if (member.id === responderId) {
              return {
                ...member,
                status: 'rejected',
                rejectReason: rejectReason,
                proposedSlot: proposedSlot,
                respondedAt: now
              };
            }
            return member;
          });

          const allRejected = updatedTeam.every(m => m.status === 'rejected');

          updatedJob = {
            ...job,
            installerAssignmentStatus: allRejected ? 'rejected' : job.installerAssignmentStatus,
            installerRejectReason: rejectReason,
            installerProposedSlot: proposedSlot,
            installerRespondedAt: now,
            rejectedByInstallerName: responderName,
            assignedInstallers: updatedTeam,
            status: allRejected ? (job.dispatcherId ? 'truck_assigned' : 'booked_at_shop') : job.status
          };
          return updatedJob;
        }
        return job;
      }));

      // Free ONLY the declining installer
      this.installers.update(techs => techs.map(t => {
        if (t.id === responderId) {
          return { ...t, activeJobId: null, availabilityStatus: 'available' };
        }
        return t;
      }));

      const teamAfter = updatedJob?.assignedInstallers || [];
      const allRejected = teamAfter.length > 0 && teamAfter.every(m => m.status === 'rejected');

      // Trigger Operations Manager immediate Re-Assignment Popup
      this.openReassignmentPopup(jobId);

      this.saveJobsLocally();
      if (updatedJob) this.persistJobToBackend(updatedJob);

      // In-App Notification to Operations Manager (with popup action)
      this.createNotification({
        recipientRole: 'manager',
        title: allRejected
          ? 'All Assigned Installers Declined — Immediate Re-Assignment Required'
          : `Installer ${responderName} Declined Task Assignment`,
        message: `Installer ${responderName} declined job ${jobId} (${currentJob.doorModel} for ${currentJob.client.name}). Reason: "${rejectReason}". ${allRejected ? 'All assigned installers have declined. Please re-assign another team.' : 'Other assigned installer(s) remain on the job. Re-assign a replacement installer if desired.'}`,
        type: 'job_assigned',
        jobId: jobId,
        actionLabel: 'Select Team'
      });

      // Notify Shop Manager of branch
      const branchShopMgr = this.resolveShopManagerForJob(currentJob);
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: branchShopMgr?.id,
        title: 'Installer Declined — Operations Reassigning',
        message: `Installer ${responderName} declined job ${jobId} (${currentJob.doorModel} for ${currentJob.client.name}). Operations Manager has been alerted to re-assign if needed.`,
        type: 'job_assigned',
        jobId: jobId
      });

      // SMS Notification to Operations Manager
      this.sendSms({
        recipientRole: 'manager',
        recipientName: 'Operations Manager',
        triggerEvent: 'installer_rejected',
        messageText: `DoorMaster Urgent SMS: Installer ${responderName} rejected installation for ${jobId} (${currentJob.doorModel}). Reason: ${rejectReason}.`,
        jobId
      });

      // In-App Notification ONLY to the declining installer
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: responderId,
        title: 'Installation Run Declined & Returned for Reassignment',
        message: `You declined installation for ${jobId} (${currentJob.doorModel}). Operations Manager has been alerted with a popup to re-assign another installer.`,
        type: 'job_assigned',
        jobId: jobId
      });

      this.alert.toastWarning('Installation Declined', 'Installation assignment declined and returned to Operations Manager for reassignment.');
    }
  }

  /**
   * DoorMaster Shop Manager marks door and hardware ready & dispatched to site
   */
  dispatchDoor(jobId: string) {
    if (!this.ensureAccountVerified(jobId, 'dispatch this door')) return;
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
        message: `Your custom architectural door has been dispatched from DoorMaster workshop. Installer will arrive shortly.`,
        type: 'door_dispatched',
        jobId: jobId
      });

      this.alert.toastSuccess(
        'Door Dispatched',
        `${updatedJob.doorModel} dispatched from ${updatedJob.shopBranch} to ${updatedJob.client.siteAddress}.`
      );
    }
  }

  /**
   * Field Installer Clocks In on site.
   */
  clockIn(jobId: string, latitude: number, longitude: number, accuracyMeters = 12, installerIdOverride?: string) {
    if (!this.ensureAccountVerified(jobId, 'clock in on site')) return;
    const now = new Date().toISOString();
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        const targetInstallerId = installerIdOverride || job.assignedInstallerId || this.currentInstallerId() || 'unknown';
        const newSession: ClockSession = {
          id: `clk_${Date.now()}`,
          jobId,
          installerId: targetInstallerId,
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
        message: `${updatedJob.assignedInstallerName || 'Installer'} has clocked in on site at ${updatedJob.client.siteAddress} and begun site preparation.`,
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
    if (!this.ensureAccountVerified(jobId, 'clock out')) return;
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
          notes: notes || 'Installer completed shift / installation work'
        })
      }).catch(err => console.warn('Installer track sync warning:', err));
    }

    if (updatedJob) {
      this.createNotification({
        recipientRole: 'manager',
        title: 'Installer Clocked Out',
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
    if (!this.ensureAccountVerified(jobId, 'update the checklist')) return;
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
   * Installer-only comment update on a checklist step.
   */
  updateChecklistComment(jobId: string, itemId: string, comment: string) {
    if (this.currentRole() !== 'installer') {
      this.alert.toastWarning('Installer Only', 'Only installers can edit checklist comments.');
      return;
    }
    if (!this.ensureAccountVerified(jobId, 'update checklist comments')) return;
    const now = new Date().toISOString();
    const author = this.installers().find(i => i.id === this.currentInstallerId())?.name || this.currentUser().name || 'Installer';
    this.jobs.update(list => list.map(job => {
      if (job.id !== jobId) return job;
      return {
        ...job,
        hardwareChecklist: job.hardwareChecklist.map(item =>
          item.id === itemId
            ? { ...item, installerComment: comment, commentUpdatedAt: now, commentUpdatedBy: author }
            : item
        )
      };
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);
  }

  /**
   * Upload photo of completed work or site prep.
   */
  uploadPhoto(jobId: string, stage: 'before' | 'in_progress' | 'after', url: string, caption: string) {
    if (!this.ensureAccountVerified(jobId, 'upload site photos')) return;
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
    if (!this.ensureAccountVerified(jobId, 'submit customer sign-off')) return;
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
    if (!this.ensureAccountVerified(jobId, 'approve installation bonus')) return;
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
        title: 'Installation Finalized & Verified',
        message: `Management has finalized and verified the installation for job ${targetJob.id} (${targetJob.doorModel}).`,
        type: 'work_completed',
        jobId: jobId
      });
    }
  }

  markBonusPaid(jobId: string) {
    if (!this.ensureAccountVerified(jobId, 'mark bonus as paid')) return;
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

  async addCustomRole(roleDef: Omit<RoleDefinition, 'isSystem'>): Promise<{ success: boolean; message?: string }> {
    const newRole: RoleDefinition = {
      ...roleDef,
      isSystem: false,
      extraFeatures: roleDef.extraFeatures ?? []
    };
    this.roles.update(r => {
      const updated = [...r.filter(x => x.id !== newRole.id), newRole];
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem('doormaster_roles', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to persist roles:', e);
        }
      }
      return updated;
    });

    try {
      const res = await this.apiFetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole)
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.roles) && data.roles.length > 0) {
        this.roles.set(data.roles);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('doormaster_roles', JSON.stringify(data.roles));
        }
      } else {
        await this.loadRolesFromBackend();
      }
      this.broadcastDataChanged('roles');
      return { success: true, message: data.message };
    } catch (err) {
      console.warn('[Store] Role sync warning:', err);
      return { success: false, message: (err as Error).message };
    }
  }

  async updateRole(roleDef: RoleDefinition): Promise<{ success: boolean; message?: string }> {
    let roleToPersist: RoleDefinition = roleDef;
    this.roles.update(r => {
      const updated = r.map(item => {
        if (item.id !== roleDef.id) return item;
        // If system role, enforce that base permissions remain fixed from the original system definition
        if (item.isSystem) {
          roleToPersist = {
            ...item,
            extraFeatures: roleDef.extraFeatures ?? item.extraFeatures,
            name: roleDef.name || item.name,
            description: roleDef.description || item.description
          };
          return roleToPersist;
        }
        roleToPersist = roleDef;
        return roleDef;
      });
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem('doormaster_roles', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to persist roles:', e);
        }
      }
      return updated;
    });

    try {
      const res = await this.apiFetch(`/api/roles/${roleToPersist.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleToPersist)
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.roles) && data.roles.length > 0) {
        this.roles.set(data.roles);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('doormaster_roles', JSON.stringify(data.roles));
        }
      } else {
        await this.loadRolesFromBackend();
      }
      this.broadcastDataChanged('roles');
      return { success: true, message: data.message };
    } catch (err) {
      console.warn('[Store] Role update sync warning:', err);
      return { success: false, message: (err as Error).message };
    }
  }

  async deleteCustomRole(roleId: string): Promise<{ success: boolean; message?: string }> {
    this.roles.update(r => {
      const updated = r.filter(item => item.id !== roleId || item.isSystem);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem('doormaster_roles', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to persist roles:', e);
        }
      }
      return updated;
    });

    try {
      const res = await this.apiFetch(`/api/roles/${roleId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.roles) && data.roles.length > 0) {
        this.roles.set(data.roles);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('doormaster_roles', JSON.stringify(data.roles));
        }
      } else {
        await this.loadRolesFromBackend();
      }
      this.broadcastDataChanged('roles');
      return { success: true, message: data.message };
    } catch (err) {
      console.warn('[Store] Role delete sync warning:', err);
      return { success: false, message: (err as Error).message };
    }
  }

  // ============================================================================
  // Job Creation
  // ============================================================================

  createJob(jobData: Omit<InstallationJob, 'id' | 'createdAt' | 'clockSessions' | 'photos'>) {
    const newId = `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const hasInstaller = !!(jobData.assignedInstallerId || (jobData.assignedInstallerIds && jobData.assignedInstallerIds.length > 0));

    const isShopMgr = this.currentRole() === 'shop_manager';
    const assignedShop = this.userAssignedShop();
    const ownBranch = this.managerBranch() || (isShopMgr ? assignedShop : null);
    const explicitBranchFromData = jobData.shopId
      ? this.branches().find(b => String(b.id) === jobData.shopId || b.branchCode === jobData.shopId) || null
      : null;
    const resolvedBranch =
      ownBranch ||
      explicitBranchFromData ||
      this.findBranchByNameOrCode(jobData.shopBranch, jobData.shopBranchCode || jobData.shopBooking?.branchCode);
    const effectiveBranchName = resolvedBranch?.shopName || jobData.shopBranch;
    const dispatchingLocationName = jobData.shopBranch || effectiveBranchName;
    const effectiveShopId = String(resolvedBranch?.id || jobData.shopId || 'dm-branch-obeyeyie');
    const effectiveBranchCode = resolvedBranch?.branchCode || jobData.shopBranchCode || jobData.shopBooking?.branchCode || 'DM-GH-OBY';
    const curUser = this.currentUser();
    const installAndLaborTotal = (jobData.financials.installationFee || 0) + (jobData.financials.laborCost || 0);

    const shopBooking = jobData.shopBooking
      ? {
          ...jobData.shopBooking,
          shopId: effectiveShopId,
          shopBranch: effectiveBranchName || jobData.shopBooking.shopBranch,
          branchCode: effectiveBranchCode,
          amountPaidAtShop: jobData.shopBooking.amountPaidAtShop ?? installAndLaborTotal,
          bookedByShopManager: isShopMgr
            ? `${curUser.name} (${curUser.email})`
            : jobData.shopBooking.bookedByShopManager
        }
      : {
          bookedByShopManager: `${curUser.name} (${curUser.email})`,
          shopId: effectiveShopId,
          shopBranch: effectiveBranchName,
          branchCode: effectiveBranchCode,
          bookingTimestamp: now,
          lockModelRequested: jobData.lockModel || 'Doormaster High-Security Smart Lock',
          amountPaidAtShop: installAndLaborTotal,
          paymentMethod: 'momo' as const,
          receiptNumber: `REC-${newId}`,
          paymentStatus: 'paid_in_full' as const,
          accountantVerified: false
        };

    const newJob: InstallationJob = {
      ...jobData,
      id: newId,
      shopId: effectiveShopId,
      shopBranchCode: effectiveBranchCode,
      shopBranch: dispatchingLocationName,
      createdByUserId: curUser.id,
      shopBooking,
      financials: {
        ...jobData.financials,
        doorPrice: 0
      },
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

    // Step 1: Always require manual Account Officer verification before notifying Operations Manager & rest
    if (shopBooking && !shopBooking.accountantVerified) {
      this.createNotification({
        recipientRole: 'account_officer',
        title: 'New Installation Booked — Manual Account Verification Required',
        message: `Receipt ${shopBooking.receiptNumber}: ₵${(shopBooking.amountPaidAtShop || 0).toLocaleString()} recorded via ${shopBooking.paymentMethod.toUpperCase()} for ${newJob.doorModel} (${newJob.client.name}). Please verify manually so Operations Manager & team can proceed.`,
        type: 'shop_payment_recorded',
        jobId: newId,
        actionLabel: 'Verify Payment'
      });
      return newJob;
    }

    if (!hasInstaller) {
      this.createNotification({
        recipientRole: 'manager',
        title: 'New Installation Booked — Select Installation Team',
        message: `${newJob.client.name} booked installation for ${newJob.doorModel} at ${newJob.client.siteAddress} (Dispatch: ${dispatchingLocationName}). Please select an Installation Team (Lead + Assistants).`,
        type: 'job_assigned',
        jobId: newId,
        actionLabel: 'Select Team'
      });
    }

    const branchShopMgr = isShopMgr ? curUser : this.resolveShopManagerForBranch(resolvedBranch);
    if (branchShopMgr) {
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: branchShopMgr.id,
        title: newJob.dispatcherId ? 'Installation Order Registered for Your Shop' : 'Installation Order Registered — Select Dispatcher',
        message: newJob.dispatcherId
          ? `Order ${newId} (${newJob.doorModel}) for ${newJob.client.name} has been scheduled under ${effectiveBranchName}.`
          : `Order ${newId} (${newJob.doorModel}) for ${newJob.client.name} has been scheduled under ${effectiveBranchName}. Please select a dispatcher for delivery.`,
        type: 'truck_assigned',
        jobId: newId,
        actionLabel: newJob.dispatcherId ? 'View Order' : 'Select Dispatcher'
      });
    }

    const targetInstallerIds = (newJob.assignedInstallerIds && newJob.assignedInstallerIds.length > 0)
      ? newJob.assignedInstallerIds
      : (newJob.assignedInstallerId ? [newJob.assignedInstallerId] : []);

    const assigner = 'Operations Manager';

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
    shopId?: string;
    branchCode?: string;
    shopBranch: string;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    siteAddress: string;
    coordinates?: { lat: number; lng: number };
    accessInstructions?: string;
    scheduledDate: string;
    estimatedHours: number;
    doorPrice?: number;
    installationFee: number;
    laborCost?: number;
    amountPaidAtShop: number;
    paymentMethod: 'cash' | 'momo' | 'pos_card' | 'bank_transfer' | 'dm_door';
    receiptNumber: string;
  }): InstallationJob {
    const newId = `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const labor = booking.laborCost ?? 0;
    const totalOrder = booking.installationFee + labor;
    const isPaidInFull = booking.amountPaidAtShop >= totalOrder;
    const lockedUserShop = this.userAssignedShop();
    const matchedByExplicitId = booking.shopId
      ? this.branches().find(b => String(b.id) === booking.shopId || b.branchCode === booking.shopId) || null
      : null;
    const matchedBranch =
      lockedUserShop ||
      matchedByExplicitId ||
      this.findBranchByNameOrCode(booking.shopBranch, booking.branchCode || null);
    const effectiveShopId = String(matchedBranch?.id || booking.shopId || 'dm-branch-obeyeyie');
    const effectiveBranchCode = matchedBranch?.branchCode || booking.branchCode || 'DM-GH-OBY';
    const effectiveShopName = matchedBranch?.shopName || booking.shopBranch;
    const branchShopMgr = this.resolveShopManagerForBranch(matchedBranch);
    const curUser = this.currentUser();
    const bookedByLabel = lockedUserShop
      ? `${curUser.name} (${curUser.email})`
      : matchedBranch?.managerName
        ? `${matchedBranch.managerName}${matchedBranch.managerEmail ? ` (${matchedBranch.managerEmail})` : ''}`
        : `${curUser.name} (${curUser.email})`;

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
      shopId: effectiveShopId,
      shopBranchCode: effectiveBranchCode,
      shopBranch: effectiveShopName,
      createdByUserId: curUser.id,
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
        bookedByShopManager: bookedByLabel,
        shopId: effectiveShopId,
        shopBranch: effectiveShopName,
        branchCode: effectiveBranchCode,
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
        doorPrice: 0,
        installationFee: booking.installationFee,
        laborCost: labor,
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

    // Step 1: Notify Account Officer only — Operations Manager, Shop Manager & Client notifications
    // wait until Account Officer manually verifies the payment.
    this.createNotification({
      recipientRole: 'account_officer',
      title: 'Shop Counter Payment Received — Manual Account Verification Required',
      message: `Receipt ${booking.receiptNumber}: ₵${booking.amountPaidAtShop.toLocaleString()} collected at shop counter via ${booking.paymentMethod.toUpperCase()} for ${booking.doorModel} (${booking.clientName}). Please verify manually so Operations Manager & team can proceed.`,
      type: 'shop_payment_recorded',
      jobId: newId,
      actionLabel: 'Verify Payment'
    });

    this.sendSms({
      recipientRole: 'shop_manager',
      recipientPhone: branchShopMgr?.phone || matchedBranch?.phone?.split('/')[0]?.trim(),
      recipientName: branchShopMgr?.name || 'Shop Manager',
      triggerEvent: 'booking_created',
      messageText: `DoorMaster SMS: New counter booking Ref: ${newId} (${matchedBranch?.shopName || booking.shopBranch}). Door: ${booking.doorModel}, Lock: ${booking.lockModel || 'Smart Handle'}, Client: ${booking.clientName} (${booking.clientPhone}), Paid: ₵${booking.amountPaidAtShop.toLocaleString()} (${booking.paymentMethod.toUpperCase()}, Ref: ${booking.receiptNumber}). Forwarded to Operations.`,
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
   * Operations Manager: Sets up delivery truck, assigns dispatcher & selects available signed-in Installer.
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
    if (!this.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to setup logistics trucks and assign installers.');
      return;
    }
    const installerIds = Array.isArray(installerId) ? installerId : [installerId];
    const selectedTechs = this.installers().filter(i => installerIds.includes(i.id));
    const leadTech = selectedTechs[0];
    const techNames = selectedTechs.map(t => t.name).join(', ');
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const teamMembers: AssignedInstallerTeamMember[] = selectedTechs.map((t, idx) => ({
      id: t.id,
      name: t.name,
      phone: t.phone,
      role: idx === 0 ? 'lead' : 'assistant',
      position: t.teamPosition || (idx === 0 ? 'Team Lead' : 'Installation Installer'),
      avatar: t.avatarUrl,
      teamId: t.teamId,
      teamName: t.teamName,
      isTeamLead: idx === 0 || !!t.isTeamLead,
      avgRating: t.metrics.avgRating,
      status: 'pending',
      assignedAt: now,
      deadlineAt: deadline,
      autoAccepted: false
    }));
    let updatedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        updatedJob = {
          ...job,
          assignedInstallerId: leadTech ? leadTech.id : installerIds[0],
          assignedInstallerName: techNames || (leadTech ? leadTech.name : 'Assigned Installer'),
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

      const assigner = 'Operations Manager';

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
        message: `Your DoorMaster logistics truck (${truckData.truckPlate}, Driver: ${truckData.dispatcherName}) and installer (${leadTech?.name || 'Installer'}) have been assigned!`,
        type: 'truck_assigned',
        jobId: jobId
      });
    }
  }

  /**
   * Operations Manager: Assigns single or multiple installers to an installation job.
   */
  assignInstallersByManager(jobId: string, installerIds: string[], notes?: string): void {
    if (!this.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!this.ensureAccountVerified(jobId, 'assign an installation team')) return;
    if (!installerIds || installerIds.length === 0) return;
    const uniqueInstallerIds = Array.from(new Set(installerIds.filter(Boolean)));
    const selectedTechs = uniqueInstallerIds
      .map(id => this.installers().find(i => i.id === id))
      .filter((i): i is InstallerProfile => !!i);
    if (selectedTechs.length === 0) return;

    const leadTech = selectedTechs[0];
    const techNames = selectedTechs.map(t => t.name).join(', ');
    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const teamMembers: AssignedInstallerTeamMember[] = selectedTechs.map((t, idx) => ({
      id: t.id,
      name: t.name,
      phone: t.phone,
      role: idx === 0 ? 'lead' : 'assistant',
      position: t.teamPosition || (idx === 0 ? 'Team Lead' : 'Installation Installer'),
      avatar: t.avatarUrl,
      teamId: t.teamId,
      teamName: t.teamName,
      isTeamLead: idx === 0 || !!t.isTeamLead,
      avgRating: t.metrics.avgRating,
      status: 'pending',
      assignedAt: now,
      deadlineAt: deadline,
      autoAccepted: false
    }));

    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        updatedJob = {
          ...job,
          assignedInstallerId: leadTech.id,
          assignedInstallerName: techNames,
          assignedInstallerIds: uniqueInstallerIds,
          assignedInstallerNames: selectedTechs.map(t => t.name),
          assignedInstallers: teamMembers,
          assignedAt: now,
          installerAssignedAt: now,
          installerDeadlineAt: deadline,
          installerAssignmentStatus: 'pending',
          installerAutoAccepted: false,
          installerRejectReason: undefined,
          installerProposedSlot: undefined,
          installerRespondedAt: undefined,
          rejectedByInstallerName: undefined,
          status: job.dispatcherId ? 'truck_assigned' : 'assigned'
        };
        return updatedJob;
      }
      return job;
    }));
    this.dismissReassignmentPopup(jobId);
    this.currentInstallerId.set(leadTech.id);
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    this.installers.update(techs => techs.map(t => {
      if (uniqueInstallerIds.includes(t.id)) {
        return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
      }
      return t;
    }));

    // Remove any previous installer assignment notifications for this jobId so reassigned installers don't see stale ones
    this.notifications.update(list =>
      list.filter(n => !(n.recipientRole === 'installer' && n.jobId === jobId && n.type === 'job_assigned'))
    );

    const assigner = 'Operations Manager';

    selectedTechs.forEach(tech => {
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: tech.id,
        title: 'New Installation Assigned (10-Min Action Required)',
        message: `${assigner} assigned you (${tech.teamPosition || 'Team Member'}) to install ${updatedJob?.doorModel} for ${updatedJob?.client.name} at ${updatedJob?.client.siteAddress}. Scheduled for ${updatedJob?.scheduledDate}. Please Accept or Reject within 10 minutes, otherwise auto-accepted by the system on your behalf.`,
        type: 'job_assigned',
        jobId: jobId,
        actionLabel: 'Accept or Reject'
      });

      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: tech.phone,
        recipientName: tech.name,
        triggerEvent: 'installer_assigned',
        messageText: `DoorMaster SMS: ${assigner} assigned you to install ${updatedJob?.doorModel} (${jobId}). Scheduled: ${updatedJob?.scheduledDate} at ${updatedJob?.client.siteAddress}. Please accept or reject within 10 mins if unavailable, else auto-accepted for you.`,
        jobId
      });
    });

    if (updatedJob) {
      const branchShopMgr = this.resolveShopManagerForJob(updatedJob);
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: branchShopMgr?.id,
        title: updatedJob.dispatcherId ? 'Installation Team Assigned by Operations' : 'Installer Assigned — Select Dispatcher',
        message: updatedJob.dispatcherId
          ? `Operations Manager assigned ${techNames} to job ${jobId} (${updatedJob.doorModel}) for ${updatedJob.client.name}. 10-minute installer acceptance countdown active.`
          : `Operations Manager assigned ${techNames} to job ${jobId} (${updatedJob.doorModel}). Please select a dispatcher to deliver the door and hardware to site.`,
        type: 'truck_assigned',
        jobId: jobId,
        actionLabel: updatedJob.dispatcherId ? 'View Order' : 'Select Dispatcher'
      });

      this.createNotification({
        recipientRole: 'client',
        recipientUserId: updatedJob.client.id,
        title: 'Installation Team Assigned',
        message: `DoorMaster assigned installation team (${techNames}) for your ${updatedJob.doorModel} installation at ${updatedJob.client.siteAddress}.`,
        type: 'job_assigned',
        jobId: jobId
      });

      this.createNotification({
        recipientRole: 'manager',
        title: 'Installation Team Dispatched (10-Min Review Active)',
        message: `Assigned ${techNames} to job ${jobId} (${updatedJob.client.name}). Installers have 10 minutes to accept or decline before auto-acceptance.`,
        type: 'job_assigned',
        jobId: jobId
      });
    }
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
    })
      .then(async () => {
        await this.loadDoorsFromBackend();
        this.broadcastDataChanged('doors');
      })
      .catch(err => console.warn('Background door sync error', err));

    if (this.currentRole() === 'shop_manager') {
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: this.currentUser().id,
        title: 'New Door Added to Catalog',
        message: `${newDoor.name} (${newDoor.modelCode}) has been registered in the catalog with ${newDoor.stockQuantity} units available.`,
        type: 'door_dispatched',
        jobId: newDoor.id,
        actionLabel: 'View Doors Catalog'
      });
    } else {
      this.createNotification({
        recipientRole: 'manager',
        title: 'New Door Added to Catalog',
        message: `${newDoor.name} (${newDoor.modelCode}) has been registered in the catalog with ${newDoor.stockQuantity} units available.`,
        type: 'door_dispatched',
        jobId: newDoor.id,
        actionLabel: 'View Doors Catalog'
      });
    }

    return newDoor;
  }

  updateDoor(id: string, partial: Partial<DoorCatalogEntry>) {
    this.doors.update(list => list.map(door => door.id === id ? { ...door, ...partial } : door));

    this.apiFetch(`/api/doors/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partial)
    })
      .then(async res => {
        const data = await res.json().catch(() => null);
        await this.loadDoorsFromBackend();
        this.broadcastDataChanged('doors');
        this.alert.toastSuccess('Door Updated', data?.message || 'Door specifications & installation pricing updated successfully.');
      })
      .catch(() => {
        this.broadcastDataChanged('doors');
        this.alert.toastSuccess('Door Updated', 'Door specifications updated.');
      });
  }

  deleteDoor(id: string) {
    const targetDoor = this.doors().find(d => d.id === id);
    this.doors.update(list => list.filter(door => door.id !== id));

    this.apiFetch(`/api/doors/${id}`, { method: 'DELETE' })
      .then(async res => {
        const data = await res.json().catch(() => null);
        await this.loadDoorsFromBackend();
        this.broadcastDataChanged('doors');
        this.alert.toastSuccess(
          'Door Deleted',
          data?.message || `"${targetDoor?.name || id}" removed from catalog successfully.`
        );
      })
      .catch(() => {
        this.alert.toastSuccess(
          'Door Deleted',
          `"${targetDoor?.name || id}" removed from catalog.`
        );
      });
  }

  // ============================================================================
  // Notification & SMS Helpers
  // ============================================================================

  private createNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const notification = this.normalizeNotificationForManager(
      this.normalizeNotificationForShopManager({
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
      })
    );

    // Replace any existing duplicate notification for the same recipient + jobId + event type/title
    this.notifications.update(list => [
      notification,
      ...list.filter(existing => {
        if (!notification.jobId || notification.jobId === 'GENERAL') return true;
        const sameRecipient =
          existing.recipientRole === notification.recipientRole &&
          (existing.recipientUserId || '') === (notification.recipientUserId || '');
        const sameJob = existing.jobId === notification.jobId;
        const sameEvent = existing.title === notification.title || existing.type === notification.type;
        return !(sameRecipient && sameJob && sameEvent);
      })
    ]);

    this.apiFetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    }).catch(err => console.warn('Notification sync warning:', err));
  }

  private normalizePhoneDigits(phone?: string): string {
    return (phone || '').replace(/\D/g, '').slice(-9);
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
    const targetDigits = this.normalizePhoneDigits(recipientPhone);
    const targetName = (sms.recipientName || '').trim().toLowerCase();

    const allUsers = this.users();
    const matchedUser = allUsers.find(u =>
      (targetDigits && this.normalizePhoneDigits(u.phone) === targetDigits) ||
      (targetName && u.name.trim().toLowerCase() === targetName && u.role === sms.recipientRole)
    );
    if (matchedUser && !this.isUserSmsEnabled(matchedUser.id)) {
      return;
    }
    if (!sms.recipientPhone) {
      const roleUsers = allUsers.filter(u => u.role === sms.recipientRole);
      if (roleUsers.length > 0 && roleUsers.every(u => !this.isUserSmsEnabled(u.id))) {
        return;
      }
    }

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

        // Refresh the user directory, teams, and roles with the new token.
        await Promise.all([
          this.loadUsers(),
          this.loadTeamsFromBackend(),
          this.loadRolesFromBackend()
        ]);
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
    // Seed default installer teams immediately, then sync live data from API
    this.deriveInstallersAndDispatchersFromUsers();
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
  private gpsPermissionWatcherInitialized = false;

  async initGpsPermissionWatcher(): Promise<void> {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      this.gpsPermissionState.set('unsupported');
      this.gpsCheckSettled.set(true);
      return;
    }

    if (!this.gpsPermissionWatcherInitialized && navigator.permissions?.query) {
      this.gpsPermissionWatcherInitialized = true;
      try {
        const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        const syncState = (s: PermissionState) => {
          this.gpsPermissionState.set(s);
          if (s === 'granted') {
            this.gpsError.set(null);
            if (!this.isGpsTracking()) {
              void this.startGpsTracking();
            }
          } else if (s === 'denied') {
            this.gpsCheckSettled.set(true);
            this.gpsError.set('Location access is blocked in your browser settings.');
          } else {
            this.gpsCheckSettled.set(true);
          }
        };
        syncState(status.state);
        status.onchange = () => syncState(status.state);
        return;
      } catch {
        // Fallback below if permissions.query is unavailable
      }
    }

    if (!this.isGpsTracking()) {
      void this.startGpsTracking();
    }
  }

  async requestLocationAccess(): Promise<boolean> {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      this.gpsPermissionState.set('unsupported');
      this.gpsError.set('Geolocation is not supported on this device/browser.');
      this.gpsCheckSettled.set(true);
      return false;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation!.getCurrentPosition(resolve, reject, options);
      });
      this.gpsPermissionState.set('granted');
      this.gpsCheckSettled.set(true);
      this.gpsError.set(null);
      const { latitude, longitude, accuracy, heading, speed } = pos.coords;
      const accuracyM = accuracy != null ? Math.round(accuracy) : null;
      this.gpsAccuracyM.set(accuracyM);
      await this.pushLocation({
        latitude,
        longitude,
        accuracyM,
        heading: heading ?? null,
        speedKmh: speed ? +(speed * 3.6).toFixed(1) : null
      });
      if (!this.isGpsTracking()) {
        void this.startGpsTracking();
      }
      return true;
    } catch (err: any) {
      if (err?.code === 1) {
        this.gpsPermissionState.set('denied');
        this.gpsError.set('Location permission was denied. Please allow location access in your browser site settings and retry.');
      } else {
        this.gpsError.set(err?.message || 'Unable to get your current GPS position. Ensure device location/GPS is turned on and retry.');
      }
      this.gpsCheckSettled.set(true);
      return false;
    }
  }

  async startGpsTracking(): Promise<void> {
    if (this.isGpsTracking()) return;
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      this.gpsPermissionState.set('unsupported');
      this.gpsCheckSettled.set(true);
      this.gpsError.set('Geolocation is not supported on this device');
      console.warn('[GPS] Geolocation not available');
      return;
    }

    const apiU = this.apiUser();
    const curU = this.currentUser();
    const effectiveRole = apiU?.role || curU?.role || this.currentRole();
    const userId = apiU?.id || curU?.id;
    if (!userId) return;

    const trackableRoles = ['installer', 'dispatcher', 'manager', 'account_officer', 'shop_manager'];
    if (!trackableRoles.includes(effectiveRole)) {
      console.log(`[GPS] Role ${effectiveRole} is not tracked`);
      return;
    }

    this.isGpsTracking.set(true);
    this.gpsError.set(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    const handleCoords = async (pos: GeolocationPosition) => {
      const { latitude, longitude, accuracy, heading, speed } = pos.coords;
      const accuracyM = accuracy != null ? Math.round(accuracy) : null;
      const prev = this.myLiveLocation();
      // Ignore very coarse IP/cell fixes (>1500m) if we already have a recent accurate fix (<=500m within 2 min)
      if (
        accuracyM !== null &&
        accuracyM > 1500 &&
        prev?.accuracyM != null &&
        prev.accuracyM <= 500 &&
        Date.now() - new Date(prev.updatedAt).getTime() < 2 * 60 * 1000
      ) {
        return;
      }

      this.gpsPermissionState.set('granted');
      this.gpsCheckSettled.set(true);
      this.gpsAccuracyM.set(accuracyM);
      this.gpsError.set(null);
      const speedKmh = speed ? +(speed * 3.6).toFixed(1) : null;

      await this.pushLocation({
        latitude,
        longitude,
        accuracyM,
        heading: heading ?? null,
        speedKmh
      });
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => { void handleCoords(pos); },
      (err) => {
        if (err.code === 1) {
          this.gpsPermissionState.set('denied');
        }
        this.gpsCheckSettled.set(true);
        this.gpsError.set(err.message || 'Location permission or GPS signal unavailable');
        console.warn('[GPS] watchPosition error:', err);
      },
      options
    );

    this.gpsWatchId.set(watchId);

    // Push initial high-accuracy position immediately
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation!.getCurrentPosition(resolve, reject, options);
      });
      await handleCoords(pos);
    } catch (err: any) {
      if (err?.code === 1) {
        this.gpsPermissionState.set('denied');
      }
      this.gpsCheckSettled.set(true);
      this.gpsError.set(err?.message || 'Waiting for GPS fix...');
      // Initial fix failed; watchPosition will retry.
    }

    // Poll for other users' live locations every 15 seconds
    if (this.gpsPollTimer) {
      clearInterval(this.gpsPollTimer);
    }
    this.gpsPollTimer = setInterval(() => {
      if (this.isGpsTracking() && this.isNetworkOnline()) {
        void this.loadLiveLocations();
      }
    }, 15000);

    // Initial load of all live locations
    if (this.isNetworkOnline()) {
      void this.loadLiveLocations();
    }
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
    if (this.gpsPollTimer) {
      clearInterval(this.gpsPollTimer);
      this.gpsPollTimer = null;
    }
    this.isGpsTracking.set(false);
    void this.markOffline();
  }

  /**
   * Sends a single GPS position update to the backend and updates local live state immediately.
   */
  async pushLocation(coords: {
    latitude: number;
    longitude: number;
    accuracyM?: number | null;
    heading?: number | null;
    speedKmh?: number | null;
  }): Promise<void> {
    const apiU = this.apiUser();
    const curU = this.currentUser();
    const userId = apiU?.id || curU?.id;
    if (!userId) return;

    const status: 'online' | 'offline' = this.isNetworkOnline() ? 'online' : 'offline';
    const nowIso = new Date().toISOString();
    const localLoc: LiveLocation = {
      id: `local-${userId}`,
      userId,
      userName: apiU?.name || curU?.name || 'Me',
      role: (apiU?.role || curU?.role || this.currentRole()) as RoleType,
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracyM: coords.accuracyM ?? null,
      heading: coords.heading ?? null,
      speedKmh: coords.speedKmh ?? null,
      status,
      updatedAt: nowIso,
      createdAt: this.myLiveLocation()?.createdAt || nowIso
    };

    // Update local state immediately so the map reflects accurate device coordinates right away
    this.myLiveLocation.set(localLoc);
    this.liveLocations.update(list => {
      const existing = list.findIndex(l => l.userId === localLoc.userId);
      if (existing >= 0) {
        const next = [...list];
        next[existing] = localLoc;
        return next;
      }
      return [localLoc, ...list];
    });

    if (!this.isNetworkOnline() || !this.apiToken()) return;

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
          status
        })
      });

      if (res.ok) {
        const responseData = await res.json();
        if (responseData.success && responseData.location) {
          this.myLiveLocation.set(responseData.location);
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
          const incoming: LiveLocation[] = responseData.locations;
          const myLoc = this.myLiveLocation();
          if (myLoc) {
            const idx = incoming.findIndex(l => l.userId === myLoc.userId);
            if (idx === -1) {
              incoming.unshift(myLoc);
            } else {
              const serverTs = new Date(incoming[idx].updatedAt).getTime();
              const localTs = new Date(myLoc.updatedAt).getTime();
              if (!isNaN(localTs) && (isNaN(serverTs) || localTs > serverTs)) {
                incoming[idx] = myLoc;
              }
            }
          }
          this.liveLocations.set(incoming);
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
  // Ghana Post GPS Digital Address Resolution
  // ============================================================================
  private ghanaPostCache = new Map<string, GhanaPostLocation>();

  /**
   * Resolves a Ghana Post GPS code (e.g. GD-018-5574 or GA-183-9340) to exact coordinates.
   */
  async resolveGhanaPostGps(rawCode: string): Promise<GhanaPostLocation | null> {
    const clean = (rawCode || '').trim().toUpperCase().replace(/\s+/g, '');
    let normalized = clean;
    if (!normalized.includes('-') && /^[A-Z]{2}\d{3,4}\d{4}$/.test(normalized)) {
      normalized = `${normalized.slice(0, 2)}-${normalized.slice(2, 5)}-${normalized.slice(5)}`;
    }

    if (this.ghanaPostCache.has(normalized)) {
      return this.ghanaPostCache.get(normalized)!;
    }

    try {
      const res = await this.apiFetch(`/api/geocoding/ghanapost/${encodeURIComponent(normalized)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const loc: GhanaPostLocation = json.data;
          this.ghanaPostCache.set(normalized, loc);
          return loc;
        }
      }
    } catch (err) {
      console.warn('[GPS] Could not resolve Ghana Post GPS address:', err);
    }
    return null;
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
    if (!this.canCurrentRoleSelectDispatcher()) {
      this.alert.warning('Access Restricted', 'Driver selection is managed exclusively by the Shop Attendant.');
      return;
    }
    if (!this.ensureAccountVerified(jobId, 'assign a driver')) return;
    const targetJob = this.jobs().find(j => j.id === jobId);
    if (!targetJob) return;

    if (!this.canShopManagerAssignDriver(targetJob)) {
      this.alert.warning('Access Restricted', 'Only the Shop Attendant who created this order can assign the Driver.');
      return;
    }

    if (!this.hasJobAcceptedInstallers(targetJob)) {
      this.alert.warning(
        'Installer Acceptance Required',
        'Dispatch Driver can only be assigned after one or more assigned installers have accepted (or auto-accepted) their assignment from Operations Manager.'
      );
      return;
    }

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
          status: job.assignedInstallerId ? 'truck_assigned' : job.status
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
    if (!this.ensureAccountVerified(jobId, 'approve this installation')) return;
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
    if (!this.ensureAccountVerified(jobId, 'start live transit')) return;
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return { ...job, motionLiveStarted: true, motionLiveStartedAt: new Date().toISOString() };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);
    this.alert.toastSuccess('Transit Started', `Live GPS dispatch tracking activated for job ${jobId}.`);
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
    if (this.isBranchScoped()) {
      const visibleIds = new Set(this.roleNotifications().filter(n => !n.read).map(n => n.id));
      if (visibleIds.size === 0) return true;
      this.notifications.update(list => list.map(n => visibleIds.has(n.id) ? { ...n, read: true } : n));
      await Promise.all(
        Array.from(visibleIds).map(id =>
          this.apiFetch(`/api/notifications/${id}/read`, { method: 'PATCH' }).catch(() => null)
        )
      );
      return true;
    }

    try {
      const res = await this.apiFetch('/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: this.currentRole() })
      });
      const responseData = await res.json()
      if (responseData.success) {
        const curRole = this.currentRole();
        this.notifications.update(list =>
          list.map(n => (n.recipientRole === curRole || n.recipientRole === 'all') ? { ...n, read: true } : n)
        );
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
    if (!this.ensureAccountVerified(jobId, 'respond to this delivery run')) return;
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

      // In-App Notification to Operations Manager (Informational — Shop Manager handles dispatcher selection)
      this.createNotification({
        recipientRole: 'manager',
        title: 'Dispatch Driver Rejected Delivery Run',
        message: `Driver ${rejectedDriverName} rejected delivery run for job ${jobId} (${currentJob.doorModel}) within 10-minute window. Reason: "${rejectReason}". Shop Manager has been notified to select another dispatcher.`,
        type: 'driver_rejected',
        jobId: jobId
      });

      // In-App Notification to Shop Manager (scoped to the job's branch)
      const branchShopMgr = this.resolveShopManagerForJob(currentJob);
      this.createNotification({
        recipientRole: 'shop_manager',
        recipientUserId: branchShopMgr?.id,
        title: 'Dispatcher Rejected Run — Select Dispatcher',
        message: `Dispatcher ${rejectedDriverName} rejected run for job ${jobId} (${currentJob.doorModel}). Reason: "${rejectReason}". Please select a dispatcher for reassignment.`,
        type: 'driver_rejected',
        jobId: jobId,
        actionLabel: 'Select Dispatcher'
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
    if (!job || this.isAwaitingAccountVerification(job) || job.driverAssignmentStatus !== 'pending' || !job.dispatcherId) return;

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
   * Can accept a specific member in a team or all expired pending members.
   */
  autoAcceptInstallerAssignment(jobId: string, targetInstallerId?: string) {
    const job = this.jobs().find(j => j.id === jobId);
    if (!job || this.isAwaitingAccountVerification(job) || (!job.assignedInstallerId && (!job.assignedInstallers || job.assignedInstallers.length === 0))) return;

    const assignedIds = new Set<string>();
    if (Array.isArray(job.assignedInstallerIds) && job.assignedInstallerIds.length > 0) {
      job.assignedInstallerIds.forEach(id => { if (id) assignedIds.add(id); });
    } else if (job.assignedInstallerId) {
      assignedIds.add(job.assignedInstallerId);
    }
    if (assignedIds.size === 0) return;
    if (targetInstallerId && !assignedIds.has(targetInstallerId)) return;

    let updatedJob: InstallationJob | undefined;
    const now = new Date().toISOString();

    const rawTeam: AssignedInstallerTeamMember[] = (job.assignedInstallers && job.assignedInstallers.length > 0)
      ? [...job.assignedInstallers]
      : (job.assignedInstallerId ? [{
          id: job.assignedInstallerId,
          name: job.assignedInstallerName || 'Installer',
          role: 'lead' as const,
          status: job.installerAssignmentStatus || 'pending',
          assignedAt: job.installerAssignedAt || now,
          deadlineAt: job.installerDeadlineAt
        }] : []);

    // Strictly filter out any installer who is NOT in assignedIds
    const currentTeam = rawTeam.filter(m => assignedIds.has(m.id));

    const autoAcceptedIds: string[] = [];
    const updatedTeam = currentTeam.map(member => {
      const isTarget = targetInstallerId ? member.id === targetInstallerId : true;
      const isPending = !member.status || member.status === 'pending';
      if (isTarget && isPending) {
        autoAcceptedIds.push(member.id);
        return {
          ...member,
          status: 'accepted' as const,
          respondedAt: now,
          autoAccepted: true
        };
      }
      return member;
    });

    if (autoAcceptedIds.length === 0) return;

    const anyPending = updatedTeam.some(m => !m.status || m.status === 'pending');

    this.jobs.update(list => list.map(j => {
      if (j.id === jobId) {
        updatedJob = {
          ...j,
          assignedInstallers: updatedTeam,
          installerAssignmentStatus: anyPending ? 'pending' : 'accepted',
          installerAutoAccepted: true,
          installerRespondedAt: now,
          acceptedAt: now,
          status: (j.status === 'booked_at_shop' || j.status === 'assigned') ? 'accepted' : j.status
        };
        return updatedJob;
      }
      return j;
    }));

    this.installers.update(techs => techs.map(t => {
      if (autoAcceptedIds.includes(t.id)) {
        return { ...t, activeJobId: job.id, availabilityStatus: 'assigned' };
      }
      return t;
    }));

    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    // In-App & SMS Notification ONLY to the auto-accepted Field Installers
    autoAcceptedIds.forEach(instId => {
      const memberTech = this.installers().find(i => i.id === instId);
      const memberName = memberTech?.name || 'Installer';
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: instId,
        title: 'Installation Run Auto-Accepted (10-Min Window Elapsed)',
        message: `The 10-minute review window for installation ${job.id} (${job.doorModel} for ${job.client.name}) has elapsed with no action. The installation has been automatically accepted and confirmed for you.`,
        type: 'installer_accepted',
        jobId: job.id,
        actionLabel: 'View Work Order'
      });

      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: memberTech?.phone,
        recipientName: memberName,
        triggerEvent: 'installer_accepted',
        messageText: `DoorMaster SMS: Installation job ${job.id} (${job.doorModel}) was AUTO-ACCEPTED after 10 mins without rejection. Scheduled: ${job.scheduledDate}. Check app for site specs.`,
        jobId: job.id
      });
    });

    // In-App Notification to Shop Manager (scoped to the job's branch)
    const branchShopMgr = this.resolveShopManagerForJob(job);
    const techName = job.assignedInstallerName || 'Installer';
    this.createNotification({
      recipientRole: 'shop_manager',
      recipientUserId: branchShopMgr?.id,
      title: job.dispatcherId ? 'Installer Run Auto-Accepted (10-Min Elapsed)' : 'Installer Confirmed — Select Dispatcher',
      message: job.dispatcherId
        ? `Installer (${techName}) auto-accepted installation ${job.id} (${job.doorModel}) after 10 minutes elapsed.`
        : `Installer (${techName}) is confirmed for installation ${job.id} (${job.doorModel}). Please select a dispatcher for delivery.`,
      type: 'installer_accepted',
      jobId: job.id,
      actionLabel: job.dispatcherId ? 'View Order' : 'Select Dispatcher'
    });

    // In-App Notification to Operations Manager
    this.createNotification({
      recipientRole: 'manager',
      title: 'Installer Run Auto-Accepted (10-Min Elapsed)',
      message: `Installer (${techName}) auto-accepted installation ${job.id} (${job.doorModel} for ${job.client.name}) after 10 minutes elapsed.`,
      type: 'installer_accepted',
      jobId: job.id
    });
  }

  /**
   * Periodic check: auto-accept any installer assignment where 10-minute window has passed without rejection.
   */
  checkAndAutoAcceptExpiredInstallerAssignments() {
    const now = Date.now();
    for (const job of this.jobs()) {
      if (!job.assignedInstallerId && (!job.assignedInstallers || job.assignedInstallers.length === 0)) continue;

      const assignedIds = new Set<string>();
      if (Array.isArray(job.assignedInstallerIds) && job.assignedInstallerIds.length > 0) {
        job.assignedInstallerIds.forEach(id => { if (id) assignedIds.add(id); });
      } else if (job.assignedInstallerId) {
        assignedIds.add(job.assignedInstallerId);
      }
      if (assignedIds.size === 0) continue;

      // Only evaluate team members who are explicitly assigned to this job
      const team = (job.assignedInstallers || []).filter(m => assignedIds.has(m.id));
      if (team.length > 0) {
        for (const member of team) {
          if (!member.status || member.status === 'pending') {
            const deadline = member.deadlineAt
              ? new Date(member.deadlineAt).getTime()
              : (job.installerDeadlineAt ? new Date(job.installerDeadlineAt).getTime() : 0);
            if (deadline > 0 && deadline <= now) {
              this.autoAcceptInstallerAssignment(job.id, member.id);
            }
          }
        }
      } else if (job.installerAssignmentStatus === 'pending') {
        const deadline = job.installerDeadlineAt ? new Date(job.installerDeadlineAt).getTime() : 0;
        if (deadline > 0 && deadline <= now) {
          this.autoAcceptInstallerAssignment(job.id);
        }
      }
    }
  }

  /**
   * Add an installer to a job's team.
   */
  addInstallerToJob(jobId: string, installerId: string) {
    if (!this.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!this.ensureAccountVerified(jobId, 'add an installer')) return;
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
        const teamMembers: AssignedInstallerTeamMember[] = techs.map((t, idx) => {
          const existing = (job.assignedInstallers || []).find(m => m.id === t.id);
          if (existing) return existing;
          return {
            id: t.id,
            name: t.name,
            phone: t.phone,
            role: idx === 0 ? 'lead' : 'assistant',
            position: t.teamPosition || (idx === 0 ? 'Team Lead' : 'Installation Installer'),
            avatar: t.avatarUrl,
            teamId: t.teamId,
            teamName: t.teamName,
            isTeamLead: idx === 0 || !!t.isTeamLead,
            avgRating: t.metrics.avgRating,
            status: 'pending',
            assignedAt: now,
            deadlineAt: deadline,
            autoAccepted: false
          };
        });

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
          status: (job.status === 'draft' || job.status === 'booked_at_shop')
            ? (job.dispatcherId ? 'truck_assigned' : 'assigned')
            : job.status
        };
        return updatedJob;
      }
      return job;
    }));
    this.saveJobsLocally();
    if (updatedJob) this.persistJobToBackend(updatedJob);

    const assigner = 'Operations Manager';

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
    if (!this.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to remove installers.');
      return;
    }
    if (!this.ensureAccountVerified(jobId, 'remove an installer')) return;
    const existingJob = this.jobs().find(j => j.id === jobId);
    const committedMember = existingJob?.assignedInstallers?.find(m => m.id === installerId);
    if (
      committedMember?.status === 'accepted' ||
      committedMember?.autoAccepted ||
      (existingJob?.assignedInstallerId === installerId && existingJob?.installerAssignmentStatus === 'accepted')
    ) {
      this.alert.toastWarning(
        'Committed Installer Locked',
        'Installers who have accepted or auto-accepted this task cannot be removed.'
      );
      return;
    }
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
   * Account Officer verifies shop payment for a job, unlocking it and dispatching
   * the second-stage notifications to Operations Manager, Shop Manager, Client & Installers.
   */
  verifyShopPayment(jobId: string, notes?: string) {
    const existingJob = this.jobs().find(j => j.id === jobId);
    if (!existingJob || !existingJob.shopBooking) return;
    if (existingJob.shopBooking.accountantVerified) {
      this.alert.toastSuccess('Already Verified', `Job ${jobId} payment has already been verified.`);
      return;
    }

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
    if (!updated) return;
    this.persistJobToBackend(updated);

    const hasInstaller = !!(updated.assignedInstallerId || (updated.assignedInstallerIds && updated.assignedInstallerIds.length > 0));
    const dispatchingLocationName = updated.shopBranch || updated.shopBooking?.shopBranch || 'DoorMaster Showroom';

    // Second-stage notifications: Operations Manager
    if (!hasInstaller) {
      this.createNotification({
        recipientRole: 'manager',
        title: 'Account Verified — Select Installation Team',
        message: `Accounts verified payment for ${updated.client.name}'s ${updated.doorModel} at ${updated.client.siteAddress} (Dispatch: ${dispatchingLocationName}). Please select an Installation Team (Lead + Assistants).`,
        type: 'job_assigned',
        jobId,
        actionLabel: 'Select Team'
      });
    } else {
      this.createNotification({
        recipientRole: 'manager',
        title: 'Account Verified — Installation Cleared to Proceed',
        message: `Accounts verified payment for job ${jobId} (${updated.doorModel}). Operations can now proceed.`,
        type: 'shop_payment_recorded',
        jobId
      });
    }

    // Second-stage notifications: Shop Manager
    const branchShopMgr = this.resolveShopManagerForJob(updated);
    this.createNotification({
      recipientRole: 'shop_manager',
      recipientUserId: branchShopMgr?.id,
      title: updated.dispatcherId ? 'Account Verified — Order Approved' : 'Account Verified — Select Driver',
      message: updated.dispatcherId
        ? `Payment for job ${jobId} (${updated.doorModel}) has been verified by Accounts.`
        : `Payment for job ${jobId} (${updated.doorModel}) has been verified by Accounts. Please select a driver for delivery.`,
      type: 'truck_assigned',
      jobId,
      actionLabel: updated.dispatcherId ? 'View Order' : 'Select Driver'
    });

    // Second-stage notifications: Client
    this.createNotification({
      recipientRole: 'client',
      recipientUserId: updated.client.id,
      title: 'Door Installation Verified & Scheduled',
      message: `Your payment for ${updated.doorModel} has been verified. Installation is scheduled for ${updated.scheduledDate} and our Operations Manager is preparing your team and delivery.`,
      type: 'job_assigned',
      jobId
    });

    // Second-stage notifications: Pre-assigned Installers (if any)
    const targetInstallerIds = (updated.assignedInstallerIds && updated.assignedInstallerIds.length > 0)
      ? updated.assignedInstallerIds
      : (updated.assignedInstallerId ? [updated.assignedInstallerId] : []);

    for (const instId of targetInstallerIds) {
      const tech = this.installers().find(i => i.id === instId);
      this.createNotification({
        recipientRole: 'installer',
        recipientUserId: instId,
        title: 'New Installation Assigned (10-Min Action Required)',
        message: `Operations Manager assigned you to install ${updated.doorModel} for ${updated.client.name} (${updated.client.siteAddress}). Scheduled: ${updated.scheduledDate}.`,
        type: 'job_assigned',
        jobId,
        actionLabel: 'Review & Respond'
      });

      this.sendSms({
        recipientRole: 'installer',
        recipientPhone: tech?.phone,
        recipientName: tech?.name || 'Installer',
        triggerEvent: 'installer_assigned',
        messageText: `DoorMaster SMS: You are assigned to install ${updated.doorModel} (${jobId}). Scheduled: ${updated.scheduledDate} at ${updated.client.siteAddress}.`,
        jobId
      });
    }

    this.alert.toastSuccess(
      'Payment Verified',
      `Shop payment for job ${jobId} (${updated.doorModel || 'Door'}) verified. Operations Manager & Shop Attendant notified.`
    );
  }

  /**
   * Account Officer dispatches technician site mobilization funds.
   */
  dispatchTechnicianSiteFunds(jobId: string, data: { amount: number; purpose?: string; transactionRef?: string }) {
    if (!this.ensureAccountVerified(jobId, 'dispatch site mobilization funds')) return;
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

    this.alert.toastSuccess(
      'Site Funds Disbursed',
      `₵${data.amount} mobilization stipend released for job ${jobId} (${data.transactionRef || 'Verified'}).`
    );
  }

  /**
   * Dispatcher confirms doors/hardware picked up at showroom & departs to site.
   */
  pickupDoorsByDriver(jobId: string) {
    if (!this.ensureAccountVerified(jobId, 'pick up doors for delivery')) return;
    const nowIso = new Date().toISOString();
    this.jobs.update(list => list.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'dispatched',
          motionLiveStarted: true,
          motionLiveStartedAt: job.motionLiveStartedAt || nowIso
        };
      }
      return job;
    }));
    this.saveJobsLocally();
    const updated = this.jobs().find(j => j.id === jobId);
    if (updated) this.persistJobToBackend(updated);

    if (updated) {
      this.createNotification({
        recipientRole: 'client',
        recipientUserId: updated.client.id || undefined,
        title: 'Doors Picked Up & En Route',
        message: `${updated.dispatcherName || 'Your driver'} has picked up ${updated.doorModel} from ${updated.shopBranch} and is heading to ${updated.client.siteAddress}.`,
        type: 'door_dispatched',
        jobId
      });
      if (updated.assignedInstallerId) {
        this.createNotification({
          recipientRole: 'installer',
          recipientUserId: updated.assignedInstallerId,
          title: 'Doors Picked Up by Driver',
          message: `${updated.dispatcherName || 'Driver'} picked up ${updated.doorModel} for job ${jobId}.`,
          type: 'door_dispatched',
          jobId
        });
      }
      this.alert.toastSuccess('Doors Picked Up', `Step 1 complete for ${jobId}. Proceed to deliver to destination.`);
    }
  }

  /**
   * Installer marks the entire task as finished & completed at the final Done step.
   */
  completeTaskAsDone(jobId: string) {
    if (!this.ensureAccountVerified(jobId, 'complete this task')) return;
    const now = new Date().toISOString();
    let completedJob: InstallationJob | undefined;

    this.jobs.update(list => list.map(job => {
      if (job.id !== jobId) return job;
      const sessions = [...(job.clockSessions || [])];
      const activeIdx = sessions.findIndex(s => !s.clockOutTime);
      if (activeIdx >= 0) {
        const inTime = new Date(sessions[activeIdx].clockInTime).getTime();
        const durMins = Math.max(1, Math.round((Date.now() - inTime) / 60000));
        sessions[activeIdx] = {
          ...sessions[activeIdx],
          clockOutTime: now,
          durationMinutes: durMins,
          notes: 'Completed & finished at Done step'
        };
      }
      completedJob = {
        ...job,
        clockSessions: sessions,
        status: 'completed'
      };
      return completedJob;
    }));
    this.saveJobsLocally();
    if (completedJob) {
      this.persistJobToBackend(completedJob);
      this.recalculateBonus(jobId);

      this.createNotification({
        recipientRole: 'manager',
        title: 'Installation Task Completed',
        message: `${completedJob.assignedInstallerName || 'Installer'} marked job ${jobId} (${completedJob.doorModel}) as finished.`,
        type: 'installation_verified',
        jobId
      });

      this.createNotification({
        recipientRole: 'client',
        recipientUserId: completedJob.client.id || undefined,
        title: 'Installation Completed',
        message: `Your installation for ${completedJob.doorModel} has been marked as completed.`,
        type: 'installation_verified',
        jobId
      });

      this.alert.toastSuccess('Task Completed', `Job ${jobId} has been marked as finished.`);
    }
  }

  /**
   * Dispatcher marks cargo as delivered on site.
   */
  markDeliveredByDriver(jobId: string) {
    if (!this.ensureAccountVerified(jobId, 'mark cargo delivered')) return;
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

    this.alert.toastSuccess(
      'Cargo Delivered on Site',
      `${updated?.doorModel || 'Door'} marked delivered at ${updated?.client.siteAddress || 'client site'}.`
    );
  }

  /**
   * Dispatcher updates trip stage for a job.
   */
  updateDispatcherTripStage(jobId: string, stage: string) {
    if (!this.ensureAccountVerified(jobId, 'update trip stage')) return;
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

    const stageLabel = stage.replace(/_/g, ' ');
    this.alert.toastSuccess('Trip Stage Updated', `Job ${jobId} updated to "${stageLabel}".`);
  }
}
