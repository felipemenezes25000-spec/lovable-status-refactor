import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Ticket {
  tipo: string;
  status: string;
  criacao: string;
  ticket: string;
  area: string;
  jornada: string;
  produto: string;
}

const mockTickets: Ticket[] = [
  {
    tipo: 'Produto',
    status: 'Pendente',
    criacao: '24/10/2025 14:46',
    ticket: 'CCBP-101570',
    area: 'Funds',
    jornada: 'FAAS - Reports',
    produto: 'Geração de Relatório - Funds',
  },
  {
    tipo: 'Produto',
    status: 'Em andamento',
    criacao: '24/10/2025 14:39',
    ticket: 'CCBP-101569',
    area: 'Funds',
    jornada: 'FAAS',
    produto: 'Reports',
  },
  {
    tipo: 'Serviço',
    status: 'Pendente',
    criacao: '24/10/2025 13:38',
    ticket: 'CCBP-101566',
    area: 'Portfolio Mgmt',
    jornada: 'Family Office',
    produto: 'E-mail Monitoring',
  },
  {
    tipo: 'Canal',
    status: 'Resolvido',
    criacao: '24/10/2025 12:15',
    ticket: 'CCBP-101565',
    area: 'Banking',
    jornada: 'Conta Digital',
    produto: 'Portal Web',
  },
  {
    tipo: 'Produto',
    status: 'Pendente',
    criacao: '24/10/2025 11:22',
    ticket: 'CCBP-101564',
    area: 'Investimentos',
    jornada: 'Trade',
    produto: 'Envio de Ordens',
  },
];

const CockpitTab = () => {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      'Pendente': 'destructive',
      'Em andamento': 'default',
      'Resolvido': 'secondary',
    };
    return (
      <Badge variant={variants[status] || 'secondary'} className="text-xs">
        {status}
      </Badge>
    );
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Cockpit Operacional</h2>
        <p className="text-sm text-muted-foreground">
          Central de acionamento e gestão de incidentes
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-xs text-muted-foreground">
              <th className="px-3 py-2 text-left font-semibold">Tipo</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
              <th className="px-3 py-2 text-left font-semibold">Criação</th>
              <th className="px-3 py-2 text-left font-semibold">Ticket</th>
              <th className="px-3 py-2 text-left font-semibold">Área</th>
              <th className="px-3 py-2 text-left font-semibold">Jornada</th>
              <th className="px-3 py-2 text-left font-semibold">Produto</th>
              <th className="px-3 py-2 text-center font-semibold">Teams</th>
              <th className="px-3 py-2 text-center font-semibold">VICCI</th>
              <th className="px-3 py-2 text-center font-semibold">War Room</th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket, idx) => (
              <tr key={idx} className="border-b hover:bg-accent/5">
                <td className="px-3 py-3">{ticket.tipo}</td>
                <td className="px-3 py-3">{getStatusBadge(ticket.status)}</td>
                <td className="px-3 py-3 whitespace-nowrap">{ticket.criacao}</td>
                <td className="px-3 py-3">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    {ticket.ticket}
                  </code>
                </td>
                <td className="px-3 py-3">{ticket.area}</td>
                <td className="px-3 py-3">{ticket.jornada}</td>
                <td className="px-3 py-3">{ticket.produto}</td>
                <td className="px-3 py-3 text-center">
                  <Button size="sm" variant="default">
                    Enviar
                  </Button>
                </td>
                <td className="px-3 py-3 text-center">
                  <Button size="sm" variant="outline">
                    Acionar
                  </Button>
                </td>
                <td className="px-3 py-3 text-center">
                  <Button size="sm" variant="default">
                    Abrir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {mockTickets.length} tickets no total
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Exportar</Button>
          <Button variant="outline" size="sm">Filtros</Button>
        </div>
      </div>
    </Card>
  );
};

export default CockpitTab;