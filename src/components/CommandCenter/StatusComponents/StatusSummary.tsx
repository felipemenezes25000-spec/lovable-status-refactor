import { Card } from '@/components/ui/card';

const StatusSummary = () => {
  const stats = [
    { label: 'Produtos Tombados', value: '24', color: '' },
    { label: 'Monitores Ativos', value: '18', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Instáveis', value: '4', color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Indisponíveis', value: '1', color: 'text-red-600 dark:text-red-400' },
    { label: 'Manutenções', value: '1', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Uptime médio 30d', value: '99.72%', color: '' },
  ];
  
  return (
    <Card className="p-4">
      <h3 className="mb-4 font-bold">Resumo Operacional</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center rounded-lg border bg-card/50 p-3 text-center transition-all hover:bg-accent/10">
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StatusSummary;