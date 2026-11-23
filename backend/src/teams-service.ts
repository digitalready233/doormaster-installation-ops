import prisma from './prisma';

export interface TeamMemberDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'lead' | 'assistant';
  position: string;
  avatar?: string;
  avgRating: number;
  teamId: string;
  teamName: string;
  isTeamLead: boolean;
  status: string;
}

export interface InstallationTeamDto {
  id: string;
  name: string;
  code: string;
  description: string;
  specialties: string[];
  positions: string[];
  color: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  leadAvatarUrl?: string;
  memberIds: string[];
  members: TeamMemberDto[];
  status: 'available' | 'on_site' | 'off_duty' | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleDefinitionDto {
  id: string;
  name: string;
  label: string;
  description: string;
  isSystem: boolean;
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
  extraFeatures: string[];
}

export const DEFAULT_TEAM_POSITIONS: string[] = [
  'Team Lead',
  'Lead Master Installer',
  'Senior Acoustic Installer',
  'Smart Lock Specialist',
  'Pivot & Frameless Glass Installer',
  'Grand Villa Steel Installer',
  'Precision Joiner Installer',
  'Assistant Installer',
];

const DEFAULT_SYSTEM_ROLES: RoleDefinitionDto[] = [
  {
    id: 'admin',
    name: 'System Administrator',
    label: 'Admin',
    description:
      'Super-user control: all resources, user authorization, role governance, system settings, and full operational capabilities.',
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
      canManageRoles: true,
    },
    extraFeatures: [
      'export_reports',
      'audit_logs',
      'sms_gateway',
      'branch_registry',
      'catalog_scraper',
      'fleet_broadcast',
      'quality_override',
      'multi_branch',
    ],
  },
  {
    id: 'manager',
    name: 'Manager',
    label: 'Manager',
    description:
      'Operations oversight: job dispatch, installer assignments, bonus threshold management & approvals.',
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
      canManageRoles: false,
    },
    extraFeatures: [
      'export_reports',
      'branch_registry',
      'catalog_scraper',
      'fleet_broadcast',
      'quality_override',
      'multi_branch',
    ],
  },
  {
    id: 'installer',
    name: 'Installer',
    label: 'Installer',
    description:
      'Site operations: view assigned door jobs, clock in/out on site, photo uploads & customer verification request.',
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
      canManageRoles: false,
    },
    extraFeatures: [],
  },
  {
    id: 'client',
    name: 'Client / Site Owner',
    label: 'Client',
    description:
      'Homeowner or site manager: track installation progress, view completed photos, and provide digital sign-off.',
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
      canManageRoles: false,
    },
    extraFeatures: [],
  },
  {
    id: 'account_officer',
    name: 'Accounts & Finance Officer',
    label: 'Account Officer',
    description:
      'Financial ledger: track door order values, installation fees, installer bonuses disbursement and invoices.',
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
      canManageRoles: false,
    },
    extraFeatures: ['export_reports', 'multi_branch'],
  },
  {
    id: 'shop_manager',
    name: 'Shop Attendant',
    label: 'Shop Attendant',
    description:
      'Workshop branch: book counter door installations, record customer payments, select store drivers, and dispatch doors to installation site.',
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
      canManageRoles: false,
    },
    extraFeatures: ['branch_registry', 'catalog_scraper'],
  },
  {
    id: 'dispatcher',
    name: 'Driver',
    label: 'Driver',
    description:
      'Fleet logistics: verify cargo at shop, drive transport truck to customer site, deliver doors & locks, and handover to client/installer.',
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
      canManageRoles: false,
    },
    extraFeatures: ['fleet_broadcast', 'branch_registry'],
  },
];

function parseStringArray(val: unknown, fallback: string[] = []): string[] {
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        val = parsed;
      }
    } catch {
      // ignore JSON parse error
    }
  }
  if (Array.isArray(val)) {
    return Array.from(
      new Set(
        val
          .map((x) => (typeof x === 'string' ? x.trim() : ''))
          .filter((x) => x.length > 0)
      )
    );
  }
  return [...fallback];
}

function inferPositionFromName(name: string, isLead: boolean): string {
  const match = name.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    const cleaned = match[1].split('-')[0].trim();
    if (cleaned) return cleaned;
  }
  return isLead ? 'Team Lead' : 'Assistant Installer';
}

