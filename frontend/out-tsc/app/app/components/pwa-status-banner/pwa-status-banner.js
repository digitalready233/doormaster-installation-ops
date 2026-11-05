import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PwaService } from '../../services/pwa.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
function PwaStatusBanner_Conditional_0_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.pwa.pendingSyncCount(), " queued for sync ");
} }
function PwaStatusBanner_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 0)(1, "div", 4);
    i0.ɵɵelement(2, "span", 5);
    i0.ɵɵelementStart(3, "mat-icon", 6);
    i0.ɵɵtext(4, "cloud_off");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 7)(6, "span", 8);
    i0.ɵɵtext(7, "Offline Mode Active:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 9);
    i0.ɵɵtext(9, " Intermittent job site reception detected. Service Worker is serving cached assets & door specifications. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 10);
    i0.ɵɵconditionalCreate(11, PwaStatusBanner_Conditional_0_Conditional_11_Template, 2, 1, "span", 11);
    i0.ɵɵelementStart(12, "button", 12);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_0_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.triggerManualSync()); });
    i0.ɵɵelementStart(13, "mat-icon", 13);
    i0.ɵɵtext(14, "sync");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "Retry Sync");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r1.pwa.pendingSyncCount() > 0 ? 11 : -1);
} }
function PwaStatusBanner_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 1)(1, "div", 14)(2, "mat-icon", 15);
    i0.ɵɵtext(3, "cloud_done");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 16);
    i0.ɵɵtext(5, "Connection Restored:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Online sync active. Offline actions synchronized with Operations Dispatch.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 17);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showReconnectedToast.set(false)); });
    i0.ɵɵelementStart(9, "mat-icon", 13);
    i0.ɵɵtext(10, "close");
    i0.ɵɵelementEnd()()();
} }
function PwaStatusBanner_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 18)(2, "div", 19)(3, "div", 20)(4, "div", 21);
    i0.ɵɵtext(5, " DM ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "h3", 22);
    i0.ɵɵtext(8, "Install DoorMaster on iOS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10, "Safari Web App Install");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "button", 24);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_2_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showIosModal.set(false)); });
    i0.ɵɵelementStart(12, "mat-icon", 25);
    i0.ɵɵtext(13, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 26)(15, "div", 27)(16, "span", 28);
    i0.ɵɵtext(17, "1");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Tap the ");
    i0.ɵɵelementStart(20, "strong", 29);
    i0.ɵɵtext(21, "Share");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22, " icon in the Safari bottom bar.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 27)(24, "span", 28);
    i0.ɵɵtext(25, "2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Scroll down and select ");
    i0.ɵɵelementStart(28, "strong", 29);
    i0.ɵɵtext(29, "Add to Home Screen");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(30, ".");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 27)(32, "span", 28);
    i0.ɵɵtext(33, "3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Tap ");
    i0.ɵɵelementStart(36, "strong", 29);
    i0.ɵɵtext(37, "Add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(38, " in top-right to launch standalone with offline site storage!");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "button", 30);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_2_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showIosModal.set(false)); });
    i0.ɵɵtext(40, " Got It ");
    i0.ɵɵelementEnd()()();
} }
function PwaStatusBanner_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 31)(2, "div", 19)(3, "div", 14)(4, "mat-icon", 32);
    i0.ɵɵtext(5, "offline_pin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "h3", 33);
    i0.ɵɵtext(8, "Job Site Offline Cache Diagnostics");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "button", 34);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_3_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showDiagnosticsModal.set(false)); });
    i0.ɵɵelementStart(12, "mat-icon", 25);
    i0.ɵɵtext(13, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 35)(15, "div", 36)(16, "span", 37);
    i0.ɵɵtext(17, "App Shell Assets");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong", 38);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 36)(21, "span", 37);
    i0.ɵɵtext(22, "Key API Payloads");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "strong", 39);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 36)(26, "span", 37);
    i0.ɵɵtext(27, "Road Map Tiles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "strong", 40);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 36)(31, "span", 37);
    i0.ɵɵtext(32, "Pending Sync Items");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "strong", 41);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(35, "div", 42)(36, "div", 43)(37, "mat-icon", 13);
    i0.ɵɵtext(38, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Field Technician Offline Readiness");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "p", 44);
    i0.ɵɵtext(42, " DoorMaster catalogs, hardware lock specs, technician clock widget, checklist, and signature captures are cached locally for zero-latency execution in cellular dead zones. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 45)(44, "button", 46);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_3_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handlePrecacheClick()); });
    i0.ɵɵelementStart(45, "mat-icon", 13);
    i0.ɵɵtext(46, "sync");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "span");
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "button", 47);
    i0.ɵɵlistener("click", function PwaStatusBanner_Conditional_3_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showDiagnosticsModal.set(false)); });
    i0.ɵɵtext(50, " Done ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("Service Worker Version: ", ctx_r1.pwa.cacheStats().version);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r1.pwa.cacheStats().staticCount, " files");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.pwa.cacheStats().apiCount, " endpoints");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.pwa.cacheStats().mapTilesCount, " tiles");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.pwa.pendingSyncCount(), " queued");
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r1.pwa.isPrecaching());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("animate-spin", ctx_r1.pwa.isPrecaching());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.pwa.isPrecaching() ? "Pre-caching Site Assets..." : "Pre-cache for Remote Sites");
} }
export class PwaStatusBanner {
    pwa = inject(PwaService);
    showIosModal = signal(false, ...(ngDevMode ? [{ debugName: "showIosModal" }] : /* istanbul ignore next */ []));
    showDiagnosticsModal = signal(false, ...(ngDevMode ? [{ debugName: "showDiagnosticsModal" }] : /* istanbul ignore next */ []));
    showReconnectedToast = signal(false, ...(ngDevMode ? [{ debugName: "showReconnectedToast" }] : /* istanbul ignore next */ []));
    constructor() {
        // Show brief toast when connection is restored
        let wasOffline = false;
        setInterval(() => {
            const online = this.pwa.isOnline();
            if (!online) {
                wasOffline = true;
            }
            else if (wasOffline) {
                wasOffline = false;
                this.showReconnectedToast.set(true);
                setTimeout(() => this.showReconnectedToast.set(false), 5000);
            }
        }, 1000);
    }
    triggerManualSync() {
        this.pwa.syncPendingActions();
        this.pwa.requestCacheStatus();
    }
    handlePrecacheClick() {
        this.pwa.precacheJobSiteData();
    }
    openIosGuide() {
        this.showIosModal.set(true);
    }
    openDiagnostics() {
        this.pwa.requestCacheStatus();
        this.showDiagnosticsModal.set(true);
    }
    static ɵfac = function PwaStatusBanner_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PwaStatusBanner)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PwaStatusBanner, selectors: [["app-pwa-status-banner"]], decls: 4, vars: 4, consts: [["role", "status", "aria-live", "polite", "aria-label", "Offline Mode Active", 1, "bg-amber-500", "text-slate-950", "px-4", "py-2.5", "shadow-md", "flex", "items-center", "justify-between", "gap-3", "text-xs", "z-50", "border-b", "border-amber-600", "transition-all", "select-none"], ["role", "status", "aria-live", "polite", 1, "bg-emerald-600", "text-white", "px-4", "py-2", "shadow-md", "flex", "items-center", "justify-between", "gap-3", "text-xs", "z-50", "border-b", "border-emerald-700", "animate-in", "fade-in", "transition-all", "select-none"], ["role", "dialog", "aria-labelledby", "iosModalTitle", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "bg-slate-950/70", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-4", "animate-in", "fade-in"], ["role", "dialog", "aria-labelledby", "diagnosticsModalTitle", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "bg-slate-950/70", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-4", "animate-in", "fade-in"], [1, "flex", "items-center", "gap-2.5", "min-w-0"], ["aria-hidden", "true", 1, "w-2.5", "h-2.5", "rounded-full", "bg-slate-950", "animate-ping", "shrink-0"], ["aria-hidden", "true", 1, "!text-base", "!w-4", "!h-4", "text-slate-950", "shrink-0"], [1, "truncate"], [1, "font-extrabold", "uppercase", "tracking-wide", "mr-1.5"], [1, "font-medium", "text-slate-900"], [1, "flex", "items-center", "gap-2", "shrink-0"], [1, "px-2", "py-0.5", "rounded-full", "bg-slate-950", "text-amber-400", "font-mono", "font-bold", "text-[10px]"], ["type", "button", 1, "px-2.5", "py-1", "bg-slate-950", "hover:bg-slate-900", "text-white", "rounded-lg", "font-bold", "text-[11px]", "transition-colors", "flex", "items-center", "gap-1", "shadow-xs", 3, "click"], [1, "!text-xs"], [1, "flex", "items-center", "gap-2"], ["aria-hidden", "true", 1, "!text-base", "!w-4", "!h-4", "text-white"], [1, "font-bold"], ["type", "button", "aria-label", "Dismiss notification", 1, "text-emerald-100", "hover:text-white", "p-1", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "max-w-sm", "w-full", "p-6", "shadow-2xl", "space-y-4"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2.5"], [1, "w-9", "h-9", "rounded-xl", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center", "font-bold"], ["id", "iosModalTitle", 1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-slate-500", "font-mono"], ["type", "button", "aria-label", "Close modal", 1, "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", 3, "click"], [1, "!text-sm"], [1, "space-y-2.5", "text-xs", "text-slate-600", "dark:text-slate-300"], [1, "flex", "items-start", "gap-2.5", "p-2.5", "rounded-xl", "bg-slate-50", "dark:bg-slate-800/60", "border", "border-slate-100", "dark:border-slate-800"], [1, "w-5", "h-5", "rounded-full", "bg-slate-200", "dark:bg-slate-700", "text-slate-800", "dark:text-slate-200", "font-bold", "flex", "items-center", "justify-center", "text-[10px]", "shrink-0"], [1, "text-slate-900", "dark:text-white"], ["type", "button", 1, "w-full", "py-2.5", "bg-slate-900", "hover:bg-slate-800", "text-white", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-900", "rounded-xl", "font-bold", "text-xs", "transition-colors", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "max-w-md", "w-full", "p-6", "shadow-2xl", "space-y-4"], [1, "text-teal-500"], ["id", "diagnosticsModalTitle", 1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], ["type", "button", "aria-label", "Close diagnostics", 1, "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", 3, "click"], [1, "grid", "grid-cols-2", "gap-2.5", "text-xs", "font-mono"], [1, "p-3", "rounded-xl", "bg-slate-50", "dark:bg-slate-800/60", "border", "border-slate-200", "dark:border-slate-800"], [1, "text-[10px]", "text-slate-400", "block", "uppercase"], [1, "text-base", "text-slate-900", "dark:text-white"], [1, "text-base", "text-teal-600", "dark:text-teal-400"], [1, "text-base", "text-indigo-600", "dark:text-indigo-400"], [1, "text-base", "text-amber-600", "dark:text-amber-400"], [1, "p-3", "rounded-xl", "bg-emerald-50", "dark:bg-emerald-950/40", "border", "border-emerald-200", "dark:border-emerald-800", "text-[11px]", "text-emerald-800", "dark:text-emerald-300", "space-y-1"], [1, "flex", "items-center", "gap-1.5", "font-bold"], [1, "leading-relaxed"], [1, "flex", "items-center", "gap-2", "pt-2"], ["type", "button", 1, "flex-1", "py-2.5", "bg-slate-900", "hover:bg-slate-800", "text-white", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-900", "rounded-xl", "font-bold", "text-xs", "transition-colors", "flex", "items-center", "justify-center", "gap-1.5", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2.5", "bg-slate-100", "dark:bg-slate-800", "hover:bg-slate-200", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-200", "rounded-xl", "font-bold", "text-xs", "transition-colors", 3, "click"]], template: function PwaStatusBanner_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, PwaStatusBanner_Conditional_0_Template, 17, 1, "aside", 0);
            i0.ɵɵconditionalCreate(1, PwaStatusBanner_Conditional_1_Template, 11, 0, "aside", 1);
            i0.ɵɵconditionalCreate(2, PwaStatusBanner_Conditional_2_Template, 41, 0, "div", 2);
            i0.ɵɵconditionalCreate(3, PwaStatusBanner_Conditional_3_Template, 51, 9, "div", 3);
        } if (rf & 2) {
            i0.ɵɵconditional(!ctx.pwa.isOnline() ? 0 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.pwa.isOnline() && ctx.showReconnectedToast() ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showIosModal() ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showDiagnosticsModal() ? 3 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PwaStatusBanner, [{
        type: Component,
        args: [{
                selector: 'app-pwa-status-banner',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule],
                template: `
    <!-- 1. Intermittent Offline Connectivity Warning Banner -->
    @if (!pwa.isOnline()) {
      <aside 
        class="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs z-50 border-b border-amber-600 transition-all select-none"
        role="status"
        aria-live="polite"
        aria-label="Offline Mode Active"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping shrink-0" aria-hidden="true"></span>
          <mat-icon class="!text-base !w-4 !h-4 text-slate-950 shrink-0" aria-hidden="true">cloud_off</mat-icon>
          <div class="truncate">
            <span class="font-extrabold uppercase tracking-wide mr-1.5">Offline Mode Active:</span>
            <span class="font-medium text-slate-900">
              Intermittent job site reception detected. Service Worker is serving cached assets & door specifications.
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          @if (pwa.pendingSyncCount() > 0) {
            <span class="px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 font-mono font-bold text-[10px]">
              {{ pwa.pendingSyncCount() }} queued for sync
            </span>
          }
          <button 
            type="button"
            (click)="triggerManualSync()"
            class="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1 shadow-xs"
          >
            <mat-icon class="!text-xs">sync</mat-icon>
            <span>Retry Sync</span>
          </button>
        </div>
      </aside>
    }

    <!-- 2. Reconnection Toast (briefly shown when returning online) -->
    @if (pwa.isOnline() && showReconnectedToast()) {
      <aside 
        class="bg-emerald-600 text-white px-4 py-2 shadow-md flex items-center justify-between gap-3 text-xs z-50 border-b border-emerald-700 animate-in fade-in transition-all select-none"
        role="status"
        aria-live="polite"
      >
        <div class="flex items-center gap-2">
          <mat-icon class="!text-base !w-4 !h-4 text-white" aria-hidden="true">cloud_done</mat-icon>
          <span class="font-bold">Connection Restored:</span>
          <span>Online sync active. Offline actions synchronized with Operations Dispatch.</span>
        </div>
        <button 
          type="button" 
          (click)="showReconnectedToast.set(false)" 
          class="text-emerald-100 hover:text-white p-1"
          aria-label="Dismiss notification"
        >
          <mat-icon class="!text-xs">close</mat-icon>
        </button>
      </aside>
    }

    <!-- 3. iOS Installation Guide Modal -->
    @if (showIosModal()) {
      <div 
        class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        role="dialog"
        aria-labelledby="iosModalTitle"
        aria-modal="true"
      >
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold">
                DM
              </div>
              <div>
                <h3 id="iosModalTitle" class="text-sm font-extrabold text-slate-900 dark:text-white">Install DoorMaster on iOS</h3>
                <p class="text-[11px] text-slate-500 font-mono">Safari Web App Install</p>
              </div>
            </div>
            <button 
              type="button" 
              (click)="showIosModal.set(false)" 
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close modal"
            >
              <mat-icon class="!text-sm">close</mat-icon>
            </button>
          </div>

          <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
              <span>Tap the <strong class="text-slate-900 dark:text-white">Share</strong> icon in the Safari bottom bar.</span>
            </div>
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
              <span>Scroll down and select <strong class="text-slate-900 dark:text-white">Add to Home Screen</strong>.</span>
            </div>
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
              <span>Tap <strong class="text-slate-900 dark:text-white">Add</strong> in top-right to launch standalone with offline site storage!</span>
            </div>
          </div>

          <button 
            type="button"
            (click)="showIosModal.set(false)"
            class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 rounded-xl font-bold text-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    }

    <!-- 4. Cache & Offline Diagnostics Modal -->
    @if (showDiagnosticsModal()) {
      <div 
        class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        role="dialog"
        aria-labelledby="diagnosticsModalTitle"
        aria-modal="true"
      >
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <mat-icon class="text-teal-500">offline_pin</mat-icon>
              <div>
                <h3 id="diagnosticsModalTitle" class="text-sm font-extrabold text-slate-900 dark:text-white">Job Site Offline Cache Diagnostics</h3>
                <p class="text-[11px] text-slate-500 font-mono">Service Worker Version: {{ pwa.cacheStats().version }}</p>
              </div>
            </div>
            <button 
              type="button" 
              (click)="showDiagnosticsModal.set(false)" 
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close diagnostics"
            >
              <mat-icon class="!text-sm">close</mat-icon>
            </button>
          </div>

          <!-- Cache metrics grid -->
          <div class="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">App Shell Assets</span>
              <strong class="text-base text-slate-900 dark:text-white">{{ pwa.cacheStats().staticCount }} files</strong>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">Key API Payloads</span>
              <strong class="text-base text-teal-600 dark:text-teal-400">{{ pwa.cacheStats().apiCount }} endpoints</strong>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">Road Map Tiles</span>
              <strong class="text-base text-indigo-600 dark:text-indigo-400">{{ pwa.cacheStats().mapTilesCount }} tiles</strong>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] text-slate-400 block uppercase">Pending Sync Items</span>
              <strong class="text-base text-amber-600 dark:text-amber-400">{{ pwa.pendingSyncCount() }} queued</strong>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
            <div class="flex items-center gap-1.5 font-bold">
              <mat-icon class="!text-xs">verified</mat-icon>
              <span>Field Technician Offline Readiness</span>
            </div>
            <p class="leading-relaxed">
              DoorMaster catalogs, hardware lock specs, technician clock widget, checklist, and signature captures are cached locally for zero-latency execution in cellular dead zones.
            </p>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <button 
              type="button"
              [disabled]="pwa.isPrecaching()"
              (click)="handlePrecacheClick()"
              class="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <mat-icon class="!text-xs" [class.animate-spin]="pwa.isPrecaching()">sync</mat-icon>
              <span>{{ pwa.isPrecaching() ? 'Pre-caching Site Assets...' : 'Pre-cache for Remote Sites' }}</span>
            </button>
            <button 
              type="button"
              (click)="showDiagnosticsModal.set(false)"
              class="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    }
  `
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PwaStatusBanner, { className: "PwaStatusBanner", filePath: "frontend/src/app/components/pwa-status-banner/pwa-status-banner.ts", lineNumber: 205 }); })();
