import { Injectable, computed, inject, signal } from '@angular/core';
import { DOORMASTER_SCRAPED_CATALOG } from '../data/doormaster-catalog.data';
import { AlertService } from './alert.service';
import * as i0 from "@angular/core";
const STORAGE_KEY_JOBS = 'dm_installation_jobs_v1';
const STORAGE_KEY_ROLES = 'dm_installation_roles_v1';
const STORAGE_KEY_NOTIFS = 'dm_installation_notifs_v1';
const STORAGE_KEY_INSTALLERS = 'dm_installation_technicians_v1';
const STORAGE_KEY_BONUS_RULES = 'dm_installation_bonus_rules_v1';
const STORAGE_KEY_INQUIRIES = 'dm_installation_inquiries_v1';
const STORAGE_KEY_DOORS = 'dm_installation_doors_catalog_v1';
const STORAGE_KEY_USER_PHONES = 'dm_installation_user_phones_v1';
const STORAGE_KEY_SMS_CONFIG = 'dm_installation_sms_config_v1';
const STORAGE_KEY_SMS_LOGS = 'dm_installation_sms_logs_v1';
const STORAGE_KEY_SHOP_LOCATION = 'dm_installation_shop_location_v1';
const STORAGE_KEY_DATA_MODE = 'dm_installation_data_mode_v1';
const STORAGE_KEY_API_USER = 'dm_installation_api_user_v1';
const STORAGE_KEY_API_TOKEN = 'dm_installation_api_token_v1';
export class InstallationStore {
    alert = inject(AlertService);
    // Current active role perspective for testing & usage
    currentRole = signal('manager', ...(ngDevMode ? [{ debugName: "currentRole" }] : /* istanbul ignore next */ []));
    currentInstallerId = signal('inst_01', ...(ngDevMode ? [{ debugName: "currentInstallerId" }] : /* istanbul ignore next */ [])); // Marcus Vance by default
    currentClientId = signal('cli_01', ...(ngDevMode ? [{ debugName: "currentClientId" }] : /* istanbul ignore next */ [])); // Eleanor Vance / The Glasshouse Residence
    currentDispatcherId = signal('disp_01', ...(ngDevMode ? [{ debugName: "currentDispatcherId" }] : /* istanbul ignore next */ [])); // Emmanuel Kojo by default
    // Predefined System Roles & dynamic custom roles
    roles = signal([
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
                canDispatchDoors: true,
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
            name: 'Field Technician / Installer',
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
            description: 'Workshop branch: track custom door fabrication, assemble hardware packs, and dispatch to installation site.',
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
    ], ...(ngDevMode ? [{ debugName: "roles" }] : /* istanbul ignore next */ []));
    // Bonus Rules Engine
    bonusRules = signal({
        baseBonusStandardDoor: 95,
        baseBonusArchitecturalDoor: 160,
        ratingBonusMultiplier: 1.25, // 25% boost for 5-star
        onTimeBonusAmount: 40,
        cleanPhotoBonusAmount: 25
    }, ...(ngDevMode ? [{ debugName: "bonusRules" }] : /* istanbul ignore next */ []));
    // Installers / Field Technicians Directory (with Signed-in & Availability Status)
    installers = signal([
        {
            id: 'inst_01',
            name: 'Marcus Vance',
            role: 'installer',
            phone: '+233 24 112 8891',
            email: 'm.vance@doormasterops.com',
            avatarUrl: '',
            specialties: ['entrance_pivot', 'solid_wood_entrance', 'Premium Villa Series', 'Smart Lock Doors'],
            lockSpecialties: ['Smart Biometric Locks', 'Italian High-Security Mortise', 'FritsJurgens System M+'],
            activeJobId: 'DM-2026-101',
            isSignedIn: true,
            lastSeenAt: 'Just now (Site GPS active)',
            currentLocationName: 'Airport Residential / Highview Terraces',
            availabilityStatus: 'busy_on_site',
            metrics: {
                completedJobs: 42,
                onTimeRate: 98,
                avgTurnaroundHours: 3.1,
                avgRating: 4.95,
                firstTimePassRate: 97,
                totalBonusesEarned: 6450,
                pendingBonuses: 365
            }
        },
        {
            id: 'inst_02',
            name: 'Devon Sterling',
            role: 'installer',
            phone: '+233 20 345 9912',
            email: 'd.sterling@doormasterops.com',
            avatarUrl: '',
            specialties: ['fire_rated_commercial', 'acoustic_french', 'sliding_pocket'],
            lockSpecialties: ['Briton Panic Crash Bars', 'Intumescent Core Closers', 'Magnetic Deadbolts'],
            activeJobId: 'DM-2026-102',
            isSignedIn: true,
            lastSeenAt: '5 mins ago',
            currentLocationName: 'Waterfront Boulevard Logistics Hub',
            availabilityStatus: 'assigned',
            metrics: {
                completedJobs: 38,
                onTimeRate: 95,
                avgTurnaroundHours: 3.8,
                avgRating: 4.88,
                firstTimePassRate: 94,
                totalBonusesEarned: 5280,
                pendingBonuses: 220
            }
        },
        {
            id: 'inst_03',
            name: 'Elena Rostova',
            role: 'installer',
            phone: '+233 55 456 1123',
            email: 'e.rostova@doormasterops.com',
            avatarUrl: '',
            specialties: ['frameless_glass', 'entrance_pivot', 'Royal Series', 'Reeded glass doors'],
            lockSpecialties: ['DORMA Patch Glass Fittings', 'Floor Spring Hydraulics', 'Smart Keyless Escutcheons'],
            activeJobId: null,
            isSignedIn: true,
            lastSeenAt: 'Online (Ready at Central Workshop)',
            currentLocationName: 'DoorMaster Central Showroom & Atelier',
            availabilityStatus: 'available',
            metrics: {
                completedJobs: 29,
                onTimeRate: 100,
                avgTurnaroundHours: 2.9,
                avgRating: 5.0,
                firstTimePassRate: 100,
                totalBonusesEarned: 4890,
                pendingBonuses: 0
            }
        },
        {
            id: 'inst_04',
            name: 'Tariq Al-Mansoor',
            role: 'installer',
            phone: '+233 27 567 2234',
            email: 't.mansoor@doormasterops.com',
            avatarUrl: '',
            specialties: ['solid_wood_entrance', 'sliding_pocket', 'Turkey interior series', 'Economy doors'],
            lockSpecialties: ['3D Concealed Hinges', 'TUYA App Biometric Handles', 'CISA Mortise Locks'],
            activeJobId: null,
            isSignedIn: true,
            lastSeenAt: 'Online (East Legon Depot)',
            currentLocationName: 'East Legon Service Depot',
            availabilityStatus: 'available',
            metrics: {
                completedJobs: 24,
                onTimeRate: 92,
                avgTurnaroundHours: 4.1,
                avgRating: 4.75,
                firstTimePassRate: 91,
                totalBonusesEarned: 3120,
                pendingBonuses: 110
            }
        },
        {
            id: 'inst_05',
            name: 'Kofi Asare',
            role: 'installer',
            phone: '+233 24 883 9901',
            email: 'k.asare@doormasterops.com',
            avatarUrl: '',
            specialties: ['Premium Villa Series', 'Smart Lock Doors', 'Antifade doors'],
            lockSpecialties: ['Doormaster Smart Handle F35', 'Biometric Fingerprint Locks', 'High-Security Steel Bolts'],
            activeJobId: null,
            isSignedIn: true,
            lastSeenAt: 'Online (Spintex Road)',
            currentLocationName: 'Spintex Branch Staging Area',
            availabilityStatus: 'available',
            metrics: {
                completedJobs: 31,
                onTimeRate: 96,
                avgTurnaroundHours: 3.3,
                avgRating: 4.9,
                firstTimePassRate: 96,
                totalBonusesEarned: 4200,
                pendingBonuses: 0
            }
        }
    ], ...(ngDevMode ? [{ debugName: "installers" }] : /* istanbul ignore next */ []));
    // Logistics Dispatchers & Delivery Drivers
    dispatchers = signal([
        {
            id: 'disp_01',
            name: 'Emmanuel Kojo',
            phone: '+233 24 555 0192',
            email: 'e.kojo@doormasterops.com',
            assignedTruck: {
                plate: 'GT-4821-26',
                model: 'Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler',
                capacityKg: 3500
            },
            status: 'available',
            currentTripJobId: null,
            rating: 4.95,
            completedDeliveries: 142
        },
        {
            id: 'disp_02',
            name: 'Samuel Mensah',
            phone: '+233 20 441 8923',
            email: 's.mensah@doormasterops.com',
            assignedTruck: {
                plate: 'GN-1904-25',
                model: 'Isuzu NPR Enclosed Box Logistics Truck',
                capacityKg: 2800
            },
            status: 'available',
            currentTripJobId: null,
            rating: 4.88,
            completedDeliveries: 108
        },
        {
            id: 'disp_03',
            name: 'Francis Darko',
            phone: '+233 55 982 3411',
            email: 'f.darko@doormasterops.com',
            assignedTruck: {
                plate: 'GE-7720-26',
                model: 'Toyota Dyna Fast Logistics Van with Hydraulic Tailgate',
                capacityKg: 1800
            },
            status: 'available',
            currentTripJobId: null,
            rating: 4.92,
            completedDeliveries: 94
        }
    ], ...(ngDevMode ? [{ debugName: "dispatchers" }] : /* istanbul ignore next */ []));
    // Delivery Truck Fleet
    trucks = signal([
        { id: 'TRK-01', plate: 'GT-4821-26', model: 'Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler', capacity: '3.5 Tons (Handles Grand Villa Doors)', status: 'available' },
        { id: 'TRK-02', plate: 'GN-1904-25', model: 'Isuzu NPR Enclosed Weatherproof Cargo Hauler', capacity: '2.8 Tons (Acoustic & Interior Sets)', status: 'available' },
        { id: 'TRK-03', plate: 'GE-7720-26', model: 'Toyota Dyna Rapid Response Van with Hydraulic Lift', capacity: '1.8 Tons (Locks & Hardware Packs)', status: 'available' },
        { id: 'TRK-04', plate: 'GW-3310-26', model: 'Ford Transit High-Roof Architectural Carrier', capacity: '2.2 Tons', status: 'available' }
    ], ...(ngDevMode ? [{ debugName: "trucks" }] : /* istanbul ignore next */ []));
    // Installation Jobs
    jobs = signal([], ...(ngDevMode ? [{ debugName: "jobs" }] : /* istanbul ignore next */ []));
    // Notifications
    notifications = signal([], ...(ngDevMode ? [{ debugName: "notifications" }] : /* istanbul ignore next */ []));
    // Customer Installation Inquiries from Landing Page
    inquiries = signal([], ...(ngDevMode ? [{ debugName: "inquiries" }] : /* istanbul ignore next */ []));
    // Door Inventory Catalog
    doors = signal([], ...(ngDevMode ? [{ debugName: "doors" }] : /* istanbul ignore next */ []));
    // User verified mobile phones for automated SMS routing
    userPhones = signal({
        manager: '+233 24 100 0001',
        shop_manager: '+233 24 100 0002',
        dispatcher: '+233 24 555 0192',
        installer: '+233 24 881 0293',
        client: '+233 24 883 9921',
        account_officer: '+233 24 100 0005'
    }, ...(ngDevMode ? [{ debugName: "userPhones" }] : /* istanbul ignore next */ []));
    // SMS Gateway Configuration (Arkesel, Hubtel, Twilio, or Dev Simulator)
    smsGatewayConfig = signal({
        provider: 'simulator',
        senderId: 'DoorMaster',
        simulationMode: true
    }, ...(ngDevMode ? [{ debugName: "smsGatewayConfig" }] : /* istanbul ignore next */ []));
    // Sent SMS Logs
    smsLogs = signal([
        {
            id: 'sms_seed_1',
            recipientPhone: '+233 24 883 9921',
            recipientRole: 'client',
            recipientName: 'Eleanor Vance',
            senderId: 'DoorMaster',
            messageText: 'DoorMaster: Your installation request for Turkey interior DM001 with Smart Lock Handle F35 is booked. Ref: DM-2026-101.',
            triggerEvent: 'booking_created',
            status: 'delivered',
            timestamp: new Date(Date.now() - 3600000).toISOString()
        }
    ], ...(ngDevMode ? [{ debugName: "smsLogs" }] : /* istanbul ignore next */ []));
    // Shop Manager Workshop Location & Settings (Stored in MySQL)
    shopLocation = signal({
        id: 1,
        shopName: 'DoorMaster Flagship Workshop - Atelier A',
        branchCode: 'DM-ACC-01',
        address: 'Plot 48, Spintex Road Industrial Area',
        city: 'Accra',
        region: 'Greater Accra',
        phone: '+233 24 100 0002',
        email: 'spintex.workshop@doormasterops.com',
        latitude: 5.6231,
        longitude: -0.1582,
        dispatchRadiusKm: 25,
        operatingHours: 'Mon - Sat: 08:00 - 18:00',
        managerName: 'Kwame Mensah - Master Shop Manager',
        isPrimary: true
    }, ...(ngDevMode ? [{ debugName: "shopLocation" }] : /* istanbul ignore next */ []));
    // Data Mode: 'demo' (mock/offline demo fixtures) vs 'api' (live MySQL backend)
    dataMode = signal('demo', ...(ngDevMode ? [{ debugName: "dataMode" }] : /* istanbul ignore next */ []));
    dbStatus = signal(null, ...(ngDevMode ? [{ debugName: "dbStatus" }] : /* istanbul ignore next */ []));
    isDbChecking = signal(false, ...(ngDevMode ? [{ debugName: "isDbChecking" }] : /* istanbul ignore next */ []));
    apiUser = signal(null, ...(ngDevMode ? [{ debugName: "apiUser" }] : /* istanbul ignore next */ []));
    apiToken = signal(null, ...(ngDevMode ? [{ debugName: "apiToken" }] : /* istanbul ignore next */ []));
    // User Management Signals
    users = signal([], ...(ngDevMode ? [{ debugName: "users" }] : /* istanbul ignore next */ []));
    pendingUsers = computed(() => this.users().filter(u => u.status === 'pending'), ...(ngDevMode ? [{ debugName: "pendingUsers" }] : /* istanbul ignore next */ []));
    activeUsers = computed(() => this.users().filter(u => u.status === 'active'), ...(ngDevMode ? [{ debugName: "activeUsers" }] : /* istanbul ignore next */ []));
    deactivatedUsers = computed(() => this.users().filter(u => u.status === 'deactivated' || u.status === 'rejected'), ...(ngDevMode ? [{ debugName: "deactivatedUsers" }] : /* istanbul ignore next */ []));
    // Door Scraping & Live Sync State from https://doormaster.online/shop/
    isScraping = signal(false, ...(ngDevMode ? [{ debugName: "isScraping" }] : /* istanbul ignore next */ []));
    lastSyncTimestamp = signal(null, ...(ngDevMode ? [{ debugName: "lastSyncTimestamp" }] : /* istanbul ignore next */ []));
    syncSource = signal('doormaster.online catalog', ...(ngDevMode ? [{ debugName: "syncSource" }] : /* istanbul ignore next */ []));
    syncError = signal(null, ...(ngDevMode ? [{ debugName: "syncError" }] : /* istanbul ignore next */ []));
    // Available categories dynamically extracted from current doors
    availableCategories = computed(() => {
        const list = this.doors();
        const catCounts = new Map();
        list.forEach(d => {
            const cat = d.category || 'General Doors';
            catCounts.set(cat, (catCounts.get(cat) || 0) + 1);
        });
        return Array.from(catCounts.entries()).map(([name, count]) => ({ name, count }));
    }, ...(ngDevMode ? [{ debugName: "availableCategories" }] : /* istanbul ignore next */ []));
    doorStats = computed(() => {
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
    }, ...(ngDevMode ? [{ debugName: "doorStats" }] : /* istanbul ignore next */ []));
    // Computed views & statistics
    currentRoleDefinition = computed(() => {
        const roleId = this.currentRole();
        return this.roles().find(r => r.id === roleId) || this.roles()[0];
    }, ...(ngDevMode ? [{ debugName: "currentRoleDefinition" }] : /* istanbul ignore next */ []));
    unreadNotificationsCount = computed(() => {
        const role = this.currentRole();
        return this.notifications().filter(n => !n.read && (n.recipientRole === role || n.recipientRole === 'all')).length;
    }, ...(ngDevMode ? [{ debugName: "unreadNotificationsCount" }] : /* istanbul ignore next */ []));
    roleNotifications = computed(() => {
        const role = this.currentRole();
        return this.notifications().filter(n => n.recipientRole === role || n.recipientRole === 'all');
    }, ...(ngDevMode ? [{ debugName: "roleNotifications" }] : /* istanbul ignore next */ []));
    activeJobForCurrentInstaller = computed(() => {
        const instId = this.currentInstallerId();
        return this.jobs().find(j => j.assignedInstallerId === instId && (j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched'));
    }, ...(ngDevMode ? [{ debugName: "activeJobForCurrentInstaller" }] : /* istanbul ignore next */ []));
    clientJobs = computed(() => {
        const cliId = this.currentClientId();
        return this.jobs().filter(j => j.client.id === cliId);
    }, ...(ngDevMode ? [{ debugName: "clientJobs" }] : /* istanbul ignore next */ []));
    // Signed in and available technicians
    signedInInstallers = computed(() => this.installers().filter(i => i.isSignedIn), ...(ngDevMode ? [{ debugName: "signedInInstallers" }] : /* istanbul ignore next */ []));
    availableInstallers = computed(() => this.installers().filter(i => i.isSignedIn && i.availabilityStatus === 'available'), ...(ngDevMode ? [{ debugName: "availableInstallers" }] : /* istanbul ignore next */ []));
    // Active Dispatcher and assigned deliveries
    activeDispatcher = computed(() => {
        const id = this.currentDispatcherId();
        return this.dispatchers().find(d => d.id === id) || this.dispatchers()[0];
    }, ...(ngDevMode ? [{ debugName: "activeDispatcher" }] : /* istanbul ignore next */ []));
    dispatcherJobs = computed(() => {
        const dispId = this.currentDispatcherId();
        return this.jobs().filter(j => j.dispatcherId === dispId ||
            (!j.dispatcherId && (j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || j.status === 'dispatched' || j.status === 'delivered_on_site')));
    }, ...(ngDevMode ? [{ debugName: "dispatcherJobs" }] : /* istanbul ignore next */ []));
    // Cross-role workflow queues
    shopPendingTruckSetupJobs = computed(() => this.jobs().filter(j => j.status === 'booked_at_shop' || (!j.assignedInstallerId && j.status !== 'completed' && j.status !== 'bonus_awarded')), ...(ngDevMode ? [{ debugName: "shopPendingTruckSetupJobs" }] : /* istanbul ignore next */ []));
    shopPendingDriverJobs = computed(() => this.jobs().filter(j => (j.status === 'assigned' || j.status === 'booked_at_shop') && !!j.assignedInstallerId && !j.dispatcherId), ...(ngDevMode ? [{ debugName: "shopPendingDriverJobs" }] : /* istanbul ignore next */ []));
    pendingFinanceVerificationJobs = computed(() => this.jobs().filter(j => j.shopBooking && !j.shopBooking.accountantVerified), ...(ngDevMode ? [{ debugName: "pendingFinanceVerificationJobs" }] : /* istanbul ignore next */ []));
    pendingTechMobilizationJobs = computed(() => this.jobs().filter(j => j.technicianSiteFunds && j.technicianSiteFunds.status === 'pending_dispatch'), ...(ngDevMode ? [{ debugName: "pendingTechMobilizationJobs" }] : /* istanbul ignore next */ []));
    totalShopCollections = computed(() => this.jobs().reduce((sum, j) => sum + (j.shopBooking?.amountPaidAtShop || 0), 0), ...(ngDevMode ? [{ debugName: "totalShopCollections" }] : /* istanbul ignore next */ []));
    totalSiteFundsDispatched = computed(() => this.jobs().reduce((sum, j) => sum + (j.technicianSiteFunds?.status === 'dispatched' ? j.technicianSiteFunds.amount : 0), 0), ...(ngDevMode ? [{ debugName: "totalSiteFundsDispatched" }] : /* istanbul ignore next */ []));
    stats = computed(() => {
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
    }, ...(ngDevMode ? [{ debugName: "stats" }] : /* istanbul ignore next */ []));
    // Cross-tab and live dashboard synchronization
    syncChannel = null;
    autoSyncTimer = null;
    constructor() {
        this.loadInitialData();
        this.initSyncChannel();
        this.startAutoSync();
    }
    initSyncChannel() {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            try {
                this.syncChannel = new BroadcastChannel('doormaster_ops_sync');
                this.syncChannel.onmessage = (event) => {
                    this.handleSyncMessage(event.data);
                };
            }
            catch (e) {
                console.warn('BroadcastChannel initialization warning:', e);
            }
        }
    }
    broadcastSyncUpdate(payload) {
        if (this.syncChannel) {
            try {
                this.syncChannel.postMessage(payload);
            }
            catch (e) {
                console.warn('Failed broadcasting sync update:', e);
            }
        }
    }
    handleSyncMessage(data) {
        if (data?.type === 'SHOP_LOCATION_UPDATED') {
            this.loadShopLocationFromBackend();
        }
        if (this.dataMode() === 'api') {
            this.loadJobsFromBackend();
            this.loadNotificationsFromBackend();
            this.loadSmsLogsFromBackend();
            this.loadShopLocationFromBackend();
        }
        else {
            const storedJobs = localStorage.getItem(STORAGE_KEY_JOBS);
            if (storedJobs) {
                try {
                    this.jobs.set(JSON.parse(storedJobs));
                }
                catch { }
            }
            const storedNotifs = localStorage.getItem(STORAGE_KEY_NOTIFS);
            if (storedNotifs) {
                try {
                    this.notifications.set(JSON.parse(storedNotifs));
                }
                catch { }
            }
            const storedSms = localStorage.getItem(STORAGE_KEY_SMS_LOGS);
            if (storedSms) {
                try {
                    this.smsLogs.set(JSON.parse(storedSms));
                }
                catch { }
            }
            const storedLoc = localStorage.getItem(STORAGE_KEY_SHOP_LOCATION);
            if (storedLoc) {
                try {
                    this.shopLocation.set(JSON.parse(storedLoc));
                }
                catch { }
            }
        }
    }
    startAutoSync() {
        if (this.autoSyncTimer)
            return;
        if (typeof window !== 'undefined') {
            this.autoSyncTimer = setInterval(() => {
                if (this.dataMode() === 'api') {
                    this.loadJobsFromBackend();
                    this.loadNotificationsFromBackend();
                    this.loadSmsLogsFromBackend();
                }
            }, 4000);
        }
    }
    // --- Initializer & Local Storage Persistence ---
    loadInitialData() {
        try {
            const storedJobs = localStorage.getItem(STORAGE_KEY_JOBS);
            const storedRoles = localStorage.getItem(STORAGE_KEY_ROLES);
            const storedNotifs = localStorage.getItem(STORAGE_KEY_NOTIFS);
            const storedTechs = localStorage.getItem(STORAGE_KEY_INSTALLERS);
            const storedRules = localStorage.getItem(STORAGE_KEY_BONUS_RULES);
            const storedDataMode = localStorage.getItem(STORAGE_KEY_DATA_MODE);
            if (storedDataMode === 'api') {
                this.dataMode.set('api');
                this.jobs.set([]);
                this.currentClientId.set('');
                this.smsLogs.set([]);
                this.inquiries.set([]);
                this.notifications.set([]);
            }
            else {
                this.dataMode.set('demo');
                if (storedJobs) {
                    try {
                        this.jobs.set(JSON.parse(storedJobs));
                    }
                    catch {
                        this.jobs.set(this.getSeedJobs());
                    }
                }
                else {
                    this.jobs.set(this.getSeedJobs());
                    this.saveJobs();
                }
                if (storedNotifs) {
                    this.notifications.set(JSON.parse(storedNotifs));
                }
                else {
                    this.notifications.set(this.getSeedNotifications());
                    this.saveNotifications();
                }
                if (storedTechs) {
                    this.installers.set(JSON.parse(storedTechs));
                }
                const storedInquiries = localStorage.getItem(STORAGE_KEY_INQUIRIES);
                if (storedInquiries) {
                    this.inquiries.set(JSON.parse(storedInquiries));
                }
                else {
                    this.inquiries.set(this.getSeedInquiries());
                    this.saveInquiries();
                }
                const storedSmsLogs = localStorage.getItem(STORAGE_KEY_SMS_LOGS);
                if (storedSmsLogs) {
                    try {
                        this.smsLogs.set(JSON.parse(storedSmsLogs));
                    }
                    catch {
                        // Keep default SMS logs if parsing fails
                    }
                }
            }
            if (storedRoles) {
                this.roles.set(JSON.parse(storedRoles));
            }
            if (storedRules) {
                this.bonusRules.set(JSON.parse(storedRules));
            }
            const storedDoors = localStorage.getItem(STORAGE_KEY_DOORS);
            if (storedDoors) {
                try {
                    const parsed = JSON.parse(storedDoors);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        this.doors.set(parsed);
                    }
                    else {
                        this.doors.set(this.getSeedDoors());
                    }
                }
                catch {
                    this.doors.set(this.getSeedDoors());
                }
            }
            else {
                this.doors.set(this.getSeedDoors());
                this.saveDoors();
            }
            const storedPhones = localStorage.getItem(STORAGE_KEY_USER_PHONES);
            if (storedPhones) {
                try {
                    this.userPhones.set(JSON.parse(storedPhones));
                }
                catch {
                    // Keep default user phones if parsing fails
                }
            }
            const storedSmsConfig = localStorage.getItem(STORAGE_KEY_SMS_CONFIG);
            if (storedSmsConfig) {
                try {
                    this.smsGatewayConfig.set(JSON.parse(storedSmsConfig));
                }
                catch {
                    // Keep default SMS gateway config if parsing fails
                }
            }
            if (storedDataMode === 'api' || storedDataMode === 'demo') {
                this.dataMode.set(storedDataMode);
            }
            const storedApiUser = localStorage.getItem(STORAGE_KEY_API_USER);
            if (storedApiUser) {
                try {
                    this.apiUser.set(JSON.parse(storedApiUser));
                }
                catch { }
            }
            const storedApiToken = localStorage.getItem(STORAGE_KEY_API_TOKEN);
            if (storedApiToken) {
                this.apiToken.set(storedApiToken);
            }
            const storedShopLocation = localStorage.getItem(STORAGE_KEY_SHOP_LOCATION);
            if (storedShopLocation) {
                try {
                    this.shopLocation.set(JSON.parse(storedShopLocation));
                }
                catch { }
            }
            // Automatically sync latest DoorMaster catalog from backend Express service & check DB
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    this.checkDbStatus();
                    this.fetchDoorsFromBackend(false);
                    this.loadShopLocationFromBackend();
                    if (this.dataMode() === 'api') {
                        this.clearMockDataForApiMode();
                        this.loadJobsFromBackend();
                        this.loadNotificationsFromBackend();
                        this.loadSmsLogsFromBackend();
                        this.loadInquiriesFromBackend();
                        this.loadUsers();
                    }
                    else {
                        this.loadUsers();
                    }
                }, 100);
            }
        }
        catch {
            this.jobs.set(this.getSeedJobs());
            this.notifications.set(this.getSeedNotifications());
            this.inquiries.set(this.getSeedInquiries());
            this.doors.set(this.getSeedDoors());
        }
    }
    saveDoors() {
        try {
            localStorage.setItem(STORAGE_KEY_DOORS, JSON.stringify(this.doors()));
        }
        catch (e) {
            console.warn('Failed saving doors catalog', e);
        }
    }
    saveUserPhones() {
        try {
            localStorage.setItem(STORAGE_KEY_USER_PHONES, JSON.stringify(this.userPhones()));
        }
        catch (e) {
            console.warn('Failed saving user phones', e);
        }
    }
    saveSmsGatewayConfig() {
        try {
            localStorage.setItem(STORAGE_KEY_SMS_CONFIG, JSON.stringify(this.smsGatewayConfig()));
        }
        catch (e) {
            console.warn('Failed saving SMS config', e);
        }
    }
    saveSmsLogs() {
        try {
            localStorage.setItem(STORAGE_KEY_SMS_LOGS, JSON.stringify(this.smsLogs()));
        }
        catch (e) {
            console.warn('Failed saving SMS logs', e);
        }
    }
    saveJobs() {
        try {
            localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(this.jobs()));
        }
        catch (e) {
            console.warn('Failed saving jobs', e);
        }
    }
    saveRoles() {
        try {
            localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(this.roles()));
        }
        catch (e) {
            console.warn('Failed saving roles', e);
        }
    }
    saveNotifications() {
        try {
            localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(this.notifications()));
        }
        catch (e) {
            console.warn('Failed saving notifications', e);
        }
    }
    saveInstallers() {
        try {
            localStorage.setItem(STORAGE_KEY_INSTALLERS, JSON.stringify(this.installers()));
        }
        catch (e) {
            console.warn('Failed saving installers', e);
        }
    }
    saveInquiries() {
        try {
            localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(this.inquiries()));
        }
        catch (e) {
            console.warn('Failed saving inquiries', e);
        }
    }
    // --- Core Lifecycle Workflows ---
    /**
     * Operations Manager assigns an installer to a door installation job.
     * Requirement: "I want installers to get a notification when they are assigned."
     */
    assignInstaller(jobId, installerId) {
        const installer = this.installers().find(i => i.id === installerId);
        if (!installer)
            return;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                return {
                    ...job,
                    assignedInstallerId: installer.id,
                    assignedInstallerName: installer.name,
                    assignedAt: new Date().toISOString(),
                    status: 'assigned'
                };
            }
            return job;
        }));
        this.saveJobs();
        this.alert.toastSuccess('Installer Assigned', `Job assigned to ${installer.name}.`);
        // Trigger instant notification to Installer
        const targetJob = this.jobs().find(j => j.id === jobId);
        this.createNotification({
            recipientRole: 'installer',
            recipientUserId: installer.id,
            title: 'New Door Installation Assigned',
            message: `You have been assigned to ${targetJob?.doorModel} at ${targetJob?.client.siteAddress}. Scheduled for ${targetJob?.scheduledDate}. Tap to accept.`,
            type: 'job_assigned',
            jobId: jobId,
            actionLabel: 'Review & Accept'
        });
    }
    /**
     * Field Installer accepts the assigned installation job.
     * Requirement: "there should be a notification to the client when installers accept an installation"
     */
    acceptInstallation(jobId) {
        let updatedJob;
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
        this.saveJobs();
        if (updatedJob) {
            // Trigger notification to the Client!
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'Installer Confirmed Your Installation',
                message: `DoorMaster technician ${updatedJob.assignedInstallerName || 'Marcus Vance'} has confirmed and accepted your installation of ${updatedJob.doorModel}. Scheduled date: ${updatedJob.scheduledDate}.`,
                type: 'installer_accepted',
                jobId: jobId,
                actionLabel: 'View Installation Schedule'
            });
            // Also notify Manager
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
     * DoorMaster Shop Manager marks door and hardware ready & dispatched to site
     */
    dispatchDoor(jobId) {
        const target = this.jobs().find(j => j.id === jobId);
        if (!target?.assignedInstallerId) {
            this.alert.toastWarning('Installer Required', 'Cannot dispatch door until an installer is assigned to this job.');
            return;
        }
        let updatedJob;
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
        this.saveJobs();
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
     * Requirement: "they should be able to clock in on site and clock out."
     */
    clockIn(jobId, latitude, longitude, accuracyMeters = 12) {
        const now = new Date().toISOString();
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                const newSession = {
                    id: `clk_${Date.now()}`,
                    jobId,
                    installerId: job.assignedInstallerId || this.currentInstallerId(),
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
        this.saveJobs();
        if (updatedJob) {
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(updatedJob);
                if (typeof window !== 'undefined') {
                    fetch('/api/tracking/installer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            installerId: updatedJob.assignedInstallerId || this.currentInstallerId(),
                            installerName: updatedJob.assignedInstallerName || 'Field Technician',
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
            }
            // Notify Client: Technician is on site!
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'DoorMaster Installer Has Arrived on Site',
                message: `${updatedJob.assignedInstallerName || 'Technician'} has clocked in on site at ${updatedJob.client.siteAddress} and begun site preparation.`,
                type: 'technician_clocked_in',
                jobId: jobId
            });
            // Notify Manager
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
    clockOut(jobId, notes) {
        const now = new Date().toISOString();
        let updatedJob;
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
        this.saveJobs();
        if (updatedJob) {
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(updatedJob);
                if (typeof window !== 'undefined') {
                    fetch('/api/tracking/installer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            installerId: updatedJob.assignedInstallerId || this.currentInstallerId(),
                            installerName: updatedJob.assignedInstallerName || 'Field Technician',
                            jobId,
                            sessionType: 'clock_out',
                            notes: notes || 'Technician completed shift / installation work'
                        })
                    }).catch(err => console.warn('Installer track sync warning:', err));
                }
            }
            this.createNotification({
                recipientRole: 'manager',
                title: 'Technician Clocked Out',
                message: `${updatedJob.assignedInstallerName} clocked out of job ${updatedJob.id}. Total logged time: ${updatedJob.actualHours} hrs.`,
                type: 'technician_clocked_out',
                jobId: jobId
            });
            // If pending customer verification, notify client
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
    toggleChecklistItem(jobId, itemId) {
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
        this.saveJobs();
    }
    /**
     * Upload photo of completed work or site prep.
     * Requirement: "Also include photo upload capabilities for completed work"
     */
    uploadPhoto(jobId, stage, url, caption) {
        const photo = {
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
        this.saveJobs();
        // Auto-recalculate bonus potential with clean photos
        this.recalculateBonus(jobId);
    }
    /**
     * Submit customer digital signature & satisfaction verification.
     * Requirement: "signature capture for customer verification."
     */
    submitCustomerSignoff(jobId, signoffData) {
        let completedJob;
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
        this.saveJobs();
        if (completedJob) {
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(completedJob);
                if (typeof window !== 'undefined') {
                    fetch('/api/signoff', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jobId,
                            clientName: signoffData.clientName,
                            clientPhone: completedJob.client?.phone,
                            rating: signoffData.rating,
                            feedback: signoffData.feedback,
                            signatureDataUrl: signoffData.signatureDataUrl,
                            satisfactionLevel: signoffData.rating >= 4 ? 'Excellent' : 'Satisfactory'
                        })
                    }).catch(err => console.warn('Customer signoff sync warning:', err));
                }
            }
            // Calculate bonus
            this.recalculateBonus(jobId);
            // Update installer metrics
            if (completedJob.assignedInstallerId) {
                this.updateInstallerMetricsOnCompletion(completedJob.assignedInstallerId, signoffData.rating);
            }
            // Notify manager and account officer
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
     * Requirement: "performance dashboard that tracks installation by installers so as to attract bonuses as agreed on by management."
     */
    recalculateBonus(jobId) {
        const job = this.jobs().find(j => j.id === jobId);
        if (!job)
            return;
        const rules = this.bonusRules();
        const isArchitectural = ['entrance_pivot', 'bi_fold_patio', 'fire_rated_commercial'].includes(job.doorCategory);
        let base = isArchitectural ? rules.baseBonusArchitecturalDoor : rules.baseBonusStandardDoor;
        // Check on-time completion (if actualHours <= estimatedHours)
        const onTime = job.actualHours ? job.actualHours <= job.estimatedHours : true;
        if (onTime) {
            base += rules.onTimeBonusAmount;
        }
        // Photo compliance (at least 2 photos including 'after' photo)
        const hasCompletedPhotos = job.photos.some(p => p.stage === 'after');
        if (hasCompletedPhotos) {
            base += rules.cleanPhotoBonusAmount;
        }
        // Customer rating multiplier
        if (job.customerSignoff) {
            if (job.customerSignoff.rating >= 5) {
                base = Math.round(base * rules.ratingBonusMultiplier);
            }
            else if (job.customerSignoff.rating >= 4) {
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
        this.saveJobs();
    }
    /**
     * Management / Account Officer approves the installer bonus
     */
    approveBonus(jobId, approvedBy) {
        let targetJob;
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
        this.saveJobs();
        if (targetJob && targetJob.assignedInstallerId) {
            // Update installer pending to earned
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
            this.saveInstallers();
            // Notify installer
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
    markBonusPaid(jobId) {
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
        this.saveJobs();
    }
    updateInstallerMetricsOnCompletion(installerId, rating) {
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
        this.saveInstallers();
    }
    // --- Dynamic Roles & Extensibility ---
    addCustomRole(roleDef) {
        const newRole = {
            ...roleDef,
            isSystem: false
        };
        this.roles.update(r => [...r, newRole]);
        this.saveRoles();
    }
    updateRole(roleDef) {
        this.roles.update(r => r.map(item => item.id === roleDef.id ? roleDef : item));
        this.saveRoles();
    }
    deleteCustomRole(roleId) {
        this.roles.update(r => r.filter(item => item.id !== roleId || item.isSystem));
        this.saveRoles();
    }
    // --- Job Creation ---
    createJob(jobData) {
        const newId = `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
        const newJob = {
            ...jobData,
            id: newId,
            installerAssignmentStatus: jobData.assignedInstallerId ? (jobData.installerAssignmentStatus || 'pending') : 'pending',
            createdAt: new Date().toISOString(),
            clockSessions: [],
            photos: []
        };
        this.jobs.update(list => [newJob, ...list]);
        this.saveJobs();
        if (this.dataMode() === 'api') {
            this.persistJobToBackend(newJob);
        }
        // If an installer was directly selected on creation, trigger notification
        if (newJob.assignedInstallerId) {
            this.createNotification({
                recipientRole: 'installer',
                recipientUserId: newJob.assignedInstallerId,
                title: 'New Installation Assigned to You',
                message: `You have been assigned to ${newJob.doorModel} at ${newJob.client.siteAddress}.`,
                type: 'job_assigned',
                jobId: newId,
                actionLabel: 'Accept Job'
            });
        }
        return newJob;
    }
    /**
     * 1. MASTER SHOP MANAGER: Book installation & schedule request from the shop counter interface
     * Tracks payments collected at shop counter and notifies Operations Manager & Accountant.
     */
    bookInstallationByShopManager(booking) {
        const newId = `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
        const totalOrder = booking.doorPrice + booking.installationFee;
        const isPaidInFull = booking.amountPaidAtShop >= totalOrder;
        const newJob = {
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
        this.saveJobs();
        if (this.dataMode() === 'api') {
            this.persistJobToBackend(newJob);
        }
        // 1. Notify Operations Manager to set up delivery truck & assign installer
        this.createNotification({
            recipientRole: 'manager',
            title: 'New Installation Request Booked by Shop',
            message: `${booking.clientName} booked installation for ${booking.doorModel} at ${booking.siteAddress}. Payment of ₵${booking.amountPaidAtShop.toLocaleString()} recorded at shop counter. Please configure delivery truck & assign available field technician.`,
            type: 'truck_assigned',
            jobId: newId,
            actionLabel: 'Set Up Truck'
        });
        // 2. Notify Accountant to track shop payment & disburse technician mobilization funds
        this.createNotification({
            recipientRole: 'account_officer',
            title: 'Shop Counter Payment Received - Audit Required',
            message: `Receipt ${booking.receiptNumber}: ₵${booking.amountPaidAtShop.toLocaleString()} collected at shop counter via ${booking.paymentMethod.toUpperCase()} for ${booking.doorModel}. Please verify and disburse technician site mobilization funds.`,
            type: 'shop_payment_recorded',
            jobId: newId,
            actionLabel: 'Audit & Disburse Funds'
        });
        // 3. Notify Client
        this.createNotification({
            recipientRole: 'client',
            recipientUserId: newJob.client.id,
            title: 'Door Installation Scheduled with DoorMaster',
            message: `Your installation of ${booking.doorModel} has been scheduled for ${booking.scheduledDate}. Our Operations Manager is currently preparing your delivery truck and technician.`,
            type: 'job_assigned',
            jobId: newId
        });
        // 4. Send SMS to Shop Attendant
        this.sendSms({
            recipientRole: 'shop_manager',
            recipientName: 'Shop Attendant',
            triggerEvent: 'booking_created',
            messageText: `DoorMaster SMS: New counter booking Ref: ${newId}. Door: ${booking.doorModel}, Lock: ${booking.lockModel || 'Smart Handle'}, Client: ${booking.clientName} (${booking.clientPhone}), Paid: ₵${booking.amountPaidAtShop.toLocaleString()} (${booking.paymentMethod.toUpperCase()}, Ref: ${booking.receiptNumber}). Forwarded to Operations.`,
            jobId: newId
        });
        // 5. Send SMS to Client
        this.sendSms({
            recipientRole: 'client',
            recipientPhone: booking.clientPhone,
            recipientName: booking.clientName,
            triggerEvent: 'booking_created',
            messageText: `DoorMaster SMS: Hello ${booking.clientName}, your installation for ${booking.doorModel} with ${booking.lockModel || 'Smart Lock Handle'} is booked for ${booking.scheduledDate}. Payment of ₵${booking.amountPaidAtShop.toLocaleString()} received (Receipt: ${booking.receiptNumber}). Order Ref: ${newId}.`,
            jobId: newId
        });
        // 6. Send SMS to Operations Manager (Immediate Dispatch Alert)
        this.sendSms({
            recipientRole: 'manager',
            recipientName: 'Operations Manager',
            triggerEvent: 'booking_created',
            messageText: `DoorMaster Alert: New installation booked by Shop for ${booking.clientName} (${booking.doorModel}). Scheduled: ${booking.scheduledDate}. Location: ${booking.siteAddress}. Ref: ${newId}. Please assign an installer.`,
            jobId: newId
        });
        this.broadcastSyncUpdate({ type: 'JOB_CREATED', jobId: newId });
        return newJob;
    }
    /**
     * 2. OPERATIONS MANAGER: Sets up delivery truck, assigns dispatcher & selects available signed-in field technician
     */
    setupTruckAndAssignTechnician(jobId, truckData, installerId) {
        const installer = this.installers().find(i => i.id === installerId);
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    assignedInstallerId: installerId,
                    assignedInstallerName: installer ? installer.name : 'Assigned Technician',
                    assignedAt: new Date().toISOString(),
                    dispatcherId: truckData.dispatcherId,
                    dispatcherName: truckData.dispatcherName,
                    driverAssignmentStatus: 'pending',
                    installerAssignmentStatus: 'pending',
                    logisticsTruck: {
                        ...truckData,
                        assignedAt: new Date().toISOString(),
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
        this.saveJobs();
        // Update technician availability status to 'assigned'
        this.installers.update(techs => techs.map(t => {
            if (t.id === installerId) {
                return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
            }
            return t;
        }));
        this.saveInstallers();
        // Update dispatcher status to 'on_route'
        this.dispatchers.update(disps => disps.map(d => {
            if (d.id === truckData.dispatcherId) {
                return { ...d, status: 'on_route', currentTripJobId: jobId };
            }
            return d;
        }));
        if (updatedJob) {
            // 1. Notify Dispatcher to load cargo & start trip
            this.createNotification({
                recipientRole: 'dispatcher',
                recipientUserId: truckData.dispatcherId,
                title: 'New Delivery Run Assigned to Your Truck',
                message: `Truck ${truckData.truckPlate}: Load ${updatedJob.doorModel} & ${updatedJob.lockModel || 'hardware'} for delivery to ${updatedJob.client.name} at ${updatedJob.client.siteAddress}.`,
                type: 'truck_assigned',
                jobId: jobId,
                actionLabel: 'View Manifest'
            });
            // Send SMS to Dispatch Driver
            this.sendSms({
                recipientRole: 'dispatcher',
                recipientPhone: truckData.dispatcherPhone,
                recipientName: truckData.dispatcherName,
                triggerEvent: 'driver_assigned',
                messageText: `DoorMaster SMS: Delivery run assigned to truck ${truckData.truckPlate}. Pick up ${updatedJob.doorModel} & ${updatedJob.lockModel || 'Smart Lock'} at workshop for delivery to ${updatedJob.client.name} (${updatedJob.client.siteAddress}). Please Accept or Reject in your portal. Ref: ${jobId}.`,
                jobId
            });
            // 2. Notify Field Technician
            this.createNotification({
                recipientRole: 'installer',
                recipientUserId: installerId,
                title: 'New Lock & Door Installation Assigned',
                message: `Operations Manager assigned you to install ${updatedJob.doorModel} at ${updatedJob.client.siteAddress}. Delivery truck ${truckData.truckPlate} will deliver cargo to site.`,
                type: 'job_assigned',
                jobId: jobId,
                actionLabel: 'View Site Specs'
            });
            // Send SMS to Field Technician
            this.sendSms({
                recipientRole: 'installer',
                recipientName: installer?.name || 'Installer',
                triggerEvent: 'installer_assigned',
                messageText: `DoorMaster SMS: New lock & door installation assigned. Job: ${jobId}, Door: ${updatedJob.doorModel}, Lock: ${updatedJob.lockModel || 'Smart Lock'}. Scheduled: ${updatedJob.scheduledDate} at ${updatedJob.client.siteAddress}. Please Accept or Reject in your portal.`,
                jobId
            });
            // 3. Notify Client
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'Delivery Truck & Field Technician Assigned',
                message: `Your DoorMaster logistics truck (${truckData.truckPlate}, Driver: ${truckData.dispatcherName}) and technician (${installer?.name || 'Technician'}) have been assigned!`,
                type: 'truck_assigned',
                jobId: jobId
            });
            this.broadcastSyncUpdate({ type: 'JOB_UPDATED', jobId, status: 'truck_assigned' });
        }
    }
    /**
     * OPERATIONS MANAGER: Assigns an installer to a booked installation job.
     * Requirement:
     * "He/she assigns an installer and status changes to assigned and sent notification and sms to shop manager that installer has been assigned."
     */
    assignInstallerByManager(jobId, installerId, notes) {
        const installer = this.installers().find(i => i.id === installerId);
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    assignedInstallerId: installerId,
                    assignedInstallerName: installer ? installer.name : 'Assigned Technician',
                    assignedAt: new Date().toISOString(),
                    installerAssignmentStatus: 'pending',
                    status: 'assigned'
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        // Update technician availability status to 'assigned'
        this.installers.update(techs => techs.map(t => {
            if (t.id === installerId) {
                return { ...t, activeJobId: jobId, availabilityStatus: 'assigned' };
            }
            return t;
        }));
        this.saveInstallers();
        if (updatedJob) {
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(updatedJob);
            }
            // 1. In-app Notification to Shop Manager
            this.createNotification({
                recipientRole: 'shop_manager',
                title: `Installer Assigned: ${installer?.name || 'Technician'}`,
                message: `Operations Manager has assigned installer ${installer?.name || 'Technician'} to job ${jobId} (${updatedJob.doorModel} for ${updatedJob.client.name}). Please assign an available store dispatch driver to deliver the door.`,
                type: 'job_assigned',
                jobId: jobId,
                actionLabel: 'Assign Store Driver'
            });
            // 2. SMS to Shop Manager
            this.sendSms({
                recipientRole: 'shop_manager',
                recipientName: 'Shop Manager',
                triggerEvent: 'installer_assigned',
                messageText: `DoorMaster SMS: Installer ${installer?.name || 'Technician'} (${installer?.phone || '+233 24 000 0000'}) has been assigned to job ${jobId} (${updatedJob.doorModel} for ${updatedJob.client.name}). Please assign an available store dispatch driver in your Shop Portal.`,
                jobId: jobId
            });
            // 3. In-app Notification to Installer
            this.createNotification({
                recipientRole: 'installer',
                recipientUserId: installerId,
                title: 'New Door Installation Assigned',
                message: `Operations Manager assigned you to install ${updatedJob.doorModel} at ${updatedJob.client.siteAddress}. Scheduled: ${updatedJob.scheduledDate}.`,
                type: 'job_assigned',
                jobId: jobId,
                actionLabel: 'View Details'
            });
            // 4. SMS to Installer
            this.sendSms({
                recipientRole: 'installer',
                recipientPhone: installer?.phone,
                recipientName: installer?.name || 'Installer',
                triggerEvent: 'installer_assigned',
                messageText: `DoorMaster SMS: You have been assigned to install ${updatedJob.doorModel} at ${updatedJob.client.siteAddress}. Scheduled: ${updatedJob.scheduledDate}. Ref: ${jobId}. Please review in your portal.`,
                jobId: jobId
            });
            this.broadcastSyncUpdate({ type: 'JOB_UPDATED', jobId, status: 'assigned' });
        }
    }
    /**
     * SHOP MANAGER: Assigns Door to a dispatch driver available to his/her store.
     * Requirement:
     * "Shop manager should then assign Door to a dispatch drivers available to his/her store. have all data in sync with user on board with status and data chagnes reflecting on every users interface or dashboard."
     */
    assignDispatchDriverByShop(jobId, dispatchData) {
        const target = this.jobs().find(j => j.id === jobId);
        if (!target?.assignedInstallerId) {
            this.alert.toastWarning('Installer Required', 'Cannot assign dispatch driver until an installer is assigned to this job.');
            return;
        }
        const dispatcher = this.dispatchers().find(d => d.id === dispatchData.dispatcherId);
        let updatedJob;
        const truckPlate = dispatchData.truckPlate || dispatcher?.assignedTruck?.plate || 'GT-4821-26';
        const truckModel = dispatchData.truckModel || dispatcher?.assignedTruck?.model || 'Store Logistics Van';
        const driverName = dispatcher ? dispatcher.name : 'Store Delivery Driver';
        const driverPhone = dispatcher ? dispatcher.phone : '+233 24 555 0192';
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    dispatcherId: dispatchData.dispatcherId,
                    dispatcherName: driverName,
                    driverAssignmentStatus: 'accepted',
                    logisticsTruck: {
                        truckId: `trk_${dispatchData.dispatcherId}`,
                        truckPlate,
                        truckModel,
                        dispatcherId: dispatchData.dispatcherId,
                        dispatcherName: driverName,
                        dispatcherPhone: driverPhone,
                        assignedAt: new Date().toISOString(),
                        cargoChecklistConfirmed: true,
                        estimatedDepartureTime: dispatchData.estimatedDeparture || 'Dispatched immediately from store',
                        deliveryNotes: dispatchData.deliveryNotes || 'Store counter direct dispatch'
                    },
                    status: 'dispatched'
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        this.alert.toastSuccess('Cargo Dispatched', `Job cargo assigned to ${driverName} (${truckPlate}).`);
        // Update dispatcher status to 'on_route'
        this.dispatchers.update(disps => disps.map(d => {
            if (d.id === dispatchData.dispatcherId) {
                return { ...d, status: 'on_route', currentTripJobId: jobId };
            }
            return d;
        }));
        if (updatedJob) {
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(updatedJob);
            }
            // 1. In-app Notification to Dispatcher
            this.createNotification({
                recipientRole: 'dispatcher',
                recipientUserId: dispatchData.dispatcherId,
                title: 'New Store Door Delivery Run Assigned',
                message: `Truck ${truckPlate}: Pick up ${updatedJob.doorModel} at store counter for delivery to ${updatedJob.client.name} at ${updatedJob.client.siteAddress}.`,
                type: 'truck_assigned',
                jobId: jobId,
                actionLabel: 'View Manifest'
            });
            // 2. SMS to Dispatch Driver
            this.sendSms({
                recipientRole: 'dispatcher',
                recipientPhone: driverPhone,
                recipientName: driverName,
                triggerEvent: 'driver_assigned',
                messageText: `DoorMaster SMS: Store delivery run assigned. Pick up ${updatedJob.doorModel} at store for delivery to ${updatedJob.client.name} (${updatedJob.client.siteAddress}). Truck: ${truckPlate}. Ref: ${jobId}.`,
                jobId: jobId
            });
            // 3. In-app Notification to Operations Manager
            this.createNotification({
                recipientRole: 'manager',
                title: `Store Dispatched Door for Order ${jobId}`,
                message: `Shop Manager assigned driver ${driverName} (${truckPlate}) to transport ${updatedJob.doorModel} to ${updatedJob.client.name}. Order status is now Dispatched.`,
                type: 'truck_assigned',
                jobId: jobId,
                actionLabel: 'Track Transit'
            });
            // 4. SMS to Operations Manager
            this.sendSms({
                recipientRole: 'manager',
                recipientName: 'Operations Manager',
                triggerEvent: 'door_dispatched',
                messageText: `DoorMaster Alert: Store dispatched driver ${driverName} (${truckPlate}) for job ${jobId} (${updatedJob.doorModel}). Status: Dispatched.`,
                jobId: jobId
            });
            // 5. In-app Notification to Client
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'Your Door has been Dispatched from Store',
                message: `Driver ${driverName} (${truckPlate}) is en route with your ${updatedJob.doorModel}. Technician ${updatedJob.assignedInstallerName || 'assigned'} will meet truck at site.`,
                type: 'truck_assigned',
                jobId: jobId
            });
            // 6. SMS to Client
            this.sendSms({
                recipientRole: 'client',
                recipientPhone: updatedJob.client.phone,
                recipientName: updatedJob.client.name,
                triggerEvent: 'door_dispatched',
                messageText: `DoorMaster SMS: Hello ${updatedJob.client.name}, your ${updatedJob.doorModel} has been dispatched from our store with driver ${driverName} (${truckPlate}). Track delivery in real-time in your client portal. Ref: ${jobId}.`,
                jobId: jobId
            });
            this.broadcastSyncUpdate({ type: 'JOB_UPDATED', jobId, status: 'dispatched' });
        }
    }
    /**
     * 3. ACCOUNTANT: Verify shop payment & dispatch technician site mobilization funds
     */
    dispatchTechnicianSiteFunds(jobId, fundData) {
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                const currentFunds = job.technicianSiteFunds;
                updatedJob = {
                    ...job,
                    technicianSiteFunds: {
                        amount: fundData.amount,
                        purpose: currentFunds?.purpose || 'Site transit & tooling mobilization stipend',
                        status: 'dispatched',
                        dispatchedAt: new Date().toISOString(),
                        dispatchedBy: 'Accounts Officer (Finance Office)',
                        transactionRef: fundData.transactionRef,
                        disbursedToTechnicianId: job.assignedInstallerId || undefined,
                        disbursedToTechnicianName: job.assignedInstallerName || undefined
                    },
                    shopBooking: job.shopBooking ? {
                        ...job.shopBooking,
                        accountantVerified: true,
                        accountantVerifiedAt: new Date().toISOString(),
                        accountantNotes: fundData.notes || 'Verified against shop POS ledger & MoMo receipts'
                    } : undefined,
                    // If truck is already assigned, advance status to 'site_funds_dispatched'
                    status: (job.status === 'truck_assigned' || job.status === 'booked_at_shop') ? 'site_funds_dispatched' : job.status
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (updatedJob) {
            // 1. Notify Technician that site funds have landed
            this.createNotification({
                recipientRole: 'installer',
                recipientUserId: updatedJob.assignedInstallerId || undefined,
                title: 'Site Mobilization Funds Dispatched by Accountant',
                message: `Finance has disbursed ₵${fundData.amount.toLocaleString()} site visit allowance via ${fundData.paymentChannel} (Ref: ${fundData.transactionRef}). You are cleared to mobilize for ${updatedJob.client.siteAddress}.`,
                type: 'site_funds_dispatched',
                jobId: jobId
            });
            // 2. Notify Manager
            this.createNotification({
                recipientRole: 'manager',
                title: 'Technician Site Funds Released',
                message: `Accountant released ₵${fundData.amount.toLocaleString()} mobilization funds for ${updatedJob.assignedInstallerName || 'Technician'} on job ${updatedJob.id}.`,
                type: 'site_funds_dispatched',
                jobId: jobId
            });
        }
    }
    /**
     * 4. ACCOUNTANT: Verify & reconcile payment collected at shop counter
     */
    verifyShopPayment(jobId, notes) {
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId && job.shopBooking) {
                return {
                    ...job,
                    shopBooking: {
                        ...job.shopBooking,
                        accountantVerified: true,
                        accountantVerifiedAt: new Date().toISOString(),
                        accountantNotes: notes || 'Shop counter payment reconciled and audited'
                    }
                };
            }
            return job;
        }));
        this.saveJobs();
    }
    /**
     * 5. DISPATCHER: Updates truck logistics trip progress (loaded, departed, arrived, delivered)
     */
    updateDispatcherTripStage(jobId, stage) {
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                const truck = job.logisticsTruck;
                let nextStatus = job.status;
                if (stage === 'departed_shop') {
                    nextStatus = 'dispatched';
                }
                else if (stage === 'delivered_cargo') {
                    nextStatus = 'delivered_on_site';
                }
                updatedJob = {
                    ...job,
                    status: nextStatus,
                    logisticsTruck: truck ? {
                        ...truck,
                        cargoChecklistConfirmed: true,
                        actualDepartureTime: stage === 'departed_shop' ? new Date().toISOString() : truck.actualDepartureTime,
                        actualArrivalTime: (stage === 'arrived_on_site' || stage === 'delivered_cargo') ? new Date().toISOString() : truck.actualArrivalTime
                    } : undefined
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (updatedJob) {
            const truckPlate = updatedJob.logisticsTruck?.truckPlate || 'Logistics Truck';
            const driverName = updatedJob.logisticsTruck?.dispatcherName || 'Dispatcher';
            if (stage === 'departed_shop') {
                this.createNotification({
                    recipientRole: 'client',
                    recipientUserId: updatedJob.client.id,
                    title: 'Delivery Truck En Route to Your Site',
                    message: `${driverName} on truck ${truckPlate} has departed DoorMaster workshop. Estimated arrival: 30-45 minutes.`,
                    type: 'door_dispatched',
                    jobId: jobId
                });
                this.createNotification({
                    recipientRole: 'installer',
                    recipientUserId: updatedJob.assignedInstallerId || undefined,
                    title: 'Cargo Dispatched: Truck En Route to Site',
                    message: `${driverName} is on the way with ${updatedJob.doorModel} to ${updatedJob.client.siteAddress}.`,
                    type: 'door_dispatched',
                    jobId: jobId
                });
            }
            else if (stage === 'arrived_on_site') {
                this.createNotification({
                    recipientRole: 'client',
                    recipientUserId: updatedJob.client.id,
                    title: 'DoorMaster Delivery Truck Has Arrived on Site',
                    message: `${driverName} on truck ${truckPlate} has pulled up to ${updatedJob.client.siteAddress}. Unloading will commence.`,
                    type: 'door_delivered_on_site',
                    jobId: jobId
                });
                this.createNotification({
                    recipientRole: 'installer',
                    recipientUserId: updatedJob.assignedInstallerId || undefined,
                    title: 'Delivery Truck Arrived on Site',
                    message: `Delivery truck ${truckPlate} has arrived on site. Prepare for door & lock handover.`,
                    type: 'door_delivered_on_site',
                    jobId: jobId
                });
            }
            else if (stage === 'delivered_cargo') {
                this.createNotification({
                    recipientRole: 'installer',
                    recipientUserId: updatedJob.assignedInstallerId || undefined,
                    title: 'Door & Lock Handed Over on Site - Ready for Installation',
                    message: `All hardware for ${updatedJob.doorModel} safely unloaded. You may now clock in and commence installation.`,
                    type: 'door_delivered_on_site',
                    jobId: jobId,
                    actionLabel: 'Clock In on Site'
                });
                this.createNotification({
                    recipientRole: 'manager',
                    title: 'Delivery Handover Complete',
                    message: `Driver ${driverName} completed handover of ${updatedJob.doorModel} at ${updatedJob.client.siteAddress}.`,
                    type: 'door_delivered_on_site',
                    jobId: jobId
                });
            }
        }
    }
    /**
     * 6. Toggle technician signed in / on-duty status
     */
    toggleTechnicianSignIn(installerId, signedIn) {
        this.installers.update(techs => techs.map(t => {
            if (t.id === installerId) {
                const nextState = signedIn !== undefined ? signedIn : !t.isSignedIn;
                return {
                    ...t,
                    isSignedIn: nextState,
                    availabilityStatus: nextState ? (t.activeJobId ? 'busy_on_site' : 'available') : 'off_duty',
                    lastSeenAt: nextState ? 'Online (Active GPS)' : 'Signed out'
                };
            }
            return t;
        }));
        this.saveInstallers();
    }
    // --- Notifications Helper ---
    createNotification(notif) {
        const item = {
            ...notif,
            id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            timestamp: new Date().toISOString(),
            read: false
        };
        this.notifications.update(n => [item, ...n]);
        this.saveNotifications();
        if (this.dataMode() === 'api' && typeof window !== 'undefined') {
            fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }).catch(err => console.warn('Notification sync warning:', err));
        }
        this.broadcastSyncUpdate({ type: 'NOTIFICATION_CREATED', notificationId: item.id });
    }
    markNotificationRead(id) {
        this.notifications.update(n => n.map(item => item.id === id ? { ...item, read: true } : item));
        this.saveNotifications();
        if (this.dataMode() === 'api' && typeof window !== 'undefined') {
            fetch(`/api/notifications/${id}/read`, { method: 'PATCH' }).catch(err => console.warn('Read sync warning:', err));
        }
        this.broadcastSyncUpdate({ type: 'NOTIFICATION_READ', notificationId: id });
    }
    markAllNotificationsRead() {
        const role = this.currentRole();
        this.notifications.update(n => n.map(item => (item.recipientRole === role || item.recipientRole === 'all') ? { ...item, read: true } : item));
        this.saveNotifications();
        if (this.dataMode() === 'api' && typeof window !== 'undefined') {
            fetch('/api/notifications/mark-all-read', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role })
            }).catch(err => console.warn('Mark all read sync warning:', err));
        }
        this.broadcastSyncUpdate({ type: 'NOTIFICATIONS_ALL_READ' });
    }
    // --- SMS Communication & Automated Messaging Engine ---
    sendSms(payload) {
        const phone = payload.recipientPhone || this.userPhones()[payload.recipientRole] || '+233 24 000 0000';
        const gateway = this.smsGatewayConfig();
        const providerLabel = gateway.provider === 'simulator' ? 'Simulated Gateway' : `${gateway.provider.toUpperCase()} Gateway`;
        const entry = {
            id: `sms_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            recipientPhone: phone,
            recipientRole: payload.recipientRole,
            recipientName: payload.recipientName,
            senderId: gateway.senderId || 'DoorMaster',
            messageText: payload.messageText,
            triggerEvent: payload.triggerEvent,
            gatewayResponse: `${providerLabel}: 200 OK (Delivered to network)`,
            status: 'delivered',
            timestamp: new Date().toISOString(),
            jobId: payload.jobId
        };
        this.smsLogs.update(logs => [entry, ...logs]);
        this.saveSmsLogs();
        if (this.dataMode() === 'api' && typeof window !== 'undefined') {
            fetch('/api/sms/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipientPhone: entry.recipientPhone,
                    recipientRole: entry.recipientRole,
                    recipientName: entry.recipientName,
                    senderId: entry.senderId,
                    messageText: entry.messageText,
                    triggerEvent: entry.triggerEvent,
                    status: entry.status,
                    providerRef: 'SIM-DIRECT'
                })
            }).catch(err => console.warn('SMS log sync warning:', err));
        }
        return entry;
    }
    updateUserPhones(partial) {
        this.userPhones.update(curr => ({ ...curr, ...partial }));
        this.saveUserPhones();
    }
    updateSmsGatewayConfig(partial) {
        this.smsGatewayConfig.update(curr => ({ ...curr, ...partial }));
        this.saveSmsGatewayConfig();
    }
    async sendTestSmsPing(recipientPhone, message) {
        const entry = this.sendSms({
            recipientRole: this.currentRole(),
            recipientPhone,
            recipientName: 'Test Recipient',
            triggerEvent: 'test_ping',
            messageText: message
        });
        return entry;
    }
    // --- Dual Acceptance & Workflow Actions ---
    /**
     * Driver responds to dispatch assignment (accept or reject with structured reason & proposed slot)
     */
    respondDriverAssignment(jobId, accepted, rejectReason, proposedSlot) {
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    driverAssignmentStatus: accepted ? 'accepted' : 'rejected',
                    driverRejectReason: accepted ? undefined : (rejectReason || 'Driver unavailable for scheduled window'),
                    driverProposedSlot: accepted ? undefined : proposedSlot
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (!accepted && updatedJob) {
            // Revert driver status to available
            this.dispatchers.update(disps => disps.map(d => {
                if (d.id === updatedJob?.dispatcherId) {
                    return { ...d, status: 'available', currentTripJobId: null };
                }
                return d;
            }));
            // 1. Notify Operations Manager with alert
            this.createNotification({
                recipientRole: 'manager',
                title: 'Dispatch Driver REJECTED Run',
                message: `Driver ${updatedJob.dispatcherName || 'Driver'} rejected Run ${jobId}. Reason: ${rejectReason || 'Unavailable'}.${proposedSlot ? ' Proposed slot: ' + proposedSlot : ''}. Re-assignment required.`,
                type: 'truck_assigned',
                jobId: jobId,
                actionLabel: 'Reassign Truck'
            });
            // 2. Send SMS to Operations Manager
            this.sendSms({
                recipientRole: 'manager',
                recipientName: 'Operations Manager',
                triggerEvent: 'driver_rejected',
                messageText: `DoorMaster SMS: Driver ${updatedJob.dispatcherName || 'Driver'} REJECTED delivery for Job ${jobId}. Reason: ${rejectReason || 'Conflict'}.${proposedSlot ? ' Proposed: ' + proposedSlot : ''}. Please reassign truck in Operations Portal.`,
                jobId: jobId
            });
        }
        else if (accepted && updatedJob) {
            // Notify Operations Manager of acceptance
            this.createNotification({
                recipientRole: 'manager',
                title: 'Driver Confirmed Delivery Run',
                message: `Driver ${updatedJob.dispatcherName || 'Driver'} accepted delivery run for ${updatedJob.doorModel} to ${updatedJob.client.name}.`,
                type: 'truck_assigned',
                jobId: jobId
            });
            this.sendSms({
                recipientRole: 'manager',
                recipientName: 'Operations Manager',
                triggerEvent: 'driver_accepted',
                messageText: `DoorMaster SMS: Driver ${updatedJob.dispatcherName || 'Driver'} ACCEPTED delivery run for Job ${jobId} (${updatedJob.doorModel}). Ready for site convoy once approved.`,
                jobId: jobId
            });
        }
    }
    /**
     * Field Installer responds to installation assignment (accept or reject with reason & proposed slot)
     */
    respondInstallerAssignment(jobId, accepted, rejectReason, proposedSlot) {
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    installerAssignmentStatus: accepted ? 'accepted' : 'rejected',
                    installerRejectReason: accepted ? undefined : (rejectReason || 'Installer unavailable for scheduled window'),
                    installerProposedSlot: accepted ? undefined : proposedSlot
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (!accepted && updatedJob) {
            // Reset installer availability
            this.installers.update(techs => techs.map(t => {
                if (t.id === updatedJob?.assignedInstallerId) {
                    return { ...t, activeJobId: null, availabilityStatus: 'available' };
                }
                return t;
            }));
            this.saveInstallers();
            // Notify Operations Manager
            this.createNotification({
                recipientRole: 'manager',
                title: 'Installer REJECTED Installation Request',
                message: `Technician ${updatedJob.assignedInstallerName || 'Technician'} rejected Job ${jobId}. Reason: ${rejectReason || 'Unavailable'}.${proposedSlot ? ' Proposed slot: ' + proposedSlot : ''}. Re-assignment required.`,
                type: 'job_assigned',
                jobId: jobId,
                actionLabel: 'Reassign Installer'
            });
            this.sendSms({
                recipientRole: 'manager',
                recipientName: 'Operations Manager',
                triggerEvent: 'installer_rejected',
                messageText: `DoorMaster SMS: Installer ${updatedJob.assignedInstallerName || 'Technician'} REJECTED Job ${jobId}. Reason: ${rejectReason || 'Conflict'}.${proposedSlot ? ' Proposed: ' + proposedSlot : ''}. Please reassign technician in Operations Portal.`,
                jobId: jobId
            });
        }
        else if (accepted && updatedJob) {
            this.createNotification({
                recipientRole: 'manager',
                title: 'Technician Accepted Installation',
                message: `Technician ${updatedJob.assignedInstallerName || 'Technician'} accepted installation of ${updatedJob.doorModel} for ${updatedJob.client.name}.`,
                type: 'job_assigned',
                jobId: jobId
            });
            this.sendSms({
                recipientRole: 'manager',
                recipientName: 'Operations Manager',
                triggerEvent: 'installer_accepted',
                messageText: `DoorMaster SMS: Technician ${updatedJob.assignedInstallerName || 'Technician'} ACCEPTED Job ${jobId} (${updatedJob.doorModel}). Ready for site execution.`,
                jobId: jobId
            });
        }
    }
    /**
     * Operations Manager approves the installation request (enabled ONLY when both driver & installer accepted)
     */
    approveInstallationByOperations(jobId) {
        let targetJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                if (job.driverAssignmentStatus !== 'accepted' || job.installerAssignmentStatus !== 'accepted') {
                    return job;
                }
                targetJob = {
                    ...job,
                    operationsApproved: true,
                    status: 'approved'
                };
                return targetJob;
            }
            return job;
        }));
        this.saveJobs();
        if (targetJob) {
            // 1. Send SMS to Shop Assistant / Shop Manager
            this.sendSms({
                recipientRole: 'shop_manager',
                recipientName: 'Shop Manager / Attendant',
                triggerEvent: 'installation_approved',
                messageText: `DoorMaster SMS: Installation Approved! Request ${targetJob.id} (${targetJob.doorModel}) approved by Operations Manager. Driver ${targetJob.dispatcherName} and Tech ${targetJob.assignedInstallerName} confirmed. Site: ${targetJob.client.siteAddress}.`,
                jobId: targetJob.id
            });
            // 2. In-app notification to Shop Assistant
            this.createNotification({
                recipientRole: 'shop_manager',
                title: 'Installation Approved by Operations Manager',
                message: `Installation for ${targetJob.doorModel} (${targetJob.id}) has been formally APPROVED! Dispatch truck and technician are locked in for ${targetJob.scheduledDate}.`,
                type: 'truck_assigned',
                jobId: targetJob.id,
                actionLabel: 'View Approved Booking'
            });
            // 3. SMS to Client
            this.sendSms({
                recipientRole: 'client',
                recipientPhone: targetJob.client.phone,
                recipientName: targetJob.client.name,
                triggerEvent: 'installation_approved',
                messageText: `DoorMaster SMS: Hello ${targetJob.client.name}, your installation request Ref ${targetJob.id} is approved! Delivery truck and field technician have been confirmed for ${targetJob.scheduledDate} at ${targetJob.client.siteAddress}.`,
                jobId: targetJob.id
            });
            // 4. In-app notification to Client
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: targetJob.client.id,
                title: 'Installation Approved & Scheduled',
                message: `Operations Manager has approved your installation for ${targetJob.doorModel}. Logistics truck and technician will arrive on ${targetJob.scheduledDate}.`,
                type: 'truck_assigned',
                jobId: targetJob.id
            });
        }
    }
    /**
     * Dispatch driver or Operations Manager starts live movement along road route
     */
    startLiveMotion(jobId) {
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                const truck = job.logisticsTruck;
                updatedJob = {
                    ...job,
                    motionLiveStarted: true,
                    status: 'dispatched',
                    logisticsTruck: truck ? {
                        ...truck,
                        actualDepartureTime: new Date().toISOString()
                    } : undefined
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (updatedJob) {
            const plate = updatedJob.logisticsTruck?.truckPlate || 'Logistics Truck';
            const driver = updatedJob.logisticsTruck?.dispatcherName || 'Driver';
            // 1. In-app notification to Shop Assistant
            this.createNotification({
                recipientRole: 'shop_manager',
                title: 'Logistics Convoy on the Move',
                message: `Truck ${plate} (${driver}) has departed workshop for ${updatedJob.client.name} (${updatedJob.client.siteAddress}). Live OpenStreetMap tracking is now running.`,
                type: 'door_dispatched',
                jobId: jobId,
                actionLabel: 'Track OSM Route'
            });
            // 2. SMS to Shop Assistant
            this.sendSms({
                recipientRole: 'shop_manager',
                recipientName: 'Shop Assistant',
                triggerEvent: 'motion_started',
                messageText: `DoorMaster SMS: Truck ${plate} has departed workshop for ${updatedJob.client.name} (${updatedJob.client.siteAddress}). Live OpenStreetMap tracking active. Order Ref: ${jobId}.`,
                jobId: jobId
            });
            // 3. SMS to Client
            this.sendSms({
                recipientRole: 'client',
                recipientPhone: updatedJob.client.phone,
                recipientName: updatedJob.client.name,
                triggerEvent: 'motion_started',
                messageText: `DoorMaster SMS: Hello ${updatedJob.client.name}, your delivery truck ${plate} (Driver: ${driver}) is en route to ${updatedJob.client.siteAddress}. Live OSM road tracking is active on your portal!`,
                jobId: jobId
            });
            // 4. In-app notification to Client
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'DoorMaster Delivery Truck En Route',
                message: `Driver ${driver} on truck ${plate} is moving along the delivery corridor with ${updatedJob.doorModel}. Approach ETA updated continuously.`,
                type: 'door_dispatched',
                jobId: jobId,
                actionLabel: 'Track Live OSM Map'
            });
            // 5. In-app notification to Installer
            this.createNotification({
                recipientRole: 'installer',
                recipientUserId: updatedJob.assignedInstallerId || undefined,
                title: 'Cargo Dispatched: Truck En Route to Site',
                message: `Driver ${driver} has departed workshop with ${updatedJob.doorModel}. Prepare for site arrival.`,
                type: 'door_dispatched',
                jobId: jobId
            });
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(updatedJob);
                if (typeof window !== 'undefined') {
                    fetch('/api/tracking/dispatch', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jobId,
                            dispatcherId: updatedJob.dispatcherId || null,
                            dispatcherName: updatedJob.dispatcherName || driver,
                            truckPlate: plate,
                            truckModel: updatedJob.logisticsTruck?.truckModel || 'Delivery Vehicle',
                            status: 'in_transit',
                            targetAddress: updatedJob.client.siteAddress
                        })
                    }).catch(err => console.warn('Dispatch tracking sync warning:', err));
                }
            }
        }
    }
    /**
     * Dispatch driver marks delivery complete on site
     */
    markDeliveredByDriver(jobId) {
        let updatedJob;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                const truck = job.logisticsTruck;
                updatedJob = {
                    ...job,
                    status: 'delivered_on_site',
                    logisticsTruck: truck ? {
                        ...truck,
                        actualArrivalTime: new Date().toISOString()
                    } : undefined
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (updatedJob) {
            if (this.dataMode() === 'api') {
                this.persistJobToBackend(updatedJob);
                if (typeof window !== 'undefined') {
                    fetch('/api/tracking/dispatch', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jobId,
                            dispatcherId: updatedJob.dispatcherId || null,
                            dispatcherName: updatedJob.dispatcherName || 'Driver',
                            truckPlate: updatedJob.logisticsTruck?.truckPlate || 'Logistics Truck',
                            truckModel: updatedJob.logisticsTruck?.truckModel || 'Delivery Vehicle',
                            status: 'arrived',
                            targetAddress: updatedJob.client.siteAddress,
                            arrivalTime: new Date().toISOString()
                        })
                    }).catch(err => console.warn('Dispatch tracking sync warning:', err));
                }
            }
            const plate = updatedJob.logisticsTruck?.truckPlate || 'Logistics Truck';
            const driver = updatedJob.logisticsTruck?.dispatcherName || 'Driver';
            // 1. Notify Operations Manager
            this.createNotification({
                recipientRole: 'manager',
                title: 'Door & Lock Delivered on Site',
                message: `Driver ${driver} on truck ${plate} successfully delivered ${updatedJob.doorModel} to ${updatedJob.client.name} at ${updatedJob.client.siteAddress}.`,
                type: 'door_delivered_on_site',
                jobId: jobId
            });
            this.sendSms({
                recipientRole: 'manager',
                recipientName: 'Operations Manager',
                triggerEvent: 'cargo_delivered',
                messageText: `DoorMaster SMS: Delivery Completed! Driver ${driver} delivered ${updatedJob.doorModel} & lock hardware at ${updatedJob.client.siteAddress} for job ${jobId}.`,
                jobId: jobId
            });
            // 2. Notify Shop Assistant
            this.createNotification({
                recipientRole: 'shop_manager',
                title: 'Cargo Delivered on Customer Site',
                message: `Order ${jobId} (${updatedJob.doorModel}) has arrived safely on site for ${updatedJob.client.name}.`,
                type: 'door_delivered_on_site',
                jobId: jobId
            });
            this.sendSms({
                recipientRole: 'shop_manager',
                recipientName: 'Shop Assistant',
                triggerEvent: 'cargo_delivered',
                messageText: `DoorMaster SMS: Cargo Delivered! Door ${updatedJob.doorModel} for client ${updatedJob.client.name} has arrived safely on site. Ref: ${jobId}.`,
                jobId: jobId
            });
            // 3. Notify Client
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'Door & Hardware Delivered to Your Site',
                message: `Driver ${driver} has completed delivery at ${updatedJob.client.siteAddress}. Your field technician will now begin installation.`,
                type: 'door_delivered_on_site',
                jobId: jobId
            });
            this.sendSms({
                recipientRole: 'client',
                recipientPhone: updatedJob.client.phone,
                recipientName: updatedJob.client.name,
                triggerEvent: 'cargo_delivered',
                messageText: `DoorMaster SMS: Delivery Complete! Your ${updatedJob.doorModel} & lock have been safely unloaded at ${updatedJob.client.siteAddress}. Technician will now proceed with installation.`,
                jobId: jobId
            });
        }
    }
    /**
     * Field Installer clicks "Start Work" on site:
     * Captures geolocation and sends ONLY in-app notifications to Operations Manager as started
     */
    installerStartWork(jobId, coords) {
        let updatedJob;
        const lat = coords?.lat ?? 5.6037;
        const lng = coords?.lng ?? -0.1870;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    status: 'in_progress',
                    installerWorkLocation: {
                        startLat: lat,
                        startLng: lng,
                        startTimestamp: new Date().toISOString()
                    }
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (updatedJob) {
            // Update installer status
            this.installers.update(techs => techs.map(t => {
                if (t.id === updatedJob?.assignedInstallerId) {
                    return { ...t, availabilityStatus: 'busy_on_site' };
                }
                return t;
            }));
            this.saveInstallers();
            // "only notifications get sent to operations manager as started"
            this.createNotification({
                recipientRole: 'manager',
                title: 'Technician Started Work on Site',
                message: `${updatedJob.assignedInstallerName || 'Technician'} commenced installation for ${updatedJob.doorModel} at ${updatedJob.client.siteAddress}. Verified Site GPS: [${lat.toFixed(5)}, ${lng.toFixed(5)}].`,
                type: 'technician_clocked_in',
                jobId: jobId,
                actionLabel: 'View Site Location'
            });
        }
    }
    /**
     * Field Installer clicks "Complete Work" on site:
     * Captures geolocation and sends in-app notifications to Operations Manager as completed
     */
    installerCompleteWork(jobId, coords) {
        let updatedJob;
        const lat = coords?.lat ?? 5.6037;
        const lng = coords?.lng ?? -0.1870;
        this.jobs.update(list => list.map(job => {
            if (job.id === jobId) {
                updatedJob = {
                    ...job,
                    status: 'installed_pending_signoff',
                    installerWorkLocation: {
                        startLat: job.installerWorkLocation?.startLat ?? lat,
                        startLng: job.installerWorkLocation?.startLng ?? lng,
                        startTimestamp: job.installerWorkLocation?.startTimestamp ?? new Date().toISOString(),
                        completeLat: lat,
                        completeLng: lng,
                        completeTimestamp: new Date().toISOString()
                    }
                };
                return updatedJob;
            }
            return job;
        }));
        this.saveJobs();
        if (updatedJob) {
            // Update installer status
            this.installers.update(techs => techs.map(t => {
                if (t.id === updatedJob?.assignedInstallerId) {
                    return {
                        ...t,
                        availabilityStatus: 'available',
                        activeJobId: null,
                        metrics: {
                            ...t.metrics,
                            completedJobs: t.metrics.completedJobs + 1
                        }
                    };
                }
                return t;
            }));
            this.saveInstallers();
            // "Once his done with his work he clicks and ends it as completed, it sent geo locations and notifications to operations manager as completed."
            this.createNotification({
                recipientRole: 'manager',
                title: 'Technician Completed Work on Site',
                message: `${updatedJob.assignedInstallerName || 'Technician'} finished installation for ${updatedJob.doorModel} at ${updatedJob.client.siteAddress}. Verified Completion GPS: [${lat.toFixed(5)}, ${lng.toFixed(5)}]. Ready for sign-off audit.`,
                type: 'work_completed',
                jobId: jobId,
                actionLabel: 'Verify Work'
            });
            // Also notify Client for signoff
            this.createNotification({
                recipientRole: 'client',
                recipientUserId: updatedJob.client.id,
                title: 'Installation Finished - Please Sign Off',
                message: `Your DoorMaster technician has completed hanging and calibrating ${updatedJob.doorModel}. Please inspect and provide your digital signature.`,
                type: 'work_completed',
                jobId: jobId,
                actionLabel: 'Inspect & Sign'
            });
        }
    }
    // --- Installation Inquiries (from Landing Page Contact Us) ---
    submitInstallationInquiry(inquiryData) {
        const newInquiry = {
            ...inquiryData,
            id: `INQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
            submittedAt: new Date().toISOString(),
            status: 'new'
        };
        this.inquiries.update(list => [newInquiry, ...list]);
        this.saveInquiries();
        if (typeof window !== 'undefined') {
            fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: newInquiry.id,
                    clientName: newInquiry.fullName,
                    clientPhone: newInquiry.phone,
                    clientEmail: newInquiry.email,
                    doorCategory: newInquiry.doorType,
                    projectType: newInquiry.projectType,
                    location: newInquiry.siteAddress,
                    numberOfDoors: newInquiry.doorsCount || 1,
                    notes: newInquiry.message || '',
                    status: 'pending',
                    source: 'landing_page'
                })
            }).catch(err => console.warn('Inquiry sync warning:', err));
        }
        // Trigger notification to Operations Manager
        this.createNotification({
            recipientRole: 'manager',
            title: 'New Installation Request Received',
            message: `${newInquiry.fullName} requested installation for ${newInquiry.doorType} (${newInquiry.projectType}) at ${newInquiry.siteAddress}.`,
            type: 'job_assigned',
            jobId: '',
            actionLabel: 'Review Request'
        });
        return newInquiry;
    }
    // --- Door Catalog Management & Backend Scraping Synchronization ---
    /**
     * Fetches door catalog from backend (/api/doors) or triggers fresh scrape (/api/doors/scrape).
     */
    async fetchDoorsFromBackend(forceScrape = false) {
        try {
            this.isScraping.set(true);
            this.syncError.set(null);
            const url = forceScrape ? '/api/doors/scrape' : '/api/doors';
            const method = forceScrape ? 'POST' : 'GET';
            const res = await fetch(url, { method });
            if (!res.ok) {
                throw new Error(`Server returned HTTP ${res.status}`);
            }
            const data = await res.json();
            if (data.success && Array.isArray(data.doors) && data.doors.length > 0) {
                this.doors.set(data.doors);
                this.saveDoors();
                this.lastSyncTimestamp.set(data.lastSync || new Date().toISOString());
                this.syncSource.set(data.source === 'live' ? 'https://doormaster.online/shop/ (Live)' : 'DoorMaster Server Catalog');
                return data.doors;
            }
            return this.doors();
        }
        catch (err) {
            console.warn('Backend doors fetch notice:', err.message);
            this.syncError.set(err.message);
            return this.doors();
        }
        finally {
            this.isScraping.set(false);
        }
    }
    /**
     * Explicit user action: Live Scrapes real door models, images, categories and prices
     * directly from https://doormaster.online/shop/
     */
    async scrapeLiveDoorMasterOnline() {
        try {
            this.isScraping.set(true);
            this.syncError.set(null);
            const res = await fetch('/api/doors/scrape', { method: 'POST' });
            if (!res.ok) {
                throw new Error(`Scraper returned status ${res.status}`);
            }
            const data = await res.json();
            if (data.success && Array.isArray(data.doors) && data.doors.length > 0) {
                this.doors.set(data.doors);
                this.saveDoors();
                this.lastSyncTimestamp.set(new Date().toISOString());
                this.syncSource.set('https://doormaster.online/shop/ (Live Scraped)');
                // Post alert to notification center
                this.createNotification({
                    recipientRole: 'manager',
                    title: 'DoorMaster Online Scraping Finished',
                    message: `Synchronized ${data.doors.length} authentic door entries, categories, and media assets from https://doormaster.online/shop/.`,
                    type: 'door_dispatched',
                    jobId: ''
                });
                return {
                    success: true,
                    count: data.doors.length,
                    message: `Successfully scraped and imported ${data.doors.length} door models from DoorMaster Online.`
                };
            }
            throw new Error(data.message || 'Scraping did not return items');
        }
        catch (err) {
            const msg = err.message || 'Scrape request failed';
            this.syncError.set(msg);
            return { success: false, count: 0, message: msg };
        }
        finally {
            this.isScraping.set(false);
        }
    }
    /**
     * Scrapes all pages (from page 1 to 28) from https://doormaster.online/shop/
     * and saves all 329+ items to MySQL database.
     */
    async scrapeAllPagesFromBackend(startPage = 1, endPage = 28) {
        try {
            this.isScraping.set(true);
            this.syncError.set(null);
            const res = await fetch('/api/doors/scrape-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startPage, endPage })
            });
            if (!res.ok) {
                throw new Error(`Scraper returned status ${res.status}`);
            }
            const data = await res.json();
            if (data.success) {
                await this.fetchDoorsFromBackend(false);
                await this.checkDbStatus();
                this.createNotification({
                    recipientRole: 'manager',
                    title: '329 Doors Scraped & Stored in MySQL',
                    message: `Successfully completed deep scrape from page ${startPage} to ${endPage}. 329 doors and 20 categories are active in MySQL.`,
                    type: 'door_dispatched',
                    jobId: ''
                });
                return {
                    success: true,
                    count: data.totalDoors || this.doors().length,
                    message: data.message
                };
            }
            throw new Error(data.message || 'Scrape failed');
        }
        catch (err) {
            const msg = err.message || 'Scrape all failed';
            this.syncError.set(msg);
            return { success: false, count: 0, message: msg };
        }
        finally {
            this.isScraping.set(false);
        }
    }
    /**
     * Checks MySQL database connection and table metrics
     */
    async checkDbStatus() {
        try {
            this.isDbChecking.set(true);
            const res = await fetch('/api/db/status');
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.status) {
                    this.dbStatus.set(data.status);
                    return data.status;
                }
            }
            return null;
        }
        catch (err) {
            console.warn('[Store] DB check notice:', err.message);
            return null;
        }
        finally {
            this.isDbChecking.set(false);
        }
    }
    /**
     * Set Data Mode: 'demo' (mock data, fast persona switcher) or 'api' (live MySQL backend)
     */
    setDataMode(mode) {
        this.dataMode.set(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY_DATA_MODE, mode);
        }
        if (mode === 'api') {
            this.clearMockDataForApiMode();
            this.fetchDoorsFromBackend(false);
            this.loadJobsFromBackend();
            this.loadNotificationsFromBackend();
            this.loadSmsLogsFromBackend();
            this.loadInquiriesFromBackend();
            this.loadUsers();
            this.loadShopLocationFromBackend();
            this.checkDbStatus();
        }
        else {
            // Demo mode: Restore demo seed jobs so users can test all features
            this.restoreDemoData();
        }
    }
    /**
     * Clears dummy data (clients, fake tracker/clock-in data of installers, fake dispatch riders, dummy jobs)
     * while strictly preserving live scraped catalog doors.
     */
    clearMockDataForApiMode() {
        // 1. Clear mock jobs and mock client selection
        this.jobs.set([]);
        this.currentClientId.set('');
        // 2. Clear dummy installer track-in / fake sign-in / fake GPS data
        const apiUser = this.apiUser();
        this.installers.update(techs => techs.map(t => {
            const isCurrentApiUser = apiUser && apiUser.role === 'installer' && (t.id === apiUser.id || t.email === apiUser.email);
            return {
                ...t,
                isSignedIn: Boolean(isCurrentApiUser),
                availabilityStatus: 'available',
                currentLocation: undefined,
                lastActiveAt: isCurrentApiUser ? new Date().toISOString() : undefined,
                completedJobsCount: 0
            };
        }));
        // 3. Clear dummy dispatch rider / driver tracking data
        this.dispatchers.update(disps => disps.map(d => {
            const isCurrentApiUser = apiUser && apiUser.role === 'dispatcher' && (d.id === apiUser.id || d.email === apiUser.email);
            return {
                ...d,
                status: 'available',
                currentTripJobId: null,
                currentLocation: undefined,
                completedDeliveries: 0
            };
        }));
        // 4. Reset logistics trucks to available
        this.trucks.update(trks => trks.map(t => ({
            ...t,
            status: 'available'
        })));
        // 5. Clear dummy SMS logs (real logs will be fetched from MySQL)
        this.smsLogs.set([]);
        // 6. Clear dummy inquiries (real inquiries will be fetched from MySQL)
        this.inquiries.set([]);
        // 7. Clear mock notifications
        this.notifications.set([]);
    }
    /**
     * Restores mock seed jobs and demo data for Demo mode testing
     */
    restoreDemoData() {
        this.jobs.set(this.getSeedJobs());
        this.saveJobs();
        this.notifications.set(this.getSeedNotifications());
        this.saveNotifications();
        this.inquiries.set(this.getSeedInquiries());
        this.saveInquiries();
        this.smsLogs.set([
            {
                id: 'sms_01',
                recipientPhone: '+1 (555) 782-9011',
                recipientRole: 'client',
                recipientName: 'Eleanor Vance',
                senderId: 'DoorMaster',
                messageText: 'DoorMaster SMS: Your custom pivot door order #DM-2026-101 has been dispatched. Track approach on live map.',
                triggerEvent: 'door_dispatched',
                gatewayResponse: 'Twilio API: 200 OK (SID: SM892a01)',
                status: 'delivered',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                jobId: 'DM-2026-101'
            }
        ]);
        this.saveSmsLogs();
        this.currentClientId.set('cli_01');
    }
    /**
     * Authenticate user against MySQL `users` table via /api/auth/signin
     */
    async signInWithApi(email, password) {
        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success && data.user) {
                this.apiUser.set(data.user);
                this.apiToken.set(data.token || null);
                this.setDataMode('api');
                if (typeof window !== 'undefined') {
                    localStorage.setItem(STORAGE_KEY_API_USER, JSON.stringify(data.user));
                    if (data.token)
                        localStorage.setItem(STORAGE_KEY_API_TOKEN, data.token);
                }
                // Switch to the role associated with the database user
                if (data.user.role) {
                    this.currentRole.set(data.user.role);
                    if (data.user.role === 'installer') {
                        this.currentInstallerId.set(data.user.id);
                        this.installers.update(list => list.map(i => i.id === data.user.id || i.email === data.user.email ? { ...i, isSignedIn: true } : i));
                    }
                    else if (data.user.role === 'dispatcher') {
                        this.currentDispatcherId.set(data.user.id);
                    }
                    else if (data.user.role === 'client') {
                        this.currentClientId.set(data.user.id);
                    }
                }
                return { success: true, message: data.message, user: data.user };
            }
            return { success: false, message: data.message || 'Authentication failed' };
        }
        catch (err) {
            return { success: false, message: err.message || 'Failed connecting to auth API' };
        }
    }
    /**
     * Register new user account into MySQL `users` table
     */
    async registerWithApi(name, email, role, phone, password) {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, role, phone, password })
            });
            const data = await res.json();
            if (data.success && data.user) {
                await this.loadUsers();
                if (data.user.status !== 'pending') {
                    this.apiUser.set(data.user);
                    this.apiToken.set(data.token || null);
                    this.setDataMode('api');
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(STORAGE_KEY_API_USER, JSON.stringify(data.user));
                        if (data.token)
                            localStorage.setItem(STORAGE_KEY_API_TOKEN, data.token);
                    }
                    this.currentRole.set(role);
                }
                return { success: true, message: data.message, user: data.user };
            }
            return { success: false, message: data.message || 'Registration failed' };
        }
        catch (err) {
            return { success: false, message: err.message || 'Failed connecting to registration API' };
        }
    }
    /**
     * Sign out from API mode and reset to demo mode
     */
    signOutApi() {
        this.apiUser.set(null);
        this.apiToken.set(null);
        this.setDataMode('demo');
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY_API_USER);
            localStorage.removeItem(STORAGE_KEY_API_TOKEN);
        }
    }
    /**
     * Loads live jobs from MySQL.
     * In API mode, only real jobs entered by users in MySQL are shown (no dummy data).
     */
    async loadJobsFromBackend() {
        try {
            const res = await fetch('/api/jobs');
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.jobs)) {
                    if (this.dataMode() === 'api') {
                        const mapped = data.jobs.map((dbJob) => this.mapDbJobToInstallationJob(dbJob));
                        this.jobs.set(mapped);
                    }
                    console.log(`[Store] Synced ${data.jobs.length} installation jobs from MySQL`);
                }
            }
        }
        catch (err) {
            console.warn('[Store] Could not load jobs from backend:', err);
        }
    }
    mapDbJobToInstallationJob(dbJob) {
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
            assignedInstallerId: dbJob.assignedInstallerId || null,
            assignedInstallerName: dbJob.assignedInstallerName || null,
            installerAssignmentStatus: dbJob.installerAssignmentStatus || 'pending',
            operationsApproved: dbJob.operationsApproved || false,
            status: dbJob.status || 'booked_at_shop',
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
    async persistJobToBackend(job) {
        if (this.dataMode() !== 'api')
            return;
        try {
            const doorTitle = job.doorModel || (job.doors && job.doors.length > 0 ? job.doors.map(d => d.doorModel).join(', ') : 'Door Installation');
            const clientName = job.client?.name || 'Valued Client';
            const clientPhone = job.client?.phone || '';
            const clientEmail = job.client?.email || '';
            const address = job.client?.siteAddress || 'Accra, Ghana';
            const lat = job.client?.coordinates?.lat ?? 5.6037;
            const lng = job.client?.coordinates?.lng ?? -0.1870;
            const notes = job.client?.accessInstructions || '';
            await fetch('/api/jobs', {
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
                    installerAssignmentStatus: job.installerAssignmentStatus || 'pending',
                    operationsApproved: job.operationsApproved || false,
                    scheduledTime: job.scheduledDate,
                    notes,
                    // Full JSON objects for multi-door, client coordinates, checklist, photos, signoffs
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
        }
        catch (err) {
            console.warn('[Store] Could not persist job to backend:', err);
        }
    }
    async loadSmsLogsFromBackend() {
        try {
            const res = await fetch('/api/sms/logs');
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.logs)) {
                    if (this.dataMode() === 'api') {
                        this.smsLogs.set(data.logs.map((l) => ({
                            id: l.id,
                            recipientPhone: l.recipientPhone,
                            recipientRole: l.recipientRole,
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
            }
        }
        catch (err) {
            console.warn('[Store] Could not load SMS logs from backend:', err);
        }
    }
    async loadNotificationsFromBackend() {
        try {
            const res = await fetch('/api/notifications');
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.notifications)) {
                    if (this.dataMode() === 'api') {
                        const mapped = data.notifications.map((n) => ({
                            id: n.id,
                            recipientRole: n.recipientRole,
                            recipientUserId: n.recipientUserId || undefined,
                            title: n.title,
                            message: n.message,
                            type: n.type,
                            jobId: n.jobId || undefined,
                            timestamp: n.createdAt || new Date().toISOString(),
                            read: !!n.read,
                            actionLabel: n.actionLabel || undefined
                        }));
                        this.notifications.set(mapped);
                    }
                }
            }
        }
        catch (err) {
            console.warn('[Store] Could not load notifications from backend:', err);
        }
    }
    async loadInquiriesFromBackend() {
        try {
            const res = await fetch('/api/inquiries');
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.inquiries)) {
                    if (this.dataMode() === 'api') {
                        this.inquiries.set(data.inquiries.map((q) => ({
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
            }
        }
        catch (err) {
            console.warn('[Store] Could not load inquiries from backend:', err);
        }
    }
    // ============================================================================
    // USER MANAGEMENT & ACCESS CONTROL (Operations Manager Governance)
    // ============================================================================
    async loadUsers() {
        try {
            const res = await fetch('/api/auth/users');
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.users)) {
                    this.users.set(data.users);
                    console.log(`[Store] Synced ${data.users.length} users from database`);
                    return;
                }
            }
            if (this.users().length === 0) {
                this.users.set(this.getSeedUsers());
            }
        }
        catch (err) {
            console.warn('[Store] Could not load users from backend:', err);
            if (this.users().length === 0) {
                this.users.set(this.getSeedUsers());
            }
        }
    }
    async approveUser(userId) {
        try {
            const res = await fetch(`/api/auth/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'active' })
            });
            const data = await res.json();
            if (data.success) {
                this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'active' } : u));
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
        }
        catch (err) {
            console.warn('[Store] Failed approving user via API:', err);
            this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'active' } : u));
            return true;
        }
    }
    async rejectUser(userId) {
        try {
            const res = await fetch(`/api/auth/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' })
            });
            const data = await res.json();
            if (data.success) {
                this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
                return true;
            }
            return false;
        }
        catch (err) {
            console.warn('[Store] Failed rejecting user via API:', err);
            this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
            return true;
        }
    }
    async deactivateUser(userId) {
        try {
            const res = await fetch(`/api/auth/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'deactivated' })
            });
            const data = await res.json();
            if (data.success) {
                this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'deactivated' } : u));
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
        }
        catch (err) {
            console.warn('[Store] Failed deactivating user via API:', err);
            this.users.update(list => list.map(u => u.id === userId ? { ...u, status: 'deactivated' } : u));
            return true;
        }
    }
    async activateUser(userId) {
        return this.approveUser(userId);
    }
    async addNewUser(userData) {
        try {
            const res = await fetch('/api/auth/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (data.success && data.user) {
                const newUser = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    phone: data.user.phone,
                    status: data.user.status || 'active',
                    avatarUrl: data.user.avatarUrl,
                    createdAt: data.user.createdAt
                };
                this.users.update(list => [newUser, ...list.filter(u => u.id !== newUser.id)]);
                this.createNotification({
                    recipientRole: 'manager',
                    title: 'New User Account Created',
                    message: `${newUser.name} registered with role "${newUser.role}" and status "${newUser.status}".`,
                    type: 'job_assigned',
                    jobId: ''
                });
                return { success: true, message: data.message, user: newUser };
            }
            return { success: false, message: data.message || 'Failed creating user' };
        }
        catch (err) {
            console.warn('[Store] Failed creating user via API:', err);
            const localId = `USR-${Date.now().toString(36).toUpperCase()}`;
            const newUser = {
                id: localId,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                phone: userData.phone,
                status: userData.status || 'active',
                createdAt: new Date().toISOString()
            };
            this.users.update(list => [newUser, ...list]);
            return { success: true, message: `User ${userData.name} created locally`, user: newUser };
        }
    }
    async deleteUserAccount(userId) {
        try {
            const res = await fetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                this.users.update(list => list.filter(u => u.id !== userId));
                return true;
            }
            return false;
        }
        catch (err) {
            this.users.update(list => list.filter(u => u.id !== userId));
            return true;
        }
    }
    /**
     * Loads primary shop location settings from MySQL via Express backend.
     */
    async loadShopLocationFromBackend() {
        try {
            const res = await fetch('/api/shop-location');
            if (res.ok) {
                const data = await res.json();
                const loc = data.shopLocation || data.location;
                if (data.success && loc) {
                    this.shopLocation.set(loc);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(STORAGE_KEY_SHOP_LOCATION, JSON.stringify(loc));
                    }
                    console.log('[Store] Synced shop location from database:', loc.shopName);
                }
            }
        }
        catch (err) {
            console.warn('[Store] Could not load shop location from backend:', err);
        }
    }
    /**
     * Updates shop location settings and persists to MySQL database.
     */
    async updateShopLocation(settings) {
        const updated = {
            ...this.shopLocation(),
            ...settings,
            updatedAt: new Date().toISOString()
        };
        // Update local state and storage immediately for responsive UI
        this.shopLocation.set(updated);
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY_SHOP_LOCATION, JSON.stringify(updated));
            }
            catch { }
        }
        try {
            const res = await fetch('/api/shop-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });
            const data = await res.json();
            const loc = data.shopLocation || data.location;
            if (data.success && loc) {
                this.shopLocation.set(loc);
                if (typeof window !== 'undefined') {
                    localStorage.setItem(STORAGE_KEY_SHOP_LOCATION, JSON.stringify(loc));
                }
            }
            this.createNotification({
                recipientRole: 'shop_manager',
                title: 'Shop Location Settings Saved',
                message: `${updated.shopName} location & coordinates saved to database.`,
                type: 'job_assigned',
                jobId: ''
            });
            this.broadcastSyncUpdate({
                type: 'SHOP_LOCATION_UPDATED',
                shopLocation: this.shopLocation()
            });
            return { success: true, message: data.message || 'Shop location settings saved to database' };
        }
        catch (err) {
            console.warn('[Store] Failed updating shop location via API, stored locally:', err);
            this.alert.toastWarning('Saved Locally', 'Server unreachable. Settings saved to local cache.');
            this.broadcastSyncUpdate({
                type: 'SHOP_LOCATION_UPDATED',
                shopLocation: updated
            });
            return { success: true, message: 'Settings saved locally' };
        }
    }
    getSeedUsers() {
        return [
            {
                id: 'USR-MGR-01',
                name: 'Sarah Sterling (Ops Director)',
                email: 'manager@doormasterops.com',
                role: 'manager',
                phone: '+233 24 555 0101',
                status: 'active',
                avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
                createdAt: '2026-10-24T23:40:42.000Z'
            },
            {
                id: 'USR-INS-01',
                name: 'Marcus Vance (Lead Master Tech)',
                email: 'm.vance@doormasterops.com',
                role: 'installer',
                phone: '+233 24 555 0102',
                status: 'active',
                avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                createdAt: '2026-10-24T23:40:42.000Z'
            },
            {
                id: 'USR-SHP-01',
                name: 'Elena Rostova (Master Joiner & Shop Head)',
                email: 'shop@doormasterops.com',
                role: 'shop_manager',
                phone: '+233 24 555 0105',
                status: 'active',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                createdAt: '2026-10-24T23:40:42.000Z'
            },
            {
                id: 'USR-DSP-01',
                name: 'Emmanuel Kojo (Logistics Lead Driver)',
                email: 'dispatch@doormasterops.com',
                role: 'dispatcher',
                phone: '+233 24 555 0106',
                status: 'active',
                avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
                createdAt: '2026-10-24T23:40:42.000Z'
            },
            {
                id: 'USR-FIN-01',
                name: 'Abena Osei (Chief Financial Officer)',
                email: 'finance@doormasterops.com',
                role: 'account_officer',
                phone: '+233 24 555 0104',
                status: 'active',
                avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
                createdAt: '2026-10-24T23:40:42.000Z'
            },
            {
                id: 'USR-CLI-01',
                name: 'Kwame Mensah (Cantonments Villa)',
                email: 'client@doormasterops.com',
                role: 'client',
                phone: '+233 24 555 0103',
                status: 'active',
                avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                createdAt: '2026-10-24T23:40:42.000Z'
            },
            {
                id: 'USR-PENDING-01',
                name: 'David Asante (Apprentice Tech)',
                email: 'd.asante@gmail.com',
                role: 'installer',
                phone: '+233 24 777 8899',
                status: 'pending',
                avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
                createdAt: new Date().toISOString()
            }
        ];
    }
    addDoor(doorData) {
        const nextNum = Math.floor(100 + Math.random() * 900);
        const newDoor = {
            ...doorData,
            id: `DR-${nextNum}`,
            createdAt: new Date().toISOString()
        };
        this.doors.update(list => [newDoor, ...list]);
        this.saveDoors();
        // Mirror to backend Express server in background
        if (typeof window !== 'undefined') {
            fetch('/api/doors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoor)
            }).catch(err => console.warn('Background door sync error', err));
        }
        // Trigger notification to Operations & Shop managers
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
    updateDoor(id, partial) {
        this.doors.update(list => list.map(door => door.id === id ? { ...door, ...partial } : door));
        this.saveDoors();
        this.alert.toastSuccess('Door Updated', 'Specifications & stock updated.');
        if (typeof window !== 'undefined' && partial.stockQuantity !== undefined) {
            fetch(`/api/doors/${id}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stockQuantity: partial.stockQuantity, status: partial.status })
            }).catch(err => console.warn('Stock update sync warning', err));
        }
    }
    deleteDoor(id) {
        this.doors.update(list => list.filter(door => door.id !== id));
        this.saveDoors();
        this.alert.toastSuccess('Door Deleted', 'Door removed from catalog.');
        if (typeof window !== 'undefined') {
            fetch(`/api/doors/${id}`, { method: 'DELETE' })
                .catch(err => console.warn('Delete door sync warning', err));
        }
    }
    // --- Seed Data for Instant Realistic Operations ---
    getSeedDoors() {
        return DOORMASTER_SCRAPED_CATALOG;
    }
    getSeedInquiries() {
        return [
            {
                id: 'INQ-2026-101',
                fullName: 'Claire Kensington',
                email: 'c.kensington@pacificestates.com',
                phone: '+1 (555) 890-4421',
                doorType: 'entrance_pivot',
                projectType: 'luxury_estate',
                siteAddress: '4240 Oceanfront Bluff Way, Carmel-by-the-Sea',
                doorsCount: 2,
                message: 'Looking for expert installation for 2 heavy architectural pivot doors with floor spring systems and smart keypad entry.',
                submittedAt: '2026-09-24T16:20:00Z',
                status: 'new'
            },
            {
                id: 'INQ-2026-102',
                fullName: 'Harrison Bell',
                email: 'h.bell@bell-architects.org',
                phone: '+1 (555) 312-7711',
                doorType: 'acoustic_french',
                projectType: 'commercial',
                siteAddress: '880 Montgomery St, San Francisco, CA',
                doorsCount: 6,
                message: 'Commercial executive suite retrofit. Requires sound-damped French doors with certified acoustic threshold seals.',
                submittedAt: '2026-09-25T08:15:00Z',
                status: 'quoted'
            }
        ];
    }
    getSeedJobs() {
        return [
            {
                id: 'DM-2026-101',
                title: 'Grand Acoustic Pivot Entrance Installation',
                doorModel: 'AeroPivot 900 Smoked Walnut & Black PVD',
                doorCategory: 'entrance_pivot',
                dimensions: '2600mm × 1400mm × 65mm',
                finish: 'Smoked American Walnut, Architectural Matte Black PVD Pivot System',
                hardwareSpecs: 'FritsJurgens System M+ Pivot Hinge, Magnetic Deadbolt, Perimeter Drop-Seal',
                shopBranch: 'DoorMaster Flagship Workshop - Atelier A',
                client: {
                    id: 'cli_01',
                    name: 'Eleanor & Julian Vance',
                    phone: '+1 (555) 782-9011',
                    email: 'e.vance@glasshousedesign.io',
                    siteAddress: '184 Maplewood Crest, Highview Terraces',
                    accessInstructions: 'Gate code 4082. Use secondary trade driveway on the left.'
                },
                assignedInstallerId: 'inst_01',
                assignedInstallerName: 'Marcus Vance',
                assignedAt: '2026-09-24T09:00:00Z',
                acceptedAt: '2026-09-24T09:15:00Z',
                status: 'on_site',
                scheduledDate: '2026-09-25',
                estimatedHours: 4.5,
                actualHours: 2.5,
                clockSessions: [
                    {
                        id: 'clk_01',
                        jobId: 'DM-2026-101',
                        installerId: 'inst_01',
                        clockInTime: new Date(Date.now() - 2.5 * 3600 * 1000).toISOString(),
                        latitude: 37.7749,
                        longitude: -122.4194,
                        accuracyMeters: 8,
                        siteVerified: true,
                        notes: 'Site clearance verified, rough opening checked for level & plumb.'
                    }
                ],
                hardwareChecklist: [
                    { id: 'chk_1', label: 'Verify rough opening dimensions & floor levelness within ±1.5mm', required: true, completed: true, completedAt: '2026-09-25T07:15:00Z' },
                    { id: 'chk_2', label: 'Anchor floor pivot plate with high-torque epoxy masonry bolts', required: true, completed: true, completedAt: '2026-09-25T07:45:00Z' },
                    { id: 'chk_3', label: 'Mount top ceiling pivot cup & laser plumb alignment check', required: true, completed: true, completedAt: '2026-09-25T08:10:00Z' },
                    { id: 'chk_4', label: 'Hang 180kg Walnut Door Slab and calibrate FritsJurgens damping resistance', required: true, completed: false },
                    { id: 'chk_5', label: 'Install perimeter acoustic drop-seal & multi-point magnetic lock strike', required: true, completed: false },
                    { id: 'chk_6', label: 'Final reveal gap inspection (exact 3.5mm perimeter margin)', required: true, completed: false }
                ],
                photos: [
                    {
                        id: 'p_101_1',
                        stage: 'before',
                        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
                        caption: 'Pre-installation rough opening inspection & perimeter laser line check',
                        timestamp: '2026-09-25T07:10:00Z',
                        uploadedBy: 'Marcus Vance'
                    }
                ],
                financials: {
                    doorPrice: 7800,
                    installationFee: 1450,
                    laborCost: 650,
                    bonusAmount: 225,
                    bonusStatus: 'pending',
                    depositPaid: true,
                    balancePaid: false
                },
                createdAt: '2026-09-22T14:30:00Z',
                notes: 'Premium client. Zero scuff tolerance on surrounding Venetian plaster walls.'
            },
            {
                id: 'DM-2026-102',
                title: 'Commercial Acoustic Glass Bi-Fold Suite',
                doorModel: 'DoorMaster UltraFold-6 Architectural Glazed System',
                doorCategory: 'bi_fold_patio',
                dimensions: '5200mm × 2700mm (6-Leaf Bi-Fold)',
                finish: 'Deep Bronze Anodized Aluminum with Double Insulated Low-E Glass',
                hardwareSpecs: 'Stainless Steel Top-Hung Roller Carriage, Flush Threshold Track',
                shopBranch: 'DoorMaster Industrial Hub North',
                client: {
                    id: 'cli_02',
                    name: 'Apex Design & Architecture Studios',
                    phone: '+1 (555) 890-4412',
                    email: 'projects@apexdesign.studio',
                    siteAddress: '42 Waterfront Boulevard, Suite 300',
                    accessInstructions: 'Loading dock elevator access via Bay 3.'
                },
                assignedInstallerId: 'inst_02',
                assignedInstallerName: 'Devon Sterling',
                assignedAt: '2026-09-24T11:00:00Z',
                acceptedAt: '2026-09-24T11:20:00Z',
                status: 'dispatched',
                scheduledDate: '2026-09-26',
                estimatedHours: 6.0,
                clockSessions: [],
                hardwareChecklist: [
                    { id: 'chk_102_1', label: 'Verify structural lintel deflection capacity', required: true, completed: false },
                    { id: 'chk_102_2', label: 'Mount top-hung continuous track with countersunk fasteners', required: true, completed: false },
                    { id: 'chk_102_3', label: 'Assemble 6 glazed leaf panels with stainless interlocks', required: true, completed: false },
                    { id: 'chk_102_4', label: 'Weather seal testing & drainage weep-hole verification', required: true, completed: false }
                ],
                photos: [],
                financials: {
                    doorPrice: 14200,
                    installationFee: 2600,
                    laborCost: 1100,
                    bonusAmount: 280,
                    bonusStatus: 'pending',
                    depositPaid: true,
                    balancePaid: true
                },
                createdAt: '2026-09-23T10:00:00Z'
            },
            {
                id: 'DM-2026-103',
                title: 'Solid European White Oak Double Entrance',
                doorModel: 'DoorMaster Heritage Royal Double 44',
                doorCategory: 'solid_wood_entrance',
                dimensions: '2400mm × 1800mm × 50mm',
                finish: 'Natural Matte Hardwax Oil, Brushed Brass Hardware',
                hardwareSpecs: 'Baldwin Mortise Lockset, Concealed 3D Adjustable Hinges',
                shopBranch: 'DoorMaster Flagship Workshop - Atelier A',
                client: {
                    id: 'cli_03',
                    name: 'Harrison & Clara Dupont',
                    phone: '+1 (555) 432-6789',
                    email: 'h.dupont@dupontestates.com',
                    siteAddress: '88 Belmont Estate Road',
                    accessInstructions: 'Main gate has security guard. Mention DoorMaster installation permit.'
                },
                assignedInstallerId: 'inst_03',
                assignedInstallerName: 'Elena Rostova',
                assignedAt: '2026-09-23T08:00:00Z',
                acceptedAt: '2026-09-23T08:10:00Z',
                status: 'completed',
                scheduledDate: '2026-09-24',
                estimatedHours: 4.0,
                actualHours: 3.5,
                clockSessions: [
                    {
                        id: 'clk_103',
                        jobId: 'DM-2026-103',
                        installerId: 'inst_03',
                        clockInTime: '2026-09-24T08:15:00Z',
                        clockOutTime: '2026-09-24T11:45:00Z',
                        durationMinutes: 210,
                        latitude: 37.7833,
                        longitude: -122.4167,
                        accuracyMeters: 6,
                        siteVerified: true,
                        notes: 'Flawless double-door balance and zero air leakage test verified.'
                    }
                ],
                hardwareChecklist: [
                    { id: 'chk_103_1', label: 'Check jamb squareness and header deflection', required: true, completed: true, completedAt: '2026-09-24T08:30:00Z' },
                    { id: 'chk_103_2', label: 'Install 6 heavy-duty concealed 3D hinges', required: true, completed: true, completedAt: '2026-09-24T09:15:00Z' },
                    { id: 'chk_103_3', label: 'Fit flush bolts on inactive leaf & align magnetic catch', required: true, completed: true, completedAt: '2026-09-24T10:00:00Z' },
                    { id: 'chk_103_4', label: 'Apply weather sealing and silicone perimeter buffer', required: true, completed: true, completedAt: '2026-09-24T10:45:00Z' }
                ],
                photos: [
                    {
                        id: 'p_103_1',
                        stage: 'before',
                        url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80',
                        caption: 'Site arrival & existing opening measurement confirmation',
                        timestamp: '2026-09-24T08:20:00Z',
                        uploadedBy: 'Elena Rostova'
                    },
                    {
                        id: 'p_103_2',
                        stage: 'after',
                        url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80',
                        caption: 'Completed installation of Heritage Royal Double White Oak doors',
                        timestamp: '2026-09-24T11:30:00Z',
                        uploadedBy: 'Elena Rostova'
                    }
                ],
                customerSignoff: {
                    clientName: 'Harrison Dupont',
                    signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><path d="M10 50 Q 50 10, 90 40 T 170 30" stroke="black" stroke-width="3" fill="none"/></svg>',
                    signedAt: '2026-09-24T11:50:00Z',
                    rating: 5,
                    feedback: 'Exceptional craftsmanship by Elena! The reveal is laser-straight and the door swings like a dream.',
                    siteRepresentativeName: 'Harrison Dupont (Homeowner)',
                    verificationStatement: 'I confirm that the door installation has been completed to full satisfaction and verified operable without defect.'
                },
                financials: {
                    doorPrice: 6200,
                    installationFee: 1200,
                    laborCost: 550,
                    bonusAmount: 245,
                    bonusStatus: 'approved',
                    bonusApprovedBy: 'Operations Manager',
                    bonusApprovedAt: '2026-09-24T14:00:00Z',
                    depositPaid: true,
                    balancePaid: true
                },
                createdAt: '2026-09-20T11:00:00Z'
            },
            {
                id: 'DM-2026-104',
                title: 'FD60 Fire-Rated Acoustic Core Commercial Door',
                doorModel: 'DoorMaster ProShield FD60 Smoke-Sealed Steel Core',
                doorCategory: 'fire_rated_commercial',
                dimensions: '2200mm × 1000mm × 54mm',
                finish: 'Textured Anthracite Powdercoat, Satin Stainless Steel Kickplate',
                hardwareSpecs: 'Panic Exit Push Bar, Concealed Overhead Hydraulic Closer, Intumescent Strip',
                shopBranch: 'DoorMaster Industrial Hub North',
                client: {
                    id: 'cli_04',
                    name: 'Metropolis Corporate Center (Bldg C)',
                    phone: '+1 (555) 671-8822',
                    email: 'facilities@metropoliscorp.com',
                    siteAddress: '500 Executive Parkway, Floor 4 Fire Escape',
                    accessInstructions: 'Check in with building security desk on ground level.'
                },
                assignedInstallerId: 'inst_01',
                assignedInstallerName: 'Marcus Vance',
                assignedAt: '2026-09-25T06:00:00Z',
                status: 'assigned',
                scheduledDate: '2026-09-27',
                estimatedHours: 3.5,
                clockSessions: [],
                hardwareChecklist: [
                    { id: 'chk_104_1', label: 'Verify FD60 fire certification label compliance on frame', required: true, completed: false },
                    { id: 'chk_104_2', label: 'Install continuous high-temperature intumescent fire seals', required: true, completed: false },
                    { id: 'chk_104_3', label: 'Mount panic hardware and test fire alarm release mechanism', required: true, completed: false },
                    { id: 'chk_104_4', label: 'Adjust hydraulic closer closing speed & latching action', required: true, completed: false }
                ],
                photos: [],
                financials: {
                    doorPrice: 3800,
                    installationFee: 850,
                    laborCost: 400,
                    bonusAmount: 180,
                    bonusStatus: 'pending',
                    depositPaid: true,
                    balancePaid: false
                },
                createdAt: '2026-09-24T16:00:00Z'
            },
            {
                id: 'DM-2026-105',
                title: 'Turkey Interior Modern Door Installation',
                doorModel: 'Turkey interior DM001 Acoustic Interior Door',
                doorCategory: 'Turkey interior series',
                dimensions: '2100mm × 900mm × 45mm',
                finish: 'Walnut Natural Wood Grain',
                hardwareSpecs: 'Heavy-Duty Concealed Hinges & 3-Point Lockset',
                lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
                shopBranch: 'DoorMaster Flagship Showroom - Accra Central',
                client: {
                    id: 'cli_05',
                    name: 'Kofi Mensah',
                    phone: '+233 24 100 0005',
                    email: 'k.mensah@example.com',
                    siteAddress: 'Plot 12, East Legon Hills',
                    accessInstructions: 'Main residence gate'
                },
                assignedInstallerId: null,
                assignedInstallerName: null,
                installerAssignmentStatus: 'pending',
                status: 'booked_at_shop',
                scheduledDate: '2026-10-29',
                estimatedHours: 4,
                clockSessions: [],
                hardwareChecklist: [],
                photos: [],
                financials: {
                    doorPrice: 4750,
                    installationFee: 450,
                    laborCost: 450,
                    bonusAmount: 220,
                    bonusStatus: 'pending',
                    depositPaid: true,
                    balancePaid: false
                },
                createdAt: '2026-10-25T10:00:00Z'
            }
        ];
    }
    getSeedNotifications() {
        return [
            {
                id: 'notif_1',
                recipientRole: 'installer',
                recipientUserId: 'inst_01',
                title: 'New Door Installation Assigned',
                message: 'You have been assigned to AeroPivot 900 Walnut Door at 184 Maplewood Crest. Scheduled for today.',
                type: 'job_assigned',
                jobId: 'DM-2026-101',
                timestamp: '2026-09-25T06:30:00Z',
                read: false,
                actionLabel: 'View Job'
            },
            {
                id: 'notif_2',
                recipientRole: 'client',
                recipientUserId: 'cli_01',
                title: 'Installer Confirmed Your Installation',
                message: 'DoorMaster technician Marcus Vance has accepted your installation of AeroPivot 900. Scheduled date: 2026-09-25.',
                type: 'installer_accepted',
                jobId: 'DM-2026-101',
                timestamp: '2026-09-25T07:05:00Z',
                read: false,
                actionLabel: 'Track Technician'
            },
            {
                id: 'notif_3',
                recipientRole: 'client',
                recipientUserId: 'cli_01',
                title: 'DoorMaster Installer On Site',
                message: 'Marcus Vance has arrived on site at 184 Maplewood Crest and clocked in to begin work.',
                type: 'technician_clocked_in',
                jobId: 'DM-2026-101',
                timestamp: '2026-09-25T07:15:00Z',
                read: true
            },
            {
                id: 'notif_4',
                recipientRole: 'manager',
                title: 'Technician Clocked In On Site',
                message: 'Marcus Vance clocked in for job DM-2026-101 (Grand Acoustic Pivot Entrance).',
                type: 'technician_clocked_in',
                jobId: 'DM-2026-101',
                timestamp: '2026-09-25T07:15:00Z',
                read: true
            },
            {
                id: 'notif_5',
                recipientRole: 'account_officer',
                title: 'Performance Bonus Approved - $245.00',
                message: 'Elena Rostova earned $245.00 bonus for job DM-2026-103 (5-star rating + on-time installation). Ready for payment run.',
                type: 'bonus_awarded',
                jobId: 'DM-2026-103',
                timestamp: '2026-09-24T14:05:00Z',
                read: false
            }
        ];
    }
    static ɵfac = function InstallationStore_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InstallationStore)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: InstallationStore, factory: InstallationStore.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InstallationStore, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();
