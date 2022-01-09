import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeader = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "f218e83926msh16b1304fccd7d3ap17d6bdjsne1d763ad4970",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: apiHeader,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count: number) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (params: { coinId: string }) => createRequest(`/coin/${params.coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: (params: { coinId: string; timePeriod: string }) =>
        createRequest(
          `/coin/${params.coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${params.timePeriod}`
        ),
    }),
    getExchanges: builder.query({
      query: (count: number) =>
        createRequest(
          `/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=${count}&orderBy=24hVolume'&orderDirection='desc'`
        ),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
