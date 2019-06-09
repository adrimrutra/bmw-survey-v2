import { Request, NextFunction } from 'express';

export class Controller {}

export interface Get {
    get(req: Request, next: NextFunction): Promise<any>;
}
export interface GetById {
    getById(id: any, req: Request, next: NextFunction): Promise<any>;
}
export interface Post {
    post(req: Request, next: NextFunction): Promise<any>;
}
export interface Put {
    put(id: any, req: Request, next: NextFunction): Promise<any>;
}
export interface Delete {
    delete(id: any, req: Request, next: NextFunction): Promise<any>;
}
