import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller, Post} from '../core/interfaces/controller';
import { Repository, Add } from '../core/interfaces/repository';
import { TYPES } from '../providers/repository.provider';
import { User } from '../models/user';
import 'reflect-metadata';
import BadRequestException from '../exceptions/BadRequestException';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class RegistrationController implements Controller, Post {

    constructor(@inject(TYPES.Survey) private repository: Repository<User>) {
    }

    async post(req: Request, next: NextFunction): Promise<any> {
        if (this.repository as Add<User>){
            await (this.repository as Add<User>).Add(req.body).then((res) => {
                return res;
            }).catch((err: any) => {
                next(new BadRequestException());
            });
        } else {
            next(new NotImplementedException());
        }
    }
}
