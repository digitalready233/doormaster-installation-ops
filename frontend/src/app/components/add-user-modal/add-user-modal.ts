import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { RoleType } from '../../models/installation.model';

@Component({
  selector: 'app-add-user-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-150"
      >
        <!-- Modal Header -->
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <mat-icon class="!text-xl">person_add</mat-icon>
            </div>
            <div>
              <h2 class="text-base font-bold text-slate-900 dark:text-white">Add New User / Staff Account</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Create & provision authorized credentials</p>
            </div>
          </div>

          <button 
            type="button" 
            (click)="closed.emit()" 
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <!-- Modal Form Body -->
        <form [formGroup]="userForm" (ngSubmit)="handleSubmit()" class="flex flex-col flex-1 min-h-0 overflow-hidden">
          
          <div class="p-5 space-y-4 overflow-y-auto flex-1">
            
            @if (errorMessage()) {
              <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <mat-icon class="!text-base text-rose-500">error</mat-icon>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <!-- Full Name -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">badge</mat-icon>
                <input 
                  type="text" 
                  formControlName="name"
                  placeholder="e.g. Samuel Darko (Senior Joiner)"
                  class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              @if (userForm.get('name')?.touched && userForm.get('name')?.invalid) {
                <p class="text-[11px] text-rose-500 mt-1">Full name is required (min 2 chars).</p>
              }
            </div>

            <!-- Email & Phone Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">email</mat-icon>
                  <input 
                    type="email" 
                    formControlName="email"
                    placeholder="s.darko@doormasterops.com"
                    class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                @if (userForm.get('email')?.touched && userForm.get('email')?.invalid) {
                  <p class="text-[11px] text-rose-500 mt-1">A valid email address is required.</p>
                }
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">phone</mat-icon>
                  <input 
                    type="tel" 
                    formControlName="phone"
                    placeholder="+233 24 555 0199"
                    class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                @if (userForm.get('phone')?.touched && userForm.get('phone')?.invalid) {
                  <p class="text-[11px] text-rose-500 mt-1">Phone number is required.</p>
                }
              </div>
            </div>

            <!-- Role Selector -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Organizational Role <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">admin_panel_settings</mat-icon>
                <select 
                  formControlName="role"
                  class="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none"
                >
                  <option value="admin">System Administrator (Full Security & Governance)</option>
                  <option value="manager">Operations Manager (Fleet Dispatch & Operations)</option>
                  <option value="installer">Installer (Site Clock-in & Checklists)</option>
                  <option value="shop_manager">Shop Manager (Showroom Counter & Booking)</option>
                  <option value="dispatcher">Logistics Dispatcher / Driver (Fleet Transport)</option>
                  <option value="account_officer">Finance & Account Officer (Auditing & Funds)</option>
                  <option value="client">Client / Site Owner (Tracking & Verification)</option>
                  @for (customRole of customRoles(); track customRole.id) {
                    <option [value]="customRole.id">{{ customRole.name }} (Custom Role)</option>
                  }
                </select>
                <mat-icon class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg pointer-events-none">expand_more</mat-icon>
              </div>
            </div>

            <!-- Assigned Shop / Branch Selector -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Assigned Shop / Branch
                @if (userForm.get('role')?.value === 'shop_manager') {
                  <span class="text-rose-500">*</span>
                } @else {
                  <span class="text-slate-400 font-normal">(Scopes /shop data to this branch if assigned)</span>
                }
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">storefront</mat-icon>
                <select
                  formControlName="shopId"
                  class="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none"
                >
                  @if (userForm.get('role')?.value === 'shop_manager') {
                    <option value="">-- Select Assigned DoorMaster Shop --</option>
                  } @else {
                    <option value="">-- Global / Not Assigned to a Single Shop --</option>
                  }
                  @for (b of branches(); track b.branchCode) {
                    <option [value]="b.id">{{ b.shopName }} ({{ b.branchCode }} · {{ b.city }})</option>
                  }
                </select>
                <mat-icon class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg pointer-events-none">expand_more</mat-icon>
              </div>
            </div>

            <!-- Installer Team & Squad Position Assignment (Grid Select) -->
            @if (userForm.get('role')?.value === 'installer') {
              <div class="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/70 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                    <mat-icon class="!text-base text-blue-600 dark:text-blue-400">groups</mat-icon>
                    <span>Installation Team & Squad Position</span>
                  </span>
                  <span class="text-[10px] font-mono text-blue-700 dark:text-blue-300">Synced with Role Settings</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  @for (team of installerTeams(); track team.id) {
                    <div
                      (click)="selectInstallerTeam(team.id)"
                      class="p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2"
                      [class]="selectedTeamId() === team.id
                        ? 'border-blue-600 bg-blue-600/10 dark:bg-blue-500/20 text-blue-950 dark:text-white ring-1 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'"
                    >
                      <div class="min-w-0">
                        <div class="text-[11px] font-black truncate">Team {{ team.code }}</div>
                        <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ team.name }}</div>
                      </div>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-700 shrink-0">
                        {{ team.members.length }}
                      </span>
                    </div>
                  }
                </div>

                @if (selectedTeamPositions().length > 0) {
                  <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                      Select Position in Team
                    </label>
                    <div class="flex flex-wrap gap-1.5">
                      @for (pos of selectedTeamPositions(); track pos) {
                        <button
                          type="button"
                          (click)="selectedTeamPosition.set(pos)"
                          class="px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer"
                          [class]="selectedTeamPosition() === pos
                            ? 'bg-indigo-600 text-white border-indigo-700'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
                        >
                          {{ pos }}
                        </button>
                      }
                    </div>
                  </div>
                }

                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    (click)="selectedTeamRole.set('assistant')"
                    class="py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer"
                    [class]="selectedTeamRole() === 'assistant'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
                  >
                    Squad Member
                  </button>
                  <button
                    type="button"
                    (click)="selectedTeamRole.set('lead')"
                    class="py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer"
                    [class]="selectedTeamRole() === 'lead'
                      ? 'bg-amber-500 text-slate-950 border-amber-600'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
                  >
                    ★ Team Lead
                  </button>
                </div>
              </div>
            }

            <!-- Initial Account Status -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Initial Account Status
              </label>
              <div class="grid grid-cols-2 gap-2">
                <label 
                  class="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all"
                  [class]="userForm.get('status')?.value === 'active' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="active" class="text-emerald-600 focus:ring-emerald-500" />
                  <div class="text-xs">
                    <p class="font-bold flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>Active</span>
                    </p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">Can sign in immediately</p>
                  </div>
                </label>

                <label 
                  class="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all"
                  [class]="userForm.get('status')?.value === 'pending' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="pending" class="text-amber-600 focus:ring-amber-500" />
                  <div class="text-xs">
                    <p class="font-bold flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                      <span>Pending</span>
                    </p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">Awaiting explicit activation</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Temporary Password / Passcode
                </label>
                <button 
                  type="button" 
                  (click)="generateRandomPassword()"
                  class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Auto-generate
                </button>
              </div>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">lock</mat-icon>
                <input 
                  [type]="showPassword() ? 'text' : 'password'" 
                  formControlName="password"
                  placeholder="DoorMaster2026!*"
                  class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <button 
                  type="button" 
                  (click)="showPassword.update(s => !s)"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <mat-icon class="!text-base">{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </div>
            </div>

          </div>

          <!-- Sticky Modal Footer -->
          <div class="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <button 
              type="button" 
              (click)="closed.emit()" 
              class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button 
              type="submit"
              [disabled]="userForm.invalid || isSubmitting()"
              class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              @if (isSubmitting()) {
                <span class="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Creating Account...</span>
              } @else {
                <mat-icon class="!text-sm !w-4 !h-4">check</mat-icon>
                <span>Create User Account</span>
              }
            </button>
          </div>

        </form>

      </div>
    </div>
  `
})
export class AddUserModal {
  private readonly store = inject(InstallationStore);
  private readonly alert = inject(AlertService);

  readonly closed = output<void>();
  readonly userCreated = output<void>();

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly showPassword = signal<boolean>(false);

  readonly customRoles = () => this.store.roles().filter(r => !r.isSystem);
  readonly branches = this.store.branches;
  readonly installerTeams = this.store.installerTeams;

  readonly selectedTeamId = signal<string>('team-alpha');
  readonly selectedTeamRole = signal<'lead' | 'assistant'>('assistant');
  readonly selectedTeamPosition = signal<string>('Installation Technician');

  readonly selectedTeamPositions = () => {
    const team = this.installerTeams().find(t => t.id === this.selectedTeamId());
    return team?.positions?.length
      ? team.positions
      : ['Team Lead', 'Lead Master Tech', 'Senior Acoustic Tech', 'Smart Lock Specialist', 'Precision Joiner Tech', 'Installation Technician'];
  };

  selectInstallerTeam(teamId: string) {
    this.selectedTeamId.set(teamId);
    const positions = this.selectedTeamPositions();
    if (positions.length > 0 && !positions.includes(this.selectedTeamPosition())) {
      this.selectedTeamPosition.set(positions[0]);
    }
  }

  readonly userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('+233 24 555 01', [Validators.required, Validators.minLength(8)]),
    role: new FormControl<RoleType | string>('installer', [Validators.required]),
    shopId: new FormControl<string>(''),
    status: new FormControl<string>('active', [Validators.required]),
    password: new FormControl('DoorMaster2026!*', [Validators.required, Validators.minLength(6)])
  });

  generateRandomPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = 'DM-';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.userForm.patchValue({ password: pass });
  }

  async handleSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete User Information', 'Please fill in all required fields.');
      return;
    }

    const val = this.userForm.getRawValue();
    if (val.role === 'shop_manager' && !val.shopId) {
      this.errorMessage.set('Please select the DoorMaster shop this Shop Manager is assigned to.');
      this.alert.toastWarning('Shop Assignment Required', 'Shop Managers must be assigned to a DoorMaster shop.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const isInstaller = val.role === 'installer';
    const res = await this.store.addNewUser({
      name: val.name!,
      email: val.email!,
      role: val.role!,
      phone: val.phone!,
      shopId: val.shopId ? val.shopId : null,
      teamId: isInstaller ? this.selectedTeamId() : null,
      teamRole: isInstaller ? this.selectedTeamRole() : null,
      teamPosition: isInstaller ? this.selectedTeamPosition() : null,
      password: val.password || 'DoorMaster2026!*',
      status: val.status || 'active'
    });

    this.isSubmitting.set(false);

    if (res.success) {
      this.alert.success('User Account Created', res.message || `Account for ${val.name} created successfully.`);
      this.userCreated.emit();
      this.closed.emit();
    } else {
      this.errorMessage.set(res.message);
      this.alert.error('Failed to Create User', res.message || 'Could not register user account.');
    }
  }
}
