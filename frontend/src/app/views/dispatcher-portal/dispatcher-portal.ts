import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { RejectionModal } from '../../components/rejection-modal/rejection-modal';
import { JobDetailModal } from '../../components/job-detail-modal/job-detail-modal';
import { InstallationJob, NotificationItem } from '../../models/installation.model';

@Component({
  selector: 'app-dispatcher-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatIconModule, RejectionModal, JobDetailModal],
  template: `
    <div class="space-y-6">
      <!-- Portal Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Logistics Fleet</span>
            <span aria-hidden="true">·</span>
            <span>Heavy Transport & Hardware Delivery</span>
            <span aria-hidden="true">·</span>
            <span class="text-teal-700 dark:text-teal-400 font-bold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span>Truck Dispatch Active</span>
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Logistics Dispatcher & Delivery Portal</h1>
        </div>

        <!-- Driver / Truck Selector (Hidden on Operations Manager & Dispatcher portals) -->
        @if (store.currentRole() !== 'dispatcher' && store.currentRole() !== 'manager') {
          <div class="flex items-center gap-3">
            <div>
              <label for="dispatcherSelectDriver" class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold mb-1">Active Driver</label>
              <select 
                id="dispatcherSelectDriver"
                [value]="store.currentDispatcherId()"
                (change)="onDispatcherChange($event)"
                class="text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                @for (disp of store.dispatchers(); track disp.id) {
                  <option [value]="disp.id">{{ disp.name }} ({{ disp.assignedTruck.plate }})</option>
                }
              </select>
            </div>
          </div>
        }
      </div>

      <!-- Live Acceptance Notice Alert Banner (Instant Push Toast) -->
      @if (latestAcceptanceNotice()) {
        @let notice = latestAcceptanceNotice()!;
        <div class="relative overflow-hidden rounded-2xl border p-4 sm:p-5 shadow-lg transition-all duration-300"
          [class]="notice.autoAccepted 
            ? 'bg-gradient-to-r from-purple-950/95 via-slate-900 to-slate-950 border-purple-500/60 text-white' 
            : 'bg-gradient-to-r from-teal-950/95 via-slate-900 to-slate-950 border-teal-500/60 text-white'">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md border"
                [class]="notice.autoAccepted 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' 
                  : 'bg-teal-500/20 text-teal-300 border-teal-400/40'">
                <mat-icon class="!text-2xl">{{ notice.autoAccepted ? 'hourglass_disabled' : 'verified' }}</mat-icon>
              </div>
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-black text-sm sm:text-base text-white tracking-tight">{{ notice.title }}</h3>
                  <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase"
                    [class]="notice.autoAccepted 
                      ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40' 
                      : 'bg-teal-500/30 text-teal-200 border border-teal-400/40'">
                    {{ notice.autoAccepted ? '10-Min Auto-Accepted' : 'Driver Confirmed' }}
                  </span>
                  <span class="text-[11px] text-slate-400 font-mono">{{ notice.timestamp }}</span>
                </div>
                <p class="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {{ notice.message }}
                </p>
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    (click)="inspectingJobId.set(notice.jobId)"
                    class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10 active:scale-95"
                  >
                    <mat-icon class="!text-xs">visibility</mat-icon>
                    <span>View Manifest ({{ notice.jobId }})</span>
                  </button>
                  <span class="text-xs text-teal-300 flex items-center gap-1.5 font-medium">
                    <mat-icon class="!text-sm text-teal-400">check_circle</mat-icon>
                    <span>SMS broadcast sent to Shop Manager & Client</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              (click)="dismissLatestNotice()"
              class="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss notification"
            >
              <mat-icon class="!text-base">close</mat-icon>
            </button>
          </div>
        </div>
      }

      <!-- Driver & Assigned Truck Profile Bar -->
      @if (activeDispatcher()) {
        @let d = activeDispatcher()!;
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <mat-icon>local_shipping</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-extrabold text-slate-900 dark:text-white">{{ d.name }}</h2>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full capitalize"
                  [class]="d.status === 'on_route' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'">
                  {{ d.status.replace('_', ' ') }}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Assigned Truck: <strong class="text-slate-900 dark:text-white">{{ d.assignedTruck.plate }}</strong> · {{ d.assignedTruck.model }} (Max: {{ d.assignedTruck.capacityKg }} kg)
              </p>
            </div>
          </div>

          <div class="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-3 md:pt-0 md:pl-6 text-xs">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Deliveries Completed</span>
              <span class="text-base font-black font-mono text-slate-900 dark:text-white tabular-nums">{{ d.completedDeliveries }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Driver Rating</span>
              <span class="text-base font-black font-mono text-amber-500 tabular-nums">★ {{ d.rating }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Phone Contact</span>
              <span class="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">{{ d.phone }}</span>
            </div>
          </div>
        </div>
      }

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Awaiting Loading</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ pendingLoadingJobs().length }}
            </span>
            <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">At Workshop</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Ready for cargo inspection</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Active On Road</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-teal-700 dark:text-teal-400 tracking-tight tabular-nums">
              {{ activeEnRouteJobs().length }}
            </span>
            <span class="text-xs text-teal-800 dark:text-teal-300 font-medium">In Transit</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">GPS telemetry transmitting to client</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Delivered to Site</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              {{ deliveredJobs().length }}
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Handed Over</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Ready for lock & door install</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Manifests</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ store.dispatcherJobs().length }}
            </span>
            <span class="text-xs text-slate-500 font-medium">Orders</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Assigned to this fleet</p>
        </div>
      </div>

      <!-- Acceptance & Assignment Notifications Feed Card -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-200 dark:border-teal-800/80">
              <mat-icon class="!text-xl">notifications_active</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Acceptance & Driver Assignment Notifications
                </h3>
                @if (unreadAcceptanceCount() > 0) {
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white font-mono animate-pulse">
                    {{ unreadAcceptanceCount() }} new
                  </span>
                }
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Live stream of driver confirmations, 10-minute auto-acceptance timer events, and customer SMS delivery logs
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <!-- Filter Pills -->
            <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
              <button
                type="button"
                (click)="notificationFilter.set('all')"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                [class]="notificationFilter() === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
              >
                All ({{ allDispatcherNotifications().length }})
              </button>
              <button
                type="button"
                (click)="notificationFilter.set('accepted')"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                [class]="notificationFilter() === 'accepted' ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
              >
                Accepted
              </button>
              <button
                type="button"
                (click)="notificationFilter.set('unread')"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                [class]="notificationFilter() === 'unread' ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
              >
                Unread ({{ unreadAcceptanceCount() }})
              </button>
            </div>

            @if (allDispatcherNotifications().length > 0) {
              <button
                type="button"
                (click)="markAllNotificationsRead()"
                class="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                title="Mark all notifications as read"
              >
                Mark read
              </button>
            }

            <button
              type="button"
              (click)="notificationFeedOpen.set(!notificationFeedOpen())"
              class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              [title]="notificationFeedOpen() ? 'Collapse notification feed' : 'Expand notification feed'"
            >
              <mat-icon class="!text-lg">{{ notificationFeedOpen() ? 'expand_less' : 'expand_more' }}</mat-icon>
            </button>
          </div>
        </div>

        @if (notificationFeedOpen()) {
          @if (dispatcherNotifications().length === 0) {
            <div class="p-6 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800">
              <mat-icon class="!text-3xl text-slate-400 mb-1">mark_chat_read</mat-icon>
              <p class="text-xs font-bold text-slate-600 dark:text-slate-300">No acceptance notifications match filter</p>
              <p class="text-[11px] text-slate-400 mt-0.5">When runs are accepted manually or auto-accepted after the 10-minute timer, records stream here in real time.</p>
            </div>
          } @else {
            <div class="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              @for (notif of dispatcherNotifications(); track notif.id) {
                <div 
                  (click)="onNotificationItemClick(notif)"
                  class="p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 group"
                  [class]="notif.read 
                    ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' 
                    : (notif.title.includes('Auto-Accepted') 
                        ? 'bg-purple-50/80 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 hover:border-purple-300 shadow-xs' 
                        : 'bg-teal-50/80 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 hover:border-teal-300 shadow-xs')"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      [class]="notif.title.includes('Auto-Accepted')
                        ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                        : notif.type === 'driver_accepted' 
                          ? 'bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300' 
                          : notif.type === 'driver_rejected' 
                            ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300' 
                            : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'">
                      <mat-icon class="!text-base">
                        {{ notif.title.includes('Auto-Accepted') ? 'timer' : (notif.type === 'driver_accepted' ? 'check_circle' : (notif.type === 'driver_rejected' ? 'cancel' : 'local_shipping')) }}
                      </mat-icon>
                    </div>

                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <span class="text-xs font-bold text-slate-900 dark:text-white">{{ notif.title }}</span>
                        @if (!notif.read) {
                          <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                        }
                        @if (notif.jobId) {
                          <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                            {{ notif.jobId }}
                          </span>
                        }
                        @if (notif.title.includes('Auto-Accepted')) {
                          <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            10-Min Auto
                          </span>
                        } @else if (notif.type === 'driver_accepted') {
                          <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Driver Confirmed
                          </span>
                        }
                      </div>

                      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {{ notif.message }}
                      </p>

                      <div class="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-mono">
                        <span>{{ formatNotificationTime(notif.timestamp) }}</span>
                        <span class="text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                          <mat-icon class="!text-[11px] !w-3 !h-3">sms</mat-icon>
                          <span>SMS Dispatched to Client & Shop</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 shrink-0">
                    @if (notif.jobId) {
                      <button 
                        type="button"
                        (click)="$event.stopPropagation(); inspectingJobId.set(notif.jobId)"
                        class="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors group-hover:border-teal-500"
                      >
                        <span>Manifest</span>
                        <mat-icon class="!text-[12px] !w-3 !h-3">arrow_forward</mat-icon>
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          }
        }
      </div>

      <!-- Direct Link to Dedicated Delivery Map Page -->
      <div class="bg-gradient-to-r from-teal-900/90 via-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-teal-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-400/30 shadow-xs">
            <mat-icon class="!text-2xl">map</mat-icon>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-black text-sm sm:text-base text-white">Live Delivery Route Map & Real-Time Telematics</h3>
              <span class="text-[9px] font-mono font-bold bg-teal-500/30 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30 uppercase">
                New Dedicated Page
              </span>
            </div>
            <p class="text-xs text-teal-100/75 mt-0.5">
              Full-screen OpenStreetMap tracking all accepted deliveries, shortest road routing corridor, and instant automatic re-routing when driver takes an alternate turn.
            </p>
          </div>
        </div>

        <a 
          routerLink="/map" 
          class="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <mat-icon class="!text-sm">navigation</mat-icon>
          <span>Open Live Delivery Map</span>
        </a>
      </div>

      <!-- Today's Delivery Manifests in Full Details -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <mat-icon class="!text-sm text-teal-600">today</mat-icon>
              <span>Today's Delivery Manifests & Site Dispatches</span>
            </h3>
            <p class="text-xs text-slate-500">Scheduled for immediate convoy departure or active on the road today</p>
          </div>
          <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            {{ todayJobs().length }} scheduled today
          </span>
        </div>

        @if (todayJobs().length === 0) {
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-10 text-center">
            <mat-icon class="!text-4xl text-slate-400 mb-2">event_available</mat-icon>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">No active delivery runs scheduled for today</h4>
            <p class="text-xs text-slate-400 mt-1">New dispatches scheduled for today will automatically populate here in real-time.</p>
          </div>
        }

        <div class="grid grid-cols-1 gap-5">
          @for (job of todayJobs(); track job.id) {
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
              <!-- Top Card Bar -->
              <div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-extrabold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {{ job.id }}
                    </span>
                    <h4 class="text-base font-extrabold text-slate-900 dark:text-white">{{ job.doorModel }}</h4>
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded-full capitalize"
                      [class]="getStatusBadgeClass(job.status)">
                      {{ job.status.replace('_', ' ') }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    Workshop Origin: <strong class="text-slate-700 dark:text-slate-300">{{ job.shopBranch }}</strong> · Scheduled: <span class="font-mono font-medium">{{ job.scheduledDate }}</span>
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  @if (job.logisticsTruck) {
                    <span class="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-1">
                      <mat-icon class="!text-xs">directions_car</mat-icon>
                      <span>Truck: {{ job.logisticsTruck.truckPlate }}</span>
                    </span>
                  }
                </div>
              </div>

              <!-- Two Column Details: Cargo & Client Site -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <!-- Cargo & Lock Specification -->
                <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs text-teal-600">inventory_2</mat-icon>
                    <span>Cargo & Lock Specification</span>
                  </span>
                  <div>
                    <p class="text-slate-900 dark:text-white font-bold">{{ job.doorModel }} ({{ job.dimensions }})</p>
                    <p class="text-slate-500 dark:text-slate-400 text-[11px]">{{ job.finish }} · {{ job.hardwareSpecs }}</p>
                  </div>
                  <div class="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span class="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Hardware / Lock Item:</span>
                    <p class="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">lock</mat-icon>
                      <span>{{ job.lockModel || 'Doormaster High-Security Smart Lock' }}</span>
                    </p>
                  </div>
                  @if (job.assignedInstallerName) {
                    <p class="text-[11px] text-slate-600 dark:text-slate-400">
                      Receiving Installer: <strong class="text-slate-900 dark:text-white">{{ job.assignedInstallerName }}</strong>
                    </p>
                  } @else {
                    <p class="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <mat-icon class="!text-[12px] !w-3 !h-3">hourglass_top</mat-icon>
                      <span>Receiving Installer: <strong>Pending Assignment</strong></span>
                    </p>
                  }
                </div>

                <!-- Client & Site Owner Destination -->
                <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs text-indigo-600">person_pin</mat-icon>
                    <span>Client & Delivery Site</span>
                  </span>
                  <div>
                    <p class="text-slate-900 dark:text-white font-extrabold text-sm">{{ job.client.name }}</p>
                    <p class="text-slate-600 dark:text-slate-300 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span>{{ job.client.siteAddress }}</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-3 pt-1">
                    <a 
                      [href]="'tel:' + job.client.phone" 
                      class="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-1 transition-colors"
                    >
                      <mat-icon class="!text-xs">phone</mat-icon>
                      <span>Call Client ({{ job.client.phone }})</span>
                    </a>
                  </div>
                  @if (job.client.accessInstructions) {
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      "{{ job.client.accessInstructions }}"
                    </p>
                  }
                </div>
              </div>

              <!-- Driver Assignment Response Banner with 10-Minute Countdown -->
              @if (job.driverAssignmentStatus !== 'accepted' && job.driverAssignmentStatus !== 'rejected') {
                @let timer = getDriverTimeRemaining(job);
                <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-2xl border-2 border-amber-300 dark:border-amber-700/70 shadow-sm space-y-3">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                        <mat-icon class="!text-xl animate-pulse">timer</mat-icon>
                      </div>
                      <div>
                        <div class="flex flex-wrap items-center gap-2">
                          <span class="font-extrabold text-xs text-amber-950 dark:text-amber-200">
                            10-Minute Acceptance Window Active
                          </span>
                          <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                            App & SMS Dispatched
                          </span>
                        </div>
                        <p class="text-[11px] text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                          You have <strong>10 minutes</strong> to review this delivery run. If you cannot take it, click <strong>Reject Run (Reassign)</strong> to return it for reassignment. If no rejection is made, the system will <strong>auto-accept</strong> it for you.
                        </p>
                      </div>
                    </div>

                    <!-- Countdown Display -->
                    <div class="flex items-center gap-2 shrink-0 self-end sm:self-center bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 shadow-xs">
                      <mat-icon class="!text-base text-amber-600 dark:text-amber-400">hourglass_top</mat-icon>
                      <div class="text-right">
                        <span class="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Remaining</span>
                        <span class="font-mono text-base font-black text-amber-700 dark:text-amber-300 tabular-nums">
                          {{ timer.text }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar for 10-Minute Countdown -->
                  <div class="w-full bg-amber-200/60 dark:bg-amber-900/40 rounded-full h-1.5 overflow-hidden">
                    <div 
                      class="bg-amber-600 dark:bg-amber-400 h-1.5 rounded-full transition-all duration-1000"
                      [style.width.%]="timer.percent"
                    ></div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
                    <span class="text-[10px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                      <mat-icon class="!text-xs">shield</mat-icon>
                      <span>Auto-accept active · Driver rejection triggers instant reassignment</span>
                    </span>
                    <div class="flex flex-wrap items-center gap-2">
                      <button 
                        type="button"
                        (click)="acceptRun(job.id)"
                        class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
                      >
                        <mat-icon class="!text-xs">check_circle</mat-icon>
                        <span>Accept Run</span>
                      </button>
                      <button 
                        type="button"
                        (click)="simulateAutoAccept(job.id)"
                        class="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
                        title="Fast-forward: Test 10-minute auto-acceptance timer expiry"
                      >
                        <mat-icon class="!text-xs">fast_forward</mat-icon>
                        <span>Simulate 10-Min Expiry</span>
                      </button>
                      <button 
                        type="button"
                        (click)="openRejectModal(job.id)"
                        class="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
                        title="Reject within 10 minutes to notify Operations for reassignment"
                      >
                        <mat-icon class="!text-xs">cancel</mat-icon>
                        <span>Reject Run (Reassign)</span>
                      </button>
                    </div>
                  </div>
                </div>
              } @else if (job.driverAssignmentStatus === 'accepted') {
                <div class="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  [class]="job.driverAutoAccepted 
                    ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/60 text-purple-900 dark:text-purple-200' 
                    : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      [class]="job.driverAutoAccepted ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300' : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'">
                      <mat-icon class="!text-lg">{{ job.driverAutoAccepted ? 'timer' : 'verified' }}</mat-icon>
                    </div>
                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <span class="font-extrabold text-sm">
                          @if (job.driverAutoAccepted) {
                            <span>Run Auto-Accepted (10-Min Window Elapsed)</span>
                          } @else {
                            <span>Run Confirmed & Accepted by You</span>
                          }
                        </span>
                        <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                          [class]="job.driverAutoAccepted ? 'bg-purple-200 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200' : 'bg-emerald-200 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200'">
                          Manifest Activated
                        </span>
                      </div>
                      <p class="text-[11px] opacity-90 mt-0.5">
                        Truck convoy departure authorized. Ready for cargo loading inspection.
                        @if (job.driverRespondedAt) {
                          <span class="font-mono ml-1">· Accepted at {{ formatNotificationTime(job.driverRespondedAt) }}</span>
                        }
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs"
                      [class]="job.driverAutoAccepted ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700' : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'">
                      <mat-icon class="!text-xs">sms</mat-icon>
                      <span>SMS Dispatched</span>
                    </span>
                  </div>
                </div>
              } @else if (job.driverAssignmentStatus === 'rejected') {
                <div class="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 flex items-center justify-between">
                  <div>
                    <span class="font-bold flex items-center gap-1">
                      <mat-icon class="!text-sm text-rose-600">cancel</mat-icon>
                      <span>You rejected this run: {{ job.driverRejectReason }}</span>
                    </span>
                    <span class="block text-[11px] text-rose-600 dark:text-rose-400 mt-0.5">
                      Returned to queue for Operations Manager reassignment.
                    </span>
                  </div>
                  <span class="text-[10px] font-mono text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/50 px-2 py-0.5 rounded-full">
                    Reassigned
                  </span>
                </div>
              }

              <!-- Driver Trip Workflow Stage Controls -->
              <div class="bg-slate-900 dark:bg-slate-950 text-white p-4 rounded-xl space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold flex items-center gap-1.5 text-teal-400 uppercase tracking-wider text-[11px]">
                    <mat-icon class="!text-xs">route</mat-icon>
                    <span>Dispatcher Trip Controls</span>
                  </span>
                  <span class="text-[11px] text-slate-400 font-mono">
                    @if (job.status === 'truck_assigned' || job.status === 'booked_at_shop' || job.status === 'site_funds_dispatched' || job.status === 'approved') {
                      Stage 1 of 4: At Workshop (Loading & Departure)
                    } @else if (job.status === 'dispatched') {
                      Stage 2 of 4: En Route to Client Site (Live OSM Motion)
                    } @else if (job.status === 'delivered_on_site') {
                      Stage 3 of 4: Cargo Delivered to Site
                    } @else {
                      Stage 4 of 4: Handed Over & Installation Active
                    }
                  </span>
                </div>

                <!-- Action Button Matrix -->
                <div class="flex flex-wrap items-center gap-2.5">
                  @if (job.status === 'truck_assigned' || job.status === 'site_funds_dispatched' || job.status === 'booked_at_shop' || job.status === 'approved') {
                    <button 
                      type="button"
                      (click)="updateTrip(job.id, 'inspected_and_loaded')"
                      class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                      <mat-icon class="!text-xs text-teal-400">checklist</mat-icon>
                      <span>1. Inspect & Confirm Cargo Loaded</span>
                    </button>

                    <button 
                      type="button"
                      (click)="startLiveTrip(job.id)"
                      class="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <mat-icon class="!text-xs">play_arrow</mat-icon>
                      <span>2. Start Live Trip (Sends SMS to Shop & Client)</span>
                    </button>
                  } @else if (job.status === 'dispatched') {
                    <button 
                      type="button"
                      (click)="markDelivered(job.id)"
                      class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <mat-icon class="!text-xs">done_all</mat-icon>
                      <span>3. Mark Delivered on Site (Sends SMS to Mgr, Shop & Client)</span>
                    </button>
                  } @else if (job.status === 'delivered_on_site') {
                    <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <mat-icon class="!text-sm">verified</mat-icon>
                      <span>Cargo Handed Over on Site. Technician ready for lock installation.</span>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2 text-slate-400 font-medium text-xs">
                      <mat-icon class="!text-sm">task_alt</mat-icon>
                      <span>Delivery Completed. Installation in progress or finished.</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Job Detail Inspection Modal -->
      @if (inspectingJobId()) {
        <app-job-detail-modal
          [jobId]="inspectingJobId()!"
          (closed)="inspectingJobId.set(null)"
        ></app-job-detail-modal>
      }

      <!-- Rejection Modal -->
      @if (rejectingJobId()) {
        <app-rejection-modal
          [jobId]="rejectingJobId()!"
          [roleTitle]="'Logistics Dispatch Driver'"
          [isDriver]="true"
          (rejected)="handleRejectSubmit($event)"
          (canceled)="rejectingJobId.set(null)"
        ></app-rejection-modal>
      }
    </div>
  `
})
export class DispatcherPortal {
  readonly store = inject(InstallationStore);

