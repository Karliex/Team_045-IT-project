const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

require('dotenv').config()    // for JWT password key

// Load User model
const User = require('../models/UserModel');

// the following is required if you wanted to use passport-jwt
// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function (passport) {
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, email, password, done) => {
    console.log("login strategy works!")
      process.nextTick(function(){
         // Match user
         User.findOne({email: email}).then(user => {
         if (!user) {
             // res.status(200).json({success: false, error:"Email not registered"})
             return done(null, false, { message: 'That email is not registered' });
         }

         const validate = user.isValidPassword(password);

         // Match password
          if (validate) {
              return done(null, user);
          } else {
              // res.status(200).json({success:false, error:"Password doesn't match"})
              return done(null, false, { message: 'Password incorrect' });
          }

     });
 })
 })
);



  passport.serializeUser(function (user, done) {    // invoked during authentication process [log in]
    console.log("serializing [log in]")
    done(null, user.id);                            // sucessful, provides information of authenticated user to passport
  });

  passport.deserializeUser(function (id, done) {    // invoked on every request by passport.session()
    console.log("deserializing [send request]")
    
    User.findById(id, function (err, user) {
      done(err, user);                              // find detailed user info by id
    });
  });

    // depending on what data you store in your token, setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    passport.use('jwt', new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // clien puts token in request header
      secretOrKey   : process.env.PASSPORT_KEY, // the key that was used to sign the token
      passReqToCallback: true
  }, (req, jwt_payload, done) => { // passport will but the decrypted token in jwt_payload variable
      console.log("hello?")
      // here I'm simply searching for a user with the email addr
      // that was added to the token. _id was added to the token
      // body that was signed earlier in the userRouter.js file
      // when logging in the user
      console.log(jwt_payload._id)
      User.findOne({'_id':jwt_payload.body._id}, (err, user) => {
          if(err){
              return done(err, false);
          }
          // if we found user, provide the user instance to passport    
          if(user){
              return done(null, user);
          } else { // otherwise assign false to indicate that authentication failed
              return done(null, false);
          }
      });
  }));
};

