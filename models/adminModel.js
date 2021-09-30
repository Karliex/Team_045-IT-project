const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password:{
        type:String,
        require:true
    },
}, {
    timestamps: true,
});

// method for generating a hash; used for password hashing
adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
adminSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('admins', adminSchema);