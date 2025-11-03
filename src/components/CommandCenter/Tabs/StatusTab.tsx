import TratativaWidget from '../StatusComponents/TratativaWidget';
import StatusSummary from '../StatusComponents/StatusSummary';
import SystemsTable from '../StatusComponents/SystemsTable';
import MapCountries from '../StatusComponents/MapCountries';
import AvailabilityCards from '../StatusComponents/AvailabilityCards';
import MetricsOverview from '../StatusComponents/MetricsOverview';
import RecentIncidents from '../StatusComponents/RecentIncidents';

const StatusTab = () => {
  return (
    <div className="space-y-5">
      {/* Real-time Metrics Overview - Hero Section */}
      <MetricsOverview />

      {/* Primary Widgets Grid */}
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <TratativaWidget />
        <StatusSummary />
      </div>
      
      {/* Systems Table - Main Focus */}
      <SystemsTable />

      {/* Dual Column: Incidents & Global Status */}
      <div className="grid gap-4 xl:grid-cols-2">
        <RecentIncidents />
        <MapCountries />
      </div>

      {/* Application Availability - Full Width */}
      <AvailabilityCards />
    </div>
  );
};

export default StatusTab;