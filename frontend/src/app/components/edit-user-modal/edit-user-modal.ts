import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AppUser, RoleType } from '../../models/installation.model';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
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
            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <mat-icon class="!text-xl">manage_accounts</mat-icon>
            </div>
            <div>
              <h2 class="text-base font-bold text-slate-900 dark:text-white">Edit User Account & Role</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Modify profile, access privileges & operational status</p>
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
        <form [formGroup]="editForm" (ngSubmit)="handleSubmit()" class="flex flex-col flex-1 min-h-0 overflow-hidden">
          
          <div class="p-5 space-y-4 overflow-y-auto flex-1">
            
            @if (errorMessage()) {
              <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <mat-icon class="!text-base text-rose-500">error</mat-icon>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <!-- User ID & Identity Badge Banner -->
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span class="font-mono text-[11px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">ID: {{ user().id }}</span>
              </div>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">
                Created: {{ user().createdAt ? (user().createdAt | date:'mediumDate') : 'System Seed' }}
              </span>
            </div>

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
                  placeholder="e.g. Samuel Darko"
                  class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              @if (editForm.get('name')?.touched && editForm.get('name')?.invalid) {
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
                    placeholder="user@doormasterops.com"
                    class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                @if (editForm.get('email')?.touched && editForm.get('email')?.invalid) {
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
                    class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                @if (editForm.get('phone')?.touched && editForm.get('phone')?.invalid) {
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
                  class="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
                >
                  <option value="installer">Installer (Site Clock-in & Checklists)</option>
                  <option value="manager">Operations Manager (Fleet Dispatch & Governance)</option>
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

            <!-- Account Status Selector -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Account Status <span class="text-rose-500">*</span>
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <!-- Active -->
                <label 
                  class="flex flex-col gap-1 p-2.5 rounded-xl border cursor-pointer transition-all text-center"
                  [class]="editForm.get('status')?.value === 'active' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="active" class="sr-only" />
                  <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Active</span>
                  </div>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400">Full Access</span>
                </label>

                <!-- Pending -->
                <label 
                  class="flex flex-col gap-1 p-2.5 rounded-xl border cursor-pointer transition-all text-center"
                  [class]="editForm.get('status')?.value === 'pending' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 ring-2 ring-amber-500/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="pending" class="sr-only" />
                  <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Pending</span>
                  </div>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400">Needs Approval</span>
                </label>

                <!-- Deactivated -->
                <label 
                  class="flex flex-col gap-1 p-2.5 rounded-xl border cursor-pointer transition-all text-center"
                  [class]="editForm.get('status')?.value === 'deactivated' ? 'border-slate-500 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 ring-2 ring-slate-500/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="deactivated" class="sr-only" />
                  <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Deactivated</span>
                  </div>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400">Suspended</span>
                </label>

                <!-- Rejected -->
                <label 
                  class="flex flex-col gap-1 p-2.5 rounded-xl border cursor-pointer transition-all text-center"
                  [class]="editForm.get('status')?.value === 'rejected' ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-300 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="rejected" class="sr-only" />
                  <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>Rejected</span>
                  </div>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400">Denied</span>
                </label>
              </div>
            </div>

            <!-- Avatar URL (optional) -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Profile Avatar URL <span class="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">image</mat-icon>
                <input 
                  type="url" 
                  formControlName="avatarUrl"
                  placeholder="https://images.unsplash.com/..."
                  class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
              [disabled]="editForm.invalid || isSubmitting()"
              class="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
            >
              @if (isSubmitting()) {
                <span class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Saving Changes...</span>
              } @else {
                <mat-icon class="!text-sm !w-4 !h-4">save</mat-icon>
                <span>Save Changes</span>
              }
            </button>
          </div>

        </form>

      </div>
    </div>
  `
})
export class EditUserModal {
  private readonly store = inject(InstallationStore);
  private readonly alert = inject(AlertService);

  readonly user = input.required<AppUser>();
  readonly closed = output<void>();
  readonly userUpdated = output<AppUser>();

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly customRoles = () => this.store.roles().filter(r => !r.isSystem);

  readonly editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl<RoleType | string>('installer', [Validators.required]),
    status: new FormControl<string>('active', [Validators.required]),
    avatarUrl: new FormControl<string>('')
  });

  constructor() {
    effect(() => {
      const u = this.user();
      if (u) {
        this.editForm.patchValue({
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '+233 24 555 0100',
          role: u.role || 'installer',
          status: u.status || 'active',
          avatarUrl: u.avatarUrl || ''
        });
      }
    });
  }

  async handleSubmit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Information', 'Please fill in all required fields.');
      return;
    }

    const val = this.editForm.getRawValue();
    const currentUser = this.user();
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const res = await this.store.updateUserAccount(currentUser.id, {
      name: val.name!,
      email: val.email!,
      phone: val.phone!,
      role: val.role!,
      status: val.status!,
      avatarUrl: val.avatarUrl || undefined
    });

    this.isSubmitting.set(false);

    if (res.success && res.user) {
      this.alert.toastSuccess('User Updated', res.message || `Account for "${res.user.name}" updated successfully.`);
      this.userUpdated.emit(res.user);
      this.closed.emit();
    } else {
      this.errorMessage.set(res.message);
      this.alert.toastError('Update Failed', res.message || 'Could not update user details.');
    }
  }
}

