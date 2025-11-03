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
  { label: 'São Paulo', tz: 'America/Sao_Paulo', abbr: 'BRT' },
  { label: 'Rio de Janeiro', tz: 'America/Sao_Paulo', abbr: 'BRT' },
  { label: 'Nova York', tz: 'America/New_York', abbr: 'ET' },
  { label: 'Londres', tz: 'Europe/London', abbr: 'GMT' },
  { label: 'Luxemburgo', tz: 'Europe/Luxembourg', abbr: 'CET' },
  { label: 'Zurique', tz: 'Europe/Zurich', abbr: 'CET' },
  { label: 'Santiago', tz: 'America/Santiago', abbr: 'CLT' },
  { label: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', abbr: 'ART' },
  { label: 'Lima', tz: 'America/Lima', abbr: 'PET' },
  { label: 'Miami', tz: 'America/New_York', abbr: 'ET' },
  { label: 'Cidade do México', tz: 'America/Mexico_City', abbr: 'CST' },
  { label: 'Hong Kong', tz: 'Asia/Hong_Kong', abbr: 'HKT' },
  { label: 'Singapura', tz: 'Asia/Singapore', abbr: 'SGT' },
  { label: 'Dubai', tz: 'Asia/Dubai', abbr: 'GST' },
];

const tickerData: TickerItem[] = [
  // Core Banking Systems
  { label: 'PIX Gateway', status: 'ok' },
  { label: 'SPI – Bacen', status: 'ok' },
  { label: 'DICT', status: 'ok' },
  { label: 'Core Banking', status: 'ok' },
  { label: 'Cartões', status: 'warn' },
  { label: 'Crédito', status: 'ok' },
  { label: 'Investimentos', status: 'ok' },
  { label: 'Tesouraria', status: 'ok' },
  { label: 'Câmbio', status: 'ok' },
  { label: 'Derivativos', status: 'ok' },
  
  // Trading & Markets
  { label: 'B3 Up2Data', status: 'ok' },
  { label: 'ICE', status: 'ok' },
  { label: 'Bloomberg', status: 'ok' },
  { label: 'Refinitiv', status: 'ok' },
  { label: 'FIX Gateway', status: 'ok' },
  { label: 'Order Management', status: 'ok' },
  
  // Infrastructure
  { label: 'Autenticação', status: 'ok' },
  { label: 'Mensageria', status: 'ok' },
  { label: 'Data Platform', status: 'ok' },
  { label: 'Azure Cloud', status: 'ok' },
  { label: 'AWS Cloud', status: 'ok' },
  { label: 'M365', status: 'info' },
  
  // Monitoring & Security
  { label: 'Datadog', status: 'ok' },
  { label: 'Splunk', status: 'ok' },
  { label: 'Firewall', status: 'ok' },
  { label: 'WAF', status: 'ok' },
  { label: 'VPN', status: 'ok' },
  
  // Escritórios BTG
  { label: '🏢 São Paulo HQ', status: 'ok' },
  { label: '🏢 Rio de Janeiro', status: 'ok' },
  { label: '🏢 Nova York', status: 'ok' },
  { label: '🏢 Londres', status: 'ok' },
  { label: '🏢 Luxemburgo', status: 'ok' },
  { label: '🏢 Zurique', status: 'ok' },
  { label: '🏢 Santiago', status: 'ok' },
  { label: '🏢 Buenos Aires', status: 'ok' },
  { label: '🏢 Lima', status: 'ok' },
  { label: '🏢 Miami', status: 'ok' },
  { label: '🏢 Cidade do México', status: 'ok' },
  { label: '🏢 Hong Kong', status: 'ok' },
  { label: '🏢 Singapura', status: 'ok' },
  { label: '🏢 Dubai', status: 'ok' },
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
        {/* World Clocks Section - Enhanced with All BTG Offices */}
        <div className="border-b border-white/10 px-4 py-3">
          <div className="mx-auto flex items-center gap-4">
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <div className="h-2 w-2 animate-[pulse-glow_2s_ease-in-out_infinite] rounded-full bg-status-up shadow-lg" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--ticker-text))' }}>
                BTG Global Offices
              </span>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="ticker-animate flex gap-5">
                {[...clocks, ...clocks].map((clock, idx) => (
                  <div 
                    key={`${clock.tz}-${idx}`} 
                    className="group flex shrink-0 items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="text-xs font-semibold tracking-wide" style={{ color: 'hsl(var(--ticker-text))' }}>
                        {clock.label}
                      </div>
                      <div className="font-mono text-sm font-bold tabular-nums tracking-tight" style={{ color: 'hsl(var(--ticker-text))' }}>
                        {times[clock.tz] || '--:--:--'}
                      </div>
                    </div>
                    <div className="rounded-md bg-gradient-to-br from-white/20 to-white/10 px-2 py-1 text-[10px] font-bold shadow-sm" style={{ color: 'hsl(var(--ticker-text))' }}>
                      {clock.abbr}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Ticker Section - Enhanced with Categories */}
        <div className="relative overflow-hidden border-t border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm shadow-lg">
              <Activity className="h-3.5 w-3.5 animate-[pulse-glow_2s_ease-in-out_infinite]" style={{ color: 'hsl(var(--status-up))' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--ticker-text))' }}>
                Systems & Infrastructure
              </span>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="ticker-animate flex gap-4">
                {[...tickerData, ...tickerData].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/30 hover:bg-white/10"
                  >
                    <div
                      className="h-2 w-2 rounded-full shadow-lg transition-all group-hover:scale-125 group-hover:shadow-xl"
                      style={{ 
                        backgroundColor: getStatusColor(item.status),
                        boxShadow: `0 0 8px ${getStatusColor(item.status)}`
                      }}
                    />
                    <span className="whitespace-nowrap text-xs font-semibold tracking-wide" style={{ color: 'hsl(var(--ticker-text))' }}>
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