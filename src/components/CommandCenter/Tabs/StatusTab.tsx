import TratativaWidget from '../StatusComponents/TratativaWidget';
import StatusSummary from '../StatusComponents/StatusSummary';
import SystemsTable from '../StatusComponents/SystemsTable';
import MapCountries from '../StatusComponents/MapCountries';
import AvailabilityCards from '../StatusComponents/AvailabilityCards';

const StatusTab = () => {
  return (
    <div className="space-y-3">
      {/* Tratativa 24x7 Widget */}
      <TratativaWidget />
      
      {/* Status Summary */}
      <StatusSummary />
      
      {/* Main Content */}
      <div className="space-y-3">
          {/* Systems Monitored */}
          <SystemsTable />
          
          {/* Map & Countries */}
          <MapCountries />
          
          {/* Availability Cards */}
          <AvailabilityCards />
        </div>
      
    </div>
  );
};

export default StatusTab;