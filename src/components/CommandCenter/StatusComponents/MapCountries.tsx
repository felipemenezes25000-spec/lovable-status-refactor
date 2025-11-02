import { Card } from '@/components/ui/card';
const MapCountries = () => {
  const countries = [{
    continent: 'América do Sul',
    name: 'Brasil',
    region: 'BR-SP',
    status: 'degraded',
    services: {
      up: 15,
      degraded: 3,
      down: 1,
      maintenance: 0
    }
  }, {
    continent: 'Europa',
    name: 'Luxemburgo',
    region: 'LUX',
    status: 'up',
    services: {
      up: 8,
      degraded: 0,
      down: 0,
      maintenance: 0
    }
  }, {
    continent: 'América do Norte',
    name: 'Estados Unidos',
    region: 'US-NY',
    status: 'up',
    services: {
      up: 12,
      degraded: 0,
      down: 0,
      maintenance: 1
    }
  }, {
    continent: 'Europa',
    name: 'Reino Unido',
    region: 'UK-LON',
    status: 'up',
    services: {
      up: 6,
      degraded: 0,
      down: 0,
      maintenance: 0
    }
  }];
  return;
};
export default MapCountries;