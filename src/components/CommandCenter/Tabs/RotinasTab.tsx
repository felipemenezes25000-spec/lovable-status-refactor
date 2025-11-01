import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Rotina {
  name: string;
  status: 'up' | 'degraded' | 'down' | 'maintenance';
  desc: string;
  last: string;
  avg: string;
  deps: string;
  start: string;
  end: string;
}

const rotinas: Rotina[] = [
  {
    name: 'Banking',
    status: 'up',
    desc: 'Rotina bancária de conciliações diárias: liquidação de TED/DOC/PIX, reconciliação contábil e geração de extratos para downstream.',
    last: 'Hoje 21:15 BRT',
    avg: '12 min',
    deps: 'PIX Gateway, Core Banking, Ledger',
    start: '01:00 BRT',
    end: '01:30 BRT',
  },
  {
    name: 'Energy',
    status: 'degraded',
    desc: 'Carga de posições de energia e cálculo de exposição. Consolida curvas, preços e PnL para o book de Energia.',
    last: 'Hoje 20:40 BRT',
    avg: '18 min',
    deps: 'Market Data, Risco, Data Lake',
    start: '02:00 BRT',
    end: '02:30 BRT',
  },
  {
    name: 'Payments',
    status: 'up',
    desc: 'Rotina de pagamentos massivos. Gera arquivos CNAB, valida limites e dispara lotes via SPI/STR.',
    last: 'Hoje 19:55 BRT',
    avg: '9 min',
    deps: 'Tesouraria, SPI, Compliance',
    start: '03:00 BRT',
    end: '03:20 BRT',
  },
  {
    name: 'Command Center',
    status: 'up',
    desc: 'Health-checks do Command Center e coleta de KPIs operacionais para os painéis.',
    last: 'Hoje 22:00 BRT',
    avg: '3 min',
    deps: 'Observabilidade, Status API',
    start: '00:05 BRT',
    end: '00:08 BRT',
  },
  {
    name: 'Commodities',
    status: 'up',
    desc: 'Ingestão de cotações e posições de commodities. Normaliza fontes e atualiza curvas para pricing.',
    last: 'Hoje 20:10 BRT',
    avg: '14 min',
    deps: 'Market Data, Risco',
    start: '04:00 BRT',
    end: '04:20 BRT',
  },
  {
    name: 'LUX',
    status: 'up',
    desc: 'Rotinas do booking Luxemburgo: NAV, reconciliação com custodiante e geração de reports regulatórios.',
    last: 'Hoje 18:30 CET',
    avg: '22 min',
    deps: 'Custodian, Fund Admin, Ledger',
    start: '02:00 CET',
    end: '02:30 CET',
  },
  {
    name: 'Portfolio Services',
    status: 'maintenance',
    desc: 'Carga de eventos corporativos e processamento de dividendos para carteiras de clientes.',
    last: 'Hoje 21:05 BRT',
    avg: '11 min',
    deps: 'B3, Custódia, Data Lake',
    start: '05:00 BRT',
    end: '05:15 BRT',
  },
  {
    name: 'Panorama',
    status: 'up',
    desc: 'Agregação de dados para o dashboard executivo Panorama: KPIs de disponibilidade, latência e volume.',
    last: 'Hoje 22:02 BRT',
    avg: '5 min',
    deps: 'Status API, Data Platform',
    start: 'a cada 10 min',
    end: 'contínuo',
  },
  {
    name: 'Portfolio Management',
    status: 'up',
    desc: 'Batch de cálculo de risco e rebalanceamento de portfólios segundo restrições de mandato.',
    last: 'Hoje 20:20 BRT',
    avg: '16 min',
    deps: 'Risco, Precificação, OMS',
    start: '06:00 BRT',
    end: '06:30 BRT',
  },
];

const RotinasTab = () => {
  const [selectedRotina, setSelectedRotina] = useState<Rotina | null>(null);

  const getStatusPill = (status: string) => {
    const classes = `status-pill status-${status}`;
    const labels = {
      up: 'OK',
      degraded: 'Atenção',
      down: 'Erro',
      maintenance: 'Manutenção',
    };
    return <span className={classes}>{labels[status as keyof typeof labels]}</span>;
  };

  return (
    <>
      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">CCBP - Rotinas de Produção</h2>
            <p className="text-sm text-muted-foreground">Status das fases por cliente e segmento</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Recarregar</Button>
            <Button variant="outline" size="sm">Filtros</Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rotinas.map((rotina, idx) => (
            <Card
              key={idx}
              className="cursor-pointer p-3 transition-all hover:shadow-md"
              onClick={() => setSelectedRotina(rotina)}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="font-bold">{rotina.name}</div>
                {getStatusPill(rotina.status)}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Última: {rotina.last}</div>
                <div>Duração média: {rotina.avg}</div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Dialog open={!!selectedRotina} onOpenChange={() => setSelectedRotina(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedRotina?.name}</span>
              {selectedRotina && getStatusPill(selectedRotina.status)}
            </DialogTitle>
            <DialogDescription className="mt-3 space-y-3 text-left">
              <p className="text-sm text-foreground">{selectedRotina?.desc}</p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/50 p-3">
                  <div className="text-xs font-semibold text-muted-foreground">Última execução</div>
                  <div className="text-sm font-medium">{selectedRotina?.last}</div>
                </div>
                
                <div className="rounded-lg border bg-muted/50 p-3">
                  <div className="text-xs font-semibold text-muted-foreground">Duração média</div>
                  <div className="text-sm font-medium">{selectedRotina?.avg}</div>
                </div>
                
                <div className="rounded-lg border bg-muted/50 p-3">
                  <div className="text-xs font-semibold text-muted-foreground">Início programado</div>
                  <div className="text-sm font-medium">{selectedRotina?.start}</div>
                </div>
                
                <div className="rounded-lg border bg-muted/50 p-3">
                  <div className="text-xs font-semibold text-muted-foreground">Fim estimado</div>
                  <div className="text-sm font-medium">{selectedRotina?.end}</div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="text-xs font-semibold text-muted-foreground">Dependências</div>
                <div className="text-sm font-medium">{selectedRotina?.deps}</div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedRotina(null)}>
              Fechar
            </Button>
            <Button>Abrir Dashboard</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RotinasTab;