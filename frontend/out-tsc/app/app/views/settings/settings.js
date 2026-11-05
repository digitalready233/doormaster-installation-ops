import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function Settings_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 24)(2, "mat-icon", 25);
    i0.ɵɵtext(3, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 26);
    i0.ɵɵlistener("click", function Settings_Conditional_72_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.feedbackMessage.set(null)); });
    i0.ɵɵelementStart(7, "mat-icon", 19);
    i0.ɵɵtext(8, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.feedbackMessage());
} }
function Settings_Conditional_73_Conditional_128_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 68);
    i0.ɵɵtext(1, "refresh");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Saving Location...");
    i0.ɵɵelementEnd();
} }
function Settings_Conditional_73_Conditional_129_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 19);
    i0.ɵɵtext(1, "save");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Save Location");
    i0.ɵɵelementEnd();
} }
function Settings_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 27)(2, "div")(3, "h2", 28)(4, "span");
    i0.ɵɵtext(5, "Workshop Branch Location Settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 29);
    i0.ɵɵtext(7, " MySQL Table: shop_locations ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 30);
    i0.ɵɵtext(9, " Saved in MySQL database and automatically linked to order booking counter, driver dispatch, and OpenStreetMap radar. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 31)(11, "span", 32);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "slice");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "form", 33);
    i0.ɵɵlistener("ngSubmit", function Settings_Conditional_73_Template_form_ngSubmit_14_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveShopLocation()); });
    i0.ɵɵelementStart(15, "div", 34)(16, "h3", 35)(17, "mat-icon", 36);
    i0.ɵɵtext(18, "business");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "Branch Identity");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 37)(22, "div", 38)(23, "label", 39);
    i0.ɵɵtext(24, "Shop / Workshop Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 40);
    i0.ɵɵelementStart(26, "span", 41);
    i0.ɵɵtext(27, "Used as the originating workshop name across all customer quotes & booking forms");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 42)(29, "label", 39);
    i0.ɵɵtext(30, "Branch Code *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "input", 43);
    i0.ɵɵelementStart(32, "span", 41);
    i0.ɵɵtext(33, "Internal code (e.g. DM-ACC-01)");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(34, "div", 44)(35, "h3", 35)(36, "mat-icon", 36);
    i0.ɵɵtext(37, "pin_drop");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Physical Address & Corridor");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 42)(41, "label", 39);
    i0.ɵɵtext(42, "Street Address & Landmark *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(43, "input", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 46)(45, "div", 42)(46, "label", 39);
    i0.ɵɵtext(47, "City *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(48, "input", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 42)(50, "label", 39);
    i0.ɵɵtext(51, "Region");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(52, "input", 48);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(53, "div", 44)(54, "div", 49)(55, "h3", 35)(56, "mat-icon", 36);
    i0.ɵɵtext(57, "my_location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "span");
    i0.ɵɵtext(59, "Store Origin GPS Coordinates");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "button", 50);
    i0.ɵɵlistener("click", function Settings_Conditional_73_Template_button_click_60_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.detectBrowserGps()); });
    i0.ɵɵelementStart(61, "mat-icon", 5);
    i0.ɵɵtext(62, "gps_fixed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span");
    i0.ɵɵtext(64, "Detect Device GPS");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(65, "div", 46)(66, "div", 42)(67, "label", 39);
    i0.ɵɵtext(68, "Latitude *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(69, "input", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 42)(71, "label", 39);
    i0.ɵɵtext(72, "Longitude *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(73, "input", 52);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(74, "div", 53)(75, "span", 54);
    i0.ɵɵtext(76, "Quick Greater Accra Hub Presets:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "div", 55)(78, "button", 56);
    i0.ɵɵlistener("click", function Settings_Conditional_73_Template_button_click_78_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setCoordinates(5.6231, -0.1582, "Plot 48, Spintex Road Industrial Area")); });
    i0.ɵɵtext(79, " \uD83C\uDFED Spintex Atelier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "button", 56);
    i0.ɵɵlistener("click", function Settings_Conditional_73_Template_button_click_80_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setCoordinates(5.556, -0.2012, "High Street Boulevard, Central Business District")); });
    i0.ɵɵtext(81, " \uD83C\uDFDB\uFE0F Accra Central ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "button", 56);
    i0.ɵɵlistener("click", function Settings_Conditional_73_Template_button_click_82_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setCoordinates(5.638, -0.155, "Boundary Road, East Legon")); });
    i0.ɵɵtext(83, " \uD83D\uDCCD East Legon ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "button", 56);
    i0.ɵɵlistener("click", function Settings_Conditional_73_Template_button_click_84_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setCoordinates(5.6698, -0.0166, "Harbor Commercial Gateway, Tema")); });
    i0.ɵɵtext(85, " \uD83D\uDEA2 Tema Harbor ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "button", 56);
    i0.ɵɵlistener("click", function Settings_Conditional_73_Template_button_click_86_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setCoordinates(5.584, -0.178, "Rangoon Lane, Cantonments Diplomatic Zone")); });
    i0.ɵɵtext(87, " \uD83D\uDCCD Cantonments ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(88, "div", 44)(89, "h3", 35)(90, "mat-icon", 36);
    i0.ɵɵtext(91, "contact_phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "span");
    i0.ɵɵtext(93, "Operations, Counter & Manager Details");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(94, "div", 46)(95, "div", 42)(96, "label", 39);
    i0.ɵɵtext(97, "Shop Manager Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(98, "input", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(99, "div", 42)(100, "label", 39);
    i0.ɵɵtext(101, "Dispatch Logistics Radius (km) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(102, "div", 31);
    i0.ɵɵelement(103, "input", 58);
    i0.ɵɵelementStart(104, "span", 59);
    i0.ɵɵtext(105, "km");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(106, "div", 46)(107, "div", 42)(108, "label", 39);
    i0.ɵɵtext(109, "Workshop Direct Phone (SMS Alerts) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(110, "input", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(111, "div", 42)(112, "label", 39);
    i0.ɵɵtext(113, "Workshop Official Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(114, "input", 61);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(115, "div", 42)(116, "label", 39);
    i0.ɵɵtext(117, "Operating / Dispatch Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(118, "input", 62);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(119, "div", 63)(120, "div", 64)(121, "mat-icon", 65);
    i0.ɵɵtext(122, "database");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(123, "span");
    i0.ɵɵtext(124, "Persisted in MySQL table ");
    i0.ɵɵelementStart(125, "code", 66);
    i0.ɵɵtext(126, "shop_locations");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(127, "button", 67);
    i0.ɵɵconditionalCreate(128, Settings_Conditional_73_Conditional_128_Template, 4, 0)(129, Settings_Conditional_73_Conditional_129_Template, 4, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate1("Last updated: ", ctx_r1.store.shopLocation().updatedAt ? i0.ɵɵpipeBind3(13, 4, ctx_r1.store.shopLocation().updatedAt, 0, 19) : "Active");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.shopLocationForm);
    i0.ɵɵadvance(113);
    i0.ɵɵproperty("disabled", !ctx_r1.shopLocationForm.valid || ctx_r1.isSavingShopLocation());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSavingShopLocation() ? 128 : 129);
} }
function Settings_Conditional_74_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 69)(2, "h2", 28)(3, "span");
    i0.ɵɵtext(4, "User Phone Directory & SMS Routing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 29);
    i0.ɵɵtext(6, " Automated SMS Delivery ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 30);
    i0.ɵɵtext(8, " Each user persona has a verified mobile number. When a shop manager books an order, an installer is assigned, or a driver departs, automated SMS messages route instantly to these phones. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "form", 70);
    i0.ɵɵlistener("ngSubmit", function Settings_Conditional_74_Template_form_ngSubmit_9_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.savePhones()); });
    i0.ɵɵelementStart(10, "div", 71)(11, "div", 72)(12, "div", 73)(13, "mat-icon", 19);
    i0.ɵɵtext(14, "storefront");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "Shop Attendant / Manager *");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(17, "input", 74);
    i0.ɵɵelementStart(18, "span", 75);
    i0.ɵɵtext(19, "Receives booking confirmations & installer assignment SMS");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 72)(21, "div", 76)(22, "mat-icon", 19);
    i0.ɵɵtext(23, "admin_panel_settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Operations Manager *");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(26, "input", 77);
    i0.ɵɵelementStart(27, "span", 75);
    i0.ɵɵtext(28, "Receives booking alerts when shop manager creates requests");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 72)(30, "div", 78)(31, "mat-icon", 19);
    i0.ɵɵtext(32, "local_shipping");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Dispatch Driver (Transport) *");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(35, "input", 79);
    i0.ɵɵelementStart(36, "span", 75);
    i0.ɵɵtext(37, "Receives truck cargo manifests & customer site route coordinates");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 72)(39, "div", 80)(40, "mat-icon", 19);
    i0.ɵɵtext(41, "handyman");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span");
    i0.ɵɵtext(43, "Field Technician / Installer *");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(44, "input", 81);
    i0.ɵɵelementStart(45, "span", 75);
    i0.ɵɵtext(46, "Receives job assignments & customer smart lock fitting alerts");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 72)(48, "div", 82)(49, "mat-icon", 19);
    i0.ɵɵtext(50, "person_pin_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span");
    i0.ɵɵtext(52, "Client / Site Owner *");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(53, "input", 83);
    i0.ɵɵelementStart(54, "span", 75);
    i0.ɵɵtext(55, "Receives booking receipt, live delivery approach & ETA links");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(56, "div", 72)(57, "div", 84)(58, "mat-icon", 19);
    i0.ɵɵtext(59, "account_balance_wallet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "span");
    i0.ɵɵtext(61, "Accounts & Finance Officer");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(62, "input", 85);
    i0.ɵɵelementStart(63, "span", 75);
    i0.ɵɵtext(64, "Receives counter deposit verifications & technician bonus release requests");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(65, "div", 86)(66, "button", 87)(67, "mat-icon", 19);
    i0.ɵɵtext(68, "save");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span");
    i0.ɵɵtext(70, "Save Phone Directory");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("formGroup", ctx_r1.phonesForm);
} }
function Settings_Conditional_75_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 96)(1, "div", 42)(2, "label", 88);
    i0.ɵɵtext(3, "Hubtel Client ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 42)(6, "label", 88);
    i0.ɵɵtext(7, "Hubtel Client Secret");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 105);
    i0.ɵɵelementEnd()();
} }
function Settings_Conditional_75_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 96)(1, "div", 42)(2, "label", 88);
    i0.ɵɵtext(3, "Twilio Account SID");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 42)(6, "label", 88);
    i0.ɵɵtext(7, "Twilio Auth Token");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 107);
    i0.ɵɵelementEnd()();
} }
function Settings_Conditional_75_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 69)(2, "h2", 28)(3, "span");
    i0.ɵɵtext(4, "SMS Gateway Credentials & Provider Settings");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 30);
    i0.ɵɵtext(6, " Connect Hubtel, Arkesel, or Twilio API keys to send real telco SMS messages to technicians and homeowners across Ghana. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 70);
    i0.ɵɵlistener("ngSubmit", function Settings_Conditional_75_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveGateway()); });
    i0.ɵɵelementStart(8, "div", 42)(9, "label", 88);
    i0.ɵɵtext(10, "Select Active SMS Gateway Provider *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 89)(12, "option", 90);
    i0.ɵɵtext(13, "Built-in Interactive Ghana Telco SMS Simulator (Recommended for Testing)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 91);
    i0.ɵɵtext(15, "Arkesel SMS Gateway (Ghana / Africa Telco Direct)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "option", 92);
    i0.ɵɵtext(17, "Hubtel Programmable SMS Gateway (Ghana Direct)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "option", 93);
    i0.ɵɵtext(19, "Twilio Global Programmable SMS");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 46)(21, "div", 42)(22, "label", 88);
    i0.ɵɵtext(23, "Sender ID / Brand Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 94);
    i0.ɵɵelementStart(25, "span", 41);
    i0.ɵɵtext(26, "Max 11 alphanumeric characters approved by telcos");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 42)(28, "label", 88);
    i0.ɵɵtext(29, "API Key / Token");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 95);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(31, Settings_Conditional_75_Conditional_31_Template, 9, 0, "div", 96);
    i0.ɵɵconditionalCreate(32, Settings_Conditional_75_Conditional_32_Template, 9, 0, "div", 96);
    i0.ɵɵelementStart(33, "div", 97);
    i0.ɵɵelement(34, "input", 98);
    i0.ɵɵelementStart(35, "label", 99);
    i0.ɵɵtext(36, " Enable In-App Telco Simulator (records SMS telemetry in live audit inbox) ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div", 100)(38, "button", 101);
    i0.ɵɵlistener("click", function Settings_Conditional_75_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sendTestSms()); });
    i0.ɵɵelementStart(39, "mat-icon", 102);
    i0.ɵɵtext(40, "send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵtext(42, "Send Test SMS Ping");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "button", 103)(44, "mat-icon", 19);
    i0.ɵɵtext(45, "save");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "span");
    i0.ɵɵtext(47, "Save Gateway Settings");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r1.gatewayForm);
    i0.ɵɵadvance(24);
    i0.ɵɵconditional(((tmp_2_0 = ctx_r1.gatewayForm.get("provider")) == null ? null : tmp_2_0.value) === "hubtel" ? 31 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_3_0 = ctx_r1.gatewayForm.get("provider")) == null ? null : tmp_3_0.value) === "twilio" ? 32 : -1);
} }
function Settings_Conditional_76_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 110)(1, "mat-icon", 112);
    i0.ɵɵtext(2, "sms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 113);
    i0.ɵɵtext(4, "No SMS messages logged yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 114);
    i0.ɵɵtext(6, "Booking an installation or assigning a driver will log automated messages here.");
    i0.ɵɵelementEnd()();
} }
function Settings_Conditional_76_Conditional_16_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 115)(1, "div", 116)(2, "div", 31)(3, "span", 117);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 13);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 13);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "slice");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 118);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 119)(13, "span");
    i0.ɵɵtext(14, "Trigger Event: ");
    i0.ɵɵelementStart(15, "strong", 120);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "span", 121)(18, "mat-icon", 19);
    i0.ɵɵtext(19, "done_all");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Delivered");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const sms_r7 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate3(" [", sms_r7.senderId, "] \u2192 ", sms_r7.recipientName, " (", sms_r7.recipientRole, ") ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(sms_r7.recipientPhone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(9, 7, sms_r7.timestamp, 0, 19));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", sms_r7.messageText, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(sms_r7.triggerEvent);
} }
function Settings_Conditional_76_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111);
    i0.ɵɵrepeaterCreate(1, Settings_Conditional_76_Conditional_16_For_2_Template, 22, 11, "div", 115, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.store.smsLogs());
} }
function Settings_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 23)(1, "div", 27)(2, "div")(3, "h2", 28)(4, "span");
    i0.ɵɵtext(5, "SMS Dispatch Telemetry & Live Inbox");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 108);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 30);
    i0.ɵɵtext(9, " Every transaction, booking, installer assignment, and driver transit status triggers an audit-logged SMS. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 109);
    i0.ɵɵlistener("click", function Settings_Conditional_76_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sendTestSms()); });
    i0.ɵɵelementStart(11, "mat-icon", 36);
    i0.ɵɵtext(12, "send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Test SMS Ping");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(15, Settings_Conditional_76_Conditional_15_Template, 7, 0, "div", 110)(16, Settings_Conditional_76_Conditional_16_Template, 3, 0, "div", 111);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.store.smsLogs().length, " messages sent ");
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r1.store.smsLogs().length === 0 ? 15 : 16);
} }
function Settings_Conditional_77_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 125);
    i0.ɵɵtext(1, "Active");
    i0.ɵɵelementEnd();
} }
function Settings_Conditional_77_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 129);
    i0.ɵɵtext(1, "Active");
    i0.ɵɵelementEnd();
} }
function Settings_Conditional_77_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 69)(2, "h2", 28)(3, "span");
    i0.ɵɵtext(4, "Theme & Interface Preferences");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 30);
    i0.ɵɵtext(6, " Customize display aesthetics, color modes, and backend data synchronization. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 46)(8, "button", 122);
    i0.ɵɵlistener("click", function Settings_Conditional_77_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setLightMode()); });
    i0.ɵɵelementStart(9, "div", 49)(10, "div", 123)(11, "mat-icon", 124);
    i0.ɵɵtext(12, "light_mode");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, Settings_Conditional_77_Conditional_13_Template, 2, 0, "span", 125);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div")(15, "h3", 126);
    i0.ɵɵtext(16, "Clean Light Theme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 127);
    i0.ɵɵtext(18, "High-contrast daytime visibility for site technicians & dispatch desk.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "button", 122);
    i0.ɵɵlistener("click", function Settings_Conditional_77_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setDarkMode()); });
    i0.ɵɵelementStart(20, "div", 49)(21, "div", 128)(22, "mat-icon", 124);
    i0.ɵɵtext(23, "dark_mode");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(24, Settings_Conditional_77_Conditional_24_Template, 2, 0, "span", 129);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div")(26, "h3", 126);
    i0.ɵɵtext(27, "Sleek Obsidian Dark Theme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p", 127);
    i0.ɵɵtext(29, "OLED-optimized dark palette for late-night dispatch tracking.");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵclassMap(!ctx_r1.themeStore.isDark() ? "border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300");
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(!ctx_r1.themeStore.isDark() ? 13 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r1.themeStore.isDark() ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20 shadow-sm" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300");
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.themeStore.isDark() ? 24 : -1);
} }
export class Settings {
    store = inject(InstallationStore);
    themeStore = inject(ThemeStore);
    alert = inject(AlertService);
    activeTab = signal('shop', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    isSavingShopLocation = signal(false, ...(ngDevMode ? [{ debugName: "isSavingShopLocation" }] : /* istanbul ignore next */ []));
    feedbackMessage = signal(null, ...(ngDevMode ? [{ debugName: "feedbackMessage" }] : /* istanbul ignore next */ []));
    // Shop Location Form
    shopLocationForm = new FormGroup({
        shopName: new FormControl(this.store.shopLocation().shopName, { nonNullable: true, validators: [Validators.required] }),
        branchCode: new FormControl(this.store.shopLocation().branchCode, { nonNullable: true, validators: [Validators.required] }),
        address: new FormControl(this.store.shopLocation().address, { nonNullable: true, validators: [Validators.required] }),
        city: new FormControl(this.store.shopLocation().city, { nonNullable: true, validators: [Validators.required] }),
        region: new FormControl(this.store.shopLocation().region, { nonNullable: true }),
        phone: new FormControl(this.store.shopLocation().phone, { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl(this.store.shopLocation().email, { nonNullable: true }),
        managerName: new FormControl(this.store.shopLocation().managerName, { nonNullable: true }),
        dispatchRadiusKm: new FormControl(this.store.shopLocation().dispatchRadiusKm, { nonNullable: true, validators: [Validators.min(1), Validators.max(200)] }),
        operatingHours: new FormControl(this.store.shopLocation().operatingHours, { nonNullable: true }),
        latitude: new FormControl(this.store.shopLocation().latitude, { nonNullable: true, validators: [Validators.required] }),
        longitude: new FormControl(this.store.shopLocation().longitude, { nonNullable: true, validators: [Validators.required] })
    });
    // Phones Form
    phonesForm = new FormGroup({
        manager: new FormControl(this.store.userPhones().manager, { nonNullable: true, validators: [Validators.required] }),
        shop_manager: new FormControl(this.store.userPhones().shop_manager, { nonNullable: true, validators: [Validators.required] }),
        dispatcher: new FormControl(this.store.userPhones().dispatcher, { nonNullable: true, validators: [Validators.required] }),
        installer: new FormControl(this.store.userPhones().installer, { nonNullable: true, validators: [Validators.required] }),
        client: new FormControl(this.store.userPhones().client, { nonNullable: true, validators: [Validators.required] }),
        account_officer: new FormControl(this.store.userPhones().account_officer, { nonNullable: true })
    });
    // SMS Gateway Form
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
    setCoordinates(lat, lng, addressPreset) {
        this.shopLocationForm.patchValue({
            latitude: lat,
            longitude: lng
        });
        if (addressPreset) {
            this.shopLocationForm.patchValue({ address: addressPreset });
        }
    }
    detectBrowserGps() {
        if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.shopLocationForm.patchValue({
                    latitude: Number(pos.coords.latitude.toFixed(5)),
                    longitude: Number(pos.coords.longitude.toFixed(5))
                });
                const msg = `Device GPS detected: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
                this.feedbackMessage.set(msg);
                this.alert.toastInfo('GPS Detected', msg);
            }, (err) => {
                console.warn('Geolocation failed:', err);
                this.alert.toastWarning('GPS Unavailable', 'Could not detect device geolocation.');
            }, { enableHighAccuracy: true, timeout: 6000 });
        }
    }
    async saveShopLocation() {
        if (!this.shopLocationForm.valid) {
            this.alert.toastWarning('Incomplete Fields', 'Please fill in all required workshop location fields.');
            return;
        }
        this.isSavingShopLocation.set(true);
        this.feedbackMessage.set(null);
        const val = this.shopLocationForm.getRawValue();
        try {
            const result = await this.store.updateShopLocation({
                shopName: val.shopName,
                branchCode: val.branchCode,
                address: val.address,
                city: val.city,
                region: val.region,
                phone: val.phone,
                email: val.email,
                managerName: val.managerName,
                dispatchRadiusKm: Number(val.dispatchRadiusKm),
                operatingHours: val.operatingHours,
                latitude: Number(val.latitude),
                longitude: Number(val.longitude)
            });
            this.isSavingShopLocation.set(false);
            if (result.success) {
                this.feedbackMessage.set(result.message || 'Workshop branch location settings saved to MySQL database.');
                this.alert.success('Location Saved', 'Workshop branch location and GPS telemetry saved to MySQL database.');
            }
            else {
                this.alert.error('Save Failed', result.message || 'Could not update workshop location.');
            }
        }
        catch (err) {
            this.isSavingShopLocation.set(false);
            this.alert.networkError('Network Error', 'Could not reach server. Settings saved to local cache.');
        }
    }
    savePhones() {
        if (!this.phonesForm.valid) {
            this.alert.toastWarning('Incomplete Directory', 'Please specify all required role mobile numbers.');
            return;
        }
        this.store.updateUserPhones(this.phonesForm.getRawValue());
        this.feedbackMessage.set('User mobile phone directory saved successfully.');
        this.alert.toastSuccess('Phone Directory Updated', 'Automated SMS recipient routing numbers saved.');
    }
    saveGateway() {
        if (!this.gatewayForm.valid) {
            this.alert.toastWarning('Incomplete Gateway Config', 'Please provide a valid Sender ID.');
            return;
        }
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
        this.feedbackMessage.set(`SMS Gateway configured for provider "${val.provider.toUpperCase()}".`);
        this.alert.success('SMS Gateway Configured', `Gateway set to provider ${val.provider.toUpperCase()} with Sender ID "${val.senderId}".`);
    }
    sendTestSms() {
        const role = this.store.currentRole();
        const phones = this.store.userPhones();
        const phone = phones[role] || phones.manager;
        this.store.sendTestSmsPing(phone, `DoorMaster Automated SMS Gateway: Verification test ping for ${role} successful. 200 OK.`);
        this.feedbackMessage.set(`Test SMS ping dispatched to ${phone}. Check the Live SMS Logs tab.`);
        this.alert.toastSuccess('Test SMS Dispatched', `Verification test SMS dispatched to ${phone}. Check Live SMS Logs tab.`);
    }
    setLightMode() {
        if (this.themeStore.isDark()) {
            this.themeStore.toggleTheme();
        }
    }
    setDarkMode() {
        if (!this.themeStore.isDark()) {
            this.themeStore.toggleTheme();
        }
    }
    static ɵfac = function Settings_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Settings)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Settings, selectors: [["app-settings"]], decls: 78, vars: 19, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4", "pb-4", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-wrap", "items-center", "gap-2", "text-xs", "text-slate-500", "dark:text-slate-400", "mb-1"], ["aria-hidden", "true"], [1, "inline-flex", "items-center", "gap-1", "font-bold", "text-cyan-700", "dark:text-cyan-400"], [1, "!text-xs"], [1, "text-2xl", "sm:text-3xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight", "flex", "items-center", "gap-3"], [1, "text-xs", "uppercase", "font-mono", "font-bold", "px-2.5", "py-0.5", "rounded-full", "bg-cyan-100", "text-cyan-800", "dark:bg-cyan-950", "dark:text-cyan-300", "border", "border-cyan-300", "dark:border-cyan-800"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1", "max-w-2xl", "leading-relaxed"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "px-3", "py-1.5", "rounded-xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xs", "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "text-[11px]", "font-mono"], [1, "text-slate-400"], [1, "text-slate-800", "dark:text-slate-200"], [1, "!text-xs", "text-cyan-500"], [1, "text-slate-800", "dark:text-slate-200", "uppercase"], [1, "flex", "flex-wrap", "items-center", "gap-2", "border-b", "border-slate-200", "dark:border-slate-800", "pb-2"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "text-xs", "font-bold", "transition-all", "flex", "items-center", "gap-2", "cursor-pointer", 3, "click"], [1, "!text-sm"], [1, "text-[10px]", "font-mono", "px-1.5", "py-0.2", "rounded", "bg-cyan-900/40", "text-cyan-200", "font-normal"], [1, "p-3.5", "bg-emerald-50", "dark:bg-emerald-950/40", "border", "border-emerald-200", "dark:border-emerald-800", "rounded-2xl", "text-emerald-800", "dark:text-emerald-300", "flex", "items-center", "justify-between", "gap-3", "text-xs", "shadow-xs", "animate-in", "fade-in", "duration-200"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "sm:p-7", "shadow-xs", "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "p-5", "sm:p-7", "shadow-xs", "space-y-5"], [1, "flex", "items-center", "gap-2", "font-semibold"], [1, "!text-base", "text-emerald-600"], ["type", "button", 1, "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", 3, "click"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "pb-4", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-2"], [1, "text-[10px]", "uppercase", "font-mono", "px-2", "py-0.5", "rounded-md", "bg-emerald-100", "dark:bg-emerald-950/60", "text-emerald-700", "dark:text-emerald-400", "border", "border-emerald-300", "dark:border-emerald-800", "font-bold"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-2"], [1, "text-[11px]", "text-slate-400", "font-mono"], [1, "space-y-6", "text-xs", 3, "ngSubmit", "formGroup"], [1, "space-y-3"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "uppercase", "tracking-wider", "flex", "items-center", "gap-1.5"], [1, "!text-sm", "text-cyan-600"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4"], [1, "sm:col-span-2", "space-y-1"], [1, "font-bold", "text-slate-700", "dark:text-slate-300"], ["type", "text", "formControlName", "shopName", "placeholder", "e.g. DoorMaster Flagship Workshop - Atelier A", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-cyan-500", "font-semibold"], [1, "text-[10px]", "text-slate-400"], [1, "space-y-1"], ["type", "text", "formControlName", "branchCode", "placeholder", "e.g. DM-ACC-01", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-cyan-500", "font-mono", "font-bold"], [1, "space-y-3", "pt-4", "border-t", "border-slate-100", "dark:border-slate-800"], ["type", "text", "formControlName", "address", "placeholder", "e.g. Plot 48, Spintex Road Industrial Area", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-cyan-500"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["type", "text", "formControlName", "city", "placeholder", "e.g. Accra", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "text", "formControlName", "region", "placeholder", "e.g. Greater Accra", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "justify-between"], ["type", "button", 1, "text-[11px]", "font-bold", "text-cyan-700", "dark:text-cyan-400", "hover:underline", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click"], ["type", "number", "step", "any", "formControlName", "latitude", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], ["type", "number", "step", "any", "formControlName", "longitude", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], [1, "bg-slate-50", "dark:bg-slate-800/60", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700/60", "space-y-2"], [1, "text-[10px]", "uppercase", "font-bold", "text-slate-400", "block", "tracking-wider"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "px-3", "py-1.5", "text-xs", "font-medium", "bg-white", "dark:bg-slate-700", "border", "border-slate-300", "dark:border-slate-600", "rounded-lg", "hover:border-cyan-500", "transition-colors", "cursor-pointer", 3, "click"], ["type", "text", "formControlName", "managerName", "placeholder", "e.g. Kwame Mensah", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "number", "min", "1", "max", "200", "formControlName", "dispatchRadiusKm", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], [1, "text-xs", "text-slate-400", "font-bold"], ["type", "text", "formControlName", "phone", "placeholder", "+233 24 100 0002", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], ["type", "email", "formControlName", "email", "placeholder", "spintex.workshop@doormasterops.com", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], ["type", "text", "formControlName", "operatingHours", "placeholder", "Mon - Sat: 08:00 - 18:00", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white"], [1, "pt-5", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-500", "font-medium"], [1, "!text-sm", "text-emerald-600"], [1, "font-mono", "text-cyan-600", "dark:text-cyan-400"], ["type", "submit", 1, "px-6", "py-2.5", "bg-cyan-700", "hover:bg-cyan-800", "disabled:opacity-50", "text-white", "rounded-xl", "font-bold", "transition-all", "shadow-md", "flex", "items-center", "gap-2", "active:scale-95", "cursor-pointer", 3, "disabled"], [1, "!text-sm", "animate-spin"], [1, "pb-4", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "space-y-5", "text-xs", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-4"], [1, "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/50", "dark:bg-slate-800/40", "space-y-2"], [1, "flex", "items-center", "gap-2", "text-cyan-700", "dark:text-cyan-400", "font-bold"], ["type", "text", "formControlName", "shop_manager", "placeholder", "+233 24 100 0002", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-900", "font-mono", "text-slate-900", "dark:text-white", "font-medium"], [1, "text-[10px]", "text-slate-400", "block"], [1, "flex", "items-center", "gap-2", "text-slate-800", "dark:text-slate-200", "font-bold"], ["type", "text", "formControlName", "manager", "placeholder", "+233 24 100 0001", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-900", "font-mono", "text-slate-900", "dark:text-white", "font-medium"], [1, "flex", "items-center", "gap-2", "text-teal-700", "dark:text-teal-400", "font-bold"], ["type", "text", "formControlName", "dispatcher", "placeholder", "+233 24 555 0192", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-900", "font-mono", "text-slate-900", "dark:text-white", "font-medium"], [1, "flex", "items-center", "gap-2", "text-emerald-700", "dark:text-emerald-400", "font-bold"], ["type", "text", "formControlName", "installer", "placeholder", "+233 24 881 0293", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-900", "font-mono", "text-slate-900", "dark:text-white", "font-medium"], [1, "flex", "items-center", "gap-2", "text-indigo-700", "dark:text-indigo-400", "font-bold"], ["type", "text", "formControlName", "client", "placeholder", "+233 24 883 9921", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-900", "font-mono", "text-slate-900", "dark:text-white", "font-medium"], [1, "flex", "items-center", "gap-2", "text-amber-700", "dark:text-amber-400", "font-bold"], ["type", "text", "formControlName", "account_officer", "placeholder", "+233 24 100 0005", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-lg", "bg-white", "dark:bg-slate-900", "font-mono", "text-slate-900", "dark:text-white", "font-medium"], [1, "pt-4", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "justify-end"], ["type", "submit", 1, "px-6", "py-2.5", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "font-bold", "rounded-xl", "shadow-sm", "flex", "items-center", "gap-2", "transition-all", "active:scale-95", "cursor-pointer"], [1, "block", "font-bold", "text-slate-700", "dark:text-slate-300"], ["formControlName", "provider", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-semibold"], ["value", "simulator"], ["value", "arkesel"], ["value", "hubtel"], ["value", "twilio"], ["type", "text", "formControlName", "senderId", "placeholder", "DoorMaster", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], ["type", "password", "formControlName", "apiKey", "placeholder", "e.g. ark_live_994827163", 1, "w-full", "px-3.5", "py-2.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "text-slate-900", "dark:text-white", "font-mono"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "bg-slate-50", "dark:bg-slate-800/60", "p-4", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700"], [1, "flex", "items-center", "gap-2", "pt-2"], ["id", "simModeCheckPage", "type", "checkbox", "formControlName", "simulationMode", 1, "rounded", "text-cyan-600", "focus:ring-cyan-500"], ["for", "simModeCheckPage", 1, "font-medium", "text-slate-700", "dark:text-slate-300"], [1, "pt-4", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-3"], ["type", "button", 1, "px-4", "py-2", "border", "border-slate-300", "dark:border-slate-700", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "font-bold", "flex", "items-center", "gap-1.5", "cursor-pointer", 3, "click"], [1, "!text-sm", "text-amber-500"], ["type", "submit", 1, "px-6", "py-2.5", "bg-cyan-700", "hover:bg-cyan-800", "text-white", "font-bold", "rounded-xl", "shadow-sm", "flex", "items-center", "gap-2", "transition-all", "active:scale-95", "cursor-pointer"], ["type", "text", "formControlName", "hubtelClientId", "placeholder", "e.g. hbt_cli_88192", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], ["type", "password", "formControlName", "hubtelClientSecret", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], ["type", "text", "formControlName", "twilioAccountSid", "placeholder", "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], ["type", "password", "formControlName", "twilioAuthToken", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "px-3", "py-2", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "font-mono"], [1, "text-[10px]", "font-mono", "px-2", "py-0.5", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400", "font-bold"], ["type", "button", 1, "px-3.5", "py-1.5", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "flex", "items-center", "gap-1.5", "cursor-pointer", 3, "click"], [1, "p-12", "border", "border-dashed", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "text-center", "text-slate-400"], [1, "space-y-3", "max-h-[600px]", "overflow-y-auto", "pr-1"], [1, "!text-4xl", "mb-2", "text-slate-300", "dark:text-slate-600"], [1, "font-bold", "text-sm"], [1, "text-xs", "mt-1"], [1, "p-4", "bg-slate-50", "dark:bg-slate-800/60", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "space-y-2", "font-mono", "text-xs"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-2", "text-[11px]"], [1, "font-bold", "text-emerald-600", "dark:text-emerald-400", "font-sans", "uppercase"], [1, "text-xs", "text-slate-800", "dark:text-slate-200", "font-sans", "leading-relaxed", "bg-white", "dark:bg-slate-900", "p-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-between", "text-[11px]", "pt-1", "text-slate-400", "font-sans"], [1, "text-slate-700", "dark:text-slate-300", "font-mono"], [1, "text-emerald-600", "dark:text-emerald-400", "font-bold", "flex", "items-center", "gap-1", "font-mono"], ["type", "button", 1, "p-5", "rounded-2xl", "border", "text-left", "transition-all", "cursor-pointer", "flex", "flex-col", "justify-between", "space-y-3", 3, "click"], [1, "w-10", "h-10", "rounded-xl", "bg-amber-100", "text-amber-600", "flex", "items-center", "justify-center"], [1, "!text-xl"], [1, "text-[10px]", "uppercase", "font-bold", "text-cyan-700", "bg-cyan-100", "px-2", "py-0.5", "rounded-full"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "w-10", "h-10", "rounded-xl", "bg-indigo-900/60", "text-indigo-400", "flex", "items-center", "justify-center"], [1, "text-[10px]", "uppercase", "font-bold", "text-indigo-400", "bg-indigo-950", "px-2", "py-0.5", "rounded-full", "border", "border-indigo-800"]], template: function Settings_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span");
            i0.ɵɵtext(5, "DoorMaster Pro Operations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 3);
            i0.ɵɵtext(7, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9, "Governance & Architecture");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 3);
            i0.ɵɵtext(11, "\u00B7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 4)(13, "mat-icon", 5);
            i0.ɵɵtext(14, "tune");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "System & Shop Settings");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "h1", 6)(18, "span");
            i0.ɵɵtext(19, "Settings Hub");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 7);
            i0.ɵɵtext(21, " MySQL & SMS Sync ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "p", 8);
            i0.ɵɵtext(23, " Manage your workshop branch location, GPS coordinates stored in MySQL, role-based recipient mobile phones, and automated SMS gateway credentials. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 9)(25, "div", 10);
            i0.ɵɵelement(26, "span", 11);
            i0.ɵɵelementStart(27, "div", 12)(28, "span", 13);
            i0.ɵɵtext(29, "Shop: ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "strong", 14);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(32, "div", 10)(33, "mat-icon", 15);
            i0.ɵɵtext(34, "sms");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 12)(36, "span", 13);
            i0.ɵɵtext(37, "Gateway: ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "strong", 16);
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(40, "div", 17)(41, "button", 18);
            i0.ɵɵlistener("click", function Settings_Template_button_click_41_listener() { return ctx.activeTab.set("shop"); });
            i0.ɵɵelementStart(42, "mat-icon", 19);
            i0.ɵɵtext(43, "storefront");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "span");
            i0.ɵɵtext(45, "Shop Location & Workshop");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "span", 20);
            i0.ɵɵtext(47, "MySQL DB");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "button", 18);
            i0.ɵɵlistener("click", function Settings_Template_button_click_48_listener() { return ctx.activeTab.set("phones"); });
            i0.ɵɵelementStart(49, "mat-icon", 19);
            i0.ɵɵtext(50, "phone_iphone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "span");
            i0.ɵɵtext(52, "SMS & Phone Directory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 20);
            i0.ɵɵtext(54, "6 Roles");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "button", 18);
            i0.ɵɵlistener("click", function Settings_Template_button_click_55_listener() { return ctx.activeTab.set("gateway"); });
            i0.ɵɵelementStart(56, "mat-icon", 19);
            i0.ɵɵtext(57, "settings_cell");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "span");
            i0.ɵɵtext(59, "SMS Gateway Credentials");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "button", 18);
            i0.ɵɵlistener("click", function Settings_Template_button_click_60_listener() { return ctx.activeTab.set("inbox"); });
            i0.ɵɵelementStart(61, "mat-icon", 19);
            i0.ɵɵtext(62, "chat");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "span");
            i0.ɵɵtext(64, "Live SMS Logs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "span", 20);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "button", 18);
            i0.ɵɵlistener("click", function Settings_Template_button_click_67_listener() { return ctx.activeTab.set("theme"); });
            i0.ɵɵelementStart(68, "mat-icon", 19);
            i0.ɵɵtext(69, "palette");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "span");
            i0.ɵɵtext(71, "Theme & Appearance");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(72, Settings_Conditional_72_Template, 9, 1, "div", 21);
            i0.ɵɵconditionalCreate(73, Settings_Conditional_73_Template, 130, 8, "div", 22);
            i0.ɵɵconditionalCreate(74, Settings_Conditional_74_Template, 71, 1, "div", 22);
            i0.ɵɵconditionalCreate(75, Settings_Conditional_75_Template, 48, 3, "div", 22);
            i0.ɵɵconditionalCreate(76, Settings_Conditional_76_Template, 17, 2, "div", 23);
            i0.ɵɵconditionalCreate(77, Settings_Conditional_77_Template, 30, 6, "div", 22);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(31);
            i0.ɵɵtextInterpolate(ctx.store.shopLocation().branchCode);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.store.smsGatewayConfig().provider);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeTab() === "shop" ? "bg-cyan-700 text-white shadow-sm" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800");
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap(ctx.activeTab() === "phones" ? "bg-cyan-700 text-white shadow-sm" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800");
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap(ctx.activeTab() === "gateway" ? "bg-cyan-700 text-white shadow-sm" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800");
            i0.ɵɵadvance(5);
            i0.ɵɵclassMap(ctx.activeTab() === "inbox" ? "bg-cyan-700 text-white shadow-sm" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.store.smsLogs().length, " ");
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.activeTab() === "theme" ? "bg-cyan-700 text-white shadow-sm" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.feedbackMessage() ? 72 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "shop" ? 73 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "phones" ? 74 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "gateway" ? 75 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "inbox" ? 76 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeTab() === "theme" ? 77 : -1);
        } }, dependencies: [CommonModule, MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, FormsModule, i3.SlicePipe], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Settings, [{
        type: Component,
        args: [{
                selector: 'app-settings',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule, SlicePipe],
                template: `
    <div class="space-y-6">
      
      <!-- Top Header Breadcrumb & Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>DoorMaster Pro Operations</span>
            <span aria-hidden="true">·</span>
            <span>Governance & Architecture</span>
            <span aria-hidden="true">·</span>
            <span class="inline-flex items-center gap-1 font-bold text-cyan-700 dark:text-cyan-400">
              <mat-icon class="!text-xs">tune</mat-icon>
              <span>System & Shop Settings</span>
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>Settings Hub</span>
            <span class="text-xs uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              MySQL & SMS Sync
            </span>
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage your workshop branch location, GPS coordinates stored in MySQL, role-based recipient mobile phones, and automated SMS gateway credentials.
          </p>
        </div>

        <!-- Quick Telemetry Badges -->
        <div class="flex flex-wrap items-center gap-2">
          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <div class="text-[11px] font-mono">
              <span class="text-slate-400">Shop: </span>
              <strong class="text-slate-800 dark:text-slate-200">{{ store.shopLocation().branchCode }}</strong>
            </div>
          </div>

          <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-2">
            <mat-icon class="!text-xs text-cyan-500">sms</mat-icon>
            <div class="text-[11px] font-mono">
              <span class="text-slate-400">Gateway: </span>
              <strong class="text-slate-800 dark:text-slate-200 uppercase">{{ store.smsGatewayConfig().provider }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          (click)="activeTab.set('shop')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'shop' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">storefront</mat-icon>
          <span>Shop Location & Workshop</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/40 text-cyan-200 font-normal">MySQL DB</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('phones')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'phones' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">phone_iphone</mat-icon>
          <span>SMS & Phone Directory</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/40 text-cyan-200 font-normal">6 Roles</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('gateway')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'gateway' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">settings_cell</mat-icon>
          <span>SMS Gateway Credentials</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('inbox')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'inbox' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">chat</mat-icon>
          <span>Live SMS Logs</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/40 text-cyan-200 font-normal">
            {{ store.smsLogs().length }}
          </span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('theme')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          [class]="activeTab() === 'theme' 
            ? 'bg-cyan-700 text-white shadow-sm' 
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'"
        >
          <mat-icon class="!text-sm">palette</mat-icon>
          <span>Theme & Appearance</span>
        </button>
      </div>

      <!-- Toast Feedback Message -->
      @if (feedbackMessage()) {
        <div class="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-200">
          <div class="flex items-center gap-2 font-semibold">
            <mat-icon class="!text-base text-emerald-600">check_circle</mat-icon>
            <span>{{ feedbackMessage() }}</span>
          </div>
          <button type="button" (click)="feedbackMessage.set(null)" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <mat-icon class="!text-sm">close</mat-icon>
          </button>
        </div>
      }

      <!-- TAB 1: SHOP LOCATION & WORKSHOP SETTINGS (STORED IN MYSQL DB) -->
      @if (activeTab() === 'shop') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Workshop Branch Location Settings</span>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                  MySQL Table: shop_locations
                </span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Saved in MySQL database and automatically linked to order booking counter, driver dispatch, and OpenStreetMap radar.
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[11px] text-slate-400 font-mono">Last updated: {{ store.shopLocation().updatedAt ? (store.shopLocation().updatedAt | slice:0:19) : 'Active' }}</span>
            </div>
          </div>

          <form [formGroup]="shopLocationForm" (ngSubmit)="saveShopLocation()" class="space-y-6 text-xs">
            
            <!-- Branch Identity -->
            <div class="space-y-3">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600">business</mat-icon>
                <span>Branch Identity</span>
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-2 space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Shop / Workshop Name *</label>
                  <input 
                    type="text" 
                    formControlName="shopName" 
                    placeholder="e.g. DoorMaster Flagship Workshop - Atelier A" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
                  />
                  <span class="text-[10px] text-slate-400">Used as the originating workshop name across all customer quotes & booking forms</span>
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Branch Code *</label>
                  <input 
                    type="text" 
                    formControlName="branchCode" 
                    placeholder="e.g. DM-ACC-01" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono font-bold"
                  />
                  <span class="text-[10px] text-slate-400">Internal code (e.g. DM-ACC-01)</span>
                </div>
              </div>
            </div>

            <!-- Physical Location & Address -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600">pin_drop</mat-icon>
                <span>Physical Address & Corridor</span>
              </h3>
              <div class="space-y-1">
                <label class="font-bold text-slate-700 dark:text-slate-300">Street Address & Landmark *</label>
                <input 
                  type="text" 
                  formControlName="address" 
                  placeholder="e.g. Plot 48, Spintex Road Industrial Area" 
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">City *</label>
                  <input 
                    type="text" 
                    formControlName="city" 
                    placeholder="e.g. Accra" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Region</label>
                  <input 
                    type="text" 
                    formControlName="region" 
                    placeholder="e.g. Greater Accra" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <!-- GPS Coordinates & Accra Hub Quick Presets -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-cyan-600">my_location</mat-icon>
                  <span>Store Origin GPS Coordinates</span>
                </h3>
                <button 
                  type="button" 
                  (click)="detectBrowserGps()" 
                  class="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <mat-icon class="!text-xs">gps_fixed</mat-icon>
                  <span>Detect Device GPS</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Latitude *</label>
                  <input 
                    type="number" 
                    step="any"
                    formControlName="latitude" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Longitude *</label>
                  <input 
                    type="number" 
                    step="any"
                    formControlName="longitude" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Quick Greater Accra Hub Presets:</span>
                <div class="flex flex-wrap gap-2">
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.6231, -0.1582, 'Plot 48, Spintex Road Industrial Area')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    🏭 Spintex Atelier
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.5560, -0.2012, 'High Street Boulevard, Central Business District')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    🏛️ Accra Central
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.6380, -0.1550, 'Boundary Road, East Legon')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    📍 East Legon
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.6698, -0.0166, 'Harbor Commercial Gateway, Tema')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    🚢 Tema Harbor
                  </button>
                  <button 
                    type="button" 
                    (click)="setCoordinates(5.5840, -0.1780, 'Rangoon Lane, Cantonments Diplomatic Zone')" 
                    class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    📍 Cantonments
                  </button>
                </div>
              </div>
            </div>

            <!-- Workshop Operations & Contact Details -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <mat-icon class="!text-sm text-cyan-600">contact_phone</mat-icon>
                <span>Operations, Counter & Manager Details</span>
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Shop Manager Name</label>
                  <input 
                    type="text" 
                    formControlName="managerName" 
                    placeholder="e.g. Kwame Mensah" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Dispatch Logistics Radius (km) *</label>
                  <div class="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="1" 
                      max="200" 
                      formControlName="dispatchRadiusKm" 
                      class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                    <span class="text-xs text-slate-400 font-bold">km</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Direct Phone (SMS Alerts) *</label>
                  <input 
                    type="text" 
                    formControlName="phone" 
                    placeholder="+233 24 100 0002" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-300">Workshop Official Email</label>
                  <input 
                    type="email" 
                    formControlName="email" 
                    placeholder="spintex.workshop@doormasterops.com" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-bold text-slate-700 dark:text-slate-300">Operating / Dispatch Hours</label>
                <input 
                  type="text" 
                  formControlName="operatingHours" 
                  placeholder="Mon - Sat: 08:00 - 18:00" 
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Submit Action -->
            <div class="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <mat-icon class="!text-sm text-emerald-600">database</mat-icon>
                <span>Persisted in MySQL table <code class="font-mono text-cyan-600 dark:text-cyan-400">shop_locations</code></span>
              </div>

              <button 
                type="submit" 
                [disabled]="!shopLocationForm.valid || isSavingShopLocation()"
                class="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                @if (isSavingShopLocation()) {
                  <mat-icon class="!text-sm animate-spin">refresh</mat-icon>
                  <span>Saving Location...</span>
                } @else {
                  <mat-icon class="!text-sm">save</mat-icon>
                  <span>Save Location</span>
                }
              </button>
            </div>
          </form>
        </div>
      }

      <!-- TAB 2: USER PHONE DIRECTORY (SMS ROUTING) -->
      @if (activeTab() === 'phones') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>User Phone Directory & SMS Routing</span>
              <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                Automated SMS Delivery
              </span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Each user persona has a verified mobile number. When a shop manager books an order, an installer is assigned, or a driver departs, automated SMS messages route instantly to these phones.
            </p>
          </div>

          <form [formGroup]="phonesForm" (ngSubmit)="savePhones()" class="space-y-5 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold">
                  <mat-icon class="!text-sm">storefront</mat-icon>
                  <span>Shop Attendant / Manager *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="shop_manager"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 100 0002"
                />
                <span class="text-[10px] text-slate-400 block">Receives booking confirmations & installer assignment SMS</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                  <mat-icon class="!text-sm">admin_panel_settings</mat-icon>
                  <span>Operations Manager *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="manager"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 100 0001"
                />
                <span class="text-[10px] text-slate-400 block">Receives booking alerts when shop manager creates requests</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold">
                  <mat-icon class="!text-sm">local_shipping</mat-icon>
                  <span>Dispatch Driver (Transport) *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="dispatcher"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 555 0192"
                />
                <span class="text-[10px] text-slate-400 block">Receives truck cargo manifests & customer site route coordinates</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <mat-icon class="!text-sm">handyman</mat-icon>
                  <span>Field Technician / Installer *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="installer"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 881 0293"
                />
                <span class="text-[10px] text-slate-400 block">Receives job assignments & customer smart lock fitting alerts</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold">
                  <mat-icon class="!text-sm">person_pin_circle</mat-icon>
                  <span>Client / Site Owner *</span>
                </div>
                <input 
                  type="text" 
                  formControlName="client"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 883 9921"
                />
                <span class="text-[10px] text-slate-400 block">Receives booking receipt, live delivery approach & ETA links</span>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <div class="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
                  <mat-icon class="!text-sm">account_balance_wallet</mat-icon>
                  <span>Accounts & Finance Officer</span>
                </div>
                <input 
                  type="text" 
                  formControlName="account_officer"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white font-medium"
                  placeholder="+233 24 100 0005"
                />
                <span class="text-[10px] text-slate-400 block">Receives counter deposit verifications & technician bonus release requests</span>
              </div>

            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit" 
                class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm">save</mat-icon>
                <span>Save Phone Directory</span>
              </button>
            </div>
          </form>
        </div>
      }

      <!-- TAB 3: SMS GATEWAY CONFIGURATION -->
      @if (activeTab() === 'gateway') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>SMS Gateway Credentials & Provider Settings</span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Connect Hubtel, Arkesel, or Twilio API keys to send real telco SMS messages to technicians and homeowners across Ghana.
            </p>
          </div>

          <form [formGroup]="gatewayForm" (ngSubmit)="saveGateway()" class="space-y-5 text-xs">
            <div class="space-y-1">
              <label class="block font-bold text-slate-700 dark:text-slate-300">Select Active SMS Gateway Provider *</label>
              <select 
                formControlName="provider"
                class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
              >
                <option value="simulator">Built-in Interactive Ghana Telco SMS Simulator (Recommended for Testing)</option>
                <option value="arkesel">Arkesel SMS Gateway (Ghana / Africa Telco Direct)</option>
                <option value="hubtel">Hubtel Programmable SMS Gateway (Ghana Direct)</option>
                <option value="twilio">Twilio Global Programmable SMS</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">Sender ID / Brand Name *</label>
                <input 
                  type="text" 
                  formControlName="senderId"
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  placeholder="DoorMaster"
                />
                <span class="text-[10px] text-slate-400">Max 11 alphanumeric characters approved by telcos</span>
              </div>

              <div class="space-y-1">
                <label class="block font-bold text-slate-700 dark:text-slate-300">API Key / Token</label>
                <input 
                  type="password" 
                  formControlName="apiKey"
                  class="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  placeholder="e.g. ark_live_994827163"
                />
              </div>
            </div>

            @if (gatewayForm.get('provider')?.value === 'hubtel') {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Hubtel Client ID</label>
                  <input 
                    type="text" 
                    formControlName="hubtelClientId"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="e.g. hbt_cli_88192"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Hubtel Client Secret</label>
                  <input 
                    type="password" 
                    formControlName="hubtelClientSecret"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            }

            @if (gatewayForm.get('provider')?.value === 'twilio') {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Twilio Account SID</label>
                  <input 
                    type="text" 
                    formControlName="twilioAccountSid"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Twilio Auth Token</label>
                  <input 
                    type="password" 
                    formControlName="twilioAuthToken"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            }

            <div class="flex items-center gap-2 pt-2">
              <input 
                id="simModeCheckPage"
                type="checkbox" 
                formControlName="simulationMode"
                class="rounded text-cyan-600 focus:ring-cyan-500"
              />
              <label for="simModeCheckPage" class="font-medium text-slate-700 dark:text-slate-300">
                Enable In-App Telco Simulator (records SMS telemetry in live audit inbox)
              </label>
            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button 
                type="button" 
                (click)="sendTestSms()"
                class="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="!text-sm text-amber-500">send</mat-icon>
                <span>Send Test SMS Ping</span>
              </button>

              <button 
                type="submit" 
                class="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <mat-icon class="!text-sm">save</mat-icon>
                <span>Save Gateway Settings</span>
              </button>
            </div>
          </form>
        </div>
      }

      <!-- TAB 4: LIVE SMS LOGS & DISPATCH INBOX -->
      @if (activeTab() === 'inbox') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>SMS Dispatch Telemetry & Live Inbox</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                  {{ store.smsLogs().length }} messages sent
                </span>
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every transaction, booking, installer assignment, and driver transit status triggers an audit-logged SMS.
              </p>
            </div>

            <button 
              type="button" 
              (click)="sendTestSms()"
              class="px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <mat-icon class="!text-sm text-cyan-600">send</mat-icon>
              <span>Test SMS Ping</span>
            </button>
          </div>

          @if (store.smsLogs().length === 0) {
            <div class="p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center text-slate-400">
              <mat-icon class="!text-4xl mb-2 text-slate-300 dark:text-slate-600">sms</mat-icon>
              <p class="font-bold text-sm">No SMS messages logged yet.</p>
              <p class="text-xs mt-1">Booking an installation or assigning a driver will log automated messages here.</p>
            </div>
          } @else {
            <div class="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              @for (sms of store.smsLogs(); track sms.id) {
                <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-xs">
                  <div class="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-emerald-600 dark:text-emerald-400 font-sans uppercase">
                        [{{ sms.senderId }}] &rarr; {{ sms.recipientName }} ({{ sms.recipientRole }})
                      </span>
                      <span class="text-slate-400">{{ sms.recipientPhone }}</span>
                    </div>
                    <span class="text-slate-400">{{ sms.timestamp | slice:0:19 }}</span>
                  </div>

                  <p class="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    {{ sms.messageText }}
                  </p>

                  <div class="flex items-center justify-between text-[11px] pt-1 text-slate-400 font-sans">
                    <span>Trigger Event: <strong class="text-slate-700 dark:text-slate-300 font-mono">{{ sms.triggerEvent }}</strong></span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                      <mat-icon class="!text-sm">done_all</mat-icon>
                      <span>Delivered</span>
                    </span>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- TAB 5: THEME & APPEARANCE -->
      @if (activeTab() === 'theme') {
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Theme & Interface Preferences</span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize display aesthetics, color modes, and backend data synchronization.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Light Mode Card -->
            <button
              type="button"
              (click)="setLightMode()"
              class="p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3"
              [class]="!themeStore.isDark() 
                ? 'border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'"
            >
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <mat-icon class="!text-xl">light_mode</mat-icon>
                </div>
                @if (!themeStore.isDark()) {
                  <span class="text-[10px] uppercase font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">Active</span>
                }
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Clean Light Theme</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">High-contrast daytime visibility for site technicians & dispatch desk.</p>
              </div>
            </button>

            <!-- Dark Mode Card -->
            <button
              type="button"
              (click)="setDarkMode()"
              class="p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3"
              [class]="themeStore.isDark() 
                ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20 shadow-sm' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'"
            >
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center">
                  <mat-icon class="!text-xl">dark_mode</mat-icon>
                </div>
                @if (themeStore.isDark()) {
                  <span class="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">Active</span>
                }
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Sleek Obsidian Dark Theme</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">OLED-optimized dark palette for late-night dispatch tracking.</p>
              </div>
            </button>
          </div>
        </div>
      }

    </div>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Settings, { className: "Settings", filePath: "frontend/src/app/views/settings/settings.ts", lineNumber: 778 }); })();
