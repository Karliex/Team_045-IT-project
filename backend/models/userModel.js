const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String
    },
    email: { 
        type: String, required: true, unique: true
    },
    password:{
        type:String,
        require:true
    },
    phoneNumber: { 
        type:Number 
    },
    valueStream: { 
        type:String 
    },
    scrumTeam: { 
        type:String 
    },
    role: { 
        type:String 
    },
    technicalLead: { 
        type:String
    },
    productOwner: { 
        type:String 
    },
    notes: { 
        type:String 
    }
}, {
    timestamps: false,
});

module.exports = mongoose.model('users', userSchema);