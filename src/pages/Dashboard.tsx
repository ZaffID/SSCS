import type { Component } from 'solid-js';
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
            <div class="flex items-center justify-between px-1 pb-3">
              <h2 class="text-base font-semibold">Live Map</h2>
              <div class="flex gap-2 md:gap-3 text-slate-600 flex-wrap">
                <LegendItem color={statusColor.connected} label="Connected" />
                <LegendItem color={statusColor.offline} label="Offline" />
                <LegendItem color={statusColor.priority} label="Priority Rollout" />
                <LegendItem color={statusColor.onroute} label="On Route" />
                <LegendItem color="var(--brand-purple)" label="Coverage Area" />
              </div>
            </div>
            <MapView stations={stations()} onSelect={(s) => console.log('selected', s)} />
          </div>
        </div>
        <div class="space-y-4">
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold">Operational Capability</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-700">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-green)' }}></span>150+ field technicians nationwide</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-green)' }}></span>99.5% uptime target</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-green)' }}></span>&lt;24h rapid-response capability</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold">Impact Tracking</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-700">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-purple)' }}></span>Real-time progress monitoring</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-purple)' }}></span>Transparent SLA &amp; uptime reporting</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-purple)' }}></span>Data-driven decisions for coverage &amp; supply</li>
            </ul>
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
