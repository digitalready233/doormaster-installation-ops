import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
function RejectionModal_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 24);
    i0.ɵɵtext(1, "Vehicle mechanical inspection / maintenance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "option", 25);
    i0.ɵɵtext(3, "Currently on another site delivery run");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "option", 26);
    i0.ɵɵtext(5, "Door dimensions exceed current truck payload");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "option", 27);
    i0.ɵɵtext(7, "Severe road access limitation to site");
    i0.ɵɵelementEnd();
} }
function RejectionModal_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 28);
    i0.ɵɵtext(1, "Scheduled on another door installation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "option", 29);
    i0.ɵɵtext(3, "Missing smart lock mortising jig for this lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "option", 30);
    i0.ɵɵtext(5, "Off-duty / Personal leave");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "option", 31);
    i0.ɵɵtext(7, "Transit distance exceeds current daily radius");
    i0.ɵɵelementEnd();
} }
export class RejectionModal {
    jobId = input.required(...(ngDevMode ? [{ debugName: "jobId" }] : /* istanbul ignore next */ []));
    roleTitle = input('Team Member', ...(ngDevMode ? [{ debugName: "roleTitle" }] : /* istanbul ignore next */ []));
    isDriver = input(false, ...(ngDevMode ? [{ debugName: "isDriver" }] : /* istanbul ignore next */ []));
    rejected = output();
    canceled = output();
    rejectForm = new FormGroup({
        reason: new FormControl('Scheduled on another simultaneous door installation', { nonNullable: true, validators: [Validators.required] }),
        details: new FormControl('', { nonNullable: true }),
        proposedSlot: new FormControl('Tomorrow morning at 10:00 AM', { nonNullable: true })
    });
    submitRejection() {
        if (!this.rejectForm.valid)
            return;
        this.rejected.emit(this.rejectForm.getRawValue());
    }
    static ɵfac = function RejectionModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RejectionModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RejectionModal, selectors: [["app-rejection-modal"]], inputs: { jobId: [1, "jobId"], roleTitle: [1, "roleTitle"], isDriver: [1, "isDriver"] }, outputs: { rejected: "rejected", canceled: "canceled" }, decls: 46, vars: 4, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/75", "backdrop-blur-xs", "overflow-y-auto"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-md", "w-full", "overflow-hidden", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "px-5", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-red-50/50", "dark:bg-red-950/30"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-xl", "bg-red-600", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", 3, "click"], [1, "!text-base"], [1, "p-5", "space-y-4", "text-xs", 3, "ngSubmit", "formGroup"], [1, "p-3", "bg-red-50", "dark:bg-red-950/40", "rounded-xl", "border", "border-red-200", "dark:border-red-900/60", "text-red-900", "dark:text-red-300", "space-y-1"], [1, "font-bold", "flex", "items-center", "gap-1", "text-[11px]"], [1, "!text-xs"], [1, "text-[11px]", "text-red-700", "dark:text-red-400"], ["for", "rejectReasonSelect", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "rejectReasonSelect", "formControlName", "reason", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-medium", "focus:ring-1", "focus:ring-red-500"], ["for", "rejectDetailsInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "rejectDetailsInput", "formControlName", "details", "rows", "2", "placeholder", "Provide context for Operations Manager...", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "proposedSlotInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "proposedSlotInput", "type", "text", "formControlName", "proposedSlot", "placeholder", "e.g. Tomorrow morning at 10:00 AM", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "justify-end", "gap-2.5", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800"], ["type", "button", 1, "px-4", "py-2", "border", "border-slate-200", "dark:border-slate-700", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "font-bold", "rounded-xl", 3, "click"], ["type", "submit", 1, "px-4", "py-2", "bg-red-600", "hover:bg-red-700", "text-white", "font-bold", "rounded-xl", "shadow-sm", "flex", "items-center", "gap-1", "active:scale-95"], ["value", "Vehicle mechanical inspection / flatbed maintenance required"], ["value", "Currently on another long-haul site run"], ["value", "Door weight/dimensions exceed current truck payload"], ["value", "Severe road access / bridge limitation to site address"], ["value", "Scheduled on another simultaneous door installation"], ["value", "Missing specialized biometric/smart lock mortising jig"], ["value", "Off-duty / Emergency personal leave"], ["value", "Transit distance exceeds current daily radius"]], template: function RejectionModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon", 5);
            i0.ɵɵtext(6, "cancel");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "h3", 6);
            i0.ɵɵtext(9, "Reject Assignment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function RejectionModal_Template_button_click_12_listener() { return ctx.canceled.emit(); });
            i0.ɵɵelementStart(13, "mat-icon", 9);
            i0.ɵɵtext(14, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "form", 10);
            i0.ɵɵlistener("ngSubmit", function RejectionModal_Template_form_ngSubmit_15_listener() { return ctx.submitRejection(); });
            i0.ɵɵelementStart(16, "div", 11)(17, "span", 12)(18, "mat-icon", 13);
            i0.ɵɵtext(19, "info");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21, "Operations Manager Alert");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "p", 14);
            i0.ɵɵtext(23, " Rejecting this assignment will notify the Operations Manager immediately with your reason and return the job to the queue for instant re-assignment. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div")(25, "label", 15);
            i0.ɵɵtext(26, "Primary Reason *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "select", 16);
            i0.ɵɵconditionalCreate(28, RejectionModal_Conditional_28_Template, 8, 0)(29, RejectionModal_Conditional_29_Template, 8, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div")(31, "label", 17);
            i0.ɵɵtext(32, "Additional Details / Explanation");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "textarea", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div")(35, "label", 19);
            i0.ɵɵtext(36, "Propose Alternate Time Slot (Optional)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 21)(39, "button", 22);
            i0.ɵɵlistener("click", function RejectionModal_Template_button_click_39_listener() { return ctx.canceled.emit(); });
            i0.ɵɵtext(40, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "button", 23)(42, "mat-icon", 13);
            i0.ɵɵtext(43, "send");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "span");
            i0.ɵɵtext(45, "Submit Rejection");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate2("Order ", ctx.jobId(), " \u00B7 ", ctx.roleTitle());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("formGroup", ctx.rejectForm);
            i0.ɵɵadvance(13);
            i0.ɵɵconditional(ctx.isDriver() ? 28 : 29);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RejectionModal, [{
        type: Component,
        args: [{
                selector: 'app-rejection-modal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule],
                template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-red-50/50 dark:bg-red-950/30">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm">cancel</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Reject Assignment</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ jobId() }} · {{ roleTitle() }}</p>
            </div>
          </div>
          <button 
            type="button" 
            (click)="canceled.emit()"
            class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <mat-icon class="!text-base">close</mat-icon>
          </button>
        </div>

        <!-- Form Body -->
        <form [formGroup]="rejectForm" (ngSubmit)="submitRejection()" class="p-5 space-y-4 text-xs">
          <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-300 space-y-1">
            <span class="font-bold flex items-center gap-1 text-[11px]">
              <mat-icon class="!text-xs">info</mat-icon>
              <span>Operations Manager Alert</span>
            </span>
            <p class="text-[11px] text-red-700 dark:text-red-400">
              Rejecting this assignment will notify the Operations Manager immediately with your reason and return the job to the queue for instant re-assignment.
            </p>
          </div>

          <div>
            <label for="rejectReasonSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Reason *</label>
            <select 
              id="rejectReasonSelect"
              formControlName="reason"
              class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-1 focus:ring-red-500"
            >
              @if (isDriver()) {
                <option value="Vehicle mechanical inspection / flatbed maintenance required">Vehicle mechanical inspection / maintenance</option>
                <option value="Currently on another long-haul site run">Currently on another site delivery run</option>
                <option value="Door weight/dimensions exceed current truck payload">Door dimensions exceed current truck payload</option>
                <option value="Severe road access / bridge limitation to site address">Severe road access limitation to site</option>
              } @else {
                <option value="Scheduled on another simultaneous door installation">Scheduled on another door installation</option>
                <option value="Missing specialized biometric/smart lock mortising jig">Missing smart lock mortising jig for this lock</option>
                <option value="Off-duty / Emergency personal leave">Off-duty / Personal leave</option>
                <option value="Transit distance exceeds current daily radius">Transit distance exceeds current daily radius</option>
              }
            </select>
          </div>

          <div>
            <label for="rejectDetailsInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Additional Details / Explanation</label>
            <textarea 
              id="rejectDetailsInput"
              formControlName="details"
              rows="2"
              class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Provide context for Operations Manager..."
            ></textarea>
          </div>

          <div>
            <label for="proposedSlotInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Propose Alternate Time Slot (Optional)</label>
            <input 
              id="proposedSlotInput"
              type="text" 
              formControlName="proposedSlot"
              class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. Tomorrow morning at 10:00 AM"
            />
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              (click)="canceled.emit()"
              class="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1 active:scale-95"
            >
              <mat-icon class="!text-xs">send</mat-icon>
              <span>Submit Rejection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
            }]
    }], null, { jobId: [{ type: i0.Input, args: [{ isSignal: true, alias: "jobId", required: true }] }], roleTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "roleTitle", required: false }] }], isDriver: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDriver", required: false }] }], rejected: [{ type: i0.Output, args: ["rejected"] }], canceled: [{ type: i0.Output, args: ["canceled"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RejectionModal, { className: "RejectionModal", filePath: "frontend/src/app/components/rejection-modal/rejection-modal.ts", lineNumber: 109 }); })();
