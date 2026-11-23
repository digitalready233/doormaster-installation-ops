import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { ApiAuthUser, RoleType } from '../../models/installation.model';
import { PhoneInputComponent } from '../../components/phone-input/phone-input';

export interface AvatarPreset {
  label: string;
  url: string;
}

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule, PhoneInputComponent],
  template: `
    <div class="space-y-6 max-w-7xl mx-auto">
      
      <!-- ========================================================================= -->
      <!-- TOP HEADER & OPERATIONAL IDENTITY                                         -->
      <!-- ========================================================================= -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Pro Operations</span>
            <span aria-hidden="true">·</span>
            <span>Account & Identity</span>
            <span aria-hidden="true">·</span>
            <span class="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 font-mono">
              <mat-icon class="!text-xs">badge</mat-icon>
              <span>Identity Hub</span>
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Profile
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage your credentials, custom avatar photo, contact phone, and real-time GPS telemetry broadcast.
          </p>
        </div>

        <!-- Telematics Status Pill -->
        <div class="flex items-center gap-3">
          <div class="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-2.5">
            <span class="w-2.5 h-2.5 rounded-full" [class.bg-emerald-500]="store.isGpsTracking()" [class.bg-slate-400]="!store.isGpsTracking()" [class.animate-pulse]="store.isGpsTracking()"></span>
            <div class="text-xs font-mono">
              <span class="text-slate-400">GPS Telematics: </span>
              <strong class="text-slate-900 dark:text-white uppercase">{{ store.isGpsTracking() ? 'Broadcasting' : 'Standby' }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- MAIN GRID: PROFILE OVERVIEW & EDIT FORM                                    -->
      <!-- ========================================================================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- LEFT: USER IDENTITY & CARD (lg:col-span-5) -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Identity Summary Card -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"></div>

            <!-- Avatar & Primary Info -->
            <div class="flex items-center gap-4 mb-6">
              <div class="relative group">
                <div class="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-md shrink-0">
                  @if (profileForm.get('avatarUrl')?.value || currentUser().avatarUrl) {
                    <img 
                      [src]="profileForm.get('avatarUrl')?.value || currentUser().avatarUrl" 
                      [alt]="currentUser().name" 
                      class="w-full h-full object-cover"
                    />
                  } @else {
                    <div class="w-full h-full bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-center font-bold text-2xl">
                      {{ currentUser().name.charAt(0) }}
                    </div>
                  }
                </div>
                <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" title="Online Station Active"></span>
              </div>

              <div class="min-w-0 flex-1">
                <h2 class="text-xl font-black text-slate-900 dark:text-white tracking-tight truncate leading-tight">
                  {{ profileForm.get('name')?.value || currentUser().name }}
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
                  {{ profileForm.get('email')?.value || currentUser().email }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase" [class]="roleBadgeClass()">
                    <mat-icon class="!text-xs">{{ roleIcon() }}</mat-icon>
                    <span>{{ roleLabel() }}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Detailed Metadata Rows -->
            <div class="space-y-2.5 text-xs">
              <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400 font-medium">Workstation ID</span>
                <span class="font-mono text-slate-800 dark:text-slate-200 font-semibold">{{ currentUser().id }}</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400 font-medium">Direct Phone</span>
                <span class="font-mono text-slate-800 dark:text-slate-200 font-semibold">
                  {{ profileForm.get('phone')?.value || currentUser().phone }}
                </span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400 font-medium">Account Status</span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase font-mono" [class]="statusBadgeClass()">
                  <span class="w-1.5 h-1.5 rounded-full" [class.bg-emerald-500]="currentUser().status === 'active'" [class.bg-slate-400]="currentUser().status !== 'active'"></span>
                  <span>{{ statusLabel() }}</span>
                </span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400 font-medium">GPS Coordinate Fix</span>
                <span class="font-mono text-slate-800 dark:text-slate-200 text-[11px]">
                  {{ gpsLocationSummary() }}
                </span>
              </div>
            </div>

            <!-- Role Permissions Matrix -->
            <div class="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <h3 class="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 font-mono">
                Granted Operational Permissions
              </h3>
              <div class="grid grid-cols-2 gap-2">
                @for (perm of rolePermissions(); track perm.label) {
                  <div class="px-2.5 py-2 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span class="truncate">{{ perm.label }}</span>
                    <mat-icon class="!text-xs text-emerald-500 shrink-0 ml-1">check_circle</mat-icon>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: EDIT PROFILE DETAILS & AVATAR PICKER (lg:col-span-7) -->
        <div class="lg:col-span-7 space-y-6">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 class="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <mat-icon class="!text-lg text-emerald-600">edit</mat-icon>
                  <span>Edit Profile Details</span>
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Update your display name, official avatar photo, and contact details.
                </p>
              </div>

              <button 
                type="button" 
                (click)="resetFormToCurrent()"
                class="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="space-y-5">
              
              <!-- Full Name -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono mb-1.5">
                  Full Name *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <mat-icon class="!text-base">badge</mat-icon>
                  </div>
                  <input 
                    type="text" 
                    formControlName="name" 
                    class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                    placeholder="e.g. Sarah Sterling"
                  />
                </div>
              </div>

              <!-- Email Address -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono mb-1.5">
                  Official Email Address *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <mat-icon class="!text-base">alternate_email</mat-icon>
                  </div>
                  <input 
                    type="email" 
                    formControlName="email" 
                    class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                    placeholder="e.g. manager@doormasterops.com"
                  />
                </div>
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono mb-1.5">
                  Direct Mobile Phone (Dispatch SMS) *
                </label>
                <app-phone-input 
                  formControlName="phone" 
                  placeholder="24 555 0100"
                ></app-phone-input>
              </div>

              <!-- Avatar Photo: URL Input + 1-Click Preset Gallery -->
              <div class="space-y-2 pt-1">
                <div class="flex items-center justify-between">
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                    User Avatar Photo
                  </label>
                  <span class="text-[11px] text-slate-400 font-mono">Select preset or paste image link</span>
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <mat-icon class="!text-base">image</mat-icon>
                  </div>
                  <input 
                    type="url" 
                    formControlName="avatarUrl" 
                    class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <!-- 1-Click Avatar Presets Palette -->
                <div class="pt-2">
                  <span class="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    Or choose a verified persona avatar:
                  </span>
                  <div class="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    @for (preset of avatarPresets; track preset.url) {
                      <button
                        type="button"
                        (click)="selectAvatarPreset(preset.url)"
                        class="relative rounded-xl overflow-hidden aspect-square border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        [class.border-emerald-500]="profileForm.get('avatarUrl')?.value === preset.url"
                        [class.ring-2]="profileForm.get('avatarUrl')?.value === preset.url"
                        [class.ring-emerald-500/40]="profileForm.get('avatarUrl')?.value === preset.url"
                        [class.border-slate-200]="profileForm.get('avatarUrl')?.value !== preset.url"
                        [class.dark:border-slate-700]="profileForm.get('avatarUrl')?.value !== preset.url"
                        [title]="preset.label"
                      >
                        <img [src]="preset.url" [alt]="preset.label" class="w-full h-full object-cover" />
                        @if (profileForm.get('avatarUrl')?.value === preset.url) {
                          <div class="absolute inset-0 bg-emerald-500/30 flex items-center justify-center text-white">
                            <mat-icon class="!text-sm drop-shadow">check</mat-icon>
                          </div>
                        }
                      </button>
                    }
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button 
                  type="submit" 
                  [disabled]="profileForm.invalid || isSaving()"
                  class="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 active:scale-98 cursor-pointer flex items-center gap-2 font-mono"
                >
                  @if (isSaving()) {
                    <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving Changes...</span>
                  } @else {
                    <mat-icon class="!text-base">save</mat-icon>
                    <span>Save & Update Profile</span>
                  }
                </button>
              </div>
            </form>
          </div>

          <!-- GPS Tracking Card -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white font-mono flex items-center gap-2">
                <mat-icon class="!text-base text-emerald-500">near_me</mat-icon>
                <span>Live Fleet Radar & GPS Broadcast</span>
              </h3>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded" [class]="store.isGpsTracking() ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'">
                {{ store.isGpsTracking() ? 'Active' : 'Standby' }}
              </span>
            </div>
            
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              When enabled, your device transmits real-time coordinates to the interactive fleet radar map so operations managers and dispatch coordinators can orchestrate site arrivals with millimetric precision.
            </p>

            <button
              type="button"
              (click)="toggleGpsTracking()"
              class="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              [class]="store.isGpsTracking() 
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'"
            >
              <mat-icon class="!text-base">{{ store.isGpsTracking() ? 'location_off' : 'location_on' }}</mat-icon>
              <span>{{ store.isGpsTracking() ? 'Pause Live GPS Broadcast' : 'Activate Live GPS Broadcast' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class Profile {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  readonly fb = inject(FormBuilder);

  readonly currentUser = computed<ApiAuthUser>(() => this.store.currentUser());
  readonly isSaving = signal<boolean>(false);

  readonly avatarPresets: AvatarPreset[] = [
    { label: 'Manager', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
    { label: 'Master Tech', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
    { label: 'Fleet Driver', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' },
    { label: 'Joiner Head', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
    { label: 'Finance Director', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
    { label: 'Client Partner', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
    { label: 'Site Architect', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80' },
    { label: 'Quality Inspector', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' }
  ];

  readonly profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    avatarUrl: ['']
  });

  constructor() {
    effect(() => {
      // Only reset when form is not actively dirty / being edited by user
      if (!this.profileForm.dirty) {
        this.resetFormToCurrent();
      }
    });
  }

  resetFormToCurrent() {
    const user = this.store.currentUser();
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone || '+233 24 555 0100',
      avatarUrl: user.avatarUrl || ''
    });
  }

  selectAvatarPreset(url: string) {
    this.profileForm.patchValue({ avatarUrl: url });
  }

  readonly registeredDate = computed(() => {
    const createdAt = this.currentUser().createdAt;
    if (!createdAt) return 'Jan 2026';
    try {
      return new Date(createdAt).toLocaleDateString();
    } catch {
      return 'Jan 2026';
    }
  });

  readonly roleBadgeClass = computed(() => {
    const role = this.currentUser().role;
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800';
      case 'manager': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700';
      case 'installer': return 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800';
      case 'client': return 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800';
      case 'account_officer': return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800';
      case 'shop_manager': return 'bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800';
      case 'dispatcher': return 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-200 border border-teal-200 dark:border-teal-800';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
    }
  });

  readonly roleIcon = computed(() => {
    const role = this.currentUser().role;
    switch (role) {
      case 'admin': return 'admin_panel_settings';
      case 'manager': return 'shield_person';
      case 'installer': return 'handyman';
      case 'client': return 'person_pin_circle';
      case 'account_officer': return 'account_balance_wallet';
      case 'shop_manager': return 'storefront';
      case 'dispatcher': return 'local_shipping';
      default: return 'badge';
    }
  });

  readonly statusBadgeClass = computed(() => {
    const status = this.currentUser().status;
    return status === 'active'
      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
      : 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800';
  });

  readonly roleLabel = computed(() => {
    const role = this.currentUser().role;
    switch (role) {
      case 'admin': return 'System Administrator';
      case 'manager': return 'Manager';
      case 'installer': return 'Master Field Installer';
      case 'client': return 'Client / Site Owner';
      case 'account_officer': return 'Accounts & Finance Officer';
      case 'shop_manager': return 'Shop Attendant';
      case 'dispatcher': return 'Driver';
      default: return role || 'Operational User';
    }
  });

  readonly statusLabel = computed(() => {
    const status = this.currentUser().status || 'active';
    return status.charAt(0).toUpperCase() + status.slice(1);
  });

  readonly rolePermissions = computed(() => {
    const role = this.currentUser().role;
    const def = this.store.roles().find(r => r.id === role);
    if (!def) return [];
    const perms = def.permissions;
    return [
      { label: 'Create Jobs', active: perms.canCreateJobs },
      { label: 'Assign Installers', active: perms.canAssignInstallers },
      { label: 'Dispatch Doors', active: perms.canDispatchDoors },
      { label: 'Clock In/Out', active: perms.canClockInOut },
      { label: 'Upload Photos', active: perms.canUploadPhotos },
      { label: 'Sign Verification', active: perms.canSignVerification },
      { label: 'Approve Bonuses', active: perms.canApproveBonuses },
      { label: 'View Financials', active: perms.canViewFinancials },
      { label: 'Manage Roles', active: perms.canManageRoles }
    ].filter(p => p.active);
  });

  readonly gpsLocationSummary = computed(() => {
    const loc = this.store.myLiveLocation();
    if (!loc) return 'Accra Atelier Corridor (Standby)';
    if (loc.status !== 'online') return 'Offline Standby';
    return `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)} · ${loc.speedKmh !== null ? loc.speedKmh + ' km/h' : 'Stationary'}`;
  });

  async saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Form', 'Please provide a valid name, email, and phone number.');
      return;
    }

    this.isSaving.set(true);

    const val = this.profileForm.getRawValue();
    const res = await this.store.updateCurrentUserProfile({
      name: val.name || '',
      email: val.email || '',
      phone: val.phone || '',
      avatarUrl: val.avatarUrl || ''
    });

    this.isSaving.set(false);

    if (res.success) {
      this.alert.success('Profile Updated', res.message || 'User profile details and credentials updated successfully.');
    } else {
      this.alert.error('Update Failed', res.message || 'Could not update profile.');
    }
  }

  toggleGpsTracking() {
    if (this.store.isGpsTracking()) {
      this.store.stopGpsTracking();
      this.alert.toastInfo('GPS Broadcast Paused', 'Your device position is no longer shared.');
    } else {
      void this.store.startGpsTracking();
      this.alert.toastSuccess('GPS Broadcast Active', 'Device transmitting live position to fleet radar.');
    }
  }

  signOut() {
    this.store.signOutApi();
  }
}
