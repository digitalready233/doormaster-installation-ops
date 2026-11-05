import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { InstallationJob } from '../../models/installation.model';
import { SignaturePad } from '../../components/signature-pad/signature-pad';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';

@Component({
  selector: 'app-client-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, SignaturePad, OsmLiveMap],
  template: `
    <div class="space-y-6">
      
      <!-- Top Site Header & Context Selector -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <mat-icon>home</mat-icon>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{{ currentJob().client.name }}</h2>
              <span class="text-xs text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                Live Site Tracking
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
              <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
              <span>{{ currentJob().client.siteAddress }}</span>
            </p>
          </div>
        </div>

        <!-- Switch Client Site (Only for Managers supervising customer sites) -->
        @if (store.currentRole() !== 'client') {
          <div class="flex items-center gap-3">
            <div class="w-full sm:w-auto">
              <label for="clientSelectSite" class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold mb-1">Select Client Site</label>
              <select 
                id="clientSelectSite"
                [value]="store.currentClientId()"
                (change)="onClientChange($event)"
                class="w-full sm:w-auto text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-200"
              >
                @for (job of store.jobs(); track job.id) {
                  <option [value]="job.client.id">{{ job.client.name }} ({{ job.doorModel }})</option>
                }
              </select>
            </div>
          </div>
        }
      </div>

      <!-- Action Toast Banner -->
      @if (portalAlert()) {
        <div class="p-3 bg-indigo-950 border border-indigo-500 text-indigo-200 rounded-xl text-xs flex items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div class="flex items-center gap-2">
            <mat-icon class="text-indigo-400 !text-sm">info</mat-icon>
            <span>{{ portalAlert() }}</span>
          </div>
          <button 
            type="button" 
            (click)="portalAlert.set(null)"
            class="text-indigo-400 hover:text-white"
          >
            <mat-icon class="!text-xs">close</mat-icon>
          </button>
        </div>
      }

      @if (currentJob()) {
        @let j = currentJob()!;

        <!-- ================================================================= -->
        <!-- LIVE GPS JOURNEY TRACKING RADAR MAP (WITH TRUCK & TECH DETAILS)  -->
        <!-- ================================================================= -->
        <div class="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg text-slate-900 dark:text-white">
          <!-- Live Map Header Ribbon -->
          <div class="px-5 py-3.5 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <div class="relative flex items-center justify-center">
                <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 relative"></span>
              </div>
              <div>
                <span class="text-xs font-mono font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                  @if (j.status === 'on_site') { Technician Is On Site & Installing Lock }
                  @else if (j.status === 'delivered_on_site') { Truck Arrived · Door & Lock Delivered }
                  @else if (j.status === 'dispatched') { Logistics Truck En Route · Real-Time GPS }
                  @else if (j.status === 'truck_assigned') { Delivery Truck & Technician Assigned }
                  @else if (j.status === 'assigned') { Field Installer Assigned · Awaiting Store Dispatch }
                  @else if (j.status === 'booked_at_shop') { Booked at Shop · Preparing Technician Assignment }
                  @else if (j.status === 'completed' || j.status === 'bonus_awarded') { Installation Complete & Verified }
                  @else { Door In Preparation }
                </span>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  @if (j.status === 'dispatched') { Truck {{ j.logisticsTruck?.truckPlate || 'Logistics Fleet' }} ~14 mins away }
                  @else if (j.status === 'delivered_on_site') { Hardware handed over to technician for smart lock mounting }
                  @else if (j.status === 'on_site') { Active site assembly & mortise lock calibration in progress }
                  @else if (j.status === 'assigned') { Assigned Installer: {{ j.assignedInstallerName || 'Technician' }} · Scheduled {{ j.scheduledDate }} }
                  @else { Scheduled for: {{ j.scheduledDate }} }
                </p>
              </div>
            </div>

            <!-- Map View Mode Controls -->
            <div class="flex items-center gap-2">
              <button 
                type="button"
                (click)="toggleMapSatellite()"
                class="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg border transition-colors"
                [class]="isSatellite() ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'"
              >
                {{ isSatellite() ? 'Satellite Mode' : 'Vector Map' }}
              </button>

              <button 
                type="button"
                (click)="copyTrackingLink()"
                class="px-2.5 py-1 text-[11px] font-mono font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700 dark:hover:text-white"
                title="Copy shareable tracking link"
              >
                <mat-icon class="!text-xs">share</mat-icon>
                <span>Share</span>
              </button>
            </div>
          </div>

          <!-- OpenStreetMap Live Client Tracking -->
          <div class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <app-osm-live-map [mode]="'client-single'" [targetJob]="j"></app-osm-live-map>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- 7-STEP PROGRESS LIFECYCLE (Interactive Progress Rail)             -->
        <!-- ================================================================= -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Complete Installation & Delivery Timeline</h3>
            <span class="text-xs font-mono text-slate-400 dark:text-slate-500">Order #{{ j.id }}</span>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            <!-- Step 1: Booked & Paid at Shop -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 1)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 1</span>
              <p class="font-bold text-xs">Shop Booked</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Payment Paid</span>
            </div>

            <!-- Step 2: Truck & Dispatcher Setup -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 2)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 2</span>
              <p class="font-bold text-xs">Truck Set Up</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{{ j.logisticsTruck?.truckPlate || 'Assigned' }}</span>
            </div>

            <!-- Step 3: Site Funds Dispatched -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 3)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 3</span>
              <p class="font-bold text-xs">Site Funds</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Accountant Released</span>
            </div>

            <!-- Step 4: Dispatched En Route -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 4)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 4</span>
              <p class="font-bold text-xs">En Route</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">GPS Live</span>
            </div>

            <!-- Step 5: Delivered On Site -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 5)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 5</span>
              <p class="font-bold text-xs">Delivered</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Cargo Handed Over</span>
            </div>

            <!-- Step 6: Lock & Door Installation -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 6)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 6</span>
              <p class="font-bold text-xs">Lock Install</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Tech Assembling</span>
            </div>

            <!-- Step 7: Completed & Sign-Off -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 7)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 7</span>
              <p class="font-bold text-xs">Verified</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Warranty Active</span>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- THREE-COLUMN DETAILS: DISPATCHER DRIVER, INSTALLER, & SPEC SHEET  -->
        <!-- ================================================================= -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- 1. Dedicated Dispatcher & Delivery Truck Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Logistics Dispatcher & Truck</h4>
              <span class="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                Heavy Transport
              </span>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  <mat-icon>local_shipping</mat-icon>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900 dark:text-white">{{ j.dispatcherName || 'Emmanuel Kojo' }}</h5>
                  <p class="text-[11px] text-teal-700 dark:text-teal-400 font-mono font-semibold">Truck: {{ j.logisticsTruck?.truckPlate || 'GT-4821-26' }}</p>
                  <p class="text-[10px] text-slate-400">{{ j.logisticsTruck?.truckModel || 'Mercedes-Benz Heavy Flatbed' }}</p>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span class="text-slate-500">Phone:</span>
                <span class="font-mono font-bold text-slate-900 dark:text-white">{{ j.logisticsTruck?.dispatcherPhone || '+233 24 555 0192' }}</span>
              </div>
            </div>
          </div>

          <!-- 2. Assigned Installer Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Field Installer / Locksmith</h4>
              <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Certified Pro
              </span>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  <mat-icon>handyman</mat-icon>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900 dark:text-white">{{ j.assignedInstallerName || 'Marcus Vance' }}</h5>
                  <p class="text-[11px] text-amber-500 font-bold font-mono">4.95 ★ DoorMaster Master Tech</p>
                  <p class="text-[10px] text-slate-400">Specialist: Smart Biometric Locks & Pivots</p>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span class="text-slate-500">Status:</span>
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {{ j.status === 'on_site' ? 'Clocked In On Site' : 'Cleared for Site' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 3. Door & Lock Specifications Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Door & Smart Lock Specs</h4>
              <span class="text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                Order Specs
              </span>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-500">Door Model:</span>
                <strong class="text-slate-900 dark:text-white text-right">{{ j.doorModel }}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Lock Hardware:</span>
                <span class="font-bold text-amber-600 dark:text-amber-400 text-right">{{ j.lockModel || 'Smart Lock Handle' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Dimensions:</span>
                <span class="font-mono font-bold text-slate-800 dark:text-slate-200">{{ j.dimensions }}</span>
              </div>
              @if (j.shopBooking) {
                <div class="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span class="text-slate-500">Shop Receipt:</span>
                  <span class="font-mono font-bold text-cyan-700 dark:text-cyan-400">{{ j.shopBooking.receiptNumber }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- CUSTOMER DIGITAL SIGN-OFF & CERTIFICATE ARCHIVE                   -->
        <!-- ================================================================= -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Customer Verification & Warranty Activation</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Digital touch signature confirms satisfactory lock & door installation</p>
            </div>

            @if (j.customerSignoff) {
              <span class="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-mono border border-emerald-200 dark:border-emerald-800">
                Verified & Archived
              </span>
            }
          </div>

          @if (j.customerSignoff) {
            <div class="p-5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-emerald-700 dark:text-emerald-400">verified</mat-icon>
                  <h5 class="text-sm font-bold text-emerald-950 dark:text-emerald-300">Official Certificate of Satisfactory Installation</h5>
                </div>
                <span class="text-[11px] font-mono text-emerald-800 dark:text-emerald-400">Warranty Active</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div class="space-y-1.5 bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                  <p><strong>Signed by:</strong> {{ j.customerSignoff.clientName }}</p>
                  <p><strong>Rating:</strong> <span class="text-amber-600 dark:text-amber-400 font-bold font-mono">{{ j.customerSignoff.rating }}.0 / 5.0 ★</span></p>
                  <p class="text-slate-600 dark:text-slate-300 italic">"{{ j.customerSignoff.feedback }}"</p>
                </div>

                <div class="bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60 flex flex-col items-center justify-center">
                  <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase mb-1">Archived Signature</span>
                  <img [src]="j.customerSignoff.signatureDataUrl" alt="Signature" class="h-16 max-w-full object-contain" />
                </div>
              </div>
            </div>
          } @else {
            <app-signature-pad 
              [initialClientName]="j.client.name"
              (signoffCompleted)="handleSignoff(j.id, $event)"
            />
          }
        </div>
      }
    </div>
  `
})
export class ClientPortal {
  readonly store = inject(InstallationStore);
  jobSelected = output<string>();

