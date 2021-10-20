const LocalStrategy = require('passport-local').Strategy;
// for JWT password key
require('dotenv').config()    

// Load User model
const User = require('../models/userModel');

// must for using passport-jwt
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function (passport) {
    //define passport strategy called 'login' 
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    (req, email, password, done) => {
        process.nextTick(function(){
            // Match user
            User.findOne({email: email}).then(user => {
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

    // invoked during authentication process [log in]
    passport.serializeUser(function (user, done) {  
        // sucessful, provides information of authenticated user to passport  
        done(null, user.id);                            
    });
    
    // invoked on every request by passport.session()
    passport.deserializeUser(function (id, done) {    
        // find detailed user info by id
        User.findById(id, function (err, user) {
            done(err, user);                              
        });
    });

    // verification strategy called 'jwt'
    passport.use('jwt', new JwtStrategy({
        // client puts token in request header
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.PASSPORT_KEY, 
        passReqToCallback: true
    }, (req, jwt_payload, done) => { 
        User.findOne({'_id':jwt_payload.body._id}, (err, user) => {
            if(err){
                return done(err, false);
            }
            // if we found user, provide the user instance to passport    
            if(user){
                return done(null, user);
            } else { 
                return done(null, false);
            }
        });
    }));
};

