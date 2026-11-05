import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.jobId;
function InstallerMapView_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 4);
    i0.ɵɵtext(1, "place");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 5);
    i0.ɵɵtext(1, "turn_right");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 5);
    i0.ɵɵtext(1, "turn_left");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 5);
    i0.ɵɵtext(1, "flag");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 5);
    i0.ɵɵtext(1, "straight");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵelement(1, "span", 115);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "DESTINATION REACHED \u00B7 ON SITE");
    i0.ɵɵelementEnd()();
} }
function InstallerMapView_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("NEXT MANEUVER \u00B7 ", ctx_r0.currentStep().distanceText);
} }
function InstallerMapView_Conditional_119_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 71);
    i0.ɵɵelement(1, "line", 116)(2, "line", 117)(3, "line", 118)(4, "line", 119)(5, "line", 120);
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_130_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 80);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("cx", ctx_r0.vehiclePos().x)("cy", ctx_r0.vehiclePos().y);
} }
function InstallerMapView_Conditional_131_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g");
    i0.ɵɵelement(1, "circle", 121)(2, "circle", 122);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("transform", "translate(" + ctx_r0.targetSite().x + "," + ctx_r0.targetSite().y + ")");
} }
function InstallerMapView_For_133_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 124)(1, "circle", 125);
    i0.ɵɵelementStart(2, "text", 126);
    i0.ɵɵtext(3, "\u2605");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "g", 127);
    i0.ɵɵelement(5, "rect", 128);
    i0.ɵɵelementStart(6, "text", 129);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "text", 130);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const site_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("TARGET: ", site_r3.job.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.truncateText(site_r3.job.client.name, 18));
} }
function InstallerMapView_For_133_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 131);
    i0.ɵɵelementStart(1, "text", 132);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "g", 133);
    i0.ɵɵelement(4, "rect", 134);
    i0.ɵɵelementStart(5, "text", 135);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const site_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("fill", ctx_r0.getPinColor(site_r3.job.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", site_r3.job.id.slice(-2), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.truncateText(site_r3.job.client.name, 14), " ");
} }
function InstallerMapView_For_133_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 123);
    i0.ɵɵlistener("click", function InstallerMapView_For_133_Template_g_click_0_listener() { const site_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.selectJob(site_r3.job)); });
    i0.ɵɵconditionalCreate(1, InstallerMapView_For_133_Conditional_1_Template, 10, 2)(2, InstallerMapView_For_133_Conditional_2_Template, 7, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const site_r3 = ctx.$implicit;
    i0.ɵɵattribute("transform", "translate(" + site_r3.x + "," + site_r3.y + ")");
    i0.ɵɵadvance();
    i0.ɵɵconditional(site_r3.isDestination ? 1 : 2);
} }
function InstallerMapView_Conditional_145_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 142);
    i0.ɵɵlistener("click", function InstallerMapView_Conditional_145_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.triggerClockIn()); });
    i0.ɵɵelementStart(1, "mat-icon", 14);
    i0.ɵɵtext(2, "timer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Clock In Now");
    i0.ɵɵelementEnd()();
} }
function InstallerMapView_Conditional_145_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91)(1, "div", 136)(2, "div", 137)(3, "mat-icon", 138);
    i0.ɵɵtext(4, "check_circle");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div")(6, "p", 139);
    i0.ɵɵtext(7, "Geofence Confirmed (\u00B18m)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 140);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(10, InstallerMapView_Conditional_145_Conditional_10_Template, 5, 0, "button", 141);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("You are within site boundary of ", (tmp_1_0 = ctx_r0.targetJob()) == null ? null : tmp_1_0.client == null ? null : tmp_1_0.client.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_2_0 = ctx_r0.targetJob()) == null ? null : tmp_2_0.status) === "assigned" || ((tmp_2_0 = ctx_r0.targetJob()) == null ? null : tmp_2_0.status) === "accepted" || ((tmp_2_0 = ctx_r0.targetJob()) == null ? null : tmp_2_0.status) === "dispatched" ? 10 : -1);
} }
function InstallerMapView_Conditional_156_For_13_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 153);
    i0.ɵɵtext(1, "turn_right");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_156_For_13_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 153);
    i0.ɵɵtext(1, "turn_left");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_156_For_13_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 154);
    i0.ɵɵtext(1, "place");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_156_For_13_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 155);
    i0.ɵɵtext(1, "straight");
    i0.ɵɵelementEnd();
} }
function InstallerMapView_Conditional_156_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 151)(1, "div", 152);
    i0.ɵɵconditionalCreate(2, InstallerMapView_Conditional_156_For_13_Conditional_2_Template, 2, 0, "mat-icon", 153)(3, InstallerMapView_Conditional_156_For_13_Conditional_3_Template, 2, 0, "mat-icon", 153)(4, InstallerMapView_Conditional_156_For_13_Conditional_4_Template, 2, 0, "mat-icon", 154)(5, InstallerMapView_Conditional_156_For_13_Conditional_5_Template, 2, 0, "mat-icon", 155);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 156)(7, "p", 157);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 158);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const step_r6 = ctx.$implicit;
    const $index_r7 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r0.currentStepIndex() === $index_r7 ? "bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 text-slate-900 dark:text-white font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(step_r6.maneuver === "turn-right" ? 2 : step_r6.maneuver === "turn-left" ? 3 : step_r6.maneuver === "arrive" ? 4 : 5);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("text-slate-900", ctx_r0.currentStepIndex() === $index_r7)("dark:text-white", ctx_r0.currentStepIndex() === $index_r7);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", step_r6.instruction, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", step_r6.distanceText, " \u00B7 ~", step_r6.speedMph, " mph");
} }
function InstallerMapView_Conditional_156_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97)(1, "div")(2, "div", 143)(3, "div", 6)(4, "mat-icon", 144);
    i0.ɵɵtext(5, "directions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h4", 145);
    i0.ɵɵtext(7, "Route Directions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 146);
    i0.ɵɵlistener("click", function InstallerMapView_Conditional_156_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showTurnList.set(false)); });
    i0.ɵɵelementStart(9, "mat-icon", 147);
    i0.ɵɵtext(10, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 148);
    i0.ɵɵrepeaterCreate(12, InstallerMapView_Conditional_156_For_13_Template, 11, 10, "div", 149, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 150);
    i0.ɵɵtext(15, " GPS Navigation powered by DoorMaster Fleet Radar ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r0.waypoints());
} }
function InstallerMapView_Conditional_160_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 159);
    i0.ɵɵlistener("click", function InstallerMapView_Conditional_160_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.startSimulation()); });
    i0.ɵɵelementStart(1, "mat-icon", 27);
    i0.ɵɵtext(2, "play_arrow");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.progress() > 0 && ctx_r0.progress() < 100 ? "Resume Route" : "Drive Route");
} }
function InstallerMapView_Conditional_161_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 160);
    i0.ɵɵlistener("click", function InstallerMapView_Conditional_161_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.pauseSimulation()); });
    i0.ɵɵelementStart(1, "mat-icon", 27);
    i0.ɵɵtext(2, "pause");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pause Drive");
    i0.ɵɵelementEnd()();
} }
function InstallerMapView_Conditional_190_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 170)(1, "strong", 174);
    i0.ɵɵtext(2, "Access Notes:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (tmp_2_0 = ctx_r0.targetJob()) == null ? null : tmp_2_0.client == null ? null : tmp_2_0.client.accessInstructions, " ");
} }
function InstallerMapView_Conditional_190_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 114)(1, "div", 161)(2, "div", 143)(3, "div", 6)(4, "mat-icon", 162);
    i0.ɵɵtext(5, "phone_in_talk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h4", 163);
    i0.ɵɵtext(7, "Client Site Contact");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 164);
    i0.ɵɵlistener("click", function InstallerMapView_Conditional_190_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showContactCard.set(false)); });
    i0.ɵɵelementStart(9, "mat-icon", 147);
    i0.ɵɵtext(10, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 165)(12, "div")(13, "span", 166);
    i0.ɵɵtext(14, "Client Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 167);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "span", 166);
    i0.ɵɵtext(19, "Direct Site Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 168);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "span", 166);
    i0.ɵɵtext(24, "Site Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 169);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(27, InstallerMapView_Conditional_190_Conditional_27_Template, 4, 1, "div", 170);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 171)(29, "a", 172)(30, "mat-icon", 14);
    i0.ɵɵtext(31, "call");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Call Phone Directly");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "button", 173);
    i0.ɵɵlistener("click", function InstallerMapView_Conditional_190_Template_button_click_34_listener() { let tmp_2_0; i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.copyPhoneToClipboard(((tmp_2_0 = ctx_r0.targetJob()) == null ? null : tmp_2_0.client == null ? null : tmp_2_0.client.phone) || "")); });
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵtextInterpolate((tmp_1_0 = ctx_r0.targetJob()) == null ? null : tmp_1_0.client == null ? null : tmp_1_0.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_2_0 = ctx_r0.targetJob()) == null ? null : tmp_2_0.client == null ? null : tmp_2_0.client.phone);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_3_0 = ctx_r0.targetJob()) == null ? null : tmp_3_0.client == null ? null : tmp_3_0.client.siteAddress);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_4_0 = ctx_r0.targetJob()) == null ? null : tmp_4_0.client == null ? null : tmp_4_0.client.accessInstructions) ? 27 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", "tel:" + ((tmp_5_0 = ctx_r0.targetJob()) == null ? null : tmp_5_0.client == null ? null : tmp_5_0.client.phone), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.copiedPhone() ? "Copied \u2713" : "Copy", " ");
} }
export class InstallerMapView {
    store = inject(InstallationStore);
    themeStore = inject(ThemeStore);
    // Inputs
    activeJob = input(null, ...(ngDevMode ? [{ debugName: "activeJob" }] : /* istanbul ignore next */ []));
    installerJobs = input([], ...(ngDevMode ? [{ debugName: "installerJobs" }] : /* istanbul ignore next */ []));
    technicianName = input('Technician', ...(ngDevMode ? [{ debugName: "technicianName" }] : /* istanbul ignore next */ []));
    technicianId = input('inst_01', ...(ngDevMode ? [{ debugName: "technicianId" }] : /* istanbul ignore next */ []));
    // Outputs
    jobSelected = output();
    clockInTriggered = output();
    // Component UI State
    showTurnList = signal(false, ...(ngDevMode ? [{ debugName: "showTurnList" }] : /* istanbul ignore next */ []));
    showContactCard = signal(false, ...(ngDevMode ? [{ debugName: "showContactCard" }] : /* istanbul ignore next */ []));
    showTraffic = signal(true, ...(ngDevMode ? [{ debugName: "showTraffic" }] : /* istanbul ignore next */ []));
    copiedPhone = signal(false, ...(ngDevMode ? [{ debugName: "copiedPhone" }] : /* istanbul ignore next */ []));
    mapTheme = signal('dark', ...(ngDevMode ? [{ debugName: "mapTheme" }] : /* istanbul ignore next */ []));
    // Simulation State
    progress = signal(20, ...(ngDevMode ? [{ debugName: "progress" }] : /* istanbul ignore next */ [])); // 0 to 100%
    isSimulating = signal(false, ...(ngDevMode ? [{ debugName: "isSimulating" }] : /* istanbul ignore next */ []));
    simSpeed = signal(1, ...(ngDevMode ? [{ debugName: "simSpeed" }] : /* istanbul ignore next */ [])); // 1x, 2x, 4x
    simInterval = null;
    // Selected Target Job (defaults to active job or first assigned job)
    targetJobOverride = signal(null, ...(ngDevMode ? [{ debugName: "targetJobOverride" }] : /* istanbul ignore next */ []));
    targetJob = computed(() => {
        return this.targetJobOverride() || this.activeJob() || (this.installerJobs().length > 0 ? this.installerJobs()[0] : null);
    }, ...(ngDevMode ? [{ debugName: "targetJob" }] : /* istanbul ignore next */ []));
    // Total journey distance in miles
    totalDistanceMi = 3.6;
    totalEstMinutes = 14;
    // Pre-calculated Waypoints from Workshop (120, 320) to Destination Site
    waypoints = computed(() => {
        const job = this.targetJob();
        const dest = this.getJobCoordinates(job);
        // Dynamic waypoints navigating along city grid
        return [
            {
                x: 120,
                y: 320,
                instruction: 'Start at DoorMaster Atelier on Central Expressway 101',
                distanceText: '0.4 mi',
                speedMph: 28,
                maneuver: 'start'
            },
            {
                x: 320,
                y: 320,
                instruction: 'In 400 ft, Turn Left onto Northbound Broadway Way',
                distanceText: '0.8 mi',
                speedMph: 35,
                maneuver: 'turn-left'
            },
            {
                x: 320,
                y: 160,
                instruction: 'Turn Right onto Grandview Avenue toward Highview',
                distanceText: '1.2 mi',
                speedMph: 32,
                maneuver: 'turn-right'
            },
            {
                x: 480,
                y: 160,
                instruction: 'Continue straight through Belmont Ridge intersection',
                distanceText: '0.8 mi',
                speedMph: 30,
                maneuver: 'straight'
            },
            {
                x: dest.x,
                y: dest.y,
                instruction: `Arrive at site: ${job?.client?.siteAddress || 'Destination'} on the right`,
                distanceText: '0.4 mi',
                speedMph: 15,
                maneuver: 'arrive'
            }
        ];
    }, ...(ngDevMode ? [{ debugName: "waypoints" }] : /* istanbul ignore next */ []));
    // All Mapped Sites for current technician + other active jobs
    allMappedSites = computed(() => {
        const list = this.store.jobs();
        const target = this.targetJob();
        return list.map(job => {
            const coords = this.getJobCoordinates(job);
            return {
                jobId: job.id,
                job,
                x: coords.x,
                y: coords.y,
                isDestination: target ? target.id === job.id : false
            };
        });
    }, ...(ngDevMode ? [{ debugName: "allMappedSites" }] : /* istanbul ignore next */ []));
    targetSite = computed(() => {
        const target = this.targetJob();
        if (!target)
            return null;
        return this.getJobCoordinates(target);
    }, ...(ngDevMode ? [{ debugName: "targetSite" }] : /* istanbul ignore next */ []));
    // Current Vehicle Position along polyline (calculated from progress percentage)
    vehiclePos = computed(() => {
        const wp = this.waypoints();
        const p = Math.max(0, Math.min(100, this.progress())) / 100;
        if (wp.length < 2)
            return { x: 120, y: 320 };
        // Find segment based on percentage
        const segmentCount = wp.length - 1;
        const scaled = p * segmentCount;
        const segIdx = Math.min(segmentCount - 1, Math.floor(scaled));
        const localP = scaled - segIdx;
        const p1 = wp[segIdx];
        const p2 = wp[segIdx + 1];
        return {
            x: p1.x + (p2.x - p1.x) * localP,
            y: p1.y + (p2.y - p1.y) * localP
        };
    }, ...(ngDevMode ? [{ debugName: "vehiclePos" }] : /* istanbul ignore next */ []));
    // Current Vehicle Heading / Angle in degrees
    vehicleAngle = computed(() => {
        const wp = this.waypoints();
        const p = Math.max(0, Math.min(100, this.progress())) / 100;
        const segmentCount = wp.length - 1;
        const scaled = p * segmentCount;
        const segIdx = Math.min(segmentCount - 1, Math.floor(scaled));
        const p1 = wp[segIdx];
        const p2 = wp[segIdx + 1];
        if (!p1 || !p2)
            return 0;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.round(Math.atan2(dy, dx) * (180 / Math.PI));
    }, ...(ngDevMode ? [{ debugName: "vehicleAngle" }] : /* istanbul ignore next */ []));
    // Current Step Index
    currentStepIndex = computed(() => {
        const wp = this.waypoints();
        const p = Math.max(0, Math.min(100, this.progress())) / 100;
        const segmentCount = wp.length - 1;
        return Math.min(segmentCount, Math.floor(p * segmentCount));
    }, ...(ngDevMode ? [{ debugName: "currentStepIndex" }] : /* istanbul ignore next */ []));
    currentStep = computed(() => {
        const wp = this.waypoints();
        const idx = this.currentStepIndex();
        return wp[idx] || wp[0];
    }, ...(ngDevMode ? [{ debugName: "currentStep" }] : /* istanbul ignore next */ []));
    // Live Metrics
    isArrived = computed(() => {
        return this.progress() >= 96;
    }, ...(ngDevMode ? [{ debugName: "isArrived" }] : /* istanbul ignore next */ []));
    inGeofence = computed(() => {
        return this.progress() >= 92;
    }, ...(ngDevMode ? [{ debugName: "inGeofence" }] : /* istanbul ignore next */ []));
    remainingMiles = computed(() => {
        const p = this.progress() / 100;
        const remaining = Math.max(0, this.totalDistanceMi * (1 - p));
        return remaining.toFixed(1);
    }, ...(ngDevMode ? [{ debugName: "remainingMiles" }] : /* istanbul ignore next */ []));
    etaMinutes = computed(() => {
        const p = this.progress() / 100;
        return Math.max(1, Math.ceil(this.totalEstMinutes * (1 - p)));
    }, ...(ngDevMode ? [{ debugName: "etaMinutes" }] : /* istanbul ignore next */ []));
    etaTime = computed(() => {
        const date = new Date(Date.now() + this.etaMinutes() * 60 * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, ...(ngDevMode ? [{ debugName: "etaTime" }] : /* istanbul ignore next */ []));
    currentSpeed = computed(() => {
        if (this.isArrived())
            return 0;
        const step = this.currentStep();
        return step ? Math.round(step.speedMph * (this.simSpeed() === 1 ? 1 : 1.15)) : 30;
    }, ...(ngDevMode ? [{ debugName: "currentSpeed" }] : /* istanbul ignore next */ []));
    trafficLevel = signal('smooth', ...(ngDevMode ? [{ debugName: "trafficLevel" }] : /* istanbul ignore next */ []));
    // SVG Paths
    routeSvgPath = computed(() => {
        const wp = this.waypoints();
        if (wp.length === 0)
            return '';
        return wp.reduce((path, pt, idx) => {
            return idx === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`;
        }, '');
    }, ...(ngDevMode ? [{ debugName: "routeSvgPath" }] : /* istanbul ignore next */ []));
    completedRouteSvgPath = computed(() => {
        const wp = this.waypoints();
        const cur = this.vehiclePos();
        const idx = this.currentStepIndex();
        if (wp.length === 0)
            return '';
        let path = `M ${wp[0].x} ${wp[0].y}`;
        for (let i = 1; i <= idx; i++) {
            path += ` L ${wp[i].x} ${wp[i].y}`;
        }
        path += ` L ${cur.x} ${cur.y}`;
        return path;
    }, ...(ngDevMode ? [{ debugName: "completedRouteSvgPath" }] : /* istanbul ignore next */ []));
    Math = Math;
    constructor() {
        // When activeJob changes from parent, adjust targetJobOverride
        effect(() => {
            const active = this.activeJob();
            if (active) {
                this.targetJobOverride.set(active);
                // If job is already on site or completed, advance progress to 100
                if (active.status === 'on_site' || active.status === 'completed' || active.status === 'installed_pending_signoff') {
                    this.progress.set(100);
                }
                else if (active.status === 'dispatched') {
                    this.progress.set(45);
                }
                else {
                    this.progress.set(15);
                }
            }
        });
    }
    ngOnDestroy() {
        this.stopSimInterval();
    }
    // --- Simulation Actions ---
    startSimulation() {
        this.isSimulating.set(true);
        this.stopSimInterval();
        // If at end, loop to start
        if (this.progress() >= 99) {
            this.progress.set(0);
        }
        this.simInterval = setInterval(() => {
            const current = this.progress();
            const increment = 0.5 * this.simSpeed();
            const next = current + increment;
            if (next >= 100) {
                this.progress.set(100);
                this.pauseSimulation();
                this.playArrivalChime();
            }
            else {
                this.progress.set(next);
                // Randomly simulate minor traffic variation
                if (Math.random() < 0.05) {
                    this.trafficLevel.set(this.trafficLevel() === 'smooth' ? 'moderate' : 'smooth');
                }
            }
        }, 100);
    }
    pauseSimulation() {
        this.isSimulating.set(false);
        this.stopSimInterval();
    }
    resetSimulation() {
        this.pauseSimulation();
        this.progress.set(0);
    }
    setSpeed(speed) {
        this.simSpeed.set(speed);
    }
    instantArrive() {
        this.progress.set(100);
        this.pauseSimulation();
        this.playArrivalChime();
    }
    onProgressScrub(event) {
        const val = parseFloat(event.target.value);
        this.progress.set(val);
        if (val >= 98) {
            this.playArrivalChime();
        }
    }
    selectJob(job) {
        this.targetJobOverride.set(job);
        this.jobSelected.emit(job.id);
        if (job.status === 'on_site' || job.status === 'completed') {
            this.progress.set(100);
        }
        else {
            this.progress.set(25);
        }
    }
    triggerClockIn() {
        const job = this.targetJob();
        if (!job)
            return;
        const coords = this.getJobCoordinates(job);
        this.clockInTriggered.emit({
            jobId: job.id,
            lat: 37.7749 + (coords.y - 250) * 0.0001,
            lng: -122.4194 + (coords.x - 500) * 0.0001
        });
    }
    recenterVehicle() {
        // Reset view highlight
        this.progress.update(p => p);
    }
    cycleMapTheme() {
        const current = this.mapTheme();
        if (current === 'dark')
            this.mapTheme.set('satellite');
        else if (current === 'satellite')
            this.mapTheme.set('daylight');
        else
            this.mapTheme.set('dark');
    }
    mapThemeClass() {
        const isLightMode = !this.themeStore.isDark();
        switch (this.mapTheme()) {
            case 'satellite': return 'bg-[#0F172A] border-slate-700';
            case 'daylight': return isLightMode ? 'bg-[#E2E8F0] border-slate-300' : 'bg-[#1E293B] border-slate-600';
            default: return isLightMode ? 'bg-[#F8FAFC] border-slate-200' : 'bg-[#0B0F19] border-slate-800';
        }
    }
    copyPhoneToClipboard(phone) {
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(phone);
            this.copiedPhone.set(true);
            setTimeout(() => this.copiedPhone.set(false), 2000);
        }
    }
    truncateText(text, maxLen) {
        if (!text)
            return '';
        return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
    }
    getPinColor(status) {
        switch (status) {
            case 'on_site': return '#059669'; // emerald
            case 'dispatched': return '#0891B2'; // cyan
            case 'accepted': return '#6366F1'; // indigo
            case 'assigned': return '#D97706'; // amber
            case 'installed_pending_signoff': return '#9333EA'; // purple
            case 'completed': return '#475569'; // slate
            default: return '#64748B';
        }
    }
    getJobCoordinates(job) {
        if (!job)
            return { x: 540, y: 140 };
        // Deterministic map coordinates based on Job ID / site
        switch (job.id) {
            case 'DM-2026-101': return { x: 540, y: 140 };
            case 'DM-2026-102': return { x: 780, y: 260 };
            case 'DM-2026-103': return { x: 880, y: 110 };
            case 'DM-2026-104': return { x: 320, y: 220 };
            case 'DM-2026-105': return { x: 680, y: 380 };
            default: {
                // Hash code to coordinate
                let hash = 0;
                for (let i = 0; i < job.id.length; i++) {
                    hash = (hash << 5) - hash + job.id.charCodeAt(i);
                    hash |= 0;
                }
                const x = 200 + Math.abs(hash % 700);
                const y = 80 + Math.abs((hash >> 3) % 360);
                return { x, y };
            }
        }
    }
    playArrivalChime() {
        try {
            if (typeof window !== 'undefined') {
                const audioWindow = window;
                const AudioContextClass = audioWindow.AudioContext || audioWindow.webkitAudioContext;
                if (!AudioContextClass)
                    return;
                const ctx = new AudioContextClass();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
                osc.start();
                osc.stop(ctx.currentTime + 0.45);
            }
        }
        catch {
            // Audio not permitted without user gesture, graceful fallback
        }
    }
    stopSimInterval() {
        if (this.simInterval) {
            clearInterval(this.simInterval);
            this.simInterval = null;
        }
    }
    static ɵfac = function InstallerMapView_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InstallerMapView)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InstallerMapView, selectors: [["app-installer-map-view"]], inputs: { activeJob: [1, "activeJob"], installerJobs: [1, "installerJobs"], technicianName: [1, "technicianName"], technicianId: [1, "technicianId"] }, outputs: { jobSelected: "jobSelected", clockInTriggered: "clockInTriggered" }, decls: 191, vars: 48, consts: [[1, "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "overflow-hidden", "shadow-xl", "dark:shadow-2xl", "text-slate-900", "dark:text-white", "relative", "isolate", "z-0", "transition-colors", "duration-200"], [1, "bg-slate-50/95", "dark:bg-slate-900/95", "backdrop-blur-md", "border-b", "border-slate-200", "dark:border-slate-800", "p-4", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-4", "select-none", "relative", "z-10"], [1, "flex", "items-center", "gap-3.5"], [1, "w-12", "h-12", "rounded-2xl", "flex", "items-center", "justify-center", "shrink-0", "border", "shadow-md", "transition-colors"], [1, "!text-2xl", "animate-bounce"], [1, "!text-2xl"], [1, "flex", "items-center", "gap-2"], [1, "text-[10px]", "font-mono", "uppercase", "font-bold", "tracking-widest", "text-indigo-600", "dark:text-indigo-400"], [1, "text-emerald-600", "dark:text-emerald-400", "flex", "items-center", "gap-1", "font-bold"], [1, "text-slate-300", "dark:text-slate-600"], [1, "text-[11px]", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "text-base", "sm:text-lg", "font-black", "text-slate-900", "dark:text-white", "tracking-tight", "leading-snug"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono", "flex", "items-center", "gap-2", "mt-0.5"], [1, "flex", "items-center", "gap-1", "text-emerald-600", "dark:text-emerald-400"], [1, "!text-xs"], [1, "text-slate-700", "dark:text-slate-300"], [1, "flex", "items-center", "gap-4", "bg-white", "dark:bg-slate-950/80", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-center", "sm:text-left"], [1, "block", "text-[9px]", "uppercase", "font-mono", "font-bold", "text-slate-500", "dark:text-slate-400"], [1, "text-lg", "sm:text-xl", "font-black", "font-mono", "text-emerald-600", "dark:text-emerald-400", "tabular-nums"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "h-8", "w-px", "bg-slate-200", "dark:bg-slate-800"], [1, "text-lg", "sm:text-xl", "font-black", "font-mono", "text-slate-900", "dark:text-white", "tabular-nums"], [1, "text-lg", "sm:text-xl", "font-black", "font-mono", "text-cyan-600", "dark:text-cyan-400", "tabular-nums"], [1, "text-xs", "text-slate-500", "font-normal"], [1, "text-[10px]", "font-mono"], ["type", "button", "title", "Toggle Turn-by-Turn Waypoint List", 1, "px-3", "py-1.5", "text-xs", "font-mono", "font-bold", "rounded-xl", "border", "transition-colors", "flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], [1, "hidden", "sm:inline"], ["type", "button", "title", "Contact Client on Site", 1, "px-3", "py-1.5", "text-xs", "font-mono", "font-bold", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", 3, "click"], [1, "relative", "h-[420px]", "sm:h-[480px]", "w-full", "select-none", "overflow-hidden"], ["viewBox", "0 0 1000 500", "preserveAspectRatio", "xMidYMid meet", "xmlns", "http://www.w3.org/2000/svg", 1, "w-full", "h-full", "cursor-grab", "active:cursor-grabbing"], ["id", "urbanGrid", "width", "50", "height", "50", "patternUnits", "userSpaceOnUse"], ["d", "M 50 0 L 0 0 0 50", "fill", "none", "stroke", "rgba(255, 255, 255, 0.03)", "stroke-width", "1"], ["id", "uberRouteGrad", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "100%"], ["offset", "0%", "stop-color", "#10B981"], ["offset", "40%", "stop-color", "#06B6D4"], ["offset", "80%", "stop-color", "#6366F1"], ["offset", "100%", "stop-color", "#8B5CF6"], ["id", "completedRouteGrad", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "100%"], ["offset", "0%", "stop-color", "#059669"], ["offset", "100%", "stop-color", "#0284C7"], ["id", "glowEffect", "x", "-20%", "y", "-20%", "width", "140%", "height", "140%"], ["stdDeviation", "3", "result", "blur"], ["in", "SourceGraphic", "in2", "blur", "operator", "over"], ["width", "1000", "height", "500", "fill", "url(#urbanGrid)"], ["d", "M -50 200 C 180 140, 360 260, 600 210 S 880 270, 1050 220", "fill", "none", "stroke", "rgba(14, 165, 233, 0.22)", "stroke-width", "36", "stroke-linecap", "round"], ["x", "380", "y", "242", "fill", "rgba(14, 165, 233, 0.45)", "font-size", "9", "font-family", "monospace", "font-weight", "bold", "letter-spacing", "3"], ["x", "70", "y", "60", "width", "130", "height", "90", "rx", "12", "fill", "rgba(16, 185, 129, 0.06)", "stroke", "rgba(16, 185, 129, 0.14)", "stroke-width", "1"], ["x", "90", "y", "110", "fill", "rgba(16, 185, 129, 0.5)", "font-size", "9", "font-family", "monospace"], ["x", "720", "y", "320", "width", "150", "height", "90", "rx", "12", "fill", "rgba(99, 102, 241, 0.05)", "stroke", "rgba(99, 102, 241, 0.12)", "stroke-width", "1"], ["x", "740", "y", "370", "fill", "rgba(99, 102, 241, 0.5)", "font-size", "9", "font-family", "monospace"], ["stroke", "rgba(255, 255, 255, 0.07)", "stroke-width", "6"], ["x1", "0", "y1", "90", "x2", "1000", "y2", "90"], ["x1", "0", "y1", "160", "x2", "1000", "y2", "160"], ["x1", "0", "y1", "280", "x2", "1000", "y2", "280"], ["x1", "0", "y1", "360", "x2", "1000", "y2", "360"], ["x1", "0", "y1", "440", "x2", "1000", "y2", "440"], ["x1", "160", "y1", "0", "x2", "160", "y2", "500"], ["x1", "320", "y1", "0", "x2", "320", "y2", "500"], ["x1", "480", "y1", "0", "x2", "480", "y2", "500"], ["x1", "640", "y1", "0", "x2", "640", "y2", "500"], ["x1", "800", "y1", "0", "x2", "800", "y2", "500"], ["stroke", "rgba(255, 255, 255, 0.12)", "stroke-width", "12", "stroke-linecap", "round"], ["x1", "0", "y1", "320", "x2", "1000", "y2", "320"], ["fill", "rgba(255, 255, 255, 0.28)", "font-size", "8", "font-family", "monospace"], ["x", "30", "y", "312"], ["x", "330", "y", "80"], ["x", "490", "y", "80"], ["x", "650", "y", "272"], ["x", "810", "y", "152"], ["stroke-width", "3", "stroke-linecap", "round", "stroke-dasharray", "6,4"], ["transform", "translate(120, 320)", 1, "cursor-pointer"], ["r", "18", "fill", "#0369A1", "stroke", "#38BDF8", "stroke-width", "2"], ["x", "0", "y", "4", "fill", "#FFFFFF", "font-size", "8", "font-family", "monospace", "font-weight", "bold", "text-anchor", "middle"], ["x", "22", "y", "-10", "width", "130", "height", "20", "rx", "6", "fill", "rgba(15, 23, 42, 0.85)", "stroke", "rgba(56, 189, 248, 0.4)", "stroke-width", "1"], ["x", "28", "y", "4", "fill", "#BAE6FD", "font-size", "8", "font-family", "monospace", "font-weight", "bold"], ["fill", "none", "stroke", "#1E293B", "stroke-width", "10", "stroke-linecap", "round", "stroke-linejoin", "round"], ["fill", "none", "stroke", "url(#uberRouteGrad)", "stroke-width", "5", "stroke-linecap", "round", "stroke-linejoin", "round", "filter", "url(#glowEffect)"], ["fill", "none", "stroke", "url(#completedRouteGrad)", "stroke-width", "5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["r", "22", "fill", "rgba(99, 102, 241, 0.25)", 1, "animate-ping"], [1, "cursor-pointer", "group"], [1, "transition-transform", "duration-300", "ease-out"], ["r", "18", "fill", "rgba(99, 102, 241, 0.3)", 1, "animate-pulse"], ["x", "-10", "y", "-7", "width", "20", "height", "14", "rx", "4", "fill", "rgba(0, 0, 0, 0.6)", "filter", "url(#glowEffect)"], ["x", "-9", "y", "-6", "width", "18", "height", "12", "rx", "3.5", "fill", "#1E293B", "stroke", "#6366F1", "stroke-width", "1.5"], ["x", "-2", "y", "-4", "width", "7", "height", "8", "rx", "1.5", "fill", "#38BDF8", "opacity", "0.9"], ["points", "9,-3 20,-7 20,7 9,3", "fill", "rgba(253, 224, 71, 0.25)"], ["cx", "0", "cy", "0", "r", "2.5", "fill", "#F43F5E"], ["x", "-45", "y", "-10", "width", "90", "height", "18", "rx", "6", "fill", "#0F172A", "stroke", "#6366F1", "stroke-width", "1"], ["x", "0", "y", "2", "fill", "#FFFFFF", "font-size", "7.5", "font-family", "monospace", "font-weight", "bold", "text-anchor", "middle"], [1, "absolute", "top-4", "left-4", "right-4", "sm:left-auto", "sm:right-4", "sm:max-w-md", "bg-emerald-950/95", "backdrop-blur-md", "border", "border-emerald-500", "p-3.5", "rounded-2xl", "shadow-2xl", "text-white", "flex", "items-center", "justify-between", "gap-3", "animate-in", "fade-in", "slide-in-from-top-4", "z-10"], [1, "absolute", "bottom-4", "right-4", "flex", "flex-col", "gap-2", "z-10"], ["type", "button", "title", "Recenter on Service Van", 1, "w-9", "h-9", "rounded-xl", "bg-slate-900/90", "hover:bg-slate-800", "text-slate-300", "hover:text-white", "border", "border-slate-700", "flex", "items-center", "justify-center", "shadow-lg", "transition-colors", 3, "click"], [1, "!text-base"], ["type", "button", "title", "Toggle Live Traffic Congestion Overlay", 1, "w-9", "h-9", "rounded-xl", "border", "flex", "items-center", "justify-center", "shadow-lg", "transition-colors", 3, "click"], ["type", "button", "title", "Switch Map Style (Dark / Satellite / Daylight)", 1, "w-9", "h-9", "rounded-xl", "bg-slate-900/90", "hover:bg-slate-800", "text-slate-300", "hover:text-white", "border", "border-slate-700", "flex", "items-center", "justify-center", "shadow-lg", "transition-colors", 3, "click"], [1, "absolute", "inset-y-0", "right-0", "w-80", "bg-white/95", "dark:bg-slate-900/95", "backdrop-blur-md", "border-l", "border-slate-200", "dark:border-slate-800", "p-4", "shadow-2xl", "z-20", "flex", "flex-col", "justify-between", "overflow-y-auto", "animate-in", "slide-in-from-right"], [1, "bg-slate-50", "dark:bg-slate-900", "p-4", "border-t", "border-slate-200", "dark:border-slate-800", "select-none", "transition-colors"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "mb-3"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "text-xs", "font-bold", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-amber-600", "hover:bg-amber-500", "text-white", "rounded-xl", "text-xs", "font-bold", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95"], ["type", "button", "title", "Reset Route to Beginning", 1, "px-2.5", "py-1.5", "bg-white", "dark:bg-slate-800", "hover:bg-slate-100", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300", "rounded-xl", "text-xs", "font-mono", "font-medium", "border", "border-slate-300", "dark:border-slate-700", "transition-colors", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], [1, "flex", "items-center", "bg-slate-200", "dark:bg-slate-950", "p-0.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-800", "text-[11px]", "font-mono"], ["type", "button", 1, "px-2", "py-1", "rounded-lg", "transition-colors", "font-bold", 3, "click"], ["type", "button", "title", "Instant Arrive at Site", 1, "px-2", "py-1", "rounded-lg", "text-emerald-700", "dark:text-emerald-400", "hover:text-emerald-600", "font-bold", 3, "click"], [1, "flex", "items-center", "gap-3"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono", "hidden", "md:inline"], [1, "text-xs", "font-mono", "font-bold", "px-2", "py-1", "rounded-lg", "border"], [1, "space-y-1"], ["type", "range", "min", "0", "max", "100", "step", "0.5", 1, "w-full", "h-2", "bg-slate-300", "dark:bg-slate-800", "rounded-lg", "appearance-none", "cursor-pointer", "accent-emerald-500", 3, "input", "value"], [1, "flex", "justify-between", "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "text-slate-500", "dark:text-slate-400"], [1, "text-emerald-600", "dark:text-emerald-400", "font-bold"], [1, "fixed", "inset-0", "z-50", "bg-slate-950/70", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "dark:bg-emerald-400", "animate-ping"], ["x1", "20", "y1", "316", "x2", "300", "y2", "316", "stroke", "#10B981", "opacity", "0.8"], ["x1", "324", "y1", "20", "x2", "324", "y2", "280", "stroke", "#10B981", "opacity", "0.8"], ["x1", "340", "y1", "316", "x2", "460", "y2", "316", "stroke", "#F59E0B", "opacity", "0.9"], ["x1", "484", "y1", "80", "x2", "484", "y2", "200", "stroke", "#F59E0B", "opacity", "0.9"], ["x1", "660", "y1", "316", "x2", "780", "y2", "316", "stroke", "#EF4444", "opacity", "0.8"], ["r", "45", "fill", "rgba(16, 185, 129, 0.08)", "stroke", "#10B981", "stroke-width", "1.5", "stroke-dasharray", "4,4", 1, "animate-spin", 2, "animation-duration", "24s"], ["r", "4", "fill", "#10B981"], [1, "cursor-pointer", "group", 3, "click"], ["r", "22", "fill", "rgba(16, 185, 129, 0.35)", 1, "animate-ping"], ["r", "14", "fill", "#059669", "stroke", "#FFFFFF", "stroke-width", "2.5"], ["x", "0", "y", "4", "fill", "#FFFFFF", "font-size", "8", "font-weight", "black", "text-anchor", "middle"], ["transform", "translate(18, -14)"], ["width", "140", "height", "32", "rx", "8", "fill", "rgba(15, 23, 42, 0.95)", "stroke", "#10B981", "stroke-width", "1.5"], ["x", "8", "y", "13", "fill", "#34D399", "font-size", "8", "font-family", "monospace", "font-weight", "bold"], ["x", "8", "y", "24", "fill", "#F8FAFC", "font-size", "8", "font-weight", "bold"], ["r", "11", "stroke", "#FFFFFF", "stroke-width", "1.5", 1, "transition-transform", "group-hover:scale-125"], ["x", "0", "y", "3", "fill", "#FFFFFF", "font-size", "7", "font-weight", "bold", "text-anchor", "middle"], ["transform", "translate(14, -8)", 1, "opacity-75", "group-hover:opacity-100", "transition-opacity"], ["width", "105", "height", "18", "rx", "5", "fill", "rgba(15, 23, 42, 0.9)", "stroke", "rgba(255, 255, 255, 0.2)", "stroke-width", "0.8"], ["x", "6", "y", "12", "fill", "#E2E8F0", "font-size", "7.5", "font-family", "monospace"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-xl", "bg-emerald-500", "text-slate-950", "flex", "items-center", "justify-center", "font-bold"], [1, "!text-lg"], [1, "text-xs", "font-black", "text-emerald-300", "uppercase", "tracking-wide"], [1, "text-[11px]", "text-emerald-100"], ["type", "button", 1, "px-3", "py-1.5", "bg-white", "text-emerald-950", "hover:bg-emerald-100", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "active:scale-95", "whitespace-nowrap", "flex", "items-center", "gap-1"], ["type", "button", 1, "px-3", "py-1.5", "bg-white", "text-emerald-950", "hover:bg-emerald-100", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "active:scale-95", "whitespace-nowrap", "flex", "items-center", "gap-1", 3, "click"], [1, "flex", "items-center", "justify-between", "pb-3", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "text-indigo-600", "dark:text-indigo-400", "!text-sm"], [1, "text-xs", "font-bold", "font-mono", "uppercase", "tracking-wider", "text-slate-900", "dark:text-white"], ["type", "button", 1, "text-slate-500", "hover:text-slate-900", "dark:text-slate-400", "dark:hover:text-white", 3, "click"], [1, "!text-sm"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800/80", "mt-2", "space-y-1"], [1, "py-2.5", "px-2", "rounded-lg", "text-xs", "transition-colors", "flex", "items-start", "gap-2.5", 3, "class"], [1, "pt-3", "border-t", "border-slate-200", "dark:border-slate-800", "text-[11px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "py-2.5", "px-2", "rounded-lg", "text-xs", "transition-colors", "flex", "items-start", "gap-2.5"], [1, "mt-0.5", "shrink-0", "text-slate-400"], [1, "!text-sm", "text-indigo-600", "dark:text-indigo-400"], [1, "!text-sm", "text-emerald-600", "dark:text-emerald-400"], [1, "!text-sm", "text-slate-400"], [1, "flex-1"], [1, "font-medium", "leading-tight"], [1, "text-[10px]", "font-mono", "text-slate-500", "dark:text-slate-400"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "text-xs", "font-bold", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "click"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-amber-600", "hover:bg-amber-500", "text-white", "rounded-xl", "text-xs", "font-bold", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-6", "max-w-sm", "w-full", "shadow-2xl", "text-slate-900", "dark:text-white", "space-y-4", "animate-in", "zoom-in-95"], [1, "text-emerald-600", "dark:text-emerald-400"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], ["type", "button", 1, "text-slate-400", "hover:text-slate-600", "dark:hover:text-white", 3, "click"], [1, "space-y-2", "text-xs"], [1, "text-slate-500", "dark:text-slate-400", "text-[10px]", "uppercase", "font-mono"], [1, "text-base", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-sm", "font-mono", "text-emerald-600", "dark:text-emerald-400", "font-bold"], [1, "text-xs", "text-slate-700", "dark:text-slate-300"], [1, "p-2.5", "rounded-xl", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "text-[11px]", "text-slate-700", "dark:text-slate-300"], [1, "pt-3", "border-t", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "gap-2"], [1, "flex-1", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-bold", "rounded-xl", "text-xs", "text-center", "transition-colors", "flex", "items-center", "justify-center", "gap-1.5", "shadow-sm", 3, "href"], ["type", "button", "title", "Copy phone number", 1, "px-3", "py-2", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-200", "text-xs", "font-mono", "font-semibold", "rounded-xl", "border", "border-slate-300", "dark:border-slate-700", "transition-colors", 3, "click"], [1, "text-amber-600", "dark:text-amber-400"]], template: function InstallerMapView_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵconditionalCreate(4, InstallerMapView_Conditional_4_Template, 2, 0, "mat-icon", 4)(5, InstallerMapView_Conditional_5_Template, 2, 0, "mat-icon", 5)(6, InstallerMapView_Conditional_6_Template, 2, 0, "mat-icon", 5)(7, InstallerMapView_Conditional_7_Template, 2, 0, "mat-icon", 5)(8, InstallerMapView_Conditional_8_Template, 2, 0, "mat-icon", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div")(10, "div", 6)(11, "span", 7);
            i0.ɵɵconditionalCreate(12, InstallerMapView_Conditional_12_Template, 4, 0, "span", 8)(13, InstallerMapView_Conditional_13_Template, 2, 1, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span", 9);
            i0.ɵɵtext(15, "|");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span", 10);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "h3", 11);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "p", 12)(21, "span", 13)(22, "mat-icon", 14);
            i0.ɵɵtext(23, "verified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span");
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span", 15);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "div", 16)(31, "div", 17)(32, "span", 18);
            i0.ɵɵtext(33, "Live ETA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 19);
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "span", 20);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(38, "div", 21);
            i0.ɵɵelementStart(39, "div", 17)(40, "span", 18);
            i0.ɵɵtext(41, "Remaining");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 22);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "span", 20);
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(46, "div", 21);
            i0.ɵɵelementStart(47, "div", 17)(48, "span", 18);
            i0.ɵɵtext(49, "Speed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 23);
            i0.ɵɵtext(51);
            i0.ɵɵelementStart(52, "span", 24);
            i0.ɵɵtext(53, "mph");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "span", 25);
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(56, "div", 6)(57, "button", 26);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_57_listener() { return ctx.showTurnList.set(!ctx.showTurnList()); });
            i0.ɵɵelementStart(58, "mat-icon", 27);
            i0.ɵɵtext(59, "list_alt");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "span", 28);
            i0.ɵɵtext(61, "Directions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "button", 29);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_62_listener() { return ctx.showContactCard.set(true); });
            i0.ɵɵelementStart(63, "mat-icon", 27);
            i0.ɵɵtext(64, "call");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "span", 28);
            i0.ɵɵtext(66, "Call Client");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(67, "div", 30);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(68, "svg", 31)(69, "defs")(70, "pattern", 32);
            i0.ɵɵelement(71, "path", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "linearGradient", 34);
            i0.ɵɵelement(73, "stop", 35)(74, "stop", 36)(75, "stop", 37)(76, "stop", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "linearGradient", 39);
            i0.ɵɵelement(78, "stop", 40)(79, "stop", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "filter", 42);
            i0.ɵɵelement(81, "feGaussianBlur", 43)(82, "feComposite", 44);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(83, "rect", 45)(84, "path", 46);
            i0.ɵɵelementStart(85, "text", 47);
            i0.ɵɵtext(86, "HUDSON CANAL HARBOR");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(87, "rect", 48);
            i0.ɵɵelementStart(88, "text", 49);
            i0.ɵɵtext(89, "PRESIDIO PARK");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(90, "rect", 50);
            i0.ɵɵelementStart(91, "text", 51);
            i0.ɵɵtext(92, "INDUSTRIAL COMMERCE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "g", 52);
            i0.ɵɵelement(94, "line", 53)(95, "line", 54)(96, "line", 55)(97, "line", 56)(98, "line", 57)(99, "line", 58)(100, "line", 59)(101, "line", 60)(102, "line", 61)(103, "line", 62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "g", 63);
            i0.ɵɵelement(105, "line", 64)(106, "line", 59)(107, "line", 60);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "g", 65)(109, "text", 66);
            i0.ɵɵtext(110, "CENTRAL EXPRESSWAY 101");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "text", 67);
            i0.ɵɵtext(112, "BROADWAY WAY");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "text", 68);
            i0.ɵɵtext(114, "GRANDVIEW AVE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "text", 69);
            i0.ɵɵtext(116, "WATERFRONT BLVD");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "text", 70);
            i0.ɵɵtext(118, "BELMONT RIDGE");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(119, InstallerMapView_Conditional_119_Template, 6, 0, ":svg:g", 71);
            i0.ɵɵelementStart(120, "g", 72);
            i0.ɵɵelement(121, "circle", 73);
            i0.ɵɵelementStart(122, "text", 74);
            i0.ɵɵtext(123, "HQ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(124, "rect", 75);
            i0.ɵɵelementStart(125, "text", 76);
            i0.ɵɵtext(126, "DOORMASTER ATELIER");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(127, "path", 77)(128, "path", 78)(129, "path", 79);
            i0.ɵɵconditionalCreate(130, InstallerMapView_Conditional_130_Template, 1, 2, ":svg:circle", 80);
            i0.ɵɵconditionalCreate(131, InstallerMapView_Conditional_131_Template, 3, 1, ":svg:g");
            i0.ɵɵrepeaterCreate(132, InstallerMapView_For_133_Template, 3, 2, ":svg:g", 81, _forTrack0);
            i0.ɵɵelementStart(134, "g", 82);
            i0.ɵɵelement(135, "circle", 83)(136, "rect", 84)(137, "rect", 85)(138, "rect", 86)(139, "polygon", 87)(140, "circle", 88);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "g");
            i0.ɵɵelement(142, "rect", 89);
            i0.ɵɵelementStart(143, "text", 90);
            i0.ɵɵtext(144);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(145, InstallerMapView_Conditional_145_Template, 11, 2, "div", 91);
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(146, "div", 92)(147, "button", 93);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_147_listener() { return ctx.recenterVehicle(); });
            i0.ɵɵelementStart(148, "mat-icon", 94);
            i0.ɵɵtext(149, "my_location");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(150, "button", 95);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_150_listener() { return ctx.showTraffic.set(!ctx.showTraffic()); });
            i0.ɵɵelementStart(151, "mat-icon", 94);
            i0.ɵɵtext(152, "traffic");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(153, "button", 96);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_153_listener() { return ctx.cycleMapTheme(); });
            i0.ɵɵelementStart(154, "mat-icon", 94);
            i0.ɵɵtext(155, "layers");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(156, InstallerMapView_Conditional_156_Template, 16, 0, "div", 97);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(157, "div", 98)(158, "div", 99)(159, "div", 6);
            i0.ɵɵconditionalCreate(160, InstallerMapView_Conditional_160_Template, 5, 1, "button", 100)(161, InstallerMapView_Conditional_161_Template, 5, 0, "button", 101);
            i0.ɵɵelementStart(162, "button", 102);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_162_listener() { return ctx.resetSimulation(); });
            i0.ɵɵelementStart(163, "mat-icon", 14);
            i0.ɵɵtext(164, "restart_alt");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(165, "span");
            i0.ɵɵtext(166, "Reset");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(167, "div", 103)(168, "button", 104);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_168_listener() { return ctx.setSpeed(1); });
            i0.ɵɵtext(169, " 1x ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(170, "button", 104);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_170_listener() { return ctx.setSpeed(2); });
            i0.ɵɵtext(171, " 2x ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(172, "button", 104);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_172_listener() { return ctx.setSpeed(4); });
            i0.ɵɵtext(173, " 4x ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "button", 105);
            i0.ɵɵlistener("click", function InstallerMapView_Template_button_click_174_listener() { return ctx.instantArrive(); });
            i0.ɵɵtext(175, " Arrive ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(176, "div", 106)(177, "span", 107);
            i0.ɵɵtext(178);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(179, "span", 108);
            i0.ɵɵtext(180);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(181, "div", 109)(182, "input", 110);
            i0.ɵɵlistener("input", function InstallerMapView_Template_input_input_182_listener($event) { return ctx.onProgressScrub($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(183, "div", 111)(184, "span");
            i0.ɵɵtext(185, "DoorMaster Atelier HQ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "span", 112);
            i0.ɵɵtext(187);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(188, "span", 113);
            i0.ɵɵtext(189);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵconditionalCreate(190, InstallerMapView_Conditional_190_Template, 36, 6, "div", 114);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_3_0;
            let tmp_4_0;
            let tmp_6_0;
            let tmp_38_0;
            i0.ɵɵadvance(3);
            i0.ɵɵclassMap(ctx.isArrived() ? "bg-emerald-100 dark:bg-emerald-600/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/50" : "bg-indigo-100 dark:bg-indigo-600/25 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/40");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isArrived() ? 4 : ctx.currentStep().maneuver === "turn-right" ? 5 : ctx.currentStep().maneuver === "turn-left" ? 6 : ctx.currentStep().maneuver === "arrive" ? 7 : 8);
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.isArrived() ? 12 : 13);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ((tmp_3_0 = ctx.targetJob()) == null ? null : tmp_3_0.client == null ? null : tmp_3_0.client.name) || "Selected Site", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.isArrived() ? "Arrived at " + (((tmp_4_0 = ctx.targetJob()) == null ? null : tmp_4_0.client == null ? null : tmp_4_0.client.siteAddress) || "Site") : ctx.currentStep().instruction, " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("Geofence: ", ctx.inGeofence() ? "INSIDE (12m)" : "EN ROUTE (Tracking)");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate((tmp_6_0 = ctx.targetJob()) == null ? null : tmp_6_0.doorModel);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.isArrived() ? "0 min" : ctx.etaMinutes() + " min", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.etaTime());
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.isArrived() ? "0.0 mi" : ctx.remainingMiles() + " mi", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.totalDistanceMi, " mi total");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.isSimulating() ? ctx.currentSpeed() : 0, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵclassMap(ctx.trafficLevel() === "smooth" ? "text-emerald-600 dark:text-emerald-500" : "text-amber-600 dark:text-amber-500");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.trafficLevel() === "smooth" ? "Smooth Flow" : "Moderate Traffic", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.showTurnList() ? "bg-indigo-600 text-white border-indigo-500" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(10);
            i0.ɵɵclassMap(ctx.mapThemeClass());
            i0.ɵɵadvance(52);
            i0.ɵɵconditional(ctx.showTraffic() ? 119 : -1);
            i0.ɵɵadvance(8);
            i0.ɵɵattribute("d", ctx.routeSvgPath());
            i0.ɵɵadvance();
            i0.ɵɵattribute("d", ctx.routeSvgPath());
            i0.ɵɵadvance();
            i0.ɵɵattribute("d", ctx.completedRouteSvgPath());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isSimulating() ? 130 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.targetSite() ? 131 : -1);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.allMappedSites());
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("transform", "translate(" + ctx.vehiclePos().x + "," + ctx.vehiclePos().y + ") rotate(" + ctx.vehicleAngle() + ")");
            i0.ɵɵadvance(7);
            i0.ɵɵattribute("transform", "translate(" + ctx.vehiclePos().x + "," + (ctx.vehiclePos().y - 24) + ")");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" \uD83D\uDE90 ", ctx.technicianName(), " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.inGeofence() ? 145 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵclassMap(ctx.showTraffic() ? "bg-amber-600/30 text-amber-400 border-amber-500/50" : "bg-slate-900/90 text-slate-400 border-slate-700 hover:text-white");
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.showTurnList() ? 156 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.isSimulating() ? 160 : 161);
            i0.ɵɵadvance(8);
            i0.ɵɵclassMap(ctx.simSpeed() === 1 ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.simSpeed() === 2 ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.simSpeed() === 4 ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" Simulating GPS Telemetry for ", ctx.technicianName(), " ");
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.isArrived() ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700 shadow-xs");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.Math.round(ctx.progress()), "% Progress ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.progress());
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("Waypoints: ", ctx.waypoints().length, " steps");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(((tmp_38_0 = ctx.targetJob()) == null ? null : tmp_38_0.client == null ? null : tmp_38_0.client.name) || "Client Site");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showContactCard() ? 190 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InstallerMapView, [{
        type: Component,
        args: [{
                selector: 'app-installer-map-view',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule],
                template: `
    <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xl dark:shadow-2xl text-slate-900 dark:text-white relative isolate z-0 transition-colors duration-200">
      
      <!-- ================================================================= -->
      <!-- UBER DRIVER HEADS-UP DISPLAY (HUD) TOP NAVIGATION BANNER          -->
      <!-- ================================================================= -->
      <div class="bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none relative z-10">
        
        <!-- Next Maneuver & Destination Card -->
        <div class="flex items-center gap-3.5">
          <div 
            class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-md transition-colors"
            [class]="isArrived() ? 'bg-emerald-100 dark:bg-emerald-600/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/50' : 'bg-indigo-100 dark:bg-indigo-600/25 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/40'"
          >
            @if (isArrived()) {
              <mat-icon class="!text-2xl animate-bounce">place</mat-icon>
            } @else if (currentStep().maneuver === 'turn-right') {
              <mat-icon class="!text-2xl">turn_right</mat-icon>
            } @else if (currentStep().maneuver === 'turn-left') {
              <mat-icon class="!text-2xl">turn_left</mat-icon>
            } @else if (currentStep().maneuver === 'arrive') {
              <mat-icon class="!text-2xl">flag</mat-icon>
            } @else {
              <mat-icon class="!text-2xl">straight</mat-icon>
            }
          </div>

          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
                @if (isArrived()) {
                  <span class="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
                    <span>DESTINATION REACHED · ON SITE</span>
                  </span>
                } @else {
                  <span>NEXT MANEUVER · {{ currentStep().distanceText }}</span>
                }
              </span>
              <span class="text-slate-300 dark:text-slate-600">|</span>
              <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {{ targetJob()?.client?.name || 'Selected Site' }}
              </span>
            </div>

            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {{ isArrived() ? 'Arrived at ' + (targetJob()?.client?.siteAddress || 'Site') : currentStep().instruction }}
            </h3>

            <p class="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2 mt-0.5">
              <span class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <mat-icon class="!text-xs">verified</mat-icon>
                <span>Geofence: {{ inGeofence() ? 'INSIDE (12m)' : 'EN ROUTE (Tracking)' }}</span>
              </span>
              <span>·</span>
              <span class="text-slate-700 dark:text-slate-300">{{ targetJob()?.doorModel }}</span>
            </p>
          </div>
        </div>

        <!-- Live Journey Metrics (ETA, Remaining Distance, Speed) -->
        <div class="flex items-center gap-4 bg-white dark:bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <!-- ETA -->
          <div class="text-center sm:text-left">
            <span class="block text-[9px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">Live ETA</span>
            <div class="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              {{ isArrived() ? '0 min' : (etaMinutes() + ' min') }}
            </div>
            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{{ etaTime() }}</span>
          </div>

          <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

          <!-- Distance -->
          <div class="text-center sm:text-left">
            <span class="block text-[9px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">Remaining</span>
            <div class="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
              {{ isArrived() ? '0.0 mi' : (remainingMiles() + ' mi') }}
            </div>
            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{{ totalDistanceMi }} mi total</span>
          </div>

          <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

          <!-- Speed -->
          <div class="text-center sm:text-left">
            <span class="block text-[9px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">Speed</span>
            <div class="text-lg sm:text-xl font-black font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
              {{ isSimulating() ? currentSpeed() : 0 }} <span class="text-xs text-slate-500 font-normal">mph</span>
            </div>
            <span class="text-[10px] font-mono" [class]="trafficLevel() === 'smooth' ? 'text-emerald-600 dark:text-emerald-500' : 'text-amber-600 dark:text-amber-500'">
              {{ trafficLevel() === 'smooth' ? 'Smooth Flow' : 'Moderate Traffic' }}
            </span>
          </div>
        </div>

        <!-- Top Right Map Actions -->
        <div class="flex items-center gap-2">
          <!-- Step List Drawer Toggle -->
          <button 
            type="button"
            (click)="showTurnList.set(!showTurnList())"
            class="px-3 py-1.5 text-xs font-mono font-bold rounded-xl border transition-colors flex items-center gap-1.5"
            [class]="showTurnList() ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'"
            title="Toggle Turn-by-Turn Waypoint List"
          >
            <mat-icon class="!text-sm !w-4 !h-4">list_alt</mat-icon>
            <span class="hidden sm:inline">Directions</span>
          </button>

          <!-- Contact Site Client Drawer Button -->
          <button 
            type="button"
            (click)="showContactCard.set(true)"
            class="px-3 py-1.5 text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            title="Contact Client on Site"
          >
            <mat-icon class="!text-sm !w-4 !h-4">call</mat-icon>
            <span class="hidden sm:inline">Call Client</span>
          </button>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- INTERACTIVE MAP CANVAS (VECTOR SVG WITH SIMULATED ROUTE & PINS)    -->
      <!-- ================================================================= -->
      <div 
        class="relative h-[420px] sm:h-[480px] w-full select-none overflow-hidden"
        [class]="mapThemeClass()"
      >
        <!-- Map SVG Canvas -->
        <svg 
          class="w-full h-full cursor-grab active:cursor-grabbing" 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <!-- Map Grid Texture -->
            <pattern id="urbanGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
            </pattern>

            <!-- Route Active Gradient -->
            <linearGradient id="uberRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10B981" />
              <stop offset="40%" stop-color="#06B6D4" />
              <stop offset="80%" stop-color="#6366F1" />
              <stop offset="100%" stop-color="#8B5CF6" />
            </linearGradient>

            <linearGradient id="completedRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#059669" />
              <stop offset="100%" stop-color="#0284C7" />
            </linearGradient>

            <!-- Pulse Radar Filter Glow -->
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Background Pattern -->
          <rect width="1000" height="500" fill="url(#urbanGrid)" />

          <!-- ================= Natural / Urban Landmarks ================= -->
          <!-- River / Waterway -->
          <path 
            d="M -50 200 C 180 140, 360 260, 600 210 S 880 270, 1050 220" 
            fill="none" 
            stroke="rgba(14, 165, 233, 0.22)" 
            stroke-width="36" 
            stroke-linecap="round" 
          />
          <text x="380" y="242" fill="rgba(14, 165, 233, 0.45)" font-size="9" font-family="monospace" font-weight="bold" letter-spacing="3">HUDSON CANAL HARBOR</text>

          <!-- Parks / Districts -->
          <rect x="70" y="60" width="130" height="90" rx="12" fill="rgba(16, 185, 129, 0.06)" stroke="rgba(16, 185, 129, 0.14)" stroke-width="1" />
          <text x="90" y="110" fill="rgba(16, 185, 129, 0.5)" font-size="9" font-family="monospace">PRESIDIO PARK</text>

          <rect x="720" y="320" width="150" height="90" rx="12" fill="rgba(99, 102, 241, 0.05)" stroke="rgba(99, 102, 241, 0.12)" stroke-width="1" />
          <text x="740" y="370" fill="rgba(99, 102, 241, 0.5)" font-size="9" font-family="monospace">INDUSTRIAL COMMERCE</text>

          <!-- ================= Street Network ================= -->
          <!-- Secondary Arteries -->
          <g stroke="rgba(255, 255, 255, 0.07)" stroke-width="6">
            <line x1="0" y1="90" x2="1000" y2="90" />
            <line x1="0" y1="160" x2="1000" y2="160" />
            <line x1="0" y1="280" x2="1000" y2="280" />
            <line x1="0" y1="360" x2="1000" y2="360" />
            <line x1="0" y1="440" x2="1000" y2="440" />

            <line x1="160" y1="0" x2="160" y2="500" />
            <line x1="320" y1="0" x2="320" y2="500" />
            <line x1="480" y1="0" x2="480" y2="500" />
            <line x1="640" y1="0" x2="640" y2="500" />
            <line x1="800" y1="0" x2="800" y2="500" />
          </g>

          <!-- Major Freeways & Boulevards -->
          <g stroke="rgba(255, 255, 255, 0.12)" stroke-width="12" stroke-linecap="round">
            <line x1="0" y1="320" x2="1000" y2="320" />
            <line x1="320" y1="0" x2="320" y2="500" />
            <line x1="480" y1="0" x2="480" y2="500" />
          </g>

          <!-- Street Names & Avenues -->
          <g fill="rgba(255, 255, 255, 0.28)" font-size="8" font-family="monospace">
            <text x="30" y="312">CENTRAL EXPRESSWAY 101</text>
            <text x="330" y="80">BROADWAY WAY</text>
            <text x="490" y="80">GRANDVIEW AVE</text>
            <text x="650" y="272">WATERFRONT BLVD</text>
            <text x="810" y="152">BELMONT RIDGE</text>
          </g>

          <!-- Traffic Flow Overlays (Simulated Live Traffic) -->
          @if (showTraffic()) {
            <g stroke-width="3" stroke-linecap="round" stroke-dasharray="6,4">
              <!-- Free Flowing Green -->
              <line x1="20" y1="316" x2="300" y2="316" stroke="#10B981" opacity="0.8" />
              <line x1="324" y1="20" x2="324" y2="280" stroke="#10B981" opacity="0.8" />
              <!-- Moderate Amber -->
              <line x1="340" y1="316" x2="460" y2="316" stroke="#F59E0B" opacity="0.9" />
              <line x1="484" y1="80" x2="484" y2="200" stroke="#F59E0B" opacity="0.9" />
              <!-- Heavy Red -->
              <line x1="660" y1="316" x2="780" y2="316" stroke="#EF4444" opacity="0.8" />
            </g>
          }

          <!-- ================= Central Workshop Depot (Atelier HQ) ================= -->
          <g transform="translate(120, 320)" class="cursor-pointer">
            <circle r="18" fill="#0369A1" stroke="#38BDF8" stroke-width="2" />
            <text x="0" y="4" fill="#FFFFFF" font-size="8" font-family="monospace" font-weight="bold" text-anchor="middle">HQ</text>
            <rect x="22" y="-10" width="130" height="20" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
            <text x="28" y="4" fill="#BAE6FD" font-size="8" font-family="monospace" font-weight="bold">DOORMASTER ATELIER</text>
          </g>

          <!-- ================= Active Route Polyline ================= -->
          <!-- Background broad glow for route -->
          <path 
            [attr.d]="routeSvgPath()" 
            fill="none" 
            stroke="#1E293B" 
            stroke-width="10" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          />
          
          <!-- Outer gradient route track -->
          <path 
            [attr.d]="routeSvgPath()" 
            fill="none" 
            stroke="url(#uberRouteGrad)" 
            stroke-width="5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            filter="url(#glowEffect)"
          />

          <!-- Completed traversed route track (changes color behind vehicle) -->
          <path 
            [attr.d]="completedRouteSvgPath()" 
            fill="none" 
            stroke="url(#completedRouteGrad)" 
            stroke-width="5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />

          <!-- Dynamic Travelling Pulse Animation Particle -->
          @if (isSimulating()) {
            <circle 
              [attr.cx]="vehiclePos().x" 
              [attr.cy]="vehiclePos().y" 
              r="22" 
              fill="rgba(99, 102, 241, 0.25)" 
              class="animate-ping"
            />
          }

          <!-- ================= Geofence Perimeter Ring ================= -->
          @if (targetSite()) {
            <g [attr.transform]="'translate(' + targetSite()!.x + ',' + targetSite()!.y + ')'">
              <!-- Geofence 50m radius dashed perimeter -->
              <circle 
                r="45" 
                fill="rgba(16, 185, 129, 0.08)" 
                stroke="#10B981" 
                stroke-width="1.5" 
                stroke-dasharray="4,4" 
                class="animate-spin"
                style="animation-duration: 24s;"
              />
              <circle r="4" fill="#10B981" />
            </g>
          }

          <!-- ================= Job Site Markers Across City ================= -->
          @for (site of allMappedSites(); track site.jobId) {
            <g 
              [attr.transform]="'translate(' + site.x + ',' + site.y + ')'" 
              class="cursor-pointer group"
              (click)="selectJob(site.job)"
            >
              @if (site.isDestination) {
                <!-- Active destination pulsing halo -->
                <circle r="22" fill="rgba(16, 185, 129, 0.35)" class="animate-ping" />
                <circle r="14" fill="#059669" stroke="#FFFFFF" stroke-width="2.5" />
                <text x="0" y="4" fill="#FFFFFF" font-size="8" font-weight="black" text-anchor="middle">★</text>
                
                <!-- Destination Floating Site Card -->
                <g transform="translate(18, -14)">
                  <rect width="140" height="32" rx="8" fill="rgba(15, 23, 42, 0.95)" stroke="#10B981" stroke-width="1.5" />
                  <text x="8" y="13" fill="#34D399" font-size="8" font-family="monospace" font-weight="bold">TARGET: {{ site.job.id }}</text>
                  <text x="8" y="24" fill="#F8FAFC" font-size="8" font-weight="bold">{{ truncateText(site.job.client.name, 18) }}</text>
                </g>
              } @else {
                <!-- Other Assigned / Active Job Pins -->
                <circle 
                  r="11" 
                  [attr.fill]="getPinColor(site.job.status)" 
                  stroke="#FFFFFF" 
                  stroke-width="1.5" 
                  class="transition-transform group-hover:scale-125"
                />
                <text x="0" y="3" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle">
                  {{ site.job.id.slice(-2) }}
                </text>
                
                <!-- Pin Hover Label -->
                <g class="opacity-75 group-hover:opacity-100 transition-opacity" transform="translate(14, -8)">
                  <rect width="105" height="18" rx="5" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="0.8" />
                  <text x="6" y="12" fill="#E2E8F0" font-size="7.5" font-family="monospace">
                    {{ truncateText(site.job.client.name, 14) }}
                  </text>
                </g>
              }
            </g>
          }

          <!-- ================= Technician Service Vehicle (Uber Van) ================= -->
          <g 
            [attr.transform]="'translate(' + vehiclePos().x + ',' + vehiclePos().y + ') rotate(' + vehicleAngle() + ')'"
            class="transition-transform duration-300 ease-out"
          >
            <!-- Radar ring pulse -->
            <circle r="18" fill="rgba(99, 102, 241, 0.3)" class="animate-pulse" />
            
            <!-- Vehicle Body Shadow -->
            <rect x="-10" y="-7" width="20" height="14" rx="4" fill="rgba(0, 0, 0, 0.6)" filter="url(#glowEffect)" />
            
            <!-- Vehicle Chassis -->
            <rect x="-9" y="-6" width="18" height="12" rx="3.5" fill="#1E293B" stroke="#6366F1" stroke-width="1.5" />
            
            <!-- Windshield / Van Roof -->
            <rect x="-2" y="-4" width="7" height="8" rx="1.5" fill="#38BDF8" opacity="0.9" />
            
            <!-- Headlights beam pointing in direction of travel -->
            <polygon points="9,-3 20,-7 20,7 9,3" fill="rgba(253, 224, 71, 0.25)" />
            
            <!-- Center LED Dot -->
            <circle cx="0" cy="0" r="2.5" fill="#F43F5E" />
          </g>

          <!-- Technician Floating Tag -->
          <g [attr.transform]="'translate(' + vehiclePos().x + ',' + (vehiclePos().y - 24) + ')'">
            <rect x="-45" y="-10" width="90" height="18" rx="6" fill="#0F172A" stroke="#6366F1" stroke-width="1" />
            <text x="0" y="2" fill="#FFFFFF" font-size="7.5" font-family="monospace" font-weight="bold" text-anchor="middle">
              🚐 {{ technicianName() }}
            </text>
          </g>
        </svg>

        <!-- ================= Floating Geofence Arrival Banner ================= -->
        @if (inGeofence()) {
          <div class="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md bg-emerald-950/95 backdrop-blur-md border border-emerald-500 p-3.5 rounded-2xl shadow-2xl text-white flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 z-10">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <mat-icon class="!text-lg">check_circle</mat-icon>
              </div>
              <div>
                <p class="text-xs font-black text-emerald-300 uppercase tracking-wide">Geofence Confirmed (±8m)</p>
                <p class="text-[11px] text-emerald-100">You are within site boundary of {{ targetJob()?.client?.name }}</p>
              </div>
            </div>

            @if (targetJob()?.status === 'assigned' || targetJob()?.status === 'accepted' || targetJob()?.status === 'dispatched') {
              <button 
                type="button"
                (click)="triggerClockIn()"
                class="px-3 py-1.5 bg-white text-emerald-950 hover:bg-emerald-100 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap flex items-center gap-1"
              >
                <mat-icon class="!text-xs">timer</mat-icon>
                <span>Clock In Now</span>
              </button>
            }
          </div>
        }

        <!-- ================= Bottom Right Map Controls ================= -->
        <div class="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <!-- Recenter on Vehicle -->
          <button 
            type="button"
            (click)="recenterVehicle()"
            class="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center shadow-lg transition-colors"
            title="Recenter on Service Van"
          >
            <mat-icon class="!text-base">my_location</mat-icon>
          </button>

          <!-- Toggle Traffic Overlay -->
          <button 
            type="button"
            (click)="showTraffic.set(!showTraffic())"
            class="w-9 h-9 rounded-xl border flex items-center justify-center shadow-lg transition-colors"
            [class]="showTraffic() ? 'bg-amber-600/30 text-amber-400 border-amber-500/50' : 'bg-slate-900/90 text-slate-400 border-slate-700 hover:text-white'"
            title="Toggle Live Traffic Congestion Overlay"
          >
            <mat-icon class="!text-base">traffic</mat-icon>
          </button>

          <!-- Map Style Toggle -->
          <button 
            type="button"
            (click)="cycleMapTheme()"
            class="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center shadow-lg transition-colors"
            title="Switch Map Style (Dark / Satellite / Daylight)"
          >
            <mat-icon class="!text-base">layers</mat-icon>
          </button>
        </div>

        <!-- ================= Turn-by-Turn Instruction Side Panel ================= -->
        @if (showTurnList()) {
          <div class="absolute inset-y-0 right-0 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-l border-slate-200 dark:border-slate-800 p-4 shadow-2xl z-20 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-indigo-600 dark:text-indigo-400 !text-sm">directions</mat-icon>
                  <h4 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white">Route Directions</h4>
                </div>
                <button 
                  type="button"
                  (click)="showTurnList.set(false)"
                  class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <mat-icon class="!text-sm">close</mat-icon>
                </button>
              </div>

              <div class="divide-y divide-slate-100 dark:divide-slate-800/80 mt-2 space-y-1">
                @for (step of waypoints(); track $index) {
                  <div 
                    class="py-2.5 px-2 rounded-lg text-xs transition-colors flex items-start gap-2.5"
                    [class]="currentStepIndex() === $index ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
                  >
                    <div class="mt-0.5 shrink-0 text-slate-400">
                      @if (step.maneuver === 'turn-right') {
                        <mat-icon class="!text-sm text-indigo-600 dark:text-indigo-400">turn_right</mat-icon>
                      } @else if (step.maneuver === 'turn-left') {
                        <mat-icon class="!text-sm text-indigo-600 dark:text-indigo-400">turn_left</mat-icon>
                      } @else if (step.maneuver === 'arrive') {
                        <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">place</mat-icon>
                      } @else {
                        <mat-icon class="!text-sm text-slate-400">straight</mat-icon>
                      }
                    </div>

                    <div class="flex-1">
                      <p class="font-medium leading-tight" [class.text-slate-900]="currentStepIndex() === $index" [class.dark:text-white]="currentStepIndex() === $index">
                        {{ step.instruction }}
                      </p>
                      <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400">{{ step.distanceText }} · ~{{ step.speedMph }} mph</span>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              GPS Navigation powered by DoorMaster Fleet Radar
            </div>
          </div>
        }
      </div>

      <!-- ================================================================= -->
      <!-- UBER-STYLE ROUTE SIMULATION CONTROLS & TIMELINE SCRUBBER          -->
      <!-- ================================================================= -->
      <div class="bg-slate-50 dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-800 select-none transition-colors">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          
          <!-- Simulation Playback Controls -->
          <div class="flex items-center gap-2">
            @if (!isSimulating()) {
              <button 
                type="button"
                (click)="startSimulation()"
                class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
              >
                <mat-icon class="!text-sm !w-4 !h-4">play_arrow</mat-icon>
                <span>{{ progress() > 0 && progress() < 100 ? 'Resume Route' : 'Drive Route' }}</span>
              </button>
            } @else {
              <button 
                type="button"
                (click)="pauseSimulation()"
                class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
              >
                <mat-icon class="!text-sm !w-4 !h-4">pause</mat-icon>
                <span>Pause Drive</span>
              </button>
            }

            <button 
              type="button"
              (click)="resetSimulation()"
              class="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-mono font-medium border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1 shadow-xs"
              title="Reset Route to Beginning"
            >
              <mat-icon class="!text-xs">restart_alt</mat-icon>
              <span>Reset</span>
            </button>

            <!-- Speed multiplier buttons -->
            <div class="flex items-center bg-slate-200 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-300 dark:border-slate-800 text-[11px] font-mono">
              <button 
                type="button" 
                (click)="setSpeed(1)" 
                class="px-2 py-1 rounded-lg transition-colors font-bold"
                [class]="simSpeed() === 1 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                1x
              </button>
              <button 
                type="button" 
                (click)="setSpeed(2)" 
                class="px-2 py-1 rounded-lg transition-colors font-bold"
                [class]="simSpeed() === 2 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                2x
              </button>
              <button 
                type="button" 
                (click)="setSpeed(4)" 
                class="px-2 py-1 rounded-lg transition-colors font-bold"
                [class]="simSpeed() === 4 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                4x
              </button>
              <button 
                type="button" 
                (click)="instantArrive()" 
                class="px-2 py-1 rounded-lg text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 font-bold"
                title="Instant Arrive at Site"
              >
                Arrive
              </button>
            </div>
          </div>

          <!-- Target Site Switcher / Information -->
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono hidden md:inline">
              Simulating GPS Telemetry for {{ technicianName() }}
            </span>

            <span class="text-xs font-mono font-bold px-2 py-1 rounded-lg border"
              [class]="isArrived() ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700 shadow-xs'"
            >
              {{ Math.round(progress()) }}% Progress
            </span>
          </div>
        </div>

        <!-- Progress Scrubber Slider -->
        <div class="space-y-1">
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="0.5"
            [value]="progress()" 
            (input)="onProgressScrub($event)"
            class="w-full h-2 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div class="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>DoorMaster Atelier HQ</span>
            <span class="text-slate-500 dark:text-slate-400">Waypoints: {{ waypoints().length }} steps</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ targetJob()?.client?.name || 'Client Site' }}</span>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- MODAL CONTACT CLIENT SLIDEOUT DRAWER (NO WINDOW.ALERT)           -->
      <!-- ================================================================= -->
      @if (showContactCard()) {
        <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-slate-900 dark:text-white space-y-4 animate-in zoom-in-95">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div class="flex items-center gap-2">
                <mat-icon class="text-emerald-600 dark:text-emerald-400">phone_in_talk</mat-icon>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Client Site Contact</h4>
              </div>
              <button 
                type="button" 
                (click)="showContactCard.set(false)" 
                class="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            </div>

            <div class="space-y-2 text-xs">
              <div>
                <span class="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono">Client Name</span>
                <p class="text-base font-extrabold text-slate-900 dark:text-white">{{ targetJob()?.client?.name }}</p>
              </div>

              <div>
                <span class="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono">Direct Site Phone</span>
                <p class="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ targetJob()?.client?.phone }}</p>
              </div>

              <div>
                <span class="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono">Site Address</span>
                <p class="text-xs text-slate-700 dark:text-slate-300">{{ targetJob()?.client?.siteAddress }}</p>
              </div>

              @if (targetJob()?.client?.accessInstructions) {
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                  <strong class="text-amber-600 dark:text-amber-400">Access Notes:</strong> {{ targetJob()?.client?.accessInstructions }}
                </div>
              }
            </div>

            <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <a 
                [href]="'tel:' + targetJob()?.client?.phone"
                class="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <mat-icon class="!text-xs">call</mat-icon>
                <span>Call Phone Directly</span>
              </a>

              <button 
                type="button"
                (click)="copyPhoneToClipboard(targetJob()?.client?.phone || '')"
                class="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition-colors"
                title="Copy phone number"
              >
                {{ copiedPhone() ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
            }]
    }], () => [], { activeJob: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeJob", required: false }] }], installerJobs: [{ type: i0.Input, args: [{ isSignal: true, alias: "installerJobs", required: false }] }], technicianName: [{ type: i0.Input, args: [{ isSignal: true, alias: "technicianName", required: false }] }], technicianId: [{ type: i0.Input, args: [{ isSignal: true, alias: "technicianId", required: false }] }], jobSelected: [{ type: i0.Output, args: ["jobSelected"] }], clockInTriggered: [{ type: i0.Output, args: ["clockInTriggered"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InstallerMapView, { className: "InstallerMapView", filePath: "frontend/src/app/components/installer-map-view/installer-map-view.ts", lineNumber: 701 }); })();
