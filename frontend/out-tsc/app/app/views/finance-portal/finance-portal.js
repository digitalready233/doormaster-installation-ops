import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function FinancePortal_Conditional_67_For_29_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 42)(1, "mat-icon", 8);
    i0.ɵɵtext(2, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Audited");
    i0.ɵɵelementEnd()();
} }
function FinancePortal_Conditional_67_For_29_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43)(1, "mat-icon", 8);
    i0.ɵɵtext(2, "pending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pending Audit");
    i0.ɵɵelementEnd()();
} }
function FinancePortal_Conditional_67_For_29_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function FinancePortal_Conditional_67_For_29_Conditional_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const job_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.verifyPayment(job_r2.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 8);
    i0.ɵɵtext(2, "done_all");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Verify & Audit");
    i0.ɵɵelementEnd()();
} }
function FinancePortal_Conditional_67_For_29_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 46);
    i0.ɵɵtext(1, "Audit Verified");
    i0.ɵɵelementEnd();
} }
function FinancePortal_Conditional_67_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 32)(1, "td", 33)(2, "span", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 35);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 36)(7, "p", 37);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 38);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td", 36)(12, "p", 37);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 39);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 40);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 33)(19, "span", 41);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "td", 36);
    i0.ɵɵconditionalCreate(22, FinancePortal_Conditional_67_For_29_Conditional_22_Template, 5, 0, "span", 42)(23, FinancePortal_Conditional_67_For_29_Conditional_23_Template, 5, 0, "span", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td", 44);
    i0.ɵɵconditionalCreate(25, FinancePortal_Conditional_67_For_29_Conditional_25_Template, 5, 0, "button", 45)(26, FinancePortal_Conditional_67_For_29_Conditional_26_Template, 2, 0, "span", 46);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((job_r2.shopBooking == null ? null : job_r2.shopBooking.receiptNumber) || "REC-PENDING");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r2.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r2.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r2.lockModel || "Smart Lock Handle");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r2.client.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r2.client.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", ((job_r2.shopBooking == null ? null : job_r2.shopBooking.amountPaidAtShop) || job_r2.financials.doorPrice).toLocaleString(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (job_r2.shopBooking == null ? null : job_r2.shopBooking.paymentMethod) || "momo", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((job_r2.shopBooking == null ? null : job_r2.shopBooking.accountantVerified) ? 22 : 23);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!(job_r2.shopBooking == null ? null : job_r2.shopBooking.accountantVerified) ? 25 : 26);
} }
function FinancePortal_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 22)(2, "div")(3, "h3", 23);
    i0.ɵɵtext(4, "Shop Counter Payment Registry & Verification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 24);
    i0.ɵɵtext(6, "Accountant audit of client cash, MoMo and POS payments recorded at the shop counter");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 25);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 26)(10, "table", 27)(11, "thead")(12, "tr", 28)(13, "th", 29);
    i0.ɵɵtext(14, "Receipt & Job ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 29);
    i0.ɵɵtext(16, "Door & Lock Ordered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 29);
    i0.ɵɵtext(18, "Client / Site Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 29);
    i0.ɵɵtext(20, "Amount Paid at Shop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th", 29);
    i0.ɵɵtext(22, "Method & Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th", 29);
    i0.ɵɵtext(24, "Audit Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th", 30);
    i0.ɵɵtext(26, "Accountant Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "tbody", 31);
    i0.ɵɵrepeaterCreate(28, FinancePortal_Conditional_67_For_29_Template, 27, 10, "tr", 32, _forTrack0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r2.shopOrders().length, " Orders");
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r2.shopOrders());
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 50)(1, "mat-icon", 57);
    i0.ɵɵtext(2, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r4.assignedInstallerName);
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43)(1, "mat-icon", 8);
    i0.ɵɵtext(2, "hourglass_top");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Installer: Pending");
    i0.ɵɵelementEnd()();
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 42)(2, "mat-icon", 8);
    i0.ɵɵtext(3, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Funds Dispatched");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 58);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("Ref: ", job_r4.technicianSiteFunds.transactionRef);
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43)(1, "mat-icon", 8);
    i0.ɵɵtext(2, "hourglass_top");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Awaiting Dispatch");
    i0.ɵɵelementEnd()();
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 59);
    i0.ɵɵlistener("click", function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const job_r4 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openDispatchModal(job_r4)); });
    i0.ɵɵelementStart(1, "mat-icon", 8);
    i0.ɵɵtext(2, "send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Dispatch \u20B5", job_r4.technicianSiteFunds.amount);
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "Disbursed");
    i0.ɵɵelementEnd();
} }
function FinancePortal_Conditional_68_For_27_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 32)(1, "td", 33)(2, "span", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 36);
    i0.ɵɵconditionalCreate(7, FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_7_Template, 5, 1, "p", 50)(8, FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_8_Template, 5, 0, "span", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 36)(10, "p", 51);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 52);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td", 36)(15, "p", 53);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 54);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 33);
    i0.ɵɵconditionalCreate(20, FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_20_Template, 8, 1, "div")(21, FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_21_Template, 5, 0, "span", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 44);
    i0.ɵɵconditionalCreate(23, FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_23_Template, 5, 1, "button", 55)(24, FinancePortal_Conditional_68_For_27_Conditional_0_Conditional_24_Template, 2, 0, "span", 56);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r4.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r4.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r4.assignedInstallerName ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r4.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Client: ", job_r4.client.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r4.technicianSiteFunds.purpose);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u20B5", job_r4.technicianSiteFunds.amount.toLocaleString());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(job_r4.technicianSiteFunds.status === "dispatched" ? 20 : 21);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(job_r4.technicianSiteFunds.status !== "dispatched" ? 23 : 24);
} }
function FinancePortal_Conditional_68_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, FinancePortal_Conditional_68_For_27_Conditional_0_Template, 25, 9, "tr", 32);
} if (rf & 2) {
    const job_r4 = ctx.$implicit;
    i0.ɵɵconditional(job_r4.technicianSiteFunds ? 0 : -1);
} }
function FinancePortal_Conditional_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 22)(2, "div")(3, "h3", 23);
    i0.ɵɵtext(4, "Field Technician Site Mobilization & Transit Funds");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 24);
    i0.ɵɵtext(6, "Accountant dispatches transport stipend & lock tooling allowance so technicians can visit client sites");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 48);
    i0.ɵɵtext(8, "Standard Allowance: \u20B5250.00 / site");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 26)(10, "table", 27)(11, "thead")(12, "tr", 28)(13, "th", 29);
    i0.ɵɵtext(14, "Installation Job");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 29);
    i0.ɵɵtext(16, "Assigned Technician");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 29);
    i0.ɵɵtext(18, "Destination Site");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 29);
    i0.ɵɵtext(20, "Stipend Purpose");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th", 29);
    i0.ɵɵtext(22, "Disbursement Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th", 30);
    i0.ɵɵtext(24, "Fund Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "tbody", 31);
    i0.ɵɵrepeaterCreate(26, FinancePortal_Conditional_68_For_27_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(26);
    i0.ɵɵrepeater(ctx_r2.store.jobs());
} }
function FinancePortal_Conditional_69_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 32)(1, "td", 29)(2, "span", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 61);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 62);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 63);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 64);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 65);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 66);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const job_r6 = ctx.$implicit;
    const collected_r7 = (job_r6.shopBooking == null ? null : job_r6.shopBooking.amountPaidAtShop) || job_r6.financials.doorPrice + job_r6.financials.installationFee;
    const mobilization_r8 = job_r6.technicianSiteFunds && job_r6.technicianSiteFunds.status === "dispatched" ? job_r6.technicianSiteFunds.amount || 0 : 0;
    const margin_r9 = collected_r7 - mobilization_r8 - job_r6.financials.laborCost - (job_r6.financials.bonusStatus === "approved" ? job_r6.financials.bonusAmount : 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r6.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r6.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", job_r6.client.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", collected_r7.toLocaleString(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", mobilization_r8.toLocaleString(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", job_r6.financials.laborCost, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", job_r6.financials.bonusAmount, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" \u20B5", margin_r9.toLocaleString(), " ");
} }
function FinancePortal_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 60)(2, "div")(3, "h3", 23);
    i0.ɵɵtext(4, "End-to-End Installation Process Transaction Ledger");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 24);
    i0.ɵɵtext(6, "Full audit trail of shop collections, site mobilization funds, labor costs, and installer bonuses");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 25);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 26)(10, "table", 27)(11, "thead")(12, "tr", 28)(13, "th", 29);
    i0.ɵɵtext(14, "Order & Door");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 29);
    i0.ɵɵtext(16, "Client");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 30);
    i0.ɵɵtext(18, "Shop Collected");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 30);
    i0.ɵɵtext(20, "Site Mobilization");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th", 30);
    i0.ɵɵtext(22, "Labor Cost");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th", 30);
    i0.ɵɵtext(24, "Installer Bonus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th", 30);
    i0.ɵɵtext(26, "Net Margin");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "tbody", 31);
    i0.ɵɵrepeaterCreate(28, FinancePortal_Conditional_69_For_29_Template, 18, 8, "tr", 32, _forTrack0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r2.store.jobs().length, " Entries");
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r2.store.jobs());
} }
function FinancePortal_Conditional_70_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 67)(2, "div", 68)(3, "div", 69)(4, "div", 70)(5, "mat-icon", 71);
    i0.ɵɵtext(6, "payments");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h3", 72);
    i0.ɵɵtext(9, "Dispatch Technician Site Mobilization");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 24);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "button", 73);
    i0.ɵɵlistener("click", function FinancePortal_Conditional_70_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDispatchModal()); });
    i0.ɵɵelementStart(13, "mat-icon", 74);
    i0.ɵɵtext(14, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "form", 75);
    i0.ɵɵlistener("ngSubmit", function FinancePortal_Conditional_70_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmFundDispatch()); });
    i0.ɵɵelementStart(16, "div", 76)(17, "span", 77);
    i0.ɵɵtext(18, "Site Destination:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 37);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 78);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div")(24, "label", 79);
    i0.ɵɵtext(25, "Stipend Amount (\u20B5) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div")(28, "label", 81);
    i0.ɵɵtext(29, "Payment Channel *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 82)(31, "option", 83);
    i0.ɵɵtext(32, "MTN Mobile Money (MoMo)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 84);
    i0.ɵɵtext(34, "Telecel Cash");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 85);
    i0.ɵɵtext(36, "Direct Petty Cash Voucher");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 86);
    i0.ɵɵtext(38, "GCB / Ecobank Instant Pay");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div")(40, "label", 87);
    i0.ɵɵtext(41, "Transaction Reference # *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div")(44, "label", 89);
    i0.ɵɵtext(45, "Audit Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(46, "input", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 91)(48, "button", 92);
    i0.ɵɵlistener("click", function FinancePortal_Conditional_70_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDispatchModal()); });
    i0.ɵɵtext(49, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "button", 93)(51, "mat-icon", 71);
    i0.ɵɵtext(52, "send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span");
    i0.ɵɵtext(54, "Release Funds to Technician");
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const job_r11 = ctx_r2.activeDispatchJob();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate2("Order ", job_r11.id, " \u00B7 Technician: ", job_r11.assignedInstallerName || "Installer");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r2.dispatchForm);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(job_r11.client.siteAddress);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Client: ", job_r11.client.name, " \u00B7 Door: ", job_r11.doorModel);
    i0.ɵɵadvance(28);
    i0.ɵɵproperty("disabled", !ctx_r2.dispatchForm.valid);
} }
export class FinancePortal {
    store = inject(InstallationStore);
    activeTab = signal('shop_payments', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    activeDispatchJob = signal(null, ...(ngDevMode ? [{ debugName: "activeDispatchJob" }] : /* istanbul ignore next */ []));
    dispatchForm = new FormGroup({
        amount: new FormControl(250, { nonNullable: true, validators: [Validators.required, Validators.min(10)] }),
        paymentChannel: new FormControl('MTN Mobile Money', { nonNullable: true, validators: [Validators.required] }),
        transactionRef: new FormControl(`MOMO-TRX-${Math.floor(10000 + Math.random() * 90000)}`, { nonNullable: true, validators: [Validators.required] }),
        notes: new FormControl('Site transit stipend & lock installation tooling kit', { nonNullable: true })
    });
    shopOrders = computed(() => {
        return this.store.jobs().filter(j => j.shopBooking != null || j.status === 'booked_at_shop');
    }, ...(ngDevMode ? [{ debugName: "shopOrders" }] : /* istanbul ignore next */ []));
    verifyPayment(jobId) {
        this.store.verifyShopPayment(jobId, 'Reconciled against counter POS & MoMo merchant statement');
    }
    openDispatchModal(job) {
        this.activeDispatchJob.set(job);
        this.dispatchForm.patchValue({
            amount: job.technicianSiteFunds?.amount || 250,
            transactionRef: `MOMO-TRX-${Math.floor(10000 + Math.random() * 90000)}`
        });
    }
    closeDispatchModal() {
        this.activeDispatchJob.set(null);
    }
    confirmFundDispatch() {
        const job = this.activeDispatchJob();
        if (!job || !this.dispatchForm.valid)
            return;
        const val = this.dispatchForm.getRawValue();
        this.store.dispatchTechnicianSiteFunds(job.id, {
            amount: val.amount,
            paymentChannel: val.paymentChannel,
            transactionRef: val.transactionRef,
            notes: val.notes
        });
        this.closeDispatchModal();
    }
    static ɵfac = function FinancePortal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FinancePortal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FinancePortal, selectors: [["app-finance-portal"]], decls: 71, vars: 16, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-2", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], [1, "text-amber-700", "dark:text-amber-400", "font-bold"], [1, "text-xl", "sm:text-2xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "flex", "items-center", "bg-slate-100", "dark:bg-slate-800", "p-1", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-xs"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "font-bold", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-xs"], [1, "!text-xs", "text-amber-500"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-[11px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-2xl", "sm:text-3xl", "font-black", "font-mono", "text-cyan-700", "dark:text-cyan-400", "tracking-tight", "tabular-nums"], [1, "text-[11px]", "text-slate-400", "mt-2"], [1, "text-2xl", "sm:text-3xl", "font-black", "font-mono", "text-amber-600", "dark:text-amber-400", "tracking-tight", "tabular-nums"], [1, "text-2xl", "sm:text-3xl", "font-black", "font-mono", "text-slate-900", "dark:text-white", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-amber-600", "font-bold"], [1, "text-2xl", "sm:text-3xl", "font-black", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tracking-tight", "tabular-nums"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-xs", "space-y-4"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/70", "backdrop-blur-xs", "overflow-y-auto"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-xs", "font-mono", "text-slate-500"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "border-collapse", "text-xs"], [1, "border-b", "border-slate-200", "dark:border-slate-800", "bg-slate-50/80", "dark:bg-slate-800/60", "text-[11px]", "font-semibold", "text-slate-600", "dark:text-slate-400", "uppercase", "tracking-wider"], [1, "py-3", "px-4"], [1, "py-3", "px-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800"], [1, "hover:bg-slate-50/80", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "py-3.5", "px-4", "whitespace-nowrap"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white", "block"], [1, "text-[10px]", "text-slate-400", "font-mono"], [1, "py-3.5", "px-4"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-amber-600", "dark:text-amber-400", "font-medium"], [1, "text-[10px]", "text-slate-500", "font-mono"], [1, "py-3.5", "px-4", "font-mono", "font-bold", "text-cyan-700", "dark:text-cyan-400", "text-sm", "whitespace-nowrap"], [1, "uppercase", "font-bold", "text-[10px]", "px-2", "py-0.5", "rounded", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "border", "border-slate-200", "dark:border-slate-700"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-bold", "text-emerald-700", "dark:text-emerald-400", "bg-emerald-50", "dark:bg-emerald-950/60", "px-2", "py-0.5", "rounded", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-bold", "text-amber-700", "dark:text-amber-400", "bg-amber-50", "dark:bg-amber-950/60", "px-2", "py-0.5", "rounded", "border", "border-amber-200", "dark:border-amber-800"], [1, "py-3.5", "px-4", "text-right"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "rounded-lg", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1", "ml-auto", "shadow-2xs", "active:scale-95"], [1, "text-xs", "text-slate-400", "font-mono", "italic"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "rounded-lg", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1", "ml-auto", "shadow-2xs", "active:scale-95", 3, "click"], [1, "text-xs", "font-mono", "text-amber-600", "font-bold"], [1, "text-[11px]", "text-slate-600", "dark:text-slate-400"], [1, "font-bold", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-1"], [1, "font-semibold", "text-slate-800", "dark:text-slate-200"], [1, "text-[10px]", "text-slate-400"], [1, "text-slate-700", "dark:text-slate-300", "font-medium"], [1, "font-mono", "font-bold", "text-amber-600", "dark:text-amber-400"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-amber-600", "hover:bg-amber-700", "text-white", "rounded-lg", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1", "ml-auto", "shadow-2xs", "active:scale-95"], [1, "text-xs", "text-emerald-600", "dark:text-emerald-400", "font-mono", "font-bold"], [1, "!text-xs", "text-emerald-600"], [1, "block", "text-[10px]", "text-slate-400", "font-mono", "mt-0.5"], ["type", "button", 1, "px-3.5", "py-1.5", "bg-amber-600", "hover:bg-amber-700", "text-white", "rounded-lg", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "gap-1", "ml-auto", "shadow-2xs", "active:scale-95", 3, "click"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between"], [1, "py-3", "px-4", "font-medium", "text-slate-800", "dark:text-slate-200"], [1, "py-3", "px-4", "text-right", "font-mono", "font-bold", "text-cyan-700", "dark:text-cyan-400"], [1, "py-3", "px-4", "text-right", "font-mono", "font-bold", "text-amber-600", "dark:text-amber-400"], [1, "py-3", "px-4", "text-right", "font-mono", "text-slate-600", "dark:text-slate-400"], [1, "py-3", "px-4", "text-right", "font-mono", "font-bold", "text-emerald-600", "dark:text-emerald-400"], [1, "py-3", "px-4", "text-right", "font-mono", "font-black", "text-slate-900", "dark:text-white"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-lg", "w-full", "flex", "flex-col", "overflow-hidden", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "px-6", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/50", "dark:bg-slate-800/40"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-xl", "bg-amber-600", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", 3, "click"], [1, "!text-base"], [1, "p-6", "space-y-4", "text-xs", 3, "ngSubmit", "formGroup"], [1, "bg-amber-50", "dark:bg-amber-950/40", "p-3.5", "rounded-xl", "border", "border-amber-200", "dark:border-amber-800", "space-y-1"], [1, "text-[10px]", "uppercase", "font-bold", "text-amber-800", "dark:text-amber-300", "block"], [1, "text-[11px]", "text-slate-600", "dark:text-slate-300"], ["for", "fundAmountInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "fundAmountInput", "type", "number", "formControlName", "amount", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-bold", "text-base", "text-amber-600", "dark:text-amber-400"], ["for", "fundChannelSelect", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "fundChannelSelect", "formControlName", "paymentChannel", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium"], ["value", "MTN Mobile Money"], ["value", "Telecel Cash"], ["value", "Direct Petty Cash Voucher"], ["value", "GCB / Ecobank Instant Pay"], ["for", "fundTrxInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "fundTrxInput", "type", "text", "formControlName", "transactionRef", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-bold", "text-slate-800", "dark:text-slate-200"], ["for", "fundNotesInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "fundNotesInput", "type", "text", "formControlName", "notes", "placeholder", "e.g. Cleared for fuel, tolls & smart lock installation kit", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "justify-end", "gap-3", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800"], ["type", "button", 1, "px-4", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "font-bold", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "bg-amber-600", "hover:bg-amber-700", "disabled:opacity-50", "text-white", "rounded-xl", "font-bold", "transition-all", "shadow-sm", "flex", "items-center", "gap-1.5", "active:scale-95", 3, "disabled"]], template: function FinancePortal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "Accounts & Audit Ledger");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Shop Collections & Technician Site Mobilization");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 4);
            i0.ɵɵtext(13, "Daily Reconciliation");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 5);
            i0.ɵɵtext(15, "Accountant Financial Command & Audit");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 6)(17, "button", 7);
            i0.ɵɵlistener("click", function FinancePortal_Template_button_click_17_listener() { return ctx.activeTab.set("shop_payments"); });
            i0.ɵɵelementStart(18, "mat-icon", 8);
            i0.ɵɵtext(19, "point_of_sale");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "button", 7);
            i0.ɵɵlistener("click", function FinancePortal_Template_button_click_22_listener() { return ctx.activeTab.set("tech_funds"); });
            i0.ɵɵelementStart(23, "mat-icon", 9);
            i0.ɵɵtext(24, "payments");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span");
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "button", 7);
            i0.ɵɵlistener("click", function FinancePortal_Template_button_click_27_listener() { return ctx.activeTab.set("audit_trail"); });
            i0.ɵɵelementStart(28, "mat-icon", 8);
            i0.ɵɵtext(29, "receipt_long");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span");
            i0.ɵɵtext(31, "Audit Trail");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(32, "div", 10)(33, "div", 11)(34, "span", 12);
            i0.ɵɵtext(35, "Total Shop Collections");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 13)(37, "span", 14);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "p", 15);
            i0.ɵɵtext(40, "Collected at counter by Shop Manager");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 11)(42, "span", 12);
            i0.ɵɵtext(43, "Site Funds Dispatched");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 13)(45, "span", 16);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "p", 15);
            i0.ɵɵtext(48, "Mobilization allowance for technicians");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "div", 11)(50, "span", 12);
            i0.ɵɵtext(51, "Awaiting Tech Funds");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "div", 13)(53, "span", 17);
            i0.ɵɵtext(54);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "span", 18);
            i0.ɵɵtext(56, "Requests");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "p", 15);
            i0.ɵɵtext(58, "Cleared for travel disbursement");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "div", 11)(60, "span", 12);
            i0.ɵɵtext(61, "Total Incentive Pool");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div", 13)(63, "span", 19);
            i0.ɵɵtext(64);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "p", 15);
            i0.ɵɵtext(66, "Installer performance payouts");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(67, FinancePortal_Conditional_67_Template, 30, 1, "div", 20);
            i0.ɵɵconditionalCreate(68, FinancePortal_Conditional_68_Template, 28, 0, "div", 20);
            i0.ɵɵconditionalCreate(69, FinancePortal_Conditional_69_Template, 30, 1, "div", 20);
            i0.ɵɵconditionalCreate(70, FinancePortal_Conditional_70_Template, 55, 7, "div", 21);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵclassMap(ctx.activeTab() === "shop_payments" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Shop Collections (", ctx.store.pendingFinanceVerificationJobs().length, " unverified)");
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.activeTab() === "tech_funds" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Dispatch Site Funds (", ctx.store.pendingTechMobilizationJobs().length, ")");
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.activeTab() === "audit_trail" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1(" \u20B5", ctx.store.totalShopCollections().toLocaleString(), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" \u20B5", ctx.store.totalSiteFundsDispatched().toLocaleString(), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.store.pendingTechMobilizationJobs().length, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" \u20B5", ctx.store.stats().totalBonusesAllocated.toLocaleString(), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.activeTab() === "shop_payments" ? 67 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "tech_funds" ? 68 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "audit_trail" ? 69 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeDispatchJob() ? 70 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinancePortal, [{
        type: Component,
        args: [{
                selector: 'app-finance-portal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule],
                template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Accounts & Audit Ledger</span>
            <span aria-hidden="true">·</span>
            <span>Shop Collections & Technician Site Mobilization</span>
            <span aria-hidden="true">·</span>
            <span class="text-amber-700 dark:text-amber-400 font-bold">Daily Reconciliation</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Accountant Financial Command & Audit</h1>
        </div>

        <!-- Tab Selector Switcher -->
        <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button 
            type="button"
            (click)="activeTab.set('shop_payments')"
            class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'shop_payments' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">point_of_sale</mat-icon>
            <span>Shop Collections ({{ store.pendingFinanceVerificationJobs().length }} unverified)</span>
          </button>
          <button 
            type="button"
            (click)="activeTab.set('tech_funds')"
            class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'tech_funds' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs text-amber-500">payments</mat-icon>
            <span>Dispatch Site Funds ({{ store.pendingTechMobilizationJobs().length }})</span>
          </button>
          <button 
            type="button"
            (click)="activeTab.set('audit_trail')"
            class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'audit_trail' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">receipt_long</mat-icon>
            <span>Audit Trail</span>
          </button>
        </div>
      </div>

      <!-- Financial Metrics Tiles -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Shop Collections</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400 tracking-tight tabular-nums">
              ₵{{ store.totalShopCollections().toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Collected at counter by Shop Manager</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Site Funds Dispatched</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 tracking-tight tabular-nums">
              ₵{{ store.totalSiteFundsDispatched().toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Mobilization allowance for technicians</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Awaiting Tech Funds</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ store.pendingTechMobilizationJobs().length }}
            </span>
            <span class="text-xs text-amber-600 font-bold">Requests</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Cleared for travel disbursement</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Incentive Pool</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              ₵{{ store.stats().totalBonusesAllocated.toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Installer performance payouts</p>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- TAB 1: SHOP COUNTER COLLECTIONS AUDIT                               -->
      <!-- =================================================================== -->
      @if (activeTab() === 'shop_payments') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Shop Counter Payment Registry & Verification</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Accountant audit of client cash, MoMo and POS payments recorded at the shop counter</p>
            </div>
            <span class="text-xs font-mono text-slate-500">{{ shopOrders().length }} Orders</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-4">Receipt & Job ID</th>
                  <th class="py-3 px-4">Door & Lock Ordered</th>
                  <th class="py-3 px-4">Client / Site Owner</th>
                  <th class="py-3 px-4">Amount Paid at Shop</th>
                  <th class="py-3 px-4">Method & Channel</th>
                  <th class="py-3 px-4">Audit Status</th>
                  <th class="py-3 px-4 text-right">Accountant Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (job of shopOrders(); track job.id) {
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="py-3.5 px-4 whitespace-nowrap">
                      <span class="font-mono font-bold text-slate-900 dark:text-white block">{{ job.shopBooking?.receiptNumber || 'REC-PENDING' }}</span>
                      <span class="text-[10px] text-slate-400 font-mono">{{ job.id }}</span>
                    </td>

                    <td class="py-3.5 px-4">
                      <p class="font-bold text-slate-900 dark:text-white">{{ job.doorModel }}</p>
                      <p class="text-[11px] text-amber-600 dark:text-amber-400 font-medium">{{ job.lockModel || 'Smart Lock Handle' }}</p>
                    </td>

                    <td class="py-3.5 px-4">
                      <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                      <p class="text-[10px] text-slate-500 font-mono">{{ job.client.phone }}</p>
                    </td>

                    <td class="py-3.5 px-4 font-mono font-bold text-cyan-700 dark:text-cyan-400 text-sm whitespace-nowrap">
                      ₵{{ (job.shopBooking?.amountPaidAtShop || job.financials.doorPrice).toLocaleString() }}
                    </td>

                    <td class="py-3.5 px-4 whitespace-nowrap">
                      <span class="uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {{ job.shopBooking?.paymentMethod || 'momo' }}
                      </span>
                    </td>

                    <td class="py-3.5 px-4">
                      @if (job.shopBooking?.accountantVerified) {
                        <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          <mat-icon class="!text-xs">verified</mat-icon>
                          <span>Audited</span>
                        </span>
                      } @else {
                        <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                          <mat-icon class="!text-xs">pending</mat-icon>
                          <span>Pending Audit</span>
                        </span>
                      }
                    </td>

                    <td class="py-3.5 px-4 text-right">
                      @if (!job.shopBooking?.accountantVerified) {
                        <button 
                          type="button"
                          (click)="verifyPayment(job.id)"
                          class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ml-auto shadow-2xs active:scale-95"
                        >
                          <mat-icon class="!text-xs">done_all</mat-icon>
                          <span>Verify & Audit</span>
                        </button>
                      } @else {
                        <span class="text-xs text-slate-400 font-mono italic">Audit Verified</span>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- TAB 2: DISPATCH SITE MOBILIZATION FUNDS FOR FIELD TECHNICIANS      -->
      <!-- =================================================================== -->
      @if (activeTab() === 'tech_funds') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Field Technician Site Mobilization & Transit Funds</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Accountant dispatches transport stipend & lock tooling allowance so technicians can visit client sites</p>
            </div>
            <span class="text-xs font-mono text-amber-600 font-bold">Standard Allowance: ₵250.00 / site</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-4">Installation Job</th>
                  <th class="py-3 px-4">Assigned Technician</th>
                  <th class="py-3 px-4">Destination Site</th>
                  <th class="py-3 px-4">Stipend Purpose</th>
                  <th class="py-3 px-4">Disbursement Status</th>
                  <th class="py-3 px-4 text-right">Fund Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (job of store.jobs(); track job.id) {
                  @if (job.technicianSiteFunds) {
                    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        <span class="font-mono font-bold text-slate-900 dark:text-white block">{{ job.id }}</span>
                        <span class="text-[11px] text-slate-600 dark:text-slate-400">{{ job.doorModel }}</span>
                      </td>

                      <td class="py-3.5 px-4">
                        @if (job.assignedInstallerName) {
                          <p class="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                            <mat-icon class="!text-xs text-emerald-600">handyman</mat-icon>
                            <span>{{ job.assignedInstallerName }}</span>
                          </p>
                        } @else {
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            <mat-icon class="!text-xs">hourglass_top</mat-icon>
                            <span>Installer: Pending</span>
                          </span>
                        }
                      </td>

                      <td class="py-3.5 px-4">
                        <p class="font-semibold text-slate-800 dark:text-slate-200">{{ job.client.siteAddress }}</p>
                        <p class="text-[10px] text-slate-400">Client: {{ job.client.name }}</p>
                      </td>

                      <td class="py-3.5 px-4">
                        <p class="text-slate-700 dark:text-slate-300 font-medium">{{ job.technicianSiteFunds.purpose }}</p>
                        <span class="font-mono font-bold text-amber-600 dark:text-amber-400">₵{{ job.technicianSiteFunds.amount.toLocaleString() }}</span>
                      </td>

                      <td class="py-3.5 px-4 whitespace-nowrap">
                        @if (job.technicianSiteFunds.status === 'dispatched') {
                          <div>
                            <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                              <mat-icon class="!text-xs">check_circle</mat-icon>
                              <span>Funds Dispatched</span>
                            </span>
                            <span class="block text-[10px] text-slate-400 font-mono mt-0.5">Ref: {{ job.technicianSiteFunds.transactionRef }}</span>
                          </div>
                        } @else {
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            <mat-icon class="!text-xs">hourglass_top</mat-icon>
                            <span>Awaiting Dispatch</span>
                          </span>
                        }
                      </td>

                      <td class="py-3.5 px-4 text-right">
                        @if (job.technicianSiteFunds.status !== 'dispatched') {
                          <button 
                            type="button"
                            (click)="openDispatchModal(job)"
                            class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ml-auto shadow-2xs active:scale-95"
                          >
                            <mat-icon class="!text-xs">send</mat-icon>
                            <span>Dispatch ₵{{ job.technicianSiteFunds.amount }}</span>
                          </button>
                        } @else {
                          <span class="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">Disbursed</span>
                        }
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- TAB 3: COMPLETE TRANSACTION LIFECYCLE AUDIT DASHBOARD               -->
      <!-- =================================================================== -->
      @if (activeTab() === 'audit_trail') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">End-to-End Installation Process Transaction Ledger</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Full audit trail of shop collections, site mobilization funds, labor costs, and installer bonuses</p>
            </div>
            <span class="text-xs font-mono text-slate-500">{{ store.jobs().length }} Entries</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-4">Order & Door</th>
                  <th class="py-3 px-4">Client</th>
                  <th class="py-3 px-4 text-right">Shop Collected</th>
                  <th class="py-3 px-4 text-right">Site Mobilization</th>
                  <th class="py-3 px-4 text-right">Labor Cost</th>
                  <th class="py-3 px-4 text-right">Installer Bonus</th>
                  <th class="py-3 px-4 text-right">Net Margin</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (job of store.jobs(); track job.id) {
                  @let collected = job.shopBooking?.amountPaidAtShop || (job.financials.doorPrice + job.financials.installationFee);
                  @let mobilization = (job.technicianSiteFunds && job.technicianSiteFunds.status === 'dispatched') ? (job.technicianSiteFunds.amount || 0) : 0;
                  @let margin = collected - mobilization - job.financials.laborCost - (job.financials.bonusStatus === 'approved' ? job.financials.bonusAmount : 0);
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="py-3 px-4">
                      <span class="font-mono font-bold text-slate-900 dark:text-white block">{{ job.id }}</span>
                      <span class="text-[11px] text-slate-600 dark:text-slate-400">{{ job.doorModel }}</span>
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {{ job.client.name }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-cyan-700 dark:text-cyan-400">
                      ₵{{ collected.toLocaleString() }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                      ₵{{ mobilization.toLocaleString() }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono text-slate-600 dark:text-slate-400">
                      ₵{{ job.financials.laborCost }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ₵{{ job.financials.bonusAmount }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-black text-slate-900 dark:text-white">
                      ₵{{ margin.toLocaleString() }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- MODAL: DISPATCH SITE MOBILIZATION FUNDS                            -->
      <!-- =================================================================== -->
      @if (activeDispatchJob()) {
        @let job = activeDispatchJob()!;
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">payments</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Dispatch Technician Site Mobilization</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ job.id }} · Technician: {{ job.assignedInstallerName || 'Installer' }}</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeDispatchModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <form [formGroup]="dispatchForm" (ngSubmit)="confirmFundDispatch()" class="p-6 space-y-4 text-xs">
              <div class="bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                <span class="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">Site Destination:</span>
                <p class="font-bold text-slate-900 dark:text-white">{{ job.client.siteAddress }}</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-300">Client: {{ job.client.name }} · Door: {{ job.doorModel }}</p>
              </div>

              <div>
                <label for="fundAmountInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Stipend Amount (₵) *</label>
                <input 
                  id="fundAmountInput"
                  type="number" 
                  formControlName="amount"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-base text-amber-600 dark:text-amber-400"
                />
              </div>

              <div>
                <label for="fundChannelSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Channel *</label>
                <select 
                  id="fundChannelSelect"
                  formControlName="paymentChannel"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="MTN Mobile Money">MTN Mobile Money (MoMo)</option>
                  <option value="Telecel Cash">Telecel Cash</option>
                  <option value="Direct Petty Cash Voucher">Direct Petty Cash Voucher</option>
                  <option value="GCB / Ecobank Instant Pay">GCB / Ecobank Instant Pay</option>
                </select>
              </div>

              <div>
                <label for="fundTrxInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Transaction Reference # *</label>
                <input 
                  id="fundTrxInput"
                  type="text" 
                  formControlName="transactionRef"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label for="fundNotesInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Audit Notes</label>
                <input 
                  id="fundNotesInput"
                  type="text" 
                  formControlName="notes"
                  class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. Cleared for fuel, tolls & smart lock installation kit"
                />
              </div>

              <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  (click)="closeDispatchModal()"
                  class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  [disabled]="!dispatchForm.valid"
                  class="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                >
                  <mat-icon class="!text-sm">send</mat-icon>
                  <span>Release Funds to Technician</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FinancePortal, { className: "FinancePortal", filePath: "frontend/src/app/views/finance-portal/finance-portal.ts", lineNumber: 455 }); })();
