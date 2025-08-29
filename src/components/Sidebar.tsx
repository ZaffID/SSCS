import type { Component } from 'solid-js';
import { FaSolidGear, FaSolidLocationDot, FaSolidUser, FaSolidGasPump } from 'solid-icons/fa';
import { IoHammerSharp } from 'solid-icons/io';
import { BiSolidDashboard } from 'solid-icons/bi';
import { A, useLocation } from '@solidjs/router';

const Sidebar: Component = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      class="hidden md:flex md:flex-col w-64 min-h-screen text-slate-100 border-r"
      style={{
        background:
          'linear-gradient(180deg, #b32626 0%, #cf2e2e 55%, #a72424 100%)',
        'border-right': '1px solid rgba(110,18,18,0.58)',
      }}
    >
      <div class="h-16 flex items-center px-6 border-b" style={{ 'border-bottom': '1px solid rgba(110,18,18,0.62)' }}>
        <span class="text-lg font-semibold tracking-wide">Pertamina Ops Center</span>
      </div>
      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-1 px-3">
          <li>
            <A
              href="/"
              class={
                isActive('/')
                  ? 'relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200'
                  : 'flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 hover:ring-1 hover:ring-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
              }
              style={
                isActive('/')
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(210,30,30,0.35) 0%, rgba(170,24,24,0.38) 55%, rgba(140,20,20,0.42) 100%)',
                      'box-shadow':
                        'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 18px rgba(0,0,0,0.26), 0 0 0 1px rgba(190,18,18,0.30)',
                    }
                  : undefined
              }
            >
              {isActive('/') && (
                <span class="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-9 rounded-full" style={{ background: 'rgba(255,200,200,0.9)' }} />
              )}
              <BiSolidDashboard class="w-5 h-5 text-white/95" />
              <div class="flex flex-col leading-tight">
                <span class="font-semibold">Dashboard</span>
                {isActive('/') && (
                  <span class="text-xs text-slate-100/80">System overview and summary</span>
                )}
              </div>
            </A>
          </li>
          <li class="pt-2">
            <p class="px-3 text-xs uppercase tracking-wider text-slate-200/80">Global Settings</p>
          </li>
          <li>
            <A
              href="/map"
              class={
                isActive('/map')
                  ? 'relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200'
                  : 'flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 hover:ring-1 hover:ring-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
              }
              style={
                isActive('/map')
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(210,30,30,0.35) 0%, rgba(170,24,24,0.38) 55%, rgba(140,20,20,0.42) 100%)',
                      'box-shadow':
                        'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 18px rgba(0,0,0,0.26), 0 0 0 1px rgba(190,18,18,0.30)',
                    }
                  : undefined
              }
            >
              {isActive('/map') && (
                <span class="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-9 rounded-full" style={{ background: 'rgba(255,200,200,0.9)' }} />
              )}
              <FaSolidLocationDot class="w-5 h-5 text-white/95" />
              <div class="flex flex-col leading-tight">
                <span>Live Map</span>
                {isActive('/map') && (
                  <span class="text-xs text-slate-100/80">Realtime station locations</span>
                )}
              </div>
            </A>
          </li>
          <li class="pt-2">
            <p class="px-3 text-xs uppercase tracking-wider text-slate-200/80">Assets</p>
          </li>
          <li>
            <A
              href="/stations"
              class={
                isActive('/stations')
                  ? 'relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200'
                  : 'flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 hover:ring-1 hover:ring-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
              }
              style={
                isActive('/stations')
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(210,30,30,0.35) 0%, rgba(170,24,24,0.38) 55%, rgba(140,20,20,0.42) 100%)',
                      'box-shadow':
                        'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 18px rgba(0,0,0,0.26), 0 0 0 1px rgba(190,18,18,0.30)',
                    }
                  : undefined
              }
            >
              {isActive('/stations') && (
                <span class="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-9 rounded-full" style={{ background: 'rgba(255,200,200,0.9)' }} />
              )}
              <FaSolidGasPump class="w-5 h-5 text-white/95" />
              <div class="flex flex-col leading-tight">
                <span>Stations</span>
                {isActive('/stations') && (
                  <span class="text-xs text-slate-100/80">Browse and manage stations</span>
                )}
              </div>
            </A>
          </li>
          <li>
            <A
              href="/users"
              class={
                isActive('/users')
                  ? 'relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200'
                  : 'flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 hover:ring-1 hover:ring-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
              }
              style={
                isActive('/users')
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(210,30,30,0.35) 0%, rgba(170,24,24,0.38) 55%, rgba(140,20,20,0.42) 100%)',
                      'box-shadow':
                        'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 18px rgba(0,0,0,0.26), 0 0 0 1px rgba(190,18,18,0.30)',
                    }
                  : undefined
              }
            >
              {isActive('/users') && (
                <span class="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-9 rounded-full" style={{ background: 'rgba(255,200,200,0.9)' }} />
              )}
              <FaSolidUser class="w-5 h-5 text-white/95" />
              <div class="flex flex-col leading-tight">
                <span>Users</span>
                {isActive('/users') && (
                  <span class="text-xs text-slate-100/80">Manage users and roles</span>
                )}
              </div>
            </A>
          </li>
          <li>
            <A
              href="/technician"
              class={
                isActive('/technician')
                  ? 'relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200'
                  : 'flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 hover:ring-1 hover:ring-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
              }
              style={
                isActive('/technician')
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(210,30,30,0.35) 0%, rgba(170,24,24,0.38) 55%, rgba(140,20,20,0.42) 100%)',
                      'box-shadow':
                        'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 18px rgba(0,0,0,0.26), 0 0 0 1px rgba(190,18,18,0.30)',
                    }
                  : undefined
              }
            >
              {isActive('/technician') && (
                <span class="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-9 rounded-full" style={{ background: 'rgba(255,200,200,0.9)' }} />
              )}
              <IoHammerSharp class="w-5 h-5 text-white/95" />
              <div class="flex flex-col leading-tight">
                <span>Technicians</span>
                {isActive('/technician') && (
                  <span class="text-xs text-slate-100/80">Assignments and outages</span>
                )}
              </div>
            </A>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t" style={{ 'border-top': '1px solid rgba(110,18,18,0.58)' }}>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full text-white flex items-center justify-center font-semibold" style={{ background: 'linear-gradient(135deg, var(--brand-red), var(--brand-yellow))' }}>N</div>
          <div>
            <p class="text-sm font-medium">Nama User</p>
            <p class="text-xs text-slate-300 flex items-center gap-1">
              <span class="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--brand-green)' }} />
              User
            </p>
          </div>
        </div>
        <button class="mt-3 w-full text-left text-sm" style={{ color: 'var(--brand-white)' }}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
