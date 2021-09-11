const express = require('express');
const router = express.Router();
const passport = require('passport');
var userController = require("../controllers/userController");
// const { forwardAuthenticated } = require('../config/auth');
// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// router routes to different functionalities from certain controller
router.post('/signup',userController.userSignup);

// Login
// router.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/search', 
//   failureFlash: 'Wrong username or password'}), (req, res, next) => {
//   res.redirect('/search');
// });

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local-login', {
//     successRedirect: (301, '/search'),
//     failureRedirect: '/login',
//     failureFlash: true
//   } )(req, res, next);
// });

router.post('/login', passport.authenticate('local-login'), (req, res, next) => {
  if (req.user) {
      var redir = { redirect: "/search" };
      return res.json(redir);
} else {
      var redir = { redirect: '/login'};
      return res.json(redir);
}
})



// router.post('/login',userController.userLogin);


//To DO functionalities
// router.post('/login',userController.UserLogin);
// router.post('/',userController.checkUser);

// export the routes
module.exports = router;