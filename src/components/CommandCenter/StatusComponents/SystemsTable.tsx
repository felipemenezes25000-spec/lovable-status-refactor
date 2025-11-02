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
  return <Card className="p-5 shadow-md">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h3 className="text-lg font-bold">Sistemas Monitorados</h3>
          <p className="text-xs text-muted-foreground">Monitoramento em tempo real de todos os serviços críticos</p>
        </div>
        <label className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium shadow-sm transition-all hover:bg-accent/10">
          <input 
            type="checkbox" 
            checked={showOnlyProblems} 
            onChange={e => setShowOnlyProblems(e.target.checked)} 
            className="h-4 w-4 rounded border-input accent-primary" 
          />
          Mostrar apenas problemas
        </label>
      </div>
      
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Sistema</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Últ. Incidente</th>
              <th className="px-4 py-3 text-left">P95</th>
              <th className="px-4 py-3 text-left">Erro 5xx</th>
              <th className="px-4 py-3 text-left">TPS</th>
              <th className="px-4 py-3 text-left">Uptime</th>
              <th className="px-4 py-3 text-left">Região</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredSystems.map((system, idx) => <tr 
              key={idx} 
              className="border-t transition-colors hover:bg-accent/5"
            >
                <td className="px-4 py-4">
                  <div className="font-semibold text-foreground">{system.name}</div>
                  <div className="text-xs text-muted-foreground">Responsável: {system.owner}</div>
                </td>
                <td className="px-4 py-4">{getStatusPill(system.status)}</td>
                <td className="px-4 py-4 font-mono text-xs">{system.last}</td>
                <td className="px-4 py-4">
                  <span className={system.p95 > 200 ? 'font-bold text-red-600 dark:text-red-400' : 'font-semibold'}>
                    {system.p95} ms
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={system.err > 1 ? 'font-bold text-red-600 dark:text-red-400' : 'font-semibold'}>
                    {system.err.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold">{system.tps.toLocaleString()}</td>
                <td className="px-4 py-4">
                  <span className={system.uptime < 99 ? 'font-bold text-amber-600 dark:text-amber-400' : 'font-semibold text-emerald-600 dark:text-emerald-400'}>
                    {system.uptime.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-xs">{system.region}</td>
                <td className="px-4 py-4">
                  <span className="rounded-md bg-muted/50 px-2 py-1 text-xs font-medium">
                    {system.kind}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <Button size="sm" variant="default" className="shadow-sm">
                    Detalhes
                  </Button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </Card>;
};
export default SystemsTable;