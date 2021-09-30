const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler") ;


var User = require("../models/userModel");
var Admin = require("../models/adminModel")


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

// Register for admin account
exports.adminSignup = function(req,res){
    const{email, password} = req.body;
    var valid = emailRegex.test(email);
    if (!valid) {
        res.status(200).json({ status: 'error', error:  'Should enter email type'})
    }
    Admin.findOne({email: email}). then((user) => {
        if(user){
            res.status(200).json({success:false,error: "Email has been registered!"})
        }
        
        if (password.length < 5) {
            res.status(200).json({ status: 'error', error:  'Password length is too small. Should be at least 6 characters'})
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

//View one spefic user's public profile (GET)
//http://localhost:4000/:id
 exports.getUserProfile = function(req,res){
    console.log(req.user)
    User.findById(req.user.id,function(err,user){
        if(err){
            res.status(400).json({success:false,err:err})
        }else{
            // res.status(200).json({success:true,user:user})   //json
            res.json(user)
        }
    })
}


//View one spefic user's public profile (GET)
//http://localhost:4000/:id
exports.getAllUserProfile = function(req,res){
    User.find({}, function (err, users) {
        if (err) {
            res.send('something wrong')
            next();
        }
        res.json(users)
    })
}




exports.editUser = asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findByEmail(req.user.email);

    if (user) {
        user.pic = req.body.pic || user.pic,
        user.givenname = req.body.givenname || user.givenname,
        user.familyname = req.body.familyname || user.familyname,     
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber,
        user.valueStream = req.body.valueStream || user.valueStream,
        user.scrumTeam = req.body.scrumTeam || user.scrumTeam,
        user.role = req.body.role || user.role,
        user.technicalLead = req.body.technicalLead || user.technicalLead,
        user.productOwner = req.body.productOwner || user.productOwner,
        user.notes = req.body.notes || user.notes
  
        const updatedUser = await user.save();
  
        res.json({
            _id: updatedUser._id,
            pic: updatedUser.pic,
            givenname : updatedUser.givenname,
            familyname : updatedUser.familyname,     
            phoneNumber: updatedUser.phoneNumber,
            valueStream: updatedUser.valueStream,
            scrumTeam: updatedUser.scrumTeam,
            role: updatedUser.role,
            technicalLead: updatedUser.technicalLead,
            productOwner: updatedUser.productOwner,
            notes: updatedUser.notes,
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});






exports.updateInfo = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user) {
        user.pic = req.body.pic || user.pic,
        user.givenname = req.body.givenname || user.givenname,
        user.familyname = req.body.familyname || user.familyname,     
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber,
        user.valueStream = req.body.valueStream || user.valueStream,
        user.scrumTeam = req.body.scrumTeam || user.scrumTeam,
        user.role = req.body.role || user.role,
        user.technicalLead = req.body.technicalLead || user.technicalLead,
        user.productOwner = req.body.productOwner || user.productOwner,
        user.notes = req.body.notes || user.notes
  
        const updatedUser = await user.save();
  
        res.json({
            _id: updatedUser._id,
            pic: updatedUser.pic,
            givenname : updatedUser.givenname,
            familyname : updatedUser.familyname,     
            phoneNumber: updatedUser.phoneNumber,
            valueStream: updatedUser.valueStream,
            scrumTeam: updatedUser.scrumTeam,
            role: updatedUser.role,
            technicalLead: updatedUser.technicalLead,
            productOwner: updatedUser.productOwner,
            notes: updatedUser.notes,
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});


/**
 * Reset password, old and new password required
 * (GET) http://localhost:4000/user/reset-password
 */
// Update personal profile functionality
exports.resetPsswd = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user) {
        if (user.isValidPassword(req.body.old_psswd)){
            console.log("Im in!!!!!!!!!!!!")
            bcrypt.genSalt(10,(err,salt) =>{
                bcrypt.hash(req.body.new_psswd, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash
                    console.log('输入的password(plain text为）:' + req.body.new_psswd)
                    user.save().then((user)=> {
                        console.log('hash过后的password为：' + user.password)
                        res.json({success:true,
                            user:{
                                password:user.password,
                            }, redirect: '/login'
                        })
                    })
                })
            })
    
        }
        else{
            res.status(404);
            throw new Error("Current password is not correct");
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


User.create