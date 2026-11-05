import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function AddUserModal_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "mat-icon", 49);
    i0.ɵɵtext(2, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage());
} }
function AddUserModal_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "Full name is required (min 2 chars).");
    i0.ɵɵelementEnd();
} }
function AddUserModal_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "A valid email address is required.");
    i0.ɵɵelementEnd();
} }
function AddUserModal_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, "Phone number is required.");
    i0.ɵɵelementEnd();
} }
function AddUserModal_For_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const customRole_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", customRole_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", customRole_r2.name, " (Custom Role)");
} }
function AddUserModal_Conditional_113_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 50);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Creating Account...");
    i0.ɵɵelementEnd();
} }
function AddUserModal_Conditional_114_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 51);
    i0.ɵɵtext(1, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Create User Account");
    i0.ɵɵelementEnd();
} }
export class AddUserModal {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    closed = output();
    userCreated = output();
    isSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    showPassword = signal(false, ...(ngDevMode ? [{ debugName: "showPassword" }] : /* istanbul ignore next */ []));
    customRoles = () => this.store.roles().filter(r => !r.isSystem);
    userForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('+233 24 555 01', [Validators.required, Validators.minLength(8)]),
        role: new FormControl('installer', [Validators.required]),
        status: new FormControl('active', [Validators.required]),
        password: new FormControl('DoorMaster2026!*', [Validators.required, Validators.minLength(6)])
    });
    generateRandomPassword() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
        let pass = 'DM-';
        for (let i = 0; i < 8; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.userForm.patchValue({ password: pass });
    }
    async handleSubmit() {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            this.alert.toastWarning('Incomplete User Information', 'Please fill in all required fields.');
            return;
        }
        const val = this.userForm.getRawValue();
        this.isSubmitting.set(true);
        this.errorMessage.set(null);
        const res = await this.store.addNewUser({
            name: val.name,
            email: val.email,
            role: val.role,
            phone: val.phone,
            password: val.password || 'DoorMaster2026!*',
            status: val.status || 'active'
        });
        this.isSubmitting.set(false);
        if (res.success) {
            this.alert.success('User Account Created', res.message || `Account for ${val.name} created successfully.`);
            this.userCreated.emit();
            this.closed.emit();
        }
        else {
            this.errorMessage.set(res.message);
            this.alert.error('Failed to Create User', res.message || 'Could not register user account.');
        }
    }
    static ɵfac = function AddUserModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddUserModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddUserModal, selectors: [["app-add-user-modal"]], outputs: { closed: "closed", userCreated: "userCreated" }, decls: 115, vars: 13, consts: [[1, "fixed", "inset-0", "z-50", "bg-slate-950/70", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-3", "sm:p-4", "overflow-y-auto", "animate-in", "fade-in", "duration-200"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "w-full", "max-w-lg", "overflow-hidden", "flex", "flex-col", "max-h-[90vh]", "my-auto", "animate-in", "zoom-in-95", "duration-150"], [1, "px-5", "py-4", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/50", "dark:bg-slate-900/50", "shrink-0"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "flex", "items-center", "justify-center", "border", "border-emerald-500/20"], [1, "!text-xl"], [1, "text-base", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], ["type", "button", 1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-lg"], [1, "flex", "flex-col", "flex-1", "min-h-0", "overflow-hidden", 3, "ngSubmit", "formGroup"], [1, "p-5", "space-y-4", "overflow-y-auto", "flex-1"], [1, "p-3", "rounded-xl", "bg-rose-50", "dark:bg-rose-950/50", "border", "border-rose-200", "dark:border-rose-900/50", "text-rose-700", "dark:text-rose-300", "text-xs", "flex", "items-center", "gap-2"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1.5"], [1, "text-rose-500"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "!text-lg", "!w-5", "!h-5"], ["type", "text", "formControlName", "name", "placeholder", "e.g. Samuel Darko (Senior Joiner)", 1, "w-full", "pl-10", "pr-3.5", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "placeholder:text-slate-400", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500"], [1, "text-[11px]", "text-rose-500", "mt-1"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], ["type", "email", "formControlName", "email", "placeholder", "s.darko@doormasterops.com", 1, "w-full", "pl-10", "pr-3", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "placeholder:text-slate-400", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500"], ["type", "tel", "formControlName", "phone", "placeholder", "+233 24 555 0199", 1, "w-full", "pl-10", "pr-3", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "placeholder:text-slate-400", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500"], ["formControlName", "role", 1, "w-full", "pl-10", "pr-8", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500", "cursor-pointer", "appearance-none"], ["value", "installer"], ["value", "manager"], ["value", "shop_manager"], ["value", "dispatcher"], ["value", "account_officer"], ["value", "client"], [3, "value"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "!text-lg", "pointer-events-none"], [1, "grid", "grid-cols-2", "gap-2"], [1, "flex", "items-center", "gap-2.5", "p-3", "rounded-xl", "border", "cursor-pointer", "transition-all"], ["type", "radio", "formControlName", "status", "value", "active", 1, "text-emerald-600", "focus:ring-emerald-500"], [1, "text-xs"], [1, "font-bold", "flex", "items-center", "gap-1"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "inline-block"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400"], ["type", "radio", "formControlName", "status", "value", "pending", 1, "text-amber-600", "focus:ring-amber-500"], [1, "w-2", "h-2", "rounded-full", "bg-amber-500", "inline-block"], [1, "flex", "items-center", "justify-between", "mb-1.5"], [1, "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300"], ["type", "button", 1, "text-[11px]", "font-semibold", "text-emerald-600", "dark:text-emerald-400", "hover:underline", 3, "click"], ["formControlName", "password", "placeholder", "DoorMaster2026!*", 1, "w-full", "pl-10", "pr-10", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "text-xs", "placeholder:text-slate-400", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500", "font-mono", 3, "type"], ["type", "button", 1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", 3, "click"], [1, "!text-base"], [1, "p-4", "bg-slate-50", "dark:bg-slate-900/80", "border-t", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "gap-3", "shrink-0"], ["type", "button", 1, "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-xs", "font-semibold", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], ["type", "submit", 1, "px-5", "py-2.5", "rounded-xl", "text-xs", "font-bold", "text-slate-950", "bg-emerald-500", "hover:bg-emerald-400", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "flex", "items-center", "gap-2", "shadow-md", "shadow-emerald-500/20", "active:scale-95", "cursor-pointer", 3, "disabled"], [1, "!text-base", "text-rose-500"], [1, "w-3.5", "h-3.5", "border-2", "border-slate-950", "border-t-transparent", "rounded-full", "animate-spin"], [1, "!text-sm", "!w-4", "!h-4"]], template: function AddUserModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon", 5);
            i0.ɵɵtext(6, "person_add");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "h2", 6);
            i0.ɵɵtext(9, "Add New User / Staff Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Create & provision authorized credentials into MySQL");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function AddUserModal_Template_button_click_12_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(13, "mat-icon", 9);
            i0.ɵɵtext(14, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "form", 10);
            i0.ɵɵlistener("ngSubmit", function AddUserModal_Template_form_ngSubmit_15_listener() { return ctx.handleSubmit(); });
            i0.ɵɵelementStart(16, "div", 11);
            i0.ɵɵconditionalCreate(17, AddUserModal_Conditional_17_Template, 5, 1, "div", 12);
            i0.ɵɵelementStart(18, "div")(19, "label", 13);
            i0.ɵɵtext(20, " Full Name ");
            i0.ɵɵelementStart(21, "span", 14);
            i0.ɵɵtext(22, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 15)(24, "mat-icon", 16);
            i0.ɵɵtext(25, "badge");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(26, "input", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(27, AddUserModal_Conditional_27_Template, 2, 0, "p", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 19)(29, "div")(30, "label", 13);
            i0.ɵɵtext(31, " Email Address ");
            i0.ɵɵelementStart(32, "span", 14);
            i0.ɵɵtext(33, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 15)(35, "mat-icon", 16);
            i0.ɵɵtext(36, "email");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(38, AddUserModal_Conditional_38_Template, 2, 0, "p", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div")(40, "label", 13);
            i0.ɵɵtext(41, " Phone Number ");
            i0.ɵɵelementStart(42, "span", 14);
            i0.ɵɵtext(43, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "div", 15)(45, "mat-icon", 16);
            i0.ɵɵtext(46, "phone");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(47, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(48, AddUserModal_Conditional_48_Template, 2, 0, "p", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "div")(50, "label", 13);
            i0.ɵɵtext(51, " Organizational Role ");
            i0.ɵɵelementStart(52, "span", 14);
            i0.ɵɵtext(53, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "div", 15)(55, "mat-icon", 16);
            i0.ɵɵtext(56, "admin_panel_settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "select", 22)(58, "option", 23);
            i0.ɵɵtext(59, "Field Technician / Installer (Site Clock-in & Checklists)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "option", 24);
            i0.ɵɵtext(61, "Operations Manager (Fleet Dispatch & Governance)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "option", 25);
            i0.ɵɵtext(63, "Shop Manager (Showroom Counter & Booking)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "option", 26);
            i0.ɵɵtext(65, "Logistics Dispatcher / Driver (Fleet Transport)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "option", 27);
            i0.ɵɵtext(67, "Finance & Account Officer (Auditing & Funds)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "option", 28);
            i0.ɵɵtext(69, "Client / Site Owner (Tracking & Verification)");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(70, AddUserModal_For_71_Template, 2, 2, "option", 29, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "mat-icon", 30);
            i0.ɵɵtext(73, "expand_more");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(74, "div")(75, "label", 13);
            i0.ɵɵtext(76, " Initial Account Status ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div", 31)(78, "label", 32);
            i0.ɵɵelement(79, "input", 33);
            i0.ɵɵelementStart(80, "div", 34)(81, "p", 35);
            i0.ɵɵelement(82, "span", 36);
            i0.ɵɵelementStart(83, "span");
            i0.ɵɵtext(84, "Active");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "p", 37);
            i0.ɵɵtext(86, "Can sign in immediately");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(87, "label", 32);
            i0.ɵɵelement(88, "input", 38);
            i0.ɵɵelementStart(89, "div", 34)(90, "p", 35);
            i0.ɵɵelement(91, "span", 39);
            i0.ɵɵelementStart(92, "span");
            i0.ɵɵtext(93, "Pending");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(94, "p", 37);
            i0.ɵɵtext(95, "Awaiting explicit activation");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(96, "div")(97, "div", 40)(98, "label", 41);
            i0.ɵɵtext(99, " Temporary Password / Passcode ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "button", 42);
            i0.ɵɵlistener("click", function AddUserModal_Template_button_click_100_listener() { return ctx.generateRandomPassword(); });
            i0.ɵɵtext(101, " Auto-generate ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(102, "div", 15)(103, "mat-icon", 16);
            i0.ɵɵtext(104, "lock");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(105, "input", 43);
            i0.ɵɵelementStart(106, "button", 44);
            i0.ɵɵlistener("click", function AddUserModal_Template_button_click_106_listener() { return ctx.showPassword.update(s => !s); });
            i0.ɵɵelementStart(107, "mat-icon", 45);
            i0.ɵɵtext(108);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(109, "div", 46)(110, "button", 47);
            i0.ɵɵlistener("click", function AddUserModal_Template_button_click_110_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(111, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "button", 48);
            i0.ɵɵconditionalCreate(113, AddUserModal_Conditional_113_Template, 3, 0)(114, AddUserModal_Conditional_114_Template, 4, 0);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            let tmp_4_0;
            let tmp_6_0;
            let tmp_7_0;
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("formGroup", ctx.userForm);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.errorMessage() ? 17 : -1);
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(((tmp_2_0 = ctx.userForm.get("name")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.userForm.get("name")) == null ? null : tmp_2_0.invalid) ? 27 : -1);
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(((tmp_3_0 = ctx.userForm.get("email")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.userForm.get("email")) == null ? null : tmp_3_0.invalid) ? 38 : -1);
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(((tmp_4_0 = ctx.userForm.get("phone")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx.userForm.get("phone")) == null ? null : tmp_4_0.invalid) ? 48 : -1);
            i0.ɵɵadvance(22);
            i0.ɵɵrepeater(ctx.customRoles());
            i0.ɵɵadvance(8);
            i0.ɵɵclassMap(((tmp_6_0 = ctx.userForm.get("status")) == null ? null : tmp_6_0.value) === "active" ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800");
            i0.ɵɵadvance(9);
            i0.ɵɵclassMap(((tmp_7_0 = ctx.userForm.get("status")) == null ? null : tmp_7_0.value) === "pending" ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800");
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("type", ctx.showPassword() ? "text" : "password");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.showPassword() ? "visibility_off" : "visibility");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.userForm.invalid || ctx.isSubmitting());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isSubmitting() ? 113 : 114);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatIconModule, i2.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddUserModal, [{
        type: Component,
        args: [{
                selector: 'app-add-user-modal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [CommonModule, ReactiveFormsModule, MatIconModule],
                template: `
    <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-150"
      >
        <!-- Modal Header -->
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <mat-icon class="!text-xl">person_add</mat-icon>
            </div>
            <div>
              <h2 class="text-base font-bold text-slate-900 dark:text-white">Add New User / Staff Account</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Create & provision authorized credentials into MySQL</p>
            </div>
          </div>

          <button 
            type="button" 
            (click)="closed.emit()" 
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <!-- Modal Form Body -->
        <form [formGroup]="userForm" (ngSubmit)="handleSubmit()" class="flex flex-col flex-1 min-h-0 overflow-hidden">
          
          <div class="p-5 space-y-4 overflow-y-auto flex-1">
            
            @if (errorMessage()) {
              <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <mat-icon class="!text-base text-rose-500">error</mat-icon>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <!-- Full Name -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">badge</mat-icon>
                <input 
                  type="text" 
                  formControlName="name"
                  placeholder="e.g. Samuel Darko (Senior Joiner)"
                  class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              @if (userForm.get('name')?.touched && userForm.get('name')?.invalid) {
                <p class="text-[11px] text-rose-500 mt-1">Full name is required (min 2 chars).</p>
              }
            </div>

            <!-- Email & Phone Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">email</mat-icon>
                  <input 
                    type="email" 
                    formControlName="email"
                    placeholder="s.darko@doormasterops.com"
                    class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                @if (userForm.get('email')?.touched && userForm.get('email')?.invalid) {
                  <p class="text-[11px] text-rose-500 mt-1">A valid email address is required.</p>
                }
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">phone</mat-icon>
                  <input 
                    type="tel" 
                    formControlName="phone"
                    placeholder="+233 24 555 0199"
                    class="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                @if (userForm.get('phone')?.touched && userForm.get('phone')?.invalid) {
                  <p class="text-[11px] text-rose-500 mt-1">Phone number is required.</p>
                }
              </div>
            </div>

            <!-- Role Selector -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Organizational Role <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">admin_panel_settings</mat-icon>
                <select 
                  formControlName="role"
                  class="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none"
                >
                  <option value="installer">Field Technician / Installer (Site Clock-in & Checklists)</option>
                  <option value="manager">Operations Manager (Fleet Dispatch & Governance)</option>
                  <option value="shop_manager">Shop Manager (Showroom Counter & Booking)</option>
                  <option value="dispatcher">Logistics Dispatcher / Driver (Fleet Transport)</option>
                  <option value="account_officer">Finance & Account Officer (Auditing & Funds)</option>
                  <option value="client">Client / Site Owner (Tracking & Verification)</option>
                  @for (customRole of customRoles(); track customRole.id) {
                    <option [value]="customRole.id">{{ customRole.name }} (Custom Role)</option>
                  }
                </select>
                <mat-icon class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg pointer-events-none">expand_more</mat-icon>
              </div>
            </div>

            <!-- Initial Account Status -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Initial Account Status
              </label>
              <div class="grid grid-cols-2 gap-2">
                <label 
                  class="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all"
                  [class]="userForm.get('status')?.value === 'active' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="active" class="text-emerald-600 focus:ring-emerald-500" />
                  <div class="text-xs">
                    <p class="font-bold flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>Active</span>
                    </p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">Can sign in immediately</p>
                  </div>
                </label>

                <label 
                  class="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all"
                  [class]="userForm.get('status')?.value === 'pending' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                >
                  <input type="radio" formControlName="status" value="pending" class="text-amber-600 focus:ring-amber-500" />
                  <div class="text-xs">
                    <p class="font-bold flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                      <span>Pending</span>
                    </p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">Awaiting explicit activation</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Temporary Password / Passcode
                </label>
                <button 
                  type="button" 
                  (click)="generateRandomPassword()"
                  class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Auto-generate
                </button>
              </div>
              <div class="relative">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg !w-5 !h-5">lock</mat-icon>
                <input 
                  [type]="showPassword() ? 'text' : 'password'" 
                  formControlName="password"
                  placeholder="DoorMaster2026!*"
                  class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <button 
                  type="button" 
                  (click)="showPassword.update(s => !s)"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <mat-icon class="!text-base">{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </div>
            </div>

          </div>

          <!-- Sticky Modal Footer -->
          <div class="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <button 
              type="button" 
              (click)="closed.emit()" 
              class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button 
              type="submit"
              [disabled]="userForm.invalid || isSubmitting()"
              class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              @if (isSubmitting()) {
                <span class="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Creating Account...</span>
              } @else {
                <mat-icon class="!text-sm !w-4 !h-4">check</mat-icon>
                <span>Create User Account</span>
              }
            </button>
          </div>

        </form>

      </div>
    </div>
  `
            }]
    }], null, { closed: [{ type: i0.Output, args: ["closed"] }], userCreated: [{ type: i0.Output, args: ["userCreated"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddUserModal, { className: "AddUserModal", filePath: "frontend/src/app/components/add-user-modal/add-user-modal.ts", lineNumber: 236 }); })();
