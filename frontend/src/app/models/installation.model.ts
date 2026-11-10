export type RoleType = 
  | 'admin'
  | 'account_officer' 
  | 'manager' 
  | 'client' 
  | 'installer' 
  | 'shop_manager' 
  | 'dispatcher'
  | string; // Extensible for custom future roles

export interface RoleDefinition {
  id: string;
  name: string;
  label: string;
  description: string;
  isSystem: boolean; // cannot be deleted
  color: string;
  icon: string;
  permissions: {
    canCreateJobs: boolean;
    canAssignInstallers: boolean;
    canDispatchDoors: boolean;
    canClockInOut: boolean;
    canUploadPhotos: boolean;
    canSignVerification: boolean;
    canApproveBonuses: boolean;
    canViewFinancials: boolean;
    canManageRoles: boolean;
  };
  extraFeatures?: string[]; // Extra configurable capabilities
}

export interface ExtraFeatureItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'analytics' | 'security' | 'operations' | 'communications' | 'custom';
}

export const SYSTEM_EXTRA_FEATURES: ExtraFeatureItem[] = [
  {
    id: 'export_reports',
    name: 'Export Financial & Order Reports (CSV/Excel)',
    description: 'Download raw accounting logs, technician payroll breakdowns, and installation CSV exports.',
    icon: 'file_download',
    category: 'analytics'
  },
  {
    id: 'audit_logs',
    name: 'Audit Logs & User Access Telemetry',
    description: 'Inspect live login trails, IP addresses, credential changes, and system audit history.',
    icon: 'receipt_long',
    category: 'security'
  },
  {
    id: 'sms_gateway',
    name: 'SMS Gateway Credentials & Dispatcher',
    description: 'Configure provider API tokens, sender ID, and automated client SMS notification rules.',
    icon: 'sms',
    category: 'communications'
  },
  {
    id: 'branch_registry',
    name: 'Workshop Branch Registry & GPS Coordinates',
    description: 'Manage store addresses, OpenStreetMap GPS coordinates, and regional workshop operating hours.',
    icon: 'pin_drop',
    category: 'operations'
  },
  {
    id: 'catalog_scraper',
    name: 'Automated Catalog Scraper & Importer',
    description: 'Trigger live web scraping and inventory synchronization directly from the DoorMaster shop catalog.',
    icon: 'cloud_download',
    category: 'operations'
  },
  {
    id: 'fleet_broadcast',
    name: 'Emergency Fleet Broadcast Alerts',
    description: 'Send high-priority notification broadcasts and audio chimes to on-duty flatbed drivers and techs.',
    icon: 'campaign',
    category: 'communications'
  },
  {
    id: 'quality_override',
    name: 'Quality Inspection & Tolerance Override',
    description: 'Authorize master technical sign-off and dimension tolerance clearance on custom luxury doors.',
    icon: 'verified',
    category: 'security'
  },
  {
    id: 'multi_branch',
    name: 'Global Multi-Branch Access',
    description: 'Access jobs, bookings, and installer queues across all 15 regional ateliers without branch locking.',
    icon: 'share_location',
    category: 'operations'
  }
];

export type DoorCategory = 
  | 'entrance_pivot' 
  | 'solid_wood_entrance' 
  | 'acoustic_french' 
  | 'sliding_pocket' 
  | 'bi_fold_patio' 
  | 'fire_rated_commercial' 
  | 'frameless_glass'
  | 'Premium Villa Series'
  | 'Royal Series'
  | 'Smart Lock Doors'
  | 'Mechanical Lock Doors'
  | 'Turkey interior series'
  | 'DM Interior Series'
  | 'Economy doors'
  | 'Antifade doors'
  | 'Reeded glass doors'
  | 'DM Smart Lock Handle'
  | string;

export type DoorStockStatus = 'in_stock' | 'low_stock' | 'made_to_order' | 'discontinued';

