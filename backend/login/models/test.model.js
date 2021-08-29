const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;