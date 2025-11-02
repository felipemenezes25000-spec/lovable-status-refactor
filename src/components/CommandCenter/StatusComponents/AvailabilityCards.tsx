import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Service {
  key: string;
  name: string;
  pct: number;
}

interface AvailabilityCardProps {
  title: string;
  services: Service[];
}

const AvailabilityCard = ({ title, services }: AvailabilityCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getColor = (pct: number) => {
    if (pct >= 99.5) return 'hsl(var(--status-up))';
    if (pct >= 98.5) return 'hsl(var(--status-degraded))';
    return 'hsl(var(--status-down))';
  };

  const getLabel = (pct: number) => {
    if (pct >= 99.5) return 'Operacional';
    if (pct >= 98.5) return 'Intermitência';
    return 'Incidente';
  };

  return (
    <Card className="p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-xs text-muted-foreground">Última 1h</p>
        </div>
        <Button
          variant={expanded ? 'default' : 'outline'}
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              Recolher <ChevronUp className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              Expandir <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </div>

      {expanded && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {services.map((service) => {
            const color = getColor(service.pct);
            const label = getLabel(service.pct);

            return (
              <div
                key={service.key}
                className="cursor-pointer rounded-lg border p-2 hover:bg-accent/5"
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-sm font-semibold">{service.name}</div>
                  <div className="text-sm font-bold" style={{ color }}>
                    {service.pct.toFixed(2)}%
                  </div>
                </div>

                <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${Math.min(100, service.pct)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="status-pill text-[10px]" style={{ 
                    background: `${color}20`,
                    color 
                  }}>
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">ref. 1h</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

const AvailabilityCards = () => {
  const bankingServices: Service[] = [
    { key: 'login', name: 'Login', pct: 99.92 },
    { key: 'pixin', name: 'Validação Pix In', pct: 99.78 },
    { key: 'pixout', name: 'Validação Pix Out', pct: 99.64 },
    { key: 'boleto_val', name: 'Boletos Utilities • Validação', pct: 99.85 },
    { key: 'boleto_liq', name: 'Boletos Utilities • Liquidação', pct: 99.70 },
    { key: 'tef_wallet', name: 'TEF Wallet', pct: 98.92 },
  ];

  const investServices: Service[] = [
    { key: 'inv_login', name: 'Login (Cliente/Assessor)', pct: 98.87 },
    { key: 'rf_credito', name: 'RF Crédito Bancário', pct: 98.68 },
    { key: 'ted_tef', name: 'TED/TEF', pct: 98.67 },
    { key: 'custodia', name: 'Custódia e Posições', pct: 99.12 },
    { key: 'ordens', name: 'Envio de Ordens', pct: 99.04 },
  ];

  const empServices: Service[] = [
    { key: 'login', name: 'Login', pct: 99.45 },
    { key: 'extrato', name: 'Extrato de Conta', pct: 99.22 },
    { key: 'pagamentos', name: 'Pagamentos', pct: 98.88 },
    { key: 'transferencias', name: 'Transferências', pct: 99.15 },
  ];

  const myntServices: Service[] = [
    { key: 'login', name: 'Login', pct: 100.00 },
    { key: 'compra_venda', name: 'Compra/Venda Cripto', pct: 100.00 },
    { key: 'onboarding', name: 'Onboarding', pct: 100.00 },
    { key: 'saque', name: 'Saque/Depósito Crypto', pct: 100.00 },
  ];

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold">Disponibilidade de Aplicativos</h3>
          <p className="text-xs text-muted-foreground">Última 1h</p>
        </div>
      </div>

      <div className="grid gap-3">
        <AvailabilityCard title="BTG Banking" services={bankingServices} />
        <AvailabilityCard title="BTG Investimentos" services={investServices} />
        <AvailabilityCard title="BTG Empresas" services={empServices} />
        <AvailabilityCard title="Mynt" services={myntServices} />
      </div>
    </Card>
  );
};

export default AvailabilityCards;