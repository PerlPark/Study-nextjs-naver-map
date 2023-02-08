interface ICreatePlaceMarker {
  point: naver.maps.Point;
  name: string;
}

function createPlaceMarker({ point, name }: ICreatePlaceMarker) {
  return new naver.maps.Marker({
    icon: {
      content: getMarkerContent(name),
    },
    position: point,
  });
}

function getMarkerContent(name: string) {
  return `<div class="placeMarker">${name}</div>`;
}

export default createPlaceMarker;
