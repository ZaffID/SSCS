import type { Component } from 'solid-js';
import { createSignal, onCleanup, onMount, Show, createMemo } from 'solid-js';
import { IoNotifications } from 'solid-icons/io';
import { alerts } from '../store/data';
import { A, useLocation } from '@solidjs/router';

const Navbar: Component = () => {
  const location = useLocation();
  const [now, setNow] = createSignal(new Date());
  const [openNotif, setOpenNotif] = createSignal(false);
  const unreadCount = () => alerts().length;

  // Profile data from localStorage for avatar/name consistency
  const [fullName, setFullName] = createSignal('Nama User');
  const [email, setEmail] = createSignal('user@example.com');
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);
  const initials = createMemo(() => {
    const parts = fullName().trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase() || 'U';
  });

  let notifRef: HTMLDivElement | undefined;
  const handleDocClick = (e: MouseEvent) => {
    if (openNotif() && notifRef && !notifRef.contains(e.target as Node)) {
      setOpenNotif(false);
    }
  };
  const timer = setInterval(() => setNow(new Date()), 1000);
  document.addEventListener('click', handleDocClick);
  onCleanup(() => {
    clearInterval(timer);
    document.removeEventListener('click', handleDocClick);
  });

  const dateStr = () => now().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = () => now().toLocaleTimeString('id-ID', { hour12: false });

  // Determine current page title from route
  const pageTitle = () => {
    const path = location.pathname.toLowerCase();
    const map: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/map': 'Live Map',
      '/stations': 'Stations',
      '/users': 'Users',
      '/technician': 'Technicians',
      '/analytics': 'Analytics',
      '/consumer': 'Consumer',
      '/profile': 'Profile'
    };
    if (map[path]) return map[path];
    // Fallback: last segment capitalized
    const seg = path.split('/').filter(Boolean).pop() || 'Dashboard';
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  };

  onMount(() => {
    try {
      const saved = localStorage.getItem('profileData');
      if (saved) {
        const obj = JSON.parse(saved);
        if (obj.fullName) setFullName(obj.fullName);
        if (obj.email) setEmail(obj.email);
        if (typeof obj.avatarUrl !== 'undefined') setAvatarUrl(obj.avatarUrl);
      }
    } catch {}
  });

  return (
    <header class="h-16 bg-white/70 backdrop-blur border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Kiri: breadcrumb + search */}
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <button class="md:hidden p-2 rounded-lg border border-slate-200">☰</button>
        <div class="hidden sm:flex items-center gap-2 text-slate-500">
          {/* Home icon */}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.125 1.125 0 011.592 0L21.75 12M4.5 9.75V21a.75.75 0 00.75.75H9.75v-6h4.5v6h4.5a.75.75 0 00.75-.75V9.75"/></svg>
          <span>/</span>
          <span class="text-slate-800 font-medium">{pageTitle()}</span>
        </div>

        {/* Search pill */}
        <div class="flex-1 max-w-xl ml-2">
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"/></svg>
            </span>
            <input
              type="text"
              placeholder="Search assets, spare parts or ..."
              class="w-full pl-9 pr-3 py-2 rounded-full border border-slate-200 bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-[var(--brand-red)] focus:ring-[var(--brand-red)]"
            />
          </div>
        </div>
      </div>

      {/* Kanan: date badge, time badge, bell, avatar */}
      <div class="flex items-center gap-3 text-sm text-slate-600">
        <div class="hidden md:flex items-center gap-2">
          <div class="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[var(--brand-red)]" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M7.5 3.75h9A2.25 2.25 0 0118.75 6v12A2.25 2.25 0 0116.5 20.25h-9A2.25 2.25 0 015.25 18V6A2.25 2.25 0 017.5 3.75z"/></svg>
            <span>{dateStr()}</span>
          </div>
          <div class="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[var(--brand-red)]" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l3 3"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            <span>{timeStr()}</span>
          </div>
        </div>

        <div class="relative" ref={(el) => (notifRef = el as HTMLDivElement)}>
          <button
            class="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpenNotif(!openNotif());
            }}
            aria-label="Notifications"
          >
            {/* Bell icon (solid-icons) */}
            <IoNotifications class="w-5 h-5 text-slate-600" />
            {/* unread badge */}
            <span class="absolute -top-0.5 -right-0.5 min-w-[18px] h-4 px-1 rounded-full text-[10px] leading-4 text-white text-center"
              style={{ background: 'var(--brand-red)' }}>{unreadCount()}</span>
          </button>

          {/* Dropdown */}
          {openNotif() && (
            <div class="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-40">
              <div class="px-4 py-2 text-sm font-medium text-slate-700 flex items-center justify-between bg-slate-50">
                <span>Notifications</span>
                <span class="text-xs text-slate-500">{unreadCount()} unread</span>
              </div>
              <ul class="max-h-80 overflow-auto">
                {alerts().map(n => (
                  <li class="px-4 py-3 flex items-start gap-3 hover:bg-slate-50">
                    <span class="mt-1 inline-block w-2 h-2 rounded-full" style={{ background: 'var(--brand-red)' }}></span>
                    <div class="flex-1">
                      <p class="text-sm text-slate-800">{n.message}</p>
                    </div>
                    <span class="text-[10px] text-slate-500">NEW</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <A href="/profile" class="relative w-9 h-9 rounded-full text-white flex items-center justify-center font-semibold hover:opacity-90 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #ef4444 55%, #fb7185 100%)' }}>
          <Show when={avatarUrl()} fallback={<span>{initials()}</span>}>
            <img src={avatarUrl()!} alt="Avatar" class="w-full h-full object-cover" />
          </Show>
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white" style={{ background: 'var(--brand-green)' }}></span>
        </A>
      </div>
    </header>
  );
};

export default Navbar;
