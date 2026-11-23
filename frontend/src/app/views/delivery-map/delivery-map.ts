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
  untracked,
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

/** A single accepted crew member (installer or dispatch driver) travelling to a work order site. */
export interface CrewTrack {
  key: string;
  jobId: string;
  jobLabel: string;
  clientName: string;
  userId: string;
  userName: string;
  role: 'installer' | 'dispatcher';
  autoAccepted: boolean;
  acceptedAt?: string;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  live: LiveLocation | null;
  arrived: boolean;
}

export interface CrewTrackState {
  mode: 'live' | 'stationary' | 'offline' | 'arrived' | 'simulated' | 'off-route';
  lat: number;
  lng: number;
  progress: number;
  remainingKm: number;
  etaMin: number;
}

export interface WorkOption {
  id: string;
  label: string;
  crewCount: number;
}

interface CrewRoute {
  points: [number, number][];
  cum: number[];
  totalKm: number;
  computedAt: number;
  version: number;
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
            Real-time multi-role surveillance across Greater Accra & regional corridors. Live installer attendance, GPS logistics fleet telematics, customer site destinations, and automated shortest-corridor road routing.
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          
          <!-- 0. Work / Task Filter (accepted & auto-accepted assignments) -->
          <div class="space-y-1">
            <label class="block font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <mat-icon class="!text-xs text-cyan-600">assignment</mat-icon>
              <span>Filter by Work / Task:</span>
            </label>
            <select
              [ngModel]="workFilter()"
              (ngModelChange)="onWorkFilterChange($event)"
              class="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer shadow-2xs"
            >
              <option value="all">📋 All Assigned Work ({{ workOptions().length }})</option>
              @for (w of workOptions(); track w.id) {
                <option [value]="w.id">{{ w.label }} ({{ w.crewCount }} crew)</option>
              }
            </select>
          </div>

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
              <option value="installer">🛠️ Field Installers</option>
              <option value="dispatcher">🚚 Dispatch Drivers (Logistics Trucks)</option>
              <option value="shop_manager">🏪 Shop Attendants (Counter & Workshops)</option>
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
              <button
                type="button"
                (click)="setStatusFilter('all')"
                [class]="statusFilter() === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="flex-1 py-1 text-center rounded-lg transition-all cursor-pointer"
              >
                All
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
                (keydown.enter)="detectedGhanaPostCode() ? locateGhanaPost(detectedGhanaPostCode()!) : null"
                placeholder="Search order ID, client, or Ghana Post GPS (e.g. GD-018-5574)..."
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

            @if (detectedGhanaPostCode()) {
              <div class="mt-1 flex items-center justify-between p-1.5 px-2 rounded-lg bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-[10px] text-teal-800 dark:text-teal-200 animate-in fade-in">
                <div class="flex items-center gap-1 truncate font-mono">
                  <span>🇬🇭</span>
                  <strong>{{ detectedGhanaPostCode() }}</strong>
                </div>
                <button
                  type="button"
                  (click)="locateGhanaPost(detectedGhanaPostCode()!)"
                  class="px-2 py-0.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded cursor-pointer shadow-xs active:scale-95 transition-all text-[10px] flex items-center gap-1 shrink-0"
                >
                  <mat-icon class="!text-[11px] !w-3 !h-3">my_location</mat-icon>
                  <span>Pin & Route</span>
                </button>
              </div>
            }
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
              <button
                type="button"
                (click)="setTimeFilter('all')"
                [class]="timeFilter() === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                All
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
              <span>🛠️ Installers</span>
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

            <button
              type="button"
              (click)="showCrewRoutes.update(v => !v)"
              class="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer border"
              [class]="showCrewRoutes() ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-800' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 border-transparent opacity-60'"
            >
              <span>🧭 Crew Routes</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- LIVE CREW TRACKING (accepted / auto-accepted installers & drivers) -->
      <!-- ================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 shadow-xs space-y-2">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <mat-icon class="!text-xs text-sky-600">route</mat-icon>
            <span>Live Crew Tracking ({{ crewTrackSummary().total }})</span>
          </span>
          <div class="flex flex-wrap items-center gap-1.5 text-[10px] font-mono font-bold">
            <span class="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">{{ crewTrackSummary().moving }} moving</span>
            <span class="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">{{ crewTrackSummary().stationary }} stationary</span>
            <span class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{{ crewTrackSummary().offline }} not signed in</span>
            <span class="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">{{ crewTrackSummary().arrived }} on site</span>
          </div>
        </div>

