import { Card } from '@/components/ui/card';

const MapCountries = () => {
  const countries = [
    {
      continent: 'América do Sul',
      name: 'Brasil',
      region: 'BR-SP',
      status: 'degraded',
      services: { up: 15, degraded: 3, down: 1, maintenance: 0 },
    },
    {
      continent: 'Europa',
      name: 'Luxemburgo',
      region: 'LUX',
      status: 'up',
      services: { up: 8, degraded: 0, down: 0, maintenance: 0 },
    },
    {
      continent: 'América do Norte',
      name: 'Estados Unidos',
      region: 'US-NY',
      status: 'up',
      services: { up: 12, degraded: 0, down: 0, maintenance: 1 },
    },
    {
      continent: 'Europa',
      name: 'Reino Unido',
      region: 'UK-LON',
      status: 'up',
      services: { up: 6, degraded: 0, down: 0, maintenance: 0 },
    },
  ];

  return (
    <Card className="p-5 shadow-md">
      <div className="mb-4 border-b pb-3">
        <h3 className="text-lg font-bold">Status Global por Região</h3>
        <p className="text-xs text-muted-foreground">Distribuição geográfica dos serviços</p>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2 rounded-lg bg-muted/30 p-3">
        <span className="status-pill status-up text-xs">Operacional</span>
        <span className="status-pill status-degraded text-xs">Instável</span>
        <span className="status-pill status-down text-xs">Indisponível</span>
        <span className="status-pill status-maintenance text-xs">Manutenção</span>
      </div>

      <div className="space-y-4">
        {/* Map Placeholder */}
        <div className="flex h-[220px] items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 shadow-inner">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-semibold">🗺️ Mapa Interativo Global</p>
            <p className="text-xs opacity-70">(Integração Leaflet)</p>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {countries.map((country, idx) => (
            <Card 
              key={idx} 
              className="group cursor-pointer border-l-4 p-3 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
              style={{
                borderLeftColor: country.status === 'up' 
                  ? 'hsl(var(--status-up))' 
                  : country.status === 'degraded' 
                  ? 'hsl(var(--status-degraded))' 
                  : 'hsl(var(--status-down))'
              }}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {country.continent}
                  </div>
                  <div className="text-base font-bold text-foreground">{country.name}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-mono">{country.region}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                <span className="status-pill status-up">✓ {country.services.up}</span>
                {country.services.degraded > 0 && (
                  <span className="status-pill status-degraded">⚠ {country.services.degraded}</span>
                )}
                {country.services.down > 0 && (
                  <span className="status-pill status-down">✗ {country.services.down}</span>
                )}
                {country.services.maintenance > 0 && (
                  <span className="status-pill status-maintenance">🔧 {country.services.maintenance}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MapCountries;