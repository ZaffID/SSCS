import type { Component } from 'solid-js';
import { createMemo, createSignal } from 'solid-js';
import MapView from '../components/MapView';
import { stations, kpi, statusColor } from '../store/data';

const StatCard: Component<{ title: string; value: string; delta?: string; color?: string }> = (props) => {
  const deltaColor = () =>
    props.delta && props.delta.includes('↑')
      ? 'var(--brand-green)'
      : props.delta && props.delta.includes('↓')
      ? 'var(--brand-red)'
      : 'var(--brand-blue)';

  return (
    <div class={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow`}> 
      <div class="text-slate-500 text-sm flex items-center gap-2">
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-400"></span>
        <p>{props.title}</p>
      </div>
      <div class="mt-2 flex items-end justify-between">
        <h3 class="text-3xl font-semibold tracking-tight">{props.value}</h3>
        {props.delta && (
          <span class={`text-xs font-medium bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5`} style={{ color: deltaColor() }}>{props.delta}</span>
        )}
      </div>
    </div>
  );
};

const LegendItem: Component<{ color: string; label: string }> = (p) => (
  <div class="flex items-center gap-2 text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50">
    <span class="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
    <span class="text-slate-700">{p.label}</span>
  </div>
);

const Dashboard: Component = () => {
  // Filters
  const [fConnected, setFConnected] = createSignal(true);
  const [fOffline, setFOffline] = createSignal(true);
  const [fPriority, setFPriority] = createSignal(true);
  const [fOnroute, setFOnroute] = createSignal(true);
  const [fCoverage, setFCoverage] = createSignal(true);

  const filteredStations = createMemo(() =>
    stations().filter((s) =>
      (s.status === 'connected' ? fConnected() : true) &&
      (s.status === 'offline' ? fOffline() : true) &&
      (s.status === 'priority' ? fPriority() : true) &&
      (s.status === 'onroute' ? fOnroute() : true)
    )
  );

  const rolloutTarget = 500; // mock target
  const progressPct = createMemo(() => Math.min(100, Math.round((kpi().priority / rolloutTarget) * 100)));

  return (
    <div class="p-4 md:p-6 space-y-6">
      {/* Baris metrik utama */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total SPBU" value={`${kpi().total}`} />
        <StatCard title="Connected" value={`${kpi().connected}`} delta="↑" />
        <StatCard title="On-Route" value={`${kpi().onroute}`} />
        <StatCard title="Offline" value={`${kpi().offline}`} delta="↓" />
      </div>

      {/* Peta dan legenda */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
            {/* Top summary strip */}
            <div class="flex flex-wrap items-center justify-between gap-3 px-1 pb-2">
              <div>
                <h2 class="text-base font-semibold">Live Map</h2>
                <p class="text-xs text-[var(--brand-blue)]/90 font-medium">Center Visual (GIS Map)</p>
              </div>
              <div class="flex items-center gap-3 text-xs md:text-sm">
                <div class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style={{ background: statusColor.connected }} />Total: {kpi().total}</div>
                <div class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style={{ background: statusColor.connected }} />Connected: {kpi().connected}</div>
                <div class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style={{ background: statusColor.offline }} />Offline: {kpi().offline}</div>
                <div class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-slate-400" />Uptime: 99.5%</div>
              </div>
            </div>

            {/* Filters */}
            <div class="flex flex-wrap items-center gap-3 px-1 pb-3 text-slate-600">
              <label class="inline-flex items-center gap-1 text-sm"><input type="checkbox" checked={fConnected()} onInput={(e) => setFConnected((e.target as HTMLInputElement).checked)} /> Connected</label>
              <label class="inline-flex items-center gap-1 text-sm"><input type="checkbox" checked={fOffline()} onInput={(e) => setFOffline((e.target as HTMLInputElement).checked)} /> Offline</label>
              <label class="inline-flex items-center gap-1 text-sm"><input type="checkbox" checked={fPriority()} onInput={(e) => setFPriority((e.target as HTMLInputElement).checked)} /> Priority</label>
              <label class="inline-flex items-center gap-1 text-sm"><input type="checkbox" checked={fOnroute()} onInput={(e) => setFOnroute((e.target as HTMLInputElement).checked)} /> On Route</label>
              <div class="hidden md:inline-block h-4 w-px bg-slate-200 mx-1" />
              <label class="inline-flex items-center gap-1 text-sm"><input type="checkbox" checked={fCoverage()} onInput={(e) => setFCoverage((e.target as HTMLInputElement).checked)} /> Coverage</label>
            </div>

            <MapView stations={filteredStations()} showCoverage={fCoverage()} onSelect={(s) => console.log('selected', s)} />
          </div>
        </div>
        <div class="space-y-4">
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold text-[var(--brand-blue)]">Operational Capability</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-700">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-green)' }}></span>150+ field technicians nationwide</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-green)' }}></span>99.5% uptime target</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-green)' }}></span>&lt;24h rapid-response capability</li>
            </ul>
          </div>
          {/* Connectivity Status Panel */}
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold text-[var(--brand-blue)]">Connectivity Status</h3>
            <ul class="mt-3 space-y-1.5 text-sm text-slate-700">
              <li class="flex justify-between"><span>Total SPBU</span><span class="text-slate-600">{kpi().total.toLocaleString()}</span></li>
              <li class="flex justify-between"><span>Connected</span><span class="text-slate-600">{kpi().connected.toLocaleString()}</span></li>
              <li class="flex justify-between"><span>Offline</span><span class="text-slate-600">{kpi().offline.toLocaleString()}</span></li>
              <li class="flex justify-between"><span>Priority sites (Phase 1 target)</span><span class="text-slate-600">{kpi().priority}/{rolloutTarget}</span></li>
            </ul>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs text-slate-500 mb-1"><span>Rollout Progress</span><span>{progressPct()}%</span></div>
              <div class="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-[--brand-orange] via-[--brand-red] to-[--brand-red]" style={{ width: `${progressPct()}%` }} />
              </div>
            </div>
          </div>
          {/* Implementation Progress */}
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold text-[var(--brand-blue)]">Implementation Progress</h3>
            <ol class="mt-3 space-y-3 text-sm text-slate-700">
              <li class="flex items-center gap-3"><span class="size-2 rounded-full bg-[--brand-blue]"></span><span class="flex-1">Planning</span><span class="text-slate-500">100%</span></li>
              <li class="flex items-center gap-3"><span class="size-2 rounded-full bg-[--brand-green]"></span><span class="flex-1">Deployment</span><span class="text-slate-500">65%</span></li>
              <li class="flex items-center gap-3"><span class="size-2 rounded-full bg-[--brand-orange]"></span><span class="flex-1">Verification</span><span class="text-slate-500">42%</span></li>
              <li class="flex items-center gap-3"><span class="size-2 rounded-full bg-[--brand-purple]"></span><span class="flex-1">Handover</span><span class="text-slate-500">18%</span></li>
            </ol>
          </div>
        </div>
      </div>

      {/* Users & Technicians */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <h3 class="font-semibold">Users</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li class="flex justify-between"><span>Admin HQ</span><span class="text-slate-500">24 online</span></li>
            <li class="flex justify-between"><span>Regional Ops</span><span class="text-slate-500">56 online</span></li>
            <li class="flex justify-between"><span>Station Managers</span><span class="text-slate-500">312 online</span></li>
          </ul>
        </div>
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <h3 class="font-semibold">Technicians</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li class="flex justify-between"><span>Active Tickets</span><span class="text-slate-500">35</span></li>
            <li class="flex justify-between"><span>On Route</span><span class="text-slate-500">12</span></li>
            <li class="flex justify-between"><span>Awaiting Parts</span><span class="text-slate-500">5</span></li>
          </ul>
        </div>
      </div>

      {/* Recent Activities */}
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <h3 class="font-semibold">Recent Activities</h3>
        <ul class="mt-3 space-y-2 text-sm">
          <li>Scheduled maintenance for site EXC-001 • 2 hours ago</li>
          <li>High temperature alert resolved at SPBU 34.123.02 • 3 hours ago</li>
          <li>Rollout batch 1 (50 sites) completed • yesterday</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
