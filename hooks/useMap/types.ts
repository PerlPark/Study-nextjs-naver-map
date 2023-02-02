export default interface IMap {
  markers?: [number, number][];
  functions?: {
    searchCoordinateToAddress?: boolean;
    searchAddressToCoordinate?: string;
  };
}
