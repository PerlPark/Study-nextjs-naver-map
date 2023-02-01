import { useEffect, useRef } from 'react';
import type IMap from './types';

const useMap = (params: IMap) => {
  const mapRef = useRef<naver.maps.Map>();

  useEffect(() => {
    mapRef.current = new naver.maps.Map('map');
  }, []);
};

export default useMap;
