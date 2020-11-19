const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    orderItems:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'orderItem'
    }],
    shipping:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'shipping'
    },
    subTotal:{
        type: Number,
        required:true
    },
    tax:{
        type: Number,
        required:true
    },
    shippingPrice:{
        type: Number,
        required:true
    },
    total:{
        type: Number,
        required:true
    },
    paid:{
        type: Boolean,
        default: false
    },
    paidOn:{
        type: Date
    }

})


module.exports = Order = mongoose.Model('order', OrderSchema)