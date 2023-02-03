import getInfoWidowContent from '@/hooks/useMap/utils/getInfoWindow';
import searchCoordinateToAddress from '@/hooks/useMap/functions/searchCoordinateToAddress';
import { useEffect, useRef, useState } from 'react';
import type IMap from './types';
import searchAddressToCoordinate from './functions/searchAddressToCoordinate';
import createMarkers from './utils/createMarkers';
import CONST from '@/constants/const';
import idleHandler from './eventHandlers/idleHandler';
import coordsToPointArray from './utils/coordsToPointArray';

const useMap = ({ markers: latLngs, functions, geoJson }: IMap) => {
  const mapRef = useRef<naver.maps.Map>();

  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

  useEffect(() => {
    mapRef.current = new naver.maps.Map('map', {
      center: [127.0473753, 37.5175066],
      zoom: 12,
    });
    const map = mapRef.current;

    const infoWindow = new naver.maps.InfoWindow({
      content: '',
      anchorSkew: true,
    });

    naver.maps.Event.once(map, 'init', () => {
      // 마커 초기화
      if (latLngs) {
        setMarkers(createMarkers({ latLngs }));
      }

      // geoJson 있는 경우 그리기
      if (geoJson) {
        map.data.addGeoJson(geoJson, true);
        map.fitBounds(coordsToPointArray(geoJson.geometry));
      }
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
          const point = new naver.maps.Point(
            Number(addresses.items[0].x),
            Number(addresses.items[0].y)
          );
          map.setCenter(point);
          infoWindow.open(map, point);
        }
      );
    }
  }, [functions, geoJson, latLngs]);

  // 마커 관련
  useEffect(() => {
    const map = mapRef.current;
    if (!map || markers.length === 0) return;

    // zoom 초기 사이즈가 마커를 표시할 수 있는 최소 줌 사이즈 이상이면 마커 출력
    if (map.getZoom() >= CONST.MARKER_DISPLAYABLE_MIN_ZOOM) {
      markers.forEach((marker) => marker.setMap(map));
    }

    // 지도 유휴 상태일 때 & 줌 이벤트 발생 시
    naver.maps.Event.addListener(
      mapRef.current,
      'idle',
      idleHandler({ map, markers })
    );
  }, [markers]);
};

export default useMap;
