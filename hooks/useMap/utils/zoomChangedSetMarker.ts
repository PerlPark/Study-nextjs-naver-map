import CONST from '@/constants/const';

function controlMarkersWhenZoomChanged(
  markers: naver.maps.Marker[],
  map: naver.maps.Map
) {
  let isMarkerDisplayed = false;

  return function (zoom: number) {
    // 마커가 활성화된 상태에서 줌이 14보다 작으면 마커 비활성화
    if (isMarkerDisplayed && zoom < CONST.MARKER_DISPLAYABLE_MIN_ZOOM) {
      isMarkerDisplayed = false;

      markers.forEach((marker) => {
        if (!marker.getMap()) return;
        marker.setMap(null);
      });
      return;
    }

    // 마커가 비활성화 되어있을 때 줌이 14 이상이면 마커 활성화
    if (!isMarkerDisplayed && zoom >= CONST.MARKER_DISPLAYABLE_MIN_ZOOM) {
      isMarkerDisplayed = true;

      markers.forEach((marker) => {
        if (marker.getMap()) return;
        marker.setMap(map);
      });
    }
  };
}

export default controlMarkersWhenZoomChanged;
