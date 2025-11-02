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
  return <Card className="p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">Sistemas Monitorados</h3>
          <p className="text-xs text-muted-foreground">Monitoramento em tempo real</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={showOnlyProblems} onChange={e => setShowOnlyProblems(e.target.checked)} className="h-4 w-4 rounded border-input" />
          Mostrar apenas problemas
        </label>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              <th className="px-2 py-2 text-left">Área </th>
              <th className="px-2 py-2 text-left">Status</th>
              <th className="px-2 py-2 text-left">Últ. incidente</th>
              <th className="px-2 py-2 text-left">P95</th>
              <th className="px-2 py-2 text-left">Erro 5xx</th>
              <th className="px-2 py-2 text-left">TPS</th>
              <th className="px-2 py-2 text-left">Uptime</th>
              <th className="px-2 py-2 text-left">Região</th>
              <th className="px-2 py-2 text-left">Tipo</th>
              <th className="px-2 py-2 text-left">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredSystems.map((system, idx) => <tr key={idx} className="border-t">
                <td className="px-2 py-3">
                  <div className="font-semibold">{system.name}</div>
                  <div className="text-xs text-muted-foreground">Dono: {system.owner}</div>
                </td>
                <td className="px-2 py-3">{getStatusPill(system.status)}</td>
                <td className="px-2 py-3">{system.last}</td>
                <td className="px-2 py-3">{system.p95} ms</td>
                <td className="px-2 py-3">{system.err.toFixed(2)}%</td>
                <td className="px-2 py-3">{system.tps}</td>
                <td className="px-2 py-3">{system.uptime.toFixed(2)}%</td>
                <td className="px-2 py-3">{system.region}</td>
                <td className="px-2 py-3">{system.kind}</td>
                <td className="px-2 py-3">
                  <Button size="sm" variant="default">Detalhes</Button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </Card>;
};
export default SystemsTable;