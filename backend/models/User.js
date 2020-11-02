const mongoose = require('mongoose')
// Schema for User model

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required:true 
    },

    email: {
        type:String, 
        required: true,
        unique:true
    },

    password:
    {
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('user', UserSchema)