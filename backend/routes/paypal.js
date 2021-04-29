const express = require("express"),
    jwt = require("jsonwebtoken");
const paypal = require("paypal-rest-sdk");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Cart = require("../models/Cart");
const queryString = require("querystring");
const util = require("util");
const secret = require("../../config/default");
require("dotenv").config();

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const app = express();

router.get("/", (req, res) => res.render("index"));

router.post("/pay", [auth, check("shipping", "shipping is required").not().isEmpty()], async (req, res) => {
    console.log(req.body);

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
        const cart = await Cart.findOne({ user: userPayload.id });
        const { orderItems } = cart;
        let items = [];
        let total = 0;
        const { shipping } = req.body;

        for (let i = 0; i < orderItems.length; i++) {
            const item = {
                name: String(orderItems[i].product.title),
                sku: String(orderItems[i].product._id),
                price: String(orderItems[i].product.price.toFixed(2)),
                quantity: orderItems[i].qty,
                description: orderItems[i].product.description,
                currency: "USD",
            };
            items.push(item);
            total += orderItems[i].total;
        }

        cart.shippingPrice = shipping;
        cart.save();
        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:8080/success",
                cancel_url: "http://localhost:5000/paypal/cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: items,
                    },
                    amount: {
                        currency: "USD",
                        total: String((total + shipping).toFixed(2)),
                        details: {
                            shipping: String(shipping.toFixed(2)),
                            subtotal: String(total.toFixed(2)),
                        },
                    },
                },
            ],
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.error(error.response.details);
                res.send(error.response.details);
            } else {
                const redirectUrl = payment.links.find((link) => link.rel === "approval_url").href;
                const token = queryString.parse(redirectUrl).token;
                res.json({ token });

                // for (let i = 0; i < payment.links.length; i++) {
                //     if (payment.links[i].rel === "approval_url") {
                //         res.redirect(301, payment.links[i].href);
                //     }
                // }
            }
        });
    } catch (err) {
        res.status(500).send("server error");
    }
});

router.post(
    "/success",
    [check("paymentId", "paymentId is required").not().isEmpty(), check("PayerID", "PayerID is required").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json({ msg: "no token, auth denied" });
        }

        const decoded = jwt.verify(token, secret.jwtSecret);
        let userPayload = decoded.user;
        const { paymentId, PayerID } = req.body;

        let total = 0;
        try {
            const cart = await Cart.findOne({ user: userPayload.id });
            const { orderItems } = cart;
            for (let i = 0; i < orderItems.length; i++) {
                total += orderItems[i].total;
            }
            total += cart.shippingPrice;
        } catch (err) {
            console.error(err);
        }
        const execute_payment_json = {
            payer_id: String(PayerID),
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total: String(total.toFixed(2)),
                    },
                },
            ],
        };

        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                console.error(error.response);
                console.error(error);
                res.status(400).send("error");
            } else {
                try {
                    console.log(JSON.stringify(payment));
                    //create an order object before deleting the cart object
                    const cart = await Cart.findOne({ user: userPayload.id });
                    let orderCart = cart;
                    let orderItems = cart.orderItems;
                    let products = [];
                    for (let i = 0; i < orderItems.length; i++) {
                        products.push(orderItems[i].product);
                    }

                    for (let i = 0; i < products.length; i++) {
                        let prod = await Product.findById(products[i]._id);

                        prod.inStock -= orderItems[i].qty;
                        prod.markModified("inStock");
                        await prod.save();
                    }

                    //create order object
                    const order = new Order({
                        user: userPayload._id,
                        orderCart: orderCart,
                        total: Number(payment.transactions[0].amount.total),
                    });
                    await order.save();

                    await Cart.findOneAndDelete({ user: userPayload.id });
                    res.send("success");
                } catch (err) {
                    console.error(err);
                }
            }
        });
    },
);

router.get("/cancel", (req, res) => res.send("Cancelled"));

module.exports = router;
