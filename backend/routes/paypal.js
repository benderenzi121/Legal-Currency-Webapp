const express = require("express"),
    jwt = require("jsonwebtoken");
const paypal = require("paypal-rest-sdk");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Cart = require("../models/Cart");

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: "AfstjHc7adAU0U7tZp0KkiKbdRnhMBmpGEkqr4e596cHPouKUHY5oieA8Wf6pmtuOEr4VA8lIjPnf-Mo",
    client_secret: "EF3dz29gfs-B7N2RDmu3f9n97Mk1SilNhLwvhtJXU3cnFx5haV6r1wdcyPS33vhB6G-92l35xUPUgPTj",
});

const app = express();

router.get("/", (req, res) => res.render("index"));

router.post("/pay", [auth], async (req, res) => {
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
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    let userPayload = decoded.user;
    try {
        const cart = await Cart.findOne({ user: userPayload.id });
        const { orderItems } = cart;
        let items = [];
        let total = 0;

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

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:8080/home",
                cancel_url: "http://localhost:5000/paypal/cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: items,
                    },
                    amount: {
                        currency: "USD",
                        total: String(total),
                    },
                },
            ],
        };
        console.log(create_payment_json.transactions[0].item_list);
        console.log(create_payment_json.transactions[0].amount.total + "\n\n\n\n");
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response.details);
            } else {
                console.log("irun");
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === "approval_url") {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    } catch (err) {
        res.status(500).send("server error");
    }
});

router.get("/success", async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    let total = 0;
    try {
        const cart = await Cart.findOne({ user: userPayload.id });
        const { orderItems } = cart;
        for (let i = 0; i < orderItems.length; i++) {
            total += orderItems[i].total;
        }
    } catch (err) {}
    const execute_payment_json = {
        payer_id: payerId,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: String(total),
                },
            },
        ],
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            const cart = Cart.findOne({ user: userPayload.id });
            cart.delete();
            Cart.save();
            res.redirect([200], "http://localhost:8080/");
        }
    });
});

router.get("/cancel", (req, res) => res.send("Cancelled"));

module.exports = router;
