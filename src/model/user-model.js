const mongoose = require('mongoose');
const { minLength, maxLength } = require('zod');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 50
    },
});



module.exports = mongoose.model('Users', userSchema);
