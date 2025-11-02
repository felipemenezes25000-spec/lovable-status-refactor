import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
interface System {
  name: string;
  owner: string;
  status: 'up' | 'degraded' | 'down' | 'maintenance';
  last: string;
  p95: number;
  err: number;
  tps: number;
  uptime: number;
  region: string;
  kind: string;
}
const mockSystems: System[] = [{
  name: 'PIX Gateway',
  owner: 'Payments',
  status: 'up',
  last: '2025-10-22',
  p95: 140,
  err: 0.08,
  tps: 3200,
  uptime: 99.92,
  region: 'BR-SP',
  kind: 'API'
}, {
  name: 'Core Banking',
  owner: 'Core',
  status: 'degraded',
  last: '2025-10-24',
  p95: 280,
  err: 1.60,
  tps: 1800,
  uptime: 98.40,
  region: 'BR-SP',
  kind: 'Monolith'
}, {
  name: 'Auth Service',
  owner: 'Security',
  status: 'up',
  last: '2025-10-20',
  p95: 95,
  err: 0.15,
  tps: 4500,
  uptime: 99.85,
  region: 'Global',
  kind: 'Microservice'
}];
const SystemsTable = () => {
  const [showOnlyProblems, setShowOnlyProblems] = useState(false);
  const filteredSystems = showOnlyProblems ? mockSystems.filter(s => s.status !== 'up') : mockSystems;
  const getStatusPill = (status: string) => {
    const classes = `status-pill status-${status}`;
    const labels = {
      up: 'Operacional',
      degraded: 'Instável',
      down: 'Indisponível',
      maintenance: 'Manutenção'
    };
    return <span className={classes}>{labels[status as keyof typeof labels]}</span>;
  };
  return;
};
export default SystemsTable;