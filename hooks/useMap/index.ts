import getInfoWidowContent from '@/hooks/useMap/utils/getInfoWindow';
import searchCoordinateToAddress from '@/hooks/useMap/functions/searchCoordinateToAddress';
import { useEffect, useRef } from 'react';
import type IMap from './types';
import searchAddressToCoordinate from './functions/searchAddressToCoordinate';

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

    // searchAddressToCoordinate
    if (functions?.searchAddressToCoordinate) {
      infoWindow.close();
      searchAddressToCoordinate(functions.searchAddressToCoordinate).then(
        (addresses) => {
          infoWindow.setContent(
            getInfoWidowContent({
              title: `검색 주소: ${functions.searchAddressToCoordinate}`,
              contents: addresses.texts,
            })
          );
          infoWindow.open(
            map,
            new naver.maps.Point(
              Number(addresses.items[0].x),
              Number(addresses.items[0].y)
            )
          );
        }
      );
    }
  }, [functions]);
};

export default useMap;
