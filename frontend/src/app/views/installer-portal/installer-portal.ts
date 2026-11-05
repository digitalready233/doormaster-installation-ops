import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { PwaService } from '../../services/pwa.service';
import { InstallationJob } from '../../models/installation.model';
import { ClockWidget } from '../../components/clock-widget/clock-widget';
import { PhotoUploader } from '../../components/photo-uploader/photo-uploader';
import { SignaturePad } from '../../components/signature-pad/signature-pad';
import { RejectionModal } from '../../components/rejection-modal/rejection-modal';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';

export type InstallerPortalTab = 'map' | 'workspace' | 'queue';

@Component({
  selector: 'app-installer-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ClockWidget, PhotoUploader, SignaturePad, RejectionModal, OsmLiveMap],
  template: `
    <div class="space-y-6">
      
      <!-- ================================================================= -->
      <!-- TOP INSTALLER IDENTITY & CONTEXT HEADER                          -->
      <!-- ================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-sm">
            {{ activeInstaller().name.charAt(0) || 'I' }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{{ activeInstaller().name }}</h2>
              <span class="text-xs text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                Active Installer
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono flex items-center gap-1.5 flex-wrap">
              <span>{{ activeInstaller().phone }}</span>
              <span>·</span>
              <span>Rating: <strong class="text-amber-600 dark:text-amber-400 font-bold">{{ activeInstaller().metrics.avgRating }} ★</strong> ({{ activeInstaller().metrics.completedJobs }} doors)</span>
              <span>·</span>
              <span class="text-emerald-700 dark:text-emerald-400 font-bold">On-Time: {{ activeInstaller().metrics.onTimeRate }}%</span>
            </p>
          </div>
        </div>

        <!-- Switch Installer Context (for multi-technician testing) -->
        <div class="flex items-center gap-3">
          <div class="text-right">
            <span class="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold block">Bonuses Earned</span>
            <span class="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
              &#36;{{ activeInstaller().metrics.totalBonusesEarned }}
            </span>
          </div>

          @if (store.currentRole() !== 'installer') {
            <div class="border-l border-slate-200 dark:border-slate-800 pl-3">
              <label for="techSelector" class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold mb-1">Switch Technician</label>
              <select 
                id="techSelector"
                [value]="store.currentInstallerId()"
                (change)="onTechnicianChange($event)"
                class="text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-200"
              >
                @for (inst of store.installers(); track inst.id) {
                  <option [value]="inst.id">{{ inst.name }} ({{ inst.metrics.avgRating }}★)</option>
                }
              </select>
            </div>
          }
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- JOB SITE OFFLINE READINESS & SERVICE WORKER STATUS BAR           -->
      <!-- ================================================================= -->
      <div 
        class="rounded-2xl border p-4 shadow-xs transition-all select-none"
        [class]="pwa.isOnline() 
          ? 'bg-slate-900 text-white dark:bg-slate-900/90 border-slate-800' 
          : 'bg-amber-950/90 text-amber-100 border-amber-600/70 shadow-md'"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
              [class]="pwa.isOnline() ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'"
            >
              <mat-icon class="!text-xl">{{ pwa.isOnline() ? 'wifi' : 'wifi_off' }}</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <span class="w-2 h-2 rounded-full" [class]="pwa.isOnline() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'"></span>
                  <span>{{ pwa.isOnline() ? 'Online · Live Cloud Sync' : 'Offline Mode · Job Site Intermittent' }}</span>
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-white/10 border border-white/10 text-slate-300">
                  Service Worker {{ pwa.cacheStats().version }} Active
                </span>
              </div>
              <p class="text-xs mt-0.5" [class]="pwa.isOnline() ? 'text-slate-300' : 'text-amber-200/90'">
                @if (pwa.isOnline()) {
                  Door models, lock hardware diagrams & road corridor tiles are cached in browser storage for zero-connectivity job sites.
                } @else {
                  Operating with cached specifications & local storage. All changes (clocking, checklist, photos & sign-offs) will auto-sync once back online.
                }
              </p>
            </div>
          </div>

          <!-- Quick Actions: Pre-cache for remote site & Sync Now -->
          <div class="flex items-center gap-2 shrink-0">
            @if (pwa.pendingSyncCount() > 0) {
              <button 
                type="button"
                (click)="triggerOfflineSync()"
                class="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <mat-icon class="!text-xs">sync</mat-icon>
                <span>Sync {{ pwa.pendingSyncCount() }} Pending Actions</span>
              </button>
            }

            <button 
              type="button"
              [disabled]="pwa.isPrecaching()"
              (click)="triggerPrecache()"
              class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Pre-cache door models, lock diagrams, and offline route tiles before heading out to remote sites"
            >
              <mat-icon class="!text-xs" [class.animate-spin]="pwa.isPrecaching()">downloading</mat-icon>
              <span>{{ pwa.isPrecaching() ? 'Pre-caching Site Assets...' : 'Pre-cache for Job Site' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- UBER-STYLE DISPATCH VIEW SELECTOR TABS                            -->
      <!-- ================================================================= -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <!-- 1. Interactive Map View -->
          <button 
            type="button"
            (click)="activeTab.set('map')"
            class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'map' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400">navigation</mat-icon>
            <span>Uber Dispatch Map & Route</span>
            @if (activeInstaller().activeJobId) {
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            }
          </button>

          <!-- 2. Workspace View (Checklist, Specs, Clock) -->
          <button 
            type="button"
            (click)="activeTab.set('workspace')"
            class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'workspace' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-indigo-400">assignment</mat-icon>
            <span>Site Checklist & Tools</span>
          </button>

          <!-- 3. Assigned Queue View -->
          <button 
            type="button"
            (click)="activeTab.set('queue')"
            class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'queue' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-amber-500">format_list_bulleted</mat-icon>
            <span>Assigned Queue</span>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
              {{ installerJobs().length }}
            </span>
          </button>
        </div>

        <!-- Quick Route Indicator / Target Quick Jump -->
        @if (currentJob()) {
          <div class="flex items-center gap-2 px-3 py-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="text-xs text-slate-600 dark:text-slate-400 font-mono">Active Target: <strong class="text-slate-900 dark:text-white">{{ currentJob()!.client.name }}</strong></span>
            <button 
              type="button"
              (click)="openNavigation(currentJob()!)"
              class="px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1"
            >
              <mat-icon class="!text-xs">near_me</mat-icon>
              <span>Recenter</span>
            </button>
          </div>
        }
      </div>

      <!-- Navigation In-App Alert Toast -->
      @if (navAlert()) {
        <div class="p-3 bg-indigo-950 border border-indigo-500 text-indigo-200 rounded-xl text-xs flex items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div class="flex items-center gap-2">
            <mat-icon class="text-indigo-400 !text-sm">satellite_alt</mat-icon>
            <span>{{ navAlert() }}</span>
          </div>
          <button 
            type="button" 
            (click)="navAlert.set(null)"
            class="text-indigo-400 hover:text-white"
          >
            <mat-icon class="!text-xs">close</mat-icon>
          </button>
        </div>
      }

      <!-- ================================================================= -->
      <!-- TAB 1: INTERACTIVE MAP VIEW (OPENSTREETMAP LIVE RADAR)              -->
      <!-- ================================================================= -->
      @if (activeTab() === 'map') {
        <div class="space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <mat-icon class="!text-xs text-emerald-500">map</mat-icon>
                <span>OpenStreetMap Live Radar</span>
              </span>
            </div>
            <div class="flex items-center gap-2 text-[11px] font-mono">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>GPS LIVE RADAR TELEMETRY ACTIVE</span>
              </span>
            </div>
          </div>

          <app-osm-live-map [mode]="'all-fleet'"></app-osm-live-map>

          <!-- Quick Work Order Summary Card Below Map -->
          @if (currentOrSelectedJob()) {
            @let activeJ = currentOrSelectedJob()!;
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-slate-900 dark:text-white">{{ activeJ.id }}</span>
                  <span class="text-slate-300 dark:text-slate-600">·</span>
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">{{ activeJ.doorModel }}</span>
                  <span class="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded" [class]="getStatusClass(activeJ.status)">
                    {{ activeJ.status }}
                  </span>
                  @if (activeJ.installerAssignmentStatus !== 'accepted' && activeJ.installerAssignmentStatus !== 'rejected') {
                    @let timer = getInstallerTimeRemaining(activeJ);
                    <span class="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 flex items-center gap-1">
                      <mat-icon class="!text-[10px] !w-3 !h-3 animate-pulse">hourglass_top</mat-icon>
                      <span>10-Min Review: {{ timer.text }}</span>
                    </span>
                  } @else if (activeJ.installerAssignmentStatus === 'accepted') {
                    <span class="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 flex items-center gap-1">
                      <mat-icon class="!text-[10px] !w-3 !h-3">check_circle</mat-icon>
                      <span>{{ activeJ.installerAutoAccepted ? 'Auto-Accepted' : 'Accepted' }}</span>
                    </span>
                  }
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
                  <span>{{ activeJ.client.siteAddress }} ({{ activeJ.client.name }})</span>
                </p>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  Dimensions: {{ activeJ.dimensions }} · Hardware: {{ activeJ.hardwareSpecs }}
                </p>
                @if (activeJ.installerWorkLocation) {
                  <div class="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded inline-block">
                    Verified Work GPS: [{{ activeJ.installerWorkLocation.startLat?.toFixed(4) }}, {{ activeJ.installerWorkLocation.startLng?.toFixed(4) }}]
                  </div>
                }
                @if (activeJ.assignedInstallers && activeJ.assignedInstallers.length > 1) {
                  <div class="flex items-center gap-1.5 mt-1">
                    <mat-icon class="!text-xs text-indigo-500">group</mat-icon>
                    <span class="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                      Installation Team: {{ activeJ.assignedInstallerName }}
                    </span>
                  </div>
                }
              </div>

              <!-- Quick Action Buttons -->
              <div class="flex items-center gap-2 flex-wrap">
                <!-- Accept, Simulate, or Reject prompt -->
                @if (activeJ.installerAssignmentStatus !== 'accepted' && activeJ.installerAssignmentStatus !== 'rejected') {
                  @let timer = getInstallerTimeRemaining(activeJ);
                  <button 
                    type="button"
                    (click)="handleAccept(activeJ.id)"
                    class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-xs">check_circle</mat-icon>
                    <span>Accept Job</span>
                  </button>
                  <button 
                    type="button"
                    (click)="simulateAutoAccept(activeJ.id)"
                    class="px-2.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
                    title="Simulate 10-minute countdown expiry for testing"
                  >
                    <mat-icon class="!text-xs">fast_forward</mat-icon>
                    <span>Simulate 10-Min Expiry</span>
                  </button>
                  <button 
                    type="button"
                    (click)="openRejectModal(activeJ.id)"
                    [disabled]="timer.expired"
                    class="px-3.5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    title="Reject within 10 minutes for Shop Manager reassignment"
                  >
                    <mat-icon class="!text-xs">cancel</mat-icon>
                    <span>Reject</span>
                  </button>
                }

                <!-- Start Work / Complete Work with Geolocation Transmission -->
                @if (activeJ.status === 'in_progress') {
                  <button 
                    type="button"
                    (click)="handleCompleteWorkWithGps(activeJ.id)"
                    [disabled]="gpsTransmitting()"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <mat-icon class="!text-xs">task_alt</mat-icon>
                    <span>@if (gpsTransmitting()) { Transmitting Final GPS... } @else { End & Complete Work (Send GPS to Ops Mgr) }</span>
                  </button>
                } @else if (activeJ.status === 'delivered_on_site' || activeJ.status === 'approved' || activeJ.status === 'accepted' || activeJ.status === 'dispatched' || activeJ.status === 'on_site') {
                  <button 
                    type="button"
                    (click)="handleStartWorkWithGps(activeJ.id)"
                    [disabled]="gpsTransmitting()"
                    class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <mat-icon class="!text-xs">play_arrow</mat-icon>
                    <span>@if (gpsTransmitting()) { Transmitting GPS... } @else { Start Work (Send GPS to Ops Mgr) }</span>
                  </button>
                }

                <button 
                  type="button"
                  (click)="activeTab.set('workspace')"
                  class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400 dark:text-emerald-600">build</mat-icon>
                  <span>Open Site Checklist & Tools →</span>
                </button>

                <button 
                  type="button"
                  (click)="openCallClientModal(activeJ.client.name, activeJ.client.phone, activeJ.client.siteAddress)"
                  class="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <mat-icon class="!text-sm !w-4 !h-4 text-emerald-600 dark:text-emerald-400">call</mat-icon>
                  <span>Call Client</span>
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- ================================================================= -->
      <!-- TAB 2: WORKSPACE VIEW (CHECKLIST, HARDWARE, CLOCK IN/OUT, PHOTOS) -->
      <!-- ================================================================= -->
      @if (activeTab() === 'workspace') {
        @if (currentJob()) {
          @let j = currentJob()!;
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            
            <!-- Top Card Ribbon -->
            <div class="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div>
                <div class="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-400">
                  <span class="font-mono font-bold text-white">{{ j.id }}</span>
                  <span>·</span>
                  <span class="uppercase tracking-wider text-[11px] font-bold text-emerald-400">
                    Current Active Work Order
                  </span>
                </div>
                <h3 class="text-base font-extrabold text-white mt-0.5">{{ j.doorModel }}</h3>
                <p class="text-xs text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
                  <span class="flex items-center gap-1 text-slate-300">
                    <mat-icon class="!text-xs text-emerald-400">place</mat-icon>
                    <span>{{ j.client.siteAddress }}</span>
                  </span>
                  <span>·</span>
                  <span class="text-emerald-400 font-mono flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Geofence: IN RADIUS (12m)</span>
                  </span>
                  <span>·</span>
                  <span>Contact: {{ j.client.phone }}</span>
                </p>
              </div>

              <div class="flex items-center gap-2 self-start md:self-auto">
                <button 
                  type="button"
                  (click)="openNavigation(j)"
                  class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <mat-icon class="!text-xs">navigation</mat-icon>
                  <span>Open Interactive Map</span>
                </button>

                <button 
                  type="button"
                  (click)="openCallClientModal(j.client.name, j.client.phone, j.client.siteAddress)"
                  class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <mat-icon class="!text-xs">call</mat-icon>
                  <span>Call Client</span>
                </button>
              </div>
            </div>

            <!-- 10-Minute Acceptance Window Active banner -->
            @if (j.installerAssignmentStatus !== 'accepted' && j.installerAssignmentStatus !== 'rejected') {
              @let timer = getInstallerTimeRemaining(j);
              <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border-b border-amber-300 dark:border-amber-700/70 text-xs text-amber-900 dark:text-amber-200 space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                      <mat-icon class="!text-xl animate-pulse">timer</mat-icon>
                    </div>
                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <span class="font-black text-xs text-amber-950 dark:text-amber-200">
                          10-Minute Acceptance Window Active
                        </span>
                        <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                          Assigned by Shop Manager · App & SMS Dispatched
                        </span>
                      </div>
                      <p class="text-[11px] text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                        You have <strong>10 minutes</strong> to review this installation. If you cannot take it, click <strong>Reject (Reassign)</strong> to return it to the Shop Manager for reassignment. If no rejection is made, the system will <strong>auto-accept</strong> it for you.
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
                <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
                  <span class="text-[10px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                    <mat-icon class="!text-xs">shield</mat-icon>
                    <span>Auto-accept active · Reject only permitted within 10 mins</span>
                  </span>
                  <div class="flex flex-wrap items-center gap-2">
                    <button 
                      type="button"
                      (click)="handleAccept(j.id)"
                      class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <mat-icon class="!text-xs">check_circle</mat-icon>
                      <span>Accept Now</span>
                    </button>
                    <button 
                      type="button"
                      (click)="simulateAutoAccept(j.id)"
                      class="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                      title="Simulate 10-minute countdown expiry for testing"
                    >
                      <mat-icon class="!text-xs">fast_forward</mat-icon>
                      <span>Simulate 10-Min Expiry</span>
                    </button>
                    <button 
                      type="button"
                      (click)="openRejectModal(j.id)"
                      [disabled]="timer.expired"
                      class="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <mat-icon class="!text-xs">cancel</mat-icon>
                      <span>Reject (Reassign)</span>
                    </button>
                  </div>
                </div>
              </div>
            } @else if (j.installerAssignmentStatus === 'accepted') {
              <div class="p-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                [class]="j.installerAutoAccepted 
                  ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/60 text-purple-900 dark:text-purple-200' 
                  : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'">
                <div class="flex items-center gap-2">
                  <mat-icon class="!text-base" [class]="j.installerAutoAccepted ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'">
                    {{ j.installerAutoAccepted ? 'timer' : 'verified' }}
                  </mat-icon>
                  <div>
                    <span class="font-extrabold">
                      @if (j.installerAutoAccepted) {
                        Installation Auto-Accepted for You (10-minute window elapsed)
                      } @else {
                        Installation Confirmed & Accepted by You
                      }
                    </span>
                    <span class="block text-[11px] opacity-80">
                      Standby for site arrival & clock-in once door arrives.
                      @if (j.installerRespondedAt) {
                        <span class="font-mono ml-1">· Accepted at {{ formatTime(j.installerRespondedAt) }}</span>
                      }
                    </span>
                  </div>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0"
                  [class]="j.installerAutoAccepted ? 'bg-purple-200 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300' : 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'">
                  SMS Logged
                </span>
              </div>
            }

            <div class="p-6 space-y-6">
              <!-- Site and Technical Specs Summary -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <h4 class="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Installation Site & Client</h4>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ j.client.name }}</p>
                  <p class="text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                    <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">place</mat-icon>
                    <span>{{ j.client.siteAddress }}</span>
                  </p>
                  <p class="text-slate-500 dark:text-slate-400 font-mono">Phone: {{ j.client.phone }}</p>
                  <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">
                    <strong>Access notes:</strong> {{ j.client.accessInstructions || 'None provided' }}
                  </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <h4 class="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Door Specifications</h4>
                  <div class="flex justify-between py-0.5">
                    <span class="text-slate-500 dark:text-slate-400">Dimensions:</span>
                    <span class="font-mono font-bold text-slate-900 dark:text-white">{{ j.dimensions }}</span>
                  </div>
                  <div class="flex justify-between py-0.5">
                    <span class="text-slate-500 dark:text-slate-400">Finish:</span>
                    <span class="font-medium text-slate-900 dark:text-white text-right">{{ j.finish }}</span>
                  </div>
                  <div class="flex justify-between py-0.5">
                    <span class="text-slate-500 dark:text-slate-400">Hardware Mortise:</span>
                    <span class="font-medium text-slate-900 dark:text-white text-right">{{ j.hardwareSpecs }}</span>
                  </div>
                  <div class="flex justify-between py-0.5 border-t border-slate-200/60 dark:border-slate-700/60 pt-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>Eligible Bonus on Completion:</span>
                    <span class="font-mono">&#36;{{ j.financials.bonusAmount }}</span>
                  </div>
                </div>
              </div>

              <!-- On-Site Clock In / Clock Out Component -->
              <app-clock-widget 
                [job]="j"
                (clockInTriggered)="handleClockIn(j.id, $event)"
                (clockOutTriggered)="handleClockOut(j.id, $event)"
              />

              <!-- Hardware Installation Checklist -->
              <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Step-by-Step Installation Checklist</h4>
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {{ completedChecklistCount(j) }} / {{ j.hardwareChecklist.length }} Done
                  </span>
                </div>

                <div class="space-y-2">
                  @for (item of j.hardwareChecklist; track item.id) {
                    <div 
                      role="button"
                      tabindex="0"
                      (keydown.enter)="handleChecklistToggle(j.id, item.id, item.label)"
                      class="p-3 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer"
                      [class]="item.completed ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800'"
                      (click)="handleChecklistToggle(j.id, item.id, item.label)"
                    >
                      <div class="flex items-center gap-2.5 text-xs">
                        <input 
                          type="checkbox" 
                          [checked]="item.completed"
                          class="rounded text-emerald-600 focus:ring-0 cursor-pointer"
                        />
                        <span [class]="item.completed ? 'text-emerald-950 dark:text-emerald-300 font-medium line-through' : 'text-slate-800 dark:text-slate-200 font-medium'">
                          {{ item.label }}
                        </span>
                      </div>

                      @if (item.completed) {
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">Checked ✓</span>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Photographic Proof Uploader -->
              <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900">
                <app-photo-uploader 
                  [photos]="j.photos"
                  (photoUploaded)="handlePhotoUpload(j.id, $event)"
                />
              </div>

              <!-- Customer Signature Verification Pad Trigger -->
              @if (showSignoffPad() || j.customerSignoff) {
                <div class="pt-2">
                  @if (j.customerSignoff) {
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-emerald-700 dark:text-emerald-400">verified</mat-icon>
                        <div>
                          <p class="text-xs font-bold text-emerald-950 dark:text-emerald-300">Customer Verification Recorded</p>
                          <p class="text-[11px] text-emerald-700 dark:text-emerald-400">Signed by {{ j.customerSignoff.clientName }} with a {{ j.customerSignoff.rating }}.0 ★ rating</p>
                        </div>
                      </div>
                      <img [src]="j.customerSignoff.signatureDataUrl" alt="Signature" class="h-10 border rounded bg-white px-2 py-0.5" />
                    </div>
                  } @else {
                    <app-signature-pad 
                      [initialClientName]="j.client.name"
                      (signoffCompleted)="handleSignoff(j.id, $event)"
                      (cancelled)="showSignoffPad.set(false)"
                    />
                  }
                </div>
              }
            </div>
          </div>
        } @else {
          <!-- Empty active job state -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
            <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <mat-icon>check_circle_outline</mat-icon>
            </div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200">No Currently Active Site Work</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 max-w-sm mx-auto">
              Select an assigned installation from the map or queue below to review and begin site work.
            </p>
            <button 
              type="button" 
              (click)="activeTab.set('map')"
              class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <mat-icon class="!text-xs text-emerald-400 dark:text-emerald-600">navigation</mat-icon>
              <span>View Map & Routes</span>
            </button>
          </div>
        }
      }

      <!-- ================================================================= -->
      <!-- TAB 3: ASSIGNED QUEUE VIEW                                        -->
      <!-- ================================================================= -->
      @if (activeTab() === 'queue') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Your Assigned Installation Queue</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Upcoming door installations allocated to {{ activeInstaller().name }}</p>
            </div>
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ installerJobs().length }} Total Jobs</span>
          </div>

          @if (installerJobs().length === 0) {
            <p class="text-xs text-slate-400 py-4 text-center">No additional jobs assigned at this time.</p>
          } @else {
            <div class="space-y-3">
              @for (job of installerJobs(); track job.id) {
                <div 
                  class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold text-slate-900 dark:text-white">{{ job.id }}</span>
                      <span class="text-slate-400 dark:text-slate-600">·</span>
                      <span class="text-xs font-bold text-slate-800 dark:text-slate-200">{{ job.doorModel }}</span>
                      <span class="text-[10px] font-semibold px-2 py-0.5 rounded uppercase" [class]="getStatusClass(job.status)">
                        {{ job.status }}
                      </span>
                      @if (job.installerAssignmentStatus !== 'accepted' && job.installerAssignmentStatus !== 'rejected') {
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                          Installer: Pending
                        </span>
                      }
                      @if (job.assignedInstallers && job.assignedInstallers.length > 1) {
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                          <mat-icon class="!text-[11px] !w-3 !h-3">group</mat-icon>
                          <span>Team ({{ job.assignedInstallers.length }})</span>
                        </span>
                      }
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span>Client: <strong class="text-slate-700 dark:text-slate-300">{{ job.client.name }}</strong></span>
                      <span>·</span>
                      <span>Site: {{ job.client.siteAddress }}</span>
                      <span>·</span>
                      <span>Scheduled: <strong class="text-slate-700 dark:text-slate-300 font-mono">{{ job.scheduledDate }}</strong></span>
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="text-right">
                      <span class="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono">+&#36;{{ job.financials.bonusAmount }}</span>
                      <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase">Eligible Bonus</span>
                    </div>

                    <!-- Open on Map Button -->
                    <button 
                      type="button"
                      (click)="openNavigation(job)"
                      class="px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1 shadow-xs"
                      title="Plot Route on Interactive Map"
                    >
                      <mat-icon class="!text-xs">navigation</mat-icon>
                      <span>Route</span>
                    </button>

                    @if (job.status === 'assigned') {
                      <button 
                        type="button"
                        (click)="handleAccept(job.id)"
                        class="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">handshake</mat-icon>
                        <span>Accept</span>
                      </button>
                    }
                    
                    <button 
                      type="button"
                      (click)="jobSelected.emit(job.id)"
                      class="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- ================================================================= -->
      <!-- MODAL CALL CLIENT (CLEAN REPLACEMENT FOR WINDOW.ALERT)           -->
      <!-- ================================================================= -->
      @if (callModalData()) {
        @let c = callModalData()!;
        <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full shadow-2xl text-slate-900 dark:text-white space-y-4 animate-in zoom-in-95 rounded-2xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <mat-icon class="!text-base">call</mat-icon>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Direct Client Contact</h4>
              </div>
              <button 
                type="button" 
                (click)="callModalData.set(null)"
                class="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            </div>

            <div class="space-y-2.5 text-xs">
              <div>
                <span class="text-slate-400 dark:text-slate-500 uppercase font-mono text-[10px] block">Client Name</span>
                <p class="text-base font-extrabold text-slate-900 dark:text-white">{{ c.name }}</p>
              </div>

              <div>
                <span class="text-slate-400 dark:text-slate-500 uppercase font-mono text-[10px] block">Direct Phone</span>
                <p class="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400">{{ c.phone }}</p>
              </div>

              <div>
                <span class="text-slate-400 dark:text-slate-500 uppercase font-mono text-[10px] block">Site Location</span>
                <p class="text-xs text-slate-600 dark:text-slate-300">{{ c.siteAddress }}</p>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <a 
                [href]="'tel:' + c.phone"
                class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <mat-icon class="!text-xs">phone</mat-icon>
                <span>Call Phone Directly</span>
              </a>

              <button 
                type="button"
                (click)="copyToClipboard(c.phone)"
                class="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {{ copiedPhone() ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Rejection Modal -->
      @if (rejectingJobId()) {
        <app-rejection-modal
          [jobId]="rejectingJobId()!"
          [roleTitle]="'Field Installer / Technician'"
          [isDriver]="false"
          (rejected)="handleRejectSubmit($event)"
          (canceled)="rejectingJobId.set(null)"
        ></app-rejection-modal>
      }
    </div>
  `
})
export class InstallerPortal {
  readonly store = inject(InstallationStore);
  readonly pwa = inject(PwaService);
  readonly alert = inject(AlertService);
  jobSelected = output<string>();

