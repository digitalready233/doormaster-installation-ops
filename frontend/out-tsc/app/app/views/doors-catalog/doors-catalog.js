import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.name;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.label;
function DoorsCatalog_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Connected to ");
    i0.ɵɵelementStart(1, "strong", 89);
    i0.ɵɵtext(2, "doormaster_ops");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " on MySQL 127.0.0.1:3306 \u2022 Storing ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " scraped doors across ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " categories. ");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.store.doors().length);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.store.availableCategories().length);
} }
function DoorsCatalog_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Running in Demo Mode for rapid testing with simulated field data. All 329 scraped doors are also cached locally. ");
} }
function DoorsCatalog_Conditional_112_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 90);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_112_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.searchQuery.set("")); });
    i0.ɵɵelementStart(1, "mat-icon", 4);
    i0.ɵɵtext(2, "close");
    i0.ɵɵelementEnd()();
} }
function DoorsCatalog_For_118_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", cat_r3.name, " (", cat_r3.count, ")");
} }
function DoorsCatalog_Conditional_143_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 91);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_143_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.resetFilters()); });
    i0.ɵɵelementStart(1, "mat-icon", 4);
    i0.ɵɵtext(2, "restart_alt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 92);
    i0.ɵɵtext(4, "Reset");
    i0.ɵɵelementEnd()();
} }
function DoorsCatalog_For_153_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function DoorsCatalog_For_153_Template_button_click_0_listener() { const cat_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.selectedCategory.set(cat_r6.name)); });
    i0.ɵɵelementStart(1, "mat-icon", 70);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cat_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r0.selectedCategory() === cat_r6.name ? "bg-emerald-600 text-white border-transparent font-bold shadow-xs" : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getCategoryIcon(cat_r6.name));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", cat_r6.name, " (", cat_r6.count, ")");
} }
function DoorsCatalog_Conditional_160_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 76);
    i0.ɵɵtext(1, "(filtered)");
    i0.ɵɵelementEnd();
} }
function DoorsCatalog_Conditional_176_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 85)(1, "div", 94)(2, "mat-icon", 95);
    i0.ɵɵtext(3, "search_off");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "h3", 96);
    i0.ɵɵtext(5, "No doors match your filter");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 97);
    i0.ɵɵtext(7, " Try adjusting your search query, selecting a different DoorMaster series, or syncing live from the shop. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 98)(9, "button", 99);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_176_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.resetFilters()); });
    i0.ɵɵtext(10, " Clear All Filters ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 100);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_176_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.triggerLiveScrape()); });
    i0.ɵɵtext(12, " Sync with doormaster.online ");
    i0.ɵɵelementEnd()()();
} }
function DoorsCatalog_Conditional_177_For_22_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 110);
} if (rf & 2) {
    const door_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", door_r9.imageUrl, i0.ɵɵsanitizeUrl)("alt", door_r9.name);
} }
function DoorsCatalog_Conditional_177_For_22_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 111);
    i0.ɵɵtext(1, "door_front");
    i0.ɵɵelementEnd();
} }
function DoorsCatalog_Conditional_177_For_22_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 116)(1, "mat-icon", 70);
    i0.ɵɵtext(2, "open_in_new");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const door_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("href", door_r9.sourceUrl, i0.ɵɵsanitizeUrl);
} }
function DoorsCatalog_Conditional_177_For_22_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 126)(1, "mat-icon", 138);
    i0.ɵɵtext(2, "local_fire_department");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const door_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(door_r9.fireRating);
} }
function DoorsCatalog_Conditional_177_For_22_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 127)(1, "mat-icon", 138);
    i0.ɵɵtext(2, "volume_off");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const door_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(door_r9.acousticRating);
} }
function DoorsCatalog_Conditional_177_For_22_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 107)(1, "td", 103)(2, "div", 108)(3, "div", 109);
    i0.ɵɵconditionalCreate(4, DoorsCatalog_Conditional_177_For_22_Conditional_4_Template, 1, 2, "img", 110)(5, DoorsCatalog_Conditional_177_For_22_Conditional_5_Template, 2, 0, "mat-icon", 111);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "div", 112);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 113)(10, "span", 114);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 115);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(14, DoorsCatalog_Conditional_177_For_22_Conditional_14_Template, 3, 1, "a", 116);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(15, "td", 104)(16, "span", 117)(17, "mat-icon", 70);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "td", 118)(22, "div", 119)(23, "mat-icon", 120);
    i0.ɵɵtext(24, "straighten");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 121);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 122);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "td", 123)(32, "div", 124);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 125);
    i0.ɵɵconditionalCreate(35, DoorsCatalog_Conditional_177_For_22_Conditional_35_Template, 5, 1, "span", 126);
    i0.ɵɵconditionalCreate(36, DoorsCatalog_Conditional_177_For_22_Conditional_36_Template, 5, 1, "span", 127);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "td", 104)(38, "div", 128);
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 33);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "td", 104)(44, "div", 129)(45, "span", 130);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 131);
    i0.ɵɵelement(48, "div", 132);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "td", 104)(50, "span", 133);
    i0.ɵɵelement(51, "span", 134);
    i0.ɵɵelementStart(52, "span");
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(54, "td", 105)(55, "div", 135)(56, "button", 136);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_177_For_22_Template_button_click_56_listener() { const door_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openDetailModal(door_r9)); });
    i0.ɵɵelementStart(57, "mat-icon", 20);
    i0.ɵɵtext(58, "visibility");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "button", 137);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_177_For_22_Template_button_click_59_listener() { const door_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.confirmDelete(door_r9)); });
    i0.ɵɵelementStart(60, "mat-icon", 20);
    i0.ɵɵtext(61, "delete_outline");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const door_r9 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(door_r9.imageUrl ? 4 : 5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", door_r9.name, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", door_r9.modelCode, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(door_r9.id);
    i0.ɵɵadvance();
    i0.ɵɵconditional(door_r9.sourceUrl ? 14 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r0.getCategoryBadgeClass(door_r9.category));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getCategoryIcon(door_r9.category));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(door_r9.category);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(door_r9.dimensions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", door_r9.material);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", door_r9.material, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", door_r9.finish);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Finish: ", door_r9.finish, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", door_r9.hardwareSpecs);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", door_r9.hardwareSpecs, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(door_r9.fireRating && door_r9.fireRating !== "None" && door_r9.fireRating !== "None / Standard" && door_r9.fireRating !== "None / Residential" ? 35 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(door_r9.acousticRating && door_r9.acousticRating !== "Standard" ? 36 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", door_r9.formattedPrice || "\u20B5" + i0.ɵɵpipeBind2(40, 30, door_r9.unitPrice, "1.0-0"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Lead: ", door_r9.leadTimeDays, "d ");
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(door_r9.stockQuantity <= 2 ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-white");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", door_r9.stockQuantity, " units ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(door_r9.stockQuantity === 0 ? "bg-slate-300 dark:bg-slate-700 w-0" : door_r9.stockQuantity <= 2 ? "bg-amber-500 w-1/3" : "bg-emerald-500 w-full");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r0.getStatusBadgeClass(door_r9.status));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.getStatusDotClass(door_r9.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.formatStatusName(door_r9.status));
} }
function DoorsCatalog_Conditional_177_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86)(1, "table", 101)(2, "thead")(3, "tr", 102)(4, "th", 103);
    i0.ɵɵtext(5, "Door Model & Preview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 104);
    i0.ɵɵtext(7, "Series / Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 104);
    i0.ɵɵtext(9, "Dimensions & Material");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 104);
    i0.ɵɵtext(11, "Hardware & Ratings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 104);
    i0.ɵɵtext(13, "Price (\u20B5)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 104);
    i0.ɵɵtext(15, "Stock Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 104);
    i0.ɵɵtext(17, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 105);
    i0.ɵɵtext(19, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "tbody", 106);
    i0.ɵɵrepeaterCreate(21, DoorsCatalog_Conditional_177_For_22_Template, 62, 33, "tr", 107, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r0.filteredDoors());
} }
function DoorsCatalog_Conditional_178_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87)(1, "mat-icon", 139);
    i0.ɵɵtext(2, "check_circle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.toastMessage());
} }
function DoorsCatalog_Conditional_179_For_171_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 216);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_179_For_171_Template_button_click_0_listener() { const preset_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.pickPresetImage(preset_r12.url)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const preset_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", preset_r12.label, " ");
} }
function DoorsCatalog_Conditional_179_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 140);
    i0.ɵɵlistener("keydown.escape", function DoorsCatalog_Conditional_179_Template_div_keydown_escape_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeAddModal()); });
    i0.ɵɵelementStart(1, "div", 141)(2, "div", 142)(3, "div", 143)(4, "div", 144)(5, "mat-icon", 145);
    i0.ɵɵtext(6, "meeting_room");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "h2", 146);
    i0.ɵɵtext(9, " Add New Door to Catalog ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 147);
    i0.ɵɵtext(11, " Register full technical specifications, hardware requirements, ratings, and inventory status. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "button", 148);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_179_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeAddModal()); });
    i0.ɵɵelementStart(13, "mat-icon", 11);
    i0.ɵɵtext(14, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "form", 149);
    i0.ɵɵlistener("ngSubmit", function DoorsCatalog_Conditional_179_Template_form_ngSubmit_15_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submitNewDoor()); });
    i0.ɵɵelementStart(16, "div", 150)(17, "h3", 151)(18, "mat-icon", 152);
    i0.ɵɵtext(19, "info");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "1. General Identification");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 153)(23, "div")(24, "label", 154);
    i0.ɵɵtext(25, " Door Name / Model Title ");
    i0.ɵɵelementStart(26, "span", 155);
    i0.ɵɵtext(27, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(28, "input", 156);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div")(30, "label", 157);
    i0.ɵɵtext(31, " Model / SKU Code ");
    i0.ɵɵelementStart(32, "span", 155);
    i0.ɵɵtext(33, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(34, "input", 158);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 153)(36, "div")(37, "label", 159);
    i0.ɵɵtext(38, " DoorMaster Series / Category ");
    i0.ɵɵelementStart(39, "span", 155);
    i0.ɵɵtext(40, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "select", 160)(42, "option", 161);
    i0.ɵɵtext(43, "Premium Villa Series");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "option", 162);
    i0.ɵɵtext(45, "Royal Series");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "option", 163);
    i0.ɵɵtext(47, "Smart Lock Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "option", 164);
    i0.ɵɵtext(49, "Mechanical Lock Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "option", 165);
    i0.ɵɵtext(51, "Turkey Interior Series");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "option", 166);
    i0.ɵɵtext(53, "DM Interior Series");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "option", 167);
    i0.ɵɵtext(55, "Economy Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "option", 168);
    i0.ɵɵtext(57, "Antifade Exterior Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "option", 169);
    i0.ɵɵtext(59, "Reeded Glass Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "option", 170);
    i0.ɵɵtext(61, "Architectural Entrance Pivot");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "option", 171);
    i0.ɵɵtext(63, "Solid Hardwood Entrance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "option", 172);
    i0.ɵɵtext(65, "Acoustic French Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "option", 173);
    i0.ɵɵtext(67, "Pocket Sliding System");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "option", 174);
    i0.ɵɵtext(69, "Bi-Fold Panoramic Patio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "option", 175);
    i0.ɵɵtext(71, "Fire-Rated Commercial (FD60)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(72, "div")(73, "label", 176);
    i0.ɵɵtext(74, " Dimensions (H \u00D7 W \u00D7 D mm) ");
    i0.ɵɵelementStart(75, "span", 155);
    i0.ɵɵtext(76, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(77, "input", 177);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(78, "div", 178)(79, "h3", 151)(80, "mat-icon", 179);
    i0.ɵɵtext(81, "construction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "span");
    i0.ɵɵtext(83, "2. Materials & Hardware Specifications");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(84, "div", 153)(85, "div")(86, "label", 180);
    i0.ɵɵtext(87, " Core Substrate / Materials ");
    i0.ɵɵelementStart(88, "span", 155);
    i0.ɵɵtext(89, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(90, "input", 181);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "div")(92, "label", 182);
    i0.ɵɵtext(93, " Surface Finish & Treatment ");
    i0.ɵɵelementStart(94, "span", 155);
    i0.ɵɵtext(95, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(96, "input", 183);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(97, "div")(98, "label", 184);
    i0.ɵɵtext(99, " Integrated Hardware Pack ");
    i0.ɵɵelementStart(100, "span", 155);
    i0.ɵɵtext(101, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(102, "input", 185);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "div", 153)(104, "div")(105, "label", 186);
    i0.ɵɵtext(106, " Fire Rating Certification ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(107, "select", 187)(108, "option", 188);
    i0.ɵɵtext(109, "None / Residential Standard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(110, "option", 189);
    i0.ɵɵtext(111, "FD30 (30-Minute Resistance)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "option", 190);
    i0.ɵɵtext(113, "FD60 (60-Minute Heavy Fire & Smoke)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(114, "div")(115, "label", 191);
    i0.ɵɵtext(116, " Acoustic Sound Insulation ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(117, "select", 192)(118, "option", 193);
    i0.ɵɵtext(119, "Standard (28-32 dB)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(120, "option", 194);
    i0.ɵɵtext(121, "35 dB Acoustic Core");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(122, "option", 195);
    i0.ɵɵtext(123, "38 dB Sound Insulation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(124, "option", 196);
    i0.ɵɵtext(125, "42 dB Heavy Core");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(126, "div", 178)(127, "h3", 151)(128, "mat-icon", 197);
    i0.ɵɵtext(129, "monetization_on");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(130, "span");
    i0.ɵɵtext(131, "3. Pricing & Inventory Parameters");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(132, "div", 198)(133, "div")(134, "label", 199);
    i0.ɵɵtext(135, " Unit Price (\u20B5 GHS) ");
    i0.ɵɵelementStart(136, "span", 155);
    i0.ɵɵtext(137, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(138, "input", 200);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(139, "div")(140, "label", 201);
    i0.ɵɵtext(141, " Stock Qty (Units) ");
    i0.ɵɵelementStart(142, "span", 155);
    i0.ɵɵtext(143, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(144, "input", 202);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(145, "div")(146, "label", 203);
    i0.ɵɵtext(147, " Lead Time (Days) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(148, "input", 204);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(149, "div")(150, "label", 205);
    i0.ɵɵtext(151, " Stock Status ");
    i0.ɵɵelementStart(152, "span", 155);
    i0.ɵɵtext(153, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(154, "select", 206)(155, "option", 57);
    i0.ɵɵtext(156, "In Stock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(157, "option", 58);
    i0.ɵɵtext(158, "Low Stock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(159, "option", 59);
    i0.ɵɵtext(160, "Made to Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(161, "option", 60);
    i0.ɵɵtext(162, "Discontinued");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(163, "div")(164, "label", 207);
    i0.ɵɵtext(165, " Product Image URL ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(166, "input", 208);
    i0.ɵɵelementStart(167, "div", 209)(168, "span", 115);
    i0.ɵɵtext(169, "Sample door imagery:");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(170, DoorsCatalog_Conditional_179_For_171_Template, 2, 1, "button", 210, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(172, "div")(173, "label", 211);
    i0.ɵɵtext(174, " Technical Summary & Installation Notes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(175, "textarea", 212);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(176, "div", 213)(177, "button", 214);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_179_Template_button_click_177_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeAddModal()); });
    i0.ɵɵtext(178, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(179, "button", 215)(180, "mat-icon", 20);
    i0.ɵɵtext(181, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(182, "span");
    i0.ɵɵtext(183, "Register Door Model");
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("formGroup", ctx_r0.addDoorForm);
    i0.ɵɵadvance(13);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("name") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("modelCode") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(43);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("dimensions") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(13);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("material") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("finish") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("hardwareSpecs") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(36);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("unitPrice") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(6);
    i0.ɵɵclassMap(ctx_r0.isFieldInvalid("stockQuantity") ? "border-red-500 focus:ring-red-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30");
    i0.ɵɵadvance(26);
    i0.ɵɵrepeater(ctx_r0.imagePresets);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r0.isSubmitting());
} }
function DoorsCatalog_Conditional_180_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 240)(1, "div", 241);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const d_r14 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("src", d_r14.imageUrl, i0.ɵɵsanitizeUrl)("alt", d_r14.name);
} }
function DoorsCatalog_Conditional_180_Conditional_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 231)(1, "span", 74);
    i0.ɵɵtext(2, "Live Website Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 242)(4, "span");
    i0.ɵɵtext(5, "View on doormaster.online");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "mat-icon", 70);
    i0.ɵɵtext(7, "open_in_new");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const d_r14 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("href", d_r14.sourceUrl, i0.ɵɵsanitizeUrl);
} }
function DoorsCatalog_Conditional_180_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "div", 140);
    i0.ɵɵlistener("keydown.escape", function DoorsCatalog_Conditional_180_Template_div_keydown_escape_1_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.inspectingDoor.set(null)); });
    i0.ɵɵelementStart(2, "div", 217)(3, "div", 218);
    i0.ɵɵconditionalCreate(4, DoorsCatalog_Conditional_180_Conditional_4_Template, 2, 2);
    i0.ɵɵelementStart(5, "button", 219);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_180_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.inspectingDoor.set(null)); });
    i0.ɵɵelementStart(6, "mat-icon", 11);
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 220)(9, "div", 221)(10, "span", 222);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 223);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "h3", 224);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 225)(17, "div", 226)(18, "div")(19, "span", 227);
    i0.ɵɵtext(20, "Unit Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 228);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "span", 227);
    i0.ɵɵtext(26, "Stock Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 229);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "span", 227);
    i0.ɵɵtext(31, "Lead Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 229);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div")(35, "span", 227);
    i0.ɵɵtext(36, "Warranty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 229);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div", 230)(40, "div", 231)(41, "span", 74);
    i0.ɵɵtext(42, "Series / Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span", 22);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 231)(46, "span", 74);
    i0.ɵɵtext(47, "Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span", 232);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div", 231)(51, "span", 74);
    i0.ɵɵtext(52, "Substrate / Core");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span", 233);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 231)(56, "span", 74);
    i0.ɵɵtext(57, "Finish & Tint");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "span", 233);
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 231)(61, "span", 74);
    i0.ɵɵtext(62, "Hardware Pack");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span", 233);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 231)(66, "span", 74);
    i0.ɵɵtext(67, "Fire Certification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "span", 22);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 231)(71, "span", 74);
    i0.ɵɵtext(72, "Acoustic Attenuation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "span", 22);
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "div", 231)(76, "span", 74);
    i0.ɵɵtext(77, "Supplier & Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "span", 75);
    i0.ɵɵtext(79);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(80, DoorsCatalog_Conditional_180_Conditional_80_Template, 8, 1, "div", 231);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "div", 234)(82, "span", 235);
    i0.ɵɵtext(83, "Architectural Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "p", 236);
    i0.ɵɵtext(85);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(86, "div", 237)(87, "span", 238);
    i0.ɵɵtext(88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "button", 239);
    i0.ɵɵlistener("click", function DoorsCatalog_Conditional_180_Template_button_click_89_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.inspectingDoor.set(null)); });
    i0.ɵɵtext(90, " Close Specification ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const d_r15 = i0.ɵɵstoreLet(i0.ɵɵnextContext().inspectingDoor());
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(d_r15.imageUrl ? 4 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", d_r15.modelCode, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", d_r15.category, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", d_r15.name, " ");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", d_r15.formattedPrice || "\u20B5" + i0.ɵɵpipeBind2(23, 20, d_r15.unitPrice, "1.0-0"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", d_r15.stockQuantity, " units");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", d_r15.leadTimeDays, " days");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", d_r15.warrantyYears, " years");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(d_r15.category);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.dimensions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.material);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.finish);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.hardwareSpecs);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.fireRating);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.acousticRating);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.supplierOrWorkshop);
    i0.ɵɵadvance();
    i0.ɵɵconditional(d_r15.sourceUrl ? 80 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r15.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("ID: ", d_r15.id);
} }
export class DoorsCatalog {
    store = inject(InstallationStore);
    alert = inject(AlertService);
    // Filter States
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    selectedCategory = signal('all', ...(ngDevMode ? [{ debugName: "selectedCategory" }] : /* istanbul ignore next */ []));
    selectedStatus = signal('all', ...(ngDevMode ? [{ debugName: "selectedStatus" }] : /* istanbul ignore next */ []));
    selectedFireRating = signal('all', ...(ngDevMode ? [{ debugName: "selectedFireRating" }] : /* istanbul ignore next */ []));
    sortBy = signal('newest', ...(ngDevMode ? [{ debugName: "sortBy" }] : /* istanbul ignore next */ []));
    // Modal Dialogs
    showAddModal = signal(false, ...(ngDevMode ? [{ debugName: "showAddModal" }] : /* istanbul ignore next */ []));
    inspectingDoor = signal(null, ...(ngDevMode ? [{ debugName: "inspectingDoor" }] : /* istanbul ignore next */ []));
    isSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    toastMessage = signal(null, ...(ngDevMode ? [{ debugName: "toastMessage" }] : /* istanbul ignore next */ []));
    // Preset architectural door images for quick picking
    imagePresets = [
        { label: 'Turkey Interior', url: 'https://doormaster.online/wp-content/uploads/2014/08/l7-500x600.png', category: 'Turkey interior series' },
        { label: 'Antifade Exterior', url: 'https://doormaster.online/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-02-at-7.29.23-AM-500x600.jpeg', category: 'Antifade doors' },
        { label: 'Premium Villa', url: 'https://doormaster.online/wp-content/uploads/2026/07/P.V-1-500x600.png', category: 'Premium Villa Series' },
        { label: 'Smart Lock Door', url: 'https://doormaster.online/wp-content/uploads/2026/09/ChatGPT-Image-Sep-28-2026-05_57_36-PM-500x600.png', category: 'Smart Lock Doors' },
        { label: 'Reeded Glass', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', category: 'Reeded glass doors' }
    ];
    // Reactive Form for Door Entry
    addDoorForm = new FormGroup({
        name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        modelCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        category: new FormControl('Premium Villa Series', { nonNullable: true, validators: [Validators.required] }),
        dimensions: new FormControl('2100 × 900 × 50mm', { nonNullable: true, validators: [Validators.required] }),
        material: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        finish: new FormControl('Multi-Layer Thermoset Enamel', { nonNullable: true, validators: [Validators.required] }),
        hardwareSpecs: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        fireRating: new FormControl('None / Residential', { nonNullable: true }),
        acousticRating: new FormControl('Standard', { nonNullable: true }),
        unitPrice: new FormControl(4750, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
        stockQuantity: new FormControl(5, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
        leadTimeDays: new FormControl(3, { nonNullable: true, validators: [Validators.min(1)] }),
        status: new FormControl('in_stock', { nonNullable: true, validators: [Validators.required] }),
        supplierOrWorkshop: new FormControl('Door Master Official (doormaster.online)', { nonNullable: true }),
        imageUrl: new FormControl('https://doormaster.online/wp-content/uploads/2014/08/l7-500x600.png', { nonNullable: true }),
        warrantyYears: new FormControl(10, { nonNullable: true, validators: [Validators.min(1)] }),
        description: new FormControl('', { nonNullable: true })
    });
    // Filtered & Sorted Doors computation
    filteredDoors = computed(() => {
        let list = this.store.doors();
        const query = this.searchQuery().trim().toLowerCase();
        const category = this.selectedCategory();
        const status = this.selectedStatus();
        const fire = this.selectedFireRating();
        // 1. Text Search Query
        if (query) {
            list = list.filter(d => d.name.toLowerCase().includes(query) ||
                d.modelCode.toLowerCase().includes(query) ||
                d.id.toLowerCase().includes(query) ||
                (d.category && d.category.toLowerCase().includes(query)) ||
                d.material.toLowerCase().includes(query) ||
                d.hardwareSpecs.toLowerCase().includes(query) ||
                d.supplierOrWorkshop.toLowerCase().includes(query) ||
                d.description.toLowerCase().includes(query));
        }
        // 2. Category Filter
        if (category !== 'all') {
            list = list.filter(d => d.category === category);
        }
        // 3. Status Filter
        if (status !== 'all') {
            list = list.filter(d => d.status === status);
        }
        // 4. Fire Rating Filter
        if (fire === 'rated') {
            list = list.filter(d => d.fireRating.includes('FD') || d.fireRating.toLowerCase().includes('fire') || d.fireRating.toLowerCase().includes('minute'));
        }
        else if (fire === 'fd60') {
            list = list.filter(d => d.fireRating.includes('FD60') || d.fireRating.includes('60-Minute'));
        }
        else if (fire === 'fd30') {
            list = list.filter(d => d.fireRating.includes('FD30') || d.fireRating.includes('30-Minute') || d.fireRating.includes('20-Minute'));
        }
        else if (fire === 'standard') {
            list = list.filter(d => !d.fireRating.includes('FD') && !d.fireRating.includes('Minute'));
        }
        // 5. Sorting
        const sort = this.sortBy();
        return [...list].sort((a, b) => {
            switch (sort) {
                case 'price_desc':
                    return (b.unitPrice || 0) - (a.unitPrice || 0);
                case 'price_asc':
                    return (a.unitPrice || 0) - (b.unitPrice || 0);
                case 'stock_desc':
                    return (b.stockQuantity || 0) - (a.stockQuantity || 0);
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'newest':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, ...(ngDevMode ? [{ debugName: "filteredDoors" }] : /* istanbul ignore next */ []));
    hasActiveFilters = computed(() => {
        return (this.searchQuery().trim().length > 0 ||
            this.selectedCategory() !== 'all' ||
            this.selectedStatus() !== 'all' ||
            this.selectedFireRating() !== 'all' ||
            this.sortBy() !== 'newest');
    }, ...(ngDevMode ? [{ debugName: "hasActiveFilters" }] : /* istanbul ignore next */ []));
    formattedTotalValue = computed(() => {
        const val = this.store.doorStats().totalValue;
        return val.toLocaleString('en-US');
    }, ...(ngDevMode ? [{ debugName: "formattedTotalValue" }] : /* istanbul ignore next */ []));
    // Action: Live Scrape from doormaster.online
    async triggerLiveScrape() {
        this.alert.toastInfo('Scraping Live Catalog', 'Connecting to https://doormaster.online/shop/...');
        const result = await this.store.scrapeLiveDoorMasterOnline();
        if (result.success) {
            this.alert.success('Scrape Completed', `Synced ${result.count} doors, categories & assets retrieved from doormaster.online.`);
        }
        else {
            this.alert.error('Scrape Failed', result.message || 'Could not complete scrape operation.');
        }
    }
    // Action: Complete Deep Scrape of All 28 Pages to MySQL
    async triggerScrapeAll28Pages() {
        this.alert.toastInfo('Deep Scrape Started', 'Scraping all 28 pages from https://doormaster.online/shop/ into MySQL database...');
        const result = await this.store.scrapeAllPagesFromBackend(1, 28);
        if (result.success) {
            this.alert.success('Deep Scrape Complete', `Scraped and saved ${result.count} doors & 20 categories into MySQL database.`);
        }
        else {
            this.alert.error('Deep Scrape Failed', result.message || 'Could not complete deep scrape to database.');
        }
    }
    // Filter Handlers
    onSearchChange(event) {
        const val = event.target.value;
        this.searchQuery.set(val);
    }
    onCategoryChange(event) {
        const val = event.target.value;
        this.selectedCategory.set(val);
    }
    onStatusChange(event) {
        const val = event.target.value;
        this.selectedStatus.set(val);
    }
    onFireRatingChange(event) {
        const val = event.target.value;
        this.selectedFireRating.set(val);
    }
    onSortChange(event) {
        const val = event.target.value;
        this.sortBy.set(val);
    }
    resetFilters() {
        this.searchQuery.set('');
        this.selectedCategory.set('all');
        this.selectedStatus.set('all');
        this.selectedFireRating.set('all');
        this.sortBy.set('newest');
    }
    // Modal Handlers
    openAddModal() {
        this.addDoorForm.reset({
            name: '',
            modelCode: '',
            category: 'Premium Villa Series',
            dimensions: '2100 × 900 × 50mm',
            material: '',
            finish: 'Multi-Layer Thermoset Enamel',
            hardwareSpecs: '',
            fireRating: 'None / Residential',
            acousticRating: 'Standard',
            unitPrice: 4750,
            stockQuantity: 5,
            leadTimeDays: 3,
            status: 'in_stock',
            supplierOrWorkshop: 'Door Master Official (doormaster.online)',
            imageUrl: 'https://doormaster.online/wp-content/uploads/2014/08/l7-500x600.png',
            warrantyYears: 10,
            description: ''
        });
        this.showAddModal.set(true);
    }
    closeAddModal() {
        this.showAddModal.set(false);
    }
    openDetailModal(door) {
        this.inspectingDoor.set(door);
    }
    pickPresetImage(url) {
        this.addDoorForm.patchValue({ imageUrl: url });
    }
    isFieldInvalid(fieldName) {
        const field = this.addDoorForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }
    submitNewDoor() {
        if (this.addDoorForm.invalid) {
            this.addDoorForm.markAllAsTouched();
            this.alert.toastWarning('Incomplete Fields', 'Please fill in all required door specifications.');
            return;
        }
        this.isSubmitting.set(true);
        const formVals = this.addDoorForm.getRawValue();
        try {
            const created = this.store.addDoor({
                name: formVals.name.trim(),
                modelCode: formVals.modelCode.trim().toUpperCase(),
                category: formVals.category,
                dimensions: formVals.dimensions.trim(),
                material: formVals.material.trim(),
                finish: formVals.finish.trim(),
                hardwareSpecs: formVals.hardwareSpecs.trim(),
                fireRating: formVals.fireRating,
                acousticRating: formVals.acousticRating,
                unitPrice: Number(formVals.unitPrice),
                formattedPrice: `₵${Number(formVals.unitPrice).toLocaleString('en-US')}.00`,
                stockQuantity: Number(formVals.stockQuantity),
                leadTimeDays: Number(formVals.leadTimeDays) || 3,
                status: formVals.status,
                supplierOrWorkshop: formVals.supplierOrWorkshop.trim(),
                imageUrl: formVals.imageUrl.trim() || undefined,
                description: formVals.description.trim() || `${formVals.name} DoorMaster architectural door system.`,
                warrantyYears: Number(formVals.warrantyYears) || 10
            });
            this.closeAddModal();
            this.alert.success('Door Added to Catalog', `Architectural door "${created.name}" (${created.modelCode}) registered successfully.`);
        }
        catch (err) {
            this.alert.error('Failed to Add Door', err.message || 'Could not register door to catalog.');
        }
        finally {
            this.isSubmitting.set(false);
        }
    }
    async confirmDelete(door) {
        const confirmed = await this.alert.confirm('Delete Door Model?', `Are you sure you want to remove "${door.name}" (${door.modelCode}) from the catalog? This cannot be undone.`, 'Delete Door', 'Cancel', true);
        if (confirmed) {
            this.store.deleteDoor(door.id);
            this.alert.toastSuccess('Door Removed', `"${door.name}" was removed from the catalog.`);
        }
    }
    triggerToast(msg) {
        this.toastMessage.set(msg);
        setTimeout(() => {
            this.toastMessage.set(null);
        }, 4500);
    }
    // Formatting & Icon helpers for DoorMaster categories
    getCategoryIcon(category) {
        const c = (category || '').toLowerCase();
        if (c.includes('villa'))
            return 'villa';
        if (c.includes('royal'))
            return 'workspace_premium';
        if (c.includes('smart') || c.includes('handle'))
            return 'fingerprint';
        if (c.includes('glass') || c.includes('reeded'))
            return 'grid_view';
        if (c.includes('interior'))
            return 'meeting_room';
        if (c.includes('fire'))
            return 'local_fire_department';
        if (c.includes('antifade') || c.includes('antirust'))
            return 'wb_sunny';
        if (c.includes('economy'))
            return 'savings';
        if (c.includes('pivot'))
            return 'meeting_room';
        if (c.includes('wood'))
            return 'forest';
        if (c.includes('sliding') || c.includes('pocket'))
            return 'door_sliding';
        if (c.includes('bi_fold') || c.includes('patio'))
            return 'view_carousel';
        return 'door_front';
    }
    getCategoryBadgeClass(category) {
        const c = (category || '').toLowerCase();
        if (c.includes('villa')) {
            return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
        }
        if (c.includes('royal')) {
            return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
        }
        if (c.includes('smart') || c.includes('handle')) {
            return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20';
        }
        if (c.includes('interior')) {
            return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
        }
        if (c.includes('antifade') || c.includes('antirust')) {
            return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
        }
        if (c.includes('glass') || c.includes('reeded')) {
            return 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20';
        }
        if (c.includes('fire')) {
            return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
        }
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
    formatStatusName(status) {
        switch (status) {
            case 'in_stock': return 'In Stock';
            case 'low_stock': return 'Low Stock';
            case 'made_to_order': return 'Made to Order';
            case 'discontinued': return 'Discontinued';
            default: return status;
        }
    }
    getStatusBadgeClass(status) {
        switch (status) {
            case 'in_stock':
                return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300';
            case 'low_stock':
                return 'bg-amber-50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300';
            case 'made_to_order':
                return 'bg-indigo-50 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300';
            case 'discontinued':
                return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    }
    getStatusDotClass(status) {
        switch (status) {
            case 'in_stock': return 'bg-emerald-500';
            case 'low_stock': return 'bg-amber-500';
            case 'made_to_order': return 'bg-indigo-500';
            case 'discontinued': return 'bg-slate-400';
            default: return 'bg-slate-400';
        }
    }
    static ɵfac = function DoorsCatalog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DoorsCatalog)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DoorsCatalog, selectors: [["app-doors-catalog"]], decls: 181, vars: 71, consts: [[1, "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "p-6", "shadow-xs", "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-5"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mb-2"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-mono", "font-bold", "bg-emerald-500/10", "text-emerald-700", "dark:text-emerald-400", "border", "border-emerald-500/20"], [1, "!text-sm"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-mono", "font-semibold", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "border", "border-slate-200", "dark:border-slate-700"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "mt-1", "max-w-2xl", "leading-relaxed"], [1, "flex", "flex-wrap", "items-center", "gap-2.5", "shrink-0"], ["type", "button", "title", "Scrape all 28 pages from https://doormaster.online/shop/page/1/ to page/28/ directly into MySQL database", 1, "px-4", "py-2.5", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-2", "active:scale-[0.98]", "cursor-pointer", "disabled:opacity-60", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "!text-lg"], [1, "text-xs", "tracking-tight", "font-extrabold"], [1, "text-[10px]", "font-mono", "px-1.5", "py-0.5", "rounded", "bg-indigo-400/20", "text-indigo-200", "border", "border-indigo-400/30"], ["type", "button", "title", "Scrape and update door data, categories, and images live from https://doormaster.online/shop/", 1, "px-3.5", "py-2.5", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-2", "active:scale-[0.98]", "cursor-pointer", "disabled:opacity-60", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "text-xs", "tracking-tight"], ["type", "button", 1, "px-4", "py-2.5", "bg-slate-950", "hover:bg-slate-800", "text-white", "dark:bg-slate-800", "dark:hover:bg-slate-700", "dark:text-white", "font-bold", "rounded-xl", "transition-all", "shadow-sm", "flex", "items-center", "gap-2", "active:scale-[0.98]", "cursor-pointer", 3, "click"], [1, "p-3.5", "rounded-xl", "border", "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "justify-between", "gap-3", "text-xs", "transition-colors"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0"], [1, "!text-base"], [1, "flex", "items-center", "gap-2"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "font-mono", "px-2", "py-0.5", "rounded", "font-bold", "uppercase"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-2", "self-end", "sm:self-auto", "shrink-0"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "border", "font-mono", "text-xs", "font-semibold", "transition-all", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [1, "grid", "grid-cols-2", "lg:grid-cols-5", "gap-3.5"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "p-4", "rounded-xl", "shadow-2xs"], [1, "flex", "items-center", "justify-between", "text-slate-500", "dark:text-slate-400", "mb-1"], [1, "text-[11px]", "font-mono", "uppercase", "tracking-wider", "font-semibold"], [1, "!text-base", "text-slate-400"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-white", "font-mono"], [1, "text-[10px]", "text-slate-400"], [1, "text-[11px]", "font-mono", "uppercase", "tracking-wider", "font-semibold", "text-emerald-600", "dark:text-emerald-400"], [1, "!text-base", "text-emerald-500"], [1, "text-2xl", "font-black", "text-emerald-600", "dark:text-emerald-400", "font-mono"], [1, "text-[11px]", "font-mono", "uppercase", "tracking-wider", "font-semibold", "text-amber-600", "dark:text-amber-400"], [1, "!text-base", "text-amber-500"], [1, "text-2xl", "font-black", "text-amber-600", "dark:text-amber-400", "font-mono"], [1, "text-[11px]", "font-mono", "uppercase", "tracking-wider", "font-semibold", "text-indigo-600", "dark:text-indigo-400"], [1, "!text-base", "text-indigo-500"], [1, "text-2xl", "font-black", "text-indigo-600", "dark:text-indigo-400", "font-mono"], [1, "col-span-2", "lg:col-span-1", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "p-4", "rounded-xl", "shadow-2xs"], [1, "text-[11px]", "font-mono", "uppercase", "tracking-wider", "font-semibold", "text-emerald-700", "dark:text-emerald-400"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "p-4", "shadow-xs", "space-y-3.5"], [1, "grid", "grid-cols-1", "md:grid-cols-12", "gap-3", "items-center"], [1, "md:col-span-4", "relative"], [1, "!text-base", "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "pointer-events-none"], ["type", "text", "placeholder", "Search door model, code, series or specs...", 1, "w-full", "pl-9", "pr-8", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "placeholder:text-slate-400", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "focus:border-emerald-500", "transition-all", 3, "input", "value"], ["type", "button", "title", "Clear search", 1, "absolute", "right-2.5", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", "p-0.5"], [1, "md:col-span-3"], [1, "w-full", "py-2", "px-3", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "focus:border-emerald-500", "cursor-pointer", "font-medium", 3, "change", "value"], ["value", "all"], [3, "value"], [1, "md:col-span-2"], [1, "w-full", "py-2", "px-3", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "focus:border-emerald-500", "cursor-pointer", 3, "change", "value"], ["value", "in_stock"], ["value", "low_stock"], ["value", "made_to_order"], ["value", "discontinued"], [1, "md:col-span-3", "flex", "items-center", "gap-2"], [1, "flex-1", "py-2", "px-3", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "focus:border-emerald-500", "cursor-pointer", 3, "change", "value"], ["value", "rated"], ["value", "fd60"], ["value", "fd30"], ["value", "standard"], ["type", "button", "title", "Reset all filters", 1, "px-2.5", "py-2", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300", "rounded-xl", "text-xs", "font-semibold", "shrink-0", "flex", "items-center", "gap-1", "transition-colors", "cursor-pointer"], [1, "flex", "items-center", "gap-1.5", "overflow-x-auto", "pb-1", "pt-1", "no-scrollbar", "text-xs", "border-t", "border-slate-100", "dark:border-slate-800/60"], [1, "text-[10px]", "font-mono", "uppercase", "text-slate-400", "shrink-0", "mr-1", "flex", "items-center", "gap-1"], [1, "!text-xs"], ["type", "button", 1, "px-2.5", "py-1", "rounded-lg", "text-[11px]", "font-medium", "shrink-0", "transition-colors", "cursor-pointer", "border", 3, "click"], ["type", "button", 1, "px-2.5", "py-1", "rounded-lg", "text-[11px]", "font-medium", "shrink-0", "transition-colors", "cursor-pointer", "border", "flex", "items-center", "gap-1", 3, "class"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "pt-2", "text-xs"], [1, "text-slate-500", "dark:text-slate-400", "font-medium"], [1, "text-slate-900", "dark:text-white"], [1, "ml-1", "text-emerald-600", "dark:text-emerald-400", "font-mono", "font-semibold"], [1, "text-slate-400", "text-[11px]", "font-mono", "uppercase"], [1, "py-1", "px-2.5", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-lg", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "cursor-pointer", "font-medium", 3, "change", "value"], ["value", "newest"], ["value", "price_desc"], ["value", "price_asc"], ["value", "stock_desc"], ["value", "name_asc"], [1, "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "shadow-xs", "overflow-hidden"], [1, "py-16", "px-6", "text-center"], [1, "overflow-x-auto"], [1, "fixed", "bottom-6", "right-6", "z-50", "bg-slate-950", "text-white", "dark:bg-white", "dark:text-slate-950", "px-4", "py-3", "rounded-xl", "shadow-xl", "flex", "items-center", "gap-3", "text-xs", "font-semibold", "animate-bounce"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "overflow-y-auto", "bg-slate-950/70", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-4"], [1, "text-slate-800", "dark:text-slate-200"], ["type", "button", "title", "Clear search", 1, "absolute", "right-2.5", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", "p-0.5", 3, "click"], ["type", "button", "title", "Reset all filters", 1, "px-2.5", "py-2", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300", "rounded-xl", "text-xs", "font-semibold", "shrink-0", "flex", "items-center", "gap-1", "transition-colors", "cursor-pointer", 3, "click"], [1, "hidden", "sm:inline"], ["type", "button", 1, "px-2.5", "py-1", "rounded-lg", "text-[11px]", "font-medium", "shrink-0", "transition-colors", "cursor-pointer", "border", "flex", "items-center", "gap-1", 3, "click"], [1, "w-14", "h-14", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mx-auto", "mb-3", "text-slate-400"], [1, "!text-2xl"], [1, "text-base", "font-bold", "text-slate-900", "dark:text-white", "mb-1"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "max-w-sm", "mx-auto", "mb-4"], [1, "flex", "items-center", "justify-center", "gap-3"], ["type", "button", 1, "px-4", "py-2", "border", "border-slate-300", "dark:border-slate-700", "rounded-xl", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "text-xs", "font-bold", "transition-colors", "cursor-pointer", 3, "click"], [1, "w-full", "text-left", "border-collapse"], [1, "border-b", "border-slate-200", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-950/40", "text-[11px]", "font-mono", "uppercase", "tracking-wider", "text-slate-500", "dark:text-slate-400", "font-semibold"], [1, "py-3.5", "pl-6", "pr-4"], [1, "py-3.5", "px-4"], [1, "py-3.5", "pr-6", "pl-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800/60", "text-xs"], [1, "hover:bg-slate-50/60", "dark:hover:bg-slate-800/40", "transition-colors", "group"], [1, "flex", "items-center", "gap-3.5"], [1, "w-12", "h-14", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "overflow-hidden", "shrink-0", "border", "border-slate-200", "dark:border-slate-700", "flex", "items-center", "justify-center", "relative", "shadow-2xs"], ["referrerpolicy", "no-referrer", 1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-300", 3, "src", "alt"], [1, "!text-xl", "text-slate-400"], [1, "font-bold", "text-slate-900", "dark:text-white", "text-xs", "group-hover:text-emerald-600", "dark:group-hover:text-emerald-400", "transition-colors"], [1, "flex", "items-center", "gap-1.5", "mt-0.5"], [1, "font-mono", "text-[10px]", "bg-slate-100", "dark:bg-slate-800", "px-1.5", "py-0.5", "rounded", "text-slate-600", "dark:text-slate-300", "font-bold", "border", "border-slate-200", "dark:border-slate-700"], [1, "text-[10px]", "text-slate-400", "font-mono"], ["target", "_blank", "rel", "noopener noreferrer", "title", "Open on doormaster.online", 1, "inline-flex", "items-center", "text-[10px]", "text-emerald-600", "dark:text-emerald-400", "hover:underline", 3, "href"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-md", "text-[10px]", "font-mono", "font-bold", "border"], [1, "py-3.5", "px-4", "max-w-[200px]"], [1, "font-mono", "text-[11px]", "font-semibold", "text-slate-900", "dark:text-white", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-slate-400"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "truncate", "mt-0.5", 3, "title"], [1, "text-[10px]", "text-slate-400", "truncate", 3, "title"], [1, "py-3.5", "px-4", "max-w-[220px]"], [1, "text-[11px]", "text-slate-700", "dark:text-slate-300", "font-medium", "truncate", 3, "title"], [1, "flex", "flex-wrap", "items-center", "gap-1.5", "mt-1"], [1, "px-1.5", "py-0.5", "rounded", "bg-red-500/10", "text-red-700", "dark:text-red-400", "border", "border-red-500/20", "text-[9px]", "font-mono", "font-bold", "flex", "items-center", "gap-0.5"], [1, "px-1.5", "py-0.5", "rounded", "bg-indigo-500/10", "text-indigo-700", "dark:text-indigo-400", "border", "border-indigo-500/20", "text-[9px]", "font-mono", "font-bold", "flex", "items-center", "gap-0.5"], [1, "text-sm", "font-black", "font-mono", "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "gap-1.5"], [1, "font-mono", "font-bold", "text-xs"], [1, "w-20", "h-1.5", "bg-slate-100", "dark:bg-slate-800", "rounded-full", "overflow-hidden", "mt-1"], [1, "h-full", "rounded-full", "transition-all"], [1, "inline-flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold"], [1, "w-1.5", "h-1.5", "rounded-full"], [1, "flex", "items-center", "justify-end", "gap-1.5"], ["type", "button", "title", "View Technical Specifications", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "dark:border-slate-700", "text-slate-600", "hover:text-slate-950", "dark:text-slate-300", "dark:hover:text-white", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], ["type", "button", "title", "Remove Door from Catalog", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "dark:border-slate-700", "text-slate-400", "hover:text-red-600", "hover:border-red-200", "dark:hover:text-red-400", "dark:hover:border-red-900/50", "hover:bg-red-50", "dark:hover:bg-red-950/30", "transition-colors", "cursor-pointer", 3, "click"], [1, "!text-[10px]"], [1, "!text-base", "text-emerald-400", "dark:text-emerald-600"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "overflow-y-auto", "bg-slate-950/70", "backdrop-blur-xs", "flex", "items-center", "justify-center", "p-4", 3, "keydown.escape"], [1, "relative", "w-full", "max-w-3xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "shadow-2xl", "overflow-hidden", "my-8"], [1, "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "bg-slate-50/60", "dark:bg-slate-950/40"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "flex", "items-center", "justify-center"], [1, "!text-xl"], [1, "text-base", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], ["type", "button", "title", "Close modal (Esc)", 1, "w-8", "h-8", "rounded-lg", "text-slate-400", "hover:text-slate-600", "dark:hover:text-slate-200", "hover:bg-slate-100", "dark:hover:bg-slate-800", "flex", "items-center", "justify-center", "transition-colors", "cursor-pointer", 3, "click"], [1, "p-6", "space-y-5", "max-h-[75vh]", "overflow-y-auto", 3, "ngSubmit", "formGroup"], [1, "space-y-3"], [1, "text-[11px]", "font-mono", "uppercase", "tracking-wider", "font-bold", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "gap-1.5"], [1, "!text-sm", "text-emerald-500"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-3.5"], ["for", "door-name", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], [1, "text-red-500"], ["id", "door-name", "type", "text", "formControlName", "name", "placeholder", "e.g. Turkey Interior DM002 Luxury Series", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-code", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-code", "type", "text", "formControlName", "modelCode", "placeholder", "e.g. DM-002", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "font-mono", "uppercase", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-category", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-category", "formControlName", "category", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "cursor-pointer"], ["value", "Premium Villa Series"], ["value", "Royal Series"], ["value", "Smart Lock Doors"], ["value", "Mechanical Lock Doors"], ["value", "Turkey interior series"], ["value", "DM Interior Series"], ["value", "Economy doors"], ["value", "Antifade doors"], ["value", "Reeded glass doors"], ["value", "entrance_pivot"], ["value", "solid_wood_entrance"], ["value", "acoustic_french"], ["value", "sliding_pocket"], ["value", "bi_fold_patio"], ["value", "fire_rated_commercial"], ["for", "door-dims", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-dims", "type", "text", "formControlName", "dimensions", "placeholder", "e.g. 2100 \u00D7 900 \u00D7 50mm", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "font-mono", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], [1, "space-y-3", "pt-3", "border-t", "border-slate-100", "dark:border-slate-800"], [1, "!text-sm", "text-indigo-500"], ["for", "door-material", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-material", "type", "text", "formControlName", "material", "placeholder", "e.g. Cast Architectural Aluminum & Insulated Honeycomb Core", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-finish", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-finish", "type", "text", "formControlName", "finish", "placeholder", "e.g. Thermoset Baked Enamel & Woodgrain UV Protection", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-hardware", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-hardware", "type", "text", "formControlName", "hardwareSpecs", "placeholder", "e.g. Multi-Point Mortise Lock, Concealed 3D Ball-Bearing Hinges", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-fire", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-fire", "formControlName", "fireRating", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "cursor-pointer"], ["value", "None / Residential"], ["value", "FD30 Rated"], ["value", "FD60 Certified"], ["for", "door-acoustic", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-acoustic", "formControlName", "acousticRating", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "cursor-pointer"], ["value", "Standard"], ["value", "35 dB Acoustic Core"], ["value", "38 dB Tested"], ["value", "42 dB Heavy Core"], [1, "!text-sm", "text-amber-500"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-3.5"], ["for", "door-price", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-price", "type", "number", "formControlName", "unitPrice", "min", "0", "placeholder", "4750", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "font-mono", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-stock", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-stock", "type", "number", "formControlName", "stockQuantity", "min", "0", "placeholder", "5", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "rounded-xl", "text-xs", "font-mono", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "transition-all"], ["for", "door-leadTime", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-leadTime", "type", "number", "formControlName", "leadTimeDays", "min", "1", "placeholder", "3", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "font-mono", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30"], ["for", "door-status", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-status", "formControlName", "status", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "cursor-pointer"], ["for", "door-img", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-img", "type", "url", "formControlName", "imageUrl", "placeholder", "https://doormaster.online/wp-content/uploads/...", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "font-mono"], [1, "flex", "flex-wrap", "items-center", "gap-1.5", "mt-2"], ["type", "button", 1, "text-[10px]", "px-2", "py-0.5", "rounded-md", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "transition-colors", "cursor-pointer"], ["for", "door-desc", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "door-desc", "formControlName", "description", "rows", "3", "placeholder", "Engineering description, floor spring requirements, reveal tolerances, and structural notes...", 1, "w-full", "px-3", "py-2", "bg-slate-50", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-xs", "text-slate-900", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "resize-none"], [1, "pt-4", "border-t", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-end", "gap-3"], ["type", "button", 1, "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-slate-700", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-800", "text-xs", "font-semibold", "transition-colors", "cursor-pointer", 3, "click"], ["type", "submit", 1, "px-5", "py-2.5", "bg-slate-950", "hover:bg-slate-800", "text-white", "dark:bg-emerald-500", "dark:hover:bg-emerald-400", "dark:text-slate-950", "font-bold", "rounded-xl", "text-xs", "transition-all", "shadow-md", "flex", "items-center", "gap-2", "cursor-pointer", "disabled:opacity-50", 3, "disabled"], ["type", "button", 1, "text-[10px]", "px-2", "py-0.5", "rounded-md", "bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "transition-colors", "cursor-pointer", 3, "click"], [1, "relative", "w-full", "max-w-2xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "shadow-2xl", "overflow-hidden", "my-8"], [1, "relative", "h-64", "w-full", "bg-slate-950"], ["type", "button", "title", "Close", 1, "absolute", "top-4", "right-4", "w-8", "h-8", "rounded-full", "bg-slate-950/60", "backdrop-blur-md", "text-white", "hover:bg-slate-950", "flex", "items-center", "justify-center", "transition-colors", "cursor-pointer", 3, "click"], [1, "absolute", "bottom-4", "left-6", "right-6"], [1, "flex", "items-center", "gap-2", "mb-1.5"], [1, "px-2", "py-0.5", "rounded", "text-[10px]", "font-mono", "font-bold", "bg-emerald-500", "text-slate-950"], [1, "px-2", "py-0.5", "rounded", "text-[10px]", "font-mono", "bg-white/20", "text-white", "backdrop-blur-xs"], [1, "text-xl", "font-black", "text-white", "tracking-tight", "leading-snug"], [1, "p-6", "space-y-4", "max-h-[60vh]", "overflow-y-auto", "text-xs"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "gap-3", "bg-slate-50", "dark:bg-slate-950/50", "p-3.5", "rounded-xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "text-[10px]", "font-mono", "uppercase", "text-slate-400", "block"], [1, "text-base", "font-black", "font-mono", "text-emerald-600", "dark:text-emerald-400"], [1, "text-base", "font-black", "font-mono", "text-slate-900", "dark:text-white"], [1, "space-y-2.5"], [1, "flex", "items-start", "justify-between", "py-2", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "font-mono", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-slate-900", "dark:text-white", "text-right", "max-w-xs"], [1, "bg-slate-50", "dark:bg-slate-950/60", "p-3.5", "rounded-xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "text-[10px]", "font-mono", "uppercase", "text-slate-400", "block", "mb-1"], [1, "text-slate-700", "dark:text-slate-300", "leading-relaxed"], [1, "px-6", "py-4", "bg-slate-50/70", "dark:bg-slate-950/60", "border-t", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between"], [1, "text-[11px]", "text-slate-400", "font-mono"], ["type", "button", 1, "px-4", "py-2", "bg-slate-950", "dark:bg-white", "text-white", "dark:text-slate-950", "rounded-xl", "text-xs", "font-bold", "hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], ["referrerpolicy", "no-referrer", 1, "w-full", "h-full", "object-contain", "bg-slate-900", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-950", "via-slate-950/20", "to-transparent"], ["target", "_blank", "rel", "noopener noreferrer", 1, "text-emerald-600", "dark:text-emerald-400", "hover:underline", "flex", "items-center", "gap-1", "font-semibold", 3, "href"]], template: function DoorsCatalog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span", 3)(5, "mat-icon", 4);
            i0.ɵɵtext(6, "meeting_room");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "MASTER CATALOG & INVENTORY");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "span", 5);
            i0.ɵɵelement(10, "span", 6);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Source: doormaster.online");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "h1", 7);
            i0.ɵɵtext(14, " Door Catalog & Specifications ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 8);
            i0.ɵɵtext(16, " Live catalog synchronized with ");
            i0.ɵɵelementStart(17, "strong");
            i0.ɵɵtext(18, "https://doormaster.online/shop/");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(19, " featuring genuine DoorMaster product lines (Premium Villa, Royal Series, Smart Lock Doors, Turkey Interior Series, Reeded Glass, and Antifade Exterior Doors). ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 9)(21, "button", 10);
            i0.ɵɵlistener("click", function DoorsCatalog_Template_button_click_21_listener() { return ctx.triggerScrapeAll28Pages(); });
            i0.ɵɵelementStart(22, "mat-icon", 11);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 12);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span", 13);
            i0.ɵɵtext(27, " 329 Doors ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "button", 14);
            i0.ɵɵlistener("click", function DoorsCatalog_Template_button_click_28_listener() { return ctx.triggerLiveScrape(); });
            i0.ɵɵelementStart(29, "mat-icon", 11);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "button", 16);
            i0.ɵɵlistener("click", function DoorsCatalog_Template_button_click_33_listener() { return ctx.openAddModal(); });
            i0.ɵɵelementStart(34, "mat-icon", 11);
            i0.ɵɵtext(35, "add_circle");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "span", 15);
            i0.ɵɵtext(37, "Add Door");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(38, "div", 17)(39, "div", 18)(40, "div", 19)(41, "mat-icon", 20);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div")(44, "div", 21)(45, "span", 22);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span", 23);
            i0.ɵɵtext(48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "p", 24);
            i0.ɵɵconditionalCreate(50, DoorsCatalog_Conditional_50_Template, 10, 2)(51, DoorsCatalog_Conditional_51_Template, 1, 0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(52, "div", 25)(53, "button", 26);
            i0.ɵɵlistener("click", function DoorsCatalog_Template_button_click_53_listener() { return ctx.store.setDataMode(ctx.store.dataMode() === "demo" ? "api" : "demo"); });
            i0.ɵɵtext(54);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(55, "div", 27)(56, "div", 28)(57, "div", 29)(58, "span", 30);
            i0.ɵɵtext(59, "Catalog Models");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "mat-icon", 31);
            i0.ɵɵtext(61, "inventory_2");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "div", 32);
            i0.ɵɵtext(63);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "span", 33);
            i0.ɵɵtext(65, "DoorMaster registered profiles");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(66, "div", 28)(67, "div", 29)(68, "span", 34);
            i0.ɵɵtext(69, "In Stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "mat-icon", 35);
            i0.ɵɵtext(71, "check_circle");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "div", 36);
            i0.ɵɵtext(73);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "span", 33);
            i0.ɵɵtext(75, "Ready for immediate dispatch");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(76, "div", 28)(77, "div", 29)(78, "span", 37);
            i0.ɵɵtext(79, "Low Stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "mat-icon", 38);
            i0.ɵɵtext(81, "warning");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div", 39);
            i0.ɵɵtext(83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "span", 33);
            i0.ɵɵtext(85, "Under 3 units remaining");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "div", 28)(87, "div", 29)(88, "span", 40);
            i0.ɵɵtext(89, "Bespoke / Build");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "mat-icon", 41);
            i0.ɵɵtext(91, "handyman");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(92, "div", 42);
            i0.ɵɵtext(93);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "span", 33);
            i0.ɵɵtext(95, "Fabricated on commission");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(96, "div", 43)(97, "div", 29)(98, "span", 44);
            i0.ɵɵtext(99, "Stock Value");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "mat-icon", 35);
            i0.ɵɵtext(101, "payments");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(102, "div", 32);
            i0.ɵɵtext(103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "span", 33);
            i0.ɵɵtext(105);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(106, "div", 45)(107, "div", 46)(108, "div", 47)(109, "mat-icon", 48);
            i0.ɵɵtext(110, "search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "input", 49);
            i0.ɵɵlistener("input", function DoorsCatalog_Template_input_input_111_listener($event) { return ctx.onSearchChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(112, DoorsCatalog_Conditional_112_Template, 3, 0, "button", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "div", 51)(114, "select", 52);
            i0.ɵɵlistener("change", function DoorsCatalog_Template_select_change_114_listener($event) { return ctx.onCategoryChange($event); });
            i0.ɵɵelementStart(115, "option", 53);
            i0.ɵɵtext(116);
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(117, DoorsCatalog_For_118_Template, 2, 3, "option", 54, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(119, "div", 55)(120, "select", 56);
            i0.ɵɵlistener("change", function DoorsCatalog_Template_select_change_120_listener($event) { return ctx.onStatusChange($event); });
            i0.ɵɵelementStart(121, "option", 53);
            i0.ɵɵtext(122, "All Statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(123, "option", 57);
            i0.ɵɵtext(124, "In Stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "option", 58);
            i0.ɵɵtext(126, "Low Stock (\u2264 2)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(127, "option", 59);
            i0.ɵɵtext(128, "Made to Order");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(129, "option", 60);
            i0.ɵɵtext(130, "Discontinued");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(131, "div", 61)(132, "select", 62);
            i0.ɵɵlistener("change", function DoorsCatalog_Template_select_change_132_listener($event) { return ctx.onFireRatingChange($event); });
            i0.ɵɵelementStart(133, "option", 53);
            i0.ɵɵtext(134, "All Fire Ratings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(135, "option", 63);
            i0.ɵɵtext(136, "Any Fire Certified (FD30 / FD60)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "option", 64);
            i0.ɵɵtext(138, "FD60 Commercial");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(139, "option", 65);
            i0.ɵɵtext(140, "FD30 Rated");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "option", 66);
            i0.ɵɵtext(142, "Standard Non-Fire");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(143, DoorsCatalog_Conditional_143_Template, 5, 0, "button", 67);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(144, "div", 68)(145, "span", 69)(146, "mat-icon", 70);
            i0.ɵɵtext(147, "label");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(148, "span");
            i0.ɵɵtext(149, "Series:");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(150, "button", 71);
            i0.ɵɵlistener("click", function DoorsCatalog_Template_button_click_150_listener() { return ctx.selectedCategory.set("all"); });
            i0.ɵɵtext(151);
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(152, DoorsCatalog_For_153_Template, 5, 5, "button", 72, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(154, "div", 73)(155, "div", 74);
            i0.ɵɵtext(156, " Showing ");
            i0.ɵɵelementStart(157, "strong", 75);
            i0.ɵɵtext(158);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(159);
            i0.ɵɵconditionalCreate(160, DoorsCatalog_Conditional_160_Template, 2, 0, "span", 76);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(161, "div", 21)(162, "span", 77);
            i0.ɵɵtext(163, "Sort By:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(164, "select", 78);
            i0.ɵɵlistener("change", function DoorsCatalog_Template_select_change_164_listener($event) { return ctx.onSortChange($event); });
            i0.ɵɵelementStart(165, "option", 79);
            i0.ɵɵtext(166, "Featured & Newest");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "option", 80);
            i0.ɵɵtext(168, "Price: High to Low");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(169, "option", 81);
            i0.ɵɵtext(170, "Price: Low to High");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "option", 82);
            i0.ɵɵtext(172, "Highest Stock Available");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "option", 83);
            i0.ɵɵtext(174, "Model Name (A-Z)");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(175, "div", 84);
            i0.ɵɵconditionalCreate(176, DoorsCatalog_Conditional_176_Template, 13, 0, "div", 85)(177, DoorsCatalog_Conditional_177_Template, 23, 0, "div", 86);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(178, DoorsCatalog_Conditional_178_Template, 5, 1, "div", 87);
            i0.ɵɵconditionalCreate(179, DoorsCatalog_Conditional_179_Template, 184, 18, "div", 88);
            i0.ɵɵconditionalCreate(180, DoorsCatalog_Conditional_180_Template, 91, 23, "div", 88);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(21);
            i0.ɵɵproperty("disabled", ctx.store.isScraping());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("animate-spin", ctx.store.isScraping());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.store.isScraping() ? "sync" : "cloud_download", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.store.isScraping() ? "Scraping Pages 1-28 to MySQL..." : "Scrape All 28 Pages to MySQL", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.store.isScraping());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("animate-spin", ctx.store.isScraping());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.store.isScraping() ? "refresh" : "sync", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.store.isScraping() ? "Syncing..." : "Quick Sync", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("bg-indigo-950/20", ctx.store.dataMode() === "api")("border-indigo-500/30", ctx.store.dataMode() === "api")("bg-emerald-950/20", ctx.store.dataMode() === "demo")("border-emerald-500/30", ctx.store.dataMode() === "demo");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("bg-indigo-500/20", ctx.store.dataMode() === "api")("text-indigo-400", ctx.store.dataMode() === "api")("bg-emerald-500/20", ctx.store.dataMode() === "demo")("text-emerald-400", ctx.store.dataMode() === "demo");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.store.dataMode() === "api" ? "storage" : "science");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.store.dataMode() === "api" ? "Active Backend Mode: Live MySQL Database" : "Active Backend Mode: Demo Mode", " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("bg-indigo-500/20", ctx.store.dataMode() === "api")("text-indigo-400", ctx.store.dataMode() === "api")("bg-emerald-500/20", ctx.store.dataMode() === "demo")("text-emerald-400", ctx.store.dataMode() === "demo");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.store.dataMode(), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.store.dataMode() === "api" ? 50 : 51);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("border-indigo-500/40", ctx.store.dataMode() === "api")("text-indigo-400", ctx.store.dataMode() === "api")("border-emerald-500/40", ctx.store.dataMode() === "demo")("text-emerald-400", ctx.store.dataMode() === "demo");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.store.dataMode() === "demo" ? "Switch to Live MySQL API \u2192" : "Switch to Demo Mode \u2192", " ");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1(" ", ctx.store.doorStats().totalModels, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.store.doorStats().inStockCount, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.store.doorStats().lowStockCount, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.store.doorStats().madeToOrderCount, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" \u20B5", ctx.formattedTotalValue(), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.store.doorStats().totalUnits, " physical units in warehouse");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.searchQuery());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.searchQuery() ? 112 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.selectedCategory());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("All Door Categories (", ctx.store.doors().length, ")");
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.store.availableCategories());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", ctx.selectedStatus());
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("value", ctx.selectedFireRating());
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.hasActiveFilters() ? 143 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap(ctx.selectedCategory() === "all" ? "bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950 border-transparent font-bold" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" All (", ctx.store.doors().length, ") ");
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.store.availableCategories());
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.filteredDoors().length);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" of ", ctx.store.doors().length, " DoorMaster catalog profiles ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasActiveFilters() ? 160 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.sortBy());
            i0.ɵɵadvance(12);
            i0.ɵɵconditional(ctx.filteredDoors().length === 0 ? 176 : 177);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.toastMessage() ? 178 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showAddModal() ? 179 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.inspectingDoor() ? 180 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, MatIconModule, i2.MatIcon, DecimalPipe], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DoorsCatalog, [{
        type: Component,
        args: [{
                selector: 'app-doors-catalog',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [
                    ReactiveFormsModule,
                    MatIconModule,
                    DecimalPipe
                ],
                template: `
    <div class="space-y-6">
      <!-- 1. Header Banner & DoorMaster Scraping Synchronization Bar -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <mat-icon class="!text-sm">meeting_room</mat-icon>
              <span>MASTER CATALOG & INVENTORY</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Source: doormaster.online</span>
            </span>
          </div>
          <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Door Catalog & Specifications
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Live catalog synchronized with <strong>https://doormaster.online/shop/</strong> featuring genuine DoorMaster product lines (Premium Villa, Royal Series, Smart Lock Doors, Turkey Interior Series, Reeded Glass, and Antifade Exterior Doors).
          </p>
        </div>

        <!-- Header Actions: Live Scraper & Manual Add -->
        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <!-- Deep Scrape All 28 Pages to MySQL -->
          <button
            type="button"
            (click)="triggerScrapeAll28Pages()"
            [disabled]="store.isScraping()"
            class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            title="Scrape all 28 pages from https://doormaster.online/shop/page/1/ to page/28/ directly into MySQL database"
          >
            <mat-icon class="!text-lg" [class.animate-spin]="store.isScraping()">
              {{ store.isScraping() ? 'sync' : 'cloud_download' }}
            </mat-icon>
            <span class="text-xs tracking-tight font-extrabold">
              {{ store.isScraping() ? 'Scraping Pages 1-28 to MySQL...' : 'Scrape All 28 Pages to MySQL' }}
            </span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
              329 Doors
            </span>
          </button>

          <button
            type="button"
            (click)="triggerLiveScrape()"
            [disabled]="store.isScraping()"
            class="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            title="Scrape and update door data, categories, and images live from https://doormaster.online/shop/"
          >
            <mat-icon class="!text-lg" [class.animate-spin]="store.isScraping()">
              {{ store.isScraping() ? 'refresh' : 'sync' }}
            </mat-icon>
            <span class="text-xs tracking-tight">
              {{ store.isScraping() ? 'Syncing...' : 'Quick Sync' }}
            </span>
          </button>

          <button
            type="button"
            (click)="openAddModal()"
            class="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <mat-icon class="!text-lg">add_circle</mat-icon>
            <span class="text-xs tracking-tight">Add Door</span>
          </button>
        </div>
      </div>

      <!-- MySQL Database & Backend Status Banner -->
      <div class="p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-colors"
        [class.bg-indigo-950/20]="store.dataMode() === 'api'"
        [class.border-indigo-500/30]="store.dataMode() === 'api'"
        [class.bg-emerald-950/20]="store.dataMode() === 'demo'"
        [class.border-emerald-500/30]="store.dataMode() === 'demo'"
      >
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            [class.bg-indigo-500/20]="store.dataMode() === 'api'"
            [class.text-indigo-400]="store.dataMode() === 'api'"
            [class.bg-emerald-500/20]="store.dataMode() === 'demo'"
            [class.text-emerald-400]="store.dataMode() === 'demo'"
          >
            <mat-icon class="!text-base">{{ store.dataMode() === 'api' ? 'storage' : 'science' }}</mat-icon>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900 dark:text-white">
                {{ store.dataMode() === 'api' ? 'Active Backend Mode: Live MySQL Database' : 'Active Backend Mode: Demo Mode' }}
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                [class.bg-indigo-500/20]="store.dataMode() === 'api'"
                [class.text-indigo-400]="store.dataMode() === 'api'"
                [class.bg-emerald-500/20]="store.dataMode() === 'demo'"
                [class.text-emerald-400]="store.dataMode() === 'demo'"
              >
                {{ store.dataMode() }}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              @if (store.dataMode() === 'api') {
                Connected to <strong class="text-slate-800 dark:text-slate-200">doormaster_ops</strong> on MySQL 127.0.0.1:3306 • Storing <strong>{{ store.doors().length }}</strong> scraped doors across <strong>{{ store.availableCategories().length }}</strong> categories.
              } @else {
                Running in Demo Mode for rapid testing with simulated field data. All 329 scraped doors are also cached locally.
              }
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            (click)="store.setDataMode(store.dataMode() === 'demo' ? 'api' : 'demo')"
            class="px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            [class.border-indigo-500/40]="store.dataMode() === 'api'"
            [class.text-indigo-400]="store.dataMode() === 'api'"
            [class.border-emerald-500/40]="store.dataMode() === 'demo'"
            [class.text-emerald-400]="store.dataMode() === 'demo'"
          >
            {{ store.dataMode() === 'demo' ? 'Switch to Live MySQL API →' : 'Switch to Demo Mode →' }}
          </button>
        </div>
      </div>

      <!-- 2. Inventory Metrics KPI Ribbon -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <!-- Total Models -->

        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold">Catalog Models</span>
            <mat-icon class="!text-base text-slate-400">inventory_2</mat-icon>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {{ store.doorStats().totalModels }}
          </div>
          <span class="text-[10px] text-slate-400">DoorMaster registered profiles</span>
        </div>

        <!-- In Stock -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">In Stock</span>
            <mat-icon class="!text-base text-emerald-500">check_circle</mat-icon>
          </div>
          <div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {{ store.doorStats().inStockCount }}
          </div>
          <span class="text-[10px] text-slate-400">Ready for immediate dispatch</span>
        </div>

        <!-- Low Stock -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">Low Stock</span>
            <mat-icon class="!text-base text-amber-500">warning</mat-icon>
          </div>
          <div class="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {{ store.doorStats().lowStockCount }}
          </div>
          <span class="text-[10px] text-slate-400">Under 3 units remaining</span>
        </div>

        <!-- Made to Order -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">Bespoke / Build</span>
            <mat-icon class="!text-base text-indigo-500">handyman</mat-icon>
          </div>
          <div class="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {{ store.doorStats().madeToOrderCount }}
          </div>
          <span class="text-[10px] text-slate-400">Fabricated on commission</span>
        </div>

        <!-- Inventory Value -->
        <div class="col-span-2 lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">Stock Value</span>
            <mat-icon class="!text-base text-emerald-500">payments</mat-icon>
          </div>
          <div class="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ₵{{ formattedTotalValue() }}
          </div>
          <span class="text-[10px] text-slate-400">{{ store.doorStats().totalUnits }} physical units in warehouse</span>
        </div>
      </div>

      <!-- 3. Filter Controls Toolbar & Category Quick-Pills -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3.5">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <!-- Text Search Filter -->
          <div class="md:col-span-4 relative">
            <mat-icon class="!text-base absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">search</mat-icon>
            <input
              type="text"
              [value]="searchQuery()"
              (input)="onSearchChange($event)"
              placeholder="Search door model, code, series or specs..."
              class="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
            @if (searchQuery()) {
              <button
                type="button"
                (click)="searchQuery.set('')"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                title="Clear search"
              >
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            }
          </div>

          <!-- Dynamic Category Selector from Scraped Categories -->
          <div class="md:col-span-3">
            <select
              [value]="selectedCategory()"
              (change)="onCategoryChange($event)"
              class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer font-medium"
            >
              <option value="all">All Door Categories ({{ store.doors().length }})</option>
              @for (cat of store.availableCategories(); track cat.name) {
                <option [value]="cat.name">{{ cat.name }} ({{ cat.count }})</option>
              }
            </select>
          </div>

          <!-- Stock Status Selector -->
          <div class="md:col-span-2">
            <select
              [value]="selectedStatus()"
              (change)="onStatusChange($event)"
              class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock (≤ 2)</option>
              <option value="made_to_order">Made to Order</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          <!-- Fire Rating Filter -->
          <div class="md:col-span-3 flex items-center gap-2">
            <select
              [value]="selectedFireRating()"
              (change)="onFireRatingChange($event)"
              class="flex-1 py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Fire Ratings</option>
              <option value="rated">Any Fire Certified (FD30 / FD60)</option>
              <option value="fd60">FD60 Commercial</option>
              <option value="fd30">FD30 Rated</option>
              <option value="standard">Standard Non-Fire</option>
            </select>

            <!-- Reset Filters Button -->
            @if (hasActiveFilters()) {
              <button
                type="button"
                (click)="resetFilters()"
                class="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <mat-icon class="!text-sm">restart_alt</mat-icon>
                <span class="hidden sm:inline">Reset</span>
              </button>
            }
          </div>
        </div>

        <!-- Quick DoorMaster Category Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs border-t border-slate-100 dark:border-slate-800/60">
          <span class="text-[10px] font-mono uppercase text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <mat-icon class="!text-xs">label</mat-icon>
            <span>Series:</span>
          </span>
          <button
            type="button"
            (click)="selectedCategory.set('all')"
            class="px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-colors cursor-pointer border"
            [class]="selectedCategory() === 'all' ? 'bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950 border-transparent font-bold' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
          >
            All ({{ store.doors().length }})
          </button>
          @for (cat of store.availableCategories(); track cat.name) {
            <button
              type="button"
              (click)="selectedCategory.set(cat.name)"
              class="px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-colors cursor-pointer border flex items-center gap-1"
              [class]="selectedCategory() === cat.name ? 'bg-emerald-600 text-white border-transparent font-bold shadow-xs' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
            >
              <mat-icon class="!text-xs">{{ getCategoryIcon(cat.name) }}</mat-icon>
              <span>{{ cat.name }} ({{ cat.count }})</span>
            </button>
          }
        </div>

        <!-- Sub-filter bar: Sort Order & Count Feedback -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div class="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong class="text-slate-900 dark:text-white">{{ filteredDoors().length }}</strong> of {{ store.doors().length }} DoorMaster catalog profiles
            @if (hasActiveFilters()) {
              <span class="ml-1 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">(filtered)</span>
            }
          </div>

          <!-- Sort Selector -->
          <div class="flex items-center gap-2">
            <span class="text-slate-400 text-[11px] font-mono uppercase">Sort By:</span>
            <select
              [value]="sortBy()"
              (change)="onSortChange($event)"
              class="py-1 px-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none cursor-pointer font-medium"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="stock_desc">Highest Stock Available</option>
              <option value="name_asc">Model Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 4. Doors Table View -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        @if (filteredDoors().length === 0) {
          <!-- Empty State -->
          <div class="py-16 px-6 text-center">
            <div class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <mat-icon class="!text-2xl">search_off</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1">No doors match your filter</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search query, selecting a different DoorMaster series, or syncing live from the shop.
            </p>
            <div class="flex items-center justify-center gap-3">
              <button
                type="button"
                (click)="resetFilters()"
                class="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
              <button
                type="button"
                (click)="triggerLiveScrape()"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Sync with doormaster.online
              </button>
            </div>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  <th class="py-3.5 pl-6 pr-4">Door Model & Preview</th>
                  <th class="py-3.5 px-4">Series / Category</th>
                  <th class="py-3.5 px-4">Dimensions & Material</th>
                  <th class="py-3.5 px-4">Hardware & Ratings</th>
                  <th class="py-3.5 px-4">Price (₵)</th>
                  <th class="py-3.5 px-4">Stock Level</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 pr-6 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                @for (door of filteredDoors(); track door.id) {
                  <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group">
                    <!-- Door Model & Preview -->
                    <td class="py-3.5 pl-6 pr-4">
                      <div class="flex items-center gap-3.5">
                        <div class="w-12 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-2xs">
                          @if (door.imageUrl) {
                            <img
                              [src]="door.imageUrl"
                              [alt]="door.name"
                              referrerpolicy="no-referrer"
                              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          } @else {
                            <mat-icon class="!text-xl text-slate-400">door_front</mat-icon>
                          }
                        </div>
                        <div>
                          <div class="font-bold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {{ door.name }}
                          </div>
                          <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                              {{ door.modelCode }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-mono">{{ door.id }}</span>
                            @if (door.sourceUrl) {
                              <a
                                [href]="door.sourceUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
                                title="Open on doormaster.online"
                              >
                                <mat-icon class="!text-xs">open_in_new</mat-icon>
                              </a>
                            }
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Category Badge -->
                    <td class="py-3.5 px-4">
                      <span
                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border"
                        [class]="getCategoryBadgeClass(door.category)"
                      >
                        <mat-icon class="!text-xs">{{ getCategoryIcon(door.category) }}</mat-icon>
                        <span>{{ door.category }}</span>
                      </span>
                    </td>

                    <!-- Dimensions & Material -->
                    <td class="py-3.5 px-4 max-w-[200px]">
                      <div class="font-mono text-[11px] font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                        <mat-icon class="!text-xs text-slate-400">straighten</mat-icon>
                        <span>{{ door.dimensions }}</span>
                      </div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5" [title]="door.material">
                        {{ door.material }}
                      </div>
                      <div class="text-[10px] text-slate-400 truncate" [title]="door.finish">
                        Finish: {{ door.finish }}
                      </div>
                    </td>

                    <!-- Hardware & Ratings -->
                    <td class="py-3.5 px-4 max-w-[220px]">
                      <div class="text-[11px] text-slate-700 dark:text-slate-300 font-medium truncate" [title]="door.hardwareSpecs">
                        {{ door.hardwareSpecs }}
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 mt-1">
                        @if (door.fireRating && door.fireRating !== 'None' && door.fireRating !== 'None / Standard' && door.fireRating !== 'None / Residential') {
                          <span class="px-1.5 py-0.5 rounded bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20 text-[9px] font-mono font-bold flex items-center gap-0.5">
                            <mat-icon class="!text-[10px]">local_fire_department</mat-icon>
                            <span>{{ door.fireRating }}</span>
                          </span>
                        }
                        @if (door.acousticRating && door.acousticRating !== 'Standard') {
                          <span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 text-[9px] font-mono font-bold flex items-center gap-0.5">
                            <mat-icon class="!text-[10px]">volume_off</mat-icon>
                            <span>{{ door.acousticRating }}</span>
                          </span>
                        }
                      </div>
                    </td>

                    <!-- Unit Price -->
                    <td class="py-3.5 px-4">
                      <div class="text-sm font-black font-mono text-slate-900 dark:text-white">
                        {{ door.formattedPrice || ('₵' + (door.unitPrice | number:'1.0-0')) }}
                      </div>
                      <div class="text-[10px] text-slate-400">
                        Lead: {{ door.leadTimeDays }}d
                      </div>
                    </td>

                    <!-- Inventory Stock -->
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-1.5">
                        <span class="font-mono font-bold text-xs" [class]="door.stockQuantity <= 2 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'">
                          {{ door.stockQuantity }} units
                        </span>
                      </div>
                      <!-- Visual Stock Bar -->
                      <div class="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div
                          class="h-full rounded-full transition-all"
                          [class]="door.stockQuantity === 0 ? 'bg-slate-300 dark:bg-slate-700 w-0' : (door.stockQuantity <= 2 ? 'bg-amber-500 w-1/3' : 'bg-emerald-500 w-full')"
                        ></div>
                      </div>
                    </td>

                    <!-- Status -->
                    <td class="py-3.5 px-4">
                      <span
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                        [class]="getStatusBadgeClass(door.status)"
                      >
                        <span class="w-1.5 h-1.5 rounded-full" [class]="getStatusDotClass(door.status)"></span>
                        <span>{{ formatStatusName(door.status) }}</span>
                      </span>
                    </td>

                    <!-- Actions -->
                    <td class="py-3.5 pr-6 pl-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          (click)="openDetailModal(door)"
                          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Technical Specifications"
                        >
                          <mat-icon class="!text-base">visibility</mat-icon>
                        </button>

                        <button
                          type="button"
                          (click)="confirmDelete(door)"
                          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-600 hover:border-red-200 dark:hover:text-red-400 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Remove Door from Catalog"
                        >
                          <mat-icon class="!text-base">delete_outline</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- 5. Toast Notification -->
      @if (toastMessage()) {
        <div class="fixed bottom-6 right-6 z-50 bg-slate-950 text-white dark:bg-white dark:text-slate-950 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <mat-icon class="!text-base text-emerald-400 dark:text-emerald-600">check_circle</mat-icon>
          <span>{{ toastMessage() }}</span>
        </div>
      }

      <!-- 6. ADD DOOR MODAL -->
      @if (showAddModal()) {
        <div
          class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          (keydown.escape)="closeAddModal()"
        >
          <div
            class="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <!-- Modal Header -->
            <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <mat-icon class="!text-xl">meeting_room</mat-icon>
                </div>
                <div>
                  <h2 class="text-base font-bold text-slate-900 dark:text-white">
                    Add New Door to Catalog
                  </h2>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    Register full technical specifications, hardware requirements, ratings, and inventory status.
                  </p>
                </div>
              </div>

              <button
                type="button"
                (click)="closeAddModal()"
                class="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>
            </div>

            <!-- Modal Reactive Form -->
            <form [formGroup]="addDoorForm" (ngSubmit)="submitNewDoor()" class="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <!-- General Info Section -->
              <div class="space-y-3">
                <h3 class="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-emerald-500">info</mat-icon>
                  <span>1. General Identification</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Door Name -->
                  <div>
                    <label for="door-name" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Door Name / Model Title <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-name"
                      type="text"
                      formControlName="name"
                      placeholder="e.g. Turkey Interior DM002 Luxury Series"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('name') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Model Code -->
                  <div>
                    <label for="door-code" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Model / SKU Code <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-code"
                      type="text"
                      formControlName="modelCode"
                      placeholder="e.g. DM-002"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('modelCode') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Category -->
                  <div>
                    <label for="door-category" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      DoorMaster Series / Category <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="door-category"
                      formControlName="category"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="Premium Villa Series">Premium Villa Series</option>
                      <option value="Royal Series">Royal Series</option>
                      <option value="Smart Lock Doors">Smart Lock Doors</option>
                      <option value="Mechanical Lock Doors">Mechanical Lock Doors</option>
                      <option value="Turkey interior series">Turkey Interior Series</option>
                      <option value="DM Interior Series">DM Interior Series</option>
                      <option value="Economy doors">Economy Doors</option>
                      <option value="Antifade doors">Antifade Exterior Doors</option>
                      <option value="Reeded glass doors">Reeded Glass Doors</option>
                      <option value="entrance_pivot">Architectural Entrance Pivot</option>
                      <option value="solid_wood_entrance">Solid Hardwood Entrance</option>
                      <option value="acoustic_french">Acoustic French Doors</option>
                      <option value="sliding_pocket">Pocket Sliding System</option>
                      <option value="bi_fold_patio">Bi-Fold Panoramic Patio</option>
                      <option value="fire_rated_commercial">Fire-Rated Commercial (FD60)</option>
                    </select>
                  </div>

                  <!-- Dimensions -->
                  <div>
                    <label for="door-dims" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Dimensions (H × W × D mm) <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-dims"
                      type="text"
                      formControlName="dimensions"
                      placeholder="e.g. 2100 × 900 × 50mm"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('dimensions') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>
                </div>
              </div>

              <!-- Materials & Hardware Section -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-indigo-500">construction</mat-icon>
                  <span>2. Materials & Hardware Specifications</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Core Material -->
                  <div>
                    <label for="door-material" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Core Substrate / Materials <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-material"
                      type="text"
                      formControlName="material"
                      placeholder="e.g. Cast Architectural Aluminum & Insulated Honeycomb Core"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('material') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Surface Finish -->
                  <div>
                    <label for="door-finish" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Surface Finish & Treatment <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-finish"
                      type="text"
                      formControlName="finish"
                      placeholder="e.g. Thermoset Baked Enamel & Woodgrain UV Protection"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('finish') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>
                </div>

                <!-- Hardware Specifications -->
                <div>
                  <label for="door-hardware" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Integrated Hardware Pack <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="door-hardware"
                    type="text"
                    formControlName="hardwareSpecs"
                    placeholder="e.g. Multi-Point Mortise Lock, Concealed 3D Ball-Bearing Hinges"
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                    [class]="isFieldInvalid('hardwareSpecs') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <!-- Fire Rating -->
                  <div>
                    <label for="door-fire" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Fire Rating Certification
                    </label>
                    <select
                      id="door-fire"
                      formControlName="fireRating"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="None / Residential">None / Residential Standard</option>
                      <option value="FD30 Rated">FD30 (30-Minute Resistance)</option>
                      <option value="FD60 Certified">FD60 (60-Minute Heavy Fire & Smoke)</option>
                    </select>
                  </div>

                  <!-- Acoustic Rating -->
                  <div>
                    <label for="door-acoustic" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Acoustic Sound Insulation
                    </label>
                    <select
                      id="door-acoustic"
                      formControlName="acousticRating"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="Standard">Standard (28-32 dB)</option>
                      <option value="35 dB Acoustic Core">35 dB Acoustic Core</option>
                      <option value="38 dB Tested">38 dB Sound Insulation</option>
                      <option value="42 dB Heavy Core">42 dB Heavy Core</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Pricing & Inventory Section -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 class="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <mat-icon class="!text-sm text-amber-500">monetization_on</mat-icon>
                  <span>3. Pricing & Inventory Parameters</span>
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  <!-- Unit Price -->
                  <div>
                    <label for="door-price" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Unit Price (₵ GHS) <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-price"
                      type="number"
                      formControlName="unitPrice"
                      min="0"
                      placeholder="4750"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('unitPrice') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Stock Quantity -->
                  <div>
                    <label for="door-stock" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Stock Qty (Units) <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="door-stock"
                      type="number"
                      formControlName="stockQuantity"
                      min="0"
                      placeholder="5"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                      [class]="isFieldInvalid('stockQuantity') ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-800 focus:ring-emerald-500/30'"
                    />
                  </div>

                  <!-- Lead Time -->
                  <div>
                    <label for="door-leadTime" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lead Time (Days)
                    </label>
                    <input
                      id="door-leadTime"
                      type="number"
                      formControlName="leadTimeDays"
                      min="1"
                      placeholder="3"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>

                  <!-- Status -->
                  <div>
                    <label for="door-status" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Stock Status <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="door-status"
                      formControlName="status"
                      class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="made_to_order">Made to Order</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>
                </div>

                <!-- Image URL Input & Presets -->
                <div>
                  <label for="door-img" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Image URL
                  </label>
                  <input
                    id="door-img"
                    type="url"
                    formControlName="imageUrl"
                    placeholder="https://doormaster.online/wp-content/uploads/..."
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-mono"
                  />
                  <!-- Presets -->
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[10px] text-slate-400 font-mono">Sample door imagery:</span>
                    @for (preset of imagePresets; track preset.label) {
                      <button
                        type="button"
                        (click)="pickPresetImage(preset.url)"
                        class="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {{ preset.label }}
                      </button>
                    }
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label for="door-desc" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Technical Summary & Installation Notes
                  </label>
                  <textarea
                    id="door-desc"
                    formControlName="description"
                    rows="3"
                    placeholder="Engineering description, floor spring requirements, reveal tolerances, and structural notes..."
                    class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Modal Footer Actions -->
              <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  (click)="closeAddModal()"
                  class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  [disabled]="isSubmitting()"
                  class="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <mat-icon class="!text-base">add</mat-icon>
                  <span>Register Door Model</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- 7. TECHNICAL SPECIFICATION QUICK VIEW MODAL -->
      @if (inspectingDoor()) {
        @let d = inspectingDoor()!;
        <div
          class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          (keydown.escape)="inspectingDoor.set(null)"
        >
          <div
            class="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
          >
            <!-- Hero Image Banner -->
            <div class="relative h-64 w-full bg-slate-950">
              @if (d.imageUrl) {
                <img [src]="d.imageUrl" [alt]="d.name" referrerpolicy="no-referrer" class="w-full h-full object-contain bg-slate-900" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              }
              <button
                type="button"
                (click)="inspectingDoor.set(null)"
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>

              <div class="absolute bottom-4 left-6 right-6">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-slate-950">
                    {{ d.modelCode }}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white backdrop-blur-xs">
                    {{ d.category }}
                  </span>
                </div>
                <h3 class="text-xl font-black text-white tracking-tight leading-snug">
                  {{ d.name }}
                </h3>
              </div>
            </div>

            <!-- Spec Grid Content -->
            <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Unit Price</span>
                  <span class="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {{ d.formattedPrice || ('₵' + (d.unitPrice | number:'1.0-0')) }}
                  </span>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Stock Level</span>
                  <span class="text-base font-black font-mono text-slate-900 dark:text-white">{{ d.stockQuantity }} units</span>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Lead Time</span>
                  <span class="text-base font-black font-mono text-slate-900 dark:text-white">{{ d.leadTimeDays }} days</span>
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 block">Warranty</span>
                  <span class="text-base font-black font-mono text-slate-900 dark:text-white">{{ d.warrantyYears }} years</span>
                </div>
              </div>

              <!-- Technical Details Rows -->
              <div class="space-y-2.5">
                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Series / Category</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ d.category }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Dimensions</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">{{ d.dimensions }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Substrate / Core</span>
                  <span class="text-slate-900 dark:text-white text-right max-w-xs">{{ d.material }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Finish & Tint</span>
                  <span class="text-slate-900 dark:text-white text-right max-w-xs">{{ d.finish }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Hardware Pack</span>
                  <span class="text-slate-900 dark:text-white text-right max-w-xs">{{ d.hardwareSpecs }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Fire Certification</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ d.fireRating }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Acoustic Attenuation</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ d.acousticRating }}</span>
                </div>

                <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Supplier & Source</span>
                  <span class="text-slate-900 dark:text-white">{{ d.supplierOrWorkshop }}</span>
                </div>

                @if (d.sourceUrl) {
                  <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span class="text-slate-500 dark:text-slate-400 font-medium">Live Website Product</span>
                    <a
                      [href]="d.sourceUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View on doormaster.online</span>
                      <mat-icon class="!text-xs">open_in_new</mat-icon>
                    </a>
                  </div>
                }
              </div>

              <!-- Description -->
              <div class="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span class="text-[10px] font-mono uppercase text-slate-400 block mb-1">Architectural Overview</span>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ d.description }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400 font-mono">ID: {{ d.id }}</span>
              <button
                type="button"
                (click)="inspectingDoor.set(null)"
                class="px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DoorsCatalog, { className: "DoorsCatalog", filePath: "frontend/src/app/views/doors-catalog/doors-catalog.ts", lineNumber: 1057 }); })();
