import { useEffect, useRef } from 'react';

const useMap = () => {
  const mapRef = useRef<naver.maps.Map>();

  useEffect(() => {
    mapRef.current = new naver.maps.Map('map');
  }, []);
};

export default useMap;
