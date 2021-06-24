const { TrendingUpOutlined } = require("@material-ui/icons");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tag: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    imagePath: {
        type: String,
        required: true,
    },
    inStock: {
        type: Object,
        required: true,

        sm: {
            type: Number,
            default: 0,
            required: true,
        },
        md: {
            type: Number,
            default: 0,
            required: true,
        },
        lg: {
            type: Number,
            default: 0,
            required: true,
        },
        xl: {
            type: Number,
            default: 0,
            required: true,
        },
        xxl: {
            type: Number,
            default: 0,
            required: true,
        },
        xxxl: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    pricePaid: {
        type: Number,
        required: true,
        default: 0.0,
    },
    featured: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = Product = mongoose.model("product", ProductSchema);
