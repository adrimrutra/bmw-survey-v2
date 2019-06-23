import { Request, Response, NextFunction } from 'express';

export interface Controller {
    get(req: Request, res: Response, next: NextFunction);
    getById(id: any, req: Request, res: Response, next: NextFunction);
    post(req: Request, res: Response, next: NextFunction);
    put(id: any, req: Request, res: Response, next: NextFunction);
    delete(id: any, req: Request, res: Response, next: NextFunction);
}
