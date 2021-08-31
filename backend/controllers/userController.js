const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/userModel");


/**
 * user registers a new account
 * (POST) http://localhost:4000/user/signup
 */
exports.userSignup = function(req,res){
    const{email, password} = req.body;
    User.findOne({email: email}). then((user) => {
        if(user){
            res.status(200).json({success:false,error: "Email has been registered!"})
        }
        
        if (password.length < 5) {
            res.status(200).json({ status: 'error', error:  'Password length is too small. Should be at least 6 characters'})
        }
        else{
            const newUser = new User({
                email,
                password,
            })
            encryptPsswd(res,newUser)            
        }
    })
}

/**
 * encrypt the password of a account and store information
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
                        email:user.email,
                        password:user.password
                    }
                })
            })
        })
    })
}



User.create