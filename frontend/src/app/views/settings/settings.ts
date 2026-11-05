import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';
import { SmsProviderType, ShopLocationSettings } from '../../models/installation.model';

export type SettingsTab = 'shop' | 'phones' | 'gateway' | 'inbox' | 'theme';

@Component({
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, SlicePipe],
  template: `
    <div class="space-y-6">
      
      <!-- Top Header Breadcrumb & Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Pro Operations</span>
            <span aria-hidden="true">·</span>
            <span>Governance & Architecture</span>
            <span aria-hidden="true">·</span>
            <span class="inline-flex items-center gap-1 font-bold text-cyan-700 dark:text-cyan-400">
              <mat-icon class="!text-xs">tune</mat-icon>
              <span>System & Shop Settings</span>
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>Settings Hub</span>
            <span class="text-xs uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              MySQL & SMS Sync
            </span>
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage your workshop branch location, GPS coordinates stored in MySQL, role-based recipient mobile phones, and automated SMS gateway credentials.
          </p>
        </div>

        <!-- Quick Telemetry Badges -->
        <div class="flex flex-wrap items-center gap-2">
          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <div class="text-[11px] font-mono">
              <span class="text-slate-400">Shop: </span>
              <strong class="text-slate-800 dark:text-slate-200">{{ store.shopLocation().branchCode }}</strong>
            </div>
          </div>

          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-2">
            <mat-icon class="!text-xs text-cyan-500">sms</mat-icon>
            <div class="text-[11px] font-mono">
              <span class="text-slate-400">Gateway: </span>
              <strong class="text-slate-800 dark:text-slate-200 uppercase">{{ store.smsGatewayConfig().provider }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          (click)="activeTab.set('shop')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'shop' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">storefront</mat-icon>
          <span>Shop Location & Workshop</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/40 text-cyan-200 font-normal">MySQL DB</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('phones')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'phones' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">phone_iphone</mat-icon>
          <span>SMS & Phone Directory</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/40 text-cyan-200 font-normal">6 Roles</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('gateway')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'gateway' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">settings_cell</mat-icon>
          <span>SMS Gateway Credentials</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('inbox')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'inbox' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">chat</mat-icon>
          <span>Live SMS Logs</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/40 text-cyan-200 font-normal">
            {{ store.smsLogs().length }}
          </span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('theme')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'theme' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">palette</mat-icon>
          <span>Theme & Appearance</span>
        </button>
      </div>

      <!-- Toast Feedback Message -->
      @if (feedbackMessage()) {
        <div class="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-200">
          <div class="flex items-center gap-2 font-semibold">
            <mat-icon class="!text-base text-emerald-600">check_circle</mat-icon>
            <span>{{ feedbackMessage() }}</span>
          </div>
          <button type="button" (click)="feedbackMessage.set(null)" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <mat-icon class="!text-sm">close</mat-icon>
          </button>
        </div>
      }

      <!-- TAB 1: SHOP LOCATION & WORKSHOP SETTINGS (STORED IN MYSQL DB) -->
      @if (activeTab() === 'shop') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Workshop Branch Location Settings</span>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                  MySQL Table: shop_locations
                </span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Saved in MySQL database and automatically linked to order booking counter, driver dispatch, and OpenStreetMap radar.
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[11px] text-slate-400 font-mono">Last updated: {{ store.shopLocation().updatedAt ? (store.shopLocation().updatedAt | slice:0:19) : 'Active' }}</span>
            </div>
          </div>

          <!-- All 14 Branches Directory Quick Select -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <mat-icon class="!text-sm text-cyan-600">storefront</mat-icon>
                <span>DoorMaster 14 Branches Directory (Click to load & configure)</span>
              </span>
              <span class="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold">
                {{ store.branches().length }} Branches Active
              </span>
            </div>
            
            <div class="flex flex-wrap items-center gap-1.5 max-h-36 overflow-y-auto pr-1">
              @for (b of store.branches(); track b.branchCode) {
                <button
                  type="button"
                  (click)="selectBranchPreset(b)"
                  class="px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1"
                  [class]="store.shopLocation().branchCode === b.branchCode 
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-2xs font-bold' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'"
                >
                  <span>🏪</span>
                  <span>{{ b.shopName.replace('DoorMaster ', '') }}</span>
                  <span class="text-[9px] opacity-75 font-mono">({{ b.branchCode }})</span>
                </button>
              }
            </div>
          </div>

          <form [formGroup]="shopLocationForm" (ngSubmit)="saveShopLocation()" class="space-y-6 text-xs">
            
            <!-- Branch Identity -->
            <div class="space-y-3">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600">business</mat-icon>
                <span>Branch Identity</span>
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-2 space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Shop / Workshop Name *</label>
                  <input 
                    type="text" 
                    formControlName="shopName" 
                    placeholder="e.g. DoorMaster Flagship Workshop - Atelier A" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
                  />
                  <span class="text-[10px] text-slate-400">Used as the originating workshop name across all customer quotes & booking forms</span>
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Branch Code *</label>
                  <input 
                    type="text" 
                    formControlName="branchCode" 
                    placeholder="e.g. DM-ACC-01" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono font-bold"
                  />
                  <span class="text-[10px] text-slate-400">Internal code (e.g. DM-ACC-01)</span>
                </div>
              </div>
            </div>

            <!-- Physical Location & Address -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600">pin_drop</mat-icon>
                <span>Physical Address & Corridor</span>
              </h3>
              <div class="space-y-1">
                <label class="font-bold text-slate-700 dark:text-slate-300">Street Address & Landmark *</label>
                <input 
                  type="text" 
                  formControlName="address" 
                  placeholder="e.g. Plot 48, Spintex Road Industrial Area" 
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">City *</label>
                  <input 
                    type="text" 
                    formControlName="city" 
                    placeholder="e.g. Accra" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Region</label>
                  <input 
                    type="text" 
                    formControlName="region" 
                    placeholder="e.g. Greater Accra" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <!-- GPS Coordinates & Accra Hub Quick Presets -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">my_location</mat-icon>
                  <span>Store Origin GPS Coordinates</span>
                </h3>
                <button 
                  type="button" 
                  (click)="detectBrowserGps()" 
                  class="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <mat-icon class="!text-xs">gps_fixed</mat-icon>
                  <span>Detect Device GPS</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Latitude *</label>
                  <input 
                    type="number" 
                    step="any"
                    formControlName="latitude" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Longitude *</label>
                  <input 
                    type="number" 
                    step="any"
                    formControlName="longitude" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Quick Greater Accra Hub Presets:</span>
                <div class="flex flex-wrap gap-2">
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.6231, -0.1582, 'Plot 48, Spintex Road Industrial Area')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    🏭 Spintex Atelier
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.5560, -0.2012, 'High Street Boulevard, Central Business District')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    🏛️ Accra Central
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.6380, -0.1550, 'Boundary Road, East Legon')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    📍 East Legon
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.6698, -0.0166, 'Harbor Commercial Gateway, Tema')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    🚢 Tema Harbor
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.5840, -0.1780, 'Rangoon Lane, Cantonments Diplomatic Zone')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    📍 Cantonments
                  </button>
                </div>
              </div>
            </div>

            <!-- Workshop Operations & Contact Details -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600">contact_phone</mat-icon>
                <span>Operations, Counter & Manager Details</span>
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Shop Manager Name</label>
                  <input 
                    type="text" 
                    formControlName="managerName" 
                    placeholder="e.g. Kwame Mensah" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Dispatch Logistics Radius (km) *</label>
                  <div class="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="1" 
                      max="200" 
                      formControlName="dispatchRadiusKm" 
                      class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                    <span class="text-xs text-slate-400 font-bold">km</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Direct Phone (SMS Alerts) *</label>
                  <input 
                    type="text" 
                    formControlName="phone" 
                    placeholder="+233 24 100 0002" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Official Email</label>
                  <input 
                    type="email" 
                    formControlName="email" 
                    placeholder="spintex.workshop@doormasterops.com" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-bold text-slate-700 dark:text-slate-300">Operating / Dispatch Hours</label>
                <input 
                  type="text" 
                  formControlName="operatingHours" 
                  placeholder="Mon - Sat: 08:00 - 18:00" 
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Submit Action -->
            <div class="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <mat-icon class="!text-sm text-emerald-600">database</mat-icon>
                <span>Persisted in MySQL table <code class="font-mono text-cyan-600 dark:text-cyan-400">shop_locations</code></span>
              </div>

              <button 
                type="submit" 
                [disabled]="!shopLocationForm.valid || isSavingShopLocation()"
                class="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                @if (isSavingShopLocation()) {
                  <mat-icon class="!text-sm animate-spin">refresh</mat-icon>
                  <span>Saving Location...</span>
                } @else {
                  <mat-icon class="!text-sm">save</mat-icon>
                  <span>Save Location</span>
                }
              </button>
            </div>
          </form>
        </div>
      }

      <!-- TAB 2: USER PHONE DIRECTORY (SMS ROUTING) -->
      @if (activeTab() === 'phones') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>User Phone Directory & SMS Routing</span>
              <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                Automated SMS Delivery
              </span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Each user persona has a verified mobile number. When a shop manager books an order, an installer is assigned, or a driver departs, automated SMS messages route instantly to these phones.
            </p>
          </div>

          <form [formGroup]="phonesForm" (ngSubmit)="savePhones()" class="space-y-5 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold">
                  <mat-icon class="!text-sm">storefront</mat-icon>
                  <span>Shop Attendant / Manager *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="shop_manager"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 100 0002"
                />
                <span class="text-[10px] text-slate-400 block">Receives booking confirmations & installer assignment SMS</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                  <mat-icon class="!text-sm">admin_panel_settings</mat-icon>
                  <span>Operations Manager *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="manager"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 100 0001"
                />
                <span class="text-[10px] text-slate-400 block">Receives booking alerts when shop manager creates requests</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold">
                  <mat-icon class="!text-sm">local_shipping</mat-icon>
                  <span>Dispatch Driver (Transport) *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="dispatcher"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 555 0192"
                />
                <span class="text-[10px] text-slate-400 block">Receives truck cargo manifests & customer site route coordinates</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <mat-icon class="!text-sm">handyman</mat-icon>
                  <span>Installer *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="installer"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 881 0293"
                />
                <span class="text-[10px] text-slate-400 block">Receives job assignments & customer smart lock fitting alerts</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold">
                  <mat-icon class="!text-sm">person_pin_circle</mat-icon>
                  <span>Client / Site Owner *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="client"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 883 9921"
                />
                <span class="text-[10px] text-slate-400 block">Receives booking receipt, live delivery approach & ETA links</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
                  <mat-icon class="!text-sm">account_balance_wallet</mat-icon>
                  <span>Accounts & Finance Officer</span>
                </div>
                <input 
                  type="text" 
                  formControlName="account_officer"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 100 0005"
                />
                <span class="text-[10px] text-slate-400 block">Receives counter deposit verifications & technician bonus release requests</span>
              </div>

            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit" 
                class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm">save</mat-icon>
                <span>Save Phone Directory</span>
              </button>
            </div>
          </form>
        </div>
      }

      <!-- TAB 3: SMS GATEWAY CONFIGURATION -->
      @if (activeTab() === 'gateway') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>SMS Gateway Credentials & Provider Settings</span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Connect Hubtel, Arkesel, or Twilio API keys to send real telco SMS messages to technicians and homeowners across Ghana.
            </p>
          </div>

          <form [formGroup]="gatewayForm" (ngSubmit)="saveGateway()" class="space-y-5 text-xs">
            <div class="space-y-1">
              <label class="block font-bold text-slate-700 dark:text-slate-300">Select Active SMS Gateway Provider *</label>
              <select 
                formControlName="provider"
                class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
              >
                <option value="simulator">Built-in Interactive Ghana Telco SMS Simulator (Recommended for Testing)</option>
                <option value="arkesel">Arkesel SMS Gateway (Ghana / Africa Telco Direct)</option>
                <option value="hubtel">Hubtel Programmable SMS Gateway (Ghana Direct)</option>
                <option value="twilio">Twilio Global Programmable SMS</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">Sender ID / Brand Name *</label>
                <input 
                  type="text" 
                  formControlName="senderId"
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  placeholder="DoorMaster"
                />
                <span class="text-[10px] text-slate-400">Max 11 alphanumeric characters approved by telcos</span>
              </div>

              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">API Key / Token</label>
                <input 
                  type="password" 
                  formControlName="apiKey"
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  placeholder="e.g. ark_live_994827163"
                />
              </div>
            </div>

            @if (gatewayForm.get('provider')?.value === 'hubtel') {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Hubtel Client ID</label>
                  <input 
                    type="text" 
                    formControlName="hubtelClientId"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="e.g. hbt_cli_88192"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Hubtel Client Secret</label>
                  <input 
                    type="password" 
                    formControlName="hubtelClientSecret"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            }

            @if (gatewayForm.get('provider')?.value === 'twilio') {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Twilio Account SID</label>
                  <input 
                    type="text" 
                    formControlName="twilioAccountSid"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Twilio Auth Token</label>
                  <input 
                    type="password" 
                    formControlName="twilioAuthToken"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            }

            <div class="flex items-center gap-2 pt-2">
              <input 
                id="simModeCheckPage"
                type="checkbox" 
                formControlName="simulationMode"
                class="rounded text-cyan-600 focus:ring-cyan-500"
              />
              <label for="simModeCheckPage" class="font-medium text-slate-700 dark:text-slate-300">
                Enable In-App Telco Simulator (records SMS telemetry in live audit inbox)
              </label>
            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button 
                type="button" 
                (click)="sendTestSms()"
                class="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="!text-sm text-amber-500">send</mat-icon>
                <span>Send Test SMS Ping</span>
              </button>

              <button 
                type="submit" 
                class="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm">save</mat-icon>
                <span>Save Gateway Settings</span>
              </button>
            </div>
          </form>
        </div>
      }

      <!-- TAB 4: LIVE SMS LOGS & DISPATCH INBOX -->
      @if (activeTab() === 'inbox') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>SMS Dispatch Telemetry & Live Inbox</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                  {{ store.smsLogs().length }} messages sent
                </span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every transaction, booking, installer assignment, and driver transit status triggers an audit-logged SMS.
              </p>
            </div>

            <button 
              type="button" 
              (click)="sendTestSms()"
              class="px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <mat-icon class="!text-sm text-cyan-600">send</mat-icon>
              <span>Test SMS Ping</span>
            </button>
          </div>

          @if (store.smsLogs().length === 0) {
            <div class="p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center text-slate-400">
              <mat-icon class="!text-4xl mb-2 text-slate-300 dark:text-slate-600">sms</mat-icon>
              <p class="font-bold text-sm">No SMS messages logged yet.</p>
              <p class="text-xs mt-1">Booking an installation or assigning a driver will log automated messages here.</p>
            </div>
          } @else {
            <div class="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              @for (sms of store.smsLogs(); track sms.id) {
                <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-xs">
                  <div class="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-emerald-600 dark:text-emerald-400 font-sans uppercase">
                        [{{ sms.senderId }}] &rarr; {{ sms.recipientName }} ({{ sms.recipientRole }})
                      </span>
                      <span class="text-slate-400">{{ sms.recipientPhone }}</span>
                    </div>
                    <span class="text-slate-400">{{ sms.timestamp | slice:0:19 }}</span>
                  </div>

                  <p class="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    {{ sms.messageText }}
                  </p>

                  <div class="flex items-center justify-between text-[11px] pt-1 text-slate-400 font-sans">
                    <span>Trigger Event: <strong class="text-slate-700 dark:text-slate-300 font-mono">{{ sms.triggerEvent }}</strong></span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                      <mat-icon class="!text-sm">done_all</mat-icon>
                      <span>Delivered</span>
                    </span>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- TAB 5: THEME & APPEARANCE -->
      @if (activeTab() === 'theme') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Theme & Interface Preferences</span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize display aesthetics, color modes, and backend data synchronization.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Light Mode Card -->
            <button
              type="button"
              (click)="setLightMode()"
              class="p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3"
              [class]="!themeStore.isDark() 
                ? 'border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'"
            >
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <mat-icon class="!text-xl">light_mode</mat-icon>
                </div>
                @if (!themeStore.isDark()) {
                  <span class="text-[10px] uppercase font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">Active</span>
                }
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Clean Light Theme</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">High-contrast daytime visibility for site technicians & dispatch desk.</p>
              </div>
            </button>

            <!-- Dark Mode Card -->
            <button
              type="button"
              (click)="setDarkMode()"
              class="p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3"
              [class]="themeStore.isDark() 
                ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20 shadow-sm' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'"
            >
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center">
                  <mat-icon class="!text-xl">dark_mode</mat-icon>
                </div>
                @if (themeStore.isDark()) {
                  <span class="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">Active</span>
                }
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Sleek Obsidian Dark Theme</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">OLED-optimized dark palette for late-night dispatch tracking.</p>
              </div>
            </button>
          </div>
        </div>
      }

    </div>
  `
})
export class Settings {
  readonly store = inject(InstallationStore);
  readonly themeStore = inject(ThemeStore);
  readonly alert = inject(AlertService);

