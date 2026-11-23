import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InstallationStore } from '../../services/installation.store';
import { InstallationJob } from '../../models/installation.model';

@Component({
  selector: 'app-finance-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Accounts & Audit Ledger</span>
            <span aria-hidden="true">·</span>
            <span>Shop Collections & Installer Site Mobilization</span>
            <span aria-hidden="true">·</span>
            <span class="text-amber-700 dark:text-amber-400 font-bold">Daily Reconciliation</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Accountant Financial Command & Audit</h1>
        </div>

        <!-- Tab Selector Switcher -->
        <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button 
            type="button"
            (click)="activeTab.set('shop_payments')"
            class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'shop_payments' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">point_of_sale</mat-icon>
            <span>Shop Collections ({{ store.pendingFinanceVerificationJobs().length }} unverified)</span>
          </button>
          <button 
            type="button"
            (click)="activeTab.set('tech_funds')"
            class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'tech_funds' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs text-amber-500">payments</mat-icon>
            <span>Dispatch Site Funds ({{ store.pendingTechMobilizationJobs().length }})</span>
          </button>
          <button 
            type="button"
            (click)="activeTab.set('audit_trail')"
            class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
            [class]="activeTab() === 'audit_trail' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
          >
            <mat-icon class="!text-xs">receipt_long</mat-icon>
            <span>Audit Trail</span>
          </button>
        </div>
      </div>

      <!-- Financial Metrics Tiles -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Shop Collections</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400 tracking-tight tabular-nums">
              GH₵{{ store.totalShopCollections().toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Collected at counter by Shop Attendant</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Site Funds Dispatched</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 tracking-tight tabular-nums">
              GH₵{{ store.totalSiteFundsDispatched().toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Mobilization allowance for installers</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Awaiting Installer Funds</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight tabular-nums">
              {{ store.pendingTechMobilizationJobs().length }}
            </span>
            <span class="text-xs text-amber-600 font-bold">Requests</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Cleared for travel disbursement</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Incentive Pool</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400 tracking-tight tabular-nums">
              GH₵{{ store.stats().totalBonusesAllocated.toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Installer performance payouts</p>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- TAB 1: SHOP COUNTER COLLECTIONS AUDIT                               -->
      <!-- =================================================================== -->
      @if (activeTab() === 'shop_payments') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Shop Counter Payment Registry & Verification</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Accountant audit of client cash, MoMo and POS payments recorded at the shop counter</p>
            </div>
            <span class="text-xs font-mono text-slate-500">{{ shopOrders().length }} Orders</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-4">Receipt & Job ID</th>
                  <th class="py-3 px-4">Door & Lock Ordered</th>
                  <th class="py-3 px-4">Client / Site Owner</th>
                  <th class="py-3 px-4">Amount Paid at Shop</th>
                  <th class="py-3 px-4">Method & Channel</th>
                  <th class="py-3 px-4">Audit Status</th>
                  <th class="py-3 px-4 text-right">Accountant Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (job of shopOrders(); track job.id) {
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="py-3.5 px-4 whitespace-nowrap">
                      <span class="font-mono font-bold text-slate-900 dark:text-white block">{{ job.shopBooking?.receiptNumber || 'REC-PENDING' }}</span>
                      <span class="text-[10px] text-slate-400 font-mono">{{ job.id }}</span>
                    </td>

                    <td class="py-3.5 px-4">
                      <p class="font-bold text-slate-900 dark:text-white">{{ job.doorModel }}</p>
                      <p class="text-[11px] text-amber-600 dark:text-amber-400 font-medium">{{ job.lockModel || 'Smart Lock Handle' }}</p>
                    </td>

                    <td class="py-3.5 px-4">
                      <p class="font-bold text-slate-900 dark:text-white">{{ job.client.name }}</p>
                      <p class="text-[10px] text-slate-500 font-mono">{{ job.client.phone }}</p>
                    </td>

                    <td class="py-3.5 px-4 font-mono font-bold text-cyan-700 dark:text-cyan-400 text-sm whitespace-nowrap">
                      ₵{{ (job.shopBooking?.amountPaidAtShop ?? ((job.financials.installationFee || 0) + (job.financials.laborCost || 0))).toLocaleString() }}
                    </td>

                    <td class="py-3.5 px-4 whitespace-nowrap">
                      <span
                        class="uppercase font-bold text-[10px] px-2.5 py-0.5 rounded border inline-block"
                        [class]="getPaymentMethodBadgeClass(job.shopBooking?.paymentMethod)"
                      >
                        {{ formatPaymentMethodLabel(job.shopBooking?.paymentMethod) }}
                      </span>
                    </td>

                    <td class="py-3.5 px-4">
                      @if (job.shopBooking?.accountantVerified) {
                        <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          <mat-icon class="!text-xs">verified</mat-icon>
                          <span>Audited</span>
                        </span>
                      } @else {
                        <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                          <mat-icon class="!text-xs">pending</mat-icon>
                          <span>Pending Audit</span>
                        </span>
                      }
                    </td>

                    <td class="py-3.5 px-4 text-right">
                      @if (!job.shopBooking?.accountantVerified) {
                        <button 
                          type="button"
                          (click)="verifyPayment(job.id)"
                          class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ml-auto shadow-2xs active:scale-95"
                        >
                          <mat-icon class="!text-xs">done_all</mat-icon>
                          <span>Verify & Audit</span>
                        </button>
                      } @else {
                        <span class="text-xs text-slate-400 font-mono italic">Audit Verified</span>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- TAB 2: DISPATCH SITE MOBILIZATION FUNDS FOR INSTALLERS      -->
      <!-- =================================================================== -->
      @if (activeTab() === 'tech_funds') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Installer Site Mobilization & Transit Funds</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Accountant dispatches transport stipend & lock tooling allowance so installers can visit client sites</p>
            </div>
            <span class="text-xs font-mono text-amber-600 font-bold">Standard Allowance: GH₵250.00 / site</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-4">Installation Job</th>
                  <th class="py-3 px-4">Assigned Installer</th>
                  <th class="py-3 px-4">Destination Site</th>
                  <th class="py-3 px-4">Stipend Purpose</th>
                  <th class="py-3 px-4">Disbursement Status</th>
                  <th class="py-3 px-4 text-right">Fund Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (job of store.jobs(); track job.id) {
                  @if (job.technicianSiteFunds) {
                    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        <span class="font-mono font-bold text-slate-900 dark:text-white block">{{ job.id }}</span>
                        <span class="text-[11px] text-slate-600 dark:text-slate-400">{{ job.doorModel }}</span>
                      </td>

                      <td class="py-3.5 px-4">
                        @if (job.assignedInstallerName) {
                          <p class="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                            <mat-icon class="!text-xs text-emerald-600">handyman</mat-icon>
                            <span>{{ job.assignedInstallerName }}</span>
                          </p>
                        } @else {
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            <mat-icon class="!text-xs">hourglass_top</mat-icon>
                            <span>Installer: Pending</span>
                          </span>
                        }
                      </td>

                      <td class="py-3.5 px-4">
                        <p class="font-semibold text-slate-800 dark:text-slate-200">{{ job.client.siteAddress }}</p>
                        <p class="text-[10px] text-slate-400">Client: {{ job.client.name }}</p>
                      </td>

                      <td class="py-3.5 px-4">
                        <p class="text-slate-700 dark:text-slate-300 font-medium">{{ job.technicianSiteFunds.purpose }}</p>
                        <span class="font-mono font-bold text-amber-600 dark:text-amber-400">GH₵{{ job.technicianSiteFunds.amount.toLocaleString() }}</span>
                      </td>

                      <td class="py-3.5 px-4 whitespace-nowrap">
                        @if (job.technicianSiteFunds.status === 'dispatched') {
                          <div>
                            <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                              <mat-icon class="!text-xs">check_circle</mat-icon>
                              <span>Funds Dispatched</span>
                            </span>
                            <span class="block text-[10px] text-slate-400 font-mono mt-0.5">Ref: {{ job.technicianSiteFunds.transactionRef }}</span>
                          </div>
                        } @else {
                          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            <mat-icon class="!text-xs">hourglass_top</mat-icon>
                            <span>Awaiting Dispatch</span>
                          </span>
                        }
                      </td>

                      <td class="py-3.5 px-4 text-right">
                        @if (job.technicianSiteFunds.status !== 'dispatched') {
                          <button 
                            type="button"
                            (click)="openDispatchModal(job)"
                            class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ml-auto shadow-2xs active:scale-95"
                          >
                            <mat-icon class="!text-xs">send</mat-icon>
                            <span>Dispatch GH₵{{ job.technicianSiteFunds.amount }}</span>
                          </button>
                        } @else {
                          <span class="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">Disbursed</span>
                        }
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- TAB 3: COMPLETE TRANSACTION LIFECYCLE AUDIT DASHBOARD               -->
      <!-- =================================================================== -->
      @if (activeTab() === 'audit_trail') {
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">End-to-End Installation Process Transaction Ledger</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Full audit trail of shop collections, site mobilization funds, labor costs, and installer bonuses</p>
            </div>
            <span class="text-xs font-mono text-slate-500">{{ store.jobs().length }} Entries</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-4">Order & Door</th>
                  <th class="py-3 px-4">Client</th>
                  <th class="py-3 px-4 text-right">Shop Collected</th>
                  <th class="py-3 px-4 text-right">Site Mobilization</th>
                  <th class="py-3 px-4 text-right">Labor Cost</th>
                  <th class="py-3 px-4 text-right">Installer Bonus</th>
                  <th class="py-3 px-4 text-right">Net Margin</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (job of store.jobs(); track job.id) {
                  @let collected = job.shopBooking?.amountPaidAtShop ?? ((job.financials.installationFee || 0) + (job.financials.laborCost || 0));
                  @let mobilization = (job.technicianSiteFunds && job.technicianSiteFunds.status === 'dispatched') ? (job.technicianSiteFunds.amount || 0) : 0;
                  @let margin = collected - mobilization - job.financials.laborCost - (job.financials.bonusStatus === 'approved' ? job.financials.bonusAmount : 0);
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="py-3 px-4">
                      <span class="font-mono font-bold text-slate-900 dark:text-white block">{{ job.id }}</span>
                      <span class="text-[11px] text-slate-600 dark:text-slate-400">{{ job.doorModel }}</span>
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {{ job.client.name }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-cyan-700 dark:text-cyan-400">
                      GH₵{{ collected.toLocaleString() }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                      GH₵{{ mobilization.toLocaleString() }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono text-slate-600 dark:text-slate-400">
                      GH₵{{ job.financials.laborCost }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      GH₵{{ job.financials.bonusAmount }}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-black text-slate-900 dark:text-white">
                      GH₵{{ margin.toLocaleString() }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- =================================================================== -->
      <!-- MODAL: DISPATCH SITE MOBILIZATION FUNDS                            -->
      <!-- =================================================================== -->
      @if (activeDispatchJob()) {
        @let job = activeDispatchJob()!;
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <mat-icon class="!text-sm">payments</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Dispatch Installer Site Mobilization</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Order {{ job.id }} · Installer: {{ job.assignedInstallerName || 'Installer' }}</p>
                </div>
              </div>
              <button 
                type="button" 
                (click)="closeDispatchModal()"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <mat-icon class="!text-base">close</mat-icon>
              </button>
            </div>

            <form [formGroup]="dispatchForm" (ngSubmit)="confirmFundDispatch()" class="p-6 space-y-4 text-xs">
              <div class="bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                <span class="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">Site Destination:</span>
                <p class="font-bold text-slate-900 dark:text-white">{{ job.client.siteAddress }}</p>
                <p class="text-[11px] text-slate-600 dark:text-slate-300">Client: {{ job.client.name }} · Door: {{ job.doorModel }}</p>
              </div>

              <div>
                <label for="fundAmountInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Stipend Amount (GH₵) *</label>
                <input 
                  id="fundAmountInput"
                  type="number" 
                  formControlName="amount"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-base text-amber-600 dark:text-amber-400"
                />
              </div>

              <div>
                <label for="fundChannelSelect" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Channel *</label>
                <select 
                  id="fundChannelSelect"
                  formControlName="paymentChannel"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="MTN Mobile Money">MTN Mobile Money (MoMo)</option>
                  <option value="Telecel Cash">Telecel Cash</option>
                  <option value="Direct Petty Cash Voucher">Direct Petty Cash Voucher</option>
                  <option value="GCB / Ecobank Instant Pay">GCB / Ecobank Instant Pay</option>
                </select>
              </div>

              <div>
                <label for="fundTrxInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Transaction Reference # *</label>
                <input 
                  id="fundTrxInput"
                  type="text" 
                  formControlName="transactionRef"
                  class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label for="fundNotesInput" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Audit Notes</label>
                <input 
                  id="fundNotesInput"
                  type="text" 
                  formControlName="notes"
                  class="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. Cleared for fuel, tolls & smart lock installation kit"
                />
              </div>

              <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  (click)="closeDispatchModal()"
                  class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  [disabled]="!dispatchForm.valid"
                  class="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                >
                  <mat-icon class="!text-sm">send</mat-icon>
                  <span>Release Funds to Installer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class FinancePortal {
  readonly store = inject(InstallationStore);

  readonly activeTab = signal<'shop_payments' | 'tech_funds' | 'audit_trail'>('shop_payments');
  readonly activeDispatchJob = signal<InstallationJob | null>(null);

  readonly dispatchForm = new FormGroup({
    amount: new FormControl<number>(250, { nonNullable: true, validators: [Validators.required, Validators.min(10)] }),
    paymentChannel: new FormControl<string>('MTN Mobile Money', { nonNullable: true, validators: [Validators.required] }),
    transactionRef: new FormControl<string>(`MOMO-TRX-${Math.floor(10000 + Math.random() * 90000)}`, { nonNullable: true, validators: [Validators.required] }),
    notes: new FormControl<string>('Site transit stipend & lock installation tooling kit', { nonNullable: true })
  });

  readonly shopOrders = computed(() => {
    return this.store.jobs().filter(j => j.shopBooking != null || j.status === 'booked_at_shop');
  });

  formatPaymentMethodLabel(method?: string): string {
    const normalized = (method || 'momo').toLowerCase().trim();
    if (normalized === 'dm_door') return 'DM Door';
    if (normalized === 'pos_card') return 'POS';
    if (normalized === 'bank_transfer') return 'Bank';
    return method || 'momo';
  }

  getPaymentMethodBadgeClass(method?: string): string {
    const normalized = (method || 'momo').toLowerCase().trim();
    if (normalized === 'cash') {
      return 'bg-emerald-600 text-white border-emerald-700';
    }
    if (normalized === 'momo' || normalized.includes('mobile')) {
      return 'bg-yellow-400 text-slate-950 border-yellow-500';
    }
      if (normalized === 'pos' || normalized.includes('pos')) {
        return 'bg-[#111215] text-white border-slate-700';
      }
      if (normalized.includes('bank')) {
        return 'bg-blue-600 text-white border-blue-700';
      }
      if (normalized === 'dm_door') {
        return 'bg-[#59000A] text-white border-[#470008]';
      }
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }

    verifyPayment(jobId: string) {
      this.store.verifyShopPayment(jobId, 'Reconciled against counter POS & MoMo merchant statement');
    }

    openDispatchModal(job: InstallationJob) {
      this.activeDispatchJob.set(job);
      this.dispatchForm.patchValue({
        amount: job.technicianSiteFunds?.amount || 250,
        transactionRef: `MOMO-TRX-${Math.floor(10000 + Math.random() * 90000)}`
      });
    }

    closeDispatchModal() {
      this.activeDispatchJob.set(null);
    }

    confirmFundDispatch() {
      const job = this.activeDispatchJob();
      if (!job || !this.dispatchForm.valid) return;
      const val = this.dispatchForm.getRawValue();

      this.store.dispatchTechnicianSiteFunds(job.id, {
        amount: val.amount,
        transactionRef: val.transactionRef
      });

      this.closeDispatchModal();
    }
  }
