import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
interface ClockData {
  label: string;
  tz: string;
  abbr: string;
}
interface TickerItem {
  label: string;
  status: 'ok' | 'warn' | 'err' | 'info';
}
const clocks: ClockData[] = [{
  label: 'Brasília',
  tz: 'America/Sao_Paulo',
  abbr: 'BRT'
}, {
  label: 'Luxemburgo',
  tz: 'Europe/Luxembourg',
  abbr: 'CET'
}, {
  label: 'Nova York',
  tz: 'America/New_York',
  abbr: 'ET'
}, {
  label: 'Reino Unido',
  tz: 'Europe/London',
  abbr: 'GMT'
}];
const tickerData: TickerItem[] = [{
  label: 'PIX Gateway',
  status: 'ok'
}, {
  label: 'SPI – Bacen',
  status: 'ok'
}, {
  label: 'DICT',
  status: 'ok'
}, {
  label: 'Cartões',
  status: 'warn'
}, {
  label: 'Crédito',
  status: 'ok'
}, {
  label: 'Tesouraria',
  status: 'ok'
}, {
  label: 'Core Banking',
  status: 'ok'
}, {
  label: 'Autenticação',
  status: 'ok'
}, {
  label: 'Mensageria',
  status: 'ok'
}, {
  label: 'Data Platform',
  status: 'ok'
}, {
  label: 'M365',
  status: 'info'
}, {
  label: 'Azure',
  status: 'ok'
}, {
  label: 'Datadog',
  status: 'ok'
}, {
  label: 'ICE',
  status: 'ok'
}, {
  label: 'B3 Up2Data',
  status: 'ok'
}];
const TopBar = () => {
  const [times, setTimes] = useState<Record<string, string>>({});
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes: Record<string, string> = {};
      clocks.forEach(clock => {
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: clock.tz
        });
        newTimes[clock.tz] = formatter.format(now);
      });
      setTimes(newTimes);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = (status: string) => {
    const colors = {
      ok: 'bg-emerald-500',
      warn: 'bg-amber-500',
      err: 'bg-red-500',
      info: 'bg-blue-500'
    };
    return colors[status as keyof typeof colors] || colors.ok;
  };
  return <div className="sticky top-0 z-[100] border-b bg-[hsl(var(--ticker-bg))] text-[hsl(var(--ticker-text))]">
      {/* World Clocks */}
      <div className="border-b border-white/15 bg-[hsl(var(--ticker-bg))]">
        <div className="mx-auto flex max-w-[1680px] items-center gap-2 overflow-hidden px-2 py-1.5">
          {clocks.map((clock, idx) => <div key={idx} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-blue-200">
                {clock.label}
              </span>
              <span className="font-mono text-sm font-bold tabular-nums">
                {times[clock.tz] || '--:--:--'}
              </span>
              <span className="text-xs opacity-90">({clock.abbr})</span>
            </div>)}
        </div>
      </div>

      {/* Status Ticker */}
      <div className="border-b border-white/15 bg-[hsl(var(--ticker-bg))]">
        <div className="mx-auto max-w-[1680px] overflow-hidden px-2 py-1.5">
          <div className="flex items-center gap-3">
            
            
            <div className="relative flex-1 overflow-hidden">
              <div className="ticker-animate inline-flex gap-4">
                {[...tickerData, ...tickerData, ...tickerData].map((item, idx) => <div key={idx} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(item.status)}`} />
                    <span className="whitespace-nowrap text-sm font-semibold">{item.label}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TopBar;