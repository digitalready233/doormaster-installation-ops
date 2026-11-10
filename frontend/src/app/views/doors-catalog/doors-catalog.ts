import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DoorCatalogEntry, DoorCategory, DoorStockStatus } from '../../models/installation.model';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';

interface ImagePreset {
  label: string;
  url: string;
  category: DoorCategory;
}

@Component({
  selector: 'app-doors-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    DecimalPipe
  ],
  template: `
    <div class="space-y-6">
      <!-- 1. Header Banner & DoorMaster Scraping Synchronization Bar -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <mat-icon class="!text-sm">meeting_room</mat-icon>
              <span>MASTER CATALOG & INVENTORY</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Source: doormaster.online</span>
            </span>
          </div>
          <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Door Catalog & Specifications
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Live catalog synchronized with <strong>https://doormaster.online/shop/</strong> featuring genuine DoorMaster product lines (Premium Villa, Royal Series, Smart Lock Doors, Turkey Interior Series, Reeded Glass, and Antifade Exterior Doors).
          </p>
        </div>

        <!-- Header Actions: Live Scraper & Manual Add (Restricted to Operations Manager & Admin) -->
        @if (store.currentRole() === 'manager' || store.currentRole() === 'admin') {
          <div class="flex flex-wrap items-center gap-2.5 shrink-0">
            <!-- Deep Scrape All 28 Pages -->
            <button
              type="button"
              (click)="triggerScrapeAll28Pages()"
              [disabled]="store.isScraping()"
              class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              title="Scrape all 28 pages from https://doormaster.online/shop/page/1/ to page/28/ directly into catalog database"
            >
              <mat-icon class="!text-lg" [class.animate-spin]="store.isScraping()">
                {{ store.isScraping() ? 'sync' : 'cloud_download' }}
              </mat-icon>
              <span class="text-xs tracking-tight font-extrabold">
                {{ store.isScraping() ? 'Scraping Pages 1-28...' : 'Scrape All 28 Pages' }}
              </span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
                329 Doors
              </span>
            </button>

            <button
              type="button"
              (click)="triggerLiveScrape()"
              [disabled]="store.isScraping()"
              class="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              title="Scrape and update door data, categories, and images live from https://doormaster.online/shop/"
            >
              <mat-icon class="!text-lg" [class.animate-spin]="store.isScraping()">
                {{ store.isScraping() ? 'refresh' : 'sync' }}
              </mat-icon>
              <span class="text-xs tracking-tight">
                {{ store.isScraping() ? 'Syncing...' : 'Quick Sync' }}
              </span>
            </button>

            <button
              type="button"
              (click)="openAddModal()"
              class="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <mat-icon class="!text-lg">add_circle</mat-icon>
              <span class="text-xs tracking-tight">Add Door</span>
            </button>
          </div>
        }
      </div>

      <!-- 2. Inventory Metrics KPI Ribbon -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <!-- Total Models -->

        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold">Catalog Models</span>
            <mat-icon class="!text-base text-slate-400">inventory_2</mat-icon>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {{ store.doorStats().totalModels }}
          </div>
          <span class="text-[10px] text-slate-400">DoorMaster registered profiles</span>
        </div>

        <!-- In Stock -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">In Stock</span>
            <mat-icon class="!text-base text-emerald-500">check_circle</mat-icon>
          </div>
          <div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {{ store.doorStats().inStockCount }}
          </div>
          <span class="text-[10px] text-slate-400">Ready for immediate dispatch</span>
        </div>

        <!-- Low Stock -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">Low Stock</span>
            <mat-icon class="!text-base text-amber-500">warning</mat-icon>
          </div>
          <div class="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {{ store.doorStats().lowStockCount }}
          </div>
          <span class="text-[10px] text-slate-400">Under 3 units remaining</span>
        </div>

        <!-- Made to Order -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">Bespoke / Build</span>
            <mat-icon class="!text-base text-indigo-500">handyman</mat-icon>
          </div>
          <div class="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {{ store.doorStats().madeToOrderCount }}
          </div>
          <span class="text-[10px] text-slate-400">Fabricated on commission</span>
        </div>

        <!-- Inventory Value -->
        <div class="col-span-2 lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">Stock Value</span>
            <mat-icon class="!text-base text-emerald-500">payments</mat-icon>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ₵{{ formattedTotalValue() }}
          </div>
          <span class="text-[10px] text-slate-400">{{ store.doorStats().totalUnits }} physical units in warehouse</span>
        </div>
      </div>

      <!-- 3. Filter Controls Toolbar & Category Quick-Pills -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3.5">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <!-- Text Search Filter -->
          <div class="md:col-span-4 relative">
            <mat-icon class="!text-base absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">search</mat-icon>
            <input
              type="text"
              [value]="searchQuery()"
              (input)="onSearchChange($event)"
              placeholder="Search door model, code, series or specs..."
              class="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
            @if (searchQuery()) {
              <button
                type="button"
                (click)="searchQuery.set('')"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                title="Clear search"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            }
          </div>

          <!-- Dynamic Category Selector from Scraped Categories -->
          <div class="md:col-span-3">
            <select
              [value]="selectedCategory()"
              (change)="onCategoryChange($event)"
              class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer font-medium"
            >
              <option value="all">All Door Categories ({{ store.doors().length }})</option>
              @for (cat of store.availableCategories(); track cat.name) {
                <option [value]="cat.name">{{ cat.name }} ({{ cat.count }})</option>
              }
            </select>
          </div>

          <!-- Stock Status Selector -->
          <div class="md:col-span-2">
            <select
              [value]="selectedStatus()"
              (change)="onStatusChange($event)"
              class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock (≤ 2)</option>
              <option value="made_to_order">Made to Order</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          <!-- Fire Rating Filter -->
          <div class="md:col-span-3 flex items-center gap-2">
            <select
              [value]="selectedFireRating()"
              (change)="onFireRatingChange($event)"
              class="flex-1 py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Fire Ratings</option>
              <option value="rated">Any Fire Certified (FD30 / FD60)</option>
              <option value="fd60">FD60 Commercial</option>
              <option value="fd30">FD30 Rated</option>
              <option value="standard">Standard Non-Fire</option>
            </select>

            <!-- Reset Filters Button -->
            @if (hasActiveFilters()) {
              <button
                type="button"
                (click)="resetFilters()"
                class="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <mat-icon class="!text-sm">restart_alt</mat-icon>
                <span class="hidden sm:inline">Reset</span>
              </button>
            }
          </div>
        </div>

        <!-- Quick DoorMaster Category Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs border-t border-slate-100 dark:border-slate-800/60">
          <span class="text-[10px] font-mono uppercase text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <mat-icon class="!text-xs">label</mat-icon>
            <span>Series:</span>
          </span>
          <button
            type="button"
            (click)="selectedCategory.set('all')"
            class="px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-colors cursor-pointer border"
            [class]="selectedCategory() === 'all' ? 'bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950 border-transparent font-bold' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
          >
            All ({{ store.doors().length }})
          </button>
          @for (cat of store.availableCategories(); track cat.name) {
            <button
              type="button"
              (click)="selectedCategory.set(cat.name)"
              class="px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-colors cursor-pointer border flex items-center gap-1"
              [class]="selectedCategory() === cat.name ? 'bg-emerald-600 text-white border-transparent font-bold shadow-xs' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
            >
              <mat-icon class="!text-xs">{{ getCategoryIcon(cat.name) }}</mat-icon>
              <span>{{ cat.name }} ({{ cat.count }})</span>
            </button>
          }
        </div>

        <!-- Sub-filter bar: Sort Order & Count Feedback -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div class="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong class="text-slate-900 dark:text-white">{{ filteredDoors().length }}</strong> of {{ store.doors().length }} DoorMaster catalog profiles
            @if (hasActiveFilters()) {
              <span class="ml-1 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">(filtered)</span>
            }
          </div>

          <!-- Sort Selector -->
          <div class="flex items-center gap-2">
            <span class="text-slate-400 text-[11px] font-mono uppercase">Sort By:</span>
            <select
              [value]="sortBy()"
              (change)="onSortChange($event)"
              class="py-1 px-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none cursor-pointer font-medium"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="stock_desc">Highest Stock Available</option>
              <option value="name_asc">Model Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 4. Doors Table View -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        @if (filteredDoors().length === 0) {
          <!-- Empty State -->
          <div class="py-16 px-6 text-center">
            <div class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <mat-icon class="!text-2xl">search_off</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1">No doors match your filter</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search query, selecting a different DoorMaster series, or syncing live from the shop.
            </p>
            <div class="flex items-center justify-center gap-3">
              <button
                type="button"
                (click)="resetFilters()"
                class="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
              <button
                type="button"
                (click)="triggerLiveScrape()"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Sync with doormaster.online
              </button>
            </div>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  <th class="py-3.5 pl-6 pr-4">Door Model & Preview</th>
                  <th class="py-3.5 px-4">Series / Category</th>
                  <th class="py-3.5 px-4">Dimensions & Material</th>
                  <th class="py-3.5 px-4">Hardware & Ratings</th>
                  <th class="py-3.5 px-4">Price (₵)</th>
                  <th class="py-3.5 px-4">Stock Level</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 pr-6 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                @for (door of filteredDoors(); track door.id) {
                  <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group">
                    <!-- Door Model & Preview -->
                    <td class="py-3.5 pl-6 pr-4">
                      <div class="flex items-center gap-3.5">
                        <div class="w-12 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-2xs">
                          @if (door.imageUrl) {
                            <img
                              [src]="door.imageUrl"
                              [alt]="door.name"
                              referrerpolicy="no-referrer"
                              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          } @else {
                            <mat-icon class="!text-xl text-slate-400">door_front</mat-icon>
                          }
                        </div>
                        <div>
                          <div class="font-bold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {{ door.name }}
                          </div>
                          <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                              {{ door.modelCode }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-mono">{{ door.id }}</span>
                            @if (door.sourceUrl) {
                              <a
                                [href]="door.sourceUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
                                title="Open on doormaster.online"
                              >
                                <mat-icon class="!text-xs">open_in_new</mat-icon>
                              </a>
                            }
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Category Badge -->
                    <td class="py-3.5 px-4">
                      <span
                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border"
                        [class]="getCategoryBadgeClass(door.category)"
                      >
                        <mat-icon class="!text-xs">{{ getCategoryIcon(door.category) }}</mat-icon>
                        <span>{{ door.category }}</span>
                      </span>
                    </td>

                    <!-- Dimensions & Material -->
                    <td class="py-3.5 px-4 max-w-[200px]">
                      <div class="font-mono text-[11px] font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                        <mat-icon class="!text-xs text-slate-400">straighten</mat-icon>
                        <span>{{ door.dimensions }}</span>
                      </div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5" [title]="door.material">
                        {{ door.material }}
                      </div>
                      <div class="text-[10px] text-slate-400 truncate" [title]="door.finish">
                        Finish: {{ door.finish }}
                      </div>
                    </td>

                    <!-- Hardware & Ratings -->
                    <td class="py-3.5 px-4 max-w-[220px]">
                      <div class="text-[11px] text-slate-700 dark:text-slate-300 font-medium truncate" [title]="door.hardwareSpecs">
                        {{ door.hardwareSpecs }}
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 mt-1">
                        @if (door.fireRating && door.fireRating !== 'None' && door.fireRating !== 'None / Standard' && door.fireRating !== 'None / Residential') {
                          <span class="px-1.5 py-0.5 rounded bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20 text-[9px] font-mono font-bold flex items-center gap-0.5">
                            <mat-icon class="!text-[10px]">local_fire_department</mat-icon>
                            <span>{{ door.fireRating }}</span>
                          </span>
                        }
                        @if (door.acousticRating && door.acousticRating !== 'Standard') {
                          <span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 text-[9px] font-mono font-bold flex items-center gap-0.5">
                            <mat-icon class="!text-[10px]">volume_off</mat-icon>
                            <span>{{ door.acousticRating }}</span>
                          </span>
                        }
                      </div>
                    </td>

                    <!-- Unit Price -->
                    <td class="py-3.5 px-4">
                      <div class="text-sm font-black font-mono text-slate-900 dark:text-white">
                        {{ door.formattedPrice || ('₵' + (door.unitPrice | number:'1.0-0')) }}
                      </div>
                      <div class="text-[10px] text-slate-400">
                        Lead: {{ door.leadTimeDays }}d
                      </div>
                    </td>

                    <!-- Inventory Stock -->
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-1.5">
                        <span class="font-mono font-bold text-xs" [class]="door.stockQuantity <= 2 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'">
                          {{ door.stockQuantity }} units
                        </span>
                      </div>
                      <!-- Visual Stock Bar -->
                      <div class="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div
                          class="h-full rounded-full transition-all"
                          [class]="door.stockQuantity === 0 ? 'bg-slate-300 dark:bg-slate-700 w-0' : (door.stockQuantity <= 2 ? 'bg-amber-500 w-1/3' : 'bg-emerald-500 w-full')"
                        ></div>
                      </div>
                    </td>

                    <!-- Status -->
                    <td class="py-3.5 px-4">
                      <span
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                        [class]="getStatusBadgeClass(door.status)"
                      >
                        <span class="w-1.5 h-1.5 rounded-full" [class]="getStatusDotClass(door.status)"></span>
                        <span>{{ formatStatusName(door.status) }}</span>
                      </span>
                    </td>

                    <!-- Actions -->
                    <td class="py-3.5 pr-6 pl-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          (click)="openDetailModal(door)"
                          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Technical Specifications"
                        >
                          <mat-icon class="!text-base">visibility</mat-icon>
                        </button>

                        @if (store.currentRole() === 'manager' || store.currentRole() === 'admin') {
                          <button
                            type="button"
                            (click)="confirmDelete(door)"
                            class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-600 hover:border-red-200 dark:hover:text-red-400 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                            title="Remove Door from Catalog"
                          >
                            <mat-icon class="!text-base">delete_outline</mat-icon>
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- 5. Toast Notification -->
      @if (toastMessage()) {
        <div class="fixed bottom-6 right-6 z-50 bg-slate-950 text-white dark:bg-white dark:text-slate-950 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <mat-icon class="!text-base text-emerald-400 dark:text-emerald-600">check_circle</mat-icon>
          <span>{{ toastMessage() }}</span>
        </div>
      }

      <!-- 6. ADD DOOR MODAL -->
      @if (showAddModal()) {
        <div
          class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          (keydown.escape)="closeAddModal()"
        >
          <div
            class="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <!-- Modal Header -->
            <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <mat-icon class="!text-xl">meeting_room</mat-icon>
                </div>
                <div>
                  <h2 class="text-base font-bold text-slate-900 dark:text-white">
                    Add New Door to Catalog
                  </h2>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    Register full technical specifications, hardware requirements, ratings, and inventory status.
                  </p>
                </div>
              </div>

              <button
                type="button"
                (click)="closeAddModal()"
                class="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>
            </div>

            <!-- Modal Reactive Form -->
            <form [formGroup]="addDoorForm" (ngSubmit)="submitNewDoor()" class="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <!-- General Info Section -->
              <div class="space-y-3">
                <h3 class="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-emerald-500">info</mat-icon>
                  <span>1. General Identification</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Door Name -->
                  <div>
                    <label for="door-name" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Door Name / Model Title <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-name"
                      type="text"
                      formControlName="name"
                      placeholder="e.g. Turkey Interior DM002 Luxury Series"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('name') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Model Code -->
                  <div>
                    <label for="door-code" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Model / SKU Code <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-code"
                      type="text"
                      formControlName="modelCode"
                      placeholder="e.g. DM-002"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('modelCode') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Category -->
                  <div>
                    <label for="door-category" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      DoorMaster Series / Category <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="door-category"
                      formControlName="category"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="Premium Villa Series">Premium Villa Series</option>
                      <option value="Royal Series">Royal Series</option>
                      <option value="Smart Lock Doors">Smart Lock Doors</option>
                      <option value="Mechanical Lock Doors">Mechanical Lock Doors</option>
                      <option value="Turkey interior series">Turkey Interior Series</option>
                      <option value="DM Interior Series">DM Interior Series</option>
                      <option value="Economy doors">Economy Doors</option>
                      <option value="Antifade doors">Antifade Exterior Doors</option>
                      <option value="Reeded glass doors">Reeded Glass Doors</option>
                      <option value="entrance_pivot">Architectural Entrance Pivot</option>
                      <option value="solid_wood_entrance">Solid Hardwood Entrance</option>
                      <option value="acoustic_french">Acoustic French Doors</option>
                      <option value="sliding_pocket">Pocket Sliding System</option>
                      <option value="bi_fold_patio">Bi-Fold Panoramic Patio</option>
                      <option value="fire_rated_commercial">Fire-Rated Commercial (FD60)</option>
                    </select>
                  </div>

                  <!-- Dimensions -->
                  <div>
                    <label for="door-dims" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Dimensions (H × W × D mm) <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-dims"
                      type="text"
                      formControlName="dimensions"
                      placeholder="e.g. 2100 × 900 × 50mm"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('dimensions') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>
                </div>
              </div>

              <!-- Materials & Hardware Section -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-indigo-500">construction</mat-icon>
                  <span>2. Materials & Hardware Specifications</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Core Material -->
                  <div>
                    <label for="door-material" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Core Substrate / Materials <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-material"
                      type="text"
                      formControlName="material"
                      placeholder="e.g. Cast Architectural Aluminum & Insulated Honeycomb Core"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('material') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Surface Finish -->
                  <div>
                    <label for="door-finish" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Surface Finish & Treatment <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-finish"
                      type="text"
                      formControlName="finish"
                      placeholder="e.g. Thermoset Baked Enamel & Woodgrain UV Protection"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('finish') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>
                </div>

                <!-- Hardware Specifications -->
                <div>
                  <label for="door-hardware" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Integrated Hardware Pack <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="door-hardware"
                    type="text"
                    formControlName="hardwareSpecs"
                    placeholder="e.g. Multi-Point Mortise Lock, Concealed 3D Ball-Bearing Hinges"
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                    [class]="isFieldInvalid('hardwareSpecs') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Fire Rating -->
                  <div>
                    <label for="door-fire" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Fire Rating Certification
                    </label>
                    <select
                      id="door-fire"
                      formControlName="fireRating"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="None / Residential">None / Residential Standard</option>
                      <option value="FD30 Rated">FD30 (30-Minute Resistance)</option>
                      <option value="FD60 Certified">FD60 (60-Minute Heavy Fire & Smoke)</option>
                    </select>
                  </div>

                  <!-- Acoustic Rating -->
                  <div>
                    <label for="door-acoustic" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Acoustic Sound Insulation
                    </label>
                    <select
                      id="door-acoustic"
                      formControlName="acousticRating"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="Standard">Standard (28-32 dB)</option>
                      <option value="35 dB Acoustic Core">35 dB Acoustic Core</option>
                      <option value="38 dB Tested">38 dB Sound Insulation</option>
                      <option value="42 dB Heavy Core">42 dB Heavy Core</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Pricing & Inventory Section -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-amber-500">monetization_on</mat-icon>
                  <span>3. Pricing & Inventory Parameters</span>
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  <!-- Unit Price -->
                  <div>
                    <label for="door-price" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Unit Price (₵ GHS) <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-price"
                      type="number"
                      formControlName="unitPrice"
                      min="0"
                      placeholder="4750"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('unitPrice') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Stock Quantity -->
                  <div>
                    <label for="door-stock" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Stock Qty (Units) <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-stock"
                      type="number"
                      formControlName="stockQuantity"
                      min="0"
                      placeholder="5"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('stockQuantity') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Lead Time -->
                  <div>
                    <label for="door-leadTime" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lead Time (Days)
                    </label>
                    <input
                      id="door-leadTime"
                      type="number"
                      formControlName="leadTimeDays"
                      min="1"
                      placeholder="3"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>

                  <!-- Status -->
                  <div>
                    <label for="door-status" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Stock Status <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="door-status"
                      formControlName="status"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="made_to_order">Made to Order</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>
                </div>

                <!-- Image URL Input & Presets -->
                <div>
                  <label for="door-img" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Image URL
                  </label>
                  <input
                    id="door-img"
                    type="url"
                    formControlName="imageUrl"
                    placeholder="https://doormaster.online/wp-content/uploads/..."
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-mono"
                  />
                  <!-- Presets -->
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[10px] text-slate-400 font-mono">Sample door imagery:</span>
                    @for (preset of imagePresets; track preset.label) {
                      <button
                        type="button"
                        (click)="pickPresetImage(preset.url)"
                        class="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {{ preset.label }}
                      </button>
                    }
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label for="door-desc" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Technical Summary & Installation Notes
                  </label>
                  <textarea
                    id="door-desc"
                    formControlName="description"
                    rows="3"
                    placeholder="Engineering description, floor spring requirements, reveal tolerances, and structural notes..."
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Modal Footer Actions -->
              <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  (click)="closeAddModal()"
                  class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  [disabled]="isSubmitting()"
                  class="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <mat-icon class="!text-base">add</mat-icon>
                  <span>Register Door Model</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- 7. TECHNICAL SPECIFICATION QUICK VIEW MODAL -->
      @if (inspectingDoor()) {
        @let d = inspectingDoor()!;
        <div
          class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          (keydown.escape)="inspectingDoor.set(null)"
        >
          <div
            class="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <!-- Hero Image Banner -->
            <div class="relative h-64 w-full bg-slate-950">
              @if (d.imageUrl) {
                <img [src]="d.imageUrl" [alt]="d.name" referrerpolicy="no-referrer" class="w-full h-full object-contain bg-slate-900" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              }
              <button
                type="button"
                (click)="inspectingDoor.set(null)"
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>

              <div class="absolute bottom-4 left-6 right-6">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-slate-950">
                    {{ d.modelCode }}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white backdrop-blur-xs">
                    {{ d.category }}
                  </span>
                </div>
                <h3 class="text-xl font-black text-white tracking-tight leading-snug">
                  {{ d.name }}
                </h3>
              </div>
            </div>

            <!-- Spec Grid Content -->
            <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Unit Price</span>
                  <span class="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {{ d.formattedPrice || ('₵' + (d.unitPrice | number:'1.0-0')) }}
                  </span>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Stock Level</span>
                  <span class="text-base font-black font-mono text-slate-900 dark:text-white">{{ d.stockQuantity }} units</span>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Lead Time</span>
                  <span class="text-base font-black font-mono text-slate-900 dark:text-white">{{ d.leadTimeDays }} days</span>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Warranty</span>
                  <span class="text-base font-black font-mono text-slate-900 dark:text-white">{{ d.warrantyYears }} years</span>
                </div>
              </div>

              <!-- Technical Details Rows -->
              <div class="space-y-2.5">
                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Series / Category</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ d.category }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Dimensions</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">{{ d.dimensions }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Substrate / Core</span>
                  <span class="text-slate-900 dark:text-white text-right max-w-xs">{{ d.material }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Finish & Tint</span>
                  <span class="text-slate-900 dark:text-white text-right max-w-xs">{{ d.finish }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Hardware Pack</span>
                  <span class="text-slate-900 dark:text-white text-right max-w-xs">{{ d.hardwareSpecs }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Fire Certification</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ d.fireRating }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Acoustic Attenuation</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ d.acousticRating }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Supplier & Source</span>
                  <span class="text-slate-900 dark:text-white">{{ d.supplierOrWorkshop }}</span>
                </div>

                @if (d.sourceUrl) {
                  <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span class="text-slate-500 dark:text-slate-400 font-medium">Live Website Product</span>
                    <a
                      [href]="d.sourceUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View on doormaster.online</span>
                      <mat-icon class="!text-xs">open_in_new</mat-icon>
                    </a>
                  </div>
                }
              </div>

              <!-- Description -->
              <div class="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span class="text-[10px] font-mono uppercase text-slate-400 block mb-1">Architectural Overview</span>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ d.description }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400 font-mono">ID: {{ d.id }}</span>
              <button
                type="button"
                (click)="inspectingDoor.set(null)"
                class="px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class DoorsCatalog {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);

  // Filter States
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  readonly selectedStatus = signal<string>('all');
  readonly selectedFireRating = signal<string>('all');
  readonly sortBy = signal<'newest' | 'price_desc' | 'price_asc' | 'stock_desc' | 'name_asc'>('newest');

  // Modal Dialogs
  readonly showAddModal = signal<boolean>(false);
  readonly inspectingDoor = signal<DoorCatalogEntry | null>(null);
  readonly isSubmitting = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  // Preset architectural door images for quick picking
  readonly imagePresets: ImagePreset[] = [
    { label: 'Turkey Interior', url: 'https://doormaster.online/wp-content/uploads/2014/08/l7-500x600.png', category: 'Turkey interior series' },
    { label: 'Antifade Exterior', url: 'https://doormaster.online/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-02-at-7.29.23-AM-500x600.jpeg', category: 'Antifade doors' },
    { label: 'Premium Villa', url: 'https://doormaster.online/wp-content/uploads/2026/07/P.V-1-500x600.png', category: 'Premium Villa Series' },
    { label: 'Smart Lock Door', url: 'https://doormaster.online/wp-content/uploads/2026/09/ChatGPT-Image-Sep-28-2026-05_57_36-PM-500x600.png', category: 'Smart Lock Doors' },
    { label: 'Reeded Glass', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', category: 'Reeded glass doors' }
  ];

  // Reactive Form for Door Entry
  readonly addDoorForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    modelCode: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl<string>('Premium Villa Series', { nonNullable: true, validators: [Validators.required] }),
    dimensions: new FormControl<string>('2100 × 900 × 50mm', { nonNullable: true, validators: [Validators.required] }),
    material: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    finish: new FormControl<string>('Multi-Layer Thermoset Enamel', { nonNullable: true, validators: [Validators.required] }),
    hardwareSpecs: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    fireRating: new FormControl<string>('None / Residential', { nonNullable: true }),
    acousticRating: new FormControl<string>('Standard', { nonNullable: true }),
    unitPrice: new FormControl<number>(4750, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    stockQuantity: new FormControl<number>(5, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    leadTimeDays: new FormControl<number>(3, { nonNullable: true, validators: [Validators.min(1)] }),
    status: new FormControl<DoorStockStatus>('in_stock', { nonNullable: true, validators: [Validators.required] }),
    supplierOrWorkshop: new FormControl<string>('Door Master Official (doormaster.online)', { nonNullable: true }),
    imageUrl: new FormControl<string>('https://doormaster.online/wp-content/uploads/2014/08/l7-500x600.png', { nonNullable: true }),
    warrantyYears: new FormControl<number>(10, { nonNullable: true, validators: [Validators.min(1)] }),
    description: new FormControl<string>('', { nonNullable: true })
  });

  // Filtered & Sorted Doors computation
  readonly filteredDoors = computed<DoorCatalogEntry[]>(() => {
    let list = this.store.doors();
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    const status = this.selectedStatus();
    const fire = this.selectedFireRating();

    // 1. Text Search Query
    if (query) {
      list = list.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.modelCode.toLowerCase().includes(query) ||
        d.id.toLowerCase().includes(query) ||
        (d.category && d.category.toLowerCase().includes(query)) ||
        d.material.toLowerCase().includes(query) ||
        d.hardwareSpecs.toLowerCase().includes(query) ||
        d.supplierOrWorkshop.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (category !== 'all') {
      list = list.filter(d => d.category === category);
    }

    // 3. Status Filter
    if (status !== 'all') {
      list = list.filter(d => d.status === status);
    }

    // 4. Fire Rating Filter
    if (fire === 'rated') {
      list = list.filter(d => d.fireRating.includes('FD') || d.fireRating.toLowerCase().includes('fire') || d.fireRating.toLowerCase().includes('minute'));
    } else if (fire === 'fd60') {
      list = list.filter(d => d.fireRating.includes('FD60') || d.fireRating.includes('60-Minute'));
    } else if (fire === 'fd30') {
      list = list.filter(d => d.fireRating.includes('FD30') || d.fireRating.includes('30-Minute') || d.fireRating.includes('20-Minute'));
    } else if (fire === 'standard') {
      list = list.filter(d => !d.fireRating.includes('FD') && !d.fireRating.includes('Minute'));
    }

    // 5. Sorting
    const sort = this.sortBy();
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'price_desc':
          return (b.unitPrice || 0) - (a.unitPrice || 0);
        case 'price_asc':
          return (a.unitPrice || 0) - (b.unitPrice || 0);
        case 'stock_desc':
          return (b.stockQuantity || 0) - (a.stockQuantity || 0);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  });

  readonly hasActiveFilters = computed(() => {
    return (
      this.searchQuery().trim().length > 0 ||
      this.selectedCategory() !== 'all' ||
      this.selectedStatus() !== 'all' ||
      this.selectedFireRating() !== 'all' ||
      this.sortBy() !== 'newest'
    );
  });

  readonly formattedTotalValue = computed(() => {
    const val = this.store.doorStats().totalValue;
    return val.toLocaleString('en-US');
  });

  // Action: Live Scrape from doormaster.online
  async triggerLiveScrape() {
    this.alert.toastInfo('Scraping Live Catalog', 'Connecting to https://doormaster.online/shop/...');
    const result = await this.store.scrapeLiveDoorMasterOnline();
    if (result.success) {
      this.alert.success('Scrape Completed', `Synced ${result.count} doors, categories & assets retrieved from doormaster.online.`);
    } else {
      this.alert.error('Scrape Failed', result.message || 'Could not complete scrape operation.');
    }
  }

  // Action: Complete Deep Scrape of All 28 Pages to Database
  async triggerScrapeAll28Pages() {
    this.alert.toastInfo('Deep Scrape Started', 'Scraping all 28 pages from https://doormaster.online/shop/ into catalog database...');
    const result = await this.store.scrapeAllPagesFromBackend(1, 28);
    if (result.success) {
      this.alert.success('Deep Scrape Complete', `Scraped and saved ${result.count} doors & 20 categories into catalog database.`);
    } else {
      this.alert.error('Deep Scrape Failed', result.message || 'Could not complete deep scrape to database.');
    }
  }


  // Filter Handlers
  onSearchChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  onCategoryChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(val);
  }

  onStatusChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(val);
  }

  onFireRatingChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedFireRating.set(val);
  }

  onSortChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value as 'newest' | 'price_desc' | 'price_asc' | 'stock_desc' | 'name_asc';
    this.sortBy.set(val);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.selectedStatus.set('all');
    this.selectedFireRating.set('all');
    this.sortBy.set('newest');
  }

  // Modal Handlers
  openAddModal() {
    this.addDoorForm.reset({
      name: '',
      modelCode: '',
      category: 'Premium Villa Series',
      dimensions: '2100 × 900 × 50mm',
      material: '',
      finish: 'Multi-Layer Thermoset Enamel',
      hardwareSpecs: '',
      fireRating: 'None / Residential',
      acousticRating: 'Standard',
      unitPrice: 4750,
      stockQuantity: 5,
      leadTimeDays: 3,
      status: 'in_stock',
      supplierOrWorkshop: 'Door Master Official (doormaster.online)',
      imageUrl: 'https://doormaster.online/wp-content/uploads/2014/08/l7-500x600.png',
      warrantyYears: 10,
      description: ''
    });
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  openDetailModal(door: DoorCatalogEntry) {
    this.inspectingDoor.set(door);
  }

  pickPresetImage(url: string) {
    this.addDoorForm.patchValue({ imageUrl: url });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.addDoorForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async submitNewDoor() {
    if (this.addDoorForm.invalid) {
      this.addDoorForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Fields', 'Please fill in all required door specifications.');
      return;
    }

    this.isSubmitting.set(true);
    const formVals = this.addDoorForm.getRawValue();

    try {
      const created = this.store.addDoor({
        name: formVals.name.trim(),
        modelCode: formVals.modelCode.trim().toUpperCase(),
        category: formVals.category,
        dimensions: formVals.dimensions.trim(),
        material: formVals.material.trim(),
        finish: formVals.finish.trim(),
        hardwareSpecs: formVals.hardwareSpecs.trim(),
        fireRating: formVals.fireRating,
        acousticRating: formVals.acousticRating,
        unitPrice: Number(formVals.unitPrice),
        formattedPrice: `₵${Number(formVals.unitPrice).toLocaleString('en-US')}.00`,
        stockQuantity: Number(formVals.stockQuantity),
        leadTimeDays: Number(formVals.leadTimeDays) || 3,
        status: formVals.status,
        supplierOrWorkshop: formVals.supplierOrWorkshop.trim(),
        imageUrl: formVals.imageUrl.trim() || undefined,
        description: formVals.description.trim() || `${formVals.name} DoorMaster architectural door system.`,
        warrantyYears: Number(formVals.warrantyYears) || 10
      });

      await this.store.loadDoorsFromBackend();
      this.closeAddModal();
      this.alert.success('Door Added to Catalog', `Architectural door "${created.name}" (${created.modelCode}) registered successfully.`);
    } catch (err: any) {
      this.alert.error('Failed to Add Door', err.message || 'Could not register door to catalog.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async confirmDelete(door: DoorCatalogEntry) {
    const confirmed = await this.alert.confirm(
      'Delete Door Model?',
      `Are you sure you want to remove "${door.name}" (${door.modelCode}) from the catalog? This cannot be undone.`,
      'Delete Door',
      'Cancel',
      true
    );

    if (confirmed) {
      this.store.deleteDoor(door.id);
      await this.store.loadDoorsFromBackend();
    }
  }

  triggerToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4500);
  }

  // Formatting & Icon helpers for DoorMaster categories
  getCategoryIcon(category: string): string {
    const c = (category || '').toLowerCase();
    if (c.includes('villa')) return 'villa';
    if (c.includes('royal')) return 'workspace_premium';
    if (c.includes('smart') || c.includes('handle')) return 'fingerprint';
    if (c.includes('glass') || c.includes('reeded')) return 'grid_view';
    if (c.includes('interior')) return 'meeting_room';
    if (c.includes('fire')) return 'local_fire_department';
    if (c.includes('antifade') || c.includes('antirust')) return 'wb_sunny';
    if (c.includes('economy')) return 'savings';
    if (c.includes('pivot')) return 'meeting_room';
    if (c.includes('wood')) return 'forest';
    if (c.includes('sliding') || c.includes('pocket')) return 'door_sliding';
    if (c.includes('bi_fold') || c.includes('patio')) return 'view_carousel';
    return 'door_front';
  }

  getCategoryBadgeClass(category: string): string {
    const c = (category || '').toLowerCase();
    if (c.includes('villa')) {
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
    }
    if (c.includes('royal')) {
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
    }
    if (c.includes('smart') || c.includes('handle')) {
      return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20';
    }
    if (c.includes('interior')) {
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
    }
    if (c.includes('antifade') || c.includes('antirust')) {
      return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
    }
    if (c.includes('glass') || c.includes('reeded')) {
      return 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20';
    }
    if (c.includes('fire')) {
      return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
    }
    return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
  }

  formatStatusName(status: DoorStockStatus): string {
    switch (status) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'made_to_order': return 'Made to Order';
      case 'discontinued': return 'Discontinued';
      default: return status;
    }
  }

  getStatusBadgeClass(status: DoorStockStatus): string {
    switch (status) {
      case 'in_stock':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300';
      case 'low_stock':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300';
      case 'made_to_order':
        return 'bg-indigo-50 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300';
      case 'discontinued':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }

  getStatusDotClass(status: DoorStockStatus): string {
    switch (status) {
      case 'in_stock': return 'bg-emerald-500';
      case 'low_stock': return 'bg-amber-500';
      case 'made_to_order': return 'bg-indigo-500';
      case 'discontinued': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  }
}
