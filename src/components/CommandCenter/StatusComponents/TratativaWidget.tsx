import { Card } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
const TratativaWidget = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    // Sparkline data (example response times in seconds)
    const series = [80, 120, 75, 95, 60, 45, 110, 50];
    const w = 120,
      h = 64,
      pad = 6;
    const max = Math.max(...series, 300);
    const min = Math.min(...series, 0);
    const sx = (w - 2 * pad) / (series.length - 1);
    const sy = (h - 2 * pad) / (max - min || 1);
    const pts = series.map((v, i) => [pad + i * sx, h - pad - (v - min) * sy]);
    const line = document.getElementById('tratLine');
    const dot = document.getElementById('tratDot');
    if (line) {
      line.setAttribute('points', pts.map(p => p.join(',')).join(' '));
    }
    if (dot && pts.length) {
      const lastPt = pts[pts.length - 1];
      dot.setAttribute('cx', String(lastPt[0]));
      dot.setAttribute('cy', String(lastPt[1]));
    }
  }, []);
  return;
};
export default TratativaWidget;