import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { InstallationJob, NotificationItem } from '../../models/installation.model';

@Component({
  selector: 'app-notification-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100">
          <!-- Header -->
          <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                <mat-icon class="!text-sm !w-4 !h-4">notifications</mat-icon>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">DoorMaster Live Dispatch Alerts</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">Filtered for role: <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">{{ store.currentRoleDefinition().name }}</span></p>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <button 
                type="button"
                (click)="store.markAllNotificationsRead()"
                class="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Mark all as read"
              >
                Mark Read
              </button>
              <button 
                type="button"
                (click)="closed.emit()"
                class="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>
            </div>
          </div>

          <!-- Notification filter tabs -->
          <div class="px-5 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-950/40">
            <span>{{ store.roleNotifications().length }} total dispatch events</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Live Dispatch Feed Active
            </span>
          </div>

          <!-- Notifications List -->
          <div class="flex-1 overflow-y-auto p-5 space-y-3">
            @if (store.roleNotifications().length === 0) {
              <div class="text-center py-12 text-slate-400 dark:text-slate-500">
                <mat-icon class="!text-3xl mb-2 text-slate-300 dark:text-slate-600">notifications_none</mat-icon>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-300">No active alerts for {{ store.currentRoleDefinition().name }}</p>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Assignments, site clock-ins, client acceptances and operational milestones will appear here in real time.</p>
              </div>
            } @else {
              @for (notif of store.roleNotifications(); track notif.id) {
                <div 
                  class="p-4 rounded-xl border transition-all text-left relative"
                  [class]="notif.read ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 shadow-xs ring-1 ring-slate-900/5 dark:ring-white/5'"
                >
                  <div class="flex items-start justify-between gap-3 mb-1.5">
                    <div class="flex items-center gap-2">
                      <div 
                        class="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                        [class]="getBadgeStyle(notif.type)"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ getIcon(notif.type) }}</mat-icon>
                      </div>
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white">{{ notif.title }}</h4>
                    </div>

                    <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono tabular-nums whitespace-nowrap">
                      {{ formatTime(notif.timestamp) }}
                    </span>
                  </div>

                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                    {{ notif.message }}
                  </p>

                  <div class="pl-8 mt-2.5 flex items-center justify-between">
                    <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Job {{ notif.jobId }}
                    </span>

                    <div class="flex items-center gap-2">
                      @if (canInstallerRespond(notif)) {
                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1">
                          <mat-icon class="!text-[11px] !w-3 !h-3 animate-pulse">timer</mat-icon>
                          <span>{{ store.formatInstallerRemaining(getJob(notif.jobId)) }}</span>
                        </span>
                        <button
                          type="button"
                          (click)="acceptInstallerFromDrawer(notif)"
                          class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Accept Now
                        </button>
                        <button
                          type="button"
                          (click)="declineInstallerFromDrawer(notif)"
                          class="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Reject
                        </button>
                      } @else if (canDriverRespond(notif)) {
                        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1">
                          <mat-icon class="!text-[11px] !w-3 !h-3 animate-pulse">timer</mat-icon>
                          <span>{{ store.formatDriverRemaining(getJob(notif.jobId)) }}</span>
                        </span>
                        <button
                          type="button"
                          (click)="acceptDriverFromDrawer(notif)"
                          class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Accept Run
                        </button>
                        <button
                          type="button"
                          (click)="declineDriverFromDrawer(notif)"
                          class="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Reject
                        </button>
                      } @else {
                        @if (!notif.read) {
                          <button 
                            type="button"
                            (click)="store.markNotificationRead(notif.id)"
                            class="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                          >
                            Dismiss
                          </button>
                        }
                        @if (notif.actionLabel) {
                          <button 
                            type="button"
                            (click)="handleAction(notif)"
                            class="text-[11px] font-semibold text-slate-900 dark:text-white hover:underline"
                          >
                            {{ notif.actionLabel }} →
                          </button>
                        }
                      }
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <!-- Bottom trigger preview helper -->
          <div class="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span class="text-[11px]">System notifications automatically route to Installer & Client portals</span>
            <button 
              type="button" 
              (click)="closed.emit()"
              class="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded font-medium text-xs transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotificationDrawer {
  readonly store = inject(InstallationStore);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);
  closed = output<void>();
  jobSelected = output<string>();

  getJob(jobId?: string): InstallationJob | undefined {
    if (!jobId) return undefined;
    return this.store.jobs().find(j => j.id === jobId);
  }

  canInstallerRespond(notif: NotificationItem): boolean {
    if (this.store.currentRole() !== 'installer' || !notif.jobId) return false;
    const job = this.store.jobs().find(j => j.id === notif.jobId);
    if (!job || !this.store.isInstallerPendingAcceptance(job)) {
      return false;
    }
    return true;
  }

  acceptInstallerFromDrawer(notif: NotificationItem) {
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.store.respondInstallerAssignment(notif.jobId, true);
    this.alert.success('Installation Accepted', `Job ${notif.jobId} confirmed for you.`);
    this.closed.emit();
  }

  declineInstallerFromDrawer(notif: NotificationItem) {
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.store.respondInstallerAssignment(notif.jobId, false, 'Declined from notification drawer');
    this.alert.warning('Installation Declined', `Job ${notif.jobId} declined. Operations Manager alerted.`);
    this.closed.emit();
    this.router.navigate(['/map']);
  }

  canDriverRespond(notif: NotificationItem): boolean {
    if (this.store.currentRole() !== 'dispatcher' || !notif.jobId) return false;
    const job = this.store.jobs().find(j => j.id === notif.jobId);
    if (!job || !this.store.isDriverPendingAcceptance(job)) {
      return false;
    }
    return true;
  }

  acceptDriverFromDrawer(notif: NotificationItem) {
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.store.respondDriverAssignment(notif.jobId, true);
    this.alert.success('Delivery Run Accepted', `Manifest for job ${notif.jobId} confirmed for you.`);
    this.closed.emit();
  }

  declineDriverFromDrawer(notif: NotificationItem) {
    if (!notif.jobId) return;
    this.store.markNotificationRead(notif.id);
    this.store.respondDriverAssignment(notif.jobId, false, 'Declined from notification drawer');
    this.alert.warning('Delivery Run Declined', `Job ${notif.jobId} returned to queue for reassignment.`);
    this.closed.emit();
    this.router.navigate(['/overview']);
  }

  getIcon(type: NotificationItem['type']): string {
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

  getBadgeStyle(type: NotificationItem['type']): string {
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

  formatTime(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  }

  handleAction(notif: NotificationItem) {
    this.store.markNotificationRead(notif.id);
    if (notif.jobId) {
      const job = this.store.jobs().find(j => j.id === notif.jobId);
      if (
        this.store.canCurrentRoleAssignInstallers() &&
        (job?.installerAssignmentStatus === 'rejected' || notif.title.toLowerCase().includes('declined'))
      ) {
        this.store.openReassignmentPopup(notif.jobId);
        this.closed.emit();
        return;
      }
      if (this.store.currentRole() === 'installer' && notif.type === 'job_assigned') {
        this.closed.emit();
        this.router.navigate(['/map']);
        return;
      }
    }
    this.jobSelected.emit(notif.jobId);
    this.closed.emit();
  }
}
