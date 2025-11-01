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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat, idx) => (
        <Card key={idx} className="flex flex-col items-center justify-center p-3 text-center">
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-xs text-muted-foreground">
            {stat.label}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatusSummary;