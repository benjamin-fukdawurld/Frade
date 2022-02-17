import { Router } from 'express';

import controller from '../controllers/MarketsController';

const router = Router();

router.get('/', controller.getMarkets.bind(controller));
router.get('/:marketName', controller.getMarket.bind(controller));
router.get('/:marketName/orderbook', controller.getOrderbook.bind(controller));
router.get('/:marketName/trades', controller.getTrades.bind(controller));
router.get('/:marketName/history', controller.getHistoricalPrices.bind(controller));

export default router;
