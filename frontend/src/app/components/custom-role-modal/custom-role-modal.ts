import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { SYSTEM_EXTRA_FEATURES } from '../../models/installation.model';

@Component({
  selector: 'app-custom-role-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      (click)="onBackdropClick($event)"
    >
      <div 
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col text-slate-900 dark:text-slate-100"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <mat-icon class="!text-xl">add_moderator</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Create Totally New Role</h3>
                <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  New Role
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Define a brand new organizational position with custom permissions & extra features
              </p>
            </div>
          </div>
          <button 
            type="button" 
            (click)="closed.emit()" 
            class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <mat-icon class="!text-xl">close</mat-icon>
          </button>
        </div>

        <form [formGroup]="roleForm" (ngSubmit)="handleCreateRole()" class="p-6 space-y-5 overflow-y-auto max-h-[78vh]">
          <div>
            <label for="roleNameInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Role Title *
            </label>
            <input 
              id="roleNameInput"
              type="text" 
              formControlName="name"
              placeholder="e.g. Quality Assurance Lead, Subcontractor Operations Director..." 
              class="w-full text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="roleLabelInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Short Badge Label *
              </label>
              <input 
                id="roleLabelInput"
                type="text" 
                formControlName="label"
                placeholder="e.g. QA Director" 
                class="w-full text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label for="roleColorSelect" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Badge Color & Accent
              </label>
              <select 
                id="roleColorSelect"
                formControlName="color"
                class="w-full text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="violet">Violet Accent</option>
                <option value="indigo">Indigo Accent</option>
                <option value="sky">Sky Blue Accent</option>
                <option value="amber">Amber Accent</option>
                <option value="emerald">Emerald Accent</option>
                <option value="rose">Rose Accent</option>
                <option value="teal">Teal Accent</option>
              </select>
            </div>
          </div>

          <div>
            <label for="roleDescInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Role Responsibilities & Description *
            </label>
            <textarea 
              id="roleDescInput"
              formControlName="description"
              rows="2"
              placeholder="Oversees architectural frame checks, conducts pre-dispatch compliance audits, and coordinates subcontractor teams..." 
              class="w-full text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          <!-- Permission Matrix (Base Permissions) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                1. Granular Base Permissions
              </span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">Core operational authorizations</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-800/50">
              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canCreateJobs" class="rounded text-indigo-600 focus:ring-0" />
                <span>Create & book door jobs</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canAssignInstallers" class="rounded text-indigo-600 focus:ring-0" />
                <span>Assign installers & teams</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canDispatchDoors" class="rounded text-indigo-600 focus:ring-0" />
                <span>Dispatch doors & hardware</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canClockInOut" class="rounded text-indigo-600 focus:ring-0" />
                <span>Clock in / out on sites</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canUploadPhotos" class="rounded text-indigo-600 focus:ring-0" />
                <span>Upload proof & quality photos</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canSignVerification" class="rounded text-indigo-600 focus:ring-0" />
                <span>Sign verification certificates</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canApproveBonuses" class="rounded text-indigo-600 focus:ring-0" />
                <span>Authorize installer bonuses</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50">
                <input type="checkbox" formControlName="canViewFinancials" class="rounded text-indigo-600 focus:ring-0" />
                <span>View financial ledger & margins</span>
              </label>
            </div>
          </div>

          <!-- Extra Features Configuration -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                2. Extra Features & Capabilities
              </span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">
                {{ selectedExtraFeatures().length }} selected
              </span>
            </div>
            <div class="space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-800/50">
              @for (feat of systemExtraFeatures; track feat.id) {
                <label 
                  (click)="toggleExtraFeature(feat.id)"
                  class="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700/60 border border-transparent transition-colors"
                  [class.bg-white]="isExtraFeatureActive(feat.id)"
                  [class.dark:bg-slate-800]="isExtraFeatureActive(feat.id)"
                  [class.border-indigo-300]="isExtraFeatureActive(feat.id)"
                >
                  <input 
                    type="checkbox" 
                    [checked]="isExtraFeatureActive(feat.id)" 
                    class="rounded text-indigo-600 focus:ring-0 mt-0.5 shrink-0" 
                  />
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="font-bold text-slate-900 dark:text-white">{{ feat.name }}</span>
                      <span class="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {{ feat.category }}
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{{ feat.description }}</p>
                  </div>
                </label>
              }
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              (click)="closed.emit()"
              class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="roleForm.invalid"
              class="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 disabled:opacity-50 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <mat-icon class="!text-sm">add_moderator</mat-icon>
              <span>Create Totally New Role</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CustomRoleModal {
  readonly store = inject(InstallationStore);
  private readonly alert = inject(AlertService);
  closed = output<void>();

  readonly systemExtraFeatures = SYSTEM_EXTRA_FEATURES;
  readonly selectedExtraFeatures = signal<string[]>(['export_reports']);

  readonly roleForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    label: new FormControl('', [Validators.required, Validators.minLength(2)]),
    color: new FormControl('violet'),
    description: new FormControl('', [Validators.required]),
    canCreateJobs: new FormControl(false),
    canAssignInstallers: new FormControl(false),
    canDispatchDoors: new FormControl(false),
    canClockInOut: new FormControl(false),
    canUploadPhotos: new FormControl(true),
    canSignVerification: new FormControl(false),
    canApproveBonuses: new FormControl(false),
    canViewFinancials: new FormControl(false)
  });

  isExtraFeatureActive(id: string): boolean {
    return this.selectedExtraFeatures().includes(id);
  }

  toggleExtraFeature(id: string) {
    this.selectedExtraFeatures.update(curr => {
      if (curr.includes(id)) {
        return curr.filter(x => x !== id);
      } else {
        return [...curr, id];
      }
    });
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }

  handleCreateRole() {
    if (this.roleForm.invalid) return;
    const v = this.roleForm.value;
    const roleId = `role_${Date.now()}`;

    this.store.addCustomRole({
      id: roleId,
      name: v.name || 'New Role',
      label: v.label || 'Role',
      description: v.description || '',
      color: v.color || 'violet',
      icon: 'verified_user',
      permissions: {
        canCreateJobs: !!v.canCreateJobs,
        canAssignInstallers: !!v.canAssignInstallers,
        canDispatchDoors: !!v.canDispatchDoors,
        canClockInOut: !!v.canClockInOut,
        canUploadPhotos: !!v.canUploadPhotos,
        canSignVerification: !!v.canSignVerification,
        canApproveBonuses: !!v.canApproveBonuses,
        canViewFinancials: !!v.canViewFinancials,
        canManageRoles: false
      },
      extraFeatures: [...this.selectedExtraFeatures()]
    });

    this.alert.toastSuccess(
      'New Role Created',
      `Totally new role "${v.name}" has been registered into the system.`
    );

    this.closed.emit();
  }
}
