const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
var User = require("../models/userModel");

// get specific user's profile (after standard user search)
// GET --> http://localhost:4000/user/updateInfo
 exports.getUserProfile = function(req,res){
    console.log(req.user)
    User.findById(req.user.id,function(err,user){
        if(err){
            res.status(400).json({success:false,err:err})
        }else{
            res.json(user)
        }
    })
}

// update Info (for standard user)
// POST --> http://localhost:4000/user/updateInfo
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

// reset password (for standard user)
// POST --> http://localhost:4000/user/reset-password
exports.resetPsswd = asyncHandler(async (req, res) => {
    // console.log(req.user);
    // const{password} = req.body.new_psswd;
    const user = await User.findById(req.user._id);
    if (req.body.new_psswd.length > 5) {
        if (user) {
            if (user.isValidPassword(req.body.old_psswd)){
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
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// upload profile image from local (for standard user)
// POST --> http://localhost:4000/user/uploadImage
exports.uploadImage = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id);
    const url = req.protocol + '://' + req.get('host')
    
    if (user) {
        user.pic = url + '/public/' + req.file.filename
        console.log(user.pic)
    
        user.save().then(updatedUser => {
            res.status(201).json({
                message: "image updated successfully!",
                updatedUser: {
                    _id: updatedUser._id,
                    profileImg: updatedUser.pic
                }
            })
        }).catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        })
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

User.create;