  readonly showSigningPad = signal(false);
  readonly isSatellite = signal(false);
  readonly portalAlert = signal<string | null>(null);

  readonly currentJob = computed(() => {
    const cliId = this.store.currentClientId();
    const curUser = this.store.currentUser();
    const namePrefix = curUser?.name ? curUser.name.split(' ')[0].toLowerCase() : '';
    const userEmail = curUser?.email ? curUser.email.toLowerCase() : '';

    const matched = this.store.jobs().find(j => 
      (cliId && j.client?.id === cliId) ||
      (userEmail && j.client?.email && j.client.email.toLowerCase() === userEmail) ||
      (namePrefix && j.client?.name && j.client.name.toLowerCase().includes(namePrefix))
    );
    if (matched) return matched;

    const fallback = this.store.jobs()[0];
    if (curUser?.role === 'client' && fallback) {
      return {
        ...fallback,
        client: {
          ...fallback.client,
          id: curUser.id,
          name: curUser.name,
          phone: curUser.phone || fallback.client.phone,
          email: curUser.email || fallback.client.email
        }
      };
    }
    return fallback;
  });

  onClientChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.store.currentClientId.set(target.value);
  }

  toggleMapSatellite() {
    this.isSatellite.update(v => !v);
  }

  copyTrackingLink() {
    navigator.clipboard?.writeText(window.location.href);
    this.showAlert('Live client tracking link copied to clipboard!');
  }

  handleCallDriverClick(job: InstallationJob) {
    this.showAlert(`Initiating call with Logistics Driver ${job.dispatcherName || 'Emmanuel Kojo'} at ${job.logisticsTruck?.dispatcherPhone || '+233 24 555 0192'}...`);
  }

  handleCallTechClick(job: InstallationJob) {
    this.showAlert(`Initiating call with Installer ${job.assignedInstallerName || 'Marcus Vance'} at +233 24 881 0293...`);
  }

  handleGateCodeClick() {
    this.showAlert(`Gate code transmitted directly to delivery truck & technician navigation unit.`);
  }

  showAlert(message: string) {
    this.portalAlert.set(message);
    setTimeout(() => {
      if (this.portalAlert() === message) {
        this.portalAlert.set(null);
      }
    }, 3500);
  }

  handleSignoff(jobId: string, data: { clientName: string; signatureDataUrl: string; rating: number; feedback: string; signedAt: string }) {
    this.store.submitCustomerSignoff(jobId, {
      ...data,
      siteRepresentativeName: data.clientName,
      verificationStatement: 'Verified complete and operational without defects.'
    });
    this.showSigningPad.set(false);
  }

  getStepClass(status: InstallationJob['status'], stepNumber: number): string {
    const weights: Record<InstallationJob['status'], number> = {
      'draft': 1,
      'booked_at_shop': 1,
      'truck_assigned': 2,
      'approved': 2.5,
      'site_funds_dispatched': 3,
      'assigned': 3,
      'accepted': 3,
      'dispatched': 4,
      'delivered_on_site': 5,
      'on_site': 6,
      'in_progress': 6,
      'installed_pending_signoff': 6,
      'completed': 7,
      'bonus_awarded': 7
    };
    const currentWeight = weights[status] || 1;

    if (currentWeight >= stepNumber) {
      return 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-300 font-bold';
    }
    return 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500';
  }
}
