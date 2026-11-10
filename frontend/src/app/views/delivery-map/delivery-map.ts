import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  OnDestroy, 
  computed, 
  effect, 
  inject, 
  output, 
  signal, 
  viewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';
import { 
  InstallationJob, 
  LiveLocation, 
  RoleType, 
  ShopLocationSettings 
} from '../../models/installation.model';
import type * as LType from 'leaflet';

let L: typeof LType | null = null;

export type MapRoleFilter = 'all' | 'installer' | 'dispatcher' | 'shop_manager' | 'client';
export type MapTimeFilter = 'all' | 'today' | 'week' | 'month' | 'year' | 'custom';
export type MapStatusFilter = 'all' | 'live' | 'pending' | 'completed';

export interface RouteStats {
  distanceKm: number;
  durationMin: number;
  summary: string;
  corridor: string;
}

export interface MapUserOption {
  id: string;
  name: string;
  role: string;
  detail?: string;
}

@Component({
  selector: 'app-delivery-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule, MatIconModule],
  template: `
    <div class="space-y-4">
      
      <!-- ================================================================= -->
      <!-- TOP OVERSIGHT HEADER & TELEMETRY KPI BANNER                       -->
      <!-- ================================================================= -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1 flex-wrap">
            <span class="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md"
              [class]="isSuperOversight() ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'">
              <mat-icon class="!text-xs">{{ isSuperOversight() ? 'admin_panel_settings' : 'travel_explore' }}</mat-icon>
              <span>{{ isSuperOversight() ? 'Super-Oversight: Admin & Operations Command' : store.currentRoleDefinition().name + ' Telematics' }}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span class="text-teal-700 dark:text-teal-400 font-bold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              <span>OpenStreetMap Live Road Radar Active</span>
            </span>
            <span aria-hidden="true">·</span>
            <span class="font-mono text-[11px] text-slate-500 dark:text-slate-400">
              Showing {{ filteredJobs().length }} of {{ allScopedJobs().length }} jobs
            </span>
          </div>
          
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Unified Field Operations, Installation & Telematics Map</span>
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Real-time multi-role surveillance across Greater Accra & regional corridors. Live technician attendance, GPS logistics fleet telematics, customer site destinations, and automated shortest-corridor road routing.
          </p>
        </div>

        <!-- KPI Telemetry Badges (Merged from Installer, Client & Fleet) -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Active Live Units (GPS Transmitting) -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold font-mono shadow-2xs">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{{ liveTelemetryUnits().length }} Live Units Active</span>
          </div>

          <!-- Live In Progress / On Route Jobs -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-bold font-mono shadow-2xs">
            <mat-icon class="!text-xs">local_shipping</mat-icon>
            <span>{{ liveOpsCount() }} Live Ops</span>
          </div>

          <!-- Pending Jobs -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold font-mono shadow-2xs">
            <mat-icon class="!text-xs">hourglass_top</mat-icon>
            <span>{{ pendingOpsCount() }} Pending</span>
          </div>

          <!-- Completed Jobs -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold font-mono shadow-2xs">
            <mat-icon class="!text-xs">verified</mat-icon>
            <span>{{ completedOpsCount() }} Completed</span>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- MULTI-ROLE COMPREHENSIVE FILTER & SURVEILLANCE CONTROL BAR        -->
      <!-- ================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3.5">
        
        <!-- Primary Filter Controls: Roles, Staff Users, Lifecycle Status & Search -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <!-- 1. Role Filter -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <mat-icon class="!text-xs text-cyan-600">badge</mat-icon>
              <span>Filter by Role:</span>
            </label>
            <select
              [ngModel]="roleFilter()"
              (ngModelChange)="onRoleFilterChange($event)"
              class="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer shadow-2xs"
            >
              <option value="all">🌐 All Roles & Portals (Omni-View)</option>
              <option value="installer">🛠️ Field Installers (Technicians)</option>
              <option value="dispatcher">🚚 Dispatch Drivers (Logistics Trucks)</option>
              <option value="shop_manager">🏪 Shop Managers (Counter & Workshops)</option>
              <option value="client">👤 Clients & Site Owners</option>
            </select>
          </div>

          <!-- 2. Staff / User Names Filter -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <mat-icon class="!text-xs text-cyan-600">person_search</mat-icon>
              <span>Filter by Staff / User:</span>
            </label>
            <select
              [ngModel]="userFilter()"
              (ngModelChange)="onUserFilterChange($event)"
              class="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer shadow-2xs"
            >
              <option value="all">👥 All Staff & Personnel ({{ userOptions().length }} Available)</option>
              @for (opt of userOptions(); track opt.id) {
                <option [value]="opt.id">
                  {{ opt.name }} ({{ opt.role }}{{ opt.detail ? ' · ' + opt.detail : '' }})
                </option>
              }
            </select>
          </div>

          <!-- 3. Lifecycle Status Filter -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <mat-icon class="!text-xs text-cyan-600">traffic</mat-icon>
              <span>Lifecycle Status:</span>
            </label>
            <div class="inline-flex items-center w-full p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                (click)="setStatusFilter('all')"
                [class]="statusFilter() === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="flex-1 py-1 text-center rounded-lg transition-all cursor-pointer"
              >
                All
              </button>
              <button
                type="button"
                (click)="setStatusFilter('live')"
                [class]="statusFilter() === 'live' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="flex-1 py-1 text-center rounded-lg transition-all cursor-pointer flex items-center justify-center gap-0.5"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                <span>Live</span>
              </button>
              <button
                type="button"
                (click)="setStatusFilter('pending')"
                [class]="statusFilter() === 'pending' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="flex-1 py-1 text-center rounded-lg transition-all cursor-pointer"
              >
                Pending
              </button>
              <button
                type="button"
                (click)="setStatusFilter('completed')"
                [class]="statusFilter() === 'completed' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="flex-1 py-1 text-center rounded-lg transition-all cursor-pointer"
              >
                Completed
              </button>
            </div>
          </div>

          <!-- 4. Text Search Query -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <mat-icon class="!text-xs text-cyan-600">search</mat-icon>
              <span>Search Orders & Sites:</span>
            </label>
            <div class="relative">
              <input
                type="text"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                placeholder="Search order ID, client, tech, truck..."
                class="w-full pl-8 pr-7 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 shadow-2xs"
              />
              <mat-icon class="absolute left-2.5 top-1/2 -translate-y-1/2 !text-xs text-slate-400">search</mat-icon>
              @if (searchQuery()) {
                <button
                  type="button"
                  (click)="searchQuery.set('')"
                  class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <mat-icon class="!text-xs">close</mat-icon>
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Secondary Filter Controls: Timeframe (Today, Week, Month, Year, Datepicker Range) & Layer Toggles -->
        <div class="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <!-- Timeframe Pills + Datepicker Range -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <mat-icon class="!text-xs text-teal-600">calendar_today</mat-icon>
              <span>Timeframe:</span>
            </span>

            <div class="inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                (click)="setTimeFilter('all')"
                [class]="timeFilter() === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                All
              </button>
              <button
                type="button"
                (click)="setTimeFilter('today')"
                [class]="timeFilter() === 'today' ? 'bg-cyan-700 text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                (click)="setTimeFilter('week')"
                [class]="timeFilter() === 'week' ? 'bg-cyan-700 text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Week
              </button>
              <button
                type="button"
                (click)="setTimeFilter('month')"
                [class]="timeFilter() === 'month' ? 'bg-cyan-700 text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Month
              </button>
              <button
                type="button"
                (click)="setTimeFilter('year')"
                [class]="timeFilter() === 'year' ? 'bg-cyan-700 text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Year
              </button>
              <button
                type="button"
                (click)="setTimeFilter('custom')"
                [class]="timeFilter() === 'custom' ? 'bg-cyan-700 text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                Date Range
              </button>
            </div>

            <!-- Datepicker Range Inputs (Visible when Custom Range selected) -->
            @if (timeFilter() === 'custom') {
              <div class="inline-flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs">
                <span class="text-[10px] text-slate-400 font-mono pl-1">From:</span>
                <input
                  type="date"
                  [ngModel]="customStartDate()"
                  (ngModelChange)="customStartDate.set($event)"
                  class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
                <span class="text-[10px] text-slate-400 font-mono">To:</span>
                <input
                  type="date"
                  [ngModel]="customEndDate()"
                  (ngModelChange)="customEndDate.set($event)"
                  class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
                @if (customStartDate() || customEndDate()) {
                  <button
                    type="button"
                    (click)="clearCustomDateRange()"
                    class="p-0.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                    title="Reset date range"
                  >
                    <mat-icon class="!text-xs">close</mat-icon>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Interactive Map Layer Toggles -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Layers:</span>
            
            <button
              type="button"
              (click)="toggleLayer('trucks')"
              class="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer border"
              [class]="showTrucks() ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 border-transparent opacity-60'"
            >
              <span>🚚 Trucks</span>
            </button>

            <button
              type="button"
              (click)="toggleLayer('installers')"
              class="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer border"
              [class]="showInstallers() ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 border-transparent opacity-60'"
            >
              <span>🛠️ Technicians</span>
            </button>

            <button
              type="button"
              (click)="toggleLayer('sites')"
              class="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer border"
              [class]="showSites() ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-800' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 border-transparent opacity-60'"
            >
              <span>📍 Sites</span>
            </button>

            <button
              type="button"
              (click)="toggleLayer('branches')"
              class="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer border"
              [class]="showBranches() ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 border-transparent opacity-60'"
            >
              <span>🏪 Showrooms</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- MANIFEST ORDER CAROUSEL / STRIP (FILTER-SYNCHRONIZED)             -->
      <!-- ================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 shadow-xs space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <mat-icon class="!text-xs text-teal-600">playlist_add_check</mat-icon>
            <span>Plotted Operations & Site Work Orders ({{ todayPlottedJobs().length }})</span>
            <span class="ml-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">Today Only</span>
          </span>
          <span class="text-[11px] text-slate-400">Click any card to focus road routing & telemetry</span>
        </div>

        @if (todayPlottedJobs().length === 0) {
          <div class="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            No installation operations or site work orders scheduled for today.
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            @for (job of todayPlottedJobs(); track job.id) {
              <button
                type="button"
                (click)="selectJob(job.id)"
                class="p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs"
                [class]="selectedJobId() === job.id 
                  ? 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30 dark:ring-teal-400/20 shadow-xs' 
                  : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'"
              >
                <div class="flex items-start justify-between gap-1.5">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="font-mono text-[9px] font-extrabold px-1.5 py-0.2 rounded"
                        [class]="selectedJobId() === job.id ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'">
                        {{ job.id }}
                      </span>
                      
                      <!-- Status Badge -->
                      @if (job.status === 'dispatched') {
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700 flex items-center gap-0.5">
                          <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
                          <span>In Transit</span>
                        </span>
                      } @else if (job.status === 'delivered_on_site' || job.status === 'on_site') {
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-0.5">
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">engineering</mat-icon>
                          <span>On Site</span>
                        </span>
                      } @else if (job.status === 'completed' || job.status === 'bonus_awarded') {
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                          Completed
                        </span>
                      } @else {
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                          Pending
                        </span>
                      }
                    </div>

                    <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate mt-1 leading-tight">{{ job.doorModel }}</h4>
                  </div>

                  <span class="text-[9px] font-mono text-slate-400 shrink-0">
                    {{ job.scheduledDate }}
                  </span>
                </div>

                <div class="space-y-0.5 text-[10px] text-slate-600 dark:text-slate-300">
                  <p class="truncate flex items-center gap-1">
                    <mat-icon class="!text-[11px] !w-3 !h-3 text-red-500 shrink-0">place</mat-icon>
                    <span class="truncate">{{ job.client.name }} · {{ job.client.siteAddress }}</span>
                  </p>
                  <p class="truncate text-slate-400 flex items-center gap-1 font-mono">
                    <mat-icon class="!text-[11px] !w-3 !h-3 text-emerald-500 shrink-0">handyman</mat-icon>
                    <span>Tech: {{ job.assignedInstallerName || 'Ops Queue' }}</span>
                  </p>
                </div>
              </button>
            }
          </div>
        }
      </div>

      <!-- ================================================================= -->
      <!-- MAIN LEAFLET MAP CANVAS CONTAINER & TELEMETRY HUD                 -->
      <!-- ================================================================= -->
      <div class="relative isolate z-0 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
        
        <!-- Top Overlay: Live Routing & Shortest Road HUD -->
        <div class="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          
          <!-- Route Status Pill -->
          <div class="pointer-events-auto flex items-center gap-2.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 text-white text-xs shadow-xl">
            <div class="relative flex items-center justify-center">
              @if (isOffRoute()) {
                <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute opacity-80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500 relative"></span>
              } @else {
                <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 relative"></span>
              }
            </div>

            <div>
              <div class="flex items-center gap-1.5 font-mono text-[11px] font-bold">
                @if (isOffRoute()) {
                  <span class="text-rose-400 animate-pulse font-black uppercase">⚠️ OFF-ROUTE DETECTED</span>
                } @else if (hasRerouted()) {
                  <span class="text-teal-400 uppercase">🔄 AUTO RE-ROUTED VIA SHORTEST ROAD</span>
                } @else {
                  <span class="text-emerald-400 uppercase">OPTIMAL SHORTEST ROUTE</span>
                }
                <span class="text-slate-500">·</span>
                <span class="text-slate-300 font-sans truncate max-w-[180px] sm:max-w-xs">
                  @if (selectedJob(); as curJob) {
                    {{ curJob.client.name }} (#{{ curJob.id }})
                  } @else {
                    Select Operation
                  }
                </span>
              </div>
              @if (routeStats()) {
                <p class="text-[10px] text-slate-400 font-mono mt-0.5">
                  <strong class="text-white">{{ routeStats()!.distanceKm }} km</strong> · Est. <strong class="text-white">{{ routeStats()!.durationMin }} mins</strong> · {{ routeStats()!.corridor }}
                </p>
              }
            </div>
          </div>

          <!-- Interactive Testing & Map Action Buttons -->
          <div class="pointer-events-auto flex flex-wrap items-center gap-1.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 text-white text-xs shadow-xl">
            
            <!-- Simulate Deviation (Off-Route) Button -->
            <button
              type="button"
              (click)="simulateOffRouteDeviation()"
              class="px-2.5 py-1.5 bg-amber-600/90 hover:bg-amber-600 text-white font-bold rounded-xl transition-all flex items-center gap-1 text-[11px] cursor-pointer shadow-xs active:scale-95"
              title="Simulate the driver taking an alternate street / detouring off the planned path to test instant automatic re-routing"
            >
              <mat-icon class="!text-xs">alt_route</mat-icon>
              <span class="hidden sm:inline">Simulate Alternate Turn (Off-Route)</span>
              <span class="sm:hidden">Off-Route</span>
            </button>

            <!-- Drive Step (Advance along route) -->
            <button
              type="button"
              (click)="simulateAdvanceAlongRoute()"
              class="px-2.5 py-1.5 bg-teal-600/90 hover:bg-teal-600 text-white font-bold rounded-xl transition-all flex items-center gap-1 text-[11px] cursor-pointer shadow-xs active:scale-95"
              title="Step forward along the shortest route toward the customer site"
            >
              <mat-icon class="!text-xs">play_arrow</mat-icon>
              <span class="hidden sm:inline">Advance Step</span>
            </button>

            <!-- Recalculate Route -->
            <button
              type="button"
              (click)="recalculateCurrentRoute()"
              class="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Re-query Shortest Road Path"
              aria-label="Recalculate Route"
            >
              <mat-icon class="!text-sm">refresh</mat-icon>
            </button>

            <!-- Center on Driver -->
            <button
              type="button"
              (click)="centerOnRider()"
              class="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Center Map on Driver Position"
              aria-label="Center Map on Driver"
            >
              <mat-icon class="!text-sm">my_location</mat-icon>
            </button>

            <!-- Fit Full Route -->
            <button
              type="button"
              (click)="fitRouteBounds()"
              class="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Fit Full Route & Waypoints in View"
              aria-label="Fit Full Route"
            >
              <mat-icon class="!text-sm">crop_free</mat-icon>
            </button>
          </div>
        </div>

        <!-- LEAFLET MAP ELEMENT -->
        <div class="relative w-full h-[480px] sm:h-[580px] lg:h-[650px] bg-slate-950">
          <div #mapContainer class="relative w-full h-full bg-slate-950 z-0"></div>
        </div>

        <!-- ================================================================= -->
        <!-- BOTTOM FLOATING HUD: MERGED FROM INSTALLER & CLIENT PORTALS       -->
        <!-- ================================================================= -->
        @if (selectedJob()) {
          @let j = selectedJob()!;
          <div class="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-2xl z-10 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-700/80 p-4 rounded-2xl shadow-2xl text-white space-y-3 animate-in fade-in">
            
            <!-- Live Deviation / Re-routing Alert Toast -->
            @if (rerouteToast()) {
              <div class="p-2.5 bg-teal-950/90 border border-teal-500 rounded-xl flex items-center justify-between gap-2 text-xs text-teal-200 animate-bounce">
                <div class="flex items-center gap-2">
                  <mat-icon class="!text-sm text-teal-400">autorenew</mat-icon>
                  <span>{{ rerouteToast() }}</span>
                </div>
                <button type="button" (click)="rerouteToast.set(null)" class="text-teal-400 hover:text-white">
                  <mat-icon class="!text-xs">close</mat-icon>
                </button>
              </div>
            }

            <!-- Destination & Target Cargo Details -->
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-400/30">
                    Operation #{{ j.id }}
                  </span>
                  <span class="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {{ j.doorCategory || 'Pivot Door' }}
                  </span>
                </div>

                <h3 class="text-sm sm:text-base font-extrabold text-white truncate mt-1">
                  {{ j.client.name }} · {{ j.doorModel }}
                </h3>
                <p class="text-xs text-slate-300 truncate flex items-center gap-1 mt-0.5">
                  <mat-icon class="!text-xs text-red-400">place</mat-icon>
                  <span>{{ j.client.siteAddress }}</span>
                </p>
                <p class="text-[11px] text-slate-400 mt-0.5 font-mono">
                  Dimensions: {{ j.dimensions }} · Lock: {{ j.lockModel || 'Smart Lock' }}
                </p>
              </div>

              <!-- Quick Client Call Button (from Client Portal) -->
              <div class="flex items-center gap-1.5 shrink-0">
                <a 
                  [href]="'tel:' + j.client.phone" 
                  class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Call Customer Site"
                >
                  <mat-icon class="!text-xs text-teal-400">phone</mat-icon>
                  <span class="hidden sm:inline">Call Client</span>
                </a>

                <button
                  type="button"
                  (click)="jobSelected.emit(j.id)"
                  class="px-2.5 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                  title="Open Full Operational Work Order Modal"
                >
                  <mat-icon class="!text-xs">visibility</mat-icon>
                  <span class="hidden sm:inline">Inspect Order</span>
                </button>
              </div>
            </div>

            <!-- Merged Logic Strip 1: Technician Site Attendance & Checklist (from installer-portal) -->
            <div class="bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="space-y-0.5">
                <span class="text-[9px] uppercase font-bold text-slate-400 block flex items-center gap-1">
                  <mat-icon class="!text-[11px] !w-3 !h-3 text-emerald-400">handyman</mat-icon>
                  <span>Installation Team:</span>
                </span>
                <p class="font-bold text-white text-xs truncate">
                  {{ j.assignedInstallerName || 'Operations Queue (Unassigned)' }}
                </p>
                <div class="flex items-center gap-1.5 text-[10px] font-mono">
                  <span class="px-1.5 py-0.2 rounded font-bold"
                    [class]="j.installerAssignmentStatus === 'accepted' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'">
                    {{ j.installerAssignmentStatus === 'accepted' ? (j.installerAutoAccepted ? 'Auto-Accepted' : 'Accepted') : 'Pending Acceptance' }}
                  </span>
                  <span class="text-slate-400">· Scheduled: {{ j.scheduledDate }}</span>
                </div>
              </div>

              <div class="space-y-0.5">
                <span class="text-[9px] uppercase font-bold text-slate-400 block flex items-center gap-1">
                  <mat-icon class="!text-[11px] !w-3 !h-3 text-cyan-400">local_shipping</mat-icon>
                  <span>Logistics Truck & Dispatch:</span>
                </span>
                <p class="font-bold text-white text-xs truncate">
                  {{ j.dispatcherName || 'Pending Store Dispatcher' }}
                </p>
                <p class="text-[10px] text-slate-400 font-mono truncate">
                  {{ j.logisticsTruck?.truckPlate ? j.logisticsTruck?.truckPlate + ' (' + (j.logisticsTruck?.truckModel || 'Truck') + ')' : 'No truck assigned yet' }}
                </p>
              </div>
            </div>

            <!-- Merged Logic Strip 2: Shortest Distance, Driving Time & Route Corridor -->
            <div class="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div class="bg-slate-800/60 p-2 rounded-xl">
                <span class="text-[9px] text-slate-400 uppercase block">Shortest Distance</span>
                <strong class="text-sm text-teal-400 font-black tabular-nums">
                  {{ routeStats()?.distanceKm || '—' }} km
                </strong>
              </div>
              <div class="bg-slate-800/60 p-2 rounded-xl">
                <span class="text-[9px] text-slate-400 uppercase block">Est. Driving Time</span>
                <strong class="text-sm text-white font-black tabular-nums">
                  {{ routeStats()?.durationMin || '—' }} mins
                </strong>
              </div>
              <div class="bg-slate-800/60 p-2 rounded-xl">
                <span class="text-[9px] text-slate-400 uppercase block">Route Corridor</span>
                <strong class="text-xs text-slate-300 truncate block">
                  {{ routeStats()?.corridor || 'Accra Primary Arterial' }}
                </strong>
              </div>
            </div>

            <!-- Direct Trip Lifecycle Controls Directly on Map -->
            <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-800 text-xs">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] text-slate-400 font-mono">Status:</span>
                <span class="font-bold text-[11px] text-teal-400 uppercase">
                  {{ j.status.replace('_', ' ') }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                @if (j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || j.status === 'booked_at_shop' || j.status === 'approved') {
                  <button
                    type="button"
                    (click)="startLiveTrip(j.id)"
                    class="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <mat-icon class="!text-xs">play_arrow</mat-icon>
                    <span>Start Live Trip</span>
                  </button>
                } @else if (j.status === 'dispatched') {
                  <button
                    type="button"
                    (click)="markDelivered(j.id)"
                    class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <mat-icon class="!text-xs">done_all</mat-icon>
                    <span>Mark Delivered on Site</span>
                  </button>
                }
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    ::ng-deep .leaflet-control-zoom {
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      border-radius: 12px !important;
      overflow: hidden;
      margin-top: 65px !important;
      margin-right: 14px !important;
    }
    ::ng-deep .leaflet-control-zoom a {
      background-color: rgba(15, 23, 42, 0.9) !important;
      color: #fff !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    ::ng-deep .leaflet-control-zoom a:hover {
      background-color: rgba(30, 41, 59, 1) !important;
    }
    ::ng-deep .leaflet-control-attribution {
      background: rgba(15, 23, 42, 0.85) !important;
      color: #94a3b8 !important;
      font-size: 9px !important;
      border-top-left-radius: 8px;
      padding: 2px 8px !important;
    }
    ::ng-deep .leaflet-control-attribution a {
      color: #38bdf8 !important;
    }
  `]
})
export class DeliveryMap implements AfterViewInit, OnDestroy {
  readonly store = inject(InstallationStore);
  readonly themeStore = inject(ThemeStore);
  readonly alert = inject(AlertService);