export interface DoorCatalogEntry {
  id: string; // e.g. "DR-101" or "DMO-001"
  name: string; // e.g. "AeroPivot 900 Architectural" or "Turkey interior DM001"
  modelCode: string; // e.g. "AP-900-WL" or "DM001"
  category: DoorCategory;
  dimensions: string; // "2400 × 1200 × 55mm"
  material: string; // "Smoked Oak & Reinforced Carbon Core"
  finish: string; // "Matte Natural UV Oil, PVD Bronze Trim"
  hardwareSpecs: string; // "DormaKaba Heavy Duty Pivot, 3-Point Magnetic Lock"
  fireRating: string; // "FD30", "FD60", "None / Standard"
  acousticRating: string; // "42 dB Acoustic Core", "Standard"
  unitPrice: number; // e.g. 4850
  formattedPrice?: string; // e.g. "₵4,750.00"
  stockQuantity: number; // e.g. 8
  leadTimeDays: number; // e.g. 5
  status: DoorStockStatus;
  supplierOrWorkshop: string; // e.g. "DoorMaster Custom Workshop - Atelier A"
  imageUrl?: string;
  sourceUrl?: string; // link to doormaster.online product page
  scrapedAt?: string;
  description: string;
  warrantyYears: number;
  createdAt: string;
}

export type JobStatus = 
  | 'draft' 
  | 'booked_at_shop' // Master Shop Manager scheduled request & recorded payment
  | 'truck_assigned' // Operations Manager set up truck & assigned available signed-in tech
  | 'site_funds_dispatched' // Accountant verified payment & disbursed site visit funds to technician
  | 'assigned' 
  | 'accepted' 
  | 'approved' // Operations Manager approved request after both driver and installer accepted
  | 'dispatched' // Dispatcher / Truck en route to site
  | 'delivered_on_site' // Dispatcher arrived on site & handed over door/lock
  | 'on_site' // Technician clocked in & installing lock/door
  | 'in_progress' // Technician active on site with GPS verified
  | 'installed_pending_signoff' 
  | 'completed' 
  | 'bonus_awarded';

export interface ShopBookingDetails {
  bookedByShopManager: string; // e.g. "Shop Master - Kwame Mensah"
  shopId?: string; // Reference ID to shop_locations.id (e.g. "dm-branch-central")
  shopBranch: string; // e.g. "DoorMaster Flagship Showroom - Accra Central"
  branchCode?: string;
  bookingTimestamp: string;
  lockModelRequested: string; // e.g. "Doormaster Smart Lock Handle F35"
  amountPaidAtShop: number; // e.g. ₵4,750 or ₵2,500 deposit
  paymentMethod: 'cash' | 'momo' | 'pos_card' | 'bank_transfer';
  receiptNumber: string; // e.g. "REC-2026-8812"
  paymentStatus: 'paid_in_full' | 'deposit_paid' | 'pending_verification';
  accountantVerified: boolean;
  accountantVerifiedAt?: string;
  accountantNotes?: string;
}

export interface ShopLocationSettings {
  id?: string | number;
  shopName: string;
  branchCode: string;
  address: string;
  landmark?: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  dispatchRadiusKm: number;
  operatingHours: string;
  managerName: string;
  managerEmail?: string;
  isPrimary?: boolean;
  updatedAt?: string;
}

export interface TechnicianSiteFunds {
  amount: number; // e.g. ₵250
  purpose: string; // e.g. "Site transit, tooling allowance & lock installation mobilization"
  status: 'pending_dispatch' | 'dispatched' | 'confirmed_received';
  dispatchedAt?: string;
  dispatchedBy?: string; // "Finance Officer - Sarah Jenkins"
  transactionRef?: string; // "MOMO-TRX-99482"
  disbursedToTechnicianId?: string;
  disbursedToTechnicianName?: string;
}

export interface AssignedInstallerTeamMember {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: 'lead' | 'assistant';
  position?: string;
  avatar?: string;
  avgRating?: number;
  teamId?: string;
  teamName?: string;
  isTeamLead?: boolean;
  status?: string;
  assignedAt?: string;
  deadlineAt?: string;
  respondedAt?: string;
  autoAccepted?: boolean;
  rejectReason?: string;
}

