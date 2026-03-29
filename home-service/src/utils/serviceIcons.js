import { Home, Droplets, Zap, Paintbrush, Wrench } from 'lucide-react';

/** Map API service name to an icon component (no hardcoded service catalog). */
export function iconForServiceName(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('clean')) return Home;
  if (n.includes('plumb')) return Droplets;
  if (n.includes('electric')) return Zap;
  if (n.includes('paint')) return Paintbrush;
  if (n.includes('repair') || n.includes('general')) return Wrench;
  return Wrench;
}

/** Rough display duration when the API does not store it. */
export function durationHint(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('paint')) return '4–8 hours';
  if (n.includes('clean')) return '2–4 hours';
  if (n.includes('electric') || n.includes('plumb')) return '1–3 hours';
  return '1–2 hours';
}

/** Parse a rough rupee amount from strings like "₹500-1000" for totals. */
export function parsePriceToAmount(priceStr) {
  if (!priceStr || typeof priceStr !== 'string') return 0;
  const nums = priceStr.match(/\d+/g);
  if (!nums || nums.length === 0) return 0;
  const values = nums.map((x) => parseInt(x, 10));
  if (values.length >= 2) {
    return Math.round((values[0] + values[values.length - 1]) / 2);
  }
  return values[0];
}