  jobSelected = output<string>();

  private mapEl = viewChild<ElementRef<HTMLDivElement>>('mapContainer');
  private map: LType.Map | null = null;
  private tileLayer: LType.TileLayer | null = null;
  private resizeObserver: ResizeObserver | null = null;

  // Leaflet Layer Collections
  private destinationMarkers = new Map<string, LType.Marker>();
  private branchMarkers = new Map<string, LType.Marker>();
  private liveUnitMarkers = new Map<string, LType.Marker>();
  private riderMarker: LType.Marker | null = null;
  private activeRoutePolyline: LType.Polyline | null = null;
  private offRouteTrailPolyline: LType.Polyline | null = null;

  // Layer Toggles
  readonly showTrucks = signal<boolean>(true);
  readonly showInstallers = signal<boolean>(true);
  readonly showSites = signal<boolean>(true);
  readonly showBranches = signal<boolean>(true);

  // Filters State
  readonly roleFilter = signal<MapRoleFilter>('all');
  readonly userFilter = signal<string>('all');
  readonly timeFilter = signal<MapTimeFilter>('all');
  readonly statusFilter = signal<MapStatusFilter>('all');
  readonly searchQuery = signal<string>('');
  readonly customStartDate = signal<string>('');
  readonly customEndDate = signal<string>('');

