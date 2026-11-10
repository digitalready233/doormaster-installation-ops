import prisma from './prisma';
import { Prisma } from '@prisma/client';

export interface DbInstallationJob {
  id: string;
  jobNumber: string;
  title?: string;
  clientId?: string;
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
  shopId?: string | null;
  shopBranchCode?: string | null;
  shopBranch?: string;
  createdByUserId?: string | null;
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
  installerAssignedAt?: string;
  installerDeadlineAt?: string;
  installerAutoAccepted?: boolean;
  installerRejectReason?: string;
  installerProposedSlot?: string;
  installerRespondedAt?: string;
  rejectedByInstallerName?: string;
  acceptedAt?: string;
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

function normalizeBranchSearchLabel(val?: string | null): string {
  return (val || '')
    .toLowerCase()
    .replace(/doormaster|branch|section|showroom|&|\(|\)|,|\./g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function resolveShopLocationReference(input: {
  shopId?: string | null;
  shopBranchCode?: string | null;
  shopBranch?: string | null;
  shopBooking?: any;
}): Promise<{ id: string; shopName: string; branchCode: string } | null> {
  const branches = await getShopLocationsFromDb().catch(() =>
    DEFAULT_DOORMASTER_BRANCHES.map(b => ({
      ...b,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  );

  const candidateId = (input.shopId || input.shopBooking?.shopId || '').toString().trim();
  if (candidateId) {
    const byId = branches.find(
      b => b.id.toLowerCase() === candidateId.toLowerCase() || (b.branchCode || '').toLowerCase() === candidateId.toLowerCase()
    );
    if (byId) {
      return { id: byId.id, shopName: byId.shopName, branchCode: byId.branchCode || 'DM-GH-HQ-SPX' };
    }
  }

  const candidateCode = (input.shopBranchCode || input.shopBooking?.branchCode || '').toString().trim().toLowerCase();
  if (candidateCode) {
    const byCode = branches.find(b => (b.branchCode || '').toLowerCase() === candidateCode);
    if (byCode) {
      return { id: byCode.id, shopName: byCode.shopName, branchCode: byCode.branchCode || 'DM-GH-HQ-SPX' };
    }
  }

  const rawNames = [input.shopBooking?.shopBranch, input.shopBranch].filter((v): v is string => !!v && !!v.trim());
  for (const raw of rawNames) {
    const norm = normalizeBranchSearchLabel(raw);
    if (norm) {
      const exact = branches.find(b => normalizeBranchSearchLabel(b.shopName) === norm);
      if (exact) {
        return { id: exact.id, shopName: exact.shopName, branchCode: exact.branchCode || 'DM-GH-HQ-SPX' };
      }
      const partials = branches.filter(b => {
        const bNorm = normalizeBranchSearchLabel(b.shopName);
        return bNorm && (norm.includes(bNorm) || bNorm.includes(norm));
      });
      if (partials.length === 1) {
        return { id: partials[0].id, shopName: partials[0].shopName, branchCode: partials[0].branchCode || 'DM-GH-HQ-SPX' };
      }
    }

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
      const primary = branches.find(b => b.isPrimary) || branches[0];
      if (primary) {
        return { id: primary.id, shopName: primary.shopName, branchCode: primary.branchCode || 'DM-GH-HQ-SPX' };
      }
    }
  }

  return null;
}

export async function backfillJobShopReferences(): Promise<void> {
  try {
    const jobsMissingShop = await prisma.installationJob.findMany({
      where: {
        OR: [{ shopId: null }, { shopId: '' }, { shopId: 'shop_loc_main' }]
      }
    });
    for (const row of jobsMissingShop) {
      const cleanShopId = row.shopId === 'shop_loc_main' ? null : row.shopId;
      const cleanBranchCode = row.shopBranchCode === 'DM-ACC-01' ? null : row.shopBranchCode;
      const cleanedBooking =
        row.shopBooking && typeof row.shopBooking === 'object' && !Array.isArray(row.shopBooking)
          ? {
              ...(row.shopBooking as Record<string, unknown>),
              shopId: (row.shopBooking as any).shopId === 'shop_loc_main' ? undefined : (row.shopBooking as any).shopId,
              branchCode: (row.shopBooking as any).branchCode === 'DM-ACC-01' ? undefined : (row.shopBooking as any).branchCode
            }
          : row.shopBooking;

      const resolved = await resolveShopLocationReference({
        shopId: cleanShopId,
        shopBranchCode: cleanBranchCode,
        shopBranch: row.shopBranch,
        shopBooking: cleanedBooking
      });
      if (resolved) {
        const updatedBooking =
          row.shopBooking && typeof row.shopBooking === 'object' && !Array.isArray(row.shopBooking)
            ? {
                ...(row.shopBooking as Record<string, unknown>),
                shopId: resolved.id,
                branchCode: resolved.branchCode,
                shopBranch: resolved.shopName
              }
            : row.shopBooking ?? Prisma.JsonNull;

        await prisma.installationJob.update({
          where: { id: row.id },
          data: {
            shopId: resolved.id,
            shopBranchCode: resolved.branchCode,
            shopBranch: resolved.shopName,
            shopBooking: updatedBooking
          }
        });
      }
    }
    if (jobsMissingShop.length > 0) {
      console.log(`[JobsService] Backfilled shop_id references on ${jobsMissingShop.length} installation job(s).`);
    }
  } catch (err) {
    console.warn('[JobsService] Backfill shop references notice:', (err as Error).message);
  }
}

/**
 * Fetch all installation jobs using Prisma (optionally filtered by shopId)
 */
export async function getJobsFromDb(filterShopId?: string): Promise<DbInstallationJob[]> {
  try {
    const rows = await prisma.installationJob.findMany({
      ...(filterShopId ? { where: { shopId: filterShopId } } : {}),
      include: {
        clientRel: true,
        door: true,
        shop: true,
        assignedInstaller: true,
        assignedDriver: true,
        createdByUser: true,
      },
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

      // 10-Minute Installer Auto-Acceptance & Deadline Sync Check:
      const assignedInstallers = Array.isArray(r.assignedInstallers) ? (r.assignedInstallers as any[]) : [];
      const rawShopBooking = (r.shopBooking && typeof r.shopBooking === 'object' && !Array.isArray(r.shopBooking))
        ? (r.shopBooking as Record<string, any>)
        : {};
      const installerMeta: Record<string, any> = {
        ...(rawShopBooking.installerMeta || {})
      };

      let instAssignedAt: string | undefined =
        (r as any).installerAssignedAt ||
        installerMeta.installerAssignedAt ||
        assignedInstallers[0]?.assignedAt ||
        undefined;
      let instDeadlineStr: string | undefined =
        (r as any).installerDeadlineAt ||
        installerMeta.installerDeadlineAt ||
        assignedInstallers[0]?.deadlineAt ||
        undefined;

      // Backfill 10-minute deadline if a job has an assigned installer in 'pending' state without a deadline yet
      if (r.assignedInstallerId && r.installerAssignmentStatus === 'pending' && !instDeadlineStr) {
        instAssignedAt = now.toISOString();
        instDeadlineStr = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
        installerMeta.installerAssignedAt = instAssignedAt;
        installerMeta.installerDeadlineAt = instDeadlineStr;
        installerMeta.installerAutoAccepted = false;

        const updatedInstallers = assignedInstallers.map((inst: any) => ({
          ...inst,
          assignedAt: inst.assignedAt || instAssignedAt,
          deadlineAt: inst.deadlineAt || instDeadlineStr,
          status: inst.status || 'pending'
        }));
        const updatedBooking = {
          ...rawShopBooking,
          installerMeta
        };
        r.assignedInstallers = updatedInstallers as any;
        r.shopBooking = updatedBooking as any;

        prisma.installationJob.update({
          where: { id: r.id },
          data: {
            assignedInstallers: updatedInstallers,
            shopBooking: updatedBooking
          }
        }).catch(err => console.warn('[JobsService] Installer deadline backfill failed for job:', r.id, err));
      }

      const instDeadline = instDeadlineStr ? new Date(instDeadlineStr) : null;
      const hasExpiredPendingMember = assignedInstallers.some((inst: any) => {
        if (inst.status === 'accepted' || inst.status === 'rejected') return false;
        const dStr = inst.deadlineAt || instDeadlineStr;
        const d = dStr ? new Date(dStr) : null;
        return d ? d.getTime() <= now.getTime() : false;
      }) || (r.installerAssignmentStatus === 'pending' && instDeadline && instDeadline.getTime() <= now.getTime());

      if (r.assignedInstallerId && hasExpiredPendingMember) {
        const respondedAtIso = now.toISOString();
        installerMeta.installerAutoAccepted = true;
        installerMeta.installerRespondedAt = respondedAtIso;
        installerMeta.acceptedAt = respondedAtIso;

        const updatedInstallers = assignedInstallers.map((inst: any) => {
          if (inst.status === 'accepted' || inst.status === 'rejected') {
            return inst;
          }
          const dStr = inst.deadlineAt || instDeadlineStr;
          const d = dStr ? new Date(dStr) : instDeadline;
          if (d && d.getTime() <= now.getTime()) {
            return {
              ...inst,
              assignedAt: inst.assignedAt || instAssignedAt,
              deadlineAt: inst.deadlineAt || instDeadlineStr,
              status: 'accepted',
              respondedAt: respondedAtIso,
              autoAccepted: true
            };
          }
          return inst;
        });

        const anyPending = updatedInstallers.some((inst: any) => !inst.status || inst.status === 'pending');
        r.installerAssignmentStatus = anyPending ? 'pending' : 'accepted';
        if (!anyPending && (r.status === 'booked_at_shop' || r.status === 'assigned')) {
          r.status = 'accepted';
        }

        const updatedBooking = {
          ...rawShopBooking,
          installerMeta
        };
        r.assignedInstallers = updatedInstallers as any;
        r.shopBooking = updatedBooking as any;

        prisma.installationJob.update({
          where: { id: r.id },
          data: {
            status: r.status,
            installerAssignmentStatus: r.installerAssignmentStatus,
            assignedInstallers: updatedInstallers,
            shopBooking: updatedBooking
          }
        }).catch(err => console.warn('[JobsService] Installer auto-accept update failed for job:', r.id, err));
      }
    }

    return rows.map((r) => {
      const assignedInstallers = Array.isArray(r.assignedInstallers) ? (r.assignedInstallers as any[]) : undefined;
      const installerMeta = (r.shopBooking as any)?.installerMeta || {};
      const clientRel = r.clientRel;
      const doorRel = r.door;
      const shopRel = r.shop;
      const installerRel = r.assignedInstaller;
      const driverRel = r.assignedDriver;

      const clientObj = clientRel
        ? {
            id: clientRel.id,
            name: clientRel.name,
            phone: clientRel.phone,
            email: clientRel.email || '',
            siteAddress: clientRel.siteAddress,
            accessInstructions: clientRel.accessInstructions || undefined,
            coordinates: {
              lat: Number(clientRel.lat),
              lng: Number(clientRel.lng),
            },
          }
        : (r.client as any) || undefined;

      return {
        id: r.id,
        jobNumber: r.jobNumber,
        title: r.title || `${doorRel?.name || r.doorName} - ${clientRel?.name || r.clientName}`,
        clientId: r.clientId || clientRel?.id || undefined,
        clientName: clientRel?.name || r.clientName,
        clientPhone: clientRel?.phone || r.clientPhone,
        clientEmail: (clientRel?.email !== undefined ? clientRel.email : r.clientEmail) || '',
        address: clientRel?.siteAddress || r.address,
        lat: Number(clientRel ? clientRel.lat : r.lat),
        lng: Number(clientRel ? clientRel.lng : r.lng),
        doorId: r.doorId || doorRel?.id || undefined,
        doorName: doorRel?.name || r.doorName,
        doorCategory: doorRel?.category || r.doorCategory || 'General Doors',
        doorModelCode: doorRel?.modelCode || r.doorModelCode || '',
        doorDimensions: doorRel?.dimensions || r.doorDimensions || '2100 × 900 × 50mm',
        finish: doorRel?.finish || r.finish || '',
        hardwareSpecs: doorRel?.hardwareSpecs || r.hardwareSpecs || '',
        lockModel: r.lockModel || 'DoorMaster Smart Lock',
        shopId: r.shopId || shopRel?.id || (r.shopBooking as any)?.shopId || null,
        shopBranchCode: r.shopBranchCode || shopRel?.branchCode || (r.shopBooking as any)?.branchCode || null,
        shopBranch: shopRel?.shopName || r.shopBranch || 'Accra Flagship Showroom',
        createdByUserId: r.createdByUserId || null,
        depositAmount: Number(r.depositAmount),
        balanceDue: Number(r.balanceDue),
        status: r.status,
        assignedDriverId: r.assignedDriverId || driverRel?.id || null,
        assignedDriverName: driverRel?.name || r.assignedDriverName || undefined,
        driverAssignmentStatus: r.driverAssignmentStatus || 'pending',
        assignedInstallerId: r.assignedInstallerId || installerRel?.id || null,
        assignedInstallerName: installerRel?.name || r.assignedInstallerName || undefined,
        assignedInstallerIds: (r.assignedInstallerIds as any) || undefined,
        assignedInstallerNames: (r.assignedInstallerNames as any) || undefined,
        assignedInstallers,
        installerAssignmentStatus: r.installerAssignmentStatus || 'pending',
        installerAssignedAt: installerMeta.installerAssignedAt || assignedInstallers?.[0]?.assignedAt || undefined,
        installerDeadlineAt: installerMeta.installerDeadlineAt || assignedInstallers?.[0]?.deadlineAt || undefined,
        installerAutoAccepted: installerMeta.installerAutoAccepted ?? assignedInstallers?.[0]?.autoAccepted ?? false,
        installerRejectReason: installerMeta.installerRejectReason || undefined,
        installerProposedSlot: installerMeta.installerProposedSlot || undefined,
        installerRespondedAt: installerMeta.installerRespondedAt || assignedInstallers?.[0]?.respondedAt || undefined,
        rejectedByInstallerName: installerMeta.rejectedByInstallerName || undefined,
        acceptedAt: installerMeta.acceptedAt || undefined,
        operationsApproved: r.operationsApproved,
        scheduledTime: r.scheduledTime || 'Today, 2:00 PM',
        notes: r.notes || '',

        // JSON columns
        doors: r.doors || undefined,
        client: clientObj,
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
      };
    });
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

    const existingJob = await prisma.installationJob.findUnique({ where: { id } });

    const resolvedShop = await resolveShopLocationReference({
      shopId: existingJob?.shopId || job.shopId,
      shopBranchCode: existingJob?.shopBranchCode || job.shopBranchCode,
      shopBranch: existingJob?.shopBranch || job.shopBranch,
      shopBooking: job.shopBooking ?? existingJob?.shopBooking
    });

    const effectiveShopId = existingJob?.shopId || resolvedShop?.id || job.shopId || 'dm-branch-central';
    const effectiveBranchCode = existingJob?.shopBranchCode || resolvedShop?.branchCode || job.shopBranchCode || (job.shopBooking as any)?.branchCode || 'DM-GH-HQ-SPX';
    const effectiveShopBranch = (existingJob?.shopId ? existingJob.shopBranch : null) || resolvedShop?.shopName || job.shopBranch || existingJob?.shopBranch || 'DoorMaster Central Showroom & Atelier';
    const effectiveCreatedByUserId = existingJob?.createdByUserId || job.createdByUserId || null;

    const existingMeta = ((existingJob?.shopBooking as any)?.installerMeta) || {};
    const incomingMeta = ((job.shopBooking as any)?.installerMeta) || {};
    const firstInstaller = Array.isArray(job.assignedInstallers) ? job.assignedInstallers[0] : undefined;

    const mergedInstallerMeta: Record<string, any> = {
      ...existingMeta,
      ...incomingMeta,
      ...(job.installerAssignedAt !== undefined ? { installerAssignedAt: job.installerAssignedAt } : (firstInstaller?.assignedAt ? { installerAssignedAt: firstInstaller.assignedAt } : {})),
      ...(job.installerDeadlineAt !== undefined ? { installerDeadlineAt: job.installerDeadlineAt } : (firstInstaller?.deadlineAt ? { installerDeadlineAt: firstInstaller.deadlineAt } : {})),
      ...(job.installerAutoAccepted !== undefined ? { installerAutoAccepted: job.installerAutoAccepted } : {}),
      ...(job.installerRejectReason !== undefined ? { installerRejectReason: job.installerRejectReason } : {}),
      ...(job.installerProposedSlot !== undefined ? { installerProposedSlot: job.installerProposedSlot } : {}),
      ...(job.installerRespondedAt !== undefined ? { installerRespondedAt: job.installerRespondedAt } : {}),
      ...(job.rejectedByInstallerName !== undefined ? { rejectedByInstallerName: job.rejectedByInstallerName } : {}),
      ...(job.acceptedAt !== undefined ? { acceptedAt: job.acceptedAt } : {}),
    };

    // If an installer is newly assigned in 'pending' state and no deadline was provided, set 10-minute deadline automatically
    if (job.assignedInstallerId && (job.installerAssignmentStatus === 'pending' || !job.installerAssignmentStatus)) {
      if (!mergedInstallerMeta.installerAssignedAt) {
        mergedInstallerMeta.installerAssignedAt = new Date().toISOString();
      }
      if (!mergedInstallerMeta.installerDeadlineAt) {
        mergedInstallerMeta.installerDeadlineAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      }
    }

    const enrichedAssignedInstallers = Array.isArray(job.assignedInstallers)
      ? job.assignedInstallers.map((inst: any) => ({
          ...inst,
          assignedAt: inst.assignedAt || mergedInstallerMeta.installerAssignedAt,
          deadlineAt: inst.deadlineAt || mergedInstallerMeta.installerDeadlineAt,
          status: inst.status || job.installerAssignmentStatus || 'pending'
        }))
      : job.assignedInstallers;

    const baseBooking =
      job.shopBooking && typeof job.shopBooking === 'object'
        ? job.shopBooking
        : (existingJob?.shopBooking && typeof existingJob.shopBooking === 'object' ? existingJob.shopBooking : {});

    const enrichedShopBooking = {
      ...(baseBooking as Record<string, any>),
      shopId: effectiveShopId,
      branchCode: (baseBooking as any).branchCode || effectiveBranchCode,
      shopBranch: (baseBooking as any).shopBranch || effectiveShopBranch,
      installerMeta: mergedInstallerMeta
    };

    // Resolve / normalize client in `clients` table to eliminate data redundancy
    const rawClient = job.client && typeof job.client === 'object' && !Array.isArray(job.client) ? (job.client as Record<string, any>) : {};
    const clientName = (job.clientName || rawClient.name || existingJob?.clientName || 'Valued Client').trim();
    const clientPhone = (job.clientPhone || rawClient.phone || existingJob?.clientPhone || '+233 24 555 0100').trim();
    const clientEmail = (job.clientEmail || rawClient.email || existingJob?.clientEmail || '').trim();
    const clientAddress = (job.address || rawClient.siteAddress || existingJob?.address || 'Accra, Ghana').trim();
    const clientAccess = (rawClient.accessInstructions || '').trim();
    const clientLat = job.lat !== undefined ? Number(job.lat) : (rawClient.coordinates?.lat ?? (existingJob ? Number(existingJob.lat) : 5.6037));
    const clientLng = job.lng !== undefined ? Number(job.lng) : (rawClient.coordinates?.lng ?? (existingJob ? Number(existingJob.lng) : -0.1870));

    let effectiveClientId = existingJob?.clientId || job.clientId || rawClient.id;
    if (!effectiveClientId) {
      const cleanPhone = clientPhone.replace(/[^0-9]/g, '');
      effectiveClientId = cleanPhone ? `CLI-${cleanPhone}` : `CLI-${id}`;
    }

    try {
      await prisma.client.upsert({
        where: { id: effectiveClientId },
        update: {
          name: clientName,
          phone: clientPhone,
          ...(clientEmail ? { email: clientEmail } : {}),
          siteAddress: clientAddress,
          ...(clientAccess ? { accessInstructions: clientAccess } : {}),
          lat: new Prisma.Decimal(clientLat),
          lng: new Prisma.Decimal(clientLng),
        },
        create: {
          id: effectiveClientId,
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
          siteAddress: clientAddress,
          accessInstructions: clientAccess,
          lat: new Prisma.Decimal(clientLat),
          lng: new Prisma.Decimal(clientLng),
        }
      });
    } catch (clientErr) {
      console.warn('[JobsService] Client upsert notice:', (clientErr as Error).message);
    }

    const dataPayload: Prisma.InstallationJobUncheckedUpdateInput = {
      title: job.title || undefined,
      clientId: effectiveClientId,
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
      shopId: effectiveShopId,
      shopBranchCode: effectiveBranchCode,
      shopBranch: effectiveShopBranch,
      ...(effectiveCreatedByUserId ? { createdByUserId: effectiveCreatedByUserId } : {}),
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
      assignedInstallers: enrichedAssignedInstallers !== undefined ? (enrichedAssignedInstallers ?? Prisma.JsonNull) : undefined,
      installerAssignmentStatus: job.installerAssignmentStatus,
      operationsApproved: job.operationsApproved !== undefined ? Boolean(job.operationsApproved) : undefined,
      scheduledTime: job.scheduledTime,
      notes: job.notes,

      // JSON payload fields
      doors: job.doors !== undefined ? job.doors : undefined,
      client: job.client !== undefined ? job.client : undefined,
      shopBooking: enrichedShopBooking !== undefined ? enrichedShopBooking : undefined,
      technicianSiteFunds: job.technicianSiteFunds !== undefined ? job.technicianSiteFunds : undefined,
      logisticsTruck: job.logisticsTruck !== undefined ? job.logisticsTruck : undefined,
      clockSessions: job.clockSessions !== undefined ? job.clockSessions : undefined,
      hardwareChecklist: job.hardwareChecklist !== undefined ? job.hardwareChecklist : undefined,
      photos: job.photos !== undefined ? job.photos : undefined,
      customerSignoff: job.customerSignoff !== undefined ? job.customerSignoff : undefined,
      financials: job.financials !== undefined ? job.financials : undefined,
    };

    const createPayload: Prisma.InstallationJobUncheckedCreateInput = {
      id,
      jobNumber,
      title: job.title || `${job.doorName || 'Door Installation'} - ${job.clientName || 'Client'}`,
      clientId: effectiveClientId,
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
      shopId: effectiveShopId,
      shopBranchCode: effectiveBranchCode,
      shopBranch: effectiveShopBranch,
      createdByUserId: effectiveCreatedByUserId,
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
      assignedInstallers: enrichedAssignedInstallers !== undefined ? (enrichedAssignedInstallers ?? Prisma.JsonNull) : Prisma.JsonNull,
      installerAssignmentStatus: job.installerAssignmentStatus || 'pending',
      operationsApproved: Boolean(job.operationsApproved),
      scheduledTime: job.scheduledTime || 'Today, 2:00 PM',
      notes: job.notes || '',

      // JSON fields
      doors: job.doors || Prisma.JsonNull,
      client: job.client || Prisma.JsonNull,
      shopBooking: enrichedShopBooking || Prisma.JsonNull,
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

    const savedMeta = (saved.shopBooking as any)?.installerMeta || mergedInstallerMeta;
    const savedInstallers = Array.isArray(saved.assignedInstallers) ? (saved.assignedInstallers as any[]) : undefined;

    return {
      id: saved.id,
      jobNumber: saved.jobNumber,
      title: saved.title || undefined,
      clientId: saved.clientId || effectiveClientId,
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
      shopId: saved.shopId || null,
      shopBranchCode: saved.shopBranchCode || null,
      shopBranch: saved.shopBranch || undefined,
      createdByUserId: saved.createdByUserId || null,
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
      assignedInstallers: savedInstallers,
      installerAssignmentStatus: saved.installerAssignmentStatus || 'pending',
      installerAssignedAt: savedMeta.installerAssignedAt || savedInstallers?.[0]?.assignedAt || undefined,
      installerDeadlineAt: savedMeta.installerDeadlineAt || savedInstallers?.[0]?.deadlineAt || undefined,
      installerAutoAccepted: savedMeta.installerAutoAccepted ?? savedInstallers?.[0]?.autoAccepted ?? false,
      installerRejectReason: savedMeta.installerRejectReason || undefined,
      installerProposedSlot: savedMeta.installerProposedSlot || undefined,
      installerRespondedAt: savedMeta.installerRespondedAt || savedInstallers?.[0]?.respondedAt || undefined,
      rejectedByInstallerName: savedMeta.rejectedByInstallerName || undefined,
      acceptedAt: savedMeta.acceptedAt || undefined,
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

function normalizeRoleNotificationFields<
  T extends { recipientRole: string; title: string; message: string; actionLabel?: string | null }
>(n: T): T {
  if (n.recipientRole === 'manager') {
    let title = n.title || '';
    let message = n.message || '';
    let actionLabel = n.actionLabel ?? null;

    if (actionLabel && /assign\s+team|set\s*up\s*truck|select\s+installer/i.test(actionLabel)) {
      actionLabel = 'Select Team';
    } else if (actionLabel && /reassign\s+driver|select\s+dispatcher/i.test(actionLabel)) {
      actionLabel = null;
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

  if (n.recipientRole !== 'shop_manager') return n;

  let title = n.title || '';
  let message = n.message || '';
  let actionLabel = n.actionLabel ?? null;

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

export async function getNotificationsFromDb(role?: string, userId?: string): Promise<DbNotification[]> {
  try {
    const where: Prisma.NotificationWhereInput = {};
    if (role && role !== 'all') {
      where.OR = [
        { recipientRole: role },
        { recipientRole: 'all' }
      ];
    }
    if (userId) {
      where.recipientUserId = userId;
    }

    const rows = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 150
    });

    const seenKeys = new Set<string>();
    const deduplicated: DbNotification[] = [];

    for (const r of rows) {
      if (['client', 'installer', 'shop_manager'].includes(r.recipientRole) && r.type === 'bonus_awarded') {
        continue;
      }
      const norm = normalizeRoleNotificationFields({
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
      });

      const dedupKey = `${norm.recipientRole}|${norm.recipientUserId || ''}|${norm.jobId || ''}|${norm.type}|${norm.title}`;
      if (seenKeys.has(dedupKey)) {
        continue;
      }
      seenKeys.add(dedupKey);
      deduplicated.push(norm);
    }

    return deduplicated.slice(0, 100);
  } catch (err) {
    console.error('[JobsService] Failed fetching notifications via Prisma:', err);
    return [];
  }
}

export async function saveNotificationToDb(notif: Partial<DbNotification>): Promise<DbNotification | null> {
  try {
    const id = notif.id || `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const normalized = normalizeRoleNotificationFields({
      recipientRole: notif.recipientRole || 'all',
      title: notif.title || 'Notification',
      message: notif.message || '',
      actionLabel: notif.actionLabel || null
    });
    const jobId = notif.jobId || 'GENERAL';
    const recipientUserId = notif.recipientUserId || null;
    const notifType = notif.type || 'job_assigned';

    // Ensure uniqueness per recipient + job + event so installers never receive duplicate notifications
    if (jobId !== 'GENERAL') {
      await prisma.notification.deleteMany({
        where: {
          recipientRole: normalized.recipientRole,
          recipientUserId,
          jobId,
          OR: [
            { title: normalized.title },
            { type: notifType }
          ]
        }
      }).catch(() => {});
    }

    const saved = await prisma.notification.create({
      data: {
        id,
        recipientRole: normalized.recipientRole,
        recipientUserId,
        title: normalized.title,
        message: normalized.message,
        type: notifType,
        jobId,
        read: Boolean(notif.read),
        actionLabel: normalized.actionLabel
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
  try {
    await prisma.shopLocation.deleteMany({ where: { id: 'shop_loc_main' } });
  } catch {
    // ignore if not present
  }
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
    await prisma.liveLocation.updateMany({
      where: { userId },
      data: { status: 'offline', updatedAt: new Date() }
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalized Client entity with related jobs
 */
export interface DbClientWithJobs {
  id: string;
  name: string;
  phone: string;
  email: string;
  siteAddress: string;
  accessInstructions?: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  jobsCount: number;
  totalSpend: number;
  jobs: {
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

/**
 * Fetch all normalized clients joined with their related jobs (Zero data redundancy)
 */
export async function getClientsFromDb(): Promise<DbClientWithJobs[]> {
  try {
    const clients = await prisma.client.findMany({
      include: {
        jobs: {
          select: {
            id: true,
            jobNumber: true,
            doorName: true,
            status: true,
            depositAmount: true,
            balanceDue: true,
            scheduledTime: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return clients.map(c => {
      const totalSpend = c.jobs.reduce((sum, j) => sum + Number(j.depositAmount) + Number(j.balanceDue), 0);
      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email || '',
        siteAddress: c.siteAddress,
        accessInstructions: c.accessInstructions || undefined,
        lat: Number(c.lat),
        lng: Number(c.lng),
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
        jobsCount: c.jobs.length,
        totalSpend,
        jobs: c.jobs.map(j => ({
          id: j.id,
          jobNumber: j.jobNumber,
          doorName: j.doorName,
          status: j.status,
          depositAmount: Number(j.depositAmount),
          balanceDue: Number(j.balanceDue),
          scheduledTime: j.scheduledTime || undefined,
          createdAt: j.createdAt.toISOString()
        }))
      };
    });
  } catch (err) {
    console.error('[JobsService] Failed fetching clients with relations:', err);
    return [];
  }
}

/**
 * Fetch a single client by ID with their complete related job history
 */
export async function getClientByIdFromDb(clientId: string): Promise<DbClientWithJobs | null> {
  try {
    const c = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        jobs: {
          select: {
            id: true,
            jobNumber: true,
            doorName: true,
            status: true,
            depositAmount: true,
            balanceDue: true,
            scheduledTime: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!c) return null;

    const totalSpend = c.jobs.reduce((sum, j) => sum + Number(j.depositAmount) + Number(j.balanceDue), 0);
    return {
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email || '',
      siteAddress: c.siteAddress,
      accessInstructions: c.accessInstructions || undefined,
      lat: Number(c.lat),
      lng: Number(c.lng),
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      jobsCount: c.jobs.length,
      totalSpend,
      jobs: c.jobs.map(j => ({
        id: j.id,
        jobNumber: j.jobNumber,
        doorName: j.doorName,
        status: j.status,
        depositAmount: Number(j.depositAmount),
        balanceDue: Number(j.balanceDue),
        scheduledTime: j.scheduledTime || undefined,
        createdAt: j.createdAt.toISOString()
      }))
    };
  } catch (err) {
    console.error('[JobsService] Failed fetching client by id:', err);
    return null;
  }
}

/**
 * Fetch installation job by ID with full relational joins (client, door, shop, technician, driver, sessions)
 */
export async function getJobByIdWithRelations(id: string) {
  try {
    const r = await prisma.installationJob.findUnique({
      where: { id },
      include: {
        clientRel: true,
        door: true,
        shop: true,
        assignedInstaller: {
          select: { id: true, name: true, phone: true, role: true, avatarUrl: true, status: true, teamId: true }
        },
        assignedDriver: {
          select: { id: true, name: true, phone: true, role: true, avatarUrl: true, status: true }
        },
        createdByUser: {
          select: { id: true, name: true, role: true, email: true }
        },
        trackSessions: true,
        dispatchTrackings: true,
        customerSignoffRecord: true,
        notifications: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!r) return null;

    return {
      ...r,
      lat: Number(r.lat),
      lng: Number(r.lng),
      depositAmount: Number(r.depositAmount),
      balanceDue: Number(r.balanceDue),
      client: r.clientRel ? {
        id: r.clientRel.id,
        name: r.clientRel.name,
        phone: r.clientRel.phone,
        email: r.clientRel.email || '',
        siteAddress: r.clientRel.siteAddress,
        accessInstructions: r.clientRel.accessInstructions || undefined,
        coordinates: {
          lat: Number(r.clientRel.lat),
          lng: Number(r.clientRel.lng)
        }
      } : r.client
    };
  } catch (err) {
    console.error('[JobsService] Failed fetching job with relations:', err);
    return null;
  }
}

export async function deleteJobFromDb(id: string): Promise<boolean> {
  try {
    await prisma.installationJob.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    console.warn(`[JobsService] Could not delete job ${id}:`, error);
    return false;
  }
}

