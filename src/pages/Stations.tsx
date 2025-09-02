import type { Component } from 'solid-js';
import { createMemo, createSignal, createEffect, For } from 'solid-js';
import { stations, type Station, statusColor } from '../store/data';
import StationDetailDrawer from '../components/StationDetailDrawer';

const Stations: Component = () => {
  const [q, setQ] = createSignal('');
  const [status, setStatus] = createSignal<'all' | Station['status']>('all');
  const [region, setRegion] = createSignal<'all' | string>('all');
  const [selected, setSelected] = createSignal<Station | null>(null);

  // basic pagination
  const [page, setPage] = createSignal(1);
  const pageSize = 10;

  const regions = createMemo(() => {
    const set = new Set(stations().map(s => s.region));
    return Array.from(set).sort();
  });

  const filtered = createMemo(() => {
    const query = q().toLowerCase();
    const st = status();
    return stations().filter(s => {
      const matchesQ = !query || s.name.toLowerCase().includes(query) || s.region.toLowerCase().includes(query);
      const matchesS = st === 'all' || s.status === st;
      const matchesR = region() === 'all' || s.region === region();
      return matchesQ && matchesS && matchesR;
    });
  });

  // reset page when filter changes
  createEffect(() => {
    q(); status(); region();
    setPage(1);
  });

  const total = createMemo(() => filtered().length);
  const paginated = createMemo(() => filtered().slice((page() - 1) * pageSize, page() * pageSize));

  // stats per status for tabs
  const stats = createMemo(() => {
    const base = { all: stations().length, connected: 0, offline: 0, priority: 0, onroute: 0 } as Record<'all' | Station['status'], number>;
    stations().forEach(s => { base[s.status]++; });
    return base;
  });

  return (
    <div class="p-4 md:p-6 space-y-4">
      {/* Toolbar */}
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-semibold tracking-tight">Stations</h2>
              <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{stations().length} total</span>
            </div>
            <button class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 transition">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
          </div>

          <div class="flex flex-col md:flex-row md:items-center gap-3">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                placeholder="Search name or region..."
                class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                value={q()}
                onInput={(e) => setQ(e.currentTarget.value)}
              />
            </div>

            <div class="flex items-center gap-2">
              <select
                class="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50"
                value={region()}
                onChange={(e) => setRegion(e.currentTarget.value as any)}
              >
                <option value="all">All Regions</option>
                <For each={regions()}>{(r) => <option value={r}>{r}</option>}</For>
              </select>
            </div>
          </div>

          {/* status tabs */}
          <div class="flex flex-wrap gap-2">
            <button onClick={() => setStatus('all')} class={`px-3 py-1.5 rounded-full text-xs border transition ${status()==='all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
              All <span class="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{stats().all}</span>
            </button>
            <button onClick={() => setStatus('connected')} class={`px-3 py-1.5 rounded-full text-xs border transition ${status()==='connected' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
              <span class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full" style={{ background: statusColor['connected'] }} /></span>
              Connected <span class="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{stats().connected}</span>
            </button>
            <button onClick={() => setStatus('offline')} class={`px-3 py-1.5 rounded-full text-xs border transition ${status()==='offline' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
              <span class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full" style={{ background: statusColor['offline'] }} /></span>
              Offline <span class="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{stats().offline}</span>
            </button>
            <button onClick={() => setStatus('priority')} class={`px-3 py-1.5 rounded-full text-xs border transition ${status()==='priority' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
              <span class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full" style={{ background: statusColor['priority'] }} /></span>
              Priority <span class="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{stats().priority}</span>
            </button>
            <button onClick={() => setStatus('onroute')} class={`px-3 py-1.5 rounded-full text-xs border transition ${status()==='onroute' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
              <span class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full" style={{ background: statusColor['onroute'] }} /></span>
              On Route <span class="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{stats().onroute}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div class="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div class="relative w-full overflow-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-slate-600 sticky top-0 z-10">
              <tr>
                <th class="text-left px-4 py-3 border-b font-medium">Name</th>
                <th class="text-left px-4 py-3 border-b font-medium">Region</th>
                <th class="text-left px-4 py-3 border-b font-medium">Status</th>
                <th class="text-left px-4 py-3 border-b font-medium">Class</th>
                <th class="text-left px-4 py-3 border-b font-medium">Last Report</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <For each={paginated()}>{(s) => (
                <tr class="hover:bg-slate-50 cursor-pointer transition" onClick={() => setSelected(s)}>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-3">
                      <span class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold">{s.name.split(' ').pop()?.slice(-2)}</span>
                      <span class="font-medium text-slate-800">{s.name}</span>
                    </span>
                  </td>
                  <td class="px-4 py-3 text-slate-700">{s.region}</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs bg-white text-slate-900 border-slate-200">
                      <span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[s.status] }} />
                      {s.status}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-slate-100 border border-slate-200 text-slate-700">{s.class || '-'}</span>
                  </td>
                  <td class="px-4 py-3 text-slate-600">{s.lastReport || '-'}</td>
                </tr>
              )}</For>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div class="flex items-center justify-between px-4 py-3 border-t bg-white">
          <div class="text-xs text-slate-600">Showing {(paginated().length ? (page()-1)*pageSize + 1 : 0)} - {(page()-1)*pageSize + paginated().length} of {total()}</div>
          <div class="flex items-center gap-2">
            <button disabled={page()===1} onClick={() => setPage(Math.max(1, page()-1))} class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-50">Prev</button>
            <span class="text-sm text-slate-700">Page {page()}</span>
            <button disabled={page()*pageSize>=total()} onClick={() => setPage(page()+1)} class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      <StationDetailDrawer station={selected()} open={!!selected()} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Stations;