  readonly activeTab = signal<SettingsTab>('shop');
  readonly isSavingShopLocation = signal<boolean>(false);
  readonly feedbackMessage = signal<string | null>(null);

  // Shop Location Form
  readonly shopLocationForm = new FormGroup({
    shopName: new FormControl<string>(this.store.shopLocation().shopName, { nonNullable: true, validators: [Validators.required] }),
    branchCode: new FormControl<string>(this.store.shopLocation().branchCode, { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl<string>(this.store.shopLocation().address, { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl<string>(this.store.shopLocation().city, { nonNullable: true, validators: [Validators.required] }),
    region: new FormControl<string>(this.store.shopLocation().region, { nonNullable: true }),
    phone: new FormControl<string>(this.store.shopLocation().phone, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>(this.store.shopLocation().email, { nonNullable: true }),
    managerName: new FormControl<string>(this.store.shopLocation().managerName, { nonNullable: true }),
    dispatchRadiusKm: new FormControl<number>(this.store.shopLocation().dispatchRadiusKm, { nonNullable: true, validators: [Validators.min(1), Validators.max(200)] }),
    operatingHours: new FormControl<string>(this.store.shopLocation().operatingHours, { nonNullable: true }),
    latitude: new FormControl<number>(this.store.shopLocation().latitude, { nonNullable: true, validators: [Validators.required] }),
    longitude: new FormControl<number>(this.store.shopLocation().longitude, { nonNullable: true, validators: [Validators.required] })
  });

  // Phones Form
  readonly phonesForm = new FormGroup({
    manager: new FormControl<string>(this.store.userPhones().manager, { nonNullable: true, validators: [Validators.required] }),
    shop_manager: new FormControl<string>(this.store.userPhones().shop_manager, { nonNullable: true, validators: [Validators.required] }),
    dispatcher: new FormControl<string>(this.store.userPhones().dispatcher, { nonNullable: true, validators: [Validators.required] }),
    installer: new FormControl<string>(this.store.userPhones().installer, { nonNullable: true, validators: [Validators.required] }),
    client: new FormControl<string>(this.store.userPhones().client, { nonNullable: true, validators: [Validators.required] }),
    account_officer: new FormControl<string>(this.store.userPhones().account_officer, { nonNullable: true })
  });

  // SMS Gateway Form
  readonly gatewayForm = new FormGroup({
    provider: new FormControl<SmsProviderType>(this.store.smsGatewayConfig().provider, { nonNullable: true }),
    senderId: new FormControl<string>(this.store.smsGatewayConfig().senderId, { nonNullable: true, validators: [Validators.required] }),
    apiKey: new FormControl<string>(this.store.smsGatewayConfig().apiKey || '', { nonNullable: true }),
    hubtelClientId: new FormControl<string>(this.store.smsGatewayConfig().hubtelClientId || '', { nonNullable: true }),
    hubtelClientSecret: new FormControl<string>(this.store.smsGatewayConfig().hubtelClientSecret || '', { nonNullable: true }),
    twilioAccountSid: new FormControl<string>(this.store.smsGatewayConfig().twilioAccountSid || '', { nonNullable: true }),
    twilioAuthToken: new FormControl<string>(this.store.smsGatewayConfig().twilioAuthToken || '', { nonNullable: true }),
    simulationMode: new FormControl<boolean>(this.store.smsGatewayConfig().simulationMode, { nonNullable: true })
  });

  selectBranchPreset(b: any) {
    this.shopLocationForm.patchValue({
      shopName: b.shopName,
      branchCode: b.branchCode,
      address: b.landmark || b.address,
      city: b.city,
      region: b.region,
      phone: b.phone,
      email: b.email,
      managerName: b.managerName,
      dispatchRadiusKm: b.dispatchRadiusKm,
      operatingHours: b.operatingHours,
      latitude: b.latitude,
      longitude: b.longitude
    });
    this.store.setActiveBranch(b);
    this.alert.toastInfo('Branch Loaded', `Loaded configuration for ${b.shopName}`);
  }

  setCoordinates(lat: number, lng: number, addressPreset?: string) {
    this.shopLocationForm.patchValue({
      latitude: lat,
      longitude: lng
    });
    if (addressPreset) {
      this.shopLocationForm.patchValue({ address: addressPreset });
    }
  }

  detectBrowserGps() {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.shopLocationForm.patchValue({
            latitude: Number(pos.coords.latitude.toFixed(5)),
            longitude: Number(pos.coords.longitude.toFixed(5))
          });
          const msg = `Device GPS detected: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
          this.feedbackMessage.set(msg);
          this.alert.toastInfo('GPS Detected', msg);
        },
        (err) => {
          console.warn('Geolocation failed:', err);
          this.alert.toastWarning('GPS Unavailable', 'Could not detect device geolocation.');
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  }

  async saveShopLocation() {
    if (!this.shopLocationForm.valid) {
      this.alert.toastWarning('Incomplete Fields', 'Please fill in all required workshop location fields.');
      return;
    }
    this.isSavingShopLocation.set(true);
    this.feedbackMessage.set(null);

    const val = this.shopLocationForm.getRawValue();
    try {
      const result = await this.store.updateShopLocation({
        shopName: val.shopName,
        branchCode: val.branchCode,
        address: val.address,
        city: val.city,
        region: val.region,
        phone: val.phone,
        email: val.email,
        managerName: val.managerName,
        dispatchRadiusKm: Number(val.dispatchRadiusKm),
        operatingHours: val.operatingHours,
        latitude: Number(val.latitude),
        longitude: Number(val.longitude)
      });

      this.isSavingShopLocation.set(false);
      if (result.success) {
        this.feedbackMessage.set(result.message || 'Workshop branch location settings saved to MySQL database.');
        this.alert.success('Your work has been saved', 'Workshop branch location and GPS telemetry saved to MySQL database.');
      } else {
        this.alert.error('Save Failed', result.message || 'Could not update workshop location.');
      }
    } catch (err: any) {
      this.isSavingShopLocation.set(false);
      this.alert.networkError('Network Error', 'Could not reach server. Settings saved to local cache.');
    }
  }

  savePhones() {
    if (!this.phonesForm.valid) {
      this.alert.toastWarning('Incomplete Directory', 'Please specify all required role mobile numbers.');
      return;
    }
    this.store.updateUserPhones(this.phonesForm.getRawValue());
    this.feedbackMessage.set('User mobile phone directory saved successfully.');
    this.alert.toastSuccess('Your work has been saved', 'Automated SMS recipient routing numbers saved.');
  }

  saveGateway() {
    if (!this.gatewayForm.valid) {
      this.alert.toastWarning('Incomplete Gateway Config', 'Please provide a valid Sender ID.');
      return;
    }
    const val = this.gatewayForm.getRawValue();
    this.store.updateSmsGatewayConfig({
      provider: val.provider,
      senderId: val.senderId,
      apiKey: val.apiKey,
      hubtelClientId: val.hubtelClientId,
      hubtelClientSecret: val.hubtelClientSecret,
      twilioAccountSid: val.twilioAccountSid,
      twilioAuthToken: val.twilioAuthToken,
      simulationMode: val.simulationMode
    });
    this.feedbackMessage.set(`SMS Gateway configured for provider "${val.provider.toUpperCase()}".`);
    this.alert.success('Your work has been saved', `Gateway set to provider ${val.provider.toUpperCase()} with Sender ID "${val.senderId}".`);
  }

  sendTestSms() {
    const role = this.store.currentRole();
    const phones = this.store.userPhones();
    const phone = (phones as unknown as Record<string, string>)[role] || phones.manager;
    this.store.sendTestSmsPing(phone, `DoorMaster Automated SMS Gateway: Verification test ping for ${role} successful. 200 OK.`);
    this.feedbackMessage.set(`Test SMS ping dispatched to ${phone}. Check the Live SMS Logs tab.`);
    this.alert.toastSuccess('Test SMS Dispatched', `Verification test SMS dispatched to ${phone}. Check Live SMS Logs tab.`);
  }

  setLightMode() {
    if (this.themeStore.isDark()) {
      this.themeStore.toggleTheme();
    }
  }

  setDarkMode() {
    if (!this.themeStore.isDark()) {
      this.themeStore.toggleTheme();
    }
  }
}
