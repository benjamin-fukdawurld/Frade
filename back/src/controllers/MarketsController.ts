import { Request, Response } from 'express';
import service from '../services/MarketService';

import { MarketType } from '../models/Market';
import logger from '../logger';

export class MarketsController {
  public async getMarkets(req: Request, res: Response) {
    const { type } = req.query;
    let t: MarketType | undefined;
    if (typeof type === 'string') {
      switch (type) {
        case 'spot':
          t = 'spot';
          break;

        case 'future':
          t = 'future';
          break;

        default:
          res.status(400).send({ message: 'Unsupported Market type' });
          return;
      }
    }

    const serviceResponse = await service.getMarkets({ type: t });
    res.status(serviceResponse.status).send(serviceResponse.result);
  }

  public async getMarket(req: Request, res: Response) {
    let { marketName } = req.params;
    marketName = marketName.replace('_', '/');
    const serviceResponse = await service.getMarket(marketName);
    res.status(serviceResponse.status).send(serviceResponse.result);
  }

  public async getOrderbook(req: Request, res: Response) {
    const { marketName } = req.params;
    const { depth } = req.query;
    const d = depth ? (typeof depth === 'string' ? parseInt(depth) : undefined) : undefined;
    const serviceResponse = await service.getOrderbook(marketName, d);
    res.status(serviceResponse.status).send(serviceResponse.result);
  }

  public async getTrades(req: Request, res: Response) {
    const { marketName } = req.params;
    const { startTime, endTime } = req.query;
    const start = startTime
      ? typeof startTime === 'string'
        ? parseInt(startTime)
        : undefined
      : undefined;
    const end = endTime ? (typeof endTime === 'string' ? parseInt(endTime) : undefined) : undefined;
    const serviceResponse = await service.getTrades(marketName, start, end);
    res.status(serviceResponse.status).send(serviceResponse.result);
  }

  public async getHistoricalPrices(req: Request, res: Response) {
    const { marketName } = req.params;
    const { resolution, startTime, endTime } = req.query;
    const start = startTime
      ? typeof startTime === 'string'
        ? parseInt(startTime)
        : undefined
      : undefined;
    const end = endTime ? (typeof endTime === 'string' ? parseInt(endTime) : undefined) : undefined;
    const serviceResponse = await service.getHistoricalPrices(
      marketName,
      resolution ? (typeof resolution === 'string' ? parseInt(resolution) : 300) : 300,
      start,
      end,
    );
    res.status(serviceResponse.status).send(serviceResponse.result);
  }
}

const markets = new MarketsController();
export default markets;
