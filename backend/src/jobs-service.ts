import prisma from './prisma';
import { Prisma } from '@prisma/client';

export interface DbInstallationJob {
  id: string;
  jobNumber: string;
  title?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  address: string;
  lat: number;
  lng: number;
  doorId?: string;
  doorName: string;
  doorCategory?: string;
  doorModelCode?: string;
  doorDimensions?: string;
  finish?: string;
  hardwareSpecs?: string;
  lockModel?: string;
  shopBranch?: string;
  depositAmount: number;
  balanceDue: number;
  status: string;
  assignedDriverId?: string | null;
  assignedDriverName?: string | null;
  driverAssignmentStatus?: string;
  assignedInstallerId?: string | null;
  assignedInstallerName?: string | null;
  assignedInstallerIds?: string[];
  assignedInstallerNames?: string[];
  assignedInstallers?: any;
  installerAssignmentStatus?: string;
  operationsApproved?: boolean;
  scheduledTime?: string;
  notes?: string;

  // JSON columns
  doors?: any;
  client?: any;
  shopBooking?: any;
  technicianSiteFunds?: any;
  logisticsTruck?: any;
  clockSessions?: any;
  hardwareChecklist?: any;
  photos?: any;
  customerSignoff?: any;
  financials?: any;

  createdAt?: string;
  updatedAt?: string;
}

export interface DbSmsLog {
  id: string;
  recipientPhone: string;
  recipientRole: string;
  recipientName: string;
  senderId: string;
  messageText: string;
  triggerEvent: string;
  status: string;
  providerRef: string;
  createdAt?: string;
}

export interface DbInstallerTrackSession {
  id: string;
  installerId: string;
  installerName: string;
  jobId?: string | null;
  sessionType: string;
  clockInTime?: string;
  clockOutTime?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  accuracyMeters?: number | null;
  siteVerified?: boolean;
  notes?: string | null;
  createdAt?: string;
}

export interface DbDispatchTracking {
  id: string;
  jobId: string;
  dispatcherId?: string | null;
  dispatcherName?: string | null;
  truckPlate?: string | null;
  truckModel?: string | null;
  status: string;
  currentLat?: number | null;
  currentLng?: number | null;
  targetAddress?: string | null;
  departureTime?: string | null;
  arrivalTime?: string | null;
  updatedAt?: string;
}

export interface DbInquiry {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string | null;
  doorCategory?: string | null;
  projectType?: string | null;
  location?: string | null;
  numberOfDoors?: number;
  notes?: string | null;
  status?: string;
  source?: string;
  createdAt?: string;
}

export interface DbCustomerSignoff {
  id: string;
  jobId: string;
  clientName: string;
  clientPhone?: string | null;
  rating: number;
  feedback?: string | null;
  signatureDataUrl?: string | null;
  satisfactionLevel?: string | null;
  signedAt?: string;
}

/**
 * Fetch all installation jobs using Prisma
 */
