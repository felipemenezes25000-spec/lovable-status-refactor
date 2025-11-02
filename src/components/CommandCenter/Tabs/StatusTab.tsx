import TratativaWidget from '../StatusComponents/TratativaWidget';
import StatusSummary from '../StatusComponents/StatusSummary';
import SystemsTable from '../StatusComponents/SystemsTable';
import MapCountries from '../StatusComponents/MapCountries';
import AvailabilityCards from '../StatusComponents/AvailabilityCards';

const StatusTab = () => {
  return (
    <div className="space-y-4">
      {/* Top Section: Tratativa Widget + Status Summary */}
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <TratativaWidget />
        <StatusSummary />
      </div>
      
      {/* Systems Monitored Table */}
      <SystemsTable />
      
      {/* Grid Section: Map & Availability */}
      <div className="grid gap-4 lg:grid-cols-2">
        <MapCountries />
        <AvailabilityCards />
      </div>
    </div>
  );
};

export default StatusTab;