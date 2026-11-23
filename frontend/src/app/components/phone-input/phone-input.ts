import { 
  ChangeDetectionStrategy, 
  Component, 
  forwardRef, 
  input, 
  signal, 
  computed 
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  placeholder: string;
}

export const COUNTRY_OPTIONS: CountryOption[] = [
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', placeholder: '24 123 4567' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', placeholder: '802 123 4567' },
  { code: 'CI', name: "Côte d'Ivoire", dialCode: '+225', flag: '🇨🇮', placeholder: '07 12 34 56' },
  { code: 'TG', name: 'Togo', dialCode: '+228', flag: '🇹🇬', placeholder: '90 12 34 56' },
  { code: 'BJ', name: 'Benin', dialCode: '+229', flag: '🇧🇯', placeholder: '90 12 34 56' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫', placeholder: '70 12 34 56' },
  { code: 'LR', name: 'Liberia', dialCode: '+231', flag: '🇱🇷', placeholder: '77 123 4567' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱', placeholder: '76 123 456' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', placeholder: '712 345 678' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', placeholder: '82 123 4567' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', placeholder: '100 123 4567' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', placeholder: '(555) 123-4567' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', placeholder: '(555) 123-4567' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', placeholder: '138 0000 0000' },
  { code: 'AE', name: 'UAE', dialCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', placeholder: '151 1234567' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', placeholder: '532 123 4567' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', placeholder: '98765 43210' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', placeholder: '90 1234 5678' },
];

@Component({
  selector: 'app-phone-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ],
  template: `
    <div 
      class="flex items-stretch rounded-xl border transition-all shadow-2xs overflow-hidden w-full"
      [class]="containerClass()"
    >
      <!-- Country List Select (compact flag + dial code display, full country list in dropdown) -->
      <div
        class="relative shrink-0 w-[84px] flex items-center justify-between pl-2 pr-1 py-2 bg-slate-50 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
        [class.opacity-50]="disabled()"
      >
        <span class="text-xs font-bold font-mono text-slate-800 dark:text-slate-100 truncate select-none pointer-events-none">
          {{ activeCountry().flag }} {{ activeCountry().dialCode }}
        </span>
        <mat-icon class="pointer-events-none text-slate-400 !text-sm !w-4 !h-4 shrink-0">
          arrow_drop_down
        </mat-icon>
        <select
          [disabled]="disabled()"
          [value]="selectedDialCode()"
          (change)="onCountryChange($event)"
          aria-label="Country Dial Code"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        >
          @for (c of countries; track c.code) {
            <option 
              [value]="c.dialCode" 
              class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1"
            >
              {{ c.flag }} {{ c.name }} ({{ c.dialCode }})
            </option>
          }
        </select>
      </div>

      <!-- Phone Number Input -->
      <div class="relative flex-1 flex items-center">
        <input
          [id]="id() || null"
          type="tel"
          inputmode="numeric"
          maxlength="9"
          [disabled]="disabled()"
          [value]="nationalNumber()"
          (input)="onNumberInput($event)"
          (blur)="onBlur()"
          [placeholder]="placeholder() || activeCountry().placeholder || '24 123 4567'"
          class="w-full flex-1 px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden font-mono disabled:opacity-50 disabled:cursor-not-allowed"
        />
        @if (nationalNumber()) {
          <span class="text-[10px] font-mono px-1 text-slate-400 dark:text-slate-500 select-none shrink-0">
            {{ nationalNumber().length }}/9
          </span>
        }
        @if (nationalNumber() && !disabled()) {
          <button
            type="button"
            (click)="clearNumber()"
            aria-label="Clear phone number"
            class="pr-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
          >
            <mat-icon class="!text-sm !w-4 !h-4">close</mat-icon>
          </button>
        }
      </div>
    </div>
  `
})
export class PhoneInputComponent implements ControlValueAccessor {
  readonly id = input<string>('');
  readonly placeholder = input<string>('');
  readonly size = input<'sm' | 'md'>('md');
  readonly customBorderClass = input<string>('');

  readonly countries = COUNTRY_OPTIONS;
  readonly selectedDialCode = signal<string>('+233');
  readonly nationalNumber = signal<string>('');
  readonly disabled = signal<boolean>(false);

  readonly activeCountry = computed(() => {
    return this.countries.find(c => c.dialCode === this.selectedDialCode()) || this.countries[0];
  });

  readonly containerClass = computed(() => {
    const custom = this.customBorderClass();
    const base = custom ? custom : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800';
    const focus = 'focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-500 dark:focus-within:border-emerald-400';
    return `${base} ${focus}`;
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null | undefined): void {
    if (!value) {
      this.selectedDialCode.set('+233');
      this.nationalNumber.set('');
      return;
    }

    const trimmed = String(value).trim();
    if (!trimmed) {
      this.selectedDialCode.set('+233');
      this.nationalNumber.set('');
      return;
    }

    // Try to match an international dial code prefix (longest match first)
    const sorted = [...this.countries].sort((a, b) => b.dialCode.length - a.dialCode.length);
    let matchedCountry = sorted.find(c => trimmed.startsWith(c.dialCode));

    if (matchedCountry) {
      this.selectedDialCode.set(matchedCountry.dialCode);
      const rest = trimmed.slice(matchedCountry.dialCode.length).trim();
      let digits = rest.replace(/\D/g, '');
      if (digits.startsWith('0')) digits = digits.slice(1);
      this.nationalNumber.set(digits.slice(0, 9));
    } else if (trimmed.startsWith('+')) {
      // Unrecognized plus code, keep default Ghana or first
      this.selectedDialCode.set('+233');
      const rest = trimmed.replace(/^\+233\s*/, '');
      let digits = rest.replace(/\D/g, '');
      if (digits.startsWith('0')) digits = digits.slice(1);
      this.nationalNumber.set(digits.slice(0, 9));
    } else {
      // Local phone number (e.g. 0243112825 or 243112825), default to Ghana (+233)
      this.selectedDialCode.set('+233');
      let digits = trimmed.replace(/\D/g, '');
      if (digits.startsWith('0')) digits = digits.slice(1);
      this.nationalNumber.set(digits.slice(0, 9));
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onCountryChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedDialCode.set(val);
    this.emitValue();
  }

  onNumberInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    let raw = inputEl.value;

    // If user pasted a full international number starting with +
    if (raw.trim().startsWith('+')) {
      const sorted = [...this.countries].sort((a, b) => b.dialCode.length - a.dialCode.length);
      const matched = sorted.find(c => raw.trim().startsWith(c.dialCode));
      if (matched) {
        this.selectedDialCode.set(matched.dialCode);
        raw = raw.trim().slice(matched.dialCode.length).trim();
      }
    }

    // Filter to digits only
    let digits = raw.replace(/\D/g, '');

    // Strip leading 0 if present (e.g., local 024... -> 24...)
    if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    // Strictly limit to 9 digits only
    if (digits.length > 9) {
      digits = digits.slice(0, 9);
    }

    // Keep DOM input value in sync
    inputEl.value = digits;
    this.nationalNumber.set(digits);
    this.emitValue();
  }

  clearNumber(): void {
    this.nationalNumber.set('');
    this.emitValue();
  }

  onBlur(): void {
    this.onTouched();
  }

  private emitValue(): void {
    const num = this.nationalNumber().trim();
    if (!num) {
      this.onChange('');
      return;
    }

    let digits = num.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    digits = digits.slice(0, 9);

    const fullValue = `${this.selectedDialCode()} ${digits}`.trim();
    this.onChange(fullValue);
  }
}
