import { Injectable, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type AppTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeStore {
  private readonly document = inject(DOCUMENT);
  readonly currentTheme = signal<AppTheme>('dark');
  readonly isDark = signal<boolean>(true);

  constructor() {
    let savedTheme: AppTheme | null = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        savedTheme = window.localStorage.getItem('dm_theme_preference') as AppTheme;
      }
    } catch {
      // Safe fallback
    }

    const initialTheme: AppTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
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
      } catch {
        // Safe fallback
      }
    });
  }

  toggleTheme() {
    this.currentTheme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: AppTheme) {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: AppTheme) {
    if (this.document?.documentElement) {
      if (theme === 'dark') {
        this.document.documentElement.classList.add('dark');
        this.document.documentElement.classList.remove('light');
        this.document.documentElement.style.colorScheme = 'dark';
      } else {
        this.document.documentElement.classList.remove('dark');
        this.document.documentElement.classList.add('light');
        this.document.documentElement.style.colorScheme = 'light';
      }
    }
  }
}
