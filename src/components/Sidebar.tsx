import type { Component } from 'solid-js';
import { createSignal, Show, createEffect, onMount } from 'solid-js';
import { FaSolidGear, FaSolidLocationDot, FaSolidUser, FaSolidGasPump } from 'solid-icons/fa';
import { IoHammerSharp } from 'solid-icons/io';
import { BiSolidDashboard } from 'solid-icons/bi';
import { A, useLocation } from '@solidjs/router';

const Sidebar: Component = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = createSignal(false);
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
        <div class="flex items-center gap-2 overflow-hidden">
          <div class="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
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
      <nav class="flex-1 overflow-y-auto py-4">
        <ul class={ (collapsed() ? 'px-2' : 'px-3') + ' space-y-2'}>
          <li>
            <A
              href="/"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl' : 'px-4 py-3 rounded-2xl') +
                ' relative flex items-center ' + (collapsed() ? 'gap-0' : 'gap-3') + ' transition-all duration-200 ' +
                (isActive('/') ? 'bg-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.15)]' : 'hover:bg-white/5')
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
              <Show when={!collapsed() && isActive('/')}> 
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, var(--brand-yellow), var(--brand-red))' }} />
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
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl' : 'px-4 py-3 rounded-2xl') +
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
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, var(--brand-yellow), var(--brand-red))' }} />
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
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl' : 'px-4 py-3 rounded-2xl') +
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
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, var(--brand-yellow), var(--brand-red))' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/users"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl' : 'px-4 py-3 rounded-2xl') +
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
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, var(--brand-yellow), var(--brand-red))' }} />
              </Show>
            </A>
          </li>
          <li>
            <A
              href="/technician"
              class={
                (collapsed() ? 'justify-center h-10 w-10 p-0 rounded-xl' : 'px-4 py-3 rounded-2xl') +
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
                <span class="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, var(--brand-yellow), var(--brand-red))' }} />
              </Show>
            </A>
          </li>
        </ul>
      </nav>
      <div class="p-3 mt-auto" style={{ 'border-top': collapsed() ? 'none' : '1px solid var(--sidebar-border)' }}>
        <div class={collapsed() ? 'flex items-center justify-center' : 'flex items-center gap-3'}>
          <div class="w-9 h-9 rounded-full text-white flex items-center justify-center font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, var(--brand-red), var(--brand-yellow))' }}>N</div>
          <Show when={!collapsed()}>
            <div>
              <p class="text-sm font-medium">Nama User</p>
              <p class="text-xs text-slate-300 flex items-center gap-1">
                <span class="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--brand-green)' }} />
                User
              </p>
            </div>
          </Show>
        </div>
        <Show when={!collapsed()}>
          <button class="mt-3 w-full text-left text-sm opacity-90 hover:opacity-100 transition-opacity" style={{ color: 'var(--surface-0)' }}>Logout</button>
        </Show>
      </div>
    </aside>
  );
};

export default Sidebar;
