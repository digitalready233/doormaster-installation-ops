import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AppUser, RoleDefinition, RoleType } from '../../models/installation.model';
import { EditUserModal } from '../../components/edit-user-modal/edit-user-modal';

@Component({
  selector: 'app-roles-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule, EditUserModal],
  template: `
    <div class="space-y-6">
      
      <!-- Top Header & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Enterprise Organization</span>
            <span aria-hidden="true">·</span>
            <span>Identity & Access Management (IAM)</span>
            <span aria-hidden="true">·</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-medium">Operations Manager Governance</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            User Accounts & Role Governance
          </h1>
        </div>

        <div class="flex items-center gap-2.5">
          <button 
            type="button"
            (click)="onRefreshUsers()"
            [disabled]="isRefreshing()"
            class="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
            title="Refresh user list from MySQL"
          >
            <mat-icon class="!text-sm !w-4 !h-4" [class.animate-spin]="isRefreshing()">refresh</mat-icon>
            <span class="hidden sm:inline">Sync Users</span>
          </button>

          <button 
            type="button"
            (click)="addUserModalOpened.emit()"
            class="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">person_add</mat-icon>
            <span>Add New User</span>
          </button>

          <button 
            type="button"
            (click)="customRoleModalOpened.emit()"
            class="px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">add_moderator</mat-icon>
            <span class="hidden sm:inline">New Role</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs: User Directory vs Role RBAC Definitions -->
      <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          type="button"
          (click)="activeTab.set('users')"
          class="relative px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-b-2"
          [class]="activeTab() === 'users' 
            ? 'border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-400' 
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <mat-icon class="!text-base">manage_accounts</mat-icon>
          <span>User Directory & Authorizations</span>
          
          @if (store.pendingUsers().length > 0) {
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
              {{ store.pendingUsers().length }} Pending
            </span>
          } @else {
            <span class="px-2 py-0.2 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {{ store.users().length }}
            </span>
          }
        </button>

        <button
          type="button"
          (click)="activeTab.set('roles')"
          class="relative px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-b-2"
          [class]="activeTab() === 'roles' 
            ? 'border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-400' 
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <mat-icon class="!text-base">admin_panel_settings</mat-icon>
          <span>Role Definitions & Granular RBAC</span>
          <span class="px-2 py-0.2 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {{ store.roles().length }}
          </span>
        </button>
      </div>

      <!-- =================================================================== -->
      <!-- TAB 1: USER DIRECTORY & ACCESS CONTROL                             -->
      <!-- =================================================================== -->
      @if (activeTab() === 'users') {
        
        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <!-- Total Users -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Total Registered</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                {{ store.users().length }}
              </span>
              <span class="text-xs text-slate-500 font-mono">accounts</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              Staff, Technicians & Clients
            </div>
          </div>

          <!-- Pending Approvals -->
          <div 
            class="p-4 rounded-2xl border shadow-xs transition-colors"
            [class]="store.pendingUsers().length > 0 
              ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80 ring-2 ring-amber-500/20' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">Pending Approval</span>
              @if (store.pendingUsers().length > 0) {
                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                  Action Required
                </span>
              }
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                {{ store.pendingUsers().length }}
              </span>
              <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">Awaiting Ops Review</span>
            </div>
            <div class="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-2">
              Cannot sign in until approved
            </div>
          </div>

          <!-- Active Accounts -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Active Accounts</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                {{ store.activeUsers().length }}
              </span>
              <span class="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Authorized</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Fully authorized sign-ins</span>
            </div>
          </div>

          <!-- Deactivated / Rejected -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Deactivated / Blocked</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                {{ store.deactivatedUsers().length }}
              </span>
              <span class="text-xs text-slate-400 font-mono">restricted</span>
            </div>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              Access immediately revoked
            </div>
          </div>
        </div>

        <!-- Pending Approval Alert Banner (When there are pending registrations) -->
        @if (store.pendingUsers().length > 0) {
          <div class="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950 dark:text-amber-200">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <mat-icon class="!text-lg">notification_important</mat-icon>
              </div>
              <div class="space-y-0.5">
                <p class="text-xs font-bold">
                  {{ store.pendingUsers().length }} User Registration(s) Awaiting Operations Manager Approval
                </p>
                <p class="text-xs text-amber-800 dark:text-amber-300">
                  Self-registered users start in pending status and are blocked from signing in until an Operations Manager authorizes their account.
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="statusFilter.set('pending')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shrink-0 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              Filter Pending Queue
            </button>
          </div>
        }

        <!-- Search & Filter Bar -->
        <div class="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          <!-- Search input -->
          <div class="relative flex-1">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-base !w-4 !h-4">search</mat-icon>
            <input 
              type="text"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Search by name, email, phone or role..."
              class="w-full pl-9 pr-8 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            @if (searchQuery()) {
              <button 
                type="button"
                (click)="searchQuery.set('')"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <mat-icon class="!text-sm !w-4 !h-4">close</mat-icon>
              </button>
            }
          </div>

          <!-- Status Filters -->
          <div class="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              (click)="statusFilter.set('all')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="statusFilter() === 'all' 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              All ({{ store.users().length }})
            </button>

            <button
              type="button"
              (click)="statusFilter.set('pending')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
              [class]="statusFilter() === 'pending' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'"
            >
              <span>Pending</span>
              @if (store.pendingUsers().length > 0) {
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              }
              <span>({{ store.pendingUsers().length }})</span>
            </button>

            <button
              type="button"
              (click)="statusFilter.set('active')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="statusFilter() === 'active' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'"
            >
              Active ({{ store.activeUsers().length }})
            </button>

            <button
              type="button"
              (click)="statusFilter.set('deactivated')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="statusFilter() === 'deactivated' 
                ? 'bg-slate-700 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              Deactivated ({{ store.deactivatedUsers().length }})
            </button>
          </div>

          <!-- Role Filter Dropdown -->
          <div class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Role:</span>
            <select
              [ngModel]="roleFilter()"
              (ngModelChange)="roleFilter.set($event)"
              class="py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Roles</option>
              <option value="manager">Operations Manager</option>
              <option value="installer">Installer</option>
              <option value="shop_manager">Shop Manager</option>
              <option value="dispatcher">Logistics Dispatcher</option>
              <option value="account_officer">Account Officer</option>
              <option value="client">Client</option>
              @for (r of customRoles(); track r.id) {
                <option [value]="r.id">{{ r.name }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Users Table Card -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          
          @if (filteredUsers().length === 0) {
            <div class="py-16 text-center px-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <mat-icon class="!text-2xl">person_search</mat-icon>
              </div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">No matching user accounts</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                No users found matching your search or filters. You can clear your filters or add a new user.
              </p>
              <button
                type="button"
                (click)="addUserModalOpened.emit()"
                class="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <mat-icon class="!text-sm">person_add</mat-icon>
                <span>Add New User</span>
              </button>
            </div>
          } @else {
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th class="py-3 px-4 sm:px-6">User Account</th>
                    <th class="py-3 px-4">Role Assignment</th>
                    <th class="py-3 px-4">Status</th>
                    <th class="py-3 px-4 hidden md:table-cell">Contact & Identity</th>
                    <th class="py-3 px-4 text-right">Operations Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  @for (u of filteredUsers(); track u.id) {
                    <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      
                      <!-- User Account Profile -->
                      <td class="py-3.5 px-4 sm:px-6">
                        <div class="flex items-center gap-3">
                          <div class="relative">
                            <div 
                              class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase shadow-xs shrink-0"
                              [class]="getAvatarBg(u.role)"
                            >
                              {{ getUserInitials(u.name) }}
                            </div>
                            <span 
                              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900"
                              [class]="getStatusDotClass(u.status)"
                            ></span>
                          </div>

                          <div class="min-w-0">
                            <div class="flex items-center gap-1.5 flex-wrap">
                              <span class="font-bold text-slate-900 dark:text-white truncate">{{ u.name }}</span>
                              @if (u.role === 'installer') {
                                @if (u.id === 'USR-INS-01' || u.id === 'USR-INS-02' || u.id === 'USR-INS-03' || u.name.includes('Alpha')) {
                                  <span class="text-[9px] px-1.5 py-0.2 rounded font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                    Team Alpha {{ (u.id === 'USR-INS-01' || u.name.includes('Lead')) ? '★ Lead' : '' }}
                                  </span>
                                } @else {
                                  <span class="text-[9px] px-1.5 py-0.2 rounded font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                    Team Bravo {{ (u.id === 'USR-INS-04' || u.name.includes('Lead')) ? '★ Lead' : '' }}
                                  </span>
                                }
                              } @else if (u.role === 'dispatcher') {
                                <span class="text-[9px] px-1.5 py-0.2 rounded font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 inline-flex items-center gap-0.5">
                                  <mat-icon class="!text-[10px] !w-2.5 !h-2.5">local_shipping</mat-icon>
                                  <span>Branch Dispatcher</span>
                                </span>
                              }
                              @if (store.impersonationSession()?.targetUser?.id === u.id) {
                                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700 flex items-center gap-0.5">
                                  <mat-icon class="!text-[10px] !w-2.5 !h-2.5">switch_account</mat-icon>
                                  <span>Logged In As</span>
                                </span>
                              } @else if (u.id === store.primaryUser().id) {
                                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-semibold">
                                  Primary
                                </span>
                              } @else if (u.id === store.apiUser()?.id || u.role === store.currentRole()) {
                                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                                  Current
                                </span>
                              }
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">{{ u.email }}</div>
                          </div>
                        </div>
                      </td>

                      <!-- Role Assignment -->
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        <span 
                          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border"
                          [class]="getRoleBadgeClass(u.role)"
                        >
                          <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ getRoleIcon(u.role) }}</mat-icon>
                          <span>{{ getRoleName(u.role) }}</span>
                        </span>
                      </td>

                      <!-- Status Badge -->
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        @switch (u.status) {
                          @case ('pending') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5 animate-spin">hourglass_empty</mat-icon>
                              <span>Pending Approval</span>
                            </span>
                          }
                          @case ('active') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">verified</mat-icon>
                              <span>Active</span>
                            </span>
                          }
                          @case ('deactivated') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">block</mat-icon>
                              <span>Deactivated</span>
                            </span>
                          }
                          @case ('rejected') {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">cancel</mat-icon>
                              <span>Rejected</span>
                            </span>
                          }
                          @default {
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {{ u.status || 'Active' }}
                            </span>
                          }
                        }
                      </td>

                      <!-- Contact Details -->
                      <td class="py-3.5 px-4 hidden md:table-cell text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        <div class="flex items-center gap-1.5 text-xs">
                          <mat-icon class="!text-xs !w-3.5 !h-3.5 text-slate-400">phone</mat-icon>
                          <span>{{ u.phone || 'No phone set' }}</span>
                        </div>
                      </td>

                      <!-- Action Buttons -->
                      <td class="py-3.5 px-4 text-right whitespace-nowrap">
                        <div class="flex items-center justify-end gap-1.5">
                          
                          <!-- Pending: Approve & Reject buttons -->
                          @if (u.status === 'pending') {
                            <button
                              type="button"
                              (click)="onApproveUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Approve registration and authorize user to sign in"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">check</mat-icon>
                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              (click)="onRejectUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Reject registration request"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">close</mat-icon>
                              <span>Reject</span>
                            </button>
                          }

                          <!-- Active: Deactivate button -->
                          @if (u.status === 'active') {
                            <button
                              type="button"
                              (click)="onDeactivateUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Deactivate account to temporarily block access"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5 text-amber-500">block</mat-icon>
                              <span>Deactivate</span>
                            </button>
                          }

                          <!-- Deactivated or Rejected: Reactivate / Restore -->
                          @if (u.status === 'deactivated' || u.status === 'rejected') {
                            <button
                              type="button"
                              (click)="onReactivateUser(u)"
                              [disabled]="actionLoadingId() === u.id"
                              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                              title="Reactivate and authorize this account"
                            >
                              <mat-icon class="!text-xs !w-3.5 !h-3.5">check_circle</mat-icon>
                              <span>Reactivate</span>
                            </button>
                          }

                          <!-- Login As / Temporary Session Icon Button with Tooltip -->
                          <button
                            type="button"
                            (click)="onLoginAs(u)"
                            matTooltip="Login As"
                            title="Login As"
                            aria-label="Login As"
                            class="p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer active:scale-95 border"
                            [class.bg-teal-50]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.text-teal-700]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.hover:bg-teal-100]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.dark:bg-teal-950/40]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.dark:text-teal-300]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.border-teal-200]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.dark:border-teal-800/60]="store.impersonationSession()?.targetUser?.id !== u.id"
                            [class.bg-teal-600]="store.impersonationSession()?.targetUser?.id === u.id"
                            [class.text-white]="store.impersonationSession()?.targetUser?.id === u.id"
                            [class.border-teal-700]="store.impersonationSession()?.targetUser?.id === u.id"
                            [class.shadow-xs]="store.impersonationSession()?.targetUser?.id === u.id"
                          >
                            <mat-icon class="!text-sm !w-4 !h-4">switch_account</mat-icon>
                          </button>

                          <!-- Edit User Details & Role -->
                          <button
                            type="button"
                            (click)="onEditUser(u)"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                            title="Edit user details, role, and authorizations"
                          >
                            <mat-icon class="!text-xs !w-3.5 !h-3.5">edit</mat-icon>
                            <span>Edit</span>
                          </button>

                          <!-- Delete account option -->
                          <button
                            type="button"
                            (click)="onDeleteUser(u)"
                            [disabled]="actionLoadingId() === u.id"
                            class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete user from database"
                          >
                            <mat-icon class="!text-sm !w-4 !h-4">delete_outline</mat-icon>
                          </button>
                        </div>
                      </td>

                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>

      }

      <!-- =================================================================== -->
      <!-- TAB 2: ROLE DEFINITIONS & EXTENSIBLE RBAC                          -->
      <!-- =================================================================== -->
      @if (activeTab() === 'roles') {
        
        <!-- Explanatory Banner -->
        <div class="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 rounded-xl text-xs text-indigo-950 dark:text-indigo-300 flex items-start gap-3">
          <mat-icon class="text-indigo-700 dark:text-indigo-400 shrink-0 mt-0.5">verified_user</mat-icon>
          <div class="space-y-1">
            <p class="font-bold text-indigo-950 dark:text-indigo-200">Extensible Role Architecture</p>
            <p class="text-indigo-800 dark:text-indigo-300 leading-relaxed">
              DoorMaster accommodates Operations Managers, Installers, Shop Managers, Logistics Dispatchers, Finance Officers, and Clients. 
              As your operations expand, instantiate custom operational roles with granular permission matrices.
            </p>
          </div>
        </div>

        <!-- Roles Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (role of store.roles(); track role.id) {
            <div 
              class="bg-white dark:bg-slate-900 rounded-xl border transition-all p-5 shadow-xs flex flex-col justify-between"
              [class]="store.currentRole() === role.id ? 'border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/10 dark:ring-white/10' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'"
            >
              <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                      <mat-icon class="!text-base">{{ role.icon }}</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ role.name }}</h3>
                      <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">{{ role.label }}</span>
                    </div>
                  </div>

                  <div>
                    @if (role.isSystem) {
                      <span class="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        Core System
                      </span>
                    } @else {
                      <span class="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 rounded">
                        Custom Extension
                      </span>
                    }
                  </div>
                </div>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {{ role.description }}
                </p>

                <!-- Permissions Matrix List -->
                <div class="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Create / Book Jobs</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canCreateJobs ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canCreateJobs ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Assign Installers</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canAssignInstallers ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canAssignInstallers ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Dispatch Doors From Shop</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canDispatchDoors ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canDispatchDoors ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Clock In / Clock Out On Site</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canClockInOut ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canClockInOut ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Sign Customer Verification</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canSignVerification ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canSignVerification ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Authorize Installer Bonuses</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canApproveBonuses ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canApproveBonuses ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>View Financial Ledger & Fees</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canViewFinancials ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canViewFinancials ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                  <div class="flex items-center justify-between text-[11px]">
                    <span>Manage User Accounts & Approvals</span>
                    <mat-icon class="!text-sm" [class]="role.permissions.canManageRoles ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                      {{ role.permissions.canManageRoles ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </div>
                </div>
              </div>

              <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                @if (store.currentRole() === role.id) {
                  <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Active Perspective
                  </span>
                } @else {
                  <button 
                    type="button" 
                    (click)="onSelectRole(role.id)"
                    class="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                  >
                    Switch into this role →
                  </button>
                }

                @if (!role.isSystem) {
                  <button 
                    type="button" 
                    (click)="onDeleteCustomRole(role)"
                    class="text-xs text-rose-500 hover:text-rose-700 cursor-pointer"
                    title="Delete custom role"
                  >
                    <mat-icon class="!text-sm">delete</mat-icon>
                  </button>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- Edit User Account & Authorizations Modal -->
      @if (editingUser(); as userToEdit) {
        <app-edit-user-modal
          [user]="userToEdit"
          (closed)="editingUser.set(null)"
          (userUpdated)="editingUser.set(null)"
        />
      }

    </div>
  `
})
export class RolesManager {
  readonly store = inject(InstallationStore);
  readonly alert = inject(AlertService);
  private readonly router = inject(Router);
  
