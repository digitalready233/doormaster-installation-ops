import { Injectable, signal, computed } from '@angular/core';

export interface OfflineAction {
  id: string;
  type: 'clock_in' | 'clock_out' | 'checklist' | 'photo_upload' | 'signoff' | 'job_status';
  jobId: string;
  title: string;
  timestamp: string;
  payload: Record<string, unknown>;
  synced: boolean;
}

export interface CacheStats {
  version: string;
  staticCount: number;
  assetCount: number;
  apiCount: number;
  mapTilesCount: number;
  totalCached: number;
}

const STORAGE_OFFLINE_QUEUE = 'dm_installer_offline_sync_queue_v1';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  // Connectivity
  readonly isOnline = signal<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  readonly lastOnlineTransition = signal<Date | null>(null);

  // Service Worker State
  readonly swRegistered = signal<boolean>(false);
  readonly swUpdateAvailable = signal<boolean>(false);
  readonly isPrecaching = signal<boolean>(false);
  readonly lastPrecacheTimestamp = signal<number | null>(null);

  // Install State
  readonly isInstallable = signal<boolean>(false);
  readonly isInstalled = signal<boolean>(false);
  readonly isIOS = signal<boolean>(false);
  private deferredPrompt: any = null;

  // Cache Diagnostics
  readonly cacheStats = signal<CacheStats>({
    version: 'v1.2.0',
    staticCount: 0,
    assetCount: 0,
    apiCount: 0,
    mapTilesCount: 0,
    totalCached: 0
  });

  // Offline Sync Queue for Installers
  readonly offlineQueue = signal<OfflineAction[]>([]);
  readonly pendingSyncCount = computed(() => 
    this.offlineQueue().filter(item => !item.synced).length
  );

  constructor() {
    this.initPwa();
  }

  private initPwa() {
    if (typeof window === 'undefined') return;

    // Load persisted offline queue
    try {
      const saved = localStorage.getItem(STORAGE_OFFLINE_QUEUE);
      if (saved) {
        this.offlineQueue.set(JSON.parse(saved));
      }
    } catch {
      // Ignore storage read error
    }

    // Detect standalone PWA mode or persisted install state
    let wasInstalled = false;
    try {
      wasInstalled = localStorage.getItem('dm_pwa_installed_v1') === '1';
    } catch {
      // Ignore storage read error
    }
    const isStandalone =
      wasInstalled ||
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    this.isInstalled.set(isStandalone);

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    this.isIOS.set(/iphone|ipad|ipod/.test(userAgent));

    // Online / Offline Listeners
    window.addEventListener('online', () => {
      this.isOnline.set(true);
      this.lastOnlineTransition.set(new Date());
      // Auto-trigger sync of pending actions when connectivity returns
      this.syncPendingActions();
    });

    window.addEventListener('offline', () => {
      this.isOnline.set(false);
      this.lastOnlineTransition.set(new Date());
    });

    // PWA Install Prompt Listener
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable.set(true);
    });

    window.addEventListener('appinstalled', () => {
      try {
        localStorage.setItem('dm_pwa_installed_v1', '1');
      } catch {
        // Ignore storage write error
      }
      this.isInstalled.set(true);
      this.isInstallable.set(false);
      this.deferredPrompt = null;
    });

    // Register Service Worker
    this.registerServiceWorker();
  }

  private async registerServiceWorker() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('[PwaService] Service Workers not supported in this environment.');
      return;
    }

    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      this.swRegistered.set(true);
      console.log('[PwaService] Service Worker successfully registered with scope:', reg.scope);

      // Check for updates
      reg.addEventListener('updatefound', () => {
        const installingWorker = reg.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.swUpdateAvailable.set(true);
            }
          });
        }
      });

      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        const data = event.data;
        if (!data) return;

        if (data.type === 'CACHE_STATUS_RESPONSE') {
          this.cacheStats.set({
            version: data.version || 'v1.2.0',
            staticCount: data.staticCount || 0,
            assetCount: data.assetCount || 0,
            apiCount: data.apiCount || 0,
            mapTilesCount: data.mapTilesCount || 0,
            totalCached: data.totalCached || 0
          });
        }

        if (data.type === 'PRECACHE_COMPLETE') {
          this.isPrecaching.set(false);
          this.lastPrecacheTimestamp.set(data.timestamp);
          this.requestCacheStatus();
        }
      });

      // Initial cache status query after brief delay
      setTimeout(() => this.requestCacheStatus(), 1200);

    } catch (error) {
      console.warn('[PwaService] Service worker registration notice:', error);
    }
  }

  /**
   * Prompts user to install the PWA on Android/Chromium/Desktop
   */
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false;

    try {
      await this.deferredPrompt.prompt();
      const choice = await this.deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        this.isInstalled.set(true);
        this.isInstallable.set(false);
        this.deferredPrompt = null;
        return true;
      }
    } catch {
      // Handled
    }
    return false;
  }

  /**
   * Instructs the Service Worker to pre-cache key API endpoints & static assets
   * so the field installer has zero downtime when going on remote sites.
   */
  async precacheJobSiteData(): Promise<void> {
    this.isPrecaching.set(true);

    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PRECACHE_JOB_SITE'
      });
    }

    // Also warm the client fetch cache directly
    try {
      await Promise.allSettled([
        fetch('/api/doors', { cache: 'reload' }),
        fetch('/api/doors/categories', { cache: 'reload' })
      ]);
      this.lastPrecacheTimestamp.set(Date.now());
    } catch {
      // Ignored
    }

    setTimeout(() => {
      this.isPrecaching.set(false);
      this.requestCacheStatus();
    }, 1500);
  }

  /**
   * Queries the Service Worker for cache entry statistics
   */
  requestCacheStatus(): void {
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'GET_CACHE_STATUS'
      });
    }
  }

  /**
   * Enqueues an installer action when performed offline (e.g. clock in, sign off, photo)
   */
  enqueueOfflineAction(action: Omit<OfflineAction, 'id' | 'synced' | 'timestamp'>): void {
    const item: OfflineAction = {
      ...action,
      id: `sync_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      synced: false
    };

    const updated = [item, ...this.offlineQueue()];
    this.offlineQueue.set(updated);
    this.persistOfflineQueue(updated);
  }

  /**
   * Replays/syncs all pending actions once connectivity is restored
   */
  syncPendingActions(): void {
    const queue = this.offlineQueue();
    const pending = queue.filter(item => !item.synced);
    if (pending.length === 0) return;

    // Mark pending actions as synced
    const updated = queue.map(item => ({ ...item, synced: true }));
    this.offlineQueue.set(updated);
    this.persistOfflineQueue(updated);
    console.log(`[PwaService] Synced ${pending.length} offline installer actions.`);
  }

  /**
   * Clears synced history from local storage
   */
  clearSyncedHistory(): void {
    const remaining = this.offlineQueue().filter(item => !item.synced);
    this.offlineQueue.set(remaining);
    this.persistOfflineQueue(remaining);
  }

  private persistOfflineQueue(queue: OfflineAction[]): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_OFFLINE_QUEUE, JSON.stringify(queue.slice(0, 50)));
    } catch {
      // Storage quota or disabled
    }
  }
}
