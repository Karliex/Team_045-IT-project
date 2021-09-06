
const express = require('express');
const passport = require('../../config/passport');
const router = express.Router();

var userController = require("../controllers/userController");

// router routes to different functionalities from certain controller
router.post('/signup',userController.userSignup);
// router.post('/login',userController.userLogin);
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        succcessRedirect: '/search',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
});


//To DO functionalities
// router.post('/login',userController.UserLogin);
// router.post('/',userController.checkUser);

// export the routes
module.exports = router;