import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-pwa-status-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- 1. Intermittent Offline Connectivity Warning Banner -->
    @if (!pwa.isOnline()) {
      <aside 
        class="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs z-50 border-b border-amber-600 transition-all select-none"
        role="status"
        aria-live="polite"
        aria-label="Offline Mode Active"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping shrink-0" aria-hidden="true"></span>
          <mat-icon class="!text-base !w-4 !h-4 text-slate-950 shrink-0" aria-hidden="true">cloud_off</mat-icon>
          <div class="truncate">
            <span class="font-extrabold uppercase tracking-wide mr-1.5">Offline Mode Active:</span>
            <span class="font-medium text-slate-900">
              Intermittent job site reception detected. Service Worker is serving cached assets & door specifications.
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          @if (pwa.pendingSyncCount() > 0) {
            <span class="px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 font-mono font-bold text-[10px]">
              {{ pwa.pendingSyncCount() }} queued for sync
            </span>
          }
          <button 
            type="button"
            (click)="triggerManualSync()"
            class="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1 shadow-xs"
          >
            <mat-icon class="!text-xs">sync</mat-icon>
            <span>Retry Sync</span>
          </button>
        </div>
      </aside>
    }

    <!-- 2. Reconnection Toast (briefly shown when returning online) -->
    @if (pwa.isOnline() && showReconnectedToast()) {
      <aside 
        class="bg-emerald-600 text-white px-4 py-2 shadow-md flex items-center justify-between gap-3 text-xs z-50 border-b border-emerald-700 animate-in fade-in transition-all select-none"
        role="status"
        aria-live="polite"
      >
        <div class="flex items-center gap-2">
          <mat-icon class="!text-base !w-4 !h-4 text-white" aria-hidden="true">cloud_done</mat-icon>
          <span class="font-bold">Connection Restored:</span>
          <span>Online sync active. Offline actions synchronized with Operations Dispatch.</span>
        </div>
        <button 
          type="button" 
          (click)="showReconnectedToast.set(false)" 
          class="text-emerald-100 hover:text-white p-1"
          aria-label="Dismiss notification"
        >
          <mat-icon class="!text-xs">close</mat-icon>
        </button>
      </aside>
    }

    <!-- 3. iOS Installation Guide Modal -->
    @if (showIosModal()) {
      <div 
        class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        role="dialog"
        aria-labelledby="iosModalTitle"
        aria-modal="true"
      >
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold">
                DM
              </div>
              <div>
                <h3 id="iosModalTitle" class="text-sm font-extrabold text-slate-900 dark:text-white">Install DoorMaster on iOS</h3>
                <p class="text-[11px] text-slate-500 font-mono">Safari Web App Install</p>
              </div>
            </div>
            <button 
              type="button" 
              (click)="showIosModal.set(false)" 
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close modal"
            >
              <mat-icon class="!text-sm">close</mat-icon>
            </button>
          </div>

          <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
              <span>Tap the <strong class="text-slate-900 dark:text-white">Share</strong> icon in the Safari bottom bar.</span>
            </div>
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
              <span>Scroll down and select <strong class="text-slate-900 dark:text-white">Add to Home Screen</strong>.</span>
            </div>
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
              <span>Tap <strong class="text-slate-900 dark:text-white">Add</strong> in top-right to launch standalone with offline site storage!</span>
            </div>
          </div>

          <button 
            type="button"
            (click)="showIosModal.set(false)"
            class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 rounded-xl font-bold text-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    }

    <!-- 4. Cache & Offline Diagnostics Modal -->
    @if (showDiagnosticsModal()) {
      <div 
        class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        role="dialog"
        aria-labelledby="diagnosticsModalTitle"
        aria-modal="true"
      >
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <mat-icon class="text-teal-500">offline_pin</mat-icon>
              <div>
                <h3 id="diagnosticsModalTitle" class="text-sm font-extrabold text-slate-900 dark:text-white">Job Site Offline Cache Diagnostics</h3>
                <p class="text-[11px] text-slate-500 font-mono">Service Worker Version: {{ pwa.cacheStats().version }}</p>
              </div>
            </div>
            <button 
              type="button" 
              (click)="showDiagnosticsModal.set(false)" 
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close diagnostics"
            >
              <mat-icon class="!text-sm">close</mat-icon>
            </button>
          </div>

          <!-- Cache metrics grid -->
          <div class="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">App Shell Assets</span>
              <strong class="text-base text-slate-900 dark:text-white">{{ pwa.cacheStats().staticCount }} files</strong>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">Key API Payloads</span>
              <strong class="text-base text-teal-600 dark:text-teal-400">{{ pwa.cacheStats().apiCount }} endpoints</strong>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">Road Map Tiles</span>
              <strong class="text-base text-indigo-600 dark:text-indigo-400">{{ pwa.cacheStats().mapTilesCount }} tiles</strong>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">Pending Sync Items</span>
              <strong class="text-base text-amber-600 dark:text-amber-400">{{ pwa.pendingSyncCount() }} queued</strong>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
            <div class="flex items-center gap-1.5 font-bold">
              <mat-icon class="!text-xs">verified</mat-icon>
              <span>Installer Offline Readiness</span>
            </div>
            <p class="leading-relaxed">
              DoorMaster catalogs, hardware lock specs, technician clock widget, checklist, and signature captures are cached locally for zero-latency execution in cellular dead zones.
            </p>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <button 
              type="button"
              [disabled]="pwa.isPrecaching()"
              (click)="handlePrecacheClick()"
              class="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <mat-icon class="!text-xs" [class.animate-spin]="pwa.isPrecaching()">sync</mat-icon>
              <span>{{ pwa.isPrecaching() ? 'Pre-caching Site Assets...' : 'Pre-cache for Remote Sites' }}</span>
            </button>
            <button 
              type="button"
              (click)="showDiagnosticsModal.set(false)"
              class="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class PwaStatusBanner {
  readonly pwa = inject(PwaService);

  readonly showIosModal = signal<boolean>(false);
  readonly showDiagnosticsModal = signal<boolean>(false);
  readonly showReconnectedToast = signal<boolean>(false);

  constructor() {
    // Show brief toast when connection is restored
    let wasOffline = false;
    setInterval(() => {
      const online = this.pwa.isOnline();
      if (!online) {
        wasOffline = true;
      } else if (wasOffline) {
        wasOffline = false;
        this.showReconnectedToast.set(true);
        setTimeout(() => this.showReconnectedToast.set(false), 5000);
      }
    }, 1000);
  }

  triggerManualSync() {
    this.pwa.syncPendingActions();
    this.pwa.requestCacheStatus();
  }

  handlePrecacheClick() {
    this.pwa.precacheJobSiteData();
  }

  openIosGuide() {
    this.showIosModal.set(true);
  }

  openDiagnostics() {
    this.pwa.requestCacheStatus();
    this.showDiagnosticsModal.set(true);
  }
}
