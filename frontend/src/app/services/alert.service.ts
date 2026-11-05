import { Injectable, inject } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { ThemeStore } from './theme';

export type SubIconType = 
  | 'check' 
  | 'save' 
  | 'database' 
  | 'validation' 
  | 'network' 
  | 'forbidden' 
  | 'notfound' 
  | 'conflict' 
  | 'delete' 
  | 'info' 
  | 'generic';

/**
 * Crisp inline SVG sub-icons rendered directly below the alert title
 */
const SUB_ICONS: Record<SubIconType, string> = {
  check: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  save: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
  database: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  validation: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  network: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
  forbidden: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  notfound: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="12"></line><line x1="11" y1="14" x2="11.01" y2="14"></line></svg>`,
  conflict: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  delete: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  info: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  generic: `<svg class="dm-sub-icon text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
};

export interface CategorizedError {
  title: string;
  subText: string;
  subIcon: SubIconType;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly themeStore = inject(ThemeStore);

  constructor() {
    this.initNetworkListeners();
  }

  /**
   * Determine background and text color based on active dark/light mode
   */
  private getColors() {
    const isDark = this.themeStore.isDark();
    return {
      background: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#f8fafc' : '#0f172a',
      confirmButtonColor: '#059669', // Emerald 600
      cancelButtonColor: '#64748b',  // Slate 500
      denyButtonColor: '#dc2626'     // Red 600
    };
  }

  /**
   * Setup automated online/offline window listeners
   */
  private initNetworkListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('offline', () => {
      this.toastWarning(
        'Internet Connection Lost',
        'You are currently offline. Field actions will queue and retry when reconnected.'
      );
    });

