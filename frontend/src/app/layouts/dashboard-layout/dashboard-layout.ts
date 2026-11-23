import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { PwaService } from '../../services/pwa.service';
import { JobDetailModal } from '../../components/job-detail-modal/job-detail-modal';
import { NewJobModal } from '../../components/new-job-modal/new-job-modal';
import { BonusModal } from '../../components/bonus-modal/bonus-modal';
import { CustomRoleModal } from '../../components/custom-role-modal/custom-role-modal';
import { AddUserModal } from '../../components/add-user-modal/add-user-modal';
import { NotificationDrawer } from '../../components/notification-drawer/notification-drawer';
import { RejectionModal } from '../../components/rejection-modal/rejection-modal';
import { PwaInstallButton } from '../../components/pwa-install-button/pwa-install-button';
import { AlertService } from '../../services/alert.service';
import { InstallationJob, InstallerTeam, NotificationItem, RoleDefinition, RoleType } from '../../models/installation.model';

export type ActiveView =
  | 'overview'
  | 'doors'
  | 'work'
  | 'shop'
  | 'map'
  | 'performance'
  | 'finance'
  | 'roles'
  | 'settings'
  | 'profile'
export interface MenuItemConfig {
  id: ActiveView;
  label: string;
  icon: string;
  iconColor: string;
  activeColor: string;
  category: 'field' | 'finance' | 'governance';
  badgeType?: 'live' | 'ping' | 'eta' | 'count' | 'currency' | 'ledger';
  description: string;
}

export interface MenuSection {
  id: 'field' | 'finance' | 'governance';
  title: string;
  items: MenuItemConfig[];
}

@Component({
  selector: 'app-dashboard-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatIconModule,
    JobDetailModal,
    NewJobModal,
    BonusModal,
    CustomRoleModal,
    AddUserModal,
    NotificationDrawer,
    RejectionModal,
    PwaInstallButton
  ],
  templateUrl: './dashboard-layout.html'
})
export class DashboardLayout implements OnDestroy {
  readonly store = inject(InstallationStore);
  readonly themeStore = inject(ThemeStore);
  readonly pwa = inject(PwaService);
  readonly router = inject(Router);

  readonly inspectedJobId = signal<string | null>(null);
  readonly showNewJobModal = signal<boolean>(false);
  readonly showBonusModal = signal<boolean>(false);
  readonly showCustomRoleModal = signal<boolean>(false);
  readonly showAddUserModal = signal<boolean>(false);
  readonly showNotificationDrawer = signal<boolean>(false);

  // Left Sidebar & Responsive Navigation
  readonly sidebarCollapsed = signal<boolean>(false);
  readonly mobileSidebarOpen = signal<boolean>(false);
  readonly globalSearchQuery = signal<string>('');
  readonly toastMessage = signal<string | null>(null);
  readonly contactModalOpen = signal<boolean>(false);
  readonly activeContactInfo = signal<{ name: string; phone: string; jobTitle: string; address: string } | null>(null);
  readonly profileDropdownOpen = signal<boolean>(false);
  readonly notificationDropdownOpen = signal<boolean>(false);
  readonly nowTick = signal<number>(Date.now());
  private clockInterval: any = null;
  private notificationCloseTimeout: any = null;
  private profileCloseTimeout: any = null;
  private profileHoverTime: number = 0;

  onProfileHover() {
    if (this.profileCloseTimeout) {
      clearTimeout(this.profileCloseTimeout);
      this.profileCloseTimeout = null;
    }
    this.closeNotificationDropdown();
    this.profileHoverTime = Date.now();
    this.profileDropdownOpen.set(true);
  }

  onProfileLeave() {
    if (this.profileCloseTimeout) {
      clearTimeout(this.profileCloseTimeout);
    }
    this.profileCloseTimeout = setTimeout(() => {
      this.profileDropdownOpen.set(false);
      this.profileCloseTimeout = null;
    }, 300);
  }

  onProfileClick(event?: Event) {
    if (event) event.stopPropagation();
    if (this.profileCloseTimeout) {
      clearTimeout(this.profileCloseTimeout);
      this.profileCloseTimeout = null;
    }
    this.closeNotificationDropdown();

    const timeSinceHover = Date.now() - this.profileHoverTime;
    // If it was opened by hover in the last 700ms, keep it open!
    if (this.profileDropdownOpen() && timeSinceHover < 700) {
      this.profileDropdownOpen.set(true);
    } else {
      this.profileDropdownOpen.update(prev => !prev);
    }
  }