export async function getJobsFromDb(): Promise<DbInstallationJob[]> {
  try {
    const rows = await prisma.installationJob.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const now = new Date();
    // 10-Minute Auto-Acceptance Check for Driver & Installer:
    // If assigned and hasn't rejected within 10 minutes, system auto-accepts
    for (const r of rows) {
      const truck = r.logisticsTruck as any;
      const deadline = truck?.driverDeadlineAt ? new Date(truck.driverDeadlineAt) : null;
      if (
        r.assignedDriverId &&
        r.driverAssignmentStatus === 'pending' &&
        deadline &&
        deadline.getTime() <= now.getTime()
      ) {
        r.driverAssignmentStatus = 'accepted';
        if (r.logisticsTruck) {
          (r.logisticsTruck as any).driverAutoAccepted = true;
          (r.logisticsTruck as any).driverRespondedAt = now.toISOString();
        }
        prisma.installationJob.update({
          where: { id: r.id },
          data: {
            driverAssignmentStatus: 'accepted',
            logisticsTruck: r.logisticsTruck ?? Prisma.JsonNull
          }
        }).catch(err => console.warn('[JobsService] Driver auto-accept update failed for job:', r.id, err));
      }

      // 10-Minute Installer Auto-Acceptance Check:
      const assignedInstallers = r.assignedInstallers as any;
      const instDeadline = (r as any).installerDeadlineAt 
        ? new Date((r as any).installerDeadlineAt)
        : (assignedInstallers?.[0]?.deadlineAt ? new Date(assignedInstallers[0].deadlineAt) : null);
      if (
        r.assignedInstallerId &&
        r.installerAssignmentStatus === 'pending' &&
        instDeadline &&
        instDeadline.getTime() <= now.getTime()
      ) {
        r.installerAssignmentStatus = 'accepted';
        prisma.installationJob.update({
          where: { id: r.id },
          data: {
            installerAssignmentStatus: 'accepted'
          }
        }).catch(err => console.warn('[JobsService] Installer auto-accept update failed for job:', r.id, err));
      }
    }

    return rows.map((r) => ({
      id: r.id,
      jobNumber: r.jobNumber,
      title: r.title || `${r.doorName} - ${r.clientName}`,
      clientName: r.clientName,
      clientPhone: r.clientPhone,
      clientEmail: r.clientEmail || '',
      address: r.address,
      lat: Number(r.lat),
      lng: Number(r.lng),
      doorId: r.doorId || undefined,
      doorName: r.doorName,
      doorCategory: r.doorCategory || 'General Doors',
      doorModelCode: r.doorModelCode || '',
      doorDimensions: r.doorDimensions || '2100 × 900 × 50mm',
      finish: r.finish || '',
      hardwareSpecs: r.hardwareSpecs || '',
      lockModel: r.lockModel || 'DoorMaster Smart Lock',
      shopBranch: r.shopBranch || 'Accra Flagship Showroom',
      depositAmount: Number(r.depositAmount),
      balanceDue: Number(r.balanceDue),
      status: r.status,
      assignedDriverId: r.assignedDriverId,
      assignedDriverName: r.assignedDriverName || undefined,
      driverAssignmentStatus: r.driverAssignmentStatus || 'pending',
      assignedInstallerId: r.assignedInstallerId,
      assignedInstallerName: r.assignedInstallerName || undefined,
      assignedInstallerIds: (r.assignedInstallerIds as any) || undefined,
      assignedInstallerNames: (r.assignedInstallerNames as any) || undefined,
      assignedInstallers: (r.assignedInstallers as any) || undefined,
      installerAssignmentStatus: r.installerAssignmentStatus || 'pending',
      operationsApproved: r.operationsApproved,
      scheduledTime: r.scheduledTime || 'Today, 2:00 PM',
      notes: r.notes || '',

      // JSON columns
      doors: r.doors || undefined,
      client: r.client || undefined,
      shopBooking: r.shopBooking || undefined,
      technicianSiteFunds: r.technicianSiteFunds || undefined,
      logisticsTruck: r.logisticsTruck || undefined,
      clockSessions: r.clockSessions || undefined,
      hardwareChecklist: r.hardwareChecklist || undefined,
      photos: r.photos || undefined,
      customerSignoff: r.customerSignoff || undefined,
      financials: r.financials || undefined,

      createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: r.updatedAt ? r.updatedAt.toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error('[JobsService] Failed fetching jobs from Prisma:', err);
    return [];
  }
}

/**
 * Save or update installation job using Prisma with full JSON & relational fidelity
 */
export async function saveJobToDb(job: Partial<DbInstallationJob>): Promise<DbInstallationJob | null> {
  try {
    const id = job.id || `DM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const jobNumber = job.jobNumber || id;

    const dataPayload: Prisma.InstallationJobUpdateInput = {
      title: job.title || undefined,
      clientName: job.clientName,
      clientPhone: job.clientPhone,
      clientEmail: job.clientEmail,
      address: job.address,
      lat: job.lat !== undefined ? new Prisma.Decimal(job.lat) : undefined,
      lng: job.lng !== undefined ? new Prisma.Decimal(job.lng) : undefined,
      doorName: job.doorName,
      doorCategory: job.doorCategory || undefined,
      doorModelCode: job.doorModelCode || undefined,
      doorDimensions: job.doorDimensions || undefined,
      finish: job.finish || undefined,
      hardwareSpecs: job.hardwareSpecs || undefined,
      lockModel: job.lockModel || undefined,
      shopBranch: job.shopBranch || undefined,
      depositAmount: job.depositAmount !== undefined ? new Prisma.Decimal(job.depositAmount) : undefined,
      balanceDue: job.balanceDue !== undefined ? new Prisma.Decimal(job.balanceDue) : undefined,
      status: job.status,
      assignedDriverId: job.assignedDriverId,
      assignedDriverName: job.assignedDriverName,
      driverAssignmentStatus: job.driverAssignmentStatus,
      assignedInstallerId: job.assignedInstallerId,
      assignedInstallerName: job.assignedInstallerName,
      assignedInstallerIds: job.assignedInstallerIds !== undefined ? (job.assignedInstallerIds ?? Prisma.JsonNull) : undefined,
      assignedInstallerNames: job.assignedInstallerNames !== undefined ? (job.assignedInstallerNames ?? Prisma.JsonNull) : undefined,
      assignedInstallers: job.assignedInstallers !== undefined ? (job.assignedInstallers ?? Prisma.JsonNull) : undefined,
      installerAssignmentStatus: job.installerAssignmentStatus,
      operationsApproved: job.operationsApproved !== undefined ? Boolean(job.operationsApproved) : undefined,
      scheduledTime: job.scheduledTime,
      notes: job.notes,

      // JSON payload fields
      doors: job.doors !== undefined ? job.doors : undefined,
      client: job.client !== undefined ? job.client : undefined,
      shopBooking: job.shopBooking !== undefined ? job.shopBooking : undefined,
      technicianSiteFunds: job.technicianSiteFunds !== undefined ? job.technicianSiteFunds : undefined,
      logisticsTruck: job.logisticsTruck !== undefined ? job.logisticsTruck : undefined,
      clockSessions: job.clockSessions !== undefined ? job.clockSessions : undefined,
      hardwareChecklist: job.hardwareChecklist !== undefined ? job.hardwareChecklist : undefined,
      photos: job.photos !== undefined ? job.photos : undefined,
      customerSignoff: job.customerSignoff !== undefined ? job.customerSignoff : undefined,
      financials: job.financials !== undefined ? job.financials : undefined,
    };

    const createPayload: Prisma.InstallationJobCreateInput = {
      id,
      jobNumber,
      title: job.title || `${job.doorName || 'Door Installation'} - ${job.clientName || 'Client'}`,
      clientName: job.clientName || 'Valued Client',
      clientPhone: job.clientPhone || '+233 24 555 0100',
      clientEmail: job.clientEmail || '',
      address: job.address || 'Accra, Ghana',
      lat: new Prisma.Decimal(job.lat || 5.6037),
      lng: new Prisma.Decimal(job.lng || -0.1870),
      doorId: job.doorId || null,
      doorName: job.doorName || 'DoorMaster Architectural Slab',
      doorCategory: job.doorCategory || 'General Doors',
      doorModelCode: job.doorModelCode || 'DM-SPEC',
      doorDimensions: job.doorDimensions || '2100 × 900 × 50mm',
      finish: job.finish || 'Architectural Matte Finish',
      hardwareSpecs: job.hardwareSpecs || 'DormaKaba Heavy Duty Pivot, Magnetic Lock',
      lockModel: job.lockModel || 'DoorMaster Smart Lock',
      shopBranch: job.shopBranch || 'Accra Flagship Showroom',
      depositAmount: new Prisma.Decimal(job.depositAmount || 0),
      balanceDue: new Prisma.Decimal(job.balanceDue || 0),
      status: job.status || 'booked_at_shop',
      assignedDriverId: job.assignedDriverId || null,
      assignedDriverName: job.assignedDriverName || null,
      driverAssignmentStatus: job.driverAssignmentStatus || 'pending',
      assignedInstallerId: job.assignedInstallerId || null,
      assignedInstallerName: job.assignedInstallerName || null,
      assignedInstallerIds: job.assignedInstallerIds !== undefined ? (job.assignedInstallerIds ?? Prisma.JsonNull) : Prisma.JsonNull,
      assignedInstallerNames: job.assignedInstallerNames !== undefined ? (job.assignedInstallerNames ?? Prisma.JsonNull) : Prisma.JsonNull,
      assignedInstallers: job.assignedInstallers !== undefined ? (job.assignedInstallers ?? Prisma.JsonNull) : Prisma.JsonNull,
      installerAssignmentStatus: job.installerAssignmentStatus || 'pending',
      operationsApproved: Boolean(job.operationsApproved),
      scheduledTime: job.scheduledTime || 'Today, 2:00 PM',
      notes: job.notes || '',

      // JSON fields
      doors: job.doors || Prisma.JsonNull,
      client: job.client || Prisma.JsonNull,
      shopBooking: job.shopBooking || Prisma.JsonNull,
      technicianSiteFunds: job.technicianSiteFunds || Prisma.JsonNull,
      logisticsTruck: job.logisticsTruck || Prisma.JsonNull,
      clockSessions: job.clockSessions || Prisma.JsonNull,
      hardwareChecklist: job.hardwareChecklist || Prisma.JsonNull,
      photos: job.photos || Prisma.JsonNull,
      customerSignoff: job.customerSignoff || Prisma.JsonNull,
      financials: job.financials || Prisma.JsonNull,
    };

    const saved = await prisma.installationJob.upsert({
      where: { id },
      update: dataPayload,
      create: createPayload,
    });

    return {
      id: saved.id,
      jobNumber: saved.jobNumber,
      title: saved.title || undefined,
      clientName: saved.clientName,
      clientPhone: saved.clientPhone,
      clientEmail: saved.clientEmail || '',
      address: saved.address,
      lat: Number(saved.lat),
      lng: Number(saved.lng),
      doorId: saved.doorId || undefined,
      doorName: saved.doorName,
      doorCategory: saved.doorCategory || undefined,
      doorModelCode: saved.doorModelCode || '',
      doorDimensions: saved.doorDimensions || '2100 × 900 × 50mm',
      finish: saved.finish || undefined,
      hardwareSpecs: saved.hardwareSpecs || undefined,
      lockModel: saved.lockModel || 'DoorMaster Smart Lock',
      shopBranch: saved.shopBranch || undefined,
      depositAmount: Number(saved.depositAmount),
      balanceDue: Number(saved.balanceDue),
      status: saved.status,
      assignedDriverId: saved.assignedDriverId,
      assignedDriverName: saved.assignedDriverName || undefined,
      driverAssignmentStatus: saved.driverAssignmentStatus || 'pending',
      assignedInstallerId: saved.assignedInstallerId,
      assignedInstallerName: saved.assignedInstallerName || undefined,
      assignedInstallerIds: (saved.assignedInstallerIds as any) || undefined,
      assignedInstallerNames: (saved.assignedInstallerNames as any) || undefined,
      assignedInstallers: (saved.assignedInstallers as any) || undefined,
      installerAssignmentStatus: saved.installerAssignmentStatus || 'pending',
      operationsApproved: saved.operationsApproved,
      scheduledTime: saved.scheduledTime || 'Today, 2:00 PM',
      notes: saved.notes || '',

      doors: saved.doors || undefined,
      client: saved.client || undefined,
      shopBooking: saved.shopBooking || undefined,
      technicianSiteFunds: saved.technicianSiteFunds || undefined,
      logisticsTruck: saved.logisticsTruck || undefined,
      clockSessions: saved.clockSessions || undefined,
      hardwareChecklist: saved.hardwareChecklist || undefined,
      photos: saved.photos || undefined,
      customerSignoff: saved.customerSignoff || undefined,
      financials: saved.financials || undefined,

      createdAt: saved.createdAt.toISOString(),
      updatedAt: saved.updatedAt.toISOString(),
    };
  } catch (err) {
    console.error('[JobsService] Failed saving job via Prisma:', err);
    return null;
  }
}

/**
 * Clean database guarantee for API mode:
 * Real users populate live installation jobs via counter booking & operational workflows.
 */
export async function seedJobsIfEmpty(): Promise<void> {
  // Clean DB mode: No dummy jobs injected into MySQL
  return;
}

/**
 * ============================================================================
 * INSTALLER TRACK SESSIONS (Clock-In / Clock-Out)
 * ============================================================================
 */
export async function saveInstallerTrackSession(session: Partial<DbInstallerTrackSession>): Promise<DbInstallerTrackSession | null> {
  try {
    const id = session.id || `TRK-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const saved = await prisma.installerTrackSession.create({
      data: {
        id,
        installerId: session.installerId || 'inst_unknown',
        installerName: session.installerName || 'Field Technician',
        jobId: session.jobId || null,
        sessionType: session.sessionType || 'clock_in',
        clockInTime: session.clockInTime ? new Date(session.clockInTime) : new Date(),
        clockOutTime: session.clockOutTime ? new Date(session.clockOutTime) : null,
        latitude: session.latitude !== undefined && session.latitude !== null ? new Prisma.Decimal(session.latitude) : null,
        longitude: session.longitude !== undefined && session.longitude !== null ? new Prisma.Decimal(session.longitude) : null,
        accuracyMeters: session.accuracyMeters !== undefined && session.accuracyMeters !== null ? new Prisma.Decimal(session.accuracyMeters) : null,
        siteVerified: Boolean(session.siteVerified),
        notes: session.notes || null,
      },
    });

    return {
      id: saved.id,
      installerId: saved.installerId,
      installerName: saved.installerName,
      jobId: saved.jobId,
      sessionType: saved.sessionType,
      clockInTime: saved.clockInTime.toISOString(),
      clockOutTime: saved.clockOutTime ? saved.clockOutTime.toISOString() : null,
      latitude: saved.latitude ? Number(saved.latitude) : null,
      longitude: saved.longitude ? Number(saved.longitude) : null,
      accuracyMeters: saved.accuracyMeters ? Number(saved.accuracyMeters) : null,
      siteVerified: saved.siteVerified,
      notes: saved.notes,
      createdAt: saved.createdAt.toISOString(),
    };
  } catch (err) {
    console.error('[JobsService] Failed saving installer track session:', err);
    return null;
  }
}

export async function getInstallerTrackSessions(installerId?: string, jobId?: string): Promise<DbInstallerTrackSession[]> {
  try {
    const where: Prisma.InstallerTrackSessionWhereInput = {};
    if (installerId) where.installerId = installerId;
    if (jobId) where.jobId = jobId;

    const rows = await prisma.installerTrackSession.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return rows.map(r => ({
      id: r.id,
      installerId: r.installerId,
      installerName: r.installerName,
      jobId: r.jobId,
      sessionType: r.sessionType,
      clockInTime: r.clockInTime.toISOString(),
      clockOutTime: r.clockOutTime ? r.clockOutTime.toISOString() : null,
      latitude: r.latitude ? Number(r.latitude) : null,
      longitude: r.longitude ? Number(r.longitude) : null,
      accuracyMeters: r.accuracyMeters ? Number(r.accuracyMeters) : null,
      siteVerified: r.siteVerified,
      notes: r.notes,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error('[JobsService] Failed retrieving installer track sessions:', err);
    return [];
  }
}

/**
 * ============================================================================
 * DISPATCH TRACKING (Truck & Driver GPS Updates)
 * ============================================================================
 */
export async function saveDispatchTracking(track: Partial<DbDispatchTracking>): Promise<DbDispatchTracking | null> {
  try {
    const id = track.id || `DSP-${Date.now().toString(36).toUpperCase()}`;
    const saved = await prisma.dispatchTracking.upsert({
      where: { id },
      update: {
        status: track.status,
        currentLat: track.currentLat !== undefined && track.currentLat !== null ? new Prisma.Decimal(track.currentLat) : undefined,
        currentLng: track.currentLng !== undefined && track.currentLng !== null ? new Prisma.Decimal(track.currentLng) : undefined,
        targetAddress: track.targetAddress,
        departureTime: track.departureTime ? new Date(track.departureTime) : undefined,
        arrivalTime: track.arrivalTime ? new Date(track.arrivalTime) : undefined,
      },
      create: {
        id,
        jobId: track.jobId || 'JOB-UNKNOWN',
        dispatcherId: track.dispatcherId || null,
        dispatcherName: track.dispatcherName || 'Dispatch Driver',
        truckPlate: track.truckPlate || 'GT-4821-26',
        truckModel: track.truckModel || 'Mercedes-Benz Atego',
        status: track.status || 'in_transit',
        currentLat: track.currentLat !== undefined && track.currentLat !== null ? new Prisma.Decimal(track.currentLat) : null,
        currentLng: track.currentLng !== undefined && track.currentLng !== null ? new Prisma.Decimal(track.currentLng) : null,
        targetAddress: track.targetAddress || null,
        departureTime: track.departureTime ? new Date(track.departureTime) : new Date(),
        arrivalTime: track.arrivalTime ? new Date(track.arrivalTime) : null,
      },
    });

    return {
      id: saved.id,
      jobId: saved.jobId,
      dispatcherId: saved.dispatcherId,
      dispatcherName: saved.dispatcherName,
      truckPlate: saved.truckPlate,
      truckModel: saved.truckModel,
      status: saved.status,
      currentLat: saved.currentLat ? Number(saved.currentLat) : null,
      currentLng: saved.currentLng ? Number(saved.currentLng) : null,
      targetAddress: saved.targetAddress,
      departureTime: saved.departureTime ? saved.departureTime.toISOString() : null,
      arrivalTime: saved.arrivalTime ? saved.arrivalTime.toISOString() : null,
      updatedAt: saved.updatedAt.toISOString(),
    };
  } catch (err) {
    console.error('[JobsService] Failed saving dispatch tracking:', err);
    return null;
  }
}

export async function getDispatchTracking(jobId?: string): Promise<DbDispatchTracking[]> {
  try {
    const where: Prisma.DispatchTrackingWhereInput = jobId ? { jobId } : {};
    const rows = await prisma.dispatchTracking.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      take: 50,
    });

    return rows.map(r => ({
      id: r.id,
      jobId: r.jobId,
      dispatcherId: r.dispatcherId,
      dispatcherName: r.dispatcherName,
      truckPlate: r.truckPlate,
      truckModel: r.truckModel,
      status: r.status,
      currentLat: r.currentLat ? Number(r.currentLat) : null,
      currentLng: r.currentLng ? Number(r.currentLng) : null,
      targetAddress: r.targetAddress,
      departureTime: r.departureTime ? r.departureTime.toISOString() : null,
      arrivalTime: r.arrivalTime ? r.arrivalTime.toISOString() : null,
      updatedAt: r.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error('[JobsService] Failed retrieving dispatch tracking:', err);
    return [];
  }
}

/**
 * ============================================================================
 * INQUIRIES & QUOTE REQUESTS (Landing Page Form)
 * ============================================================================
 */
export async function saveInquiry(inquiry: Partial<DbInquiry>): Promise<DbInquiry | null> {
  try {
    const id = inquiry.id || `INQ-${Date.now().toString(36).toUpperCase()}`;
    const saved = await prisma.inquiry.create({
      data: {
        id,
        clientName: inquiry.clientName || 'Inquiry Client',
        clientPhone: inquiry.clientPhone || '+233 24 555 0100',
        clientEmail: inquiry.clientEmail || null,
        doorCategory: inquiry.doorCategory || 'General Doors',
        projectType: inquiry.projectType || 'Residential',
        location: inquiry.location || 'Accra, Ghana',
        numberOfDoors: inquiry.numberOfDoors || 1,
        notes: inquiry.notes || null,
        status: inquiry.status || 'pending',
        source: inquiry.source || 'landing_page',
      },
    });

    return {
      id: saved.id,
      clientName: saved.clientName,
      clientPhone: saved.clientPhone,
      clientEmail: saved.clientEmail,
      doorCategory: saved.doorCategory,
      projectType: saved.projectType,
      location: saved.location,
      numberOfDoors: saved.numberOfDoors,
      notes: saved.notes,
      status: saved.status,
      source: saved.source,
      createdAt: saved.createdAt.toISOString(),
    };
  } catch (err) {
    console.error('[JobsService] Failed saving inquiry:', err);
    return null;
  }
}

export async function getInquiries(): Promise<DbInquiry[]> {
  try {
    const rows = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return rows.map(r => ({
      id: r.id,
      clientName: r.clientName,
      clientPhone: r.clientPhone,
      clientEmail: r.clientEmail,
      doorCategory: r.doorCategory,
      projectType: r.projectType,
      location: r.location,
      numberOfDoors: r.numberOfDoors,
      notes: r.notes,
      status: r.status,
      source: r.source,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error('[JobsService] Failed fetching inquiries:', err);
    return [];
  }
}

/**
 * ============================================================================
 * CUSTOMER SIGNOFF & DIGITAL SIGNATURE
 * ============================================================================
 */
export async function saveCustomerSignoff(signoff: Partial<DbCustomerSignoff>): Promise<DbCustomerSignoff | null> {
  try {
    if (!signoff.jobId) return null;
    const id = signoff.id || `SGF-${Date.now().toString(36).toUpperCase()}`;

    const saved = await prisma.customerSignoffRecord.upsert({
      where: { jobId: signoff.jobId },
      update: {
        clientName: signoff.clientName,
        clientPhone: signoff.clientPhone,
        rating: signoff.rating || 5,
        feedback: signoff.feedback,
        signatureDataUrl: signoff.signatureDataUrl,
        satisfactionLevel: signoff.satisfactionLevel || 'Excellent',
        signedAt: signoff.signedAt ? new Date(signoff.signedAt) : new Date(),
      },
      create: {
        id,
        jobId: signoff.jobId,
        clientName: signoff.clientName || 'Valued Client',
        clientPhone: signoff.clientPhone || null,
        rating: signoff.rating || 5,
        feedback: signoff.feedback || null,
        signatureDataUrl: signoff.signatureDataUrl || null,
        satisfactionLevel: signoff.satisfactionLevel || 'Excellent',
        signedAt: signoff.signedAt ? new Date(signoff.signedAt) : new Date(),
      },
    });

    return {
      id: saved.id,
      jobId: saved.jobId,
      clientName: saved.clientName,
      clientPhone: saved.clientPhone,
      rating: saved.rating,
      feedback: saved.feedback,
      signatureDataUrl: saved.signatureDataUrl,
      satisfactionLevel: saved.satisfactionLevel,
      signedAt: saved.signedAt.toISOString(),
    };
  } catch (err) {
    console.error('[JobsService] Failed saving customer signoff:', err);
    return null;
  }
}

/**
 * ============================================================================
 * SMS LOGS
 * ============================================================================
 */
export async function getSmsLogsFromDb(): Promise<DbSmsLog[]> {
  try {
    const rows = await prisma.smsLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return rows.map((r) => ({
      id: r.id,
      recipientPhone: r.recipientPhone,
      recipientRole: r.recipientRole,
      recipientName: r.recipientName,
      senderId: r.senderId,
      messageText: r.messageText,
      triggerEvent: r.triggerEvent,
      status: r.status,
      providerRef: r.providerRef || 'SIM-DIRECT',
      createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error('[JobsService] Failed fetching SMS logs via Prisma:', err);
    return [];
  }
}

export async function logSmsToDb(sms: Partial<DbSmsLog>): Promise<DbSmsLog | null> {
  try {
    const id = sms.id || `SMS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const saved = await prisma.smsLog.create({
      data: {
        id,
        recipientPhone: sms.recipientPhone || '+233 24 555 0100',
        recipientRole: sms.recipientRole || 'client',
        recipientName: sms.recipientName || 'Recipient',
        senderId: sms.senderId || 'DoorMaster',
        messageText: sms.messageText || '',
        triggerEvent: sms.triggerEvent || 'notification',
        status: sms.status || 'delivered',
        providerRef: sms.providerRef || 'SIM-LOG',
      },
    });

    return {
      id: saved.id,
      recipientPhone: saved.recipientPhone,
      recipientRole: saved.recipientRole,
      recipientName: saved.recipientName,
      senderId: saved.senderId,
      messageText: saved.messageText,
      triggerEvent: saved.triggerEvent,
      status: saved.status,
      providerRef: saved.providerRef || 'SIM-LOG',
      createdAt: saved.createdAt.toISOString(),
    };
  } catch (err) {
    console.error('[JobsService] Failed saving SMS via Prisma:', err);
    return null;
  }
}

export interface DbNotification {
  id: string;
  recipientRole: string;
  recipientUserId?: string | null;
  title: string;
  message: string;
  type: string;
  jobId: string;
  read: boolean;
  actionLabel?: string | null;
  createdAt: string;
}

export async function getNotificationsFromDb(role?: string): Promise<DbNotification[]> {
  try {
    const where: Prisma.NotificationWhereInput = {};
    if (role && role !== 'all') {
      where.OR = [
        { recipientRole: role },
        { recipientRole: 'all' }
      ];
    }

    const rows = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return rows.map(r => ({
      id: r.id,
      recipientRole: r.recipientRole,
      recipientUserId: r.recipientUserId,
      title: r.title,
      message: r.message,
      type: r.type,
      jobId: r.jobId,
      read: r.read,
      actionLabel: r.actionLabel,
      createdAt: r.createdAt.toISOString()
    }));
  } catch (err) {
    console.error('[JobsService] Failed fetching notifications via Prisma:', err);
    return [];
  }
}

export async function saveNotificationToDb(notif: Partial<DbNotification>): Promise<DbNotification | null> {
  try {
    const id = notif.id || `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const saved = await prisma.notification.create({
      data: {
        id,
        recipientRole: notif.recipientRole || 'all',
        recipientUserId: notif.recipientUserId || null,
        title: notif.title || 'Notification',
        message: notif.message || '',
        type: notif.type || 'job_assigned',
        jobId: notif.jobId || 'GENERAL',
        read: Boolean(notif.read),
        actionLabel: notif.actionLabel || null
      }
    });

    return {
      id: saved.id,
      recipientRole: saved.recipientRole,
      recipientUserId: saved.recipientUserId,
      title: saved.title,
      message: saved.message,
      type: saved.type,
      jobId: saved.jobId,
      read: saved.read,
      actionLabel: saved.actionLabel,
      createdAt: saved.createdAt.toISOString()
    };
  } catch (err) {
    console.error('[JobsService] Failed saving notification via Prisma:', err);
    return null;
  }
}

export async function markNotificationReadInDb(id: string): Promise<boolean> {
  try {
    await prisma.notification.update({
      where: { id },
      data: { read: true }
    });
    return true;
  } catch {
    return false;
  }
}

export async function markAllNotificationsReadInDb(role: string): Promise<boolean> {
  try {
    const where: Prisma.NotificationWhereInput = {};
    if (role && role !== 'all') {
      where.recipientRole = role;
    }
    await prisma.notification.updateMany({
      where,
      data: { read: true }
    });
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// SHOP LOCATION & STORE SETTINGS (Shop Manager Governance)
// ============================================================================

export interface DbShopLocation {
  id: string;
  shopName: string;
  branchCode?: string;
  address: string;
  city?: string;
  region?: string;
  phone?: string;
  email?: string;
  latitude: number;
  longitude: number;
  dispatchRadiusKm: number;
  operatingHours?: string;
  managerName?: string;
  isPrimary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_DOORMASTER_BRANCHES: Omit<DbShopLocation, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'dm-branch-central',
    shopName: 'DoorMaster Central Showroom & Atelier',
    branchCode: 'DM-GH-HQ-SPX',
    address: 'Plot 48, Spintex Road Industrial Area, Accra',
    city: 'Accra',
    region: 'Greater Accra',
    phone: '0542745222 / 0500212447',
    email: 'shop@doormasterops.com',
    latitude: 5.632000,
    longitude: -0.098000,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Elena Rostova (Master Joiner & Central Shop Head)',
    isPrimary: true
  },
  {
    id: 'dm-branch-obeyeyie',
    shopName: 'DoorMaster Obeyeyie Branch',
    branchCode: 'DM-GH-OBY',
    address: 'Opposite the forest reserve, Obeyeyie',
    city: 'Obeyeyie / Amasaman',
    region: 'Greater Accra',
    phone: '0203169184',
    email: 'shop.obeyeyie@doormaster.online',
    latitude: 5.733722,
    longitude: -0.151583,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kofi Boateng (Obeyeyie Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-pobiman-turkey',
    shopName: 'DoorMaster Pobiman (Turkey Section)',
    branchCode: 'DM-GH-PBM-TRK',
    address: 'Tollbooth, Accra–Kumasi Highway (Pobiman West Africa)',
    city: 'Pobiman',
    region: 'Greater Accra',
    phone: '0207867882',
    email: 'shop.pobiman-turkey@doormaster.online',
    latitude: 5.733056,
    longitude: -0.312972,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Yaw Antwi (Pobiman Turkey Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-pobiman-economy',
    shopName: 'DoorMaster Pobiman (Economy Section)',
    branchCode: 'DM-GH-PBM-ECO',
    address: 'Tollbooth, Accra–Kumasi Highway, Pobiman Branch',
    city: 'Pobiman',
    region: 'Greater Accra',
    phone: '0502584180',
    email: 'shop.pobiman-economy@doormaster.online',
    latitude: 5.733722,
    longitude: -0.313306,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kwabena Agyeman (Pobiman Economy Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-acp',
    shopName: 'DoorMaster ACP Branch',
    branchCode: 'DM-GH-ACP',
    address: 'ACP Junction / Pokuase Corridor',
    city: 'Pokuase / ACP',
    region: 'Greater Accra',
    phone: '0201705689',
    email: 'shop.acp@doormaster.online',
    latitude: 5.689028,
    longitude: -0.268083,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Akua Darko (ACP Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-nsawam-overhead',
    shopName: 'DoorMaster Nsawam Overhead',
    branchCode: 'DM-GH-NSW-OVH',
    address: 'Nsawam Overhead Junction, Accra–Kumasi Road',
    city: 'Nsawam',
    region: 'Eastern',
    phone: '0505892144',
    email: 'shop.nsawam-overhead@doormaster.online',
    latitude: 5.819139,
    longitude: -0.363750,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kwame Appiah (Nsawam Overhead Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-nsawam-hospital',
    shopName: 'DoorMaster Nsawam Hospital Road',
    branchCode: 'DM-GH-NSW-HSP',
    address: 'Hospital Road, Nsawam',
    city: 'Nsawam',
    region: 'Eastern',
    phone: '0535825645',
    email: 'shop.nsawam-hospital@doormaster.online',
    latitude: 5.816500,
    longitude: -0.361500,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Ama Serwaa (Nsawam Hospital Rd Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-tema',
    shopName: 'DoorMaster Tema Branch',
    branchCode: 'DM-GH-TMA',
    address: 'Community 1 / Industrial Area, Tema',
    city: 'Tema',
    region: 'Greater Accra',
    phone: '0502290982',
    email: 'shop.tema@doormaster.online',
    latitude: 5.659889,
    longitude: -0.012167,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Ebenezer Quaye (Tema Branch Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-suhum',
    shopName: 'DoorMaster Suhum Branch',
    branchCode: 'DM-GH-SHM',
    address: 'Suhum Roundabout / Accra-Kumasi Highway',
    city: 'Suhum',
    region: 'Eastern',
    phone: '0201752755 / 0539111183',
    email: 'shop.suhum@doormaster.online',
    latitude: 6.042639,
    longitude: -0.449917,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Daniel Asare (Suhum Branch Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-ashalaja',
    shopName: 'DoorMaster Ashalaja Branch',
    branchCode: 'DM-GH-ASH',
    address: 'Ashalaja Main Road, Amasaman District',
    city: 'Ashalaja',
    region: 'Greater Accra',
    phone: '0504725294',
    email: 'shop.ashalaja@doormaster.online',
    latitude: 5.659917,
    longitude: -0.362028,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Francis Mensah (Ashalaja Branch Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-kumasi-ahinsan',
    shopName: 'DoorMaster Kumasi Ahinsan',
    branchCode: 'DM-GH-KSI-AHN',
    address: 'Ahinsan bus stop, adjacent Kumawuman Rural Bank',
    city: 'Kumasi',
    region: 'Ashanti',
    phone: '0535829827',
    email: 'shop.kumasi-ahinsan@doormaster.online',
    latitude: 6.686361,
    longitude: -1.623972,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Osei Tutu (Kumasi Ahinsan Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-kasoa-tipa',
    shopName: 'DoorMaster Kasoa Tipa Junction',
    branchCode: 'DM-GH-KAS-TIP',
    address: 'Tipa Junction, Kasoa',
    city: 'Kasoa',
    region: 'Central / Greater Accra',
    phone: '0533739756',
    email: 'shop.kasoa-tipa@doormaster.online',
    latitude: 5.524528,
    longitude: -0.458250,
    dispatchRadiusKm: 30.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Kojo Baidoo (Kasoa Tipa Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-amrahia',
    shopName: 'DoorMaster Amrahia Branch',
    branchCode: 'DM-GH-AMR',
    address: 'Accra–Dodowa Road, Amrahia',
    city: 'Amrahia / Adenta',
    region: 'Greater Accra',
    phone: '0531025779',
    email: 'shop.amrahia@doormaster.online',
    latitude: 5.761220,
    longitude: -0.126510,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Priscilla Kyei (Amrahia Branch Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-tseaddo',
    shopName: 'DoorMaster Tseaddo Branch',
    branchCode: 'DM-GH-TSE',
    address: 'Behind Trade Fair / Airport Hills, Tseaddo',
    city: 'Tseaddo / La',
    region: 'Greater Accra',
    phone: '0591952205',
    email: 'shop.tseaddo@doormaster.online',
    latitude: 5.602230,
    longitude: -0.141520,
    dispatchRadiusKm: 25.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Nathaniel Tagoe (Tseaddo Branch Shop Manager)',
    isPrimary: false
  },
  {
    id: 'dm-branch-kronum',
    shopName: 'DoorMaster Kronum Kumasi',
    branchCode: 'DM-GH-KSI-KRN',
    address: 'Off Offinso Road, Kronum Kumasi',
    city: 'Kumasi',
    region: 'Ashanti',
    phone: '0531025775',
    email: 'shop.kronum@doormaster.online',
    latitude: 6.758410,
    longitude: -1.638540,
    dispatchRadiusKm: 35.0,
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    managerName: 'Baffour Gyan (Kronum Kumasi Shop Manager)',
    isPrimary: false
  }
];

export async function getShopLocationsFromDb(): Promise<DbShopLocation[]> {
  try {
    const list = await prisma.shopLocation.findMany({
      orderBy: { isPrimary: 'desc' }
    });
    if (list.length === 0 || list.length < DEFAULT_DOORMASTER_BRANCHES.length) {
      await seedAllBranches();
      const updatedList = await prisma.shopLocation.findMany({
        orderBy: { isPrimary: 'desc' }
      });
      return updatedList.map(formatShopLocationRow);
    }
    return list.map(formatShopLocationRow);
  } catch (err) {
    console.error('[JobsService] Failed fetching shop locations, returning static defaults:', err);
    return DEFAULT_DOORMASTER_BRANCHES.map(b => ({
      ...b,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
}

function formatShopLocationRow(l: any): DbShopLocation {
  return {
    id: l.id,
    shopName: l.shopName,
    branchCode: l.branchCode || 'DM-ACC-01',
    address: l.address,
    city: l.city || 'Accra',
    region: l.region || 'Greater Accra',
    phone: l.phone || '+233 24 555 0100',
    email: l.email || 'spintex.branch@doormaster.online',
    latitude: Number(l.latitude),
    longitude: Number(l.longitude),
    dispatchRadiusKm: Number(l.dispatchRadiusKm),
    operatingHours: l.operatingHours || 'Mon - Sat: 08:00 - 18:00',
    managerName: l.managerName || 'Kwame Mensah - Master Shop Manager',
    isPrimary: l.isPrimary,
    createdAt: l.createdAt ? l.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: l.updatedAt ? l.updatedAt.toISOString() : new Date().toISOString()
  };
}

export async function getPrimaryShopLocationFromDb(): Promise<DbShopLocation> {
  try {
    let loc = await prisma.shopLocation.findFirst({
      where: { isPrimary: true }
    });
    if (!loc) {
      loc = await prisma.shopLocation.findFirst();
    }
    if (!loc) {
      await seedAllBranches();
      loc = await prisma.shopLocation.findFirst({ where: { isPrimary: true } });
    }
    if (loc) {
      return formatShopLocationRow(loc);
    }
    const defaultPrimary = DEFAULT_DOORMASTER_BRANCHES[0];
    return {
      ...defaultPrimary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (err) {
    console.error('[JobsService] Failed getting primary shop location:', err);
    const defaultPrimary = DEFAULT_DOORMASTER_BRANCHES[0];
    return {
      ...defaultPrimary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

export async function seedAllBranches(): Promise<void> {
  for (const b of DEFAULT_DOORMASTER_BRANCHES) {
    try {
      await prisma.shopLocation.upsert({
        where: { id: b.id },
        update: {
          shopName: b.shopName,
          branchCode: b.branchCode,
          address: b.address,
          city: b.city,
          region: b.region,
          phone: b.phone,
          email: b.email,
          latitude: b.latitude,
          longitude: b.longitude,
          dispatchRadiusKm: b.dispatchRadiusKm,
          operatingHours: b.operatingHours,
          managerName: b.managerName,
          isPrimary: b.isPrimary
        },
        create: {
          id: b.id,
          shopName: b.shopName,
          branchCode: b.branchCode,
          address: b.address,
          city: b.city,
          region: b.region,
          phone: b.phone,
          email: b.email,
          latitude: b.latitude,
          longitude: b.longitude,
          dispatchRadiusKm: b.dispatchRadiusKm,
          operatingHours: b.operatingHours,
          managerName: b.managerName,
          isPrimary: b.isPrimary ?? false
        }
      });
    } catch (err) {
      console.warn(`[JobsService] Could not upsert branch ${b.shopName}:`, (err as Error).message);
    }
  }
  console.log(`[JobsService] Seeded/verified all ${DEFAULT_DOORMASTER_BRANCHES.length} DoorMaster branch locations.`);
}

async function seedDefaultShopLocation(): Promise<DbShopLocation> {
  await seedAllBranches();
  return getPrimaryShopLocationFromDb();
}

export async function saveShopLocationToDb(data: Partial<DbShopLocation>): Promise<DbShopLocation | null> {
  try {
    const id = data.id || 'shop_loc_main';
    const existing = await prisma.shopLocation.findUnique({ where: { id } });

    let saved;
    if (existing) {
      saved = await prisma.shopLocation.update({
        where: { id },
        data: {
          shopName: data.shopName ?? existing.shopName,
          branchCode: data.branchCode ?? existing.branchCode,
          address: data.address ?? existing.address,
          city: data.city ?? existing.city,
          region: data.region ?? existing.region,
          phone: data.phone ?? existing.phone,
          email: data.email ?? existing.email,
          latitude: data.latitude !== undefined ? data.latitude : existing.latitude,
          longitude: data.longitude !== undefined ? data.longitude : existing.longitude,
          dispatchRadiusKm: data.dispatchRadiusKm !== undefined ? data.dispatchRadiusKm : existing.dispatchRadiusKm,
          operatingHours: data.operatingHours ?? existing.operatingHours,
          managerName: data.managerName ?? existing.managerName,
          isPrimary: data.isPrimary !== undefined ? data.isPrimary : existing.isPrimary
        }
      });
    } else {
      saved = await prisma.shopLocation.create({
        data: {
          id,
          shopName: data.shopName || 'DoorMaster Flagship Workshop - Atelier A',
          branchCode: data.branchCode || 'DM-ACC-01',
          address: data.address || 'Plot 48, Spintex Road Industrial Area, Accra, Ghana',
          city: data.city || 'Accra',
          region: data.region || 'Greater Accra',
          phone: data.phone || '+233 24 555 0100',
          email: data.email || 'spintex.branch@doormaster.online',
          latitude: data.latitude !== undefined ? data.latitude : 5.6231,
          longitude: data.longitude !== undefined ? data.longitude : -0.1582,
          dispatchRadiusKm: data.dispatchRadiusKm !== undefined ? data.dispatchRadiusKm : 25.0,
          operatingHours: data.operatingHours || 'Mon - Sat: 08:00 - 18:00',
          managerName: data.managerName || 'Kwame Mensah - Master Shop Manager',
          isPrimary: data.isPrimary !== undefined ? data.isPrimary : true
        }
      });
    }

    return {
      id: saved.id,
      shopName: saved.shopName,
      branchCode: saved.branchCode || 'DM-ACC-01',
      address: saved.address,
      city: saved.city || 'Accra',
      region: saved.region || 'Greater Accra',
      phone: saved.phone || '+233 24 555 0100',
      email: saved.email || 'spintex.branch@doormaster.online',
      latitude: Number(saved.latitude),
      longitude: Number(saved.longitude),
      dispatchRadiusKm: Number(saved.dispatchRadiusKm),
      operatingHours: saved.operatingHours || 'Mon - Sat: 08:00 - 18:00',
      managerName: saved.managerName || 'Kwame Mensah - Master Shop Manager',
      isPrimary: saved.isPrimary,
      createdAt: saved.createdAt.toISOString(),
      updatedAt: saved.updatedAt.toISOString()
    };
  } catch (err) {
    console.error('[JobsService] Failed saving shop location via Prisma:', err);
    return null;
  }
}


/**
 * ============================================================================
 * LIVE LOCATION TRACKING (Real-time GPS for signed-in users)
 * ============================================================================
 */

export interface DbLiveLocation {
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

/**
 * Upsert a user's live GPS position (called by the mobile/web client via
 * navigator.geolocation.watchPosition).
 */
export async function upsertLiveLocation(data: {
  userId: string;
  userName?: string;
  role: string;
  jobId?: string;
  latitude: number;
  longitude: number;
  accuracyM?: number | null;
  heading?: number | null;
  speedKmh?: number | null;
  status?: string;
}): Promise<DbLiveLocation | null> {
  try {
    const saved = await prisma.liveLocation.upsert({
      where: { userId: data.userId },
      update: {
        userName: data.userName,
        role: data.role,
        jobId: data.jobId,
        latitude: data.latitude,
        longitude: data.longitude,
        accuracyM: data.accuracyM ?? null,
        heading: data.heading ?? null,
        speedKmh: data.speedKmh ?? null,
        status: data.status || 'online',
        updatedAt: new Date()
      },
      create: {
        id: `LOC-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        userId: data.userId,
        userName: data.userName,
        role: data.role,
        jobId: data.jobId,
        latitude: data.latitude,
        longitude: data.longitude,
        accuracyM: data.accuracyM ?? null,
        heading: data.heading ?? null,
        speedKmh: data.speedKmh ?? null,
        status: data.status || 'online'
      }
    });

    return {
      id: saved.id,
      userId: saved.userId,
      userName: saved.userName,
      role: saved.role,
      jobId: saved.jobId,
      latitude: Number(saved.latitude),
      longitude: Number(saved.longitude),
      accuracyM: saved.accuracyM ? Number(saved.accuracyM) : null,
      heading: saved.heading ? Number(saved.heading) : null,
      speedKmh: saved.speedKmh ? Number(saved.speedKmh) : null,
      status: saved.status,
      updatedAt: saved.updatedAt.toISOString(),
      createdAt: saved.createdAt.toISOString()
    };
  } catch (err) {
    console.error('[JobsService] Failed upserting live location:', err);
    return null;
  }
}

/**
 * Get all live locations (for dispatchers/managers viewing the fleet map).
 */
export async function getAllLiveLocations(): Promise<DbLiveLocation[]> {
  try {
    const rows = await prisma.liveLocation.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    return rows.map(r => ({
      id: r.id,
      userId: r.userId,
      userName: r.userName,
      role: r.role,
      jobId: r.jobId,
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      accuracyM: r.accuracyM ? Number(r.accuracyM) : null,
      heading: r.heading ? Number(r.heading) : null,
      speedKmh: r.speedKmh ? Number(r.speedKmh) : null,
      status: r.status,
      updatedAt: r.updatedAt.toISOString(),
      createdAt: r.createdAt.toISOString()
    }));
  } catch (err) {
    console.error('[JobsService] Failed fetching live locations:', err);
    return [];
  }
}

/**
 * Get a single user's live location.
 */
export async function getLiveLocationByUserId(userId: string): Promise<DbLiveLocation | null> {
  try {
    const row = await prisma.liveLocation.findUnique({ where: { userId } });
    if (!row) return null;
    return {
      id: row.id,
      userId: row.userId,
      userName: row.userName,
      role: row.role,
      jobId: row.jobId,
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      accuracyM: row.accuracyM ? Number(row.accuracyM) : null,
      heading: row.heading ? Number(row.heading) : null,
      speedKmh: row.speedKmh ? Number(row.speedKmh) : null,
      status: row.status,
      updatedAt: row.updatedAt.toISOString(),
      createdAt: row.createdAt.toISOString()
    };
  } catch (err) {
    console.error('[JobsService] Failed fetching live location:', err);
    return null;
  }
}

/**
 * Mark a user's location as offline (e.g. on sign-out).
 */
export async function setLiveLocationOffline(userId: string): Promise<boolean> {
  try {
    await prisma.liveLocation.update({
      where: { userId },
      data: { status: 'offline', updatedAt: new Date() }
    });
    return true;
  } catch {
    return false;
  }
}
