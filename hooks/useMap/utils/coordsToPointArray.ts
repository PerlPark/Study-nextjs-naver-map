type Geometry = GeoJSON.Geometry;

function coordsToPointArray(geometry: Geometry) {
  switch (geometry.type) {
    case 'Polygon':
      return geometry.coordinates[0].map(
        ([x, y]) => new naver.maps.Point(Number(x), Number(y))
      );
    case 'MultiPolygon':
      return geometry.coordinates[0][0].map(
        ([x, y]) => new naver.maps.Point(Number(x), Number(y))
      );
    default:
      return [];
  }
}

export default coordsToPointArray;
