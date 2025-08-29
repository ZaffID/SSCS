import type { Component } from 'solid-js';
import { createMemo, createSignal, For } from 'solid-js';
import { stations, type Station, statusColor } from '../store/data';

const Stations: Component = () => {
  const [q, setQ] = createSignal('');
  const [status, setStatus] = createSignal<'all' | Station['status']>('all');

  const filtered = createMemo(() => {
    const query = q().toLowerCase();
    const st = status();
    return stations().filter(s => {
      const matchesQ = !query || s.name.toLowerCase().includes(query) || s.region.toLowerCase().includes(query);
      const matchesS = st === 'all' || s.status === st;
      return matchesQ && matchesS;
    });
  });

  return (
    <div class="p-4 md:p-6 space-y-4">
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h2 class="text-base font-semibold">Stations</h2>
          <div class="flex gap-2 w-full sm:w-auto">
            <input
              placeholder="Search name or region..."
              class="flex-1 sm:w-64 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
              value={q()}
              onInput={(e) => setQ(e.currentTarget.value)}
            />
            <select
              class="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
              value={status()}
              onChange={(e) => setStatus(e.currentTarget.value as any)}
            >
              <option value="all">All</option>
              <option value="connected">Connected</option>
              <option value="offline">Offline</option>
              <option value="priority">Priority</option>
              <option value="onroute">On Route</option>
            </select>
          </div>
        </div>
      </div>

      <div class="rounded-2xl bg-white border border-slate-200 p-0 overflow-hidden shadow-sm">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-slate-600">
            <tr>
              <th class="text-left px-4 py-2 border-b">Name</th>
              <th class="text-left px-4 py-2 border-b">Region</th>
              <th class="text-left px-4 py-2 border-b">Status</th>
              <th class="text-left px-4 py-2 border-b">Class</th>
              <th class="text-left px-4 py-2 border-b">Last Report</th>
            </tr>
          </thead>
          <tbody>
            <For each={filtered()}>{(s) => (
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-2 border-b">{s.name}</td>
                <td class="px-4 py-2 border-b">{s.region}</td>
                <td class="px-4 py-2 border-b">
                  <span class="inline-flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[s.status] }} />
                    {s.status}
                  </span>
                </td>
                <td class="px-4 py-2 border-b">{s.class || '-'}</td>
                <td class="px-4 py-2 border-b">{s.lastReport || '-'}</td>
              </tr>
            )}</For>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stations;
