const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', usersSchema);