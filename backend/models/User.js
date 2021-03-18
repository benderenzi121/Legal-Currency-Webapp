const mongoose = require('mongoose')
// Schema for User model

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String
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
    permissions:{
        type: String,
        required: true, 
        default: "user"
    },

    date:{
        type: Date,
        default: Date.now
    },
    shipping:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'shipping'
    }],

});

module.exports = User = mongoose.model('user', UserSchema)