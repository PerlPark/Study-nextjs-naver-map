function showMarker(marker: naver.maps.Marker, map: naver.maps.Map) {
  if (marker.getMap()) return; // 마커가 이미 표시되어 있으면 종료
  marker.setMap(map);
}

export default showMarker;
