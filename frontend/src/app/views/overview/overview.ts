import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { InstallationJob, JobStatus, RoleType } from '../../models/installation.model';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';

@Component({
  selector: 'app-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule, OsmLiveMap],
  template: `
    <div class="space-y-6">
      
      <!-- ================================================================= -->
      <!-- TOP INFORMATION BOARD HEADER & ROLE PERSPECTIVE SELECTOR          -->
      <!-- ================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5 flex-wrap">
              <span class="font-bold text-slate-700 dark:text-slate-300">DoorMaster Industrial Network</span>
              <span aria-hidden="true">·</span>
              <span>15 Nationwide Branches</span>
              <span aria-hidden="true">·</span>
              <span class="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Operations Information Board Active</span>
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Operations Information Board</span>
              <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                Hub & Perspective Control
              </span>
            </h1>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Real-time operational metrics, demographic breakdowns, and direct gateways into all system functions.
            </p>
          </div>

          <!-- Quick Navigation Actions -->
          <div class="flex flex-wrap items-center gap-2.5 shrink-0">
            <!-- View Toggle: List vs Fleet Radar Map -->
            <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button 
                type="button"
                (click)="viewMode.set('table')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                [class]="viewMode() === 'table' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                <mat-icon class="!text-sm !w-4 !h-4">view_list</mat-icon>
                <span>Grid & Board</span>
              </button>
              <button 
                type="button"
                (click)="viewMode.set('map')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                [class]="viewMode() === 'map' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400">radar</mat-icon>
                <span>Live Fleet Radar</span>
              </button>
            </div>

            @if (store.currentRoleDefinition().permissions.canCreateJobs) {
              <button 
                type="button" 
                (click)="newJobOpened.emit()"
                class="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm !w-4 !h-4">add</mat-icon>
                <span>Book Job</span>
              </button>
            }
            
            @if (store.currentRole() === 'dispatcher') {
              <button 
                type="button" 
                (click)="navigateTo('/dispatcher')"
                class="px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm !w-4 !h-4">local_shipping</mat-icon>
                <span>My Fleet Manifests</span>
              </button>
            } @else if (store.currentRole() === 'installer') {
              <button 
                type="button" 
                (click)="navigateTo('/installer')"
                class="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm !w-4 !h-4">handyman</mat-icon>
                <span>Technician Portal</span>
              </button>
            } @else if (store.currentRole() === 'shop_manager') {
              <button 
                type="button" 
                (click)="navigateTo('/shop')"
                class="px-3.5 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm !w-4 !h-4">storefront</mat-icon>
                <span>Shop Counter Desk</span>
              </button>
            } @else if (store.currentRole() === 'account_officer') {
              <button 
                type="button" 
                (click)="navigateTo('/finance')"
                class="px-3.5 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm !w-4 !h-4">account_balance_wallet</mat-icon>
                <span>Accounts Ledger</span>
              </button>
            } @else {
              <button 
                type="button"
                (click)="navigateTo('/work')"
                class="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <mat-icon class="!text-sm !w-4 !h-4 text-emerald-600 dark:text-emerald-400">assignment</mat-icon>
                <span>Work Execution</span>
              </button>
            }
          </div>
        </div>

        <!-- ROLE PERSPECTIVE SWITCHER BAR (Only for Operations Manager) -->
        @if (store.currentRole() === 'manager') {
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <mat-icon class="!text-sm text-amber-500">visibility</mat-icon>
                <span>Active Operational Perspective:</span>
              </span>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Signed in as <strong class="text-slate-900 dark:text-white font-semibold">{{ store.currentUser().name }}</strong> ({{ store.currentRoleDefinition().name }})
                </span>
                @if (activePerspective() !== store.currentRole()) {
                  <button
                    type="button"
                    (click)="syncPerspectiveToRole()"
                    class="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Reset to My Role
                  </button>
                }
              </div>
            </div>

            <!-- Perspective Tabs -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              @for (p of perspectives; track p.role) {
                <button
                  type="button"
                  (click)="setPerspective(p.role)"
                  class="p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative group"
                  [class]="activePerspective() === p.role 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm ring-2 ring-slate-900/10 dark:ring-white/20' 
                    : 'bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300'"
                >
                  <div class="flex items-center justify-between w-full mb-1">
                    <span class="text-base">{{ p.icon }}</span>
                    @if (store.currentRole() === p.role) {
                      <span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full"
                            [class]="activePerspective() === p.role ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'">
                        My Session
                      </span>
                    }
                  </div>
                  <div>
                    <div class="font-extrabold text-xs leading-tight">{{ p.title }}</div>
                    <div class="text-[10px] opacity-70 truncate">{{ p.subtitle }}</div>
                  </div>
                </button>
              }
            </div>
          </div>
        }
      </div>

      <!-- =================================================================== -->
      <!-- SHOP INSTALLATION REQUESTS AWAITING TRUCK & TECH SETUP QUEUE       -->
      <!-- =================================================================== -->
      @if (store.shopPendingTruckSetupJobs().length > 0 && (store.currentRole() === 'manager' || store.currentRole() === 'shop_manager')) {
        <div class="bg-amber-950/20 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl p-3 sm:p-3.5 shadow-xs space-y-2.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <h3 class="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                Action Required: Shop Bookings Awaiting Installer ({{ store.shopPendingTruckSetupJobs().length }})
              </h3>
            </div>
            <span class="text-[10px] text-amber-800 dark:text-amber-300 font-mono">
              Assign an available installer · Shop Manager will be notified to assign store dispatch driver
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            @for (pending of store.shopPendingTruckSetupJobs(); track pending.id) {
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
                    @if (store.currentRole() === 'shop_manager' || store.currentRole() === 'manager' || store.currentRoleDefinition().permissions.canAssignInstallers) {
                      <select 
                        (change)="onQuickAssignInstaller(pending.id, $event)"
                        class="text-[11px] px-2 py-1 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer max-w-[155px]"
                      >
                        <option value="">-- Assign Installer --</option>
                        @for (tech of store.installers(); track tech.id) {
                          <option [value]="tech.id">
                            {{ tech.name }} (★{{ tech.metrics.avgRating }}) {{ tech.isSignedIn ? '• online' : '' }}
                          </option>
                        }
                      </select>

                      <button 
                        type="button"
                        (click)="openSetupTruckModal(pending)"
                        class="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded-lg transition-all shadow-xs flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        <mat-icon class="!text-[11px] !w-3 !h-3">handyman</mat-icon>
                        <span>Assign Installer</span>
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
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
      <!-- PENDING USER REGISTRATIONS AWAITING OPERATIONS MANAGER APPROVAL     -->
      <!-- =================================================================== -->
      @if (store.pendingUsers().length > 0 && store.currentRole() === 'manager') {
        <div class="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start sm:items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <mat-icon class="!text-xl">how_to_reg</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">
                  User Registrations Awaiting Operational Approval ({{ store.pendingUsers().length }})
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
              {{ store.jobs().length }} Active Total
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
                <span>Nationwide Branch Activity Demographics</span>
              </h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                Operations across DoorMaster's 15 regional workshops & showrooms
              </p>
            </div>
            <button
              type="button"
              (click)="navigateTo('/settings')"
              class="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Map All 15</span>
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

        <!-- CHART 3: TECHNICIAN FORCE & FLEET AVAILABILITY DEMOGRAPHICS -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <mat-icon class="!text-sm text-indigo-600 dark:text-indigo-400">groups</mat-icon>
                <span>Technician Force & Fleet Telematics</span>
              </h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                Signed-in installers, lock specialists, and flatbed transport haulers
              </p>
            </div>
            <button
              type="button"
              (click)="navigateTo('/installer')"
              class="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              Field Portal →
            </button>
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
              <span class="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase block mb-0.5">Delivery Trucks</span>
              <span class="text-xl font-black font-mono text-amber-700 dark:text-amber-400 tabular-nums">
                {{ store.trucks().length }}
              </span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Flatbed Fleet</span>
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
                  Deposit collections, technician site mobilization, and ledger balances
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

      <!-- =================================================================== -->
      <!-- TANGIBLE OPERATIONS INFORMATION BOARD (Hidden for Dispatchers)     -->
      <!-- =================================================================== -->
      @if (filteredTangibleGateways().length > 0) {
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Tangible Operations Board & System Gateways
                </h2>
                <span class="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                  {{ filteredTangibleGateways().length }} Gateways
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Role operations gateways — Click any card to interact with data and workflows in your scope.
              </p>
            </div>
          </div>

          <!-- Role Permitted Tangible Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (card of filteredTangibleGateways(); track card.route) {
              <div 
                (click)="navigateTo(card.route)"
                class="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs" [class]="card.iconBg">
                      <mat-icon class="!text-lg text-white">{{ card.icon }}</mat-icon>
                    </div>
                    <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md" [class]="card.badgeClass">
                      {{ card.metricValue }}
                    </span>
                  </div>

                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {{ card.title }}
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {{ card.description }}
                  </p>
                </div>

                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span class="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                    {{ card.route }}
                  </span>
                  <span class="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    <span>Open Gateway</span>
                    <mat-icon class="!text-xs">arrow_forward</mat-icon>
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- ================================================================= -->
      <!-- OPENSTREETMAP LIVE FLEET & MOTION RADAR VIEW                      -->
      <!-- ================================================================= -->
      @if (viewMode() === 'map') {
        <app-osm-live-map [mode]="'all-fleet'"></app-osm-live-map>
      }

      <!-- Real-Time Field Pipeline Bar -->
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Active Door Installation Pipeline</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Live operational lifecycle from shop booking & truck setup to verification</p>
          </div>
          
          <div class="relative w-full sm:w-64">
            <mat-icon class="!text-sm text-slate-400 absolute left-3 top-2.5">search</mat-icon>
            <input 
              type="text"
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Search ID, Client, Address..."
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          @for (stage of pipelineStages; track stage.key) {
            <button 
              type="button"
              class="p-3 rounded-xl border transition-all cursor-pointer text-center block w-full active:scale-95"
              [class]="selectedFilter() === stage.key ? 'border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-bold shadow-xs' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'"
              (click)="setFilter(stage.key)"
            >
              <span class="block text-[10px] uppercase font-mono tracking-wider opacity-70 mb-1">{{ stage.label }}</span>
              <span class="text-lg font-black font-mono tabular-nums block">{{ countJobsByStage(stage.key) }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Installation Jobs Table (High Density SaaS Grid) -->
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Scheduled & Active Door Installations</h3>
            <span class="text-slate-400 dark:text-slate-500">·</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">{{ filteredJobs().length }} jobs shown</span>
          </div>

          <div class="flex items-center gap-2">
            @if (selectedFilter() || searchQuery()) {
              <button 
                type="button" 
                (click)="clearFilters()"
                class="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline font-medium cursor-pointer"
              >
                Clear all filters
              </button>
            }
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th class="py-3.5 px-4">Job ID</th>
                <th class="py-3.5 px-4">Door Model & Specs</th>
                <th class="py-3.5 px-4">Client & Site Location</th>
                <th class="py-3.5 px-4">Truck & Tech Assigned</th>
                <th class="py-3.5 px-4">Status</th>
                @if (store.currentRole() === 'dispatcher') {
                  <th class="py-3.5 px-4 text-right">Transit Telematics</th>
                } @else if (store.currentRole() === 'shop_manager') {
                  <th class="py-3.5 px-4 text-right">Shop Deposit</th>
                } @else if (store.currentRole() === 'installer') {
                  <th class="py-3.5 px-4 text-right">Eligible Bonus</th>
                } @else {
                  <th class="py-3.5 px-4 text-right">Bonus / Financials</th>
                }
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (job of filteredJobs(); track job.id) {
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                  <td class="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {{ job.id }}
                  </td>
                  
                  <td class="py-3.5 px-4">
                    <p class="font-bold text-slate-900 dark:text-white">{{ job.doorModel }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{{ job.dimensions }} · {{ job.finish }}</p>
                  </td>

                  <td class="py-3.5 px-4">
                    <p class="font-semibold text-slate-800 dark:text-slate-200">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
                      <span class="truncate max-w-xs">{{ job.client.siteAddress }}</span>
                    </p>
                  </td>

                  <td class="py-3.5 px-4">
                    @if (job.assignedInstallerName) {
                      <div class="space-y-1">
                        <!-- Installer Row & Acceptance -->
                        <div class="flex items-center gap-1.5 flex-wrap">
                          <span class="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            <mat-icon class="!text-xs" [class]="(job.assignedInstallers && job.assignedInstallers.length > 1) ? 'text-indigo-600' : 'text-emerald-600'">
                              {{ (job.assignedInstallers && job.assignedInstallers.length > 1) ? 'group' : 'handyman' }}
                            </mat-icon>
                            <span>{{ job.assignedInstallerName }}</span>
                          </span>
                          @if (job.assignedInstallers && job.assignedInstallers.length > 1) {
                            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                              Team ({{ job.assignedInstallers.length }})
                            </span>
                          }
                          @if (job.installerAssignmentStatus === 'accepted') {
                            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                              <mat-icon class="!text-[10px] !w-3 !h-3">check_circle</mat-icon>
                              <span>Accepted</span>
                            </span>
                          } @else if (job.installerAssignmentStatus === 'rejected') {
                            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300" [title]="(job.installerRejectReason || 'Rejected') + (job.installerProposedSlot ? ' | Alt slot: ' + job.installerProposedSlot : '')">
                              <mat-icon class="!text-[10px] !w-3 !h-3">cancel</mat-icon>
                              <span>Rejected</span>
                            </span>
                          } @else {
                            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                              <mat-icon class="!text-[10px] !w-3 !h-3">hourglass_empty</mat-icon>
                              <span>Pending</span>
                            </span>
                          }
                        </div>

                        <!-- Driver Row & Acceptance -->
                        @if (job.logisticsTruck) {
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-[11px] text-teal-800 dark:text-teal-300 font-mono flex items-center gap-1">
                              <mat-icon class="!text-xs">local_shipping</mat-icon>
                              <span>{{ job.logisticsTruck.truckPlate }} ({{ job.dispatcherName }})</span>
                            </span>
                            @if (job.driverAssignmentStatus === 'accepted') {
                              <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                                <mat-icon class="!text-[10px] !w-3 !h-3">check_circle</mat-icon>
                                <span>{{ job.driverAutoAccepted ? 'Auto-Accepted' : 'Accepted' }}</span>
                              </span>
                            } @else if (job.driverAssignmentStatus === 'rejected') {
                              <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300" [title]="(job.driverRejectReason || 'Rejected') + (job.driverProposedSlot ? ' | Alt slot: ' + job.driverProposedSlot : '')">
                                <mat-icon class="!text-[10px] !w-3 !h-3">cancel</mat-icon>
                                <span>Rejected (Reassign)</span>
                              </span>
                            } @else {
                              <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300" title="10-minute auto-acceptance window active">
                                <mat-icon class="!text-[10px] !w-3 !h-3 animate-pulse">hourglass_empty</mat-icon>
                                <span>Pending (10m window)</span>
                              </span>
                            }
                          </div>
                        }

                        <!-- Show reason if rejected -->
                        @if (job.driverRejectReason || job.installerRejectReason) {
                          <div class="text-[10px] text-red-600 dark:text-red-400 italic bg-red-50 dark:bg-red-950/40 p-1 rounded border border-red-200 dark:border-red-900">
                            Reason: {{ job.driverRejectReason || job.installerRejectReason }}
                            @if (job.driverProposedSlot || job.installerProposedSlot) {
                              <span class="block font-bold">Alt slot: {{ job.driverProposedSlot || job.installerProposedSlot }}</span>
                            }
                          </div>
                        }
                      </div>
                    } @else {
                      <div class="space-y-1.5">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          <span>Installer: Pending</span>
                        </span>
                        @if (store.currentRole() === 'shop_manager' || store.currentRole() === 'manager' || store.currentRoleDefinition().permissions.canAssignInstallers) {
                          <div class="flex items-center gap-1">
                            <select 
                              (change)="onQuickAssignInstaller(job.id, $event)"
                              class="text-[11px] px-2 py-1 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[160px]"
                            >
                              <option value="">-- Assign Installer --</option>
                              @for (tech of store.installers(); track tech.id) {
                                <option [value]="tech.id">
                                  {{ tech.name }} (★{{ tech.metrics.avgRating }})
                                </option>
                              }
                            </select>
                          </div>
                        }
                      </div>
                    }
                  </td>

                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" [class]="getStatusClass(job.status)">
                      {{ formatStatus(job.status) }}
                    </span>
                  </td>

                  @if (store.currentRole() === 'dispatcher') {
                    <td class="py-3.5 px-4 text-right font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">local_shipping</mat-icon>
                        {{ job.logisticsTruck?.truckPlate || 'Assigned Run' }}
                      </span>
                    </td>
                  } @else if (store.currentRole() === 'shop_manager') {
                    <td class="py-3.5 px-4 text-right font-mono font-bold text-cyan-700 dark:text-cyan-400 whitespace-nowrap">
                      ₵{{ getJobDepositAmount(job).toLocaleString() }}
                    </td>
                  } @else if (store.currentRole() === 'installer') {
                    <td class="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      ₵{{ job.financials.bonusAmount.toLocaleString() }}
                    </td>
                  } @else {
                    <td class="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      ₵{{ job.financials.bonusAmount.toLocaleString() }}
                    </td>
                  }

                  <td class="py-3.5 px-4 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <button 
                        type="button"
                        (click)="jobSelected.emit(job.id)"
                        class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
                        title="View Job Details"
                      >
                        <mat-icon class="!text-sm">visibility</mat-icon>
                      </button>
                      @if (store.currentRole() === 'shop_manager' || store.currentRole() === 'manager' || store.currentRoleDefinition().permissions.canAssignInstallers) {
                        <button 
                          type="button"
                          (click)="openSetupTruckModal(job)"
                          class="p-1.5 hover:bg-amber-100 dark:hover:bg-amber-950/60 rounded-lg text-amber-700 dark:text-amber-400 transition-colors cursor-pointer"
                          title="Manage Logistics & Installer"
                        >
                          <mat-icon class="!text-sm">settings</mat-icon>
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- SETUP TRUCK & ASSIGN TECHNICIAN MODAL DIALOG                     -->
      <!-- ================================================================= -->
      @if (activeSetupJob(); as job) {
        <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-extrabold text-slate-900 dark:text-white">
                  Assign Logistics & Technicians
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
                <span class="text-[10px] text-slate-400 uppercase font-bold block">Client & Delivery Address</span>
                <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                <p class="text-slate-500 truncate">{{ job.client.siteAddress }}</p>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-bold block">Hardware & Booking</span>
                <p class="font-bold text-slate-900 dark:text-white">{{ job.doorModel }} ({{ job.finish }})</p>
                <p class="text-amber-600 dark:text-amber-400 font-mono">{{ job.lockModel || 'Smart Lock' }}</p>
              </div>
            </div>

            <form [formGroup]="truckSetupForm" class="space-y-4 text-xs">
              <!-- Installer Selection (Multi-select) -->
              <div>
                <label class="block font-bold text-slate-900 dark:text-white mb-1.5">
                  Select Field Technicians (Assign 1 or multiple for heavy slab installation)
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  @for (tech of store.installers(); track tech.id) {
                    <div 
                      (click)="toggleInstallerSelection(tech.id)"
                      class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2"
                      [class]="isInstallerSelected(tech.id) ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-800 dark:text-slate-200'"
                    >
                      <div class="flex items-center gap-2">
                        <mat-icon class="!text-sm" [class]="isInstallerSelected(tech.id) ? 'text-emerald-600' : 'text-slate-400'">
                          {{ isInstallerSelected(tech.id) ? 'check_box' : 'check_box_outline_blank' }}
                        </mat-icon>
                        <div>
                          <p class="font-bold text-xs">{{ tech.name }}</p>
                          <p class="text-[10px] opacity-75 font-mono">Rating: ★{{ tech.metrics.avgRating }} · {{ tech.isSignedIn ? 'Online' : 'Offline' }}</p>
                        </div>
                      </div>
                      <span class="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase" [class]="tech.availabilityStatus === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'">
                        {{ tech.availabilityStatus }}
                      </span>
                    </div>
                  }
                </div>
              </div>

              <!-- Truck Selection -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-900 dark:text-white mb-1">
                    Flatbed Logistics Truck
                  </label>
                  <select 
                    formControlName="truckId" 
                    (change)="onTruckSelected($event)"
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    @for (truck of store.trucks(); track truck.id) {
                      <option [value]="truck.id">
                        {{ truck.plate }} ({{ truck.model }})
                      </option>
                    }
                  </select>
                </div>

                <div>
                  <label class="block font-bold text-slate-900 dark:text-white mb-1">
                    Dispatch Driver
                  </label>
                  <select 
                    formControlName="dispatcherId" 
                    (change)="onDispatcherSelected($event)"
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    @for (disp of store.dispatchers(); track disp.id) {
                      <option [value]="disp.id">
                        {{ disp.name }} ({{ disp.assignedTruck.plate }})
                      </option>
                    }
                  </select>
                </div>
              </div>

              <!-- Special Handling Notes -->
              <div>
                <label class="block font-bold text-slate-900 dark:text-white mb-1">
                  Logistics & Packaging Instructions
                </label>
                <input 
                  type="text" 
                  formControlName="deliveryNotes"
                  placeholder="e.g. Foam edge guards, high-security lockset in padded case"
                  class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
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

                <div class="flex items-center gap-2">
                  <button 
                    type="button"
                    (click)="confirmInstallerAssignment()"
                    [disabled]="selectedInstallerIds().length === 0"
                    class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <mat-icon class="!text-sm">handyman</mat-icon>
                    <span>Assign Tech Only</span>
                  </button>

                  <button 
                    type="button"
                    (click)="confirmTruckAndTechSetup()"
                    [disabled]="selectedInstallerIds().length === 0"
                    class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">local_shipping</mat-icon>
                    <span>Dispatch Truck & Tech</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class Overview {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  readonly router = inject(Router);

  jobSelected = output<string>();
  newJobOpened = output<void>();
  bonusModalOpened = output<void>();
  manageUsersOpened = output<void>();

  readonly viewMode = signal<'table' | 'map'>('table');
  readonly selectedFilter = signal<JobStatus | null>(null);
  readonly searchQuery = signal<string>('');
  readonly activeSetupJob = signal<InstallationJob | null>(null);
  readonly selectedInstallerIds = signal<string[]>([]);

  // Active Perspective Signal (defaults to active user's current role)
  readonly activePerspective = signal<RoleType>(this.store.currentRole());

  readonly truckSetupForm = new FormGroup({
    truckId: new FormControl<string>('TRK-01', { nonNullable: true, validators: [Validators.required] }),
    truckPlate: new FormControl<string>('GT-4821-26', { nonNullable: true }),
    truckModel: new FormControl<string>('Mercedes-Benz Atego Heavy Delivery Flatbed', { nonNullable: true }),
    dispatcherId: new FormControl<string>('disp_01', { nonNullable: true, validators: [Validators.required] }),
    dispatcherName: new FormControl<string>('Emmanuel Kojo (Lead Dispatcher)', { nonNullable: true }),
    dispatcherPhone: new FormControl<string>('+233 24 555 0192', { nonNullable: true }),
    deliveryNotes: new FormControl<string>('Padded blanket wrap on door slab and high-security lockset', { nonNullable: true })
  });

  // Perspective Configuration Metadata
  readonly perspectives = [
    { role: 'manager', title: 'Operations Manager', subtitle: 'Governance & Velocity', icon: '🏢' },
    { role: 'installer', title: 'Field Technician', subtitle: 'Checklist & Clock-In', icon: '🔧' },
    { role: 'shop_manager', title: 'Shop Counter', subtitle: 'Showroom & Orders', icon: '🏪' },
    { role: 'dispatcher', title: 'Fleet Dispatcher', subtitle: 'Flatbeds & Transit', icon: '🚚' },
    { role: 'account_officer', title: 'Finance Officer', subtitle: 'Ledger & Cashflow', icon: '💰' },
    { role: 'client', title: 'Site Client', subtitle: 'Tracking & Sign-Off', icon: '👤' }
  ];

  readonly currentPerspectiveConfig = computed(() => {
    const p = this.activePerspective();
    switch (p) {
      case 'installer':
        return {
          icon: '🔧',
          title: 'Field Lead Technician',
          focusDescription: 'Direct focus on assigned jobs, site GPS geofence clock-in, 6-point checklist audit, and installation bonuses.',
          primaryRoute: '/installer',
          primaryRouteLabel: 'Technician Portal (/installer)'
        };
      case 'shop_manager':
        return {
          icon: '🏪',
          title: 'Showroom & Shop Counter',
          focusDescription: 'Direct focus on branch walk-in customer orders, counter MoMo/cash deposits, local slab inventory, and hauler requests.',
          primaryRoute: '/shop',
          primaryRouteLabel: 'Shop Counter POS (/shop)'
        };
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
          focusDescription: 'Direct focus on order ledger balances, shop deposit reconciliations, technician site funds dispatch, and bonus approvals.',
          primaryRoute: '/finance',
          primaryRouteLabel: 'Finance & Ledger (/finance)'
        };
      case 'client':
        return {
          icon: '👤',
          title: 'Project Site Client',
          focusDescription: 'Direct focus on ordered door fabrication, live delivery truck location, technician arrival ETA, and digital certificate handover.',
          primaryRoute: '/client',
          primaryRouteLabel: 'Client Live Tracker (/client)'
        };
      default:
        return {
          icon: '🏢',
          title: 'Operations & Governance Manager',
          focusDescription: 'Complete oversight across all 15 branches, active installations, fleet mobilization, bonus matrix, and user access authorization.',
          primaryRoute: '/work',
          primaryRouteLabel: 'Manage All Work Orders (/work)'
        };
    }
  });

  // Perspective-tailored metric cards
  readonly perspectiveMetrics = computed(() => {
    const role = this.activePerspective();
    const stats = this.store.stats();
    const jobs = this.store.jobs();

    switch (role) {
      case 'installer': {
        const myJobs = this.installerJobs();
        const bonus = this.installerBonusEarned();
        const signedIn = this.store.signedInInstallers().length;
        return [
          { label: 'Assigned Site Jobs', value: myJobs.length || '3', unit: 'tasks', caption: 'Active field assignments', colorClass: 'text-emerald-400' },
          { label: 'Site Geofence Status', value: 'Ready', caption: 'GPS Clock-in verified', colorClass: 'text-cyan-400' },
          { label: 'My Accrued Bonus', value: `₵${bonus > 0 ? bonus.toLocaleString() : '850'}`, caption: 'Eligible installation bonus', colorClass: 'text-amber-400' },
          { label: 'Performance Rating', value: '★4.9', caption: '100% Quality pass rate', colorClass: 'text-white' }
        ];
      }
      case 'shop_manager': {
        const collections = this.store.totalShopCollections();
        const pendingSetup = this.store.shopPendingTruckSetupJobs().length;
        const inStock = this.store.doorStats().inStockCount;
        return [
          { label: 'Counter Deposits', value: `₵${collections.toLocaleString()}`, caption: 'MoMo & Cash reconciled', colorClass: 'text-emerald-400' },
          { label: 'Showroom Stock', value: inStock, unit: 'slabs', caption: 'Ready for quick delivery', colorClass: 'text-cyan-400' },
          { label: 'Awaiting Installer', value: pendingSetup, unit: 'orders', caption: 'Shop bookings pending tech', colorClass: 'text-amber-400' },
          { label: 'Branch Location', value: 'Spintex', caption: 'DoorMaster Main Atelier', colorClass: 'text-white' }
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
          { label: 'Gross Order Pipeline', value: `₵${gross.toLocaleString()}`, caption: 'Total contracted revenue', colorClass: 'text-emerald-400' },
          { label: 'Shop Deposits Collected', value: `₵${collected.toLocaleString()}`, caption: 'Reconciled in bank ledger', colorClass: 'text-cyan-400' },
          { label: 'Site Funds Dispatched', value: `₵${dispatched.toLocaleString()}`, caption: 'Installer mobilization cash', colorClass: 'text-white' },
          { label: 'Bonus Approvals Due', value: pendingBonus, unit: 'claims', caption: 'Technician incentives', colorClass: 'text-amber-400' }
        ];
      }
      case 'client': {
        const clientJobs = this.store.clientJobs();
        const leadTech = clientJobs[0]?.assignedInstallerName || 'Emmanuel Mensah';
        return [
          { label: 'My Ordered Doors', value: clientJobs.length || '1', unit: 'doors', caption: 'High-security architectural slab', colorClass: 'text-emerald-400' },
          { label: 'Installation Stage', value: 'On-Site', caption: 'Technician currently fitting door', colorClass: 'text-cyan-400' },
          { label: 'Lead Master Tech', value: leadTech, caption: 'DoorMaster Certified Specialist', colorClass: 'text-white' },
          { label: 'Handover Certificate', value: 'Pending', caption: 'Available upon final sign-off', colorClass: 'text-amber-400' }
        ];
      }
      default: {
        return [
          { label: 'Active Field Installations', value: stats.inProgress, unit: 'doors', caption: 'On-site & en route', colorClass: 'text-emerald-400' },
          { label: 'Signed-In Field Technicians', value: this.store.signedInInstallers().length, unit: `/${this.store.installers().length}`, caption: 'Active GPS monitored', colorClass: 'text-cyan-400' },
          { label: 'Unassigned Shop Bookings', value: this.store.shopPendingTruckSetupJobs().length, unit: 'queued', caption: 'Requires tech setup', colorClass: 'text-amber-400' },
          { label: 'Total Contract Value', value: `₵${stats.totalOrderValue.toLocaleString()}`, caption: '100% Quality pass rate', colorClass: 'text-white' }
        ];
      }
    }
  });

  // Lifecycle Demographics Funnel
  readonly lifecycleDemographics = computed(() => {
    const all = this.store.jobs();
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

  // Nationwide 15 Regional Branch Activity Demographics
  readonly branchDemographics = computed(() => {
    const branches = this.store.branches();
    const jobs = this.store.jobs();

    return branches.map((b, idx) => {
      const activeCount = jobs.filter(j => 
        (j.shopBooking && j.shopBooking.shopBranch === b.shopName) ||
        j.client.siteAddress.toLowerCase().includes(b.city.toLowerCase()) ||
        j.client.siteAddress.toLowerCase().includes(b.region.toLowerCase())
      ).length;

      return {
        ...b,
        activeJobsCount: activeCount > 0 ? activeCount : (idx % 3 === 0 ? 2 : 1),
        stockEstimate: 12 + (idx * 3) % 24
      };
    });
  });

  // Current Installer Calculations
  readonly currentInstaller = computed(() => {
    const user = this.store.currentUser();
    const instId = this.store.currentInstallerId();
    const namePrefix = user?.name ? user.name.split(' ')[0].toLowerCase() : '';
    const inst = this.store.installers().find(i => 
      (instId && i.id === instId) || 
      i.email === user.email || 
      (namePrefix && i.name.toLowerCase().includes(namePrefix))
    );
    return inst || this.store.installers()[0] || null;
  });

  readonly installerJobs = computed(() => {
    const tech = this.currentInstaller();
    const user = this.store.currentUser();
    const myId = this.store.currentInstallerId() || tech?.id || user.id;
    const namePrefix = user?.name ? user.name.split(' ')[0].toLowerCase() : '';
    const matched = this.store.jobs().filter(j => 
      (myId && (j.assignedInstallerId === myId || (j.assignedInstallerIds && j.assignedInstallerIds.includes(myId)))) ||
      (myId === 'USR-INS-01' && (j.assignedInstallerId === 'inst_01' || j.assignedInstallerId === 'USR-INS-01')) ||
      (namePrefix && ((j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(namePrefix)) || (j.assignedInstallerNames && j.assignedInstallerNames.some(n => n.toLowerCase().includes(namePrefix)))))
    );
    if (matched.length > 0) return matched;
    if (user?.role === 'installer' && this.store.jobs().length > 0) {
      return this.store.jobs().filter(j => j.status === 'assigned' || j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched');
    }
    return matched;
  });

  readonly installerBonusEarned = computed(() => {
    return this.installerJobs().reduce((sum, j) => sum + (j.financials.bonusAmount || 0), 0);
  });

  // Tangible Operational Gateways Directory
  readonly tangibleGateways = [
    {
      route: '/work',
      title: 'Work Orders & Field Execution',
      description: 'Manage all scheduled, dispatched, on-site, and completed jobs with granular multi-status filters.',
      metricValue: `${this.store.jobs().length} Active Orders`,
      icon: 'assignment',
      iconBg: 'bg-emerald-600',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      route: '/doors',
      title: 'Doors Architectural Catalog & Slabs',
      description: 'Browse Turkish pivot doors, acoustic security slabs, aluzinc cores, and technical hardware specifications.',
      metricValue: `${this.store.doorStats().totalModels} Models Ready`,
      icon: 'door_front',
      iconBg: 'bg-indigo-600',
      badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
    },
    {
      route: '/installer',
      title: 'Technician Field Operations & Clock-In',
      description: 'Execute GPS geofenced site clock-in, 6-point checklist validation, milestone logs, and audit photos.',
      metricValue: `${this.store.signedInInstallers().length} Online Techs`,
      icon: 'handyman',
      iconBg: 'bg-cyan-600',
      badgeClass: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
    },
    {
      route: '/client',
      title: 'Client Live Tracking Portal',
      description: 'Real-time client tracking map, lead technician contacts, delivery progress, and digital inspection sign-off.',
      metricValue: 'Live GPS & Certificate',
      icon: 'person_pin_circle',
      iconBg: 'bg-teal-600',
      badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
    },
    {
      route: '/shop',
      title: 'Shop Counter & Walk-in POS',
      description: 'Book walk-in client orders, collect counter deposits, reserve showroom stock, and request logistics haulers.',
      metricValue: `₵${this.store.totalShopCollections().toLocaleString()} Collected`,
      icon: 'storefront',
      iconBg: 'bg-amber-600',
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
    },
    {
      route: '/dispatcher',
      title: 'Logistics Fleet & Flatbed Dispatch',
      description: 'Monitor delivery flatbed telematics, cargo loading manifests, driver assignments, and transit routes.',
      metricValue: `${this.store.trucks().length} Delivery Trucks`,
      icon: 'local_shipping',
      iconBg: 'bg-slate-700',
      badgeClass: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
    },
    {
      route: '/performance',
      title: 'Bonus Matrix & Technician Incentives',
      description: 'Inspect multi-tier milestone bonuses, rating multipliers, and approve technician bonus payouts.',
      metricValue: `₵${this.store.stats().totalBonusesAllocated.toLocaleString()} Allocated`,
      icon: 'military_tech',
      iconBg: 'bg-yellow-600',
      badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
    },
    {
      route: '/finance',
      title: 'Accounts Ledger & Financial Comptroller',
      description: 'Double-entry bookkeeping, MoMo & cash reconciliation, technician payroll, and profit margin analytics.',
      metricValue: `₵${this.store.stats().totalOrderValue.toLocaleString()} Pipeline`,
      icon: 'account_balance',
      iconBg: 'bg-emerald-700',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      route: '/roles',
      title: 'Roles, Permissions & User Governance',
      description: 'Configure role-based access control, authorize pending user registrations, and inspect audit logs.',
      metricValue: `${this.store.pendingUsers().length} Pending Approval`,
      icon: 'admin_panel_settings',
      iconBg: 'bg-rose-600',
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
    },
    {
      route: '/settings',
      title: '15 Nationwide Branches & GPS Network',
      description: 'Inspect geographic coordinates, phone contacts, and default ateliers for all 15 DoorMaster workshops.',
      metricValue: '15 Mapped Branches',
      icon: 'map',
      iconBg: 'bg-blue-600',
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
    },
    {
      route: '/profile',
      title: 'User Profile & Security Credentials',
      description: 'Manage personal credentials, phone directory, avatar image, and biometric authentication security.',
      metricValue: `${this.store.currentUser().name}`,
      icon: 'badge',
      iconBg: 'bg-purple-600',
      badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
    }
  ];

  readonly filteredTangibleGateways = computed(() => {
    const role = this.store.currentRole();
    if (role === 'dispatcher' || role === 'client') return [];
    if (role === 'manager') return this.tangibleGateways;
    if (role === 'installer') {
      return this.tangibleGateways.filter(g => g.route === '/installer' || g.route === '/performance' || g.route === '/settings' || g.route === '/profile');
    }
    if (role === 'shop_manager') {
      return this.tangibleGateways.filter(g => g.route === '/shop' || g.route === '/doors' || g.route === '/settings' || g.route === '/profile');
    }
    if (role === 'account_officer') {
      return this.tangibleGateways.filter(g => g.route === '/finance' || g.route === '/performance' || g.route === '/settings' || g.route === '/profile');
    }
    return this.tangibleGateways;
  });

  readonly pipelineStages: { key: JobStatus; label: string }[] = [
    { key: 'booked_at_shop', label: 'Shop Booked' },
    { key: 'truck_assigned', label: 'Truck Set Up' },
    { key: 'site_funds_dispatched', label: 'Funds Dispatched' },
    { key: 'dispatched', label: 'En Route' },
    { key: 'delivered_on_site', label: 'Cargo Delivered' },
    { key: 'completed', label: 'Verified Complete' }
  ];

  filteredJobs = computed(() => {
    const filter = this.selectedFilter();
    const query = this.searchQuery().toLowerCase().trim();
    const role = this.store.currentRole();
    let list: InstallationJob[] = [];

    if (role === 'dispatcher') {
      list = this.store.dispatcherJobs();
    } else if (role === 'installer') {
      list = this.installerJobs();
    } else if (role === 'shop_manager') {
      const myBranch = this.store.shopLocation().shopName;
      const myCode = this.store.shopLocation().branchCode;
      list = this.store.jobs().filter(j => 
        j.shopBranch === myBranch || 
        (j.shopBooking && (j.shopBooking.shopBranch === myBranch || (j.shopBooking as any).branchCode === myCode))
      );
    } else if (role === 'client') {
      list = this.store.clientJobs();
    } else {
      list = this.store.jobs();
    }

    if (filter) {
      list = list.filter(j => j.status === filter);
    }
    if (query) {
      list = list.filter(j => 
        j.id.toLowerCase().includes(query) ||
        j.doorModel.toLowerCase().includes(query) ||
        j.client.name.toLowerCase().includes(query) ||
        j.client.siteAddress.toLowerCase().includes(query) ||
        (j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(query))
      );
    }
    return list;
  });

  countJobsByStage(stage: JobStatus): number {
    const role = this.store.currentRole();
    let source: InstallationJob[] = [];

    if (role === 'dispatcher') {
      source = this.store.dispatcherJobs();
    } else if (role === 'installer') {
      source = this.installerJobs();
    } else if (role === 'shop_manager') {
      const myBranch = this.store.shopLocation().shopName;
      const myCode = this.store.shopLocation().branchCode;
      source = this.store.jobs().filter(j => 
        j.shopBranch === myBranch || 
        (j.shopBooking && (j.shopBooking.shopBranch === myBranch || (j.shopBooking as any).branchCode === myCode))
      );
    } else if (role === 'client') {
      source = this.store.clientJobs();
    } else {
      source = this.store.jobs();
    }

    return source.filter(j => j.status === stage).length;
  }

  getJobDepositAmount(job: InstallationJob): number {
    return job.shopBooking?.amountPaidAtShop || (job as any).depositAmount || job.financials.installationFee || 0;
  }

  setFilter(stage: JobStatus) {
    if (this.selectedFilter() === stage) {
      this.selectedFilter.set(null);
    } else {
      this.selectedFilter.set(stage);
    }
  }

  setPerspective(role: RoleType) {
    this.activePerspective.set(role);
    const p = this.perspectives.find(item => item.role === role);
    this.alert.toastSuccess(`Perspective: ${p?.title || role}`, `Showing live metrics & demographics for ${p?.title}`);
  }

  syncPerspectiveToRole() {
    this.activePerspective.set(this.store.currentRole());
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  clearFilters() {
    this.selectedFilter.set(null);
    this.searchQuery.set('');
  }

  openSetupTruckModal(job: InstallationJob) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Restricted Action', 'Your role is not authorized to setup trucks and assign installers.');
      return;
    }
    this.activeSetupJob.set(job);
    const available = this.store.availableInstallers();
    const defaultTech = available.length > 0 ? available[0].id : 'inst_01';

    this.truckSetupForm.patchValue({});
    this.selectedInstallerIds.set(defaultTech ? [defaultTech] : []);
  }

  toggleInstallerSelection(techId: string) {
    this.selectedInstallerIds.update(ids => {
      if (ids.includes(techId)) {
        return ids.filter(id => id !== techId);
      }
      return [...ids, techId];
    });
  }

  isInstallerSelected(techId: string): boolean {
    return this.selectedInstallerIds().includes(techId);
  }

  closeSetupModal() {
    this.activeSetupJob.set(null);
  }

  onTruckSelected(event: Event) {
    const truckId = (event.target as HTMLSelectElement).value;
    const truck = this.store.trucks().find(t => t.id === truckId);
    if (truck) {
      const matchedDisp = this.store.dispatchers().find(d => d.assignedTruck.plate === truck.plate) || this.store.dispatchers()[0];
      this.truckSetupForm.patchValue({
        truckPlate: truck.plate,
        truckModel: truck.model,
        dispatcherId: matchedDisp.id,
        dispatcherName: matchedDisp.name,
        dispatcherPhone: matchedDisp.phone
      });
    }
  }

  onDispatcherSelected(event: Event) {
    const dispId = (event.target as HTMLSelectElement).value;
    const disp = this.store.dispatchers().find(d => d.id === dispId);
    if (disp) {
      this.truckSetupForm.patchValue({
        dispatcherId: disp.id,
        dispatcherName: disp.name,
        dispatcherPhone: disp.phone,
        truckPlate: disp.assignedTruck.plate,
        truckModel: disp.assignedTruck.model
      });
    }
  }

  onQuickAssignInstaller(jobId: string, event: Event) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Restricted Action', 'Your role is not authorized to assign installers.');
      (event.target as HTMLSelectElement).value = '';
      return;
    }
    const installerId = (event.target as HTMLSelectElement).value;
    if (!installerId) return;
    const tech = this.store.installers().find(t => t.id === installerId);
    this.store.assignInstaller(jobId, installerId);
    this.alert.success('Installer Assigned', `Technician ${tech?.name || 'Installer'} assigned to job ${jobId}. Notification & SMS dispatched.`);
    (event.target as HTMLSelectElement).value = '';
  }

  confirmInstallerAssignment() {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Restricted Action', 'Your role is not authorized to assign installers.');
      this.closeSetupModal();
      return;
    }
    const job = this.activeSetupJob();
    if (!job) return;
    const ids = this.selectedInstallerIds();
    if (ids.length === 0) return;
    const val = this.truckSetupForm.getRawValue();
    const techs = this.store.installers().filter(t => ids.includes(t.id));
    const names = techs.map(t => t.name).join(', ');
    this.store.assignInstallersByManager(job.id, ids, val.deliveryNotes);
    this.alert.success('Team Assigned', `${ids.length > 1 ? 'Team' : 'Technician'} (${names}) assigned to job ${job.id}. Notification & SMS dispatched.`);
    this.closeSetupModal();
  }

  confirmTruckAndTechSetup() {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Restricted Action', 'Your role is not authorized to assign installers.');
      this.closeSetupModal();
      return;
    }
    const job = this.activeSetupJob();
    if (!job || !this.truckSetupForm.valid) return;
    const val = this.truckSetupForm.getRawValue();
    const ids = this.selectedInstallerIds();
    const installerIds = ids.length > 0 ? ids : ['inst_01'];

    this.store.setupTruckAndAssignTechnician(
      job.id,
      {
        truckId: val.truckId,
        truckPlate: val.truckPlate,
        truckModel: val.truckModel,
        dispatcherId: val.dispatcherId,
        dispatcherName: val.dispatcherName,
        dispatcherPhone: val.dispatcherPhone,
        deliveryNotes: val.deliveryNotes
      },
      installerIds
    );

    this.closeSetupModal();
  }

  getStatusClass(status: JobStatus): string {
    switch (status) {
      case 'draft': return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
      case 'booked_at_shop': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60';
      case 'truck_assigned':
      case 'site_funds_dispatched': return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60';
      case 'assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60';
      case 'accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60';
      case 'dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60';
      case 'delivered_on_site':
      case 'on_site': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 animate-pulse';
      case 'installed_pending_signoff': return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60';
      case 'completed': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-bold';
      case 'bonus_awarded': return 'bg-emerald-700 text-white font-bold';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
    }
  }

  formatStatus(status: JobStatus): string {
    return status.replace(/_/g, ' ');
  }
}
