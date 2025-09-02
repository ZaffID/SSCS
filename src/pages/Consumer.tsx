import type { Component } from 'solid-js';
import { createMemo, createSignal, For } from 'solid-js';
import MapView from '../components/MapView';
import { stations, type Station } from '../store/data';

const Consumer: Component = () => {
  const [q, setQ] = createSignal('');
  const [selected, setSelected] = createSignal<Station | null>(null);

  const filtered = createMemo(() => {
    const keyword = q().toLowerCase();
    return stations().filter((s) => !keyword || s.name.toLowerCase().includes(keyword) || s.region.toLowerCase().includes(keyword));
  });

  return (
    <div class="p-4 md:p-6 space-y-4">
      {/* Toolbar */}
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-semibold">Consumer View</h2>
              <p class="text-sm text-slate-600">Find nearby stations and view fuel stock (mock)</p>
            </div>
            <button class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>
              Locate Me
            </button>
          </div>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input
              placeholder="Search name/region..."
              class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={q()}
              onInput={(e) => setQ(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>

      {/* Map + Results */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
            <MapView stations={filtered()} onSelect={setSelected} />
          </div>
        </div>
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">Search Results</h3>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{filtered().length}</span>
          </div>
          <ul class="mt-3 space-y-2 text-sm">
            <For each={filtered()}>{(s) => (
              <li class="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between">
                <div class="min-w-0">
                  <p class="font-medium truncate">{s.name}</p>
                  <p class="text-slate-500 text-xs truncate">{s.region} • Class {s.class ?? '-'}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="hidden sm:inline-flex items-center px-2 py-1 text-[10px] rounded-md bg-slate-100 border border-slate-200 text-slate-700">{s.class || '-'}</span>
                  <button class="px-3 py-1.5 text-xs rounded-lg border border-slate-200 hover:bg-slate-100" onClick={() => setSelected(s)}>View</button>
                </div>
              </li>
            )}</For>
          </ul>
        </div>
      </div>

      {/* Selected Detail */}
      {selected() && (
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold">{selected()!.name.split(' ').pop()?.slice(-2)}</span>
              <h3 class="font-semibold">{selected()!.name}</h3>
            </div>
            <button class="text-sm px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50" onClick={() => setSelected(null)}>Close</button>
          </div>
          <div class="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-700">
            <div><span class="text-slate-500">Location:</span> {selected()!.lat.toFixed(3)}, {selected()!.lng.toFixed(3)}</div>
            <div><span class="text-slate-500">Region:</span> {selected()!.region}</div>
            <div><span class="text-slate-500">Class:</span> {selected()!.class || '-'}</div>
          </div>
          <div class="mt-3">
            <p class="text-slate-500 text-sm">Fuel Stock</p>
            <div class="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div class="px-2 py-1 rounded-full border bg-slate-50">Pertalite: {selected()!.fuelStock?.pertalite ?? '-'}%</div>
              <div class="px-2 py-1 rounded-full border bg-slate-50">Pertamax: {selected()!.fuelStock?.pertamax ?? '-'}%</div>
              <div class="px-2 py-1 rounded-full border bg-slate-50">Solar: {selected()!.fuelStock?.solar ?? '-'}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consumer;
