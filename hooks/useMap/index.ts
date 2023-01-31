import axios from 'axios';
import { useEffect, useRef } from 'react';
import { IUseMap } from './types';

const useMap = ({
  coord,
  options: { mapTypeControl, minZoom = 9, disableKineticPan = false },
}: IUseMap) => {
  const mapRef = useRef<naver.maps.Map>();

  useEffect(() => {
    mapRef.current = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(...coord),
    });

    mapRef.current.setOptions('mapTypeControl', mapTypeControl);
    mapRef.current.setOptions('minZoom', minZoom);
    mapRef.current.setOptions('disableKineticPan', disableKineticPan);

    //지도 인터랙션 끄기
    // mapRef.current.setOptions({
    //   draggable: false,
    //   pinchZoom: false,
    //   scrollWheel: false,
    //   keyboardShortcuts: false,
    //   disableDoubleTapZoom: true,
    //   disableDoubleClickZoom: true,
    //   disableTwoFingerTapZoom: true,
    // });

    //지도 인터랙션 켜기
    // mapRef.current.setOptions({
    //   draggable: true,
    //   pinchZoom: true,
    //   scrollWheel: true,
    //   keyboardShortcuts: true,
    //   disableDoubleTapZoom: false,
    //   disableDoubleClickZoom: false,
    //   disableTwoFingerTapZoom: false
    // });

    naver.maps.Event.once(mapRef.current, 'init', function () {
      // getOptions 참조는 init 후에 해야한다.

      axios
        .get('/test3.json')
        .then((res) => {
          mapRef.current?.data.addGeoJson(res.data, true);

          mapRef.current?.data.setStyle(() => {
            const styleOptions = {
              fillColor: '#ff0000',
              fillOpacity: 0.0001,
              strokeColor: '#ff0000',
              strokeWeight: 3,
              strokeOpacity: 1,
            };

            return styleOptions;
          });
        })
        .catch((err) => console.log(err));
    });
    [coord, mapTypeControl, minZoom];
  });
};

export default useMap;
