import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';
import { DoorCategory, InstallationInquiry } from '../../models/installation.model';
import { PhoneInputComponent } from '../../components/phone-input/phone-input';

export interface HeroSlide {
  id: number;
  badge: string;
  installerName: string;
  installerRole: string;
  doorTitle: string;
  doorCategory: string;
  location: string;
  stage: string;
  tagline: string;
  description: string;
  photoUrl: string;
  statNumber: string;
  statLabel: string;
}

@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule, PhoneInputComponent],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-white">
      
      <!-- ========================================================================= -->
      <!-- TOP NAVIGATION BAR                                                        -->
      <!-- ========================================================================= -->
      <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/85 border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <!-- Brand -->
          <button type="button" (click)="scrollToTop()" class="flex items-center gap-3 cursor-pointer text-left">
            <div class="w-10 h-10 rounded-xl bg-[#59000A] text-white flex items-center justify-center font-mono font-black text-lg shadow-md shrink-0">
              DM
            </div>
            <div>
              <span class="text-lg font-black tracking-tight text-[#111215] dark:text-white block">DoorMaster</span>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Installation Operations</p>
            </div>
          </button>

          <!-- Nav Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#hero-slider" (click)="scrollToSection('hero-slider', $event)" class="hover:text-[#59000A] dark:hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">handyman</mat-icon>
              <span>Installations</span>
            </a>
            <a href="#standards" (click)="scrollToSection('standards', $event)" class="hover:text-[#59000A] dark:hover:text-rose-300 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">verified</mat-icon>
              <span>How It Works</span>
            </a>
          </div>

          <!-- Action Buttons & Theme Toggle -->
          <div class="flex items-center gap-2.5 sm:gap-3">
            
            <!-- Navbar Theme Toggle Button (Light/Dark Mode) -->
            <button 
              type="button" 
              (click)="themeStore.toggleTheme()" 
              class="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-2 shadow-xs active:scale-95 cursor-pointer"
              [title]="themeStore.isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              aria-label="Toggle light or dark theme"
            >
              <mat-icon class="!text-lg" [class.text-amber-500]="!themeStore.isDark()" [class.text-indigo-400]="themeStore.isDark()">
                {{ themeStore.isDark() ? 'dark_mode' : 'light_mode' }}
              </mat-icon>
              <span class="text-xs font-semibold hidden sm:inline">
                {{ themeStore.isDark() ? 'Dark' : 'Light' }}
              </span>
            </button>

            <!-- Sign In & Portal Access Button -->
            <button 
              type="button" 
              (click)="navigateToSignIn()" 
              class="h-10 px-3.5 sm:px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <mat-icon class="!text-base text-[#59000A] dark:text-rose-300">login</mat-icon>
              <span>Sign In</span>
            </button>

            <!-- Request Installation Primary CTA -->
            <a 
              href="#contact-form"
              (click)="scrollToSection('contact-form', $event)"
              class="hidden sm:inline-flex h-10 px-4 rounded-xl text-xs font-bold text-white bg-[#59000A] hover:bg-[#73000E] transition-all items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Request Installation</span>
              <mat-icon class="!text-sm !w-4 !h-4">arrow_downward</mat-icon>
            </a>
          </div>
        </div>
      </nav>

      <!-- ========================================================================= -->
      <!-- 1. HERO SLIDER SECTION: DOORMASTER INSTALLATION OPERATIONS                -->
      <!-- ========================================================================= -->
      <section id="hero-slider" class="relative overflow-hidden bg-white dark:bg-[#111215] py-10 lg:py-16 border-b border-slate-200 dark:border-white/10 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Slider Header Controls -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#59000A]/10 dark:bg-[#59000A]/30 border border-[#59000A]/30 text-[#59000A] dark:text-rose-200 text-[11px] font-semibold font-mono mb-3">
                DOORMASTER INSTALLATION OPS
              </span>
              <h1 class="text-3xl sm:text-5xl font-black text-[#111215] dark:text-white tracking-tight leading-tight">
                Door Installation, <br class="hidden sm:inline" />
                <span class="text-[#59000A] dark:text-rose-300">
                  Tracked From Shop to Sign-Off.
                </span>
              </h1>
              <p class="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                Book door installations, verify payments, dispatch drivers and installers with live GPS, and complete every job with checklists, before/after photos, and client sign-off.
              </p>
            </div>

            <!-- Slide Navigation Arrows & Counter -->
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
                <strong class="text-slate-900 dark:text-white">0{{ currentSlideIndex() + 1 }}</strong> / 0{{ slides.length }}
              </span>
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  (click)="prevSlide()"
                  class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <mat-icon class="!text-lg">arrow_back</mat-icon>
                </button>
                <button 
                  type="button" 
                  (click)="nextSlide()"
                  class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <mat-icon class="!text-lg">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Active Slide Showcase Card -->
          @let slide = currentSlide();
          <div class="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl transition-all duration-500">
            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              <!-- Slide Left: Technician & Work Description -->
              <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between z-10 bg-white/95 lg:bg-white/90 dark:bg-slate-900/90 dark:lg:bg-slate-900/80 backdrop-blur-sm">
                <div>
                  <div class="flex items-center gap-2 mb-4">
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      {{ slide.badge }}
                    </span>
                    <span class="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <mat-icon class="!text-xs text-slate-400">location_on</mat-icon>
                      {{ slide.location }}
                    </span>
                  </div>

                  <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                    {{ slide.doorTitle }}
                  </h2>
                  <p class="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wide font-semibold">
                    {{ slide.tagline }}
                  </p>

                  <p class="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {{ slide.description }}
                  </p>

                  <!-- Installer In Action Profile -->
                  <div class="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold text-base shadow-md shrink-0">
                      {{ slide.installerName.charAt(0) }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ slide.installerName }}</div>
                      <div class="text-xs text-slate-500 dark:text-slate-400">{{ slide.installerRole }}</div>
                      <div class="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-semibold">
                        <mat-icon class="!text-[12px] !w-3 !h-3">task_alt</mat-icon>
                        <span>Stage: {{ slide.stage }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Live Slide Stat & Action -->
                <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">{{ slide.statNumber }}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono">{{ slide.statLabel }}</div>
                  </div>

                  <a 
                    href="#contact-form"
                    (click)="scrollToSection('contact-form', $event)"
                    class="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>Request Installation</span>
                    <mat-icon class="!text-sm">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>

              <!-- Slide Right: High-Res Real Work Scene Imagery -->
              <div class="lg:col-span-7 relative h-[320px] sm:h-[380px] lg:h-[520px] overflow-hidden bg-slate-900">
                <img 
                  [src]="slide.photoUrl" 
                  [alt]="slide.doorTitle"
                  referrerpolicy="no-referrer"
                  class="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                />

                <!-- Image overlay gradient for clean text readability & depth -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900/40 dark:lg:from-slate-900 lg:via-transparent lg:to-transparent"></div>

                <!-- Live Tag Overlay on Image -->
                <div class="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-center justify-between">
                  <div class="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Verified Installation Site Photo</span>
                  </div>

                  <div class="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 shadow-xs">
                    <mat-icon class="!text-xs">handyman</mat-icon>
                    <span>{{ slide.doorCategory }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Slide Thumbnail Indicators -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            @for (s of slides; track s.id; let idx = $index) {
              <button 
                type="button" 
                (click)="setSlide(idx)"
                class="p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer"
                [class.bg-emerald-50/80]="currentSlideIndex() === idx && !themeStore.isDark()"
                [class.bg-slate-900]="currentSlideIndex() === idx && themeStore.isDark()"
                [class.border-emerald-500]="currentSlideIndex() === idx"
                [class.bg-white]="currentSlideIndex() !== idx && !themeStore.isDark()"
                [class.bg-slate-950]="currentSlideIndex() !== idx && themeStore.isDark()"
                [class.border-slate-200]="currentSlideIndex() !== idx && !themeStore.isDark()"
                [class.border-slate-800]="currentSlideIndex() !== idx && themeStore.isDark()"
                [class.opacity-60]="currentSlideIndex() !== idx"
              >
                <div class="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700">
                  <img [src]="s.photoUrl" [alt]="s.badge" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
                </div>
                <div class="truncate">
                  <div class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ s.doorTitle }}</div>
                  <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ s.installerName }}</div>
                </div>
              </button>
            }
          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 2. HOW DOORMASTER INSTALLATION OPS WORKS                                  -->
      <!-- ========================================================================= -->
      <section id="standards" class="py-14 bg-slate-50 dark:bg-[#181A1F] border-b border-slate-200 dark:border-white/10 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-mono uppercase text-[#59000A] dark:text-rose-300 tracking-wider font-semibold">How It Works</span>
            <h2 class="text-2xl sm:text-3xl font-black text-[#111215] dark:text-white mt-1">End-to-End Installation Workflow</h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every door order moves cleanly from branch counter booking to verified site completion.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Feature 1 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-11 h-11 rounded-xl bg-[#59000A]/10 text-[#59000A] dark:bg-[#59000A]/30 dark:text-rose-300 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">receipt_long</mat-icon>
                </div>
                <h3 class="text-base font-bold text-[#111215] dark:text-white">Shop Booking &amp; Account Verification</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Shop Attendants select doors from the DoorMaster catalog and record payments. Account Officers verify receipts before dispatch begins.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-[#59000A] dark:text-rose-300 font-semibold">
                Verified Before Dispatch
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-11 h-11 rounded-xl bg-[#59000A]/10 text-[#59000A] dark:bg-[#59000A]/30 dark:text-rose-300 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">gps_fixed</mat-icon>
                </div>
                <h3 class="text-base font-bold text-[#111215] dark:text-white">Team Dispatch &amp; Live GPS Map</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Managers assign installation teams and Shop Attendants assign store drivers, with real-time route tracking from branch to site.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-[#59000A] dark:text-rose-300 font-semibold">
                Live GPS Tracking
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-11 h-11 rounded-xl bg-[#59000A]/10 text-[#59000A] dark:bg-[#59000A]/30 dark:text-rose-300 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">fact_check</mat-icon>
                </div>
                <h3 class="text-base font-bold text-[#111215] dark:text-white">Checklists, Photos &amp; Sign-Off</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Installers clock in on site, complete door-specific checklists, upload before and after photos, and collect client digital sign-off.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-[#59000A] dark:text-rose-300 font-semibold">
                Digital Handover Proof
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 3. CONTACT US & INSTALLATION REQUEST FORM                                 -->
      <!-- ========================================================================= -->
      <section id="contact-form" class="py-16 lg:py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Info Column -->
            <div class="lg:col-span-5">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold font-mono mb-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                BOOK YOUR INSTALLATION
              </div>
              <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Request Certified Installation Today
              </h2>
              <p class="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Whether you have purchased a grand entrance pivot slab, luxury bifold patio, or acoustic interior doors, our master Installers are ready to deploy.
              </p>

              <!-- Operational Details -->
              <div class="mt-8 space-y-4">
                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-[#181A1F] border border-slate-200 dark:border-white/10 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-[#59000A]/10 text-[#59000A] dark:bg-[#59000A]/30 dark:text-rose-300 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">support_agent</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-[#111215] dark:text-white">Direct Operations Support</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Requests are routed directly to DoorMaster branch coordinators.</p>
                    <p class="text-xs font-mono text-[#59000A] dark:text-rose-300 font-bold mt-1">0203169184 / 0207867882</p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-[#181A1F] border border-slate-200 dark:border-white/10 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-[#59000A]/10 text-[#59000A] dark:bg-[#59000A]/30 dark:text-rose-300 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">pin_drop</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-[#111215] dark:text-white">11 DoorMaster Branches</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Obeyeyie • Pobiman • Tema • Kasoa • Nsawam • Suhum • Kumasi</p>
                  </div>
                </div>
              </div>

              <!-- Quick Persona Sign In Callout -->
              <div class="mt-8 p-4 rounded-2xl bg-slate-100 dark:bg-[#181A1F] border border-slate-200 dark:border-white/10">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-[#111215] dark:text-white">DoorMaster Staff or Client?</div>
                    <div class="text-[11px] text-slate-600 dark:text-slate-400">Manager, Shop Attendant, Driver, Installer, Accounts or Client</div>
                  </div>
                  <button 
                    type="button" 
                    (click)="navigateToSignIn()" 
                    class="px-3 py-1.5 rounded-lg bg-[#59000A] hover:bg-[#73000E] text-white font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Sign In</span>
                    <mat-icon class="!text-xs">arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Form Column -->
            <div class="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg dark:shadow-2xl relative transition-colors">
              
              @if (submissionSuccess()) {
                <!-- Success Message Banner -->
                <div class="py-12 text-center">
                  <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <mat-icon class="!text-3xl">check_circle</mat-icon>
                  </div>
                  <h3 class="text-2xl font-black text-slate-900 dark:text-white">Installation Request Received!</h3>
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-2">
                    Thank you, <strong class="text-slate-900 dark:text-white">{{ submittedInquiry()?.fullName }}</strong>. Your request (<span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ submittedInquiry()?.id }}</span>) has been queued with our Operations Command team.
                  </p>

                  <div class="mt-6 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left max-w-md mx-auto text-xs space-y-2">
                    <div class="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Door Model:</span>
                      <strong class="text-slate-900 dark:text-white">{{ submittedInquiry()?.doorType }}</strong>
                    </div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Site Address:</span>
                      <strong class="text-slate-900 dark:text-white truncate max-w-[200px]">{{ submittedInquiry()?.siteAddress }}</strong>
                    </div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Assigned Priority:</span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase">Rapid Installer Dispatch</span>
                    </div>
                  </div>

                  <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button 
                      type="button" 
                      (click)="resetForm()"
                      class="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>

                    <button 
                      type="button" 
                      (click)="navigateToDashboard()" 
                      class="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <mat-icon class="!text-sm">dashboard</mat-icon>
                      <span>Sign In to Dashboard</span>
                    </button>
                  </div>
                </div>
              } @else {
                <!-- Standard Contact Us / Installation Request Form -->
                <div>
                  <div class="mb-6">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white">Request Installation Service</h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Fill out your site details below. Our field coordinator will review your door specifications and send you an immediate schedule & quote.
                    </p>
                  </div>

                  <form [formGroup]="inquiryForm" (ngSubmit)="handleFormSubmit()" class="space-y-4">
                    <!-- Name & Email Row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactFullName" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input 
                          id="contactFullName"
                          type="text" 
                          formControlName="fullName"
                          placeholder="e.g. Eleanor Vance"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                        @if (inquiryForm.get('fullName')?.touched && inquiryForm.get('fullName')?.invalid) {
                          <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">Full name is required.</span>
                        }
                      </div>

                      <div>
                        <label for="contactEmail" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input 
                          id="contactEmail"
                          type="email" 
                          formControlName="email"
                          placeholder="client@residence.com"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                        @if (inquiryForm.get('email')?.touched && inquiryForm.get('email')?.invalid) {
                          <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">A valid email is required.</span>
                        }
                      </div>
                    </div>

                    <!-- Phone & Door Category -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactPhone" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <app-phone-input 
                          id="contactPhone"
                          formControlName="phone"
                          placeholder="24 782 9011"
                        ></app-phone-input>
                        @if (inquiryForm.get('phone')?.touched && inquiryForm.get('phone')?.invalid) {
                          <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">Phone number is required.</span>
                        }
                      </div>

                      <div>
                        <label for="contactDoorType" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Door System / Category *
                        </label>
                        <select 
                          id="contactDoorType"
                          formControlName="doorType"
                          class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        >
                          <option value="entrance_pivot">Architectural Entrance Pivot Door</option>
                          <option value="solid_wood_entrance">Solid Wood Entrance Door Slab</option>
                          <option value="acoustic_french">Acoustic French Interior Doors</option>
                          <option value="sliding_pocket">Heavy Concealed Pocket Sliders</option>
                          <option value="bi_fold_patio">Exterior Multi-Fold Patio System</option>
                          <option value="fire_rated_commercial">Fire-Rated Commercial Assemblies</option>
                          <option value="frameless_glass">Frameless Architectural Glass</option>
                        </select>
                      </div>
                    </div>

                    <!-- Project Type & Quantity -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactProjectType" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Project Environment
                        </label>
                        <select 
                          id="contactProjectType"
                          formControlName="projectType"
                          class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        >
                          <option value="luxury_estate">Luxury Private Estate / New Build</option>
                          <option value="residential">Residential Renovation</option>
                          <option value="commercial">Commercial Office / Hospitality</option>
                          <option value="renovation">Historical Restoration</option>
                        </select>
                      </div>

                      <div>
                        <label for="contactDoorsCount" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Number of Door Openings
                        </label>
                        <input 
                          id="contactDoorsCount"
                          type="number" 
                          min="1" 
                          max="50"
                          formControlName="doorsCount"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                      </div>
                    </div>

                    <!-- Site Address -->
                    <div>
                      <label for="contactSiteAddress" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Installation Site Address *
                      </label>
                      <input 
                        id="contactSiteAddress"
                        type="text" 
                        formControlName="siteAddress"
                        placeholder="e.g. 184 Maplewood Crest, Highview Terraces"
                        class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                      />
                      @if (inquiryForm.get('siteAddress')?.touched && inquiryForm.get('siteAddress')?.invalid) {
                        <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">Site address is required for dispatch estimation.</span>
                      }
                    </div>

                    <!-- Preferred Date & Slot -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactPrefDate" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Installation Date
                        </label>
                        <input 
                          id="contactPrefDate"
                          type="date" 
                          formControlName="preferredDate"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                      </div>

                      <div>
                        <label for="contactTimeSlot" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Arrival Window
                        </label>
                        <select 
                          id="contactTimeSlot"
                          formControlName="preferredTimeSlot"
                          class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        >
                          <option value="morning">Morning (08:00 - 12:00)</option>
                          <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                          <option value="anytime">Flexible All-Day Access</option>
                        </select>
                      </div>
                    </div>

                    <!-- Notes / Special Instructions -->
                    <div>
                      <label for="contactMessage" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Specific Hardware, Weight, or Site Instructions
                      </label>
                      <textarea 
                        id="contactMessage"
                        rows="3"
                        formControlName="message"
                        placeholder="Provide details about rough opening, existing frame, pivot hardware brands, or access codes..."
                        class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none shadow-2xs transition-colors"
                      ></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button 
                      type="submit"
                      [disabled]="isSubmitting()"
                      class="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      @if (isSubmitting()) {
                        <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Routing Request to Dispatch...</span>
                      } @else {
                        <mat-icon class="!text-base">send</mat-icon>
                        <span>Submit Installation Request</span>
                      }
                    </button>
                  </form>
                </div>
              }

            </div>

          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- FOOTER                                                                    -->
      <!-- ========================================================================= -->
      <footer class="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
              DM
            </div>
            <div>
              <div class="text-sm font-bold text-slate-900 dark:text-white">DoorMaster Enterprise Installation Platform</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">Integrated field operations, installer bonuses & customer live tracking</div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>© 2026 DoorMaster Systems</span>
            <a href="#hero-slider" (click)="scrollToSection('hero-slider', $event)" class="hover:text-slate-900 dark:hover:text-white transition-colors">
              Installations
            </a>
            <a href="#standards" (click)="scrollToSection('standards', $event)" class="hover:text-slate-900 dark:hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#contact-form" (click)="scrollToSection('contact-form', $event)" class="hover:text-slate-900 dark:hover:text-white transition-colors">
              Request Installation
            </a>
            <button type="button" (click)="navigateToSignUp()" class="text-slate-700 dark:text-slate-300 hover:underline cursor-pointer">
              Create Account
            </button>
            <button type="button" (click)="navigateToSignIn()" class="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
              Sign In Portal
            </button>
          </div>
        </div>
      </footer>

    </div>
  `
})
export class LandingPage {
  readonly store = inject(InstallationStore);
  readonly themeStore = inject(ThemeStore);
  readonly alert = inject(AlertService);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);

  goToSignIn = output<void>();
  goToDashboard = output<void>();

  navigateToSignIn() {
    this.goToSignIn.emit();
    this.router.navigate([this.store.isAuthenticated() ? '/overview' : '/signin']);
  }

  navigateToSignUp() {
    this.router.navigate([this.store.isAuthenticated() ? '/overview' : '/signup']);
  }

  navigateToDashboard() {
    this.goToDashboard.emit();
    this.router.navigate([this.store.isAuthenticated() ? '/overview' : '/signin']);
  }

  scrollToSection(sectionId: string, event?: Event) {
    event?.preventDefault();
    if (typeof document === 'undefined') return;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop() {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  readonly currentSlideIndex = signal<number>(0);
  readonly isSubmitting = signal<boolean>(false);
  readonly submissionSuccess = signal<boolean>(false);
  readonly submittedInquiry = signal<InstallationInquiry | null>(null);

  // Hero Slider items showcasing Black DoorMaster technicians & drivers with /doors catalog door types
  readonly baseSlides: HeroSlide[] = [
    {
      id: 1,
      badge: 'Door Installation',
      installerName: 'Kwame Mensah',
      installerRole: 'Lead Pivot Door Technician • 4.95 Rating',
      doorTitle: 'Turkey Pivot Security Entrance Door',
      doorCategory: 'Turkey Doors',
      location: 'East Legon Residence • Accra',
      stage: 'Laser Level & Pivot Hinge Calibration',
      tagline: 'Heavy-Duty Pivot Frame & Acoustic Seal',
      description: 'Kwame Mensah calibrates the concealed pivot hinge and laser-levels a heavy Turkey Pivot security door slab for smooth, airtight self-closing operation.',
      photoUrl: '/images/slider-door-installation.jpg',
      statNumber: '180 kg',
      statLabel: 'Pivot Slab Installed'
    },
    {
      id: 2,
      badge: 'Door Replacement',
      installerName: 'Benjamin Koranteng',
      installerRole: 'Hardware & Replacement Specialist • 4.88 Rating',
      doorTitle: 'DM Double (2x) Steel-Core Security Door',
      doorCategory: 'DM Doors',
      location: 'Cantonments Manor • Accra',
      stage: 'Smart Mortise Lock & Weather-Seal Fitting',
      tagline: 'Full Frame Replacement & Lock Upgrade',
      description: 'Benjamin Koranteng replaces the existing entrance frame and fits a brushed stainless smart mortise lock with perimeter EPDM weather seals on a DM Double security door.',
      photoUrl: '/images/slider-door-replacement.jpg',
      statNumber: '42 dB',
      statLabel: 'Acoustic Seal Rating'
    },
    {
      id: 3,
      badge: 'Door Delivery',
      installerName: 'Emmanuel Kojo & Delivery Crew',
      installerRole: 'Logistics Dispatch Drivers • 4.98 Rating',
      doorTitle: 'Economy & Turkey Security Door Fleet Delivery',
      doorCategory: 'Economy Doors',
      location: 'Tema Community 11 • Greater Accra',
      stage: 'Direct Showroom-to-Site Dispatch',
      tagline: 'Protected Trolley Offloading & GPS Tracking',
      description: 'Emmanuel Kojo and the DoorMaster delivery team offload wrapped Economy Single, One & Half (OH), and Turkey Doors directly from our branch showroom to the client site.',
      photoUrl: '/images/slider-door-delivery.jpg',
      statNumber: '100%',
      statLabel: 'GPS-Tracked Delivery'
    },
    {
      id: 4,
      badge: 'Interior Doors',
      installerName: 'Kofi Boateng',
      installerRole: 'Interior Finish Carpenter • 4.85 Rating',
      doorTitle: 'Turkey Interior & WPC Flush Wooden Door',
      doorCategory: 'Interior Doors',
      location: 'Ahinsan Executive Suites • Kumasi',
      stage: 'Concealed Hinge & Lever Alignment',
      tagline: 'Flush Trimless Fit & Quiet Latch',
      description: 'Kofi Boateng aligns recessed concealed hinges and matte black lever hardware on WPC and Turkey Interior flush doors for a clean, quiet architectural finish.',
      photoUrl: '/images/slider-pocket-doors.jpg',
      statNumber: '±1.0 mm',
      statLabel: 'Flush Hinge Tolerance'
    }
  ];

  get slides(): HeroSlide[] {
    const catalog = this.store.doors();
    if (!catalog || catalog.length === 0) return this.baseSlides;

    const findMatch = (keywords: string[]) =>
      catalog.find(d => {
        const hay = `${d.name} ${d.category} ${d.material}`.toLowerCase();
        return keywords.some(k => hay.includes(k));
      });

    const matches = [
      findMatch(['pivot']),
      findMatch(['2x', 'double']),
      findMatch(['economy', 'single', 'oh']),
      findMatch(['interior', 'wpc', 'flush'])
    ];

    return this.baseSlides.map((slide, idx) => {
      const door = matches[idx];
      if (!door) return slide;
      return {
        ...slide,
        doorTitle: door.name,
        doorCategory: door.category || slide.doorCategory,
        tagline: `${door.modelCode ? door.modelCode + ' · ' : ''}${door.material || slide.tagline}`
      };
    });
  }

  readonly currentSlide = () => this.slides[this.currentSlideIndex()];

  readonly inquiryForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    doorType: ['entrance_pivot', [Validators.required]],
    projectType: ['luxury_estate', [Validators.required]],
    doorsCount: [1, [Validators.required, Validators.min(1)]],
    siteAddress: ['', [Validators.required, Validators.minLength(5)]],
    preferredDate: [''],
    preferredTimeSlot: ['morning'],
    message: ['']
  });

  nextSlide() {
    this.currentSlideIndex.update(idx => (idx + 1) % this.slides.length);
  }

  prevSlide() {
    this.currentSlideIndex.update(idx => (idx - 1 + this.slides.length) % this.slides.length);
  }

  setSlide(index: number) {
    this.currentSlideIndex.set(index);
  }

  handleFormSubmit() {
    if (this.inquiryForm.invalid) {
      this.inquiryForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Request', 'Please fill in your name, email, phone, and project address.');
      return;
    }

    this.isSubmitting.set(true);
    const formVal = this.inquiryForm.value;

    setTimeout(() => {
      const pType = (formVal.projectType as 'residential' | 'commercial' | 'renovation' | 'luxury_estate') || 'residential';
      const slot = (formVal.preferredTimeSlot as 'morning' | 'afternoon' | 'anytime') || 'morning';

      const createdInquiry = this.store.submitInstallationInquiry({
        fullName: formVal.fullName || '',
        email: formVal.email || '',
        phone: formVal.phone || '',
        doorType: (formVal.doorType as DoorCategory) || 'entrance_pivot',
        projectType: pType,
        siteAddress: formVal.siteAddress || '',
        preferredDate: formVal.preferredDate || undefined,
        preferredTimeSlot: slot,
        doorsCount: Number(formVal.doorsCount) || 1,
        message: formVal.message || '',
        status: 'new'
      });

      this.submittedInquiry.set(createdInquiry);
      this.isSubmitting.set(false);
      this.submissionSuccess.set(true);
      this.alert.success(
        'Installation Request Submitted!',
        `Thank you ${formVal.fullName}. Your request #${createdInquiry.id} has been registered with our Operations Command team.`
      );
    }, 700);
  }

  resetForm() {
    this.inquiryForm.reset({
      fullName: '',
      email: '',
      phone: '',
      doorType: 'entrance_pivot',
      projectType: 'luxury_estate',
      doorsCount: 1,
      siteAddress: '',
      preferredDate: '',
      preferredTimeSlot: 'morning',
      message: ''
    });
    this.submissionSuccess.set(false);
    this.submittedInquiry.set(null);
  }
}
