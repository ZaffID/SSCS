import type { Component } from 'solid-js';
import { For, createMemo } from 'solid-js';
import { stations, statusColor } from '../store/data';

const Technician: Component = () => {
  // Mock: show only offline stations as tasks
  const tasks = createMemo(() => stations().filter(s => s.status === 'offline'));

  return (
    <div class="p-4 md:p-6 space-y-4">
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <h2 class="text-base font-semibold">Technician Board</h2>
        <p class="text-sm text-slate-600 mt-1">Offline sites in your area (mock)</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-0 overflow-hidden shadow-sm">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-slate-600">
              <tr>
                <th class="text-left px-4 py-2 border-b">Station</th>
                <th class="text-left px-4 py-2 border-b">Region</th>
                <th class="text-left px-4 py-2 border-b">Status</th>
                <th class="text-left px-4 py-2 border-b">Last Report</th>
              </tr>
            </thead>
            <tbody>
              <For each={tasks()}>{(s) => (
                <tr class="hover:bg-slate-50">
                  <td class="px-4 py-2 border-b">{s.name}</td>
                  <td class="px-4 py-2 border-b">{s.region}</td>
                  <td class="px-4 py-2 border-b">
                    <span class="inline-flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[s.status] }} />
                      {s.status}
                    </span>
                  </td>
                  <td class="px-4 py-2 border-b">{s.lastReport || '-'}</td>
                </tr>
              )}</For>
            </tbody>
          </table>
        </div>
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <h3 class="font-semibold">Mini Map (placeholder)</h3>
          <div class="mt-2 h-48 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
            Map preview here
          </div>
          <div class="mt-3 flex gap-2">
            <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200">Start Route</button>
            <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200">Complete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technician;
