const MSG = {
  NAVER_MAP_ERROR: (method: string) =>
    `지도를 사용하는데 오류가 발생했습니다. origin: ${method}`,
  NAVER_MAP_NOTFOUND: '위치를 찾을 수 없습니다.',
};

export default MSG;
