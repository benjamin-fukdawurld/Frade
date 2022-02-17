import axios from 'axios';

import Market from '../../models/Market';
import Orderbook from '../../models/Orderbook';
import Trade from '../../models/Trade';
import HistoryEntry from '../../models/HistoryEntry';

import { FtxResponse } from '../../interfaces/Ftx';

import { MarketFilter } from './interfaces';

const FtxInstance = axios.create({
  baseURL: `${process.env.FTX_BASEURL}/markets`,
  headers: {
    Accept: 'application/json',
  },
});

export default {
  async getMarkets(filter?: MarketFilter): Promise<Market[] | null> {
    return FtxInstance.get<FtxResponse<Market[]>>('').then((res): Market[] | null => {
      if (!res.data.success) {
        return null;
      }

      let markets = res.data.result;
      if (filter?.type) {
        markets = markets.filter((cur) => cur.type === filter.type);
      }

      return markets;
    });
  },

  async getMarket(marketName: string): Promise<Market | null> {
    return FtxInstance.get<FtxResponse<Market>>(`/${marketName}`).then((res): Market | null =>
      res.data.success ? res.data.result : null,
    );
  },

  async getOrderbook(marketName: string, depth: number = 20): Promise<Orderbook | null> {
    return FtxInstance.get<FtxResponse<Orderbook>>(`/${marketName}/orderbook`, {
      params: {
        depth,
      },
    }).then((res): Orderbook | null => (res.data.success ? res.data.result : null));
  },

  async getTrades(
    marketName: string,
    startTime?: number,
    endTime?: number,
  ): Promise<Trade[] | null> {
    return FtxInstance.get<FtxResponse<Trade[]>>(`/${marketName}/trades`, {
      params: {
        start_time: startTime,
        end_time: endTime,
      },
    }).then((res): Trade[] | null => (res.data.success ? res.data.result : null));
  },

  async getHistoricalPrices(
    marketName: string,
    resolution: number,
    startTime?: number,
    endTime?: number,
  ): Promise<HistoryEntry[] | null> {
    return FtxInstance.get<FtxResponse<HistoryEntry[]>>(`/${marketName}/candles`, {
      params: {
        resolution,
        start_time: startTime,
        end_time: endTime,
      },
    }).then((res): HistoryEntry[] | null => (res.data.success ? res.data.result : null));
  },
};
