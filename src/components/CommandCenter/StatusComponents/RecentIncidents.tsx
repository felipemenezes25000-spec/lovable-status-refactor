import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  status: 'resolved' | 'investigating' | 'monitoring';
  timestamp: string;
  duration: string;
  impact: 'high' | 'medium' | 'low';
  affectedSystems: string[];
}

const RecentIncidents = () => {
  const incidents: Incident[] = [
    {
      id: '1',
      title: 'Latência elevada no Core Banking',
      status: 'resolved',
      timestamp: '2 horas atrás',
      duration: '45min',
      impact: 'medium',
      affectedSystems: ['Core Banking', 'TEF Wallet'],
    },
    {
      id: '2',
      title: 'Intermitência no PIX Gateway',
      status: 'monitoring',
      timestamp: '30 minutos atrás',
      duration: 'Em andamento',
      impact: 'low',
      affectedSystems: ['PIX Gateway'],
    },
    {
      id: '3',
      title: 'Performance degradada - Investimentos',
      status: 'investigating',
      timestamp: '5 minutos atrás',
      duration: 'Em andamento',
      impact: 'high',
      affectedSystems: ['BTG Investimentos', 'Custódia'],
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'resolved':
        return {
          icon: CheckCircle,
          label: 'Resolvido',
          color: 'hsl(var(--status-up))',
          bg: 'hsl(var(--status-up-bg))',
        };
      case 'investigating':
        return {
          icon: AlertCircle,
          label: 'Investigando',
          color: 'hsl(var(--status-down))',
          bg: 'hsl(var(--status-down-bg))',
        };
      case 'monitoring':
        return {
          icon: Clock,
          label: 'Monitorando',
          color: 'hsl(var(--status-degraded))',
          bg: 'hsl(var(--status-degraded-bg))',
        };
      default:
        return {
          icon: AlertCircle,
          label: 'Desconhecido',
          color: 'hsl(var(--muted-foreground))',
          bg: 'hsl(var(--muted))',
        };
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'hsl(var(--status-down))';
      case 'medium': return 'hsl(var(--status-degraded))';
      case 'low': return 'hsl(var(--primary))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  return (
    <Card className="overflow-hidden p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Incidentes Recentes</h3>
          <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
        </div>
        <button className="group flex items-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-2 text-sm font-medium transition-all hover:bg-muted hover:shadow-md">
          Ver Histórico
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="space-y-3">
        {incidents.map((incident) => {
          const statusConfig = getStatusConfig(incident.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={incident.id}
              className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: getImpactColor(incident.impact),
              }}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:to-accent/5" />
              
              <div className="relative">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground group-hover:text-primary">{incident.title}</h4>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{incident.timestamp}</span>
                      <span>•</span>
                      <span>Duração: {incident.duration}</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.color,
                    }}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </div>
                </div>

                {/* Affected Systems */}
                <div className="flex flex-wrap gap-2">
                  {incident.affectedSystems.map((system) => (
                    <span
                      key={system}
                      className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentIncidents;
