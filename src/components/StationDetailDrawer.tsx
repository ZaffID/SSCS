import type { Component } from 'solid-js';
import { Show, createMemo } from 'solid-js';
import type { Station } from '../store/data';
import { statusColor } from '../store/data';

const Row: Component<{ label: string; value?: string | number }> = (p) => (
  <div class="flex items-center justify-between text-sm">
    <span class="text-slate-500">{p.label}</span>
    <span class="text-slate-800">{p.value ?? '-'}</span>
  </div>
);

export default function StationDetailDrawer(props: { station: Station | null; open: boolean; onClose: () => void }) {
  const offlineHours = createMemo(() => {
    const txt = props.station?.lastReport;
    if (!txt) return 0;
    if (txt.includes('h')) return parseFloat(txt) || 0;
    if (txt.includes('d')) return (parseFloat(txt) || 0) * 24;
    if (txt.includes('m')) return (parseFloat(txt) || 0) / 60;
    return 0;
  });

  return (
    <div class={"fixed inset-y-0 right-0 z-50 w-[380px] max-w-[90vw] bg-white border-l border-slate-200 shadow-xl transition-transform duration-300 " + (props.open ? 'translate-x-0' : 'translate-x-full')}>
      <div class="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        <h3 class="font-semibold">Station Detail</h3>
        <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200" onClick={props.onClose}>Close</button>
      </div>

      <div class="p-4 space-y-4">
        <Show when={props.station}>
          {(s) => (
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between">
                  <h4 class="text-base font-semibold">{s().name}</h4>
                  <span class="inline-flex items-center gap-2 text-xs">
                    <span class="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[s().status] }} />
                    {s().status}
                  </span>
                </div>
                <p class="text-xs text-slate-500">{s().region} • Class {s().class ?? '-'}</p>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <Row label="Latitude" value={s().lat.toFixed(3)} />
                <Row label="Longitude" value={s().lng.toFixed(3)} />
                <Row label="Last Report" value={s().lastReport ?? '-'} />
                <Row label="Technician" value={s().technician ?? '-'} />
              </div>

              <div>
                <p class="text-sm text-slate-600">Fuel Stock</p>
                <div class="mt-2 space-y-2">
                  {(['pertalite','pertamax','solar'] as const).map((k) => {
                    const v = s().fuelStock?.[k] ?? 0;
                    return (
                      <div>
                        <div class="flex items-center justify-between text-xs"><span class="capitalize">{k}</span><span>{v}%</span></div>
                        <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div class="h-full rounded-full bg-[var(--brand-blue)]" style={{ width: `${Math.min(100, Math.max(0, v))}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p class="text-sm text-slate-600">Connectivity Logs (dummy)</p>
                <ul class="mt-2 text-xs text-slate-700 space-y-1.5">
                  <li>Link restored • 1h ago</li>
                  <li>High latency detected • 3h ago</li>
                  <li>Heartbeat missed • 4h ago</li>
                </ul>
              </div>

              <div>
                <p class="text-sm text-slate-600">Offline Duration</p>
                <div class="mt-1 text-xs text-slate-700">~ {offlineHours().toFixed(2)} hours (approx)</div>
              </div>

              <div class="flex gap-2">
                <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200">Request Technician</button>
                <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200">Mark Resolved</button>
              </div>
            </div>
          )}
        </Show>
      </div>
    </div>
  );
}
