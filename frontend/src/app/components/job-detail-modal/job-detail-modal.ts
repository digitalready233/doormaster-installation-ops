import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AssignedInstallerTeamMember, InstallationJob, InstallerTeam } from '../../models/installation.model';
import { ClockWidget } from '../clock-widget/clock-widget';
import { PhotoUploader } from '../photo-uploader/photo-uploader';
import { SignaturePad } from '../signature-pad/signature-pad';

@Component({
  selector: 'app-job-detail-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ClockWidget, PhotoUploader, SignaturePad],
  template: `
    @let j = currentJob();
    @if (j) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-slate-100">
          <!-- Top Bar Header -->
          <div class="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-950/70">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono font-bold text-xs shadow-xs shrink-0">
                DM
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">{{ j.id }}</span>
                  <span class="text-[10px] text-slate-300 dark:text-slate-600">·</span>
                  <span class="text-[10px] font-semibold px-1.5 py-0.2 rounded uppercase tracking-wider" [class]="getStatusClass(j.status)">
                    {{ formatStatus(j.status) }}
                  </span>
                </div>
                <h2 class="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate mt-0.5">{{ j.doorModel }}</h2>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <!-- Quick lifecycle actions -->
              @if (store.isAwaitingAccountVerification(j)) {
                <span class="px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 rounded-lg flex items-center gap-1.5">
                  <mat-icon class="!text-sm !w-4 !h-4">lock_clock</mat-icon>
                  <span>Awaiting Account Verification</span>
                </span>
              } @else if (j.status === 'assigned' && store.currentRole() === 'installer') {
                <button 
                  type="button"
                  (click)="handleAccept()"
                  class="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">handshake</mat-icon>
                  <span>Accept Job & Notify Client</span>
                </button>
              }

              @if (!store.isAwaitingAccountVerification(j) && store.currentRole() === 'shop_manager' && !j.dispatcherId && j.status !== 'completed' && j.status !== 'bonus_awarded') {
                <button 
                  type="button"
                  [disabled]="!store.hasJobAcceptedInstallers(j)"
                  (click)="store.hasJobAcceptedInstallers(j) ? focusDispatcherSelect() : null"
                  [title]="store.hasJobAcceptedInstallers(j) ? 'Select a store dispatcher for this order' : 'Dispatch driver selection locked: Awaiting installer acceptance from Operations Manager'"
                  [class]="store.hasJobAcceptedInstallers(j)
                    ? 'px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer'
                    : 'px-3.5 py-1.5 text-xs font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-not-allowed opacity-60 flex items-center gap-1.5 shadow-none'"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">{{ store.hasJobAcceptedInstallers(j) ? 'local_shipping' : 'lock' }}</mat-icon>
                  <span>{{ store.hasJobAcceptedInstallers(j) ? 'Select Driver' : 'Awaiting Installer Acceptance' }}</span>
                </button>
              } @else if (!store.isAwaitingAccountVerification(j) && (j.status === 'accepted' || j.status === 'draft' || j.status === 'assigned' || j.status === 'booked_at_shop' || j.status === 'truck_assigned') && store.currentRole() === 'shop_manager') {
                <button 
                  type="button"
                  [disabled]="!j.assignedInstallerId"
                  (click)="handleDispatch()"
                  [title]="!j.assignedInstallerId ? 'Physical dispatch awaits installer assignment by Operations Manager' : 'Dispatch Door & Hardware'"
                  [class]="!j.assignedInstallerId
                    ? 'px-3.5 py-1.5 text-xs font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-not-allowed opacity-60 flex items-center gap-1.5 shadow-none'
                    : 'px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer'"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">{{ !j.assignedInstallerId ? 'hourglass_top' : 'local_shipping' }}</mat-icon>
                  <span>{{ !j.assignedInstallerId ? 'Awaiting Operations Installer' : 'Dispatch Door & Hardware' }}</span>
                </button>
              }

              <button (click)="closed.emit()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded">
                <mat-icon class="!text-xl">close</mat-icon>
              </button>
            </div>
          </div>

          <!-- Hard Gate Banner: Manual Account Verification Required -->
          @if (store.isAwaitingAccountVerification(j)) {
            <div class="px-6 py-3 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-start gap-2.5">
                <mat-icon class="!text-lg text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">verified_user</mat-icon>
                <div>
                  <p class="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Manual Account Verification Required — Task Locked
                  </p>
                  <p class="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                    All operations (Operations Manager team assignment, Shop Attendant driver selection, and field work) are blocked until an Account Officer manually verifies Receipt {{ j.shopBooking?.receiptNumber }}.
                  </p>
                </div>
              </div>
              @if (store.currentRole() === 'account_officer' || store.currentRole() === 'admin') {
                <button
                  type="button"
                  (click)="store.verifyShopPayment(j.id, 'Manually verified by Account Officer')"
                  class="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">check_circle</mat-icon>
                  <span>Verify &amp; Approve Payment</span>
                </button>
              }
            </div>
          }

          <!-- Phase Stepper for Installers vs Standard Management Tabs -->
          @if (isInstaller()) {
            <!-- INSTALLER NEXT-STEP PHASE STEPPER (Numbered circles, connecting lines, and clean step titles) -->
            <div class="px-4 sm:px-10 py-5 bg-slate-50/70 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800">
              <div class="max-w-3xl mx-auto flex items-start justify-between relative">

                <!-- Step 1: Site Attendance & Clock In -->
                <button
                  type="button"
                  (click)="installerPhase.set('clock_in')"
                  class="flex flex-col items-center group relative z-10 flex-1 cursor-pointer focus:outline-none"
                >
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs"
                    [class]="installerPhase() === 'clock_in'
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950'
                      : (installerPhaseIndex() > 1 || isOnSite() || isClockOutDone()
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-700')"
                  >
                    @if (installerPhaseIndex() > 1 || isOnSite() || isClockOutDone()) {
                      <mat-icon class="!text-base !w-4 !h-4">check</mat-icon>
                    } @else {
                      <span>1</span>
                    }
                  </div>
                  <span 
                    class="text-xs font-bold mt-2 tracking-tight transition-colors text-center truncate max-w-[110px]"
                    [class]="installerPhase() === 'clock_in' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
                  >
                    Site & Clock In
                  </span>
                  <!-- Indicator dashes below title per reference design -->
                  <div class="flex items-center gap-1 mt-1.5 justify-center">
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'clock_in' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'"></span>
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'clock_in' ? 'bg-blue-600/40 dark:bg-blue-500/40' : 'bg-slate-300/60 dark:bg-slate-700/60'"></span>
                  </div>
                </button>

                <!-- Connector Line 1 -> 2 -->
                <div 
                  class="flex-1 h-0.5 mt-5 -mx-1 sm:-mx-2 transition-colors"
                  [class]="installerPhaseIndex() >= 2 || isOnSite() || isClockOutDone() ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'"
                ></div>

                <!-- Step 2: Hardware Checklist -->
                <button
                  type="button"
                  (click)="installerPhase.set('checklist')"
                  class="flex flex-col items-center group relative z-10 flex-1 cursor-pointer focus:outline-none"
                >
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs"
                    [class]="installerPhase() === 'checklist'
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950'
                      : (installerPhaseIndex() > 2 || (completedChecklistCount() === j.hardwareChecklist.length && j.hardwareChecklist.length > 0)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-700')"
                  >
                    @if (installerPhaseIndex() > 2 || (completedChecklistCount() === j.hardwareChecklist.length && j.hardwareChecklist.length > 0)) {
                      <mat-icon class="!text-base !w-4 !h-4">check</mat-icon>
                    } @else {
                      <span>2</span>
                    }
                  </div>
                  <span 
                    class="text-xs font-bold mt-2 tracking-tight transition-colors text-center truncate max-w-[110px]"
                    [class]="installerPhase() === 'checklist' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
                  >
                    Checklist
                  </span>
                  <div class="flex items-center gap-1 mt-1.5 justify-center">
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'checklist' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'"></span>
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'checklist' ? 'bg-blue-600/40 dark:bg-blue-500/40' : 'bg-slate-300/60 dark:bg-slate-700/60'"></span>
                  </div>
                </button>

                <!-- Connector Line 2 -> 3 -->
                <div 
                  class="flex-1 h-0.5 mt-5 -mx-1 sm:-mx-2 transition-colors"
                  [class]="installerPhaseIndex() >= 3 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'"
                ></div>

                <!-- Step 3: Photos -->
                <button
                  type="button"
                  (click)="installerPhase.set('photos')"
                  class="flex flex-col items-center group relative z-10 flex-1 cursor-pointer focus:outline-none"
                >
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs"
                    [class]="installerPhase() === 'photos'
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950'
                      : (installerPhaseIndex() > 3 || j.photos.length >= 2
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-700')"
                  >
                    @if (installerPhaseIndex() > 3 || j.photos.length >= 2) {
                      <mat-icon class="!text-base !w-4 !h-4">check</mat-icon>
                    } @else {
                      <span>3</span>
                    }
                  </div>
                  <span 
                    class="text-xs font-bold mt-2 tracking-tight transition-colors text-center truncate max-w-[110px]"
                    [class]="installerPhase() === 'photos' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
                  >
                    Photos
                  </span>
                  <div class="flex items-center gap-1 mt-1.5 justify-center">
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'photos' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'"></span>
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'photos' ? 'bg-blue-600/40 dark:bg-blue-500/40' : 'bg-slate-300/60 dark:bg-slate-700/60'"></span>
                  </div>
                </button>

                <!-- Connector Line 3 -> 4 -->
                <div 
                  class="flex-1 h-0.5 mt-5 -mx-1 sm:-mx-2 transition-colors"
                  [class]="installerPhaseIndex() >= 4 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'"
                ></div>

                <!-- Step 4: Review & Clock Out -->
                <button
                  type="button"
                  (click)="installerPhase.set('signoff')"
                  class="flex flex-col items-center group relative z-10 flex-1 cursor-pointer focus:outline-none"
                >
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs"
                    [class]="installerPhase() === 'signoff'
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950'
                      : (j.customerSignoff && isClockOutDone()
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-700')"
                  >
                    @if (j.customerSignoff && isClockOutDone()) {
                      <mat-icon class="!text-base !w-4 !h-4">check</mat-icon>
                    } @else {
                      <span>4</span>
                    }
                  </div>
                  <span 
                    class="text-xs font-bold mt-2 tracking-tight transition-colors text-center truncate max-w-[110px]"
                    [class]="installerPhase() === 'signoff' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'"
                  >
                    Review & Out
                  </span>
                  <div class="flex items-center gap-1 mt-1.5 justify-center">
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'signoff' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'"></span>
                    <span class="w-4 sm:w-5 h-1 rounded-full transition-colors" [class]="installerPhase() === 'signoff' ? 'bg-blue-600/40 dark:bg-blue-500/40' : 'bg-slate-300/60 dark:bg-slate-700/60'"></span>
                  </div>
                </button>

              </div>
            </div>
          } @else {
            <!-- Standard Management Tab Navigation (Admin, Manager, Shop Attendant, Finance) -->
            <div class="px-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 overflow-x-auto">
              <button 
                type="button"
                (click)="activeTab.set('specs')"
                [class]="activeTab() === 'specs' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                class="py-2 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <mat-icon class="!text-sm">door_sliding</mat-icon>
                <span>Specifications & Site</span>
              </button>

              <button 
                type="button"
                (click)="activeTab.set('site_ops')"
                [class]="activeTab() === 'site_ops' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <mat-icon class="!text-sm">schedule</mat-icon>
                <span>Site Attendance & Clock In/Out</span>
              </button>

              <button 
                type="button"
                (click)="activeTab.set('checklist')"
                [class]="activeTab() === 'checklist' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <mat-icon class="!text-sm">fact_check</mat-icon>
                <span>Checklist</span>
              </button>

              <button 
                type="button"
                (click)="activeTab.set('photos')"
                [class]="activeTab() === 'photos' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <mat-icon class="!text-sm">photo_camera</mat-icon>
                <span>Photos ({{ j.photos.length }})</span>
              </button>

              <button 
                type="button"
                (click)="activeTab.set('signoff')"
                [class]="activeTab() === 'signoff' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <mat-icon class="!text-sm">draw</mat-icon>
                <span>Customer Verification</span>
              </button>

              @if (canViewBonus()) {
                <button 
                  type="button"
                  (click)="activeTab.set('bonus')"
                  [class]="activeTab() === 'bonus' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                  class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <mat-icon class="!text-sm">military_tech</mat-icon>
                  <span>Bonus & Finance</span>
                </button>
              }
            </div>
          }

          <!-- Tab Contents -->
          <div class="p-3 sm:p-4 overflow-y-auto space-y-3">
            @if (isInstaller()) {
              <!-- INSTALLER NEXT-STEP CARD (Elevated clean container per reference image) -->
              <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-6">
                <!-- INSTALLER NEXT-STEP PHASES (Omitting administrative, pricing, and internal team card complexities) -->
                @if (installerPhase() === 'clock_in') {
                  <!-- Phase 1: Site Attendance & Clock In -->
                  <div class="space-y-5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                      <div>
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold">1</span>
                          <span>Site Attendance & GPS Verification</span>
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Confirm physical arrival at client site before starting installation.</p>
                      </div>
                      @if (isOnSite()) {
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                          <mat-icon class="!text-sm">check_circle</mat-icon>
                          <span>Clocked In On-Site</span>
                        </span>
                      }
                    </div>

                    <!-- Quick Door & Site Reference for Installer -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs">
                        <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Door Installation Specs</h4>
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Door Category</span>
                          <span class="font-semibold text-slate-900 dark:text-white capitalize">{{ formatCategory(j.doorCategory) }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Dimensions</span>
                          <span class="font-mono font-semibold text-slate-900 dark:text-white">{{ j.dimensions }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Finish & Hardware</span>
                          <span class="font-semibold text-slate-900 dark:text-white text-right">{{ j.finish }} · {{ j.hardwareSpecs }}</span>
                        </div>
                        <div class="flex justify-between py-1">
                          <span class="text-slate-500 dark:text-slate-400">Door Source Shop</span>
                          <span class="font-semibold text-slate-900 dark:text-white">{{ j.shopBranch }}</span>
                        </div>
                      </div>

                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs">
                        <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Client & Site Location</h4>
                        <div>
                          <span class="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Client Name</span>
                          <p class="text-xs font-bold text-slate-900 dark:text-white">{{ j.client.name }}</p>
                        </div>
                        <div>
                          <span class="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Site Address</span>
                          <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
                            <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">place</mat-icon>
                            <span>{{ j.client.siteAddress }}</span>
                          </p>
                        </div>
                        <div class="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold">Call Customer</span>
                          <a [href]="'tel:' + j.client.phone" class="font-mono font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1 hover:underline">
                            <mat-icon class="!text-xs">call</mat-icon>
                            <span>{{ j.client.phone }}</span>
                          </a>
                        </div>
                        @if (j.client.accessInstructions) {
                          <div class="pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                            <span class="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold">Site Notes</span>
                            <span class="text-slate-700 dark:text-slate-300 italic">{{ j.client.accessInstructions }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Clock In / Out Live GPS Action Widget -->
                    <app-clock-widget 
                      [job]="j"
                      (clockInTriggered)="handleClockIn($event)"
                      (clockOutTriggered)="handleClockOut($event)"
                    />

                    <!-- Phase 1 Footer Next Action -->
                    <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
                      <button
                        type="button"
                        (click)="installerPhase.set('checklist')"
                        class="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <span>Proceed to Step 2: Hardware Checklist</span>
                        <mat-icon class="!text-sm">arrow_forward</mat-icon>
                      </button>
                    </div>
                  </div>
                } @else if (installerPhase() === 'checklist') {
                  <!-- Phase 2: Hardware Checklist -->
                  <div class="space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                      <div>
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold">2</span>
                          <span>Door Hardware Installation Steps</span>
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mark off each step as you complete the mechanical and safety installations.</p>
                      </div>
                      <span class="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {{ completedChecklistCount() }} of {{ j.hardwareChecklist.length }} Completed
                      </span>
                    </div>

                    <div class="space-y-2">
                      @for (item of j.hardwareChecklist; track item.id) {
                        <div 
                          role="button"
                          tabindex="0"
                          (keydown.enter)="toggleChecklist(item.id)"
                          class="p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer"
                          [class]="item.completed ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'"
                          (click)="toggleChecklist(item.id)"
                        >
                          <input 
                            type="checkbox" 
                            [checked]="item.completed"
                            class="mt-0.5 rounded text-emerald-600 focus:ring-0 cursor-pointer" 
                          />
                          <div class="flex-1 text-xs">
                            <p class="font-medium" [class]="item.completed ? 'text-emerald-950 dark:text-emerald-300 line-through' : 'text-slate-800 dark:text-slate-200'">
                              {{ item.label }}
                            </p>
                            @if (item.completedAt) {
                              <p class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                                Verified at {{ formatTime(item.completedAt) }}
                              </p>
                            }
                          </div>
                        </div>
                      }
                    </div>

                    <!-- Phase 2 Navigation Controls -->
                    <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <button 
                        type="button" 
                        (click)="installerPhase.set('clock_in')"
                        class="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <mat-icon class="!text-sm">arrow_back</mat-icon>
                        <span>Site & Clock In</span>
                      </button>

                      <button 
                        type="button" 
                        (click)="installerPhase.set('photos')"
                        class="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <span>Proceed to Step 3: Photos</span>
                        <mat-icon class="!text-sm">arrow_forward</mat-icon>
                      </button>
                    </div>
                  </div>
                } @else if (installerPhase() === 'photos') {
                  <!-- Phase 3: Photos -->
                  <div class="space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                      <div>
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold">3</span>
                          <span>Photographic Quality Proof</span>
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Upload clear photos of the door before installation, during mounting, and after final polish.</p>
                      </div>
                      <span class="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {{ j.photos.length }} Photos Uploaded
                      </span>
                    </div>

                    <app-photo-uploader 
                      [photos]="j.photos"
                      (photoUploaded)="handlePhotoUpload($event)"
                    />

                    <!-- Phase 3 Navigation Controls -->
                    <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <button 
                        type="button" 
                        (click)="installerPhase.set('checklist')"
                        class="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <mat-icon class="!text-sm">arrow_back</mat-icon>
                        <span>Hardware Checklist</span>
                      </button>

                      <button 
                        type="button" 
                        (click)="installerPhase.set('signoff')"
                        class="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <span>Proceed to Step 4: Signoff & Clock Out</span>
                        <mat-icon class="!text-sm">arrow_forward</mat-icon>
                      </button>
                    </div>
                  </div>
                } @else if (installerPhase() === 'signoff') {
                  <!-- Phase 4: Signoff & Clock Out -->
                  <div class="space-y-6">
                    <div class="pb-3 border-b border-slate-200/80 dark:border-slate-800">
                      <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold">4</span>
                        <span>Customer Verification & Clock Out</span>
                      </h3>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Collect the customer digital signature, rating, and finalize your job clock-out.</p>
                    </div>

                    <!-- Customer Signature Form / Verified Certificate -->
                    @if (j.customerSignoff) {
                      <div class="bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-5 space-y-4">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <mat-icon class="text-emerald-700 dark:text-emerald-400">verified</mat-icon>
                            <h4 class="text-sm font-bold text-emerald-950 dark:text-emerald-300">Customer Signoff Verified</h4>
                          </div>
                          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-mono border border-emerald-200 dark:border-emerald-800">
                            Legally Signed
                          </span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 space-y-2">
                            <div class="flex justify-between">
                              <span class="text-slate-500 dark:text-slate-400">Signee Name</span>
                              <strong class="text-slate-900 dark:text-white">{{ j.customerSignoff.clientName }}</strong>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-slate-500 dark:text-slate-400">Customer Rating</span>
                              <strong class="text-amber-600 dark:text-amber-400 font-semibold">{{ j.customerSignoff.rating }}.0 / 5.0 ★</strong>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-slate-500 dark:text-slate-400">Timestamp</span>
                              <span class="font-mono text-slate-700 dark:text-slate-300">{{ formatTime(j.customerSignoff.signedAt) }}</span>
                            </div>
                            @if (j.customerSignoff.feedback) {
                              <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <span class="text-[10px] text-slate-400 dark:text-slate-500 block uppercase">Feedback</span>
                                <p class="text-slate-700 dark:text-slate-300 italic mt-0.5">"{{ j.customerSignoff.feedback }}"</p>
                              </div>
                            }
                          </div>

                          <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 flex flex-col items-center justify-center">
                            <span class="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono mb-2">Customer Digital Signature</span>
                            <div class="h-24 w-full flex items-center justify-center border-b border-dashed border-slate-300 dark:border-slate-700 pb-2">
                              <img [src]="j.customerSignoff.signatureDataUrl" alt="Customer Signature" class="max-h-20 max-w-full object-contain bg-white rounded p-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    } @else {
                      <div class="space-y-3">
                        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
                          <mat-icon class="text-amber-700 dark:text-amber-400">draw</mat-icon>
                          <span>Hand your device to the client to collect their signature and workmanship satisfaction rating.</span>
                        </div>

                        <app-signature-pad 
                          [initialClientName]="j.client.name"
                          (signoffCompleted)="handleSignoff($event)"
                          (cancelled)="installerPhase.set('photos')"
                        />
                      </div>
                    }

                    <!-- Final Site Clock Out -->
                    <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Final Site Clock Out</h4>
                      <app-clock-widget 
                        [job]="j"
                        (clockInTriggered)="handleClockIn($event)"
                        (clockOutTriggered)="handleClockOut($event)"
                      />
                    </div>

                    <!-- Phase 4 Navigation Controls -->
                    <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <button 
                        type="button" 
                        (click)="installerPhase.set('photos')"
                        class="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <mat-icon class="!text-sm">arrow_back</mat-icon>
                        <span>Photo Proof</span>
                      </button>

                      <button 
                        type="button" 
                        (click)="closed.emit()"
                        class="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <mat-icon class="!text-sm">check</mat-icon>
                        <span>Done / Close</span>
                      </button>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <!-- STANDARD MANAGEMENT TABS (Admin, Operations Manager, Shop Manager, Finance) -->
              @if (activeTab() === 'specs') {
                <!-- Technical specs grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="space-y-2.5">
                    <div>
                      <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">Door Specifications</h4>
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-[11px]">
                        <div class="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Door Category</span>
                          <span class="font-semibold text-slate-900 dark:text-white capitalize">{{ formatCategory(j.doorCategory) }}</span>
                        </div>
                        <div class="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Dimensions</span>
                          <span class="font-mono font-semibold text-slate-900 dark:text-white">{{ j.dimensions }}</span>
                        </div>
                        <div class="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Finish & Surface</span>
                          <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ j.finish }}</span>
                        </div>
                        <div class="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Hardware Spec</span>
                          <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ j.hardwareSpecs }}</span>
                        </div>
                        <div class="flex justify-between py-0.5">
                          <span class="text-slate-500 dark:text-slate-400">DoorMaster Shop</span>
                          <span class="font-semibold text-slate-900 dark:text-white">{{ j.shopBranch }}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Assigned Installers</h4>
                        @if (!j.assignedInstallerId && (!j.assignedInstallers || j.assignedInstallers.length === 0)) {
                          <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            <span>Unassigned</span>
                          </span>
                        } @else if (j.installerAssignmentStatus === 'accepted') {
                          <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5">check_circle</mat-icon>
                            <span>Accepted</span>
                          </span>
                        } @else if (j.installerAssignmentStatus === 'rejected') {
                          <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5">cancel</mat-icon>
                            <span>Declined</span>
                          </span>
                        } @else {
                          <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            <mat-icon class="!text-[10px] !w-2.5 !h-2.5">hourglass_top</mat-icon>
                            <span>Pending Acceptance</span>
                          </span>
                        }
                      </div>

                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-2">
                        <!-- Assigned Installers Display in Inline Rows -->
                        <div class="space-y-1.5">
                          <div class="flex items-center justify-between text-[10px]">
                            <span class="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Team ({{ getAssignedTeam(j).length }})
                            </span>
                            <span class="text-slate-500 dark:text-slate-400">Scheduled: <span class="font-mono">{{ j.scheduledDate }}</span> ({{ j.estimatedHours }}h)</span>
                          </div>

                          @if (getAssignedTeam(j).length === 0) {
                            <div class="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-300 text-[11px] flex items-center gap-1.5">
                              <mat-icon class="!text-xs text-amber-600">warning</mat-icon>
                              <span>{{ store.canCurrentRoleAssignInstallers() ? 'No installers assigned yet. Manager can assign below.' : 'No installers assigned yet. Manager will assign the installer.' }}</span>
                            </div>
                          } @else {
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              @for (member of getAssignedTeam(j); track member.id) {
                                <div class="flex items-center justify-between gap-1.5 px-2 py-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs min-w-0">
                                  <div class="flex items-center gap-1.5 min-w-0">
                                    <div class="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[9px] shrink-0">
                                      {{ member.name.charAt(0) }}
                                    </div>
                                    <span class="text-[11px] font-bold text-slate-900 dark:text-white truncate">{{ member.name }}</span>
                                    <span class="text-[8px] font-mono px-1 py-0.2 rounded uppercase font-extrabold shrink-0"
                                      [class]="member.role === 'lead' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'">
                                      {{ member.role === 'lead' ? 'Lead' : 'Asst' }}
                                    </span>
                                  </div>
                                  <div class="flex items-center gap-1 shrink-0">
                                    @if (getMemberStatus(j, member) === 'accepted') {
                                      <span class="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 shrink-0" title="Committed to task (cannot be removed)">
                                        <mat-icon class="!text-[10px] !w-2.5 !h-2.5">check_circle</mat-icon>
                                        <span>{{ isMemberAutoAccepted(j, member) ? 'Auto' : 'OK' }}</span>
                                      </span>
                                    } @else if (getMemberStatus(j, member) === 'rejected') {
                                      <span class="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-700 shrink-0" [title]="getMemberRejectReason(j, member) || 'Declined by installer'">
                                        <mat-icon class="!text-[10px] !w-2.5 !h-2.5">cancel</mat-icon>
                                        <span>Declined</span>
                                      </span>
                                    } @else {
                                      <span class="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-700 shrink-0">
                                        <mat-icon class="!text-[10px] !w-2.5 !h-2.5">schedule</mat-icon>
                                        <span class="font-mono">{{ store.formatInstallerRemaining(j, member) }}</span>
                                      </span>
                                    }
                                    @if (store.canCurrentRoleAssignInstallers() && getMemberStatus(j, member) !== 'accepted') {
                                      <button
                                        type="button"
                                        (click)="removeInstaller(member.id)"
                                        class="p-0.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                                        title="Remove this installer"
                                      >
                                        <mat-icon class="!text-[12px] !w-3 !h-3">close</mat-icon>
                                      </button>
                                    }
                                  </div>
                                </div>
                              }
                            </div>
                          }
                        </div>

                        <!-- Manager: Assign Installer Single-Row Selector -->
                        @if (store.canCurrentRoleAssignInstallers()) {
                          <div class="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center gap-1.5">
                            <select 
                              #installerSelect
                              class="text-[11px] px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium flex-1 cursor-pointer"
                            >
                              <option value="">-- Add Installer --</option>
                              @for (installer of availableInstallers(j); track installer.id) {
                                <option [value]="installer.id">
                                  {{ installer.name }}
                                </option>
                              }
                            </select>
                            <button 
                              type="button"
                              (click)="addInstallerFromDetail(installerSelect.value); installerSelect.value = ''"
                              [disabled]="!installerSelect.value"
                              class="px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                            >
                              <mat-icon class="!text-xs">add</mat-icon>
                              <span>Assign</span>
                            </button>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Store Driver Selection (Shop Attendant Portal Exclusively; Read-Only When Assigned) -->
                    @if (store.canCurrentRoleSelectDispatcher() || j.dispatcherId) {
                      <div>
                        <div class="flex items-center justify-between mb-1.5">
                          <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Store Driver</h4>
                          @if (!j.dispatcherId) {
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700">
                              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                              <span>Driver: Pending</span>
                            </span>
                          } @else if (j.driverAssignmentStatus === 'accepted') {
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                              <mat-icon class="!text-[10px] !w-2.5 !h-2.5">check_circle</mat-icon>
                              <span>{{ j.driverAutoAccepted ? 'Auto-Accepted' : 'Confirmed' }}</span>
                            </span>
                          } @else if (j.driverAssignmentStatus === 'pending') {
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                              <mat-icon class="!text-[10px] !w-2.5 !h-2.5">schedule</mat-icon>
                              <span class="font-mono">{{ store.formatDriverRemaining(j) }} Pending</span>
                            </span>
                          } @else {
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-700">
                              <mat-icon class="!text-[10px] !w-2.5 !h-2.5">local_shipping</mat-icon>
                              <span>Assigned</span>
                            </span>
                          }
                        </div>

                        <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-2">
                          @if (j.dispatcherId) {
                            <div class="flex items-center justify-between px-2.5 py-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                              <div class="flex items-center gap-2 min-w-0">
                                <div class="w-6 h-6 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                  <mat-icon class="!text-xs">local_shipping</mat-icon>
                                </div>
                                <div class="min-w-0">
                                  <p class="text-[11px] font-bold text-slate-900 dark:text-white truncate">{{ j.dispatcherName || 'Store Driver' }}</p>
                                  <p class="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                                    {{ j.logisticsTruck?.truckPlate || 'Assigned Vehicle' }} · {{ j.logisticsTruck?.truckModel || 'Transport Flatbed' }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          } @else if (store.canCurrentRoleSelectDispatcher()) {
                            @if (!store.hasJobAcceptedInstallers(j)) {
                              <div class="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200 text-[11px] flex items-center gap-1.5">
                                <mat-icon class="!text-xs text-amber-600">lock_clock</mat-icon>
                                <span>Driver selection locked until an assigned installer accepts.</span>
                              </div>
                            } @else {
                              <div class="p-2 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-lg text-cyan-900 dark:text-cyan-200 text-[11px] flex items-center gap-1.5">
                                <mat-icon class="!text-xs text-cyan-600">local_shipping</mat-icon>
                                <span>Installer confirmed! Select an available store driver below.</span>
                              </div>
                            }
                          }

                          @if (store.canCurrentRoleSelectDispatcher() && j.status !== 'completed' && j.status !== 'bonus_awarded' && store.hasJobAcceptedInstallers(j)) {
                            <div class="pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center gap-1.5">
                              <select 
                                id="detailDispatcherDropdown"
                                #dispatcherSelect
                                class="text-[11px] px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium flex-1 cursor-pointer"
                              >
                                <option value="">-- Select Store Driver --</option>
                                @for (disp of availableDispatchersForJob(j); track disp.id) {
                                  <option [value]="disp.id">
                                    {{ disp.name }} · {{ disp.assignedTruck.plate }} ({{ disp.status }})
                                  </option>
                                }
                              </select>
                              <button 
                                type="button"
                                (click)="selectDispatcherFromDetail(dispatcherSelect.value); dispatcherSelect.value = ''"
                                [disabled]="!dispatcherSelect.value"
                                class="px-2.5 py-1 text-[11px] font-bold text-white bg-cyan-700 hover:bg-cyan-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                              >
                                <mat-icon class="!text-xs">local_shipping</mat-icon>
                                <span>Select Driver</span>
                              </button>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Client & Site Details -->
                  <div class="space-y-2.5">
                    <div>
                      <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">Client & Installation Location</h4>
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-2 text-[11px]">
                        <div class="flex items-center justify-between gap-2">
                          <div>
                            <span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-semibold">Client Name</span>
                            <p class="text-xs font-bold text-slate-900 dark:text-white">{{ j.client.name }}</p>
                          </div>
                          <div class="text-right">
                            <span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-semibold">Contact Phone</span>
                            <span class="font-mono text-slate-700 dark:text-slate-300">{{ j.client.phone }}</span>
                          </div>
                        </div>
                        <div class="pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-semibold">Site Address</span>
                          <p class="text-[11px] font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                            <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
                            <span>{{ j.client.siteAddress }}</span>
                          </p>
                        </div>
                        @if (j.client.accessInstructions) {
                          <div class="pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                            <span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase font-semibold">Access Note</span>
                            <span class="text-slate-700 dark:text-slate-300 block">{{ j.client.accessInstructions }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Lifecycle Milestone Progress (Reworked with all workflow steps & distinct current step highlight) -->
                    <div>
                      <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">Installation Milestones</h4>
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        @for (m of getInstallationMilestones(j); track m.step) {
                          <div
                            class="flex items-center justify-between gap-2 px-2 py-1 rounded-lg text-[11px] transition-colors"
                            [class]="m.state === 'current'
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-700 text-cyan-900 dark:text-cyan-100 font-bold shadow-2xs'
                              : (m.state === 'done'
                                ? 'text-slate-800 dark:text-slate-200'
                                : 'text-slate-400 dark:text-slate-500')"
                          >
                            <div class="flex items-center gap-2 min-w-0">
                              <mat-icon
                                class="!text-sm !w-4 !h-4 shrink-0"
                                [class]="m.state === 'done'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : (m.state === 'current'
                                    ? 'text-cyan-600 dark:text-cyan-400 animate-pulse'
                                    : 'text-slate-300 dark:text-slate-600')"
                              >
                                {{ m.state === 'done' ? 'check_circle' : (m.state === 'current' ? 'radio_button_checked' : 'radio_button_unchecked') }}
                              </mat-icon>
                              <span class="truncate">{{ m.step }}. {{ m.label }}</span>
                            </div>
                            @if (m.state === 'current') {
                              <span class="px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase tracking-wider bg-cyan-600 text-white shrink-0">
                                Current
                              </span>
                            } @else if (m.state === 'done') {
                              <span class="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 shrink-0">Done</span>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }

              @if (activeTab() === 'site_ops') {
                @let driverTrack = getDriverDeliveryTracker(j);
                <div class="space-y-3">
                  <!-- Driver Delivery Information (Start -> Truck in Motion -> Destination) -->
                  <div class="bg-slate-900 dark:bg-slate-950 text-white rounded-xl p-3 border border-slate-800 space-y-2.5">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-2 min-w-0">
                        <div class="w-7 h-7 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                          <mat-icon class="!text-sm">local_shipping</mat-icon>
                        </div>
                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-[11px] font-bold text-white truncate">
                              {{ j.dispatcherName || 'Store Driver Pending' }}
                            </span>
                            <span class="text-[9px] font-mono text-slate-400">
                              {{ j.logisticsTruck?.truckPlate || 'No truck assigned' }}
                            </span>
                          </div>
                          @if (driverTrack.liveGpsText) {
                            <p class="text-[9px] text-cyan-300 font-mono truncate">{{ driverTrack.liveGpsText }}</p>
                          }
                        </div>
                      </div>

                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0" [class]="driverTrack.badgeClass">
                        <span class="w-1.5 h-1.5 rounded-full" [class]="driverTrack.dotClass"></span>
                        <span>{{ driverTrack.statusLabel }}</span>
                      </span>
                    </div>

                    <!-- 2-Point Route Track: Start -> Truck in Motion -> Destination -->
                    <div class="pt-1">
                      <div class="relative flex items-center justify-between gap-2">
                        <!-- Start Point -->
                        <div class="flex items-center gap-1.5 z-10 bg-slate-900 dark:bg-slate-950 pr-1.5 max-w-[38%]">
                          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 shrink-0"></span>
                          <div class="min-w-0">
                            <span class="text-[8px] uppercase text-slate-400 font-bold block leading-none">Start</span>
                            <span class="text-[10px] font-semibold text-slate-200 truncate block">{{ j.shopBranch }}</span>
                          </div>
                        </div>

                        <!-- Progress Track & Moving Truck -->
                        <div class="flex-1 relative h-1.5 bg-slate-800 rounded-full overflow-visible mx-1">
                          <div
                            class="h-full rounded-full transition-all duration-700"
                            [class]="driverTrack.progressPercent >= 100 ? 'bg-emerald-500' : 'bg-cyan-500'"
                            [style.width.%]="driverTrack.progressPercent"
                          ></div>
                          <div
                            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-2 flex items-center justify-center shadow-md transition-all duration-700"
                            [class]="driverTrack.progressPercent >= 100 ? 'border-emerald-400 text-emerald-400' : 'border-cyan-400 text-cyan-400'"
                            [style.left.%]="driverTrack.progressPercent"
                            [title]="driverTrack.statusLabel"
                          >
                            <mat-icon class="!text-xs !w-3.5 !h-3.5" [class.animate-pulse]="driverTrack.isMoving">local_shipping</mat-icon>
                          </div>
                        </div>

                        <!-- Destination Point -->
                        <div class="flex items-center gap-1.5 z-10 bg-slate-900 dark:bg-slate-950 pl-1.5 max-w-[38%] text-right">
                          <div class="min-w-0">
                            <span class="text-[8px] uppercase text-slate-400 font-bold block leading-none">Destination</span>
                            <span class="text-[10px] font-semibold text-slate-200 truncate block">{{ j.client.siteAddress }}</span>
                          </div>
                          <span class="w-2.5 h-2.5 rounded-full bg-rose-400 ring-2 ring-rose-400/30 shrink-0"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Per-Installer Clock-In & Clock-Out Log -->
                  <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <div class="flex items-center justify-between">
                      <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                        <mat-icon class="!text-xs text-emerald-600">schedule</mat-icon>
                        <span>Per-Installer Clock-In &amp; Clock-Out</span>
                      </h4>
                      <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        {{ getAssignedTeam(j).length }} Installer(s)
                      </span>
                    </div>

                    @if (getAssignedTeam(j).length === 0) {
                      <p class="text-[11px] text-slate-500 dark:text-slate-400 italic">No installers assigned to this task yet.</p>
                    } @else {
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        @for (row of getInstallerClockRows(j); track row.installerId) {
                          <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 space-y-1 text-[11px]">
                            <div class="flex items-center justify-between gap-1.5">
                              <div class="flex items-center gap-1.5 min-w-0">
                                <span class="font-bold text-slate-900 dark:text-white truncate">{{ row.name }}</span>
                                <span class="text-[8px] font-mono uppercase px-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                                  {{ row.role === 'lead' ? 'Lead' : 'Asst' }}
                                </span>
                              </div>
                              <span class="px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0" [class]="row.statusClass">
                                {{ row.statusLabel }}
                              </span>
                            </div>
                            <div class="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              <span>In: <strong class="text-slate-700 dark:text-slate-200">{{ row.clockInText }}</strong></span>
                              <span>Out: <strong class="text-slate-700 dark:text-slate-200">{{ row.clockOutText }}</strong></span>
                            </div>
                            <!-- 2-Point Route Track: Start -> Installer -> Destination -->
                            <div class="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800">
                              <div class="relative flex items-center justify-between gap-2">
                                <!-- Start Point -->
                                <div class="flex items-center gap-1.5 z-10 pr-1 max-w-[38%]">
                                  <span class="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/25 shrink-0"></span>
                                  <div class="min-w-0">
                                    <span class="text-[7px] uppercase text-slate-400 font-bold block leading-none">Start</span>
                                    <span class="text-[9.5px] font-semibold text-slate-700 dark:text-slate-200 truncate block" [title]="row.startLocation">{{ row.startLocation }}</span>
                                  </div>
                                </div>

                                <!-- Progress Track & Moving Installer Icon -->
                                <div class="flex-1 relative h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-visible mx-1">
                                  <div
                                    class="h-full rounded-full transition-all duration-700"
                                    [class]="row.progressPercent >= 100 ? 'bg-emerald-500' : 'bg-cyan-500'"
                                    [style.width.%]="row.progressPercent"
                                  ></div>
                                  <div
                                    class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 flex items-center justify-center shadow-sm transition-all duration-700"
                                    [class]="row.progressPercent >= 100 ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-cyan-500 text-cyan-600 dark:text-cyan-400'"
                                    [style.left.%]="row.progressPercent"
                                    [title]="row.statusLabel"
                                  >
                                    <mat-icon class="!text-[11px] !w-3 !h-3" [class.animate-pulse]="row.isMoving">handyman</mat-icon>
                                  </div>
                                </div>

                                <!-- Destination Point -->
                                <div class="flex items-center gap-1.5 z-10 pl-1 max-w-[38%] text-right">
                                  <div class="min-w-0">
                                    <span class="text-[7px] uppercase text-slate-400 font-bold block leading-none">Destination</span>
                                    <span class="text-[9.5px] font-semibold text-slate-700 dark:text-slate-200 truncate block" [title]="row.destination">{{ row.destination }}</span>
                                  </div>
                                  <span class="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-500/25 shrink-0"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    }
                  </div>

                  <!-- Clock In/Out on Site Widget -->
                  <app-clock-widget 
                    [job]="j"
                    (clockInTriggered)="handleClockIn($event)"
                    (clockOutTriggered)="handleClockOut($event)"
                  />
                </div>
              }

              @if (activeTab() === 'checklist') {
                <!-- Hardware Checklist representing Selected Doors + Single Installer-Only Comment Field -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div>
                      <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Door Hardware Installation Checklist</h4>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400">
                        Steps represent selected doors on this order.
                      </p>
                    </div>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
                      {{ completedChecklistCount() }} / {{ j.hardwareChecklist.length }} Complete
                    </span>
                  </div>

                  <!-- Selected Doors Representation Strip -->
                  <div class="bg-slate-50 dark:bg-slate-800/60 rounded-lg px-2.5 py-1.5 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Doors ({{ getChecklistDoors(j).length }}):
                    </span>
                    @for (door of getChecklistDoors(j); track door.id) {
                      <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-800 dark:text-slate-200">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-teal-600">door_front</mat-icon>
                        <span>{{ door.quantity }}× {{ door.doorModel }}</span>
                      </span>
                    }
                  </div>

                  <!-- Compact Checklist Rows -->
                  <div class="space-y-1 max-h-[250px] overflow-y-auto pr-1">
                    @for (item of j.hardwareChecklist; track item.id; let idx = $index) {
                      <div
                        role="button"
                        tabindex="0"
                        (keydown.enter)="toggleChecklist(item.id)"
                        (click)="toggleChecklist(item.id)"
                        class="px-2.5 py-1.5 rounded-lg border transition-all flex items-center justify-between gap-2 cursor-pointer"
                        [class]="item.completed ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'"
                      >
                        <div class="flex items-center gap-2 min-w-0">
                          <input 
                            type="checkbox" 
                            [checked]="item.completed"
                            class="rounded text-emerald-600 focus:ring-0 cursor-pointer shrink-0" 
                          />
                          @if (getChecklistDoors(j)[idx % getChecklistDoors(j).length]; as doorRef) {
                            <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shrink-0 max-w-[140px] truncate">
                              {{ doorRef.doorModel }}
                            </span>
                          }
                          <span class="text-[11px] font-medium truncate" [class]="item.completed ? 'text-emerald-950 dark:text-emerald-300 line-through' : 'text-slate-800 dark:text-slate-200'">
                            {{ item.label }}
                          </span>
                        </div>
                        @if (item.completedAt) {
                          <span class="text-[9px] text-emerald-700 dark:text-emerald-400 font-mono shrink-0">
                            {{ formatTime(item.completedAt) }}
                          </span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Single Installer-Only Checklist Comment Field -->
                  <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <div class="flex items-center justify-between">
                      <label class="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <mat-icon class="!text-xs text-emerald-600">comment</mat-icon>
                        <span>Installer Checklist Comment</span>
                      </label>
                      <span class="text-[9px] font-semibold text-slate-400">
                        {{ store.currentRole() === 'installer' ? 'Editable (Installer)' : 'Read-Only' }}
                      </span>
                    </div>
                    @if (store.currentRole() === 'installer') {
                      <textarea
                        rows="2"
                        [value]="getChecklistComment(j)"
                        (change)="saveChecklistComment(j, $any($event.target).value)"
                        placeholder="Add installation notes or comments for this checklist..."
                        class="w-full text-[11px] px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      ></textarea>
                    } @else {
                      <div class="text-[11px] px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 min-h-[38px]">
                        @if (getChecklistComment(j)) {
                          <span>{{ getChecklistComment(j) }}</span>
                          @if (getChecklistCommentAuthor(j)) {
                            <span class="text-[10px] text-slate-400 ml-1">— {{ getChecklistCommentAuthor(j) }}</span>
                          }
                        } @else {
                          <span class="text-slate-400 italic">No installer comment recorded yet.</span>
                        }
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeTab() === 'photos') {
                <!-- Photo Proof Uploader -->
                <app-photo-uploader 
                  [photos]="j.photos"
                  (photoUploaded)="handlePhotoUpload($event)"
                />
              }

              @if (activeTab() === 'signoff') {
                <!-- Customer Verification -->
                @if (j.customerSignoff) {
                  <div class="bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-emerald-700 dark:text-emerald-400">verified</mat-icon>
                        <h4 class="text-sm font-bold text-emerald-950 dark:text-emerald-300">Customer Verification Archival Certificate</h4>
                      </div>
                      <span class="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-mono border border-emerald-200 dark:border-emerald-800">
                        Legally Signed
                      </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 space-y-2">
                        <div class="flex justify-between">
                          <span class="text-slate-500 dark:text-slate-400">Signee Name</span>
                          <strong class="text-slate-900 dark:text-white">{{ j.customerSignoff.clientName }}</strong>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-slate-500 dark:text-slate-400">Workmanship Rating</span>
                          <strong class="text-amber-600 dark:text-amber-400 font-semibold">{{ j.customerSignoff.rating }}.0 / 5.0 ★</strong>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-slate-500 dark:text-slate-400">Signed Timestamp</span>
                          <span class="font-mono text-slate-700 dark:text-slate-300">{{ formatTime(j.customerSignoff.signedAt) }}</span>
                        </div>
                        <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span class="text-[10px] text-slate-400 dark:text-slate-500 block uppercase">Client Remarks</span>
                          <p class="text-slate-700 dark:text-slate-300 italic mt-0.5">"{{ j.customerSignoff.feedback }}"</p>
                        </div>
                      </div>

                      <!-- Signature display -->
                      <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 flex flex-col items-center justify-center">
                        <span class="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono mb-2">Customer Digital Signature</span>
                        <div class="h-24 w-full flex items-center justify-center border-b border-dashed border-slate-300 dark:border-slate-700 pb-2">
                          <img [src]="j.customerSignoff.signatureDataUrl" alt="Customer Signature" class="max-h-20 max-w-full object-contain bg-white rounded p-1" />
                        </div>
                        <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-2">Verified via DoorMaster Client Sign-Off Pad</span>
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="space-y-4">
                    <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
                      <mat-icon class="text-amber-700 dark:text-amber-400">info</mat-icon>
                      <span>Customer signature is required to confirm installation completion.</span>
                    </div>

                    <app-signature-pad 
                      [initialClientName]="j.client.name"
                      (signoffCompleted)="handleSignoff($event)"
                      (cancelled)="activeTab.set('specs')"
                    />
                  </div>
                }
              }

              @if (activeTab() === 'bonus' && canViewBonus()) {
                <!-- Bonus & Financials Tracker -->
                <div class="space-y-5">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                      <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Eligible Installer Bonus</span>
                      <span class="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">GH₵{{ j.financials.bonusAmount }}</span>
                      <span class="block text-xs mt-1 font-medium capitalize" [class]="j.financials.bonusStatus === 'approved' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'">
                        Status: {{ j.financials.bonusStatus }}
                      </span>
                    </div>

                    <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                      <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Installation & Labor Total</span>
                      <span class="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                        GH₵{{ ((j.financials.installationFee || 0) + (j.financials.laborCost || 0)).toLocaleString() }}
                      </span>
                      <span class="block text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Fee: GH₵{{ (j.financials.installationFee || 0).toLocaleString() }} · Labor: GH₵{{ (j.financials.laborCost || 0).toLocaleString() }}
                      </span>
                    </div>

                    <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                      <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Bonus Authorization</span>
                      @if (j.financials.bonusStatus === 'approved') {
                        <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mt-1">Authorized by {{ j.financials.bonusApprovedBy }}</span>
                        <span class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{{ formatTime(j.financials.bonusApprovedAt || '') }}</span>
                      } @else {
                        <button 
                          type="button"
                          (click)="handleApproveBonus()"
                          [disabled]="!j.customerSignoff"
                          class="mt-1 w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors"
                        >
                          Authorize Bonus Payout
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Incentive Calculation Breakdown -->
                  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Management Incentive Formula Breakdown</h4>
                    <div class="space-y-2 text-xs">
                      <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span class="text-slate-600 dark:text-slate-400">Base Architectural Door Incentive ({{ formatCategory(j.doorCategory) }})</span>
                        <span class="font-mono font-semibold text-slate-900 dark:text-white">GH₵160.00</span>
                      </div>
                      <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span class="text-slate-600 dark:text-slate-400">On-Time Arrival & Completion Incentive</span>
                        <span class="font-mono font-semibold text-slate-900 dark:text-white">+GH₵40.00</span>
                      </div>
                      <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                        <span class="text-slate-600 dark:text-slate-400">Photographic Quality Assurance Upload (Before & After)</span>
                        <span class="font-mono font-semibold text-slate-900 dark:text-white">+GH₵25.00</span>
                      </div>
                      @if (j.customerSignoff && j.customerSignoff.rating >= 5) {
                        <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-medium">
                          <span>5-Star Perfect Customer Satisfaction Multiplier (+25%)</span>
                          <span class="font-mono font-bold">+25% Applied</span>
                        </div>
                      }
                      <div class="flex justify-between pt-1 font-bold text-sm text-slate-900 dark:text-white">
                        <span>Total Calculated Performance Bonus</span>
                        <span class="font-mono text-emerald-700 dark:text-emerald-400">GH₵{{ j.financials.bonusAmount }}.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      </div>
    }
  `
})
export class JobDetailModal {
  jobId = input.required<string>();
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  closed = output<void>();

