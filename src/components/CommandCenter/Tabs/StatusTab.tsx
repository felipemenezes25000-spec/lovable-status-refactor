import TratativaWidget from '../StatusComponents/TratativaWidget';
import StatusSummary from '../StatusComponents/StatusSummary';
import SystemsTable from '../StatusComponents/SystemsTable';
import MapCountries from '../StatusComponents/MapCountries';
import AvailabilityCards from '../StatusComponents/AvailabilityCards';

const StatusTab = () => {
  return (
    <div className="space-y-6">
      {/* Seção Principal: Métricas de Alto Nível */}
      <div className="grid gap-4 lg:grid-cols-[350px_1fr]">
        <TratativaWidget />
        <StatusSummary />
      </div>
      
      {/* Tabela de Sistemas - Destaque Principal */}
      <SystemsTable />
      
      {/* Grid Duplo: Status Global e Disponibilidade */}
      <div className="grid gap-4 xl:grid-cols-[45%_55%]">
        <MapCountries />
        <AvailabilityCards />
      </div>
    </div>
  );
};

export default StatusTab;