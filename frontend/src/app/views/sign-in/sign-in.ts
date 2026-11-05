import { 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  computed, 
  inject, 
  output, 
  signal 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';

export interface DemoPersona {
  role: string;
  name: string;
  title: string;
  email: string;
  avatar: string;
  badge: string;
}

@Component({
  selector: 'app-sign-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden font-sans p-3 sm:p-6 lg:p-10 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <!-- Ambient Studio Lighting & Grid Pattern -->
      <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none"></div>

      <!-- Main Shell Container -->
      <div class="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-auto">

        <!-- ========================================================================= -->
        <!-- LEFT COLUMN: LUXURY ARCHITECTURAL SHOWCASE & TELEMATICS                   -->
        <!-- ========================================================================= -->
        <div class="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          
          <!-- Subtle corner accent line -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"></div>

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
                <span>ATELIER LIVE</span>
              </div>
            </div>

            <div class="pt-2">
              <h1 class="text-2xl font-black text-white tracking-tight leading-tight">
                Architectural Precision. <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  Real-Time Fleet Telematics.
                </span>
              </h1>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed">
                Empowering master installers, shop fabricators, logistics drivers, and operations leaders with millimetric hanging audit trails and live telemetry.
              </p>
            </div>
          </div>

          <!-- Center Showcase Card: Luxury Frameless Pivot Installation -->
          <div class="my-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3.5 shadow-inner">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <mat-icon class="!text-sm text-emerald-400">verified</mat-icon>
                <span>Hanging Standard DM-2026</span>
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                ±1.5mm Tolerance
              </span>
            </div>

            <!-- Door Specs Micro-Row -->
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between text-slate-300">
                <span class="text-slate-400">Pivot Mechanism:</span>
                <span class="font-medium text-white font-mono text-[11px]">FritsJurgens System M+</span>
              </div>
              <div class="flex items-center justify-between text-slate-300">
                <span class="text-slate-400">Door Core:</span>
                <span class="font-medium text-white font-mono text-[11px]">Galvanized Heavy Armor Core</span>
              </div>
              <div class="flex items-center justify-between text-slate-300">
                <span class="text-slate-400">Security Cylinder:</span>
                <span class="font-medium text-white font-mono text-[11px]">Multi-Point Smart Lockset</span>
              </div>
            </div>

            <!-- Live Telemetry KPI Chips -->
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
              <div class="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span class="block text-sm font-black font-mono text-emerald-400">99.8%</span>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Pass Rate</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span class="block text-sm font-black font-mono text-teal-400">&lt;90s</span>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Dispatch</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-900/70 border border-slate-800/60">
                <span class="block text-sm font-black font-mono text-indigo-400">100%</span>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Verified</span>
              </div>
            </div>
          </div>

          <!-- Bottom Assurance / Standards -->
          <div class="pt-4 border-t border-slate-800/80 space-y-2">
            <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span class="flex items-center gap-1.5">
                <mat-icon class="!text-xs text-emerald-400">shield</mat-icon>
                <span>ISO 9001 Atelier Certified</span>
              </span>
              <span>256-Bit TLS Audit</span>
            </div>
            <p class="text-[11px] text-slate-500 italic">
              "Every rough opening tolerance digitally measured, every site delivery verified before handover."
            </p>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- RIGHT COLUMN: REFINED AUTHENTICATION CARD                                  -->
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
                <button
                  type="button"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs cursor-default"
                >
                  Sign In
                </button>
                <a
                  routerLink="/signup"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Create Account
                </a>
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

              <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Access Your Station</h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-1">
                Authenticate with your enterprise credentials to access active installations and field fleet.
              </p>
            </div>

            <!-- ONE-TAP PERSONA FAST-PASS (DEMO VERIFIED) -->
            <div class="mb-6 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-xs text-amber-400">bolt</mat-icon>
                  <span>Quick Persona Switcher (Verified Access)</span>
                </span>
                <span class="text-[10px] text-slate-500 font-mono">1-Click Auto-Fill</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                @for (p of demoPersonas; track p.email) {
                  <button
                    type="button"
                    (click)="selectPersona(p)"
                    class="p-2 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                    [class]="loginForm.get('email')?.value === p.email ? 'bg-emerald-500/10 border-emerald-500/40 shadow-xs ring-1 ring-emerald-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'"
                    [title]="'Sign in as ' + p.name + ' (' + p.title + ')'"
                  >
                    <img [src]="p.avatar" [alt]="p.name" class="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-700" />
                    <div class="min-w-0">
                      <p class="text-[11px] font-bold text-white truncate leading-tight">{{ p.name }}</p>
                      <p class="text-[9px] text-slate-400 truncate font-mono">{{ p.badge }}</p>
                    </div>
                  </button>
                }
              </div>

              <!-- Dedicated Branch Shop Managers Auto-Fill -->
              <div class="mt-3 pt-2.5 border-t border-slate-800/80">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1">
                    <mat-icon class="!text-xs">storefront</mat-icon>
                    <span>Branch Shop Managers (14 Branches):</span>
                  </span>
                  <span class="text-[9px] text-slate-500 font-mono">1-Click Login</span>
                </div>
                <select 
                  (change)="selectBranchManager($event)" 
                  class="w-full text-xs px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-medium cursor-pointer focus:outline-none focus:border-cyan-500"
                >
                  <option value="">-- Choose Branch Shop Manager to Auto-Fill --</option>
                  @for (bm of branchShopManagers; track bm.email) {
                    <option [value]="bm.email">
                      🏪 {{ bm.branchName }}: {{ bm.name }} ({{ bm.phone }})
                    </option>
                  }
                </select>
              </div>
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

            <!-- Sign In Form -->
            <form [formGroup]="loginForm" (ngSubmit)="handleFormSubmit()" class="space-y-4">
              
              <!-- Email Input -->
              <div>
                <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  Work Identifier / Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <mat-icon class="!text-base">alternate_email</mat-icon>
                  </div>
                  <input
                    type="email"
                    formControlName="email"
                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
                    placeholder="e.g. manager@doormasterops.com"
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-300">
                    Master Security Key
                  </label>
                  <button
                    type="button"
                    (click)="openForgotModal()"
                    class="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                  >
                    Forgot Key?
                  </button>
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <mat-icon class="!text-base">lock</mat-icon>
                  </div>
                  <input
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    class="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
                    placeholder="Enter security key"
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
              </div>

              <!-- Remember Me Row -->
              <div class="flex items-center justify-between pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-300 select-none">
                  <input 
                    type="checkbox" 
                    formControlName="rememberMe" 
                    class="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer" 
                  />
                  <span>Keep session active on this workstation</span>
                </label>
              </div>

              <!-- Submit CTA Button -->
              <button
                type="submit"
                [disabled]="isSubmitting()"
                class="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-500 text-slate-950 shadow-emerald-500/20 font-mono"
              >
                @if (isSubmitting()) {
                  <span class="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                } @else {
                  <mat-icon class="!text-base">key</mat-icon>
                  <span>Authenticate to Station</span>
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

      <!-- ========================================================================= -->
      <!-- SECURITY KEY RECOVERY MODAL (ELEGANT DIALOG)                               -->
      <!-- ========================================================================= -->
      @if (forgotModalOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div class="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative text-slate-200">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <mat-icon class="!text-lg">lock_reset</mat-icon>
                <span>Security Key Recovery</span>
              </div>
              <button 
                type="button" 
                (click)="closeForgotModal()" 
                class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <div class="py-4 space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                In compliance with DoorMaster precision installation standards, security tokens are managed via the Operations Governance Desk.
              </p>
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] font-mono space-y-1">
                <p class="text-slate-400">Default Seed Station Password:</p>
                <p class="text-emerald-400 font-bold select-all font-mono text-xs">DoorMaster2026!*</p>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Enter your work identifier:</label>
                <input 
                  type="email" 
                  [ngModel]="recoveryEmail()" 
                  (ngModelChange)="recoveryEmail.set($event)"
                  placeholder="user@doormasterops.com"
                  class="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button 
                type="button" 
                (click)="closeForgotModal()" 
                class="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button" 
                (click)="sendRecoveryLink()" 
                class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <mat-icon class="!text-sm">send</mat-icon>
                <span>Dispatch Recovery Link</span>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class SignIn {
  private readonly cdr = inject(ChangeDetectorRef);

  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);

  signInCompleted = output<any>();
  goToLanding = output<void>();

  readonly authSubTab = signal<'signin' | 'register'>('signin');
  readonly showPassword = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly authErrorMessage = signal<string | null>(null);
  readonly authSuccessMessage = signal<string | null>(null);

  readonly forgotModalOpen = signal<boolean>(false);
  readonly recoveryEmail = signal<string>('');
  readonly recoverySent = signal<boolean>(false);

  readonly demoPersonas: DemoPersona[] = [
    {
      role: 'manager',
      name: 'Sarah Sterling',
      title: 'Operations Director',
      email: 'manager@doormasterops.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      badge: 'Ops Director'
    },
    {
      role: 'installer',
      name: 'Marcus Vance',
      title: 'Lead Master Tech',
      email: 'm.vance@doormasterops.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      badge: 'Master Installer'
    },
    {
      role: 'dispatcher',
      name: 'Emmanuel Kojo',
      title: 'Logistics Lead Driver',
      email: 'dispatch@doormasterops.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      badge: 'Fleet Dispatcher'
    },
    {
      role: 'shop_manager',
      name: 'Elena Rostova',
      title: 'Master Joiner & Shop Head',
      email: 'shop@doormasterops.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      badge: 'Shop Bay Head'
    },
    {
      role: 'account_officer',
      name: 'Abena Osei',
      title: 'Chief Financial Officer',
      email: 'finance@doormasterops.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      badge: 'Finance Officer'
    },
    {
      role: 'client',
      name: 'Kwame Mensah',
      title: 'Cantonments Villa Client',
      email: 'client@doormasterops.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      badge: 'Site Client'
    }
  ];

  readonly branchShopManagers = [
    { branchName: 'Obeyeyie', name: 'Kofi Boateng', email: 'shop.obeyeyie@doormaster.online', phone: '0203169184' },
    { branchName: 'Pobiman Turkey', name: 'Yaw Antwi', email: 'shop.pobiman-turkey@doormaster.online', phone: '0207867882' },
    { branchName: 'Pobiman Economy', name: 'Kwabena Agyeman', email: 'shop.pobiman-economy@doormaster.online', phone: '0502584180' },
    { branchName: 'ACP Pokuase', name: 'Akua Darko', email: 'shop.acp@doormaster.online', phone: '0201705689' },
    { branchName: 'Nsawam Overhead', name: 'Kwame Appiah', email: 'shop.nsawam-overhead@doormaster.online', phone: '0505892144' },
    { branchName: 'Nsawam Hospital Rd', name: 'Ama Serwaa', email: 'shop.nsawam-hospital@doormaster.online', phone: '0535825645' },
    { branchName: 'Tema', name: 'Ebenezer Quaye', email: 'shop.tema@doormaster.online', phone: '0502290982' },
    { branchName: 'Suhum', name: 'Daniel Asare', email: 'shop.suhum@doormaster.online', phone: '0201752755' },
    { branchName: 'Ashalaja', name: 'Francis Mensah', email: 'shop.ashalaja@doormaster.online', phone: '0504725294' },
    { branchName: 'Kumasi Ahinsan', name: 'Osei Tutu', email: 'shop.kumasi-ahinsan@doormaster.online', phone: '0535829827' },
    { branchName: 'Kasoa Tipa Junction', name: 'Kojo Baidoo', email: 'shop.kasoa-tipa@doormaster.online', phone: '0533739756' },
    { branchName: 'Amrahia', name: 'Priscilla Kyei', email: 'shop.amrahia@doormaster.online', phone: '0531025779' },
    { branchName: 'Tseaddo', name: 'Nathaniel Tagoe', email: 'shop.tseaddo@doormaster.online', phone: '0591952205' },
    { branchName: 'Kronum Kumasi', name: 'Baffour Gyan', email: 'shop.kronum@doormaster.online', phone: '0531025775' }
  ];

  readonly loginForm = this.fb.group({
    email: ['manager@doormasterops.com', [Validators.required, Validators.email]],
    password: ['DoorMaster2026!*', [Validators.required, Validators.minLength(8)]],
    rememberMe: [true]
  });

  constructor() {
    if (this.store.isAuthenticated()) {
      const role = this.store.apiUser()?.role;
      const target = role === 'client' ? '/client' : '/overview';
      this.router.navigate([target]);
      return;
    }

    this.store.checkDbStatus();
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  selectPersona(persona: DemoPersona) {
    this.loginForm.patchValue({
      email: persona.email,
      password: 'DoorMaster2026!*'
    });
    this.authErrorMessage.set(null);
    this.authSuccessMessage.set(null);
    this.alert.toastSuccess(`Auto-filled: ${persona.name}`, `${persona.title} credentials ready.`);
  }

  selectBranchManager(event: Event) {
    const email = (event.target as HTMLSelectElement).value;
    if (!email) return;
    const bm = this.branchShopManagers.find(m => m.email === email);
    if (bm) {
      this.loginForm.patchValue({
        email: bm.email,
        password: 'DoorMaster2026!*'
      });
      this.authErrorMessage.set(null);
      this.authSuccessMessage.set(null);
      this.alert.toastSuccess(`Auto-filled: ${bm.name}`, `Shop Manager for ${bm.branchName}`);
    }
  }

  toggleShowPassword() {
    this.showPassword.update(p => !p);
  }

  openForgotModal() {
    this.recoveryEmail.set(this.loginForm.get('email')?.value || 'manager@doormasterops.com');
    this.forgotModalOpen.set(true);
  }

  closeForgotModal() {
    this.forgotModalOpen.set(false);
  }

  sendRecoveryLink() {
    const email = this.recoveryEmail();
    if (!email || !email.includes('@')) {
      this.alert.toastWarning('Invalid Identifier', 'Please enter a valid work email address.');
      return;
    }
    this.alert.toastSuccess('Recovery Dispatch Sent', `Temporary security key dispatch sent to ${email}`);
    setTimeout(() => {
      this.closeForgotModal();
    }, 1200);
  }

  async handleFormSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';
    const rememberMe = Boolean(this.loginForm.value.rememberMe);

    this.isSubmitting.set(true);
    this.authErrorMessage.set(null);
    this.authSuccessMessage.set(null);

    const res = await this.store.signInWithApi(email, password, rememberMe);
    this.isSubmitting.set(false);

    if (res.success && res.user) {
      this.authSuccessMessage.set(`Welcome back, ${res.user.name}!`);
      const target = res.user.role === 'client' ? '/client' : '/overview';
      setTimeout(() => {
        this.router.navigate([target]);
      }, 350);
    } else {
      const errorMsg = res.message || 'Authentication failed.';
      this.authErrorMessage.set(errorMsg);
      this.alert.error('Sign In Failed', errorMsg);
    }
  }
}