  readonly activeTab = signal<'specs' | 'site_ops' | 'checklist' | 'photos' | 'signoff' | 'bonus'>('specs');

  readonly isInstaller = computed(() => this.store.currentRole() === 'installer');
  readonly installerPhase = signal<'clock_in' | 'checklist' | 'photos' | 'signoff'>('clock_in');

  readonly installerPhaseIndex = computed(() => {
    switch (this.installerPhase()) {
      case 'clock_in': return 1;
      case 'checklist': return 2;
      case 'photos': return 3;
      case 'signoff': return 4;
      default: return 1;
    }
  });

  readonly isOnSite = computed(() => {
    const j = this.currentJob();
    return j ? (j.status === 'on_site' || j.clockSessions.some(s => !s.clockOutTime)) : false;
  });

  readonly isClockOutDone = computed(() => {
    const j = this.currentJob();
    return j ? (j.status === 'installed_pending_signoff' || j.status === 'completed' || j.status === 'bonus_awarded') : false;
  });

  readonly canViewBonus = computed(() => {
    const role = this.store.currentRole();
    if (['client', 'installer', 'shop_manager', 'dispatcher'].includes(role)) {
      return false;
    }
    return this.store.currentRoleDefinition().permissions.canApproveBonuses || role === 'admin' || role === 'account_officer';
  });

