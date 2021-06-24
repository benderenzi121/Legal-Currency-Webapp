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
        if (orderItems.length == 0) {
            res.status(400).send("No items in Cart");
        }

        for (let i = 0; i < orderItems.length; i++) {
            let price = 0;
            if (orderItems[i].size == "xxx large") {
                price = orderItems[i].product.price + 4;
                total += price * orderItems[i].qty;
            } else {
                price = orderItems[i].product.price;
                total += price * orderItems[i].qty;
            }
            switch (orderItems[i].size) {
                case "small":
                    if (orderItems[i].qty > orderItems[i].product.inStock.sm)
                        return res.status(401).json({
                            error: `not enough ${orderItems[i].product.title} size small in stock. there are ${orderItems[i].product.inStock.sm} remaining in stock.`,
                        });
                    break;
                case "medium":
                    if (orderItems[i].qty > orderItems[i].product.inStock.md)
                        return res.status(401).json({
                            error: `not enough ${orderItems[i].product.title} size medium in stock. there are ${orderItems[i].product.inStock.md} remaining in stock.`,
                        });
                    break;
                case "large":
                    if (orderItems[i].qty > orderItems[i].product.inStock.lg)
                        return res.status(401).json({
                            error: `not enough ${orderItems[i].product.title} size large in stock. there are ${orderItems[i].product.inStock.lg} remaining in stock.`,
                        });
                    break;
                case "x large":
                    if (orderItems[i].qty > orderItems[i].product.inStock.xl)
                        return res.status(401).json({
                            error: `not enough ${orderItems[i].product.title} size x large in stock. there are ${orderItems[i].product.inStock.xl} remaining in stock.`,
                        });
                    break;
                case "xx large":
                    if (orderItems[i].qty > orderItems[i].product.inStock.xxl)
                        return res.status(401).json({
                            error: `not enough ${orderItems[i].product.title} size xx large in stock. there are ${orderItems[i].product.inStock.xxl} remaining in stock.`,
                        });
                    break;
                case "xxx large":
                    if (orderItems[i].qty > orderItems[i].product.inStock.xxxl)
                        return res.status(401).json({
                            error: `not enough ${orderItems[i].product.title} size xxx large in stock. there are ${orderItems[i].product.inStock.xxxl} remaining in stock.`,
                        });
                    break;
            }

            const item = {
                name: String(orderItems[i].product.title),
                sku: String(orderItems[i].product._id),
                price: String(orderItems[i].total / orderItems[i].qty),
                quantity: orderItems[i].qty,
                description: orderItems[i].product.description + `, size: ${orderItems[i].size}  `,
                currency: "USD",
            };
            items.push(item);
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
                    //create an order object before deleting the cart object
                    const cart = await Cart.findOne({ user: userPayload.id });
                    let orderCart = cart;
                    let orderItems = cart.orderItems;

                    let products = [];
                    for (let i = 0; i < orderItems.length; i++) {
                        products.push(orderItems[i]);
                    }

                    for (let i = 0; i < products.length; i++) {
                        let prod = await Product.findById(products[i].product._id);

                        switch (products[i].size) {
                            case "small":
                                prod.inStock.sm -= products[i].qty;
                                break;
                            case "medium":
                                prod.inStock.md -= products[i].qty;
                                break;
                            case "large":
                                prod.inStock.lg -= products[i].qty;
                                break;
                            case "x large":
                                prod.inStock.xl -= products[i].qty;
                                break;
                            case "xx large":
                                prod.inStock.xxl -= products[i].qty;
                                break;
                            case "xxx large":
                                prod.inStock.xxxl -= products[i].qty;
                                break;
                        }
                        prod.markModified("inStock");
                        await prod.save();
                    }

                    //create order object
                    const order = new Order({
                        user: userPayload.id,
                        orderItems: orderItems,
                        total: payment.transactions[0].amount.total,
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
