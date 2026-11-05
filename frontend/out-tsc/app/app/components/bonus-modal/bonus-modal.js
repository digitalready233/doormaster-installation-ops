import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function BonusModal_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1, " All completed installations currently have bonuses authorized and paid out. ");
    i0.ɵɵelementEnd();
} }
function BonusModal_Conditional_23_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 23)(2, "div", 24)(3, "span", 25);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 26);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 27);
    i0.ɵɵtext(8, " Technician: ");
    i0.ɵɵelementStart(9, "strong", 28);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, " \u00B7 Customer Rating: ");
    i0.ɵɵelementStart(12, "strong", 29);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 30)(16, "div", 31)(17, "span", 32);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 33);
    i0.ɵɵtext(20, "Eligible Bonus");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "button", 34);
    i0.ɵɵlistener("click", function BonusModal_Conditional_23_For_2_Template_button_click_21_listener() { const job_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.authorizeBonus(job_r2)); });
    i0.ɵɵelementStart(22, "mat-icon", 35);
    i0.ɵɵtext(23, "verified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Authorize");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const job_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u00B7 ", job_r2.doorModel);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(job_r2.assignedInstallerName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", (job_r2.customerSignoff == null ? null : job_r2.customerSignoff.rating) || 5, ".0 \u2605");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 On-site: ", job_r2.actualHours || 3, " hrs ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" +$", job_r2.financials.bonusAmount, " ");
} }
function BonusModal_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵrepeaterCreate(1, BonusModal_Conditional_23_For_2_Template, 26, 6, "div", 22, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.pendingJobs());
} }
function BonusModal_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 36)(2, "span", 37);
    i0.ɵɵtext(3, "Standard Door Base");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 38);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 39);
    i0.ɵɵtext(7, "Pass initial QA inspection");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 36)(9, "span", 37);
    i0.ɵɵtext(10, "Architectural / Pivot");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 38);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 39);
    i0.ɵɵtext(14, "Heavy doors, Bi-folds & Pivots");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 36)(16, "span", 37);
    i0.ɵɵtext(17, "5-Star Customer Boost");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 40);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 39);
    i0.ɵɵtext(22, "Multiplies base on 5\u2605 review");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 36)(24, "span", 37);
    i0.ɵɵtext(25, "On-Time & Photo Bonus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 38);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p", 39);
    i0.ɵɵtext(29, "Punctual clock out & clear photos");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("$", ctx_r2.store.bonusRules().baseBonusStandardDoor);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("$", ctx_r2.store.bonusRules().baseBonusArchitecturalDoor);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("+", i0.ɵɵpipeBind2(20, 4, (ctx_r2.store.bonusRules().ratingBonusMultiplier - 1) * 100, "1.0-0"), "%");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("+$", ctx_r2.store.bonusRules().onTimeBonusAmount + ctx_r2.store.bonusRules().cleanPhotoBonusAmount);
} }
function BonusModal_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 41);
    i0.ɵɵlistener("ngSubmit", function BonusModal_Conditional_34_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.saveConfig()); });
    i0.ɵɵelementStart(1, "div", 42)(2, "div")(3, "label", 43);
    i0.ɵɵtext(4, "Standard Door Base ($)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "input", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "label", 45);
    i0.ɵɵtext(8, "Architectural Pivot Base ($)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "input", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div")(11, "label", 47);
    i0.ɵɵtext(12, "On-Time Bonus ($)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div")(15, "label", 49);
    i0.ɵɵtext(16, "Clean Photo Bonus ($)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 51)(19, "button", 52);
    i0.ɵɵlistener("click", function BonusModal_Conditional_34_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.isEditingConfig.set(false)); });
    i0.ɵɵtext(20, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 53);
    i0.ɵɵtext(22, "Save Thresholds");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.configForm);
} }
export class BonusModal {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    closed = output();
    isEditingConfig = signal(false, ...(ngDevMode ? [{ debugName: "isEditingConfig" }] : /* istanbul ignore next */ []));
    configForm = new FormGroup({
        baseStandard: new FormControl(95, [Validators.required]),
        baseArchitectural: new FormControl(160, [Validators.required]),
        onTimeAmount: new FormControl(40, [Validators.required]),
        photoAmount: new FormControl(25, [Validators.required])
    });
    pendingJobs = () => {
        return this.store.jobs().filter(j => j.financials.bonusStatus === 'pending');
    };
    toggleEditConfig() {
        this.isEditingConfig.update(v => !v);
        if (this.isEditingConfig()) {
            const r = this.store.bonusRules();
            this.configForm.patchValue({
                baseStandard: r.baseBonusStandardDoor,
                baseArchitectural: r.baseBonusArchitecturalDoor,
                onTimeAmount: r.onTimeBonusAmount,
                photoAmount: r.cleanPhotoBonusAmount
            });
        }
    }
    saveConfig() {
        if (this.configForm.invalid)
            return;
        const v = this.configForm.value;
        this.store.bonusRules.set({
            baseBonusStandardDoor: Number(v.baseStandard) || 95,
            baseBonusArchitecturalDoor: Number(v.baseArchitectural) || 160,
            ratingBonusMultiplier: 1.25,
            onTimeBonusAmount: Number(v.onTimeAmount) || 40,
            cleanPhotoBonusAmount: Number(v.photoAmount) || 25
        });
        this.isEditingConfig.set(false);
        this.alert.toastSuccess('Matrix Updated', 'Management incentive thresholds saved.');
    }
    authorizeBonus(job) {
        this.store.approveBonus(job.id, 'Management Committee');
        this.alert.toastSuccess('Bonus Authorized', `Disbursed $${job.financials.bonusAmount} performance bonus to ${job.assignedInstallerName || 'Technician'}.`);
    }
    static ɵfac = function BonusModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BonusModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BonusModal, selectors: [["app-bonus-modal"]], outputs: { closed: "closed" }, decls: 40, vars: 4, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/60", "backdrop-blur-xs", "animate-in", "fade-in", "duration-200"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-2xl", "w-full", "overflow-hidden", "flex", "flex-col", "max-h-[90vh]", "text-slate-900", "dark:text-slate-100"], [1, "px-6", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-950/70"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-lg", "bg-emerald-600", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm", "!w-4", "!h-4"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", "p-1", "rounded", 3, "click"], [1, "!text-lg"], [1, "p-6", "overflow-y-auto", "space-y-6"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "uppercase", "tracking-wider"], [1, "text-xs", "text-emerald-700", "dark:text-emerald-400", "font-semibold", "bg-emerald-50", "dark:bg-emerald-950/60", "px-2", "py-0.5", "rounded", "border", "border-emerald-200", "dark:border-emerald-800"], [1, "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "p-4", "text-center", "bg-slate-50", "dark:bg-slate-800/60", "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "space-y-2"], [1, "pt-4", "border-t", "border-slate-100", "dark:border-slate-800"], ["type", "button", 1, "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "underline", 3, "click"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "gap-3"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "space-y-3", 3, "formGroup"], [1, "p-4", "bg-slate-50", "dark:bg-slate-950/80", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "px-4", "py-2", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "text-white", "dark:text-slate-950", "rounded-xl", "font-bold", 3, "click"], [1, "p-3.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-800/80", "hover:border-slate-300", "dark:hover:border-slate-700", "transition-colors", "flex", "items-center", "justify-between", "gap-4"], [1, "space-y-1"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-600", "dark:text-slate-300"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400"], [1, "text-slate-700", "dark:text-slate-200"], [1, "text-amber-600", "dark:text-amber-400"], [1, "flex", "items-center", "gap-3"], [1, "text-right"], [1, "text-sm", "font-bold", "text-emerald-700", "dark:text-emerald-400", "font-mono", "tabular-nums"], [1, "block", "text-[10px]", "text-slate-400", "dark:text-slate-500", "uppercase"], ["type", "button", 1, "px-3.5", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-emerald-600", "hover:bg-emerald-700", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1", "shadow-xs", "cursor-pointer", 3, "click"], [1, "!text-xs", "!w-3.5", "!h-3.5"], [1, "p-3", "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "border", "border-slate-200/80", "dark:border-slate-800"], [1, "text-[10px]", "uppercase", "font-semibold", "text-slate-400", "dark:text-slate-500", "block", "mb-1"], [1, "text-lg", "font-bold", "font-mono", "text-slate-900", "dark:text-white", "tabular-nums"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "text-lg", "font-bold", "font-mono", "text-emerald-700", "dark:text-emerald-400", "tabular-nums"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "space-y-3", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-2", "gap-3"], ["for", "baseStandardInput", 1, "block", "text-[11px]", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "baseStandardInput", "type", "number", "formControlName", "baseStandard", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-300", "dark:border-slate-700", "rounded", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "baseArchitecturalInput", 1, "block", "text-[11px]", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "baseArchitecturalInput", "type", "number", "formControlName", "baseArchitectural", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-300", "dark:border-slate-700", "rounded", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "onTimeAmountInput", 1, "block", "text-[11px]", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "onTimeAmountInput", "type", "number", "formControlName", "onTimeAmount", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-300", "dark:border-slate-700", "rounded", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "photoAmountInput", 1, "block", "text-[11px]", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "photoAmountInput", "type", "number", "formControlName", "photoAmount", 1, "w-full", "text-xs", "px-3", "py-1.5", "border", "border-slate-300", "dark:border-slate-700", "rounded", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "flex", "justify-end", "gap-2", "pt-2"], ["type", "button", 1, "px-3", "py-1.5", "text-xs", "text-slate-600", "dark:text-slate-400", "hover:text-slate-900", "dark:hover:text-white", 3, "click"], ["type", "submit", 1, "px-4", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "rounded-lg"]], template: function BonusModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon", 5);
            i0.ɵɵtext(6, "military_tech");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "h3", 6);
            i0.ɵɵtext(9, "Management Bonus Policy & Authorization");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Configure incentive rules & approve technician disbursements");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function BonusModal_Template_button_click_12_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(13, "mat-icon", 9);
            i0.ɵɵtext(14, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "div", 10)(16, "div")(17, "div", 11)(18, "h4", 12);
            i0.ɵɵtext(19, "Jobs Pending Management Bonus Approval");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 13);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(22, BonusModal_Conditional_22_Template, 2, 0, "div", 14)(23, BonusModal_Conditional_23_Template, 3, 0, "div", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 16)(25, "div", 11)(26, "div")(27, "h4", 12);
            i0.ɵɵtext(28, "Agreed Management Incentive Matrix");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "p", 7);
            i0.ɵɵtext(30, "Formula parameters applied to calculate installer performance payout");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "button", 17);
            i0.ɵɵlistener("click", function BonusModal_Template_button_click_31_listener() { return ctx.toggleEditConfig(); });
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(33, BonusModal_Conditional_33_Template, 30, 7, "div", 18)(34, BonusModal_Conditional_34_Template, 23, 1, "form", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 20)(36, "span");
            i0.ɵɵtext(37, "Bonus rules approved by DoorMaster Executive & Accounts Officers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 21);
            i0.ɵɵlistener("click", function BonusModal_Template_button_click_38_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(39, " Done ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(21);
            i0.ɵɵtextInterpolate1(" ", ctx.pendingJobs().length, " Pending Release ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.pendingJobs().length === 0 ? 22 : 23);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.isEditingConfig() ? "Cancel" : "Edit Thresholds", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isEditingConfig() ? 33 : 34);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DecimalPipe], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BonusModal, [{
        type: Component,
        args: [{
                selector: 'app-bonus-modal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule, DecimalPipe],
                template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-slate-100">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm !w-4 !h-4">military_tech</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Management Bonus Policy & Authorization</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Configure incentive rules & approve technician disbursements</p>
            </div>
          </div>
          <button (click)="closed.emit()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded">
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <div class="p-6 overflow-y-auto space-y-6">
          <!-- Pending Bonus Approvals Section -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Jobs Pending Management Bonus Approval</h4>
              <span class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {{ pendingJobs().length }} Pending Release
              </span>
            </div>

            @if (pendingJobs().length === 0) {
              <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
                All completed installations currently have bonuses authorized and paid out.
              </div>
            } @else {
              <div class="space-y-2">
                @for (job of pendingJobs(); track job.id) {
                  <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-between gap-4">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-slate-900 dark:text-white">{{ job.id }}</span>
                        <span class="text-xs text-slate-600 dark:text-slate-300">· {{ job.doorModel }}</span>
                      </div>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400">
                        Technician: <strong class="text-slate-700 dark:text-slate-200">{{ job.assignedInstallerName }}</strong> · Customer Rating: 
                        <strong class="text-amber-600 dark:text-amber-400">{{ job.customerSignoff?.rating || 5 }}.0 ★</strong> · On-site: {{ job.actualHours || 3 }} hrs
                      </p>
                    </div>

                    <div class="flex items-center gap-3">
                      <div class="text-right">
                        <span class="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                          +&#36;{{ job.financials.bonusAmount }}
                        </span>
                        <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase">Eligible Bonus</span>
                      </div>

                      <button 
                        type="button"
                        (click)="authorizeBonus(job)"
                        class="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5">verified</mat-icon>
                        <span>Authorize</span>
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Formula Configuration -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Agreed Management Incentive Matrix</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Formula parameters applied to calculate installer performance payout</p>
              </div>
              <button 
                type="button" 
                (click)="toggleEditConfig()"
                class="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline"
              >
                {{ isEditingConfig() ? 'Cancel' : 'Edit Thresholds' }}
              </button>
            </div>

            @if (!isEditingConfig()) {
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Standard Door Base</span>
                  <span class="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">&#36;{{ store.bonusRules().baseBonusStandardDoor }}</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Pass initial QA inspection</p>
                </div>

                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">Architectural / Pivot</span>
                  <span class="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">&#36;{{ store.bonusRules().baseBonusArchitecturalDoor }}</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Heavy doors, Bi-folds & Pivots</p>
                </div>

                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">5-Star Customer Boost</span>
                  <span class="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">+{{ (store.bonusRules().ratingBonusMultiplier - 1) * 100 | number:'1.0-0' }}%</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Multiplies base on 5★ review</p>
                </div>

                <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <span class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-1">On-Time & Photo Bonus</span>
                  <span class="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">+&#36;{{ store.bonusRules().onTimeBonusAmount + store.bonusRules().cleanPhotoBonusAmount }}</span>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Punctual clock out & clear photos</p>
                </div>
              </div>
            } @else {
              <form [formGroup]="configForm" (ngSubmit)="saveConfig()" class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="baseStandardInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Door Base ($)</label>
                    <input id="baseStandardInput" type="number" formControlName="baseStandard" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label for="baseArchitecturalInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Architectural Pivot Base ($)</label>
                    <input id="baseArchitecturalInput" type="number" formControlName="baseArchitectural" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label for="onTimeAmountInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">On-Time Bonus ($)</label>
                    <input id="onTimeAmountInput" type="number" formControlName="onTimeAmount" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label for="photoAmountInput" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Clean Photo Bonus ($)</label>
                    <input id="photoAmountInput" type="number" formControlName="photoAmount" class="w-full text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                  </div>
                </div>

                <div class="flex justify-end gap-2 pt-2">
                  <button type="button" (click)="isEditingConfig.set(false)" class="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Cancel</button>
                  <button type="submit" class="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-lg">Save Thresholds</button>
                </div>
              </form>
            }
          </div>
        </div>

        <div class="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Bonus rules approved by DoorMaster Executive & Accounts Officers</span>
          <button (click)="closed.emit()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-bold">
            Done
          </button>
        </div>
      </div>
    </div>
  `
            }]
    }], null, { closed: [{ type: i0.Output, args: ["closed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BonusModal, { className: "BonusModal", filePath: "frontend/src/app/components/bonus-modal/bonus-modal.ts", lineNumber: 166 }); })();