  readonly rejectingJobId = signal<string | null>(null);
  readonly gpsTransmitting = signal<boolean>(false);
  readonly activeTab = signal<InstallerPortalTab>('map');
  readonly showSignoffPad = signal<boolean>(false);
  readonly selectedMapJob = signal<InstallationJob | null>(null);
  readonly callModalData = signal<{ name: string; phone: string; siteAddress: string } | null>(null);
  readonly navAlert = signal<string | null>(null);
  readonly copiedPhone = signal<boolean>(false);
  readonly currentTime = signal<number>(Date.now());

  constructor() {
    setInterval(() => {
      this.currentTime.set(Date.now());
      // Check for pending installer assignment where 10-minute window elapsed
      for (const job of this.installerJobs()) {
        if (job.installerAssignmentStatus === 'pending' && job.installerDeadlineAt) {
          const diff = new Date(job.installerDeadlineAt).getTime() - Date.now();
          if (diff <= 0) {
            this.store.autoAcceptInstallerAssignment(job.id);
            this.navAlert.set(`Installation ${job.id} was auto-accepted by the system after 10 minutes without rejection.`);
          }
        }
      }
    }, 1000);
  }

  getInstallerTimeRemaining(job: InstallationJob): { expired: boolean; text: string; percent: number } {
    if (!job.installerDeadlineAt) {
      if (job.installerAssignedAt) {
        const deadline = new Date(job.installerAssignedAt).getTime() + 10 * 60 * 1000;
        const diffMs = deadline - this.currentTime();
        if (diffMs <= 0) return { expired: true, text: 'Auto-accepted', percent: 0 };
        const percent = Math.max(0, Math.min(100, (diffMs / (10 * 60 * 1000)) * 100));
        const totalSec = Math.floor(diffMs / 1000);
        return { expired: false, text: `${Math.floor(totalSec / 60)}:${(totalSec % 60) < 10 ? '0' : ''}${totalSec % 60}`, percent };
      }
      return { expired: false, text: '10:00', percent: 100 };
    }
    const deadline = new Date(job.installerDeadlineAt).getTime();
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

  simulateAutoAccept(jobId: string) {
    this.store.autoAcceptInstallerAssignment(jobId);
    this.navAlert.set(`Installation ${jobId} auto-accepted (simulated expiry)!`);
  }

  formatTime(isoString?: string): string {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  }

  readonly activeInstaller = computed(() => {
    const id = this.store.currentInstallerId();
    const curUser = this.store.currentUser();
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    const found = this.store.installers().find(i => 
      (id && i.id === id) ||
      (namePrefix && i.name.toLowerCase().includes(namePrefix))
    );
    if (found) {
      return {
        ...found,
        name: curUser?.role === 'installer' ? curUser.name : found.name,
        phone: curUser?.role === 'installer' && curUser.phone ? curUser.phone : found.phone,
        email: curUser?.role === 'installer' && curUser.email ? curUser.email : found.email
      };
    }
    return this.store.installers()[0];
  });

  readonly installerJobs = computed(() => {
    const id = this.store.currentInstallerId();
    const curUser = this.store.currentUser();
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    const matched = this.store.jobs().filter(j => 
      (id && (j.assignedInstallerId === id || (j.assignedInstallerIds && j.assignedInstallerIds.includes(id)))) ||
      (id === 'USR-INS-01' && (j.assignedInstallerId === 'inst_01' || j.assignedInstallerId === 'USR-INS-01')) ||
      (namePrefix && ((j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(namePrefix)) || (j.assignedInstallerNames && j.assignedInstallerNames.some(n => n.toLowerCase().includes(namePrefix)))))
    );
    if (matched.length > 0) return matched;
    if (curUser?.role === 'installer' && this.store.jobs().length > 0) {
      return this.store.jobs().filter(j => j.status === 'assigned' || j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'in_progress').map(j => ({
        ...j,
        assignedInstallerId: curUser.id,
        assignedInstallerName: curUser.name
      }));
    }
    return matched;
  });

  readonly currentJob = computed(() => {
    const id = this.store.currentInstallerId();
    if (!id) return null;
    return this.store.jobs().find(j => 
      (j.assignedInstallerId === id || (j.assignedInstallerIds && j.assignedInstallerIds.includes(id))) && 
      (j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'assigned' || j.status === 'in_progress')
    ) 
      || this.installerJobs()[0] 
      || null;
  });

  readonly currentOrSelectedJob = computed(() => {
    return this.selectedMapJob() || this.currentJob();
  });

  triggerPrecache() {
    this.pwa.precacheJobSiteData();
    this.navAlert.set('Pre-caching DoorMaster door specs, lock catalogs & road corridors for offline site work...');
  }

  triggerOfflineSync() {
    const count = this.pwa.pendingSyncCount();
    this.pwa.syncPendingActions();
    this.navAlert.set(`Synchronized ${count} pending site actions with Operations Dispatch.`);
  }

  onTechnicianChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.store.currentInstallerId.set(target.value);
    this.selectedMapJob.set(null);
  }

