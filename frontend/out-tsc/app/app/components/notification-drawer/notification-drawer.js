import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function NotificationDrawer_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "mat-icon", 22);
    i0.ɵɵtext(2, "notifications_none");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 23);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 24);
    i0.ɵɵtext(6, "Assignments, site clock-ins, client acceptances and bonus awards will appear here in real time.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("No active alerts for ", ctx_r0.store.currentRoleDefinition().name);
} }
function NotificationDrawer_Conditional_29_For_1_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 38);
    i0.ɵɵlistener("click", function NotificationDrawer_Conditional_29_For_1_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const notif_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.store.markNotificationRead(notif_r3.id)); });
    i0.ɵɵtext(1, " Dismiss ");
    i0.ɵɵelementEnd();
} }
function NotificationDrawer_Conditional_29_For_1_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function NotificationDrawer_Conditional_29_For_1_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const notif_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.handleAction(notif_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notif_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", notif_r3.actionLabel, " \u2192 ");
} }
function NotificationDrawer_Conditional_29_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26)(1, "div", 27)(2, "div", 28)(3, "div", 29)(4, "mat-icon", 30);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h4", 31);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 32);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 33);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 34)(13, "span", 35);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 28);
    i0.ɵɵconditionalCreate(16, NotificationDrawer_Conditional_29_For_1_Conditional_16_Template, 2, 0, "button", 36);
    i0.ɵɵconditionalCreate(17, NotificationDrawer_Conditional_29_For_1_Conditional_17_Template, 2, 1, "button", 37);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const notif_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(notif_r3.read ? "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80" : "bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 shadow-xs ring-1 ring-slate-900/5 dark:ring-white/5");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ctx_r0.getBadgeStyle(notif_r3.type));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getIcon(notif_r3.type));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(notif_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.formatTime(notif_r3.timestamp), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", notif_r3.message, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Job ", notif_r3.jobId, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!notif_r3.read ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(notif_r3.actionLabel ? 17 : -1);
} }
function NotificationDrawer_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, NotificationDrawer_Conditional_29_For_1_Template, 18, 11, "div", 25, _forTrack0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r0.store.roleNotifications());
} }
export class NotificationDrawer {
    store = inject(InstallationStore);
    closed = output();
    jobSelected = output();
    getIcon(type) {
        switch (type) {
            case 'job_assigned': return 'assignment_ind';
            case 'installer_accepted': return 'handshake';
            case 'door_dispatched': return 'local_shipping';
            case 'technician_clocked_in': return 'login';
            case 'technician_clocked_out': return 'logout';
            case 'signoff_required': return 'draw';
            case 'installation_verified': return 'verified';
            case 'bonus_awarded': return 'payments';
            default: return 'notifications';
        }
    }
    getBadgeStyle(type) {
        switch (type) {
            case 'job_assigned': return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400';
            case 'installer_accepted': return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400';
            case 'door_dispatched': return 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-400';
            case 'technician_clocked_in': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400';
            case 'signoff_required': return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400';
            case 'installation_verified': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400';
            case 'bonus_awarded': return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold';
            default: return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
        }
    }
    formatTime(isoString) {
        try {
            const d = new Date(isoString);
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        catch {
            return '';
        }
    }
    handleAction(notif) {
        this.store.markNotificationRead(notif.id);
        this.jobSelected.emit(notif.jobId);
        this.closed.emit();
    }
    static ɵfac = function NotificationDrawer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationDrawer)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationDrawer, selectors: [["app-notification-drawer"]], outputs: { closed: "closed", jobSelected: "jobSelected" }, decls: 35, vars: 3, consts: [[1, "fixed", "inset-0", "z-50", "overflow-hidden", "bg-slate-950/40", "backdrop-blur-xs", "animate-in", "fade-in", "duration-200"], [1, "absolute", "inset-y-0", "right-0", "max-w-full", "flex", "pl-10"], [1, "w-screen", "max-w-md", "bg-white", "dark:bg-slate-900", "border-l", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "flex", "flex-col", "text-slate-900", "dark:text-slate-100"], [1, "p-5", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-950/70"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-lg", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "flex", "items-center", "justify-center"], [1, "!text-sm", "!w-4", "!h-4"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "font-medium", "text-slate-800", "dark:text-slate-200", "capitalize"], [1, "flex", "items-center", "gap-1"], ["type", "button", "title", "Mark all as read", 1, "text-xs", "text-slate-600", "dark:text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "px-2", "py-1", "rounded", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", 3, "click"], ["type", "button", 1, "p-1", "rounded", "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", 3, "click"], [1, "!text-lg"], [1, "px-5", "py-2.5", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "text-xs", "text-slate-500", "dark:text-slate-400", "bg-slate-50/30", "dark:bg-slate-950/40"], [1, "text-emerald-700", "dark:text-emerald-400", "font-medium", "flex", "items-center", "gap-1"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500"], [1, "flex-1", "overflow-y-auto", "p-5", "space-y-3"], [1, "text-center", "py-12", "text-slate-400", "dark:text-slate-500"], [1, "p-4", "bg-slate-50", "dark:bg-slate-950/80", "border-t", "border-slate-200/80", "dark:border-slate-800", "text-xs", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "justify-between"], [1, "text-[11px]"], ["type", "button", 1, "px-3", "py-1.5", "bg-slate-200", "dark:bg-slate-800", "hover:bg-slate-300", "dark:hover:bg-slate-700", "text-slate-800", "dark:text-slate-200", "rounded", "font-medium", "text-xs", "transition-colors", 3, "click"], [1, "!text-3xl", "mb-2", "text-slate-300", "dark:text-slate-600"], [1, "text-xs", "font-medium", "text-slate-600", "dark:text-slate-300"], [1, "text-[11px]", "text-slate-400", "dark:text-slate-500", "mt-1"], [1, "p-4", "rounded-xl", "border", "transition-all", "text-left", "relative", 3, "class"], [1, "p-4", "rounded-xl", "border", "transition-all", "text-left", "relative"], [1, "flex", "items-start", "justify-between", "gap-3", "mb-1.5"], [1, "flex", "items-center", "gap-2"], [1, "w-6", "h-6", "rounded-md", "flex", "items-center", "justify-center", "text-xs"], [1, "!text-xs", "!w-3.5", "!h-3.5"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "text-slate-400", "dark:text-slate-500", "font-mono", "tabular-nums", "whitespace-nowrap"], [1, "text-xs", "text-slate-600", "dark:text-slate-300", "leading-relaxed", "pl-8"], [1, "pl-8", "mt-2.5", "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-mono", "text-slate-400", "dark:text-slate-500", "uppercase", "tracking-wider"], ["type", "button", 1, "text-[11px]", "font-medium", "text-slate-500", "dark:text-slate-400", "hover:text-slate-800", "dark:hover:text-white"], ["type", "button", 1, "text-[11px]", "font-semibold", "text-slate-900", "dark:text-white", "hover:underline"], ["type", "button", 1, "text-[11px]", "font-medium", "text-slate-500", "dark:text-slate-400", "hover:text-slate-800", "dark:hover:text-white", 3, "click"], ["type", "button", 1, "text-[11px]", "font-semibold", "text-slate-900", "dark:text-white", "hover:underline", 3, "click"]], template: function NotificationDrawer_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "mat-icon", 6);
            i0.ɵɵtext(7, "notifications");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div")(9, "h3", 7);
            i0.ɵɵtext(10, "DoorMaster Live Dispatch Alerts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "p", 8);
            i0.ɵɵtext(12, "Filtered for role: ");
            i0.ɵɵelementStart(13, "span", 9);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(15, "div", 10)(16, "button", 11);
            i0.ɵɵlistener("click", function NotificationDrawer_Template_button_click_16_listener() { return ctx.store.markAllNotificationsRead(); });
            i0.ɵɵtext(17, " Mark Read ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 12);
            i0.ɵɵlistener("click", function NotificationDrawer_Template_button_click_18_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(19, "mat-icon", 13);
            i0.ɵɵtext(20, "close");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(21, "div", 14)(22, "span");
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 15);
            i0.ɵɵelement(25, "span", 16);
            i0.ɵɵtext(26, " Live Dispatch Feed Active ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 17);
            i0.ɵɵconditionalCreate(28, NotificationDrawer_Conditional_28_Template, 7, 1, "div", 18)(29, NotificationDrawer_Conditional_29_Template, 2, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 19)(31, "span", 20);
            i0.ɵɵtext(32, "System notifications automatically route to Installer & Client portals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "button", 21);
            i0.ɵɵlistener("click", function NotificationDrawer_Template_button_click_33_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(34, " Close Drawer ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.store.currentRoleDefinition().name);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("", ctx.store.roleNotifications().length, " total dispatch events");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.store.roleNotifications().length === 0 ? 28 : 29);
        } }, dependencies: [MatIconModule, i1.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationDrawer, [{
        type: Component,
        args: [{
                selector: 'app-notification-drawer',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule],
                template: `
    <div class="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100">
          <!-- Header -->
          <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                <mat-icon class="!text-sm !w-4 !h-4">notifications</mat-icon>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">DoorMaster Live Dispatch Alerts</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">Filtered for role: <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">{{ store.currentRoleDefinition().name }}</span></p>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <button 
                type="button"
                (click)="store.markAllNotificationsRead()"
                class="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Mark all as read"
              >
                Mark Read
              </button>
              <button 
                type="button"
                (click)="closed.emit()"
                class="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>
            </div>
          </div>

          <!-- Notification filter tabs -->
          <div class="px-5 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-950/40">
            <span>{{ store.roleNotifications().length }} total dispatch events</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Live Dispatch Feed Active
            </span>
          </div>

          <!-- Notifications List -->
          <div class="flex-1 overflow-y-auto p-5 space-y-3">
            @if (store.roleNotifications().length === 0) {
              <div class="text-center py-12 text-slate-400 dark:text-slate-500">
                <mat-icon class="!text-3xl mb-2 text-slate-300 dark:text-slate-600">notifications_none</mat-icon>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-300">No active alerts for {{ store.currentRoleDefinition().name }}</p>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Assignments, site clock-ins, client acceptances and bonus awards will appear here in real time.</p>
              </div>
            } @else {
              @for (notif of store.roleNotifications(); track notif.id) {
                <div 
                  class="p-4 rounded-xl border transition-all text-left relative"
                  [class]="notif.read ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80' : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 shadow-xs ring-1 ring-slate-900/5 dark:ring-white/5'"
                >
                  <div class="flex items-start justify-between gap-3 mb-1.5">
                    <div class="flex items-center gap-2">
                      <div 
                        class="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                        [class]="getBadgeStyle(notif.type)"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ getIcon(notif.type) }}</mat-icon>
                      </div>
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white">{{ notif.title }}</h4>
                    </div>

                    <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono tabular-nums whitespace-nowrap">
                      {{ formatTime(notif.timestamp) }}
                    </span>
                  </div>

                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                    {{ notif.message }}
                  </p>

                  <div class="pl-8 mt-2.5 flex items-center justify-between">
                    <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Job {{ notif.jobId }}
                    </span>

                    <div class="flex items-center gap-2">
                      @if (!notif.read) {
                        <button 
                          type="button"
                          (click)="store.markNotificationRead(notif.id)"
                          class="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                        >
                          Dismiss
                        </button>
                      }
                      @if (notif.actionLabel) {
                        <button 
                          type="button"
                          (click)="handleAction(notif)"
                          class="text-[11px] font-semibold text-slate-900 dark:text-white hover:underline"
                        >
                          {{ notif.actionLabel }} →
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <!-- Bottom trigger preview helper -->
          <div class="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span class="text-[11px]">System notifications automatically route to Installer & Client portals</span>
            <button 
              type="button" 
              (click)="closed.emit()"
              class="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded font-medium text-xs transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
            }]
    }], null, { closed: [{ type: i0.Output, args: ["closed"] }], jobSelected: [{ type: i0.Output, args: ["jobSelected"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationDrawer, { className: "NotificationDrawer", filePath: "frontend/src/app/components/notification-drawer/notification-drawer.ts", lineNumber: 135 }); })();
