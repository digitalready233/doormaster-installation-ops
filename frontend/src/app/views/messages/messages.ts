import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  ChatAttachment,
  ChatContact,
  ChatLocationShare,
  ChatMessage,
  MessagesService
} from '../../services/messages.service';
import { InstallationStore } from '../../services/installation.store';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-[calc(100dvh-10.5rem)] md:h-[calc(100dvh-6.5rem)] min-h-[480px] flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">

      <!-- =============================================================== -->
      <!-- LEFT PANE: CONTACTS & CHATS LIST (WhatsApp Sidebar)             -->
      <!-- =============================================================== -->
      <aside
        class="w-full md:w-[320px] lg:w-[360px] shrink-0 h-full md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        [class.hidden]="mobileShowChat() && !!selectedPeer()"
        [class.flex]="!(mobileShowChat() && !!selectedPeer())"
      >
        <!-- Left Header -->
        <div class="px-4 py-3 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {{ getInitials(messagesSvc.currentActorName()) }}
            </div>
            <div class="min-w-0">
              <h2 class="text-sm font-black text-slate-900 dark:text-white truncate">Messages</h2>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {{ messagesSvc.eligibleContacts().length }} contacts · {{ messagesSvc.totalUnreadCount() }} unread
              </p>
            </div>
          </div>

          <button
            type="button"
            (click)="messagesSvc.syncThreads()"
            class="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh messages"
          >
            <mat-icon class="!text-lg">refresh</mat-icon>
          </button>
        </div>

        <!-- Search & Category Filter Pills -->
        <div class="p-3 space-y-2 border-b border-slate-100 dark:border-slate-800">
          <div class="relative">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 !text-sm text-slate-400">search</mat-icon>
            <input
              type="text"
              [ngModel]="contactSearch()"
              (ngModelChange)="contactSearch.set($event)"
              placeholder="Search name, role, branch, or chat..."
              class="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            @if (contactSearch()) {
              <button
                type="button"
                (click)="contactSearch.set('')"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <mat-icon class="!text-xs">close</mat-icon>
              </button>
            }
          </div>

          <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] font-bold">
            @for (tab of contactFilterTabs(); track tab.id) {
              <button
                type="button"
                (click)="contactFilter.set(tab.id)"
                class="px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer"
                [class]="contactFilter() === tab.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
              >
                {{ tab.label }}
              </button>
            }
          </div>
        </div>

        <!-- Contact List -->
        <div class="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70">
          @if (filteredContacts().length === 0) {
            <div class="p-8 text-center text-xs text-slate-400 space-y-2">
              <mat-icon class="!text-3xl text-slate-300 dark:text-slate-600">forum</mat-icon>
              <p class="font-semibold text-slate-500 dark:text-slate-400">No contacts match your filter</p>
              <p>Try clearing search or switching the category pill above.</p>
            </div>
          } @else {
            @for (contact of filteredContacts(); track contact.id) {
              <button
                type="button"
                (click)="selectContact(contact)"
                class="w-full px-3.5 py-3 flex items-center gap-3 text-left transition-colors cursor-pointer"
                [class]="selectedPeer()?.id === contact.id
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-emerald-600'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'"
              >
                <!-- Avatar + Online Indicator -->
                <div class="relative shrink-0">
                  <div
                    class="w-11 h-11 rounded-full font-bold text-xs text-white flex items-center justify-center shadow-xs"
                    [class]="getAvatarColor(contact.role)"
                  >
                    {{ getInitials(contact.name) }}
                  </div>
                  <span
                    class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900"
                    [class]="contact.isOnline ? 'bg-emerald-500' : 'bg-slate-400'"
                    [title]="contact.isOnline ? 'Online' : 'Offline'"
                  ></span>
                </div>

                <!-- Contact Meta & Last Message -->
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {{ contact.name }}
                    </span>
                    @if (contact.lastMessage) {
                      <span
                        class="text-[10px] font-mono shrink-0"
                        [class]="contact.unreadCount > 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'"
                      >
                        {{ formatShortTime(contact.lastMessage.createdAt) }}
                      </span>
                    }
                  </div>

                  <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {{ contact.roleLabel }}
                    </span>
                    @if (contact.branchName) {
                      <span class="text-[10px] text-slate-400 truncate max-w-[140px]">· {{ contact.branchName }}</span>
                    }
                  </div>

                  <div class="flex items-center justify-between gap-2 mt-1">
                    @if (contact.isTyping) {
                      <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 italic truncate">
                        typing...
                      </span>
                    } @else if (contact.lastMessage) {
                      <span class="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                        @if (contact.lastMessage.senderId === messagesSvc.currentActorId()) {
                          <mat-icon
                            class="!text-[13px] !w-3.5 !h-3.5 shrink-0"
                            [class]="contact.lastMessage.readAt ? 'text-sky-500' : 'text-slate-400'"
                          >
                            {{ contact.lastMessage.readAt ? 'done_all' : 'done' }}
                          </mat-icon>
                        }
                        <span class="truncate">{{ getPreviewText(contact.lastMessage) }}</span>
                      </span>
                    } @else {
                      <span class="text-[11px] text-slate-400 italic truncate">Tap to start conversation</span>
                    }

                    @if (contact.unreadCount > 0) {
                      <span class="min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                        {{ contact.unreadCount }}
                      </span>
                    }
                  </div>
                </div>
              </button>
            }
          }
        </div>
      </aside>

      <!-- =============================================================== -->
      <!-- RIGHT PANE: ACTIVE CONVERSATION (WhatsApp Chat Area)            -->
      <!-- =============================================================== -->
      <section
        class="flex-1 h-full md:flex flex-col min-w-0 bg-[#efeae2] dark:bg-[#0b141a] relative"
        [class.hidden]="!mobileShowChat() || !selectedPeer()"
        [class.flex]="mobileShowChat() && !!selectedPeer()"
      >
        @if (!selectedPeer()) {
          <!-- Empty State -->
          <div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <mat-icon class="!text-4xl">chat</mat-icon>
            </div>
            <h3 class="text-base font-black text-slate-900 dark:text-white">DoorMaster Portal Messenger</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 max-w-sm mt-1.5 leading-relaxed">
              Select a conversation on the left to chat directly with your branch shop attendant, finance officer, manager, driver, or installer — share live GPS locations, tag tasks, send photos, or record voice notes.
            </p>
          </div>
        } @else {
          @let peer = selectedPeer()!;

          <!-- Chat Header -->
          <header class="px-3 sm:px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0 z-10">
            <div class="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                (click)="mobileShowChat.set(false)"
                class="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Back to chats"
              >
                <mat-icon class="!text-lg">arrow_back</mat-icon>
              </button>

              <div class="relative shrink-0">
                <div
                  class="w-9 h-9 rounded-full font-bold text-xs text-white flex items-center justify-center"
                  [class]="getAvatarColor(peer.role)"
                >
                  {{ getInitials(peer.name) }}
                </div>
                <span
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900"
                  [class]="peer.isOnline ? 'bg-emerald-500' : 'bg-slate-400'"
                ></span>
              </div>

              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <h3 class="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">{{ peer.name }}</h3>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                    {{ peer.roleLabel }}
                  </span>
                </div>
                <p class="text-[11px] truncate" [class]="peer.isTyping ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-500 dark:text-slate-400'">
                  @if (peer.isTyping) {
                    typing...
                  } @else {
                    {{ peer.isOnline ? 'Online' : 'Offline' }}@if (peer.branchName) { · {{ peer.branchName }}}
                  }
                </p>
              </div>
            </div>

            <div class="flex items-center gap-1 shrink-0">
              <button
                type="button"
                (click)="showInChatSearch.update(v => !v)"
                class="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Search in conversation"
              >
                <mat-icon class="!text-lg">search</mat-icon>
              </button>

              @if (peer.phone) {
                <a
                  [href]="'tel:' + peer.phone"
                  class="p-2 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                  [title]="'Call ' + peer.name + ' (' + peer.phone + ')'"
                >
                  <mat-icon class="!text-lg">phone</mat-icon>
                </a>
              }
            </div>
          </header>

          <!-- In-Chat Search Bar -->
          @if (showInChatSearch()) {
            <div class="px-4 py-2 bg-slate-50 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <mat-icon class="!text-sm text-slate-400">search</mat-icon>
              <input
                type="text"
                [ngModel]="inChatSearch()"
                (ngModelChange)="inChatSearch.set($event)"
                placeholder="Search messages in this chat..."
                class="flex-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                (click)="inChatSearch.set(''); showInChatSearch.set(false)"
                class="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          }

          <!-- Messages Feed -->
          <div
            #messagesFeed
            class="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2.5 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:18px_18px]"
          >
            @if (visibleThreadMessages().length === 0) {
              <div class="flex flex-col items-center justify-center h-full text-center py-8">
                <span class="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 text-[11px] font-medium text-slate-600 dark:text-slate-300 shadow-xs">
                  Say hello to {{ peer.name }}! Messages are saved and synced with your portal.
                </span>
              </div>
            } @else {
              @for (item of groupedThreadItems(); track item.key) {
                @if (item.type === 'date') {
                  <div class="flex justify-center my-2">
                    <span class="px-3 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-2xs">
                      {{ item.label }}
                    </span>
                  </div>
                } @else {
                  @let msg = item.message!;
                  @let isMine = msg.senderId === messagesSvc.currentActorId();

                  <div
                    [id]="'chat-msg-' + msg.id"
                    class="flex flex-col group"
                    [class]="isMine ? 'items-end' : 'items-start'"
                  >
                    <div
                      class="relative max-w-[85%] sm:max-w-[72%] rounded-2xl px-3 py-2 shadow-xs text-xs space-y-1.5"
                      [class]="isMine
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-xs border border-slate-200/70 dark:border-slate-700/70'"
                    >
                      <!-- Hover / Quick Action Toolbar -->
                      @if (!msg.deletedForEveryone) {
                        <div
                          class="hidden group-hover:flex items-center gap-0.5 absolute -top-7 z-20 px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md text-slate-600 dark:text-slate-300"
                          [class]="isMine ? 'right-0' : 'left-0'"
                        >
                          @for (emoji of quickReactions; track emoji) {
                            <button
                              type="button"
                              (click)="messagesSvc.toggleReaction(msg.id, emoji)"
                              class="px-1 hover:scale-125 transition-transform text-xs cursor-pointer"
                            >
                              {{ emoji }}
                            </button>
                          }
                          <button
                            type="button"
                            (click)="startReply(msg)"
                            class="p-1 hover:text-emerald-600 cursor-pointer"
                            title="Reply"
                          >
                            <mat-icon class="!text-xs">reply</mat-icon>
                          </button>
                          @if (msg.text) {
                            <button
                              type="button"
                              (click)="copyMessage(msg.text)"
                              class="p-1 hover:text-emerald-600 cursor-pointer"
                              title="Copy"
                            >
                              <mat-icon class="!text-xs">content_copy</mat-icon>
                            </button>
                          }
                          @if (isMine && msg.text) {
                            <button
                              type="button"
                              (click)="startEdit(msg)"
                              class="p-1 hover:text-amber-500 cursor-pointer"
                              title="Edit"
                            >
                              <mat-icon class="!text-xs">edit</mat-icon>
                            </button>
                          }
                          @if (isMine) {
                            <button
                              type="button"
                              (click)="messagesSvc.deleteMessage(msg.id)"
                              class="p-1 hover:text-rose-500 cursor-pointer"
                              title="Delete"
                            >
                              <mat-icon class="!text-xs">delete</mat-icon>
                            </button>
                          }
                        </div>
                      }

                      <!-- Reply-To Quote -->
                      @if (msg.replyToId && getReplyTarget(msg.replyToId)) {
                        @let quoted = getReplyTarget(msg.replyToId)!;
                        <button
                          type="button"
                          (click)="scrollToMessage(quoted.id)"
                          class="w-full text-left px-2 py-1 rounded-lg border-l-4 text-[11px] cursor-pointer"
                          [class]="isMine
                            ? 'bg-emerald-700/60 border-emerald-200 text-emerald-50'
                            : 'bg-slate-100 dark:bg-slate-900/70 border-emerald-500 text-slate-600 dark:text-slate-300'"
                        >
                          <div class="font-bold truncate">{{ quoted.senderName }}</div>
                          <div class="truncate opacity-85">{{ getPreviewText(quoted) }}</div>
                        </button>
                      }

                      <!-- Tagged Task / Job Pill -->
                      @if (msg.jobId && !msg.deletedForEveryone) {
                        <button
                          type="button"
                          (click)="openTaggedJobOnMap(msg.jobId!)"
                          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold cursor-pointer"
                          [class]="isMine
                            ? 'bg-emerald-700/70 text-emerald-50 hover:bg-emerald-700'
                            : 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'"
                        >
                          <mat-icon class="!text-[12px] !w-3 !h-3">work</mat-icon>
                          <span>Task: {{ msg.jobId }} · View on Map</span>
                        </button>
                      }

                      <!-- Attachments -->
                      @if (msg.attachments && msg.attachments.length > 0 && !msg.deletedForEveryone) {
                        <div class="space-y-1.5">
                          @for (att of msg.attachments; track att.id) {
                            @if (att.kind === 'image') {
                              <img
                                [src]="att.dataUrl"
                                [alt]="att.name"
                                (click)="previewImageUrl.set(att.dataUrl)"
                                class="max-h-56 w-auto rounded-xl object-cover cursor-pointer border border-black/10"
                              />
                            } @else if (att.kind === 'audio') {
                              <div class="flex items-center gap-2 py-1">
                                <mat-icon class="!text-base shrink-0">mic</mat-icon>
                                <audio [src]="att.dataUrl" controls class="h-8 max-w-[220px]"></audio>
                              </div>
                            } @else {
                              <a
                                [href]="att.dataUrl"
                                [download]="att.name"
                                class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold"
                                [class]="isMine
                                  ? 'bg-emerald-700/60 border-emerald-400/40 text-white'
                                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'"
                              >
                                <mat-icon class="!text-base shrink-0">description</mat-icon>
                                <span class="truncate max-w-[180px]">{{ att.name }}</span>
                                <mat-icon class="!text-sm shrink-0">download</mat-icon>
                              </a>
                            }
                          }
                        </div>
                      }

                      <!-- Shared Location Card -->
                      @if (msg.location && !msg.deletedForEveryone) {
                        <a
                          [href]="'https://www.google.com/maps?q=' + msg.location.latitude + ',' + msg.location.longitude"
                          target="_blank"
                          rel="noopener"
                          class="flex items-center gap-2 px-2.5 py-2 rounded-xl border text-[11px]"
                          [class]="isMine
                            ? 'bg-emerald-700/60 border-emerald-400/40 text-white'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'"
                        >
                          <mat-icon class="!text-lg text-rose-400 shrink-0">location_on</mat-icon>
                          <div class="min-w-0">
                            <div class="font-bold truncate">{{ msg.location.label || 'Shared Live Location' }}</div>
                            <div class="font-mono text-[10px] opacity-80">
                              {{ msg.location.latitude | number:'1.5-5' }}, {{ msg.location.longitude | number:'1.5-5' }}
                            </div>
                          </div>
                        </a>
                      }

                      <!-- Message Text -->
                      @if (msg.text) {
                        <p
                          class="whitespace-pre-wrap break-words leading-relaxed"
                          [class.italic]="msg.deletedForEveryone"
                          [class.opacity-75]="msg.deletedForEveryone"
                        >
                          {{ msg.text }}
                        </p>
                      }

                      <!-- Footer: Edited, Time & Read Ticks -->
                      <div class="flex items-center justify-end gap-1 text-[10px] opacity-80">
                        @if (msg.editedAt && !msg.deletedForEveryone) {
                          <span>edited</span>
                          <span>·</span>
                        }
                        <span class="font-mono">{{ formatShortTime(msg.createdAt) }}</span>
                        @if (isMine && !msg.deletedForEveryone) {
                          <mat-icon
                            class="!text-[13px] !w-3.5 !h-3.5"
                            [class]="msg.readAt ? 'text-sky-200' : 'text-emerald-100/75'"
                          >
                            {{ msg.readAt ? 'done_all' : 'done' }}
                          </mat-icon>
                        }
                      </div>
                    </div>

                    <!-- Reactions Row -->
                    @if (msg.reactions && msg.reactions.length > 0) {
                      <div class="flex flex-wrap gap-1 mt-0.5 px-1">
                        @for (group of groupReactions(msg.reactions); track group.emoji) {
                          <button
                            type="button"
                            (click)="messagesSvc.toggleReaction(msg.id, group.emoji)"
                            class="px-1.5 py-0.2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs text-[11px] flex items-center gap-0.5 cursor-pointer"
                            [title]="group.users.join(', ')"
                          >
                            <span>{{ group.emoji }}</span>
                            @if (group.count > 1) {
                              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300">{{ group.count }}</span>
                            }
                          </button>
                        }
                      </div>
                    }
                  </div>
                }
              }
            }
          </div>

          <!-- Quick Operational Replies Strip -->
          <div class="px-3 py-1.5 bg-white/80 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
            @for (qr of quickReplies(); track qr) {
              <button
                type="button"
                (click)="sendQuickReply(qr)"
                class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer"
              >
                {{ qr }}
              </button>
            }
          </div>

          <!-- Reply / Edit / Tagged Job / Pending Attachments Banners -->
          @if (replyingTo() || editingMessage() || taggedJobId() || pendingAttachments().length > 0) {
            <div class="px-3 sm:px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
              @if (replyingTo()) {
                <div class="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border-l-4 border-emerald-500">
                  <div class="min-w-0">
                    <div class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Replying to {{ replyingTo()!.senderName }}</div>
                    <div class="text-[11px] text-slate-600 dark:text-slate-300 truncate">{{ getPreviewText(replyingTo()!) }}</div>
                  </div>
                  <button type="button" (click)="replyingTo.set(null)" class="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <mat-icon class="!text-sm">close</mat-icon>
                  </button>
                </div>
              }
              @if (editingMessage()) {
                <div class="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500">
                  <div class="min-w-0">
                    <div class="text-[10px] font-bold text-amber-700 dark:text-amber-300">Editing message</div>
                    <div class="text-[11px] text-slate-600 dark:text-slate-300 truncate">{{ editingMessage()!.text }}</div>
                  </div>
                  <button type="button" (click)="cancelEdit()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <mat-icon class="!text-sm">close</mat-icon>
                  </button>
                </div>
              }
              @if (taggedJobId()) {
                <div class="flex items-center justify-between gap-2 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200">
                  <span class="font-mono text-[11px] font-bold">Tagged Task: {{ taggedJobId() }}</span>
                  <button type="button" (click)="taggedJobId.set(null)" class="text-teal-600 hover:text-teal-800 cursor-pointer">
                    <mat-icon class="!text-xs">close</mat-icon>
                  </button>
                </div>
              }
              @if (pendingAttachments().length > 0) {
                <div class="flex flex-wrap gap-2">
                  @for (att of pendingAttachments(); track att.id) {
                    <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]">
                      <mat-icon class="!text-xs text-emerald-600">{{ att.kind === 'image' ? 'image' : (att.kind === 'audio' ? 'mic' : 'attach_file') }}</mat-icon>
                      <span class="truncate max-w-[140px]">{{ att.name }}</span>
                      <button type="button" (click)="removePendingAttachment(att.id)" class="text-slate-400 hover:text-rose-500 cursor-pointer">
                        <mat-icon class="!text-xs">close</mat-icon>
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          }

          <!-- Emoji Picker Popover -->
          @if (showEmojiPicker()) {
            <div class="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
              @for (e of emojiPalette; track e) {
                <button
                  type="button"
                  (click)="appendEmoji(e)"
                  class="text-lg hover:scale-125 transition-transform cursor-pointer"
                >
                  {{ e }}
                </button>
              }
            </div>
          }

          <!-- Task Tag Picker Popover -->
          @if (showJobPicker()) {
            <div class="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
              <span class="text-[10px] font-bold uppercase text-slate-400 shrink-0">Tag Task:</span>
              @for (job of store.jobs().slice(0, 12); track job.id) {
                <button
                  type="button"
                  (click)="taggedJobId.set(job.id); showJobPicker.set(false)"
                  class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-teal-950 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap cursor-pointer"
                >
                  {{ job.id }} · {{ job.client.name }}
                </button>
              }
            </div>
          }

          <!-- Bottom Composer Bar -->
          <footer class="px-2.5 sm:px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1 sm:gap-1.5 shrink-0">
            <input #fileInput type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt" class="hidden" (change)="onFilesSelected($event)" />

            <button
              type="button"
              (click)="showEmojiPicker.update(v => !v); showJobPicker.set(false)"
              class="w-9 h-9 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title="Emoji"
            >
              <mat-icon class="!text-lg">sentiment_satisfied_alt</mat-icon>
            </button>

            <button
              type="button"
              (click)="fileInput.click()"
              class="w-9 h-9 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title="Attach photo or document"
            >
              <mat-icon class="!text-lg">attach_file</mat-icon>
            </button>

            <button
              type="button"
              (click)="shareCurrentLocation()"
              class="w-9 h-9 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title="Share live GPS location"
            >
              <mat-icon class="!text-lg">location_on</mat-icon>
            </button>

            <button
              type="button"
              (click)="showJobPicker.update(v => !v); showEmojiPicker.set(false)"
              class="w-9 h-9 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title="Tag a work task"
            >
              <mat-icon class="!text-lg">work_outline</mat-icon>
            </button>

            <textarea
              rows="1"
              [ngModel]="draftText()"
              (ngModelChange)="onDraftChange($event)"
              (keydown)="onComposerKeydown($event)"
              placeholder="Type a message..."
              class="flex-1 min-h-[40px] px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white resize-none max-h-28 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            ></textarea>

            @if (draftText().trim() || pendingAttachments().length > 0 || editingMessage()) {
              <button
                type="button"
                (click)="submitComposer()"
                class="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                title="Send message"
              >
                <mat-icon class="!text-lg">send</mat-icon>
              </button>
            } @else {
              <button
                type="button"
                (click)="toggleVoiceRecording()"
                class="h-10 px-2.5 min-w-[40px] rounded-full text-white shadow-sm transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1"
                [class]="isRecordingVoice() ? 'bg-rose-600 hover:bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500'"
                [title]="isRecordingVoice() ? 'Stop & attach voice note' : 'Record voice note'"
              >
                <mat-icon class="!text-lg">{{ isRecordingVoice() ? 'stop' : 'mic' }}</mat-icon>
                @if (isRecordingVoice()) {
                  <span class="text-[10px] font-mono font-bold">{{ recordingSeconds() }}s</span>
                }
              </button>
            }
          </footer>
        }
      </section>
    </div>

    <!-- Fullscreen Image Preview Modal -->
    @if (previewImageUrl()) {
      <div
        (click)="previewImageUrl.set(null)"
        class="fixed inset-0 z-[130] bg-black/85 flex items-center justify-center p-4 cursor-pointer"
      >
        <img [src]="previewImageUrl()!" alt="Attachment preview" class="max-w-full max-h-[90vh] rounded-2xl shadow-2xl" />
      </div>
    }
  `
})
export class MessagesView implements OnDestroy {
  readonly messagesSvc = inject(MessagesService);
  readonly store = inject(InstallationStore);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  private readonly feedEl = viewChild<ElementRef<HTMLDivElement>>('messagesFeed');

  readonly contactSearch = signal('');
  readonly contactFilter = signal<'all' | 'unread' | 'shop_manager' | 'account_officer' | 'manager' | 'crew'>('all');
  readonly mobileShowChat = signal(false);
  readonly showInChatSearch = signal(false);
  readonly inChatSearch = signal('');
  readonly draftText = signal('');
  readonly replyingTo = signal<ChatMessage | null>(null);
  readonly editingMessage = signal<ChatMessage | null>(null);
  readonly taggedJobId = signal<string | null>(null);
  readonly pendingAttachments = signal<ChatAttachment[]>([]);
  readonly showEmojiPicker = signal(false);
  readonly showJobPicker = signal(false);
  readonly previewImageUrl = signal<string | null>(null);

  readonly isRecordingVoice = signal(false);
  readonly recordingSeconds = signal(0);
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private recordTimer: ReturnType<typeof setInterval> | null = null;
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly quickReactions = ['👍', '❤️', '✅', '🙏', '😂', '😮'];
  readonly emojiPalette = ['👍', '✅', '🚚', '🛠️', '📍', '💳', '📞', '🙏', '😊', '🔥', '⚠️', '🕒'];

  readonly contactFilterTabs = computed(() => {
    const role = this.store.currentRole();
    if (role === 'installer' || role === 'dispatcher') {
      return [
        { id: 'all' as const, label: 'All' },
        { id: 'unread' as const, label: 'Unread' },
        { id: 'shop_manager' as const, label: 'Shop' },
        { id: 'account_officer' as const, label: 'Finance' },
        { id: 'manager' as const, label: 'Manager' }
      ];
    }
    return [
      { id: 'all' as const, label: 'All' },
      { id: 'unread' as const, label: 'Unread' },
      { id: 'crew' as const, label: 'Drivers & Installers' },
      { id: 'shop_manager' as const, label: 'Shop' },
      { id: 'account_officer' as const, label: 'Finance' },
      { id: 'manager' as const, label: 'Managers' }
    ];
  });

  readonly selectedPeer = computed<ChatContact | null>(() => {
    const id = this.messagesSvc.activePeerId();
    const contacts = this.messagesSvc.eligibleContacts();
    if (!id) return contacts[0] || null;
    return contacts.find(c => c.id === id) || contacts[0] || null;
  });

  readonly filteredContacts = computed<ChatContact[]>(() => {
    const q = this.contactSearch().trim().toLowerCase();
    const tab = this.contactFilter();
    return this.messagesSvc.eligibleContacts().filter(c => {
      if (tab === 'unread' && c.unreadCount === 0) return false;
      if (tab === 'shop_manager' && c.role !== 'shop_manager') return false;
      if (tab === 'account_officer' && c.role !== 'account_officer') return false;
      if (tab === 'manager' && c.role !== 'manager' && c.role !== 'admin') return false;
      if (tab === 'crew' && c.role !== 'installer' && c.role !== 'dispatcher') return false;
      if (!q) return true;
      const hay = `${c.name} ${c.roleLabel} ${c.branchName || ''} ${c.lastMessage?.text || ''}`.toLowerCase();
      return hay.includes(q);
    });
  });

  readonly visibleThreadMessages = computed<ChatMessage[]>(() => {
    const peer = this.selectedPeer();
    if (!peer) return [];
    const me = this.messagesSvc.currentActorId();
    const q = this.inChatSearch().trim().toLowerCase();
    return this.messagesSvc
      .messages()
      .filter(m => (m.senderId === me && m.recipientId === peer.id) || (m.senderId === peer.id && m.recipientId === me))
      .filter(m => !q || (m.text || '').toLowerCase().includes(q) || (m.jobId || '').toLowerCase().includes(q))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  readonly groupedThreadItems = computed(() => {
    const msgs = this.visibleThreadMessages();
    const out: { key: string; type: 'date' | 'msg'; label?: string; message?: ChatMessage }[] = [];
    let lastDay = '';
    for (const m of msgs) {
      const d = new Date(m.createdAt);
      const dayKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (dayKey !== lastDay) {
        lastDay = dayKey;
        out.push({ key: `date-${dayKey}`, type: 'date', label: this.formatDayLabel(d) });
      }
      out.push({ key: m.id, type: 'msg', message: m });
    }
    return out;
  });

  readonly quickReplies = computed<string[]>(() => {
    const role = this.store.currentRole();
    if (role === 'dispatcher' || role === 'installer') {
      return ['On my way', 'Arrived at site', 'Please verify payment', 'Need materials / lock', 'Job completed'];
    }
    if (role === 'account_officer') {
      return ['Payment verified ✅', 'Receipt confirmed', 'Site funds dispatched', 'Please send receipt number'];
    }
    return ['Please update status', 'Proceed to site', 'Approved ✅', 'Call me when you arrive'];
  });

  constructor() {
    effect(() => {
      const peer = this.selectedPeer();
      if (peer && this.messagesSvc.activePeerId() !== peer.id) {
        void this.messagesSvc.openConversation(peer.id);
      }
    });

    effect(() => {
      this.visibleThreadMessages();
      setTimeout(() => this.scrollToBottom(), 40);
    });
  }

  ngOnDestroy() {
    if (this.recordTimer) clearInterval(this.recordTimer);
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
  }

  selectContact(contact: ChatContact) {
    this.mobileShowChat.set(true);
    this.replyingTo.set(null);
    this.editingMessage.set(null);
    void this.messagesSvc.openConversation(contact.id);
  }

  onDraftChange(val: string) {
    this.draftText.set(val);
    const peer = this.selectedPeer();
    if (!peer) return;
    void this.messagesSvc.notifyTyping(peer.id, val.trim().length > 0);
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      void this.messagesSvc.notifyTyping(peer.id, false);
    }, 3000);
  }

  onComposerKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      void this.submitComposer();
    }
  }

  async submitComposer() {
    const peer = this.selectedPeer();
    if (!peer) return;

    const editing = this.editingMessage();
    if (editing) {
      await this.messagesSvc.editMessage(editing.id, this.draftText());
      this.editingMessage.set(null);
      this.draftText.set('');
      return;
    }

    await this.messagesSvc.sendMessage({
      peer,
      text: this.draftText(),
      replyToId: this.replyingTo()?.id || null,
      jobId: this.taggedJobId(),
      attachments: this.pendingAttachments()
    });

    this.draftText.set('');
    this.replyingTo.set(null);
    this.taggedJobId.set(null);
    this.pendingAttachments.set([]);
    this.showEmojiPicker.set(false);
    this.showJobPicker.set(false);
    void this.messagesSvc.notifyTyping(peer.id, false);
  }

  async sendQuickReply(text: string) {
    const peer = this.selectedPeer();
    if (!peer) return;
    await this.messagesSvc.sendMessage({
      peer,
      text,
      jobId: this.taggedJobId()
    });
    this.taggedJobId.set(null);
  }

  async shareCurrentLocation() {
    const peer = this.selectedPeer();
    if (!peer) return;
    const live = this.store.myLiveLocation();
    let loc: ChatLocationShare | null = live
      ? { latitude: live.latitude, longitude: live.longitude, label: 'Current Live GPS Location' }
      : null;

    if (!loc && typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
        });
        loc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          label: 'Current Live GPS Location'
        };
      } catch {
        // Fallback below
      }
    }

    if (!loc) {
      this.alert.toastError('Location Unavailable', 'Please turn on location access to share your GPS position.');
      return;
    }

    await this.messagesSvc.sendMessage({
      peer,
      text: 'Shared live GPS location',
      location: loc,
      jobId: this.taggedJobId()
    });
    this.taggedJobId.set(null);
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    Array.from(input.files).forEach(file => {
      if (file.size > 4 * 1024 * 1024) {
        this.alert.toastError('File Too Large', `${file.name} exceeds the 4 MB chat attachment limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        const kind: ChatAttachment['kind'] = file.type.startsWith('image/')
          ? 'image'
          : (file.type.startsWith('audio/') ? 'audio' : 'file');
        this.pendingAttachments.update(list => [
          ...list,
          {
            id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: file.name,
            mimeType: file.type || 'application/octet-stream',
            size: file.size,
            dataUrl,
            kind
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  removePendingAttachment(id: string) {
    this.pendingAttachments.update(list => list.filter(a => a.id !== id));
  }

  async toggleVoiceRecording() {
    if (this.isRecordingVoice()) {
      this.mediaRecorder?.stop();
      return;
    }
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      this.alert.toastError('Microphone Unavailable', 'Voice recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recordedChunks = [];
      const recorder = new MediaRecorder(stream);
      this.mediaRecorder = recorder;
      this.recordingSeconds.set(0);
      this.isRecordingVoice.set(true);
      this.recordTimer = setInterval(() => this.recordingSeconds.update(s => s + 1), 1000);

      recorder.ondataavailable = e => {
        if (e.data.size > 0) this.recordedChunks.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (this.recordTimer) {
          clearInterval(this.recordTimer);
          this.recordTimer = null;
        }
        const dur = this.recordingSeconds();
        this.isRecordingVoice.set(false);
        const blob = new Blob(this.recordedChunks, { type: recorder.mimeType || 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          const peer = this.selectedPeer();
          if (!peer) return;
          void this.messagesSvc.sendMessage({
            peer,
            text: '',
            attachments: [
              {
                id: `voice-${Date.now()}`,
                name: `Voice Note (${dur}s)`,
                mimeType: blob.type || 'audio/webm',
                size: blob.size,
                dataUrl: String(reader.result || ''),
                kind: 'audio',
                durationSec: dur
              }
            ]
          });
        };
        reader.readAsDataURL(blob);
      };
      recorder.start();
    } catch {
      this.isRecordingVoice.set(false);
      this.alert.toastError('Microphone Blocked', 'Please allow microphone permission to record a voice note.');
    }
  }

  startReply(msg: ChatMessage) {
    this.editingMessage.set(null);
    this.replyingTo.set(msg);
  }

  startEdit(msg: ChatMessage) {
    this.replyingTo.set(null);
    this.editingMessage.set(msg);
    this.draftText.set(msg.text);
  }

  cancelEdit() {
    this.editingMessage.set(null);
    this.draftText.set('');
  }

  appendEmoji(e: string) {
    this.draftText.update(t => t + e);
  }

  async copyMessage(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.alert.toastSuccess('Copied', 'Message copied to clipboard.');
    } catch {
      // Ignore clipboard failure
    }
  }

  openTaggedJobOnMap(jobId: string) {
    void this.router.navigate(['/map'], { queryParams: { jobId } });
  }

  scrollToMessage(id: string) {
    const el = document.getElementById(`chat-msg-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  private scrollToBottom() {
    const el = this.feedEl()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  getReplyTarget(id: string): ChatMessage | undefined {
    return this.messagesSvc.messages().find(m => m.id === id);
  }

  getPreviewText(msg: ChatMessage): string {
    if (msg.deletedForEveryone) return 'This message was deleted';
    if (msg.text) return msg.text;
    if (msg.location) return '📍 Live GPS Location';
    if (msg.attachments && msg.attachments.length > 0) {
      const first = msg.attachments[0];
      if (first.kind === 'image') return '📷 Photo';
      if (first.kind === 'audio') return '🎤 Voice note';
      return `📎 ${first.name}`;
    }
    return '';
  }

  groupReactions(reactions: { emoji: string; userName: string }[]) {
    const map = new Map<string, string[]>();
    for (const r of reactions) {
      const list = map.get(r.emoji) || [];
      list.push(r.userName);
      map.set(r.emoji, list);
    }
    return Array.from(map.entries()).map(([emoji, users]) => ({ emoji, users, count: users.length }));
  }

  getInitials(name: string): string {
    const parts = (name || 'U').trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return (parts[0].slice(0, 2)).toUpperCase();
  }

  getAvatarColor(role: string): string {
    switch (role) {
      case 'shop_manager':
        return 'bg-cyan-600';
      case 'account_officer':
        return 'bg-amber-600';
      case 'manager':
      case 'admin':
        return 'bg-purple-600';
      case 'dispatcher':
        return 'bg-sky-600';
      case 'installer':
        return 'bg-emerald-600';
      default:
        return 'bg-slate-600';
    }
  }

  formatShortTime(iso: string): string {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private formatDayLabel(d: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diffDays = Math.round((today - target) / (24 * 60 * 60 * 1000));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
