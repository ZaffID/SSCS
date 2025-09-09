import type { Component } from 'solid-js';
import { createSignal, Show, createEffect, onMount, createMemo } from 'solid-js';
import { Portal } from 'solid-js/web';
import { FaSolidGear, FaSolidLocationDot, FaSolidUser, FaSolidGasPump } from 'solid-icons/fa';
import { IoHammerSharp } from 'solid-icons/io';
import { BiSolidDashboard } from 'solid-icons/bi';
import { A, useLocation } from '@solidjs/router';
import logoSrc from '../assets/logo/icon.png';

const Sidebar: Component = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = createSignal(false);
  // Quick Action modals
  const [showUserModal, setShowUserModal] = createSignal(false);
  const [showStationModal, setShowStationModal] = createSignal(false);
  const [showTicketModal, setShowTicketModal] = createSignal(false);
  const isActive = (path: string) => location.pathname === path;
  // Profile data for avatar consistency
  const [fullName, setFullName] = createSignal('Nama User');
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);
  const initials = createMemo(() => {
    const parts = fullName().trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase() || 'U';
  });
  onMount(() => {
    try {
      const saved = localStorage.getItem('profileData');
      if (saved) {
        const obj = JSON.parse(saved);
        if (obj.fullName) setFullName(obj.fullName);
        if (typeof obj.avatarUrl !== 'undefined') setAvatarUrl(obj.avatarUrl);
      }
    } catch {}
  });

  // Sync CSS variable with collapsed state for layout padding
  createEffect(() => {
    const width = collapsed() ? '4rem' : '16rem';
    document.documentElement.style.setProperty('--sidebar-width', width);
  });

  return (
    <aside
      class={
        'hidden md:flex md:flex-col fixed left-0 top-0 h-screen text-slate-100 transition-[width] duration-300 ' +
        (collapsed() ? 'w-16' : 'w-64')
      }
      style={{
        background: 'linear-gradient(180deg, #0f0b0d 0%, #0e0a0c 55%, #0c090a 100%)',
        'border-right': '1px solid rgba(190,18,60,0.14)',
        'box-shadow': '0 10px 28px rgba(190,18,60,0.16)'
      }}
    >
      <div class="h-16 flex items-center justify-between px-3" style={{ 'border-bottom': '1px solid rgba(248,113,113,0.10)' }}>
        <div class="flex items-center gap-3">
          <A href="/dashboard" class={collapsed() ? 'mx-auto' : ''} title="Home">
            <div class={collapsed() ? 'relative w-9 h-9' : 'relative w-9 h-9'}>
              <img src={logoSrc} alt="Logo" class="w-9 h-9 rounded-xl shadow-sm" />
              <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[rgba(15,11,13,0.9)]"></span>
            </div>
          </A>
          <Show when={!collapsed()}>
            <div class="leading-tight">
              <div class="text-sm font-semibold tracking-wide">SSCS</div>
              <div class="text-[11px] text-slate-300/80">Operations Center</div>
            </div>
          </Show>
        </div>
        <button
          class="size-8 rounded-lg hover:bg-white/5 transition-colors duration-300 ease-[cubic-bezier(.2,.8,.2,1)] flex items-center justify-center text-slate-200/90"
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed(!collapsed())}
          title={collapsed() ? 'Expand' : 'Collapse'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d={collapsed() ? 'M15.78 5.22a.75.75 0 010 1.06L10.06 12l5.72 5.72a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z' : 'M8.22 18.78a.75.75 0 010-1.06L13.94 12 8.22 6.28a.75.75 0 011.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z'} clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      {/* Quick Actions */}
      <Show when={!collapsed()}>
        <div class="px-3 py-3 border-b/50" style={{ 'border-bottom': '1px solid rgba(190,18,60,0.14)' }}>
          <div class="grid grid-cols-3 gap-2">
            <button class="px-2.5 py-1.5 text-xs rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:translate-y-[-1px]" title="Add User" onClick={() => setShowUserModal(true)}>
              + User
            </button>
            <button class="px-2.5 py-1.5 text-xs rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:translate-y-[-1px]" title="Add Station" onClick={() => setShowStationModal(true)}>
              + Station
            </button>
            <button class="px-2.5 py-1.5 text-xs rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:translate-y-[-1px]" title="New Ticket" onClick={() => setShowTicketModal(true)}>
              + Ticket
            </button>
          </div>
        </div>
      </Show>
      {/* Hidden quick actions in collapsed mode (removed per UX request) */}
      <nav class="flex-1 overflow-y-auto py-4 nice-scroll pr-1">
        <ul class={(collapsed() ? 'px-0' : 'px-3') + ' space-y-2'}>
          <li>
            <A
              href="/dashboard"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/dashboard') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Dashboard"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95'}>
                <BiSolidDashboard class="w-5 h-5 text-white/95" />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span class="font-semibold">Dashboard</span>
                  <span class="text-xs text-slate-100/80">Overview and summary</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/dashboard')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
          <Show when={!collapsed()}>
            <li class="pt-2">
              <p class="px-3 text-xs uppercase tracking-wider text-slate-300/80">Global Settings</p>
            </li>
          </Show>
          <li>
            <A
              href="/map"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/map') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Live Map"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95'}>
                <FaSolidLocationDot class="w-5 h-5 text-white/95" />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Live Map</span>
                  <span class="text-xs text-slate-100/80">Realtime station locations</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/map')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
          <Show when={!collapsed()}>
            <li class="pt-2">
              <p class="px-3 text-xs uppercase tracking-wider text-slate-300/80">Assets</p>
            </li>
          </Show>
          <li>
            <A
              href="/stations"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/stations') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Stations"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95'}>
                <FaSolidGasPump />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Stations</span>
                  <span class="text-xs text-slate-100/80">Browse and manage stations</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/stations')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/users"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/users') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Users"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95'}>
                <FaSolidUser />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Users</span>
                  <span class="text-xs text-slate-100/80">Manage users and roles</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/users')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/technician"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/technician') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Technicians"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95'}>
                <IoHammerSharp />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Technicians</span>
                  <span class="text-xs text-slate-100/80">Assignments and outages</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/technician')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
          <Show when={!collapsed()}>
            <li class="pt-2">
              <p class="px-3 text-xs uppercase tracking-wider text-slate-300/80">Insights</p>
            </li>
          </Show>
          <li>
            <A
              href="/analytics"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/analytics') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Analytics"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:bg-white/10 group-hover:ring-white/20 group-active:scale-95'}>
                <FaSolidGear class="w-5 h-5 text-white/95" />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Analytics</span>
                  <span class="text-xs text-slate-100/80">Charts & breakdown</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/analytics')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/consumer"
              class={
                'group ' +
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-3 py-2.5 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ease-out hover:translate-x-0.5 active:scale-[.99] ' +
                (isActive('/consumer') ? 'bg-[rgba(190,18,60,0.12)] border border-[rgba(190,18,60,0.22)] shadow-[0_10px_26px_rgba(190,18,60,0.22)]' : 'hover:bg-white/5 hover:border hover:border-white/10')
              }
              title="Consumer"
            >
              <div class={collapsed() ? 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-white/10 group-active:scale-95' : 'grid place-items-center w-9 h-9 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-white/10 group-active:scale-95'}>
                <FaSolidLocationDot class="w-5 h-5 text-white/95" />
              </div>
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Consumer</span>
                  <span class="text-xs text-slate-100/80">Public view & search</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/consumer')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #f43f5e, #ef4444)' }} />
              </Show>
            </A>
          </li>
        </ul>
      </nav>
      <div class="p-3 mt-auto" style={{ 'border-top': collapsed() ? 'none' : '1px solid rgba(248,113,113,0.10)' }}>
        <A href="/profile" class={collapsed() ? 'flex items-center justify-center' : 'flex items-center gap-3'}>
          <div class="w-9 h-9 rounded-full text-white flex items-center justify-center font-semibold shadow-sm overflow-hidden" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #ef4444 55%, #fb7185 100%)' }}>
            <Show when={avatarUrl()} fallback={<span>{initials()}</span>}>
              <img src={avatarUrl()!} alt="Avatar" class="w-full h-full object-cover" />
            </Show>
          </div>
          <Show when={!collapsed()}>
            <div>
              <p class="text-sm font-medium">{fullName()}</p>
              <p class="text-xs text-slate-300 flex items-center gap-1">
                <span class="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--brand-green)' }} />
                User
              </p>
            </div>
          </Show>
        </A>
        <Show when={!collapsed()}>
          <A href="/" class="mt-3 w-full inline-block text-left text-sm opacity-90 hover:opacity-100 transition-opacity text-red-300 hover:text-red-200">Logout</A>
        </Show>
      </div>
      {/* Modals */}
      <Show when={showUserModal()}>
        <Portal>
        <div class="fixed inset-0 z-[99999] bg-black/40 flex items-center justify-center p-4">
          <div class="w-full max-w-md rounded-2xl bg-white text-slate-800 shadow-xl">
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="font-semibold">Tambah User</h3>
              <button class="p-1 rounded hover:bg-gray-100" onClick={() => setShowUserModal(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <form class="p-4 space-y-3" onSubmit={(e) => { e.preventDefault(); console.log('submit user'); setShowUserModal(false); }}>
              <div>
                <label class="block text-sm mb-1">Nama</label>
                <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label class="block text-sm mb-1">Email</label>
                <input type="email" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label class="block text-sm mb-1">Role</label>
                <select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Admin</option>
                  <option>Technician</option>
                  <option>Consumer</option>
                </select>
              </div>
              <div class="pt-2 flex justify-end gap-2">
                <button type="button" class="px-3 py-2 text-sm rounded-lg border border-gray-300" onClick={() => setShowUserModal(false)}>Batal</button>
                <button type="submit" class="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      </Show>

      <Show when={showStationModal()}>
        <Portal>
        <div class="fixed inset-0 z-[99999] bg-black/40 flex items-center justify-center p-4">
          <div class="w-full max-w-md rounded-2xl bg-white text-slate-800 shadow-xl">
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="font-semibold">Tambah Station</h3>
              <button class="p-1 rounded hover:bg-gray-100" onClick={() => setShowStationModal(false)} aria-label="Close">✕</button>
            </div>
            <form class="p-4 space-y-3" onSubmit={(e) => { e.preventDefault(); console.log('submit station'); setShowStationModal(false); }}>
              <div>
                <label class="block text-sm mb-1">Nama SPBU</label>
                <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label class="block text-sm mb-1">Lokasi</label>
                <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label class="block text-sm mb-1">Station ID</label>
                <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div class="pt-2 flex justify-end gap-2">
                <button type="button" class="px-3 py-2 text-sm rounded-lg border border-gray-300" onClick={() => setShowStationModal(false)}>Batal</button>
                <button type="submit" class="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      </Show>

      <Show when={showTicketModal()}>
        <Portal>
        <div class="fixed inset-0 z-[99999] bg-black/40 flex items-center justify-center p-4">
          <div class="w-full max-w-md rounded-2xl bg-white text-slate-800 shadow-xl">
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="font-semibold">Buat Ticket</h3>
              <button class="p-1 rounded hover:bg-gray-100" onClick={() => setShowTicketModal(false)} aria-label="Close">✕</button>
            </div>
            <form class="p-4 space-y-3" onSubmit={(e) => { e.preventDefault(); console.log('submit ticket'); setShowTicketModal(false); }}>
              <div>
                <label class="block text-sm mb-1">Judul</label>
                <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label class="block text-sm mb-1">Prioritas</label>
                <select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label class="block text-sm mb-1">Deskripsi</label>
                <textarea rows={3} class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="pt-2 flex justify-end gap-2">
                <button type="button" class="px-3 py-2 text-sm rounded-lg border border-gray-300" onClick={() => setShowTicketModal(false)}>Batal</button>
                <button type="submit" class="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Kirim</button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      </Show>
    </aside>
  );
};

export default Sidebar;
