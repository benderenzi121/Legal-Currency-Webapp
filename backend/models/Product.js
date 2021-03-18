const { TrendingUpOutlined } = require('@material-ui/icons');
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    tag:{
        type: [String]
    },
    date:{
        type:Date,
        default: Date.now
    },
    imagePath:{
        type: String,
        required: true
    },
    inStock:{
        type: Number,
        required:true
    },
    pricePaid:{
        type:Number, 
        required:true,
        default:0.00

    },
    featured:{
        type: Boolean,
        required: true,
        default: false
    }
});



module.exports = Product = mongoose.model('product', ProductSchema)