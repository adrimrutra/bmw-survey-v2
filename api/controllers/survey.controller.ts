import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller, Get, Post} from '../core/interfaces/controller';
import { Repository, GetAll, Add } from '../core/interfaces/repository';
import { TYPES } from '../providers/repository.provider';
import { Survey } from '../models/survey';
import 'reflect-metadata';
import BadRequestException from '../exceptions/BadRequestException';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class SurveyController implements Controller, Get, Post {

    constructor(@inject(TYPES.Survey) private repository: Repository<Survey>) {
    }

    async get(req: Request, next: NextFunction) {
        if (this.repository as GetAll<Survey>) {
            return await (this.repository as GetAll<Survey>).GetAll();
        } else {
            next(new NotImplementedException());
        }
    }
    async post(req: Request, next: NextFunction): Promise<any> {
        if (this.repository as Add<Survey>){
            await (this.repository as Add<Survey>).Add(req.body).then((res) => {
                return res;
            }).catch((err: any) => {
                next(new BadRequestException());
            });
        } else {
            next(new NotImplementedException());
        }
    }
}
