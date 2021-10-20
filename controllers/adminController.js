const bcrypt = require("bcryptjs");
var User = require("../models/userModel");
var Admin = require("../models/adminModel");

// check input is email type
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


/**
 * admin add user 
 * (POST) http://localhost:4000/user/adminsignup
 */
exports.adminSignup = function(req,res){
    const{email, password} = req.body;
    var valid = emailRegex.test(email);
    if (!valid) {
        res.status(200).json({ status: 'error', error: 'Should enter email type'})
    }
    Admin.findOne({email: email}). then((user) => {
        if(user){
            res.status(200).json({success:false,error: 'Email has been registered!'})
        }
        
        if (password.length < 5) {
            res.status(200).json({ status: 'error', error: 'Password length is too small. Should be at least 6 characters'})
        }
        else{
            const newUser = new Admin({
                email,
                password,
            })
            encryptPsswd(res,newUser)           
        }
    })
}

/**
 * encrypt the password of a account and store information in hash format
 * @param {*} res 
 * @param {*} newUser 
 */
function encryptPsswd(res,newUser) {
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
                res.json({success:true,
                    user:{
                        _id: user._id,
                        email:user.email,
                        password:user.password,
                        isAdmin: user.isAdmin,
                        pic: user.pic,
                    }, redirect: '/adminHome'
                })
               req.session.email = email;
            }).catch((err) => {
                res.redirect('/signup')
            })
        })
    })
}

// add new user (for admin)
// GET --> http://localhost:4000/user/adminHome
exports.getAllUserProfile = function(req,res){
    User.find({}, function (err, users) {
        if (err) {
            res.send('something wrong')
            next();
        }
        res.json(users)
    })
}