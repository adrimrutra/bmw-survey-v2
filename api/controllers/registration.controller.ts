import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller, Post} from '../core/interfaces/controller';
import { Repository, Add } from '../core/interfaces/repository';
import { TYPES } from '../providers/repository.provider';
import { Registration } from '../dto.models/registration';
import 'reflect-metadata';
import BadRequestException from '../exceptions/BadRequestException';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class RegistrationController implements Controller, Post {

    constructor(@inject(TYPES.Registration) private repository: Repository<Registration>) {
    }

    async post(req: Request, next: NextFunction): Promise<any> {
        if (this.repository as Add<Registration>) {
            // req.checkBody('name', 'Name is required').notEmpty();
            // req.checkBody('email', 'Email is required').notEmpty();
            // req.checkBody('email', 'Please enter a valid email').isEmail();
            // req.checkBody('password', 'Password is required').notEmpty();
            // let errors = req.validationErrors();

            await (this.repository as Add<Registration>).Add(req.body).then((res) => {
                return res;
            }).catch((err: any) => {
                next(err);
            });
        } else {
            next(new NotImplementedException());
        }
    }
}
