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
      'https://openapi.naver.com/v1/search/local.json',
      {
        params: { ...req.query, display: 5 },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      }
    );
    res.status(200).json(result?.data);
  } catch (err) {
    throw err;
  }
}
