const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
var userController = require("../controllers/userController");

require('../config/passport')(passport);
const protect = require('../config/auth');


// router routes to different functionalities from certain controller
router.post('/signup',userController.userSignup);

// router.post('/login', passport.authenticate('local-login'), (req, res, next) => {
//   if (req.user) {
//       var redir = { redirect: "/search" };
//       return res.json(redir);
// } else {
//       var redir = { redirect: '/login'};
//       return res.json(redir);
// }
// })

// POST login -- we are using JWT
// POST --> http://localhost:5000/user/login
router.post('/login', async (req, res, next) => {
      // passport.authenticate is provided by passport to authenticate
      // users
      // 'login' is the name of strategy that we have defined in the
      // passport.js file in the config folder
      // user and info should be passed by the 'login' strategy
      // to passport.authenticate -- see the code for the strategy
      passport.authenticate('login', async (err, user, info) => {
          try {
              // if there were errors during executing the strategy
              // or the user was not found, we display and error
              if(err ||!user){
                  const error = new Error('An Error occurred')
                  return next(error);
              }
              
              
              // otherwise, we use the req.login to store the user details
              // in the session. By setting session to false, we are essentially
              // asking the client to give us the token with each request
              req.login(user, { session : false }, async (error) => {
                  
                  if( error ) return next(error)
  
                  // We don't want to store sensitive information such as the
                  // user password in the token so we pick only the user's email 
                  const body = { _id : user._id};
  
                  //Sign the JWT token and populate the payload with the user email 
                  const token = jwt.sign({ body }, process.env.PASSPORT_KEY, { expiresIn: "1h" });
                  // const token = "Bearer " + signedToken;

                  //Send back the token to the client
                //   res.status(200).json({
                //         _id: user._id,
                //         name: user.name,
                //         email: user.email,
                //         isAdmin: user.isAdmin,
                //         pic: user.pic,
                //         token: token,
                //       });

                  // send the token 
                //   res.cookie('token',token, { httpOnly: true, sameSite: false, secure: true, domain:"http://localhost:4000"});
                // localStorage.setItem('token',token)  
                res.cookie("token", token, {
                  httpOnly: true,
                })
                return res.json({'token':token, redirect: '/search'});
                
              });
          } catch (error) {
              return res.redirect('/login')
            //   return next(error);
          }
      })(req, res, next);
      
  });

router.post('/logout', function(req, res) {
    // save the favourites
    foodController.saveFavourites(req,res,req.body.favs)
    req.logout();
    req.flash('');
    res.redirect('/user/');
});


//TO DO:


router.get('/test', protect, (req, res) => {res.status(200).json({
                  success: true,
                  error: "Email has been registered!"
            })})

router.post("/updateInfo", protect, userController.updateInfo);



// router.post('/:id',userController.getUserProfile);

// export the routes
module.exports = router;