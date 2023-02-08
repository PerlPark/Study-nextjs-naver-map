import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export type DocumentsItem = {
  address_name: string;
  id: string;
  place_name: string;
  x: string;
  y: string;
};

export type KakaoResponse = {
  documents: DocumentsItem[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: any[];
      selected_region: string;
    } | null;
    total_count: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentsItem[]>
) {
  try {
    const {
      data: { documents: addresses },
    } = await axios.get<KakaoResponse>(
      'https://dapi.kakao.com/v2/local/search/address.json',
      {
        params: { query: req.query.query, size: 30 },
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );

    const {
      data: { documents: places },
    } = await axios.get<KakaoResponse>(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        params: {
          query: req.query.query,
          size: 15,
        },
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );

    res.status(200).json([...addresses, ...places]);
  } catch (err) {
    console.log(err);
    res.status(200).json([]);
  }
}
