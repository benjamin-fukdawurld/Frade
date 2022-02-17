export interface FtxAuthHeader {
  'FTX-KEY': string;
  'FTX-TS': string;
  'FTX-SIGN': string;
}

export interface FtxRequestParams {
  auth?: boolean;
  startTime?: number;
  endTime?: number;
}

export interface FtxResponse<ResultType> {
  success: boolean;
  result: ResultType;
}
