import { Card } from '@/components/ui/card';

interface TimelineItem {
  continent: string;
  text: string;
  when: string;
  sev: 'up' | 'degraded' | 'down' | 'maintenance';
}

const mockTimeline: TimelineItem[] = [
  {
    continent: 'Ásia',
    text: 'Queda no Portal Cliente — Singapura',
    when: '24/10/2025 12:00 UTC',
    sev: 'down',
  },
  {
    continent: 'América do Sul',
    text: 'Instabilidade de DB — Brasil',
    when: '24/10/2025 10:00 UTC',
    sev: 'degraded',
  },
  {
    continent: 'Europa',
    text: 'Janela de manutenção — França',
    when: '24/10/2025 02:00 UTC',
    sev: 'maintenance',
  },
  {
    continent: 'Oceania',
    text: 'Latência de Mensageria — Austrália',
    when: '23/10/2025 22:00 UTC',
    sev: 'degraded',
  },
  {
    continent: 'Global',
    text: 'Teste de alerta global',
    when: '23/10/2025 20:00 UTC',
    sev: 'up',
  },
];

const Timeline = () => {
  const getStatusPill = (sev: string) => {
    const classes = `status-pill status-${sev}`;
    const labels = {
      up: 'Resolvido',
      degraded: 'Instabilidade',
      down: 'Incidente',
      maintenance: 'Manutenção',
    };
    return <span className={classes}>{labels[sev as keyof typeof labels]}</span>;
  };

  return (
    <Card className="p-3">
      <h3 className="mb-3 font-bold">Timeline</h3>
      
      <div className="space-y-2">
        {mockTimeline.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border bg-card p-2 hover:bg-accent/5"
          >
            <div>
              <div className="font-semibold">{item.text}</div>
              <div className="text-xs text-muted-foreground">
                {item.continent} • {item.when}
              </div>
            </div>
            {getStatusPill(item.sev)}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Timeline;