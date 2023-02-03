import type { GeoJsonType } from '../useGetGeoJson';

export default interface IMap {
  markers?: [number, number][];
  functions?: {
    searchCoordinateToAddress?: boolean;
    searchAddressToCoordinate?: string;
  };
  geoJson?: GeoJsonType;
}
