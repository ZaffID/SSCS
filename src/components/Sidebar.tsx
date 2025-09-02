import type { Component } from 'solid-js';
import { createSignal, Show, createEffect, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import { FaSolidGear, FaSolidLocationDot, FaSolidUser, FaSolidGasPump } from 'solid-icons/fa';
import { IoHammerSharp } from 'solid-icons/io';
import { BiSolidDashboard } from 'solid-icons/bi';
import { A, useLocation } from '@solidjs/router';

const Sidebar: Component = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = createSignal(false);
  // Quick Action modals
  const [showUserModal, setShowUserModal] = createSignal(false);
  const [showStationModal, setShowStationModal] = createSignal(false);
  const [showTicketModal, setShowTicketModal] = createSignal(false);
  const isActive = (path: string) => location.pathname === path;

  // Sync CSS variable with collapsed state for layout padding
  createEffect(() => {
    const width = collapsed() ? '4rem' : '16rem';
    document.documentElement.style.setProperty('--sidebar-width', width);
  });

  return (
    <aside
      class={
        'hidden md:flex md:flex-col fixed left-0 top-0 h-screen text-slate-100 border-r shadow-[0_10px_30px_rgba(239,68,68,0.20)] transition-[width] duration-300 ' +
        (collapsed() ? 'w-16' : 'w-64')
      }
      style={{
        background:
          'linear-gradient(180deg, var(--sidebar-start) 0%, var(--sidebar-middle) 55%, var(--sidebar-end) 100%)',
        'border-right': '1px solid var(--sidebar-border)'
      }}
    >
      <div class="h-16 flex items-center justify-between px-3 border-b/50" style={{ 'border-bottom': '1px solid var(--sidebar-border)' }}>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center z-10">
            <span class="text-sm font-bold">P</span>
          </div>
          <Show when={!collapsed()}>
            <span class="text-base font-semibold tracking-wide whitespace-nowrap">Ops Center</span>
          </Show>
        </div>
        <button
          class="size-8 rounded-md hover:bg-white/10 flex items-center justify-center"
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
        <div class="px-3 py-3 border-b/50" style={{ 'border-bottom': '1px solid var(--sidebar-border)' }}>
          <div class="grid grid-cols-3 gap-2">
            <button class="px-2.5 py-1.5 text-xs rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors" title="Add User" onClick={() => setShowUserModal(true)}>
              + User
            </button>
            <button class="px-2.5 py-1.5 text-xs rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors" title="Add Station" onClick={() => setShowStationModal(true)}>
              + Station
            </button>
            <button class="px-2.5 py-1.5 text-xs rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors" title="New Ticket" onClick={() => setShowTicketModal(true)}>
              + Ticket
            </button>
          </div>
        </div>
      </Show>
      {/* Hidden quick actions in collapsed mode (removed per UX request) */}
      <nav class="flex-1 overflow-y-auto py-4 nice-scroll pr-1">
        <ul class={ (collapsed() ? 'px-0' : 'px-3') + ' space-y-2'}>
          <li>
            <A
              href="/dashboard"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/dashboard') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Dashboard"
            >
              <BiSolidDashboard class="w-5 h-5 text-white/95" />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span class="font-semibold">Dashboard</span>
                  <span class="text-xs text-slate-100/80">Overview and summary</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/dashboard')}> 
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
          <Show when={!collapsed()}>
            <li class="pt-2">
              <p class="px-3 text-xs uppercase tracking-wider text-slate-200/80">Global Settings</p>
            </li>
          </Show>
          <li>
            <A
              href="/map"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/map') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Live Map"
            >
              <FaSolidLocationDot class="w-5 h-5 text-white/95" />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Live Map</span>
                  <span class="text-xs text-slate-100/80">Realtime station locations</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/map')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
          <Show when={!collapsed()}>
            <li class="pt-2">
              <p class="px-3 text-xs uppercase tracking-wider text-slate-200/80">Assets</p>
            </li>
          </Show>
          <li>
            <A
              href="/stations"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/stations') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Stations"
            >
              <FaSolidGasPump />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Stations</span>
                  <span class="text-xs text-slate-100/80">Browse and manage stations</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/stations')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/users"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/users') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Users"
            >
              <FaSolidUser />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Users</span>
                  <span class="text-xs text-slate-100/80">Manage users and roles</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/users')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/technician"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/technician') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Technicians"
            >
              <IoHammerSharp />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Technicians</span>
                  <span class="text-xs text-slate-100/80">Assignments and outages</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/technician')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
          <Show when={!collapsed()}>
            <li class="pt-2">
              <p class="px-3 text-xs uppercase tracking-wider text-slate-200/80">Insights</p>
            </li>
          </Show>
          <li>
            <A
              href="/analytics"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/analytics') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Analytics"
            >
              <FaSolidGear class="w-5 h-5 text-white/95" />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Analytics</span>
                  <span class="text-xs text-slate-100/80">Charts & breakdown</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/analytics')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/consumer"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl mx-auto' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/consumer') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
              }
              title="Consumer"
            >
              <FaSolidLocationDot class="w-5 h-5 text-white/95" />
              <Show when={!collapsed()}>
                <div class="flex flex-col leading-tight">
                  <span>Consumer</span>
                  <span class="text-xs text-slate-100/80">Public view & search</span>
                </div>
              </Show>
              <Show when={!collapsed() && isActive('/consumer')}>
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'white' }} />
              </Show>
            </A>
          </li>
        </ul>
      </nav>
      <div class="p-3 mt-auto" style={{ 'border-top': collapsed() ? 'none' : '1px solid var(--sidebar-border)' }}>
        <A href="/profile" class={collapsed() ? 'flex items-center justify-center' : 'flex items-center gap-3'}>
          <div class="w-9 h-9 rounded-full text-white flex items-center justify-center font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #FACC15, #FFC107)' }}>N</div>
          <Show when={!collapsed()}>
            <div>
              <p class="text-sm font-medium">Nama User</p>
              <p class="text-xs text-slate-300 flex items-center gap-1">
                <span class="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--brand-green)' }} />
                User
              </p>
            </div>
          </Show>
        </A>
        <Show when={!collapsed()}>
          <A href="/" class="mt-3 w-full inline-block text-left text-sm opacity-90 hover:opacity-100 transition-opacity" style={{ color: 'var(--surface-0)' }}>Logout</A>
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
