import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PwaService } from '../../services/pwa.service';

const STORAGE_PROMPT_DISMISSED_KEY = 'dm_pwa_install_prompt_dismissed_v1';
const STORAGE_INSTALLED_KEY = 'dm_pwa_installed_v1';

@Component({
  selector: 'app-pwa-install-prompt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (shouldShow()) {
      <!-- ================================================================= -->
      <!-- 1. MOBILE VIEW (< 640px): Bottom Sheet App Install Drawer         -->
      <!-- ================================================================= -->
      <div
        class="sm:hidden fixed inset-x-3 bottom-4 z-[70] rounded-2xl bg-white dark:bg-[#181A1F] border border-slate-200 dark:border-white/15 shadow-2xl p-4 space-y-3 animate-in slide-in-from-bottom-4 duration-200"
        role="dialog"
        aria-label="Install DoorMaster App"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-11 rounded-xl bg-[#59000A] text-white flex items-center justify-center font-mono font-black text-sm shadow-md shrink-0">
              DM
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h3 class="text-sm font-black text-[#111215] dark:text-white truncate">DoorMaster App</h3>
                <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#59000A]/10 text-[#59000A] dark:bg-[#59000A]/40 dark:text-rose-200">
                  MOBILE
                </span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Add to your home screen for fast field access &amp; offline sync.
              </p>
            </div>
          </div>

          <button
            type="button"
            (click)="dismiss()"
            aria-label="Dismiss install prompt"
            class="p-1 text-slate-400 hover:text-[#111215] dark:hover:text-white rounded-lg cursor-pointer shrink-0"
          >
            <mat-icon class="!text-base">close</mat-icon>
          </button>
        </div>

        @if (pwa.isIOS()) {
          <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <mat-icon class="!text-base text-sky-500 shrink-0">ios_share</mat-icon>
            <span>Tap <strong>Share</strong> then <strong>Add to Home Screen</strong> to install.</span>
          </div>
        }

        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="dismiss()"
            class="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
          >
            Not Now
          </button>
          <button
            type="button"
            (click)="install()"
            class="flex-[1.6] py-2.5 px-3 rounded-xl bg-[#59000A] hover:bg-[#73000E] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <mat-icon class="!text-sm">{{ pwa.isIOS() ? 'done' : 'download_for_offline' }}</mat-icon>
            <span>{{ pwa.isIOS() ? 'Got It' : 'Install App' }}</span>
          </button>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- 2. TABLET VIEW (640px - 1023px): Centered Split Showcase Modal    -->
      <!-- ================================================================= -->
      <div
        class="hidden sm:flex lg:hidden fixed inset-0 z-[70] bg-black/55 backdrop-blur-xs items-center justify-center p-6 animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Install DoorMaster Tablet App"
      >
        <div class="w-full max-w-xl rounded-3xl overflow-hidden bg-white dark:bg-[#181A1F] border border-slate-200 dark:border-white/15 shadow-2xl grid grid-cols-12">
          <div class="col-span-5 bg-[#59000A] text-white p-6 flex flex-col justify-between">
            <div class="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center font-mono font-black text-base">
              DM
            </div>
            <div class="space-y-2">
              <span class="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/15">
                Tablet Edition
              </span>
              <h3 class="text-lg font-black leading-tight">DoorMaster Installation Ops</h3>
              <p class="text-[11px] text-white/80 leading-relaxed">
                Full-screen field workspace with offline job sync and live GPS dispatch.
              </p>
            </div>
          </div>

          <div class="col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h4 class="text-sm font-black text-[#111215] dark:text-white">Install on Your Tablet</h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Launch directly from your home screen without browser bars.</p>
              </div>
              <button
                type="button"
                (click)="dismiss()"
                aria-label="Close install dialog"
                class="p-1 text-slate-400 hover:text-[#111215] dark:hover:text-white rounded-lg cursor-pointer"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div class="flex items-center gap-2">
                <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">offline_bolt</mat-icon>
                <span>Works offline at installation sites</span>
              </div>
              <div class="flex items-center gap-2">
                <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">bolt</mat-icon>
                <span>Instant launch &amp; cached maps</span>
              </div>
              @if (pwa.isIOS()) {
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/10 text-[11px] flex items-center gap-2">
                  <mat-icon class="!text-base text-sky-500 shrink-0">ios_share</mat-icon>
                  <span>Tap <strong>Share</strong> → <strong>Add to Home Screen</strong></span>
                </div>
              }
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                (click)="dismiss()"
                class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Later
              </button>
              <button
                type="button"
                (click)="install()"
                class="px-4 py-2 rounded-xl bg-[#59000A] hover:bg-[#73000E] text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="!text-sm">{{ pwa.isIOS() ? 'done' : 'download_for_offline' }}</mat-icon>
                <span>{{ pwa.isIOS() ? 'Got It' : 'Install Tablet App' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- 3. DESKTOP VIEW (>= 1024px): Floating Bottom-Right Desktop Card   -->
      <!-- ================================================================= -->
      <div
        class="hidden lg:flex fixed bottom-6 right-6 z-[70] w-[380px] flex-col rounded-2xl bg-white dark:bg-[#181A1F] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden animate-in slide-in-from-right-4 duration-200"
        role="dialog"
        aria-label="Install DoorMaster Desktop App"
      >
        <div class="h-1.5 w-full bg-[#59000A]"></div>
        <div class="p-4 space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#59000A] text-white flex items-center justify-center font-mono font-black text-xs shadow-sm shrink-0">
                DM
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="text-sm font-black text-[#111215] dark:text-white">Install DoorMaster</h3>
                  <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                    DESKTOP
                  </span>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  Run as a dedicated standalone desktop window.
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="dismiss()"
              aria-label="Dismiss desktop install prompt"
              class="p-1 text-slate-400 hover:text-[#111215] dark:hover:text-white rounded-lg cursor-pointer"
            >
              <mat-icon class="!text-base">close</mat-icon>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-300">
            <div class="p-2 rounded-lg bg-slate-50 dark:bg-[#111215] border border-slate-200/70 dark:border-white/10 text-center">
              <mat-icon class="!text-sm text-[#59000A] dark:text-rose-300 block mx-auto mb-0.5">desktop_windows</mat-icon>
              <span>App Window</span>
            </div>
            <div class="p-2 rounded-lg bg-slate-50 dark:bg-[#111215] border border-slate-200/70 dark:border-white/10 text-center">
              <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400 block mx-auto mb-0.5">cloud_done</mat-icon>
              <span>Offline Sync</span>
            </div>
            <div class="p-2 rounded-lg bg-slate-50 dark:bg-[#111215] border border-slate-200/70 dark:border-white/10 text-center">
              <mat-icon class="!text-sm text-amber-500 block mx-auto mb-0.5">notifications_active</mat-icon>
              <span>Live Alerts</span>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              (click)="dismiss()"
              class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
            >
              Not Now
            </button>
            <button
              type="button"
              (click)="install()"
              class="px-4 py-2 rounded-xl bg-[#59000A] hover:bg-[#73000E] text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <mat-icon class="!text-sm">install_desktop</mat-icon>
              <span>Install Desktop App</span>
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class PwaInstallPrompt {
  readonly pwa = inject(PwaService);
  private readonly dismissed = signal<boolean>(this.readStorageFlag(STORAGE_PROMPT_DISMISSED_KEY));

  readonly shouldShow = computed(() => {
    if (this.pwa.isInstalled()) return false;
    if (this.readStorageFlag(STORAGE_INSTALLED_KEY)) return false;
    if (this.dismissed()) return false;
    return true;
  });

  private readStorageFlag(key: string): boolean {
    if (typeof window === 'undefined') return true;
    try {
      return window.localStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  }

  private setStorageFlag(key: string) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, '1');
    } catch {
      // Ignore private browsing storage errors
    }
  }

  dismiss() {
    this.setStorageFlag(STORAGE_PROMPT_DISMISSED_KEY);
    this.dismissed.set(true);
  }

  async install() {
    if (this.pwa.isInstallable()) {
      const accepted = await this.pwa.promptInstall();
      if (accepted) {
        this.setStorageFlag(STORAGE_INSTALLED_KEY);
      }
      this.dismiss();
      return;
    }

    // Fallback: pre-cache assets for offline readiness and close one-time prompt
    this.pwa.precacheJobSiteData();
    this.dismiss();
  }
}
