const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminpassport = require('passport');
require('../config/adminPassports')(adminpassport);
require('../config/passport')(passport);

const jwt = require('jsonwebtoken');
const usermodel = require("../models/userModel");
const uploadMulter = require('../config/upload.js');
const validation = require('../config/validation.js');

var userController = require("../controllers/userController");
var adminController = require("../controllers/adminController");

const protect = require('../config/auth');
const adminProtect = require('../config/adminAuth');

var User = require("../models/userModel");

// add new user (for admin)
router.post('/userSignup', adminProtect, userController.userSignup);

// standard user login -- we are using JWT
// POST --> http://localhost:4000/user/login
router.post('/login', async (req, res, next) => {
    // authenticate based on strategy called 'login'
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err ||!user){
                const error = new Error('An Error occurred')
                return next(error);
            }
              
            // If no error, use the req.login to store the user details in the session
            // session: false: asking the client to give us the token with each request
            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error)
                const body = { _id : user._id};

                //Sign the JWT token and populate the payload with the user id 
                const token = jwt.sign({ body }, process.env.PASSPORT_KEY, { expiresIn: "1h" });
                
                res.cookie("token", token, {
                    httpOnly: true,
                })
                return res.json({'token':token, redirect: '/search'});
            });
        } catch (error) {return res.redirect('/login')}
    })(req, res, next);
});

// update Info (for standard user)
router.post("/updateInfo", protect, userController.updateInfo);

// get specific user's profile (after standard user search)
router.get('/profile', protect, userController.getUserProfile);

// search (for standard user)
router.post('/search', async (req, res) => {
    const query = req.body.query;

    // Use regex to search for results
    const regex = new RegExp(query, "i");
    var results = await usermodel.find(
        {$and: [{$or: [
            {givenname: regex},
            {familyname: regex},
            {email: regex},
            {valueStream: regex},
            {role: regex},
            {scrumTeam: regex}
        ]}]}
    ).exec();    

    // Limit results to 10
    results = results.slice(0, 10);
    
    // Sends results if results are found
    if (results != null) {
        res.status(200);
        res.json(results);
    } else {
        res.end();
    }
});

// reset password (for standard user)
router.post('/reset-password', protect, userController.resetPsswd);

// upload profile image from local (for standard user)
router.post('/uploadImage', protect, uploadMulter, validation, userController.uploadImage)

// add new admin (for admin)
router.post('/adminSignup', adminProtect, adminController.adminSignup);

// add new user (for admin)
router.get('/adminHome', adminProtect, adminController.getAllUserProfile);

// admin login -- we are using JWT
// POST --> http://localhost:4000/user/adminLogin
router.post('/adminLogin', async (req, res, next) => {
    // authenticate based on strategy called 'login'
    passport.authenticate('adminlogin', async (err, user, info) => {
        try {
            if(err ||!user){
                const error = new Error('An Error occurred')
                return next(error);
            }
        
            // If no error, use the req.login to store the user details in the session
            // session: false: asking the admin to give us the token with each request
            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error)

                // We don't want to store sensitive information such as the
                // user password in the token so we pick only the user's email 
                const body = { _id : user._id};

                //Sign the JWT token and populate the payload with the user email 
                var token = jwt.sign({ body }, process.env.PASSPORT_KEY, { expiresIn: "1h" });
                res.cookie("token", token, {
                    httpOnly: true,
                })
                return res.json({'token':token, redirect: '/adminHome'});
            
            });
        } catch (error) {
            return res.redirect('/adminlogin')
        }
    })(req, res, next);
});


// admin delete user
// DELETE --> http://localhost:4000/user/delete/:id
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id).then(
        res.json({success:true,
        redirect: '/adminHome'
    }))
    .catch(err => res.status(400).json('Error ' + err));
});
router.get('/logout', async (req, res) => {
    res.cookie('SavedToken', '', { maxAge: 1 })
    res.redirect('/')
})

// update specific user's Info (for admin)
// POST --> http://localhost:4000/user/editUser/:id
router.route('/editUser/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.givenname = req.body.givenname;
        user.familyname = req.body.familyname;    
        user.valueStream = req.body.valueStream;
        user.scrumTeam = req.body.scrumTeam;
        user.role = req.body.role;
        user.technicalLead = req.body.technicalLead;
        user.productOwner = req.body.productOwner;

        user.save()
        .then(res.json({success:true,
            user:{
                givenname: user.givenname,
                familyname: user.familyname,
                valueStream: user.valueStream,
                scrumTeam: user.scrumTeam,
                role: user.role,
                technicalLead: user.technicalLead,
                productOwner: user.productOwner,
            }, redirect: '/adminHome'
        }))
        .catch(err =>res.status(400).json('Error: ' + err));
    })
})

module.exports = router;

