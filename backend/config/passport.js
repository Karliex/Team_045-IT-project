const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
  passport.use('local',
    new LocalStrategy({ usernameField: 'email', passwordField:'password', passReqToCallback:true
    }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            req.session.email = email;
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
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
