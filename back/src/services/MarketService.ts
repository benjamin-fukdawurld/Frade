import dao, { MarketFilter } from '../dao/MarketDao';
import ServiceResponse from '../interfaces/ServiceResponse';
import Market from '../models/Market';
import Orderbook from '../models/Orderbook';
import Trade from '../models/Trade';
import HistoryEntry from '../models/HistoryEntry';

import logger from '../logger';

async function daoCallHelper<T>(
  options: { api: any; errorMessage: string },
  ...args: any[]
): Promise<ServiceResponse<T>> {
  try {
    const markets = await options.api(...args);
    if (markets == null) {
      return { status: 503, result: { message: options.errorMessage } };
    }

    return { status: 200, result: markets };
  } catch (err) {
    logger.error(err);
    return { status: 500, result: { message: options.errorMessage } };
  }
}

export default {
  async getMarkets(filter?: MarketFilter): Promise<ServiceResponse<Market[]>> {
    return daoCallHelper<Market[]>(
      { api: dao.getMarkets, errorMessage: 'Failed to get markets' },
      filter,
    );
  },

  async getMarket(marketName: string): Promise<ServiceResponse<Market>> {
    return daoCallHelper<Market>(
      { api: dao.getMarket, errorMessage: 'Failed to get market' },
      marketName,
    );
  },

  async getOrderbook(marketName: string, depth?: number): Promise<ServiceResponse<Orderbook>> {
    return daoCallHelper<Orderbook>(
      { api: dao.getOrderbook, errorMessage: 'Failed to get Orderbook' },
      marketName,
      depth,
    );
  },

  async getTrades(
    marketName: string,
    startTime?: number,
    endTime?: number,
  ): Promise<ServiceResponse<Trade[]>> {
    return daoCallHelper<Trade[]>(
      { api: dao.getTrades, errorMessage: 'Failed to get Trades' },
      marketName,
      startTime,
      endTime,
    );
  },

  async getHistoricalPrices(
    marketName: string,
    resolution: number,
    startTime?: number,
    endTime?: number,
  ): Promise<ServiceResponse<HistoryEntry[]>> {
    return daoCallHelper<HistoryEntry[]>(
      { api: dao.getHistoricalPrices, errorMessage: 'Failed to get Trades' },
      marketName,
      resolution,
      startTime,
      endTime,
    );
  },
};
