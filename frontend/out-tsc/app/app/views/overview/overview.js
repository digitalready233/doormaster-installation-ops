import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.key;
const _forTrack1 = ($index, $item) => $item.id;
function Overview_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 55);
    i0.ɵɵlistener("click", function Overview_Conditional_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.newJobOpened.emit()); });
    i0.ɵɵelementStart(1, "mat-icon", 10);
    i0.ɵɵtext(2, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Book Installation");
    i0.ɵɵelementEnd()();
} }
function Overview_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 56)(2, "div", 57)(3, "mat-icon", 58);
    i0.ɵɵtext(4, "how_to_reg");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div")(6, "div", 43)(7, "h3", 34);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 59);
    i0.ɵɵtext(10, " Approval Required ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 60);
    i0.ɵɵtext(12, " New user sign-ups are on hold. Review, approve, reject or assign roles in the Governance center. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "button", 61);
    i0.ɵɵlistener("click", function Overview_Conditional_81_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.manageUsersOpened.emit()); });
    i0.ɵɵelementStart(14, "mat-icon", 10);
    i0.ɵɵtext(15, "manage_accounts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Review & Authorize Users");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1(" User Registrations Awaiting Operational Approval (", ctx_r1.store.pendingUsers().length, ") ");
} }
function Overview_Conditional_82_For_10_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 82);
    i0.ɵɵtext(1, " Paid at Shop: ");
    i0.ɵɵelementStart(2, "strong", 92);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pending_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u20B5", pending_r5.shopBooking.amountPaidAtShop.toLocaleString());
} }
function Overview_Conditional_82_For_10_For_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 90);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tech_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", tech_r6.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", tech_r6.name, " (\u2605", tech_r6.metrics.avgRating, ") ", tech_r6.isSignedIn ? "\u2022 online" : "", " ");
} }
function Overview_Conditional_82_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67)(1, "div", 68)(2, "div")(3, "span", 69);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h4", 70);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 71);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 72);
    i0.ɵɵtext(10, " Booked at Shop ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 73)(12, "div")(13, "span", 74);
    i0.ɵɵtext(14, "Client / Site Owner:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 75);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 76)(18, "mat-icon", 77);
    i0.ɵɵtext(19, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 78);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "p", 79);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "span", 74);
    i0.ɵɵtext(26, "Lock Hardware:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 80)(28, "mat-icon", 81);
    i0.ɵɵtext(29, "lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span", 78);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(32, Overview_Conditional_82_For_10_Conditional_32_Template, 4, 1, "span", 82);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 83)(34, "div", 84)(35, "span", 85);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 86);
    i0.ɵɵelement(38, "span", 87);
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Installer: Pending");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(41, "div", 43)(42, "select", 88);
    i0.ɵɵlistener("change", function Overview_Conditional_82_For_10_Template_select_change_42_listener($event) { const pending_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onQuickAssignInstaller(pending_r5.id, $event)); });
    i0.ɵɵelementStart(43, "option", 89);
    i0.ɵɵtext(44, "-- Assign Installer --");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(45, Overview_Conditional_82_For_10_For_46_Template, 2, 4, "option", 90, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "button", 91);
    i0.ɵɵlistener("click", function Overview_Conditional_82_For_10_Template_button_click_47_listener() { const pending_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openSetupTruckModal(pending_r5)); });
    i0.ɵɵelementStart(48, "mat-icon", 81);
    i0.ɵɵtext(49, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51, "Assign Installer");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const pending_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(pending_r5.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pending_r5.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", pending_r5.dimensions, " \u00B7 ", pending_r5.finish);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(pending_r5.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(pending_r5.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pending_r5.client.phone);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(pending_r5.lockModel || "Smart Lock");
    i0.ɵɵadvance();
    i0.ɵɵconditional(pending_r5.shopBooking ? 32 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Date: ", pending_r5.scheduledDate);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.store.installers());
} }
function Overview_Conditional_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 62)(2, "div", 43);
    i0.ɵɵelement(3, "span", 63);
    i0.ɵɵelementStart(4, "h3", 64);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 65);
    i0.ɵɵtext(7, " Assign an available installer \u00B7 Shop Manager will be notified to assign store dispatch driver ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 66);
    i0.ɵɵrepeaterCreate(9, Overview_Conditional_82_For_10_Template, 52, 10, "div", 67, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Action Required: Shop Bookings Awaiting Installer (", ctx_r1.store.shopPendingTruckSetupJobs().length, ") ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.store.shopPendingTruckSetupJobs());
} }
function Overview_Conditional_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-osm-live-map", 31);
} if (rf & 2) {
    i0.ɵɵproperty("mode", "all-fleet");
} }
function Overview_For_97_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function Overview_For_97_Template_button_click_0_listener() { const stage_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setFilter(stage_r8.key)); });
    i0.ɵɵelementStart(1, "span", 94);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 95);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r1.selectedFilter() === stage_r8.key ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-bold shadow-xs" : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.countJobsByStage(stage_r8.key));
} }
function Overview_Conditional_108_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 96);
    i0.ɵɵlistener("click", function Overview_Conditional_108_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearFilters()); });
    i0.ɵɵtext(1, " Clear all filters ");
    i0.ɵɵelementEnd();
} }
function Overview_For_129_Conditional_17_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 117)(1, "mat-icon", 121);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Accepted");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_17_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 118)(1, "mat-icon", 121);
    i0.ɵɵtext(2, "cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Rejected");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("title", (job_r11.installerRejectReason || "Rejected") + (job_r11.installerProposedSlot ? " | Alt slot: " + job_r11.installerProposedSlot : ""));
} }
function Overview_For_129_Conditional_17_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 119)(1, "mat-icon", 121);
    i0.ɵɵtext(2, "hourglass_empty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pending");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_17_Conditional_10_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 117)(1, "mat-icon", 121);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Accepted");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_17_Conditional_10_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 118)(1, "mat-icon", 121);
    i0.ɵɵtext(2, "cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Rejected");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵproperty("title", (job_r11.driverRejectReason || "Rejected") + (job_r11.driverProposedSlot ? " | Alt slot: " + job_r11.driverProposedSlot : ""));
} }
function Overview_For_129_Conditional_17_Conditional_10_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 119)(1, "mat-icon", 121);
    i0.ɵɵtext(2, "hourglass_empty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pending");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_17_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 114)(1, "span", 122)(2, "mat-icon", 81);
    i0.ɵɵtext(3, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(6, Overview_For_129_Conditional_17_Conditional_10_Conditional_6_Template, 5, 0, "span", 117)(7, Overview_For_129_Conditional_17_Conditional_10_Conditional_7_Template, 5, 1, "span", 118)(8, Overview_For_129_Conditional_17_Conditional_10_Conditional_8_Template, 5, 0, "span", 119);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", job_r11.logisticsTruck.truckPlate, " (", job_r11.dispatcherName, ")");
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r11.driverAssignmentStatus === "accepted" ? 6 : job_r11.driverAssignmentStatus === "rejected" ? 7 : 8);
} }
function Overview_For_129_Conditional_17_Conditional_11_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 123);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Alt slot: ", job_r11.driverProposedSlot || job_r11.installerProposedSlot);
} }
function Overview_For_129_Conditional_17_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 120);
    i0.ɵɵtext(1);
    i0.ɵɵconditionalCreate(2, Overview_For_129_Conditional_17_Conditional_11_Conditional_2_Template, 2, 1, "span", 123);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Reason: ", job_r11.driverRejectReason || job_r11.installerRejectReason, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r11.driverProposedSlot || job_r11.installerProposedSlot ? 2 : -1);
} }
function Overview_For_129_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103)(1, "div", 114)(2, "span", 115)(3, "mat-icon", 116);
    i0.ɵɵtext(4, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(7, Overview_For_129_Conditional_17_Conditional_7_Template, 5, 0, "span", 117)(8, Overview_For_129_Conditional_17_Conditional_8_Template, 5, 1, "span", 118)(9, Overview_For_129_Conditional_17_Conditional_9_Template, 5, 0, "span", 119);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, Overview_For_129_Conditional_17_Conditional_10_Template, 9, 3, "div", 114);
    i0.ɵɵconditionalCreate(11, Overview_For_129_Conditional_17_Conditional_11_Template, 3, 2, "div", 120);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(job_r11.assignedInstallerName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r11.installerAssignmentStatus === "accepted" ? 7 : job_r11.installerAssignmentStatus === "rejected" ? 8 : 9);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(job_r11.logisticsTruck ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r11.driverRejectReason || job_r11.installerRejectReason ? 11 : -1);
} }
function Overview_For_129_Conditional_18_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 90);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tech_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", tech_r13.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", tech_r13.name, " (\u2605", tech_r13.metrics.avgRating, ") ");
} }
function Overview_For_129_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 104)(1, "span", 124);
    i0.ɵɵelement(2, "span", 87);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Installer: Pending");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 125)(6, "select", 126);
    i0.ɵɵlistener("change", function Overview_For_129_Conditional_18_Template_select_change_6_listener($event) { i0.ɵɵrestoreView(_r12); const job_r11 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onQuickAssignInstaller(job_r11.id, $event)); });
    i0.ɵɵelementStart(7, "option", 89);
    i0.ɵɵtext(8, "-- Assign Installer --");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(9, Overview_For_129_Conditional_18_For_10_Template, 2, 3, "option", 90, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.store.installers());
} }
function Overview_For_129_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 127);
    i0.ɵɵlistener("click", function Overview_For_129_Conditional_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const job_r11 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openSetupTruckModal(job_r11)); });
    i0.ɵɵelementStart(1, "mat-icon", 81);
    i0.ɵɵtext(2, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Assign Installer");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111)(1, "span", 128);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 129);
    i0.ɵɵtext(4, " Awaiting Store Dispatch ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", job_r11.assignedInstallerName || "Installer Assigned", " ");
} }
function Overview_For_129_Conditional_29_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 133);
    i0.ɵɵlistener("click", function Overview_For_129_Conditional_29_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const job_r11 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.store.approveInstallationByOperations(job_r11.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 81);
    i0.ɵɵtext(2, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Approve Request");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_29_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 134);
    i0.ɵɵlistener("click", function Overview_For_129_Conditional_29_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const job_r11 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openSetupTruckModal(job_r11)); });
    i0.ɵɵelementStart(1, "mat-icon", 81);
    i0.ɵɵtext(2, "sync");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Re-assign Installer");
    i0.ɵɵelementEnd()();
} }
function Overview_For_129_Conditional_29_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 132);
    i0.ɵɵtext(1, " Awaiting responses ");
    i0.ɵɵelementEnd();
} }
function Overview_For_129_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Overview_For_129_Conditional_29_Conditional_0_Template, 5, 0, "button", 130)(1, Overview_For_129_Conditional_29_Conditional_1_Template, 5, 0, "button", 131)(2, Overview_For_129_Conditional_29_Conditional_2_Template, 2, 0, "span", 132);
} if (rf & 2) {
    const job_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(job_r11.driverAssignmentStatus === "accepted" && job_r11.installerAssignmentStatus === "accepted" ? 0 : job_r11.driverAssignmentStatus === "rejected" || job_r11.installerAssignmentStatus === "rejected" ? 1 : 2);
} }
function Overview_For_129_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 112)(1, "span", 135);
    i0.ɵɵtext(2, " Approved ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 136);
    i0.ɵɵlistener("click", function Overview_For_129_Conditional_30_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r17); const job_r11 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.store.startLiveMotion(job_r11.id)); });
    i0.ɵɵelementStart(4, "mat-icon", 81);
    i0.ɵɵtext(5, "play_arrow");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Start Live Convoy");
    i0.ɵɵelementEnd()()();
} }
function Overview_For_129_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 53)(1, "td", 97);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 50)(4, "p", 75);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 98);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 50)(9, "p", 99);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 100)(12, "mat-icon", 101);
    i0.ɵɵtext(13, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 102);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "td", 50);
    i0.ɵɵconditionalCreate(17, Overview_For_129_Conditional_17_Template, 12, 4, "div", 103)(18, Overview_For_129_Conditional_18_Template, 11, 0, "div", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 105)(20, "span", 106);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td", 107);
    i0.ɵɵtext(23);
    i0.ɵɵelementStart(24, "span", 108);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "td", 109);
    i0.ɵɵconditionalCreate(27, Overview_For_129_Conditional_27_Template, 5, 0, "button", 110)(28, Overview_For_129_Conditional_28_Template, 5, 1, "div", 111)(29, Overview_For_129_Conditional_29_Template, 3, 1)(30, Overview_For_129_Conditional_30_Template, 8, 0, "div", 112);
    i0.ɵɵelementStart(31, "button", 113);
    i0.ɵɵlistener("click", function Overview_For_129_Template_button_click_31_listener() { const job_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.jobSelected.emit(job_r11.id)); });
    i0.ɵɵtext(32, " Inspect Job \u2192 ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const job_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", job_r11.id, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r11.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", job_r11.dimensions, " \u00B7 ", job_r11.finish);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r11.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r11.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r11.assignedInstallerName ? 17 : 18);
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ctx_r1.getStatusClass(job_r11.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatStatus(job_r11.status), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", job_r11.financials.bonusAmount, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r11.financials.bonusStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r11.status === "booked_at_shop" ? 27 : job_r11.status === "assigned" ? 28 : job_r11.status === "truck_assigned" ? 29 : job_r11.status === "approved" ? 30 : -1);
} }
function Overview_Conditional_130_For_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 90);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tech_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", tech_r19.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4(" ", tech_r19.name, " (\u2605", tech_r19.metrics.avgRating, ") \u00B7 ", tech_r19.isSignedIn ? "Signed In" : "Offline", " \u00B7 ", tech_r19.availabilityStatus || "available", " ");
} }
function Overview_Conditional_130_For_62_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 170);
} }
function Overview_Conditional_130_For_62_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 171);
} }
function Overview_Conditional_130_For_62_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 172);
    i0.ɵɵtext(1, "Signed In");
    i0.ɵɵelementEnd();
} }
function Overview_Conditional_130_For_62_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 173);
    i0.ɵɵtext(1, "Offline");
    i0.ɵɵelementEnd();
} }
function Overview_Conditional_130_For_62_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 166);
    i0.ɵɵlistener("click", function Overview_Conditional_130_For_62_Template_div_click_0_listener() { const tech_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.truckSetupForm.patchValue({ installerId: tech_r21.id })); })("keydown.enter", function Overview_Conditional_130_For_62_Template_div_keydown_enter_0_listener() { const tech_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.truckSetupForm.patchValue({ installerId: tech_r21.id })); });
    i0.ɵɵelementStart(1, "div", 167)(2, "div", 168)(3, "div", 169);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, Overview_Conditional_130_For_62_Conditional_5_Template, 1, 0, "span", 170)(6, Overview_Conditional_130_For_62_Conditional_6_Template, 1, 0, "span", 171);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div")(8, "div", 43)(9, "span", 75);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, Overview_Conditional_130_For_62_Conditional_11_Template, 2, 0, "span", 172)(12, Overview_Conditional_130_For_62_Conditional_12_Template, 2, 0, "span", 173);
    i0.ɵɵelementStart(13, "span", 174);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "p", 71);
    i0.ɵɵtext(16, " Lock Specialties: ");
    i0.ɵɵelementStart(17, "strong", 175);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "p", 79);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 43)(22, "button", 176);
    i0.ɵɵlistener("click", function Overview_Conditional_130_For_62_Template_button_click_22_listener($event) { const tech_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.store.toggleTechnicianSignIn(tech_r21.id)); });
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 177);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_12_0;
    let tmp_23_0;
    const tech_r21 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(((tmp_12_0 = ctx_r1.truckSetupForm.get("installerId")) == null ? null : tmp_12_0.value) === tech_r21.id ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-600" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", tech_r21.name.charAt(0), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(tech_r21.isSignedIn ? 5 : 6);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(tech_r21.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(tech_r21.isSignedIn ? 11 : 12);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u2605 ", tech_r21.metrics.avgRating);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(tech_r21.lockSpecialties ? tech_r21.lockSpecialties.join(", ") : "Smart Locks, Mortise");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Status: ", tech_r21.availabilityStatus || "available", " \u00B7 Location: ", tech_r21.currentLocationName || "Central Accra", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(tech_r21.isSignedIn ? "border-red-300 text-red-600 hover:bg-red-50" : "border-emerald-300 text-emerald-600 hover:bg-emerald-50");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", tech_r21.isSignedIn ? "Sign Out" : "Sign In", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", "installerChoice")("checked", ((tmp_23_0 = ctx_r1.truckSetupForm.get("installerId")) == null ? null : tmp_23_0.value) === tech_r21.id);
} }
function Overview_Conditional_130_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 54)(1, "div", 137)(2, "div", 138)(3, "div", 139)(4, "div", 140)(5, "mat-icon", 141);
    i0.ɵɵtext(6, "handyman");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h3", 34);
    i0.ɵɵtext(9, "Assign Field Installer to Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 35);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "button", 142);
    i0.ɵɵlistener("click", function Overview_Conditional_130_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSetupModal()); });
    i0.ɵɵelementStart(13, "mat-icon", 143);
    i0.ɵɵtext(14, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "form", 144);
    i0.ɵɵlistener("ngSubmit", function Overview_Conditional_130_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmInstallerAssignment()); });
    i0.ɵɵelementStart(16, "div", 145)(17, "span", 146)(18, "mat-icon", 147);
    i0.ɵɵtext(19, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Client & Site Location Details (Recorded by Shop)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 148)(23, "div")(24, "p", 149);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 150)(27, "mat-icon", 77);
    i0.ɵɵtext(28, "location_on");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "p", 151);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div")(34, "span", 74);
    i0.ɵɵtext(35, "Lock Hardware:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "p", 152)(37, "mat-icon", 81);
    i0.ɵɵtext(38, "lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "p", 153);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "div", 154)(44, "div", 155)(45, "span", 156)(46, "mat-icon", 81);
    i0.ɵɵtext(47, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49, "Select Available Field Technician");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "span", 157);
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div")(53, "label", 158);
    i0.ɵɵtext(54, " Or select installer from dropdown list: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "select", 159)(56, "option", 89);
    i0.ɵɵtext(57, "-- Choose installer from dropdown list --");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(58, Overview_Conditional_130_For_59_Template, 2, 5, "option", 90, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 160);
    i0.ɵɵrepeaterCreate(61, Overview_Conditional_130_For_62_Template, 25, 15, "div", 161, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "div", 162)(64, "span", 157);
    i0.ɵɵtext(65, " Shop Manager will receive SMS & notification to assign store dispatch driver ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "div", 163)(67, "button", 164);
    i0.ɵɵlistener("click", function Overview_Conditional_130_Template_button_click_67_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSetupModal()); });
    i0.ɵɵtext(68, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "button", 165);
    i0.ɵɵlistener("click", function Overview_Conditional_130_Template_button_click_69_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmInstallerAssignment()); });
    i0.ɵɵelementStart(70, "mat-icon", 141);
    i0.ɵɵtext(71, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "span");
    i0.ɵɵtext(73, "Assign Installer & Notify Shop");
    i0.ɵɵelementEnd()()()()()()();
} if (rf & 2) {
    let tmp_12_0;
    const ctx_r1 = i0.ɵɵnextContext();
    const job_r22 = ctx_r1.activeSetupJob();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate2("Order ", job_r22.id, " \u00B7 ", job_r22.doorModel);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r1.truckSetupForm);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(job_r22.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r22.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Tel: ", job_r22.client.phone);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(job_r22.lockModel || "Smart Lock Handle");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \"", job_r22.client.accessInstructions || "Site access confirmed", "\" ");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.signedInInstallers().length, " technicians signed in ");
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.store.installers());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.store.installers());
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", !((tmp_12_0 = ctx_r1.truckSetupForm.get("installerId")) == null ? null : tmp_12_0.value));
} }
export class Overview {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    jobSelected = output();
    newJobOpened = output();
    bonusModalOpened = output();
    manageUsersOpened = output();
    viewMode = signal('table', ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
    selectedFilter = signal(null, ...(ngDevMode ? [{ debugName: "selectedFilter" }] : /* istanbul ignore next */ []));
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    activeSetupJob = signal(null, ...(ngDevMode ? [{ debugName: "activeSetupJob" }] : /* istanbul ignore next */ []));
    truckSetupForm = new FormGroup({
        truckId: new FormControl('TRK-01', { nonNullable: true, validators: [Validators.required] }),
        truckPlate: new FormControl('GT-4821-26', { nonNullable: true }),
        truckModel: new FormControl('Mercedes-Benz Atego Heavy Delivery Flatbed', { nonNullable: true }),
        dispatcherId: new FormControl('disp_01', { nonNullable: true, validators: [Validators.required] }),
        dispatcherName: new FormControl('Emmanuel Kojo (Lead Dispatcher)', { nonNullable: true }),
        dispatcherPhone: new FormControl('+233 24 555 0192', { nonNullable: true }),
        deliveryNotes: new FormControl('Padded blanket wrap on door slab and high-security lockset', { nonNullable: true }),
        installerId: new FormControl('inst_01', { nonNullable: true, validators: [Validators.required] })
    });
    pipelineStages = [
        { key: 'booked_at_shop', label: 'Shop Booked' },
        { key: 'truck_assigned', label: 'Truck Set Up' },
        { key: 'site_funds_dispatched', label: 'Funds Dispatched' },
        { key: 'dispatched', label: 'En Route' },
        { key: 'delivered_on_site', label: 'Cargo Delivered' },
        { key: 'completed', label: 'Verified Complete' }
    ];
    filteredJobs = computed(() => {
        const filter = this.selectedFilter();
        const query = this.searchQuery().toLowerCase().trim();
        let list = this.store.jobs();
        if (filter) {
            list = list.filter(j => j.status === filter);
        }
        if (query) {
            list = list.filter(j => j.id.toLowerCase().includes(query) ||
                j.doorModel.toLowerCase().includes(query) ||
                j.client.name.toLowerCase().includes(query) ||
                j.client.siteAddress.toLowerCase().includes(query) ||
                (j.assignedInstallerName && j.assignedInstallerName.toLowerCase().includes(query)));
        }
        return list;
    }, ...(ngDevMode ? [{ debugName: "filteredJobs" }] : /* istanbul ignore next */ []));
    countJobsByStage(stage) {
        return this.store.jobs().filter(j => j.status === stage).length;
    }
    setFilter(stage) {
        if (this.selectedFilter() === stage) {
            this.selectedFilter.set(null);
        }
        else {
            this.selectedFilter.set(stage);
        }
    }
    onSearchInput(event) {
        const val = event.target.value;
        this.searchQuery.set(val);
    }
    clearFilters() {
        this.selectedFilter.set(null);
        this.searchQuery.set('');
    }
    openSetupTruckModal(job) {
        this.activeSetupJob.set(job);
        const available = this.store.availableInstallers();
        const defaultTech = available.length > 0 ? available[0].id : 'inst_01';
        this.truckSetupForm.patchValue({
            installerId: defaultTech
        });
    }
    closeSetupModal() {
        this.activeSetupJob.set(null);
    }
    onTruckSelected(event) {
        const truckId = event.target.value;
        const truck = this.store.trucks().find(t => t.id === truckId);
        if (truck) {
            const matchedDisp = this.store.dispatchers().find(d => d.assignedTruck.plate === truck.plate) || this.store.dispatchers()[0];
            this.truckSetupForm.patchValue({
                truckPlate: truck.plate,
                truckModel: truck.model,
                dispatcherId: matchedDisp.id,
                dispatcherName: matchedDisp.name,
                dispatcherPhone: matchedDisp.phone
            });
        }
    }
    onDispatcherSelected(event) {
        const dispId = event.target.value;
        const disp = this.store.dispatchers().find(d => d.id === dispId);
        if (disp) {
            this.truckSetupForm.patchValue({
                dispatcherId: disp.id,
                dispatcherName: disp.name,
                dispatcherPhone: disp.phone,
                truckPlate: disp.assignedTruck.plate,
                truckModel: disp.assignedTruck.model
            });
        }
    }
    onQuickAssignInstaller(jobId, event) {
        const installerId = event.target.value;
        if (!installerId)
            return;
        const tech = this.store.installers().find(t => t.id === installerId);
        this.store.assignInstallerByManager(jobId, installerId);
        this.alert.success('Installer Assigned', `Technician ${tech?.name || 'Installer'} has been assigned to job ${jobId}.`);
        event.target.value = '';
    }
    confirmInstallerAssignment() {
        const job = this.activeSetupJob();
        if (!job)
            return;
        const val = this.truckSetupForm.getRawValue();
        const tech = this.store.installers().find(t => t.id === val.installerId);
        this.store.assignInstallerByManager(job.id, val.installerId, val.deliveryNotes);
        this.alert.success('Installer Assigned', `Technician ${tech?.name || 'Installer'} has been assigned to job ${job.id}.`);
        this.closeSetupModal();
    }
    confirmTruckAndTechSetup() {
        const job = this.activeSetupJob();
        if (!job || !this.truckSetupForm.valid)
            return;
        const val = this.truckSetupForm.getRawValue();
        this.store.setupTruckAndAssignTechnician(job.id, {
            truckId: val.truckId,
            truckPlate: val.truckPlate,
            truckModel: val.truckModel,
            dispatcherId: val.dispatcherId,
            dispatcherName: val.dispatcherName,
            dispatcherPhone: val.dispatcherPhone,
            deliveryNotes: val.deliveryNotes
        }, val.installerId);
        this.closeSetupModal();
    }
    getStatusClass(status) {
        switch (status) {
            case 'draft': return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
            case 'booked_at_shop': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60';
            case 'truck_assigned':
            case 'site_funds_dispatched': return 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60';
            case 'assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60';
            case 'accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60';
            case 'dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60';
            case 'delivered_on_site':
            case 'on_site': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 animate-pulse';
            case 'installed_pending_signoff': return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60';
            case 'completed': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-bold';
            case 'bonus_awarded': return 'bg-emerald-700 text-white font-bold';
            default: return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
        }
    }
    formatStatus(status) {
        return status.replace(/_/g, ' ');
    }
    static ɵfac = function Overview_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Overview)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Overview, selectors: [["app-overview"]], outputs: { jobSelected: "jobSelected", newJobOpened: "newJobOpened", bonusModalOpened: "bonusModalOpened", manageUsersOpened: "manageUsersOpened" }, decls: 131, vars: 19, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-2", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], [1, "text-emerald-700", "dark:text-emerald-400", "font-bold", "flex", "items-center", "gap-1"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "text-xl", "sm:text-2xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "flex", "flex-wrap", "items-center", "gap-2.5"], [1, "flex", "items-center", "bg-slate-100", "dark:bg-slate-800", "p-1", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-1", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], [1, "!text-sm", "!w-4", "!h-4", "text-emerald-400"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "rounded-xl", "transition-all", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95"], ["type", "button", 1, "px-3", "py-2", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:text-slate-900", "dark:hover:text-white", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "hover:border-slate-300", "dark:hover:border-slate-600", "rounded-xl", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-xs", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-emerald-600", "dark:text-emerald-400"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-[11px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-black", "font-mono", "text-amber-600", "dark:text-amber-400", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-amber-700", "dark:text-amber-400", "font-bold"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2"], [1, "text-3xl", "font-black", "font-mono", "text-emerald-600", "dark:text-emerald-400", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-slate-500", "font-mono"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2", "flex", "items-center", "gap-1"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "text-3xl", "font-black", "font-mono", "text-slate-900", "dark:text-white", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-bold"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "bg-amber-500/10", "dark:bg-amber-950/40", "border", "border-amber-300", "dark:border-amber-800/80", "rounded-2xl", "p-4", "sm:p-5", "shadow-xs", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4"], [1, "bg-amber-950/20", "dark:bg-amber-950/40", "border", "border-amber-300", "dark:border-amber-800/80", "rounded-2xl", "p-5", "shadow-sm", "space-y-3"], [3, "mode"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "shadow-xs"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "mb-4"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "relative", "w-full", "sm:w-64"], [1, "!text-sm", "text-slate-400", "absolute", "left-3", "top-2.5"], ["type", "text", "placeholder", "Search ID, Client, Address...", 1, "w-full", "pl-9", "pr-3", "py-1.5", "text-xs", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-slate-900", "dark:text-white", "placeholder-slate-400", "focus:outline-none", "focus:ring-1", "focus:ring-slate-900", 3, "input", "value"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-6", "gap-2", "text-center", "text-xs"], ["type", "button", 1, "p-3", "rounded-xl", "border", "transition-all", "cursor-pointer", "text-center", "block", "w-full", "active:scale-95", 3, "class"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-xs"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-slate-400", "dark:text-slate-500"], ["type", "button", 1, "text-xs", "text-slate-500", "hover:text-slate-900", "dark:text-slate-400", "dark:hover:text-white", "underline", "font-medium"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "border-collapse", "text-xs"], [1, "border-b", "border-slate-200", "dark:border-slate-800", "bg-slate-50/80", "dark:bg-slate-800/60", "text-[11px]", "font-bold", "text-slate-600", "dark:text-slate-400", "uppercase", "tracking-wider"], [1, "py-3.5", "px-4"], [1, "py-3.5", "px-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800"], [1, "hover:bg-slate-50/80", "dark:hover:bg-slate-800/40", "transition-colors", "group"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/70", "backdrop-blur-xs", "overflow-y-auto"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "rounded-xl", "transition-all", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", 3, "click"], [1, "flex", "items-start", "sm:items-center", "gap-3"], [1, "w-10", "h-10", "rounded-xl", "bg-amber-500", "text-white", "flex", "items-center", "justify-center", "shrink-0", "shadow-xs"], [1, "!text-xl"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-amber-500", "text-white", "animate-pulse"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "mt-0.5"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "rounded-xl", "transition-all", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", "shrink-0", "self-start", "sm:self-auto", "cursor-pointer", 3, "click"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-2"], [1, "w-3", "h-3", "rounded-full", "bg-amber-500", "animate-ping"], [1, "text-sm", "font-extrabold", "text-amber-900", "dark:text-amber-200", "uppercase", "tracking-wider"], [1, "text-xs", "text-amber-800", "dark:text-amber-300", "font-mono"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-amber-200", "dark:border-amber-800", "shadow-xs", "space-y-3"], [1, "flex", "items-start", "justify-between", "gap-2", "border-b", "border-slate-100", "dark:border-slate-800", "pb-2"], [1, "font-mono", "text-[11px]", "font-extrabold", "text-amber-700", "dark:text-amber-400"], [1, "font-bold", "text-slate-900", "dark:text-white", "text-sm"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400"], [1, "text-[10px]", "uppercase", "font-bold", "bg-amber-100", "dark:bg-amber-950/70", "text-amber-800", "dark:text-amber-300", "px-2", "py-0.5", "rounded", "border", "border-amber-200", "dark:border-amber-800"], [1, "grid", "grid-cols-2", "gap-2", "text-xs"], [1, "text-[10px]", "text-slate-400", "uppercase", "font-bold", "block"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-slate-600", "dark:text-slate-400", "flex", "items-center", "gap-0.5", "mt-0.5"], [1, "!text-xs", "text-red-500"], [1, "truncate"], [1, "text-[10px]", "text-slate-400", "font-mono"], [1, "font-bold", "text-amber-600", "dark:text-amber-400", "flex", "items-center", "gap-1"], [1, "!text-xs"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "block", "mt-1"], [1, "pt-2", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "gap-2", "flex-wrap"], [1, "flex", "items-center", "gap-1.5"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "inline-flex", "items-center", "gap-1", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-amber-100", "text-amber-800", "dark:bg-amber-950", "dark:text-amber-300", "border", "border-amber-300"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-amber-500", "animate-pulse"], [1, "text-xs", "px-2.5", "py-1.5", "bg-white", "dark:bg-slate-800", "border", "border-amber-300", "dark:border-amber-700", "rounded-xl", "text-slate-800", "dark:text-slate-200", "focus:outline-none", "focus:ring-1", "focus:ring-amber-500", "font-medium", "cursor-pointer", "max-w-[175px]", 3, "change"], ["value", ""], [3, "value"], ["type", "button", 1, "px-3", "py-1.5", "bg-amber-600", "hover:bg-amber-700", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1", "active:scale-95", "cursor-pointer", "whitespace-nowrap", 3, "click"], [1, "text-cyan-700", "dark:text-cyan-400", "font-mono"], ["type", "button", 1, "p-3", "rounded-xl", "border", "transition-all", "cursor-pointer", "text-center", "block", "w-full", "active:scale-95", 3, "click"], [1, "block", "text-[10px]", "uppercase", "font-mono", "tracking-wider", "opacity-70", "mb-1"], [1, "text-lg", "font-black", "font-mono", "tabular-nums", "block"], ["type", "button", 1, "text-xs", "text-slate-500", "hover:text-slate-900", "dark:text-slate-400", "dark:hover:text-white", "underline", "font-medium", 3, "click"], [1, "py-3.5", "px-4", "font-mono", "font-bold", "text-slate-900", "dark:text-white", "whitespace-nowrap"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "truncate", "max-w-xs"], [1, "font-semibold", "text-slate-800", "dark:text-slate-200"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-emerald-600", "dark:text-emerald-400"], [1, "truncate", "max-w-xs"], [1, "space-y-1"], [1, "space-y-1.5"], [1, "py-3.5", "px-4", "whitespace-nowrap"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-md", "text-[11px]", "font-bold", "uppercase", "tracking-wider"], [1, "py-3.5", "px-4", "text-right", "font-mono", "font-bold", "whitespace-nowrap", "tabular-nums", "text-slate-700", "dark:text-slate-300"], [1, "block", "text-[10px]", "font-normal", "text-slate-400", "capitalize"], [1, "py-3.5", "px-4", "text-right", "whitespace-nowrap", "space-y-1"], ["type", "button", 1, "px-3", "py-1.5", "text-xs", "font-bold", "text-white", "bg-amber-600", "hover:bg-amber-700", "rounded-lg", "transition-colors", "shadow-2xs", "flex", "items-center", "gap-1", "ml-auto", "cursor-pointer"], [1, "text-right"], [1, "flex", "items-center", "justify-end", "gap-1.5"], ["type", "button", 1, "px-2.5", "py-1", "text-[11px]", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:text-slate-900", "dark:hover:text-white", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-800", "hover:bg-slate-50", "transition-colors", "shadow-2xs", "ml-auto", "block", 3, "click"], [1, "flex", "items-center", "gap-1.5", "flex-wrap"], [1, "font-medium", "text-slate-800", "dark:text-slate-200", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-emerald-600"], [1, "inline-flex", "items-center", "gap-0.5", "px-1.5", "py-0.2", "rounded", "text-[10px]", "font-bold", "bg-emerald-100", "text-emerald-800", "dark:bg-emerald-950", "dark:text-emerald-300", "border", "border-emerald-300"], [1, "inline-flex", "items-center", "gap-0.5", "px-1.5", "py-0.2", "rounded", "text-[10px]", "font-bold", "bg-red-100", "text-red-800", "dark:bg-red-950", "dark:text-red-300", "border", "border-red-300", 3, "title"], [1, "inline-flex", "items-center", "gap-0.5", "px-1.5", "py-0.2", "rounded", "text-[10px]", "font-bold", "bg-amber-100", "text-amber-800", "dark:bg-amber-950", "dark:text-amber-300", "border", "border-amber-300"], [1, "text-[10px]", "text-red-600", "dark:text-red-400", "italic", "bg-red-50", "dark:bg-red-950/40", "p-1", "rounded", "border", "border-red-200", "dark:border-red-900"], [1, "!text-[10px]", "!w-3", "!h-3"], [1, "text-[11px]", "text-teal-800", "dark:text-teal-300", "font-mono", "flex", "items-center", "gap-1"], [1, "block", "font-bold"], [1, "inline-flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-amber-100", "text-amber-800", "dark:bg-amber-950/80", "dark:text-amber-300", "border", "border-amber-300", "dark:border-amber-700", "shadow-2xs"], [1, "flex", "items-center", "gap-1"], [1, "text-[11px]", "px-2", "py-1", "bg-white", "dark:bg-slate-800", "border", "border-amber-300", "dark:border-amber-700", "rounded-lg", "text-slate-800", "dark:text-slate-200", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "cursor-pointer", "max-w-[160px]", 3, "change"], ["type", "button", 1, "px-3", "py-1.5", "text-xs", "font-bold", "text-white", "bg-amber-600", "hover:bg-amber-700", "rounded-lg", "transition-colors", "shadow-2xs", "flex", "items-center", "gap-1", "ml-auto", "cursor-pointer", 3, "click"], [1, "text-[11px]", "font-bold", "text-amber-700", "dark:text-amber-400", "block"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "block", "font-mono"], ["type", "button", 1, "px-2.5", "py-1", "text-xs", "font-bold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "flex", "items-center", "gap-1", "shadow-xs", "ml-auto"], ["type", "button", 1, "px-2.5", "py-1", "text-xs", "font-bold", "text-white", "bg-red-600", "hover:bg-red-700", "rounded-lg", "flex", "items-center", "gap-1", "shadow-xs", "ml-auto"], [1, "text-[10px]", "text-amber-600", "dark:text-amber-400", "font-medium", "block"], ["type", "button", 1, "px-2.5", "py-1", "text-xs", "font-bold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "flex", "items-center", "gap-1", "shadow-xs", "ml-auto", 3, "click"], ["type", "button", 1, "px-2.5", "py-1", "text-xs", "font-bold", "text-white", "bg-red-600", "hover:bg-red-700", "rounded-lg", "flex", "items-center", "gap-1", "shadow-xs", "ml-auto", 3, "click"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-emerald-100", "text-emerald-800", "dark:bg-emerald-950", "dark:text-emerald-300"], ["type", "button", 1, "px-2.5", "py-1", "text-xs", "font-bold", "text-white", "bg-cyan-600", "hover:bg-cyan-700", "rounded-lg", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-2xl", "w-full", "max-h-[92vh]", "flex", "flex-col", "overflow-hidden", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "px-6", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/50", "dark:bg-slate-800/40"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-xl", "bg-amber-600", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", "cursor-pointer", 3, "click"], [1, "!text-base"], [1, "overflow-y-auto", "p-6", "space-y-5", "text-xs", 3, "ngSubmit", "formGroup"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "space-y-2"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400", "tracking-wider", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-indigo-600"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3", "pt-1"], [1, "text-slate-900", "dark:text-white", "font-extrabold", "text-sm"], [1, "text-slate-600", "dark:text-slate-300", "font-mono", "text-xs", "flex", "items-center", "gap-1", "mt-0.5"], [1, "text-[11px]", "text-slate-500", "font-mono", "mt-0.5"], [1, "font-extrabold", "text-amber-600", "dark:text-amber-400", "flex", "items-center", "gap-1"], [1, "text-[11px]", "text-slate-500", "mt-1", "italic"], [1, "space-y-3", "pt-1"], [1, "flex", "items-center", "justify-between"], [1, "text-[11px]", "uppercase", "font-bold", "text-emerald-700", "dark:text-emerald-400", "tracking-wider", "flex", "items-center", "gap-1"], [1, "text-[11px]", "text-slate-500", "font-mono"], ["for", "modalInstallerDropdownSelect", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "text-xs", "mb-1"], ["id", "modalInstallerDropdownSelect", "formControlName", "installerId", 1, "w-full", "text-xs", "px-3", "py-2", "border", "border-slate-300", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium", "focus:ring-1", "focus:ring-emerald-500", "cursor-pointer"], [1, "space-y-2", "max-h-48", "overflow-y-auto", "pr-1"], ["role", "button", "tabindex", "0", 1, "p-3", "rounded-xl", "border", "cursor-pointer", "transition-all", "flex", "items-center", "justify-between", "gap-3", 3, "class"], [1, "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-3", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto", "justify-end"], ["type", "button", 1, "px-4", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "font-bold", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", 3, "click"], ["type", "button", 1, "px-5", "py-2", "bg-emerald-600", "hover:bg-emerald-700", "disabled:opacity-50", "text-white", "rounded-xl", "font-bold", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", "cursor-pointer", 3, "click", "disabled"], ["role", "button", "tabindex", "0", 1, "p-3", "rounded-xl", "border", "cursor-pointer", "transition-all", "flex", "items-center", "justify-between", "gap-3", 3, "click", "keydown.enter"], [1, "flex", "items-center", "gap-3"], [1, "relative"], [1, "w-9", "h-9", "rounded-full", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center", "font-bold", "text-xs"], ["title", "Signed In", 1, "w-2.5", "h-2.5", "rounded-full", "bg-emerald-500", "absolute", "-bottom-0.5", "-right-0.5", "ring-2", "ring-white", "dark:ring-slate-900"], ["title", "Offline", 1, "w-2.5", "h-2.5", "rounded-full", "bg-slate-400", "absolute", "-bottom-0.5", "-right-0.5", "ring-2", "ring-white", "dark:ring-slate-900"], [1, "text-[10px]", "font-bold", "text-emerald-700", "dark:text-emerald-400", "bg-emerald-100", "dark:bg-emerald-950", "px-1.5", "py-0.2", "rounded"], [1, "text-[10px]", "text-slate-400", "font-medium"], [1, "text-[10px]", "text-amber-500", "font-bold"], [1, "text-slate-700", "dark:text-slate-300"], ["type", "button", "title", "Toggle technician sign-in status", 1, "px-2", "py-1", "rounded", "text-[10px]", "font-bold", "border", "transition-colors", 3, "click"], ["type", "radio", 1, "text-emerald-600", 3, "name", "checked"]], template: function Overview_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "DoorMaster Industrial Network");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Atelier & Field Operations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 4);
            i0.ɵɵelement(13, "span", 5);
            i0.ɵɵelementStart(14, "span");
            i0.ɵɵtext(15, "Live Fleet Dispatch Active");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "h1", 6);
            i0.ɵɵtext(17, "Installation Operations Dashboard");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 7)(19, "div", 8)(20, "button", 9);
            i0.ɵɵlistener("click", function Overview_Template_button_click_20_listener() { return ctx.viewMode.set("table"); });
            i0.ɵɵelementStart(21, "mat-icon", 10);
            i0.ɵɵtext(22, "view_list");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "List Grid");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 9);
            i0.ɵɵlistener("click", function Overview_Template_button_click_25_listener() { return ctx.viewMode.set("map"); });
            i0.ɵɵelementStart(26, "mat-icon", 11);
            i0.ɵɵtext(27, "radar");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Fleet Radar Map");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(30, Overview_Conditional_30_Template, 5, 0, "button", 12);
            i0.ɵɵelementStart(31, "button", 13);
            i0.ɵɵlistener("click", function Overview_Template_button_click_31_listener() { return ctx.bonusModalOpened.emit(); });
            i0.ɵɵelementStart(32, "mat-icon", 14);
            i0.ɵɵtext(33, "military_tech");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span");
            i0.ɵɵtext(35, "Bonus Matrix");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(36, "div", 15)(37, "div", 16)(38, "span", 17);
            i0.ɵɵtext(39, "Awaiting Truck & Tech");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 18)(41, "span", 19);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span", 20);
            i0.ɵɵtext(44, "From Shop");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div", 21);
            i0.ɵɵtext(46, " Requires fleet & installer assignment ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 16)(48, "span", 17);
            i0.ɵɵtext(49, "Signed-In Technicians");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 18)(51, "span", 22);
            i0.ɵɵtext(52);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 23);
            i0.ɵɵtext(54);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "div", 24);
            i0.ɵɵelement(56, "span", 25);
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(59, "div", 16)(60, "span", 17);
            i0.ɵɵtext(61, "Active Site Installations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div", 18)(63, "span", 26);
            i0.ɵɵtext(64);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "span", 27);
            i0.ɵɵtext(66, "On-Site & Dispatched");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div", 24);
            i0.ɵɵelement(68, "span", 25);
            i0.ɵɵelementStart(69, "span");
            i0.ɵɵtext(70, "Real-time GPS monitored");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(71, "div", 16)(72, "span", 17);
            i0.ɵɵtext(73, "Completed & Verified Doors");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "div", 18)(75, "span", 26);
            i0.ɵɵtext(76);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "span", 28);
            i0.ɵɵtext(78);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(79, "div", 21);
            i0.ɵɵtext(80, " 100% Quality pass rate ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(81, Overview_Conditional_81_Template, 18, 1, "div", 29);
            i0.ɵɵconditionalCreate(82, Overview_Conditional_82_Template, 11, 1, "div", 30);
            i0.ɵɵconditionalCreate(83, Overview_Conditional_83_Template, 1, 1, "app-osm-live-map", 31);
            i0.ɵɵelementStart(84, "div", 32)(85, "div", 33)(86, "div")(87, "h3", 34);
            i0.ɵɵtext(88, "Door Installation Pipeline Stages");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "p", 35);
            i0.ɵɵtext(90, "Live operational lifecycle from shop booking & truck setup to verification");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "div", 36)(92, "mat-icon", 37);
            i0.ɵɵtext(93, "search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "input", 38);
            i0.ɵɵlistener("input", function Overview_Template_input_input_94_listener($event) { return ctx.onSearchInput($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(95, "div", 39);
            i0.ɵɵrepeaterCreate(96, Overview_For_97_Template, 5, 4, "button", 40, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(98, "div", 41)(99, "div", 42)(100, "div", 43)(101, "h3", 44);
            i0.ɵɵtext(102, "Scheduled & Active Door Installations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "span", 45);
            i0.ɵɵtext(104, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "span", 28);
            i0.ɵɵtext(106);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "div", 43);
            i0.ɵɵconditionalCreate(108, Overview_Conditional_108_Template, 2, 0, "button", 46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(109, "div", 47)(110, "table", 48)(111, "thead")(112, "tr", 49)(113, "th", 50);
            i0.ɵɵtext(114, "Job ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "th", 50);
            i0.ɵɵtext(116, "Door Model & Specs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "th", 50);
            i0.ɵɵtext(118, "Client & Site Location");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(119, "th", 50);
            i0.ɵɵtext(120, "Truck & Tech Assigned");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(121, "th", 50);
            i0.ɵɵtext(122, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(123, "th", 51);
            i0.ɵɵtext(124, "Eligible Bonus");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "th", 51);
            i0.ɵɵtext(126, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(127, "tbody", 52);
            i0.ɵɵrepeaterCreate(128, Overview_For_129_Template, 33, 13, "tr", 53, _forTrack1);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵconditionalCreate(130, Overview_Conditional_130_Template, 74, 10, "div", 54);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵclassMap(ctx.viewMode() === "table" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(5);
            i0.ɵɵclassMap(ctx.viewMode() === "map" ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.store.currentRoleDefinition().permissions.canCreateJobs ? 30 : -1);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1(" ", ctx.store.shopPendingTruckSetupJobs().length, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.store.signedInInstallers().length, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("/ ", ctx.store.installers().length, " total");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.store.availableInstallers().length, " available for locks");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.store.stats().inProgress, " ");
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1(" ", ctx.store.stats().completed, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("/ ", ctx.store.stats().totalJobs, " total");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.store.pendingUsers().length > 0 ? 81 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.store.shopPendingTruckSetupJobs().length > 0 ? 82 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.viewMode() === "map" ? 83 : -1);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("value", ctx.searchQuery());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.pipelineStages);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.filteredJobs().length, " jobs shown");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedFilter() || ctx.searchQuery() ? 108 : -1);
            i0.ɵɵadvance(20);
            i0.ɵɵrepeater(ctx.filteredJobs());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.activeSetupJob() ? 130 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, OsmLiveMap], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Overview, [{
        type: Component,
        args: [{
                selector: 'app-overview',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule, OsmLiveMap],
                template: `
    <div class="space-y-6">
      
      <!-- Welcome Header & Fleet Quick Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Industrial Network</span>
            <span aria-hidden="true">·</span>
            <span>Atelier & Field Operations</span>
            <span aria-hidden="true">·</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Fleet Dispatch Active</span>
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Installation Operations Dashboard</h1>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <!-- View Toggle: List vs Fleet Radar Map -->
          <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button 
              type="button"
              (click)="viewMode.set('table')"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              [class]="viewMode() === 'table' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            >
              <mat-icon class="!text-sm !w-4 !h-4">view_list</mat-icon>
              <span>List Grid</span>
            </button>
            <button 
              type="button"
              (click)="viewMode.set('map')"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              [class]="viewMode() === 'map' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            >
              <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400">radar</mat-icon>
              <span>Fleet Radar Map</span>
            </button>
          </div>

          @if (store.currentRoleDefinition().permissions.canCreateJobs) {
            <button 
              type="button" 
              (click)="newJobOpened.emit()"
              class="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <mat-icon class="!text-sm !w-4 !h-4">add</mat-icon>
              <span>Book Installation</span>
            </button>
          }
          
          <button 
            type="button"
            (click)="bonusModalOpened.emit()"
            class="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-emerald-600 dark:text-emerald-400">military_tech</mat-icon>
            <span>Bonus Matrix</span>
          </button>
        </div>
      </div>

      <!-- High-Level Metric Tiles (Zero-pill, tabular numbers) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Awaiting Truck & Tech</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-amber-600 dark:text-amber-400 tracking-tight tabular-nums">
              {{ store.shopPendingTruckSetupJobs().length }}
            </span>
            <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">From Shop</span>
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            Requires fleet & installer assignment
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Signed-In Technicians</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 tracking-tight tabular-nums">
              {{ store.signedInInstallers().length }}
            </span>
            <span class="text-xs text-slate-500 font-mono">/ {{ store.installers().length }} total</span>
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{{ store.availableInstallers().length }} available for locks</span>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Active Site Installations</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ store.stats().inProgress }}
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-bold">On-Site & Dispatched</span>
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Real-time GPS monitored</span>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Completed & Verified Doors</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ store.stats().completed }}
            </span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">/ {{ store.stats().totalJobs }} total</span>
          </div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            100% Quality pass rate
          </div>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- PENDING USER REGISTRATIONS AWAITING OPERATIONS MANAGER APPROVAL     -->
      <!-- =================================================================== -->
      @if (store.pendingUsers().length > 0) {
        <div class="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start sm:items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <mat-icon class="!text-xl">how_to_reg</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">
                  User Registrations Awaiting Operational Approval ({{ store.pendingUsers().length }})
                </h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                  Approval Required
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                New user sign-ups are on hold. Review, approve, reject or assign roles in the Governance center.
              </p>
            </div>
          </div>

          <button
            type="button"
            (click)="manageUsersOpened.emit()"
            class="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">manage_accounts</mat-icon>
            <span>Review & Authorize Users</span>
          </button>
        </div>
      }

      <!-- =================================================================== -->
      <!-- SHOP INSTALLATION REQUESTS AWAITING TRUCK & TECH SETUP QUEUE       -->
      <!-- =================================================================== -->
      <!-- ACTION CARD: SHOP INSTALLATION BOOKINGS AWAITING INSTALLER ASSIGNMENT -->
      <!-- =================================================================== -->
      @if (store.shopPendingTruckSetupJobs().length > 0) {
        <div class="bg-amber-950/20 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <h3 class="text-sm font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                Action Required: Shop Bookings Awaiting Installer ({{ store.shopPendingTruckSetupJobs().length }})
              </h3>
            </div>
            <span class="text-xs text-amber-800 dark:text-amber-300 font-mono">
              Assign an available installer · Shop Manager will be notified to assign store dispatch driver
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @for (pending of store.shopPendingTruckSetupJobs(); track pending.id) {
              <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-3">
                <div class="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <span class="font-mono text-[11px] font-extrabold text-amber-700 dark:text-amber-400">{{ pending.id }}</span>
                    <h4 class="font-bold text-slate-900 dark:text-white text-sm">{{ pending.doorModel }}</h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ pending.dimensions }} · {{ pending.finish }}</p>
                  </div>
                  <span class="text-[10px] uppercase font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    Booked at Shop
                  </span>
                </div>

                <!-- Client Location & Lock Item Details -->
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Client / Site Owner:</span>
                    <p class="font-bold text-slate-900 dark:text-white">{{ pending.client.name }}</p>
                    <p class="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-0.5 mt-0.5">
                      <mat-icon class="!text-xs text-red-500">place</mat-icon>
                      <span class="truncate">{{ pending.client.siteAddress }}</span>
                    </p>
                    <p class="text-[10px] text-slate-400 font-mono">{{ pending.client.phone }}</p>
                  </div>

                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Lock Hardware:</span>
                    <p class="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">lock</mat-icon>
                      <span class="truncate">{{ pending.lockModel || 'Smart Lock' }}</span>
                    </p>
                    @if (pending.shopBooking) {
                      <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                        Paid at Shop: <strong class="text-cyan-700 dark:text-cyan-400 font-mono">₵{{ pending.shopBooking.amountPaidAtShop.toLocaleString() }}</strong>
                      </span>
                    }
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Date: {{ pending.scheduledDate }}</span>
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>Installer: Pending</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-2">
                    <select 
                      (change)="onQuickAssignInstaller(pending.id, $event)"
                      class="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer max-w-[175px]"
                    >
                      <option value="">-- Assign Installer --</option>
                      @for (tech of store.installers(); track tech.id) {
                        <option [value]="tech.id">
                          {{ tech.name }} (★{{ tech.metrics.avgRating }}) {{ tech.isSignedIn ? '• online' : '' }}
                        </option>
                      }
                    </select>

                    <button 
                      type="button"
                      (click)="openSetupTruckModal(pending)"
                      class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <mat-icon class="!text-xs">handyman</mat-icon>
                      <span>Assign Installer</span>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- ================================================================= -->
      <!-- OPENSTREETMAP LIVE FLEET & MOTION RADAR VIEW                      -->
      <!-- ================================================================= -->
      @if (viewMode() === 'map') {
        <app-osm-live-map [mode]="'all-fleet'"></app-osm-live-map>
      }

      <!-- Real-Time Field Pipeline Bar -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Door Installation Pipeline Stages</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Live operational lifecycle from shop booking & truck setup to verification</p>
          </div>
          
          <div class="relative w-full sm:w-64">
            <mat-icon class="!text-sm text-slate-400 absolute left-3 top-2.5">search</mat-icon>
            <input 
              type="text"
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Search ID, Client, Address..."
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          @for (stage of pipelineStages; track stage.key) {
            <button 
              type="button"
              class="p-3 rounded-xl border transition-all cursor-pointer text-center block w-full active:scale-95"
              [class]="selectedFilter() === stage.key ? 'border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-bold shadow-xs' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'"
              (click)="setFilter(stage.key)"
            >
              <span class="block text-[10px] uppercase font-mono tracking-wider opacity-70 mb-1">{{ stage.label }}</span>
              <span class="text-lg font-black font-mono tabular-nums block">{{ countJobsByStage(stage.key) }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Installation Jobs Table (High Density SaaS Grid) -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Scheduled & Active Door Installations</h3>
            <span class="text-slate-400 dark:text-slate-500">·</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">{{ filteredJobs().length }} jobs shown</span>
          </div>

          <div class="flex items-center gap-2">
            @if (selectedFilter() || searchQuery()) {
              <button 
                type="button" 
                (click)="clearFilters()"
                class="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline font-medium"
              >
                Clear all filters
              </button>
            }
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th class="py-3.5 px-4">Job ID</th>
                <th class="py-3.5 px-4">Door Model & Specs</th>
                <th class="py-3.5 px-4">Client & Site Location</th>
                <th class="py-3.5 px-4">Truck & Tech Assigned</th>
                <th class="py-3.5 px-4">Status</th>
                <th class="py-3.5 px-4 text-right">Eligible Bonus</th>
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (job of filteredJobs(); track job.id) {
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                  <td class="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {{ job.id }}
                  </td>
                  
                  <td class="py-3.5 px-4">
                    <p class="font-bold text-slate-900 dark:text-white">{{ job.doorModel }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{{ job.dimensions }} · {{ job.finish }}</p>
                  </td>

                  <td class="py-3.5 px-4">
                    <p class="font-semibold text-slate-800 dark:text-slate-200">{{ job.client.name }}</p>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
                      <span class="truncate max-w-xs">{{ job.client.siteAddress }}</span>
                    </p>
                  </td>

                  <td class="py-3.5 px-4">
                    @if (job.assignedInstallerName) {
                      <div class="space-y-1">
                        <!-- Installer Row & Acceptance -->
                        <div class="flex items-center gap-1.5 flex-wrap">
                          <span class="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            <mat-icon class="!text-xs text-emerald-600">handyman</mat-icon>
                            <span>{{ job.assignedInstallerName }}</span>
                          </span>
                          @if (job.installerAssignmentStatus === 'accepted') {
                            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                              <mat-icon class="!text-[10px] !w-3 !h-3">check_circle</mat-icon>
                              <span>Accepted</span>
                            </span>
                          } @else if (job.installerAssignmentStatus === 'rejected') {
                            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300" [title]="(job.installerRejectReason || 'Rejected') + (job.installerProposedSlot ? ' | Alt slot: ' + job.installerProposedSlot : '')">
                              <mat-icon class="!text-[10px] !w-3 !h-3">cancel</mat-icon>
                              <span>Rejected</span>
                            </span>
                          } @else {
                            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                              <mat-icon class="!text-[10px] !w-3 !h-3">hourglass_empty</mat-icon>
                              <span>Pending</span>
                            </span>
                          }
                        </div>

                        <!-- Driver Row & Acceptance -->
                        @if (job.logisticsTruck) {
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-[11px] text-teal-800 dark:text-teal-300 font-mono flex items-center gap-1">
                              <mat-icon class="!text-xs">local_shipping</mat-icon>
                              <span>{{ job.logisticsTruck.truckPlate }} ({{ job.dispatcherName }})</span>
                            </span>
                            @if (job.driverAssignmentStatus === 'accepted') {
                              <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                                <mat-icon class="!text-[10px] !w-3 !h-3">check_circle</mat-icon>
                                <span>Accepted</span>
                              </span>
                            } @else if (job.driverAssignmentStatus === 'rejected') {
                              <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300" [title]="(job.driverRejectReason || 'Rejected') + (job.driverProposedSlot ? ' | Alt slot: ' + job.driverProposedSlot : '')">
                                <mat-icon class="!text-[10px] !w-3 !h-3">cancel</mat-icon>
                                <span>Rejected</span>
                              </span>
                            } @else {
                              <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                                <mat-icon class="!text-[10px] !w-3 !h-3">hourglass_empty</mat-icon>
                                <span>Pending</span>
                              </span>
                            }
                          </div>
                        }

                        <!-- Show reason if rejected -->
                        @if (job.driverRejectReason || job.installerRejectReason) {
                          <div class="text-[10px] text-red-600 dark:text-red-400 italic bg-red-50 dark:bg-red-950/40 p-1 rounded border border-red-200 dark:border-red-900">
                            Reason: {{ job.driverRejectReason || job.installerRejectReason }}
                            @if (job.driverProposedSlot || job.installerProposedSlot) {
                              <span class="block font-bold">Alt slot: {{ job.driverProposedSlot || job.installerProposedSlot }}</span>
                            }
                          </div>
                        }
                      </div>
                    } @else {
                      <div class="space-y-1.5">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          <span>Installer: Pending</span>
                        </span>
                        <div class="flex items-center gap-1">
                          <select 
                            (change)="onQuickAssignInstaller(job.id, $event)"
                            class="text-[11px] px-2 py-1 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-[160px]"
                          >
                            <option value="">-- Assign Installer --</option>
                            @for (tech of store.installers(); track tech.id) {
                              <option [value]="tech.id">
                                {{ tech.name }} (★{{ tech.metrics.avgRating }})
                              </option>
                            }
                          </select>
                        </div>
                      </div>
                    }
                  </td>

                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider" [class]="getStatusClass(job.status)">
                      {{ formatStatus(job.status) }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right font-mono font-bold whitespace-nowrap tabular-nums text-slate-700 dark:text-slate-300">
                    ₵{{ job.financials.bonusAmount }}
                    <span class="block text-[10px] font-normal text-slate-400 capitalize">{{ job.financials.bonusStatus }}</span>
                  </td>

                  <td class="py-3.5 px-4 text-right whitespace-nowrap space-y-1">
                    @if (job.status === 'booked_at_shop') {
                      <button 
                        type="button"
                        (click)="openSetupTruckModal(job)"
                        class="px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-2xs flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <mat-icon class="!text-xs">handyman</mat-icon>
                        <span>Assign Installer</span>
                      </button>
                    } @else if (job.status === 'assigned') {
                      <div class="text-right">
                        <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 block">
                          {{ job.assignedInstallerName || 'Installer Assigned' }}
                        </span>
                        <span class="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">
                          Awaiting Store Dispatch
                        </span>
                      </div>
                    } @else if (job.status === 'truck_assigned') {
                      @if (job.driverAssignmentStatus === 'accepted' && job.installerAssignmentStatus === 'accepted') {
                        <button 
                          type="button"
                          (click)="store.approveInstallationByOperations(job.id)"
                          class="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 shadow-xs ml-auto"
                        >
                          <mat-icon class="!text-xs">verified</mat-icon>
                          <span>Approve Request</span>
                        </button>
                      } @else if (job.driverAssignmentStatus === 'rejected' || job.installerAssignmentStatus === 'rejected') {
                        <button 
                          type="button"
                          (click)="openSetupTruckModal(job)"
                          class="px-2.5 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1 shadow-xs ml-auto"
                        >
                          <mat-icon class="!text-xs">sync</mat-icon>
                          <span>Re-assign Installer</span>
                        </button>
                      } @else {
                        <span class="text-[10px] text-amber-600 dark:text-amber-400 font-medium block">
                          Awaiting responses
                        </span>
                      }
                    } @else if (job.status === 'approved') {
                      <div class="flex items-center justify-end gap-1.5">
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Approved
                        </span>
                        <button 
                          type="button"
                          (click)="store.startLiveMotion(job.id)"
                          class="px-2.5 py-1 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-1 shadow-xs"
                        >
                          <mat-icon class="!text-xs">play_arrow</mat-icon>
                          <span>Start Live Convoy</span>
                        </button>
                      </div>
                    }

                    <button 
                      type="button"
                      (click)="jobSelected.emit(job.id)"
                      class="px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 transition-colors shadow-2xs ml-auto block"
                    >
                      Inspect Job →
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- MODAL: SET UP TRUCK & ASSIGN AVAILABLE SIGNED-IN FIELD TECHNICIAN   -->
      <!-- =================================================================== -->
      @if (activeSetupJob()) {
        @let job = activeSetupJob()!;
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">handyman</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Assign Field Installer to Order</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ job.id }} · {{ job.doorModel }}</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeSetupModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <!-- Modal Content -->
            <form [formGroup]="truckSetupForm" (ngSubmit)="confirmInstallerAssignment()" class="overflow-y-auto p-6 space-y-5 text-xs">
              <!-- Site Location & Client Details Review -->
              <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <mat-icon class="!text-xs text-indigo-600">place</mat-icon>
                  <span>Client & Site Location Details (Recorded by Shop)</span>
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <p class="text-slate-900 dark:text-white font-extrabold text-sm">{{ job.client.name }}</p>
                    <p class="text-slate-600 dark:text-slate-300 font-mono text-xs flex items-center gap-1 mt-0.5">
                      <mat-icon class="!text-xs text-red-500">location_on</mat-icon>
                      <span>{{ job.client.siteAddress }}</span>
                    </p>
                    <p class="text-[11px] text-slate-500 font-mono mt-0.5">Tel: {{ job.client.phone }}</p>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Lock Hardware:</span>
                    <p class="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">lock</mat-icon>
                      <span>{{ job.lockModel || 'Smart Lock Handle' }}</span>
                    </p>
                    <p class="text-[11px] text-slate-500 mt-1 italic">
                      "{{ job.client.accessInstructions || 'Site access confirmed' }}"
                    </p>
                  </div>
                </div>
              </div>

              <!-- Select Available Field Technician (Operations Manager assigns installer only) -->
              <div class="space-y-3 pt-1">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider flex items-center gap-1">
                    <mat-icon class="!text-xs">handyman</mat-icon>
                    <span>Select Available Field Technician</span>
                  </span>
                  <span class="text-[11px] text-slate-500 font-mono">
                    {{ store.signedInInstallers().length }} technicians signed in
                  </span>
                </div>

                <!-- Dropdown Selector Option for Operations Manager -->
                <div>
                  <label for="modalInstallerDropdownSelect" class="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                    Or select installer from dropdown list:
                  </label>
                  <select 
                    id="modalInstallerDropdownSelect"
                    formControlName="installerId"
                    class="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="">-- Choose installer from dropdown list --</option>
                    @for (tech of store.installers(); track tech.id) {
                      <option [value]="tech.id">
                        {{ tech.name }} (★{{ tech.metrics.avgRating }}) · {{ tech.isSignedIn ? 'Signed In' : 'Offline' }} · {{ tech.availabilityStatus || 'available' }}
                      </option>
                    }
                  </select>
                </div>

                <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                  @for (tech of store.installers(); track tech.id) {
                    <div 
                      role="button"
                      tabindex="0"
                      (click)="truckSetupForm.patchValue({ installerId: tech.id })"
                      (keydown.enter)="truckSetupForm.patchValue({ installerId: tech.id })"
                      class="p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3"
                      [class]="truckSetupForm.get('installerId')?.value === tech.id ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-600' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800'"
                    >
                      <div class="flex items-center gap-3">
                        <div class="relative">
                          <div class="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                            {{ tech.name.charAt(0) }}
                          </div>
                          @if (tech.isSignedIn) {
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 ring-2 ring-white dark:ring-slate-900" title="Signed In"></span>
                          } @else {
                            <span class="w-2.5 h-2.5 rounded-full bg-slate-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-white dark:ring-slate-900" title="Offline"></span>
                          }
                        </div>

                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-bold text-slate-900 dark:text-white">{{ tech.name }}</span>
                            @if (tech.isSignedIn) {
                              <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded">Signed In</span>
                            } @else {
                              <span class="text-[10px] text-slate-400 font-medium">Offline</span>
                            }
                            <span class="text-[10px] text-amber-500 font-bold">★ {{ tech.metrics.avgRating }}</span>
                          </div>
                          <p class="text-[11px] text-slate-500 dark:text-slate-400">
                            Lock Specialties: <strong class="text-slate-700 dark:text-slate-300">{{ tech.lockSpecialties ? tech.lockSpecialties.join(', ') : 'Smart Locks, Mortise' }}</strong>
                          </p>
                          <p class="text-[10px] text-slate-400 font-mono">
                            Status: {{ tech.availabilityStatus || 'available' }} · Location: {{ tech.currentLocationName || 'Central Accra' }}
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <button 
                          type="button" 
                          (click)="$event.stopPropagation(); store.toggleTechnicianSignIn(tech.id)"
                          class="px-2 py-1 rounded text-[10px] font-bold border transition-colors"
                          [class]="tech.isSignedIn ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'"
                          title="Toggle technician sign-in status"
                        >
                          {{ tech.isSignedIn ? 'Sign Out' : 'Sign In' }}
                        </button>
                        <input 
                          type="radio" 
                          [name]="'installerChoice'"
                          [checked]="truckSetupForm.get('installerId')?.value === tech.id"
                          class="text-emerald-600"
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span class="text-[11px] text-slate-500 font-mono">
                  Shop Manager will receive SMS & notification to assign store dispatch driver
                </span>
                <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button 
                    type="button" 
                    (click)="closeSetupModal()"
                    class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    (click)="confirmInstallerAssignment()"
                    [disabled]="!truckSetupForm.get('installerId')?.value"
                    class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <mat-icon class="!text-sm">check_circle</mat-icon>
                    <span>Assign Installer & Notify Shop</span>
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
    }], null, { jobSelected: [{ type: i0.Output, args: ["jobSelected"] }], newJobOpened: [{ type: i0.Output, args: ["newJobOpened"] }], bonusModalOpened: [{ type: i0.Output, args: ["bonusModalOpened"] }], manageUsersOpened: [{ type: i0.Output, args: ["manageUsersOpened"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Overview, { className: "Overview", filePath: "frontend/src/app/views/overview/overview.ts", lineNumber: 716 }); })();
