import { ListItem } from '@/components/SearchResult';
import { DocumentsItem } from '@/pages/api/location-kakao';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface SearchPlaceReturnData {
  x: string;
  y: string;
  name: string;
}

const useSearchPlace = ({ query }: { query: string }) => {
  return useQuery(
    ['searchPlace', query],
    () =>
      axios.get<DocumentsItem[]>('/api/location-kakao', {
        params: { query, size: 10 },
      }),
    {
      enabled: !!query,
      select: (res) =>
        res.data.map(
          (v): ListItem<SearchPlaceReturnData> => ({
            key: v.id || v.x + v.y,
            title: v.place_name || v.address_name,
            subText: v.place_name ? v.address_name : undefined,
            buttonReturn: {
              x: v.x,
              y: v.y,
              name: v.place_name || v.address_name,
            },
          })
        ),
    }
  );
};

export default useSearchPlace;
