const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: number,
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
    instock:{
        type: number,
        required:true
    }
});



module.exports = Product = mongoose.model('product', ProductSchema)