const mongoose = require('mongoose');
const { minLength, maxLength } = require('zod');
const { de } = require('zod/locales');

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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});



module.exports = mongoose.model('Users', userSchema);