  customRoleModalOpened = output<void>();
  addUserModalOpened = output<void>();
  roleSwitched = output<string>();

  readonly activeTab = signal<'users' | 'roles'>('users');
  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<string>('all');
  readonly roleFilter = signal<string>('all');
  readonly actionLoadingId = signal<string | null>(null);
  readonly isRefreshing = signal<boolean>(false);
  readonly editingUser = signal<AppUser | null>(null);

  readonly customRoles = () => this.store.roles().filter(r => !r.isSystem);

  readonly filteredUsers = computed(() => {
    const list = this.store.users();
    const q = this.searchQuery().trim().toLowerCase();
    const st = this.statusFilter();
    const rf = this.roleFilter();

    return list.filter(u => {
      // Status filter
      if (st !== 'all' && (u.status || 'active') !== st) {
        return false;
      }

      // Role filter
      if (rf !== 'all' && u.role !== rf) {
        return false;
      }

      // Search query
      if (q) {
        const nameMatch = (u.name || '').toLowerCase().includes(q);
        const emailMatch = (u.email || '').toLowerCase().includes(q);
        const phoneMatch = (u.phone || '').toLowerCase().includes(q);
        const roleMatch = (u.role || '').toLowerCase().includes(q);
        if (!nameMatch && !emailMatch && !phoneMatch && !roleMatch) {
          return false;
        }
      }

      return true;
    });
  });

