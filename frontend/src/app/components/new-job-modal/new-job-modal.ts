import { 
  ChangeDetectionStrategy, 
  Component, 
  computed, 
  inject, 
  output, 
  signal 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AssignedInstallerTeamMember, DoorCategory, InstallerTeam, JobDoorItem } from '../../models/installation.model';

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
                  Shop Manager Desk
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
                  Selected Doors for Installation ({{ totalDoorsCount() }} Total Units)
                </h4>
              </div>

              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  Doors Total: ₵{{ totalDoorsPrice().toLocaleString() }}
                </span>
                <button 
                  type="button" 
                  (click)="addDoorFromCatalog()"
                  class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                >
                  <mat-icon class="!text-xs !w-3.5 !h-3.5">add</mat-icon>
                  <span>+ Add Door</span>
                </button>
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

                      <!-- Door Category & Model Title -->
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div class="flex items-center justify-between mb-1">
                            <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                              Door Category
                            </label>
                            <span class="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 px-1.5 py-0.5 rounded shadow-2xs">
                              <mat-icon class="!text-[11px] !w-3 !h-3">auto_awesome</mat-icon>
                              <span>Auto-Selected</span>
                            </span>
                          </div>
                          <select 
                            [ngModel]="door.doorCategory"
                            (ngModelChange)="updateDoorField(i, 'doorCategory', $event)"
                            [ngModelOptions]="{standalone: true}"
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium cursor-pointer"
                          >
                            @for (cat of getCategoryList(door.doorCategory); track cat) {
                              <option [value]="cat">{{ cat }}</option>
                            }
                          </select>
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Door Model Title
                          </label>
                          <input 
                            type="text"
                            [ngModel]="door.doorModel"
                            (ngModelChange)="onDoorModelInputChange(i, $event)"
                            [ngModelOptions]="{standalone: true}"
                            placeholder="e.g. AeroPivot 900 Walnut & Anodized Steel" 
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <!-- Dimensions & Finish -->
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Dimensions (H × W × D)
                          </label>
                          <input 
                            type="text"
                            [ngModel]="door.dimensions"
                            (ngModelChange)="updateDoorField(i, 'dimensions', $event)"
                            [ngModelOptions]="{standalone: true}"
                            placeholder="e.g. 2400mm × 1200mm × 55mm" 
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Architectural Finish
                          </label>
                          <input 
                            type="text"
                            [ngModel]="door.finish"
                            (ngModelChange)="updateDoorField(i, 'finish', $event)"
                            [ngModelOptions]="{standalone: true}"
                            placeholder="e.g. Smoked European Oak with Matt Black PVD" 
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <!-- Hardware & Mortise Specifications & Optional Lock -->
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Hardware & Mortise Specifications
                          </label>
                          <input 
                            type="text"
                            [ngModel]="door.hardwareSpecs"
                            (ngModelChange)="updateDoorField(i, 'hardwareSpecs', $event)"
                            [ngModelOptions]="{standalone: true}"
                            placeholder="e.g. FritsJurgens System M+ Pivot, 3-Point Magnetic Mortise Lock" 
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Smart Lock / Handle
                          </label>
                          <select 
                            [ngModel]="door.lockModel"
                            (ngModelChange)="updateDoorField(i, 'lockModel', $event)"
                            [ngModelOptions]="{standalone: true}"
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                          >
                            <option value="Doormaster Smart Lock Handle F35 (Biometric & RFID)">Doormaster Smart Lock Handle F35 (Biometric & RFID)</option>
                            <option value="Doormaster High-Security Italian Mortise Lock">Doormaster High-Security Italian Mortise Lock</option>
                            <option value="Doormaster Keypad Digital Smart Cylinder">Doormaster Keypad Digital Smart Cylinder</option>
                            <option value="Heavy-Duty Multi-Point Deadbolt System">Heavy-Duty Multi-Point Deadbolt System</option>
                            <option value="Standard Mechanical Handle & Cylinder">Standard Mechanical Handle & Cylinder</option>
                          </select>
                        </div>
                      </div>

                      <!-- Unit Price and Quantity for this Door Item -->
                      <div class="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Unit Price (₵)
                          </label>
                          <input 
                            type="number"
                            [ngModel]="door.unitPrice"
                            (ngModelChange)="updateDoorField(i, 'unitPrice', +$event)"
                            [ngModelOptions]="{standalone: true}"
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
                          />
                        </div>

                        <div>
                          <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Unit Quantity
                          </label>
                          <input 
                            type="number"
                            min="1"
                            [ngModel]="door.quantity"
                            (ngModelChange)="updateDoorField(i, 'quantity', Math.max(1, +$event))"
                            [ngModelOptions]="{standalone: true}"
                            class="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
                          />
                        </div>
                      </div>

                    </div>
                  }
                </div>
              }
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
          <!-- SECTION 3: SCHEDULE & INSTALLER DISPATCH                                  -->
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

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label for="jobScheduledDate" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Scheduled Installation Date *
                </label>
                <input 
                  id="jobScheduledDate"
                  type="date" 
                  formControlName="scheduledDate"
                  class="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label for="jobEstimatedHours" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Est. Duration (Hours)
                </label>
                <input 
                  id="jobEstimatedHours"
                  type="number" 
                  step="0.5"
                  formControlName="estimatedHours"
                  class="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label for="jobShopBranch" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Dispatching Shop Branch *
                </label>
                <select 
                  id="jobShopBranch"
                  formControlName="shopBranch"
                  class="w-full text-xs px-2.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium cursor-pointer"
                >
                  @for (b of store.branches(); track b.branchCode) {
                    <option [value]="b.shopName">
                      🏪 {{ b.shopName.replace('DoorMaster ', '') }} ({{ b.branchCode }})
                    </option>
                  }
                </select>
              </div>
            </div>

            <!-- Multi-Installer Team Selection (Shop Manager & Operations Manager) -->
            @if (store.currentRole() === 'shop_manager' || store.currentRole() === 'manager' || store.currentRoleDefinition().permissions.canAssignInstallers) {
              <div class="space-y-2 pt-1">
                <div class="flex items-center justify-between">
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <mat-icon class="!text-sm text-emerald-600">group</mat-icon>
                    <span>Assign Installation Team (Lead + Assistants)</span>
                  </label>
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded-full"
                    [class]="selectedInstallerIds().length > 0 ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500'">
                    @if (selectedInstallerIds().length > 0) {
                      {{ selectedInstallerIds().length }} selected · 10-Min Review Dispatched
                    } @else {
                      Unassigned (Shop Manager Assigns)
                    }
                  </span>
                </div>

                <!-- Quick Team Assignment Buttons (Team Alpha / Team Bravo with Team Leads) -->
                <div class="flex items-center gap-2 flex-wrap pb-1">
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Team:</span>
                  @for (team of store.installerTeams(); track team.id) {
                    <button
                      type="button"
                      (click)="assignTeam(team)"
                      class="px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer"
                      [class]="isTeamFullySelected(team) 
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300'"
                    >
                      <mat-icon class="!text-xs !w-3 !h-3">group</mat-icon>
                      <span>{{ team.code }}: {{ team.name.split(' - ')[0] }} (3 Techs)</span>
                      <span class="text-[9px] opacity-80 font-mono">· Lead: {{ team.leadName.split(' ')[0] }}</span>
                    </button>
                  }
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                  @for (installer of store.installers(); track installer.id) {
                    <div 
                      role="button"
                      tabindex="0"
                      (click)="toggleInstaller(installer.id)"
                      (keydown.enter)="toggleInstaller(installer.id)"
                      (keydown.space)="$event.preventDefault(); toggleInstaller(installer.id)"
                      class="p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2"
                      [class]="isInstallerSelected(installer.id) ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-600' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750'"
                    >
                      <div class="flex items-center gap-2 min-w-0">
                        <div class="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0">
                          {{ installer.name.charAt(0) }}
                        </div>
                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="font-bold text-xs text-slate-900 dark:text-white truncate">{{ installer.name }}</span>
                            @if (installer.teamName) {
                              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded"
                                [class]="installer.teamId === 'team-alpha' 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' 
                                  : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'">
                                {{ installer.teamId === 'team-alpha' ? 'Alpha' : 'Bravo' }} {{ installer.isTeamLead ? '★ Lead' : '' }}
                              </span>
                            }
                            @if (isInstallerSelected(installer.id)) {
                              <span class="text-[9px] font-black px-1.5 py-0.2 rounded uppercase"
                                [class]="selectedInstallerIds()[0] === installer.id ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'">
                                {{ selectedInstallerIds()[0] === installer.id ? 'Assigned Lead' : 'Asst.' }}
                              </span>
                            }
                          </div>
                          <span class="text-[10px] text-slate-500 dark:text-slate-400">
                            ★{{ installer.metrics.avgRating }} · {{ installer.isSignedIn ? 'Online' : 'Offline' }}
                          </span>
                        </div>
                      </div>

                      <input 
                        type="checkbox"
                        [checked]="isInstallerSelected(installer.id)"
                        (click)="$event.stopPropagation()"
                        (change)="toggleInstaller(installer.id)"
                        class="w-4 h-4 text-emerald-600 rounded border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
                      />
                    </div>
                  }
                </div>
              </div>
            } @else {
              <!-- Restricted notice for Shop Manager -->
              <div class="p-3.5 bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl text-xs space-y-1.5">
                <div class="flex items-center gap-2 font-extrabold text-amber-900 dark:text-amber-200">
                  <mat-icon class="!text-base text-amber-600 dark:text-amber-400">lock</mat-icon>
                  <span>Technician Assignment Governed by Operations Manager</span>
                </div>
                <p class="text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                  Shop Managers are restricted from assigning installers. This installation job will be booked and routed to the Operations Governance queue as <strong>Shop Booked</strong> for technician dispatch.
                </p>
              </div>
            }
          </div>

          <!-- ========================================================================= -->
          <!-- SECTION 4: FINANCIALS & ORDER SUMMARY                                     -->
          <!-- ========================================================================= -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Job Financials & Order Summary
              </h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Total Doors Price (₵)
                </label>
                <div class="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                  ₵{{ totalDoorsPrice().toLocaleString() }}
                </div>
              </div>

              <div>
                <label for="jobInstallationFee" class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Installation Fee (₵) *
                </label>
                <input 
                  id="jobInstallationFee" 
                  type="number" 
                  formControlName="installationFee" 
                  class="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold" 
                />
              </div>

              <div>
                <label for="jobLaborCost" class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Est. Tech Labor (₵)
                </label>
                <input 
                  id="jobLaborCost" 
                  type="number" 
                  formControlName="laborCost" 
                  class="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold" 
                />
              </div>

              <div>
                <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Grand Total (₵)
                </label>
                <div class="text-sm font-black font-mono text-slate-900 dark:text-white pt-1">
                  ₵{{ (totalDoorsPrice() + (jobForm.value.installationFee || 0)).toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          </div>

          <!-- Sticky Modal Footer -->
          <div class="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 z-10 shadow-lg">
            <div class="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
              <span class="font-bold text-slate-900 dark:text-white">{{ totalDoorsCount() }} Doors</span>
              <span>·</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-bold">
                ₵{{ (totalDoorsPrice() + (jobForm.value.installationFee || 0)).toLocaleString() }} Total
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

  // List of selected doors for this installation request
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
      isExpanded: true
    }
  ]);

  readonly totalDoorsPrice = computed(() => {
    return this.selectedDoors().reduce((acc, d) => acc + (d.unitPrice * d.quantity), 0);
  });

  readonly totalDoorsCount = computed(() => {
    return this.selectedDoors().reduce((acc, d) => acc + d.quantity, 0);
  });

  readonly Math = Math;

  readonly jobForm = new FormGroup({
    clientName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    clientPhone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    clientEmail: new FormControl('', { nonNullable: true }),
    siteAddress: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    accessInstructions: new FormControl('', { nonNullable: true }),
    scheduledDate: new FormControl(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
    estimatedHours: new FormControl(4, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    shopBranch: new FormControl(this.store.shopLocation().shopName, { nonNullable: true }),
    installationFee: new FormControl(1200, { nonNullable: true, validators: [Validators.required] }),
    laborCost: new FormControl(480, { nonNullable: true, validators: [Validators.required] })
  });

  readonly selectedInstallerIds = signal<string[]>([]);

  toggleInstaller(installerId: string) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Restricted Action', 'Your role is not authorized to assign installation technicians.');
      return;
    }
    this.selectedInstallerIds.update(ids => {
      if (ids.includes(installerId)) {
        return ids.filter(id => id !== installerId);
      }
      return [...ids, installerId];
    });
  }

  isInstallerSelected(installerId: string): boolean {
    return this.selectedInstallerIds().includes(installerId);
  }

  assignTeam(team: InstallerTeam) {
    if (!this.store.currentRoleDefinition().permissions.canAssignInstallers && this.store.currentRole() !== 'shop_manager' && this.store.currentRole() !== 'manager') {
      this.alert.warning('Restricted Action', 'Your role is not authorized to assign installation technicians.');
      return;
    }
    // Put team lead first, then other members
    const ids = [team.leadId, ...team.memberIds.filter(id => id !== team.leadId)];
    this.selectedInstallerIds.set(ids);
    this.alert.toastInfo('Team Selected', `${team.name} (${ids.length} Technicians, Lead: ${team.leadName}) selected for this installation.`);
  }

  isTeamFullySelected(team: InstallerTeam): boolean {
    return team.memberIds.length > 0 && team.memberIds.every(id => this.selectedInstallerIds().includes(id));
  }

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

  constructor() {
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
          isExpanded: true
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

  // Dynamic list of categories from scraped catalog & standards
  readonly categoryOptions = computed(() => {
    const dbCats = this.store.availableCategories().map(c => c.name);
    const doorCats = this.store.doors().map(d => d.category);
    const standardCats = [
      'Premium Villa Series',
      'Royal Series',
      'Smart Lock Doors',
      'Turkey interior series',
      'DM Interior Series',
      'Economy doors',
      'Antifade doors',
      'Mechanical Lock Doors',
      'DM Smart Lock Handle',
      'Reeded glass doors',
      'Architectural Entrance Pivot Door',
      'Solid Hardwood Double Entrance',
      'Acoustic Glazed Bi-Fold Patio Suite',
      'FD30 / FD60 Commercial Fire Door',
      'Concealed Cavity Pocket Sliding Door',
      'Frameless Glass Pivot Door'
    ];
    const set = new Set<string>();
    [...dbCats, ...doorCats, ...standardCats].forEach(c => {
      if (c && c.trim()) set.add(c.trim());
    });
    return Array.from(set);
  });

  getCategoryList(currentCat?: string): string[] {
    const list = [...this.categoryOptions()];
    if (currentCat && !list.includes(currentCat)) {
      list.unshift(currentCat);
    }
    return list;
  }

  inferCategoryFromModel(title: string): string | null {
    if (!title) return null;
    const trimmed = title.trim().toLowerCase();

    // 1. Direct match with catalog doors in store
    const matchedDoor = this.store.doors().find(d => 
      d.name.toLowerCase() === trimmed || 
      (d.modelCode && trimmed.includes(d.modelCode.toLowerCase())) ||
      trimmed.includes(d.name.toLowerCase())
    );
    if (matchedDoor && matchedDoor.category) {
      return matchedDoor.category;
    }

    // 2. Keyword pattern matching for known lines
    if (trimmed.includes('turkey')) return 'Turkey interior series';
    if (trimmed.includes('antifade') || trimmed.includes('anti-fade') || trimmed.includes('antirust')) return 'Antifade doors';
    if (trimmed.includes('villa') || trimmed.includes('aeropivot')) return 'Premium Villa Series';
    if (trimmed.includes('royal')) return 'Royal Series';
    if (trimmed.includes('smart lock handle') || trimmed.includes('lock handle') || trimmed.includes('f35') || trimmed.includes('f15') || trimmed.includes('f20')) return 'DM Smart Lock Handle';
    if (trimmed.includes('smart lock') || trimmed.includes('biometric') || trimmed.includes('digital lock')) return 'Smart Lock Doors';
    if (trimmed.includes('mechanical') || trimmed.includes('dm-l')) return 'Mechanical Lock Doors';
    if (trimmed.includes('reeded') || trimmed.includes('fluted')) return 'Reeded glass doors';
    if (trimmed.includes('economy') || trimmed.includes('china') || trimmed.includes('g805')) return 'Economy doors';
    if (trimmed.includes('interior')) return 'DM Interior Series';
    if (trimmed.includes('pivot')) return 'Architectural Entrance Pivot Door';
    if (trimmed.includes('wood') || trimmed.includes('hardwood') || trimmed.includes('timber')) return 'Solid Hardwood Double Entrance';
    if (trimmed.includes('bi-fold') || trimmed.includes('bifold') || trimmed.includes('patio')) return 'Acoustic Glazed Bi-Fold Patio Suite';
    if (trimmed.includes('fire') || trimmed.includes('fd30') || trimmed.includes('fd60')) return 'FD30 / FD60 Commercial Fire Door';
    if (trimmed.includes('pocket') || trimmed.includes('sliding') || trimmed.includes('cavity')) return 'Concealed Cavity Pocket Sliding Door';
    if (trimmed.includes('frameless')) return 'Frameless Glass Pivot Door';

    return null;
  }

  onDoorModelInputChange(index: number, newTitle: string) {
    const inferred = this.inferCategoryFromModel(newTitle);
    this.selectedDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return {
          ...d,
          doorModel: newTitle,
          doorCategory: inferred || d.doorCategory
        };
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

    this.alert.toastSuccess('Door Preset Applied', `Category auto-selected: ${catDoor.category}`);
  }

  updateDoorField(index: number, field: keyof JobDoorItem, value: any) {
    this.selectedDoors.update(doors => {
      return doors.map((d, i) => {
        if (i !== index) return d;
        return { ...d, [field]: value };
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
    const canAssign = this.store.currentRole() === 'shop_manager' || this.store.currentRole() === 'manager' || this.store.currentRoleDefinition().permissions.canAssignInstallers;
    const installerIds = canAssign ? this.selectedInstallerIds() : [];
    const selectedTechs = this.store.installers().filter(i => installerIds.includes(i.id));
    const leadTech = selectedTechs[0];
    const techNames = selectedTechs.map(t => t.name).join(', ');
    const teamMembers: AssignedInstallerTeamMember[] = selectedTechs.map((t, idx) => ({
      id: t.id,
      name: t.name,
      phone: t.phone,
      role: idx === 0 ? 'lead' : 'assistant',
      avgRating: t.metrics.avgRating
    }));

    // Summary title reflecting multiple door count
    const doorSummary = doors.length === 1 
      ? primaryDoor.doorModel 
      : `${doors.length} Doors (${doors.map(d => `${d.quantity > 1 ? d.quantity + 'x ' : ''}${d.doorModel.split(' ')[0]}`).join(', ')})`;

    const totalPrice = this.totalDoorsPrice();
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();

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
      status: (canAssign && selectedTechs.length > 0) ? 'assigned' : 'booked_at_shop',
      assignedInstallerId: canAssign && leadTech ? leadTech.id : null,
      assignedInstallerName: canAssign ? (techNames || null) : null,
      assignedInstallerIds: canAssign ? installerIds : [],
      assignedInstallerNames: canAssign ? selectedTechs.map(t => t.name) : [],
      assignedInstallers: canAssign ? teamMembers : [],
      installerAssignmentStatus: (canAssign && selectedTechs.length > 0) ? 'pending' : undefined,
      installerAssignedAt: (canAssign && selectedTechs.length > 0) ? now : undefined,
      installerDeadlineAt: (canAssign && selectedTechs.length > 0) ? deadline : undefined,
      installerAutoAccepted: false,
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
        { id: 'step_3', label: 'Fit top ceiling pivot pivot box with structural timber blocking', required: true, completed: false },
        { id: 'step_4', label: 'Hang architectural door slab and tune 3-axis alignment', required: true, completed: false },
        { id: 'step_5', label: 'Install multi-point magnetic mortise lockset & smart cylinder', required: true, completed: false },
        { id: 'step_6', label: 'Calibrate closing dampening speed & 90-degree hold-open pressure', required: true, completed: false },
        { id: 'step_7', label: 'Fit perimeter acoustic brush seals & drop-down draught excluder', required: true, completed: false }
      ],
      financials: {
        doorPrice: totalPrice,
        installationFee: val.installationFee,
        laborCost: val.laborCost,
        bonusAmount: 220,
        bonusStatus: 'pending',
        depositPaid: true,
        balancePaid: false
      }
    });

    this.alert.success('Installation Booked!', `Job #${createdJob.id} has been registered and scheduled for ${val.clientName}.`);
    this.closed.emit();
  }
}
