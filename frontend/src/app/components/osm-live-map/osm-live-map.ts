import { 
  AfterViewInit,
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  OnDestroy, 
  computed, 
  effect, 
  inject, 
  input, 
  output, 
  signal, 
  viewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { InstallationJob, LiveLocation } from '../../models/installation.model';
import type * as LType from 'leaflet';

let L: typeof LType | null = null;

export interface RouteWaypoint {
  lat: number;
  lng: number;
  name?: string;
}

export interface MapHubLocation {
  id: string;
  name: string;
  label: string;
  lat: number;
  lng: number;
  icon?: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-osm-live-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="relative isolate z-0 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950 select-none">
      
      <!-- Top Floating Control Ribbon -->
      <div class="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        <!-- Live Status Pill (Real GPS Telemetry) -->
        <div class="pointer-events-auto flex items-center gap-2 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-white text-xs shadow-lg">
          <div class="relative flex items-center justify-center">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 relative"></span>
          </div>
          
          <span class="font-bold text-[11px] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span class="text-emerald-400">LIVE GPS</span>
            <span class="text-slate-500">·</span>
            @if (mode() === 'client-single') {
              <span>Your Delivery Live Approach · OpenStreetMap</span>
            } @else if (mode() === 'shop-scoped' || store.currentRole() === 'shop_manager') {
              <span>{{ store.managerBranch()?.shopName || 'Shop Branch' }} Live Radar ({{ trackedUnits().length }} Units)</span>
            } @else {
              <span>Accra City Fleet Radar · Live OpenStreetMap</span>
            }
          </span>

          <span class="text-slate-500 text-[10px] font-mono hidden sm:inline">|</span>
          <span class="text-emerald-400 text-[10px] font-mono hidden sm:inline">
            {{ trackedUnits().length }} Units Active Live
          </span>
        </div>

        <!-- Map Controls -->
        <div class="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 text-white text-xs shadow-lg">
          
          <!-- Branch Quick Jump Selector -->
          <select 
            (change)="onBranchSelect($event)"
            class="bg-slate-800 text-slate-100 text-[11px] font-mono px-2 py-1 rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[150px] sm:max-w-[210px] truncate"
            title="Jump to DoorMaster Shop Branch on Map"
          >
            @if (store.currentRole() !== 'shop_manager' && mode() !== 'shop-scoped') {
              <option value="all">🗺️ All {{ visibleBranches().length }} Branches (Ghana)</option>
            }
            @for (b of visibleBranches(); track b.branchCode) {
              <option [value]="b.branchCode">🏪 {{ b.shopName.replace('DoorMaster ', '') }} ({{ b.region }})</option>
            }
          </select>

          <!-- Fit / View All Branches -->
          <button 
            type="button" 
            (click)="fitAllBranches()"
            class="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            [title]="store.currentRole() === 'shop_manager' ? 'Center on My Shop Branch' : 'Fit All Branches on Map'"
            aria-label="Fit Branches on Map"
          >
            <mat-icon class="!text-sm">crop_free</mat-icon>
          </button>

          <!-- Re-center Map -->
          <button 
            type="button" 
            (click)="resetMapView()"
            class="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Re-center Fleet Map"
            aria-label="Re-center Fleet Map"
          >
            <mat-icon class="!text-sm">my_location</mat-icon>
          </button>

          <!-- Track Self (center on my GPS position) -->
          @if (store.myLiveLocation()) {
            <button 
              type="button" 
              (click)="centerOnSelf()"
              class="p-1 text-indigo-400 hover:text-indigo-300 rounded-lg transition-colors cursor-pointer"
              title="Center on My Live GPS Position"
              aria-label="Center on My Live GPS Position"
            >
              <mat-icon class="!text-sm">person_pin</mat-icon>
            </button>
          }
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- MAP CANVAS: PERMANENT LIVE OPENSTREETMAP CONTAINER                         -->
      <!-- ========================================================================= -->
      <div class="relative w-full h-80 sm:h-96 lg:h-[420px] bg-slate-950">
        <div 
          #mapContainer 
          class="relative w-full h-full bg-slate-950 z-0"
        ></div>
      </div>

      <!-- Bottom Floating Telemetry HUD (Self position) -->
      @if (store.myLiveLocation()) {
        @let ent = store.myLiveLocation()!;
        <div class="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-700 p-3.5 rounded-2xl shadow-2xl text-white space-y-2 animate-in fade-in">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 bg-indigo-600 text-white">
                <mat-icon class="!text-sm">person_pin</mat-icon>
              </div>
              <div class="truncate">
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    My Position
                  </span>
                  <h4 class="text-xs font-bold text-white truncate">{{ ent.userName || 'You' }}</h4>
                </div>
                <p class="text-[10px] text-slate-400 font-mono truncate">
                  {{ ent.role }} · {{ ent.status }} · {{ ent.speedKmh !== null ? ent.speedKmh + ' km/h' : 'GPS' }}
                </p>
              </div>
            </div>

            <div class="text-right shrink-0">
              <span class="text-[9px] uppercase font-mono text-slate-400 block">Telemetry</span>
              <span class="text-xs font-black font-mono text-indigo-400 tabular-nums">
                {{ ent.latitude.toFixed(4) }}, {{ ent.longitude.toFixed(4) }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-1.5 border-t border-slate-800 text-center font-mono">
            <div class="bg-slate-800/60 p-1.5 rounded-lg">
              <span class="text-[9px] text-slate-400 block uppercase">Accuracy</span>
              <strong class="text-xs text-white">{{ ent.accuracyM !== null ? ent.accuracyM + ' m' : '—' }}</strong>
            </div>
            <div class="bg-slate-800/60 p-1.5 rounded-lg">
              <span class="text-[9px] text-slate-400 block uppercase">Heading</span>
              <strong class="text-xs text-white">{{ ent.heading !== null ? ent.heading + '°' : '—' }}</strong>
            </div>
            <div class="bg-slate-800/60 p-1.5 rounded-lg">
              <span class="text-[9px] text-slate-400 block uppercase">Live Radar</span>
              <strong class="text-xs truncate block text-emerald-400 font-bold">
                OpenStreetMap Live GPS
              </strong>
            </div>
          </div>
        </div>
      }
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
      margin-top: 50px !important;
      margin-bottom: 24px !important;
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
export class OsmLiveMap implements AfterViewInit, OnDestroy {
  readonly store = inject(InstallationStore);
  readonly themeStore = inject(ThemeStore);

  // Input configuration
  readonly mode = input<'all-fleet' | 'client-single' | 'shop-scoped'>('all-fleet');
  readonly targetJob = input<InstallationJob | null>(null);
  readonly shopBranchFilter = input<string | null>(null);
  readonly currentInstallerId = input<string | null>(null);

  // Outputs
  readonly jobSelected = output<string>();

  // Map DOM Element
  private mapEl = viewChild<ElementRef<HTMLDivElement>>('mapContainer');
  private map: LType.Map | null = null;
  private tileLayer: LType.TileLayer | null = null;
  private markerLayers = new Map<string, LType.Marker>();
  private polylineLayers = new Map<string, LType.Polyline>();
  private resizeObserver: ResizeObserver | null = null;

  readonly visibleBranches = computed(() => {
    if (this.store.currentRole() === 'shop_manager' || this.mode() === 'shop-scoped') {
      const own = this.store.managerBranch();
      return own ? [own] : [];
    }
    return this.store.branches();
  });

  // Tracked units computed from live GPS locations (strictly scoped to shop for shop_manager)
  readonly trackedUnits = computed(() => {
    const allUnits = this.store.liveLocations();
    if (this.store.currentRole() === 'shop_manager' || this.mode() === 'shop-scoped') {
      const selfId = this.store.currentUser().id;
      const dispIds = new Set(this.store.branchDispatchers().map(d => d.id));
      const jobIds = this.store.branchJobIds();
      return allUnits.filter(u =>
        u.userId === selfId ||
        dispIds.has(u.userId) ||
        (u.jobId ? jobIds.has(u.jobId) : false)
      );
    }
    return allUnits;
  });

  // Key static hubs for Greater Accra corridor
  readonly staticHubs: MapHubLocation[] = [
    { id: 'h1', name: 'SPINTEX_WORKSHOP', label: '🏭 ATELIER (SPINTEX)', lat: 5.6320, lng: -0.0980, color: '#0284c7', bgColor: '#0284c7' },
    { id: 'h2', name: 'ACCRA_CENTRAL', label: '🏛️ CENTRAL SHOWROOM', lat: 5.5560, lng: -0.2010, color: '#10b981', bgColor: '#10b981' },
    { id: 'h3', name: 'TEMA_DEPOT', label: '🚢 TEMA DEPOT', lat: 5.6698, lng: -0.0166, color: '#6366f1', bgColor: '#6366f1' },
    { id: 'h4', name: 'CANTONMENTS', label: '📍 CANTONMENTS', lat: 5.5840, lng: -0.1780, color: '#f59e0b', bgColor: '#f59e0b' },
    { id: 'h5', name: 'AIRPORT_RES', label: '📍 AIRPORT RES', lat: 5.6020, lng: -0.1870, color: '#ec4899', bgColor: '#ec4899' },
    { id: 'h6', name: 'EAST_LEGON', label: '📍 EAST LEGON', lat: 5.6380, lng: -0.1550, color: '#8b5cf6', bgColor: '#8b5cf6' },
  ];

  readonly scopedJobs = computed(() => {
    const mode = this.mode();
    if (mode === 'client-single') {
      const target = this.targetJob();
      const all = this.store.jobs();
      return target ? [target] : (all.length > 0 ? [all[0]] : []);
    }
    if (mode === 'shop-scoped' || this.store.currentRole() === 'shop_manager') {
      return this.store.branchJobs();
    }
    return this.store.jobs();
  });

  constructor() {
    // React to Dark/Light theme changes
    effect(() => {
      this.themeStore.isDark();
      if (this.map) {
        this.updateTileLayer();
      }
    });

    // React to branches directory or scoped jobs changes
    effect(() => {
      const branches = this.visibleBranches();
      this.scopedJobs();
      if (this.map) {
        this.renderStaticMarkersAndRoutes();
        if ((this.store.currentRole() === 'shop_manager' || this.mode() === 'shop-scoped') && branches.length === 1) {
          this.fitAllBranches();
        }
      }
    });

    // Re-render markers when live locations change
    effect(() => {
      this.trackedUnits();
      if (this.map) {
        this.updateMovingMarkersOnMap();
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

    if (this.map) {
      this.map.invalidateSize();
      this.updateTileLayer();
      this.renderStaticMarkersAndRoutes();
      this.updateMovingMarkersOnMap();
      return;
    }

    // Centered around Greater Accra Corridor (or client site / shop branch)
    let centerLat = 5.6020;
    let centerLng = -0.1600;
    let zoomLevel = this.mode() === 'client-single' ? 14 : 12;

    if (this.mode() === 'client-single') {
      const dest = this.clientDestination();
      if (dest) {
        centerLat = dest.lat;
        centerLng = dest.lng;
        zoomLevel = 15;
      } else if (this.store.myLiveLocation()) {
        centerLat = this.store.myLiveLocation()!.latitude;
        centerLng = this.store.myLiveLocation()!.longitude;
        zoomLevel = 15;
      }
    } else if (this.store.currentRole() === 'shop_manager' || this.mode() === 'shop-scoped') {
      const ownBranch = this.store.managerBranch();
      if (ownBranch) {
        centerLat = ownBranch.latitude;
        centerLng = ownBranch.longitude;
        zoomLevel = 13;
      }
    } else if (this.store.myLiveLocation()) {
      centerLat = this.store.myLiveLocation()!.latitude;
      centerLng = this.store.myLiveLocation()!.longitude;
      zoomLevel = 13;
    }

    try {
      this.map = L.map(container, {
        center: [centerLat, centerLng],
        zoom: zoomLevel,
        zoomControl: true,
        attributionControl: true
      });

      this.updateTileLayer();
      this.renderStaticMarkersAndRoutes();
      this.updateMovingMarkersOnMap();

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 250);
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

    // Direct OpenStreetMap tile server
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const subdomains = 'abc';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

    this.tileLayer = leaflet.tileLayer(tileUrl, {
      subdomains,
      attribution,
      maxZoom: 19
    }).addTo(this.map);

    this.tileLayer.on('tileerror', (e) => {
      console.warn('OpenStreetMap tile notice:', e);
    });
  }

  private clientDestination = computed<{ lat: number; lng: number } | null>(() => {
    if (this.mode() !== 'client-single') return null;
    const target = this.targetJob();
    if (!target?.client?.coordinates) return null;
    return target.client.coordinates;
  });

  private renderStaticMarkersAndRoutes() {
    const leaflet = L;
    if (!this.map || !leaflet) return;

    // Clear existing static branch & destination markers and polylines
    this.polylineLayers.forEach(poly => this.map?.removeLayer(poly));
    this.polylineLayers.clear();
    for (const [key, marker] of Array.from(this.markerLayers.entries())) {
      if (key.startsWith('branch_') || key.startsWith('dest_')) {
        this.map.removeLayer(marker);
        this.markerLayers.delete(key);
      }
    }

    // Render DoorMaster Shop Branch markers (visible branches for current role)
    const branches = this.visibleBranches();
    branches.forEach(branch => {
      const activeBranch = this.store.currentRole() === 'shop_manager' ? this.store.managerBranch() : this.store.shopLocation();
      const isSelected = activeBranch?.id === branch.id || activeBranch?.branchCode === branch.branchCode;
      const isPrimary = branch.isPrimary;
      const bg = isPrimary ? '#059669' : (isSelected ? '#0284c7' : '#0f172a');
      const border = isSelected ? '#38bdf8' : (isPrimary ? '#34d399' : '#64748b');

      const shopNameDisplay = branch.shopName.replace('DoorMaster ', '');
      const hubIcon = leaflet.divIcon({
        className: 'custom-shop-hub-icon',
        html: `
          <div style="background:${bg}; color:#fff; padding:4px 9px; border-radius:12px; font-weight:800; font-size:9.5px; font-family:system-ui, -apple-system, sans-serif; box-shadow:0 4px 14px rgba(0,0,0,0.6); border:1.8px solid ${border}; display:flex; align-items:center; gap:4px; white-space:nowrap; cursor:pointer;" title="${branch.shopName} · ${branch.landmark || branch.address}">
            <span style="font-size:12px;">🏪</span>
            <span>${shopNameDisplay}</span>
            <span style="background:rgba(255,255,255,0.22); font-size:8px; padding:1px 4px; border-radius:4px; font-family:monospace;">${branch.branchCode}</span>
          </div>
        `,
        iconSize: [165, 26],
        iconAnchor: [82, 13]
      });

      const popupHtml = `
        <div style="font-family:system-ui, -apple-system, sans-serif; min-width:230px; padding:4px;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
            <span style="font-size:20px;">🏪</span>
            <div>
              <strong style="font-size:13px; color:#0f172a; display:block; line-height:1.2;">${branch.shopName}</strong>
              <span style="font-size:10px; font-family:monospace; color:#059669; font-weight:bold;">${branch.branchCode} · ${branch.region || 'Ghana'}</span>
            </div>
          </div>
          <div style="font-size:11px; color:#334155; margin-bottom:4px;">
            <strong>Landmark:</strong> ${branch.landmark || branch.address}
          </div>
          <div style="font-size:11px; color:#334155; margin-bottom:4px;">
            <strong>Shop Manager:</strong> ${branch.managerName || 'Station Master'}
          </div>
          <div style="font-size:11px; margin-bottom:6px;">
            <strong>Direct Phone:</strong> <a href="tel:${branch.phone.split('/')[0].trim()}" style="color:#0284c7; font-weight:bold; text-decoration:none;">📞 ${branch.phone}</a>
          </div>
          <div style="font-size:9.5px; font-family:monospace; color:#64748b; background:#f1f5f9; padding:3px 6px; border-radius:6px; margin-bottom:6px;">
            Coordinates: ${branch.latitude.toFixed(6)}° N, ${Math.abs(branch.longitude).toFixed(6)}° W
          </div>
        </div>
      `;

      const marker = leaflet.marker([branch.latitude, branch.longitude], { icon: hubIcon })
        .addTo(this.map!)
        .bindPopup(popupHtml, { maxWidth: 300 });

      this.markerLayers.set(`branch_${branch.id || branch.branchCode}`, marker);
    });

    // Render client destination markers for shop-scoped/all-fleet modes
    const jobs = this.scopedJobs();
    jobs.forEach(j => {
      const clientLat = j.client?.coordinates?.lat || (j.client as any)?.latitude || 5.5840;
      const clientLng = j.client?.coordinates?.lng || (j.client as any)?.longitude || -0.1780;
      const clientName = j.client?.name || 'Client Residence';
      const doorModel = j.doorModel || 'Architectural Door';

      const destIcon = leaflet.divIcon({
        className: 'custom-dest-icon',
        html: `
          <div style="background:#6366f1; color:#fff; padding:5px 9px; border-radius:10px; font-weight:bold; font-size:9.5px; font-family:monospace; box-shadow:0 3px 10px rgba(99,102,241,0.5); border:1.5px solid #fff; display:flex; align-items:center; gap:3px; white-space:nowrap;">
            <span>📍</span>
            <span>${clientName} (${doorModel})</span>
          </div>
        `,
        iconSize: [160, 28],
        iconAnchor: [80, 14]
      });

      const marker = leaflet.marker([clientLat, clientLng], { icon: destIcon })
        .addTo(this.map!)
        .on('click', () => {
          this.jobSelected.emit(j.id);
        });

      this.markerLayers.set(`dest_${j.id}`, marker);
    });
  }

  /**
   * Convert live GPS locations to map markers and update them.
   * This replaces the old simulated motion with real GPS positions.
   */
  private updateMovingMarkersOnMap() {
    const map = this.map;
    const leaflet = L;
    if (!map || !leaflet) return;

    const locations = this.trackedUnits();
    const selfId = this.store.apiUser()?.id;
    const selfRole = this.store.apiUser()?.role;

    // Remove markers for users no longer in the live list
    const currentIds = new Set(locations.map(l => l.userId));
    for (const [key, marker] of this.markerLayers) {
      if (key.startsWith('gps_') && !currentIds.has(key.replace('gps_', ''))) {
        map.removeLayer(marker);
        this.markerLayers.delete(key);
      }
    }

    locations.forEach(loc => {
      const isSelf = loc.userId === selfId;
      // Filter: in shop-scoped/client-single mode, only show relevant units
      if (this.mode() === 'shop-scoped' && loc.role !== 'installer' && loc.role !== 'dispatcher') return;
      if (this.mode() === 'client-single' && loc.role !== 'installer' && loc.role !== 'dispatcher') return;

      const bgColor = isSelf ? '#10b981' : loc.role === 'dispatcher' ? '#0284c7' : '#059669';
      const label = isSelf
        ? `You — ${loc.userName || 'You'}`
        : loc.role === 'dispatcher'
          ? `🚗 ${loc.userName || 'Dispatch Driver'}`
          : `🔧 ${loc.userName || 'Installer'}`;

      const markerGraphic = loc.role === 'dispatcher'
        ? `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" style="display:block;">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
            <circle cx="7.5" cy="14.5" r="1.5"/>
            <circle cx="16.5" cy="14.5" r="1.5"/>
          </svg>
        `
        : `
          <svg viewBox="0 0 24 24" width="15" height="15" fill="#ffffff" style="display:block;">
            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
          </svg>
        `;

      const myLoc = this.store.myLiveLocation();
      const distToDest = myLoc
        ? +this.haversineKm(loc.latitude, loc.longitude, myLoc.latitude, myLoc.longitude).toFixed(1)
        : 0;

      const html = `
        <div style="position:relative; cursor:pointer;" title="${loc.userName || loc.userId}">
          <div style="position:absolute; width:44px; height:44px; background:${bgColor}33; border-radius:50%; top:-9px; left:-9px; animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; ${isSelf ? 'box-shadow:0 0 0 4px rgba(16,185,129,0.4);' : ''}"></div>
          <div style="background:${bgColor}; color:#fff; width:28px; height:28px; border-radius:50%; border:2px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.5); ${isSelf ? 'border-width:3px;' : ''}">
            ${markerGraphic}
          </div>
          <div style="background:rgba(15,23,42,0.92); color:#fff; font-size:9.5px; font-family:monospace; font-weight:bold; padding:2px 7px; border-radius:6px; border:1px solid rgba(255,255,255,0.25); white-space:nowrap; position:absolute; left:32px; top:4px; box-shadow:0 2px 6px rgba(0,0,0,0.4); display:flex; align-items:center; gap:4px;">
            ${label}
            ${distToDest > 0 ? `<span style="font-size:8px; opacity:0.9">${distToDest} km from you</span>` : ''}
          </div>
        </div>
      `;

      const icon = leaflet.divIcon({
        className: 'custom-moving-icon',
        html,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const markerKey = `gps_${loc.userId}`;
      if (!this.markerLayers.has(markerKey)) {
        const marker = leaflet.marker([loc.latitude, loc.longitude], { icon })
          .addTo(map)
          .on('click', () => {
            if (loc.jobId) this.jobSelected.emit(loc.jobId);
          });
        this.markerLayers.set(markerKey, marker);
      } else {
        const marker = this.markerLayers.get(markerKey)!;
        marker.setLatLng([loc.latitude, loc.longitude]);
        marker.setIcon(icon);
      }
    });
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

  fitAllBranches() {
    const leaflet = L;
    if (!this.map || !leaflet) return;
    const branches = this.visibleBranches();
    if (branches.length === 0) return;
    const coords: [number, number][] = branches.map(b => [b.latitude, b.longitude]);
    if (this.store.currentRole() === 'shop_manager' || this.mode() === 'shop-scoped') {
      this.scopedJobs().forEach(j => {
        const lat = j.client?.coordinates?.lat || (j.client as any)?.latitude;
        const lng = j.client?.coordinates?.lng || (j.client as any)?.longitude;
        if (lat && lng) coords.push([lat, lng]);
      });
    }
    if (coords.length === 1) {
      this.map.setView(coords[0], 14);
      return;
    }
    const bounds = leaflet.latLngBounds(coords);
    this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
  }

  focusBranch(branch: any) {
    if (!this.map || !branch) return;
    this.map.flyTo([branch.latitude, branch.longitude], 15, { duration: 1.2 });
    const marker = this.markerLayers.get(`branch_${branch.id || branch.branchCode}`);
    if (marker) {
      setTimeout(() => marker.openPopup(), 1250);
    }
  }

  onBranchSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const val = target.value;
    if (val === 'all') {
      this.fitAllBranches();
    } else {
      const b = this.visibleBranches().find(br => br.branchCode === val || br.id === val);
      if (b) {
        this.focusBranch(b);
      }
    }
  }

  resetMapView() {
    if (!this.map) return;
    if (this.mode() === 'client-single') {
      const dest = this.clientDestination();
      if (dest) {
        this.map.setView([dest.lat, dest.lng], 15);
        return;
      }
    }
    const self = this.store.myLiveLocation();
    if (self) {
      this.map.setView([self.latitude, self.longitude], 13);
    } else {
      this.fitAllBranches();
    }
  }

  centerOnSelf() {
    if (!this.map) return;
    const self = this.store.myLiveLocation();
    if (self) {
      this.map.setView([self.latitude, self.longitude], 15);
      this.map?.zoomIn(1);
    }
  }
}
