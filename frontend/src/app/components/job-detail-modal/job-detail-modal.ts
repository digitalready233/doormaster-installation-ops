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
          <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                DM
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">{{ j.id }}</span>
                  <span class="text-xs text-slate-300 dark:text-slate-600">·</span>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider" [class]="getStatusClass(j.status)">
                    {{ formatStatus(j.status) }}
                  </span>
                </div>
                <h2 class="text-base font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{{ j.doorModel }}</h2>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <!-- Quick lifecycle actions -->
              @if (j.status === 'assigned' && store.currentRole() === 'installer') {
                <button 
                  type="button"
                  (click)="handleAccept()"
                  class="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">handshake</mat-icon>
                  <span>Accept Job & Notify Client</span>
                </button>
              }

              @if (store.currentRole() === 'shop_manager' && !j.dispatcherId && j.status !== 'completed' && j.status !== 'bonus_awarded') {
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
                  <span>{{ store.hasJobAcceptedInstallers(j) ? 'Select Dispatcher' : 'Awaiting Installer Acceptance' }}</span>
                </button>
              } @else if ((j.status === 'accepted' || j.status === 'draft' || j.status === 'assigned' || j.status === 'booked_at_shop' || j.status === 'truck_assigned') && store.currentRole() === 'shop_manager') {
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

          <!-- Phase Stepper for Installers vs Standard Management Tabs -->
          @if (isInstaller()) {
            <!-- INSTALLER NEXT-STEP PHASE STEPPER -->
            <div class="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800">
              <div class="grid grid-cols-4 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold">
                <!-- Phase 1: Site Attendance & Clock In -->
                <button
                  type="button"
                  (click)="installerPhase.set('clock_in')"
                  class="py-2 px-1.5 sm:px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  [class]="installerPhase() === 'clock_in'
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : (isOnSite() || isClockOutDone() ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700')"
                >
                  <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ isOnSite() || isClockOutDone() ? 'check_circle' : 'schedule' }}</mat-icon>
                  <span class="truncate">1. Site & Clock In</span>
                </button>

                <!-- Phase 2: Hardware Checklist -->
                <button
                  type="button"
                  (click)="installerPhase.set('checklist')"
                  class="py-2 px-1.5 sm:px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  [class]="installerPhase() === 'checklist'
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : (completedChecklistCount() === j.hardwareChecklist.length && j.hardwareChecklist.length > 0 ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700')"
                >
                  <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ completedChecklistCount() === j.hardwareChecklist.length && j.hardwareChecklist.length > 0 ? 'check_circle' : 'fact_check' }}</mat-icon>
                  <span class="truncate">2. Checklist</span>
                </button>

                <!-- Phase 3: Photo Verification -->
                <button
                  type="button"
                  (click)="installerPhase.set('photos')"
                  class="py-2 px-1.5 sm:px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  [class]="installerPhase() === 'photos'
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : (j.photos.length >= 2 ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700')"
                >
                  <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ j.photos.length >= 2 ? 'check_circle' : 'photo_camera' }}</mat-icon>
                  <span class="truncate">3. Photos ({{ j.photos.length }})</span>
                </button>

                <!-- Phase 4: Customer Verification & Clock Out -->
                <button
                  type="button"
                  (click)="installerPhase.set('signoff')"
                  class="py-2 px-1.5 sm:px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  [class]="installerPhase() === 'signoff'
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : (j.customerSignoff ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700')"
                >
                  <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ j.customerSignoff ? 'verified' : 'draw' }}</mat-icon>
                  <span class="truncate">4. Signoff & Clock Out</span>
                </button>
              </div>
            </div>
          } @else {
            <!-- Standard Management Tab Navigation (Admin, Operations Manager, Shop Manager, Finance) -->
            <div class="px-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 overflow-x-auto">
              <button 
                type="button"
                (click)="activeTab.set('specs')"
                [class]="activeTab() === 'specs' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
                class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
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
          <div class="p-6 overflow-y-auto space-y-6">
            @if (isInstaller()) {
              <!-- INSTALLER NEXT-STEP PHASES (Omitting administrative, pricing, and internal team card complexities) -->
              @if (installerPhase() === 'clock_in') {
                <!-- Phase 1: Site Attendance & Clock In -->
                <div class="space-y-5">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <div>
                      <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-extrabold">1</span>
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
                      class="px-5 py-2.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
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
                        <span class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-extrabold">2</span>
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
                      class="px-5 py-2.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
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
                        <span class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-extrabold">3</span>
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
                      class="px-5 py-2.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
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
                      <span class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-extrabold">4</span>
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
            } @else {
              <!-- STANDARD MANAGEMENT TABS (Admin, Operations Manager, Shop Manager, Finance) -->
              @if (activeTab() === 'specs') {
                <!-- Technical specs grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div>
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">Door Specifications</h4>
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs">
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Door Category</span>
                          <span class="font-semibold text-slate-900 dark:text-white capitalize">{{ formatCategory(j.doorCategory) }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Dimensions</span>
                          <span class="font-mono font-semibold text-slate-900 dark:text-white">{{ j.dimensions }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Finish & Surface</span>
                          <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ j.finish }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                          <span class="text-slate-500 dark:text-slate-400">Hardware Spec</span>
                          <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ j.hardwareSpecs }}</span>
                        </div>
                        <div class="flex justify-between py-1">
                          <span class="text-slate-500 dark:text-slate-400">DoorMaster Shop</span>
                          <span class="font-semibold text-slate-900 dark:text-white">{{ j.shopBranch }}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Assigned Installers</h4>
                        @if (!j.assignedInstallerId && (!j.assignedInstallers || j.assignedInstallers.length === 0)) {
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            <span>Unassigned</span>
                          </span>
                        } @else if (j.installerAssignmentStatus === 'accepted') {
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                            <mat-icon class="!text-[11px] !w-3 !h-3">check_circle</mat-icon>
                            <span>Accepted</span>
                          </span>
                        } @else if (j.installerAssignmentStatus === 'rejected') {
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                            <mat-icon class="!text-[11px] !w-3 !h-3">cancel</mat-icon>
                            <span>Declined</span>
                          </span>
                        } @else {
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            <mat-icon class="!text-[11px] !w-3 !h-3">hourglass_top</mat-icon>
                            <span>Pending Acceptance</span>
                          </span>
                        }
                      </div>

                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3">
                        <!-- Assigned Installers Display in Row Format (No team cards) -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Assigned Installers ({{ getAssignedTeam(j).length }})
                            </span>
                            <span class="text-[11px] text-slate-500 dark:text-slate-400">Scheduled: <span class="font-mono">{{ j.scheduledDate }}</span> ({{ j.estimatedHours }}h)</span>
                          </div>

                          @if (getAssignedTeam(j).length === 0) {
                            <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                              <mat-icon class="!text-sm text-amber-600">warning</mat-icon>
                              <span>{{ store.canCurrentRoleAssignInstallers() ? 'No installers assigned yet. Operations Manager can assign Installers below.' : 'No installers assigned yet. Operations Manager will assign the installer.' }}</span>
                            </div>
                          } @else {
                            <div class="flex flex-col gap-2">
                              @for (member of getAssignedTeam(j); track member.id) {
                                <div class="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs gap-3">
                                  <div class="flex items-center gap-2.5 min-w-0">
                                    <div class="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0">
                                      {{ member.name.charAt(0) }}
                                    </div>
                                    <div class="min-w-0">
                                      <div class="flex items-center gap-1.5 flex-wrap">
                                        <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ member.name }}</p>
                                        <span class="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-extrabold"
                                          [class]="member.role === 'lead' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'">
                                          {{ member.role === 'lead' ? 'Lead' : 'Assistant' }}
                                        </span>
                                        @if (member.position) {
                                          <span class="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                            {{ member.position }}
                                          </span>
                                        }
                                      </div>
                                      <p class="text-[10px] text-slate-400 font-mono">{{ member.phone || 'Field Installer' }}</p>
                                    </div>
                                  </div>

                                  <div class="flex items-center gap-2 shrink-0">
                                    @if (getMemberStatus(j, member) === 'accepted') {
                                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                                        <mat-icon class="!text-xs !w-3 !h-3">check_circle</mat-icon>
                                        <span>{{ isMemberAutoAccepted(j, member) ? 'Auto-Accepted' : 'Accepted' }}</span>
                                      </span>
                                    } @else if (getMemberStatus(j, member) === 'rejected') {
                                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-700" [title]="getMemberRejectReason(j, member) || 'Declined by installer'">
                                        <mat-icon class="!text-xs !w-3 !h-3">cancel</mat-icon>
                                        <span>Declined</span>
                                      </span>
                                    } @else {
                                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                                        <mat-icon class="!text-xs !w-3 !h-3">schedule</mat-icon>
                                        <span>10m Pending</span>
                                      </span>
                                    }

                                    @if (store.canCurrentRoleAssignInstallers()) {
                                      <button
                                        type="button"
                                        (click)="removeInstaller(member.id)"
                                        class="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                        title="Remove this installer"
                                      >
                                        <mat-icon class="!text-sm">close</mat-icon>
                                      </button>
                                    }
                                  </div>
                                </div>
                              }
                            </div>
                          }
                        </div>

                        <!-- Operations Manager: Assign Installer Single-Row Selector (No Team Cards) -->
                        @if (store.canCurrentRoleAssignInstallers()) {
                          <div class="pt-3 border-t border-slate-200/70 dark:border-slate-700/70 space-y-2">
                            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <mat-icon class="!text-xs text-cyan-600 dark:text-cyan-400">person_add</mat-icon>
                              <span>Add Installer to Order:</span>
                            </span>

                            <div class="flex items-center gap-2">
                              <select 
                                #installerSelect
                                class="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium flex-1 cursor-pointer"
                              >
                                <option value="">-- Select Installer --</option>
                                @for (installer of availableInstallers(j); track installer.id) {
                                  <option [value]="installer.id">
                                    {{ installer.name }} · {{ installer.phone }} ({{ installer.availabilityStatus }})
                                  </option>
                                }
                              </select>
                              <button 
                                type="button"
                                (click)="addInstallerFromDetail(installerSelect.value); installerSelect.value = ''"
                                [disabled]="!installerSelect.value"
                                class="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                              >
                                <mat-icon class="!text-xs">add</mat-icon>
                                <span>Assign</span>
                              </button>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Store Dispatcher Selection (Shop Manager Portal Exclusively; Read-Only When Assigned) -->
                    @if (store.canCurrentRoleSelectDispatcher() || j.dispatcherId) {
                      <div>
                        <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Store Dispatcher</h4>
                          @if (!j.dispatcherId) {
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700 shadow-2xs">
                              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                              <span>Dispatcher: Pending</span>
                            </span>
                          } @else if (j.driverAssignmentStatus === 'accepted') {
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                              <mat-icon class="!text-[11px] !w-3 !h-3">check_circle</mat-icon>
                              <span>Confirmed</span>
                            </span>
                          } @else {
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-700">
                              <mat-icon class="!text-[11px] !w-3 !h-3">local_shipping</mat-icon>
                              <span>Assigned</span>
                            </span>
                          }
                        </div>

                        <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3">
                          @if (j.dispatcherId) {
                            <div class="flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                              <div class="flex items-center gap-2.5 min-w-0">
                                <div class="w-8 h-8 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                  <mat-icon class="!text-sm">local_shipping</mat-icon>
                                </div>
                                <div class="min-w-0">
                                  <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ j.dispatcherName || 'Store Dispatcher' }}</p>
                                  <p class="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                                    {{ j.logisticsTruck?.truckPlate || 'Assigned Vehicle' }} · {{ j.logisticsTruck?.truckModel || 'Transport Flatbed' }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          } @else if (store.canCurrentRoleSelectDispatcher()) {
                            @if (!store.hasJobAcceptedInstallers(j)) {
                              <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
                                <mat-icon class="!text-sm text-amber-600">lock_clock</mat-icon>
                                <span>Dispatch Driver selection is locked. At least one assigned installer must accept (or auto-accept) their assignment from Operations Manager before a driver can be assigned.</span>
                              </div>
                            } @else {
                              <div class="p-3 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-xl text-cyan-900 dark:text-cyan-200 text-xs flex items-center gap-2">
                                <mat-icon class="!text-sm text-cyan-600">local_shipping</mat-icon>
                                <span>Installer confirmed! Select an available store dispatcher below to deliver the door and hardware.</span>
                              </div>
                            }
                          }

                          @if (store.canCurrentRoleSelectDispatcher() && j.status !== 'completed' && j.status !== 'bonus_awarded' && store.hasJobAcceptedInstallers(j)) {
                            <div class="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2">
                              <select 
                                id="detailDispatcherDropdown"
                                #dispatcherSelect
                                class="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium flex-1 cursor-pointer"
                              >
                                <option value="">-- Select Store Dispatcher --</option>
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
                                class="px-3.5 py-1.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                              >
                                <mat-icon class="!text-xs">local_shipping</mat-icon>
                                <span>Select Dispatcher</span>
                              </button>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Client & Site Details -->
                  <div class="space-y-4">
                    <div>
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">Client & Installation Location</h4>
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
                        <div>
                          <span class="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Client Name</span>
                          <p class="text-sm font-bold text-slate-900 dark:text-white">{{ j.client.name }}</p>
                        </div>
                        <div>
                          <span class="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Site Address</span>
                          <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
                            <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">place</mat-icon>
                            <span>{{ j.client.siteAddress }}</span>
                          </p>
                        </div>
                        <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                          <div>
                            <span class="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Contact Phone</span>
                            <span class="font-mono text-slate-700 dark:text-slate-300">{{ j.client.phone }}</span>
                          </div>
                          <div>
                            <span class="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Access Note</span>
                            <span class="text-slate-700 dark:text-slate-300 truncate block">{{ j.client.accessInstructions || 'None specified' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Lifecycle Milestone Progress -->
                    <div>
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">Installation Milestones</h4>
                      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2">
                        <div class="flex items-center gap-2.5 text-xs">
                          <mat-icon class="!text-base" [class]="j.assignedAt ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'">
                            {{ j.assignedAt ? 'check_circle' : 'hourglass_top' }}
                          </mat-icon>
                          <span [class]="j.assignedAt ? 'text-slate-900 dark:text-white font-medium' : 'text-amber-700 dark:text-amber-400 font-semibold'">
                            1. Installer: {{ j.assignedAt ? 'Assigned (' + (j.assignedInstallerName || 'Installer') + ')' : 'Pending (Awaiting Operations Manager)' }}
                          </span>
                        </div>
                        <div class="flex items-center gap-2.5 text-xs">
                          <mat-icon class="!text-base" [class]="j.acceptedAt ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">check_circle</mat-icon>
                          <span [class]="j.acceptedAt ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400 dark:text-slate-500'">2. Installer Accepted (Client alerted)</span>
                        </div>
                        <div class="flex items-center gap-2.5 text-xs">
                          <mat-icon class="!text-base" [class]="j.status === 'on_site' || j.clockSessions.length > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">check_circle</mat-icon>
                          <span [class]="j.status === 'on_site' || j.clockSessions.length > 0 ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400 dark:text-slate-500'">3. On-Site GPS Clock In</span>
                        </div>
                        <div class="flex items-center gap-2.5 text-xs">
                          <mat-icon class="!text-base" [class]="j.customerSignoff ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">check_circle</mat-icon>
                          <span [class]="j.customerSignoff ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400 dark:text-slate-500'">4. Customer Digital Sign-Off Verified</span>
                        </div>
                        @if (canViewBonus()) {
                          <div class="flex items-center gap-2.5 text-xs">
                            <mat-icon class="!text-base" [class]="j.status === 'bonus_awarded' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">check_circle</mat-icon>
                            <span [class]="j.status === 'bonus_awarded' ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400 dark:text-slate-500'">5. Performance Bonus Authorized</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }

              @if (activeTab() === 'site_ops') {
                <!-- Clock In/Out on Site Widget -->
                <app-clock-widget 
                  [job]="j"
                  (clockInTriggered)="handleClockIn($event)"
                  (clockOutTriggered)="handleClockOut($event)"
                />
              }

              @if (activeTab() === 'checklist') {
                <!-- Hardware Checklist -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Door Hardware Installation Steps</h4>
                    <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {{ completedChecklistCount() }} of {{ j.hardwareChecklist.length }} Complete
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
    if (job.assignedInstallers && job.assignedInstallers.length > 0) {
      return job.assignedInstallers;
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
    this.alert.success('Dispatcher Selected', `${disp.name} (${disp.assignedTruck.plate}) assigned to job #${this.jobId()}.`);
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
