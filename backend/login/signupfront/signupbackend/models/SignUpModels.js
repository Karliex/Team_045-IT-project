

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String, require: false
    },
    email: { 
        type: String, required: true, unique: true
    },
    password:{
        type:String,
        require:true
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
    timestamps: false,
});

module.exports = mongoose.model('users', userSchema);