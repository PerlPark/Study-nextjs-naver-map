'use client';
import useGetGeoJson from '@/hooks/useGetGeoJson';
import useMap from '@/hooks/useMap';
import type { NextPage } from 'next';

const DatalayerFitBounds: NextPage = () => {
  const geoJson = useGetGeoJson('/geumileup.json');

  const { Map } = useMap({ geoJson });

  return (
    <div>
      <Map style={{ width: 800, height: 800 }} />
    </div>
  );
};

export default DatalayerFitBounds;
