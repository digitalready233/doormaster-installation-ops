import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { InstallationJob } from '../../models/installation.model';

type DateFilter = 'today' | 'week' | 'month' | 'year' | 'custom' | 'all';

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="space-y-4">
      
      <!-- ======================================================================= -->
      <!-- TOP HEADER & COMPACT METRICS BAR                                        -->
      <!-- ======================================================================= -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <mat-icon class="!text-xl text-emerald-600 dark:text-emerald-400">work</mat-icon>
              <span>Work Assignments</span>
            </h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {{ filteredJobs().length }} of {{ allJobs().length }} tasks
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Operational field dispatch, installer assignments, and live task progress
          </p>
        </div>

        <!-- Quick Summary Stats Chips -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            (click)="setStatusFilter('all')"
            class="px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border"
            [class]="statusFilter() === 'all' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent shadow-2xs font-bold' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50'"
          >
            All: <strong class="font-bold">{{ allJobs().length }}</strong>
          </button>
          
          <button
            type="button"
            (click)="setStatusFilter('in_progress')"
            class="px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border flex items-center gap-1"
            [class]="statusFilter() === 'in_progress' ? 'bg-cyan-600 text-white border-transparent shadow-2xs font-bold' : 'bg-white dark:bg-slate-900 text-cyan-700 dark:text-cyan-400 border-slate-200 dark:border-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            In Progress: <strong>{{ inProgressCount() }}</strong>
          </button>

          <button
            type="button"
            (click)="setStatusFilter('completed')"
            class="px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border flex items-center gap-1"
            [class]="statusFilter() === 'completed' ? 'bg-emerald-600 text-white border-transparent shadow-2xs font-bold' : 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'"
          >
            Done: <strong>{{ completedCount() }}</strong>
          </button>

          <button
            type="button"
            (click)="setInstallerFilter('unassigned')"
            class="px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border flex items-center gap-1"
            [class]="installerFilter() === 'unassigned' ? 'bg-amber-600 text-white border-transparent shadow-2xs font-bold' : 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 border-slate-200 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/30'"
          >
            Unassigned: <strong>{{ unassignedCount() }}</strong>
          </button>
        </div>
      </div>

      <!-- ======================================================================= -->
      <!-- COMPACT FILTER CONTROLS BAR (Single Row)                                -->
      <!-- ======================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 sm:p-2 shadow-2xs">
        <div class="flex items-center gap-2 flex-wrap lg:flex-nowrap text-xs py-0.5">
          
          <!-- 1. Search Bar -->
          <div class="relative shrink-0 w-full sm:w-52">
            <mat-icon class="!text-xs text-slate-400 absolute left-2 top-2">search</mat-icon>
            <input
              type="text"
              [value]="searchQuery()"
              (input)="searchQuery.set(($any($event.target)).value)"
              placeholder="Filter by ID, client, door..."
              class="w-full pl-7 pr-7 h-7 text-[11px] bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            @if (searchQuery()) {
              <button
                type="button"
                (click)="searchQuery.set('')"
                class="absolute right-1.5 top-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <mat-icon class="!text-xs">close</mat-icon>
              </button>
            }
          </div>

          <!-- 2. Date Range Segmented Buttons -->
          <div class="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            @for (opt of dateOptions; track opt.value) {
              <button
                type="button"
                (click)="setDateFilter(opt.value)"
                class="px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap"
                [class]="dateFilter() === opt.value ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                [title]="'Filter tasks scheduled for ' + opt.label"
              >
                {{ opt.label }}
              </button>
            }
          </div>

          @if (dateFilter() === 'custom') {
            <div class="inline-flex items-center gap-1.5 px-2 py-0.5 h-7 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] shrink-0">
              <span class="text-[10px] text-slate-400 font-mono">From:</span>
              <input
                type="date"
                [ngModel]="customStartDate()"
                (ngModelChange)="onCustomDateChange('start', $event)"
                [ngModelOptions]="{standalone: true}"
                class="bg-transparent text-slate-800 dark:text-slate-200 text-[11px] focus:outline-none cursor-pointer"
              />
              <span class="text-[10px] text-slate-400 font-mono">To:</span>
              <input
                type="date"
                [ngModel]="customEndDate()"
                (ngModelChange)="onCustomDateChange('end', $event)"
                [ngModelOptions]="{standalone: true}"
                class="bg-transparent text-slate-800 dark:text-slate-200 text-[11px] focus:outline-none cursor-pointer"
              />
              @if (customStartDate() || customEndDate()) {
                <button
                  type="button"
                  (click)="clearCustomDateRange()"
                  class="text-[10px] text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                >
                  Clear
                </button>
              }
            </div>
          }

          <!-- 3. Status Dropdown -->
          <div class="relative shrink-0">
            <select
              [value]="statusFilter()"
              (change)="statusFilter.set(($any($event.target)).value)"
              class="text-[11px] font-medium h-7 pl-2.5 pr-7 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[145px] truncate"
            >
              <option value="all">All Statuses ({{ allJobs().length }})</option>
              @for (st of statusOptions(); track st.value) {
                <option [value]="st.value">{{ st.label }} ({{ st.count }})</option>
              }
            </select>
          </div>

          <!-- 4. Installer Dropdown -->
          <div class="relative shrink-0">
            <select
              [value]="installerFilter()"
              (change)="installerFilter.set(($any($event.target)).value)"
              class="text-[11px] font-medium h-7 pl-2.5 pr-7 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[155px] truncate"
            >
              <option value="all">All Installers</option>
              @if (store.currentInstallerId()) {
                <option value="my_tasks">★ My Assigned Tasks</option>
              }
              <option value="unassigned">⚠️ Unassigned ({{ unassignedCount() }})</option>
              <optgroup label="Active Installers">
                @for (tech of installerOptions(); track tech.id) {
                  <option [value]="tech.id">{{ tech.name }} ({{ tech.count }})</option>
                }
              </optgroup>
            </select>
          </div>

          <!-- 5. Branch / Workshop Dropdown -->
          <div class="relative shrink-0">
            <select
              [value]="branchFilter()"
              (change)="branchFilter.set(($any($event.target)).value)"
              class="text-[11px] font-medium h-7 pl-2.5 pr-7 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[140px] truncate"
            >
              <option value="all">All Branches</option>
              @for (branch of branchOptions(); track branch.name) {
                <option [value]="branch.name">{{ branch.name }} ({{ branch.count }})</option>
              }
            </select>
          </div>

          <!-- 6. Assignment Status Dropdown -->
          <div class="relative shrink-0">
            <select
              [value]="assignmentStatusFilter()"
              (change)="assignmentStatusFilter.set(($any($event.target)).value)"
              class="text-[11px] font-medium h-7 pl-2.5 pr-7 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[145px] truncate"
            >
              <option value="all">All Assignment States</option>
              <option value="accepted">Accepted by Tech</option>
              <option value="pending">Pending Acceptance</option>
              <option value="rejected">Rejected by Tech</option>
            </select>
          </div>

          <!-- 7. Page Size & Reset Filters -->
          <div class="flex items-center gap-2 ml-auto shrink-0">
            <div class="flex items-center gap-1.5 text-[11px]">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Page Size:</span>
              <select
                [ngModel]="pageSize()"
                (ngModelChange)="onPageSizeChange($event)"
                [ngModelOptions]="{standalone: true}"
                class="h-7 px-2 text-[11px] font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option [ngValue]="5">5</option>
                <option [ngValue]="10">10</option>
                <option [ngValue]="25">25</option>
                <option [ngValue]="50">50</option>
                <option [ngValue]="100">100</option>
              </select>
            </div>

            @if (hasActiveFilters()) {
              <button
                type="button"
                (click)="resetFilters()"
                class="h-7 px-2.5 rounded-lg text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
                title="Clear all active filters"
              >
                <mat-icon class="!text-xs">filter_alt_off</mat-icon>
                <span>Reset</span>
              </button>
            }
          </div>
        </div>
      </div>

      <!-- ======================================================================= -->
      <!-- ULTRA-COMPACT TABLE (Height Reduced by ~75% for 1/4 Sleek Height)        -->
      <!-- ======================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
        <div class="overflow-x-auto max-h-[calc(100vh-270px)] overflow-y-auto">
          <table class="w-full text-left border-collapse text-[11px]">
            <thead class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xs">
              <tr class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th class="py-1.5 px-3">Job ID</th>
                <th class="py-1.5 px-3">Door / Specification</th>
                <th class="py-1.5 px-3">Client & Location</th>
                <th class="py-1.5 px-3">Installer(s)</th>
                <th class="py-1.5 px-3">Assignment</th>
                <th class="py-1.5 px-3">Status</th>
                <th class="py-1.5 px-3">Branch</th>
                <th class="py-1.5 px-3">Scheduled</th>
                @if (canViewBonus()) {
                  <th class="py-1.5 px-3 text-right">Bonus</th>
                }
                <th class="py-1.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
              @for (job of paginatedJobs(); track job.id) {
                <tr 
                  (click)="onSelectJob(job.id)"
                  class="hover:bg-slate-50/90 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <!-- 1. Job ID -->
                  <td class="py-1.5 px-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    <span class="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {{ job.id }}
                    </span>
                  </td>

                  <!-- 2. Door Model & Specs -->
                  <td class="py-1.5 px-3 max-w-[220px]">
                    <div class="flex items-center gap-1.5 truncate" [title]="job.doorModel">
                      <span class="font-bold text-slate-900 dark:text-white truncate">{{ store.formatDoorColumnLabel(job) }}</span>
                      <span class="text-[10px] text-slate-400 truncate hidden md:inline">· {{ job.dimensions }}</span>
                    </div>
                  </td>

                  <!-- 3. Client & Site Address -->
                  <td class="py-1.5 px-3 max-w-[200px]">
                    <div class="flex items-center gap-1.5 truncate">
                      <span class="font-semibold text-slate-800 dark:text-slate-200 truncate">{{ job.client.name }}</span>
                      <span class="text-[10px] text-slate-400 truncate hidden lg:inline">· {{ job.client.siteAddress }}</span>
                    </div>
                  </td>

                  <!-- 4. Assigned Installer -->
                  <td class="py-1.5 px-3 whitespace-nowrap">
                    @if (job.assignedInstallerIds && job.assignedInstallerIds.length > 1) {
                      <span class="inline-flex items-center gap-1 text-slate-800 dark:text-slate-200 font-medium">
                        <span class="px-1 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                          Team ({{ job.assignedInstallerIds.length }})
                        </span>
                        <span>{{ job.assignedInstallerName }}</span>
                      </span>
                    } @else if (job.assignedInstallerId || (job.assignedInstallerIds && job.assignedInstallerIds.length === 1)) {
                      <span class="text-slate-800 dark:text-slate-200 font-medium">{{ job.assignedInstallerName || 'Installer' }}</span>
                    } @else {
                      <span class="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                        <mat-icon class="!text-[12px]">warning</mat-icon>
                        <span>Unassigned</span>
                      </span>
                    }
                  </td>

                  <!-- 5. Assignment Status -->
                  <td class="py-1.5 px-3 whitespace-nowrap">
                    @if (job.installerAssignmentStatus === 'accepted') {
                      <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        Accepted
                      </span>
                    } @else if (job.installerAssignmentStatus === 'rejected') {
                      <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-800" [title]="job.installerRejectReason || 'Rejected'">
                        Rejected
                      </span>
                    } @else {
                      <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        Pending
                      </span>
                    }
                  </td>

                  <!-- 6. Status Badge -->
                  <td class="py-1.5 px-3 whitespace-nowrap">
                    <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider" [class]="getStatusClass(job.status)">
                      {{ formatStatus(job.status) }}
                    </span>
                  </td>

                  <!-- 7. Branch -->
                  <td class="py-1.5 px-3 whitespace-nowrap text-[10px] text-slate-500 dark:text-slate-400">
                    {{ job.shopBranch || 'Accra Central' }}
                  </td>

                  <!-- 8. Scheduled Date / Time -->
                  <td class="py-1.5 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap text-[10px]">
                    {{ job.scheduledDate || 'Scheduled' }}
                  </td>

                  <!-- 9. Bonus -->
                  @if (canViewBonus()) {
                    <td class="py-1.5 px-3 text-right font-mono font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      GH₵{{ job.financials.bonusAmount }}
                    </td>
                  }

                  <!-- 10. Action Button -->
                  <td class="py-1.5 px-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      (click)="onOpenDetails($event, job.id)"
                      class="px-2.5 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-[10px] font-bold transition-all shadow-xs cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td [attr.colspan]="canViewBonus() ? 10 : 9" class="py-10 text-center text-slate-400 dark:text-slate-500">
                    <mat-icon class="!text-3xl text-slate-300 dark:text-slate-600 mb-1">filter_list_off</mat-icon>
                    <p class="font-bold text-xs text-slate-600 dark:text-slate-400">No tasks match the selected filter criteria.</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">Try choosing a different date range, status, installer, or resetting search.</p>
                    @if (hasActiveFilters()) {
                      <button
                        type="button"
                        (click)="resetFilters()"
                        class="mt-3 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-1 shadow-xs"
                      >
                        <mat-icon class="!text-xs">refresh</mat-icon>
                        <span>Reset All Filters</span>
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls Footer -->
        <div class="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span>Showing {{ paginationInfo().from }} to {{ paginationInfo().to }} of {{ filteredJobs().length }} tasks</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button
              type="button"
              (click)="prevPage()"
              [disabled]="currentPage() <= 1"
              class="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium flex items-center gap-0.5 cursor-pointer text-[11px]"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">chevron_left</mat-icon>
              <span>Prev</span>
            </button>
            <span class="px-2 font-mono font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
              Page {{ currentPage() }} of {{ totalPages() }}
            </span>
            <button
              type="button"
              (click)="nextPage()"
              [disabled]="currentPage() >= totalPages()"
              class="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium flex items-center gap-0.5 cursor-pointer text-[11px]"
            >
              <span>Next</span>
              <mat-icon class="!text-xs !w-3.5 !h-3.5">chevron_right</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Work {
  readonly store = inject(InstallationStore);
  readonly jobSelected = output<string>();

  readonly canViewBonus = computed(() => {
    const role = this.store.currentRole();
    if (['client', 'installer', 'shop_manager', 'dispatcher'].includes(role)) {
      return false;
    }
    return this.store.currentRoleDefinition().permissions.canApproveBonuses || role === 'admin' || role === 'account_officer';
  });

  // Filter & pagination signals (Day default, All last)
  readonly dateFilter = signal<DateFilter>('today');
  readonly customStartDate = signal<string>('');
  readonly customEndDate = signal<string>('');
  readonly statusFilter = signal<string>('all');
  readonly installerFilter = signal<string>('all');
  readonly branchFilter = signal<string>('all');
  readonly assignmentStatusFilter = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly pageSize = signal<number>(10);
  readonly currentPage = signal<number>(1);

  readonly dateOptions: { value: DateFilter; label: string }[] = [
    { value: 'today', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
    { value: 'custom', label: 'Date Range' },
    { value: 'all', label: 'All' }
  ];

  /**
   * Role-scoped jobs permitted for the current portal
   */
  readonly allJobs = computed(() => {
    const role = this.store.currentRole();
    if (role === 'dispatcher') {
      return this.store.dispatcherJobs();
    }
    if (role === 'installer') {
      return this.store.jobs().filter(j => this.store.isJobAssignedToCurrentInstaller(j));
    }
    return this.store.jobs();
  });

  /**
   * Status options dynamically derived and counted from live jobs
   */
  readonly statusOptions = computed(() => {
    const jobs = this.allJobs();
    const map = new Map<string, number>();
    for (const j of jobs) {
      if (j.status) {
        map.set(j.status, (map.get(j.status) || 0) + 1);
      }
    }
    return Array.from(map.entries()).map(([value, count]) => ({
      value,
      count,
      label: this.formatStatus(value)
    }));
  });

  /**
   * Installers options dynamically derived and counted from live jobs and installers list
   */
  readonly installerOptions = computed(() => {
    const installers = this.store.installers();
    const jobs = this.allJobs();

    return installers.map(inst => {
      const count = jobs.filter(j =>
        j.assignedInstallerId === inst.id ||
        (j.assignedInstallerIds && j.assignedInstallerIds.includes(inst.id)) ||
        (j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(inst.name.toLowerCase()))
      ).length;

      return {
        id: inst.id,
        name: inst.name,
        count
      };
    });
  });

  /**
   * Branch options dynamically derived and counted from live jobs
   */
  readonly branchOptions = computed(() => {
    const jobs = this.allJobs();
    const map = new Map<string, number>();
    for (const j of jobs) {
      const b = j.shopBranch || 'Accra Flagship Showroom';
      map.set(b, (map.get(b) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  });

  /**
   * Metric counters
   */
  readonly inProgressCount = computed(() =>
    this.allJobs().filter(j => j.status === 'in_progress' || j.status === 'on_site' || j.status === 'dispatched').length
  );

  readonly completedCount = computed(() =>
    this.allJobs().filter(j => j.status === 'completed' || j.status === 'bonus_awarded').length
  );

  readonly unassignedCount = computed(() =>
    this.allJobs().filter(j => !j.assignedInstallerId && (!j.assignedInstallerIds || j.assignedInstallerIds.length === 0)).length
  );

  /**
   * Whether any non-default filter is currently applied
   */
  readonly hasActiveFilters = computed(() => {
    return (
      this.dateFilter() !== 'all' ||
      this.statusFilter() !== 'all' ||
      this.installerFilter() !== 'all' ||
      this.branchFilter() !== 'all' ||
      this.assignmentStatusFilter() !== 'all' ||
      this.searchQuery().trim().length > 0
    );
  });

  /**
   * Master reactive filtered jobs computed signal
   */
  readonly filteredJobs = computed(() => {
    const jobs = this.allJobs();
    const df = this.dateFilter();
    const sf = this.statusFilter();
    const inf = this.installerFilter();
    const bf = this.branchFilter();
    const asf = this.assignmentStatusFilter();
    const q = this.searchQuery().toLowerCase().trim();
    const currentInstId = this.store.currentInstallerId();

    return jobs.filter(job => {
      // 1. Status Filter
      if (sf !== 'all' && job.status !== sf) {
        return false;
      }

      // 2. Installer Filter
      if (inf !== 'all') {
        if (inf === 'my_tasks') {
          if (!currentInstId) return false;
          const matchesCurrent =
            job.assignedInstallerId === currentInstId ||
            (job.assignedInstallerIds && job.assignedInstallerIds.includes(currentInstId));
          if (!matchesCurrent) return false;
        } else if (inf === 'unassigned') {
          const hasInstaller = Boolean(
            job.assignedInstallerId || (job.assignedInstallerIds && job.assignedInstallerIds.length > 0)
          );
          if (hasInstaller) return false;
        } else {
          // Specific installer ID
          const matches =
            job.assignedInstallerId === inf ||
            (job.assignedInstallerIds && job.assignedInstallerIds.includes(inf));
          if (!matches) return false;
        }
      }

      // 3. Branch Filter
      if (bf !== 'all') {
        const branch = job.shopBranch || 'Accra Flagship Showroom';
        if (branch.toLowerCase() !== bf.toLowerCase()) return false;
      }

      // 4. Assignment Acceptance Status
      if (asf !== 'all') {
        const status = job.installerAssignmentStatus || 'pending';
        if (status !== asf) return false;
      }

      // 5. Date Range Filter
      if (df !== 'all') {
        if (!this.matchesDateRange(job, df)) return false;
      }

      // 6. Search Query
      if (q) {
        const searchable = [
          job.id,
          job.doorModel,
          job.doorCategory,
          job.client?.name,
          job.client?.phone,
          job.client?.email,
          job.client?.siteAddress,
          job.assignedInstallerName,
          job.shopBranch,
          job.status,
          job.scheduledDate
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  });

  /**
   * Accurate date range evaluation against job timeline
   */
  private matchesDateRange(job: InstallationJob, filter: DateFilter): boolean {
    const jobDate = this.extractJobDate(job);
    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    if (filter === 'today') {
      return jobDate >= startOfDay && jobDate < endOfDay;
    }

    if (filter === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), diff);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      return jobDate >= startOfWeek && jobDate < endOfWeek;
    }

    if (filter === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return jobDate >= startOfMonth && jobDate < endOfMonth;
    }

    if (filter === 'year') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
      return jobDate >= startOfYear && jobDate < endOfYear;
    }

    if (filter === 'custom') {
      const time = jobDate.getTime();
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

  /**
   * Safely extract date from scheduledDate, scheduledTime, or createdAt
   */
  private extractJobDate(job: InstallationJob): Date {
    const now = new Date();

    const schedText = `${job.scheduledDate || ''} ${(job as any).scheduledTime || ''}`.toLowerCase();
    if (schedText.includes('today')) return now;
    if (schedText.includes('tomorrow')) {
      const t = new Date(now);
      t.setDate(t.getDate() + 1);
      return t;
    }

    if (job.scheduledDate) {
      const d = new Date(job.scheduledDate);
      if (!isNaN(d.getTime())) return d;
    }

    if (job.createdAt) {
      const d = new Date(job.createdAt);
      if (!isNaN(d.getTime())) return d;
    }

    if (job.shopBooking?.bookingTimestamp) {
      const d = new Date(job.shopBooking.bookingTimestamp);
      if (!isNaN(d.getTime())) return d;
    }

    return now;
  }

  /**
   * Helper formatting status keys to human titles
   */
  formatStatus(status: string): string {
    if (!status) return 'Unknown';
    switch (status) {
      case 'booked_at_shop': return 'Booked at Shop';
      case 'truck_assigned': return 'Truck Assigned';
      case 'assigned': return 'Assigned';
      case 'dispatched': return 'Dispatched';
      case 'on_site': return 'On Site';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'bonus_awarded': return 'Bonus Awarded';
      case 'cancelled': return 'Cancelled';
      default: return status.replace(/_/g, ' ');
    }
  }

  getStatusClass(status: InstallationJob['status']): string {
    switch (status) {
      case 'completed':
      case 'bonus_awarded':
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'assigned':
      case 'truck_assigned':
        return 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'dispatched':
      case 'on_site':
      case 'in_progress':
        return 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  }

  readonly totalPages = computed(() => {
    const count = this.filteredJobs().length;
    const size = this.pageSize();
    return Math.max(1, Math.ceil(count / size));
  });

  readonly paginatedJobs = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.filteredJobs().slice(start, start + size);
  });

  readonly paginationInfo = computed(() => {
    const total = this.filteredJobs().length;
    if (total === 0) return { from: 0, to: 0 };
    const page = Math.min(this.currentPage(), this.totalPages());
    const size = this.pageSize();
    const from = (page - 1) * size + 1;
    const to = Math.min(page * size, total);
    return { from, to };
  });

  setDateFilter(filter: DateFilter) {
    this.dateFilter.set(filter);
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
    this.dateFilter.set('today');
    this.currentPage.set(1);
  }

  onPageSizeChange(size: any) {
    this.pageSize.set(Number(size) || 10);
    this.currentPage.set(1);
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

  setStatusFilter(status: string) {
    this.statusFilter.set(status);
    this.currentPage.set(1);
  }

  setInstallerFilter(filter: string) {
    this.installerFilter.set(filter);
    this.currentPage.set(1);
  }

  resetFilters() {
    this.dateFilter.set('today');
    this.customStartDate.set('');
    this.customEndDate.set('');
    this.statusFilter.set('all');
    this.installerFilter.set('all');
    this.branchFilter.set('all');
    this.assignmentStatusFilter.set('all');
    this.searchQuery.set('');
    this.currentPage.set(1);
  }

  onSelectJob(jobId: string) {
    this.jobSelected.emit(jobId);
  }

  onOpenDetails(e: Event, jobId: string) {
    e.stopPropagation();
    this.jobSelected.emit(jobId);
  }
}
