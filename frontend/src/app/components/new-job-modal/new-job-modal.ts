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
import { PhoneInputComponent } from '../phone-input/phone-input';

export interface InstallationRateVariant {
  label: string;
  keyword: string;
  price: number;
}

export interface InstallationRateOption {
  series: string;
  variants: InstallationRateVariant[];
}

export const INSTALLATION_RATE_OPTIONS: InstallationRateOption[] = [
  {
    series: 'Turkey Doors',
    variants: [
      { label: 'Pivot — ₵700', keyword: 'Turkey Pivot', price: 700 },
      { label: '2x (Double) — ₵550', keyword: 'Turkey 2x', price: 550 },
      { label: 'OH (One & Half) — ₵450', keyword: 'Turkey OH', price: 450 },
      { label: 'Sin (Single) — ₵350', keyword: 'Turkey Single', price: 350 },
      { label: 'Turkey Interior — ₵250', keyword: 'Turkey interior', price: 250 }
    ]
  },
  {
    series: 'Economy',
    variants: [
      { label: '2x (Double) — ₵350', keyword: 'Economy 2x', price: 350 },
      { label: 'OH (One & Half) — ₵250', keyword: 'Economy OH', price: 250 },
      { label: 'Sin (Single) — ₵200', keyword: 'Economy Single', price: 200 }
    ]
  },
  {
    series: 'Glass / Wooden Metal',
    variants: [
      { label: 'Standard — ₵200', keyword: 'Glass Wooden Metal', price: 200 }
    ]
  },
  {
    series: 'Door-in-Door',
    variants: [
      { label: 'Single — ₵450', keyword: 'Door-in-Door Single', price: 450 },
      { label: 'OH (One & Half) — ₵550', keyword: 'Door-in-Door OH', price: 550 },
      { label: 'Double — ₵650', keyword: 'Door-in-Door Double', price: 650 }
    ]
  },
  {
    series: 'Royal Series',
    variants: [
      { label: 'Double with Pillars — ₵2,000', keyword: 'Royal Double with pillars', price: 2000 },
      { label: 'Economic Double — ₵1,500', keyword: 'Royal Economic double', price: 1500 },
      { label: 'One & Half — ₵500', keyword: 'Royal One & Half', price: 500 },
      { label: 'Single — ₵400', keyword: 'Royal Single', price: 400 }
    ]
  },
  {
    series: 'Special Series',
    variants: [
      { label: 'Single — ₵400', keyword: 'Special Series Single', price: 400 },
      { label: 'One and Half — ₵500', keyword: 'Special Series One and Half', price: 500 },
      { label: 'Double — ₵600', keyword: 'Special Series Double', price: 600 }
    ]
  },
  {
    series: 'DM Interior',
    variants: [
      { label: 'Standard — ₵250', keyword: 'DM Interior', price: 250 }
    ]
  }
];

export function computeDefaultInstallationPrice(name: string, category: string): number {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();
  const text = `${c} ${n}`;

  if (text.includes('dm interior') || text.includes('doormaster interior') || text.includes('turkey interior')) {
    return 250;
  }
  if (text.includes('royal') || text.includes('villa')) {
    if (text.includes('pillar')) return 2000;
    if (text.includes('economic') || text.includes('double') || text.includes('2x')) return 1500;
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) return 500;
    if (text.includes('single') || /\bsin\b/.test(text)) return 400;
    return 1500;
  }
  if (text.includes('special series') || text.includes('special')) {
    if (text.includes('double') || text.includes('2x')) return 600;
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) return 500;
    if (text.includes('single') || /\bsin\b/.test(text)) return 400;
    return 500;
  }
  if (text.includes('door-in-door') || text.includes('door in door')) {
    if (text.includes('double') || text.includes('2x')) return 650;
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return 550;
    if (text.includes('single') || /\bsin\b/.test(text)) return 450;
    return 450;
  }
  if (text.includes('economy') || text.includes('china')) {
    if (text.includes('lock')) return 100;
    if (text.includes('2x') || text.includes('double')) return 350;
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return 250;
    if (text.includes('single') || /\bsin\b/.test(text)) return 200;
    return 200;
  }
  if (text.includes('glass') || text.includes('wooden metal') || text.includes('wooden finish')) {
    return 200;
  }
  if (c.includes('lock') || (n.includes('lock') && !text.includes('door'))) {
    return text.includes('economy') ? 100 : 150;
  }
  if (
    text.includes('turkey') ||
    text.includes('alucobond') ||
    text.includes('laminox') ||
    text.includes('full metal') ||
    text.includes('pvc') ||
    text.includes('cement board') ||
    text.includes('antifade')
  ) {
    if (text.includes('pivot')) return 700;
    if (text.includes('2x') || text.includes('double')) return 550;
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return 450;
    if (text.includes('lock')) return 150;
    if (text.includes('single') || /\bsin\b/.test(text)) return 350;
    return 350;
  }
  return 250;
}

