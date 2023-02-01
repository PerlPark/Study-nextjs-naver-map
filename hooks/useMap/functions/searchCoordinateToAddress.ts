import MSG from '@/constants/msg';
import makeAddress from '../utils/makeAddress';

function searchCoordinateToAddress(latlng: naver.maps.Point) {
  return new Promise<string[]>((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          // 변환 작업 이름 (아래 옵션 순으로 변환)
          naver.maps.Service.OrderType.ADDR, // 주소
          naver.maps.Service.OrderType.ROAD_ADDR, // 도로명 주소
        ].join(','),
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          reject(MSG.NAVER_MAP_ERROR('reverseGeocode'));
        }

        const items = response.v2.results;
        const addresses = [];

        for (let i = 0, item, address, addrType; i < items.length; i++) {
          item = items[i];
          address = makeAddress(item) || '';
          addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

          addresses.push(i + 1 + '. ' + addrType + ' ' + address);
        }
        resolve(addresses);
      }
    );
  });
}

export default searchCoordinateToAddress;