export interface InstallerTeam {
  id: string; // e.g. 'team-alpha' | 'team-bravo'
  name: string; // e.g. 'Team Alpha - Precision Architectural Installations'
  code: string; // e.g. 'ALPHA' | 'BRAVO'
  leadId: string;
  leadName: string;
  leadPhone: string;
  leadAvatarUrl?: string;
  memberIds: string[];
  members: AssignedInstallerTeamMember[];
  specialties: string[];
  positions?: string[];
  color?: string;
  description: string;
  status: 'available' | 'assigned' | 'busy_on_site' | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LogisticsTruck {
  truckId: string; // e.g. "TRK-01"
  truckPlate: string; // e.g. "GT-4821-26"
  truckModel: string; // e.g. "Mercedes-Benz Atego Heavy Delivery Flatbed"
  dispatcherId: string; // e.g. "disp_01"
  dispatcherName: string; // e.g. "Emmanuel Kojo (Lead Dispatcher)"
  dispatcherPhone: string; // e.g. "+233 24 555 0192"
  assignedAt: string;
  driverAssignedAt?: string;
  driverDeadlineAt?: string; // 10-minute auto-acceptance deadline
  driverAutoAccepted?: boolean;
  driverRejectReason?: string;
  driverProposedSlot?: string;
  driverRespondedAt?: string;
  cargoChecklistConfirmed: boolean;
  estimatedDepartureTime?: string;
  estimatedArrivalTime?: string;
  actualDepartureTime?: string;
  actualArrivalTime?: string;
  deliveryNotes?: string;
}

export interface DispatcherProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  shopId?: string;
  branchCode?: string;
  branchName?: string;
  assignedTruck: {
    plate: string;
    model: string;
    capacityKg: number;
  };
  status: 'available' | 'on_route' | 'off_duty';
  currentTripJobId: string | null;
  rating: number;
  completedDeliveries: number;
}

export interface InstallationPhoto {
  id: string;
  stage: 'before' | 'in_progress' | 'after';
  url: string;
  caption: string;
  timestamp: string;
  uploadedBy: string;
  tags?: string[];
}

export interface CustomerSignoff {
  clientName: string;
  signatureDataUrl: string; // Base64 PNG or SVG representation
  signedAt: string;
  rating: number; // 1 to 5
  feedback: string;
  siteRepresentativeName: string;
  verificationStatement: string;
}

export interface ClockSession {
  id: string;
  jobId: string;
  installerId: string;
  clockInTime: string;
  clockOutTime?: string;
  durationMinutes?: number;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  siteVerified: boolean;
  notes?: string;
}

export interface HardwareChecklistItem {
  id: string;
  label: string;
  required: boolean;
  completed: boolean;
  completedAt?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  siteAddress: string;
  accessInstructions?: string;
  lat: number;
  lng: number;
  createdAt?: string;
  updatedAt?: string;
  jobsCount?: number;
  totalSpend?: number;
  jobs?: {
    id: string;
    jobNumber: string;
    doorName: string;
    status: string;
    depositAmount: number;
    balanceDue: number;
    scheduledTime?: string;
    createdAt: string;
  }[];
}

export interface JobDoorItem {
  id: string;
  doorModel: string;
  doorCategory: DoorCategory;
  dimensions: string;
  finish: string;
  hardwareSpecs: string;
  lockModel?: string;
  unitPrice: number;
  quantity: number;
  catalogDoorId?: string;
}

export interface InstallationJob {
  id: string; // e.g. "DM-2026-104"
  title: string;
  doorId?: string; // Foreign Key to doors catalog
  doorModel: string;
  doorCategory: DoorCategory;
  doors?: JobDoorItem[]; // Multi-door items on work order
  lockModel?: string; // e.g. "Doormaster Smart Handle F35 Biometric"
  dimensions: string; // "2400mm × 1200mm × 55mm"
  finish: string; // "Smoked Oak, Matte Bronze PVD hardware"
  hardwareSpecs: string; // "DormaKaba Heavy Duty Pivot, 3-point magnetic mortise lock"
  shopId?: string; // Reference ID to shop_locations.id where created
  shopBranchCode?: string; // e.g. "DM-GH-OBY"
  shopBranch: string; // "DoorMaster Downtown Atelier"
  createdByUserId?: string;
  clientId?: string; // Foreign Key to clients table
  