  readonly currentJob = computed(() => {
    return this.store.jobs().find(j => j.id === this.jobId()) || null;
  });

  readonly completedChecklistCount = computed(() => {
    const j = this.currentJob();
    return j ? j.hardwareChecklist.filter(i => i.completed).length : 0;
  });

  availableInstallers(job: InstallationJob) {
    const currentTeam = this.getAssignedTeam(job);
    const assignedIds = new Set(currentTeam.map(m => m.id));
    if (job.assignedInstallerId) assignedIds.add(job.assignedInstallerId);
    if (job.assignedInstallerIds) job.assignedInstallerIds.forEach(id => assignedIds.add(id));
    return this.store.installers().filter(inst => !assignedIds.has(inst.id));
  }

  getAssignedTeam(job: InstallationJob): AssignedInstallerTeamMember[] {
    const assignedIds = new Set<string>();
    if (Array.isArray(job.assignedInstallerIds) && job.assignedInstallerIds.length > 0) {
      job.assignedInstallerIds.forEach(id => { if (id) assignedIds.add(id); });
    } else if (job.assignedInstallerId) {
      assignedIds.add(job.assignedInstallerId);
    }

    if (job.assignedInstallers && job.assignedInstallers.length > 0) {
      const filtered = assignedIds.size > 0
        ? job.assignedInstallers.filter(m => assignedIds.has(m.id))
        : job.assignedInstallers;
      if (filtered.length > 0) return filtered;
    }
    if (job.assignedInstallerIds && job.assignedInstallerIds.length > 0) {
      return job.assignedInstallerIds.map((id, idx) => {
        const tech = this.store.installers().find(t => t.id === id);
        return {
          id,
          name: tech ? tech.name : (job.assignedInstallerNames?.[idx] || 'Installer'),
          phone: tech?.phone,
          role: idx === 0 ? 'lead' : 'assistant',
          avgRating: tech?.metrics.avgRating,
          status: job.installerAssignmentStatus || 'pending',
          autoAccepted: job.installerAutoAccepted,
          rejectReason: job.installerRejectReason
        };
      });
    }
    if (job.assignedInstallerId) {
      return [{
        id: job.assignedInstallerId,
        name: job.assignedInstallerName || 'Installer',
        role: 'lead',
        status: job.installerAssignmentStatus || 'pending',
        autoAccepted: job.installerAutoAccepted,
        rejectReason: job.installerRejectReason
      }];
    }
    if (job.installerAssignmentStatus === 'rejected' && (job.rejectedByInstallerName || job.assignedInstallerName)) {
      return [{
        id: 'rejected-tech',
        name: job.rejectedByInstallerName || job.assignedInstallerName || 'Installer',
        role: 'lead',
        status: 'rejected',
        rejectReason: job.installerRejectReason || 'Declined by installer'
      }];
    }
    return [];
  }

