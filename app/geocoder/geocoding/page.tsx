import Map from '@/components/Map';
import type { NextPage } from 'next';

const Geocoding: NextPage = () => {
  return (
    <div>
      <Map
        functions={{ searchCoordinateToAddress: true }}
        style={{ width: 800, height: 800 }}
      />
    </div>
  );
};

export default Geocoding;
