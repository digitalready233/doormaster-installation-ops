import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InstallationStore } from '../../services/installation.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
export class CustomRoleModal {
    store = inject(InstallationStore);
    closed = output();
    roleForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        label: new FormControl('', [Validators.required, Validators.minLength(2)]),
        color: new FormControl('violet'),
        description: new FormControl('', [Validators.required]),
        canCreateJobs: new FormControl(false),
        canAssignInstallers: new FormControl(false),
        canDispatchDoors: new FormControl(false),
        canClockInOut: new FormControl(false),
        canUploadPhotos: new FormControl(true),
        canSignVerification: new FormControl(false),
        canApproveBonuses: new FormControl(false),
        canViewFinancials: new FormControl(false)
    });
    handleCreateRole() {
        if (this.roleForm.invalid)
            return;
        const v = this.roleForm.value;
        const roleId = `role_${Date.now()}`;
        this.store.addCustomRole({
            id: roleId,
            name: v.name || 'New Role',
            label: v.label || 'Role',
            description: v.description || '',
            color: v.color || 'violet',
            icon: 'verified_user',
            permissions: {
                canCreateJobs: !!v.canCreateJobs,
                canAssignInstallers: !!v.canAssignInstallers,
                canDispatchDoors: !!v.canDispatchDoors,
                canClockInOut: !!v.canClockInOut,
                canUploadPhotos: !!v.canUploadPhotos,
                canSignVerification: !!v.canSignVerification,
                canApproveBonuses: !!v.canApproveBonuses,
                canViewFinancials: !!v.canViewFinancials,
                canManageRoles: false
            }
        });
        this.closed.emit();
    }
    static ɵfac = function CustomRoleModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomRoleModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomRoleModal, selectors: [["app-custom-role-modal"]], outputs: { closed: "closed" }, decls: 84, vars: 2, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/60", "backdrop-blur-xs", "animate-in", "fade-in", "duration-200"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-xl", "w-full", "overflow-hidden", "flex", "flex-col", "text-slate-900", "dark:text-slate-100"], [1, "px-6", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/70", "dark:bg-slate-950/70"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-lg", "bg-indigo-600", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm", "!w-4", "!h-4"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "text-slate-400", "hover:text-slate-700", "dark:hover:text-white", "p-1", "rounded", 3, "click"], [1, "!text-lg"], [1, "p-6", "space-y-5", "overflow-y-auto", "max-h-[80vh]", 3, "ngSubmit", "formGroup"], ["for", "roleNameInput", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider", "mb-1.5"], ["id", "roleNameInput", "type", "text", "formControlName", "name", "placeholder", "e.g. Quality Assurance Inspector, Subcontractor Lead...", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "grid", "grid-cols-2", "gap-4"], ["for", "roleLabelInput", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider", "mb-1.5"], ["id", "roleLabelInput", "type", "text", "formControlName", "label", "placeholder", "e.g. QA Inspector", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["for", "roleColorSelect", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider", "mb-1.5"], ["id", "roleColorSelect", "formControlName", "color", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["value", "violet"], ["value", "sky"], ["value", "amber"], ["value", "emerald"], ["value", "rose"], ["for", "roleDescInput", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider", "mb-1.5"], ["id", "roleDescInput", "formControlName", "description", "rows", "2", "placeholder", "Conducts pre-delivery frame checks and architectural tolerance compliance audits...", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "dark:focus:ring-slate-200", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "uppercase", "tracking-wider", "mb-2"], [1, "space-y-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "p-3.5", "bg-slate-50/50", "dark:bg-slate-800/50"], [1, "flex", "items-center", "gap-2.5", "text-xs", "text-slate-800", "dark:text-slate-200", "cursor-pointer"], ["type", "checkbox", "formControlName", "canCreateJobs", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canAssignInstallers", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canDispatchDoors", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canClockInOut", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canUploadPhotos", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canSignVerification", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canApproveBonuses", 1, "rounded", "text-slate-900", "focus:ring-0"], ["type", "checkbox", "formControlName", "canViewFinancials", 1, "rounded", "text-slate-900", "focus:ring-0"], [1, "flex", "items-center", "justify-end", "gap-2", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-semibold", "text-slate-600", "dark:text-slate-400", "hover:text-slate-900", "dark:hover:text-white", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "dark:bg-white", "dark:hover:bg-slate-100", "dark:text-slate-950", "disabled:opacity-50", "rounded-xl", "shadow-sm", "transition-all", 3, "disabled"]], template: function CustomRoleModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon", 5);
            i0.ɵɵtext(6, "badge");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "h3", 6);
            i0.ɵɵtext(9, "Define New Operational Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Add future organizational positions with granular permission matrix");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function CustomRoleModal_Template_button_click_12_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(13, "mat-icon", 9);
            i0.ɵɵtext(14, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "form", 10);
            i0.ɵɵlistener("ngSubmit", function CustomRoleModal_Template_form_ngSubmit_15_listener() { return ctx.handleCreateRole(); });
            i0.ɵɵelementStart(16, "div")(17, "label", 11);
            i0.ɵɵtext(18, "Role Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 13)(21, "div")(22, "label", 14);
            i0.ɵɵtext(23, "Short Label");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(24, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div")(26, "label", 16);
            i0.ɵɵtext(27, "Badge Color");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 17)(29, "option", 18);
            i0.ɵɵtext(30, "Violet Accent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "option", 19);
            i0.ɵɵtext(32, "Sky Blue Accent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "option", 20);
            i0.ɵɵtext(34, "Amber Accent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "option", 21);
            i0.ɵɵtext(36, "Emerald Accent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "option", 22);
            i0.ɵɵtext(38, "Rose Accent");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(39, "div")(40, "label", 23);
            i0.ɵɵtext(41, "Responsibilities & Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(42, "textarea", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div")(44, "span", 25);
            i0.ɵɵtext(45, "Granular Role Permissions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 26)(47, "label", 27);
            i0.ɵɵelement(48, "input", 28);
            i0.ɵɵelementStart(49, "span");
            i0.ɵɵtext(50, "Can create & schedule door installation jobs");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "label", 27);
            i0.ɵɵelement(52, "input", 29);
            i0.ɵɵelementStart(53, "span");
            i0.ɵɵtext(54, "Can assign field technicians & installers");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "label", 27);
            i0.ɵɵelement(56, "input", 30);
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58, "Can dispatch doors & hardware sets from workshop");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "label", 27);
            i0.ɵɵelement(60, "input", 31);
            i0.ɵɵelementStart(61, "span");
            i0.ɵɵtext(62, "Can clock in & clock out on installation sites");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "label", 27);
            i0.ɵɵelement(64, "input", 32);
            i0.ɵɵelementStart(65, "span");
            i0.ɵɵtext(66, "Can upload quality & proof-of-work photos");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "label", 27);
            i0.ɵɵelement(68, "input", 33);
            i0.ɵɵelementStart(69, "span");
            i0.ɵɵtext(70, "Can sign off customer completion certificates");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(71, "label", 27);
            i0.ɵɵelement(72, "input", 34);
            i0.ɵɵelementStart(73, "span");
            i0.ɵɵtext(74, "Can authorize installer performance bonuses");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "label", 27);
            i0.ɵɵelement(76, "input", 35);
            i0.ɵɵelementStart(77, "span");
            i0.ɵɵtext(78, "Can view financial ledger, door pricing & margins");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(79, "div", 36)(80, "button", 37);
            i0.ɵɵlistener("click", function CustomRoleModal_Template_button_click_80_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(81, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "button", 38);
            i0.ɵɵtext(83, " Save New Role to System ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("formGroup", ctx.roleForm);
            i0.ɵɵadvance(67);
            i0.ɵɵproperty("disabled", ctx.roleForm.invalid);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomRoleModal, [{
        type: Component,
        args: [{
                selector: 'app-custom-role-modal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule],
                template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col text-slate-900 dark:text-slate-100">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm !w-4 !h-4">badge</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Define New Operational Role</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Add future organizational positions with granular permission matrix</p>
            </div>
          </div>
          <button (click)="closed.emit()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded">
            <mat-icon class="!text-lg">close</mat-icon>
          </button>
        </div>

        <form [formGroup]="roleForm" (ngSubmit)="handleCreateRole()" class="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          <div>
            <label for="roleNameInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Role Title</label>
            <input 
              id="roleNameInput"
              type="text" 
              formControlName="name"
              placeholder="e.g. Quality Assurance Inspector, Subcontractor Lead..." 
              class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="roleLabelInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Short Label</label>
              <input 
                id="roleLabelInput"
                type="text" 
                formControlName="label"
                placeholder="e.g. QA Inspector" 
                class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label for="roleColorSelect" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Badge Color</label>
              <select 
                id="roleColorSelect"
                formControlName="color"
                class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="violet">Violet Accent</option>
                <option value="sky">Sky Blue Accent</option>
                <option value="amber">Amber Accent</option>
                <option value="emerald">Emerald Accent</option>
                <option value="rose">Rose Accent</option>
              </select>
            </div>
          </div>

          <div>
            <label for="roleDescInput" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Responsibilities & Description</label>
            <textarea 
              id="roleDescInput"
              formControlName="description"
              rows="2"
              placeholder="Conducts pre-delivery frame checks and architectural tolerance compliance audits..." 
              class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          <!-- Permission Matrix -->
          <div>
            <span class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Granular Role Permissions</span>
            <div class="space-y-2 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 bg-slate-50/50 dark:bg-slate-800/50">
              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canCreateJobs" class="rounded text-slate-900 focus:ring-0" />
                <span>Can create & schedule door installation jobs</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canAssignInstallers" class="rounded text-slate-900 focus:ring-0" />
                <span>Can assign field technicians & installers</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canDispatchDoors" class="rounded text-slate-900 focus:ring-0" />
                <span>Can dispatch doors & hardware sets from workshop</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canClockInOut" class="rounded text-slate-900 focus:ring-0" />
                <span>Can clock in & clock out on installation sites</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canUploadPhotos" class="rounded text-slate-900 focus:ring-0" />
                <span>Can upload quality & proof-of-work photos</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canSignVerification" class="rounded text-slate-900 focus:ring-0" />
                <span>Can sign off customer completion certificates</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canApproveBonuses" class="rounded text-slate-900 focus:ring-0" />
                <span>Can authorize installer performance bonuses</span>
              </label>

              <label class="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                <input type="checkbox" formControlName="canViewFinancials" class="rounded text-slate-900 focus:ring-0" />
                <span>Can view financial ledger, door pricing & margins</span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              (click)="closed.emit()"
              class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="roleForm.invalid"
              class="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 disabled:opacity-50 rounded-xl shadow-sm transition-all"
            >
              Save New Role to System
            </button>
          </div>
        </form>
      </div>
    </div>
  `
            }]
    }], null, { closed: [{ type: i0.Output, args: ["closed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomRoleModal, { className: "CustomRoleModal", filePath: "frontend/src/app/components/custom-role-modal/custom-role-modal.ts", lineNumber: 146 }); })();
