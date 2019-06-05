import * as winston from 'winston';
import * as appRoot from 'app-root-path';

import {createLogger, transports } from 'winston';
import { NextFunction, Request, Response } from 'express';



export default class LoggerProvider {
    public logger: winston.Logger;

    constructor() {

      this.logger = createLogger({
        'transports': [
        new transports.Console({
          level: 'verbose'
        }),
        new transports.File({
          level: 'error',
          filename: `${appRoot}/logs/app.log`
        })
       ]
      });
    }
    public loggerMiddleware(request: Request, response: Response, next: NextFunction) {
     // this.logger.info(`${request.method} ${request.path}`);
     // this.logger.debug(`${request.method} ${request.path}`);

      console.log(`${request.method} ${request.path}`);
      next();
    }
}

