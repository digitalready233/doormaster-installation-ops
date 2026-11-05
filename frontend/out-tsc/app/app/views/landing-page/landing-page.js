import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { ThemeStore } from '../../services/theme';
import { AlertService } from '../../services/alert.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function LandingPage_For_129_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 113);
    i0.ɵɵlistener("click", function LandingPage_For_129_Template_button_click_0_listener() { const ɵ$index_216_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setSlide(ɵ$index_216_r2)); });
    i0.ɵɵelementStart(1, "div", 114);
    i0.ɵɵelement(2, "img", 115);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 116)(4, "div", 117);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 118);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const ɵ$index_216_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("bg-emerald-50/80", ctx_r2.currentSlideIndex() === ɵ$index_216_r2 && !ctx_r2.themeStore.isDark())("bg-slate-900", ctx_r2.currentSlideIndex() === ɵ$index_216_r2 && ctx_r2.themeStore.isDark())("border-emerald-500", ctx_r2.currentSlideIndex() === ɵ$index_216_r2)("bg-white", ctx_r2.currentSlideIndex() !== ɵ$index_216_r2 && !ctx_r2.themeStore.isDark())("bg-slate-950", ctx_r2.currentSlideIndex() !== ɵ$index_216_r2 && ctx_r2.themeStore.isDark())("border-slate-200", ctx_r2.currentSlideIndex() !== ɵ$index_216_r2 && !ctx_r2.themeStore.isDark())("border-slate-800", ctx_r2.currentSlideIndex() !== ɵ$index_216_r2 && ctx_r2.themeStore.isDark())("opacity-60", ctx_r2.currentSlideIndex() !== ɵ$index_216_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", s_r4.photoUrl, i0.ɵɵsanitizeUrl)("alt", s_r4.badge);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r4.doorTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r4.technicianName);
} }
function LandingPage_Conditional_229_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 104)(1, "div", 119)(2, "mat-icon", 120);
    i0.ɵɵtext(3, "check_circle");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "h3", 121);
    i0.ɵɵtext(5, "Installation Request Received!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 122);
    i0.ɵɵtext(7, " Thank you, ");
    i0.ɵɵelementStart(8, "strong", 34);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, ". Your request (");
    i0.ɵɵelementStart(11, "span", 123);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, ") has been queued with our Operations Command team. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 124)(15, "div", 125)(16, "span");
    i0.ɵɵtext(17, "Door Model:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong", 34);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 125)(21, "span");
    i0.ɵɵtext(22, "Site Address:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "strong", 126);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 125)(26, "span");
    i0.ɵɵtext(27, "Assigned Priority:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 127);
    i0.ɵɵtext(29, "Rapid Technician Dispatch");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "div", 128)(31, "button", 129);
    i0.ɵɵlistener("click", function LandingPage_Conditional_229_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.resetForm()); });
    i0.ɵɵtext(32, " Submit Another Request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "button", 130);
    i0.ɵɵlistener("click", function LandingPage_Conditional_229_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.navigateToDashboard()); });
    i0.ɵɵelementStart(34, "mat-icon", 11);
    i0.ɵɵtext(35, "dashboard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span");
    i0.ɵɵtext(37, "Sign In to Dashboard");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate((tmp_2_0 = ctx_r2.submittedInquiry()) == null ? null : tmp_2_0.fullName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((tmp_3_0 = ctx_r2.submittedInquiry()) == null ? null : tmp_3_0.id);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate((tmp_4_0 = ctx_r2.submittedInquiry()) == null ? null : tmp_4_0.doorType);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r2.submittedInquiry()) == null ? null : tmp_5_0.siteAddress);
} }
function LandingPage_Conditional_230_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "Full name is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_Conditional_230_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "A valid email is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_Conditional_230_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "Phone number is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_Conditional_230_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "Site address is required for dispatch estimation.");
    i0.ɵɵelementEnd();
} }
function LandingPage_Conditional_230_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 172);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Routing Request to Dispatch...");
    i0.ɵɵelementEnd();
} }
function LandingPage_Conditional_230_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 173);
    i0.ɵɵtext(1, "send");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Submit Installation Request");
    i0.ɵɵelementEnd();
} }
function LandingPage_Conditional_230_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 131)(2, "h3", 132);
    i0.ɵɵtext(3, "Request Installation Service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 133);
    i0.ɵɵtext(5, " Fill out your site details below. Our field coordinator will review your door specifications and send you an immediate schedule & quote. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 134);
    i0.ɵɵlistener("ngSubmit", function LandingPage_Conditional_230_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleFormSubmit()); });
    i0.ɵɵelementStart(7, "div", 135)(8, "div")(9, "label", 136);
    i0.ɵɵtext(10, " Full Name * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 137);
    i0.ɵɵconditionalCreate(12, LandingPage_Conditional_230_Conditional_12_Template, 2, 0, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div")(14, "label", 139);
    i0.ɵɵtext(15, " Email Address * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 140);
    i0.ɵɵconditionalCreate(17, LandingPage_Conditional_230_Conditional_17_Template, 2, 0, "span", 138);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 135)(19, "div")(20, "label", 141);
    i0.ɵɵtext(21, " Phone Number * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 142);
    i0.ɵɵconditionalCreate(23, LandingPage_Conditional_230_Conditional_23_Template, 2, 0, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div")(25, "label", 143);
    i0.ɵɵtext(26, " Door System / Category * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "select", 144)(28, "option", 145);
    i0.ɵɵtext(29, "Architectural Entrance Pivot Door");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "option", 146);
    i0.ɵɵtext(31, "Solid Wood Entrance Door Slab");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "option", 147);
    i0.ɵɵtext(33, "Acoustic French Interior Doors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "option", 148);
    i0.ɵɵtext(35, "Heavy Concealed Pocket Sliders");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "option", 149);
    i0.ɵɵtext(37, "Exterior Multi-Fold Patio System");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "option", 150);
    i0.ɵɵtext(39, "Fire-Rated Commercial Assemblies");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "option", 151);
    i0.ɵɵtext(41, "Frameless Architectural Glass");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(42, "div", 135)(43, "div")(44, "label", 152);
    i0.ɵɵtext(45, " Project Environment ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "select", 153)(47, "option", 154);
    i0.ɵɵtext(48, "Luxury Private Estate / New Build");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "option", 155);
    i0.ɵɵtext(50, "Residential Renovation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "option", 156);
    i0.ɵɵtext(52, "Commercial Office / Hospitality");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "option", 157);
    i0.ɵɵtext(54, "Historical Restoration");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(55, "div")(56, "label", 158);
    i0.ɵɵtext(57, " Number of Door Openings ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "input", 159);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "div")(60, "label", 160);
    i0.ɵɵtext(61, " Installation Site Address * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(62, "input", 161);
    i0.ɵɵconditionalCreate(63, LandingPage_Conditional_230_Conditional_63_Template, 2, 0, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "div", 135)(65, "div")(66, "label", 162);
    i0.ɵɵtext(67, " Preferred Installation Date ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(68, "input", 163);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "div")(70, "label", 164);
    i0.ɵɵtext(71, " Preferred Arrival Window ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "select", 165)(73, "option", 166);
    i0.ɵɵtext(74, "Morning (08:00 - 12:00)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "option", 167);
    i0.ɵɵtext(76, "Afternoon (12:00 - 17:00)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "option", 168);
    i0.ɵɵtext(78, "Flexible All-Day Access");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(79, "div")(80, "label", 169);
    i0.ɵɵtext(81, " Specific Hardware, Weight, or Site Instructions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(82, "textarea", 170);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "button", 171);
    i0.ɵɵconditionalCreate(84, LandingPage_Conditional_230_Conditional_84_Template, 3, 0)(85, LandingPage_Conditional_230_Conditional_85_Template, 4, 0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r2.inquiryForm);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(((tmp_3_0 = ctx_r2.inquiryForm.get("fullName")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx_r2.inquiryForm.get("fullName")) == null ? null : tmp_3_0.invalid) ? 12 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(((tmp_4_0 = ctx_r2.inquiryForm.get("email")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx_r2.inquiryForm.get("email")) == null ? null : tmp_4_0.invalid) ? 17 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(((tmp_5_0 = ctx_r2.inquiryForm.get("phone")) == null ? null : tmp_5_0.touched) && ((tmp_5_0 = ctx_r2.inquiryForm.get("phone")) == null ? null : tmp_5_0.invalid) ? 23 : -1);
    i0.ɵɵadvance(40);
    i0.ɵɵconditional(((tmp_6_0 = ctx_r2.inquiryForm.get("siteAddress")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx_r2.inquiryForm.get("siteAddress")) == null ? null : tmp_6_0.invalid) ? 63 : -1);
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("disabled", ctx_r2.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.isSubmitting() ? 84 : 85);
} }
export class LandingPage {
    store = inject(InstallationStore);
    themeStore = inject(ThemeStore);
    alert = inject(AlertService);
    fb = inject(FormBuilder);
    router = inject(Router);
    goToSignIn = output();
    goToDashboard = output();
    navigateToSignIn() {
        this.goToSignIn.emit();
        this.router.navigate(['/signin']);
    }
    navigateToDashboard() {
        this.goToDashboard.emit();
        this.router.navigate(['/overview']);
    }
    currentSlideIndex = signal(0, ...(ngDevMode ? [{ debugName: "currentSlideIndex" }] : /* istanbul ignore next */ []));
    isSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    submissionSuccess = signal(false, ...(ngDevMode ? [{ debugName: "submissionSuccess" }] : /* istanbul ignore next */ []));
    submittedInquiry = signal(null, ...(ngDevMode ? [{ debugName: "submittedInquiry" }] : /* istanbul ignore next */ []));
    // Hero Slider items showcasing technicians at work
    slides = [
        {
            id: 1,
            badge: 'Active Work in Progress',
            technicianName: 'Marcus Vance',
            technicianRole: 'Senior Master Installer • 4.95 Rating',
            doorTitle: 'Grand Pivot Walnut Entrance Door',
            doorCategory: 'Architectural Pivot',
            location: 'The Glasshouse Residence • Highview',
            stage: 'Laser Level & Hinge Calibration',
            tagline: '±1.0mm Floor Spring Flush Alignment',
            description: 'Marcus Vance is calibrating the FritsJurgens System M+ pivot resistance on a 180kg Smoked American Walnut door slab, ensuring whisper-quiet acoustic self-closing motion.',
            photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
            statNumber: '180 kg',
            statLabel: 'Slab Weight Handled'
        },
        {
            id: 2,
            badge: 'Precision Carpentry',
            technicianName: 'Devon Sterling',
            technicianRole: 'Acoustic & Hardware Specialist • 4.88 Rating',
            doorTitle: 'Solid Wood European White Oak Foyer',
            doorCategory: 'Solid Timber Entrance',
            location: 'Pacific Heights Executive Manor',
            stage: 'Sub-Frame Mortise & Weather-Seals',
            tagline: 'Perimeter Acoustic Drop-Seal Testing',
            description: 'Devon Sterling installs magnetic mortise strike plates with high-torque anchors, routing thermal break seals into the solid white oak jamb for airtight envelope performance.',
            photoUrl: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1400&q=80',
            statNumber: '42 dB',
            statLabel: 'Sound Dampening Rating'
        },
        {
            id: 3,
            badge: 'Patio & Exterior Enclosure',
            technicianName: 'Elena Rostova & Field Crew',
            technicianRole: 'Lead Joinery Technicians • 4.98 Rating',
            doorTitle: 'Bi-Fold Architectural Patio Glass System',
            doorCategory: 'Multi-Panel Exterior Bi-Fold',
            location: 'Meadowbrook Modern Villa',
            stage: 'Stainless Track Glide & Multi-Lock Strike',
            tagline: 'Effortless Finger-Touch Rollers',
            description: 'Our certified crew secures stainless bottom tracks with laser alignment, adjusting top suspension carriers so massive 3-meter glass leaves glide with zero friction.',
            photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
            statNumber: '3.2 m',
            statLabel: 'Panoramic Span Height'
        },
        {
            id: 4,
            badge: 'Interior Architectural Suite',
            technicianName: 'Tariq Al-Mansoor',
            technicianRole: 'Master Finish Carpenter • 4.75 Rating',
            doorTitle: 'Concealed Pocket Sliding Acoustic Doors',
            doorCategory: 'Concealed Pocket System',
            location: 'Skyline Penthouse Suites',
            stage: 'Flush Soft-Stop Buffer Tuning',
            tagline: 'Concealed Jamb & Magnetic Locks',
            description: 'Tariq aligns dual-direction soft-close dampeners inside the recessed wall pocket cavity, guaranteeing completely invisible hardware when doors disappear into the wall.',
            photoUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80',
            statNumber: '100%',
            statLabel: 'Concealed Pocket Flush'
        }
    ];
    currentSlide = () => this.slides[this.currentSlideIndex()];
    inquiryForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(7)]],
        doorType: ['entrance_pivot', [Validators.required]],
        projectType: ['luxury_estate', [Validators.required]],
        doorsCount: [1, [Validators.required, Validators.min(1)]],
        siteAddress: ['', [Validators.required, Validators.minLength(5)]],
        preferredDate: [''],
        preferredTimeSlot: ['morning'],
        message: ['']
    });
    nextSlide() {
        this.currentSlideIndex.update(idx => (idx + 1) % this.slides.length);
    }
    prevSlide() {
        this.currentSlideIndex.update(idx => (idx - 1 + this.slides.length) % this.slides.length);
    }
    setSlide(index) {
        this.currentSlideIndex.set(index);
    }
    handleFormSubmit() {
        if (this.inquiryForm.invalid) {
            this.inquiryForm.markAllAsTouched();
            this.alert.toastWarning('Incomplete Request', 'Please fill in your name, email, phone, and project address.');
            return;
        }
        this.isSubmitting.set(true);
        const formVal = this.inquiryForm.value;
        setTimeout(() => {
            const pType = formVal.projectType || 'residential';
            const slot = formVal.preferredTimeSlot || 'morning';
            const createdInquiry = this.store.submitInstallationInquiry({
                fullName: formVal.fullName || '',
                email: formVal.email || '',
                phone: formVal.phone || '',
                doorType: formVal.doorType || 'entrance_pivot',
                projectType: pType,
                siteAddress: formVal.siteAddress || '',
                preferredDate: formVal.preferredDate || undefined,
                preferredTimeSlot: slot,
                doorsCount: Number(formVal.doorsCount) || 1,
                message: formVal.message || ''
            });
            this.submittedInquiry.set(createdInquiry);
            this.isSubmitting.set(false);
            this.submissionSuccess.set(true);
            this.alert.success('Installation Request Submitted!', `Thank you ${formVal.fullName}. Your request #${createdInquiry.id} has been registered with our Operations Command team.`);
        }, 700);
    }
    resetForm() {
        this.inquiryForm.reset({
            fullName: '',
            email: '',
            phone: '',
            doorType: 'entrance_pivot',
            projectType: 'luxury_estate',
            doorsCount: 1,
            siteAddress: '',
            preferredDate: '',
            preferredTimeSlot: 'morning',
            message: ''
        });
        this.submissionSuccess.set(false);
        this.submittedInquiry.set(null);
    }
    static ɵfac = function LandingPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LandingPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LandingPage, selectors: [["app-landing-page"]], outputs: { goToSignIn: "goToSignIn", goToDashboard: "goToDashboard" }, decls: 246, vars: 24, consts: [[1, "min-h-screen", "bg-slate-50", "dark:bg-slate-950", "text-slate-900", "dark:text-slate-100", "flex", "flex-col", "font-sans", "transition-colors", "duration-200", "selection:bg-emerald-500", "selection:text-slate-950"], [1, "sticky", "top-0", "z-50", "backdrop-blur-md", "bg-white/90", "dark:bg-slate-950/85", "border-b", "border-slate-200/90", "dark:border-slate-800/80", "transition-colors", "duration-200"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "h-20", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-3.5", "cursor-pointer"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-500", "text-slate-950", "flex", "items-center", "justify-center", "font-mono", "font-black", "text-lg", "shadow-lg", "shadow-emerald-500/20", "shrink-0"], [1, "flex", "items-center", "gap-2"], [1, "text-lg", "font-black", "tracking-tight", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "uppercase", "font-mono", "px-1.5", "py-0.5", "bg-emerald-500/15", "text-emerald-700", "dark:text-emerald-400", "border", "border-emerald-500/30", "rounded", "font-semibold", "tracking-wider"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "font-mono"], [1, "hidden", "md:flex", "items-center", "gap-8", "text-sm", "font-medium", "text-slate-600", "dark:text-slate-300"], ["href", "#hero-slider", 1, "hover:text-emerald-600", "dark:hover:text-emerald-400", "transition-colors", "flex", "items-center", "gap-1.5"], [1, "!text-sm"], ["href", "#standards", 1, "hover:text-emerald-600", "dark:hover:text-emerald-400", "transition-colors", "flex", "items-center", "gap-1.5"], ["href", "#contact-form", 1, "hover:text-emerald-600", "dark:hover:text-emerald-400", "transition-colors", "flex", "items-center", "gap-1.5"], [1, "flex", "items-center", "gap-2.5", "sm:gap-3"], ["type", "button", "aria-label", "Toggle light or dark theme", 1, "h-10", "px-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800", "bg-slate-100", "hover:bg-slate-200/80", "dark:bg-slate-900", "dark:hover:bg-slate-800", "text-slate-700", "dark:text-slate-300", "transition-all", "flex", "items-center", "gap-2", "shadow-xs", "active:scale-95", "cursor-pointer", 3, "click", "title"], [1, "!text-lg"], [1, "text-xs", "font-semibold", "hidden", "sm:inline"], ["type", "button", 1, "h-10", "px-3.5", "sm:px-4", "rounded-xl", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:text-slate-900", "dark:hover:text-white", "bg-white", "dark:bg-slate-900", "hover:bg-slate-100", "dark:hover:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700/80", "flex", "items-center", "gap-1.5", "sm:gap-2", "transition-all", "shadow-xs", "active:scale-95", "cursor-pointer", 3, "click"], [1, "!text-base", "text-emerald-600", "dark:text-emerald-400"], ["href", "#contact-form", 1, "hidden", "sm:inline-flex", "h-10", "px-4", "rounded-xl", "text-xs", "font-bold", "text-slate-950", "bg-emerald-500", "hover:bg-emerald-400", "dark:bg-emerald-400", "dark:hover:bg-emerald-300", "transition-all", "items-center", "gap-1.5", "shadow-md", "shadow-emerald-500/20", "active:scale-95"], [1, "!text-sm", "!w-4", "!h-4"], ["id", "hero-slider", 1, "relative", "overflow-hidden", "bg-white", "dark:bg-slate-950", "py-12", "lg:py-20", "border-b", "border-slate-200", "dark:border-slate-800/80", "transition-colors"], [1, "absolute", "-top-32", "left-1/2", "-translate-x-1/2", "w-[700px]", "h-[350px]", "bg-emerald-500/10", "rounded-full", "blur-3xl", "pointer-events-none"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4", "mb-8"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1", "rounded-full", "bg-emerald-50", "dark:bg-emerald-500/10", "border", "border-emerald-200", "dark:border-emerald-500/20", "text-emerald-700", "dark:text-emerald-400", "text-xs", "font-semibold", "font-mono", "mb-3"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "dark:bg-emerald-400", "animate-pulse"], [1, "text-3xl", "sm:text-5xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight", "leading-tight"], [1, "hidden", "sm:inline"], [1, "bg-gradient-to-r", "from-emerald-600", "via-teal-600", "to-indigo-600", "dark:from-emerald-400", "dark:via-teal-300", "dark:to-indigo-400", "bg-clip-text", "text-transparent"], [1, "mt-3", "text-slate-600", "dark:text-slate-400", "text-sm", "sm:text-base", "max-w-2xl"], [1, "flex", "items-center", "gap-3", "shrink-0"], [1, "text-xs", "font-mono", "text-slate-500", "dark:text-slate-400"], [1, "text-slate-900", "dark:text-white"], ["type", "button", "aria-label", "Previous Slide", 1, "w-10", "h-10", "rounded-xl", "bg-slate-100", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "hover:border-slate-300", "dark:hover:border-slate-700", "hover:bg-slate-200", "dark:hover:bg-slate-800", "text-slate-700", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "flex", "items-center", "justify-center", "transition-all", "cursor-pointer", 3, "click"], ["type", "button", "aria-label", "Next Slide", 1, "w-10", "h-10", "rounded-xl", "bg-slate-100", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "hover:border-slate-300", "dark:hover:border-slate-700", "hover:bg-slate-200", "dark:hover:bg-slate-800", "text-slate-700", "dark:text-slate-300", "hover:text-slate-900", "dark:hover:text-white", "flex", "items-center", "justify-center", "transition-all", "cursor-pointer", 3, "click"], [1, "relative", "rounded-3xl", "overflow-hidden", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-xl", "dark:shadow-2xl", "transition-all", "duration-500"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "min-h-[500px]"], [1, "lg:col-span-5", "p-6", "sm:p-10", "flex", "flex-col", "justify-between", "z-10", "bg-white/95", "lg:bg-white/90", "dark:bg-slate-900/90", "dark:lg:bg-slate-900/80", "backdrop-blur-sm"], [1, "flex", "items-center", "gap-2", "mb-4"], [1, "px-2.5", "py-1", "rounded-md", "text-[10px]", "font-mono", "font-bold", "uppercase", "bg-emerald-50", "dark:bg-emerald-500/20", "text-emerald-700", "dark:text-emerald-300", "border", "border-emerald-200", "dark:border-emerald-500/30"], [1, "text-xs", "font-mono", "text-slate-500", "dark:text-slate-400", "flex", "items-center", "gap-1"], [1, "!text-xs", "text-slate-400"], [1, "text-2xl", "sm:text-3xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight", "leading-snug"], [1, "text-xs", "font-mono", "text-emerald-600", "dark:text-emerald-400", "mt-1", "uppercase", "tracking-wide", "font-semibold"], [1, "mt-4", "text-xs", "sm:text-sm", "text-slate-600", "dark:text-slate-300", "leading-relaxed"], [1, "mt-6", "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-950/70", "border", "border-slate-200", "dark:border-slate-800/80", "flex", "items-center", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "bg-gradient-to-br", "from-emerald-500", "to-teal-700", "text-slate-950", "flex", "items-center", "justify-center", "font-bold", "text-base", "shadow-md", "shrink-0"], [1, "min-w-0", "flex-1"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white", "truncate"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "flex", "items-center", "gap-1", "text-[11px]", "text-emerald-600", "dark:text-emerald-400", "font-mono", "mt-0.5", "font-semibold"], [1, "!text-[12px]", "!w-3", "!h-3"], [1, "mt-8", "pt-6", "border-t", "border-slate-200", "dark:border-slate-800", "flex", "items-center", "justify-between", "gap-4"], [1, "text-xl", "sm:text-2xl", "font-black", "text-slate-900", "dark:text-white", "font-mono"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400", "uppercase", "font-mono"], ["href", "#contact-form", 1, "px-4", "py-2.5", "rounded-xl", "bg-emerald-500", "hover:bg-emerald-400", "dark:bg-emerald-400", "dark:hover:bg-emerald-300", "text-slate-950", "font-bold", "text-xs", "uppercase", "tracking-wider", "flex", "items-center", "gap-2", "shadow-md", "transition-all", "active:scale-95"], [1, "lg:col-span-7", "relative", "min-h-[320px]", "lg:min-h-full", "overflow-hidden", "bg-slate-900"], ["referrerpolicy", "no-referrer", 1, "w-full", "h-full", "object-cover", "object-center", "transition-all", "duration-700", "hover:scale-105", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-900/60", "via-transparent", "to-transparent", "lg:bg-gradient-to-r", "lg:from-slate-900/40", "dark:lg:from-slate-900", "lg:via-transparent", "lg:to-transparent"], [1, "absolute", "bottom-4", "left-4", "right-4", "sm:bottom-6", "sm:left-6", "flex", "items-center", "justify-between"], [1, "px-3", "py-1.5", "rounded-xl", "bg-white/90", "dark:bg-slate-950/80", "backdrop-blur-md", "border", "border-slate-200", "dark:border-slate-800", "text-[11px]", "font-mono", "text-slate-800", "dark:text-slate-300", "flex", "items-center", "gap-2", "shadow-xs"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-ping"], [1, "px-3", "py-1.5", "rounded-xl", "bg-white/90", "dark:bg-slate-950/80", "backdrop-blur-md", "border", "border-slate-200", "dark:border-slate-800", "text-[11px]", "font-mono", "text-emerald-700", "dark:text-emerald-400", "font-bold", "flex", "items-center", "gap-1.5", "shadow-xs"], [1, "!text-xs"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "gap-3", "mt-4"], ["type", "button", 1, "p-3", "rounded-xl", "border", "text-left", "transition-all", "flex", "items-center", "gap-3", "cursor-pointer", 3, "bg-emerald-50/80", "bg-slate-900", "border-emerald-500", "bg-white", "bg-slate-950", "border-slate-200", "border-slate-800", "opacity-60"], ["id", "standards", 1, "py-16", "bg-slate-100/70", "dark:bg-slate-900/50", "border-b", "border-slate-200", "dark:border-slate-800/80", "transition-colors"], [1, "text-center", "max-w-2xl", "mx-auto", "mb-12"], [1, "text-xs", "font-mono", "uppercase", "text-emerald-600", "dark:text-emerald-400", "tracking-wider", "font-semibold"], [1, "text-3xl", "font-black", "text-slate-900", "dark:text-white", "mt-1"], [1, "text-sm", "text-slate-600", "dark:text-slate-400", "mt-2"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "p-6", "rounded-2xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "shadow-sm", "flex", "flex-col", "justify-between", "transition-colors"], [1, "w-12", "h-12", "rounded-xl", "bg-emerald-50", "dark:bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "border", "border-emerald-200", "dark:border-emerald-500/20", "flex", "items-center", "justify-center", "mb-4"], [1, "!text-2xl"], [1, "text-base", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "mt-2", "leading-relaxed"], [1, "mt-4", "pt-3", "border-t", "border-slate-200", "dark:border-slate-800/80", "text-[11px]", "font-mono", "text-emerald-600", "dark:text-emerald-400", "font-semibold"], [1, "w-12", "h-12", "rounded-xl", "bg-indigo-50", "dark:bg-indigo-500/10", "text-indigo-600", "dark:text-indigo-400", "border", "border-indigo-200", "dark:border-indigo-500/20", "flex", "items-center", "justify-center", "mb-4"], [1, "mt-4", "pt-3", "border-t", "border-slate-200", "dark:border-slate-800/80", "text-[11px]", "font-mono", "text-indigo-600", "dark:text-indigo-400", "font-semibold"], [1, "w-12", "h-12", "rounded-xl", "bg-amber-50", "dark:bg-amber-500/10", "text-amber-600", "dark:text-amber-400", "border", "border-amber-200", "dark:border-amber-500/20", "flex", "items-center", "justify-center", "mb-4"], [1, "mt-4", "pt-3", "border-t", "border-slate-200", "dark:border-slate-800/80", "text-[11px]", "font-mono", "text-amber-600", "dark:text-amber-400", "font-semibold"], ["id", "contact-form", 1, "py-16", "lg:py-24", "bg-white", "dark:bg-slate-950", "relative", "overflow-hidden", "transition-colors"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-12", "items-start"], [1, "lg:col-span-5"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "dark:bg-emerald-400"], [1, "text-3xl", "sm:text-4xl", "font-black", "text-slate-900", "dark:text-white", "tracking-tight"], [1, "mt-3", "text-slate-600", "dark:text-slate-400", "text-sm", "leading-relaxed"], [1, "mt-8", "space-y-4"], [1, "flex", "items-start", "gap-3.5", "p-4", "rounded-xl", "bg-slate-50", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xs"], [1, "w-9", "h-9", "rounded-lg", "bg-emerald-50", "dark:bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "border", "border-emerald-200", "dark:border-emerald-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "mt-0.5"], [1, "text-xs", "font-mono", "text-emerald-600", "dark:text-emerald-400", "font-bold", "mt-1"], [1, "w-9", "h-9", "rounded-lg", "bg-indigo-50", "dark:bg-indigo-500/10", "text-indigo-600", "dark:text-indigo-400", "border", "border-indigo-200", "dark:border-indigo-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "text-[11px]", "font-mono", "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "w-9", "h-9", "rounded-lg", "bg-amber-50", "dark:bg-amber-500/10", "text-amber-600", "dark:text-amber-400", "border", "border-amber-200", "dark:border-amber-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "mt-8", "p-4", "rounded-2xl", "bg-gradient-to-r", "from-slate-100", "to-slate-200/80", "dark:from-slate-900", "dark:to-slate-800/80", "border", "border-slate-300", "dark:border-slate-700/80"], [1, "flex", "items-center", "justify-between"], [1, "text-[11px]", "text-slate-600", "dark:text-slate-400"], ["type", "button", 1, "px-3", "py-1.5", "rounded-lg", "bg-slate-900", "hover:bg-slate-800", "text-white", "dark:bg-slate-100", "dark:hover:bg-white", "dark:text-slate-950", "font-bold", "text-xs", "flex", "items-center", "gap-1", "transition-all", "shadow-sm", "cursor-pointer", 3, "click"], [1, "lg:col-span-7", "bg-slate-50", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-3xl", "p-6", "sm:p-10", "shadow-lg", "dark:shadow-2xl", "relative", "transition-colors"], [1, "py-12", "text-center"], [1, "bg-slate-100", "dark:bg-slate-950", "border-t", "border-slate-200", "dark:border-slate-800", "py-12", "transition-colors"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-6"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-lg", "bg-emerald-500", "text-slate-950", "flex", "items-center", "justify-center", "font-mono", "font-bold", "text-sm", "shrink-0"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-slate-500", "dark:text-slate-400"], [1, "flex", "items-center", "gap-6", "text-xs", "text-slate-500", "dark:text-slate-400", "font-mono"], ["type", "button", 1, "text-emerald-600", "dark:text-emerald-400", "hover:underline", "cursor-pointer", 3, "click"], ["type", "button", 1, "p-3", "rounded-xl", "border", "text-left", "transition-all", "flex", "items-center", "gap-3", "cursor-pointer", 3, "click"], [1, "w-8", "h-8", "rounded-lg", "overflow-hidden", "shrink-0", "border", "border-slate-300", "dark:border-slate-700"], ["referrerpolicy", "no-referrer", 1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "truncate"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-white", "truncate"], [1, "text-[10px]", "text-slate-500", "dark:text-slate-400", "truncate"], [1, "w-16", "h-16", "rounded-2xl", "bg-emerald-500/20", "text-emerald-600", "dark:text-emerald-400", "border", "border-emerald-500/30", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], [1, "!text-3xl"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-white"], [1, "text-xs", "sm:text-sm", "text-slate-600", "dark:text-slate-300", "max-w-md", "mx-auto", "mt-2"], [1, "font-mono", "text-emerald-600", "dark:text-emerald-400", "font-bold"], [1, "mt-6", "p-4", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-200", "dark:border-slate-800", "text-left", "max-w-md", "mx-auto", "text-xs", "space-y-2"], [1, "flex", "justify-between", "text-slate-600", "dark:text-slate-400"], [1, "text-slate-900", "dark:text-white", "truncate", "max-w-[200px]"], [1, "text-emerald-600", "dark:text-emerald-400", "font-mono", "font-bold", "uppercase"], [1, "mt-8", "flex", "flex-wrap", "items-center", "justify-center", "gap-3"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "bg-slate-200", "hover:bg-slate-300", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-xs", "font-semibold", "text-slate-800", "dark:text-white", "transition-colors", "cursor-pointer", 3, "click"], ["type", "button", 1, "px-5", "py-2", "rounded-xl", "bg-emerald-500", "hover:bg-emerald-400", "dark:bg-emerald-400", "dark:hover:bg-emerald-300", "text-slate-950", "text-xs", "font-bold", "transition-colors", "flex", "items-center", "gap-1.5", "cursor-pointer", "shadow-sm", 3, "click"], [1, "mb-6"], [1, "text-xl", "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-600", "dark:text-slate-400", "mt-1"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["for", "contactFullName", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactFullName", "type", "text", "formControlName", "fullName", "placeholder", "e.g. Eleanor Vance", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "placeholder-slate-400", "dark:placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], [1, "text-[11px]", "text-red-500", "dark:text-red-400", "mt-1", "block"], ["for", "contactEmail", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactEmail", "type", "email", "formControlName", "email", "placeholder", "client@residence.com", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "placeholder-slate-400", "dark:placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["for", "contactPhone", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactPhone", "type", "tel", "formControlName", "phone", "placeholder", "+1 (555) 782-9011", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "placeholder-slate-400", "dark:placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["for", "contactDoorType", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactDoorType", "formControlName", "doorType", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["value", "entrance_pivot"], ["value", "solid_wood_entrance"], ["value", "acoustic_french"], ["value", "sliding_pocket"], ["value", "bi_fold_patio"], ["value", "fire_rated_commercial"], ["value", "frameless_glass"], ["for", "contactProjectType", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactProjectType", "formControlName", "projectType", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["value", "luxury_estate"], ["value", "residential"], ["value", "commercial"], ["value", "renovation"], ["for", "contactDoorsCount", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactDoorsCount", "type", "number", "min", "1", "max", "50", "formControlName", "doorsCount", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["for", "contactSiteAddress", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactSiteAddress", "type", "text", "formControlName", "siteAddress", "placeholder", "e.g. 184 Maplewood Crest, Highview Terraces", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "placeholder-slate-400", "dark:placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["for", "contactPrefDate", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactPrefDate", "type", "date", "formControlName", "preferredDate", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["for", "contactTimeSlot", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactTimeSlot", "formControlName", "preferredTimeSlot", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "shadow-2xs", "transition-colors"], ["value", "morning"], ["value", "afternoon"], ["value", "anytime"], ["for", "contactMessage", 1, "block", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300", "mb-1"], ["id", "contactMessage", "rows", "3", "formControlName", "message", "placeholder", "Provide details about rough opening, existing frame, pivot hardware brands, or access codes...", 1, "w-full", "px-3.5", "py-2.5", "rounded-xl", "bg-white", "dark:bg-slate-950", "border", "border-slate-300", "dark:border-slate-700", "text-slate-900", "dark:text-white", "text-xs", "placeholder-slate-400", "dark:placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", "focus:ring-1", "focus:ring-emerald-500", "resize-none", "shadow-2xs", "transition-colors"], ["type", "submit", 1, "w-full", "py-3.5", "px-4", "rounded-xl", "bg-emerald-500", "hover:bg-emerald-400", "dark:bg-emerald-400", "dark:hover:bg-emerald-300", "text-slate-950", "font-bold", "text-xs", "uppercase", "tracking-wider", "flex", "items-center", "justify-center", "gap-2", "shadow-lg", "shadow-emerald-500/20", "transition-all", "active:scale-[0.99]", "disabled:opacity-50", "cursor-pointer", 3, "disabled"], [1, "w-4", "h-4", "border-2", "border-slate-950", "border-t-transparent", "rounded-full", "animate-spin"], [1, "!text-base"]], template: function LandingPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵtext(5, " DM ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div")(7, "div", 5)(8, "span", 6);
            i0.ɵɵtext(9, "DoorMaster");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 7);
            i0.ɵɵtext(11, " PRECISION ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "p", 8);
            i0.ɵɵtext(13, "Architectural Door Installation & Field Ops");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "div", 9)(15, "a", 10)(16, "mat-icon", 11);
            i0.ɵɵtext(17, "handyman");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19, "Technicians at Work");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "a", 12)(21, "mat-icon", 11);
            i0.ɵɵtext(22, "verified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "Quality Standards");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "a", 13)(26, "mat-icon", 11);
            i0.ɵɵtext(27, "calendar_month");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Book Installation");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "div", 14)(31, "button", 15);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_31_listener() { return ctx.themeStore.toggleTheme(); });
            i0.ɵɵelementStart(32, "mat-icon", 16);
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span", 17);
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "button", 18);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_36_listener() { return ctx.navigateToSignIn(); });
            i0.ɵɵelementStart(37, "mat-icon", 19);
            i0.ɵɵtext(38, "login");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span");
            i0.ɵɵtext(40, "Sign In / Portals");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "a", 20)(42, "span");
            i0.ɵɵtext(43, "Request Installation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "mat-icon", 21);
            i0.ɵɵtext(45, "arrow_downward");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(46, "section", 22);
            i0.ɵɵelement(47, "div", 23);
            i0.ɵɵelementStart(48, "div", 24)(49, "div", 25)(50, "div")(51, "div", 26);
            i0.ɵɵelement(52, "span", 27);
            i0.ɵɵtext(53, " LIVE FIELD CRAFTSMANSHIP ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "h1", 28);
            i0.ɵɵtext(55, " Master Door Technicians. ");
            i0.ɵɵelement(56, "br", 29);
            i0.ɵɵelementStart(57, "span", 30);
            i0.ɵɵtext(58, " Precision in Every Millimeter. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "p", 31);
            i0.ɵɵtext(60, " Experience architectural door installation executed with surgical laser accuracy. Watch our certified field technicians install custom pivot doors, sound-damped French suites, and sliding glass walls. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "div", 32)(62, "span", 33)(63, "strong", 34);
            i0.ɵɵtext(64);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(65);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "div", 5)(67, "button", 35);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_67_listener() { return ctx.prevSlide(); });
            i0.ɵɵelementStart(68, "mat-icon", 16);
            i0.ɵɵtext(69, "arrow_back");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "button", 36);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_70_listener() { return ctx.nextSlide(); });
            i0.ɵɵelementStart(71, "mat-icon", 16);
            i0.ɵɵtext(72, "arrow_forward");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(73, "div", 37)(74, "div", 38)(75, "div", 39)(76, "div")(77, "div", 40)(78, "span", 41);
            i0.ɵɵtext(79);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "span", 42)(81, "mat-icon", 43);
            i0.ɵɵtext(82, "location_on");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(83);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(84, "h2", 44);
            i0.ɵɵtext(85);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "p", 45);
            i0.ɵɵtext(87);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "p", 46);
            i0.ɵɵtext(89);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "div", 47)(91, "div", 48);
            i0.ɵɵtext(92);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "div", 49)(94, "div", 50);
            i0.ɵɵtext(95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "div", 51);
            i0.ɵɵtext(97);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "div", 52)(99, "mat-icon", 53);
            i0.ɵɵtext(100, "task_alt");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "span");
            i0.ɵɵtext(102);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(103, "div", 54)(104, "div")(105, "div", 55);
            i0.ɵɵtext(106);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "div", 56);
            i0.ɵɵtext(108);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(109, "a", 57)(110, "span");
            i0.ɵɵtext(111, "Request Installation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "mat-icon", 11);
            i0.ɵɵtext(113, "arrow_forward");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(114, "div", 58);
            i0.ɵɵelement(115, "img", 59)(116, "div", 60);
            i0.ɵɵelementStart(117, "div", 61)(118, "div", 62);
            i0.ɵɵelement(119, "span", 63);
            i0.ɵɵelementStart(120, "span");
            i0.ɵɵtext(121, "Verified Installation Site Photo");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(122, "div", 64)(123, "mat-icon", 65);
            i0.ɵɵtext(124, "handyman");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "span");
            i0.ɵɵtext(126);
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(127, "div", 66);
            i0.ɵɵrepeaterCreate(128, LandingPage_For_129_Template, 8, 20, "button", 67, _forTrack0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(130, "section", 68)(131, "div", 24)(132, "div", 69)(133, "span", 70);
            i0.ɵɵtext(134, "Field Standards");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(135, "h2", 71);
            i0.ɵɵtext(136, "Why Architects & Homeowners Rely On Us");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "p", 72);
            i0.ɵɵtext(138, " Every DoorMaster installation operates under our digital audit trail, verified from factory fabrication to client signature. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(139, "div", 73)(140, "div", 74)(141, "div")(142, "div", 75)(143, "mat-icon", 76);
            i0.ɵɵtext(144, "straighten");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(145, "h3", 77);
            i0.ɵɵtext(146, "Laser Plumb & Level Precision");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(147, "p", 78);
            i0.ɵɵtext(148, " Heavy pivot slabs and sound-rated doors require exact \u00B11.0mm tolerance. Our installers use cross-line green lasers and calibrate resistance damping on site. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(149, "div", 79);
            i0.ɵɵtext(150, " 100% Level Guarantee ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(151, "div", 74)(152, "div")(153, "div", 80)(154, "mat-icon", 76);
            i0.ɵɵtext(155, "gps_fixed");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(156, "h3", 77);
            i0.ɵɵtext(157, "Real-Time Dispatch & Radar");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "p", 78);
            i0.ɵɵtext(159, " Uber-style tracking for door delivery and installer arrival. Clients receive live status pings from warehouse departure to site clock-in. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(160, "div", 81);
            i0.ɵɵtext(161, " Live Geofenced Tracking ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(162, "div", 74)(163, "div")(164, "div", 82)(165, "mat-icon", 76);
            i0.ɵɵtext(166, "military_tech");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(167, "h3", 77);
            i0.ɵɵtext(168, "Incentivized Quality & Bonus");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(169, "p", 78);
            i0.ɵɵtext(170, " Installers earn performance bonuses for 5-star customer ratings and immaculate multi-angle photographic documentation before handover. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(171, "div", 83);
            i0.ɵɵtext(172, " Tied to Customer Satisfaction ");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(173, "section", 84)(174, "div", 24)(175, "div", 85)(176, "div", 86)(177, "div", 26);
            i0.ɵɵelement(178, "span", 87);
            i0.ɵɵtext(179, " BOOK YOUR INSTALLATION ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "h2", 88);
            i0.ɵɵtext(181, " Request Certified Installation Today ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(182, "p", 89);
            i0.ɵɵtext(183, " Whether you have purchased a grand entrance pivot slab, luxury bifold patio, or acoustic interior doors, our master field technicians are ready to deploy. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(184, "div", 90)(185, "div", 91)(186, "div", 92)(187, "mat-icon", 16);
            i0.ɵɵtext(188, "support_agent");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(189, "div")(190, "h4", 93);
            i0.ɵɵtext(191, "Direct Operations Dispatch");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(192, "p", 94);
            i0.ɵɵtext(193, "Calls routed directly to duty field coordinators.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(194, "p", 95);
            i0.ɵɵtext(195, "+1 (555) 800-DOOR (3667)");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(196, "div", 91)(197, "div", 96)(198, "mat-icon", 16);
            i0.ɵɵtext(199, "pin_drop");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(200, "div")(201, "h4", 93);
            i0.ɵɵtext(202, "Fabrication & Dispatch Hubs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(203, "p", 94);
            i0.ɵɵtext(204, "Central Atelier \u2022 South Industrial Bay \u2022 Coastal Fleet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(205, "p", 97);
            i0.ɵɵtext(206, "Rapid response across greater metro region");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(207, "div", 91)(208, "div", 98)(209, "mat-icon", 16);
            i0.ɵɵtext(210, "shield");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(211, "div")(212, "h4", 93);
            i0.ɵɵtext(213, "Full Manufacturer Warranty Retained");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(214, "p", 94);
            i0.ɵɵtext(215, "Installation certified for FritsJurgens, DormaKaba, Schuco & Hafele hardware.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(216, "div", 99)(217, "div", 100)(218, "div")(219, "div", 93);
            i0.ɵɵtext(220, "DoorMaster Team Member?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(221, "div", 101);
            i0.ɵɵtext(222, "Installer, Manager, Account Officer or Client?");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(223, "button", 102);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_223_listener() { return ctx.navigateToSignIn(); });
            i0.ɵɵelementStart(224, "span");
            i0.ɵɵtext(225, "Sign In");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(226, "mat-icon", 65);
            i0.ɵɵtext(227, "arrow_forward");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(228, "div", 103);
            i0.ɵɵconditionalCreate(229, LandingPage_Conditional_229_Template, 38, 4, "div", 104)(230, LandingPage_Conditional_230_Template, 86, 7, "div");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(231, "footer", 105)(232, "div", 106)(233, "div", 107)(234, "div", 108);
            i0.ɵɵtext(235, " DM ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(236, "div")(237, "div", 109);
            i0.ɵɵtext(238, "DoorMaster Enterprise Installation Platform");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(239, "div", 110);
            i0.ɵɵtext(240, "Integrated field operations, technician bonuses & customer live tracking");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(241, "div", 111)(242, "span");
            i0.ɵɵtext(243, "\u00A9 2026 DoorMaster Systems");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(244, "button", 112);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_244_listener() { return ctx.navigateToSignIn(); });
            i0.ɵɵtext(245, " Persona Sign In Portal ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(31);
            i0.ɵɵproperty("title", ctx.themeStore.isDark() ? "Switch to Light Mode" : "Switch to Dark Mode");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("text-amber-500", !ctx.themeStore.isDark())("text-indigo-400", ctx.themeStore.isDark());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.themeStore.isDark() ? "dark_mode" : "light_mode", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.themeStore.isDark() ? "Dark" : "Light", " ");
            i0.ɵɵadvance(29);
            i0.ɵɵtextInterpolate1("0", ctx.currentSlideIndex() + 1);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" / 0", ctx.slides.length, " ");
            const slide_r7 = ctx.currentSlide();
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate1(" ", slide_r7.badge, " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", slide_r7.location, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", slide_r7.doorTitle, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", slide_r7.tagline, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", slide_r7.description, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", slide_r7.technicianName.charAt(0), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(slide_r7.technicianName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(slide_r7.technicianRole);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("Stage: ", slide_r7.stage);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(slide_r7.statNumber);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(slide_r7.statLabel);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("src", slide_r7.photoUrl, i0.ɵɵsanitizeUrl)("alt", slide_r7.doorTitle);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(slide_r7.doorCategory);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.slides);
            i0.ɵɵadvance(101);
            i0.ɵɵconditional(ctx.submissionSuccess() ? 229 : 230);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, MatIconModule, i2.MatIcon], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LandingPage, [{
        type: Component,
        args: [{
                selector: 'app-landing-page',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [ReactiveFormsModule, MatIconModule],
                template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-slate-950">
      
      <!-- ========================================================================= -->
      <!-- TOP NAVIGATION BAR                                                        -->
      <!-- ========================================================================= -->
      <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/85 border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <!-- Brand -->
          <div class="flex items-center gap-3.5 cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-black text-lg shadow-lg shadow-emerald-500/20 shrink-0">
              DM
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg font-black tracking-tight text-slate-900 dark:text-white">DoorMaster</span>
                <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded font-semibold tracking-wider">
                  PRECISION
                </span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Architectural Door Installation & Field Ops</p>
            </div>
          </div>

          <!-- Nav Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#hero-slider" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">handyman</mat-icon>
              <span>Technicians at Work</span>
            </a>
            <a href="#standards" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">verified</mat-icon>
              <span>Quality Standards</span>
            </a>
            <a href="#contact-form" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <mat-icon class="!text-sm">calendar_month</mat-icon>
              <span>Book Installation</span>
            </a>
          </div>

          <!-- Action Buttons & Theme Toggle -->
          <div class="flex items-center gap-2.5 sm:gap-3">
            
            <!-- Navbar Theme Toggle Button (Light/Dark Mode) -->
            <button 
              type="button" 
              (click)="themeStore.toggleTheme()" 
              class="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-2 shadow-xs active:scale-95 cursor-pointer"
              [title]="themeStore.isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              aria-label="Toggle light or dark theme"
            >
              <mat-icon class="!text-lg" [class.text-amber-500]="!themeStore.isDark()" [class.text-indigo-400]="themeStore.isDark()">
                {{ themeStore.isDark() ? 'dark_mode' : 'light_mode' }}
              </mat-icon>
              <span class="text-xs font-semibold hidden sm:inline">
                {{ themeStore.isDark() ? 'Dark' : 'Light' }}
              </span>
            </button>

            <!-- Sign In & Portal Access Button -->
            <button 
              type="button" 
              (click)="navigateToSignIn()" 
              class="h-10 px-3.5 sm:px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <mat-icon class="!text-base text-emerald-600 dark:text-emerald-400">login</mat-icon>
              <span>Sign In / Portals</span>
            </button>

            <!-- Request Installation Primary CTA -->
            <a 
              href="#contact-form"
              class="hidden sm:inline-flex h-10 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 transition-all items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <span>Request Installation</span>
              <mat-icon class="!text-sm !w-4 !h-4">arrow_downward</mat-icon>
            </a>
          </div>
        </div>
      </nav>

      <!-- ========================================================================= -->
      <!-- 1. HERO SLIDER SECTION: TECHNICIANS AT WORK                               -->
      <!-- ========================================================================= -->
      <section id="hero-slider" class="relative overflow-hidden bg-white dark:bg-slate-950 py-12 lg:py-20 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <!-- Subtle background glow -->
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Slider Header Controls -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold font-mono mb-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                LIVE FIELD CRAFTSMANSHIP
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Master Door Technicians. <br class="hidden sm:inline" />
                <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Precision in Every Millimeter.
                </span>
              </h1>
              <p class="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                Experience architectural door installation executed with surgical laser accuracy. Watch our certified field technicians install custom pivot doors, sound-damped French suites, and sliding glass walls.
              </p>
            </div>

            <!-- Slide Navigation Arrows & Counter -->
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
                <strong class="text-slate-900 dark:text-white">0{{ currentSlideIndex() + 1 }}</strong> / 0{{ slides.length }}
              </span>
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  (click)="prevSlide()"
                  class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <mat-icon class="!text-lg">arrow_back</mat-icon>
                </button>
                <button 
                  type="button" 
                  (click)="nextSlide()"
                  class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <mat-icon class="!text-lg">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Active Slide Showcase Card -->
          @let slide = currentSlide();
          <div class="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl transition-all duration-500">
            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              <!-- Slide Left: Technician & Work Description -->
              <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between z-10 bg-white/95 lg:bg-white/90 dark:bg-slate-900/90 dark:lg:bg-slate-900/80 backdrop-blur-sm">
                <div>
                  <div class="flex items-center gap-2 mb-4">
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      {{ slide.badge }}
                    </span>
                    <span class="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <mat-icon class="!text-xs text-slate-400">location_on</mat-icon>
                      {{ slide.location }}
                    </span>
                  </div>

                  <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                    {{ slide.doorTitle }}
                  </h2>
                  <p class="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wide font-semibold">
                    {{ slide.tagline }}
                  </p>

                  <p class="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {{ slide.description }}
                  </p>

                  <!-- Technician In Action Profile -->
                  <div class="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 flex items-center justify-center font-bold text-base shadow-md shrink-0">
                      {{ slide.technicianName.charAt(0) }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ slide.technicianName }}</div>
                      <div class="text-xs text-slate-500 dark:text-slate-400">{{ slide.technicianRole }}</div>
                      <div class="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-semibold">
                        <mat-icon class="!text-[12px] !w-3 !h-3">task_alt</mat-icon>
                        <span>Stage: {{ slide.stage }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Live Slide Stat & Action -->
                <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">{{ slide.statNumber }}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono">{{ slide.statLabel }}</div>
                  </div>

                  <a 
                    href="#contact-form"
                    class="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>Request Installation</span>
                    <mat-icon class="!text-sm">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>

              <!-- Slide Right: High-Res Real Work Scene Imagery -->
              <div class="lg:col-span-7 relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-900">
                <img 
                  [src]="slide.photoUrl" 
                  [alt]="slide.doorTitle"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                />

                <!-- Image overlay gradient for clean text readability & depth -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900/40 dark:lg:from-slate-900 lg:via-transparent lg:to-transparent"></div>

                <!-- Live Tag Overlay on Image -->
                <div class="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-center justify-between">
                  <div class="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Verified Installation Site Photo</span>
                  </div>

                  <div class="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 shadow-xs">
                    <mat-icon class="!text-xs">handyman</mat-icon>
                    <span>{{ slide.doorCategory }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Slide Thumbnail Indicators -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            @for (s of slides; track s.id; let idx = $index) {
              <button 
                type="button" 
                (click)="setSlide(idx)"
                class="p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer"
                [class.bg-emerald-50/80]="currentSlideIndex() === idx && !themeStore.isDark()"
                [class.bg-slate-900]="currentSlideIndex() === idx && themeStore.isDark()"
                [class.border-emerald-500]="currentSlideIndex() === idx"
                [class.bg-white]="currentSlideIndex() !== idx && !themeStore.isDark()"
                [class.bg-slate-950]="currentSlideIndex() !== idx && themeStore.isDark()"
                [class.border-slate-200]="currentSlideIndex() !== idx && !themeStore.isDark()"
                [class.border-slate-800]="currentSlideIndex() !== idx && themeStore.isDark()"
                [class.opacity-60]="currentSlideIndex() !== idx"
              >
                <div class="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700">
                  <img [src]="s.photoUrl" [alt]="s.badge" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
                </div>
                <div class="truncate">
                  <div class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ s.doorTitle }}</div>
                  <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ s.technicianName }}</div>
                </div>
              </button>
            }
          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 2. VALUE PROPOSITION & SYSTEM ASSURANCES                                  -->
      <!-- ========================================================================= -->
      <section id="standards" class="py-16 bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 tracking-wider font-semibold">Field Standards</span>
            <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-1">Why Architects & Homeowners Rely On Us</h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every DoorMaster installation operates under our digital audit trail, verified from factory fabrication to client signature.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Feature 1 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">straighten</mat-icon>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Laser Plumb & Level Precision</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Heavy pivot slabs and sound-rated doors require exact ±1.0mm tolerance. Our installers use cross-line green lasers and calibrate resistance damping on site.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                100% Level Guarantee
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">gps_fixed</mat-icon>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Real-Time Dispatch & Radar</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Uber-style tracking for door delivery and installer arrival. Clients receive live status pings from warehouse departure to site clock-in.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                Live Geofenced Tracking
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center mb-4">
                  <mat-icon class="!text-2xl">military_tech</mat-icon>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Incentivized Quality & Bonus</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Installers earn performance bonuses for 5-star customer ratings and immaculate multi-angle photographic documentation before handover.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                Tied to Customer Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 3. CONTACT US & INSTALLATION REQUEST FORM                                 -->
      <!-- ========================================================================= -->
      <section id="contact-form" class="py-16 lg:py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Info Column -->
            <div class="lg:col-span-5">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold font-mono mb-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                BOOK YOUR INSTALLATION
              </div>
              <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Request Certified Installation Today
              </h2>
              <p class="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Whether you have purchased a grand entrance pivot slab, luxury bifold patio, or acoustic interior doors, our master field technicians are ready to deploy.
              </p>

              <!-- Operational Details -->
              <div class="mt-8 space-y-4">
                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">support_agent</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Direct Operations Dispatch</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Calls routed directly to duty field coordinators.</p>
                    <p class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">+1 (555) 800-DOOR (3667)</p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">pin_drop</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Fabrication & Dispatch Hubs</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Central Atelier • South Industrial Bay • Coastal Fleet</p>
                    <p class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">Rapid response across greater metro region</p>
                  </div>
                </div>

                <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div class="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center shrink-0">
                    <mat-icon class="!text-lg">shield</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Full Manufacturer Warranty Retained</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Installation certified for FritsJurgens, DormaKaba, Schuco & Hafele hardware.</p>
                  </div>
                </div>
              </div>

              <!-- Quick Persona Sign In Callout -->
              <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200/80 dark:from-slate-900 dark:to-slate-800/80 border border-slate-300 dark:border-slate-700/80">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">DoorMaster Team Member?</div>
                    <div class="text-[11px] text-slate-600 dark:text-slate-400">Installer, Manager, Account Officer or Client?</div>
                  </div>
                  <button 
                    type="button" 
                    (click)="navigateToSignIn()" 
                    class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-950 font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Sign In</span>
                    <mat-icon class="!text-xs">arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Form Column -->
            <div class="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg dark:shadow-2xl relative transition-colors">
              
              @if (submissionSuccess()) {
                <!-- Success Message Banner -->
                <div class="py-12 text-center">
                  <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <mat-icon class="!text-3xl">check_circle</mat-icon>
                  </div>
                  <h3 class="text-2xl font-black text-slate-900 dark:text-white">Installation Request Received!</h3>
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-2">
                    Thank you, <strong class="text-slate-900 dark:text-white">{{ submittedInquiry()?.fullName }}</strong>. Your request (<span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ submittedInquiry()?.id }}</span>) has been queued with our Operations Command team.
                  </p>

                  <div class="mt-6 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left max-w-md mx-auto text-xs space-y-2">
                    <div class="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Door Model:</span>
                      <strong class="text-slate-900 dark:text-white">{{ submittedInquiry()?.doorType }}</strong>
                    </div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Site Address:</span>
                      <strong class="text-slate-900 dark:text-white truncate max-w-[200px]">{{ submittedInquiry()?.siteAddress }}</strong>
                    </div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Assigned Priority:</span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase">Rapid Technician Dispatch</span>
                    </div>
                  </div>

                  <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button 
                      type="button" 
                      (click)="resetForm()"
                      class="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>

                    <button 
                      type="button" 
                      (click)="navigateToDashboard()" 
                      class="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <mat-icon class="!text-sm">dashboard</mat-icon>
                      <span>Sign In to Dashboard</span>
                    </button>
                  </div>
                </div>
              } @else {
                <!-- Standard Contact Us / Installation Request Form -->
                <div>
                  <div class="mb-6">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white">Request Installation Service</h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Fill out your site details below. Our field coordinator will review your door specifications and send you an immediate schedule & quote.
                    </p>
                  </div>

                  <form [formGroup]="inquiryForm" (ngSubmit)="handleFormSubmit()" class="space-y-4">
                    <!-- Name & Email Row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactFullName" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input 
                          id="contactFullName"
                          type="text" 
                          formControlName="fullName"
                          placeholder="e.g. Eleanor Vance"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                        @if (inquiryForm.get('fullName')?.touched && inquiryForm.get('fullName')?.invalid) {
                          <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">Full name is required.</span>
                        }
                      </div>

                      <div>
                        <label for="contactEmail" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input 
                          id="contactEmail"
                          type="email" 
                          formControlName="email"
                          placeholder="client@residence.com"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                        @if (inquiryForm.get('email')?.touched && inquiryForm.get('email')?.invalid) {
                          <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">A valid email is required.</span>
                        }
                      </div>
                    </div>

                    <!-- Phone & Door Category -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactPhone" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input 
                          id="contactPhone"
                          type="tel" 
                          formControlName="phone"
                          placeholder="+1 (555) 782-9011"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                        @if (inquiryForm.get('phone')?.touched && inquiryForm.get('phone')?.invalid) {
                          <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">Phone number is required.</span>
                        }
                      </div>

                      <div>
                        <label for="contactDoorType" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Door System / Category *
                        </label>
                        <select 
                          id="contactDoorType"
                          formControlName="doorType"
                          class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        >
                          <option value="entrance_pivot">Architectural Entrance Pivot Door</option>
                          <option value="solid_wood_entrance">Solid Wood Entrance Door Slab</option>
                          <option value="acoustic_french">Acoustic French Interior Doors</option>
                          <option value="sliding_pocket">Heavy Concealed Pocket Sliders</option>
                          <option value="bi_fold_patio">Exterior Multi-Fold Patio System</option>
                          <option value="fire_rated_commercial">Fire-Rated Commercial Assemblies</option>
                          <option value="frameless_glass">Frameless Architectural Glass</option>
                        </select>
                      </div>
                    </div>

                    <!-- Project Type & Quantity -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactProjectType" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Project Environment
                        </label>
                        <select 
                          id="contactProjectType"
                          formControlName="projectType"
                          class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        >
                          <option value="luxury_estate">Luxury Private Estate / New Build</option>
                          <option value="residential">Residential Renovation</option>
                          <option value="commercial">Commercial Office / Hospitality</option>
                          <option value="renovation">Historical Restoration</option>
                        </select>
                      </div>

                      <div>
                        <label for="contactDoorsCount" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Number of Door Openings
                        </label>
                        <input 
                          id="contactDoorsCount"
                          type="number" 
                          min="1" 
                          max="50"
                          formControlName="doorsCount"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                      </div>
                    </div>

                    <!-- Site Address -->
                    <div>
                      <label for="contactSiteAddress" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Installation Site Address *
                      </label>
                      <input 
                        id="contactSiteAddress"
                        type="text" 
                        formControlName="siteAddress"
                        placeholder="e.g. 184 Maplewood Crest, Highview Terraces"
                        class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                      />
                      @if (inquiryForm.get('siteAddress')?.touched && inquiryForm.get('siteAddress')?.invalid) {
                        <span class="text-[11px] text-red-500 dark:text-red-400 mt-1 block">Site address is required for dispatch estimation.</span>
                      }
                    </div>

                    <!-- Preferred Date & Slot -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="contactPrefDate" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Installation Date
                        </label>
                        <input 
                          id="contactPrefDate"
                          type="date" 
                          formControlName="preferredDate"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        />
                      </div>

                      <div>
                        <label for="contactTimeSlot" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Arrival Window
                        </label>
                        <select 
                          id="contactTimeSlot"
                          formControlName="preferredTimeSlot"
                          class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
                        >
                          <option value="morning">Morning (08:00 - 12:00)</option>
                          <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                          <option value="anytime">Flexible All-Day Access</option>
                        </select>
                      </div>
                    </div>

                    <!-- Notes / Special Instructions -->
                    <div>
                      <label for="contactMessage" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Specific Hardware, Weight, or Site Instructions
                      </label>
                      <textarea 
                        id="contactMessage"
                        rows="3"
                        formControlName="message"
                        placeholder="Provide details about rough opening, existing frame, pivot hardware brands, or access codes..."
                        class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none shadow-2xs transition-colors"
                      ></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button 
                      type="submit"
                      [disabled]="isSubmitting()"
                      class="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      @if (isSubmitting()) {
                        <span class="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Routing Request to Dispatch...</span>
                      } @else {
                        <mat-icon class="!text-base">send</mat-icon>
                        <span>Submit Installation Request</span>
                      }
                    </button>
                  </form>
                </div>
              }

            </div>

          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- FOOTER                                                                    -->
      <!-- ========================================================================= -->
      <footer class="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-bold text-sm shrink-0">
              DM
            </div>
            <div>
              <div class="text-sm font-bold text-slate-900 dark:text-white">DoorMaster Enterprise Installation Platform</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">Integrated field operations, technician bonuses & customer live tracking</div>
            </div>
          </div>

          <div class="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>© 2026 DoorMaster Systems</span>
            <button type="button" (click)="navigateToSignIn()" class="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
              Persona Sign In Portal
            </button>
          </div>
        </div>
      </footer>

    </div>
  `
            }]
    }], null, { goToSignIn: [{ type: i0.Output, args: ["goToSignIn"] }], goToDashboard: [{ type: i0.Output, args: ["goToDashboard"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LandingPage, { className: "LandingPage", filePath: "frontend/src/app/views/landing-page/landing-page.ts", lineNumber: 703 }); })();
