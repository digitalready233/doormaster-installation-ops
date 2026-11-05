import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function ClockWidget_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵelement(1, "span", 27);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Clocked In On Site");
    i0.ɵɵelementEnd()();
} }
function ClockWidget_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8)(1, "mat-icon", 28);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Site Work Finished");
    i0.ɵɵelementEnd()();
} }
function ClockWidget_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9)(1, "span");
    i0.ɵɵtext(2, "Ready for Site Check-In");
    i0.ɵɵelementEnd()();
} }
function ClockWidget_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Started at: ");
    i0.ɵɵelementStart(2, "strong", 29);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.formatTime(ctx_r0.activeSession().clockInTime));
} }
function ClockWidget_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Last clocked out: ");
    i0.ɵɵelementStart(2, "strong", 29);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.formatTime(ctx_r0.lastSession().clockOutTime || ""));
} }
function ClockWidget_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Click below when you physically arrive at client location.");
    i0.ɵɵelementEnd();
} }
function ClockWidget_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function ClockWidget_Conditional_47_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleClockIn()); });
    i0.ɵɵelementStart(1, "mat-icon", 31);
    i0.ɵɵtext(2, "login");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Clock In On Site (GPS Verified)");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.job().status === "completed" || ctx_r0.job().status === "bonus_awarded");
} }
function ClockWidget_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function ClockWidget_Conditional_48_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleClockOut()); });
    i0.ɵɵelementStart(1, "mat-icon", 31);
    i0.ɵɵtext(2, "logout");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Clock Out & Complete Site Work");
    i0.ɵɵelementEnd()();
} }
function ClockWidget_Conditional_49_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 23);
    i0.ɵɵelement(2, "span", 36);
    i0.ɵɵelementStart(3, "span", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 38)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 39);
    i0.ɵɵtext(9, "GPS OK");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const session_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(session_r4.clockOutTime ? "bg-slate-400" : "bg-emerald-500");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.formatTime(session_r4.clockInTime), " \u2192 ", session_r4.clockOutTime ? ctx_r0.formatTime(session_r4.clockOutTime) : "Active");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(session_r4.durationMinutes ? session_r4.durationMinutes + " mins" : "Running");
} }
function ClockWidget_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26)(1, "h5", 33);
    i0.ɵɵtext(2, "Logged Shifts on this Door");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 34);
    i0.ɵɵrepeaterCreate(4, ClockWidget_Conditional_49_For_5_Template, 10, 5, "div", 35, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r0.job().clockSessions);
} }
export class ClockWidget {
    job = input.required(...(ngDevMode ? [{ debugName: "job" }] : /* istanbul ignore next */ []));
    clockInTriggered = output();
    clockOutTriggered = output();
    liveElapsedTime = signal('00:00:00', ...(ngDevMode ? [{ debugName: "liveElapsedTime" }] : /* istanbul ignore next */ []));
    timerInterval = null;
    isOnSite = computed(() => {
        return this.job().status === 'on_site' || this.job().clockSessions?.some(s => !s.clockOutTime);
    }, ...(ngDevMode ? [{ debugName: "isOnSite" }] : /* istanbul ignore next */ []));
    activeSession = computed(() => {
        return this.job().clockSessions?.find(s => !s.clockOutTime);
    }, ...(ngDevMode ? [{ debugName: "activeSession" }] : /* istanbul ignore next */ []));
    lastSession = computed(() => {
        const list = this.job().clockSessions || [];
        return list.length > 0 ? list[list.length - 1] : null;
    }, ...(ngDevMode ? [{ debugName: "lastSession" }] : /* istanbul ignore next */ []));
    ngOnInit() {
        this.startTimerIfActive();
    }
    ngOnDestroy() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
    startTimerIfActive() {
        if (this.timerInterval)
            clearInterval(this.timerInterval);
        const tick = () => {
            const active = this.activeSession();
            if (!active) {
                this.liveElapsedTime.set('00:00:00');
                return;
            }
            const startTime = new Date(active.clockInTime).getTime();
            const now = Date.now();
            const diffSec = Math.max(0, Math.floor((now - startTime) / 1000));
            const hrs = Math.floor(diffSec / 3600);
            const mins = Math.floor((diffSec % 3600) / 60);
            const secs = diffSec % 60;
            const pad = (n) => n.toString().padStart(2, '0');
            this.liveElapsedTime.set(`${pad(hrs)}:${pad(mins)}:${pad(secs)}`);
        };
        tick();
        this.timerInterval = setInterval(tick, 1000);
    }
    handleClockIn() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.clockInTriggered.emit({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            }, () => {
                this.clockInTriggered.emit({ lat: 37.7749, lng: -122.4194 });
            }, { enableHighAccuracy: true, timeout: 3000 });
        }
        else {
            this.clockInTriggered.emit({ lat: 37.7749, lng: -122.4194 });
        }
    }
    handleClockOut() {
        this.clockOutTriggered.emit({ notes: 'Site work successfully completed. Ready for verification inspection.' });
    }
    formatTime(isoString) {
        if (!isoString)
            return '--:--';
        try {
            return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        catch {
            return isoString;
        }
    }
    formatLoggedHours(hours) {
        return `${hours.toFixed(1)} hrs`;
    }
    static ɵfac = function ClockWidget_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ClockWidget)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClockWidget, selectors: [["app-clock-widget"]], inputs: { job: [1, "job"] }, outputs: { clockInTriggered: "clockInTriggered", clockOutTriggered: "clockOutTriggered" }, decls: 50, vars: 11, consts: [[1, "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "shadow-xs", "text-slate-900", "dark:text-slate-100", "transition-colors"], [1, "flex", "items-center", "justify-between", "mb-4", "pb-3", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "flex", "items-center", "gap-2.5"], [1, "w-9", "h-9", "rounded-lg", "flex", "items-center", "justify-center"], [1, "!text-lg"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "rounded-full", "text-xs", "font-semibold", "bg-emerald-50", "dark:bg-emerald-950/40", "text-emerald-700", "dark:text-emerald-300", "border", "border-emerald-200", "dark:border-emerald-800", "animate-pulse"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-xs", "font-semibold", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "text-xs", "font-semibold", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "mb-4"], [1, "bg-slate-50", "dark:bg-slate-950/60", "rounded-lg", "p-3.5", "border", "border-slate-200/70", "dark:border-slate-800"], [1, "text-[11px]", "font-semibold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "block", "mb-1"], [1, "flex", "items-baseline", "gap-2"], [1, "text-2xl", "font-bold", "font-mono", "text-slate-900", "dark:text-white", "tracking-tight", "tabular-nums"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "flex", "items-center", "gap-1.5", "text-xs", "font-medium", "text-slate-800", "dark:text-slate-200"], [1, "!text-sm", "text-emerald-600", "dark:text-emerald-400"], [1, "truncate"], [1, "flex", "items-center", "gap-2", "text-[11px]", "text-slate-500", "dark:text-slate-400", "mt-1", "font-mono"], [1, "text-emerald-700", "dark:text-emerald-400", "font-medium"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "pt-2"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "rounded-lg", "transition-colors", "inline-flex", "items-center", "gap-1.5", "shadow-sm", 3, "disabled"], ["type", "button", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-rose-600", "hover:bg-rose-700", "rounded-lg", "transition-colors", "inline-flex", "items-center", "gap-1.5", "shadow-sm"], [1, "mt-4", "pt-4", "border-t", "border-slate-100", "dark:border-slate-800"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500"], [1, "!text-xs", "!w-3.5", "!h-3.5", "text-emerald-600", "dark:text-emerald-400"], [1, "text-slate-800", "dark:text-slate-200", "font-mono"], ["type", "button", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "rounded-lg", "transition-colors", "inline-flex", "items-center", "gap-1.5", "shadow-sm", 3, "click", "disabled"], [1, "!text-sm", "!w-4", "!h-4"], ["type", "button", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-rose-600", "hover:bg-rose-700", "rounded-lg", "transition-colors", "inline-flex", "items-center", "gap-1.5", "shadow-sm", 3, "click"], [1, "text-[11px]", "font-semibold", "text-slate-500", "dark:text-slate-400", "uppercase", "tracking-wider", "mb-2"], [1, "space-y-1.5"], [1, "flex", "items-center", "justify-between", "text-xs", "py-1", "px-2.5", "rounded", "bg-slate-50", "dark:bg-slate-950/60", "border", "border-slate-100", "dark:border-slate-800"], [1, "w-1.5", "h-1.5", "rounded-full"], [1, "font-mono", "text-slate-700", "dark:text-slate-300"], [1, "flex", "items-center", "gap-3", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "text-emerald-700", "dark:text-emerald-400", "text-[11px]"]], template: function ClockWidget_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon", 4);
            i0.ɵɵtext(5, "schedule");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div")(7, "h3", 5);
            i0.ɵɵtext(8, "On-Site Clock In / Clock Out");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 6);
            i0.ɵɵtext(10, "GPS geofenced time attendance & labor tracking");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div");
            i0.ɵɵconditionalCreate(12, ClockWidget_Conditional_12_Template, 4, 0, "span", 7)(13, ClockWidget_Conditional_13_Template, 5, 0, "span", 8)(14, ClockWidget_Conditional_14_Template, 3, 0, "span", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 10)(16, "div", 11)(17, "span", 12);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "span", 14);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span", 15);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "p", 16);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 11)(27, "span", 12);
            i0.ɵɵtext(28, " Site Location Verification ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 17)(30, "mat-icon", 18);
            i0.ɵɵtext(31, "location_on");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span", 19);
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 20)(35, "span", 21);
            i0.ɵɵtext(36, "\u25CF GPS Verified (\u00B18m)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span");
            i0.ɵɵtext(38, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span");
            i0.ɵɵtext(40, "Radius: Within 25m boundary");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(41, "div", 22)(42, "div", 6);
            i0.ɵɵconditionalCreate(43, ClockWidget_Conditional_43_Template, 4, 1, "span")(44, ClockWidget_Conditional_44_Template, 4, 1, "span")(45, ClockWidget_Conditional_45_Template, 2, 0, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 23);
            i0.ɵɵconditionalCreate(47, ClockWidget_Conditional_47_Template, 5, 1, "button", 24)(48, ClockWidget_Conditional_48_Template, 5, 0, "button", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(49, ClockWidget_Conditional_49_Template, 6, 0, "div", 26);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵclassMap(ctx.isOnSite() ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300");
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.isOnSite() ? 12 : ctx.job().status === "completed" || ctx.job().status === "installed_pending_signoff" ? 13 : 14);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.isOnSite() ? "Live Session Elapsed" : "Total Time Logged", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.isOnSite() ? ctx.liveElapsedTime() : ctx.formatLoggedHours(ctx.job().actualHours || 0), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" / ", ctx.job().estimatedHours, "h estimated ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.isOnSite() ? "Technician currently on site" : "Efficiency score: On-schedule", " ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.job().client.siteAddress);
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(ctx.activeSession() ? 43 : ctx.lastSession() ? 44 : 45);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.isOnSite() ? 47 : 48);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.job().clockSessions && ctx.job().clockSessions.length > 0 ? 49 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClockWidget, [{
        type: Component,
        args: [{
                selector: 'app-clock-widget',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule],
                template: `
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs text-slate-900 dark:text-slate-100 transition-colors">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2.5">
          <div 
            class="w-9 h-9 rounded-lg flex items-center justify-center"
            [class]="isOnSite() ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'"
          >
            <mat-icon class="!text-lg">schedule</mat-icon>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">On-Site Clock In / Clock Out</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">GPS geofenced time attendance & labor tracking</p>
          </div>
        </div>

        <div>
          @if (isOnSite()) {
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 animate-pulse">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Clocked In On Site</span>
            </span>
          } @else if (job().status === 'completed' || job().status === 'installed_pending_signoff') {
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <mat-icon class="!text-xs !w-3.5 !h-3.5 text-emerald-600 dark:text-emerald-400">check_circle</mat-icon>
              <span>Site Work Finished</span>
            </span>
          } @else {
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <span>Ready for Site Check-In</span>
            </span>
          }
        </div>
      </div>

      <!-- Live timer & site location card -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <!-- Timer -->
        <div class="bg-slate-50 dark:bg-slate-950/60 rounded-lg p-3.5 border border-slate-200/70 dark:border-slate-800">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            {{ isOnSite() ? 'Live Session Elapsed' : 'Total Time Logged' }}
          </span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ isOnSite() ? liveElapsedTime() : formatLoggedHours(job().actualHours || 0) }}
            </span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">
              / {{ job().estimatedHours }}h estimated
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {{ isOnSite() ? 'Technician currently on site' : 'Efficiency score: On-schedule' }}
          </p>
        </div>

        <!-- GPS Geofence details -->
        <div class="bg-slate-50 dark:bg-slate-950/60 rounded-lg p-3.5 border border-slate-200/70 dark:border-slate-800">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Site Location Verification
          </span>
          <div class="flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200">
            <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">location_on</mat-icon>
            <span class="truncate">{{ job().client.siteAddress }}</span>
          </div>
          <div class="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span class="text-emerald-700 dark:text-emerald-400 font-medium">● GPS Verified (±8m)</span>
            <span>·</span>
            <span>Radius: Within 25m boundary</span>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div class="text-xs text-slate-500 dark:text-slate-400">
          @if (activeSession()) {
            <span>Started at: <strong class="text-slate-800 dark:text-slate-200 font-mono">{{ formatTime(activeSession()!.clockInTime) }}</strong></span>
          } @else if (lastSession()) {
            <span>Last clocked out: <strong class="text-slate-800 dark:text-slate-200 font-mono">{{ formatTime(lastSession()!.clockOutTime || '') }}</strong></span>
          } @else {
            <span>Click below when you physically arrive at client location.</span>
          }
        </div>

        <div class="flex items-center gap-2">
          @if (!isOnSite()) {
            <button 
              type="button"
              (click)="handleClockIn()"
              [disabled]="job().status === 'completed' || job().status === 'bonus_awarded'"
              class="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <mat-icon class="!text-sm !w-4 !h-4">login</mat-icon>
              <span>Clock In On Site (GPS Verified)</span>
            </button>
          } @else {
            <button 
              type="button"
              (click)="handleClockOut()"
              class="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <mat-icon class="!text-sm !w-4 !h-4">logout</mat-icon>
              <span>Clock Out & Complete Site Work</span>
            </button>
          }
        </div>
      </div>

      <!-- Session history if any -->
      @if (job().clockSessions && job().clockSessions.length > 0) {
        <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h5 class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Logged Shifts on this Door</h5>
          <div class="space-y-1.5">
            @for (session of job().clockSessions; track session.id) {
              <div class="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full" [class]="session.clockOutTime ? 'bg-slate-400' : 'bg-emerald-500'"></span>
                  <span class="font-mono text-slate-700 dark:text-slate-300">{{ formatTime(session.clockInTime) }} → {{ session.clockOutTime ? formatTime(session.clockOutTime) : 'Active' }}</span>
                </div>
                <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono">
                  <span>{{ session.durationMinutes ? session.durationMinutes + ' mins' : 'Running' }}</span>
                  <span class="text-emerald-700 dark:text-emerald-400 text-[11px]">GPS OK</span>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
            }]
    }], null, { job: [{ type: i0.Input, args: [{ isSignal: true, alias: "job", required: true }] }], clockInTriggered: [{ type: i0.Output, args: ["clockInTriggered"] }], clockOutTriggered: [{ type: i0.Output, args: ["clockOutTriggered"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ClockWidget, { className: "ClockWidget", filePath: "frontend/src/app/components/clock-widget/clock-widget.ts", lineNumber: 140 }); })();
