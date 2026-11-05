import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';
import { DoorCategory, InstallationInquiry } from '../../models/installation.model';

export interface HeroSlide {
  id: number;
  badge: string;
  technicianName: string;
  technicianRole: string;
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
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-slate-950">
      
      <!-- ========================================================================= -->
      <!-- TOP NAVIGATION BAR                                                        -->
      <!-- ========================================================================= -->
      <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/85 border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <!-- Brand -->
          <div class="flex items-center gap-3.5 cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-black text-lg shadow-lg shadow-emerald-500/20 shrink-0">
              DM
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg font-black tracking-tight text-slate-900 dark:text-white">DoorMaster</span>
                <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded font-semibold tracking-wider">
                  PRECISION
                </span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Architectural Door Installation & Field Ops</p>
            </div>
          </div>

          <!-- Nav Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#hero-slider" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">handyman</mat-icon>
              <span>Technicians at Work</span>
            </a>
            <a href="#standards" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">verified</mat-icon>
              <span>Quality Standards</span>
            </a>
            <a href="#contact-form" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">calendar_month</mat-icon>
              <span>Book Installation</span>
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
              <mat-icon class="!text-base text-emerald-600 dark:text-emerald-400">login</mat-icon>
              <span>Sign In / Portals</span>
            </button>

            <!-- Request Installation Primary CTA -->
            <a 
              href="#contact-form"
              class="hidden sm:inline-flex h-10 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 transition-all items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <span>Request Installation</span>
              <mat-icon class="!text-sm !w-4 !h-4">arrow_downward</mat-icon>
            </a>
          </div>
        </div>
      </nav>

      <!-- ========================================================================= -->
      <!-- 1. HERO SLIDER SECTION: TECHNICIANS AT WORK                               -->
      <!-- ========================================================================= -->
      <section id="hero-slider" class="relative overflow-hidden bg-white dark:bg-slate-950 py-12 lg:py-20 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <!-- Subtle background glow -->
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Slider Header Controls -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold font-mono mb-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                LIVE FIELD CRAFTSMANSHIP
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Master Door Technicians. <br class="hidden sm:inline" />
                <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Precision in Every Millimeter.
                </span>
              </h1>
              <p class="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                Experience architectural door installation executed with surgical laser accuracy. Watch our certified Installers install custom pivot doors, sound-damped French suites, and sliding glass walls.
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

