import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { User } from '../models/user';


const LocalStrategy = passportLocal.Strategy;
const _user = new User().getModelForClass(User);


passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  _user.findById(id, (err, user) => {
    done(err, user);
  });
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

  _user.findOne({ email: email.toLowerCase() }, (err, user: any) => {
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




function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}



module.exports = authenticationMiddleware;