  // Selected Job & Telematics State
  readonly selectedJobId = signal<string | null>(null);
  readonly riderPosition = signal<{ lat: number; lng: number }>({ lat: 5.6320, lng: -0.0980 });
  readonly routeStats = signal<RouteStats | null>(null);
  readonly isOffRoute = signal<boolean>(false);
  readonly hasRerouted = signal<boolean>(false);
  readonly rerouteToast = signal<string | null>(null);

  // Planned Route Points & Step Index
  private currentPlannedRoute: [number, number][] = [];
  private stepIndex: number = 0;

  /**
   * Super-Oversight: Admin and Operations Manager can oversee everything across all branches and personnel.
   */
  readonly isSuperOversight = computed(() => {
    const role = this.store.currentRole();
    return role === 'admin' || role === 'manager' || this.store.canCurrentRoleAssignInstallers();
  });

  /**
   * Base scoped jobs depending on role perspective:
   * Admins and Operations Managers oversee all jobs across Ghana.
   * Shop Managers view their shop branch bookings.
   * Dispatchers view their deliveries.
   * Installers view their installations.
   * Clients view their orders.
   */
  readonly allScopedJobs = computed<InstallationJob[]>(() => {
    const role = this.store.currentRole();
    if (this.isSuperOversight()) {
      return this.store.jobs();
    }
    if (role === 'shop_manager') {
      return this.store.branchJobs();
    }
    if (role === 'dispatcher') {
      return this.store.dispatcherJobs();
    }
    if (role === 'installer') {
      return this.store.jobs().filter(j => this.store.isJobAssignedToCurrentInstaller(j));
    }
    if (role === 'client') {
      return this.store.clientJobs();
    }
    return this.store.jobs();
  });

