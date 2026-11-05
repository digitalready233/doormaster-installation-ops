import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { PwaService } from '../../services/pwa.service';
import { JobDetailModal } from '../../components/job-detail-modal/job-detail-modal';
import { NewJobModal } from '../../components/new-job-modal/new-job-modal';
import { BonusModal } from '../../components/bonus-modal/bonus-modal';
import { CustomRoleModal } from '../../components/custom-role-modal/custom-role-modal';
import { AddUserModal } from '../../components/add-user-modal/add-user-modal';
import { NotificationDrawer } from '../../components/notification-drawer/notification-drawer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function DashboardLayout_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 67)(2, "span");
    i0.ɵɵtext(3, "DoorMaster");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 68);
    i0.ɵɵtext(5, " PRO ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 69);
    i0.ɵɵelement(7, "span", 70);
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "LIVE DISPATCH");
    i0.ɵɵelementEnd()()();
} }
function DashboardLayout_Conditional_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1, "Book Installation");
    i0.ɵɵelementEnd();
} }
function DashboardLayout_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "button", 71);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNewJobModal.set(true)); });
    i0.ɵɵelementStart(2, "mat-icon", 72);
    i0.ɵɵtext(3, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, DashboardLayout_Conditional_9_Conditional_4_Template, 2, 0, "span", 73);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("px-0", ctx_r1.sidebarCollapsed());
    i0.ɵɵproperty("title", "Book Door Installation");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!ctx_r1.sidebarCollapsed() ? 4 : -1);
} }
function DashboardLayout_For_12_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3", 74)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 77);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const section_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(section_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("(", section_r3.items.length, ")");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.stats().inProgress, " live ");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 82);
    i0.ɵɵelement(1, "span", 88)(2, "span", 89);
    i0.ɵɵelementEnd();
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 83);
    i0.ɵɵtext(1, " ETA ");
    i0.ɵɵelementEnd();
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 84);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.doors().length, " ");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.jobs().length, " ");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 90);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.pendingUsers().length, " ");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.users().length, " ");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, DashboardLayout_For_12_For_4_Conditional_3_Conditional_7_Conditional_0_Template, 2, 1, "span", 90)(1, DashboardLayout_For_12_For_4_Conditional_3_Conditional_7_Conditional_1_Template, 2, 1, "span", 85);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵconditional(ctx_r1.store.pendingUsers().length > 0 ? 0 : 1);
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 86);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" $", ctx_r1.store.stats().totalBonusesAllocated, " ");
} }
function DashboardLayout_For_12_For_4_Conditional_3_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 87);
    i0.ɵɵtext(1, " Ledger ");
    i0.ɵɵelementEnd();
} }
function DashboardLayout_For_12_For_4_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(2, DashboardLayout_For_12_For_4_Conditional_3_Conditional_2_Template, 2, 1, "span", 81)(3, DashboardLayout_For_12_For_4_Conditional_3_Conditional_3_Template, 3, 0, "span", 82)(4, DashboardLayout_For_12_For_4_Conditional_3_Conditional_4_Template, 2, 0, "span", 83)(5, DashboardLayout_For_12_For_4_Conditional_3_Conditional_5_Template, 2, 1, "span", 84)(6, DashboardLayout_For_12_For_4_Conditional_3_Conditional_6_Template, 2, 1, "span", 85)(7, DashboardLayout_For_12_For_4_Conditional_3_Conditional_7_Template, 2, 1)(8, DashboardLayout_For_12_For_4_Conditional_3_Conditional_8_Template, 2, 1, "span", 86)(9, DashboardLayout_For_12_For_4_Conditional_3_Conditional_9_Template, 2, 0, "span", 87);
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r5.badgeType === "live" && ctx_r1.store.stats().inProgress > 0 ? 2 : item_r5.badgeType === "ping" ? 3 : item_r5.badgeType === "eta" ? 4 : item_r5.badgeType === "count" && item_r5.id === "doors" ? 5 : item_r5.badgeType === "count" && item_r5.id === "shop" ? 6 : item_r5.badgeType === "count" && item_r5.id === "roles" ? 7 : item_r5.badgeType === "currency" ? 8 : item_r5.badgeType === "ledger" ? 9 : -1);
} }
function DashboardLayout_For_12_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function DashboardLayout_For_12_For_4_Template_button_click_0_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setView(item_r5.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 79);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, DashboardLayout_For_12_For_4_Conditional_3_Template, 10, 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r1.currentView() === item_r5.id ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white font-bold shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900");
    i0.ɵɵproperty("title", item_r5.label + " \u2022 " + item_r5.description);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.currentView() === item_r5.id ? item_r5.activeColor : item_r5.iconColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.icon);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.sidebarCollapsed() ? 3 : -1);
} }
function DashboardLayout_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵconditionalCreate(1, DashboardLayout_For_12_Conditional_1_Template, 5, 2, "h3", 74);
    i0.ɵɵelementStart(2, "nav", 75);
    i0.ɵɵrepeaterCreate(3, DashboardLayout_For_12_For_4_Template, 4, 7, "button", 76, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const section_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.sidebarCollapsed() ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(section_r3.items);
} }
function DashboardLayout_Conditional_14_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 95);
} }
function DashboardLayout_Conditional_14_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 104);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.unreadNotificationsCount(), " ");
} }
function DashboardLayout_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 91)(1, "div", 56)(2, "button", 92);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_14_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.store.setDataMode("demo")); });
    i0.ɵɵelementStart(3, "mat-icon", 93);
    i0.ɵɵtext(4, "science");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Demo");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 94);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_14_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.store.setDataMode("api")); });
    i0.ɵɵelementStart(8, "mat-icon", 93);
    i0.ɵɵtext(9, "storage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "MySQL");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, DashboardLayout_Conditional_14_Conditional_12_Template, 1, 0, "span", 95);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "button", 96);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_14_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setView("settings")); });
    i0.ɵɵelementStart(14, "div", 15)(15, "mat-icon", 97);
    i0.ɵɵtext(16, " tune ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 98);
    i0.ɵɵtext(18, "Settings Hub");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "span", 99);
    i0.ɵɵtext(20, " Shop / SMS ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 100)(22, "div", 15);
    i0.ɵɵelement(23, "span", 101);
    i0.ɵɵelementStart(24, "span", 102);
    i0.ɵɵtext(25, "Radar Active");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "button", 103);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_14_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNotificationDrawer.set(true)); });
    i0.ɵɵelementStart(27, "mat-icon", 6);
    i0.ɵɵtext(28, "notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(29, DashboardLayout_Conditional_14_Conditional_29_Template, 2, 1, "span", 104);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_13_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", ctx_r1.store.dataMode() === "demo")("text-slate-950", ctx_r1.store.dataMode() === "demo")("text-slate-600", ctx_r1.store.dataMode() !== "demo")("dark:text-slate-400", ctx_r1.store.dataMode() !== "demo")("hover:bg-slate-100", ctx_r1.store.dataMode() !== "demo")("dark:hover:bg-slate-800", ctx_r1.store.dataMode() !== "demo");
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("bg-indigo-600", ctx_r1.store.dataMode() === "api")("text-white", ctx_r1.store.dataMode() === "api")("text-slate-600", ctx_r1.store.dataMode() !== "api")("dark:text-slate-400", ctx_r1.store.dataMode() !== "api")("hover:bg-slate-100", ctx_r1.store.dataMode() !== "api")("dark:hover:bg-slate-800", ctx_r1.store.dataMode() !== "api");
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(((tmp_13_0 = ctx_r1.store.dbStatus()) == null ? null : tmp_13_0.connected) ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.currentView() === "settings" ? "border-cyan-500 bg-cyan-50 text-cyan-900 dark:bg-cyan-950/70 dark:text-cyan-200 dark:border-cyan-700 shadow-xs" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r1.currentView() === "settings" ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-slate-400");
    i0.ɵɵadvance(14);
    i0.ɵɵconditional(ctx_r1.store.unreadNotificationsCount() > 0 ? 29 : -1);
} }
function DashboardLayout_Conditional_15_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 108);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.unreadNotificationsCount(), " ");
} }
function DashboardLayout_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "button", 105);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.store.setDataMode(ctx_r1.store.dataMode() === "demo" ? "api" : "demo")); });
    i0.ɵɵelementStart(2, "mat-icon", 6);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 106);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_15_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setView("settings")); });
    i0.ɵɵelementStart(5, "mat-icon", 6);
    i0.ɵɵtext(6, "tune");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 107);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_15_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNotificationDrawer.set(true)); });
    i0.ɵɵelementStart(8, "mat-icon", 6);
    i0.ɵɵtext(9, "notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, DashboardLayout_Conditional_15_Conditional_10_Template, 2, 1, "span", 108);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.store.dataMode() === "api" ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800");
    i0.ɵɵproperty("title", ctx_r1.store.dataMode() === "api" ? "Active: MySQL API Mode. Click for Demo" : "Active: Demo Mode. Click for MySQL API");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.store.dataMode() === "api" ? "storage" : "science");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.currentView() === "settings" ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800");
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r1.store.unreadNotificationsCount() > 0 ? 10 : -1);
} }
function DashboardLayout_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.unreadNotificationsCount(), " ");
} }
function DashboardLayout_Conditional_44_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 119);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r9.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", r_r9.name, " (", r_r9.label, ")");
} }
function DashboardLayout_Conditional_44_For_42_For_5_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.stats().inProgress, " live ");
} }
function DashboardLayout_Conditional_44_For_42_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 138);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_For_42_For_5_Template_button_click_0_listener() { const item_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.setView(item_r11.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 139);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, DashboardLayout_Conditional_44_For_42_For_5_Conditional_5_Template, 2, 1, "span", 81);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r1.currentView() === item_r11.id ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-900");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.currentView() === item_r11.id ? item_r11.activeColor : item_r11.iconColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r11.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r11.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r11.badgeType === "live" && ctx_r1.store.stats().inProgress > 0 ? 5 : -1);
} }
function DashboardLayout_Conditional_44_For_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "h3", 136);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "nav", 75);
    i0.ɵɵrepeaterCreate(4, DashboardLayout_Conditional_44_For_42_For_5_Template, 6, 7, "button", 137, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const section_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", section_r12.title, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(section_r12.items);
} }
function DashboardLayout_Conditional_44_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 140);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Conditional_62_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.showNewJobModal.set(true); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementStart(1, "mat-icon", 97);
    i0.ɵɵtext(2, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Book Installation");
    i0.ɵɵelementEnd()();
} }
function DashboardLayout_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 109);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "div", 110)(2, "div", 111)(3, "div", 12)(4, "div", 16);
    i0.ɵɵtext(5, " DM ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 112);
    i0.ɵɵtext(7, "DoorMaster Operations");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 113);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementStart(9, "mat-icon", 14);
    i0.ɵɵtext(10, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 114)(12, "div", 115)(13, "label", 116);
    i0.ɵɵtext(14, "Current Persona");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 117);
    i0.ɵɵtext(16, "Logged in");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "select", 118);
    i0.ɵɵlistener("change", function DashboardLayout_Conditional_44_Template_select_change_17_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRoleChange($event)); });
    i0.ɵɵrepeaterCreate(18, DashboardLayout_Conditional_44_For_19_Template, 2, 3, "option", 119, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 120)(21, "button", 121);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.openLandingPage(); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementStart(22, "mat-icon", 122);
    i0.ɵɵtext(23, "public");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Public Site");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "button", 123);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.openSignInPage(); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementStart(27, "mat-icon", 124);
    i0.ɵɵtext(28, "logout");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "Sign Out");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 125)(32, "button", 126);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setView("settings")); });
    i0.ɵɵelementStart(33, "span", 15)(34, "mat-icon", 127);
    i0.ɵɵtext(35, "tune");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵtext(37, "System & Shop Settings");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "span", 128);
    i0.ɵɵtext(39, "Open");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(40, "div", 129);
    i0.ɵɵrepeaterCreate(41, DashboardLayout_Conditional_44_For_42_Template, 6, 1, "div", null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 130)(44, "div", 131)(45, "span", 19);
    i0.ɵɵelement(46, "span", 101);
    i0.ɵɵelementStart(47, "span", 132);
    i0.ɵɵtext(48, "Accra Fleet Radar");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "span", 133);
    i0.ɵɵtext(50, "v2.4 Live");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 134)(52, "button", 121);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.openLandingPage(); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementStart(53, "mat-icon", 122);
    i0.ɵɵtext(54, "public");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span");
    i0.ɵɵtext(56, "Public Site");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "button", 123);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_44_Template_button_click_57_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.openSignInPage(); return i0.ɵɵresetView(ctx_r1.closeMobileSidebar()); });
    i0.ɵɵelementStart(58, "mat-icon", 124);
    i0.ɵɵtext(59, "logout");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "span");
    i0.ɵɵtext(61, "Sign Out");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(62, DashboardLayout_Conditional_44_Conditional_62_Template, 5, 0, "button", 135);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("value", ctx_r1.store.currentRole());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.store.roles());
    i0.ɵɵadvance(14);
    i0.ɵɵclassMap(ctx_r1.currentView() === "settings" ? "bg-cyan-50 dark:bg-cyan-950/70 border-cyan-400 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200");
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.filteredMenuSections());
    i0.ɵɵadvance(21);
    i0.ɵɵconditional(ctx_r1.store.currentRoleDefinition().permissions.canCreateJobs ? 62 : -1);
} }
function DashboardLayout_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.unreadNotificationsCount(), " ");
} }
function DashboardLayout_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 141);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_64_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeProfileDropdown()); });
    i0.ɵɵelementEnd();
} }
function DashboardLayout_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 46)(1, "div", 142)(2, "div", 34)(3, "div", 143);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 144)(6, "div", 145);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 146)(9, "span", 147);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 148);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(13, "div", 149)(14, "button", 150);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_76_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.themeStore.toggleTheme()); });
    i0.ɵɵelementStart(15, "div", 12)(16, "mat-icon", 6);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 151);
    i0.ɵɵtext(19, "Theme Appearance");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "span", 152);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "button", 153);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_76_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openSettings()); });
    i0.ɵɵelementStart(23, "mat-icon", 154);
    i0.ɵɵtext(24, "tune");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div")(26, "div", 151);
    i0.ɵɵtext(27, "Settings & Shop Hub");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 155);
    i0.ɵɵtext(29, "Workshop GPS, phones & SMS gateway");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "button", 153);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_76_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openLandingPage()); });
    i0.ɵɵelementStart(31, "mat-icon", 156);
    i0.ɵɵtext(32, "public");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div")(34, "div", 151);
    i0.ɵɵtext(35, "Public Landing Page");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 155);
    i0.ɵɵtext(37, "Door catalog & client booking landing");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(38, "div", 157)(39, "button", 158);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_76_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openSignInPage()); });
    i0.ɵɵelementStart(40, "mat-icon", 6);
    i0.ɵɵtext(41, "logout");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span");
    i0.ɵɵtext(43, "Sign Out / Switch Persona");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.currentRoleDefinition().name.charAt(0), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.currentRoleDefinition().name, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.currentRoleDefinition().label, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.dataMode() === "api" ? "Live MySQL" : "Demo Mode", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("text-amber-500", !ctx_r1.themeStore.isDark())("text-indigo-400", ctx_r1.themeStore.isDark());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.themeStore.isDark() ? "dark_mode" : "light_mode", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.themeStore.isDark() ? "Dark" : "Light", " ");
} }
function DashboardLayout_Conditional_77_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " CLOCKED IN ON SITE ");
} }
function DashboardLayout_Conditional_77_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " DOOR EN ROUTE ");
} }
function DashboardLayout_Conditional_77_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " TECHNICIAN ASSIGNED ");
} }
function DashboardLayout_Conditional_77_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " LIVE OPERATION ");
} }
function DashboardLayout_Conditional_77_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 177);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_77_Conditional_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setView("client")); });
    i0.ɵɵelementStart(1, "mat-icon", 178);
    i0.ɵɵtext(2, "navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Track Live Journey");
    i0.ɵɵelementEnd()();
} }
function DashboardLayout_Conditional_77_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 47)(2, "div", 159)(3, "div", 160)(4, "div", 161);
    i0.ɵɵelement(5, "span", 88)(6, "span", 162);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 163)(8, "span", 164);
    i0.ɵɵconditionalCreate(9, DashboardLayout_Conditional_77_Conditional_9_Template, 1, 0)(10, DashboardLayout_Conditional_77_Conditional_10_Template, 1, 0)(11, DashboardLayout_Conditional_77_Conditional_11_Template, 1, 0)(12, DashboardLayout_Conditional_77_Conditional_12_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 165);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 166);
    i0.ɵɵtext(16, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 167);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 166);
    i0.ɵɵtext(20, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 168);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 169);
    i0.ɵɵtext(24, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 170);
    i0.ɵɵtext(26, "Tech: ");
    i0.ɵɵelementStart(27, "strong", 171);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(29, "div", 172);
    i0.ɵɵconditionalCreate(30, DashboardLayout_Conditional_77_Conditional_30_Template, 5, 0, "button", 173);
    i0.ɵɵelementStart(31, "button", 174);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_77_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r16); const aj_r18 = i0.ɵɵreadContextLet(0); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openContactTechnician(aj_r18)); });
    i0.ɵɵelementStart(32, "mat-icon", 175);
    i0.ɵɵtext(33, "phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Call Technician");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "button", 176);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_77_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r16); const aj_r18 = i0.ɵɵreadContextLet(0); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openJobDetails(aj_r18.id)); });
    i0.ɵɵtext(37, " Details \u2192 ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const aj_r19 = i0.ɵɵstoreLet(ctx_r1.activeLiveJob());
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(aj_r19.status === "on_site" ? 9 : aj_r19.status === "dispatched" ? 10 : aj_r19.status === "accepted" ? 11 : 12);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(aj_r19.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(aj_r19.doorModel);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(aj_r19.client.siteAddress);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(aj_r19.assignedInstallerName || "Marcus Vance");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.store.currentRole() !== "manager" ? 30 : -1);
} }
function DashboardLayout_For_105_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 181);
} }
function DashboardLayout_For_105_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 179);
    i0.ɵɵlistener("click", function DashboardLayout_For_105_Template_button_click_0_listener() { const item_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setView(item_r21.id)); });
    i0.ɵɵelementStart(1, "mat-icon", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 180);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, DashboardLayout_For_105_Conditional_5_Template, 1, 0, "span", 181);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r21 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("text-slate-950", ctx_r1.currentView() === item_r21.id)("dark:text-white", ctx_r1.currentView() === item_r21.id)("font-bold", ctx_r1.currentView() === item_r21.id);
    i0.ɵɵproperty("title", item_r21.label);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.currentView() === item_r21.id ? item_r21.activeColor : item_r21.iconColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r21.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r21.label.split(" ")[0]);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r21.badgeType === "live" && ctx_r1.store.stats().inProgress > 0 ? 5 : -1);
} }
function DashboardLayout_Conditional_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.unreadNotificationsCount(), " ");
} }
function DashboardLayout_Conditional_117_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 64)(1, "mat-icon", 182);
    i0.ɵɵtext(2, "info");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 151);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 183);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_117_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toastMessage.set(null)); });
    i0.ɵɵelementStart(6, "mat-icon", 124);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.toastMessage());
} }
function DashboardLayout_Conditional_118_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 65)(2, "div", 184)(3, "div", 185)(4, "div", 186);
    i0.ɵɵelement(5, "span", 101);
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "DIRECT FIELD COMM");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 187);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_118_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeContactModal()); });
    i0.ɵɵelementStart(9, "mat-icon", 6);
    i0.ɵɵtext(10, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 188)(12, "div", 189);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div")(15, "h3", 190);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 191);
    i0.ɵɵtext(18, "DoorMaster Certified Lead Technician");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 192);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 193)(22, "p", 194);
    i0.ɵɵtext(23, "Assigned Work Order:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "p", 195);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 196);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 197)(29, "button", 198);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_118_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r23); const info_r24 = i0.ɵɵreadContextLet(0); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.showToast("Calling " + info_r24.name + " at " + info_r24.phone); return i0.ɵɵresetView(ctx_r1.closeContactModal()); });
    i0.ɵɵelementStart(30, "mat-icon", 97);
    i0.ɵɵtext(31, "call");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Dial Direct");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "button", 199);
    i0.ɵɵlistener("click", function DashboardLayout_Conditional_118_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r23); const info_r24 = i0.ɵɵreadContextLet(0); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.showToast("Message sent to " + info_r24.name); return i0.ɵɵresetView(ctx_r1.closeContactModal()); });
    i0.ɵɵelementStart(35, "mat-icon", 97);
    i0.ɵɵtext(36, "chat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38, "Message Site");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const info_r25 = i0.ɵɵstoreLet(i0.ɵɵnextContext().activeContactInfo());
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate1(" ", info_r25.name.charAt(0), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(info_r25.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(info_r25.phone);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(info_r25.jobTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(info_r25.address);
} }
function DashboardLayout_Conditional_119_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-job-detail-modal", 200);
    i0.ɵɵlistener("closed", function DashboardLayout_Conditional_119_Template_app_job_detail_modal_closed_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeJobDetails()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("jobId", ctx_r1.inspectedJobId());
} }
function DashboardLayout_Conditional_120_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-new-job-modal", 201);
    i0.ɵɵlistener("closed", function DashboardLayout_Conditional_120_Template_app_new_job_modal_closed_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNewJobModal.set(false)); });
    i0.ɵɵelementEnd();
} }
function DashboardLayout_Conditional_121_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-bonus-modal", 201);
    i0.ɵɵlistener("closed", function DashboardLayout_Conditional_121_Template_app_bonus_modal_closed_0_listener() { i0.ɵɵrestoreView(_r28); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showBonusModal.set(false)); });
    i0.ɵɵelementEnd();
} }
function DashboardLayout_Conditional_122_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-role-modal", 201);
    i0.ɵɵlistener("closed", function DashboardLayout_Conditional_122_Template_app_custom_role_modal_closed_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showCustomRoleModal.set(false)); });
    i0.ɵɵelementEnd();
} }
function DashboardLayout_Conditional_123_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-add-user-modal", 202);
    i0.ɵɵlistener("closed", function DashboardLayout_Conditional_123_Template_app_add_user_modal_closed_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showAddUserModal.set(false)); })("userCreated", function DashboardLayout_Conditional_123_Template_app_add_user_modal_userCreated_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.store.loadUsers()); });
    i0.ɵɵelementEnd();
} }
function DashboardLayout_Conditional_124_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-notification-drawer", 203);
    i0.ɵɵlistener("closed", function DashboardLayout_Conditional_124_Template_app_notification_drawer_closed_0_listener() { i0.ɵɵrestoreView(_r31); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNotificationDrawer.set(false)); })("jobSelected", function DashboardLayout_Conditional_124_Template_app_notification_drawer_jobSelected_0_listener($event) { i0.ɵɵrestoreView(_r31); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openJobDetails($event)); });
    i0.ɵɵelementEnd();
} }
export class DashboardLayout {
    store = inject(InstallationStore);
    themeStore = inject(ThemeStore);
    pwa = inject(PwaService);
    router = inject(Router);
    inspectedJobId = signal(null, ...(ngDevMode ? [{ debugName: "inspectedJobId" }] : /* istanbul ignore next */ []));
    showNewJobModal = signal(false, ...(ngDevMode ? [{ debugName: "showNewJobModal" }] : /* istanbul ignore next */ []));
    showBonusModal = signal(false, ...(ngDevMode ? [{ debugName: "showBonusModal" }] : /* istanbul ignore next */ []));
    showCustomRoleModal = signal(false, ...(ngDevMode ? [{ debugName: "showCustomRoleModal" }] : /* istanbul ignore next */ []));
    showAddUserModal = signal(false, ...(ngDevMode ? [{ debugName: "showAddUserModal" }] : /* istanbul ignore next */ []));
    showNotificationDrawer = signal(false, ...(ngDevMode ? [{ debugName: "showNotificationDrawer" }] : /* istanbul ignore next */ []));
    // Left Sidebar & Responsive Navigation
    sidebarCollapsed = signal(false, ...(ngDevMode ? [{ debugName: "sidebarCollapsed" }] : /* istanbul ignore next */ []));
    mobileSidebarOpen = signal(false, ...(ngDevMode ? [{ debugName: "mobileSidebarOpen" }] : /* istanbul ignore next */ []));
    globalSearchQuery = signal('', ...(ngDevMode ? [{ debugName: "globalSearchQuery" }] : /* istanbul ignore next */ []));
    toastMessage = signal(null, ...(ngDevMode ? [{ debugName: "toastMessage" }] : /* istanbul ignore next */ []));
    contactModalOpen = signal(false, ...(ngDevMode ? [{ debugName: "contactModalOpen" }] : /* istanbul ignore next */ []));
    activeContactInfo = signal(null, ...(ngDevMode ? [{ debugName: "activeContactInfo" }] : /* istanbul ignore next */ []));
    profileDropdownOpen = signal(false, ...(ngDevMode ? [{ debugName: "profileDropdownOpen" }] : /* istanbul ignore next */ []));
    toggleProfileDropdown() {
        this.profileDropdownOpen.update(prev => !prev);
    }
    closeProfileDropdown() {
        this.profileDropdownOpen.set(false);
    }
    openSettings() {
        this.closeProfileDropdown();
        this.setView('settings');
    }
    // Current URL tracking for active menu highlighting
    currentUrl = signal(this.router.url, ...(ngDevMode ? [{ debugName: "currentUrl" }] : /* istanbul ignore next */ []));
    currentView = computed(() => {
        const url = this.currentUrl();
        const segment = url.split('?')[0].split('#')[0].replace(/^\//, '');
        const valid = ['overview', 'doors', 'installer', 'client', 'shop', 'dispatcher', 'performance', 'finance', 'roles', 'settings'];
        return (valid.includes(segment) ? segment : 'overview');
    }, ...(ngDevMode ? [{ debugName: "currentView" }] : /* istanbul ignore next */ []));
    currentViewLabel = computed(() => {
        const v = this.currentView();
        if (v === 'overview')
            return 'Dashboard';
        if (v === 'shop')
            return 'Shop & Counter';
        if (v === 'doors')
            return 'Doors Catalog';
        if (v === 'installer')
            return 'Technician Field';
        if (v === 'client')
            return 'Client Live Tracking';
        if (v === 'dispatcher')
            return 'Logistics Dispatch';
        if (v === 'performance')
            return 'Incentive Bonuses';
        if (v === 'finance')
            return 'Accounts Ledger';
        if (v === 'roles')
            return 'Roles & Permissions';
        if (v === 'settings')
            return 'Settings Hub';
        return v;
    }, ...(ngDevMode ? [{ debugName: "currentViewLabel" }] : /* istanbul ignore next */ []));
    // All master menu items definition
    allMenuItems = [
        {
            id: 'overview',
            label: 'Dashboard',
            icon: 'dashboard',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            activeColor: 'text-emerald-600 dark:text-emerald-400',
            category: 'field',
            badgeType: 'live',
            description: 'Fleet overview & active dispatch map'
        },
        {
            id: 'shop',
            label: 'Shop & Counter',
            icon: 'storefront',
            iconColor: 'text-cyan-600 dark:text-cyan-400',
            activeColor: 'text-cyan-600 dark:text-cyan-400',
            category: 'field',
            badgeType: 'count',
            description: 'Book installation, door specs & counter payments'
        },
        {
            id: 'doors',
            label: 'Doors Catalog & Registry',
            icon: 'meeting_room',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            activeColor: 'text-emerald-600 dark:text-emerald-400',
            category: 'field',
            badgeType: 'count',
            description: 'Door specifications, inventory & models'
        },
        {
            id: 'installer',
            label: 'Technician Field',
            icon: 'handyman',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            activeColor: 'text-emerald-600 dark:text-emerald-400',
            category: 'field',
            badgeType: 'ping',
            description: 'Field tasks, clock in/out & checklists'
        },
        {
            id: 'client',
            label: 'Client Live Tracking',
            icon: 'navigation',
            iconColor: 'text-indigo-600 dark:text-indigo-400',
            activeColor: 'text-indigo-600 dark:text-indigo-400',
            category: 'field',
            badgeType: 'eta',
            description: 'Live ETA journey, door specs & verification'
        },
        {
            id: 'dispatcher',
            label: 'Logistics Fleet Dispatch',
            icon: 'local_shipping',
            iconColor: 'text-teal-600 dark:text-teal-400',
            activeColor: 'text-teal-600 dark:text-teal-400',
            category: 'field',
            badgeType: 'count',
            description: 'Truck manifests, road transit & cargo site handover'
        },
        {
            id: 'performance',
            label: 'Incentive Bonuses',
            icon: 'military_tech',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            activeColor: 'text-emerald-600 dark:text-emerald-400',
            category: 'finance',
            badgeType: 'currency',
            description: 'Technician bonus earnings & metrics'
        },
        {
            id: 'finance',
            label: 'Accounts Ledger',
            icon: 'account_balance_wallet',
            iconColor: 'text-amber-600 dark:text-amber-400',
            activeColor: 'text-amber-600 dark:text-amber-400',
            category: 'finance',
            badgeType: 'ledger',
            description: 'Order financials, payouts & invoicing'
        },
        {
            id: 'roles',
            label: 'Roles & Permissions',
            icon: 'admin_panel_settings',
            iconColor: 'text-purple-600 dark:text-purple-400',
            activeColor: 'text-purple-600 dark:text-purple-400',
            category: 'governance',
            badgeType: 'count',
            description: 'Access governance & role assignment'
        }
    ];
    constructor() {
        this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
            this.currentUrl.set(e.urlAfterRedirects || e.url);
        });
    }
    isViewAllowedForRole(viewId, roleId, roleDef) {
        if (viewId === 'settings')
            return true;
        switch (roleId) {
            case 'manager':
                return viewId !== 'client';
            case 'installer':
                return viewId === 'installer' || viewId === 'client' || viewId === 'performance' || viewId === 'doors';
            case 'client':
                return viewId === 'client' || viewId === 'doors';
            case 'account_officer':
                return viewId === 'finance' || viewId === 'performance' || viewId === 'overview' || viewId === 'doors';
            case 'shop_manager':
                return viewId === 'shop' || viewId === 'dispatcher' || viewId === 'overview' || viewId === 'client' || viewId === 'doors';
            case 'dispatcher':
                return viewId === 'dispatcher' || viewId === 'client' || viewId === 'doors';
            default: {
                if (viewId === 'doors')
                    return true;
                const p = roleDef?.permissions;
                if (!p)
                    return viewId === 'overview';
                switch (viewId) {
                    case 'overview':
                        return p.canCreateJobs || p.canAssignInstallers || p.canManageRoles;
                    case 'installer':
                        return p.canClockInOut || p.canUploadPhotos;
                    case 'client':
                        return p.canSignVerification;
                    case 'shop':
                        return p.canDispatchDoors;
                    case 'performance':
                        return p.canApproveBonuses || p.canClockInOut;
                    case 'finance':
                        return p.canViewFinancials;
                    case 'roles':
                        return p.canManageRoles;
                    default:
                        return false;
                }
            }
        }
    }
    filteredMenuItems = computed(() => {
        const roleId = this.store.currentRole();
        const roleDef = this.store.currentRoleDefinition();
        return this.allMenuItems.filter(item => this.isViewAllowedForRole(item.id, roleId, roleDef));
    }, ...(ngDevMode ? [{ debugName: "filteredMenuItems" }] : /* istanbul ignore next */ []));
    filteredMenuSections = computed(() => {
        const allowed = this.filteredMenuItems();
        const sections = [
            { id: 'field', title: 'FIELD OPERATIONS & FLEET', items: allowed.filter(i => i.category === 'field') },
            { id: 'finance', title: 'LEDGER & INCENTIVES', items: allowed.filter(i => i.category === 'finance') },
            { id: 'governance', title: 'SYSTEM GOVERNANCE', items: allowed.filter(i => i.category === 'governance') }
        ];
        return sections.filter(s => s.items.length > 0);
    }, ...(ngDevMode ? [{ debugName: "filteredMenuSections" }] : /* istanbul ignore next */ []));
    activeLiveJob = computed(() => {
        const all = this.store.jobs();
        return all.find(j => j.status === 'on_site' || j.status === 'dispatched' || j.status === 'accepted') || null;
    }, ...(ngDevMode ? [{ debugName: "activeLiveJob" }] : /* istanbul ignore next */ []));
    setView(view) {
        this.mobileSidebarOpen.set(false);
        this.router.navigate(['/' + view]);
    }
    toggleSidebarCollapse() {
        this.sidebarCollapsed.update(prev => !prev);
    }
    toggleMobileSidebar() {
        this.mobileSidebarOpen.update(prev => !prev);
    }
    closeMobileSidebar() {
        this.mobileSidebarOpen.set(false);
    }
    onRoleChange(event) {
        const target = event.target;
        const roleId = target.value;
        this.setRoleDirect(roleId);
    }
    setRoleDirect(roleId) {
        this.store.currentRole.set(roleId);
        let targetView = 'overview';
        if (roleId === 'installer') {
            targetView = 'installer';
        }
        else if (roleId === 'client') {
            targetView = 'client';
        }
        else if (roleId === 'account_officer') {
            targetView = 'finance';
        }
        else if (roleId === 'shop_manager') {
            targetView = 'shop';
        }
        else if (roleId === 'dispatcher') {
            targetView = 'dispatcher';
        }
        else if (roleId === 'manager') {
            targetView = 'overview';
        }
        else {
            const allowed = this.filteredMenuItems();
            if (allowed.length > 0) {
                targetView = allowed[0].id;
            }
        }
        this.setView(targetView);
        const def = this.store.currentRoleDefinition();
        const count = this.filteredMenuItems().length;
        this.showToast(`Logged in as ${def.name} • ${count} ${count === 1 ? 'menu' : 'menus'} active`);
    }
    openSignInPage() {
        this.closeProfileDropdown();
        this.router.navigate(['/signin']);
    }
    openLandingPage() {
        this.closeProfileDropdown();
        this.router.navigate(['/landing']);
    }
    openDashboard() {
        this.closeProfileDropdown();
        this.router.navigate(['/overview']);
    }
    openJobDetails(jobId) {
        this.inspectedJobId.set(jobId);
    }
    closeJobDetails() {
        this.inspectedJobId.set(null);
    }
    openContactTechnician(job) {
        this.activeContactInfo.set({
            name: job.assignedInstallerName || 'Marcus Vance',
            phone: '+1 (555) 234-8891',
            jobTitle: job.doorModel,
            address: job.client.siteAddress
        });
        this.contactModalOpen.set(true);
    }
    closeContactModal() {
        this.contactModalOpen.set(false);
        this.activeContactInfo.set(null);
    }
    showToast(msg) {
        this.toastMessage.set(msg);
        setTimeout(() => {
            if (this.toastMessage() === msg) {
                this.toastMessage.set(null);
            }
        }, 4000);
    }
    onRouteActivated(component) {
        if (!component)
            return;
        if (component.jobSelected) {
            component.jobSelected.subscribe((jobId) => this.openJobDetails(jobId));
        }
        if (component.newJobOpened) {
            component.newJobOpened.subscribe(() => this.showNewJobModal.set(true));
        }
        if (component.bonusModalOpened) {
            component.bonusModalOpened.subscribe(() => this.showBonusModal.set(true));
        }
        if (component.manageUsersOpened) {
            component.manageUsersOpened.subscribe(() => this.setView('roles'));
        }
        if (component.customRoleModalOpened) {
            component.customRoleModalOpened.subscribe(() => this.showCustomRoleModal.set(true));
        }
        if (component.addUserModalOpened) {
            component.addUserModalOpened.subscribe(() => this.showAddUserModal.set(true));
        }
        if (component.roleSwitched) {
            component.roleSwitched.subscribe((role) => this.setRoleDirect(role));
        }
        if (component.settingsOpened) {
            component.settingsOpened.subscribe(() => this.setView('settings'));
        }
    }
    static ɵfac = function DashboardLayout_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardLayout)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardLayout, selectors: [["app-dashboard-layout"]], decls: 125, vars: 51, consts: [[1, "hidden", "lg:flex", "fixed", "inset-y-0", "left-0", "z-40", "flex-col", "bg-white", "dark:bg-slate-950", "border-r", "border-slate-200", "dark:border-slate-800/80", "transition-all", "duration-300", "ease-in-out", "select-none"], [1, "h-16", "px-4", "flex", "items-center", "justify-between", "border-b", "border-slate-200", "dark:border-slate-800/80"], [1, "flex", "items-center", "gap-3", "overflow-hidden"], ["routerLink", "/overview", 1, "w-9", "h-9", "rounded-xl", "bg-slate-950", "text-white", "dark:bg-white", "dark:text-slate-950", "flex", "items-center", "justify-center", "font-mono", "font-black", "text-sm", "shadow-md", "shrink-0", "cursor-pointer"], [1, "flex", "flex-col", "truncate"], ["type", "button", "aria-label", "Toggle sidebar", 1, "p-1.5", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "hover:bg-slate-100", "dark:hover:bg-slate-800/80", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click", "title"], [1, "!text-lg"], [1, "px-3", "pt-3"], [1, "flex-1", "overflow-y-auto", "px-3", "py-4", "space-y-5"], [1, "p-3", "border-t", "border-slate-200", "dark:border-slate-800/80", "bg-slate-50/80", "dark:bg-slate-950/80", "space-y-2"], [1, "flex", "flex-col", "items-center", "gap-2"], [1, "lg:hidden", "sticky", "top-0", "z-40", "bg-white/95", "dark:bg-slate-950/95", "backdrop-blur-md", "border-b", "border-slate-200", "dark:border-slate-800", "px-4", "h-16", "flex", "items-center", "justify-between", "shadow-2xs"], [1, "flex", "items-center", "gap-2.5"], ["type", "button", "aria-label", "Open navigation menu", 1, "p-2", "-ml-1", "text-slate-600", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-xl"], [1, "flex", "items-center", "gap-2"], [1, "w-8", "h-8", "rounded-lg", "bg-slate-950", "text-white", "dark:bg-white", "dark:text-slate-950", "flex", "items-center", "justify-center", "font-mono", "font-black", "text-xs", "shadow-sm"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "text-[9px]", "uppercase", "font-mono", "px-1", "py-0.2", "bg-emerald-500/15", "text-emerald-700", "dark:bg-emerald-500/20", "dark:text-emerald-400", "border", "border-emerald-500/30", "rounded", "font-semibold", "ml-1"], [1, "flex", "items-center", "gap-1.5"], [1, "px-2", "py-1", "rounded-lg", "bg-slate-100", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "gap-1.5", "text-[11px]", "font-semibold", "text-slate-700", "dark:text-slate-300"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500"], [1, "truncate", "max-w-[100px]"], ["type", "button", "title", "Sign Out / Switch Persona", "aria-label", "Sign out", 1, "p-1.5", "text-slate-400", "hover:text-red-600", "dark:hover:text-red-400", "rounded-lg", "hover:bg-red-50", "dark:hover:bg-red-950/30", "transition-colors", "cursor-pointer", 3, "click"], ["type", "button", "aria-label", "Toggle theme mode", 1, "p-1.5", "text-slate-600", "dark:text-slate-300", "hover:text-slate-950", "dark:hover:text-white", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click", "title"], ["type", "button", "title", "Dispatch alerts", "aria-label", "Dispatch alerts", 1, "relative", "p-1.5", "text-slate-600", "dark:text-slate-300", "hover:text-slate-950", "dark:hover:text-white", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "absolute", "top-0", "right-0", "w-3.5", "h-3.5", "bg-emerald-500", "text-slate-950", "rounded-full", "text-[8px]", "font-black", "font-mono", "flex", "items-center", "justify-center"], [1, "flex-1", "flex", "flex-col", "min-w-0", "transition-all", "duration-300", "ease-in-out", "bg-slate-100", "dark:bg-slate-950", "text-slate-900", "dark:text-slate-100"], [1, "hidden", "lg:flex", "sticky", "top-0", "z-30", "h-16", "bg-white/90", "dark:bg-slate-950/80", "backdrop-blur-md", "border-b", "border-slate-200", "dark:border-slate-800/80", "px-6", "items-center", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-2", "text-xs"], [1, "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "text-slate-300", "dark:text-slate-600"], [1, "text-slate-800", "dark:text-slate-300", "font-bold"], [1, "text-emerald-700", "dark:text-emerald-400", "font-mono", "font-medium"], [1, "flex", "items-center", "gap-3"], ["type", "button", "title", "Dispatch alerts", "aria-label", "Dispatch alerts", 1, "relative", "p-2", "text-slate-600", "dark:text-slate-400", "hover:text-slate-950", "dark:hover:text-white", "rounded-xl", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "absolute", "top-1", "right-1", "w-4", "h-4", "bg-emerald-500", "text-slate-950", "rounded-full", "text-[10px]", "font-black", "font-mono", "flex", "items-center", "justify-center", "animate-pulse"], [1, "relative"], [1, "fixed", "inset-0", "z-40"], ["type", "button", "aria-label", "User profile and account options", "aria-haspopup", "true", 1, "relative", "z-50", "flex", "items-center", "gap-2.5", "p-1.5", "pl-2", "pr-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "shadow-2xs", "cursor-pointer", "select-none", 3, "click"], [1, "relative", "w-8", "h-8", "rounded-lg", "bg-gradient-to-br", "from-slate-700", "to-slate-900", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-xs", "shrink-0", "shadow-inner"], [1, "absolute", "-bottom-0.5", "-right-0.5", "w-2", "h-2", "rounded-full", "bg-emerald-500", "border-2", "border-white", "dark:border-slate-900"], [1, "text-left", "hidden", "xl:block", "min-w-0"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "truncate", "max-w-[140px]", "leading-tight"], [1, "text-[10px]", "text-emerald-600", "dark:text-emerald-400", "font-mono", "font-medium", "truncate"], [1, "!text-base", "text-slate-400", "transition-transform", "duration-200"], ["role", "menu", 1, "absolute", "right-0", "mt-2", "w-72", "rounded-2xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "py-2", "z-50", "text-slate-800", "dark:text-slate-200", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "bg-gradient-to-r", "from-emerald-50", "via-teal-50", "to-emerald-50", "dark:from-slate-950", "dark:via-slate-900", "dark:to-slate-950", "border-b", "border-emerald-200", "dark:border-emerald-500/30", "px-4", "sm:px-6", "py-2.5", "text-xs", "shadow-xs", "transition-colors"], [1, "flex-1", "w-full", "max-w-screen-2xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-6", "pb-24", "lg:pb-12", "text-slate-900", "dark:text-slate-100"], [1, "rounded-2xl"], [3, "activate"], [1, "mt-auto", "border-t", "border-slate-200", "dark:border-slate-800/80", "bg-white", "dark:bg-slate-950", "py-5", "text-slate-500", "dark:text-slate-400"], [1, "max-w-screen-2xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-3", "text-xs"], [1, "font-bold", "text-slate-900", "dark:text-slate-200"], ["aria-hidden", "true", 1, "text-slate-300", "dark:text-slate-600"], [1, "flex", "items-center", "gap-4", "text-[11px]", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "flex", "items-center", "gap-1"], [1, "text-slate-300", "dark:text-slate-700"], [1, "lg:hidden", "fixed", "bottom-0", "left-0", "right-0", "z-30", "bg-white/95", "dark:bg-slate-950/95", "backdrop-blur-md", "border-t", "border-slate-200", "dark:border-slate-800", "text-slate-500", "dark:text-slate-400", "py-1.5", "px-2", "flex", "justify-around", "items-center", "safe-area-pb"], ["type", "button", 1, "flex", "flex-col", "items-center", "gap-0.5", "py-1", "px-2", "rounded-lg", "transition-colors", "relative", "cursor-pointer", 3, "text-slate-950", "dark:text-white", "font-bold", "title"], ["type", "button", 1, "flex", "flex-col", "items-center", "gap-0.5", "py-1", "px-2", "rounded-lg", "transition-colors", "relative", "cursor-pointer", 3, "click"], [1, "text-[10px]", "tracking-tight"], [1, "absolute", "top-0.5", "right-2", "w-3.5", "h-3.5", "bg-emerald-500", "text-slate-950", "rounded-full", "text-[8px]", "font-black", "font-mono", "flex", "items-center", "justify-center"], ["type", "button", 1, "flex", "flex-col", "items-center", "gap-0.5", "py-1", "px-2", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], [1, "fixed", "bottom-18", "lg:bottom-6", "right-6", "z-50", "bg-slate-900", "dark:bg-slate-950", "text-white", "border", "border-slate-700/80", "px-4", "py-3", "rounded-xl", "shadow-2xl", "flex", "items-center", "gap-3", "animate-in", "fade-in", "slide-in-from-bottom-2", "text-xs"], [1, "fixed", "inset-0", "z-50", "bg-black/60", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-4"], [3, "jobId"], [1, "text-sm", "font-black", "tracking-tight", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-1.5"], [1, "text-[10px]", "uppercase", "font-mono", "px-1.5", "py-0.2", "bg-emerald-500/15", "text-emerald-700", "dark:bg-emerald-500/20", "dark:text-emerald-400", "border", "border-emerald-500/30", "rounded", "font-semibold", "tracking-wider"], [1, "flex", "items-center", "gap-1.5", "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-mono", "mt-0.5"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500", "animate-pulse"], ["type", "button", 1, "w-full", "py-2", "px-3", "bg-slate-950", "hover:bg-slate-800", "text-white", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "justify-center", "gap-2", "group", "active:scale-[0.98]", "cursor-pointer", 3, "click", "title"], [1, "!text-lg", "group-hover:rotate-90", "transition-transform", "duration-200"], [1, "text-xs", "tracking-tight", "font-extrabold"], [1, "px-2.5", "text-[10px]", "font-mono", "uppercase", "tracking-wider", "text-slate-400", "dark:text-slate-500", "mb-2", "font-bold", "flex", "items-center", "justify-between"], [1, "space-y-1"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-2.5", "py-2.5", "rounded-xl", "text-xs", "font-semibold", "transition-all", "group", "cursor-pointer", 3, "class", "title"], [1, "text-[9px]", "font-normal", "text-slate-400", "dark:text-slate-500"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-2.5", "py-2.5", "rounded-xl", "text-xs", "font-semibold", "transition-all", "group", "cursor-pointer", 3, "click", "title"], [1, "!text-xl", "shrink-0"], [1, "flex-1", "text-left", "truncate"], [1, "px-1.5", "py-0.5", "bg-emerald-500/15", "text-emerald-800", "dark:bg-emerald-500/20", "dark:text-emerald-400", "text-[10px]", "font-mono", "rounded", "font-bold"], [1, "relative", "flex", "h-2", "w-2"], [1, "text-[10px]", "font-mono", "text-indigo-700", "dark:text-indigo-400", "font-bold", "bg-indigo-50", "dark:bg-indigo-500/20", "px-1.5", "py-0.5", "rounded", "border", "border-indigo-200", "dark:border-transparent"], [1, "text-[10px]", "font-mono", "text-emerald-700", "dark:text-emerald-400", "font-bold", "bg-emerald-50", "dark:bg-emerald-500/20", "px-1.5", "py-0.5", "rounded"], [1, "text-[10px]", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "text-[10px]", "font-mono", "text-emerald-700", "dark:text-emerald-400", "font-bold", "tabular-nums"], [1, "text-[10px]", "font-mono", "text-amber-700", "dark:text-amber-400", "font-bold", "bg-amber-50", "dark:bg-amber-500/20", "px-1.5", "py-0.5", "rounded"], [1, "animate-ping", "absolute", "inline-flex", "h-full", "w-full", "rounded-full", "bg-emerald-400", "opacity-75"], [1, "relative", "inline-flex", "rounded-full", "h-2", "w-2", "bg-emerald-500"], [1, "text-[10px]", "font-mono", "px-1.5", "py-0.5", "rounded-full", "bg-amber-500", "text-white", "font-bold", "animate-pulse"], [1, "p-1", "rounded-xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xs"], ["type", "button", "title", "Demo Mode: Simulated field data & test personas", 1, "flex-1", "py-1.5", "px-2", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", "cursor-pointer", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], ["type", "button", "title", "API Mode: Live MySQL database connection", 1, "flex-1", "py-1.5", "px-2", "rounded-lg", "text-xs", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", "cursor-pointer", 3, "click"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-400", "animate-pulse"], ["type", "button", "title", "Open Settings (Shop Location, SMS Gateways & Phone Directory)", 1, "w-full", "py-2", "px-3", "rounded-xl", "border", "transition-all", "flex", "items-center", "justify-between", "text-xs", "font-semibold", "shadow-2xs", "active:scale-98", "cursor-pointer", 3, "click"], [1, "!text-base"], [1, "font-semibold"], [1, "text-[10px]", "font-mono", "uppercase", "text-slate-400", "dark:text-slate-500", "font-bold"], [1, "flex", "items-center", "justify-between", "text-xs", "px-2", "pt-1"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "font-mono"], ["type", "button", "title", "Dispatch Alerts", "aria-label", "Dispatch alerts", 1, "relative", "p-1.5", "text-slate-500", "hover:text-slate-900", "dark:text-slate-400", "dark:hover:text-white", "hover:bg-slate-200/60", "dark:hover:bg-slate-800", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], [1, "absolute", "top-0", "right-0", "w-4", "h-4", "bg-emerald-500", "text-slate-950", "rounded-full", "text-[9px]", "font-black", "font-mono", "flex", "items-center", "justify-center", "animate-pulse"], ["type", "button", 1, "p-2", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click", "title"], ["type", "button", "title", "System, SMS & Shop Location Settings", "aria-label", "Settings", 1, "p-2", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], ["type", "button", "title", "Dispatch Alerts", "aria-label", "Dispatch alerts", 1, "relative", "p-2", "text-slate-500", "hover:text-slate-900", "dark:text-slate-400", "dark:hover:text-white", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], [1, "absolute", "top-0.5", "right-0.5", "w-3.5", "h-3.5", "bg-emerald-500", "text-slate-950", "rounded-full", "text-[8px]", "font-black", "font-mono", "flex", "items-center", "justify-center"], ["aria-hidden", "true", 1, "lg:hidden", "fixed", "inset-0", "z-50", "bg-black/60", "backdrop-blur-xs", "transition-opacity", "duration-300", "animate-in", "fade-in", 3, "click"], [1, "lg:hidden", "fixed", "inset-y-0", "left-0", "z-50", "w-80", "max-w-[85vw]", "bg-white", "dark:bg-slate-950", "shadow-2xl", "flex", "flex-col", "border-r", "border-slate-200", "dark:border-slate-800", "animate-in", "slide-in-from-left", "duration-300"], [1, "h-16", "px-4", "flex", "items-center", "justify-between", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "font-black", "text-slate-900", "dark:text-white", "text-base"], ["type", "button", "aria-label", "Close menu", 1, "p-2", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", 3, "click"], [1, "p-4", "border-b", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-900/50"], [1, "flex", "items-center", "justify-between", "mb-2"], ["for", "mobileRoleSelect", 1, "text-[11px]", "font-bold", "text-slate-500", "uppercase", "tracking-wider", "font-mono"], [1, "text-[10px]", "text-emerald-700", "dark:text-emerald-400", "font-mono", "font-medium"], ["id", "mobileRoleSelect", 1, "w-full", "text-xs", "font-bold", "bg-white", "dark:bg-slate-800", "border", "border-slate-300", "dark:border-slate-700", "rounded-xl", "px-3", "py-2", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500", 3, "change", "value"], [3, "value"], [1, "mt-3", "grid", "grid-cols-2", "gap-2"], ["type", "button", 1, "py-2", "px-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "text-slate-800", "dark:text-slate-200", "text-xs", "font-semibold", "flex", "items-center", "justify-center", "gap-1.5", "shadow-2xs", "cursor-pointer", 3, "click"], [1, "!text-sm", "text-emerald-500"], ["type", "button", 1, "py-2", "px-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "text-slate-800", "dark:text-slate-200", "hover:text-red-600", "dark:hover:text-red-400", "text-xs", "font-semibold", "flex", "items-center", "justify-center", "gap-1.5", "shadow-2xs", "cursor-pointer", 3, "click"], [1, "!text-sm"], [1, "mt-3", "pt-3", "border-t", "border-slate-200", "dark:border-slate-800"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-3", "py-2", "rounded-xl", "border", "text-xs", "font-bold", "shadow-2xs", "transition-all", "cursor-pointer", 3, "click"], [1, "!text-base", "text-cyan-600", "dark:text-cyan-400"], [1, "text-[10px]", "font-mono", "text-cyan-700", "dark:text-cyan-400", "uppercase", "font-bold"], [1, "flex-1", "overflow-y-auto", "p-3", "space-y-4"], [1, "p-4", "border-t", "border-slate-200", "dark:border-slate-800", "bg-slate-50/50", "dark:bg-slate-950/50", "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "justify-between", "text-xs", "text-slate-500"], [1, "font-mono", "text-[11px]"], [1, "font-mono", "text-[10px]", "text-slate-400"], [1, "grid", "grid-cols-2", "gap-2", "pt-1"], ["type", "button", 1, "w-full", "py-2.5", "bg-slate-950", "text-white", "dark:bg-white", "dark:text-slate-950", "font-bold", "rounded-xl", "text-xs", "flex", "items-center", "justify-center", "gap-2", "shadow-md", "cursor-pointer"], [1, "px-2.5", "text-[10px]", "font-mono", "uppercase", "tracking-wider", "text-slate-400", "dark:text-slate-500", "mb-1.5", "font-bold"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-xl", "text-xs", "font-semibold", "transition-all", "cursor-pointer", 3, "class"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-xl", "text-xs", "font-semibold", "transition-all", "cursor-pointer", 3, "click"], [1, "flex-1", "text-left"], ["type", "button", 1, "w-full", "py-2.5", "bg-slate-950", "text-white", "dark:bg-white", "dark:text-slate-950", "font-bold", "rounded-xl", "text-xs", "flex", "items-center", "justify-center", "gap-2", "shadow-md", "cursor-pointer", 3, "click"], [1, "fixed", "inset-0", "z-40", 3, "click"], [1, "px-4", "py-3", "border-b", "border-slate-100", "dark:border-slate-900"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-br", "from-slate-800", "to-slate-950", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-sm", "shrink-0", "border", "border-slate-700", "shadow-sm"], [1, "min-w-0", "flex-1"], [1, "text-xs", "font-black", "text-slate-900", "dark:text-white", "truncate"], [1, "flex", "items-center", "gap-1.5", "mt-0.5"], [1, "text-[10px]", "uppercase", "font-mono", "px-1.5", "py-0.2", "bg-emerald-500/15", "text-emerald-700", "dark:text-emerald-400", "border", "border-emerald-500/30", "rounded", "font-bold"], [1, "text-[10px]", "text-slate-400", "font-mono", "truncate"], [1, "py-1", "text-xs"], ["type", "button", 1, "w-full", "px-4", "py-2.5", "flex", "items-center", "justify-between", "text-left", "hover:bg-slate-50", "dark:hover:bg-slate-900", "transition-colors", "cursor-pointer", 3, "click"], [1, "font-medium"], [1, "text-[11px]", "font-mono", "px-2", "py-0.5", "rounded-md", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400", "font-semibold"], ["type", "button", 1, "w-full", "px-4", "py-2.5", "flex", "items-center", "gap-2.5", "text-left", "hover:bg-slate-50", "dark:hover:bg-slate-900", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-lg", "text-cyan-600", "dark:text-cyan-400"], [1, "text-[10px]", "text-slate-400"], [1, "!text-lg", "text-emerald-600", "dark:text-emerald-400"], [1, "pt-1", "mt-1", "border-t", "border-slate-100", "dark:border-slate-900", "text-xs"], ["type", "button", 1, "w-full", "px-4", "py-2.5", "flex", "items-center", "gap-2.5", "text-left", "text-red-600", "dark:text-red-400", "hover:bg-red-50", "dark:hover:bg-red-950/30", "transition-colors", "font-semibold", "cursor-pointer", 3, "click"], [1, "max-w-screen-2xl", "mx-auto", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-2.5"], [1, "flex", "items-center", "gap-3", "min-w-0"], [1, "relative", "flex", "h-2.5", "w-2.5", "shrink-0"], [1, "relative", "inline-flex", "rounded-full", "h-2.5", "w-2.5", "bg-emerald-500"], [1, "flex", "flex-wrap", "items-center", "gap-2", "truncate"], [1, "px-2", "py-0.5", "rounded-full", "bg-emerald-500/20", "text-emerald-800", "dark:text-emerald-300", "font-mono", "text-[10px]", "font-bold"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-slate-300", "dark:text-slate-600", "hidden", "sm:inline"], [1, "font-bold", "text-slate-900", "dark:text-white", "truncate"], [1, "text-slate-600", "dark:text-slate-400", "truncate", "max-w-xs"], [1, "text-slate-300", "dark:text-slate-600", "hidden", "md:inline"], [1, "text-slate-600", "dark:text-slate-400", "hidden", "md:inline"], [1, "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "gap-2", "shrink-0", "self-end", "sm:self-auto"], ["type", "button", 1, "px-2.5", "py-1", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "rounded-lg", "text-[11px]", "font-bold", "flex", "items-center", "gap-1", "shadow-2xs", "transition-colors", "cursor-pointer"], ["type", "button", 1, "px-2.5", "py-1", "bg-white", "dark:bg-slate-800", "hover:bg-slate-50", "dark:hover:bg-slate-700", "text-slate-800", "dark:text-slate-200", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "text-[11px]", "font-medium", "flex", "items-center", "gap-1", "transition-colors", "shadow-2xs", "cursor-pointer", 3, "click"], [1, "!text-xs", "text-emerald-600", "dark:text-emerald-400"], ["type", "button", 1, "px-2.5", "py-1", "bg-white", "dark:bg-slate-800", "hover:bg-slate-50", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "text-[11px]", "font-medium", "hover:text-slate-900", "dark:hover:text-white", "transition-colors", "shadow-2xs", "cursor-pointer", 3, "click"], ["type", "button", 1, "px-2.5", "py-1", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "rounded-lg", "text-[11px]", "font-bold", "flex", "items-center", "gap-1", "shadow-2xs", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-xs"], ["type", "button", 1, "flex", "flex-col", "items-center", "gap-0.5", "py-1", "px-2", "rounded-lg", "transition-colors", "relative", "cursor-pointer", 3, "click", "title"], [1, "text-[10px]", "tracking-tight", "truncate", "max-w-[68px]"], [1, "absolute", "top-1", "right-2", "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "!text-base", "text-emerald-400"], ["type", "button", "aria-label", "Dismiss message", 1, "text-slate-400", "hover:text-white", "ml-1", "cursor-pointer", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "text-slate-900", "dark:text-white", "rounded-2xl", "max-w-sm", "w-full", "p-6", "space-y-5", "shadow-2xl", "animate-in", "zoom-in-95"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono"], ["type", "button", "aria-label", "Close modal", 1, "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", "p-1", "rounded", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", 3, "click"], [1, "text-center", "space-y-2"], [1, "w-16", "h-16", "rounded-2xl", "bg-gradient-to-br", "from-slate-700", "to-slate-800", "border-2", "border-slate-600", "text-white", "flex", "items-center", "justify-center", "font-bold", "text-2xl", "mx-auto", "shadow-inner"], [1, "text-base", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "font-mono", "mt-0.5"], [1, "bg-slate-50", "dark:bg-slate-950", "p-3.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "text-xs", "space-y-1"], [1, "text-slate-500", "dark:text-slate-400"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "truncate"], [1, "grid", "grid-cols-2", "gap-2.5"], ["type", "button", 1, "py-2.5", "px-3", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-bold", "rounded-xl", "text-xs", "flex", "items-center", "justify-center", "gap-1.5", "transition-colors", "shadow-md", "cursor-pointer", 3, "click"], ["type", "button", 1, "py-2.5", "px-3", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-900", "dark:text-white", "font-bold", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-xs", "flex", "items-center", "justify-center", "gap-1.5", "transition-colors", "cursor-pointer", 3, "click"], [3, "closed", "jobId"], [3, "closed"], [3, "closed", "userCreated"], [3, "closed", "jobSelected"]], template: function DashboardLayout_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
            i0.ɵɵtext(4, " DM ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, DashboardLayout_Conditional_5_Template, 10, 0, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 5);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_6_listener() { return ctx.toggleSidebarCollapse(); });
            i0.ɵɵelementStart(7, "mat-icon", 6);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(9, DashboardLayout_Conditional_9_Template, 5, 4, "div", 7);
            i0.ɵɵelementStart(10, "div", 8);
            i0.ɵɵrepeaterCreate(11, DashboardLayout_For_12_Template, 5, 1, "div", null, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 9);
            i0.ɵɵconditionalCreate(14, DashboardLayout_Conditional_14_Template, 30, 30)(15, DashboardLayout_Conditional_15_Template, 11, 7, "div", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "header", 11)(17, "div", 12)(18, "button", 13);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_18_listener() { return ctx.toggleMobileSidebar(); });
            i0.ɵɵelementStart(19, "mat-icon", 14);
            i0.ɵɵtext(20, "menu");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 15)(22, "div", 16);
            i0.ɵɵtext(23, " DM ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div")(25, "span", 17);
            i0.ɵɵtext(26, "DoorMaster");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "span", 18);
            i0.ɵɵtext(28, " PRO ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(29, "div", 19)(30, "div", 20);
            i0.ɵɵelement(31, "span", 21);
            i0.ɵɵelementStart(32, "span", 22);
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "button", 23);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_34_listener() { return ctx.openSignInPage(); });
            i0.ɵɵelementStart(35, "mat-icon", 6);
            i0.ɵɵtext(36, "logout");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "button", 24);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_37_listener() { return ctx.themeStore.toggleTheme(); });
            i0.ɵɵelementStart(38, "mat-icon", 6);
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "button", 25);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_40_listener() { return ctx.showNotificationDrawer.set(true); });
            i0.ɵɵelementStart(41, "mat-icon", 6);
            i0.ɵɵtext(42, "notifications");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(43, DashboardLayout_Conditional_43_Template, 2, 1, "span", 26);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(44, DashboardLayout_Conditional_44_Template, 63, 4);
            i0.ɵɵelementStart(45, "div", 27)(46, "header", 28)(47, "div", 29)(48, "span", 30);
            i0.ɵɵtext(49, "DoorMaster");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "span", 31);
            i0.ɵɵtext(51, "/");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "span", 32);
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span", 31);
            i0.ɵɵtext(55, "/");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span", 33);
            i0.ɵɵtext(57);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "div", 34)(59, "button", 35);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_59_listener() { return ctx.showNotificationDrawer.set(true); });
            i0.ɵɵelementStart(60, "mat-icon", 14);
            i0.ɵɵtext(61, "notifications");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(62, DashboardLayout_Conditional_62_Template, 2, 1, "span", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 37);
            i0.ɵɵconditionalCreate(64, DashboardLayout_Conditional_64_Template, 1, 0, "div", 38);
            i0.ɵɵelementStart(65, "button", 39);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_65_listener() { return ctx.toggleProfileDropdown(); });
            i0.ɵɵelementStart(66, "div", 40);
            i0.ɵɵtext(67);
            i0.ɵɵelement(68, "span", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "div", 42)(70, "p", 43);
            i0.ɵɵtext(71);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "p", 44);
            i0.ɵɵtext(73);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "mat-icon", 45);
            i0.ɵɵtext(75, " keyboard_arrow_down ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(76, DashboardLayout_Conditional_76_Template, 44, 10, "div", 46);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(77, DashboardLayout_Conditional_77_Template, 38, 7, "div", 47);
            i0.ɵɵelementStart(78, "main", 48)(79, "div", 49)(80, "router-outlet", 50);
            i0.ɵɵlistener("activate", function DashboardLayout_Template_router_outlet_activate_80_listener($event) { return ctx.onRouteActivated($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(81, "footer", 51)(82, "div", 52)(83, "div", 15)(84, "span", 53);
            i0.ɵɵtext(85, "DoorMaster Pro Field Ops");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "span", 54);
            i0.ɵɵtext(87, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "span");
            i0.ɵɵtext(89, "Architectural Entrance Systems & Hardware Fitting");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(90, "div", 55)(91, "span", 56);
            i0.ɵɵelement(92, "span", 21);
            i0.ɵɵelementStart(93, "span");
            i0.ɵɵtext(94, "GPS Geofence Verified");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(95, "span", 57);
            i0.ɵɵtext(96, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "span");
            i0.ɵɵtext(98, "Digital Signature Legal Archival");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "span", 57);
            i0.ɵɵtext(100, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "span");
            i0.ɵɵtext(102, "Incentive Matrix");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(103, "nav", 58);
            i0.ɵɵrepeaterCreate(104, DashboardLayout_For_105_Template, 6, 12, "button", 59, _forTrack0);
            i0.ɵɵelementStart(106, "button", 60);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_106_listener() { return ctx.showNotificationDrawer.set(true); });
            i0.ɵɵelementStart(107, "mat-icon", 14);
            i0.ɵɵtext(108, "notifications");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "span", 61);
            i0.ɵɵtext(110, "Alerts");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(111, DashboardLayout_Conditional_111_Template, 2, 1, "span", 62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "button", 63);
            i0.ɵɵlistener("click", function DashboardLayout_Template_button_click_112_listener() { return ctx.toggleMobileSidebar(); });
            i0.ɵɵelementStart(113, "mat-icon", 14);
            i0.ɵɵtext(114, "menu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "span", 61);
            i0.ɵɵtext(116, "Menu");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(117, DashboardLayout_Conditional_117_Template, 8, 1, "div", 64);
            i0.ɵɵconditionalCreate(118, DashboardLayout_Conditional_118_Template, 39, 6, "div", 65);
            i0.ɵɵconditionalCreate(119, DashboardLayout_Conditional_119_Template, 1, 1, "app-job-detail-modal", 66);
            i0.ɵɵconditionalCreate(120, DashboardLayout_Conditional_120_Template, 1, 0, "app-new-job-modal");
            i0.ɵɵconditionalCreate(121, DashboardLayout_Conditional_121_Template, 1, 0, "app-bonus-modal");
            i0.ɵɵconditionalCreate(122, DashboardLayout_Conditional_122_Template, 1, 0, "app-custom-role-modal");
            i0.ɵɵconditionalCreate(123, DashboardLayout_Conditional_123_Template, 1, 0, "app-add-user-modal");
            i0.ɵɵconditionalCreate(124, DashboardLayout_Conditional_124_Template, 1, 0, "app-notification-drawer");
        } if (rf & 2) {
            i0.ɵɵclassProp("w-72", !ctx.sidebarCollapsed())("w-20", ctx.sidebarCollapsed());
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(!ctx.sidebarCollapsed() ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.sidebarCollapsed() ? "Expand Sidebar" : "Collapse Sidebar");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.sidebarCollapsed() ? "chevron_right" : "chevron_left");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.store.currentRoleDefinition().permissions.canCreateJobs ? 9 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.filteredMenuSections());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.sidebarCollapsed() ? 14 : 15);
            i0.ɵɵadvance(19);
            i0.ɵɵtextInterpolate(ctx.store.currentRoleDefinition().label);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("title", ctx.themeStore.isDark() ? "Switch to Light Mode" : "Switch to Dark Mode");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("text-amber-500", !ctx.themeStore.isDark())("text-indigo-400", ctx.themeStore.isDark());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.themeStore.isDark() ? "dark_mode" : "light_mode", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.store.unreadNotificationsCount() > 0 ? 43 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mobileSidebarOpen() ? 44 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("lg:pl-72", !ctx.sidebarCollapsed())("lg:pl-20", ctx.sidebarCollapsed());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.currentViewLabel());
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.store.stats().inProgress, " Active Site Operations");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.store.unreadNotificationsCount() > 0 ? 62 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.profileDropdownOpen() ? 64 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("ring-2", ctx.profileDropdownOpen())("ring-emerald-500/30", ctx.profileDropdownOpen());
            i0.ɵɵattribute("aria-expanded", ctx.profileDropdownOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.store.currentRoleDefinition().name.charAt(0), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.store.currentRoleDefinition().name, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.store.currentRoleDefinition().label, " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("rotate-180", ctx.profileDropdownOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.profileDropdownOpen() ? 76 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeLiveJob() ? 77 : -1);
            i0.ɵɵadvance(27);
            i0.ɵɵrepeater(ctx.filteredMenuItems().slice(0, 3));
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.store.unreadNotificationsCount() > 0 ? 111 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("text-slate-950", ctx.mobileSidebarOpen())("dark:text-white", ctx.mobileSidebarOpen());
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.toastMessage() ? 117 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.contactModalOpen() && ctx.activeContactInfo() ? 118 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.inspectedJobId() ? 119 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showNewJobModal() ? 120 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showBonusModal() ? 121 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showCustomRoleModal() ? 122 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showAddUserModal() ? 123 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showNotificationDrawer() ? 124 : -1);
        } }, dependencies: [CommonModule,
            RouterOutlet,
            RouterLink,
            MatIconModule, i1.MatIcon, JobDetailModal,
            NewJobModal,
            BonusModal,
            CustomRoleModal,
            AddUserModal,
            NotificationDrawer], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardLayout, [{
        type: Component,
        args: [{ selector: 'app-dashboard-layout', changeDetection: ChangeDetectionStrategy.OnPush, imports: [
                    CommonModule,
                    RouterOutlet,
                    RouterLink,
                    MatIconModule,
                    JobDetailModal,
                    NewJobModal,
                    BonusModal,
                    CustomRoleModal,
                    AddUserModal,
                    NotificationDrawer
                ], template: "<!-- ========================================================================= -->\n<!-- 1. DESKTOP FIXED LEFT SIDEBAR (Uber Fleet & Handyman Dispatch Architecture) -->\n<!-- ========================================================================= -->\n<aside \n  class=\"hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 ease-in-out select-none\"\n  [class.w-72]=\"!sidebarCollapsed()\"\n  [class.w-20]=\"sidebarCollapsed()\"\n>\n  <!-- Sidebar Header: Brand & Collapse Toggle -->\n  <div class=\"h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80\">\n    <div class=\"flex items-center gap-3 overflow-hidden\">\n      <a routerLink=\"/overview\" class=\"w-9 h-9 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-mono font-black text-sm shadow-md shrink-0 cursor-pointer\">\n        DM\n      </a>\n      @if (!sidebarCollapsed()) {\n        <div class=\"flex flex-col truncate\">\n          <span class=\"text-sm font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5\">\n            <span>DoorMaster</span>\n            <span class=\"text-[10px] uppercase font-mono px-1.5 py-0.2 bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30 rounded font-semibold tracking-wider\">\n              PRO\n            </span>\n          </span>\n          <div class=\"flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5\">\n            <span class=\"w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse\"></span>\n            <span>LIVE DISPATCH</span>\n          </div>\n        </div>\n      }\n    </div>\n\n    <button \n      type=\"button\"\n      (click)=\"toggleSidebarCollapse()\"\n      class=\"p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer\"\n      [title]=\"sidebarCollapsed() ? 'Expand Sidebar' : 'Collapse Sidebar'\"\n      aria-label=\"Toggle sidebar\"\n    >\n      <mat-icon class=\"!text-lg\">{{ sidebarCollapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>\n    </button>\n  </div>\n\n\n\n  <!-- Quick Action: Book Installation -->\n  @if (store.currentRoleDefinition().permissions.canCreateJobs) {\n    <div class=\"px-3 pt-3\">\n      <button \n        type=\"button\"\n        (click)=\"showNewJobModal.set(true)\"\n        class=\"w-full py-2 px-3 bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer\"\n        [class.px-0]=\"sidebarCollapsed()\"\n        [title]=\"'Book Door Installation'\"\n      >\n        <mat-icon class=\"!text-lg group-hover:rotate-90 transition-transform duration-200\">add</mat-icon>\n        @if (!sidebarCollapsed()) {\n          <span class=\"text-xs tracking-tight font-extrabold\">Book Installation</span>\n        }\n      </button>\n    </div>\n  }\n\n  <!-- Navigation Menu Links: Filtered specific to active Persona -->\n  <div class=\"flex-1 overflow-y-auto px-3 py-4 space-y-5\">\n    @for (section of filteredMenuSections(); track section.id) {\n      <div>\n        @if (!sidebarCollapsed()) {\n          <h3 class=\"px-2.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 font-bold flex items-center justify-between\">\n            <span>{{ section.title }}</span>\n            <span class=\"text-[9px] font-normal text-slate-400 dark:text-slate-500\">({{ section.items.length }})</span>\n          </h3>\n        }\n        <nav class=\"space-y-1\">\n          @for (item of section.items; track item.id) {\n            <button \n              type=\"button\"\n              (click)=\"setView(item.id)\"\n              class=\"w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer\"\n              [class]=\"currentView() === item.id ? 'bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900'\"\n              [title]=\"item.label + ' \u2022 ' + item.description\"\n            >\n              <mat-icon class=\"!text-xl shrink-0\" [class]=\"currentView() === item.id ? item.activeColor : item.iconColor\">{{ item.icon }}</mat-icon>\n              @if (!sidebarCollapsed()) {\n                <span class=\"flex-1 text-left truncate\">{{ item.label }}</span>\n                \n                @if (item.badgeType === 'live' && store.stats().inProgress > 0) {\n                  <span class=\"px-1.5 py-0.5 bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-mono rounded font-bold\">\n                    {{ store.stats().inProgress }} live\n                  </span>\n                }\n                @else if (item.badgeType === 'ping') {\n                  <span class=\"relative flex h-2 w-2\">\n                    <span class=\"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75\"></span>\n                    <span class=\"relative inline-flex rounded-full h-2 w-2 bg-emerald-500\"></span>\n                  </span>\n                }\n                @else if (item.badgeType === 'eta') {\n                  <span class=\"text-[10px] font-mono text-indigo-700 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-transparent\">\n                    ETA\n                  </span>\n                }\n                @else if (item.badgeType === 'count' && item.id === 'doors') {\n                  <span class=\"text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/20 px-1.5 py-0.5 rounded\">\n                    {{ store.doors().length }}\n                  </span>\n                }\n                @else if (item.badgeType === 'count' && item.id === 'shop') {\n                  <span class=\"text-[10px] font-mono text-slate-500 dark:text-slate-400\">\n                    {{ store.jobs().length }}\n                  </span>\n                }\n                @else if (item.badgeType === 'count' && item.id === 'roles') {\n                  @if (store.pendingUsers().length > 0) {\n                    <span class=\"text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-bold animate-pulse\">\n                      {{ store.pendingUsers().length }}\n                    </span>\n                  } @else {\n                    <span class=\"text-[10px] font-mono text-slate-500 dark:text-slate-400\">\n                      {{ store.users().length }}\n                    </span>\n                  }\n                }\n                @else if (item.badgeType === 'currency') {\n                  <span class=\"text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold tabular-nums\">\n                    ${{ store.stats().totalBonusesAllocated }}\n                  </span>\n                }\n                @else if (item.badgeType === 'ledger') {\n                  <span class=\"text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-500/20 px-1.5 py-0.5 rounded\">\n                    Ledger\n                  </span>\n                }\n              }\n            </button>\n          }\n        </nav>\n      </div>\n    }\n  </div>\n\n  <!-- Sidebar Footer: Demo/API Toggle, Settings Hub Button & Alerts -->\n  <div class=\"p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/80 space-y-2\">\n    @if (!sidebarCollapsed()) {\n      <!-- Demo Mode vs Live MySQL API Mode Toggle (Moved to sidebar) -->\n      <div class=\"p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs\">\n        <div class=\"flex items-center gap-1\">\n          <button \n            type=\"button\"\n            (click)=\"store.setDataMode('demo')\"\n            class=\"flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer\"\n            [class.bg-emerald-500]=\"store.dataMode() === 'demo'\"\n            [class.text-slate-950]=\"store.dataMode() === 'demo'\"\n            [class.text-slate-600]=\"store.dataMode() !== 'demo'\"\n            [class.dark:text-slate-400]=\"store.dataMode() !== 'demo'\"\n            [class.hover:bg-slate-100]=\"store.dataMode() !== 'demo'\"\n            [class.dark:hover:bg-slate-800]=\"store.dataMode() !== 'demo'\"\n            title=\"Demo Mode: Simulated field data & test personas\"\n          >\n            <mat-icon class=\"!text-sm !w-4 !h-4\">science</mat-icon>\n            <span>Demo</span>\n          </button>\n          <button \n            type=\"button\"\n            (click)=\"store.setDataMode('api')\"\n            class=\"flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer\"\n            [class.bg-indigo-600]=\"store.dataMode() === 'api'\"\n            [class.text-white]=\"store.dataMode() === 'api'\"\n            [class.text-slate-600]=\"store.dataMode() !== 'api'\"\n            [class.dark:text-slate-400]=\"store.dataMode() !== 'api'\"\n            [class.hover:bg-slate-100]=\"store.dataMode() !== 'api'\"\n            [class.dark:hover:bg-slate-800]=\"store.dataMode() !== 'api'\"\n            title=\"API Mode: Live MySQL database connection\"\n          >\n            <mat-icon class=\"!text-sm !w-4 !h-4\">storage</mat-icon>\n            <span>MySQL</span>\n            @if (store.dbStatus()?.connected) {\n              <span class=\"w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse\"></span>\n            }\n          </button>\n        </div>\n      </div>\n\n      <!-- Settings Hub Button in Sidebar (Replaces Light Mode button) -->\n      <button \n        type=\"button\"\n        (click)=\"setView('settings')\"\n        class=\"w-full py-2 px-3 rounded-xl border transition-all flex items-center justify-between text-xs font-semibold shadow-2xs active:scale-98 cursor-pointer\"\n        [class]=\"currentView() === 'settings' \n          ? 'border-cyan-500 bg-cyan-50 text-cyan-900 dark:bg-cyan-950/70 dark:text-cyan-200 dark:border-cyan-700 shadow-xs' \n          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'\"\n        title=\"Open Settings (Shop Location, SMS Gateways & Phone Directory)\"\n      >\n        <div class=\"flex items-center gap-2\">\n          <mat-icon class=\"!text-base\" [class]=\"currentView() === 'settings' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'\">\n            tune\n          </mat-icon>\n          <span class=\"font-semibold\">Settings Hub</span>\n        </div>\n        <span class=\"text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 font-bold\">\n          Shop / SMS\n        </span>\n      </button>\n\n      <div class=\"flex items-center justify-between text-xs px-2 pt-1\">\n        <div class=\"flex items-center gap-2\">\n          <span class=\"w-2 h-2 rounded-full bg-emerald-500 animate-pulse\"></span>\n          <span class=\"text-[11px] text-slate-500 dark:text-slate-400 font-mono\">Radar Active</span>\n        </div>\n\n        <button \n          type=\"button\"\n          (click)=\"showNotificationDrawer.set(true)\"\n          class=\"relative p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer\"\n          title=\"Dispatch Alerts\"\n          aria-label=\"Dispatch alerts\"\n        >\n          <mat-icon class=\"!text-lg\">notifications</mat-icon>\n          @if (store.unreadNotificationsCount() > 0) {\n            <span class=\"absolute top-0 right-0 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-black font-mono flex items-center justify-center animate-pulse\">\n              {{ store.unreadNotificationsCount() }}\n            </span>\n          }\n        </button>\n      </div>\n    } @else {\n      <!-- Collapsed: Demo/API toggle + settings + notifications -->\n      <div class=\"flex flex-col items-center gap-2\">\n        <button \n          type=\"button\"\n          (click)=\"store.setDataMode(store.dataMode() === 'demo' ? 'api' : 'demo')\"\n          class=\"p-2 rounded-lg transition-colors cursor-pointer\"\n          [class]=\"store.dataMode() === 'api' \n            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' \n            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'\"\n          [title]=\"store.dataMode() === 'api' ? 'Active: MySQL API Mode. Click for Demo' : 'Active: Demo Mode. Click for MySQL API'\"\n        >\n          <mat-icon class=\"!text-lg\">{{ store.dataMode() === 'api' ? 'storage' : 'science' }}</mat-icon>\n        </button>\n\n        <button \n          type=\"button\"\n          (click)=\"setView('settings')\"\n          class=\"p-2 rounded-lg transition-colors cursor-pointer\"\n          [class]=\"currentView() === 'settings' \n            ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300' \n            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'\"\n          title=\"System, SMS & Shop Location Settings\"\n          aria-label=\"Settings\"\n        >\n          <mat-icon class=\"!text-lg\">tune</mat-icon>\n        </button>\n\n        <button \n          type=\"button\"\n          (click)=\"showNotificationDrawer.set(true)\"\n          class=\"relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer\"\n          title=\"Dispatch Alerts\"\n          aria-label=\"Dispatch alerts\"\n        >\n          <mat-icon class=\"!text-lg\">notifications</mat-icon>\n          @if (store.unreadNotificationsCount() > 0) {\n            <span class=\"absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 text-slate-950 rounded-full text-[8px] font-black font-mono flex items-center justify-center\">\n              {{ store.unreadNotificationsCount() }}\n            </span>\n          }\n        </button>\n      </div>\n    }\n  </div>\n</aside>\n\n<!-- ========================================================================= -->\n<!-- 2. MOBILE TOP NAVIGATION BAR (Handyman & Uber Mobile App Header)            -->\n<!-- ========================================================================= -->\n<header class=\"lg:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-16 flex items-center justify-between shadow-2xs\">\n  <div class=\"flex items-center gap-2.5\">\n    <button \n      type=\"button\"\n      (click)=\"toggleMobileSidebar()\"\n      class=\"p-2 -ml-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer\"\n      aria-label=\"Open navigation menu\"\n    >\n      <mat-icon class=\"!text-xl\">menu</mat-icon>\n    </button>\n\n    <div class=\"flex items-center gap-2\">\n      <div class=\"w-8 h-8 rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-mono font-black text-xs shadow-sm\">\n        DM\n      </div>\n      <div>\n        <span class=\"text-sm font-black text-slate-900 dark:text-white tracking-tight\">DoorMaster</span>\n        <span class=\"text-[9px] uppercase font-mono px-1 py-0.2 bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30 rounded font-semibold ml-1\">\n          PRO\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"flex items-center gap-1.5\">\n    <!-- Active persona chip -->\n    <div class=\"px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300\">\n      <span class=\"w-1.5 h-1.5 rounded-full bg-emerald-500\"></span>\n      <span class=\"truncate max-w-[100px]\">{{ store.currentRoleDefinition().label }}</span>\n    </div>\n\n    <!-- Sign Out button -->\n    <button \n      type=\"button\" \n      (click)=\"openSignInPage()\"\n      class=\"p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer\"\n      title=\"Sign Out / Switch Persona\"\n      aria-label=\"Sign out\"\n    >\n      <mat-icon class=\"!text-lg\">logout</mat-icon>\n    </button>\n\n    <!-- Theme Mode Toggle Button on Mobile Header -->\n    <button \n      type=\"button\" \n      (click)=\"themeStore.toggleTheme()\"\n      class=\"p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer\"\n      [title]=\"themeStore.isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'\"\n      aria-label=\"Toggle theme mode\"\n    >\n      <mat-icon class=\"!text-lg\" [class.text-amber-500]=\"!themeStore.isDark()\" [class.text-indigo-400]=\"themeStore.isDark()\">\n        {{ themeStore.isDark() ? 'dark_mode' : 'light_mode' }}\n      </mat-icon>\n    </button>\n\n    <!-- Alerts bell -->\n    <button \n      type=\"button\"\n      (click)=\"showNotificationDrawer.set(true)\"\n      class=\"relative p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer\"\n      title=\"Dispatch alerts\"\n      aria-label=\"Dispatch alerts\"\n    >\n      <mat-icon class=\"!text-lg\">notifications</mat-icon>\n      @if (store.unreadNotificationsCount() > 0) {\n        <span class=\"absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 text-slate-950 rounded-full text-[8px] font-black font-mono flex items-center justify-center\">\n          {{ store.unreadNotificationsCount() }}\n        </span>\n      }\n    </button>\n  </div>\n</header>\n\n<!-- ========================================================================= -->\n<!-- 3. MOBILE SIDEBAR DRAWER (Slide-over navigation)                           -->\n<!-- ========================================================================= -->\n@if (mobileSidebarOpen()) {\n  <!-- Overlay Backdrop -->\n  <div \n    class=\"lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in\"\n    (click)=\"closeMobileSidebar()\"\n    aria-hidden=\"true\"\n  ></div>\n\n  <!-- Slide-over Drawer Panel -->\n  <div class=\"lg:hidden fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-slate-950 shadow-2xl flex flex-col border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-300\">\n    <div class=\"h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800\">\n      <div class=\"flex items-center gap-2.5\">\n        <div class=\"w-8 h-8 rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-mono font-black text-xs shadow-sm\">\n          DM\n        </div>\n        <span class=\"font-black text-slate-900 dark:text-white text-base\">DoorMaster Operations</span>\n      </div>\n      <button \n        type=\"button\"\n        (click)=\"closeMobileSidebar()\"\n        class=\"p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer\"\n        aria-label=\"Close menu\"\n      >\n        <mat-icon class=\"!text-xl\">close</mat-icon>\n      </button>\n    </div>\n\n    <!-- Active Persona Switcher inside Drawer -->\n    <div class=\"p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50\">\n      <div class=\"flex items-center justify-between mb-2\">\n        <label for=\"mobileRoleSelect\" class=\"text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono\">Current Persona</label>\n        <span class=\"text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-medium\">Logged in</span>\n      </div>\n      <select \n        id=\"mobileRoleSelect\"\n        [value]=\"store.currentRole()\"\n        (change)=\"onRoleChange($event)\"\n        class=\"w-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500\"\n      >\n        @for (r of store.roles(); track r.id) {\n          <option [value]=\"r.id\">{{ r.name }} ({{ r.label }})</option>\n        }\n      </select>\n\n      <div class=\"mt-3 grid grid-cols-2 gap-2\">\n        <button \n          type=\"button\"\n          (click)=\"openLandingPage(); closeMobileSidebar()\"\n          class=\"py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer\"\n        >\n          <mat-icon class=\"!text-sm text-emerald-500\">public</mat-icon>\n          <span>Public Site</span>\n        </button>\n\n        <button \n          type=\"button\"\n          (click)=\"openSignInPage(); closeMobileSidebar()\"\n          class=\"py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer\"\n        >\n          <mat-icon class=\"!text-sm\">logout</mat-icon>\n          <span>Sign Out</span>\n        </button>\n      </div>\n\n      <!-- Settings Hub inside Mobile Drawer -->\n      <div class=\"mt-3 pt-3 border-t border-slate-200 dark:border-slate-800\">\n        <button\n          type=\"button\"\n          (click)=\"setView('settings')\"\n          class=\"w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-bold shadow-2xs transition-all cursor-pointer\"\n          [class]=\"currentView() === 'settings' \n            ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-400 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200' \n            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'\"\n        >\n          <span class=\"flex items-center gap-2\">\n            <mat-icon class=\"!text-base text-cyan-600 dark:text-cyan-400\">tune</mat-icon>\n            <span>System & Shop Settings</span>\n          </span>\n          <span class=\"text-[10px] font-mono text-cyan-700 dark:text-cyan-400 uppercase font-bold\">Open</span>\n        </button>\n      </div>\n    </div>\n\n    <!-- Navigation links in Mobile Drawer: Filtered specific to active Persona -->\n    <div class=\"flex-1 overflow-y-auto p-3 space-y-4\">\n      @for (section of filteredMenuSections(); track section.id) {\n        <div>\n          <h3 class=\"px-2.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 font-bold\">\n            {{ section.title }}\n          </h3>\n          <nav class=\"space-y-1\">\n            @for (item of section.items; track item.id) {\n              <button \n                type=\"button\"\n                (click)=\"setView(item.id)\"\n                class=\"w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer\"\n                [class]=\"currentView() === item.id ? 'bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-900'\"\n              >\n                <mat-icon class=\"!text-xl\" [class]=\"currentView() === item.id ? item.activeColor : item.iconColor\">{{ item.icon }}</mat-icon>\n                <span class=\"flex-1 text-left\">{{ item.label }}</span>\n                @if (item.badgeType === 'live' && store.stats().inProgress > 0) {\n                  <span class=\"px-1.5 py-0.5 bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-mono rounded font-bold\">\n                    {{ store.stats().inProgress }} live\n                  </span>\n                }\n              </button>\n            }\n          </nav>\n        </div>\n      }\n    </div>\n\n    <div class=\"p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col gap-2\">\n      <div class=\"flex items-center justify-between text-xs text-slate-500\">\n        <span class=\"flex items-center gap-1.5\">\n          <span class=\"w-2 h-2 rounded-full bg-emerald-500 animate-pulse\"></span>\n          <span class=\"font-mono text-[11px]\">Accra Fleet Radar</span>\n        </span>\n        <span class=\"font-mono text-[10px] text-slate-400\">v2.4 Live</span>\n      </div>\n\n      <div class=\"grid grid-cols-2 gap-2 pt-1\">\n        <button \n          type=\"button\"\n          (click)=\"openLandingPage(); closeMobileSidebar()\"\n          class=\"py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer\"\n        >\n          <mat-icon class=\"!text-sm text-emerald-500\">public</mat-icon>\n          <span>Public Site</span>\n        </button>\n\n        <button \n          type=\"button\"\n          (click)=\"openSignInPage(); closeMobileSidebar()\"\n          class=\"py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer\"\n        >\n          <mat-icon class=\"!text-sm\">logout</mat-icon>\n          <span>Sign Out</span>\n        </button>\n      </div>\n\n      @if (store.currentRoleDefinition().permissions.canCreateJobs) {\n        <button \n          type=\"button\"\n          (click)=\"showNewJobModal.set(true); closeMobileSidebar()\"\n          class=\"w-full py-2.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer\"\n        >\n          <mat-icon class=\"!text-base\">add</mat-icon>\n          <span>Book Installation</span>\n        </button>\n      }\n    </div>\n  </div>\n}\n\n<!-- ========================================================================= -->\n<!-- 4. DESKTOP MAIN VIEWPORT (Offset by fixed sidebar)                         -->\n<!-- ========================================================================= -->\n<div \n  class=\"flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100\"\n  [class.lg:pl-72]=\"!sidebarCollapsed()\"\n  [class.lg:pl-20]=\"sidebarCollapsed()\"\n>\n  <!-- Desktop Top Context Bar -->\n  <header class=\"hidden lg:flex sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-6 items-center justify-between gap-4\">\n    <!-- Breadcrumb trail -->\n    <div class=\"flex items-center gap-2 text-xs\">\n      <span class=\"text-slate-500 dark:text-slate-400 font-mono\">DoorMaster</span>\n      <span class=\"text-slate-300 dark:text-slate-600\">/</span>\n      <span class=\"text-slate-800 dark:text-slate-300 font-bold\">{{ currentViewLabel() }}</span>\n      <span class=\"text-slate-300 dark:text-slate-600\">/</span>\n      <span class=\"text-emerald-700 dark:text-emerald-400 font-mono font-medium\">{{ store.stats().inProgress }} Active Site Operations</span>\n    </div>\n\n    <!-- Right Actions: Notification Bell + Profile Dropdown at the far right -->\n    <div class=\"flex items-center gap-3\">\n      <!-- Notification Bell with drawer trigger -->\n      <button \n        type=\"button\"\n        (click)=\"showNotificationDrawer.set(true)\"\n        class=\"relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer\"\n        title=\"Dispatch alerts\"\n        aria-label=\"Dispatch alerts\"\n      >\n        <mat-icon class=\"!text-xl\">notifications</mat-icon>\n        @if (store.unreadNotificationsCount() > 0) {\n          <span class=\"absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-black font-mono flex items-center justify-center animate-pulse\">\n            {{ store.unreadNotificationsCount() }}\n          </span>\n        }\n      </button>\n\n      <!-- Profile Dropdown (Positioned at the far right after notification button) -->\n      <div class=\"relative\">\n        <!-- Invisible backdrop to close dropdown on outside click -->\n        @if (profileDropdownOpen()) {\n          <div class=\"fixed inset-0 z-40\" (click)=\"closeProfileDropdown()\"></div>\n        }\n\n        <!-- Profile trigger button -->\n        <button\n          type=\"button\"\n          (click)=\"toggleProfileDropdown()\"\n          class=\"relative z-50 flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-2xs cursor-pointer select-none\"\n          [class.ring-2]=\"profileDropdownOpen()\"\n          [class.ring-emerald-500/30]=\"profileDropdownOpen()\"\n          aria-label=\"User profile and account options\"\n          aria-haspopup=\"true\"\n          [attr.aria-expanded]=\"profileDropdownOpen()\"\n        >\n          <div class=\"relative w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner\">\n            {{ store.currentRoleDefinition().name.charAt(0) }}\n            <span class=\"absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900\"></span>\n          </div>\n          <div class=\"text-left hidden xl:block min-w-0\">\n            <p class=\"text-xs font-bold text-slate-900 dark:text-white truncate max-w-[140px] leading-tight\">\n              {{ store.currentRoleDefinition().name }}\n            </p>\n            <p class=\"text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium truncate\">\n              {{ store.currentRoleDefinition().label }}\n            </p>\n          </div>\n          <mat-icon class=\"!text-base text-slate-400 transition-transform duration-200\" [class.rotate-180]=\"profileDropdownOpen()\">\n            keyboard_arrow_down\n          </mat-icon>\n        </button>\n\n        <!-- Dropdown Menu panel -->\n        @if (profileDropdownOpen()) {\n          <div \n            class=\"absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150\"\n            role=\"menu\"\n          >\n            <!-- User Summary Header -->\n            <div class=\"px-4 py-3 border-b border-slate-100 dark:border-slate-900\">\n              <div class=\"flex items-center gap-3\">\n                <div class=\"w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-slate-700 shadow-sm\">\n                  {{ store.currentRoleDefinition().name.charAt(0) }}\n                </div>\n                <div class=\"min-w-0 flex-1\">\n                  <div class=\"text-xs font-black text-slate-900 dark:text-white truncate\">\n                    {{ store.currentRoleDefinition().name }}\n                  </div>\n                  <div class=\"flex items-center gap-1.5 mt-0.5\">\n                    <span class=\"text-[10px] uppercase font-mono px-1.5 py-0.2 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded font-bold\">\n                      {{ store.currentRoleDefinition().label }}\n                    </span>\n                    <span class=\"text-[10px] text-slate-400 font-mono truncate\">\n                      {{ store.dataMode() === 'api' ? 'Live MySQL' : 'Demo Mode' }}\n                    </span>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- Profile Menu Items -->\n            <div class=\"py-1 text-xs\">\n              <!-- Dark / Light Mode Switcher -->\n              <button\n                type=\"button\"\n                (click)=\"themeStore.toggleTheme()\"\n                class=\"w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer\"\n              >\n                <div class=\"flex items-center gap-2.5\">\n                  <mat-icon class=\"!text-lg\" [class.text-amber-500]=\"!themeStore.isDark()\" [class.text-indigo-400]=\"themeStore.isDark()\">\n                    {{ themeStore.isDark() ? 'dark_mode' : 'light_mode' }}\n                  </mat-icon>\n                  <span class=\"font-medium\">Theme Appearance</span>\n                </div>\n                <span class=\"text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold\">\n                  {{ themeStore.isDark() ? 'Dark' : 'Light' }}\n                </span>\n              </button>\n\n              <!-- Settings & Shop Hub -->\n              <button\n                type=\"button\"\n                (click)=\"openSettings()\"\n                class=\"w-full px-4 py-2.5 flex items-center gap-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer\"\n              >\n                <mat-icon class=\"!text-lg text-cyan-600 dark:text-cyan-400\">tune</mat-icon>\n                <div>\n                  <div class=\"font-medium\">Settings & Shop Hub</div>\n                  <div class=\"text-[10px] text-slate-400\">Workshop GPS, phones & SMS gateway</div>\n                </div>\n              </button>\n\n              <!-- Public Landing Page Link (Maintained under profile dropdown) -->\n              <button\n                type=\"button\"\n                (click)=\"openLandingPage()\"\n                class=\"w-full px-4 py-2.5 flex items-center gap-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer\"\n              >\n                <mat-icon class=\"!text-lg text-emerald-600 dark:text-emerald-400\">public</mat-icon>\n                <div>\n                  <div class=\"font-medium\">Public Landing Page</div>\n                  <div class=\"text-[10px] text-slate-400\">Door catalog & client booking landing</div>\n                </div>\n              </button>\n            </div>\n\n            <!-- Sign Out / Switch Persona Link (Maintained under profile dropdown) -->\n            <div class=\"pt-1 mt-1 border-t border-slate-100 dark:border-slate-900 text-xs\">\n              <button\n                type=\"button\"\n                (click)=\"openSignInPage()\"\n                class=\"w-full px-4 py-2.5 flex items-center gap-2.5 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-semibold cursor-pointer\"\n              >\n                <mat-icon class=\"!text-lg\">logout</mat-icon>\n                <span>Sign Out / Switch Persona</span>\n              </button>\n            </div>\n          </div>\n        }\n      </div>\n    </div>\n  </header>\n\n  <!-- ======================================================================= -->\n  <!-- 5. UBER-STYLE LIVE ACTIVE TRACKING TICKER (Always visible if active job)  -->\n  <!-- ======================================================================= -->\n  @if (activeLiveJob()) {\n    @let aj = activeLiveJob()!;\n    <div class=\"bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-emerald-200 dark:border-emerald-500/30 px-4 sm:px-6 py-2.5 text-xs shadow-xs transition-colors\">\n      <div class=\"max-w-screen-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5\">\n        \n        <!-- Live Indicator & Order Meta -->\n        <div class=\"flex items-center gap-3 min-w-0\">\n          <div class=\"relative flex h-2.5 w-2.5 shrink-0\">\n            <span class=\"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75\"></span>\n            <span class=\"relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500\"></span>\n          </div>\n\n          <div class=\"flex flex-wrap items-center gap-2 truncate\">\n            <span class=\"px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold\">\n              @if (aj.status === 'on_site') { CLOCKED IN ON SITE }\n              @else if (aj.status === 'dispatched') { DOOR EN ROUTE }\n              @else if (aj.status === 'accepted') { TECHNICIAN ASSIGNED }\n              @else { LIVE OPERATION }\n            </span>\n            <span class=\"font-mono font-bold text-slate-900 dark:text-white\">{{ aj.id }}</span>\n            <span class=\"text-slate-300 dark:text-slate-600 hidden sm:inline\">\u00B7</span>\n            <span class=\"font-bold text-slate-900 dark:text-white truncate\">{{ aj.doorModel }}</span>\n            <span class=\"text-slate-300 dark:text-slate-600 hidden sm:inline\">\u00B7</span>\n            <span class=\"text-slate-600 dark:text-slate-400 truncate max-w-xs\">{{ aj.client.siteAddress }}</span>\n            <span class=\"text-slate-300 dark:text-slate-600 hidden md:inline\">\u00B7</span>\n            <span class=\"text-slate-600 dark:text-slate-400 hidden md:inline\">Tech: <strong class=\"text-slate-900 dark:text-white\">{{ aj.assignedInstallerName || 'Marcus Vance' }}</strong></span>\n          </div>\n        </div>\n\n        <!-- Quick Actions on Live Ticker -->\n        <div class=\"flex items-center gap-2 shrink-0 self-end sm:self-auto\">\n          @if (store.currentRole() !== 'manager') {\n            <button \n              type=\"button\"\n              (click)=\"setView('client')\"\n              class=\"px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer\"\n            >\n              <mat-icon class=\"!text-xs\">navigation</mat-icon>\n              <span>Track Live Journey</span>\n            </button>\n          }\n\n          <button \n            type=\"button\"\n            (click)=\"openContactTechnician(aj)\"\n            class=\"px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-colors shadow-2xs cursor-pointer\"\n          >\n            <mat-icon class=\"!text-xs text-emerald-600 dark:text-emerald-400\">phone</mat-icon>\n            <span>Call Technician</span>\n          </button>\n\n          <button \n            type=\"button\"\n            (click)=\"openJobDetails(aj.id)\"\n            class=\"px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-medium hover:text-slate-900 dark:hover:text-white transition-colors shadow-2xs cursor-pointer\"\n          >\n            Details \u2192\n          </button>\n        </div>\n      </div>\n    </div>\n  }\n\n  <!-- ======================================================================= -->\n  <!-- 6. MAIN CONTENT VIEW CANVAS (ROUTED VIEW COMPONENT)                    -->\n  <!-- ======================================================================= -->\n  <main class=\"flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 text-slate-900 dark:text-slate-100\">\n    <div class=\"rounded-2xl\">\n      <router-outlet (activate)=\"onRouteActivated($event)\"></router-outlet>\n    </div>\n  </main>\n\n  <!-- ======================================================================= -->\n  <!-- 7. DESKTOP FOOTER                                                      -->\n  <!-- ======================================================================= -->\n  <footer class=\"mt-auto border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-5 text-slate-500 dark:text-slate-400\">\n    <div class=\"max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs\">\n      <div class=\"flex items-center gap-2\">\n        <span class=\"font-bold text-slate-900 dark:text-slate-200\">DoorMaster Pro Field Ops</span>\n        <span aria-hidden=\"true\" class=\"text-slate-300 dark:text-slate-600\">\u00B7</span>\n        <span>Architectural Entrance Systems & Hardware Fitting</span>\n      </div>\n      <div class=\"flex items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400\">\n        <span class=\"flex items-center gap-1\">\n          <span class=\"w-1.5 h-1.5 rounded-full bg-emerald-500\"></span>\n          <span>GPS Geofence Verified</span>\n        </span>\n        <span class=\"text-slate-300 dark:text-slate-700\">\u00B7</span>\n        <span>Digital Signature Legal Archival</span>\n        <span class=\"text-slate-300 dark:text-slate-700\">\u00B7</span>\n        <span>Incentive Matrix</span>\n      </div>\n    </div>\n  </footer>\n</div>\n\n<!-- ========================================================================= -->\n<!-- 8. MOBILE BOTTOM APP BAR (Handyman & Uber Mobile App Bottom Navigation)   -->\n<!-- ========================================================================= -->\n<nav class=\"lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-1.5 px-2 flex justify-around items-center safe-area-pb\">\n  <!-- Dynamic Tabs specific to active Persona (up to 3 primary) -->\n  @for (item of filteredMenuItems().slice(0, 3); track item.id) {\n    <button \n      type=\"button\"\n      (click)=\"setView(item.id)\"\n      class=\"flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors relative cursor-pointer\"\n      [class.text-slate-950]=\"currentView() === item.id\"\n      [class.dark:text-white]=\"currentView() === item.id\"\n      [class.font-bold]=\"currentView() === item.id\"\n      [title]=\"item.label\"\n    >\n      <mat-icon class=\"!text-xl\" [class]=\"currentView() === item.id ? item.activeColor : item.iconColor\">{{ item.icon }}</mat-icon>\n      <span class=\"text-[10px] tracking-tight truncate max-w-[68px]\">{{ item.label.split(' ')[0] }}</span>\n      @if (item.badgeType === 'live' && store.stats().inProgress > 0) {\n        <span class=\"absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse\"></span>\n      }\n    </button>\n  }\n\n  <!-- Tab: Notifications Drawer -->\n  <button \n    type=\"button\"\n    (click)=\"showNotificationDrawer.set(true)\"\n    class=\"flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors relative cursor-pointer\"\n  >\n    <mat-icon class=\"!text-xl\">notifications</mat-icon>\n    <span class=\"text-[10px] tracking-tight\">Alerts</span>\n    @if (store.unreadNotificationsCount() > 0) {\n      <span class=\"absolute top-0.5 right-2 w-3.5 h-3.5 bg-emerald-500 text-slate-950 rounded-full text-[8px] font-black font-mono flex items-center justify-center\">\n        {{ store.unreadNotificationsCount() }}\n      </span>\n    }\n  </button>\n\n  <!-- Tab: Menu Drawer toggle -->\n  <button \n    type=\"button\"\n    (click)=\"toggleMobileSidebar()\"\n    class=\"flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors cursor-pointer\"\n    [class.text-slate-950]=\"mobileSidebarOpen()\"\n    [class.dark:text-white]=\"mobileSidebarOpen()\"\n  >\n    <mat-icon class=\"!text-xl\">menu</mat-icon>\n    <span class=\"text-[10px] tracking-tight\">Menu</span>\n  </button>\n</nav>\n\n<!-- ========================================================================= -->\n<!-- 9. TOAST NOTIFICATION POPUP                                               -->\n<!-- ========================================================================= -->\n@if (toastMessage()) {\n  <div class=\"fixed bottom-18 lg:bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-950 text-white border border-slate-700/80 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 text-xs\">\n    <mat-icon class=\"!text-base text-emerald-400\">info</mat-icon>\n    <span class=\"font-medium\">{{ toastMessage() }}</span>\n    <button \n      type=\"button\" \n      (click)=\"toastMessage.set(null)\"\n      class=\"text-slate-400 hover:text-white ml-1 cursor-pointer\"\n      aria-label=\"Dismiss message\"\n    >\n      <mat-icon class=\"!text-sm\">close</mat-icon>\n    </button>\n  </div>\n}\n\n<!-- ========================================================================= -->\n<!-- 10. DIRECT CONTACT TECHNICIAN MODAL (Uber-style Driver Dialer Simulator)    -->\n<!-- ========================================================================= -->\n@if (contactModalOpen() && activeContactInfo()) {\n  @let info = activeContactInfo()!;\n  <div class=\"fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4\">\n    <div class=\"bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl max-w-sm w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95\">\n      <div class=\"flex items-center justify-between\">\n        <div class=\"flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono\">\n          <span class=\"w-2 h-2 rounded-full bg-emerald-500 animate-pulse\"></span>\n          <span>DIRECT FIELD COMM</span>\n        </div>\n        <button \n          type=\"button\" \n          (click)=\"closeContactModal()\"\n          class=\"text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer\"\n          aria-label=\"Close modal\"\n        >\n          <mat-icon class=\"!text-lg\">close</mat-icon>\n        </button>\n      </div>\n\n      <div class=\"text-center space-y-2\">\n        <div class=\"w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-inner\">\n          {{ info.name.charAt(0) }}\n        </div>\n        <div>\n          <h3 class=\"text-base font-bold text-slate-900 dark:text-white\">{{ info.name }}</h3>\n          <p class=\"text-xs text-emerald-700 dark:text-emerald-400 font-medium\">DoorMaster Certified Lead Technician</p>\n          <p class=\"text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5\">{{ info.phone }}</p>\n        </div>\n      </div>\n\n      <div class=\"bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1\">\n        <p class=\"text-slate-500 dark:text-slate-400\">Assigned Work Order:</p>\n        <p class=\"font-bold text-slate-900 dark:text-white\">{{ info.jobTitle }}</p>\n        <p class=\"text-[11px] text-slate-500 dark:text-slate-400 truncate\">{{ info.address }}</p>\n      </div>\n\n      <div class=\"grid grid-cols-2 gap-2.5\">\n        <button \n          type=\"button\"\n          (click)=\"showToast('Calling ' + info.name + ' at ' + info.phone); closeContactModal()\"\n          class=\"py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer\"\n        >\n          <mat-icon class=\"!text-base\">call</mat-icon>\n          <span>Dial Direct</span>\n        </button>\n\n        <button \n          type=\"button\"\n          (click)=\"showToast('Message sent to ' + info.name); closeContactModal()\"\n          class=\"py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer\"\n        >\n          <mat-icon class=\"!text-base\">chat</mat-icon>\n          <span>Message Site</span>\n        </button>\n      </div>\n    </div>\n  </div>\n}\n\n<!-- ========================================================================= -->\n<!-- 11. EXISTING CORE MODALS (Job Details, New Job, Bonus, Roles, Alerts)      -->\n<!-- ========================================================================= -->\n@if (inspectedJobId()) {\n  <app-job-detail-modal \n    [jobId]=\"inspectedJobId()!\"\n    (closed)=\"closeJobDetails()\"\n  />\n}\n\n@if (showNewJobModal()) {\n  <app-new-job-modal \n    (closed)=\"showNewJobModal.set(false)\"\n  />\n}\n\n@if (showBonusModal()) {\n  <app-bonus-modal \n    (closed)=\"showBonusModal.set(false)\"\n  />\n}\n\n@if (showCustomRoleModal()) {\n  <app-custom-role-modal \n    (closed)=\"showCustomRoleModal.set(false)\"\n  />\n}\n\n@if (showAddUserModal()) {\n  <app-add-user-modal \n    (closed)=\"showAddUserModal.set(false)\"\n    (userCreated)=\"store.loadUsers()\"\n  />\n}\n\n@if (showNotificationDrawer()) {\n  <app-notification-drawer \n    (closed)=\"showNotificationDrawer.set(false)\"\n    (jobSelected)=\"openJobDetails($event)\"\n  />\n}\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardLayout, { className: "DashboardLayout", filePath: "frontend/src/app/layouts/dashboard-layout/dashboard-layout.ts", lineNumber: 63 }); })();
