import { injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository, Add } from '../core/interfaces/repository';
import { AuthenticationDto} from '../dto.models/authentication.dto';
import { User} from '../models/user';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import TokenData from '../core/interfaces/token.data';
import DataStoredInToken from '../core/interfaces/data.stored.in.token';
import {Response} from 'express';

import * as passport from 'passport';
import * as passportLocal from 'passport-local';




@injectable()
export class AuthenticationRepository implements Repository<AuthenticationDto>, Add<AuthenticationDto> {
    private user: any;
    private LocalStrategy = passportLocal.Strategy;

    constructor() {
        this.user = new User().getModelForClass(User);
    }
    async Add(entity: AuthenticationDto) {

      passport.use(new this.LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

        this.user.findOne({ email: entity.email.toLowerCase() }, (err, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(undefined, false, { message: `Email ${entity.email} not found.` });
          }

          user.comparePassword(entity.password, (err: Error, isMatch: boolean) => {
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