  getMemberStatus(job: InstallationJob, member: AssignedInstallerTeamMember): 'accepted' | 'rejected' | 'pending' {
    if (member.status === 'accepted' || member.status === 'rejected') {
      return member.status;
    }
    if (job.installerAssignmentStatus === 'accepted') {
      return 'accepted';
    }
    if (job.installerAssignmentStatus === 'rejected') {
      return 'rejected';
    }
    return 'pending';
  }

  isMemberAutoAccepted(job: InstallationJob, member: AssignedInstallerTeamMember): boolean {
    return !!(member.autoAccepted ?? job.installerAutoAccepted);
  }

  getMemberRejectReason(job: InstallationJob, member: AssignedInstallerTeamMember): string | undefined {
    return member.rejectReason || job.installerRejectReason;
  }

  isInstallerInJob(job: InstallationJob, techId: string): boolean {
    if (job.assignedInstallerIds && job.assignedInstallerIds.includes(techId)) return true;
    return job.assignedInstallerId === techId;
  }

  availableDispatchersForJob(job: InstallationJob) {
    const jobBranch = this.store.getJobBranch(job) || this.store.managerBranch();
    const targetId = String(jobBranch?.id || '');
    const targetCode = jobBranch?.branchCode || '';
    const branchMatched = this.store.dispatchers().filter(
      d => (targetId && d.shopId === targetId) || (targetCode && d.branchCode === targetCode)
    );
    return branchMatched.length > 0 ? branchMatched : this.store.dispatchers();
  }

