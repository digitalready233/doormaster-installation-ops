import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rejection-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-red-50/50 dark:bg-red-950/30">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm">cancel</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Reject Assignment</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ jobId() }} · {{ roleTitle() }}</p>
            </div>
          </div>
          <button 
            type="button" 
            (click)="canceled.emit()"
            class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <mat-icon class="!text-base">close</mat-icon>
          </button>
        </div>

        <!-- Form Body -->
        <form [formGroup]="rejectForm" (ngSubmit)="submitRejection()" class="p-5 space-y-4 text-xs">
          <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-300 space-y-1">
            <span class="font-bold flex items-center gap-1 text-[11px]">
              <mat-icon class="!text-xs">info</mat-icon>
              <span>Operations Manager Alert</span>
            </span>
            <p class="text-[11px] text-red-700 dark:text-red-400">
              Rejecting this assignment will notify the Operations Manager immediately with your reason and return the job to the queue for instant re-assignment.
            </p>
          </div>

          <div>
            <label for="rejectReasonSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Reason *</label>
            <select 
              id="rejectReasonSelect"
              formControlName="reason"
              class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-1 focus:ring-red-500"
            >
              @if (isDriver()) {
                <option value="Vehicle mechanical inspection / flatbed maintenance required">Vehicle mechanical inspection / maintenance</option>
                <option value="Currently on another long-haul site run">Currently on another site delivery run</option>
                <option value="Door weight/dimensions exceed current truck payload">Door dimensions exceed current truck payload</option>
                <option value="Severe road access / bridge limitation to site address">Severe road access limitation to site</option>
              } @else {
                <option value="Scheduled on another simultaneous door installation">Scheduled on another door installation</option>
                <option value="Missing specialized biometric/smart lock mortising jig">Missing smart lock mortising jig for this lock</option>
                <option value="Off-duty / Emergency personal leave">Off-duty / Personal leave</option>
                <option value="Transit distance exceeds current daily radius">Transit distance exceeds current daily radius</option>
              }
            </select>
          </div>

          <div>
            <label for="rejectDetailsInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Additional Details / Explanation</label>
            <textarea 
              id="rejectDetailsInput"
              formControlName="details"
              rows="2"
              class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Provide context for Operations Manager..."
            ></textarea>
          </div>

          <div>
            <label for="proposedSlotInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Propose Alternate Time Slot (Optional)</label>
            <input 
              id="proposedSlotInput"
              type="text" 
              formControlName="proposedSlot"
              class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. Tomorrow morning at 10:00 AM"
            />
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              (click)="canceled.emit()"
              class="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1 active:scale-95"
            >
              <mat-icon class="!text-xs">send</mat-icon>
              <span>Submit Rejection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RejectionModal {
  readonly jobId = input.required<string>();
  readonly roleTitle = input<string>('Team Member');
  readonly isDriver = input<boolean>(false);

  readonly rejected = output<{ reason: string; details: string; proposedSlot: string }>();
  readonly canceled = output<void>();

  readonly rejectForm = new FormGroup({
    reason: new FormControl<string>('Scheduled on another simultaneous door installation', { nonNullable: true, validators: [Validators.required] }),
    details: new FormControl<string>('', { nonNullable: true }),
    proposedSlot: new FormControl<string>('Tomorrow morning at 10:00 AM', { nonNullable: true })
  });

  submitRejection() {
    if (!this.rejectForm.valid) return;
    this.rejected.emit(this.rejectForm.getRawValue());
  }
}
