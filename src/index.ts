import app from './App';
import { Config } from './config/config';

const config = new Config();
require('./config/db');

app.listen(config.getPort(), (err: any) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${config.getPort()}`);
});