'use client';
import Map from '@/components/Map';
import useGetGeoJson from '@/hooks/useGetGeoJson';
import type { NextPage } from 'next';

const DatalayerFitBounds: NextPage = () => {
  const geoJson = useGetGeoJson('/geumileup.json');

  return (
    <div>
      <Map geoJson={geoJson} style={{ width: 800, height: 800 }} />
    </div>
  );
};

export default DatalayerFitBounds;