  /**
   * Available staff options for the user filter dropdown.
   */
  readonly userOptions = computed<MapUserOption[]>(() => {
    const options: MapUserOption[] = [];

    // Installers
    this.store.installers().forEach(i => {
      options.push({
        id: i.id,
        name: i.name,
        role: 'Technician',
        detail: i.teamName || 'Field Tech'
      });
    });

    // Dispatchers
    this.store.dispatchers().forEach(d => {
      options.push({
        id: d.id,
        name: d.name,
        role: 'Dispatcher',
        detail: d.assignedTruck.plate
      });
    });

    // Shop Managers
    this.store.branches().forEach(b => {
      options.push({
        id: b.branchCode,
        name: b.managerName,
        role: 'Shop Manager',
        detail: b.shopName.replace('DoorMaster ', '')
      });
    });

    // Clients
    const uniqueClients = new Map<string, string>();
    this.store.jobs().forEach(j => {
      if (j.client && j.client.id && !uniqueClients.has(j.client.id)) {
        uniqueClients.set(j.client.id, j.client.name);
      }
    });
    uniqueClients.forEach((name, id) => {
      options.push({
        id,
        name,
        role: 'Client'
      });
    });

    return options;
  });

  /**
   * Filtered jobs based on role, user name, timeframe (today, week, month, year, datepicker range), status, and search query.
   */
  readonly filteredJobs = computed<InstallationJob[]>(() => {
    const list = this.allScopedJobs();
    const rFilter = this.roleFilter();
    const uFilter = this.userFilter();
    const tFilter = this.timeFilter();
    const sFilter = this.statusFilter();
    const q = this.searchQuery().trim().toLowerCase();
    const startDate = this.customStartDate();
    const endDate = this.customEndDate();

    return list.filter(job => {
      // 1. Role Filter
      if (rFilter !== 'all') {
        if (rFilter === 'installer' && !job.assignedInstallerId && (!job.assignedInstallers || job.assignedInstallers.length === 0)) {
          return false;
        }
        if (rFilter === 'dispatcher' && !job.dispatcherId) {
          return false;
        }
        if (rFilter === 'shop_manager' && !job.shopBranch && !job.shopBooking) {
          return false;
        }
        if (rFilter === 'client' && !job.client) {
          return false;
        }
      }

      // 2. Staff / User Filter
      if (uFilter !== 'all') {
        const matchesInstaller = 
          job.assignedInstallerId === uFilter || 
          (job.assignedInstallerIds && job.assignedInstallerIds.includes(uFilter)) ||
          (job.assignedInstallerName && job.assignedInstallerName.includes(uFilter));
        const matchesDriver = 
          job.dispatcherId === uFilter || 
          (job.dispatcherName && job.dispatcherName.includes(uFilter));
        const matchesClient = 
          job.client?.id === uFilter || 
          job.client?.name === uFilter;
        const matchesShop = 
          (job.shopBooking?.bookedByShopManager && job.shopBooking.bookedByShopManager.includes(uFilter)) ||
          job.shopBranch?.includes(uFilter);

        if (!matchesInstaller && !matchesDriver && !matchesClient && !matchesShop) {
          return false;
        }
      }

      // 3. Status Filter
      if (sFilter !== 'all') {
        const isLive = job.status === 'dispatched' || job.status === 'delivered_on_site' || job.status === 'on_site';
        const isCompleted = job.status === 'installed_pending_signoff' || job.status === 'completed' || job.status === 'bonus_awarded';
        const isPending = !isLive && !isCompleted;

        if (sFilter === 'live' && !isLive) return false;
        if (sFilter === 'pending' && !isPending) return false;
        if (sFilter === 'completed' && !isCompleted) return false;
      }

      // 4. Timeframe Filter (today, week, month, year, custom range)
      if (tFilter !== 'all') {
        if (!this.matchesTimeFilter(job, tFilter, startDate, endDate)) {
          return false;
        }
      }

      // 5. Text Search Query
      if (q) {
        const hay = [
          job.id,
          job.title,
          job.doorModel,
          job.finish,
          job.client?.name,
          job.client?.siteAddress,
          job.assignedInstallerName,
          job.dispatcherName,
          job.logisticsTruck?.truckPlate,
          job.shopBranch
        ].filter(Boolean).join(' ').toLowerCase();

        if (!hay.includes(q)) return false;
      }

      return true;
    });
  });

