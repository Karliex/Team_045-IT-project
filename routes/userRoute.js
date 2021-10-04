const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const usermodel = require("../models/userModel");

var userController = require("../controllers/userController");

const protect = require('../config/auth');

var User = require("../models/userModel");
const adminpassport = require('passport');
require('../config/adminpassport')(adminpassport);

// router routes to different functionalities from certain controller
router.post('/signup',userController.userSignup);


router.post('/adminsignup',userController.adminSignup);

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





router.post('/adminlogin', async (req, res, next) => {
  // passport.authenticate is provided by passport to authenticate
  // users
  // 'login' is the name of strategy that we have defined in the
  // passport.js file in the config folder
  // user and info should be passed by the 'login' strategy
  // to passport.authenticate -- see the code for the strategy
  passport.authenticate('adminlogin', async (err, user, info) => {
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
            res.cookie("SavedToken", token, {
              httpOnly: true,
            })
            return res.json({'SavedToken':token, redirect: '/adminHome'});
            
          });
      } catch (error) {
          return res.redirect('/adminlogin')
        //   return next(error);
      }
  })(req, res, next);
  
});

/**
 * Admin delete user
 */
router.route('/delete/:id').delete((req, res) => {
  console.log('--------------------------------')
  console.log(req.params.id)
  User.findByIdAndDelete(req.params.id)
  .then(res.json({success:true,
    redirect: '/adminHome'
    }))
      .catch(err => res.status(400).json('Error ' + err));
});


// const maxAge = 3 * 24 * 60 * 60;
router.get('/logout', async (req, res) => {
  res.cookie('SavedToken', '', { maxAge: 1 })
  res.redirect('/')
})

//TO DO:



router.post("/updateInfo", protect, userController.updateInfo);

router.get('/profile', protect, userController.getUserProfile);

router.get('/adminHome', userController.getAllUserProfile);

router.route('/editUser/:id').post((req, res) => {
  console.log('--------------------------------')
  console.log(req.params.id)
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

router.post('/search', async (req, res) => {
  const query = req.body.query;

  // Use regex to search for results
  const regex = new RegExp(query, "i");
  var results = await usermodel.find(
      {$and: [{$or: [
          {givenname: regex},
          {familyname: regex},
          {email: regex}
      ]}]}
  ).exec();    

  // Limit results to 10
  results = results.slice(0, 10);

  console.log("_______________________________");
  console.log(query);
  console.log("------>");
  console.log(results);
  console.log("_______________________________");
  
  // Sends results if results are found
  
  if (results != null) {
    res.status(200);
    res.json(results);
  } else {
      res.end();
  }
});

router.post('/reset-password', protect, userController.resetPsswd);

module.exports = router;