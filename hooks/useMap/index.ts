import getInfoWidowContent from '@/hooks/useMap/utils/getInfoWindow';
import searchCoordinateToAddress from '@/hooks/useMap/functions/searchCoordinateToAddress';
import { useCallback, useEffect, useRef, useState } from 'react';
import type IMap from './types';
import searchAddressToCoordinate from './functions/searchAddressToCoordinate';
import createMarkers from './utils/createMarkers';
import CONST from '@/constants/const';
import idleHandler from './eventHandlers/idleHandler';
import coordsToPointArray from './utils/coordsToPointArray';
import Map from '@/components/Map';
import createPlaceMarker from './utils/createPlaceMarker';
import hideMarker from './utils/hideMarker';
import showMarker from './utils/showMarker';

const useMap = ({ markers: latLngs, functions, geoJson }: IMap) => {
  const mapRef = useRef<naver.maps.Map>();
  const infoWindowRef = useRef<naver.maps.InfoWindow>();
  const placeMarkerRef = useRef<naver.maps.Marker>();

  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

  // init ------------------------------------
  useEffect(() => {
    mapRef.current = new naver.maps.Map('map', { tileSpare: 16 });
    infoWindowRef.current = new naver.maps.InfoWindow({
      content: '',
      anchorSkew: true,
    });
  }, []);

  // marker ------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !latLngs) return;

    naver.maps.Event.once(map, 'init', () => {
      // 마커 초기화
      setMarkers(createMarkers({ latLngs }));
    });
  }, [latLngs]);
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

  // geoJson ------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // geoJson 변경되면 기존에 그러진 것은 삭제
    map.data
      .getAllFeature()
      .forEach((feature) => map.data.removeFeature(feature));

    if (geoJson) {
      map.data.addGeoJson(geoJson, true);
      map.fitBounds(coordsToPointArray(geoJson.geometry));
    }
  }, [geoJson]);

  // functions ------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    const infoWindow = infoWindowRef.current;

    if (!map || !infoWindow) return;

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
  }, [
    functions?.searchCoordinateToAddress,
    functions?.searchAddressToCoordinate,
  ]);

  // method ------------------------------------
  const setSelectPlace = useCallback(function (
    [x, y]: [string, string] | [number, number],
    name: string
  ) {
    const map = mapRef.current;
    if (!map) return;

    const point = new naver.maps.Point(Number(x), Number(y));
    map.setZoom(15);
    map.setCenter(point);

    if (placeMarkerRef.current) hideMarker(placeMarkerRef.current);

    placeMarkerRef.current = createPlaceMarker({ point, name });
    showMarker(placeMarkerRef.current, map);
  },
  []);

  return { Map, setSelectPlace };
};

export default useMap;
