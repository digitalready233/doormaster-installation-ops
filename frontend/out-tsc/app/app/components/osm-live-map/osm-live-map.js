import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _c0 = ["mapContainer"];
function OsmLiveMap_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Your Delivery Live Approach \u00B7 OpenStreetMap");
    i0.ɵɵelementEnd();
} }
function OsmLiveMap_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Shop Branch Fleet Live Radar (", ctx_r0.scopedJobs().length, " Jobs)");
} }
function OsmLiveMap_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Accra City Fleet Radar \u00B7 Live OpenStreetMap");
    i0.ɵɵelementEnd();
} }
function OsmLiveMap_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 22)(2, "div", 23)(3, "div", 24)(4, "mat-icon", 18);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 25)(7, "div", 26)(8, "span", 27);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h4", 28);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p", 29);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 30)(15, "span", 31);
    i0.ɵɵtext(16, "Telemetry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 32);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "div", 33)(20, "div", 34)(21, "span", 35);
    i0.ɵɵtext(22, "Est. ETA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "strong", 36);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 34)(26, "span", 35);
    i0.ɵɵtext(27, "Distance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "strong", 36);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 34)(31, "span", 35);
    i0.ɵɵtext(32, "Live Radar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "strong", 37);
    i0.ɵɵtext(34, " OpenStreetMap Live ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ent_r2 = i0.ɵɵnextContext().primaryMovingEntity();
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ent_r2.type === "truck" ? "bg-sky-600 text-white" : "bg-emerald-600 text-white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ent_r2.type === "truck" ? "directions_car" : "build");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ent_r2.type === "truck" ? "bg-sky-500/20 text-sky-300 border border-sky-400/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ent_r2.type === "truck" ? "Dispatch Car" : "Installer", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ent_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ent_r2.plateOrTitle, " \u00B7 Heading ", ent_r2.heading, "\u00B0 ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ent_r2.speedKmh, " km/h ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ent_r2.etaMinutes, " mins");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ent_r2.remainingDistanceKm, " km");
} }
let L = null;
export class OsmLiveMap {
    store = inject(InstallationStore);
    themeStore = inject(ThemeStore);
    // Input configuration
    mode = input('all-fleet', ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
    targetJob = input(null, ...(ngDevMode ? [{ debugName: "targetJob" }] : /* istanbul ignore next */ []));
    shopBranchFilter = input(null, ...(ngDevMode ? [{ debugName: "shopBranchFilter" }] : /* istanbul ignore next */ []));
    // Outputs
    jobSelected = output();
    // Map DOM Element
    mapEl = viewChild('mapContainer', ...(ngDevMode ? [{ debugName: "mapEl" }] : /* istanbul ignore next */ []));
    map = null;
    tileLayer = null;
    markerLayers = new Map();
    polylineLayers = new Map();
    animInterval = null;
    resizeObserver = null;
    isSimulating = signal(true, ...(ngDevMode ? [{ debugName: "isSimulating" }] : /* istanbul ignore next */ []));
    speedMultiplier = signal(1, ...(ngDevMode ? [{ debugName: "speedMultiplier" }] : /* istanbul ignore next */ []));
    activeMovingEntities = signal([], ...(ngDevMode ? [{ debugName: "activeMovingEntities" }] : /* istanbul ignore next */ []));
    // Key static hubs for Greater Accra corridor
    staticHubs = [
        { id: 'h1', name: 'SPINTEX_WORKSHOP', label: '🏭 ATELIER (SPINTEX)', lat: 5.6320, lng: -0.0980, color: '#0284c7', bgColor: '#0284c7' },
        { id: 'h2', name: 'ACCRA_CENTRAL', label: '🏛️ CENTRAL SHOWROOM', lat: 5.5560, lng: -0.2010, color: '#10b981', bgColor: '#10b981' },
        { id: 'h3', name: 'TEMA_DEPOT', label: '🚢 TEMA DEPOT', lat: 5.6698, lng: -0.0166, color: '#6366f1', bgColor: '#6366f1' },
        { id: 'h4', name: 'CANTONMENTS', label: '📍 CANTONMENTS', lat: 5.5840, lng: -0.1780, color: '#f59e0b', bgColor: '#f59e0b' },
        { id: 'h5', name: 'AIRPORT_RES', label: '📍 AIRPORT RES', lat: 5.6020, lng: -0.1870, color: '#ec4899', bgColor: '#ec4899' },
        { id: 'h6', name: 'EAST_LEGON', label: '📍 EAST LEGON', lat: 5.6380, lng: -0.1550, color: '#8b5cf6', bgColor: '#8b5cf6' },
    ];
    // Road waypoint paths between key locations for smooth realistic trajectory
    ROAD_PATHS = {
        'spintex-to-cantonments': [
            { lat: 5.6320, lng: -0.0980 },
            { lat: 5.6280, lng: -0.1140 },
            { lat: 5.6210, lng: -0.1380 },
            { lat: 5.6120, lng: -0.1560 },
            { lat: 5.5990, lng: -0.1680 },
            { lat: 5.5840, lng: -0.1780 }
        ],
        'spintex-to-airport': [
            { lat: 5.6320, lng: -0.0980 },
            { lat: 5.6270, lng: -0.1200 },
            { lat: 5.6200, lng: -0.1450 },
            { lat: 5.6140, lng: -0.1650 },
            { lat: 5.6070, lng: -0.1780 },
            { lat: 5.6020, lng: -0.1870 }
        ],
        'accra-to-east-legon': [
            { lat: 5.5560, lng: -0.2010 },
            { lat: 5.5720, lng: -0.1920 },
            { lat: 5.5920, lng: -0.1840 },
            { lat: 5.6120, lng: -0.1710 },
            { lat: 5.6290, lng: -0.1610 },
            { lat: 5.6380, lng: -0.1550 }
        ],
        'spintex-to-roman-ridge': [
            { lat: 5.6320, lng: -0.0980 },
            { lat: 5.6230, lng: -0.1320 },
            { lat: 5.6150, lng: -0.1580 },
            { lat: 5.6080, lng: -0.1820 },
            { lat: 5.5980, lng: -0.1980 }
        ]
    };
    scopedJobs = computed(() => {
        const all = this.store.jobs();
        const mode = this.mode();
        if (mode === 'client-single') {
            const target = this.targetJob();
            return target ? [target] : (all.length > 0 ? [all[0]] : []);
        }
        if (mode === 'shop-scoped') {
            const branch = this.shopBranchFilter() || 'DoorMaster Flagship Showroom - Accra Central';
            return all.filter(j => j.shopBranch === branch || (j.shopBooking && j.shopBooking.shopBranch === branch));
        }
        return all;
    }, ...(ngDevMode ? [{ debugName: "scopedJobs" }] : /* istanbul ignore next */ []));
    primaryMovingEntity = computed(() => {
        const list = this.activeMovingEntities();
        return list.length > 0 ? list[0] : null;
    }, ...(ngDevMode ? [{ debugName: "primaryMovingEntity" }] : /* istanbul ignore next */ []));
    constructor() {
        // React to Dark/Light theme changes
        effect(() => {
            this.themeStore.isDark();
            if (this.map) {
                this.updateTileLayer();
            }
        });
        // Re-initialize entities if scoped jobs change
        effect(() => {
            const jobs = this.scopedJobs();
            this.setupMovingEntities(jobs);
        });
    }
    ngAfterViewInit() {
        // Initialize live Leaflet OpenStreetMap after view container is mounted
        setTimeout(() => {
            this.initMap();
            this.startMotionSimulation();
            this.setupResizeObserver();
        }, 60);
    }
    ngOnDestroy() {
        if (this.animInterval) {
            clearInterval(this.animInterval);
            this.animInterval = null;
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
    setupResizeObserver() {
        const container = this.mapEl()?.nativeElement;
        if (!container || typeof ResizeObserver === 'undefined')
            return;
        this.resizeObserver = new ResizeObserver(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        });
        this.resizeObserver.observe(container);
    }
    async initMap() {
        if (typeof window === 'undefined')
            return;
        const container = this.mapEl()?.nativeElement;
        if (!container)
            return;
        if (!L) {
            try {
                const leafletPkg = await import('leaflet');
                L = (leafletPkg.default || leafletPkg);
            }
            catch (e) {
                console.error('Failed to load Leaflet:', e);
                return;
            }
        }
        if (!L || !container)
            return;
        if (this.map) {
            this.map.invalidateSize();
            this.updateTileLayer();
            this.renderStaticMarkersAndRoutes();
            this.updateMovingMarkersOnMap();
            return;
        }
        // Centered around Greater Accra Corridor
        const centerLat = 5.6020;
        const centerLng = -0.1600;
        const zoomLevel = this.mode() === 'client-single' ? 14 : 12;
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
        }
        catch (e) {
            console.warn('Map initialization notice:', e);
        }
    }
    updateTileLayer() {
        const leaflet = L;
        if (!this.map || !leaflet)
            return;
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
    setupMovingEntities(jobs) {
        const isApi = this.store.dataMode() === 'api';
        const activeJobs = isApi
            ? jobs.filter(j => j.status === 'dispatched' || j.motionLiveStarted || j.status === 'on_site')
            : jobs;
        const entities = [];
        activeJobs.forEach((j, index) => {
            let routeKey = 'spintex-to-cantonments';
            if (index % 4 === 1)
                routeKey = 'spintex-to-airport';
            else if (index % 4 === 2)
                routeKey = 'accra-to-east-legon';
            else if (index % 4 === 3)
                routeKey = 'spintex-to-roman-ridge';
            const route = this.ROAD_PATHS[routeKey] || this.ROAD_PATHS['spintex-to-cantonments'];
            const target = route[route.length - 1];
            // Dispatch Vehicle entity (Car)
            const truckPlate = j.logisticsTruck?.truckPlate || 'GT-4821-26';
            const driverName = j.dispatcherName || 'Emmanuel Kojo (Dispatch Driver)';
            entities.push({
                id: `dispatch_${j.id}`,
                type: 'truck',
                jobId: j.id,
                name: driverName,
                plateOrTitle: `Dispatch Car (${truckPlate})`,
                currentLat: route[0].lat,
                currentLng: route[0].lng,
                targetLat: target.lat,
                targetLng: target.lng,
                route,
                currentIndex: 0,
                progressRatio: 0.15 + (index * 0.2) % 0.7,
                speedKmh: 42 + Math.floor(Math.random() * 8),
                etaMinutes: Math.max(4, 18 - Math.floor(index * 3)),
                remainingDistanceKm: +(6.4 - index * 1.1).toFixed(1),
                heading: 245,
                status: 'En Route on Road'
            });
            // Field Installer entity (Technician)
            const installerName = j.assignedInstallerName || 'Marcus Vance';
            entities.push({
                id: `inst_${j.id}`,
                type: 'installer',
                jobId: j.id,
                name: installerName,
                plateOrTitle: 'Field Installer Technician',
                currentLat: route[Math.min(2, route.length - 1)].lat,
                currentLng: route[Math.min(2, route.length - 1)].lng,
                targetLat: target.lat,
                targetLng: target.lng,
                route,
                currentIndex: 1,
                progressRatio: 0.35 + (index * 0.15) % 0.6,
                speedKmh: 35 + Math.floor(Math.random() * 6),
                etaMinutes: Math.max(6, 14 - Math.floor(index * 2)),
                remainingDistanceKm: +(4.2 - index * 0.8).toFixed(1),
                heading: 260,
                status: 'Approaching Site'
            });
        });
        this.activeMovingEntities.set(entities);
    }
    renderStaticMarkersAndRoutes() {
        const leaflet = L;
        if (!this.map || !leaflet)
            return;
        // 1. Atelier Hub
        const atelierIcon = leaflet.divIcon({
            className: 'custom-hub-icon',
            html: `
        <div style="background:#0284c7; color:#fff; padding:4px 8px; border-radius:10px; font-weight:bold; font-size:9.5px; font-family:monospace; box-shadow:0 3px 10px rgba(2,132,199,0.5); border:1.5px solid #fff; display:flex; align-items:center; gap:3px; white-space:nowrap;">
          <span>🏭</span>
          <span>ATELIER (SPINTEX)</span>
        </div>
      `,
            iconSize: [140, 26],
            iconAnchor: [70, 13]
        });
        leaflet.marker([5.6320, -0.0980], { icon: atelierIcon }).addTo(this.map);
        // 2. Central Showroom Hub
        const showroomIcon = leaflet.divIcon({
            className: 'custom-hub-icon',
            html: `
        <div style="background:#10b981; color:#fff; padding:4px 8px; border-radius:10px; font-weight:bold; font-size:9.5px; font-family:monospace; box-shadow:0 3px 10px rgba(16,185,129,0.5); border:1.5px solid #fff; display:flex; align-items:center; gap:3px; white-space:nowrap;">
          <span>🏛️</span>
          <span>CENTRAL SHOWROOM</span>
        </div>
      `,
            iconSize: [150, 26],
            iconAnchor: [75, 13]
        });
        leaflet.marker([5.5560, -0.2010], { icon: showroomIcon }).addTo(this.map);
        // 3. Client Installation destinations
        const jobs = this.scopedJobs();
        jobs.forEach(j => {
            const clientLat = j.client?.latitude || 5.5840;
            const clientLng = j.client?.longitude || -0.1780;
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
                .addTo(this.map)
                .on('click', () => {
                this.jobSelected.emit(j.id);
            });
            this.markerLayers.set(`dest_${j.id}`, marker);
        });
        // Render road paths between atelier and key areas
        Object.entries(this.ROAD_PATHS).forEach(([key, path]) => {
            if (this.polylineLayers.has(key))
                return;
            const latLngs = path.map(pt => [pt.lat, pt.lng]);
            const poly = leaflet.polyline(latLngs, {
                color: '#10b981',
                weight: 3.5,
                opacity: 0.65,
                dashArray: '6, 8',
                lineCap: 'round'
            }).addTo(this.map);
            this.polylineLayers.set(key, poly);
        });
    }
    startMotionSimulation() {
        if (this.animInterval)
            clearInterval(this.animInterval);
        this.animInterval = setInterval(() => {
            if (!this.isSimulating())
                return;
            const speedMult = this.speedMultiplier();
            const stepDelta = 0.005 * speedMult;
            this.activeMovingEntities.update(entities => {
                return entities.map(ent => {
                    let newProgress = ent.progressRatio + stepDelta;
                    if (newProgress >= 1.0) {
                        newProgress = 0.05; // Loop journey for continuous live demo
                    }
                    // Interpolate coordinate along polyline
                    const totalSegments = ent.route.length - 1;
                    const currentSegIndex = Math.min(Math.floor(newProgress * totalSegments), totalSegments - 1);
                    const segRatio = (newProgress * totalSegments) - currentSegIndex;
                    const p1 = ent.route[currentSegIndex];
                    const p2 = ent.route[currentSegIndex + 1];
                    const interpLat = p1.lat + (p2.lat - p1.lat) * segRatio;
                    const interpLng = p1.lng + (p2.lng - p1.lng) * segRatio;
                    // Heading calculation
                    const dLng = p2.lng - p1.lng;
                    const dLat = p2.lat - p1.lat;
                    const heading = Math.round((Math.atan2(dLng, dLat) * 180 / Math.PI + 360) % 360);
                    const remainingDist = +((1 - newProgress) * 7.2).toFixed(1);
                    const eta = Math.max(1, Math.round((remainingDist / (ent.speedKmh || 40)) * 60));
                    return {
                        ...ent,
                        currentLat: interpLat,
                        currentLng: interpLng,
                        progressRatio: newProgress,
                        heading,
                        remainingDistanceKm: remainingDist,
                        etaMinutes: eta
                    };
                });
            });
            this.updateMovingMarkersOnMap();
        }, 250);
    }
    updateMovingMarkersOnMap() {
        const map = this.map;
        const leaflet = L;
        if (!map || !leaflet)
            return;
        const entities = this.activeMovingEntities();
        entities.forEach(ent => {
            let marker = this.markerLayers.get(ent.id);
            const isDispatch = ent.type === 'truck';
            const bgColor = isDispatch ? '#0284c7' : '#059669';
            const label = isDispatch ? ent.plateOrTitle : `Installer: ${ent.name}`;
            const carSvg = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" style="display:block;">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
          <circle cx="7.5" cy="14.5" r="1.5"/>
          <circle cx="16.5" cy="14.5" r="1.5"/>
        </svg>
      `;
            const spannerSvg = `
        <svg viewBox="0 0 24 24" width="15" height="15" fill="#ffffff" style="display:block;">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      `;
            const markerGraphic = isDispatch ? carSvg : spannerSvg;
            const html = `
        <div style="position:relative; cursor:pointer;" title="${ent.name}">
          <div style="position:absolute; width:44px; height:44px; background:${bgColor}33; border-radius:50%; top:-9px; left:-9px; animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="background:${bgColor}; color:#fff; width:28px; height:28px; border-radius:50%; border:2px solid #fff; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.5);">
            ${markerGraphic}
          </div>
          <div style="background:rgba(15,23,42,0.92); color:#fff; font-size:9.5px; font-family:monospace; font-weight:bold; padding:2px 7px; border-radius:6px; border:1px solid rgba(255,255,255,0.25); white-space:nowrap; position:absolute; left:32px; top:4px; box-shadow:0 2px 6px rgba(0,0,0,0.4); display:flex; align-items:center; gap:4px;">
            <span>${isDispatch ? '🚗' : '🔧'}</span>
            <span>${label}</span>
          </div>
        </div>
      `;
            const icon = leaflet.divIcon({
                className: 'custom-moving-icon',
                html,
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });
            if (!marker) {
                marker = leaflet.marker([ent.currentLat, ent.currentLng], { icon })
                    .addTo(map)
                    .on('click', () => {
                    this.jobSelected.emit(ent.jobId);
                });
                this.markerLayers.set(ent.id, marker);
            }
            else {
                marker.setLatLng([ent.currentLat, ent.currentLng]);
                marker.setIcon(icon);
            }
        });
    }
    toggleSimulation() {
        this.isSimulating.update(v => !v);
    }
    cycleSpeed() {
        const cur = this.speedMultiplier();
        this.speedMultiplier.set(cur === 1 ? 2 : cur === 2 ? 5 : 1);
    }
    resetFleetPositions() {
        if (!this.map)
            return;
        this.map.setView([5.6020, -0.1600], this.mode() === 'client-single' ? 14 : 12);
    }
    static ɵfac = function OsmLiveMap_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OsmLiveMap)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OsmLiveMap, selectors: [["app-osm-live-map"]], viewQuery: function OsmLiveMap_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.mapEl, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { mode: [1, "mode"], targetJob: [1, "targetJob"], shopBranchFilter: [1, "shopBranchFilter"] }, outputs: { jobSelected: "jobSelected" }, decls: 33, vars: 8, consts: [["mapContainer", ""], [1, "relative", "isolate", "z-0", "w-full", "rounded-2xl", "overflow-hidden", "border", "border-slate-200", "dark:border-slate-800", "shadow-md", "bg-slate-950", "select-none"], [1, "absolute", "top-3", "left-3", "right-3", "z-10", "flex", "flex-wrap", "items-center", "justify-between", "gap-2", "pointer-events-none"], [1, "pointer-events-auto", "flex", "items-center", "gap-2", "bg-slate-900/90", "dark:bg-slate-950/90", "backdrop-blur-md", "px-3.5", "py-1.5", "rounded-xl", "border", "border-slate-700/80", "text-white", "text-xs", "shadow-lg"], [1, "relative", "flex", "items-center", "justify-center"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-emerald-500", "animate-ping", "absolute", "opacity-75"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-400", "relative"], [1, "font-bold", "text-[11px]", "uppercase", "tracking-wider", "font-mono", "flex", "items-center", "gap-1.5"], [1, "text-emerald-400"], [1, "text-slate-500"], [1, "text-slate-500", "text-[10px]", "font-mono", "hidden", "sm:inline"], [1, "text-emerald-400", "text-[10px]", "font-mono", "hidden", "sm:inline"], [1, "pointer-events-auto", "flex", "items-center", "gap-1.5", "bg-slate-900/90", "dark:bg-slate-950/90", "backdrop-blur-md", "p-1", "rounded-xl", "border", "border-slate-700/80", "text-white", "text-xs", "shadow-lg"], ["type", "button", "title", "Pause/Resume live motion", 1, "px-2.5", "py-1", "rounded-lg", "font-bold", "text-[10px]", "font-mono", "flex", "items-center", "gap-1", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-xs"], [1, "hidden", "sm:inline"], ["type", "button", "title", "Cycle simulation speed", 1, "px-2", "py-1", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "rounded-lg", "text-[10px]", "font-mono", "font-bold", "transition-colors", "cursor-pointer", 3, "click"], ["type", "button", "title", "Re-center Fleet Map", "aria-label", "Re-center Fleet Map", 1, "p-1", "text-slate-400", "hover:text-white", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-sm"], [1, "relative", "w-full", "h-80", "sm:h-96", "lg:h-[420px]", "bg-slate-950"], [1, "relative", "w-full", "h-full", "bg-slate-950", "z-0"], [1, "absolute", "bottom-3", "left-3", "right-3", "sm:right-auto", "sm:max-w-md", "z-10", "bg-slate-900/95", "dark:bg-slate-950/95", "backdrop-blur-md", "border", "border-slate-700", "p-3.5", "rounded-2xl", "shadow-2xl", "text-white", "space-y-2", "animate-in", "fade-in"], [1, "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2.5", "min-w-0"], [1, "w-8", "h-8", "rounded-xl", "flex", "items-center", "justify-center", "font-bold", "text-xs", "shrink-0"], [1, "truncate"], [1, "flex", "items-center", "gap-1.5"], [1, "text-[9px]", "uppercase", "font-mono", "font-bold", "px-1.5", "py-0.2", "rounded"], [1, "text-xs", "font-bold", "text-white", "truncate"], [1, "text-[10px]", "text-slate-400", "font-mono", "truncate"], [1, "text-right", "shrink-0"], [1, "text-[9px]", "uppercase", "font-mono", "text-slate-400", "block"], [1, "text-xs", "font-black", "font-mono", "text-emerald-400", "tabular-nums"], [1, "grid", "grid-cols-3", "gap-2", "pt-1.5", "border-t", "border-slate-800", "text-center", "font-mono"], [1, "bg-slate-800/60", "p-1.5", "rounded-lg"], [1, "text-[9px]", "text-slate-400", "block", "uppercase"], [1, "text-xs", "text-white"], [1, "text-xs", "truncate", "block", "text-emerald-400", "font-bold"]], template: function OsmLiveMap_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
            i0.ɵɵelement(4, "span", 5)(5, "span", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 7)(7, "span", 8);
            i0.ɵɵtext(8, "LIVE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "span", 9);
            i0.ɵɵtext(10, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, OsmLiveMap_Conditional_11_Template, 2, 0, "span")(12, OsmLiveMap_Conditional_12_Template, 2, 1, "span")(13, OsmLiveMap_Conditional_13_Template, 2, 0, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span", 10);
            i0.ɵɵtext(15, "|");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span", 11);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 12)(19, "button", 13);
            i0.ɵɵlistener("click", function OsmLiveMap_Template_button_click_19_listener() { return ctx.toggleSimulation(); });
            i0.ɵɵelementStart(20, "mat-icon", 14);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span", 15);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 16);
            i0.ɵɵlistener("click", function OsmLiveMap_Template_button_click_24_listener() { return ctx.cycleSpeed(); });
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 17);
            i0.ɵɵlistener("click", function OsmLiveMap_Template_button_click_26_listener() { return ctx.resetFleetPositions(); });
            i0.ɵɵelementStart(27, "mat-icon", 18);
            i0.ɵɵtext(28, "my_location");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(29, "div", 19);
            i0.ɵɵelement(30, "div", 20, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(32, OsmLiveMap_Conditional_32_Template, 35, 12, "div", 21);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.mode() === "client-single" ? 11 : ctx.mode() === "shop-scoped" ? 12 : 13);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.activeMovingEntities().length, " Units Active Live ");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.isSimulating() ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white" : "bg-emerald-600 text-white hover:bg-emerald-500");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.isSimulating() ? "pause" : "play_arrow");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.isSimulating() ? "Pause Motion" : "Resume Motion");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.speedMultiplier(), "x Speed ");
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.primaryMovingEntity() ? 32 : -1);
        } }, dependencies: [CommonModule, MatIconModule, i1.MatIcon], styles: ["[_nghost-%COMP%] {\n      display: block;\n      width: 100%;\n    }\n      .leaflet-control-zoom {\n      border: 1px solid rgba(255, 255, 255, 0.15) !important;\n      border-radius: 12px !important;\n      overflow: hidden;\n      margin-top: 50px !important;\n      margin-bottom: 24px !important;\n      margin-right: 14px !important;\n    }\n      .leaflet-control-zoom a {\n      background-color: rgba(15, 23, 42, 0.9) !important;\n      color: #fff !important;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n    }\n      .leaflet-control-zoom a:hover {\n      background-color: rgba(30, 41, 59, 1) !important;\n    }\n      .leaflet-control-attribution {\n      background: rgba(15, 23, 42, 0.85) !important;\n      color: #94a3b8 !important;\n      font-size: 9px !important;\n      border-top-left-radius: 8px;\n      padding: 2px 8px !important;\n    }\n      .leaflet-control-attribution a {\n      color: #38bdf8 !important;\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OsmLiveMap, [{
        type: Component,
        args: [{ selector: 'app-osm-live-map', changeDetection: ChangeDetectionStrategy.OnPush, imports: [CommonModule, MatIconModule], template: `
    <div class="relative isolate z-0 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950 select-none">
      
      <!-- Top Floating Control Ribbon -->
      <div class="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        <!-- Live Status Pill (Live OpenStreetMap Telemetry) -->
        <div class="pointer-events-auto flex items-center gap-2 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-white text-xs shadow-lg">
          <div class="relative flex items-center justify-center">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 relative"></span>
          </div>
          
          <span class="font-bold text-[11px] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span class="text-emerald-400">LIVE</span>
            <span class="text-slate-500">·</span>
            @if (mode() === 'client-single') {
              <span>Your Delivery Live Approach · OpenStreetMap</span>
            } @else if (mode() === 'shop-scoped') {
              <span>Shop Branch Fleet Live Radar ({{ scopedJobs().length }} Jobs)</span>
            } @else {
              <span>Accra City Fleet Radar · Live OpenStreetMap</span>
            }
          </span>

          <span class="text-slate-500 text-[10px] font-mono hidden sm:inline">|</span>
          <span class="text-emerald-400 text-[10px] font-mono hidden sm:inline">
            {{ activeMovingEntities().length }} Units Active Live
          </span>
        </div>

        <!-- Map Controls -->
        <div class="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 text-white text-xs shadow-lg">
          
          <!-- Motion Simulation Pause/Resume -->
          <button 
            type="button" 
            (click)="toggleSimulation()"
            class="px-2.5 py-1 rounded-lg font-bold text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
            [class]="isSimulating() ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'"
            title="Pause/Resume live motion"
          >
            <mat-icon class="!text-xs">{{ isSimulating() ? 'pause' : 'play_arrow' }}</mat-icon>
            <span class="hidden sm:inline">{{ isSimulating() ? 'Pause Motion' : 'Resume Motion' }}</span>
          </button>

          <!-- Speed Multiplier -->
          <button 
            type="button" 
            (click)="cycleSpeed()"
            class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer"
            title="Cycle simulation speed"
          >
            {{ speedMultiplier() }}x Speed
          </button>

          <!-- Re-center Map -->
          <button 
            type="button" 
            (click)="resetFleetPositions()"
            class="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Re-center Fleet Map"
            aria-label="Re-center Fleet Map"
          >
            <mat-icon class="!text-sm">my_location</mat-icon>
          </button>
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

      <!-- Bottom Floating Telemetry HUD -->
      @if (primaryMovingEntity()) {
        @let ent = primaryMovingEntity()!;
        <div class="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-700 p-3.5 rounded-2xl shadow-2xl text-white space-y-2 animate-in fade-in">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 min-w-0">
              <div 
                class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                [class]="ent.type === 'truck' ? 'bg-sky-600 text-white' : 'bg-emerald-600 text-white'"
              >
                <mat-icon class="!text-sm">{{ ent.type === 'truck' ? 'directions_car' : 'build' }}</mat-icon>
              </div>
              <div class="truncate">
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded"
                    [class]="ent.type === 'truck' ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'">
                    {{ ent.type === 'truck' ? 'Dispatch Car' : 'Installer' }}
                  </span>
                  <h4 class="text-xs font-bold text-white truncate">{{ ent.name }}</h4>
                </div>
                <p class="text-[10px] text-slate-400 font-mono truncate">
                  {{ ent.plateOrTitle }} · Heading {{ ent.heading }}°
                </p>
              </div>
            </div>

            <div class="text-right shrink-0">
              <span class="text-[9px] uppercase font-mono text-slate-400 block">Telemetry</span>
              <span class="text-xs font-black font-mono text-emerald-400 tabular-nums">
                {{ ent.speedKmh }} km/h
              </span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-1.5 border-t border-slate-800 text-center font-mono">
            <div class="bg-slate-800/60 p-1.5 rounded-lg">
              <span class="text-[9px] text-slate-400 block uppercase">Est. ETA</span>
              <strong class="text-xs text-white">{{ ent.etaMinutes }} mins</strong>
            </div>
            <div class="bg-slate-800/60 p-1.5 rounded-lg">
              <span class="text-[9px] text-slate-400 block uppercase">Distance</span>
              <strong class="text-xs text-white">{{ ent.remainingDistanceKm }} km</strong>
            </div>
            <div class="bg-slate-800/60 p-1.5 rounded-lg">
              <span class="text-[9px] text-slate-400 block uppercase">Live Radar</span>
              <strong class="text-xs truncate block text-emerald-400 font-bold">
                OpenStreetMap Live
              </strong>
            </div>
          </div>
        </div>
      }
    </div>
  `, styles: ["\n    :host {\n      display: block;\n      width: 100%;\n    }\n    ::ng-deep .leaflet-control-zoom {\n      border: 1px solid rgba(255, 255, 255, 0.15) !important;\n      border-radius: 12px !important;\n      overflow: hidden;\n      margin-top: 50px !important;\n      margin-bottom: 24px !important;\n      margin-right: 14px !important;\n    }\n    ::ng-deep .leaflet-control-zoom a {\n      background-color: rgba(15, 23, 42, 0.9) !important;\n      color: #fff !important;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n    }\n    ::ng-deep .leaflet-control-zoom a:hover {\n      background-color: rgba(30, 41, 59, 1) !important;\n    }\n    ::ng-deep .leaflet-control-attribution {\n      background: rgba(15, 23, 42, 0.85) !important;\n      color: #94a3b8 !important;\n      font-size: 9px !important;\n      border-top-left-radius: 8px;\n      padding: 2px 8px !important;\n    }\n    ::ng-deep .leaflet-control-attribution a {\n      color: #38bdf8 !important;\n    }\n  "] }]
    }], () => [], { mode: [{ type: i0.Input, args: [{ isSignal: true, alias: "mode", required: false }] }], targetJob: [{ type: i0.Input, args: [{ isSignal: true, alias: "targetJob", required: false }] }], shopBranchFilter: [{ type: i0.Input, args: [{ isSignal: true, alias: "shopBranchFilter", required: false }] }], jobSelected: [{ type: i0.Output, args: ["jobSelected"] }], mapEl: [{ type: i0.ViewChild, args: ['mapContainer', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OsmLiveMap, { className: "OsmLiveMap", filePath: "frontend/src/app/components/osm-live-map/osm-live-map.ts", lineNumber: 231 }); })();
