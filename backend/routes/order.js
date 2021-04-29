const { default: axios } = require("axios");
const { findByIdAndDelete } = require("../models/User");

const jwt = require("jsonwebtoken"),
    express = require("express"),
    router = express.Router(),
    //validation / middleware
    { check, validationResult } = require("express-validator"),
    auth = require("../middleware/auth"),
    //models
    Cart = require("../models/Cart"),
    User = require("../models/User"),
    Product = require("../models/Product"),
    Order = require("../models/Order");
//config
const secret = require("../../config/default");

router.post("/place-order", [auth], async (req, res, next) => {
    //checks field validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    //Takes token from the header
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "no token, auth denied" });
    }

    //decode token and find associated user
    const decoded = jwt.verify(token, secret.jwtSecret);
    let userPayload = decoded.user;

    try {
        //find actual user document from database
        let user = await User.findById(userPayload.id);
        //pull order items from cart
        let cart = await Cart.findOne({ user: { _id: user._id } });
        if (cart) {
            let orderItems = cart.orderItems;

            let products = [];
            let subtotal = 0.0;
            //calculate subtotal for order
            for (let i = 0; i < orderItems.length; i++) {
                subtotal += orderItems[i].total;
                products.push(orderItems[i].product);
            }
            let orderCart = cart;
            let flag = false;

            //update inventory quantity
            for (let i = 0; i < products.length; i++) {
                let prod = await Product.findById(products[i]._id);
                if (prod.inStock < orderItems[i].qty) {
                    const productTitle = prod.title.toString();
                    res.status(400).json({ errors: [{ msg: "not enough " + productTitle + " in stock" }] });
                    flag = true;
                    break;
                }
                prod.inStock -= orderItems[i].qty;
                prod.markModified("inStock");
                await prod.save();
            }
            if (flag) {
                res.status(400).json({ errors: [{ msg: "not enough " + productTitle + " in stock" }] });
            }
            //create order object
            const order = new Order({
                user: user._id,
                orderCart: orderCart,
                shipping: user.shipping,
                subTotal: subtotal,
            });
            await order.save();
            await Cart.findByIdAndDelete(cart._id);
            res.status(200).send(order);
        } else {
            res.status(400).send("cart didnt exist");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
});

router.get("/get-orders", [auth], async (req, res) => {
    //checks field validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    //Takes token from the header
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "no token, auth denied" });
    }

    //decode token and find associated user
    const decoded = jwt.verify(token, secret.jwtSecret);
    let userPayload = decoded.user;

    try {
        let orders = await Order.find({ user: userPayload._id }).sort({ placedOn: "descending" });
        res.send(orders);
    } catch (err) {
        res.status(400).json({ msg: "No orders associated with this user" });
    }
});

router.get("/:id", [auth, check("id", "id is required").not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    try {
        const order = await Order.findById(req.params.id);
        res.status(200).send(order);
    } catch {
        res.status(400).json({ msg: "No order with this id" });
    }
});
module.exports = router;
