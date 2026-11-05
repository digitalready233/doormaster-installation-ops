import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function ProfileSmsSettingsModal_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 16);
    i0.ɵɵlistener("ngSubmit", function ProfileSmsSettingsModal_Conditional_32_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.savePhones()); });
    i0.ɵɵelementStart(1, "div", 17)(2, "span", 18)(3, "mat-icon", 12);
    i0.ɵɵtext(4, "notifications_active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Real-time SMS Routing");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 19);
    i0.ɵɵtext(8, " Each role must have a verified mobile number to receive step-by-step SMS updates during door fabrication, truck departure, and lock installation. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 20)(10, "div")(11, "label", 21);
    i0.ɵɵtext(12, " Shop Attendant / Manager Phone * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 22);
    i0.ɵɵelementStart(14, "span", 23);
    i0.ɵɵtext(15, "Receives booking confirmations & approval SMS");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div")(17, "label", 24);
    i0.ɵɵtext(18, " Operations Manager Phone * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 25);
    i0.ɵɵelementStart(20, "span", 23);
    i0.ɵɵtext(21, "Receives driver/installer responses & site alerts");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "label", 26);
    i0.ɵɵtext(24, " Dispatch Driver (Logistics Flatbed) * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 27);
    i0.ɵɵelementStart(26, "span", 23);
    i0.ɵɵtext(27, "Receives delivery assignments & pickup notices");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div")(29, "label", 28);
    i0.ɵɵtext(30, " Field Installer / Locksmith * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "input", 29);
    i0.ɵɵelementStart(32, "span", 23);
    i0.ɵɵtext(33, "Receives smart lock installation assignments");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div")(35, "label", 30);
    i0.ɵɵtext(36, " Client / Site Owner Phone * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "input", 31);
    i0.ɵɵelementStart(38, "span", 23);
    i0.ɵɵtext(39, "Receives live delivery approach & ETA links");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div")(41, "label", 32);
    i0.ɵɵtext(42, " Account Officer Phone ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(43, "input", 33);
    i0.ɵɵelementStart(44, "span", 23);
    i0.ɵɵtext(45, "Receives counter payment notifications");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 34)(47, "button", 35)(48, "mat-icon", 5);
    i0.ɵɵtext(49, "save");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51, "Save Phone Directory");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.phonesForm);
} }
function ProfileSmsSettingsModal_Conditional_33_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47)(1, "div")(2, "label", 54);
    i0.ɵɵtext(3, "Hubtel Client ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "label", 56);
    i0.ɵɵtext(7, "Hubtel Client Secret");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 57);
    i0.ɵɵelementEnd()();
} }
function ProfileSmsSettingsModal_Conditional_33_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47)(1, "div")(2, "label", 58);
    i0.ɵɵtext(3, "Twilio Account SID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "label", 60);
    i0.ɵɵtext(7, "Twilio Auth Token");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 61);
    i0.ɵɵelementEnd()();
} }
function ProfileSmsSettingsModal_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 16);
    i0.ɵɵlistener("ngSubmit", function ProfileSmsSettingsModal_Conditional_33_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveGateway()); });
    i0.ɵɵelementStart(1, "div")(2, "label", 36);
    i0.ɵɵtext(3, "Select Active SMS Gateway Provider *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 37)(5, "option", 38);
    i0.ɵɵtext(6, "Built-in Interactive Ghana Telco SMS Simulator (Recommended for Testing)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "option", 39);
    i0.ɵɵtext(8, "Arkesel SMS Gateway (Ghana / Africa Telco Direct)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "option", 40);
    i0.ɵɵtext(10, "Hubtel Programmable SMS Gateway (Ghana Direct)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "option", 41);
    i0.ɵɵtext(12, "Twilio Global Programmable SMS");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 42)(14, "div")(15, "label", 43);
    i0.ɵɵtext(16, "Sender ID / Brand Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 44);
    i0.ɵɵelementStart(18, "span", 23);
    i0.ɵɵtext(19, "Max 11 alphanumeric characters approved by telcos");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div")(21, "label", 45);
    i0.ɵɵtext(22, "API Key / Token");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(24, ProfileSmsSettingsModal_Conditional_33_Conditional_24_Template, 9, 0, "div", 47);
    i0.ɵɵconditionalCreate(25, ProfileSmsSettingsModal_Conditional_33_Conditional_25_Template, 9, 0, "div", 47);
    i0.ɵɵelementStart(26, "div", 48);
    i0.ɵɵelement(27, "input", 49);
    i0.ɵɵelementStart(28, "label", 50);
    i0.ɵɵtext(29, " Enable In-App Telco Simulator (renders live incoming SMS handset drawer in UI) ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 51)(31, "button", 52);
    i0.ɵɵlistener("click", function ProfileSmsSettingsModal_Conditional_33_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sendTestSms()); });
    i0.ɵɵelementStart(32, "mat-icon", 53);
    i0.ɵɵtext(33, "send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Send Test SMS Ping");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "button", 35)(37, "mat-icon", 5);
    i0.ɵɵtext(38, "save");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Save Gateway Settings");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.gatewayForm);
    i0.ɵɵadvance(24);
    i0.ɵɵconditional(((tmp_2_0 = ctx_r1.gatewayForm.get("provider")) == null ? null : tmp_2_0.value) === "hubtel" ? 24 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_3_0 = ctx_r1.gatewayForm.get("provider")) == null ? null : tmp_3_0.value) === "twilio" ? 25 : -1);
} }
function ProfileSmsSettingsModal_Conditional_34_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "mat-icon", 68);
    i0.ɵɵtext(2, "sms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 69);
    i0.ɵɵtext(4, "No SMS messages sent yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 70);
    i0.ɵɵtext(6, "Booking an installation or assigning a driver will trigger live SMS messages.");
    i0.ɵɵelementEnd()();
} }
function ProfileSmsSettingsModal_Conditional_34_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67)(1, "div", 71)(2, "div", 72)(3, "span", 73);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 74);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 74);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "slice");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 75);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 76)(13, "span");
    i0.ɵɵtext(14, "Event: ");
    i0.ɵɵelementStart(15, "strong", 77);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "span", 78)(18, "mat-icon", 12);
    i0.ɵɵtext(19, "done_all");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Delivered");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const sms_r4 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate3(" [", sms_r4.senderId, "] \u2192 ", sms_r4.recipientName, " (", sms_r4.recipientRole, ") ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(sms_r4.recipientPhone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(9, 7, sms_r4.timestamp, 11, 19));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", sms_r4.messageText, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(sms_r4.triggerEvent);
} }
function ProfileSmsSettingsModal_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 62)(2, "span", 63);
    i0.ɵɵtext(3, "Recent Dispatched SMS History");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 64);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(6, ProfileSmsSettingsModal_Conditional_34_Conditional_6_Template, 7, 0, "div", 65);
    i0.ɵɵelementStart(7, "div", 66);
    i0.ɵɵrepeaterCreate(8, ProfileSmsSettingsModal_Conditional_34_For_9_Template, 22, 11, "div", 67, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.store.smsLogs().length, " messages sent");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.store.smsLogs().length === 0 ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.store.smsLogs());
} }
export class ProfileSmsSettingsModal {
    store = inject(InstallationStore);
    closed = output();
    activeTab = signal('phones', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    phonesForm = new FormGroup({
        manager: new FormControl(this.store.userPhones().manager, { nonNullable: true, validators: [Validators.required] }),
        shop_manager: new FormControl(this.store.userPhones().shop_manager, { nonNullable: true, validators: [Validators.required] }),
        dispatcher: new FormControl(this.store.userPhones().dispatcher, { nonNullable: true, validators: [Validators.required] }),
        installer: new FormControl(this.store.userPhones().installer, { nonNullable: true, validators: [Validators.required] }),
        client: new FormControl(this.store.userPhones().client, { nonNullable: true, validators: [Validators.required] }),
        account_officer: new FormControl(this.store.userPhones().account_officer, { nonNullable: true })
    });
    gatewayForm = new FormGroup({
        provider: new FormControl(this.store.smsGatewayConfig().provider, { nonNullable: true }),
        senderId: new FormControl(this.store.smsGatewayConfig().senderId, { nonNullable: true, validators: [Validators.required] }),
        apiKey: new FormControl(this.store.smsGatewayConfig().apiKey || '', { nonNullable: true }),
        hubtelClientId: new FormControl(this.store.smsGatewayConfig().hubtelClientId || '', { nonNullable: true }),
        hubtelClientSecret: new FormControl(this.store.smsGatewayConfig().hubtelClientSecret || '', { nonNullable: true }),
        twilioAccountSid: new FormControl(this.store.smsGatewayConfig().twilioAccountSid || '', { nonNullable: true }),
        twilioAuthToken: new FormControl(this.store.smsGatewayConfig().twilioAuthToken || '', { nonNullable: true }),
        simulationMode: new FormControl(this.store.smsGatewayConfig().simulationMode, { nonNullable: true })
    });
    savePhones() {
        if (!this.phonesForm.valid)
            return;
        this.store.updateUserPhones(this.phonesForm.getRawValue());
        this.closed.emit();
    }
    saveGateway() {
        if (!this.gatewayForm.valid)
            return;
        const val = this.gatewayForm.getRawValue();
        this.store.updateSmsGatewayConfig({
            provider: val.provider,
            senderId: val.senderId,
            apiKey: val.apiKey,
            hubtelClientId: val.hubtelClientId,
            hubtelClientSecret: val.hubtelClientSecret,
            twilioAccountSid: val.twilioAccountSid,
            twilioAuthToken: val.twilioAuthToken,
            simulationMode: val.simulationMode
        });
        this.closed.emit();
    }
    sendTestSms() {
        const role = this.store.currentRole();
        const phones = this.store.userPhones();
        const phone = phones[role] || phones.manager;
        this.store.sendTestSmsPing(phone, `DoorMaster Automated SMS Gateway: Verification test ping for ${role} successful. 200 OK.`);
    }
    static ɵfac = function ProfileSmsSettingsModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfileSmsSettingsModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfileSmsSettingsModal, selectors: [["app-profile-sms-settings-modal"]], outputs: { closed: "closed" }, decls: 35, vars: 10, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/75", "backdrop-blur-xs", "overflow-y-auto"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "max-w-2xl", "w-full", "max-h-[92vh]", "flex", "flex-col", "overflow-hidden", "animate-in", "fade-in", "zoom-in-95", "duration-150"], [1, "px-6", "py-4", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/50", "dark:bg-slate-800/40"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-xl", "bg-emerald-600", "text-white", "flex", "items-center", "justify-center"], [1, "!text-sm"], [1, "text-sm", "font-extrabold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-400", "hover:text-slate-700", "dark:hover:text-slate-200", 3, "click"], [1, "!text-base"], [1, "flex", "border-b", "border-slate-200", "dark:border-slate-800", "px-6", "pt-3", "gap-2", "bg-slate-50/30", "dark:bg-slate-900/40", "text-xs"], ["type", "button", 1, "pb-2.5", "px-3", "font-bold", "border-b-2", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-xs"], [1, "overflow-y-auto", "p-6", "text-xs", "flex-1"], [1, "space-y-4", 3, "formGroup"], [1, "space-y-3"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "p-3.5", "bg-emerald-50/70", "dark:bg-emerald-950/40", "rounded-xl", "border", "border-emerald-200", "dark:border-emerald-800", "text-emerald-900", "dark:text-emerald-300", "space-y-1"], [1, "font-bold", "flex", "items-center", "gap-1"], [1, "text-[11px]", "text-emerald-700", "dark:text-emerald-400"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["for", "phoneShopManager", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "phoneShopManager", "type", "text", "formControlName", "shop_manager", "placeholder", "+233 24 100 0002", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-medium", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "text-slate-400"], ["for", "phoneOperationsManager", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "phoneOperationsManager", "type", "text", "formControlName", "manager", "placeholder", "+233 24 100 0001", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-medium", "text-slate-900", "dark:text-white"], ["for", "phoneDispatcher", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "phoneDispatcher", "type", "text", "formControlName", "dispatcher", "placeholder", "+233 24 555 0192", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-medium", "text-slate-900", "dark:text-white"], ["for", "phoneInstaller", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "phoneInstaller", "type", "text", "formControlName", "installer", "placeholder", "+233 24 881 0293", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-medium", "text-slate-900", "dark:text-white"], ["for", "phoneClient", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "phoneClient", "type", "text", "formControlName", "client", "placeholder", "+233 24 883 9921", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-medium", "text-slate-900", "dark:text-white"], ["for", "phoneAccountant", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "phoneAccountant", "type", "text", "formControlName", "account_officer", "placeholder", "+233 24 100 0005", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono", "font-medium", "text-slate-900", "dark:text-white"], [1, "pt-3", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "justify-end"], ["type", "submit", 1, "px-5", "py-2", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "font-bold", "rounded-xl", "shadow-sm", "flex", "items-center", "gap-1.5", "transition-all", "active:scale-95"], ["for", "gatewayProviderSelect", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "gatewayProviderSelect", "formControlName", "provider", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-semibold"], ["value", "simulator"], ["value", "arkesel"], ["value", "hubtel"], ["value", "twilio"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], ["for", "senderIdInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "senderIdInput", "type", "text", "formControlName", "senderId", "placeholder", "DoorMaster", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], ["for", "apiKeyInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "apiKeyInput", "type", "password", "formControlName", "apiKey", "placeholder", "e.g. ark_live_994827163", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3", "bg-slate-50", "dark:bg-slate-800/60", "p-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700"], [1, "flex", "items-center", "gap-2", "pt-2"], ["id", "simModeCheck", "type", "checkbox", "formControlName", "simulationMode", 1, "rounded", "text-emerald-600"], ["for", "simModeCheck", 1, "font-medium", "text-slate-700", "dark:text-slate-300"], [1, "pt-3", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-between"], ["type", "button", 1, "px-3.5", "py-1.5", "border", "border-slate-300", "dark:border-slate-700", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "font-bold", "flex", "items-center", "gap-1", 3, "click"], [1, "!text-xs", "text-amber-500"], ["for", "hubtelClientInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "hubtelClientInput", "type", "text", "formControlName", "hubtelClientId", "placeholder", "e.g. hbt_cli_88192", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], ["for", "hubtelSecretInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "hubtelSecretInput", "type", "password", "formControlName", "hubtelClientSecret", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], ["for", "twilioSidInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "twilioSidInput", "type", "text", "formControlName", "twilioAccountSid", "placeholder", "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], ["for", "twilioTokenInput", 1, "block", "font-bold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "twilioTokenInput", "type", "password", "formControlName", "twilioAuthToken", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-3", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], [1, "flex", "items-center", "justify-between"], [1, "text-[11px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], [1, "text-xs", "font-mono", "text-emerald-600", "dark:text-emerald-400", "font-bold"], [1, "p-8", "border", "border-dashed", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-center", "text-slate-400"], [1, "space-y-2.5", "max-h-96", "overflow-y-auto", "pr-1"], [1, "p-3", "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "space-y-1.5", "font-mono"], [1, "!text-3xl", "mb-1", "text-slate-300"], [1, "font-medium"], [1, "text-[10px]", "mt-0.5"], [1, "flex", "items-center", "justify-between", "text-[10px]"], [1, "flex", "items-center", "gap-1.5"], [1, "font-bold", "text-emerald-600", "dark:text-emerald-400", "uppercase", "font-sans"], [1, "text-slate-400"], [1, "text-xs", "text-slate-800", "dark:text-slate-200", "font-sans", "leading-relaxed", "bg-white", "dark:bg-slate-900", "p-2.5", "rounded-lg", "border", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-between", "text-[10px]", "pt-0.5", "text-slate-400"], [1, "text-slate-600", "dark:text-slate-300"], [1, "text-emerald-600", "dark:text-emerald-400", "font-bold", "flex", "items-center", "gap-0.5"]], template: function ProfileSmsSettingsModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon", 5);
            i0.ɵɵtext(6, "sms");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "h3", 6);
            i0.ɵɵtext(9, "Profile Phone Setup & SMS Gateway");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Configure recipient mobile numbers and SMS gateway credentials");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function ProfileSmsSettingsModal_Template_button_click_12_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(13, "mat-icon", 9);
            i0.ɵɵtext(14, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "div", 10)(16, "button", 11);
            i0.ɵɵlistener("click", function ProfileSmsSettingsModal_Template_button_click_16_listener() { return ctx.activeTab.set("phones"); });
            i0.ɵɵelementStart(17, "mat-icon", 12);
            i0.ɵɵtext(18, "phone_iphone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span");
            i0.ɵɵtext(20, "User Phone Directory");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "button", 11);
            i0.ɵɵlistener("click", function ProfileSmsSettingsModal_Template_button_click_21_listener() { return ctx.activeTab.set("gateway"); });
            i0.ɵɵelementStart(22, "mat-icon", 12);
            i0.ɵɵtext(23, "settings_cell");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span");
            i0.ɵɵtext(25, "SMS Gateways (Hubtel / Arkesel / Twilio)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "button", 11);
            i0.ɵɵlistener("click", function ProfileSmsSettingsModal_Template_button_click_26_listener() { return ctx.activeTab.set("inbox"); });
            i0.ɵɵelementStart(27, "mat-icon", 12);
            i0.ɵɵtext(28, "chat");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "span");
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(31, "div", 13);
            i0.ɵɵconditionalCreate(32, ProfileSmsSettingsModal_Conditional_32_Template, 52, 1, "form", 14);
            i0.ɵɵconditionalCreate(33, ProfileSmsSettingsModal_Conditional_33_Template, 41, 3, "form", 14);
            i0.ɵɵconditionalCreate(34, ProfileSmsSettingsModal_Conditional_34_Template, 10, 2, "div", 15);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵclassMap(ctx.activeTab() === "phones" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(5);
            i0.ɵɵclassMap(ctx.activeTab() === "gateway" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(5);
            i0.ɵɵclassMap(ctx.activeTab() === "inbox" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Live SMS Inbox (", ctx.store.smsLogs().length, ")");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.activeTab() === "phones" ? 32 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "gateway" ? 33 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "inbox" ? 34 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, SlicePipe], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileSmsSettingsModal, [{
        type: Component,
        args: [{
                selector: 'app-profile-sms-settings-modal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule, SlicePipe],
                template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <!-- Modal Top Bar -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm">sms</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Profile Phone Setup & SMS Gateway</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Configure recipient mobile numbers and SMS gateway credentials</p>
            </div>
          </div>
          <button 
            type="button" 
            (click)="closed.emit()"
            class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <mat-icon class="!text-base">close</mat-icon>
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 gap-2 bg-slate-50/30 dark:bg-slate-900/40 text-xs">
          <button 
            type="button"
            (click)="activeTab.set('phones')"
            class="pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'phones' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">phone_iphone</mat-icon>
            <span>User Phone Directory</span>
          </button>

          <button 
            type="button"
            (click)="activeTab.set('gateway')"
            class="pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'gateway' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">settings_cell</mat-icon>
            <span>SMS Gateways (Hubtel / Arkesel / Twilio)</span>
          </button>

          <button 
            type="button"
            (click)="activeTab.set('inbox')"
            class="pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'inbox' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">chat</mat-icon>
            <span>Live SMS Inbox ({{ store.smsLogs().length }})</span>
          </button>
        </div>

        <!-- Content Area -->
        <div class="overflow-y-auto p-6 text-xs flex-1">
          <!-- TAB 1: USER PHONE DIRECTORY -->
          @if (activeTab() === 'phones') {
            <form [formGroup]="phonesForm" (ngSubmit)="savePhones()" class="space-y-4">
              <div class="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 space-y-1">
                <span class="font-bold flex items-center gap-1">
                  <mat-icon class="!text-xs">notifications_active</mat-icon>
                  <span>Real-time SMS Routing</span>
                </span>
                <p class="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Each role must have a verified mobile number to receive step-by-step SMS updates during door fabrication, truck departure, and lock installation.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="phoneShopManager" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Shop Attendant / Manager Phone *
                  </label>
                  <input 
                    id="phoneShopManager"
                    type="text" 
                    formControlName="shop_manager"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 100 0002"
                  />
                  <span class="text-[10px] text-slate-400">Receives booking confirmations & approval SMS</span>
                </div>

                <div>
                  <label for="phoneOperationsManager" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Operations Manager Phone *
                  </label>
                  <input 
                    id="phoneOperationsManager"
                    type="text" 
                    formControlName="manager"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 100 0001"
                  />
                  <span class="text-[10px] text-slate-400">Receives driver/installer responses & site alerts</span>
                </div>

                <div>
                  <label for="phoneDispatcher" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Dispatch Driver (Logistics Flatbed) *
                  </label>
                  <input 
                    id="phoneDispatcher"
                    type="text" 
                    formControlName="dispatcher"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 555 0192"
                  />
                  <span class="text-[10px] text-slate-400">Receives delivery assignments & pickup notices</span>
                </div>

                <div>
                  <label for="phoneInstaller" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Field Installer / Locksmith *
                  </label>
                  <input 
                    id="phoneInstaller"
                    type="text" 
                    formControlName="installer"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 881 0293"
                  />
                  <span class="text-[10px] text-slate-400">Receives smart lock installation assignments</span>
                </div>

                <div>
                  <label for="phoneClient" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Client / Site Owner Phone *
                  </label>
                  <input 
                    id="phoneClient"
                    type="text" 
                    formControlName="client"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 883 9921"
                  />
                  <span class="text-[10px] text-slate-400">Receives live delivery approach & ETA links</span>
                </div>

                <div>
                  <label for="phoneAccountant" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Account Officer Phone
                  </label>
                  <input 
                    id="phoneAccountant"
                    type="text" 
                    formControlName="account_officer"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 100 0005"
                  />
                  <span class="text-[10px] text-slate-400">Receives counter payment notifications</span>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  type="submit" 
                  class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <mat-icon class="!text-sm">save</mat-icon>
                  <span>Save Phone Directory</span>
                </button>
              </div>
            </form>
          }

          <!-- TAB 2: SMS GATEWAYS CONFIGURATION -->
          @if (activeTab() === 'gateway') {
            <form [formGroup]="gatewayForm" (ngSubmit)="saveGateway()" class="space-y-4">
              <div>
                <label for="gatewayProviderSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Active SMS Gateway Provider *</label>
                <select 
                  id="gatewayProviderSelect"
                  formControlName="provider"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="simulator">Built-in Interactive Ghana Telco SMS Simulator (Recommended for Testing)</option>
                  <option value="arkesel">Arkesel SMS Gateway (Ghana / Africa Telco Direct)</option>
                  <option value="hubtel">Hubtel Programmable SMS Gateway (Ghana Direct)</option>
                  <option value="twilio">Twilio Global Programmable SMS</option>
                </select>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label for="senderIdInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sender ID / Brand Name *</label>
                  <input 
                    id="senderIdInput"
                    type="text" 
                    formControlName="senderId"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    placeholder="DoorMaster"
                  />
                  <span class="text-[10px] text-slate-400">Max 11 alphanumeric characters approved by telcos</span>
                </div>

                <div>
                  <label for="apiKeyInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">API Key / Token</label>
                  <input 
                    id="apiKeyInput"
                    type="password" 
                    formControlName="apiKey"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    placeholder="e.g. ark_live_994827163"
                  />
                </div>
              </div>

              @if (gatewayForm.get('provider')?.value === 'hubtel') {
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label for="hubtelClientInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hubtel Client ID</label>
                    <input 
                      id="hubtelClientInput"
                      type="text" 
                      formControlName="hubtelClientId"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="e.g. hbt_cli_88192"
                    />
                  </div>
                  <div>
                    <label for="hubtelSecretInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hubtel Client Secret</label>
                    <input 
                      id="hubtelSecretInput"
                      type="password" 
                      formControlName="hubtelClientSecret"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              }

              @if (gatewayForm.get('provider')?.value === 'twilio') {
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label for="twilioSidInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Twilio Account SID</label>
                    <input 
                      id="twilioSidInput"
                      type="text" 
                      formControlName="twilioAccountSid"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label for="twilioTokenInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Twilio Auth Token</label>
                    <input 
                      id="twilioTokenInput"
                      type="password" 
                      formControlName="twilioAuthToken"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              }

              <div class="flex items-center gap-2 pt-2">
                <input 
                  id="simModeCheck"
                  type="checkbox" 
                  formControlName="simulationMode"
                  class="rounded text-emerald-600"
                />
                <label for="simModeCheck" class="font-medium text-slate-700 dark:text-slate-300">
                  Enable In-App Telco Simulator (renders live incoming SMS handset drawer in UI)
                </label>
              </div>

              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button 
                  type="button" 
                  (click)="sendTestSms()"
                  class="px-3.5 py-1.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold flex items-center gap-1"
                >
                  <mat-icon class="!text-xs text-amber-500">send</mat-icon>
                  <span>Send Test SMS Ping</span>
                </button>

                <button 
                  type="submit" 
                  class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <mat-icon class="!text-sm">save</mat-icon>
                  <span>Save Gateway Settings</span>
                </button>
              </div>
            </form>
          }

          <!-- TAB 3: LIVE SMS INBOX LOGS -->
          @if (activeTab() === 'inbox') {
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recent Dispatched SMS History</span>
                <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ store.smsLogs().length }} messages sent</span>
              </div>

              @if (store.smsLogs().length === 0) {
                <div class="p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center text-slate-400">
                  <mat-icon class="!text-3xl mb-1 text-slate-300">sms</mat-icon>
                  <p class="font-medium">No SMS messages sent yet.</p>
                  <p class="text-[10px] mt-0.5">Booking an installation or assigning a driver will trigger live SMS messages.</p>
                </div>
              }

              <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                @for (sms of store.smsLogs(); track sms.id) {
                  <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
                    <div class="flex items-center justify-between text-[10px]">
                      <div class="flex items-center gap-1.5">
                        <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase font-sans">
                          [{{ sms.senderId }}] &rarr; {{ sms.recipientName }} ({{ sms.recipientRole }})
                        </span>
                        <span class="text-slate-400">{{ sms.recipientPhone }}</span>
                      </div>
                      <span class="text-slate-400">{{ sms.timestamp | slice:11:19 }}</span>
                    </div>

                    <p class="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      {{ sms.messageText }}
                    </p>

                    <div class="flex items-center justify-between text-[10px] pt-0.5 text-slate-400">
                      <span>Event: <strong class="text-slate-600 dark:text-slate-300">{{ sms.triggerEvent }}</strong></span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                        <mat-icon class="!text-xs">done_all</mat-icon>
                        <span>Delivered</span>
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
            }]
    }], null, { closed: [{ type: i0.Output, args: ["closed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfileSmsSettingsModal, { className: "ProfileSmsSettingsModal", filePath: "frontend/src/app/components/profile-sms-settings-modal/profile-sms-settings-modal.ts", lineNumber: 357 }); })();