  selectDispatcherFromDetail(dispatcherId: string) {
    if (!this.store.canCurrentRoleSelectDispatcher()) {
      this.alert.warning('Access Restricted', 'Dispatch driver selection is managed exclusively on the Shop Manager portal.');
      return;
    }
    const current = this.currentJob();
    if (current && !this.store.hasJobAcceptedInstallers(current)) {
      this.alert.warning(
        'Installer Acceptance Required',
        'Dispatch Driver can only be assigned after one or more assigned installers have accepted (or auto-accepted) their assignment from Operations Manager.'
      );
      return;
    }
    if (current && !this.store.canShopManagerAssignDriver(current)) {
      this.alert.warning('Access Restricted', 'Only the Shop Manager who created this order can assign the Dispatch Driver.');
      return;
    }
    if (!dispatcherId) return;
    const disp = this.store.dispatchers().find(d => d.id === dispatcherId);
    if (!disp) return;
    this.store.assignDispatchDriverByShop(this.jobId(), {
      dispatcherId: disp.id,
      dispatcherName: disp.name,
      truckPlate: disp.assignedTruck.plate,
      truckModel: disp.assignedTruck.model,
      deliveryNotes: 'Direct store counter handover. Padded blankets applied.',
      estimatedDeparture: 'Dispatched from store'
    });
    this.alert.success('Driver Selected', `${disp.name} (${disp.assignedTruck.plate}) assigned to job #${this.jobId()}.`);
  }

