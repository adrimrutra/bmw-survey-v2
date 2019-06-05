import * as appRoot from 'app-root-path';
import { createLogger, transports } from 'winston';
import { NextFunction, Request, Response } from 'express';



export default function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
      const logger = createLogger({
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
       logger.info(`${request.method} ${request.path}`);
       logger.debug(`${request.method} ${request.path}`);
       logger.error(`${request.method} ${request.path}`);

       next();
     }

