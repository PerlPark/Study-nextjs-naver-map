import Map from '@/components/Map';
import type { NextPage } from 'next';

const Main: NextPage = () => {
  return (
    <div>
      <Map
        coord={[37.5156945, 127.0400499]}
        options={{ mapTypeControl: false }}
      />
    </div>
  );
};

export default Main;
