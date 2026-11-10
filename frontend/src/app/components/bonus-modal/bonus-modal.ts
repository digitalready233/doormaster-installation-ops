import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { InstallationJob } from '../../models/installation.model';

@Component({
  selector: 'app-bonus-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule, DecimalPipe],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-slate-100">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm !w-4 !h-4">military_tech</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Management Bonus Policy & Authorization</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Configure incentive rules & approve installer disbursements</p>
            </div>
          </div>
          <button (click)="closed.emit()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded">
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <div class="p-6 overflow-y-auto space-y-6">
          <!-- Pending Bonus Approvals Section -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Jobs Pending Management Bonus Approval</h4>
              <span class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {{ pendingJobs().length }} Pending Release
              </span>
            </div>

            @if (pendingJobs().length === 0) {
              <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
                All completed installations currently have bonuses authorized and paid out.
              </div>
            } @else {
              <div class="space-y-2">
                @for (job of pendingJobs(); track job.id) {
                  <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-between gap-4">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-slate-900 dark:text-white">{{ job.id }}</span>
                        <span class="text-xs text-slate-600 dark:text-slate-300">· {{ job.doorModel }}</span>
                      </div>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400">
                        Installer: <strong class="text-slate-700 dark:text-slate-200">{{ job.assignedInstallerName }}</strong> · Customer Rating: 
                        <strong class="text-amber-600 dark:text-amber-400">{{ job.customerSignoff?.rating || 5 }}.0 ★</strong> · On-site: {{ job.actualHours || 3 }} hrs
                      </p>
                    </div>

                    <div class="flex items-center gap-3">
                      <div class="text-right">
                        <span class="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                          +GH₵{{ job.financials.bonusAmount }}
                        </span>
                        <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase">Eligible Bonus</span>
                      </div>

                      <button 
                        type="button"
                        (click)="authorizeBonus(job)"
                        class="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">verified</mat-icon>
                        <span>Authorize</span>
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Formula Configuration -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Agreed Management Incentive Matrix</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Formula parameters applied to calculate installer performance payout</p>
              </div>
              <button 
                type="button" 
                (click)="toggleEditConfig()"
                class="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline"
              >
                {{ isEditingConfig() ? 'Cancel' : 'Edit Thresholds' }}
              </button>
            </div>

            @if (!isEditingConfig()) {
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Standard Door Base</span>
                  <span class="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">GH₵{{ store.bonusRules().baseBonusStandardDoor }}</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Pass initial QA inspection</p>
                </div>

                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Architectural / Pivot</span>
                  <span class="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">GH₵{{ store.bonusRules().baseBonusArchitecturalDoor }}</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Heavy doors, Bi-folds & Pivots</p>
                </div>

                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">5-Star Customer Boost</span>
                  <span class="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">+{{ (store.bonusRules().ratingBonusMultiplier - 1) * 100 | number:'1.0-0' }}%</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Multiplies base on 5★ review</p>
                </div>

                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">On-Time & Photo Bonus</span>
                  <span class="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">+GH₵{{ store.bonusRules().onTimeBonusAmount + store.bonusRules().cleanPhotoBonusAmount }}</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Punctual clock out & clear photos</p>
                </div>
              </div>
            } @else {
              <form [formGroup]="configForm" (ngSubmit)="saveConfig()" class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="baseStandardInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Door Base (GH₵)</label>
                    <input id="baseStandardInput" type="number" formControlName="baseStandard" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label for="baseArchitecturalInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Architectural Pivot Base (GH₵)</label>
                    <input id="baseArchitecturalInput" type="number" formControlName="baseArchitectural" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label for="onTimeAmountInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">On-Time Bonus (GH₵)</label>
                    <input id="onTimeAmountInput" type="number" formControlName="onTimeAmount" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label for="photoAmountInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Clean Photo Bonus (GH₵)</label>
                    <input id="photoAmountInput" type="number" formControlName="photoAmount" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                </div>

                <div class="flex justify-end gap-2 pt-2">
                  <button type="button" (click)="isEditingConfig.set(false)" class="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Cancel</button>
                  <button type="submit" class="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-lg">Save Thresholds</button>
                </div>
              </form>
            }
          </div>
        </div>

        <div class="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Bonus rules approved by DoorMaster Executive & Accounts Officers</span>
          <button (click)="closed.emit()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-bold">
            Done
          </button>
        </div>
      </div>
    </div>
  `
})
export class BonusModal {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  closed = output<void>();

  readonly isEditingConfig = signal(false);

  readonly configForm = new FormGroup({
    baseStandard: new FormControl(95, [Validators.required]),
    baseArchitectural: new FormControl(160, [Validators.required]),
    onTimeAmount: new FormControl(40, [Validators.required]),
    photoAmount: new FormControl(25, [Validators.required])
  });

  pendingJobs = () => {
    return this.store.jobs().filter(j => j.financials.bonusStatus === 'pending');
  };

  toggleEditConfig() {
    this.isEditingConfig.update(v => !v);
    if (this.isEditingConfig()) {
      const r = this.store.bonusRules();
      this.configForm.patchValue({
        baseStandard: r.baseBonusStandardDoor,
        baseArchitectural: r.baseBonusArchitecturalDoor,
        onTimeAmount: r.onTimeBonusAmount,
        photoAmount: r.cleanPhotoBonusAmount
      });
    }
  }

  saveConfig() {
    if (this.configForm.invalid) return;
    const v = this.configForm.value;
    this.store.bonusRules.set({
      baseBonusStandardDoor: Number(v.baseStandard) || 95,
      baseBonusArchitecturalDoor: Number(v.baseArchitectural) || 160,
      ratingBonusMultiplier: 1.25,
      onTimeBonusAmount: Number(v.onTimeAmount) || 40,
      cleanPhotoBonusAmount: Number(v.photoAmount) || 25
    });
    this.isEditingConfig.set(false);
    this.alert.toastSuccess('Your work has been saved', 'Management incentive thresholds updated.');
  }

  authorizeBonus(job: InstallationJob) {
    this.store.approveBonus(job.id, 'Management Committee');
    this.alert.toastSuccess('Bonus Authorized', `Disbursed GH₵${job.financials.bonusAmount} performance bonus to ${job.assignedInstallerName || 'Installer'}.`);
  }
}