  /**
   * Operations & Site Work Orders scheduled strictly for TODAY.
   * Rendered in the "Plotted Operations & Site Work Orders" card.
   * Filtered by active role, staff user, lifecycle status, and text search, but strictly restricted to today's tasks.
   */
  readonly todayPlottedJobs = computed<InstallationJob[]>(() => {
    const list = this.allScopedJobs();
    const rFilter = this.roleFilter();
    const uFilter = this.userFilter();
    const sFilter = this.statusFilter();
    const q = this.searchQuery().trim().toLowerCase();

    return list.filter(job => {
      // Must strictly be today's task only
      if (!this.isJobToday(job)) {
        return false;
      }

      // 1. Role Filter
      if (rFilter !== 'all') {
        if (rFilter === 'installer' && !job.assignedInstallerId && (!job.assignedInstallers || job.assignedInstallers.length === 0)) {
          return false;
        }
        if (rFilter === 'dispatcher' && !job.dispatcherId) {
          return false;
        }
        if (rFilter === 'shop_manager' && !job.shopBranch && !job.shopBooking) {
          return false;
        }
        if (rFilter === 'client' && !job.client) {
          return false;
        }
      }

      // 2. Staff / User Filter
      if (uFilter !== 'all') {
        const matchesInstaller = 
          job.assignedInstallerId === uFilter || 
          (job.assignedInstallerIds && job.assignedInstallerIds.includes(uFilter)) ||
          (job.assignedInstallerName && job.assignedInstallerName.includes(uFilter));
        const matchesDriver = 
          job.dispatcherId === uFilter || 
          (job.dispatcherName && job.dispatcherName.includes(uFilter));
        const matchesClient = 
          job.client?.id === uFilter || 
          job.client?.name === uFilter;
        const matchesShop = 
          (job.shopBooking?.bookedByShopManager && job.shopBooking.bookedByShopManager.includes(uFilter)) ||
          job.shopBranch?.includes(uFilter);

        if (!matchesInstaller && !matchesDriver && !matchesClient && !matchesShop) {
          return false;
        }
      }

      // 3. Status Filter
      if (sFilter !== 'all') {
        const isLive = job.status === 'dispatched' || job.status === 'delivered_on_site' || job.status === 'on_site';
        const isCompleted = job.status === 'installed_pending_signoff' || job.status === 'completed' || job.status === 'bonus_awarded';
        const isPending = !isLive && !isCompleted;

        if (sFilter === 'live' && !isLive) return false;
        if (sFilter === 'pending' && !isPending) return false;
        if (sFilter === 'completed' && !isCompleted) return false;
      }

      // 4. Text Search Query
      if (q) {
        const hay = [
          job.id,
          job.title,
          job.doorModel,
          job.finish,
          job.client?.name,
          job.client?.siteAddress,
          job.assignedInstallerName,
          job.dispatcherName,
          job.logisticsTruck?.truckPlate,
          job.shopBranch
        ].filter(Boolean).join(' ').toLowerCase();

        if (!hay.includes(q)) return false;
      }

      return true;
    });
  });

  /**
   * Metrics for the top oversight KPI banner
   */
  readonly liveOpsCount = computed(() => 
    this.filteredJobs().filter(j => j.status === 'dispatched' || j.status === 'on_site' || j.status === 'delivered_on_site').length
  );

  readonly pendingOpsCount = computed(() => 
    this.filteredJobs().filter(j => 
      j.status !== 'dispatched' && 
      j.status !== 'on_site' && 
      j.status !== 'delivered_on_site' && 
      j.status !== 'completed' && 
      j.status !== 'bonus_awarded' &&
      j.status !== 'installed_pending_signoff'
    ).length
  );

  readonly completedOpsCount = computed(() => 
    this.filteredJobs().filter(j => j.status === 'completed' || j.status === 'bonus_awarded' || j.status === 'installed_pending_signoff').length
  );

  /**
   * Live GPS Telematics Units from store
   */
  readonly liveTelemetryUnits = computed<LiveLocation[]>(() => {
    return this.store.liveLocations();
  });

  /**
   * Visible Showrooms & Warehouses
   */
  readonly visibleBranches = computed<ShopLocationSettings[]>(() => {
    if (this.store.currentRole() === 'shop_manager') {
      const own = this.store.managerBranch();
      return own ? [own] : this.store.branches();
    }
    return this.store.branches();
  });

  /**
   * Active En-Route Delivery
   */
  readonly activeEnRouteTrip = computed(() => 
    this.filteredJobs().find(j => j.status === 'dispatched') || null
  );

  /**
   * Currently Selected Job for Routing & HUD
   */
  readonly selectedJob = computed<InstallationJob | null>(() => {
    const selId = this.selectedJobId();
    if (selId) {
      const match = this.filteredJobs().find(j => j.id === selId) || this.allScopedJobs().find(j => j.id === selId);
      if (match) return match;
    }
    const inTransit = this.activeEnRouteTrip();
    if (inTransit) return inTransit;
    return this.todayPlottedJobs()[0] || this.filteredJobs()[0] || null;
  });

