import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { ClientLocationMap } from '../client-location-map/client-location-map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _c0 = () => ({ standalone: true });
const _forTrack0 = ($index, $item) => $item.id;
function NewJobModal_For_37_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 97);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeDoor(ɵ$index_63_r2)); });
    i0.ɵɵelementStart(1, "mat-icon", 70);
    i0.ɵɵtext(2, "delete_outline");
    i0.ɵɵelementEnd()();
} }
function NewJobModal_For_37_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 98);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Conditional_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeDoor(ɵ$index_63_r2)); });
    i0.ɵɵelementStart(1, "mat-icon", 70);
    i0.ɵɵtext(2, "delete_outline");
    i0.ɵɵelementEnd()();
} }
function NewJobModal_For_37_Conditional_39_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 104);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const catDoor_r7 = ctx.$implicit;
    const door_r8 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("value", catDoor_r7.id)("selected", catDoor_r7.id === door_r8.catalogDoorId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4(" ", catDoor_r7.name, " (", catDoor_r7.modelCode, ") - ", catDoor_r7.formattedPrice || "\u20B5" + catDoor_r7.unitPrice, " \u2022 ", catDoor_r7.category, " ");
} }
function NewJobModal_For_37_Conditional_39_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r9);
} }
function NewJobModal_For_37_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 96)(1, "div", 99)(2, "div", 100)(3, "label", 101);
    i0.ɵɵtext(4, " Preset Model Template ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 102);
    i0.ɵɵtext(6, " Auto-syncs specs & category ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "select", 103);
    i0.ɵɵlistener("change", function NewJobModal_For_37_Conditional_39_Template_select_change_7_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDoorCatalogPick(ɵ$index_63_r2, $event)); });
    i0.ɵɵelementStart(8, "option", 52);
    i0.ɵɵtext(9, "-- Select catalog template --");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, NewJobModal_For_37_Conditional_39_For_11_Template, 2, 6, "option", 104, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 105)(13, "div")(14, "div", 100)(15, "label", 106);
    i0.ɵɵtext(16, " Door Category ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 107)(18, "mat-icon", 108);
    i0.ɵɵtext(19, "auto_awesome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Auto-Selected");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "select", 109);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_select_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "doorCategory", $event)); });
    i0.ɵɵrepeaterCreate(23, NewJobModal_For_37_Conditional_39_For_24_Template, 2, 2, "option", 53, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div")(26, "label", 110);
    i0.ɵɵtext(27, " Door Model Title ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "input", 111);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_input_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDoorModelInputChange(ɵ$index_63_r2, $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 105)(30, "div")(31, "label", 110);
    i0.ɵɵtext(32, " Dimensions (H \u00D7 W \u00D7 D) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "input", 112);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "dimensions", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div")(35, "label", 110);
    i0.ɵɵtext(36, " Architectural Finish ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "input", 113);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_input_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "finish", $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "div", 105)(39, "div")(40, "label", 110);
    i0.ɵɵtext(41, " Hardware & Mortise Specifications ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "input", 114);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_input_ngModelChange_42_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "hardwareSpecs", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div")(44, "label", 110);
    i0.ɵɵtext(45, " Smart Lock / Handle ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "select", 115);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_select_ngModelChange_46_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "lockModel", $event)); });
    i0.ɵɵelementStart(47, "option", 116);
    i0.ɵɵtext(48, "Doormaster Smart Lock Handle F35 (Biometric & RFID)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "option", 117);
    i0.ɵɵtext(50, "Doormaster High-Security Italian Mortise Lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "option", 118);
    i0.ɵɵtext(52, "Doormaster Keypad Digital Smart Cylinder");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "option", 119);
    i0.ɵɵtext(54, "Heavy-Duty Multi-Point Deadbolt System");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "option", 120);
    i0.ɵɵtext(56, "Standard Mechanical Handle & Cylinder");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(57, "div", 121)(58, "div")(59, "label", 110);
    i0.ɵɵtext(60, " Unit Price (\u20B5) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "input", 122);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_input_ngModelChange_61_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "unitPrice", +$event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "div")(63, "label", 110);
    i0.ɵɵtext(64, " Unit Quantity ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "input", 123);
    i0.ɵɵlistener("ngModelChange", function NewJobModal_For_37_Conditional_39_Template_input_ngModelChange_65_listener($event) { i0.ɵɵrestoreView(_r6); const ɵ$index_63_r2 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateDoorField(ɵ$index_63_r2, "quantity", ctx_r2.Math.max(1, +$event))); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const door_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r2.store.doors());
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngModel", door_r8.doorCategory)("ngModelOptions", i0.ɵɵpureFunction0(16, _c0));
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.getCategoryList(door_r8.doorCategory));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", door_r8.doorModel)("ngModelOptions", i0.ɵɵpureFunction0(17, _c0));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", door_r8.dimensions)("ngModelOptions", i0.ɵɵpureFunction0(18, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", door_r8.finish)("ngModelOptions", i0.ɵɵpureFunction0(19, _c0));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", door_r8.hardwareSpecs)("ngModelOptions", i0.ɵɵpureFunction0(20, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", door_r8.lockModel)("ngModelOptions", i0.ɵɵpureFunction0(21, _c0));
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngModel", door_r8.unitPrice)("ngModelOptions", i0.ɵɵpureFunction0(22, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", door_r8.quantity)("ngModelOptions", i0.ɵɵpureFunction0(23, _c0));
} }
function NewJobModal_For_37_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 71)(1, "div", 72);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_div_click_1_listener() { const ɵ$index_63_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleDoorDropdown(ɵ$index_63_r2)); });
    i0.ɵɵelementStart(2, "div", 73)(3, "div", 74)(4, "div", 75);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 76)(7, "div", 77)(8, "h5", 78);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 79);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p", 80);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 81);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_div_click_14_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵconditionalCreate(15, NewJobModal_For_37_Conditional_15_Template, 3, 0, "button", 82);
    i0.ɵɵelementStart(16, "button", 83);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_button_click_16_listener() { const ɵ$index_63_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleDoorDropdown(ɵ$index_63_r2)); });
    i0.ɵɵelementStart(17, "mat-icon", 11);
    i0.ɵɵtext(18, "expand_more");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(19, "div", 84);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_div_click_19_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(20, "div", 85)(21, "button", 86);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_button_click_21_listener() { const ɵ$index_63_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeDoorQty(ɵ$index_63_r2, -1)); });
    i0.ɵɵelementStart(22, "mat-icon", 87);
    i0.ɵɵtext(23, "remove");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "span", 88);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 89);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_button_click_26_listener() { const ɵ$index_63_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeDoorQty(ɵ$index_63_r2, 1)); });
    i0.ɵɵelementStart(27, "mat-icon", 87);
    i0.ɵɵtext(28, "add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 90)(30, "span", 91);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 92);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 93);
    i0.ɵɵconditionalCreate(35, NewJobModal_For_37_Conditional_35_Template, 3, 0, "button", 94);
    i0.ɵɵelementStart(36, "button", 95);
    i0.ɵɵlistener("click", function NewJobModal_For_37_Template_button_click_36_listener() { const ɵ$index_63_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleDoorDropdown(ɵ$index_63_r2)); });
    i0.ɵɵelementStart(37, "mat-icon", 11);
    i0.ɵɵtext(38, "expand_more");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵconditionalCreate(39, NewJobModal_For_37_Conditional_39_Template, 66, 24, "div", 96);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const door_r8 = ctx.$implicit;
    const ɵ$index_63_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(door_r8.isExpanded ? "border-emerald-500/50 dark:border-emerald-500/40 bg-white dark:bg-slate-900 shadow-md ring-1 ring-emerald-500/20" : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" #", ɵ$index_63_r2 + 1, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", door_r8.doorModel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", door_r8.doorCategory, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", door_r8.dimensions, " \u00B7 ", door_r8.finish, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.selectedDoors().length > 1 ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("rotate-180", door_r8.isExpanded);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", door_r8.quantity <= 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", door_r8.quantity, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" \u20B5", (door_r8.unitPrice * door_r8.quantity).toLocaleString(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" @ \u20B5", door_r8.unitPrice.toLocaleString(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.selectedDoors().length > 1 ? 35 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("rotate-180", door_r8.isExpanded);
    i0.ɵɵproperty("title", i0.ɵɵinterpolate(door_r8.isExpanded ? "Collapse door specs" : "Expand door specs"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(door_r8.isExpanded ? 39 : -1);
} }
function NewJobModal_For_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const installer_r10 = ctx.$implicit;
    i0.ɵɵproperty("value", installer_r10.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", installer_r10.name, " (", installer_r10.metrics.avgRating, "\u2605)");
} }
export class NewJobModal {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    closed = output();
    // List of selected doors for this installation request
    selectedDoors = signal([
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
    ], ...(ngDevMode ? [{ debugName: "selectedDoors" }] : /* istanbul ignore next */ []));
    totalDoorsPrice = computed(() => {
        return this.selectedDoors().reduce((acc, d) => acc + (d.unitPrice * d.quantity), 0);
    }, ...(ngDevMode ? [{ debugName: "totalDoorsPrice" }] : /* istanbul ignore next */ []));
    totalDoorsCount = computed(() => {
        return this.selectedDoors().reduce((acc, d) => acc + d.quantity, 0);
    }, ...(ngDevMode ? [{ debugName: "totalDoorsCount" }] : /* istanbul ignore next */ []));
    Math = Math;
    jobForm = new FormGroup({
        clientName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        clientPhone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        clientEmail: new FormControl('', { nonNullable: true }),
        siteAddress: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        accessInstructions: new FormControl('', { nonNullable: true }),
        scheduledDate: new FormControl(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
        estimatedHours: new FormControl(4, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
        assignedInstallerId: new FormControl('', { nonNullable: true }),
        installationFee: new FormControl(1200, { nonNullable: true, validators: [Validators.required] }),
        laborCost: new FormControl(480, { nonNullable: true, validators: [Validators.required] })
    });
    // Client site coordinates tracked from location map
    selectedSiteCoordinates = signal({ lat: 5.6020, lng: -0.1870 }, ...(ngDevMode ? [{ debugName: "selectedSiteCoordinates" }] : /* istanbul ignore next */ []));
    onSiteLocationSelected(loc) {
        this.selectedSiteCoordinates.set({ lat: loc.lat, lng: loc.lng });
        // NEVER overwrite manual text entry! Only populate if user explicitly clicked a preset zone or GPS button
        if (loc.isExplicitUserAction) {
            this.jobForm.patchValue({ siteAddress: `${loc.district || loc.address}, Accra` });
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
    toggleDoorDropdown(index) {
        this.selectedDoors.update(doors => {
            return doors.map((d, i) => i === index ? { ...d, isExpanded: !d.isExpanded } : d);
        });
    }
    addDoorFromCatalog(catalogDoorId) {
        let newDoor;
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
        }
        else {
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
    removeDoor(index) {
        if (this.selectedDoors().length <= 1)
            return;
        this.selectedDoors.update(doors => doors.filter((_, i) => i !== index));
    }
    changeDoorQty(index, delta) {
        this.selectedDoors.update(doors => {
            return doors.map((d, i) => {
                if (i !== index)
                    return d;
                const newQty = Math.max(1, d.quantity + delta);
                return { ...d, quantity: newQty };
            });
        });
    }
    // Dynamic list of categories from scraped catalog & standards
    categoryOptions = computed(() => {
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
        const set = new Set();
        [...dbCats, ...doorCats, ...standardCats].forEach(c => {
            if (c && c.trim())
                set.add(c.trim());
        });
        return Array.from(set);
    }, ...(ngDevMode ? [{ debugName: "categoryOptions" }] : /* istanbul ignore next */ []));
    getCategoryList(currentCat) {
        const list = [...this.categoryOptions()];
        if (currentCat && !list.includes(currentCat)) {
            list.unshift(currentCat);
        }
        return list;
    }
    inferCategoryFromModel(title) {
        if (!title)
            return null;
        const trimmed = title.trim().toLowerCase();
        // 1. Direct match with catalog doors in store
        const matchedDoor = this.store.doors().find(d => d.name.toLowerCase() === trimmed ||
            (d.modelCode && trimmed.includes(d.modelCode.toLowerCase())) ||
            trimmed.includes(d.name.toLowerCase()));
        if (matchedDoor && matchedDoor.category) {
            return matchedDoor.category;
        }
        // 2. Keyword pattern matching for known lines
        if (trimmed.includes('turkey'))
            return 'Turkey interior series';
        if (trimmed.includes('antifade') || trimmed.includes('anti-fade') || trimmed.includes('antirust'))
            return 'Antifade doors';
        if (trimmed.includes('villa') || trimmed.includes('aeropivot'))
            return 'Premium Villa Series';
        if (trimmed.includes('royal'))
            return 'Royal Series';
        if (trimmed.includes('smart lock handle') || trimmed.includes('lock handle') || trimmed.includes('f35') || trimmed.includes('f15') || trimmed.includes('f20'))
            return 'DM Smart Lock Handle';
        if (trimmed.includes('smart lock') || trimmed.includes('biometric') || trimmed.includes('digital lock'))
            return 'Smart Lock Doors';
        if (trimmed.includes('mechanical') || trimmed.includes('dm-l'))
            return 'Mechanical Lock Doors';
        if (trimmed.includes('reeded') || trimmed.includes('fluted'))
            return 'Reeded glass doors';
        if (trimmed.includes('economy') || trimmed.includes('china') || trimmed.includes('g805'))
            return 'Economy doors';
        if (trimmed.includes('interior'))
            return 'DM Interior Series';
        if (trimmed.includes('pivot'))
            return 'Architectural Entrance Pivot Door';
        if (trimmed.includes('wood') || trimmed.includes('hardwood') || trimmed.includes('timber'))
            return 'Solid Hardwood Double Entrance';
        if (trimmed.includes('bi-fold') || trimmed.includes('bifold') || trimmed.includes('patio'))
            return 'Acoustic Glazed Bi-Fold Patio Suite';
        if (trimmed.includes('fire') || trimmed.includes('fd30') || trimmed.includes('fd60'))
            return 'FD30 / FD60 Commercial Fire Door';
        if (trimmed.includes('pocket') || trimmed.includes('sliding') || trimmed.includes('cavity'))
            return 'Concealed Cavity Pocket Sliding Door';
        if (trimmed.includes('frameless'))
            return 'Frameless Glass Pivot Door';
        return null;
    }
    onDoorModelInputChange(index, newTitle) {
        const inferred = this.inferCategoryFromModel(newTitle);
        this.selectedDoors.update(doors => {
            return doors.map((d, i) => {
                if (i !== index)
                    return d;
                return {
                    ...d,
                    doorModel: newTitle,
                    doorCategory: inferred || d.doorCategory
                };
            });
        });
    }
    onDoorCatalogPick(index, event) {
        const doorId = event.target.value;
        if (!doorId)
            return;
        const catDoor = this.store.doors().find(d => d.id === doorId);
        if (!catDoor)
            return;
        this.selectedDoors.update(doors => {
            return doors.map((d, i) => {
                if (i !== index)
                    return d;
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
    updateDoorField(index, field, value) {
        this.selectedDoors.update(doors => {
            return doors.map((d, i) => {
                if (i !== index)
                    return d;
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
        const assignedInstaller = this.store.installers().find(i => i.id === val.assignedInstallerId);
        // Summary title reflecting multiple door count
        const doorSummary = doors.length === 1
            ? primaryDoor.doorModel
            : `${doors.length} Doors (${doors.map(d => `${d.quantity > 1 ? d.quantity + 'x ' : ''}${d.doorModel.split(' ')[0]}`).join(', ')})`;
        const totalPrice = this.totalDoorsPrice();
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
            shopBranch: 'Atelier Main Facility, Bay 4',
            status: val.assignedInstallerId ? 'assigned' : 'draft',
            assignedInstallerId: val.assignedInstallerId || null,
            assignedInstallerName: assignedInstaller ? assignedInstaller.name : null,
            installerAssignmentStatus: val.assignedInstallerId ? 'accepted' : 'pending',
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
    static ɵfac = function NewJobModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NewJobModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NewJobModal, selectors: [["app-new-job-modal"]], outputs: { closed: "closed" }, decls: 146, vars: 10, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-2", "sm:p-4", "bg-slate-950/70", "backdrop-blur-xs", "animate-in", "fade-in", "duration-200"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-3xl", "w-full", "overflow-hidden", "flex", "flex-col", "max-h-[95vh]", "sm:max-h-[92vh]", "text-slate-900", "dark:text-slate-100"], [1, "px-4", "sm:px-6", "py-3", "sm:py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/80", "dark:bg-slate-950/80"], [1, "flex", "items-center", "gap-3"], [1, "w-9", "h-9", "rounded-xl", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center", "shadow-xs"], [1, "!text-lg", "!w-5", "!h-5"], [1, "flex", "items-center", "gap-2"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "text-[10px]", "font-mono", "font-bold", "px-2", "py-0.5", "rounded-full", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "border", "border-emerald-500/20"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-0.5"], ["type", "button", "title", "Close dialog", "aria-label", "Close dialog", 1, "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", "p-1.5", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", 3, "click"], [1, "!text-lg"], [1, "flex", "flex-col", "flex-1", "min-h-0", "overflow-hidden", 3, "ngSubmit", "formGroup"], [1, "p-3.5", "sm:p-6", "overflow-y-auto", "flex-1", "space-y-4", "sm:space-y-6"], [1, "space-y-3"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-2", "pb-1", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "w-5", "h-5", "rounded-md", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "flex", "items-center", "justify-center", "font-bold", "text-xs"], [1, "text-xs", "font-black", "uppercase", "tracking-wider", "text-slate-900", "dark:text-white"], [1, "text-xs", "font-mono", "font-bold", "text-emerald-600", "dark:text-emerald-400"], ["type", "button", 1, "px-3", "py-1", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-1", "shadow-xs", "cursor-pointer", "active:scale-95", 3, "click"], [1, "!text-xs", "!w-3.5", "!h-3.5"], [1, "rounded-xl", "border", "transition-all", "duration-200", "overflow-hidden", 3, "class"], [1, "pt-3", "border-t", "border-slate-100", "dark:border-slate-800", "space-y-3"], [1, "w-5", "h-5", "rounded-md", "bg-indigo-500/10", "text-indigo-600", "dark:text-indigo-400", "flex", "items-center", "justify-center", "font-bold", "text-xs"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["for", "jobClientName", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobClientName", "type", "text", "formControlName", "clientName", "placeholder", "e.g. Julian & Sarah Sterling", 1, "w-full", "text-xs", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "jobClientPhone", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobClientPhone", "type", "text", "formControlName", "clientPhone", "placeholder", "+233 24 782 9011", 1, "w-full", "text-xs", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "jobClientEmail", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobClientEmail", "type", "email", "formControlName", "clientEmail", "placeholder", "client@example.com", 1, "w-full", "text-xs", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "jobSiteAddress", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1", "flex", "items-center", "justify-between"], [1, "text-[10px]", "text-emerald-600", "dark:text-emerald-400", "font-mono", "font-bold"], [1, "relative"], ["id", "jobSiteAddress", "type", "text", "formControlName", "siteAddress", "placeholder", "e.g. Airport Residential Area, Accra (or GPS coordinates)", 1, "w-full", "text-xs", "pl-8", "pr-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "!text-sm", "text-emerald-600", "dark:text-emerald-400", "absolute", "left-2.5", "top-2.5", "pointer-events-none"], [1, "pt-1"], [1, "flex", "items-center", "justify-between", "mb-1.5"], [1, "text-[11px]", "font-bold", "text-slate-700", "dark:text-slate-300", "flex", "items-center", "gap-1.5"], [1, "!text-xs", "text-emerald-600", "dark:text-emerald-400"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [3, "locationSelected", "address"], ["for", "jobAccessInstructions", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobAccessInstructions", "type", "text", "formControlName", "accessInstructions", "placeholder", "e.g. Security barrier pin 4892#, ground floor foyer entrance", 1, "w-full", "text-xs", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "w-5", "h-5", "rounded-md", "bg-cyan-500/10", "text-cyan-600", "dark:text-cyan-400", "flex", "items-center", "justify-center", "font-bold", "text-xs"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-3"], ["for", "jobScheduledDate", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobScheduledDate", "type", "date", "formControlName", "scheduledDate", 1, "w-full", "text-xs", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium"], ["for", "jobEstimatedHours", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobEstimatedHours", "type", "number", "step", "0.5", "formControlName", "estimatedHours", 1, "w-full", "text-xs", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "jobInstallerSelect", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "jobInstallerSelect", "formControlName", "assignedInstallerId", 1, "w-full", "text-xs", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["value", ""], [3, "value"], [1, "w-5", "h-5", "rounded-md", "bg-amber-500/10", "text-amber-600", "dark:text-amber-400", "flex", "items-center", "justify-center", "font-bold", "text-xs"], [1, "grid", "grid-cols-1", "sm:grid-cols-4", "gap-3", "bg-slate-50", "dark:bg-slate-800/50", "p-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700"], [1, "block", "text-[10px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "mb-1"], [1, "text-sm", "font-black", "font-mono", "text-emerald-600", "dark:text-emerald-400", "pt-1"], ["for", "jobInstallationFee", 1, "block", "text-[10px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "mb-1"], ["id", "jobInstallationFee", "type", "number", "formControlName", "installationFee", 1, "w-full", "text-xs", "px-2.5", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-bold"], ["for", "jobLaborCost", 1, "block", "text-[10px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "mb-1"], ["id", "jobLaborCost", "type", "number", "formControlName", "laborCost", 1, "w-full", "text-xs", "px-2.5", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-bold"], [1, "text-sm", "font-black", "font-mono", "text-slate-900", "dark:text-white", "pt-1"], [1, "px-4", "sm:px-6", "py-3", "sm:py-3.5", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/95", "dark:bg-slate-900/95", "backdrop-blur-md", "shrink-0", "flex", "flex-col-reverse", "sm:flex-row", "sm:items-center", "justify-between", "gap-2.5", "sm:gap-3", "z-10", "shadow-lg"], [1, "flex", "items-center", "gap-2", "text-[11px]", "sm:text-xs", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-emerald-600", "dark:text-emerald-400", "font-bold"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto"], ["type", "button", 1, "flex-1", "sm:flex-initial", "px-4", "py-2", "border", "border-slate-200", "dark:border-slate-700", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "text-xs", "font-semibold", "transition-colors", "cursor-pointer", "text-center", 3, "click"], ["type", "submit", 1, "flex-1", "sm:flex-initial", "px-5", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "dark:bg-emerald-600", "dark:hover:bg-emerald-500", "text-white", "disabled:opacity-50", "rounded-xl", "text-xs", "font-bold", "transition-all", "shadow-md", "active:scale-95", "cursor-pointer", "flex", "items-center", "justify-center", "gap-1.5", 3, "disabled"], [1, "!text-sm", "!w-4", "!h-4"], [1, "rounded-xl", "border", "transition-all", "duration-200", "overflow-hidden"], [1, "px-3", "sm:px-4", "py-2.5", "sm:py-3", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-2", "sm:gap-3", "cursor-pointer", "select-none", "bg-slate-100/50", "dark:bg-slate-800/40", "hover:bg-slate-100", "dark:hover:bg-slate-800/70", "transition-colors", 3, "click"], [1, "flex", "items-center", "justify-between", "sm:justify-start", "gap-2.5", "min-w-0", "w-full", "sm:w-auto"], [1, "flex", "items-center", "gap-2.5", "min-w-0"], [1, "w-6", "h-6", "sm:w-7", "sm:h-7", "rounded-lg", "bg-emerald-600", "text-white", "font-mono", "font-bold", "text-xs", "flex", "items-center", "justify-center", "shrink-0", "shadow-xs"], [1, "truncate"], [1, "flex", "items-center", "gap-1.5", "flex-wrap"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "truncate"], [1, "text-[9px]", "sm:text-[10px]", "font-semibold", "px-2", "py-0.2", "rounded-full", "bg-slate-200", "dark:bg-slate-700", "text-slate-700", "dark:text-slate-300"], [1, "text-[10px]", "sm:text-[11px]", "text-slate-500", "dark:text-slate-400", "font-mono", "mt-0.5", "truncate"], [1, "flex", "items-center", "gap-1", "sm:hidden", "shrink-0", 3, "click"], ["type", "button", "title", "Remove this door", 1, "p-1", "text-slate-400", "hover:text-red-500", "rounded", "cursor-pointer"], ["type", "button", 1, "p-1", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", "rounded", "transition-transform", "duration-200", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-between", "sm:justify-end", "gap-2.5", "shrink-0", "pt-1.5", "sm:pt-0", "border-t", "border-slate-200/60", "dark:border-slate-700/60", "sm:border-0", 3, "click"], [1, "flex", "items-center", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "overflow-hidden", "bg-white", "dark:bg-slate-900"], ["type", "button", "title", "Decrease quantity", 1, "px-2", "py-1", "text-slate-500", "hover:text-slate-900", "dark:hover:text-white", "disabled:opacity-30", "transition-colors", "cursor-pointer", 3, "click", "disabled"], [1, "!text-xs", "!w-3", "!h-3"], [1, "px-2", "py-1", "text-xs", "font-mono", "font-bold", "text-slate-900", "dark:text-white", "min-w-[24px]", "text-center"], ["type", "button", "title", "Increase quantity", 1, "px-2", "py-1", "text-slate-500", "hover:text-slate-900", "dark:hover:text-white", "transition-colors", "cursor-pointer", 3, "click"], [1, "text-right", "font-mono", "min-w-[70px]", "sm:min-w-[80px]"], [1, "text-xs", "font-black", "text-emerald-600", "dark:text-emerald-400", "block"], [1, "text-[9px]", "text-slate-400", "block"], [1, "hidden", "sm:flex", "items-center", "gap-1"], ["type", "button", "title", "Remove this door", 1, "p-1.5", "text-slate-400", "hover:text-red-500", "dark:hover:text-red-400", "rounded-lg", "hover:bg-red-50", "dark:hover:bg-red-950/30", "transition-colors", "cursor-pointer"], ["type", "button", 1, "p-1", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", "rounded-lg", "transition-transform", "duration-200", "cursor-pointer", 3, "click", "title"], [1, "p-4", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-100", "dark:border-slate-800/80", "space-y-3.5", "animate-in", "slide-in-from-top-2", "duration-150"], ["type", "button", "title", "Remove this door", 1, "p-1", "text-slate-400", "hover:text-red-500", "rounded", "cursor-pointer", 3, "click"], ["type", "button", "title", "Remove this door", 1, "p-1.5", "text-slate-400", "hover:text-red-500", "dark:hover:text-red-400", "rounded-lg", "hover:bg-red-50", "dark:hover:bg-red-950/30", "transition-colors", "cursor-pointer", 3, "click"], [1, "p-2.5", "bg-slate-50", "dark:bg-slate-800/60", "rounded-lg", "border", "border-slate-200/80", "dark:border-slate-700/60"], [1, "flex", "items-center", "justify-between", "mb-1"], [1, "block", "text-[10px]", "font-bold", "text-slate-600", "dark:text-slate-300", "uppercase", "tracking-wider"], [1, "text-[9px]", "font-semibold", "text-emerald-600", "dark:text-emerald-400"], [1, "w-full", "text-xs", "px-2.5", "py-1.5", "bg-white", "dark:bg-slate-900", "border", "border-slate-300", "dark:border-slate-700", "rounded-md", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "cursor-pointer", 3, "change"], [3, "value", "selected"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], [1, "block", "text-[11px]", "font-bold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider"], [1, "inline-flex", "items-center", "gap-1", "text-[9px]", "font-bold", "text-emerald-700", "dark:text-emerald-300", "bg-emerald-50", "dark:bg-emerald-950/70", "border", "border-emerald-200/80", "dark:border-emerald-800/60", "px-1.5", "py-0.5", "rounded", "shadow-2xs"], [1, "!text-[11px]", "!w-3", "!h-3"], [1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "font-medium", "cursor-pointer", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "block", "text-[11px]", "font-bold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider", "mb-1"], ["type", "text", "placeholder", "e.g. AeroPivot 900 Walnut & Anodized Steel", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "text", "placeholder", "e.g. 2400mm \u00D7 1200mm \u00D7 55mm", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "text", "placeholder", "e.g. Smoked European Oak with Matt Black PVD", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "text", "placeholder", "e.g. FritsJurgens System M+ Pivot, 3-Point Magnetic Mortise Lock", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "cursor-pointer", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "Doormaster Smart Lock Handle F35 (Biometric & RFID)"], ["value", "Doormaster High-Security Italian Mortise Lock"], ["value", "Doormaster Keypad Digital Smart Cylinder"], ["value", "Heavy-Duty Multi-Point Deadbolt System"], ["value", "Standard Mechanical Handle & Cylinder"], [1, "grid", "grid-cols-2", "gap-3", "pt-1"], ["type", "number", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "font-bold", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "1", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "font-mono", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "font-bold", 3, "ngModelChange", "ngModel", "ngModelOptions"]], template: function NewJobModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon", 5);
            i0.ɵɵtext(6, "door_front");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "div", 6)(9, "h3", 7);
            i0.ɵɵtext(10, "Book New Door Installation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12, " Shop Manager Desk ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p", 9);
            i0.ɵɵtext(14, " Select multiple door units, customize door dropdown specs, and specify client site details ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "button", 10);
            i0.ɵɵlistener("click", function NewJobModal_Template_button_click_15_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(16, "mat-icon", 11);
            i0.ɵɵtext(17, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "form", 12);
            i0.ɵɵlistener("ngSubmit", function NewJobModal_Template_form_ngSubmit_18_listener() { return ctx.handleCreateJob(); });
            i0.ɵɵelementStart(19, "div", 13)(20, "div", 14)(21, "div", 15)(22, "div", 6)(23, "div", 16);
            i0.ɵɵtext(24, " 1 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "h4", 17);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 6)(28, "span", 18);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "button", 19);
            i0.ɵɵlistener("click", function NewJobModal_Template_button_click_30_listener() { return ctx.addDoorFromCatalog(); });
            i0.ɵɵelementStart(31, "mat-icon", 20);
            i0.ɵɵtext(32, "add");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span");
            i0.ɵɵtext(34, "+ Add Door");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "div", 14);
            i0.ɵɵrepeaterCreate(36, NewJobModal_For_37_Template, 40, 20, "div", 21, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 22)(39, "div", 6)(40, "div", 23);
            i0.ɵɵtext(41, " 2 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "h4", 17);
            i0.ɵɵtext(43, " Client & Installation Site Details ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "div", 24)(45, "div")(46, "label", 25);
            i0.ɵɵtext(47, " Client Full Name * ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(48, "input", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div")(50, "label", 27);
            i0.ɵɵtext(51, " Client Phone Number * ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(52, "input", 28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "div", 24)(54, "div")(55, "label", 29);
            i0.ɵɵtext(56, " Client Email Address ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(57, "input", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div")(59, "label", 31)(60, "span");
            i0.ɵɵtext(61, "Site Location / Address / GPS *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "span", 32);
            i0.ɵɵtext(63, "Auto Map Pin");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(64, "div", 33);
            i0.ɵɵelement(65, "input", 34);
            i0.ɵɵelementStart(66, "mat-icon", 35);
            i0.ɵɵtext(67, "location_on");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(68, "div", 36)(69, "div", 37)(70, "span", 38)(71, "mat-icon", 39);
            i0.ɵɵtext(72, "map");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span");
            i0.ɵɵtext(74, "Client Site Location Radar & GPS Pin");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "span", 40);
            i0.ɵɵtext(76, " Drag pin or click map to pinpoint site gate ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "app-client-location-map", 41);
            i0.ɵɵlistener("locationSelected", function NewJobModal_Template_app_client_location_map_locationSelected_77_listener($event) { return ctx.onSiteLocationSelected($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(78, "div")(79, "label", 42);
            i0.ɵɵtext(80, " Site Access Instructions & Security Gate Notes ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(81, "input", 43);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div", 22)(83, "div", 6)(84, "div", 44);
            i0.ɵɵtext(85, " 3 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "h4", 17);
            i0.ɵɵtext(87, " Schedule & Field Installer Dispatch ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "div", 45)(89, "div")(90, "label", 46);
            i0.ɵɵtext(91, " Scheduled Installation Date * ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(92, "input", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "div")(94, "label", 48);
            i0.ɵɵtext(95, " Est. Duration (Hours) ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(96, "input", 49);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "div")(98, "label", 50);
            i0.ɵɵtext(99, " Assign Lead Technician ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "select", 51)(101, "option", 52);
            i0.ɵɵtext(102, "Unassigned (Operations Manager Dispatches)");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(103, NewJobModal_For_104_Template, 2, 3, "option", 53, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(105, "div", 22)(106, "div", 6)(107, "div", 54);
            i0.ɵɵtext(108, " 4 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "h4", 17);
            i0.ɵɵtext(110, " Job Financials & Shop Counter Summary ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(111, "div", 55)(112, "div")(113, "label", 56);
            i0.ɵɵtext(114, " Total Doors Price (\u20B5) ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "div", 57);
            i0.ɵɵtext(116);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(117, "div")(118, "label", 58);
            i0.ɵɵtext(119, " Installation Fee (\u20B5) * ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(120, "input", 59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(121, "div")(122, "label", 60);
            i0.ɵɵtext(123, " Est. Tech Labor (\u20B5) ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(124, "input", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "div")(126, "label", 56);
            i0.ɵɵtext(127, " Grand Total (\u20B5) ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(128, "div", 62);
            i0.ɵɵtext(129);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(130, "div", 63)(131, "div", 64)(132, "span", 65);
            i0.ɵɵtext(133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "span");
            i0.ɵɵtext(135, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(136, "span", 66);
            i0.ɵɵtext(137);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(138, "div", 67)(139, "button", 68);
            i0.ɵɵlistener("click", function NewJobModal_Template_button_click_139_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(140, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "button", 69)(142, "mat-icon", 70);
            i0.ɵɵtext(143, "check_circle");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(144, "span");
            i0.ɵɵtext(145);
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            let tmp_4_0;
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("formGroup", ctx.jobForm);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" Selected Doors for Installation (", ctx.totalDoorsCount(), " Total Units) ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" Doors Total: \u20B5", ctx.totalDoorsPrice().toLocaleString(), " ");
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.selectedDoors());
            i0.ɵɵadvance(41);
            i0.ɵɵproperty("address", ((tmp_4_0 = ctx.jobForm.get("siteAddress")) == null ? null : tmp_4_0.value) || "");
            i0.ɵɵadvance(26);
            i0.ɵɵrepeater(ctx.store.installers());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate1(" \u20B5", ctx.totalDoorsPrice().toLocaleString(), " ");
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate1(" \u20B5", (ctx.totalDoorsPrice() + (ctx.jobForm.value.installationFee || 0)).toLocaleString(), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.totalDoorsCount(), " Doors");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" \u20B5", (ctx.totalDoorsPrice() + (ctx.jobForm.value.installationFee || 0)).toLocaleString(), " Total ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.jobForm.invalid || ctx.selectedDoors().length === 0);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Book & Dispatch (", ctx.totalDoorsCount(), " Doors)");
        } }, dependencies: [CommonModule, MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.FormGroupDirective, i2.FormControlName, FormsModule, i2.NgModel, ClientLocationMap], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NewJobModal, [{
        type: Component,
        args: [{
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
                  <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">Auto Map Pin</span>
                </label>
                <div class="relative">
                  <input 
                    id="jobSiteAddress"
                    type="text" 
                    formControlName="siteAddress"
                    placeholder="e.g. Airport Residential Area, Accra (or GPS coordinates)" 
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
                <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Drag pin or click map to pinpoint site gate
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
                <label for="jobInstallerSelect" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assign Lead Technician
                </label>
                <select 
                  id="jobInstallerSelect"
                  formControlName="assignedInstallerId"
                  class="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="">Unassigned (Operations Manager Dispatches)</option>
                  @for (installer of store.installers(); track installer.id) {
                    <option [value]="installer.id">{{ installer.name }} ({{ installer.metrics.avgRating }}★)</option>
                  }
                </select>
              </div>
            </div>
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
                Job Financials & Shop Counter Summary
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
            }]
    }], () => [], { closed: [{ type: i0.Output, args: ["closed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NewJobModal, { className: "NewJobModal", filePath: "frontend/src/app/components/new-job-modal/new-job-modal.ts", lineNumber: 640 }); })();
