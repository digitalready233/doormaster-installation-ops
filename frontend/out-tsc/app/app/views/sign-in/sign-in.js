import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function SignIn_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Select ");
    i0.ɵɵelementStart(1, "strong", 43);
    i0.ɵɵtext(2, "Demo Option");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " to test features with simulated personas. ");
} }
function SignIn_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Connected via ");
    i0.ɵɵelementStart(1, "strong", 43);
    i0.ɵɵtext(2, "API Option");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " to live MySQL database \u2014 zero mock personas, only real user records. ");
} }
function SignIn_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 44)(2, "mat-icon", 45);
    i0.ɵɵtext(3, "science");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6, "Demo Mode Active:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " Instant 1-click test access with simulated fleet, live Accra radar telemetry, and dummy Telco SMS logs.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 46);
    i0.ɵɵlistener("click", function SignIn_Conditional_49_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectAuthMode("api")); });
    i0.ɵɵtext(9, " Switch to Live MySQL API \u2192 ");
    i0.ɵɵelementEnd()();
} }
function SignIn_Conditional_50_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Connected to MySQL Database (");
    i0.ɵɵelementStart(1, "span", 50);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_2_0 = ctx_r1.store.dbStatus()) == null ? null : tmp_2_0.database);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2022 ", (tmp_3_0 = ctx_r1.store.dbStatus()) == null ? null : tmp_3_0.doorCount, " Doors in DB \u2022 Live Data Mode). ");
} }
function SignIn_Conditional_50_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Checking MySQL connection on 127.0.0.1:3306... ");
} }
function SignIn_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26)(1, "div", 47)(2, "mat-icon", 48);
    i0.ɵɵtext(3, "storage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6, "API Mode Active:");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, SignIn_Conditional_50_Conditional_7_Template, 4, 2)(8, SignIn_Conditional_50_Conditional_8_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 49);
    i0.ɵɵlistener("click", function SignIn_Conditional_50_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectAuthMode("demo")); });
    i0.ɵɵtext(10, " Switch to Demo Mode \u2192 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(((tmp_1_0 = ctx_r1.store.dbStatus()) == null ? null : tmp_1_0.connected) ? 7 : 8);
} }
function SignIn_Conditional_53_For_13_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 76);
    i0.ɵɵtext(1, "check");
    i0.ɵɵelementEnd();
} }
function SignIn_Conditional_53_For_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 62);
    i0.ɵɵlistener("click", function SignIn_Conditional_53_For_13_Template_button_click_0_listener() { const p_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectPersona(p_r5)); });
    i0.ɵɵelementStart(1, "div", 63)(2, "mat-icon", 64);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 65)(5, "div", 66)(6, "span", 67);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 68);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 69);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 70)(13, "span", 71)(14, "mat-icon", 72);
    i0.ɵɵtext(15, "badge");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 73);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 74)(22, "div", 75);
    i0.ɵɵconditionalCreate(23, SignIn_Conditional_53_For_13_Conditional_23_Template, 2, 0, "mat-icon", 76);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-slate-800", ctx_r1.selectedPersona().id === p_r5.id)("border-emerald-500", ctx_r1.selectedPersona().id === p_r5.id)("shadow-md", ctx_r1.selectedPersona().id === p_r5.id)("bg-slate-900/60", ctx_r1.selectedPersona().id !== p_r5.id)("border-slate-800", ctx_r1.selectedPersona().id !== p_r5.id)("hover:border-slate-700", ctx_r1.selectedPersona().id !== p_r5.id)("hover:bg-slate-800/60", ctx_r1.selectedPersona().id !== p_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(p_r5.gradient + " " + p_r5.borderColor);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(p_r5.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r5.icon);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", p_r5.title, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", p_r5.badge, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", p_r5.responsibilities, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", p_r5.name, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r5.defaultEmail);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("border-emerald-500", ctx_r1.selectedPersona().id === p_r5.id)("bg-emerald-500", ctx_r1.selectedPersona().id === p_r5.id)("border-slate-600", ctx_r1.selectedPersona().id !== p_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.selectedPersona().id === p_r5.id ? 23 : -1);
} }
function SignIn_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 51)(2, "div", 7)(3, "mat-icon", 52);
    i0.ɵɵtext(4, "manage_accounts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2", 53);
    i0.ɵɵtext(6, " Select Demo Persona ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 54);
    i0.ɵɵtext(8, " Instant Test ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 55);
    i0.ɵɵtext(10, " Click any team persona to auto-fill credentials and immediately explore their customized workspace. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 56);
    i0.ɵɵrepeaterCreate(12, SignIn_Conditional_53_For_13_Template, 24, 31, "button", 57, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 58)(15, "span", 59)(16, "mat-icon", 60);
    i0.ɵɵtext(17, "security");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " Enterprise RBAC Sandbox ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 61);
    i0.ɵɵtext(20, " Simulated Local Store ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r1.personaList);
} }
function SignIn_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "div")(2, "div", 51)(3, "div", 7)(4, "mat-icon", 52);
    i0.ɵɵtext(5, "dns");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 53);
    i0.ɵɵtext(7, " Live MySQL Enterprise Gateway ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 77);
    i0.ɵɵelement(9, "span", 78);
    i0.ɵɵtext(10, " Production API ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 79);
    i0.ɵɵtext(12, " In ");
    i0.ɵɵelementStart(13, "strong", 80);
    i0.ɵɵtext(14, "API Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15, ", persona fast-passes and dummy seed installations are removed. You are directly communicating with the Node.js Express backend and live MySQL schema managed via Prisma ORM. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 81)(17, "div", 82)(18, "div", 83)(19, "mat-icon", 84);
    i0.ɵɵtext(20, "database");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 85);
    i0.ɵɵtext(22, "Database Engine");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 86);
    i0.ɵɵtext(24, "Prisma + MySQL 8.0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 87);
    i0.ɵɵtext(26, "doormaster_ops on 127.0.0.1:3306");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 82)(28, "div", 83)(29, "mat-icon", 88);
    i0.ɵɵtext(30, "inventory_2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 85);
    i0.ɵɵtext(32, "Live Doors Catalog");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 89);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 87);
    i0.ɵɵtext(36, "Scraped & Stored in DB");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div", 82)(38, "div", 83)(39, "mat-icon", 90);
    i0.ɵɵtext(40, "lock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 85);
    i0.ɵɵtext(42, "Cryptographic Auth");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 86);
    i0.ɵɵtext(44, "PBKDF2-SHA512");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 87);
    i0.ɵɵtext(46, "Salted Hashes in MySQL");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 82)(48, "div", 83)(49, "mat-icon", 91);
    i0.ɵɵtext(50, "category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span", 85);
    i0.ɵɵtext(52, "Lines & Series");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "div", 86);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 87);
    i0.ɵɵtext(56, "Architectural Doors");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(57, "div", 92)(58, "div", 93)(59, "mat-icon", 88);
    i0.ɵɵtext(60, "verified_user");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "span");
    i0.ɵɵtext(62, "Zero Dummy Data Verification");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "p", 94);
    i0.ɵɵtext(64, " All installation work orders, photos, GPS clock sessions, and SMS logs in this mode are created by real registered users and preserved permanently in MySQL. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(65, "div", 95)(66, "div", 7)(67, "button", 96);
    i0.ɵɵlistener("click", function SignIn_Conditional_54_Template_button_click_67_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setAuthSubTab("signin")); });
    i0.ɵɵtext(68, " Sign In Existing User ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "button", 96);
    i0.ɵɵlistener("click", function SignIn_Conditional_54_Template_button_click_69_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setAuthSubTab("register")); });
    i0.ɵɵtext(70, " Register New User ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(71, "span", 97);
    i0.ɵɵtext(72, " Host: 127.0.0.1:3306 ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(34);
    i0.ɵɵtextInterpolate1(" ", ((tmp_1_0 = ctx_r1.store.dbStatus()) == null ? null : tmp_1_0.doorCount) || ctx_r1.store.doors().length, " Models ");
    i0.ɵɵadvance(20);
    i0.ɵɵtextInterpolate1(" ", ((tmp_2_0 = ctx_r1.store.dbStatus()) == null ? null : tmp_2_0.categoryCount) || 20, " Categories ");
    i0.ɵɵadvance(13);
    i0.ɵɵclassProp("bg-emerald-500", ctx_r1.authSubTab() === "signin")("text-slate-950", ctx_r1.authSubTab() === "signin")("text-slate-300", ctx_r1.authSubTab() !== "signin")("bg-slate-900", ctx_r1.authSubTab() !== "signin");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", ctx_r1.authSubTab() === "register")("text-slate-950", ctx_r1.authSubTab() === "register")("text-slate-300", ctx_r1.authSubTab() !== "register")("bg-slate-900", ctx_r1.authSubTab() !== "register");
} }
function SignIn_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Launch Demo Workspace ");
} }
function SignIn_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sign In via MySQL API ");
} }
function SignIn_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Create Real Account ");
} }
function SignIn_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 98)(2, "mat-icon", 99);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 100)(5, "div", 101);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 102);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 103);
    i0.ɵɵtext(10, " Ready ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.selectedPersona().icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.selectedPersona().name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.selectedPersona().badge, " Access");
} }
function SignIn_Conditional_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "mat-icon", 104);
    i0.ɵɵtext(2, "error_outline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.authErrorMessage());
} }
function SignIn_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "mat-icon", 105);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.authSuccessMessage());
} }
function SignIn_Conditional_70_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 122);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authMode() === "demo" ? "Launching Demo..." : "Authenticating with MySQL...", " ");
} }
function SignIn_Conditional_70_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 116);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.authMode() === "demo" ? "rocket_launch" : "key");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authMode() === "demo" ? "Launch " + ctx_r1.selectedPersona().title + " (Demo)" : "Sign In & Connect Actual Data (API)", " ");
} }
function SignIn_Conditional_70_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 106);
    i0.ɵɵlistener("ngSubmit", function SignIn_Conditional_70_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleFormSubmit()); });
    i0.ɵɵelementStart(1, "div")(2, "label", 107);
    i0.ɵɵtext(3, " Account Email ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 108)(5, "div", 109)(6, "mat-icon", 99);
    i0.ɵɵtext(7, "alternate_email");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "input", 110);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div")(10, "div", 111)(11, "label", 112);
    i0.ɵɵtext(12, " Password ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 113);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 108)(16, "div", 109)(17, "mat-icon", 99);
    i0.ɵɵtext(18, "lock");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(19, "input", 114);
    i0.ɵɵelementStart(20, "button", 115);
    i0.ɵɵlistener("click", function SignIn_Conditional_70_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleShowPassword()); });
    i0.ɵɵelementStart(21, "mat-icon", 116);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(23, "div", 117)(24, "label", 118);
    i0.ɵɵelement(25, "input", 119);
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Remember session");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "span", 120);
    i0.ɵɵtext(29, "256-bit TLS");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "button", 121);
    i0.ɵɵconditionalCreate(31, SignIn_Conditional_70_Conditional_31_Template, 3, 1)(32, SignIn_Conditional_70_Conditional_32_Template, 4, 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.loginForm);
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authMode() === "demo" ? "Demo: auto-filled" : "MySQL PBKDF2 hash", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("type", ctx_r1.showPassword() ? "text" : "password");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.showPassword() ? "visibility_off" : "visibility");
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("bg-emerald-500", ctx_r1.authMode() === "demo")("hover:bg-emerald-400", ctx_r1.authMode() === "demo")("text-slate-950", ctx_r1.authMode() === "demo")("shadow-emerald-500/20", ctx_r1.authMode() === "demo")("bg-indigo-600", ctx_r1.authMode() === "api")("hover:bg-indigo-500", ctx_r1.authMode() === "api")("text-white", ctx_r1.authMode() === "api")("shadow-indigo-600/30", ctx_r1.authMode() === "api");
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSubmitting() ? 31 : 32);
} }
function SignIn_Conditional_71_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 122);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Creating Account in MySQL...");
    i0.ɵɵelementEnd();
} }
function SignIn_Conditional_71_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 116);
    i0.ɵɵtext(1, "person_add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Create Account & Connect to MySQL");
    i0.ɵɵelementEnd();
} }
function SignIn_Conditional_71_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 123);
    i0.ɵɵlistener("ngSubmit", function SignIn_Conditional_71_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleRegisterSubmit()); });
    i0.ɵɵelementStart(1, "div")(2, "label", 124);
    i0.ɵɵtext(3, " Full Name ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 108)(5, "div", 109)(6, "mat-icon", 116);
    i0.ɵɵtext(7, "badge");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "input", 125);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div")(10, "label", 126);
    i0.ɵɵtext(11, " Email Address ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 108)(13, "div", 109)(14, "mat-icon", 116);
    i0.ɵɵtext(15, "alternate_email");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(16, "input", 127);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "label", 128);
    i0.ɵɵtext(19, " Operational Role ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "select", 129)(21, "option", 130);
    i0.ɵɵtext(22, "Operations Manager (Director)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "option", 131);
    i0.ɵɵtext(24, "Field Technician / Master Installer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "option", 132);
    i0.ɵɵtext(26, "Client / Site Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "option", 133);
    i0.ɵɵtext(28, "Accounts & Finance Officer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 134);
    i0.ɵɵtext(30, "Shop & Fabrication Bays Head");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "option", 135);
    i0.ɵɵtext(32, "Logistics Dispatcher / Driver");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "div")(34, "label", 136);
    i0.ɵɵtext(35, " Phone Number (SMS Gateway) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 108)(37, "div", 109)(38, "mat-icon", 116);
    i0.ɵɵtext(39, "phone");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(40, "input", 137);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div")(42, "label", 138);
    i0.ɵɵtext(43, " Account Password ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 108)(45, "div", 109)(46, "mat-icon", 116);
    i0.ɵɵtext(47, "lock");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(48, "input", 139);
    i0.ɵɵelementStart(49, "button", 115);
    i0.ɵɵlistener("click", function SignIn_Conditional_71_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleShowPassword()); });
    i0.ɵɵelementStart(50, "mat-icon", 116);
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(52, "button", 140);
    i0.ɵɵconditionalCreate(53, SignIn_Conditional_71_Conditional_53_Template, 3, 0)(54, SignIn_Conditional_71_Conditional_54_Template, 4, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.registerForm);
    i0.ɵɵadvance(48);
    i0.ɵɵproperty("type", ctx_r1.showPassword() ? "text" : "password");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.showPassword() ? "visibility_off" : "visibility");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSubmitting() ? 53 : 54);
} }
function SignIn_Conditional_72_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 143)(1, "mat-icon", 144);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const feat_r9 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(feat_r9);
} }
function SignIn_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "span", 141);
    i0.ɵɵtext(2, " Role Privileges & Menus: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 142);
    i0.ɵɵrepeaterCreate(4, SignIn_Conditional_72_For_5_Template, 5, 1, "li", 143, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.selectedPersona().features);
} }
function SignIn_Conditional_74_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Want to connect to live MySQL?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 145);
    i0.ɵɵlistener("click", function SignIn_Conditional_74_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleMode()); });
    i0.ɵɵtext(3, " Switch to API Mode \u2192 ");
    i0.ɵɵelementEnd();
} }
function SignIn_Conditional_75_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 145);
    i0.ɵɵlistener("click", function SignIn_Conditional_75_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setAuthSubTab(ctx_r1.authSubTab() === "signin" ? "register" : "signin")); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authSubTab() === "signin" ? "Don't have an account?" : "Already have an account?", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authSubTab() === "signin" ? "Register New User" : "Sign In with Email", " ");
} }
export class SignIn {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    fb = inject(FormBuilder);
    router = inject(Router);
    signInCompleted = output();
    goToLanding = output();
    navigateToLanding() {
        this.goToLanding.emit();
        this.router.navigate(['/landing']);
    }
    navigateToDashboard(role) {
        this.signInCompleted.emit(role);
        this.store.currentRole.set(role);
        let target = 'overview';
        switch (role) {
            case 'installer':
                target = 'installer';
                break;
            case 'client':
                target = 'client';
                break;
            case 'account_officer':
                target = 'finance';
                break;
            case 'shop_manager':
                target = 'shop';
                break;
            case 'dispatcher':
                target = 'dispatcher';
                break;
            case 'manager':
                target = 'overview';
                break;
            default: target = 'overview';
        }
        this.router.navigate(['/' + target]);
    }
    authMode = signal('demo', ...(ngDevMode ? [{ debugName: "authMode" }] : /* istanbul ignore next */ []));
    authSubTab = signal('signin', ...(ngDevMode ? [{ debugName: "authSubTab" }] : /* istanbul ignore next */ []));
    showPassword = signal(false, ...(ngDevMode ? [{ debugName: "showPassword" }] : /* istanbul ignore next */ []));
    isSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    authErrorMessage = signal(null, ...(ngDevMode ? [{ debugName: "authErrorMessage" }] : /* istanbul ignore next */ []));
    authSuccessMessage = signal(null, ...(ngDevMode ? [{ debugName: "authSuccessMessage" }] : /* istanbul ignore next */ []));
    personaList = [
        {
            id: 'manager',
            title: 'Operations Manager',
            badge: 'Full Oversight',
            icon: 'admin_panel_settings',
            color: 'text-slate-200',
            borderColor: 'border-slate-700',
            gradient: 'bg-gradient-to-br from-slate-700 to-slate-900',
            defaultEmail: 'manager@doormasterops.com',
            name: 'Sarah Sterling (Ops Director)',
            responsibilities: 'Dispatch, live technician radar map, assign jobs, approve performance bonuses',
            features: ['Operations Dashboard & Fleet Radar', 'Assign Installers & Reschedule', 'Bonus Rules & Approvals Matrix', 'Access Governance']
        },
        {
            id: 'installer',
            title: 'Field Technician / Installer',
            badge: 'Field Workbench',
            icon: 'handyman',
            color: 'text-emerald-400',
            borderColor: 'border-emerald-500/40',
            gradient: 'bg-gradient-to-br from-emerald-950 to-slate-900',
            defaultEmail: 'm.vance@doormasterops.com',
            name: 'Marcus Vance (Senior Master Installer)',
            responsibilities: 'On-site clock in/out, step checklists, hardware photos, bonus ledger',
            features: ['Active Job Site Workbench', 'GPS Clock In & Out Verification', 'Multi-Angle Photos & Client Handover', 'Personal Bonus Earnings Tracker']
        },
        {
            id: 'client',
            title: 'Client / Site Owner',
            badge: 'Live Tracking',
            icon: 'navigation',
            color: 'text-indigo-400',
            borderColor: 'border-indigo-500/40',
            gradient: 'bg-gradient-to-br from-indigo-950 to-slate-900',
            defaultEmail: 'client@doormasterops.com',
            name: 'Kwame Mensah (Cantonments Villa)',
            responsibilities: 'Live installer ETA, door & smart lock specs, sign verification certificate',
            features: ['Real-Time Installer Live ETA', 'Door Specifications & Verification', 'Digital Certificate Handover Signoff', 'SMS Delivery Log Record']
        },
        {
            id: 'account_officer',
            title: 'Accounts & Finance Officer',
            badge: 'Accounts Ledger',
            icon: 'account_balance_wallet',
            color: 'text-amber-400',
            borderColor: 'border-amber-500/40',
            gradient: 'bg-gradient-to-br from-amber-950 to-slate-900',
            defaultEmail: 'finance@doormasterops.com',
            name: 'Abena Osei (Chief Financial Officer)',
            responsibilities: 'Financial audit, invoice creation, technician bonus disbursements, profit margins',
            features: ['Accounts & Invoicing Ledger', 'Technician Bonus Payouts', 'Profitability & Margin Analytics', 'Job Financial Audit Trails']
        },
        {
            id: 'shop_manager',
            title: 'Shop & Fabrication Bays',
            badge: 'Booking & Dispatch',
            icon: 'storefront',
            color: 'text-cyan-400',
            borderColor: 'border-cyan-500/40',
            gradient: 'bg-gradient-to-br from-cyan-950 to-slate-900',
            defaultEmail: 'shop@doormasterops.com',
            name: 'Elena Rostova (Master Joiner)',
            responsibilities: 'Fabrication bays, hardware package assembly, and cargo site dispatch',
            features: ['Door Slab Custom Fabrication Bays', 'Precision Hardware Pack Assembly', 'Cargo Fleet Site Dispatching', 'Workshop Quality Inspection']
        },
        {
            id: 'dispatcher',
            title: 'Logistics Dispatcher / Driver',
            badge: 'Heavy Fleet',
            icon: 'local_shipping',
            color: 'text-teal-400',
            borderColor: 'border-teal-500/40',
            gradient: 'bg-gradient-to-br from-teal-950 to-slate-900',
            defaultEmail: 'dispatch@doormasterops.com',
            name: 'Emmanuel Kojo (Lead Logistics Driver)',
            responsibilities: 'Heavy truck transport, cargo checklist loading, en route telemetry, and site handover',
            features: ['Logistics Truck Fleet Manifest', 'Door Slab & Smart Lock Cargo Inspection', 'Real-Time Road En Route Status', 'Site Handover to Field Technician']
        }
    ];
    selectedPersona = signal(this.personaList[0], ...(ngDevMode ? [{ debugName: "selectedPersona" }] : /* istanbul ignore next */ []));
    loginForm = this.fb.group({
        email: [this.personaList[0].defaultEmail, [Validators.required, Validators.email]],
        password: ['DoorMaster2026!*', [Validators.required, Validators.minLength(6)]],
        rememberMe: [true]
    });
    registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        role: ['manager', [Validators.required]],
        phone: ['+233 24 555 0199', [Validators.required]],
        password: ['DoorMaster2026!*', [Validators.required, Validators.minLength(6)]]
    });
    constructor() {
        // Sync initial authMode from store
        this.authMode.set(this.store.dataMode());
        // Check DB status on mount
        this.store.checkDbStatus();
    }
    selectAuthMode(mode) {
        this.authMode.set(mode);
        this.store.setDataMode(mode);
        this.authErrorMessage.set(null);
        this.authSuccessMessage.set(null);
    }
    setAuthSubTab(tab) {
        this.authSubTab.set(tab);
        this.authErrorMessage.set(null);
        this.authSuccessMessage.set(null);
    }
    toggleMode() {
        const nextMode = this.authMode() === 'demo' ? 'api' : 'demo';
        this.selectAuthMode(nextMode);
    }
    selectPersona(persona) {
        this.selectedPersona.set(persona);
        this.loginForm.patchValue({
            email: persona.defaultEmail,
            password: 'DoorMaster2026!*'
        });
        this.authErrorMessage.set(null);
    }
    toggleShowPassword() {
        this.showPassword.update(p => !p);
    }
    async handleFormSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const email = this.loginForm.value.email || '';
        const password = this.loginForm.value.password || '';
        this.isSubmitting.set(true);
        this.authErrorMessage.set(null);
        this.authSuccessMessage.set(null);
        if (this.authMode() === 'api') {
            // Connect to actual data by signing in against MySQL
            const res = await this.store.signInWithApi(email, password);
            this.isSubmitting.set(false);
            if (res.success && res.user) {
                this.authSuccessMessage.set(`Authenticated with MySQL database as ${res.user.name}`);
                this.alert.toastSuccess('Authenticated', `Welcome back, ${res.user.name}!`);
                setTimeout(() => {
                    this.navigateToDashboard(res.user.role);
                }, 400);
            }
            else {
                const errorMsg = res.message || 'Authentication with MySQL failed.';
                this.authErrorMessage.set(errorMsg);
                this.alert.error('Sign In Failed', errorMsg);
            }
        }
        else {
            // Demo Mode: Fast-pass launch with demo data
            this.store.setDataMode('demo');
            setTimeout(() => {
                this.isSubmitting.set(false);
                const role = this.selectedPersona().id;
                this.navigateToDashboard(role);
            }, 500);
        }
    }
    async handleRegisterSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        const { name, email, role, phone, password } = this.registerForm.value;
        this.isSubmitting.set(true);
        this.authErrorMessage.set(null);
        this.authSuccessMessage.set(null);
        const res = await this.store.registerWithApi(name || '', email || '', role || 'manager', phone || '', password || '');
        this.isSubmitting.set(false);
        if (res.success && res.user) {
            if (res.user.status === 'pending') {
                const pendingMsg = `Registration submitted for ${res.user.name}! Your account is pending Operations Manager approval before you can sign in.`;
                this.authSuccessMessage.set(pendingMsg);
                this.alert.success('Registration Submitted', pendingMsg, 5000);
            }
            else {
                this.authSuccessMessage.set(`Live MySQL Account Created! Logged in as ${res.user.name}`);
                this.alert.success('Account Created', `Live account registered for ${res.user.name}!`);
                setTimeout(() => {
                    this.navigateToDashboard(res.user.role);
                }, 500);
            }
        }
        else {
            const regError = res.message || 'Registration in MySQL failed.';
            this.authErrorMessage.set(regError);
            this.alert.error('Registration Failed', regError);
        }
    }
    static ɵfac = function SignIn_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignIn)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignIn, selectors: [["app-sign-in"]], outputs: { signInCompleted: "signInCompleted", goToLanding: "goToLanding" }, decls: 78, vars: 50, consts: [[1, "min-h-screen", "bg-slate-900", "text-slate-100", "flex", "flex-col", "justify-between", "relative", "overflow-hidden", "select-none"], [1, "absolute", "inset-0", "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]", "pointer-events-none"], [1, "absolute", "-top-40", "-right-40", "w-96", "h-96", "bg-emerald-500/10", "rounded-full", "blur-3xl", "pointer-events-none"], [1, "absolute", "-bottom-40", "-left-40", "w-96", "h-96", "bg-indigo-500/10", "rounded-full", "blur-3xl", "pointer-events-none"], [1, "relative", "z-10", "w-full", "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-6", "flex", "items-center", "justify-between"], ["type", "button", 1, "flex", "items-center", "gap-3", "text-left", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500", "rounded-xl", "p-1", 3, "click"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-500", "text-slate-950", "flex", "items-center", "justify-center", "font-mono", "font-black", "text-lg", "shadow-lg", "shadow-emerald-500/20"], [1, "flex", "items-center", "gap-2"], [1, "text-base", "font-black", "tracking-tight", "text-white"], [1, "text-[10px]", "uppercase", "font-mono", "px-1.5", "py-0.5", "bg-emerald-500/20", "text-emerald-400", "border", "border-emerald-500/30", "rounded", "font-semibold", "tracking-wider"], [1, "text-[11px]", "text-slate-400", "font-mono"], [1, "flex", "items-center", "gap-3"], [1, "hidden", "sm:flex", "items-center", "bg-slate-800/90", "border", "border-slate-700/80", "rounded-xl", "p-1"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], ["type", "button", 1, "px-3.5", "py-2", "rounded-xl", "text-xs", "font-semibold", "text-slate-300", "hover:text-white", "bg-slate-800/80", "hover:bg-slate-800", "border", "border-slate-700/80", "flex", "items-center", "gap-1.5", "transition-all", "shadow-sm", 3, "click"], [1, "relative", "z-10", "flex-1", "max-w-6xl", "w-full", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-6", "flex", "flex-col", "items-center", "justify-center"], [1, "text-center", "max-w-2xl", "mx-auto", "mb-6"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1", "rounded-full", "bg-emerald-500/10", "border", "border-emerald-500/20", "text-emerald-400", "text-xs", "font-medium", "font-mono", "mb-3"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-400", "animate-pulse"], [1, "text-3xl", "sm:text-4xl", "font-black", "text-white", "tracking-tight"], [1, "mt-2", "text-sm", "text-slate-400"], [1, "mt-4", "inline-flex", "p-1", "rounded-xl", "bg-slate-800/90", "border", "border-slate-700", "sm:hidden"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-bold", "rounded-lg", "transition-all", 3, "click"], [1, "w-full", "max-w-5xl", "mb-6"], [1, "p-3.5", "rounded-xl", "bg-emerald-950/40", "border", "border-emerald-500/30", "flex", "items-center", "justify-between", "text-xs"], [1, "p-3.5", "rounded-xl", "bg-indigo-950/40", "border", "border-indigo-500/30", "flex", "items-center", "justify-between", "text-xs"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8", "w-full", "max-w-5xl", "items-stretch"], [1, "lg:col-span-7", "flex", "flex-col", "justify-between", "bg-slate-800/40", "border", "border-slate-700/60", "rounded-2xl", "p-6", "backdrop-blur-sm"], [1, "flex", "flex-col", "h-full", "justify-between"], [1, "lg:col-span-5", "bg-slate-950", "border", "border-slate-800", "rounded-2xl", "p-6", "sm:p-7", "shadow-xl", "flex", "flex-col", "justify-between"], [1, "mb-5", "flex", "items-center", "justify-between"], [1, "text-[11px]", "font-mono", "uppercase", "text-emerald-400", "tracking-wider"], [1, "text-lg", "font-bold", "text-white", "mt-0.5"], [1, "text-[10px]", "font-mono", "px-2", "py-1", "rounded", "font-bold", "uppercase"], [1, "mb-4", "p-3", "rounded-xl", "bg-slate-900", "border", "border-slate-800", "flex", "items-center", "gap-3"], [1, "mb-4", "p-3", "rounded-xl", "bg-rose-500/10", "border", "border-rose-500/30", "text-rose-300", "text-xs", "flex", "items-center", "gap-2"], [1, "mb-4", "p-3", "rounded-xl", "bg-emerald-500/10", "border", "border-emerald-500/30", "text-emerald-300", "text-xs", "flex", "items-center", "gap-2"], [1, "space-y-4", 3, "formGroup"], [1, "space-y-3.5", 3, "formGroup"], [1, "mt-5", "p-3.5", "rounded-xl", "bg-slate-900/80", "border", "border-slate-800"], [1, "mt-5", "pt-3", "border-t", "border-slate-900", "flex", "items-center", "justify-between", "text-[11px]", "text-slate-400"], [1, "relative", "z-10", "w-full", "max-w-7xl", "mx-auto", "px-4", "py-4", "text-center", "text-xs", "text-slate-400", "font-mono"], [1, "text-emerald-400"], [1, "flex", "items-center", "gap-2", "text-emerald-300"], [1, "!text-emerald-400", "!text-base"], ["type", "button", 1, "hidden", "sm:inline-flex", "items-center", "gap-1", "font-mono", "text-[11px]", "text-emerald-400", "hover:text-emerald-300", "underline", 3, "click"], [1, "flex", "items-center", "gap-2", "text-indigo-300"], [1, "!text-indigo-400", "!text-base"], ["type", "button", 1, "hidden", "sm:inline-flex", "items-center", "gap-1", "font-mono", "text-[11px]", "text-indigo-300", "hover:text-indigo-200", "underline", 3, "click"], [1, "font-mono", "text-emerald-400"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "!text-emerald-400"], [1, "text-sm", "font-bold", "uppercase", "tracking-wider", "text-slate-200"], [1, "text-[11px]", "font-mono", "text-emerald-400", "bg-emerald-500/10", "px-2", "py-0.5", "rounded", "border", "border-emerald-500/20"], [1, "text-xs", "text-slate-400", "mb-5"], [1, "space-y-3"], ["type", "button", 1, "w-full", "text-left", "p-3.5", "rounded-xl", "border", "transition-all", "flex", "items-start", "gap-3.5", "group", "relative", 3, "bg-slate-800", "border-emerald-500", "shadow-md", "bg-slate-900/60", "border-slate-800", "hover:border-slate-700", "hover:bg-slate-800/60"], [1, "mt-6", "pt-4", "border-t", "border-slate-800", "flex", "items-center", "justify-between", "text-[11px]", "text-slate-400"], [1, "flex", "items-center", "gap-1.5"], [1, "!text-sm", "text-emerald-400"], [1, "font-mono", "text-slate-400"], ["type", "button", 1, "w-full", "text-left", "p-3.5", "rounded-xl", "border", "transition-all", "flex", "items-start", "gap-3.5", "group", "relative", 3, "click"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "border", "transition-all"], [1, "!text-xl"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-sm", "font-bold", "text-white", "group-hover:text-emerald-400", "transition-colors"], [1, "text-[10px]", "font-mono", "px-2", "py-0.5", "rounded", "uppercase", "font-semibold", "bg-slate-800", "text-slate-300", "border", "border-slate-700"], [1, "text-xs", "text-slate-400", "line-clamp-1", "mt-0.5"], [1, "flex", "items-center", "gap-3", "mt-2", "text-[10px]", "font-mono", "text-slate-400"], [1, "flex", "items-center", "gap-1", "text-slate-300"], [1, "!text-[12px]", "!w-3", "!h-3", "text-emerald-400"], [1, "text-slate-400", "truncate"], [1, "shrink-0", "pt-1"], [1, "w-5", "h-5", "rounded-full", "border", "flex", "items-center", "justify-center", "transition-colors"], [1, "!text-[14px]", "!w-3.5", "!h-3.5", "text-slate-950", "font-bold"], [1, "inline-flex", "items-center", "gap-1.5", "text-[11px]", "font-mono", "text-emerald-400", "bg-emerald-500/10", "px-2", "py-0.5", "rounded", "border", "border-emerald-500/20"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-400", "animate-pulse"], [1, "text-xs", "text-slate-300", "leading-relaxed", "mb-6"], [1, "text-white"], [1, "grid", "grid-cols-2", "gap-3", "mb-6"], [1, "p-3.5", "rounded-xl", "bg-slate-900/80", "border", "border-slate-800"], [1, "flex", "items-center", "gap-2", "text-slate-400", "text-xs", "mb-1"], [1, "!text-base", "text-emerald-400"], [1, "font-semibold", "text-slate-300"], [1, "text-sm", "font-mono", "font-bold", "text-white"], [1, "text-[10px]", "text-slate-400", "font-mono", "mt-0.5"], [1, "!text-base", "text-indigo-400"], [1, "text-sm", "font-mono", "font-bold", "text-emerald-400"], [1, "!text-base", "text-amber-400"], [1, "!text-base", "text-cyan-400"], [1, "p-4", "rounded-xl", "bg-indigo-950/30", "border", "border-indigo-500/20", "text-xs", "space-y-2"], [1, "flex", "items-center", "gap-2", "font-bold", "text-indigo-300"], [1, "text-slate-400", "text-[11px]", "leading-relaxed"], [1, "mt-6", "pt-4", "border-t", "border-slate-800", "flex", "items-center", "justify-between", "text-xs"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "transition-all", 3, "click"], [1, "font-mono", "text-[11px]", "text-slate-400"], [1, "w-8", "h-8", "rounded-lg", "bg-emerald-500/20", "text-emerald-400", "border", "border-emerald-500/30", "flex", "items-center", "justify-center"], [1, "!text-lg"], [1, "min-w-0", "flex-1"], [1, "text-xs", "font-bold", "text-white", "truncate"], [1, "text-[10px]", "text-emerald-400", "font-mono"], [1, "text-[10px]", "px-2", "py-0.5", "rounded", "bg-emerald-500/10", "text-emerald-400", "font-mono", "border", "border-emerald-500/20"], [1, "!text-base", "text-rose-400", "shrink-0"], [1, "!text-base", "text-emerald-400", "shrink-0"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], ["for", "loginEmail", 1, "block", "text-xs", "font-semibold", "text-slate-300", "mb-1.5"], [1, "relative"], [1, "absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none", "text-slate-400"], ["id", "loginEmail", "type", "email", "formControlName", "email", "placeholder", "user@doormasterops.com", 1, "w-full", "pl-9", "pr-3", "py-2.5", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "font-mono"], [1, "flex", "items-center", "justify-between", "mb-1.5"], ["for", "loginPassword", 1, "block", "text-xs", "font-semibold", "text-slate-300"], [1, "text-[10px]", "text-slate-400", "font-mono"], ["id", "loginPassword", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "pl-9", "pr-10", "py-2.5", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "font-mono", 3, "type"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "pr-3", "flex", "items-center", "text-slate-400", "hover:text-slate-200", 3, "click"], [1, "!text-base"], [1, "flex", "items-center", "justify-between", "text-xs", "py-1"], [1, "flex", "items-center", "gap-2", "cursor-pointer", "text-slate-300"], ["type", "checkbox", "formControlName", "rememberMe", 1, "rounded", "bg-slate-800", "border-slate-700", "text-emerald-500", "focus:ring-emerald-500"], [1, "text-emerald-400", "text-[11px]", "font-mono"], ["type", "submit", 1, "w-full", "mt-2", "py-3", "px-4", "rounded-xl", "font-bold", "text-xs", "uppercase", "tracking-wider", "flex", "items-center", "justify-center", "gap-2", "shadow-lg", "transition-all", "active:scale-[0.99]", "disabled:opacity-50", 3, "disabled"], [1, "w-4", "h-4", "border-2", "border-current", "border-t-transparent", "rounded-full", "animate-spin"], [1, "space-y-3.5", 3, "ngSubmit", "formGroup"], ["for", "regName", 1, "block", "text-xs", "font-semibold", "text-slate-300", "mb-1"], ["id", "regName", "type", "text", "formControlName", "name", "placeholder", "e.g. David Mensah", 1, "w-full", "pl-9", "pr-3", "py-2", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "font-sans"], ["for", "regEmail", 1, "block", "text-xs", "font-semibold", "text-slate-300", "mb-1"], ["id", "regEmail", "type", "email", "formControlName", "email", "placeholder", "david@doormasterops.com", 1, "w-full", "pl-9", "pr-3", "py-2", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "font-mono"], ["for", "regRole", 1, "block", "text-xs", "font-semibold", "text-slate-300", "mb-1"], ["id", "regRole", "formControlName", "role", 1, "w-full", "px-3", "py-2", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "focus:outline-none", "focus:border-emerald-500", "font-sans"], ["value", "manager"], ["value", "installer"], ["value", "client"], ["value", "account_officer"], ["value", "shop_manager"], ["value", "dispatcher"], ["for", "regPhone", 1, "block", "text-xs", "font-semibold", "text-slate-300", "mb-1"], ["id", "regPhone", "type", "text", "formControlName", "phone", "placeholder", "+233 24 555 0199", 1, "w-full", "pl-9", "pr-3", "py-2", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "font-mono"], ["for", "regPassword", 1, "block", "text-xs", "font-semibold", "text-slate-300", "mb-1"], ["id", "regPassword", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "pl-9", "pr-10", "py-2", "rounded-xl", "bg-slate-900", "border", "border-slate-700", "text-white", "text-xs", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "font-mono", 3, "type"], ["type", "submit", 1, "w-full", "mt-2", "py-3", "px-4", "rounded-xl", "font-bold", "text-xs", "uppercase", "tracking-wider", "flex", "items-center", "justify-center", "gap-2", "shadow-lg", "transition-all", "active:scale-[0.99]", "disabled:opacity-50", "bg-emerald-500", "hover:bg-emerald-400", "text-slate-950", "shadow-emerald-500/20", 3, "disabled"], [1, "text-[10px]", "font-mono", "text-slate-400", "uppercase", "tracking-wider", "block", "mb-2"], [1, "space-y-1.5"], [1, "text-xs", "text-slate-300", "flex", "items-center", "gap-2"], [1, "!text-xs", "text-emerald-400"], ["type", "button", 1, "text-emerald-400", "hover:underline", "font-semibold", "font-mono", 3, "click"]], template: function SignIn_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵelementStart(4, "header", 4)(5, "button", 5);
            i0.ɵɵlistener("click", function SignIn_Template_button_click_5_listener() { return ctx.navigateToLanding(); });
            i0.ɵɵelementStart(6, "div", 6);
            i0.ɵɵtext(7, " DM ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div")(9, "div", 7)(10, "span", 8);
            i0.ɵɵtext(11, "DoorMaster");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 9);
            i0.ɵɵtext(13, " OPS ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "p", 10);
            i0.ɵɵtext(15, "Precision Installation & Fleet Portal");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "div", 11)(17, "div", 12)(18, "button", 13);
            i0.ɵɵlistener("click", function SignIn_Template_button_click_18_listener() { return ctx.selectAuthMode("demo"); });
            i0.ɵɵelementStart(19, "mat-icon", 14);
            i0.ɵɵtext(20, "science");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "span");
            i0.ɵɵtext(22, "Demo Mode");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "button", 13);
            i0.ɵɵlistener("click", function SignIn_Template_button_click_23_listener() { return ctx.selectAuthMode("api"); });
            i0.ɵɵelementStart(24, "mat-icon", 14);
            i0.ɵɵtext(25, "storage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "API Mode (MySQL)");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "button", 15);
            i0.ɵɵlistener("click", function SignIn_Template_button_click_28_listener() { return ctx.navigateToLanding(); });
            i0.ɵɵelementStart(29, "mat-icon", 14);
            i0.ɵɵtext(30, "arrow_back");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span");
            i0.ɵɵtext(32, "Public Site");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(33, "main", 16)(34, "div", 17)(35, "div", 18);
            i0.ɵɵelement(36, "span", 19);
            i0.ɵɵtext(37, " Enterprise Authentication Gateway ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "h1", 20);
            i0.ɵɵtext(39, " Sign In to DoorMaster Operations ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "p", 21);
            i0.ɵɵconditionalCreate(41, SignIn_Conditional_41_Template, 4, 0)(42, SignIn_Conditional_42_Template, 4, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 22)(44, "button", 23);
            i0.ɵɵlistener("click", function SignIn_Template_button_click_44_listener() { return ctx.selectAuthMode("demo"); });
            i0.ɵɵtext(45, " \uD83C\uDFAD Demo Option ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "button", 23);
            i0.ɵɵlistener("click", function SignIn_Template_button_click_46_listener() { return ctx.selectAuthMode("api"); });
            i0.ɵɵtext(47, " \u26A1 API Option (MySQL) ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "div", 24);
            i0.ɵɵconditionalCreate(49, SignIn_Conditional_49_Template, 10, 0, "div", 25)(50, SignIn_Conditional_50_Template, 11, 1, "div", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "div", 27)(52, "div", 28);
            i0.ɵɵconditionalCreate(53, SignIn_Conditional_53_Template, 21, 0)(54, SignIn_Conditional_54_Template, 73, 18, "div", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 30)(56, "div")(57, "div", 31)(58, "div")(59, "span", 32);
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "h3", 33);
            i0.ɵɵconditionalCreate(62, SignIn_Conditional_62_Template, 1, 0)(63, SignIn_Conditional_63_Template, 1, 0)(64, SignIn_Conditional_64_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "span", 34);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(67, SignIn_Conditional_67_Template, 11, 3, "div", 35);
            i0.ɵɵconditionalCreate(68, SignIn_Conditional_68_Template, 5, 1, "div", 36);
            i0.ɵɵconditionalCreate(69, SignIn_Conditional_69_Template, 5, 1, "div", 37);
            i0.ɵɵconditionalCreate(70, SignIn_Conditional_70_Template, 33, 22, "form", 38)(71, SignIn_Conditional_71_Template, 55, 5, "form", 39);
            i0.ɵɵconditionalCreate(72, SignIn_Conditional_72_Template, 6, 0, "div", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 41);
            i0.ɵɵconditionalCreate(74, SignIn_Conditional_74_Template, 4, 0)(75, SignIn_Conditional_75_Template, 4, 2);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(76, "footer", 42);
            i0.ɵɵtext(77, " DoorMaster Pro OS \u2022 Commercial & Residential Door Installation Platform \u2022 MySQL Database Edition ");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(18);
            i0.ɵɵclassProp("bg-emerald-500", ctx.authMode() === "demo")("text-slate-950", ctx.authMode() === "demo")("text-slate-300", ctx.authMode() !== "demo");
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("bg-emerald-500", ctx.authMode() === "api")("text-slate-950", ctx.authMode() === "api")("text-slate-300", ctx.authMode() !== "api");
            i0.ɵɵadvance(18);
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 41 : 42);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("bg-emerald-500", ctx.authMode() === "demo")("text-slate-950", ctx.authMode() === "demo")("text-slate-300", ctx.authMode() !== "demo");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("bg-emerald-500", ctx.authMode() === "api")("text-slate-950", ctx.authMode() === "api")("text-slate-300", ctx.authMode() !== "api");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 49 : 50);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 53 : 54);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" ", ctx.authMode() === "demo" ? "Demo Sandbox" : ctx.authSubTab() === "signin" ? "MySQL Sign In" : "New User Registration", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 62 : ctx.authSubTab() === "signin" ? 63 : 64);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("bg-emerald-500/20", ctx.authMode() === "demo")("text-emerald-400", ctx.authMode() === "demo")("border", true)("border-emerald-500/30", ctx.authMode() === "demo")("bg-indigo-500/20", ctx.authMode() === "api")("text-indigo-400", ctx.authMode() === "api")("border-indigo-500/30", ctx.authMode() === "api");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.authMode() === "demo" ? "Demo Mode" : "Live API", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 67 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.authErrorMessage() ? 68 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.authSuccessMessage() ? 69 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.authMode() === "demo" || ctx.authSubTab() === "signin" ? 70 : 71);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 72 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.authMode() === "demo" ? 74 : 75);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatIconModule, i2.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignIn, [{
        type: Component,
        args: [{
                selector: 'app-sign-in',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [ReactiveFormsModule, MatIconModule],
                template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      <!-- Background Decorative Grid & Glows -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Top Navigation Bar -->
      <header class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <button 
          type="button" 
          (click)="navigateToLanding()" 
          class="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl p-1"
        >
          <div class="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-black text-lg shadow-lg shadow-emerald-500/20">
            DM
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-base font-black tracking-tight text-white">DoorMaster</span>
              <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-semibold tracking-wider">
                OPS
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-mono">Precision Installation & Fleet Portal</p>
          </div>
        </button>

        <div class="flex items-center gap-3">
          <!-- Mode Toggle Badge -->
          <div class="hidden sm:flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl p-1">
            <button
              type="button"
              (click)="selectAuthMode('demo')"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              [class.bg-emerald-500]="authMode() === 'demo'"
              [class.text-slate-950]="authMode() === 'demo'"
              [class.text-slate-300]="authMode() !== 'demo'"
            >
              <mat-icon class="!text-sm !w-4 !h-4">science</mat-icon>
              <span>Demo Mode</span>
            </button>
            <button
              type="button"
              (click)="selectAuthMode('api')"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              [class.bg-emerald-500]="authMode() === 'api'"
              [class.text-slate-950]="authMode() === 'api'"
              [class.text-slate-300]="authMode() !== 'api'"
            >
              <mat-icon class="!text-sm !w-4 !h-4">storage</mat-icon>
              <span>API Mode (MySQL)</span>
            </button>
          </div>

          <button 
            type="button" 
            (click)="navigateToLanding()" 
            class="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <mat-icon class="!text-sm !w-4 !h-4">arrow_back</mat-icon>
            <span>Public Site</span>
          </button>
        </div>
      </header>

      <!-- Main Sign In Container -->
      <main class="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center">
        <!-- Header Copy -->
        <div class="text-center max-w-2xl mx-auto mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium font-mono mb-3">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Enterprise Authentication Gateway
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Sign In to DoorMaster Operations
          </h1>
          <p class="mt-2 text-sm text-slate-400">
            @if (authMode() === 'demo') {
              Select <strong class="text-emerald-400">Demo Option</strong> to test features with simulated personas.
            } @else {
              Connected via <strong class="text-emerald-400">API Option</strong> to live MySQL database — zero mock personas, only real user records.
            }
          </p>

          <!-- Mobile Mode Switcher Tabs -->
          <div class="mt-4 inline-flex p-1 rounded-xl bg-slate-800/90 border border-slate-700 sm:hidden">
            <button 
              type="button" 
              (click)="selectAuthMode('demo')" 
              class="px-4 py-2 text-xs font-bold rounded-lg transition-all"
              [class.bg-emerald-500]="authMode() === 'demo'"
              [class.text-slate-950]="authMode() === 'demo'"
              [class.text-slate-300]="authMode() !== 'demo'"
            >
              🎭 Demo Option
            </button>
            <button 
              type="button" 
              (click)="selectAuthMode('api')" 
              class="px-4 py-2 text-xs font-bold rounded-lg transition-all"
              [class.bg-emerald-500]="authMode() === 'api'"
              [class.text-slate-950]="authMode() === 'api'"
              [class.text-slate-300]="authMode() !== 'api'"
            >
              ⚡ API Option (MySQL)
            </button>
          </div>
        </div>

        <!-- Mode Indicator Banner -->
        <div class="w-full max-w-5xl mb-6">
          @if (authMode() === 'demo') {
            <div class="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-emerald-300">
                <mat-icon class="!text-emerald-400 !text-base">science</mat-icon>
                <span><strong>Demo Mode Active:</strong> Instant 1-click test access with simulated fleet, live Accra radar telemetry, and dummy Telco SMS logs.</span>
              </div>
              <button 
                type="button" 
                (click)="selectAuthMode('api')" 
                class="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400 hover:text-emerald-300 underline"
              >
                Switch to Live MySQL API →
              </button>
            </div>
          } @else {
            <div class="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-indigo-300">
                <mat-icon class="!text-indigo-400 !text-base">storage</mat-icon>
                <span>
                  <strong>API Mode Active:</strong> 
                  @if (store.dbStatus()?.connected) {
                    Connected to MySQL Database (<span class="font-mono text-emerald-400">{{ store.dbStatus()?.database }}</span> • {{ store.dbStatus()?.doorCount }} Doors in DB • Live Data Mode).
                  } @else {
                    Checking MySQL connection on 127.0.0.1:3306...
                  }
                </span>
              </div>
              <button 
                type="button" 
                (click)="selectAuthMode('demo')" 
                class="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-indigo-300 hover:text-indigo-200 underline"
              >
                Switch to Demo Mode →
              </button>
            </div>
          }
        </div>

        <!-- 2-Column Auth Layout: Quick Persona Selector (Left) & Form / MySQL Details (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl items-stretch">
          
          <!-- Column 1: Persona Fast-Pass Selector (Demo Mode ONLY) OR Database Overview (API Mode) -->
          <div class="lg:col-span-7 flex flex-col justify-between bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
            @if (authMode() === 'demo') {
              <!-- DEMO MODE: Fast Persona Selector -->
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <mat-icon class="!text-emerald-400">manage_accounts</mat-icon>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-slate-200">
                      Select Demo Persona
                    </h2>
                  </div>
                  <span class="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Instant Test
                  </span>
                </div>
                <p class="text-xs text-slate-400 mb-5">
                  Click any team persona to auto-fill credentials and immediately explore their customized workspace.
                </p>

                <!-- List of Personas -->
                <div class="space-y-3">
                  @for (p of personaList; track p.id) {
                    <button 
                      type="button"
                      (click)="selectPersona(p)"
                      class="w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 group relative"
                      [class.bg-slate-800]="selectedPersona().id === p.id"
                      [class.border-emerald-500]="selectedPersona().id === p.id"
                      [class.shadow-md]="selectedPersona().id === p.id"
                      [class.bg-slate-900/60]="selectedPersona().id !== p.id"
                      [class.border-slate-800]="selectedPersona().id !== p.id"
                      [class.hover:border-slate-700]="selectedPersona().id !== p.id"
                      [class.hover:bg-slate-800/60]="selectedPersona().id !== p.id"
                    >
                      <!-- Role Icon Avatar -->
                      <div 
                        class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all"
                        [class]="p.gradient + ' ' + p.borderColor"
                      >
                        <mat-icon class="!text-xl" [class]="p.color">{{ p.icon }}</mat-icon>
                      </div>

                      <!-- Role Details -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                          <span class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {{ p.title }}
                          </span>
                          <span class="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            {{ p.badge }}
                          </span>
                        </div>
                        <p class="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {{ p.responsibilities }}
                        </p>
                        <div class="flex items-center gap-3 mt-2 text-[10px] font-mono text-slate-400">
                          <span class="flex items-center gap-1 text-slate-300">
                            <mat-icon class="!text-[12px] !w-3 !h-3 text-emerald-400">badge</mat-icon>
                            {{ p.name }}
                          </span>
                          <span>•</span>
                          <span class="text-slate-400 truncate">{{ p.defaultEmail }}</span>
                        </div>
                      </div>

                      <!-- Radio check circle -->
                      <div class="shrink-0 pt-1">
                        <div 
                          class="w-5 h-5 rounded-full border flex items-center justify-center transition-colors"
                          [class.border-emerald-500]="selectedPersona().id === p.id"
                          [class.bg-emerald-500]="selectedPersona().id === p.id"
                          [class.border-slate-600]="selectedPersona().id !== p.id"
                        >
                          @if (selectedPersona().id === p.id) {
                            <mat-icon class="!text-[14px] !w-3.5 !h-3.5 text-slate-950 font-bold">check</mat-icon>
                          }
                        </div>
                      </div>
                    </button>
                  }
                </div>
              </div>

              <!-- Hint footer -->
              <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span class="flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-emerald-400">security</mat-icon>
                  Enterprise RBAC Sandbox
                </span>
                <span class="font-mono text-slate-400">
                  Simulated Local Store
                </span>
              </div>
            } @else {
              <!-- API MODE: Clean Live Architecture Overview (NO PERSONA SIGN-IN) -->
              <div class="flex flex-col h-full justify-between">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                      <mat-icon class="!text-emerald-400">dns</mat-icon>
                      <h2 class="text-sm font-bold uppercase tracking-wider text-slate-200">
                        Live MySQL Enterprise Gateway
                      </h2>
                    </div>
                    <span class="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Production API
                    </span>
                  </div>

                  <p class="text-xs text-slate-300 leading-relaxed mb-6">
                    In <strong class="text-white">API Mode</strong>, persona fast-passes and dummy seed installations are removed. You are directly communicating with the Node.js Express backend and live MySQL schema managed via Prisma ORM.
                  </p>

                  <!-- Live DB Telemetry Cards -->
                  <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div class="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <mat-icon class="!text-base text-emerald-400">database</mat-icon>
                        <span class="font-semibold text-slate-300">Database Engine</span>
                      </div>
                      <div class="text-sm font-mono font-bold text-white">Prisma + MySQL 8.0</div>
                      <div class="text-[10px] text-slate-400 font-mono mt-0.5">doormaster_ops on 127.0.0.1:3306</div>
                    </div>

                    <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div class="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <mat-icon class="!text-base text-indigo-400">inventory_2</mat-icon>
                        <span class="font-semibold text-slate-300">Live Doors Catalog</span>
                      </div>
                      <div class="text-sm font-mono font-bold text-emerald-400">
                        {{ store.dbStatus()?.doorCount || store.doors().length }} Models
                      </div>
                      <div class="text-[10px] text-slate-400 font-mono mt-0.5">Scraped & Stored in DB</div>
                    </div>

                    <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div class="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <mat-icon class="!text-base text-amber-400">lock</mat-icon>
                        <span class="font-semibold text-slate-300">Cryptographic Auth</span>
                      </div>
                      <div class="text-sm font-mono font-bold text-white">PBKDF2-SHA512</div>
                      <div class="text-[10px] text-slate-400 font-mono mt-0.5">Salted Hashes in MySQL</div>
                    </div>

                    <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div class="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <mat-icon class="!text-base text-cyan-400">category</mat-icon>
                        <span class="font-semibold text-slate-300">Lines & Series</span>
                      </div>
                      <div class="text-sm font-mono font-bold text-white">
                        {{ store.dbStatus()?.categoryCount || 20 }} Categories
                      </div>
                      <div class="text-[10px] text-slate-400 font-mono mt-0.5">Architectural Doors</div>
                    </div>
                  </div>

                  <!-- Live Data Policy Notice -->
                  <div class="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs space-y-2">
                    <div class="flex items-center gap-2 font-bold text-indigo-300">
                      <mat-icon class="!text-base text-indigo-400">verified_user</mat-icon>
                      <span>Zero Dummy Data Verification</span>
                    </div>
                    <p class="text-slate-400 text-[11px] leading-relaxed">
                      All installation work orders, photos, GPS clock sessions, and SMS logs in this mode are created by real registered users and preserved permanently in MySQL.
                    </p>
                  </div>
                </div>

                <!-- Footer Switcher Controls in Left Column -->
                <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      (click)="setAuthSubTab('signin')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      [class.bg-emerald-500]="authSubTab() === 'signin'"
                      [class.text-slate-950]="authSubTab() === 'signin'"
                      [class.text-slate-300]="authSubTab() !== 'signin'"
                      [class.bg-slate-900]="authSubTab() !== 'signin'"
                    >
                      Sign In Existing User
                    </button>
                    <button
                      type="button"
                      (click)="setAuthSubTab('register')"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      [class.bg-emerald-500]="authSubTab() === 'register'"
                      [class.text-slate-950]="authSubTab() === 'register'"
                      [class.text-slate-300]="authSubTab() !== 'register'"
                      [class.bg-slate-900]="authSubTab() !== 'register'"
                    >
                      Register New User
                    </button>
                  </div>

                  <span class="font-mono text-[11px] text-slate-400">
                    Host: 127.0.0.1:3306
                  </span>
                </div>
              </div>
            }
          </div>

          <!-- Column 2: Credentials Form & Submit Card -->
          <div class="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <div class="mb-5 flex items-center justify-between">
                <div>
                  <span class="text-[11px] font-mono uppercase text-emerald-400 tracking-wider">
                    {{ authMode() === 'demo' ? 'Demo Sandbox' : (authSubTab() === 'signin' ? 'MySQL Sign In' : 'New User Registration') }}
                  </span>
                  <h3 class="text-lg font-bold text-white mt-0.5">
                    @if (authMode() === 'demo') {
                      Launch Demo Workspace
                    } @else if (authSubTab() === 'signin') {
                      Sign In via MySQL API
                    } @else {
                      Create Real Account
                    }
                  </h3>
                </div>
                <span 
                  class="text-[10px] font-mono px-2 py-1 rounded font-bold uppercase"
                  [class.bg-emerald-500/20]="authMode() === 'demo'"
                  [class.text-emerald-400]="authMode() === 'demo'"
                  [class.border]="true"
                  [class.border-emerald-500/30]="authMode() === 'demo'"
                  [class.bg-indigo-500/20]="authMode() === 'api'"
                  [class.text-indigo-400]="authMode() === 'api'"
                  [class.border-indigo-500/30]="authMode() === 'api'"
                >
                  {{ authMode() === 'demo' ? 'Demo Mode' : 'Live API' }}
                </span>
              </div>

              <!-- In Demo mode, show active persona preview pill -->
              @if (authMode() === 'demo') {
                <div class="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <mat-icon class="!text-lg">{{ selectedPersona().icon }}</mat-icon>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs font-bold text-white truncate">{{ selectedPersona().name }}</div>
                    <div class="text-[10px] text-emerald-400 font-mono">{{ selectedPersona().badge }} Access</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                    Ready
                  </span>
                </div>
              }

              <!-- Error Alert -->
              @if (authErrorMessage()) {
                <div class="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <mat-icon class="!text-base text-rose-400 shrink-0">error_outline</mat-icon>
                  <span>{{ authErrorMessage() }}</span>
                </div>
              }

              <!-- Success Alert -->
              @if (authSuccessMessage()) {
                <div class="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <mat-icon class="!text-base text-emerald-400 shrink-0">check_circle</mat-icon>
                  <span>{{ authSuccessMessage() }}</span>
                </div>
              }

              <!-- Form for Sign In (Used for both Demo Mode and API Mode Sign-in) -->
              @if (authMode() === 'demo' || authSubTab() === 'signin') {
                <form [formGroup]="loginForm" (ngSubmit)="handleFormSubmit()" class="space-y-4">
                  <!-- Email field -->
                  <div>
                    <label for="loginEmail" class="block text-xs font-semibold text-slate-300 mb-1.5">
                      Account Email
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="!text-lg">alternate_email</mat-icon>
                      </div>
                      <input 
                        id="loginEmail"
                        type="email"
                        formControlName="email"
                        class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                        placeholder="user@doormasterops.com"
                      />
                    </div>
                  </div>

                  <!-- Password field -->
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label for="loginPassword" class="block text-xs font-semibold text-slate-300">
                        Password
                      </label>
                      <span class="text-[10px] text-slate-400 font-mono">
                        {{ authMode() === 'demo' ? 'Demo: auto-filled' : 'MySQL PBKDF2 hash' }}
                      </span>
                    </div>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="!text-lg">lock</mat-icon>
                      </div>
                      <input 
                        id="loginPassword"
                        [type]="showPassword() ? 'text' : 'password'"
                        formControlName="password"
                        class="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                        placeholder="••••••••••••"
                      />
                      <button 
                        type="button" 
                        (click)="toggleShowPassword()" 
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                      >
                        <mat-icon class="!text-base">{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                      </button>
                    </div>
                  </div>

                  <!-- Remember me -->
                  <div class="flex items-center justify-between text-xs py-1">
                    <label class="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input type="checkbox" formControlName="rememberMe" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
                      <span>Remember session</span>
                    </label>
                    <span class="text-emerald-400 text-[11px] font-mono">256-bit TLS</span>
                  </div>

                  <!-- Submit Button -->
                  <button 
                    type="submit"
                    [disabled]="isSubmitting()"
                    class="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
                    [class.bg-emerald-500]="authMode() === 'demo'"
                    [class.hover:bg-emerald-400]="authMode() === 'demo'"
                    [class.text-slate-950]="authMode() === 'demo'"
                    [class.shadow-emerald-500/20]="authMode() === 'demo'"
                    [class.bg-indigo-600]="authMode() === 'api'"
                    [class.hover:bg-indigo-500]="authMode() === 'api'"
                    [class.text-white]="authMode() === 'api'"
                    [class.shadow-indigo-600/30]="authMode() === 'api'"
                  >
                    @if (isSubmitting()) {
                      <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      <span>
                        {{ authMode() === 'demo' ? 'Launching Demo...' : 'Authenticating with MySQL...' }}
                      </span>
                    } @else {
                      <mat-icon class="!text-base">{{ authMode() === 'demo' ? 'rocket_launch' : 'key' }}</mat-icon>
                      <span>
                        {{ authMode() === 'demo' 
                          ? 'Launch ' + selectedPersona().title + ' (Demo)' 
                          : 'Sign In & Connect Actual Data (API)' }}
                      </span>
                    }
                  </button>
                </form>
              } @else {
                <!-- Form for API User Registration -->
                <form [formGroup]="registerForm" (ngSubmit)="handleRegisterSubmit()" class="space-y-3.5">
                  <!-- Full Name field -->
                  <div>
                    <label for="regName" class="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="!text-base">badge</mat-icon>
                      </div>
                      <input 
                        id="regName"
                        type="text"
                        formControlName="name"
                        class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
                        placeholder="e.g. David Mensah"
                      />
                    </div>
                  </div>

                  <!-- Email field -->
                  <div>
                    <label for="regEmail" class="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="!text-base">alternate_email</mat-icon>
                      </div>
                      <input 
                        id="regEmail"
                        type="email"
                        formControlName="email"
                        class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                        placeholder="david@doormasterops.com"
                      />
                    </div>
                  </div>

                  <!-- Role selection -->
                  <div>
                    <label for="regRole" class="block text-xs font-semibold text-slate-300 mb-1">
                      Operational Role
                    </label>
                    <select
                      id="regRole"
                      formControlName="role"
                      class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 font-sans"
                    >
                      <option value="manager">Operations Manager (Director)</option>
                      <option value="installer">Field Technician / Master Installer</option>
                      <option value="client">Client / Site Owner</option>
                      <option value="account_officer">Accounts & Finance Officer</option>
                      <option value="shop_manager">Shop & Fabrication Bays Head</option>
                      <option value="dispatcher">Logistics Dispatcher / Driver</option>
                    </select>
                  </div>

                  <!-- Phone field -->
                  <div>
                    <label for="regPhone" class="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (SMS Gateway)
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="!text-base">phone</mat-icon>
                      </div>
                      <input 
                        id="regPhone"
                        type="text"
                        formControlName="phone"
                        class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                        placeholder="+233 24 555 0199"
                      />
                    </div>
                  </div>

                  <!-- Password field -->
                  <div>
                    <label for="regPassword" class="block text-xs font-semibold text-slate-300 mb-1">
                      Account Password
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <mat-icon class="!text-base">lock</mat-icon>
                      </div>
                      <input 
                        id="regPassword"
                        [type]="showPassword() ? 'text' : 'password'"
                        formControlName="password"
                        class="w-full pl-9 pr-10 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                        placeholder="••••••••••••"
                      />
                      <button 
                        type="button" 
                        (click)="toggleShowPassword()" 
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                      >
                        <mat-icon class="!text-base">{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                      </button>
                    </div>
                  </div>

                  <!-- Submit Registration -->
                  <button 
                    type="submit"
                    [disabled]="isSubmitting()"
                    class="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
                  >
                    @if (isSubmitting()) {
                      <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      <span>Creating Account in MySQL...</span>
                    } @else {
                      <mat-icon class="!text-base">person_add</mat-icon>
                      <span>Create Account & Connect to MySQL</span>
                    }
                  </button>
                </form>
              }

              <!-- Demo mode highlights preview -->
              @if (authMode() === 'demo') {
                <div class="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Role Privileges & Menus:
                  </span>
                  <ul class="space-y-1.5">
                    @for (feat of selectedPersona().features; track feat) {
                      <li class="text-xs text-slate-300 flex items-center gap-2">
                        <mat-icon class="!text-xs text-emerald-400">check_circle</mat-icon>
                        <span>{{ feat }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>

            <!-- Footer switcher -->
            <div class="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
              @if (authMode() === 'demo') {
                <span>Want to connect to live MySQL?</span>
                <button 
                  type="button" 
                  (click)="toggleMode()"
                  class="text-emerald-400 hover:underline font-semibold font-mono"
                >
                  Switch to API Mode →
                </button>
              } @else {
                <span>
                  {{ authSubTab() === 'signin' ? "Don't have an account?" : 'Already have an account?' }}
                </span>
                <button 
                  type="button" 
                  (click)="setAuthSubTab(authSubTab() === 'signin' ? 'register' : 'signin')"
                  class="text-emerald-400 hover:underline font-semibold font-mono"
                >
                  {{ authSubTab() === 'signin' ? 'Register New User' : 'Sign In with Email' }}
                </button>
              }
            </div>
          </div>

        </div>
      </main>

      <!-- Footer -->
      <footer class="relative z-10 w-full max-w-7xl mx-auto px-4 py-4 text-center text-xs text-slate-400 font-mono">
        DoorMaster Pro OS • Commercial & Residential Door Installation Platform • MySQL Database Edition
      </footer>
    </div>
  `
            }]
    }], () => [], { signInCompleted: [{ type: i0.Output, args: ["signInCompleted"] }], goToLanding: [{ type: i0.Output, args: ["goToLanding"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignIn, { className: "SignIn", filePath: "frontend/src/app/views/sign-in/sign-in.ts", lineNumber: 716 }); })();