        @if (crewTracks().length === 0) {
          <p class="text-xs text-slate-400 py-2">
            No installer or dispatch driver has accepted an assignment matching the current filters yet. Crew appear here and on the map as soon as they accept (or are auto-accepted).
          </p>
        } @else {
          <div class="flex gap-2 overflow-x-auto pb-1">
            @for (t of crewTracks(); track t.key) {
              @let st = crewStates()[t.key];
              <button
                type="button"
                (click)="focusCrew(t)"
                class="shrink-0 w-60 text-left p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-600 transition-colors cursor-pointer space-y-1.5"
                [class.ring-1]="selectedJobId() === t.jobId"
                [class.ring-teal-500]="selectedJobId() === t.jobId"
              >
                <div class="flex items-center justify-between gap-1">
                  <span class="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {{ isCurrentSelfUnit(t.userId, t.userName, t.role) ? '📍 Me' : (t.role === 'dispatcher' ? '🚚 ' : '🛠️ ') + t.userName }}
                  </span>
                  <span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded"
                    [class]="!st ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      : st.mode === 'live' ? 'bg-emerald-600 text-white'
                      : st.mode === 'stationary' ? 'bg-sky-600 text-white'
                      : st.mode === 'arrived' ? 'bg-purple-600 text-white'
                      : st.mode === 'simulated' ? 'bg-amber-600 text-white'
                      : st.mode === 'off-route' ? 'bg-rose-600 text-white'
                      : 'bg-slate-500 text-white'">
                    {{ !st ? 'ROUTING…'
                      : st.mode === 'live' ? 'MOVING'
                      : st.mode === 'stationary' ? 'STATIONARY'
                      : st.mode === 'arrived' ? 'ON SITE'
                      : st.mode === 'simulated' ? 'SIMULATED'
                      : st.mode === 'off-route' ? 'OFF-ROUTE'
                      : 'NOT SIGNED IN' }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {{ t.role === 'dispatcher' ? 'Driver' : 'Installer' }} · {{ t.autoAccepted ? 'Auto-accepted' : 'Accepted' }} · {{ t.jobLabel }}
                </p>
                <div class="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000"
                    [class]="t.role === 'dispatcher' ? 'bg-sky-500' : 'bg-emerald-500'"
                    [style.width.%]="(st?.progress ?? 0) * 100"></div>
                </div>
                <div class="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  <span>{{ st ? (st.remainingKm | number:'1.1-1') + ' km left' : '—' }}</span>
                  <span>
                    @if (!st) {
                      —
                    } @else if (st.mode === 'arrived') {
                      Arrived
                    } @else if (st.mode === 'offline') {
                      Not signed in
                    } @else if (st.mode === 'stationary') {
                      Not moving
                    } @else {
                      ETA {{ st.etaMin }} min
                    }
                  </span>
                </div>
              </button>
            }
          </div>
        }
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
          <div class="pointer-events-auto flex items-center gap-2.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-700/80 text-white text-xs shadow-xl">
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
                  <span class="text-rose-400 animate-pulse font-black uppercase">⚠️ OFF-ROUTE DETECTED (ALTERNATE TURN)</span>
                } @else if (hasRerouted()) {
                  <span class="text-teal-400 uppercase">🔄 AUTO RE-ROUTED VIA SHORTEST ROAD</span>
                } @else if (isSimulationMode()) {
                  <span class="text-amber-400 uppercase">SIMULATED ROUTING · DEMO</span>
                } @else {
                  <span class="text-emerald-400 uppercase">REAL-TIME OPTIMAL ROUTE · PRODUCTION</span>
                }
                <span class="text-slate-500">·</span>
                <span class="text-slate-300 font-sans truncate max-w-[180px] sm:max-w-xs">
                  @if (selectedJob(); as curJob) {
                    {{ activeTrack()?.userName ? (activeTrack()!.userName.split(' ')[0] + ' → ') : '' }}{{ curJob.client.name }} (#{{ curJob.id }})
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
          <div class="pointer-events-auto flex flex-wrap items-center gap-1 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 text-white text-[10px] shadow-lg">
            
            <!-- Real-Time Live GPS vs Simulation Toggle Button -->
            <button
              type="button"
              (click)="toggleDataMode()"
              class="px-1.5 py-0.5 rounded-lg font-bold flex items-center gap-1 text-[9px] transition-all cursor-pointer border leading-tight"
              [class]="isSimulationMode()
                ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 hover:bg-amber-500/35'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'"
              title="Toggle between Real-Time Live GPS (Production) and Simulated Presentation Data"
            >
              @if (isSimulationMode()) {
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Sim (Demo)</span>
              } @else {
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live GPS</span>
              }
            </button>

            <!-- Toggle for Unit / Simulate / Advance Step Controls -->
            <button
              type="button"
              (click)="showSimControls.set(!showSimControls())"
              class="px-1.5 py-0.5 rounded-lg font-bold flex items-center gap-0.5 text-[9px] transition-all cursor-pointer border leading-tight"
              [class]="showSimControls()
                ? 'bg-slate-700 text-white border-slate-600'
                : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:text-white'"
              title="Show/Hide Unit, Simulate & Advance Step Controls"
            >
              <mat-icon class="!text-[11px] !w-3 !h-3">tune</mat-icon>
              <span>Controls</span>
              <mat-icon class="!text-[11px] !w-3 !h-3">{{ showSimControls() ? 'expand_less' : 'expand_more' }}</mat-icon>
            </button>

            <!-- Collapsible Controls: Unit Select, Simulate & Advance Step -->
            @if (showSimControls()) {
              <!-- Unit Select Option if Selected Operation has crew members -->
              @if (activeJobCrewTracks().length > 0) {
                <div class="flex items-center gap-1 bg-slate-800/90 px-1.5 py-0.5 rounded-lg border border-slate-700">
                  <span class="text-[9px] text-slate-400 font-bold">Unit:</span>
                  <select
                    [value]="activeTrack()?.key || ''"
                    (change)="selectedTrackKey.set($any($event.target).value)"
                    class="bg-transparent text-[9px] font-bold text-white focus:outline-none cursor-pointer pr-1"
                    aria-label="Select Unit"
                  >
                    @for (t of activeJobCrewTracks(); track t.key) {
                      <option [value]="t.key" class="bg-slate-900 text-white">
                        {{ t.role === 'dispatcher' ? '🚚 Driver' : '🛠️ Installer' }}: {{ t.userName.split(' ')[0] }}
                      </option>
                    }
                  </select>
                </div>
              }

              <!-- Simulate Alternate Turn (Off-Route) Button -->
              <button
                type="button"
                (click)="simulateOffRouteDeviation()"
                class="px-1.5 py-0.5 bg-amber-600/90 hover:bg-amber-600 text-white font-bold rounded-lg transition-all flex items-center gap-0.5 text-[9px] cursor-pointer active:scale-95 leading-tight"
                [title]="isSimulationMode() ? 'Simulate active unit taking an alternate turn (off-route detour) to test dynamic re-routing' : 'Switch to simulation mode & simulate an alternate turn (off-route detour)'"
              >
                <mat-icon class="!text-[11px] !w-3 !h-3">alt_route</mat-icon>
                <span class="hidden sm:inline">Simulate ({{ activeTrack()?.role === 'dispatcher' ? 'Driver' : (activeTrack()?.role === 'installer' ? 'Installer' : 'Unit') }})</span>
                <span class="sm:hidden">Simulate</span>
              </button>

              <!-- Drive Step (Advance along route) -->
              <button
                type="button"
                (click)="simulateAdvanceAlongRoute()"
                class="px-1.5 py-0.5 bg-teal-600/90 hover:bg-teal-600 text-white font-bold rounded-lg transition-all flex items-center gap-0.5 text-[9px] cursor-pointer active:scale-95 leading-tight"
                title="Step forward along the shortest route toward the customer site"
              >
                <mat-icon class="!text-[11px] !w-3 !h-3">play_arrow</mat-icon>
                <span>Advance</span>
              </button>
            }

            <!-- Recalculate Route -->
            <button
              type="button"
              (click)="recalculateCurrentRoute()"
              class="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Re-query Shortest Road Path"
              aria-label="Recalculate Route"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">refresh</mat-icon>
            </button>

            <!-- Center on Active Unit -->
            <button
              type="button"
              (click)="centerOnActiveUnit()"
              class="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Center Map on Active Unit Position"
              aria-label="Center Map on Active Unit"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">my_location</mat-icon>
            </button>

            <!-- Fit Full Route -->
            <button
              type="button"
              (click)="fitRouteBounds()"
              class="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Fit Full Route & Waypoints in View"
              aria-label="Fit Full Route"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">crop_free</mat-icon>
            </button>
          </div>
        </div>

        <!-- LEAFLET MAP ELEMENT -->
        <div class="relative w-full h-[380px] sm:h-[500px] md:h-[560px] lg:h-[650px] bg-slate-950">
          <div #mapContainer class="relative w-full h-full bg-slate-950 z-0"></div>
        </div>

        <!-- ================================================================= -->
        <!-- BOTTOM FLOATING HUD: MERGED FROM INSTALLER & CLIENT PORTALS       -->
        <!-- ================================================================= -->
        @if (selectedJob()) {
          @let j = selectedJob()!;
          @if (isHudMinimized()) {
            <!-- Minimized Round Floating Button at bottom-left of the map -->
            <button
              type="button"
              (click)="isHudMinimized.set(false)"
              class="absolute bottom-2.5 left-2.5 z-10 w-9 h-9 rounded-full bg-slate-900/95 dark:bg-slate-950/95 hover:bg-slate-800 dark:hover:bg-slate-900 text-teal-400 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group animate-in fade-in"
              title="Expand Operation #{{ j.id }} — {{ j.client.name }} ({{ j.doorModel }})"
              aria-label="Expand Operation Details"
            >
              <mat-icon class="!text-base transition-transform group-hover:scale-110">alt_route</mat-icon>
              <!-- Pulsing status indicator dot -->
              <span class="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500 border border-slate-900"></span>
              </span>
            </button>
          } @else {
            <div class="absolute bottom-2.5 left-2.5 right-2.5 sm:right-auto sm:max-w-md z-10 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-700/80 p-2 rounded-xl shadow-2xl text-white space-y-1.5 animate-in fade-in">
              
              <!-- Live Deviation / Re-routing Alert Toast -->
              @if (rerouteToast()) {
                <div class="p-1.5 bg-teal-950/90 border border-teal-500 rounded-lg flex items-center justify-between gap-1.5 text-[10px] text-teal-200 animate-bounce">
                  <div class="flex items-center gap-1">
                    <mat-icon class="!text-xs text-teal-400">autorenew</mat-icon>
                    <span>{{ rerouteToast() }}</span>
                  </div>
                  <button type="button" (click)="rerouteToast.set(null)" class="text-teal-400 hover:text-white">
                    <mat-icon class="!text-[10px]">close</mat-icon>
                  </button>
                </div>
              }

              <!-- Destination & Target Cargo Details -->
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <div class="flex items-center gap-1 flex-wrap">
                    <span class="text-[8px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      #{{ j.id }}
                    </span>
                    <span class="text-[8px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {{ j.doorCategory || 'Pivot Door' }}
                    </span>
                  </div>

                  <h3 class="text-[11px] font-extrabold text-white truncate mt-0.5 leading-tight">
                    {{ j.client.name }} · {{ j.doorModel }}
                  </h3>
                  <p class="text-[10px] text-slate-300 truncate flex items-center gap-1 mt-0.5 leading-tight">
                    <mat-icon class="!text-[11px] !w-3 !h-3 text-red-400">place</mat-icon>
                    <span class="truncate">{{ j.client.siteAddress }}</span>
                    @if (extractGhanaPostCode(j.client.siteAddress)) {
                      <button
                        type="button"
                        (click)="locateGhanaPost(extractGhanaPostCode(j.client.siteAddress)!)"
                        class="px-1 py-0 bg-teal-900/80 hover:bg-teal-800 text-teal-300 border border-teal-600 rounded text-[8px] font-mono font-bold cursor-pointer transition-colors shrink-0"
                        title="Ghana Post GPS - Click to center on map"
                      >
                        🇬🇭 {{ extractGhanaPostCode(j.client.siteAddress) }}
                      </button>
                    }
                  </p>
                  <p class="text-[9px] text-slate-400 mt-0.5 font-mono truncate leading-tight">
                    {{ j.dimensions }} · {{ j.lockModel || 'Smart Lock' }}
                  </p>
                </div>

                <!-- Quick Client Call Button & Minimize Button -->
                <div class="flex items-center gap-1 shrink-0">
                  <a 
                    [href]="'tel:' + j.client.phone" 
                    class="px-1.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-[10px] font-bold flex items-center gap-0.5 transition-colors"
                    title="Call Customer Site"
                  >
                    <mat-icon class="!text-[11px] !w-3 !h-3 text-teal-400">phone</mat-icon>
                    <span class="hidden sm:inline">Call</span>
                  </a>

                  <button
                    type="button"
                    (click)="jobSelected.emit(j.id)"
                    class="px-1.5 py-1 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-0.5 shadow-sm transition-colors cursor-pointer"
                    title="Open Full Operational Work Order Modal"
                  >
                    <mat-icon class="!text-[11px] !w-3 !h-3">visibility</mat-icon>
                    <span class="hidden sm:inline">Inspect</span>
                  </button>

                  <button
                    type="button"
                    (click)="fitRouteBounds()"
                    class="px-1.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-[10px] font-bold flex items-center gap-0.5 border border-slate-700 shadow-sm transition-colors cursor-pointer"
                    title="Fit route to current view"
                  >
                    <mat-icon class="!text-[11px] !w-3 !h-3">crop_free</mat-icon>
                    <span class="hidden sm:inline">Fit</span>
                  </button>

                  <button
                    type="button"
                    (click)="collapseHudManually()"
                    class="w-6 h-6 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                    title="Collapse card"
                    aria-label="Collapse card"
                  >
                    <mat-icon class="!text-xs">close_fullscreen</mat-icon>
                  </button>
                </div>
              </div>

              <!-- Merged Logic Strip 1: Installer Site Attendance & Checklist -->
              <div class="bg-slate-800/70 p-1.5 rounded-lg border border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px]">
                <div class="space-y-0.5 min-w-0">
                  <span class="text-[8px] uppercase font-bold text-slate-400 flex items-center gap-0.5 leading-none">
                    <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-emerald-400">handyman</mat-icon>
                    <span>Team:</span>
                  </span>
                  <p class="font-bold text-white text-[10px] truncate leading-tight">
                    {{ j.assignedInstallerName || 'Operations Queue (Unassigned)' }}
                  </p>
                  <div class="flex items-center gap-1 text-[9px] font-mono leading-none">
                    <span class="px-1 py-0.2 rounded font-bold"
                      [class]="j.installerAssignmentStatus === 'accepted' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'">
                      {{ j.installerAssignmentStatus === 'accepted' ? (j.installerAutoAccepted ? 'Auto-Accepted' : 'Accepted') : 'Pending' }}
                    </span>
                    <span class="text-slate-400 truncate">· {{ j.scheduledDate }}</span>
                  </div>
                </div>

                <div class="space-y-0.5 min-w-0">
                  <span class="text-[8px] uppercase font-bold text-slate-400 flex items-center gap-0.5 leading-none">
                    <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-cyan-400">local_shipping</mat-icon>
                    <span>Dispatch:</span>
                  </span>
                  <p class="font-bold text-white text-[10px] truncate leading-tight">
                    {{ j.dispatcherName || 'Pending Store Driver' }}
                  </p>
                  <p class="text-[9px] text-slate-400 font-mono truncate leading-tight">
                    {{ j.logisticsTruck?.truckPlate ? j.logisticsTruck?.truckPlate + ' (' + (j.logisticsTruck?.truckModel || 'Truck') + ')' : 'No truck assigned yet' }}
                  </p>
                </div>
              </div>

              <!-- Merged Logic Strip 2: Shortest Distance, Driving Time & Route Corridor -->
              <div class="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
                <div class="bg-slate-800/60 px-1.5 py-1 rounded-lg">
                  <span class="text-[8px] text-slate-400 uppercase block leading-none">Distance</span>
                  <strong class="text-[11px] text-teal-400 font-black tabular-nums leading-tight">
                    {{ routeStats()?.distanceKm || '—' }} km
                  </strong>
                </div>
                <div class="bg-slate-800/60 px-1.5 py-1 rounded-lg">
                  <span class="text-[8px] text-slate-400 uppercase block leading-none">ETA</span>
                  <strong class="text-[11px] text-white font-black tabular-nums leading-tight">
                    {{ routeStats()?.durationMin || '—' }} mins
                  </strong>
                </div>
                <div class="bg-slate-800/60 px-1.5 py-1 rounded-lg">
                  <span class="text-[8px] text-slate-400 uppercase block leading-none">Corridor</span>
                  <strong class="text-[10px] text-slate-300 truncate block leading-tight">
                    {{ routeStats()?.corridor || 'Accra Arterial' }}
                  </strong>
                </div>
              </div>

              <!-- Direct Trip Lifecycle Controls Directly on Map -->
              <div class="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-800 text-[10px]">
                <div class="flex items-center gap-1">
                  <span class="text-[9px] text-slate-400 font-mono">Status:</span>
                  <span class="font-bold text-[10px] text-teal-400 uppercase">
                    {{ j.status.replace('_', ' ') }}
                  </span>
                </div>

                <div class="flex items-center gap-1.5">
                  @if (j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || j.status === 'booked_at_shop' || j.status === 'approved') {
                    <button
                      type="button"
                      (click)="startLiveTrip(j.id)"
                      class="px-2 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold text-[10px] flex items-center gap-0.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <mat-icon class="!text-[11px] !w-3 !h-3">play_arrow</mat-icon>
                      <span>Start Trip</span>
                    </button>
                  } @else if (j.status === 'dispatched') {
                    <button
                      type="button"
                      (click)="markDelivered(j.id)"
                      class="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] flex items-center gap-0.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <mat-icon class="!text-[11px] !w-3 !h-3">done_all</mat-icon>
                      <span>Mark Delivered</span>
                    </button>
                  }
                </div>
              </div>
            </div>
          }
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
  private activeRoutePolyline: LType.Polyline | null = null;
  private offRouteTrailPolyline: LType.Polyline | null = null;
  private ghanaPostMarker: LType.Marker | null = null;
  private ghanaPostCoords = new Map<string, { lat: number; lng: number }>();
  private pendingGhanaPost = new Set<string>();

  // Layer Toggles
  readonly showTrucks = signal<boolean>(true);
  readonly showInstallers = signal<boolean>(true);
  readonly showSites = signal<boolean>(true);
  readonly showBranches = signal<boolean>(true);

  // Filters State
  readonly roleFilter = signal<MapRoleFilter>('all');
  readonly userFilter = signal<string>('all');
  readonly timeFilter = signal<MapTimeFilter>('today');
  readonly statusFilter = signal<MapStatusFilter>('live');
  readonly searchQuery = signal<string>('');
  readonly customStartDate = signal<string>('');
  readonly customEndDate = signal<string>('');

  readonly detectedGhanaPostCode = computed<string | null>(() => {
    const q = this.searchQuery().trim().toUpperCase();
    const match = q.match(/\b([A-Z]{2}-?\d{3,4}-?\d{4})\b/);
    if (match) {
      const c = match[1];
      return c.includes('-') ? c : `${c.slice(0, 2)}-${c.slice(2, 5)}-${c.slice(5)}`;
    }
    return null;
  });

  // Selected Job & Telematics State
  readonly selectedJobId = signal<string | null>(null);
  readonly riderPosition = signal<{ lat: number; lng: number }>({ lat: 5.6320, lng: -0.0980 });
  readonly routeStats = signal<RouteStats | null>(null);
  readonly isOffRoute = signal<boolean>(false);
  readonly hasRerouted = signal<boolean>(false);
  readonly rerouteToast = signal<string | null>(null);
  readonly isHudMinimized = signal<boolean>(true);
  private hudRestoreTimer: ReturnType<typeof setTimeout> | null = null;
  private wasAutoMinimizedByMap = false;
  private suppressMapMinimizeUntil = 0;

  // Simulation Mode (Presentation Demo) vs Real-Time Live GPS (Production)
  readonly isSimulationMode = signal<boolean>(false);
  readonly showSimControls = signal<boolean>(false);
  readonly simulatedPositions = signal<Record<string, { lat: number; lng: number; isOffRoute?: boolean }>>({});
  readonly selectedTrackKey = signal<string | null>(null);
  private simulationStartedAt = 0;

  /** Crew members actively assigned to the currently selected job */
  readonly activeJobCrewTracks = computed<CrewTrack[]>(() => {
    const job = this.selectedJob();
    if (!job) return [];
    return this.crewTracks().filter(t => t.jobId === job.id);
  });

  /** Active unit (driver or installer) targeted for simulation or focused tracking */
  readonly activeTrack = computed<CrewTrack | null>(() => {
    const tracks = this.activeJobCrewTracks();
    if (tracks.length === 0) return this.crewTracks()[0] || null;
    const key = this.selectedTrackKey();
    if (key) {
      const match = tracks.find(t => t.key === key);
      if (match) return match;
    }
    const driverTrack = tracks.find(t => t.role === 'dispatcher');
    if (driverTrack) return driverTrack;
    return tracks[0];
  });

  // Live Crew Tracking (accepted installers & dispatch drivers en route to client sites)
  readonly workFilter = signal<string>('all');
  readonly showCrewRoutes = signal<boolean>(true);
  readonly crewStates = signal<Record<string, CrewTrackState>>({});
  private crewRouteCache = new Map<string, CrewRoute>();
  private crewRoutePending = new Set<string>();
  private crewLines = new Map<string, { line: LType.Polyline; version: number; dashed: boolean }>();
  private crewMarkers = new Map<string, { marker: LType.Marker; iconKey: string }>();
  private crewTicker: ReturnType<typeof setInterval> | null = null;
  private livePoller: ReturnType<typeof setInterval> | null = null;
  private readonly mountedAt = Date.now();
  private static readonly CREW_SPEED_KMH = 28;
  private static readonly POST_ACCEPT_STATUSES = ['approved', 'dispatched', 'delivered_on_site', 'on_site', 'in_progress'];
  private static readonly CLOSED_STATUSES = ['installed_pending_signoff', 'completed', 'bonus_awarded'];

  // Planned Route Points & Step Index
  private currentPlannedRoute: [number, number][] = [];
  private stepIndex: number = 0;
  private currentlyRoutedJobId: string | null = null;
  private userHasInteractedWithMap: boolean = false;

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
        role: 'Installer',
        detail: i.teamName || 'Field Installer'
      });
    });

    // Dispatchers
    this.store.dispatchers().forEach(d => {
      options.push({
        id: d.id,
        name: d.name,
        role: 'Driver',
        detail: d.assignedTruck.plate
      });
    });

    // Shop Managers
    this.store.branches().forEach(b => {
      options.push({
        id: b.branchCode,
        name: b.managerName,
        role: 'Shop Attendant',
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
    const wFilter = this.workFilter();

    return list.filter(job => {
      // 0. Work / Task Filter
      if (wFilter !== 'all' && job.id !== wFilter) {
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
    const wFilter = this.workFilter();

    return list.filter(job => {
      if (wFilter !== 'all' && job.id !== wFilter) {
        return false;
      }

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
   * Work orders (active, non-closed) that have at least one crew member who accepted
   * or was auto-accepted. Listed in the "Work / Task" filter.
   */
  readonly workOptions = computed<WorkOption[]>(() => {
    return this.allScopedJobs()
      .filter(j => !DeliveryMap.CLOSED_STATUSES.includes(j.status))
      .map(j => ({
        id: j.id,
        label: `${j.id} · ${j.client?.name || 'Client'}`,
        crewCount: this.acceptedInstallersFor(j).length + (this.isDriverAccepted(j) ? 1 : 0)
      }))
      .filter(o => o.crewCount > 0);
  });

  /**
   * Every accepted / auto-accepted installer and dispatch driver routed to their assigned
   * client destination, honouring the role, staff, work, status, time and search filters.
   */
  readonly crewTracks = computed<CrewTrack[]>(() => {
    const rFilter = this.roleFilter();
    const uFilter = this.userFilter();
    const crewIds = new Set<string>([
      ...this.store.installers().map(i => i.id),
      ...this.store.dispatchers().map(d => d.id)
    ]);
    const personFilter = uFilter !== 'all' && crewIds.has(uFilter) ? uFilter : null;
    const lives = this.store.liveLocations();
    const tracks: CrewTrack[] = [];

    for (const job of this.filteredJobs()) {
      if (DeliveryMap.CLOSED_STATUSES.includes(job.status)) continue;

      const destination = this.getJobCoordinates(job);
      const branch = this.store.getJobBranch(job);
      const base = branch ? { lat: branch.latitude, lng: branch.longitude } : { lat: 5.6320, lng: -0.0980 };
      const jobLabel = `${job.id} · ${job.client?.name || 'Client'}`;
      const clientName = job.client?.name || 'Client';

      if (rFilter === 'all' || rFilter === 'installer' || rFilter === 'client' || rFilter === 'shop_manager') {
        for (const inst of this.acceptedInstallersFor(job)) {
          if (personFilter && personFilter !== inst.id) continue;
          tracks.push({
            key: `${job.id}:inst:${inst.id}`,
            jobId: job.id,
            jobLabel,
            clientName,
            userId: inst.id,
            userName: inst.name,
            role: 'installer',
            autoAccepted: inst.auto,
            acceptedAt: inst.at,
            origin: this.offsetOrigin(base, inst.id),
            destination,
            live: this.findLive(lives, inst.id),
            arrived: job.status === 'on_site' || job.status === 'in_progress'
          });
        }
      }

      if ((rFilter === 'all' || rFilter === 'dispatcher' || rFilter === 'client' || rFilter === 'shop_manager') && this.isDriverAccepted(job)) {
        const driverId = job.dispatcherId!;
        if (!personFilter || personFilter === driverId) {
          tracks.push({
            key: `${job.id}:drv:${driverId}`,
            jobId: job.id,
            jobLabel,
            clientName,
            userId: driverId,
            userName: job.dispatcherName || 'Dispatch Driver',
            role: 'dispatcher',
            autoAccepted: !!job.driverAutoAccepted,
            acceptedAt: job.driverRespondedAt || job.driverAssignedAt,
            origin: base,
            destination,
            live: this.findLive(lives, driverId),
            arrived: job.status === 'delivered_on_site' || job.status === 'on_site' || job.status === 'in_progress'
          });
        }
      }
    }
    return tracks;
  });

  readonly crewTrackSummary = computed(() => {
    const states = this.crewStates();
    const tracks = this.crewTracks();
    let live = 0, moving = 0, stationary = 0, offline = 0, arrived = 0;
    tracks.forEach(t => {
      const s = states[t.key];
      if (t.live) live++;
      if (s?.mode === 'arrived') arrived++;
      else if (s?.mode === 'live' || s?.mode === 'simulated' || s?.mode === 'off-route') moving++;
      else if (s?.mode === 'stationary') stationary++;
      else offline++;
    });
    return { total: tracks.length, live, moving, stationary, offline, arrived };
  });

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
      this.crewTracks();
      this.showTrucks();
      this.showInstallers();
      this.showSites();
      this.showBranches();

      if (this.map) {
        this.renderAllMapLayers();
      }
    });

    // Re-sync crew routes & moving markers whenever tracked crews or layer toggles change
    effect(() => {
      this.crewTracks();
      this.showCrewRoutes();
      this.showTrucks();
      this.showInstallers();
      if (this.map) {
        untracked(() => this.syncCrewLayers());
      }
    });

    // React when selected job changes -> recalculate shortest route & re-render
    effect(() => {
      const job = this.selectedJob();
      if (job && this.map) {
        if (job.id !== this.currentlyRoutedJobId) {
          const isFirstRoute = this.currentlyRoutedJobId === null;
          this.currentlyRoutedJobId = job.id;
          this.onJobSelectionChanged(job, isFirstRoute || !this.userHasInteractedWithMap);
        }
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
      this.setupResizeObserver();
      this.syncCrewLayers();
    }, 60);

    // Real-time: advance crew markers every second, and poll live GPS fixes every 5s
    this.crewTicker = setInterval(() => this.syncCrewLayers(), 1000);
    void this.store.loadLiveLocations();
    this.livePoller = setInterval(() => void this.store.loadLiveLocations(), 5000);
  }

  ngOnDestroy() {
    if (this.hudRestoreTimer) {
      clearTimeout(this.hudRestoreTimer);
      this.hudRestoreTimer = null;
    }
    if (this.crewTicker) {
      clearInterval(this.crewTicker);
      this.crewTicker = null;
    }
    if (this.livePoller) {
      clearInterval(this.livePoller);
      this.livePoller = null;
    }
    this.crewLines.clear();
    this.crewMarkers.clear();
    if (this.offRouteTrailPolyline) {
      this.map?.removeLayer(this.offRouteTrailPolyline);
      this.offRouteTrailPolyline = null;
    }
    if (this.activeRoutePolyline) {
      this.map?.removeLayer(this.activeRoutePolyline);
      this.activeRoutePolyline = null;
    }
    if (this.ghanaPostMarker) {
      this.map?.removeLayer(this.ghanaPostMarker);
      this.ghanaPostMarker = null;
    }
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
        this.map.invalidateSize({ pan: false });
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

      // Detect user map navigation (pan/drag/zoom/click) to avoid hijacking camera and minimize HUD immediately
      this.map.on('dragstart zoomstart', () => {
        this.userHasInteractedWithMap = true;
        this.minimizeHudOnMapInteraction();
      });
      this.map.on('movestart', () => {
        this.userHasInteractedWithMap = true;
        if (Date.now() > this.suppressMapMinimizeUntil) {
          this.minimizeHudOnMapInteraction();
        }
      });
      this.map.on('click', () => {
        if (Date.now() > this.suppressMapMinimizeUntil) {
          this.minimizeHudOnMapInteraction();
          this.scheduleHudAutoRestore();
        }
      });
      this.map.on('dragend zoomend moveend', () => {
        if (Date.now() > this.suppressMapMinimizeUntil) {
          this.scheduleHudAutoRestore();
        }
      });

      this.updateTileLayer();
      this.renderAllMapLayers();

      const job = this.selectedJob();
      if (job) {
        this.currentlyRoutedJobId = job.id;
        this.onJobSelectionChanged(job, true);
      } else {
        this.fitAllMarkers();
      }

      setTimeout(() => {
        this.map?.invalidateSize({ pan: false });
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
      const gp = this.extractGhanaPostCode(j.client?.siteAddress);
      const gpBadge = gp ? `<span style="background:rgba(13,148,136,0.9); color:#fff; font-size:7.5px; padding:1px 3.5px; border-radius:3px; font-family:monospace; font-weight:900;">🇬🇭 ${gp}</span>` : '';

      const icon = leaflet.divIcon({
        className: 'custom-dest-pin',
        html: `
          <div style="position:relative; cursor:pointer;">
            ${isSelected ? '<div style="position:absolute; width:46px; height:46px; background:#0d948840; border-radius:50%; top:-11px; left:-11px; animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
            <div style="background:${bg}; color:#fff; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:9.5px; font-family:sans-serif; box-shadow:0 4px 14px rgba(0,0,0,0.5); border:2px solid ${border}; display:flex; align-items:center; gap:4px; white-space:nowrap;">
              <span>${iconEmoji}</span>
              <span>${j.client.name.split(' ')[0]}</span>
              ${gpBadge}
              <span style="background:rgba(255,255,255,0.25); color:#fff; font-size:7.5px; padding:1px 3.5px; border-radius:4px; font-weight:900;">${statusLabel}</span>
            </div>
          </div>
        `,
        iconSize: [175, 26],
        iconAnchor: [87, 13]
      });

      const marker = leaflet.marker([coords.lat, coords.lng], { icon })
        .addTo(this.map!)
        .on('click', () => {
          this.onMapEntityClicked(j.id);
        });

      this.destinationMarkers.set(j.id, marker);
    });
  }

  /**
   * Render active live GPS transmitting units (Dispatchers & Installers)
   */
  private renderLiveUnitMarkers() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    this.liveUnitMarkers.forEach(m => this.map?.removeLayer(m));
    this.liveUnitMarkers.clear();

    const units = this.liveTelemetryUnits();
    const trackedUserIds = new Set(this.crewTracks().map(t => t.userId));

    units.forEach(u => {
      // Units travelling on an accepted work order are drawn by the crew tracking layer
      if (trackedUserIds.has(u.userId)) return;

      const isDriver = u.role === 'dispatcher';
      const isTech = u.role === 'installer';

      if (isDriver && !this.showTrucks()) return;
      if (isTech && !this.showInstallers()) return;

      const bgColor = isDriver ? '#0284c7' : '#10b981';
      const symbol = isDriver ? '🚚' : '🛠️';
      const roleLabel = isDriver ? 'Truck Fleet' : 'Installer';
      const moving = this.isUnitMoving(u.userId, u.latitude, u.longitude, u.speedKmh);
      const pulse = moving
        ? `<div style="position:absolute; width:40px; height:40px; background:${bgColor}33; border-radius:50%; top:-8px; left:-8px; animation:ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
        : '';
      const motionLabel = moving
        ? (u.speedKmh && u.speedKmh >= 2 ? `${u.speedKmh} km/h` : 'Moving')
        : 'Stationary';

      const isSelf = this.isCurrentSelfUnit(u.userId, u.userName, u.role);
      const shortName = isSelf ? 'Me' : (u.userName ? u.userName.split(' ')[0] : roleLabel);
      const popupName = isSelf ? 'Me' : (u.userName || 'Field Staff');

      const icon = isSelf
        ? leaflet.divIcon({
            className: 'custom-live-unit-pin',
            html: this.selfPinIconHtml(`Me · ${motionLabel}`, pulse),
            iconSize: [22, 28],
            iconAnchor: [11, 27]
          })
        : leaflet.divIcon({
            className: 'custom-live-unit-pin',
            html: `
              <div style="position:relative; cursor:pointer;" title="${popupName} (${roleLabel})">
                ${pulse}
                <div style="background:${bgColor}; color:#fff; width:26px; height:26px; border-radius:50%; border:2px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 12px rgba(0,0,0,0.5); font-size:12px;">
                  ${symbol}
                </div>
                <div style="background:rgba(15,23,42,0.92); color:#fff; font-size:8.5px; font-family:monospace; font-weight:bold; padding:2px 6px; border-radius:5px; border:1px solid rgba(255,255,255,0.25); white-space:nowrap; position:absolute; left:30px; top:2px;">
                  ${shortName} · ${motionLabel}
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
            <strong style="color:#0f172a; font-size:12px;">${symbol} ${popupName}</strong>
            <p style="color:#475569; font-size:10px; margin:3px 0;">Role: <strong>${roleLabel}</strong> · Status: ${u.status}</p>
            <p style="color:#0284c7; font-size:9.5px; font-family:monospace; margin:0;">GPS: ${u.latitude.toFixed(5)}, ${u.longitude.toFixed(5)}</p>
          </div>
        `)
        .on('click', () => this.onMapEntityClicked(this.selectedJobId()));

      this.liveUnitMarkers.set(u.id, marker);
    });
  }

  // ===========================================================================
  // LIVE CREW TRACKING ENGINE
  // Routes every accepted / auto-accepted installer & dispatch driver to their
  // assigned client destination and advances them in real time. Uses real GPS
  // fixes (store.liveLocations) when the crew member's device is transmitting;
  // otherwise shows an estimated position along the road route since acceptance.
  // Never moves the map camera.
  // ===========================================================================

  private acceptedInstallersFor(job: InstallationJob): { id: string; name: string; auto: boolean; at?: string }[] {
    const post = DeliveryMap.POST_ACCEPT_STATUSES.includes(job.status);
    const out: { id: string; name: string; auto: boolean; at?: string }[] = [];

    if (job.assignedInstallers && job.assignedInstallers.length > 0) {
      job.assignedInstallers.forEach(m => {
        const st = (m.status || '').toLowerCase();
        if (st === 'rejected' || st === 'declined') return;
        const accepted =
          st === 'accepted' || st === 'auto_accepted' || !!m.autoAccepted || post ||
          (!st && job.installerAssignmentStatus === 'accepted');
        if (accepted) {
          out.push({
            id: m.id,
            name: m.name,
            auto: !!m.autoAccepted || (!!job.installerAutoAccepted && !m.respondedAt),
            at: m.respondedAt || job.installerRespondedAt || job.acceptedAt
          });
        }
      });
    } else if (job.assignedInstallerId && (job.installerAssignmentStatus === 'accepted' || post)) {
      out.push({
        id: job.assignedInstallerId,
        name: job.assignedInstallerName || 'Installer',
        auto: !!job.installerAutoAccepted,
        at: job.installerRespondedAt || job.acceptedAt
      });
    }
    return out;
  }

  private isDriverAccepted(job: InstallationJob): boolean {
    if (!job.dispatcherId) return false;
    if (job.driverAssignmentStatus === 'rejected') return false;
    return job.driverAssignmentStatus === 'accepted' || !!job.driverAutoAccepted ||
      DeliveryMap.POST_ACCEPT_STATUSES.includes(job.status);
  }

  private findLive(lives: LiveLocation[], userId: string): LiveLocation | null {
    const l = lives.find(x => x.userId === userId);
    if (!l || l.status === 'offline') return null;
    const age = Date.now() - new Date(l.updatedAt).getTime();
    return isNaN(age) || age <= 15 * 60 * 1000 ? l : null;
  }

  /** Deterministic small offset so several installers from the same branch don't stack. */
  private offsetOrigin(base: { lat: number; lng: number }, seed: string): { lat: number; lng: number } {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    const angle = (Math.abs(h) % 360) * Math.PI / 180;
    const r = 0.008 + (Math.abs(h >> 8) % 12) / 1000; // ~0.9 – 2.2 km
    return { lat: base.lat + Math.sin(angle) * r, lng: base.lng + Math.cos(angle) * r };
  }

  private async fetchRoadRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<[number, number][]> {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const data = await res.json();
        const coords = data?.routes?.[0]?.geometry?.coordinates;
        if (Array.isArray(coords) && coords.length > 1) {
          return coords.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
        }
      }
    } catch {
      // fall back to procedural corridor
    }
    return this.generateAccraShortestRoadPath(origin, destination).points;
  }

  private buildCrewRoute(points: [number, number][], prevVersion = 0): CrewRoute {
    const cum = [0];
    for (let i = 1; i < points.length; i++) {
      cum.push(cum[i - 1] + this.haversineKm(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]));
    }
    return { points, cum, totalKm: Math.max(cum[cum.length - 1], 0.05), computedAt: Date.now(), version: prevVersion + 1 };
  }

  /** Returns a cached road route for the track, (re)fetching in the background when needed. */
  private ensureCrewRoute(t: CrewTrack): CrewRoute | null {
    const cached = this.crewRouteCache.get(t.key);
    let needsFetch = !cached;
    let from = t.origin;

    // Live GPS: re-route from the current position if the unit leaves the planned corridor
    if (cached && t.live) {
      const pos = { lat: t.live.latitude, lng: t.live.longitude };
      const { distKm } = this.nearestOnRoute(cached, pos);
      if (distKm > 0.25 && Date.now() - cached.computedAt > 30000) {
        needsFetch = true;
        from = pos;
      }
    } else if (!cached && t.live) {
      from = { lat: t.live.latitude, lng: t.live.longitude };
    }

    if (needsFetch && !this.crewRoutePending.has(t.key)) {
      this.crewRoutePending.add(t.key);
      void this.fetchRoadRoute(from, t.destination).then(points => {
        this.crewRouteCache.set(t.key, this.buildCrewRoute(points, cached?.version ?? 0));
        this.crewRoutePending.delete(t.key);
        this.syncCrewLayers();
      });
    }
    return cached || null;
  }

  private nearestOnRoute(route: CrewRoute, pos: { lat: number; lng: number }): { idx: number; distKm: number } {
    let idx = 0;
    let best = Infinity;
    route.points.forEach((p, i) => {
      const d = this.haversineKm(pos.lat, pos.lng, p[0], p[1]);
      if (d < best) { best = d; idx = i; }
    });
    return { idx, distKm: best };
  }

  private pointAlongRoute(route: CrewRoute, km: number): { lat: number; lng: number } {
    const { points, cum } = route;
    if (km <= 0) return { lat: points[0][0], lng: points[0][1] };
    for (let i = 1; i < points.length; i++) {
      if (cum[i] >= km) {
        const seg = cum[i] - cum[i - 1] || 1;
        const f = (km - cum[i - 1]) / seg;
        return {
          lat: points[i - 1][0] + (points[i][0] - points[i - 1][0]) * f,
          lng: points[i - 1][1] + (points[i][1] - points[i - 1][1]) * f
        };
      }
    }
    const last = points[points.length - 1];
    return { lat: last[0], lng: last[1] };
  }

  private lastLiveSample = new Map<string, { lat: number; lng: number; lastMovedAt: number }>();

  /** Determines whether a signed-in GPS unit is actually moving on the ground. */
  private isUnitMoving(userId: string, lat: number, lng: number, speedKmh?: number | null): boolean {
    const now = Date.now();
    const prev = this.lastLiveSample.get(userId);
    let lastMovedAt = prev?.lastMovedAt ?? 0;

    if (!prev) {
      this.lastLiveSample.set(userId, { lat, lng, lastMovedAt: 0 });
    } else {
      const movedKm = this.haversineKm(prev.lat, prev.lng, lat, lng);
      if (movedKm >= 0.01) {
        // Moved >= 10 meters on the ground
        lastMovedAt = now;
        this.lastLiveSample.set(userId, { lat, lng, lastMovedAt });
      }
    }

    if (speedKmh != null && speedKmh >= 2) {
      return true;
    }
    if (speedKmh != null && speedKmh < 1 && (!prev || this.haversineKm(prev.lat, prev.lng, lat, lng) < 0.01)) {
      return false;
    }
    return lastMovedAt > 0 && (now - lastMovedAt) < 45000;
  }

  private computeCrewState(t: CrewTrack, route: CrewRoute): CrewTrackState {
    const speed = DeliveryMap.CREW_SPEED_KMH;

    if (t.arrived) {
      const pos = t.live ? { lat: t.live.latitude, lng: t.live.longitude } : t.destination;
      return { mode: 'arrived', lat: pos.lat, lng: pos.lng, progress: 1, remainingKm: 0, etaMin: 0 };
    }

    // Simulation Mode Check: artificial movement for demo purposes & manual detours
    if (this.isSimulationMode()) {
      const sim = this.simulatedPositions()[t.key];
      if (sim) {
        const { idx } = this.nearestOnRoute(route, sim);
        const remainingKm = Math.max(0, route.totalKm - route.cum[idx]);
        const atSite = this.haversineKm(sim.lat, sim.lng, t.destination.lat, t.destination.lng) < 0.1;
        return {
          mode: sim.isOffRoute ? 'off-route' : (atSite ? 'arrived' : 'simulated'),
          lat: sim.lat,
          lng: sim.lng,
          progress: atSite ? 1 : Math.min(1, route.cum[idx] / route.totalKm),
          remainingKm: atSite ? 0 : remainingKm,
          etaMin: atSite ? 0 : Math.max(1, Math.round((remainingKm / speed) * 60))
        };
      }

      // Artificial road-following movement while in Simulation Mode
      const demoSpeedKmh = 45;
      const startMs = this.simulationStartedAt || this.mountedAt;
      const travelledKm = Math.max(0, ((Date.now() - startMs) / 3600000) * demoSpeedKmh);
      const progress = Math.min(1, travelledKm / route.totalKm);
      const pos = this.pointAlongRoute(route, progress * route.totalKm);
      const remainingKm = Math.max(0, route.totalKm - progress * route.totalKm);
      return {
        mode: progress >= 1 ? 'arrived' : 'simulated',
        lat: pos.lat,
        lng: pos.lng,
        progress,
        remainingKm,
        etaMin: progress >= 1 ? 0 : Math.max(1, Math.round((remainingKm / demoSpeedKmh) * 60))
      };
    }

    // Production Real-Time GPS: only moves when the unit's actual ground GPS coordinates move
    if (t.live) {
      const pos = { lat: t.live.latitude, lng: t.live.longitude };
      const { idx } = this.nearestOnRoute(route, pos);
      const remainingKm = Math.max(0, route.totalKm - route.cum[idx]);
      const atSite = this.haversineKm(pos.lat, pos.lng, t.destination.lat, t.destination.lng) < 0.1;
      const moving = !atSite && this.isUnitMoving(t.userId, pos.lat, pos.lng, t.live.speedKmh);
      const liveSpeed = t.live.speedKmh && t.live.speedKmh > 5 ? t.live.speedKmh : speed;
      return {
        mode: atSite ? 'arrived' : (moving ? 'live' : 'stationary'),
        lat: pos.lat,
        lng: pos.lng,
        progress: atSite ? 1 : Math.min(1, route.cum[idx] / route.totalKm),
        remainingKm: atSite ? 0 : remainingKm,
        etaMin: atSite ? 0 : Math.max(1, Math.round((remainingKm / liveSpeed) * 60))
      };
    }

    // Not signed in / No live GPS fix: remain stationary at origin with zero fake movement
    return {
      mode: 'offline',
      lat: t.origin.lat,
      lng: t.origin.lng,
      progress: 0,
      remainingKm: route.totalKm,
      etaMin: 0
    };
  }

  isCurrentSelfUnit(userId?: string, userName?: string, role?: string): boolean {
    const curRole = this.store.currentRole();
    if (curRole !== 'installer' && curRole !== 'dispatcher') return false;
    if (role && role !== curRole) return false;
    const curUser = this.store.currentUser();
    const apiId = this.store.apiUser()?.id;
    if (userId) {
      if (userId === curUser.id || (apiId && userId === apiId)) return true;
      if (curRole === 'installer' && this.store.resolveActiveInstallerIds().has(userId)) return true;
      if (curRole === 'dispatcher' && this.store.currentDispatcherId() === userId) return true;
    }
    if (userName && curUser.name && userName.trim().toLowerCase() === curUser.name.trim().toLowerCase()) {
      return true;
    }
    return false;
  }

  private selfPinIconHtml(labelHtml: string, pulseHtml = ''): string {
    return `
      <div style="position:relative; cursor:pointer;" title="Me">
        ${pulseHtml}
        <svg width="22" height="28" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.45)); display:block;">
          <defs>
            <linearGradient id="dmRedPinGrad" x1="16" y1="6" x2="52" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ff3b30"/>
              <stop offset="45%" stop-color="#dc2626"/>
              <stop offset="100%" stop-color="#8b0000"/>
            </linearGradient>
            <linearGradient id="dmRedPinHighlight" x1="20" y1="8" x2="34" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M32 2C15.4315 2 2 15.4315 2 32C2 50.5 24.5 72.5 30.35 77.95C31.28 78.82 32.72 78.82 33.65 77.95C39.5 72.5 62 50.5 62 32C62 15.4315 48.5685 2 32 2ZM32 44C38.6274 44 44 38.6274 44 32C44 25.3726 38.6274 20 32 20C25.3726 20 20 25.3726 20 32C20 38.6274 25.3726 44 32 44Z" fill="url(#dmRedPinGrad)" stroke="#7f1d1d" stroke-width="1.5"/>
          <path d="M13 24C14.5 14.5 22 8 31 7.5C23 11 17.5 17 15.5 25.5C14.5 26.5 12.7 25.8 13 24Z" fill="url(#dmRedPinHighlight)"/>
        </svg>
        <div style="background:rgba(15,23,42,0.92); color:#fff; font-size:8.5px; font-family:monospace; font-weight:800; padding:2px 6px; border-radius:5px; border:1px solid rgba(255,255,255,0.28); white-space:nowrap; position:absolute; left:25px; top:3px; display:flex; gap:4px; align-items:center;">
          ${labelHtml}
        </div>
      </div>
    `;
  }

  private crewIconHtml(t: CrewTrack, st: CrewTrackState): string {
    const isDriver = t.role === 'dispatcher';
    const isSelf = this.isCurrentSelfUnit(t.userId, t.userName, t.role);
    const bg = st.mode === 'off-route'
      ? '#e11d48'
      : (st.mode === 'offline' ? '#64748b' : (isDriver ? '#0284c7' : '#10b981'));
    const symbol = isDriver ? '🚚' : '🛠️';
    const first = isSelf ? 'Me' : ((t.userName || '').split(' ')[0] || (isDriver ? 'Driver' : 'Installer'));
    const badge = st.mode === 'off-route'
      ? 'OFF-ROUTE'
      : (st.mode === 'simulated' ? 'SIM'
        : (st.mode === 'live' ? 'MOVING'
          : (st.mode === 'stationary' ? 'STATIONARY'
            : (st.mode === 'arrived' ? 'ON SITE' : 'NOT SIGNED IN'))));
    const badgeBg = st.mode === 'off-route'
      ? '#e11d48'
      : (st.mode === 'simulated' ? '#d97706'
        : (st.mode === 'live' ? '#16a34a'
          : (st.mode === 'stationary' ? '#0284c7'
            : (st.mode === 'arrived' ? '#7c3aed' : '#64748b'))));
    const showPulse = st.mode === 'live' || st.mode === 'simulated' || st.mode === 'off-route';
    const pulse = showPulse
      ? `<div style="position:absolute; width:40px; height:40px; background:${bg}33; border-radius:50%; top:-8px; left:-8px; animation:ping 1.8s cubic-bezier(0,0,0.2,1) infinite;"></div>`
      : '';
    if (isSelf) {
      return this.selfPinIconHtml(
        `<span>Me → ${t.jobId}</span><span style="background:${badgeBg}; padding:0 4px; border-radius:3px; font-size:7.5px;">${badge}</span>`,
        pulse
      );
    }
    return `
      <div style="position:relative; cursor:pointer;">
        ${pulse}
        <div style="background:${bg}; color:#fff; width:26px; height:26px; border-radius:50%; border:2px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 12px rgba(0,0,0,0.5); font-size:12px;">${symbol}</div>
        <div style="background:rgba(15,23,42,0.92); color:#fff; font-size:8.5px; font-family:monospace; font-weight:bold; padding:2px 6px; border-radius:5px; border:1px solid rgba(255,255,255,0.25); white-space:nowrap; position:absolute; left:30px; top:2px; display:flex; gap:4px; align-items:center;">
          <span>${first} → ${t.jobId}</span>
          <span style="background:${badgeBg}; padding:0 4px; border-radius:3px; font-size:7.5px;">${badge}</span>
        </div>
      </div>`;
  }

  /** Diff-based renderer for crew routes & markers. Only moves markers when real GPS or simulation moves them. */
  private syncCrewLayers() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    const tracks = this.crewTracks();
    const showRoutes = this.showCrewRoutes();
    const keys = new Set(tracks.map(t => t.key));

    this.crewLines.forEach((entry, k) => {
      if (!keys.has(k) || !showRoutes) {
        this.map?.removeLayer(entry.line);
        this.crewLines.delete(k);
      }
    });
    this.crewMarkers.forEach((entry, k) => {
      if (!keys.has(k)) {
        this.map?.removeLayer(entry.marker);
        this.crewMarkers.delete(k);
      }
    });

    const states: Record<string, CrewTrackState> = {};

    for (const t of tracks) {
      const roleVisible = t.role === 'dispatcher' ? this.showTrucks() : this.showInstallers();
      const route = this.ensureCrewRoute(t);
      if (!route) continue;

      const st = this.computeCrewState(t, route);
      states[t.key] = st;

      // Route polyline
      const existingLine = this.crewLines.get(t.key);
      const dashed = st.mode !== 'live' && st.mode !== 'stationary';
      if (showRoutes && roleVisible) {
        if (!existingLine || existingLine.version !== route.version || existingLine.dashed !== dashed) {
          if (existingLine) this.map.removeLayer(existingLine.line);
          const line = leaflet.polyline(route.points, {
            color: t.role === 'dispatcher' ? '#0284c7' : '#10b981',
            weight: 4,
            opacity: (st.mode === 'arrived' || st.mode === 'offline') ? 0.35 : 0.75,
            lineCap: 'round',
            lineJoin: 'round',
            dashArray: dashed ? '6, 8' : undefined,
            interactive: false
          }).addTo(this.map);
          this.crewLines.set(t.key, { line, version: route.version, dashed });
        }
      } else if (existingLine) {
        this.map.removeLayer(existingLine.line);
        this.crewLines.delete(t.key);
      }

      // Moving marker
      const existingMarker = this.crewMarkers.get(t.key);
      if (!roleVisible) {
        if (existingMarker) {
          this.map.removeLayer(existingMarker.marker);
          this.crewMarkers.delete(t.key);
        }
        continue;
      }

      const isSelf = this.isCurrentSelfUnit(t.userId, t.userName, t.role);
      const crewDisplayName = isSelf ? 'Me' : t.userName;
      const crewIconSize: [number, number] = isSelf ? [22, 28] : [26, 26];
      const crewIconAnchor: [number, number] = isSelf ? [11, 27] : [13, 13];
      const iconKey = `${t.role}|${st.mode}|${t.userName}|${t.jobId}|${isSelf}`;
      if (!existingMarker) {
        const marker = leaflet.marker([st.lat, st.lng], {
          icon: leaflet.divIcon({ className: 'custom-crew-pin', html: this.crewIconHtml(t, st), iconSize: crewIconSize, iconAnchor: crewIconAnchor }),
          zIndexOffset: isSelf ? 700 : 500
        })
          .addTo(this.map)
          .bindPopup(`
            <div style="font-family:sans-serif; padding:2px;">
              <strong style="color:#0f172a; font-size:12px;">${isSelf ? '📍' : (t.role === 'dispatcher' ? '🚚' : '🛠️')} ${crewDisplayName}</strong>
              <p style="color:#475569; font-size:10px; margin:3px 0;">${t.role === 'dispatcher' ? 'Dispatch Driver' : 'Installer'} · ${t.autoAccepted ? 'Auto-accepted' : 'Accepted'}</p>
              <p style="color:#0f766e; font-size:10px; margin:0;">Work: <strong>${t.jobLabel}</strong></p>
            </div>
          `)
          .on('click', () => this.onMapEntityClicked(t.jobId));
        this.crewMarkers.set(t.key, { marker, iconKey });
      } else {
        existingMarker.marker.setLatLng([st.lat, st.lng]);
        if (existingMarker.iconKey !== iconKey) {
          existingMarker.marker.setIcon(
            leaflet.divIcon({ className: 'custom-crew-pin', html: this.crewIconHtml(t, st), iconSize: crewIconSize, iconAnchor: crewIconAnchor })
          );
          existingMarker.iconKey = iconKey;
        }
      }
    }

    this.crewStates.set(states);
  }

  /** Explicit user action: pan to a crew member's current position and select their track. */
  focusCrew(t: CrewTrack) {
    this.selectedJobId.set(t.jobId);
    this.selectedTrackKey.set(t.key);
    const pos = this.getActiveCrewPosition(t);
    if (!this.map) return;
    this.userHasInteractedWithMap = true;
    this.map.setView([pos.lat, pos.lng], Math.max(this.map.getZoom(), 15));
    this.crewMarkers.get(t.key)?.marker.openPopup();
  }

  onWorkFilterChange(jobId: string) {
    this.workFilter.set(jobId);
    if (jobId !== 'all') {
      this.selectJob(jobId);
    }
  }

  collapseHudManually() {
    if (this.hudRestoreTimer) {
      clearTimeout(this.hudRestoreTimer);
      this.hudRestoreTimer = null;
    }
    this.wasAutoMinimizedByMap = false;
    this.isHudMinimized.set(true);
  }

  private minimizeHudOnMapInteraction() {
    if (this.hudRestoreTimer) {
      clearTimeout(this.hudRestoreTimer);
      this.hudRestoreTimer = null;
    }
    if (!this.isHudMinimized()) {
      this.wasAutoMinimizedByMap = true;
      this.isHudMinimized.set(true);
    }
  }

  private scheduleHudAutoRestore(delayMs = 3000) {
    if (!this.wasAutoMinimizedByMap) return;
    if (this.hudRestoreTimer) {
      clearTimeout(this.hudRestoreTimer);
    }
    this.hudRestoreTimer = setTimeout(() => {
      this.hudRestoreTimer = null;
      if (this.wasAutoMinimizedByMap) {
        this.wasAutoMinimizedByMap = false;
        this.isHudMinimized.set(false);
      }
    }, delayMs);
  }

  onMapEntityClicked(jobId?: string | null) {
    if (this.hudRestoreTimer) {
      clearTimeout(this.hudRestoreTimer);
      this.hudRestoreTimer = null;
    }
    this.wasAutoMinimizedByMap = false;
    this.suppressMapMinimizeUntil = Date.now() + 700;
    if (jobId) {
      this.selectJob(jobId);
    } else {
      this.isHudMinimized.set(false);
    }
  }

  selectJob(jobId: string) {
    this.suppressMapMinimizeUntil = Date.now() + 700;
    this.wasAutoMinimizedByMap = false;
    this.selectedJobId.set(jobId);
    this.isHudMinimized.set(false);
    this.userHasInteractedWithMap = false; // User explicitly selected this job; allow route framing
    this.renderDestinationMarkers();
  }

  private onJobSelectionChanged(job: InstallationJob, allowFitBounds: boolean = false) {
    this.isOffRoute.set(false);
    this.hasRerouted.set(false);
    this.stepIndex = 0;

    if (this.offRouteTrailPolyline && this.map) {
      this.map.removeLayer(this.offRouteTrailPolyline);
      this.offRouteTrailPolyline = null;
    }

    const track = this.activeTrack();
    const origin = track ? this.getActiveCrewPosition(track) : this.getJobOriginCoordinates(job);
    const destination = this.getJobCoordinates(job);

    this.riderPosition.set(origin);

    this.calculateAndDisplayShortestRoute(origin, destination, false, allowFitBounds);
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

  /**
   * Extracts a Ghana Post GPS code (e.g. GD-018-5574 or GA-183-9340) from any text string.
   */
  extractGhanaPostCode(addr?: string): string | null {
    if (!addr) return null;
    const match = addr.match(/\b([A-Z]{2}-?\d{3,4}-?\d{4})\b/i);
    if (match) {
      const c = match[1].toUpperCase();
      return c.includes('-') ? c : `${c.slice(0, 2)}-${c.slice(2, 5)}-${c.slice(5)}`;
    }
    return null;
  }

  private resolveGhanaPostForJob(code: string) {
    if (this.pendingGhanaPost.has(code)) return;
    this.pendingGhanaPost.add(code);
    void this.store.resolveGhanaPostGps(code).then(loc => {
      this.pendingGhanaPost.delete(code);
      if (loc) {
        this.ghanaPostCoords.set(code, { lat: loc.lat, lng: loc.lng });
        this.renderDestinationMarkers();
        const cur = this.selectedJob();
        if (cur && (cur.client?.siteAddress || '').includes(code)) {
          this.onJobSelectionChanged(cur, false);
        }
      }
    });
  }

  /**
   * Search bar action: locate any Ghana Post GPS code on the map, drop a pin, and build route.
   */
  async locateGhanaPost(rawCode: string) {
    const loc = await this.store.resolveGhanaPostGps(rawCode);
    if (!loc) {
      this.alert.toastWarning('Location Not Found', `Ghana Post GPS code "${rawCode}" could not be resolved.`);
      return;
    }

    const leaflet = L;
    if (!this.map || !leaflet) return;

    this.userHasInteractedWithMap = true;
    this.map.setView([loc.lat, loc.lng], 16);

    if (this.ghanaPostMarker) {
      this.map.removeLayer(this.ghanaPostMarker);
    }

    const icon = leaflet.divIcon({
      className: 'custom-ghanapost-pin',
      html: `
        <div style="position:relative; cursor:pointer;" title="Ghana Post GPS: ${loc.code}">
          <div style="position:absolute; width:48px; height:48px; background:#0d948840; border-radius:50%; top:-12px; left:-12px; animation:ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="background:#0f766e; color:#fff; padding:5px 9px; border-radius:12px; font-weight:800; font-size:10px; font-family:sans-serif; box-shadow:0 4px 16px rgba(0,0,0,0.6); border:2px solid #5eead4; display:flex; align-items:center; gap:5px; white-space:nowrap;">
            <span>🇬🇭</span>
            <span>${loc.code}</span>
            <span style="background:rgba(255,255,255,0.25); color:#fff; font-size:8px; padding:1px 4px; border-radius:4px; font-weight:bold;">${loc.area || loc.district}</span>
          </div>
        </div>
      `,
      iconSize: [180, 28],
      iconAnchor: [90, 14]
    });

    this.ghanaPostMarker = leaflet.marker([loc.lat, loc.lng], { icon, zIndexOffset: 1200 })
      .addTo(this.map)
      .bindPopup(`
        <div style="font-family:sans-serif; padding:4px;">
          <strong style="color:#0f766e; font-size:13px;">🇬🇭 Ghana Post GPS: ${loc.code}</strong>
          <p style="color:#334155; font-size:11px; margin:4px 0 2px 0;"><strong>Street:</strong> ${loc.street || 'Odikoatwei Ave'}</p>
          <p style="color:#334155; font-size:11px; margin:0 0 2px 0;"><strong>Area / District:</strong> ${loc.area || loc.district}, ${loc.region}</p>
          <p style="color:#0284c7; font-size:10px; font-family:monospace; margin:4px 0 0 0;">GPS: ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</p>
        </div>
      `)
      .openPopup();

    const branch = this.visibleBranches()[0];
    const origin = branch ? { lat: branch.latitude, lng: branch.longitude } : { lat: 5.6320, lng: -0.0980 };
    this.calculateAndDisplayShortestRoute(origin, { lat: loc.lat, lng: loc.lng }, false, false);

    this.alert.toastSuccess('Ghana Post GPS Resolved', `${loc.code} (${loc.area || loc.district}) located on map.`);
  }

  private getJobCoordinates(job: InstallationJob): { lat: number; lng: number } {
    const rawAddr = job.client?.siteAddress || (job as any).address || '';

    // 1. Check if client site address contains a Ghana Post GPS code (e.g. GD-018-5574)
    const gpCode = this.extractGhanaPostCode(rawAddr);
    if (gpCode) {
      const resolved = this.ghanaPostCoords.get(gpCode);
      if (resolved) {
        return resolved;
      }
      this.resolveGhanaPostForJob(gpCode);
    }

    if (job.client?.coordinates && job.client.coordinates.lat && job.client.coordinates.lng) {
      return job.client.coordinates;
    }
    if ((job as any).lat && (job as any).lng) {
      return { lat: (job as any).lat, lng: (job as any).lng };
    }
    const addr = rawAddr.toLowerCase();
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
    isReroute: boolean = false,
    autoFitBounds: boolean = false
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

    // Only auto-frame camera if explicitly requested and the user hasn't panned/zoomed manually
    if (autoFitBounds && !this.userHasInteractedWithMap) {
      this.fitRouteBounds();
    }
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

  getActiveCrewPosition(track: CrewTrack | null): { lat: number; lng: number } {
    if (!track) {
      const job = this.selectedJob();
      if (job) {
        return this.getJobOriginCoordinates(job);
      }
      return this.riderPosition();
    }

    if (this.isSimulationMode()) {
      const sim = this.simulatedPositions()[track.key];
      if (sim) {
        return { lat: sim.lat, lng: sim.lng };
      }
      const st = this.crewStates()[track.key];
      if (st) {
        return { lat: st.lat, lng: st.lng };
      }
    }

    if (track.live) {
      return { lat: track.live.latitude, lng: track.live.longitude };
    }

    const st = this.crewStates()[track.key];
    if (st) {
      return { lat: st.lat, lng: st.lng };
    }

    return track.origin;
  }

  toggleDataMode() {
    const newMode = !this.isSimulationMode();
    this.isSimulationMode.set(newMode);
    this.showSimControls.set(newMode);
    if (!newMode) {
      // Switching back to Live GPS (Production): clear all simulated state & restore real-time locations
      this.simulationStartedAt = 0;
      this.simulatedPositions.set({});
      if (this.offRouteTrailPolyline && this.map) {
        this.map.removeLayer(this.offRouteTrailPolyline);
        this.offRouteTrailPolyline = null;
      }
      this.isOffRoute.set(false);
      this.hasRerouted.set(false);
      this.syncCrewLayers();
      const job = this.selectedJob();
      if (job) {
        this.onJobSelectionChanged(job, false);
      }
      this.alert.toastSuccess('Live GPS Active', 'Production mode enabled. Restored real-time live locations.');
    } else {
      // Switching to Simulation (Demo): start artificial movement along routes
      this.simulationStartedAt = Date.now();
      this.simulatedPositions.set({});
      this.syncCrewLayers();
      this.alert.toastInfo('Simulation Mode', 'Demo mode active. Crew units are now moving artificially along their routes.');
    }
  }

  updateRiderPosition(newPos: { lat: number; lng: number }) {
    this.riderPosition.set(newPos);
    const track = this.activeTrack();
    if (track && this.isSimulationMode()) {
      this.simulatedPositions.update(m => ({
        ...m,
        [track.key]: { lat: newPos.lat, lng: newPos.lng, isOffRoute: this.isOffRoute() }
      }));
    }
    this.syncCrewLayers();
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
        this.calculateAndDisplayShortestRoute(pos, dest, true, false);
      }
    } else {
      this.isOffRoute.set(false);
    }
  }

  simulateOffRouteDeviation() {
    if (!this.isSimulationMode()) {
      this.simulationStartedAt = Date.now();
      this.isSimulationMode.set(true);
    }

    const track = this.activeTrack();
    const cur = this.getActiveCrewPosition(track);
    const deviated = {
      lat: cur.lat + 0.0035,
      lng: cur.lng - 0.0030,
      isOffRoute: true
    };

    if (track) {
      this.simulatedPositions.update(m => ({
        ...m,
        [track.key]: deviated
      }));
    }

    this.riderPosition.set({ lat: deviated.lat, lng: deviated.lng });

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

    this.isOffRoute.set(true);
    this.hasRerouted.set(false);
    this.syncCrewLayers();

    const unitName = track ? `${track.userName} (${track.role === 'dispatcher' ? 'Driver' : 'Installer'})` : 'Active Unit';
    this.alert.toastWarning('Off-Route Detected', `${unitName} took an alternate turn. Dynamic re-routing initiated.`);

    setTimeout(() => {
      const job = this.selectedJob();
      if (job) {
        const dest = this.getJobCoordinates(job);
        this.calculateAndDisplayShortestRoute({ lat: deviated.lat, lng: deviated.lng }, dest, true, false);
      }
    }, 1000);
  }

  simulateAdvanceAlongRoute() {
    if (!this.isSimulationMode()) {
      this.simulationStartedAt = Date.now();
      this.isSimulationMode.set(true);
    }
    if (this.currentPlannedRoute.length === 0) return;
    this.stepIndex = Math.min(this.currentPlannedRoute.length - 1, this.stepIndex + 3);
    const pt = this.currentPlannedRoute[this.stepIndex];
    if (pt) {
      const newPos = { lat: pt[0], lng: pt[1], isOffRoute: false };
      const track = this.activeTrack();
      if (track) {
        this.simulatedPositions.update(m => ({
          ...m,
          [track.key]: newPos
        }));
      }
      if (this.offRouteTrailPolyline && this.map) {
        this.map.removeLayer(this.offRouteTrailPolyline);
        this.offRouteTrailPolyline = null;
      }
      this.riderPosition.set({ lat: pt[0], lng: pt[1] });
      this.syncCrewLayers();
      this.checkAndHandleOffRoute({ lat: pt[0], lng: pt[1] });
    }
  }

  recalculateCurrentRoute() {
    const job = this.selectedJob();
    if (!job) return;
    const track = this.activeTrack();
    const origin = track ? this.getActiveCrewPosition(track) : this.riderPosition();
    const dest = this.getJobCoordinates(job);
    this.calculateAndDisplayShortestRoute(origin, dest, true);
  }

  centerOnActiveUnit() {
    if (!this.map) return;
    const track = this.activeTrack();
    const pos = this.getActiveCrewPosition(track);
    this.map.setView([pos.lat, pos.lng], 15);
    if (track) {
      this.crewMarkers.get(track.key)?.marker.openPopup();
    }
  }

  centerOnRider() {
    this.centerOnActiveUnit();
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