  async onRefreshUsers() {
    this.isRefreshing.set(true);
    await this.store.loadUsers();
    this.isRefreshing.set(false);
    this.alert.toastSuccess('User Accounts Refreshed', 'Synced latest user records from database.');
  }

  onEditUser(user: AppUser) {
    this.editingUser.set(user);
  }

  async onApproveUser(user: AppUser) {
    this.actionLoadingId.set(user.id);
    const success = await this.store.approveUser(user.id);
    this.actionLoadingId.set(null);
    if (success) {
      this.alert.toastSuccess('User Approved', `Account for ${user.name} has been activated.`);
    } else {
      this.alert.toastError('Approval Failed', `Could not activate ${user.name}.`);
    }
  }

  async onRejectUser(user: AppUser) {
    const confirmed = await this.alert.confirm(
      'Reject Registration Request?',
      `Are you sure you want to reject registration for "${user.name}" (${user.email})?`,
      'Reject Request',
      'Cancel',
      true
    );
    if (!confirmed) return;

    this.actionLoadingId.set(user.id);
    const success = await this.store.rejectUser(user.id);
    this.actionLoadingId.set(null);
    if (success) {
      this.alert.toastWarning('Request Rejected', `Registration for ${user.name} was rejected.`);
    } else {
      this.alert.toastError('Rejection Failed', `Could not update status for ${user.name}.`);
    }
  }

