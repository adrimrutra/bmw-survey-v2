import { Request, Response, NextFunction } from 'express';
import { inject, injectable, Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { Controller } from '../core/interfaces/controller';
import { TYPES } from '../commons/typse';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class RegistrationController implements Controller {
    private passport: any;
    private aaa: any;
    
    // constructor(@inject(TYPES.Passport) passport: any) {
    //     this.passport = passport;
    // }

    constructor(@inject('aaa') aaa: string) {
        this.aaa = aaa;
    }

    post(req: Request, res: Response, next: NextFunction) {
        
        console.log(this.aaa);
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
