import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { SmsProviderType } from '../../models/installation.model';

@Component({
  selector: 'app-profile-sms-settings-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule, SlicePipe],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <!-- Modal Top Bar -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <mat-icon class="!text-sm">sms</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Profile Phone Setup & SMS Gateway</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Configure recipient mobile numbers and SMS gateway credentials</p>
            </div>
          </div>
          <button 
            type="button" 
            (click)="closed.emit()"
            class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <mat-icon class="!text-base">close</mat-icon>
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 gap-2 bg-slate-50/30 dark:bg-slate-900/40 text-xs">
          <button 
            type="button"
            (click)="activeTab.set('phones')"
            class="pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'phones' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">phone_iphone</mat-icon>
            <span>User Phone Directory</span>
          </button>

          <button 
            type="button"
            (click)="activeTab.set('gateway')"
            class="pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'gateway' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">settings_cell</mat-icon>
            <span>SMS Gateways (Hubtel / Arkesel / Twilio)</span>
          </button>

          <button 
            type="button"
            (click)="activeTab.set('inbox')"
            class="pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'inbox' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">chat</mat-icon>
            <span>Live SMS Inbox ({{ store.smsLogs().length }})</span>
          </button>
        </div>

        <!-- Content Area -->
        <div class="overflow-y-auto p-6 text-xs flex-1">
          <!-- TAB 1: USER PHONE DIRECTORY -->
          @if (activeTab() === 'phones') {
            <form [formGroup]="phonesForm" (ngSubmit)="savePhones()" class="space-y-4">
              <div class="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 space-y-1">
                <span class="font-bold flex items-center gap-1">
                  <mat-icon class="!text-xs">notifications_active</mat-icon>
                  <span>Real-time SMS Routing</span>
                </span>
                <p class="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Each role must have a verified mobile number to receive step-by-step SMS updates during door fabrication, truck departure, and lock installation.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="phoneShopManager" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Shop Attendant / Manager Phone *
                  </label>
                  <input 
                    id="phoneShopManager"
                    type="text" 
                    formControlName="shop_manager"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 100 0002"
                  />
                  <span class="text-[10px] text-slate-400">Receives booking confirmations & approval SMS</span>
                </div>

                <div>
                  <label for="phoneOperationsManager" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Operations Manager Phone *
                  </label>
                  <input 
                    id="phoneOperationsManager"
                    type="text" 
                    formControlName="manager"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 100 0001"
                  />
                  <span class="text-[10px] text-slate-400">Receives driver/installer responses & site alerts</span>
                </div>

                <div>
                  <label for="phoneDispatcher" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Dispatch Driver (Logistics Flatbed) *
                  </label>
                  <input 
                    id="phoneDispatcher"
                    type="text" 
                    formControlName="dispatcher"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 555 0192"
                  />
                  <span class="text-[10px] text-slate-400">Receives delivery assignments & pickup notices</span>
                </div>

                <div>
                  <label for="phoneInstaller" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Field Installer / Locksmith *
                  </label>
                  <input 
                    id="phoneInstaller"
                    type="text" 
                    formControlName="installer"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 881 0293"
                  />
                  <span class="text-[10px] text-slate-400">Receives smart lock installation assignments</span>
                </div>

                <div>
                  <label for="phoneClient" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Client / Site Owner Phone *
                  </label>
                  <input 
                    id="phoneClient"
                    type="text" 
                    formControlName="client"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 883 9921"
                  />
                  <span class="text-[10px] text-slate-400">Receives live delivery approach & ETA links</span>
                </div>

                <div>
                  <label for="phoneAccountant" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Account Officer Phone
                  </label>
                  <input 
                    id="phoneAccountant"
                    type="text" 
                    formControlName="account_officer"
                    class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-medium text-slate-900 dark:text-white"
                    placeholder="+233 24 100 0005"
                  />
                  <span class="text-[10px] text-slate-400">Receives counter payment notifications</span>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  type="submit" 
                  class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <mat-icon class="!text-sm">save</mat-icon>
                  <span>Save Phone Directory</span>
                </button>
              </div>
            </form>
          }

          <!-- TAB 2: SMS GATEWAYS CONFIGURATION -->
          @if (activeTab() === 'gateway') {
            <form [formGroup]="gatewayForm" (ngSubmit)="saveGateway()" class="space-y-4">
              <div>
                <label for="gatewayProviderSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Active SMS Gateway Provider *</label>
                <select 
                  id="gatewayProviderSelect"
                  formControlName="provider"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="simulator">Built-in Interactive Ghana Telco SMS Simulator (Recommended for Testing)</option>
                  <option value="arkesel">Arkesel SMS Gateway (Ghana / Africa Telco Direct)</option>
                  <option value="hubtel">Hubtel Programmable SMS Gateway (Ghana Direct)</option>
                  <option value="twilio">Twilio Global Programmable SMS</option>
                </select>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label for="senderIdInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sender ID / Brand Name *</label>
                  <input 
                    id="senderIdInput"
                    type="text" 
                    formControlName="senderId"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    placeholder="DoorMaster"
                  />
                  <span class="text-[10px] text-slate-400">Max 11 alphanumeric characters approved by telcos</span>
                </div>

                <div>
                  <label for="apiKeyInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">API Key / Token</label>
                  <input 
                    id="apiKeyInput"
                    type="password" 
                    formControlName="apiKey"
                    class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    placeholder="e.g. ark_live_994827163"
                  />
                </div>
              </div>

              @if (gatewayForm.get('provider')?.value === 'hubtel') {
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label for="hubtelClientInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hubtel Client ID</label>
                    <input 
                      id="hubtelClientInput"
                      type="text" 
                      formControlName="hubtelClientId"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="e.g. hbt_cli_88192"
                    />
                  </div>
                  <div>
                    <label for="hubtelSecretInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hubtel Client Secret</label>
                    <input 
                      id="hubtelSecretInput"
                      type="password" 
                      formControlName="hubtelClientSecret"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              }

              @if (gatewayForm.get('provider')?.value === 'twilio') {
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label for="twilioSidInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Twilio Account SID</label>
                    <input 
                      id="twilioSidInput"
                      type="text" 
                      formControlName="twilioAccountSid"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label for="twilioTokenInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Twilio Auth Token</label>
                    <input 
                      id="twilioTokenInput"
                      type="password" 
                      formControlName="twilioAuthToken"
                      class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              }

              <div class="flex items-center gap-2 pt-2">
                <input 
                  id="simModeCheck"
                  type="checkbox" 
                  formControlName="simulationMode"
                  class="rounded text-emerald-600"
                />
                <label for="simModeCheck" class="font-medium text-slate-700 dark:text-slate-300">
                  Enable In-App Telco Simulator (renders live incoming SMS handset drawer in UI)
                </label>
              </div>

              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button 
                  type="button" 
                  (click)="sendTestSms()"
                  class="px-3.5 py-1.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold flex items-center gap-1"
                >
                  <mat-icon class="!text-xs text-amber-500">send</mat-icon>
                  <span>Send Test SMS Ping</span>
                </button>

                <button 
                  type="submit" 
                  class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <mat-icon class="!text-sm">save</mat-icon>
                  <span>Save Gateway Settings</span>
                </button>
              </div>
            </form>
          }

          <!-- TAB 3: LIVE SMS INBOX LOGS -->
          @if (activeTab() === 'inbox') {
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recent Dispatched SMS History</span>
                <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ store.smsLogs().length }} messages sent</span>
              </div>

              @if (store.smsLogs().length === 0) {
                <div class="p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center text-slate-400">
                  <mat-icon class="!text-3xl mb-1 text-slate-300">sms</mat-icon>
                  <p class="font-medium">No SMS messages sent yet.</p>
                  <p class="text-[10px] mt-0.5">Booking an installation or assigning a driver will trigger live SMS messages.</p>
                </div>
              }

              <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                @for (sms of store.smsLogs(); track sms.id) {
                  <div class="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
                    <div class="flex items-center justify-between text-[10px]">
                      <div class="flex items-center gap-1.5">
                        <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase font-sans">
                          [{{ sms.senderId }}] &rarr; {{ sms.recipientName }} ({{ sms.recipientRole }})
                        </span>
                        <span class="text-slate-400">{{ sms.recipientPhone }}</span>
                      </div>
                      <span class="text-slate-400">{{ sms.timestamp | slice:11:19 }}</span>
                    </div>

                    <p class="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      {{ sms.messageText }}
                    </p>

                    <div class="flex items-center justify-between text-[10px] pt-0.5 text-slate-400">
                      <span>Event: <strong class="text-slate-600 dark:text-slate-300">{{ sms.triggerEvent }}</strong></span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                        <mat-icon class="!text-xs">done_all</mat-icon>
                        <span>Delivered</span>
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ProfileSmsSettingsModal {
  readonly store = inject(InstallationStore);
  readonly closed = output<void>();

  readonly activeTab = signal<'phones' | 'gateway' | 'inbox'>('phones');

  readonly phonesForm = new FormGroup({
    manager: new FormControl<string>(this.store.userPhones().manager, { nonNullable: true, validators: [Validators.required] }),
    shop_manager: new FormControl<string>(this.store.userPhones().shop_manager, { nonNullable: true, validators: [Validators.required] }),
    dispatcher: new FormControl<string>(this.store.userPhones().dispatcher, { nonNullable: true, validators: [Validators.required] }),
    installer: new FormControl<string>(this.store.userPhones().installer, { nonNullable: true, validators: [Validators.required] }),
    client: new FormControl<string>(this.store.userPhones().client, { nonNullable: true, validators: [Validators.required] }),
    account_officer: new FormControl<string>(this.store.userPhones().account_officer, { nonNullable: true })
  });

  readonly gatewayForm = new FormGroup({
    provider: new FormControl<SmsProviderType>(this.store.smsGatewayConfig().provider, { nonNullable: true }),
    senderId: new FormControl<string>(this.store.smsGatewayConfig().senderId, { nonNullable: true, validators: [Validators.required] }),
    apiKey: new FormControl<string>(this.store.smsGatewayConfig().apiKey || '', { nonNullable: true }),
    hubtelClientId: new FormControl<string>(this.store.smsGatewayConfig().hubtelClientId || '', { nonNullable: true }),
    hubtelClientSecret: new FormControl<string>(this.store.smsGatewayConfig().hubtelClientSecret || '', { nonNullable: true }),
    twilioAccountSid: new FormControl<string>(this.store.smsGatewayConfig().twilioAccountSid || '', { nonNullable: true }),
    twilioAuthToken: new FormControl<string>(this.store.smsGatewayConfig().twilioAuthToken || '', { nonNullable: true }),
    simulationMode: new FormControl<boolean>(this.store.smsGatewayConfig().simulationMode, { nonNullable: true })
  });

  savePhones() {
    if (!this.phonesForm.valid) return;
    this.store.updateUserPhones(this.phonesForm.getRawValue());
    this.closed.emit();
  }

  saveGateway() {
    if (!this.gatewayForm.valid) return;
    const val = this.gatewayForm.getRawValue();
    this.store.updateSmsGatewayConfig({
      provider: val.provider,
      senderId: val.senderId,
      apiKey: val.apiKey,
      hubtelClientId: val.hubtelClientId,
      hubtelClientSecret: val.hubtelClientSecret,
      twilioAccountSid: val.twilioAccountSid,
      twilioAuthToken: val.twilioAuthToken,
      simulationMode: val.simulationMode
    });
    this.closed.emit();
  }

  sendTestSms() {
    const role = this.store.currentRole();
    const phones = this.store.userPhones();
    const phone = (phones as unknown as Record<string, string>)[role] || phones.manager;
    this.store.sendTestSmsPing(phone, `DoorMaster Automated SMS Gateway: Verification test ping for ${role} successful. 200 OK.`);
  }
}