  toggleProfileDropdown() {
    this.onProfileClick();
  }

  openProfileDropdown() {
    if (this.profileCloseTimeout) {
      clearTimeout(this.profileCloseTimeout);
      this.profileCloseTimeout = null;
    }
    this.closeNotificationDropdown();
    this.profileDropdownOpen.set(true);
  }

  closeProfileDropdown() {
    if (this.profileCloseTimeout) {
      clearTimeout(this.profileCloseTimeout);
      this.profileCloseTimeout = null;
    }
    this.profileDropdownOpen.set(false);
  }

  onNotificationHover() {
    if (this.notificationCloseTimeout) {
      clearTimeout(this.notificationCloseTimeout);
      this.notificationCloseTimeout = null;
    }
    this.closeProfileDropdown();
    this.notificationDropdownOpen.set(true);
  }

  onNotificationLeave() {
    if (this.notificationCloseTimeout) {
      clearTimeout(this.notificationCloseTimeout);
    }
    this.notificationCloseTimeout = setTimeout(() => {
      this.notificationDropdownOpen.set(false);
      this.notificationCloseTimeout = null;
    }, 250);
  }

  openNotificationDropdown() {
    if (this.notificationCloseTimeout) {
      clearTimeout(this.notificationCloseTimeout);
      this.notificationCloseTimeout = null;
    }
    this.closeProfileDropdown();
    this.notificationDropdownOpen.set(true);
  }

  closeNotificationDropdown() {
    if (this.notificationCloseTimeout) {
      clearTimeout(this.notificationCloseTimeout);
      this.notificationCloseTimeout = null;
    }
    this.notificationDropdownOpen.set(false);
  }

  toggleNotificationDropdown() {
    if (this.notificationCloseTimeout) {
      clearTimeout(this.notificationCloseTimeout);
      this.notificationCloseTimeout = null;
    }
    if (!this.notificationDropdownOpen()) {
      this.closeProfileDropdown();
      this.notificationDropdownOpen.set(true);
    } else {
      this.notificationDropdownOpen.set(false);
    }
  }

  openFullNotificationDrawer() {
    this.closeNotificationDropdown();
    this.showNotificationDrawer.set(true);
  }

