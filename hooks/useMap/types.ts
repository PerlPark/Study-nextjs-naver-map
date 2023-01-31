export interface IUseMap {
  coord: [number, number];
  options: {
    mapTypeControl: boolean; // 일반/위성 전환 컨트롤
    minZoom?: number; // 최소 줌 레벨
    disableKineticPan?: boolean; // 관성 드래그
  };
}
