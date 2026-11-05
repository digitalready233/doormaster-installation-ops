import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { PwaService } from '../../services/pwa.service';
import { ClockWidget } from '../../components/clock-widget/clock-widget';
import { PhotoUploader } from '../../components/photo-uploader/photo-uploader';
import { SignaturePad } from '../../components/signature-pad/signature-pad';
import { InstallerMapView } from '../../components/installer-map-view/installer-map-view';
import { RejectionModal } from '../../components/rejection-modal/rejection-modal';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function InstallerPortal_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const inst_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", inst_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", inst_r1.name, " (", inst_r1.metrics.avgRating, "\u2605)");
} }
function InstallerPortal_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Door models, lock hardware diagrams & road corridor tiles are cached in browser storage for zero-connectivity job sites. ");
} }
function InstallerPortal_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Operating with cached specifications & local storage. All changes (clocking, checklist, photos & sign-offs) will auto-sync once back online. ");
} }
function InstallerPortal_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_55_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.triggerOfflineSync()); });
    i0.ɵɵelementStart(1, "mat-icon", 30);
    i0.ɵɵtext(2, "sync");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Sync ", ctx_r2.pwa.pendingSyncCount(), " Pending Actions");
} }
function InstallerPortal_Conditional_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 35);
} }
function InstallerPortal_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵelement(1, "span", 46);
    i0.ɵɵelementStart(2, "span", 47);
    i0.ɵɵtext(3, "Active Target: ");
    i0.ɵɵelementStart(4, "strong", 48);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 49);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_81_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openNavigation(ctx_r2.currentJob())); });
    i0.ɵɵelementStart(7, "mat-icon", 30);
    i0.ɵɵtext(8, "near_me");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Recenter");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.currentJob().client.name);
} }
function InstallerPortal_Conditional_82_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 40)(1, "div", 4)(2, "mat-icon", 50);
    i0.ɵɵtext(3, "satellite_alt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_82_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.navAlert.set(null)); });
    i0.ɵɵelementStart(7, "mat-icon", 30);
    i0.ɵɵtext(8, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.navAlert());
} }
function InstallerPortal_Conditional_83_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-osm-live-map", 60);
} if (rf & 2) {
    i0.ɵɵproperty("mode", "all-fleet");
} }
function InstallerPortal_Conditional_83_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-installer-map-view", 62);
    i0.ɵɵlistener("jobSelected", function InstallerPortal_Conditional_83_Conditional_20_Template_app_installer_map_view_jobSelected_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onJobSelectedFromMap($event)); })("clockInTriggered", function InstallerPortal_Conditional_83_Conditional_20_Template_app_installer_map_view_clockInTriggered_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleClockInFromMap($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("activeJob", ctx_r2.selectedMapJob() || ctx_r2.currentJob())("installerJobs", ctx_r2.installerJobs())("technicianName", ctx_r2.activeInstaller().name)("technicianId", ctx_r2.activeInstaller().id);
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68)(1, "mat-icon", 79);
    i0.ɵɵtext(2, "hourglass_top");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Installer: Pending");
    i0.ɵɵelementEnd()();
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const activeJ_r9 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Verified Work GPS: [", activeJ_r9.installerWorkLocation.startLat == null ? null : activeJ_r9.installerWorkLocation.startLat.toFixed(4), ", ", activeJ_r9.installerWorkLocation.startLng == null ? null : activeJ_r9.installerWorkLocation.startLng.toFixed(4), "] ");
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 80);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Conditional_21_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); i0.ɵɵnextContext(); const activeJ_r9 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleAccept(activeJ_r9.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 30);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Accept Job");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 81);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Conditional_21_Conditional_22_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); i0.ɵɵnextContext(); const activeJ_r9 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openRejectModal(activeJ_r9.id)); });
    i0.ɵɵelementStart(6, "mat-icon", 30);
    i0.ɵɵtext(7, "cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Reject");
    i0.ɵɵelementEnd()();
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Transmitting Final GPS... ");
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " End & Complete Work (Send GPS to Ops Mgr) ");
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 82);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); i0.ɵɵnextContext(); const activeJ_r9 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleCompleteWorkWithGps(activeJ_r9.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 30);
    i0.ɵɵtext(2, "task_alt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵconditionalCreate(4, InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Conditional_4_Template, 1, 0)(5, InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Conditional_5_Template, 1, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r2.gpsTransmitting());
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r2.gpsTransmitting() ? 4 : 5);
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Transmitting GPS... ");
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Start Work (Send GPS to Ops Mgr) ");
} }
function InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 83);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); i0.ɵɵnextContext(); const activeJ_r9 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleStartWorkWithGps(activeJ_r9.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 30);
    i0.ɵɵtext(2, "play_arrow");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵconditionalCreate(4, InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Conditional_4_Template, 1, 0)(5, InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Conditional_5_Template, 1, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r2.gpsTransmitting());
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r2.gpsTransmitting() ? 4 : 5);
} }
function InstallerPortal_Conditional_83_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 1)(2, "div", 63)(3, "div", 4)(4, "span", 64);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 65);
    i0.ɵɵtext(7, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 66);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 67);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, InstallerPortal_Conditional_83_Conditional_21_Conditional_12_Template, 5, 0, "span", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 69)(14, "mat-icon", 70);
    i0.ɵɵtext(15, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "p", 71);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, InstallerPortal_Conditional_83_Conditional_21_Conditional_20_Template, 2, 2, "div", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 22);
    i0.ɵɵconditionalCreate(22, InstallerPortal_Conditional_83_Conditional_21_Conditional_22_Template, 10, 0);
    i0.ɵɵconditionalCreate(23, InstallerPortal_Conditional_83_Conditional_21_Conditional_23_Template, 6, 2, "button", 73)(24, InstallerPortal_Conditional_83_Conditional_21_Conditional_24_Template, 6, 2, "button", 74);
    i0.ɵɵelementStart(25, "button", 75);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Conditional_21_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.activeTab.set("workspace")); });
    i0.ɵɵelementStart(26, "mat-icon", 76);
    i0.ɵɵtext(27, "build");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span");
    i0.ɵɵtext(29, "Open Site Checklist & Tools \u2192");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "button", 77);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Conditional_21_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r8); const activeJ_r9 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openCallClientModal(activeJ_r9.client.name, activeJ_r9.client.phone, activeJ_r9.client.siteAddress)); });
    i0.ɵɵelementStart(31, "mat-icon", 78);
    i0.ɵɵtext(32, "call");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Call Client");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const activeJ_r13 = i0.ɵɵstoreLet(ctx_r2.currentOrSelectedJob());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(activeJ_r13.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(activeJ_r13.doorModel);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.getStatusClass(activeJ_r13.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", activeJ_r13.status, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(activeJ_r13.installerAssignmentStatus !== "accepted" && activeJ_r13.installerAssignmentStatus !== "rejected" ? 12 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", activeJ_r13.client.siteAddress, " (", activeJ_r13.client.name, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Dimensions: ", activeJ_r13.dimensions, " \u00B7 Hardware: ", activeJ_r13.hardwareSpecs, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(activeJ_r13.installerWorkLocation ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(activeJ_r13.installerAssignmentStatus !== "accepted" && activeJ_r13.installerAssignmentStatus !== "rejected" ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(activeJ_r13.status === "in_progress" ? 23 : activeJ_r13.status === "delivered_on_site" || activeJ_r13.status === "approved" || activeJ_r13.status === "accepted" || activeJ_r13.status === "dispatched" || activeJ_r13.status === "on_site" ? 24 : -1);
} }
function InstallerPortal_Conditional_83_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 52)(2, "div", 32)(3, "button", 53);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.mapType.set("osm")); });
    i0.ɵɵelement(4, "span", 54);
    i0.ɵɵelementStart(5, "mat-icon", 55);
    i0.ɵɵtext(6, "map");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "OpenStreetMap Live Radar");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 53);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_83_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.mapType.set("hud")); });
    i0.ɵɵelementStart(10, "mat-icon", 56);
    i0.ɵɵtext(11, "navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Turn-by-Turn Live Navigation HUD");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 57)(15, "span", 58);
    i0.ɵɵelement(16, "span", 59);
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "GPS LIVE RADAR TELEMETRY ACTIVE");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵconditionalCreate(19, InstallerPortal_Conditional_83_Conditional_19_Template, 1, 1, "app-osm-live-map", 60)(20, InstallerPortal_Conditional_83_Conditional_20_Template, 1, 4, "app-installer-map-view", 61);
    i0.ɵɵconditionalCreate(21, InstallerPortal_Conditional_83_Conditional_21_Template, 35, 14, "div", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ctx_r2.mapType() === "osm" ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r2.mapType() === "hud" ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(ctx_r2.mapType() === "osm" ? 19 : 20);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.currentOrSelectedJob() ? 21 : -1);
} }
function InstallerPortal_Conditional_84_Conditional_0_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97)(1, "div", 4)(2, "mat-icon", 122);
    i0.ɵɵtext(3, "notification_important");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6, "New Assignment Notification:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 123);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_84_Conditional_0_Conditional_40_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r16); i0.ɵɵnextContext(); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleAccept(j_r15.id)); });
    i0.ɵɵtext(9, " Accept Now ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r15 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" You have been assigned this door installation. Accepting will instantly notify client ", j_r15.client.name, ". ");
} }
function InstallerPortal_Conditional_84_Conditional_0_For_91_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 127);
    i0.ɵɵtext(1, "Checked \u2713");
    i0.ɵɵelementEnd();
} }
function InstallerPortal_Conditional_84_Conditional_0_For_91_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 124);
    i0.ɵɵlistener("keydown.enter", function InstallerPortal_Conditional_84_Conditional_0_For_91_Template_div_keydown_enter_0_listener() { const item_r18 = i0.ɵɵrestoreView(_r17).$implicit; i0.ɵɵnextContext(); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleChecklistToggle(j_r15.id, item_r18.id, item_r18.label)); })("click", function InstallerPortal_Conditional_84_Conditional_0_For_91_Template_div_click_0_listener() { const item_r18 = i0.ɵɵrestoreView(_r17).$implicit; i0.ɵɵnextContext(); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleChecklistToggle(j_r15.id, item_r18.id, item_r18.label)); });
    i0.ɵɵelementStart(1, "div", 125);
    i0.ɵɵelement(2, "input", 126);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(5, InstallerPortal_Conditional_84_Conditional_0_For_91_Conditional_5_Template, 2, 0, "span", 127);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r18 = ctx.$implicit;
    i0.ɵɵclassMap(item_r18.completed ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60" : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", item_r18.completed);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(item_r18.completed ? "text-emerald-950 dark:text-emerald-300 font-medium line-through" : "text-slate-800 dark:text-slate-200 font-medium");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r18.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r18.completed ? 5 : -1);
} }
function InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 128)(1, "div", 4)(2, "mat-icon", 130);
    i0.ɵɵtext(3, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 131);
    i0.ɵɵtext(6, "Customer Verification Recorded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 132);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(9, "img", 133);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const j_r15 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate2("Signed by ", j_r15.customerSignoff.clientName, " with a ", j_r15.customerSignoff.rating, ".0 \u2605 rating");
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", j_r15.customerSignoff.signatureDataUrl, i0.ɵɵsanitizeUrl);
} }
function InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-signature-pad", 134);
    i0.ɵɵlistener("signoffCompleted", function InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Conditional_2_Template_app_signature_pad_signoffCompleted_0_listener($event) { i0.ɵɵrestoreView(_r19); i0.ɵɵnextContext(2); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleSignoff(j_r15.id, $event)); })("cancelled", function InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Conditional_2_Template_app_signature_pad_cancelled_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.showSignoffPad.set(false)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const j_r15 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("initialClientName", j_r15.client.name);
} }
function InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 121);
    i0.ɵɵconditionalCreate(1, InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Conditional_1_Template, 10, 3, "div", 128)(2, InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Conditional_2_Template, 1, 1, "app-signature-pad", 129);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r15 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(j_r15.customerSignoff ? 1 : 2);
} }
function InstallerPortal_Conditional_84_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 84)(2, "div", 86)(3, "div")(4, "div", 87)(5, "span", 88);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 89);
    i0.ɵɵtext(10, " Current Active Work Order ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "h3", 90);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 91)(14, "span", 92)(15, "mat-icon", 55);
    i0.ɵɵtext(16, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 93);
    i0.ɵɵelement(22, "span", 59);
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24, "Geofence: IN RADIUS (12m)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 94)(30, "button", 95);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_84_Conditional_0_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r14); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openNavigation(j_r15)); });
    i0.ɵɵelementStart(31, "mat-icon", 30);
    i0.ɵɵtext(32, "navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Open Interactive Map");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "button", 96);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_84_Conditional_0_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r14); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openCallClientModal(j_r15.client.name, j_r15.client.phone, j_r15.client.siteAddress)); });
    i0.ɵɵelementStart(36, "mat-icon", 30);
    i0.ɵɵtext(37, "call");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Call Client");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵconditionalCreate(40, InstallerPortal_Conditional_84_Conditional_0_Conditional_40_Template, 10, 1, "div", 97);
    i0.ɵɵelementStart(41, "div", 98)(42, "div", 99)(43, "div", 100)(44, "h4", 101);
    i0.ɵɵtext(45, "Installation Site & Client");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 102);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p", 103)(49, "mat-icon", 104);
    i0.ɵɵtext(50, "place");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span");
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "p", 105);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 106)(56, "strong");
    i0.ɵɵtext(57, "Access notes:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "div", 100)(60, "h4", 101);
    i0.ɵɵtext(61, "Door Specifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div", 107)(63, "span", 108);
    i0.ɵɵtext(64, "Dimensions:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "span", 109);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(67, "div", 107)(68, "span", 108);
    i0.ɵɵtext(69, "Finish:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "span", 110);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(72, "div", 107)(73, "span", 108);
    i0.ɵɵtext(74, "Hardware Mortise:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "span", 110);
    i0.ɵɵtext(76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(77, "div", 111)(78, "span");
    i0.ɵɵtext(79, "Eligible Bonus on Completion:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "span", 112);
    i0.ɵɵtext(81);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(82, "app-clock-widget", 113);
    i0.ɵɵlistener("clockInTriggered", function InstallerPortal_Conditional_84_Conditional_0_Template_app_clock_widget_clockInTriggered_82_listener($event) { i0.ɵɵrestoreView(_r14); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleClockIn(j_r15.id, $event)); })("clockOutTriggered", function InstallerPortal_Conditional_84_Conditional_0_Template_app_clock_widget_clockOutTriggered_82_listener($event) { i0.ɵɵrestoreView(_r14); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handleClockOut(j_r15.id, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "div", 114)(84, "div", 115)(85, "h4", 116);
    i0.ɵɵtext(86, "Step-by-Step Installation Checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "span", 117);
    i0.ɵɵtext(88);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(89, "div", 118);
    i0.ɵɵrepeaterCreate(90, InstallerPortal_Conditional_84_Conditional_0_For_91_Template, 6, 7, "div", 119, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(92, "div", 114)(93, "app-photo-uploader", 120);
    i0.ɵɵlistener("photoUploaded", function InstallerPortal_Conditional_84_Conditional_0_Template_app_photo_uploader_photoUploaded_93_listener($event) { i0.ɵɵrestoreView(_r14); const j_r15 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.handlePhotoUpload(j_r15.id, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(94, InstallerPortal_Conditional_84_Conditional_0_Conditional_94_Template, 3, 1, "div", 121);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const j_r20 = i0.ɵɵstoreLet(ctx_r2.currentJob());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(j_r20.id);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(j_r20.doorModel);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(j_r20.client.siteAddress);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("Contact: ", j_r20.client.phone);
    i0.ɵɵadvance(12);
    i0.ɵɵconditional(j_r20.status === "assigned" ? 40 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(j_r20.client.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r20.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Phone: ", j_r20.client.phone);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", j_r20.client.accessInstructions || "None provided", " ");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(j_r20.dimensions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r20.finish);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r20.hardwareSpecs);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("$", j_r20.financials.bonusAmount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("job", j_r20);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.completedChecklistCount(j_r20), " / ", j_r20.hardwareChecklist.length, " Done ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(j_r20.hardwareChecklist);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("photos", j_r20.photos);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.showSignoffPad() || j_r20.customerSignoff ? 94 : -1);
} }
function InstallerPortal_Conditional_84_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 85)(1, "div", 135)(2, "mat-icon");
    i0.ɵɵtext(3, "check_circle_outline");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "h3", 136);
    i0.ɵɵtext(5, "No Currently Active Site Work");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 137);
    i0.ɵɵtext(7, " Select an assigned installation from the map or queue below to review and begin site work. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 138);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_84_Conditional_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r21); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.activeTab.set("map")); });
    i0.ɵɵelementStart(9, "mat-icon", 139);
    i0.ɵɵtext(10, "navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "View Map & Routes");
    i0.ɵɵelementEnd()()();
} }
function InstallerPortal_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, InstallerPortal_Conditional_84_Conditional_0_Template, 95, 19, "div", 84)(1, InstallerPortal_Conditional_84_Conditional_1_Template, 13, 0, "div", 85);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r2.currentJob() ? 0 : 1);
} }
function InstallerPortal_Conditional_85_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 143);
    i0.ɵɵtext(1, "No additional jobs assigned at this time.");
    i0.ɵɵelementEnd();
} }
function InstallerPortal_Conditional_85_Conditional_10_For_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 149);
    i0.ɵɵtext(1, " Installer: Pending ");
    i0.ɵɵelementEnd();
} }
function InstallerPortal_Conditional_85_Conditional_10_For_2_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 158);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_85_Conditional_10_For_2_Conditional_38_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24); const job_r23 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.handleAccept(job_r23.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 159);
    i0.ɵɵtext(2, "handshake");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Accept");
    i0.ɵɵelementEnd()();
} }
function InstallerPortal_Conditional_85_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 145)(1, "div")(2, "div", 4)(3, "span", 146);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 147);
    i0.ɵɵtext(6, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 66);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 148);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, InstallerPortal_Conditional_85_Conditional_10_For_2_Conditional_11_Template, 2, 0, "span", 149);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 150)(13, "span");
    i0.ɵɵtext(14, "Client: ");
    i0.ɵɵelementStart(15, "strong", 151);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24, "Scheduled: ");
    i0.ɵɵelementStart(25, "strong", 152);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(27, "div", 10)(28, "div", 11)(29, "span", 153);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 154);
    i0.ɵɵtext(32, "Eligible Bonus");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "button", 155);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_85_Conditional_10_For_2_Template_button_click_33_listener() { const job_r23 = i0.ɵɵrestoreView(_r22).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openNavigation(job_r23)); });
    i0.ɵɵelementStart(34, "mat-icon", 30);
    i0.ɵɵtext(35, "navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵtext(37, "Route");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(38, InstallerPortal_Conditional_85_Conditional_10_For_2_Conditional_38_Template, 5, 0, "button", 156);
    i0.ɵɵelementStart(39, "button", 157);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_85_Conditional_10_For_2_Template_button_click_39_listener() { const job_r23 = i0.ɵɵrestoreView(_r22).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.jobSelected.emit(job_r23.id)); });
    i0.ɵɵtext(40, " Details \u2192 ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const job_r23 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r23.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r23.doorModel);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.getStatusClass(job_r23.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", job_r23.status, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r23.installerAssignmentStatus !== "accepted" && job_r23.installerAssignmentStatus !== "rejected" ? 11 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r23.client.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Site: ", job_r23.client.siteAddress);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(job_r23.scheduledDate);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("+$", job_r23.financials.bonusAmount);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(job_r23.status === "assigned" ? 38 : -1);
} }
function InstallerPortal_Conditional_85_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 144);
    i0.ɵɵrepeaterCreate(1, InstallerPortal_Conditional_85_Conditional_10_For_2_Template, 41, 11, "div", 145, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.installerJobs());
} }
function InstallerPortal_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 140)(2, "div")(3, "h3", 102);
    i0.ɵɵtext(4, "Your Assigned Installation Queue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 141);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 142);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(9, InstallerPortal_Conditional_85_Conditional_9_Template, 2, 0, "p", 143)(10, InstallerPortal_Conditional_85_Conditional_10_Template, 3, 0, "div", 144);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Upcoming door installations allocated to ", ctx_r2.activeInstaller().name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.installerJobs().length, " Total Jobs");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.installerJobs().length === 0 ? 9 : 10);
} }
function InstallerPortal_Conditional_86_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 43)(2, "div", 160)(3, "div", 161)(4, "div", 4)(5, "div", 162)(6, "mat-icon", 163);
    i0.ɵɵtext(7, "call");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "h4", 102);
    i0.ɵɵtext(9, "Direct Client Contact");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 164);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_86_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r25); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.callModalData.set(null)); });
    i0.ɵɵelementStart(11, "mat-icon", 165);
    i0.ɵɵtext(12, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 166)(14, "div")(15, "span", 167);
    i0.ɵɵtext(16, "Client Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 168);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div")(20, "span", 167);
    i0.ɵɵtext(21, "Direct Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 169);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "span", 167);
    i0.ɵɵtext(26, "Site Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 170);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 171)(30, "a", 172)(31, "mat-icon", 30);
    i0.ɵɵtext(32, "phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Call Phone Directly");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "button", 173);
    i0.ɵɵlistener("click", function InstallerPortal_Conditional_86_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r25); const c_r26 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.copyToClipboard(c_r26.phone)); });
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const c_r27 = i0.ɵɵstoreLet(ctx_r2.callModalData());
    i0.ɵɵadvance(18);
    i0.ɵɵtextInterpolate(c_r27.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(c_r27.phone);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(c_r27.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", "tel:" + c_r27.phone, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.copiedPhone() ? "Copied \u2713" : "Copy", " ");
} }
function InstallerPortal_Conditional_87_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-rejection-modal", 174);
    i0.ɵɵlistener("rejected", function InstallerPortal_Conditional_87_Template_app_rejection_modal_rejected_0_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleRejectSubmit($event)); })("canceled", function InstallerPortal_Conditional_87_Template_app_rejection_modal_canceled_0_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.rejectingJobId.set(null)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("jobId", ctx_r2.rejectingJobId())("roleTitle", "Field Installer / Technician")("isDriver", false);
} }
export class InstallerPortal {
    store = inject(InstallationStore);
    pwa = inject(PwaService);
    alert = inject(AlertService);
    jobSelected = output();
    mapType = signal('osm', ...(ngDevMode ? [{ debugName: "mapType" }] : /* istanbul ignore next */ []));
    rejectingJobId = signal(null, ...(ngDevMode ? [{ debugName: "rejectingJobId" }] : /* istanbul ignore next */ []));
    gpsTransmitting = signal(false, ...(ngDevMode ? [{ debugName: "gpsTransmitting" }] : /* istanbul ignore next */ []));
    activeTab = signal('map', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    showSignoffPad = signal(false, ...(ngDevMode ? [{ debugName: "showSignoffPad" }] : /* istanbul ignore next */ []));
    selectedMapJob = signal(null, ...(ngDevMode ? [{ debugName: "selectedMapJob" }] : /* istanbul ignore next */ []));
    callModalData = signal(null, ...(ngDevMode ? [{ debugName: "callModalData" }] : /* istanbul ignore next */ []));
    navAlert = signal(null, ...(ngDevMode ? [{ debugName: "navAlert" }] : /* istanbul ignore next */ []));
    copiedPhone = signal(false, ...(ngDevMode ? [{ debugName: "copiedPhone" }] : /* istanbul ignore next */ []));
    activeInstaller = computed(() => {
        const id = this.store.currentInstallerId();
        return this.store.installers().find(i => i.id === id) || this.store.installers()[0];
    }, ...(ngDevMode ? [{ debugName: "activeInstaller" }] : /* istanbul ignore next */ []));
    installerJobs = computed(() => {
        const id = this.store.currentInstallerId();
        return this.store.jobs().filter(j => j.assignedInstallerId === id);
    }, ...(ngDevMode ? [{ debugName: "installerJobs" }] : /* istanbul ignore next */ []));
    currentJob = computed(() => {
        const id = this.store.currentInstallerId();
        return this.store.jobs().find(j => j.assignedInstallerId === id && (j.status === 'on_site' || j.status === 'accepted' || j.status === 'dispatched' || j.status === 'assigned' || j.status === 'in_progress'))
            || this.installerJobs()[0]
            || null;
    }, ...(ngDevMode ? [{ debugName: "currentJob" }] : /* istanbul ignore next */ []));
    currentOrSelectedJob = computed(() => {
        return this.selectedMapJob() || this.currentJob();
    }, ...(ngDevMode ? [{ debugName: "currentOrSelectedJob" }] : /* istanbul ignore next */ []));
    triggerPrecache() {
        this.pwa.precacheJobSiteData();
        this.navAlert.set('Pre-caching DoorMaster door specs, lock catalogs & road corridors for offline site work...');
    }
    triggerOfflineSync() {
        const count = this.pwa.pendingSyncCount();
        this.pwa.syncPendingActions();
        this.navAlert.set(`Synchronized ${count} pending site actions with Operations Dispatch.`);
    }
    onTechnicianChange(event) {
        const target = event.target;
        this.store.currentInstallerId.set(target.value);
        this.selectedMapJob.set(null);
    }
    handleAccept(jobId) {
        this.store.respondInstallerAssignment(jobId, true);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'job_status',
                jobId,
                title: `Accepted assignment for Job ${jobId}`,
                payload: { accepted: true }
            });
            this.navAlert.set(`Installation ${jobId} accepted offline! Queued for dispatch sync.`);
        }
        else {
            this.navAlert.set(`Installation ${jobId} accepted! Operations Manager & Client alerted.`);
        }
    }
    openRejectModal(jobId) {
        this.rejectingJobId.set(jobId);
    }
    handleRejectSubmit(event) {
        const jobId = this.rejectingJobId();
        if (!jobId)
            return;
        const combinedReason = `${event.reason}${event.details ? ': ' + event.details : ''}`;
        this.store.respondInstallerAssignment(jobId, false, combinedReason, event.proposedSlot);
        this.rejectingJobId.set(null);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'job_status',
                jobId,
                title: `Rejected assignment for Job ${jobId}: ${event.reason}`,
                payload: { accepted: false, reason: combinedReason }
            });
        }
        this.navAlert.set(`Assignment ${jobId} rejected with reason: ${event.reason}. Operations alerted for re-assignment.`);
    }
    async handleStartWorkWithGps(jobId) {
        this.gpsTransmitting.set(true);
        let coords = { lat: 5.6037, lng: -0.1870 }; // Default Accra coordinates
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.geolocation) {
            try {
                const pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000, enableHighAccuracy: true });
                });
                coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            }
            catch {
                // Fallback gracefully
                coords = { lat: 5.6037 + (Math.random() - 0.5) * 0.01, lng: -0.1870 + (Math.random() - 0.5) * 0.01 };
            }
        }
        this.store.installerStartWork(jobId, coords);
        this.gpsTransmitting.set(false);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'job_status',
                jobId,
                title: `Started work on site [${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}]`,
                payload: { coords }
            });
            this.navAlert.set(`Work started offline! GPS coordinates queued for cloud transmission.`);
            this.alert.toastWarning('Work Started (Offline)', 'Status queued offline. Will sync when back online.');
        }
        else {
            this.navAlert.set(`Installation work started! Site GPS coordinates [${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}] transmitted to Operations Manager.`);
            this.alert.toastSuccess('Work Started', 'Job status set to In Progress. Site GPS verified.');
        }
    }
    async handleCompleteWorkWithGps(jobId) {
        this.gpsTransmitting.set(true);
        let coords = { lat: 5.6037, lng: -0.1870 };
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.geolocation) {
            try {
                const pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000, enableHighAccuracy: true });
                });
                coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            }
            catch {
                coords = { lat: 5.6037 + (Math.random() - 0.5) * 0.01, lng: -0.1870 + (Math.random() - 0.5) * 0.01 };
            }
        }
        this.store.installerCompleteWork(jobId, coords);
        this.gpsTransmitting.set(false);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'job_status',
                jobId,
                title: `Completed work on site [${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}]`,
                payload: { coords }
            });
            this.navAlert.set(`Work completion recorded offline! Queued for dispatch bonus approval.`);
            this.alert.toastWarning('Work Completed (Offline)', 'Completion queued offline. Awaiting customer sign-off.');
        }
        else {
            this.navAlert.set(`Work ended and marked complete! Final verified GPS [${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}] transmitted to Operations Manager.`);
            this.alert.toastSuccess('Installation Complete', 'Work completed! Ready for customer digital sign-off.');
        }
    }
    handleQuickClockIn(jobId) {
        this.store.clockIn(jobId, 5.6037, -0.1870, 8);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'clock_in',
                jobId,
                title: 'Quick Clock-In on Site',
                payload: { lat: 5.6037, lng: -0.1870 }
            });
        }
        this.navAlert.set(`Clocked in successfully at verified site coordinates!`);
    }
    handleClockIn(jobId, coords) {
        this.store.clockIn(jobId, coords.lat, coords.lng);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'clock_in',
                jobId,
                title: `Site Geofence Clock-In [${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}]`,
                payload: { coords }
            });
            this.navAlert.set(`Clock-in recorded offline! Queued in Service Worker local storage.`);
        }
    }
    handleClockInFromMap(event) {
        this.store.clockIn(event.jobId, event.lat, event.lng);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'clock_in',
                jobId: event.jobId,
                title: `Map Geofence Clock-In [${event.lat.toFixed(4)}, ${event.lng.toFixed(4)}]`,
                payload: { lat: event.lat, lng: event.lng }
            });
        }
        this.navAlert.set(`Geofence verified! Clocked in on site for ${event.jobId}.`);
        this.activeTab.set('workspace');
    }
    handleClockOut(jobId, data) {
        this.store.clockOut(jobId, data.notes);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'clock_out',
                jobId,
                title: 'Site Clock-Out: Installation Finished',
                payload: { notes: data.notes }
            });
            this.navAlert.set(`Clock-out saved offline! Will synchronize to Operations once back online.`);
        }
    }
    handleChecklistToggle(jobId, itemId, itemLabel) {
        this.store.toggleChecklistItem(jobId, itemId);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'checklist',
                jobId,
                title: `Checklist: ${itemLabel}`,
                payload: { itemId }
            });
        }
    }
    handlePhotoUpload(jobId, data) {
        this.store.uploadPhoto(jobId, data.stage, data.url, data.caption);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'photo_upload',
                jobId,
                title: `Photo verification: ${data.stage} stage`,
                payload: { stage: data.stage, caption: data.caption }
            });
            this.navAlert.set(`Photo stored in offline cache. Queued for synchronization.`);
            this.alert.toastWarning('Photo Cached Offline', 'Verification photo stored in browser cache.');
        }
        else {
            this.alert.toastSuccess('Photo Uploaded', `Audit photo for ${data.stage} stage recorded.`);
        }
    }
    handleSignoff(jobId, data) {
        this.store.submitCustomerSignoff(jobId, {
            ...data,
            siteRepresentativeName: data.clientName,
            verificationStatement: 'Verified complete and operational without defects.'
        });
        this.showSignoffPad.set(false);
        if (!this.pwa.isOnline()) {
            this.pwa.enqueueOfflineAction({
                type: 'signoff',
                jobId,
                title: `Customer verification by ${data.clientName} (${data.rating}★)`,
                payload: { clientName: data.clientName, rating: data.rating, signedAt: data.signedAt }
            });
            this.navAlert.set(`Digital sign-off and signature recorded offline! Queued for dispatch approval.`);
            this.alert.warning('Sign-off Saved Offline', 'Signature recorded offline. Queued for cloud sync.');
        }
        else {
            this.alert.success('Digital Sign-Off Completed!', `Customer ${data.clientName} has signed off on the installation with a ${data.rating}★ satisfaction rating.`);
        }
    }
    onJobSelectedFromMap(jobId) {
        const target = this.store.jobs().find(j => j.id === jobId);
        if (target) {
            this.selectedMapJob.set(target);
        }
    }
    openNavigation(job) {
        this.selectedMapJob.set(job);
        this.activeTab.set('map');
        this.navAlert.set(`Turn-by-turn route loaded for ${job.client.name} (${job.client.siteAddress}). Drive time ~14 mins.`);
    }
    openCallClientModal(name, phone, siteAddress) {
        this.callModalData.set({ name, phone, siteAddress });
    }
    copyToClipboard(text) {
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(text);
            this.copiedPhone.set(true);
            setTimeout(() => this.copiedPhone.set(false), 2000);
        }
    }
    completedChecklistCount(job) {
        return job.hardwareChecklist.filter(i => i.completed).length;
    }
    getStatusClass(status) {
        switch (status) {
            case 'assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
            case 'accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
            case 'dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
            case 'on_site': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
            case 'completed': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
            default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
        }
    }
    static ɵfac = function InstallerPortal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InstallerPortal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InstallerPortal, selectors: [["app-installer-portal"]], outputs: { jobSelected: "jobSelected" }, decls: 88, vars: 40, consts: [[1, "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "shadow-xs", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-3.5"], [1, "w-12", "h-12", "rounded-2xl", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center", "font-bold", "text-lg", "shadow-sm"], [1, "flex", "items-center", "gap-2"], [1, "text-base", "sm:text-lg", "font-extrabold", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "text-xs", "text-emerald-800", "dark:text-emerald-300", "font-bold", "bg-emerald-50", "dark:bg-emerald-950/60", "px-2", "py-0.5", "rounded-md", "border", "border-emerald-200", "dark:border-emerald-800/60"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-0.5", "font-mono", "flex", "items-center", "gap-1.5", "flex-wrap"], [1, "text-amber-600", "dark:text-amber-400", "font-bold"], [1, "text-emerald-700", "dark:text-emerald-400", "font-bold"], [1, "flex", "items-center", "gap-3"], [1, "text-right"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase", "font-mono", "font-bold", "block"], [1, "text-xl", "font-black", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tabular-nums"], [1, "border-l", "border-slate-200", "dark:border-slate-800", "pl-3"], ["for", "techSelector", 1, "block", "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase", "font-mono", "font-bold", "mb-1"], ["id", "techSelector", 1, "text-xs", "px-2.5", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-slate-50", "dark:bg-slate-800", "font-semibold", "text-slate-800", "dark:text-slate-200", "focus:outline-none", "focus:ring-1", "focus:ring-slate-900", "dark:focus:ring-slate-200", 3, "change", "value"], [3, "value"], [1, "rounded-2xl", "border", "p-4", "shadow-xs", "transition-all", "select-none"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-3.5"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "shadow-inner"], [1, "!text-xl"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-xs", "font-black", "uppercase", "tracking-wider", "flex", "items-center", "gap-1.5", "font-mono"], [1, "w-2", "h-2", "rounded-full"], [1, "text-[10px]", "px-2", "py-0.5", "rounded-full", "font-mono", "font-bold", "bg-white/10", "border", "border-white/10", "text-slate-300"], [1, "text-xs", "mt-0.5"], [1, "flex", "items-center", "gap-2", "shrink-0"], ["type", "button", 1, "px-3", "py-1.5", "bg-amber-500", "hover:bg-amber-400", "text-slate-950", "font-bold", "rounded-xl", "text-xs", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm"], ["type", "button", "title", "Pre-cache door models, lock diagrams, and offline route tiles before heading out to remote sites", 1, "px-3", "py-1.5", "bg-white/10", "hover:bg-white/20", "text-white", "rounded-xl", "text-xs", "font-semibold", "border", "border-white/15", "transition-all", "flex", "items-center", "gap-1.5", "disabled:opacity-50", 3, "click", "disabled"], [1, "!text-xs"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "bg-white", "dark:bg-slate-900", "p-2", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "flex", "items-center", "gap-1.5", "bg-slate-100", "dark:bg-slate-800", "p-1", "rounded-xl"], ["type", "button", 1, "px-3.5", "py-2", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-emerald-400"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-400", "animate-pulse"], [1, "!text-sm", "!w-4", "!h-4", "text-indigo-400"], [1, "!text-sm", "!w-4", "!h-4", "text-amber-500"], [1, "px-1.5", "py-0.2", "rounded-full", "bg-slate-200", "dark:bg-slate-700", "text-slate-700", "dark:text-slate-300", "text-[10px]", "font-mono"], [1, "flex", "items-center", "gap-2", "px-3", "py-1"], [1, "p-3", "bg-indigo-950", "border", "border-indigo-500", "text-indigo-200", "rounded-xl", "text-xs", "flex", "items-center", "justify-between", "gap-3", "shadow-md", "animate-in", "fade-in"], [1, "space-y-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "shadow-xs"], [1, "fixed", "inset-0", "z-50", "bg-slate-950/70", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4"], [3, "jobId", "roleTitle", "isDriver"], ["type", "button", 1, "px-3", "py-1.5", "bg-amber-500", "hover:bg-amber-400", "text-slate-950", "font-bold", "rounded-xl", "text-xs", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", 3, "click"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-ping"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "font-mono"], [1, "text-slate-900", "dark:text-white"], ["type", "button", 1, "px-2.5", "py-1", "text-xs", "font-bold", "text-indigo-700", "dark:text-indigo-300", "bg-indigo-50", "dark:bg-indigo-950/60", "hover:bg-indigo-100", "dark:hover:bg-indigo-900/60", "rounded-lg", "border", "border-indigo-200", "dark:border-indigo-800", "transition-colors", "flex", "items-center", "gap-1", 3, "click"], [1, "text-indigo-400", "!text-sm"], ["type", "button", 1, "text-indigo-400", "hover:text-white", 3, "click"], [1, "flex", "items-center", "justify-between", "flex-wrap", "gap-2"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-400", "animate-ping"], [1, "!text-xs", "text-emerald-400"], [1, "!text-xs", "text-indigo-400"], [1, "flex", "items-center", "gap-2", "text-[11px]", "font-mono"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-0.5", "rounded-md", "font-bold", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "border", "border-emerald-500/20"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500", "animate-pulse"], [3, "mode"], [3, "activeJob", "installerJobs", "technicianName", "technicianId"], [3, "jobSelected", "clockInTriggered", "activeJob", "installerJobs", "technicianName", "technicianId"], [1, "space-y-1"], [1, "font-mono", "text-xs", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-slate-300", "dark:text-slate-600"], [1, "text-xs", "font-bold", "text-slate-800", "dark:text-slate-200"], [1, "text-[10px]", "font-bold", "uppercase", "font-mono", "px-2", "py-0.5", "rounded"], [1, "text-[10px]", "font-bold", "uppercase", "font-mono", "px-2", "py-0.5", "rounded", "bg-amber-100", "text-amber-800", "dark:bg-amber-950", "dark:text-amber-300", "border", "border-amber-300", "flex", "items-center", "gap-1"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-emerald-600", "dark:text-emerald-400"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "font-mono"], [1, "text-[10px]", "font-mono", "text-emerald-700", "dark:text-emerald-400", "bg-emerald-50", "dark:bg-emerald-950/40", "px-2", "py-0.5", "rounded", "inline-block"], ["type", "button", 1, "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-700", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "disabled"], ["type", "button", 1, "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "disabled"], ["type", "button", 1, "px-4", "py-2", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "text-white", "dark:text-slate-950", "text-xs", "font-bold", "rounded-xl", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-emerald-400", "dark:text-emerald-600"], ["type", "button", 1, "px-3.5", "py-2", "bg-white", "dark:bg-slate-800", "hover:bg-slate-100", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-200", "text-xs", "font-bold", "rounded-xl", "border", "border-slate-300", "dark:border-slate-700", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-xs", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-emerald-600", "dark:text-emerald-400"], [1, "!text-[10px]", "!w-3", "!h-3"], ["type", "button", 1, "px-3.5", "py-2", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "click"], ["type", "button", 1, "px-3.5", "py-2", "bg-red-600", "hover:bg-red-700", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-700", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "click", "disabled"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-xs"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "p-8", "text-center"], [1, "px-6", "py-4", "bg-slate-900", "dark:bg-slate-950", "text-white", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "border-b", "border-slate-800"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-300", "dark:text-slate-400"], [1, "font-mono", "font-bold", "text-white"], [1, "uppercase", "tracking-wider", "text-[11px]", "font-bold", "text-emerald-400"], [1, "text-base", "font-extrabold", "text-white", "mt-0.5"], [1, "text-xs", "text-slate-400", "flex", "items-center", "gap-2", "flex-wrap", "mt-0.5"], [1, "flex", "items-center", "gap-1", "text-slate-300"], [1, "text-emerald-400", "font-mono", "flex", "items-center", "gap-1"], [1, "flex", "items-center", "gap-2", "self-start", "md:self-auto"], ["type", "button", 1, "px-3", "py-1.5", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "text-xs", "font-bold", "rounded-lg", "flex", "items-center", "gap-1.5", "transition-colors", "shadow-sm", 3, "click"], ["type", "button", 1, "px-3", "py-1.5", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "text-xs", "font-bold", "rounded-lg", "flex", "items-center", "gap-1.5", "transition-colors", "shadow-xs", 3, "click"], [1, "p-4", "bg-amber-50", "dark:bg-amber-950/40", "border-b", "border-amber-200", "dark:border-amber-800", "text-xs", "text-amber-900", "dark:text-amber-300", "flex", "items-center", "justify-between", "gap-4"], [1, "p-6", "space-y-6"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "p-4", "rounded-xl", "bg-slate-50", "dark:bg-slate-800/60", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-2", "text-xs"], [1, "text-[11px]", "font-bold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-slate-600", "dark:text-slate-300", "flex", "items-center", "gap-1", "font-medium"], [1, "!text-sm", "text-emerald-600", "dark:text-emerald-400"], [1, "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "p-2", "bg-white", "dark:bg-slate-900", "rounded", "border", "border-slate-200", "dark:border-slate-700", "text-[11px]", "text-slate-600", "dark:text-slate-300"], [1, "flex", "justify-between", "py-0.5"], [1, "text-slate-500", "dark:text-slate-400"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white"], [1, "font-medium", "text-slate-900", "dark:text-white", "text-right"], [1, "flex", "justify-between", "py-0.5", "border-t", "border-slate-200/60", "dark:border-slate-700/60", "pt-1", "text-emerald-700", "dark:text-emerald-400", "font-semibold"], [1, "font-mono"], [3, "clockInTriggered", "clockOutTriggered", "job"], [1, "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "p-5", "bg-white", "dark:bg-slate-900"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-xs", "font-bold", "text-slate-800", "dark:text-slate-200", "uppercase", "tracking-wider"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "space-y-2"], ["role", "button", "tabindex", "0", 1, "p-3", "rounded-lg", "border", "transition-colors", "flex", "items-center", "justify-between", "gap-3", "cursor-pointer", 3, "class"], [3, "photoUploaded", "photos"], [1, "pt-2"], [1, "text-amber-700", "dark:text-amber-400"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-amber-600", "hover:bg-amber-700", "text-white", "font-bold", "rounded-lg", "text-xs", "whitespace-nowrap", "shadow-xs", 3, "click"], ["role", "button", "tabindex", "0", 1, "p-3", "rounded-lg", "border", "transition-colors", "flex", "items-center", "justify-between", "gap-3", "cursor-pointer", 3, "keydown.enter", "click"], [1, "flex", "items-center", "gap-2.5", "text-xs"], ["type", "checkbox", 1, "rounded", "text-emerald-600", "focus:ring-0", "cursor-pointer", 3, "checked"], [1, "text-[10px]", "text-emerald-700", "dark:text-emerald-400", "font-mono"], [1, "p-4", "bg-emerald-50", "dark:bg-emerald-950/40", "border", "border-emerald-200", "dark:border-emerald-800/60", "rounded-xl", "flex", "items-center", "justify-between"], [3, "initialClientName"], [1, "text-emerald-700", "dark:text-emerald-400"], [1, "text-xs", "font-bold", "text-emerald-950", "dark:text-emerald-300"], [1, "text-[11px]", "text-emerald-700", "dark:text-emerald-400"], ["alt", "Signature", 1, "h-10", "border", "rounded", "bg-white", "px-2", "py-0.5", 3, "src"], [3, "signoffCompleted", "cancelled", "initialClientName"], [1, "w-12", "h-12", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mx-auto", "text-slate-400", "mb-3"], [1, "text-sm", "font-bold", "text-slate-800", "dark:text-slate-200"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1", "mb-4", "max-w-sm", "mx-auto"], ["type", "button", 1, "px-4", "py-2", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "text-white", "dark:text-slate-950", "rounded-xl", "text-xs", "font-bold", "transition-colors", "inline-flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-xs", "text-emerald-400", "dark:text-emerald-600"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-xs", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "text-xs", "text-slate-400", "py-4", "text-center"], [1, "space-y-3"], [1, "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "hover:border-slate-300", "dark:hover:border-slate-700", "bg-slate-50/40", "dark:bg-slate-800/40", "transition-colors", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4"], [1, "text-xs", "font-mono", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-slate-400", "dark:text-slate-600"], [1, "text-[10px]", "font-semibold", "px-2", "py-0.5", "rounded", "uppercase"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded", "bg-amber-100", "text-amber-800", "dark:bg-amber-950", "dark:text-amber-300", "border", "border-amber-300"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1", "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-slate-700", "dark:text-slate-300"], [1, "text-slate-700", "dark:text-slate-300", "font-mono"], [1, "text-sm", "font-bold", "text-emerald-700", "dark:text-emerald-400", "font-mono"], [1, "block", "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase"], ["type", "button", "title", "Plot Route on Interactive Map", 1, "px-3", "py-1.5", "text-xs", "font-bold", "text-indigo-700", "dark:text-indigo-300", "bg-indigo-50", "dark:bg-indigo-950/60", "hover:bg-indigo-100", "dark:hover:bg-indigo-900/60", "rounded-lg", "border", "border-indigo-200", "dark:border-indigo-800", "transition-colors", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], ["type", "button", 1, "px-3.5", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1", "shadow-xs"], ["type", "button", 1, "px-3", "py-1.5", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "bg-slate-100", "dark:bg-slate-800", "hover:bg-slate-200", "dark:hover:bg-slate-700", "rounded-lg", "transition-colors", 3, "click"], ["type", "button", 1, "px-3.5", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], [1, "!text-xs", "!w-3.5", "!h-3.5"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "p-6", "max-w-sm", "w-full", "shadow-2xl", "text-slate-900", "dark:text-white", "space-y-4", "animate-in", "zoom-in-95", "rounded-2xl"], [1, "flex", "items-center", "justify-between", "pb-3", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "w-8", "h-8", "rounded-xl", "bg-emerald-100", "dark:bg-emerald-950/60", "text-emerald-700", "dark:text-emerald-400", "flex", "items-center", "justify-center", "font-bold"], [1, "!text-base"], ["type", "button", 1, "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", 3, "click"], [1, "!text-sm"], [1, "space-y-2.5", "text-xs"], [1, "text-slate-400", "dark:text-slate-500", "uppercase", "font-mono", "text-[10px]", "block"], [1, "text-base", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-sm", "font-mono", "font-bold", "text-emerald-700", "dark:text-emerald-400"], [1, "text-xs", "text-slate-600", "dark:text-slate-300"], [1, "pt-3", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "gap-2"], [1, "flex-1", "py-2.5", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "font-bold", "rounded-xl", "text-xs", "text-center", "transition-colors", "flex", "items-center", "justify-center", "gap-1.5", "shadow-sm", 3, "href"], ["type", "button", 1, "px-3.5", "py-2.5", "bg-slate-100", "dark:bg-slate-800", "hover:bg-slate-200", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-200", "text-xs", "font-mono", "font-bold", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "transition-colors", 3, "click"], [3, "rejected", "canceled", "jobId", "roleTitle", "isDriver"]], template: function InstallerPortal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div")(6, "div", 4)(7, "h2", 5);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "span", 6);
            i0.ɵɵtext(10, " Active Field Technician ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "p", 7)(12, "span");
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span");
            i0.ɵɵtext(15, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17, "Rating: ");
            i0.ɵɵelementStart(18, "strong", 8);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "span");
            i0.ɵɵtext(22, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span", 9);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "div", 10)(26, "div", 11)(27, "span", 12);
            i0.ɵɵtext(28, "Bonuses Earned");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "span", 13);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 14)(32, "label", 15);
            i0.ɵɵtext(33, "Switch Technician");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "select", 16);
            i0.ɵɵlistener("change", function InstallerPortal_Template_select_change_34_listener($event) { return ctx.onTechnicianChange($event); });
            i0.ɵɵrepeaterCreate(35, InstallerPortal_For_36_Template, 2, 3, "option", 17, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(37, "div", 18)(38, "div", 19)(39, "div", 10)(40, "div", 20)(41, "mat-icon", 21);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div")(44, "div", 22)(45, "span", 23);
            i0.ɵɵelement(46, "span", 24);
            i0.ɵɵelementStart(47, "span");
            i0.ɵɵtext(48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "span", 25);
            i0.ɵɵtext(50);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "p", 26);
            i0.ɵɵconditionalCreate(52, InstallerPortal_Conditional_52_Template, 1, 0)(53, InstallerPortal_Conditional_53_Template, 1, 0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(54, "div", 27);
            i0.ɵɵconditionalCreate(55, InstallerPortal_Conditional_55_Template, 5, 1, "button", 28);
            i0.ɵɵelementStart(56, "button", 29);
            i0.ɵɵlistener("click", function InstallerPortal_Template_button_click_56_listener() { return ctx.triggerPrecache(); });
            i0.ɵɵelementStart(57, "mat-icon", 30);
            i0.ɵɵtext(58, "downloading");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "span");
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(61, "div", 31)(62, "div", 32)(63, "button", 33);
            i0.ɵɵlistener("click", function InstallerPortal_Template_button_click_63_listener() { return ctx.activeTab.set("map"); });
            i0.ɵɵelementStart(64, "mat-icon", 34);
            i0.ɵɵtext(65, "navigation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "span");
            i0.ɵɵtext(67, "Uber Dispatch Map & Route");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(68, InstallerPortal_Conditional_68_Template, 1, 0, "span", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "button", 33);
            i0.ɵɵlistener("click", function InstallerPortal_Template_button_click_69_listener() { return ctx.activeTab.set("workspace"); });
            i0.ɵɵelementStart(70, "mat-icon", 36);
            i0.ɵɵtext(71, "assignment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "span");
            i0.ɵɵtext(73, "Site Checklist & Tools");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "button", 33);
            i0.ɵɵlistener("click", function InstallerPortal_Template_button_click_74_listener() { return ctx.activeTab.set("queue"); });
            i0.ɵɵelementStart(75, "mat-icon", 37);
            i0.ɵɵtext(76, "format_list_bulleted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "span");
            i0.ɵɵtext(78, "Assigned Queue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "span", 38);
            i0.ɵɵtext(80);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(81, InstallerPortal_Conditional_81_Template, 11, 1, "div", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(82, InstallerPortal_Conditional_82_Template, 9, 1, "div", 40);
            i0.ɵɵconditionalCreate(83, InstallerPortal_Conditional_83_Template, 22, 6, "div", 41);
            i0.ɵɵconditionalCreate(84, InstallerPortal_Conditional_84_Template, 2, 1);
            i0.ɵɵconditionalCreate(85, InstallerPortal_Conditional_85_Template, 11, 3, "div", 42);
            i0.ɵɵconditionalCreate(86, InstallerPortal_Conditional_86_Template, 37, 6, "div", 43);
            i0.ɵɵconditionalCreate(87, InstallerPortal_Conditional_87_Template, 1, 3, "app-rejection-modal", 44);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.activeInstaller().name.charAt(0) || "I", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.activeInstaller().name);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.activeInstaller().phone);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("", ctx.activeInstaller().metrics.avgRating, " \u2605");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" (", ctx.activeInstaller().metrics.completedJobs, " doors)");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("On-Time: ", ctx.activeInstaller().metrics.onTimeRate, "%");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" $", ctx.activeInstaller().metrics.totalBonusesEarned, " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.store.currentInstallerId());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.store.installers());
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.pwa.isOnline() ? "bg-slate-900 text-white dark:bg-slate-900/90 border-slate-800" : "bg-amber-950/90 text-amber-100 border-amber-600/70 shadow-md");
            i0.ɵɵadvance(3);
            i0.ɵɵclassMap(ctx.pwa.isOnline() ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/50");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.pwa.isOnline() ? "wifi" : "wifi_off");
            i0.ɵɵadvance(4);
            i0.ɵɵclassMap(ctx.pwa.isOnline() ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-ping");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.pwa.isOnline() ? "Online \u00B7 Live Cloud Sync" : "Offline Mode \u00B7 Job Site Intermittent");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" Service Worker ", ctx.pwa.cacheStats().version, " Active ");
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.pwa.isOnline() ? "text-slate-300" : "text-amber-200/90");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.pwa.isOnline() ? 52 : 53);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.pwa.pendingSyncCount() > 0 ? 55 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.pwa.isPrecaching());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("animate-spin", ctx.pwa.isPrecaching());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.pwa.isPrecaching() ? "Pre-caching Site Assets..." : "Pre-cache for Job Site");
            i0.ɵɵadvance(3);
            i0.ɵɵclassMap(ctx.activeTab() === "map" ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.activeInstaller().activeJobId ? 68 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.activeTab() === "workspace" ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(5);
            i0.ɵɵclassMap(ctx.activeTab() === "queue" ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.installerJobs().length, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentJob() ? 81 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.navAlert() ? 82 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "map" ? 83 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "workspace" ? 84 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "queue" ? 85 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.callModalData() ? 86 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.rejectingJobId() ? 87 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, ClockWidget, PhotoUploader, SignaturePad, InstallerMapView, RejectionModal, OsmLiveMap], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InstallerPortal, [{
        type: Component,
        args: [{
                selector: 'app-installer-portal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ClockWidget, PhotoUploader, SignaturePad, InstallerMapView, RejectionModal, OsmLiveMap],
                template: `
    <div class="space-y-6">
      
      <!-- ================================================================= -->
      <!-- TOP INSTALLER IDENTITY & CONTEXT HEADER                          -->
      <!-- ================================================================= -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-sm">
            {{ activeInstaller().name.charAt(0) || 'I' }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{{ activeInstaller().name }}</h2>
              <span class="text-xs text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                Active Field Technician
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono flex items-center gap-1.5 flex-wrap">
              <span>{{ activeInstaller().phone }}</span>
              <span>·</span>
              <span>Rating: <strong class="text-amber-600 dark:text-amber-400 font-bold">{{ activeInstaller().metrics.avgRating }} ★</strong> ({{ activeInstaller().metrics.completedJobs }} doors)</span>
              <span>·</span>
              <span class="text-emerald-700 dark:text-emerald-400 font-bold">On-Time: {{ activeInstaller().metrics.onTimeRate }}%</span>
            </p>
          </div>
        </div>

        <!-- Switch Installer Context (for multi-technician testing) -->
        <div class="flex items-center gap-3">
          <div class="text-right">
            <span class="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold block">Bonuses Earned</span>
            <span class="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
              &#36;{{ activeInstaller().metrics.totalBonusesEarned }}
            </span>
          </div>

          <div class="border-l border-slate-200 dark:border-slate-800 pl-3">
            <label for="techSelector" class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold mb-1">Switch Technician</label>
            <select 
              id="techSelector"
              [value]="store.currentInstallerId()"
              (change)="onTechnicianChange($event)"
              class="text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-200"
            >
              @for (inst of store.installers(); track inst.id) {
                <option [value]="inst.id">{{ inst.name }} ({{ inst.metrics.avgRating }}★)</option>
              }
            </select>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- JOB SITE OFFLINE READINESS & SERVICE WORKER STATUS BAR           -->
      <!-- ================================================================= -->
      <div 
        class="rounded-2xl border p-4 shadow-xs transition-all select-none"
        [class]="pwa.isOnline() 
          ? 'bg-slate-900 text-white dark:bg-slate-900/90 border-slate-800' 
          : 'bg-amber-950/90 text-amber-100 border-amber-600/70 shadow-md'"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
              [class]="pwa.isOnline() ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'"
            >
              <mat-icon class="!text-xl">{{ pwa.isOnline() ? 'wifi' : 'wifi_off' }}</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <span class="w-2 h-2 rounded-full" [class]="pwa.isOnline() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'"></span>
                  <span>{{ pwa.isOnline() ? 'Online · Live Cloud Sync' : 'Offline Mode · Job Site Intermittent' }}</span>
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-white/10 border border-white/10 text-slate-300">
                  Service Worker {{ pwa.cacheStats().version }} Active
                </span>
              </div>
              <p class="text-xs mt-0.5" [class]="pwa.isOnline() ? 'text-slate-300' : 'text-amber-200/90'">
                @if (pwa.isOnline()) {
                  Door models, lock hardware diagrams & road corridor tiles are cached in browser storage for zero-connectivity job sites.
                } @else {
                  Operating with cached specifications & local storage. All changes (clocking, checklist, photos & sign-offs) will auto-sync once back online.
                }
              </p>
            </div>
          </div>

          <!-- Quick Actions: Pre-cache for remote site & Sync Now -->
          <div class="flex items-center gap-2 shrink-0">
            @if (pwa.pendingSyncCount() > 0) {
              <button 
                type="button"
                (click)="triggerOfflineSync()"
                class="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <mat-icon class="!text-xs">sync</mat-icon>
                <span>Sync {{ pwa.pendingSyncCount() }} Pending Actions</span>
              </button>
            }

            <button 
              type="button"
              [disabled]="pwa.isPrecaching()"
              (click)="triggerPrecache()"
              class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Pre-cache door models, lock diagrams, and offline route tiles before heading out to remote sites"
            >
              <mat-icon class="!text-xs" [class.animate-spin]="pwa.isPrecaching()">downloading</mat-icon>
              <span>{{ pwa.isPrecaching() ? 'Pre-caching Site Assets...' : 'Pre-cache for Job Site' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- UBER-STYLE DISPATCH VIEW SELECTOR TABS                            -->
      <!-- ================================================================= -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <!-- 1. Interactive Map View -->
          <button 
            type="button"
            (click)="activeTab.set('map')"
            class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'map' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400">navigation</mat-icon>
            <span>Uber Dispatch Map & Route</span>
            @if (activeInstaller().activeJobId) {
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            }
          </button>

          <!-- 2. Workspace View (Checklist, Specs, Clock) -->
          <button 
            type="button"
            (click)="activeTab.set('workspace')"
            class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'workspace' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-indigo-400">assignment</mat-icon>
            <span>Site Checklist & Tools</span>
          </button>

          <!-- 3. Assigned Queue View -->
          <button 
            type="button"
            (click)="activeTab.set('queue')"
            class="px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'queue' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-amber-500">format_list_bulleted</mat-icon>
            <span>Assigned Queue</span>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
              {{ installerJobs().length }}
            </span>
          </button>
        </div>

        <!-- Quick Route Indicator / Target Quick Jump -->
        @if (currentJob()) {
          <div class="flex items-center gap-2 px-3 py-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="text-xs text-slate-600 dark:text-slate-400 font-mono">Active Target: <strong class="text-slate-900 dark:text-white">{{ currentJob()!.client.name }}</strong></span>
            <button 
              type="button"
              (click)="openNavigation(currentJob()!)"
              class="px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1"
            >
              <mat-icon class="!text-xs">near_me</mat-icon>
              <span>Recenter</span>
            </button>
          </div>
        }
      </div>

      <!-- Navigation In-App Alert Toast -->
      @if (navAlert()) {
        <div class="p-3 bg-indigo-950 border border-indigo-500 text-indigo-200 rounded-xl text-xs flex items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div class="flex items-center gap-2">
            <mat-icon class="text-indigo-400 !text-sm">satellite_alt</mat-icon>
            <span>{{ navAlert() }}</span>
          </div>
          <button 
            type="button" 
            (click)="navAlert.set(null)"
            class="text-indigo-400 hover:text-white"
          >
            <mat-icon class="!text-xs">close</mat-icon>
          </button>
        </div>
      }

      <!-- ================================================================= -->
      <!-- TAB 1: INTERACTIVE MAP VIEW (OPENSTREETMAP & ROUTE SIMULATION)    -->
      <!-- ================================================================= -->
      @if (activeTab() === 'map') {
        <div class="space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                type="button" 
                (click)="mapType.set('osm')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                [class]="mapType() === 'osm' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <mat-icon class="!text-xs text-emerald-400">map</mat-icon>
                <span>OpenStreetMap Live Radar</span>
              </button>
              <button 
                type="button" 
                (click)="mapType.set('hud')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                [class]="mapType() === 'hud' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              >
                <mat-icon class="!text-xs text-indigo-400">navigation</mat-icon>
                <span>Turn-by-Turn Live Navigation HUD</span>
              </button>
            </div>
            <div class="flex items-center gap-2 text-[11px] font-mono">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>GPS LIVE RADAR TELEMETRY ACTIVE</span>
              </span>
            </div>
          </div>

          @if (mapType() === 'osm') {
            <app-osm-live-map [mode]="'all-fleet'"></app-osm-live-map>
          } @else {
            <!-- Interactive Map Component -->
            <app-installer-map-view 
              [activeJob]="selectedMapJob() || currentJob()"
              [installerJobs]="installerJobs()"
              [technicianName]="activeInstaller().name"
              [technicianId]="activeInstaller().id"
              (jobSelected)="onJobSelectedFromMap($event)"
              (clockInTriggered)="handleClockInFromMap($event)"
            />
          }

          <!-- Quick Work Order Summary Card Below Map -->
          @if (currentOrSelectedJob()) {
            @let activeJ = currentOrSelectedJob()!;
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-slate-900 dark:text-white">{{ activeJ.id }}</span>
                  <span class="text-slate-300 dark:text-slate-600">·</span>
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">{{ activeJ.doorModel }}</span>
                  <span class="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded" [class]="getStatusClass(activeJ.status)">
                    {{ activeJ.status }}
                  </span>
                  @if (activeJ.installerAssignmentStatus !== 'accepted' && activeJ.installerAssignmentStatus !== 'rejected') {
                    <span class="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 flex items-center gap-1">
                      <mat-icon class="!text-[10px] !w-3 !h-3">hourglass_top</mat-icon>
                      <span>Installer: Pending</span>
                    </span>
                  }
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
                  <span>{{ activeJ.client.siteAddress }} ({{ activeJ.client.name }})</span>
                </p>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  Dimensions: {{ activeJ.dimensions }} · Hardware: {{ activeJ.hardwareSpecs }}
                </p>
                @if (activeJ.installerWorkLocation) {
                  <div class="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded inline-block">
                    Verified Work GPS: [{{ activeJ.installerWorkLocation.startLat?.toFixed(4) }}, {{ activeJ.installerWorkLocation.startLng?.toFixed(4) }}]
                  </div>
                }
              </div>

              <!-- Quick Action Buttons -->
              <div class="flex items-center gap-2 flex-wrap">
                <!-- Accept or Reject prompt -->
                @if (activeJ.installerAssignmentStatus !== 'accepted' && activeJ.installerAssignmentStatus !== 'rejected') {
                  <button 
                    type="button"
                    (click)="handleAccept(activeJ.id)"
                    class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <mat-icon class="!text-xs">check_circle</mat-icon>
                    <span>Accept Job</span>
                  </button>
                  <button 
                    type="button"
                    (click)="openRejectModal(activeJ.id)"
                    class="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <mat-icon class="!text-xs">cancel</mat-icon>
                    <span>Reject</span>
                  </button>
                }

                <!-- Start Work / Complete Work with Geolocation Transmission -->
                @if (activeJ.status === 'in_progress') {
                  <button 
                    type="button"
                    (click)="handleCompleteWorkWithGps(activeJ.id)"
                    [disabled]="gpsTransmitting()"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <mat-icon class="!text-xs">task_alt</mat-icon>
                    <span>@if (gpsTransmitting()) { Transmitting Final GPS... } @else { End & Complete Work (Send GPS to Ops Mgr) }</span>
                  </button>
                } @else if (activeJ.status === 'delivered_on_site' || activeJ.status === 'approved' || activeJ.status === 'accepted' || activeJ.status === 'dispatched' || activeJ.status === 'on_site') {
                  <button 
                    type="button"
                    (click)="handleStartWorkWithGps(activeJ.id)"
                    [disabled]="gpsTransmitting()"
                    class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <mat-icon class="!text-xs">play_arrow</mat-icon>
                    <span>@if (gpsTransmitting()) { Transmitting GPS... } @else { Start Work (Send GPS to Ops Mgr) }</span>
                  </button>
                }

                <button 
                  type="button"
                  (click)="activeTab.set('workspace')"
                  class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400 dark:text-emerald-600">build</mat-icon>
                  <span>Open Site Checklist & Tools →</span>
                </button>

                <button 
                  type="button"
                  (click)="openCallClientModal(activeJ.client.name, activeJ.client.phone, activeJ.client.siteAddress)"
                  class="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <mat-icon class="!text-sm !w-4 !h-4 text-emerald-600 dark:text-emerald-400">call</mat-icon>
                  <span>Call Client</span>
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- ================================================================= -->
      <!-- TAB 2: WORKSPACE VIEW (CHECKLIST, HARDWARE, CLOCK IN/OUT, PHOTOS) -->
      <!-- ================================================================= -->
      @if (activeTab() === 'workspace') {
        @if (currentJob()) {
          @let j = currentJob()!;
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            
            <!-- Top Card Ribbon -->
            <div class="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div>
                <div class="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-400">
                  <span class="font-mono font-bold text-white">{{ j.id }}</span>
                  <span>·</span>
                  <span class="uppercase tracking-wider text-[11px] font-bold text-emerald-400">
                    Current Active Work Order
                  </span>
                </div>
                <h3 class="text-base font-extrabold text-white mt-0.5">{{ j.doorModel }}</h3>
                <p class="text-xs text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
                  <span class="flex items-center gap-1 text-slate-300">
                    <mat-icon class="!text-xs text-emerald-400">place</mat-icon>
                    <span>{{ j.client.siteAddress }}</span>
                  </span>
                  <span>·</span>
                  <span class="text-emerald-400 font-mono flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Geofence: IN RADIUS (12m)</span>
                  </span>
                  <span>·</span>
                  <span>Contact: {{ j.client.phone }}</span>
                </p>
              </div>

              <div class="flex items-center gap-2 self-start md:self-auto">
                <button 
                  type="button"
                  (click)="openNavigation(j)"
                  class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <mat-icon class="!text-xs">navigation</mat-icon>
                  <span>Open Interactive Map</span>
                </button>

                <button 
                  type="button"
                  (click)="openCallClientModal(j.client.name, j.client.phone, j.client.siteAddress)"
                  class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <mat-icon class="!text-xs">call</mat-icon>
                  <span>Call Client</span>
                </button>
              </div>
            </div>

            <!-- Notification preview for Installer -->
            @if (j.status === 'assigned') {
              <div class="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-amber-700 dark:text-amber-400">notification_important</mat-icon>
                  <span>
                    <strong>New Assignment Notification:</strong> You have been assigned this door installation. Accepting will instantly notify client {{ j.client.name }}.
                  </span>
                </div>
                <button 
                  type="button"
                  (click)="handleAccept(j.id)"
                  class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs whitespace-nowrap shadow-xs"
                >
                  Accept Now
                </button>
              </div>
            }

            <div class="p-6 space-y-6">
              <!-- Site and Technical Specs Summary -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <h4 class="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Installation Site & Client</h4>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ j.client.name }}</p>
                  <p class="text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                    <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">place</mat-icon>
                    <span>{{ j.client.siteAddress }}</span>
                  </p>
                  <p class="text-slate-500 dark:text-slate-400 font-mono">Phone: {{ j.client.phone }}</p>
                  <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">
                    <strong>Access notes:</strong> {{ j.client.accessInstructions || 'None provided' }}
                  </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <h4 class="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Door Specifications</h4>
                  <div class="flex justify-between py-0.5">
                    <span class="text-slate-500 dark:text-slate-400">Dimensions:</span>
                    <span class="font-mono font-bold text-slate-900 dark:text-white">{{ j.dimensions }}</span>
                  </div>
                  <div class="flex justify-between py-0.5">
                    <span class="text-slate-500 dark:text-slate-400">Finish:</span>
                    <span class="font-medium text-slate-900 dark:text-white text-right">{{ j.finish }}</span>
                  </div>
                  <div class="flex justify-between py-0.5">
                    <span class="text-slate-500 dark:text-slate-400">Hardware Mortise:</span>
                    <span class="font-medium text-slate-900 dark:text-white text-right">{{ j.hardwareSpecs }}</span>
                  </div>
                  <div class="flex justify-between py-0.5 border-t border-slate-200/60 dark:border-slate-700/60 pt-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>Eligible Bonus on Completion:</span>
                    <span class="font-mono">&#36;{{ j.financials.bonusAmount }}</span>
                  </div>
                </div>
              </div>

              <!-- On-Site Clock In / Clock Out Component -->
              <app-clock-widget 
                [job]="j"
                (clockInTriggered)="handleClockIn(j.id, $event)"
                (clockOutTriggered)="handleClockOut(j.id, $event)"
              />

              <!-- Hardware Installation Checklist -->
              <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Step-by-Step Installation Checklist</h4>
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {{ completedChecklistCount(j) }} / {{ j.hardwareChecklist.length }} Done
                  </span>
                </div>

                <div class="space-y-2">
                  @for (item of j.hardwareChecklist; track item.id) {
                    <div 
                      role="button"
                      tabindex="0"
                      (keydown.enter)="handleChecklistToggle(j.id, item.id, item.label)"
                      class="p-3 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer"
                      [class]="item.completed ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800'"
                      (click)="handleChecklistToggle(j.id, item.id, item.label)"
                    >
                      <div class="flex items-center gap-2.5 text-xs">
                        <input 
                          type="checkbox" 
                          [checked]="item.completed"
                          class="rounded text-emerald-600 focus:ring-0 cursor-pointer"
                        />
                        <span [class]="item.completed ? 'text-emerald-950 dark:text-emerald-300 font-medium line-through' : 'text-slate-800 dark:text-slate-200 font-medium'">
                          {{ item.label }}
                        </span>
                      </div>

                      @if (item.completed) {
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">Checked ✓</span>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Photographic Proof Uploader -->
              <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900">
                <app-photo-uploader 
                  [photos]="j.photos"
                  (photoUploaded)="handlePhotoUpload(j.id, $event)"
                />
              </div>

              <!-- Customer Signature Verification Pad Trigger -->
              @if (showSignoffPad() || j.customerSignoff) {
                <div class="pt-2">
                  @if (j.customerSignoff) {
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <mat-icon class="text-emerald-700 dark:text-emerald-400">verified</mat-icon>
                        <div>
                          <p class="text-xs font-bold text-emerald-950 dark:text-emerald-300">Customer Verification Recorded</p>
                          <p class="text-[11px] text-emerald-700 dark:text-emerald-400">Signed by {{ j.customerSignoff.clientName }} with a {{ j.customerSignoff.rating }}.0 ★ rating</p>
                        </div>
                      </div>
                      <img [src]="j.customerSignoff.signatureDataUrl" alt="Signature" class="h-10 border rounded bg-white px-2 py-0.5" />
                    </div>
                  } @else {
                    <app-signature-pad 
                      [initialClientName]="j.client.name"
                      (signoffCompleted)="handleSignoff(j.id, $event)"
                      (cancelled)="showSignoffPad.set(false)"
                    />
                  }
                </div>
              }
            </div>
          </div>
        } @else {
          <!-- Empty active job state -->
          <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
            <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <mat-icon>check_circle_outline</mat-icon>
            </div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200">No Currently Active Site Work</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 max-w-sm mx-auto">
              Select an assigned installation from the map or queue below to review and begin site work.
            </p>
            <button 
              type="button" 
              (click)="activeTab.set('map')"
              class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <mat-icon class="!text-xs text-emerald-400 dark:text-emerald-600">navigation</mat-icon>
              <span>View Map & Routes</span>
            </button>
          </div>
        }
      }

      <!-- ================================================================= -->
      <!-- TAB 3: ASSIGNED QUEUE VIEW                                        -->
      <!-- ================================================================= -->
      @if (activeTab() === 'queue') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Your Assigned Installation Queue</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Upcoming door installations allocated to {{ activeInstaller().name }}</p>
            </div>
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ installerJobs().length }} Total Jobs</span>
          </div>

          @if (installerJobs().length === 0) {
            <p class="text-xs text-slate-400 py-4 text-center">No additional jobs assigned at this time.</p>
          } @else {
            <div class="space-y-3">
              @for (job of installerJobs(); track job.id) {
                <div 
                  class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold text-slate-900 dark:text-white">{{ job.id }}</span>
                      <span class="text-slate-400 dark:text-slate-600">·</span>
                      <span class="text-xs font-bold text-slate-800 dark:text-slate-200">{{ job.doorModel }}</span>
                      <span class="text-[10px] font-semibold px-2 py-0.5 rounded uppercase" [class]="getStatusClass(job.status)">
                        {{ job.status }}
                      </span>
                      @if (job.installerAssignmentStatus !== 'accepted' && job.installerAssignmentStatus !== 'rejected') {
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                          Installer: Pending
                        </span>
                      }
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span>Client: <strong class="text-slate-700 dark:text-slate-300">{{ job.client.name }}</strong></span>
                      <span>·</span>
                      <span>Site: {{ job.client.siteAddress }}</span>
                      <span>·</span>
                      <span>Scheduled: <strong class="text-slate-700 dark:text-slate-300 font-mono">{{ job.scheduledDate }}</strong></span>
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="text-right">
                      <span class="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono">+&#36;{{ job.financials.bonusAmount }}</span>
                      <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase">Eligible Bonus</span>
                    </div>

                    <!-- Open on Map Button -->
                    <button 
                      type="button"
                      (click)="openNavigation(job)"
                      class="px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1 shadow-xs"
                      title="Plot Route on Interactive Map"
                    >
                      <mat-icon class="!text-xs">navigation</mat-icon>
                      <span>Route</span>
                    </button>

                    @if (job.status === 'assigned') {
                      <button 
                        type="button"
                        (click)="handleAccept(job.id)"
                        class="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">handshake</mat-icon>
                        <span>Accept</span>
                      </button>
                    }
                    
                    <button 
                      type="button"
                      (click)="jobSelected.emit(job.id)"
                      class="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- ================================================================= -->
      <!-- MODAL CALL CLIENT (CLEAN REPLACEMENT FOR WINDOW.ALERT)           -->
      <!-- ================================================================= -->
      @if (callModalData()) {
        @let c = callModalData()!;
        <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full shadow-2xl text-slate-900 dark:text-white space-y-4 animate-in zoom-in-95 rounded-2xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <mat-icon class="!text-base">call</mat-icon>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">Direct Client Contact</h4>
              </div>
              <button 
                type="button" 
                (click)="callModalData.set(null)"
                class="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            </div>

            <div class="space-y-2.5 text-xs">
              <div>
                <span class="text-slate-400 dark:text-slate-500 uppercase font-mono text-[10px] block">Client Name</span>
                <p class="text-base font-extrabold text-slate-900 dark:text-white">{{ c.name }}</p>
              </div>

              <div>
                <span class="text-slate-400 dark:text-slate-500 uppercase font-mono text-[10px] block">Direct Phone</span>
                <p class="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400">{{ c.phone }}</p>
              </div>

              <div>
                <span class="text-slate-400 dark:text-slate-500 uppercase font-mono text-[10px] block">Site Location</span>
                <p class="text-xs text-slate-600 dark:text-slate-300">{{ c.siteAddress }}</p>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <a 
                [href]="'tel:' + c.phone"
                class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <mat-icon class="!text-xs">phone</mat-icon>
                <span>Call Phone Directly</span>
              </a>

              <button 
                type="button"
                (click)="copyToClipboard(c.phone)"
                class="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {{ copiedPhone() ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Rejection Modal -->
      @if (rejectingJobId()) {
        <app-rejection-modal
          [jobId]="rejectingJobId()!"
          [roleTitle]="'Field Installer / Technician'"
          [isDriver]="false"
          (rejected)="handleRejectSubmit($event)"
          (canceled)="rejectingJobId.set(null)"
        ></app-rejection-modal>
      }
    </div>
  `
            }]
    }], null, { jobSelected: [{ type: i0.Output, args: ["jobSelected"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InstallerPortal, { className: "InstallerPortal", filePath: "frontend/src/app/views/installer-portal/installer-portal.ts", lineNumber: 739 }); })();