export async function seedTeamsAndRolesIfNeeded(): Promise<void> {
  // 1. Seed default Installation Teams if empty
  const existingTeamsCount = await prisma.installationTeam.count();
  if (existingTeamsCount === 0) {
    await prisma.installationTeam.createMany({
      data: [
        {
          id: 'team-alpha',
          name: 'Team Alpha - Precision Acoustics & Pivots',
          code: 'ALPHA',
          description:
            'Elite 3-person squad specialized in precision acoustic French doors, heavy pivot systems, and concealed hinges.',
          specialties: [
            'Acoustic French Doors',
            'Entrance Pivot Doors',
            'Master Architectural Alignment',
          ],
          positions: [
            'Lead Master Installer',
            'Senior Acoustic Installer',
            'Pivot & Frameless Glass Installer',
            'Assistant Installer',
          ],
          color: 'indigo',
          leadId: 'USR-INS-01',
          status: 'available',
        },
        {
          id: 'team-bravo',
          name: 'Team Bravo - Smart Lock & Heavy Entry Squad',
          code: 'BRAVO',
          description:
            'Elite 3-person heavy security squad specialized in biometric smart handle integration, armored villa doors, and rapid response.',
          specialties: [
            'Smart Lock Biometrics & RFID',
            'Grand Villa Steel Doors',
            'Multi-Point Deadbolts',
          ],
          positions: [
            'Smart Lock Specialist',
            'Grand Villa Steel Installer',
            'Precision Joiner Installer',
            'Assistant Installer',
          ],
          color: 'cyan',
          leadId: 'USR-INS-04',
          status: 'available',
        },
      ],
      skipDuplicates: true,
    });
  }

  // Link the 6 seed installers if they have no team assignment yet (only on initial migration)
  const seedMemberMap: {
    id: string;
    teamId: string;
    teamRole: 'lead' | 'assistant';
    teamPosition: string;
  }[] = [
    { id: 'USR-INS-01', teamId: 'team-alpha', teamRole: 'lead', teamPosition: 'Lead Master Tech' },
    { id: 'USR-INS-02', teamId: 'team-alpha', teamRole: 'assistant', teamPosition: 'Senior Acoustic Tech' },
    { id: 'USR-INS-03', teamId: 'team-alpha', teamRole: 'assistant', teamPosition: 'Pivot & Frameless Glass Tech' },
    { id: 'USR-INS-04', teamId: 'team-bravo', teamRole: 'lead', teamPosition: 'Smart Lock Specialist' },
    { id: 'USR-INS-05', teamId: 'team-bravo', teamRole: 'assistant', teamPosition: 'Grand Villa Steel Tech' },
    { id: 'USR-INS-06', teamId: 'team-bravo', teamRole: 'assistant', teamPosition: 'Precision Joiner Tech' },
  ];

  // Only backfill seed users if zero users currently have a teamId (so intentional removals stay respected)
  const assignedUsersCount = await prisma.user.count({
    where: { teamId: { not: null } },
  });

  if (assignedUsersCount === 0) {
    for (const item of seedMemberMap) {
      const targetExists = await prisma.installationTeam.findUnique({ where: { id: item.teamId } });
      if (!targetExists) continue;
      await prisma.user
        .updateMany({
          where: { id: item.id, teamId: null },
          data: {
            teamId: item.teamId,
            teamRole: item.teamRole,
            teamPosition: item.teamPosition,
          },
        })
        .catch(() => null);
    }
  }

  // 2. Seed default system Role Definitions if missing (and sync renamed Driver label)
  for (const sysRole of DEFAULT_SYSTEM_ROLES) {
    const existing = await prisma.roleConfig.findUnique({ where: { id: sysRole.id } });
    if (!existing) {
      await prisma.roleConfig.create({
        data: {
          id: sysRole.id,
          name: sysRole.name,
          label: sysRole.label,
          description: sysRole.description,
          isSystem: true,
          color: sysRole.color,
          icon: sysRole.icon,
          permissions: sysRole.permissions,
          extraFeatures: sysRole.extraFeatures,
        },
      });
    } else if (
      (sysRole.id === 'dispatcher' && (existing.label === 'Dispatcher' || existing.name.includes('Dispatcher'))) ||
      (sysRole.id === 'shop_manager' && (existing.label === 'Shop Manager' || existing.name.includes('Shop Manager'))) ||
      (sysRole.id === 'manager' && (existing.name.includes('Operations Manager') || existing.name.includes('Ops Director')))
    ) {
      await prisma.roleConfig.update({
        where: { id: sysRole.id },
        data: { name: sysRole.name, label: sysRole.label },
      });
    }
  }
}

