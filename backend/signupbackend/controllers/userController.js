const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ObjectID = require('mongodb').ObjectID;


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
                    }, redirect: '/login'
                })
                // res.redirect('/login');
            }).catch((err) => {
                res.redirect('/signup')
            }
            )
        })
    })
}



//    const { name, github, twitter, facebook } = req.body;
//    const _id = ObjectID(req.session.passport.user);
 
//    users.updateOne({ _id }, { $set: { name, github, twitter, facebook } }, (err) => {
//      if (err) {
//        throw err;
//      }
     
//      res.redirect('/users');

//Edit user profile info (POST)
//http://localhost:4000/updateInfo (可加具体人，待研究)
exports.updatePersonal = function(req,res){


    bcryptjs.genSalt(16,(err,salt) =>{
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.findOneAndUpdate({email:req.body.email},{
                givenName : req.body.givenName,
                familyName : req.body.familyName,     //需要修改：会更新的参数
                email:req.body.email,
                password: hash   //可以用作修改密码的功能，这里不需要用到
            },
            {new: true},
            function(err, updateUser){
                if(err){
                    res.status(200).json({success:false,message: "Email doesn't exist"})
                }else{
                    res.status(200).json({success:true,updateUser:updateUser})
                }
            })
        })
    })
}

// router.get('/:username', (req, res, next) => {
//     const users = req.app.locals.users;
//     const username = req.params.username;
  
//     users.findOne({ username }, (err, results) => {..}


//View one spefic user's public profile (GET)
//http://localhost:4000/:id
 exports.getUserProfile = function(req,res){
    Snack.findById(req.params.id,function(err,snack){    //id不确定对不对
        if(err){
            res.status(400).json({success:false,err:err})
        }else{
            res.status(200).json({success:true,snack:snack})
        }
    })
}

//Edit user profile info
exports.updatePsswd = function(req,res){
    bcryptjs.genSalt(16,(err,salt) =>{
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.findOneAndUpdate({email:req.body.email},{       //修改密码时需要输入email和新的password
                email:req.body.email,
                password: hash   //可以用作修改密码的功能，这里不需要用到
            },
            {new: true},
            function(err, updateUser){
                if(err){
                    res.status(200).json({success:false,message: "Email doesn't exist"})
                }else{
                    res.status(200).json({success:true,updateUser:updateUser})
                }
            })
        })
    })
}

User.create