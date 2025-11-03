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
  return (
    <Card className="group relative overflow-hidden p-5 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="mb-4 flex items-start justify-between border-b pb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">Tempo de Tratativa 24x7</h3>
            <p className="text-xs text-muted-foreground">Média de resposta em segundos</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-status-up-bg px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-status-up" />
            <span className="text-xs font-bold text-status-up">ATIVO</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Current Response Time */}
          <div className="rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="mb-1 text-xs font-medium text-muted-foreground">Atual</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-foreground">50</div>
              <div className="text-sm font-medium text-muted-foreground">seg</div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span className="text-status-up">↓ 12%</span>
              <span className="text-muted-foreground">vs última hora</span>
            </div>
          </div>

          {/* Average Today */}
          <div className="rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="mb-1 text-xs font-medium text-muted-foreground">Média Hoje</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-foreground">82</div>
              <div className="text-sm font-medium text-muted-foreground">seg</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">SLA: &lt;120s</div>
          </div>
        </div>

        {/* Sparkline Chart */}
        <div className="mt-4 rounded-lg border bg-muted/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Últimas 8 horas</span>
            <span className="text-xs font-bold text-status-up">↓ Tendência decrescente</span>
          </div>
          <svg ref={canvasRef} width="100%" height="64" className="overflow-visible">
            <defs>
              <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--status-up))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--status-up))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polyline
              id="tratLine"
              fill="none"
              stroke="hsl(var(--status-up))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              id="tratDot"
              r="4"
              fill="hsl(var(--status-up))"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};
export default TratativaWidget;