const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/User')


const clientId = config.get('googleClientId')
const clientSecret = config.get('googleClientIdSecret')

module.exports = function (passport) {
    // passport.use(new GoogleStrategy({
    //     callbackURL: '/auth/google/redirect',
    //     clientID : clientId,
    //     clientSecret : clientSecret
    //   },
    //    async (accessToken, refreshToken, profile, done) =>{
    //       const newUser = {
    //         name: profile.displayName,
    //         googleId: profile.id,
    //         email: profile.emails[0].value,
    //         avatar: profile.photos[0].value,
    //       }
    //       try {
    //         let user = await User.findOne({ googleId: profile.id });

    //         if (user) {
    //           console.log('user exist', user)
    //           done(null, user)
    //         } else {
    //           user = await User.create(newUser);
    //           console.log('newuser', user)
    //           done(null, user)
    //         }
    //       } catch (err) {
    //         console.error(err)
    //       }

    //     })
    // )
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // { usernameField: "email" } = this is required if you using email instead of username
            const user = User.findOne({ email: email}, (err, user) => {
              if(err) throw err
              if (!user) {
                return done(null, false, { message: 'That email is not registered' });
              }
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch === true) {
                  return done(null, user);
                } else {
                return done(null, false, { message: 'Password incorrect' });
                }
              });
            })
        })
    );
    
    //stores cookie in browser
    passport.serializeUser((user, cb) => {
      console.log('serilize',user.id)
      cb(null, user.id)
    })
      //take the id in cookie and search in databse
    passport.deserializeUser((id, cb) => {
      User.findOne({_id: id}, (err, user) => {
        cb(err, user);
      })
  });
}