export function inferInstallationOption(
  name: string,
  category: string
): { series: string; variant: string; price: number } | null {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();
  const text = `${c} ${n}`;
  const price = computeDefaultInstallationPrice(name, category);

  if (text.includes('dm interior') || text.includes('doormaster interior')) {
    return { series: 'DM Interior', variant: 'DM Interior', price };
  }
  if (text.includes('turkey interior')) {
    return { series: 'Turkey Doors', variant: 'Turkey interior', price };
  }
  if (text.includes('royal') || text.includes('villa')) {
    if (text.includes('pillar')) return { series: 'Royal Series', variant: 'Royal Double with pillars', price };
    if (text.includes('economic') || text.includes('double') || text.includes('2x')) {
      return { series: 'Royal Series', variant: 'Royal Economic double', price };
    }
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) {
      return { series: 'Royal Series', variant: 'Royal One & Half', price };
    }
    return { series: 'Royal Series', variant: 'Royal Single', price };
  }
  if (text.includes('special series') || text.includes('special')) {
    if (text.includes('double') || text.includes('2x')) return { series: 'Special Series', variant: 'Special Series Double', price };
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) {
      return { series: 'Special Series', variant: 'Special Series One and Half', price };
    }
    return { series: 'Special Series', variant: 'Special Series Single', price };
  }
  if (text.includes('door-in-door') || text.includes('door in door')) {
    if (text.includes('double') || text.includes('2x')) return { series: 'Door-in-Door', variant: 'Door-in-Door Double', price };
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) {
      return { series: 'Door-in-Door', variant: 'Door-in-Door OH', price };
    }
    return { series: 'Door-in-Door', variant: 'Door-in-Door Single', price };
  }
  if (text.includes('economy') || text.includes('china')) {
    if (text.includes('lock')) return { series: 'Economy', variant: 'Economy Lock', price };
    if (text.includes('2x') || text.includes('double')) return { series: 'Economy', variant: 'Economy 2x', price };
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) {
      return { series: 'Economy', variant: 'Economy OH', price };
    }
    return { series: 'Economy', variant: 'Economy Single', price };
  }
  if (text.includes('glass') || text.includes('wooden metal') || text.includes('wooden finish')) {
    return { series: 'Glass / Wooden Metal', variant: 'Glass Wooden Metal', price };
  }
  if (c.includes('lock') || (n.includes('lock') && !text.includes('door'))) {
    return text.includes('economy')
      ? { series: 'Economy', variant: 'Economy Lock', price }
      : { series: 'Turkey Doors', variant: 'Turkey Lock', price };
  }
  if (
    text.includes('turkey') ||
    text.includes('alucobond') ||
    text.includes('laminox') ||
    text.includes('full metal') ||
    text.includes('pvc') ||
    text.includes('cement board') ||
    text.includes('antifade')
  ) {
    if (text.includes('pivot')) return { series: 'Turkey Doors', variant: 'Turkey Pivot', price };
    if (text.includes('2x') || text.includes('double')) return { series: 'Turkey Doors', variant: 'Turkey 2x', price };
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) {
      return { series: 'Turkey Doors', variant: 'Turkey OH', price };
    }
    return { series: 'Turkey Doors', variant: 'Turkey Single', price };
  }

  return null;
}

