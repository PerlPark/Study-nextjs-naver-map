import Map from '@/components/Map';
import type { NextPage } from 'next';

const Main: NextPage = () => {
  return (
    <div>
      <Map style={{ width: 375, height: 600 }} />
    </div>
  );
};

export default Main;
