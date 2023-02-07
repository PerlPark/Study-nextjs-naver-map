import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        params: { ...req.query },
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );
    res.status(200).json(result?.data);
  } catch (err) {
    throw err;
  }
}
