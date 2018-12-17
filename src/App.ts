import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { buildSchema, buildSchemaSync } from "type-graphql";
const graphqlHTTP = require('express-graphql');
import ProvinceResolver from './resolvers/province.resolver';

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
    const schema: any = buildSchemaSync ({resolvers: [ProvinceResolver]});
    this.express.use ('/graphql', graphqlHTTP ({schema, graphiql: true}));
  }

  private bootstrapGraphQL() {
    try {
       return buildSchemaSync({resolvers: [ProvinceResolver]});
    } catch(err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return err;
    }
  }

  async bootstrap() {
    const schema = await buildSchema({
      resolvers: [__dirname + "/**/*.resolver.ts"],
    });
  
    // other initialization code, like creating http server
  }
}

export default new App().express;