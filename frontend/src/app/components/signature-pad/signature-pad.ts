import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  ViewChild, 
  input, 
  output, 
  signal 
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signature-pad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
        <div>
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Customer Digital Sign-Off</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Please inspect the completed door installation and provide verification signature</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-500/30">
          <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none">verified_user</mat-icon>
          <span class="font-medium">Legally Binding Sign-Off</span>
        </div>
      </div>

      <form [formGroup]="signoffForm" (ngSubmit)="handleConfirm()" class="p-5 space-y-4">
        <!-- Client Name and Feedback -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="sigClientName" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Signee Full Name</label>
            <input 
              id="sigClientName"
              type="text" 
              formControlName="clientName"
              placeholder="e.g. Eleanor Vance" 
              class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <span class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Workmanship Rating</span>
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
              <span class="ml-2 text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                {{ rating() }}.0 / 5.0
              </span>
            </div>
          </div>
        </div>

        <div>
          <label for="sigFeedback" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Feedback / Client Remarks</label>
          <textarea 
            id="sigFeedback"
            formControlName="feedback"
            rows="2"
            placeholder="Verified door balance, latch action, and zero scratch finish..." 
            class="w-full text-sm px-3.5 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
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

          <div class="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 transition-colors overflow-hidden touch-none">
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
            <div class="absolute bottom-6 left-6 right-6 border-b border-slate-300 dark:border-slate-700 pointer-events-none flex justify-between items-end pb-1">
              <span class="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 tracking-wider">X Customer Signature Line</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono tabular-nums">Timestamped: {{ currentDateString }}</span>
            </div>

            @if (!hasStrokes()) {
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 dark:text-slate-500 text-xs">
                <mat-icon class="mr-1.5 !text-sm">edit</mat-icon>
                <span>Sign here with finger, stylus, or mouse</span>
              </div>
            }
          </div>
        </div>

        <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
          <p class="font-medium text-slate-800 dark:text-white mb-0.5">Verification & Sign-Off Warranty Acknowledgement</p>
          I hereby certify that the door installation described above has been thoroughly inspected in my presence, operates cleanly without binding or misalignment, and all specified hardware components have been verified complete.
        </div>

        <!-- Action buttons -->
        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button 
            type="button" 
            (click)="cancelled.emit()"
            class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
})
export class SignaturePad implements AfterViewInit {
  initialClientName = input<string>('');
  initialRating = input<number>(5);

  signoffCompleted = output<{
    clientName: string;
    signatureDataUrl: string;
    rating: number;
    feedback: string;
    signedAt: string;
  }>();

  cancelled = output<void>();

  @ViewChild('sigCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly hasStrokes = signal(false);
  readonly rating = signal(5);
  readonly currentDateString = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  private isDrawing = false;
  private ctx: CanvasRenderingContext2D | null = null;
  private lastX = 0;
  private lastY = 0;

  readonly signoffForm = new FormGroup({
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

  private setupCanvas() {
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

  setRating(stars: number) {
    this.rating.set(stars);
  }

  clearCanvas() {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.hasStrokes.set(false);
  }

  startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }

  draw(e: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
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

  startTouchDrawing(e: TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 0) return;
    this.isDrawing = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.lastX = e.touches[0].clientX - rect.left;
    this.lastY = e.touches[0].clientY - rect.top;
  }

  touchDraw(e: TouchEvent) {
    e.preventDefault();
    if (!this.isDrawing || !this.ctx || e.touches.length === 0) return;
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
    if (!this.hasStrokes() || this.signoffForm.invalid) return;

    const dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
    this.signoffCompleted.emit({
      clientName: this.signoffForm.value.clientName || 'Customer',
      signatureDataUrl: dataUrl,
      rating: this.rating(),
      feedback: this.signoffForm.value.feedback || 'Work completed to satisfaction.',
      signedAt: new Date().toISOString()
    });
  }
}
