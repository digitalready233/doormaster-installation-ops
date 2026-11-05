import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PwaService } from '../../services/pwa.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
function PwaInstallButton_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 4);
    i0.ɵɵlistener("click", function PwaInstallButton_Conditional_0_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.handleInstall()); });
    i0.ɵɵelementStart(1, "mat-icon", 5);
    i0.ɵɵtext(2, "download_for_offline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Install App");
    i0.ɵɵelementEnd()();
} }
function PwaInstallButton_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵlistener("click", function PwaInstallButton_Conditional_0_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showIosModal.set(true)); });
    i0.ɵɵelementStart(1, "mat-icon", 7);
    i0.ɵɵtext(2, "add_to_home_screen");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Install on iOS");
    i0.ɵɵelementEnd()();
} }
function PwaInstallButton_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function PwaInstallButton_Conditional_0_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.handlePrecache()); });
    i0.ɵɵelement(1, "span", 9);
    i0.ɵɵelementStart(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.pwa.isOnline() ? "bg-emerald-500" : "bg-amber-500 animate-ping");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.pwa.isOnline() ? "SW Offline Ready" : "Operating Offline");
} }
function PwaInstallButton_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, PwaInstallButton_Conditional_0_Conditional_0_Template, 5, 0, "button", 1)(1, PwaInstallButton_Conditional_0_Conditional_1_Template, 5, 0, "button", 2)(2, PwaInstallButton_Conditional_0_Conditional_2_Template, 4, 3, "button", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.pwa.isInstallable() ? 0 : ctx_r1.pwa.isIOS() ? 1 : 2);
} }
function PwaInstallButton_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 0)(1, "div", 11)(2, "div", 12)(3, "h3", 13);
    i0.ɵɵtext(4, "Install DoorMaster on iOS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 14);
    i0.ɵɵlistener("click", function PwaInstallButton_Conditional_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showIosModal.set(false)); });
    i0.ɵɵelementStart(6, "mat-icon", 15);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "p", 16);
    i0.ɵɵtext(9, " 1. Tap the ");
    i0.ɵɵelementStart(10, "strong", 17);
    i0.ɵɵtext(11, "Share");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, " button in Safari.");
    i0.ɵɵelement(13, "br");
    i0.ɵɵtext(14, " 2. Scroll down and tap ");
    i0.ɵɵelementStart(15, "strong", 17);
    i0.ɵɵtext(16, "Add to Home Screen");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17, ".");
    i0.ɵɵelement(18, "br");
    i0.ɵɵtext(19, " 3. Tap ");
    i0.ɵɵelementStart(20, "strong", 17);
    i0.ɵɵtext(21, "Add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22, " to install. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 18);
    i0.ɵɵlistener("click", function PwaInstallButton_Conditional_1_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showIosModal.set(false)); });
    i0.ɵɵtext(24, " Dismiss ");
    i0.ɵɵelementEnd()()();
} }
export class PwaInstallButton {
    pwa = inject(PwaService);
    showIosModal = signal(false, ...(ngDevMode ? [{ debugName: "showIosModal" }] : /* istanbul ignore next */ []));
    async handleInstall() {
        await this.pwa.promptInstall();
    }
    handlePrecache() {
        this.pwa.precacheJobSiteData();
    }
    static ɵfac = function PwaInstallButton_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PwaInstallButton)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PwaInstallButton, selectors: [["app-pwa-install-button"]], decls: 2, vars: 2, consts: [["role", "dialog", "aria-labelledby", "iosButtonModalTitle", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "bg-slate-950/70", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-4", "animate-in", "fade-in"], ["type", "button", "title", "Install DoorMaster PWA for offline field access", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-xl", "bg-slate-900", "hover:bg-slate-800", "text-white", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-900", "text-xs", "font-bold", "transition-all", "shadow-xs", "group"], ["type", "button", "title", "Install DoorMaster on iPhone or iPad", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-200", "text-xs", "font-bold", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-colors"], ["type", "button", "title", "Service Worker Active \u2014 Click to pre-cache offline site data", 1, "flex", "items-center", "gap-1.5", "px-2.5", "py-1.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300", "text-xs", "font-mono", "font-semibold", "hover:border-slate-300", "dark:hover:border-slate-700", "transition-colors"], ["type", "button", "title", "Install DoorMaster PWA for offline field access", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-xl", "bg-slate-900", "hover:bg-slate-800", "text-white", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-900", "text-xs", "font-bold", "transition-all", "shadow-xs", "group", 3, "click"], [1, "!text-xs", "!w-4", "!h-4", "text-emerald-400", "group-hover:scale-110", "transition-transform"], ["type", "button", "title", "Install DoorMaster on iPhone or iPad", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-200", "text-xs", "font-bold", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-colors", 3, "click"], [1, "!text-xs", "!w-4", "!h-4", "text-sky-500"], ["type", "button", "title", "Service Worker Active \u2014 Click to pre-cache offline site data", 1, "flex", "items-center", "gap-1.5", "px-2.5", "py-1.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300", "text-xs", "font-mono", "font-semibold", "hover:border-slate-300", "dark:hover:border-slate-700", "transition-colors", 3, "click"], [1, "w-2", "h-2", "rounded-full"], [1, "text-[11px]"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "max-w-sm", "w-full", "p-6", "shadow-2xl", "space-y-4"], [1, "flex", "items-center", "justify-between"], ["id", "iosButtonModalTitle", 1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], ["type", "button", "aria-label", "Close", 1, "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", 3, "click"], [1, "!text-sm"], [1, "text-xs", "text-slate-600", "dark:text-slate-300", "leading-relaxed"], [1, "text-slate-900", "dark:text-white"], ["type", "button", 1, "w-full", "py-2", "bg-slate-900", "hover:bg-slate-800", "text-white", "dark:bg-white", "dark:text-slate-900", "rounded-xl", "font-bold", "text-xs", 3, "click"]], template: function PwaInstallButton_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, PwaInstallButton_Conditional_0_Template, 3, 1);
            i0.ɵɵconditionalCreate(1, PwaInstallButton_Conditional_1_Template, 25, 0, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(!ctx.pwa.isInstalled() ? 0 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showIosModal() ? 1 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PwaInstallButton, [{
        type: Component,
        args: [{
                selector: 'app-pwa-install-button',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule],
                template: `
    <!-- Suppressed if already installed as standalone PWA -->
    @if (!pwa.isInstalled()) {
      <!-- 1. Chromium / Android / Desktop flow with beforeinstallprompt -->
      @if (pwa.isInstallable()) {
        <button
          type="button"
          (click)="handleInstall()"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-xs font-bold transition-all shadow-xs group"
          title="Install DoorMaster PWA for offline field access"
        >
          <mat-icon class="!text-xs !w-4 !h-4 text-emerald-400 group-hover:scale-110 transition-transform">download_for_offline</mat-icon>
          <span>Install App</span>
        </button>
      }

      <!-- 2. iOS Safari Flow -->
      @else if (pwa.isIOS()) {
        <button
          type="button"
          (click)="showIosModal.set(true)"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Install DoorMaster on iPhone or iPad"
        >
          <mat-icon class="!text-xs !w-4 !h-4 text-sky-500">add_to_home_screen</mat-icon>
          <span>Install on iOS</span>
        </button>
      }

      <!-- 3. Ambient PWA Ready / Cache Pre-warm Button -->
      @else {
        <button
          type="button"
          (click)="handlePrecache()"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-mono font-semibold hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          title="Service Worker Active — Click to pre-cache offline site data"
        >
          <span class="w-2 h-2 rounded-full" [class]="pwa.isOnline() ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'"></span>
          <span class="text-[11px]">{{ pwa.isOnline() ? 'SW Offline Ready' : 'Operating Offline' }}</span>
        </button>
      }
    }

    <!-- iOS Install Guide Modal -->
    @if (showIosModal()) {
      <div 
        class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        role="dialog"
        aria-labelledby="iosButtonModalTitle"
        aria-modal="true"
      >
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between">
            <h3 id="iosButtonModalTitle" class="text-sm font-extrabold text-slate-900 dark:text-white">Install DoorMaster on iOS</h3>
            <button 
              type="button" 
              (click)="showIosModal.set(false)" 
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <mat-icon class="!text-sm">close</mat-icon>
            </button>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            1. Tap the <strong class="text-slate-900 dark:text-white">Share</strong> button in Safari.<br>
            2. Scroll down and tap <strong class="text-slate-900 dark:text-white">Add to Home Screen</strong>.<br>
            3. Tap <strong class="text-slate-900 dark:text-white">Add</strong> to install.
          </p>
          <button 
            type="button" 
            (click)="showIosModal.set(false)"
            class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      </div>
    }
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PwaInstallButton, { className: "PwaInstallButton", filePath: "frontend/src/app/components/pwa-install-button/pwa-install-button.ts", lineNumber: 89 }); })();
