import { 
  ChangeDetectionStrategy, 
  Component, 
  computed, 
  inject, 
  signal 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { RoleType } from '../../models/installation.model';

export interface RoleOption {
  id: RoleType;
  title: string;
  icon: string;
  badge: string;
  description: string;
}

@Component({
  selector: 'app-sign-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden font-sans p-3 sm:p-6 lg:p-10 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <!-- Ambient Studio Lighting & Grid Pattern -->
      <div class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none"></div>

      <!-- Main Shell Container -->
      <div class="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-auto">

        <!-- ========================================================================= -->
        <!-- LEFT COLUMN: LUXURY ARCHITECTURAL SHOWCASE & CRAFTSMANSHIP                -->
        <!-- ========================================================================= -->
        <div class="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          
          <!-- Subtle corner accent line -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-500"></div>

          <!-- Top Brand Identity Header -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <a routerLink="/landing" class="flex items-center gap-3 group cursor-pointer">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 text-white flex items-center justify-center font-mono font-black text-sm shadow-md group-hover:border-emerald-400 transition-colors">
                  <span class="text-emerald-400">DM</span>
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-base font-black tracking-tight text-white">DoorMaster</span>
                    <span class="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded font-bold tracking-wider">
                      PRO
                    </span>
                  </div>
                  <p class="text-[10px] text-slate-400 font-mono">Architectural Hardware & Fleet Ops</p>
                </div>
              </a>

              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-emerald-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ONBOARDING DESK</span>
              </div>
            </div>

            <div class="pt-2">
              <h1 class="text-2xl font-black text-white tracking-tight leading-tight">
                Join the Precision <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  Installation Network.
                </span>
              </h1>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed">
                Connect your field specialty to our digital audit trail. Seamless job routing, verified milestone payouts, and telemetry from atelier to handover.
              </p>
            </div>
          </div>

          <!-- Center Showcase Card: Quality & Standards Checklist -->
          <div class="my-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 shadow-inner">
            <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <mat-icon class="!text-sm text-emerald-400">verified_user</mat-icon>
              <span>Atelier Onboarding Guarantees</span>
            </span>

            <div class="space-y-2.5 text-xs">
              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <mat-icon class="!text-xs">check</mat-icon>
                </div>
                <div>
                  <p class="font-bold text-white text-[11px]">Millimetric Audit Trail</p>
                  <p class="text-[10px] text-slate-400 leading-normal">Digital plumb, level, and pivot checks recorded with GPS timestamp.</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <mat-icon class="!text-xs">check</mat-icon>
                </div>
                <div>
                  <p class="font-bold text-white text-[11px]">Instant Payout Verification</p>
                  <p class="text-[10px] text-slate-400 leading-normal">Fast milestone clearances and bonus threshold allocations.</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <mat-icon class="!text-xs">check</mat-icon>
                </div>
                <div>
                  <p class="font-bold text-white text-[11px]">Real-Time Fleet Coordination</p>
                  <p class="text-[10px] text-slate-400 leading-normal">Live delivery truck tracking with automated ETA notifications.</p>
                </div>
              </div>
            </div>

            <!-- Certified Standards Footer -->
            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-center">
              <div class="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span class="block text-xs font-black font-mono text-emerald-400">EN 12209</span>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Hardware Spec</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span class="block text-xs font-black font-mono text-teal-400">10-Year</span>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Core Warranty</span>
              </div>
            </div>
          </div>

          <!-- Bottom Assurance / Standards -->
          <div class="pt-4 border-t border-slate-800/80 space-y-2">
            <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span class="flex items-center gap-1.5">
                <mat-icon class="!text-xs text-emerald-400">security</mat-icon>
                <span>Enterprise Identity Governance</span>
              </span>
              <span>Encrypted Storage</span>
            </div>
            <p class="text-[11px] text-slate-500 italic">
              "Accounts are verified by the Operations Governance Desk to preserve precision hanging certifications."
            </p>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- RIGHT COLUMN: REGISTRATION FORM                                            -->
        <!-- ========================================================================= -->
        <div class="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl shadow-2xl flex flex-col justify-between relative">
          
          <div>
            <!-- Top Controls: Showcase Backlink + Tab Switcher -->
            <div class="flex items-center justify-between pb-6 border-b border-slate-800/80">
              <a 
                routerLink="/landing" 
                class="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors group cursor-pointer"
              >
                <mat-icon class="!text-sm group-hover:-translate-x-0.5 transition-transform">arrow_back</mat-icon>
                <span>Public Showcase</span>
              </a>

              <div class="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                <a
                  routerLink="/signin"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Sign In
                </a>
                <button
                  type="button"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs cursor-default"
                >
                  Create Account
                </button>
              </div>
            </div>

            <!-- Header Text -->
            <div class="mt-6 mb-6">
              <div class="lg:hidden flex items-center gap-2.5 mb-4">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                  <span class="text-emerald-400">DM</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-sm font-black tracking-tight text-white">DoorMaster</span>
                  <span class="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded font-bold">
                    PRO
                  </span>
                </div>
              </div>

              <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Create Atelier Account</h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-1">
                Select your operational role and register credentials for DoorMaster operations access.
              </p>
            </div>

            <!-- Feedback Banners -->
            @if (authErrorMessage()) {
              <div class="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <mat-icon class="!text-base text-rose-400 shrink-0">error_outline</mat-icon>
                <span>{{ authErrorMessage() }}</span>
              </div>
            }

            @if (authSuccessMessage()) {
              <div class="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <mat-icon class="!text-base text-emerald-400 shrink-0">check_circle</mat-icon>
                <span>{{ authSuccessMessage() }}</span>
              </div>
            }

            <!-- Registration Form -->
            <form [formGroup]="registerForm" (ngSubmit)="handleRegisterSubmit()" class="space-y-4">
              
              <!-- Personal Info Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <!-- Full Name Input -->
                <div>
                  <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Full Legal Name *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <mat-icon class="!text-base">badge</mat-icon>
                    </div>
                    <input
                      type="text"
                      formControlName="name"
                      class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans"
                      placeholder="e.g. David Mensah"
                    />
                  </div>
                </div>

                <!-- Work Email Input -->
                <div>
                  <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Work Email Identifier *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <mat-icon class="!text-base">alternate_email</mat-icon>
                    </div>
                    <input
                      type="email"
                      formControlName="email"
                      class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
                      placeholder="david@doormasterops.com"
                    />
                  </div>
                </div>
              </div>

              <!-- Phone & Direct Contact -->
              <div>
                <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  Direct Mobile Phone (Dispatch SMS) *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <mat-icon class="!text-base">phone</mat-icon>
                  </div>
                  <input
                    type="tel"
                    formControlName="phone"
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
                    placeholder="+233 24 555 0199"
                  />
                </div>
              </div>

              <!-- Operational Role Selector: Interactive Visual Cards -->
              <div>
                <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  Operational Role & Access Tier *
                </label>
                
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  @for (role of roleOptions; track role.id) {
                    <div
                      role="button"
                      tabindex="0"
                      (click)="selectRole(role.id)"
                      (keydown.enter)="selectRole(role.id)"
                      (keydown.space)="$event.preventDefault(); selectRole(role.id)"
                      class="p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between"
                      [class]="registerForm.get('role')?.value === role.id 
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-xs ring-1 ring-emerald-500/40 text-white' 
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/40 text-slate-300'"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <mat-icon class="!text-lg" [class]="registerForm.get('role')?.value === role.id ? 'text-emerald-400' : 'text-slate-400'">
                          {{ role.icon }}
                        </mat-icon>
                        <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded" 
                          [class]="registerForm.get('role')?.value === role.id ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'">
                          {{ role.badge }}
                        </span>
                      </div>
                      <p class="text-xs font-bold truncate leading-tight">{{ role.title }}</p>
                      <p class="text-[10px] text-slate-400 line-clamp-1 mt-0.5 leading-tight">{{ role.description }}</p>
                    </div>
                  }
                </div>
              </div>

              <!-- Password Input with Live Strength Bar -->
              <div>
                <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  Master Security Key (Password) *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <mat-icon class="!text-base">lock</mat-icon>
                  </div>
                  <input
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    class="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
                    placeholder="Minimum 8 characters with numbers & symbols"
                  />
                  <button
                    type="button"
                    (click)="toggleShowPassword()"
                    class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                    [title]="showPassword() ? 'Hide Password' : 'Show Password'"
                  >
                    <mat-icon class="!text-lg">{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>

                <!-- Password Strength Meter -->
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="text-slate-400">Security Grade:</span>
                    <span class="font-bold text-white">{{ passwordStrength().label }}</span>
                  </div>
                  <div class="grid grid-cols-4 gap-1.5 h-1">
                    <div class="rounded-full transition-colors" [class]="passwordStrength().score >= 1 ? passwordStrength().color : 'bg-slate-800'"></div>
                    <div class="rounded-full transition-colors" [class]="passwordStrength().score >= 2 ? passwordStrength().color : 'bg-slate-800'"></div>
                    <div class="rounded-full transition-colors" [class]="passwordStrength().score >= 3 ? passwordStrength().color : 'bg-slate-800'"></div>
                    <div class="rounded-full transition-colors" [class]="passwordStrength().score >= 4 ? passwordStrength().color : 'bg-slate-800'"></div>
                  </div>
                </div>
              </div>

              <!-- Terms & Atelier Agreement -->
              <div class="pt-1">
                <label class="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 select-none">
                  <input 
                    type="checkbox" 
                    [ngModel]="agreedToTerms()" 
                    (ngModelChange)="agreedToTerms.set($event)"
                    [ngModelOptions]="{standalone: true}"
                    class="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer mt-0.5 shrink-0" 
                  />
                  <span class="leading-relaxed">
                    I acknowledge DoorMaster precision standards (±1.5mm tolerance threshold) and agree to digital milestone sign-off rules.
                  </span>
                </label>
              </div>

              <!-- Submit CTA Button -->
              <button
                type="submit"
                [disabled]="isSubmitting() || !agreedToTerms()"
                class="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-500 text-slate-950 shadow-emerald-500/20 font-mono"
              >
                @if (isSubmitting()) {
                  <span class="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Registering Credentials...</span>
                } @else {
                  <mat-icon class="!text-base">person_add</mat-icon>
                  <span>Create Atelier Account</span>
                }
              </button>
            </form>
          </div>

          <!-- Footer Metadata -->
          <div class="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" [class]="store.dbStatus()?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'"></span>
              <span>{{ store.dbStatus()?.connected ? 'MySQL Cloud Engine Connected' : 'Atelier Local Simulation Engine' }}</span>
            </div>
            <div>
              <span>DoorMaster Systems &copy; 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SignUp {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);

  readonly authSubTab = signal<'signin' | 'register'>('register');
  readonly showPassword = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly authErrorMessage = signal<string | null>(null);
  readonly authSuccessMessage = signal<string | null>(null);
  readonly agreedToTerms = signal<boolean>(true);

  readonly roleOptions: RoleOption[] = [
    {
      id: 'manager',
      title: 'Operations Manager',
      icon: 'admin_panel_settings',
      badge: 'HQ Oversight',
      description: 'Fleet radar, crew dispatch, bonus approvals'
    },
    {
      id: 'installer',
      title: 'Master Installer',
      icon: 'handyman',
      badge: 'Site Operations',
      description: 'Precision hanging, GPS clock-in & proof capture'
    },
    {
      id: 'dispatcher',
      title: 'Logistics Dispatcher',
      icon: 'local_shipping',
      badge: 'Fleet Transit',
      description: 'Truck manifests, transit routes & site handover'
    },
    {
      id: 'shop_manager',
      title: 'Shop Bay Head',
      icon: 'storefront',
      badge: 'Workshop Bay',
      description: 'Bespoke door specs & counter bookings'
    },
    {
      id: 'account_officer',
      title: 'Finance Officer',
      icon: 'account_balance_wallet',
      badge: 'Ledger Audit',
      description: 'Order billing, counter payments & payouts'
    },
    {
      id: 'client',
      title: 'Client / Site Owner',
      icon: 'home',
      badge: 'Live Tracking',
      description: 'Live ETA journey & digital sign-off'
    }
  ];

  readonly registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['manager', [Validators.required]],
    phone: ['+233 24 555 0199', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  readonly passwordStrength = computed(() => {
    const pwd = this.registerForm.get('password')?.value || '';
    if (!pwd) return { score: 0, label: 'Not entered', color: 'bg-slate-700' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Moderate', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Strong', color: 'bg-emerald-400' };
    return { score: 4, label: 'Precision Grade', color: 'bg-emerald-300' };
  });

  constructor() {}

  selectRole(roleId: RoleType) {
    this.registerForm.patchValue({ role: roleId });
  }

  toggleShowPassword() {
    this.showPassword.update(p => !p);
  }

  async handleRegisterSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Details', 'Please complete all required fields.');
      return;
    }

    if (!this.agreedToTerms()) {
      this.alert.toastWarning('Compliance Agreement', 'Please accept the precision installation standards.');
      return;
    }

    const { name, email, role, phone, password } = this.registerForm.value;
    this.isSubmitting.set(true);
    this.authErrorMessage.set(null);
    this.authSuccessMessage.set(null);

    const res = await this.store.registerWithApi(
      name || '',
      email || '',
      (role as any) || 'manager',
      phone || '',
      password || ''
    );
    this.isSubmitting.set(false);

    if (res.success && res.user) {
      if (res.user.status === 'pending') {
        this.authSuccessMessage.set(`Account submitted for approval. Welcome, ${res.user.name}!`);
        this.alert.success('Registration Submitted', 'Your account has been submitted for Operations Governance approval.');
      } else {
        this.authSuccessMessage.set(`Account created. Logged in as ${res.user.name}`);
        this.alert.success('Welcome to DoorMaster!', `Account created successfully.`);
        setTimeout(() => {
          this.router.navigate(['/overview']);
        }, 500);
      }
    } else {
      const regError = res.message || 'Registration failed.';
      this.authErrorMessage.set(regError);
      this.alert.error('Registration Failed', regError);
    }
  }

  setSignInTab() {
    this.router.navigate(['/signin']);
  }
}
