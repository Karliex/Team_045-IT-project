const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
    },
    // id: { 
    //     type: Number, required: false , unique: true
    // },
    email: { 
        type:String, required: true, unique: true
    },
    password:{
        type:String,
        require:true
    },
    phoneNumber: { 
        type:Number, required: true 
    },
    valueStream: { 
        type:String, required: true 
    },
    scrumTeam: { 
        type:String, required: true 
    },
    role: { 
        type:String, required: true 
    },
    technicalLead: { 
        type:String, required: true 
    },
    productOwner: { 
        type:String, required: true 
    },
    notes: { 
        type:String, required: false 
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Users', userSchema);
