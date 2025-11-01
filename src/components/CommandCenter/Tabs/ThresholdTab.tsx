import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Threshold {
  id: string;
  name: string;
  metric: string;
  current: number;
  warn: number;
  critical: number;
  unit: string;
  auto: boolean;
  trend: 'up' | 'down' | 'stable';
}

const ThresholdTab = () => {
  const [thresholds, setThresholds] = useState<Threshold[]>([
    {
      id: '1',
      name: 'PIX In Latência',
      metric: 'p95_latency',
      current: 142,
      warn: 200,
      critical: 500,
      unit: 'ms',
      auto: true,
      trend: 'stable',
    },
    {
      id: '2',
      name: 'Login Banking',
      metric: 'success_rate',
      current: 99.87,
      warn: 99.5,
      critical: 98.5,
      unit: '%',
      auto: true,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Disponibilidade API Core',
      metric: 'uptime',
      current: 99.99,
      warn: 99.9,
      critical: 99.5,
      unit: '%',
      auto: false,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'TED/TEF Throughput',
      metric: 'tps',
      current: 1840,
      warn: 2000,
      critical: 2500,
      unit: 'tps',
      auto: true,
      trend: 'down',
    },
    {
      id: '5',
      name: 'Boleto Validação',
      metric: 'response_time',
      current: 89,
      warn: 150,
      critical: 300,
      unit: 'ms',
      auto: false,
      trend: 'stable',
    },
    {
      id: '6',
      name: 'RF Crédito Bancário',
      metric: 'error_rate',
      current: 0.12,
      warn: 0.5,
      critical: 1.0,
      unit: '%',
      auto: true,
      trend: 'stable',
    },
  ]);

  const [selectedMetric, setSelectedMetric] = useState('all');
  const [aiEnabled, setAiEnabled] = useState(true);

  const updateThreshold = (id: string, field: keyof Threshold, value: any) => {
    setThresholds(
      thresholds.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'hsl(var(--status-up))';
    if (trend === 'down') return 'hsl(var(--status-down))';
    return 'hsl(var(--muted-foreground))';
  };

  const getTrendLabel = (trend: string) => {
    if (trend === 'up') return '↗ Subindo';
    if (trend === 'down') return '↘ Descendo';
    return '→ Estável';
  };

  const filteredThresholds =
    selectedMetric === 'all'
      ? thresholds
      : thresholds.filter((t) => t.metric === selectedMetric);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Threshold Dinâmico</h2>
            <p className="text-sm text-muted-foreground">
              Ajuste automático de limites baseado em ML e padrões históricos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="ai-mode"
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
              />
              <Label htmlFor="ai-mode" className="text-sm font-medium">
                {aiEnabled ? 'IA Ativa' : 'IA Desligada'}
              </Label>
            </div>
            <Button variant="outline" size="sm">
              Exportar Config
            </Button>
            <Button size="sm">Aplicar Mudanças</Button>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Label className="text-sm font-semibold">Filtrar por métrica:</Label>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="p95_latency">Latência P95</SelectItem>
              <SelectItem value="success_rate">Taxa de Sucesso</SelectItem>
              <SelectItem value="uptime">Disponibilidade</SelectItem>
              <SelectItem value="tps">Throughput (TPS)</SelectItem>
              <SelectItem value="response_time">Tempo de Resposta</SelectItem>
              <SelectItem value="error_rate">Taxa de Erro</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-status-up" />
              <span>Auto</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-status-degraded" />
              <span>Manual</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Thresholds Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredThresholds.map((threshold) => (
          <Card key={threshold.id} className="p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{threshold.name}</h3>
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: threshold.auto
                        ? 'hsl(var(--status-up))'
                        : 'hsl(var(--status-degraded))',
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Métrica: {threshold.metric}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {threshold.current}
                  <span className="text-sm text-muted-foreground">
                    {threshold.unit}
                  </span>
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: getTrendColor(threshold.trend) }}
                >
                  {getTrendLabel(threshold.trend)}
                </div>
              </div>
            </div>

            {/* Visual Threshold Bar */}
            <div className="mb-4">
              <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute h-full bg-status-up"
                  style={{
                    width: `${Math.min(
                      100,
                      (threshold.current / threshold.critical) * 100
                    )}%`,
                  }}
                />
                <div
                  className="absolute h-full border-l-2 border-status-degraded"
                  style={{
                    left: `${(threshold.warn / threshold.critical) * 100}%`,
                  }}
                />
                <div className="absolute right-0 h-full border-l-2 border-status-down" />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>0</span>
                <span>Warn: {threshold.warn}</span>
                <span>Crit: {threshold.critical}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold">Modo automático</Label>
                <Switch
                  checked={threshold.auto}
                  onCheckedChange={(checked) =>
                    updateThreshold(threshold.id, 'auto', checked)
                  }
                  disabled={!aiEnabled}
                />
              </div>

              <div>
                <Label className="mb-2 block text-xs font-semibold">
                  Warning Threshold
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[threshold.warn]}
                    onValueChange={(v) =>
                      updateThreshold(threshold.id, 'warn', v[0])
                    }
                    min={0}
                    max={threshold.critical}
                    step={1}
                    disabled={threshold.auto}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={threshold.warn}
                    onChange={(e) =>
                      updateThreshold(
                        threshold.id,
                        'warn',
                        Number(e.target.value)
                      )
                    }
                    disabled={threshold.auto}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-xs font-semibold">
                  Critical Threshold
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[threshold.critical]}
                    onValueChange={(v) =>
                      updateThreshold(threshold.id, 'critical', v[0])
                    }
                    min={threshold.warn}
                    max={threshold.critical * 2}
                    step={1}
                    disabled={threshold.auto}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={threshold.critical}
                    onChange={(e) =>
                      updateThreshold(
                        threshold.id,
                        'critical',
                        Number(e.target.value)
                      )
                    }
                    disabled={threshold.auto}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            {threshold.auto && (
              <div className="mt-3 rounded-lg bg-muted/50 p-2 text-xs text-muted-foreground">
                🤖 Thresholds ajustados automaticamente baseados em padrões
                históricos
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* AI Settings */}
      {aiEnabled && (
        <Card className="p-4">
          <h3 className="mb-3 font-bold">Configurações de IA</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="mb-2 block text-xs font-semibold">
                Janela de Análise
              </Label>
              <Select defaultValue="7d">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Último dia</SelectItem>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-xs font-semibold">
                Sensibilidade
              </Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-xs font-semibold">
                Frequência de Ajuste
              </Label>
              <Select defaultValue="hourly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Tempo Real</SelectItem>
                  <SelectItem value="hourly">A cada hora</SelectItem>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ThresholdTab;
