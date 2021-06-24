const express = require("express");
const { check, oneOf, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/adminAuth");
const checkObjectId = require("../middleware/checkObjectId");
const Product = require("../models/Product");
const { find, findById } = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();
// Route to update value of instock for a product
// Takes 2 parameter 'id' the id of the product to be altered
//                   'change' the value in which to increment/decrement by
// **************************NEEDS MIDDLEWEAR***********************
router.put(
    "/update-stock",
    [
        auth,
        authAdmin,
        check("id", "Product id required").not().isEmpty(),
        check("change", "change (increment/decrement) integer required").not().isEmpty(),
        check("size", "size of qty to update is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        const { id, change, size } = req.body;

        try {
            let product = await Product.findOne({ _id: id });

            switch (size) {
                case "small":
                    product.inStock.sm += change;
                    break;
                case "medium":
                    product.inStock.md += change;
                    break;
                case "large":
                    product.inStock.lg += change;
                    break;
                case "x large":
                    product.inStock.xl += change;
                    break;
                case "xx large":
                    product.inStock.xxl += change;
                    break;
                case "xxx large":
                    product.inStock.xxxl += change;
                    break;
            }
            product.markModified("inStock");
            await product.save();
            return res.status(200).send(product);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    },
);
//Update Product route
router.put(
    "/update-product",
    [
        auth,
        authAdmin,
        check("id", "Must provide a product id").not().isEmpty(),
        oneOf([
            check("imagePath", "must provide a change to product").not().isEmpty(),
            check("price", "must provide a change to product").not().isEmpty(),
        ]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        let payload;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, imagePath, price } = req.body;
        if (imagePath != null) {
            payload = {
                imagePath: imagePath,
            };
        }

        if (price != null) {
            payload = {
                price: price,
            };
        }
        if (price != null && imagePath != null) {
            payload = {
                price,
                imagePath: imagePath,
            };
        }
        if (!payload) {
            res.status(400).send("no change was made");
        }

        try {
            let product = await Product.findByIdAndUpdate(id, payload, { new: true });

            res.status(200).json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
);

// Returns list of all products
router.get("/", async (req, res) => {
    const productList = await Product.find();

    return res.status(200).send(productList);
});

//  Creates a new Product
//
//
router.post(
    "/new-product",
    [
        auth,
        authAdmin,
        check("title", "title is required").not().isEmpty(),
        check("description", "description is required").not().isEmpty(),
        check("price", "price is required").not().isEmpty(),
        check("imagePath", "please provide a url for an image").not().isEmpty(),
        check("inStock", "please provide a quantity being added to stock").not().isEmpty(),
    ], //NEEDS MIDDLEWEAR still)
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, price, tag, date, imagePath, inStock } = req.body;

        try {
            let product = await Product.findOne({ title });

            if (product) {
                return res.status(400).json({ errors: [{ msg: "product already exists" }] });
            }

            product = new Product({
                title,
                description,
                price,
                tag,
                date,
                imagePath,
                inStock,
            });

            await product.save();
            res.status(200).send(product);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    },
);

// Gets product ID from the database
// Takes 1 parameter 'title' and queries the DB to see if it finds a matching title
// Returns the ID of the product with the requests title
router.get("/product-id", async (req, res) => {
    const { title } = req.body;

    try {
        let product = await Product.findOne({ title });
        const prodID = product._id;
        res.status(200).send({ prodID });
    } catch (err) {
        res.status(500).send("server error");
    }
});

//Custom Queries Based on User tags
router.get("/product-list", async (req, res) => {
    //get list of tags from req and store it in a variable
    let { tags } = req.body;
    let results = [];

    try {
        //if no tags selected return all products
        if (!tags) {
            let products = await Product.find({
                $or: [
                    { "inStock.sm": { $gte: 1 } },
                    { "inStock.md": { $gte: 1 } },
                    { "inStock.lg": { $gte: 1 } },
                    { "inStock.xl": { $gte: 1 } },
                    { "inStock.xxl": { $gte: 1 } },
                    { "inStock.xxxl": { $gte: 1 } },
                ],
            });
            console.log(products);
            //if no products return an error
            if (products.length < 1) {
                return res.status(400).json({ errors: [{ msg: "no products in database?" }] });
            }
            return res.status(200).send(products);
        }
        //find all products that have any of the associated tags
        for (let i = 0; i < tags.length; i++) {
            let prod = await Product.find({
                tag: tags[i],
                $or: [
                    { "inStock.sm": { $gte: 1 } },
                    { "inStock.md": { $gte: 1 } },
                    { "inStock.lg": { $gte: 1 } },
                    { "inStock.xl": { $gte: 1 } },
                    { "inStock.xxl": { $gte: 1 } },
                    { "inStock.xxxl": { $gte: 1 } },
                ],
            });
            results.push(prod);
        }

        //send a list of the products queried for by tag

        return res.status(200).send(results);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ errors: [{ msg: "no products in databaseasdasd?" }] });
    }
});

//returns a product when passed its ID
router.get("/:id", checkObjectId("id"), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
});

//toggles the featured value of a product
router.put("/featured-toggle", [auth, adminAuth, check("id", "Must provide a product id").not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body;
    try {
        const product = await Product.findById(id);
        if (product.featured == true) {
            product.featured = false;
            product.save();
            return res.status(200).json(product);
        }
        if (product.featured == false) {
            product.featured = true;
            product.save();
            return res.status(200).json(product);
        }
        if (product.featured == null) {
            return res.status(400).send("Product didnt exist");
        }
    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
});

//adds a tag to a product and its list of tags
router.put(
    "/add-tag",
    [auth, adminAuth, check("id", "Must provide a product id").not().isEmpty(), check("tag", "Must provide a tag").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, tag } = req.body;

        try {
            let product = await Product.findById(id);
            let found = false;
            for (let i = 0; i < product.tag.length; i++) {
                if (product.tag[i] == tag) {
                    found = true;
                    return res.status(400).json({ errors: [{ msg: "tag already exists" }] });
                }
            }
            if (found == false) {
                product.tag.push(tag);
                product.markModified("tag");
                product.save();
                return res.status(200).json(product);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
);

//removes a tag from a product in the database
router.put(
    "/remove-tag",
    [auth, adminAuth, check("id", "Must provide a product id").not().isEmpty(), check("tag", "Must provide a tag").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, tag } = req.body;

        try {
            let product = await Product.findById(id);
            for (let i = 0; i < product.tag.length; i++) {
                if (product.tag[i] == tag) {
                    product.tag.splice(i, 1);
                    product.markModified("tag");
                    product.save();
                    return res.status(200).json(product);
                }
            }

            return res.status(400).json({ msg: "tag not found" });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
);
module.exports = router;
