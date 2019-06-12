import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller, Post} from '../core/interfaces/controller';
import { Repository, Add } from '../core/interfaces/repository';
import { TYPES } from '../providers/repository.provider';
import { AuthenticationDto } from '../dto.models/authentication.dto';
import 'reflect-metadata';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class AuthenticationController implements Controller, Post {

    constructor(@inject(TYPES.AuthenticationDto) private repository: Repository<AuthenticationDto>) {
    }

    async post(req: Request, next: NextFunction): Promise<any> {
        if (this.repository as Add<AuthenticationDto>) {
            await (this.repository as Add<AuthenticationDto>).Add(req.body).then((res) => {
                return res;
            }).catch((err: any) => {
                next(err);
            });
        } else {
            next(new NotImplementedException());
        }
    }
}
