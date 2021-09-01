const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var User = require("../models/userModel");
/**
 * check input is email type
 */
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

/**
 * user signup (only admin takes) 
 * (POST) http://localhost:4000/user/signup
 */
exports.userSignup = function(req,res){
    const{email, password} = req.body;
    var valid = emailRegex.test(email);
    if (!valid) {
        res.status(200).json({ status: 'error', error:  'Should enter email type'})
    }
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
                        email:user.email,
                        password:user.password
                    }
                })
            })
        })
    })
}

/**
 * user login authentication (all users) 
 * (POST) http://localhost:4000/user/login
 */
exports.userLogin = function(req,res){
    const{email,password} = req.body;
    User.findOne({
        email:email,
    }).then((user)=>{
        if(!user){
            res.status(200).json({success: false, error:"Email not registered"})
        }else{
            bcrypt.compare(password, user.password, (err,isMatch)=>{
                if(isMatch){
                    let token = jwt.sign({email:user.email},"jwt",{expiresIn: 60*60*6});
                    res.status(200).json({
                        success:true,
                        user:{
                            name:user.name,
                            email:user.email,
                        },token:token
                    })
                }else{
                    res.status(200).json({success:false, error:"Password doesn't match"})
                }
            })
        }
    })
}

User.create