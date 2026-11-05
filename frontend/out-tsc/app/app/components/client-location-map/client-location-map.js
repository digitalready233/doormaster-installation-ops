import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _c0 = ["mapContainer"];
const _forTrack0 = ($index, $item) => $item.name;
function ClientLocationMap_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 21);
    i0.ɵɵlistener("click", function ClientLocationMap_For_8_Template_button_click_0_listener() { const zone_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectPresetZone(zone_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const zone_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r2.activeDistrict() === zone_r2.district ? "bg-emerald-600 text-white border-emerald-600 shadow-xs" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", zone_r2.name, " ");
} }
function ClientLocationMap_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "mat-icon", 22);
    i0.ɵɵtext(2, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r2.distanceFromBranch(), " km to Atelier");
} }
function ClientLocationMap_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "span", 23);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Resolving address...");
    i0.ɵɵelementEnd()();
} }
let L = null;
export class ClientLocationMap {
    address = input('', ...(ngDevMode ? [{ debugName: "address" }] : /* istanbul ignore next */ []));
    locationSelected = output();
    mapContainer = viewChild('mapContainer', ...(ngDevMode ? [{ debugName: "mapContainer" }] : /* istanbul ignore next */ []));
    map = null;
    marker = null;
    circle = null;
    tileLayer = null;
    searchTimeout = null;
    Math = Math;
    isSearching = signal(false, ...(ngDevMode ? [{ debugName: "isSearching" }] : /* istanbul ignore next */ []));
    currentLat = signal(5.6020, ...(ngDevMode ? [{ debugName: "currentLat" }] : /* istanbul ignore next */ []));
    currentLng = signal(-0.1870, ...(ngDevMode ? [{ debugName: "currentLng" }] : /* istanbul ignore next */ []));
    activeDistrict = signal('Airport Residential', ...(ngDevMode ? [{ debugName: "activeDistrict" }] : /* istanbul ignore next */ []));
    // Closest branch reference (Spintex Workshop / Central Showroom)
    SHOP_BRANCH = { lat: 5.6320, lng: -0.0980 };
    distanceFromBranch = computed(() => {
        return this.calculateDistanceKm(this.currentLat(), this.currentLng(), this.SHOP_BRANCH.lat, this.SHOP_BRANCH.lng);
    }, ...(ngDevMode ? [{ debugName: "distanceFromBranch" }] : /* istanbul ignore next */ []));
    // Popular Greater Accra Zones for one-tap quick selection
    POPULAR_ZONES = [
        { name: 'Airport Res', keywords: ['airport', 'airport residential'], lat: 5.6020, lng: -0.1870, district: 'Airport Residential' },
        { name: 'East Legon', keywords: ['east legon', 'adjiringanor', 'american house'], lat: 5.6380, lng: -0.1550, district: 'East Legon' },
        { name: 'Cantonments', keywords: ['cantonments', 'embassy'], lat: 5.5840, lng: -0.1780, district: 'Cantonments' },
        { name: 'Spintex', keywords: ['spintex', 'batsona', 'manet'], lat: 5.6320, lng: -0.0980, district: 'Spintex Road' },
        { name: 'Labone', keywords: ['labone', 'south labone'], lat: 5.5680, lng: -0.1680, district: 'Labone' },
        { name: 'Osu', keywords: ['osu', 'oxford street', 'ring road'], lat: 5.5560, lng: -0.1820, district: 'Osu' },
        { name: 'Dzorwulu', keywords: ['dzorwulu', 'roman ridge', 'abelenkpe'], lat: 5.6050, lng: -0.1950, district: 'Dzorwulu' },
        { name: 'Tema', keywords: ['tema', 'harbor', 'community 1'], lat: 5.6698, lng: -0.0166, district: 'Tema Harbor' }
    ];
    // Comprehensive Greater Accra district dictionary for instant offline resolution
    ACCRA_LOCAL_DATABASE = [
        ...this.POPULAR_ZONES,
        { name: 'Ridge', keywords: ['ridge', 'north ridge', 'ministries'], lat: 5.5540, lng: -0.1980, district: 'Ridge' },
        { name: 'Dansoman', keywords: ['dansoman', 'mpoase'], lat: 5.5420, lng: -0.2580, district: 'Dansoman' },
        { name: 'Madina', keywords: ['madina', 'zongo junction'], lat: 5.6690, lng: -0.1650, district: 'Madina' },
        { name: 'Adenta', keywords: ['adenta', 'frafraha'], lat: 5.7110, lng: -0.1580, district: 'Adenta' },
        { name: 'Legon', keywords: ['legon', 'university of ghana'], lat: 5.6500, lng: -0.1860, district: 'Legon' },
        { name: 'Achimota', keywords: ['achimota', 'dome', 'mile 7'], lat: 5.6180, lng: -0.2280, district: 'Achimota' },
        { name: 'Kasoa', keywords: ['kasoa', 'weija'], lat: 5.5340, lng: -0.4210, district: 'Kasoa' },
        { name: 'Accra Central', keywords: ['accra central', 'makola', 'high street'], lat: 5.5440, lng: -0.2070, district: 'Accra Central' },
        { name: 'Tesano', keywords: ['tesano', 'abeka'], lat: 5.5990, lng: -0.2290, district: 'Tesano' },
        { name: 'Sakumono', keywords: ['sakumono', 'lashibi'], lat: 5.6260, lng: -0.0610, district: 'Sakumono' }
    ];
    constructor() {
        // Whenever the input address string updates, geocode and center map
        effect(() => {
            const addr = this.address();
            if (addr && addr.trim().length > 2) {
                this.scheduleGeocoding(addr.trim());
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
    async initMap() {
        if (typeof window === 'undefined')
            return;
        const container = this.mapContainer()?.nativeElement;
        if (!container)
            return;
        if (!L) {
            try {
                const leafletPkg = await import('leaflet');
                L = (leafletPkg.default || leafletPkg);
            }
            catch (err) {
                console.error('Failed to load Leaflet:', err);
                return;
            }
        }
        if (!L || !container)
            return;
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
            // Click anywhere on map to reposition client site pin
            this.map.on('click', (e) => {
                this.setLocation(e.latlng.lat, e.latlng.lng, 'Pinpointed Location');
            });
            setTimeout(() => {
                this.map?.invalidateSize();
            }, 200);
        }
        catch (e) {
            console.warn('Map initialization notice:', e);
        }
    }
    updateMarker(lat, lng) {
        if (!this.map || !L)
            return;
        const customPinHtml = `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: grab;">
        <span style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background: rgba(16, 185, 129, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="width: 28px; height: 28px; border-radius: 9999px; background: #059669; border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white;">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      </div>
    `;
        const icon = L.divIcon({
            className: 'client-site-pin',
            html: customPinHtml,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });
        if (this.marker) {
            this.marker.setLatLng([lat, lng]);
        }
        else {
            this.marker = L.marker([lat, lng], {
                icon,
                draggable: true
            }).addTo(this.map);
            // On marker drag end, update client location coordinates
            this.marker.on('dragend', (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                this.setLocation(position.lat, position.lng, 'Pinned Site');
            });
        }
        if (this.circle) {
            this.circle.setLatLng([lat, lng]);
        }
        else {
            this.circle = L.circle([lat, lng], {
                radius: 120,
                color: '#10b981',
                weight: 1.5,
                fillColor: '#10b981',
                fillOpacity: 0.12
            }).addTo(this.map);
        }
    }
    scheduleGeocoding(query) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        // 1. Direct GPS coordinates check (e.g. "5.6020, -0.1870")
        const gpsMatch = query.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
        if (gpsMatch) {
            const lat = parseFloat(gpsMatch[1]);
            const lng = parseFloat(gpsMatch[2]);
            if (!isNaN(lat) && !isNaN(lng)) {
                this.setLocation(lat, lng, 'GPS Input');
                return;
            }
        }
        // 2. Local Accra Ghana database fast match
        const lowerQuery = query.toLowerCase();
        const matchedKnown = this.ACCRA_LOCAL_DATABASE.find(item => item.keywords.some(kw => lowerQuery.includes(kw)));
        if (matchedKnown) {
            this.setLocation(matchedKnown.lat, matchedKnown.lng, matchedKnown.district);
            return;
        }
        // 3. Fallback online OpenStreetMap Nominatim with 350ms debounce
        this.searchTimeout = setTimeout(() => {
            this.fetchNominatimGeocode(query);
        }, 350);
    }
    async fetchNominatimGeocode(query) {
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
                    this.setLocation(lat, lng, displayName);
                }
            }
        }
        catch {
            // Offline or network error: gracefully keep current coordinates
        }
        finally {
            this.isSearching.set(false);
        }
    }
    setLocation(lat, lng, districtName, isExplicitUserAction = false) {
        this.currentLat.set(lat);
        this.currentLng.set(lng);
        this.activeDistrict.set(districtName);
        this.updateMarker(lat, lng);
        if (this.map) {
            this.map.panTo([lat, lng], { animate: true });
        }
        this.locationSelected.emit({
            lat,
            lng,
            address: districtName,
            district: districtName,
            distanceFromBranchKm: this.distanceFromBranch(),
            isExplicitUserAction
        });
    }
    selectPresetZone(zone) {
        this.setLocation(zone.lat, zone.lng, zone.district, true);
    }
    useCurrentDeviceLocation() {
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            this.isSearching.set(true);
            navigator.geolocation.getCurrentPosition((pos) => {
                this.isSearching.set(false);
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                this.setLocation(lat, lng, 'Current GPS Position', true);
            }, () => {
                this.isSearching.set(false);
            }, { timeout: 7000 });
        }
    }
    calculateDistanceKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10) / 10;
    }
    static ɵfac = function ClientLocationMap_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ClientLocationMap)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClientLocationMap, selectors: [["app-client-location-map"]], viewQuery: function ClientLocationMap_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.mapContainer, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { address: [1, "address"] }, outputs: { locationSelected: "locationSelected" }, decls: 34, vars: 5, consts: [["mapContainer", ""], [1, "mt-2", "space-y-2", "select-none"], [1, "flex", "items-center", "gap-1.5", "flex-wrap"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-emerald-600", "dark:text-emerald-400"], ["type", "button", 1, "text-[10px]", "font-medium", "px-2", "py-0.5", "rounded-full", "border", "transition-all", "cursor-pointer", 3, "class"], ["type", "button", "title", "Detect GPS coordinates using device location", 1, "text-[10px]", "font-bold", "px-2.5", "py-0.5", "rounded-full", "bg-cyan-700/10", "dark:bg-cyan-500/10", "text-cyan-700", "dark:text-cyan-300", "border", "border-cyan-500/30", "hover:bg-cyan-700/20", "transition-all", "flex", "items-center", "gap-1", "cursor-pointer", "ml-auto", 3, "click"], [1, "!text-xs"], [1, "relative", "isolate", "z-0", "w-full", "rounded-xl", "overflow-hidden", "border", "border-slate-200", "dark:border-slate-800", "shadow-md", "bg-slate-950", "transition-all"], [1, "relative", "w-full", "h-52", "sm:h-60", "bg-slate-900", "z-0"], [1, "absolute", "top-2.5", "left-2.5", "right-2.5", "z-10", "flex", "items-center", "justify-between", "pointer-events-none", "gap-2"], [1, "pointer-events-auto", "flex", "items-center", "gap-1.5", "bg-slate-900/90", "dark:bg-slate-950/90", "backdrop-blur-md", "px-2.5", "py-1", "rounded-lg", "border", "border-slate-700/80", "text-white", "text-[11px]", "shadow-sm", "font-mono"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-400", "animate-pulse"], [1, "font-bold", "text-emerald-400"], [1, "text-slate-500"], [1, "text-slate-300", "text-[10px]"], [1, "pointer-events-auto", "bg-slate-900/90", "backdrop-blur-md", "px-2.5", "py-1", "rounded-lg", "border", "border-slate-700/80", "text-white", "text-[10px]", "shadow-sm", "font-mono", "flex", "items-center", "gap-1"], [1, "absolute", "bottom-2", "left-2", "right-2", "z-10", "pointer-events-none", "flex", "items-center", "justify-between", "text-[10px]", "text-slate-300"], [1, "pointer-events-auto", "bg-slate-900/85", "backdrop-blur-xs", "px-2", "py-0.5", "rounded-md", "border", "border-slate-800", "text-slate-300", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-emerald-400"], [1, "pointer-events-auto", "bg-cyan-900/80", "backdrop-blur-xs", "px-2", "py-0.5", "rounded-md", "text-cyan-200", "flex", "items-center", "gap-1", "font-mono"], ["type", "button", 1, "text-[10px]", "font-medium", "px-2", "py-0.5", "rounded-full", "border", "transition-all", "cursor-pointer", 3, "click"], [1, "!text-xs", "text-sky-400"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-cyan-400", "animate-ping"]], template: function ClientLocationMap_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "span", 3)(3, "mat-icon", 4);
            i0.ɵɵtext(4, "near_me");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6, "Accra Zones:");
            i0.ɵɵelementEnd()();
            i0.ɵɵrepeaterCreate(7, ClientLocationMap_For_8_Template, 2, 3, "button", 5, _forTrack0);
            i0.ɵɵelementStart(9, "button", 6);
            i0.ɵɵlistener("click", function ClientLocationMap_Template_button_click_9_listener() { return ctx.useCurrentDeviceLocation(); });
            i0.ɵɵelementStart(10, "mat-icon", 7);
            i0.ɵɵtext(11, "my_location");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13, "Current GPS");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "div", 8);
            i0.ɵɵelement(15, "div", 9, 0);
            i0.ɵɵelementStart(17, "div", 10)(18, "div", 11);
            i0.ɵɵelement(19, "span", 12);
            i0.ɵɵelementStart(20, "span", 13);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span", 14);
            i0.ɵɵtext(23, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 15);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(26, ClientLocationMap_Conditional_26_Template, 5, 1, "div", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 17)(28, "div", 18)(29, "mat-icon", 19);
            i0.ɵɵtext(30, "touch_app");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span");
            i0.ɵɵtext(32, "Click map or drag the pin to pinpoint exact gate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(33, ClientLocationMap_Conditional_33_Template, 4, 0, "div", 20);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.POPULAR_ZONES);
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.activeDistrict());
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2(" ", ctx.currentLat().toFixed(4), "\u00B0 N, ", ctx.Math.abs(ctx.currentLng()).toFixed(4), "\u00B0 W ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.distanceFromBranch() ? 26 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.isSearching() ? 33 : -1);
        } }, dependencies: [CommonModule, MatIconModule, i1.MatIcon], styles: ["[_nghost-%COMP%] {\n      display: block;\n      width: 100%;\n    }\n      .leaflet-control-zoom {\n      border: 1px solid rgba(255, 255, 255, 0.15) !important;\n      border-radius: 8px !important;\n      overflow: hidden;\n      margin-top: 50px !important;\n      margin-bottom: 24px !important;\n      margin-right: 10px !important;\n    }\n      .leaflet-control-zoom a {\n      background-color: rgba(15, 23, 42, 0.9) !important;\n      color: #fff !important;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n      width: 26px !important;\n      height: 26px !important;\n      line-height: 26px !important;\n      font-size: 13px !important;\n    }\n      .leaflet-control-zoom a:hover {\n      background-color: rgba(30, 41, 59, 1) !important;\n    }\n      .leaflet-control-attribution {\n      background: rgba(15, 23, 42, 0.75) !important;\n      color: #94a3b8 !important;\n      font-size: 8px !important;\n      padding: 0 4px !important;\n    }\n      .client-site-pin {\n      background: transparent;\n      border: none;\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClientLocationMap, [{
        type: Component,
        args: [{ selector: 'app-client-location-map', changeDetection: ChangeDetectionStrategy.OnPush, imports: [CommonModule, MatIconModule], template: `
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
          class="relative w-full h-52 sm:h-60 bg-slate-900 z-0"
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

          <!-- Geocoding Status / Distance Pill -->
          @if (distanceFromBranch()) {
            <div class="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-white text-[10px] shadow-sm font-mono flex items-center gap-1">
              <mat-icon class="!text-xs text-sky-400">local_shipping</mat-icon>
              <span>{{ distanceFromBranch() }} km to Atelier</span>
            </div>
          }
        </div>

        <!-- Bottom Helpful Hint Overlay -->
        <div class="absolute bottom-2 left-2 right-2 z-10 pointer-events-none flex items-center justify-between text-[10px] text-slate-300">
          <div class="pointer-events-auto bg-slate-900/85 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-800 text-slate-300 flex items-center gap-1">
            <mat-icon class="!text-xs text-emerald-400">touch_app</mat-icon>
            <span>Click map or drag the pin to pinpoint exact gate</span>
          </div>

          @if (isSearching()) {
            <div class="pointer-events-auto bg-cyan-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-cyan-200 flex items-center gap-1 font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Resolving address...</span>
            </div>
          }
        </div>
      </div>
    </div>
  `, styles: ["\n    :host {\n      display: block;\n      width: 100%;\n    }\n    ::ng-deep .leaflet-control-zoom {\n      border: 1px solid rgba(255, 255, 255, 0.15) !important;\n      border-radius: 8px !important;\n      overflow: hidden;\n      margin-top: 50px !important;\n      margin-bottom: 24px !important;\n      margin-right: 10px !important;\n    }\n    ::ng-deep .leaflet-control-zoom a {\n      background-color: rgba(15, 23, 42, 0.9) !important;\n      color: #fff !important;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n      width: 26px !important;\n      height: 26px !important;\n      line-height: 26px !important;\n      font-size: 13px !important;\n    }\n    ::ng-deep .leaflet-control-zoom a:hover {\n      background-color: rgba(30, 41, 59, 1) !important;\n    }\n    ::ng-deep .leaflet-control-attribution {\n      background: rgba(15, 23, 42, 0.75) !important;\n      color: #94a3b8 !important;\n      font-size: 8px !important;\n      padding: 0 4px !important;\n    }\n    ::ng-deep .client-site-pin {\n      background: transparent;\n      border: none;\n    }\n  "] }]
    }], () => [], { address: [{ type: i0.Input, args: [{ isSignal: true, alias: "address", required: false }] }], locationSelected: [{ type: i0.Output, args: ["locationSelected"] }], mapContainer: [{ type: i0.ViewChild, args: ['mapContainer', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ClientLocationMap, { className: "ClientLocationMap", filePath: "frontend/src/app/components/client-location-map/client-location-map.ts", lineNumber: 158 }); })();
