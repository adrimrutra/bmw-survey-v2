import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Router } from './core/router';
import errorMiddleware from './middleware/error.middleware';
import LoggerProvider from './middleware/logger.provider';


import * as winston from 'winston';




const port = process.env.PORT || '4000';

class App {
    public app: express.Application;
    public router = new Router();
    public loggerProvider = new LoggerProvider();



    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());

        this.app.use(function(req, res, next) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-access-token, Content-Type, Accept');
          next();
        });

       // this.app.use(LoggerProvider.loggerMiddleware);


        // Log a message
        // this.loggerMiddleware.logger.log({
        //   message: 'Hello, Winston!',
        //   level: 'info'
        // });
        // Log a message
        //this.loggerMiddleware.logger.info('Hello, Winston!');
        //this.loggerMiddleware.logger.error('Hello, Winston!');

        this.app.use(this.loggerProvider.loggerMiddleware);

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
          console.log('App listening on the port ' + port);
          //this.winstonLogger.logger.info('App listening on the port ' + port);
        });
    }
}

export default App;
