import getInfoWidowContent from '@/hooks/useMap/utils/getInfoWindow';
import searchCoordinateToAddress from '@/hooks/useMap/functions/searchCoordinateToAddress';
import { useEffect, useRef } from 'react';
import type IMap from './types';

const useMap = ({ functions }: IMap) => {
  const mapRef = useRef<naver.maps.Map>();

  useEffect(() => {
    mapRef.current = new naver.maps.Map('map');
    const map = mapRef.current;

    const infoWindow = new naver.maps.InfoWindow({
      content: '',
      anchorSkew: true,
    });

    // searchCoordinateToAddress
    if (functions?.searchCoordinateToAddress) {
      naver.maps.Event.addListener(map, 'click', async ({ latlng }) => {
        infoWindow.close();
        const addresses = await searchCoordinateToAddress(latlng);
        infoWindow.setContent(
          getInfoWidowContent({ title: '검색 좌표', contents: addresses })
        );
        infoWindow.open(map, latlng);
      });
    }
  }, [functions]);
};

export default useMap;
