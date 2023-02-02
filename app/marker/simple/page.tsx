import Map from '@/components/Map';
import type { NextPage } from 'next';

const MarkerSimple: NextPage = () => {
  return (
    <div>
      <Map
        markers={[[37.5662952, 126.9779451]]}
        style={{ width: 800, height: 800 }}
      />
    </div>
  );
};

export default MarkerSimple;
