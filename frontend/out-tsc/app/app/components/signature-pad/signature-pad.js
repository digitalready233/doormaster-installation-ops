import { ChangeDetectionStrategy, Component, ViewChild, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/forms";
const _c0 = ["sigCanvas"];
const _c1 = () => [1, 2, 3, 4, 5];
function SignaturePad_For_23_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function SignaturePad_For_23_Template_button_click_0_listener() { const star_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setRating(star_r2)); });
    i0.ɵɵelementStart(1, "mat-icon", 35);
    i0.ɵɵtext(2, " star ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const star_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", "Rate " + star_r2 + " stars");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("text-amber-400", ctx_r2.rating() >= star_r2)("text-slate-300", ctx_r2.rating() < star_r2);
} }
function SignaturePad_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "mat-icon", 36);
    i0.ɵɵtext(2, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Sign here with finger, stylus, or mouse");
    i0.ɵɵelementEnd()();
} }
export class SignaturePad {
    initialClientName = input('', ...(ngDevMode ? [{ debugName: "initialClientName" }] : /* istanbul ignore next */ []));
    initialRating = input(5, ...(ngDevMode ? [{ debugName: "initialRating" }] : /* istanbul ignore next */ []));
    signoffCompleted = output();
    cancelled = output();
    canvasRef;
    hasStrokes = signal(false, ...(ngDevMode ? [{ debugName: "hasStrokes" }] : /* istanbul ignore next */ []));
    rating = signal(5, ...(ngDevMode ? [{ debugName: "rating" }] : /* istanbul ignore next */ []));
    currentDateString = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    isDrawing = false;
    ctx = null;
    lastX = 0;
    lastY = 0;
    signoffForm = new FormGroup({
        clientName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        feedback: new FormControl('')
    });
    ngAfterViewInit() {
        this.setupCanvas();
        if (this.initialClientName()) {
            this.signoffForm.patchValue({ clientName: this.initialClientName() });
        }
        if (this.initialRating()) {
            this.rating.set(this.initialRating());
        }
    }
    setupCanvas() {
        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();
        // Support high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        this.ctx = canvas.getContext('2d');
        if (this.ctx) {
            this.ctx.scale(dpr, dpr);
            this.ctx.strokeStyle = '#0f172a'; // Slate-900
            this.ctx.lineWidth = 2.5;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
        }
    }
    setRating(stars) {
        this.rating.set(stars);
    }
    clearCanvas() {
        if (!this.ctx)
            return;
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.hasStrokes.set(false);
    }
    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    }
    draw(e) {
        if (!this.isDrawing || !this.ctx)
            return;
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
        this.lastX = currentX;
        this.lastY = currentY;
        this.hasStrokes.set(true);
    }
    stopDrawing() {
        this.isDrawing = false;
    }
    startTouchDrawing(e) {
        e.preventDefault();
        if (e.touches.length === 0)
            return;
        this.isDrawing = true;
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        this.lastX = e.touches[0].clientX - rect.left;
        this.lastY = e.touches[0].clientY - rect.top;
    }
    touchDraw(e) {
        e.preventDefault();
        if (!this.isDrawing || !this.ctx || e.touches.length === 0)
            return;
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        const currentX = e.touches[0].clientX - rect.left;
        const currentY = e.touches[0].clientY - rect.top;
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
        this.lastX = currentX;
        this.lastY = currentY;
        this.hasStrokes.set(true);
    }
    handleConfirm() {
        if (!this.hasStrokes() || this.signoffForm.invalid)
            return;
        const dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
        this.signoffCompleted.emit({
            clientName: this.signoffForm.value.clientName || 'Customer',
            signatureDataUrl: dataUrl,
            rating: this.rating(),
            feedback: this.signoffForm.value.feedback || 'Work completed to satisfaction.',
            signedAt: new Date().toISOString()
        });
    }
    static ɵfac = function SignaturePad_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignaturePad)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignaturePad, selectors: [["app-signature-pad"]], viewQuery: function SignaturePad_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvasRef = _t.first);
        } }, inputs: { initialClientName: [1, "initialClientName"], initialRating: [1, "initialRating"] }, outputs: { signoffCompleted: "signoffCompleted", cancelled: "cancelled" }, decls: 60, vars: 6, consts: [["sigCanvas", ""], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "overflow-hidden", "shadow-sm"], [1, "px-5", "py-4", "border-b", "border-slate-100", "flex", "items-center", "justify-between", "bg-slate-50/60"], [1, "text-sm", "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "flex", "items-center", "gap-1.5", "text-xs", "text-emerald-700", "bg-emerald-50", "px-2.5", "py-1", "rounded-md", "border", "border-emerald-200/60"], [1, "!text-sm", "!w-3.5", "!h-3.5", "leading-none"], [1, "font-medium"], [1, "p-5", "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["for", "sigClientName", 1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase", "tracking-wider", "mb-1.5"], ["id", "sigClientName", "type", "text", "formControlName", "clientName", "placeholder", "e.g. Eleanor Vance", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "focus:border-slate-900"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase", "tracking-wider", "mb-1.5"], [1, "flex", "items-center", "gap-1.5", "py-1"], ["type", "button", 1, "p-1", "rounded", "hover:bg-amber-50", "transition-colors", "focus:outline-none"], [1, "ml-2", "text-xs", "font-semibold", "text-slate-700", "tabular-nums"], ["for", "sigFeedback", 1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase", "tracking-wider", "mb-1.5"], ["id", "sigFeedback", "formControlName", "feedback", "rows", "2", "placeholder", "Verified door balance, latch action, and zero scratch finish...", 1, "w-full", "text-sm", "px-3.5", "py-2", "border", "border-slate-200", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-slate-900", "focus:border-slate-900"], [1, "flex", "items-center", "justify-between", "mb-1.5"], [1, "text-xs", "font-semibold", "text-slate-700", "uppercase", "tracking-wider"], ["type", "button", 1, "text-xs", "text-slate-500", "hover:text-rose-600", "flex", "items-center", "gap-1", "transition-colors", 3, "click"], [1, "!text-xs", "!w-3", "!h-3"], [1, "relative", "border-2", "border-dashed", "border-slate-300", "rounded-lg", "bg-slate-50/50", "hover:bg-white", "transition-colors", "overflow-hidden", "touch-none"], [1, "w-full", "h-40", "cursor-crosshair", "block", 3, "mousedown", "mousemove", "mouseup", "mouseleave", "touchstart", "touchmove", "touchend"], [1, "absolute", "bottom-6", "left-6", "right-6", "border-b", "border-slate-300", "pointer-events-none", "flex", "justify-between", "items-end", "pb-1"], [1, "text-[10px]", "uppercase", "font-mono", "text-slate-400", "tracking-wider"], [1, "text-[10px]", "text-slate-400", "font-mono", "tabular-nums"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center", "pointer-events-none", "text-slate-400", "text-xs"], [1, "p-3", "bg-slate-50", "rounded-lg", "border", "border-slate-200/80", "text-[11px]", "text-slate-600", "leading-relaxed"], [1, "font-medium", "text-slate-800", "mb-0.5"], [1, "flex", "items-center", "justify-end", "gap-2.5", "pt-2"], ["type", "button", 1, "px-4", "py-2", "text-xs", "font-semibold", "text-slate-600", "hover:text-slate-900", "border", "border-slate-200", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-xs", "font-semibold", "text-white", "bg-slate-900", "rounded-lg", "hover:bg-slate-800", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", "flex", "items-center", "gap-1.5", "shadow-sm", 3, "disabled"], [1, "!text-sm", "!w-4", "!h-4"], ["type", "button", 1, "p-1", "rounded", "hover:bg-amber-50", "transition-colors", "focus:outline-none", 3, "click"], [1, "!text-xl", "leading-none", "transition-transform", "active:scale-125"], [1, "mr-1.5", "!text-sm"]], template: function SignaturePad_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h3", 3);
            i0.ɵɵtext(4, "Customer Digital Sign-Off");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 4);
            i0.ɵɵtext(6, "Please inspect the completed door installation and provide verification signature");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 5)(8, "mat-icon", 6);
            i0.ɵɵtext(9, "verified_user");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 7);
            i0.ɵɵtext(11, "Legally Binding Sign-Off");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "form", 8);
            i0.ɵɵlistener("ngSubmit", function SignaturePad_Template_form_ngSubmit_12_listener() { return ctx.handleConfirm(); });
            i0.ɵɵelementStart(13, "div", 9)(14, "div")(15, "label", 10);
            i0.ɵɵtext(16, "Signee Full Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div")(19, "span", 12);
            i0.ɵɵtext(20, "Workmanship Rating");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 13);
            i0.ɵɵrepeaterCreate(22, SignaturePad_For_23_Template, 3, 5, "button", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementStart(24, "span", 15);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(26, "div")(27, "label", 16);
            i0.ɵɵtext(28, "Feedback / Client Remarks");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(29, "textarea", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div")(31, "div", 18)(32, "span", 19);
            i0.ɵɵtext(33, "Draw Signature");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "button", 20);
            i0.ɵɵlistener("click", function SignaturePad_Template_button_click_34_listener() { return ctx.clearCanvas(); });
            i0.ɵɵelementStart(35, "mat-icon", 21);
            i0.ɵɵtext(36, "clear");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span");
            i0.ɵɵtext(38, "Clear pad");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "div", 22)(40, "canvas", 23, 0);
            i0.ɵɵlistener("mousedown", function SignaturePad_Template_canvas_mousedown_40_listener($event) { return ctx.startDrawing($event); })("mousemove", function SignaturePad_Template_canvas_mousemove_40_listener($event) { return ctx.draw($event); })("mouseup", function SignaturePad_Template_canvas_mouseup_40_listener() { return ctx.stopDrawing(); })("mouseleave", function SignaturePad_Template_canvas_mouseleave_40_listener() { return ctx.stopDrawing(); })("touchstart", function SignaturePad_Template_canvas_touchstart_40_listener($event) { return ctx.startTouchDrawing($event); })("touchmove", function SignaturePad_Template_canvas_touchmove_40_listener($event) { return ctx.touchDraw($event); })("touchend", function SignaturePad_Template_canvas_touchend_40_listener() { return ctx.stopDrawing(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 24)(43, "span", 25);
            i0.ɵɵtext(44, "X Customer Signature Line");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span", 26);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(47, SignaturePad_Conditional_47_Template, 5, 0, "div", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 28)(49, "p", 29);
            i0.ɵɵtext(50, "Verification & Sign-Off Warranty Acknowledgement");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(51, " I hereby certify that the door installation described above has been thoroughly inspected in my presence, operates cleanly without binding or misalignment, and all specified hardware components have been verified complete. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "div", 30)(53, "button", 31);
            i0.ɵɵlistener("click", function SignaturePad_Template_button_click_53_listener() { return ctx.cancelled.emit(); });
            i0.ɵɵtext(54, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "button", 32)(56, "mat-icon", 33);
            i0.ɵɵtext(57, "verified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "span");
            i0.ɵɵtext(59, "Confirm & Sign Off Installation");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("formGroup", ctx.signoffForm);
            i0.ɵɵadvance(10);
            i0.ɵɵrepeater(i0.ɵɵpureFunction0(5, _c1));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.rating(), ".0 / 5.0 ");
            i0.ɵɵadvance(21);
            i0.ɵɵtextInterpolate1("Timestamped: ", ctx.currentDateString);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.hasStrokes() ? 47 : -1);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("disabled", !ctx.hasStrokes() || ctx.signoffForm.invalid);
        } }, dependencies: [MatIconModule, i1.MatIcon, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignaturePad, [{
        type: Component,
        args: [{
                selector: 'app-signature-pad',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [MatIconModule, ReactiveFormsModule],
                template: `
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div>
          <h3 class="text-sm font-semibold text-slate-900">Customer Digital Sign-Off</h3>
          <p class="text-xs text-slate-500 mt-0.5">Please inspect the completed door installation and provide verification signature</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
          <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">verified_user</mat-icon>
          <span class="font-medium">Legally Binding Sign-Off</span>
        </div>
      </div>

      <form [formGroup]="signoffForm" (ngSubmit)="handleConfirm()" class="p-5 space-y-4">
        <!-- Client Name and Feedback -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="sigClientName" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Signee Full Name</label>
            <input 
              id="sigClientName"
              type="text" 
              formControlName="clientName"
              placeholder="e.g. Eleanor Vance" 
              class="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <span class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Workmanship Rating</span>
            <div class="flex items-center gap-1.5 py-1">
              @for (star of [1, 2, 3, 4, 5]; track star) {
                <button 
                  type="button" 
                  (click)="setRating(star)"
                  class="p-1 rounded hover:bg-amber-50 transition-colors focus:outline-none"
                  [attr.aria-label]="'Rate ' + star + ' stars'"
                >
                  <mat-icon 
                    class="!text-xl leading-none transition-transform active:scale-125"
                    [class.text-amber-400]="rating() >= star"
                    [class.text-slate-300]="rating() < star"
                  >
                    star
                  </mat-icon>
                </button>
              }
              <span class="ml-2 text-xs font-semibold text-slate-700 tabular-nums">
                {{ rating() }}.0 / 5.0
              </span>
            </div>
          </div>
        </div>

        <div>
          <label for="sigFeedback" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Feedback / Client Remarks</label>
          <textarea 
            id="sigFeedback"
            formControlName="feedback"
            rows="2"
            placeholder="Verified door balance, latch action, and zero scratch finish..." 
            class="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          ></textarea>
        </div>

        <!-- Canvas Drawing Surface -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-semibold text-slate-700 uppercase tracking-wider">Draw Signature</span>
            <button 
              type="button" 
              (click)="clearCanvas()" 
              class="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <mat-icon class="!text-xs !w-3 !h-3">clear</mat-icon>
              <span>Clear pad</span>
            </button>
          </div>

          <div class="relative border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50 hover:bg-white transition-colors overflow-hidden touch-none">
            <canvas 
              #sigCanvas 
              (mousedown)="startDrawing($event)"
              (mousemove)="draw($event)"
              (mouseup)="stopDrawing()"
              (mouseleave)="stopDrawing()"
              (touchstart)="startTouchDrawing($event)"
              (touchmove)="touchDraw($event)"
              (touchend)="stopDrawing()"
              class="w-full h-40 cursor-crosshair block"
            ></canvas>

            <!-- Guide line -->
            <div class="absolute bottom-6 left-6 right-6 border-b border-slate-300 pointer-events-none flex justify-between items-end pb-1">
              <span class="text-[10px] uppercase font-mono text-slate-400 tracking-wider">X Customer Signature Line</span>
              <span class="text-[10px] text-slate-400 font-mono tabular-nums">Timestamped: {{ currentDateString }}</span>
            </div>

            @if (!hasStrokes()) {
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs">
                <mat-icon class="mr-1.5 !text-sm">edit</mat-icon>
                <span>Sign here with finger, stylus, or mouse</span>
              </div>
            }
          </div>
        </div>

        <div class="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
          <p class="font-medium text-slate-800 mb-0.5">Verification & Sign-Off Warranty Acknowledgement</p>
          I hereby certify that the door installation described above has been thoroughly inspected in my presence, operates cleanly without binding or misalignment, and all specified hardware components have been verified complete.
        </div>

        <!-- Action buttons -->
        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button 
            type="button" 
            (click)="cancelled.emit()"
            class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            [disabled]="!hasStrokes() || signoffForm.invalid"
            class="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <mat-icon class="!text-sm !w-4 !h-4">verified</mat-icon>
            <span>Confirm & Sign Off Installation</span>
          </button>
        </div>
      </form>
    </div>
  `
            }]
    }], null, { initialClientName: [{ type: i0.Input, args: [{ isSignal: true, alias: "initialClientName", required: false }] }], initialRating: [{ type: i0.Input, args: [{ isSignal: true, alias: "initialRating", required: false }] }], signoffCompleted: [{ type: i0.Output, args: ["signoffCompleted"] }], cancelled: [{ type: i0.Output, args: ["cancelled"] }], canvasRef: [{
            type: ViewChild,
            args: ['sigCanvas']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignaturePad, { className: "SignaturePad", filePath: "frontend/src/app/components/signature-pad/signature-pad.ts", lineNumber: 152 }); })();
