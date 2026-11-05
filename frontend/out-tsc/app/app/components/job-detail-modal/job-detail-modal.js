import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { ClockWidget } from '../clock-widget/clock-widget';
import { PhotoUploader } from '../photo-uploader/photo-uploader';
import { SignaturePad } from '../signature-pad/signature-pad';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function JobDetailModal_Conditional_1_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleAccept()); });
    i0.ɵɵelementStart(1, "mat-icon", 25);
    i0.ɵɵtext(2, "handshake");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Accept Job & Notify Client");
    i0.ɵɵelementEnd()();
} }
function JobDetailModal_Conditional_1_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleDispatch()); });
    i0.ɵɵelementStart(1, "mat-icon", 25);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵclassMap(!j_r5.assignedInstallerId ? "px-3.5 py-1.5 text-xs font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-not-allowed opacity-60 flex items-center gap-1.5 shadow-none" : "px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer");
    i0.ɵɵproperty("disabled", !j_r5.assignedInstallerId)("title", !j_r5.assignedInstallerId ? "Assign dispatch is disabled until an installer is assigned by Operations Manager" : "Dispatch Door & Hardware");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(!j_r5.assignedInstallerId ? "lock" : "local_shipping");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(!j_r5.assignedInstallerId ? "Dispatch Disabled (Pending Installer)" : "Dispatch Door & Hardware");
} }
function JobDetailModal_Conditional_1_Conditional_54_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵelement(1, "span", 60);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Status: Pending");
    i0.ɵɵelementEnd()();
} }
function JobDetailModal_Conditional_1_Conditional_54_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 40)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Accepted");
    i0.ɵɵelementEnd()();
} }
function JobDetailModal_Conditional_1_Conditional_54_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 41)(1, "mat-icon", 61);
    i0.ɵɵtext(2, "hourglass_top");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pending Acceptance");
    i0.ɵɵelementEnd()();
} }
function JobDetailModal_Conditional_1_Conditional_54_Conditional_51_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tech_r7 = ctx.$implicit;
    i0.ɵɵnextContext(4);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("value", tech_r7.id)("selected", tech_r7.id === j_r5.assignedInstallerId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4(" ", tech_r7.name, " (\u2605", tech_r7.metrics.avgRating, ") \u00B7 ", tech_r7.availabilityStatus || "available", " ", tech_r7.isSignedIn ? "\u00B7 Signed In" : "\u00B7 Offline", " ");
} }
function JobDetailModal_Conditional_1_Conditional_54_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48)(1, "label", 62);
    i0.ɵɵtext(2, " Assign Installer from Dropdown: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 6)(4, "select", 63, 0)(6, "option", 64);
    i0.ɵɵtext(7, "-- Choose Installer from List --");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(8, JobDetailModal_Conditional_1_Conditional_54_Conditional_51_For_9_Template, 2, 6, "option", 65, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 66);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Conditional_54_Conditional_51_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r6); const installerSelect_r8 = i0.ɵɵreference(5); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.assignInstallerFromDetail(installerSelect_r8.value)); });
    i0.ɵɵelementStart(11, "mat-icon", 67);
    i0.ɵɵtext(12, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const installerSelect_r8 = i0.ɵɵreference(5);
    const ctx_r2 = i0.ɵɵnextContext(3);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.store.installers());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !installerSelect_r8.value || installerSelect_r8.value === j_r5.assignedInstallerId);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(j_r5.assignedInstallerId ? "Re-assign" : "Assign Installer");
} }
function JobDetailModal_Conditional_1_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "div", 27)(2, "div")(3, "h4", 28);
    i0.ɵɵtext(4, "Door Specifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 29)(6, "div", 30)(7, "span", 31);
    i0.ɵɵtext(8, "Door Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 32);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 30)(12, "span", 31);
    i0.ɵɵtext(13, "Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 33);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 30)(17, "span", 31);
    i0.ɵɵtext(18, "Finish & Surface");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 34);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 30)(22, "span", 31);
    i0.ɵɵtext(23, "Hardware Spec");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 34);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 35)(27, "span", 31);
    i0.ɵɵtext(28, "DoorMaster Shop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 36);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(31, "div")(32, "div", 37)(33, "h4", 38);
    i0.ɵɵtext(34, "Assigned Installer");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(35, JobDetailModal_Conditional_1_Conditional_54_Conditional_35_Template, 4, 0, "span", 39)(36, JobDetailModal_Conditional_1_Conditional_54_Conditional_36_Template, 5, 0, "span", 40)(37, JobDetailModal_Conditional_1_Conditional_54_Conditional_37_Template, 5, 0, "span", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 42)(39, "div", 43)(40, "div", 4)(41, "div", 44);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div")(44, "p", 45);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 46);
    i0.ɵɵtext(47, "Scheduled: ");
    i0.ɵɵelementStart(48, "span", 47);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(50);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵconditionalCreate(51, JobDetailModal_Conditional_1_Conditional_54_Conditional_51_Template, 15, 2, "div", 48);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(52, "div", 27)(53, "div")(54, "h4", 28);
    i0.ɵɵtext(55, "Client & Installation Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "div", 49)(57, "div")(58, "span", 50);
    i0.ɵɵtext(59, "Client Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "p", 51);
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "div")(63, "span", 50);
    i0.ɵɵtext(64, "Site Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "p", 52)(66, "mat-icon", 53);
    i0.ɵɵtext(67, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "span");
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(70, "div", 54)(71, "div")(72, "span", 50);
    i0.ɵɵtext(73, "Contact Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "span", 55);
    i0.ɵɵtext(75);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(76, "div")(77, "span", 50);
    i0.ɵɵtext(78, "Access Note");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "span", 56);
    i0.ɵɵtext(80);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(81, "div")(82, "h4", 28);
    i0.ɵɵtext(83, "Installation Milestones");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 57)(85, "div", 58)(86, "mat-icon", 59);
    i0.ɵɵtext(87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "span");
    i0.ɵɵtext(89);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(90, "div", 58)(91, "mat-icon", 59);
    i0.ɵɵtext(92, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "span");
    i0.ɵɵtext(94, "2. Installer Accepted (Client alerted)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(95, "div", 58)(96, "mat-icon", 59);
    i0.ɵɵtext(97, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(98, "span");
    i0.ɵɵtext(99, "3. On-Site GPS Clock In");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(100, "div", 58)(101, "mat-icon", 59);
    i0.ɵɵtext(102, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "span");
    i0.ɵɵtext(104, "4. Customer Digital Sign-Off Verified");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(105, "div", 58)(106, "mat-icon", 59);
    i0.ɵɵtext(107, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(108, "span");
    i0.ɵɵtext(109, "5. Performance Bonus Authorized");
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r2.formatCategory(j_r5.doorCategory));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r5.dimensions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r5.finish);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r5.hardwareSpecs);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r5.shopBranch);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(!j_r5.assignedInstallerId ? 35 : j_r5.installerAssignmentStatus === "accepted" ? 36 : 37);
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(j_r5.assignedInstallerId ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", j_r5.assignedInstallerName ? j_r5.assignedInstallerName.charAt(0) : "?", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", j_r5.assignedInstallerName || "Pending Assignment", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(j_r5.scheduledDate);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", j_r5.estimatedHours, "h allocated)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.store.currentRole() === "manager" ? 51 : -1);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(j_r5.client.name);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(j_r5.client.siteAddress);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(j_r5.client.phone);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r5.client.accessInstructions || "None specified");
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(j_r5.assignedAt ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", j_r5.assignedAt ? "check_circle" : "hourglass_top", " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(j_r5.assignedAt ? "text-slate-900 dark:text-white font-medium" : "text-amber-700 dark:text-amber-400 font-semibold");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" 1. Installer: ", j_r5.assignedAt ? "Assigned (" + (j_r5.assignedInstallerName || "Technician") + ")" : "Pending (Awaiting Operations Manager)", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(j_r5.acceptedAt ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(j_r5.acceptedAt ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(j_r5.status === "on_site" || j_r5.clockSessions.length > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(j_r5.status === "on_site" || j_r5.clockSessions.length > 0 ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(j_r5.customerSignoff ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(j_r5.customerSignoff ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(j_r5.status === "bonus_awarded" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(j_r5.status === "bonus_awarded" ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500");
} }
function JobDetailModal_Conditional_1_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-clock-widget", 68);
    i0.ɵɵlistener("clockInTriggered", function JobDetailModal_Conditional_1_Conditional_55_Template_app_clock_widget_clockInTriggered_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleClockIn($event)); })("clockOutTriggered", function JobDetailModal_Conditional_1_Conditional_55_Template_app_clock_widget_clockOutTriggered_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleClockOut($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("job", j_r5);
} }
function JobDetailModal_Conditional_1_Conditional_56_For_8_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Verified at ", ctx_r2.formatTime(item_r11.completedAt), " ");
} }
function JobDetailModal_Conditional_1_Conditional_56_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵlistener("keydown.enter", function JobDetailModal_Conditional_1_Conditional_56_For_8_Template_div_keydown_enter_0_listener() { const item_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.toggleChecklist(item_r11.id)); })("click", function JobDetailModal_Conditional_1_Conditional_56_For_8_Template_div_click_0_listener() { const item_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.toggleChecklist(item_r11.id)); });
    i0.ɵɵelement(1, "input", 73);
    i0.ɵɵelementStart(2, "div", 74)(3, "p", 75);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, JobDetailModal_Conditional_1_Conditional_56_For_8_Conditional_5_Template, 2, 1, "p", 76);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵclassMap(item_r11.completed ? "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800" : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", item_r11.completed);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(item_r11.completed ? "text-emerald-950 dark:text-emerald-300 line-through" : "text-slate-800 dark:text-slate-200");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r11.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r11.completedAt ? 5 : -1);
} }
function JobDetailModal_Conditional_1_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 43)(2, "h4", 38);
    i0.ɵɵtext(3, "Door Hardware Installation Steps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 69);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 70);
    i0.ɵɵrepeaterCreate(7, JobDetailModal_Conditional_1_Conditional_56_For_8_Template, 6, 7, "div", 71, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.completedChecklistCount(), " of ", j_r5.hardwareChecklist.length, " Complete ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(j_r5.hardwareChecklist);
} }
function JobDetailModal_Conditional_1_Conditional_57_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-photo-uploader", 77);
    i0.ɵɵlistener("photoUploaded", function JobDetailModal_Conditional_1_Conditional_57_Template_app_photo_uploader_photoUploaded_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handlePhotoUpload($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("photos", j_r5.photos);
} }
function JobDetailModal_Conditional_1_Conditional_58_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78)(1, "div", 43)(2, "div", 6)(3, "mat-icon", 79);
    i0.ɵɵtext(4, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h4", 80);
    i0.ɵɵtext(6, "Customer Verification Archival Certificate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 81);
    i0.ɵɵtext(8, " Legally Signed ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 82)(10, "div", 83)(11, "div", 84)(12, "span", 31);
    i0.ɵɵtext(13, "Signee Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong", 85);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 84)(17, "span", 31);
    i0.ɵɵtext(18, "Workmanship Rating");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "strong", 86);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 84)(22, "span", 31);
    i0.ɵɵtext(23, "Signed Timestamp");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 55);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 87)(27, "span", 88);
    i0.ɵɵtext(28, "Client Remarks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "p", 89);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 90)(32, "span", 91);
    i0.ɵɵtext(33, "Customer Digital Signature");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 92);
    i0.ɵɵelement(35, "img", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 94);
    i0.ɵɵtext(37, "Verified via DoorMaster Client Sign-Off Pad");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(15);
    i0.ɵɵtextInterpolate(j_r5.customerSignoff.clientName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", j_r5.customerSignoff.rating, ".0 / 5.0 \u2605");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatTime(j_r5.customerSignoff.signedAt));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\"", j_r5.customerSignoff.feedback, "\"");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("src", j_r5.customerSignoff.signatureDataUrl, i0.ɵɵsanitizeUrl);
} }
function JobDetailModal_Conditional_1_Conditional_58_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 95)(2, "mat-icon", 96);
    i0.ɵɵtext(3, "info");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Customer signature is required before management bonus can be authorized.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "app-signature-pad", 97);
    i0.ɵɵlistener("signoffCompleted", function JobDetailModal_Conditional_1_Conditional_58_Conditional_1_Template_app_signature_pad_signoffCompleted_6_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.handleSignoff($event)); })("cancelled", function JobDetailModal_Conditional_1_Conditional_58_Conditional_1_Template_app_signature_pad_cancelled_6_listener() { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.activeTab.set("specs")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext(3);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("initialClientName", j_r5.client.name);
} }
function JobDetailModal_Conditional_1_Conditional_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, JobDetailModal_Conditional_1_Conditional_58_Conditional_0_Template, 38, 5, "div", 78)(1, JobDetailModal_Conditional_1_Conditional_58_Conditional_1_Template, 7, 1, "div", 27);
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵconditional(j_r5.customerSignoff ? 0 : 1);
} }
function JobDetailModal_Conditional_1_Conditional_59_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 114);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 115);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Authorized by ", j_r5.financials.bonusApprovedBy);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatTime(j_r5.financials.bonusApprovedAt || ""));
} }
function JobDetailModal_Conditional_1_Conditional_59_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 116);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Conditional_59_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.handleApproveBonus()); });
    i0.ɵɵtext(1, " Authorize Bonus Payout ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(3);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("disabled", !j_r5.customerSignoff);
} }
function JobDetailModal_Conditional_1_Conditional_59_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111)(1, "span");
    i0.ɵɵtext(2, "5-Star Perfect Customer Satisfaction Multiplier (+25%)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 117);
    i0.ɵɵtext(4, "+25% Applied");
    i0.ɵɵelementEnd()();
} }
function JobDetailModal_Conditional_1_Conditional_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "div", 98)(2, "div", 99)(3, "span", 100);
    i0.ɵɵtext(4, "Eligible Installer Bonus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 101);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 102);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 99)(10, "span", 100);
    i0.ɵɵtext(11, "Door Value + Fee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 103);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 104);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 99)(17, "span", 100);
    i0.ɵɵtext(18, "Bonus Authorization");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(19, JobDetailModal_Conditional_1_Conditional_59_Conditional_19_Template, 4, 2)(20, JobDetailModal_Conditional_1_Conditional_59_Conditional_20_Template, 2, 1, "button", 105);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 106)(22, "h4", 107);
    i0.ɵɵtext(23, "Management Incentive Formula Breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 108)(25, "div", 109)(26, "span", 110);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 33);
    i0.ɵɵtext(29, "$160.00");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 109)(31, "span", 110);
    i0.ɵɵtext(32, "On-Time Arrival & Completion Incentive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 33);
    i0.ɵɵtext(34, "+$40.00");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 109)(36, "span", 110);
    i0.ɵɵtext(37, "Photographic Quality Assurance Upload (Before & After)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span", 33);
    i0.ɵɵtext(39, "+$25.00");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(40, JobDetailModal_Conditional_1_Conditional_59_Conditional_40_Template, 5, 0, "div", 111);
    i0.ɵɵelementStart(41, "div", 112)(42, "span");
    i0.ɵɵtext(43, "Total Calculated Performance Bonus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "span", 113);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("$", j_r5.financials.bonusAmount);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(j_r5.financials.bonusStatus === "approved" ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Status: ", j_r5.financials.bonusStatus, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" $", j_r5.financials.doorPrice + j_r5.financials.installationFee, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Fee: $", j_r5.financials.installationFee, " \u00B7 Deposit: Paid ");
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(j_r5.financials.bonusStatus === "approved" ? 19 : 20);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("Base Architectural Door Incentive (", ctx_r2.formatCategory(j_r5.doorCategory), ")");
    i0.ɵɵadvance(13);
    i0.ɵɵconditional(j_r5.customerSignoff && j_r5.customerSignoff.rating >= 5 ? 40 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("$", j_r5.financials.bonusAmount, ".00");
} }
function JobDetailModal_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
    i0.ɵɵtext(5, " DM ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "div", 6)(8, "span", 7);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 8);
    i0.ɵɵtext(11, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 9);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "h2", 10);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 6);
    i0.ɵɵconditionalCreate(17, JobDetailModal_Conditional_1_Conditional_17_Template, 5, 0, "button", 11);
    i0.ɵɵconditionalCreate(18, JobDetailModal_Conditional_1_Conditional_18_Template, 5, 6, "button", 12);
    i0.ɵɵelementStart(19, "button", 13);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closed.emit()); });
    i0.ɵɵelementStart(20, "mat-icon", 14);
    i0.ɵɵtext(21, "close");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(22, "div", 15)(23, "button", 16);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activeTab.set("specs")); });
    i0.ɵɵelementStart(24, "mat-icon", 17);
    i0.ɵɵtext(25, "door_sliding");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Specifications & Site");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "button", 16);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activeTab.set("site_ops")); });
    i0.ɵɵelementStart(29, "mat-icon", 17);
    i0.ɵɵtext(30, "schedule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32, "Site Attendance & Clock In/Out");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "button", 16);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activeTab.set("checklist")); });
    i0.ɵɵelementStart(34, "mat-icon", 17);
    i0.ɵɵtext(35, "fact_check");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵtext(37, "Checklist");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "button", 16);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activeTab.set("photos")); });
    i0.ɵɵelementStart(39, "mat-icon", 17);
    i0.ɵɵtext(40, "photo_camera");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "button", 16);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activeTab.set("signoff")); });
    i0.ɵɵelementStart(44, "mat-icon", 17);
    i0.ɵɵtext(45, "draw");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "span");
    i0.ɵɵtext(47, "Customer Verification");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "button", 16);
    i0.ɵɵlistener("click", function JobDetailModal_Conditional_1_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activeTab.set("bonus")); });
    i0.ɵɵelementStart(49, "mat-icon", 17);
    i0.ɵɵtext(50, "military_tech");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span");
    i0.ɵɵtext(52, "Bonus & Finance");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(53, "div", 18);
    i0.ɵɵconditionalCreate(54, JobDetailModal_Conditional_1_Conditional_54_Template, 110, 39, "div", 19);
    i0.ɵɵconditionalCreate(55, JobDetailModal_Conditional_1_Conditional_55_Template, 1, 1, "app-clock-widget", 20);
    i0.ɵɵconditionalCreate(56, JobDetailModal_Conditional_1_Conditional_56_Template, 9, 2, "div", 21);
    i0.ɵɵconditionalCreate(57, JobDetailModal_Conditional_1_Conditional_57_Template, 1, 1, "app-photo-uploader", 22);
    i0.ɵɵconditionalCreate(58, JobDetailModal_Conditional_1_Conditional_58_Template, 2, 1);
    i0.ɵɵconditionalCreate(59, JobDetailModal_Conditional_1_Conditional_59_Template, 46, 10, "div", 23);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(j_r5.id);
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ctx_r2.getStatusClass(j_r5.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatStatus(j_r5.status), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(j_r5.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(j_r5.status === "assigned" && ctx_r2.store.currentRole() === "installer" ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((j_r5.status === "accepted" || j_r5.status === "draft" || j_r5.status === "assigned" || j_r5.status === "booked_at_shop") && ctx_r2.store.currentRole() === "shop_manager" ? 18 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r2.activeTab() === "specs" ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold" : "hover:text-slate-800 dark:hover:text-slate-200");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r2.activeTab() === "site_ops" ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold" : "hover:text-slate-800 dark:hover:text-slate-200");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r2.activeTab() === "checklist" ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold" : "hover:text-slate-800 dark:hover:text-slate-200");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r2.activeTab() === "photos" ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold" : "hover:text-slate-800 dark:hover:text-slate-200");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Photos (", j_r5.photos.length, ")");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.activeTab() === "signoff" ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold" : "hover:text-slate-800 dark:hover:text-slate-200");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r2.activeTab() === "bonus" ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold" : "hover:text-slate-800 dark:hover:text-slate-200");
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r2.activeTab() === "specs" ? 54 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.activeTab() === "site_ops" ? 55 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.activeTab() === "checklist" ? 56 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.activeTab() === "photos" ? 57 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.activeTab() === "signoff" ? 58 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.activeTab() === "bonus" ? 59 : -1);
} }
export class JobDetailModal {
    jobId = input.required(...(ngDevMode ? [{ debugName: "jobId" }] : /* istanbul ignore next */ []));
    store = inject(InstallationStore);
    alert = inject(AlertService);
    closed = output();
    activeTab = signal('specs', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    currentJob = computed(() => {
        return this.store.jobs().find(j => j.id === this.jobId()) || null;
    }, ...(ngDevMode ? [{ debugName: "currentJob" }] : /* istanbul ignore next */ []));
    completedChecklistCount = computed(() => {
        const j = this.currentJob();
        return j ? j.hardwareChecklist.filter(i => i.completed).length : 0;
    }, ...(ngDevMode ? [{ debugName: "completedChecklistCount" }] : /* istanbul ignore next */ []));
    assignInstallerFromDetail(installerId) {
        if (!installerId)
            return;
        const tech = this.store.installers().find(t => t.id === installerId);
        this.store.assignInstallerByManager(this.jobId(), installerId);
        this.alert.success('Installer Assigned', `Technician ${tech?.name || 'Installer'} has been assigned to job #${this.jobId()}.`);
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
    handleClockIn(coords) {
        this.store.clockIn(this.jobId(), coords.lat, coords.lng);
    }
    handleClockOut(data) {
        this.store.clockOut(this.jobId(), data.notes);
    }
    toggleChecklist(itemId) {
        this.store.toggleChecklistItem(this.jobId(), itemId);
    }
    handlePhotoUpload(data) {
        this.store.uploadPhoto(this.jobId(), data.stage, data.url, data.caption);
    }
    handleSignoff(data) {
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
        this.store.assignInstaller(this.jobId(), this.store.currentInstallerId());
    }
    getStatusClass(status) {
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
    formatStatus(status) {
        return status.replace(/_/g, ' ');
    }
    formatCategory(category) {
        return category.replace(/_/g, ' ');
    }
    formatTime(isoString) {
        if (!isoString)
            return '';
        try {
            const d = new Date(isoString);
            return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        catch {
            return isoString;
        }
    }
    static ɵfac = function JobDetailModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || JobDetailModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: JobDetailModal, selectors: [["app-job-detail-modal"]], inputs: { jobId: [1, "jobId"] }, outputs: { closed: "closed" }, decls: 2, vars: 2, consts: [["installerSelect", ""], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-3", "sm:p-6", "bg-slate-950/60", "backdrop-blur-xs", "animate-in", "fade-in", "duration-200"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-4xl", "w-full", "overflow-hidden", "flex", "flex-col", "max-h-[92vh]", "text-slate-900", "dark:text-slate-100"], [1, "px-6", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-950/70"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-xl", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center", "font-mono", "font-bold", "text-sm", "shadow-xs"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-mono", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase"], [1, "text-xs", "text-slate-300", "dark:text-slate-600"], [1, "text-xs", "font-semibold", "px-2", "py-0.5", "rounded", "uppercase", "tracking-wider"], [1, "text-base", "font-bold", "text-slate-900", "dark:text-white", "leading-tight", "mt-0.5"], ["type", "button", 1, "px-4", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm"], ["type", "button", 3, "disabled", "title", "class"], [1, "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", "p-1", "rounded", 3, "click"], [1, "!text-xl"], [1, "px-6", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "gap-6", "text-xs", "font-medium", "text-slate-500", "dark:text-slate-400", "bg-white", "dark:bg-slate-900", "overflow-x-auto"], ["type", "button", 1, "py-3", "transition-colors", "flex", "items-center", "gap-1.5", "shrink-0", 3, "click"], [1, "!text-sm"], [1, "p-6", "overflow-y-auto", "space-y-6"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [3, "job"], [1, "space-y-3"], [3, "photos"], [1, "space-y-5"], ["type", "button", 1, "px-4", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], ["type", "button", 3, "click", "disabled", "title"], [1, "space-y-4"], [1, "text-xs", "font-bold", "text-slate-800", "dark:text-slate-200", "uppercase", "tracking-wider", "mb-2.5"], [1, "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "p-4", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-2.5", "text-xs"], [1, "flex", "justify-between", "py-1", "border-b", "border-slate-200/60", "dark:border-slate-700/60"], [1, "text-slate-500", "dark:text-slate-400"], [1, "font-semibold", "text-slate-900", "dark:text-white", "capitalize"], [1, "font-mono", "font-semibold", "text-slate-900", "dark:text-white"], [1, "font-semibold", "text-slate-900", "dark:text-white", "text-right", "max-w-[60%]"], [1, "flex", "justify-between", "py-1"], [1, "font-semibold", "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-xs", "font-bold", "text-slate-800", "dark:text-slate-200", "uppercase", "tracking-wider"], [1, "inline-flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-amber-100", "text-amber-800", "dark:bg-amber-950/80", "dark:text-amber-300", "border", "border-amber-300", "dark:border-amber-700", "shadow-2xs"], [1, "inline-flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-emerald-100", "text-emerald-800", "dark:bg-emerald-950", "dark:text-emerald-300", "border", "border-emerald-300", "dark:border-emerald-700"], [1, "inline-flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-amber-100", "text-amber-800", "dark:bg-amber-950", "dark:text-amber-300", "border", "border-amber-300", "dark:border-amber-700"], [1, "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "p-4", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-3"], [1, "flex", "items-center", "justify-between"], [1, "w-10", "h-10", "rounded-full", "flex", "items-center", "justify-center", "font-bold", "text-sm", "shadow-xs"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400"], [1, "font-mono"], [1, "pt-2.5", "border-t", "border-slate-200/70", "dark:border-slate-700/70", "space-y-1.5"], [1, "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "p-4", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-3", "text-xs"], [1, "text-slate-400", "dark:text-slate-500", "block", "text-[10px]", "uppercase", "font-semibold"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "font-semibold", "text-slate-800", "dark:text-slate-200", "flex", "items-center", "gap-1.5", "mt-0.5"], [1, "!text-sm", "text-emerald-600", "dark:text-emerald-400"], [1, "grid", "grid-cols-2", "gap-2", "pt-1", "border-t", "border-slate-200/60", "dark:border-slate-700/60"], [1, "font-mono", "text-slate-700", "dark:text-slate-300"], [1, "text-slate-700", "dark:text-slate-300", "truncate", "block"], [1, "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "p-4", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-2"], [1, "flex", "items-center", "gap-2.5", "text-xs"], [1, "!text-base"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-amber-500", "animate-pulse"], [1, "!text-[11px]", "!w-3", "!h-3"], ["for", "detailInstallerDropdown", 1, "block", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-600", "dark:text-slate-400"], ["id", "detailInstallerDropdown", 1, "text-xs", "px-2.5", "py-1.5", "bg-white", "dark:bg-slate-900", "border", "border-slate-300", "dark:border-slate-700", "rounded-lg", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "font-medium", "flex-1", "cursor-pointer"], ["value", ""], [3, "value", "selected"], ["type", "button", 1, "px-3.5", "py-1.5", "text-xs", "font-bold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "disabled:opacity-40", "disabled:cursor-not-allowed", "rounded-lg", "shadow-2xs", "transition-all", "flex", "items-center", "gap-1", "cursor-pointer", "whitespace-nowrap", "active:scale-95", 3, "click", "disabled"], [1, "!text-xs"], [3, "clockInTriggered", "clockOutTriggered", "job"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "space-y-2"], ["role", "button", "tabindex", "0", 1, "p-3.5", "rounded-xl", "border", "transition-all", "flex", "items-start", "gap-3", "cursor-pointer", 3, "class"], ["role", "button", "tabindex", "0", 1, "p-3.5", "rounded-xl", "border", "transition-all", "flex", "items-start", "gap-3", "cursor-pointer", 3, "keydown.enter", "click"], ["type", "checkbox", 1, "mt-0.5", "rounded", "text-emerald-600", "focus:ring-0", "cursor-pointer", 3, "checked"], [1, "flex-1", "text-xs"], [1, "font-medium"], [1, "text-[10px]", "text-emerald-700", "dark:text-emerald-400", "font-mono", "mt-0.5"], [3, "photoUploaded", "photos"], [1, "bg-emerald-50/60", "dark:bg-emerald-950/40", "rounded-2xl", "border", "border-emerald-200", "dark:border-emerald-800", "p-6", "space-y-4"], [1, "text-emerald-700", "dark:text-emerald-400"], [1, "text-sm", "font-bold", "text-emerald-950", "dark:text-emerald-300"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded", "bg-emerald-100", "dark:bg-emerald-900/60", "text-emerald-800", "dark:text-emerald-300", "font-mono", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "text-xs"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-emerald-100", "dark:border-emerald-900/60", "space-y-2"], [1, "flex", "justify-between"], [1, "text-slate-900", "dark:text-white"], [1, "text-amber-600", "dark:text-amber-400", "font-semibold"], [1, "pt-2", "border-t", "border-slate-100", "dark:border-slate-800"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "block", "uppercase"], [1, "text-slate-700", "dark:text-slate-300", "italic", "mt-0.5"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-emerald-100", "dark:border-emerald-900/60", "flex", "flex-col", "items-center", "justify-center"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase", "font-mono", "mb-2"], [1, "h-24", "w-full", "flex", "items-center", "justify-center", "border-b", "border-dashed", "border-slate-300", "dark:border-slate-700", "pb-2"], ["alt", "Customer Signature", 1, "max-h-20", "max-w-full", "object-contain", "bg-white", "rounded", "p-1", 3, "src"], [1, "text-[10px]", "font-mono", "text-slate-400", "dark:text-slate-500", "mt-2"], [1, "p-3", "bg-amber-50", "dark:bg-amber-950/40", "rounded-xl", "border", "border-amber-200/80", "dark:border-amber-800", "text-xs", "text-amber-900", "dark:text-amber-300", "flex", "items-center", "gap-2"], [1, "text-amber-700", "dark:text-amber-400"], [3, "signoffCompleted", "cancelled", "initialClientName"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], [1, "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "p-4", "border", "border-slate-200/80", "dark:border-slate-800"], [1, "text-[10px]", "uppercase", "font-semibold", "text-slate-400", "dark:text-slate-500", "block", "mb-1"], [1, "text-2xl", "font-bold", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tabular-nums"], [1, "block", "text-xs", "mt-1", "font-medium", "capitalize"], [1, "text-2xl", "font-bold", "font-mono", "text-slate-900", "dark:text-white", "tabular-nums"], [1, "block", "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1"], ["type", "button", 1, "mt-1", "w-full", "py-2", "px-3", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "disabled:opacity-50", "disabled:cursor-not-allowed", "rounded-lg", "shadow-xs", "transition-colors", 3, "disabled"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "p-4", "space-y-3"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "uppercase", "tracking-wider"], [1, "space-y-2", "text-xs"], [1, "flex", "justify-between", "py-1", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "text-slate-600", "dark:text-slate-400"], [1, "flex", "justify-between", "py-1", "border-b", "border-slate-100", "dark:border-slate-800", "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "flex", "justify-between", "pt-1", "font-bold", "text-sm", "text-slate-900", "dark:text-white"], [1, "font-mono", "text-emerald-700", "dark:text-emerald-400"], [1, "text-xs", "font-bold", "text-emerald-700", "dark:text-emerald-400", "block", "mt-1"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "font-mono"], ["type", "button", 1, "mt-1", "w-full", "py-2", "px-3", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "disabled:opacity-50", "disabled:cursor-not-allowed", "rounded-lg", "shadow-xs", "transition-colors", 3, "click", "disabled"], [1, "font-mono", "font-bold"]], template: function JobDetailModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵconditionalCreate(1, JobDetailModal_Conditional_1_Template, 60, 26, "div", 1);
        } if (rf & 2) {
            const j_r15 = i0.ɵɵstoreLet(ctx.currentJob());
            i0.ɵɵadvance();
            i0.ɵɵconditional(j_r15 ? 1 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, ClockWidget, PhotoUploader, SignaturePad], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JobDetailModal, [{
        type: Component,
        args: [{
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

            <button 
              type="button"
              (click)="activeTab.set('bonus')"
              [class]="activeTab() === 'bonus' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold' : 'hover:text-slate-800 dark:hover:text-slate-200'"
              class="py-3 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <mat-icon class="!text-sm">military_tech</mat-icon>
              <span>Bonus & Finance</span>
            </button>
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
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs"
                            [class]="j.assignedInstallerId ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700'">
                            {{ j.assignedInstallerName ? j.assignedInstallerName.charAt(0) : '?' }}
                          </div>
                          <div>
                            <p class="text-xs font-bold text-slate-900 dark:text-white">
                              {{ j.assignedInstallerName || 'Pending Assignment' }}
                            </p>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400">Scheduled: <span class="font-mono">{{ j.scheduledDate }}</span> ({{ j.estimatedHours }}h allocated)</p>
                          </div>
                        </div>
                      </div>

                      <!-- Operations Manager: Dropdown list of installers to assign/re-assign -->
                      @if (store.currentRole() === 'manager') {
                        <div class="pt-2.5 border-t border-slate-200/70 dark:border-slate-700/70 space-y-1.5">
                          <label for="detailInstallerDropdown" class="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Assign Installer from Dropdown:
                          </label>
                          <div class="flex items-center gap-2">
                            <select 
                              id="detailInstallerDropdown"
                              #installerSelect
                              class="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium flex-1 cursor-pointer"
                            >
                              <option value="">-- Choose Installer from List --</option>
                              @for (tech of store.installers(); track tech.id) {
                                <option [value]="tech.id" [selected]="tech.id === j.assignedInstallerId">
                                  {{ tech.name }} (★{{ tech.metrics.avgRating }}) · {{ tech.availabilityStatus || 'available' }} {{ tech.isSignedIn ? '· Signed In' : '· Offline' }}
                                </option>
                              }
                            </select>
                            <button 
                              type="button"
                              (click)="assignInstallerFromDetail(installerSelect.value)"
                              [disabled]="!installerSelect.value || installerSelect.value === j.assignedInstallerId"
                              class="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                            >
                              <mat-icon class="!text-xs">handyman</mat-icon>
                              <span>{{ j.assignedInstallerId ? 'Re-assign' : 'Assign Installer' }}</span>
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

            @if (activeTab() === 'bonus') {
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
            }]
    }], null, { jobId: [{ type: i0.Input, args: [{ isSignal: true, alias: "jobId", required: true }] }], closed: [{ type: i0.Output, args: ["closed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(JobDetailModal, { className: "JobDetailModal", filePath: "frontend/src/app/components/job-detail-modal/job-detail-modal.ts", lineNumber: 495 }); })();
