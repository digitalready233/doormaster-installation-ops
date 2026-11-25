import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AssignedInstallerTeamMember, DoorCategory, InstallationJob, JobDoorItem, ShopLocationSettings } from '../../models/installation.model';
import { ClientLocationMap, ClientLocationResult } from '../../components/client-location-map/client-location-map';
import { PhoneInputComponent } from '../../components/phone-input/phone-input';

export interface ShopDoorItem extends JobDoorItem {
  isExpanded: boolean;
}

export type ShopTimeFilter = 'day' | 'week' | 'month' | 'year' | 'custom' | 'all';
export type ShopSortField = 'id' | 'date' | 'door' | 'client' | 'amount' | 'status';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-shop-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, ClientLocationMap, PhoneInputComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <button 
          type="button"
          (click)="newJobOpened.emit()"
          class="sm:ml-auto px-4 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        >
          <mat-icon class="!text-sm !w-4 !h-4">calendar_month</mat-icon>
          <span>Book Installation & Record Payment</span>
        </button>
      </div>

      <!-- Workshop Inventory & Assembly Summary -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Booked at Shop</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ bookedAtShopCount() }}
            </span>
            <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">Awaiting Truck</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Forwarded to Operations Manager</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Counter Collections</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-extrabold font-mono text-cyan-700 dark:text-cyan-400 tracking-tight tabular-nums">
              GH₵{{ shopScopedCollections().toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Recorded at shop counter</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Dispatched On Road</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ dispatchedCount() }}
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">En Route</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Transit to installation sites</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Installed & Verified</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              {{ completedAtShopCount() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Archived in workshop ledger</p>
        </div>
      </div>

      <!-- Action Required: Shop Orders Awaiting Store Dispatcher (Shop Manager Portal Only) -->
      @if (store.canCurrentRoleSelectDispatcher() && jobsAwaitingDriver().length > 0) {
        <div class="bg-cyan-950/20 dark:bg-cyan-950/40 border border-cyan-400 dark:border-cyan-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></span>
              <h3 class="text-sm font-extrabold text-cyan-900 dark:text-cyan-200 uppercase tracking-wider">
                Action Required: Shop Orders Awaiting Store Driver ({{ jobsAwaitingDriver().length }})
              </h3>
            </div>
            <span class="text-xs text-cyan-800 dark:text-cyan-300 font-mono">
              Select an available store dispatcher to deliver the door and hardware to site
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            @for (job of jobsAwaitingDriver(); track job.id) {
              <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 shadow-xs space-y-3">
                <div class="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <span class="font-mono text-[11px] font-extrabold text-cyan-700 dark:text-cyan-400">{{ job.id }}</span>
                    <h4 class="font-bold text-slate-900 dark:text-white text-sm">{{ job.doorModel }}</h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ job.dimensions }} · {{ job.finish }}</p>
                  </div>
                  <span class="text-[10px] uppercase font-bold bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                    Driver Pending
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Installation Schedule:</span>
                    <p class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <mat-icon class="!text-xs text-cyan-600 dark:text-cyan-400">event</mat-icon>
                      <span>{{ job.scheduledDate }}</span>
                    </p>
                    <p class="text-[11px] text-slate-500 font-mono mt-0.5">
                      {{ job.assignedInstallerName ? 'Installer: ' + getFirstName(job.assignedInstallerName) : 'Installer: Operations Queue' }}
                    </p>
                  </div>

                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Site / Client:</span>
                    <p class="font-bold text-slate-900 dark:text-white truncate">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span>{{ job.client.siteAddress }}</span>
                    </p>
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button 
                    type="button"
                    (click)="openAssignDriverModal(job)"
                    title="Select Dispatcher"
                    class="px-3.5 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-xs">local_shipping</mat-icon>
                    <span>Select Driver</span>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Shop Counter Bookings & Orders Table -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <!-- Table Top Header -->
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">
              {{ isShopLocked() ? activeShop().shopName + ' — Bookings & Payment Registry' : 'Shop Installation Bookings & Payment Registry' }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ isShopLocked() ? 'Orders created at and scoped exclusively to ' + activeShop().shopName + ' (' + activeShop().branchCode + ')' : 'Scheduled by Shop Attendant with client counter payments audited by Accounts' }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
              {{ sortedJobs().length }} of {{ shopScopedJobs().length }} Orders
            </span>
          </div>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="px-5 py-3 bg-slate-50/60 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <!-- Search input & Time filters -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Search Input -->
            <div class="relative">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 !text-base !w-4 !h-4 text-slate-400">search</mat-icon>
              <input
                type="text"
                [ngModel]="tableSearchQuery()"
                (ngModelChange)="onSearchChange($event)"
                placeholder="Search order ID, client, door..."
                class="pl-9 pr-8 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl w-56 sm:w-64 focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white shadow-2xs"
              />
              @if (tableSearchQuery()) {
                <button
                  type="button"
                  (click)="onSearchChange('')"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Clear search"
                >
                  <mat-icon class="!text-xs !w-3.5 !h-3.5">close</mat-icon>
                </button>
              }
            </div>

            <!-- Shop Branch Filter (Combined All Shops by default for Manager / Admin) -->
            @if (!isShopLocked()) {
              <select
                [ngModel]="selectedBranchFilter()"
                (ngModelChange)="onBranchChange($event)"
                [ngModelOptions]="{standalone: true}"
                class="px-2.5 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:border-cyan-500 shadow-2xs max-w-[230px] truncate"
                aria-label="Filter by Shop Branch"
              >
                <option value="all">All Shop Branches ({{ store.jobs().length }})</option>
                @for (branch of store.branches(); track branch.id) {
                  <option [value]="branch.id">
                    {{ branch.shopName }} ({{ countOrdersForBranch(branch.id) }})
                  </option>
                }
              </select>
            }

            <!-- Time Filter Pills (Day default, Date Range, All last) -->
            <div class="flex flex-wrap items-center gap-2">
              <div class="inline-flex items-center p-0.5 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  (click)="setTimeFilter('day')"
                  [class]="timeFilter() === 'day' ? 'bg-cyan-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                  class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  Day
                </button>
                <button
                  type="button"
                  (click)="setTimeFilter('week')"
                  [class]="timeFilter() === 'week' ? 'bg-cyan-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                  class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  Week
                </button>
                <button
                  type="button"
                  (click)="setTimeFilter('month')"
                  [class]="timeFilter() === 'month' ? 'bg-cyan-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                  class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  Month
                </button>
                <button
                  type="button"
                  (click)="setTimeFilter('year')"
                  [class]="timeFilter() === 'year' ? 'bg-cyan-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                  class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  Year
                </button>
                <button
                  type="button"
                  (click)="setTimeFilter('custom')"
                  [class]="timeFilter() === 'custom' ? 'bg-cyan-700 text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                  class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  Date Range
                </button>
                <button
                  type="button"
                  (click)="setTimeFilter('all')"
                  [class]="timeFilter() === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                  class="px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  All
                </button>
              </div>

              @if (timeFilter() === 'custom') {
                <div class="inline-flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs">
                  <span class="text-[10px] text-slate-400 font-mono pl-1">From:</span>
                  <input
                    type="date"
                    [ngModel]="customStartDate()"
                    (ngModelChange)="onCustomDateChange('start', $event)"
                    [ngModelOptions]="{standalone: true}"
                    class="bg-transparent text-slate-800 dark:text-slate-200 text-xs px-1 focus:outline-none cursor-pointer"
                  />
                  <span class="text-[10px] text-slate-400 font-mono">To:</span>
                  <input
                    type="date"
                    [ngModel]="customEndDate()"
                    (ngModelChange)="onCustomDateChange('end', $event)"
                    [ngModelOptions]="{standalone: true}"
                    class="bg-transparent text-slate-800 dark:text-slate-200 text-xs px-1 focus:outline-none cursor-pointer"
                  />
                  @if (customStartDate() || customEndDate()) {
                    <button
                      type="button"
                      (click)="clearCustomDateRange()"
                      class="px-1.5 py-0.5 text-[10px] text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Page Size (5, 10, 25, 50, 100) -->
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-500 dark:text-slate-400 font-medium">Page Size:</span>
            <select
              [ngModel]="pageSize()"
              (ngModelChange)="onPageSizeChange($event)"
              [ngModelOptions]="{standalone: true}"
              class="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:border-cyan-500 shadow-2xs"
            >
              <option [ngValue]="5">5</option>
              <option [ngValue]="10">10</option>
              <option [ngValue]="25">25</option>
              <option [ngValue]="50">50</option>
              <option [ngValue]="100">100</option>
            </select>
          </div>
        </div>

        <!-- Table with Single-line Rows -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider select-none">
                <th class="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" (click)="toggleSort('id')">
                  <div class="flex items-center gap-1">
                    <span>Order ID</span>
                    <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">
                      {{ sortField() === 'id' ? (sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more' }}
                    </mat-icon>
                  </div>
                </th>
                <th class="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" (click)="toggleSort('client')">
                  <div class="flex items-center gap-1">
                    <span>Client</span>
                    <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">
                      {{ sortField() === 'client' ? (sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more' }}
                    </mat-icon>
                  </div>
                </th>
                <th class="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" (click)="toggleSort('date')">
                  <div class="flex items-center gap-1">
                    <span>Date</span>
                    <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">
                      {{ sortField() === 'date' ? (sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more' }}
                    </mat-icon>
                  </div>
                </th>
                @if (store.currentRole() !== 'shop_manager') {
                  <th class="py-2.5 px-3">Shop Ref</th>
                }
                <th class="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" (click)="toggleSort('door')">
                  <div class="flex items-center gap-1">
                    <span>Door Model</span>
                    <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">
                      {{ sortField() === 'door' ? (sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more' }}
                    </mat-icon>
                  </div>
                </th>
                <th class="py-2.5 px-3">Site Location</th>
                <th class="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" (click)="toggleSort('amount')">
                  <div class="flex items-center gap-1">
                    <span>Counter Payment</span>
                    <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">
                      {{ sortField() === 'amount' ? (sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more' }}
                    </mat-icon>
                  </div>
                </th>
                <th class="py-2.5 px-3">Audit</th>
                <th class="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" (click)="toggleSort('status')">
                  <div class="flex items-center gap-1">
                    <span>Status (Installer / Driver)</span>
                    <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">
                      {{ sortField() === 'status' ? (sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more' }}
                    </mat-icon>
                  </div>
                </th>
                <th class="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (job of paginatedJobs(); track job.id) {
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <!-- Single line Order ID -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <span class="font-mono font-bold text-slate-900 dark:text-white">{{ job.id }}</span>
                  </td>

                  <!-- Single line Client (Right after Order ID) -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <span class="font-medium text-slate-900 dark:text-white truncate max-w-[140px] inline-block align-middle" [title]="job.client.name + ' (' + job.client.phone + ')'">
                      {{ job.client.name }}
                    </span>
                  </td>

                  <!-- Single line Date -->
                  <td class="py-2.5 px-3 whitespace-nowrap font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    {{ (job.shopBooking?.bookingTimestamp || job.createdAt || job.scheduledDate) | date:'mediumDate' }}
                  </td>

                  <!-- Shop Reference Badge (Hidden on Shop Manager portal) -->
                  @if (store.currentRole() !== 'shop_manager') {
                    <td class="py-2.5 px-3 whitespace-nowrap">
                      @let jobBranch = store.getJobBranch(job);
                      <span
                        class="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800 max-w-[140px] truncate"
                        [title]="(jobBranch?.shopName || job.shopBranch) + ' (Ref: ' + (job.shopId || jobBranch?.id || 'dm-branch-central') + ')'"
                      >
                        <mat-icon class="!text-[11px] !w-3 !h-3 shrink-0">storefront</mat-icon>
                        <span class="truncate">{{ job.shopBranchCode || jobBranch?.branchCode || job.shopBranch }}</span>
                      </span>
                    </td>
                  }

                  <!-- Single line Door Model -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <span class="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px] inline-block align-middle" [title]="job.doorModel">
                      {{ store.formatDoorColumnLabel(job) }}
                    </span>
                  </td>

                  <!-- Single line Site Location -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <span class="text-slate-500 dark:text-slate-400 text-xs truncate max-w-[150px] inline-block align-middle" [title]="job.client.siteAddress">
                      {{ job.client.siteAddress }}
                    </span>
                  </td>

                  <!-- Single line Payment -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <span class="font-bold font-mono text-cyan-700 dark:text-cyan-400 text-xs">
                      GH₵{{ (job.shopBooking?.amountPaidAtShop || 0).toLocaleString() }}
                    </span>
                  </td>

                  <!-- Single line Accountant Audit -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    @if (job.shopBooking?.accountantVerified) {
                      <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <mat-icon class="!text-xs !w-3 !h-3">verified</mat-icon>
                        <span>Audited</span>
                      </span>
                    } @else if (job.shopBooking) {
                      <span class="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        <mat-icon class="!text-xs !w-3 !h-3">hourglass_empty</mat-icon>
                        <span>Pending</span>
                      </span>
                    } @else {
                      <span class="text-slate-400 text-[11px]">—</span>
                    }
                  </td>

                  <!-- Single line Lifecycle Status + Synced Installer Team Status + Dispatcher Status -->
                  <td class="py-2.5 px-3 whitespace-nowrap">
                    <div class="flex flex-col items-start gap-1">
                      <span
                        class="text-[10px] font-bold px-2 py-0.5 rounded capitalize inline-block"
                        [class]="getStatusBadgeClass(job.status)"
                      >
                        {{ job.status.replace('_', ' ') }}
                      </span>
                      @if (job.assignedInstallers && job.assignedInstallers.length > 0) {
                        <div class="flex flex-col gap-0.5">
                          @for (inst of job.assignedInstallers; track inst.id) {
                            @let instStatus = inst.status || job.installerAssignmentStatus;
                            <span
                              class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border"
                              [class]="getInstallerMemberBadgeClass(job, inst)"
                            >
                              <mat-icon class="!text-[10px] !w-2.5 !h-2.5">person</mat-icon>
                              <span>Installer: {{ getFirstName(inst.name) }}</span>
                              @if (instStatus === 'accepted') {
                                <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-emerald-600 dark:text-emerald-400" [title]="(inst.autoAccepted ?? job.installerAutoAccepted) ? 'Auto-Accepted' : 'Accepted'">check_circle</mat-icon>
                                @if (inst.autoAccepted ?? job.installerAutoAccepted) {
                                  <span class="text-[8px] opacity-80 font-mono">(auto)</span>
                                }
                              } @else if (instStatus === 'rejected') {
                                <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-rose-600 dark:text-rose-400" title="Declined">cancel</mat-icon>
                              } @else {
                                <span class="text-[8px] opacity-80 font-mono">({{ store.formatInstallerRemaining(job, inst) }} Pending)</span>
                              }
                            </span>
                          }
                        </div>
                      } @else if (job.assignedInstallerName) {
                        <span
                          class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border"
                          [class]="job.installerAssignmentStatus === 'accepted'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : (job.installerAssignmentStatus === 'rejected'
                              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800')"
                        >
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">person</mat-icon>
                          <span>Installer: {{ getFirstName(job.assignedInstallerName) }}</span>
                          @if (job.installerAssignmentStatus === 'accepted') {
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-emerald-600 dark:text-emerald-400" [title]="job.installerAutoAccepted ? 'Auto-Accepted' : 'Accepted'">check_circle</mat-icon>
                            @if (job.installerAutoAccepted) {
                              <span class="text-[8px] opacity-80 font-mono">(auto)</span>
                            }
                          } @else if (job.installerAssignmentStatus === 'rejected') {
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-rose-600 dark:text-rose-400" title="Declined">cancel</mat-icon>
                          } @else {
                            <span class="text-[8px] opacity-80 font-mono">({{ store.formatInstallerRemaining(job) }} Pending)</span>
                          }
                        </span>
                      } @else if (job.installerAssignmentStatus === 'rejected') {
                        <span class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">person</mat-icon>
                          <span>Installer: {{ job.rejectedByInstallerName ? getFirstName(job.rejectedByInstallerName) : 'Declined' }}</span>
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-rose-600 dark:text-rose-400" title="Declined">cancel</mat-icon>
                        </span>
                      } @else {
                        <span
                          class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border bg-amber-50/60 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60"
                        >
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">person</mat-icon>
                          <span>Installer: Pending</span>
                        </span>
                      }

                      <!-- Dispatcher Status Info -->
                      @if (job.dispatcherName || job.dispatcherId) {
                        @let isDriverAuto = !!(job.driverAutoAccepted ?? job.logisticsTruck?.driverAutoAccepted);
                        @let isDriverPending = job.driverAssignmentStatus === 'pending';
                        @let isDriverRejected = job.driverAssignmentStatus === 'rejected';
                        <span
                          class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border"
                          [class]="isDriverPending
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                            : (isDriverRejected
                              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                              : 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800')"
                          [title]="job.logisticsTruck?.truckPlate || 'Dispatched'"
                        >
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">local_shipping</mat-icon>
                          <span>Driver: {{ getFirstName(job.dispatcherName) || 'Assigned' }}</span>
                          @if (isDriverRejected) {
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-rose-600 dark:text-rose-400" title="Declined">cancel</mat-icon>
                          } @else if (isDriverPending) {
                            <span class="text-[8px] opacity-80 font-mono">({{ store.formatDriverRemaining(job) }} Pending)</span>
                          } @else {
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-teal-600 dark:text-teal-400" [title]="isDriverAuto ? 'Auto-Accepted' : 'Accepted'">check_circle</mat-icon>
                            @if (isDriverAuto) {
                              <span class="text-[8px] opacity-80 font-mono">(auto)</span>
                            }
                          }
                        </span>
                      } @else if (store.hasJobAcceptedInstallers(job)) {
                        <span
                          class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800"
                        >
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">local_shipping</mat-icon>
                          <span>Driver: Pending Assignment</span>
                        </span>
                      } @else {
                        <span
                          class="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        >
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5">lock_clock</mat-icon>
                          <span>Driver: Locked (Needs Installer)</span>
                        </span>
                      }
                    </div>
                  </td>

                  <!-- Action button icon to view details -->
                  <td class="py-2.5 px-3 whitespace-nowrap text-right">
                    <div class="inline-flex items-center justify-end gap-1">
                      @if (store.canCurrentRoleSelectDispatcher() && !job.dispatcherId && job.status !== 'completed' && job.status !== 'bonus_awarded' && job.status !== 'dispatched' && job.status !== 'delivered_on_site' && job.status !== 'on_site' && job.status !== 'installed_pending_signoff') {
                        <button
                          type="button"
                          [disabled]="!store.hasJobAcceptedInstallers(job)"
                          (click)="store.hasJobAcceptedInstallers(job) ? openAssignDriverModal(job) : null"
                          [title]="store.hasJobAcceptedInstallers(job) ? 'Select Driver' : 'Driver selection locked: Awaiting installer acceptance from Operations Manager'"
                          [class]="store.hasJobAcceptedInstallers(job)
                            ? 'p-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-2xs transition-colors cursor-pointer'
                            : 'p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed opacity-70'"
                        >
                          <mat-icon class="!text-base !w-4 !h-4">{{ store.hasJobAcceptedInstallers(job) ? 'local_shipping' : 'lock' }}</mat-icon>
                        </button>
                      }
                      <button
                        type="button"
                        (click)="jobSelected.emit(job.id)"
                        title="View Details"
                        class="p-1.5 bg-[#59000A] hover:bg-[#73000E] text-white rounded-lg shadow-2xs transition-colors cursor-pointer"
                      >
                        <mat-icon class="!text-base !w-4 !h-4">visibility</mat-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td [attr.colspan]="store.currentRole() === 'shop_manager' ? 9 : 10" class="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                    <mat-icon class="!text-2xl text-slate-300 dark:text-slate-600 mb-1">inbox</mat-icon>
                    <p class="font-medium">No installation orders match the selected filters.</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls Footer -->
        <div class="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span>Showing {{ paginationInfo().from }} to {{ paginationInfo().to }} of {{ sortedJobs().length }} orders</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button
              type="button"
              (click)="prevPage()"
              [disabled]="currentPage() <= 1"
              class="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <mat-icon class="!text-sm !w-4 !h-4">chevron_left</mat-icon>
              <span>Prev</span>
            </button>
            <span class="px-2 font-mono font-semibold text-slate-700 dark:text-slate-300">
              Page {{ currentPage() }} of {{ totalPages() }}
            </span>
            <button
              type="button"
              (click)="nextPage()"
              [disabled]="currentPage() >= totalPages()"
              class="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <mat-icon class="!text-sm !w-4 !h-4">chevron_right</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- MODAL: SCHEDULE INSTALLATION REQUEST (MASTER SHOP MANAGER)         -->
      <!-- =================================================================== -->
      @if (showScheduleModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-cyan-700 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">calendar_month</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Schedule Installation Request</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Shop Attendant: Book door, lock & counter customer payment</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeScheduleModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <!-- Modal Form Body -->
            <form [formGroup]="bookingForm" (ngSubmit)="submitBooking()" class="flex flex-col flex-1 min-h-0 overflow-hidden text-xs">
              
              <!-- Scrollable Modal Form Body -->
              <div class="overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-5 flex-1">
                <!-- Section 1: Multi-Door & Lock Specifications with Dropdown Information -->
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-[11px] uppercase font-bold text-cyan-700 dark:text-cyan-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs">meeting_room</mat-icon>
                    <span>1. Door & Lock Specifications ({{ totalShopDoorsCount() }} Units Selected)</span>
                  </span>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
                      Total: GH₵{{ totalShopDoorsPrice().toLocaleString() }}
                    </span>
                    <button 
                      type="button" 
                      (click)="addShopDoorFromCatalog()"
                      class="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <mat-icon class="!text-xs !w-3 !h-3">add</mat-icon>
                      <span>+ Add Door</span>
                    </button>
                  </div>
                </div>

                <!-- Multi-Door Cards with Dropdown Information Inside -->
                <div class="space-y-2.5">
                  @for (door of selectedShopDoors(); track door.id; let i = $index) {
                    <div class="rounded-xl border transition-all overflow-hidden"
                      [class]="door.isExpanded 
                        ? 'border-cyan-500/50 bg-white dark:bg-slate-900 shadow-sm' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40'">
                      
                      <!-- Door Header Bar / Dropdown Trigger -->
                      <div 
                        (click)="toggleShopDoorDropdown(i)"
                        class="px-3 sm:px-3.5 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-2.5 cursor-pointer select-none bg-slate-100/60 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <!-- Left: Number, Title, Category & Mobile Actions -->
                        <div class="flex items-center justify-between sm:justify-start gap-2 min-w-0 w-full sm:w-auto">
                          <div class="flex items-center gap-2 min-w-0">
                            <span class="w-6 h-6 rounded-md bg-cyan-700 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              #{{ i + 1 }}
                            </span>
                            <div class="truncate">
                              <div class="flex items-center gap-1.5 flex-wrap">
                                <span class="font-bold text-slate-900 dark:text-white truncate text-xs">{{ door.doorModel }}</span>
                                <span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">{{ door.doorCategory }}</span>
                              </div>
                              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate block">
                                {{ door.dimensions }} · {{ door.finish }}
                              </span>
                            </div>
                          </div>

                          <!-- Mobile-only remove & dropdown toggle -->
                          <div class="flex items-center gap-1 sm:hidden shrink-0" (click)="$event.stopPropagation()">
                            @if (selectedShopDoors().length > 1) {
                              <button type="button" (click)="removeShopDoor(i)" class="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer" title="Remove door">
                                <mat-icon class="!text-xs !w-3.5 !h-3.5">delete</mat-icon>
                              </button>
                            }
                            <button type="button" (click)="toggleShopDoorDropdown(i)" class="p-0.5 text-slate-400 hover:text-slate-700 rounded transition-transform duration-200 cursor-pointer" [class.rotate-180]="door.isExpanded">
                              <mat-icon class="!text-base">expand_more</mat-icon>
                            </button>
                          </div>
                        </div>

                        <!-- Right (Desktop) / Bottom row (Mobile): Stepper & Subtotal -->
                        <div class="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1.5 sm:pt-0 border-t border-slate-200/60 dark:border-slate-700/60 sm:border-0" (click)="$event.stopPropagation()">
                          <!-- Quantity Controls -->
                          <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-900 text-xs">
                            <button type="button" (click)="changeShopDoorQty(i, -1)" [disabled]="door.quantity <= 1" class="px-1.5 py-0.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer">
                              <mat-icon class="!text-xs !w-3 !h-3">remove</mat-icon>
                            </button>
                            <span class="px-1.5 py-0.5 font-mono font-bold text-xs min-w-[20px] text-center">{{ door.quantity }}</span>
                            <button type="button" (click)="changeShopDoorQty(i, 1)" class="px-1.5 py-0.5 text-slate-500 hover:text-slate-900 cursor-pointer">
                              <mat-icon class="!text-xs !w-3 !h-3">add</mat-icon>
                            </button>
                          </div>

                          @if (store.canViewDoorPrices()) {
                            <span class="text-xs font-mono font-black text-cyan-700 dark:text-cyan-400 min-w-[70px] text-right">
                              GH₵{{ (door.unitPrice * door.quantity).toLocaleString() }}
                            </span>
                          }

                          <!-- Desktop actions -->
                          <div class="hidden sm:flex items-center gap-1">
                            @if (selectedShopDoors().length > 1) {
                              <button type="button" (click)="removeShopDoor(i)" class="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer" title="Remove door">
                                <mat-icon class="!text-xs !w-3.5 !h-3.5">delete</mat-icon>
                              </button>
                            }

                            <button type="button" (click)="toggleShopDoorDropdown(i)" class="p-0.5 text-slate-400 hover:text-slate-700 rounded transition-transform duration-200 cursor-pointer" [class.rotate-180]="door.isExpanded">
                              <mat-icon class="!text-base">expand_more</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Expanded Door Information Dropdown Body -->
                      @if (door.isExpanded) {
                        <div class="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          
                          <!-- Preset Model Template Selector -->
                          <div class="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                            <div class="flex items-center justify-between mb-1">
                              <label class="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Preset Model Template
                              </label>
                              <span class="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400">
                                Auto-syncs specs & category
                              </span>
                            </div>
                            <select 
                              (change)="onShopDoorCatalogPick(i, $event)"
                              class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                            >
                              <option value="">-- Select catalog template --</option>
                              @for (catDoor of store.doors(); track catDoor.id) {
                                <option [value]="catDoor.id" [selected]="catDoor.id === door.catalogDoorId">
                                  {{ catDoor.name }} ({{ catDoor.modelCode }})@if (store.canViewDoorPrices()) { - {{ catDoor.formattedPrice || ('GH₵' + catDoor.unitPrice) }}} • {{ catDoor.category }}
                                </option>
                              }
                            </select>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <div class="flex items-center justify-between mb-0.5">
                                <label class="block font-bold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Door Category</label>
                                <span class="inline-flex items-center gap-1 text-[9px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200/80 dark:border-cyan-800/60 px-1.5 py-0.5 rounded shadow-2xs">
                                  <mat-icon class="!text-[11px] !w-3 !h-3">auto_awesome</mat-icon>
                                  <span>Auto-Selected</span>
                                </span>
                              </div>
                              <select 
                                [ngModel]="door.doorCategory"
                                (ngModelChange)="updateShopDoorField(i, 'doorCategory', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
                              >
                                @for (cat of getShopCategoryList(door.doorCategory); track cat) {
                                  <option [value]="cat">{{ cat }}</option>
                                }
                              </select>
                            </div>

                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Door Model Title</label>
                              <input 
                                type="text"
                                [ngModel]="door.doorModel"
                                (ngModelChange)="onShopDoorModelInputChange(i, $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                              />
                            </div>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Lock Hardware</label>
                              <select 
                                [ngModel]="door.lockModel"
                                (ngModelChange)="updateShopDoorField(i, 'lockModel', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs cursor-pointer"
                              >
                                <option value="Doormaster Smart Lock Handle F35 (Biometric & RFID)">Doormaster Smart Lock Handle F35 (Biometric & RFID)</option>
                                <option value="Doormaster High-Security Italian Mortise Lock">Doormaster High-Security Italian Mortise Lock</option>
                                <option value="Doormaster Keypad Digital Smart Cylinder">Doormaster Keypad Digital Smart Cylinder</option>
                                <option value="Heavy-Duty Multi-Point Deadbolt System">Heavy-Duty Multi-Point Deadbolt System</option>
                              </select>
                            </div>
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Dimensions</label>
                              <input 
                                type="text"
                                [ngModel]="door.dimensions"
                                (ngModelChange)="updateShopDoorField(i, 'dimensions', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                              />
                            </div>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Dimensions</label>
                              <input 
                                type="text"
                                [ngModel]="door.dimensions"
                                (ngModelChange)="updateShopDoorField(i, 'dimensions', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                              />
                            </div>
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Finish / Veneer</label>
                              <input 
                                type="text"
                                [ngModel]="door.finish"
                                (ngModelChange)="updateShopDoorField(i, 'finish', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                              />
                            </div>
                            @if (store.canViewDoorPrices()) {
                              <div>
                                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Unit Price (GH₵)</label>
                                <input 
                                  type="number"
                                  [ngModel]="door.unitPrice"
                                  (ngModelChange)="updateShopDoorField(i, 'unitPrice', +$event)"
                                  [ngModelOptions]="{standalone: true}"
                                  class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-xs"
                                />
                              </div>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>

                <!-- Shop Branch (Locked to Assigned Shop when User is Shop-Assigned) -->
                <div>
                  <label for="shopBranch" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dispatching Shop Branch</label>
                  @if (isShopLocked()) {
                    <div class="w-full px-3 py-2 border border-cyan-200 dark:border-cyan-800 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 font-bold text-xs flex items-center justify-between gap-2">
                      <span class="flex items-center gap-1.5 truncate">
                        <mat-icon class="!text-sm !w-4 !h-4 text-cyan-600 dark:text-cyan-400">storefront</mat-icon>
                        <span class="truncate">{{ activeShop().shopName }} ({{ activeShop().branchCode }} · {{ activeShop().city }})</span>
                      </span>
                      <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 shrink-0">
                        Ref: {{ activeShop().id }}
                      </span>
                    </div>
                  } @else {
                    <select 
                      id="shopBranch"
                      formControlName="shopId"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs cursor-pointer"
                    >
                      @for (b of store.branches(); track b.branchCode) {
                        <option [value]="b.id">
                          🏪 {{ b.shopName }} ({{ b.branchCode }} · {{ b.landmark || b.city }})
                        </option>
                      }
                    </select>
                  }
                </div>
              </div>

              <!-- Section 2: Client & Site Owner Details -->
              <div class="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span class="text-[11px] uppercase font-bold text-indigo-700 dark:text-indigo-400 tracking-wider flex items-center gap-1">
                  <mat-icon class="!text-xs">person_pin</mat-icon>
                  <span>2. Client & Site Location Details</span>
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label for="clientNameInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Client Full Name *</label>
                    <input 
                      id="clientNameInput"
                      type="text" 
                      formControlName="clientName"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="e.g. Samuel Darko"
                    />
                  </div>

                  <div>
                    <label for="clientPhoneInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                    <app-phone-input 
                      id="clientPhoneInput"
                      formControlName="clientPhone"
                      placeholder="24 000 1234"
                    ></app-phone-input>
                  </div>

                  <div>
                    <label for="clientEmailInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input 
                      id="clientEmailInput"
                      type="email" 
                      formControlName="clientEmail"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label for="siteAddressInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                      <span>Site Location / Address / GPS *</span>
                      <span class="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-bold">Auto Live Pin</span>
                    </label>
                    <div class="relative">
                      <input 
                        id="siteAddressInput"
                        type="text" 
                        formControlName="siteAddress"
                        class="w-full pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="e.g. Airport Residential Area, Accra (or GPS coordinates)" 
                      />
                      <mat-icon class="!text-sm text-cyan-600 dark:text-cyan-400 absolute left-2.5 top-2 pointer-events-none">location_on</mat-icon>
                    </div>
                  </div>

                  <div>
                    <label for="siteAccessInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Site Access Instructions</label>
                    <input 
                      id="siteAccessInput"
                      type="text" 
                      formControlName="accessInstructions"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="e.g. Security gate pin 4421, ground floor"
                    />
                  </div>
                </div>

                <!-- Downward Interactive Live Map Preview -->
                <div class="pt-1">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <mat-icon class="!text-xs text-cyan-600 dark:text-cyan-400">map</mat-icon>
                      <span>Client Site Location Radar & GPS Pin</span>
                    </span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      Drag pin or click map to pinpoint site gate
                    </span>
                  </div>
                  
                  <app-client-location-map 
                    [address]="bookingForm.get('siteAddress')?.value || ''"
                    (locationSelected)="onShopSiteLocationSelected($event)"
                  />
                </div>
              </div>

              <!-- Section 3: Schedule Date & Counter Payment -->
              <div class="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span class="text-[11px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider flex items-center gap-1">
                  <mat-icon class="!text-xs">payments</mat-icon>
                  <span>3. Schedule & Shop Counter Payment Collection</span>
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label for="scheduledDateInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Installation Date *</label>
                    <input 
                      id="scheduledDateInput"
                      type="date" 
                      formControlName="scheduledDate"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    />
                  </div>

                  <div>
                    <label for="estimatedHoursInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Installation Time (Hours)</label>
                    <input 
                      id="estimatedHoursInput"
                      type="number" 
                      formControlName="estimatedHours"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label for="amountPaidInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Installation Cost (GH₵) *</label>
                    <input 
                      id="amountPaidInput"
                      type="number" 
                      formControlName="amountPaidAtShop"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-cyan-700 dark:text-cyan-400"
                    />
                  </div>

                  <div>
                    <label for="paymentMethodSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Method *</label>
                    <select 
                      id="paymentMethodSelect"
                      formControlName="paymentMethod"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="momo">MTN / Telecel MoMo</option>
                      <option value="cash">Counter Cash</option>
                      <option value="pos_card">POS Terminal (Card)</option>
                      <option value="bank_transfer">Direct Bank Transfer</option>
                      <option value="dm_door">DM Door</option>
                    </select>
                  </div>

                  <div>
                    <label for="receiptNumberInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Shop Receipt / Reference # *</label>
                    <input 
                      id="receiptNumberInput"
                      type="text" 
                      formControlName="receiptNumber"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              </div>

              </div>

              <!-- Sticky Modal Footer -->
              <div class="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 z-10 shadow-lg">
                <div class="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span class="font-bold text-slate-900 dark:text-white">{{ totalShopDoorsCount() }} Units</span>
                  <span>·</span>
                  <span class="text-cyan-700 dark:text-cyan-400 font-bold">
                    GH₵{{ totalShopDoorsPrice().toLocaleString() }} Total
                  </span>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    type="button" 
                    (click)="closeScheduleModal()"
                    class="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    [disabled]="!bookingForm.valid"
                    class="w-full sm:w-auto px-5 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">check</mat-icon>
                    <span>Submit Installation Request</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- MODAL: ASSIGN STORE DISPATCH DRIVER & VEHICLE (SHOP MANAGER)        -->
      <!-- =================================================================== -->
      @if (activeAssignDriverJob()) {
        @let job = activeAssignDriverJob()!;
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-cyan-50/50 dark:bg-slate-800/50">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-cyan-700 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">local_shipping</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Select Store Driver</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ job.id }} · {{ job.doorModel }}</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeAssignDriverModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <!-- Modal Body -->
            <form [formGroup]="driverAssignForm" (ngSubmit)="confirmDriverDispatch()" class="overflow-y-auto p-5 space-y-4 text-xs">
              <!-- Order & Assigned Installer Summary -->
              <div class="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Installation Destination</span>
                  <span class="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold">Ref: {{ job.id }}</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 flex items-center gap-0.5 mt-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span class="truncate">{{ job.client.siteAddress }}</span>
                    </p>
                    <p class="text-[10px] text-slate-400 font-mono">{{ job.client.phone }}</p>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Assigned Installer:</span>
                    <p class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">person</mat-icon>
                      <span>{{ job.assignedInstallerName || 'Installer' }}</span>
                    </p>
                    <span class="text-[10px] text-slate-500 block mt-0.5">Scheduled: {{ job.scheduledDate }}</span>
                  </div>
                </div>
              </div>

              <!-- Driver Selection -->
              <div class="space-y-2">
                <label for="driverSelect" class="block font-bold text-slate-700 dark:text-slate-300">
                  Select Driver Available to Store *
                </label>
                <select 
                  id="driverSelect"
                  formControlName="dispatcherId"
                  (change)="onDriverSelected($event)"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  @for (d of availableStoreDispatchers(); track d.id) {
                    <option [value]="d.id">
                      {{ d.name }} · {{ d.assignedTruck.plate }} ({{ d.assignedTruck.model }}) - {{ d.status.toUpperCase() }}
                    </option>
                  }
                </select>
              </div>

              <!-- Vehicle Plate & Model -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label for="truckPlateInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Truck Plate #</label>
                  <input 
                    id="truckPlateInput"
                    type="text" 
                    formControlName="truckPlate"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label for="departureTimeInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Departure</label>
                  <input 
                    id="departureTimeInput"
                    type="text" 
                    formControlName="estimatedDeparture"
                    placeholder="e.g. Dispatched immediately from store"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <!-- Delivery Cargo Notes -->
              <div>
                <label for="deliveryNotesText" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cargo Handover & Delivery Notes
                </label>
                <input 
                  id="deliveryNotesText"
                  type="text" 
                  formControlName="deliveryNotes"
                  placeholder="e.g. Inspect lockset box and door slab prior to departing store."
                  class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <!-- Sticky Modal Footer -->
              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span class="text-[11px] text-slate-400 font-mono">
                  Driver, Operations & Client will receive SMS alerts
                </span>
                <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button 
                    type="button" 
                    (click)="closeAssignDriverModal()"
                    class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    [disabled]="!driverAssignForm.valid"
                    class="px-5 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">local_shipping</mat-icon>
                    <span>Select Driver</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- MODAL: SHOP LOCATION & WORKSHOP SETTINGS                            -->
      <!-- =================================================================== -->
      @if (showLocationSettingsModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-cyan-700 text-white flex items-center justify-center shadow-sm">
                  <mat-icon class="!text-base">storefront</mat-icon>
                </div>
                <div>
                  <h2 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Shop Location & Workshop Settings</span>
                  </h2>
                  <p class="text-xs text-slate-500">Configure store origin, address, GPS coordinates and dispatch logistics radius</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeLocationSettingsModal()"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            </div>

            <!-- Modal Body Form -->
            <form [formGroup]="locationSettingsForm" (ngSubmit)="saveLocationSettings()" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
              
              @if (locationSettingsFeedback()) {
                <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <mat-icon class="!text-sm text-emerald-600">check_circle</mat-icon>
                  <span class="font-semibold">{{ locationSettingsFeedback() }}</span>
                </div>
              }

              <!-- Branch Identity -->
              <div class="space-y-3">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">business</mat-icon>
                  <span>Branch Identity</span>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="sm:col-span-2 space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Shop / Workshop Name *</label>
                    <input 
                      type="text" 
                      formControlName="shopName" 
                      placeholder="e.g. DoorMaster Flagship Workshop - Branch A" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Branch Code *</label>
                    <input 
                      type="text" 
                      formControlName="branchCode" 
                      placeholder="e.g. DM-ACC-01" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <!-- Physical Location & Address -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
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
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">City *</label>
                    <input 
                      type="text" 
                      formControlName="city" 
                      placeholder="e.g. Accra" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Region</label>
                    <input 
                      type="text" 
                      formControlName="region" 
                      placeholder="e.g. Greater Accra" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <!-- GPS Coordinates & Quick Accra Hub Presets -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center justify-between">
                  <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <mat-icon class="!text-sm text-cyan-600">my_location</mat-icon>
                    <span>Store GPS Coordinates & Origin</span>
                  </h3>
                  <button 
                    type="button" 
                    (click)="detectBrowserGps()" 
                    class="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="!text-xs">gps_fixed</mat-icon>
                    <span>Use Device GPS</span>
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Latitude *</label>
                    <input 
                      type="number" 
                      step="any"
                      formControlName="latitude" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Longitude *</label>
                    <input 
                      type="number" 
                      step="any"
                      formControlName="longitude" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <!-- Quick Presets -->
                <div class="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400 block">Quick Accra Hub Location Presets:</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.6231, -0.1582, 'Plot 48, Spintex Road Industrial Area')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      🏭 Spintex Showroom
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.5560, -0.2012, 'High Street Boulevard, Central Business District')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      🏛️ Accra Central
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.6380, -0.1550, 'Boundary Road, East Legon')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      📍 East Legon
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.6698, -0.0166, 'Harbor Commercial Gateway, Tema')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      🚢 Tema Harbor
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.5840, -0.1780, 'Rangoon Lane, Cantonments Diplomatic Zone')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      📍 Cantonments
                    </button>
                  </div>
                </div>
              </div>

              <!-- Workshop Logistics & Contact Details -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">contact_phone</mat-icon>
                  <span>Operations, Counter & Manager Details</span>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Shop Attendant Name</label>
                    <input 
                      type="text" 
                      formControlName="managerName" 
                      placeholder="e.g. Kwame Mensah" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
                        class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                      <span class="text-xs text-slate-400 font-bold">km</span>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Phone (SMS Alerts) *</label>
                    <app-phone-input 
                      formControlName="phone" 
                      placeholder="24 100 0002" 
                    ></app-phone-input>
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Official Email</label>
                    <input 
                      type="email" 
                      formControlName="email" 
                      placeholder="spintex.workshop@doormasterops.com" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Operating / Dispatch Hours</label>
                  <input 
                    type="text" 
                    formControlName="operatingHours" 
                    placeholder="Mon - Sat: 08:00 - 18:00" 
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <!-- Sticky Modal Actions Footer -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  (click)="closeLocationSettingsModal()"
                  class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  [disabled]="!locationSettingsForm.valid || isSavingLocationSettings()"
                  class="px-5 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  @if (isSavingLocationSettings()) {
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
        </div>
      }
    </div>
  `
})
export class ShopPortal {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  jobSelected = output<string>();
  newJobOpened = output<void>();
  settingsOpened = output<void>();

  readonly showScheduleModal = signal<boolean>(false);

  readonly bookingForm = new FormGroup({
    doorModel: new FormControl<string>('Turkey interior DM001', { nonNullable: true, validators: [Validators.required] }),
    doorCategory: new FormControl<DoorCategory>('Turkey interior series', { nonNullable: true }),
    lockModel: new FormControl<string>('Doormaster Smart Lock Handle F35 (Biometric & RFID)', { nonNullable: true, validators: [Validators.required] }),
    dimensions: new FormControl<string>('2100 × 900 × 45mm', { nonNullable: true, validators: [Validators.required] }),
    finish: new FormControl<string>('Walnut Natural Wood Grain', { nonNullable: true }),
    hardwareSpecs: new FormControl<string>('Heavy-Duty Concealed Hinges & 3-Point Lockset', { nonNullable: true }),
    shopId: new FormControl<string>('dm-branch-obeyeyie', { nonNullable: true }),
    shopBranch: new FormControl<string>('DoorMaster Obeyeyie Branch', { nonNullable: true }),
    clientName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    clientPhone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    clientEmail: new FormControl<string>('', { nonNullable: true }),
    siteAddress: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    accessInstructions: new FormControl<string>('', { nonNullable: true }),
    scheduledDate: new FormControl<string>(new Date(Date.now() + 86400000).toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
    estimatedHours: new FormControl<number>(4, { nonNullable: true, validators: [Validators.min(1)] }),
    doorPrice: new FormControl<number>(4750, { nonNullable: true }),
    installationFee: new FormControl<number>(450, { nonNullable: true }),
    amountPaidAtShop: new FormControl<number>(4750, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    paymentMethod: new FormControl<'cash' | 'momo' | 'pos_card' | 'bank_transfer' | 'dm_door'>('momo', { nonNullable: true }),
    receiptNumber: new FormControl<string>(`REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`, { nonNullable: true, validators: [Validators.required] })
  });

  readonly selectedShopDoors = signal<ShopDoorItem[]>([
    {
      id: `shop_door_${Date.now()}_1`,
      doorCategory: 'Turkey interior series',
      doorModel: 'Turkey interior DM001 Acoustic Interior Door',
      dimensions: '2100 × 900 × 45mm',
      finish: 'Walnut Natural Wood Grain',
      hardwareSpecs: 'Heavy-Duty Concealed Hinges & 3-Point Lockset',
      lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
      unitPrice: 4750,
      quantity: 1,
      isExpanded: true
    }
  ]);

  readonly totalShopDoorsPrice = computed(() => {
    return this.selectedShopDoors().reduce((acc, d) => acc + (d.unitPrice * d.quantity), 0);
  });

  readonly totalShopDoorsCount = computed(() => {
    return this.selectedShopDoors().reduce((acc, d) => acc + d.quantity, 0);
  });

  // Shop Location Settings state & reactive binding
  readonly showLocationSettingsModal = signal<boolean>(false);
  readonly isSavingLocationSettings = signal<boolean>(false);
  readonly locationSettingsFeedback = signal<string | null>(null);

  readonly locationSettingsForm = new FormGroup({
    shopName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    branchCode: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    region: new FormControl<string>('', { nonNullable: true }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true }),
    managerName: new FormControl<string>('', { nonNullable: true }),
    dispatchRadiusKm: new FormControl<number>(25, { nonNullable: true, validators: [Validators.min(1), Validators.max(200)] }),
    operatingHours: new FormControl<string>('Mon - Sat: 08:00 - 18:00', { nonNullable: true }),
    latitude: new FormControl<number>(5.6231, { nonNullable: true, validators: [Validators.required] }),
    longitude: new FormControl<number>(-0.1582, { nonNullable: true, validators: [Validators.required] })
  });

  // Shop assignment & scoping signals:
  // If the user is assigned to a shop, `/shop` locks to that shop and displays ONLY that shop's orders.
  readonly assignedShop = computed(() => this.store.userAssignedShop());
  readonly isShopLocked = computed(() => !!this.assignedShop());
  readonly selectedBranchFilter = signal<string>('all');

  readonly activeShop = computed<ShopLocationSettings>(() => {
    const locked = this.assignedShop();
    if (locked) return locked;
    const filter = this.selectedBranchFilter();
    if (filter && filter !== 'all') {
      const found = this.store.branches().find(b => String(b.id) === filter || b.branchCode === filter);
      if (found) return found;
    }
    return this.store.shopLocation();
  });

  readonly shopScopedJobs = computed<InstallationJob[]>(() => {
    if (this.assignedShop()) {
      return this.store.shopPortalJobs();
    }
    const filter = this.selectedBranchFilter();
    if (filter && filter !== 'all') {
      return this.store.jobs().filter(j => this.store.getJobShopId(j) === filter);
    }
    return this.store.jobs();
  });

  readonly currentBranch = computed(() => this.activeShop().shopName);

  onBranchChange(shopIdOrAll: string) {
    if (this.isShopLocked()) return;
    this.selectedBranchFilter.set(shopIdOrAll || 'all');
    this.currentPage.set(1);
    if (shopIdOrAll && shopIdOrAll !== 'all') {
      this.store.setActiveBranch(shopIdOrAll);
    }
  }

  countOrdersForBranch(branchId: string | number | undefined): number {
    if (!branchId) return 0;
    const idStr = String(branchId);
    return this.store.jobs().filter(j => this.store.getJobShopId(j) === idStr).length;
  }

  readonly bookedAtShopCount = computed(() => {
    return this.shopScopedJobs().filter(j => j.status === 'booked_at_shop').length;
  });

  readonly shopScopedCollections = computed(() => {
    return this.shopScopedJobs().reduce((sum, j) => sum + (j.shopBooking?.amountPaidAtShop || 0), 0);
  });

  readonly dispatchedCount = computed(() => {
    return this.shopScopedJobs().filter(j => j.status === 'dispatched' || j.status === 'on_site').length;
  });

  readonly completedAtShopCount = computed(() => {
    return this.shopScopedJobs().filter(j => j.status === 'completed' || j.status === 'bonus_awarded').length;
  });

  readonly jobsAwaitingDriver = computed(() => {
    return this.shopScopedJobs().filter(
      j =>
        !j.dispatcherId &&
        this.store.hasJobAcceptedInstallers(j) &&
        !['dispatched', 'delivered_on_site', 'on_site', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status)
    );
  });

  readonly availableStoreDispatchers = computed(() => {
    const job = this.activeAssignDriverJob();
    const targetShop = job ? this.store.getJobBranch(job) || this.activeShop() : this.activeShop();
    const targetId = String(targetShop?.id || '');
    const targetCode = targetShop?.branchCode || '';
    const branchMatched = this.store.dispatchers().filter(
      d => (targetId && d.shopId === targetId) || (targetCode && d.branchCode === targetCode)
    );
    return branchMatched.length > 0 ? branchMatched : this.store.dispatchers();
  });

  // Table filtering, pagination and sorting state
  readonly tableSearchQuery = signal<string>('');
  readonly timeFilter = signal<ShopTimeFilter>('day');
  readonly customStartDate = signal<string>('');
  readonly customEndDate = signal<string>('');
  readonly pageSize = signal<number>(10);
  readonly currentPage = signal<number>(1);
  readonly sortField = signal<ShopSortField>('date');
  readonly sortDirection = signal<SortDirection>('desc');

  private getJobTime(job: InstallationJob): number {
    const dateStr = job.shopBooking?.bookingTimestamp || job.createdAt || job.scheduledDate;
    if (!dateStr) return 0;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }

  matchesTimeFilter(job: InstallationJob, filter: ShopTimeFilter): boolean {
    if (filter === 'all') return true;
    const time = this.getJobTime(job);
    if (!time) return false;
    const jobDate = new Date(time);
    const now = new Date();

    if (filter === 'day') {
      const isSameCalendarDay =
        jobDate.getFullYear() === now.getFullYear() &&
        jobDate.getMonth() === now.getMonth() &&
        jobDate.getDate() === now.getDate();
      const isWithin24Hours = Math.abs(now.getTime() - time) <= 24 * 60 * 60 * 1000;
      return isSameCalendarDay || isWithin24Hours;
    }

    if (filter === 'week') {
      const isWithin7Days = (now.getTime() - time) <= 7 * 24 * 60 * 60 * 1000 && (time <= now.getTime() + 86400000);
      return isWithin7Days;
    }

    if (filter === 'month') {
      const isSameMonth = jobDate.getFullYear() === now.getFullYear() && jobDate.getMonth() === now.getMonth();
      const isWithin30Days = (now.getTime() - time) <= 30 * 24 * 60 * 60 * 1000 && (time <= now.getTime() + 86400000);
      return isSameMonth || isWithin30Days;
    }

    if (filter === 'year') {
      return jobDate.getFullYear() === now.getFullYear();
    }

    if (filter === 'custom') {
      const startStr = this.customStartDate();
      const endStr = this.customEndDate();
      if (startStr) {
        const s = new Date(startStr);
        s.setHours(0, 0, 0, 0);
        if (time < s.getTime()) return false;
      }
      if (endStr) {
        const e = new Date(endStr);
        e.setHours(23, 59, 59, 999);
        if (time > e.getTime()) return false;
      }
      return true;
    }

    return true;
  }

  readonly sortedJobs = computed(() => {
    const query = this.tableSearchQuery().trim().toLowerCase();
    const filter = this.timeFilter();
    const sortF = this.sortField();
    const sortD = this.sortDirection();

    const filtered = this.shopScopedJobs().filter(job => {
      if (!this.matchesTimeFilter(job, filter)) return false;

      if (query) {
        const matchId = (job.id || '').toLowerCase().includes(query);
        const matchDoor = (job.doorModel || '').toLowerCase().includes(query);
        const matchClient = (job.client?.name || '').toLowerCase().includes(query);
        const matchPhone = (job.client?.phone || '').toLowerCase().includes(query);
        const matchAddress = (job.client?.siteAddress || '').toLowerCase().includes(query);
        const matchReceipt = (job.shopBooking?.receiptNumber || '').toLowerCase().includes(query);
        const matchStatus = (job.status || '').toLowerCase().includes(query);
        if (!matchId && !matchDoor && !matchClient && !matchPhone && !matchAddress && !matchReceipt && !matchStatus) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      let diff = 0;
      if (sortF === 'id') {
        diff = (a.id || '').localeCompare(b.id || '');
      } else if (sortF === 'date') {
        diff = this.getJobTime(a) - this.getJobTime(b);
      } else if (sortF === 'door') {
        diff = (a.doorModel || '').localeCompare(b.doorModel || '');
      } else if (sortF === 'client') {
        diff = (a.client?.name || '').localeCompare(b.client?.name || '');
      } else if (sortF === 'amount') {
        const amtA = a.shopBooking?.amountPaidAtShop || 0;
        const amtB = b.shopBooking?.amountPaidAtShop || 0;
        diff = amtA - amtB;
      } else if (sortF === 'status') {
        diff = (a.status || '').localeCompare(b.status || '');
      }
      return sortD === 'asc' ? diff : -diff;
    });
  });

  readonly totalPages = computed(() => {
    const count = this.sortedJobs().length;
    const size = this.pageSize();
    return Math.max(1, Math.ceil(count / size));
  });

  readonly paginatedJobs = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.sortedJobs().slice(start, start + size);
  });

  readonly paginationInfo = computed(() => {
    const total = this.sortedJobs().length;
    if (total === 0) return { from: 0, to: 0 };
    const page = Math.min(this.currentPage(), this.totalPages());
    const size = this.pageSize();
    const from = (page - 1) * size + 1;
    const to = Math.min(page * size, total);
    return { from, to };
  });

  setTimeFilter(filter: ShopTimeFilter) {
    this.timeFilter.set(filter);
    this.currentPage.set(1);
  }

  onCustomDateChange(bound: 'start' | 'end', val: string) {
    if (bound === 'start') this.customStartDate.set(val);
    else this.customEndDate.set(val);
    this.currentPage.set(1);
  }

  clearCustomDateRange() {
    this.customStartDate.set('');
    this.customEndDate.set('');
    this.timeFilter.set('day');
    this.currentPage.set(1);
  }

  onSearchChange(query: string) {
    this.tableSearchQuery.set(query);
    this.currentPage.set(1);
  }

  onPageSizeChange(size: any) {
    this.pageSize.set(Number(size) || 10);
    this.currentPage.set(1);
  }

  toggleSort(field: ShopSortField) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  readonly activeAssignDriverJob = signal<InstallationJob | null>(null);

  readonly driverAssignForm = new FormGroup({
    dispatcherId: new FormControl<string>('disp_01', { nonNullable: true, validators: [Validators.required] }),
    truckPlate: new FormControl<string>('GT-4821-26', { nonNullable: true, validators: [Validators.required] }),
    truckModel: new FormControl<string>('Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler', { nonNullable: true }),
    deliveryNotes: new FormControl<string>('Direct store counter handover. Padded blankets applied.', { nonNullable: true }),
    estimatedDeparture: new FormControl<string>('Dispatched immediately from store', { nonNullable: true })
  });

  openScheduleModal() {
    this.newJobOpened.emit();
  }

  // Client site coordinates tracked from location map
  readonly selectedShopSiteCoordinates = signal<{ lat: number; lng: number }>({ lat: 5.5840, lng: -0.1780 });

  onShopSiteLocationSelected(loc: ClientLocationResult) {
    this.selectedShopSiteCoordinates.set({ lat: loc.lat, lng: loc.lng });
    if (loc.isExplicitUserAction) {
      this.bookingForm.patchValue({ siteAddress: loc.address });
      this.bookingForm.get('siteAddress')?.markAsDirty();
      this.bookingForm.get('siteAddress')?.markAsTouched();
    }
  }

  closeScheduleModal() {
    this.showScheduleModal.set(false);
  }

  getShopCategoryList(currentCat?: string): string[] {
    const dbCats = this.store.availableCategories().map(c => c.name);
    const doorCats = this.store.doors().map(d => d.category);
    const standardCats = [
      'Premium Villa Series',
      'Royal Series',
      'Smart Lock Doors',
      'Turkey interior series',
      'DM Interior Series',
      'Economy doors',
      'Antifade doors',
      'Mechanical Lock Doors',
      'DM Smart Lock Handle',
      'Reeded glass doors',
      'Architectural Entrance Pivot Door',
      'Solid Hardwood Double Entrance',
      'Acoustic Glazed Bi-Fold Patio Suite',
      'FD30 / FD60 Commercial Fire Door',
      'Concealed Cavity Pocket Sliding Door',
      'Frameless Glass Pivot Door'
    ];
    const set = new Set<string>();
    if (currentCat && currentCat.trim()) set.add(currentCat.trim());
    [...dbCats, ...doorCats, ...standardCats].forEach(c => {
      if (c && c.trim()) set.add(c.trim());
    });
    return Array.from(set);
  }

  inferShopCategoryFromModel(title: string): string | null {
    if (!title) return null;
    const trimmed = title.trim().toLowerCase();

    // 1. Direct match with catalog doors in store
    const matchedDoor = this.store.doors().find(d => 
      d.name.toLowerCase() === trimmed || 
      (d.modelCode && trimmed.includes(d.modelCode.toLowerCase())) ||
      trimmed.includes(d.name.toLowerCase())
    );
    if (matchedDoor && matchedDoor.category) {
      return matchedDoor.category;
    }

    // 2. Keyword pattern matching for known lines
    if (trimmed.includes('turkey')) return 'Turkey interior series';
    if (trimmed.includes('antifade') || trimmed.includes('anti-fade') || trimmed.includes('antirust')) return 'Antifade doors';
    if (trimmed.includes('villa') || trimmed.includes('aeropivot')) return 'Premium Villa Series';
    if (trimmed.includes('royal')) return 'Royal Series';
    if (trimmed.includes('smart lock handle') || trimmed.includes('lock handle') || trimmed.includes('f35') || trimmed.includes('f15') || trimmed.includes('f20')) return 'DM Smart Lock Handle';
    if (trimmed.includes('smart lock') || trimmed.includes('biometric') || trimmed.includes('digital lock')) return 'Smart Lock Doors';
    if (trimmed.includes('mechanical') || trimmed.includes('dm-l')) return 'Mechanical Lock Doors';
    if (trimmed.includes('reeded') || trimmed.includes('fluted')) return 'Reeded glass doors';
    if (trimmed.includes('economy') || trimmed.includes('china') || trimmed.includes('g805')) return 'Economy doors';
    if (trimmed.includes('interior')) return 'DM Interior Series';
    if (trimmed.includes('pivot')) return 'Architectural Entrance Pivot Door';
    if (trimmed.includes('wood') || trimmed.includes('hardwood') || trimmed.includes('timber')) return 'Solid Hardwood Double Entrance';
    if (trimmed.includes('bi-fold') || trimmed.includes('bifold') || trimmed.includes('patio')) return 'Acoustic Glazed Bi-Fold Patio Suite';
    if (trimmed.includes('fire') || trimmed.includes('fd30') || trimmed.includes('fd60')) return 'FD30 / FD60 Commercial Fire Door';
    if (trimmed.includes('pocket') || trimmed.includes('sliding') || trimmed.includes('cavity')) return 'Concealed Cavity Pocket Sliding Door';
    if (trimmed.includes('frameless')) return 'Frameless Glass Pivot Door';

    return null;
  }

  onShopDoorModelInputChange(index: number, newTitle: string) {
    const inferred = this.inferShopCategoryFromModel(newTitle);
    this.selectedShopDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return {
          ...d,
          doorModel: newTitle,
          doorCategory: inferred || d.doorCategory
        };
      });
    });
  }

  onShopDoorCatalogPick(index: number, event: Event) {
    const doorId = (event.target as HTMLSelectElement).value;
    if (!doorId) return;
    const catDoor = this.store.doors().find(d => d.id === doorId);
    if (!catDoor) return;

    this.selectedShopDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return {
          ...d,
          catalogDoorId: catDoor.id,
          doorCategory: catDoor.category,
          doorModel: `${catDoor.name} (${catDoor.modelCode})`,
          dimensions: catDoor.dimensions,
          finish: catDoor.finish,
          hardwareSpecs: catDoor.hardwareSpecs,
          unitPrice: catDoor.unitPrice
        };
      });
    });

    this.bookingForm.patchValue({
      amountPaidAtShop: this.totalShopDoorsPrice()
    });
  }

  toggleShopDoorDropdown(index: number) {
    this.selectedShopDoors.update(doors => {
      return doors.map((d, i) => i === index ? { ...d, isExpanded: !d.isExpanded } : d);
    });
  }

  addShopDoorFromCatalog(catalogDoorId?: string) {
    const catDoor = catalogDoorId ? this.store.doors().find(d => d.id === catalogDoorId) : null;
    let newDoor: ShopDoorItem;

    if (catDoor) {
      newDoor = {
        id: `shop_door_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        catalogDoorId: catDoor.id,
        doorCategory: catDoor.category,
        doorModel: `${catDoor.name} (${catDoor.modelCode})`,
        dimensions: catDoor.dimensions,
        finish: catDoor.finish,
        hardwareSpecs: catDoor.hardwareSpecs,
        lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
        unitPrice: catDoor.unitPrice,
        quantity: 1,
        isExpanded: true
      };
    } else {
      newDoor = {
        id: `shop_door_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        doorCategory: 'Premium Villa Series',
        doorModel: 'AeroPivot 900 Architectural Entrance Door',
        dimensions: '2400 × 1200 × 55mm',
        finish: 'Smoked European Oak with Matt Black PVD',
        hardwareSpecs: 'FritsJurgens System M+ Pivot, 3-Point Magnetic Lock',
        lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
        unitPrice: 5200,
        quantity: 1,
        isExpanded: true
      };
    }

    this.selectedShopDoors.update(doors => [...doors, newDoor]);
    this.bookingForm.patchValue({
      amountPaidAtShop: this.totalShopDoorsPrice()
    });
  }

  removeShopDoor(index: number) {
    if (this.selectedShopDoors().length <= 1) return;
    this.selectedShopDoors.update(doors => doors.filter((_, i) => i !== index));
    this.bookingForm.patchValue({
      amountPaidAtShop: this.totalShopDoorsPrice()
    });
  }

  changeShopDoorQty(index: number, delta: number) {
    this.selectedShopDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return { ...d, quantity: Math.max(1, d.quantity + delta) };
      });
    });
    this.bookingForm.patchValue({
      amountPaidAtShop: this.totalShopDoorsPrice()
    });
  }

  updateShopDoorField(index: number, field: keyof JobDoorItem, value: any) {
    this.selectedShopDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return { ...d, [field]: value };
      });
    });
    if (field === 'unitPrice' || field === 'quantity') {
      this.bookingForm.patchValue({
        amountPaidAtShop: this.totalShopDoorsPrice()
      });
    }
  }

  submitBooking() {
    if (!this.bookingForm.valid || this.selectedShopDoors().length === 0) {
      this.bookingForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Booking', 'Please select at least one door model and provide client contact details.');
      return;
    }
    const val = this.bookingForm.getRawValue();
    const doors = this.selectedShopDoors();
    const primaryDoor = doors[0];
    const targetBranch = this.isShopLocked()
      ? this.activeShop()
      : this.store.branches().find(b => String(b.id) === val.shopId || b.branchCode === val.shopId) || this.activeShop();

    this.store.bookInstallationByShopManager({
      doorModel: doors.map(d => `${d.quantity > 1 ? d.quantity + '× ' : ''}${d.doorModel}`).join('; '),
      doorCategory: primaryDoor.doorCategory,
      doors: doors.map(d => ({
        id: d.id,
        doorModel: d.doorModel,
        doorCategory: d.doorCategory,
        dimensions: d.dimensions,
        finish: d.finish,
        hardwareSpecs: d.hardwareSpecs,
        lockModel: d.lockModel,
        unitPrice: d.unitPrice,
        quantity: d.quantity,
        catalogDoorId: d.catalogDoorId
      })),
      lockModel: primaryDoor.lockModel,
      dimensions: primaryDoor.dimensions,
      finish: primaryDoor.finish,
      hardwareSpecs: primaryDoor.hardwareSpecs,
      shopId: String(targetBranch.id || 'dm-branch-obeyeyie'),
      branchCode: targetBranch.branchCode,
      shopBranch: targetBranch.shopName,
      clientName: val.clientName,
      clientPhone: val.clientPhone,
      clientEmail: val.clientEmail || 'client@doormaster.online',
      siteAddress: val.siteAddress,
      coordinates: this.selectedShopSiteCoordinates(),
      accessInstructions: val.accessInstructions,
      scheduledDate: val.scheduledDate,
      estimatedHours: val.estimatedHours,
      doorPrice: 0,
      installationFee: val.installationFee,
      amountPaidAtShop: val.amountPaidAtShop,
      paymentMethod: val.paymentMethod,
      receiptNumber: val.receiptNumber
    });

    this.closeScheduleModal();
    this.alert.success(
      'Installation Booked!',
      `Order booked for ${val.clientName}. Deposit of GH₵${Number(val.amountPaidAtShop).toLocaleString()} recorded via ${val.paymentMethod.toUpperCase()}.`
    );
  }

  openAssignDriverModal(job: InstallationJob) {
    if (!this.store.canCurrentRoleSelectDispatcher()) {
      this.alert.warning('Access Restricted', 'Driver selection is managed exclusively on the Shop Attendant portal.');
      return;
    }
    if (!this.store.canShopManagerAssignDriver(job)) {
      this.alert.warning('Access Restricted', 'Only the Shop Attendant who created this order can assign the Driver.');
      return;
    }
    if (!this.store.hasJobAcceptedInstallers(job)) {
      this.alert.warning(
        'Installer Acceptance Required',
        'Dispatch Driver can only be assigned after one or more assigned installers have accepted (or auto-accepted) their assignment from Operations Manager.'
      );
      return;
    }
    this.activeAssignDriverJob.set(job);
    const scopedPool = this.availableStoreDispatchers();
    const available = scopedPool.filter(d => d.status === 'available');
    const defaultDisp = available.length > 0 ? available[0] : scopedPool[0];
    if (defaultDisp) {
      this.driverAssignForm.patchValue({
        dispatcherId: defaultDisp.id,
        truckPlate: defaultDisp.assignedTruck.plate,
        truckModel: defaultDisp.assignedTruck.model
      });
    }
  }

  closeAssignDriverModal() {
    this.activeAssignDriverJob.set(null);
  }

  onDriverSelected(event: Event) {
    const dispId = (event.target as HTMLSelectElement).value;
    const disp = this.store.dispatchers().find(d => d.id === dispId);
    if (disp) {
      this.driverAssignForm.patchValue({
        dispatcherId: disp.id,
        truckPlate: disp.assignedTruck.plate,
        truckModel: disp.assignedTruck.model
      });
    }
  }

  confirmDriverDispatch() {
    const job = this.activeAssignDriverJob();
    if (!job || !this.driverAssignForm.valid) return;
    const val = this.driverAssignForm.getRawValue();

    this.store.assignDispatchDriverByShop(job.id, {
      dispatcherId: val.dispatcherId,
      truckPlate: val.truckPlate,
      truckModel: val.truckModel,
      deliveryNotes: val.deliveryNotes,
      estimatedDeparture: val.estimatedDeparture
    });

    this.closeAssignDriverModal();
    this.alert.toastSuccess('Driver Selected', `Driver assigned with transport truck ${val.truckPlate}.`);
  }

  openLocationSettingsModal() {
    const loc = this.activeShop();
    this.locationSettingsForm.patchValue({
      shopName: loc.shopName || '',
      branchCode: loc.branchCode || '',
      address: loc.address || '',
      city: loc.city || '',
      region: loc.region || '',
      phone: loc.phone || '',
      email: loc.email || '',
      managerName: loc.managerName || '',
      dispatchRadiusKm: loc.dispatchRadiusKm || 25,
      operatingHours: loc.operatingHours || 'Mon - Sat: 08:00 - 18:00',
      latitude: loc.latitude || 5.6231,
      longitude: loc.longitude || -0.1582
    });
    this.locationSettingsFeedback.set(null);
    this.showLocationSettingsModal.set(true);
  }

  closeLocationSettingsModal() {
    this.showLocationSettingsModal.set(false);
  }

  setCoordinates(lat: number, lng: number, addressPreset?: string) {
    this.locationSettingsForm.patchValue({
      latitude: lat,
      longitude: lng
    });
    if (addressPreset) {
      this.locationSettingsForm.patchValue({ address: addressPreset });
    }
  }

  detectBrowserGps() {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.locationSettingsForm.patchValue({
            latitude: Number(pos.coords.latitude.toFixed(5)),
            longitude: Number(pos.coords.longitude.toFixed(5))
          });
        },
        (err) => {
          console.warn('Geolocation failed:', err);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  }

  async saveLocationSettings() {
    if (!this.locationSettingsForm.valid) {
      this.alert.toastWarning('Incomplete Fields', 'Please fill in all required workshop location fields.');
      return;
    }
    this.isSavingLocationSettings.set(true);
    this.locationSettingsFeedback.set(null);

    const val = this.locationSettingsForm.getRawValue();
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

      this.isSavingLocationSettings.set(false);
      if (result.success) {
        const msg = result.message || 'Shop location settings saved successfully.';
        this.locationSettingsFeedback.set(msg);
        this.alert.success('Location Settings Saved', msg);
        setTimeout(() => {
          this.closeLocationSettingsModal();
        }, 1200);
      } else {
        this.alert.error('Save Failed', result.message || 'Could not update workshop location.');
      }
    } catch (err: any) {
      this.isSavingLocationSettings.set(false);
      this.alert.networkError('Network Error', 'Could not reach server. Settings saved to local storage.');
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'booked_at_shop':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'assigned':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-bold';
      case 'truck_assigned':
      case 'site_funds_dispatched':
        return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-800';
      case 'dispatched':
        return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
      case 'delivered_on_site':
      case 'on_site':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'completed':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  }

  getInstallerMemberStatusLabel(job: InstallationJob, member: AssignedInstallerTeamMember): string {
    const status = member.status || job.installerAssignmentStatus;
    if (status === 'accepted') {
      return (member.autoAccepted ?? job.installerAutoAccepted) ? 'Auto-Accepted' : 'Accepted';
    }
    if (status === 'rejected') {
      return 'Declined';
    }
    return `${this.store.formatInstallerRemaining(job, member)} Pending`;
  }

  getInstallerMemberBadgeClass(job: InstallationJob, member: AssignedInstallerTeamMember): string {
    const status = member.status || job.installerAssignmentStatus;
    if (status === 'accepted') {
      return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
    if (status === 'rejected') {
      return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
    return 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  }

  getInstallerMemberIcon(job: InstallationJob, member: AssignedInstallerTeamMember): string {
    const status = member.status || job.installerAssignmentStatus;
    if (status === 'accepted') return 'check_circle';
    if (status === 'rejected') return 'cancel';
    return 'schedule';
  }

  getFirstName(name?: string | null): string {
    if (!name) return '';
    const clean = name.trim();
    if (!clean) return '';
    return clean.split(/\s+/)[0];
  }
}
