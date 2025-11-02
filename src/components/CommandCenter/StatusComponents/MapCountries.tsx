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
    <Card className="p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold">Status Global</h3>
          <p className="text-xs text-muted-foreground">Distribuição geográfica</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="status-pill status-up">Operacional</span>
          <span className="status-pill status-degraded">Instável</span>
          <span className="status-pill status-down">Indisponível</span>
          <span className="status-pill status-maintenance">Manutenção</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Map Placeholder */}
        <div className="flex h-[200px] items-center justify-center rounded-lg border bg-muted/20">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-semibold">Mapa Interativo Global</p>
            <p className="text-xs">(Leaflet integration)</p>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid gap-2 sm:grid-cols-2">
          {countries.map((country, idx) => (
            <Card key={idx} className="p-3 transition-all hover:bg-accent/5">
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{country.continent}</div>
                  <div className="font-bold">{country.name}</div>
                  <div className="text-xs text-muted-foreground">Região: {country.region}</div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-xs">
                <span className="status-pill status-up">Op. {country.services.up}</span>
                {country.services.degraded > 0 && (
                  <span className="status-pill status-degraded">Inst. {country.services.degraded}</span>
                )}
                {country.services.down > 0 && (
                  <span className="status-pill status-down">Ind. {country.services.down}</span>
                )}
                {country.services.maintenance > 0 && (
                  <span className="status-pill status-maintenance">Man. {country.services.maintenance}</span>
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