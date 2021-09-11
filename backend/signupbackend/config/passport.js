const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config()    // for JWT password key
const jwt = require("jsonwebtoken");

// Load User model
const User = require('../models/userModel');

module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy({
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback: true
     }, (req, email, password, done) => {
         process.nextTick(function(){
            // Match user
            User.findOne({email: email}).then(user => {
            if (!user) {
                // res.status(200).json({success: false, error:"Email not registered"})
                return done(null, false, { message: 'That email is not registered' });
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    let token = jwt.sign({email:user.email},"jwt",{
                        expiresIn: 60*60*6
                    }); 
                    return done(null, user);
                } else {
                    // res.status(200).json({success:false, error:"Password doesn't match"})
                    return done(null, false, { message: 'Password incorrect' });
                }
            });
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
};
