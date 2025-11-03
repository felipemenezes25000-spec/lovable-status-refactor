import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
interface System {
  name: string;
  owner: string;
  status: 'up' | 'degraded' | 'down' | 'maintenance';
  last: string;
  p95: number;
  err: number;
  tps: number;
  uptime: number;
  region: string;
  kind: string;
}
const mockSystems: System[] = [{
  name: 'PIX Gateway',
  owner: 'Payments',
  status: 'up',
  last: '2025-10-22',
  p95: 140,
  err: 0.08,
  tps: 3200,
  uptime: 99.92,
  region: 'BR-SP',
  kind: 'API'
}, {
  name: 'Core Banking',
  owner: 'Core',
  status: 'degraded',
  last: '2025-10-24',
  p95: 280,
  err: 1.60,
  tps: 1800,
  uptime: 98.40,
  region: 'BR-SP',
  kind: 'Monolith'
}, {
  name: 'Auth Service',
  owner: 'Security',
  status: 'up',
  last: '2025-10-20',
  p95: 95,
  err: 0.15,
  tps: 4500,
  uptime: 99.85,
  region: 'Global',
  kind: 'Microservice'
}];
const SystemsTable = () => {
  const [showOnlyProblems, setShowOnlyProblems] = useState(false);
  const filteredSystems = showOnlyProblems ? mockSystems.filter(s => s.status !== 'up') : mockSystems;
  const getStatusPill = (status: string) => {
    const classes = `status-pill status-${status}`;
    const labels = {
      up: 'Operacional',
      degraded: 'Instável',
      down: 'Indisponível',
      maintenance: 'Manutenção'
    };
    return <span className={classes}>{labels[status as keyof typeof labels]}</span>;
  };
  return (
    <Card className="overflow-hidden p-5 shadow-lg">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Sistemas Monitorados</h3>
          <p className="text-xs text-muted-foreground">Monitoramento em tempo real de performance</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
            <input
              type="checkbox"
              checked={showOnlyProblems}
              onChange={(e) => setShowOnlyProblems(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-border accent-primary"
            />
            <span>Apenas com problemas</span>
          </label>
          <div className="rounded-lg bg-muted px-3 py-2 text-sm">
            <span className="font-bold text-foreground">{filteredSystems.length}</span>
            <span className="ml-1 text-muted-foreground">sistemas</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Sistema</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Última Verificação</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">P95 (ms)</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Erros (%)</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">TPS</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Uptime (%)</th>
              <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Região</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSystems.map((sys) => {
              const p95Color = sys.p95 > 200 ? 'text-status-down' : sys.p95 > 150 ? 'text-status-degraded' : 'text-status-up';
              const errColor = sys.err > 1 ? 'text-status-down' : sys.err > 0.5 ? 'text-status-degraded' : 'text-status-up';
              const uptimeColor = sys.uptime < 99 ? 'text-status-down' : sys.uptime < 99.5 ? 'text-status-degraded' : 'text-status-up';

              return (
                <tr key={sys.name} className="group transition-colors hover:bg-muted/40">
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <div className="font-semibold text-foreground group-hover:text-primary">{sys.name}</div>
                      <div className="text-xs text-muted-foreground">{sys.owner} • {sys.kind}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusPill(sys.status)}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{sys.last}</td>
                  <td className={`px-4 py-4 text-right text-sm font-bold tabular-nums ${p95Color}`}>
                    {sys.p95}ms
                  </td>
                  <td className={`px-4 py-4 text-right text-sm font-bold tabular-nums ${errColor}`}>
                    {sys.err.toFixed(2)}%
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold tabular-nums text-foreground">
                    {sys.tps.toLocaleString()}
                  </td>
                  <td className={`px-4 py-4 text-right text-sm font-bold tabular-nums ${uptimeColor}`}>
                    {sys.uptime.toFixed(2)}%
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                      {sys.region}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredSystems.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm font-medium text-muted-foreground">Nenhum sistema encontrado com os filtros aplicados</p>
        </div>
      )}
    </Card>
  );
};
export default SystemsTable;