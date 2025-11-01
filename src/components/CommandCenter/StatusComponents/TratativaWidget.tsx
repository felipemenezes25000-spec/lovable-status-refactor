import { Card } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

const TratativaWidget = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    // Sparkline data (example response times in seconds)
    const series = [80, 120, 75, 95, 60, 45, 110, 50];
    const w = 120, h = 64, pad = 6;
    const max = Math.max(...series, 300);
    const min = Math.min(...series, 0);
    const sx = (w - 2 * pad) / (series.length - 1);
    const sy = (h - 2 * pad) / (max - min || 1);
    
    const pts = series.map((v, i) => [
      pad + i * sx,
      h - pad - (v - min) * sy
    ]);
    
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
  
  return (
    <Card className="border-none bg-gradient-to-br from-slate-900 to-slate-800 p-3 text-blue-50">
      <div className="mb-2 text-center text-sm font-bold text-blue-200">
        Tempo de Tratativa 24x7
      </div>
      
      <div className="grid grid-cols-[120px_1fr] items-center gap-3">
        {/* Sparkline */}
        <svg
          ref={canvasRef}
          className="h-16 w-[120px]"
          viewBox="0 0 120 64"
          preserveAspectRatio="none"
        >
          <polyline
            id="tratLine"
            fill="none"
            stroke="#2fb3ff"
            strokeWidth="2"
            points=""
          />
          <circle
            id="tratDot"
            cx="0"
            cy="0"
            r="3"
            fill="#2fb3ff"
          />
        </svg>
        
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="space-y-0.5">
            <div className="text-lg font-bold">00:00:57</div>
            <div className="text-xs text-blue-300">Tempo Médio</div>
          </div>
          
          <div className="space-y-0.5">
            <div className="text-sm font-bold">80</div>
            <div className="text-xs text-blue-300">Incidentes</div>
          </div>
          
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-emerald-400">00:00:54</div>
            <div className="text-xs text-blue-300">Meta P2: 4min</div>
          </div>
          
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-red-400">00:04:56</div>
            <div className="text-xs text-blue-300">Meta P1: 4min</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TratativaWidget;