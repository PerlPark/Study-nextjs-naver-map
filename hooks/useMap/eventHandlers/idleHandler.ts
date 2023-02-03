import CONST from '@/constants/const';
import hideMarker from '../utils/hideMarker';
import showMarker from '../utils/showMarker';

interface IIdleHander {
  map: naver.maps.Map;
  markers: naver.maps.Marker[];
}

function idleHandler({ map, markers }: IIdleHander) {
  let hasDisplayedMarker = false;

  return function () {
    const mapBounds = map.getBounds();
    const zoom = map.getZoom();

    if (zoom < CONST.MARKER_DISPLAYABLE_MIN_ZOOM) {
      if (hasDisplayedMarker) {
        markers.forEach(hideMarker);
        hasDisplayedMarker = false;
      }
      return;
    }

    for (let i = 0; i < markers.length; i++) {
      let marker = markers[i];
      let position = marker.getPosition();

      if (mapBounds.hasPoint(position)) {
        hasDisplayedMarker = true;
        showMarker(marker, map);
      } else {
        hideMarker(marker);
      }
    }
  };
}

export default idleHandler;
