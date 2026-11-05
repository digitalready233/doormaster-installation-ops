import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstallationStore } from './services/installation.store';
import { ThemeStore } from './services/theme';
import { PwaService } from './services/pwa.service';
import { PwaStatusBanner } from './components/pwa-status-banner/pwa-status-banner';
import * as i0 from "@angular/core";
export class App {
    store = inject(InstallationStore);
    themeStore = inject(ThemeStore);
    pwa = inject(PwaService);
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 3, vars: 2, consts: [[1, "min-h-screen", "bg-slate-100", "text-slate-900", "dark:bg-slate-950", "dark:text-slate-100", "flex", "flex-col", "antialiased", "transition-colors", "duration-200"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-pwa-status-banner")(2, "router-outlet");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("dark", ctx.themeStore.isDark());
        } }, dependencies: [RouterOutlet,
            PwaStatusBanner], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', changeDetection: ChangeDetectionStrategy.OnPush, imports: [
                    RouterOutlet,
                    PwaStatusBanner
                ], template: "<div \n  class=\"min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200\"\n  [class.dark]=\"themeStore.isDark()\"\n>\n  <!-- Global PWA Service Worker Offline Warning & Sync Alerts -->\n  <app-pwa-status-banner />\n\n  <!-- Main Application Route Canvas -->\n  <router-outlet />\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "frontend/src/app/app.ts", lineNumber: 18 }); })();
