import { NextFunction, Request, Response } from 'express';

export default class LoggerProvider {
    public static loggerMiddleware(request: Request, response: Response, next: NextFunction) {
      console.log(`${request.method} ${request.path}`);
      next();
    }
}
