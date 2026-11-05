import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { RejectionModal } from '../../components/rejection-modal/rejection-modal';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function DispatcherPortal_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const disp_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", disp_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", disp_r1.name, " (", disp_r1.assignedTruck.plate, ")");
} }
function DispatcherPortal_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 38)(2, "div", 39)(3, "mat-icon");
    i0.ɵɵtext(4, "local_shipping");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div")(6, "div", 40)(7, "h2", 41);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 42);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 43);
    i0.ɵɵtext(12, " Assigned Truck: ");
    i0.ɵɵelementStart(13, "strong", 44);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 45)(17, "div")(18, "span", 46);
    i0.ɵɵtext(19, "Deliveries Completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 47);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "span", 46);
    i0.ɵɵtext(24, "Driver Rating");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 48);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div")(28, "span", 46);
    i0.ɵɵtext(29, "Phone Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span", 49);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const d_r2 = i0.ɵɵnextContext().activeDispatcher();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(d_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(d_r2.status === "on_route" ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800" : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", d_r2.status.replace("_", " "), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(d_r2.assignedTruck.plate);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" \u00B7 ", d_r2.assignedTruck.model, " (Max: ", d_r2.assignedTruck.capacityKg, " kg) ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(d_r2.completedDeliveries);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u2605 ", d_r2.rating);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r2.phone);
} }
function DispatcherPortal_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "mat-icon", 50);
    i0.ɵɵtext(2, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4", 51);
    i0.ɵɵtext(4, "No active delivery runs assigned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 52);
    i0.ɵɵtext(6, "Once Operations Manager sets up a truck for a booked installation, it will appear here for cargo loading.");
    i0.ɵɵelementEnd()();
} }
function DispatcherPortal_For_76_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59)(1, "mat-icon", 69);
    i0.ɵɵtext(2, "directions_car");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Truck: ", job_r3.logisticsTruck.truckPlate);
} }
function DispatcherPortal_For_76_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1, " Receiving Field Technician: ");
    i0.ɵɵelementStart(2, "strong", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r3.assignedInstallerName);
} }
function DispatcherPortal_For_76_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71)(1, "mat-icon", 90);
    i0.ɵɵtext(2, "hourglass_top");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Receiving Field Technician: ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6, "Pending Assignment");
    i0.ɵɵelementEnd()()();
} }
function DispatcherPortal_For_76_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \"", job_r3.client.accessInstructions, "\" ");
} }
function DispatcherPortal_For_76_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79)(1, "div", 91)(2, "mat-icon", 92);
    i0.ɵɵtext(3, "notifications_active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "span", 93);
    i0.ɵɵtext(6, "New Run Assignment Confirmation Needed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 94);
    i0.ɵɵtext(8, "Accept this delivery or reject with an explanation so Operations can reassign.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 40)(10, "button", 95);
    i0.ɵɵlistener("click", function DispatcherPortal_For_76_Conditional_62_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r4); const job_r3 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.acceptRun(job_r3.id)); });
    i0.ɵɵelementStart(11, "mat-icon", 69);
    i0.ɵɵtext(12, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Accept Run");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "button", 96);
    i0.ɵɵlistener("click", function DispatcherPortal_For_76_Conditional_62_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r4); const job_r3 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.openRejectModal(job_r3.id)); });
    i0.ɵɵelementStart(16, "mat-icon", 69);
    i0.ɵɵtext(17, "cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Reject with Reason");
    i0.ɵɵelementEnd()()()();
} }
function DispatcherPortal_For_76_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80)(1, "span", 97)(2, "mat-icon", 98);
    i0.ɵɵtext(3, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Run Accepted by You. Standby for convoy departure.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 99);
    i0.ɵɵtext(7, "SMS alert logged");
    i0.ɵɵelementEnd()();
} }
function DispatcherPortal_For_76_Conditional_64_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 102);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r3 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Proposed alternate slot: ", job_r3.driverProposedSlot);
} }
function DispatcherPortal_For_76_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81)(1, "span", 100)(2, "mat-icon", 101);
    i0.ɵɵtext(3, "cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(6, DispatcherPortal_For_76_Conditional_64_Conditional_6_Template, 2, 1, "span", 102);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("You rejected this run: ", job_r3.driverRejectReason);
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r3.driverProposedSlot ? 6 : -1);
} }
function DispatcherPortal_For_76_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Stage 1 of 4: At Workshop (Loading & Departure) ");
} }
function DispatcherPortal_For_76_Conditional_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Stage 2 of 4: En Route to Client Site (Live OSM Motion) ");
} }
function DispatcherPortal_For_76_Conditional_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Stage 3 of 4: Cargo Delivered to Site ");
} }
function DispatcherPortal_For_76_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Stage 4 of 4: Handed Over & Installation Active ");
} }
function DispatcherPortal_For_76_Conditional_78_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 103);
    i0.ɵɵlistener("click", function DispatcherPortal_For_76_Conditional_78_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const job_r3 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateTrip(job_r3.id, "inspected_and_loaded")); });
    i0.ɵɵelementStart(1, "mat-icon", 104);
    i0.ɵɵtext(2, "checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "1. Inspect & Confirm Cargo Loaded");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 105);
    i0.ɵɵlistener("click", function DispatcherPortal_For_76_Conditional_78_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const job_r3 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.startLiveTrip(job_r3.id)); });
    i0.ɵɵelementStart(6, "mat-icon", 69);
    i0.ɵɵtext(7, "play_arrow");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "2. Start Live Trip (Sends SMS to Shop & Client)");
    i0.ɵɵelementEnd()();
} }
function DispatcherPortal_For_76_Conditional_79_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 106);
    i0.ɵɵlistener("click", function DispatcherPortal_For_76_Conditional_79_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const job_r3 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.markDelivered(job_r3.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 69);
    i0.ɵɵtext(2, "done_all");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "3. Mark Delivered on Site (Sends SMS to Mgr, Shop & Client)");
    i0.ɵɵelementEnd()();
} }
function DispatcherPortal_For_76_Conditional_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88)(1, "mat-icon", 107);
    i0.ɵɵtext(2, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Cargo Handed Over on Site. Technician ready for lock installation.");
    i0.ɵɵelementEnd()();
} }
function DispatcherPortal_For_76_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89)(1, "mat-icon", 107);
    i0.ɵɵtext(2, "task_alt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Delivery Completed. Installation in progress or finished.");
    i0.ɵɵelementEnd()();
} }
function DispatcherPortal_For_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 53)(2, "div", 54)(3, "div", 40)(4, "span", 55);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h4", 41);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 42);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 56);
    i0.ɵɵtext(11, " Workshop Origin: ");
    i0.ɵɵelementStart(12, "strong", 57);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " \u00B7 Scheduled: ");
    i0.ɵɵelementStart(15, "span", 58);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 40);
    i0.ɵɵconditionalCreate(18, DispatcherPortal_For_76_Conditional_18_Template, 5, 1, "span", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 60)(20, "div", 61)(21, "span", 62)(22, "mat-icon", 63);
    i0.ɵɵtext(23, "inventory_2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Cargo & Lock Specification");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "p", 64);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "p", 65);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 66)(32, "span", 67);
    i0.ɵɵtext(33, "Hardware / Lock Item:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p", 68)(35, "mat-icon", 69);
    i0.ɵɵtext(36, "lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(39, DispatcherPortal_For_76_Conditional_39_Template, 4, 1, "p", 70)(40, DispatcherPortal_For_76_Conditional_40_Template, 7, 0, "p", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 61)(42, "span", 62)(43, "mat-icon", 72);
    i0.ɵɵtext(44, "person_pin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span");
    i0.ɵɵtext(46, "Client & Delivery Site");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div")(48, "p", 73);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "p", 74)(51, "mat-icon", 75);
    i0.ɵɵtext(52, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span");
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(55, "div", 76)(56, "a", 77)(57, "mat-icon", 69);
    i0.ɵɵtext(58, "phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span");
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(61, DispatcherPortal_For_76_Conditional_61_Template, 2, 1, "p", 78);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(62, DispatcherPortal_For_76_Conditional_62_Template, 20, 0, "div", 79)(63, DispatcherPortal_For_76_Conditional_63_Template, 8, 0, "div", 80)(64, DispatcherPortal_For_76_Conditional_64_Template, 7, 2, "div", 81);
    i0.ɵɵelementStart(65, "div", 82)(66, "div", 83)(67, "span", 84)(68, "mat-icon", 69);
    i0.ɵɵtext(69, "route");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "span");
    i0.ɵɵtext(71, "Dispatcher Trip Controls");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(72, "span", 85);
    i0.ɵɵconditionalCreate(73, DispatcherPortal_For_76_Conditional_73_Template, 1, 0)(74, DispatcherPortal_For_76_Conditional_74_Template, 1, 0)(75, DispatcherPortal_For_76_Conditional_75_Template, 1, 0)(76, DispatcherPortal_For_76_Conditional_76_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(77, "div", 86);
    i0.ɵɵconditionalCreate(78, DispatcherPortal_For_76_Conditional_78_Template, 10, 0)(79, DispatcherPortal_For_76_Conditional_79_Template, 5, 0, "button", 87)(80, DispatcherPortal_For_76_Conditional_80_Template, 5, 0, "div", 88)(81, DispatcherPortal_For_76_Conditional_81_Template, 5, 0, "div", 89);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const job_r3 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", job_r3.id, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r3.doorModel);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r4.getStatusBadgeClass(job_r3.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", job_r3.status.replace("_", " "), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r3.shopBranch);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r3.scheduledDate);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r3.logisticsTruck ? 18 : -1);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate2("", job_r3.doorModel, " (", job_r3.dimensions, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", job_r3.finish, " \u00B7 ", job_r3.hardwareSpecs);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(job_r3.lockModel || "Doormaster High-Security Smart Lock");
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r3.assignedInstallerName ? 39 : 40);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(job_r3.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r3.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", "tel:" + job_r3.client.phone, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Call Client (", job_r3.client.phone, ")");
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r3.client.accessInstructions ? 61 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r3.driverAssignmentStatus !== "accepted" && job_r3.driverAssignmentStatus !== "rejected" ? 62 : job_r3.driverAssignmentStatus === "accepted" ? 63 : job_r3.driverAssignmentStatus === "rejected" ? 64 : -1);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(job_r3.status === "truck_assigned" || job_r3.status === "booked_at_shop" || job_r3.status === "site_funds_dispatched" || job_r3.status === "approved" ? 73 : job_r3.status === "dispatched" ? 74 : job_r3.status === "delivered_on_site" ? 75 : 76);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(job_r3.status === "truck_assigned" || job_r3.status === "site_funds_dispatched" || job_r3.status === "booked_at_shop" || job_r3.status === "approved" ? 78 : job_r3.status === "dispatched" ? 79 : job_r3.status === "delivered_on_site" ? 80 : 81);
} }
function DispatcherPortal_Conditional_90_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-rejection-modal", 108);
    i0.ɵɵlistener("rejected", function DispatcherPortal_Conditional_90_Template_app_rejection_modal_rejected_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.handleRejectSubmit($event)); })("canceled", function DispatcherPortal_Conditional_90_Template_app_rejection_modal_canceled_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.rejectingJobId.set(null)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("jobId", ctx_r4.rejectingJobId())("roleTitle", "Logistics Dispatch Driver")("isDriver", true);
} }
export class DispatcherPortal {
    store = inject(InstallationStore);
    rejectingJobId = signal(null, ...(ngDevMode ? [{ debugName: "rejectingJobId" }] : /* istanbul ignore next */ []));
    activeDispatcher = computed(() => this.store.activeDispatcher(), ...(ngDevMode ? [{ debugName: "activeDispatcher" }] : /* istanbul ignore next */ []));
    pendingLoadingJobs = computed(() => this.store.dispatcherJobs().filter(j => j.status === 'truck_assigned' || j.status === 'site_funds_dispatched' || j.status === 'booked_at_shop' || j.status === 'approved'), ...(ngDevMode ? [{ debugName: "pendingLoadingJobs" }] : /* istanbul ignore next */ []));
    activeEnRouteJobs = computed(() => this.store.dispatcherJobs().filter(j => j.status === 'dispatched'), ...(ngDevMode ? [{ debugName: "activeEnRouteJobs" }] : /* istanbul ignore next */ []));
    deliveredJobs = computed(() => this.store.dispatcherJobs().filter(j => j.status === 'delivered_on_site' || j.status === 'on_site' || j.status === 'completed'), ...(ngDevMode ? [{ debugName: "deliveredJobs" }] : /* istanbul ignore next */ []));
    onDispatcherChange(event) {
        const target = event.target;
        this.store.currentDispatcherId.set(target.value);
    }
    acceptRun(jobId) {
        this.store.respondDriverAssignment(jobId, true);
    }
    openRejectModal(jobId) {
        this.rejectingJobId.set(jobId);
    }
    handleRejectSubmit(event) {
        const jobId = this.rejectingJobId();
        if (!jobId)
            return;
        const combinedReason = `${event.reason}${event.details ? ': ' + event.details : ''}`;
        this.store.respondDriverAssignment(jobId, false, combinedReason, event.proposedSlot);
        this.rejectingJobId.set(null);
    }
    startLiveTrip(jobId) {
        this.store.startLiveMotion(jobId);
    }
    markDelivered(jobId) {
        this.store.markDeliveredByDriver(jobId);
    }
    updateTrip(jobId, stage) {
        if (stage === 'departed_shop') {
            this.store.startLiveMotion(jobId);
        }
        else if (stage === 'delivered_cargo') {
            this.store.markDeliveredByDriver(jobId);
        }
        else {
            this.store.updateDispatcherTripStage(jobId, stage);
        }
    }
    getStatusBadgeClass(status) {
        switch (status) {
            case 'dispatched':
                return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-800';
            case 'delivered_on_site':
            case 'on_site':
                return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
            case 'truck_assigned':
            case 'site_funds_dispatched':
            case 'approved':
                return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
            default:
                return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
        }
    }
    static ɵfac = function DispatcherPortal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DispatcherPortal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DispatcherPortal, selectors: [["app-dispatcher-portal"]], decls: 91, vars: 10, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-2", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], [1, "text-teal-700", "dark:text-teal-400", "font-bold", "flex", "items-center", "gap-1"], [1, "w-2", "h-2", "rounded-full", "bg-teal-500", "animate-pulse"], [1, "text-xl", "sm:text-2xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "flex", "items-center", "gap-3"], ["for", "dispatcherSelectDriver", 1, "block", "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase", "font-mono", "font-bold", "mb-1"], ["id", "dispatcherSelectDriver", 1, "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-slate-50", "dark:bg-slate-800", "font-semibold", "text-slate-800", "dark:text-slate-200", "focus:outline-none", "focus:ring-1", "focus:ring-teal-600", 3, "change", "value"], [3, "value"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-4", "sm:p-5", "shadow-xs", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-4"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-[11px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-black", "font-mono", "text-slate-900", "dark:text-white", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-amber-700", "dark:text-amber-400", "font-bold"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2"], [1, "text-3xl", "font-black", "font-mono", "text-teal-700", "dark:text-teal-400", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-teal-800", "dark:text-teal-300", "font-medium"], [1, "text-3xl", "font-black", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "text-xs", "text-slate-500", "font-medium"], [1, "space-y-4"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white", "uppercase", "tracking-wider"], [1, "text-xs", "font-mono", "text-slate-500"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-dashed", "border-slate-300", "dark:border-slate-800", "p-12", "text-center"], [1, "grid", "grid-cols-1", "gap-5"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "shadow-xs", "space-y-4"], [1, "space-y-3", "pt-4", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-2"], [1, "!text-sm", "text-teal-600"], [1, "text-xs", "text-slate-500"], [1, "text-xs", "font-mono", "font-bold", "text-teal-600", "dark:text-teal-400", "bg-teal-50", "dark:bg-teal-950", "px-2.5", "py-1", "rounded-lg", "border", "border-teal-200", "dark:border-teal-800"], [3, "mode"], [3, "jobId", "roleTitle", "isDriver"], [1, "flex", "items-center", "gap-4"], [1, "w-12", "h-12", "rounded-2xl", "bg-teal-600", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-lg", "shadow-sm"], [1, "flex", "items-center", "gap-2"], [1, "text-base", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "font-bold", "px-2", "py-0.5", "rounded-full", "capitalize"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-0.5", "font-mono"], [1, "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "gap-6", "border-t", "md:border-t-0", "md:border-l", "border-slate-100", "dark:border-slate-800", "pt-3", "md:pt-0", "md:pl-6", "text-xs"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400", "block"], [1, "text-base", "font-black", "font-mono", "text-slate-900", "dark:text-white", "tabular-nums"], [1, "text-base", "font-black", "font-mono", "text-amber-500", "tabular-nums"], [1, "text-xs", "font-mono", "text-slate-700", "dark:text-slate-300", "font-semibold"], [1, "!text-4xl", "text-slate-400", "mb-2"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "flex", "flex-wrap", "items-start", "justify-between", "gap-3", "border-b", "border-slate-100", "dark:border-slate-800", "pb-3"], [1, "space-y-1"], [1, "font-mono", "text-xs", "font-extrabold", "text-teal-700", "dark:text-teal-400", "bg-teal-50", "dark:bg-teal-950/50", "px-2", "py-0.5", "rounded", "border", "border-teal-200", "dark:border-teal-800"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-slate-700", "dark:text-slate-300"], [1, "font-mono", "font-medium"], [1, "text-xs", "font-mono", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "px-2.5", "py-1", "rounded-lg", "border", "border-slate-200", "dark:border-slate-700", "font-bold", "flex", "items-center", "gap-1"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "text-xs"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "space-y-2.5"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400", "tracking-wider", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-teal-600"], [1, "text-slate-900", "dark:text-white", "font-bold"], [1, "text-slate-500", "dark:text-slate-400", "text-[11px]"], [1, "p-2.5", "bg-white", "dark:bg-slate-900", "rounded-lg", "border", "border-slate-200", "dark:border-slate-700"], [1, "text-[10px]", "text-slate-400", "uppercase", "font-bold", "block", "mb-0.5"], [1, "font-extrabold", "text-amber-600", "dark:text-amber-400", "flex", "items-center", "gap-1"], [1, "!text-xs"], [1, "text-[11px]", "text-slate-600", "dark:text-slate-400"], [1, "text-[11px]", "text-amber-700", "dark:text-amber-400", "font-semibold", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-indigo-600"], [1, "text-slate-900", "dark:text-white", "font-extrabold", "text-sm"], [1, "text-slate-600", "dark:text-slate-300", "font-mono", "text-[11px]", "flex", "items-center", "gap-1", "mt-0.5"], [1, "!text-xs", "text-red-500"], [1, "flex", "items-center", "gap-3", "pt-1"], [1, "px-3", "py-1", "bg-white", "dark:bg-slate-900", "hover:bg-slate-100", "dark:hover:bg-slate-800", "text-slate-700", "dark:text-slate-200", "rounded-lg", "border", "border-slate-200", "dark:border-slate-700", "font-bold", "flex", "items-center", "gap-1", "transition-colors", 3, "href"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "italic"], [1, "p-3.5", "bg-amber-50", "dark:bg-amber-950/40", "rounded-xl", "border", "border-amber-200", "dark:border-amber-900", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3"], [1, "p-2.5", "bg-emerald-50", "dark:bg-emerald-950/30", "rounded-xl", "border", "border-emerald-200", "dark:border-emerald-900/60", "flex", "items-center", "justify-between", "text-xs", "text-emerald-800", "dark:text-emerald-300"], [1, "p-2.5", "bg-red-50", "dark:bg-red-950/30", "rounded-xl", "border", "border-red-200", "dark:border-red-900/60", "text-xs", "text-red-800", "dark:text-red-300"], [1, "bg-slate-900", "dark:bg-slate-950", "text-white", "p-4", "rounded-xl", "space-y-3"], [1, "flex", "items-center", "justify-between", "text-xs"], [1, "font-bold", "flex", "items-center", "gap-1.5", "text-teal-400", "uppercase", "tracking-wider", "text-[11px]"], [1, "text-[11px]", "text-slate-400", "font-mono"], [1, "flex", "flex-wrap", "items-center", "gap-2.5"], ["type", "button", 1, "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95"], [1, "flex", "items-center", "gap-2", "text-emerald-400", "font-bold", "text-xs"], [1, "flex", "items-center", "gap-2", "text-slate-400", "font-medium", "text-xs"], [1, "!text-[12px]", "!w-3", "!h-3"], [1, "flex", "items-center", "gap-2", "text-amber-900", "dark:text-amber-200"], [1, "!text-sm", "text-amber-600"], [1, "font-bold", "text-xs", "block"], [1, "text-[11px]", "text-amber-700", "dark:text-amber-400"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "rounded-lg", "font-bold", "text-xs", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-red-600", "hover:bg-red-700", "text-white", "rounded-lg", "font-bold", "text-xs", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], [1, "flex", "items-center", "gap-1.5", "font-bold"], [1, "!text-xs", "text-emerald-600"], [1, "text-[10px]", "font-mono", "text-emerald-600", "dark:text-emerald-400"], [1, "font-bold", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-red-600"], [1, "block", "text-[11px]", "text-red-600", "dark:text-red-400", "mt-0.5"], ["type", "button", 1, "px-4", "py-2", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "rounded-xl", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1.5", "border", "border-slate-700", 3, "click"], [1, "!text-xs", "text-teal-400"], ["type", "button", 1, "px-4", "py-2", "bg-teal-600", "hover:bg-teal-500", "text-white", "rounded-xl", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", 3, "click"], [1, "!text-sm"], [3, "rejected", "canceled", "jobId", "roleTitle", "isDriver"]], template: function DispatcherPortal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "DoorMaster Logistics Fleet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Heavy Transport & Hardware Delivery");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 4);
            i0.ɵɵelement(13, "span", 5);
            i0.ɵɵelementStart(14, "span");
            i0.ɵɵtext(15, "Truck Dispatch Active");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "h1", 6);
            i0.ɵɵtext(17, "Logistics Dispatcher & Delivery Portal");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 7)(19, "div")(20, "label", 8);
            i0.ɵɵtext(21, "Active Driver");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "select", 9);
            i0.ɵɵlistener("change", function DispatcherPortal_Template_select_change_22_listener($event) { return ctx.onDispatcherChange($event); });
            i0.ɵɵrepeaterCreate(23, DispatcherPortal_For_24_Template, 2, 3, "option", 10, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵconditionalCreate(25, DispatcherPortal_Conditional_25_Template, 32, 10, "div", 11);
            i0.ɵɵelementStart(26, "div", 12)(27, "div", 13)(28, "span", 14);
            i0.ɵɵtext(29, "Awaiting Loading");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 15)(31, "span", 16);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span", 17);
            i0.ɵɵtext(34, "At Workshop");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "p", 18);
            i0.ɵɵtext(36, "Ready for cargo inspection");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 13)(38, "span", 14);
            i0.ɵɵtext(39, "Active On Road");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 15)(41, "span", 19);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span", 20);
            i0.ɵɵtext(44, "In Transit");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "p", 18);
            i0.ɵɵtext(46, "GPS telemetry transmitting to client");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 13)(48, "span", 14);
            i0.ɵɵtext(49, "Delivered to Site");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 15)(51, "span", 21);
            i0.ɵɵtext(52);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 22);
            i0.ɵɵtext(54, "Handed Over");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "p", 18);
            i0.ɵɵtext(56, "Ready for lock & door install");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "div", 13)(58, "span", 14);
            i0.ɵɵtext(59, "Total Manifests");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 15)(61, "span", 16);
            i0.ɵɵtext(62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "span", 23);
            i0.ɵɵtext(64, "Orders");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "p", 18);
            i0.ɵɵtext(66, "Assigned to this fleet");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(67, "div", 24)(68, "div", 25)(69, "h3", 26);
            i0.ɵɵtext(70, " Current Delivery Manifests & Site Dispatches ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "span", 27);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(73, DispatcherPortal_Conditional_73_Template, 7, 0, "div", 28);
            i0.ɵɵelementStart(74, "div", 29);
            i0.ɵɵrepeaterCreate(75, DispatcherPortal_For_76_Template, 82, 22, "div", 30, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "div", 31)(78, "div", 25)(79, "div")(80, "h3", 32)(81, "mat-icon", 33);
            i0.ɵɵtext(82, "map");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "span");
            i0.ɵɵtext(84, "OpenStreetMap Live Road Telemetry & Vehicle Movement");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "p", 34);
            i0.ɵɵtext(86, "Live continuous interpolation along road routes with real speed & dynamic ETA");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "span", 35);
            i0.ɵɵtext(88, " Greater Accra Delivery Corridors ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(89, "app-osm-live-map", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(90, DispatcherPortal_Conditional_90_Template, 1, 3, "app-rejection-modal", 37);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("value", ctx.store.currentDispatcherId());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.store.dispatchers());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.activeDispatcher() ? 25 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" ", ctx.pendingLoadingJobs().length, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.activeEnRouteJobs().length, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.deliveredJobs().length, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.store.dispatcherJobs().length, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.store.dispatcherJobs().length, " manifests");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.store.dispatcherJobs().length === 0 ? 73 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.store.dispatcherJobs());
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("mode", "all-fleet");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.rejectingJobId() ? 90 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, RejectionModal, OsmLiveMap], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DispatcherPortal, [{
        type: Component,
        args: [{
                selector: 'app-dispatcher-portal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, RejectionModal, OsmLiveMap],
                template: `
    <div class="space-y-6">
      <!-- Portal Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Logistics Fleet</span>
            <span aria-hidden="true">·</span>
            <span>Heavy Transport & Hardware Delivery</span>
            <span aria-hidden="true">·</span>
            <span class="text-teal-700 dark:text-teal-400 font-bold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span>Truck Dispatch Active</span>
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Logistics Dispatcher & Delivery Portal</h1>
        </div>

        <!-- Driver / Truck Selector -->
        <div class="flex items-center gap-3">
          <div>
            <label for="dispatcherSelectDriver" class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold mb-1">Active Driver</label>
            <select 
              id="dispatcherSelectDriver"
              [value]="store.currentDispatcherId()"
              (change)="onDispatcherChange($event)"
              class="text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-600"
            >
              @for (disp of store.dispatchers(); track disp.id) {
                <option [value]="disp.id">{{ disp.name }} ({{ disp.assignedTruck.plate }})</option>
              }
            </select>
          </div>
        </div>
      </div>

      <!-- Driver & Assigned Truck Profile Bar -->
      @if (activeDispatcher()) {
        @let d = activeDispatcher()!;
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <mat-icon>local_shipping</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-extrabold text-slate-900 dark:text-white">{{ d.name }}</h2>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full capitalize"
                  [class]="d.status === 'on_route' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'">
                  {{ d.status.replace('_', ' ') }}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Assigned Truck: <strong class="text-slate-900 dark:text-white">{{ d.assignedTruck.plate }}</strong> · {{ d.assignedTruck.model }} (Max: {{ d.assignedTruck.capacityKg }} kg)
              </p>
            </div>
          </div>

          <div class="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-3 md:pt-0 md:pl-6 text-xs">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Deliveries Completed</span>
              <span class="text-base font-black font-mono text-slate-900 dark:text-white tabular-nums">{{ d.completedDeliveries }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Driver Rating</span>
              <span class="text-base font-black font-mono text-amber-500 tabular-nums">★ {{ d.rating }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Phone Contact</span>
              <span class="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">{{ d.phone }}</span>
            </div>
          </div>
        </div>
      }

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Awaiting Loading</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ pendingLoadingJobs().length }}
            </span>
            <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">At Workshop</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Ready for cargo inspection</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Active On Road</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-teal-700 dark:text-teal-400 tracking-tight tabular-nums">
              {{ activeEnRouteJobs().length }}
            </span>
            <span class="text-xs text-teal-800 dark:text-teal-300 font-medium">In Transit</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">GPS telemetry transmitting to client</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Delivered to Site</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              {{ deliveredJobs().length }}
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Handed Over</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Ready for lock & door install</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Manifests</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ store.dispatcherJobs().length }}
            </span>
            <span class="text-xs text-slate-500 font-medium">Orders</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Assigned to this fleet</p>
        </div>
      </div>

      <!-- Active Delivery Trips Cards -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Current Delivery Manifests & Site Dispatches
          </h3>
          <span class="text-xs font-mono text-slate-500">{{ store.dispatcherJobs().length }} manifests</span>
        </div>

        @if (store.dispatcherJobs().length === 0) {
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
            <mat-icon class="!text-4xl text-slate-400 mb-2">local_shipping</mat-icon>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">No active delivery runs assigned</h4>
            <p class="text-xs text-slate-400 mt-1">Once Operations Manager sets up a truck for a booked installation, it will appear here for cargo loading.</p>
          </div>
        }

        <div class="grid grid-cols-1 gap-5">
          @for (job of store.dispatcherJobs(); track job.id) {
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
              <!-- Top Card Bar -->
              <div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-extrabold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {{ job.id }}
                    </span>
                    <h4 class="text-base font-extrabold text-slate-900 dark:text-white">{{ job.doorModel }}</h4>
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded-full capitalize"
                      [class]="getStatusBadgeClass(job.status)">
                      {{ job.status.replace('_', ' ') }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    Workshop Origin: <strong class="text-slate-700 dark:text-slate-300">{{ job.shopBranch }}</strong> · Scheduled: <span class="font-mono font-medium">{{ job.scheduledDate }}</span>
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  @if (job.logisticsTruck) {
                    <span class="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-1">
                      <mat-icon class="!text-xs">directions_car</mat-icon>
                      <span>Truck: {{ job.logisticsTruck.truckPlate }}</span>
                    </span>
                  }
                </div>
              </div>

              <!-- Two Column Details: Cargo & Client Site -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <!-- Cargo & Lock Specification -->
                <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs text-teal-600">inventory_2</mat-icon>
                    <span>Cargo & Lock Specification</span>
                  </span>
                  <div>
                    <p class="text-slate-900 dark:text-white font-bold">{{ job.doorModel }} ({{ job.dimensions }})</p>
                    <p class="text-slate-500 dark:text-slate-400 text-[11px]">{{ job.finish }} · {{ job.hardwareSpecs }}</p>
                  </div>
                  <div class="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span class="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Hardware / Lock Item:</span>
                    <p class="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">lock</mat-icon>
                      <span>{{ job.lockModel || 'Doormaster High-Security Smart Lock' }}</span>
                    </p>
                  </div>
                  @if (job.assignedInstallerName) {
                    <p class="text-[11px] text-slate-600 dark:text-slate-400">
                      Receiving Field Technician: <strong class="text-slate-900 dark:text-white">{{ job.assignedInstallerName }}</strong>
                    </p>
                  } @else {
                    <p class="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <mat-icon class="!text-[12px] !w-3 !h-3">hourglass_top</mat-icon>
                      <span>Receiving Field Technician: <strong>Pending Assignment</strong></span>
                    </p>
                  }
                </div>

                <!-- Client & Site Owner Destination -->
                <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs text-indigo-600">person_pin</mat-icon>
                    <span>Client & Delivery Site</span>
                  </span>
                  <div>
                    <p class="text-slate-900 dark:text-white font-extrabold text-sm">{{ job.client.name }}</p>
                    <p class="text-slate-600 dark:text-slate-300 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span>{{ job.client.siteAddress }}</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-3 pt-1">
                    <a 
                      [href]="'tel:' + job.client.phone" 
                      class="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-1 transition-colors"
                    >
                      <mat-icon class="!text-xs">phone</mat-icon>
                      <span>Call Client ({{ job.client.phone }})</span>
                    </a>
                  </div>
                  @if (job.client.accessInstructions) {
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      "{{ job.client.accessInstructions }}"
                    </p>
                  }
                </div>
              </div>

              <!-- Driver Assignment Response Banner -->
              @if (job.driverAssignmentStatus !== 'accepted' && job.driverAssignmentStatus !== 'rejected') {
                <div class="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                    <mat-icon class="!text-sm text-amber-600">notifications_active</mat-icon>
                    <div>
                      <span class="font-bold text-xs block">New Run Assignment Confirmation Needed</span>
                      <span class="text-[11px] text-amber-700 dark:text-amber-400">Accept this delivery or reject with an explanation so Operations can reassign.</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button 
                      type="button"
                      (click)="acceptRun(job.id)"
                      class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <mat-icon class="!text-xs">check_circle</mat-icon>
                      <span>Accept Run</span>
                    </button>
                    <button 
                      type="button"
                      (click)="openRejectModal(job.id)"
                      class="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <mat-icon class="!text-xs">cancel</mat-icon>
                      <span>Reject with Reason</span>
                    </button>
                  </div>
                </div>
              } @else if (job.driverAssignmentStatus === 'accepted') {
                <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                  <span class="flex items-center gap-1.5 font-bold">
                    <mat-icon class="!text-xs text-emerald-600">verified</mat-icon>
                    <span>Run Accepted by You. Standby for convoy departure.</span>
                  </span>
                  <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">SMS alert logged</span>
                </div>
              } @else if (job.driverAssignmentStatus === 'rejected') {
                <div class="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-300">
                  <span class="font-bold flex items-center gap-1">
                    <mat-icon class="!text-xs text-red-600">cancel</mat-icon>
                    <span>You rejected this run: {{ job.driverRejectReason }}</span>
                  </span>
                  @if (job.driverProposedSlot) {
                    <span class="block text-[11px] text-red-600 dark:text-red-400 mt-0.5">Proposed alternate slot: {{ job.driverProposedSlot }}</span>
                  }
                </div>
              }

              <!-- Driver Trip Workflow Stage Controls -->
              <div class="bg-slate-900 dark:bg-slate-950 text-white p-4 rounded-xl space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold flex items-center gap-1.5 text-teal-400 uppercase tracking-wider text-[11px]">
                    <mat-icon class="!text-xs">route</mat-icon>
                    <span>Dispatcher Trip Controls</span>
                  </span>
                  <span class="text-[11px] text-slate-400 font-mono">
                    @if (job.status === 'truck_assigned' || job.status === 'booked_at_shop' || job.status === 'site_funds_dispatched' || job.status === 'approved') {
                      Stage 1 of 4: At Workshop (Loading & Departure)
                    } @else if (job.status === 'dispatched') {
                      Stage 2 of 4: En Route to Client Site (Live OSM Motion)
                    } @else if (job.status === 'delivered_on_site') {
                      Stage 3 of 4: Cargo Delivered to Site
                    } @else {
                      Stage 4 of 4: Handed Over & Installation Active
                    }
                  </span>
                </div>

                <!-- Action Button Matrix -->
                <div class="flex flex-wrap items-center gap-2.5">
                  @if (job.status === 'truck_assigned' || job.status === 'site_funds_dispatched' || job.status === 'booked_at_shop' || job.status === 'approved') {
                    <button 
                      type="button"
                      (click)="updateTrip(job.id, 'inspected_and_loaded')"
                      class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                      <mat-icon class="!text-xs text-teal-400">checklist</mat-icon>
                      <span>1. Inspect & Confirm Cargo Loaded</span>
                    </button>

                    <button 
                      type="button"
                      (click)="startLiveTrip(job.id)"
                      class="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <mat-icon class="!text-xs">play_arrow</mat-icon>
                      <span>2. Start Live Trip (Sends SMS to Shop & Client)</span>
                    </button>
                  } @else if (job.status === 'dispatched') {
                    <button 
                      type="button"
                      (click)="markDelivered(job.id)"
                      class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <mat-icon class="!text-xs">done_all</mat-icon>
                      <span>3. Mark Delivered on Site (Sends SMS to Mgr, Shop & Client)</span>
                    </button>
                  } @else if (job.status === 'delivered_on_site') {
                    <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <mat-icon class="!text-sm">verified</mat-icon>
                      <span>Cargo Handed Over on Site. Technician ready for lock installation.</span>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2 text-slate-400 font-medium text-xs">
                      <mat-icon class="!text-sm">task_alt</mat-icon>
                      <span>Delivery Completed. Installation in progress or finished.</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Live OpenStreetMap Navigation & Fleet Movement -->
      <div class="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <mat-icon class="!text-sm text-teal-600">map</mat-icon>
              <span>OpenStreetMap Live Road Telemetry & Vehicle Movement</span>
            </h3>
            <p class="text-xs text-slate-500">Live continuous interpolation along road routes with real speed & dynamic ETA</p>
          </div>
          <span class="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800">
            Greater Accra Delivery Corridors
          </span>
        </div>
        <app-osm-live-map [mode]="'all-fleet'"></app-osm-live-map>
      </div>

      <!-- Rejection Modal -->
      @if (rejectingJobId()) {
        <app-rejection-modal
          [jobId]="rejectingJobId()!"
          [roleTitle]="'Logistics Dispatch Driver'"
          [isDriver]="true"
          (rejected)="handleRejectSubmit($event)"
          (canceled)="rejectingJobId.set(null)"
        ></app-rejection-modal>
      }
    </div>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DispatcherPortal, { className: "DispatcherPortal", filePath: "frontend/src/app/views/dispatcher-portal/dispatcher-portal.ts", lineNumber: 388 }); })();
