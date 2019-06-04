import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Router } from './core/router';
import errorMiddleware from './middleware/error.middleware';
import LoggerProvider from './providers/logger.provider';
import * as morgan from 'morgan';
import WinstonLogger from './config/winston.logger';
import * as winston from 'winston';
import { levels } from 'logform';

const port = process.env.PORT || '4000';

class App {
    public app: express.Application;
    public router = new Router();
  //  public winstonLogger = new WinstonLogger();



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
         const logger = winston.createLogger({
          format: winston.format.json(),
          defaultMeta: { service: 'user-service' },
          transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log',  }),
            new winston.transports.Console({ level: 'info'})
          ]
        });

        // logger.info('hello logger');

       // this.app.use(LoggerProvider.loggerMiddleware);
       // this.app.use(morgan('combined'));
       // this.app.use(morgan('combined', { stream: this.winstonLogger.logger.stream }));
        this.app.use(morgan('combined', { stream: logger }));
        this.app.use('/api', this.router.route());

        logger.info('combined');

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
        });
    }
}

export default App;
