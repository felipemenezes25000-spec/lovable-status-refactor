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
    <Card className="overflow-hidden border-none bg-gradient-to-br from-primary/90 to-primary p-4 text-primary-foreground shadow-lg">
      <h3 className="mb-3 text-center font-bold">Tempo de Tratativa 24x7</h3>
      
      <div className="space-y-3">
        {/* Sparkline */}
        <div className="flex justify-center">
          <svg
            ref={canvasRef}
            className="h-20 w-full max-w-[200px]"
            viewBox="0 0 120 64"
            preserveAspectRatio="none"
          >
            <polyline
              id="tratLine"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              points=""
              opacity="0.8"
            />
            <circle
              id="tratDot"
              cx="0"
              cy="0"
              r="3"
              fill="currentColor"
            />
          </svg>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-background/10 p-2 text-center backdrop-blur-sm">
            <div className="text-xl font-bold">00:00:57</div>
            <div className="text-xs opacity-80">Tempo Médio</div>
          </div>
          
          <div className="rounded-lg bg-background/10 p-2 text-center backdrop-blur-sm">
            <div className="text-xl font-bold">80</div>
            <div className="text-xs opacity-80">Incidentes</div>
          </div>
          
          <div className="rounded-lg bg-background/10 p-2 text-center backdrop-blur-sm">
            <div className="text-sm font-bold text-emerald-300">00:00:54</div>
            <div className="text-xs opacity-80">Meta P2: 4min</div>
          </div>
          
          <div className="rounded-lg bg-background/10 p-2 text-center backdrop-blur-sm">
            <div className="text-sm font-bold text-red-300">00:04:56</div>
            <div className="text-xs opacity-80">Meta P1: 4min</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TratativaWidget;