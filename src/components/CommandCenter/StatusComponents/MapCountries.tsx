import { Card } from '@/components/ui/card';
const MapCountries = () => {
  const countries = [{
    continent: 'América do Sul',
    name: 'Brasil',
    region: 'BR-SP',
    status: 'degraded',
    services: {
      up: 15,
      degraded: 3,
      down: 1,
      maintenance: 0
    }
  }, {
    continent: 'Europa',
    name: 'Luxemburgo',
    region: 'LUX',
    status: 'up',
    services: {
      up: 8,
      degraded: 0,
      down: 0,
      maintenance: 0
    }
  }, {
    continent: 'América do Norte',
    name: 'Estados Unidos',
    region: 'US-NY',
    status: 'up',
    services: {
      up: 12,
      degraded: 0,
      down: 0,
      maintenance: 1
    }
  }, {
    continent: 'Europa',
    name: 'Reino Unido',
    region: 'UK-LON',
    status: 'up',
    services: {
      up: 6,
      degraded: 0,
      down: 0,
      maintenance: 0
    }
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return 'hsl(var(--status-up))';
      case 'degraded': return 'hsl(var(--status-degraded))';
      case 'down': return 'hsl(var(--status-down))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  return (
    <Card className="overflow-hidden p-5 shadow-lg">
      <div className="mb-5 border-b pb-4">
        <h3 className="text-lg font-bold text-foreground">Status Global por Região</h3>
        <p className="text-xs text-muted-foreground">Distribuição geográfica de serviços</p>
      </div>

      {/* World Map Placeholder with Enhanced Visual */}
      <div className="mb-5 rounded-lg border-2 border-dashed border-border bg-gradient-to-br from-muted/30 to-muted/10 p-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.2s' }} />
            <div className="h-4 w-4 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Mapa Interativo Global</p>
          <p className="text-xs text-muted-foreground">4 regiões ativas • Latência média: 42ms</p>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {countries.map((country) => (
          <div
            key={country.region}
            className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{
              borderLeftWidth: '4px',
              borderLeftColor: getStatusColor(country.status),
            }}
          >
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:to-accent/5" />
            
            <div className="relative">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {country.continent}
                  </div>
                  <div className="mt-1 text-lg font-bold text-foreground">
                    {country.name}
                  </div>
                  <div className="mt-0.5 inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {country.region}
                  </div>
                </div>
                <div
                  className="h-3 w-3 rounded-full shadow-lg ring-2 ring-card"
                  style={{ backgroundColor: getStatusColor(country.status) }}
                />
              </div>

              {/* Services Breakdown */}
              <div className="mt-4 grid grid-cols-4 gap-2 rounded-lg bg-muted/50 p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-status-up">{country.services.up}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">OK</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-status-degraded">{country.services.degraded}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Instável</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-status-down">{country.services.down}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Down</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-status-maintenance">{country.services.maintenance}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Manut.</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default MapCountries;