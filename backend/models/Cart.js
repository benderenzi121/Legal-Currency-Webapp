const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
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
    
});


module.exports = Cart =  mongoose.model('cart', CartSchema)