  focusDispatcherSelect() {
    this.activeTab.set('specs');
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const el = document.getElementById('detailDispatcherDropdown') as HTMLSelectElement | null;
        el?.focus();
      }
    }, 50);
  }

  isTeamAssignedToJob(job: InstallationJob, team: InstallerTeam): boolean {
    const ids = job.assignedInstallerIds && job.assignedInstallerIds.length > 0
      ? job.assignedInstallerIds
      : (job.assignedInstallerId ? [job.assignedInstallerId] : []);
    return (
      ids.length === team.memberIds.length &&
      ids[0] === team.leadId &&
      team.memberIds.every(id => ids.includes(id))
    );
  }

  assignTeamFromDetail(team: InstallerTeam) {
    if (!this.store.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    const orderedIds = [
      team.leadId,
      ...team.memberIds.filter(id => id !== team.leadId)
    ];
    this.store.assignInstallersByManager(this.jobId(), orderedIds);
    this.alert.success('Team Assigned', `${team.name} assigned to job #${this.jobId()}. Notification & SMS dispatched.`);
  }

  addInstallerFromDetail(installerId: string) {
    if (!this.store.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!installerId) return;
    this.store.addInstallerToJob(this.jobId(), installerId);
    const tech = this.store.installers().find(t => t.id === installerId);
    this.alert.success('Installer Added', `Added ${tech?.name || 'Installer'} to the installation team. Notification & SMS dispatched.`);
  }

  removeInstaller(installerId: string) {
    if (!this.store.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to remove installers.');
      return;
    }
    this.store.removeInstallerFromJob(this.jobId(), installerId);
    const tech = this.store.installers().find(t => t.id === installerId);
    this.alert.toastInfo('Installer Removed', `Removed ${tech?.name || 'Installer'} from this job.`);
  }

  assignInstallerFromDetail(installerId: string) {
    if (!this.store.canCurrentRoleAssignInstallers()) {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!installerId) return;
    const tech = this.store.installers().find(t => t.id === installerId);
    this.store.assignInstaller(this.jobId(), installerId);
    this.alert.success('Installer Assigned', `Installer ${tech?.name || 'Installer'} assigned to job #${this.jobId()}. Notification & SMS dispatched.`);
  }

  handleAccept() {
    this.store.acceptInstallation(this.jobId());
  }

  handleDispatch() {
    const j = this.currentJob();
    if (!j?.assignedInstallerId) {
      this.alert.warning('Installer Assignment Required', 'Assign dispatch is disabled until an installer is assigned to this job.');
      return;
    }
    this.store.dispatchDoor(this.jobId());
  }

  handleClockIn(coords: { lat: number; lng: number }) {
    this.store.clockIn(this.jobId(), coords.lat, coords.lng);
    this.alert.toastSuccess('Clocked In', 'Site arrival & GPS coordinates recorded.');
  }

  handleClockOut(data: { notes?: string }) {
    this.store.clockOut(this.jobId(), data.notes);
    this.alert.toastSuccess('Work Completed', 'Clock-out recorded. Ready for customer sign-off.');
  }

  toggleChecklist(itemId: string) {
    this.store.toggleChecklistItem(this.jobId(), itemId);
  }

  handlePhotoUpload(data: { stage: 'before' | 'in_progress' | 'after'; url: string; caption: string }) {
    this.store.uploadPhoto(this.jobId(), data.stage, data.url, data.caption);
    this.alert.toastSuccess('Photo Uploaded', `Audit photo for ${data.stage} stage saved.`);
  }

  handleSignoff(data: { clientName: string; signatureDataUrl: string; rating: number; feedback: string; signedAt: string }) {
    this.store.submitCustomerSignoff(this.jobId(), {
      ...data,
      siteRepresentativeName: data.clientName,
      verificationStatement: 'Verified complete and operational without defects.'
    });
    this.alert.success(
      'Sign-Off Submitted',
      `Digital signature from ${data.clientName} (${data.rating}/5) recorded successfully.`
    );
  }

  handleApproveBonus() {
    this.store.approveBonus(this.jobId(), `${this.store.currentRoleDefinition().name}`);
    this.alert.toastSuccess('Incentive Approved', `Approval recorded for job #${this.jobId()}.`);
  }

  assignSelf() {
    const installerId = this.store.currentInstallerId();
    if (!installerId) return;
    this.store.assignInstaller(this.jobId(), installerId);
  }

  getStatusClass(status: InstallationJob['status']): string {
    switch (status) {
      case 'draft': return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
      case 'assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
      case 'dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
      case 'on_site': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'installed_pending_signoff': return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
      case 'completed': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold';
      case 'bonus_awarded': return 'bg-emerald-600 text-white font-bold';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
    }
  }

  formatStatus(status: InstallationJob['status']): string {
    return status.replace(/_/g, ' ');
  }

  formatCategory(category: InstallationJob['doorCategory']): string {
    return category.replace(/_/g, ' ');
  }

  getDriverDeliveryTracker(j: InstallationJob): {
    statusLabel: string;
    progressPercent: number;
    isMoving: boolean;
    badgeClass: string;
    dotClass: string;
    liveGpsText: string | null;
  } {
    const liveUnit = j.dispatcherId
      ? this.store.liveLocations().find(l => l.userId === j.dispatcherId && l.status === 'online')
      : undefined;
    const liveGpsText = liveUnit
      ? `Live GPS: ${liveUnit.latitude.toFixed(5)}, ${liveUnit.longitude.toFixed(5)} · Updated ${this.formatTime(liveUnit.updatedAt)}`
      : null;

    if (['delivered_on_site', 'on_site', 'in_progress', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status)) {
      return {
        statusLabel: 'Delivered on Site (Completed)',
        progressPercent: 100,
        isMoving: false,
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        dotClass: 'bg-emerald-400',
        liveGpsText
      };
    }

    if (j.status === 'dispatched' || j.motionLiveStarted) {
      let pct = 55;
      if (liveUnit && j.client.coordinates) {
        const shop = this.store.branches().find(b => String(b.id) === String(j.shopId)) || this.store.shopLocation();
        if (shop?.latitude && shop?.longitude) {
          const totalDist = Math.hypot(j.client.coordinates.lat - shop.latitude, j.client.coordinates.lng - shop.longitude);
          const remDist = Math.hypot(j.client.coordinates.lat - liveUnit.latitude, j.client.coordinates.lng - liveUnit.longitude);
          if (totalDist > 0.0001) {
            pct = Math.max(15, Math.min(92, Math.round((1 - remDist / totalDist) * 100)));
          }
        }
      }
      return {
        statusLabel: 'Truck in Motion (En Route)',
        progressPercent: pct,
        isMoving: true,
        badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        dotClass: 'bg-cyan-400 animate-ping',
        liveGpsText
      };
    }

    if (j.dispatcherId && j.driverAssignmentStatus === 'accepted') {
      return {
        statusLabel: 'Driver Confirmed (Ready for Dispatch)',
        progressPercent: 15,
        isMoving: false,
        badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
        dotClass: 'bg-teal-400',
        liveGpsText
      };
    }

    if (j.dispatcherId) {
      return {
        statusLabel: 'Driver Assigned (Awaiting Acceptance)',
        progressPercent: 8,
        isMoving: false,
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        dotClass: 'bg-amber-400 animate-pulse',
        liveGpsText
      };
    }

    return {
      statusLabel: 'Pending Driver Assignment',
      progressPercent: 4,
      isMoving: false,
      badgeClass: 'bg-slate-700/60 text-slate-300 border-slate-600',
      dotClass: 'bg-slate-400',
      liveGpsText: null
    };
  }

  getInstallerClockRows(j: InstallationJob): {
    installerId: string;
    name: string;
    role: string;
    statusLabel: string;
    statusClass: string;
    clockInText: string;
    clockOutText: string;
    startLocation: string;
    destination: string;
    progressPercent: number;
    isMoving: boolean;
  }[] {
    const team = this.getAssignedTeam(j);
    const allInstallers = this.store.installers();
    return team.map(member => {
      const profile = allInstallers.find(inst => inst.id === member.id);
      const startLocation = profile?.currentLocationName || j.shopBranch || 'DoorMaster Workshop';
      const destination = j.client?.siteAddress || 'Client Site';
      const sessions = j.clockSessions.filter(s => s.installerId === member.id);
      const fallbackSessions = sessions.length === 0 && team.length === 1 ? j.clockSessions : sessions;
      const latest = fallbackSessions[fallbackSessions.length - 1];
      if (!latest) {
        const isEnRoute = j.status === 'dispatched' || j.status === 'delivered_on_site' || j.status === 'on_site' || j.status === 'in_progress';
        const isAccepted = j.installerAssignmentStatus === 'accepted';
        const progressPercent = isEnRoute ? 55 : isAccepted ? 25 : 10;
        return {
          installerId: member.id,
          name: member.name,
          role: member.role || 'assistant',
          statusLabel: 'Not Clocked In',
          statusClass: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
          clockInText: '—',
          clockOutText: '—',
          startLocation,
          destination,
          progressPercent,
          isMoving: isEnRoute || isAccepted
        };
      }
      const isActive = !latest.clockOutTime;
      return {
        installerId: member.id,
        name: member.name,
        role: member.role || 'assistant',
        statusLabel: isActive ? 'Clocked In' : 'Completed',
        statusClass: isActive
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
          : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
        clockInText: this.formatTime(latest.clockInTime),
        clockOutText: latest.clockOutTime ? this.formatTime(latest.clockOutTime) : 'Active',
        startLocation,
        destination,
        progressPercent: 100,
        isMoving: false
      };
    });
  }

  getChecklistDoors(j: InstallationJob): { id: string; doorModel: string; doorCategory: string; quantity: number }[] {
    if (j.doors && j.doors.length > 0) {
      return j.doors.map((d, idx) => ({
        id: d.id || `door_${idx}`,
        doorModel: d.doorModel,
        doorCategory: d.doorCategory,
        quantity: d.quantity || 1
      }));
    }
    return [{
      id: 'primary_door',
      doorModel: j.doorModel,
      doorCategory: j.doorCategory,
      quantity: 1
    }];
  }

  getChecklistComment(j: InstallationJob): string {
    return j.hardwareChecklist.find(i => !!i.installerComment)?.installerComment || '';
  }

  getChecklistCommentAuthor(j: InstallationJob): string {
    return j.hardwareChecklist.find(i => !!i.installerComment)?.commentUpdatedBy || '';
  }

  saveChecklistComment(j: InstallationJob, comment: string) {
    const firstId = j.hardwareChecklist[0]?.id;
    if (!firstId) return;
    this.store.updateChecklistComment(this.jobId(), firstId, comment);
  }

  updateChecklistComment(itemId: string, comment: string) {
    this.store.updateChecklistComment(this.jobId(), itemId, comment);
  }

  getInstallationMilestones(j: InstallationJob): {
    step: number;
    label: string;
    state: 'done' | 'current' | 'pending';
  }[] {
    const accountVerified = !j.shopBooking || !!j.shopBooking.accountantVerified;
    const installerAssigned = !!(j.assignedAt || j.assignedInstallerId || (j.assignedInstallers && j.assignedInstallers.length > 0));
    const installerAccepted = !!j.acceptedAt || j.installerAssignmentStatus === 'accepted';
    const driverAssigned = !!j.dispatcherId;
    const dispatched =
      ['dispatched', 'delivered_on_site', 'on_site', 'in_progress', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status) ||
      j.driverAssignmentStatus === 'accepted';
    const delivered = ['delivered_on_site', 'on_site', 'in_progress', 'installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status);
    const clockedIn =
      j.status === 'on_site' ||
      j.status === 'in_progress' ||
      j.clockSessions.length > 0 ||
      ['installed_pending_signoff', 'completed', 'bonus_awarded'].includes(j.status);
    const signedOff = !!j.customerSignoff || j.status === 'completed' || j.status === 'bonus_awarded';
    const bonusDone = j.status === 'bonus_awarded';

    const rawSteps: { label: string; done: boolean }[] = [
      { label: `Booking Recorded (${j.shopBranch})`, done: true },
      { label: accountVerified ? 'Account Payment Verified' : 'Account Payment Verification (Accounts)', done: accountVerified },
      { label: installerAssigned ? `Installer Team Assigned (${j.assignedInstallerName || 'Assigned'})` : 'Installer Team Assignment (Manager)', done: installerAssigned },
      { label: installerAccepted ? 'Installer Accepted Assignment' : 'Installer Acceptance', done: installerAccepted },
      { label: driverAssigned ? `Store Driver Assigned (${j.dispatcherName || 'Driver'})` : 'Store Driver Assignment (Shop Attendant)', done: driverAssigned },
      { label: dispatched ? 'Driver Confirmed & Door Dispatched' : 'Door Dispatch & Transit', done: dispatched },
      { label: delivered ? 'Door Delivered On Site' : 'On-Site Delivery Drop-Off', done: delivered },
      { label: clockedIn ? 'On-Site GPS Clock In & Work' : 'On-Site GPS Clock In', done: clockedIn },
      { label: signedOff ? 'Customer Digital Sign-Off Verified' : 'Customer Digital Sign-Off', done: signedOff }
    ];

    if (this.canViewBonus()) {
      rawSteps.push({
        label: bonusDone ? 'Performance Bonus Authorized' : 'Performance Bonus Authorization',
        done: bonusDone
      });
    }

    let foundCurrent = false;
    return rawSteps.map((s, idx) => {
      let state: 'done' | 'current' | 'pending' = 'pending';
      if (s.done) {
        state = 'done';
      } else if (!foundCurrent) {
        state = 'current';
        foundCurrent = true;
      }
      return { step: idx + 1, label: s.label, state };
    });
  }

  formatTime(isoString: string): string {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  }
}
