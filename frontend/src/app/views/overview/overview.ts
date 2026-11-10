import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { DispatcherProfile, InstallationJob, InstallerTeam, JobStatus, RoleType } from '../../models/installation.model';

@Component({
  selector: 'app-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- =================================================================== -->
      <!-- INSTALLER DASHBOARD TASK NOTIFICATION: ACCEPT IMMEDIATELY OR REJECT -->
      <!-- (Reject option disappears after 10 mins & system auto-accepts)      -->
      <!-- =================================================================== -->
      @if (store.currentRole() === 'installer' && installerPendingAcceptanceJobs().length > 0) {
        <div class="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-400/90 rounded-2xl p-4 sm:p-5 text-white shadow-xl space-y-3.5 animate-in fade-in">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/30 pb-2.5">
            <div class="flex items-center gap-2.5">
              <span class="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
              <h3 class="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                Assigned Installation Task Alert ({{ installerPendingAcceptanceJobs().length }}) · Respond Within 10 Minutes
              </h3>
            </div>
            <span class="text-[11px] font-mono text-amber-200">
              Logged in as: <strong>{{ store.currentUser().name }}</strong> · Auto-accepts on your behalf after 10 mins
            </span>
          </div>

          <div class="grid grid-cols-1 gap-3">
            @for (task of installerPendingAcceptanceJobs(); track task.id) {
              @let remSec = getInstallerRemainingSeconds(task);
              <div class="bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="space-y-1.5">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black font-mono uppercase">
                      {{ task.id }}
                    </span>
                    <span class="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs font-mono font-extrabold flex items-center gap-1">
                      <mat-icon class="!text-xs !w-3.5 !h-3.5 animate-pulse">timer</mat-icon>
                      <span>{{ formatCountdown(remSec) }} left before system auto-accept</span>
                    </span>
                    @if (task.assignedInstallers && task.assignedInstallers.length > 1) {
                      <span class="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-[10px] font-mono font-bold">
                        Team Task ({{ task.assignedInstallers.length }} Installers)
                      </span>
                    }
                  </div>

                  <h4 class="text-sm sm:text-base font-extrabold text-white">
                    {{ task.doorModel }} — {{ task.client.name }}
                  </h4>
                  <p class="text-xs text-slate-300 font-mono">
                    📍 {{ task.client.siteAddress }} · 🗓 Scheduled: {{ task.scheduledDate }} · 📞 {{ task.client.phone }}
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    (click)="acceptInstallerTaskOnOverview(task)"
                    class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">check_circle</mat-icon>
                    <span>Accept Immediately</span>
                  </button>

                  @if (remSec > 0) {
                    <button
                      type="button"
                      (click)="openRejectInstallerTaskModal(task)"
                      class="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <mat-icon class="!text-sm">cancel</mat-icon>
                      <span>Reject ({{ formatCountdown(remSec) }})</span>
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }
      <!-- =================================================================== -->
      <!-- SHOP INSTALLATION REQUESTS AWAITING TRUCK & TECH SETUP QUEUE       -->
      <!-- =================================================================== -->
      @if (store.branchPendingTruckSetupJobs().length > 0 && store.canCurrentRoleAssignInstallers()) {
        <div class="bg-amber-950/20 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl p-3 sm:p-3.5 shadow-xs space-y-2.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <h3 class="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                Action Required: Shop Bookings Awaiting Installation Team ({{ store.branchPendingTruckSetupJobs().length }})
              </h3>
            </div>
            <span class="text-[10px] text-amber-800 dark:text-amber-300 font-mono">
              Assign an installation team · Shop Manager will be notified to select store dispatcher
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            @for (pending of store.branchPendingTruckSetupJobs(); track pending.id) {
              <div class="bg-white dark:bg-slate-900 p-3 rounded-lg border border-amber-200 dark:border-amber-800 shadow-2xs space-y-2">
                <div class="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <div>
                    <span class="font-mono text-[10px] font-extrabold text-amber-700 dark:text-amber-400">{{ pending.id }}</span>
                    <h4 class="font-bold text-slate-900 dark:text-white text-xs leading-tight">{{ pending.doorModel }}</h4>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">{{ pending.dimensions }} · {{ pending.finish }}</p>
                  </div>
                  <span class="text-[9px] uppercase font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                    Booked at Shop
                  </span>
                </div>

                <!-- Client Location & Lock Item Details -->
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span class="text-[9px] text-slate-400 uppercase font-bold block">Client / Site Owner:</span>
                    <p class="font-bold text-slate-900 dark:text-white text-xs leading-tight">{{ pending.client.name }}</p>
                    <p class="text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-0.5 mt-0.5">
                      <mat-icon class="!text-[11px] !w-3 !h-3 text-red-500">place</mat-icon>
                      <span class="truncate">{{ pending.client.siteAddress }}</span>
                    </p>
                    <p class="text-[9px] text-slate-400 font-mono">{{ pending.client.phone }}</p>
                  </div>

                  <div>
                    <span class="text-[9px] text-slate-400 uppercase font-bold block">Lock Hardware:</span>
                    <p class="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 text-xs leading-tight">
                      <mat-icon class="!text-[11px] !w-3 !h-3">lock</mat-icon>
                      <span class="truncate">{{ pending.lockModel || 'Smart Lock' }}</span>
                    </p>
                    @if (pending.shopBooking) {
                      <span class="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        Paid: <strong class="text-cyan-700 dark:text-cyan-400 font-mono">₵{{ pending.shopBooking.amountPaidAtShop.toLocaleString() }}</strong>
                      </span>
                    }
                  </div>
                </div>

                <div class="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5 flex-wrap">
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Date: {{ pending.scheduledDate }}</span>
                    <span class="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      <span class="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>Installer: Pending</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    @if (store.canCurrentRoleAssignInstallers()) {
                      <button 
                        type="button"
                        (click)="openSetupTruckModal(pending)"
                        class="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded-lg transition-all shadow-xs flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        <mat-icon class="!text-[11px] !w-3 !h-3">group_add</mat-icon>
                        <span>Select Team</span>
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- SHOP MANAGER NOTIFICATION: ORDERS AWAITING STORE DISPATCHER         -->
      <!-- (Only unlocked when 1+ installers have accepted / auto-accepted)    -->
      <!-- =================================================================== -->
      @if (store.currentRole() === 'shop_manager' && store.branchPendingDriverJobs().length > 0) {
        <div class="bg-cyan-950/20 dark:bg-cyan-950/40 border border-cyan-400 dark:border-cyan-700/80 rounded-2xl p-4 sm:p-5 shadow-md space-y-4 animate-in fade-in">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-300/40 dark:border-cyan-800 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
              <h3 class="text-xs sm:text-sm font-black text-cyan-950 dark:text-cyan-100 uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-base text-cyan-600 dark:text-cyan-400">local_shipping</mat-icon>
                <span>Notification: Installer Confirmed — Assign Store Dispatch Driver ({{ store.branchPendingDriverJobs().length }} Orders Ready)</span>
              </h3>
            </div>
            <span class="text-[11px] text-cyan-800 dark:text-cyan-300 font-medium">
              Installer confirmed. Select an available Dispatch Driver below to deliver door & hardware to site.
            </span>
          </div>

          <div class="grid grid-cols-1 gap-4">
            @for (pending of store.branchPendingDriverJobs(); track pending.id) {
              <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 shadow-sm space-y-3">
                <div class="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-xs font-black text-cyan-700 dark:text-cyan-400">#{{ pending.id }}</span>
                      <h4 class="font-bold text-slate-900 dark:text-white text-sm leading-tight">{{ pending.doorModel }}</h4>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ pending.dimensions }} · {{ pending.finish }}</p>
                  </div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-700">
                      <mat-icon class="!text-xs !w-3.5 !h-3.5">check_circle</mat-icon>
                      <span>Installer Accepted</span>
                    </span>
                    <span class="inline-flex items-center gap-1 text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 px-2 py-0.5 rounded-lg border border-cyan-300 dark:border-cyan-700">
                      <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      <span>Assign Dispatch Driver</span>
                    </span>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span class="text-[9px] text-slate-400 uppercase font-bold block">Client / Delivery Site:</span>
                    <p class="font-bold text-slate-900 dark:text-white leading-tight">{{ pending.client.name }}</p>
                    <p class="text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <mat-icon class="!text-xs !w-3.5 !h-3.5 text-red-500 shrink-0">place</mat-icon>
                      <span class="truncate">{{ pending.client.siteAddress }}</span>
                    </p>
                    <p class="text-[11px] text-slate-400 font-mono">{{ pending.client.phone }}</p>
                  </div>

                  <div>
                    <span class="text-[9px] text-slate-400 uppercase font-bold block">Scheduled Installation:</span>
                    <p class="font-bold text-slate-800 dark:text-slate-200 font-mono">{{ pending.scheduledDate }} ({{ pending.estimatedHours }}h)</p>
                    <span class="text-slate-600 dark:text-slate-400 block mt-0.5 truncate flex items-center gap-1">
                      <mat-icon class="!text-xs text-emerald-600">verified</mat-icon>
                      <span>Tech: <strong>{{ pending.assignedInstallerName }}</strong></span>
                    </span>
                  </div>

                  <div>
                    <span class="text-[9px] text-slate-400 uppercase font-bold block">Lock & Hardware Spec:</span>
                    <p class="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 leading-tight">
                      <mat-icon class="!text-xs">lock</mat-icon>
                      <span class="truncate">{{ pending.lockModel || 'Smart Lock Set' }}</span>
                    </p>
                    @if (pending.shopBooking) {
                      <span class="text-slate-500 dark:text-slate-400 block mt-0.5 font-mono text-[11px]">
                        Deposit: <strong class="text-cyan-700 dark:text-cyan-400">₵{{ pending.shopBooking.amountPaidAtShop.toLocaleString() }}</strong>
                      </span>
                    }
                  </div>
                </div>

                <!-- Available Dispatch Drivers Section -->
                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <mat-icon class="!text-xs text-cyan-600">groups</mat-icon>
                      <span>Available Dispatch Drivers ({{ availableShopDispatchers().length }} Drivers Ready):</span>
                    </span>
                    <span class="text-[10px] text-slate-400 font-mono">Select a driver below to dispatch</span>
                  </div>

                  <!-- Driver Cards Grid Select -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    @for (disp of availableShopDispatchers(); track disp.id) {
                      <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all flex flex-col justify-between gap-2 shadow-2xs">
                        <div class="flex items-start gap-2 min-w-0">
                          <div class="w-7 h-7 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {{ disp.name.charAt(0) }}
                          </div>
                          <div class="min-w-0 flex-1">
                            <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ disp.name }}</p>
                            <p class="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                              {{ disp.assignedTruck.plate }} · {{ disp.assignedTruck.model }}
                            </p>
                            <p class="text-[10px] text-slate-400 font-mono">{{ disp.phone }}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          (click)="onAssignDriverDirect(pending.id, disp)"
                          class="w-full py-1 px-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-[11px] rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                        >
                          <mat-icon class="!text-xs !w-3 !h-3">local_shipping</mat-icon>
                          <span>Assign Dispatch</span>
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- SHOP MANAGER INFO: ORDERS AWAITING INSTALLER ACCEPTANCE -->
      @if (store.currentRole() === 'shop_manager' && store.branchAwaitingInstallerAcceptanceJobs().length > 0) {
        <div class="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3 shadow-2xs flex items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2">
            <mat-icon class="!text-base text-amber-600 dark:text-amber-400 shrink-0">lock_clock</mat-icon>
            <div>
              <p class="font-bold text-amber-900 dark:text-amber-300 text-xs">
                {{ store.branchAwaitingInstallerAcceptanceJobs().length }} Shop Orders Awaiting Installer Acceptance
              </p>
              <p class="text-[11px] text-amber-700 dark:text-amber-400">
                Dispatch Driver assignment remains locked until assigned installers confirm or 10-minute auto-acceptance elapses.
              </p>
            </div>
          </div>
          <button
            type="button"
            (click)="navigateTo('/shop')"
            class="px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 rounded-lg hover:bg-amber-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            View Shop Registry →
          </button>
        </div>
      }

      <!-- ================================================================= -->
      <!-- PERSPECTIVE SPECIFIC METRICS & HIGHLIGHTS BANNER                 -->
      <!-- ================================================================= -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl shrink-0">
              {{ currentPerspectiveConfig().icon }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base sm:text-lg font-black tracking-tight text-white">
                  {{ currentPerspectiveConfig().title }} Perspective
                </h2>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Role Lens Active
                </span>
              </div>
              <p class="text-xs text-slate-300">
                {{ currentPerspectiveConfig().focusDescription }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              (click)="navigateTo(currentPerspectiveConfig().primaryRoute)"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <mat-icon class="!text-xs">launch</mat-icon>
              <span>{{ currentPerspectiveConfig().primaryRouteLabel }}</span>
            </button>
          </div>
        </div>

        <!-- Role Metric Tiles -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          @for (metric of perspectiveMetrics(); track metric.label) {
            <div class="bg-white/5 hover:bg-white/10 transition-colors p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <span class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {{ metric.label }}
              </span>
              <div class="flex items-baseline gap-1.5 my-1">
                <span class="text-2xl sm:text-3xl font-black font-mono tracking-tight tabular-nums" [class]="metric.colorClass || 'text-white'">
                  {{ metric.value }}
                </span>
                @if (metric.unit) {
                  <span class="text-xs text-slate-400 font-mono">{{ metric.unit }}</span>
                }
              </div>
              <div class="text-[11px] text-slate-300 flex items-center gap-1">
                <mat-icon class="!text-[12px] !w-3 !h-3 text-emerald-400">check_circle</mat-icon>
                <span class="truncate">{{ metric.caption }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- PENDING USER REGISTRATIONS AWAITING ADMINISTRATOR APPROVAL             -->
      <!-- =================================================================== -->
      @if (store.pendingUsers().length > 0 && store.currentRole() === 'admin') {
        <div class="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start sm:items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <mat-icon class="!text-xl">how_to_reg</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">
                  User Registrations Awaiting Administrator Approval ({{ store.pendingUsers().length }})
                </h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                  Action Required
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                New accounts created on sign-up require role assignment and approval in Roles & Governance.
              </p>
            </div>
          </div>

          <button
            type="button"
            (click)="navigateTo('/roles')"
            class="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">manage_accounts</mat-icon>
            <span>Authorize Users (/roles)</span>
          </button>
        </div>
      }

      <!-- =================================================================== -->
      <!-- DEMOGRAPHIC & ACTIVITY CHARTS SECTION ("chats / demographics")     -->
      <!-- =================================================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- CHART 1: LIFECYCLE STAGE DEMOGRAPHIC FUNNEL -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600 dark:text-cyan-400">stacked_bar_chart</mat-icon>
                <span>Installation Lifecycle Demographics</span>
              </h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                Proportional distribution of current doors across lifecycle phases
              </p>
            </div>
            <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {{ store.branchJobs().length }} Active Total
            </span>
          </div>

          <!-- Multi-Color Segmented Progress Bar -->
          <div class="space-y-1.5">
            <div class="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              @for (stage of lifecycleDemographics(); track stage.label) {
                @if (stage.percentage > 0) {
                  <div 
                    [style.width.%]="stage.percentage" 
                    [class]="stage.colorClass"
                    [title]="stage.label + ': ' + stage.count + ' (' + stage.percentage + '%)'"
                    class="h-full transition-all duration-500 hover:opacity-85 cursor-pointer"
                    (click)="setFilter(stage.key)"
                  ></div>
                }
              }
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Intake & Shop Booked</span>
              <span>En Route / On-Site</span>
              <span>100% Verified Pass</span>
            </div>
          </div>

          <!-- Stage Breakdown Demographic Items -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            @for (stage of lifecycleDemographics(); track stage.label) {
              <button
                type="button"
                (click)="setFilter(stage.key)"
                class="p-2.5 rounded-xl border text-left transition-all cursor-pointer group"
                [class]="selectedFilter() === stage.key 
                  ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs' 
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="w-2.5 h-2.5 rounded-full" [class]="stage.badgeColor"></span>
                  <span class="text-xs font-black font-mono tabular-nums">{{ stage.percentage }}%</span>
                </div>
                <div class="text-[11px] font-bold leading-tight truncate">{{ stage.label }}</div>
                <div class="text-[10px] opacity-75 font-mono">{{ stage.count }} doors</div>
              </button>
            }
          </div>
        </div>

        <!-- CHART 2: REGIONAL BRANCH DISTRIBUTION DEMOGRAPHICS -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">location_city</mat-icon>
                <span>{{ store.currentRole() === 'shop_manager' ? 'My Shop Branch Summary' : 'Nationwide Branch Activity Demographics' }}</span>
              </h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                {{ store.currentRole() === 'shop_manager' ? ('Dedicated operations & booked orders for ' + (store.managerBranch()?.shopName || 'your shop')) : "Operations across DoorMaster's 15 regional workshops & showrooms" }}
              </p>
            </div>
            <button
              type="button"
              (click)="navigateTo('/settings')"
              class="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{{ store.currentRole() === 'shop_manager' ? 'Shop Settings' : 'Map All 15' }}</span>
              <mat-icon class="!text-xs">arrow_forward</mat-icon>
            </button>
          </div>

          <!-- Top Branch Demographics List -->
          <div class="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
            @for (branch of branchDemographics(); track branch.id) {
              <div class="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 transition-colors flex items-center justify-between gap-3">
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {{ branch.region.substring(0, 2).toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {{ branch.shopName }}
                    </h4>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {{ branch.city }} · {{ branch.region }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3 shrink-0 text-right">
                  <div>
                    <span class="text-xs font-black font-mono text-slate-900 dark:text-white block tabular-nums">
                      {{ branch.activeJobsCount }} Jobs
                    </span>
                    <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      {{ branch.stockEstimate }} Slabs
                    </span>
                  </div>
                  <button
                    type="button"
                    (click)="navigateTo('/settings')"
                    class="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="View branch GPS on Settings map"
                  >
                    <mat-icon class="!text-xs">map</mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- CHART 3: INSTALLER FORCE & FLEET AVAILABILITY DEMOGRAPHICS -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <mat-icon class="!text-sm text-indigo-600 dark:text-indigo-400">groups</mat-icon>
                <span>Installer Force & Fleet Telematics</span>
              </h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                Signed-in installers, lock specialists, and flatbed transport haulers
              </p>
            </div>
            @if (store.currentRole() !== 'shop_manager') {
              <button
                type="button"
                (click)="navigateTo('/map')"
                class="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              >
                Map →
              </button>
            }
          </div>

          <div class="grid grid-cols-3 gap-2.5 text-center">
            <div class="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
              <span class="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block mb-0.5">Online & Active</span>
              <span class="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                {{ store.signedInInstallers().length }}
              </span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">/ {{ store.installers().length }} Installers</span>
            </div>

            <div class="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80">
              <span class="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 uppercase block mb-0.5">Available Now</span>
              <span class="text-xl font-black font-mono text-cyan-700 dark:text-cyan-400 tabular-nums">
                {{ store.availableInstallers().length }}
              </span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Ready for Locks</span>
            </div>

            <div class="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80">
              <span class="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase block mb-0.5">{{ store.currentRole() === 'shop_manager' ? 'Branch Drivers' : 'Delivery Trucks' }}</span>
              <span class="text-xl font-black font-mono text-amber-700 dark:text-amber-400 tabular-nums">
                {{ store.currentRole() === 'shop_manager' ? store.branchDispatchers().length : store.trucks().length }}
              </span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{{ store.currentRole() === 'shop_manager' ? 'Shop Dispatch' : 'Flatbed Fleet' }}</span>
            </div>
          </div>

          <div class="space-y-2 pt-1 text-xs">
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span class="flex items-center gap-1.5">
                <mat-icon class="!text-xs text-emerald-500">verified</mat-icon>
                <span>6-Point Checklist Compliance Rate:</span>
              </span>
              <strong class="font-mono text-slate-900 dark:text-white">99.4% Pass</strong>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span class="flex items-center gap-1.5">
                <mat-icon class="!text-xs text-amber-500">star</mat-icon>
                <span>Average Client Satisfaction Rating:</span>
              </span>
              <strong class="font-mono text-slate-900 dark:text-white">★ 4.92 / 5.0</strong>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span class="flex items-center gap-1.5">
                <mat-icon class="!text-xs text-indigo-500">timer</mat-icon>
                <span>Mean Installation Turnaround:</span>
              </span>
              <strong class="font-mono text-slate-900 dark:text-white">2.4 Hours / Slab</strong>
            </div>
          </div>
        </div>

        <!-- CHART 4: FINANCIAL CASHFLOW & REVENUE DEMOGRAPHICS (Visible for Manager & Finance) -->
        @if (store.currentRole() === 'manager' || store.currentRole() === 'account_officer') {
          <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">account_balance_wallet</mat-icon>
                  <span>Financial Cashflow & Channel Demographics</span>
                </h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  Deposit collections, installer site mobilization, and ledger balances
                </p>
              </div>
              <button
                type="button"
                (click)="navigateTo('/finance')"
                class="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Accounts Ledger →
              </button>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Total Pipeline Value</span>
                <div class="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                  ₵{{ store.stats().totalOrderValue.toLocaleString() }}
                </div>
                <span class="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Doors & Installation Fees</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span class="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block mb-1">Shop Collections</span>
                <div class="text-xl sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                  ₵{{ store.totalShopCollections().toLocaleString() }}
                </div>
                <span class="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1">Direct Deposits Verified</span>
              </div>
            </div>

            <!-- Channel Share Bars -->
            <div class="space-y-2 pt-1 text-xs">
              <div class="space-y-1">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-slate-600 dark:text-slate-400 font-medium">MTN Mobile Money (54%)</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">₵{{ (store.stats().totalOrderValue * 0.54).toLocaleString('en-US', {maximumFractionDigits: 0}) }}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-amber-400 h-full rounded-full" style="width: 54%"></div>
                </div>
              </div>

              <div class="space-y-1">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-slate-600 dark:text-slate-400 font-medium">Bank Wire & Corporate Transfers (24%)</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">₵{{ (store.stats().totalOrderValue * 0.24).toLocaleString('en-US', {maximumFractionDigits: 0}) }}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-indigo-500 h-full rounded-full" style="width: 24%"></div>
                </div>
              </div>

              <div class="space-y-1">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-slate-600 dark:text-slate-400 font-medium">Telecel Cash & Workshop Counter (22%)</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">₵{{ (store.stats().totalOrderValue * 0.22).toLocaleString('en-US', {maximumFractionDigits: 0}) }}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-red-500 h-full rounded-full" style="width: 22%"></div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>

      <!-- Real-Time Field Pipeline Bar -->
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Active Door Installation Pipeline</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Live operational lifecycle from shop booking & truck setup to verification</p>
          </div>
          
          <button
            type="button"
            (click)="navigateTo('/work')"
            class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <mat-icon class="!text-xs">assignment</mat-icon>
            <span>View All Work Orders (/work)</span>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          @for (stage of pipelineStages; track stage.key) {
            <button 
              type="button"
              class="p-3 rounded-xl border transition-all cursor-pointer text-center block w-full active:scale-95 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              (click)="navigateTo('/work')"
              title="Click to view work orders in this stage"
            >
              <span class="block text-[10px] uppercase font-mono tracking-wider opacity-70 mb-1">{{ stage.label }}</span>
              <span class="text-lg font-black font-mono tabular-nums block">{{ countJobsByStage(stage.key) }}</span>
            </button>
          }
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- INSTALLER REJECT TASK MODAL (ON /overview)                        -->
      <!-- ================================================================= -->
      @if (activeRejectInstallerJob(); as rJob) {
        <div class="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-rose-500/60 shadow-2xl max-w-md w-full p-5 space-y-4 text-xs animate-in zoom-in-95">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                  <mat-icon class="!text-base">cancel</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Reject Installation Task</h3>
                  <p class="text-[11px] text-slate-500 font-mono">{{ rJob.id }} · {{ rJob.client.name }}</p>
                </div>
              </div>
              <button
                type="button"
                (click)="closeRejectInstallerTaskModal()"
                class="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <div class="space-y-3">
              <div>
                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Reason for Rejecting Task *</label>
                <textarea
                  [(ngModel)]="overviewRejectReason"
                  rows="3"
                  placeholder="e.g., Currently completing another installation / schedule conflict..."
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Proposed Alternative Time Slot (Optional)</label>
                <input
                  type="text"
                  [(ngModel)]="overviewProposedSlot"
                  placeholder="e.g., Tomorrow 10:00 AM"
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                (click)="closeRejectInstallerTaskModal()"
                class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                (click)="submitRejectInstallerTaskOnOverview()"
                class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <mat-icon class="!text-sm">send</mat-icon>
                <span>Confirm Rejection (Notify Operations)</span>
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ================================================================= -->
      <!-- SELECT INSTALLATION TEAM MODAL DIALOG (OPERATIONS MANAGER)        -->
      <!-- ================================================================= -->
      @if (activeSetupJob(); as job) {
        <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <mat-icon class="!text-lg text-amber-600 dark:text-amber-400">groups</mat-icon>
                  <span>Select Installation Team</span>
                </h3>
                <p class="text-xs text-slate-500 font-mono mt-0.5">Job Ref: {{ job.id }} · {{ job.doorModel }}</p>
              </div>
              <button 
                type="button"
                (click)="closeSetupModal()"
                class="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Client & Job Spec Summary -->
            <div class="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs grid grid-cols-2 gap-3">
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-bold block">Client & Site Location</span>
                <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                <p class="text-slate-500 truncate">{{ job.client.siteAddress }}</p>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-bold block">Hardware & Booking</span>
                <p class="font-bold text-slate-900 dark:text-white">{{ job.doorModel }} ({{ job.finish }})</p>
                <p class="text-amber-600 dark:text-amber-400 font-mono">{{ job.lockModel || 'Smart Lock' }}</p>
              </div>
            </div>

            <div class="space-y-4 text-xs">
              <!-- Available Installation Teams Grid Cards -->
              <div class="space-y-3">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <mat-icon class="!text-sm text-amber-600 dark:text-amber-400">groups</mat-icon>
                    <span>Available Installation Teams ({{ store.installerTeams().length }} Teams Ready)</span>
                  </span>
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    @if (selectedInstallerIds().length > 0) {
                      {{ selectedInstallerIds().length }} Installer(s) Selected · 10-Min Review Dispatched
                    } @else {
                      Select a Team or Installers Below
                    }
                  </span>
                </div>

                <!-- All Available Teams Grid Select -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  @for (team of store.installerTeams(); track team.id) {
                    <button
                      type="button"
                      (click)="assignTeam(team)"
                      class="p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 active:scale-[0.99]"
                      [class]="isTeamFullySelected(team)
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700'"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase"
                          [class]="team.id.includes('alpha')
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                            : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'">
                          <span>TEAM {{ team.code }}</span>
                          <span>· {{ team.members.length }} Installers</span>
                        </span>
                        @if (isTeamFullySelected(team)) {
                          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                            <mat-icon class="!text-sm !w-4 !h-4">check_circle</mat-icon>
                            <span>Selected</span>
                          </span>
                        } @else {
                          <span class="text-[10px] font-semibold text-slate-400">Click to select</span>
                        }
                      </div>

                      <div>
                        <h4 class="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                          {{ team.name }}
                        </h4>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                          Lead: <strong class="text-slate-900 dark:text-white">{{ team.leadName }}</strong>
                        </p>
                      </div>

                      <div class="flex flex-wrap gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                        @for (member of team.members; track member.id) {
                          <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {{ member.name.split(' (')[0] }}{{ member.position ? ' (' + member.position + ')' : '' }}{{ member.role === 'lead' ? ' ★' : '' }}
                          </span>
                        }
                      </div>
                    </button>
                  }
                </div>
              </div>

              <!-- Customize Individual Installers (Lead + Assistants) -->
              <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label class="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600 dark:text-cyan-400">person_add</mat-icon>
                  <span>Or Customize Team Members (Lead + Assistants)</span>
                </label>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1">
                  @for (installer of store.installers(); track installer.id) {
                    <label
                      class="flex items-center justify-between gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all select-none"
                      [class]="selectedInstallerIds().includes(installer.id)
                        ? 'border-emerald-500/70 bg-emerald-50/70 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <div
                          class="w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0"
                          [class]="selectedInstallerIds().includes(installer.id)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'"
                        >
                          {{ installer.name.charAt(0) }}
                        </div>
                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {{ installer.name }}
                            </span>
                            @if (installer.teamId) {
                              <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded"
                                [class]="installer.teamId.includes('alpha') ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'">
                                {{ installer.teamId.replace('team-', '').toUpperCase() }}{{ installer.teamRole === 'lead' ? ' ★ Lead' : '' }}
                              </span>
                            }
                            @if (selectedInstallerIds()[0] === installer.id) {
                              <span class="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                                Assigned Lead
                              </span>
                            } @else if (selectedInstallerIds().includes(installer.id)) {
                              <span class="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                Asst.
                              </span>
                            }
                          </div>
                          <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                            ★{{ installer.metrics.avgRating }} · {{ installer.isSignedIn ? '🟢 Online' : '⚪ Offline' }}
                          </span>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        [checked]="selectedInstallerIds().includes(installer.id)"
                        (change)="toggleInstallerSelection(installer.id)"
                        class="w-4 h-4 rounded accent-emerald-600 cursor-pointer shrink-0"
                      />
                    </label>
                  }
                </div>
              </div>

              <!-- Modal Actions -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button 
                  type="button"
                  (click)="closeSetupModal()"
                  class="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button 
                  type="button"
                  (click)="confirmInstallerAssignment()"
                  [disabled]="selectedInstallerIds().length === 0"
                  class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <mat-icon class="!text-sm">group_add</mat-icon>
                  <span>Assign Selected Team</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class Overview implements OnDestroy {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  readonly router = inject(Router);

  jobSelected = output<string>();
  newJobOpened = output<void>();
  bonusModalOpened = output<void>();
  manageUsersOpened = output<void>();

  readonly selectedFilter = signal<JobStatus | null>(null);
  readonly activeSetupJob = signal<InstallationJob | null>(null);
  readonly selectedInstallerIds = signal<string[]>([]);
  readonly activeRejectInstallerJob = signal<InstallationJob | null>(null);
  overviewRejectReason = '';
  overviewProposedSlot = '';
  readonly nowTick = signal<number>(Date.now());
  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.store.checkAndAutoAcceptExpiredInstallerAssignments();
    if (typeof window !== 'undefined') {
      this.countdownInterval = setInterval(() => {
        this.nowTick.set(Date.now());
        this.store.checkAndAutoAcceptExpiredInstallerAssignments();
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  // Active Perspective Signal (defaults to active user's current role)
  readonly activePerspective = signal<RoleType>(this.store.currentRole());

  readonly effectivePerspective = computed<RoleType>(() => {
    const role = this.store.currentRole();
    return (role === 'admin' || role === 'manager') ? this.activePerspective() : role;
  });

  readonly selectedTeamId = computed<string>(() => {
    const matched = this.store.installerTeams().find(team => this.isTeamFullySelected(team));
    return matched ? matched.id : '';
  });

  readonly currentPerspectiveConfig = computed(() => {
    const p = this.effectivePerspective();
    switch (p) {
      case 'admin':
        return {
          icon: '👑',
          title: 'System Administrator & Governance',
          focusDescription: 'Super-user oversight: user access authorizations, security governance, all operations resources, and platform administration.',
          primaryRoute: '/roles',
          primaryRouteLabel: 'User & Role Governance (/roles)'
        };
      case 'installer':
        return {
          icon: '🔧',
          title: 'Field Lead Installer',
          focusDescription: 'Direct focus on assigned jobs, site GPS geofence clock-in, 6-point checklist audit, and installation completion.',
          primaryRoute: '/map',
          primaryRouteLabel: 'Map (/map)'
        };
      case 'shop_manager': {
        const ownBranch = this.store.managerBranch();
        const branchTitle = ownBranch ? ownBranch.shopName : 'Showroom & Shop Counter';
        return {
          icon: '🏪',
          title: branchTitle,
          focusDescription: ownBranch
            ? `Exclusive workspace for ${ownBranch.shopName} (${ownBranch.branchCode}): track orders, deposits, deliveries, and notifications created by and for your shop.`
            : 'Direct focus on branch walk-in customer orders, counter MoMo/cash deposits, local slab inventory, and hauler requests.',
          primaryRoute: '/shop',
          primaryRouteLabel: 'Shop Counter POS (/shop)'
        };
      }
      case 'dispatcher':
        return {
          icon: '🚚',
          title: 'Logistics Fleet Dispatcher',
          focusDescription: 'Direct focus on flatbed truck telematics, loading manifests, driver assignments, transit routes, and on-time site arrival.',
          primaryRoute: '/dispatcher',
          primaryRouteLabel: 'Logistics Fleet Portal (/dispatcher)'
        };
      case 'account_officer':
        return {
          icon: '💰',
          title: 'Accounts & Finance Comptroller',
          focusDescription: 'Direct focus on order ledger balances, shop deposit reconciliations, installer site funds dispatch, and bonus approvals.',
          primaryRoute: '/finance',
          primaryRouteLabel: 'Finance & Ledger (/finance)'
        };
      case 'client':
        return {
          icon: '👤',
          title: 'Project Site Client',
          focusDescription: 'Direct focus on ordered door fabrication, live delivery truck location, installer arrival ETA, and digital certificate handover.',
          primaryRoute: '/map',
          primaryRouteLabel: 'Live Delivery Map (/map)'
        };
      default:
        return {
          icon: '🏢',
          title: 'Operations Manager',
          focusDescription: 'Complete operations oversight: installer job allocation, fleet mobilization, bonus approvals, and installation completion.',
          primaryRoute: '/work',
          primaryRouteLabel: 'Manage All Work Orders (/work)'
        };
    }
  });

  // Perspective-tailored metric cards
  readonly perspectiveMetrics = computed(() => {
    const role = this.effectivePerspective();
    const stats = this.store.stats();
    const jobs = this.store.jobs();

    switch (role) {
      case 'admin': {
        return [
          { label: 'System Registered Users', value: this.store.users().length, unit: 'accounts', caption: 'Total user directory', colorClass: 'text-purple-400' },
          { label: 'Pending Approvals', value: this.store.pendingUsers().length, unit: 'users', caption: 'Requires admin action', colorClass: 'text-amber-400' },
          { label: 'Active System Roles', value: this.store.roles().length, unit: 'roles', caption: 'RBAC security matrix', colorClass: 'text-cyan-400' },
          { label: 'Total Contract Value', value: `GH₵${stats.totalOrderValue.toLocaleString()}`, caption: 'Operations volume', colorClass: 'text-emerald-400' }
        ];
      }
      case 'installer': {
        const myJobs = this.installerJobs();
        const completedCount = myJobs.filter(j => j.status === 'completed' || j.status === 'bonus_awarded').length;
        return [
          { label: 'Assigned Site Jobs', value: myJobs.length || '3', unit: 'tasks', caption: 'Active field assignments', colorClass: 'text-emerald-400' },
          { label: 'Site Geofence Status', value: 'Ready', caption: 'GPS Clock-in verified', colorClass: 'text-cyan-400' },
          { label: 'Completed Installations', value: completedCount || '18', unit: 'doors', caption: 'Verified site completions', colorClass: 'text-emerald-400' },
          { label: 'Performance Rating', value: '★4.9', caption: '100% Quality pass rate', colorClass: 'text-white' }
        ];
      }
      case 'shop_manager': {
        const isShopRole = this.store.currentRole() === 'shop_manager';
        const ownBranch = this.store.managerBranch();
        const collections = isShopRole ? this.store.branchShopCollections() : this.store.totalShopCollections();
        const pendingDispatchers = isShopRole ? this.store.branchPendingDriverJobs().length : this.store.shopPendingDriverJobs().length;
        const shopOrderCount = isShopRole ? this.store.branchJobs().length : jobs.length;
        return [
          { label: 'My Shop Deposits', value: `GH₵${collections.toLocaleString()}`, caption: 'MoMo & Cash reconciled', colorClass: 'text-emerald-400' },
          { label: 'My Shop Orders', value: shopOrderCount, unit: 'orders', caption: 'Created by & for this shop', colorClass: 'text-cyan-400' },
          { label: 'Awaiting Dispatcher', value: pendingDispatchers, unit: 'orders', caption: 'Orders pending dispatcher', colorClass: 'text-amber-400' },
          { label: 'Branch Location', value: ownBranch?.city || 'Assigned', caption: ownBranch?.shopName || 'Assigned Shop Branch', colorClass: 'text-white' }
        ];
      }
      case 'dispatcher': {
        const activeTrucks = this.store.trucks().filter(t => t.status === 'in_transit').length;
        const totalTrucks = this.store.trucks().length;
        const pendingDriver = this.store.shopPendingDriverJobs().length;
        return [
          { label: 'En Route Flatbeds', value: activeTrucks || '2', unit: `of ${totalTrucks}`, caption: 'GPS telematics active', colorClass: 'text-cyan-400' },
          { label: 'Cargo Manifests', value: stats.inProgress, unit: 'doors', caption: 'Under transit custody', colorClass: 'text-emerald-400' },
          { label: 'Pending Logistics', value: pendingDriver, unit: 'slabs', caption: 'Awaiting truck dispatch', colorClass: 'text-amber-400' },
          { label: 'Transit ETA Adherence', value: '98.6%', caption: 'On-time delivery record', colorClass: 'text-white' }
        ];
      }
      case 'account_officer': {
        const gross = stats.totalOrderValue;
        const collected = this.store.totalShopCollections();
        const dispatched = this.store.totalSiteFundsDispatched();
        const pendingBonus = stats.pendingBonusApproval;
        return [
          { label: 'Gross Order Pipeline', value: `GH₵${gross.toLocaleString()}`, caption: 'Total contracted revenue', colorClass: 'text-emerald-400' },
          { label: 'Shop Deposits Collected', value: `GH₵${collected.toLocaleString()}`, caption: 'Reconciled in bank ledger', colorClass: 'text-cyan-400' },
          { label: 'Site Funds Dispatched', value: `GH₵${dispatched.toLocaleString()}`, caption: 'Installer mobilization cash', colorClass: 'text-white' },
          { label: 'Bonus Approvals Due', value: pendingBonus, unit: 'claims', caption: 'Installer incentives', colorClass: 'text-amber-400' }
        ];
      }
      case 'client': {
        const clientJobs = this.store.clientJobs();
        const leadTech = clientJobs[0]?.assignedInstallerName || 'Emmanuel Mensah';
        return [
          { label: 'My Ordered Doors', value: clientJobs.length || '1', unit: 'doors', caption: 'High-security architectural slab', colorClass: 'text-emerald-400' },
          { label: 'Installation Stage', value: 'On-Site', caption: 'Installer currently fitting door', colorClass: 'text-cyan-400' },
          { label: 'Lead Installer', value: leadTech, caption: 'DoorMaster Certified Specialist', colorClass: 'text-white' },
          { label: 'Handover Certificate', value: 'Pending', caption: 'Available upon final sign-off', colorClass: 'text-amber-400' }
        ];
      }
      default: {
        return [
          { label: 'Active Field Installations', value: stats.inProgress, unit: 'doors', caption: 'On-site & en route', colorClass: 'text-emerald-400' },
          { label: 'Signed-In Field Installers', value: this.store.signedInInstallers().length, unit: `/${this.store.installers().length}`, caption: 'Active GPS monitored', colorClass: 'text-cyan-400' },
          { label: 'Unassigned Shop Bookings', value: this.store.shopPendingTruckSetupJobs().length, unit: 'queued', caption: 'Requires installer setup', colorClass: 'text-amber-400' },
          { label: 'Total Contract Value', value: `GH₵${stats.totalOrderValue.toLocaleString()}`, caption: '100% Quality pass rate', colorClass: 'text-white' }
        ];
      }
    }
  });

  // Lifecycle Demographics Funnel
  readonly lifecycleDemographics = computed(() => {
    const all = this.store.branchJobs();
    const total = all.length || 1;

    const stages: { key: JobStatus; label: string; count: number; percentage: number; colorClass: string; badgeColor: string }[] = [
      { key: 'booked_at_shop', label: 'Shop Booked', count: 0, percentage: 0, colorClass: 'bg-amber-400', badgeColor: 'bg-amber-400' },
      { key: 'truck_assigned', label: 'Truck & Tech Setup', count: 0, percentage: 0, colorClass: 'bg-teal-500', badgeColor: 'bg-teal-500' },
      { key: 'site_funds_dispatched', label: 'Funds Dispatched', count: 0, percentage: 0, colorClass: 'bg-blue-500', badgeColor: 'bg-blue-500' },
      { key: 'dispatched', label: 'En Route Flatbed', count: 0, percentage: 0, colorClass: 'bg-cyan-500', badgeColor: 'bg-cyan-500' },
      { key: 'delivered_on_site', label: 'On-Site Fitting', count: 0, percentage: 0, colorClass: 'bg-indigo-500', badgeColor: 'bg-indigo-500' },
      { key: 'completed', label: 'Verified Complete', count: 0, percentage: 0, colorClass: 'bg-emerald-500', badgeColor: 'bg-emerald-500' }
    ];

    all.forEach(j => {
      if (j.status === 'booked_at_shop') stages[0].count++;
      else if (j.status === 'truck_assigned' || j.status === 'assigned' || j.status === 'accepted') stages[1].count++;
      else if (j.status === 'site_funds_dispatched') stages[2].count++;
      else if (j.status === 'dispatched') stages[3].count++;
      else if (j.status === 'delivered_on_site' || j.status === 'on_site' || j.status === 'installed_pending_signoff') stages[4].count++;
      else if (j.status === 'completed' || j.status === 'bonus_awarded') stages[5].count++;
    });

    stages.forEach(s => {
      s.percentage = Math.round((s.count / total) * 100);
    });

    return stages;
  });

  // Regional Branch Activity Demographics (Strictly scoped to own branch for shop_manager)
  readonly branchDemographics = computed(() => {
    if (this.store.currentRole() === 'shop_manager') {
      const ownBranch = this.store.managerBranch();
      if (!ownBranch) return [];
      return [
        {
          ...ownBranch,
          activeJobsCount: this.store.branchJobs().length,
          stockEstimate: this.store.doorStats().inStockCount
        }
      ];
    }

    const branches = this.store.branches();
    const jobs = this.store.jobs();

    return branches.map((b, idx) => {
      const activeCount = jobs.filter(j => {
        const matchedBranch = this.store.getJobBranch(j);
        if (matchedBranch) {
          return (matchedBranch.id && matchedBranch.id === b.id) || matchedBranch.branchCode === b.branchCode;
        }
        return false;
      }).length;

      return {
        ...b,
        activeJobsCount: activeCount,
        stockEstimate: 12 + (idx * 3) % 24
      };
    });
  });

  // Current Installer Calculations (Strictly scoped per individual installer)
  readonly currentInstaller = computed(() => {
    const myIds = this.store.resolveActiveInstallerIds();
    const inst = this.store.installers().find(i => myIds.has(i.id));
    return inst || this.store.installers()[0] || null;
  });

  readonly installerJobs = computed(() => {
    return this.store.jobs().filter(j => this.store.isJobAssignedToCurrentInstaller(j));
  });

  readonly installerPendingAcceptanceJobs = computed(() => {
    this.nowTick();
    return this.installerJobs().filter(
      j =>
        this.store.isInstallerPendingAcceptance(j) &&
        j.status !== 'completed' &&
        j.status !== 'bonus_awarded' &&
        this.getInstallerRemainingSeconds(j) > 0
    );
  });

  getInstallerRemainingSeconds(job: InstallationJob): number {
    const now = this.nowTick();
    const member = this.store.getInstallerMemberForJob(job);
    const deadlineStr = member?.deadlineAt || job.installerDeadlineAt;
    if (!deadlineStr) {
      const assignedMs = (member?.assignedAt || job.installerAssignedAt)
        ? new Date(member?.assignedAt || job.installerAssignedAt!).getTime()
        : now;
      return Math.max(0, Math.floor((assignedMs + 10 * 60 * 1000 - now) / 1000));
    }
    const deadlineMs = new Date(deadlineStr).getTime();
    return Math.max(0, Math.floor((deadlineMs - now) / 1000));
  }

  formatCountdown(totalSec: number): string {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  acceptInstallerTaskOnOverview(job: InstallationJob) {
    this.store.respondInstallerAssignment(job.id, true);
  }

  openRejectInstallerTaskModal(job: InstallationJob) {
    if (this.getInstallerRemainingSeconds(job) <= 0) {
      this.store.checkAndAutoAcceptExpiredInstallerAssignments();
      return;
    }
    this.overviewRejectReason = '';
    this.overviewProposedSlot = '';
    this.activeRejectInstallerJob.set(job);
  }

  closeRejectInstallerTaskModal() {
    this.activeRejectInstallerJob.set(null);
    this.overviewRejectReason = '';
    this.overviewProposedSlot = '';
  }

  submitRejectInstallerTaskOnOverview() {
    const job = this.activeRejectInstallerJob();
    if (!job) return;
    if (this.getInstallerRemainingSeconds(job) <= 0) {
      this.closeRejectInstallerTaskModal();
      this.store.checkAndAutoAcceptExpiredInstallerAssignments();
      return;
    }
    const reason = this.overviewRejectReason.trim() || 'Installer unavailable / schedule conflict';
    const slot = this.overviewProposedSlot.trim() || undefined;
    this.store.respondInstallerAssignment(job.id, false, reason, slot);
    this.closeRejectInstallerTaskModal();
  }

  readonly installerBonusEarned = computed(() => {
    return this.installerJobs().reduce((sum, j) => sum + (j.financials.bonusAmount || 0), 0);
  });

  readonly pipelineStages: { key: JobStatus; label: string }[] = [
    { key: 'booked_at_shop', label: 'Shop Booked' },
    { key: 'truck_assigned', label: 'Truck Set Up' },
    { key: 'site_funds_dispatched', label: 'Funds Dispatched' },
    { key: 'dispatched', label: 'En Route' },
    { key: 'delivered_on_site', label: 'Cargo Delivered' },
    { key: 'completed', label: 'Verified Complete' }
  ];

  countJobsByStage(stage: JobStatus): number {
    const role = this.store.currentRole();
    let source: InstallationJob[] = [];

    if (role === 'dispatcher') {
      source = this.store.dispatcherJobs();
    } else if (role === 'installer') {
      source = this.installerJobs();
    } else if (role === 'shop_manager') {
      source = this.store.branchJobs();
    } else if (role === 'client') {
      source = this.store.clientJobs();
    } else {
      source = this.store.jobs();
    }

    return source.filter(j => j.status === stage).length;
  }

  setFilter(stage: JobStatus) {
    if (this.selectedFilter() === stage) {
      this.selectedFilter.set(null);
    } else {
      this.selectedFilter.set(stage);
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  openSetupTruckModal(job: InstallationJob) {
    if (!this.store.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Restricted Action', 'Your role is not authorized to select installation teams.');
      return;
    }
    this.activeSetupJob.set(job);

    if (job.assignedInstallerIds && job.assignedInstallerIds.length > 0) {
      this.selectedInstallerIds.set([...job.assignedInstallerIds]);
    } else if (job.assignedInstallerId) {
      this.selectedInstallerIds.set([job.assignedInstallerId]);
    } else {
      this.selectedInstallerIds.set([]);
    }
  }

  assignTeam(team: InstallerTeam) {
    const orderedIds = [
      team.leadId,
      ...team.memberIds.filter(id => id !== team.leadId)
    ];
    this.selectedInstallerIds.set(orderedIds);
  }

  isTeamFullySelected(team: InstallerTeam): boolean {
    const selected = this.selectedInstallerIds();
    return (
      selected.length === team.memberIds.length &&
      selected[0] === team.leadId &&
      team.memberIds.every(id => selected.includes(id))
    );
  }

  toggleInstallerSelection(techId: string) {
    this.selectedInstallerIds.update(ids => {
      if (ids.includes(techId)) {
        return ids.filter(id => id !== techId);
      }
      return [...ids, techId];
    });
  }

  closeSetupModal() {
    this.activeSetupJob.set(null);
  }

  readonly availableShopDispatchers = computed(() => {
    const branchScoped = this.store.branchDispatchers();
    return branchScoped.length > 0 ? branchScoped : this.store.dispatchers();
  });

  onAssignDriverDirect(jobId: string, disp: DispatcherProfile) {
    if (!this.store.canCurrentRoleSelectDispatcher()) {
      this.alert.warning('Access Restricted', 'Dispatch driver selection is managed exclusively by the Shop Manager.');
      return;
    }
    this.store.assignDispatchDriverByShop(jobId, {
      dispatcherId: disp.id,
      dispatcherName: disp.name,
      truckPlate: disp.assignedTruck.plate,
      truckModel: disp.assignedTruck.model,
      deliveryNotes: 'Direct store counter handover. Padded blankets applied.',
      estimatedDeparture: 'Dispatched from store'
    });
    this.alert.toastSuccess('Dispatcher Assigned', `${disp.name} (${disp.assignedTruck.plate}) assigned to job #${jobId}.`);
  }

  onQuickSelectDispatcher(jobId: string, event: Event) {
    if (!this.store.canCurrentRoleSelectDispatcher()) {
      (event.target as HTMLSelectElement).value = '';
      return;
    }
    const dispatcherId = (event.target as HTMLSelectElement).value;
    if (!dispatcherId) return;
    const disp = this.store.dispatchers().find(d => d.id === dispatcherId);
    if (!disp) return;
    this.store.assignDispatchDriverByShop(jobId, {
      dispatcherId: disp.id,
      dispatcherName: disp.name,
      truckPlate: disp.assignedTruck.plate,
      truckModel: disp.assignedTruck.model,
      deliveryNotes: 'Direct store counter handover. Padded blankets applied.',
      estimatedDeparture: 'Dispatched from store'
    });
    this.alert.toastSuccess('Dispatcher Selected', `${disp.name} (${disp.assignedTruck.plate}) assigned to job ${jobId}.`);
    (event.target as HTMLSelectElement).value = '';
  }

  confirmInstallerAssignment() {
    if (!this.store.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Restricted Action', 'Your role is not authorized to assign installers.');
      this.closeSetupModal();
      return;
    }
    const job = this.activeSetupJob();
    if (!job) return;
    const ids = this.selectedInstallerIds();
    if (ids.length === 0) return;
    const techs = this.store.installers().filter(t => ids.includes(t.id));
    const names = techs.map(t => t.name).join(', ');
    this.store.assignInstallersByManager(job.id, ids);
    this.alert.success('Team Assigned', `${ids.length > 1 ? 'Team' : 'Installer'} (${names}) assigned to job ${job.id}. Notification & SMS dispatched.`);
    this.closeSetupModal();
  }
}
