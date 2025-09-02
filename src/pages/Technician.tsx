import type { Component } from 'solid-js';
import { For, Show, createMemo, createSignal } from 'solid-js';
import { stations, statusColor, type Station } from '../store/data';
import MapView from '../components/MapView';

const Technician: Component = () => {
  // Mock: show only offline stations as tasks
  const tasks = createMemo(() => stations().filter(s => s.status === 'offline'));
  const [selected, setSelected] = createSignal<Station | null>(null);
  const [taskStatus, setTaskStatus] = createSignal<Record<string, 'open' | 'in_progress' | 'done'>>({});

  const getStatus = (id: string) => taskStatus()[id] ?? 'open';
  const setStatus = (id: string, st: 'open' | 'in_progress' | 'done') => setTaskStatus({ ...taskStatus(), [id]: st });

  const onAccept = (id: string) => setStatus(id, 'in_progress');
  const onDone = (id: string) => setStatus(id, 'done');

  return (
    <div class="p-4 md:p-6 space-y-4">
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold">Technician Board</h2>
            <p class="text-sm text-slate-600 mt-1">Offline sites in your area (mock)</p>
          </div>
          <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50">Sync</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div class="relative w-full overflow-auto">
            <table class="w-full text-sm">
              <thead class="bg-slate-50 text-slate-600 sticky top-0 z-10">
                <tr>
                  <th class="text-left px-4 py-3 border-b font-medium">Station</th>
                  <th class="text-left px-4 py-3 border-b font-medium">Region</th>
                  <th class="text-left px-4 py-3 border-b font-medium">Status</th>
                  <th class="text-left px-4 py-3 border-b font-medium">Last Report</th>
                  <th class="text-left px-4 py-3 border-b font-medium">Task Status</th>
                  <th class="text-left px-4 py-3 border-b font-medium">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <For each={tasks()}>{(s) => (
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
                    <td class="px-4 py-3 text-slate-600">{s.lastReport || '-'}</td>
                    <td class="px-4 py-3">
                      <span class="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border"
                        classList={{
                          'bg-slate-50 text-slate-700 border-slate-200': getStatus(s.id) === 'open',
                          'bg-yellow-50 text-yellow-700 border-yellow-200': getStatus(s.id) === 'in_progress',
                          'bg-green-50 text-green-700 border-green-200': getStatus(s.id) === 'done',
                        }}>
                        {getStatus(s.id).replace('_', ' ')}
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex gap-2">
                        <button class="px-2.5 py-1 text-xs rounded-md border border-slate-200 disabled:opacity-50 hover:bg-slate-50" disabled={getStatus(s.id) !== 'open'} onClick={(e) => { e.stopPropagation(); onAccept(s.id); }}>Accept</button>
                        <button class="px-2.5 py-1 text-xs rounded-md border border-slate-200 disabled:opacity-50 hover:bg-slate-50" disabled={getStatus(s.id) !== 'in_progress'} onClick={(e) => { e.stopPropagation(); onDone(s.id); }}>Done</button>
                      </div>
                    </td>
                  </tr>
                )}</For>
              </tbody>
            </table>
          </div>
        </div>
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <h3 class="font-semibold">Task Detail & Mini Map</h3>
          <Show when={selected()} fallback={<div class="mt-2 text-sm text-slate-500">Pilih task dari tabel untuk melihat detail.</div>}>
            {(s) => (
              <div>
                <div class="mt-2">
                  <MapView stations={[s()]} onSelect={() => {}} showCoverage={false} />
                </div>
                <div class="mt-3 text-sm text-slate-700">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">{s().name}</div>
                      <div class="text-xs text-slate-500">{s().region} • Last: {s().lastReport || '-'}</div>
                    </div>
                    <span class="inline-flex items-center gap-2 text-xs"><span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[s().status] }} />{s().status}</span>
                  </div>
                </div>
                <div class="mt-3 flex gap-2">
                  <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 disabled:opacity-50" disabled={getStatus(s().id) !== 'open'} onClick={() => onAccept(s().id)}>Accept</button>
                  <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 disabled:opacity-50" disabled={getStatus(s().id) !== 'in_progress'} onClick={() => onDone(s().id)}>Done</button>
                </div>
              </div>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Technician;
