import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { Routes } from './routes/routes';

class App {
  public express: express.Application;
  public routePrv: Routes = new Routes();

  constructor () {
    this.express = express();
    this.config();
    this.routePrv.routes(this.express);
  }

  private config(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
    this.express.use(cors());
  }
}

export default new App().express;