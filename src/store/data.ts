import { createSignal } from 'solid-js';

export type StationStatus = 'connected' | 'offline' | 'priority' | 'onroute';
export type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: StationStatus;
  class?: string;
  lastReport?: string;
  fuelStock?: { pertalite?: number; pertamax?: number; solar?: number };
  technician?: string;
};

export type UserRole = 'admin' | 'technician' | 'operator';

const initialStations: Station[] = [
  { id: 'SPBU-1', name: 'SPBU 34.123.01', lat: -6.200, lng: 106.816, region: 'DKI', status: 'connected', class: 'A', lastReport: '10m ago', fuelStock: { pertalite: 78, pertamax: 62, solar: 40 } },
  { id: 'SPBU-2', name: 'SPBU 34.123.02', lat: -6.920, lng: 107.610, region: 'JBR', status: 'offline', class: 'B', lastReport: '3h ago', fuelStock: { pertalite: 12, pertamax: 20, solar: 8 }, technician: 'Adi' },
  { id: 'SPBU-3', name: 'SPBU 34.123.03', lat: -7.257, lng: 112.752, region: 'JTM', status: 'priority', class: 'A', lastReport: '1h ago', fuelStock: { pertalite: 35, pertamax: 25, solar: 18 } },
  { id: 'SPBU-4', name: 'SPBU 34.123.04', lat: -0.789, lng: 113.921, region: 'KLT', status: 'onroute', class: 'C', lastReport: '45m ago', fuelStock: { pertalite: 60, pertamax: 40, solar: 50 }, technician: 'Budi' },
  { id: 'SPBU-5', name: 'SPBU 34.123.05', lat: -6.914, lng: 107.609, region: 'JBR', status: 'offline', class: 'B', lastReport: '26h ago', fuelStock: { pertalite: 5, pertamax: 12, solar: 4 }, technician: 'Cici' },
];

export const [stations, setStations] = createSignal<Station[]>(initialStations);
export const [role, setRole] = createSignal<UserRole>('admin');

// Alerts: offline > X jam atau priority rollout
export const [alertThresholdHours, setAlertThresholdHours] = createSignal(24);
export const alerts = () => {
  // Mock parse hours from lastReport when it contains "h" or "d"; very rough for demo
  const parseHours = (txt?: string) => {
    if (!txt) return 0;
    if (txt.includes('h')) return parseFloat(txt) || 0;
    if (txt.includes('d')) return (parseFloat(txt) || 0) * 24;
    if (txt.includes('m')) return (parseFloat(txt) || 0) / 60;
    return 0;
  };
  const th = alertThresholdHours();
  return stations().flatMap(s => {
    const hours = parseHours(s.lastReport);
    const res: { id: string; level: 'error' | 'info'; message: string }[] = [];
    if (s.status === 'offline' && hours >= th) {
      res.push({ id: `off-${s.id}`, level: 'error', message: `${s.name} offline > ${th} jam` });
    }
    if (s.status === 'priority') {
      res.push({ id: `prio-${s.id}`, level: 'info', message: `${s.name} priority rollout area` });
    }
    return res;
  });
};

export const kpi = () => {
  const all = stations();
  const total = all.length;
  const connected = all.filter(s => s.status === 'connected').length;
  const offline = all.filter(s => s.status === 'offline').length;
  const onroute = all.filter(s => s.status === 'onroute').length;
  const priority = all.filter(s => s.status === 'priority').length;
  return { total, connected, offline, onroute, priority };
};

export const statusColor: Record<StationStatus, string> = {
  connected: 'var(--brand-green)',
  offline: 'var(--brand-red)',
  priority: 'var(--brand-orange)',
  onroute: 'var(--brand-blue)',
};
