import * as winston from 'winston';
import * as appRoot from 'app-root-path';
import { createLogger, transports, format } from 'winston';




// export default function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
//       const logger = createLogger({
//          'transports': [
//          new transports.Console({
//            level: 'verbose'
//          }),
//          new transports.File({
//            level: 'error',
//            filename: `${appRoot}/logs/app.log`
//          })
//        ]
//        });
//        logger.info(`${request.method} ${request.path}`);
//        logger.debug(`${request.method} ${request.path}`);
//        logger.error(`${request.method} ${request.path}`);

//        next();
// }


export class LoggerProvider {
  public static logger = createLogger({
    'transports': [
      new transports.Console({
        level: 'verbose',
        format: format.combine(format.colorize(), format.simple(), format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}))
      }),
      new transports.File({ level: 'error', filename: `${appRoot}/logs/app.log`})
    ]
  });
}

