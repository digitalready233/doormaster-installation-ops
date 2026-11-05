import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';

@Component({
  selector: 'app-custom-role-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col text-slate-900 dark:text-slate-100">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm !w-4 !h-4">badge</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Define New Operational Role</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Add future organizational positions with granular permission matrix</p>
            </div>
          </div>
          <button (click)="closed.emit()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded">
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <form [formGroup]="roleForm" (ngSubmit)="handleCreateRole()" class="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          <div>
            <label for="roleNameInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Role Title</label>
            <input 
              id="roleNameInput"
              type="text" 
              formControlName="name"
              placeholder="e.g. Quality Assurance Inspector, Subcontractor Lead..." 
              class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="roleLabelInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Short Label</label>
              <input 
                id="roleLabelInput"
                type="text" 
                formControlName="label"
                placeholder="e.g. QA Inspector" 
                class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label for="roleColorSelect" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Badge Color</label>
              <select 
                id="roleColorSelect"
                formControlName="color"
                class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="violet">Violet Accent</option>
                <option value="sky">Sky Blue Accent</option>
                <option value="amber">Amber Accent</option>
                <option value="emerald">Emerald Accent</option>
                <option value="rose">Rose Accent</option>
              </select>
            </div>
          </div>

          <div>
            <label for="roleDescInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Responsibilities & Description</label>
            <textarea 
              id="roleDescInput"
              formControlName="description"
              rows="2"
              placeholder="Conducts pre-delivery frame checks and architectural tolerance compliance audits..." 
              class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          <!-- Permission Matrix -->
          <div>
            <span class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Granular Role Permissions</span>
            <div class="space-y-2 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 bg-slate-50/50 dark:bg-slate-800/50">
              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canCreateJobs" class="rounded text-slate-900 focus:ring-0" />
                <span>Can create & schedule door installation jobs</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canAssignInstallers" class="rounded text-slate-900 focus:ring-0" />
                <span>Can assign installers & installers</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canDispatchDoors" class="rounded text-slate-900 focus:ring-0" />
                <span>Can dispatch doors & hardware sets from workshop</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canClockInOut" class="rounded text-slate-900 focus:ring-0" />
                <span>Can clock in & clock out on installation sites</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canUploadPhotos" class="rounded text-slate-900 focus:ring-0" />
                <span>Can upload quality & proof-of-work photos</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canSignVerification" class="rounded text-slate-900 focus:ring-0" />
                <span>Can sign off customer completion certificates</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canApproveBonuses" class="rounded text-slate-900 focus:ring-0" />
                <span>Can authorize installer performance bonuses</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canViewFinancials" class="rounded text-slate-900 focus:ring-0" />
                <span>Can view financial ledger, door pricing & margins</span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              (click)="closed.emit()"
              class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="roleForm.invalid"
              class="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 disabled:opacity-50 rounded-xl shadow-sm transition-all"
            >
              Save New Role to System
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CustomRoleModal {
  readonly store = inject(InstallationStore);
  closed = output<void>();

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
      }
    });

    this.closed.emit();
  }
}
