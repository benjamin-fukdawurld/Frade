import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeader = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "f218e83926msh16b1304fccd7d3ap17d6bdjsne1d763ad4970",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: apiHeader,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (params: { newsCategory: string; count: number }) =>
        createRequest(
          `/news/search?q=${params.newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${params.count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
