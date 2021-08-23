const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, trim: true, minlength: 3 },
    // id: { type: Number, required: false , unique: true},
    email: { type:String, required: true, unique: true},
    phoneNumber: { type:Number, required: true },
    valueStream: { type:String, required: true },
    scrumTeam: { type:String, required: true },
    role: { type:String, required: true },
    technicalLead: { type:String, required: true },
    productOwner: { type:String, required: true },
    notes: { type:String, required: false }
}, {
    timestamps: true,
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;