  async onDeactivateUser(user: AppUser) {
    const confirmed = await this.alert.confirm(
      'Deactivate User Account?',
      `Are you sure you want to suspend "${user.name}"? They will be immediately blocked from signing in.`,
      'Deactivate User',
      'Cancel',
      true
    );
    if (!confirmed) return;

    this.actionLoadingId.set(user.id);
    const success = await this.store.deactivateUser(user.id);
    this.actionLoadingId.set(null);
    if (success) {
      this.alert.toastWarning('User Deactivated', `Account for ${user.name} has been suspended.`);
    } else {
      this.alert.toastError('Action Failed', `Could not deactivate ${user.name}.`);
    }
  }

  async onReactivateUser(user: AppUser) {
    this.actionLoadingId.set(user.id);
    const success = await this.store.activateUser(user.id);
    this.actionLoadingId.set(null);
    if (success) {
      this.alert.toastSuccess('User Reactivated', `Account for ${user.name} is now Active.`);
    } else {
      this.alert.toastError('Activation Failed', `Could not reactivate ${user.name}.`);
    }
  }

  async onDeleteUser(user: AppUser) {
    const confirmed = await this.alert.confirm(
      'Permanently Delete Account?',
      `Are you sure you want to delete "${user.name}" (${user.email})? This action cannot be undone.`,
      'Delete User',
      'Cancel',
      true
    );
    if (!confirmed) return;

    this.actionLoadingId.set(user.id);
    const success = await this.store.deleteUserAccount(user.id);
    this.actionLoadingId.set(null);
    if (success) {
      this.alert.toastSuccess('Account Deleted', `Account for ${user.name} was permanently removed.`);
    } else {
      this.alert.toastError('Delete Failed', `Could not remove ${user.name}.`);
    }
  }

