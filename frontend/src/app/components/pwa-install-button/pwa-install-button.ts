import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-pwa-install-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Suppressed if already installed as standalone PWA -->
    @if (!pwa.isInstalled()) {
      <!-- 1. Chromium / Android / Desktop flow with beforeinstallprompt -->
      @if (pwa.isInstallable()) {
        <button
          type="button"
          (click)="handleInstall()"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-xs font-bold transition-all shadow-xs group"
          title="Install DoorMaster PWA for offline field access"
        >
          <mat-icon class="!text-xs !w-4 !h-4 text-emerald-400 group-hover:scale-110 transition-transform">download_for_offline</mat-icon>
          <span>Install App</span>
        </button>
      }

      <!-- 2. iOS Safari Flow -->
      @else if (pwa.isIOS()) {
        <button
          type="button"
          (click)="showIosModal.set(true)"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Install DoorMaster on iPhone or iPad"
        >
          <mat-icon class="!text-xs !w-4 !h-4 text-sky-500">add_to_home_screen</mat-icon>
          <span>Install on iOS</span>
        </button>
      }

      <!-- 3. Ambient PWA Ready / Cache Pre-warm Button -->
      @else {
        <button
          type="button"
          (click)="handlePrecache()"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-mono font-semibold hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          title="Service Worker Active — Click to pre-cache offline site data"
        >
          <span class="w-2 h-2 rounded-full" [class]="pwa.isOnline() ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'"></span>
          <span class="text-[11px]">{{ pwa.isOnline() ? 'SW Offline Ready' : 'Operating Offline' }}</span>
        </button>
      }
    }

    <!-- iOS Install Guide Modal -->
    @if (showIosModal()) {
      <div 
        class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        role="dialog"
        aria-labelledby="iosButtonModalTitle"
        aria-modal="true"
      >
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between">
            <h3 id="iosButtonModalTitle" class="text-sm font-extrabold text-slate-900 dark:text-white">Install DoorMaster on iOS</h3>
            <button 
              type="button" 
              (click)="showIosModal.set(false)" 
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <mat-icon class="!text-sm">close</mat-icon>
            </button>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            1. Tap the <strong class="text-slate-900 dark:text-white">Share</strong> button in Safari.<br>
            2. Scroll down and tap <strong class="text-slate-900 dark:text-white">Add to Home Screen</strong>.<br>
            3. Tap <strong class="text-slate-900 dark:text-white">Add</strong> to install.
          </p>
          <button 
            type="button" 
            (click)="showIosModal.set(false)"
            class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      </div>
    }
  `
})
export class PwaInstallButton {
  readonly pwa = inject(PwaService);
  readonly showIosModal = signal<boolean>(false);

  async handleInstall() {
    await this.pwa.promptInstall();
  }

  handlePrecache() {
    this.pwa.precacheJobSiteData();
  }
}
