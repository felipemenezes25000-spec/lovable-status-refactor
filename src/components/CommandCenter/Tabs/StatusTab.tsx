import { Card } from '@/components/ui/card';
import TratativaWidget from '../StatusComponents/TratativaWidget';
import StatusSummary from '../StatusComponents/StatusSummary';
import SystemsTable from '../StatusComponents/SystemsTable';
import MapCountries from '../StatusComponents/MapCountries';
import PIXHealth from '../StatusComponents/PIXHealth';
import Timeline from '../StatusComponents/Timeline';

const StatusTab = () => {
  return (
    <div className="space-y-3">
      {/* Tratativa 24x7 Widget */}
      <TratativaWidget />
      
      {/* Status Summary */}
      <StatusSummary />
      
      {/* Main Grid */}
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Systems Monitored */}
          <SystemsTable />
          
          {/* Map & Countries */}
          <MapCountries />
        </div>
        
        {/* Right Column - PIX */}
        <div>
          <PIXHealth />
        </div>
      </div>
      
      {/* Timeline */}
      <Timeline />
    </div>
  );
};

export default StatusTab;