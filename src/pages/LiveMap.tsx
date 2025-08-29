import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import MapView from '../components/MapView';
import { stations, type Station, statusColor } from '../store/data';

const LiveMap: Component = () => {
  const [selected, setSelected] = createSignal<Station | null>(null);

  return (
    <div class="p-4 md:p-6">
      <div class="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
        <div class="flex items-center justify-between px-1 pb-3">
          <h2 class="text-base font-semibold">Live Map</h2>
          <div class="flex gap-2 md:gap-3 text-slate-600 flex-wrap">
            <div class="flex items-center gap-2 text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.connected }} />Connected</div>
            <div class="flex items-center gap-2 text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.offline }} />Offline</div>
            <div class="flex items-center gap-2 text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.priority }} />Priority</div>
            <div class="flex items-center gap-2 text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor.onroute }} />On Route</div>
          </div>
        </div>
        <MapView stations={stations()} onSelect={setSelected} />
      </div>

      <Show when={selected()}>
        {(s) => (
          <div class="mt-4 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">{s().name}</h3>
              <span class="inline-flex items-center gap-2 text-sm"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[s().status] }} />{s().status}</span>
            </div>
            <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <div><span class="text-slate-500">Location:</span> {s().lat.toFixed(3)}, {s().lng.toFixed(3)}</div>
              <div><span class="text-slate-500">Region:</span> {s().region}</div>
              <div><span class="text-slate-500">Class:</span> {s().class || '-'}</div>
              <div><span class="text-slate-500">Last Report:</span> {s().lastReport || '-'}</div>
              <div><span class="text-slate-500">Technician:</span> {s().technician || '-'}</div>
            </div>
            <div class="mt-3">
              <p class="text-slate-500 text-sm">Fuel Stock</p>
              <div class="mt-1 flex gap-2 text-xs">
                <div class="px-2 py-1 rounded-full border bg-slate-50">Pertalite: {s().fuelStock?.pertalite ?? '-'}%</div>
                <div class="px-2 py-1 rounded-full border bg-slate-50">Pertamax: {s().fuelStock?.pertamax ?? '-'}%</div>
                <div class="px-2 py-1 rounded-full border bg-slate-50">Solar: {s().fuelStock?.solar ?? '-'}%</div>
              </div>
            </div>
            <div class="mt-3 flex gap-2">
              <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200">Request Technician</button>
              <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200">Mark Resolved</button>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
};

export default LiveMap;
