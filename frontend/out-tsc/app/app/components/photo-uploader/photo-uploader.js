import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.label;
function PhotoUploader_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 11)(2, "mat-icon");
    i0.ɵɵtext(3, "photo_camera");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "p", 12);
    i0.ɵɵtext(5, "No site photos uploaded yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 13);
    i0.ɵɵtext(7, "Upload before & after photos to earn the management quality bonus (+$25)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 14);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_12_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showUploadModal.set(true)); });
    i0.ɵɵelementStart(9, "mat-icon", 6);
    i0.ɵɵtext(10, "cloud_upload");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "Upload First Photo");
    i0.ɵɵelementEnd()()();
} }
function PhotoUploader_Conditional_13_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_13_For_2_Template_button_click_0_listener() { const photo_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.previewPhoto.set(photo_r4)); });
    i0.ɵɵelement(1, "img", 17)(2, "div", 18);
    i0.ɵɵelementStart(3, "div", 19)(4, "span", 20);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 21)(7, "p", 22);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 24)(12, "div", 25)(13, "mat-icon", 26);
    i0.ɵɵtext(14, "zoom_in");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const photo_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", photo_r4.url, i0.ɵɵsanitizeUrl)("alt", photo_r4.caption);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", photo_r4.stage, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(photo_r4.caption);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.formatTime(photo_r4.timestamp), " \u00B7 ", photo_r4.uploadedBy);
} }
function PhotoUploader_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, PhotoUploader_Conditional_13_For_2_Template, 15, 6, "button", 15, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.photos());
} }
function PhotoUploader_Conditional_14_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵelement(1, "img", 50);
    i0.ɵɵelementStart(2, "button", 51);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Conditional_28_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectedImagePreview.set("")); });
    i0.ɵɵelementStart(3, "mat-icon", 52);
    i0.ɵɵtext(4, "close");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.selectedImagePreview(), i0.ɵɵsanitizeUrl);
} }
function PhotoUploader_Conditional_14_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "button", 53);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Conditional_29_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); i0.ɵɵnextContext(); const fileInput_r8 = i0.ɵɵreference(27); return i0.ɵɵresetView(fileInput_r8.click()); });
    i0.ɵɵelementStart(2, "mat-icon", 6);
    i0.ɵɵtext(3, "file_upload");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Choose From Device / Take Photo");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 54);
    i0.ɵɵtext(7, "Supports JPG, PNG, WebP up to 10MB");
    i0.ɵɵelementEnd()();
} }
function PhotoUploader_Conditional_14_For_36_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 55);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_For_36_Template_button_click_0_listener() { const preset_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectPreset(preset_r10)); });
    i0.ɵɵelement(1, "img", 56);
    i0.ɵɵelementStart(2, "span", 57);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const preset_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", preset_r10.url, i0.ɵɵsanitizeUrl)("alt", preset_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(preset_r10.label);
} }
function PhotoUploader_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 27)(2, "div", 28)(3, "div", 29)(4, "mat-icon", 30);
    i0.ɵɵtext(5, "photo_library");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3", 31);
    i0.ɵɵtext(7, "Upload Door Installation Photo");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 32);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showUploadModal.set(false)); });
    i0.ɵɵelementStart(9, "mat-icon", 33);
    i0.ɵɵtext(10, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "form", 34);
    i0.ɵɵlistener("ngSubmit", function PhotoUploader_Conditional_14_Template_form_ngSubmit_11_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleUploadSubmit()); });
    i0.ɵɵelementStart(12, "div")(13, "span", 35);
    i0.ɵɵtext(14, "Installation Phase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 36)(16, "button", 37);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectedStage.set("before")); });
    i0.ɵɵtext(17, " 1. Site Rough Opening ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 37);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectedStage.set("in_progress")); });
    i0.ɵɵtext(19, " 2. Hardware Fitting ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 37);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectedStage.set("after")); });
    i0.ɵɵtext(21, " 3. Completed Door ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div")(23, "span", 35);
    i0.ɵɵtext(24, "Select Image or Camera");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 38)(26, "input", 39, 0);
    i0.ɵɵlistener("change", function PhotoUploader_Conditional_14_Template_input_change_26_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFileSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(28, PhotoUploader_Conditional_14_Conditional_28_Template, 5, 1, "div", 40)(29, PhotoUploader_Conditional_14_Conditional_29_Template, 8, 0, "div", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 42)(31, "p", 43)(32, "span");
    i0.ɵɵtext(33, "Or choose one-click field proof sample:");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 36);
    i0.ɵɵrepeaterCreate(35, PhotoUploader_Conditional_14_For_36_Template, 4, 3, "button", 44, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "div")(38, "label", 45);
    i0.ɵɵtext(39, "Caption & Observations");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(40, "input", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 47)(42, "button", 48);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_14_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showUploadModal.set(false)); });
    i0.ɵɵtext(43, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "button", 49)(45, "mat-icon", 6);
    i0.ɵɵtext(46, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "span");
    i0.ɵɵtext(48, "Save to Installation Record");
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("formGroup", ctx_r1.uploadForm);
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r1.selectedStage() === "before" ? "bg-slate-900 text-white font-semibold" : "bg-slate-100 text-slate-600 hover:bg-slate-200");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r1.selectedStage() === "in_progress" ? "bg-slate-900 text-white font-semibold" : "bg-slate-100 text-slate-600 hover:bg-slate-200");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r1.selectedStage() === "after" ? "bg-slate-900 text-white font-semibold" : "bg-slate-100 text-slate-600 hover:bg-slate-200");
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r1.selectedImagePreview() ? 28 : 29);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.samplePresets);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", !ctx_r1.selectedImagePreview() || ctx_r1.uploadForm.invalid);
} }
function PhotoUploader_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "button", 58);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previewPhoto.set(null)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 59)(3, "div", 60)(4, "div", 29)(5, "span", 61);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 62);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 63);
    i0.ɵɵlistener("click", function PhotoUploader_Conditional_15_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previewPhoto.set(null)); });
    i0.ɵɵelementStart(10, "mat-icon", 64);
    i0.ɵɵtext(11, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 65);
    i0.ɵɵelement(13, "img", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 67)(15, "span");
    i0.ɵɵtext(16, "Uploaded by: ");
    i0.ɵɵelementStart(17, "strong", 68);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "span", 69);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((tmp_1_0 = ctx_r1.previewPhoto()) == null ? null : tmp_1_0.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_2_0 = ctx_r1.previewPhoto()) == null ? null : tmp_2_0.caption);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("src", (tmp_3_0 = ctx_r1.previewPhoto()) == null ? null : tmp_3_0.url, i0.ɵɵsanitizeUrl)("alt", (tmp_4_0 = ctx_r1.previewPhoto()) == null ? null : tmp_4_0.caption);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r1.previewPhoto()) == null ? null : tmp_5_0.uploadedBy);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatTime(((tmp_6_0 = ctx_r1.previewPhoto()) == null ? null : tmp_6_0.timestamp) || ""));
} }
export class PhotoUploader {
    photos = input([], ...(ngDevMode ? [{ debugName: "photos" }] : /* istanbul ignore next */ []));
    photoUploaded = output();
    showUploadModal = signal(false, ...(ngDevMode ? [{ debugName: "showUploadModal" }] : /* istanbul ignore next */ []));
    selectedStage = signal('after', ...(ngDevMode ? [{ debugName: "selectedStage" }] : /* istanbul ignore next */ []));
    selectedImagePreview = signal('', ...(ngDevMode ? [{ debugName: "selectedImagePreview" }] : /* istanbul ignore next */ []));
    previewPhoto = signal(null, ...(ngDevMode ? [{ debugName: "previewPhoto" }] : /* istanbul ignore next */ []));
    uploadForm = new FormGroup({
        caption: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    // Built-in authentic high-res samples for rapid inspection
    samplePresets = [
        {
            label: 'Completed Walnut Pivot',
            url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
            caption: 'AeroPivot 900 Smoked Walnut installed with flush drop-seal margin',
            stage: 'after'
        },
        {
            label: 'Hinges Alignment',
            url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
            caption: '3D concealed hinge adjustment check with laser plumb',
            stage: 'in_progress'
        },
        {
            label: 'Double Oak Entrance',
            url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
            caption: 'Heritage Royal Double oak entrance doors with brass mortise lock',
            stage: 'after'
        }
    ];
    selectPreset(preset) {
        this.selectedImagePreview.set(preset.url);
        this.selectedStage.set(preset.stage);
        this.uploadForm.patchValue({ caption: preset.caption });
    }
    onFileSelected(event) {
        const inputEl = event.target;
        if (inputEl.files && inputEl.files[0]) {
            const file = inputEl.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                this.selectedImagePreview.set(result);
                if (!this.uploadForm.value.caption) {
                    this.uploadForm.patchValue({
                        caption: `${this.selectedStage() === 'after' ? 'Completed installation verification' : 'Site inspection'}`
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    }
    handleUploadSubmit() {
        if (!this.selectedImagePreview() || this.uploadForm.invalid)
            return;
        this.photoUploaded.emit({
            stage: this.selectedStage(),
            url: this.selectedImagePreview(),
            caption: this.uploadForm.value.caption || 'Installation photo'
        });
        // Reset & close
        this.showUploadModal.set(false);
        this.selectedImagePreview.set('');
        this.uploadForm.reset();
    }
    formatTime(isoString) {
        if (!isoString)
            return '';
        try {
            const d = new Date(isoString);
            return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        catch {
            return isoString;
        }
    }
    static ɵfac = function PhotoUploader_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PhotoUploader)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PhotoUploader, selectors: [["app-photo-uploader"]], inputs: { photos: [1, "photos"] }, outputs: { photoUploaded: "photoUploaded" }, decls: 16, vars: 3, consts: [["fileInput", ""], [1, "space-y-4"], [1, "flex", "items-center", "justify-between"], [1, "text-xs", "font-bold", "text-slate-800", "uppercase", "tracking-wider"], [1, "text-xs", "text-slate-500", "mt-0.5"], ["type", "button", 1, "px-3", "py-1.5", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1", "shadow-sm", 3, "click"], [1, "!text-sm", "!w-4", "!h-4"], [1, "border", "border-dashed", "border-slate-300", "rounded-xl", "p-8", "text-center", "bg-slate-50/50"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "gap-3"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/60", "backdrop-blur-xs", "animate-in", "fade-in", "duration-200"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "w-10", "h-10", "rounded-full", "bg-slate-100", "flex", "items-center", "justify-center", "mx-auto", "text-slate-400", "mb-2"], [1, "text-xs", "font-medium", "text-slate-700"], [1, "text-[11px]", "text-slate-400", "mt-0.5", "mb-3"], ["type", "button", 1, "px-3.5", "py-1.5", "text-xs", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", "inline-flex", "items-center", "gap-1.5", "shadow-xs", 3, "click"], ["type", "button", 1, "group", "relative", "bg-slate-100", "rounded-lg", "overflow-hidden", "border", "border-slate-200", "aspect-4/3", "cursor-pointer", "shadow-xs", "text-left", "p-0", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900"], ["type", "button", 1, "group", "relative", "bg-slate-100", "rounded-lg", "overflow-hidden", "border", "border-slate-200", "aspect-4/3", "cursor-pointer", "shadow-xs", "text-left", "p-0", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", 3, "click"], ["referrerpolicy", "no-referrer", 1, "w-full", "h-full", "object-cover", "transition-transform", "duration-300", "group-hover:scale-105", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-950/80", "via-transparent", "to-black/20", "opacity-90", "group-hover:opacity-100", "transition-opacity"], [1, "absolute", "top-2", "left-2"], [1, "text-[10px]", "font-semibold", "uppercase", "tracking-wider", "px-2", "py-0.5", "rounded", "bg-black/60", "text-white", "backdrop-blur-xs"], [1, "absolute", "bottom-2", "left-2", "right-2", "text-white"], [1, "text-xs", "font-medium", "truncate", "drop-shadow-xs"], [1, "text-[10px]", "text-slate-300", "font-mono", "tabular-nums"], [1, "absolute", "top-2", "right-2", "opacity-0", "group-hover:opacity-100", "transition-opacity"], [1, "p-1", "rounded", "bg-black/60", "text-white", "hover:bg-black/80"], [1, "!text-xs", "!w-3", "!h-3"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "shadow-xl", "max-w-lg", "w-full", "overflow-hidden"], [1, "px-5", "py-4", "border-b", "border-slate-100", "flex", "items-center", "justify-between", "bg-slate-50/50"], [1, "flex", "items-center", "gap-2"], [1, "text-slate-700"], [1, "text-sm", "font-bold", "text-slate-900"], ["type", "button", 1, "text-slate-400", "hover:text-slate-600", "p-1", "rounded", 3, "click"], [1, "!text-lg"], [1, "p-5", "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase", "tracking-wider", "mb-1.5"], [1, "grid", "grid-cols-3", "gap-2"], ["type", "button", 1, "py-2", "text-xs", "rounded-lg", "transition-colors", "text-center", 3, "click"], [1, "border-2", "border-dashed", "border-slate-200", "rounded-lg", "p-4", "text-center", "hover:border-slate-400", "transition-colors"], ["type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "relative", "w-full", "h-36", "rounded-md", "overflow-hidden", "mb-2", "bg-slate-900"], [1, "py-2"], [1, "mt-3"], [1, "text-[11px]", "text-slate-500", "mb-1.5", "flex", "items-center", "justify-between"], ["type", "button", 1, "p-1.5", "border", "border-slate-200", "hover:border-slate-800", "rounded-lg", "text-left", "transition-colors", "bg-slate-50/50", "hover:bg-slate-100/50", "flex", "flex-col", "items-center"], ["for", "photoCaptionInput", 1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase", "tracking-wider", "mb-1.5"], ["id", "photoCaptionInput", "type", "text", "formControlName", "caption", "placeholder", "e.g. Laser level verified 0.0\u00B0 plum, flush pivot alignment...", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "focus:border-slate-900"], [1, "flex", "items-center", "justify-end", "gap-2", "pt-2", "border-t", "border-slate-100"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-semibold", "text-slate-600", "hover:text-slate-900", "rounded-lg", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-slate-900", "hover:bg-slate-800", "disabled:opacity-50", "disabled:cursor-not-allowed", "rounded-lg", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", 3, "disabled"], ["alt", "Preview", 1, "w-full", "h-full", "object-contain", 3, "src"], ["type", "button", 1, "absolute", "top-2", "right-2", "bg-black/70", "hover:bg-black", "text-white", "p-1", "rounded-full", 3, "click"], [1, "!text-xs", "!w-4", "!h-4"], ["type", "button", 1, "px-4", "py-2", "bg-slate-100", "hover:bg-slate-200", "text-slate-800", "text-xs", "font-semibold", "rounded-lg", "inline-flex", "items-center", "gap-1.5", "transition-colors", 3, "click"], [1, "text-[11px]", "text-slate-400", "mt-2"], ["type", "button", 1, "p-1.5", "border", "border-slate-200", "hover:border-slate-800", "rounded-lg", "text-left", "transition-colors", "bg-slate-50/50", "hover:bg-slate-100/50", "flex", "flex-col", "items-center", 3, "click"], ["referrerpolicy", "no-referrer", 1, "w-full", "h-12", "object-cover", "rounded", "mb-1", 3, "src", "alt"], [1, "text-[10px]", "font-medium", "text-slate-700", "truncate", "w-full", "text-center"], ["type", "button", "aria-label", "Close photo preview", 1, "fixed", "inset-0", "bg-slate-950/80", "backdrop-blur-sm", "cursor-default", 3, "click"], [1, "relative", "z-10", "max-w-3xl", "w-full", "bg-slate-900", "rounded-xl", "overflow-hidden", "shadow-2xl"], [1, "p-3", "bg-slate-800/80", "flex", "items-center", "justify-between", "text-white", "border-b", "border-slate-700"], [1, "text-xs", "uppercase", "font-mono", "px-2", "py-0.5", "bg-slate-700", "rounded"], [1, "text-xs", "font-medium"], [1, "text-slate-400", "hover:text-white", "p-1", 3, "click"], [1, "!text-sm"], [1, "p-4", "bg-black", "flex", "items-center", "justify-center", "max-h-[75vh]"], ["referrerpolicy", "no-referrer", 1, "max-h-[70vh]", "max-w-full", "object-contain", 3, "src", "alt"], [1, "p-3", "bg-slate-900", "text-slate-400", "text-xs", "flex", "justify-between", "items-center", "border-t", "border-slate-800"], [1, "text-slate-200"], [1, "font-mono", "tabular-nums"]], template: function PhotoUploader_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h4", 3);
            i0.ɵɵtext(4, "Installation Photographic Proof");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 4);
            i0.ɵɵtext(6, "Upload pre-installation opening condition, hardware alignment, and final completed door");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 5);
            i0.ɵɵlistener("click", function PhotoUploader_Template_button_click_7_listener() { return ctx.showUploadModal.set(true); });
            i0.ɵɵelementStart(8, "mat-icon", 6);
            i0.ɵɵtext(9, "add_a_photo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Upload Work Photo");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(12, PhotoUploader_Conditional_12_Template, 13, 0, "div", 7)(13, PhotoUploader_Conditional_13_Template, 3, 0, "div", 8);
            i0.ɵɵconditionalCreate(14, PhotoUploader_Conditional_14_Template, 49, 9, "div", 9);
            i0.ɵɵconditionalCreate(15, PhotoUploader_Conditional_15_Template, 21, 6, "div", 10);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵconditional(ctx.photos().length === 0 ? 12 : 13);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showUploadModal() ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.previewPhoto() ? 15 : -1);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PhotoUploader, [{
        type: Component,
        args: [{
                selector: 'app-photo-uploader',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule],
                template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Installation Photographic Proof</h4>
          <p class="text-xs text-slate-500 mt-0.5">Upload pre-installation opening condition, hardware alignment, and final completed door</p>
        </div>
        
        <button 
          type="button"
          (click)="showUploadModal.set(true)"
          class="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
        >
          <mat-icon class="!text-sm !w-4 !h-4">add_a_photo</mat-icon>
          <span>Upload Work Photo</span>
        </button>
      </div>

      <!-- Photo Grid -->
      @if (photos().length === 0) {
        <div class="border border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50">
          <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-2">
            <mat-icon>photo_camera</mat-icon>
          </div>
          <p class="text-xs font-medium text-slate-700">No site photos uploaded yet</p>
          <p class="text-[11px] text-slate-400 mt-0.5 mb-3">Upload before & after photos to earn the management quality bonus (+$25)</p>
          <button 
            type="button"
            (click)="showUploadModal.set(true)"
            class="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-xs"
          >
            <mat-icon class="!text-sm !w-4 !h-4">cloud_upload</mat-icon>
            <span>Upload First Photo</span>
          </button>
        </div>
      } @else {
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          @for (photo of photos(); track photo.id) {
            <button 
              type="button"
              class="group relative bg-slate-100 rounded-lg overflow-hidden border border-slate-200 aspect-4/3 cursor-pointer shadow-xs text-left p-0 focus:outline-none focus:ring-2 focus:ring-slate-900"
              (click)="previewPhoto.set(photo)"
            >
              <img 
                [src]="photo.url" 
                [alt]="photo.caption" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerpolicy="no-referrer"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Badge -->
              <div class="absolute top-2 left-2">
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                  {{ photo.stage }}
                </span>
              </div>

              <!-- Caption -->
              <div class="absolute bottom-2 left-2 right-2 text-white">
                <p class="text-xs font-medium truncate drop-shadow-xs">{{ photo.caption }}</p>
                <p class="text-[10px] text-slate-300 font-mono tabular-nums">{{ formatTime(photo.timestamp) }} · {{ photo.uploadedBy }}</p>
              </div>

              <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="p-1 rounded bg-black/60 text-white hover:bg-black/80">
                  <mat-icon class="!text-xs !w-3 !h-3">zoom_in</mat-icon>
                </div>
              </div>
            </button>
          }
        </div>
      }

      <!-- Upload Modal -->
      @if (showUploadModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div class="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div class="flex items-center gap-2">
                <mat-icon class="text-slate-700">photo_library</mat-icon>
                <h3 class="text-sm font-bold text-slate-900">Upload Door Installation Photo</h3>
              </div>
              <button 
                type="button" 
                (click)="showUploadModal.set(false)" 
                class="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <mat-icon class="!text-lg">close</mat-icon>
              </button>
            </div>

            <form [formGroup]="uploadForm" (ngSubmit)="handleUploadSubmit()" class="p-5 space-y-4">
              <!-- Stage selector -->
              <div>
                <span class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Installation Phase</span>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    (click)="selectedStage.set('before')"
                    [class]="selectedStage() === 'before' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                    class="py-2 text-xs rounded-lg transition-colors text-center"
                  >
                    1. Site Rough Opening
                  </button>
                  <button 
                    type="button"
                    (click)="selectedStage.set('in_progress')"
                    [class]="selectedStage() === 'in_progress' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                    class="py-2 text-xs rounded-lg transition-colors text-center"
                  >
                    2. Hardware Fitting
                  </button>
                  <button 
                    type="button"
                    (click)="selectedStage.set('after')"
                    [class]="selectedStage() === 'after' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                    class="py-2 text-xs rounded-lg transition-colors text-center"
                  >
                    3. Completed Door
                  </button>
                </div>
              </div>

              <!-- File Input or Quick Sample Presets -->
              <div>
                <span class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Select Image or Camera</span>
                
                <div class="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-slate-400 transition-colors">
                  <input 
                    type="file" 
                    #fileInput 
                    accept="image/*" 
                    (change)="onFileSelected($event)" 
                    class="hidden"
                  />
                  
                  @if (selectedImagePreview()) {
                    <div class="relative w-full h-36 rounded-md overflow-hidden mb-2 bg-slate-900">
                      <img 
                        [src]="selectedImagePreview()" 
                        alt="Preview" 
                        class="w-full h-full object-contain"
                      />
                      <button 
                        type="button" 
                        (click)="selectedImagePreview.set('')"
                        class="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full"
                      >
                        <mat-icon class="!text-xs !w-4 !h-4">close</mat-icon>
                      </button>
                    </div>
                  } @else {
                    <div class="py-2">
                      <button 
                        type="button"
                        (click)="fileInput.click()" 
                        class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
                      >
                        <mat-icon class="!text-sm !w-4 !h-4">file_upload</mat-icon>
                        <span>Choose From Device / Take Photo</span>
                      </button>
                      <p class="text-[11px] text-slate-400 mt-2">Supports JPG, PNG, WebP up to 10MB</p>
                    </div>
                  }
                </div>

                <!-- Instant Presets for Easy Evaluation -->
                <div class="mt-3">
                  <p class="text-[11px] text-slate-500 mb-1.5 flex items-center justify-between">
                    <span>Or choose one-click field proof sample:</span>
                  </p>
                  <div class="grid grid-cols-3 gap-2">
                    @for (preset of samplePresets; track preset.label) {
                      <button 
                        type="button" 
                        (click)="selectPreset(preset)"
                        class="p-1.5 border border-slate-200 hover:border-slate-800 rounded-lg text-left transition-colors bg-slate-50/50 hover:bg-slate-100/50 flex flex-col items-center"
                      >
                        <img [src]="preset.url" [alt]="preset.label" class="w-full h-12 object-cover rounded mb-1" referrerpolicy="no-referrer" />
                        <span class="text-[10px] font-medium text-slate-700 truncate w-full text-center">{{ preset.label }}</span>
                      </button>
                    }
                  </div>
                </div>
              </div>

              <!-- Caption -->
              <div>
                <label for="photoCaptionInput" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Caption & Observations</label>
                <input 
                  id="photoCaptionInput"
                  type="text" 
                  formControlName="caption"
                  placeholder="e.g. Laser level verified 0.0° plum, flush pivot alignment..." 
                  class="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <!-- Buttons -->
              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  (click)="showUploadModal.set(false)"
                  class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  [disabled]="!selectedImagePreview() || uploadForm.invalid"
                  class="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">check</mat-icon>
                  <span>Save to Installation Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Zoom Lightbox -->
      @if (previewPhoto()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button 
            type="button" 
            aria-label="Close photo preview" 
            class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-default"
            (click)="previewPhoto.set(null)"
          ></button>

          <div class="relative z-10 max-w-3xl w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            <div class="p-3 bg-slate-800/80 flex items-center justify-between text-white border-b border-slate-700">
              <div class="flex items-center gap-2">
                <span class="text-xs uppercase font-mono px-2 py-0.5 bg-slate-700 rounded">{{ previewPhoto()?.stage }}</span>
                <span class="text-xs font-medium">{{ previewPhoto()?.caption }}</span>
              </div>
              <button (click)="previewPhoto.set(null)" class="text-slate-400 hover:text-white p-1">
                <mat-icon class="!text-sm">close</mat-icon>
              </button>
            </div>
            <div class="p-4 bg-black flex items-center justify-center max-h-[75vh]">
              <img [src]="previewPhoto()?.url" [alt]="previewPhoto()?.caption" class="max-h-[70vh] max-w-full object-contain" referrerpolicy="no-referrer" />
            </div>
            <div class="p-3 bg-slate-900 text-slate-400 text-xs flex justify-between items-center border-t border-slate-800">
              <span>Uploaded by: <strong class="text-slate-200">{{ previewPhoto()?.uploadedBy }}</strong></span>
              <span class="font-mono tabular-nums">{{ formatTime(previewPhoto()?.timestamp || '') }}</span>
            </div>
          </div>
        </div>
      }
    </div>
  `
            }]
    }], null, { photos: [{ type: i0.Input, args: [{ isSignal: true, alias: "photos", required: false }] }], photoUploaded: [{ type: i0.Output, args: ["photoUploaded"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PhotoUploader, { className: "PhotoUploader", filePath: "frontend/src/app/components/photo-uploader/photo-uploader.ts", lineNumber: 271 }); })();
