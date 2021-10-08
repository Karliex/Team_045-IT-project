const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

// checks if password is valid
userSchema.methods.isValidPassword = function(password) {
    console.log(this.password);
    console.log(password)
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);