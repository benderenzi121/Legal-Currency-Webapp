const mongoose = require('mongoose');


const OrderItemSchema = new mongoose.Schema({
    
    product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'product'
    },
    qty:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    imagePath: { 
        type: String, 
        required: true 
    },
});


module.exports = OrderItem =  mongoose.model('OrderItem', OrderItemSchema)