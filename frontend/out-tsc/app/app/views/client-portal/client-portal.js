import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { SignaturePad } from '../../components/signature-pad/signature-pad';
import { OsmLiveMap } from '../../components/osm-live-map/osm-live-map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function ClientPortal_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", job_r1.client.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", job_r1.client.name, " (", job_r1.doorModel, ")");
} }
function ClientPortal_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 4)(2, "mat-icon", 15);
    i0.ɵɵtext(3, "info");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 16);
    i0.ɵɵlistener("click", function ClientPortal_Conditional_24_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.portalAlert.set(null)); });
    i0.ɵɵelementStart(7, "mat-icon", 17);
    i0.ɵɵtext(8, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.portalAlert());
} }
function ClientPortal_Conditional_25_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Technician Is On Site & Installing Lock ");
} }
function ClientPortal_Conditional_25_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Truck Arrived \u00B7 Door & Lock Delivered ");
} }
function ClientPortal_Conditional_25_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Logistics Truck En Route \u00B7 Real-Time GPS ");
} }
function ClientPortal_Conditional_25_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Delivery Truck & Technician Assigned ");
} }
function ClientPortal_Conditional_25_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Field Installer Assigned \u00B7 Awaiting Store Dispatch ");
} }
function ClientPortal_Conditional_25_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Booked at Shop \u00B7 Preparing Technician Assignment ");
} }
function ClientPortal_Conditional_25_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Installation Complete & Verified ");
} }
function ClientPortal_Conditional_25_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Door In Preparation ");
} }
function ClientPortal_Conditional_25_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵtextInterpolate1(" Truck ", (j_r5.logisticsTruck == null ? null : j_r5.logisticsTruck.truckPlate) || "Logistics Fleet", " ~14 mins away ");
} }
function ClientPortal_Conditional_25_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Hardware handed over to technician for smart lock mounting ");
} }
function ClientPortal_Conditional_25_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Active site assembly & mortise lock calibration in progress ");
} }
function ClientPortal_Conditional_25_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵtextInterpolate2(" Assigned Installer: ", j_r5.assignedInstallerName || "Technician", " \u00B7 Scheduled ", j_r5.scheduledDate, " ");
} }
function ClientPortal_Conditional_25_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵtextInterpolate1(" Scheduled for: ", j_r5.scheduledDate, " ");
} }
function ClientPortal_Conditional_25_Conditional_158_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61)(1, "span", 49);
    i0.ɵɵtext(2, "Shop Receipt:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 66);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(j_r5.shopBooking.receiptNumber);
} }
function ClientPortal_Conditional_25_Conditional_166_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 63);
    i0.ɵɵtext(1, " Verified & Archived ");
    i0.ɵɵelementEnd();
} }
function ClientPortal_Conditional_25_Conditional_167_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 41)(2, "div", 4)(3, "mat-icon", 67);
    i0.ɵɵtext(4, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h5", 68);
    i0.ɵɵtext(6, "Official Certificate of Satisfactory Installation");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 69);
    i0.ɵɵtext(8, "Warranty Active");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 70)(10, "div", 71)(11, "p")(12, "strong");
    i0.ɵɵtext(13, "Signed by:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p")(16, "strong");
    i0.ɵɵtext(17, "Rating:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 72);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "p", 73);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 74)(23, "span", 75);
    i0.ɵɵtext(24, "Archived Signature");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "img", 76);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate1(" ", j_r5.customerSignoff.clientName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", j_r5.customerSignoff.rating, ".0 / 5.0 \u2605");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\"", j_r5.customerSignoff.feedback, "\"");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("src", j_r5.customerSignoff.signatureDataUrl, i0.ɵɵsanitizeUrl);
} }
function ClientPortal_Conditional_25_Conditional_168_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-signature-pad", 77);
    i0.ɵɵlistener("signoffCompleted", function ClientPortal_Conditional_25_Conditional_168_Template_app_signature_pad_signoffCompleted_0_listener($event) { i0.ɵɵrestoreView(_r6); i0.ɵɵnextContext(); const j_r5 = i0.ɵɵreadContextLet(0); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleSignoff(j_r5.id, $event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const j_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("initialClientName", j_r5.client.name);
} }
function ClientPortal_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 18)(2, "div", 19)(3, "div", 20)(4, "div", 21);
    i0.ɵɵelement(5, "span", 22)(6, "span", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div")(8, "span", 24);
    i0.ɵɵconditionalCreate(9, ClientPortal_Conditional_25_Conditional_9_Template, 1, 0)(10, ClientPortal_Conditional_25_Conditional_10_Template, 1, 0)(11, ClientPortal_Conditional_25_Conditional_11_Template, 1, 0)(12, ClientPortal_Conditional_25_Conditional_12_Template, 1, 0)(13, ClientPortal_Conditional_25_Conditional_13_Template, 1, 0)(14, ClientPortal_Conditional_25_Conditional_14_Template, 1, 0)(15, ClientPortal_Conditional_25_Conditional_15_Template, 1, 0)(16, ClientPortal_Conditional_25_Conditional_16_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 25);
    i0.ɵɵconditionalCreate(18, ClientPortal_Conditional_25_Conditional_18_Template, 1, 1)(19, ClientPortal_Conditional_25_Conditional_19_Template, 1, 0)(20, ClientPortal_Conditional_25_Conditional_20_Template, 1, 0)(21, ClientPortal_Conditional_25_Conditional_21_Template, 1, 2)(22, ClientPortal_Conditional_25_Conditional_22_Template, 1, 1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 4)(24, "button", 26);
    i0.ɵɵlistener("click", function ClientPortal_Conditional_25_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleMapSatellite()); });
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 27);
    i0.ɵɵlistener("click", function ClientPortal_Conditional_25_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.copyTrackingLink()); });
    i0.ɵɵelementStart(27, "mat-icon", 17);
    i0.ɵɵtext(28, "share");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "Share");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(31, "div", 28);
    i0.ɵɵelement(32, "app-osm-live-map", 29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 30)(34, "div", 31)(35, "h3", 32);
    i0.ɵɵtext(36, "Complete Installation & Delivery Timeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 33);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 34)(40, "div", 35)(41, "span", 36);
    i0.ɵɵtext(42, "Step 1");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p", 37);
    i0.ɵɵtext(44, "Shop Booked");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 38);
    i0.ɵɵtext(46, "Payment Paid");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 35)(48, "span", 36);
    i0.ɵɵtext(49, "Step 2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "p", 37);
    i0.ɵɵtext(51, "Truck Set Up");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "span", 38);
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "div", 35)(55, "span", 36);
    i0.ɵɵtext(56, "Step 3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "p", 37);
    i0.ɵɵtext(58, "Site Funds");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span", 38);
    i0.ɵɵtext(60, "Accountant Released");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "div", 35)(62, "span", 36);
    i0.ɵɵtext(63, "Step 4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "p", 37);
    i0.ɵɵtext(65, "En Route");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "span", 38);
    i0.ɵɵtext(67, "GPS Live");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(68, "div", 35)(69, "span", 36);
    i0.ɵɵtext(70, "Step 5");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "p", 37);
    i0.ɵɵtext(72, "Delivered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "span", 38);
    i0.ɵɵtext(74, "Cargo Handed Over");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "div", 35)(76, "span", 36);
    i0.ɵɵtext(77, "Step 6");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "p", 37);
    i0.ɵɵtext(79, "Lock Install");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "span", 38);
    i0.ɵɵtext(81, "Tech Assembling");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(82, "div", 35)(83, "span", 36);
    i0.ɵɵtext(84, "Step 7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(85, "p", 37);
    i0.ɵɵtext(86, "Verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "span", 38);
    i0.ɵɵtext(88, "Warranty Active");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(89, "div", 39)(90, "div", 40)(91, "div", 41)(92, "h4", 32);
    i0.ɵɵtext(93, "Logistics Dispatcher & Truck");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "span", 42);
    i0.ɵɵtext(95, " Heavy Transport ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(96, "div", 43)(97, "div", 9)(98, "div", 44)(99, "mat-icon");
    i0.ɵɵtext(100, "local_shipping");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(101, "div")(102, "h5", 45);
    i0.ɵɵtext(103);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "p", 46);
    i0.ɵɵtext(105);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(106, "p", 47);
    i0.ɵɵtext(107);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(108, "div", 48)(109, "span", 49);
    i0.ɵɵtext(110, "Phone:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(111, "span", 50);
    i0.ɵɵtext(112);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(113, "div", 40)(114, "div", 41)(115, "h4", 32);
    i0.ɵɵtext(116, "Field Installer / Locksmith");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(117, "span", 51);
    i0.ɵɵtext(118, " Certified Pro ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(119, "div", 43)(120, "div", 9)(121, "div", 52)(122, "mat-icon");
    i0.ɵɵtext(123, "handyman");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(124, "div")(125, "h5", 45);
    i0.ɵɵtext(126);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(127, "p", 53);
    i0.ɵɵtext(128, "4.95 \u2605 DoorMaster Master Tech");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(129, "p", 47);
    i0.ɵɵtext(130, "Specialist: Smart Biometric Locks & Pivots");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(131, "div", 48)(132, "span", 49);
    i0.ɵɵtext(133, "Status:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(134, "span", 54);
    i0.ɵɵtext(135);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(136, "div", 40)(137, "div", 41)(138, "h4", 32);
    i0.ɵɵtext(139, "Door & Smart Lock Specs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(140, "span", 55);
    i0.ɵɵtext(141, " Order Specs ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(142, "div", 56)(143, "div", 57)(144, "span", 49);
    i0.ɵɵtext(145, "Door Model:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(146, "strong", 58);
    i0.ɵɵtext(147);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(148, "div", 57)(149, "span", 49);
    i0.ɵɵtext(150, "Lock Hardware:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(151, "span", 59);
    i0.ɵɵtext(152);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(153, "div", 57)(154, "span", 49);
    i0.ɵɵtext(155, "Dimensions:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(156, "span", 60);
    i0.ɵɵtext(157);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(158, ClientPortal_Conditional_25_Conditional_158_Template, 5, 1, "div", 61);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(159, "div", 30)(160, "div", 31)(161, "div")(162, "h4", 32);
    i0.ɵɵtext(163, "Customer Verification & Warranty Activation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(164, "p", 62);
    i0.ɵɵtext(165, "Digital touch signature confirms satisfactory lock & door installation");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(166, ClientPortal_Conditional_25_Conditional_166_Template, 2, 0, "span", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(167, ClientPortal_Conditional_25_Conditional_167_Template, 26, 4, "div", 64)(168, ClientPortal_Conditional_25_Conditional_168_Template, 1, 1, "app-signature-pad", 65);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const j_r7 = i0.ɵɵstoreLet(ctx_r2.currentJob());
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(j_r7.status === "on_site" ? 9 : j_r7.status === "delivered_on_site" ? 10 : j_r7.status === "dispatched" ? 11 : j_r7.status === "truck_assigned" ? 12 : j_r7.status === "assigned" ? 13 : j_r7.status === "booked_at_shop" ? 14 : j_r7.status === "completed" || j_r7.status === "bonus_awarded" ? 15 : 16);
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(j_r7.status === "dispatched" ? 18 : j_r7.status === "delivered_on_site" ? 19 : j_r7.status === "on_site" ? 20 : j_r7.status === "assigned" ? 21 : 22);
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r2.isSatellite() ? "bg-indigo-600 text-white border-indigo-500" : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isSatellite() ? "Satellite Mode" : "Vector Map", " ");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("mode", "client-single")("targetJob", j_r7);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Order #", j_r7.id);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 1));
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 2));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((j_r7.logisticsTruck == null ? null : j_r7.logisticsTruck.truckPlate) || "Assigned");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 3));
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 4));
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 5));
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 6));
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap(ctx_r2.getStepClass(j_r7.status, 7));
    i0.ɵɵadvance(21);
    i0.ɵɵtextInterpolate(j_r7.dispatcherName || "Emmanuel Kojo");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Truck: ", (j_r7.logisticsTruck == null ? null : j_r7.logisticsTruck.truckPlate) || "GT-4821-26");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((j_r7.logisticsTruck == null ? null : j_r7.logisticsTruck.truckModel) || "Mercedes-Benz Heavy Flatbed");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((j_r7.logisticsTruck == null ? null : j_r7.logisticsTruck.dispatcherPhone) || "+233 24 555 0192");
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(j_r7.assignedInstallerName || "Marcus Vance");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1(" ", j_r7.status === "on_site" ? "Clocked In On Site" : "Cleared for Site", " ");
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(j_r7.doorModel);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r7.lockModel || "Smart Lock Handle");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(j_r7.dimensions);
    i0.ɵɵadvance();
    i0.ɵɵconditional(j_r7.shopBooking ? 158 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(j_r7.customerSignoff ? 166 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(j_r7.customerSignoff ? 167 : 168);
} }
export class ClientPortal {
    store = inject(InstallationStore);
    jobSelected = output();
    showSigningPad = signal(false, ...(ngDevMode ? [{ debugName: "showSigningPad" }] : /* istanbul ignore next */ []));
    isSatellite = signal(false, ...(ngDevMode ? [{ debugName: "isSatellite" }] : /* istanbul ignore next */ []));
    portalAlert = signal(null, ...(ngDevMode ? [{ debugName: "portalAlert" }] : /* istanbul ignore next */ []));
    currentJob = computed(() => {
        const cliId = this.store.currentClientId();
        return this.store.jobs().find(j => j.client.id === cliId) || this.store.jobs()[0];
    }, ...(ngDevMode ? [{ debugName: "currentJob" }] : /* istanbul ignore next */ []));
    onClientChange(event) {
        const target = event.target;
        this.store.currentClientId.set(target.value);
    }
    toggleMapSatellite() {
        this.isSatellite.update(v => !v);
    }
    copyTrackingLink() {
        navigator.clipboard?.writeText(window.location.href);
        this.showAlert('Live client tracking link copied to clipboard!');
    }
    handleCallDriverClick(job) {
        this.showAlert(`Initiating call with Logistics Driver ${job.dispatcherName || 'Emmanuel Kojo'} at ${job.logisticsTruck?.dispatcherPhone || '+233 24 555 0192'}...`);
    }
    handleCallTechClick(job) {
        this.showAlert(`Initiating call with Field Technician ${job.assignedInstallerName || 'Marcus Vance'} at +233 24 881 0293...`);
    }
    handleGateCodeClick() {
        this.showAlert(`Gate code transmitted directly to delivery truck & technician navigation unit.`);
    }
    showAlert(message) {
        this.portalAlert.set(message);
        setTimeout(() => {
            if (this.portalAlert() === message) {
                this.portalAlert.set(null);
            }
        }, 3500);
    }
    handleSignoff(jobId, data) {
        this.store.submitCustomerSignoff(jobId, {
            ...data,
            siteRepresentativeName: data.clientName,
            verificationStatement: 'Verified complete and operational without defects.'
        });
        this.showSigningPad.set(false);
    }
    getStepClass(status, stepNumber) {
        const weights = {
            'draft': 1,
            'booked_at_shop': 1,
            'truck_assigned': 2,
            'approved': 2.5,
            'site_funds_dispatched': 3,
            'assigned': 3,
            'accepted': 3,
            'dispatched': 4,
            'delivered_on_site': 5,
            'on_site': 6,
            'in_progress': 6,
            'installed_pending_signoff': 6,
            'completed': 7,
            'bonus_awarded': 7
        };
        const currentWeight = weights[status] || 1;
        if (currentWeight >= stepNumber) {
            return 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-300 font-bold';
        }
        return 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500';
    }
    static ɵfac = function ClientPortal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ClientPortal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClientPortal, selectors: [["app-client-portal"]], outputs: { jobSelected: "jobSelected" }, decls: 26, vars: 5, consts: [[1, "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "shadow-xs", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-3.5"], [1, "w-12", "h-12", "rounded-2xl", "bg-indigo-600", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-lg", "shadow-sm"], [1, "flex", "items-center", "gap-2"], [1, "text-base", "sm:text-lg", "font-extrabold", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "text-xs", "text-indigo-700", "dark:text-indigo-300", "font-bold", "bg-indigo-50", "dark:bg-indigo-950/60", "px-2", "py-0.5", "rounded-md", "border", "border-indigo-200", "dark:border-indigo-800"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-0.5", "flex", "items-center", "gap-1", "font-mono"], [1, "!text-xs", "text-emerald-600", "dark:text-emerald-400"], [1, "flex", "items-center", "gap-3"], [1, "w-full", "sm:w-auto"], ["for", "clientSelectSite", 1, "block", "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase", "font-mono", "font-bold", "mb-1"], ["id", "clientSelectSite", 1, "w-full", "sm:w-auto", "text-xs", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-slate-50", "dark:bg-slate-800", "font-semibold", "text-slate-800", "dark:text-slate-200", "focus:outline-none", "focus:ring-1", "focus:ring-slate-900", "dark:focus:ring-slate-200", 3, "change", "value"], [3, "value"], [1, "p-3", "bg-indigo-950", "border", "border-indigo-500", "text-indigo-200", "rounded-xl", "text-xs", "flex", "items-center", "justify-between", "gap-3", "shadow-md", "animate-in", "fade-in"], [1, "text-indigo-400", "!text-sm"], ["type", "button", 1, "text-indigo-400", "hover:text-white", 3, "click"], [1, "!text-xs"], [1, "bg-slate-950", "rounded-2xl", "border", "border-slate-800", "overflow-hidden", "shadow-lg", "text-white"], [1, "px-5", "py-3.5", "bg-slate-900/90", "border-b", "border-slate-800", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2.5"], [1, "relative", "flex", "items-center", "justify-center"], [1, "w-3", "h-3", "rounded-full", "bg-emerald-500", "animate-ping", "absolute", "opacity-75"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-emerald-400", "relative"], [1, "text-xs", "font-mono", "font-bold", "text-white", "tracking-wide", "uppercase"], [1, "text-[11px]", "text-slate-400", "font-mono"], ["type", "button", 1, "px-2.5", "py-1", "text-[11px]", "font-mono", "font-semibold", "rounded-lg", "border", "transition-colors", 3, "click"], ["type", "button", "title", "Copy shareable tracking link", 1, "px-2.5", "py-1", "text-[11px]", "font-mono", "font-semibold", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "border", "border-slate-700", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1", 3, "click"], [1, "p-3", "bg-slate-900", "border-t", "border-slate-800"], [3, "mode", "targetJob"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-6", "shadow-xs"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", "font-bold", "text-slate-800", "dark:text-slate-200", "uppercase", "tracking-wider"], [1, "text-xs", "font-mono", "text-slate-400", "dark:text-slate-500"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "lg:grid-cols-7", "gap-2.5"], [1, "p-3", "rounded-xl", "border", "text-center", "transition-colors"], [1, "text-[9px]", "uppercase", "font-mono", "block", "mb-1"], [1, "font-bold", "text-xs"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "block", "mt-0.5"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-5"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "space-y-3", "shadow-xs"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-bold", "text-teal-700", "dark:text-teal-400", "bg-teal-50", "dark:bg-teal-950/60", "px-2", "py-0.5", "rounded", "border", "border-teal-200", "dark:border-teal-800"], [1, "p-4", "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-3"], [1, "w-10", "h-10", "rounded-xl", "bg-teal-600", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-base", "shadow-sm"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-teal-700", "dark:text-teal-400", "font-mono", "font-semibold"], [1, "text-[10px]", "text-slate-400"], [1, "pt-2", "border-t", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-between", "text-xs"], [1, "text-slate-500"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "font-bold", "text-emerald-700", "dark:text-emerald-400", "bg-emerald-50", "dark:bg-emerald-950/60", "px-2", "py-0.5", "rounded", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-600", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-base", "shadow-sm"], [1, "text-[11px]", "text-amber-500", "font-bold", "font-mono"], [1, "font-mono", "font-bold", "text-emerald-600", "dark:text-emerald-400"], [1, "text-[10px]", "font-mono", "font-bold", "text-indigo-700", "dark:text-indigo-400", "bg-indigo-50", "dark:bg-indigo-950/60", "px-2", "py-0.5", "rounded", "border", "border-indigo-200", "dark:border-indigo-800"], [1, "p-4", "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "border", "border-slate-200/80", "dark:border-slate-800", "space-y-2", "text-xs"], [1, "flex", "justify-between"], [1, "text-slate-900", "dark:text-white", "text-right"], [1, "font-bold", "text-amber-600", "dark:text-amber-400", "text-right"], [1, "font-mono", "font-bold", "text-slate-800", "dark:text-slate-200"], [1, "flex", "justify-between", "pt-1", "border-t", "border-slate-200", "dark:border-slate-700"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-xs", "font-bold", "px-2.5", "py-1", "rounded-md", "bg-emerald-100", "dark:bg-emerald-950/60", "text-emerald-800", "dark:text-emerald-400", "font-mono", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "p-5", "bg-emerald-50/70", "dark:bg-emerald-950/40", "border", "border-emerald-200", "dark:border-emerald-800", "rounded-xl", "space-y-4"], [3, "initialClientName"], [1, "font-mono", "font-bold", "text-cyan-700", "dark:text-cyan-400"], [1, "text-emerald-700", "dark:text-emerald-400"], [1, "text-sm", "font-bold", "text-emerald-950", "dark:text-emerald-300"], [1, "text-[11px]", "font-mono", "text-emerald-800", "dark:text-emerald-400"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "text-xs"], [1, "space-y-1.5", "bg-white", "dark:bg-slate-900", "p-3.5", "rounded-lg", "border", "border-emerald-100", "dark:border-emerald-900/60"], [1, "text-amber-600", "dark:text-amber-400", "font-bold", "font-mono"], [1, "text-slate-600", "dark:text-slate-300", "italic"], [1, "bg-white", "dark:bg-slate-900", "p-3.5", "rounded-lg", "border", "border-emerald-100", "dark:border-emerald-900/60", "flex", "flex-col", "items-center", "justify-center"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "font-mono", "uppercase", "mb-1"], ["alt", "Signature", 1, "h-16", "max-w-full", "object-contain", 3, "src"], [3, "signoffCompleted", "initialClientName"]], template: function ClientPortal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon");
            i0.ɵɵtext(5, "home");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div")(7, "div", 4)(8, "h2", 5);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 6);
            i0.ɵɵtext(11, " Live Site Tracking ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "p", 7)(13, "mat-icon", 8);
            i0.ɵɵtext(14, "place");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(17, "div", 9)(18, "div", 10)(19, "label", 11);
            i0.ɵɵtext(20, "Select Client Site");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "select", 12);
            i0.ɵɵlistener("change", function ClientPortal_Template_select_change_21_listener($event) { return ctx.onClientChange($event); });
            i0.ɵɵrepeaterCreate(22, ClientPortal_For_23_Template, 2, 3, "option", 13, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵconditionalCreate(24, ClientPortal_Conditional_24_Template, 9, 1, "div", 14);
            i0.ɵɵconditionalCreate(25, ClientPortal_Conditional_25_Template, 169, 36);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.currentJob().client.name);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.currentJob().client.siteAddress);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.store.currentClientId());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.store.jobs());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.portalAlert() ? 24 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentJob() ? 25 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, SignaturePad, OsmLiveMap], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClientPortal, [{
        type: Component,
        args: [{
                selector: 'app-client-portal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, SignaturePad, OsmLiveMap],
                template: `
    <div class="space-y-6">
      
      <!-- Top Site Header & Context Selector -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <mat-icon>home</mat-icon>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{{ currentJob().client.name }}</h2>
              <span class="text-xs text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                Live Site Tracking
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
              <mat-icon class="!text-xs text-emerald-600 dark:text-emerald-400">place</mat-icon>
              <span>{{ currentJob().client.siteAddress }}</span>
            </p>
          </div>
        </div>

        <!-- Switch Client Site -->
        <div class="flex items-center gap-3">
          <div class="w-full sm:w-auto">
            <label for="clientSelectSite" class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono font-bold mb-1">Select Client Site</label>
            <select 
              id="clientSelectSite"
              [value]="store.currentClientId()"
              (change)="onClientChange($event)"
              class="w-full sm:w-auto text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-200"
            >
              @for (job of store.jobs(); track job.id) {
                <option [value]="job.client.id">{{ job.client.name }} ({{ job.doorModel }})</option>
              }
            </select>
          </div>
        </div>
      </div>

      <!-- Action Toast Banner -->
      @if (portalAlert()) {
        <div class="p-3 bg-indigo-950 border border-indigo-500 text-indigo-200 rounded-xl text-xs flex items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div class="flex items-center gap-2">
            <mat-icon class="text-indigo-400 !text-sm">info</mat-icon>
            <span>{{ portalAlert() }}</span>
          </div>
          <button 
            type="button" 
            (click)="portalAlert.set(null)"
            class="text-indigo-400 hover:text-white"
          >
            <mat-icon class="!text-xs">close</mat-icon>
          </button>
        </div>
      }

      @if (currentJob()) {
        @let j = currentJob()!;

        <!-- ================================================================= -->
        <!-- LIVE GPS JOURNEY TRACKING RADAR MAP (WITH TRUCK & TECH DETAILS)  -->
        <!-- ================================================================= -->
        <div class="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg text-white">
          <!-- Live Map Header Ribbon -->
          <div class="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <div class="relative flex items-center justify-center">
                <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 relative"></span>
              </div>
              <div>
                <span class="text-xs font-mono font-bold text-white tracking-wide uppercase">
                  @if (j.status === 'on_site') { Technician Is On Site & Installing Lock }
                  @else if (j.status === 'delivered_on_site') { Truck Arrived · Door & Lock Delivered }
                  @else if (j.status === 'dispatched') { Logistics Truck En Route · Real-Time GPS }
                  @else if (j.status === 'truck_assigned') { Delivery Truck & Technician Assigned }
                  @else if (j.status === 'assigned') { Field Installer Assigned · Awaiting Store Dispatch }
                  @else if (j.status === 'booked_at_shop') { Booked at Shop · Preparing Technician Assignment }
                  @else if (j.status === 'completed' || j.status === 'bonus_awarded') { Installation Complete & Verified }
                  @else { Door In Preparation }
                </span>
                <p class="text-[11px] text-slate-400 font-mono">
                  @if (j.status === 'dispatched') { Truck {{ j.logisticsTruck?.truckPlate || 'Logistics Fleet' }} ~14 mins away }
                  @else if (j.status === 'delivered_on_site') { Hardware handed over to technician for smart lock mounting }
                  @else if (j.status === 'on_site') { Active site assembly & mortise lock calibration in progress }
                  @else if (j.status === 'assigned') { Assigned Installer: {{ j.assignedInstallerName || 'Technician' }} · Scheduled {{ j.scheduledDate }} }
                  @else { Scheduled for: {{ j.scheduledDate }} }
                </p>
              </div>
            </div>

            <!-- Map View Mode Controls -->
            <div class="flex items-center gap-2">
              <button 
                type="button"
                (click)="toggleMapSatellite()"
                class="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg border transition-colors"
                [class]="isSatellite() ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'"
              >
                {{ isSatellite() ? 'Satellite Mode' : 'Vector Map' }}
              </button>

              <button 
                type="button"
                (click)="copyTrackingLink()"
                class="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1"
                title="Copy shareable tracking link"
              >
                <mat-icon class="!text-xs">share</mat-icon>
                <span>Share</span>
              </button>
            </div>
          </div>

          <!-- OpenStreetMap Live Client Tracking -->
          <div class="p-3 bg-slate-900 border-t border-slate-800">
            <app-osm-live-map [mode]="'client-single'" [targetJob]="j"></app-osm-live-map>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- 7-STEP PROGRESS LIFECYCLE (Interactive Progress Rail)             -->
        <!-- ================================================================= -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Complete Installation & Delivery Timeline</h3>
            <span class="text-xs font-mono text-slate-400 dark:text-slate-500">Order #{{ j.id }}</span>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            <!-- Step 1: Booked & Paid at Shop -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 1)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 1</span>
              <p class="font-bold text-xs">Shop Booked</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Payment Paid</span>
            </div>

            <!-- Step 2: Truck & Dispatcher Setup -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 2)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 2</span>
              <p class="font-bold text-xs">Truck Set Up</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{{ j.logisticsTruck?.truckPlate || 'Assigned' }}</span>
            </div>

            <!-- Step 3: Site Funds Dispatched -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 3)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 3</span>
              <p class="font-bold text-xs">Site Funds</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Accountant Released</span>
            </div>

            <!-- Step 4: Dispatched En Route -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 4)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 4</span>
              <p class="font-bold text-xs">En Route</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">GPS Live</span>
            </div>

            <!-- Step 5: Delivered On Site -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 5)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 5</span>
              <p class="font-bold text-xs">Delivered</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Cargo Handed Over</span>
            </div>

            <!-- Step 6: Lock & Door Installation -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 6)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 6</span>
              <p class="font-bold text-xs">Lock Install</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Tech Assembling</span>
            </div>

            <!-- Step 7: Completed & Sign-Off -->
            <div class="p-3 rounded-xl border text-center transition-colors" [class]="getStepClass(j.status, 7)">
              <span class="text-[9px] uppercase font-mono block mb-1">Step 7</span>
              <p class="font-bold text-xs">Verified</p>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Warranty Active</span>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- THREE-COLUMN DETAILS: DISPATCHER DRIVER, INSTALLER, & SPEC SHEET  -->
        <!-- ================================================================= -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- 1. Dedicated Dispatcher & Delivery Truck Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Logistics Dispatcher & Truck</h4>
              <span class="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                Heavy Transport
              </span>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  <mat-icon>local_shipping</mat-icon>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900 dark:text-white">{{ j.dispatcherName || 'Emmanuel Kojo' }}</h5>
                  <p class="text-[11px] text-teal-700 dark:text-teal-400 font-mono font-semibold">Truck: {{ j.logisticsTruck?.truckPlate || 'GT-4821-26' }}</p>
                  <p class="text-[10px] text-slate-400">{{ j.logisticsTruck?.truckModel || 'Mercedes-Benz Heavy Flatbed' }}</p>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span class="text-slate-500">Phone:</span>
                <span class="font-mono font-bold text-slate-900 dark:text-white">{{ j.logisticsTruck?.dispatcherPhone || '+233 24 555 0192' }}</span>
              </div>
            </div>
          </div>

          <!-- 2. Assigned Field Technician Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Field Installer / Locksmith</h4>
              <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Certified Pro
              </span>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  <mat-icon>handyman</mat-icon>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900 dark:text-white">{{ j.assignedInstallerName || 'Marcus Vance' }}</h5>
                  <p class="text-[11px] text-amber-500 font-bold font-mono">4.95 ★ DoorMaster Master Tech</p>
                  <p class="text-[10px] text-slate-400">Specialist: Smart Biometric Locks & Pivots</p>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span class="text-slate-500">Status:</span>
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {{ j.status === 'on_site' ? 'Clocked In On Site' : 'Cleared for Site' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 3. Door & Lock Specifications Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Door & Smart Lock Specs</h4>
              <span class="text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                Order Specs
              </span>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-500">Door Model:</span>
                <strong class="text-slate-900 dark:text-white text-right">{{ j.doorModel }}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Lock Hardware:</span>
                <span class="font-bold text-amber-600 dark:text-amber-400 text-right">{{ j.lockModel || 'Smart Lock Handle' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Dimensions:</span>
                <span class="font-mono font-bold text-slate-800 dark:text-slate-200">{{ j.dimensions }}</span>
              </div>
              @if (j.shopBooking) {
                <div class="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span class="text-slate-500">Shop Receipt:</span>
                  <span class="font-mono font-bold text-cyan-700 dark:text-cyan-400">{{ j.shopBooking.receiptNumber }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- CUSTOMER DIGITAL SIGN-OFF & CERTIFICATE ARCHIVE                   -->
        <!-- ================================================================= -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Customer Verification & Warranty Activation</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Digital touch signature confirms satisfactory lock & door installation</p>
            </div>

            @if (j.customerSignoff) {
              <span class="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-mono border border-emerald-200 dark:border-emerald-800">
                Verified & Archived
              </span>
            }
          </div>

          @if (j.customerSignoff) {
            <div class="p-5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-emerald-700 dark:text-emerald-400">verified</mat-icon>
                  <h5 class="text-sm font-bold text-emerald-950 dark:text-emerald-300">Official Certificate of Satisfactory Installation</h5>
                </div>
                <span class="text-[11px] font-mono text-emerald-800 dark:text-emerald-400">Warranty Active</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div class="space-y-1.5 bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                  <p><strong>Signed by:</strong> {{ j.customerSignoff.clientName }}</p>
                  <p><strong>Rating:</strong> <span class="text-amber-600 dark:text-amber-400 font-bold font-mono">{{ j.customerSignoff.rating }}.0 / 5.0 ★</span></p>
                  <p class="text-slate-600 dark:text-slate-300 italic">"{{ j.customerSignoff.feedback }}"</p>
                </div>

                <div class="bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60 flex flex-col items-center justify-center">
                  <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase mb-1">Archived Signature</span>
                  <img [src]="j.customerSignoff.signatureDataUrl" alt="Signature" class="h-16 max-w-full object-contain" />
                </div>
              </div>
            </div>
          } @else {
            <app-signature-pad 
              [initialClientName]="j.client.name"
              (signoffCompleted)="handleSignoff(j.id, $event)"
            />
          }
        </div>
      }
    </div>
  `
            }]
    }], null, { jobSelected: [{ type: i0.Output, args: ["jobSelected"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ClientPortal, { className: "ClientPortal", filePath: "frontend/src/app/views/client-portal/client-portal.ts", lineNumber: 340 }); })();
