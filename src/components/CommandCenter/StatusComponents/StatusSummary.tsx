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
    <Card className="p-5 shadow-md">
      <div className="mb-4 border-b pb-3">
        <h3 className="text-lg font-bold">Resumo Operacional</h3>
        <p className="text-xs text-muted-foreground">Visão geral de todos os produtos</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col items-center justify-center rounded-lg border bg-gradient-to-br from-card to-card/50 p-4 text-center shadow-sm transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className={`text-3xl font-bold transition-transform group-hover:scale-110 ${stat.color || 'text-foreground'}`}>
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-medium text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StatusSummary;