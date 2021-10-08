const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()    // for JWT password key
const Admin = require('../models/adminModel')

// must for using passport-jwt
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function (passport) {
    //define passport strategy called 'adminlogin' 
    passport.use('adminlogin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    (req, email, password, done) => {
        console.log("login strategy works!")
        process.nextTick(function(){
          // Match user
            Admin.findOne({email: email}).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                const validate = user.isValidPassword(password);

                // Match password
                if (validate) {
                    return done(null, user);
                } else {
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
     
    Admin.findById(id, function (err, user) {
      done(err, user);                              // find detailed user info by id
    });
  });

    // setup a strategy called 'jwt' verify that the token is valid. 
    passport.use('jwt', new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // clien puts token in request header
      secretOrKey   : process.env.PASSPORT_KEY, 
      passReqToCallback: true
  }, (req, jwt_payload, done) => { // decrypted token in jwt_payload variable

      // search for a user with the id that was added to the token. 
      Admin.findOne({'_id':jwt_payload.body._id}, (err, user) => {
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

