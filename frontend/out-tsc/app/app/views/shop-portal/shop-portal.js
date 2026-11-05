import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';
import { ClientLocationMap } from '../../components/client-location-map/client-location-map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _c0 = () => ({ standalone: true });
const _forTrack0 = ($index, $item) => $item.id;
function ShopPortal_Conditional_69_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 52)(1, "div", 53)(2, "div")(3, "span", 54);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h4", 55);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 56);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 57);
    i0.ɵɵtext(10, " Installer Assigned ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 58)(12, "div")(13, "span", 59);
    i0.ɵɵtext(14, "Assigned Installer:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 60)(16, "mat-icon", 61);
    i0.ɵɵtext(17, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "p", 62);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "span", 59);
    i0.ɵɵtext(24, "Site / Client:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 63);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 64)(28, "mat-icon", 65);
    i0.ɵɵtext(29, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(32, "div", 66)(33, "button", 67);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_69_For_10_Template_button_click_33_listener() { const job_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openAssignDriverModal(job_r2)); });
    i0.ɵɵelementStart(34, "mat-icon", 61);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const job_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r2.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", job_r2.dimensions, " \u00B7 ", job_r2.finish);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(job_r2.assignedInstallerName || "Field Technician");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Date: ", job_r2.scheduledDate);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r2.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r2.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(!job_r2.assignedInstallerId ? "px-3.5 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed opacity-60 flex items-center gap-1.5 shadow-none" : "px-3.5 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer");
    i0.ɵɵproperty("disabled", !job_r2.assignedInstallerId)("title", !job_r2.assignedInstallerId ? "Assign dispatch is disabled until an installer is assigned by Operations Manager" : "Assign Store Driver & Dispatch");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(!job_r2.assignedInstallerId ? "lock" : "local_shipping");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(!job_r2.assignedInstallerId ? "Dispatch Disabled (Pending Installer)" : "Assign Store Driver & Dispatch");
} }
function ShopPortal_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "div", 38)(2, "div", 28);
    i0.ɵɵelement(3, "span", 48);
    i0.ɵɵelementStart(4, "h3", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 50);
    i0.ɵɵtext(7, " Operations assigned technician \u00B7 Assign an available store driver to dispatch door ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 51);
    i0.ɵɵrepeaterCreate(9, ShopPortal_Conditional_69_For_10_Template, 38, 14, "div", 52, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Action Required: Installer Assigned \u00B7 Assign Store Dispatch Driver (", ctx_r2.jobsAwaitingDriver().length, ") ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.jobsAwaitingDriver());
} }
function ShopPortal_For_100_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 95);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 96);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", job_r4.shopBooking.amountPaidAtShop.toLocaleString(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", job_r4.shopBooking.paymentMethod, " \u00B7 Ref: ", job_r4.shopBooking.receiptNumber, " ");
} }
function ShopPortal_For_100_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1, "Direct Order");
    i0.ɵɵelementEnd();
} }
function ShopPortal_For_100_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Audited");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "pending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pending Audit");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function ShopPortal_For_100_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84)(1, "mat-icon", 97);
    i0.ɵɵtext(2, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r4.assignedInstallerName);
} }
function ShopPortal_For_100_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85)(1, "mat-icon", 97);
    i0.ɵɵtext(2, "hourglass_top");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Installer: Pending");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86)(1, "mat-icon", 97);
    i0.ɵɵtext(2, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r4.dispatcherName);
} }
function ShopPortal_For_100_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87)(1, "mat-icon", 97);
    i0.ɵɵtext(2, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Approved by Ops");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89)(1, "span", 98)(2, "mat-icon", 61);
    i0.ɵɵtext(3, "hourglass_empty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Installer: Pending");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 99)(7, "mat-icon", 61);
    i0.ɵɵtext(8, "lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Dispatch Disabled");
    i0.ɵɵelementEnd()()();
} }
function ShopPortal_For_100_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 100);
    i0.ɵɵlistener("click", function ShopPortal_For_100_Conditional_43_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const job_r4 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openAssignDriverModal(job_r4)); });
    i0.ɵɵelementStart(1, "mat-icon", 61);
    i0.ɵɵtext(2, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Assign Driver");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Truck Assigned");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 92)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Dispatched to Site");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 93)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Approved & Locked");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_For_100_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 101);
    i0.ɵɵlistener("click", function ShopPortal_For_100_Conditional_47_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const job_r4 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.jobSelected.emit(job_r4.id)); });
    i0.ɵɵtext(1, " Details ");
    i0.ɵɵelementEnd();
} }
function ShopPortal_For_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 36)(1, "td", 68)(2, "p", 69);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 70);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 71);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 72)(9, "div", 73)(10, "mat-icon", 74);
    i0.ɵɵtext(11, "lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "span", 75);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 72)(17, "p", 76);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 77)(20, "mat-icon", 78);
    i0.ɵɵtext(21, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "p", 71);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "td", 68);
    i0.ɵɵconditionalCreate(27, ShopPortal_For_100_Conditional_27_Template, 5, 3, "div")(28, ShopPortal_For_100_Conditional_28_Template, 2, 0, "span", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td", 72);
    i0.ɵɵconditionalCreate(30, ShopPortal_For_100_Conditional_30_Template, 5, 0, "span", 80)(31, ShopPortal_For_100_Conditional_31_Template, 5, 0, "span", 81)(32, ShopPortal_For_100_Conditional_32_Template, 2, 0, "span", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "td", 68)(34, "div", 82)(35, "span", 83);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(37, ShopPortal_For_100_Conditional_37_Template, 5, 1, "div", 84)(38, ShopPortal_For_100_Conditional_38_Template, 5, 0, "div", 85);
    i0.ɵɵconditionalCreate(39, ShopPortal_For_100_Conditional_39_Template, 5, 1, "div", 86);
    i0.ɵɵconditionalCreate(40, ShopPortal_For_100_Conditional_40_Template, 5, 0, "div", 87);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "td", 88);
    i0.ɵɵconditionalCreate(42, ShopPortal_For_100_Conditional_42_Template, 11, 0, "div", 89)(43, ShopPortal_For_100_Conditional_43_Template, 5, 0, "button", 90)(44, ShopPortal_For_100_Conditional_44_Template, 5, 0, "span", 91)(45, ShopPortal_For_100_Conditional_45_Template, 5, 0, "span", 92)(46, ShopPortal_For_100_Conditional_46_Template, 5, 0, "span", 93)(47, ShopPortal_For_100_Conditional_47_Template, 2, 0, "button", 94);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r4.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r4.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r4.dimensions);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(job_r4.lockModel || "Smart Lock Handle");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r4.hardwareSpecs);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r4.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r4.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r4.client.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r4.shopBooking ? 27 : 28);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((job_r4.shopBooking == null ? null : job_r4.shopBooking.accountantVerified) ? 30 : job_r4.shopBooking ? 31 : 32);
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r2.getStatusBadgeClass(job_r4.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", job_r4.status.replace("_", " "), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r4.assignedInstallerName ? 37 : 38);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r4.dispatcherName ? 39 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r4.operationsApproved || job_r4.status === "approved" ? 40 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r4.status === "booked_at_shop" || !job_r4.assignedInstallerId ? 42 : job_r4.status === "assigned" ? 43 : job_r4.status === "truck_assigned" ? 44 : job_r4.status === "dispatched" ? 45 : job_r4.status === "approved" ? 46 : 47);
} }
function ShopPortal_Conditional_117_For_34_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 192);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeShopDoor(ɵ$index_512_r9)); });
    i0.ɵɵelementStart(1, "mat-icon", 193);
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_Conditional_117_For_34_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 192);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Conditional_32_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeShopDoor(ɵ$index_512_r9)); });
    i0.ɵɵelementStart(1, "mat-icon", 193);
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} }
function ShopPortal_Conditional_117_For_34_Conditional_36_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 200);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const catDoor_r13 = ctx.$implicit;
    const door_r14 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("value", catDoor_r13.id)("selected", catDoor_r13.id === door_r14.catalogDoorId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4(" ", catDoor_r13.name, " (", catDoor_r13.modelCode, ") - ", catDoor_r13.formattedPrice || "\u20B5" + catDoor_r13.unitPrice, " \u2022 ", catDoor_r13.category, " ");
} }
function ShopPortal_Conditional_117_For_34_Conditional_36_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 207);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r15);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r15);
} }
function ShopPortal_Conditional_117_For_34_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 191)(1, "div", 194)(2, "div", 195)(3, "label", 196);
    i0.ɵɵtext(4, " Preset Model Template ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 197);
    i0.ɵɵtext(6, " Auto-syncs specs & category ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "select", 198);
    i0.ɵɵlistener("change", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_select_change_7_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onShopDoorCatalogPick(ɵ$index_512_r9, $event)); });
    i0.ɵɵelementStart(8, "option", 199);
    i0.ɵɵtext(9, "-- Select catalog template --");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, ShopPortal_Conditional_117_For_34_Conditional_36_For_11_Template, 2, 6, "option", 200, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 201)(13, "div")(14, "div", 202)(15, "label", 203);
    i0.ɵɵtext(16, "Door Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 204)(18, "mat-icon", 205);
    i0.ɵɵtext(19, "auto_awesome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Auto-Selected");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "select", 206);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_select_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateShopDoorField(ɵ$index_512_r9, "doorCategory", $event)); });
    i0.ɵɵrepeaterCreate(23, ShopPortal_Conditional_117_For_34_Conditional_36_For_24_Template, 2, 2, "option", 207, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div")(26, "label", 208);
    i0.ɵɵtext(27, "Door Model Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "input", 209);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_input_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onShopDoorModelInputChange(ɵ$index_512_r9, $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 201)(30, "div")(31, "label", 208);
    i0.ɵɵtext(32, "Lock Hardware");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "select", 210);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_select_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateShopDoorField(ɵ$index_512_r9, "lockModel", $event)); });
    i0.ɵɵelementStart(34, "option", 211);
    i0.ɵɵtext(35, "Doormaster Smart Lock Handle F35 (Biometric & RFID)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "option", 212);
    i0.ɵɵtext(37, "Doormaster High-Security Italian Mortise Lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "option", 213);
    i0.ɵɵtext(39, "Doormaster Keypad Digital Smart Cylinder");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "option", 214);
    i0.ɵɵtext(41, "Heavy-Duty Multi-Point Deadbolt System");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div")(43, "label", 208);
    i0.ɵɵtext(44, "Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "input", 215);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_input_ngModelChange_45_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateShopDoorField(ɵ$index_512_r9, "dimensions", $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 216)(47, "div")(48, "label", 208);
    i0.ɵɵtext(49, "Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "input", 215);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_input_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateShopDoorField(ɵ$index_512_r9, "dimensions", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div")(52, "label", 208);
    i0.ɵɵtext(53, "Finish / Veneer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "input", 215);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_input_ngModelChange_54_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateShopDoorField(ɵ$index_512_r9, "finish", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div")(56, "label", 208);
    i0.ɵɵtext(57, "Unit Price (\u20B5)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "input", 217);
    i0.ɵɵlistener("ngModelChange", function ShopPortal_Conditional_117_For_34_Conditional_36_Template_input_ngModelChange_58_listener($event) { i0.ɵɵrestoreView(_r12); const ɵ$index_512_r9 = i0.ɵɵnextContext().$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateShopDoorField(ɵ$index_512_r9, "unitPrice", +$event)); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const door_r14 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r2.store.doors());
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngModel", door_r14.doorCategory)("ngModelOptions", i0.ɵɵpureFunction0(14, _c0));
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.getShopCategoryList(door_r14.doorCategory));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", door_r14.doorModel)("ngModelOptions", i0.ɵɵpureFunction0(15, _c0));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", door_r14.lockModel)("ngModelOptions", i0.ɵɵpureFunction0(16, _c0));
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngModel", door_r14.dimensions)("ngModelOptions", i0.ɵɵpureFunction0(17, _c0));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", door_r14.dimensions)("ngModelOptions", i0.ɵɵpureFunction0(18, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", door_r14.finish)("ngModelOptions", i0.ɵɵpureFunction0(19, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", door_r14.unitPrice)("ngModelOptions", i0.ɵɵpureFunction0(20, _c0));
} }
function ShopPortal_Conditional_117_For_34_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 171)(1, "div", 172);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_div_click_1_listener() { const ɵ$index_512_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleShopDoorDropdown(ɵ$index_512_r9)); });
    i0.ɵɵelementStart(2, "div", 173)(3, "div", 174)(4, "span", 175);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 176)(7, "div", 177)(8, "span", 178);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 179);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "span", 180);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 181);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_div_click_14_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵconditionalCreate(15, ShopPortal_Conditional_117_For_34_Conditional_15_Template, 3, 0, "button", 182);
    i0.ɵɵelementStart(16, "button", 183);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_button_click_16_listener() { const ɵ$index_512_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleShopDoorDropdown(ɵ$index_512_r9)); });
    i0.ɵɵelementStart(17, "mat-icon", 109);
    i0.ɵɵtext(18, "expand_more");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(19, "div", 184);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_div_click_19_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(20, "div", 185)(21, "button", 186);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_button_click_21_listener() { const ɵ$index_512_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeShopDoorQty(ɵ$index_512_r9, -1)); });
    i0.ɵɵelementStart(22, "mat-icon", 117);
    i0.ɵɵtext(23, "remove");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "span", 187);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 188);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_button_click_26_listener() { const ɵ$index_512_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeShopDoorQty(ɵ$index_512_r9, 1)); });
    i0.ɵɵelementStart(27, "mat-icon", 117);
    i0.ɵɵtext(28, "add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "span", 189);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 190);
    i0.ɵɵconditionalCreate(32, ShopPortal_Conditional_117_For_34_Conditional_32_Template, 3, 0, "button", 182);
    i0.ɵɵelementStart(33, "button", 183);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_For_34_Template_button_click_33_listener() { const ɵ$index_512_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleShopDoorDropdown(ɵ$index_512_r9)); });
    i0.ɵɵelementStart(34, "mat-icon", 109);
    i0.ɵɵtext(35, "expand_more");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵconditionalCreate(36, ShopPortal_Conditional_117_For_34_Conditional_36_Template, 59, 21, "div", 191);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const door_r14 = ctx.$implicit;
    const ɵ$index_512_r9 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(door_r14.isExpanded ? "border-cyan-500/50 bg-white dark:bg-slate-900 shadow-sm" : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" #", ɵ$index_512_r9 + 1, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(door_r14.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(door_r14.doorCategory);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", door_r14.dimensions, " \u00B7 ", door_r14.finish, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.selectedShopDoors().length > 1 ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("rotate-180", door_r14.isExpanded);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", door_r14.quantity <= 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(door_r14.quantity);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" \u20B5", (door_r14.unitPrice * door_r14.quantity).toLocaleString(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.selectedShopDoors().length > 1 ? 32 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("rotate-180", door_r14.isExpanded);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(door_r14.isExpanded ? 36 : -1);
} }
function ShopPortal_Conditional_117_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "div", 102)(2, "div", 103)(3, "div", 104)(4, "div", 105)(5, "mat-icon", 106);
    i0.ɵɵtext(6, "calendar_month");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h3", 107);
    i0.ɵɵtext(9, "Schedule Installation Request");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 27);
    i0.ɵɵtext(11, "Master Shop Manager: Book door, lock & counter customer payment");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "button", 108);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeScheduleModal()); });
    i0.ɵɵelementStart(13, "mat-icon", 109);
    i0.ɵɵtext(14, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "form", 110);
    i0.ɵɵlistener("ngSubmit", function ShopPortal_Conditional_117_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitBooking()); });
    i0.ɵɵelementStart(16, "div", 111)(17, "div", 112)(18, "div", 113)(19, "span", 114)(20, "mat-icon", 61);
    i0.ɵɵtext(21, "meeting_room");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 28)(25, "span", 115);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 116);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addShopDoorFromCatalog()); });
    i0.ɵɵelementStart(28, "mat-icon", 117);
    i0.ɵɵtext(29, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "+ Add Door");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(32, "div", 118);
    i0.ɵɵrepeaterCreate(33, ShopPortal_Conditional_117_For_34_Template, 37, 17, "div", 119, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div")(36, "label", 120);
    i0.ɵɵtext(37, "Dispatching Shop Branch");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "select", 121)(39, "option", 122);
    i0.ɵɵtext(40, "Accra Central Showroom");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "option", 123);
    i0.ɵɵtext(42, "Spintex Road Workshop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "option", 124);
    i0.ɵɵtext(44, "East Legon Atelier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "option", 125);
    i0.ɵɵtext(46, "Tema Harbor Depot");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(47, "div", 126)(48, "span", 127)(49, "mat-icon", 61);
    i0.ɵɵtext(50, "person_pin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span");
    i0.ɵɵtext(52, "2. Client & Site Location Details");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "div", 128)(54, "div")(55, "label", 129);
    i0.ɵɵtext(56, "Client Full Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(57, "input", 130);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div")(59, "label", 131);
    i0.ɵɵtext(60, "Phone Number *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(61, "input", 132);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div")(63, "label", 133);
    i0.ɵɵtext(64, "Email Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(65, "input", 134);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "div", 135)(67, "div")(68, "label", 136)(69, "span");
    i0.ɵɵtext(70, "Site Location / Address / GPS *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span", 137);
    i0.ɵɵtext(72, "Auto Live Pin");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(73, "div", 138);
    i0.ɵɵelement(74, "input", 139);
    i0.ɵɵelementStart(75, "mat-icon", 140);
    i0.ɵɵtext(76, "location_on");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(77, "div")(78, "label", 141);
    i0.ɵɵtext(79, "Site Access Instructions");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(80, "input", 142);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(81, "div", 143)(82, "div", 144)(83, "span", 145)(84, "mat-icon", 146);
    i0.ɵɵtext(85, "map");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "span");
    i0.ɵɵtext(87, "Client Site Location Radar & GPS Pin");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(88, "span", 147);
    i0.ɵɵtext(89, " Drag pin or click map to pinpoint site gate ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(90, "app-client-location-map", 148);
    i0.ɵɵlistener("locationSelected", function ShopPortal_Conditional_117_Template_app_client_location_map_locationSelected_90_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onShopSiteLocationSelected($event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(91, "div", 126)(92, "span", 149)(93, "mat-icon", 61);
    i0.ɵɵtext(94, "payments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "span");
    i0.ɵɵtext(96, "3. Schedule & Shop Counter Payment Collection");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(97, "div", 135)(98, "div")(99, "label", 150);
    i0.ɵɵtext(100, "Installation Date *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(101, "input", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(102, "div")(103, "label", 152);
    i0.ɵɵtext(104, "Estimated Installation Time (Hours)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(105, "input", 153);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(106, "div", 154)(107, "div")(108, "label", 155);
    i0.ɵɵtext(109, "Amount Paid at Shop Counter (\u20B5) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(110, "input", 156);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(111, "div")(112, "label", 157);
    i0.ɵɵtext(113, "Payment Method *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(114, "select", 158)(115, "option", 159);
    i0.ɵɵtext(116, "MTN / Telecel MoMo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(117, "option", 160);
    i0.ɵɵtext(118, "Counter Cash");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(119, "option", 161);
    i0.ɵɵtext(120, "POS Terminal (Card)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(121, "option", 162);
    i0.ɵɵtext(122, "Direct Bank Transfer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(123, "div")(124, "label", 163);
    i0.ɵɵtext(125, "Shop Receipt / Reference # *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(126, "input", 164);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(127, "div", 165)(128, "div", 166)(129, "span", 76);
    i0.ɵɵtext(130);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(131, "span");
    i0.ɵɵtext(132, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(133, "span", 167);
    i0.ɵɵtext(134);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(135, "div", 168)(136, "button", 169);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_117_Template_button_click_136_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeScheduleModal()); });
    i0.ɵɵtext(137, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(138, "button", 170)(139, "mat-icon", 106);
    i0.ɵɵtext(140, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(141, "span");
    i0.ɵɵtext(142, "Submit Installation Request");
    i0.ɵɵelementEnd()()()()()()();
} if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("formGroup", ctx_r2.bookingForm);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("1. Door & Lock Specifications (", ctx_r2.totalShopDoorsCount(), " Units Selected)");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Total: \u20B5", ctx_r2.totalShopDoorsPrice().toLocaleString(), " ");
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.selectedShopDoors());
    i0.ɵɵadvance(57);
    i0.ɵɵproperty("address", ((tmp_5_0 = ctx_r2.bookingForm.get("siteAddress")) == null ? null : tmp_5_0.value) || "");
    i0.ɵɵadvance(40);
    i0.ɵɵtextInterpolate1("", ctx_r2.totalShopDoorsCount(), " Units");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" \u20B5", ctx_r2.totalShopDoorsPrice().toLocaleString(), " Total ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.bookingForm.valid);
} }
function ShopPortal_Conditional_118_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 207);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r17 = ctx.$implicit;
    i0.ɵɵproperty("value", d_r17.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4(" ", d_r17.name, " \u00B7 ", d_r17.assignedTruck.plate, " (", d_r17.assignedTruck.model, ") - ", d_r17.status.toUpperCase(), " ");
} }
function ShopPortal_Conditional_118_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 46)(1, "div", 218)(2, "div", 219)(3, "div", 104)(4, "div", 105)(5, "mat-icon", 106);
    i0.ɵɵtext(6, "local_shipping");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h3", 107);
    i0.ɵɵtext(9, "Assign Store Dispatch Driver");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 27);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "button", 220);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_118_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeAssignDriverModal()); });
    i0.ɵɵelementStart(13, "mat-icon", 109);
    i0.ɵɵtext(14, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "form", 221);
    i0.ɵɵlistener("ngSubmit", function ShopPortal_Conditional_118_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmDriverDispatch()); });
    i0.ɵɵelementStart(16, "div", 222)(17, "div", 223)(18, "span", 224);
    i0.ɵɵtext(19, "Installation Destination");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 225);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 226)(23, "div")(24, "p", 76);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 227)(27, "mat-icon", 65);
    i0.ɵɵtext(28, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 176);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "p", 71);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div")(34, "span", 59);
    i0.ɵɵtext(35, "Assigned Installer:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "p", 60)(37, "mat-icon", 61);
    i0.ɵɵtext(38, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "span", 228);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "div", 229)(44, "label", 230);
    i0.ɵɵtext(45, " Select Dispatch Driver Available to Store * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "select", 231);
    i0.ɵɵlistener("change", function ShopPortal_Conditional_118_Template_select_change_46_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDriverSelected($event)); });
    i0.ɵɵrepeaterCreate(47, ShopPortal_Conditional_118_For_48_Template, 2, 5, "option", 207, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "div", 135)(50, "div")(51, "label", 232);
    i0.ɵɵtext(52, "Truck Plate #");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(53, "input", 233);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div")(55, "label", 234);
    i0.ɵɵtext(56, "Estimated Departure");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(57, "input", 235);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "div")(59, "label", 236);
    i0.ɵɵtext(60, " Cargo Handover & Delivery Notes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(61, "input", 237);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div", 238)(63, "span", 239);
    i0.ɵɵtext(64, " Driver, Operations & Client will receive SMS alerts ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 240)(66, "button", 241);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_118_Template_button_click_66_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeAssignDriverModal()); });
    i0.ɵɵtext(67, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "button", 242)(69, "mat-icon", 106);
    i0.ɵɵtext(70, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span");
    i0.ɵɵtext(72, "Dispatch Door from Store");
    i0.ɵɵelementEnd()()()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const job_r18 = ctx_r2.activeAssignDriverJob();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate2("Order ", job_r18.id, " \u00B7 ", job_r18.doorModel);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r2.driverAssignForm);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Ref: ", job_r18.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r18.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r18.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r18.client.phone);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(job_r18.assignedInstallerName || "Technician");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Scheduled: ", job_r18.scheduledDate);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.store.dispatchers());
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("disabled", !ctx_r2.driverAssignForm.valid);
} }
function ShopPortal_Conditional_119_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 249)(1, "mat-icon", 276);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 277);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.locationSettingsFeedback());
} }
function ShopPortal_Conditional_119_Conditional_132_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 278);
    i0.ɵɵtext(1, "refresh");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Saving to DB...");
    i0.ɵɵelementEnd();
} }
function ShopPortal_Conditional_119_Conditional_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 106);
    i0.ɵɵtext(1, "save");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Save Location to Database");
    i0.ɵɵelementEnd();
} }
function ShopPortal_Conditional_119_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "div", 102)(2, "div", 243)(3, "div", 104)(4, "div", 244)(5, "mat-icon", 109);
    i0.ɵɵtext(6, "storefront");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h2", 245)(9, "span");
    i0.ɵɵtext(10, "Shop Location & Workshop Settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 246);
    i0.ɵɵtext(12, " MySQL DB ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "p", 41);
    i0.ɵɵtext(14, "Configure store origin, address, GPS coordinates and dispatch logistics radius");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "button", 247);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeLocationSettingsModal()); });
    i0.ɵɵelementStart(16, "mat-icon", 106);
    i0.ɵɵtext(17, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "form", 248);
    i0.ɵɵlistener("ngSubmit", function ShopPortal_Conditional_119_Template_form_ngSubmit_18_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.saveLocationSettings()); });
    i0.ɵɵconditionalCreate(19, ShopPortal_Conditional_119_Conditional_19_Template, 5, 1, "div", 249);
    i0.ɵɵelementStart(20, "div", 112)(21, "h3", 250)(22, "mat-icon", 40);
    i0.ɵɵtext(23, "business");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Branch Identity");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 128)(27, "div", 251)(28, "label", 252);
    i0.ɵɵtext(29, "Shop / Workshop Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 253);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 82)(32, "label", 252);
    i0.ɵɵtext(33, "Branch Code *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 254);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(35, "div", 255)(36, "h3", 250)(37, "mat-icon", 40);
    i0.ɵɵtext(38, "pin_drop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Physical Address & Corridor");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 82)(42, "label", 252);
    i0.ɵɵtext(43, "Street Address & Landmark *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(44, "input", 256);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 135)(46, "div", 82)(47, "label", 252);
    i0.ɵɵtext(48, "City *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(49, "input", 257);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 82)(51, "label", 252);
    i0.ɵɵtext(52, "Region");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(53, "input", 258);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(54, "div", 255)(55, "div", 223)(56, "h3", 250)(57, "mat-icon", 40);
    i0.ɵɵtext(58, "my_location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span");
    i0.ɵɵtext(60, "Store GPS Coordinates & Origin");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "button", 259);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.detectBrowserGps()); });
    i0.ɵɵelementStart(62, "mat-icon", 61);
    i0.ɵɵtext(63, "gps_fixed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "span");
    i0.ɵɵtext(65, "Use Device GPS");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(66, "div", 260)(67, "div", 82)(68, "label", 252);
    i0.ɵɵtext(69, "Latitude *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(70, "input", 261);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "div", 82)(72, "label", 252);
    i0.ɵɵtext(73, "Longitude *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(74, "input", 262);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "div", 263)(76, "span", 264);
    i0.ɵɵtext(77, "Quick Accra Hub Location Presets:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "div", 265)(79, "button", 266);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_79_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCoordinates(5.6231, -0.1582, "Plot 48, Spintex Road Industrial Area")); });
    i0.ɵɵtext(80, " \uD83C\uDFED Spintex Atelier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "button", 266);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_81_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCoordinates(5.556, -0.2012, "High Street Boulevard, Central Business District")); });
    i0.ɵɵtext(82, " \uD83C\uDFDB\uFE0F Accra Central ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "button", 266);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_83_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCoordinates(5.638, -0.155, "Boundary Road, East Legon")); });
    i0.ɵɵtext(84, " \uD83D\uDCCD East Legon ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(85, "button", 266);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_85_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCoordinates(5.6698, -0.0166, "Harbor Commercial Gateway, Tema")); });
    i0.ɵɵtext(86, " \uD83D\uDEA2 Tema Harbor ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "button", 266);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_87_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCoordinates(5.584, -0.178, "Rangoon Lane, Cantonments Diplomatic Zone")); });
    i0.ɵɵtext(88, " \uD83D\uDCCD Cantonments ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(89, "div", 255)(90, "h3", 250)(91, "mat-icon", 40);
    i0.ɵɵtext(92, "contact_phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "span");
    i0.ɵɵtext(94, "Operations, Counter & Manager Details");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(95, "div", 135)(96, "div", 82)(97, "label", 252);
    i0.ɵɵtext(98, "Shop Manager Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(99, "input", 267);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "div", 82)(101, "label", 252);
    i0.ɵɵtext(102, "Dispatch Logistics Radius (km) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "div", 28);
    i0.ɵɵelement(104, "input", 268);
    i0.ɵɵelementStart(105, "span", 269);
    i0.ɵɵtext(106, "km");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(107, "div", 135)(108, "div", 82)(109, "label", 252);
    i0.ɵɵtext(110, "Workshop Phone (SMS Alerts) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(111, "input", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "div", 82)(113, "label", 252);
    i0.ɵɵtext(114, "Workshop Official Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(115, "input", 271);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(116, "div", 82)(117, "label", 252);
    i0.ɵɵtext(118, "Operating / Dispatch Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(119, "input", 272);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(120, "div", 273)(121, "div", 274)(122, "mat-icon", 78);
    i0.ɵɵtext(123, "database");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(124, "span");
    i0.ɵɵtext(125, "Persisted in MySQL table ");
    i0.ɵɵelementStart(126, "code", 275);
    i0.ɵɵtext(127, "shop_locations");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(128, "div", 240)(129, "button", 241);
    i0.ɵɵlistener("click", function ShopPortal_Conditional_119_Template_button_click_129_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeLocationSettingsModal()); });
    i0.ɵɵtext(130, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(131, "button", 242);
    i0.ɵɵconditionalCreate(132, ShopPortal_Conditional_119_Conditional_132_Template, 4, 0)(133, ShopPortal_Conditional_119_Conditional_133_Template, 4, 0);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("formGroup", ctx_r2.locationSettingsForm);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.locationSettingsFeedback() ? 19 : -1);
    i0.ɵɵadvance(112);
    i0.ɵɵproperty("disabled", !ctx_r2.locationSettingsForm.valid || ctx_r2.isSavingLocationSettings());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.isSavingLocationSettings() ? 132 : 133);
} }
export class ShopPortal {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    jobSelected = output();
    newJobOpened = output();
    settingsOpened = output();
    showScheduleModal = signal(false, ...(ngDevMode ? [{ debugName: "showScheduleModal" }] : /* istanbul ignore next */ []));
    bookingForm = new FormGroup({
        doorModel: new FormControl('Turkey interior DM001', { nonNullable: true, validators: [Validators.required] }),
        doorCategory: new FormControl('Turkey interior series', { nonNullable: true }),
        lockModel: new FormControl('Doormaster Smart Lock Handle F35 (Biometric & RFID)', { nonNullable: true, validators: [Validators.required] }),
        dimensions: new FormControl('2100 × 900 × 45mm', { nonNullable: true, validators: [Validators.required] }),
        finish: new FormControl('Walnut Natural Wood Grain', { nonNullable: true }),
        hardwareSpecs: new FormControl('Heavy-Duty Concealed Hinges & 3-Point Lockset', { nonNullable: true }),
        shopBranch: new FormControl('DoorMaster Flagship Showroom - Accra Central', { nonNullable: true }),
        clientName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        clientPhone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        clientEmail: new FormControl('', { nonNullable: true }),
        siteAddress: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        accessInstructions: new FormControl('', { nonNullable: true }),
        scheduledDate: new FormControl(new Date(Date.now() + 86400000).toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
        estimatedHours: new FormControl(4, { nonNullable: true, validators: [Validators.min(1)] }),
        doorPrice: new FormControl(4750, { nonNullable: true }),
        installationFee: new FormControl(450, { nonNullable: true }),
        amountPaidAtShop: new FormControl(4750, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
        paymentMethod: new FormControl('momo', { nonNullable: true }),
        receiptNumber: new FormControl(`REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`, { nonNullable: true, validators: [Validators.required] })
    });
    selectedShopDoors = signal([
        {
            id: `shop_door_${Date.now()}_1`,
            doorCategory: 'Turkey interior series',
            doorModel: 'Turkey interior DM001 Acoustic Interior Door',
            dimensions: '2100 × 900 × 45mm',
            finish: 'Walnut Natural Wood Grain',
            hardwareSpecs: 'Heavy-Duty Concealed Hinges & 3-Point Lockset',
            lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
            unitPrice: 4750,
            quantity: 1,
            isExpanded: true
        }
    ], ...(ngDevMode ? [{ debugName: "selectedShopDoors" }] : /* istanbul ignore next */ []));
    totalShopDoorsPrice = computed(() => {
        return this.selectedShopDoors().reduce((acc, d) => acc + (d.unitPrice * d.quantity), 0);
    }, ...(ngDevMode ? [{ debugName: "totalShopDoorsPrice" }] : /* istanbul ignore next */ []));
    totalShopDoorsCount = computed(() => {
        return this.selectedShopDoors().reduce((acc, d) => acc + d.quantity, 0);
    }, ...(ngDevMode ? [{ debugName: "totalShopDoorsCount" }] : /* istanbul ignore next */ []));
    // Shop Location Settings state & reactive binding
    showLocationSettingsModal = signal(false, ...(ngDevMode ? [{ debugName: "showLocationSettingsModal" }] : /* istanbul ignore next */ []));
    isSavingLocationSettings = signal(false, ...(ngDevMode ? [{ debugName: "isSavingLocationSettings" }] : /* istanbul ignore next */ []));
    locationSettingsFeedback = signal(null, ...(ngDevMode ? [{ debugName: "locationSettingsFeedback" }] : /* istanbul ignore next */ []));
    locationSettingsForm = new FormGroup({
        shopName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        branchCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        region: new FormControl('', { nonNullable: true }),
        phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl('', { nonNullable: true }),
        managerName: new FormControl('', { nonNullable: true }),
        dispatchRadiusKm: new FormControl(25, { nonNullable: true, validators: [Validators.min(1), Validators.max(200)] }),
        operatingHours: new FormControl('Mon - Sat: 08:00 - 18:00', { nonNullable: true }),
        latitude: new FormControl(5.6231, { nonNullable: true, validators: [Validators.required] }),
        longitude: new FormControl(-0.1582, { nonNullable: true, validators: [Validators.required] })
    });
    currentBranch = computed(() => this.store.shopLocation().shopName, ...(ngDevMode ? [{ debugName: "currentBranch" }] : /* istanbul ignore next */ []));
    bookedAtShopCount = computed(() => {
        return this.store.jobs().filter(j => j.status === 'booked_at_shop').length;
    }, ...(ngDevMode ? [{ debugName: "bookedAtShopCount" }] : /* istanbul ignore next */ []));
    dispatchedCount = computed(() => {
        return this.store.jobs().filter(j => j.status === 'dispatched' || j.status === 'on_site').length;
    }, ...(ngDevMode ? [{ debugName: "dispatchedCount" }] : /* istanbul ignore next */ []));
    jobsAwaitingDriver = computed(() => this.store.shopPendingDriverJobs(), ...(ngDevMode ? [{ debugName: "jobsAwaitingDriver" }] : /* istanbul ignore next */ []));
    activeAssignDriverJob = signal(null, ...(ngDevMode ? [{ debugName: "activeAssignDriverJob" }] : /* istanbul ignore next */ []));
    driverAssignForm = new FormGroup({
        dispatcherId: new FormControl('disp_01', { nonNullable: true, validators: [Validators.required] }),
        truckPlate: new FormControl('GT-4821-26', { nonNullable: true, validators: [Validators.required] }),
        truckModel: new FormControl('Mercedes-Benz Atego 3.5T Heavy Flatbed Hauler', { nonNullable: true }),
        deliveryNotes: new FormControl('Direct store counter handover. Padded blankets applied.', { nonNullable: true }),
        estimatedDeparture: new FormControl('Dispatched immediately from store', { nonNullable: true })
    });
    openScheduleModal() {
        this.selectedShopDoors.set([
            {
                id: `shop_door_${Date.now()}_1`,
                doorCategory: 'Turkey interior series',
                doorModel: 'Turkey interior DM001 Acoustic Interior Door',
                dimensions: '2100 × 900 × 45mm',
                finish: 'Walnut Natural Wood Grain',
                hardwareSpecs: 'Heavy-Duty Concealed Hinges & 3-Point Lockset',
                lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
                unitPrice: 4750,
                quantity: 1,
                isExpanded: true
            }
        ]);
        this.bookingForm.patchValue({
            receiptNumber: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            shopBranch: this.store.shopLocation().shopName,
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            siteAddress: '',
            amountPaidAtShop: this.totalShopDoorsPrice()
        });
        this.showScheduleModal.set(true);
    }
    // Client site coordinates tracked from location map
    selectedShopSiteCoordinates = signal({ lat: 5.5840, lng: -0.1780 }, ...(ngDevMode ? [{ debugName: "selectedShopSiteCoordinates" }] : /* istanbul ignore next */ []));
    onShopSiteLocationSelected(loc) {
        this.selectedShopSiteCoordinates.set({ lat: loc.lat, lng: loc.lng });
        // NEVER overwrite manual text entry! Only populate if user explicitly clicked a preset zone or GPS button
        if (loc.isExplicitUserAction) {
            this.bookingForm.patchValue({ siteAddress: `${loc.district || loc.address}, Accra` });
        }
    }
    closeScheduleModal() {
        this.showScheduleModal.set(false);
    }
    getShopCategoryList(currentCat) {
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
        if (currentCat && currentCat.trim())
            set.add(currentCat.trim());
        [...dbCats, ...doorCats, ...standardCats].forEach(c => {
            if (c && c.trim())
                set.add(c.trim());
        });
        return Array.from(set);
    }
    inferShopCategoryFromModel(title) {
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
    onShopDoorModelInputChange(index, newTitle) {
        const inferred = this.inferShopCategoryFromModel(newTitle);
        this.selectedShopDoors.update(doors => {
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
    onShopDoorCatalogPick(index, event) {
        const doorId = event.target.value;
        if (!doorId)
            return;
        const catDoor = this.store.doors().find(d => d.id === doorId);
        if (!catDoor)
            return;
        this.selectedShopDoors.update(doors => {
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
        this.bookingForm.patchValue({
            amountPaidAtShop: this.totalShopDoorsPrice()
        });
        this.alert.toastSuccess('Door Preset Applied', `Category auto-selected: ${catDoor.category}`);
    }
    toggleShopDoorDropdown(index) {
        this.selectedShopDoors.update(doors => {
            return doors.map((d, i) => i === index ? { ...d, isExpanded: !d.isExpanded } : d);
        });
    }
    addShopDoorFromCatalog(catalogDoorId) {
        const catDoor = catalogDoorId ? this.store.doors().find(d => d.id === catalogDoorId) : null;
        let newDoor;
        if (catDoor) {
            newDoor = {
                id: `shop_door_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
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
                id: `shop_door_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                doorCategory: 'Premium Villa Series',
                doorModel: 'AeroPivot 900 Architectural Entrance Door',
                dimensions: '2400 × 1200 × 55mm',
                finish: 'Smoked European Oak with Matt Black PVD',
                hardwareSpecs: 'FritsJurgens System M+ Pivot, 3-Point Magnetic Lock',
                lockModel: 'Doormaster Smart Lock Handle F35 (Biometric & RFID)',
                unitPrice: 5200,
                quantity: 1,
                isExpanded: true
            };
        }
        this.selectedShopDoors.update(doors => [...doors, newDoor]);
        this.bookingForm.patchValue({
            amountPaidAtShop: this.totalShopDoorsPrice()
        });
    }
    removeShopDoor(index) {
        if (this.selectedShopDoors().length <= 1)
            return;
        this.selectedShopDoors.update(doors => doors.filter((_, i) => i !== index));
        this.bookingForm.patchValue({
            amountPaidAtShop: this.totalShopDoorsPrice()
        });
    }
    changeShopDoorQty(index, delta) {
        this.selectedShopDoors.update(doors => {
            return doors.map((d, i) => {
                if (i !== index)
                    return d;
                return { ...d, quantity: Math.max(1, d.quantity + delta) };
            });
        });
        this.bookingForm.patchValue({
            amountPaidAtShop: this.totalShopDoorsPrice()
        });
    }
    updateShopDoorField(index, field, value) {
        this.selectedShopDoors.update(doors => {
            return doors.map((d, i) => {
                if (i !== index)
                    return d;
                return { ...d, [field]: value };
            });
        });
        if (field === 'unitPrice' || field === 'quantity') {
            this.bookingForm.patchValue({
                amountPaidAtShop: this.totalShopDoorsPrice()
            });
        }
    }
    submitBooking() {
        if (!this.bookingForm.valid || this.selectedShopDoors().length === 0) {
            this.bookingForm.markAllAsTouched();
            this.alert.toastWarning('Incomplete Booking', 'Please select at least one door model and provide client contact details.');
            return;
        }
        const val = this.bookingForm.getRawValue();
        const doors = this.selectedShopDoors();
        const primaryDoor = doors[0];
        const totalDoorsPrice = this.totalShopDoorsPrice();
        this.store.bookInstallationByShopManager({
            doorModel: doors.map(d => `${d.quantity > 1 ? d.quantity + '× ' : ''}${d.doorModel}`).join('; '),
            doorCategory: primaryDoor.doorCategory,
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
            lockModel: primaryDoor.lockModel,
            dimensions: primaryDoor.dimensions,
            finish: primaryDoor.finish,
            hardwareSpecs: primaryDoor.hardwareSpecs,
            shopBranch: val.shopBranch,
            clientName: val.clientName,
            clientPhone: val.clientPhone,
            clientEmail: val.clientEmail || 'client@doormaster.online',
            siteAddress: val.siteAddress,
            coordinates: this.selectedShopSiteCoordinates(),
            accessInstructions: val.accessInstructions,
            scheduledDate: val.scheduledDate,
            estimatedHours: val.estimatedHours,
            doorPrice: totalDoorsPrice,
            installationFee: val.installationFee,
            amountPaidAtShop: val.amountPaidAtShop,
            paymentMethod: val.paymentMethod,
            receiptNumber: val.receiptNumber
        });
        this.closeScheduleModal();
        this.alert.success('Installation Booked!', `Order booked for ${val.clientName}. Deposit of ₵${Number(val.amountPaidAtShop).toLocaleString()} recorded via ${val.paymentMethod.toUpperCase()}.`);
    }
    openAssignDriverModal(job) {
        if (!job.assignedInstallerId) {
            this.alert.warning('Installer Assignment Required', 'Assign dispatch is disabled until an installer has been assigned to this job by Operations Manager.');
            return;
        }
        this.activeAssignDriverJob.set(job);
        const available = this.store.dispatchers().filter(d => d.status === 'available');
        const defaultDisp = available.length > 0 ? available[0] : this.store.dispatchers()[0];
        if (defaultDisp) {
            this.driverAssignForm.patchValue({
                dispatcherId: defaultDisp.id,
                truckPlate: defaultDisp.assignedTruck.plate,
                truckModel: defaultDisp.assignedTruck.model
            });
        }
    }
    closeAssignDriverModal() {
        this.activeAssignDriverJob.set(null);
    }
    onDriverSelected(event) {
        const dispId = event.target.value;
        const disp = this.store.dispatchers().find(d => d.id === dispId);
        if (disp) {
            this.driverAssignForm.patchValue({
                dispatcherId: disp.id,
                truckPlate: disp.assignedTruck.plate,
                truckModel: disp.assignedTruck.model
            });
        }
    }
    confirmDriverDispatch() {
        const job = this.activeAssignDriverJob();
        if (!job || !this.driverAssignForm.valid)
            return;
        const val = this.driverAssignForm.getRawValue();
        this.store.assignDispatchDriverByShop(job.id, {
            dispatcherId: val.dispatcherId,
            truckPlate: val.truckPlate,
            truckModel: val.truckModel,
            deliveryNotes: val.deliveryNotes,
            estimatedDeparture: val.estimatedDeparture
        });
        this.closeAssignDriverModal();
        this.alert.toastSuccess('Driver Dispatched', `Job cargo assigned to transport truck ${val.truckPlate}.`);
    }
    openLocationSettingsModal() {
        const loc = this.store.shopLocation();
        this.locationSettingsForm.patchValue({
            shopName: loc.shopName || '',
            branchCode: loc.branchCode || '',
            address: loc.address || '',
            city: loc.city || '',
            region: loc.region || '',
            phone: loc.phone || '',
            email: loc.email || '',
            managerName: loc.managerName || '',
            dispatchRadiusKm: loc.dispatchRadiusKm || 25,
            operatingHours: loc.operatingHours || 'Mon - Sat: 08:00 - 18:00',
            latitude: loc.latitude || 5.6231,
            longitude: loc.longitude || -0.1582
        });
        this.locationSettingsFeedback.set(null);
        this.showLocationSettingsModal.set(true);
    }
    closeLocationSettingsModal() {
        this.showLocationSettingsModal.set(false);
    }
    setCoordinates(lat, lng, addressPreset) {
        this.locationSettingsForm.patchValue({
            latitude: lat,
            longitude: lng
        });
        if (addressPreset) {
            this.locationSettingsForm.patchValue({ address: addressPreset });
        }
    }
    detectBrowserGps() {
        if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.locationSettingsForm.patchValue({
                    latitude: Number(pos.coords.latitude.toFixed(5)),
                    longitude: Number(pos.coords.longitude.toFixed(5))
                });
            }, (err) => {
                console.warn('Geolocation failed:', err);
            }, { enableHighAccuracy: true, timeout: 6000 });
        }
    }
    async saveLocationSettings() {
        if (!this.locationSettingsForm.valid) {
            this.alert.toastWarning('Incomplete Fields', 'Please fill in all required workshop location fields.');
            return;
        }
        this.isSavingLocationSettings.set(true);
        this.locationSettingsFeedback.set(null);
        const val = this.locationSettingsForm.getRawValue();
        try {
            const result = await this.store.updateShopLocation({
                shopName: val.shopName,
                branchCode: val.branchCode,
                address: val.address,
                city: val.city,
                region: val.region,
                phone: val.phone,
                email: val.email,
                managerName: val.managerName,
                dispatchRadiusKm: Number(val.dispatchRadiusKm),
                operatingHours: val.operatingHours,
                latitude: Number(val.latitude),
                longitude: Number(val.longitude)
            });
            this.isSavingLocationSettings.set(false);
            if (result.success) {
                this.locationSettingsFeedback.set(result.message || 'Shop location settings saved to database.');
                this.alert.success('Location Saved', 'Workshop branch location and GPS coordinates saved to database.');
                setTimeout(() => {
                    this.closeLocationSettingsModal();
                }, 1200);
            }
            else {
                this.alert.error('Save Failed', result.message || 'Could not update workshop location.');
            }
        }
        catch (err) {
            this.isSavingLocationSettings.set(false);
            this.alert.networkError('Network Error', 'Could not reach server. Settings saved to local storage.');
        }
    }
    getStatusBadgeClass(status) {
        switch (status) {
            case 'booked_at_shop':
                return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
            case 'assigned':
                return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-bold';
            case 'truck_assigned':
            case 'site_funds_dispatched':
                return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-800';
            case 'dispatched':
                return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
            case 'delivered_on_site':
            case 'on_site':
                return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
            case 'completed':
                return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
            default:
                return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
        }
    }
    static ɵfac = function ShopPortal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ShopPortal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ShopPortal, selectors: [["app-shop-portal"]], outputs: { jobSelected: "jobSelected", newJobOpened: "newJobOpened", settingsOpened: "settingsOpened" }, decls: 120, vars: 14, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-2", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-wrap", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], ["type", "button", "title", "Click to view & edit store workshop location in MySQL database", 1, "inline-flex", "items-center", "gap-1.5", "text-[11px]", "font-bold", "text-cyan-800", "dark:text-cyan-300", "hover:text-cyan-900", "dark:hover:text-cyan-200", "bg-cyan-50", "dark:bg-cyan-950/70", "px-2.5", "py-0.5", "rounded-lg", "border", "border-cyan-200", "dark:border-cyan-800", "transition-all", "shadow-xs", "cursor-pointer", 3, "click"], [1, "!text-xs", "!w-3.5", "!h-3.5", "text-cyan-600", "dark:text-cyan-400"], [1, "text-slate-400", "font-normal"], [1, "text-xl", "sm:text-2xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "flex", "flex-wrap", "items-center", "gap-2"], ["type", "button", "title", "Configure shop workshop location, GPS, radius and branch details in System Settings", 1, "px-3.5", "py-2", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "bg-white", "dark:bg-slate-800", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700", "rounded-xl", "transition-all", "flex", "items-center", "gap-1.5", "shadow-xs", "active:scale-95", "cursor-pointer", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-cyan-600", "dark:text-cyan-400"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-white", "bg-cyan-700", "hover:bg-cyan-800", "dark:bg-cyan-600", "dark:hover:bg-cyan-500", "rounded-xl", "transition-all", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-[11px]", "font-semibold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-extrabold", "font-mono", "text-slate-900", "dark:text-white", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-amber-700", "dark:text-amber-400", "font-bold"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2"], [1, "text-2xl", "font-extrabold", "font-mono", "text-cyan-700", "dark:text-cyan-400", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "text-3xl", "font-extrabold", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tracking-tight", "tabular-nums"], [1, "bg-cyan-950/20", "dark:bg-cyan-950/40", "border", "border-cyan-400", "dark:border-cyan-800", "rounded-2xl", "p-4", "sm:p-5", "shadow-sm", "space-y-3"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-xs"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "border-collapse", "text-xs"], [1, "border-b", "border-slate-200", "dark:border-slate-800", "bg-slate-50/80", "dark:bg-slate-800/60", "text-[11px]", "font-semibold", "text-slate-600", "dark:text-slate-400", "uppercase", "tracking-wider"], [1, "py-3", "px-4"], [1, "py-3", "px-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800"], [1, "hover:bg-slate-50/80", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "space-y-3", "pt-4", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-2"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-2"], [1, "!text-sm", "text-cyan-600"], [1, "text-xs", "text-slate-500"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400"], [1, "text-xs", "font-mono", "font-bold", "text-cyan-700", "dark:text-cyan-400", "bg-cyan-50", "dark:bg-cyan-950", "px-2.5", "py-1", "rounded-lg", "border", "border-cyan-200", "dark:border-cyan-800"], [3, "mode", "shopBranchFilter"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-2.5", "sm:p-4", "bg-slate-950/70", "backdrop-blur-xs", "overflow-y-auto"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-3", "sm:p-4", "bg-slate-950/70", "backdrop-blur-xs", "overflow-y-auto"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-2.5", "sm:p-4", "bg-slate-950/75", "backdrop-blur-xs", "overflow-y-auto"], [1, "w-3", "h-3", "rounded-full", "bg-cyan-500", "animate-ping"], [1, "text-sm", "font-extrabold", "text-cyan-900", "dark:text-cyan-200", "uppercase", "tracking-wider"], [1, "text-xs", "text-cyan-800", "dark:text-cyan-300", "font-mono"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-3.5"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-cyan-200", "dark:border-cyan-800", "shadow-xs", "space-y-3"], [1, "flex", "items-start", "justify-between", "gap-2", "border-b", "border-slate-100", "dark:border-slate-800", "pb-2"], [1, "font-mono", "text-[11px]", "font-extrabold", "text-cyan-700", "dark:text-cyan-400"], [1, "font-bold", "text-slate-900", "dark:text-white", "text-sm"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400"], [1, "text-[10px]", "uppercase", "font-bold", "bg-amber-100", "dark:bg-amber-950/70", "text-amber-800", "dark:text-amber-300", "px-2", "py-0.5", "rounded", "border", "border-amber-200", "dark:border-amber-800"], [1, "grid", "grid-cols-2", "gap-2", "text-xs"], [1, "text-[10px]", "text-slate-400", "uppercase", "font-bold", "block"], [1, "font-bold", "text-emerald-700", "dark:text-emerald-400", "flex", "items-center", "gap-1"], [1, "!text-xs"], [1, "text-[11px]", "text-slate-500", "font-mono", "mt-0.5"], [1, "font-bold", "text-slate-900", "dark:text-white", "truncate"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "truncate", "flex", "items-center", "gap-0.5"], [1, "!text-xs", "text-red-500"], [1, "pt-2", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-end"], ["type", "button", 3, "click", "disabled", "title"], [1, "py-3.5", "px-4", "whitespace-nowrap"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white"], [1, "font-bold", "text-slate-800", "dark:text-slate-200"], [1, "text-[10px]", "text-slate-400", "font-mono"], [1, "py-3.5", "px-4"], [1, "flex", "items-center", "gap-1", "font-semibold", "text-slate-800", "dark:text-slate-200"], [1, "!text-xs", "text-amber-500"], [1, "text-[10px]", "text-slate-400"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "gap-0.5"], [1, "!text-xs", "text-emerald-600"], [1, "text-slate-400", "text-[11px]"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-bold", "text-emerald-700", "dark:text-emerald-400", "bg-emerald-50", "dark:bg-emerald-950/50", "px-2", "py-0.5", "rounded", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-bold", "text-amber-700", "dark:text-amber-400", "bg-amber-50", "dark:bg-amber-950/50", "px-2", "py-0.5", "rounded", "border", "border-amber-200", "dark:border-amber-800"], [1, "space-y-1"], [1, "text-[11px]", "font-bold", "px-2", "py-0.5", "rounded", "capitalize", "inline-block"], [1, "flex", "items-center", "gap-1", "text-[10px]", "text-emerald-700", "dark:text-emerald-400", "font-semibold"], [1, "flex", "items-center", "gap-1", "text-[10px]", "text-amber-700", "dark:text-amber-400", "font-semibold"], [1, "flex", "items-center", "gap-1", "text-[10px]", "text-cyan-700", "dark:text-cyan-400", "font-semibold"], [1, "flex", "items-center", "gap-1", "text-[10px]", "font-bold", "text-emerald-700", "dark:text-emerald-300"], [1, "py-3.5", "px-4", "text-right", "whitespace-nowrap"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "px-3", "py-1.5", "bg-cyan-700", "hover:bg-cyan-800", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-xs", "flex", "items-center", "gap-1.5", "ml-auto", "active:scale-95", "cursor-pointer"], [1, "text-[11px]", "text-teal-600", "dark:text-teal-400", "font-semibold", "flex", "items-center", "justify-end", "gap-1"], [1, "text-[11px]", "text-cyan-600", "dark:text-cyan-400", "font-semibold", "flex", "items-center", "justify-end", "gap-1"], [1, "text-[11px]", "text-emerald-600", "dark:text-emerald-400", "font-semibold", "flex", "items-center", "justify-end", "gap-1"], ["type", "button", 1, "text-xs", "font-semibold", "text-slate-600", "dark:text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "underline", "cursor-pointer"], [1, "font-bold", "font-mono", "text-cyan-700", "dark:text-cyan-400", "text-xs"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-500", "block"], [1, "!text-[12px]", "!w-3", "!h-3"], [1, "text-[11px]", "text-amber-700", "dark:text-amber-400", "font-semibold", "flex", "items-center", "gap-1"], ["type", "button", "disabled", "true", "title", "Assign dispatch is disabled until an installer is assigned by Operations Manager", 1, "px-2.5", "py-1", "bg-slate-100", "dark:bg-slate-800", "text-slate-400", "font-bold", "text-[11px]", "rounded-lg", "cursor-not-allowed", "opacity-60", "flex", "items-center", "gap-1", "shadow-none"], ["type", "button", 1, "px-3", "py-1.5", "bg-cyan-700", "hover:bg-cyan-800", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-xs", "flex", "items-center", "gap-1.5", "ml-auto", "active:scale-95", "cursor-pointer", 3, "click"], ["type", "button", 1, "text-xs", "font-semibold", "text-slate-600", "dark:text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "underline", "cursor-pointer", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-2xl", "w-full", "max-h-[95vh]", "sm:max-h-[92vh]", "flex", "flex-col", "overflow-hidden", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "px-4", "sm:px-6", "py-3", "sm:py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/50", "dark:bg-slate-800/40"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-xl", "bg-cyan-700", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [1, "!text-base"], [1, "flex", "flex-col", "flex-1", "min-h-0", "overflow-hidden", "text-xs", 3, "ngSubmit", "formGroup"], [1, "overflow-y-auto", "p-3.5", "sm:p-6", "space-y-4", "sm:space-y-5", "flex-1"], [1, "space-y-3"], [1, "flex", "items-center", "justify-between", "pb-1", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "text-[11px]", "uppercase", "font-bold", "text-cyan-700", "dark:text-cyan-400", "tracking-wider", "flex", "items-center", "gap-1"], [1, "text-xs", "font-mono", "font-bold", "text-cyan-700", "dark:text-cyan-400"], ["type", "button", 1, "px-2.5", "py-1", "bg-cyan-700", "hover:bg-cyan-800", "text-white", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-1", "shadow-xs", "cursor-pointer", 3, "click"], [1, "!text-xs", "!w-3", "!h-3"], [1, "space-y-2.5"], [1, "rounded-xl", "border", "transition-all", "overflow-hidden", 3, "class"], ["for", "shopBranch", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "shopBranch", "formControlName", "shopBranch", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium", "text-xs"], ["value", "DoorMaster Flagship Showroom - Accra Central"], ["value", "DoorMaster Workshop - Spintex Road"], ["value", "DoorMaster Atelier - East Legon"], ["value", "DoorMaster Depot - Tema Harbor"], [1, "space-y-3", "pt-2", "border-t", "border-slate-100", "dark:border-slate-800"], [1, "text-[11px]", "uppercase", "font-bold", "text-indigo-700", "dark:text-indigo-400", "tracking-wider", "flex", "items-center", "gap-1"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-3"], ["for", "clientNameInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "clientNameInput", "type", "text", "formControlName", "clientName", "placeholder", "e.g. Samuel Darko", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "clientPhoneInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "clientPhoneInput", "type", "text", "formControlName", "clientPhone", "placeholder", "+233 24 000 1234", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "clientEmailInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "clientEmailInput", "type", "email", "formControlName", "clientEmail", "placeholder", "client@example.com", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], ["for", "siteAddressInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1", "flex", "items-center", "justify-between"], [1, "text-[10px]", "text-cyan-700", "dark:text-cyan-400", "font-mono", "font-bold"], [1, "relative"], ["id", "siteAddressInput", "type", "text", "formControlName", "siteAddress", "placeholder", "e.g. Airport Residential Area, Accra (or GPS coordinates)", 1, "w-full", "pl-8", "pr-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "!text-sm", "text-cyan-600", "dark:text-cyan-400", "absolute", "left-2.5", "top-2", "pointer-events-none"], ["for", "siteAccessInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "siteAccessInput", "type", "text", "formControlName", "accessInstructions", "placeholder", "e.g. Security gate pin 4421, ground floor", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "pt-1"], [1, "flex", "items-center", "justify-between", "mb-1.5"], [1, "text-[11px]", "font-bold", "text-slate-700", "dark:text-slate-300", "flex", "items-center", "gap-1.5"], [1, "!text-xs", "text-cyan-600", "dark:text-cyan-400"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [3, "locationSelected", "address"], [1, "text-[11px]", "uppercase", "font-bold", "text-emerald-700", "dark:text-emerald-400", "tracking-wider", "flex", "items-center", "gap-1"], ["for", "scheduledDateInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "scheduledDateInput", "type", "date", "formControlName", "scheduledDate", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium"], ["for", "estimatedHoursInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "estimatedHoursInput", "type", "number", "formControlName", "estimatedHours", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-3", "bg-slate-50", "dark:bg-slate-800/60", "p-3.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700"], ["for", "amountPaidInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "amountPaidInput", "type", "number", "formControlName", "amountPaidAtShop", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-bold", "text-cyan-700", "dark:text-cyan-400"], ["for", "paymentMethodSelect", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "paymentMethodSelect", "formControlName", "paymentMethod", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium"], ["value", "momo"], ["value", "cash"], ["value", "pos_card"], ["value", "bank_transfer"], ["for", "receiptNumberInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "receiptNumberInput", "type", "text", "formControlName", "receiptNumber", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-bold", "text-slate-800", "dark:text-slate-200"], [1, "px-4", "sm:px-6", "py-3", "sm:py-3.5", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/95", "dark:bg-slate-900/95", "backdrop-blur-md", "shrink-0", "flex", "flex-col-reverse", "sm:flex-row", "sm:items-center", "justify-between", "gap-2.5", "sm:gap-3", "z-10", "shadow-lg"], [1, "flex", "items-center", "gap-2", "text-[11px]", "sm:text-xs", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "text-cyan-700", "dark:text-cyan-400", "font-bold"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto"], ["type", "button", 1, "w-full", "sm:w-auto", "px-4", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "font-bold", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "text-center", "cursor-pointer", 3, "click"], ["type", "submit", 1, "w-full", "sm:w-auto", "px-5", "py-2", "bg-cyan-700", "hover:bg-cyan-800", "disabled:opacity-50", "text-white", "rounded-xl", "font-bold", "transition-all", "shadow-md", "flex", "items-center", "justify-center", "gap-1.5", "active:scale-95", "cursor-pointer", 3, "disabled"], [1, "rounded-xl", "border", "transition-all", "overflow-hidden"], [1, "px-3", "sm:px-3.5", "py-2", "sm:py-2.5", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-2", "sm:gap-2.5", "cursor-pointer", "select-none", "bg-slate-100/60", "dark:bg-slate-800/50", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [1, "flex", "items-center", "justify-between", "sm:justify-start", "gap-2", "min-w-0", "w-full", "sm:w-auto"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "w-6", "h-6", "rounded-md", "bg-cyan-700", "text-white", "font-mono", "font-bold", "text-xs", "flex", "items-center", "justify-center", "shrink-0"], [1, "truncate"], [1, "flex", "items-center", "gap-1.5", "flex-wrap"], [1, "font-bold", "text-slate-900", "dark:text-white", "truncate", "text-xs"], [1, "text-[9px]", "px-1.5", "py-0.2", "rounded", "bg-slate-200", "dark:bg-slate-700", "text-slate-700", "dark:text-slate-300", "font-semibold"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-mono", "truncate", "block"], [1, "flex", "items-center", "gap-1", "sm:hidden", "shrink-0", 3, "click"], ["type", "button", "title", "Remove door", 1, "p-1", "text-slate-400", "hover:text-red-500", "rounded", "cursor-pointer"], ["type", "button", 1, "p-0.5", "text-slate-400", "hover:text-slate-700", "rounded", "transition-transform", "duration-200", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-between", "sm:justify-end", "gap-2", "shrink-0", "pt-1.5", "sm:pt-0", "border-t", "border-slate-200/60", "dark:border-slate-700/60", "sm:border-0", 3, "click"], [1, "flex", "items-center", "border", "border-slate-200", "dark:border-slate-700", "rounded-md", "overflow-hidden", "bg-white", "dark:bg-slate-900", "text-xs"], ["type", "button", 1, "px-1.5", "py-0.5", "text-slate-500", "hover:text-slate-900", "disabled:opacity-30", "cursor-pointer", 3, "click", "disabled"], [1, "px-1.5", "py-0.5", "font-mono", "font-bold", "text-xs", "min-w-[20px]", "text-center"], ["type", "button", 1, "px-1.5", "py-0.5", "text-slate-500", "hover:text-slate-900", "cursor-pointer", 3, "click"], [1, "text-xs", "font-mono", "font-black", "text-cyan-700", "dark:text-cyan-400", "min-w-[70px]", "text-right"], [1, "hidden", "sm:flex", "items-center", "gap-1"], [1, "p-3.5", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-100", "dark:border-slate-800", "space-y-3"], ["type", "button", "title", "Remove door", 1, "p-1", "text-slate-400", "hover:text-red-500", "rounded", "cursor-pointer", 3, "click"], [1, "!text-xs", "!w-3.5", "!h-3.5"], [1, "p-2.5", "bg-slate-50", "dark:bg-slate-800/60", "rounded-lg", "border", "border-slate-200/80", "dark:border-slate-700/60"], [1, "flex", "items-center", "justify-between", "mb-1"], [1, "block", "text-[10px]", "font-bold", "text-slate-600", "dark:text-slate-300", "uppercase", "tracking-wider"], [1, "text-[9px]", "font-semibold", "text-cyan-600", "dark:text-cyan-400"], [1, "w-full", "text-xs", "px-2.5", "py-1.5", "bg-white", "dark:bg-slate-900", "border", "border-slate-300", "dark:border-slate-700", "rounded-md", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-cyan-500", "cursor-pointer", 3, "change"], ["value", ""], [3, "value", "selected"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-2.5"], [1, "flex", "items-center", "justify-between", "mb-0.5"], [1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "text-[10px]", "uppercase"], [1, "inline-flex", "items-center", "gap-1", "text-[9px]", "font-bold", "text-cyan-700", "dark:text-cyan-300", "bg-cyan-50", "dark:bg-cyan-950/70", "border", "border-cyan-200/80", "dark:border-cyan-800/60", "px-1.5", "py-0.5", "rounded", "shadow-2xs"], [1, "!text-[11px]", "!w-3", "!h-3"], [1, "w-full", "px-2.5", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "cursor-pointer", "focus:outline-none", "focus:ring-1", "focus:ring-cyan-500", "font-medium", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "value"], [1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-0.5", "text-[10px]", "uppercase"], ["type", "text", 1, "w-full", "px-2.5", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:ring-1", "focus:ring-cyan-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-full", "px-2.5", "py-1", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "cursor-pointer", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "Doormaster Smart Lock Handle F35 (Biometric & RFID)"], ["value", "Doormaster High-Security Italian Mortise Lock"], ["value", "Doormaster Keypad Digital Smart Cylinder"], ["value", "Heavy-Duty Multi-Point Deadbolt System"], ["type", "text", 1, "w-full", "px-2.5", "py-1", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-2.5"], ["type", "number", 1, "w-full", "px-2.5", "py-1", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono", "font-bold", "text-xs", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-xl", "w-full", "max-h-[92vh]", "flex", "flex-col", "overflow-hidden", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-cyan-50/50", "dark:bg-slate-800/50"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", "cursor-pointer", 3, "click"], [1, "overflow-y-auto", "p-5", "space-y-4", "text-xs", 3, "ngSubmit", "formGroup"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-3.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "space-y-2"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400", "tracking-wider"], [1, "text-[10px]", "font-mono", "text-cyan-700", "dark:text-cyan-400", "font-bold"], [1, "grid", "grid-cols-2", "gap-2"], [1, "text-[11px]", "text-slate-500", "flex", "items-center", "gap-0.5", "mt-0.5"], [1, "text-[10px]", "text-slate-500", "block", "mt-0.5"], [1, "space-y-2"], ["for", "driverSelect", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300"], ["id", "driverSelect", "formControlName", "dispatcherId", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-semibold", 3, "change"], ["for", "truckPlateInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "truckPlateInput", "type", "text", "formControlName", "truckPlate", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-bold", "text-slate-900", "dark:text-white"], ["for", "departureTimeInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "departureTimeInput", "type", "text", "formControlName", "estimatedDeparture", "placeholder", "e.g. Dispatched immediately from store", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "deliveryNotesText", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "deliveryNotesText", "type", "text", "formControlName", "deliveryNotes", "placeholder", "e.g. Inspect lockset box and door slab prior to departing store.", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "pt-3", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-3"], [1, "text-[11px]", "text-slate-400", "font-mono"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto", "justify-end"], ["type", "button", 1, "px-4", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "font-bold", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "bg-cyan-700", "hover:bg-cyan-800", "disabled:opacity-50", "text-white", "rounded-xl", "font-bold", "transition-all", "shadow-md", "flex", "items-center", "gap-1.5", "active:scale-95", "cursor-pointer", 3, "disabled"], [1, "px-4", "sm:px-6", "py-3.5", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-800/50"], [1, "w-9", "h-9", "rounded-xl", "bg-cyan-700", "text-white", "flex", "items-center", "justify-center", "shadow-sm"], [1, "text-base", "font-extrabold", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-2"], [1, "text-[10px]", "uppercase", "font-mono", "px-2", "py-0.5", "rounded-md", "bg-emerald-100", "dark:bg-emerald-950/60", "text-emerald-700", "dark:text-emerald-400", "border", "border-emerald-300", "dark:border-emerald-800", "font-bold"], ["type", "button", 1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex-1", "overflow-y-auto", "p-4", "sm:p-6", "space-y-5", "text-xs", 3, "ngSubmit", "formGroup"], [1, "p-3", "bg-emerald-50", "dark:bg-emerald-950/40", "border", "border-emerald-200", "dark:border-emerald-800", "rounded-xl", "text-emerald-800", "dark:text-emerald-300", "flex", "items-center", "gap-2"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "uppercase", "tracking-wider", "flex", "items-center", "gap-1.5"], [1, "sm:col-span-2", "space-y-1"], [1, "font-bold", "text-slate-700", "dark:text-slate-300"], ["type", "text", "formControlName", "shopName", "placeholder", "e.g. DoorMaster Flagship Workshop - Atelier A", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-cyan-500", "font-semibold"], ["type", "text", "formControlName", "branchCode", "placeholder", "e.g. DM-ACC-01", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-cyan-500", "font-mono"], [1, "space-y-3", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800"], ["type", "text", "formControlName", "address", "placeholder", "e.g. Plot 48, Spintex Road Industrial Area", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-cyan-500"], ["type", "text", "formControlName", "city", "placeholder", "e.g. Accra", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "text", "formControlName", "region", "placeholder", "e.g. Greater Accra", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "button", 1, "text-[11px]", "font-bold", "text-cyan-700", "dark:text-cyan-400", "hover:underline", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "number", "step", "any", "formControlName", "latitude", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], ["type", "number", "step", "any", "formControlName", "longitude", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700/60", "space-y-1.5"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400", "block"], [1, "flex", "flex-wrap", "gap-1.5"], ["type", "button", 1, "px-2.5", "py-1", "text-[11px]", "font-medium", "bg-white", "dark:bg-slate-700", "border", "border-slate-300", "dark:border-slate-600", "rounded-lg", "hover:border-cyan-500", "transition-colors", "cursor-pointer", 3, "click"], ["type", "text", "formControlName", "managerName", "placeholder", "e.g. Kwame Mensah", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "number", "min", "1", "max", "200", "formControlName", "dispatchRadiusKm", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], [1, "text-xs", "text-slate-400", "font-bold"], ["type", "text", "formControlName", "phone", "placeholder", "+233 24 100 0002", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], ["type", "email", "formControlName", "email", "placeholder", "spintex.workshop@doormasterops.com", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "text", "formControlName", "operatingHours", "placeholder", "Mon - Sat: 08:00 - 18:00", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "pt-4", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-1.5", "text-[11px]", "text-slate-500", "dark:text-slate-400", "font-medium"], [1, "font-mono", "text-cyan-600", "dark:text-cyan-400"], [1, "!text-sm", "text-emerald-600"], [1, "font-semibold"], [1, "!text-sm", "animate-spin"]], template: function ShopPortal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "DoorMaster Workshops & Logistics");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Shop Counter & Installation Scheduling");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 4);
            i0.ɵɵlistener("click", function ShopPortal_Template_button_click_12_listener() { return ctx.openLocationSettingsModal(); });
            i0.ɵɵelementStart(13, "mat-icon", 5);
            i0.ɵɵtext(14, "storefront");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 6);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(19, "h1", 7);
            i0.ɵɵtext(20, "Master Shop Manager Desk");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 8)(22, "button", 9);
            i0.ɵɵlistener("click", function ShopPortal_Template_button_click_22_listener() { return ctx.settingsOpened.emit(); });
            i0.ɵɵelementStart(23, "mat-icon", 10);
            i0.ɵɵtext(24, "place");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span");
            i0.ɵɵtext(26, "Shop Location Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "button", 11);
            i0.ɵɵlistener("click", function ShopPortal_Template_button_click_27_listener() { return ctx.openScheduleModal(); });
            i0.ɵɵelementStart(28, "mat-icon", 12);
            i0.ɵɵtext(29, "calendar_month");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span");
            i0.ɵɵtext(31, "Book Installation & Record Payment");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(32, "div", 13)(33, "div", 14)(34, "span", 15);
            i0.ɵɵtext(35, "Booked at Shop");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 16)(37, "span", 17);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span", 18);
            i0.ɵɵtext(40, "Awaiting Truck");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "p", 19);
            i0.ɵɵtext(42, "Forwarded to Operations Manager");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 14)(44, "span", 15);
            i0.ɵɵtext(45, "Counter Collections");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 16)(47, "span", 20);
            i0.ɵɵtext(48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "p", 19);
            i0.ɵɵtext(50, "Recorded at shop counter");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "div", 14)(52, "span", 15);
            i0.ɵɵtext(53, "Dispatched On Road");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 16)(55, "span", 17);
            i0.ɵɵtext(56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "span", 21);
            i0.ɵɵtext(58, "En Route");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "p", 19);
            i0.ɵɵtext(60, "Transit to installation sites");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "div", 14)(62, "span", 15);
            i0.ɵɵtext(63, "Installed & Verified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "div", 16)(65, "span", 22);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "p", 19);
            i0.ɵɵtext(68, "Archived in workshop ledger");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(69, ShopPortal_Conditional_69_Template, 11, 1, "div", 23);
            i0.ɵɵelementStart(70, "div", 24)(71, "div", 25)(72, "div")(73, "h3", 26);
            i0.ɵɵtext(74, "Shop Installation Bookings & Payment Registry");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "p", 27);
            i0.ɵɵtext(76, "Scheduled by Shop Manager with client counter payments audited by Accounts");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "div", 28)(78, "span", 29);
            i0.ɵɵtext(79);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(80, "div", 30)(81, "table", 31)(82, "thead")(83, "tr", 32)(84, "th", 33);
            i0.ɵɵtext(85, "Order & Door");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "th", 33);
            i0.ɵɵtext(87, "Lock Specification");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "th", 33);
            i0.ɵɵtext(89, "Client & Site Location");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "th", 33);
            i0.ɵɵtext(91, "Counter Payment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "th", 33);
            i0.ɵɵtext(93, "Accountant Audit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "th", 33);
            i0.ɵɵtext(95, "Lifecycle Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "th", 34);
            i0.ɵɵtext(97, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(98, "tbody", 35);
            i0.ɵɵrepeaterCreate(99, ShopPortal_For_100_Template, 48, 17, "tr", 36, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(101, "div", 37)(102, "div", 38)(103, "div")(104, "h3", 39)(105, "mat-icon", 40);
            i0.ɵɵtext(106, "navigation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "span");
            i0.ɵɵtext(108, "Shop Branch Live Transit Radar (OpenStreetMap)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(109, "p", 41);
            i0.ɵɵtext(110, "Live vehicle motion & route tracking scoped strictly to orders originating from this workshop");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(111, "div", 28)(112, "span", 42);
            i0.ɵɵtext(113, "Filtering Workshop:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "span", 43);
            i0.ɵɵtext(115);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(116, "app-osm-live-map", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(117, ShopPortal_Conditional_117_Template, 143, 7, "div", 45);
            i0.ɵɵconditionalCreate(118, ShopPortal_Conditional_118_Template, 73, 10, "div", 46);
            i0.ɵɵconditionalCreate(119, ShopPortal_Conditional_119_Template, 134, 4, "div", 47);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.store.shopLocation().shopName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("(", ctx.store.shopLocation().city, ")");
            i0.ɵɵadvance(20);
            i0.ɵɵtextInterpolate1(" ", ctx.bookedAtShopCount(), " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" \u20B5", ctx.store.totalShopCollections().toLocaleString(), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.dispatchedCount(), " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.store.stats().completed, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.jobsAwaitingDriver().length > 0 ? 69 : -1);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.store.jobs().length, " Total Orders");
            i0.ɵɵadvance(20);
            i0.ɵɵrepeater(ctx.store.jobs());
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate1(" ", ctx.currentBranch(), " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("mode", "shop-scoped")("shopBranchFilter", ctx.currentBranch());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showScheduleModal() ? 117 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeAssignDriverJob() ? 118 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showLocationSettingsModal() ? 119 : -1);
        } }, dependencies: [CommonModule, MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, FormsModule, i2.NgModel, OsmLiveMap, ClientLocationMap], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ShopPortal, [{
        type: Component,
        args: [{
                selector: 'app-shop-portal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, OsmLiveMap, ClientLocationMap],
                template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Workshops & Logistics</span>
            <span aria-hidden="true">·</span>
            <span>Shop Counter & Installation Scheduling</span>
            <span aria-hidden="true">·</span>
            <button 
              type="button" 
              (click)="openLocationSettingsModal()" 
              class="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 bg-cyan-50 dark:bg-cyan-950/70 px-2.5 py-0.5 rounded-lg border border-cyan-200 dark:border-cyan-800 transition-all shadow-xs cursor-pointer"
              title="Click to view & edit store workshop location in MySQL database"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5 text-cyan-600 dark:text-cyan-400">storefront</mat-icon>
              <span>{{ store.shopLocation().shopName }}</span>
              <span class="text-slate-400 font-normal">({{ store.shopLocation().city }})</span>
            </button>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Master Shop Manager Desk</h1>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button 
            type="button"
            (click)="settingsOpened.emit()"
            class="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
            title="Configure shop workshop location, GPS, radius and branch details in System Settings"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-cyan-600 dark:text-cyan-400">place</mat-icon>
            <span>Shop Location Settings</span>
          </button>

          <button 
            type="button"
            (click)="openScheduleModal()"
            class="px-4 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <mat-icon class="!text-sm !w-4 !h-4">calendar_month</mat-icon>
            <span>Book Installation & Record Payment</span>
          </button>
        </div>
      </div>

      <!-- Workshop Inventory & Assembly Summary -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Booked at Shop</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ bookedAtShopCount() }}
            </span>
            <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">Awaiting Truck</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Forwarded to Operations Manager</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Counter Collections</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-extrabold font-mono text-cyan-700 dark:text-cyan-400 tracking-tight tabular-nums">
              ₵{{ store.totalShopCollections().toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Recorded at shop counter</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Dispatched On Road</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ dispatchedCount() }}
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">En Route</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Transit to installation sites</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Installed & Verified</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              {{ store.stats().completed }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Archived in workshop ledger</p>
        </div>
      </div>

      <!-- Action Required: Jobs with Assigned Installer Awaiting Store Driver -->
      @if (jobsAwaitingDriver().length > 0) {
        <div class="bg-cyan-950/20 dark:bg-cyan-950/40 border border-cyan-400 dark:border-cyan-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></span>
              <h3 class="text-sm font-extrabold text-cyan-900 dark:text-cyan-200 uppercase tracking-wider">
                Action Required: Installer Assigned · Assign Store Dispatch Driver ({{ jobsAwaitingDriver().length }})
              </h3>
            </div>
            <span class="text-xs text-cyan-800 dark:text-cyan-300 font-mono">
              Operations assigned technician · Assign an available store driver to dispatch door
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            @for (job of jobsAwaitingDriver(); track job.id) {
              <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 shadow-xs space-y-3">
                <div class="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <span class="font-mono text-[11px] font-extrabold text-cyan-700 dark:text-cyan-400">{{ job.id }}</span>
                    <h4 class="font-bold text-slate-900 dark:text-white text-sm">{{ job.doorModel }}</h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ job.dimensions }} · {{ job.finish }}</p>
                  </div>
                  <span class="text-[10px] uppercase font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    Installer Assigned
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Assigned Installer:</span>
                    <p class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">handyman</mat-icon>
                      <span>{{ job.assignedInstallerName || 'Field Technician' }}</span>
                    </p>
                    <p class="text-[11px] text-slate-500 font-mono mt-0.5">Date: {{ job.scheduledDate }}</p>
                  </div>

                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Site / Client:</span>
                    <p class="font-bold text-slate-900 dark:text-white truncate">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span>{{ job.client.siteAddress }}</span>
                    </p>
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button 
                    type="button"
                    [disabled]="!job.assignedInstallerId"
                    (click)="openAssignDriverModal(job)"
                    [title]="!job.assignedInstallerId ? 'Assign dispatch is disabled until an installer is assigned by Operations Manager' : 'Assign Store Driver & Dispatch'"
                    [class]="!job.assignedInstallerId
                      ? 'px-3.5 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed opacity-60 flex items-center gap-1.5 shadow-none'
                      : 'px-3.5 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer'"
                  >
                    <mat-icon class="!text-xs">{{ !job.assignedInstallerId ? 'lock' : 'local_shipping' }}</mat-icon>
                    <span>{{ !job.assignedInstallerId ? 'Dispatch Disabled (Pending Installer)' : 'Assign Store Driver & Dispatch' }}</span>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Shop Counter Bookings & Orders Table -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Shop Installation Bookings & Payment Registry</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Scheduled by Shop Manager with client counter payments audited by Accounts</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ store.jobs().length }} Total Orders</span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th class="py-3 px-4">Order & Door</th>
                <th class="py-3 px-4">Lock Specification</th>
                <th class="py-3 px-4">Client & Site Location</th>
                <th class="py-3 px-4">Counter Payment</th>
                <th class="py-3 px-4">Accountant Audit</th>
                <th class="py-3 px-4">Lifecycle Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (job of store.jobs(); track job.id) {
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <p class="font-mono font-bold text-slate-900 dark:text-white">{{ job.id }}</p>
                    <p class="font-bold text-slate-800 dark:text-slate-200">{{ job.doorModel }}</p>
                    <p class="text-[10px] text-slate-400 font-mono">{{ job.dimensions }}</p>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                      <mat-icon class="!text-xs text-amber-500">lock</mat-icon>
                      <span>{{ job.lockModel || 'Smart Lock Handle' }}</span>
                    </div>
                    <span class="text-[10px] text-slate-400">{{ job.hardwareSpecs }}</span>
                  </td>

                  <td class="py-3.5 px-4">
                    <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                      <mat-icon class="!text-xs text-emerald-600">place</mat-icon>
                      <span>{{ job.client.siteAddress }}</span>
                    </p>
                    <p class="text-[10px] text-slate-400 font-mono">{{ job.client.phone }}</p>
                  </td>

                  <td class="py-3.5 px-4 whitespace-nowrap">
                    @if (job.shopBooking) {
                      <div>
                        <span class="font-bold font-mono text-cyan-700 dark:text-cyan-400 text-xs">
                          ₵{{ job.shopBooking.amountPaidAtShop.toLocaleString() }}
                        </span>
                        <span class="text-[10px] uppercase font-bold text-slate-500 block">
                          {{ job.shopBooking.paymentMethod }} · Ref: {{ job.shopBooking.receiptNumber }}
                        </span>
                      </div>
                    } @else {
                      <span class="text-slate-400 text-[11px]">Direct Order</span>
                    }
                  </td>

                  <td class="py-3.5 px-4">
                    @if (job.shopBooking?.accountantVerified) {
                      <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <mat-icon class="!text-xs">verified</mat-icon>
                        <span>Audited</span>
                      </span>
                    } @else if (job.shopBooking) {
                      <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        <mat-icon class="!text-xs">pending</mat-icon>
                        <span>Pending Audit</span>
                      </span>
                    } @else {
                      <span class="text-slate-400 text-[11px]">—</span>
                    }
                  </td>

                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <div class="space-y-1">
                      <span 
                        class="text-[11px] font-bold px-2 py-0.5 rounded capitalize inline-block"
                        [class]="getStatusBadgeClass(job.status)"
                      >
                        {{ job.status.replace('_', ' ') }}
                      </span>
                      @if (job.assignedInstallerName) {
                        <div class="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                          <mat-icon class="!text-[12px] !w-3 !h-3">handyman</mat-icon>
                          <span>{{ job.assignedInstallerName }}</span>
                        </div>
                      } @else {
                        <div class="flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                          <mat-icon class="!text-[12px] !w-3 !h-3">hourglass_top</mat-icon>
                          <span>Installer: Pending</span>
                        </div>
                      }
                      @if (job.dispatcherName) {
                        <div class="flex items-center gap-1 text-[10px] text-cyan-700 dark:text-cyan-400 font-semibold">
                          <mat-icon class="!text-[12px] !w-3 !h-3">local_shipping</mat-icon>
                          <span>{{ job.dispatcherName }}</span>
                        </div>
                      }
                      @if (job.operationsApproved || job.status === 'approved') {
                        <div class="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                          <mat-icon class="!text-[12px] !w-3 !h-3">verified</mat-icon>
                          <span>Approved by Ops</span>
                        </div>
                      }
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-right whitespace-nowrap">
                    @if (job.status === 'booked_at_shop' || !job.assignedInstallerId) {
                      <div class="flex items-center justify-end gap-2">
                        <span class="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <mat-icon class="!text-xs">hourglass_empty</mat-icon>
                          <span>Installer: Pending</span>
                        </span>
                        <button 
                          type="button"
                          disabled="true"
                          title="Assign dispatch is disabled until an installer is assigned by Operations Manager"
                          class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-[11px] rounded-lg cursor-not-allowed opacity-60 flex items-center gap-1 shadow-none"
                        >
                          <mat-icon class="!text-xs">lock</mat-icon>
                          <span>Dispatch Disabled</span>
                        </button>
                      </div>
                    } @else if (job.status === 'assigned') {
                      <button 
                        type="button"
                        (click)="openAssignDriverModal(job)"
                        class="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 ml-auto active:scale-95 cursor-pointer"
                      >
                        <mat-icon class="!text-xs">local_shipping</mat-icon>
                        <span>Assign Driver</span>
                      </button>
                    } @else if (job.status === 'truck_assigned') {
                      <span class="text-[11px] text-teal-600 dark:text-teal-400 font-semibold flex items-center justify-end gap-1">
                        <mat-icon class="!text-xs">local_shipping</mat-icon>
                        <span>Truck Assigned</span>
                      </span>
                    } @else if (job.status === 'dispatched') {
                      <span class="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold flex items-center justify-end gap-1">
                        <mat-icon class="!text-xs">navigation</mat-icon>
                        <span>Dispatched to Site</span>
                      </span>
                    } @else if (job.status === 'approved') {
                      <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <mat-icon class="!text-xs">check_circle</mat-icon>
                        <span>Approved & Locked</span>
                      </span>
                    } @else {
                      <button 
                        type="button"
                        (click)="jobSelected.emit(job.id)"
                        class="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                      >
                        Details
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Shop Branch Scoped OpenStreetMap Live Transit Radar -->
      <div class="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <mat-icon class="!text-sm text-cyan-600">navigation</mat-icon>
              <span>Shop Branch Live Transit Radar (OpenStreetMap)</span>
            </h3>
            <p class="text-xs text-slate-500">Live vehicle motion & route tracking scoped strictly to orders originating from this workshop</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] uppercase font-bold text-slate-400">Filtering Workshop:</span>
            <span class="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-800">
              {{ currentBranch() }}
            </span>
          </div>
        </div>
        <app-osm-live-map [mode]="'shop-scoped'" [shopBranchFilter]="currentBranch()"></app-osm-live-map>
      </div>

      <!-- =================================================================== -->
      <!-- MODAL: SCHEDULE INSTALLATION REQUEST (MASTER SHOP MANAGER)         -->
      <!-- =================================================================== -->
      @if (showScheduleModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-cyan-700 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">calendar_month</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Schedule Installation Request</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Master Shop Manager: Book door, lock & counter customer payment</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeScheduleModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <!-- Modal Form Body -->
            <form [formGroup]="bookingForm" (ngSubmit)="submitBooking()" class="flex flex-col flex-1 min-h-0 overflow-hidden text-xs">
              
              <!-- Scrollable Modal Form Body -->
              <div class="overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-5 flex-1">
                <!-- Section 1: Multi-Door & Lock Specifications with Dropdown Information -->
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-[11px] uppercase font-bold text-cyan-700 dark:text-cyan-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs">meeting_room</mat-icon>
                    <span>1. Door & Lock Specifications ({{ totalShopDoorsCount() }} Units Selected)</span>
                  </span>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
                      Total: ₵{{ totalShopDoorsPrice().toLocaleString() }}
                    </span>
                    <button 
                      type="button" 
                      (click)="addShopDoorFromCatalog()"
                      class="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <mat-icon class="!text-xs !w-3 !h-3">add</mat-icon>
                      <span>+ Add Door</span>
                    </button>
                  </div>
                </div>

                <!-- Multi-Door Cards with Dropdown Information Inside -->
                <div class="space-y-2.5">
                  @for (door of selectedShopDoors(); track door.id; let i = $index) {
                    <div class="rounded-xl border transition-all overflow-hidden"
                      [class]="door.isExpanded 
                        ? 'border-cyan-500/50 bg-white dark:bg-slate-900 shadow-sm' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40'">
                      
                      <!-- Door Header Bar / Dropdown Trigger -->
                      <div 
                        (click)="toggleShopDoorDropdown(i)"
                        class="px-3 sm:px-3.5 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-2.5 cursor-pointer select-none bg-slate-100/60 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <!-- Left: Number, Title, Category & Mobile Actions -->
                        <div class="flex items-center justify-between sm:justify-start gap-2 min-w-0 w-full sm:w-auto">
                          <div class="flex items-center gap-2 min-w-0">
                            <span class="w-6 h-6 rounded-md bg-cyan-700 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              #{{ i + 1 }}
                            </span>
                            <div class="truncate">
                              <div class="flex items-center gap-1.5 flex-wrap">
                                <span class="font-bold text-slate-900 dark:text-white truncate text-xs">{{ door.doorModel }}</span>
                                <span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">{{ door.doorCategory }}</span>
                              </div>
                              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate block">
                                {{ door.dimensions }} · {{ door.finish }}
                              </span>
                            </div>
                          </div>

                          <!-- Mobile-only remove & dropdown toggle -->
                          <div class="flex items-center gap-1 sm:hidden shrink-0" (click)="$event.stopPropagation()">
                            @if (selectedShopDoors().length > 1) {
                              <button type="button" (click)="removeShopDoor(i)" class="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer" title="Remove door">
                                <mat-icon class="!text-xs !w-3.5 !h-3.5">delete</mat-icon>
                              </button>
                            }
                            <button type="button" (click)="toggleShopDoorDropdown(i)" class="p-0.5 text-slate-400 hover:text-slate-700 rounded transition-transform duration-200 cursor-pointer" [class.rotate-180]="door.isExpanded">
                              <mat-icon class="!text-base">expand_more</mat-icon>
                            </button>
                          </div>
                        </div>

                        <!-- Right (Desktop) / Bottom row (Mobile): Stepper & Subtotal -->
                        <div class="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1.5 sm:pt-0 border-t border-slate-200/60 dark:border-slate-700/60 sm:border-0" (click)="$event.stopPropagation()">
                          <!-- Quantity Controls -->
                          <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-900 text-xs">
                            <button type="button" (click)="changeShopDoorQty(i, -1)" [disabled]="door.quantity <= 1" class="px-1.5 py-0.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer">
                              <mat-icon class="!text-xs !w-3 !h-3">remove</mat-icon>
                            </button>
                            <span class="px-1.5 py-0.5 font-mono font-bold text-xs min-w-[20px] text-center">{{ door.quantity }}</span>
                            <button type="button" (click)="changeShopDoorQty(i, 1)" class="px-1.5 py-0.5 text-slate-500 hover:text-slate-900 cursor-pointer">
                              <mat-icon class="!text-xs !w-3 !h-3">add</mat-icon>
                            </button>
                          </div>

                          <span class="text-xs font-mono font-black text-cyan-700 dark:text-cyan-400 min-w-[70px] text-right">
                            ₵{{ (door.unitPrice * door.quantity).toLocaleString() }}
                          </span>

                          <!-- Desktop actions -->
                          <div class="hidden sm:flex items-center gap-1">
                            @if (selectedShopDoors().length > 1) {
                              <button type="button" (click)="removeShopDoor(i)" class="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer" title="Remove door">
                                <mat-icon class="!text-xs !w-3.5 !h-3.5">delete</mat-icon>
                              </button>
                            }

                            <button type="button" (click)="toggleShopDoorDropdown(i)" class="p-0.5 text-slate-400 hover:text-slate-700 rounded transition-transform duration-200 cursor-pointer" [class.rotate-180]="door.isExpanded">
                              <mat-icon class="!text-base">expand_more</mat-icon>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Expanded Door Information Dropdown Body -->
                      @if (door.isExpanded) {
                        <div class="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          
                          <!-- Preset Model Template Selector -->
                          <div class="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                            <div class="flex items-center justify-between mb-1">
                              <label class="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Preset Model Template
                              </label>
                              <span class="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400">
                                Auto-syncs specs & category
                              </span>
                            </div>
                            <select 
                              (change)="onShopDoorCatalogPick(i, $event)"
                              class="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                            >
                              <option value="">-- Select catalog template --</option>
                              @for (catDoor of store.doors(); track catDoor.id) {
                                <option [value]="catDoor.id" [selected]="catDoor.id === door.catalogDoorId">
                                  {{ catDoor.name }} ({{ catDoor.modelCode }}) - {{ catDoor.formattedPrice || ('₵' + catDoor.unitPrice) }} • {{ catDoor.category }}
                                </option>
                              }
                            </select>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <div class="flex items-center justify-between mb-0.5">
                                <label class="block font-bold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Door Category</label>
                                <span class="inline-flex items-center gap-1 text-[9px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200/80 dark:border-cyan-800/60 px-1.5 py-0.5 rounded shadow-2xs">
                                  <mat-icon class="!text-[11px] !w-3 !h-3">auto_awesome</mat-icon>
                                  <span>Auto-Selected</span>
                                </span>
                              </div>
                              <select 
                                [ngModel]="door.doorCategory"
                                (ngModelChange)="updateShopDoorField(i, 'doorCategory', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
                              >
                                @for (cat of getShopCategoryList(door.doorCategory); track cat) {
                                  <option [value]="cat">{{ cat }}</option>
                                }
                              </select>
                            </div>

                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Door Model Title</label>
                              <input 
                                type="text"
                                [ngModel]="door.doorModel"
                                (ngModelChange)="onShopDoorModelInputChange(i, $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                              />
                            </div>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Lock Hardware</label>
                              <select 
                                [ngModel]="door.lockModel"
                                (ngModelChange)="updateShopDoorField(i, 'lockModel', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs cursor-pointer"
                              >
                                <option value="Doormaster Smart Lock Handle F35 (Biometric & RFID)">Doormaster Smart Lock Handle F35 (Biometric & RFID)</option>
                                <option value="Doormaster High-Security Italian Mortise Lock">Doormaster High-Security Italian Mortise Lock</option>
                                <option value="Doormaster Keypad Digital Smart Cylinder">Doormaster Keypad Digital Smart Cylinder</option>
                                <option value="Heavy-Duty Multi-Point Deadbolt System">Heavy-Duty Multi-Point Deadbolt System</option>
                              </select>
                            </div>
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Dimensions</label>
                              <input 
                                type="text"
                                [ngModel]="door.dimensions"
                                (ngModelChange)="updateShopDoorField(i, 'dimensions', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                              />
                            </div>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Dimensions</label>
                              <input 
                                type="text"
                                [ngModel]="door.dimensions"
                                (ngModelChange)="updateShopDoorField(i, 'dimensions', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                              />
                            </div>
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Finish / Veneer</label>
                              <input 
                                type="text"
                                [ngModel]="door.finish"
                                (ngModelChange)="updateShopDoorField(i, 'finish', $event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                              />
                            </div>
                            <div>
                              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-0.5 text-[10px] uppercase">Unit Price (₵)</label>
                              <input 
                                type="number"
                                [ngModel]="door.unitPrice"
                                (ngModelChange)="updateShopDoorField(i, 'unitPrice', +$event)"
                                [ngModelOptions]="{standalone: true}"
                                class="w-full px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>

                <!-- Shop Branch -->
                <div>
                  <label for="shopBranch" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dispatching Shop Branch</label>
                  <select 
                    id="shopBranch"
                    formControlName="shopBranch"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs"
                  >
                    <option value="DoorMaster Flagship Showroom - Accra Central">Accra Central Showroom</option>
                    <option value="DoorMaster Workshop - Spintex Road">Spintex Road Workshop</option>
                    <option value="DoorMaster Atelier - East Legon">East Legon Atelier</option>
                    <option value="DoorMaster Depot - Tema Harbor">Tema Harbor Depot</option>
                  </select>
                </div>
              </div>

              <!-- Section 2: Client & Site Owner Details -->
              <div class="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span class="text-[11px] uppercase font-bold text-indigo-700 dark:text-indigo-400 tracking-wider flex items-center gap-1">
                  <mat-icon class="!text-xs">person_pin</mat-icon>
                  <span>2. Client & Site Location Details</span>
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label for="clientNameInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Client Full Name *</label>
                    <input 
                      id="clientNameInput"
                      type="text" 
                      formControlName="clientName"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="e.g. Samuel Darko"
                    />
                  </div>

                  <div>
                    <label for="clientPhoneInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                    <input 
                      id="clientPhoneInput"
                      type="text" 
                      formControlName="clientPhone"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="+233 24 000 1234"
                    />
                  </div>

                  <div>
                    <label for="clientEmailInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input 
                      id="clientEmailInput"
                      type="email" 
                      formControlName="clientEmail"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label for="siteAddressInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                      <span>Site Location / Address / GPS *</span>
                      <span class="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-bold">Auto Live Pin</span>
                    </label>
                    <div class="relative">
                      <input 
                        id="siteAddressInput"
                        type="text" 
                        formControlName="siteAddress"
                        class="w-full pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="e.g. Airport Residential Area, Accra (or GPS coordinates)" 
                      />
                      <mat-icon class="!text-sm text-cyan-600 dark:text-cyan-400 absolute left-2.5 top-2 pointer-events-none">location_on</mat-icon>
                    </div>
                  </div>

                  <div>
                    <label for="siteAccessInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Site Access Instructions</label>
                    <input 
                      id="siteAccessInput"
                      type="text" 
                      formControlName="accessInstructions"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="e.g. Security gate pin 4421, ground floor"
                    />
                  </div>
                </div>

                <!-- Downward Interactive Live Map Preview -->
                <div class="pt-1">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <mat-icon class="!text-xs text-cyan-600 dark:text-cyan-400">map</mat-icon>
                      <span>Client Site Location Radar & GPS Pin</span>
                    </span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      Drag pin or click map to pinpoint site gate
                    </span>
                  </div>
                  
                  <app-client-location-map 
                    [address]="bookingForm.get('siteAddress')?.value || ''"
                    (locationSelected)="onShopSiteLocationSelected($event)"
                  />
                </div>
              </div>

              <!-- Section 3: Schedule Date & Counter Payment -->
              <div class="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span class="text-[11px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider flex items-center gap-1">
                  <mat-icon class="!text-xs">payments</mat-icon>
                  <span>3. Schedule & Shop Counter Payment Collection</span>
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label for="scheduledDateInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Installation Date *</label>
                    <input 
                      id="scheduledDateInput"
                      type="date" 
                      formControlName="scheduledDate"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    />
                  </div>

                  <div>
                    <label for="estimatedHoursInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Installation Time (Hours)</label>
                    <input 
                      id="estimatedHoursInput"
                      type="number" 
                      formControlName="estimatedHours"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label for="amountPaidInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Amount Paid at Shop Counter (₵) *</label>
                    <input 
                      id="amountPaidInput"
                      type="number" 
                      formControlName="amountPaidAtShop"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-cyan-700 dark:text-cyan-400"
                    />
                  </div>

                  <div>
                    <label for="paymentMethodSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Method *</label>
                    <select 
                      id="paymentMethodSelect"
                      formControlName="paymentMethod"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="momo">MTN / Telecel MoMo</option>
                      <option value="cash">Counter Cash</option>
                      <option value="pos_card">POS Terminal (Card)</option>
                      <option value="bank_transfer">Direct Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label for="receiptNumberInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Shop Receipt / Reference # *</label>
                    <input 
                      id="receiptNumberInput"
                      type="text" 
                      formControlName="receiptNumber"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              </div>

              </div>

              <!-- Sticky Modal Footer -->
              <div class="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 z-10 shadow-lg">
                <div class="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span class="font-bold text-slate-900 dark:text-white">{{ totalShopDoorsCount() }} Units</span>
                  <span>·</span>
                  <span class="text-cyan-700 dark:text-cyan-400 font-bold">
                    ₵{{ totalShopDoorsPrice().toLocaleString() }} Total
                  </span>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    type="button" 
                    (click)="closeScheduleModal()"
                    class="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    [disabled]="!bookingForm.valid"
                    class="w-full sm:w-auto px-5 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">check</mat-icon>
                    <span>Submit Installation Request</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- MODAL: ASSIGN STORE DISPATCH DRIVER & VEHICLE (SHOP MANAGER)        -->
      <!-- =================================================================== -->
      @if (activeAssignDriverJob()) {
        @let job = activeAssignDriverJob()!;
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-cyan-50/50 dark:bg-slate-800/50">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-cyan-700 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">local_shipping</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Assign Store Dispatch Driver</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ job.id }} · {{ job.doorModel }}</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeAssignDriverModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <!-- Modal Body -->
            <form [formGroup]="driverAssignForm" (ngSubmit)="confirmDriverDispatch()" class="overflow-y-auto p-5 space-y-4 text-xs">
              <!-- Order & Assigned Installer Summary -->
              <div class="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Installation Destination</span>
                  <span class="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold">Ref: {{ job.id }}</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 flex items-center gap-0.5 mt-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span class="truncate">{{ job.client.siteAddress }}</span>
                    </p>
                    <p class="text-[10px] text-slate-400 font-mono">{{ job.client.phone }}</p>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Assigned Installer:</span>
                    <p class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">handyman</mat-icon>
                      <span>{{ job.assignedInstallerName || 'Technician' }}</span>
                    </p>
                    <span class="text-[10px] text-slate-500 block mt-0.5">Scheduled: {{ job.scheduledDate }}</span>
                  </div>
                </div>
              </div>

              <!-- Driver Selection -->
              <div class="space-y-2">
                <label for="driverSelect" class="block font-bold text-slate-700 dark:text-slate-300">
                  Select Dispatch Driver Available to Store *
                </label>
                <select 
                  id="driverSelect"
                  formControlName="dispatcherId"
                  (change)="onDriverSelected($event)"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  @for (d of store.dispatchers(); track d.id) {
                    <option [value]="d.id">
                      {{ d.name }} · {{ d.assignedTruck.plate }} ({{ d.assignedTruck.model }}) - {{ d.status.toUpperCase() }}
                    </option>
                  }
                </select>
              </div>

              <!-- Vehicle Plate & Model -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label for="truckPlateInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Truck Plate #</label>
                  <input 
                    id="truckPlateInput"
                    type="text" 
                    formControlName="truckPlate"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label for="departureTimeInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Departure</label>
                  <input 
                    id="departureTimeInput"
                    type="text" 
                    formControlName="estimatedDeparture"
                    placeholder="e.g. Dispatched immediately from store"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <!-- Delivery Cargo Notes -->
              <div>
                <label for="deliveryNotesText" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cargo Handover & Delivery Notes
                </label>
                <input 
                  id="deliveryNotesText"
                  type="text" 
                  formControlName="deliveryNotes"
                  placeholder="e.g. Inspect lockset box and door slab prior to departing store."
                  class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <!-- Sticky Modal Footer -->
              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span class="text-[11px] text-slate-400 font-mono">
                  Driver, Operations & Client will receive SMS alerts
                </span>
                <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button 
                    type="button" 
                    (click)="closeAssignDriverModal()"
                    class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    [disabled]="!driverAssignForm.valid"
                    class="px-5 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">local_shipping</mat-icon>
                    <span>Dispatch Door from Store</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- MODAL: SHOP LOCATION & WORKSHOP SETTINGS (STORED IN MYSQL DB)       -->
      <!-- =================================================================== -->
      @if (showLocationSettingsModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-cyan-700 text-white flex items-center justify-center shadow-sm">
                  <mat-icon class="!text-base">storefront</mat-icon>
                </div>
                <div>
                  <h2 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Shop Location & Workshop Settings</span>
                    <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                      MySQL DB
                    </span>
                  </h2>
                  <p class="text-xs text-slate-500">Configure store origin, address, GPS coordinates and dispatch logistics radius</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeLocationSettingsModal()"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            </div>

            <!-- Modal Body Form -->
            <form [formGroup]="locationSettingsForm" (ngSubmit)="saveLocationSettings()" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
              
              @if (locationSettingsFeedback()) {
                <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <mat-icon class="!text-sm text-emerald-600">check_circle</mat-icon>
                  <span class="font-semibold">{{ locationSettingsFeedback() }}</span>
                </div>
              }

              <!-- Branch Identity -->
              <div class="space-y-3">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">business</mat-icon>
                  <span>Branch Identity</span>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="sm:col-span-2 space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Shop / Workshop Name *</label>
                    <input 
                      type="text" 
                      formControlName="shopName" 
                      placeholder="e.g. DoorMaster Flagship Workshop - Atelier A" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Branch Code *</label>
                    <input 
                      type="text" 
                      formControlName="branchCode" 
                      placeholder="e.g. DM-ACC-01" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <!-- Physical Location & Address -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">pin_drop</mat-icon>
                  <span>Physical Address & Corridor</span>
                </h3>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Street Address & Landmark *</label>
                  <input 
                    type="text" 
                    formControlName="address" 
                    placeholder="e.g. Plot 48, Spintex Road Industrial Area" 
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">City *</label>
                    <input 
                      type="text" 
                      formControlName="city" 
                      placeholder="e.g. Accra" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Region</label>
                    <input 
                      type="text" 
                      formControlName="region" 
                      placeholder="e.g. Greater Accra" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <!-- GPS Coordinates & Quick Accra Hub Presets -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center justify-between">
                  <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <mat-icon class="!text-sm text-cyan-600">my_location</mat-icon>
                    <span>Store GPS Coordinates & Origin</span>
                  </h3>
                  <button 
                    type="button" 
                    (click)="detectBrowserGps()" 
                    class="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="!text-xs">gps_fixed</mat-icon>
                    <span>Use Device GPS</span>
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Latitude *</label>
                    <input 
                      type="number" 
                      step="any"
                      formControlName="latitude" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Longitude *</label>
                    <input 
                      type="number" 
                      step="any"
                      formControlName="longitude" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <!-- Quick Presets -->
                <div class="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400 block">Quick Accra Hub Location Presets:</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.6231, -0.1582, 'Plot 48, Spintex Road Industrial Area')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      🏭 Spintex Atelier
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.5560, -0.2012, 'High Street Boulevard, Central Business District')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      🏛️ Accra Central
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.6380, -0.1550, 'Boundary Road, East Legon')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      📍 East Legon
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.6698, -0.0166, 'Harbor Commercial Gateway, Tema')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      🚢 Tema Harbor
                    </button>
                    <button 
                      type="button" 
                      (click)="setCoordinates(5.5840, -0.1780, 'Rangoon Lane, Cantonments Diplomatic Zone')" 
                      class="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      📍 Cantonments
                    </button>
                  </div>
                </div>
              </div>

              <!-- Workshop Logistics & Contact Details -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">contact_phone</mat-icon>
                  <span>Operations, Counter & Manager Details</span>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Shop Manager Name</label>
                    <input 
                      type="text" 
                      formControlName="managerName" 
                      placeholder="e.g. Kwame Mensah" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Dispatch Logistics Radius (km) *</label>
                    <div class="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="1" 
                        max="200" 
                        formControlName="dispatchRadiusKm" 
                        class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                      <span class="text-xs text-slate-400 font-bold">km</span>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Phone (SMS Alerts) *</label>
                    <input 
                      type="text" 
                      formControlName="phone" 
                      placeholder="+233 24 100 0002" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Official Email</label>
                    <input 
                      type="email" 
                      formControlName="email" 
                      placeholder="spintex.workshop@doormasterops.com" 
                      class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Operating / Dispatch Hours</label>
                  <input 
                    type="text" 
                    formControlName="operatingHours" 
                    placeholder="Mon - Sat: 08:00 - 18:00" 
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <!-- Sticky Modal Actions Footer -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div class="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <mat-icon class="!text-xs text-emerald-600">database</mat-icon>
                  <span>Persisted in MySQL table <code class="font-mono text-cyan-600 dark:text-cyan-400">shop_locations</code></span>
                </div>
                <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button 
                    type="button" 
                    (click)="closeLocationSettingsModal()"
                    class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    [disabled]="!locationSettingsForm.valid || isSavingLocationSettings()"
                    class="px-5 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    @if (isSavingLocationSettings()) {
                      <mat-icon class="!text-sm animate-spin">refresh</mat-icon>
                      <span>Saving to DB...</span>
                    } @else {
                      <mat-icon class="!text-sm">save</mat-icon>
                      <span>Save Location to Database</span>
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
            }]
    }], null, { jobSelected: [{ type: i0.Output, args: ["jobSelected"] }], newJobOpened: [{ type: i0.Output, args: ["newJobOpened"] }], settingsOpened: [{ type: i0.Output, args: ["settingsOpened"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ShopPortal, { className: "ShopPortal", filePath: "frontend/src/app/views/shop-portal/shop-portal.ts", lineNumber: 1259 }); })();
