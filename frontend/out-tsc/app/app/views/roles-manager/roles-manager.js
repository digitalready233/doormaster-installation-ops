import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function RolesManager_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.pendingUsers().length, " Pending ");
} }
function RolesManager_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.users().length, " ");
} }
function RolesManager_Conditional_47_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1, " Action Required ");
    i0.ɵɵelementEnd();
} }
function RolesManager_Conditional_47_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 61)(2, "div", 62)(3, "mat-icon", 63);
    i0.ɵɵtext(4, "notification_important");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 64)(6, "p", 65);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 66);
    i0.ɵɵtext(9, " Self-registered users start in pending status and are blocked from signing in until an Operations Manager authorizes their account. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "button", 67);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_45_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.statusFilter.set("pending")); });
    i0.ɵɵtext(11, " Filter Pending Queue ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.pendingUsers().length, " User Registration(s) Awaiting Operations Manager Approval ");
} }
function RolesManager_Conditional_47_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 68);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_51_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.searchQuery.set("")); });
    i0.ɵɵelementStart(1, "mat-icon", 8);
    i0.ɵɵtext(2, "close");
    i0.ɵɵelementEnd()();
} }
function RolesManager_Conditional_47_Conditional_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 46);
} }
function RolesManager_Conditional_47_For_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(r_r5.name);
} }
function RolesManager_Conditional_47_Conditional_86_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59)(1, "div", 69)(2, "mat-icon", 70);
    i0.ɵɵtext(3, "person_search");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "h3", 71);
    i0.ɵɵtext(5, "No matching user accounts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 72);
    i0.ɵɵtext(7, " No users found matching your search or filters. You can clear your filters or add a new user. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 73);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_86_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.addUserModalOpened.emit()); });
    i0.ɵɵelementStart(9, "mat-icon", 74);
    i0.ɵɵtext(10, "person_add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "Add New User");
    i0.ɵɵelementEnd()()();
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 90);
    i0.ɵɵtext(1, " Current ");
    i0.ɵɵelementEnd();
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Case_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 95)(1, "mat-icon", 108);
    i0.ɵɵtext(2, "hourglass_empty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Pending Approval");
    i0.ɵɵelementEnd()();
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Case_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 96)(1, "mat-icon", 94);
    i0.ɵɵtext(2, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Active");
    i0.ɵɵelementEnd()();
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Case_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 97)(1, "mat-icon", 94);
    i0.ɵɵtext(2, "block");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Deactivated");
    i0.ɵɵelementEnd()();
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Case_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 98)(1, "mat-icon", 94);
    i0.ɵɵtext(2, "cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Rejected");
    i0.ɵɵelementEnd()();
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Case_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 99);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", u_r8.status || "Active", " ");
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 109);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const u_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onApproveUser(u_r8)); });
    i0.ɵɵelementStart(1, "mat-icon", 94);
    i0.ɵɵtext(2, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Approve");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 110);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_34_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r9); const u_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onRejectUser(u_r8)); });
    i0.ɵɵelementStart(6, "mat-icon", 94);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Reject");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const u_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.actionLoadingId() === u_r8.id);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r0.actionLoadingId() === u_r8.id);
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 111);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const u_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onDeactivateUser(u_r8)); });
    i0.ɵɵelementStart(1, "mat-icon", 112);
    i0.ɵɵtext(2, "block");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Deactivate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const u_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.actionLoadingId() === u_r8.id);
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 113);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_87_For_16_Conditional_36_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const u_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onReactivateUser(u_r8)); });
    i0.ɵɵelementStart(1, "mat-icon", 94);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Reactivate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const u_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.actionLoadingId() === u_r8.id);
} }
function RolesManager_Conditional_47_Conditional_87_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 82)(1, "td", 83)(2, "div", 84)(3, "div", 85)(4, "div", 86);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "span", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 88)(8, "div", 47)(9, "span", 89);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, RolesManager_Conditional_47_Conditional_87_For_16_Conditional_11_Template, 2, 0, "span", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 91);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(14, "td", 92)(15, "span", 93)(16, "mat-icon", 94);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "td", 92);
    i0.ɵɵconditionalCreate(21, RolesManager_Conditional_47_Conditional_87_For_16_Case_21_Template, 5, 0, "span", 95)(22, RolesManager_Conditional_47_Conditional_87_For_16_Case_22_Template, 5, 0, "span", 96)(23, RolesManager_Conditional_47_Conditional_87_For_16_Case_23_Template, 5, 0, "span", 97)(24, RolesManager_Conditional_47_Conditional_87_For_16_Case_24_Template, 5, 0, "span", 98)(25, RolesManager_Conditional_47_Conditional_87_For_16_Case_25_Template, 2, 1, "span", 99);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td", 100)(27, "div", 101)(28, "mat-icon", 102);
    i0.ɵɵtext(29, "phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "td", 103)(33, "div", 104);
    i0.ɵɵconditionalCreate(34, RolesManager_Conditional_47_Conditional_87_For_16_Conditional_34_Template, 10, 2);
    i0.ɵɵconditionalCreate(35, RolesManager_Conditional_47_Conditional_87_For_16_Conditional_35_Template, 5, 1, "button", 105);
    i0.ɵɵconditionalCreate(36, RolesManager_Conditional_47_Conditional_87_For_16_Conditional_36_Template, 5, 1, "button", 106);
    i0.ɵɵelementStart(37, "button", 107);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Conditional_87_For_16_Template_button_click_37_listener() { const u_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onDeleteUser(u_r8)); });
    i0.ɵɵelementStart(38, "mat-icon", 8);
    i0.ɵɵtext(39, "delete_outline");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    let tmp_16_0;
    let tmp_21_0;
    const u_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(ctx_r0.getAvatarBg(u_r8.role));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getUserInitials(u_r8.name), " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.getStatusDotClass(u_r8.status));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(u_r8.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(u_r8.id === ((tmp_16_0 = ctx_r0.store.apiUser()) == null ? null : tmp_16_0.id) || ctx_r0.store.dataMode() === "demo" && u_r8.role === ctx_r0.store.currentRole() ? 11 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r8.email);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r0.getRoleBadgeClass(u_r8.role));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getRoleIcon(u_r8.role));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getRoleName(u_r8.role));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_21_0 = u_r8.status) === "pending" ? 21 : tmp_21_0 === "active" ? 22 : tmp_21_0 === "deactivated" ? 23 : tmp_21_0 === "rejected" ? 24 : 25);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(u_r8.phone || "No phone set");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(u_r8.status === "pending" ? 34 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(u_r8.status === "active" ? 35 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(u_r8.status === "deactivated" || u_r8.status === "rejected" ? 36 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.actionLoadingId() === u_r8.id);
} }
function RolesManager_Conditional_47_Conditional_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "table", 75)(2, "thead")(3, "tr", 76)(4, "th", 77);
    i0.ɵɵtext(5, "User Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 78);
    i0.ɵɵtext(7, "Role Assignment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 78);
    i0.ɵɵtext(9, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 79);
    i0.ɵɵtext(11, "Contact & Identity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 80);
    i0.ɵɵtext(13, "Operations Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "tbody", 81);
    i0.ɵɵrepeaterCreate(15, RolesManager_Conditional_47_Conditional_87_For_16_Template, 40, 18, "tr", 82, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(15);
    i0.ɵɵrepeater(ctx_r0.filteredUsers());
} }
function RolesManager_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "div", 18)(2, "span", 19);
    i0.ɵɵtext(3, "Total Registered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20)(5, "span", 21);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 22);
    i0.ɵɵtext(8, "accounts");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 23);
    i0.ɵɵtext(10, " Staff, Technicians & Clients ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 24)(12, "div", 25)(13, "span", 26);
    i0.ɵɵtext(14, "Pending Approval");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, RolesManager_Conditional_47_Conditional_15_Template, 2, 0, "span", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 20)(17, "span", 28);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 29);
    i0.ɵɵtext(20, "Awaiting Ops Review");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 30);
    i0.ɵɵtext(22, " Cannot sign in until approved ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 18)(24, "span", 19);
    i0.ɵɵtext(25, "Active Accounts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 20)(27, "span", 31);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 32);
    i0.ɵɵtext(30, "Authorized");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 33);
    i0.ɵɵelement(32, "span", 34);
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Fully authorized sign-ins");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(35, "div", 18)(36, "span", 19);
    i0.ɵɵtext(37, "Deactivated / Blocked");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 20)(39, "span", 35);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 36);
    i0.ɵɵtext(42, "restricted");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 23);
    i0.ɵɵtext(44, " Access immediately revoked ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(45, RolesManager_Conditional_47_Conditional_45_Template, 12, 1, "div", 37);
    i0.ɵɵelementStart(46, "div", 38)(47, "div", 39)(48, "mat-icon", 40);
    i0.ɵɵtext(49, "search");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "input", 41);
    i0.ɵɵlistener("ngModelChange", function RolesManager_Conditional_47_Template_input_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.searchQuery.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(51, RolesManager_Conditional_47_Conditional_51_Template, 3, 0, "button", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 43)(53, "button", 44);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.statusFilter.set("all")); });
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "button", 45);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.statusFilter.set("pending")); });
    i0.ɵɵelementStart(56, "span");
    i0.ɵɵtext(57, "Pending");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(58, RolesManager_Conditional_47_Conditional_58_Template, 1, 0, "span", 46);
    i0.ɵɵelementStart(59, "span");
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "button", 44);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.statusFilter.set("active")); });
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "button", 44);
    i0.ɵɵlistener("click", function RolesManager_Conditional_47_Template_button_click_63_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.statusFilter.set("deactivated")); });
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 47)(66, "span", 48);
    i0.ɵɵtext(67, "Role:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "select", 49);
    i0.ɵɵlistener("ngModelChange", function RolesManager_Conditional_47_Template_select_ngModelChange_68_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.roleFilter.set($event)); });
    i0.ɵɵelementStart(69, "option", 50);
    i0.ɵɵtext(70, "All Roles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "option", 51);
    i0.ɵɵtext(72, "Operations Manager");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "option", 52);
    i0.ɵɵtext(74, "Field Technician");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "option", 53);
    i0.ɵɵtext(76, "Shop Manager");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "option", 54);
    i0.ɵɵtext(78, "Logistics Dispatcher");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "option", 55);
    i0.ɵɵtext(80, "Account Officer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "option", 56);
    i0.ɵɵtext(82, "Client");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(83, RolesManager_Conditional_47_For_84_Template, 2, 2, "option", 57, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(85, "div", 58);
    i0.ɵɵconditionalCreate(86, RolesManager_Conditional_47_Conditional_86_Template, 13, 0, "div", 59)(87, RolesManager_Conditional_47_Conditional_87_Template, 17, 0, "div", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.users().length, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r0.store.pendingUsers().length > 0 ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80 ring-2 ring-amber-500/20" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800");
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.store.pendingUsers().length > 0 ? 15 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.pendingUsers().length, " ");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.activeUsers().length, " ");
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.store.deactivatedUsers().length, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r0.store.pendingUsers().length > 0 ? 45 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r0.searchQuery());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.searchQuery() ? 51 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r0.statusFilter() === "all" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" All (", ctx_r0.store.users().length, ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.statusFilter() === "pending" ? "bg-amber-600 text-white shadow-xs" : "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.store.pendingUsers().length > 0 ? 58 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("(", ctx_r0.store.pendingUsers().length, ")");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.statusFilter() === "active" ? "bg-emerald-600 text-white shadow-xs" : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Active (", ctx_r0.store.activeUsers().length, ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.statusFilter() === "deactivated" ? "bg-slate-700 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Deactivated (", ctx_r0.store.deactivatedUsers().length, ") ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r0.roleFilter());
    i0.ɵɵadvance(15);
    i0.ɵɵrepeater(ctx_r0.customRoles());
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.filteredUsers().length === 0 ? 86 : 87);
} }
function RolesManager_Conditional_48_For_10_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 126);
    i0.ɵɵtext(1, " Core System ");
    i0.ɵɵelementEnd();
} }
function RolesManager_Conditional_48_For_10_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 127);
    i0.ɵɵtext(1, " Custom Extension ");
    i0.ɵɵelementEnd();
} }
function RolesManager_Conditional_48_For_10_Conditional_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 132);
    i0.ɵɵelement(1, "span", 135);
    i0.ɵɵtext(2, " Active Perspective ");
    i0.ɵɵelementEnd();
} }
function RolesManager_Conditional_48_For_10_Conditional_60_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 136);
    i0.ɵɵlistener("click", function RolesManager_Conditional_48_For_10_Conditional_60_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const role_r13 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onSelectRole(role_r13.id)); });
    i0.ɵɵtext(1, " Switch into this role \u2192 ");
    i0.ɵɵelementEnd();
} }
function RolesManager_Conditional_48_For_10_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 137);
    i0.ɵɵlistener("click", function RolesManager_Conditional_48_For_10_Conditional_61_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const role_r13 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onDeleteCustomRole(role_r13)); });
    i0.ɵɵelementStart(1, "mat-icon", 74);
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} }
function RolesManager_Conditional_48_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 121)(1, "div")(2, "div", 122)(3, "div", 6)(4, "div", 123)(5, "mat-icon", 14);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h3", 124);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 125);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div");
    i0.ɵɵconditionalCreate(13, RolesManager_Conditional_48_For_10_Conditional_13_Template, 2, 0, "span", 126)(14, RolesManager_Conditional_48_For_10_Conditional_14_Template, 2, 0, "span", 127);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "p", 128);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 129)(18, "div", 130)(19, "span");
    i0.ɵɵtext(20, "Create / Book Jobs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "mat-icon", 74);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 130)(24, "span");
    i0.ɵɵtext(25, "Assign Field Technicians");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "mat-icon", 74);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 130)(29, "span");
    i0.ɵɵtext(30, "Dispatch Doors From Shop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "mat-icon", 74);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 130)(34, "span");
    i0.ɵɵtext(35, "Clock In / Clock Out On Site");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "mat-icon", 74);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 130)(39, "span");
    i0.ɵɵtext(40, "Sign Customer Verification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "mat-icon", 74);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 130)(44, "span");
    i0.ɵɵtext(45, "Authorize Installer Bonuses");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "mat-icon", 74);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 130)(49, "span");
    i0.ɵɵtext(50, "View Financial Ledger & Fees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "mat-icon", 74);
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "div", 130)(54, "span");
    i0.ɵɵtext(55, "Manage User Accounts & Approvals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "mat-icon", 74);
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(58, "div", 131);
    i0.ɵɵconditionalCreate(59, RolesManager_Conditional_48_For_10_Conditional_59_Template, 3, 0, "span", 132)(60, RolesManager_Conditional_48_For_10_Conditional_60_Template, 2, 0, "button", 133);
    i0.ɵɵconditionalCreate(61, RolesManager_Conditional_48_For_10_Conditional_61_Template, 3, 0, "button", 134);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const role_r13 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r0.store.currentRole() === role_r13.id ? "border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/10 dark:ring-white/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(role_r13.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(role_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(role_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(role_r13.isSystem ? 13 : 14);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", role_r13.description, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(role_r13.permissions.canCreateJobs ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canCreateJobs ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canAssignInstallers ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canAssignInstallers ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canDispatchDoors ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canDispatchDoors ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canClockInOut ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canClockInOut ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canSignVerification ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canSignVerification ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canApproveBonuses ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canApproveBonuses ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canViewFinancials ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canViewFinancials ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(role_r13.permissions.canManageRoles ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r13.permissions.canManageRoles ? "check_circle" : "remove_circle_outline", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.store.currentRole() === role_r13.id ? 59 : 60);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!role_r13.isSystem ? 61 : -1);
} }
function RolesManager_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 114)(1, "mat-icon", 115);
    i0.ɵɵtext(2, "verified_user");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 116)(4, "p", 117);
    i0.ɵɵtext(5, "Extensible Role Architecture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 118);
    i0.ɵɵtext(7, " DoorMaster accommodates Operations Managers, Field Technicians, Shop Managers, Logistics Dispatchers, Finance Officers, and Clients. As your operations expand, instantiate custom operational roles with granular permission matrices. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 119);
    i0.ɵɵrepeaterCreate(9, RolesManager_Conditional_48_For_10_Template, 62, 33, "div", 120, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r0.store.roles());
} }
export class RolesManager {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    customRoleModalOpened = output();
    addUserModalOpened = output();
    roleSwitched = output();
    activeTab = signal('users', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    statusFilter = signal('all', ...(ngDevMode ? [{ debugName: "statusFilter" }] : /* istanbul ignore next */ []));
    roleFilter = signal('all', ...(ngDevMode ? [{ debugName: "roleFilter" }] : /* istanbul ignore next */ []));
    actionLoadingId = signal(null, ...(ngDevMode ? [{ debugName: "actionLoadingId" }] : /* istanbul ignore next */ []));
    isRefreshing = signal(false, ...(ngDevMode ? [{ debugName: "isRefreshing" }] : /* istanbul ignore next */ []));
    customRoles = () => this.store.roles().filter(r => !r.isSystem);
    filteredUsers = computed(() => {
        const list = this.store.users();
        const q = this.searchQuery().trim().toLowerCase();
        const st = this.statusFilter();
        const rf = this.roleFilter();
        return list.filter(u => {
            // Status filter
            if (st !== 'all' && (u.status || 'active') !== st) {
                return false;
            }
            // Role filter
            if (rf !== 'all' && u.role !== rf) {
                return false;
            }
            // Search query
            if (q) {
                const nameMatch = (u.name || '').toLowerCase().includes(q);
                const emailMatch = (u.email || '').toLowerCase().includes(q);
                const phoneMatch = (u.phone || '').toLowerCase().includes(q);
                const roleMatch = (u.role || '').toLowerCase().includes(q);
                if (!nameMatch && !emailMatch && !phoneMatch && !roleMatch) {
                    return false;
                }
            }
            return true;
        });
    }, ...(ngDevMode ? [{ debugName: "filteredUsers" }] : /* istanbul ignore next */ []));
    async onRefreshUsers() {
        this.isRefreshing.set(true);
        await this.store.loadUsers();
        this.isRefreshing.set(false);
        this.alert.toastSuccess('User Accounts Refreshed', 'Synced latest user records from database.');
    }
    async onApproveUser(user) {
        this.actionLoadingId.set(user.id);
        const success = await this.store.approveUser(user.id);
        this.actionLoadingId.set(null);
        if (success) {
            this.alert.toastSuccess('User Approved', `Account for ${user.name} has been activated.`);
        }
        else {
            this.alert.toastError('Approval Failed', `Could not activate ${user.name}.`);
        }
    }
    async onRejectUser(user) {
        const confirmed = await this.alert.confirm('Reject Registration Request?', `Are you sure you want to reject registration for "${user.name}" (${user.email})?`, 'Reject Request', 'Cancel', true);
        if (!confirmed)
            return;
        this.actionLoadingId.set(user.id);
        const success = await this.store.rejectUser(user.id);
        this.actionLoadingId.set(null);
        if (success) {
            this.alert.toastWarning('Request Rejected', `Registration for ${user.name} was rejected.`);
        }
        else {
            this.alert.toastError('Rejection Failed', `Could not update status for ${user.name}.`);
        }
    }
    async onDeactivateUser(user) {
        const confirmed = await this.alert.confirm('Deactivate User Account?', `Are you sure you want to suspend "${user.name}"? They will be immediately blocked from signing in.`, 'Deactivate User', 'Cancel', true);
        if (!confirmed)
            return;
        this.actionLoadingId.set(user.id);
        const success = await this.store.deactivateUser(user.id);
        this.actionLoadingId.set(null);
        if (success) {
            this.alert.toastWarning('User Deactivated', `Account for ${user.name} has been suspended.`);
        }
        else {
            this.alert.toastError('Action Failed', `Could not deactivate ${user.name}.`);
        }
    }
    async onReactivateUser(user) {
        this.actionLoadingId.set(user.id);
        const success = await this.store.activateUser(user.id);
        this.actionLoadingId.set(null);
        if (success) {
            this.alert.toastSuccess('User Reactivated', `Account for ${user.name} is now Active.`);
        }
        else {
            this.alert.toastError('Activation Failed', `Could not reactivate ${user.name}.`);
        }
    }
    async onDeleteUser(user) {
        const confirmed = await this.alert.confirm('Permanently Delete Account?', `Are you sure you want to delete "${user.name}" (${user.email})? This action cannot be undone.`, 'Delete User', 'Cancel', true);
        if (!confirmed)
            return;
        this.actionLoadingId.set(user.id);
        const success = await this.store.deleteUserAccount(user.id);
        this.actionLoadingId.set(null);
        if (success) {
            this.alert.toastSuccess('Account Deleted', `Account for ${user.name} was permanently removed.`);
        }
        else {
            this.alert.toastError('Delete Failed', `Could not remove ${user.name}.`);
        }
    }
    async onDeleteCustomRole(role) {
        const confirmed = await this.alert.confirm('Delete Custom Role?', `Are you sure you want to delete the custom role "${role.name}"?`, 'Delete Role', 'Cancel', true);
        if (!confirmed)
            return;
        this.store.deleteCustomRole(role.id);
        this.alert.toastSuccess('Role Removed', `Custom role "${role.name}" has been deleted.`);
    }
    onSelectRole(roleId) {
        this.roleSwitched.emit(roleId);
    }
    getUserInitials(name) {
        if (!name)
            return 'DM';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1)
            return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    getAvatarBg(role) {
        switch (role) {
            case 'manager': return 'bg-emerald-600';
            case 'installer': return 'bg-blue-600';
            case 'shop_manager': return 'bg-cyan-600';
            case 'dispatcher': return 'bg-teal-600';
            case 'account_officer': return 'bg-amber-600';
            case 'client': return 'bg-indigo-600';
            default: return 'bg-purple-600';
        }
    }
    getStatusDotClass(status) {
        switch (status) {
            case 'pending': return 'bg-amber-500';
            case 'active': return 'bg-emerald-500';
            case 'deactivated': return 'bg-slate-400';
            case 'rejected': return 'bg-rose-500';
            default: return 'bg-emerald-500';
        }
    }
    getRoleName(roleId) {
        const role = this.store.roles().find(r => r.id === roleId);
        return role ? role.name : roleId;
    }
    getRoleIcon(roleId) {
        const role = this.store.roles().find(r => r.id === roleId);
        return role ? role.icon : 'person';
    }
    getRoleBadgeClass(roleId) {
        switch (roleId) {
            case 'manager':
                return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
            case 'installer':
                return 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            case 'shop_manager':
                return 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
            case 'dispatcher':
                return 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800';
            case 'account_officer':
                return 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
            case 'client':
                return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
            default:
                return 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800';
        }
    }
    static ɵfac = function RolesManager_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RolesManager)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RolesManager, selectors: [["app-roles-manager"]], outputs: { customRoleModalOpened: "customRoleModalOpened", addUserModalOpened: "addUserModalOpened", roleSwitched: "roleSwitched" }, decls: 49, vars: 11, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-2", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], [1, "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "text-xl", "sm:text-2xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "flex", "items-center", "gap-2.5"], ["type", "button", "title", "Refresh user list from MySQL", 1, "px-3", "py-2", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-xs", "cursor-pointer", "disabled:opacity-50", 3, "click", "disabled"], [1, "!text-sm", "!w-4", "!h-4"], [1, "hidden", "sm:inline"], ["type", "button", 1, "px-3.5", "py-2", "text-xs", "font-bold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "dark:bg-emerald-500", "dark:hover:bg-emerald-600", "dark:text-slate-950", "rounded-xl", "transition-all", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", "cursor-pointer", 3, "click"], ["type", "button", 1, "px-3.5", "py-2", "text-xs", "font-semibold", "text-slate-900", "dark:text-white", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "rounded-xl", "transition-colors", "flex", "items-center", "gap-1.5", "border", "border-slate-200", "dark:border-slate-700", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-2", "border-b", "border-slate-200", "dark:border-slate-800", "pb-px"], ["type", "button", 1, "relative", "px-4", "py-2.5", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-2", "cursor-pointer", "border-b-2", 3, "click"], [1, "!text-base"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-amber-500", "text-white", "animate-pulse"], [1, "px-2", "py-0.2", "text-[10px]", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-3", "sm:gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-[11px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-black", "font-mono", "text-slate-900", "dark:text-white", "tabular-nums"], [1, "text-xs", "text-slate-500", "font-mono"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2"], [1, "p-4", "rounded-2xl", "border", "shadow-xs", "transition-colors"], [1, "flex", "items-center", "justify-between", "mb-1"], [1, "text-[11px]", "font-bold", "text-amber-700", "dark:text-amber-400", "uppercase", "tracking-wider", "block"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-bold", "bg-amber-500", "text-white"], [1, "text-3xl", "font-black", "font-mono", "text-amber-600", "dark:text-amber-400", "tabular-nums"], [1, "text-xs", "text-amber-700", "dark:text-amber-400", "font-bold"], [1, "text-[11px]", "text-amber-700/80", "dark:text-amber-400/80", "mt-2"], [1, "text-3xl", "font-black", "font-mono", "text-emerald-600", "dark:text-emerald-400", "tabular-nums"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-bold"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2", "flex", "items-center", "gap-1"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500"], [1, "text-3xl", "font-black", "font-mono", "text-slate-500", "dark:text-slate-400", "tabular-nums"], [1, "text-xs", "text-slate-400", "font-mono"], [1, "p-4", "rounded-2xl", "bg-amber-50/80", "dark:bg-amber-950/40", "border", "border-amber-300", "dark:border-amber-800/80", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "text-amber-950", "dark:text-amber-200"], [1, "p-3", "sm:p-4", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs", "flex", "flex-col", "lg:flex-row", "items-stretch", "lg:items-center", "justify-between", "gap-3"], [1, "relative", "flex-1"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "!text-base", "!w-4", "!h-4"], ["type", "text", "placeholder", "Search by name, email, phone or role...", 1, "w-full", "pl-9", "pr-8", "py-2", "rounded-xl", "text-xs", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "placeholder:text-slate-400", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "absolute", "right-2.5", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200"], [1, "flex", "flex-wrap", "items-center", "gap-1.5"], ["type", "button", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "transition-all", "cursor-pointer", 3, "click"], ["type", "button", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "transition-all", "cursor-pointer", "flex", "items-center", "gap-1", 3, "click"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-amber-400"], [1, "flex", "items-center", "gap-1.5"], [1, "text-xs", "text-slate-400"], [1, "py-1.5", "px-2.5", "text-xs", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "manager"], ["value", "installer"], ["value", "shop_manager"], ["value", "dispatcher"], ["value", "account_officer"], ["value", "client"], [3, "value"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs", "overflow-hidden"], [1, "py-16", "text-center", "px-4"], [1, "overflow-x-auto"], [1, "flex", "items-start", "gap-3"], [1, "w-8", "h-8", "rounded-lg", "bg-amber-500/20", "text-amber-700", "dark:text-amber-400", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5"], [1, "!text-lg"], [1, "space-y-0.5"], [1, "text-xs", "font-bold"], [1, "text-xs", "text-amber-800", "dark:text-amber-300"], ["type", "button", 1, "px-3.5", "py-1.5", "rounded-xl", "text-xs", "font-bold", "bg-amber-600", "hover:bg-amber-700", "text-white", "shrink-0", "shadow-xs", "transition-colors", "cursor-pointer", "self-start", "sm:self-auto", 3, "click"], ["type", "button", 1, "absolute", "right-2.5", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", 3, "click"], [1, "w-12", "h-12", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-400", "mx-auto", "flex", "items-center", "justify-center", "mb-3"], [1, "!text-2xl"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white", "mb-1"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "max-w-sm", "mx-auto", "mb-4"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-xl", "transition-colors", "inline-flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-sm"], [1, "w-full", "text-left", "border-collapse", "text-xs"], [1, "border-b", "border-slate-100", "dark:border-slate-800/80", "bg-slate-50/50", "dark:bg-slate-900/50", "text-[11px]", "font-bold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider"], [1, "py-3", "px-4", "sm:px-6"], [1, "py-3", "px-4"], [1, "py-3", "px-4", "hidden", "md:table-cell"], [1, "py-3", "px-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800"], [1, "hover:bg-slate-50/60", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "py-3.5", "px-4", "sm:px-6"], [1, "flex", "items-center", "gap-3"], [1, "relative"], [1, "w-9", "h-9", "rounded-full", "flex", "items-center", "justify-center", "text-xs", "font-bold", "text-white", "uppercase", "shadow-xs", "shrink-0"], [1, "absolute", "-bottom-0.5", "-right-0.5", "w-3", "h-3", "rounded-full", "border-2", "border-white", "dark:border-slate-900"], [1, "min-w-0"], [1, "font-bold", "text-slate-900", "dark:text-white", "truncate"], [1, "text-[9px]", "font-mono", "px-1.5", "py-0.2", "rounded", "bg-indigo-100", "dark:bg-indigo-950", "text-indigo-700", "dark:text-indigo-400", "font-semibold"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "truncate"], [1, "py-3.5", "px-4", "whitespace-nowrap"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "rounded-lg", "text-xs", "font-bold", "border"], [1, "!text-xs", "!w-3.5", "!h-3.5"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-bold", "bg-amber-100", "dark:bg-amber-950/60", "text-amber-800", "dark:text-amber-300", "border", "border-amber-300", "dark:border-amber-800"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-bold", "bg-emerald-100", "dark:bg-emerald-950/60", "text-emerald-800", "dark:text-emerald-300", "border", "border-emerald-300", "dark:border-emerald-800"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-bold", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400", "border", "border-slate-300", "dark:border-slate-700"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-bold", "bg-rose-100", "dark:bg-rose-950/60", "text-rose-800", "dark:text-rose-300", "border", "border-rose-300", "dark:border-rose-800"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-bold", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400"], [1, "py-3.5", "px-4", "hidden", "md:table-cell", "text-slate-600", "dark:text-slate-400", "whitespace-nowrap"], [1, "flex", "items-center", "gap-1.5", "text-xs"], [1, "!text-xs", "!w-3.5", "!h-3.5", "text-slate-400"], [1, "py-3.5", "px-4", "text-right", "whitespace-nowrap"], [1, "flex", "items-center", "justify-end", "gap-1.5"], ["type", "button", "title", "Deactivate account to temporarily block access", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300", "flex", "items-center", "gap-1", "transition-all", "cursor-pointer", "active:scale-95", "disabled:opacity-50", 3, "disabled"], ["type", "button", "title", "Reactivate and authorize this account", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-emerald-50", "hover:bg-emerald-100", "dark:bg-emerald-950/40", "dark:hover:bg-emerald-900/60", "text-emerald-700", "dark:text-emerald-300", "border", "border-emerald-200", "dark:border-emerald-800", "flex", "items-center", "gap-1", "transition-all", "cursor-pointer", "active:scale-95", "disabled:opacity-50", 3, "disabled"], ["type", "button", "title", "Delete user from database", 1, "p-1.5", "rounded-lg", "text-slate-400", "hover:text-rose-600", "hover:bg-rose-50", "dark:hover:bg-rose-950/40", "transition-colors", "cursor-pointer", 3, "click", "disabled"], [1, "!text-xs", "!w-3.5", "!h-3.5", "animate-spin"], ["type", "button", "title", "Approve registration and authorize user to sign in", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-bold", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "flex", "items-center", "gap-1", "transition-all", "shadow-xs", "cursor-pointer", "active:scale-95", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", "title", "Reject registration request", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-rose-50", "hover:bg-rose-100", "dark:bg-rose-950/40", "dark:hover:bg-rose-900/60", "text-rose-700", "dark:text-rose-300", "border", "border-rose-200", "dark:border-rose-800", "flex", "items-center", "gap-1", "transition-all", "cursor-pointer", "active:scale-95", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", "title", "Deactivate account to temporarily block access", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300", "flex", "items-center", "gap-1", "transition-all", "cursor-pointer", "active:scale-95", "disabled:opacity-50", 3, "click", "disabled"], [1, "!text-xs", "!w-3.5", "!h-3.5", "text-amber-500"], ["type", "button", "title", "Reactivate and authorize this account", 1, "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-emerald-50", "hover:bg-emerald-100", "dark:bg-emerald-950/40", "dark:hover:bg-emerald-900/60", "text-emerald-700", "dark:text-emerald-300", "border", "border-emerald-200", "dark:border-emerald-800", "flex", "items-center", "gap-1", "transition-all", "cursor-pointer", "active:scale-95", "disabled:opacity-50", 3, "click", "disabled"], [1, "p-4", "bg-indigo-50/70", "dark:bg-indigo-950/40", "border", "border-indigo-200/80", "dark:border-indigo-800/80", "rounded-xl", "text-xs", "text-indigo-950", "dark:text-indigo-300", "flex", "items-start", "gap-3"], [1, "text-indigo-700", "dark:text-indigo-400", "shrink-0", "mt-0.5"], [1, "space-y-1"], [1, "font-bold", "text-indigo-950", "dark:text-indigo-200"], [1, "text-indigo-800", "dark:text-indigo-300", "leading-relaxed"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "transition-all", "p-5", "shadow-xs", "flex", "flex-col", "justify-between", 3, "class"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "transition-all", "p-5", "shadow-xs", "flex", "flex-col", "justify-between"], [1, "flex", "items-start", "justify-between", "gap-2", "mb-3"], [1, "w-9", "h-9", "rounded-lg", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "font-mono", "uppercase"], [1, "text-[10px]", "uppercase", "font-mono", "font-semibold", "px-2", "py-0.5", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400", "rounded"], [1, "text-[10px]", "uppercase", "font-mono", "font-semibold", "px-2", "py-0.5", "bg-indigo-100", "dark:bg-indigo-950/60", "text-indigo-800", "dark:text-indigo-400", "rounded"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "leading-relaxed", "mb-4"], [1, "space-y-1.5", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800", "text-xs", "text-slate-700", "dark:text-slate-300"], [1, "flex", "items-center", "justify-between", "text-[11px]"], [1, "pt-4", "mt-4", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between"], [1, "text-xs", "font-bold", "text-emerald-700", "dark:text-emerald-400", "flex", "items-center", "gap-1"], ["type", "button", 1, "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "underline", "cursor-pointer"], ["type", "button", "title", "Delete custom role", 1, "text-xs", "text-rose-500", "hover:text-rose-700", "cursor-pointer"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500"], ["type", "button", 1, "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "underline", "cursor-pointer", 3, "click"], ["type", "button", "title", "Delete custom role", 1, "text-xs", "text-rose-500", "hover:text-rose-700", "cursor-pointer", 3, "click"]], template: function RolesManager_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "Enterprise Organization");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Identity & Access Management (IAM)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 4);
            i0.ɵɵtext(13, "Operations Manager Governance");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 5);
            i0.ɵɵtext(15, " User Accounts & Role Governance ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 6)(17, "button", 7);
            i0.ɵɵlistener("click", function RolesManager_Template_button_click_17_listener() { return ctx.onRefreshUsers(); });
            i0.ɵɵelementStart(18, "mat-icon", 8);
            i0.ɵɵtext(19, "refresh");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 9);
            i0.ɵɵtext(21, "Sync Users");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "button", 10);
            i0.ɵɵlistener("click", function RolesManager_Template_button_click_22_listener() { return ctx.addUserModalOpened.emit(); });
            i0.ɵɵelementStart(23, "mat-icon", 8);
            i0.ɵɵtext(24, "person_add");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span");
            i0.ɵɵtext(26, "Add New User");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "button", 11);
            i0.ɵɵlistener("click", function RolesManager_Template_button_click_27_listener() { return ctx.customRoleModalOpened.emit(); });
            i0.ɵɵelementStart(28, "mat-icon", 8);
            i0.ɵɵtext(29, "add_moderator");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 9);
            i0.ɵɵtext(31, "New Role");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(32, "div", 12)(33, "button", 13);
            i0.ɵɵlistener("click", function RolesManager_Template_button_click_33_listener() { return ctx.activeTab.set("users"); });
            i0.ɵɵelementStart(34, "mat-icon", 14);
            i0.ɵɵtext(35, "manage_accounts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "span");
            i0.ɵɵtext(37, "User Directory & Authorizations");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(38, RolesManager_Conditional_38_Template, 2, 1, "span", 15)(39, RolesManager_Conditional_39_Template, 2, 1, "span", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "button", 13);
            i0.ɵɵlistener("click", function RolesManager_Template_button_click_40_listener() { return ctx.activeTab.set("roles"); });
            i0.ɵɵelementStart(41, "mat-icon", 14);
            i0.ɵɵtext(42, "admin_panel_settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span");
            i0.ɵɵtext(44, "Role Definitions & Granular RBAC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span", 16);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(47, RolesManager_Conditional_47_Template, 88, 25);
            i0.ɵɵconditionalCreate(48, RolesManager_Conditional_48_Template, 11, 0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("disabled", ctx.isRefreshing());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("animate-spin", ctx.isRefreshing());
            i0.ɵɵadvance(15);
            i0.ɵɵclassMap(ctx.activeTab() === "users" ? "border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.store.pendingUsers().length > 0 ? 38 : 39);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeTab() === "roles" ? "border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-400" : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.store.roles().length, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "users" ? 47 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "roles" ? 48 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel, MatIconModule, i2.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RolesManager, [{
        type: Component,
        args: [{
                selector: 'app-roles-manager',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [CommonModule, FormsModule, MatIconModule],
                template: `
    <div class="space-y-6">
      
      <!-- Top Header & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Enterprise Organization</span>
            <span aria-hidden="true">·</span>
            <span>Identity & Access Management (IAM)</span>
            <span aria-hidden="true">·</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-medium">Operations Manager Governance</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            User Accounts & Role Governance
          </h1>
        </div>

        <div class="flex items-center gap-2.5">
          <button 
            type="button"
            (click)="onRefreshUsers()"
            [disabled]="isRefreshing()"
            class="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
            title="Refresh user list from MySQL"
          >
            <mat-icon class="!text-sm !w-4 !h-4" [class.animate-spin]="isRefreshing()">refresh</mat-icon>
            <span class="hidden sm:inline">Sync Users</span>
          </button>

          <button 
            type="button"
            (click)="addUserModalOpened.emit()"
            class="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">person_add</mat-icon>
            <span>Add New User</span>
          </button>

          <button 
            type="button"
            (click)="customRoleModalOpened.emit()"
            class="px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">add_moderator</mat-icon>
            <span class="hidden sm:inline">New Role</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs: User Directory vs Role RBAC Definitions -->
      <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          type="button"
          (click)="activeTab.set('users')"
          class="relative px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-b-2"
          [class]="activeTab() === 'users' 
            ? 'border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-400' 
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <mat-icon class="!text-base">manage_accounts</mat-icon>
          <span>User Directory & Authorizations</span>
          
          @if (store.pendingUsers().length > 0) {
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
              {{ store.pendingUsers().length }} Pending
            </span>
          } @else {
            <span class="px-2 py-0.2 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {{ store.users().length }}
            </span>
          }
        </button>

        <button
          type="button"
          (click)="activeTab.set('roles')"
          class="relative px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-b-2"
          [class]="activeTab() === 'roles' 
            ? 'border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-400' 
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <mat-icon class="!text-base">admin_panel_settings</mat-icon>
          <span>Role Definitions & Granular RBAC</span>
          <span class="px-2 py-0.2 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {{ store.roles().length }}
          </span>
        </button>
      </div>

      <!-- =================================================================== -->
      <!-- TAB 1: USER DIRECTORY & ACCESS CONTROL                             -->
      <!-- =================================================================== -->
      @if (activeTab() === 'users') {
        
        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <!-- Total Users -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Registered</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                {{ store.users().length }}
              </span>
              <span class="text-xs text-slate-500 font-mono">accounts</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              Staff, Technicians & Clients
            </div>
          </div>

          <!-- Pending Approvals -->
          <div 
            class="p-4 rounded-2xl border shadow-xs transition-colors"
            [class]="store.pendingUsers().length > 0 
              ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80 ring-2 ring-amber-500/20' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">Pending Approval</span>
              @if (store.pendingUsers().length > 0) {
                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                  Action Required
                </span>
              }
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                {{ store.pendingUsers().length }}
              </span>
              <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">Awaiting Ops Review</span>
            </div>
            <div class="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-2">
              Cannot sign in until approved
            </div>
          </div>

          <!-- Active Accounts -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Active Accounts</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                {{ store.activeUsers().length }}
              </span>
              <span class="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Authorized</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Fully authorized sign-ins</span>
            </div>
          </div>

          <!-- Deactivated / Rejected -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Deactivated / Blocked</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                {{ store.deactivatedUsers().length }}
              </span>
              <span class="text-xs text-slate-400 font-mono">restricted</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              Access immediately revoked
            </div>
          </div>
        </div>

        <!-- Pending Approval Alert Banner (When there are pending registrations) -->
        @if (store.pendingUsers().length > 0) {
          <div class="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950 dark:text-amber-200">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <mat-icon class="!text-lg">notification_important</mat-icon>
              </div>
              <div class="space-y-0.5">
                <p class="text-xs font-bold">
                  {{ store.pendingUsers().length }} User Registration(s) Awaiting Operations Manager Approval
                </p>
                <p class="text-xs text-amber-800 dark:text-amber-300">
                  Self-registered users start in pending status and are blocked from signing in until an Operations Manager authorizes their account.
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="statusFilter.set('pending')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shrink-0 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              Filter Pending Queue
            </button>
          </div>
        }

        <!-- Search & Filter Bar -->
        <div class="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          <!-- Search input -->
          <div class="relative flex-1">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-base !w-4 !h-4">search</mat-icon>
            <input 
              type="text"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Search by name, email, phone or role..."
              class="w-full pl-9 pr-8 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            @if (searchQuery()) {
              <button 
                type="button"
                (click)="searchQuery.set('')"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <mat-icon class="!text-sm !w-4 !h-4">close</mat-icon>
              </button>
            }
          </div>

          <!-- Status Filters -->
          <div class="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              (click)="statusFilter.set('all')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="statusFilter() === 'all' 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              All ({{ store.users().length }})
            </button>

            <button
              type="button"
              (click)="statusFilter.set('pending')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
              [class]="statusFilter() === 'pending' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'"
            >
              <span>Pending</span>
              @if (store.pendingUsers().length > 0) {
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              }
              <span>({{ store.pendingUsers().length }})</span>
            </button>

            <button
              type="button"
              (click)="statusFilter.set('active')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="statusFilter() === 'active' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'"
            >
              Active ({{ store.activeUsers().length }})
            </button>

            <button
              type="button"
              (click)="statusFilter.set('deactivated')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="statusFilter() === 'deactivated' 
                ? 'bg-slate-700 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              Deactivated ({{ store.deactivatedUsers().length }})
            </button>
          </div>

          <!-- Role Filter Dropdown -->
          <div class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Role:</span>
            <select
              [ngModel]="roleFilter()"
              (ngModelChange)="roleFilter.set($event)"
              class="py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Roles</option>
              <option value="manager">Operations Manager</option>
              <option value="installer">Field Technician</option>
              <option value="shop_manager">Shop Manager</option>
              <option value="dispatcher">Logistics Dispatcher</option>
              <option value="account_officer">Account Officer</option>
              <option value="client">Client</option>
              @for (r of customRoles(); track r.id) {
                <option [value]="r.id">{{ r.name }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Users Table Card -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          
          @if (filteredUsers().length === 0) {
            <div class="py-16 text-center px-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <mat-icon class="!text-2xl">person_search</mat-icon>
              </div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">No matching user accounts</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                No users found matching your search or filters. You can clear your filters or add a new user.
              </p>
              <button
                type="button"
                (click)="addUserModalOpened.emit()"
                class="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <mat-icon class="!text-sm">person_add</mat-icon>
                <span>Add New User</span>
              </button>
            </div>
          } @else {
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th class="py-3 px-4 sm:px-6">User Account</th>
                    <th class="py-3 px-4">Role Assignment</th>
                    <th class="py-3 px-4">Status</th>
                    <th class="py-3 px-4 hidden md:table-cell">Contact & Identity</th>
                    <th class="py-3 px-4 text-right">Operations Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  @for (u of filteredUsers(); track u.id) {
                    <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      
                      <!-- User Account Profile -->
                      <td class="py-3.5 px-4 sm:px-6">
                        <div class="flex items-center gap-3">
                          <div class="relative">
                            <div 
                              class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase shadow-xs shrink-0"
                              [class]="getAvatarBg(u.role)"
                            >
                              {{ getUserInitials(u.name) }}
                            </div>
                            <span 
                              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900"
                              [class]="getStatusDotClass(u.status)"
                            ></span>
                          </div>

                          <div class="min-w-0">
                            <div class="flex items-center gap-1.5">
                              <span class="font-bold text-slate-900 dark:text-white truncate">{{ u.name }}</span>
                              @if (u.id === store.apiUser()?.id || (store.dataMode() === 'demo' && u.role === store.currentRole())) {
                                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-semibold">
                                  Current
                                </span>
                              }
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">{{ u.email }}</div>
                          </div>
                        </div>
                      </td>

                      <!-- Role Assignment -->
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        <span 
                          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border"
                          [class]="getRoleBadgeClass(u.role)"
                        >
                          <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ getRoleIcon(u.role) }}</mat-icon>
                          <span>{{ getRoleName(u.role) }}</span>
                        </span>
                      </td>

                      <!-- Status Badge -->
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        @switch (u.status) {
                          @case ('pending') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5 animate-spin">hourglass_empty</mat-icon>
                              <span>Pending Approval</span>
                            </span>
                          }
                          @case ('active') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">verified</mat-icon>
                              <span>Active</span>
                            </span>
                          }
                          @case ('deactivated') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">block</mat-icon>
                              <span>Deactivated</span>
                            </span>
                          }
                          @case ('rejected') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">cancel</mat-icon>
                              <span>Rejected</span>
                            </span>
                          }
                          @default {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {{ u.status || 'Active' }}
                            </span>
                          }
                        }
                      </td>

                      <!-- Contact Details -->
                      <td class="py-3.5 px-4 hidden md:table-cell text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        <div class="flex items-center gap-1.5 text-xs">
                          <mat-icon class="!text-xs !w-3.5 !h-3.5 text-slate-400">phone</mat-icon>
                          <span>{{ u.phone || 'No phone set' }}</span>
                        </div>
                      </td>

                      <!-- Action Buttons -->
                      <td class="py-3.5 px-4 text-right whitespace-nowrap">
                        <div class="flex items-center justify-end gap-1.5">
                          
                          <!-- Pending: Approve & Reject buttons -->
                          @if (u.status === 'pending') {
                            <button
                              type="button"
                              (click)="onApproveUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Approve registration and authorize user to sign in"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">check</mat-icon>
                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              (click)="onRejectUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Reject registration request"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">close</mat-icon>
                              <span>Reject</span>
                            </button>
                          }

                          <!-- Active: Deactivate button -->
                          @if (u.status === 'active') {
                            <button
                              type="button"
                              (click)="onDeactivateUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Deactivate account to temporarily block access"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5 text-amber-500">block</mat-icon>
                              <span>Deactivate</span>
                            </button>
                          }

                          <!-- Deactivated or Rejected: Reactivate / Restore -->
                          @if (u.status === 'deactivated' || u.status === 'rejected') {
                            <button
                              type="button"
                              (click)="onReactivateUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Reactivate and authorize this account"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">check_circle</mat-icon>
                              <span>Reactivate</span>
                            </button>
                          }

                          <!-- Delete account option -->
                          <button
                            type="button"
                            (click)="onDeleteUser(u)"
                            [disabled]="actionLoadingId() === u.id"
                            class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete user from database"
                          >
                            <mat-icon class="!text-sm !w-4 !h-4">delete_outline</mat-icon>
                          </button>
                        </div>
                      </td>

                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>

      }

      <!-- =================================================================== -->
      <!-- TAB 2: ROLE DEFINITIONS & EXTENSIBLE RBAC                          -->
      <!-- =================================================================== -->
      @if (activeTab() === 'roles') {
        
        <!-- Explanatory Banner -->
        <div class="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 rounded-xl text-xs text-indigo-950 dark:text-indigo-300 flex items-start gap-3">
          <mat-icon class="text-indigo-700 dark:text-indigo-400 shrink-0 mt-0.5">verified_user</mat-icon>
          <div class="space-y-1">
            <p class="font-bold text-indigo-950 dark:text-indigo-200">Extensible Role Architecture</p>
            <p class="text-indigo-800 dark:text-indigo-300 leading-relaxed">
              DoorMaster accommodates Operations Managers, Field Technicians, Shop Managers, Logistics Dispatchers, Finance Officers, and Clients. 
              As your operations expand, instantiate custom operational roles with granular permission matrices.
            </p>
          </div>
        </div>

        <!-- Roles Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (role of store.roles(); track role.id) {
            <div 
              class="bg-white dark:bg-slate-900 rounded-xl border transition-all p-5 shadow-xs flex flex-col justify-between"
              [class]="store.currentRole() === role.id ? 'border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/10 dark:ring-white/10' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'"
            >
              <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                      <mat-icon class="!text-base">{{ role.icon }}</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ role.name }}</h3>
                      <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">{{ role.label }}</span>
                    </div>
                  </div>

                  <div>
                    @if (role.isSystem) {
                      <span class="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        Core System
                      </span>
                    } @else {
                      <span class="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 rounded">
                        Custom Extension
                      </span>
                    }
                  </div>
                </div>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {{ role.description }}
                </p>

                <!-- Permissions Matrix List -->
                <div class="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Create / Book Jobs</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canCreateJobs ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canCreateJobs ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Assign Field Technicians</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canAssignInstallers ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canAssignInstallers ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Dispatch Doors From Shop</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canDispatchDoors ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canDispatchDoors ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Clock In / Clock Out On Site</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canClockInOut ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canClockInOut ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Sign Customer Verification</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canSignVerification ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canSignVerification ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Authorize Installer Bonuses</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canApproveBonuses ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canApproveBonuses ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>View Financial Ledger & Fees</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canViewFinancials ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canViewFinancials ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Manage User Accounts & Approvals</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canManageRoles ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canManageRoles ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                </div>
              </div>

              <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                @if (store.currentRole() === role.id) {
                  <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Active Perspective
                  </span>
                } @else {
                  <button 
                    type="button" 
                    (click)="onSelectRole(role.id)"
                    class="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                  >
                    Switch into this role →
                  </button>
                }

                @if (!role.isSystem) {
                  <button 
                    type="button" 
                    (click)="onDeleteCustomRole(role)"
                    class="text-xs text-rose-500 hover:text-rose-700 cursor-pointer"
                    title="Delete custom role"
                  >
                    <mat-icon class="!text-sm">delete</mat-icon>
                  </button>
                }
              </div>
            </div>
          }
        </div>
      }

    </div>
  `
            }]
    }], null, { customRoleModalOpened: [{ type: i0.Output, args: ["customRoleModalOpened"] }], addUserModalOpened: [{ type: i0.Output, args: ["addUserModalOpened"] }], roleSwitched: [{ type: i0.Output, args: ["roleSwitched"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RolesManager, { className: "RolesManager", filePath: "frontend/src/app/views/roles-manager/roles-manager.ts", lineNumber: 647 }); })();
