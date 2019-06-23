import { UserModel } from '../models/user';
import * as bcrypt from 'bcrypt';
const LocalStrategy = require('passport-local').Strategy;
import * as passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport: any) => {

  /**
   * PASSPORT SESSION SETUP
   * required for persistent login sessions
   * passport needs ability to serialize and unserialize users out of session
   **/
    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: any, done: any) => {
        UserModel.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });

  /**
   * LOCAL SIGNUP
   * we are using named strategies since we have one for login and one for signup
   * by default, if there was no name, it would just be called 'local'
   **/
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req: any, email: any, password: any, done: any) => {
            process.nextTick(() => {
                     UserModel.findOne({'email': email},
                        async(err: any, user: any) => {
                            if (err) {
                                return done(err);
                            }
                            if (user) {
                                return done(null, false, null);
                            } else {
                                const newUser = new UserModel();
                                newUser.email = email;
                                newUser.password = await bcrypt.hash(password, 8);
                                newUser.save((err2: any) => {
                                if (err2) {
                                    throw err2;
                                }
                                    return done(null, newUser);
                            });
                        }
                    }
                );
            }
        );
    }));

  /**
   * LOCAL LOGIN
   * we are using named strategies since we have one for login and one for signup
   * by default, if there was no name, it would just be called 'local'
   * */
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req: any, email: any, password: any, done: any) => { // callback with email and password from our form
            await UserModel.findOne({'email': email},
             async (err: any, user: any) => {
                    if (err) {
                        return await done(err);
                    }

                    if (!user) {
                        return await done(null, false, null);
                    }

                    if (! bcrypt.compareSync(password, user.password)) {
                        return await done(null, false, null);
                    }

                    return await done(null, user);
                }
            );
    }));

    /**
     * JWT STRATEGY
     * to verify the validity of json web token
     * */
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: String('DEF_SECRET'),
    },
        (jwtPayload: any, done: any, req: any) => {
            UserModel.findOne({id: jwtPayload.sub}, (err: any, user: any) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        },
    ));
};

