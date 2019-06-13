import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { Controller, Post} from '../core/interfaces/controller';
import { Authentication } from '../dto.models/authentication';
import 'reflect-metadata';
import NotImplementedException from '../exceptions/NotImplementedException';
import * as passport from 'passport';

@injectable()
 export class AuthenticationController implements Controller, Post {

    constructor() { }

    async post(req: Request, next: NextFunction): Promise<any> {
        return await passport.authenticate('local'),
            function(req: Request) {
                if(req) {
                return req;
            }
    }

    }
}
