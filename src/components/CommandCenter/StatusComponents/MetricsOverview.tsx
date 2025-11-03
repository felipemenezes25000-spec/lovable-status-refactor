import { Card } from '@/components/ui/card';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Clock } from 'lucide-react';

const MetricsOverview = () => {
  const metrics = [
    {
      icon: Activity,
      label: 'Requisições/min',
      value: '12.4K',
      change: '+8.2%',
      trend: 'up',
      color: 'hsl(var(--status-up))',
    },
    {
      icon: Clock,
      label: 'Latência Média',
      value: '142ms',
      change: '-12%',
      trend: 'up',
      color: 'hsl(var(--primary))',
    },
    {
      icon: AlertTriangle,
      label: 'Incidentes Ativos',
      value: '2',
      change: '+1',
      trend: 'down',
      color: 'hsl(var(--status-degraded))',
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Sucesso',
      value: '99.94%',
      change: '+0.12%',
      trend: 'up',
      color: 'hsl(var(--status-up))',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card
            key={metric.label}
            className="group relative overflow-hidden p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Animated Background Gradient */}
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${metric.color}05 0%, transparent 100%)`,
              }}
            />
            
            <div className="relative">
              <div className="mb-3 flex items-start justify-between">
                <div
                  className="rounded-lg p-2.5 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${metric.color}15`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: metric.color }} />
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon
                    className="h-3.5 w-3.5"
                    style={{ color: metric.trend === 'up' ? 'hsl(var(--status-up))' : 'hsl(var(--status-down))' }}
                  />
                  <span
                    className="text-xs font-bold"
                    style={{ color: metric.trend === 'up' ? 'hsl(var(--status-up))' : 'hsl(var(--status-down))' }}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:scale-105">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  {metric.label}
                </div>
              </div>

              {/* Sparkline Indicator */}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: metric.trend === 'up' ? '75%' : '45%',
                    backgroundColor: metric.color,
                  }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsOverview;
