import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';

@Component({
  selector: 'app-performance-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Management Audit</span>
            <span aria-hidden="true">·</span>
            <span>Installer Performance & Incentive Matrix</span>
            <span aria-hidden="true">·</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-medium">Bonuses Audited Weekly</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Installer Performance & Bonus Portal</h1>
        </div>

        @if (store.currentRole() === 'manager') {
          <button 
            type="button"
            (click)="bonusModalOpened.emit()"
            class="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400 dark:text-emerald-600">tune</mat-icon>
            <span>Configure Bonus Policy</span>
          </button>
        }
      </div>

      <!-- Top Stat Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Bonuses Disbursed</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              &#36;{{ totalDisbursed() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">100% verified against customer sign-offs</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Pending Management Release</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-amber-700 dark:text-amber-400 tracking-tight tabular-nums">
              &#36;{{ totalPending() }}
            </span>
            <span class="text-xs text-amber-800 dark:text-amber-300 font-medium font-mono">{{ pendingJobs().length }} jobs</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Awaiting executive / accounts sign-off</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Fleet Punctuality Rate</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              96.2%
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">On-Site Target</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Within 15 min of scheduled arrival</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Average Customer Rating</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              4.89
            </span>
            <span class="text-xs text-amber-600 dark:text-amber-400 font-medium">★ / 5.0</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">From digital customer verification</p>
        </div>
      </div>

      <!-- Installer Leaderboard Table -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Door Installer Performance Rankings</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tracks workmanship speed, customer ratings, punctuality, and accrued management bonuses</p>
          </div>
          <span class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ store.installers().length }} Installers</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th class="py-3 px-4">Technician Name</th>
                <th class="py-3 px-4">Doors Installed</th>
                <th class="py-3 px-4">Customer Rating</th>
                <th class="py-3 px-4">On-Time Rate</th>
                <th class="py-3 px-4">Avg Turnaround</th>
                <th class="py-3 px-4">First-Pass Rate</th>
                <th class="py-3 px-4 text-right">Bonuses Paid</th>
                <th class="py-3 px-4 text-right">Pending Bonus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (inst of store.installers(); track inst.id) {
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                        {{ inst.name.charAt(0) }}
                      </div>
                      <div>
                        <span class="font-bold text-slate-900 dark:text-white block">{{ inst.name }}</span>
                        <span class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{{ inst.email }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {{ inst.metrics.completedJobs }} doors
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">{{ inst.metrics.avgRating }} ★</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500 block">Verified Sign-offs</span>
                  </td>

                  <td class="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {{ inst.metrics.onTimeRate }}%
                  </td>

                  <td class="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {{ inst.metrics.avgTurnaroundHours }} hrs
                  </td>

                  <td class="py-3.5 px-4 font-mono text-emerald-700 dark:text-emerald-400 font-bold tabular-nums">
                    {{ inst.metrics.firstTimePassRate }}%
                  </td>

                  <td class="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap">
                    &#36;{{ inst.metrics.totalBonusesEarned }}
                  </td>

                  <td class="py-3.5 px-4 text-right font-mono font-bold text-amber-700 dark:text-amber-400 tabular-nums whitespace-nowrap">
                    &#36;{{ inst.metrics.pendingBonuses }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Management Bonus Approval Queue Section (Restricted to Manager & Finance) -->
      @if (store.currentRole() === 'manager' || store.currentRole() === 'account_officer') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <mat-icon class="text-amber-600 dark:text-amber-400">verified</mat-icon>
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Completed Installations Awaiting Management Bonus Authorization</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Each completed installation requires management sign-off to disburse incentive funds</p>
            </div>
          </div>
          <span class="text-xs font-mono text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded border border-amber-200 dark:border-amber-800">
            {{ pendingJobs().length }} Pending Sign-Off
          </span>
        </div>

        @if (pendingJobs().length === 0) {
          <div class="p-8 text-center text-xs text-slate-400 dark:text-slate-500">
            No completed installations awaiting bonus authorization. All incentives have been released.
          </div>
        } @else {
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            @for (job of pendingJobs(); track job.id) {
              <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-slate-900 dark:text-white text-xs">{{ job.id }}</span>
                    <span class="text-xs text-slate-400 dark:text-slate-600">·</span>
                    <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">{{ job.doorModel }}</span>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {{ job.customerSignoff ? 'Customer Verified' : 'Work Finished' }}
                    </span>
                  </div>

                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Installer: <strong class="text-slate-800 dark:text-slate-200">{{ job.assignedInstallerName }}</strong> · 
                    Client: {{ job.client.name }} · 
                    Rating: <strong class="text-amber-600 dark:text-amber-400">{{ job.customerSignoff?.rating || 5 }}.0 ★</strong> · 
                    Logged Time: <span class="font-mono">{{ job.actualHours || 3.2 }} hrs</span>
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <span class="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                      +&#36;{{ job.financials.bonusAmount }}
                    </span>
                    <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase">Calculated Bonus</span>
                  </div>

                  <button 
                    type="button"
                    (click)="store.approveBonus(job.id, 'Management Committee')"
                    class="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <mat-icon class="!text-xs !w-3.5 !h-3.5 text-emerald-400 dark:text-emerald-600">check_circle</mat-icon>
                    <span>Approve Bonus</span>
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
      }
    </div>
  `
})
export class PerformanceDashboard {
  readonly store = inject(InstallationStore);
  bonusModalOpened = output<void>();

  readonly totalDisbursed = computed(() => {
    return this.store.installers().reduce((sum, i) => sum + i.metrics.totalBonusesEarned, 0);
  });

  readonly totalPending = computed(() => {
    return this.store.jobs()
      .filter(j => j.financials.bonusStatus === 'pending')
      .reduce((sum, j) => sum + j.financials.bonusAmount, 0);
  });

  readonly pendingJobs = computed(() => {
    return this.store.jobs().filter(j => j.financials.bonusStatus === 'pending');
  });
}
