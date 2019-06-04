import { Request } from 'express';

export interface IController {
    get(req: Request): Promise<any>;
    post(req: Request): Promise<any>;
    put(id: any, req: Request): Promise<any>;
    delete(id: any, req: Request): Promise<any>;
}
