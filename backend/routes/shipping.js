//dependencies
const jwt = require("jsonwebtoken"),
    express = require("express"),
    router = express.Router(),
    //validation / middleware
    { check, validationResult } = require("express-validator"),
    auth = require("../middleware/auth"),
    //models
    Shipping = require("../models/Shipping"),
    User = require("../models/User"),
    //config
    secret = require("../../config/default");

router.get("/", async (req, res) => {});

// Post Shipping information for Signed in User
router.post(
    "/",
    [
        auth,
        check("firstName", "first name is required").not().isEmpty(),
        check("lastName", "last name is required").not().isEmpty(),
        check("address", "Address is required").not().isEmpty(),
        check("zipCode", "last name is required").not().isEmpty(),
        check("country", "Country is required").not().isEmpty(),
        check("city", "City is required").not().isEmpty(),
        check("state", "State is required").not().isEmpty(),
    ],
    async (req, res, next) => {
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

        //build shipping object
        try {
            //populate from request body
            let { firstName, lastName, address, zipCode, country, city, state } = req.body;
            let shipping = new Shipping({ firstName, lastName, address, zipCode, country, city, state });

            //decode token and find associated user
            const decoded = jwt.verify(token, secret.jwtSecret);
            let user = decoded.user;
            let userEmail = user.email;

            let doc = await User.findById(user.id);

            //update user object adding new shipping information
            await User.updateOne({ email: doc.email }, { $push: { shipping: shipping } });

            //save shipping information to its respected collection
            await shipping.save();
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400);
            console.error(err);
        }
    },
);

module.exports = router;
