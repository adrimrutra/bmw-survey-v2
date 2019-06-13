import { injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository, Add } from '../core/interfaces/repository';
import { Authentication} from '../dto.models/authentication';
import { User} from '../models/user';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import TokenData from '../core/interfaces/token.data';
import DataStoredInToken from '../core/interfaces/data.stored.in.token';
import {Response} from 'express';

import * as passport from 'passport';
import * as passportLocal from 'passport-local';

@injectable()
export class AuthenticationRepository implements Repository<Authentication>, Add<Authentication> {
    private user: any;


    constructor() {
        this.user = new User().getModelForClass(User);
    }
    async Add(entity: Authentication) {

      passport.use(new passportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, done) => {

        this.user.findOne({ email: email }, (err, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
          }

          user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid email or password.' });
          });

        });
      }));

     
    }

}
