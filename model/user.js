const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

//var bcrypt = require('bcrypt')

// Create User Schema
const userSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    },
    role: {
        type: 'String',
        required: false,
        trim: true,
        lowercase: true
    }
});

// encrypt password before save
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) {
        next();
    } else {
        /*bcrypt.hash(user.password, stage.saltingRounds, function (err, hash) {
            if (err) {
                next(err);
            } else {
                user.password = hash;
                next();
            }
        }); */
    }
});

// Export the model
module.exports = mongoose.model('User', userSchema);