export interface EditableDoorItem extends JobDoorItem {
  isExpanded: boolean;
  installationPrice?: number;
  installationSeries?: string;
  installationVariant?: string;
  includeLockExtra?: boolean;
}

@Component({
  selector: 'app-new-job-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, ClientLocationMap, PhoneInputComponent],
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
                      
                      <!-- Merged Door Selection & Installation Rate Card -->
                      <div class="p-3 bg-teal-50/40 dark:bg-teal-950/20 rounded-xl border border-teal-200/70 dark:border-teal-800/60 space-y-2.5">
                        <div class="flex items-center justify-between gap-2">
                          <label class="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                            <mat-icon class="!text-xs">tune</mat-icon>
                            <span>Installation Type / Rate Option (Optional)</span>
                          </label>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                              Door Series (Optional)
                            </label>
                            <select
                              [value]="door.installationSeries || ''"
                              (change)="onInstallationSeriesChange(i, $event)"
                              class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-lg text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500"
                            >
                              <option value="">Auto (Please Select Door)</option>
                              @for (opt of installationRateOptions; track opt.series) {
                                <option [value]="opt.series">{{ opt.series }}</option>
                              }
                            </select>
                          </div>

                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                              Door Configuration / Variant (Optional)
                            </label>
                            <select
                              [value]="door.installationVariant || ''"
                              (change)="onInstallationVariantChange(i, $event)"
                              class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-lg text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500"
                            >
                              <option value="">-- Select configuration --</option>
                              @for (v of getVariantsForSeries(door.installationSeries); track v.keyword) {
                                <option [value]="v.keyword">{{ v.label }}</option>
                              }
                            </select>
                          </div>

                          <div>
                            <div class="flex items-center justify-between mb-1">
                              <label class="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Preset Model Template
                              </label>
                              <span class="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                                Auto-syncs specs
                              </span>
                            </div>
                            <select 
                              (change)="onDoorCatalogPick(i, $event)"
                              class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                            >
                              <option value="">-- Select catalog template --</option>
                              @for (catDoor of getFilteredCatalogDoors(door); track catDoor.id) {
                                <option [value]="catDoor.id" [selected]="catDoor.id === door.catalogDoorId">
                                  {{ catDoor.name }} ({{ catDoor.modelCode }})@if (store.canViewDoorPrices()) { - {{ catDoor.formattedPrice || ('₵' + catDoor.unitPrice) }}} • {{ catDoor.category }}
                                </option>
                              }
                            </select>
                          </div>

                          <div>
                            <div class="flex items-center justify-between mb-1">
                              <label class="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Door Category
                              </label>
                              <span class="text-[9px] font-semibold text-teal-600 dark:text-teal-400">
                                Syncs Install Type
                              </span>
                            </div>
                            <select
                              [value]="door.doorCategory"
                              (change)="onDoorCategoryChange(i, $event)"
                              class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                            >
                              <option value="">-- All Categories --</option>
                              @for (cat of getDoorCategoriesForItem(door.doorCategory); track cat) {
                                <option [value]="cat">{{ cat }}</option>
                              }
                            </select>
                          </div>
                        </div>

                        <!-- Quick Variant Pills -->
                        <div class="flex flex-wrap gap-1.5 pt-0.5">
                          @for (v of getVariantsForSeries(door.installationSeries); track v.keyword) {
                            <button
                              type="button"
                              (click)="selectInstallationVariant(i, v.keyword, door.installationSeries)"
                              class="px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer"
                              [class]="door.installationVariant === v.keyword
                                ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'"
                            >
                              {{ v.label }}
                            </button>
                          }
                        </div>

                        <!-- Extra Lock Add-on -->
                        <label class="flex items-center justify-between gap-2 pt-2 mt-1 border-t border-teal-200/60 dark:border-teal-800/50 cursor-pointer select-none">
                          <span class="flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                            <input
                              type="checkbox"
                              [checked]="!!door.includeLockExtra"
                              (change)="toggleLockExtra(i)"
                              class="w-3.5 h-3.5 rounded border-teal-300 dark:border-teal-700 text-teal-600 focus:ring-teal-500 cursor-pointer"
                            />
                            <span>Extra: Lock Installation (Add-on)</span>
                          </span>
                          <span class="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300">
                            +₵{{ getLockExtraPrice(door) }} / door
                          </span>
                        </label>
                      </div>

                      <!-- Read-Only Door Information (Flat Summary) -->
                      <div class="pt-1 space-y-2">
                        <div class="flex items-center justify-between gap-2">
                          <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                            Door Specifications
                          </span>
                          <span class="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">
                            <mat-icon class="!text-[11px] !w-3 !h-3">lock</mat-icon>
                            <span>Read-Only</span>
                          </span>
                        </div>

                        <div class="flex flex-wrap gap-1.5 text-[11px]">
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold">
                            <span class="text-slate-400">Category:</span> {{ door.doorCategory }}
                          </span>
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono">
                            <span class="text-slate-400 font-sans">Size:</span> {{ door.dimensions }}
                          </span>
                          @if (store.canViewDoorPrices()) {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                              <span class="text-slate-400">Catalog Price:</span> <strong class="font-mono">₵{{ door.unitPrice.toLocaleString() }}</strong>
                            </span>
                          }
                        </div>

                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          <span class="font-semibold text-slate-800 dark:text-slate-100">{{ door.doorModel }}</span>
                          · Finish: {{ door.finish }}
                          · Hardware: {{ door.hardwareSpecs }}
                          · Lock: {{ door.lockModel || 'Doormaster Smart Lock Handle F35 (Biometric & RFID)' }}
                        </p>
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
                <app-phone-input 
                  id="jobClientPhone"
                  formControlName="clientPhone"
                  placeholder="24 782 9011" 
                ></app-phone-input>
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
                    placeholder="e.g. GA-183-9340, GD-018-5574, or type address / click map" 
                    class="w-full text-xs pl-8 pr-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400 absolute left-2.5 top-2.5 pointer-events-none">location_on</mat-icon>
                </div>
                @if (detectedGhanaPostCode(); as gpCode) {
                  <div class="mt-1 flex items-center justify-between text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800 animate-in fade-in">
                    <span class="flex items-center gap-1 font-mono font-bold">
                      <span class="text-xs">🇬🇭</span>
                      <span>Ghana Post GPS: {{ gpCode }}</span>
                    </span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-semibold text-[9px] flex items-center gap-0.5">
                      <mat-icon class="!text-[11px] !w-3 !h-3">verified</mat-icon>
                      <span>Resolved & Pinned</span>
                    </span>
                  </div>
                }
              </div>
            </div>

            <!-- Downward Interactive OpenStreetMap Client Location Preview -->
            <div class="pt-1">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">map</mat-icon>
                  <span>Client Site Location Radar & Ghana Post GPS Pin</span>
                </span>
                <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800/80 flex items-center gap-1 shadow-2xs">
                  <mat-icon class="!text-[11px] !w-3 !h-3">touch_app</mat-icon>
                  <span>Ghana Post GPS / Click Map / Drag Pin</span>
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
                Installation Fee Only (Excludes Door Price)
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
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
                  <option value="dm_door">DM Door</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Total (₵)
                </label>
                <div class="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                  ₵{{ (+(jobForm.value.installationFee || 0)).toLocaleString() }}
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
                ₵{{ (+(jobForm.value.installationFee || 0)).toLocaleString() }} Installation Fee
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

  readonly installationRateOptions = INSTALLATION_RATE_OPTIONS;
  readonly shopBranchSelectRef = viewChild<ElementRef<HTMLSelectElement>>('shopBranchSelect');

  // List of selected doors for this installation request (collapsed initially)
  readonly selectedDoors = signal<EditableDoorItem[]>([
    {
      id: `door_${Date.now()}_1`,
      doorCategory: '',
      doorModel: 'Select a door model',
      dimensions: '—',
      finish: '—',
      hardwareSpecs: '—',
      lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
      unitPrice: 0,
      installationPrice: 250,
      quantity: 1,
      isExpanded: true
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
    installationFee: new FormControl(250, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    paymentMethod: new FormControl<'cash' | 'momo' | 'pos_card' | 'bank_transfer' | 'dm_door'>('momo', { nonNullable: true })
  });

  // Client site coordinates tracked from location map
  readonly selectedSiteCoordinates = signal<{ lat: number; lng: number }>({ lat: 5.6020, lng: -0.1870 });
  readonly currentSiteAddress = signal<string>('');

  readonly detectedGhanaPostCode = computed(() => {
    const addr = this.currentSiteAddress() || '';
    const match = addr.match(/\b([A-Za-z]{2})\s*[-]?\s*(\d{3,4})\s*[-]?\s*(\d{4})\b/);
    if (!match) return null;
    return `${match[1].toUpperCase()}-${match[2]}-${match[3]}`;
  });

  onSiteLocationSelected(loc: ClientLocationResult) {
    this.selectedSiteCoordinates.set({ lat: loc.lat, lng: loc.lng });
    if (loc.isExplicitUserAction) {
      this.jobForm.patchValue({ siteAddress: loc.address });
      this.currentSiteAddress.set(loc.address);
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
    this.jobForm.controls.siteAddress.valueChanges.subscribe(val => {
      this.currentSiteAddress.set(val || '');
    });

    afterNextRender(() => {
      this.syncShopBranchControl(this.defaultDispatchBranchName());
    });

    effect(() => {
      this.allBranches();
      this.allWarehouses();
      const targetBranch = this.defaultDispatchBranchName();
      this.syncShopBranchControl(targetBranch);
    });
  }

  private syncInstallationFeeFromDoors(force = false) {
    if (!force && this.jobForm.controls.installationFee.dirty) return;
    const total = this.selectedDoors().reduce(
      (sum, d) => sum + ((d.installationPrice ?? 250) * d.quantity),
      0
    );
    this.jobForm.controls.installationFee.setValue(total);
  }

  getDoorCategoriesForItem(currentCategory?: string): string[] {
    const catalogCats = this.store.doors().map(d => d.category).filter(Boolean);
    const rateCats = [
      'Turkey Series',
      'Turkey interior series',
      'Economy doors',
      'Glass / Wooden Metal',
      'Door-in-Door',
      'Royal Series',
      'Special Series',
      'DM Interior Series'
    ];
    const set = new Set<string>([...catalogCats, ...rateCats]);
    if (currentCategory) set.add(currentCategory);
    return Array.from(set);
  }

  getFilteredCatalogDoors(door: EditableDoorItem) {
    let doors = this.store.doors();
    if (door.doorCategory) {
      const catLower = door.doorCategory.toLowerCase();
      doors = doors.filter(d => (d.category || '').toLowerCase() === catLower);
    }
    if (door.installationSeries) {
      const seriesLower = door.installationSeries.toLowerCase();
      doors = doors.filter(d => {
        const inferred = inferInstallationOption(d.name, d.category);
        const doorSeries = (d.installationSeries || inferred?.series || '').toLowerCase();
        return doorSeries === seriesLower || (d.category || '').toLowerCase().includes(seriesLower);
      });
    }
    return doors;
  }

  onDoorCategoryChange(index: number, event: Event) {
    const newCategory = (event.target as HTMLSelectElement).value;
    if (!newCategory) {
      this.selectedDoors.update(doors => doors.map((d, i) => i === index ? { ...d, doorCategory: '' } : d));
      return;
    }

    this.selectedDoors.update(doors => doors.map((d, i) => {
      if (i !== index) return d;
      // Prefer category match first so changing category updates Installation Type reliably
      const catMatch = inferInstallationOption('', newCategory);
      if (catMatch) {
        const seriesVariants = this.getVariantsForSeries(catMatch.series);
        const modelLower = (d.doorModel || '').toLowerCase();
        const hintVariant = seriesVariants.find(v => {
          const kw = v.keyword.toLowerCase();
          if (kw.includes('pillar') && modelLower.includes('pillar')) return true;
          if (kw.includes('pivot') && modelLower.includes('pivot')) return true;
          if ((kw.includes('2x') || kw.includes('double')) && (modelLower.includes('2x') || modelLower.includes('double'))) return true;
          if (kw.includes('oh') && (/\boh\b/.test(modelLower) || modelLower.includes('one & half') || modelLower.includes('one and half') || modelLower.includes('1.5'))) return true;
          if (kw.includes('lock') && modelLower.includes('lock')) return true;
          if (kw.includes('interior') && modelLower.includes('interior')) return true;
          return false;
        });
        const matchedVariant = hintVariant?.keyword ?? catMatch.variant;
        const matchedPrice = hintVariant?.price ?? catMatch.price;
        const lowestVariant = this.getLowestPriceVariant(catMatch.series);
        const nextDoor: EditableDoorItem = {
          ...d,
          doorCategory: newCategory,
          installationSeries: catMatch.series,
          installationVariant: lowestVariant?.keyword
        };
        return {
          ...nextDoor,
          installationPrice: this.withLockExtra(nextDoor, lowestVariant?.price ?? catMatch.price)
        };
      }
      return {
        ...d,
        doorCategory: newCategory
      };
    }));
    this.syncInstallationFeeFromDoors(true);
  }

  getVariantsForSeries(series?: string): InstallationRateVariant[] {
    if (!series) {
      return this.installationRateOptions.flatMap(opt => opt.variants);
    }
    return this.installationRateOptions.find(opt => opt.series === series)?.variants ?? [];
  }

  getLockExtraPrice(door: EditableDoorItem): number {
    const text = `${door.installationSeries || ''} ${door.doorCategory || ''} ${door.doorModel || ''}`.toLowerCase();
    return text.includes('economy') ? 100 : 150;
  }

  private withLockExtra(door: EditableDoorItem, basePrice: number): number {
    return basePrice + (door.includeLockExtra ? this.getLockExtraPrice(door) : 0);
  }

  toggleLockExtra(index: number) {
    this.selectedDoors.update(doors => doors.map((d, i) => {
      if (i !== index) return d;
      const nextInclude = !d.includeLockExtra;
      const extra = this.getLockExtraPrice(d);
      const base = Math.max(0, (d.installationPrice ?? 250) - (d.includeLockExtra ? extra : 0));
      return {
        ...d,
        includeLockExtra: nextInclude,
        installationPrice: base + (nextInclude ? extra : 0)
      };
    }));
    this.syncInstallationFeeFromDoors(true);
  }

  getLowestPriceVariant(series?: string): InstallationRateVariant | undefined {
    const variants = this.getVariantsForSeries(series);
    if (variants.length === 0) return undefined;
    const doorVariants = variants.filter(v => !v.keyword.toLowerCase().includes('lock') && !v.label.toLowerCase().includes('lock'));
    const pool = doorVariants.length > 0 ? doorVariants : variants;
    return pool.reduce((lowest, v) => (v.price < lowest.price ? v : lowest), pool[0]);
  }

  onInstallationSeriesChange(index: number, event: Event) {
    const series = (event.target as HTMLSelectElement).value || undefined;
    const lowestVariant = this.getLowestPriceVariant(series);

    this.selectedDoors.update(doors => doors.map((d, i) => {
      if (i !== index) return d;
      if (!series) {
        const catDoor = d.catalogDoorId
          ? this.store.doors().find(cd => cd.id === d.catalogDoorId)
          : undefined;
        const targetSeries = catDoor?.installationSeries;
        const fallbackLowest = targetSeries ? this.getLowestPriceVariant(targetSeries) : undefined;
        const nextDoor: EditableDoorItem = {
          ...d,
          installationSeries: targetSeries,
          installationVariant: fallbackLowest?.keyword
        };
        const basePrice = fallbackLowest?.price ?? catDoor?.installationPrice ?? computeDefaultInstallationPrice(d.doorModel, d.doorCategory);
        return {
          ...nextDoor,
          installationPrice: this.withLockExtra(nextDoor, basePrice)
        };
      }
      const nextDoor: EditableDoorItem = {
        ...d,
        installationSeries: series,
        installationVariant: lowestVariant?.keyword
      };
      const basePrice = lowestVariant?.price ?? computeDefaultInstallationPrice(d.doorModel, series || d.doorCategory);
      return {
        ...nextDoor,
        installationPrice: this.withLockExtra(nextDoor, basePrice)
      };
    }));
    this.syncInstallationFeeFromDoors(true);
  }

  onInstallationVariantChange(index: number, event: Event) {
    const variantKeyword = (event.target as HTMLSelectElement).value || undefined;
    const currentDoor = this.selectedDoors()[index];
    this.selectInstallationVariant(index, variantKeyword || '', currentDoor?.installationSeries);
  }

  selectInstallationVariant(index: number, variantKeyword: string, series?: string) {
    this.selectedDoors.update(doors => doors.map((d, i) => {
      if (i !== index) return d;
      if (!variantKeyword) {
        const nextDoor: EditableDoorItem = {
          ...d,
          installationSeries: series,
          installationVariant: undefined
        };
        const basePrice = computeDefaultInstallationPrice(d.doorModel, series || d.doorCategory);
        return {
          ...nextDoor,
          installationPrice: this.withLockExtra(nextDoor, basePrice)
        };
      }
      const variantOpt = this.installationRateOptions.find(opt =>
        opt.variants.some(v => v.keyword === variantKeyword)
      );
      const matchedSeries = variantOpt?.series || series;
      const variantMatch = variantOpt?.variants.find(v => v.keyword === variantKeyword);
      const nextDoor: EditableDoorItem = {
        ...d,
        installationSeries: matchedSeries,
        installationVariant: variantKeyword
      };
      const basePrice = variantMatch?.price ?? computeDefaultInstallationPrice(variantKeyword, matchedSeries || d.doorCategory);
      return {
        ...nextDoor,
        installationPrice: this.withLockExtra(nextDoor, basePrice)
      };
    }));
    this.syncInstallationFeeFromDoors(true);
  }

  toggleDoorDropdown(index: number) {
    this.selectedDoors.update(doors => {
      return doors.map((d, i) => i === index ? { ...d, isExpanded: !d.isExpanded } : { ...d, isExpanded: false });
    });
  }

  addDoorFromCatalog(catalogDoorId?: string) {
    let newDoor: EditableDoorItem;
    const inheritLockExtra = this.selectedDoors().some(d => !!d.includeLockExtra);
    const catDoor = catalogDoorId
      ? this.store.doors().find(d => d.id === catalogDoorId)
      : null;

    if (catDoor) {
      const inferred = inferInstallationOption(catDoor.name, catDoor.category);
      const targetSeries = catDoor.installationSeries ?? inferred?.series;
      const lowestVariant = targetSeries ? this.getLowestPriceVariant(targetSeries) : undefined;
        const draftDoor: EditableDoorItem = {
          id: `door_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          catalogDoorId: catDoor.id,
          doorCategory: catDoor.category,
          doorModel: `${catDoor.name} (${catDoor.modelCode})`,
          dimensions: catDoor.dimensions,
          finish: catDoor.finish,
          hardwareSpecs: catDoor.hardwareSpecs,
          lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
          unitPrice: catDoor.unitPrice,
          installationSeries: targetSeries,
          installationVariant: lowestVariant?.keyword,
          includeLockExtra: inheritLockExtra,
          quantity: 1,
          isExpanded: true
        };
        const basePrice = lowestVariant?.price ?? catDoor.installationPrice ?? inferred?.price ?? computeDefaultInstallationPrice(catDoor.name, catDoor.category);
        newDoor = {
          ...draftDoor,
          installationPrice: this.withLockExtra(draftDoor, basePrice)
        };
      } else {
          const draftDoor: EditableDoorItem = {
            id: `door_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            doorCategory: '',
            doorModel: 'Select a door model',
            dimensions: '—',
            finish: '—',
            hardwareSpecs: '—',
            lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
            unitPrice: 0,
            includeLockExtra: inheritLockExtra,
            quantity: 1,
            isExpanded: true
          };
          newDoor = {
            ...draftDoor,
            installationPrice: this.withLockExtra(draftDoor, 250)
          };
        }

        this.selectedDoors.update(doors => [...doors.map(d => ({ ...d, isExpanded: false })), newDoor]);
        this.syncInstallationFeeFromDoors();
      }

      removeDoor(index: number) {
        if (this.selectedDoors().length <= 1) return;
        this.selectedDoors.update(doors => doors.filter((_, i) => i !== index));
        this.syncInstallationFeeFromDoors();
      }

      changeDoorQty(index: number, delta: number) {
        this.selectedDoors.update(doors => {
          return doors.map((d, i) => {
            if (i !== index) return d;
            const newQty = Math.max(1, d.quantity + delta);
            return { ...d, quantity: newQty };
          });
        });
        this.syncInstallationFeeFromDoors();
      }

      onDoorCatalogPick(index: number, event: Event) {
        const doorId = (event.target as HTMLSelectElement).value;
        if (!doorId) return;
        const catDoor = this.store.doors().find(d => d.id === doorId);
        if (!catDoor) return;

        const inferred = inferInstallationOption(catDoor.name, catDoor.category);
        const targetSeries = catDoor.installationSeries ?? inferred?.series;
        const lowestVariant = this.getLowestPriceVariant(targetSeries);

        this.selectedDoors.update(doors => {
          return doors.map((d, i) => {
            if (i !== index) return d;
            const nextDoor: EditableDoorItem = {
              ...d,
              catalogDoorId: catDoor.id,
              doorCategory: catDoor.category,
              doorModel: `${catDoor.name} (${catDoor.modelCode})`,
              dimensions: catDoor.dimensions,
              finish: catDoor.finish,
              hardwareSpecs: catDoor.hardwareSpecs,
              unitPrice: catDoor.unitPrice,
              installationSeries: targetSeries,
              installationVariant: lowestVariant?.keyword
            };
            const basePrice = lowestVariant?.price ?? catDoor.installationPrice ?? inferred?.price ?? computeDefaultInstallationPrice(catDoor.name, catDoor.category);
            return {
              ...nextDoor,
              installationPrice: this.withLockExtra(nextDoor, basePrice)
            };
          });
        });
        this.syncInstallationFeeFromDoors(true);
      }

      handleCreateJob() {
        if (this.jobForm.invalid || this.selectedDoors().length === 0) {
          this.jobForm.markAllAsTouched();
          this.alert.toastWarning('Incomplete Job Details', 'Please select at least one door and complete the client details.');
          return;
        }
        if (this.selectedDoors().some(d => !d.catalogDoorId && d.doorModel === 'Select a door model')) {
          this.alert.toastWarning('Door Not Selected', 'Please select a door model from the Preset Model Template dropdown.');
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
        const laborCost = 0;
        const totalInstallAndLabor = installationFee;
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
          `Job #${createdJob.id} booked for ${val.clientName} (₵${totalInstallAndLabor.toLocaleString()} Installation Fee). Routed to Operations Manager for team assignment.`
        );
        this.closed.emit();
      }
    }
