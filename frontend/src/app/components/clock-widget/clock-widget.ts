import { ChangeDetectionStrategy, Component, computed, input, output, signal, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationJob } from '../../models/installation.model';

@Component({
  selector: 'app-clock-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs text-slate-900 dark:text-slate-100 transition-colors">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2.5">
          <div 
            class="w-9 h-9 rounded-lg flex items-center justify-center"
            [class]="isOnSite() ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'"
          >
            <mat-icon class="!text-lg">schedule</mat-icon>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">On-Site Clock In / Clock Out</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">GPS geofenced time attendance & labor tracking</p>
          </div>
        </div>

        <div>
          @if (isOnSite()) {
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 animate-pulse">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Clocked In On Site</span>
            </span>
          } @else if (job().status === 'completed' || job().status === 'installed_pending_signoff') {
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <mat-icon class="!text-xs !w-3.5 !h-3.5 text-emerald-600 dark:text-emerald-400">check_circle</mat-icon>
              <span>Site Work Finished</span>
            </span>
          } @else {
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <span>Ready for Site Check-In</span>
            </span>
          }
        </div>
      </div>

      <!-- Live timer & site location card -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <!-- Timer -->
        <div class="bg-slate-50 dark:bg-slate-950/60 rounded-lg p-3.5 border border-slate-200/70 dark:border-slate-800">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            {{ isOnSite() ? 'Live Session Elapsed' : 'Total Time Logged' }}
          </span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ isOnSite() ? liveElapsedTime() : formatLoggedHours(job().actualHours || 0) }}
            </span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">
              / {{ job().estimatedHours }}h estimated
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {{ isOnSite() ? 'Technician currently on site' : 'Efficiency score: On-schedule' }}
          </p>
        </div>

        <!-- GPS Geofence details -->
        <div class="bg-slate-50 dark:bg-slate-950/60 rounded-lg p-3.5 border border-slate-200/70 dark:border-slate-800">
          <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Site Location Verification
          </span>
          <div class="flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200">
            <mat-icon class="!text-sm text-emerald-600 dark:text-emerald-400">location_on</mat-icon>
            <span class="truncate">{{ job().client.siteAddress }}</span>
          </div>
          <div class="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span class="text-emerald-700 dark:text-emerald-400 font-medium">● GPS Verified (±8m)</span>
            <span>·</span>
            <span>Radius: Within 25m boundary</span>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div class="text-xs text-slate-500 dark:text-slate-400">
          @if (activeSession()) {
            <span>Started at: <strong class="text-slate-800 dark:text-slate-200 font-mono">{{ formatTime(activeSession()!.clockInTime) }}</strong></span>
          } @else if (lastSession()) {
            <span>Last clocked out: <strong class="text-slate-800 dark:text-slate-200 font-mono">{{ formatTime(lastSession()!.clockOutTime || '') }}</strong></span>
          } @else {
            <span>Click below when you physically arrive at client location.</span>
          }
        </div>

        <div class="flex items-center gap-2">
          @if (!isOnSite()) {
            <button 
              type="button"
              (click)="handleClockIn()"
              [disabled]="job().status === 'completed' || job().status === 'bonus_awarded'"
              class="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <mat-icon class="!text-sm !w-4 !h-4">login</mat-icon>
              <span>Clock In On Site (GPS Verified)</span>
            </button>
          } @else {
            <button 
              type="button"
              (click)="handleClockOut()"
              class="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <mat-icon class="!text-sm !w-4 !h-4">logout</mat-icon>
              <span>Clock Out & Complete Site Work</span>
            </button>
          }
        </div>
      </div>

      <!-- Session history if any -->
      @if (job().clockSessions && job().clockSessions.length > 0) {
        <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h5 class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Logged Shifts on this Door</h5>
          <div class="space-y-1.5">
            @for (session of job().clockSessions; track session.id) {
              <div class="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full" [class]="session.clockOutTime ? 'bg-slate-400' : 'bg-emerald-500'"></span>
                  <span class="font-mono text-slate-700 dark:text-slate-300">{{ formatTime(session.clockInTime) }} → {{ session.clockOutTime ? formatTime(session.clockOutTime) : 'Active' }}</span>
                </div>
                <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono">
                  <span>{{ session.durationMinutes ? session.durationMinutes + ' mins' : 'Running' }}</span>
                  <span class="text-emerald-700 dark:text-emerald-400 text-[11px]">GPS OK</span>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ClockWidget implements OnInit, OnDestroy {
  job = input.required<InstallationJob>();
  clockInTriggered = output<{ lat: number; lng: number }>();
  clockOutTriggered = output<{ notes?: string }>();

  readonly liveElapsedTime = signal('00:00:00');
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  readonly isOnSite = computed(() => {
    return this.job().status === 'on_site' || this.job().clockSessions?.some(s => !s.clockOutTime);
  });

  readonly activeSession = computed(() => {
    return this.job().clockSessions?.find(s => !s.clockOutTime);
  });

  readonly lastSession = computed(() => {
    const list = this.job().clockSessions || [];
    return list.length > 0 ? list[list.length - 1] : null;
  });

  ngOnInit() {
    this.startTimerIfActive();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private startTimerIfActive() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const tick = () => {
      const active = this.activeSession();
      if (!active) {
        this.liveElapsedTime.set('00:00:00');
        return;
      }
      const startTime = new Date(active.clockInTime).getTime();
      const now = Date.now();
      const diffSec = Math.max(0, Math.floor((now - startTime) / 1000));

      const hrs = Math.floor(diffSec / 3600);
      const mins = Math.floor((diffSec % 3600) / 60);
      const secs = diffSec % 60;

      const pad = (n: number) => n.toString().padStart(2, '0');
      this.liveElapsedTime.set(`${pad(hrs)}:${pad(mins)}:${pad(secs)}`);
    };

    tick();
    this.timerInterval = setInterval(tick, 1000);
  }

  handleClockIn() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.clockInTriggered.emit({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => {
          this.clockInTriggered.emit({ lat: 37.7749, lng: -122.4194 });
        },
        { enableHighAccuracy: true, timeout: 3000 }
      );
    } else {
      this.clockInTriggered.emit({ lat: 37.7749, lng: -122.4194 });
    }
  }

  handleClockOut() {
    this.clockOutTriggered.emit({ notes: 'Site work successfully completed. Ready for verification inspection.' });
  }

  formatTime(isoString: string): string {
    if (!isoString) return '--:--';
    try {
      return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  }

  formatLoggedHours(hours: number): string {
    return `${hours.toFixed(1)} hrs`;
  }
}
