import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller } from '../core/interfaces/controller';
import { TYPES } from '../commons/typse';
import 'reflect-metadata';

import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import NotFoundException from '../exceptions/NotFoundException';
import NotImplementedException from '../exceptions/NotImplementedException';
import * as jwt from 'jsonwebtoken';


@injectable()
 export class AuthenticationController implements Controller {
    private APP_SECRET: string;
    private passport: any;
    constructor(@inject(TYPES.Passport) passport: any) {
        this.passport = passport;
  //  this.APP_SECRET = process.env.APP_SECRET;
  //  if (!this.APP_SECRET) {
        this.APP_SECRET = 'DEF_SECRET';
   // }
   }

    async get(req: Request, res: Response, next: NextFunction) {
        await req.logout();
    }

//     async post(req: Request, next: NextFunction): Promise<any> {
//         this.passport.authenticate('local-login', {session: true},
//         async(err: any, user: any, info: any) => {
//             if (err) {
//                 return next(new InternalServerErrorException(err)); // will generate a 500 error
//             }
//             // Generate a JSON response reflecting signup
//             if (!user) {
//                 return next(new NotFoundException());
//             }

//             req.login(user, {session: true}, (err2: any) => {
//                 if (err2) {
//                     next(new InternalServerErrorException(err2));
//                 }
//                 return user;
//             });
//         })(req);
//    }



    post(req: Request, res: Response, next: NextFunction): any {
        this.passport.authenticate('local-login', {session: false},
        (err: any, user: any) => {
            if (err) {
                return next(new InternalServerErrorException(err));  // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return next(new NotFoundException());
            }
            const token = jwt.sign(user.toJSON(),
                String('DEF_SECRET'),
                { expiresIn: '1h' },
                );
                return token;
        })(req, res);
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

    // private getToken(user: any) {
    //     const expiresIn = 86400;

    //     const key = jwt.sign(user.toJSON(), this.APP_SECRET, {
    //         expiresIn: expiresIn // expires in 24 hours
    //     });
    //     const d = new Date();
    //     d.setSeconds(d.getSeconds() + expiresIn);
    //     const token = {
    //         access_token: key,
    //         token_type: 'bearer',
    //         expires_in: d,
    //         userid: id
    //     };
    //     return token;
    // }


}
