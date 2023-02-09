'use client';
import Options from '@/components/Playground/Options';
import useGetGeoJson from '@/hooks/useGetGeoJson';
import useMap from '@/hooks/useMap';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './playground.module.css';

interface IPlaygroundOptions {
  geoJson: string;
}

export type SetOptionsType = React.Dispatch<
  React.SetStateAction<IPlaygroundOptions>
>;

const Playground: NextPage = () => {
  const router = useRouter();

  const [options, setOptions] = useState<IPlaygroundOptions>({ geoJson: '' });
  const geoJson = useGetGeoJson(options.geoJson);

  const { Map, setSelectPlace } = useMap({
    geoJson,
    functions: { searchCoordinateToAddress: true },
  });

  useEffect(() => {
    if (
      typeof router.query.x === 'string' &&
      typeof router.query.y === 'string' &&
      typeof router.query.name === 'string'
    )
      setSelectPlace([router.query.x, router.query.y], router.query.name);
  }, [router.query.name, router.query.x, router.query.y, setSelectPlace]);

  return (
    <div>
      <h1 className={styles.pageTitle}>🕹️ Playground</h1>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Options setOptions={setOptions} />
        </div>
        <Map style={{ width: '800px', height: '700px' }} />
      </div>
    </div>
  );
};

export default Playground;