  // Client & Site Owner details
  client: {
    id: string;
    name: string;
    phone: string;
    email: string;
    siteAddress: string;
    accessInstructions?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };

  // Shop Booking & Payment at Counter
  shopBooking?: ShopBookingDetails;

  // Logistics Truck & Dispatcher Driver Setup (by Operations Manager)
  logisticsTruck?: LogisticsTruck;
  dispatcherId?: string | null;
  dispatcherName?: string | null;

  // Technician Site Visit Mobilization Funds (by Accountant)
  technicianSiteFunds?: TechnicianSiteFunds;

  // Installer assignment (Single & Multi-Installer Team Support)
  assignedInstallerId: string | null;
  assignedInstallerName: string | null;
  assignedInstallerIds?: string[];
  assignedInstallerNames?: string[];
  assignedInstallers?: AssignedInstallerTeamMember[];
  assignedAt?: string;
  acceptedAt?: string;

  // Dual Acceptance & Operations Approval Lifecycle
  driverAssignmentStatus?: 'pending' | 'accepted' | 'rejected';
  driverRejectReason?: string;
  driverProposedSlot?: string;
  driverRespondedAt?: string;
  driverAssignedAt?: string;
  driverDeadlineAt?: string; // 10-minute auto-acceptance deadline
  driverAutoAccepted?: boolean;

  installerAssignmentStatus?: 'pending' | 'accepted' | 'rejected';
  installerRejectReason?: string;
  installerProposedSlot?: string;
  installerRespondedAt?: string;
  installerAssignedAt?: string;
  installerDeadlineAt?: string; // 10-minute auto-acceptance deadline
  installerAutoAccepted?: boolean;
  rejectedByInstallerName?: string;

  operationsApproved?: boolean;
  operationsApprovedAt?: string;
  operationsApprovedBy?: string;

  // Live Motion & Geolocation Tracking
  motionLiveStarted?: boolean;
  motionLiveStartedAt?: string;
  installerWorkLocation?: {
    startLat?: number;
    startLng?: number;
    startTimestamp?: string;
    startAccuracyMeters?: number;
    completeLat?: number;
    completeLng?: number;
    completeTimestamp?: string;
  };

  // Status & Progress
  status: JobStatus;
  scheduledDate: string;
  estimatedHours: number;
  actualHours?: number;

  // Site Work
  clockSessions: ClockSession[];
  hardwareChecklist: HardwareChecklistItem[];
  photos: InstallationPhoto[];
  customerSignoff?: CustomerSignoff;

  // Financials & Performance Bonus
  financials: {
    doorPrice: number;
    installationFee: number;
    laborCost: number;
    bonusAmount: number;
    bonusStatus: 'pending' | 'approved' | 'paid';
    bonusApprovedBy?: string;
    bonusApprovedAt?: string;
    depositPaid: boolean;
    balancePaid: boolean;
  };

  createdAt: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  recipientRole: RoleType;
  recipientUserId?: string;
  title: string;
  message: string;
  type: 
    | 'job_assigned' 
    | 'installer_accepted' 
    | 'driver_accepted'
    | 'driver_rejected'
    | 'truck_assigned'
    | 'site_funds_dispatched'
    | 'door_dispatched' 
    | 'door_delivered_on_site'
    | 'technician_clocked_in' 
    | 'technician_clocked_out' 
    | 'signoff_required' 
    | 'installation_verified' 
    | 'shop_payment_recorded'
    | 'bonus_awarded'
    | 'work_completed';
  jobId: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
}

