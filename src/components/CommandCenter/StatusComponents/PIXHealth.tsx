import { Card } from '@/components/ui/card';

const PIXHealth = () => {
  const kpis = [
    { label: 'Componentes', value: '6' },
    { label: 'Operando', value: '4', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Instáveis', value: '1', color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Manut.', value: '1', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'P95 médio', value: '140 ms' },
    { label: 'TPS pico', value: '3.2k' },
    { label: 'Êxito médio', value: '99.61%' },
  ];

  const components = [
    { name: 'Gateway PIX', status: 'up', p95: 140, success: 99.92, tps: 3200 },
    { name: 'Conexão SPI', status: 'degraded', p95: 280, success: 98.40, tps: 3100 },
    { name: 'DICT', status: 'up', p95: 120, success: 99.80, tps: 900 },
    { name: 'QR Dinâmico', status: 'up', p95: 110, success: 99.70, tps: 2100 },
    { name: 'Webhooks', status: 'maintenance', p95: 0, success: 100, tps: 0 },
    { name: 'Antifraude', status: 'up', p95: 95, success: 99.85, tps: 600 },
  ];

  const getStatusPill = (status: string) => {
    const classes = `status-pill status-${status}`;
    const labels = {
      up: 'OK',
      degraded: 'Inst.',
      maintenance: 'Man.',
    };
    return <span className={classes}>{labels[status as keyof typeof labels]}</span>;
  };

  return (
    <Card className="p-3">
      <h3 className="mb-3 font-bold">PIX — Saúde e performance</h3>

      {/* KPIs Grid */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="p-2 text-center">
            <div className={`text-lg font-bold ${kpi.color || ''}`}>{kpi.value}</div>
            <div className="text-xs text-muted-foreground">{kpi.label}</div>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="mb-3 flex h-[180px] items-center justify-center rounded-lg bg-muted/30">
        <div className="text-center text-sm text-muted-foreground">
          <p>Mapa PIX Brasil</p>
        </div>
      </div>

      {/* Components Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-[10px] text-muted-foreground">
            <tr>
              <th className="px-1 py-1 text-left">Componente</th>
              <th className="px-1 py-1 text-left">Status</th>
              <th className="px-1 py-1 text-left">P95</th>
              <th className="px-1 py-1 text-left">Êxito</th>
              <th className="px-1 py-1 text-left">TPS</th>
            </tr>
          </thead>
          <tbody>
            {components.map((comp, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-1 py-2 font-semibold">{comp.name}</td>
                <td className="px-1 py-2">{getStatusPill(comp.status)}</td>
                <td className="px-1 py-2">{comp.p95 || '—'} {comp.p95 ? 'ms' : ''}</td>
                <td className="px-1 py-2">{comp.success.toFixed(2)}%</td>
                <td className="px-1 py-2">{comp.tps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PIXHealth;