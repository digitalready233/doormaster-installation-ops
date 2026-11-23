import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { ExtraFeatureItem, RoleDefinition, SYSTEM_EXTRA_FEATURES } from '../../models/installation.model';

@Component({
  selector: 'app-edit-role-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      (click)="onBackdropClick($event)"
    >
      <div 
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
              [class]="getRoleBadgeBg(role().color)"
            >
              <mat-icon class="!text-xl">{{ role().icon || 'shield' }}</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-slate-900 dark:text-white">
                  Edit Role Features: {{ role().name }}
                </h3>
                <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {{ role().label }}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Configure specialized capabilities & extensions. Base core permissions are fixed.
              </p>
            </div>
          </div>

          <button 
            type="button"
            (click)="closed.emit()" 
            class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close dialog"
          >
            <mat-icon class="!text-xl">close</mat-icon>
          </button>
        </div>

        <!-- Scrollable Modal Content -->
        <div class="p-6 space-y-6 overflow-y-auto">

          <!-- Role Name & Description (Editable) -->
          <div class="space-y-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Role Name / Title <span class="text-rose-500">*</span>
              </label>
              <input 
                type="text"
                [ngModel]="editRoleName()"
                (ngModelChange)="editRoleName.set($event)"
                placeholder="e.g. Manager"
                class="w-full text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Role Description & Scope
              </label>
              <textarea 
                [ngModel]="editRoleDescription()"
                (ngModelChange)="editRoleDescription.set($event)"
                rows="2"
                placeholder="Operational responsibilities, duties and authority..."
                class="w-full text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              ></textarea>
            </div>
          </div>

          <!-- Core Base Permissions Notice (FIXED / LOCKED) -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  <mat-icon class="!text-sm">lock</mat-icon>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Current Core Features & Base Permissions</span>
                    <span class="text-[10px] normal-case font-semibold px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                      Fixed / Immutable
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div class="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/80 rounded-xl text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
              <mat-icon class="!text-base text-amber-600 shrink-0 mt-0.5">info</mat-icon>
              <p class="leading-relaxed">
                The 9 core base permissions for this role are <strong>fixed and locked</strong> to ensure operational integrity and compliance with installer & logistics dispatch workflows.
              </p>
            </div>

            <!-- Read-only Core Permissions Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              @for (item of corePermissionsList(); track item.key) {
                <div 
                  class="flex items-center justify-between p-2.5 rounded-lg border bg-slate-50/60 dark:bg-slate-800/40 select-none opacity-85"
                  [class]="item.enabled 
                    ? 'border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10' 
                    : 'border-slate-200 dark:border-slate-800'"
                >
                  <div class="flex items-center gap-2 truncate pr-2">
                    <mat-icon class="!text-sm text-slate-400 shrink-0">lock</mat-icon>
                    <span class="font-medium text-slate-700 dark:text-slate-300 truncate">{{ item.label }}</span>
                  </div>

                  <div class="flex items-center gap-1.5 shrink-0">
                    @if (item.enabled) {
                      <span class="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <mat-icon class="!text-sm text-emerald-600">check_circle</mat-icon>
                        <span>Granted</span>
                      </span>
                    } @else {
                      <span class="text-[10px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <mat-icon class="!text-sm">block</mat-icon>
                        <span>Denied</span>
                      </span>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Divider -->
          <hr class="border-slate-200 dark:border-slate-800" />

          <!-- Extra Features Section (EDITABLE) -->
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                  <mat-icon class="!text-sm">extension</mat-icon>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Extra Features & Specialized Capabilities</span>
                    <span class="text-[10px] normal-case font-semibold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                      Editable
                    </span>
                  </h4>
                </div>
              </div>
              <span class="text-xs text-slate-500 dark:text-slate-400">
                {{ selectedFeatureIds().length }} of {{ availableFeatures().length }} features active
              </span>
            </div>

            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Toggle elevated operational tools, data export privileges, SMS gateways, and multi-branch features assigned to this role.
            </p>

            <!-- Extra Features Toggle List -->
            <div class="space-y-2.5">
              @for (feat of availableFeatures(); track feat.id) {
                <div 
                  (click)="toggleFeature(feat.id)"
                  class="p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 select-none"
                  [class]="isFeatureActive(feat.id) 
                    ? 'border-indigo-500 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 ring-1 ring-indigo-500/30' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'"
                >
                  <div class="flex items-start gap-3">
                    <div 
                      class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                      [class]="isFeatureActive(feat.id) ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'"
                    >
                      <mat-icon class="!text-base">{{ feat.icon }}</mat-icon>
                    </div>

                    <div class="space-y-1">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-xs font-bold text-slate-900 dark:text-white">{{ feat.name }}</span>
                        <span 
                          class="text-[9px] uppercase font-mono font-semibold px-1.5 py-0.2 rounded"
                          [class]="getCategoryBadgeClass(feat.category)"
                        >
                          {{ feat.category }}
                        </span>
                        @if (feat.category === 'custom') {
                          <button 
                            type="button"
                            (click)="removeCustomFeature(feat.id, $event)"
                            class="text-rose-500 hover:text-rose-700 text-xs p-0.5"
                            title="Remove custom feature"
                          >
                            <mat-icon class="!text-xs">delete</mat-icon>
                          </button>
                        }
                      </div>
                      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {{ feat.description }}
                      </p>
                    </div>
                  </div>

                  <!-- Toggle Checkbox Switch -->
                  <div class="shrink-0 mt-1">
                    <input 
                      type="checkbox" 
                      [checked]="isFeatureActive(feat.id)"
                      (change)="toggleFeature(feat.id)"
                      class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
                    />
                  </div>
                </div>
              }
            </div>

            <!-- Add Custom Extra Feature Input -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                + Add Custom Extra Feature
              </label>
              <div class="flex items-center gap-2">
                <input 
                  type="text"
                  [(ngModel)]="newCustomFeatureName"
                  placeholder="e.g. IoT Smart Lock Telemetry, BIM CAD Viewer..."
                  (keydown.enter)="handleAddCustomFeature()"
                  class="flex-1 text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="button"
                  (click)="handleAddCustomFeature()"
                  [disabled]="!newCustomFeatureName.trim()"
                  class="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Add Feature
                </button>
              </div>
            </div>

          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/60">
          <button 
            type="button" 
            (click)="closed.emit()"
            class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              (click)="handleSaveRoleFeatures()"
              class="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <mat-icon class="!text-sm">save</mat-icon>
              <span>Save Role Features</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class EditRoleModal implements OnInit {
  role = input.required<RoleDefinition>();
  closed = output<void>();
  roleUpdated = output<RoleDefinition>();

  private readonly store = inject(InstallationStore);
  private readonly alert = inject(AlertService);

  readonly selectedFeatureIds = signal<string[]>([]);
  readonly customFeatures = signal<ExtraFeatureItem[]>([]);
  readonly editRoleName = signal<string>('');
  readonly editRoleDescription = signal<string>('');
  newCustomFeatureName = '';

  readonly corePermissionsList = computed(() => {
    const p = this.role().permissions;
    return [
      { key: 'canCreateJobs', label: 'Create & Book Door Jobs', enabled: !!p.canCreateJobs },
      { key: 'canAssignInstallers', label: 'Assign Installers & Teams', enabled: !!p.canAssignInstallers },
      { key: 'canDispatchDoors', label: 'Dispatch Doors & Hardware', enabled: !!p.canDispatchDoors },
      { key: 'canClockInOut', label: 'Clock In / Clock Out On Site', enabled: !!p.canClockInOut },
      { key: 'canUploadPhotos', label: 'Upload Proof & Quality Photos', enabled: !!p.canUploadPhotos },
      { key: 'canSignVerification', label: 'Sign Customer Completion Certificate', enabled: !!p.canSignVerification },
      { key: 'canApproveBonuses', label: 'Authorize Installer Bonuses', enabled: !!p.canApproveBonuses },
      { key: 'canViewFinancials', label: 'View Financial Ledger & Margins', enabled: !!p.canViewFinancials },
      { key: 'canManageRoles', label: 'Manage Roles & User IAM Governance', enabled: !!p.canManageRoles },
    ];
  });

  readonly availableFeatures = computed<ExtraFeatureItem[]>(() => {
    return [...SYSTEM_EXTRA_FEATURES, ...this.customFeatures()];
  });

  ngOnInit() {
    this.editRoleName.set(this.role().name || '');
    this.editRoleDescription.set(this.role().description || '');
    const existing = this.role().extraFeatures || [];
    this.selectedFeatureIds.set([...existing]);

    // Check if role has any custom features not in SYSTEM_EXTRA_FEATURES
    const systemIds = new Set(SYSTEM_EXTRA_FEATURES.map(f => f.id));
    const extraCustom: ExtraFeatureItem[] = [];
    existing.forEach(fid => {
      if (!systemIds.has(fid)) {
        extraCustom.push({
          id: fid,
          name: this.formatCustomFeatureName(fid),
          description: 'Custom specialized capability configured for this role.',
          icon: 'stars',
          category: 'custom'
        });
      }
    });
    if (extraCustom.length > 0) {
      this.customFeatures.set(extraCustom);
    }
  }

  isFeatureActive(id: string): boolean {
    return this.selectedFeatureIds().includes(id);
  }

  toggleFeature(id: string) {
    this.selectedFeatureIds.update(current => {
      if (current.includes(id)) {
        return current.filter(x => x !== id);
      } else {
        return [...current, id];
      }
    });
  }

  handleAddCustomFeature() {
    const name = this.newCustomFeatureName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    if (!id) return;

    if (!this.availableFeatures().some(f => f.id === id)) {
      const newFeat: ExtraFeatureItem = {
        id,
        name,
        description: 'User-defined operational capability extension.',
        icon: 'stars',
        category: 'custom'
      };
      this.customFeatures.update(list => [...list, newFeat]);
    }

    if (!this.selectedFeatureIds().includes(id)) {
      this.selectedFeatureIds.update(c => [...c, id]);
    }

    this.newCustomFeatureName = '';
  }

  removeCustomFeature(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.customFeatures.update(list => list.filter(f => f.id !== id));
    this.selectedFeatureIds.update(list => list.filter(x => x !== id));
  }

  async handleSaveRoleFeatures() {
    const updatedRole: RoleDefinition = {
      ...this.role(),
      name: this.editRoleName().trim() || this.role().name,
      description: this.editRoleDescription().trim(),
      extraFeatures: [...this.selectedFeatureIds()]
    };

    await this.store.updateRole(updatedRole);
    this.alert.toastSuccess(
      'Role Saved',
      `Role "${updatedRole.name}" has been updated.`
    );
    this.roleUpdated.emit(updatedRole);
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }

  getRoleBadgeBg(color: string): string {
    switch (color) {
      case 'purple': return 'bg-purple-600';
      case 'slate': return 'bg-slate-700';
      case 'emerald': return 'bg-emerald-600';
      case 'indigo': return 'bg-indigo-600';
      case 'amber': return 'bg-amber-600';
      case 'cyan': return 'bg-cyan-600';
      case 'teal': return 'bg-teal-600';
      default: return 'bg-slate-800';
    }
  }

  getCategoryBadgeClass(category: string): string {
    switch (category) {
      case 'analytics': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
      case 'security': return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
      case 'communications': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
      case 'operations': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'custom': return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  }

  private formatCustomFeatureName(id: string): string {
    return id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
}

