import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import markets from './routes/markets';

export function createApp(props: any) {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());

  app.use('/markets', markets);

  return app;
}
