import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AssignedInstallerTeamMember, InstallationJob } from '../../models/installation.model';
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

              @if ((j.status === 'accepted' || j.status === 'draft' || j.status === 'assigned' || j.status === 'booked_at_shop') && store.currentRole() === 'shop_manager') {
                <button 
                  type="button"
                  [disabled]="!j.assignedInstallerId"
                  (click)="handleDispatch()"
                  [title]="!j.assignedInstallerId ? 'Assign dispatch is disabled until an installer is assigned by Operations Manager' : 'Dispatch Door & Hardware'"
                  [class]="!j.assignedInstallerId
                    ? 'px-3.5 py-1.5 text-xs font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-not-allowed opacity-60 flex items-center gap-1.5 shadow-none'
                    : 'px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer'"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">{{ !j.assignedInstallerId ? 'lock' : 'local_shipping' }}</mat-icon>
                  <span>{{ !j.assignedInstallerId ? 'Dispatch Disabled (Pending Installer)' : 'Dispatch Door & Hardware' }}</span>
                </button>
              }

              <button (click)="closed.emit()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded">
                <mat-icon class="!text-xl">close</mat-icon>
              </button>
            </div>
          </div>

          <!-- Tab Navigation -->
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

            @if (store.currentRole() !== 'dispatcher') {
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

          <!-- Tab Contents -->
          <div class="p-6 overflow-y-auto space-y-6">
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
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Assigned Installer</h4>
                      @if (!j.assignedInstallerId) {
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          <span>Status: Pending</span>
                        </span>
                      } @else if (j.installerAssignmentStatus === 'accepted') {
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                          <mat-icon class="!text-[11px] !w-3 !h-3">check_circle</mat-icon>
                          <span>Accepted</span>
                        </span>
                      } @else {
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                          <mat-icon class="!text-[11px] !w-3 !h-3">hourglass_top</mat-icon>
                          <span>Pending Acceptance</span>
                        </span>
                      }
                    </div>

                    <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3">
                      <!-- Team Members Display -->
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Assigned Installation Team ({{ getAssignedTeam(j).length }})
                          </span>
                          <span class="text-[11px] text-slate-500 dark:text-slate-400">Scheduled: <span class="font-mono">{{ j.scheduledDate }}</span> ({{ j.estimatedHours }}h)</span>
                        </div>

                        @if (getAssignedTeam(j).length === 0) {
                          <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                            <mat-icon class="!text-sm text-amber-600">warning</mat-icon>
                            <span>No installers assigned yet. Operations Manager can assign Installers below.</span>
                          </div>
                        } @else {
                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            @for (member of getAssignedTeam(j); track member.id) {
                              <div class="flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                                <div class="flex items-center gap-2.5 min-w-0">
                                  <div class="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0">
                                    {{ member.name.charAt(0) }}
                                  </div>
                                  <div class="min-w-0">
                                    <div class="flex items-center gap-1.5 flex-wrap">
                                      <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ member.name }}</p>
                                      <span class="text-[9px] font-mono px-1.5 py-0.2 rounded uppercase font-extrabold"
                                        [class]="member.role === 'lead' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'">
                                        {{ member.role === 'lead' ? 'Lead' : 'Assistant' }}
                                      </span>
                                    </div>
                                    <p class="text-[10px] text-slate-400 font-mono">{{ member.phone || 'Field Tech' }}</p>
                                  </div>
                                </div>

                                @if (store.currentRole() === 'manager' || store.currentRole() === 'shop_manager') {
                                  <button
                                    type="button"
                                    (click)="removeInstaller(member.id)"
                                    class="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                    title="Remove this technician from team"
                                  >
                                    <mat-icon class="!text-sm">close</mat-icon>
                                  </button>
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>

                      <!-- Shop Manager & Operations Manager: Multi-installer Assignment & Team Controls -->
                      @if (store.currentRole() === 'manager' || store.currentRole() === 'shop_manager') {
                        <div class="pt-3 border-t border-slate-200/70 dark:border-slate-700/70 space-y-2">
                          <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Add or Reassign Installers:
                          </label>
                          <div class="flex items-center gap-2">
                            <select 
                              id="detailInstallerDropdown"
                              #installerSelect
                              class="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium flex-1 cursor-pointer"
                            >
                              <option value="">-- Select Technician to Add to Team --</option>
                              @for (tech of store.installers(); track tech.id) {
                                <option [value]="tech.id" [disabled]="isInstallerInJob(j, tech.id)">
                                  {{ tech.name }} (★{{ tech.metrics.avgRating }}) · {{ isInstallerInJob(j, tech.id) ? 'Already in Team' : (tech.availabilityStatus || 'available') }}
                                </option>
                              }
                            </select>
                            <button 
                              type="button"
                              (click)="addInstallerFromDetail(installerSelect.value); installerSelect.value = ''"
                              [disabled]="!installerSelect.value"
                              class="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                            >
                              <mat-icon class="!text-xs">person_add</mat-icon>
                              <span>Add to Team</span>
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
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
                          1. Installer: {{ j.assignedAt ? 'Assigned (' + (j.assignedInstallerName || 'Technician') + ')' : 'Pending (Awaiting Operations Manager)' }}
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
                      <div class="flex items-center gap-2.5 text-xs">
                        <mat-icon class="!text-base" [class]="j.status === 'bonus_awarded' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">check_circle</mat-icon>
                        <span [class]="j.status === 'bonus_awarded' ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400 dark:text-slate-500'">5. Performance Bonus Authorized</span>
                      </div>
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
                    <span>Customer signature is required before management bonus can be authorized.</span>
                  </div>

                  <app-signature-pad 
                    [initialClientName]="j.client.name"
                    (signoffCompleted)="handleSignoff($event)"
                    (cancelled)="activeTab.set('specs')"
                  />
                </div>
              }
            }

            @if (activeTab() === 'bonus' && store.currentRole() !== 'dispatcher') {
              <!-- Bonus & Financials Tracker -->
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                    <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Eligible Installer Bonus</span>
                    <span class="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">&#36;{{ j.financials.bonusAmount }}</span>
                    <span class="block text-xs mt-1 font-medium capitalize" [class]="j.financials.bonusStatus === 'approved' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'">
                      Status: {{ j.financials.bonusStatus }}
                    </span>
                  </div>

                  <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
                    <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Door Value + Fee</span>
                    <span class="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                      &#36;{{ j.financials.doorPrice + j.financials.installationFee }}
                    </span>
                    <span class="block text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Fee: &#36;{{ j.financials.installationFee }} · Deposit: Paid
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
                      <span class="font-mono font-semibold text-slate-900 dark:text-white">$160.00</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span class="text-slate-600 dark:text-slate-400">On-Time Arrival & Completion Incentive</span>
                      <span class="font-mono font-semibold text-slate-900 dark:text-white">+$40.00</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span class="text-slate-600 dark:text-slate-400">Photographic Quality Assurance Upload (Before & After)</span>
                      <span class="font-mono font-semibold text-slate-900 dark:text-white">+$25.00</span>
                    </div>
                    @if (j.customerSignoff && j.customerSignoff.rating >= 5) {
                      <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-medium">
                        <span>5-Star Perfect Customer Satisfaction Multiplier (+25%)</span>
                        <span class="font-mono font-bold">+25% Applied</span>
                      </div>
                    }
                    <div class="flex justify-between pt-1 font-bold text-sm text-slate-900 dark:text-white">
                      <span>Total Calculated Performance Bonus</span>
                      <span class="font-mono text-emerald-700 dark:text-emerald-400">&#36;{{ j.financials.bonusAmount }}.00</span>
                    </div>
                  </div>
                </div>
              </div>
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

  readonly currentJob = computed(() => {
    return this.store.jobs().find(j => j.id === this.jobId()) || null;
  });

  readonly completedChecklistCount = computed(() => {
    const j = this.currentJob();
    return j ? j.hardwareChecklist.filter(i => i.completed).length : 0;
  });

  getAssignedTeam(job: InstallationJob): AssignedInstallerTeamMember[] {
    if (job.assignedInstallers && job.assignedInstallers.length > 0) {
      return job.assignedInstallers;
    }
    if (job.assignedInstallerIds && job.assignedInstallerIds.length > 0) {
      return job.assignedInstallerIds.map((id, idx) => {
        const tech = this.store.installers().find(t => t.id === id);
        return {
          id,
          name: tech ? tech.name : (job.assignedInstallerNames?.[idx] || 'Technician'),
          phone: tech?.phone,
          role: idx === 0 ? 'lead' : 'assistant',
          avgRating: tech?.metrics.avgRating
        };
      });
    }
    if (job.assignedInstallerId) {
      return [{
        id: job.assignedInstallerId,
        name: job.assignedInstallerName || 'Technician',
        role: 'lead'
      }];
    }
    return [];
  }

  isInstallerInJob(job: InstallationJob, techId: string): boolean {
    if (job.assignedInstallerIds && job.assignedInstallerIds.includes(techId)) return true;
    return job.assignedInstallerId === techId;
  }

  addInstallerFromDetail(installerId: string) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!installerId) return;
    this.store.addInstallerToJob(this.jobId(), installerId);
    const tech = this.store.installers().find(t => t.id === installerId);
    this.alert.success('Installer Added', `Added ${tech?.name || 'Technician'} to the installation team. Notification & SMS dispatched.`);
  }

  removeInstaller(installerId: string) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Access Restricted', 'Your role is not authorized to remove installers.');
      return;
    }
    this.store.removeInstallerFromJob(this.jobId(), installerId);
    const tech = this.store.installers().find(t => t.id === installerId);
    this.alert.toastInfo('Installer Removed', `Removed ${tech?.name || 'Technician'} from this job.`);
  }

  assignInstallerFromDetail(installerId: string) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Access Restricted', 'Your role is not authorized to assign installers.');
      return;
    }
    if (!installerId) return;
    const tech = this.store.installers().find(t => t.id === installerId);
    this.store.assignInstaller(this.jobId(), installerId);
    this.alert.success('Installer Assigned', `Technician ${tech?.name || 'Installer'} assigned to job #${this.jobId()}. Notification & SMS dispatched.`);
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
  }

  handleClockOut(data: { notes?: string }) {
    this.store.clockOut(this.jobId(), data.notes);
  }

  toggleChecklist(itemId: string) {
    this.store.toggleChecklistItem(this.jobId(), itemId);
  }

  handlePhotoUpload(data: { stage: 'before' | 'in_progress' | 'after'; url: string; caption: string }) {
    this.store.uploadPhoto(this.jobId(), data.stage, data.url, data.caption);
  }

  handleSignoff(data: { clientName: string; signatureDataUrl: string; rating: number; feedback: string; signedAt: string }) {
    this.store.submitCustomerSignoff(this.jobId(), {
      ...data,
      siteRepresentativeName: data.clientName,
      verificationStatement: 'Verified complete and operational without defects.'
    });
  }

  handleApproveBonus() {
    this.store.approveBonus(this.jobId(), `${this.store.currentRoleDefinition().name}`);
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
