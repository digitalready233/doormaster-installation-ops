import { 
  afterNextRender,
  ChangeDetectionStrategy, 
  Component, 
  computed, 
  effect,
  ElementRef,
  inject, 
  output, 
  signal,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { JobDoorItem } from '../../models/installation.model';

import { ClientLocationMap, ClientLocationResult } from '../client-location-map/client-location-map';

export interface EditableDoorItem extends JobDoorItem {
  isExpanded: boolean;
}

@Component({
  selector: 'app-new-job-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, ClientLocationMap],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh] text-slate-900 dark:text-slate-100">
        
        <!-- Modal Header -->
        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
              <mat-icon class="!text-lg !w-5 !h-5">door_front</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">Book New Door Installation</h3>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {{ store.currentRoleDefinition().name }}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select multiple door units, customize door dropdown specs, and specify client site details
              </p>
            </div>
          </div>
          <button 
            type="button"
            (click)="closed.emit()" 
            class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close dialog"
            aria-label="Close dialog"
          >
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <form [formGroup]="jobForm" (ngSubmit)="handleCreateJob()" class="flex flex-col flex-1 min-h-0 overflow-hidden">
          
          <!-- Scrollable Modal Form Body -->
          <div class="p-3.5 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6">
            
            <!-- ========================================================================= -->
          <!-- SECTION 1: MULTI-DOOR SELECTION & ACCORDION DROPDOWN SPECIFICATIONS       -->
          <!-- ========================================================================= -->
          <div class="space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 class="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Selected Doors for Installation
                </h4>
              </div>
            </div>

            <!-- Selected Doors List with Expandable Door Information Dropdown -->
            <div class="space-y-3">
              @for (door of selectedDoors(); track door.id; let i = $index) {
                <div class="rounded-xl border transition-all duration-200 overflow-hidden"
                  [class]="door.isExpanded 
                    ? 'border-emerald-500/50 dark:border-emerald-500/40 bg-white dark:bg-slate-900 shadow-md ring-1 ring-emerald-500/20' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'">
                  
                  <!-- Door Summary Bar / Dropdown Trigger Header -->
                  <div 
                    (click)="toggleDoorDropdown(i)"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 cursor-pointer select-none bg-slate-100/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <!-- Left: Door Title & Badge (with mobile actions) -->
                    <div class="flex items-center justify-between sm:justify-start gap-2.5 min-w-0 w-full sm:w-auto">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          #{{ i + 1 }}
                        </div>
                        <div class="truncate">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {{ door.doorModel }}
                            </h5>
                            <span class="text-[9px] sm:text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {{ door.doorCategory }}
                            </span>
                          </div>
                          <p class="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
                            {{ door.dimensions }} · {{ door.finish }}
                          </p>
                        </div>
                      </div>

                      <!-- Mobile-only quick toggle & remove buttons -->
                      <div class="flex items-center gap-1 sm:hidden shrink-0" (click)="$event.stopPropagation()">
                        @if (selectedDoors().length > 1) {
                          <button 
                            type="button"
                            (click)="removeDoor(i)"
                            class="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                            title="Remove this door"
                          >
                            <mat-icon class="!text-sm !w-4 !h-4">delete_outline</mat-icon>
                          </button>
                        }
                        <button 
                          type="button"
                          (click)="toggleDoorDropdown(i)"
                          class="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-transform duration-200 cursor-pointer"
                          [class.rotate-180]="door.isExpanded"
                        >
                          <mat-icon class="!text-lg">expand_more</mat-icon>
                        </button>
                      </div>
                    </div>

                    <!-- Right (Desktop) / Bottom line (Mobile): Quantity, Price & Actions -->
                    <div class="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1.5 sm:pt-0 border-t border-slate-200/60 dark:border-slate-700/60 sm:border-0" (click)="$event.stopPropagation()">
                      
                      <!-- Quantity Controls -->
                      <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                        <button 
                          type="button"
                          (click)="changeDoorQty(i, -1)"
                          [disabled]="door.quantity <= 1"
                          class="px-2 py-1 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                          title="Decrease quantity"
                        >
                          <mat-icon class="!text-xs !w-3 !h-3">remove</mat-icon>
                        </button>
                        <span class="px-2 py-1 text-xs font-mono font-bold text-slate-900 dark:text-white min-w-[24px] text-center">
                          {{ door.quantity }}
                        </span>
                        <button 
                          type="button"
                          (click)="changeDoorQty(i, 1)"
                          class="px-2 py-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                          title="Increase quantity"
                        >
                          <mat-icon class="!text-xs !w-3 !h-3">add</mat-icon>
                        </button>
                      </div>

                      <!-- Subtotal Price -->
                      <div class="text-right font-mono min-w-[70px] sm:min-w-[80px]">
                        <span class="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                          ₵{{ (door.unitPrice * door.quantity).toLocaleString() }}
                        </span>
                        <span class="text-[9px] text-slate-400 block">
                          @ ₵{{ door.unitPrice.toLocaleString() }}
                        </span>
                      </div>

                      <!-- Desktop Remove & Toggle Buttons -->
                      <div class="hidden sm:flex items-center gap-1">
                        @if (selectedDoors().length > 1) {
                          <button 
                            type="button"
                            (click)="removeDoor(i)"
                            class="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                            title="Remove this door"
                          >
                            <mat-icon class="!text-sm !w-4 !h-4">delete_outline</mat-icon>
                          </button>
                        }

                        <button 
                          type="button"
                          (click)="toggleDoorDropdown(i)"
                          class="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-transform duration-200 cursor-pointer"
                          [class.rotate-180]="door.isExpanded"
                          title="{{ door.isExpanded ? 'Collapse door specs' : 'Expand door specs' }}"
                        >
                          <mat-icon class="!text-lg">expand_more</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- ============================================================= -->
                  <!-- EXPANDED DOOR INFORMATION DROPDOWN BODY                       -->
                  <!-- Contains all door specifications inside the dropdown          -->
                  <!-- ============================================================= -->
                  @if (door.isExpanded) {
                    <div class="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5 animate-in slide-in-from-top-2 duration-150">
                      
                      <!-- Model selector for this specific door item -->
                      <div class="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                        <div class="flex items-center justify-between mb-1">
                          <label class="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                            Preset Model Template
                          </label>
                          <span class="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                            Auto-syncs specs & category
                          </span>
                        </div>
                        <select 
                          (change)="onDoorCatalogPick(i, $event)"
                          class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                        >
                          <option value="">-- Select catalog template --</option>
                          @for (catDoor of store.doors(); track catDoor.id) {
                            <option [value]="catDoor.id" [selected]="catDoor.id === door.catalogDoorId">
                              {{ catDoor.name }} ({{ catDoor.modelCode }}) - {{ catDoor.formattedPrice || ('₵' + catDoor.unitPrice) }} • {{ catDoor.category }}
                            </option>
                          }
                        </select>
                      </div>

                      <!-- Door Category & Model Title (Read-Only) -->
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div class="flex items-center justify-between mb-1">
                            <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                              Door Category
                            </label>
                            <span class="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded">
                              <mat-icon class="!text-[11px] !w-3 !h-3">lock</mat-icon>
                              <span>Read-Only</span>
                            </span>
                          </div>
                          <input 
                            type="text"
                            [value]="door.doorCategory"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-medium cursor-default focus:outline-none"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Door Model Title
                          </label>
                          <input 
                            type="text"
                            [value]="door.doorModel"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 cursor-default focus:outline-none"
                          />
                        </div>
                      </div>

                      <!-- Dimensions & Finish (Read-Only) -->
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Dimensions (H × W × D)
                          </label>
                          <input 
                            type="text"
                            [value]="door.dimensions"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 cursor-default focus:outline-none"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Architectural Finish
                          </label>
                          <input 
                            type="text"
                            [value]="door.finish"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 cursor-default focus:outline-none"
                          />
                        </div>
                      </div>

                      <!-- Hardware & Mortise Specifications & Lock (Read-Only) -->
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Hardware & Mortise Specifications
                          </label>
                          <input 
                            type="text"
                            [value]="door.hardwareSpecs"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 cursor-default focus:outline-none"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Smart Lock / Handle
                          </label>
                          <input 
                            type="text"
                            [value]="door.lockModel || 'Doormaster Smart Lock Handle F35 (Biometric & RFID)'"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 cursor-default focus:outline-none"
                          />
                        </div>
                      </div>

                      <!-- Unit Price and Quantity for this Door Item (Read-Only Specs) -->
                      <div class="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Catalog Unit Price (₵)
                          </label>
                          <input 
                            type="text"
                            [value]="'₵' + door.unitPrice.toLocaleString()"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold cursor-default focus:outline-none"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Unit Quantity
                          </label>
                          <input 
                            type="number"
                            [value]="door.quantity"
                            readonly
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold cursor-default focus:outline-none"
                          />
                        </div>
                      </div>

                    </div>
                  }
                </div>
              }
            </div>

            <!-- Units Summary & Add Door Action (After Selected Doors) -->
            <div class="flex items-center justify-between gap-2 pt-1">
              <span class="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                {{ totalDoorsCount() }} Unit(s)
              </span>
              <button 
                type="button" 
                (click)="addDoorFromCatalog()"
                class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
              >
                <mat-icon class="!text-xs !w-3.5 !h-3.5">add</mat-icon>
                <span>+ Add Door</span>
              </button>
            </div>
          </div>

          <!-- ========================================================================= -->
          <!-- SECTION 2: CLIENT & INSTALLATION SITE DETAILS (MAINTAINED)                -->
          <!-- ========================================================================= -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Client & Installation Site Details
              </h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="jobClientName" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Client Full Name *
                </label>
                <input 
                  id="jobClientName"
                  type="text" 
                  formControlName="clientName"
                  placeholder="e.g. Julian & Sarah Sterling" 
                  class="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label for="jobClientPhone" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Client Phone Number *
                </label>
                <input 
                  id="jobClientPhone"
                  type="text" 
                  formControlName="clientPhone"
                  placeholder="+233 24 782 9011" 
                  class="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="jobClientEmail" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Client Email Address
                </label>
                <input 
                  id="jobClientEmail"
                  type="email" 
                  formControlName="clientEmail"
                  placeholder="client@example.com" 
                  class="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label for="jobSiteAddress" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>Site Location / Address / GPS *</span>
                  <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>GPS: {{ selectedSiteCoordinates().lat.toFixed(4) }}, {{ selectedSiteCoordinates().lng.toFixed(4) }}</span>
                  </span>
                </label>
                <div class="relative">
                  <input 
                    id="jobSiteAddress"
                    type="text" 
                    formControlName="siteAddress"
                    placeholder="Click map below to manually pin or type address / GPS" 
                    class="w-full text-xs pl-8 pr-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400 absolute left-2.5 top-2.5 pointer-events-none">location_on</mat-icon>
                </div>
              </div>
            </div>

            <!-- Downward Interactive OpenStreetMap Client Location Preview -->
            <div class="pt-1">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">map</mat-icon>
                  <span>Client Site Location Radar & GPS Pin</span>
                </span>
                <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800/80 flex items-center gap-1 shadow-2xs">
                  <mat-icon class="!text-[11px] !w-3 !h-3">touch_app</mat-icon>
                  <span>Click map or drag pin to auto-populate address</span>
                </span>
              </div>
              
              <app-client-location-map 
                [address]="jobForm.get('siteAddress')?.value || ''"
                (locationSelected)="onSiteLocationSelected($event)"
              />
            </div>

            <div>
              <label for="jobAccessInstructions" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Site Access Instructions & Security Gate Notes
              </label>
              <input 
                id="jobAccessInstructions"
                type="text" 
                formControlName="accessInstructions"
                placeholder="e.g. Security barrier pin 4892#, ground floor foyer entrance" 
                class="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <!-- ========================================================================= -->
          <!-- SECTION 3: SCHEDULE & FIELD INSTALLER DISPATCH                             -->
          <!-- ========================================================================= -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Schedule & Field Installer Dispatch
              </h4>
            </div>

            <div class="flex flex-nowrap items-end gap-3">
              <div class="shrink-0">
                <label for="jobScheduledDate" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 whitespace-nowrap">
                  Scheduled Installation Date *
                </label>
                <input 
                  id="jobScheduledDate"
                  type="date" 
                  formControlName="scheduledDate"
                  class="w-fit text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div class="shrink-0">
                <label for="jobEstimatedHours" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 whitespace-nowrap">
                  Est. Duration (Hours)
                </label>
                <input 
                  id="jobEstimatedHours"
                  type="number" 
                  step="0.5"
                  min="0.5"
                  formControlName="estimatedHours"
                  class="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div class="min-w-0 flex-1">
                <label for="jobShopBranch" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 whitespace-nowrap">
                  Dispatching Shop Branch *
                </label>
                <select 
                  #shopBranchSelect
                  id="jobShopBranch"
                  formControlName="shopBranch"
                  class="w-full max-w-fit text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium cursor-pointer truncate"
                >
                  <optgroup label="DoorMaster Branches">
                    @for (b of allBranches(); track b.branchCode) {
                      <option [value]="b.shopName" [selected]="jobForm.controls.shopBranch.value === b.shopName">
                        🏪 {{ b.shopName }} ({{ b.branchCode }})
                      </option>
                    }
                  </optgroup>
                  <optgroup label="DoorMaster Warehouses">
                    @for (w of allWarehouses(); track w.branchCode + w.shopName) {
                      <option [value]="w.shopName" [selected]="jobForm.controls.shopBranch.value === w.shopName">
                        🏭 {{ w.shopName }} ({{ w.branchCode }})
                      </option>
                    }
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          <!-- ========================================================================= -->
          <!-- SECTION 4: JOB FINANCIALS & ORDER SUMMARY (INSTALLATION FEE & LABOR ONLY)  -->
          <!-- ========================================================================= -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <h4 class="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Job Financials & Order Summary
                </h4>
              </div>
              <span class="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                Installation Fee & Labor Only (Excludes Door Price)
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <label for="jobInstallationFee" class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Installation Fee (₵) *
                </label>
                <input 
                  id="jobInstallationFee" 
                  type="number" 
                  min="0"
                  formControlName="installationFee" 
                  class="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold" 
                />
              </div>

              <div>
                <label for="jobLaborCost" class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Labor Cost (₵) *
                </label>
                <input 
                  id="jobLaborCost" 
                  type="number" 
                  min="0"
                  formControlName="laborCost" 
                  class="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold" 
                />
              </div>

              <div>
                <label for="jobPaymentMethod" class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Payment Method *
                </label>
                <select 
                  id="jobPaymentMethod"
                  formControlName="paymentMethod"
                  class="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium cursor-pointer"
                >
                  <option value="momo">MTN / Telecel MoMo</option>
                  <option value="cash">Counter Cash</option>
                  <option value="pos_card">POS Terminal (Card)</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Total (₵)
                </label>
                <div class="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                  ₵{{ ((+(jobForm.value.installationFee || 0)) + (+(jobForm.value.laborCost || 0))).toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          </div>

          <!-- Sticky Modal Footer -->
          <div class="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 z-10 shadow-lg">
            <div class="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
              <span class="font-bold text-slate-900 dark:text-white">{{ totalDoorsCount() }} Door(s)</span>
              <span>·</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-bold">
                ₵{{ ((+(jobForm.value.installationFee || 0)) + (+(jobForm.value.laborCost || 0))).toLocaleString() }} Installation & Labor
              </span>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button 
                type="button" 
                (click)="closed.emit()"
                class="flex-1 sm:flex-initial px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button 
                type="submit"
                [disabled]="jobForm.invalid || selectedDoors().length === 0"
                class="flex-1 sm:flex-initial px-5 py-2 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white disabled:opacity-50 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <mat-icon class="!text-sm !w-4 !h-4">check_circle</mat-icon>
                <span>Book & Dispatch ({{ totalDoorsCount() }} Doors)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class NewJobModal {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  closed = output<void>();

  readonly shopBranchSelectRef = viewChild<ElementRef<HTMLSelectElement>>('shopBranchSelect');

  // List of selected doors for this installation request (collapsed initially)
  readonly selectedDoors = signal<EditableDoorItem[]>([
    {
      id: `door_${Date.now()}_1`,
      doorCategory: 'Premium Villa Series',
      doorModel: 'AeroPivot 900 Architectural Entrance Door',
      dimensions: '2400mm × 1200mm × 55mm',
      finish: 'Smoked European Oak with Matt Black PVD',
      hardwareSpecs: 'FritsJurgens System M+ Pivot, 3-Point Magnetic Mortise Lock',
      lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
      unitPrice: 6200,
      quantity: 1,
      isExpanded: false
    }
  ]);

  readonly totalDoorsCount = computed(() => {
    return this.selectedDoors().reduce((acc, d) => acc + d.quantity, 0);
  });

  readonly allBranches = computed(() => this.store.branches());
  readonly allWarehouses = computed(() => this.store.allWarehouses());

  readonly defaultDispatchBranchName = computed(() => {
    const assigned = this.store.managerBranch() || this.store.userAssignedShop();
    if (assigned?.shopName) {
      return assigned.shopName;
    }
    return this.store.shopLocation().shopName;
  });

  readonly jobForm = new FormGroup({
    clientName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    clientPhone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    clientEmail: new FormControl('', { nonNullable: true }),
    siteAddress: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    accessInstructions: new FormControl('', { nonNullable: true }),
    scheduledDate: new FormControl(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
    estimatedHours: new FormControl(4, { nonNullable: true, validators: [Validators.required, Validators.min(0.5)] }),
    shopBranch: new FormControl(this.defaultDispatchBranchName(), { nonNullable: true }),
    installationFee: new FormControl(1200, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    laborCost: new FormControl(480, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    paymentMethod: new FormControl<'cash' | 'momo' | 'pos_card' | 'bank_transfer'>('momo', { nonNullable: true })
  });

  // Client site coordinates tracked from location map
  readonly selectedSiteCoordinates = signal<{ lat: number; lng: number }>({ lat: 5.6020, lng: -0.1870 });

  onSiteLocationSelected(loc: ClientLocationResult) {
    this.selectedSiteCoordinates.set({ lat: loc.lat, lng: loc.lng });
    if (loc.isExplicitUserAction) {
      this.jobForm.patchValue({ siteAddress: loc.address });
      this.jobForm.get('siteAddress')?.markAsDirty();
      this.jobForm.get('siteAddress')?.markAsTouched();
    }
  }

  private syncShopBranchControl(branchName: string) {
    if (!branchName || this.jobForm.controls.shopBranch.dirty) return;
    if (this.jobForm.controls.shopBranch.value !== branchName) {
      this.jobForm.controls.shopBranch.setValue(branchName, { emitEvent: false });
    }
    queueMicrotask(() => {
      const selectEl = this.shopBranchSelectRef()?.nativeElement;
      if (selectEl && !this.jobForm.controls.shopBranch.dirty && selectEl.value !== branchName) {
        selectEl.value = branchName;
      }
    });
  }

  constructor() {
    afterNextRender(() => {
      this.syncShopBranchControl(this.defaultDispatchBranchName());
    });

    effect(() => {
      this.allBranches();
      this.allWarehouses();
      const targetBranch = this.defaultDispatchBranchName();
      this.syncShopBranchControl(targetBranch);
    });

    const firstDoor = this.store.doors()[0];
    if (firstDoor) {
      this.selectedDoors.set([
        {
          id: `door_${Date.now()}_1`,
          catalogDoorId: firstDoor.id,
          doorCategory: firstDoor.category,
          doorModel: `${firstDoor.name} (${firstDoor.modelCode})`,
          dimensions: firstDoor.dimensions,
          finish: firstDoor.finish,
          hardwareSpecs: firstDoor.hardwareSpecs,
          lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
          unitPrice: firstDoor.unitPrice,
          quantity: 1,
          isExpanded: false
        }
      ]);
    }
  }

  toggleDoorDropdown(index: number) {
    this.selectedDoors.update(doors => {
      return doors.map((d, i) => i === index ? { ...d, isExpanded: !d.isExpanded } : d);
    });
  }

  addDoorFromCatalog(catalogDoorId?: string) {
    let newDoor: EditableDoorItem;
    const catDoor = catalogDoorId 
      ? this.store.doors().find(d => d.id === catalogDoorId) 
      : (this.store.doors().length > 0 ? this.store.doors()[0] : null);

    if (catDoor) {
      newDoor = {
        id: `door_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        catalogDoorId: catDoor.id,
        doorCategory: catDoor.category,
        doorModel: `${catDoor.name} (${catDoor.modelCode})`,
        dimensions: catDoor.dimensions,
        finish: catDoor.finish,
        hardwareSpecs: catDoor.hardwareSpecs,
        lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
        unitPrice: catDoor.unitPrice,
        quantity: 1,
        isExpanded: true
      };
    } else {
      newDoor = {
        id: `door_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        doorCategory: 'Turkey interior series',
        doorModel: 'Turkey interior DM001 Acoustic Interior Door',
        dimensions: '2100mm × 900mm × 45mm',
        finish: 'Walnut Natural Wood Grain',
        hardwareSpecs: 'Heavy-Duty Concealed Hinges & 3-Point Lockset',
        lockModel: 'Standard Mechanical Handle & Cylinder',
        unitPrice: 2850,
        quantity: 1,
        isExpanded: true
      };
    }

    this.selectedDoors.update(doors => [...doors, newDoor]);
  }

  removeDoor(index: number) {
    if (this.selectedDoors().length <= 1) return;
    this.selectedDoors.update(doors => doors.filter((_, i) => i !== index));
  }

  changeDoorQty(index: number, delta: number) {
    this.selectedDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        const newQty = Math.max(1, d.quantity + delta);
        return { ...d, quantity: newQty };
      });
    });
  }

  onDoorCatalogPick(index: number, event: Event) {
    const doorId = (event.target as HTMLSelectElement).value;
    if (!doorId) return;
    const catDoor = this.store.doors().find(d => d.id === doorId);
    if (!catDoor) return;

    this.selectedDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return {
          ...d,
          catalogDoorId: catDoor.id,
          doorCategory: catDoor.category,
          doorModel: `${catDoor.name} (${catDoor.modelCode})`,
          dimensions: catDoor.dimensions,
          finish: catDoor.finish,
          hardwareSpecs: catDoor.hardwareSpecs,
          unitPrice: catDoor.unitPrice
        };
      });
    });
  }

  handleCreateJob() {
    if (this.jobForm.invalid || this.selectedDoors().length === 0) {
      this.jobForm.markAllAsTouched();
      this.alert.toastWarning('Incomplete Job Details', 'Please select at least one door and complete the client details.');
      return;
    }

    const val = this.jobForm.getRawValue();
    const doors = this.selectedDoors();
    const primaryDoor = doors[0];

    // Summary title reflecting multiple door count
    const doorSummary = doors.length === 1 
      ? primaryDoor.doorModel 
      : `${doors.length} Doors (${doors.map(d => `${d.quantity > 1 ? d.quantity + 'x ' : ''}${d.doorModel.split(' ')[0]}`).join(', ')})`;

    const installationFee = Number(val.installationFee) || 0;
    const laborCost = Number(val.laborCost) || 0;
    const totalInstallAndLabor = installationFee + laborCost;
    const now = new Date().toISOString();
    const receiptRef = `SHP-REC-${Math.floor(10000 + Math.random() * 90000)}`;

    const createdJob = this.store.createJob({
      title: `${doorSummary} Installation - ${val.clientName}`,
      doorCategory: primaryDoor.doorCategory,
      doorModel: doors.map(d => `${d.quantity > 1 ? d.quantity + '× ' : ''}${d.doorModel}`).join('; '),
      doors: doors.map(d => ({
        id: d.id,
        doorModel: d.doorModel,
        doorCategory: d.doorCategory,
        dimensions: d.dimensions,
        finish: d.finish,
        hardwareSpecs: d.hardwareSpecs,
        lockModel: d.lockModel,
        unitPrice: d.unitPrice,
        quantity: d.quantity,
        catalogDoorId: d.catalogDoorId
      })),
      dimensions: primaryDoor.dimensions,
      finish: primaryDoor.finish,
      hardwareSpecs: primaryDoor.hardwareSpecs,
      lockModel: primaryDoor.lockModel,
      shopBranch: val.shopBranch || this.store.shopLocation().shopName,
      status: 'booked_at_shop',
      assignedInstallerId: null,
      assignedInstallerName: null,
      assignedInstallerIds: [],
      assignedInstallerNames: [],
      assignedInstallers: [],
      installerAssignmentStatus: 'pending',
      installerAutoAccepted: false,
      shopBooking: {
        bookedByShopManager: `${this.store.currentUser().name} (${this.store.currentUser().email})`,
        shopBranch: val.shopBranch || this.store.shopLocation().shopName,
        bookingTimestamp: now,
        lockModelRequested: primaryDoor.lockModel || 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
        amountPaidAtShop: totalInstallAndLabor,
        paymentMethod: val.paymentMethod,
        receiptNumber: receiptRef,
        paymentStatus: 'paid_in_full',
        accountantVerified: false
      },
      client: {
        id: `cli_${Date.now()}`,
        name: val.clientName,
        phone: val.clientPhone,
        email: val.clientEmail || `${val.clientName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@example.com`,
        siteAddress: val.siteAddress,
        coordinates: this.selectedSiteCoordinates(),
        accessInstructions: val.accessInstructions || 'Standard site access'
      },
      scheduledDate: val.scheduledDate,
      estimatedHours: val.estimatedHours,
      hardwareChecklist: [
        { id: 'step_1', label: 'Verify rough opening plumb, square & level tolerance (±1.5mm)', required: true, completed: false },
        { id: 'step_2', label: 'Mount FritsJurgens / pivot floor plate with structural anchors', required: true, completed: false },
        { id: 'step_3', label: 'Fit top ceiling pivot box with structural timber blocking', required: true, completed: false },
        { id: 'step_4', label: 'Hang architectural door slab and tune 3-axis alignment', required: true, completed: false },
        { id: 'step_5', label: 'Install multi-point magnetic mortise lockset & smart cylinder', required: true, completed: false },
        { id: 'step_6', label: 'Calibrate closing dampening speed & 90-degree hold-open pressure', required: true, completed: false },
        { id: 'step_7', label: 'Fit perimeter acoustic brush seals & drop-down draught excluder', required: true, completed: false }
      ],
      financials: {
        doorPrice: 0,
        installationFee,
        laborCost,
        bonusAmount: 220,
        bonusStatus: 'pending',
        depositPaid: true,
        balancePaid: true
      }
    });

    this.alert.success(
      'Installation Booked!',
      `Job #${createdJob.id} booked for ${val.clientName} (₵${totalInstallAndLabor.toLocaleString()} Installation & Labor). Routed to Operations Manager for team assignment.`
    );
    this.closed.emit();
  }
}
