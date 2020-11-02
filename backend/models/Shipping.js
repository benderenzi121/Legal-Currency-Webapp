const mongoose = require('mongoose');


const ShippingSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true 
    },
    Address: {
        type: String,
        required:true 
    },
    zipCode: {
        type: String,
        required:true 
    },
    Country: {
        type: String,
        required:true 
    },

});

module.exports = Shipping = mongoose.model('shipping', ShippingSchema)