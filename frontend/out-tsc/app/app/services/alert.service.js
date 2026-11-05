import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ThemeStore } from './theme';
import * as i0 from "@angular/core";
export class AlertService {
    themeStore = inject(ThemeStore);
    constructor() {
        this.initNetworkListeners();
    }
    /**
     * Determine background and text color based on active dark/light mode
     */
    getColors() {
        const isDark = this.themeStore.isDark();
        return {
            background: isDark ? '#0f172a' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            confirmButtonColor: '#059669', // Emerald 600
            cancelButtonColor: '#64748b', // Slate 500
            denyButtonColor: '#dc2626' // Red 600
        };
    }
    /**
     * Setup automated online/offline window listeners
     */
    initNetworkListeners() {
        if (typeof window === 'undefined')
            return;
        window.addEventListener('offline', () => {
            this.toastWarning('Internet Connection Lost', 'You are currently offline. Field actions will queue and retry when reconnected.');
        });
        window.addEventListener('online', () => {
            this.toastSuccess('Internet Connection Restored', 'Back online! Data sync and live GPS telemetry re-established.');
        });
    }
    /**
     * Prominent Success Modal Dialog
     */
    success(title, text = '', timer = 3200) {
        const colors = this.getColors();
        return Swal.fire({
            icon: 'success',
            title,
            text,
            timer: timer > 0 ? timer : undefined,
            timerProgressBar: timer > 0,
            showConfirmButton: timer <= 0,
            confirmButtonText: 'Done',
            confirmButtonColor: colors.confirmButtonColor,
            background: colors.background,
            color: colors.color,
            customClass: {
                popup: 'rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl font-sans',
                title: 'text-lg font-black tracking-tight text-slate-900 dark:text-white',
                htmlContainer: 'text-xs text-slate-600 dark:text-slate-400 mt-2',
                confirmButton: 'px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer'
            }
        });
    }
    /**
     * Prominent Error Modal Dialog
     */
    error(title, text = '') {
        const colors = this.getColors();
        return Swal.fire({
            icon: 'error',
            title,
            text,
            confirmButtonText: 'Understood',
            confirmButtonColor: colors.denyButtonColor,
            background: colors.background,
            color: colors.color,
            customClass: {
                popup: 'rounded-3xl border border-red-200 dark:border-red-950/80 shadow-2xl font-sans',
                title: 'text-lg font-black tracking-tight text-red-600 dark:text-red-400',
                htmlContainer: 'text-xs text-slate-600 dark:text-slate-400 mt-2',
                confirmButton: 'px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer bg-red-600 text-white'
            }
        });
    }
    /**
     * Dedicated Network / Internet Offline Error Modal
     */
    networkError(title = 'Connection / Network Error', text = 'Could not communicate with the database or server. Please verify your internet connection and server status.') {
        const colors = this.getColors();
        return Swal.fire({
            icon: 'warning',
            title,
            text,
            showCancelButton: true,
            confirmButtonText: 'Retry Connection',
            cancelButtonText: 'Dismiss',
            confirmButtonColor: colors.confirmButtonColor,
            cancelButtonColor: colors.cancelButtonColor,
            background: colors.background,
            color: colors.color,
            customClass: {
                popup: 'rounded-3xl border border-amber-300 dark:border-amber-800 shadow-2xl font-sans',
                title: 'text-lg font-black tracking-tight text-amber-600 dark:text-amber-400',
                htmlContainer: 'text-xs text-slate-600 dark:text-slate-400 mt-2',
                confirmButton: 'px-5 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer',
                cancelButton: 'px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer'
            }
        });
    }
    /**
     * Prominent Warning Dialog
     */
    warning(title, text = '') {
        const colors = this.getColors();
        return Swal.fire({
            icon: 'warning',
            title,
            text,
            confirmButtonText: 'Okay',
            confirmButtonColor: '#d97706',
            background: colors.background,
            color: colors.color,
            customClass: {
                popup: 'rounded-3xl border border-amber-200 dark:border-amber-900 shadow-2xl font-sans',
                title: 'text-lg font-black tracking-tight text-amber-600 dark:text-amber-400',
                htmlContainer: 'text-xs text-slate-600 dark:text-slate-400 mt-2',
                confirmButton: 'px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer'
            }
        });
    }
    /**
     * Interactive Confirmation Dialog (Returns true if confirmed)
     */
    async confirm(title, text, confirmButtonText = 'Yes, Proceed', cancelButtonText = 'Cancel', isDanger = false) {
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
                popup: 'rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl font-sans',
                title: 'text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white',
                htmlContainer: 'text-xs text-slate-600 dark:text-slate-400 mt-2',
                confirmButton: 'px-5 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer',
                cancelButton: 'px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer'
            }
        });
        return result.isConfirmed;
    }
    /**
     * Fast Non-Blocking Toast: Success
     */
    toastSuccess(title, text) {
        this.fireToast('success', title, text);
    }
    /**
     * Fast Non-Blocking Toast: Error
     */
    toastError(title, text) {
        this.fireToast('error', title, text);
    }
    /**
     * Fast Non-Blocking Toast: Warning
     */
    toastWarning(title, text) {
        this.fireToast('warning', title, text);
    }
    /**
     * Fast Non-Blocking Toast: Info
     */
    toastInfo(title, text) {
        this.fireToast('info', title, text);
    }
    fireToast(icon, title, text) {
        const colors = this.getColors();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3800,
            timerProgressBar: true,
            background: colors.background,
            color: colors.color,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
            customClass: {
                popup: 'rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl font-sans !p-3 !px-4',
                title: 'text-xs font-bold text-slate-900 dark:text-white leading-tight',
                htmlContainer: 'text-[11px] text-slate-500 dark:text-slate-400 mt-0.5'
            }
        });
        Toast.fire({
            icon,
            title,
            text
        });
    }
    static ɵfac = function AlertService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AlertService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();
