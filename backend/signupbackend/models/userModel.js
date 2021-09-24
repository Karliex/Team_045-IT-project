const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    givenname:{
        type: String, require: false
    },
    familyname:{
        type: String, require: false
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    token:{
        type:String
    },
    pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phoneNumber: { 
        type:Number, required: false 
    },
    valueStream: { 
        type:String, required: false 
    },
    scrumTeam: { 
        type:String, required: false 
    },
    role: { 
        type:String, required: false 
    },
    technicalLead: { 
        type:String, required: false 
    },
    productOwner: { 
        type:String, required: false 
    },
    notes: { 
        type:String, required: false 
    }
}, {
    timestamps: true,
});

// method for generating a hash; used for password hashing
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);