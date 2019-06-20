import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller, Post} from '../core/interfaces/controller';
import { Authentication } from '../dto.models/authentication';
import 'reflect-metadata';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class AuthenticationController implements Controller, Post {
    private _passport: any;
    constructor(@inject('any') passport: any) {
        this._passport = passport;
    }

    async post(req: Request, next: NextFunction): Promise<any> {

        this._passport.authenticate('local-login', {session: true}, (err: any, user: any, info: any) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return next('login failed');
            }

            req.login(user, {session: true}, (err2: any) => {
                if (err2) {
                    next(err2);
                }
                return user;
            });
        })(req);

    }
}