  async onDeleteCustomRole(role: RoleDefinition) {
    const confirmed = await this.alert.confirm(
      'Delete Custom Role?',
      `Are you sure you want to delete the custom role "${role.name}"?`,
      'Delete Role',
      'Cancel',
      true
    );
    if (!confirmed) return;

    this.store.deleteCustomRole(role.id);
    this.alert.toastSuccess('Role Removed', `Custom role "${role.name}" has been deleted.`);
  }

  onSelectRole(roleId: string) {
    this.roleSwitched.emit(roleId);
  }

  getUserInitials(name: string): string {
    if (!name) return 'DM';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  getAvatarBg(role: string): string {
    switch (role) {
      case 'manager': return 'bg-emerald-600';
      case 'installer': return 'bg-blue-600';
      case 'shop_manager': return 'bg-cyan-600';
      case 'dispatcher': return 'bg-teal-600';
      case 'account_officer': return 'bg-amber-600';
      case 'client': return 'bg-indigo-600';
      default: return 'bg-purple-600';
    }
  }

  getStatusDotClass(status?: string): string {
    switch (status) {
      case 'pending': return 'bg-amber-500';
      case 'active': return 'bg-emerald-500';
      case 'deactivated': return 'bg-slate-400';
      case 'rejected': return 'bg-rose-500';
      default: return 'bg-emerald-500';
    }
  }

  getRoleName(roleId: string): string {
    const role = this.store.roles().find(r => r.id === roleId);
    return role ? role.name : roleId;
  }

  getRoleIcon(roleId: string): string {
    const role = this.store.roles().find(r => r.id === roleId);
    return role ? role.icon : 'person';
  }

  getRoleBadgeClass(roleId: string): string {
    switch (roleId) {
      case 'manager':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'installer':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'shop_manager':
        return 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
      case 'dispatcher':
        return 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'account_officer':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'client':
        return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      default:
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    }
  }

  getLoginAsTooltip(u?: AppUser): string {
    return 'Login As';
  }

  getPortalRouteForRole(role: string): string {
    switch (role) {
      case 'installer': return '/installer';
      case 'dispatcher': return '/dispatcher';
      case 'shop_manager': return '/shop';
      case 'client': return '/client';
      case 'account_officer': return '/finance';
      case 'manager': return '/overview';
      default: return '/overview';
    }
  }

  onLoginAs(u: AppUser): void {
    if (this.store.impersonationSession()?.targetUser?.id === u.id) {
      this.store.revertLoginAs();
    } else {
      this.store.loginAsUser(u);
      const targetPortal = this.getPortalRouteForRole(u.role);
      this.router.navigate([targetPortal]);
    }
  }
}
