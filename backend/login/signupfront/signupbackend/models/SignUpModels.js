// const mongoose = require('mongoose')

// const signUpTemplate = new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// })


// module.exports = mongoose.model('mytable', signUpTemplate)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String, require: true, unique: true
    },
    email: { 
        type:String, required: true, unique: true
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

module.exports = mongoose.model('Users', userSchema);