    window.addEventListener('online', () => {
      this.toastSuccess(
        'Internet Connection Restored',
        'Back online! Data sync and live GPS telemetry re-established.'
      );
    });
  }

  /**
   * Intelligently classify errors into distinct titles and sub-icons
   */
  public classifyError(rawTitle: string, rawText?: string): CategorizedError {
    const combined = `${rawTitle || ''} ${rawText || ''}`.toLowerCase();

    // 1. Unauthorized / Forbidden / Authentication / Clearance
    if (
      combined.includes('unauthorized') ||
      combined.includes('forbidden') ||
      combined.includes('access denied') ||
      combined.includes('permission') ||
      combined.includes('sign in') ||
      combined.includes('login') ||
      combined.includes('credentials') ||
      combined.includes('password')
    ) {
      return {
        title: 'Access Denied',
        subText: rawText || rawTitle || 'Invalid credentials or insufficient permissions.',
        subIcon: 'forbidden'
      };
    }

    // 2. Validation / Incomplete inputs
    if (
      combined.includes('incomplete') ||
      combined.includes('validation') ||
      combined.includes('required') ||
      combined.includes('invalid') ||
      combined.includes('missing') ||
      combined.includes('please fill') ||
      combined.includes('select at least') ||
      combined.includes('agreement')
    ) {
      return {
        title: 'Validation Error',
        subText: rawText || rawTitle || 'Please complete all required fields.',
        subIcon: 'validation'
      };
    }

    // 3. Network / Offline / Server connection
    if (
      combined.includes('network') ||
      combined.includes('offline') ||
      combined.includes('connection') ||
      combined.includes('failed to fetch') ||
      combined.includes('reach server') ||
      combined.includes('server unreachable') ||
      combined.includes('timeout')
    ) {
      return {
        title: 'Network Failure',
        subText: rawText || 'Could not communicate with the database or server.',
        subIcon: 'network'
      };
    }

    // 4. Database / SQL / Prisma / Storage
    if (
      combined.includes('database') ||
      combined.includes('prisma') ||
      combined.includes('mysql') ||
      combined.includes('sql') ||
      combined.includes('storage') ||
      combined.includes('could not save') ||
      combined.includes('save failed')
    ) {
      return {
        title: 'Save Failed',
        subText: rawText || 'Could not commit transaction to database.',
        subIcon: 'database'
      };
    }

    // 5. Conflict / Duplicate
    if (
      combined.includes('already exists') ||
      combined.includes('conflict') ||
      combined.includes('duplicate') ||
      combined.includes('already taken')
    ) {
      return {
        title: 'Duplicate Conflict',
        subText: rawText || rawTitle || 'A record with these details already exists.',
        subIcon: 'conflict'
      };
    }

    // 6. Record Not Found
    if (
      combined.includes('not found') ||
      combined.includes('404') ||
      combined.includes('missing record') ||
      combined.includes('unavailable')
    ) {
      return {
        title: 'Record Not Found',
        subText: rawText || rawTitle || 'Requested record could not be found.',
        subIcon: 'notfound'
      };
    }

    // 7. Deletion Failed
    if (
      combined.includes('delete') ||
      combined.includes('removal') ||
      combined.includes('remove')
    ) {
      return {
        title: 'Deletion Failed',
        subText: rawText || rawTitle || 'Could not remove entity. Linked records exist.',
        subIcon: 'delete'
      };
    }

    // 8. General / Fallback
    return {
      title: rawTitle && rawTitle !== 'Error' && rawTitle !== 'Failed' ? rawTitle : 'Operation Failed',
      subText: rawText || 'An unexpected error occurred during this operation.',
      subIcon: 'generic'
    };
  }

  /**
   * Helper to format the message and sub-icon below the title
   */
  private formatSubHtml(text: string, subIcon: SubIconType): string {
    const iconSvg = SUB_ICONS[subIcon] || SUB_ICONS.check;
    const safeText = this.escapeHtml(text);
    return `<div class="dm-toast-sub"><span class="dm-sub-icon-wrap">${iconSvg}</span><span class="dm-sub-text">${safeText}</span></div>`;
  }

  private escapeHtml(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Core compact SweetAlert2 toast launcher
   * Follows exact specification:
   * - position: "top-end"
   * - showConfirmButton: false
   * - timer: 1500
   * - size and font reduced by half
   * - message below with sub-icon
   */
  private fireCompactToast(
    icon: SweetAlertIcon,
    title: string,
    text: string = '',
    subIcon: SubIconType = 'check',
    timer: number = 1500
  ): Promise<SweetAlertResult> {
    const subHtml = this.formatSubHtml(text || 'Changes saved to system.', subIcon);

    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      iconColor: 'white',
      title,
      html: subHtml,
      showConfirmButton: false,
      timer: timer > 0 ? timer : 1500,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast font-sans',
        title: 'colored-toast-title',
        htmlContainer: 'colored-toast-html',
        timerProgressBar: 'colored-toast-progress'
      },
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  /**
   * Standard CRUD Success (Default: "Your work has been saved", 1500ms, top-end)
   */
  crudSuccess(
    title: string = 'Your work has been saved',
    text: string = 'Changes saved to system.',
    subIcon: SubIconType = 'save'
  ): Promise<SweetAlertResult> {
    return this.fireCompactToast('success', title, text, subIcon, 1500);
  }

  /**
   * Standard CRUD Error with intelligent title categorizing and sub-icon
   */
  crudError(
    titleOrType: string,
    text: string = '',
    subIconOverride?: SubIconType
  ): Promise<SweetAlertResult> {
    const categorized = this.classifyError(titleOrType, text);
    return this.fireCompactToast(
      'error',
      categorized.title,
      categorized.subText,
      subIconOverride || categorized.subIcon,
      1800
    );
  }

  /**
   * Success notification - top-end compact half-sized toast with 1500ms timer
   */
  success(title: string = 'Your work has been saved', text: string = '', timer: number = 1500): Promise<SweetAlertResult> {
    let subIcon: SubIconType = 'check';
    const lower = `${title} ${text}`.toLowerCase();
    if (lower.includes('save') || lower.includes('work has been saved')) subIcon = 'save';
    else if (lower.includes('add') || lower.includes('create') || lower.includes('register') || lower.includes('book')) subIcon = 'database';
    else if (lower.includes('delete') || lower.includes('remove')) subIcon = 'delete';

    return this.fireCompactToast('success', title, text || 'Operation completed successfully.', subIcon, timer);
  }

  /**
   * Error notification with categorized title and sub-icon below
   */
  error(title: string, text: string = ''): Promise<SweetAlertResult> {
    const categorized = this.classifyError(title, text);
    return this.fireCompactToast('error', categorized.title, categorized.subText, categorized.subIcon, 1800);
  }

  /**
   * Warning notification with validation/warning sub-icon below
   */
  warning(title: string, text: string = ''): Promise<SweetAlertResult> {
    const categorized = this.classifyError(title, text);
    return this.fireCompactToast('warning', title, text || categorized.subText, 'validation', 1600);
  }

  /**
   * Info notification with info sub-icon below
   */
  info(title: string, text: string = ''): Promise<SweetAlertResult> {
    return this.fireCompactToast('info', title, text || 'Information update.', 'info', 1500);
  }

  /**
   * Dedicated Network Error notification
   */
  networkError(
    title: string = 'Network Failure',
    text: string = 'Could not reach server. Data saved to local cache.'
  ): Promise<SweetAlertResult> {
    return this.fireCompactToast('warning', title, text, 'network', 1800);
  }

  /**
   * Fast Non-Blocking Toast: Success (1500ms, top-end)
   */
  toastSuccess(title: string = 'Your work has been saved', text?: string) {
    let subIcon: SubIconType = 'check';
    const lower = `${title} ${text || ''}`.toLowerCase();
    if (lower.includes('save') || lower.includes('work has been saved')) subIcon = 'save';
    else if (lower.includes('add') || lower.includes('create') || lower.includes('register') || lower.includes('book')) subIcon = 'database';
    else if (lower.includes('delete') || lower.includes('remove')) subIcon = 'delete';

    this.fireCompactToast('success', title, text || 'Changes saved to system.', subIcon, 1500);
  }

  /**
   * Fast Non-Blocking Toast: Error with categorized title
   */
  toastError(title: string, text?: string) {
    const categorized = this.classifyError(title, text);
    this.fireCompactToast('error', categorized.title, categorized.subText, categorized.subIcon, 1800);
  }

  /**
   * Fast Non-Blocking Toast: Warning
   */
  toastWarning(title: string, text?: string) {
    const categorized = this.classifyError(title, text);
    this.fireCompactToast('warning', title, text || categorized.subText, 'validation', 1600);
  }

  /**
   * Fast Non-Blocking Toast: Info
   */
  toastInfo(title: string, text?: string) {
    return this.fireCompactToast('info', title, text || 'System update.', 'info', 1500);
  }

  /**
   * Interactive Confirmation Dialog (Returns true if confirmed)
   */
  async confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes, Proceed',
    cancelButtonText: string = 'Cancel',
    isDanger: boolean = false
  ): Promise<boolean> {
    const colors = this.getColors();
    const result = await Swal.fire({
      title,
      text,
      icon: isDanger ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: isDanger ? colors.denyButtonColor : colors.confirmButtonColor,
      cancelButtonColor: colors.cancelButtonColor,
      background: colors.background,
      color: colors.color,
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl font-sans !p-5',
        title: 'text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white',
        htmlContainer: 'text-xs text-slate-600 dark:text-slate-400 mt-2',
        confirmButton: 'px-4 py-2 rounded-lg font-bold text-xs shadow-md cursor-pointer',
        cancelButton: 'px-4 py-2 rounded-lg font-bold text-xs cursor-pointer'
      }
    });

    return result.isConfirmed;
  }
}
