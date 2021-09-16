const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler") ;


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
                        _id: user._id,
                        email:user.email,
                        password:user.password,
                        isAdmin: user.isAdmin,
                        pic: user.pic,
                    }, redirect: '/login'
                })
               req.session.email = email;
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
//http://localhost:4000/user/updateInfo (可加具体人，待研究)
exports.updatePersonal = function(req,res){
    bcrypt.genSalt(16,(err,salt) =>{
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.findOneAndUpdate({email:req.body.email},{
                givenname : req.body.givenname,
                familyname : req.body.familyname,     //需要修改：会更新的参数
                phoneNumber: req.body.phoneNumber,
                valueStream: req.body.valueStream,
                scrumTeam: req.body.scrumTeam,
                role: req.body.role,
                technicalLead: req.body.technicalLead,
                productOwner: req.body.productOwner,
                notes: req.body.productOwner,
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


// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
exports.updateInfo = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user) {
        user.givenname = req.body.givenname || user.givenname,
        user.familyname = req.body.familyname || user.familyname,     //需要修改：会更新的参数
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber,
        user.valueStream = req.body.valueStream || user.valueStream,
        user.scrumTeam = req.body.scrumTeam || user.scrumTeam,
        user.role = req.body.role || user.role,
        user.technicalLead = req.body.technicalLead || user.technicalLead,
        user.productOwner = req.body.productOwner || user.productOwner,
        user.notes = req.body.productOwner || user.notes
        // if (req.body.password) {
        //     user.password = req.body.password;
        // }
  
        const updatedUser = await user.save();
  
        res.json({
            _id: updatedUser._id,
            givenname : updatedUser.givenname,
            familyname : updatedUser.familyname,     //需要修改：会更新的参数
            phoneNumber: updatedUser.phoneNumber,
            valueStream: updatedUser.valueStream,
            scrumTeam: updatedUser.scrumTeam,
            role: updatedUser.role,
            technicalLead: updatedUser.technicalLead,
            productOwner: updatedUser.productOwner,
            notes: updatedUser.productOwner,
            // token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

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