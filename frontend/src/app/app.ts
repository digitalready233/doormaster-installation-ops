import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstallationStore } from './services/installation.store';
import { ThemeStore } from './services/theme';
import { PwaService } from './services/pwa.service';
import { PwaStatusBanner } from './components/pwa-status-banner/pwa-status-banner';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    PwaStatusBanner
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly store = inject(InstallationStore);
  readonly themeStore = inject(ThemeStore);
  readonly pwa = inject(PwaService);
}
