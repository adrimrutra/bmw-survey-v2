import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Router } from './core/router';
import errorMiddleware from './middleware/error.middleware';
import { LoggerProvider } from './providers/logger.provider';



import * as winston from 'winston';




const port = process.env.PORT || '4000';

class App {
    public app: express.Application;
    public router = new Router();

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        this.app.use((req, res, next) => {
          LoggerProvider.logger.info(`${req.method} ${req.path}`);
          LoggerProvider.logger.error(`${req.method} ${req.path}`);
          LoggerProvider.logger.warn(`${req.method} ${req.path}`);
          LoggerProvider.logger.verbose(`${req.method} ${req.path}`);
          LoggerProvider.logger.silly(`${req.method} ${req.path}`);
          next();
        });
        this.app.use(bodyParser.json());

        this.app.use((req, res, next) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-access-token, Content-Type, Accept');
          next();
        });

       // this.app.use(LoggerProvider.loggerMiddleware);

        this.app.use('/api', this.router.route());

    }

    private initializeErrorHandling() {
      this.app.use(errorMiddleware);
    }

    public getServer() {
        return this.app;
      }


    public listen() {
        this.app.listen(port, () => {
          LoggerProvider.logger.info('App listening on the port ' + port);
         // console.log('App listening on the port ' + port);
        });
    }
}

export default App;
