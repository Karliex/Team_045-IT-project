const express = require('express');
const router = express.Router();
const passport = require('passport');
var userController = require("../controllers/userController");
const { ensureAuthenticated } = require('../config/auth');

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// router routes to different functionalities from certain controller
router.post('/signup',userController.userSignup);

router.post('/login', passport.authenticate('local-login'), (req, res, next) => {
  if (req.user) {
      var redir = { redirect: "/search" };
      return res.json(redir);
} else {
      var redir = { redirect: '/login'};
      return res.json(redir);
}
})


//TO DO:
router.post('/updateInfo',userController.updatePersonal);

router.post('/:id',userController.getUserProfile);


// export the routes
module.exports = router;