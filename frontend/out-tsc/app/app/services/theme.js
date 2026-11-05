import { Injectable, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
export class ThemeStore {
    document = inject(DOCUMENT);
    currentTheme = signal('dark', ...(ngDevMode ? [{ debugName: "currentTheme" }] : /* istanbul ignore next */ []));
    isDark = signal(true, ...(ngDevMode ? [{ debugName: "isDark" }] : /* istanbul ignore next */ []));
    constructor() {
        let savedTheme = null;
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                savedTheme = window.localStorage.getItem('dm_theme_preference');
            }
        }
        catch {
            // Safe fallback
        }
        const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
        this.currentTheme.set(initialTheme);
        this.isDark.set(initialTheme === 'dark');
        this.applyTheme(initialTheme);
        effect(() => {
            const theme = this.currentTheme();
            this.isDark.set(theme === 'dark');
            this.applyTheme(theme);
            try {
                if (typeof window !== 'undefined' && window.localStorage) {
                    window.localStorage.setItem('dm_theme_preference', theme);
                }
            }
            catch {
                // Safe fallback
            }
        });
    }
    toggleTheme() {
        this.currentTheme.update(t => t === 'dark' ? 'light' : 'dark');
    }
    setTheme(theme) {
        this.currentTheme.set(theme);
    }
    applyTheme(theme) {
        if (this.document?.documentElement) {
            if (theme === 'dark') {
                this.document.documentElement.classList.add('dark');
                this.document.documentElement.classList.remove('light');
                this.document.documentElement.style.colorScheme = 'dark';
            }
            else {
                this.document.documentElement.classList.remove('dark');
                this.document.documentElement.classList.add('light');
                this.document.documentElement.style.colorScheme = 'light';
            }
        }
    }
    static ɵfac = function ThemeStore_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ThemeStore)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ThemeStore, factory: ThemeStore.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeStore, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();
