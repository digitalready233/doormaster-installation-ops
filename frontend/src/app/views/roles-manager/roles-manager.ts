import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';
import { AppUser, AssignedInstallerTeamMember, InstallerTeam, RoleDefinition, RoleType, SYSTEM_EXTRA_FEATURES } from '../../models/installation.model';
import { EditUserModal } from '../../components/edit-user-modal/edit-user-modal';
import { EditRoleModal } from '../../components/edit-role-modal/edit-role-modal';
import { CustomRoleModal } from '../../components/custom-role-modal/custom-role-modal';

@Component({
  selector: 'app-roles-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule, EditUserModal, EditRoleModal, CustomRoleModal],
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

        <div class="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            (click)="onRefreshUsers()"
            [disabled]="isRefreshing()"
            class="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
            title="Sync users, teams, positions and roles from database"
          >
            <mat-icon class="!text-sm !w-4 !h-4" [class.animate-spin]="isRefreshing()">sync</mat-icon>
            <span class="hidden sm:inline">Sync All Data</span>
          </button>

          <button 
            type="button"
            (click)="openCreateTeamForm()"
            class="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">group_add</mat-icon>
            <span>+ Create Team</span>
          </button>

          <button 
            type="button"
            (click)="addUserModalOpened.emit()"
            class="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-white rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <mat-icon class="!text-sm !w-4 !h-4">person_add</mat-icon>
            <span>Add New User</span>
          </button>

          <button 
            type="button"
            (click)="openCreateTotallyNewRole()"
            class="px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs active:scale-95"
            title="Create a totally new role from scratch"
          >
            <mat-icon class="!text-sm !w-4 !h-4 text-indigo-600 dark:text-indigo-400">add_moderator</mat-icon>
            <span class="hidden sm:inline">Totally New Role</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs: User Directory vs Installation Teams & Squad Positions vs Role RBAC Definitions -->
      <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
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
          (click)="openTeamsWorkspace()"
          class="relative px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-b-2"
          [class]="activeTab() === 'teams' 
            ? 'border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-400' 
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <mat-icon class="!text-base">groups</mat-icon>
          <span>Installation Teams, Members & Positions</span>
          <span class="px-2 py-0.2 text-[10px] rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold">
            {{ store.installerTeams().length }} Teams
          </span>
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
              Staff, Installers & Clients
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
              <option value="admin">System Administrator</option>
              <option value="manager">Manager</option>
              <option value="installer">Installer</option>
              <option value="shop_manager">Shop Attendant</option>
              <option value="dispatcher">Driver</option>
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
                                @let teamInfo = store.getUserTeamInfo(u);
                                @if (teamInfo.team) {
                                  <button
                                    type="button"
                                    (click)="openTeamInSettings(teamInfo.team.id)"
                                    class="text-[9px] px-1.5 py-0.5 rounded font-bold border inline-flex items-center gap-1 cursor-pointer hover:opacity-85 transition-opacity"
                                    [class]="teamInfo.team.id === 'team-bravo' || teamInfo.color === 'amber'
                                      ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                      : 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800'"
                                    title="Click to open {{ teamInfo.team.name }} in Role Settings"
                                  >
                                    <mat-icon class="!text-[10px] !w-2.5 !h-2.5">groups</mat-icon>
                                    <span>{{ teamInfo.team.code ? 'Team ' + teamInfo.team.code : teamInfo.team.name }}</span>
                                    @if (teamInfo.position) {
                                      <span class="opacity-75">· {{ teamInfo.position }}</span>
                                    }
                                    @if (teamInfo.isLead) {
                                      <span class="text-amber-600 dark:text-amber-400 font-black">★ Lead</span>
                                    }
                                  </button>
                                } @else {
                                  <button
                                    type="button"
                                    (click)="openAssignUserToTeam(u)"
                                    class="text-[9px] px-1.5 py-0.5 rounded font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-dashed border-slate-300 dark:border-slate-700 inline-flex items-center gap-1 cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors"
                                    title="Assign installer to a team & position"
                                  >
                                    <mat-icon class="!text-[10px] !w-2.5 !h-2.5">group_add</mat-icon>
                                    <span>Unassigned · Assign Team</span>
                                  </button>
                                }
                              } @else if (u.role === 'dispatcher') {
                                <span class="text-[9px] px-1.5 py-0.2 rounded font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 inline-flex items-center gap-0.5">
                                  <mat-icon class="!text-[10px] !w-2.5 !h-2.5">local_shipping</mat-icon>
                                  <span>Branch Driver</span>
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
                        <div class="flex flex-col items-start gap-1">
                          <span 
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border"
                            [class]="getRoleBadgeClass(u.role)"
                          >
                            <mat-icon class="!text-xs !w-3.5 !h-3.5">{{ getRoleIcon(u.role) }}</mat-icon>
                            <span>{{ getRoleName(u.role) }}</span>
                          </span>
                          @let assignedShop = store.getUserAssignedBranch(u);
                          @if (assignedShop) {
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                              <mat-icon class="!text-[11px] !w-3 !h-3">storefront</mat-icon>
                              <span>{{ assignedShop.shopName }} ({{ assignedShop.branchCode }})</span>
                            </span>
                          }
                        </div>
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

                          <!-- Login As / Temporary Session Round Icon Button -->
                          <button
                            type="button"
                            (click)="onLoginAs(u)"
                            [title]="store.impersonationSession()?.targetUser?.id === u.id ? 'Exit Login As' : 'Login As ' + u.name"
                            aria-label="Login As"
                            class="w-9 h-9 rounded-full transition-all flex items-center justify-center cursor-pointer active:scale-90 text-white shadow-sm"
                            [class]="store.impersonationSession()?.targetUser?.id === u.id
                              ? 'bg-gradient-to-br from-amber-500 to-orange-600 ring-2 ring-amber-400 animate-pulse'
                              : 'bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 ring-2 ring-teal-500/20 hover:ring-teal-500/45 hover:scale-105'"
                          >
                            <mat-icon class="!text-base !w-4 !h-4">
                              {{ store.impersonationSession()?.targetUser?.id === u.id ? 'logout' : 'switch_account' }}
                            </mat-icon>
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
      <!-- TAB 2: INSTALLATION TEAMS, MEMBERS & SQUAD POSITIONS               -->
      <!-- =================================================================== -->
      @if (activeTab() === 'teams') {
        <div class="space-y-5">

          <!-- Top Teams Banner & Create Team Toggle -->
          <div class="p-5 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-emerald-50/70 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-slate-900 border border-blue-200/80 dark:border-blue-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <mat-icon class="!text-2xl">groups</mat-icon>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-sm font-bold text-slate-900 dark:text-white">Installation Teams, Squad Members & Positions</h3>
                  <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    MySQL Live Synced
                  </span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  Create field installation squads, open any team to configure custom positions, assign or transfer installers, promote team leads, and keep every portal and user in real-time sync.
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                (click)="showCreateTeamPanel.set(!showCreateTeamPanel())"
                class="px-4 py-2.5 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                [class]="showCreateTeamPanel()
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'"
              >
                <mat-icon class="!text-base">{{ showCreateTeamPanel() ? 'expand_less' : 'group_add' }}</mat-icon>
                <span>{{ showCreateTeamPanel() ? 'Close Team Creator' : '+ Create New Team' }}</span>
              </button>
            </div>
          </div>

          <!-- CREATE NEW TEAM PANEL -->
          @if (showCreateTeamPanel()) {
            <div class="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-400/80 dark:border-blue-600/80 p-5 shadow-md space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <mat-icon class="!text-lg">group_add</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-sm font-black text-slate-900 dark:text-white">Create New Installation Team</h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400">Saved to MySQL and immediately available across Operations Manager, Installer & Role Settings portals.</p>
                  </div>
                </div>
                <button
                  type="button"
                  (click)="showCreateTeamPanel.set(false)"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <mat-icon class="!text-base">close</mat-icon>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Team Name <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    [ngModel]="newTeamName()"
                    (ngModelChange)="newTeamName.set($event)"
                    placeholder="e.g. Team Charlie - Commercial Fire & Pivot Squad"
                    class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Squad Code
                  </label>
                  <input
                    type="text"
                    [ngModel]="newTeamCode()"
                    (ngModelChange)="newTeamCode.set($event)"
                    placeholder="e.g. CHARLIE or DELTA"
                    class="w-full px-3 py-2 rounded-xl text-xs font-mono uppercase border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Team Description & Scope
                  </label>
                  <input
                    type="text"
                    [ngModel]="newTeamDescription()"
                    (ngModelChange)="newTeamDescription.set($event)"
                    placeholder="Specialized field squad for high-security doors, smart locks, and acoustic seals..."
                    class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Squad Badge Theme
                  </label>
                  <div class="grid grid-cols-4 gap-1.5">
                    @for (c of teamColorOptions; track c.id) {
                      <button
                        type="button"
                        (click)="newTeamColor.set(c.id)"
                        class="px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1"
                        [class]="newTeamColor() === c.id
                          ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
                      >
                        <span class="w-2 h-2 rounded-full" [class]="c.dot"></span>
                        <span>{{ c.label }}</span>
                      </button>
                    }
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Specialties (Comma separated)
                  </label>
                  <input
                    type="text"
                    [ngModel]="newTeamSpecialties()"
                    (ngModelChange)="newTeamSpecialties.set($event)"
                    placeholder="Smart Lock Biometrics, Pivot Doors, Acoustic Seals"
                    class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Initial Team Positions (Comma separated — you can also add/edit after opening the team)
                  </label>
                  <input
                    type="text"
                    [ngModel]="newTeamPositionsInput()"
                    (ngModelChange)="newTeamPositionsInput.set($event)"
                    placeholder="Team Lead, Lead Master Installer, Smart Lock Specialist, Senior Acoustic Installer, Precision Joiner Installer, Assistant Installer"
                    class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  (click)="showCreateTeamPanel.set(false)"
                  class="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  (click)="onCreateTeamSubmit()"
                  [disabled]="teamSaving() || !newTeamName().trim()"
                  class="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <mat-icon class="!text-sm">check_circle</mat-icon>
                  <span>{{ teamSaving() ? 'Creating Team...' : 'Create Team & Open Workspace' }}</span>
                </button>
              </div>
            </div>
          }

          <!-- TEAMS GRID SELECTOR: Click any team to open its Members & Positions Workspace -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Select a Team to Open in Role Settings ({{ store.installerTeams().length }})
                </span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400">
                  — Click any team card below to manage its members, lead & positions
                </span>
              </div>
              @if (unassignedInstallers().length > 0) {
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  {{ unassignedInstallers().length }} Unassigned Installer(s) Available
                </span>
              }
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              @for (team of store.installerTeams(); track team.id) {
                @let isOpened = openedTeam()?.id === team.id;
                <div
                  (click)="selectTeamToOpen(team)"
                  class="rounded-2xl border p-4 transition-all cursor-pointer flex flex-col justify-between"
                  [class]="isOpened
                    ? 'border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 shadow-xs'"
                >
                  <div>
                    <div class="flex items-start justify-between gap-2 mb-2">
                      <div class="flex items-center gap-2 min-w-0">
                        <div
                          class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs"
                          [class]="team.id === 'team-bravo' || team.color === 'amber'
                            ? 'bg-amber-600'
                            : team.color === 'emerald'
                              ? 'bg-emerald-600'
                              : team.color === 'purple'
                                ? 'bg-purple-600'
                                : 'bg-blue-600'"
                        >
                          <mat-icon class="!text-base">groups</mat-icon>
                        </div>
                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-[10px] font-mono font-black uppercase px-1.5 py-0.2 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                              TEAM {{ team.code }}
                            </span>
                            @if (isOpened) {
                              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">
                                Opened Below
                              </span>
                            }
                          </div>
                          <h4 class="text-xs font-black text-slate-900 dark:text-white truncate mt-0.5">{{ team.name }}</h4>
                        </div>
                      </div>

                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 shrink-0">
                        {{ team.members.length }} Member{{ team.members.length === 1 ? '' : 's' }}
                      </span>
                    </div>

                    <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {{ team.description }}
                    </p>

                    <!-- Member Badges with Positions -->
                    <div class="space-y-1 mb-3">
                      @if (team.members.length === 0) {
                        <div class="px-2.5 py-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-dashed border-amber-300 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5">
                          <mat-icon class="!text-xs">person_add</mat-icon>
                          <span>No members yet — click to add members & positions</span>
                        </div>
                      } @else {
                        @for (m of team.members; track m.id) {
                          <div class="flex items-center justify-between gap-2 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 text-[10px]">
                            <div class="flex items-center gap-1.5 min-w-0">
                              <span
                                class="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black shrink-0"
                                [class]="m.role === 'lead' || m.isTeamLead
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-blue-600 text-white'"
                              >
                                {{ m.role === 'lead' || m.isTeamLead ? '★' : 'T' }}
                              </span>
                              <span class="font-bold text-slate-800 dark:text-slate-100 truncate">{{ m.name }}</span>
                            </div>
                            <span class="px-1.5 py-0.2 rounded font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                              {{ m.position || (m.role === 'lead' ? 'Team Lead' : 'Installer') }}
                            </span>
                          </div>
                        }
                      }
                    </div>
                  </div>

                  <div class="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                    <span class="text-slate-500 dark:text-slate-400 font-mono">
                      {{ (team.positions || []).length }} defined positions
                    </span>
                    <span class="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                      <span>{{ isOpened ? 'Workspace Active' : 'Open Team Settings' }}</span>
                      <mat-icon class="!text-xs">arrow_forward</mat-icon>
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- =============================================================== -->
          <!-- OPENED TEAM WORKSPACE (Manage Team Details, Positions & Members)-->
          <!-- =============================================================== -->
          @if (openedTeam(); as activeTeam) {
            <div class="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500/70 dark:border-blue-500/60 shadow-md overflow-hidden">

              <!-- Opened Team Header Bar -->
              <div class="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="flex items-start gap-3.5">
                  <div class="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md font-black text-sm">
                    {{ activeTeam.code.substring(0, 3) }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                        OPENED TEAM IN ROLE SETTINGS · {{ activeTeam.id }}
                      </span>
                      <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {{ activeTeam.members.length }} Active Member(s)
                      </span>
                    </div>
                    <h3 class="text-base sm:text-lg font-black text-white mt-1">{{ activeTeam.name }}</h3>
                    <p class="text-xs text-slate-300 mt-0.5">{{ activeTeam.description }}</p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    (click)="toggleEditOpenedTeamMeta(activeTeam)"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <mat-icon class="!text-sm">edit</mat-icon>
                    <span>{{ editingTeamMeta() ? 'Close Team Info Editor' : 'Edit Team Details' }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="onDeleteTeam(activeTeam)"
                    [disabled]="teamSaving()"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
                  >
                    <mat-icon class="!text-sm">delete_outline</mat-icon>
                    <span>Delete Team</span>
                  </button>
                </div>
              </div>

              <!-- Optional Inline Team Metadata Editor -->
              @if (editingTeamMeta()) {
                <div class="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 space-y-3">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="md:col-span-2">
                      <label class="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Team Name</label>
                      <input
                        type="text"
                        [ngModel]="editTeamName()"
                        (ngModelChange)="editTeamName.set($event)"
                        class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Team Code</label>
                      <input
                        type="text"
                        [ngModel]="editTeamCode()"
                        (ngModelChange)="editTeamCode.set($event)"
                        class="w-full px-3 py-2 rounded-xl text-xs font-mono uppercase border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Description</label>
                      <input
                        type="text"
                        [ngModel]="editTeamDescription()"
                        (ngModelChange)="editTeamDescription.set($event)"
                        class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Specialties (comma-separated)</label>
                      <input
                        type="text"
                        [ngModel]="editTeamSpecialties()"
                        (ngModelChange)="editTeamSpecialties.set($event)"
                        class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button
                      type="button"
                      (click)="editingTeamMeta.set(false)"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      (click)="saveOpenedTeamMeta(activeTeam)"
                      [disabled]="teamSaving()"
                      class="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50"
                    >
                      Save Team Details
                    </button>
                  </div>
                </div>
              }

              <div class="p-4 sm:p-6 space-y-6">

                <!-- 1. TEAM POSITIONS MANAGER -->
                <div class="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <mat-icon class="!text-base text-indigo-600 dark:text-indigo-400">badge</mat-icon>
                        <span>1. Squad Positions in {{ activeTeam.name }} ({{ (activeTeam.positions || []).length }})</span>
                      </h4>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400">
                        Define the official positions available inside this team. Any member added or edited below can be assigned to one of these positions.
                      </p>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <input
                        type="text"
                        [ngModel]="newPositionTitle()"
                        (ngModelChange)="newPositionTitle.set($event)"
                        (keydown.enter)="onAddPositionToTeam(activeTeam)"
                        placeholder="New position (e.g. Master Lock Calibrator)..."
                        class="px-3 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-56 sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        (click)="onAddPositionToTeam(activeTeam)"
                        [disabled]="teamSaving() || !newPositionTitle().trim()"
                        class="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 cursor-pointer shrink-0 disabled:opacity-50"
                      >
                        <mat-icon class="!text-sm">add</mat-icon>
                        <span>Add Position</span>
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-1.5 pt-1">
                    @for (pos of activeTeam.positions || []; track pos) {
                      <span
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all"
                        [class]="selectedMemberPosition() === pos
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'"
                      >
                        <mat-icon class="!text-xs !w-3.5 !h-3.5 text-indigo-500">workspace_premium</mat-icon>
                        <span>{{ pos }}</span>
                        <button
                          type="button"
                          (click)="onRemovePositionFromTeam(activeTeam, pos)"
                          class="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer ml-0.5"
                          title="Remove position from team"
                        >
                          <mat-icon class="!text-xs !w-3.5 !h-3.5">close</mat-icon>
                        </button>
                      </span>
                    }
                  </div>
                </div>

                <!-- 2. CURRENT TEAM MEMBERS & POSITION ASSIGNMENTS -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <mat-icon class="!text-base text-blue-600 dark:text-blue-400">engineering</mat-icon>
                        <span>2. Current Team Members & Assigned Positions ({{ activeTeam.members.length }})</span>
                      </h4>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400">
                        Click any position pill on a member row to update their squad position, promote a member to Team Lead ★, or remove them from this team.
                      </p>
                    </div>
                  </div>

                  @if (activeTeam.members.length === 0) {
                    <div class="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-1">
                      <mat-icon class="!text-2xl text-slate-400">group_off</mat-icon>
                      <p class="text-xs font-bold text-slate-700 dark:text-slate-300">No installers assigned to {{ activeTeam.name }} yet</p>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400">Use section 3 below to add existing installers or create a new installer directly into this team.</p>
                    </div>
                  } @else {
                    <div class="grid grid-cols-1 gap-3">
                      @for (member of activeTeam.members; track member.id) {
                        @let isLead = member.role === 'lead' || member.isTeamLead || activeTeam.leadId === member.id;
                        <div
                          class="p-3.5 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                          [class]="isLead
                            ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
                        >
                          <!-- Member Identity -->
                          <div class="flex items-center gap-3 min-w-0">
                            <div
                              class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 shadow-xs"
                              [class]="isLead ? 'bg-amber-500 text-slate-950' : 'bg-blue-600 text-white'"
                            >
                              {{ getUserInitials(member.name) }}
                            </div>
                            <div class="min-w-0">
                              <div class="flex items-center gap-1.5 flex-wrap">
                                <span class="text-xs font-black text-slate-900 dark:text-white">{{ member.name }}</span>
                                @if (isLead) {
                                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-500 text-slate-950">
                                    ★ TEAM LEAD
                                  </span>
                                } @else {
                                  <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    Squad Member
                                  </span>
                                }
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                  Position: {{ member.position || (isLead ? 'Team Lead' : 'Installation Installer') }}
                                </span>
                              </div>
                              <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3 mt-0.5 flex-wrap">
                                <span>{{ member.phone }}</span>
                                @if (member.email) {
                                  <span>· {{ member.email }}</span>
                                }
                                <span class="font-mono text-[10px] text-slate-400">ID: {{ member.id }}</span>
                              </div>
                            </div>
                          </div>

                          <!-- Position Grid Pills & Member Actions -->
                          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                            <!-- Quick Position Selector Grid Pills -->
                            <div class="flex flex-wrap items-center gap-1">
                              @for (pos of activeTeam.positions || []; track pos) {
                                <button
                                  type="button"
                                  (click)="onChangeMemberPosition(activeTeam, member, pos)"
                                  [disabled]="teamSaving()"
                                  class="px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer"
                                  [class]="member.position === pos
                                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'"
                                  title="Set {{ member.name }}'s position to {{ pos }}"
                                >
                                  {{ pos }}
                                </button>
                              }
                            </div>

                            <div class="flex items-center gap-1.5 shrink-0">
                              @if (!isLead) {
                                <button
                                  type="button"
                                  (click)="onPromoteMemberToLead(activeTeam, member)"
                                  [disabled]="teamSaving()"
                                  class="px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1 cursor-pointer"
                                  title="Promote this member to Team Lead"
                                >
                                  <mat-icon class="!text-xs !w-3.5 !h-3.5">star</mat-icon>
                                  <span>Make Lead</span>
                                </button>
                              }

                              <button
                                type="button"
                                (click)="onRemoveMemberFromTeam(activeTeam, member)"
                                [disabled]="teamSaving()"
                                class="px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1 cursor-pointer"
                                title="Remove member from this team"
                              >
                                <mat-icon class="!text-xs !w-3.5 !h-3.5">person_remove</mat-icon>
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>

                <!-- 3. ADD MEMBERS & ASSIGN POSITION TO THIS OPENED TEAM -->
                <div class="p-4 sm:p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/70 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 class="text-xs font-black uppercase tracking-wider text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                        <mat-icon class="!text-base text-blue-600 dark:text-blue-400">person_add_alt_1</mat-icon>
                        <span>3. Add Member & Assign Position to {{ activeTeam.name }}</span>
                      </h4>
                      <p class="text-[11px] text-slate-600 dark:text-slate-400">
                        Select an existing installer/user from the grid OR register a brand-new installer directly into {{ activeTeam.name }} with their squad position.
                      </p>
                    </div>

                    <!-- Mode Switcher: Existing User Grid vs Quick-Register New Installer -->
                    <div class="inline-flex rounded-xl p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0">
                      <button
                        type="button"
                        (click)="addMemberMode.set('existing')"
                        class="px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                        [class]="addMemberMode() === 'existing'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'"
                      >
                        Select Existing User ({{ candidateUsersForTeam().length }})
                      </button>
                      <button
                        type="button"
                        (click)="addMemberMode.set('new')"
                        class="px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                        [class]="addMemberMode() === 'new'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'"
                      >
                        + Register New Installer Into Team
                      </button>
                    </div>
                  </div>

                  @if (addMemberMode() === 'existing') {
                    <!-- Grid Select of Available Users/Installers -->
                    <div class="space-y-2">
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Step A: Click an Installer / User Card to Select
                      </label>

                      @if (candidateUsersForTeam().length === 0) {
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                          All installers are already in this team. Switch to <strong>+ Register New Installer Into Team</strong> above to add a new installer.
                        </div>
                      } @else {
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                          @for (candidate of candidateUsersForTeam(); track candidate.id) {
                            @let candTeam = store.getUserTeamInfo(candidate);
                            @let isSelected = selectedCandidateUserId() === candidate.id;
                            <div
                              (click)="selectCandidateUserForTeam(candidate)"
                              class="p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2"
                              [class]="isSelected
                                ? 'border-blue-600 dark:border-blue-400 bg-blue-600/10 dark:bg-blue-500/20 ring-2 ring-blue-500/20'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400'"
                            >
                              <div class="flex items-center gap-2.5 min-w-0">
                                <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                                  {{ getUserInitials(candidate.name) }}
                                </div>
                                <div class="min-w-0">
                                  <div class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ candidate.name }}</div>
                                  <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ candidate.phone || candidate.email }}</div>
                                  @if (candTeam.team) {
                                    <span class="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                                      Currently in {{ candTeam.team.code }} ({{ candTeam.position || 'Tech' }})
                                    </span>
                                  } @else {
                                    <span class="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                                      Unassigned · Ready
                                    </span>
                                  }
                                </div>
                              </div>
                              <mat-icon class="!text-base shrink-0" [class]="isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-700'">
                                {{ isSelected ? 'check_circle' : 'radio_button_unchecked' }}
                              </mat-icon>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  } @else {
                    <!-- Quick-Register New Installer Directly Into Opened Team -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                        <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Full Name <span class="text-rose-500">*</span></label>
                        <input
                          type="text"
                          [ngModel]="quickMemberName()"
                          (ngModelChange)="quickMemberName.set($event)"
                          placeholder="e.g. Kwesi Boateng"
                          class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Email Address <span class="text-rose-500">*</span></label>
                        <input
                          type="email"
                          [ngModel]="quickMemberEmail()"
                          (ngModelChange)="quickMemberEmail.set($event)"
                          placeholder="k.boateng@doormasterops.com"
                          class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Phone Number <span class="text-rose-500">*</span></label>
                        <input
                          type="text"
                          [ngModel]="quickMemberPhone()"
                          (ngModelChange)="quickMemberPhone.set($event)"
                          placeholder="+233 24 555 0199"
                          class="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  }

                  <!-- Step B: Select Position & Squad Role (Grid Pills) -->
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2 border-t border-blue-200/60 dark:border-blue-800/50">
                    <div class="lg:col-span-2 space-y-1.5">
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Step B: Select Position in {{ activeTeam.name }}
                      </label>
                      <div class="flex flex-wrap gap-1.5">
                        @for (pos of activeTeam.positions || []; track pos) {
                          <button
                            type="button"
                            (click)="selectedMemberPosition.set(pos)"
                            class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer"
                            [class]="selectedMemberPosition() === pos
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'"
                          >
                            {{ pos }}
                          </button>
                        }
                      </div>
                    </div>

                    <div class="space-y-1.5">
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Step C: Squad Authority
                      </label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          (click)="selectedMemberRole.set('assistant')"
                          class="px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          [class]="selectedMemberRole() === 'assistant'
                            ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
                        >
                          <mat-icon class="!text-sm">engineering</mat-icon>
                          <span>Squad Member</span>
                        </button>
                        <button
                          type="button"
                          (click)="selectedMemberRole.set('lead')"
                          class="px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          [class]="selectedMemberRole() === 'lead'
                            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'"
                        >
                          <mat-icon class="!text-sm">star</mat-icon>
                          <span>★ Team Lead</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end pt-2">
                    <button
                      type="button"
                      (click)="onAddMemberToOpenedTeam(activeTeam)"
                      [disabled]="teamSaving() || (addMemberMode() === 'existing' ? !selectedCandidateUserId() : (!quickMemberName().trim() || !quickMemberEmail().trim()))"
                      class="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      <mat-icon class="!text-base">group_add</mat-icon>
                      <span>
                        {{ teamSaving()
                          ? 'Saving & Syncing...'
                          : addMemberMode() === 'existing'
                            ? 'Add Selected Member & Save Position to ' + activeTeam.code
                            : 'Create Installer & Add to ' + activeTeam.code }}
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          }
        </div>
      }

      <!-- =================================================================== -->
      <!-- TAB 3: ROLE DEFINITIONS & EXTENSIBLE RBAC                          -->
      <!-- =================================================================== -->
      @if (activeTab() === 'roles') {
        
        <!-- Totally New Role Action Banner -->
        <div class="p-5 bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-blue-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div class="flex items-start gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <mat-icon class="!text-2xl">add_moderator</mat-icon>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Create a Totally New Operational Role</h3>
                <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  Extensibility
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Need an entirely new organizational position (e.g. Subcontractor Lead, Quality Assurance Inspector, Regional Site Surveyor)?
                Define a totally new role from scratch with tailored base permissions and extra features.
              </p>
            </div>
          </div>

          <button 
            type="button"
            (click)="openCreateTotallyNewRole()"
            class="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <mat-icon class="!text-base">add_circle</mat-icon>
            <span>+ Create Totally New Role</span>
          </button>
        </div>

        <!-- Roles Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (role of store.roles(); track role.id) {
            <div 
              class="bg-white dark:bg-slate-900 rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between"
              [class]="store.currentRole() === role.id ? 'border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/10 dark:ring-white/10' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'"
            >
              <div>
                <!-- Role Card Header -->
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
                      <mat-icon class="!text-base">{{ role.icon }}</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ role.name }}</h3>
                      <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">{{ role.label }}</span>
                    </div>
                  </div>

                  <div>
                    @if (role.isSystem) {
                      <span class="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                        Core System
                      </span>
                    } @else {
                      <span class="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-400 rounded-md">
                        Custom Extension
                      </span>
                    }
                  </div>
                </div>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {{ role.description }}
                </p>

                <!-- Core Permissions Matrix List (FIXED & LOCKED) -->
                <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div class="flex items-center justify-between pb-1">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <mat-icon class="!text-xs text-amber-500">lock</mat-icon>
                      <span>Core Permissions (Fixed)</span>
                    </span>
                    <span class="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-900/60">
                      Immutable
                    </span>
                  </div>

                  <div class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Create / Book Jobs</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canCreateJobs ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canCreateJobs ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Assign Installers</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canAssignInstallers ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canAssignInstallers ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Dispatch Doors From Shop</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canDispatchDoors ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canDispatchDoors ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Clock In / Out On Site</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canClockInOut ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canClockInOut ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Sign Customer Verification</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canSignVerification ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canSignVerification ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Authorize Installer Bonuses</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canApproveBonuses ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canApproveBonuses ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>View Financial Ledger</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canViewFinancials ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canViewFinancials ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <mat-icon class="!text-[11px] !w-3 !h-3 text-slate-400">lock</mat-icon>
                        <span>Manage User Accounts</span>
                      </span>
                      <mat-icon class="!text-sm" [class]="role.permissions.canManageRoles ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'">
                        {{ role.permissions.canManageRoles ? 'check_circle' : 'remove_circle_outline' }}
                      </mat-icon>
                    </div>
                  </div>
                </div>

                <!-- Configurable Extra Features (EDITABLE) -->
                <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                      <mat-icon class="!text-xs">extension</mat-icon>
                      <span>Extra Features ({{ (role.extraFeatures || []).length }})</span>
                    </span>
                    <button 
                      type="button" 
                      (click)="openEditRole(role)"
                      class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-0.5 cursor-pointer"
                    >
                      <mat-icon class="!text-xs">tune</mat-icon>
                      <span>Edit Features</span>
                    </button>
                  </div>

                  @if ((role.extraFeatures || []).length === 0) {
                    <p class="text-[11px] text-slate-400 dark:text-slate-500 italic py-1">
                      No extra features active. Click "Edit Features" to add capabilities.
                    </p>
                  } @else {
                    <div class="flex flex-wrap gap-1.5 pt-1">
                      @for (featId of role.extraFeatures || []; track featId) {
                        <span 
                          class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 flex items-center gap-1 shadow-2xs"
                        >
                          <mat-icon class="!text-[10px] !w-2.5 !h-2.5 text-indigo-600 dark:text-indigo-400">check</mat-icon>
                          <span>{{ getExtraFeatureShortName(featId) }}</span>
                        </span>
                      }
                    </div>
                  }
                </div>

                <!-- Installer Role Card: Direct Teams, Members & Positions Launcher -->
                @if (role.id === 'installer') {
                  <div class="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/60 space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1">
                        <mat-icon class="!text-xs">groups</mat-icon>
                        <span>Installation Teams ({{ store.installerTeams().length }})</span>
                      </span>
                      <button
                        type="button"
                        (click)="openCreateTeamForm()"
                        class="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <mat-icon class="!text-xs">group_add</mat-icon>
                        <span>+ New Team</span>
                      </button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      @for (t of store.installerTeams(); track t.id) {
                        <button
                          type="button"
                          (click)="openTeamInSettings(t.id)"
                          class="px-2 py-1 rounded-lg text-[10px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
                          title="Open {{ t.name }} to manage members & positions"
                        >
                          <span>Team {{ t.code }}</span>
                          <span class="opacity-75">({{ t.members.length }})</span>
                        </button>
                      }
                    </div>
                  </div>
                }

              </div>

              <!-- Card Bottom Actions -->
              <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button 
                  type="button" 
                  (click)="openEditRole(role)"
                  class="px-3 py-1.5 text-xs font-semibold rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Configure and edit extra features for this role"
                >
                  <mat-icon class="!text-sm">tune</mat-icon>
                  <span>Edit Extra Features</span>
                </button>

                <div class="flex items-center gap-2">
                  @if (store.currentRole() === role.id) {
                    <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Active
                    </span>
                  } @else {
                    <button 
                      type="button" 
                      (click)="onSelectRole(role.id)"
                      class="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                    >
                      Switch →
                    </button>
                  }

                  @if (!role.isSystem) {
                    <button 
                      type="button" 
                      (click)="onDeleteCustomRole(role)"
                      class="text-xs text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      title="Delete custom role"
                    >
                      <mat-icon class="!text-sm">delete</mat-icon>
                    </button>
                  }
                </div>
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
          (userUpdated)="onUserUpdated()"
        />
      }

      <!-- Edit Role Features Modal -->
      @if (editingRole(); as roleToEdit) {
        <app-edit-role-modal
          [role]="roleToEdit"
          (closed)="editingRole.set(null)"
          (roleUpdated)="onRoleUpdated($event)"
        />
      }

      <!-- Create Totally New Role Modal -->
      @if (creatingNewRole()) {
        <app-custom-role-modal
          (closed)="onCustomRoleModalClosed()"
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

  readonly activeTab = signal<'users' | 'teams' | 'roles'>('users');
  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<string>('all');
  readonly roleFilter = signal<string>('all');
  readonly actionLoadingId = signal<string | null>(null);
  readonly isRefreshing = signal<boolean>(false);
  readonly editingUser = signal<AppUser | null>(null);
  readonly editingRole = signal<RoleDefinition | null>(null);
  readonly creatingNewRole = signal<boolean>(false);

  // Team Creation, Opened Team & Positions State
  readonly selectedTeamId = signal<string>('team-alpha');
  readonly showCreateTeamPanel = signal<boolean>(false);
  readonly teamSaving = signal<boolean>(false);
  readonly editingTeamMeta = signal<boolean>(false);

  readonly newTeamName = signal<string>('');
  readonly newTeamCode = signal<string>('');
  readonly newTeamDescription = signal<string>('');
  readonly newTeamColor = signal<string>('indigo');
  readonly newTeamSpecialties = signal<string>('Architectural Door Fitting, Smart Lock Calibration, Multi-Point Hardware');
  readonly newTeamPositionsInput = signal<string>(
    'Team Lead, Lead Master Installer, Senior Acoustic Installer, Smart Lock Specialist, Precision Joiner Installer, Installation Installer'
  );

  readonly editTeamName = signal<string>('');
  readonly editTeamCode = signal<string>('');
  readonly editTeamDescription = signal<string>('');
  readonly editTeamSpecialties = signal<string>('');

  readonly newPositionTitle = signal<string>('');
  readonly addMemberMode = signal<'existing' | 'new'>('existing');
  readonly selectedCandidateUserId = signal<string>('');
  readonly selectedMemberPosition = signal<string>('Installation Installer');
  readonly selectedMemberRole = signal<'lead' | 'assistant'>('assistant');

  readonly quickMemberName = signal<string>('');
  readonly quickMemberEmail = signal<string>('');
  readonly quickMemberPhone = signal<string>('+233 24 555 ');

  readonly teamColorOptions = [
    { id: 'indigo', label: 'Blue', dot: 'bg-blue-600' },
    { id: 'amber', label: 'Amber', dot: 'bg-amber-500' },
    { id: 'emerald', label: 'Emerald', dot: 'bg-emerald-500' },
    { id: 'purple', label: 'Purple', dot: 'bg-purple-600' }
  ];

  readonly openedTeam = computed<InstallerTeam | null>(() => {
    const teams = this.store.installerTeams();
    if (teams.length === 0) return null;
    const targetId = this.selectedTeamId();
    return teams.find(t => t.id === targetId) || teams[0];
  });

  readonly unassignedInstallers = computed<AppUser[]>(() => {
    return this.store.users().filter(u => {
      if (u.role !== 'installer' || u.status === 'rejected' || u.status === 'deactivated') return false;
      const info = this.store.getUserTeamInfo(u);
      return !info.team;
    });
  });

  readonly candidateUsersForTeam = computed<AppUser[]>(() => {
    const opened = this.openedTeam();
    const memberIds = new Set((opened?.members || []).map(m => m.id));
    const installers = this.store.users().filter(
      u => u.role === 'installer' && u.status !== 'rejected' && u.status !== 'deactivated' && !memberIds.has(u.id)
    );
    // Sort unassigned installers first
    return [...installers].sort((a, b) => {
      const aHasTeam = !!this.store.getUserTeamInfo(a).team;
      const bHasTeam = !!this.store.getUserTeamInfo(b).team;
      if (aHasTeam !== bHasTeam) return aHasTeam ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
  });

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
    await this.store.syncLiveCrossUserState();
    this.isRefreshing.set(false);
    this.alert.toastSuccess('All Data Synced', 'Synced latest users, installation teams, positions, and roles from database.');
  }

  openTeamsWorkspace() {
    this.activeTab.set('teams');
    const current = this.openedTeam();
    if (current && current.positions && current.positions.length > 0) {
      this.selectedMemberPosition.set(current.positions[0]);
    }
  }

  openCreateTeamForm() {
    this.activeTab.set('teams');
    this.showCreateTeamPanel.set(true);
  }

  openTeamInSettings(teamId: string) {
    this.selectedTeamId.set(teamId);
    this.activeTab.set('teams');
    this.editingTeamMeta.set(false);
    const matched = this.store.installerTeams().find(t => t.id === teamId);
    if (matched?.positions?.length) {
      this.selectedMemberPosition.set(matched.positions[0]);
    }
  }

  openAssignUserToTeam(user: AppUser) {
    this.activeTab.set('teams');
    this.addMemberMode.set('existing');
    this.selectedCandidateUserId.set(user.id);
    if (user.teamPosition) {
      this.selectedMemberPosition.set(user.teamPosition);
    }
  }

  selectTeamToOpen(team: InstallerTeam) {
    this.selectedTeamId.set(team.id);
    this.editingTeamMeta.set(false);
    if (team.positions && team.positions.length > 0) {
      this.selectedMemberPosition.set(team.positions[0]);
    }
  }

  selectCandidateUserForTeam(user: AppUser) {
    this.selectedCandidateUserId.set(user.id);
    if (user.teamPosition) {
      this.selectedMemberPosition.set(user.teamPosition);
    }
  }

  async onCreateTeamSubmit() {
    const name = this.newTeamName().trim();
    if (!name) return;

    const code = (this.newTeamCode().trim() || name.replace(/^team\s+/i, '').split(/\s+/)[0] || 'SQUAD').toUpperCase();
    const specialties = this.newTeamSpecialties()
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const positions = this.newTeamPositionsInput()
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    this.teamSaving.set(true);
    const res = await this.store.createInstallerTeam({
      name,
      code,
      description: this.newTeamDescription().trim() || `Dedicated DoorMaster field installation squad (${name}).`,
      color: this.newTeamColor(),
      specialties,
      positions
    });
    this.teamSaving.set(false);

    if (res.success) {
      this.showCreateTeamPanel.set(false);
      this.newTeamName.set('');
      this.newTeamCode.set('');
      this.newTeamDescription.set('');
      if (res.team?.id) {
        this.selectedTeamId.set(res.team.id);
      }
      this.alert.toastSuccess('Team Created', res.message);
    } else {
      this.alert.toastError('Team Creation Failed', res.message);
    }
  }

  toggleEditOpenedTeamMeta(team: InstallerTeam) {
    if (this.editingTeamMeta()) {
      this.editingTeamMeta.set(false);
      return;
    }
    this.editTeamName.set(team.name);
    this.editTeamCode.set(team.code);
    this.editTeamDescription.set(team.description || '');
    this.editTeamSpecialties.set((team.specialties || []).join(', '));
    this.editingTeamMeta.set(true);
  }

  async saveOpenedTeamMeta(team: InstallerTeam) {
    const name = this.editTeamName().trim();
    if (!name) return;
    const specialties = this.editTeamSpecialties()
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    this.teamSaving.set(true);
    const res = await this.store.updateInstallerTeam(team.id, {
      name,
      code: this.editTeamCode().trim().toUpperCase() || team.code,
      description: this.editTeamDescription().trim(),
      specialties
    });
    this.teamSaving.set(false);

    if (res.success) {
      this.editingTeamMeta.set(false);
      this.alert.toastSuccess('Team Updated', res.message);
    } else {
      this.alert.toastError('Update Failed', res.message);
    }
  }

  async onDeleteTeam(team: InstallerTeam) {
    const confirmed = await this.alert.confirm(
      `Delete ${team.name}?`,
      `Are you sure you want to delete "${team.name}"? Its members will remain active user accounts and become unassigned so you can place them in any other team.`,
      'Delete Team',
      'Cancel',
      true
    );
    if (!confirmed) return;

    this.teamSaving.set(true);
    const res = await this.store.deleteInstallerTeam(team.id);
    this.teamSaving.set(false);

    if (res.success) {
      const remaining = this.store.installerTeams();
      if (remaining.length > 0) {
        this.selectedTeamId.set(remaining[0].id);
      }
      this.alert.toastSuccess('Team Deleted', res.message);
    } else {
      this.alert.toastError('Delete Failed', res.message);
    }
  }

  async onAddPositionToTeam(team: InstallerTeam) {
    const title = this.newPositionTitle().trim();
    if (!title) return;
    const existing = team.positions || [];
    if (existing.includes(title)) {
      this.newPositionTitle.set('');
      this.selectedMemberPosition.set(title);
      return;
    }
    const updatedPositions = [...existing, title];
    this.teamSaving.set(true);
    const res = await this.store.updateInstallerTeam(team.id, { positions: updatedPositions });
    this.teamSaving.set(false);
    if (res.success) {
      this.newPositionTitle.set('');
      this.selectedMemberPosition.set(title);
      this.alert.toastSuccess('Position Added', `"${title}" added to ${team.name}.`);
    } else {
      this.alert.toastError('Could Not Add Position', res.message);
    }
  }

  async onRemovePositionFromTeam(team: InstallerTeam, pos: string) {
    const updatedPositions = (team.positions || []).filter(p => p !== pos);
    this.teamSaving.set(true);
    const res = await this.store.updateInstallerTeam(team.id, { positions: updatedPositions });
    this.teamSaving.set(false);
    if (res.success) {
      this.alert.toastSuccess('Position Removed', `"${pos}" removed from ${team.name}.`);
    } else {
      this.alert.toastError('Could Not Remove Position', res.message);
    }
  }

  async onChangeMemberPosition(team: InstallerTeam, member: AssignedInstallerTeamMember, position: string) {
    if (member.position === position) return;
    this.teamSaving.set(true);
    const res = await this.store.upsertTeamMember(team.id, {
      userId: member.id,
      position,
      teamRole: member.role === 'lead' || member.isTeamLead ? 'lead' : 'assistant'
    });
    this.teamSaving.set(false);
    if (res.success) {
      this.alert.toastSuccess('Position Updated', `${member.name} is now "${position}" in ${team.name}.`);
    } else {
      this.alert.toastError('Update Failed', res.message);
    }
  }

  async onPromoteMemberToLead(team: InstallerTeam, member: AssignedInstallerTeamMember) {
    this.teamSaving.set(true);
    const res = await this.store.upsertTeamMember(team.id, {
      userId: member.id,
      position: member.position || 'Team Lead',
      teamRole: 'lead'
    });
    this.teamSaving.set(false);
    if (res.success) {
      this.alert.toastSuccess('Team Lead Updated', `${member.name} is now Team Lead ★ for ${team.name}.`);
    } else {
      this.alert.toastError('Promotion Failed', res.message);
    }
  }

  async onRemoveMemberFromTeam(team: InstallerTeam, member: AssignedInstallerTeamMember) {
    const confirmed = await this.alert.confirm(
      'Remove Member From Team?',
      `Remove "${member.name}" from ${team.name}? Their user account remains active and can be assigned to any team.`,
      'Remove From Team',
      'Cancel',
      true
    );
    if (!confirmed) return;

    this.teamSaving.set(true);
    const res = await this.store.removeTeamMember(team.id, member.id);
    this.teamSaving.set(false);
    if (res.success) {
      this.alert.toastSuccess('Member Removed', res.message);
    } else {
      this.alert.toastError('Remove Failed', res.message);
    }
  }

  async onAddMemberToOpenedTeam(team: InstallerTeam) {
    const position = this.selectedMemberPosition().trim() || (this.selectedMemberRole() === 'lead' ? 'Team Lead' : 'Installation Installer');
    const teamRole = this.selectedMemberRole();

    if (this.addMemberMode() === 'existing') {
      const userId = this.selectedCandidateUserId();
      if (!userId) return;

      this.teamSaving.set(true);
      const res = await this.store.upsertTeamMember(team.id, {
        userId,
        position,
        teamRole
      });
      this.teamSaving.set(false);

      if (res.success) {
        this.selectedCandidateUserId.set('');
        this.alert.toastSuccess('Member Added to Team', res.message);
      } else {
        this.alert.toastError('Could Not Add Member', res.message);
      }
    } else {
      const name = this.quickMemberName().trim();
      const email = this.quickMemberEmail().trim();
      const phone = this.quickMemberPhone().trim() || '+233 24 555 0199';
      if (!name || !email) return;

      this.teamSaving.set(true);
      const res = await this.store.addNewUser({
        name,
        email,
        phone,
        role: 'installer',
        status: 'active',
        teamId: team.id,
        teamRole,
        teamPosition: position
      });
      this.teamSaving.set(false);

      if (res.success) {
        this.quickMemberName.set('');
        this.quickMemberEmail.set('');
        this.quickMemberPhone.set('+233 24 555 ');
        this.addMemberMode.set('existing');
        this.alert.toastSuccess('Installer Created & Added', `${name} added to ${team.name} as ${position}.`);
      } else {
        this.alert.toastError('Registration Failed', res.message);
      }
    }
  }

  onEditUser(user: AppUser) {
    this.editingUser.set(user);
  }

  async onApproveUser(user: AppUser) {
    this.actionLoadingId.set(user.id);
    const res = await this.store.approveUser(user.id);
    this.actionLoadingId.set(null);
    if (res.success) {
      this.alert.toastSuccess('User Approved', res.message || `Account for ${user.name} has been activated.`);
    } else {
      this.alert.toastError('Approval Failed', res.message || `Could not activate ${user.name}.`);
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
    const res = await this.store.rejectUser(user.id);
    this.actionLoadingId.set(null);
    if (res.success) {
      this.alert.toastWarning('Request Rejected', res.message || `Registration for ${user.name} was rejected.`);
    } else {
      this.alert.toastError('Rejection Failed', res.message || `Could not update status for ${user.name}.`);
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
    const res = await this.store.deactivateUser(user.id);
    this.actionLoadingId.set(null);
    if (res.success) {
      this.alert.toastWarning('User Deactivated', res.message || `Account for ${user.name} has been suspended.`);
    } else {
      this.alert.toastError('Action Failed', res.message || `Could not deactivate ${user.name}.`);
    }
  }

  async onReactivateUser(user: AppUser) {
    this.actionLoadingId.set(user.id);
    const res = await this.store.activateUser(user.id);
    this.actionLoadingId.set(null);
    if (res.success) {
      this.alert.toastSuccess('User Reactivated', res.message || `Account for ${user.name} is now Active.`);
    } else {
      this.alert.toastError('Activation Failed', res.message || `Could not reactivate ${user.name}.`);
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
    const res = await this.store.deleteUserAccount(user.id);
    this.actionLoadingId.set(null);
    if (res.success) {
      this.alert.toastSuccess('Account Deleted', res.message || `Account for ${user.name} was permanently removed.`);
    } else {
      this.alert.toastError('Delete Failed', res.message || `Could not remove ${user.name}.`);
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

    await this.store.deleteCustomRole(role.id);
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
      case 'admin': return 'bg-purple-600';
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
      case 'admin':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800';
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
      case 'admin': return '/overview';
      case 'installer': return '/map';
      case 'dispatcher': return '/overview';
      case 'shop_manager': return '/shop';
      case 'client': return '/map';
      case 'account_officer': return '/finance';
      case 'manager': return '/overview';
      default: return '/overview';
    }
  }

  openEditRole(role: RoleDefinition) {
    this.editingRole.set(role);
  }

  openCreateTotallyNewRole() {
    this.creatingNewRole.set(true);
    this.customRoleModalOpened.emit();
  }

  async onUserUpdated() {
    this.editingUser.set(null);
    await Promise.all([
      this.store.loadUsers(),
      this.store.loadTeamsFromBackend()
    ]);
  }

  async onRoleUpdated(role: RoleDefinition) {
    this.editingRole.set(null);
    await this.store.loadRolesFromBackend();
  }

  async onCustomRoleModalClosed() {
    this.creatingNewRole.set(false);
    await this.store.loadRolesFromBackend();
  }

  getExtraFeatureShortName(featId: string): string {
    const found = SYSTEM_EXTRA_FEATURES.find(f => f.id === featId);
    if (found) {
      switch (featId) {
        case 'export_reports': return 'CSV/Excel Export';
        case 'audit_logs': return 'Audit Logs';
        case 'sms_gateway': return 'SMS Gateway';
        case 'branch_registry': return 'Branch Registry';
        case 'catalog_scraper': return 'Catalog Scraper';
        case 'fleet_broadcast': return 'Fleet Broadcast';
        case 'quality_override': return 'Quality Override';
        case 'multi_branch': return 'Multi-Branch';
        default: return found.name;
      }
    }
    return featId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  async onLoginAs(u: AppUser): Promise<void> {
    if (this.store.impersonationSession()?.targetUser?.id === u.id) {
      await this.store.revertLoginAs();
    } else {
      await this.store.loginAsUser(u);
      const targetPortal = this.getPortalRouteForRole(u.role);
      void this.router.navigate([targetPortal]);
    }
  }
}