export async function getTeamsWithMembers(): Promise<InstallationTeamDto[]> {
  const teamRows = await prisma.installationTeam.findMany({
    include: {
      lead: true,
      members: {
        where: {
          status: { notIn: ['rejected', 'deactivated'] },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  return teamRows.map((team) => {
    const rawMembers = team.members;
    const explicitLead =
      team.lead ||
      rawMembers.find((u) => u.id === team.leadId) ||
      rawMembers.find((u) => u.teamRole === 'lead') ||
      rawMembers[0] ||
      null;

    const orderedUsers = explicitLead
      ? [explicitLead, ...rawMembers.filter((u) => u.id !== explicitLead.id)]
      : rawMembers;

    const basePositions = parseStringArray(team.positions, DEFAULT_TEAM_POSITIONS);
    const memberPositions = orderedUsers
      .map((u) => (u.teamPosition || '').trim())
      .filter((p) => p.length > 0);
    const mergedPositions = Array.from(new Set([...basePositions, ...memberPositions]));

    const shortTeamName = team.name.includes(' - ')
      ? team.name.split(' - ')[0].trim()
      : team.name;

    const members: TeamMemberDto[] = orderedUsers.map((u, idx) => {
      const isLead = explicitLead ? u.id === explicitLead.id : idx === 0;
      const position =
        (u.teamPosition && u.teamPosition.trim()) ||
        inferPositionFromName(u.name, isLead);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || '+233 24 555 0100',
        role: isLead ? 'lead' : 'assistant',
        position,
        avatar: u.avatarUrl || undefined,
        avgRating: isLead ? 4.95 : 4.88,
        teamId: team.id,
        teamName: shortTeamName,
        isTeamLead: isLead,
        status: u.status || 'active',
      };
    });

    return {
      id: team.id,
      name: team.name,
      code: team.code,
      description:
        team.description ||
        `Dedicated DoorMaster field installation squad (${team.name}).`,
      specialties: parseStringArray(team.specialties, [
        'Architectural Door Fitting',
        'Smart Lock Calibration',
      ]),
      positions: mergedPositions,
      color: team.color || 'indigo',
      leadId: explicitLead ? explicitLead.id : team.leadId || '',
      leadName: explicitLead ? explicitLead.name : 'Unassigned Lead',
      leadPhone: explicitLead ? explicitLead.phone || '' : '',
      leadAvatarUrl: explicitLead?.avatarUrl || undefined,
      memberIds: members.map((m) => m.id),
      members,
      status: team.status || 'available',
      createdAt: team.createdAt.toISOString(),
      updatedAt: team.updatedAt.toISOString(),
    };
  });
}

async function rebalanceTeamLead(teamId: string): Promise<void> {
  const team = await prisma.installationTeam.findUnique({ where: { id: teamId } });
  if (!team) return;

  const activeMembers = await prisma.user.findMany({
    where: {
      teamId,
      status: { notIn: ['rejected', 'deactivated'] },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (activeMembers.length === 0) {
    if (team.leadId !== null) {
      await prisma.installationTeam.update({
        where: { id: teamId },
        data: { leadId: null },
      });
    }
    return;
  }

  const chosenLead =
    activeMembers.find((m) => m.id === team.leadId) ||
    activeMembers.find((m) => m.teamRole === 'lead') ||
    activeMembers[0];

  await prisma.installationTeam.update({
    where: { id: teamId },
    data: { leadId: chosenLead.id },
  });

  await Promise.all(
    activeMembers.map((m) => {
      const expectedRole = m.id === chosenLead.id ? 'lead' : 'assistant';
      if (m.teamRole !== expectedRole) {
        return prisma.user.update({
          where: { id: m.id },
          data: { teamRole: expectedRole },
        });
      }
      return Promise.resolve(null);
    })
  );
}

export async function createTeamInDb(input: {
  name: string;
  code?: string;
  description?: string;
  specialties?: string[];
  positions?: string[];
  color?: string;
  status?: string;
  members?: { userId: string; position?: string; teamRole?: 'lead' | 'assistant' }[];
}): Promise<{ success: boolean; message: string; team?: InstallationTeamDto; teams?: InstallationTeamDto[] }> {
  try {
    const cleanName = (input.name || '').trim();
    if (!cleanName) {
      return { success: false, message: 'Team name is required.' };
    }

    const rawCode = (
      input.code ||
      cleanName
        .replace(/^team\s+/i, '')
        .split(/[\s-]+/)[0] ||
      `SQD${Math.floor(100 + Math.random() * 900)}`
    )
      .toUpperCase()
      .replace(/[^A-Z0-9_]/g, '')
      .slice(0, 24);

    if (!rawCode) {
      return { success: false, message: 'A valid team code is required.' };
    }

    const codeConflict = await prisma.installationTeam.findUnique({
      where: { code: rawCode },
    });
    if (codeConflict) {
      return {
        success: false,
        message: `A team with code "${rawCode}" already exists (${codeConflict.name}).`,
      };
    }

    const slug = rawCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let id = `team-${slug}`;
    const existingById = await prisma.installationTeam.findUnique({ where: { id } });
    if (existingById) {
      id = `team-${slug}-${Date.now().toString(36).slice(-4)}`;
    }

    const initialMembers = Array.isArray(input.members) ? input.members : [];
    const customPositions = parseStringArray(input.positions, DEFAULT_TEAM_POSITIONS);
    for (const m of initialMembers) {
      if (m.position && m.position.trim() && !customPositions.includes(m.position.trim())) {
        customPositions.push(m.position.trim());
      }
    }

    const leadEntry =
      initialMembers.find((m) => m.teamRole === 'lead') || initialMembers[0] || null;

    await prisma.installationTeam.create({
      data: {
        id,
        name: cleanName,
        code: rawCode,
        description:
          (input.description || '').trim() ||
          `Dedicated DoorMaster field installation squad (${cleanName}).`,
        specialties: parseStringArray(input.specialties, [
          'Architectural Door Fitting',
          'Smart Lock Calibration',
        ]),
        positions: customPositions,
        color: input.color || 'emerald',
        leadId: leadEntry ? leadEntry.userId : null,
        status: input.status || 'available',
      },
    });

    const affectedPreviousTeams = new Set<string>();
    for (const m of initialMembers) {
      const existingUser = await prisma.user.findUnique({ where: { id: m.userId } });
      if (!existingUser) continue;
      if (existingUser.teamId && existingUser.teamId !== id) {
        affectedPreviousTeams.add(existingUser.teamId);
      }
      const isLead = leadEntry ? m.userId === leadEntry.userId : false;
      await prisma.user.update({
        where: { id: m.userId },
        data: {
          teamId: id,
          teamRole: isLead ? 'lead' : 'assistant',
          teamPosition:
            (m.position && m.position.trim()) ||
            existingUser.teamPosition ||
            (isLead ? 'Team Lead' : 'Assistant Installer'),
        },
      });
    }

    for (const prevTeamId of affectedPreviousTeams) {
      await rebalanceTeamLead(prevTeamId);
    }
    await rebalanceTeamLead(id);

    const teams = await getTeamsWithMembers();
    const createdTeam = teams.find((t) => t.id === id);

    return {
      success: true,
      message: `Team "${cleanName}" (${rawCode}) created successfully.`,
      team: createdTeam,
      teams,
    };
  } catch (err) {
    console.error('[TeamsService] Error creating team:', err);
    return {
      success: false,
      message: `Failed creating team: ${(err as Error).message}`,
    };
  }
}

export async function updateTeamInDb(
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
): Promise<{ success: boolean; message: string; team?: InstallationTeamDto; teams?: InstallationTeamDto[] }> {
  try {
    const existing = await prisma.installationTeam.findUnique({ where: { id: teamId } });
    if (!existing) {
      return { success: false, message: `Team "${teamId}" not found.` };
    }

    let nextCode = existing.code;
    if (input.code !== undefined && input.code.trim()) {
      const candidate = input.code
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9_]/g, '')
        .slice(0, 24);
      if (candidate && candidate !== existing.code) {
        const conflict = await prisma.installationTeam.findUnique({
          where: { code: candidate },
        });
        if (conflict && conflict.id !== teamId) {
          return {
            success: false,
            message: `Team code "${candidate}" is already used by ${conflict.name}.`,
          };
        }
        nextCode = candidate;
      }
    }

    await prisma.installationTeam.update({
      where: { id: teamId },
      data: {
        ...(input.name && input.name.trim() ? { name: input.name.trim() } : {}),
        code: nextCode,
        ...(input.description !== undefined ? { description: input.description.trim() } : {}),
        ...(input.specialties !== undefined
          ? { specialties: parseStringArray(input.specialties) }
          : {}),
        ...(input.positions !== undefined
          ? { positions: parseStringArray(input.positions) }
          : {}),
        ...(input.color ? { color: input.color } : {}),
        ...(input.status ? { status: input.status } : {}),
        ...(input.leadId !== undefined ? { leadId: input.leadId || null } : {}),
      },
    });

    if (input.leadId) {
      const leadUser = await prisma.user.findUnique({ where: { id: input.leadId } });
      if (leadUser) {
        const prevTeamId = leadUser.teamId;
        await prisma.user.updateMany({
          where: { teamId, id: { not: input.leadId } },
          data: { teamRole: 'assistant' },
        });
        await prisma.user.update({
          where: { id: input.leadId },
          data: {
            teamId,
            teamRole: 'lead',
            teamPosition: leadUser.teamPosition || 'Team Lead',
          },
        });
        if (prevTeamId && prevTeamId !== teamId) {
          await rebalanceTeamLead(prevTeamId);
        }
      }
    }

    await rebalanceTeamLead(teamId);

    const teams = await getTeamsWithMembers();
    const updatedTeam = teams.find((t) => t.id === teamId);

    return {
      success: true,
      message: `Team "${updatedTeam?.name || existing.name}" updated successfully.`,
      team: updatedTeam,
      teams,
    };
  } catch (err) {
    console.error('[TeamsService] Error updating team:', err);
    return {
      success: false,
      message: `Failed updating team: ${(err as Error).message}`,
    };
  }
}

export async function deleteTeamInDb(
  teamId: string
): Promise<{ success: boolean; message: string; teams?: InstallationTeamDto[] }> {
  try {
    const existing = await prisma.installationTeam.findUnique({ where: { id: teamId } });
    if (!existing) {
      return { success: false, message: `Team "${teamId}" not found.` };
    }

    await prisma.$transaction([
      prisma.user.updateMany({
        where: { teamId },
        data: {
          teamId: null,
          teamRole: null,
          teamPosition: null,
        },
      }),
      prisma.installationTeam.delete({
        where: { id: teamId },
      }),
    ]);

    const teams = await getTeamsWithMembers();
    return {
      success: true,
      message: `Team "${existing.name}" deleted and its members unassigned.`,
      teams,
    };
  } catch (err) {
    console.error('[TeamsService] Error deleting team:', err);
    return {
      success: false,
      message: `Failed deleting team: ${(err as Error).message}`,
    };
  }
}

export async function upsertTeamMemberInDb(
  teamId: string,
  payload: {
    userId: string;
    position?: string;
    teamRole?: 'lead' | 'assistant';
  }
): Promise<{ success: boolean; message: string; team?: InstallationTeamDto; teams?: InstallationTeamDto[] }> {
  try {
    const [team, user] = await Promise.all([
      prisma.installationTeam.findUnique({ where: { id: teamId } }),
      prisma.user.findUnique({ where: { id: payload.userId } }),
    ]);

    if (!team) {
      return { success: false, message: `Team "${teamId}" not found.` };
    }
    if (!user) {
      return { success: false, message: `User "${payload.userId}" not found.` };
    }

    const previousTeamId = user.teamId;
    const currentTeamMemberCount = await prisma.user.count({
      where: {
        teamId,
        id: { not: user.id },
        status: { notIn: ['rejected', 'deactivated'] },
      },
    });

    const makeLead = payload.teamRole === 'lead' || currentTeamMemberCount === 0 || !team.leadId;
    const cleanPosition =
      (payload.position && payload.position.trim()) ||
      user.teamPosition ||
      (makeLead ? 'Team Lead' : 'Assistant Installer');

    // Ensure custom position is added to the team's positions catalog
    const currentPositions = parseStringArray(team.positions, DEFAULT_TEAM_POSITIONS);
    if (!currentPositions.includes(cleanPosition)) {
      currentPositions.push(cleanPosition);
    }

    if (makeLead) {
      await prisma.user.updateMany({
        where: { teamId, id: { not: user.id } },
        data: { teamRole: 'assistant' },
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        teamId,
        teamRole: makeLead ? 'lead' : 'assistant',
        teamPosition: cleanPosition,
      },
    });

    await prisma.installationTeam.update({
      where: { id: teamId },
      data: {
        positions: currentPositions,
        ...(makeLead ? { leadId: user.id } : {}),
      },
    });

    if (previousTeamId && previousTeamId !== teamId) {
      await rebalanceTeamLead(previousTeamId);
    }
    await rebalanceTeamLead(teamId);

    const teams = await getTeamsWithMembers();
    const updatedTeam = teams.find((t) => t.id === teamId);

    return {
      success: true,
      message: `${user.name.split(' (')[0]} synced to ${team.name} as ${cleanPosition}${makeLead ? ' (Team Lead)' : ''}.`,
      team: updatedTeam,
      teams,
    };
  } catch (err) {
    console.error('[TeamsService] Error upserting team member:', err);
    return {
      success: false,
      message: `Failed updating team member: ${(err as Error).message}`,
    };
  }
}

export async function removeTeamMemberFromDb(
  teamId: string,
  userId: string
): Promise<{ success: boolean; message: string; team?: InstallationTeamDto; teams?: InstallationTeamDto[] }> {
  try {
    const [team, user] = await Promise.all([
      prisma.installationTeam.findUnique({ where: { id: teamId } }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!team) {
      return { success: false, message: `Team "${teamId}" not found.` };
    }
    if (!user) {
      return { success: false, message: `User "${userId}" not found.` };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        teamId: null,
        teamRole: null,
        teamPosition: null,
      },
    });

    await rebalanceTeamLead(teamId);

    const teams = await getTeamsWithMembers();
    const updatedTeam = teams.find((t) => t.id === teamId);

    return {
      success: true,
      message: `${user.name.split(' (')[0]} removed from ${team.name}.`,
      team: updatedTeam,
      teams,
    };
  } catch (err) {
    console.error('[TeamsService] Error removing team member:', err);
    return {
      success: false,
      message: `Failed removing member: ${(err as Error).message}`,
    };
  }
}

export async function syncUserTeamAssignment(
  userId: string,
  assignment: {
    teamId?: string | null;
    teamRole?: 'lead' | 'assistant' | string | null;
    teamPosition?: string | null;
  }
): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  if (assignment.teamId) {
    await upsertTeamMemberInDb(assignment.teamId, {
      userId,
      position: assignment.teamPosition || undefined,
      teamRole: assignment.teamRole === 'lead' ? 'lead' : 'assistant',
    });
  } else if (assignment.teamId === null && user.teamId) {
    await removeTeamMemberFromDb(user.teamId, userId);
  }
}

// ============================================================================
// ROLE DEFINITIONS DB SYNC
// ============================================================================

export async function getRolesFromDb(): Promise<RoleDefinitionDto[]> {
  const rows = await prisma.roleConfig.findMany({
    orderBy: { createdAt: 'asc' },
  });

  const sysMap = new Map<string, RoleDefinitionDto>(
    DEFAULT_SYSTEM_ROLES.map((r) => [r.id, { ...r }])
  );
  const customList: RoleDefinitionDto[] = [];

  for (const row of rows) {
    if (sysMap.has(row.id)) {
      const sys = sysMap.get(row.id)!;
      const perms = (row.permissions || {}) as Partial<RoleDefinitionDto['permissions']>;
      sysMap.set(row.id, {
        ...sys,
        name: row.name || sys.name,
        description: row.description || sys.description,
        permissions: {
          canCreateJobs: perms.canCreateJobs ?? sys.permissions.canCreateJobs,
          canAssignInstallers: perms.canAssignInstallers ?? sys.permissions.canAssignInstallers,
          canDispatchDoors: perms.canDispatchDoors ?? sys.permissions.canDispatchDoors,
          canClockInOut: perms.canClockInOut ?? sys.permissions.canClockInOut,
          canUploadPhotos: perms.canUploadPhotos ?? sys.permissions.canUploadPhotos,
          canSignVerification: perms.canSignVerification ?? sys.permissions.canSignVerification,
          canApproveBonuses: perms.canApproveBonuses ?? sys.permissions.canApproveBonuses,
          canViewFinancials: perms.canViewFinancials ?? sys.permissions.canViewFinancials,
          canManageRoles: perms.canManageRoles ?? sys.permissions.canManageRoles,
        },
        extraFeatures: parseStringArray(row.extraFeatures, sys.extraFeatures),
      });
    } else {
      const perms = (row.permissions || {}) as Partial<RoleDefinitionDto['permissions']>;
      customList.push({
        id: row.id,
        name: row.name,
        label: row.label,
        description: row.description || '',
        isSystem: false,
        color: row.color || 'violet',
        icon: row.icon || 'verified_user',
        permissions: {
          canCreateJobs: !!perms.canCreateJobs,
          canAssignInstallers: !!perms.canAssignInstallers,
          canDispatchDoors: !!perms.canDispatchDoors,
          canClockInOut: !!perms.canClockInOut,
          canUploadPhotos: !!perms.canUploadPhotos,
          canSignVerification: !!perms.canSignVerification,
          canApproveBonuses: !!perms.canApproveBonuses,
          canViewFinancials: !!perms.canViewFinancials,
          canManageRoles: !!perms.canManageRoles,
        },
        extraFeatures: parseStringArray(row.extraFeatures, []),
      });
    }
  }

  return [...Array.from(sysMap.values()), ...customList];
}

export async function upsertRoleInDb(
  roleDef: Partial<RoleDefinitionDto> & { id: string }
): Promise<{ success: boolean; message: string; roles: RoleDefinitionDto[] }> {
  const sys = DEFAULT_SYSTEM_ROLES.find((r) => r.id === roleDef.id);
  if (sys) {
    const updatedPerms = roleDef.permissions ? {
      ...sys.permissions,
      ...roleDef.permissions
    } : sys.permissions;

    await prisma.roleConfig.upsert({
      where: { id: sys.id },
      update: {
        name: roleDef.name || sys.name,
        description: roleDef.description ?? sys.description,
        permissions: updatedPerms,
        extraFeatures: parseStringArray(roleDef.extraFeatures, sys.extraFeatures),
      },
      create: {
        id: sys.id,
        name: roleDef.name || sys.name,
        label: sys.label,
        description: roleDef.description ?? sys.description,
        isSystem: true,
        color: sys.color,
        icon: sys.icon,
        permissions: updatedPerms,
        extraFeatures: parseStringArray(roleDef.extraFeatures, sys.extraFeatures),
      },
    });
  } else {
    const perms = roleDef.permissions || {
      canCreateJobs: false,
      canAssignInstallers: false,
      canDispatchDoors: false,
      canClockInOut: false,
      canUploadPhotos: true,
      canSignVerification: false,
      canApproveBonuses: false,
      canViewFinancials: false,
      canManageRoles: false,
    };
    await prisma.roleConfig.upsert({
      where: { id: roleDef.id },
      update: {
        name: roleDef.name || 'Custom Role',
        label: roleDef.label || 'Custom',
        description: roleDef.description || '',
        color: roleDef.color || 'violet',
        icon: roleDef.icon || 'verified_user',
        permissions: perms,
        extraFeatures: parseStringArray(roleDef.extraFeatures, []),
      },
      create: {
        id: roleDef.id,
        name: roleDef.name || 'Custom Role',
        label: roleDef.label || 'Custom',
        description: roleDef.description || '',
        isSystem: false,
        color: roleDef.color || 'violet',
        icon: roleDef.icon || 'verified_user',
        permissions: perms,
        extraFeatures: parseStringArray(roleDef.extraFeatures, []),
      },
    });
  }

  const roles = await getRolesFromDb();
  return {
    success: true,
    message: `Role "${roleDef.name || roleDef.id}" saved and synced across all users.`,
    roles,
  };
}

export async function deleteCustomRoleInDb(
  roleId: string
): Promise<{ success: boolean; message: string; roles: RoleDefinitionDto[] }> {
  const sys = DEFAULT_SYSTEM_ROLES.find((r) => r.id === roleId);
  if (sys) {
    return {
      success: false,
      message: 'Core system roles cannot be deleted.',
      roles: await getRolesFromDb(),
    };
  }

  await prisma.roleConfig.deleteMany({
    where: { id: roleId, isSystem: false },
  });

  const roles = await getRolesFromDb();
  return {
    success: true,
    message: 'Custom role deleted across the application.',
    roles,
  };
}