  constructor() {
    // Synchronize initial selection & handle filter changes cleanly
    effect(() => {
      const jobs = this.filteredJobs();
      const curSel = this.selectedJobId();
      if (jobs.length === 0) {
        if (curSel !== null) this.selectedJobId.set(null);
      } else if (!curSel || !jobs.some(j => j.id === curSel)) {
        const inTransit = this.activeEnRouteTrip();
        this.selectedJobId.set(inTransit ? inTransit.id : jobs[0].id);
      }
    });

    // Theme changes
    effect(() => {
      this.themeStore.isDark();
      if (this.map) {
        this.updateTileLayer();
      }
    });

    // Re-render markers when filtered jobs, branches, or live units change
    effect(() => {
      this.visibleBranches();
      this.filteredJobs();
      this.liveTelemetryUnits();
      this.showTrucks();
      this.showInstallers();
      this.showSites();
      this.showBranches();

      if (this.map) {
        this.renderAllMapLayers();
      }
    });

    // React when selected job changes -> recalculate shortest route & re-render
    effect(() => {
      const job = this.selectedJob();
      if (job && this.map) {
        this.onJobSelectionChanged(job);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
      this.setupResizeObserver();
    }, 60);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private setupResizeObserver() {
    const container = this.mapEl()?.nativeElement;
    if (!container || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    });
    this.resizeObserver.observe(container);
  }

  private async initMap() {
    if (typeof window === 'undefined') return;
    const container = this.mapEl()?.nativeElement;
    if (!container) return;

    if (!L) {
      try {
        const leafletPkg = await import('leaflet');
        L = ((leafletPkg as unknown as { default?: typeof LType }).default || leafletPkg) as unknown as typeof LType;
      } catch (e) {
        console.error('Failed to load Leaflet:', e);
        return;
      }
    }
    if (!L || !container) return;

    const ownBranch = this.store.currentRole() === 'shop_manager' ? this.store.managerBranch() : null;
    const centerLat = ownBranch?.latitude ?? 5.6200;
    const centerLng = ownBranch?.longitude ?? -0.1800;

    try {
      this.map = L.map(container, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: true,
        attributionControl: true
      });

      this.updateTileLayer();
      this.renderAllMapLayers();

      const job = this.selectedJob();
      if (job) {
        this.onJobSelectionChanged(job);
      } else {
        this.fitAllMarkers();
      }

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 300);
    } catch (e) {
      console.warn('Map initialization notice:', e);
    }
  }

  private updateTileLayer() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer);
    }

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const subdomains = 'abc';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

    this.tileLayer = leaflet.tileLayer(tileUrl, {
      subdomains,
      attribution,
      maxZoom: 19
    }).addTo(this.map);
  }

  /**
   * Master renderer for all map layers: Sites, Live Units, Showrooms & Active Route.
   */
  private renderAllMapLayers() {
    if (!this.map) return;
    this.renderBranchMarkers();
    this.renderDestinationMarkers();
    this.renderLiveUnitMarkers();
  }

  /**
   * Render Showrooms & Regional Warehouses across Ghana
   */
  private renderBranchMarkers() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    this.branchMarkers.forEach(m => this.map?.removeLayer(m));
    this.branchMarkers.clear();

    if (!this.showBranches()) return;

    const branches = this.visibleBranches();
    branches.forEach(b => {
      const isWarehouse = b.shopName.toLowerCase().includes('warehouse') || b.branchCode.includes('WH');
      const badgeIcon = isWarehouse ? '🏭' : '🏪';
      const borderColor = isWarehouse ? '#f59e0b' : '#06b6d4';

      const icon = leaflet.divIcon({
        className: 'custom-shop-hub-icon',
        html: `
          <div style="background:#0f172a; color:#fff; padding:4px 8px; border-radius:10px; font-weight:800; font-size:9.5px; font-family:sans-serif; box-shadow:0 3px 10px rgba(0,0,0,0.5); border:1.5px solid ${borderColor}; display:flex; align-items:center; gap:4px; white-space:nowrap;">
            <span>${badgeIcon}</span>
            <span>${b.shopName.replace('DoorMaster ', '')}</span>
          </div>
        `,
        iconSize: [150, 24],
        iconAnchor: [75, 12]
      });

      const marker = leaflet.marker([b.latitude, b.longitude], { icon })
        .addTo(this.map!)
        .bindPopup(`
          <div style="font-family:sans-serif; padding:3px; min-width:180px;">
            <strong style="color:#0f172a; font-size:12px;">${badgeIcon} ${b.shopName}</strong>
            <p style="color:#475569; font-size:10px; margin:4px 0;">${b.address}</p>
            <p style="color:#0284c7; font-size:10px; font-weight:bold; margin:0;">Phone: ${b.phone}</p>
            <p style="color:#64748b; font-size:9px; margin-top:2px;">Radius: ${b.dispatchRadiusKm} km · ${b.operatingHours}</p>
          </div>
        `);

      this.branchMarkers.set(String(b.id || b.branchCode), marker);
    });
  }

  /**
   * Render customer site destination markers color-coded by lifecycle status
   */
  private renderDestinationMarkers() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    this.destinationMarkers.forEach(m => this.map?.removeLayer(m));
    this.destinationMarkers.clear();

    if (!this.showSites()) return;

    const jobs = this.filteredJobs();
    const currentSel = this.selectedJobId();

    jobs.forEach(j => {
      const coords = this.getJobCoordinates(j);
      const isSelected = j.id === currentSel;
      
      const isDispatched = j.status === 'dispatched';
      const isOnSite = j.status === 'on_site' || j.status === 'delivered_on_site';
      const isCompleted = j.status === 'completed' || j.status === 'bonus_awarded';
      
      let bg = '#d97706'; // Pending: Amber
      let statusLabel = 'PENDING';
      let iconEmoji = '🟡';

      if (isDispatched) {
        bg = '#0284c7'; // Live in transit: Cyan
        statusLabel = 'EN ROUTE';
        iconEmoji = '🚚';
      } else if (isOnSite) {
        bg = '#10b981'; // On site: Emerald
        statusLabel = 'ON SITE';
        iconEmoji = '🛠️';
      } else if (isCompleted) {
        bg = '#8b5cf6'; // Completed: Purple
        statusLabel = 'COMPLETED';
        iconEmoji = '✓';
      }

      if (isSelected) {
        bg = '#0d9488';
      }

      const border = isSelected ? '#5eead4' : '#fff';

      const icon = leaflet.divIcon({
        className: 'custom-dest-pin',
        html: `
          <div style="position:relative; cursor:pointer;">
            ${isSelected ? '<div style="position:absolute; width:46px; height:46px; background:#0d948840; border-radius:50%; top:-11px; left:-11px; animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
            <div style="background:${bg}; color:#fff; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:9.5px; font-family:sans-serif; box-shadow:0 4px 14px rgba(0,0,0,0.5); border:2px solid ${border}; display:flex; align-items:center; gap:4px; white-space:nowrap;">
              <span>${iconEmoji}</span>
              <span>${j.client.name.split(' ')[0]}</span>
              <span style="background:rgba(255,255,255,0.25); color:#fff; font-size:7.5px; padding:1px 3.5px; border-radius:4px; font-weight:900;">${statusLabel}</span>
            </div>
          </div>
        `,
        iconSize: [160, 26],
        iconAnchor: [80, 13]
      });

      const marker = leaflet.marker([coords.lat, coords.lng], { icon })
        .addTo(this.map!)
        .on('click', () => {
          this.selectJob(j.id);
        });

      this.destinationMarkers.set(j.id, marker);
    });
  }

  /**
   * Render active live GPS transmitting units (Dispatchers & Technicians)
   */
  private renderLiveUnitMarkers() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    this.liveUnitMarkers.forEach(m => this.map?.removeLayer(m));
    this.liveUnitMarkers.clear();

    const units = this.liveTelemetryUnits();

    units.forEach(u => {
      const isDriver = u.role === 'dispatcher';
      const isTech = u.role === 'installer';

      if (isDriver && !this.showTrucks()) return;
      if (isTech && !this.showInstallers()) return;

      const bgColor = isDriver ? '#0284c7' : '#10b981';
      const symbol = isDriver ? '🚚' : '🛠️';
      const roleLabel = isDriver ? 'Truck Fleet' : 'Technician';

      const icon = leaflet.divIcon({
        className: 'custom-live-unit-pin',
        html: `
          <div style="position:relative; cursor:pointer;" title="${u.userName || 'Field Unit'} (${roleLabel})">
            <div style="position:absolute; width:40px; height:40px; background:${bgColor}33; border-radius:50%; top:-8px; left:-8px; animation:ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="background:${bgColor}; color:#fff; width:26px; height:26px; border-radius:50%; border:2px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 12px rgba(0,0,0,0.5); font-size:12px;">
              ${symbol}
            </div>
            <div style="background:rgba(15,23,42,0.92); color:#fff; font-size:8.5px; font-family:monospace; font-weight:bold; padding:2px 6px; border-radius:5px; border:1px solid rgba(255,255,255,0.25); white-space:nowrap; position:absolute; left:30px; top:2px;">
              ${u.userName ? u.userName.split(' ')[0] : roleLabel} · ${u.speedKmh ? u.speedKmh + ' km/h' : 'Live'}
            </div>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = leaflet.marker([u.latitude, u.longitude], { icon })
        .addTo(this.map!)
        .bindPopup(`
          <div style="font-family:sans-serif; padding:2px;">
            <strong style="color:#0f172a; font-size:12px;">${symbol} ${u.userName || 'Field Staff'}</strong>
            <p style="color:#475569; font-size:10px; margin:3px 0;">Role: <strong>${roleLabel}</strong> · Status: ${u.status}</p>
            <p style="color:#0284c7; font-size:9.5px; font-family:monospace; margin:0;">GPS: ${u.latitude.toFixed(5)}, ${u.longitude.toFixed(5)}</p>
          </div>
        `);

      this.liveUnitMarkers.set(u.id, marker);
    });
  }

  selectJob(jobId: string) {
    this.selectedJobId.set(jobId);
    this.renderDestinationMarkers();
  }

  private onJobSelectionChanged(job: InstallationJob) {
    this.isOffRoute.set(false);
    this.hasRerouted.set(false);
    this.stepIndex = 0;

    const origin = this.getJobOriginCoordinates(job);
    const destination = this.getJobCoordinates(job);

    this.riderPosition.set(origin);
    this.renderRiderMarker(origin.lat, origin.lng);

    this.calculateAndDisplayShortestRoute(origin, destination, false);
  }

  private getJobOriginCoordinates(job: InstallationJob): { lat: number; lng: number } {
    const live = this.store.myLiveLocation();
    if (live && (live.role === 'dispatcher' || live.role === 'installer')) {
      return { lat: live.latitude, lng: live.longitude };
    }
    const branch = this.store.getJobBranch(job) || (this.store.currentRole() === 'shop_manager' ? this.store.managerBranch() : null);
    if (branch) {
      return { lat: branch.latitude, lng: branch.longitude };
    }
    return { lat: 5.6320, lng: -0.0980 }; // Accra Central Workshop
  }

  private getJobCoordinates(job: InstallationJob): { lat: number; lng: number } {
    if (job.client?.coordinates && job.client.coordinates.lat && job.client.coordinates.lng) {
      return job.client.coordinates;
    }
    if ((job as any).lat && (job as any).lng) {
      return { lat: (job as any).lat, lng: (job as any).lng };
    }
    const addr = (job.client?.siteAddress || '').toLowerCase();
    if (addr.includes('amanfrokoo') || addr.includes('chapel')) return { lat: 5.70645, lng: -0.18220 };
    if (addr.includes('obeyeyie') || addr.includes('amasaman')) return { lat: 5.7020, lng: -0.3010 };
    if (addr.includes('spintex') || addr.includes('flower pot')) return { lat: 5.6320, lng: -0.0980 };
    if (addr.includes('east legon')) return { lat: 5.6380, lng: -0.1550 };
    if (addr.includes('cantonments')) return { lat: 5.5840, lng: -0.1780 };
    if (addr.includes('airport')) return { lat: 5.6020, lng: -0.1870 };
    if (addr.includes('tema')) return { lat: 5.6698, lng: -0.0166 };
    return { lat: 5.5840, lng: -0.1780 };
  }

  private async calculateAndDisplayShortestRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    isReroute: boolean = false
  ) {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    let points: [number, number][] = [];
    let distanceMeters = 0;
    let durationSeconds = 0;
    let corridorName = 'Greater Accra Primary Arterial';

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          points = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          distanceMeters = route.distance;
          durationSeconds = route.duration;
          corridorName = route.legs?.[0]?.summary || 'Accra Road Network';
        }
      }
    } catch {
      // procedural fallback
    }

    if (points.length === 0) {
      const fallback = this.generateAccraShortestRoadPath(origin, destination);
      points = fallback.points;
      distanceMeters = fallback.distanceMeters;
      durationSeconds = fallback.durationSeconds;
      corridorName = fallback.corridor;
    }

    this.currentPlannedRoute = points;
    const distanceKm = +(distanceMeters / 1000).toFixed(1);
    const durationMin = Math.max(1, Math.round(durationSeconds / 60));

    this.routeStats.set({
      distanceKm,
      durationMin,
      summary: `${distanceKm} km · ${durationMin} mins`,
      corridor: corridorName
    });

    if (this.activeRoutePolyline) {
      this.map.removeLayer(this.activeRoutePolyline);
    }

    const polyColor = isReroute ? '#10b981' : '#06b6d4';
    this.activeRoutePolyline = leaflet.polyline(points, {
      color: polyColor,
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: isReroute ? '8, 6' : undefined
    }).addTo(this.map);

    if (isReroute) {
      this.hasRerouted.set(true);
      this.isOffRoute.set(false);
      this.rerouteToast.set(`🔄 Auto Re-routed via shortest corridor: ${distanceKm} km remaining (${durationMin} mins)`);
      setTimeout(() => this.rerouteToast.set(null), 6000);
    }

    this.fitRouteBounds();
  }

  private generateAccraShortestRoadPath(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): { points: [number, number][]; distanceMeters: number; durationSeconds: number; corridor: string } {
    const nodes = [
      { lat: origin.lat, lng: origin.lng },
      { lat: origin.lat + (destination.lat - origin.lat) * 0.25, lng: origin.lng + (destination.lng - origin.lng) * 0.15 },
      { lat: origin.lat + (destination.lat - origin.lat) * 0.50, lng: origin.lng + (destination.lng - origin.lng) * 0.60 },
      { lat: origin.lat + (destination.lat - origin.lat) * 0.75, lng: origin.lng + (destination.lng - origin.lng) * 0.85 },
      { lat: destination.lat, lng: destination.lng }
    ];

    const points: [number, number][] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      const steps = 6;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        points.push([a.lat + (b.lat - a.lat) * t, a.lng + (b.lng - a.lng) * t]);
      }
    }
    points.push([destination.lat, destination.lng]);

    const distKm = this.haversineKm(origin.lat, origin.lng, destination.lat, destination.lng) * 1.32;
    return {
      points,
      distanceMeters: distKm * 1000,
      durationSeconds: (distKm / 32) * 3600,
      corridor: 'George Walker Bush Highway / Accra Bypass'
    };
  }

  private renderRiderMarker(lat: number, lng: number) {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    if (!this.riderMarker) {
      const icon = leaflet.divIcon({
        className: 'custom-rider-icon',
        html: `
          <div style="position:relative; cursor:pointer;" title="Active Dispatch Unit">
            <div style="position:absolute; width:44px; height:44px; background:#06b6d440; border-radius:50%; top:-9px; left:-9px; animation:ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="background:#0284c7; color:#fff; width:28px; height:28px; border-radius:50%; border:2.5px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(0,0,0,0.6);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" style="display:block;">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
                <circle cx="7.5" cy="14.5" r="1.5"/>
                <circle cx="16.5" cy="14.5" r="1.5"/>
              </svg>
            </div>
            <div style="background:rgba(15,23,42,0.95); color:#fff; font-size:9.5px; font-family:monospace; font-weight:bold; padding:2px 7px; border-radius:6px; border:1px solid rgba(255,255,255,0.3); white-space:nowrap; position:absolute; left:32px; top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.5);">
              Driver (Live GPS)
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      this.riderMarker = leaflet.marker([lat, lng], { icon }).addTo(this.map);
    } else {
      this.riderMarker.setLatLng([lat, lng]);
    }
  }

  updateRiderPosition(newPos: { lat: number; lng: number }) {
    this.riderPosition.set(newPos);
    this.renderRiderMarker(newPos.lat, newPos.lng);
    this.checkAndHandleOffRoute(newPos);
  }

  private checkAndHandleOffRoute(pos: { lat: number; lng: number }) {
    if (this.currentPlannedRoute.length < 2) return;

    let minDistanceMeters = Infinity;
    for (let i = 0; i < this.currentPlannedRoute.length - 1; i++) {
      const p1 = this.currentPlannedRoute[i];
      const p2 = this.currentPlannedRoute[i + 1];
      const dist = this.perpendicularDistanceMeters(pos, { lat: p1[0], lng: p1[1] }, { lat: p2[0], lng: p2[1] });
      if (dist < minDistanceMeters) {
        minDistanceMeters = dist;
      }
    }

    const OFF_ROUTE_THRESHOLD_METERS = 150;
    if (minDistanceMeters > OFF_ROUTE_THRESHOLD_METERS) {
      this.isOffRoute.set(true);

      const job = this.selectedJob();
      if (job) {
        const dest = this.getJobCoordinates(job);
        this.calculateAndDisplayShortestRoute(pos, dest, true);
      }
    } else {
      this.isOffRoute.set(false);
    }
  }

  simulateOffRouteDeviation() {
    const cur = this.riderPosition();
    const deviated = {
      lat: cur.lat + 0.0035,
      lng: cur.lng - 0.0030
    };

    const leaflet = L;
    if (this.map && leaflet) {
      if (this.offRouteTrailPolyline) {
        this.map.removeLayer(this.offRouteTrailPolyline);
      }
      this.offRouteTrailPolyline = leaflet.polyline(
        [[cur.lat, cur.lng], [deviated.lat, deviated.lng]],
        { color: '#f43f5e', weight: 4, dashArray: '6, 6' }
      ).addTo(this.map);
    }

    this.updateRiderPosition(deviated);
  }

  simulateAdvanceAlongRoute() {
    if (this.currentPlannedRoute.length === 0) return;
    this.stepIndex = Math.min(this.currentPlannedRoute.length - 1, this.stepIndex + 3);
    const pt = this.currentPlannedRoute[this.stepIndex];
    if (pt) {
      this.updateRiderPosition({ lat: pt[0], lng: pt[1] });
    }
  }

  recalculateCurrentRoute() {
    const job = this.selectedJob();
    if (!job) return;
    const origin = this.riderPosition();
    const dest = this.getJobCoordinates(job);
    this.calculateAndDisplayShortestRoute(origin, dest, true);
  }

  centerOnRider() {
    if (!this.map) return;
    const r = this.riderPosition();
    this.map.setView([r.lat, r.lng], 15);
  }

  fitRouteBounds() {
    const leaflet = L;
    if (!this.map || !leaflet || this.currentPlannedRoute.length === 0) return;
    const bounds = leaflet.latLngBounds(this.currentPlannedRoute);
    this.map.fitBounds(bounds, { padding: [70, 70], maxZoom: 16 });
  }

  private fitAllMarkers() {
    const leaflet = L;
    if (!this.map || !leaflet) return;
    const allCoords: [number, number][] = [];
    this.visibleBranches().forEach(b => allCoords.push([b.latitude, b.longitude]));
    this.filteredJobs().forEach(j => {
      const c = this.getJobCoordinates(j);
      allCoords.push([c.lat, c.lng]);
    });
    this.liveTelemetryUnits().forEach(u => allCoords.push([u.latitude, u.longitude]));

    if (allCoords.length === 1) {
      this.map.setView(allCoords[0], 14);
    } else if (allCoords.length > 0) {
      this.map.fitBounds(leaflet.latLngBounds(allCoords), { padding: [50, 50], maxZoom: 14 });
    }
  }

  startLiveTrip(jobId: string) {
    this.store.startLiveMotion(jobId);
    this.alert.toastSuccess('Live Trip Started', `Order #${jobId} marked en route. Telematics active.`);
  }

  markDelivered(jobId: string) {
    this.store.markDeliveredByDriver(jobId);
    this.alert.toastSuccess('Cargo Delivered', `Door and hardware marked delivered on site for #${jobId}.`);
  }

  // Filter Event Handlers
  onRoleFilterChange(role: MapRoleFilter) {
    this.roleFilter.set(role);
  }

  onUserFilterChange(userId: string) {
    this.userFilter.set(userId);
  }

  setTimeFilter(time: MapTimeFilter) {
    this.timeFilter.set(time);
  }

  setStatusFilter(status: MapStatusFilter) {
    this.statusFilter.set(status);
  }

  clearCustomDateRange() {
    this.customStartDate.set('');
    this.customEndDate.set('');
    this.timeFilter.set('all');
  }

  toggleLayer(layer: 'trucks' | 'installers' | 'sites' | 'branches') {
    if (layer === 'trucks') this.showTrucks.update(v => !v);
    if (layer === 'installers') this.showInstallers.update(v => !v);
    if (layer === 'sites') this.showSites.update(v => !v);
    if (layer === 'branches') this.showBranches.update(v => !v);
  }

  /**
   * Evaluates whether a job is specifically scheduled or active for today.
   */
  isJobToday(job: InstallationJob): boolean {
    const rawSched = `${job.scheduledDate || ''} ${(job as any).scheduledTime || ''}`.trim().toLowerCase();
    if (rawSched.includes('today')) {
      return true;
    }

    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDate = now.getDate();

    // Check YYYY-MM-DD pattern in scheduledDate or scheduledTime
    const dateMatch = rawSched.match(/\d{4}-\d{2}-\d{2}/);
    if (dateMatch) {
      const parts = dateMatch[0].split('-').map(Number);
      if (parts[0] === todayYear && parts[1] - 1 === todayMonth && parts[2] === todayDate) {
        return true;
      }
    }

    // Check candidate date strings
    const candidates = [
      job.scheduledDate,
      (job as any).scheduledTime,
      job.createdAt,
      job.shopBooking?.bookingTimestamp
    ];

    for (const cand of candidates) {
      if (!cand) continue;
      const parsed = new Date(cand);
      if (!isNaN(parsed.getTime())) {
        if (
          parsed.getFullYear() === todayYear &&
          parsed.getMonth() === todayMonth &&
          parsed.getDate() === todayDate
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Helper to evaluate timeframe matching: today, week, month, year, custom range.
   */
  private matchesTimeFilter(
    job: InstallationJob,
    filter: MapTimeFilter,
    startStr?: string,
    endStr?: string
  ): boolean {
    if (filter === 'today') {
      return this.isJobToday(job);
    }

    const rawDate = job.scheduledDate || job.createdAt;
    if (!rawDate) return true;

    const jobDate = new Date(rawDate);
    if (isNaN(jobDate.getTime())) return true;

    const now = new Date();

    if (filter === 'week') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneWeekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return jobDate >= oneWeekAgo && jobDate <= oneWeekAhead;
    }

    if (filter === 'month') {
      return (
        jobDate.getFullYear() === now.getFullYear() &&
        jobDate.getMonth() === now.getMonth()
      );
    }

    if (filter === 'year') {
      return jobDate.getFullYear() === now.getFullYear();
    }

    if (filter === 'custom' && (startStr || endStr)) {
      if (startStr) {
        const start = new Date(startStr);
        if (jobDate < start) return false;
      }
      if (endStr) {
        const end = new Date(endStr);
        end.setHours(23, 59, 59, 999);
        if (jobDate > end) return false;
      }
      return true;
    }

    return true;
  }

  private perpendicularDistanceMeters(
    p: { lat: number; lng: number },
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
  ): number {
    const dAB = this.haversineKm(a.lat, a.lng, b.lat, b.lng) * 1000;
    if (dAB === 0) return this.haversineKm(p.lat, p.lng, a.lat, a.lng) * 1000;

    const x = p.lng - a.lng;
    const y = p.lat - a.lat;
    const dx = b.lng - a.lng;
    const dy = b.lat - a.lat;

    const t = Math.max(0, Math.min(1, (x * dx + y * dy) / (dx * dx + dy * dy)));
    const projLat = a.lat + t * dy;
    const projLng = a.lng + t * dx;

    return this.haversineKm(p.lat, p.lng, projLat, projLng) * 1000;
  }

  private haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}
