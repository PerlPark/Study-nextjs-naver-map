import MSG from '@/constants/msg';

function searchAddressToCoordinate(address: string) {
  return new Promise<{
    items: naver.maps.Service.AddressItemV2[];
    texts: string[];
  }>((resolve, reject) => {
    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        reject(MSG.NAVER_MAP_ERROR('reverseGeocode'));
      }

      if (response.v2.meta.totalCount === 0) {
        return alert(MSG.NAVER_MAP_NOTFOUND);
      }

      const items = response.v2.addresses;
      const texts = [];

      for (let i = 0, item; i < items.length; i++) {
        item = items[i];

        texts.push(i + 1 + '.');

        if (item.roadAddress) {
          texts.push('[도로명 주소] ' + item.roadAddress);
        }
        if (item.jibunAddress) {
          texts.push('[지번 주소] ' + item.jibunAddress);
        }
        if (item.englishAddress) {
          texts.push('[영문명 주소] ' + item.englishAddress);
        }

        texts.push('<br />');
      }
      resolve({ items, texts });
    });
  });
}

export default searchAddressToCoordinate;
