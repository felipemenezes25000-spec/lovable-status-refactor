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

const clocks: ClockData[] = [
  { label: 'Brasília', tz: 'America/Sao_Paulo', abbr: 'BRT' },
  { label: 'Luxemburgo', tz: 'Europe/Luxembourg', abbr: 'CET' },
  { label: 'Nova York', tz: 'America/New_York', abbr: 'ET' },
  { label: 'Reino Unido', tz: 'Europe/London', abbr: 'GMT' },
];

const tickerData: TickerItem[] = [
  { label: 'PIX Gateway', status: 'ok' },
  { label: 'SPI – Bacen', status: 'ok' },
  { label: 'DICT', status: 'ok' },
  { label: 'Cartões', status: 'warn' },
  { label: 'Crédito', status: 'ok' },
  { label: 'Tesouraria', status: 'ok' },
  { label: 'Core Banking', status: 'ok' },
  { label: 'Autenticação', status: 'ok' },
  { label: 'Mensageria', status: 'ok' },
  { label: 'Data Platform', status: 'ok' },
  { label: 'M365', status: 'info' },
  { label: 'Azure', status: 'ok' },
  { label: 'Datadog', status: 'ok' },
  { label: 'ICE', status: 'ok' },
  { label: 'B3 Up2Data', status: 'ok' },
];

const TopBar = () => {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes: Record<string, string> = {};
      
      clocks.forEach((clock) => {
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: clock.tz,
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
      ok: 'hsl(var(--status-up))',
      warn: 'hsl(var(--status-degraded))',
      err: 'hsl(var(--status-down))',
      info: 'hsl(var(--status-maintenance))',
    };
    return colors[status as keyof typeof colors] || colors.ok;
  };

  return (
    <div className="sticky top-0 z-50 border-b shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(var(--ticker-bg)) 0%, hsl(215 100% 18%) 100%)' }}>
      <div className="mx-auto max-w-[1680px]">
        {/* World Clocks Section - Enhanced */}
        <div className="border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-status-up shadow-lg" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--ticker-text))' }}>
                World Time
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {clocks.map((clock) => (
                <div key={clock.tz} className="group flex items-center gap-2 transition-transform hover:scale-105">
                  <div className="flex flex-col">
                    <div className="text-xs font-medium opacity-75" style={{ color: 'hsl(var(--ticker-text))' }}>
                      {clock.label}
                    </div>
                    <div className="font-mono text-sm font-bold tabular-nums tracking-tight" style={{ color: 'hsl(var(--ticker-text))' }}>
                      {times[clock.tz] || '--:--:--'}
                    </div>
                  </div>
                  <div className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold" style={{ color: 'hsl(var(--ticker-text))' }}>
                    {clock.abbr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Ticker Section - Enhanced */}
        <div className="relative overflow-hidden px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-up" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--ticker-text))' }}>
                Live Status
              </span>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="ticker-animate flex gap-6">
                {[...tickerData, ...tickerData].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex shrink-0 items-center gap-2 transition-transform hover:scale-105"
                  >
                    <div
                      className="h-1.5 w-1.5 rounded-full shadow-lg transition-all group-hover:scale-150"
                      style={{ backgroundColor: getStatusColor(item.status) }}
                    />
                    <span className="whitespace-nowrap text-sm font-semibold" style={{ color: 'hsl(var(--ticker-text))' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;