                  <!-- Technician In Action Profile -->
                  <div class="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 flex items-center justify-center font-bold text-base shadow-md shrink-0">
                      {{ slide.technicianName.charAt(0) }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ slide.technicianName }}</div>
                      <div class="text-xs text-slate-500 dark:text-slate-400">{{ slide.technicianRole }}</div>
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
                    class="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>Request Installation</span>
                    <mat-icon class="!text-sm">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>

              <!-- Slide Right: High-Res Real Work Scene Imagery -->
              <div class="lg:col-span-7 relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-900">
                <img 
                  [src]="slide.photoUrl" 
                  [alt]="slide.doorTitle"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
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
                  <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ s.technicianName }}</div>
                </div>
              </button>
            }
          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 2. VALUE PROPOSITION & SYSTEM ASSURANCES                                  -->
      <!-- ========================================================================= -->
      <section id="standards" class="py-16 bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 tracking-wider font-semibold">Field Standards</span>
            <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-1">Why Architects & Homeowners Rely On Us</h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every DoorMaster installation operates under our digital audit trail, verified from factory fabrication to client signature.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Feature 1 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">straighten</mat-icon>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Laser Plumb & Level Precision</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Heavy pivot slabs and sound-rated doors require exact ±1.0mm tolerance. Our installers use cross-line green lasers and calibrate resistance damping on site.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                100% Level Guarantee
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">gps_fixed</mat-icon>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Real-Time Dispatch & Radar</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Uber-style tracking for door delivery and installer arrival. Clients receive live status pings from warehouse departure to site clock-in.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                Live Geofenced Tracking
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">military_tech</mat-icon>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Incentivized Quality & Bonus</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Installers earn performance bonuses for 5-star customer ratings and immaculate multi-angle photographic documentation before handover.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                Tied to Customer Satisfaction
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
                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">support_agent</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Direct Operations Dispatch</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Calls routed directly to duty field coordinators.</p>
                    <p class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">+1 (555) 800-DOOR (3667)</p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">pin_drop</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Fabrication & Dispatch Hubs</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Central Atelier • South Industrial Bay • Coastal Fleet</p>
                    <p class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">Rapid response across greater metro region</p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">shield</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Full Manufacturer Warranty Retained</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Installation certified for FritsJurgens, DormaKaba, Schuco & Hafele hardware.</p>
                  </div>
                </div>
              </div>

              <!-- Quick Persona Sign In Callout -->
              <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200/80 dark:from-slate-900 dark:to-slate-800/80 border border-slate-300 dark:border-slate-700/80">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">DoorMaster Team Member?</div>
                    <div class="text-[11px] text-slate-600 dark:text-slate-400">Installer, Manager, Account Officer or Client?</div>
                  </div>
                  <button 
                    type="button" 
                    (click)="navigateToSignIn()" 
                    class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-950 font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer"
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
                      <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase">Rapid Technician Dispatch</span>
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
                      class="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
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
                        <input 
                          id="contactPhone"
                          type="tel" 
                          formControlName="phone"
                          placeholder="+1 (555) 782-9011"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
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
                      class="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      @if (isSubmitting()) {
                        <span class="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
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
            <div class="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-bold text-sm shrink-0">
              DM
            </div>
            <div>
              <div class="text-sm font-bold text-slate-900 dark:text-white">DoorMaster Enterprise Installation Platform</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">Integrated field operations, technician bonuses & customer live tracking</div>
            </div>
          </div>

          <div class="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>© 2026 DoorMaster Systems</span>
            <button type="button" (click)="navigateToSignIn()" class="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
              Persona Sign In Portal
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
    this.router.navigate(['/signin']);
  }

  navigateToDashboard() {
    this.goToDashboard.emit();
    this.router.navigate(['/overview']);
  }

  readonly currentSlideIndex = signal<number>(0);
  readonly isSubmitting = signal<boolean>(false);
  readonly submissionSuccess = signal<boolean>(false);
  readonly submittedInquiry = signal<InstallationInquiry | null>(null);

  // Hero Slider items showcasing technicians at work
  readonly slides: HeroSlide[] = [
    {
      id: 1,
      badge: 'Active Work in Progress',
      technicianName: 'Marcus Vance',
      technicianRole: 'Senior Master Installer • 4.95 Rating',
      doorTitle: 'Grand Pivot Walnut Entrance Door',
      doorCategory: 'Architectural Pivot',
      location: 'The Glasshouse Residence • Highview',
      stage: 'Laser Level & Hinge Calibration',
      tagline: '±1.0mm Floor Spring Flush Alignment',
      description: 'Marcus Vance is calibrating the FritsJurgens System M+ pivot resistance on a 180kg Smoked American Walnut door slab, ensuring whisper-quiet acoustic self-closing motion.',
      photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      statNumber: '180 kg',
      statLabel: 'Slab Weight Handled'
    },
    {
      id: 2,
      badge: 'Precision Carpentry',
      technicianName: 'Devon Sterling',
      technicianRole: 'Acoustic & Hardware Specialist • 4.88 Rating',
      doorTitle: 'Solid Wood European White Oak Foyer',
      doorCategory: 'Solid Timber Entrance',
      location: 'Pacific Heights Executive Manor',
      stage: 'Sub-Frame Mortise & Weather-Seals',
      tagline: 'Perimeter Acoustic Drop-Seal Testing',
      description: 'Devon Sterling installs magnetic mortise strike plates with high-torque anchors, routing thermal break seals into the solid white oak jamb for airtight envelope performance.',
      photoUrl: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1400&q=80',
      statNumber: '42 dB',
      statLabel: 'Sound Dampening Rating'
    },
    {
      id: 3,
      badge: 'Patio & Exterior Enclosure',
      technicianName: 'Elena Rostova & Field Crew',
      technicianRole: 'Lead Joinery Technicians • 4.98 Rating',
      doorTitle: 'Bi-Fold Architectural Patio Glass System',
      doorCategory: 'Multi-Panel Exterior Bi-Fold',
      location: 'Meadowbrook Modern Villa',
      stage: 'Stainless Track Glide & Multi-Lock Strike',
      tagline: 'Effortless Finger-Touch Rollers',
      description: 'Our certified crew secures stainless bottom tracks with laser alignment, adjusting top suspension carriers so massive 3-meter glass leaves glide with zero friction.',
      photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      statNumber: '3.2 m',
      statLabel: 'Panoramic Span Height'
    },
    {
      id: 4,
      badge: 'Interior Architectural Suite',
      technicianName: 'Tariq Al-Mansoor',
      technicianRole: 'Master Finish Carpenter • 4.75 Rating',
      doorTitle: 'Concealed Pocket Sliding Acoustic Doors',
      doorCategory: 'Concealed Pocket System',
      location: 'Skyline Penthouse Suites',
      stage: 'Flush Soft-Stop Buffer Tuning',
      tagline: 'Concealed Jamb & Magnetic Locks',
      description: 'Tariq aligns dual-direction soft-close dampeners inside the recessed wall pocket cavity, guaranteeing completely invisible hardware when doors disappear into the wall.',
      photoUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80',
      statNumber: '100%',
      statLabel: 'Concealed Pocket Flush'
    }
  ];

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