  readonly rejectingJobId = signal<string | null>(null);
  readonly inspectingJobId = signal<string | null>(null);
  readonly currentTime = signal<number>(Date.now());
  readonly notificationFeedOpen = signal<boolean>(true);
  readonly notificationFilter = signal<'all' | 'accepted' | 'unread'>('all');
  readonly latestAcceptanceNotice = signal<{
    jobId: string;
    title: string;
    message: string;
    autoAccepted: boolean;
    timestamp: string;
  } | null>(null);

  constructor() {
    setInterval(() => {
      this.currentTime.set(Date.now());

      // Watchdog: Check for pending driver assignments where 10-minute countdown elapsed
      for (const job of this.todayJobs()) {
        if (job.driverAssignmentStatus === 'pending' && job.driverDeadlineAt) {
          const diff = new Date(job.driverDeadlineAt).getTime() - Date.now();
          if (diff <= 0) {
            this.store.autoAcceptDriverAssignment(job.id);
            this.latestAcceptanceNotice.set({
              jobId: job.id,
              title: 'Delivery Run Auto-Accepted (10-Min Window Elapsed)',
              message: `Run ${job.id} (${job.doorModel}) was auto-accepted by the system. Truck manifest is activated for convoy departure.`,
              autoAccepted: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      }
    }, 1000);
  }

  isTodayDelivery(job: InstallationJob): boolean {
    if (job.status === 'dispatched') return true;
    if (job.driverAssignmentStatus === 'pending') return true;

    const todayStr = new Date().toISOString().split('T')[0];
    const sched = (job.scheduledDate || (job as any).scheduledTime || '').toLowerCase().trim();
    if (sched.includes('today')) return true;
    if (sched.includes(todayStr)) return true;

    const parsed = new Date(sched);
    if (!isNaN(parsed.getTime())) {
      if (parsed.toISOString().split('T')[0] === todayStr) return true;
    }

    const updated = (job as any).updatedAt || job.createdAt;
    if (updated && updated.includes(todayStr) && (job.status === 'truck_assigned' || job.status === 'site_funds_dispatched' || job.status === 'booked_at_shop' || job.status === 'approved')) {
      return true;
    }

    return false;
  }

  readonly todayJobs = computed(() =>
    this.store.dispatcherJobs().filter(j => this.isTodayDelivery(j))
  );

  getDriverTimeRemaining(job: InstallationJob): { expired: boolean; text: string; percent: number } {
    if (!job.driverDeadlineAt) return { expired: false, text: '10:00', percent: 100 };
    const deadline = new Date(job.driverDeadlineAt).getTime();
    const diffMs = deadline - this.currentTime();
    if (diffMs <= 0) {
      return { expired: true, text: 'Auto-accepted', percent: 0 };
    }
    const totalMs = 10 * 60 * 1000;
    const percent = Math.max(0, Math.min(100, (diffMs / totalMs) * 100));
    const totalSec = Math.floor(diffMs / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return {
      expired: false,
      text: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
      percent
    };
  }

  readonly activeDispatcher = computed(() => this.store.activeDispatcher());

  readonly pendingLoadingJobs = computed(() => 
    this.store.dispatcherJobs().filter(j => j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || jobMatchesShopApproval(j))
  );

  readonly activeEnRouteJobs = computed(() => 
    this.store.dispatcherJobs().filter(j => j.status === 'dispatched')
  );

  readonly deliveredJobs = computed(() => 
    this.store.dispatcherJobs().filter(j => j.status === 'delivered_on_site' || j.status === 'on_site' || j.status === 'completed')
  );

  // Dispatcher notifications filter
  readonly allDispatcherNotifications = computed(() => {
    const activeDispId = this.store.currentDispatcherId();
    return this.store.notifications().filter(n => {
      if (n.type === 'driver_accepted' || n.type === 'driver_rejected') {
        if (!n.recipientUserId || !activeDispId || n.recipientUserId === activeDispId) return true;
      }
      if (n.recipientRole === 'dispatcher') {
        if (!n.recipientUserId || !activeDispId || n.recipientUserId === activeDispId) return true;
      }
      return false;
    });
  });

  readonly dispatcherNotifications = computed(() => {
    const list = this.allDispatcherNotifications();
    const filter = this.notificationFilter();
    if (filter === 'accepted') {
      return list.filter(n => n.type === 'driver_accepted' || n.title.toLowerCase().includes('accepted'));
    }
    if (filter === 'unread') {
      return list.filter(n => !n.read);
    }
    return list;
  });

  readonly unreadAcceptanceCount = computed(() => {
    return this.allDispatcherNotifications().filter(n => !n.read).length;
  });

  onDispatcherChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.store.currentDispatcherId.set(target.value);
  }

  acceptRun(jobId: string) {
    this.store.respondDriverAssignment(jobId, true);
    const job = this.store.jobs().find(j => j.id === jobId);
    this.latestAcceptanceNotice.set({
      jobId,
      title: 'Delivery Run Confirmed & Accepted by You',
      message: `You confirmed and accepted delivery run for ${job?.doorModel || 'Door'} (${jobId}). SMS dispatch notification sent to Client & Shop.`,
      autoAccepted: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  simulateAutoAccept(jobId: string) {
    this.store.autoAcceptDriverAssignment(jobId);
    const job = this.store.jobs().find(j => j.id === jobId);
    this.latestAcceptanceNotice.set({
      jobId,
      title: 'Delivery Run Auto-Accepted (10-Min Window Elapsed)',
      message: `Run ${jobId} (${job?.doorModel || 'Door'}) was auto-accepted by the system. Truck manifest is activated.`,
      autoAccepted: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  dismissLatestNotice() {
    this.latestAcceptanceNotice.set(null);
  }

  markAllNotificationsRead() {
    this.store.markAllNotificationsRead();
  }

  markNotificationRead(id: string) {
    this.store.markNotificationRead(id);
  }

  onNotificationItemClick(notif: NotificationItem) {
    this.store.markNotificationRead(notif.id);
    if (notif.jobId) {
      this.inspectingJobId.set(notif.jobId);
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

  openRejectModal(jobId: string) {
    this.rejectingJobId.set(jobId);
  }

  handleRejectSubmit(event: { reason: string; details: string; proposedSlot?: string }) {
    const jobId = this.rejectingJobId();
    if (!jobId) return;
    const combinedReason = `${event.reason}${event.details ? ': ' + event.details : ''}`;
    this.store.respondDriverAssignment(jobId, false, combinedReason, event.proposedSlot);
    this.rejectingJobId.set(null);
  }

  startLiveTrip(jobId: string) {
    this.store.startLiveMotion(jobId);
  }

  markDelivered(jobId: string) {
    this.store.markDeliveredByDriver(jobId);
  }

  updateTrip(jobId: string, stage: 'inspected_and_loaded' | 'departed_shop' | 'arrived_on_site' | 'delivered_cargo') {
    if (stage === 'departed_shop') {
      this.store.startLiveMotion(jobId);
    } else if (stage === 'delivered_cargo') {
      this.store.markDeliveredByDriver(jobId);
    } else {
      this.store.updateDispatcherTripStage(jobId, stage);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'dispatched':
        return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-800';
      case 'delivered_on_site':
      case 'on_site':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'truck_assigned':
      case 'site_funds_dispatched':
      case 'approved':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  }
}

function jobMatchesShopApproval(j: InstallationJob): boolean {
  return j.status === 'booked_at_shop' || j.status === 'approved';
}
