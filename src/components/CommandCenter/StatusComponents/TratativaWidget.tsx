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
    <Card className="overflow-hidden border-none bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-5 text-primary-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="mb-3 border-b border-primary-foreground/20 pb-2">
        <h3 className="text-center text-base font-bold">Tempo de Tratativa 24x7</h3>
        <p className="text-center text-xs opacity-80">Monitoramento contínuo</p>
      </div>
      
      <div className="space-y-4">
        {/* Sparkline */}
        <div className="flex justify-center rounded-lg bg-background/10 p-3 backdrop-blur-sm">
          <svg
            ref={canvasRef}
            className="h-16 w-full max-w-[180px]"
            viewBox="0 0 120 64"
            preserveAspectRatio="none"
          >
            <polyline
              id="tratLine"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              points=""
              opacity="0.9"
            />
            <circle
              id="tratDot"
              cx="0"
              cy="0"
              r="4"
              fill="currentColor"
            />
          </svg>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-background/15 p-3 text-center shadow-sm backdrop-blur-sm transition-all hover:bg-background/20">
            <div className="text-2xl font-bold">00:00:57</div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wider opacity-90">Tempo Médio</div>
          </div>
          
          <div className="rounded-lg bg-background/15 p-3 text-center shadow-sm backdrop-blur-sm transition-all hover:bg-background/20">
            <div className="text-2xl font-bold">80</div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wider opacity-90">Incidentes</div>
          </div>
          
          <div className="rounded-lg bg-background/15 p-3 text-center shadow-sm backdrop-blur-sm transition-all hover:bg-background/20">
            <div className="text-base font-bold text-emerald-200">00:00:54</div>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-wider opacity-90">Meta P2: 4min</div>
          </div>
          
          <div className="rounded-lg bg-background/15 p-3 text-center shadow-sm backdrop-blur-sm transition-all hover:bg-background/20">
            <div className="text-base font-bold text-red-200">00:04:56</div>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-wider opacity-90">Meta P1: 4min</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TratativaWidget;