  onNotificationClick(notif: NotificationItem) {
    this.store.markNotificationRead(notif.id);
    this.closeNotificationDropdown();
    if (notif.jobId) {
      const job = this.store.jobs().find(j => j.id === notif.jobId);
      if (
        this.store.canCurrentRoleAssignInstallers() &&
        (job?.installerAssignmentStatus === 'rejected' || notif.title.toLowerCase().includes('declined'))
      ) {
        this.reassignSelectedInstallerIds.set([]);
        this.store.openReassignmentPopup(notif.jobId);
        return;
      }
      if (this.store.currentRole() === 'installer' && notif.type === 'job_assigned') {
        this.setView('map');
        return;
      }
      this.openJobDetails(notif.jobId);
      if (this.store.canCurrentRoleSelectDispatcher() && (notif.actionLabel === 'Select Driver' || notif.actionLabel === 'Select Dispatcher')) {
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            document.getElementById('detailDispatcherDropdown')?.focus();
          }
        }, 80);
      } else if (this.store.canCurrentRoleAssignInstallers() && notif.actionLabel === 'Select Team') {
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            const grid = document.getElementById('detailTeamGrid');
            grid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (grid?.querySelector('button') as HTMLButtonElement | null)?.focus();
          }
        }, 80);
      }
    }
  }

  private readonly alert = inject(AlertService);
  readonly reassignSelectedInstallerIds = signal<string[]>([]);

  getJobForNotification(notif: NotificationItem): InstallationJob | undefined {
    if (!notif.jobId) return undefined;
    return this.store.jobs().find(j => j.id === notif.jobId);
  }

  canInstallerRespondToNotification(notif: NotificationItem): boolean {
    if (this.store.currentRole() !== 'installer' || !notif.jobId) return false;
    const job = this.getJobForNotification(notif);
    if (!job || !this.store.isInstallerPendingAcceptance(job)) {
      return false;
    }
    return true;
  }

  quickAcceptInstallerFromNotif(notif: NotificationItem, event: Event) {
    event.stopPropagation();
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.store.respondInstallerAssignment(notif.jobId, true);
    this.alert.success('Installation Accepted', `Job ${notif.jobId} confirmed for you.`);
    this.closeNotificationDropdown();
  }

  quickDeclineInstallerFromNotif(notif: NotificationItem, event: Event) {
    event.stopPropagation();
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.closeNotificationDropdown();
    this.store.respondInstallerAssignment(notif.jobId, false, 'Declined from quick notification');
    this.alert.warning('Installation Declined', `Job ${notif.jobId} declined. Operations Manager has been alerted.`);
    this.setView('map');
  }

  canDriverRespondToNotification(notif: NotificationItem): boolean {
    if (this.store.currentRole() !== 'dispatcher' || !notif.jobId) return false;
    const job = this.getJobForNotification(notif);
    if (!job || !this.store.isDriverPendingAcceptance(job)) {
      return false;
    }
    return true;
  }

  quickAcceptDriverFromNotif(notif: NotificationItem, event: Event) {
    event.stopPropagation();
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.store.respondDriverAssignment(notif.jobId, true);
    this.alert.success('Delivery Run Accepted', `Manifest for job ${notif.jobId} confirmed for you.`);
    this.closeNotificationDropdown();
  }

  quickDeclineDriverFromNotif(notif: NotificationItem, event: Event) {
    event.stopPropagation();
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.closeNotificationDropdown();
    this.openDriverRejectModal(notif.jobId);
  }

  getDriverRemainingSeconds(job: InstallationJob): number {
    return this.store.getDriverRemainingSeconds(job);
  }

  formatDriverRemaining(job: InstallationJob): string {
    return this.store.formatDriverRemaining(job);
  }

  readonly rejectingDriverJobId = signal<string | null>(null);

  quickAcceptDriver(jobId: string) {
    this.store.respondDriverAssignment(jobId, true);
    this.alert.success('Delivery Run Accepted', `Manifest for job ${jobId} confirmed for you.`);
  }

  openDriverRejectModal(jobId: string) {
    this.rejectingDriverJobId.set(jobId);
  }

  handleDriverRejectSubmit(event: { reason: string; details: string; proposedSlot?: string }) {
    const jobId = this.rejectingDriverJobId();
    if (!jobId) return;
    const combinedReason = `${event.reason}${event.details ? ': ' + event.details : ''}`;
    this.store.respondDriverAssignment(jobId, false, combinedReason, event.proposedSlot);
    this.alert.warning('Delivery Run Rejected', `Job ${jobId} returned to queue for reassignment.`);
    this.rejectingDriverJobId.set(null);
  }

  selectTeamForReassignment(team: InstallerTeam) {
    const uniqueIds = [team.leadId, ...team.memberIds.filter(id => id !== team.leadId)];
    this.reassignSelectedInstallerIds.set(uniqueIds);
  }

  isTeamSelectedForReassignment(team: InstallerTeam): boolean {
    const selected = this.reassignSelectedInstallerIds();
    const teamIds = [team.leadId, ...team.memberIds.filter(id => id !== team.leadId)];
    return selected.length === teamIds.length && selected.every((id, idx) => id === teamIds[idx]);
  }

  toggleInstallerForReassignment(installerId: string) {
    this.reassignSelectedInstallerIds.update(prev =>
      prev.includes(installerId) ? prev.filter(id => id !== installerId) : [...prev, installerId]
    );
  }

  getInstallerName(installerId: string): string {
    return this.store.installers().find(i => i.id === installerId)?.name || installerId;
  }

  confirmManagerReassignment(job: InstallationJob) {
    const ids = this.reassignSelectedInstallerIds();
    if (ids.length === 0) return;
    this.store.assignInstallersByManager(job.id, ids);
    const leadName = this.getInstallerName(ids[0]);
    const teamDesc = ids.length > 1 ? `${leadName} + ${ids.length - 1} assistant(s)` : leadName;
    this.reassignSelectedInstallerIds.set([]);
    this.store.dismissReassignmentPopup(job.id);
    this.alert.success(
      'Replacement Team Assigned',
      `${teamDesc} assigned to ${job.client.name} (${job.id}). 10-minute auto-accept countdown started.`
    );
  }

  dismissManagerReassignment(jobId: string) {
    this.reassignSelectedInstallerIds.set([]);
    this.store.dismissReassignmentPopup(jobId);
  }

  getNotificationIcon(type: NotificationItem['type']): string {
    switch (type) {
      case 'job_assigned': return 'assignment_ind';
      case 'truck_assigned': return 'local_shipping';
      case 'installer_accepted': return 'handshake';
      case 'driver_accepted': return 'check_circle';
      case 'driver_rejected': return 'cancel';
      case 'door_dispatched': return 'local_shipping';
      case 'shop_payment_recorded': return 'receipt_long';
      case 'technician_clocked_in': return 'login';
      case 'technician_clocked_out': return 'logout';
      case 'signoff_required': return 'draw';
      case 'installation_verified': return 'verified';
      case 'bonus_awarded': return 'payments';
      default: return 'notifications';
    }
  }

  getNotificationBadgeStyle(type: NotificationItem['type']): string {
    switch (type) {
      case 'job_assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400';
      case 'truck_assigned': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400';
      case 'installer_accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400';
      case 'driver_accepted': return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 font-bold';
      case 'driver_rejected': return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 font-bold';
      case 'door_dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400';
      case 'shop_payment_recorded': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400';
      case 'technician_clocked_in': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400';
      case 'signoff_required': return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400';
      case 'installation_verified': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400';
      case 'bonus_awarded': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
    }
  }

  formatNotificationTime(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  }

  openSettings() {
    this.closeProfileDropdown();
    this.setView('settings');
  }

  openProfile() {
    this.closeProfileDropdown();
    this.setView('profile');
  }

  // Current URL tracking for active menu highlighting
  readonly currentUrl = signal<string>(this.router.url);

  readonly currentView = computed<ActiveView>(() => {
    const url = this.currentUrl();
    const segment = url.split('?')[0].split('#')[0].replace(/^\//, '');
    const valid: ActiveView[] = ['overview', 'doors', 'work', 'shop', 'map', 'performance', 'finance', 'roles', 'settings', 'profile'];
    return (valid.includes(segment as ActiveView) ? segment : 'overview') as ActiveView;
  });

  readonly currentViewLabel = computed<string>(() => {
    const v = this.currentView();
    if (v === 'overview') return 'Dashboard';
    if (v === 'shop') return 'Shop & Counter';
    if (v === 'doors') return 'Doors in Catalog';
    if (v === 'work') return 'Work';
    if (v === 'map') return 'Map';
    if (v === 'performance') return 'Incentive Bonuses';
    if (v === 'finance') return 'Accounts Ledger';
    if (v === 'roles') return 'Roles & Permissions';
    if (v === 'settings') return 'Settings Hub';
    if (v === 'profile') return 'My Profile';
    return v;
  });

  readonly currentUser = computed(() => this.store.currentUser());

  // All master menu items definition
  readonly allMenuItems: MenuItemConfig[] = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: 'dashboard',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      activeColor: 'text-emerald-600 dark:text-emerald-400',
      category: 'field',
      badgeType: 'live',
      description: 'Fleet overview & active dispatch map'
    },
    {
      id: 'shop',
      label: 'Shop & Counter',
      icon: 'storefront',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      activeColor: 'text-cyan-600 dark:text-cyan-400',
      category: 'field',
      badgeType: 'count',
      description: 'Book installation, door specs & counter payments'
    },
    {
      id: 'doors',
      label: 'Doors in Catalog',
      icon: 'meeting_room',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      activeColor: 'text-emerald-600 dark:text-emerald-400',
      category: 'field',
      badgeType: 'count',
      description: 'Door specifications, inventory & models'
    },
    {
      id: 'work',
      label: 'Work',
      icon: 'work',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      activeColor: 'text-indigo-600 dark:text-indigo-400',
      category: 'field',
      badgeType: 'count',
      description: 'Assigned tasks and progress'
    },
    {
      id: 'map',
      label: 'Map',
      icon: 'map',
      iconColor: 'text-teal-600 dark:text-teal-400',
      activeColor: 'text-teal-600 dark:text-teal-400',
      category: 'field',
      badgeType: 'live',
      description: 'Unified field telematics, live radar, routes & site operations'
    },
    {
      id: 'performance',
      label: 'Incentive Bonuses',
      icon: 'military_tech',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      activeColor: 'text-emerald-600 dark:text-emerald-400',
      category: 'finance',
      badgeType: 'currency',
      description: 'Installer bonus earnings & metrics'
    },
    {
      id: 'finance',
      label: 'Accounts Ledger',
      icon: 'account_balance_wallet',
      iconColor: 'text-amber-600 dark:text-amber-400',
      activeColor: 'text-amber-600 dark:text-amber-400',
      category: 'finance',
      badgeType: 'ledger',
      description: 'Order financials, payouts & invoicing'
    },
    {
      id: 'roles',
      label: 'Roles & Permissions',
      icon: 'admin_panel_settings',
      iconColor: 'text-purple-600 dark:text-purple-400',
      activeColor: 'text-purple-600 dark:text-purple-400',
      category: 'governance',
      badgeType: 'count',
      description: 'Access governance & role assignment'
    }
  ];

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.currentUrl.set(e.urlAfterRedirects || e.url);
      this.enforceRoleAccess();
    });
    this.enforceRoleAccess();

    if (typeof window !== 'undefined') {
      this.clockInterval = setInterval(() => {
        this.nowTick.set(Date.now());
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  private enforceRoleAccess() {
    const view = this.currentView();
    const roleId = this.store.currentRole();
    const roleDef = this.store.currentRoleDefinition();
    if (!this.isViewAllowedForRole(view, roleId, roleDef)) {
      const target = roleId === 'client' ? '/map' :
        roleId === 'dispatcher' ? '/overview' :
          roleId === 'installer' ? '/map' :
            roleId === 'shop_manager' ? '/shop' :
              roleId === 'account_officer' ? '/finance' :
                '/overview';
      this.router.navigate([target]);
    }
  }

  isViewAllowedForRole(viewId: ActiveView, roleId: string, roleDef: RoleDefinition): boolean {
    if (viewId === 'settings' || viewId === 'profile' || viewId === 'map') return true;
    // When impersonating another user, the user is mainly logged in with primary permissions
    if (this.store.isImpersonating()) {
      if (viewId === 'roles' && (this.store.originalRole() === 'admin' || this.store.originalUser()?.role === 'admin')) {
        return true;
      }
    }
    if (viewId === 'overview') {
      return true;
    }
    switch (roleId) {
      case 'admin':
        return true;
      case 'manager':
        return viewId !== 'roles';
      case 'installer':
        return viewId === 'work';
      case 'client':
        return false;
      case 'account_officer':
        return viewId === 'work' || viewId === 'finance' || viewId === 'performance';
      case 'shop_manager':
        return viewId === 'shop' || viewId === 'doors';
      case 'dispatcher':
        return viewId === 'work';
      default: {
        const p = roleDef?.permissions;
        if (!p) return true;
        switch (viewId) {
          case 'shop':
            return p.canDispatchDoors;
          case 'doors':
            return p.canDispatchDoors || p.canManageRoles;
          case 'performance':
            if (['client', 'installer', 'shop_manager', 'dispatcher'].includes(roleId)) return false;
            return p.canApproveBonuses || roleId === 'admin';
          case 'finance':
            return p.canViewFinancials;
          case 'roles':
            return roleId === 'admin' || p.canManageRoles;
          default:
            return false;
        }
      }
    }
  }

  readonly filteredMenuItems = computed(() => {
    const roleId = this.store.currentRole();
    const roleDef = this.store.currentRoleDefinition();
    return this.allMenuItems.filter(item => {
      return this.isViewAllowedForRole(item.id, roleId, roleDef);
    });
  });

  readonly mobileBottomMenuItems = computed(() => {
    return this.filteredMenuItems().filter(i => i.id !== 'map').slice(0, 3);
  });

  readonly filteredMenuSections = computed<MenuSection[]>(() => {
    const allowed = this.filteredMenuItems();
    const sections: MenuSection[] = [
      { id: 'field', title: 'FIELD OPERATIONS & FLEET', items: allowed.filter(i => i.category === 'field') },
      { id: 'finance', title: 'LEDGER & INCENTIVES', items: allowed.filter(i => i.category === 'finance') },
      { id: 'governance', title: 'SYSTEM GOVERNANCE', items: allowed.filter(i => i.category === 'governance') }
    ];
    return sections.filter(s => s.items.length > 0);
  });

  readonly activeLiveJob = computed(() => {
    const all = this.store.branchJobs();
    return all.find(j => j.status === 'on_site' || j.status === 'dispatched' || j.status === 'accepted') || null;
  });

  setView(view: ActiveView) {
    this.mobileSidebarOpen.set(false);
    this.router.navigate(['/' + view]);
  }

  toggleSidebarCollapse() {
    this.sidebarCollapsed.update(prev => !prev);
  }

  toggleMobileSidebar() {
    this.mobileSidebarOpen.update(prev => !prev);
  }

  closeMobileSidebar() {
    this.mobileSidebarOpen.set(false);
  }

  onRoleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const roleId = target.value as RoleType;
    this.setRoleDirect(roleId);
  }

  setRoleDirect(roleId: RoleType) {
    this.store.currentRole.set(roleId);

    let targetView: ActiveView = 'overview';
    if (this.currentView() === 'overview') {
      targetView = 'overview';
    } else if (roleId === 'installer') {
      targetView = 'map';
    } else if (roleId === 'client') {
      targetView = 'map';
    } else if (roleId === 'account_officer') {
      targetView = 'finance';
    } else if (roleId === 'shop_manager') {
      targetView = 'shop';
    } else if (roleId === 'dispatcher') {
      targetView = 'overview';
    } else if (roleId === 'admin' || roleId === 'manager') {
      targetView = 'overview';
    } else {
      const allowed = this.filteredMenuItems();
      if (allowed.length > 0) {
        targetView = allowed[0].id;
      }
    }

    this.setView(targetView);
    const def = this.store.currentRoleDefinition();
    const count = this.filteredMenuItems().length;
    this.showToast(`Logged in as ${def.name} • ${count} ${count === 1 ? 'menu' : 'menus'} active`);
  }

  openSignInPage() {
    this.closeProfileDropdown();
    this.store.signOutApi();
    this.router.navigate(['/signin']);
  }

  openLandingPage() {
    this.closeProfileDropdown();
    this.router.navigate(['/landing']);
  }

  openDashboard() {
    this.closeProfileDropdown();
    this.router.navigate(['/overview']);
  }

  openJobDetails(jobId: string) {
    this.inspectedJobId.set(jobId);
  }

  closeJobDetails() {
    this.inspectedJobId.set(null);
  }

  openContactInstaller(job: InstallationJob) {
    this.openContactTechnician(job);
  }

  openContactTechnician(job: InstallationJob) {
    this.activeContactInfo.set({
      name: job.assignedInstallerName || 'Marcus Vance',
      phone: '+1 (555) 234-8891',
      jobTitle: job.doorModel,
      address: job.client.siteAddress
    });
    this.contactModalOpen.set(true);
  }

  closeContactModal() {
    this.contactModalOpen.set(false);
    this.activeContactInfo.set(null);
  }

  showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 4000);
  }

  onRouteActivated(component: any) {
    if (!component) return;
    if (component.jobSelected) {
      component.jobSelected.subscribe((jobId: string) => this.openJobDetails(jobId));
    }
    if (component.newJobOpened) {
      component.newJobOpened.subscribe(() => this.showNewJobModal.set(true));
    }
    if (component.bonusModalOpened) {
      component.bonusModalOpened.subscribe(() => {
        if (!['client', 'installer', 'shop_manager', 'dispatcher'].includes(this.store.currentRole())) {
          this.showBonusModal.set(true);
        }
      });
    }
    if (component.manageUsersOpened) {
      component.manageUsersOpened.subscribe(() => this.setView('roles'));
    }
    if (component.customRoleModalOpened) {
      component.customRoleModalOpened.subscribe(() => this.showCustomRoleModal.set(true));
    }
    if (component.addUserModalOpened) {
      component.addUserModalOpened.subscribe(() => this.showAddUserModal.set(true));
    }
    if (component.roleSwitched) {
      component.roleSwitched.subscribe((role: RoleType) => this.setRoleDirect(role));
    }
    if (component.settingsOpened) {
      component.settingsOpened.subscribe(() => this.setView('settings'));
    }
  }
}
