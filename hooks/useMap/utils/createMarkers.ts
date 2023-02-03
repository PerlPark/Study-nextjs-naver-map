interface ICreateMarkers {
  latLngs: [number, number][];
}

function createMarkers({ latLngs }: ICreateMarkers) {
  const size = 12;

  return latLngs?.map(([lat, lng]) => {
    return new naver.maps.Marker({
      icon: {
        content: getMarkerContent(size),
        size: new naver.maps.Size(size, size),
        anchor: new naver.maps.Point(size / 2, size / 2),
      },
      position: new naver.maps.LatLng(lat, lng),
    });
  });
}

function getMarkerContent(size: number) {
  return `<div style="width: ${size}px;height: ${size}px;background-color: #0267FF;border: 1px #ffffff solid;border-radius: ${
    size / 2
  }px;box-shadow: 0px 0px 7px 1px #0267FF;max-width: 12px;max-height: 12px;" />`;
}

export default createMarkers;
