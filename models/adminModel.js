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

// checks if password is valid
adminSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('admins', adminSchema);