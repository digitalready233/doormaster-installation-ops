import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function PerformanceDashboard_For_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 30)(1, "td", 35)(2, "div", 36)(3, "div", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "span", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 39);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td", 40);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 35)(13, "span", 41);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 42);
    i0.ɵɵtext(16, "Verified Sign-offs");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td", 40);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 43);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 44);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td", 45);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 46);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const inst_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", inst_r1.name.charAt(0), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(inst_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(inst_r1.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", inst_r1.metrics.completedJobs, " doors ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", inst_r1.metrics.avgRating, " \u2605");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", inst_r1.metrics.onTimeRate, "% ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", inst_r1.metrics.avgTurnaroundHours, " hrs ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", inst_r1.metrics.firstTimePassRate, "% ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" $", inst_r1.metrics.totalBonusesEarned, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" $", inst_r1.metrics.pendingBonuses, " ");
} }
function PerformanceDashboard_Conditional_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, " No completed installations awaiting bonus authorization. All incentives have been released. ");
    i0.ɵɵelementEnd();
} }
function PerformanceDashboard_Conditional_105_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47)(1, "div")(2, "div", 31)(3, "span", 48);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 49);
    i0.ɵɵtext(6, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 50);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 51);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 52);
    i0.ɵɵtext(12, " Installer: ");
    i0.ɵɵelementStart(13, "strong", 53);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵelementStart(16, "strong", 32);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " \u00B7 Logged Time: ");
    i0.ɵɵelementStart(19, "span", 54);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 36)(22, "div", 55)(23, "span", 56);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 57);
    i0.ɵɵtext(26, "Calculated Bonus");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "button", 6);
    i0.ɵɵlistener("click", function PerformanceDashboard_Conditional_105_For_2_Template_button_click_27_listener() { const job_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.store.approveBonus(job_r3.id, "Management Committee")); });
    i0.ɵɵelementStart(28, "mat-icon", 58);
    i0.ɵɵtext(29, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "Approve Bonus");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const job_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r3.id);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r3.doorModel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", job_r3.customerSignoff ? "Customer Verified" : "Work Finished", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r3.assignedInstallerName);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 Client: ", job_r3.client.name, " \u00B7 Rating: ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (job_r3.customerSignoff == null ? null : job_r3.customerSignoff.rating) || 5, ".0 \u2605");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", job_r3.actualHours || 3.2, " hrs");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" +$", job_r3.financials.bonusAmount, " ");
} }
function PerformanceDashboard_Conditional_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵrepeaterCreate(1, PerformanceDashboard_Conditional_105_For_2_Template, 32, 8, "div", 47, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r3.pendingJobs());
} }
export class PerformanceDashboard {
    store = inject(InstallationStore);
    bonusModalOpened = output();
    totalDisbursed = computed(() => {
        return this.store.installers().reduce((sum, i) => sum + i.metrics.totalBonusesEarned, 0);
    }, ...(ngDevMode ? [{ debugName: "totalDisbursed" }] : /* istanbul ignore next */ []));
    totalPending = computed(() => {
        return this.store.jobs()
            .filter(j => j.financials.bonusStatus === 'pending')
            .reduce((sum, j) => sum + j.financials.bonusAmount, 0);
    }, ...(ngDevMode ? [{ debugName: "totalPending" }] : /* istanbul ignore next */ []));
    pendingJobs = computed(() => {
        return this.store.jobs().filter(j => j.financials.bonusStatus === 'pending');
    }, ...(ngDevMode ? [{ debugName: "pendingJobs" }] : /* istanbul ignore next */ []));
    static ɵfac = function PerformanceDashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PerformanceDashboard)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PerformanceDashboard, selectors: [["app-performance-dashboard"]], outputs: { bonusModalOpened: "bonusModalOpened" }, decls: 106, vars: 6, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-2", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], [1, "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "text-2xl", "font-extrabold", "text-slate-900", "dark:text-white", "tracking-tight"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "rounded-xl", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", "active:scale-95", 3, "click"], [1, "!text-sm", "!w-4", "!h-4", "text-emerald-400", "dark:text-emerald-600"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-white", "dark:bg-slate-900", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xs"], [1, "text-[11px]", "font-semibold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-extrabold", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tracking-tight", "tabular-nums"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-2"], [1, "text-3xl", "font-extrabold", "font-mono", "text-amber-700", "dark:text-amber-400", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-amber-800", "dark:text-amber-300", "font-medium", "font-mono"], [1, "text-3xl", "font-extrabold", "font-mono", "text-slate-900", "dark:text-white", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "text-xs", "text-amber-600", "dark:text-amber-400", "font-medium"], [1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden", "shadow-xs"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-xs", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "border-collapse", "text-xs"], [1, "border-b", "border-slate-200", "dark:border-slate-800", "bg-slate-50/80", "dark:bg-slate-800/60", "text-[11px]", "font-semibold", "text-slate-600", "dark:text-slate-400", "uppercase", "tracking-wider"], [1, "py-3", "px-4"], [1, "py-3", "px-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800"], [1, "hover:bg-slate-50/80", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "flex", "items-center", "gap-2"], [1, "text-amber-600", "dark:text-amber-400"], [1, "text-xs", "font-mono", "text-amber-800", "dark:text-amber-300", "bg-amber-50", "dark:bg-amber-950/60", "px-2", "py-1", "rounded", "border", "border-amber-200", "dark:border-amber-800"], [1, "p-8", "text-center", "text-xs", "text-slate-400", "dark:text-slate-500"], [1, "py-3.5", "px-4"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-lg", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center", "font-bold", "text-xs"], [1, "font-bold", "text-slate-900", "dark:text-white", "block"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "font-mono"], [1, "py-3.5", "px-4", "font-mono", "font-bold", "text-slate-800", "dark:text-slate-200", "tabular-nums"], [1, "font-mono", "font-bold", "text-amber-600", "dark:text-amber-400", "tabular-nums"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "block"], [1, "py-3.5", "px-4", "font-mono", "text-slate-700", "dark:text-slate-300", "tabular-nums"], [1, "py-3.5", "px-4", "font-mono", "text-emerald-700", "dark:text-emerald-400", "font-bold", "tabular-nums"], [1, "py-3.5", "px-4", "text-right", "font-mono", "font-bold", "text-emerald-700", "dark:text-emerald-400", "tabular-nums", "whitespace-nowrap"], [1, "py-3.5", "px-4", "text-right", "font-mono", "font-bold", "text-amber-700", "dark:text-amber-400", "tabular-nums", "whitespace-nowrap"], [1, "p-4", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "hover:bg-slate-50/60", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white", "text-xs"], [1, "text-xs", "text-slate-400", "dark:text-slate-600"], [1, "font-bold", "text-slate-800", "dark:text-slate-200", "text-xs"], [1, "text-[10px]", "font-semibold", "px-2", "py-0.5", "rounded", "bg-emerald-100", "dark:bg-emerald-950/60", "text-emerald-800", "dark:text-emerald-400", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "text-slate-800", "dark:text-slate-200"], [1, "font-mono"], [1, "text-right"], [1, "text-base", "font-bold", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tabular-nums"], [1, "block", "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase"], [1, "!text-xs", "!w-3.5", "!h-3.5", "text-emerald-400", "dark:text-emerald-600"]], template: function PerformanceDashboard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "Management Audit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Installer Performance & Incentive Matrix");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 4);
            i0.ɵɵtext(13, "Bonuses Audited Weekly");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 5);
            i0.ɵɵtext(15, "Installer Performance & Bonus Portal");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "button", 6);
            i0.ɵɵlistener("click", function PerformanceDashboard_Template_button_click_16_listener() { return ctx.bonusModalOpened.emit(); });
            i0.ɵɵelementStart(17, "mat-icon", 7);
            i0.ɵɵtext(18, "tune");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span");
            i0.ɵɵtext(20, "Configure Bonus Policy");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 8)(22, "div", 9)(23, "span", 10);
            i0.ɵɵtext(24, "Total Bonuses Disbursed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 11)(26, "span", 12);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "p", 13);
            i0.ɵɵtext(29, "100% verified against customer sign-offs");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 9)(31, "span", 10);
            i0.ɵɵtext(32, "Pending Management Release");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 11)(34, "span", 14);
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "span", 15);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "p", 13);
            i0.ɵɵtext(39, "Awaiting executive / accounts sign-off");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 9)(41, "span", 10);
            i0.ɵɵtext(42, "Fleet Punctuality Rate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 11)(44, "span", 16);
            i0.ɵɵtext(45, " 96.2% ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "span", 17);
            i0.ɵɵtext(47, "On-Site Target");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "p", 13);
            i0.ɵɵtext(49, "Within 15 min of scheduled arrival");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 9)(51, "span", 10);
            i0.ɵɵtext(52, "Average Customer Rating");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 11)(54, "span", 16);
            i0.ɵɵtext(55, " 4.89 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span", 18);
            i0.ɵɵtext(57, "\u2605 / 5.0");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "p", 13);
            i0.ɵɵtext(59, "From digital customer verification");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(60, "div", 19)(61, "div", 20)(62, "div")(63, "h3", 21);
            i0.ɵɵtext(64, "Door Installer Performance Rankings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "p", 22);
            i0.ɵɵtext(66, "Tracks workmanship speed, customer ratings, punctuality, and accrued management bonuses");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "span", 23);
            i0.ɵɵtext(68);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(69, "div", 24)(70, "table", 25)(71, "thead")(72, "tr", 26)(73, "th", 27);
            i0.ɵɵtext(74, "Technician Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "th", 27);
            i0.ɵɵtext(76, "Doors Installed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "th", 27);
            i0.ɵɵtext(78, "Customer Rating");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "th", 27);
            i0.ɵɵtext(80, "On-Time Rate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "th", 27);
            i0.ɵɵtext(82, "Avg Turnaround");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "th", 27);
            i0.ɵɵtext(84, "First-Pass Rate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "th", 28);
            i0.ɵɵtext(86, "Bonuses Paid");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "th", 28);
            i0.ɵɵtext(88, "Pending Bonus");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(89, "tbody", 29);
            i0.ɵɵrepeaterCreate(90, PerformanceDashboard_For_91_Template, 27, 10, "tr", 30, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(92, "div", 19)(93, "div", 20)(94, "div", 31)(95, "mat-icon", 32);
            i0.ɵɵtext(96, "verified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "div")(98, "h3", 21);
            i0.ɵɵtext(99, "Completed Installations Awaiting Management Bonus Authorization");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "p", 22);
            i0.ɵɵtext(101, "Each completed installation requires management sign-off to disburse incentive funds");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(102, "span", 33);
            i0.ɵɵtext(103);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(104, PerformanceDashboard_Conditional_104_Template, 2, 0, "div", 34)(105, PerformanceDashboard_Conditional_105_Template, 3, 0, "div", 29);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(27);
            i0.ɵɵtextInterpolate1(" $", ctx.totalDisbursed(), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" $", ctx.totalPending(), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.pendingJobs().length, " jobs");
            i0.ɵɵadvance(31);
            i0.ɵɵtextInterpolate1("", ctx.store.installers().length, " Field Technicians");
            i0.ɵɵadvance(22);
            i0.ɵɵrepeater(ctx.store.installers());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate1(" ", ctx.pendingJobs().length, " Pending Sign-Off ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.pendingJobs().length === 0 ? 104 : 105);
        } }, dependencies: [MatIconModule, i1.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PerformanceDashboard, [{
        type: Component,
        args: [{
                selector: 'app-performance-dashboard',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule],
                template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Management Audit</span>
            <span aria-hidden="true">·</span>
            <span>Installer Performance & Incentive Matrix</span>
            <span aria-hidden="true">·</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-medium">Bonuses Audited Weekly</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Installer Performance & Bonus Portal</h1>
        </div>

        <button 
          type="button"
          (click)="bonusModalOpened.emit()"
          class="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400 dark:text-emerald-600">tune</mat-icon>
          <span>Configure Bonus Policy</span>
        </button>
      </div>

      <!-- Top Stat Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Bonuses Disbursed</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              &#36;{{ totalDisbursed() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">100% verified against customer sign-offs</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Pending Management Release</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-amber-700 dark:text-amber-400 tracking-tight tabular-nums">
              &#36;{{ totalPending() }}
            </span>
            <span class="text-xs text-amber-800 dark:text-amber-300 font-medium font-mono">{{ pendingJobs().length }} jobs</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Awaiting executive / accounts sign-off</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Fleet Punctuality Rate</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              96.2%
            </span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">On-Site Target</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Within 15 min of scheduled arrival</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Average Customer Rating</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              4.89
            </span>
            <span class="text-xs text-amber-600 dark:text-amber-400 font-medium">★ / 5.0</span>
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">From digital customer verification</p>
        </div>
      </div>

      <!-- Installer Leaderboard Table -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Door Installer Performance Rankings</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tracks workmanship speed, customer ratings, punctuality, and accrued management bonuses</p>
          </div>
          <span class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ store.installers().length }} Field Technicians</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th class="py-3 px-4">Technician Name</th>
                <th class="py-3 px-4">Doors Installed</th>
                <th class="py-3 px-4">Customer Rating</th>
                <th class="py-3 px-4">On-Time Rate</th>
                <th class="py-3 px-4">Avg Turnaround</th>
                <th class="py-3 px-4">First-Pass Rate</th>
                <th class="py-3 px-4 text-right">Bonuses Paid</th>
                <th class="py-3 px-4 text-right">Pending Bonus</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (inst of store.installers(); track inst.id) {
                <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                        {{ inst.name.charAt(0) }}
                      </div>
                      <div>
                        <span class="font-bold text-slate-900 dark:text-white block">{{ inst.name }}</span>
                        <span class="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{{ inst.email }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {{ inst.metrics.completedJobs }} doors
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">{{ inst.metrics.avgRating }} ★</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500 block">Verified Sign-offs</span>
                  </td>

                  <td class="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {{ inst.metrics.onTimeRate }}%
                  </td>

                  <td class="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {{ inst.metrics.avgTurnaroundHours }} hrs
                  </td>

                  <td class="py-3.5 px-4 font-mono text-emerald-700 dark:text-emerald-400 font-bold tabular-nums">
                    {{ inst.metrics.firstTimePassRate }}%
                  </td>

                  <td class="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap">
                    &#36;{{ inst.metrics.totalBonusesEarned }}
                  </td>

                  <td class="py-3.5 px-4 text-right font-mono font-bold text-amber-700 dark:text-amber-400 tabular-nums whitespace-nowrap">
                    &#36;{{ inst.metrics.pendingBonuses }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Management Bonus Approval Queue Section -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <mat-icon class="text-amber-600 dark:text-amber-400">verified</mat-icon>
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Completed Installations Awaiting Management Bonus Authorization</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Each completed installation requires management sign-off to disburse incentive funds</p>
            </div>
          </div>
          <span class="text-xs font-mono text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded border border-amber-200 dark:border-amber-800">
            {{ pendingJobs().length }} Pending Sign-Off
          </span>
        </div>

        @if (pendingJobs().length === 0) {
          <div class="p-8 text-center text-xs text-slate-400 dark:text-slate-500">
            No completed installations awaiting bonus authorization. All incentives have been released.
          </div>
        } @else {
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            @for (job of pendingJobs(); track job.id) {
              <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-slate-900 dark:text-white text-xs">{{ job.id }}</span>
                    <span class="text-xs text-slate-400 dark:text-slate-600">·</span>
                    <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">{{ job.doorModel }}</span>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {{ job.customerSignoff ? 'Customer Verified' : 'Work Finished' }}
                    </span>
                  </div>

                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Installer: <strong class="text-slate-800 dark:text-slate-200">{{ job.assignedInstallerName }}</strong> · 
                    Client: {{ job.client.name }} · 
                    Rating: <strong class="text-amber-600 dark:text-amber-400">{{ job.customerSignoff?.rating || 5 }}.0 ★</strong> · 
                    Logged Time: <span class="font-mono">{{ job.actualHours || 3.2 }} hrs</span>
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <span class="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                      +&#36;{{ job.financials.bonusAmount }}
                    </span>
                    <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase">Calculated Bonus</span>
                  </div>

                  <button 
                    type="button"
                    (click)="store.approveBonus(job.id, 'Management Committee')"
                    class="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <mat-icon class="!text-xs !w-3.5 !h-3.5 text-emerald-400 dark:text-emerald-600">check_circle</mat-icon>
                    <span>Approve Bonus</span>
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
            }]
    }], null, { bonusModalOpened: [{ type: i0.Output, args: ["bonusModalOpened"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PerformanceDashboard, { className: "PerformanceDashboard", filePath: "frontend/src/app/views/performance-dashboard/performance-dashboard.ts", lineNumber: 220 }); })();
