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
import type * as LType from 'leaflet';

let L: typeof LType | null = null;

export interface ClientLocationResult {
  lat: number;
  lng: number;
  address: string;
  district?: string;
  distanceFromBranchKm?: number;
  isExplicitUserAction?: boolean;
}

interface KnownLocation {
  name: string;
  keywords: string[];
  lat: number;
  lng: number;
  district: string;
}

@Component({
  selector: 'app-client-location-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="mt-2 space-y-2 select-none">
      
      <!-- Quick Location Preset Chips -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">near_me</mat-icon>
          <span>Accra Zones:</span>
        </span>
        @for (zone of POPULAR_ZONES; track zone.name) {
          <button 
            type="button"
            (click)="selectPresetZone(zone)"
            class="text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all cursor-pointer"
            [class]="activeDistrict() === zone.district
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            {{ zone.name }}
          </button>
        }

        <button 
          type="button" 
          (click)="useCurrentDeviceLocation()"
          class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-700/10 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-700/20 transition-all flex items-center gap-1 cursor-pointer ml-auto"
          title="Detect GPS coordinates using device location"
        >
          <mat-icon class="!text-xs">my_location</mat-icon>
          <span>Current GPS</span>
        </button>
      </div>

      <!-- Map Display Container (Downward preview) -->
      <div class="relative isolate z-0 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950 transition-all">
        
        <!-- Live OpenStreetMap Canvas -->
        <div 
          #mapContainer
          class="relative w-full h-56 sm:h-64 bg-slate-900 z-0"
        ></div>

        <!-- Map Floating Overlays -->
        <div class="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none gap-2">
          <!-- Coordinates & District Badge -->
          <div class="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-white text-[11px] shadow-sm font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-bold text-emerald-400">{{ activeDistrict() }}</span>
            <span class="text-slate-500">·</span>
            <span class="text-slate-300 text-[10px]">
              {{ currentLat().toFixed(4) }}° N, {{ Math.abs(currentLng()).toFixed(4) }}° W
            </span>
          </div>

          <!-- Recently Pinned Badge or Closest Branch -->
          @if (recentlyPinned()) {
            <div class="pointer-events-auto bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-400 text-white text-[10px] shadow-md font-mono flex items-center gap-1.5 animate-in fade-in zoom-in-95" title="Auto-populated into Site Location input">
              <mat-icon class="!text-xs text-white">check_circle</mat-icon>
              <span class="font-bold">Auto-Populated to Form</span>
            </div>
          } @else if (nearestBranch()) {
            <div class="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-white text-[10px] shadow-sm font-mono flex items-center gap-1.5" title="Closest DoorMaster dispatch branch">
              <span class="text-xs">🏪</span>
              <span>{{ nearestBranch().distanceKm }} km to {{ nearestBranch().branch.shopName.replace('DoorMaster ', '') }}</span>
            </div>
          }
        </div>

        <!-- Bottom Helpful Hint Overlay -->
        <div class="absolute bottom-2 left-2 right-2 z-10 pointer-events-none flex items-center justify-between text-[10px] text-slate-300">
          <div class="pointer-events-auto bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-800 text-slate-200 flex items-center gap-1.5 shadow-sm font-medium">
            <mat-icon class="!text-xs text-emerald-400">touch_app</mat-icon>
            <span>Click map or drag pin to auto-pick location</span>
          </div>

          @if (isSearching()) {
            <div class="pointer-events-auto bg-cyan-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-cyan-200 flex items-center gap-1.5 font-mono shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Resolving address...</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    ::ng-deep .leaflet-container {
      cursor: crosshair !important;
    }
    ::ng-deep .leaflet-control-zoom {
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      border-radius: 8px !important;
      overflow: hidden;
      margin-top: 50px !important;
      margin-bottom: 24px !important;
      margin-right: 10px !important;
    }
    ::ng-deep .leaflet-control-zoom a {
      background-color: rgba(15, 23, 42, 0.9) !important;
      color: #fff !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      width: 26px !important;
      height: 26px !important;
      line-height: 26px !important;
      font-size: 13px !important;
      cursor: pointer !important;
    }
    ::ng-deep .leaflet-control-zoom a:hover {
      background-color: rgba(30, 41, 59, 1) !important;
    }
    ::ng-deep .leaflet-control-attribution {
      background: rgba(15, 23, 42, 0.75) !important;
      color: #94a3b8 !important;
      font-size: 8px !important;
      padding: 0 4px !important;
    }
    ::ng-deep .client-site-pin {
      background: transparent;
      border: none;
      cursor: grab !important;
    }
    ::ng-deep .client-site-pin:active {
      cursor: grabbing !important;
    }
  `]
})
export class ClientLocationMap implements AfterViewInit, OnDestroy {
  readonly address = input<string>('');
  readonly locationSelected = output<ClientLocationResult>();

  readonly store = inject(InstallationStore);

  private mapContainer = viewChild<ElementRef<HTMLDivElement>>('mapContainer');
  private map: LType.Map | null = null;
  private marker: LType.Marker | null = null;
  private circle: LType.Circle | null = null;
  private tileLayer: LType.TileLayer | null = null;
  private branchMarkers: LType.Marker[] = [];
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastEmittedAddress = '';

  readonly Math = Math;
  readonly isSearching = signal<boolean>(false);
  readonly recentlyPinned = signal<string | null>(null);
  readonly currentLat = signal<number>(5.6020);
  readonly currentLng = signal<number>(-0.1870);
  readonly activeDistrict = signal<string>('Airport Residential');

  readonly nearestBranch = computed(() => {
    return this.store.getClosestBranch(this.currentLat(), this.currentLng());
  });

  readonly distanceFromBranch = computed(() => {
    return this.nearestBranch()?.distanceKm || 0;
  });

  // Popular DoorMaster Branch Locations & Greater Accra Zones for one-tap selection
  readonly POPULAR_ZONES: KnownLocation[] = [
    { name: 'Obeyeyie', keywords: ['obeyeyie', 'forest reserve'], lat: 5.733722, lng: -0.151583, district: 'Obeyeyie' },
    { name: 'Pobiman', keywords: ['pobiman', 'tollbooth'], lat: 5.733056, lng: -0.312972, district: 'Pobiman' },
    { name: 'ACP Pokuase', keywords: ['acp', 'pokuase'], lat: 5.689028, lng: -0.268083, district: 'ACP Pokuase' },
    { name: 'Nsawam', keywords: ['nsawam', 'overhead'], lat: 5.819139, lng: -0.363750, district: 'Nsawam' },
    { name: 'Tema', keywords: ['tema', 'harbor', 'community 1'], lat: 5.659889, lng: -0.012167, district: 'Tema' },
    { name: 'Suhum', keywords: ['suhum'], lat: 6.042639, lng: -0.449917, district: 'Suhum' },
    { name: 'Kumasi', keywords: ['kumasi', 'ahinsan'], lat: 6.686361, lng: -1.623972, district: 'Kumasi Ahinsan' },
    { name: 'Kasoa Tipa', keywords: ['kasoa', 'tipa'], lat: 5.524528, lng: -0.458250, district: 'Kasoa Tipa' },
    { name: 'Spintex HQ', keywords: ['spintex', 'batsona'], lat: 5.6320, lng: -0.0980, district: 'Spintex Central' },
    { name: 'Airport Res', keywords: ['airport', 'airport residential'], lat: 5.6020, lng: -0.1870, district: 'Airport Residential' },
    { name: 'East Legon', keywords: ['east legon', 'adjiringanor'], lat: 5.6380, lng: -0.1550, district: 'East Legon' }
  ];

  // Comprehensive Ghana directory for instant offline resolution
  readonly ACCRA_LOCAL_DATABASE: KnownLocation[] = [
    ...this.POPULAR_ZONES,
    { name: 'Ashalaja', keywords: ['ashalaja'], lat: 5.659917, lng: -0.362028, district: 'Ashalaja' },
    { name: 'Amrahia', keywords: ['amrahia', 'dodowa'], lat: 5.761220, lng: -0.126510, district: 'Amrahia' },
    { name: 'Tseaddo', keywords: ['tseaddo', 'trade fair'], lat: 5.602230, lng: -0.141520, district: 'Tseaddo' },
    { name: 'Kronum', keywords: ['kronum', 'offinso'], lat: 6.758410, lng: -1.638540, district: 'Kronum Kumasi' },
    { name: 'Cantonments', keywords: ['cantonments', 'embassy'], lat: 5.5840, lng: -0.1780, district: 'Cantonments' },
    { name: 'Ridge', keywords: ['ridge', 'north ridge', 'ministries'], lat: 5.5540, lng: -0.1980, district: 'Ridge' },
    { name: 'Dansoman', keywords: ['dansoman', 'mpoase'], lat: 5.5420, lng: -0.2580, district: 'Dansoman' },
    { name: 'Madina', keywords: ['madina', 'zongo junction'], lat: 5.6690, lng: -0.1650, district: 'Madina' },
    { name: 'Adenta', keywords: ['adenta', 'frafraha'], lat: 5.7110, lng: -0.1580, district: 'Adenta' },
    { name: 'Achimota', keywords: ['achimota', 'dome', 'mile 7'], lat: 5.6180, lng: -0.2280, district: 'Achimota' },
    { name: 'Accra Central', keywords: ['accra central', 'makola', 'high street'], lat: 5.5440, lng: -0.2070, district: 'Accra Central' }
  ];

  constructor() {
    // Whenever the input address string updates, geocode and center map
    effect(() => {
      const addr = this.address();
      if (addr && addr.trim().length > 2) {
        if (addr.trim() !== this.lastEmittedAddress.trim()) {
          this.scheduleGeocoding(addr.trim());
        }
      }
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private async initMap() {
    if (typeof window === 'undefined') return;
    const container = this.mapContainer()?.nativeElement;
    if (!container) return;

    if (!L) {
      try {
        const leafletPkg = await import('leaflet');
        L = ((leafletPkg as unknown as { default?: typeof LType }).default || leafletPkg) as unknown as typeof LType;
      } catch (err) {
        console.error('Failed to load Leaflet:', err);
        return;
      }
    }
    if (!L || !container) return;

    try {
      this.map = L.map(container, {
        center: [this.currentLat(), this.currentLng()],
        zoom: 14,
        zoomControl: true,
        attributionControl: true
      });

      this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: 'abc',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      }).addTo(this.map);

      this.updateMarker(this.currentLat(), this.currentLng());
      this.renderBranchMarkers();

      // Click anywhere on map to manually pin location and auto-populate form
      this.map.on('click', (e: LType.LeafletMouseEvent) => {
        void this.handleManualPin(e.latlng.lat, e.latlng.lng);
      });

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 200);
    } catch (e) {
      console.warn('Map initialization notice:', e);
    }
  }

  private updateMarker(lat: number, lng: number) {
    if (!this.map || !L) return;

    const customPinHtml = `
      <div style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: grab;" title="Drag pin or click map to move site location">
        <span style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background: rgba(16, 185, 129, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="width: 30px; height: 30px; border-radius: 9999px; background: #059669; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; color: white;">
          <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      </div>
    `;

    const icon = L.divIcon({
      className: 'client-site-pin',
      html: customPinHtml,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = L.marker([lat, lng], {
        icon,
        draggable: true
      }).addTo(this.map);

      // On marker drag end, manually update client location coordinates & auto-populate
      this.marker.on('dragend', (e: LType.LeafletEvent) => {
        const marker = e.target as LType.Marker;
        const position = marker.getLatLng();
        void this.handleManualPin(position.lat, position.lng);
      });
    }

    if (this.circle) {
      this.circle.setLatLng([lat, lng]);
    } else {
      this.circle = L.circle([lat, lng], {
        radius: 120,
        color: '#10b981',
        weight: 1.5,
        fillColor: '#10b981',
        fillOpacity: 0.12
      }).addTo(this.map);
    }
  }

  private renderBranchMarkers() {
    if (!this.map || !L) return;

    // Clear old branch markers if any
    this.branchMarkers.forEach(m => this.map?.removeLayer(m));
    this.branchMarkers = [];

    const branches = this.store.branches();
    branches.forEach(branch => {
      const isPrimary = branch.isPrimary;
      const icon = L!.divIcon({
        className: 'client-map-branch-pin',
        html: `
          <div style="background:${isPrimary ? '#059669' : '#0f172a'}; color:#fff; padding:3px 7px; border-radius:10px; font-weight:800; font-size:9px; font-family:sans-serif; box-shadow:0 3px 10px rgba(0,0,0,0.5); border:1.5px solid ${isPrimary ? '#34d399' : '#94a3b8'}; display:flex; align-items:center; gap:3px; white-space:nowrap; cursor:pointer;" title="${branch.shopName}">
            <span style="font-size:11px;">🏪</span>
            <span>${branch.shopName.replace('DoorMaster ', '')}</span>
          </div>
        `,
        iconSize: [140, 24],
        iconAnchor: [70, 12]
      });

      const popupContent = `
        <div style="font-family:sans-serif; font-size:11px; padding:2px;">
          <strong>🏪 ${branch.shopName}</strong><br>
          <span style="color:#059669; font-weight:bold; font-family:monospace;">${branch.branchCode}</span><br>
          <small style="color:#64748b;">${branch.landmark || branch.address}</small><br>
          <a href="tel:${branch.phone.split('/')[0].trim()}" style="color:#0284c7; font-weight:bold; text-decoration:none;">📞 ${branch.phone}</a>
        </div>
      `;

      const m = L!.marker([branch.latitude, branch.longitude], { icon })
        .addTo(this.map!)
        .bindPopup(popupContent);

      this.branchMarkers.push(m);
    });
  }

  findNearestLocation(lat: number, lng: number): { name: string; district: string; distanceKm: number } | null {
    let closest: { name: string; district: string; distanceKm: number } | null = null;
    let minDistance = Infinity;

    for (const loc of this.ACCRA_LOCAL_DATABASE) {
      const d = this.calculateDistanceKm(lat, lng, loc.lat, loc.lng);
      if (d < minDistance) {
        minDistance = d;
        closest = { name: loc.name, district: loc.district, distanceKm: d };
      }
    }

    for (const b of this.store.branches()) {
      const d = this.calculateDistanceKm(lat, lng, b.latitude, b.longitude);
      if (d < minDistance) {
        minDistance = d;
        closest = { name: b.shopName, district: `${b.city}, ${b.region}`, distanceKm: d };
      }
    }

    return closest;
  }

  /**
   * Main handler for when the user manually pins a location on the map.
   * Auto-picks the coordinates and reverse-resolves the address, emitting it
   * with isExplicitUserAction = true so the parent form input is automatically populated.
   */
  async handleManualPin(lat: number, lng: number, customDistrictName?: string) {
    this.currentLat.set(lat);
    this.currentLng.set(lng);

    // Update marker on map
    this.updateMarker(lat, lng);
    if (this.map) {
      this.map.panTo([lat, lng], { animate: true });
    }

    const nearest = this.findNearestLocation(lat, lng);
    const districtName = customDistrictName || (nearest ? nearest.district || nearest.name : 'Site Location');
    this.activeDistrict.set(districtName);

    // Initial immediate address with coordinates
    let formattedAddress = '';
    if (customDistrictName) {
      formattedAddress = `${customDistrictName}, Accra (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
    } else if (nearest && nearest.distanceKm < 2.0) {
      formattedAddress = `${nearest.name}, Accra (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
    } else if (nearest && nearest.distanceKm < 15.0) {
      formattedAddress = `Near ${nearest.name}, ${nearest.district} (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
    } else {
      formattedAddress = `Site Location, Ghana (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
    }

    this.lastEmittedAddress = formattedAddress;
    this.recentlyPinned.set(formattedAddress);

    // 1. Emit immediately so the input field in the form updates without any lag!
    this.locationSelected.emit({
      lat,
      lng,
      address: formattedAddress,
      district: districtName,
      distanceFromBranchKm: this.distanceFromBranch(),
      isExplicitUserAction: true
    });

    // 2. Perform online reverse geocoding via OpenStreetMap Nominatim for refined street & neighborhood
    this.isSearching.set(true);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.address) {
          const a = data.address;
          const road = a.road || a.pedestrian || a.footway || '';
          const suburb = a.suburb || a.neighbourhood || a.residential || a.quarter || (nearest ? nearest.name : '');
          const city = a.city || a.town || a.municipality || 'Accra';

          let resolvedName = '';
          if (road && suburb && road.toLowerCase() !== suburb.toLowerCase()) {
            resolvedName = `${road}, ${suburb}, ${city}`;
          } else if (suburb) {
            resolvedName = `${suburb}, ${city}`;
          } else if (data.display_name) {
            const parts = data.display_name.split(',').slice(0, 3).map((p: string) => p.trim());
            resolvedName = parts.join(', ');
          }

          if (resolvedName) {
            const refinedWithGps = `${resolvedName} (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
            this.activeDistrict.set(suburb || road || districtName);
            this.lastEmittedAddress = refinedWithGps;
            this.recentlyPinned.set(refinedWithGps);

            this.locationSelected.emit({
              lat,
              lng,
              address: refinedWithGps,
              district: suburb || districtName,
              distanceFromBranchKm: this.distanceFromBranch(),
              isExplicitUserAction: true
            });
          }
        }
      }
    } catch {
      // Immediate address was already populated, retain it gracefully
    } finally {
      this.isSearching.set(false);
      setTimeout(() => {
        if (this.recentlyPinned() === formattedAddress) {
          this.recentlyPinned.set(null);
        }
      }, 5000);
    }
  }

  selectPresetZone(zone: KnownLocation) {
    void this.handleManualPin(zone.lat, zone.lng, zone.district);
  }

  useCurrentDeviceLocation() {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      this.isSearching.set(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.isSearching.set(false);
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          void this.handleManualPin(lat, lng, 'Current GPS Position');
        },
        () => {
          this.isSearching.set(false);
        },
        { timeout: 7000 }
      );
    }
  }

  private scheduleGeocoding(query: string) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // 1. Direct GPS coordinates check (e.g. "5.6020, -0.1870")
    const gpsMatch = query.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
    if (gpsMatch) {
      const lat = parseFloat(gpsMatch[1]);
      const lng = parseFloat(gpsMatch[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        this.setLocation(lat, lng, 'GPS Input', false);
        return;
      }
    }

    // 2. Local Accra Ghana database fast match
    const lowerQuery = query.toLowerCase();
    const matchedKnown = this.ACCRA_LOCAL_DATABASE.find(item => 
      item.keywords.some(kw => lowerQuery.includes(kw))
    );

    if (matchedKnown) {
      this.setLocation(matchedKnown.lat, matchedKnown.lng, matchedKnown.district, false);
      return;
    }

    // 3. Fallback online OpenStreetMap Nominatim with 350ms debounce
    this.searchTimeout = setTimeout(() => {
      this.fetchNominatimGeocode(query);
    }, 350);
  }

  private async fetchNominatimGeocode(query: string) {
    this.isSearching.set(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=gh&limit=1&q=${encodeURIComponent(query + ', Ghana')}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          const displayName = data[0].display_name.split(',')[0] || query;
          this.setLocation(lat, lng, displayName, false);
        }
      }
    } catch {
      // Offline or network error: gracefully keep current coordinates
    } finally {
      this.isSearching.set(false);
    }
  }

  setLocation(lat: number, lng: number, districtName: string, isExplicitUserAction = false) {
    this.currentLat.set(lat);
    this.currentLng.set(lng);
    this.activeDistrict.set(districtName);

    this.updateMarker(lat, lng);
    if (this.map) {
      this.map.panTo([lat, lng], { animate: true });
    }

    const formattedAddress = `${districtName}, Accra (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;
    this.lastEmittedAddress = formattedAddress;

    this.locationSelected.emit({
      lat,
      lng,
      address: formattedAddress,
      district: districtName,
      distanceFromBranchKm: this.distanceFromBranch(),
      isExplicitUserAction
    });
  }

  private calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }
}
