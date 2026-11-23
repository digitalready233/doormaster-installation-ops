import { 
  ChangeDetectionStrategy, 
  Component, 
  computed,
  input, 
  output, 
  signal 
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InstallationPhoto } from '../../models/installation.model';

@Component({
  selector: 'app-photo-uploader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <div>
          <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Installation Photographic Proof</h4>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            Installers are required to take and upload <strong class="text-slate-700 dark:text-slate-200">Before</strong> photos on commencement of work and <strong class="text-slate-700 dark:text-slate-200">After</strong> photos when work is done.
          </p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold border"
            [class]="beforePhotos().length > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'">
            Before: {{ beforePhotos().length }} {{ beforePhotos().length > 0 ? '✓' : '(Required)' }}
          </span>
          <span class="px-2 py-0.5 rounded text-[9px] font-bold border"
            [class]="afterPhotos().length > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'">
            After: {{ afterPhotos().length }} {{ afterPhotos().length > 0 ? '✓' : '(Required)' }}
          </span>
        </div>
      </div>

      <!-- Divided into two sections: Before (Commencement) & After (Completion) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- 1. BEFORE WORK (COMMENCEMENT) -->
        <div class="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <div>
              <span class="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <mat-icon class="!text-xs text-amber-600">play_circle</mat-icon>
                <span>1. Before Work (Commencement)</span>
              </span>
              <p class="text-[10px] text-slate-500 dark:text-slate-400">Required when starting work on site</p>
            </div>
            <button
              type="button"
              (click)="openUploadForStage('before')"
              class="px-2.5 py-1 text-[10px] font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">add_a_photo</mat-icon>
              <span>Upload Before</span>
            </button>
          </div>

          @if (beforePhotos().length === 0) {
            <div class="border border-dashed border-amber-300 dark:border-amber-800/70 rounded-lg p-5 text-center bg-amber-50/40 dark:bg-amber-950/20">
              <mat-icon class="!text-xl text-amber-500 mb-1">photo_camera</mat-icon>
              <p class="text-[11px] font-semibold text-amber-900 dark:text-amber-200">No "Before" photo uploaded</p>
              <p class="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5">Take a photo of the door opening before starting</p>
            </div>
          } @else {
            <div class="grid grid-cols-2 gap-2">
              @for (photo of beforePhotos(); track photo.id) {
                <button
                  type="button"
                  class="group relative bg-slate-100 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-4/3 cursor-pointer shadow-xs text-left p-0 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  (click)="previewPhoto.set(photo)"
                >
                  <img [src]="photo.url" [alt]="photo.caption" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" referrerpolicy="no-referrer" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
                  <span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-600/90 text-white">Before</span>
                  <div class="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                    <p class="text-[10px] font-medium truncate">{{ photo.caption }}</p>
                    <p class="text-[9px] text-slate-300 font-mono truncate">{{ formatTime(photo.timestamp) }}</p>
                  </div>
                </button>
              }
            </div>
          }
        </div>

        <!-- 2. AFTER WORK DONE (COMPLETION) -->
        <div class="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <div>
              <span class="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <mat-icon class="!text-xs text-emerald-600">check_circle</mat-icon>
                <span>2. After Work Done (Completion)</span>
              </span>
              <p class="text-[10px] text-slate-500 dark:text-slate-400">Required upon completing installation</p>
            </div>
            <button
              type="button"
              (click)="openUploadForStage('after')"
              class="px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">add_a_photo</mat-icon>
              <span>Upload After</span>
            </button>
          </div>

          @if (afterPhotos().length === 0) {
            <div class="border border-dashed border-emerald-300 dark:border-emerald-800/70 rounded-lg p-5 text-center bg-emerald-50/40 dark:bg-emerald-950/20">
              <mat-icon class="!text-xl text-emerald-500 mb-1">verified</mat-icon>
              <p class="text-[11px] font-semibold text-emerald-900 dark:text-emerald-200">No "After" photo uploaded</p>
              <p class="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">Take a photo of the completed door & lock</p>
            </div>
          } @else {
            <div class="grid grid-cols-2 gap-2">
              @for (photo of afterPhotos(); track photo.id) {
                <button
                  type="button"
                  class="group relative bg-slate-100 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-4/3 cursor-pointer shadow-xs text-left p-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  (click)="previewPhoto.set(photo)"
                >
                  <img [src]="photo.url" [alt]="photo.caption" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" referrerpolicy="no-referrer" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
                  <span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-600/90 text-white">{{ photo.stage === 'in_progress' ? 'In Progress' : 'After' }}</span>
                  <div class="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                    <p class="text-[10px] font-medium truncate">{{ photo.caption }}</p>
                    <p class="text-[9px] text-slate-300 font-mono truncate">{{ formatTime(photo.timestamp) }}</p>
                  </div>
                </button>
              }
            </div>
          }
        </div>
      </div>

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
})
export class PhotoUploader {
  photos = input<InstallationPhoto[]>([]);
  photoUploaded = output<{
    stage: 'before' | 'in_progress' | 'after';
    url: string;
    caption: string;
  }>();

  readonly showUploadModal = signal(false);
  readonly selectedStage = signal<'before' | 'in_progress' | 'after'>('after');
  readonly selectedImagePreview = signal<string>('');
  readonly previewPhoto = signal<InstallationPhoto | null>(null);

  readonly beforePhotos = computed(() => this.photos().filter(p => p.stage === 'before'));
  readonly afterPhotos = computed(() => this.photos().filter(p => p.stage === 'after' || p.stage === 'in_progress'));

  openUploadForStage(stage: 'before' | 'after') {
    this.selectedStage.set(stage);
    this.showUploadModal.set(true);
  }

  readonly uploadForm = new FormGroup({
    caption: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  // Built-in authentic high-res samples for rapid inspection
  readonly samplePresets = [
    {
      label: 'Completed Walnut Pivot',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      caption: 'AeroPivot 900 Smoked Walnut installed with flush drop-seal margin',
      stage: 'after' as const
    },
    {
      label: 'Hinges Alignment',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      caption: '3D concealed hinge adjustment check with laser plumb',
      stage: 'in_progress' as const
    },
    {
      label: 'Double Oak Entrance',
      url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
      caption: 'Heritage Royal Double oak entrance doors with brass mortise lock',
      stage: 'after' as const
    }
  ];

  selectPreset(preset: typeof this.samplePresets[0]) {
    this.selectedImagePreview.set(preset.url);
    this.selectedStage.set(preset.stage);
    this.uploadForm.patchValue({ caption: preset.caption });
  }

  onFileSelected(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.files && inputEl.files[0]) {
      const file = inputEl.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
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
    if (!this.selectedImagePreview() || this.uploadForm.invalid) return;

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

  formatTime(isoString: string): string {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  }
}
