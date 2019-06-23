import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller } from '../core/interfaces/controller';
import { TYPES } from '../commons/typse';
import 'reflect-metadata';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class RegistrationController implements Controller {
    private passport: any;
    constructor( @inject(TYPES.Passport) passport: any) {
        this.passport = passport;
    }

    post(req: Request, res: Response, next: NextFunction) {
        this.passport.authenticate('local-signup', (err: any, user: any, info: any) => {
            if (err) {
                return next(new InternalServerErrorException(err)); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return next(new UserAlreadyExistsException(user.email));
            }
            return res;
        })(req, res);
    }

    get(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
    getById(id: any, req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
    put(id: any, req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
    delete(id: any, req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
}
