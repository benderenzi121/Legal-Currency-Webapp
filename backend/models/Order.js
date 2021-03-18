const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    orderCart:{
        type:Object,
        required:true,
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:'user',
            unqiue:true,
            required: true
        },
        orderItems:[{
            type:Object,
            required:true,
            product:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'product',
                unique:true
            },
            qty:{
                type: Number,
                required:true
            },
            total:{
                type:Number,
                required:true
            }
    
          
        }]
    },
    shipping:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'shipping'
    },
    subTotal:{
        type: Number,
        required:true
    },
    paid:{
        type: Boolean,
        default: false,
        required:true
    },
    paidOn:{
        type: Date
    },
    placedOn:{
        type:Date,
        default:Date.now
    }

})


module.exports = Order = mongoose.model('order', OrderSchema)