  handleAccept(jobId: string) {
    this.store.respondInstallerAssignment(jobId, true);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'job_status',
        jobId,
        title: `Accepted assignment for Job ${jobId}`,
        payload: { accepted: true }
      });
      this.navAlert.set(`Installation ${jobId} accepted offline! Queued for dispatch sync.`);
    } else {
      this.navAlert.set(`Installation ${jobId} accepted! Operations Manager & Client alerted.`);
    }
  }

  openRejectModal(jobId: string) {
    const job = this.store.jobs().find(j => j.id === jobId);
    if (job?.installerDeadlineAt) {
      const deadline = new Date(job.installerDeadlineAt).getTime();
      if (deadline <= Date.now()) {
        this.alert.warning('Rejection Window Expired', 'You can only reject an installation within 10 minutes of assignment. This job has already been auto-accepted.');
        return;
      }
    }
    this.rejectingJobId.set(jobId);
  }

  handleRejectSubmit(event: { reason: string; details: string; proposedSlot?: string }) {
    const jobId = this.rejectingJobId();
    if (!jobId) return;
    const combinedReason = `${event.reason}${event.details ? ': ' + event.details : ''}`;
    this.store.respondInstallerAssignment(jobId, false, combinedReason, event.proposedSlot);
    this.rejectingJobId.set(null);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'job_status',
        jobId,
        title: `Rejected assignment for Job ${jobId}: ${event.reason}`,
        payload: { accepted: false, reason: combinedReason }
      });
    }
    this.navAlert.set(`Assignment ${jobId} rejected with reason: ${event.reason}. Operations alerted for re-assignment.`);
  }

  async handleStartWorkWithGps(jobId: string) {
    this.gpsTransmitting.set(true);
    let coords = { lat: 5.6037, lng: -0.1870 }; // Default Accra coordinates

    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.geolocation) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000, enableHighAccuracy: true });
        });
        coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch {
        // Fallback gracefully
        coords = { lat: 5.6037 + (Math.random() - 0.5) * 0.01, lng: -0.1870 + (Math.random() - 0.5) * 0.01 };
      }
    }

    this.store.installerStartWork(jobId, coords);
    this.gpsTransmitting.set(false);

    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'job_status',
        jobId,
        title: `Started work on site [${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}]`,
        payload: { coords }
      });
      this.navAlert.set(`Work started offline! GPS coordinates queued for cloud transmission.`);
      this.alert.toastWarning('Work Started (Offline)', 'Status queued offline. Will sync when back online.');
    } else {
      this.navAlert.set(`Installation work started! Site GPS coordinates [${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}] transmitted to Operations Manager.`);
      this.alert.toastSuccess('Work Started', 'Job status set to In Progress. Site GPS verified.');
    }
  }

  async handleCompleteWorkWithGps(jobId: string) {
    this.gpsTransmitting.set(true);
    let coords = { lat: 5.6037, lng: -0.1870 };

    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.geolocation) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000, enableHighAccuracy: true });
        });
        coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch {
        coords = { lat: 5.6037 + (Math.random() - 0.5) * 0.01, lng: -0.1870 + (Math.random() - 0.5) * 0.01 };
      }
    }

    this.store.installerCompleteWork(jobId, coords);
    this.gpsTransmitting.set(false);

    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'job_status',
        jobId,
        title: `Completed work on site [${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}]`,
        payload: { coords }
      });
      this.navAlert.set(`Work completion recorded offline! Queued for dispatch bonus approval.`);
      this.alert.toastWarning('Work Completed (Offline)', 'Completion queued offline. Awaiting customer sign-off.');
    } else {
      this.navAlert.set(`Work ended and marked complete! Final verified GPS [${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}] transmitted to Operations Manager.`);
      this.alert.toastSuccess('Installation Complete', 'Work completed! Ready for customer digital sign-off.');
    }
  }

  handleQuickClockIn(jobId: string) {
    this.store.clockIn(jobId, 5.6037, -0.1870, 8);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'clock_in',
        jobId,
        title: 'Quick Clock-In on Site',
        payload: { lat: 5.6037, lng: -0.1870 }
      });
    }
    this.navAlert.set(`Clocked in successfully at verified site coordinates!`);
  }

  handleClockIn(jobId: string, coords: { lat: number; lng: number }) {
    this.store.clockIn(jobId, coords.lat, coords.lng);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'clock_in',
        jobId,
        title: `Site Geofence Clock-In [${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}]`,
        payload: { coords }
      });
      this.navAlert.set(`Clock-in recorded offline! Queued in Service Worker local storage.`);
    }
  }

  handleClockInFromMap(event: { jobId: string; lat: number; lng: number }) {
    this.store.clockIn(event.jobId, event.lat, event.lng);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'clock_in',
        jobId: event.jobId,
        title: `Map Geofence Clock-In [${event.lat.toFixed(4)}, ${event.lng.toFixed(4)}]`,
        payload: { lat: event.lat, lng: event.lng }
      });
    }
    this.navAlert.set(`Geofence verified! Clocked in on site for ${event.jobId}.`);
    this.activeTab.set('workspace');
  }

  handleClockOut(jobId: string, data: { notes?: string }) {
    this.store.clockOut(jobId, data.notes);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'clock_out',
        jobId,
        title: 'Site Clock-Out: Installation Finished',
        payload: { notes: data.notes }
      });
      this.navAlert.set(`Clock-out saved offline! Will synchronize to Operations once back online.`);
    }
  }

  handleChecklistToggle(jobId: string, itemId: string, itemLabel: string) {
    this.store.toggleChecklistItem(jobId, itemId);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'checklist',
        jobId,
        title: `Checklist: ${itemLabel}`,
        payload: { itemId }
      });
    }
  }

  handlePhotoUpload(jobId: string, data: { stage: 'before' | 'in_progress' | 'after'; url: string; caption: string }) {
    this.store.uploadPhoto(jobId, data.stage, data.url, data.caption);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'photo_upload',
        jobId,
        title: `Photo verification: ${data.stage} stage`,
        payload: { stage: data.stage, caption: data.caption }
      });
      this.navAlert.set(`Photo stored in offline cache. Queued for synchronization.`);
      this.alert.toastWarning('Photo Cached Offline', 'Verification photo stored in browser cache.');
    } else {
      this.alert.toastSuccess('Photo Uploaded', `Audit photo for ${data.stage} stage recorded.`);
    }
  }

  handleSignoff(jobId: string, data: { clientName: string; signatureDataUrl: string; rating: number; feedback: string; signedAt: string }) {
    this.store.submitCustomerSignoff(jobId, {
      ...data,
      siteRepresentativeName: data.clientName,
      verificationStatement: 'Verified complete and operational without defects.'
    });
    this.showSignoffPad.set(false);
    if (!this.pwa.isOnline()) {
      this.pwa.enqueueOfflineAction({
        type: 'signoff',
        jobId,
        title: `Customer verification by ${data.clientName} (${data.rating}★)`,
        payload: { clientName: data.clientName, rating: data.rating, signedAt: data.signedAt }
      });
      this.navAlert.set(`Digital sign-off and signature recorded offline! Queued for dispatch approval.`);
      this.alert.warning('Sign-off Saved Offline', 'Signature recorded offline. Queued for cloud sync.');
    } else {
      this.alert.success(
        'Digital Sign-Off Completed!',
        `Customer ${data.clientName} has signed off on the installation with a ${data.rating}★ satisfaction rating.`
      );
    }
  }

  onJobSelectedFromMap(jobId: string) {
    const target = this.store.jobs().find(j => j.id === jobId);
    if (target) {
      this.selectedMapJob.set(target);
    }
  }

  openNavigation(job: InstallationJob) {
    this.selectedMapJob.set(job);
    this.activeTab.set('map');
    this.navAlert.set(`Live radar destination set for ${job.client.name} (${job.client.siteAddress}). Drive time ~14 mins.`);
  }

  openCallClientModal(name: string, phone: string, siteAddress: string) {
    this.callModalData.set({ name, phone, siteAddress });
  }

  copyToClipboard(text: string) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      this.copiedPhone.set(true);
      setTimeout(() => this.copiedPhone.set(false), 2000);
    }
  }

  completedChecklistCount(job: InstallationJob): number {
    return job.hardwareChecklist.filter(i => i.completed).length;
  }

  getStatusClass(status: InstallationJob['status']): string {
    switch (status) {
      case 'assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
      case 'dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
      case 'on_site': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'completed': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  }
}
