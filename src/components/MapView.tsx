import { onCleanup, onMount } from 'solid-js';
import type { Station } from '../store/data';
import { statusColor } from '../store/data';

// Menggunakan Leaflet via CDN (global `L` dari window)
declare const L: any;

export default function MapView(props: { stations: Station[]; onSelect?: (s: Station) => void }) {
  let mapEl!: HTMLDivElement;
  let map: any;
  const markers: any[] = [];

  onMount(() => {
    // Init map
    map = L.map(mapEl).setView([-2.5, 117.0], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Coverage contoh (polygon kasar Indonesia barat)
    const coverage = L.polygon([
      [-5.9, 95.0],
      [-5.9, 120.0],
      [2.0, 120.0],
      [2.0, 95.0],
    ], { color: 'var(--brand-purple)', weight: 1, fillColor: 'var(--brand-purple)', fillOpacity: 0.1 });
    coverage.addTo(map);

    // Add stations
    props.stations.forEach((s) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<span style="display:inline-block;width:12px;height:12px;border-radius:9999px;background:${statusColor[s.status]};border:2px solid white;box-shadow:0 0 0 2px ${statusColor[s.status]}33"></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const m = L.marker([s.lat, s.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<b>${s.name}</b><br/>Status: ${s.status.toUpperCase()}`
        )
        .on('click', () => props.onSelect && props.onSelect(s));
      markers.push(m);
    });

    // Fit bounds ke semua marker
    const bounds = L.latLngBounds(props.stations.map((s) => [s.lat, s.lng] as [number, number]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 7 });
    }

    // Scale bar
    L.control.scale({ metric: true, imperial: false }).addTo(map);

    // Toolbar custom (top-right)
    const toolbar: any = L.control({ position: 'topright' });
    toolbar.onAdd = function () {
      const container = L.DomUtil.create('div', 'leaflet-bar');
      container.style.background = 'white';
      container.style.borderRadius = '8px';
      container.style.overflow = 'hidden';

      const mkBtn = (label: string, title: string) => {
        const a = L.DomUtil.create('a', '', container);
        a.href = '#';
        a.title = title;
        a.innerHTML = label;
        a.style.padding = '6px 8px';
        a.style.display = 'inline-block';
        a.style.width = 'auto';
        a.style.textDecoration = 'none';
        a.style.color = '#334155';
        return a;
      };

      const recenter = mkBtn('⤾', 'Recenter to bounds');
      const reset = mkBtn('⤢', 'Reset zoom');

      L.DomEvent.on(recenter, 'click', (e: any) => {
        L.DomEvent.stop(e);
        map.fitBounds(bounds, { padding: [24, 24], maxZoom: 7 });
      });
      L.DomEvent.on(reset, 'click', (e: any) => {
        L.DomEvent.stop(e);
        map.setView([-2.5, 117.0], 5);
      });

      return container;
    };
    toolbar.addTo(map);
  });

  onCleanup(() => {
    markers.forEach((m) => m.remove());
    if (map) map.remove();
  });

  return (
    <div class="w-full h-[360px] md:h-[480px] rounded-xl overflow-hidden border border-slate-200" ref={mapEl!} />
  );
}