export interface InstallerProfile {
  id: string;
  name: string;
  role: 'installer';
  phone: string;
  email: string;
  avatarUrl?: string;
  specialties: DoorCategory[];
  lockSpecialties: string[];
  activeJobId: string | null;
  isSignedIn: boolean;
  lastSeenAt: string;
  currentLocationName: string;
  availabilityStatus: 'available' | 'assigned' | 'busy_on_site' | 'off_duty';
  teamId?: string;
  teamName?: string;
  isTeamLead?: boolean;
  teamRole?: 'lead' | 'assistant';
  teamPosition?: string;
  metrics: {
    completedJobs: number;
    onTimeRate: number; // percentage, e.g. 98
    avgTurnaroundHours: number; // e.g. 3.2
    avgRating: number; // e.g. 4.9
    firstTimePassRate: number; // e.g. 96
    totalBonusesEarned: number; // in USD
    pendingBonuses: number; // in USD
  };
}

export interface BonusCriteriaConfig {
  baseBonusStandardDoor: number; // e.g. 100
  baseBonusArchitecturalDoor: number; // e.g. 180 (pivot, fire-rated, bi-fold)
  ratingBonusMultiplier: number; // e.g. 1.2 for 5-star
  onTimeBonusAmount: number; // e.g. 50
  cleanPhotoBonusAmount: number; // e.g. 25
}

export interface InstallationInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  doorType: DoorCategory | string;
  projectType: 'residential' | 'commercial' | 'renovation' | 'luxury_estate';
  siteAddress: string;
  preferredDate?: string;
  preferredTimeSlot?: 'morning' | 'afternoon' | 'anytime';
  doorsCount: number;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'quoted' | 'scheduled';
}

export type SmsProviderType = 'simulator' | 'arkesel' | 'hubtel' | 'twilio';

export interface SmsGatewayConfig {
  provider: SmsProviderType;
  senderId: string; // e.g. "DoorMaster"
  apiKey?: string;
  apiSecret?: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  hubtelClientId?: string;
  hubtelClientSecret?: string;
  webhookUrl?: string;
  simulationMode: boolean;
}

export interface LiveLocation {
  id: string;
  userId: string;
  userName?: string;
  role: string;
  jobId?: string;
  latitude: number;
  longitude: number;
  accuracyM?: number | null;
  heading?: number | null;
  speedKmh?: number | null;
  status: string;
  updatedAt: string;
  createdAt: string;
}

export interface SmsLogEntry {
  id: string;
  recipientPhone: string;
  recipientRole: RoleType;
  recipientName: string;
  senderId: string;
  messageText: string;
  triggerEvent: 
    | 'booking_created' 
    | 'driver_assigned' 
    | 'driver_accepted' 
    | 'driver_rejected' 
    | 'installer_assigned' 
    | 'installer_accepted' 
    | 'installer_rejected' 
    | 'operations_approved' 
    | 'installation_approved'
    | 'motion_started' 
    | 'cargo_delivered' 
    | 'installer_started_work' 
    | 'installer_completed_work'
    | 'test_ping'
    | string;
  gatewayResponse?: string;
  status: 'delivered' | 'sent' | 'simulated' | 'failed';
  timestamp: string;
  providerRef?: string;
  jobId?: string;
}

export interface UserPhoneDirectory {
  admin?: string;
  manager: string;
  shop_manager: string;
  dispatcher: string;
  installer: string;
  client: string;
  account_officer: string;
}

export type DataMode = 'demo' | 'api';

export interface DbHealthStatus {
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
}

export interface ApiAuthUser {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  phone: string;
  shopId?: string | null;
  teamId?: string | null;
  teamRole?: string | null;
  teamPosition?: string | null;
  status?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export type UserAccountStatus = 'active' | 'pending' | 'rejected' | 'deactivated';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: RoleType | string;
  phone: string;
  shopId?: string | null;
  teamId?: string | null;
  teamRole?: 'lead' | 'assistant' | string | null;
  teamPosition?: string | null;
  status: UserAccountStatus | string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImpersonationSession {
  isImpersonating: boolean;
  originalUser: {
    id: string;
    name: string;
    email: string;
    role: RoleType | string;
    phone?: string;
    shopId?: string | null;
    avatarUrl?: string;
  };
  originalRole: RoleType;
  originalInstallerId?: string | null;
  originalDispatcherId?: string | null;
  originalClientId?: string | null;
  targetUser: AppUser;
  targetRole: RoleType;
  startedAt: string;
}


