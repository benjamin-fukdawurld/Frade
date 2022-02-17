/*import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import Market from '../../models/Market';

interface FtxAuthHeader {
  'FTX-KEY': string;
  'FTX-TS': string;
  'FTX-SIGN': string;
}

interface FtxRequestParams {
  auth?: boolean;
  startTime?: number;
  endTime?: number;
}

interface FtxResponse<ResultType> {
  success: boolean;
  result: ResultType;
}

function createRequestAuthHeader(params: {
  timestamp: number;
  method: string;
  url: string;
}): FtxAuthHeader {
  return {
    'FTX-KEY': process.env.FTX_API_KEY as string,
    'FTX-TS': params.timestamp.toString(),
    'FTX-SIGN': sha256(`${params.timestamp}${params.method}${params.url}`),
  };
}

const FtxInstance = axios.create({
  baseURL: process.env.FTX_BASEURL,
  timeout: 3000,
});

export async function getMarkets(): Promise<FtxResponse<Market[]>> {
  return FtxInstance.get<FtxResponse<Market[]>>('/markets').then((res) => res.data);
}

export async function getMarket(name: string): Promise<FtxResponse<Market[]>> {
  return FtxInstance.get<FtxResponse<Market[]>>(`/markets/${name}`).then((res) => res.data);
}
*/
