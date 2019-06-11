import { injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository, Add } from '../core/interfaces/repository';
import { User} from '../models/user';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import TokenData from '../core/interfaces/token.data';
import DataStoredInToken from '../core/interfaces/data.stored.in.token';
import {Response} from 'express';



@injectable()
export class UserRepository implements Repository<User>, Add<User> {
    private user: any;
    constructor() {
        this.user = new User().getModelForClass(User);
    }
    async Add(entity: User) {

        if (await this.user.findOne({ email: entity.email })) {
            throw new UserAlreadyExistsException(entity.email.toString());
        }

        const _user = await this.user({
          name: entity.name,
          email: entity.email,
          password: entity.password
        });

        await this.createUser(_user, function(err, user) {
            if ( err ) {
              throw new UserAlreadyExistsException(err);
            } else {
              return user;
            }
        });

    }

    private createUser (newUser, callback) {

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
      });

    }





    public createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    // private createToken(user: User): TokenData {
    //     // const expiresIn = 60 * 60; // an hour
    //     // const secret = process.env.JWT_SECRET;
    //     // // const dataStoredInToken: DataStoredInToken = {
          
    //     // // };
    //     // return {
    //     //   expiresIn,
    //     //   token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    //     // };
    //   }
}
