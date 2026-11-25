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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-sign-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-white text-[#111215] dark:bg-[#111215] dark:text-white flex items-center justify-center relative overflow-hidden font-sans p-3 sm:p-6 lg:p-10 selection:bg-[#59000A] selection:text-white transition-colors duration-200">
      
      <!-- Subtle Brand Accent Glow -->
      <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#59000A]/10 dark:bg-[#59000A]/30 rounded-full blur-[160px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#59000A]/10 dark:bg-[#59000A]/20 rounded-full blur-[160px] pointer-events-none"></div>

      <!-- Main Shell Container -->
      <div class="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-auto">

        <!-- ========================================================================= -->
        <!-- LEFT COLUMN: WHAT DOORMASTER INSTALLATION OPS DOES                        -->
        <!-- ========================================================================= -->
        <div class="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-3xl bg-slate-50 dark:bg-[#181A1F] border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-xl dark:shadow-2xl">
          
          <!-- Burgundy accent bar -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-[#59000A]"></div>

          <!-- Brand Header -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <a routerLink="/landing" class="flex items-center gap-3 group cursor-pointer">
                <div class="w-10 h-10 rounded-xl bg-[#59000A] text-white flex items-center justify-center font-mono font-black text-sm shadow-md">
                  DM
                </div>
                <div>
                  <span class="text-base font-black tracking-tight text-[#111215] dark:text-white block">DoorMaster</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Installation Operations</p>
                </div>
              </a>
            </div>

            <div class="pt-2">
              <h1 class="text-2xl font-black text-[#111215] dark:text-white tracking-tight leading-tight">
                Door Installation &amp; <br />
                <span class="text-[#59000A] dark:text-rose-300">Field Operations</span>
              </h1>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Manage door bookings, payment verification, driver delivery, installer dispatch, and site sign-off in one place.
              </p>
            </div>
          </div>

          <!-- 4-Step App Workflow -->
          <div class="my-6 space-y-2.5">
            <div class="p-3 rounded-xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 flex items-start gap-3">
              <span class="w-6 h-6 rounded-lg bg-[#59000A] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p class="text-xs font-bold text-[#111215] dark:text-white">Shop Booking &amp; Account Verification</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-400">Book doors at any branch and verify payment before dispatch.</p>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 flex items-start gap-3">
              <span class="w-6 h-6 rounded-lg bg-[#59000A] text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p class="text-xs font-bold text-[#111215] dark:text-white">Team &amp; Driver Dispatch</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-400">Assign installers and store drivers with live GPS route tracking.</p>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 flex items-start gap-3">
              <span class="w-6 h-6 rounded-lg bg-[#59000A] text-white text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <p class="text-xs font-bold text-[#111215] dark:text-white">Site Clock-In, Checklist &amp; Photos</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-400">Track site arrival, complete door checklists, and upload before/after photos.</p>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 flex items-start gap-3">
              <span class="w-6 h-6 rounded-lg bg-[#59000A] text-white text-[11px] font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <p class="text-xs font-bold text-[#111215] dark:text-white">Client Digital Sign-Off</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-400">Capture customer verification and rating upon completion.</p>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span>11 DoorMaster Branches</span>
            <span>Ghana Operations</span>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- RIGHT COLUMN: AUTHENTICATION CARD                                         -->
        <!-- ========================================================================= -->
        <div class="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#181A1F] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between relative">
          
          <div>
            <!-- Top Controls: Backlink + Theme Toggle + Tab Switcher -->
            <div class="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-slate-200 dark:border-white/10">
              <a 
                routerLink="/landing" 
                class="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-[#111215] dark:hover:text-white transition-colors group cursor-pointer"
              >
                <mat-icon class="!text-sm group-hover:-translate-x-0.5 transition-transform">arrow_back</mat-icon>
                <span>Back to Home</span>
              </a>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  (click)="themeStore.toggleTheme()"
                  class="h-8 px-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-[#111215] dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  [title]="themeStore.isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                >
                  <mat-icon class="!text-sm" [class.text-amber-500]="!themeStore.isDark()" [class.text-rose-300]="themeStore.isDark()">
                    {{ themeStore.isDark() ? 'dark_mode' : 'light_mode' }}
                  </mat-icon>
                  <span class="hidden sm:inline">{{ themeStore.isDark() ? 'Dark' : 'Light' }}</span>
                </button>

                <div class="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#111215] border border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#59000A] text-white shadow-xs cursor-default"
                  >
                    Sign In
                  </button>
                  <a
                    routerLink="/signup"
                    class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#111215] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>

            <!-- Header Text -->
            <div class="mt-6 mb-6">
              <div class="lg:hidden flex items-center gap-2.5 mb-4">
                <div class="w-8 h-8 rounded-xl bg-[#59000A] text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                  DM
                </div>
                <span class="text-sm font-black tracking-tight text-[#111215] dark:text-white">DoorMaster</span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-black text-[#111215] dark:text-white tracking-tight">Sign In</h2>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Sign in with your DoorMaster account to access your dashboard.
              </p>
            </div>

            <!-- Feedback Banners -->
            @if (authErrorMessage()) {
              <div class="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <mat-icon class="!text-base text-rose-600 dark:text-rose-400 shrink-0">error_outline</mat-icon>
                <span>{{ authErrorMessage() }}</span>
              </div>
            }

            @if (authSuccessMessage()) {
              <div class="mb-4 p-3 rounded-xl bg-[#59000A]/10 border border-[#59000A]/30 text-[#59000A] dark:text-rose-200 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <mat-icon class="!text-base text-[#59000A] dark:text-rose-300 shrink-0">check_circle</mat-icon>
                <span>{{ authSuccessMessage() }}</span>
              </div>
            }

            <!-- Sign In Form -->
            <form [formGroup]="loginForm" (ngSubmit)="handleFormSubmit()" class="space-y-4">
              
              <!-- Email Input -->
              <div>
                <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <mat-icon class="!text-base">alternate_email</mat-icon>
                  </div>
                  <input
                    type="email"
                    formControlName="email"
                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/15 text-[#111215] dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#59000A] focus:ring-2 focus:ring-[#59000A]/20 transition-all font-mono"
                    placeholder="e.g. manager@doormasterops.com"
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    (click)="openForgotModal()"
                    class="text-[11px] font-medium text-[#59000A] dark:text-rose-300 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <mat-icon class="!text-base">lock</mat-icon>
                  </div>
                  <input
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    class="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/15 text-[#111215] dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#59000A] focus:ring-2 focus:ring-[#59000A]/20 transition-all font-mono"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    (click)="toggleShowPassword()"
                    class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#111215] dark:hover:text-white cursor-pointer"
                    [title]="showPassword() ? 'Hide Password' : 'Show Password'"
                  >
                    <mat-icon class="!text-lg">{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
              </div>

              <!-- Remember Me Row -->
              <div class="flex items-center justify-between pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400 select-none">
                  <input 
                    type="checkbox" 
                    formControlName="rememberMe" 
                    class="w-4 h-4 rounded border-slate-300 dark:border-white/20 text-[#59000A] focus:ring-[#59000A]/30 cursor-pointer" 
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <!-- Submit CTA Button -->
              <button
                type="submit"
                [disabled]="isSubmitting()"
                class="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer bg-[#59000A] hover:bg-[#73000E] text-white font-mono"
              >
                @if (isSubmitting()) {
                  <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Signing In...</span>
                } @else {
                  <mat-icon class="!text-base">login</mat-icon>
                  <span>Sign In</span>
                }
              </button>
            </form>
          </div>

          <!-- Footer Metadata -->
          <div class="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-center text-[11px] text-slate-500 font-mono">
            <span>DoorMaster Systems &copy; 2026</span>
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
                <span>Password Recovery</span>
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
                Enter your work email and contact your system administrator if you need a password reset.
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
                class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer transition-colors flex items-center gap-1.5"
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
  readonly themeStore = inject(ThemeStore);
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

  private readonly route = inject(ActivatedRoute);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [true]
  });

  constructor() {
    if (this.store.isAuthenticated()) {
      this.router.navigate(['/overview']);
      return;
    }

    this.store.checkDbStatus();
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  toggleShowPassword() {
    this.showPassword.update(p => !p);
  }

  openForgotModal() {
    this.recoveryEmail.set(this.loginForm.get('email')?.value || '');
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
    const rawEmail = (this.loginForm.value.email || '').trim();
    if (rawEmail !== this.loginForm.value.email) {
      this.loginForm.patchValue({ email: rawEmail });
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      const msg = 'Please enter a valid email address and password.';
      this.authErrorMessage.set(msg);
      this.alert.toastWarning('Incomplete Credentials', msg);
      return;
    }

    const email = rawEmail;
    const password = this.loginForm.value.password || '';
    const rememberMe = Boolean(this.loginForm.value.rememberMe);

    this.isSubmitting.set(true);
    this.authErrorMessage.set(null);
    this.authSuccessMessage.set(null);

    try {
      const res = await this.store.signInWithApi(email, password, rememberMe);
      this.isSubmitting.set(false);

      if (res.success && res.user) {
        const welcomeMsg = res.message || `Welcome back, ${res.user.name}!`;
        this.authSuccessMessage.set(welcomeMsg);
        this.alert.toastSuccess('Signed In Successfully', welcomeMsg);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const targetUrl = returnUrl && returnUrl.startsWith('/') ? returnUrl : '/overview';
        setTimeout(() => {
          void this.router.navigateByUrl(targetUrl);
        }, 250);
      } else {
        const errorMsg = res.message || 'Authentication failed.';
        this.authErrorMessage.set(errorMsg);
        this.alert.error('Sign In Failed', errorMsg);
      }
    } catch (err: any) {
      this.isSubmitting.set(false);
      const errorMsg = err?.message || 'Unable to sign in right now.';
      this.authErrorMessage.set(errorMsg);
      this.alert.error('Sign In Failed', errorMsg);
    }
  }
}
