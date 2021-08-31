const express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");

// router routes to different functionalities from certain controller
router.post('/signup',userController.userSignup);

//To DO functionalities
// router.post('/login',userController.UserLogin);
// router.post('/',userController.checkUser);

// export the routes
module.exports = router;