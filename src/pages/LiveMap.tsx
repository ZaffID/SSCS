import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import MapView from '../components/MapView';
import { stations, type Station, statusColor } from '../store/data';
import StationDetailDrawer from '../components/StationDetailDrawer';

const LiveMap: Component = () => {
  const [selected, setSelected] = createSignal<Station | null>(null);

  return (
    <div class="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">Live Map</h1>
          <p class="text-slate-600 text-sm md:text-base mt-1">Interactive geospatial overview of stations, status, and on‑route activities.</p>
        </div>
        <div class="hidden sm:flex items-center gap-2">
          <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50">Export View</button>
          <button class="px-3 py-1.5 text-sm rounded-lg bg-[var(--brand-blue)] text-white">Refresh</button>
        </div>
      </div>

      {/* Content */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map panel */}
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
            <div class="flex items-center justify-between px-1 pb-3">
              <div>
                <h2 class="text-base font-semibold">Network Overview</h2>
                <p class="text-xs text-slate-500">Use the map to locate sites and open station details.</p>
              </div>
              <div class="flex gap-2 md:gap-3 text-slate-600 flex-wrap">
                <div class="flex items-center gap-2 text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.connected }} />Connected</div>
                <div class="flex items-center gap-2 text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.offline }} />Offline</div>
                <div class="flex items-center gap-2 text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.priority }} />Priority</div>
                <div class="flex items-center gap-2 text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.onroute }} />On Route</div>
              </div>
            </div>
            <MapView stations={stations()} onSelect={setSelected} />
          </div>
        </div>

        {/* Side information */}
        <div class="space-y-4">
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold text-[var(--brand-blue)]">About this map</h3>
            <p class="text-sm text-slate-700 mt-2">
              This map visualizes station locations and connectivity in near real‑time. Select a marker to open a
              detailed drawer with site information, status, and recent activities.
            </p>
            <ul class="mt-3 space-y-1.5 text-sm text-slate-700 list-disc pl-5">
              <li>Connected sites appear in green, offline in red.</li>
              <li>“Priority” highlights rollout phase‑1 targets.</li>
              <li>“On Route” indicates field assignments in progress.</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h3 class="font-semibold">Tips</h3>
            <ul class="mt-2 text-sm text-slate-700 space-y-1.5">
              <li>Drag to pan, scroll to zoom, click a marker to open details.</li>
              <li>Use the Dashboard for filters and rollout insights.</li>
              <li>Export the current view to include in reports.</li>
            </ul>
          </div>
        </div>
      </div>

      <StationDetailDrawer station={selected()} open={!!selected()} onClose={() => setSelected(null)} />
    </div>
  );
};

export default LiveMap;
