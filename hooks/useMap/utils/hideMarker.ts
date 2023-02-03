function hideMarker(marker: naver.maps.Marker) {
  if (!marker.getMap()) return; // 마커가 표시되어 있지 않으면 종료
  marker.setMap(null);
}

export default hideMarker;
